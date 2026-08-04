// The week's corpus, as the weekly composition pass reads it.
//
// Triage compresses ~1,000 raw items a day into ~30 candidates. This script does
// the second compression: it merges a week of candidates by thread, so a story
// developing Monday through Thursday arrives as one entry with an arc rather than
// four separate increments, and scores each thread for editorial ranking.
//
//   npm run week:candidates                       -- the 7 days ending today
//   npm run week:candidates -- --days 7 --end 2026-08-14
//   npm run week:candidates -- --limit 60 --out scratch/week.json
//
// Output is JSON (default scratch/week.json, gitignored). Nothing here decides
// what runs in the issue — the routine does. This just gives it a ranked corpus
// with the provenance attached.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { and, asc, desc, eq, gte, inArray, lte, max } from "drizzle-orm";
import { db } from "../lib/db";
import {
  articles,
  candidateArticles,
  candidates,
  feeds,
  issues,
  stories,
} from "../lib/db/schema";

const DEFAULT_DAYS = 7;
const DEFAULT_LIMIT = 40; // per department, before the routine sees it
const DEFAULT_OUT = join("scratch", "week.json");
const MAX_SOURCES_PER_THREAD = 8;

// Which department a candidate's kind belongs to. This is the split the selection
// rule turns on: news is corroborated across wires, culture is singular by nature.
const NEWS_KINDS = new Set(["news", "tech"]);

type Department = "news" | "culture";

interface ThreadEntry {
  candidateId: number;
  day: string;
  title: string;
  summary: string;
  importance: number;
}

interface ThreadSource {
  feed: string;
  title: string;
  url: string;
  publishedAt: string | null;
}

interface Thread {
  threadId: number; // the head candidate's id — stable across the thread's days
  department: Department;
  kind: string | null;
  title: string; // the head candidate's title
  importance: number; // the highest any day of this thread scored
  sourceCount: number; // distinct feeds carrying it across the whole thread
  daySpan: number; // distinct days it appeared on, within the window
  days: string[];
  score: number;
  candidateIds: number[]; // every candidate merged into this thread — story_candidates
  entries: ThreadEntry[]; // the arc, oldest first
  sources: ThreadSource[];
}

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function arg(name: string): string | undefined {
  const flag = `--${name}`;
  const i = process.argv.indexOf(flag);
  if (i !== -1 && process.argv[i + 1]) return process.argv[i + 1];
  const inline = process.argv.find((a) => a.startsWith(`${flag}=`));
  return inline?.slice(flag.length + 1);
}

function numberArg(name: string, fallback: number): number {
  const raw = arg(name);
  if (raw === undefined) return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1) {
    throw new Error(`--${name} must be a positive number, got ${raw}`);
  }
  return Math.trunc(n);
}

