export type FeedKind = "news" | "design" | "tech" | "culture" | "art";

export interface SeedFeed {
  title: string;
  url: string;
  kind: FeedKind;
}

// Editable seed list. Feeds are upserted by `url` (see scripts/seed-feeds.ts), so
// adding entries here and re-running `npm run db:seed` adds the new ones and leaves
// existing rows untouched.
//
// AP and Reuters no longer publish official RSS, so they come through the Google News
// RSS proxy filtered to each publisher's domain. Those item links are Google redirects
// that resolve to the publisher; the Stage 6 verify pass will canonicalize them.
export const seedFeeds: SeedFeed[] = [
  {
    title: "Associated Press",
    url: "https://news.google.com/rss/search?q=site:apnews.com+when:1d&hl=en-US&gl=US&ceid=US:en",
    kind: "news",
  },
  {
    title: "Reuters",
    url: "https://news.google.com/rss/search?q=site:reuters.com+when:1d&hl=en-US&gl=US&ceid=US:en",
    kind: "news",
  },
  {
    title: "BBC World",
    url: "https://feeds.bbci.co.uk/news/world/rss.xml",
    kind: "news",
  },
  {
    title: "Dezeen",
    url: "https://www.dezeen.com/feed/",
    kind: "design",
  },
  {
    title: "Simon Willison's Weblog",
    url: "https://simonwillison.net/atom/everything/",
    kind: "tech",
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
    title: "It's Nice That",
    url: "https://www.itsnicethat.com/articles.rss",
    kind: "design",
  },
];
