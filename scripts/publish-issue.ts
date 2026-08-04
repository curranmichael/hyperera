// Write a composed issue into Neon, with the provenance links intact.
//
//   npm run issue:publish                          -- reads scratch/issue.json
//   npm run issue:publish -- scratch/issue.json
//   npm run issue:publish -- --draft               -- stage it instead of publishing
//   npm run issue:publish -- --replace             -- rewrite after a revision
//
// The issue is published outright: the weekly routine composes and publishes in one
// pass, and the site picks the new rows up on its next build. `--draft` stages one
// for inspection instead; re-running without `--draft` (plus `--replace`) publishes
// it. A published issue is never rewritten — `--replace` refuses, so live content
// can't be silently replaced.
//
// Validation is deliberately strict and reports every problem at once: this runs at
// the end of a long composition pass, and failing one error at a time would mean
// re-running it six times.
//
// Expected shape (see .claude/commands/publish-weekly.md for how it's produced):
//
// {
//   "number": 4,                              // optional; defaults to the next one
//   "title": "Issue 4 · 1–7 August 2026",
//   "weekStart": "2026-08-01",
//   "weekEnd": "2026-08-07",
//   "stories": [{
//     "slug": "rhine-record-low-drought-europe",
//     "headline": "...", "overview": "...", "genre": "Climate",
//     "lead": true,                           // exactly one story per issue
//     "rank": 1,                              // optional; defaults to array order
//     "publishedAt": "2026-08-07",            // optional; defaults to weekEnd
//     "sources": [{ "name": "BBC", "href": "https://..." }],
//     "image": { "src": "/covers/<slug>.png", "alt": "...", "credit": "BBC" },
//     "candidateIds": [412, 508],             // the threads this story was composed from
//     "analogies": [                          // exactly 6: 2 historical, 2 literary, 2 artistic
//       { "category": "historical", "title": "...", "source": "...",
//         "excerpt": "...", "href": "https://...",
//         "image": { "src": "/covers/<slug>--a1.png", "alt": "...", "credit": "..." } }
//     ]
//   }]
// }

import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { eq, inArray, max, sql } from "drizzle-orm";
import { db } from "../lib/db";
import {
  analogies as analogiesTable,
  candidates,
  issues,
  stories as storiesTable,
  storyCandidates,
  type NewAnalogy,
  type NewStory,
} from "../lib/db/schema";
import {
  categoryOrder,
  genreMeta,
  type AnalogyCategory,
  type Genre,
} from "../lib/stories";

const DEFAULT_INPUT = join("scratch", "issue.json");
const COVERS_DIR = join(process.cwd(), "public", "covers");

// The issue size the weekly format is built around. Outside it is a warning, not
// an error — an unusually thin or fat week is an editorial call, not a bug.
const TARGET_MIN = 15;
const TARGET_MAX = 20;

// Two per category, in the order the reader meets them.
const ANALOGIES_PER_STORY = 6;
const PER_CATEGORY = 2;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

interface ImageInput {
  src?: unknown;
  alt?: unknown;
  credit?: unknown;
}

interface AnalogyInput {
  category?: unknown;
  title?: unknown;
  source?: unknown;
  excerpt?: unknown;
  href?: unknown;
  image?: ImageInput;
}

interface StoryInput {
  slug?: unknown;
  headline?: unknown;
  overview?: unknown;
  genre?: unknown;
  lead?: unknown;
  rank?: unknown;
  publishedAt?: unknown;
  sources?: unknown;
  image?: ImageInput;
  candidateIds?: unknown;
  analogies?: unknown;
}

interface IssueInput {
  number?: unknown;
  title?: unknown;
  weekStart?: unknown;
  weekEnd?: unknown;
  stories?: unknown;
}

const problems: string[] = [];
const warnings: string[] = [];

function fail(message: string) {
  problems.push(message);
}

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

function isHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

