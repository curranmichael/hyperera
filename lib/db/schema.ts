import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  date,
  unique,
  index,
  primaryKey,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

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

export type Feed = typeof feeds.$inferSelect;
export type NewFeed = typeof feeds.$inferInsert;
export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
export type Candidate = typeof candidates.$inferSelect;
export type NewCandidate = typeof candidates.$inferInsert;
export type NewCandidateArticle = typeof candidateArticles.$inferInsert;
