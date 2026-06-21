import { NextResponse } from "next/server";
import Parser from "rss-parser";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { feeds, articles, type NewArticle } from "@/lib/db/schema";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const parser = new Parser({
  timeout: 15000,
  headers: { "User-Agent": "hyper-era/0.1 (+https://hyper-era.app)" },
});

function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // fail closed if unconfigured
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

interface FeedResult {
  feed: string;
  fetched: number;
  inserted: number;
  error?: string;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const activeFeeds = await db
    .select()
    .from(feeds)
    .where(eq(feeds.active, true));

  // Fetch every feed concurrently; a failure in one is captured, never thrown,
  // so a single bad feed can't fail the whole run.
  const results = await Promise.all(
    activeFeeds.map(async (feed): Promise<FeedResult> => {
      try {
        const parsed = await parser.parseURL(feed.url);
        const items = parsed.items ?? [];

        const seen = new Set<string>();
        const values: NewArticle[] = [];
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
            summary: item.contentSnippet?.trim() || item.content?.trim() || null,
            publishedAt: item.isoDate ? new Date(item.isoDate) : null,
          });
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

        return { feed: feed.title, fetched: items.length, inserted };
      } catch (err) {
        return {
          feed: feed.title,
          fetched: 0,
          inserted: 0,
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
    }),
    { fetched: 0, inserted: 0, errors: 0 },
  );

  return NextResponse.json({ ok: true, totals, feeds: results });
}
