// The reading model's types and presentation vocabulary.
//
// This module must stay free of runtime imports: client components (LeadStory,
// and anything else marked "use client") import `Story` from here, so anything
// this file pulls in at runtime lands in the browser bundle. The Drizzle
// accessors therefore live in `lib/stories.server.ts` — a server/client boundary,
// not a repository layer.

export type AnalogyCategory = "historical" | "literary" | "artistic";

export interface ImageRef {
  src: string;
  alt: string;
  credit?: string;
}

export interface SourceRef {
  name: string;
  href: string;
}

export interface Analogy {
  category: AnalogyCategory;
  title: string;
  excerpt: string;
  source: string;
  href: string;
  image?: ImageRef;
}

// A curated, extensible vocabulary. Each genre carries its own Radix accent so
// the grid reads at a glance, with one place to retune.
//
// This list is also the department list — an issue is grouped by genre, and there
// is deliberately no parallel `department` field or taxonomy table. The culture
// half was added when the publication went weekly: the old seven were news-shaped,
// and "Culture" had become the single largest bucket by carrying everything that
// wasn't politics or economics.
export type Genre =
  | "Politics"
  | "Conflict"
  | "Economy"
  | "Climate"
  | "Science"
  | "Technology"
  | "Culture"
  | "Art"
  | "Books"
  | "Music"
  | "Film"
  | "Architecture";

export const genreMeta: Record<
  Genre,
  {
    color:
      | "ruby"
      | "teal"
      | "iris"
      | "gold"
      | "plum"
      | "sky"
      | "bronze"
      | "pink"
      | "brown"
      | "violet"
      | "cyan"
      | "grass";
  }
> = {
  Politics: { color: "ruby" },
  Conflict: { color: "bronze" },
  Economy: { color: "gold" },
  Climate: { color: "teal" },
  Science: { color: "sky" },
  Technology: { color: "iris" },
  Culture: { color: "plum" },
  Art: { color: "pink" },
  Books: { color: "brown" },
  Music: { color: "violet" },
  Film: { color: "cyan" },
  Architecture: { color: "grass" },
};

// The order departments run in within an issue: news first, then culture.
export const genreOrder: Genre[] = Object.keys(genreMeta) as Genre[];

export interface Story {
  slug: string;
  headline: string;
  overview: string;
  genre: Genre;
  sources: SourceRef[];
  publishedAt: string; // ISO date
  image?: ImageRef;
  lead?: boolean; // the editor's hero pick on the home grid
  rank?: number; // editorial ordering (ascending); date breaks ties
  edition?: string; // the issue label this story was published under
  analogies: Analogy[];
}

export interface IssueSummary {
  number: number;
  title: string;
  weekStart: string;
  weekEnd: string;
  storyCount: number;
}

// The order categories are presented in, and the Radix accent each maps to.
export const categoryOrder: AnalogyCategory[] = [
  "historical",
  "literary",
  "artistic",
];

export const categoryMeta: Record<
  AnalogyCategory,
  { label: string; color: "amber" | "indigo" | "crimson" }
> = {
  historical: { label: "Historical", color: "amber" },
  literary: { label: "Literary", color: "indigo" },
  artistic: { label: "Musical / Artistic", color: "crimson" },
};

export function formatStoryDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
