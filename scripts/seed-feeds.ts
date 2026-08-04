import { sql } from "drizzle-orm";
import { db } from "../lib/db";
import { feeds } from "../lib/db/schema";
import { seedFeeds } from "../lib/feeds";

// Idempotent: upserts the seed feed list keyed by `url`, refreshing the mutable
// attributes (title, kind, fetch strategy, url template) on rows that already
// exist so an edit in lib/feeds.ts propagates on reseed. A feed's `url` is its
// identity — changing one is a data migration, not a seed (see
// drizzle/0005_reconcile_wire_feeds_and_verification.sql for the pattern).
// Run with `npm run db:seed`.
async function main() {
  console.log(`Seeding ${seedFeeds.length} feeds...`);

  const upserted = await db
    .insert(feeds)
    .values(seedFeeds)
    .onConflictDoUpdate({
      target: feeds.url,
      set: {
        title: sql`excluded.title`,
        kind: sql`excluded.kind`,
        fetchStrategy: sql`excluded.fetch_strategy`,
        urlTemplate: sql`excluded.url_template`,
      },
    })
    .returning({ title: feeds.title });

  for (const f of upserted) console.log(`  ✓ ${f.title}`);
  console.log(`Done: ${upserted.length} feeds upserted.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