// The publishing contract (see the header) is a local dithered PNG under
// public/covers. A single filename segment only, so the path can't traverse out
// of the directory. Anything else — a remote URL, some other local path — would
// bypass the dither step, and next.config.ts allow-lists no remote hosts, so a
// remote src would fail next/image at render time: a broken weekly build, a week
// after validation waved it through.
const COVER_SRC = /^\/covers\/[A-Za-z0-9][A-Za-z0-9._-]*\.png$/;

async function coverExists(src: string): Promise<boolean> {
  try {
    await access(join(COVERS_DIR, src.slice("/covers/".length)));
    return true;
  } catch {
    return false;
  }
}

// Images are optional, but a /covers/ path that doesn't exist means the dither
// step was skipped — a broken image in the published issue, caught here.
async function checkImage(
  image: ImageInput | undefined,
  where: string,
): Promise<void> {
  if (!image) return;
  const src = str(image.src);
  if (!src) {
    fail(`${where}: image has no src`);
    return;
  }
  if (!str(image.alt)) fail(`${where}: image needs alt text`);
  if (!COVER_SRC.test(src)) {
    fail(`${where}: image src must be a /covers/<name>.png path, got ${src}`);
    return;
  }
  if (!(await coverExists(src))) {
    fail(`${where}: ${src} is missing from public/covers — run the dither step`);
  }
}

