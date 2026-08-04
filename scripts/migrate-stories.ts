// One-time import of the hand-curated legacy stories into Neon.
//
// It reads scripts/legacy-stories.json — a frozen snapshot of the array that used
// to live inline in lib/stories.ts, taken at commit 3cbe7b0, the last commit before
// that file became DB-backed. Reading a snapshot rather than the live accessors is
// deliberate: those now read the very table this script writes, so sourcing from
// them would make --force delete the issues and then re-import nothing.
//
// The import means the archive starts populated — the thrice-daily editions this
// publication ran before going weekly become legacy issues rather than being
// thrown away — and it gives the Drizzle swap something to be diffed against.
//
//   npm run db:migrate-stories              -- refuses if `issues` is non-empty
//   npm run db:migrate-stories -- --force   -- wipes issues (cascades) and re-imports

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { sql } from "drizzle-orm";
import { db } from "../lib/db";
import {
  analogies,
  issues,
  stories as storiesTable,
  type NewAnalogy,
  type NewStory,
} from "../lib/db/schema";
import type { Story } from "../lib/stories";

const SNAPSHOT = join(process.cwd(), "scripts", "legacy-stories.json");

function loadSnapshot(): Story[] {
  return JSON.parse(readFileSync(SNAPSHOT, "utf8")) as Story[];
}

const LEGACY_LABEL = "Earlier Stories";

// Group by edition label, preserving the chronological order the editions ran in.
// Each legacy edition covered a single day, so weekStart === weekEnd.
function groupIntoIssues(all: Story[]) {
  const byLabel = new Map<string, Story[]>();
  for (const story of all) {
    const label = story.edition ?? LEGACY_LABEL;
    const bucket = byLabel.get(label);
    if (bucket) bucket.push(story);
    else byLabel.set(label, [story]);
  }

  return [...byLabel.entries()]
    .map(([title, group]) => {
      const dates = group.map((s) => s.publishedAt).sort();
      return {
        title,
        weekStart: dates[0],
        weekEnd: dates[dates.length - 1],
        // Editorial rank ascends from the newest edition, so the smallest rank in a
        // group identifies how recent that edition is. Date alone can't order a
        // Morning and an Evening edition that share a day.
        minRank: Math.min(
          ...group.map((s) => s.rank ?? Number.MAX_SAFE_INTEGER),
        ),
        stories: group,
      };
    })
    // Oldest first, so issue numbers ascend with time and the newest issue has the
    // highest number — the ordering the archive and "current issue" both rely on.
    .sort((a, b) => b.minRank - a.minRank || a.weekEnd.localeCompare(b.weekEnd));
}

async function main() {
  const force = process.argv.includes("--force");

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(issues);

  if (count > 0 && !force) {
    console.error(
      `Refusing to run: ${count} issue(s) already exist.\n` +
        `Re-run with --force to wipe issues (cascades to stories and analogies) and re-import.`,
    );
    process.exit(1);
  }
  if (count > 0) {
    console.log(`--force: deleting ${count} existing issue(s)...`);
    await db.delete(issues);
  }

  const all = loadSnapshot();
  const grouped = groupIntoIssues(all);
  console.log(
    `Importing ${all.length} stories across ${grouped.length} legacy issue(s)...`,
  );

  let storyCount = 0;
  let analogyCount = 0;

  for (const [i, group] of grouped.entries()) {
    const [issue] = await db
      .insert(issues)
      .values({
        number: i + 1,
        title: group.title,
        weekStart: group.weekStart,
        weekEnd: group.weekEnd,
        status: "published",
        // These really were published; the DB just didn't know about them.
        publishedAt: new Date(`${group.weekEnd}T12:00:00Z`),
      })
      .returning({ id: issues.id, number: issues.number });

    for (const story of group.stories) {
      const row: NewStory = {
        issueId: issue.id,
        slug: story.slug,
        headline: story.headline,
        overview: story.overview,
        genre: story.genre,
        sources: story.sources,
        rank: story.rank ?? null,
        lead: story.lead ?? false,
        imageSrc: story.image?.src ?? null,
        imageAlt: story.image?.alt ?? null,
        imageCredit: story.image?.credit ?? null,
        publishedAt: story.publishedAt,
      };
      const [inserted] = await db
        .insert(storiesTable)
        .values(row)
        .returning({ id: storiesTable.id });
      storyCount++;

      if (story.analogies.length) {
        const rows: NewAnalogy[] = story.analogies.map((a, position) => ({
          storyId: inserted.id,
          position,
          category: a.category,
          title: a.title,
          source: a.source,
          excerpt: a.excerpt,
          href: a.href,
          imageSrc: a.image?.src ?? null,
          imageAlt: a.image?.alt ?? null,
          imageCredit: a.image?.credit ?? null,
          // These shipped to readers under human review; the automated
          // verification pass (ARCHITECTURE §4) never ran on them.
          verificationStatus: "verified",
        }));
        await db.insert(analogies).values(rows);
        analogyCount += rows.length;
      }
    }

    console.log(
      `  Issue ${issue.number}: ${group.title} (${group.stories.length} stories)`,
    );
  }

  console.log(
    `Done: ${grouped.length} issues, ${storyCount} stories, ${analogyCount} analogies.`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
