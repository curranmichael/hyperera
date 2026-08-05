import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  date,
  jsonb,
  unique,
  index,
  primaryKey,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
// Relative, not the "@/" alias — drizzle-kit resolves this file outside Next's
// tsconfig path mapping.
import type { AnalogyCategory, Genre, SourceRef } from "../stories";

// The dynamic, editable list of publication feeds to scan.
export const feeds = pgTable("feeds", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull().unique(),
  kind: text("kind"), // news | design | tech | culture | art (free-form for now)
  // How ingest turns this row into URLs to fetch: "static" (default) fetches
  // `url` as-is; "daily_shard" expands `urlTemplate` once per day. See lib/feeds.ts
  // for why Google News publisher feeds must be sharded by date.
  fetchStrategy: text("fetch_strategy"),
  urlTemplate: text("url_template"), // {after}/{before} placeholders, YYYY-MM-DD
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Raw items as ingested from feeds (the un-clustered layer). The daily triage
// pass clusters these into `candidates`, linked through `candidateArticles`.
export const articles = pgTable(
  "articles",
  {
    id: serial("id").primaryKey(),
    feedId: integer("feed_id")
      .notNull()
      .references(() => feeds.id, { onDelete: "cascade" }),
    guid: text("guid").notNull(),
    title: text("title").notNull(),
    url: text("url").notNull(),
    summary: text("summary"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    // The triage watermark. Null means "not yet clustered"; stamped in the same
    // transaction that inserts the candidates derived from this row. Keeping the
    // watermark in the data means a double-fired cron finds nothing to do and a
    // failed run leaves everything eligible for the next one — no runs table.
    triagedAt: timestamp("triaged_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    // Idempotent dedupe key: one row per (feed, item) so re-ingesting is a no-op.
    unique("articles_feed_guid_unq").on(t.feedId, t.guid),
    index("articles_published_at_idx").on(t.publishedAt),
    index("articles_triaged_at_idx").on(t.triagedAt),
  ],
);

// One clustered story-of-the-day: the unit the weekly pass reads instead of
// re-reading a week of raw feed items. Roughly 30 rows a day stand in for ~1,000
// articles, so a weekly issue is composed from ~200 candidates rather than ~7,000.
export const candidates = pgTable(
  "candidates",
  {
    id: serial("id").primaryKey(),
    day: date("day").notNull(), // the ingest day this candidate was clustered from
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    kind: text("kind"), // mirrors feeds.kind: news | design | tech | culture | art
    importance: integer("importance").notNull(), // model's 1-10 judgement
    // How many distinct feeds carried this story. Cross-source corroboration is
    // the closest thing to an importance signal RSS offers — no feed exposes
    // popularity or ranking, so "top" has to be computed, not queried.
    sourceCount: integer("source_count").notNull(),
    firstSeen: date("first_seen").notNull(),
    lastSeen: date("last_seen").notNull(),
    // Follow-ups point at the candidate that opened the thread; null starts one.
    // A story running Mon-Thu is four rows sharing a threadId, which is what lets
    // the weekly pass compose one piece with an arc instead of four increments.
    threadId: integer("thread_id").references((): AnyPgColumn => candidates.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("candidates_day_idx").on(t.day),
    index("candidates_thread_id_idx").on(t.threadId),
  ],
);

// Provenance: which raw items a candidate was clustered from. This is the link
// that keeps `story -> candidates -> articles -> source URL` walkable end to end.
export const candidateArticles = pgTable(
  "candidate_articles",
  {
    candidateId: integer("candidate_id")
      .notNull()
      .references(() => candidates.id, { onDelete: "cascade" }),
    articleId: integer("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
  },
  (t) => [
    primaryKey({ columns: [t.candidateId, t.articleId] }),
    index("candidate_articles_article_id_idx").on(t.articleId),
  ],
);

// --- The magazine (what readers read) ---------------------------------------

// One issue per week. Legacy rows carry the thrice-daily editions this publication
// ran before going weekly, so the archive starts populated rather than empty.
export const issues = pgTable("issues", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull().unique(),
  // Display label: "Issue 4 · 10–16 August 2026", or a legacy edition's own label.
  title: text("title").notNull(),
  weekStart: date("week_start").notNull(),
  weekEnd: date("week_end").notNull(),
  status: text("status").notNull().default("draft"), // draft | published
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const stories = pgTable(
  "stories",
  {
    id: serial("id").primaryKey(),
    issueId: integer("issue_id")
      .notNull()
      .references(() => issues.id, { onDelete: "cascade" }),
    slug: text("slug").notNull().unique(),
    headline: text("headline").notNull(),
    overview: text("overview").notNull(),
    genre: text("genre").$type<Genre>().notNull(),
    // Display-only provenance shown in the story eyebrow. Never queried, so it
    // stays jsonb rather than earning its own table.
    sources: jsonb("sources").$type<SourceRef[]>().notNull().default([]),
    rank: integer("rank"),
    lead: boolean("lead").notNull().default(false),
    imageSrc: text("image_src"),
    imageAlt: text("image_alt"),
    imageCredit: text("image_credit"),
    publishedAt: date("published_at").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("stories_issue_id_idx").on(t.issueId),
    index("stories_rank_idx").on(t.rank),
  ],
);

export const analogies = pgTable(
  "analogies",
  {
    id: serial("id").primaryKey(),
    storyId: integer("story_id")
      .notNull()
      .references(() => stories.id, { onDelete: "cascade" }),
    // Six per story, two per category. `position` preserves the authored order
    // within a story, which category grouping alone would lose.
    position: integer("position").notNull(),
    category: text("category").$type<AnalogyCategory>().notNull(),
    title: text("title").notNull(),
    source: text("source").notNull(),
    excerpt: text("excerpt").notNull(),
    href: text("href").notNull(),
    imageSrc: text("image_src"),
    imageAlt: text("image_alt"),
    imageCredit: text("image_credit"),
    // asserted | verified | held | failed. "asserted" means the author claims the
    // excerpt and link are good; "verified" is reserved for an automated check
    // that actually resolved them (ARCHITECTURE §4, not yet built).
    verificationStatus: text("verification_status"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    index("analogies_story_id_idx").on(t.storyId),
    unique("analogies_story_position_unq").on(t.storyId, t.position),
  ],
);

// Closes the chain: story -> candidates -> articles -> source URL. Legacy stories
// predate the candidates layer and simply have no rows here.
export const storyCandidates = pgTable(
  "story_candidates",
  {
    storyId: integer("story_id")
      .notNull()
      .references(() => stories.id, { onDelete: "cascade" }),
    candidateId: integer("candidate_id")
      .notNull()
      .references(() => candidates.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.storyId, t.candidateId] })],
);

export type Feed = typeof feeds.$inferSelect;
export type NewFeed = typeof feeds.$inferInsert;
export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
export type Candidate = typeof candidates.$inferSelect;
export type NewCandidate = typeof candidates.$inferInsert;
export type NewCandidateArticle = typeof candidateArticles.$inferInsert;
export type Issue = typeof issues.$inferSelect;
export type NewIssue = typeof issues.$inferInsert;
export type NewStory = typeof stories.$inferInsert;
export type NewAnalogy = typeof analogies.$inferInsert;
