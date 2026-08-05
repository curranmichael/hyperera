import { NextResponse } from "next/server";
import { generateObject, jsonSchema } from "ai";
import { desc, eq, gte, inArray, isNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  articles,
  candidateArticles,
  candidates,
  feeds,
  type NewCandidate,
} from "@/lib/db/schema";
import {
  TRIAGE_SCHEMA,
  TRIAGE_SYSTEM,
  triageUserPrompt,
  type RecentCandidate,
  type TriageArticle,
  type TriageResult,
} from "@/lib/prompts/triage";

export const runtime = "nodejs";
export const maxDuration = 300;
export const dynamic = "force-dynamic";

// Compression, not judgement — Sonnet is the right tier here. Opus is reserved for
// the weekly pass, where the overview and analogies are actually composed.
const MODEL = process.env.TRIAGE_MODEL || "anthropic/claude-sonnet-5";

// One call, no sharding (see ARCHITECTURE notes). This cap is a safety valve, not a
// batching strategy: anything left over keeps its null watermark and is picked up by
// the next run. Sized from measurement — 1,846 articles took ~240s against a 300s
// function limit, so a full day (~670 items) has ample room but a large backlog must
// drain across runs rather than risk a timeout.
const MAX_ARTICLES = 1200;

// How far back to show the model existing candidate titles, so a running story keeps
// one threadId instead of spawning a new thread every day.
const THREAD_LOOKBACK_DAYS = 14;

// Feed summaries run long and most of the signal is in the first sentence or two.
const SUMMARY_CHARS = 300;

function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // fail closed if unconfigured
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = isoDay(new Date());

  // Everything the ingest has stored and triage has not yet seen. Oldest first so a
  // backlog drains in the order it arrived.
  const pending = await db
    .select({
      id: articles.id,
      feedId: articles.feedId,
      title: articles.title,
      summary: articles.summary,
      publishedAt: articles.publishedAt,
      feed: feeds.title,
      kind: feeds.kind,
    })
    .from(articles)
    .innerJoin(feeds, eq(articles.feedId, feeds.id))
    .where(isNull(articles.triagedAt))
    .orderBy(articles.publishedAt)
    .limit(MAX_ARTICLES);

  if (pending.length === 0) {
    return NextResponse.json({ ok: true, considered: 0, created: 0 });
  }

  // Recent candidate titles give the model the context to attach follow-ups to an
  // existing thread rather than opening a duplicate one.
  const lookback = new Date();
  lookback.setUTCDate(lookback.getUTCDate() - THREAD_LOOKBACK_DAYS);
  const recentRows = await db
    .select({
      id: candidates.id,
      title: candidates.title,
      day: candidates.day,
      firstSeen: candidates.firstSeen,
      threadId: candidates.threadId,
    })
    .from(candidates)
    .where(gte(candidates.day, isoDay(lookback)))
    .orderBy(desc(candidates.day))
    .limit(400);

  const recent: RecentCandidate[] = recentRows.map((c) => ({
    id: c.id,
    title: c.title,
    day: c.day,
  }));
  const recentById = new Map(recentRows.map((c) => [c.id, c]));

  const items: TriageArticle[] = pending.map((a, i) => ({
    index: i,
    title: a.title,
    summary: a.summary ? a.summary.slice(0, SUMMARY_CHARS) : null,
    feed: a.feed,
    kind: a.kind,
    publishedAt: a.publishedAt ? isoDay(a.publishedAt) : null,
  }));

  const { object } = await generateObject({
    model: MODEL,
    schema: jsonSchema<TriageResult>(TRIAGE_SCHEMA),
    system: TRIAGE_SYSTEM,
    prompt: triageUserPrompt(items, recent),
    // A day's worth of items can yield tens of candidates; a backfill far more.
    // The default output cap truncates the object and fails the parse.
    maxOutputTokens: 32000,
  });

  // Build rows, dropping anything the model returned that doesn't resolve against
  // real data — a hallucinated index or threadId shouldn't poison the corpus.
  const prepared: { row: NewCandidate; articleIds: number[] }[] = [];
  let droppedIndices = 0;
  let droppedThreads = 0;

  for (const c of object.candidates) {
    const linked = [...new Set(c.articleIndices)]
      .filter((i) => {
        const ok = Number.isInteger(i) && i >= 0 && i < pending.length;
        if (!ok) droppedIndices++;
        return ok;
      })
      .map((i) => pending[i]);
    if (linked.length === 0) continue;

    // Facts about the data, computed here rather than asked of the model.
    const sourceCount = new Set(linked.map((a) => a.feedId)).size;
    const days = linked
      .map((a) => (a.publishedAt ? isoDay(a.publishedAt) : null))
      .filter((d): d is string => d !== null)
      .sort();
    let firstSeen = days[0] ?? today;
    const lastSeen = days[days.length - 1] ?? today;

    let threadId: number | null = null;
    if (c.threadId !== null) {
      const parent = recentById.get(c.threadId);
      if (parent) {
        // Point at the head of the thread, not the most recent link in it, so every
        // increment of a running story shares one id.
        threadId = parent.threadId ?? parent.id;
        const head = recentById.get(threadId);
        const parentFirst = head?.firstSeen ?? parent.firstSeen;
        if (parentFirst < firstSeen) firstSeen = parentFirst;
      } else {
        droppedThreads++;
      }
    }

    prepared.push({
      row: {
        // The day of the candidate's most recent source item, not the day the run
        // happened. For a daily run these are the same; for a backfill they are not,
        // and using the run date would collapse a week of history onto one date and
        // break the "ran N of 7 days" query the whole thread model exists to answer.
        day: lastSeen,
        title: c.title,
        summary: c.summary,
        kind: c.kind,
        importance: c.importance,
        sourceCount,
        firstSeen,
        lastSeen,
        threadId,
      },
      articleIds: linked.map((a) => a.id),
    });
  }

  const consideredIds = pending.map((a) => a.id);

  // Insert the candidates and stamp the watermark together. Every article in the
  // batch is stamped, including ones no candidate referenced — otherwise the noise
  // is re-read on every subsequent run, forever.
  await db.transaction(async (tx) => {
    for (const { row, articleIds } of prepared) {
      const [inserted] = await tx
        .insert(candidates)
        .values(row)
        .returning({ id: candidates.id });
      await tx.insert(candidateArticles).values(
        articleIds.map((articleId) => ({
          candidateId: inserted.id,
          articleId,
        })),
      );
    }
    await tx
      .update(articles)
      .set({ triagedAt: sql`now()` })
      .where(inArray(articles.id, consideredIds));
  });

  return NextResponse.json({
    ok: true,
    considered: pending.length,
    created: prepared.length,
    linked: prepared.reduce((n, p) => n + p.articleIds.length, 0),
    droppedIndices,
    droppedThreads,
    backlog: pending.length === MAX_ARTICLES,
  });
}