async function validateStory(
  raw: StoryInput,
  index: number,
  weekEnd: string,
): Promise<void> {
  const where = `story ${index + 1}${str(raw.slug) ? ` (${str(raw.slug)})` : ""}`;

  const slug = str(raw.slug);
  if (!slug) fail(`${where}: slug is required`);
  else if (!SLUG.test(slug)) fail(`${where}: slug must be kebab-case`);

  if (!str(raw.headline)) fail(`${where}: headline is required`);

  const overview = str(raw.overview);
  if (!overview) fail(`${where}: overview is required`);
  else if (overview.length < 300) {
    warnings.push(
      `${where}: overview is ${overview.length} chars — thin for a weekly arc`,
    );
  }

  const genre = str(raw.genre);
  if (!genre) fail(`${where}: genre is required`);
  else if (!(genre in genreMeta)) {
    fail(`${where}: unknown genre "${genre}" (see Genre in lib/stories.ts)`);
  }

  const publishedAt = str(raw.publishedAt) ?? weekEnd;
  if (!ISO_DATE.test(publishedAt)) {
    fail(`${where}: publishedAt must be YYYY-MM-DD`);
  }

  if (raw.rank !== undefined && !Number.isInteger(raw.rank)) {
    fail(`${where}: rank must be an integer`);
  }

  const sources = Array.isArray(raw.sources) ? raw.sources : [];
  if (sources.length === 0) fail(`${where}: at least one source is required`);
  for (const [i, source] of sources.entries()) {
    const s = source as { name?: unknown; href?: unknown };
    if (!str(s.name)) fail(`${where}: source ${i + 1} needs a name`);
    if (!isHttpUrl(s.href)) fail(`${where}: source ${i + 1} needs an http(s) href`);
  }

  await checkImage(raw.image, where);

  const candidateIds = Array.isArray(raw.candidateIds) ? raw.candidateIds : [];
  if (candidateIds.length === 0) {
    warnings.push(
      `${where}: no candidateIds — the story → candidates → articles chain will be broken`,
    );
  }
  for (const id of candidateIds) {
    if (!Number.isInteger(id)) fail(`${where}: candidateIds must be integers`);
  }

  const analogies = Array.isArray(raw.analogies) ? raw.analogies : [];
  if (analogies.length !== ANALOGIES_PER_STORY) {
    fail(`${where}: expected ${ANALOGIES_PER_STORY} analogies, got ${analogies.length}`);
  }
  const counts = new Map<string, number>();
  for (const [i, entry] of analogies.entries()) {
    const a = entry as AnalogyInput;
    const label = `${where}, analogy ${i + 1}`;
    const category = str(a.category);
    if (!category || !categoryOrder.includes(category as AnalogyCategory)) {
      fail(`${label}: category must be one of ${categoryOrder.join(", ")}`);
    } else {
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }
    if (!str(a.title)) fail(`${label}: title is required`);
    if (!str(a.source)) fail(`${label}: source is required`);
    if (!str(a.excerpt)) fail(`${label}: excerpt is required`);
    if (!isHttpUrl(a.href)) fail(`${label}: href must be an http(s) link`);
    await checkImage(a.image, label);
  }
  if (analogies.length === ANALOGIES_PER_STORY) {
    for (const category of categoryOrder) {
      const n = counts.get(category) ?? 0;
      if (n !== PER_CATEGORY) {
        fail(`${where}: expected ${PER_CATEGORY} ${category} analogies, got ${n}`);
      }
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const replace = args.includes("--replace");
  const draft = args.includes("--draft");
  const input = args.find((a) => !a.startsWith("--")) ?? DEFAULT_INPUT;

  const payload = JSON.parse(await readFile(input, "utf8")) as IssueInput;

  const title = str(payload.title);
  const weekStart = str(payload.weekStart);
  const weekEnd = str(payload.weekEnd);
  if (!title) fail("issue: title is required");
  if (!weekStart || !ISO_DATE.test(weekStart)) fail("issue: weekStart must be YYYY-MM-DD");
  if (!weekEnd || !ISO_DATE.test(weekEnd)) fail("issue: weekEnd must be YYYY-MM-DD");
  if (weekStart && weekEnd && weekStart > weekEnd) {
    fail("issue: weekStart is after weekEnd");
  }

  const storyInputs = Array.isArray(payload.stories)
    ? (payload.stories as StoryInput[])
    : [];
  if (storyInputs.length === 0) fail("issue: stories is empty");
  if (storyInputs.length < TARGET_MIN || storyInputs.length > TARGET_MAX) {
    warnings.push(
      `issue: ${storyInputs.length} stories, outside the ${TARGET_MIN}–${TARGET_MAX} the format targets`,
    );
  }

  const leads = storyInputs.filter((s) => s.lead === true);
  if (leads.length !== 1) {
    fail(`issue: exactly one story must be the lead, found ${leads.length}`);
  }

  for (const [i, story] of storyInputs.entries()) {
    await validateStory(story, i, weekEnd ?? "");
  }

  // Slugs are the permanent URL of a story, and unique across the whole archive.
  const slugs = storyInputs.map((s) => str(s.slug)).filter((s): s is string => !!s);
  const duplicated = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  if (duplicated.length > 0) {
    fail(`issue: duplicate slugs in payload: ${[...new Set(duplicated)].join(", ")}`);
  }

  // An explicit number must be a positive integer — a stray 0, negative, or
  // "4"-as-string should be a loud error, not a silent fall-through to next.
  if (
    payload.number !== undefined &&
    (!Number.isInteger(payload.number) || (payload.number as number) < 1)
  ) {
    fail(`issue: number must be a positive integer, got ${JSON.stringify(payload.number)}`);
  }

  const [{ highest }] = await db
    .select({ highest: max(issues.number) })
    .from(issues);
  const number = Number.isInteger(payload.number)
    ? (payload.number as number)
    : (highest ?? 0) + 1;

  const [existing] = await db
    .select()
    .from(issues)
    .where(eq(issues.number, number));
  if (existing) {
    if (existing.status === "published") {
      // Live content is never rewritten in place. Readers already have this issue's
      // URLs, and a rewrite would silently change what they point at.
      fail(`issue ${number} is already published — pick another number`);
    } else if (!replace) {
      fail(
        `issue ${number} already exists as a draft — re-run with --replace to overwrite it`,
      );
    }
  }

  // Slug collisions against the rest of the archive. The draft being replaced owns
  // its own slugs, so those don't count against it.
  if (slugs.length > 0) {
    const taken = await db
      .select({ slug: storiesTable.slug, issueId: storiesTable.issueId })
      .from(storiesTable)
      .where(inArray(storiesTable.slug, slugs));
    const collisions = taken
      .filter((t) => !(existing && replace && t.issueId === existing.id))
      .map((t) => t.slug);
    if (collisions.length > 0) {
      fail(`issue: slugs already published: ${collisions.join(", ")}`);
    }
  }

  // Every candidate reference must resolve, or the provenance chain records a link
  // to nothing.
  const allCandidateIds = [
    ...new Set(
      storyInputs.flatMap((s) =>
        Array.isArray(s.candidateIds) ? (s.candidateIds as number[]) : [],
      ),
    ),
  ];
  if (allCandidateIds.length > 0) {
    const found = await db
      .select({ id: candidates.id })
      .from(candidates)
      .where(inArray(candidates.id, allCandidateIds));
    const known = new Set(found.map((c) => c.id));
    const unknown = allCandidateIds.filter((id) => !known.has(id));
    if (unknown.length > 0) {
      fail(`issue: no such candidate(s): ${unknown.join(", ")}`);
    }
  }

  if (problems.length > 0) {
    console.error(`${problems.length} problem(s) with ${input}:`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }

  await db.transaction(async (tx) => {
    if (existing && replace) {
      // Cascades to stories, analogies and story_candidates.
      await tx.delete(issues).where(eq(issues.id, existing.id));
    }

    const [issue] = await tx
      .insert(issues)
      .values({
        number,
        title: title!,
        weekStart: weekStart!,
        weekEnd: weekEnd!,
        status: draft ? "draft" : "published",
        publishedAt: draft ? null : new Date(),
      })
      .returning({ id: issues.id });

    for (const [i, raw] of storyInputs.entries()) {
      const image = raw.image;
      const row: NewStory = {
        issueId: issue.id,
        slug: str(raw.slug)!,
        headline: str(raw.headline)!,
        overview: str(raw.overview)!,
        genre: str(raw.genre) as Genre,
        sources: (raw.sources as { name: string; href: string }[]).map((s) => ({
          name: str(s.name)!,
          href: s.href,
        })),
        rank: Number.isInteger(raw.rank) ? (raw.rank as number) : i + 1,
        lead: raw.lead === true,
        imageSrc: str(image?.src),
        imageAlt: str(image?.alt),
        imageCredit: str(image?.credit),
        publishedAt: str(raw.publishedAt) ?? weekEnd!,
      };
      const [inserted] = await tx
        .insert(storiesTable)
        .values(row)
        .returning({ id: storiesTable.id });

      const analogyRows: NewAnalogy[] = (raw.analogies as AnalogyInput[]).map(
        (a, position) => ({
          storyId: inserted.id,
          position,
          category: str(a.category) as AnalogyCategory,
          title: str(a.title)!,
          source: str(a.source)!,
          excerpt: str(a.excerpt)!,
          href: a.href as string,
          imageSrc: str(a.image?.src),
          imageAlt: str(a.image?.alt),
          imageCredit: str(a.image?.credit),
          // "asserted", not "verified": the composing routine checks excerpts and
          // links against the works as it writes, but nothing here resolves the
          // href — isHttpUrl only proves it is well-formed. "verified" is reserved
          // for an automated check that actually ran (ARCHITECTURE §4, not built).
          verificationStatus: "asserted",
        }),
      );
      await tx.insert(analogiesTable).values(analogyRows);

      const candidateIds = Array.isArray(raw.candidateIds)
        ? [...new Set(raw.candidateIds as number[])]
        : [];
      if (candidateIds.length > 0) {
        await tx
          .insert(storyCandidates)
          .values(
            candidateIds.map((candidateId) => ({
              storyId: inserted.id,
              candidateId,
            })),
          )
          .onConflictDoNothing();
      }
    }
  });

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(storiesTable)
    .innerJoin(issues, eq(storiesTable.issueId, issues.id))
    .where(eq(issues.number, number));

  for (const w of warnings) console.warn(`warning: ${w}`);
  console.log(
    `Issue ${number} — "${title}" ${draft ? "staged as a draft" : "published"}: ` +
      `${count} stories, ${count * ANALOGIES_PER_STORY} analogies.`,
  );
  console.log(
    draft
      ? "Re-run without --draft (with --replace) to publish it."
      : "It goes live on the next build — push the covers commit to main.",
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
