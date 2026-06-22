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

// Seeded placeholder photography (deterministic per slug). Real publisher images
// replace these later; `next.config.ts` whitelists the host.
const cover = (seed: string, alt: string, credit = "Placeholder · Lorem Picsum"): ImageRef => ({
  src: `https://picsum.photos/seed/${seed}/1200/800`,
  alt,
  credit,
});

// Placeholder corpus. Excerpts describe the source rather than quoting it, in
// keeping with the strict-verification ethos (no unverifiable quotes, even here).
const stories: Story[] = [
  {
    slug: "undersea-cables-and-the-fragility-of-the-network",
    headline: "A severed undersea cable reminds the world how thin the network is",
    overview:
      "A single damaged fiber-optic line slowed traffic across an entire region this week, exposing how much of the global internet rests on a few vulnerable strands on the seabed. Engineers rerouted what they could; the rest waited for a repair ship.",
    genre: "Technology",
    sources: [
      { name: "AP", href: "#" },
      { name: "Reuters", href: "#" },
      { name: "The Verge", href: "#" },
    ],
    href: "#",
    publishedAt: "2026-06-20",
    image: cover("undersea-cables", "A repair ship at sea under an overcast sky"),
    lead: true,
    rank: 1,
    analogies: [
      {
        category: "historical",
        title: "The first transatlantic telegraph cable, 1858",
        excerpt:
          "Celebrated as the shrinking of the world, it failed within weeks — an early lesson that connection and fragility arrive together.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "historical",
        title: "The 1929 Grand Banks cable break",
        excerpt:
          "An undersea earthquake snapped a chain of telegraph cables in sequence, the timing later used to measure the speed of the slide.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "E. M. Forster, “The Machine Stops”",
        excerpt:
          "A society that has outsourced every contact to a single network discovers what is left when the network falters.",
        source: "Short fiction, 1909",
        href: "#",
      },
      {
        category: "literary",
        title: "Italo Calvino, “Invisible Cities”",
        excerpt:
          "Cities held together by threads of relationship rather than stone — a meditation on infrastructure as something imagined as much as built.",
        source: "Novel, 1972",
        href: "#",
      },
      {
        category: "artistic",
        title: "Vija Celmins, “Untitled (Ocean)”",
        excerpt:
          "Graphite seascapes that render the surface as an endless, illegible expanse — the same water that hides the cables.",
        source: "Drawing, 1970s",
        href: "#",
        image: cover("celmins-ocean", "A close, textured study of the ocean surface"),
      },
      {
        category: "artistic",
        title: "Kraftwerk, “Computer World”",
        excerpt:
          "An album that imagined daily life as data moving along wires, exhilarated and uneasy in equal measure.",
        source: "Album, 1981",
        href: "#",
      },
    ],
  },
  {
    slug: "a-heat-dome-settles-over-the-continent",
    headline: "A heat dome settles in, and the grid strains to keep up",
    overview:
      "A stalled high-pressure system trapped record temperatures over the interior for a sixth straight day. Demand for cooling pushed the power grid toward its limits as officials urged conservation and opened relief centers.",
    genre: "Climate",
    sources: [
      { name: "AP", href: "#" },
      { name: "The Guardian", href: "#" },
      { name: "Bloomberg", href: "#" },
    ],
    href: "#",
    publishedAt: "2026-06-19",
    image: cover("heat-dome", "A hazy sun over a dry, sunlit landscape"),
    rank: 2,
    analogies: [
      {
        category: "historical",
        title: "The European heat wave of 2003",
        excerpt:
          "Weeks of extreme heat overwhelmed cities built for milder summers, reshaping how governments plan for temperature.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "historical",
        title: "The Dust Bowl summers of the 1930s",
        excerpt:
          "Heat and drought compounded one another across the plains, a slow disaster measured in seasons rather than days.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "Kim Stanley Robinson, “The Ministry for the Future”",
        excerpt:
          "Opens with a lethal heat wave that forces a civilization to finally reckon with what it has built.",
        source: "Novel, 2020",
        href: "#",
      },
      {
        category: "literary",
        title: "Albert Camus, “The Stranger”",
        excerpt:
          "A narrative in which heat itself becomes a pressure on judgment and action, blurring the line between weather and fate.",
        source: "Novel, 1942",
        href: "#",
      },
      {
        category: "artistic",
        title: "J. M. W. Turner, late atmospheric studies",
        excerpt:
          "Skies dissolved into haze and glare — paintings of an air thick enough to feel.",
        source: "Paintings, 1840s",
        href: "#",
      },
      {
        category: "artistic",
        title: "Steve Reich, “Music for 18 Musicians”",
        excerpt:
          "Shimmering, slowly shifting patterns that evoke a landscape vibrating in the heat.",
        source: "Composition, 1976",
        href: "#",
      },
    ],
  },
  {
    slug: "the-first-trillion-parameter-public-model",
    headline: "A national lab releases its largest model into the open",
    overview:
      "A publicly funded research consortium published the weights of its biggest language model, framing the move as a counterweight to private concentration. Supporters called it a public good; critics warned that openness cuts both ways.",
    genre: "Science",
    sources: [
      { name: "Reuters", href: "#" },
      { name: "MIT Technology Review", href: "#" },
      { name: "Ars Technica", href: "#" },
    ],
    href: "#",
    publishedAt: "2026-06-18",
    image: cover("public-model", "Rows of servers in a data center hall"),
    rank: 3,
    analogies: [
      {
        category: "historical",
        title: "The printing press enters vernacular Europe",
        excerpt:
          "A reproduction technology that escaped its guardians and reorganized who could speak to whom.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "historical",
        title: "The Asilomar recombinant-DNA guidelines, 1975",
        excerpt:
          "Scientists paused to debate the terms of a powerful new tool before letting it loose — a rare moment of self-restraint.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "Mary Shelley, “Frankenstein”",
        excerpt:
          "The question is never whether a thing can be made, but who tends it afterward — and who is abandoned.",
        source: "Novel, 1818",
        href: "#",
      },
      {
        category: "literary",
        title: "Stanisław Lem, “Golem XIV”",
        excerpt:
          "A military supercomputer outgrows its purpose and turns to lecturing its makers on their own limits.",
        source: "Fiction, 1981",
        href: "#",
      },
      {
        category: "artistic",
        title: "Sol LeWitt, “Wall Drawings”",
        excerpt:
          "Works defined by a set of instructions anyone can execute — authorship as a published procedure rather than an object.",
        source: "Instructions, 1968–",
        href: "#",
        image: cover("lewitt-wall", "A geometric wall drawing of intersecting lines"),
      },
      {
        category: "artistic",
        title: "Brian Eno, “Music for Airports”",
        excerpt:
          "Generative systems set in motion and left to unfold — a composer designing the rules, not the notes.",
        source: "Album, 1978",
        href: "#",
      },
    ],
  },
  {
    slug: "a-new-trade-bloc-redraws-the-map",
    headline: "A new trade bloc forms, and old alignments quietly shift",
    overview:
      "A group of mid-sized economies signed a pact to trade on their own terms, sidestepping the larger powers that have set the rules for decades. The agreement is modest on paper but read by many as a signal of where the center of gravity is moving.",
    genre: "Economy",
    sources: [
      { name: "Reuters", href: "#" },
      { name: "Financial Times", href: "#" },
      { name: "Nikkei", href: "#" },
    ],
    href: "#",
    publishedAt: "2026-06-17",
    image: cover("trade-bloc", "Cargo containers stacked at a busy port"),
    rank: 4,
    analogies: [
      {
        category: "historical",
        title: "The Hanseatic League",
        excerpt:
          "A confederation of trading towns that built shared power across borders without a single sovereign at its head.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "historical",
        title: "The Non-Aligned Movement, 1961",
        excerpt:
          "Nations declining to pick a side in a bipolar world, insisting on a path of their own.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "Ursula K. Le Guin, “The Dispossessed”",
        excerpt:
          "Two worlds organized on opposing principles, and a traveler trying to imagine an exchange that doesn't dominate.",
        source: "Novel, 1974",
        href: "#",
      },
      {
        category: "literary",
        title: "Jorge Luis Borges, “The Lottery in Babylon”",
        excerpt:
          "An order so thoroughly governed by an unseen company that no one can say where its authority ends.",
        source: "Short fiction, 1941",
        href: "#",
      },
      {
        category: "artistic",
        title: "Diego Rivera, “Detroit Industry Murals”",
        excerpt:
          "Frescoes that map labor, materials, and trade into a single interlocking body.",
        source: "Murals, 1932–33",
        href: "#",
      },
      {
        category: "artistic",
        title: "Fela Kuti, “Zombie”",
        excerpt:
          "Afrobeat as a refusal of imposed order — music staking out an independent ground.",
        source: "Album, 1976",
        href: "#",
      },
    ],
  },
  {
    slug: "drought-empties-a-great-river",
    headline: "A great river runs low, and a buried history surfaces",
    overview:
      "Months of drought dropped a major river to its lowest level in living memory, stranding barges and exposing wrecks, foundations, and boundary stones long underwater. Communities downstream began rationing as the channel narrowed.",
    genre: "Climate",
    sources: [
      { name: "AP", href: "#" },
      { name: "The Guardian", href: "#" },
    ],
    href: "#",
    publishedAt: "2026-06-16",
    image: cover("great-river", "A wide riverbed exposed by low water"),
    rank: 5,
    analogies: [
      {
        category: "historical",
        title: "The “hunger stones” of the Elbe",
        excerpt:
          "Markers carved into riverbed rock by earlier generations, revealed only when the water falls far enough to read them.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "historical",
        title: "The receding of the Aral Sea",
        excerpt:
          "A body of water diverted away over decades until ships sat in dust — a landscape rewritten by thirst.",
        source: "Historical record",
        href: "#",
      },
      {
        category: "literary",
        title: "T. S. Eliot, “The Waste Land”",
        excerpt:
          "A poem haunted by dry stone and absent water, where drought is spiritual as much as physical.",
        source: "Poem, 1922",
        href: "#",
      },
      {
        category: "literary",
        title: "Jean Giono, “The Man Who Planted Trees”",
        excerpt:
          "A parable of a parched valley brought slowly back to life by one person's patient, unglamorous work.",
        source: "Short fiction, 1953",
        href: "#",
      },
      {
        category: "artistic",
        title: "Andrew Wyeth, “Christina's World”",
        excerpt:
          "A figure in a vast dry field, the land stretching past her toward a distant, withholding horizon.",
        source: "Painting, 1948",
        href: "#",
      },
      {
        category: "artistic",
        title: "Arvo Pärt, “Für Alina”",
        excerpt:
          "Spare, drought-still music in which the silences carry as much as the notes.",
        source: "Composition, 1976",
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
