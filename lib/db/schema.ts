import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";

// The dynamic, editable list of publication feeds to scan.
export const feeds = pgTable("feeds", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull().unique(),
  kind: text("kind"), // news | design | tech | culture | art (free-form for now)
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Raw items as ingested from feeds (the un-clustered layer). Stage 3 clustering
// will group these into events by setting `eventId`.
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
    eventId: integer("event_id"), // null until clustered (Stage 3)
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [
    // Idempotent dedupe key: one row per (feed, item) so re-ingesting is a no-op.
    unique("articles_feed_guid_unq").on(t.feedId, t.guid),
    index("articles_published_at_idx").on(t.publishedAt),
    index("articles_event_id_idx").on(t.eventId),
  ],
);

export type Feed = typeof feeds.$inferSelect;
export type NewFeed = typeof feeds.$inferInsert;
export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
