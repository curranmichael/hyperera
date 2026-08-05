-- AP and Reuters moved from single `when:1d` Google News URLs to day-sharded
-- fetching (lib/feeds.ts). The seeder inserts keyed by url and never rewrites
-- urls, so a database seeded before the change would keep the old rows active
-- alongside the new ones — one publisher counting as two distinct feeds in
-- triage's sourceCount. Reconcile each old row: move it to the new identity when
-- the new row doesn't exist yet, otherwise deactivate it (deleting would cascade
-- to its articles; deactivated, it keeps its history and is never fetched again).
UPDATE "feeds" SET
  "url" = 'https://news.google.com/rss/search?q=site:apnews.com&hl=en-US&gl=US&ceid=US:en',
  "fetch_strategy" = 'daily_shard',
  "url_template" = 'https://news.google.com/rss/search?q=site:apnews.com+after:{after}+before:{before}&hl=en-US&gl=US&ceid=US:en'
WHERE "url" = 'https://news.google.com/rss/search?q=site:apnews.com+when:1d&hl=en-US&gl=US&ceid=US:en'
  AND NOT EXISTS (
    SELECT 1 FROM "feeds"
    WHERE "url" = 'https://news.google.com/rss/search?q=site:apnews.com&hl=en-US&gl=US&ceid=US:en'
  );--> statement-breakpoint
UPDATE "feeds" SET "active" = false
WHERE "url" = 'https://news.google.com/rss/search?q=site:apnews.com+when:1d&hl=en-US&gl=US&ceid=US:en';--> statement-breakpoint
UPDATE "feeds" SET
  "url" = 'https://news.google.com/rss/search?q=site:reuters.com&hl=en-US&gl=US&ceid=US:en',
  "fetch_strategy" = 'daily_shard',
  "url_template" = 'https://news.google.com/rss/search?q=site:reuters.com+after:{after}+before:{before}&hl=en-US&gl=US&ceid=US:en'
WHERE "url" = 'https://news.google.com/rss/search?q=site:reuters.com+when:1d&hl=en-US&gl=US&ceid=US:en'
  AND NOT EXISTS (
    SELECT 1 FROM "feeds"
    WHERE "url" = 'https://news.google.com/rss/search?q=site:reuters.com&hl=en-US&gl=US&ceid=US:en'
  );--> statement-breakpoint
UPDATE "feeds" SET "active" = false
WHERE "url" = 'https://news.google.com/rss/search?q=site:reuters.com+when:1d&hl=en-US&gl=US&ceid=US:en';--> statement-breakpoint
-- No automated link verification has ever run; every "verified" row to date was
-- an author assertion recorded at publish time. Rename them so "verified" is
-- reserved for a check that actually resolved the link (ARCHITECTURE §4).
UPDATE "analogies" SET "verification_status" = 'asserted' WHERE "verification_status" = 'verified';
