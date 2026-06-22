// The reading model for the public site. Today these are placeholder stories;
// in a later stage `getPublishedStories` / `getStoryBySlug` will read published
// `events` (+ their verified `analogies`) from Neon. The shapes here mirror that
// data model (ARCHITECTURE.md §5) so the swap is a query change, not a refactor.
//
// Future Neon columns implied below: events gain `genre`, `lead`, `rank`, and
// image columns; `sources` becomes a related table (or jsonb). Images are
// optional everywhere.

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
// the home grid reads at a glance — one place to retune.
export type Genre =
  | "Politics"
  | "Climate"
  | "Technology"
  | "Economy"
  | "Culture"
  | "Science"
  | "Conflict";

export const genreMeta: Record<
  Genre,
  { color: "ruby" | "teal" | "iris" | "gold" | "plum" | "sky" | "bronze" }
> = {
  Politics: { color: "ruby" },
  Climate: { color: "teal" },
  Technology: { color: "iris" },
  Economy: { color: "gold" },
  Culture: { color: "plum" },
  Science: { color: "sky" },
  Conflict: { color: "bronze" },
};

export interface Story {
  slug: string;
  headline: string;
  overview: string;
  genre: Genre;
  sources: SourceRef[];
  href: string;
  publishedAt: string; // ISO date
  image?: ImageRef;
  lead?: boolean; // the editor's hero pick on the home grid
  rank?: number; // editorial ordering (ascending); date breaks ties
  analogies: Analogy[];
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

// Hand-curated front page for 2026-06-22, selected from the live RSS feeds in
// `lib/feeds.ts`. Overviews and analogy excerpts describe rather than quote, in
// keeping with the strict-verification ethos (no unverifiable quotes). `image`
// is set only where the source feed actually carried one — six stories ran
// without art rather than pair a real headline with a stand-in photo. Source
// links to AP/Reuters are Google News redirects (see `lib/feeds.ts`); a later
// verify pass canonicalizes them.
const stories: Story[] = [
  {
    slug: "us-iran-talks-end-first-round-with-progress",
    headline:
      "Adversaries sit down in Switzerland, and the first round ends better than it began",
    overview:
      "US and Iranian negotiators concluded a first round of high-level talks with what mediators called encouraging progress — even after threats nearly upended the table on day one. On the margins, Iran cited major progress toward ending the war in Lebanon. Technical talks are set to continue.",
    genre: "Conflict",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/cwy0q41v1lzo",
      },
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMingFBVV95cUxNNFh5b3dHTzJSUUpQVUtRWDdqTG5SYWtlNHhyNXBuRWZEbHgycFNiZUVkLTJsa3d5NkJiMDVjeDE2LVpEVGJ1YkZURGlpZnc0WlAySkJVcVc2dTJsNHAzNVZQaElzS1BZeVN6TzJDTGFzOV9TZVdZMV9FRHhYNVpsMkV2MjcwNXI0NUtORXlMd2lzTmdlUDl3TWxOblBZQQ?oc=5",
      },
      {
        name: "Reuters",
        href: "https://news.google.com/rss/articles/CBMiuAFBVV95cUxNZWY0di1pSncycGtYTEtHQm9lQXhCWUxRSnlhMHlKdnJIdzdxYWlCcjdPVF9TeWJ6YXZQYU1oVjh0d1hRajdRaklhYU9CMHROR3VIbnNnSTFSaHJHYk1iNUJmLWhpVWU3VDN0cEE0UVZXTmFFQjYzUFZ1eUNNUFh0MmtDWmxWaUhFTjN0aWxMNGlCQ3Uyb0hBSk1Bd1h5cm9lN0RtOEdZSHdRdUlILVJueXJIQTBoMHMy?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/a8b2/live/1e0155f0-6e02-11f1-b1db-af71d47507d6.jpg",
      alt: "The US–Iran talks in Switzerland",
      credit: "BBC",
    },
    lead: true,
    rank: 1,
    analogies: [
      {
        category: "historical",
        title: "The Reykjavík Summit, 1986",
        excerpt:
          "A meeting that failed on the day yet quietly reset the whole confrontation — proof that an inconclusive table can still move the world.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "historical",
        title: "The Cuban Missile Crisis back-channel, 1962",
        excerpt:
          "Public ultimatums raged while the real bargain passed through private messages — brinkmanship and negotiation running on two clocks at once.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "Thucydides, “The Melian Dialogue”",
        excerpt:
          "The oldest script for talks between unequal powers, where the strong propose and the weak weigh their terms.",
        source: "History, 5th c. BCE",
        href: "#",
      },
      {
        category: "literary",
        title: "Aeschylus, “The Eumenides”",
        excerpt:
          "A cycle of vengeance broken not by victory but by submitting the quarrel to a process — the founding myth of arbitration over retribution.",
        source: "Tragedy, 458 BCE",
        href: "#",
      },
      {
        category: "artistic",
        title: "Picasso, “Dove of Peace”",
        excerpt:
          "A fragile emblem drawn for a peace congress, carrying more hope than the moment could bear.",
        source: "Lithograph, 1949",
        href: "#",
      },
      {
        category: "artistic",
        title: "Penderecki, “Threnody to the Victims of Hiroshima”",
        excerpt:
          "The unbearable stakes the negotiators are bargaining against, rendered as sound.",
        source: "Composition, 1960",
        href: "#",
      },
    ],
  },
  {
    slug: "trump-backed-outsider-wins-colombia-election",
    headline:
      "A Trump-backed outsider takes Colombia by a hair, and his rival contests the count",
    overview:
      "Abelardo De La Espriella holds a razor-thin lead as initial counts name him the winner of Colombia's presidential vote. His opponent is already challenging the result, leaving the outcome unsettled.",
    genre: "Politics",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/clye4ky2yzpo",
      },
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMiswFBVV95cUxNSVJHUHV0QWpad1RsZ3czaHFKb1hOU1V4aW5oeGZlbkFfeVNIdHdVdmpqQmRQMUh0cHlFUXFzcnNHdjU1aXNqUFU5NV9lVHZJdVI3QS1aSjJ3LXY3aDlqTnJmeFcyVzZfWVE3a0VOU2VLcU16RzlzQ2hWcTYtWTdHRTM2ODhZby1Od3V4UGM3OXRHbC1XNlRBNGozTUowcFM4N0VYS3IxS3JiVDJNTEpyeHdicw?oc=5",
      },
      {
        name: "Reuters",
        href: "https://news.google.com/rss/articles/CBMiuAFBVV95cUxNQ2NaRTM2QVRsbUROX2wxRnVHU2R6OXQ4M1VKMmtxMXZQSlBEOTZBRmlxTEdQY3dkcU5obTZmUENrNXV3TDlSUDk1enl1UGlVcFdCeUhtemQ5LVIzamF3VG5LSW5fdF9GT2cwYUpjOE5sSzB3WnB1YWlkQldua0xia1M5QkVLd2txZ0tXSVhkS1JVS05UTlQycW5RWFRLVXZSa21yaFAycjRFeWY1dy1pSEZ1S0R1VHNZ?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/9eac/live/b2016940-6dd3-11f1-ac92-691247a7d6f7.jpg",
      alt: "Colombia's contested presidential election",
      credit: "BBC",
    },
    rank: 2,
    analogies: [
      {
        category: "historical",
        title: "Louis-Napoléon's election, 1848",
        excerpt:
          "An outsider riding a borrowed name to power, then remaking the republic around himself.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "García Márquez, “The Autumn of the Patriarch”",
        excerpt:
          "Colombia's own laureate on the solitude and seduction of the strongman.",
        source: "Novel, 1975",
        href: "#",
      },
      {
        category: "artistic",
        title: "Fernando Botero, presidents and generals",
        excerpt:
          "Power swollen to the edge of caricature by Colombia's most famous brush.",
        source: "Paintings, 1970s–",
        href: "#",
      },
    ],
  },
  {
    slug: "russia-masses-near-donbas-as-ukraine-strikes-crimea",
    headline:
      "Russia masses near the city that unlocks the Donbas as Ukraine reaches into Crimea",
    overview:
      "A Russian troop build-up threatens a city seen as the key to seizing the Donbas. Overnight, Moscow said it downed nearly 60 drones, while Ukrainian strikes forced occupied Crimea to halt civilian fuel sales.",
    genre: "Conflict",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/c9w2g0ewk95o",
      },
      {
        name: "BBC (Crimea)",
        href: "https://www.bbc.com/news/articles/clyx2lk9d15o",
      },
      {
        name: "Reuters",
        href: "https://news.google.com/rss/articles/CBMitwFBVV95cUxNbEc0LWRBYUhJcmgtbU9vc3U4Q1NtSDlNbDMzZGU3MzdWSE51NmJaRGtqT2ZfV1IzRk9Sdk93NTNCVWdNbFpBWEwyS0l6WHNYT0o0QnlWOHZzZDZUSVctNC16SFcyNldxQ0VJd1Nodm5JbFhXY01QWGViR3d5dHd0blVmUV8wakNMVVlyUU9PWE9OLS1fVk9jV3FPRXhldjZ0TnJWM25TdmNtTXFPODd2UmNRUm9XcjQ?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-21",
    image: {
      src: "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/5cad/live/dd9b7ea0-6bf9-11f1-8546-8f19e4fe30f4.jpg",
      alt: "Russian forces massing near the Donbas",
      credit: "BBC",
    },
    rank: 3,
    analogies: [
      {
        category: "historical",
        title: "The build-up before Kursk, 1943",
        excerpt:
          "Armies stacking deep for a single decisive thrust, the outcome settled before the first shot.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "Vasily Grossman, “Life and Fate”",
        excerpt:
          "The human ledger kept behind the front line, where strategy meets the individual.",
        source: "Novel, 1959",
        href: "#",
      },
      {
        category: "artistic",
        title: "Valentin Silvestrov, “Silent Songs”",
        excerpt:
          "A Ukrainian composer's quiet refusal of the war's noise — grief held at a whisper.",
        source: "Song cycle, 1974–77",
        href: "#",
      },
    ],
  },
  {
    slug: "more-than-half-of-france-under-red-heat-alerts",
    headline: "More than half of France goes red as the heat refuses to break",
    overview:
      "Red alerts now cover a majority of the country as the heatwave bakes much of Europe. Authorities have restricted public drinking and outdoor sport, opening relief measures as temperatures hold.",
    genre: "Climate",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/c0jy9g96086o",
      },
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMimAFBVV95cUxQOGtqSTh5MDNVQWs3SUJWM0E3ZEJ5UWJLRDhndjhVUVFDcm9yRWNUQm9JRnBYc1NMY0MtLVdZN09kN3hKUjFtUFhlN0NsVXZ4S0prWTg1OTRONkZFd29Wcm4xWXA4dEM1RlhZNWI1Z1BUV0pNM1FXNWY0a2hYS245eC1wb3NsdUJjbkJmdlNXMEthaUhlNFJHcA?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/3fee/live/56af66a0-6e0a-11f1-9110-95eb626f214e.jpg",
      alt: "Europe's intensifying heatwave",
      credit: "BBC",
    },
    rank: 4,
    analogies: [
      {
        category: "historical",
        title: "The scorching summer of 1788",
        excerpt:
          "A failed harvest in brutal heat helped light the fuse of the French Revolution — weather as political tinder.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "J. G. Ballard, “The Drought”",
        excerpt:
          "A parched world quietly reorganizing itself around scarcity, civilization thinning with the water.",
        source: "Novel, 1964",
        href: "#",
      },
      {
        category: "artistic",
        title: "David Hockney's California light",
        excerpt:
          "Heat rendered as a flat, bright, inescapable fact — pools and pavements under a relentless sun.",
        source: "Paintings, 1960s–70s",
        href: "#",
      },
    ],
  },
  {
    slug: "china-rare-earth-export-controls-target-us-firms",
    headline: "China turns the rare-earth tap toward American firms",
    overview:
      "Beijing imposed new export controls naming US rare-earth and other companies. It is a pointed reminder of who holds the materials the modern economy quietly runs on.",
    genre: "Economy",
    sources: [
      {
        name: "Reuters",
        href: "https://news.google.com/rss/articles/CBMitgFBVV95cUxOaTFRNGkzaENWU2dUd0hseGlKUjVhT0NlVVAwRUVlcFRPQW5BdEZhWVdwSFQ0ZGJaaTlYcXFScEdkUGFRcWdyUFpyZHhVU1dCdzE0bUk3RHQwdU5TVnZGa25IUGN1X01qRXo4SU9Nd2hKT0pEYVJNM1VLdXdaaHdrSHh6R2MySFp1RTdwc3YxUC1mN2ZrbVBLYkg2LUg1N3BOZk84TGRDX2NQcWM3M1BOSlc0eFZZZw?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    rank: 5,
    analogies: [
      {
        category: "historical",
        title: "The OPEC oil embargo, 1973",
        excerpt:
          "A cartel weaponizing the one commodity the world cannot do without, and the shock that followed.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "Frank Herbert, “Dune”",
        excerpt:
          "“He who controls the spice controls the universe” — scarcity as the lever of all power.",
        source: "Novel, 1965",
        href: "#",
      },
      {
        category: "artistic",
        title: "Edward Burtynsky, mine photographs",
        excerpt:
          "The scarred landscape behind every device, framed at a scale that is both beautiful and damning.",
        source: "Photography, 1980s–",
        href: "#",
      },
    ],
  },
  {
    slug: "sk-hynix-passes-samsung-on-ai-memory-boom",
    headline:
      "SK Hynix passes Samsung as the AI memory boom rewrites the pecking order",
    overview:
      "SK Hynix became South Korea's most valuable company, dethroning Samsung. It is the clearest sign yet that memory has become the prize of the AI build-out.",
    genre: "Technology",
    sources: [
      {
        name: "Reuters",
        href: "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQbHluTXR0eVV4MVVvamJZY1BmUUNiYkxxeG52ak43ei1pXzZtMm95Sm1COThhSkR5WExMV3pNY1RMT1FoUnFyVlF0b3VDeGNxMC1HUEdHOWdnTVhZdjZDQllENl9OU2xwdlhoTk93YVZaZmY4VW5BUzlYOVl3emg1b1FYQURvZHZsSmJTd2RnYTdJREhzZ25LTldrX3c1V04yZEJSQ0Jqd1ktYWxySkdTc2czNnlwenpq?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    rank: 6,
    analogies: [
      {
        category: "historical",
        title: "Levi Strauss in the Gold Rush",
        excerpt:
          "The fortune was in the picks and shovels, not the gold — supply the diggers and you outlast the dig.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "Zola, “Au Bonheur des Dames”",
        excerpt:
          "One house ascends as the established giant is eclipsed, the old order swallowed by the new.",
        source: "Novel, 1883",
        href: "#",
      },
      {
        category: "artistic",
        title: "Andreas Gursky's factory floors",
        excerpt:
          "Industry photographed at a scale where the assembly line becomes sublime pattern.",
        source: "Photography, 1990s–",
        href: "#",
      },
    ],
  },
  {
    slug: "most-powerful-open-weights-model-ships",
    headline: "The most powerful open-weights model yet ships into the wild",
    overview:
      "A new release, GLM-5.2, is described as probably the most powerful text-only open-weights language model to date. Frontier-grade capability is now in the hands of anyone who can run it.",
    genre: "Technology",
    sources: [
      {
        name: "Simon Willison's Weblog",
        href: "https://simonwillison.net/2026/Jun/17/glm-52/",
      },
    ],
    href: "#",
    publishedAt: "2026-06-17",
    rank: 7,
    analogies: [
      {
        category: "historical",
        title: "Diderot's “Encyclopédie”, 1751–72",
        excerpt:
          "Knowledge compiled and set loose against its gatekeepers, reorganizing who could know what.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "Aeschylus, “Prometheus Bound”",
        excerpt:
          "Fire handed to mortals against the will of the gods — the gift and the punishment in one act.",
        source: "Tragedy, c. 430 BCE",
        href: "#",
      },
      {
        category: "artistic",
        title: "Cornelius Cardew, “Treatise”",
        excerpt:
          "A 193-page graphic score anyone may perform — authorship released as open instructions.",
        source: "Graphic score, 1963–67",
        href: "#",
      },
    ],
  },
  {
    slug: "antarctica-logs-record-winter-warmth",
    headline: "Antarctica logs record winter warmth, and scientists flinch",
    overview:
      "Record-high winter temperatures over the continent have renewed fears about how fast the planet's coldest, most stable system is shifting. The readings land as a warning rather than a curiosity.",
    genre: "Science",
    sources: [
      {
        name: "Kottke.org",
        href: "https://kottke.org/26/06/0049177-record-winter-temperature",
      },
    ],
    href: "#",
    publishedAt: "2026-06-18",
    rank: 8,
    analogies: [
      {
        category: "historical",
        title: "The canary in the coal mine",
        excerpt:
          "A living instrument whose distress was the warning long before the gas could be felt.",
        source: "Historical practice",
        href: "#",
      },
      {
        category: "literary",
        title: "Apsley Cherry-Garrard, “The Worst Journey in the World”",
        excerpt:
          "The Antarctic as the planet's most unforgiving witness, indifferent to those who measure it.",
        source: "Memoir, 1922",
        href: "#",
      },
      {
        category: "artistic",
        title: "John Luther Adams, “Become Ocean”",
        excerpt:
          "Music built from ice and rising water — a slow tide that never quite stops advancing.",
        source: "Composition, 2013",
        href: "#",
      },
    ],
  },
  {
    slug: "leonardo-codices-digitally-reunited-after-400-years",
    headline:
      "Two great Leonardo collections are reunited on screen after 400 years apart",
    overview:
      "Long-scattered codices have been digitally brought back together, reassembling a mind that was always meant to be read as one. Pages dispersed for centuries can now be turned side by side.",
    genre: "Culture",
    sources: [
      {
        name: "Kottke.org",
        href: "https://kottke.org/26/06/two-huge-collections-of-leonardos-codexes-digitally-reunited-after-400-years",
      },
    ],
    href: "#",
    publishedAt: "2026-06-17",
    image: {
      src: "https://kottke.org/cdn-cgi/image/format=auto,fit=scale-down,width=1200,metadata=none//plus/misc/images/editor-1781707050-60a49ae1.jpg",
      alt: "A page from Leonardo da Vinci's codices",
      credit: "Kottke.org",
    },
    rank: 9,
    analogies: [
      {
        category: "historical",
        title: "The Archimedes Palimpsest",
        excerpt:
          "A lost mind recovered from beneath the writing that buried it — knowledge read back into the light.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "Umberto Eco, “The Name of the Rose”",
        excerpt:
          "A vanished book pursued through a labyrinth of a library, the whole world hinging on its pages.",
        source: "Novel, 1980",
        href: "#",
      },
      {
        category: "artistic",
        title: "The digital reunification of the Ghent Altarpiece",
        excerpt:
          "Dispersed panels made whole again as pixels, a masterwork reassembled without moving a frame.",
        source: "Conservation project, 2010s",
        href: "#",
      },
    ],
  },
  {
    slug: "zaha-hadid-architects-becomes-zha",
    headline: "Zaha Hadid Architects retires its founder's name and becomes ZHA",
    overview:
      "A decade after her death, the practice abstracts Hadid's name into initials. The institution is formally outliving the person who defined it, her signature continuing as a house style.",
    genre: "Culture",
    sources: [
      {
        name: "Dezeen",
        href: "https://www.dezeen.com/2026/06/20/zaha-hadid-architects-rename-zha-this-week/",
      },
    ],
    href: "#",
    publishedAt: "2026-06-20",
    image: {
      src: "https://static.dezeen.com/uploads/2026/06/zha-zaha-hadid-architects-rebrand-patrik-schumacher_dezeen_2364_col_1-411x411.jpg",
      alt: "Zaha Hadid Architects' rebrand to ZHA",
      credit: "Dezeen",
    },
    rank: 10,
    analogies: [
      {
        category: "historical",
        title: "SOM (Skidmore, Owings & Merrill)",
        excerpt:
          "An architecture firm long since known only by its founders' initials — the people dissolved into a practice.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "Shelley, “Ozymandias”",
        excerpt:
          "The name carved to outlast the man, and what time does to the works it was meant to immortalize.",
        source: "Poem, 1818",
        href: "#",
      },
      {
        category: "artistic",
        title: "Brancusi, “Endless Column”",
        excerpt:
          "A founder's signature form continuing as pure, repeatable vocabulary, beyond the hand that made it.",
        source: "Sculpture, 1938",
        href: "#",
      },
    ],
  },
  {
    slug: "collector-ordered-to-return-nazi-looted-modigliani",
    headline: "A collector is given 30 days to surrender a Nazi-looted Modigliani",
    overview:
      "David Nahmad has been ordered to return a Modigliani looted under the Nazis. Restitution arrives generations after the theft, the painting still finding its way home.",
    genre: "Culture",
    sources: [
      {
        name: "Artforum",
        href: "https://www.artforum.com/news/nahmad-given-30-days-to-return-nazi-looted-modigliani-1234752601/",
      },
    ],
    href: "#",
    publishedAt: "2026-06-18",
    rank: 11,
    analogies: [
      {
        category: "historical",
        title: "The Monuments Men, 1945",
        excerpt:
          "The long postwar labor of tracing looted art and getting it back where it belonged.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "Bruce Chatwin, “Utz”",
        excerpt:
          "A collector who cannot bear to let his objects go, possessed as much as possessing.",
        source: "Novel, 1988",
        href: "#",
      },
      {
        category: "artistic",
        title: "Klimt, “Portrait of Adele Bloch-Bauer”",
        excerpt:
          "The most famous restitution of all — the gold portrait that finally went home.",
        source: "Painting, 1907",
        href: "#",
      },
    ],
  },
  {
    slug: "australia-sells-canada-radar-in-record-deal",
    headline: "Australia sells Canada advanced radar in a record $1.7bn deal",
    overview:
      "Two middle powers struck Australia's largest-ever defense export. It reads as a quiet bet on seeing further as the cost of staying secure rises.",
    genre: "Politics",
    sources: [
      {
        name: "Reuters",
        href: "https://news.google.com/rss/articles/CBMivwFBVV95cUxNTkRrOEhrYldsZGNqM056ZTNBUkpzS1VXTnpqcFg1YkVWUGxxQXRXendBcWxlX3hGbzgxdHNPSUZRVUc5anJDcFU5ZDBUaExzUVM5TnRNaFN1eWRLUmRfbzdFNzFwWmRhWUlKdmlqUEVvaFFvTEsxVlRaSDJ2RGp4Q2hIczd2cDg0V29reTBHZFFtS25tUThBeGZfWVhOem8xX2VKcndCOUFDbVp0VFJaa2ctd1hSVEJISFZDaTJOWQ?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    rank: 12,
    analogies: [
      {
        category: "historical",
        title: "Chain Home, 1940",
        excerpt:
          "In the Battle of Britain, seeing the enemy first was the whole margin of survival.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "The myth of Argus Panoptes",
        excerpt:
          "The hundred-eyed watchman who never fully sleeps — vigilance as both gift and burden.",
        source: "Greek myth",
        href: "#",
      },
      {
        category: "artistic",
        title: "Trevor Paglen's “limit-telephotography”",
        excerpt:
          "Picturing the apparatus of watching from the very edge of the visible.",
        source: "Photography, 2000s–",
        href: "#",
      },
    ],
  },
  {
    slug: "japan-quintuples-visa-fees-first-hike-since-1978",
    headline: "Japan quintuples visa fees, its first hike since 1978",
    overview:
      "Tokyo raises the price of entry fivefold after nearly half a century. The move tries to price the tide of visitors that has overwhelmed its most-loved sites.",
    genre: "Economy",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/cy8d5e5e805o",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/65b1/live/c9a13240-6e11-11f1-8e1d-bbbb1017d210.jpg",
      alt: "Travellers in Japan as visa fees rise",
      credit: "BBC",
    },
    rank: 13,
    analogies: [
      {
        category: "historical",
        title: "Sakoku and the black ships of 1853",
        excerpt:
          "Japan's long history of closing and reopening its own gate, and the pressure that builds at the threshold.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "Bashō, “The Narrow Road to the Deep North”",
        excerpt:
          "Travel as something deliberate, rationed, and earned — the journey as a discipline, not a transaction.",
        source: "Travel diary, 1694",
        href: "#",
      },
      {
        category: "artistic",
        title: "Hokusai, “Thirty-Six Views of Mount Fuji”",
        excerpt:
          "The image that draws the whole world toward a single place — and the crowding that follows the icon.",
        source: "Woodblock prints, 1830–32",
        href: "#",
      },
    ],
  },
];

// --- Helpers ---

export function formatStoryDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

// --- Accessors (async + DB-shaped; today they read the placeholder array) ---

export async function getPublishedStories(): Promise<Story[]> {
  // Later: SELECT … FROM events WHERE status = 'published'
  //        ORDER BY rank ASC NULLS LAST, published_at DESC
  return [...stories].sort((a, b) => {
    const ra = a.rank ?? Number.MAX_SAFE_INTEGER;
    const rb = b.rank ?? Number.MAX_SAFE_INTEGER;
    if (ra !== rb) return ra - rb;
    return b.publishedAt.localeCompare(a.publishedAt);
  });
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  // Later: SELECT … FROM events WHERE slug = $1 AND status = 'published'
  return stories.find((s) => s.slug === slug) ?? null;
}

export async function getStorySlugs(): Promise<string[]> {
  return stories.map((s) => s.slug);
}
