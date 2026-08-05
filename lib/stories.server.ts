// Reads of the published magazine, straight from Neon.
//
// Separate from `lib/stories.ts` only because that module is imported by client
// components and this one imports `pg`. Types and presentation constants live
// there; the queries live here, inline — three read paths don't warrant
// repositories, DTOs, or mappers.
//
// Only stories belonging to a *published* issue are ever returned. Draft issues
// are visible solely through the editorial view.

import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  analogies as analogiesTable,
  issues,
  stories as storiesTable,
} from "@/lib/db/schema";
import type {
  Analogy,
  Genre,
  ImageRef,
  IssueSummary,
  SourceRef,
  Story,
} from "@/lib/stories";

function imageFrom(
  src: string | null,
  alt: string | null,
  credit: string | null,
): ImageRef | undefined {
  if (!src) return undefined;
  return { src, alt: alt ?? "", ...(credit ? { credit } : {}) };
}

const storyColumns = {
  id: storiesTable.id,
  slug: storiesTable.slug,
  headline: storiesTable.headline,
  overview: storiesTable.overview,
  genre: storiesTable.genre,
  sources: storiesTable.sources,
  publishedAt: storiesTable.publishedAt,
  imageSrc: storiesTable.imageSrc,
  imageAlt: storiesTable.imageAlt,
  imageCredit: storiesTable.imageCredit,
  lead: storiesTable.lead,
  rank: storiesTable.rank,
  edition: issues.title,
};

interface StoryRow {
  id: number;
  slug: string;
  headline: string;
  overview: string;
  genre: Genre;
  sources: SourceRef[];
  publishedAt: string;
  imageSrc: string | null;
  imageAlt: string | null;
  imageCredit: string | null;
  lead: boolean;
  rank: number | null;
  edition: string;
}

// Attach each story's analogies in authored order. One extra query for the whole
// set rather than one per story.
async function withAnalogies(rows: StoryRow[]): Promise<Story[]> {
  if (rows.length === 0) return [];

  const analogyRows = await db
    .select()
    .from(analogiesTable)
    .where(
      inArray(
        analogiesTable.storyId,
        rows.map((r) => r.id),
      ),
    )
    .orderBy(analogiesTable.storyId, analogiesTable.position);

  const byStory = new Map<number, Analogy[]>();
  for (const a of analogyRows) {
    const list = byStory.get(a.storyId) ?? [];
    list.push({
      category: a.category,
      title: a.title,
      excerpt: a.excerpt,
      source: a.source,
      href: a.href,
      image: imageFrom(a.imageSrc, a.imageAlt, a.imageCredit),
    });
    byStory.set(a.storyId, list);
  }

  return rows.map((r) => ({
    slug: r.slug,
    headline: r.headline,
    overview: r.overview,
    genre: r.genre,
    sources: r.sources,
    publishedAt: r.publishedAt,
    image: imageFrom(r.imageSrc, r.imageAlt, r.imageCredit),
    ...(r.lead ? { lead: true } : {}),
    ...(r.rank !== null ? { rank: r.rank } : {}),
    edition: r.edition,
    analogies: byStory.get(r.id) ?? [],
  }));
}

// Editorial order: rank ascending with unranked last, date breaking ties.
const editorialOrder = [
  sql`${storiesTable.rank} asc nulls last`,
  desc(storiesTable.publishedAt),
];

export async function getPublishedStories(): Promise<Story[]> {
  const rows = await db
    .select(storyColumns)
    .from(storiesTable)
    .innerJoin(issues, eq(storiesTable.issueId, issues.id))
    .where(eq(issues.status, "published"))
    .orderBy(...editorialOrder);
  return withAnalogies(rows);
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const rows = await db
    .select(storyColumns)
    .from(storiesTable)
    .innerJoin(issues, eq(storiesTable.issueId, issues.id))
    .where(and(eq(storiesTable.slug, slug), eq(issues.status, "published")));
  const [story] = await withAnalogies(rows);
  return story ?? null;
}

export async function getStorySlugs(): Promise<string[]> {
  const rows = await db
    .select({ slug: storiesTable.slug })
    .from(storiesTable)
    .innerJoin(issues, eq(storiesTable.issueId, issues.id))
    .where(eq(issues.status, "published"));
  return rows.map((r) => r.slug);
}

// Slugs from the most recent published issues only. Prerendering the entire
// archive would make build time grow with every issue ever published; older
// stories render on demand instead and are cached from then on.
export async function getRecentStorySlugs(
  issueCount: number,
): Promise<string[]> {
  const recent = await db
    .select({ id: issues.id })
    .from(issues)
    .where(eq(issues.status, "published"))
    .orderBy(desc(issues.number))
    .limit(issueCount);
  if (recent.length === 0) return [];

  const rows = await db
    .select({ slug: storiesTable.slug })
    .from(storiesTable)
    .where(
      inArray(
        storiesTable.issueId,
        recent.map((i) => i.id),
      ),
    );
  return rows.map((r) => r.slug);
}

// The stories of one published issue, in editorial order.
export async function getIssue(
  number: number,
): Promise<{ issue: IssueSummary; stories: Story[] } | null> {
  const [issue] = await db
    .select()
    .from(issues)
    .where(and(eq(issues.number, number), eq(issues.status, "published")));
  if (!issue) return null;

  const rows = await db
    .select(storyColumns)
    .from(storiesTable)
    .innerJoin(issues, eq(storiesTable.issueId, issues.id))
    .where(eq(storiesTable.issueId, issue.id))
    .orderBy(...editorialOrder);
  const stories = await withAnalogies(rows);

  return {
    issue: {
      number: issue.number,
      title: issue.title,
      weekStart: issue.weekStart,
      weekEnd: issue.weekEnd,
      storyCount: stories.length,
    },
    stories,
  };
}

// Every published issue, newest first — the archive index.
export async function listIssues(): Promise<IssueSummary[]> {
  return db
    .select({
      number: issues.number,
      title: issues.title,
      weekStart: issues.weekStart,
      weekEnd: issues.weekEnd,
      storyCount: sql<number>`count(${storiesTable.id})::int`,
    })
    .from(issues)
    .leftJoin(storiesTable, eq(storiesTable.issueId, issues.id))
    .where(eq(issues.status, "published"))
    .groupBy(issues.id)
    .orderBy(desc(issues.number));
}

// The newest published issue — what the home page shows.
export async function getCurrentIssue(): Promise<{
  issue: IssueSummary;
  stories: Story[];
} | null> {
  const [newest] = await db
    .select({ number: issues.number })
    .from(issues)
    .where(eq(issues.status, "published"))
    .orderBy(desc(issues.number))
    .limit(1);
  return newest ? getIssue(newest.number) : null;
}
