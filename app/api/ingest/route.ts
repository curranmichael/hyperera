import { NextResponse } from "next/server";
import Parser from "rss-parser";
import { and, eq, lt, notExists, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  feeds,
  articles,
  candidateArticles,
  type NewArticle,
} from "@/lib/db/schema";
import { shardUrls } from "@/lib/feeds";

export const runtime = "nodejs";
// Day-sharded feeds turn one row into up to 14 sequential fetches, each with
// retries, so this needs far more headroom than a single pass over 9 feeds.
export const maxDuration = 300;
export const dynamic = "force-dynamic";

// Google News caps every query at 100 items. A shard that comes back full was
// almost certainly truncated, and we want that visible in the response rather
// than silently mistaken for complete coverage.
const GOOGLE_NEWS_ITEM_CAP = 100;

// Cover yesterday in full plus today so far. A window of 1 leaves a daily hole:
// the "today" shard fetched at the cron hour captures only what was published
// before it, and no later run revisits that day. The overlap is free — inserts
// dedupe on (feedId, guid) — and re-fetching yesterday complete can also beat
// the 100-item cap that clipped it mid-day.
const DEFAULT_DAYS = 2;
const MAX_DAYS = 14;

// How long an unused raw item is kept. Long enough that a backfill or a late
// triage run still finds what it needs; short enough that the table doesn't grow
// without limit at ~1,000 rows a day.
const RETENTION_DAYS = 60;

const parser = new Parser({
  timeout: 15000,
  headers: { "User-Agent": "hyper-era/0.1 (+https://hyper-era.app)" },
});

function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // fail closed if unconfigured
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

interface ShardResult {
  day: string | null;
  fetched: number;
  truncated: boolean;
}

interface FeedResult {
  feed: string;
  fetched: number;
  inserted: number;
  truncated: number; // shards that came back at the cap, so coverage is partial
  shards?: ShardResult[];
  error?: string;
}

// Which URLs one feed row expands into for this run. "static" feeds are a single
// URL; "daily_shard" feeds get one URL per day so each shard carries its own
// 100-item budget and a missed day can be re-fetched later by date.
function urlsFor(
  feed: typeof feeds.$inferSelect,
  days: number,
): { day: string | null; url: string }[] {
  if (isSharded(feed)) {
    return shardUrls(feed.urlTemplate!, days);
  }
  return [{ day: null, url: feed.url }];
}

function isSharded(feed: typeof feeds.$inferSelect): boolean {
  return feed.fetchStrategy === "daily_shard" && !!feed.urlTemplate;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ?days=N backfills a missed window. Only meaningful for day-sharded feeds —
  // static feeds expose whatever their rolling window happens to hold.
  const requested = Number(new URL(req.url).searchParams.get("days"));
  const days = Number.isFinite(requested)
    ? Math.min(Math.max(Math.trunc(requested), 1), MAX_DAYS)
    : DEFAULT_DAYS;

  const activeFeeds = await db
    .select()
    .from(feeds)
    .where(eq(feeds.active, true));

  // Fetch every feed concurrently; a failure in one is captured, never thrown,
  // so a single bad feed can't fail the whole run. Shards within a feed run in
  // sequence to stay polite to the upstream host.
  const results = await Promise.all(
    activeFeeds.map(async (feed): Promise<FeedResult> => {
      try {
        const shards: ShardResult[] = [];
        const seen = new Set<string>();
        const values: NewArticle[] = [];
        // The 100-item cap is a Google News property. A native feed that happens
        // to carry 100 items is publishing 100 items, not being truncated.
        const capped = isSharded(feed);

        for (const shard of urlsFor(feed, days)) {
          const parsed = await parser.parseURL(shard.url);
          const items = parsed.items ?? [];
          shards.push({
            day: shard.day,
            fetched: items.length,
            truncated: capped && items.length >= GOOGLE_NEWS_ITEM_CAP,
          });

          for (const item of items) {
            const guid = item.guid ?? item.link;
            const url = item.link ?? item.guid;
            const title = item.title?.trim();
            if (!guid || !url || !title || seen.has(guid)) continue;
            seen.add(guid);
            values.push({
              feedId: feed.id,
              guid,
              title,
              url,
              summary:
                item.contentSnippet?.trim() || item.content?.trim() || null,
              publishedAt: item.isoDate ? new Date(item.isoDate) : null,
            });
          }
        }

        let inserted = 0;
        if (values.length > 0) {
          const rows = await db
            .insert(articles)
            .values(values)
            .onConflictDoNothing({ target: [articles.feedId, articles.guid] })
            .returning({ id: articles.id });
          inserted = rows.length;
        }

        return {
          feed: feed.title,
          fetched: shards.reduce((n, s) => n + s.fetched, 0),
          inserted,
          truncated: shards.filter((s) => s.truncated).length,
          // Per-day counts for sharded feeds, so a day that came back capped (or
          // empty) is visible rather than hidden inside a single total.
          ...(capped ? { shards } : {}),
        };
      } catch (err) {
        return {
          feed: feed.title,
          fetched: 0,
          inserted: 0,
          truncated: 0,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }),
  );

  const totals = results.reduce(
    (acc, r) => ({
      fetched: acc.fetched + r.fetched,
      inserted: acc.inserted + r.inserted,
      errors: acc.errors + (r.error ? 1 : 0),
      truncatedShards: acc.truncatedShards + r.truncated,
    }),
    { fetched: 0, inserted: 0, errors: 0, truncatedShards: 0 },
  );

  return NextResponse.json({
    ok: true,
    days,
    totals,
    feeds: results,
    swept: await sweepOldArticles(),
  });
}

// Raw items are a means, not an archive: roughly a thousand arrive a day and the
// vast majority are never clustered into anything. Sweeping them keeps growth
// bounded — but only the ones no candidate points at. Deleting indiscriminately
// would cut the story -> candidates -> articles -> source URL chain this schema
// exists to keep walkable, which is the one thing the retention pass must not do.
// (The FK is ON DELETE CASCADE, so an unqualified delete would silently take the
// provenance rows with it rather than failing loudly.)
async function sweepOldArticles(): Promise<number | null> {
  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - RETENTION_DAYS);

  try {
    const result = await db.delete(articles).where(
      and(
        lt(articles.createdAt, cutoff),
        notExists(
          db
            .select({ one: sql`1` })
            .from(candidateArticles)
            .where(eq(candidateArticles.articleId, articles.id)),
        ),
      ),
    );
    return result.rowCount ?? 0;
  } catch (err) {
    // Retention is housekeeping; a failure here must not fail the ingest that
    // just ran successfully.
    console.error("retention sweep failed:", err);
    return null;
  }
}