function window(): { start: string; end: string } {
  const end = arg("end") ?? isoDay(new Date());
  const explicitStart = arg("start");
  if (explicitStart) return { start: explicitStart, end };

  const days = numberArg("days", DEFAULT_DAYS);
  const start = new Date(`${end}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  return { start: isoDay(start), end };
}

// "Issue 4 · 10–16 August 2026", collapsing the month when the week doesn't cross one.
function suggestTitle(number: number, start: string, end: string): string {
  const from = new Date(`${start}T00:00:00Z`);
  const to = new Date(`${end}T00:00:00Z`);
  const day = (d: Date) => d.getUTCDate();
  const month = (d: Date) =>
    new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" }).format(
      d,
    );
  const range =
    month(from) === month(to)
      ? `${day(from)}–${day(to)} ${month(to)} ${to.getUTCFullYear()}`
      : `${day(from)} ${month(from)} – ${day(to)} ${month(to)} ${to.getUTCFullYear()}`;
  return `Issue ${number} · ${range}`;
}

// The corroboration score: how many independent feeds carried a story, over how
// many days, weighted by how much it mattered. It is the right ranking for news
// and structurally wrong for culture — an Aeon essay has one source and one day by
// nature, and would lose every global sort it entered. So culture is ranked on
// importance alone and gets its own slots, rather than competing on a signal its
// sources cannot produce.
function scoreOf(t: {
  department: Department;
  importance: number;
  sourceCount: number;
  daySpan: number;
}): number {
  return t.department === "news"
    ? t.importance * t.sourceCount * t.daySpan
    : t.importance;
}

async function main() {
  const { start, end } = window();
  const limit = numberArg("limit", DEFAULT_LIMIT);
  const out = arg("out") ?? DEFAULT_OUT;

  const rows = await db
    .select()
    .from(candidates)
    .where(and(gte(candidates.day, start), lte(candidates.day, end)))
    .orderBy(asc(candidates.day));

  if (rows.length === 0) {
    throw new Error(
      `No candidates between ${start} and ${end}. Has the triage cron run?`,
    );
  }

  // Group by thread head. A candidate with no threadId heads its own thread, so
  // every row lands in exactly one group.
  const byThread = new Map<number, typeof rows>();
  for (const row of rows) {
    const key = row.threadId ?? row.id;
    const bucket = byThread.get(key);
    if (bucket) bucket.push(row);
    else byThread.set(key, [row]);
  }

  // A thread's head can predate the window (a story that started last week), in
  // which case its title isn't in `rows` — fetch the heads we're missing so every
  // thread is named by the candidate that opened it.
  const known = new Map(rows.map((r) => [r.id, r]));
  const missingHeads = [...byThread.keys()].filter((id) => !known.has(id));
  if (missingHeads.length > 0) {
    const heads = await db
      .select()
      .from(candidates)
      .where(inArray(candidates.id, missingHeads));
    for (const head of heads) known.set(head.id, head);
  }

  // Provenance for every candidate in the window, in one query.
  const candidateIds = rows.map((r) => r.id);
  const sourceRows = await db
    .select({
      candidateId: candidateArticles.candidateId,
      feedId: articles.feedId,
      feed: feeds.title,
      title: articles.title,
      url: articles.url,
      publishedAt: articles.publishedAt,
    })
    .from(candidateArticles)
    .innerJoin(articles, eq(candidateArticles.articleId, articles.id))
    .innerJoin(feeds, eq(articles.feedId, feeds.id))
    .where(inArray(candidateArticles.candidateId, candidateIds));

  const sourcesByCandidate = new Map<number, typeof sourceRows>();
  for (const row of sourceRows) {
    const bucket = sourcesByCandidate.get(row.candidateId);
    if (bucket) bucket.push(row);
    else sourcesByCandidate.set(row.candidateId, [row]);
  }

  const threads: Thread[] = [];
  for (const [threadId, group] of byThread) {
    const head = known.get(threadId) ?? group[0];
    const linked = group.flatMap((c) => sourcesByCandidate.get(c.id) ?? []);

    const department: Department = NEWS_KINDS.has(head.kind ?? "")
      ? "news"
      : "culture";
    const days = [...new Set(group.map((c) => c.day))].sort();
    const sourceCount = new Set(linked.map((s) => s.feedId)).size;
    const importance = Math.max(...group.map((c) => c.importance));

    const seenUrls = new Set<string>();
    const sources: ThreadSource[] = [];
    for (const s of linked) {
      if (seenUrls.has(s.url)) continue;
      seenUrls.add(s.url);
      sources.push({
        feed: s.feed,
        title: s.title,
        url: s.url,
        publishedAt: s.publishedAt ? isoDay(s.publishedAt) : null,
      });
    }
    sources.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));

    const base = {
      department,
      importance,
      sourceCount: Math.max(sourceCount, 1),
      daySpan: days.length,
    };

    threads.push({
      threadId,
      kind: head.kind,
      title: head.title,
      days,
      score: scoreOf(base),
      candidateIds: group.map((c) => c.id),
      entries: group
        .slice()
        .sort((a, b) => a.day.localeCompare(b.day))
        .map((c) => ({
          candidateId: c.id,
          day: c.day,
          title: c.title,
          summary: c.summary,
          importance: c.importance,
        })),
      sources: sources.slice(0, MAX_SOURCES_PER_THREAD),
      ...base,
    });
  }

  const news = threads
    .filter((t) => t.department === "news")
    .sort((a, b) => b.score - a.score || b.importance - a.importance);
  const culture = threads
    .filter((t) => t.department === "culture")
    .sort(
      (a, b) =>
        b.importance - a.importance ||
        b.sourceCount - a.sourceCount ||
        b.daySpan - a.daySpan,
    );

  const [{ highest }] = await db
    .select({ highest: max(issues.number) })
    .from(issues);
  const number = (highest ?? 0) + 1;

  // Last week's headlines. A thread that ran Wednesday through this Monday is in
  // both weeks' corpora, and without this the same story gets composed twice.
  const [previous] = await db
    .select({ id: issues.id, number: issues.number, title: issues.title })
    .from(issues)
    .where(eq(issues.status, "published"))
    .orderBy(desc(issues.number))
    .limit(1);
  const previousHeadlines = previous
    ? (
        await db
          .select({ headline: stories.headline })
          .from(stories)
          .where(eq(stories.issueId, previous.id))
      ).map((s) => s.headline)
    : [];

  const payload = {
    window: { start, end },
    issue: { number, suggestedTitle: suggestTitle(number, start, end) },
    previousIssue: previous
      ? { number: previous.number, title: previous.title, headlines: previousHeadlines }
      : null,
    counts: {
      candidates: rows.length,
      threads: threads.length,
      news: news.length,
      culture: culture.length,
      // Named, not silent: the routine should know what it isn't being shown.
      omittedByLimit: {
        news: Math.max(news.length - limit, 0),
        culture: Math.max(culture.length - limit, 0),
      },
    },
    news: news.slice(0, limit),
    culture: culture.slice(0, limit),
  };

  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, `${JSON.stringify(payload, null, 2)}\n`);

  console.log(
    `${out}: ${rows.length} candidates → ${threads.length} threads ` +
      `(${news.length} news, ${culture.length} culture) for ${start}..${end}`,
  );
  if (payload.counts.omittedByLimit.news || payload.counts.omittedByLimit.culture) {
    console.log(
      `  capped at --limit ${limit}: omitted ${payload.counts.omittedByLimit.news} news, ` +
        `${payload.counts.omittedByLimit.culture} culture`,
    );
  }
  const multiDay = threads.filter((t) => t.daySpan > 1).length;
  console.log(`  ${multiDay} thread(s) ran more than one day`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
