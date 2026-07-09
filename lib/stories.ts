// The reading model for the public site. Today these are placeholder stories;
// in a later stage `getPublishedStories` / `getStoryBySlug` will read published
// `events` (+ their verified `analogies`) from Neon. The shapes here mirror that
// data model (ARCHITECTURE.md §5) so the swap is a query change, not a refactor.
//
// Future Neon columns implied below: events gain `genre`, `lead`, `rank`, and
// image columns; analogies gain image columns; `sources` becomes a related table
// (or jsonb). Images are optional everywhere.

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
  edition?: string; // the edition label this story was published under (e.g. "Evening Edition · 24 June 2026")
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

// Hand-curated front page. Three separated editions are shown, newest first:
// the Evening Edition of 8 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Afternoon Edition of 8 July 2026 and the Morning Edition of 8 July 2026.
// Stories are selected from the live RSS feeds in `lib/feeds.ts`. The analogies are
// the heart of each story: six per event, two per category, each linking to a real
// human-written source (a primary text, museum object page, or archive). Excerpts
// quote the most relevant passage verbatim where the source is public domain, and
// otherwise describe rather than quote. Covers are dithered local copies: feed or
// rights-clean Wikimedia art/photos credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated"). Every analogy carries its own
// image too - a rights-clean visual of its subject (the artwork itself, a manuscript
// page, a portrait, a title page; never AI-generated), dithered via
// scripts/dither-art.ts to /covers/<slug>--art. Omit only when nothing rights-clean
// exists; the home hero crossfades to these on hover. Source links to AP/Reuters are
// Google News redirects (see `lib/feeds.ts`).
const stories: Story[] =
[
  {
    "slug": "iran-strikes-gulf-arab-states",
    "headline": "US launches fresh airstrikes on Iran; Tehran fires missiles at Bahrain, Kuwait and Qatar",
    "overview": "The United States carried out a new round of airstrikes on Iran early on July 9, 2026, hitting the southern port cities of Sirik and Bandar Abbas on the Strait of Hormuz, after President Trump vowed to 'hit them hard again' in retribution for Iranian attacks on ships in the waterway. Iran retaliated against US Gulf allies: explosions were reported in Bahrain's capital Manama, Kuwait said it intercepted missiles and drones, and Qatar issued a security alert. US Central Command said the strikes aimed to 'further degrade Iran's ability to attack commercial shipping,' while Iran's parliamentary speaker warned that 'if you strike, you'll get hit.'",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQTXRXN1ZOY3dWb0Y3bFliM0t6QVRjQkxGNmNRRkVPM29YazVXaXVpaFo3N2h2MHdBLUlTMWNROTJuTUJQNFhaR3BwTzV5b0NDYk1WOG5NMXRHLWhuNHF1NXJqOFM0Vzg2TWo2bXRCUS11WmFEeU45UURDV0dqX0szLWxfbkptQXFxQVJXM0hjY2lkS1VJdkljZWFR?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cz75zjj5wp8o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/iran-strikes-gulf-arab-states.png",
      "alt": "An oil tanker silhouetted at dusk in the narrow Strait of Hormuz, a strategic shipping lane between two arid coastlines",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Peace That Was No Peace: Thucydides on the Collapse of the Peace of Nicias (5th c. BC)",
        "excerpt": "and though for six years and ten months they abstained from invasion of each other's territory, yet abroad an unstable armistice did not prevent either party doing the other the most effectual injury, until they were finally obliged to break the treaty made after the ten years' war and to have recourse to open hostilities.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5.25–26, trans. Richard Crawley; Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/7142"
      },
      {
        "category": "historical",
        "title": "\"A Full Retaliatory Response\": JFK's Cuban Missile Crisis Address (Oct. 22, 1962)",
        "excerpt": "It shall be the policy of this Nation to regard any nuclear missile launched from Cuba against any nation in the Western Hemisphere as an attack by the Soviet Union on the United States, requiring a full retaliatory response upon the Soviet Union. The path we have chosen for the present is full of hazards, as all paths are—but it is the one most consistent with our character and courage as a nation and our commitments around the world.",
        "source": "John F. Kennedy, Radio and Television Report to the American People on the Soviet Arms Build-up in Cuba, Oct. 22, 1962; The American Presidency Project (UC Santa Barbara)",
        "href": "https://www.presidency.ucsb.edu/documents/radio-and-television-report-the-american-people-the-soviet-arms-buildup-cuba"
      },
      {
        "category": "literary",
        "title": "The Arrow of Pandarus: A Sworn Truce Shattered — Homer's Iliad, Book IV (Pope trans.)",
        "excerpt": "Now with full force the yielding horn he bends, / Drawn to an arch, and joins the doubling ends; / Close to his breast he strains the nerve below, / Till the barb'd points approach the circling bow; / The impatient weapon whizzes on the wing; / Sounds the tough horn, and twangs the quivering string.",
        "source": "Homer, The Iliad, Book IV (Pandarus breaks the truce), trans. Alexander Pope; Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/6130"
      },
      {
        "category": "literary",
        "title": "Turning in the Widening Gyre: W. B. Yeats, \"The Second Coming\" (1920)",
        "excerpt": "Turning and turning in the widening gyre / The falcon cannot hear the falconer; / Things fall apart; the centre cannot hold; / Mere anarchy is loosed upon the world, / The blood-dimmed tide is loosed, and everywhere / The ceremony of innocence is drowned; / The best lack all conviction, while the worst / Are full of passionate intensity.",
        "source": "W. B. Yeats, \"The Second Coming,\" in Michael Robartes and the Dancer (1920); Wikisource",
        "href": "https://en.wikisource.org/wiki/Michael_Robartes_and_the_Dancer/The_Second_Coming"
      },
      {
        "category": "artistic",
        "title": "Ships Splinter in the Strait: Kaulbach's The Naval Battle of Salamis (1868)",
        "excerpt": "In a choked channel between rocky shores, Greek and Persian galleys ram and grind against one another until the water itself disappears beneath a wreckage of shattered hulls, snapped oars and drowning men. Kaulbach freezes the instant a crowded, overconfident fleet turns its own numbers into a death-trap in the narrows, while figures on the cliffs recoil in alarm. It is antiquity's most famous battle in a strait rendered as pure, churning catastrophe.",
        "source": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (1868), Maximilianeum, Munich; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/iran-strikes-gulf-arab-states--art.png",
          "alt": "A vast, crowded naval battle in a narrow strait: Greek and Persian war-galleys collide amid churning water, masts and oars splintering, warriors falling into the sea, while robed figures on a rocky shore watch in alarm.",
          "credit": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (1868), Maximilianeum, Munich — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Drums of War: Holst's \"Mars, the Bringer of War\" from The Planets (1914–16)",
        "excerpt": "Over a relentless five-beat ostinato hammered out by the strings, Holst builds a mechanized march that swells from a menacing whisper into deafening brass and pounding percussion. There is no melody of heroism here, only the grinding, impersonal momentum of a war machine gathering speed. Composed on the eve of the First World War, the movement has become the archetypal sound of mobilization and the drums of a widening conflict.",
        "source": "Gustav Holst, \"Mars, the Bringer of War,\" from The Planets, Op. 32 (1914–16); IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      }
    ],
    "lead": true,
    "rank": 1
  },
  {
    "slug": "typhoon-bavi-taiwan-china",
    "headline": "Typhoon Bavi churns toward Taiwan as China braces for landfall",
    "overview": "Typhoon Bavi, which struck Guam and Rota as a Category 5 storm, tracked toward Taiwan on July 9, 2026, disrupting transport and prompting sea warnings as authorities urged residents to prepare. China placed its southeastern coast on alert and activated emergency measures as forecasters warned the system could make landfall in the coming days. Taiwan hunkered down, cancelling flights and ferries and weighing office and school closures.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxQRkdEY3BmbTM0Rm41SUhUbHRCWHU2VjVCWUtMV1FCZEU2WGxYcVdIOGQzR3Fsdk9wTUpxYktaU2cxQ0RPTWpQNVhTaEE5aXZWYzMzWDdZQVVmdHE1cDBhZXFsMEpTMUFSVDdac0hrVWM0QUk3ZzBMOVh0SGpvWW1ITEVNQ3RZS3BVZUFFajNiR0JGUVdZX1VJMGFZMkVnOU5kOGx0S0xmU0NYZ3hzYWFFeWc5WQ?oc=5"
      },
      {
        "name": "The Straits Times",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxQSDFSR3owQmZGcE5FVHIyc1Qxb3BqZDRNQno3LW45Mk91QW1Gb0lQTDZyUHpZOUUwb3BpVlFoWklkWHJPSGhOZ0JzUENkTFFOMmx5TmdEN1o3bnlwdU11VWpDMk9qU3ZlQ3JqaWVFSXJQM0RsVzF5a3FQWW9KNDJVVHc2X0FyRDhKOUVDaWJ2UXYzNk9mWVdfUkFGRlF5Y2oxeHJGeUlLVGNIRlk?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/typhoon-bavi-taiwan-china.png",
      "alt": "A vast spiral of a powerful typhoon seen from space, its eye clearly visible over the ocean near land",
      "credit": "NASA MODIS via Wikimedia Commons"
    },
    "edition": "Morning Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The storm that wrecked Xerxes' fleet at Cape Sepias (480 BC)",
        "excerpt": "For that night they lay thus; but at early dawn, after clear sky and windless calm, the sea began to be violently agitated and a great storm fell upon them with a strong East Wind, that wind which they who dwell about those parts call Hellespontias... some it cast away at the place called Ipnoi in Pelion and others on the beach, while some were wrecked on the headland of Sepias itself... and the violence of the storm could not be resisted.",
        "source": "Herodotus, The Histories, Book 7.188 (G. C. Macaulay translation)",
        "href": "https://lexundria.com/hdt/7.188/mcly"
      },
      {
        "category": "historical",
        "title": "Defoe chronicles the Great Storm of 1703",
        "excerpt": "the Bricks, Tiles, and Stones, from the Tops of the Houses, flew with such force, and so thick in the Streets, that no one thought fit to venture out",
        "source": "Daniel Defoe, The Storm (1704) — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/42234/pg42234-images.html"
      },
      {
        "category": "literary",
        "title": "Poseidon rouses the sea against Odysseus",
        "excerpt": "So saying, he gathered the clouds, and seizing his trident in his hands troubled the sea, and roused all blasts of all manner of winds, and hid with clouds land and sea alike; and night rushed down from heaven.",
        "source": "Homer, The Odyssey, Book 5 (A. T. Murray translation) — Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D5%3Acard%3D291"
      },
      {
        "category": "literary",
        "title": "The Typhoon strikes the Pequod in the Japanese seas",
        "excerpt": "Warmest climes but nurse the cruellest fangs: the tiger of Bengal crouches in spiced groves of ceaseless verdure. Skies the most effulgent but basket the deadliest thunders: gorgeous Cuba knows tornadoes that never swept tame northern lands. So, too, it is, that in these resplendent Japanese seas the mariner encounters the direst of all storms, the Typhoon. It will sometimes burst from out that cloudless sky, like an exploding bomb upon a dazed and sleepy town.",
        "source": "Herman Melville, Moby-Dick (1851), Ch. 119 'The Candles' — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0119"
      },
      {
        "category": "artistic",
        "title": "Hokusai's Great Wave towers over the boats",
        "excerpt": "Hokusai's woodblock print freezes the instant before the sea overwhelms three fishing boats, its foam-clawed crest arching high above the tiny, huddled crews. Mount Fuji, sacred and immovable, is reduced to a small triangle beneath the wave's curl — humanity and even the eternal mountain dwarfed by the ocean's rising fury. It has become the world's defining image of the sea's overwhelming power against those who brace beneath it.",
        "source": "Katsushika Hokusai, The Great Wave off Kanagawa (ca. 1830–32) — The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/45434",
        "image": {
          "src": "/covers/typhoon-bavi-taiwan-china--art.png",
          "alt": "A towering, claw-like ocean wave curls over three small boats with a small Mount Fuji in the distance.",
          "credit": "Katsushika Hokusai, Under the Wave off Kanagawa (The Great Wave), from Thirty-six Views of Mount Fuji (ca. 1830–32), The Metropolitan Museum of Art — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Debussy's 'Dialogue of the Wind and the Sea'",
        "excerpt": "In La Mer, Debussy conjures the ocean in sound, from the shimmering calm of dawn to the churning violence of its final movement, 'Dialogue du vent et de la mer.' Surging brass, whirling strings and crashing cymbals evoke a rising gale colliding with heaving swells, the sea building toward an overwhelming, tempestuous climax. It renders in music the same dread and grandeur a coast feels as a great storm gathers offshore.",
        "source": "Claude Debussy, La Mer (1905) — IMSLP",
        "href": "https://imslp.org/wiki/La_mer_(Debussy,_Claude)"
      }
    ],
    "rank": 2
  },
  {
    "slug": "japan-bond-yield-30-year-high",
    "headline": "Japan's benchmark government bond yield hits a 30-year high on inflation and fiscal fears",
    "overview": "Japan's benchmark government bond yield climbed to its highest level in about 30 years on July 9, 2026, as stubborn inflation and mounting worries over the country's fiscal health pushed borrowing costs sharply higher. The rise reflects investor unease about Japan's heavy public debt and the Bank of Japan's slow retreat from ultra-loose monetary policy. Higher yields threaten to swell the government's debt-servicing burden and ripple through global markets.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxNQ2VaM2wyWXJ2MHBHdzl4YmhTTW5mRGo3QkxPRVhnbWxaN0xGOUMzTjJ5czRhQ1lJUjJ5aU05MUVfdkQ5Sjd2bjhBVzgtTUFXSnktbmR4N1JFWmpWSXYwODVic2s2OVctUzlSR0d3SDF0QzhHMUdaZ296WFl4R0NseER4endVVENsV1Y5SzdicEVEbEdYeHpWdkZzdmU4SDFRaDY3cmxadmxfRW5aZXREMFhrWVJkdFFDZW5reG9PMUxHaXlIZXNzQ2lPUjQ?oc=5"
      },
      {
        "name": "Financial Times",
        "href": "https://news.google.com/rss/articles/CBMihAFBVV95cUxNMkIwbmFFb3ZEdUhkUFN1c0Nid2o1Y2hBOHR5bzBrbW53aGM0c3MtZzlZNUdxOERCQldKODZVMW5VZk9ld1M3SUpXR1BVdWpfVVRFOFJjdUxjV2VQemZWWHNwcm1mNTUwN2RRRXZIenFOMThHY2d5aUk1UmpGUFM5RHRLaG8?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/japan-bond-yield-30-year-high.png",
      "alt": "The stately stone facade of the Bank of Japan headquarters building in Tokyo",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Solon's seisachtheia: Athens crushed under debt (c. 594 BC)",
        "excerpt": "All the common people were in debt to the rich. For they either tilled their lands for them, paying them a sixth of the increase ... or else they pledged their persons for debts and could be seized by their creditors, some becoming slaves at home, and others being sold into foreign countries.",
        "source": "Plutarch, Life of Solon 13.2 (trans. Bernadotte Perrin), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2008.01.0063%3Achapter%3D13"
      },
      {
        "category": "historical",
        "title": "The 2022 UK gilt crisis: bond yields spike on fiscal fears",
        "excerpt": "In late September 2022 an unfunded package of tax cuts sent yields on long-dated UK government bonds soaring at record speed, threatening a fire-sale collapse among pension funds and forcing the Bank of England into emergency bond-buying to avert a self-reinforcing spiral. It was a stark modern lesson that when markets doubt a state's fiscal footing, borrowing costs can turn violently against it within days.",
        "source": "Bank of England, 'Bank of England announces gilt market operation' (28 September 2022)",
        "href": "https://www.bankofengland.co.uk/news/2022/september/bank-of-england-announces-gilt-market-operation"
      },
      {
        "category": "literary",
        "title": "Shylock's bond: a pound of flesh for a loan",
        "excerpt": "let the forfeit / Be nominated for an equal pound / Of your fair flesh, to be cut off and taken / In what part of your body pleaseth me.",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 3, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt"
      },
      {
        "category": "literary",
        "title": "Mr. Micawber's law of income and expenditure",
        "excerpt": "Annual income twenty pounds, annual expenditure nineteen nineteen six, result happiness. Annual income twenty pounds, annual expenditure twenty pounds ought and six, result misery.",
        "source": "Charles Dickens, The Personal History of David Copperfield, Chapter 12, Wikisource",
        "href": "https://en.wikisource.org/wiki/Personal_History_of_David_Copperfield_(1850)/Chapter_12"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys, The Moneylender and His Wife (1514)",
        "excerpt": "A moneylender weighs gold coins and pearls on his balance while his wife, a devotional book open before her, lets her gaze drift from scripture to the glinting money. Matsys's Flemish panel is an early meditation on the seductive, spiritually corrosive pull of finance and debt, with the ledger and the balance-scale standing in judgment over human desire.",
        "source": "Quentin Matsys, The Moneylender and His Wife (1514), Musée du Louvre — via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Moneylender_and_his_Wife_by_Quinten_Massijs.jpg",
        "image": {
          "src": "/covers/japan-bond-yield-30-year-high--art.png",
          "alt": "A moneylender weighing gold coins on a scale at a table while his wife beside him turns pages of an illustrated prayer book, her eyes drawn to the money",
          "credit": "Quentin Matsys, The Moneylender and His Wife (1514), Musée du Louvre — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Das Rheingold: the ruler who cannot pay his debt",
        "excerpt": "Der du bist, bist du nur durch Verträge; bedungen ist, wohl bedacht deine Macht.",
        "source": "Richard Wagner, Das Rheingold, Scene 2 — the giant Fasolt to the god Wotan, who built Valhalla on credit and cannot pay the agreed price; full score at IMSLP",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      }
    ],
    "rank": 3
  },
  {
    "slug": "sk-hynix-us-listing-oversubscribed",
    "headline": "SK Hynix's US share listing is more than seven times oversubscribed, source says",
    "overview": "SK Hynix's planned US share listing has drawn orders more than seven times the stock on offer, a source said on July 9, 2026, signalling fierce investor appetite for the South Korean memory-chip maker amid the AI-driven boom in high-bandwidth memory. The heavy oversubscription points to strong pricing for one of the year's most closely watched technology listings. SK Hynix is a key supplier of the advanced memory that powers AI accelerators.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQWEhCckk2WnRQeFdNaEFWQlJ5VnJROXhGbnN1clFZTWVrWWVDd3o4cU5BNTctQkp4d2VfcjQ0N2toRTJqbnFjTEw3Wmp4dW9zY2RuNFo4U2tkNmM4dThWSzhYRVAyYzJXQUNIOHVnaGh6NEw0dTZaTS1pclZ2SFJjRjJxYjJfV1F5ZWJHeVlubHV2RnFDUGtZUjA0RURsbmlLeGdEbGN2ZG5hZC1oVENNNFZqam9HYno2cHJqOHhiU1M?oc=5"
      },
      {
        "name": "Investing.com",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNdFQwZXZidzJJd1k5dkREX2x4WVVna25Dc2hwNWZBQ1F4NW5OOTUydm9EV1hsS0tjd09UQjVnd1JHcFYtYWstb0x5WURLN3J3XzdwZUdYNTE1aXlqcHFVblFRZHpIZ3ZKX3RUMVBNY2t6dTdYVE0zWTFFSEJtTGtrcElXd3lQUXB1N3ozYV9wWGxSblVPR3NxeGtFZWNtTEdxSDg0Q2NwOGRRZU9xR1E5MVpGRVZrbm10RWx3bEc0RHpQTzA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/sk-hynix-us-listing-oversubscribed.png",
      "alt": "A mirror-bright silicon semiconductor wafer patterned with a grid of microchips catching the light",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tulip Mania (Holland, 1636–1637)",
        "excerpt": "A golden bait hung temptingly out before the people, and one after the other, they rushed to the tulip-marts, like flies around a honey-pot.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), 'The Tulipomania'",
        "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_3"
      },
      {
        "category": "historical",
        "title": "The Dot-Com IPO Frenzy (1999)",
        "excerpt": "At the peak of the internet boom, investors stampeded into any company with a '.com' in its name, and underwriters were swamped with orders many times larger than the shares actually on offer. When VA Linux Systems went public on December 9, 1999, stock priced at $30 rocketed past $239 by the closing bell — a 698% first-day surge that still stands as a record. It was the same mania of crowds now driving AI-era listings: a conviction, briefly, that demand for the hottest new offering could never be sated.",
        "source": "VA Linux Systems, IPO prospectus (Form 424B2), U.S. Securities and Exchange Commission, December 1999",
        "href": "https://www.sec.gov/Archives/edgar/data/0001096199/000089161899005600/0000891618-99-005600.txt"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid — 'auri sacra fames'",
        "excerpt": "quid non mortalia pectora cogis, / auri sacra fames!",
        "source": "Virgil, Aeneid, Book III, ll. 56–57 — 'To what do you not drive the hearts of men, accursed hunger for gold!'",
        "href": "https://www.thelatinlibrary.com/vergil/aen3.shtml"
      },
      {
        "category": "literary",
        "title": "Ben Jonson, Volpone; or, The Fox (1606)",
        "excerpt": "Good morning to the day; and next, my gold: / Open the shrine, that I may see my Saint. / Hail the world's soul, and mine!",
        "source": "Ben Jonson, Volpone; or, The Fox, Act I, Scene i — Volpone's opening hymn to his hoarded gold",
        "href": "https://www.gutenberg.org/files/4039/4039-h/4039-h.htm"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, An Emblematical Print on the South Sea Scheme (1721)",
        "excerpt": "See here ye Causes why in London, / So many Men are made, & undone, / That Arts, & honest Trading drop, / To Swarm about ye Devils shop.",
        "source": "William Hogarth, engraved verse beneath 'An Emblematical Print on the South Sea Scheme' (1721)",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/sk-hynix-us-listing-oversubscribed--art.png",
          "alt": "A satirical engraving of a dense crowd whirling around a merry-go-round in the City of London while allegorical figures of Fortune, Folly and Villainy preside over the frenzy of stock speculation.",
          "credit": "William Hogarth, An Emblematical Print on the South Sea Scheme (1721) — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold (1869)",
        "excerpt": "Der Welt Erbe gewänne zu eigen, / wer aus dem Rheingold schüfe den Ring, / der maßlose Macht ihm verlieh'.",
        "source": "Richard Wagner, Das Rheingold, Scene 1 (the Rhinemaiden Wellgunde) — 'The world's inheritance would be won by whoever forged the ring from the Rhinegold, which grants him measureless power.'",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      }
    ],
    "rank": 4
  },
  {
    "slug": "paramount-warner-antitrust-delay",
    "headline": "Paramount will not close its Warner Bros deal before July 22 as US states weigh an antitrust suit",
    "overview": "Paramount said it will not complete its acquisition of Warner Bros before July 22, 2026, amid an Oregon-led probe, and sources said a coalition of US states could sue as soon as next week to block the media merger. The delay underscores mounting regulatory scrutiny of a tie-up that would reshape Hollywood. State attorneys general are examining the deal's effect on competition in film, television and streaming.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPUVViSVgzbkdVUkR1cGFjNTVXSHdSZjA5TnlILVB0LWpObFEtdF9FZXNqRXRxSy1qZUkyODNLWVpPTzJYZjZ4WENkZEJXcnNtQ3hvaWd2UEV1TkMtTG1NM1ZURGpkbFpjMm1vdzB0eEowd2taUEV0c2FMc1NZazczYV8zak9aYU5qN3hwWS1wcUpSSTVUYzN6TlRjWEh2eTFBaExhSDFpdVg5WHBOUmRDZ1JUQkJuX2c?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxPb1NUcms4ZW80Mk1MRk1lTUw4TVY4SE1qVE9DV05sbERYZEtpUGZDQnhfcEFLTllKYkF1Vmk4eTlDSjRQZGRfd0dYVW5aZ0UyTEtNOWJNQ1RHV2FHN1E0eHl3NnctYU9iS1VIVG9OTE80YmlBLWp3cDkwajVtLUdDTWVLdGQzejRJWFVVRUR6LVQyZWUyTDVr?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/paramount-warner-antitrust-delay.png",
      "alt": "A vintage film reel and clapperboard resting on a table under a studio spotlight",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Sherman Antitrust Act (1890)",
        "excerpt": "Every contract, combination in the form of trust or otherwise, or conspiracy, in restraint of trade or commerce among the several States, or with foreign nations, is hereby declared to be illegal.",
        "source": "Sherman Antitrust Act, ch. 647, 26 Stat. 209 (1890), Section 1 — via Wikisource",
        "href": "https://en.wikisource.org/wiki/Sherman_Antitrust_Act"
      },
      {
        "category": "historical",
        "title": "Emperor Zeno's Law Against Monopolies (483 AD)",
        "excerpt": "We order that no one shall be so bold as to monopolize the sale of clothing of any kind, or of fish, combs, copper utensils, or anything else having reference to the nourishment or the common use of mankind, no matter of what material it may be composed... Moreover, if anyone should venture to practice monopoly, he shall be deprived of all his property, and sentenced to perpetual exile.",
        "source": "Code of Justinian 4.59.1 (constitution of the Emperor Zeno), trans. S. P. Scott, The Civil Law (1932)",
        "href": "https://droitromain.univ-grenoble-alpes.fr/Anglica/CJ4_Scott.htm"
      },
      {
        "category": "literary",
        "title": "Frank Norris, The Octopus: A Story of California (1901)",
        "excerpt": "the galloping monster, the terror of steel and steam, with its single eye, cyclopean, red, shooting from horizon to horizon... the leviathan, with tentacles of steel clutching into the soil, the soulless Force, the iron-hearted Power, the monster, the Colossus, the Octopus.",
        "source": "Frank Norris, The Octopus: A Story of California (1901) — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/268/pg268.txt"
      },
      {
        "category": "literary",
        "title": "Oliver Goldsmith, The Deserted Village (1770)",
        "excerpt": "Ill fares the land, to hastening ills a prey, / Where wealth accumulates, and men decay... One only master grasps the whole domain, / And half a tillage stints thy smiling plain.",
        "source": "Oliver Goldsmith, The Deserted Village (1770) — via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Deserted_Village"
      },
      {
        "category": "artistic",
        "title": "\"Next!\" — the Standard Oil octopus (Udo Keppler, 1904)",
        "excerpt": "A Standard Oil storage tank rears up as a black octopus, its tentacles coiled around the copper, steel and shipping industries and around a state legislature and the U.S. Capitol, while one last arm reaches hungrily toward the White House. Published in Puck at the height of the trust-busting era, it made the sprawling monopoly the defining image of corporate power grasping at the machinery of the state.",
        "source": "Udo J. Keppler, 'Next!', Puck, September 7, 1904 — Library of Congress / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Standard_oil_octopus_loc_color.jpg",
        "image": {
          "src": "/covers/paramount-warner-antitrust-delay--art.png",
          "alt": "A cartoon octopus labeled Standard Oil, its tentacles wrapped around a state capitol, the U.S. Capitol, and the steel, copper and shipping industries, with one tentacle reaching toward the White House.",
          "credit": "Udo J. Keppler, 'Next!' (1904), Puck magazine, Library of Congress — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Gilbert and Sullivan, Utopia, Limited (1893)",
        "excerpt": "Some seven men form an Association (If possible, all Peers and Baronets)... They then proceed to trade with all who'll trust 'em / Quite irrespective of their capital / (It's shady, but it's sanctified by custom); / Bank, Railway, Loan, or Panama Canal.",
        "source": "W. S. Gilbert and Arthur Sullivan, Utopia, Limited; or, The Flowers of Progress (1893), Mr. Goldbury's song — Gilbert and Sullivan Archive",
        "href": "https://gsarchive.net/utopia/libretto.txt"
      }
    ],
    "rank": 5
  },
  {
    "slug": "platner-maine-senate-withdrawal",
    "headline": "Maine Senate candidate Graham Platner says he will withdraw after a sexual assault allegation",
    "overview": "Democrat Graham Platner said on July 9, 2026 that he plans to withdraw from Maine's US Senate race after a sexual assault allegation surfaced and senior Democrats urged him to step aside. His exit upends a contest the party had hoped to make competitive and forces a scramble to find a new candidate. The allegation and the pressure to quit have roiled the campaign in its early stages.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQRmFtMVZST1ExeFY5dmVwSTNhaldzTzJ6a3hVZGZBTm5zREo0cUlyLWFydkV5LVNFdGxFRThGZTNWUHA4cllqNl9uWE03WTlnM25ZWnNLR29RenlwQVRsV1NTWEVHZ3FwTkQySnd4SEJUcVVBd2lSb3FkOGtONDhTQlVJUldmOHBZM2tHWGJza3BjcW9OZ0lnelBHRzltM2UyRks1MFhrSjZzWEpUQjVObQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE5admJNbE5OcWhRajlialZfYlVibE9ZeFVYVDk3Zk5abzMtU2FHbXNyVFNfeVVHWDF1b0dscGt6TGFPdTNWdWZNM2pDRGtCUENlazJhYlFMeU50Zw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/platner-maine-senate-withdrawal.png",
      "alt": "An empty wooden ballot box on a bare table in a quiet polling place",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Ostracism of Themistocles",
        "excerpt": "For ostracism was not a penalty, but a way of pacifying and alleviating that jealousy which delights to humble the eminent, breathing out its malice into this disfranchisement.",
        "source": "Plutarch, Life of Themistocles 22 (Perrin translation)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Themistocles*.html"
      },
      {
        "category": "historical",
        "title": "Nixon Resigns Under His Own Party's Pressure (1974)",
        "excerpt": "Facing near-certain impeachment over Watergate, Richard Nixon watched his political base collapse when the party elders he had counted on turned against him. Senator Barry Goldwater and other leading Republicans went to the White House to tell him plainly that his support was gone and he must step down. On August 8, 1974, the most powerful man in the world announced he would relinquish the presidency, brought low not by his enemies but by allies who withdrew their protection.",
        "source": "National Archives — Nixon's Resignation Letter",
        "href": "https://www.archives.gov/education/lessons/nixon-articles"
      },
      {
        "category": "literary",
        "title": "The Fall of Satan in Paradise Lost",
        "excerpt": "Him the Almighty Power / Hurled headlong flaming from th' ethereal sky, / With hideous ruin and combustion, down / To bottomless perdition, there to dwell / In adamantine chains and penal fire, / Who durst defy th' Omnipotent to arms.",
        "source": "John Milton, Paradise Lost, Book I",
        "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm"
      },
      {
        "category": "literary",
        "title": "Cardinal Wolsey's Farewell to Greatness",
        "excerpt": "Farewell? A long farewell to all my greatness! / This is the state of man: today he puts forth / The tender leaves of hopes; tomorrow blossoms / And bears his blushing honors thick upon him; / The third day comes a frost, a killing frost.",
        "source": "William Shakespeare, Henry VIII, Act 3, Scene 2",
        "href": "https://www.folger.edu/explore/shakespeares-works/henry-viii/read/3/2/"
      },
      {
        "category": "artistic",
        "title": "Bruegel's The Fall of the Rebel Angels",
        "excerpt": "Pieter Bruegel the Elder's 1562 panel depicts the proud rebel angels cast out of heaven, tumbling from radiant order into a writhing chaos of monstrous forms below. The golden-armored Archangel Michael drives the once-exalted downward, their beauty grotesquely transformed as they plunge. It is a vision of hubris punished in an instant: those who reached too high hurled headlong into ruin.",
        "source": "Royal Museums of Fine Arts of Belgium, Brussels",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Fall_of_the_Rebel_Angels_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/platner-maine-senate-withdrawal--art.png",
          "alt": "Painting of armored angels driving rebel angels, transformed into monstrous creatures, tumbling downward out of heaven",
          "credit": "Pieter Bruegel the Elder, The Fall of the Rebel Angels (1562), Royal Museums of Fine Arts of Belgium — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Götterdämmerung (Twilight of the Gods)",
        "excerpt": "In the final opera of Wagner's Ring cycle, Brünnhilde kindles Siegfried's funeral pyre and rides into the flames, and the fire spreads until Valhalla itself is consumed and the reign of the gods ends. The Immolation Scene gathers the leitmotifs of the entire saga into one overwhelming collapse of the old order. It is music of grandeur turned to ash: the mighty brought low and the twilight of all their ambition.",
        "source": "Richard Wagner, Götterdämmerung, WWV 86D (IMSLP score)",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
      }
    ],
    "rank": 6
  },
  {
    "slug": "houston-ice-shooting-probe",
    "headline": "Family demands an independent probe after an ICE officer fatally shoots a man in Houston",
    "overview": "The family of a man fatally shot by an Immigration and Customs Enforcement officer in Houston is demanding an independent investigation, according to reports on July 8-9, 2026. Relatives and their attorneys questioned the official account of the shooting and called for transparency amid heightened tensions over aggressive immigration enforcement. The case adds to scrutiny of ICE operations under the Trump administration.",
    "genre": "Politics",
    "sources": [
      {
        "name": "PBS NewsHour",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxQS2pjcjRyVk5CWXJRSnllR3hvNVVsM3dfeUEyd1NCUWFYUkJheXVvdlJwNzFtWEN6T05rZ0JUM1FUZ3lEajVVM0ZNQ05NalpPVmNFb3U3WFNuMjhHdEtTekhUemQ2UFIzdFBsYzkyaHNpbWJ2VGVKZk1PRkJCQlQ0cTM1UGl0dmZJbHU2cTlvYUljOVB2enhmNjdxRldHRUFJWkN4U2RQS0o3ZXh4RVhLd29uekQ0Snl4WXdSM0Rxc3VWRlU3RDJlQWVEUTg?oc=5"
      },
      {
        "name": "Houston Public Media",
        "href": "https://news.google.com/rss/articles/CBMi5AFBVV95cUxNSEE2RDR5ejdmQU5NUFRKX0QxNDB5OWU0VWRCeG5GVDc0VHpfVzNjcGwwLS1PVmNvcjdCQzdmNFJhWmNSY1hCbVNNWkp0YTZIUVdlWUt6VzdtdVM3UzJTYUlhMkFNMUpOSWllT2VGbVdWZjNwb3pITVJMUlphSGVjYVJaazZEblBYWUdwRVhLOVEyRnFsYm9aZHExdzlvWXN3cVdUVU4tZVRLMnhkY1BrakVPajdEZ2VEMHhGMHp3M0ZZODJmNXdxaEFCUjVjci1JM2VZSmxNVDY1VHYyUW94WDdXeV_SAewBQVVfeXFMUG9CY05DRU1qYVZMM1h6azVtMEV1SDBfUVlPX2FubG9aMEtxdEhfQkxsNGl4TTdQSEgwdUw1aFBzSTRpMTFXTDkzLTRnMDlJaXpNNG9OS2VSMHpVMmlRdjdYUXhhUVdOQU96bDRfZXQwY1FzTW1mQXJHeHdJOEVjeDl1TE1XeHp0MzlNanF2amJLZUlVZXJ5RDRxRGdSdmVZd0ZzWDhCQXg5cjRBMVpOSFU5bWl6RkIwYnU5MVJzQTFER3RVSXRlNGtlTXAwbHB4RmY0cmNhYU5KN3Z6Zi13ZW0ycml2RFRTZGxCSkU?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/houston-ice-shooting-probe.png",
      "alt": "A single candle burning at a makeshift memorial of flowers on a city sidewalk at dusk",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Boston Massacre and the town's demand for an accounting (1770)",
        "excerpt": "That it is the unanimous opinion of this meeting that the inhabitants and soldiery can no longer live together in safety; that nothing can rationally be expected to restore the peace of the town and prevent further blood and carnage, but the immediate removal of the troops.",
        "source": "A Short Narrative of the Horrid Massacre in Boston (Boston town committee: Bowdoin, Warren, Pemberton), 1770",
        "href": "https://archive.org/stream/shortnarrativeof00inbost/shortnarrativeof00inbost_djvu.txt"
      },
      {
        "category": "historical",
        "title": "The killing of Tiberius Gracchus and his brother denied the body (133 BC)",
        "excerpt": "For they would not listen to his brother's request that he might take up the body and bury it by night, but threw it into the river along with the other dead.",
        "source": "Plutarch, Life of Tiberius Gracchus 20 (Perrin translation, LacusCurtius)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Tiberius_Gracchus*.html"
      },
      {
        "category": "literary",
        "title": "Antigone defies the state's decree to honor her brother's dead body",
        "excerpt": "Yes, since it was not Zeus that published me that edict, and since not of that kind are the laws which Justice who dwells with the gods below established among men. Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods.",
        "source": "Sophocles, Antigone, lines 450–455 (Jebb translation, Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "Andromache's lament over the slain Hector, the dead to be mourned and honored",
        "excerpt": "Husband, perished from out of life art thou, yet in thy youth, and leavest me a widow in thy halls; and thy son is still but a babe, the son born of thee and me in our haplessness...",
        "source": "Homer, Iliad, Book 24 (A. T. Murray translation, Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=24:card=718"
      },
      {
        "category": "artistic",
        "title": "Goya, The Third of May 1808 — civilians executed by the soldiers of the state",
        "excerpt": "A white-shirted man throws his arms wide before a faceless firing squad, his companions already fallen in blood on the ground. Goya strips the state's killing of any glory, turning an anonymous execution into an icon of martyrdom and the world's demand that such deaths be seen and answered for.",
        "source": "Francisco Goya, The Third of May 1808 (1814), Museo del Prado, Madrid",
        "href": "https://www.museodelprado.es/en/the-collection/art-work/the-3rd-of-may-1808-in-madrid-or-the-executions/5e177409-2993-4240-97fb-847a02c6496c",
        "image": {
          "src": "/covers/houston-ice-shooting-probe--art.png",
          "alt": "A man in a white shirt kneels with arms flung wide before a line of soldiers aiming muskets at him, with bloodied corpses at his feet under a night sky",
          "credit": "Francisco Goya, The Third of May 1808 (1814), Museo del Prado — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Lacrimosa of Mozart's Requiem — mourning and the plea before judgment",
        "excerpt": "Lacrimosa dies illa, qua resurget ex favilla judicandus homo reus",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626, Sequence: Lacrimosa (1791); scores at IMSLP",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 7
  },
  {
    "slug": "trump-syria-terrorism-delisting",
    "headline": "Trump rescinds Syria's designation as a state sponsor of terrorism",
    "overview": "President Trump on July 8, 2026 rescinded the United States' long-standing designation of Syria as a state sponsor of terrorism, one of the most significant shifts in Washington's posture toward Damascus in decades. The move clears a major barrier to sanctions relief and could open the door to reconstruction and normalized ties. It marks a dramatic turn from enmity toward engagement with the war-scarred country.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxNRGtWRExZWmd5QXpaYmFjXzI2d0U0SVFPeVRkSlJVS2lVODJBckVjcTdVRUZOeHNNN2RHMVFGNXduZWFxV0g0UFUtVkNFWjh1VHRZWEZjdjZ6bVl1SGFNMVBreDZSdnpILUtQeEoxVE8xcmU0Q0lGb2hCVDJHZjJ2TG5TOWZ3VVpDYUlRVElrZU51TnF2RXBTbnhhOE5OVVdKdk1n?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxPR3ktVmV1YUVZc3pyQmg0bWhtLVo3ZWtXQS1yYmxRRTFLQlh5TmZ1NXhVTDhUNkdIM2NxbjNZRkJpQ0tIdXdwVk9iNDc4d1VqR09VVU5zNWpHZUFJenZaVUxWZ19iVGhhRXQ4cXRhWEFzMVpOZjZOT2RPSmlhM3htVmRrbGEwckd5MVYtbVVQTHU4d0R1T3dyZmZwbUZ5RlJmWGfSAacBQVVfeXFMT0c0OGY5NlVMRi0ycDlfU1BDbVVidnJ0bWl4NVdlN096eEdXcXNDTjhwZzJCUG1vMUVKQ0tQbndtdTJ5UFB6YVBULS0wT3Z1QkNjRTVSc1JlSHpYVFVqTlNxcGVSLWMyQ2lTei10blI5d0VTTEsteFFaWmhGMUl3Zlp6eFk4WERTdUd5OHRWTV9jckNsN0pzOTltYzRVN2V4T0oydXdhenM?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/trump-syria-terrorism-delisting.png",
      "alt": "The sun rising over the minarets and pale stone rooftops of the old city of Damascus",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nixon's opening to China and the Shanghai Communiqué (1972)",
        "excerpt": "progress toward the normalization of relations between China and the United States is in the interests of all countries",
        "source": "Joint Communiqué (\"Shanghai Communiqué\"), Feb. 27–28, 1972 — Office of the Historian, U.S. Department of State (FRUS 1969–1976, Vol. XVII)",
        "href": "https://history.state.gov/historicaldocuments/frus1969-76v17/d203"
      },
      {
        "category": "historical",
        "title": "The Athenian amnesty of 403 BCE after the Thirty Tyrants",
        "excerpt": "I will harbour no grievance against any citizen, save only the Thirty, the Ten, and the Eleven: and even of them against none who shall consent to render account of his office.",
        "source": "Andocides, On the Mysteries §90 — Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Andoc.+1+90&fromdoc=Perseus%3Atext%3A1999.01.0018"
      },
      {
        "category": "literary",
        "title": "The Parable of the Prodigal Son (Gospel of Luke 15)",
        "excerpt": "And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him. ... For this my son was dead, and is alive again; he was lost, and is found.",
        "source": "The Gospel of Luke 15:20–24, King James Version — Bible Gateway",
        "href": "https://www.biblegateway.com/passage/?search=Luke%2015%3A11-32&version=KJV"
      },
      {
        "category": "literary",
        "title": "Prospero forgives his enemies in Shakespeare's The Tempest",
        "excerpt": "Though with their high wrongs I am struck to the quick, / Yet with my nobler reason 'gainst my fury / Do I take part: the rarer action is / In virtue than in vengeance",
        "source": "William Shakespeare, The Tempest, Act V, Scene 1 — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/23042/23042-h/23042-h.htm"
      },
      {
        "category": "artistic",
        "title": "Rembrandt, \"The Return of the Prodigal Son\" (c. 1668)",
        "excerpt": "Rembrandt's late masterpiece shows the ragged, kneeling son folded into his father's embrace, the old man's worn hands resting gently on his back in a gesture of complete forgiveness. Bathed in warm light against enveloping darkness, the reunion turns shame into acceptance, the returning outcast received without a word of reproach.",
        "source": "Hermitage Museum, Saint Petersburg — via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz._van_Rijn_-_The_Return_of_the_Prodigal_Son.jpg",
        "image": {
          "src": "/covers/trump-syria-terrorism-delisting--art.png",
          "alt": "An aged, richly robed father bends over his ragged kneeling son, hands resting on his back, in a dark interior lit by warm golden light.",
          "credit": "Rembrandt Harmensz. van Rijn, The Return of the Prodigal Son (c. 1668), Hermitage Museum, Saint Petersburg — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Rubens, \"Minerva Protects Pax from Mars (Peace and War)\" (1629–1630)",
        "excerpt": "Rubens paints the very moment war is turned back: armored Minerva thrusts the god Mars and a Fury away, while Pax, the goddess of peace, nurses the infant Plenty amid children, fruit, and music. Painted during Rubens's own diplomatic peace mission to England, the allegory imagines enmity giving way to abundance, safety, and reconciliation.",
        "source": "The National Gallery, London (NG46)",
        "href": "https://www.nationalgallery.org.uk/paintings/peter-paul-rubens-minerva-protects-pax-from-mars-peace-and-war"
      }
    ],
    "rank": 8
  },
  {
    "slug": "spacexai-grok-45-launch",
    "headline": "SpaceXAI launches Grok 4.5, a coding and 'agentic' model Musk calls 'Opus-class'",
    "overview": "Elon Musk's SpaceXAI released Grok 4.5 on July 8, 2026, a new model tuned for software coding and autonomous 'agentic' tasks that Musk described as 'Opus-class.' Built in partnership with the coding startup Cursor, the launch pushes the company deeper into the fiercely competitive market for AI programming assistants. It intensifies the race among SpaceXAI, OpenAI, Anthropic and Google for the loyalty of developers.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxORmdrSWI5N0ZiNHdwbXdEMkFHTzZTc2FoMHptUVl3RUtKQUJ2WXBjZjgtRGdlenNDMnBQUVdYbENxdzI5dklEVWtqQkRpSGUtVjdQNkFVbmdXbllFb1E4allfQUZleE56VWx6QXozanpLRkxaT3loUTJROXpsN1JQZkNmQlNwZndrc0dMNk03WWNXalU4RnZqZGhjOU5od1FpelVlSU1VMXJ4ck5KenBTcA?oc=5"
      },
      {
        "name": "TechCrunch",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQZGxfOGQ0djFhVXRtcVoxUENRUnJhZlMyWmctdE9ETl9WZ29lT3o0YlpDVk5uWC1TR3k2WVVGekhTbDhPZWJmU2tGTURONWxMRi1YZHQtVU1xTEt5Q0xFZVlJOHZUQmwtNHowRDlMYjFFbE1hWnJxcFAxUjNyZS1PUExPLUhSWFl0eGE0VGhsNTRjYndtc283ZGhQbWlqcGFWMWxZaS0tUlo?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/spacexai-grok-45-launch.png",
      "alt": "A single glowing filament of light suspended in darkness, like a spark of thought leaping into being",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Golem of Prague",
        "excerpt": "The Shem was written on a piece of paper and inserted either in the mouth or in the forehead of the golem, thus bringing it into life and action. It is said to have grown to be a monster (resembling that of Frankenstein), which the rabbi feared might destroy the world.",
        "source": "The Jewish Encyclopedia (1906), \"Golem\"",
        "href": "https://www.jewishencyclopedia.com/articles/6777-golem"
      },
      {
        "category": "historical",
        "title": "Lovelace's Notes on Babbage's Analytical Engine",
        "excerpt": "The Analytical Engine has no pretensions whatever to originate any thing. It can do whatever we know how to order it to perform. It can follow analysis; but it has no power of anticipating any analytical relations or truths. Its province is to assist us in making available what we are already acquainted with.",
        "source": "Ada Lovelace, Notes on Menabrea's \"Sketch of the Analytical Engine\" (1843), Note G",
        "href": "https://www.cs.yale.edu/homes/tap/Files/ada-lovelace-notes.html"
      },
      {
        "category": "literary",
        "title": "Frankenstein; or, The Modern Prometheus",
        "excerpt": "It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Shelley, Frankenstein (1818), Chapter 5",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "literary",
        "title": "Pygmalion and the Ivory Maiden",
        "excerpt": "the ivory seemed to soften at the touch, and its firm texture yielded to his hand, as honey-wax of Mount Hymettus turns to many shapes when handled in the sun, and surely softens from each gentle touch. He is amazed; but stands rejoicing in his doubt; while fearful there is some mistake, again and yet again, gives trial to his hopes by touching with his hand. It must be flesh! The veins pulsate beneath the careful test of his directed finger.",
        "source": "Ovid, Metamorphoses, Book X (trans. Brookes More, 1922)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=10:card=243"
      },
      {
        "category": "artistic",
        "title": "Michelangelo's The Creation of Adam",
        "excerpt": "Across a sliver of empty space the languid Creator surges toward the newly formed man, their fingers straining but not yet touching — the instant before the spark of life leaps from maker to made. Michelangelo freezes creation at its very threshold, all its promise and peril held in a gap not yet closed.",
        "source": "Michelangelo, The Creation of Adam (c. 1511), Sistine Chapel ceiling, Vatican",
        "href": "https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg",
        "image": {
          "src": "/covers/spacexai-grok-45-launch--art.png",
          "alt": "Fresco of God, borne on billowing cloth, reaching out to give life to the reclining Adam, their fingers nearly touching.",
          "credit": "Michelangelo, The Creation of Adam (c. 1511), Sistine Chapel, Vatican — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Dukas's The Sorcerer's Apprentice (L'apprenti sorcier)",
        "excerpt": "Dukas sets Goethe's ballad to shivering strings and a lurching bassoon as the apprentice enchants a broom to haul his water, then watches the animated servant flood the workshop beyond all control. The music swells into giddy, relentless chaos — a maker overwhelmed by the tireless creation he can no longer command, until the master returns to break the spell.",
        "source": "Paul Dukas, L'apprenti sorcier (1897), after Goethe",
        "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)"
      }
    ],
    "rank": 9
  },
  {
    "slug": "meta-alberta-data-center",
    "headline": "Meta to build a C$13bn data center in Alberta, its first in Canada",
    "overview": "Meta said on July 8, 2026 it will build a roughly C$13 billion data center in Alberta, its first in Canada, to power its artificial-intelligence workloads. The project marks a major expansion of the company's computing infrastructure as it races to train ever-larger AI models. It adds to a global wave of hyperscale construction that is straining power grids and water supplies.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxNRU1kYi03WEJLMjUzY0lVVHVwekxGWTUzVVdZTDFGTFFKVlZERWZCOFVyak1KZ3VUYzlBZzdxZS11SW1Ldzc1amZqeG41TFJ4V0FQSW9pWFEycWhjeHByMG95SFp5VTk0SFQxYnI4Q3NLR0lZYTRSVXdGbFp6VlM4M1NqdlhZT3QzdC1mSU9ScFQwVU1mSFgxVzJvcDRnU3BIVGF4Nkotblhydno4SUZR?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxOQndUcHlKZDM0c3Rma19aWGhsbWZQT0NGUDQzc3hfV1pwcEhGcDJJUzVEeUt4R2FnR2JEUzdXVl9QZnVtLU5zU3BOMnFvN243Zm5zNndtX3RkMl9WMGV0ODd5UHc2STBGN3pVMzZaNmtfQ19VMWpFYjg3WlNTa2hNWG1QVmNjVjNla2oxNkUtX0RfMENScHEzVXFSZW5oSXFVbS1SWNIBqgFBVV95cUxNTlNKbW5ZdVlnZnMtSHVFMEVxMlhVWkZQWm1sMm13VDl1MVI0bXdmOVRzeTNLV2xNUnRwSTdFeGc0aEJTYTdXQmNxMjlFRVRwaEMybkZodk5vYjNxQ2ItMTlkUlBTYmxaSWpGbm5sQWJHZFVadGtYZXVDMWZvaE1PRmpFXzNuTjlUc3liSnBaOVNOMU15Y3JQcjFEOTNCSm9RUDhTS1NHNG9Wdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/meta-alberta-data-center.png",
      "alt": "A long hall of towering server racks receding into the distance, lit by rows of cold blue indicator lights",
      "credit": "BalticServers via Wikimedia Commons"
    },
    "edition": "Morning Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus on the Building of the Great Pyramid of Cheops",
        "excerpt": "they worked by a hundred thousand men at a time, for each three months continually ... there passed ten years while the causeway was made by which they drew the stones ... For the making of the pyramid itself there passed a period of twenty years.",
        "source": "Herodotus, The Histories, Book II (An Account of Egypt), trans. G. C. Macaulay",
        "href": "https://www.gutenberg.org/files/2131/2131-h/2131-h.htm"
      },
      {
        "category": "historical",
        "title": "The Building of Hoover Dam",
        "excerpt": "In the depths of the Great Depression, thousands of men and their families poured into the scorched Black Canyon to wall off the Colorado River. In under five years they raised the largest dam of its age, a monolith of concrete flung up in a harsh and barren land. It stands as a monument to a nation's will to build colossal works against impossible odds.",
        "source": "U.S. Bureau of Reclamation — Hoover Dam History",
        "href": "https://www.usbr.gov/lc/hooverdam/history/storymain.html"
      },
      {
        "category": "literary",
        "title": "The Tower of Babel (Genesis 11)",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "Genesis 11:4, King James Version",
        "href": "https://www.biblegateway.com/passage/?search=Genesis%2011&version=KJV"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "'My name is Ozymandias, king of kings: / Look on my works, ye Mighty, and despair!' / Nothing beside remains. Round the decay / Of that colossal wreck, boundless and bare / The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias' (1818)",
        "href": "https://en.wikisource.org/wiki/Ozymandias_(Shelley)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Tower of Babel",
        "excerpt": "Bruegel's vast panel spirals a Colosseum-like tower up into the clouds, its ramps and arches swarming with cranes, scaffolds and toiling figures. Half-finished and already crumbling on one flank, the megastructure dwarfs the tiny king inspecting his workers and the town at its feet. It is the definitive image of monumental ambition overreaching itself — grandeur and hubris rendered in stone.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/meta-alberta-data-center--art.png",
          "alt": "A colossal spiraling brick-and-stone tower, part built and part ruined, rising into the clouds above a coastal town, covered in ramps, arches and construction cranes.",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Claude Debussy, La cathédrale engloutie (The Sunken Cathedral)",
        "excerpt": "Debussy's tenth prelude conjures a mythic cathedral rising in slow, tolling chords from beneath the sea, its immense stone bulk swelling to a thunderous fortissimo before sinking once more into the deep. The piano becomes architecture: pealing bells, chanting voices and vast pillars of harmony assembled and dissolved. It is sound raised into a towering edifice, magnificent and impermanent.",
        "source": "Claude Debussy, Préludes, Book I, No. 10 (Durand et Cie., 1910)",
        "href": "https://imslp.org/wiki/Pr%C3%A9ludes,_Livre_1_(Debussy,_Claude)"
      }
    ],
    "rank": 10
  },
  {
    "slug": "musk-sec-settlement-approved",
    "headline": "US judge approves Elon Musk's SEC settlement despite 'red flags'",
    "overview": "A US judge on July 8, 2026 approved a settlement between Elon Musk and the Securities and Exchange Commission over his belated disclosure of a Twitter stake, while voicing misgivings about what the court called 'red flags' in the deal. The agreement resolves a long-running dispute over whether Musk reported his stock purchases on time. The judge signed off despite reservations about the terms.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNMWx6TmhtdlhCOU1YMkdmQWpLUkVkSl9DcjZUTnMyT01BYXVEdUtJX0pkRE40Y2ExZ01tTlpQR2pyUmFIdVBNRmJkNldadDZpTDl4OGZUNjVudUJCRVZaMlFIci1DMnVsRzdjcTgzbnJzUTB1aUJQODZSS3dOVVJENm43blFROS14cDFiVGhaVjk1RUpMYnhlVmdQUnN2SW5mdWxfOVE4aTZkVVkwSE1VUF9WREE?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNTU1NZmlzOXFVVXRhOWJ0eTZCVnhzYWRlU0luT0tmYzJRWGNoQU9jV2lXVzhIZV8xTWVUOEpBM0V5cmx3bG1WTENxdC1yMl9ZekdlVW1ndTZaNXV3X2M0cS1qYU5SVHRwdWREdmZxOE9GT0FLcUM2aGdEUXNENFloeXNlSFAwQVZZcGZsYUxzbWs4R1BXTmJhN3MtUy00ZEhWc1E?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/musk-sec-settlement-approved.png",
      "alt": "A set of brass scales of justice on a dark polished bench in an empty courtroom",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero warns that no rich man is ever convicted (70 BC)",
        "excerpt": "the belief that these Courts, constituted as they now are, will never convict any man, however guilty, if only he has money.",
        "source": "Cicero, In Verrem (First Oration against Verres), Actio Prima, 1.2, 70 BC",
        "href": "https://www.attalus.org/cicero/verres1.html"
      },
      {
        "category": "historical",
        "title": "A Gilded Age court bends to the Erie financiers (1869)",
        "excerpt": "The magistrate became more partisan than were the paid advocates before him, and all seemed to vie with one another in their efforts to bring their common profession into public contempt.",
        "source": "Charles Francis Adams Jr., 'A Chapter of Erie' (1869), on Jay Gould, Jim Fisk and the corrupted New York bench",
        "href": "https://archive.org/stream/chaptersoferieot00adam/chaptersoferieot00adam_djvu.txt"
      },
      {
        "category": "literary",
        "title": "La Fontaine: the court whitens the powerful, blackens the weak",
        "excerpt": "Accordingly as your power is great or small, the judgments of a court will whiten or blacken your reputation.",
        "source": "Jean de La Fontaine, 'The Animals Sick of the Plague', Fables VII.1 (1678), trans. F. C. Tilney",
        "href": "https://en.wikisource.org/wiki/The_Original_Fables_of_La_Fontaine/The_Animals_Sick_of_the_Plague"
      },
      {
        "category": "literary",
        "title": "Shakespeare: one deed, two verdicts by rank",
        "excerpt": "That in the captain's but a choleric word, / Which in the soldier is flat blasphemy.",
        "source": "William Shakespeare, Measure for Measure, Act II, Scene 2 (Isabella to Angelo), c. 1604",
        "href": "https://www.folger.edu/explore/shakespeares-works/measure-for-measure/read/2/2/"
      },
      {
        "category": "artistic",
        "title": "Gilbert and Sullivan's Judge, who rose by a rich man's favour",
        "excerpt": "So I fell in love with a rich attorney's / Elderly, ugly daughter. ... And now, if you please, I'm ready to try / This Breach of Promise of Marriage!",
        "source": "W. S. Gilbert and Arthur Sullivan, Trial by Jury (1875), the Learned Judge's song",
        "href": "https://gsarchive.net/trial/tbj_lib.pdf"
      },
      {
        "category": "artistic",
        "title": "Daumier's lawyer who has 'rendered full justice'",
        "excerpt": "In Daumier's lithograph a self-satisfied advocate throws his arms wide in theatrical triumph while his ruined client is led from the room. The caption drips with irony: counsel has 'rendered full justice' — chiefly to himself. It is the courtroom as farce, where eloquence and fees decide who walks free.",
        "source": "Honoré Daumier, 'Les Gens de Justice' series, lithograph, 1846 — The Phillips Collection",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Les_Gens_de_Justice-_M._L%27Avocat_a_rendu_pleine_Justice..._-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/musk-sec-settlement-approved--art.png",
          "alt": "A satirical lithograph of a smug lawyer gesturing grandly in a courtroom while his defeated client looks on.",
          "credit": "Honoré Daumier, Les Gens de Justice: M. L'Avocat a rendu pleine Justice... (1846), The Phillips Collection — public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "amnh-repatriate-native-hair",
    "headline": "American Museum of Natural History to repatriate Native American hair clippings",
    "overview": "The American Museum of Natural History in New York said it will return hundreds of Native American hair clippings, many taken from children at government boarding schools, to their tribes and descendants. The July 8, 2026 announcement is part of a wider reckoning over Indigenous remains and belongings held in museum collections. The samples had been gathered decades ago for now-discredited racial research.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/museum-of-natural-history-repatriate-native-american-hair-1234754263/"
      },
      {
        "name": "The New York Times",
        "href": "https://news.google.com/rss/articles/CBMikAFBVV95cUxOZi1CWTYtS2xUYk9VZEdDZk4xb3VjdkZDVjVPbFVNMkh5MTZkeks3Rk9iV2tvVUdWYkpmbjY4X0JYbW9iSW1TNU5WRmVlcFJNeVNmTHpncndwVFd3WUhXallXQTBFYUxwLWlCUEVwVmRBQUFvU0Q0LVlJVXBYSUh5VnVpMkFKUVRYc082RjZVQ1o?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/amnh-repatriate-native-hair.png",
      "alt": "The grand columned stone facade of the American Museum of Natural History in New York",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Philistines send the captured Ark of the Covenant home to Israel",
        "excerpt": "And they of Bethshemesh were reaping their wheat harvest in the valley: and they lifted up their eyes, and saw the ark, and rejoiced to see it. And the cart came into the field of Joshua, a Bethshemite, and stood there, where there was a great stone.",
        "source": "1 Samuel 6:13-14 (King James Version)",
        "href": "https://www.biblegateway.com/passage/?search=1%20Samuel%206&version=KJV"
      },
      {
        "category": "historical",
        "title": "Klimt's looted 'Woman in Gold' is returned to Adele Bloch-Bauer's heirs",
        "excerpt": "Seized by the Nazis from a Viennese Jewish family in 1938 and held for decades by the Austrian state, Gustav Klimt's shimmering gold portrait of Adele Bloch-Bauer was finally ordered restored in 2006 to her niece, Maria Altmann. The seven-year fight reached the U.S. Supreme Court before an arbitration panel ruled the painting stolen and returned it. What came home was not merely a canvas but a plundered family heritage, the theft at last reversed.",
        "source": "Neue Galerie New York, object record for Klimt's Portrait of Adele Bloch-Bauer I",
        "href": "https://www.neuegalerie.org/womaningold"
      },
      {
        "category": "literary",
        "title": "Antigone defies the king to give her brother the burial the dead are owed",
        "excerpt": "Yes, since it was not Zeus that published me that edict, and since not of that kind are the laws which Justice who dwells with the gods below established among men. Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods. For their life is not of today or yesterday, but for all time, and no man knows when they were first put forth.",
        "source": "Sophocles, Antigone (trans. R. C. Jebb), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "Priam kneels before Achilles to ransom the body of his son Hector",
        "excerpt": "Remember thy father, O Achilles like to the gods, whose years are even as mine, on the grievous threshold of old age. ... For his sake am I now come to the ships of the Achaeans to win him back from thee, and I bear with me ransom past counting. Nay, have thou awe of the gods, Achilles, and take pity on me, remembering thine own father.",
        "source": "Homer, Iliad 24 (trans. A. T. Murray), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=24:card=468"
      },
      {
        "category": "artistic",
        "title": "Gavin Hamilton, 'Priam Pleading with Achilles for the Body of Hector' (1775)",
        "excerpt": "The Scottish painter renders the Iliad's most tender reversal: the aged King Priam, robed and stooping, reaches toward the young warrior Achilles to beg back the corpse of his son. In the hush of the tent, an enemy's grief becomes a shared human plea, and the taken dead are, at last, given up for burial.",
        "source": "Gavin Hamilton, Tate (T00864), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Gavin_Hamilton_(1723-1798)_-_Priam_Pleading_with_Achilles_for_the_Body_of_Hector_-_T00864_-_Tate.jpg",
        "image": {
          "src": "/covers/amnh-repatriate-native-hair--art.png",
          "alt": "An aged, robed king kneels and reaches out imploringly toward a seated young warrior inside a tent, pleading for the body of his dead son.",
          "credit": "Gavin Hamilton, Priam Pleading with Achilles for the Body of Hector (1775), Tate — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "'Va, pensiero,' the exiles' chorus longing for the lost homeland (Verdi's Nabucco)",
        "excerpt": "Va, pensiero, sull'ali dorate; va, ti posa sui clivi, sui colli, ove olezzano tepide e molli l'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi, Nabucco, Act III, libretto by Temistocle Solera — IMSLP",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 12
  },
  {
    "slug": "world-cup-final-halftime-lineup",
    "headline": "Justin Bieber joins Madonna, Shakira and BTS for World Cup final half-time show",
    "overview": "Justin Bieber will perform alongside Madonna, Shakira and BTS at the first-ever Super Bowl-style half-time show of the FIFA World Cup final in New York on July 19, 2026, organizers announced on July 8. Curated by Coldplay's Chris Martin, the 11-minute set will also feature Burna Boy, conductor Gustavo Dudamel, the PS22 Chorus with Coldplay, and the Sesame Street muppets. The show supports the FIFA Global Citizen Education Fund, which aims to raise $100m for children worldwide.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c1wyx7g9e1do"
      },
      {
        "name": "Variety",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPZnJReW95N1JaZ3lfaDlVS0tPaU5QNVlnb3BhbjBXbFBCaTRBeUVuU3Y5Y2VYSWxrMC1YUU44V1hCb3FoSllFQktzb0JCX1o5MWw3WWR3U0ZJU2pKNXA0TEJOTG1KZUFZOFljOUItSUxGbmQwZVRVV0ExaEZqTjUwTFJVd2hOT2F1ZVlLLXRpMU92VUtxNTZHeDhwOEI2cE4xc2VR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/world-cup-final-halftime-lineup.png",
      "alt": "A vast floodlit stadium at night, the green pitch far below ringed by tiers of spectators under blazing lights",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The ancient Olympic Games and their sacred truce",
        "excerpt": "The quoit of Iphitus has inscribed upon it the truce which the Eleans proclaim at the Olympic festivals; the inscription is not written in a straight line, but the letters run in a circle round the quoit.",
        "source": "Pausanias, Description of Greece 5.20.1 (trans. W.H.S. Jones)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0160:book%3D5:chapter%3D20:section%3D1"
      },
      {
        "category": "historical",
        "title": "Titus dedicates the Colosseum with a hundred days of games",
        "excerpt": "At the dedication of his amphitheatre and of the baths which were hastily built near it he gave a most magnificent and costly gladiatorial show. He presented a sham sea-fight too in the old naumachia, and in the same place a combat of gladiators, exhibiting five thousand wild beasts of every kind in a single day.",
        "source": "Suetonius, Life of Titus 7 (trans. J.C. Rolfe, Loeb)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Titus*.html"
      },
      {
        "category": "literary",
        "title": "The funeral games for Patroclus in the Iliad",
        "excerpt": "But Achilles stayed the folk even where they were, and made them to sit in a wide gathering; and from his ships brought forth prizes; cauldrons and tripods and horses and mules and strong oxen and fair-girdled women and grey iron.",
        "source": "Homer, Iliad 23.257–261 (trans. A.T. Murray)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book%3D23:card%3D257"
      },
      {
        "category": "literary",
        "title": "Pindar crowns the Olympic Games as the supreme festival",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth. But if, my heart, you wish to sing of contests, look no further for any star warmer than the sun, shining by day through the lonely sky, and let us not proclaim any contest greater than Olympia.",
        "source": "Pindar, Olympian 1.1–7 (trans. Diane Arnson Svarlien)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book%3DO."
      },
      {
        "category": "artistic",
        "title": "Ulpiano Checa, 'Roman Chariot Race'",
        "excerpt": "Checa's sweeping canvas throws the viewer into the roar of the Roman circus: four-horse chariots thunder around the track, drivers straining at the reins while tiers of spectators surge and cheer. It captures the ancient spectacle as mass entertainment — the whole city gathered as one crowd around the games. The painting won the Spanish artist his first triumph at the Paris Salon in 1890.",
        "source": "Ulpiano Checa, Carrera de carros romanos (Roman Chariot Race), 1890 — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Carrera_de_carros_romanos-Ulpiano_Checa.JPG",
        "image": {
          "src": "/covers/world-cup-final-halftime-lineup--art.png",
          "alt": "A crowded Roman circus with charioteers driving four-horse chariots at full gallop past tiers of cheering spectators.",
          "credit": "Ulpiano Checa, Carrera de carros romanos (Roman Chariot Race) (1890), Museo Ulpiano Checa — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Olympic Hymn for the first modern Games",
        "excerpt": "Composed by Spyridon Samaras to words by the poet Kostis Palamas, the Olympic Hymn was first sung in the marble stadium at the opening of the 1896 Athens Olympics. Its soaring choral invocation of the 'immortal spirit of antiquity' turned sport into sacred ceremony, summoning the nations of the world into a single festival. Adopted as the official anthem of the Olympic movement, it still opens the Games today.",
        "source": "Spyridon Samaras and Kostis Palamas, Olympic Hymn (1896)",
        "href": "https://imslp.org/wiki/Olympic_Hymn_(Samaras,_Spyridon)"
      }
    ],
    "rank": 13
  },
  {
    "slug": "trump-iran-ceasefire-over-markets",
    "headline": "Trump declares Iran ceasefire 'over' and warns of new strikes as oil jumps 8% and the Dow falls 800 points",
    "overview": "President Trump on July 8, 2026 declared the interim ceasefire meant to end the US-Iran war 'over,' warning that the United States was preparing fresh strikes after three ships were attacked in the Strait of Hormuz. The announcement sent markets reeling: crude oil prices surged about 8% and the Dow Jones Industrial Average fell roughly 800 points as investors braced for a renewed and widening conflict. NATO's secretary general called the earlier US attacks on Iran 'absolutely necessary,' deepening fears of a return to open war.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMikAFBVV95cUxNd2NZR0VCUmNCZGxrSS1qamhkR3g4MkJfTjNaV1AzSGpOSzJydGwyT2FGeUJFZm5vY3ZrNVNjRlhmbGs3a1RmV0NWTEZSWTRyS09tMTBaT2padWxOSi1CN2hwTGxkZlh5aWtTT0lRb3VyaUk3WkdOMjAya09UXzBGNE9Oa1NMdXBpeDJSdzJXN1k?oc=5"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMijAFBVV95cUxQM255ZEIteU82bFZRNFpWYW9fTTlFaXdIajdXbjBYNmEzQTZBNUdXYjNjTGxTRm02S0NUQTBDa2lmYndWOV9sN3JqVFFvemRIaXhXTXFEdlFiVDB3cnc2b09hVF9Pd0dBVWhLMWpsV0UzV0NGQ194SFNVRjZBdGJRbExDN3dyVWROTFJscg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/trump-iran-ceasefire-over-markets.png",
      "alt": "The crowded trading floor of the New York Stock Exchange on Wall Street, ringed by trading posts and display screens",
      "credit": "Carol M. Highsmith / Library of Congress via Wikimedia Commons"
    },
    "edition": "Evening Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Peace of Nicias collapses back into war (421 BCE)",
        "excerpt": "though for six years and ten months they abstained from invasion of each other's territory, yet abroad an unstable armistice did not prevent either party doing the other the most effectual injury",
        "source": "Thucydides, History of the Peloponnesian War, Book 5.26, trans. Richard Crawley; Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_5"
      },
      {
        "category": "historical",
        "title": "Chamberlain: the long struggle to win peace has failed (3 September 1939)",
        "excerpt": "I have to tell you now that no such undertaking has been received, and that consequently this country is at war with Germany. You can imagine what a bitter blow it is to me that all my long struggle to win peace has failed. Up to the very last it would have been quite possible to have arranged a peaceful and honourable settlement between Germany and Poland. But Hitler would not have it.",
        "source": "Neville Chamberlain, Radio Address, September 3, 1939; The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/wwii/gb3.asp"
      },
      {
        "category": "literary",
        "title": "Pandarus's arrow shatters the sworn truce at Troy",
        "excerpt": "The Trojans have trampled on their oaths and have wounded you; nevertheless the oath, the blood of lambs, the drink-offerings and the right hands of fellowship in which have put our trust shall not be vain. If he that rules Olympus fulfil it not here and now, he will yet fulfil it hereafter, and they shall pay dearly with their lives and with their wives and children.",
        "source": "Homer, The Iliad, Book IV, trans. Samuel Butler; Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_IV"
      },
      {
        "category": "literary",
        "title": "Yeats: 'Things fall apart; the centre cannot hold'",
        "excerpt": "Turning and turning in the widening gyre / The falcon cannot hear the falconer; / Things fall apart; the centre cannot hold; / Mere anarchy is loosed upon the world, / The blood-dimmed tide is loosed, and everywhere / The ceremony of innocence is drowned; / The best lack all conviction, while the worst / Are full of passionate intensity.",
        "source": "W. B. Yeats, 'The Second Coming,' in Michael Robartes and the Dancer (Cuala Press, 1920); Wikisource",
        "href": "https://en.wikisource.org/wiki/Michael_Robartes_and_the_Dancer/The_Second_Coming"
      },
      {
        "category": "artistic",
        "title": "Rubens, The Consequences of War",
        "excerpt": "Rubens's allegory shows Mars, unleashed, bursting from the temple of Janus whose doors should stay shut in peacetime, trampling a book and a mother clutching her child while Venus vainly tries to hold him back. It is the exact instant a fragile peace gives way to fury, and a grieving Europe throws up her arms behind him. The canvas captures the dread of the moment an agreement to halt fighting is torn open and armies march again.",
        "source": "Peter Paul Rubens, The Consequences of War (1637-1638), oil on canvas, Galleria Palatina, Palazzo Pitti, Florence; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Rubens_-_The_Consequences_of_War.jpg",
        "image": {
          "src": "/covers/trump-iran-ceasefire-over-markets--art.png",
          "alt": "Baroque allegorical painting: the war-god Mars in armor strides forward with sword and shield as Venus tries to restrain him; a distressed woman in black raises her arms, and figures are trampled underfoot amid chaos.",
          "credit": "Peter Paul Rubens, The Consequences of War (1637-1638), Galleria Palatina, Palazzo Pitti, Florence — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Holst, 'Mars, the Bringer of War' from The Planets",
        "excerpt": "Holst opens with a relentless five-beat ostinato pounded out col legno, a war-machine that grinds forward without mercy and swells into brass-and-percussion detonations. The music has no melody so much as an accelerating dread, mirroring markets and nations bracing as a ceasefire is declared over and the drums of a widening war start up again. Its brutal, mechanized crescendo is the sound of peace breaking down and conflict returning in force.",
        "source": "Gustav Holst, The Planets, Op. 32 (1914-1916), full orchestral score; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      }
    ],
    "lead": true,
    "rank": 14
  },
  {
    "slug": "nato-summit-deep-strike-missile",
    "headline": "Twelve NATO allies unveil £37bn 'Deep Precision Strike' missile programme at Ankara summit",
    "overview": "At the NATO summit in Ankara on July 8, 2026, twelve member states including the UK unveiled a new long-range missile programme, the Deep Precision Strike project, pledging more than £37bn ($50bn) over the next decade to build one of the alliance's most advanced weapons. The coordinated 'big reveal' of arms contracts was designed to demonstrate NATO's firepower to President Trump, who has pressed European members to raise defence spending toward 5% of GDP. Trump told allies he wants to keep the United States in the alliance even as he renewed his demands.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ckg4e3lwzqzo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPOU9UVnNYR3lYTnhmMXVERXQzaWs3SE5MLTc2N29ZRjlKRTlSRDJlZl9DcUVBeWxKazN0SE82UlQtblA0UjRxU09vMWpVYmVVTzJ5MFN1dlV0TkE2akxuc0R4TkxNNGZ6WlJPaXJkNERQWHFWUmhmdkN4NlEyNUhXa2xwS0RMTnJWTktVUG51eHN4Q0tGMHAxaTdmNXI1Nm93SVozOHJHYXphQ3pGemc4?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/nato-summit-deep-strike-missile.png",
      "alt": "Rows of member-state flags flying at the entrance to NATO headquarters",
      "credit": "U.S. Department of Defense via Wikimedia Commons"
    },
    "edition": "Evening Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Delian League fixes tribute and ships against the barbarian",
        "excerpt": "When the Athenians had thus gotten the command by the confederates' own accord for the hatred they bare to Pausanias, they then set down an order which cities should contribute money for this war against the barbarians, and which galleys. For they pretended to repair the injuries they had suffered by laying waste the territories of the king. And then first came up amongst the Athenians the office of treasurers of Greece, who were receivers of the tribute, for so they called this money contributed. And the first tribute that was taxed came to four hundred and sixty talents. The treasury was at Delos, and their meetings were kept there in the temple.",
        "source": "Thucydides, History of the Peloponnesian War 1.96, trans. Thomas Hobbes; Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0247%3Abook%3D1%3Achapter%3D96"
      },
      {
        "category": "historical",
        "title": "Hamilton: pooled strength makes a nation respected, not despised",
        "excerpt": "Every institution will grow and flourish in proportion to the quantity and extent of the means concentred towards its formation and support. The rights of neutrality will only be respected when they are defended by an adequate power. A nation, despicable by its weakness, forfeits even the privilege of being neutral.",
        "source": "Alexander Hamilton, The Federalist No. 11 (1787); The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/18th_century/fed11.asp"
      },
      {
        "category": "literary",
        "title": "The muster of the Achaean nations on the plain",
        "excerpt": "They were like great flocks of geese, or cranes, or swans on the plain about the waters of Cayster, that wing their way hither and thither, glorying in the pride of flight, and crying as they settle till the fen is alive with their screaming. Even thus did their tribes pour from ships and tents on to the plain of the Scamander, and the ground rang as brass under the feet of men and horses.",
        "source": "Homer, The Iliad, Book II (the Catalogue of Ships), trans. Samuel Butler; Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2199/2199-h/2199-h.htm"
      },
      {
        "category": "literary",
        "title": "A band of brothers arming for the great day",
        "excerpt": "We few, we happy few, we band of brothers;\nFor he to-day that sheds his blood with me\nShall be my brother; be he ne'er so vile,",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act IV, Scene 3 (St Crispin's Day speech); The Complete Works of William Shakespeare, MIT",
        "href": "http://shakespeare.mit.edu/henryv/henryv.4.3.html"
      },
      {
        "category": "artistic",
        "title": "The allied Holy League fleet at Lepanto",
        "excerpt": "Juan Luna's vast canvas stages the moment a coalition of Christian states — Spain, Venice, the Papacy and their partners — pooled their galleys into a single Holy League and threw their combined firepower against a common foe. Smoke, oars and massed banners fill the frame, a deliberate spectacle of allied strength, exactly the kind of choreographed show of collective force that a summit's 'big reveal' of a shared super-weapon is meant to project.",
        "source": "Juan Luna, The Battle of Lepanto (Combate Naval de Lepanto), 1887, oil on canvas, Senate of Spain, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:The_Battle_of_Lepanto_of_1571_full_version_by_Juan_Luna.jpg",
        "image": {
          "src": "/covers/nato-summit-deep-strike-missile--art.png",
          "alt": "A sprawling naval battle scene: dozens of oared galleys locked together in smoke and chaos, soldiers with banners and weapons clashing across the decks as a combined allied fleet engages the enemy.",
          "credit": "Juan Luna, The Battle of Lepanto (1887), Senate of Spain — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Verdi, the Triumphal March from Aida",
        "excerpt": "Verdi's Grand March stages the return of a victorious army as public spectacle: blazing trumpets in unison, massed chorus and a parade of soldiery and spoils crossing the stage in a deliberate display of a nation's might. It is pageantry as deterrence, strength turned into ceremony to overawe onlookers and allies alike — the operatic equivalent of an alliance unveiling its most advanced weapon as a show of collective power.",
        "source": "Giuseppe Verdi, Aida, Act II Grand March (Triumphal Scene), 1871; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Aida_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 15
  },
  {
    "slug": "trump-ukraine-patriot-production-license",
    "headline": "Trump says US will license Ukraine to produce Patriot air-defence systems",
    "overview": "President Trump said on July 8, 2026 that the United States will grant Ukraine a license to produce Patriot air-defence systems domestically, a significant step toward strengthening Kyiv's ability to defend against Russian missile and drone attacks. He announced the move after meeting Ukrainian President Volodymyr Zelensky on the sidelines of the NATO summit in Ankara. Producing the sophisticated interceptors on Ukrainian soil could help ease chronic shortages of the batteries.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxNUnZfNjg1eEdZNWlueERQYzhObG1hQ05BN3FNUVlvV1dYRk5uakl0SHFwNkVpTmluWGo2aGdHc29lWFhZNnBWUUVTSTc1MVgwWFZ4cmM5aThvQldlYzZyTktnRG9MRXdUdGI1ekhTLUhGNGJlak1xcFJnYkNRQlMzVm9iV043djdqQ0lyang5NkJ6eVJQUTJUbHFDUlJoWkU?oc=5"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxQQzhoTmRUY1YwTVlQNXBOQ08wcTU5dVQ4YXB4ZW0tN3FuMWZCbkFDbTRyRnMwRVNCRVNaTDFRWkhLWENMeUVKelpJdEVVcXdqVy1QVWxPNC02MVVSWF80MG8zR2FZVklqVFMtN2RZZkltNUEtSUgzempWdjFFSlpHekVmSGxnTzZjNlVndzBIQWVJbHJh?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/trump-ukraine-patriot-production-license.png",
      "alt": "A Patriot surface-to-air missile streaking skyward from its launcher in a cloud of smoke and fire",
      "credit": "U.S. Army via Wikimedia Commons"
    },
    "edition": "Evening Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Archimedes forges the engines that shield besieged Syracuse",
        "excerpt": "Archimedes began to ply his engines, and shot against the land forces of the assailants all sorts of missiles and immense masses of stones... huge beams were suddenly projected over the ships from the walls, which sank some of them with great weights plunging down from on high; others were seized at the prow by iron claws, or beaks like the beaks of cranes, drawn straight up into the air, and then plunged stern foremost into the depths.",
        "source": "Plutarch, Life of Marcellus 15, trans. Bernadotte Perrin (Loeb Classical Library), on LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Marcellus*.html"
      },
      {
        "category": "historical",
        "title": "Roosevelt makes America the 'arsenal of democracy' for besieged allies",
        "excerpt": "The people of Europe who are defending themselves do not ask us to do their fighting. They ask us for the implements of war, the planes, the tanks, the guns, the freighters which will enable them to fight for their liberty and for our security... We must be the great arsenal of democracy. For us this is an emergency as serious as war itself.",
        "source": "Franklin D. Roosevelt, Fireside Chat 16, 'On the Arsenal of Democracy,' December 29, 1940",
        "href": "https://millercenter.org/the-presidency/presidential-speeches/december-29-1940-fireside-chat-16-arsenal-democracy"
      },
      {
        "category": "literary",
        "title": "Hephaestus forges the shield and arms of Achilles",
        "excerpt": "Thus having said, the father of the fires / To the black labours of his forge retires. / Soon as he bade them blow, the bellows turned / Their iron mouths, and, where the furnace burned, / Resounding breathed: at once the blast expires, / And twenty forges catch at once the fires; / Just as the god directs, now loud, now low, / They raise a tempest, or they gently blow. / In hissing flames huge silver bars are rolled, / And stubborn brass, and tin, and solid gold: / Before, deep fixed, the eternal anvils stand; / The ponderous hammer loads his better hand, / His left with tongs turns the vexed metal round; / And thick strong strokes the doubling vaults rebound. / Then first he formed the immense and solid shield; / Rich various artifice emblazed the field;",
        "source": "Homer, The Iliad, Book XVIII, trans. Alexander Pope",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_18"
      },
      {
        "category": "literary",
        "title": "Vulcan and the Cyclopes forge new arms for Aeneas at Venus's plea",
        "excerpt": "My Sons, said Vulcan, set your Tasks aside, / Your Strength, and Master Skill, must now be try'd. / Arms, for a Heroe forge... A Flood of molten Silver, Brass, and Gold, / And deadly Steel, in the large Furnace rowl'd; / Of this, their artful Hands a Shield prepare",
        "source": "Virgil, The Aeneid, Book VIII, trans. John Dryden",
        "href": "https://en.wikisource.org/wiki/Aeneid_(Dryden)/Book_VIII"
      },
      {
        "category": "artistic",
        "title": "Velazquez, The Forge of Vulcan",
        "excerpt": "Velazquez paints the divine armorer's workshop at the instant news arrives and labour must resume: half-finished armour glows on the anvil, bellows breathe, and near-naked smiths pause mid-strike, their bodies tensed to beat raw metal into a shield. It is craft as defence made visible, the mundane sweat behind the myth of forging protection for a favoured hero. The same idea underlies licensing Ukraine to build its own Patriots: the shield is no longer merely handed over but hammered out at a working forge of one's own.",
        "source": "Diego Velazquez, The Forge of Vulcan (La Fragua de Vulcano), oil on canvas, 1630, Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/trump-ukraine-patriot-production-license--art.png",
          "alt": "In a dim smithy, Apollo brings news to a startled, halo-lit Vulcan while several muscular blacksmiths pause at the anvil holding a glowing sheet of armour",
          "credit": "Diego Velazquez, The Forge of Vulcan (1630), Museo del Prado — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner, the forging scene from Siegfried",
        "excerpt": "In Act I of Siegfried, the young hero, dissatisfied with inherited blades, re-forges the shards of his father's broken sword Nothung himself, filing them to powder and casting the metal anew as the orchestra rings with hammer-blows and his triumphant forging song. The drama insists that true strength comes not from a weapon merely given but from one the hero learns to make with his own hands. That is precisely the shift in granting Ukraine a licence to manufacture Patriots at home rather than only receiving finished systems.",
        "source": "Richard Wagner, Siegfried, WWV 86C (Der Ring des Nibelungen), Act I forging scene, first performed 1876",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      }
    ],
    "rank": 16
  },
  {
    "slug": "pakistan-balochistan-attacks-42-killed",
    "headline": "Pakistan says 42 security personnel killed in a week of Balochistan attacks",
    "overview": "Pakistan's military said on July 8, 2026 that 42 security personnel had been killed in a series of insurgent attacks across Balochistan province over the past week, including 18 abducted policemen and 11 soldiers slain in separate assaults. The surge in violence marks one of the deadliest weeks in the restive southwestern region, where separatist militants have intensified their campaign against the state and its forces.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxQTlFBbWNpejctSVVTTXdWLVZCN19LVWxIbS1YYnRuTHNEdldPNHV0OU9MTDRRUFRKaVhfMG9RWjlXcUlXa0NpQnhQaFR5b1cyZUJEZ0hWSGhnaC1zb2F4YWtaN3VzMGdYY1RmVHJhZ3VkZjl6dXJHYVhQMnVLcFM5SUw4aU40aUh1cnNidnVCYUFxYWFuX3RiaGpRM09kek9RQ29rNmhwa1d5QzNDRUdsVUhrcTZ3dXpQbDQ1OWZ1c2hUeHc1WHc?oc=5"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxOVklvdUI2TVRua2JldlpSbDl0MTdBd0h1dnh3T1JyaXdCR2hTWWNzX09mUFBtNFB0VlU5WW93VkhmZmVEUkFuWjdxTU9fVEh2N0dxUDRUVlZuNFVLRnZuc3N0SUdCUXdMSTh6M3BGTzNMT0VJT0diM21hSGZCR0FlVU96OEVwSjdOMm1hWk9aamFDbTZtTFR4cGFab1MtRjFTOWx2NHA4NjZZRUhOUkxTRGdPb1hMVFFCNE9MQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/pakistan-balochistan-attacks-42-killed.png",
      "alt": "Rugged, arid mountains rising over the empty highlands of Balochistan in Pakistan",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Xenophon's Ten Thousand harried by the Carduchian hillmen",
        "excerpt": "a party of the Carduchians, who had collected, made an attack on the hindmost men, killing some and wounding others with stones and arrows. ... At one narrow place after another they came up quite close, pouring in volleys of arrows and slingstones.",
        "source": "Xenophon, Anabasis, Book IV, ch. 1, trans. H. G. Dakyns (401 BCE)",
        "href": "https://en.wikisource.org/wiki/Anabasis_(Dakyns)/Book_4/Chapter_1"
      },
      {
        "category": "historical",
        "title": "The 1842 British retreat from Kabul, cut down in the Afghan passes",
        "excerpt": "Bullets kept whizzing by us, as we sat on our horses, for hours. ... The enemy soon assembled in great numbers. Had they made a dash at us, we could have offered no resistance, and all would have been massacred.",
        "source": "Lady Florentia Sale, A Journal of the Disasters in Affghanistan, 1841-2 (London, 1843), entry of 8 January 1842",
        "href": "https://www.ibiblio.org/hyperwar/WH/XIX/LadySale/journal-2.html"
      },
      {
        "category": "literary",
        "title": "Kipling's arithmetic of the frontier: costly soldiers, a cheap bullet",
        "excerpt": "A scrimmage in a Border Station—\n  A canter down some dark defile—\nTwo thousand pounds of education\n  Drops to a ten-rupee jezail—",
        "source": "Rudyard Kipling, \"Arithmetic on the Frontier,\" Departmental Ditties and Other Verses (1886)",
        "href": "https://www.kiplingsociety.co.uk/poem/poems_arith.htm"
      },
      {
        "category": "literary",
        "title": "Roland's rearguard ambushed in the mountain pass at Roncevaux",
        "excerpt": "High are the peaks, the valleys shadowful, / Swarthy the rocks, the narrows wonderful. ... Upon a peak is Oliver mounted, / Kingdom of Spain he sees before him spread, / And Sarrazins, so many gathered.",
        "source": "The Song of Roland (La Chanson de Roland), laisses LXVI and LXXXI, trans. C. K. Scott-Moncrieff (1919)",
        "href": "https://www.gutenberg.org/cache/epub/391/pg391.txt"
      },
      {
        "category": "artistic",
        "title": "Remnants of an Army: the lone survivor of a destroyed frontier column",
        "excerpt": "A single half-dead rider slumps on a stumbling horse against a bleak Afghan plain, the sole man of a 16,000-strong column to reach Jalalabad in 1842. Butler paints not the battle but its aftermath — the silence after a frontier army is swallowed by the mountains. It is the visual counterpart to a week in which a state's soldiers vanish in ones and elevens along a remote and unforgiving border.",
        "source": "Elizabeth Butler (Lady Butler), Remnants of an Army (1879), oil on canvas, Tate Britain, London",
        "href": "https://commons.wikimedia.org/wiki/File:Remnants_of_an_army2.jpg",
        "image": {
          "src": "/covers/pakistan-balochistan-attacks-42-killed--art.png",
          "alt": "An exhausted, wounded lone horseman on a drooping horse crossing an empty plain toward a distant fortress, the sole survivor of a destroyed army.",
          "credit": "Elizabeth Butler (Lady Butler), Remnants of an Army (1879), Tate Britain — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Borodin, In the Steppes of Central Asia (1880)",
        "excerpt": "Borodin's tone poem sets a lonely caravan crossing the vast, dangerous expanse of the Central Asian steppe under armed escort, an oriental melody winding over a plodding, watchful rhythm. The music evokes the fragile passage of men and goods through a boundless frontier where danger is never far — the same rugged, contested borderland where a modern state's soldiers still fall to ambush. Its wide, desolate spaces render the vulnerability of small parties in a hostile land.",
        "source": "Alexander Borodin, In the Steppes of Central Asia (1880), symphonic poem; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/In_the_Steppes_of_Central_Asia_(Borodin,_Aleksandr)"
      }
    ],
    "rank": 17
  },
  {
    "slug": "apple-broadcom-30-billion-us-chips",
    "headline": "Apple commits more than $30 billion to Broadcom to make billions of chips in the US",
    "overview": "Apple said on July 8, 2026 it will spend more than $30 billion over multiple years buying custom silicon and wireless components from Broadcom, in what it called the single biggest commitment under its American Manufacturing Program. US facilities will produce upward of 15 billion chips, with Broadcom investing $1.5 billion to expand its Fort Collins, Colorado plant. The deal deepens Apple's push to source more of its components domestically.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNc21yZ0hzUlp6ZG9xcG1MY2FJbWR0UDV0R3RmX0lqV3g2WEwxUmMwWk1qT2ZWRGdJYlI3WDdvbEo0Z2dXRU1yR2E4NUNsazZENmlWV01sYTdDNnR2Z2JDM0huRkFjUF9fOEpMVEpCQmZPMFVvSllQdlFNQklkOUl5QmFfX2oyNXI5N0pSR0dseUw3X0tqNUp5TEs5aWlMR0hjUDhBX0hTdjdpZm9zZTJFSUxQV3UxTWhpTld2aVRPYzN2VW8?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/08/apple-commits-30-billion-to-broadcom-for-us-chipmaking-push.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/apple-broadcom-30-billion-us-chips.png",
      "alt": "A twelve-inch silicon wafer patterned with hundreds of microchips, glinting with rainbow diffraction",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Themistocles builds the fleet with the silver of Laurium (Herodotus, Histories 7.144, c. 483 BC)",
        "excerpt": "Themistocles had ere this given another counsel that seasonably prevailed. The revenues from the mines at Laurium had brought great wealth into the Athenians' treasury, and when they were to receive each man ten drachmae for his share, then Themistocles persuaded the Athenians to make no such division, but out of the money to build two hundred ships of war, that is, for the war with Aegina.",
        "source": "Herodotus, The Histories, Book VII.144 (A. D. Godley translation; LacusCurtius, University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/7C*.html"
      },
      {
        "category": "historical",
        "title": "Alexander Hamilton, Report on the Subject of Manufactures (1791)",
        "excerpt": "Not only the wealth, but the independence and security of a Country, appear to be materially connected with the prosperity of manufactures. Every nation, with a view to those great objects, ought to endeavour to possess within itself all the essentials of national supply. These comprise the means of Subsistence, habitation, clothing, and defence. The possession of these is necessary to the perfection of the body politic; to the safety as well as to the welfare of the society... The extreme embarrassments of the United States during the late War, from an incapacity of supplying themselves, are still matter of keen recollection.",
        "source": "Alexander Hamilton, Report on Manufactures, presented to the House of Representatives, December 5, 1791",
        "href": "https://publicpolicy.pepperdine.edu/academics/research/faculty-research/intellectual-foundations/early-american/ahrepman.htm"
      },
      {
        "category": "literary",
        "title": "Henry Wadsworth Longfellow, \"The Village Blacksmith\" (1841)",
        "excerpt": "Under a spreading chestnut-tree / The village smithy stands; / The smith, a mighty man is he, / With large and sinewy hands; / And the muscles of his brawny arms / Are strong as iron bands. // His brow is wet with honest sweat, / He earns whate'er he can, / And looks the whole world in the face, / For he owes not any man. ... Thus at the flaming forge of life / Our fortunes must be wrought; / Thus on its sounding anvil shaped / Each burning deed and thought.",
        "source": "Henry Wadsworth Longfellow, \"The Village Blacksmith,\" in The Complete Poetical Works (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1365/pg1365.txt"
      },
      {
        "category": "literary",
        "title": "The forging of the Shield of Achilles (Homer, Iliad, Book XVIII)",
        "excerpt": "Twenty bellows blew upon the melting-pots, and they blew blasts of every kind, some fierce to help him when he had need of them, and others less strong as Vulcan willed it in the course of his work. He threw tough copper into the fire, and tin, with silver and gold; he set his great anvil on its block, and with one hand grasped his mighty hammer while he took the tongs in the other. First he shaped the shield so great and strong, adorning it all over and binding it round with a gleaming circuit in three layers... and with many a wonder did his cunning hand enrich it.",
        "source": "Homer, The Iliad, Book XVIII (Samuel Butler prose translation; Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt"
      },
      {
        "category": "artistic",
        "title": "Joseph Wright of Derby, An Iron Forge (1772)",
        "excerpt": "Wright of Derby floods a working forge with a single incandescent glow from the white-hot bar on the anvil, gathering an artisan family around the machinery of a new industrial age. Painted at the dawn of Britain's manufacturing revolution, it dignifies domestic industry as something luminous and heroic — skilled hands, iron, and fire mastered under one roof. It is the very image of a maker choosing to forge at home the things others would import.",
        "source": "Joseph Wright of Derby, An Iron Forge (1772), oil on canvas; via Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Wright_-_An_Iron_Forge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/apple-broadcom-30-billion-us-chips--art.png",
          "alt": "A candle-lit 18th-century forge interior glowing from a white-hot iron bar on the anvil, with a blacksmith and his family gathered around the machinery.",
          "credit": "Joseph Wright of Derby, An Iron Forge (1772) — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Verdi, the Anvil Chorus from Il Trovatore",
        "excerpt": "Verdi's 'Coro di zingari' opens Act II with gypsy smiths swinging their hammers on ringing anvils at daybreak, the clang of struck iron built straight into the rhythm of the music as they sing in praise of hard work and the forge. It turns the labour of making things by hand into a rousing, communal anthem — the sound of an industrious workshop set to music, and a fitting fanfare for a great push to hammer out billions of components at home.",
        "source": "Giuseppe Verdi, Il trovatore, Act II 'Coro di zingari' (Anvil Chorus), 1853; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Il_trovatore_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 18
  },
  {
    "slug": "imf-cuts-2026-global-growth-forecast",
    "headline": "IMF trims 2026 global growth forecast to 3% as the Middle East war lifts energy prices",
    "overview": "The International Monetary Fund lowered its forecast for global economic growth in 2026 to 3.0% in a World Economic Outlook update published July 8, 2026, citing the drag from the Middle East war that began in February. The Fund said the world economy had weathered the shock better than feared but that energy prices remained about 25% higher than before the conflict; it trimmed the euro area to 0.9% and projected a rebound to 3.4% in 2027.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxNVHl0YW5UTjFwZXJpZHVQc1dkeW5QdVRxem9XZFU0eVFNSDhQeGJ0R1pzV243RkIzWF9PbEVhbUNLTmszMFpXQ2RLeGlFY05Wa0VTS01VQVB3eHlkcGZITjZOWVUwbW5zVS15bHRIZld6aXByN184cjhJamtYWXJpaVI4TmtRbTktSGFvV2t0UGk1M2pyNzhobXlRSjc1UkVOdWk5eW9hTVFyWm9JWHhGcA?oc=5"
      },
      {
        "name": "IMF",
        "href": "https://www.imf.org/en/publications/weo/issues/2026/07/08/world-economic-outlook-update-july-2026"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/imf-cuts-2026-global-growth-forecast.png",
      "alt": "The tall modernist headquarters building of the International Monetary Fund in Washington, D.C.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pericles reckons Athens' war treasure (Thucydides, History of the Peloponnesian War, Book 2)",
        "excerpt": "Apart from other sources of income, an average revenue of six hundred talents of silver was drawn from the tribute of the allies; and there were still six thousand talents of coined silver in the Acropolis, out of nine thousand seven hundred that had once been there, from which the money had been taken for the porch of the Acropolis, the other public buildings, and for Potidaea.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2.13 (Crawley translation), 5th c. BC",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "Malthus foresees subsistence outstripped (An Essay on the Principle of Population)",
        "excerpt": "I say, that the power of population is indefinitely greater than the power in the earth to produce subsistence for man. Population, when unchecked, increases in a geometrical ratio. Subsistence increases only in an arithmetical ratio. A slight acquaintance with numbers will shew the immensity of the first power in comparison of the second.",
        "source": "Thomas Malthus, An Essay on the Principle of Population (1798)",
        "href": "https://www.gutenberg.org/files/4239/4239-h/4239-h.htm"
      },
      {
        "category": "literary",
        "title": "Joseph foretells seven lean years (Genesis 41)",
        "excerpt": "Behold, there come seven years of great plenty throughout all the land of Egypt: And there shall arise after them seven years of famine; and all the plenty shall be forgotten in the land of Egypt; and the famine shall consume the land; And the plenty shall not be known in the land by reason of that famine following; for it shall be very grievous. And for that the dream was doubled unto Pharaoh twice; it is because the thing is established by God, and God will shortly bring it to pass. Now therefore let Pharaoh look out a man discreet and wise, and set him over the land of Egypt. Let Pharaoh do this, and let him appoint officers over the land, and take up the fifth part of the land of Egypt in the seven plenteous years. And let them gather all the food of those good years that come, and lay up corn under the hand of Pharaoh, and let them keep food in the cities. And that food shall be for store to the land against the seven years of famine, which shall be in the land of Egypt; that the land perish not through the famine.",
        "source": "Genesis 41:29-36, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis/Chapter_41"
      },
      {
        "category": "literary",
        "title": "Cassandra, the unbelieved prophetess of doom (Aeschylus, Agamemnon)",
        "excerpt": "They called me once, \"The prophetess of lies, The wandering hag, the pest of every door—\" Attest ye now, She knows in very sooth \"The house's curse, the storied infamy.\"",
        "source": "Aeschylus, Agamemnon (E. D. A. Morshead translation, The House of Atreus), 458 BC",
        "href": "https://en.wikisource.org/wiki/The_House_of_Atreus/Agamemnon"
      },
      {
        "category": "artistic",
        "title": "Alma-Tadema, Joseph, Overseer of Pharaoh's Granaries (1874)",
        "excerpt": "Alma-Tadema paints prudence as administration: Joseph sits at a ledger before the towering granaries of Egypt, tallying the grain laid up in years of plenty against the famine he has foretold. Scribes and stores fill the archaic, sunlit hall, an image of a wise steward reckoning the numbers so a nation may survive the lean years ahead. It is forecasting made monumental — the calm accounting that stands between abundance and disaster.",
        "source": "Lawrence Alma-Tadema, Joseph, Overseer of Pharaoh's Granaries (1874), oil on canvas, Dahesh Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Overseer_of_Pharaoh%27s_Graneries_1874.jpg",
        "image": {
          "src": "/covers/imf-cuts-2026-global-growth-forecast--art.png",
          "alt": "A sunlit ancient-Egyptian hall in which Joseph sits keeping accounts before great granaries, with scribes and stored grain around him.",
          "credit": "Lawrence Alma-Tadema, Joseph, Overseer of Pharaoh's Granaries (1874) — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Joseph and his Brethren, HWV 59 — George Frideric Handel",
        "excerpt": "Handel's 1744 oratorio dramatizes the biblical steward who reads Pharaoh's dreams and warns that seven years of abundance will give way to seven of famine. Across its three acts the chorus and arias turn prudent forecasting into moral drama — the wise administrator laying up stores in fat years so a kingdom may survive the lean ones, redeeming plenty spent on the reckoning of scarcity to come.",
        "source": "George Frideric Handel (music), James Miller (libretto), Joseph and his Brethren, premiered 1744; IMSLP",
        "href": "https://imslp.org/wiki/Joseph_and_His_Brethren,_HWV_59_(Handel,_George_Frideric)"
      }
    ],
    "rank": 19
  },
  {
    "slug": "blue-origin-130-billion-outside-funding",
    "headline": "Bezos's Blue Origin seeks first outside funding at a $130 billion valuation",
    "overview": "Jeff Bezos's rocket company Blue Origin is seeking outside investors for the first time, aiming to raise about $10 billion at a $130 billion valuation, according to reports on July 8, 2026. Coatue Management is expected to lead the round with a $4 billion commitment and Bezos to add $2 billion of his own. The move follows a surge in investor appetite for space ventures after SpaceX's record public debut last month.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxQSEFSS3VEdmtCN2Q4RTdUUzg3Wk53LUcxNGxkb3ZXcUtucnQyYXEwLUVlb0c3UDZaS3JLZEd3ZHZfblVpRjdDSnNMSENkb2lndjFmN1VtQXZGaGJVR2luZWdTTHJFTTJiLXR3TUlzUF9hWjFodXpnZ2E5VmxfTzI2Mmo2VERVVlJTRUpfQk9oQ1VBTkZBZjdnWEtxWEVKMTNEckdIbUpMLUtlZnZ3TU12RlVXTzh2SlBHX2lhSlI0ei1uYmM?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/08/blue-origin-bezos-fundraising.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/blue-origin-130-billion-outside-funding.png",
      "alt": "Blue Origin's New Shepard rocket and crew capsule standing against a blue sky",
      "credit": "Blue Origin via Wikimedia Commons"
    },
    "edition": "Evening Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus, The Histories, Book IV.42 — Pharaoh Necho Funds the Circumnavigation of Africa",
        "excerpt": "This discovery was first made by Necos, the Egyptian king, who on desisting from the canal which he had begun between the Nile and the Arabian gulf, sent to sea a number of ships manned by Phoenicians, with orders to make for the Pillars of Hercules, and return to Egypt through them, and by the Mediterranean. The Phoenicians took their departure from Egypt by way of the Erythraean sea, and so sailed into the southern ocean. When autumn came, they went ashore, wherever they might happen to be, and having sown a tract of land with corn, waited until the grain was fit to cut. Having reaped it, they again set sail; and thus it came to pass that two whole years went by, and it was not till the third year that they doubled the Pillars of Hercules, and made good their voyage home.",
        "source": "Herodotus, The Histories, Book IV.42, trans. George Rawlinson, via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_4"
      },
      {
        "category": "historical",
        "title": "Columbus's Journal of the First Voyage — The Sovereigns Commission a Voyage into the Unknown",
        "excerpt": "your Highnesses gave orders to me that with a sufficient fleet I should go to the said parts of India, and for this they made great concessions to me, and ennobled me, so that henceforward I should be called Don, and should be Chief Admiral of the Ocean Sea, perpetual Viceroy and Governor of all the islands and continents that I should discover and gain... I left the city of Granada on the 12th day of May, in the same year of 1492 ... where I equipped three vessels well suited for such service.",
        "source": "Journal of the First Voyage of Columbus, in The Northmen, Columbus and Cabot, 985-1503, ed. Olson & Bourne (1906), via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/18571/18571-h/18571-h.htm"
      },
      {
        "category": "literary",
        "title": "Jules Verne, From the Earth to the Moon — 'Urbi et Orbi': The World Subscribes to a Moon-Shot",
        "excerpt": "This subscription was successful beyond all expectation; notwithstanding that it was a question not of lending but of giving the money. ... The English have but one soul for the whole twenty-six millions of inhabitants which Great Britain contains. They hinted that the enterprise of the Gun Club was contrary to the 'principle of non-intervention.' And they did not subscribe a single farthing.",
        "source": "Jules Verne, From the Earth to the Moon, Chapter XII, 'Urbi et Orbi', via Wikisource",
        "href": "https://en.wikisource.org/wiki/From_the_Earth_to_the_Moon/Chapter_XII"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VIII — Daedalus and Icarus Take Flight",
        "excerpt": "After the finishing hand was put to the work, the workman himself poised his own body upon the two wings, and hung suspended in the beaten air. He provided his son {with them} as well; and said to him, 'Icarus, I recommend thee to keep the middle tract; lest, if thou shouldst go too low, the water should clog thy wings; if too high, the fire {of the sun} should scorch them. Fly between both'... And now Juno's Samos had been left behind upon the left hand, and Delos, and Paros; and the boy began to rejoice in his bold flight.",
        "source": "Ovid, Metamorphoses, Book VIII, trans. Henry T. Riley (1851), via Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/26073"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, The Fall of Phaeton",
        "excerpt": "Rubens seizes the myth at its catastrophe: Phaethon, having begged to drive the sun-god's chariot across the heavens, has lost command of the immortal horses. Bodies, steeds, and the flaming car tumble headlong through a star-strewn sky as Jupiter's thunderbolts crack out on the right and the female Hours scatter in terror. It is the eternal image of a dazzling, overreaching ascent toward the heavens — a bold venture that could crown its maker or end in ruin.",
        "source": "Peter Paul Rubens, The Fall of Phaeton, c. 1604/1605, oil on canvas, National Gallery of Art, Washington",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/blue-origin-130-billion-outside-funding--art.png",
          "alt": "Rubens's turbulent painting of Phaethon losing control of the sun-god's chariot, horses and figures tumbling through a star-filled sky as thunderbolts fly and the Hours recoil.",
          "credit": "Peter Paul Rubens, The Fall of Phaeton, c. 1604/1605, National Gallery of Art, Washington — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Il mondo della luna (The World on the Moon), Hob. XXVIII:7",
        "excerpt": "Haydn's 1777 dramma giocoso, on a libretto by Carlo Goldoni, stages the oldest of dreams — leaving the earth to reach the Moon. The rich, credulous Buonafede is duped by the false 'astronomer' Ecclitico into believing he has voyaged to a lunar kingdom, an elaborate and costly fiction mounted to win the daughters and the fortune he guards. Its comedy turns on how readily wonder, ambition, and money can be marshalled to underwrite an imagined journey to the heavens.",
        "source": "Joseph Haydn, Il mondo della luna, Hob. XXVIII:7 (1777), libretto by Carlo Goldoni; IMSLP",
        "href": "https://imslp.org/wiki/Il_mondo_della_luna,_Hob.XXVIII:7_(Haydn,_Joseph)"
      }
    ],
    "rank": 20
  },
  {
    "slug": "china-claude-code-backdoor-alert",
    "headline": "China's vulnerability database warns of a 'backdoor' risk in Anthropic's Claude Code",
    "overview": "China's National Vulnerability Database issued a security alert on July 8, 2026 warning that Anthropic's AI coding tool Claude Code contains a built-in monitoring mechanism that it said could transmit users' location and identity data to remote servers without consent, and urged users to uninstall affected versions. Anthropic said the feature was an experimental anti-abuse mechanism and noted that access to Claude is not permitted in China. Alibaba has already barred employees from using the tool, directing them to its own platform.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQTmtuYVZDY0RoM0VTUW1Sa3poM1pYOHlYbVJwRk1lOXNPM1QwX25uMnlrdVUxUnlqSEhXZzlrWUxFQkRRa21HeEJWR1ZrY2UzeVUwdHBmcFR5bDR1OHNIQjRHNTZUYjd0NzJzZjNsQzdqNXRBUDZDdW1wekdXU1ZHcjNlbVVvM1NiSnJVQmppV2I3ZDNnSXIyZDBWMTZPQzhWTTRNUHo2WnZ0TG9RMzhmdjdBQnRzbUts?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/08/china-anthropic-ai-claude-code-backdoor-security-threat.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/china-claude-code-backdoor-alert.png",
      "alt": "Rows of dark server racks receding down the aisle of a data centre",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Laocoon's Warning and the Trojan Horse — Virgil, Aeneid, Book II",
        "excerpt": "O wretched countrymen! what fury reigns? / What more than madness has possess'd your brains? ... This hollow fabric either must inclose, / Within its blind recess, our secret foes ... Trust not their presents, nor admit the horse.",
        "source": "Virgil, Aeneid, Book II (Dryden translation), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=2:card=40"
      },
      {
        "category": "historical",
        "title": "The Monteagle Letter (1605): An Anonymous Warning of a Hidden Blow",
        "excerpt": "My lord, out of the love I bear to some of your friends, I have a care of your preservation, therefore I would advise you, as you tender your life, to devise some excuse to shift off your attendance at this Parliament, for God and Man have concurred to punish the wickedness of this time, and think not slightly of this advertisement but retire yourself into your country where you may expect the event in safety; for though there be no appearance of any stir, yet I say they shall receive a terrible blow this Parliament, and yet they shall not see who hurts them: this counsel is not to be contemned, because it may do you good and can do you no harm, for the danger is passed as soon as you have burnt the letter, and I hope God will give you the grace to make good use of it, to whose Holy Protection I commend you.",
        "source": "The Monteagle Letter, The National Archives (UK)",
        "href": "https://www.nationalarchives.gov.uk/explore-the-collection/stories/the-monteagle-letter/"
      },
      {
        "category": "literary",
        "title": "Pandora, the Beautiful Gift Concealing Every Evil — Hesiod, Works and Days",
        "excerpt": "But the woman took off the great lid of the jar with her hands and scattered all these and her thought caused sorrow and mischief to men. Only Hope remained there in an unbreakable home within under the rim of the great jar, and did not fly out at the door.",
        "source": "Hesiod, Works and Days (Hugh G. Evelyn-White translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/348/348-h/348-h.htm"
      },
      {
        "category": "literary",
        "title": "The Telescreen and the All-Seeing Eye — George Orwell, Nineteen Eighty-Four",
        "excerpt": "Orwell imagines a household instrument that can never be switched off: the telescreen watches and listens in the same breath that it entertains, so that any citizen must assume every movement and word is being recorded. Under the poster's fixed gaze, the warning 'Big Brother Is Watching You' turns an ordinary tool into a silent informer planted in one's own walls. The horror is not a break-in but a device welcomed inside, dutifully reporting its owner to a distant, unseen power.",
        "source": "George Orwell, Nineteen Eighty-Four (full text), Project Gutenberg Australia",
        "href": "https://gutenberg.net.au/ebooks01/0100021.txt"
      },
      {
        "category": "artistic",
        "title": "The Procession of the Trojan Horse into Troy — Giovanni Domenico Tiepolo (c. 1760)",
        "excerpt": "Tiepolo paints the fatal moment of welcome rather than the slaughter: a jubilant crowd hauls the towering wooden horse through the gates as banners fly and figures gesture in triumph. The gift looms over the tiny celebrants, its hollow bulk hiding the armed enemy the Trojans cannot see. The scene freezes a whole city in the act of carrying its own destroyer inside the walls.",
        "source": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse into Troy (c. 1760), National Gallery, London (NG3319)",
        "href": "https://www.nationalgallery.org.uk/paintings/giovanni-domenico-tiepolo-the-procession-of-the-trojan-horse-into-troy",
        "image": {
          "src": "/covers/china-claude-code-backdoor-alert--art.png",
          "alt": "An oil painting showing a festive crowd dragging an enormous wooden horse through a gateway into the city of Troy, banners raised, the great hollow figure towering above the celebrating figures.",
          "credit": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse into Troy (c. 1760), National Gallery, London — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Les Troyens — Hector Berlioz (grand opera, 1856-1858)",
        "excerpt": "In Berlioz's grand opera, drawn from Virgil, the prophetess Cassandre foresees catastrophe as the Trojans exult over the abandoned wooden horse and drag it within their gates. Cursed never to be believed, she cries out that the city is doomed while the crowd sings in triumph, unable to hear the danger inside the gift. Her unheeded warning ends in the eruption of hidden soldiers and the fall of Troy — a chorus of celebration collapsing into ruin.",
        "source": "Les Troyens, H 133 (Berlioz), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Les_Troyens,_H_133_(Berlioz,_Hector)"
      }
    ],
    "rank": 21
  },
  {
    "slug": "bangladesh-monsoon-landslides",
    "headline": "Monsoon landslides kill at least eight in Bangladesh refugee camps as rains batter South Asia",
    "overview": "Landslides triggered by heavy monsoon rains killed at least eight people, including Rohingya refugees, in southeastern Bangladesh on July 8, 2026, with a hillside collapse among the casualties. Torrential rains have battered the region, and forecasters warned of further slides across the crowded, deforested hills sheltering hundreds of thousands of refugees. The disaster underscored the mounting toll of an intensifying monsoon season across South Asia.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cx2wkzww20ro"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxPZU0tS1NWZVd5TmhhY0xfVU50N1J5d092cU8xVzk4UTY4M0lrSHZpeTJLMk5qaTM0MExfcjMwcUNBamRXRDZlSmxOdDM3djRNYWU4Y05JWTltVDVSbGhqU2VtTG9hVFNLX19JMEFxNjVCT0xTRHlfSnI1NmEwTTRhQXpwbXJVeVdzX0tDLXAyN0d0bGVY?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/bangladesh-monsoon-landslides.png",
      "alt": "People wading through a street flooded by heavy monsoon rain in Bangladesh",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Younger, Letter 6.20 — the eruption of Vesuvius (AD 79)",
        "excerpt": "Then the ashes began to fall, but not thickly: I looked back, and a dense blackness was rolling up behind us, which spread itself over the ground and followed like a torrent. \"Let us turn aside,\" I said, \"while we can still see, lest we be thrown down in the road and trampled on in the darkness by the thronging crowd.\" We were considering what to do, when the blackness of night overtook us, not that of a moonless or cloudy night, but the blackness of pent-up places which never see the light.",
        "source": "Pliny the Younger, Letters, Book 6.20, trans. J. B. Firth (1900)",
        "href": "https://www.attalus.org/old/pliny6.html"
      },
      {
        "category": "historical",
        "title": "The Aberfan disaster (1966) — a collapsing hillside buries a school",
        "excerpt": "On a rain-soaked October morning a waterlogged colliery spoil tip above the Welsh village of Aberfan gave way and slid down the mountain, engulfing Pantglas Junior School and the houses below. One hundred and forty-four people died, most of them children at their desks. The official tribunal found the catastrophe had been foreseeable and preventable — tips piled on the hillside above a community that had warned, in vain, of the danger overhead.",
        "source": "Report of the Tribunal appointed to inquire into the Disaster at Aberfan (HMSO, 1967), The National Archives",
        "href": "https://discovery.nationalarchives.gov.uk/details/r/C1704969"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book 1 — the Flood (Deucalion)",
        "excerpt": "And now one vast expanse, the land and sea were mingled in the waste of endless waves—a sea without a shore. One desperate man seized on the nearest hill; another sitting in his curved boat, plied the long oar where he was wont to plow; another sailed above his grain, above his hidden dwelling; and another hooked a fish that sported in a leafy elm.",
        "source": "Ovid, Metamorphoses 1.253ff, trans. Brookes More (1922), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=1:card=253"
      },
      {
        "category": "literary",
        "title": "Nathaniel Hawthorne, \"The Ambitious Guest\" (1835)",
        "excerpt": "Alas! they had quitted their security, and fled right into the pathway of destruction. Down came the whole side of the mountain, in a cataract of ruin. Just before it reached the house, the stream broke into two branches—shivered not a window there, but overwhelmed the whole vicinity, blocked up the road, and annihilated everything in its dreadful course.",
        "source": "Nathaniel Hawthorne, The Great Stone Face and Other Tales of the White Mountains, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1916/1916-h/1916-h.htm"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, L'Hiver (Le Deluge) / Winter (The Flood), 1660-1664",
        "excerpt": "In the last and darkest of Poussin's Four Seasons, a leaden storm-light falls over a drowning world. Rain-swollen waters swallow the land as tiny figures scramble onto rocks and rooftops; a boat capsizes in the foreground while its occupant flings up his hands, and a serpent glides over a slab of stone toward the survivors. Lightning splits the black sky, and far off the Ark rides the flood — the whole canvas a meditation on humanity overwhelmed by an indifferent nature.",
        "source": "Nicolas Poussin, L'Hiver (Le Deluge), 1660-1664, Musee du Louvre, Paris (INV 7306)",
        "href": "https://commons.wikimedia.org/wiki/File:Poussin,_Nicolas_-_L'Hiver_ou_Le_D%C3%A9luge_-_1660-1664.jpg",
        "image": {
          "src": "/covers/bangladesh-monsoon-landslides--art.png",
          "alt": "Dark stormy landscape in which floodwaters engulf the land; small human figures cling to rocks and an overturned boat while lightning flashes and Noah's Ark floats in the distance.",
          "credit": "Nicolas Poussin, L'Hiver (Le Deluge), 1660-1664, Musee du Louvre, Paris — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saens, Le Deluge (The Flood), Op. 45 (1875)",
        "excerpt": "Saint-Saens's biblical oratorio sets the story of Noah and the deluge in three parts, opening with a hushed orchestral Prelude — a famous, elegiac violin solo rising over strings — before the music swells into the roar of rising waters that drown a corrupt world. Chorus and soloists carry the narrative from divine wrath to the receding flood and the dove's return, turning the catastrophe of a world washed away into a somber meditation on destruction and survival.",
        "source": "Camille Saint-Saens, Le deluge, Op. 45 (poeme biblique by Louis Gallet), full scores at IMSLP",
        "href": "https://imslp.org/wiki/Le_d%C3%A9luge,_Op.45_(Saint-Sa%C3%ABns,_Camille)"
      }
    ],
    "rank": 22
  },
  {
    "slug": "quantum-threat-crypto-defenses",
    "headline": "Crypto firms race to build quantum-resistant defences as code-breaking machines draw nearer",
    "overview": "Cryptocurrency companies are drawing up plans to rebuild their networks with quantum-resistant cryptography, according to reporting on July 8, 2026, as researchers warn that quantum computers capable of breaking today's encryption could arrive as soon as 2029. Analysts caution that a large share of some tokens' supply could be exposed, and that adversaries may already be 'harvesting' encrypted data now to decrypt later. The years-long upgrade could require sweeping changes to the infrastructure underpinning digital assets.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxOQnZuN29MZHJtVi1IMFQ0b3Q0cGtJMFdVVHpVZ0M0U2d4OEdGSDg1VWg1YWtmMWFkMVdsNnJPMHhSZEQ5Rkp0bkNadVRVaWc1SlBTVmJINWk0SHptNlpuREVZcEV6TFZRYVNSclRiQ252c2NpdFk4SjBkbDR1ODJNbHlIWUVnaVNiWkFrcUJic0xoSTJpMUdpQU1UTXpUNzdwTndRSE5mb3lad21xUUJvYzdwSVRZa1I4OXFyLTRR?oc=5"
      },
      {
        "name": "PYMNTS",
        "href": "https://www.pymnts.com/cryptocurrency/2026/crypto-sector-preps-defense-against-quantum-computing-threat/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/quantum-threat-crypto-defenses.png",
      "alt": "IBM's Quantum System One, a chandelier-like quantum computer suspended inside a glass cube",
      "credit": "IBM Research via Wikimedia Commons"
    },
    "edition": "Evening Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Histiaeus's Tattooed Messenger (Herodotus, Histories, Book 5)",
        "excerpt": "For Histiaeus, when he was anxious to give Aristagoras orders to revolt, could find but one safe way, as the roads were guarded, of making his wishes known; which was by taking the trustiest of his slaves, shaving all the hair from off his head, and then pricking letters upon the skin, and waiting till the hair grew again.",
        "source": "Herodotus, The History of Herodotus (Rawlinson translation), Book 5 — Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_Herodotus/Book_5"
      },
      {
        "category": "historical",
        "title": "The Zimmermann Telegram — Broken by Room 40 (1917)",
        "excerpt": "We intend to begin on the first of February unrestricted submarine warfare. We shall endeavor in spite of this to keep the United States of America neutral. In the event of this not succeeding, we make Mexico a proposal of alliance on the following basis: make war together, make peace together, generous financial support and an understanding on our part that Mexico is to reconquer the lost territory in Texas, New Mexico, and Arizona.",
        "source": "Decoded translation of the Zimmermann Telegram, 1917 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Zimmermann_Telegram"
      },
      {
        "category": "literary",
        "title": "The Gold-Bug — Edgar Allan Poe",
        "excerpt": "Readily; I have solved others of an abstruseness ten thousand times greater. Circumstances, and a certain bias of mind, have led me to take interest in such riddles, and it may well be doubted whether human ingenuity can construct an enigma of the kind which human ingenuity may not, by proper application, resolve. In fact, having once established connected and legible characters, I scarcely gave a thought to the mere difficulty of developing their import.",
        "source": "Edgar Allan Poe, The Gold-Bug (Tales, 1845) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Tales_(Poe)/The_Gold-Bug"
      },
      {
        "category": "literary",
        "title": "The Adventure of the Dancing Men — Arthur Conan Doyle",
        "excerpt": "I am fairly familiar with all forms of secret writings, and am myself the author of a trifling monograph upon the subject, in which I analyse one hundred and sixty separate ciphers, but I confess that this is entirely new to me.",
        "source": "Arthur Conan Doyle, The Adventure of the Dancing Men — Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Adventure_of_the_Dancing_Men"
      },
      {
        "category": "artistic",
        "title": "Belshazzar's Feast — Rembrandt (c. 1635-1638)",
        "excerpt": "At the height of the king's blasphemous banquet, a disembodied hand blazes out of the darkness and scrawls a coded verdict across the wall — the mysterious MENE, MENE, TEKEL, UPHARSIN. Rembrandt freezes the instant the secret writing appears: Belshazzar recoils, wine spilling, courtiers wide-eyed, no one in the room able to read the message that seals his doom. It is an encrypted warning made visible, awaiting the one interpreter who holds the key.",
        "source": "Rembrandt van Rijn, Belshazzar's Feast (c. 1635-1638), The National Gallery, London (NG6350)",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt-Belsazar.jpg",
        "image": {
          "src": "/covers/quantum-threat-crypto-defenses--art.png",
          "alt": "Rembrandt's painting of a startled King Belshazzar recoiling as a glowing disembodied hand writes Hebrew letters on a dark wall during a feast.",
          "credit": "Rembrandt, Belshazzar's Feast (c. 1635-1638), The National Gallery, London — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Variations on an Original Theme Enigma, Op. 36 — Edward Elgar (1899)",
        "excerpt": "Elgar built an entire orchestral work around a secret: a hidden larger theme he claimed runs through but is never actually played, a cipher woven into the music itself. Each of the fourteen variations disguises a friend behind cryptic initials, and the master melody Elgar hinted at has never been definitively identified. More than a century on, listeners still chase the concealed key that would unlock the whole design — a code left deliberately unbroken.",
        "source": "Edward Elgar, Variations on an Original Theme Enigma, Op. 36 (1899) — IMSLP",
        "href": "https://imslp.org/wiki/Variations_on_an_Original_Theme_'Enigma',_Op.36_(Elgar,_Edward)"
      }
    ],
    "rank": 23
  },
  {
    "slug": "hasselblad-masters-2026-winners",
    "headline": "Hasselblad Masters 2026 photography winners announced across eleven categories",
    "overview": "The winners of the 2026 Hasselblad Masters, one of photography's most selective international awards, were announced this week and spotlighted on July 8, 2026, spanning eleven categories from landscape and portraiture to conceptual and street work. Chosen from thousands of entries by a global jury, the atmospheric, layered images will feature in the next Hasselblad Masters book. The biennial program celebrates technical mastery and interpretive vision in contemporary image-making.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/hasselblad-masters-2026-winning-photographs/"
      },
      {
        "name": "Hasselblad",
        "href": "https://www.hasselblad.com/masters/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/hasselblad-masters-2026-winners.png",
      "alt": "A classic Hasselblad 501CM medium-format film camera",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder, Natural History, Book 35 — the contest of Zeuxis and Parrhasius",
        "excerpt": "This last, it is recorded, entered into a competition with Zeuxis, who produced a picture of grapes so successfully represented that birds flew up to the stage-buildings; whereupon Parrhasius himself produced such a realistic picture of a curtain that Zeuxis, proud of the verdict of the birds, requested that the curtain should now be drawn and the picture displayed; and when he realized his mistake, with a modesty that did him honour he yielded up the prize, saying that whereas he had deceived birds Parrhasius had deceived him, an artist.",
        "source": "Pliny the Elder, Natural History XXXV.65 (Rackham translation)",
        "href": "https://www.attalus.org/translate/pliny_hn35a.html"
      },
      {
        "category": "historical",
        "title": "William Henry Fox Talbot, The Pencil of Nature (1844)",
        "excerpt": "And this led me to reflect on the inimitable beauty of the pictures of nature's painting which the glass lens of the Camera throws upon the paper in its focus—fairy pictures, creations of a moment, and destined as rapidly to fade away.",
        "source": "William Henry Fox Talbot, The Pencil of Nature, \"Brief Historical Sketch of the Invention of the Art\" (1844)",
        "href": "https://www.gutenberg.org/files/33447/33447-h/33447-h.html"
      },
      {
        "category": "literary",
        "title": "John Keats, \"Ode on a Grecian Urn\" (1820)",
        "excerpt": "Heard melodies are sweet, but those unheard\nAre sweeter; therefore, ye soft pipes, play on;\nNot to the sensual ear, but, more endear'd,\nPipe to the spirit ditties of no tone:\nFair youth, beneath the trees, thou canst not leave\nThy song, nor ever can those trees be bare;\nBold Lover, never, never canst thou kiss,\nThough winning near the goal—yet, do not grieve;\nShe cannot fade, though thou hast not thy bliss,\nForever wilt thou love, and she be fair!",
        "source": "John Keats, \"Ode on a Grecian Urn,\" The Poetical Works of John Keats",
        "href": "https://en.wikisource.org/wiki/The_Poetical_Works_of_John_Keats/Ode_on_a_Grecian_Urn"
      },
      {
        "category": "literary",
        "title": "Nathaniel Hawthorne, The House of the Seven Gables (1851)",
        "excerpt": "There is a wonderful insight in Heaven's broad and simple sunshine. While we give it credit only for depicting the merest surface, it actually brings out the secret character with a truth that no painter would ever venture upon, even could he detect it. There is, at least, no flattery in my humble line of art.",
        "source": "Nathaniel Hawthorne, The House of the Seven Gables, ch. VI (Holgrave the daguerreotypist)",
        "href": "https://www.gutenberg.org/files/77/77-h/77-h.htm"
      },
      {
        "category": "artistic",
        "title": "Johannes Vermeer, The Art of Painting (c. 1666-1668)",
        "excerpt": "In a hushed studio filled with cool northern daylight, Vermeer's painter sits at his easel with brush poised, arresting a single suspended instant. Every thread of the tapestry, the map on the wall, and the model posed as Clio, muse of history, is rendered with an almost photographic fidelity to light—an image famously linked to the camera obscura Vermeer is thought to have used. It is the act of capturing a scene, and freezing it, made into subject and homage at once.",
        "source": "Johannes Vermeer, The Art of Painting (c. 1666-1668), Kunsthistorisches Museum, Vienna",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Vermeer_-_The_Art_of_Painting_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/hasselblad-masters-2026-winners--art.png",
          "alt": "Vermeer's The Art of Painting: a painter seen from behind, working at an easel in a light-filled studio while a young woman poses as the muse Clio beside a large wall map.",
          "credit": "Johannes Vermeer, The Art of Painting (c. 1666-1668), Kunsthistorisches Museum, Vienna — public domain via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "Claude Debussy, \"Clair de lune\" from Suite bergamasque (1905)",
        "excerpt": "Debussy's most famous piano miniature does in sound what a photographer does with light: it holds a fleeting, atmospheric impression—moonlight on water—suspended in the air. Rippling, blurred harmonies dissolve the outlines of melody the way soft focus dissolves a scene, evoking mood and shimmer rather than hard fact. Like the prize-winning frames of the Hasselblad Masters, it is the capture of a mood of light, layered and evanescent.",
        "source": "Claude Debussy, \"Clair de lune,\" Suite bergamasque (1905), scores at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Suite_bergamasque_(Debussy,_Claude)"
      }
    ],
    "rank": 24
  },
  {
    "slug": "jodhpur-airport-sthapati-royal",
    "headline": "New Jodhpur airport terminal by Sthapati revives Rajput palace motifs and cuts energy use by half",
    "overview": "A new terminal for Jodhpur airport in Rajasthan, India, designed by the practice Sthapati, was showcased on July 8, 2026 in an architectural feature detailing how it draws on the city's royal Rajput past. The 252,000-square-foot building revives Rajputana motifs — a fluted dome crowned with a kalasa, multifoil arches, colonnades and latticed jharokha screens, with Marwar-inspired murals inside — while cutting energy use by more than half through deep overhangs and solar power. Recently completed and inaugurated, the pastel-toned gateway roots a modern transport hub in regional craft and identity.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/08/jodhpur-airport-expansion-sthapati/"
      },
      {
        "name": "Sthapati",
        "href": "https://sthapatiindia.org/portfolio/jodhpur-airport/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/jodhpur-airport-sthapati-royal.png",
      "alt": "The blue-painted houses of Jodhpur's old city spread below the ramparts of Mehrangarh Fort",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus on Ecbatana, the seven-walled royal citadel of the Medes (Histories, Book I.98)",
        "excerpt": "And as the Medes obeyed him in this also, he built large and strong walls, those which are now called Agbatana, standing in circles one within the other. And this wall is so contrived that one circle is higher than the next by the height of the battlements alone. And to some extent, I suppose, the nature of the ground, seeing that it is on a hill, assists towards this end; but much more was it produced by art, since the circles are in all seven in number. And within the last circle are the royal palace and the treasure-houses. The largest of these walls is in size about equal to the circuit of the wall round Athens; and of the first circle the battlements are white, of the second black, of the third crimson, of the fourth blue, of the fifth red: thus are the battlements of all the circles coloured with various tints, and the two last have their battlements one of them overlaid with silver and the other with gold.",
        "source": "Herodotus, The History of Herodotus, Book I.98, trans. G. C. Macaulay (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "historical",
        "title": "James Tod on the founding of Jodhpur, its palace crowning the 'Hill of Strife' (Annals and Antiquities of Rajasthan, 1832)",
        "excerpt": "Such was the ascetic who recommended Jodha to erect his castle on 'the Hill of Strife' (Jodhagir), hitherto known as Bakharchiriya, or 'the bird's nest,' a projecting elevation of the same range on which Mandor was placed, and about four miles south of it. Doubtless its inaccessible position seconded the recommendation of the hermit, for its scarped summit renders it almost impregnable, while its superior elevation permits the sons of Jodha to command, from the windows of their palace, a range of vision almost comprehending the limits of their sway. In clear weather they can view the summits of their southern barrier, the gigantic Aravalli; but in every other direction it fades away in the boundless expanse of sandy plains.",
        "source": "Lt.-Col. James Tod, Annals and Antiquities of Rajasthan, Vol. II, 'The Foundation of Jodhpur' (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/57375/pg57375.txt"
      },
      {
        "category": "literary",
        "title": "Valmiki's Ramayana: the royal city of Ayodhya, her walls, gates and palaces (Book I, Canto V)",
        "excerpt": "There, famous in her old renown, / Ayodhya stands, the royal town, / In bygone ages built and planned / By sainted Manu's princely hand. / Imperial seat! her walls extend / Twelve measured leagues from end to end, / And three in width from side to side, / With square and palace beautified. / Her gates at even distance stand; / Her ample roads are wisely planned. [...] On level ground in even row / Her houses rise in goodly show: / Terrace and palace, arch and gate / The queenly city decorate. / High are her ramparts, strong and vast, / By ways at even distance passed, / With circling moat, both deep and wide, / And store of weapons fortified.",
        "source": "The Ramayan of Valmiki, trans. Ralph T. H. Griffith, Book I, Canto V 'Ayodhya' (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/24869/pg24869.txt"
      },
      {
        "category": "literary",
        "title": "Coleridge, 'Kubla Khan': the stately pleasure-dome girdled with walls and towers",
        "excerpt": "In Xanadu did Kubla Khan / A stately pleasure-dome decree: / Where Alph, the sacred river, ran / Through caverns measureless to man / Down to a sunless sea. / So twice five miles of fertile ground / With walls and towers were girdled round; / And here were gardens bright with sinuous rills / Where blossom'd many an incense-bearing tree; / And here were forests ancient as the hills, / And folding sunny spots of greenery.",
        "source": "Samuel Taylor Coleridge, 'Kubla Khan' (1816 first edition), Wikisource",
        "href": "https://en.wikisource.org/wiki/Christabel;_Kubla_Khan;_The_Pains_of_Sleep_(1816)/Kubla_Khan"
      },
      {
        "category": "artistic",
        "title": "Maharaja Bakhat Singh at the Jharokha Window of the Bakhat Singh Mahal",
        "excerpt": "A Marwar court miniature framing the ruler within an ornate latticed jharokha of his palace, the projecting screened window turned into a stage for princely display. Latticework, arched openings and a warm palette of ochre and rose fuse regional craft with sovereign identity, the palace facade itself becoming the emblem of the ruler and his city. It is precisely this Rajput visual language of the jharokha and jali that the new Jodhpur terminal reaches back to.",
        "source": "Attributed to 'Artist 2', Marwar (Nagaur), 1737; Mehrangarh Museum Trust, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Above-Maharaja-Bakhat-Singh-at-the-Jharokha-Window-of-the-Bakhat-Singh-Mahal-_59024_2.jpg",
        "image": {
          "src": "/covers/jodhpur-airport-sthapati-royal--art.png",
          "alt": "Rajput miniature painting of Maharaja Bakhat Singh seated at an ornate latticed jharokha window of his palace.",
          "credit": "Attributed to 'Artist 2', Marwar (Nagaur), 1737; Mehrangarh Museum Trust — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Albert Roussel, Padmavati, Op. 18 — opera-ballet of the doomed fortress of Chittor",
        "excerpt": "Roussel's opera-ballet Padmavati (composed 1918, premiered at the Paris Opera in 1923) unfolds entirely within the besieged Rajput fortress-city of Chittor, assailed by Sultan Alauddin of Delhi. Having walked the ruined citadel himself, the composer wove Indian ragas and modes into a French score of processional splendour, making the palace-fortress stand as the very body of the kingdom, until Queen Padmavati mounts the funeral pyre in a final jauhar rather than yield it. Here craft, ceremony and identity are gathered into the walls of a great Rajput stronghold, much as Jodhpur's heritage is invoked in its new gateway.",
        "source": "Albert Roussel, Padmavati, Op.18 (opera-ballet, 1918), IMSLP",
        "href": "https://imslp.org/wiki/Padm%C3%A2vat%C3%AE,_Op.18_(Roussel,_Albert)"
      }
    ],
    "rank": 25
  },
  {
    "slug": "nigeria-fake-presidential-agency-probe",
    "headline": "Nigeria's Tinubu orders probe after a fake presidential agency wins office space and a $950,000 budget line",
    "overview": "President Bola Tinubu ordered an anti-corruption investigation on July 8, 2026 after a fictitious government body — the Presidential Foreign Intervention Promotion Council — was found to have operated inside Nigeria's Federal Secretariat, opened central-bank accounts and secured a 1.3 billion naira (about $950,000) line in the 2026 budget. A man who styled himself the council's director-general and claimed a presidential appointment has been charged with forgery and impersonation. Tinubu gave investigators 30 days to report.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c621xrrp6jeo"
      },
      {
        "name": "Premium Times",
        "href": "https://www.premiumtimesng.com/news/top-news/893643-updated-fake-agency-scandal-tinubu-orders-icpc-to-investigate-gives-30-day-deadline.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/nigeria-fake-presidential-agency-probe.png",
      "alt": "Aso Rock, the great granite monolith rising behind the seat of Nigeria's government in Abuja",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The false Smerdis: a Magus impersonates the dead prince and seizes the Persian throne (Herodotus, Histories, 3.61)",
        "excerpt": "he had a brother, his partner, as I said, in rebellion; this brother was very like in appearance to Cyrus' son, Smerdis, brother of Cambyses and by him put to death; nor was he like him in appearance only, but he bore the same name also, Smerdis. Patizeithes the Magian persuaded this man that he, Patizeithes, would manage the whole business for him; he brought his brother and set him on the royal throne; which done, he sent heralds to all parts, one of whom was to go to Egypt and proclaim to the army that henceforth they must obey not Cambyses but Smerdis the son of Cyrus.",
        "source": "Herodotus, The Persian Wars (Godley translation), Book III",
        "href": "https://en.wikisource.org/wiki/Herodotus_The_Persian_Wars_(Godley)/Book_III"
      },
      {
        "category": "historical",
        "title": "Perkin Warbeck personates the murdered Duke of York (Francis Bacon, History of the Reign of King Henry VII, 1622)",
        "excerpt": "was such a mercurial as the like hath seldom been known; and could make his own part, if at any time he chanced to be out. Wherefore this being one of the strangest examples of a personation, that ever was in elder or later times; it deserveth to be discovered, and related at the full.",
        "source": "Francis Bacon, The History of the Reign of King Henry VII (Internet Archive full text)",
        "href": "https://archive.org/details/baconshistoryofr00bacouoft"
      },
      {
        "category": "literary",
        "title": "A nobody mistaken for a high official — Gogol, The Inspector-General",
        "excerpt": "I have called you together, gentlemen, to tell you an unpleasant piece of news. An Inspector-General is coming.",
        "source": "Nikolai Gogol, The Inspector-General (trans. Thomas Seltzer), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3735/3735-h/3735-h.htm"
      },
      {
        "category": "literary",
        "title": "The confidence trickster and the reward for a mysterious impostor — Melville, The Confidence-Man",
        "excerpt": "placard nigh the captain's office, offering a reward for the capture of a mysterious impostor, supposed to have recently arrived from the East; quite an original genius in his vocation, as would appear, though wherein his originality consisted was not clearly given; but what purported to be a careful description of his person followed.",
        "source": "Herman Melville, The Confidence-Man: His Masquerade, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/21816/21816-h/21816-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Fortune-Teller — Georges de La Tour (c. 1630)",
        "excerpt": "La Tour paints deception as sleight of hand: while a gravely dignified old fortune-teller holds a young dandy's gaze and takes his coin, her demure accomplices calmly cut his purse and slip a medal from his chain. Every face is a mask of innocence, and the swindle unfolds in plain sight, cloaked in the trappings of ceremony and trust — the con thriving precisely because it looks respectable.",
        "source": "Georges de La Tour, The Fortune-Teller (c. 1630), oil on canvas, The Metropolitan Museum of Art, New York",
        "href": "https://commons.wikimedia.org/wiki/File:Georges_de_La_Tour_016.jpg",
        "image": {
          "src": "/covers/nigeria-fake-presidential-agency-probe--art.png",
          "alt": "An elegantly dressed young man has his fortune told by an old woman while her three younger accomplices quietly rob him, cutting his purse and stealing a medal.",
          "credit": "Georges de La Tour, The Fortune-Teller (c. 1630), The Metropolitan Museum of Art — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Boris Godunov — Modest Mussorgsky (opera, 1869/1874)",
        "excerpt": "Mussorgsky's historical opera turns on the Pretender: Grigory Otrepyev, a runaway monk who reinvents himself as the murdered Tsarevich Dmitri and marches on Moscow behind a fabricated claim to the throne. The music sets a hollow identity against real power, the impostor's manufactured legitimacy shadowing the guilt-ridden true Tsar until the counterfeit prince becomes a force that history itself is forced to obey.",
        "source": "Modest Mussorgsky, Boris Godunov (scores at IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      }
    ],
    "rank": 26
  },
  {
    "slug": "khamenei-funeral-procession-iraq",
    "headline": "Iran holds mass funeral processions for slain Supreme Leader Ali Khamenei as his cortege reaches Iraq's holy cities",
    "overview": "Hundreds of thousands of mourners filled the Iraqi holy cities of Najaf and Karbala on July 8, 2026 as the funeral procession for Iran's Supreme Leader Ayatollah Ali Khamenei crossed the border during a six-day state farewell. Khamenei, who led the Islamic Republic for nearly four decades, was killed on February 28 in a joint US-Israeli air strike on the first day of the war, and his body is being carried through Shia shrine cities before burial in Mashhad. The processions, blending grief with defiance, underscored the deep religious and geopolitical stakes of Iran's leadership succession.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPamx0X0tpdE9oTTYtdTNBWm44Wms5WURGTXlYX1lTcHBXUzQ5SkVGYVJzdkVlZkh4SVVjVkRjVlp1bEh2MVFWUEV5SzRkT01YYWotdDN4UklneEFUVlV4X1VvQ2pzMzI2N2R4b0Z2dTlEektkdmx2VzZXaGJNZy14TXJwd3NnX29RM1UxV25nSUdDVG1YanBHYUVfdjBjNU5vM1dsbGVSWGpsdi1KMzdvY3laMkt5ejQ?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/07/08/iraq-iran-khamenei-najaf-funeral/cc947064-7a93-11f1-b194-f872dd4ec5aa_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/khamenei-funeral-procession-iraq.png",
      "alt": "The golden dome and minarets of the Shrine of Imam Ali at Najaf, one of the holiest sites in Shia Islam, rising against a pale sky",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The funeral of Julius Caesar in the Roman Forum",
        "excerpt": "At the funeral... the magistrates and others who had formerly filled the highest offices, carried the bier from the Rostra into the Forum. ... a multitude of foreigners, expressing their sorrow according to the fashion of their respective countries; but especially the Jews, who for several nights together frequented the spot where the body was burnt.",
        "source": "Suetonius, The Lives of the Caesars, Divus Julius 84 (English translation, Perseus Digital Library, Tufts University)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0132%3Alife%3Djul.%3Achapter%3D84"
      },
      {
        "category": "historical",
        "title": "The martyrdom of Husayn at Kerbela, fountainhead of Shia mourning",
        "excerpt": "In a distant age and climate, the tragic scene of the death of Hosein will awaken the sympathy of the coldest reader.",
        "source": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire, Chapter L (Christian Classics Ethereal Library)",
        "href": "https://www.ccel.org/g/gibbon/decline/volume2/chap50.htm"
      },
      {
        "category": "literary",
        "title": "David's lament over Saul and Jonathan: 'How are the mighty fallen'",
        "excerpt": "Tell it not in Gath, publish it not in the streets of Askelon; lest the daughters of the Philistines rejoice... I am distressed for thee, my brother Jonathan: very pleasant hast thou been unto me: thy love to me was wonderful, passing the love of women. How are the mighty fallen, and the weapons of war perished!",
        "source": "2 Samuel 1:17-27, King James Bible (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/2_Samuel"
      },
      {
        "category": "literary",
        "title": "The funeral of Hector at the close of the Iliad",
        "excerpt": "But soon as early Dawn appeared, the rosy-fingered, then gathered the folk about the pyre of glorious Hector. ... Then with speed heaped they the mound, and round about were watchers set on every side, lest the well-greaved Achaeans should set upon them before the time.",
        "source": "Homer, Iliad, Book 24 (A. T. Murray translation, Perseus Digital Library, Tufts University)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D24"
      },
      {
        "category": "artistic",
        "title": "Giotto's Lamentation (The Mourning of Christ)",
        "excerpt": "Giotto's fresco compresses collective grief into a single frozen wail: mourners bend low over the dead body, a woman cradles the head, others throw back their arms in anguish, and even the angels convulse in the sky. The barren diagonal ridge and downcast eyes drive every line of the composition toward the fallen figure, making public lamentation the emotional center of the scene.",
        "source": "Giotto di Bondone, fresco in the Scrovegni (Arena) Chapel, Padua, c. 1305 (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Giotto_-_Scrovegni_-_-36-_-_Lamentation_(The_Mourning_of_Christ)_adj.jpg",
        "image": {
          "src": "/covers/khamenei-funeral-procession-iraq--art.png",
          "alt": "Fresco of grieving figures clustered around a dead body laid low, with angels writhing in sorrow overhead against a blue sky",
          "credit": "Giotto di Bondone, Lamentation (The Mourning of Christ) (c. 1305), Scrovegni Chapel, Padua — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Chopin's Funeral March (Marche funebre)",
        "excerpt": "Chopin's slow, tolling B-flat minor march has become the world's universal sound of a state cortege, its heavy dotted tread evoking a coffin borne step by step through massed crowds. A tender central trio opens like a moment of consolation before the funereal tread inexorably returns, mirroring how public grief for a fallen leader oscillates between lament and grim procession.",
        "source": "Frederic Chopin, Piano Sonata No. 2 in B-flat minor, Op. 35, third movement (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      }
    ],
    "lead": true,
    "rank": 27
  },
  {
    "slug": "trump-spain-trade-cutoff",
    "headline": "Trump says he has ordered a cutoff of all US trade with Spain and declares the Iran war accord 'over'",
    "overview": "At the NATO summit in Ankara on July 8, 2026, US President Donald Trump said he had instructed his treasury secretary to halt all American trade with Spain, calling the fellow NATO member a 'terrible partner' for refusing the alliance's 5%-of-GDP defence-spending target. In the same appearance he declared that the interim accord meant to end the war with Iran was 'over,' a day after fresh US strikes. Spanish bonds and stocks fell on the threat, and European allies scrambled to respond.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxPUHpycW05eTVleW81UVFsUkdsdzhiaDJuSTl1dDhFNy10bHpyYkVoeWFpWmtvSnFEa2MyRW4wdjExcGpMUVNRNlVveERCZXpPM0lmWkpnNVFBUzhENGdHQmVSRGw3WDN6bXQ4YkdaZGRveWVkWjlkdDFWU0lFSVF3UGFxMzREQkEyYkR0Yy1PbEl2Ul80WGJUMHp6VEE?oc=5"
      },
      {
        "name": "The Irish Times",
        "href": "https://www.irishtimes.com/world/europe/2026/07/08/trump-tells-nato-summit-that-he-has-ordered-all-trade-with-spain-to-be-cut-off/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/trump-spain-trade-cutoff.png",
      "alt": "A grand empty summit hall at dusk with a long polished table, rows of vacant chairs and two bare flagpoles standing at opposite ends separated by a wide gulf of empty floor",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Megarian Decree (c. 432 BC)",
        "excerpt": "the war should not be made in case they would abrogate the act concerning the Megareans, by which act they were forbidden both the fairs of Attica and all ports within the Athenian dominion.",
        "source": "Thucydides, History of the Peloponnesian War, Book 1.139 (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0247:book=1:chapter=139"
      },
      {
        "category": "historical",
        "title": "Napoleon's Berlin Decree, the Continental System (1806)",
        "excerpt": "The British Isles are declared to be in a state of blockade. All commerce and all correspondence with the British Isles are forbidden. Consequently letters or packages directed to England or to an Englishman or written in the English language shall not pass through the mails and shall be seized.",
        "source": "Berlin Decree of Napoleon I (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Berlin_Decree"
      },
      {
        "category": "literary",
        "title": "The Acharnians",
        "excerpt": "Then Pericles, aflame with ire on his Olympian height, let loose the lightning, caused the thunder to roll, upset Greece and passed an edict, which ran like the song, 'That the Megarians be banished both from our land and from our markets and from the sea and from the continent.'",
        "source": "Aristophanes, The Acharnians (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/3012/3012-h/3012-h.htm"
      },
      {
        "category": "literary",
        "title": "Coriolanus, Act III, Scene 3",
        "excerpt": "You common cry of curs! whose breath I hate / As reek o' the rotten fens, whose loves I prize / As the dead carcasses of unburied men / That do corrupt my air, I banish you; / And here remain with your uncertainty! ... Despising, / For you, the city, thus I turn my back: / There is a world elsewhere.",
        "source": "William Shakespeare, Coriolanus (MIT Complete Works of Shakespeare)",
        "href": "http://shakespeare.mit.edu/coriolanus/coriolanus.3.3.html"
      },
      {
        "category": "artistic",
        "title": "'Ograbme' (The Embargo) — a cartoon on Jefferson's Embargo Act",
        "excerpt": "A snapping turtle labeled 'Ograbme' — 'Embargo' spelled backwards — clamps its jaws on a smuggling merchant hauling a barrel of goods toward a British ship, satirizing how Jefferson's 1807 trade embargo bit the very Americans it was meant to shield.",
        "source": "Political cartoon, 1807 (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Ograbme.jpg",
        "image": {
          "src": "/covers/trump-spain-trade-cutoff--art.png",
          "alt": "A snapping turtle named 'Ograbme' seizing a merchant by the seat of his trousers as he tries to smuggle a barrel of goods to a waiting ship",
          "credit": "Attributed to Alexander Anderson, 'Ograbme' (The Embargo) (1807) — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Nabucco (Chorus of the Hebrew Slaves, 'Va, pensiero')",
        "excerpt": "Verdi's 1842 opera dramatizes a great power crushing a smaller people: the Hebrews, conquered and exiled by the Babylonian king Nebuchadnezzar, sing 'Va, pensiero, sull'ali dorate' — 'Fly, thought, on wings of gold' — mourning the homeland and ties torn away from them by an overwhelming ruler.",
        "source": "Giuseppe Verdi, Nabucco (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 28
  },
  {
    "slug": "apple-eu-dma-court-loss",
    "headline": "Apple loses its EU court challenge to Digital Markets Act 'gatekeeper' rules",
    "overview": "The European Union's General Court in Luxembourg on July 8, 2026 dismissed Apple's challenges to its designation as a 'gatekeeper' under the Digital Markets Act, upholding rules that force it to open the iPhone to rival app stores and payment options. Judges found the App Store across Apple's devices serves a single purpose of connecting developers with users. Apple can appeal on points of law to the bloc's top court, but the ruling strengthens EU regulators policing Big Tech.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQazF0N18xbUhlbjE2c054Q20xRDJ1VEZUR3pyMHVqY09oMXNvZGJiNVNnMTJwNkx3ekplTU8tczR1MU9PM3pMTWNnN2VYeDVYc3dsYjJfalBiaGNWMVNxV0VQX3paeFlxYUdKeU1xSmtGNnVPcnVfcHFZUXdqc2thLThqbWluM3pHSFBsMndfNk9mUHpHOWNrQ2JzczhRajVOdElpSjBDaGE0U3VmNnc?oc=5"
      },
      {
        "name": "Investing.com",
        "href": "https://www.investing.com/news/stock-market-news/apple-loses-eu-court-fight-over-app-store-and-ios-gatekeeper-rules-4780884"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/apple-eu-dma-court-loss.png",
      "alt": "The grand hearing chamber of the Court of Justice of the European Union in Luxembourg, curved benches beneath a ceiling of gilded discs",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Magna Carta, Clause 40 (1215)",
        "excerpt": "To no one will we sell, to no one deny or delay right or justice.",
        "source": "Magna Carta, 1215 (British Library translation), The National Archives (UK)",
        "href": "https://www.nationalarchives.gov.uk/education/resources/magna-carta/british-library-magna-carta-1215-runnymede/"
      },
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States (1911)",
        "excerpt": "Every contract, combination in the form of trust or otherwise, or conspiracy, in restraint of trade or commerce, among the several States, or with foreign nations, is hereby declared to be illegal.",
        "source": "Opinion of the Court (Chief Justice White), 221 U.S. 1, Wikisource",
        "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States/Opinion_of_the_Court"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "My name is Ozymandias, king of kings: / Look on my works, ye Mighty, and despair! / Nothing beside remains.",
        "source": "Percy Bysshe Shelley (1818), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "literary",
        "title": "The Mask of Anarchy",
        "excerpt": "Rise like Lions after slumber / In unvanquishable number, / Shake your chains to earth like dew / Which in sleep had fallen on you—",
        "source": "Percy Bysshe Shelley (1819), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Mask_of_Anarchy"
      },
      {
        "category": "artistic",
        "title": "Next! (the Standard Oil octopus)",
        "excerpt": "A bloated Standard Oil storage tank sprouts an octopus's tentacles that throttle the copper, steel, and shipping industries, then reach past the statehouse to squeeze the U.S. Capitol itself. One tentacle gropes toward the White House, a warning that a private colossus had closed its grip on the machinery of government. The image made monopoly visible as a single grasping body that only the law could pry loose.",
        "source": "Udo J. Keppler, chromolithograph in Puck, September 7, 1904; Library of Congress via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Standard_oil_octopus_loc_color.jpg",
        "image": {
          "src": "/covers/apple-eu-dma-court-loss--art.png",
          "alt": "Political cartoon of a Standard Oil tank drawn as an octopus whose tentacles wrap around industries, a statehouse, and the U.S. Capitol.",
          "credit": "Udo J. Keppler, 'Next!', Puck, Sept. 7, 1904. Library of Congress, Prints & Photographs Division, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Prisoners' Chorus ('O welche Lust'), Fidelio, Op. 72",
        "excerpt": "In Beethoven's only opera, political prisoners are let out of their dungeon cells and stagger blinking into the open air, their voices swelling on the words 'O what joy, in open air freely to breathe.' The tyrant Pizarro's private prison is thrown open and his abuses exposed to daylight and to justice. It is music of gates unbarred, a closed and hidden power forced at last into the light.",
        "source": "Ludwig van Beethoven (1814), full score on IMSLP",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 29
  },
  {
    "slug": "russia-jams-starlink-ukraine",
    "headline": "Russia deploys powerful jammers against Ukraine's Starlink-guided drones, commanders tell Reuters",
    "overview": "Russian forces have begun fielding a jamming system that can destabilise the SpaceX Starlink links Ukraine uses to fly its long-range 'mid-strike' drones, Ukrainian drone commanders told Reuters in a report published July 8, 2026. The system can disrupt Starlink over an area of roughly 20 square kilometres, and about ten have been detected so far. Ukraine says it has struck several of the installations, restoring its drone links once they are destroyed.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxPb3pOc2pzeU1KV003U2VBOEl2OVlrbnpqenBaM0hNS1MwOFZvbWlELUdNVDA0cnFtSzBmMFl3Z3JHU1d2OXQ3eV9qZjUtR2hkLU5oVVFweTRMSlpCMDZKbnlnM3NTamFLWFRuYkdteDRYblI3Z2J4Ti1HYXNxMF9qNEZSeUdsSXduemZiNDZSckRtQ3IzN2JJemRxUHl6RVg3UVRGZ1I3TGRFMkwzcmg2NjlGQWJaVDBqV0szWFFVTEZLaWExZGc?oc=5"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2650066/world"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/russia-jams-starlink-ukraine.png",
      "alt": "A lone satellite dish on a slender tripod standing in a bleak muddy field at dusk under a heavy grey sky, a faint shimmer of interference in the cold air",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plataeans confound the enemy's fire-signals (Peloponnesian War, 3.22, 428 BC)",
        "excerpt": "Fire-signals of an attack were also raised towards Thebes; but the Plataeans in the town at once displayed a number of others, prepared beforehand for this very purpose, in order to render the enemy's signals unintelligible, and to prevent his friends getting a true idea of what was passing and coming to his aid before their comrades who had gone out should have made good their escape and be in safety.",
        "source": "Thucydides, History of the Peloponnesian War, Book III, ch. 22 (Crawley translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_3"
      },
      {
        "category": "historical",
        "title": "The Siege of Paris: severed telegraph lines and intercepted pigeon-post (1870-71)",
        "excerpt": "But you kill our pigeons, you intercept our letters, you shoot at our balloons with your absurd fusils de rempart, and you burst out into a heavy German grin when you get hold of one of our bags, which are carrying to those we love our vows, our hopes, our remembrance, our regrets, and our hearts.",
        "source": "Henry Du Pre Labouchere, Diary of the Besieged Resident in Paris (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/19263"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Agamemnon: the beacon-fires relaying the fall of Troy",
        "excerpt": "Hephaestus, from Ida speeding forth his brilliant blaze. Beacon passed beacon on to us by courier-flame: Ida, to the Hermaean crag in Lemnos; to the mighty blaze upon the island succeeded, third, the summit of Athos sacred to Zeus",
        "source": "Aeschylus, Agamemnon, lines 281 onward, Clytemnestra's speech (Herbert Weir Smyth translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0004%3Acard%3D281"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Romeo and Juliet: the letter that never reached Romeo (Act 5, Scene 2)",
        "excerpt": "The letter was not nice but full of charge, Of dear import, and the neglecting it May do much danger.",
        "source": "William Shakespeare, Romeo and Juliet, Act V, Scene 2 (MIT Complete Works of Shakespeare)",
        "href": "https://shakespeare.mit.edu/romeo_juliet/romeo_juliet.5.2.html"
      },
      {
        "category": "artistic",
        "title": "Clytemnestra Watching for the Beacon-Fires (c. 1874)",
        "excerpt": "Leighton depicts Clytemnestra standing alone on the battlements of Argos at night, cloaked and still, scanning the dark horizon for the beacon-fire that will signal Troy's fall and Agamemnon's return. The whole composition turns on a single awaited point of light, the fragile thread on which news of a distant war depends.",
        "source": "Frederic Leighton (1830-1896), oil on canvas, Leighton House, London — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Frederic_Leighton_(1830-1896)_-_Clytemnestra_from_the_Battlements_of_Argos_Watches_for_the_Beacon_Fires_Which_Are_to_Announce_the_Return_of_Agamemnon_-_LH0372_-_Leighton_House.jpg",
        "image": {
          "src": "/covers/russia-jams-starlink-ukraine--art.png",
          "alt": "Painting of Clytemnestra, robed, standing on the battlements of Argos at night, watching the horizon for a distant beacon-fire.",
          "credit": "Frederic Leighton (1830-1896), Leighton House, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Die Post, from Winterreise, D. 911, no. 13 (1827)",
        "excerpt": "In Schubert's song the lone wanderer hears the posthorn sound and his heart leaps — then aches, for 'the post brings no letter for you.' The awaited message that never comes becomes an image of the severed line between a person and those far away, the silence where a signal should be.",
        "source": "Franz Schubert, Winterreise, D. 911; song text by Wilhelm Muller — IMSLP",
        "href": "https://imslp.org/wiki/Winterreise,_D.911_(Schubert,_Franz)"
      }
    ],
    "rank": 30
  },
  {
    "slug": "ispace-starship-moon-rideshare",
    "headline": "Japan's ispace buys Starship cargo capacity for a $50 million lunar ride-share to the Moon",
    "overview": "Japanese lunar company ispace announced on July 8, 2026 that it has purchased 500 kilograms of capacity on a SpaceX Starship for $50 million to land cargo on the Moon as soon as 2030, launching a lower-cost 'lunar access integrator' business. The company will build a surface vehicle to host payloads from clients sharing the ride. ispace's two previous landing attempts, on Falcon 9 rockets, ended in crashes in 2023 and 2025.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNemhKYUp4ODVXOUhMWHlHZC0wRHFDU3pobFVEcFhzaUw1WVVMa2ZCLVdTLTg4RFNqczgyQ1QxQkRORndOUVFhbm5qWGRVTHFmOW56WFBWQzlpY1dMTks1dGVIand5V29lakgyVkZIVkpuX3g2S1lJYlAtd2RhTDhGUmRBSlAtYnhTSkkwdEsybjV0MF9YYXFRRzJjTHh0WkhYcVk0ZHhR?oc=5"
      },
      {
        "name": "The Star",
        "href": "https://www.thestar.com.my/tech/tech-news/2026/07/08/with-spacex-starship-japan039s-ispace-provides-ride-share-to-the-moon"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/ispace-starship-moon-rideshare.png",
      "alt": "A SpaceX Starship rocket climbing on a brilliant column of flame during a test flight, seen against a clear sky",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Black Ball Line: the first scheduled transatlantic packet service",
        "excerpt": "Founded by New York merchants in 1817, the Black Ball Line pioneered scheduled ocean crossings, undertaking to leave port on a fixed day of the month irrespective of cargo or passengers. Where sailings had once waited until a hold was full, shippers could now buy reliable space on a great ship bound for a distant shore. Mail, newspapers, freight, and travelers shared a single scheduled passage, making a risky ocean crossing routine and commercial.",
        "source": "Black Ball Line (trans-Atlantic packet), Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Black_Ball_Line_(trans-Atlantic_packet)"
      },
      {
        "category": "historical",
        "title": "Apollo 11: humanity's first crewed voyage to the lunar surface",
        "excerpt": "That's one small step for [a] man, one giant leap for mankind.",
        "source": "NASA, Apollo 11 mission page",
        "href": "https://www.nasa.gov/mission/apollo-11/"
      },
      {
        "category": "literary",
        "title": "A True History (the ship carried to the Moon by a whirlwind)",
        "excerpt": "Upon a sudden a whirlwind caught us, which turned our ship round about, and lifted us up some three thousand furlongs into the air, and suffered us not to settle again into the sea, but we hung above ground.",
        "source": "Lucian of Samosata, Lucian's True History (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/45858/45858-h/45858-h.htm"
      },
      {
        "category": "literary",
        "title": "From the Earth to the Moon",
        "excerpt": "It is perhaps reserved for us to become the Columbuses of this unknown world. Only enter into my plans, and second me with all your power, and I will lead you to its conquest.",
        "source": "Jules Verne, From the Earth to the Moon (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/83/83-h/83-h.htm"
      },
      {
        "category": "artistic",
        "title": "Le Voyage dans la Lune (A Trip to the Moon)",
        "excerpt": "In Georges Melies's 1902 film, a shell fired from a giant cannon carries a party of astronomers on a shared voyage to the Moon, striking the lunar face squarely in the eye. The image fuses commercial spectacle with the ancient dream of reaching another world, and remains one of the most iconic frames in the history of cinema.",
        "source": "Georges Melies, film still (1902), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Le_Voyage_dans_la_lune.jpg",
        "image": {
          "src": "/covers/ispace-starship-moon-rideshare--art.png",
          "alt": "The Moon depicted as a face with a space capsule lodged in its eye, from Georges Melies's 1902 film Le Voyage dans la Lune",
          "credit": "Georges Melies, Le Voyage dans la Lune (1902), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Il mondo della luna (The World on the Moon)",
        "excerpt": "Haydn's 1777 comic opera, premiered at Eszterhaza, turns on a gullible old man persuaded by a fake 'astronomer' that he has been transported to the Moon, a garden dressed up as a lunar world. The Moon here is at once a longed-for frontier and a stage set, a fantasy sold to a paying dreamer. It is a witty reminder that lunar ambition has always mixed genuine wonder with the business of selling passage there.",
        "source": "Joseph Haydn, opera buffa (1777), libretto by Carlo Goldoni",
        "href": "https://en.wikipedia.org/wiki/Il_mondo_della_luna"
      }
    ],
    "rank": 31
  },
  {
    "slug": "india-rbi-crypto-ban",
    "headline": "India's central bank backs a ban on private cryptocurrencies as the tax office warns of evasion",
    "overview": "Internal documents show the Reserve Bank of India has reaffirmed its support for banning private cryptocurrencies, warning they endanger monetary and financial stability, Reuters reported on July 8, 2026. The income-tax department separately cautioned that crypto trading carries widespread tax-evasion risks. New Delhi's government has stayed publicly noncommittal, leaving the country's digital-asset policy in limbo.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxOMExaYnBnZDQxVm9fVEpSMjNqVFhmRkhLVnRBd2ZrSk5VNHZISUQ3ekhlZHVFOEtqcFktcndPeFRxQXdLWVNKWllXQWIzdDlkMHdObGlWWDB0TVh5VEN5NHZxWTBBa0kxZ2ZyNUt1OXZPOTFMZExvMFdDTkJoS0dvS0ZNN3c0RUhObnJMZUVDUGlRSTVrOTRtRlRkX1REaXZseVptY2JBRWc0SVVnX255a05VQWxWOFNhb3ZubHY5eFpUN2pqckt3?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=RBI+crypto+ban+tax+evasion&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/india-rbi-crypto-ban.png",
      "alt": "The stone facade of a Reserve Bank of India building, its tall columns rising above the street",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Bank Charter Act 1844 (Peel's Act), Section 10",
        "excerpt": "No person other than a banker who on the sixth day of May one thousand eight hundred and forty-four was lawfully issuing his own bank notes shall make or issue bank notes in any part of the United Kingdom.",
        "source": "UK Public General Acts, 7 & 8 Vict. c. 32 — legislation.gov.uk",
        "href": "https://www.legislation.gov.uk/ukpga/Vict/7-8/32/section/10"
      },
      {
        "category": "historical",
        "title": "Executive Order 6102: Forbidding the Hoarding of Gold Coin, Gold Bullion and Gold Certificates (1933)",
        "excerpt": "By virtue of the authority vested in me by Section 5 (b) of the Act of October 6, 1917, as amended by Section 2 of the Act of March 9, 1933 ... I ... do hereby prohibit the hoarding of gold coin, gold bullion, and gold certificates within the continental United States by individuals, partnerships, associations and corporations.",
        "source": "Franklin D. Roosevelt, April 5, 1933 — The American Presidency Project",
        "href": "https://www.presidency.ucsb.edu/documents/executive-order-6102-forbidding-the-hoarding-gold-coin-gold-bullion-and-gold-certificates"
      },
      {
        "category": "literary",
        "title": "Timon of Athens, Act IV, Scene 3 (Timon's speech on gold)",
        "excerpt": "Gold? yellow, glittering, precious gold? No, gods, / I am no idle votarist: roots, you clear heavens! / Thus much of this will make black white, foul fair, / Wrong right, base noble, old young, coward valiant.",
        "source": "William Shakespeare — MIT Complete Works of Shakespeare",
        "href": "https://shakespeare.mit.edu/timon/full.html"
      },
      {
        "category": "literary",
        "title": "Inferno, Canto XXX (Master Adam, counterfeiter of the florin)",
        "excerpt": "There is Romena, where I counterfeited / The currency imprinted with the Baptist, / For which I left my body burned above. ... They did induce me into coining florins, / Which had three carats of impurity.",
        "source": "Dante Alighieri, trans. H. W. Longfellow (1867) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_30"
      },
      {
        "category": "artistic",
        "title": "The Moneylender and His Wife (1514)",
        "excerpt": "A moneylender weighs gold coins and pearls on a delicate balance while his wife, a devotional book open in her hands, lets her eyes drift from the Virgin on the page to the glinting metal on the table. A tiny convex mirror in the foreground reflects a window and a reader, and the scales become a moral emblem: the pull of coin quietly displacing the weighing of the soul.",
        "source": "Quentin Matsys (Quinten Metsys), oil on panel, Louvre, Paris — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/india-rbi-crypto-ban--art.png",
          "alt": "A 16th-century moneylender weighing gold coins on a balance scale as his wife beside him turns from her prayer book to watch the money.",
          "credit": "Quentin Matsys, 'The Moneylender and His Wife' (1514), Louvre, Paris — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Song of the Golden Calf (Le veau d'or), from the opera Faust",
        "excerpt": "Gounod's 1859 opera gives Mephistopheles a swaggering drinking-song in praise of the Golden Calf 'still standing,' before whom the whole world crowds to worship the power of money while Satan himself leads the dance. It stages, three centuries after the Bible, the same warning that the idol of gold turns a society into revellers around a pedestal.",
        "source": "Charles Gounod, libretto by Barbier & Carre — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/45806/45806-h/45806-h.htm"
      }
    ],
    "rank": 32
  },
  {
    "slug": "openai-flagship-gpt-launch",
    "headline": "OpenAI prepares to launch its most capable GPT model after a delayed rollout",
    "overview": "OpenAI is set to release its most capable GPT model to date after pushing back the rollout, Reuters reported on July 8, 2026. The company says the system makes significant gains in reasoning and coding as competition sharpens with rivals in the United States and China. The launch arrives amid intense scrutiny of the cost, safety and market power of frontier AI.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNeGRZM3dfemdtVmJpUmlMMzB2VW5yNXJUZ0tEM1BTeVlDOWt4cGRWbFk0d0VZY2h0a082WFB0NGRoZmFHZV8zZlVkTVpnakdIUFdTSkQxMlg2bktUWGtFa1FwQkdGVFZfZnQ2QzJXTnVxQmdqQXpxUkJKTXJPMXVFbE1oZklob2NMZUVSa05nMXlwX096aElmMlh2UWUweXNNeGFqUDJORE4?oc=5"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=OpenAI+most+capable+GPT+model+launch&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/openai-flagship-gpt-launch.png",
      "alt": "A single glowing filament of warm light suspended in a dark void, curling like a spark about to leap between two barely separated points",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The first printed Bible seen at Frankfurt (Gutenberg's press)",
        "excerpt": "I have not seen complete Bibles, but several quires belonging to different books [of the Bible], exceedingly clean and correct in their script, and without error, which Your Grace could read effortlessly, even without glasses.",
        "source": "Enea Silvio Piccolomini (later Pope Pius II), letter to Cardinal Juan de Carvajal, 12 March 1455",
        "href": "https://www.lrb.co.uk/the-paper/v47/n21/adam-smyth/slice-it-up"
      },
      {
        "category": "historical",
        "title": "Ada Lovelace's Notes on Babbage's Analytical Engine (Note G, 1843)",
        "excerpt": "The Analytical Engine has no pretensions whatever to originate any thing. It can do whatever we know how to order it to perform. It can follow analysis; but it has no power of anticipating any analytical relations or truths.",
        "source": "Ada Lovelace, Note G to 'Sketch of the Analytical Engine invented by Charles Babbage, Esq.' (1843)",
        "href": "https://www.cs.yale.edu/homes/tap/Files/ada-lovelace-notes.html"
      },
      {
        "category": "literary",
        "title": "Frankenstein; or, The Modern Prometheus",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet... I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Shelley, Frankenstein, Chapter 5 (1818); Project Gutenberg",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "literary",
        "title": "Pygmalion and the Ivory Statue",
        "excerpt": "At this the waken'd image op'd her eyes, / And view'd at once the light, and lover with surprize.",
        "source": "Ovid, Metamorphoses, Book X (Garth/Dryden translation); Internet Classics Archive",
        "href": "https://classics.mit.edu/Ovid/metam.10.tenth.html"
      },
      {
        "category": "artistic",
        "title": "The Creation of Adam",
        "excerpt": "Two arms stretch across a void, the Creator's outstretched finger charged with life and reaching toward the languid, newly formed Adam. The narrow gap between their fingertips holds all the promise and suspense of a mind about to be sparked into being. It is Western art's defining image of a maker breathing his own power into a creation.",
        "source": "Michelangelo, fresco on the Sistine Chapel ceiling (c. 1508–1512), Vatican; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg",
        "image": {
          "src": "/covers/openai-flagship-gpt-launch--art.png",
          "alt": "God, borne by angels, reaches out to give life to a reclining Adam, their fingers nearly touching, in Michelangelo's Sistine Chapel fresco.",
          "credit": "Michelangelo (1475–1564), The Creation of Adam, Sistine Chapel ceiling; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Prometheus Brings Fire to Mankind",
        "excerpt": "The titan Prometheus lifts a burning brand to a lifeless human figure, kindling the first spark of thought and power stolen from the gods. Light floods the newly made man, even as the gift carries within it the seed of the punishment to come. Fuger paints knowledge as a flame that both animates its recipient and endangers its giver.",
        "source": "Heinrich Fuger, oil on canvas (1817), Liechtenstein Collections; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg"
      }
    ],
    "rank": 33
  },
  {
    "slug": "congo-ebola-1708-cases",
    "headline": "Congo says confirmed Ebola cases have climbed to 1,708 with 580 deaths in its worst outbreak",
    "overview": "Government data showed the number of confirmed Ebola cases in the Democratic Republic of Congo's outbreak rose to 1,708, including 580 deaths, Reuters reported on July 8, 2026. Caused by the Bundibugyo strain and centred on north-eastern Ituri province, it is the country's 17th and largest recorded Ebola epidemic. The WHO said the true scale is not yet established and could not yet say the outbreak was stabilising.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPQWpfMDhSU2FjdlpTWkpIbjdyYUNzY3ZJaGdxSzhUNEZSQzlzVVVQZEl4VWhzVE02bExKT3V5Y2VoUTZTTXlfVXBZRnF5YTFQNkRIRDIwWHV4d0dKZEpDWmRiRlY5dWM5R1oxLUZ1R0ZIYS1kajJCYmVEQmZCbmk3T2c0RlBZdTBLOEg1bUtLTGFSREZZb2RISkRDbENTTHhEVlUzMzIyeE5oSUF5Y0pSMTIzRVdJTEh0b2h5akh1MA?oc=5"
      },
      {
        "name": "U.S. News & World Report",
        "href": "https://www.usnews.com/news/world/articles/2026-07-08/congo-says-number-of-confirmed-ebola-cases-rises-to-1-708"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/congo-ebola-1708-cases.png",
      "alt": "A row of empty white protective medical suits and face shields hanging on a rail inside a dim field-clinic tent at dawn, a folding cot beside them",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens",
        "excerpt": "The bodies of dying men lay one upon another, and half-dead creatures reeled about the streets and gathered round all the fountains in their longing for water. All the burial rites before in use were entirely upset, and they buried the bodies as best they could.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (trans. Richard Crawley)",
        "href": "http://classics.mit.edu/Thucydides/pelopwar.2.second.html"
      },
      {
        "category": "historical",
        "title": "The Plague of Justinian",
        "excerpt": "During these times there was a pestilence, by which the whole human race came near to being annihilated.",
        "source": "Procopius, History of the Wars, Book II.22 (trans. H. B. Dewing)",
        "href": "https://www.gutenberg.org/files/16764/16764-h/16764-h.htm"
      },
      {
        "category": "literary",
        "title": "The Decameron: Introduction to the First Day",
        "excerpt": "There appeared certain swellings, either on the groin or under the armpits, whereof some waxed of the bigness of a common apple, others like unto an egg.",
        "source": "Giovanni Boccaccio, The Decameron (trans. John Payne)",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm"
      },
      {
        "category": "literary",
        "title": "A Journal of the Plague Year",
        "excerpt": "The shrieks of women and children at the windows and doors of their houses, where their dearest relations were perhaps dying, or just dead, were so frequent to be heard as we passed the streets, that it was enough to pierce the stoutest heart in the world to hear them.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722)",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Triumph of Death",
        "excerpt": "Across a scorched, smoke-blackened landscape an army of skeletons drives the living toward a great coffin-shaped trap; kings, lovers, and peasants alike are herded to the same end while bells toll and the sea fills with wrecks. Bruegel makes pestilence and death indifferent to rank, folding an entire society into a single relentless procession.",
        "source": "Pieter Bruegel the Elder, c. 1562, oil on panel, Museo del Prado, Madrid",
        "href": "https://en.wikipedia.org/wiki/The_Triumph_of_Death",
        "image": {
          "src": "/covers/congo-ebola-1708-cases--art.png",
          "alt": "A panoramic landscape overrun by an army of skeletons who slaughter and herd the living toward death, with fires, gallows, and a barren horizon.",
          "credit": "Pieter Bruegel the Elder, 'The Triumph of Death' (c. 1562), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Plague (Die Pest)",
        "excerpt": "Death, a hooded skeleton, sweeps down a narrow medieval street astride a bat-winged dragon, its wingtip brushing the figures who collapse in its path. Painted in sickly greens and dull browns, the work leaves a single vivid note of red on a woman fallen across another corpse; it was the aged, ailing Bocklin's final, unfinished picture.",
        "source": "Arnold Bocklin, 1898, tempera, Kunstmuseum Basel",
        "href": "https://en.wikipedia.org/wiki/Plague_(painting)"
      }
    ],
    "rank": 34
  },
  {
    "slug": "typhoon-maysak-china-floods",
    "headline": "Typhoon Maysak triggers deadly floods and rare tornadoes across southern China",
    "overview": "Typhoon Maysak dumped torrential rain across parts of southern China, unleashing flash floods and spawning rare tornadoes that killed and injured residents and left villagers stranded, the BBC reported on July 8, 2026. In Guangxi's Renhe village, people described water rising within minutes after days of relentless rain. Rescuers struggled to reach cut-off communities as forecasters warned of more flooding.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c79ygnv9e93o"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Typhoon+Maysak+China+floods+tornadoes&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/typhoon-maysak-china-floods.png",
      "alt": "Muddy brown floodwater surging through a street of low buildings in southern China after Typhoon Maysak",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 1931 China floods",
        "excerpt": "The 1931 China floods, or the 1931 Yangtze–Huai River floods, was a devastating flood that occurred from June to August 1931 in China. With fatality estimates ranging into the millions, it is considered one of the deadliest natural disasters ever recorded, inundating roughly 180,000 square kilometres across central and eastern China.",
        "source": "1931 China floods, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1931_China_floods"
      },
      {
        "category": "historical",
        "title": "St. Elizabeth's flood of 1421",
        "excerpt": "During the night of 18–19 November 1421 a heavy storm near the North Sea coast caused the dikes to break in a number of places and the lower-lying polder land was flooded. Between 2,000 and 10,000 people were killed as villages vanished beneath the water.",
        "source": "St. Elizabeth's flood (1421), Wikipedia",
        "href": "https://en.wikipedia.org/wiki/St._Elizabeth%27s_flood_(1421)"
      },
      {
        "category": "literary",
        "title": "The Flood (Genesis 7)",
        "excerpt": "The same day were all the fountains of the great deep broken up, and the windows of heaven were opened. And the rain was upon the earth forty days and forty nights. And the flood was forty days upon the earth; and the waters increased, and bare up the ark, and it was lift up above the earth.",
        "source": "King James Bible, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "The Lord answers out of the whirlwind (Job 38)",
        "excerpt": "Then the LORD answered Job out of the whirlwind, and said, Who is this that darkeneth counsel by words without knowledge? Gird up now thy loins like a man; for I will demand of thee, and answer thou me.",
        "source": "King James Bible, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Job"
      },
      {
        "category": "artistic",
        "title": "The Great Wave off Kanagawa",
        "excerpt": "A towering, claw-like wave curls over three slender boats, dwarfing the fishermen who cling to their oars as the sea threatens to engulf them. In the distance, tiny and serene, Mount Fuji is nearly lost beneath the churning water — a vision of humanity at the mercy of an overwhelming tempest.",
        "source": "Katsushika Hokusai (c. 1830–1833), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/typhoon-maysak-china-floods--art.png",
          "alt": "A giant cresting wave with foaming claw-like tips looming over small fishing boats, with Mount Fuji small in the background",
          "credit": "Katsushika Hokusai, 'The Great Wave off Kanagawa' (c. 1830–1833), Metropolitan Museum of Art, H. O. Havemeyer Collection. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Snow Storm: Steam-Boat off a Harbour's Mouth",
        "excerpt": "Turner's 1842 painting shows a paddle steamer swallowed by a swirling vortex of snow, spray and sea, its smoke and the waves dissolving into one another. The artist claimed he had himself lashed to a ship's mast for hours to witness the storm, and the canvas renders the raw, disorienting force of nature engulfing a fragile vessel.",
        "source": "J. M. W. Turner (1842), Tate",
        "href": "https://en.wikipedia.org/wiki/Snow_Storm:_Steam-Boat_off_a_Harbour%27s_Mouth"
      }
    ],
    "rank": 35
  },
  {
    "slug": "chipperfield-faro-santander",
    "headline": "David Chipperfield converts Santander's historic seafront bank into the Faro cultural centre",
    "overview": "David Chipperfield Architects has transformed Banco Santander's monumental 1923 headquarters on the Paseo de Pereda seafront into Faro Santander, a public cultural centre and gallery, Dezeen reported on July 8, 2026. The scheme preserves the building's landmark central archway while inserting 3,000 square metres of galleries across five floors, plus an auditorium and a rooftop observation deck. It will show a collection ranging from El Greco and Rubens to Picasso and Miró.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/08/david-chipperfield-architects-faro-santander/"
      },
      {
        "name": "Wallpaper*",
        "href": "https://www.wallpaper.com/architecture/public-buildings/faro-santander-chipperfield-spain"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/chipperfield-faro-santander.png",
      "alt": "Banco Santander's monumental arched stone headquarters on the Paseo de Pereda seafront in Santander, newly converted into the Faro cultural centre",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Louvre: from royal palace to public museum",
        "excerpt": "On 10 August 1793 the former palace of the French kings reopened as the Museum central des Arts, its royal and confiscated collections declared national property and hung for every citizen to see. The public was granted free access three days a week — a revolutionary act that turned a symbol of absolute power into a treasure-house of art belonging to the people.",
        "source": "Wikipedia, 'Louvre'",
        "href": "https://en.wikipedia.org/wiki/Louvre"
      },
      {
        "category": "historical",
        "title": "Tate Modern in the former Bankside Power Station",
        "excerpt": "Herzog & de Meuron's £134 million conversion, completed in 2000, preserved the towering brick shell and cathedral-like Turbine Hall of Giles Gilbert Scott's oil-fired power station while inserting galleries into the industrial monument. A building raised to generate power for the city was reborn as one of the world's most visited museums of modern art.",
        "source": "Wikipedia, 'Tate Modern'",
        "href": "https://en.wikipedia.org/wiki/Tate_Modern"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "'My name is Ozymandias, King of Kings; / Look on my Works, ye Mighty, and despair!' / Nothing beside remains. Round the decay / Of that colossal Wreck, boundless and bare / The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley (1818)",
        "href": "https://en.wikisource.org/wiki/Ozymandias_(Shelley)"
      },
      {
        "category": "literary",
        "title": "Odes, Book III.30 ('Exegi monumentum')",
        "excerpt": "And now 'tis done: more durable than brass / My monument shall be, and raise its head / O'er royal pyramids: it shall not dread / Corroding rain or angry Boreas, / Nor the long lapse of immemorial time.",
        "source": "Horace, trans. John Conington (1872)",
        "href": "https://en.wikisource.org/wiki/The_Odes_and_Carmen_Saeculare_of_Horace/Book_III/Ode_30"
      },
      {
        "category": "artistic",
        "title": "Picture Gallery with Views of Modern Rome",
        "excerpt": "Panini crowds a vast imaginary hall from floor to ceiling with framed views of Rome, turning architecture itself into a treasure-house of pictures. Connoisseurs stroll and gesture among the canvases — an eighteenth-century vision of the gallery as a public temple of art.",
        "source": "Giovanni Paolo Panini (c. 1757), Museum of Fine Arts, Boston",
        "href": "https://commons.wikimedia.org/wiki/File:Giovanni_Paolo_Pannini_-_Picture_Gallery_with_Views_of_Modern_Rome_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/chipperfield-faro-santander--art.png",
          "alt": "A grand imaginary picture gallery, its walls covered from floor to ceiling with framed paintings of Roman monuments, as elegantly dressed connoisseurs admire the works.",
          "credit": "Giovanni Paolo Panini, Picture Gallery with Views of Modern Rome (c. 1757), Museum of Fine Arts, Boston. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pictures at an Exhibition",
        "excerpt": "Mussorgsky's suite leads the listener on a musical walk through a memorial gallery, each movement illustrating a single artwork while the recurring 'Promenade' theme depicts the visitor strolling between them. Music becomes architecture — a hall of pictures rendered in sound and opened to everyone who listens.",
        "source": "Modest Mussorgsky (1874)",
        "href": "https://imslp.org/wiki/Pictures_at_an_Exhibition_(Mussorgsky,_Modest)"
      }
    ],
    "rank": 36
  },
  {
    "slug": "telstra-australia-outage",
    "headline": "A major Telstra outage disrupts Australian train services and emergency calls",
    "overview": "A major network outage at Telstra, Australia's largest telecommunications company, on July 8, 2026 cancelled train services, cut mobile coverage for thousands and left some emergency calls unconnected. The failure began at 4:30am and was fully restored about 12 hours later. Telstra blamed a software defect in time-keeping servers at Sydney and Melbourne data centres, ruling out a cyber-attack, and apologised.",
    "genre": "Technology",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cgevw0d95pdo"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Telstra+outage+trains+emergency+calls&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/telstra-australia-outage.png",
      "alt": "Telecommunications infrastructure illustrating the nationwide network outage at Australia's largest telecoms company",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Northeast blackout of 1965",
        "excerpt": "Over 30 million people and 80,000 square miles ... were left without electricity for up to 13 hours. ... more than 800,000 riders were trapped in the subway.",
        "source": "Northeast blackout of 1965, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Northeast_blackout_of_1965"
      },
      {
        "category": "historical",
        "title": "The first transatlantic telegraph cable (1858)",
        "excerpt": "In September 1858, after several days of progressive deterioration of the insulation, the cable failed altogether.",
        "source": "Transatlantic telegraph cable, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Transatlantic_telegraph_cable"
      },
      {
        "category": "literary",
        "title": "The Machine Stops",
        "excerpt": "There came a day when, without the slightest warning, without any previous hint of feebleness, the entire communication-system broke down, all over the world, and the world, as they understood it, ended.",
        "source": "E. M. Forster (1909), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Machine_Stops/Chapter_III"
      },
      {
        "category": "literary",
        "title": "The Tower of Babel (Genesis 11)",
        "excerpt": "Go to, let us go down, and there confound their language, that they may not understand one another's speech.",
        "source": "King James Bible, Genesis 11 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "The Scream",
        "excerpt": "Munch's blood-red sky and the skull-like figure clutching its face render a soundless shriek — the image of a person cut off, overwhelmed and utterly alone amid a world drained of order. Its wavering lines seem to carry a silence louder than any noise, the isolation that rushes in when the ordinary connections of life fall away.",
        "source": "Edvard Munch (1893), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Edvard_Munch,_1893,_The_Scream,_oil,_tempera_and_pastel_on_cardboard,_91_x_73_cm,_National_Gallery_of_Norway.jpg",
        "image": {
          "src": "/covers/telstra-australia-outage--art.png",
          "alt": "A hairless figure on a bridge clutches its face with both hands, mouth open in a scream, against a swirling blood-orange sky and dark blue fjord.",
          "credit": "Edvard Munch, The Scream (1893), National Museum of Art, Architecture and Design, Oslo. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "4'33\"",
        "excerpt": "For four minutes and thirty-three seconds the performer sits without playing a single intended note, leaving only the ambient sounds of the room and the restless audience. Cage's 'silent' piece turns the sudden absence of expected signal into the entire experience — the quiet that rushes in when the accustomed sound goes dead.",
        "source": "John Cage (1952)",
        "href": "https://en.wikipedia.org/wiki/4%E2%80%B233%E2%80%B3"
      }
    ],
    "rank": 37
  },
  {
    "slug": "ghana-halts-ramaphosa-visit",
    "headline": "Ghana postpones South African President Ramaphosa's visit after xenophobic protests target its citizens",
    "overview": "Ghana has postponed a planned visit by South African President Cyril Ramaphosa following xenophobic rallies in South Africa that led to hundreds of Ghanaians being repatriated, the BBC reported on July 8, 2026. The trip, planned for early August, had been hoped to ease tensions, but officials feared Ramaphosa's presence could trigger mass protests. The row has strained ties between two of Africa's most prominent nations.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cy8dmelnjk7o"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Ghana+postpones+Ramaphosa+visit+xenophobia&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/ghana-halts-ramaphosa-visit.png",
      "alt": "South African President Cyril Ramaphosa, his hand raised pensively to his face",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Ghana's 1969 Aliens Compliance Order",
        "excerpt": "In 1969, under the \"Ghana Aliens Compliance Order\" (GACO) enacted by Ghanaian Prime Minister Kofi Abrefa Busia; Nigerians and other African and non-African immigrants were forced to leave Ghana as they made up 20 percent of Ghana's population at the time, and Ghana deported over 3 million Nigerians and other African and non-African immigrants in 3 months.",
        "source": "Illegal immigration to Ghana, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Illegal_immigration_to_Ghana"
      },
      {
        "category": "historical",
        "title": "The Edict of Expulsion (1290)",
        "excerpt": "The Edict of Expulsion is a royal decree expelling all Jews from the Kingdom of England that was issued by Edward I on 18 July 1290; it was the first time a European state is known to have permanently banned their presence.",
        "source": "Edict of Expulsion, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Edict_of_Expulsion"
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey (Book VI): the sacred duty of hospitality to strangers",
        "excerpt": "This is only some poor man who has lost his way, and we must be kind to him, for strangers and foreigners in distress are under Jove's protection, and will take what they can get and be thankful; so, girls, give the poor fellow something to eat and drink.",
        "source": "Homer, The Odyssey, trans. Samuel Butler (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm"
      },
      {
        "category": "literary",
        "title": "The Book of Ruth: the foreigner who finds welcome",
        "excerpt": "Then she fell on her face, and bowed herself to the ground, and said unto him, Why have I found grace in thine eyes, that thou shouldest take knowledge of me, seeing I am a stranger?",
        "source": "Ruth 2:10, King James Version (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ruth"
      },
      {
        "category": "artistic",
        "title": "The Expulsion from the Garden of Eden",
        "excerpt": "Masaccio's fresco captures the primordial expulsion: Adam buries his face in his hands while Eve wails, her mouth open in raw grief, as an angel drives them from the gate of Eden. Cast out of paradise, the first humans become the archetypal exiles, stripped of home and turned into wanderers. It is Western art's founding image of the outsider forced beyond the threshold.",
        "source": "Masaccio, fresco (c. 1425), Brancacci Chapel, Florence — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Expulsion_from_the_Garden_of_Eden_Masaccio_Cappella_Brancacci.jpg",
        "image": {
          "src": "/covers/ghana-halts-ramaphosa-visit--art.png",
          "alt": "Masaccio's fresco The Expulsion from the Garden of Eden, showing a weeping Adam and Eve driven out through the gate of Paradise by a hovering angel.",
          "credit": "Masaccio (c. 1425), fresco, Brancacci Chapel, Santa Maria del Carmine, Florence; photograph by Marie-Lan Nguyen, public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Last of England",
        "excerpt": "Ford Madox Brown paints a young emigrant couple huddled on the deck of a ship leaving England, their faces set in grief and resolve as the white cliffs recede behind them and cabbages swing from the rail. Driven from home by hard circumstance, they become an emblem of the uprooted migrant forced to seek a life elsewhere. The tondo frame closes around them like the small, cold world of the exile.",
        "source": "Ford Madox Brown (1855), oil on panel, Birmingham Museums Trust — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Ford_Madox_Brown_-_The_Last_of_England_-_Google_Art_Project.jpg"
      }
    ],
    "rank": 38
  },
  {
    "slug": "maccabee-young-falconers",
    "headline": "Photographer Lauren Maccabee documents a new generation of young female falconers",
    "overview": "It's Nice That on July 8, 2026 featured photographer Lauren Maccabee's project portraying teenage girls who are taking up falconry, choosing the demanding craft of rearing and flying birds of prey over lives lived on social media. The images dwell on the patience, dirt and quiet devotion the birds demand. The series celebrates a tactile, ancient pursuit finding new adherents among the young.",
    "genre": "Culture",
    "sources": [
      {
        "name": "It's Nice That",
        "href": "https://www.itsnicethat.com/articles/lauren-maccabee-young-falconers-photography-project-080726"
      },
      {
        "name": "Google News",
        "href": "https://news.google.com/rss/search?q=Lauren+Maccabee+falconers+photography&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-08",
    "image": {
      "src": "/covers/maccabee-young-falconers.png",
      "alt": "A young falconer holding a bird of prey on a gloved fist, from Lauren Maccabee's photographic series",
      "credit": "Lauren Maccabee / It's Nice That"
    },
    "edition": "Afternoon Edition · 8 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "De arte venandi cum avibus (On the Art of Hunting with Birds)",
        "excerpt": "Over some three decades the Holy Roman Emperor Frederick II compiled the first scientific treatise on falconry, insisting that a falconer learn a bird's true nature through patient, first-hand observation rather than hearsay. Its pages set out how to man, feed and fly a hawk until the wild creature returns willingly to the hand. It remains medieval Europe's fullest testament to the slow discipline of mastering a bird of prey.",
        "source": "Frederick II of Hohenstaufen, Holy Roman Emperor, c. 1240s (English edition trans. Casey A. Wood & F. Marjorie Fyfe, 1943), via Internet Archive",
        "href": "https://archive.org/details/McGillLibrary-rbsc_art-falconry_casey-wood_SK321F87-18001"
      },
      {
        "category": "historical",
        "title": "The Booke of Faulconrie or Hauking",
        "excerpt": "To manne, hoode, and reclayme a hawke, after the opinion of the Italian Falconer ... To make your Hawke knowe your voyce.",
        "source": "George Turberville, printed at London, 1575 (Elizabethan Renaissance), via Internet Archive",
        "href": "https://archive.org/details/bookeoffalconrie00turb"
      },
      {
        "category": "literary",
        "title": "The Windhover",
        "excerpt": "I caught this morning morning's minion, king- / dom of daylight's dauphin, dapple-dawn-drawn Falcon, in his riding / Of the rolling level underneath him steady air ... My heart in hiding / Stirred for a bird, – the achieve of, the mastery of the thing!",
        "source": "Gerard Manley Hopkins, written 1877 (published 1918), via the Academy of American Poets",
        "href": "https://poets.org/poem/windhover"
      },
      {
        "category": "literary",
        "title": "The Second Coming",
        "excerpt": "Turning and turning in the widening gyre / The falcon cannot hear the falconer; / Things fall apart; the centre cannot hold;",
        "source": "W. B. Yeats, 1920, via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Second_Coming_(Yeats)"
      },
      {
        "category": "artistic",
        "title": "Lady with a Falcon and Companions",
        "excerpt": "In this Pahari painting a noblewoman stands amid her female attendants with a falcon poised on her fist, the bird as much an emblem of her composure as of the hunt. The scene sets the wild raptor within a quiet circle of women, its stillness answering their own. It is a centuries-old vision of the female falconer among companions.",
        "source": "Pahari miniature, Nurpur, Himachal Pradesh, India, c. 1775; Los Angeles County Museum of Art, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Lady_with_a_Falcon_and_Companions_LACMA_M.79.191.25.jpg",
        "image": {
          "src": "/covers/maccabee-young-falconers--art.png",
          "alt": "Indian Pahari miniature of a noblewoman holding a falcon on her hand, surrounded by female companions",
          "credit": "Lady with a Falcon and Companions, Nurpur, c. 1775. Los Angeles County Museum of Art (gift of Paul F. Walter, M.79.191.25), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Codex Manesse, fol. 69r: Herr Werner von Teufen",
        "excerpt": "On this folio of the Codex Manesse the minnesinger Werner von Teufen rides beside a lady who bears a falcon on her raised hand, the bird a courtly emblem of the bond between rider and creature. Painted around 1300, it shows a young woman entrusted with a trained hawk. The demanding craft of carrying a bird of prey has drawn devotees for seven centuries.",
        "source": "Illuminated manuscript folio, Zurich, c. 1305–1315; Heidelberg University Library, Cod. Pal. germ. 848, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Codex_Manesse_069r_Werner_von_Teufen.jpg"
      }
    ],
    "rank": 39
  }
];

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
