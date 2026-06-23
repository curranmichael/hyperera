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
// the home grid reads at a glance, with one place to retune.
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

// Hand-curated front page for 2026-06-23, selected from the live RSS feeds in
// `lib/feeds.ts`. The analogies are the heart of each story: six per event, two
// per category, each linking to a real human-written source (a primary text,
// museum object page, or archive). Overviews and excerpts describe rather than
// quote, in keeping with the strict-verification ethos; any short quotation is
// drawn only from public-domain sources. Covers are dithered local copies: feed
// or rights-clean Wikimedia art credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated", from `npm run images:generate`).
// Source links to AP/Reuters are Google News redirects (see `lib/feeds.ts`); a
// later verify pass canonicalizes them.
const stories: Story[] = [
  {
    slug: "starmer-to-resign-as-uk-prime-minister",
    headline:
      "A prime minister sets down the office, and the race to replace him opens overnight",
    overview:
      "Keir Starmer says he will step down as UK prime minister, throwing British politics open again as the party turns to who comes next, with Andy Burnham among the names. The exit resets a government still early in its term.",
    genre: "Politics",
    sources: [
      {
        name: "NPR",
        href: "https://www.npr.org/2026/06/22/nx-s1-5866231/keir-starmer-resigns",
      },
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMiswFBVV95cUxQNGtvWjFQWS1WTXM2ZkZHM0Jaei1QaEl4OF9NVXdQdEF1UVFPamVfX2VVd2ZkaDh0RG9OMTNIRUxBd3F2S0ZGWkl0Nzg1REc0b1pKQWFtb2hzZHFZaEpEZFV4UVBhWWV6YV9YdUNKVFNHdzBUUUFKb1RYczNKaTI4aVRWMDBCWU8yc3kyM29lNlUtR0ttTXhlZ01zZXVpT2hYNjlGZ3JKbGtKWVVSQkdTZXdyQQ?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/starmer-to-resign-as-uk-prime-minister.png",
      alt: "A leader stepping down from high office",
      credit: "Wikimedia Commons",
    },
    lead: true,
    rank: 1,
    analogies: [
      {
        category: "historical",
        title: "Cincinnatus lays down the dictatorship, 458 BCE",
        excerpt:
          "Called from his plough to rescue Rome, he took absolute power, won his war, and within days handed the office back and walked home to the field. Rome kept his name for centuries less for the victory than for the leaving. The rarest measure of a ruler is how lightly he holds on.",
        source: "Roman history",
        href: "https://www.gutenberg.org/ebooks/19725",
      },
      {
        category: "historical",
        title: "Diocletian retires to his garden, 305 CE",
        excerpt:
          "The emperor who had reorganized the whole Roman world simply stepped down and took up gardening on the Dalmatian coast. Pressed later to return to power, he is said to have answered that if they could see the cabbages he had grown they would never ask. Authority, for once, treated as a thing one could be finished with.",
        source: "Roman history",
        href: "https://www.gutenberg.org/ebooks/731",
      },
      {
        category: "literary",
        title: "Shakespeare, “Richard II”",
        excerpt:
          "A king unkings himself on stage, narrating his own undoing as he sets the crown down and asks what he is once the title is gone. The deposition scene turns resignation into a mirror held up to power, the moment the office is shown to outlive the man who filled it.",
        source: "History play, c. 1595",
        href: "https://www.folger.edu/explore/shakespeares-works/richard-ii/read/",
      },
      {
        category: "literary",
        title: "Sophocles, “Oedipus at Colonus”",
        excerpt:
          "The once all-powerful king arrives at the end stripped of office, blind and exiled, discovering what a leader becomes when the power is spent. Sophocles makes the aftermath of authority, not its exercise, the real subject of the play.",
        source: "Tragedy, 401 BCE",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0190",
      },
      {
        category: "artistic",
        title: "Mussorgsky, “Boris Godunov” (the death scene)",
        excerpt:
          "Undone by guilt and the long weight of rule, the tsar bids farewell to his son and lets the crown fall away from him. Power here ends not in triumph but in a slow, exhausted breath, the ruler smallest at the very moment he relinquishes the throne.",
        source: "Opera, 1874",
        href: "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)",
      },
      {
        category: "artistic",
        title: "Delaroche, “Napoleon at Fontainebleau, 31 March 1814”",
        excerpt:
          "The emperor sits slumped in a plain chair the morning of his first abdication, an entire collapsed campaign written into one posture. Delaroche paints supreme power not at its height but at the instant it drains out of a man, leaving only the tired body behind.",
        source: "Oil on canvas, 1845",
        href: "https://www.napoleon.org/en/history-of-the-two-empires/paintings/napoleon-i-at-fontainebleau-31-march-1814/",
      },
    ],
  },
  {
    slug: "us-eases-iran-oil-sanctions-as-tehran-denies-inspector-claim",
    headline:
      "Sanctions ease while the two sides cannot agree on what was agreed",
    overview:
      "Washington eased oil sanctions on Iran after talks in Switzerland, but Tehran publicly denied US claims that it had agreed to readmit nuclear inspectors. The central fact of the deal is now contested, with each side describing a different agreement.",
    genre: "Conflict",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/c3vy3nr63gxo",
      },
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMipgFBVV95cUxQeUJQNlpPSVpIZmFCR1pnckJLd25Eblo1OERBRFdscDFOOUZHbURVM2tNd1hPaHo5aHIxeExhbGt5R2RxZjFDMWhENm9GQnpadlRNQVg4QTN4ODBwRUNuVGNYLUt3YUdBODJSTXpEZHF3QjN0Zk1iVlVzdnhEblh3N0JkZUNTU3Q5QmxKdUEwTVc5LUd2czMxTC1FQVpDdnVvaWg2Tkh3?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-23",
    image: {
      src: "/covers/us-eases-iran-oil-sanctions-as-tehran-denies-inspector-claim.png",
      alt: "Adversaries at a contested negotiating table",
      credit: "BBC",
    },
    rank: 2,
    analogies: [
      {
        category: "historical",
        title: "The Reykjavík summit, 1986",
        excerpt:
          "Reagan and Gorbachev walked away from Iceland with no agreement and the talks branded a failure, yet almost everything that mattered had quietly shifted on the table that weekend. The arms deals that followed were written, in effect, in a room everyone had already called a collapse.",
        source: "Historical record",
        href: "https://nsarchive2.gwu.edu/NSAEBB/NSAEBB203/index.htm",
      },
      {
        category: "historical",
        title: "The Cuban Missile Crisis back channel, 1962",
        excerpt:
          "While public ultimatums hardened by the hour, the decisive bargain moved through a private channel the cameras never saw. Brinkmanship and negotiation ran on two clocks at once, and the version announced to the world was not quite the version that ended the crisis.",
        source: "Historical record",
        href: "https://nsarchive.gwu.edu/briefing-book/cuba-cuban-missile-crisis/2022-10-27/cuban-missile-crisis-60-most-dangerous-day",
      },
      {
        category: "literary",
        title: "Thucydides, the Melian Dialogue",
        excerpt:
          "The oldest surviving script for talks between a strong power and a weak one, where the mighty propose their terms and the weak must weigh survival against pride. Thucydides lets the asymmetry speak plainly, the powerful conceding nothing they are not forced to concede.",
        source: "History, 5th c. BCE",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book=5:chapter=84",
      },
      {
        category: "literary",
        title: "Akutagawa, “In a Grove”",
        excerpt:
          "A single act is recounted by every witness in a different and irreconcilable way, until the truth dissolves into competing testimonies. It is the perfect shape for a deal where one side announces a concession and the other denies it was ever made.",
        source: "Short story, 1922",
        href: "https://www.aozora.gr.jp/cards/000879/card179.html",
      },
      {
        category: "artistic",
        title: "Picasso, “Dove of Peace”",
        excerpt:
          "A single line drawing of a bird, made for a peace congress, was asked to carry more hope than any one meeting could bear. The emblem endures precisely because the peace it stood for kept arriving late.",
        source: "Lithograph, 1949",
        href: "https://www.tate.org.uk/art/artworks/picasso-dove-p11366",
      },
      {
        category: "artistic",
        title: "Penderecki, “Threnody to the Victims of Hiroshima”",
        excerpt:
          "Fifty-two strings shriek and scrape at the edge of what instruments can do, rendering the stakes the negotiators are really bargaining against. The piece is the silence under every diplomatic communiqué made suddenly, unbearably audible.",
        source: "Composition, 1960",
        href: "https://www.wisemusicclassical.com/work/31499/Threnody-To-the-Victims-of-Hiroshima--Krzysztof-Penderecki/",
      },
    ],
  },
  {
    slug: "trump-backed-outsider-wins-colombia-election",
    headline: "An outsider edges ahead in Colombia, and his rival refuses the count",
    overview:
      "Abelardo de la Espriella holds a razor-thin lead as initial counts make him the apparent winner of Colombia's presidential vote. His rival disputes the result, and the outcome remains unsettled.",
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
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/trump-backed-outsider-wins-colombia-election.png",
      alt: "A contested presidential count",
      credit: "BBC",
    },
    rank: 3,
    analogies: [
      {
        category: "historical",
        title: "Louis-Napoléon's election, 1848",
        excerpt:
          "An outsider rode a borrowed and famous name to a landslide in France's first popular presidential election, promising to embody the people. Within four years he had dismantled the republic that elected him and crowned himself emperor.",
        source: "Historical record",
        href: "https://www.britannica.com/biography/Napoleon-III-emperor-of-France",
      },
      {
        category: "historical",
        title: "The Hayes-Tilden election, 1876",
        excerpt:
          "A US presidential result hung for months on disputed counts and rival tallies, settled at last by a backroom bargain rather than the ballot box. The lesson held: the contest does not end when the votes are cast, only when one side concedes the count.",
        source: "Historical record",
        href: "https://history.house.gov/Historical-Highlights/1851-1900/The-electoral-vote-count-of-the-1876-presidential-election/",
      },
      {
        category: "literary",
        title: "García Márquez, “The Autumn of the Patriarch”",
        excerpt:
          "Colombia's own laureate dissolves into the mind of an ageing dictator, mapping the solitude and the slow seduction of unaccountable power. No writer has better caught how the strongman comes to mistake himself for the nation.",
        source: "Novel, 1975",
        href: "https://www.penguin.co.uk/books/482985/the-autumn-of-the-patriarch-by-gabriel-garcia-marquez/9780241968635",
      },
      {
        category: "literary",
        title: "Sarmiento, “Facundo”",
        excerpt:
          "Argentina's great nineteenth-century polemic framed Latin American politics as a contest between civilization and the charismatic strongman of the frontier. Its template, the outsider who governs by force of personality, keeps returning to the ballot.",
        source: "Essay, 1845",
        href: "https://www.gutenberg.org/ebooks/33267",
      },
      {
        category: "artistic",
        title: "Botero, “The Presidential Family”",
        excerpt:
          "Colombia's most famous brush swelled its presidents and officers to absurd, balloon-like bulk, dignity inflated to the edge of caricature. The joke and the menace are the same: power that has grown far past its proper size.",
        source: "Oil on canvas, 1967",
        href: "https://www.moma.org/collection/works/80711",
      },
      {
        category: "artistic",
        title: "Goya, “Charles IV of Spain and His Family”",
        excerpt:
          "Goya arranged the royal family in their finery and painted every weakness and vanity into their faces without flattery. It remains the sharpest reminder that a portrait of power can quietly tell the truth power would rather not hear.",
        source: "Oil on canvas, 1800",
        href: "https://www.museodelprado.es/en/the-collection/art-work/the-family-of-carlos-iv/f47898fc-aa1c-48f6-a779-71759e417e74",
      },
    ],
  },
  {
    slug: "red-heat-alerts-across-france-italy-spain",
    headline: "Half of western Europe turns red as the heat refuses to break",
    overview:
      "Red heat alerts cover swaths of France, Italy and Spain as forecasts push past 40C, with deaths already reported and authorities restricting outdoor activity. The European summer has arrived as an emergency.",
    genre: "Climate",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/c0jy9g96086o",
      },
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMinwFBVV95cUxQTGhnZE1kNUxUcTJpWmdWMnhlRzhpN1kwZWRQOFRtSG9aUS0wNnBoaDdMSGtiOWtQWFFNOFI4dzNhUXpONllqMEhSZGsxMDJEd1R2ZE5yZHFnUDNlaVdqSkJHeVlac3JOb3V2WXFTQUVBRmJKYjNlQldVT0haRjFLMHVMNW1vVXNYNG5MZi1WS2ZqaW93SkxPUzg1dGhSM2s?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/red-heat-alerts-across-france-italy-spain.png",
      alt: "Europe under an intensifying heatwave",
      credit: "BBC",
    },
    rank: 4,
    analogies: [
      {
        category: "historical",
        title: "The scorching summer of 1788",
        excerpt:
          "A brutal drought and failed harvest sent bread prices soaring in the year before the Bastille fell, turning weather into political tinder. The heat did not make the revolution, but it helped lay the dry kindling under it.",
        source: "Historical record",
        href: "https://link.springer.com/article/10.1007/s10887-023-09230-y",
      },
      {
        category: "historical",
        title: "The European heatwave of 2003",
        excerpt:
          "Tens of thousands died across the continent in a single summer, many of them alone and elderly in cities built for a cooler climate. It was the first modern warning that heat itself, not storm or flood, would be the quiet mass killer.",
        source: "Historical record",
        href: "https://www.eurosurveillance.org/content/10.2807/esm.10.07.00551-en",
      },
      {
        category: "literary",
        title: "J. G. Ballard, “The Drought”",
        excerpt:
          "Ballard imagines a world reorganizing itself slowly around the absence of water, society thinning and hardening as the rivers vanish. The catastrophe is not an explosion but a long, patient evaporation of the ordinary.",
        source: "Novel, 1964",
        href: "https://harpercollins.co.uk/products/the-drought-j-g-ballard",
      },
      {
        category: "literary",
        title: "Dante, “Inferno”, Canto XIV",
        excerpt:
          "Dante sets a circle of the damned beneath a slow rain of fire on burning sand, punishment delivered as relentless, inescapable heat. Seven centuries on, the image of a sky that scorches what lies under it reads less like allegory than forecast.",
        source: "Poem, c. 1320",
        href: "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_14",
      },
      {
        category: "artistic",
        title: "Turner, “Regulus”",
        excerpt:
          "Turner pushed the sun to the center of the canvas and let its glare all but dissolve the harbor and the figures into white. The painting is what overwhelming heat feels like rather than how it looks, light as a physical force that erases.",
        source: "Oil on canvas, 1828",
        href: "https://www.tate.org.uk/art/artworks/turner-regulus-n00519",
      },
      {
        category: "artistic",
        title: "John Luther Adams, “Become Ocean”",
        excerpt:
          "Three orchestral tides swell and recede in vast slow waves built from the imagery of melting ice and rising seas. It is climate rendered as sound, a beauty that is also a steadily advancing threat.",
        source: "Composition, 2013",
        href: "https://www.boosey.com/shop/prod/Adams-Luther-John-Become-Ocean-Full-Score/2312569",
      },
    ],
  },
  {
    slug: "un-says-myanmar-army-killed-over-700-civilians",
    headline: "The UN puts a number to Myanmar's dead and insists the count be kept",
    overview:
      "A UN report documents more than 700 civilians killed by Myanmar's military over six months, including scores of children. The toll is set down as evidence, an attempt to keep the dead from going uncounted.",
    genre: "Conflict",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/cnv97e42r7yo",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/un-says-myanmar-army-killed-over-700-civilians.png",
      alt: "Counting the civilian dead of a war",
      credit: "BBC",
    },
    rank: 5,
    analogies: [
      {
        category: "historical",
        title: "Guernica, 1937",
        excerpt:
          "The deliberate aerial bombing of a Basque market town made civilians the target rather than the collateral, a tactic the century would repeat without end. Its name survived because an artist refused to let the dead become a statistic.",
        source: "Historical record",
        href: "https://en.wikipedia.org/wiki/Bombing_of_Guernica",
      },
      {
        category: "historical",
        title: "Lemkin and the word genocide, 1948",
        excerpt:
          "A Polish lawyer who lost his family invented a word for the crime that had no name, and pressed the world to write it into law. The UN tally from Myanmar is the distant machinery of that idea, the insistence that mass killing be named and counted.",
        source: "Treaty, 1948",
        href: "https://www.un.org/en/genocide-prevention/1948-convention",
      },
      {
        category: "literary",
        title: "Euripides, “The Trojan Women”",
        excerpt:
          "Euripides gives the whole aftermath of a sacked city to its widows and children, the people history usually leaves off the page. Written the year his own city had slaughtered a neutral island's men, it is the oldest protest against the cost of war on those who cannot fight.",
        source: "Tragedy, 415 BCE",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0124",
      },
      {
        category: "literary",
        title: "Vasily Grossman, “Life and Fate”",
        excerpt:
          "Grossman keeps the human ledger behind the front line, insisting that each number in a death toll was once a particular person with a particular morning. The novel's quiet argument is that to count carefully is itself a form of resistance.",
        source: "Novel, 1960",
        href: "https://www.nyrb.com/products/life-and-fate",
      },
      {
        category: "artistic",
        title: "Picasso, “Guernica”",
        excerpt:
          "A mural of grey, white and black anguish that turned one town's bombing into the century's defining image of civilian slaughter. Picasso refused color and refused comfort, leaving only the scream and the wreckage.",
        source: "Oil on canvas, 1937",
        href: "https://www.museoreinasofia.es/en/collections/artwork/guernica-0/",
      },
      {
        category: "artistic",
        title: "Käthe Kollwitz, “In Memoriam Karl Liebknecht”",
        excerpt:
          "Kollwitz, who lost her own son to the war, carved the bereaved gathered around the dead with a tenderness that turns grief into testimony. Her mourners are the toll made visible, one bowed body standing for the seven hundred.",
        source: "Woodcut, 1920",
        href: "https://www.moma.org/collection/works/71889",
      },
    ],
  },
  {
    slug: "alan-greenspan-fed-maestro-dies-at-100",
    headline: "The man who moved markets with a riddle dies at 100",
    overview:
      "Alan Greenspan, who chaired the US Federal Reserve for nearly two decades and was cast as the inscrutable maestro of the economy, has died at 100. His long tenure and famously cryptic pronouncements outlived their own myth.",
    genre: "Economy",
    sources: [
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMilgFBVV95cUxNalBqeTVydzFhdkdETElZWW5ZZTRSM3ZsaUtCaVZSMGNCZTQ2dXNmMDdGQzBKUlphSDB0d21EanZqWmhqMmVKeUhiOWdtWS14akk1Z3lxTHBkTGc0SGZPQnhtX3MxazFQLVRaUFc4bFZudnJJdlAwTnRPZW9jVGswWmJrMDBxNUllSW9yT3cwcm8yTFZPMkE?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/alan-greenspan-fed-maestro-dies-at-100.png",
      alt: "A central banker who spoke in riddles",
      credit: "Federal Reserve",
    },
    rank: 6,
    analogies: [
      {
        category: "historical",
        title: "The Oracle of Delphi",
        excerpt:
          "States went to war and kings staked everything on pronouncements deliberately phrased to be read either way. Greenspan's prized art of saying something while committing to nothing was the same ancient power, an ambiguity the mighty chose to obey.",
        source: "Greek antiquity",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126",
      },
      {
        category: "historical",
        title: "John Law and the Mississippi Bubble, 1720",
        excerpt:
          "A brilliant financier persuaded a kingdom that paper and confidence could stand in for gold, and for a giddy season he was right. When the bubble he had inflated burst, it took the economy and his reputation with it, the maestro's oldest cautionary twin.",
        source: "Historical record",
        href: "https://www.britannica.com/money/Mississippi-Bubble",
      },
      {
        category: "literary",
        title: "Goethe, “Faust”, Part Two",
        excerpt:
          "Goethe has Mephistopheles solve an emperor's debts by inventing paper money, conjuring value out of a signature and a promise. It remains the sharpest fable of monetary magic, wealth summoned from nothing by a man everyone agrees to trust.",
        source: "Drama, 1832",
        href: "https://www.gutenberg.org/ebooks/63203",
      },
      {
        category: "literary",
        title: "Ayn Rand, “Atlas Shrugged”",
        excerpt:
          "The young Greenspan sat in Rand's circle as she wrote her hymn to the heroic capitalist and the gold standard. That a disciple of her absolutism became the most powerful steward of fiat money is one of the century's quiet ironies.",
        source: "Novel, 1957",
        href: "https://www.penguinrandomhouse.com/books/296832/atlas-shrugged-centennial-ed-hc-by-ayn-rand/",
      },
      {
        category: "artistic",
        title: "Quentin Massys, “The Moneylender and His Wife”",
        excerpt:
          "A man weighs gold coins on a delicate balance while his wife's attention drifts from her prayer book to the scales. It is the oldest portrait of the office Greenspan held, the keeper of the balance on whom everyone's faith and money rest.",
        source: "Oil on panel, 1514",
        href: "https://collections.louvre.fr/en/ark:/53355/cl010061690",
      },
      {
        category: "artistic",
        title: "Charles Ives, “The Unanswered Question”",
        excerpt:
          "A solitary trumpet poses the same riddle again and again while the strings drift on, serene and unhelping, and no answer ever comes. It is Fedspeak set to music, the question left permanently, deliberately open.",
        source: "Composition, 1908",
        href: "https://imslp.org/wiki/The_Unanswered_Question_(Ives,_Charles)",
      },
    ],
  },
  {
    slug: "oracle-sheds-21000-jobs-amid-ai",
    headline: "A software giant sheds 21,000 jobs to the tools it sells",
    overview:
      "Oracle's workforce shrank by roughly 21,000 people as the company leaned into AI, one of the largest cuts yet attributed to automation inside a single firm. The technology sold as help arrives, for those workers, as replacement.",
    genre: "Technology",
    sources: [
      {
        name: "Reuters",
        href: "https://news.google.com/rss/articles/CBMimwFBVV95cUxOU0xZSHdqTkZTenRqaEM4VEFGbmRPYndlel94bldUTXlFUHJnZV9BRHFja0QyZThTV1JrbFJLNFZiaDZubnBGMWlmUEZJd3p1eTI5dkRialdHUmNpZkctdWxRVGJCLUlIaVlGZXpXeDRYWm1ucE9xbENVcWRINTBacU5oanJ5SGZZQm9rd3FHWkFzOXBvdUFQWDFPNA",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/oracle-sheds-21000-jobs-amid-ai.png",
      alt: "The headquarters of a company automating its own workforce",
      credit: "Håkan Dahlström, CC BY",
    },
    rank: 7,
    analogies: [
      {
        category: "historical",
        title: "The Luddites, 1811",
        excerpt:
          "Skilled weavers smashed the power frames that were turning their craft into something a machine could do faster and cheaper. They were not fools afraid of progress but workers who saw, correctly, who the new efficiency was for.",
        source: "Historical record",
        href: "https://www.nationalarchives.gov.uk/explore-the-collection/stories/the-proclamation-of-ned-ludd/",
      },
      {
        category: "historical",
        title: "John Henry and the steam drill",
        excerpt:
          "The steel-driving man raced the machine sent to replace him, won, and died with the hammer in his hand. The legend endures because it names the wager every automated worker is quietly asked to make and cannot win twice.",
        source: "American folk ballad",
        href: "https://www.loc.gov/item/ihas.200196572/",
      },
      {
        category: "literary",
        title: "Karel Čapek, “R.U.R.”",
        excerpt:
          "The play that gave the world the word robot imagines artificial workers built to take every human job, until there is nothing left for people to do. Čapek saw a century early that the trouble begins not when the machines fail but when they succeed.",
        source: "Play, 1920",
        href: "https://www.gutenberg.org/ebooks/59112",
      },
      {
        category: "literary",
        title: "Kurt Vonnegut, “Player Piano”",
        excerpt:
          "Vonnegut's first novel pictures a society so automated that its engineers have optimized ordinary people out of any reason to exist. The machines work beautifully, and that is exactly the problem the book refuses to let go.",
        source: "Novel, 1952",
        href: "https://www.penguinrandomhouse.com/books/184341/player-piano-by-kurt-vonnegut/",
      },
      {
        category: "artistic",
        title: "Diego Rivera, “Detroit Industry Murals”",
        excerpt:
          "Rivera wrapped a courtyard in the choreography of the assembly line, men and machines fused into one vast organism of production. He painted the factory at its mightiest, the human hands still indispensable in a way this week's news quietly undoes.",
        source: "Fresco, 1932",
        href: "https://dia.org/collection/detroit-industry-murals/58537",
      },
      {
        category: "artistic",
        title: "Honegger, “Pacific 231”",
        excerpt:
          "Honegger built an entire orchestral piece out of a steam locomotive gathering speed, thrilled and a little afraid of the machine's momentum. It is the sound of an age falling in love with the engine that would not need it.",
        source: "Composition, 1923",
        href: "https://imslp.org/wiki/Pacific_231_(Honegger,_Arthur)",
      },
    ],
  },
  {
    slug: "glm-5-2-most-powerful-open-weights-model",
    headline: "The most powerful open model yet slips past the gate",
    overview:
      "A new release, GLM-5.2, is described as probably the most powerful text-only open-weights language model to date, putting frontier-grade capability in the hands of anyone who can run it. The gate around the most advanced models keeps slipping.",
    genre: "Technology",
    sources: [
      {
        name: "Simon Willison's Weblog",
        href: "https://simonwillison.net/2026/Jun/17/glm-52/",
      },
    ],
    href: "#",
    publishedAt: "2026-06-17",
    image: {
      src: "/covers/glm-5-2-most-powerful-open-weights-model.png",
      alt: "A powerful new capability set loose in the world",
      credit: "AI-generated",
    },
    rank: 8,
    analogies: [
      {
        category: "historical",
        title: "Diderot's “Encyclopédie”, 1751",
        excerpt:
          "A team of writers set out to gather all of human knowledge into one work and put it in the hands of any literate citizen, against the wishes of church and crown. The point was never the volumes themselves but the leveling, knowledge taken out of the gatekeepers' hands.",
        source: "Reference work, 1751",
        href: "https://encyclopedie.uchicago.edu/",
      },
      {
        category: "historical",
        title: "Gutenberg's press, c. 1450",
        excerpt:
          "Movable type took the copying of texts away from the monastery scriptorium and made multiplication cheap and uncontrollable. Within decades the ideas the authorities most wanted contained were the ones spreading fastest, the original lesson in what release really means.",
        source: "Historical record",
        href: "https://www.loc.gov/exhibits/bibles/the-gutenberg-bible.html",
      },
      {
        category: "literary",
        title: "Aeschylus, “Prometheus Bound”",
        excerpt:
          "Prometheus steals fire from the gods and hands it to mortals, and is chained to a rock for the gift. The myth fixes forever the double face of a released power, the same flame that warms the world being the one its giver is punished for letting go.",
        source: "Tragedy, 5th c. BCE",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010",
      },
      {
        category: "literary",
        title: "Mary Shelley, “Frankenstein”",
        excerpt:
          "A maker brings a powerful new being into the world and discovers at once that creating it and controlling it are different problems entirely. Two centuries on the anxiety is unchanged, the thing you set loose not asking permission for what it becomes.",
        source: "Novel, 1818",
        href: "https://www.gutenberg.org/ebooks/84",
      },
      {
        category: "artistic",
        title: "Cornelius Cardew, “Treatise”",
        excerpt:
          "A 193-page score of pure abstract notation with no instructions, free for anyone to interpret and perform however they can. Cardew released authorship itself, handing the work over as open material rather than fixed commands, an art object shaped like open weights.",
        source: "Graphic score, 1963",
        href: "https://www.wisemusicclassical.com/work/64858/Treatise--Cornelius-Cardew/",
      },
      {
        category: "artistic",
        title: "Sol LeWitt, the wall drawings",
        excerpt:
          "LeWitt sold not paintings but instructions, certificates of directions anyone could follow to execute the work on any wall. The piece lives in the rules, not the object, runnable wherever there is someone to carry it out.",
        source: "Conceptual art, 1968",
        href: "https://www.moma.org/collection/works/79898",
      },
    ],
  },
  {
    slug: "oldest-evidence-of-plague-mass-death-found",
    headline: "The plague turns out to be thousands of years older than its chronicles",
    overview:
      "Researchers report DNA evidence of mass death from plague roughly 5,000 years ago, pushing the recorded reach of the disease deep into prehistory. The same pathogen that haunts the written record turns out to be far older than its chronicles.",
    genre: "Science",
    sources: [
      {
        name: "Kottke.org",
        href: "https://kottke.org/26/06/0049192-scientists-have-found-evi",
      },
      {
        name: "The New York Times",
        href: "https://www.nytimes.com/2026/06/17/science/oldest-plague-siberian-skeletons.html",
      },
    ],
    href: "#",
    publishedAt: "2026-06-17",
    image: {
      src: "/covers/oldest-evidence-of-plague-mass-death-found.png",
      alt: "The plague bacterium under the microscope",
      credit: "NIAID",
    },
    rank: 9,
    analogies: [
      {
        category: "historical",
        title: "The Black Death, 1347",
        excerpt:
          "In four years the pestilence killed perhaps half of Europe and rewrote everything from wages to faith in its wake. The new DNA pushes the same killer thousands of years further back, making the medieval catastrophe one chapter in a far longer book.",
        source: "Historical record",
        href: "https://en.wikipedia.org/wiki/Black_Death",
      },
      {
        category: "historical",
        title: "The Plague of Justinian, 541 CE",
        excerpt:
          "Procopius watched the same bacterium empty the streets of Constantinople and described the dying with a clinician's exactness. That his sixth-century plague and a 5,000-year-old grave carry the identical pathogen collapses the distance between ancient and prehistoric.",
        source: "History, 6th c. CE",
        href: "https://sourcebooks.fordham.edu/source/542procopius-plague.asp",
      },
      {
        category: "literary",
        title: "Defoe, “A Journal of the Plague Year”",
        excerpt:
          "Defoe reconstructed London's 1665 plague as a tissue of bills of mortality, rumor and shuttered houses, the bureaucracy of mass death. His insistence on counting the dead street by street is the literary ancestor of the lab now counting them by their DNA.",
        source: "Chronicle, 1722",
        href: "https://www.gutenberg.org/ebooks/376",
      },
      {
        category: "literary",
        title: "Boccaccio, “The Decameron”",
        excerpt:
          "Boccaccio opens with the plague emptying Florence, then sends ten young people to the hills to tell stories against the dark. The frame is the oldest answer to catastrophe we keep returning to, to survive, gather, and narrate the dead so they are not simply gone.",
        source: "Stories, c. 1353",
        href: "https://www.gutenberg.org/ebooks/23700",
      },
      {
        category: "artistic",
        title: "Bruegel, “The Triumph of Death”",
        excerpt:
          "Bruegel filled a panoramic landscape with armies of skeletons harvesting the living of every rank without exception. It is the plague century's clearest verdict, painted, death as the great leveler that spares no station.",
        source: "Oil on panel, c. 1562",
        href: "https://www.museodelprado.es/en/the-collection/art-work/the-triumph-of-death/d3d82b0b-9bf2-4082-ab04-66ed53196ccc",
      },
      {
        category: "artistic",
        title: "Holbein, “The Dance of Death”",
        excerpt:
          "Holbein's tiny prints send a grinning skeleton to collect pope and peasant, merchant and child alike, each in the middle of ordinary life. The series fixed the medieval intuition the new graves confirm, that the contagion makes no distinctions, and never did.",
        source: "Woodcuts, 1538",
        href: "https://www.metmuseum.org/art/collection/search/360011",
      },
    ],
  },
  {
    slug: "clive-davis-music-starmaker-dies-at-94",
    headline: "The starmaker who heard the hit before anyone else dies at 94",
    overview:
      "Clive Davis, the record executive who shaped the careers of Whitney Houston, Bruce Springsteen and many others, has died at 94. He was the impresario behind the talent, the ear that turned performers into stars.",
    genre: "Culture",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/c3vy3e6q90qo",
      },
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMilwFBVV95cUxPMm1EYUhaTjVLS2NKdlpSMmJmdDU2T2RkMGhXUllTUF9LT2VRVXJXVzdiSEZUb19SVkcyMmppLW5HSTM5VEZxTWc3VkdrODAwbFNPc0tKLXJTNUI4NnpneHZvU1lRYnFRWG53eFhWa1RvT0pNRFFLa1d1T29tcUczRGt2ZDM1SllLQ2FVRTdrY1U1SzlBbHVv?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/clive-davis-music-starmaker-dies-at-94.png",
      alt: "The impresario behind the talent",
      credit: "Wikimedia (CC BY)",
    },
    rank: 10,
    analogies: [
      {
        category: "historical",
        title: "Maecenas, patron of the Augustan poets",
        excerpt:
          "The Roman statesman who funded Virgil and Horace gave his very name to the idea of patronage, the powerful figure who makes art possible from behind it. Horace opens his odes by turning to him first, the way every star turns to the one who backed them.",
        source: "Roman poetry, 1st c. BCE",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0024:book=1:poem=1",
      },
      {
        category: "historical",
        title: "Diaghilev and the Ballets Russes",
        excerpt:
          "Diaghilev wrote no music and danced no steps, yet he assembled the composers, dancers and painters who remade twentieth-century art around his company. The impresario's gift is not talent but the ear and the nerve to gather it and stake everything on it.",
        source: "Historical record",
        href: "https://www.vam.ac.uk/collections/diaghilev-and-the-ballet-russes",
      },
      {
        category: "literary",
        title: "Balzac, “Lost Illusions”",
        excerpt:
          "Balzac laid bare the machinery that manufactures and destroys artistic reputations, the trade in fame that runs beneath the art. Two centuries on, the starmaker's industry he dissected is recognizable to the last contract and betrayal.",
        source: "Novel, 1843",
        href: "https://www.gutenberg.org/ebooks/13159",
      },
      {
        category: "literary",
        title: "Goethe, “Wilhelm Meister's Apprenticeship”",
        excerpt:
          "Goethe followed a young man drawn into the theater and the long apprenticeship that turns raw promise into a finished artist. Behind every discovered star stands this older story, the patient, unglamorous shaping of talent into a career.",
        source: "Novel, 1796",
        href: "https://www.gutenberg.org/ebooks/36483",
      },
      {
        category: "artistic",
        title: "Warhol and “The Velvet Underground & Nico”",
        excerpt:
          "Warhol attached his name and his peeling banana to an unknown band, less producing the music than framing it as something worth hearing. It is the impresario's act in pop form, the curator who lends his authority until the talent can carry its own.",
        source: "Album cover, 1967",
        href: "https://www.moma.org/collection/works/297601",
      },
      {
        category: "artistic",
        title: "“A Great Day in Harlem”, 1958",
        excerpt:
          "Fifty-seven jazz musicians gathered on a Harlem stoop for a single morning photograph, an entire ecosystem of talent in one frame. It is a portrait of the world the starmaker works inside, the dense human network from which the famous few are drawn.",
        source: "Photograph, 1958",
        href: "https://en.wikipedia.org/wiki/A_Great_Day_in_Harlem",
      },
    ],
  },
  {
    slug: "leonora-carrington-shape-of-dreams-sculptures",
    headline:
      "Leonora Carrington's dream creatures step out of the canvas and into bronze",
    overview:
      "An exhibition brings out Leonora Carrington's sculptural work, the bronze and gilded creatures that step from her surrealist paintings into solid form. The dream bestiary she painted for decades is finally given a body.",
    genre: "Culture",
    sources: [
      {
        name: "Colossal",
        href: "https://www.thisiscolossal.com/2026/06/leonora-carrington-shape-of-dreams-sculptures-jewelry/",
      },
    ],
    href: "#",
    publishedAt: "2026-06-18",
    image: {
      src: "/covers/leonora-carrington-shape-of-dreams-sculptures.png",
      alt: "A surreal dream creature cast in solid form",
      credit: "Colossal",
    },
    rank: 11,
    analogies: [
      {
        category: "historical",
        title: "Breton's Surrealist Manifesto, 1924",
        excerpt:
          "Breton declared the dream and the unconscious legitimate material for art, as real and usable as anything in waking life. Carrington's solid creatures are that founding claim taken literally, the contents of sleep cast in bronze.",
        source: "Manifesto, 1924",
        href: "https://archive.org/details/andrebretonmanifestoesofsurrealism",
      },
      {
        category: "historical",
        title: "The alchemical tradition and “Splendor Solis”",
        excerpt:
          "Carrington steeped herself in alchemy's bestiary of hybrid beasts and transformations, the old dream of turning base matter into gold. Her gilded figures are a modern page of that tradition, the laboratory reimagined as a sculptor's studio.",
        source: "Alchemical manuscript, 1582",
        href: "https://en.wikipedia.org/wiki/Splendor_Solis",
      },
      {
        category: "literary",
        title: "Lewis Carroll, “Alice's Adventures in Wonderland”",
        excerpt:
          "Carroll built a world that runs on dream logic, where impossible creatures speak in earnest and the rules change without warning. Carrington's animals belong to the same lineage, escapees from a story that takes the absurd entirely seriously.",
        source: "Novel, 1865",
        href: "https://www.gutenberg.org/ebooks/11",
      },
      {
        category: "literary",
        title: "Leonora Carrington, “The Hearing Trumpet”",
        excerpt:
          "Carrington was a writer as strange as she was a painter, and her novel sends a 92-year-old woman into a surreal convent of revolt and transformation. The sculptures share its key, the marvelous treated as ordinary, the fantastic reported in a level voice.",
        source: "Novel, 1974",
        href: "https://www.nyrb.com/products/the-hearing-trumpet",
      },
      {
        category: "artistic",
        title: "Bosch, “The Garden of Earthly Delights”",
        excerpt:
          "Bosch populated his triptych with hybrid creatures and impossible machines five centuries before the word surrealism existed. He is the distant ancestor of Carrington's bestiary, proof the dream menagerie is one of art's oldest impulses.",
        source: "Oil on panel, c. 1500",
        href: "https://www.museodelprado.es/en/the-collection/art-work/the-garden-of-earthly-delights-triptych/02388242-6d6a-4e9e-a992-e1311eab3609",
      },
      {
        category: "artistic",
        title: "Remedios Varo, the visionary canvases",
        excerpt:
          "Varo, Carrington's closest friend in their Mexico City exile, painted alchemists and travelers in glowing dreamlike interiors. The two women built a private surrealist world together, and these sculptures are one room of it stepped into three dimensions.",
        source: "Paintings, 1950s",
        href: "https://www.moma.org/collection/works/291307",
      },
    ],
  },
  {
    slug: "pilfered-picasso-found-in-paris-drug-bust",
    headline: "A Paris drug raid turns up a Picasso worth millions",
    overview:
      "Police searching a suburban Paris home during a narcotics raid turned up a stolen Picasso worth as much as $17 million. The painting had been living underground as contraband, a masterpiece hidden in plain sight.",
    genre: "Culture",
    sources: [
      {
        name: "Artforum",
        href: "https://www.artforum.com/news/paris-drug-bust-nets-pilfered-picasso-1234752741/",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/pilfered-picasso-found-in-paris-drug-bust.png",
      alt: "A recovered painting surfacing from the underground",
      credit: "AI-generated",
    },
    rank: 12,
    analogies: [
      {
        category: "historical",
        title: "The theft of the “Mona Lisa”, 1911",
        excerpt:
          "An ordinary museum worker walked out of the Louvre with the most famous painting on earth under his coat, and the empty wall drew bigger crowds than the picture had. The theft proved that stealing a masterpiece only deepens its fame.",
        source: "Historical record",
        href: "https://www.louvre.fr/en/explore/the-palace/from-the-mona-lisa-to-the-wedding-feast-at-cana",
      },
      {
        category: "historical",
        title: "The Gardner Museum heist, 1990",
        excerpt:
          "Thieves cut thirteen works from their frames in Boston and vanished, and the empty frames still hang where the paintings were. The case is the standing reminder that a stolen masterpiece often simply disappears, too hot to sell and too precious to destroy.",
        source: "Historical record",
        href: "https://www.fbi.gov/history/famous-cases/isabella-stewart-gardner-museum-heist",
      },
      {
        category: "literary",
        title: "Poe, “The Purloined Letter”",
        excerpt:
          "Poe's detective finds the stolen prize not in some clever hiding place but sitting in plain sight, exactly where no one thought to look. A priceless Picasso surfacing in a dealer's flat is the same trick, the valuable thing hidden by sheer ordinariness.",
        source: "Short story, 1844",
        href: "https://www.gutenberg.org/ebooks/2148",
      },
      {
        category: "literary",
        title: "Donna Tartt, “The Goldfinch”",
        excerpt:
          "Tartt's novel follows a small stolen painting kept secret for years, a hidden masterpiece that warps the life of everyone who holds it. It is the inner life of exactly this kind of case, the contraband canvas as a private burden and a curse.",
        source: "Novel, 2013",
        href: "https://www.hachettebookgroup.com/titles/donna-tartt/the-goldfinch/9780316055437/",
      },
      {
        category: "artistic",
        title: "Caravaggio, “Nativity with St Francis and St Lawrence”",
        excerpt:
          "Cut from its frame in a Palermo oratory in 1969 and never recovered, the painting is the most famous ghost in art crime. It is the darker possibility shadowing every recovery, the masterpiece that goes underground and never comes back.",
        source: "Oil on canvas, 1609",
        href: "https://www.fbi.gov/investigate/violent-crime/art-crime/fbi-top-ten-art-crimes/nativity-with-san-lorenzo-and-san-francesco",
      },
      {
        category: "artistic",
        title: "Picasso, “Les Demoiselles d'Avignon”",
        excerpt:
          "No artist's work is stolen more often, the name itself functioning as portable, convertible value in the underworld. The market turned his canvases into a kind of currency, which is precisely how one ends up as collateral in a drug raid.",
        source: "Oil on canvas, 1907",
        href: "https://www.moma.org/collection/works/79766",
      },
    ],
  },
  {
    slug: "from-olivetti-to-instagram-brand-design-history",
    headline: "From a typewriter to a feed: how brands learned to be seen",
    overview:
      "A new design publication traces modern brand identity from early twentieth-century modernism to the social-media feed, the long arc from Olivetti's typewriters to Instagram's logo. The mark a company makes is read as a history of how we have learned to see.",
    genre: "Culture",
    sources: [
      {
        name: "It's Nice That",
        href: "https://www.itsnicethat.com/features/katharina-sussek-jens-muller-the-elements-of-brand-design-taschen-publication-graphic-design-spotlight-170626",
      },
    ],
    href: "#",
    publishedAt: "2026-06-17",
    image: {
      src: "/covers/from-olivetti-to-instagram-brand-design-history.png",
      alt: "A century of brand marks laid side by side",
      credit: "It's Nice That",
    },
    rank: 13,
    analogies: [
      {
        category: "historical",
        title: "Peter Behrens and AEG, 1907",
        excerpt:
          "Behrens designed not just AEG's products but its logo, typeface, buildings and posters as a single coherent system, inventing the corporate identity. Every brand guideline since descends from his idea that a company could be designed whole.",
        source: "Corporate identity, 1907",
        href: "https://www.moma.org/collection/works/5490",
      },
      {
        category: "historical",
        title: "Adriano Olivetti's design culture",
        excerpt:
          "Olivetti made design a corporate philosophy, treating typewriters, shopfronts and factories as expressions of one humane idea of the company. It is the high-water mark the feed's flattened logos are measured against, design as conviction rather than decoration.",
        source: "Industrial design, 1968",
        href: "https://www.moma.org/collection/works/4576",
      },
      {
        category: "literary",
        title: "Ruskin, “The Nature of Gothic”",
        excerpt:
          "Ruskin argued that how a thing is made is written all over how it looks, and that machine perfection costs something human. His quarrel with mass production is the unease that still haunts a brand language built to be infinitely, frictionlessly reproduced.",
        source: "Essay, 1853",
        href: "https://www.gutenberg.org/ebooks/30755",
      },
      {
        category: "literary",
        title: "Marshall McLuhan, “The Medium is the Massage”",
        excerpt:
          "McLuhan insisted that every new medium quietly reshapes the message and the people using it, the form mattering more than the content it carries. The move from Olivetti's page to Instagram's square is exactly his thesis, a new medium remaking the mark to fit itself.",
        source: "Book, 1967",
        href: "https://gingkopress.com/shop/the-medium-is-the-massage-softcover/",
      },
      {
        category: "artistic",
        title: "Piet Mondrian and De Stijl",
        excerpt:
          "Mondrian reduced the visible world to a grid of black lines and primary blocks, a severe vocabulary that became the unspoken grammar of modern design. Strip a century of logos to their bones and his rectangles are still holding them up.",
        source: "Oil on canvas, 1921",
        href: "https://www.moma.org/collection/works/79002",
      },
      {
        category: "artistic",
        title: "El Lissitzky, “Beat the Whites with the Red Wedge”",
        excerpt:
          "Lissitzky compressed a civil war into a red wedge driving into a white circle, pure geometry made to persuade. It is the moment design discovered it could carry an argument with shape alone, the ancestor of every brand that means to move you before you read a word.",
        source: "Lithograph, 1919",
        href: "https://commons.wikimedia.org/wiki/File:Artwork_by_El_Lissitzky_1919.jpg",
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
