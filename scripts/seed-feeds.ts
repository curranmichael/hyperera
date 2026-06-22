import { db } from "../lib/db";
import { feeds } from "../lib/db/schema";
import { seedFeeds } from "../lib/feeds";

// Idempotent: upserts the seed feed list by `url`. Run with `npm run db:seed`.
async function main() {
  console.log(`Seeding ${seedFeeds.length} feeds...`);

  const inserted = await db
    .insert(feeds)
    .values(seedFeeds)
    .onConflictDoNothing({ target: feeds.url })
    .returning({ title: feeds.title });

  for (const f of inserted) console.log(`  + ${f.title}`);
  const skipped = seedFeeds.length - inserted.length;
  console.log(
    `Done: ${inserted.length} inserted, ${skipped} already present (skipped).`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
