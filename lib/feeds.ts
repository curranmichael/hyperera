export type FeedKind = "news" | "design" | "tech" | "culture" | "art";

// How an ingest run turns one feed row into URLs to fetch.
//
//  - "static"      — fetch `url` as-is. Ordinary RSS/Atom.
//  - "daily_shard" — expand `urlTemplate` once per day across the requested window.
//
// Google News caps every query at 100 items with no pagination, so a single
// `when:7d` call returns roughly one day's worth of items smeared across the
// week. Measured against apnews.com: `when:7d` yields 101 unique titles, while
// seven per-day `after:`/`before:` calls yield 668 — 6.6x more, and the
// `when:7d` set is a strict subset. Sharding by explicit date also makes a
// missed run backfillable, since each shard names the day it covers.
export type FetchStrategy = "static" | "daily_shard";

export interface SeedFeed {
  title: string;
  url: string; // canonical identity; the unique key feeds are upserted by
  kind: FeedKind;
  fetchStrategy?: FetchStrategy; // defaults to "static"
  urlTemplate?: string; // required for "daily_shard"; {after}/{before} are YYYY-MM-DD
}

const GOOGLE_NEWS_LOCALE = "hl=en-US&gl=US&ceid=US:en";

// A day-sharded Google News publisher feed. `url` keeps the unsharded query as a
// stable identity so re-seeding is idempotent; only `urlTemplate` is ever fetched.
function googleNews(site: string) {
  return {
    url: `https://news.google.com/rss/search?q=site:${site}&${GOOGLE_NEWS_LOCALE}`,
    fetchStrategy: "daily_shard" as const,
    urlTemplate: `https://news.google.com/rss/search?q=site:${site}+after:{after}+before:{before}&${GOOGLE_NEWS_LOCALE}`,
  };
}

// Editable seed list. Feeds are upserted by `url` (see scripts/seed-feeds.ts), so
// adding entries here and re-running `npm run db:seed` adds the new ones and leaves
// existing rows untouched.
//
// Feeds are rolling windows, and a weekly magazine needs a week of them. Measured
// spans: BBC World holds only ~2.8 days because it is high-volume, but the slower
// BBC sections hold far longer (Science ~138d, Business ~92d, In Depth ~43d), and
// the culture sources hold weeks by nature. AP and Reuters hold ~1 day and no
// query widens them past the 100-item cap, which is why they are day-sharded.
//
// AP and Reuters no longer publish official RSS, so they come through the Google
// News proxy filtered to each publisher's domain. Those item links are Google
// redirects that resolve to the publisher.
export const seedFeeds: SeedFeed[] = [
  // --- News ---------------------------------------------------------------
  {
    title: "Associated Press",
    kind: "news",
    ...googleNews("apnews.com"),
  },
  {
    title: "Reuters",
    kind: "news",
    ...googleNews("reuters.com"),
  },
  {
    title: "BBC World",
    url: "https://feeds.bbci.co.uk/news/world/rss.xml",
    kind: "news",
  },
  {
    title: "BBC Business",
    url: "https://feeds.bbci.co.uk/news/business/rss.xml",
    kind: "news",
  },
  {
    title: "BBC Science & Environment",
    url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml",
    kind: "news",
  },
  {
    // Analysis rather than wire copy, and it holds ~43 days — the single most
    // weekly-shaped news feed in the list.
    title: "BBC In Depth",
    url: "https://feeds.bbci.co.uk/news/bbcindepth/rss.xml",
    kind: "news",
  },

  // --- Culture, art, design ------------------------------------------------
  {
    title: "Aeon",
    url: "https://aeon.co/feed.rss",
    kind: "culture",
  },
  {
    title: "The Public Domain Review",
    url: "https://publicdomainreview.org/rss.xml",
    kind: "culture",
  },
  {
    title: "The Paris Review",
    url: "https://www.theparisreview.org/blog/feed/",
    kind: "culture",
  },
  {
    title: "Kottke.org",
    url: "https://feeds.kottke.org/main",
    kind: "culture",
  },
  {
    title: "Colossal",
    url: "https://www.thisiscolossal.com/feed/",
    kind: "art",
  },
  {
    title: "Artforum",
    url: "https://www.artforum.com/feed/",
    kind: "art",
  },
  {
    title: "Dezeen",
    url: "https://www.dezeen.com/feed/",
    kind: "design",
  },
  {
    title: "It's Nice That",
    url: "https://www.itsnicethat.com/articles.rss",
    kind: "design",
  },

  // --- Tech ----------------------------------------------------------------
  {
    title: "Simon Willison's Weblog",
    url: "https://simonwillison.net/atom/everything/",
    kind: "tech",
  },
];

// Expand a day-sharded feed into one URL per day, most recent first. `days` is
// how many whole days back from `end` to cover; `end` defaults to today (UTC).
// Google's `after:`/`before:` bounds are exclusive of `before`, so each shard
// covers exactly the single day named by `after`.
export function shardUrls(
  urlTemplate: string,
  days: number,
  end: Date = new Date(),
): { day: string; url: string }[] {
  const shards: { day: string; url: string }[] = [];
  for (let i = 0; i < days; i++) {
    const after = new Date(end);
    after.setUTCDate(after.getUTCDate() - i);
    const before = new Date(after);
    before.setUTCDate(before.getUTCDate() + 1);
    const day = isoDay(after);
    shards.push({
      day,
      url: urlTemplate
        .replace("{after}", day)
        .replace("{before}", isoDay(before)),
    });
  }
  return shards;
}

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}
