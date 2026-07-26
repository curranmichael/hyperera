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
// the Morning Edition of 25 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Evening Edition of 24 July 2026 and the Morning Edition of 24 July 2026.
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
    "slug": "trump-tariffs-lawsuits-global-pushback",
    "headline": "Small businesses sue over Trump's sweeping new tariffs as US allies push back",
    "overview": "American small businesses filed lawsuits challenging President Trump's latest round of sweeping tariffs, arguing the levies are unlawful and are driving up their costs. Abroad, Australian Prime Minister Anthony Albanese said he would raise concerns directly with Trump, and analysts warned the new duties on dozens of countries are likely here to stay, with more to come. The measures have rattled markets and strained ties with trading partners from Europe to Asia.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxNZ0M2S0lDNEpzamJTNFJGUUlGZG5YcjQzM0VDblNfeW9rODIzZ0tWR2hycklaYmVUOG1fdndQLWJOQ3RJd3c5TVZ1WmRyQ2xYQWd3OGQ4UExKdERtWDFDbzA5MGdhMzE1TWpXNjB0UjBPWUYteDFfdXlfUGViNWtsWWxKVG9ESE5DQU1PdGo2OA?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxOWEhnbzZuUVgwb2duQzN4ZGpYM1hkWXRKUTlBZUVpWFRLUjVQaDFWQVkzdm5qLWpfckwtZ3QyZFlpMTZSYkJlNWhxT1lXcGFETW12Z1JNWUtnQWxzRE8xSWFmcmhhMXhMbjlOMVBXbFBJRHBjc3BGdXdOX3Brc1A2VkltcTdRcHRQeUEyUnlSVUtESDY5MU1QeDhxZUNub0gxSjFTaEVHaEpJYVQxWkh4c0VR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/trump-tariffs-lawsuits-global-pushback.png",
      "alt": "Stacked shipping containers and cranes at a busy port container terminal",
      "credit": "Matti Blume, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "George R. T. Hewes, \"A Retrospect of the Boston Tea-Party\" (1834): an eyewitness recalls colonists destroying the taxed East India Company tea in Boston Harbor, December 1773",
        "excerpt": "We then were ordered by our commander to open the hatches, and take out all the chests of tea and throw them overboard, and we immediately proceeded to execute his orders; first cutting and splitting the chests with our tomahawks, so as thoroughly to expose them to the effects of the water.",
        "source": "George R. T. Hewes, A Retrospect of the Boston Tea-Party, With a Memoir of George R. T. Hewes (1834), via The American Yawp Reader",
        "href": "https://www.americanyawp.com/reader/the-american-revolution/george-r-t-hewes-a-retrospect-of-the-boston-tea-party-1834/",
        "image": {
          "src": "/covers/trump-tariffs-lawsuits-global-pushback--a0.png",
          "alt": "Colonists disguised as Mohawks throwing chests of tea from ships into Boston Harbor as a crowd cheers from the wharf",
          "credit": "Nathaniel Currier, 'The Destruction of Tea at Boston Harbor' (1846), hand-colored lithograph. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Petition of 1,028 American economists urging President Hoover to veto the Smoot-Hawley Tariff (May 1930)",
        "excerpt": "The undersigned American economists and teachers of economics strongly urge that any measure which provides for a general upward revision of tariff rates be denied passage by Congress, or if passed, be vetoed by the President. We are convinced that increased protective duties would be a mistake. They would operate, in general, to increase the prices which domestic consumers would have to pay.",
        "source": "The 1930 economists' petition against the Smoot-Hawley Tariff Act, reproduced by the American Enterprise Institute",
        "href": "https://www.aei.org/carpe-diem/the-economists-tariff-protest-of-1930/",
        "image": {
          "src": "/covers/trump-tariffs-lawsuits-global-pushback--a1.png",
          "alt": "Senator Reed Smoot and Representative Willis C. Hawley standing side by side in 1929, sponsors of the Smoot-Hawley Tariff",
          "credit": "Rep. Willis C. Hawley and Sen. Reed Smoot, April 11, 1929. Library of Congress, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (1776), Book IV, Chapter II, on the folly of protecting home industry by high duties",
        "excerpt": "It is the maxim of every prudent master of a family, never to attempt to make at home what it will cost him more to make than to buy. ... What is prudence in the conduct of every private family can scarce be folly in that of a great kingdom.",
        "source": "Adam Smith, The Wealth of Nations, Book IV, Chapter II, via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Wealth_of_Nations/Book_IV/Chapter_2",
        "image": {
          "src": "/covers/trump-tariffs-lawsuits-global-pushback--a2.png",
          "alt": "Portrait of the economist Adam Smith in profile, known as the Muir portrait",
          "credit": "Unknown artist, 'The Muir portrait' of Adam Smith. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Frederic Bastiat, \"A Petition\" (the Candlemakers' Petition), from Economic Sophisms, First Series, Chapter VII (1845; trans. Patrick James Stirling, 1873)",
        "excerpt": "We are suffering from the intolerable competition of a foreign rival, placed, it would seem, in a condition so far superior to ours for the production of light, that he absolutely inundates our national market with it at a price fabulously reduced. The moment he shows himself, our trade leaves us—all consumers apply to him; and a branch of native industry, having countless ramifications, is all at once rendered completely stagnant. This rival, who is no other than the Sun, wages war to the knife against us, and we suspect that he has been raised up by perfidious Albion (good policy as times go); inasmuch as he displays towards that haughty island a circumspection with which he dispenses in our case.",
        "source": "Frederic Bastiat, Economic Sophisms, First Series, Chapter VII ('A Petition'), trans. Patrick James Stirling, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/44145/44145-h/44145-h.htm",
        "image": {
          "src": "/covers/trump-tariffs-lawsuits-global-pushback--a3.png",
          "alt": "Portrait engraving of the French economist Frederic Bastiat",
          "credit": "Frederic Bastiat, from the Galerie des representants du peuple (1848). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Attributed to Philip Dawe, \"The Bostonians Paying the Excise-man, or Tarring & Feathering\" (mezzotint, London, 1774)",
        "excerpt": "This British satirical mezzotint shows Boston patriots forcing scalding tea down the throat of a tarred-and-feathered customs officer, John Malcolm, beneath a noose slung from the Liberty Tree while the Boston Tea Party unfolds in the harbor behind. Printed in London to mock colonial mob violence, it captures the raw, coercive fury with which ordinary merchants and citizens turned on the ruler's tax collectors, a fury that echoes today's small-business revolt against duties they never voted for.",
        "source": "Attributed to Philip Dawe, The Bostonians Paying the Excise-man, or Tarring & Feathering, 1774, The Metropolitan Museum of Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Bostonians_Paying_the_Excise-Man,_or_Tarring_%26_Feathering_MET_MM2273.jpg",
        "image": {
          "src": "/covers/trump-tariffs-lawsuits-global-pushback--a4.png",
          "alt": "1774 mezzotint of Bostonians pouring tea into a tarred-and-feathered customs excise-man beneath a Liberty Tree, with ships in the harbor",
          "credit": "Attributed to Philip Dawe, mezzotint, 1774. The Metropolitan Museum of Art, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Marinus van Reymerswaele, \"Two Tax Gatherers\" (oil on oak, c. 1540), The National Gallery, London (NG944)",
        "excerpt": "In this Flemish satire two grotesque officials hunch over a table in fur-trimmed finery, one scratching entries in a ledger of levies while the other claws at a heap of coins. Painted around 1540, it is a merciless caricature of the greed and corruption of those who collect duties and taxes for the state. Its grasping, joyless faces make it a timeless emblem of levies that enrich the collector while resentment builds among the merchants and citizens made to pay.",
        "source": "Marinus van Reymerswaele, Two Tax Gatherers, c. 1540, oil on oak, The National Gallery, London (NG944)",
        "href": "https://www.nationalgallery.org.uk/research/publications/technical-bulletin/the-two-tax-gatherers-by-marinus-van-reymerswale-original-and-replica",
        "image": {
          "src": "/covers/trump-tariffs-lawsuits-global-pushback--a5.png",
          "alt": "Two ugly, richly dressed tax collectors at a table, one writing in a ledger while the other reaches for a pile of coins",
          "credit": "Marinus van Reymerswaele, 'Two Tax Gatherers', c. 1540, National Gallery, London. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "west-bank-settler-violence-mosques",
    "headline": "Israel detains more than 70 as settlers burn West Bank mosques after a deadly shooting",
    "overview": "Israeli forces detained more than 70 people and rounded up Palestinians in a West Bank village after a shooting involving settlers left several people dead, authorities said. Israeli settlers set fire to mosques in the occupied territory following the deadly clash, deepening a surge of violence. The bloodshed has drawn international concern over spiraling tensions in the West Bank.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQX016UEJ6ZW5iYlFWclZ5eEpzRmZLOHQxcTM2T2dXQ2pYeTNseUdNdXBlcE8tZ191U0tLWlQtV3VkRWVuV2s0dkVhRFUwTElxa0ctR1R4cjJwcXZKQmhHWGdHYTZrTnZFNElQQVdPdVBlc3MxZmJHUU0yNllkWTFnLUxjS1lhU3N1WjI0V0wzMFVPazVvd2ZITFJNYVdacjNQTmJaZ3NaOVdCTThJVGhJTXNxRVM4WGM?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxOUVBNcGd1UUxUT2Z6MUFrU1o4YW1XOVB5X2lXMVp4WFB5QjBlNkx2bnlocXdOVHFmMmozc1hXamVNQUdkZDl6SndsUmxrUWZXaDhadkMyZTdmektVVzQ0TkZVMWdleVRta01iUVhCWUplMnZGZVZpejc4SUNFYmlNTlBmWWVtdDczWWVYa2trT1BpRjZZaUQ5N1VWeVN2ajVOOVU1MTgyRVlhVTBFcFhpYUYtMnI1NjQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/west-bank-settler-violence-mosques.png",
      "alt": "View of a Palestinian town in the occupied West Bank",
      "credit": "Almonroth, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The burning of the Second Temple of Jerusalem by Roman forces under Titus, 70 CE (recorded by Josephus)",
        "excerpt": "In 70 CE, Roman legions under Titus stormed Jerusalem and put the Second Temple to the torch, ending centuries of sacrificial worship at Judaism's holiest site. The historian Josephus, an eyewitness, described flames engulfing the sanctuary as soldiers disregarded orders to spare it and thousands perished in the burning colonnades. The gutting of the Temple became the archetypal image of a sacred house of worship destroyed by conquering force.",
        "source": "Siege of Jerusalem (70 CE), drawing on Josephus, The Jewish War — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Siege_of_Jerusalem_(70_CE)",
        "image": {
          "src": "/covers/west-bank-settler-violence-mosques--a0.png",
          "alt": "David Roberts, The Siege and Destruction of Jerusalem by the Romans Under the Command of Titus, A.D. 70 (1850), showing the Temple in flames",
          "credit": "David Roberts, 'The Siege and Destruction of Jerusalem by the Romans Under the Command of Titus, A.D. 70' (1850), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Kristallnacht, the Nazi pogrom that burned over a thousand synagogues across Germany and Austria, 9-10 November 1938",
        "excerpt": "On the night of 9-10 November 1938, coordinated Nazi mobs across Germany and Austria burned and ransacked well over a thousand synagogues, smashed Jewish shops, and desecrated houses of prayer. Some 30,000 Jewish men were arrested and deported to concentration camps in the pogrom's aftermath. The 'Night of Broken Glass' turned communal violence into state-orchestrated assault on a people's sanctuaries, a grim escalation on the road to the Holocaust.",
        "source": "Kristallnacht — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Kristallnacht",
        "image": {
          "src": "/covers/west-bank-settler-violence-mosques--a1.png",
          "alt": "The synagogue in Eisenach, Germany, in flames during Kristallnacht, November 1938",
          "credit": "Photograph of the Eisenach synagogue burning, November 1938, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Psalm 74:7-8, The Book of Psalms, King James Version (1611)",
        "excerpt": "They have cast fire into thy sanctuary, they have defiled by casting down the dwelling place of thy name to the ground. They said in their hearts, Let us destroy them together: they have burned up all the synagogues of God in the land.",
        "source": "The Book of Psalms 74:7-8, King James Version — eBible.org",
        "href": "https://ebible.org/kjv/PSA074.htm"
      },
      {
        "category": "literary",
        "title": "Lamentations 2:6-7, mourning the violated sanctuary, King James Version (1611)",
        "excerpt": "And he hath violently taken away his tabernacle, as if it were of a garden: he hath destroyed his places of the assembly: the LORD hath caused the solemn feasts and sabbaths to be forgotten in Zion, and hath despised in the indignation of his anger the king and the priest. The LORD hath cast off his altar, he hath abhorred his sanctuary, he hath given up into the hand of the enemy the walls of her palaces; they have made a noise in the house of the LORD, as in the day of a solemn feast.",
        "source": "The Lamentations of Jeremiah 2:6-7, King James Version — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "Francesco Hayez, La distruzione del Tempio di Gerusalemme (The Destruction of the Temple of Jerusalem), oil on canvas, 1867",
        "excerpt": "Francesco Hayez's vast 1867 canvas stages the Roman sack of Jerusalem as a whirl of collapsing columns, fleeing priests, and armed soldiers overrunning the Temple precinct. Painted with Risorgimento overtones of exile and lost homeland, it renders the violation of a sanctuary as both historical catastrophe and enduring lament.",
        "source": "Francesco Hayez, 'La distruzione del Tempio di Gerusalemme' (1867), Gallerie dell'Accademia, Venice — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Francesco_Hayez_017.jpg",
        "image": {
          "src": "/covers/west-bank-settler-violence-mosques--a4.png",
          "alt": "Francesco Hayez's 1867 painting The Destruction of the Temple of Jerusalem, showing Roman soldiers storming the collapsing Temple",
          "credit": "Francesco Hayez, 'La distruzione del Tempio di Gerusalemme' (1867), Gallerie dell'Accademia, Venice, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi (music) and Temistocle Solera (libretto), 'Va, pensiero' (Chorus of the Hebrew Slaves) from the opera Nabucco, 1842",
        "excerpt": "\"Va, pensiero, sull'ali dorate\" — the opening cry of the Chorus of the Hebrew Slaves, whose exiled voices send their thoughts flying on golden wings toward a lost homeland and a desecrated Jerusalem. Verdi's mournful 1842 chorus became an anthem of a displaced people grieving sanctuary and land torn from them.",
        "source": "Giuseppe Verdi and Temistocle Solera, 'Va, pensiero' from Nabucco (1842) — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Va,_pensiero",
        "image": {
          "src": "/covers/west-bank-settler-violence-mosques--a5.png",
          "alt": "Musical score showing the melody and first verse of Verdi's chorus 'Va, pensiero' from Nabucco",
          "credit": "Melody and first verse of 'Va, pensiero' from Verdi's Nabucco (1842), via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "comic-con-2026-marvel-casting",
    "headline": "Marvel casts Ryan Gosling as Ghost Rider and David Jonsson as the new Black Panther at Comic-Con",
    "overview": "Marvel Studios used its San Diego Comic-Con panel to unveil Ryan Gosling as Ghost Rider and David Jonsson as the new Black Panther, alongside a 'Black Panther 3' announcement. The reveals drew roars from the Hall H crowd as the studio laid out its coming slate. Comic-Con remains the film and comics industry's biggest annual showcase.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxPTEY0V3dRZDM4dWhzX1VhWW5nQ0lDQ05STHpTa3Y3bFdGS25aSU5pOXVtWDk2RDRKLUk1cl9uOG9GOVNCZmJVU0dydFZsNy1fZE52dzZ3LVdoS2Z0M2p4bk1HWDlIS2RYeTNoc1F5T0VYaW1Bc3hnTzlPSW94aWVmcHc2TWhBZktVMF9FVmdYYXBhcnNvTXNwVE9zWGRnQi1UTzhORHA2X0xXbmRIUnd2bw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxOX05uWGZuRERrX3Nta2dzWXJhYldYQlhKRFhJSWc0TUdlQ3lFdlZwV1dMNmRtRF9BbV9xVW04d1NpM0NJVkNMWkxnTTh3eXZDd3UyTE0tdGZJSUtCbFdCWVhTZDZqb3QxNVU2cE54bFltSHVZc2hjd25BN2FzQ0laaFFJa3RSVFFuRWhUWC0ydkJfRFhSdkNTSXV6U0tLbnExSlBIYnBPQWU1eGxNcE52SA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/comic-con-2026-marvel-casting.png",
      "alt": "Crowds outside the San Diego Convention Center during Comic-Con",
      "credit": "Pop Culture Geek (The Conmunity), CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pericles praises Athens' year-round games and festivals as the spectacle that refreshes its people — Thucydides, History of the Peloponnesian War, Book 2.38 (c. 431-404 BCE), translated by Richard Crawley (1874)",
        "excerpt": "We celebrate games and sacrifices all the year round, and the elegance of our private establishments forms a daily source of pleasure and helps to banish the spleen; while the magnitude of our city draws the produce of the world into our harbour, so that to the Athenian the fruits of other countries are as familiar a luxury as those of his own.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2, chapter 38 (Crawley translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
        "image": {
          "src": "/covers/comic-con-2026-marvel-casting--a0.png",
          "alt": "Marble relief of horsemen in a cavalcade from the Parthenon frieze depicting the Panathenaic procession, 5th century BCE",
          "credit": "Cavalcade from the Parthenon frieze (Panathenaic procession), c. 447-432 BCE, British Museum; photograph via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The tradition of a new pope taking a regnal name on assuming the office, begun by Pope John II (elected 533 CE) and unbroken for centuries",
        "excerpt": "When a man is elected to the papacy he sets aside his birth name and assumes a new regnal name, becoming the latest bearer of an ancient office rather than merely himself. The custom is traced to John II in 533, a Roman priest named Mercurius who judged a pagan god's name unfit for the throne of Peter and chose a new one. Ever since, the moment of accession has been marked by this ritual renaming and public crowning, so that a fresh man takes up a role and a lineage far older than himself.",
        "source": "\"Papal name\", Wikipedia (encyclopedia overview of the papal naming tradition)",
        "href": "https://en.wikipedia.org/wiki/Papal_name",
        "image": {
          "src": "/covers/comic-con-2026-marvel-casting--a1.png",
          "alt": "18th-century print depicting the ceremonial coronation of Pope Pius VI",
          "credit": "Coronation of Pope Pius VI, engraving, The Metropolitan Museum of Art (DP885871), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The prophet's mantle falls from Elijah and is taken up by his successor Elisha — 2 Kings 2:13-14, King James Version (1611)",
        "excerpt": "He took up also the mantle of Elijah that fell from him, and went back, and stood by the bank of Jordan; And he took the mantle of Elijah that fell from him, and smote the waters, and said, Where is the LORD God of Elijah? and when he also had smitten the waters, they parted hither and thither: and Elisha went over.",
        "source": "The Holy Bible, King James Version, 2 Kings 2:13-14, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/2_Kings",
        "image": {
          "src": "/covers/comic-con-2026-marvel-casting--a2.png",
          "alt": "Watercolor of the prophet Elijah carried up to heaven in a chariot of fire drawn by horses of fire",
          "credit": "James Tissot, Elijah Taken Up to Heaven, watercolor, c. 1896-1902, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Prometheus recounts how he stole fire and gave it to mortals — Aeschylus, Prometheus Bound (c. 5th century BCE), translated by Herbert Weir Smyth (1922)",
        "excerpt": "I hunted out and stored in fennel stalk the stolen source of fire that hath proved to mortals a teacher in every art and a means to mighty ends.",
        "source": "Aeschylus, Prometheus Bound (Smyth translation, 1927 printing), Wikisource",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/Prometheus_Bound",
        "image": {
          "src": "/covers/comic-con-2026-marvel-casting--a3.png",
          "alt": "Neoclassical painting of Prometheus bringing the flame of fire down to mankind",
          "credit": "Heinrich Friedrich Füger, Prometheus Brings Fire to Mankind, 1817, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Riace Bronzes (Statue A) — over-lifesize Greek bronze statue of a nude warrior-hero, c. 460-450 BCE, Museo Nazionale della Magna Grecia, Reggio Calabria",
        "excerpt": "Recovered from the seabed off Riace in 1972, this over-lifesize bronze presents the idealized warrior-hero of the Greek imagination: muscled, poised, and commanding, with inlaid eyes, silvered teeth and copper lips that once made him seem uncannily alive. He embodies the king-protector and champion the crowd looks to, the mortal form of a heroic myth cast in enduring metal. Standing before a modern viewer, he still radiates the authority of a guardian who steps forward to be seen and acclaimed.",
        "source": "Riace Bronzes, Statue A, Museo Nazionale della Magna Grecia, Reggio Calabria; photograph via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Riace_Warrior_A.jpg",
        "image": {
          "src": "/covers/comic-con-2026-marvel-casting--a4.png",
          "alt": "Ancient Greek bronze statue of a bearded nude warrior standing in a poised heroic stance",
          "credit": "Riace Bronze, Statue A, Greek, c. 460-450 BCE, Museo Nazionale della Magna Grecia, Reggio Calabria; photograph via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "\"Ride of the Valkyries\" (Walkurenritt) from Act III of Richard Wagner's opera Die Walkure, WWV 86B (composed 1856-1870, premiered 1870)",
        "excerpt": "Wagner's surging brass and galloping strings storm in as the warrior-maidens sweep across a fire-lit sky, gathering fallen heroes to a mythic afterlife. It is music built for grand spectacle and heroic entrance, a sound that turns an arrival into an event and a crowd into a roar. Its blazing momentum and shrieking horns make it the ultimate fanfare for a hero unveiled to the multitude.",
        "source": "Richard Wagner, Die Walkure, WWV 86B (scores and parts), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)",
        "image": {
          "src": "/covers/comic-con-2026-marvel-casting--a5.png",
          "alt": "Painting of armored Valkyries riding winged horses through a stormy sky carrying fallen warriors",
          "credit": "John Charles Dollman, The Ride of the Valkyrs, 1909, via Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "flavio-bolsonaro-brazil-campaign",
    "headline": "Flavio Bolsonaro launches a presidential campaign in Brazil, touting support from Milei and Netanyahu",
    "overview": "Senator Flavio Bolsonaro, son of former president Jair Bolsonaro, launched a campaign for Brazil's presidency, securing his party's bid despite legal and political challenges. He touted backing from allies including Argentina's Javier Milei and Israel's Benjamin Netanyahu. The move sets up a charged election as the Brazilian right seeks to reclaim power.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOaUluanNaMzVMbDhWWGJGU2RXQUVuVFptQmlEb1JBM2NocXpvQmdmTlU5S2ZqVGVnZG9NLV9Gbi1Lc2hJbVZYMnZZVHBPSDdTdkxiWG9KUDRrODhMTi1YU3pZbmJhbzJvbUtzVXhJTkswTTBOQ1ZvamoxMzY1bEl0SnFHd29FMnFteUlJWks0NXdya1E5R1ppUEtram9HUWlNdlhqNTdoLVQweEZic29TQ1FzcjdPb1NBNVRxaVV3aDE1LXVibnp2Y1Jxb3hFUQ?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOOGw5NFNfRVh2cDAwTGxzNUdFU29uT29qTHR1REpKV2NzT3k0QXpLa3lSRFE5Vk5SR3lZc2F5bnpsRGFULTRQTURZQ0hudVM3WG1zZU5HY3RYakRqdHhXS3h3NlZpdTdXM1BhdWNJd252Zy1oZFpRSnIxUzlQZ081LTktY3FYeXVrMjBWMkJJazBJX2EteWZXbENBZjZXM0pBeVNMODhORGJPS3k4eWo3WmFJN2M5bWc4?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/flavio-bolsonaro-brazil-campaign.png",
      "alt": "Official portrait of Brazilian senator Flavio Bolsonaro",
      "credit": "Agencia Senado, Attribution, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "John Quincy Adams and America's first presidential dynasty (1825)",
        "excerpt": "In 1825 John Quincy Adams became the sixth U.S. president, the first son of a former president (John Adams) to reach the office. No candidate won an Electoral College majority in 1824, so the contest went to the House of Representatives, where Henry Clay's backing tipped the result to Adams over Andrew Jackson. The outcome made the Adamses the nation's first presidential dynasty, a father's mantle descending to his son.",
        "source": "Wikipedia, \"Inauguration of John Quincy Adams\" / \"John Quincy Adams\"",
        "href": "https://en.wikipedia.org/wiki/John_Quincy_Adams",
        "image": {
          "src": "/covers/flavio-bolsonaro-brazil-campaign--a0.png",
          "alt": "Portrait of John Quincy Adams by Thomas Sully, 1824",
          "credit": "Thomas Sully, 1824 (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Napoleon III and the restoration of the Bonaparte empire (1852)",
        "excerpt": "Louis-Napoleon Bonaparte rode his uncle's name to the presidency of France's Second Republic in 1848, winning in a landslide fueled by Bonapartist nostalgia. Barred from re-election, he seized power in an 1851 coup and, exactly one year later on 2 December 1852, proclaimed himself Emperor Napoleon III, restoring the family empire. The nephew resurrected the dynasty by trading on the legend of Napoleon I.",
        "source": "Wikipedia, \"Napoleon III\"",
        "href": "https://en.wikipedia.org/wiki/Napoleon_III",
        "image": {
          "src": "/covers/flavio-bolsonaro-brazil-campaign--a1.png",
          "alt": "Portrait of Napoleon III by Alexandre Cabanel, 1865",
          "credit": "Alexandre Cabanel, 1865 (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Second Part of King Henry the Fourth (Act IV): Prince Hal takes his father's crown",
        "excerpt": "My due from thee is this imperial crown, / Which, as immediate from thy place and blood, / Derives itself to me. Lo! here it sits, / Which God shall guard; and put the world's whole strength / Into one giant arm, it shall not force / This lineal honour from me.",
        "source": "William Shakespeare, Henry IV Part 2 (Yale Shakespeare, 1921), Act IV, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Henry_IV_Part_2_(1921)_Yale/Text/Act_IV",
        "image": {
          "src": "/covers/flavio-bolsonaro-brazil-campaign--a2.png",
          "alt": "Early portrait of King Henry V of England, unknown artist, National Portrait Gallery",
          "credit": "Unknown artist, late 16th/early 17th century (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, Agamemnon: the inherited curse of the House of Atreus",
        "excerpt": "But I hold my thought alone and by others unbeguiled; / 'Tis the deed that is unholy shall have issue, child on child, / Sin on sin, like his begetters; and they shall be as they were.",
        "source": "Aeschylus, The Agamemnon (trans. Gilbert Murray), Project Gutenberg eBook #14417",
        "href": "https://www.gutenberg.org/files/14417/14417-h/14417-h.htm",
        "image": {
          "src": "/covers/flavio-bolsonaro-brazil-campaign--a3.png",
          "alt": "Clytemnestra by John Collier, 1882",
          "credit": "John Collier, 1882 (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Coronation of Napoleon (1805-1807)",
        "excerpt": "David's vast canvas freezes the moment Napoleon, having already crowned himself, raises the crown to anoint Josephine, seizing legitimacy rather than receiving it. The Pope sits behind, reduced to a witness, while the assembled court ratifies a self-made dynasty. Imperial power is staged as inheritance and spectacle. The painting hangs in the Louvre.",
        "source": "Jacques-Louis David, Le Sacre de Napoleon, Musee du Louvre",
        "href": "https://en.wikipedia.org/wiki/The_Coronation_of_Napoleon",
        "image": {
          "src": "/covers/flavio-bolsonaro-brazil-campaign--a4.png",
          "alt": "The Coronation of Napoleon by Jacques-Louis David, 1805-1807, oil on canvas, Louvre",
          "credit": "Jacques-Louis David, 1805-1807 (public domain), Musee du Louvre, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, Nabucco (1842): a ruler's overreach and a people's hope of restoration",
        "excerpt": "Verdi's 1842 opera dramatizes King Nebuchadnezzar's hubris: declaring himself a god, he is struck mad until he repents and frees the captive Hebrews. Its chorus \"Va, pensiero,\" sung by the exiled slaves longing for their lost homeland, became an anthem of political yearning and national restoration. It is a parable of a ruler's overreach and a people's dream of return.",
        "source": "Giuseppe Verdi, Nabucco (1841-42), full score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/flavio-bolsonaro-brazil-campaign--a5.png",
          "alt": "Portrait of Giuseppe Verdi by Giovanni Boldini, 1886",
          "credit": "Giovanni Boldini, 1886 (public domain), via Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "pogacar-fifth-tour-de-france",
    "headline": "Pogacar closes on a record-equaling fifth Tour de France title as wildfires shorten the finale",
    "overview": "Tadej Pogacar moved to the brink of a record-equaling fifth Tour de France title as Ecuador's Richard Carapaz won the penultimate stage. Organizers shortened the race's final stage after French security forces were redeployed to battle wildfires sweeping the country. The blazes upended the traditional run-in to the three-week race.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxOcXo3Z3pNSUIwSUwyYTg1VnhwdUNZLV9Ca0lzWDZMNWZxVzVFVEdqdmFCOC1KLVNFVjVKamRGbXVxdzVwS1VLOXBUWW5XelF2MlpISm5KRU11UlZkbmhHOG13V25SOEpUcFMyQWhyVll2dUxHRlN5WmdGRHhXUER3SnhHZU5yYTBoNkR3S293U3RKVVJBRDRKa0NybG9JZw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPNWgzVEwyRWNsenMwcnZBcGRvOFZGcnJHSGEyMUZqU2VXc0ptN1EyNTdPNm1xRGF0eWpsZHFKLW9TTlp3T3dJWEhySVkzOUtJMmUtcWQ4d3VBQ0M3NTlsOGZWNzM5aGZyVDFGLWNDbEN1d0xKTU9CTW5JS1dlT1RZbUhnZFFOaVBucS1ZUjJBU0FNeEt2R3U2aUZFN3hQNkZLVEN6UEJOUHIwR1l4bTU0WUpsdnZzQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/pogacar-fifth-tour-de-france.png",
      "alt": "Tadej Pogacar racing in the yellow jersey at the Tour de France",
      "credit": "Hugo LUC, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The olive crown of the ancient Olympic Games (kotinos)",
        "excerpt": "At the ancient Olympic Games there were no medals of gold, silver, or bronze. The sole prize was the kotinos, a wreath cut from the sacred wild olive tree that grew beside the Temple of Zeus at Olympia, snipped with golden shears by a boy whose parents were both still living. Modest in substance yet immense in honor, the crown proclaimed that the athlete had striven for virtue rather than wealth, and the victors' names became the very calendar by which the Greek world dated its years.",
        "source": "Wikipedia, \"Kotinos\"",
        "href": "https://en.wikipedia.org/wiki/Kotinos"
      },
      {
        "category": "historical",
        "title": "Gaius Appuleius Diocles, champion charioteer of Imperial Rome",
        "excerpt": "In the 2nd century AD the charioteer Gaius Appuleius Diocles thundered around the Circus Maximus for twenty-four years, winning 1,462 of his 4,257 four-horse races and hanging back until the final moment before surging clear of his rivals. A stone inscription preserves his staggering career winnings of 35,863,120 sesterces, a sum that has led moderns to hail him as perhaps the highest-paid athlete of all time. Yet for all his fame his trade branded him \"infamous,\" ranked with gladiators and actors and barred from the ranks of the Roman elite.",
        "source": "Wikipedia, \"Gaius Appuleius Diocles\"",
        "href": "https://en.wikipedia.org/wiki/Gaius_Appuleius_Diocles"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book XXIII (the chariot race at the funeral games of Patroclus)",
        "excerpt": "At one moment the chariots seemed to touch the ground, and then again they bounded into the air; the drivers stood erect, and their hearts beat fast and furious in their lust of victory.",
        "source": "Homer, The Iliad, Book XXIII, translated by Samuel Butler (public domain)",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XXIII"
      },
      {
        "category": "literary",
        "title": "St Paul, 1 Corinthians 9:24-25 (King James Version)",
        "excerpt": "Know ye not that they which run in a race run all, but one receiveth the prize? So run, that ye may obtain. And every man that striveth for the mastery is temperate in all things. Now they do it to obtain a corruptible crown; but we an incorruptible.",
        "source": "The Holy Bible, King James Version, 1 Corinthians 9:24-25 (public domain)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Corinthians"
      },
      {
        "category": "artistic",
        "title": "Ulpiano Checa, \"Carrera de carros romanos\" (Roman Chariot Race), 1890",
        "excerpt": "Ulpiano Checa's Roman Chariot Race hurls the viewer into the dust and thunder of the ancient circus: straining horses at full gallop, charioteers braced against the reins, and the roar of the crowd almost audible in the whirl of motion. First shown at the 1890 Salon de Paris, where it won the young Spanish painter his first great acclaim, the canvas turns athletic spectacle into an image of speed, danger, and glory.",
        "source": "Wikimedia Commons, \"Carrera de carros romanos-Ulpiano Checa\" (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Carrera_de_carros_romanos-Ulpiano_Checa.JPG",
        "image": {
          "src": "/covers/pogacar-fifth-tour-de-france--a4.png",
          "alt": "Painting of a Roman chariot race with horses at full gallop and charioteers straining against the reins in a crowded arena",
          "credit": "Ulpiano Checa, \"Carrera de carros romanos\" (1890), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Euphiletos Painter, Panathenaic prize amphora with foot race (stadion), c. 530 BC",
        "excerpt": "This black-figure terracotta amphora by the Euphiletos Painter, made in Athens about 530 BC and now in the Metropolitan Museum of Art, was itself a victory prize, once filled with sacred olive oil for the champion. On one side a line of nude, bearded runners strains forward in the stadion foot race, muscles taut and legs flying, an ancient image of pure competitive endurance rendered in the deep black silhouette of Attic pottery.",
        "source": "Wikipedia / Metropolitan Museum of Art, \"Euphiletos Painter Panathenaic prize amphora\" (public domain)",
        "href": "https://en.wikipedia.org/wiki/Euphiletos_Painter_Panathenaic_prize_amphora",
        "image": {
          "src": "/covers/pogacar-fifth-tour-de-france--a5.png",
          "alt": "Black-figure Panathenaic prize amphora showing a row of nude bearded runners in a foot race",
          "credit": "Euphiletos Painter, Panathenaic prize amphora (c. 530 BC), Metropolitan Museum of Art, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "oregon-wildfire-fourth-firefighter-dies",
    "headline": "A fourth firefighter dies as fast-moving wildfires threaten a central Oregon town",
    "overview": "A fourth firefighter died from injuries suffered in a June wildland fire in Colorado, authorities said, as fast-moving wildfires bore down on a town in central Oregon. Crews scrambled to protect homes amid dry, windy conditions across the American West. The deaths underscore a punishing and dangerous fire season.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxNYlpoV2d0cFRIeUdhMWF5NGhFY1RZTEd3TVU5a2h5dlUtNlVWNzRfSFVMVEJLSE9nS2Rvb05ITjI1N3VOeWVWQnNwSnBMOTk2dnNnSVM0NWhVUVQwN0I3MERyNUxHT2hva1ZsTGZnbTI5ZFRuWkdfM3duelBLd0tQS1RSbUZYQkYzSm1xNU4zWjM4YklKdmtjT2NBR18xVlhwaXNJ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPdXRZUnJqel9YSUhVSTM1OC1abUxxZTYwZy1HTlliYzZRYk4xTXpDTWJSRy1CdVZOeF9weWpPeTRIdUI2ek9vRGJjVTNSUWgtalJsM1BITjhsTXpFeDB6VThpelhYeW1RVUI5MWJkY2NRUTc5a2JDMmdQRElXVXBGRmZiSUNNeC13anVkZF85VHgyQU83TFVEaGNHRGFKVzd4WmF5VjBmRlg0WE9HdTFYV1lmRG9QYXcyTFE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/oregon-wildfire-fourth-firefighter-dies.png",
      "alt": "Wildland firefighters working a forest wildfire in the United States",
      "credit": "U.S. Forest Service, Public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome (64 CE)",
        "excerpt": "The night brought strong winds and the flames rapidly spread along the full length of the Circus. The fire expanded through an area of narrow, twisting streets and closely located apartment blocks.",
        "source": "Wikipedia, 'Great Fire of Rome' (drawing on Tacitus, Annals XV)",
        "href": "https://en.wikipedia.org/wiki/Great_Fire_of_Rome",
        "image": {
          "src": "/covers/oregon-wildfire-fourth-firefighter-dies--a0.png",
          "alt": "Carl Theodor von Piloty, 'Nero auf den Trümmern Roms' (Nero on the Ruins of Rome), 1861, depicting the emperor amid the burning city",
          "credit": "Carl Theodor von Piloty (1861), Lenbachhaus; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "historical",
        "title": "The Great Chicago Fire (1871)",
        "excerpt": "The fire killed approximately 300 people, destroyed 17,000 structures across roughly 3.3 square miles (9 km2), and left more than 100,000 residents homeless.",
        "source": "Wikipedia, 'Great Chicago Fire'",
        "href": "https://en.wikipedia.org/wiki/Great_Chicago_Fire",
        "image": {
          "src": "/covers/oregon-wildfire-fourth-firefighter-dies--a1.png",
          "alt": "Currier & Ives lithograph 'Chicago in Flames' (1871), showing crowds fleeing across a bridge as the city burns behind them",
          "credit": "Currier & Ives (1871); Wikimedia Commons, public domain"
        }
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II — the burning of Troy (Dryden translation)",
        "excerpt": "The palace of Deiphobus ascends\nIn smoky flames, and catches on his friends.\nUcalegon burns next: the seas are bright\nWith splendour not their own, and shine with Trojan light.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm",
        "image": {
          "src": "/covers/oregon-wildfire-fourth-firefighter-dies--a2.png",
          "alt": "Painting of an ancient city consumed by fire, evoking the conflagration of Troy",
          "credit": "Hubert Robert, 'The Fire of Rome' (1785), Musée Malraux, Le Havre; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II — Phaethon sets the world ablaze (More translation)",
        "excerpt": "Great cities perish with their walls, and peopled nations are consumed to dust—the forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book II, trans. Brookes More (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2",
        "image": {
          "src": "/covers/oregon-wildfire-fourth-firefighter-dies--a3.png",
          "alt": "Turner's blazing sky and flames over a city, evoking a world set on fire",
          "credit": "J.M.W. Turner (1834–35), Philadelphia Museum of Art; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons' (1834–35)",
        "excerpt": "Turner witnessed the Parliament fire of 16 October 1834 from the banks of the Thames and rendered it as an inferno of molten light. Flames engulf St Stephen's Hall while the reflected blaze turns the river and sky incandescent, dwarfing the crowds and firefighting boats below. The painting captures the sublime terror of a fire that outpaces every human effort to contain it.",
        "source": "J.M.W. Turner, oil on canvas, Philadelphia Museum of Art; Wikipedia article on the painting",
        "href": "https://en.wikipedia.org/wiki/The_Burning_of_the_Houses_of_Lords_and_Commons",
        "image": {
          "src": "/covers/oregon-wildfire-fourth-firefighter-dies--a4.png",
          "alt": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons, October 16, 1834', flames and glowing sky reflected on the Thames",
          "credit": "J.M.W. Turner (1834–35), Philadelphia Museum of Art; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, 'The Fire of Rome' (1785)",
        "excerpt": "Robert stages the ancient catastrophe as a theatre of the sublime: monumental architecture looms over a canal and bridge while flames and roiling smoke devour the buildings beyond. Tiny figures scatter in panic across the steps, powerless against the advancing conflagration. The grandeur of stone is set against the terror of fire that reduces a city to ruin.",
        "source": "Hubert Robert, oil on canvas, Musée Malraux (MuMa), Le Havre; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Hubert_Robert_-_The_Fire_of_Rome_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/oregon-wildfire-fourth-firefighter-dies--a5.png",
          "alt": "Hubert Robert, 'The Fire of Rome' (1785), figures fleeing beneath monumental architecture as flames and smoke rise behind",
          "credit": "Hubert Robert (1785), Musée Malraux, Le Havre; Wikimedia Commons, public domain"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "ukraine-holiday-camp-attack",
    "headline": "Attack on a holiday camp in Russian-held Ukraine kills 12, officials say",
    "overview": "At least 12 people were killed in an attack on a holiday camp in the Russian-controlled part of Ukraine, officials said, with Russia blaming a Ukrainian strike. Kyiv did not immediately confirm responsibility as each side traded accusations over civilian casualties. The strike added to a mounting toll from attacks across the front.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxNZktqZUdSTlpXWEtjQ0xIX1dITkxTWHBEaElnTUdWbHU2RDR4ZFppeERKT1NRRTZ2aFRIbTVqRG5pZ1F3LUdKUDZSTHhjN1RFVmlxSVI4YzZEaDhXOFUyRXhLOFJzZm5pcTF1TlhMSEVLMkR1UmJNN1BQd0dTTDg0RGJlN0kxc0g5eHZfUlVLVkQ0QUJLOGstNHM4YXdtdEJOUnNXRXc5Y183Q1NNLTBMbF93SFh1MlhMU3UxRFU2MURHQXc4?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNeXJ5QTJWbFFBczNEWDVtSVNpcFV4ZFlRbkZZb1lpVkx4UkViZGdRSW0tTlN1SkRvS2dRY1kzSnV1VmhuQ0VKUy05WmtBaWlIZ0tTYnpWanZ6ZVFXb0VKOUd2Ukl1bENYYXJJWUY3V080eUJzVElZUWhsZU83ZVdJQ09XYW5pbGpxVFFiT2FITW9NblFjOHVKTjhHQ0xMLWRrblAwVi1EbXhSWmpFZkxzMFNEM2dKMDVSU1JnNEtPRWhsZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/ukraine-holiday-camp-attack.png",
      "alt": "Quiet wooden cabins beside a lake at a holiday camp",
      "credit": "Chris Light, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Siege of Melos (416 BC)",
        "excerpt": "In 416 BC the Athenians besieged the small, neutral island of Melos and demanded its surrender. When the Melians refused, the Athenians put every grown man to death and sold the women and children into slavery, a fate that became antiquity's byword for the ruthless logic of the strong against the defenceless.",
        "source": "Thucydides, History of the Peloponnesian War (via Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Siege_of_Melos",
        "image": {
          "src": "/covers/ukraine-holiday-camp-attack--a0.png",
          "alt": "The Aegean island of Melos (Milos), site of the 416 BC Athenian siege",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Bombing of Guernica (1937)",
        "excerpt": "On 26 April 1937, on a crowded market day, German and Italian aircraft supporting Franco's Nationalists bombed the Basque town of Guernica, killing scores of civilians and destroying about three-quarters of the town. It became the twentieth century's emblem of aerial war waged against a defenceless civilian population.",
        "source": "Bombing of Guernica, Spanish Civil War (via Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Bombing_of_Guernica",
        "image": {
          "src": "/covers/ukraine-holiday-camp-attack--a1.png",
          "alt": "The ruins of Guernica after the 1937 bombing",
          "credit": "Bundesarchiv, Bild 183-H25224 / Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Euripides, The Trojan Women (trans. Gilbert Murray)",
        "excerpt": "Up from the earth, O weary head!\nThis is not Troy, about, above—\nNot Troy, nor we the lords thereof.\nThou breaking neck, be strengthenèd!",
        "source": "Euripides, The Trojan Women, translated by Gilbert Murray (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/35171/35171-h/35171-h.htm"
      },
      {
        "category": "literary",
        "title": "Wilfred Owen, \"Anthem for Doomed Youth\"",
        "excerpt": "What passing-bells for these who die as cattle?\nOnly the monstrous anger of the guns.\nOnly the stuttering rifles' rapid rattle\nCan patter out their hasty orisons.",
        "source": "Wilfred Owen, Poems (1920), Wikisource",
        "href": "https://en.wikisource.org/wiki/Poems_by_Wilfred_Owen/Anthem_for_Doomed_Youth"
      },
      {
        "category": "artistic",
        "title": "Francisco Goya, The Third of May 1808 (1814)",
        "excerpt": "Goya's canvas shows a firing squad of faceless soldiers gunning down unarmed townsfolk by lantern-light; a man in a white shirt throws his arms wide before the levelled rifles, while the bodies of those already shot lie bleeding at his feet. A local atrocity is transformed into a timeless image of ordinary people slaughtered by war.",
        "source": "Francisco Goya, The Third of May 1808, Museo del Prado",
        "href": "https://en.wikipedia.org/wiki/The_Third_of_May_1808",
        "image": {
          "src": "/covers/ukraine-holiday-camp-attack--a4.png",
          "alt": "Goya's The Third of May 1808, depicting the night-time execution of Spanish civilians",
          "credit": "Francisco Goya, 1814, Museo del Prado / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Mozart, \"Lacrimosa\" from the Requiem in D minor (K. 626)",
        "excerpt": "Lacrimosa dies illa / Qua resurget ex favilla / Judicandus homo reus.",
        "source": "W. A. Mozart, Requiem (K. 626), \"Lacrimosa\" — left unfinished at his death in 1791 (via Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Lacrimosa_(Requiem)",
        "image": {
          "src": "/covers/ukraine-holiday-camp-attack--a5.png",
          "alt": "A page of the autograph working manuscript of Mozart's Requiem (K. 626)",
          "credit": "W. A. Mozart autograph manuscript / Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "ukraine-drone-strikes-russian-refineries",
    "headline": "Ukrainian drones strike a Russian oil refinery and disrupt operations in Yekaterinburg",
    "overview": "A drone strike sparked a fire at Russia's Tyumen oil refinery that was later extinguished, officials said, as Ukraine pressed its campaign against Russian energy and logistics. A separate drone threat over Yekaterinburg disrupted operations at the online retailer Wildberries and an athletics championship. The deep strikes highlight Ukraine's growing reach far behind the front line.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQU0JlWmlacURnU3BGX1NNdGhGcFRPRzM5TnpsY0JQUGkxWnQ2T08zcmFWZTZKOGV3TmlRQU9xVDZ5R1VyRnk3a1g0M0E0MVZFbXQ0eE1DMXdfTGVBZFpVMTdHQVZTdnF3azk5Nk5SOTBzVWFweXRzd2dRbjJlcUVnV1BzVnJHZHI0MW9OUm4zLUkxeF9EeGtvUHhJLUdKZmwxR2s0d0VBZXE3WloxSzFBUg?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxOVFBONThGaFFBdndNbFc1cEFaZGhXVWtKcS1jcWJLLWctZUQ5eTNWWjNnUzVvY0dIYWNuczc1dlhiZ0JCQkVROGlsQ3ZRQzB4SVpMQmliOF9qMEtORDFZVWNTc3FzT1hEZnZ1UVZfdnNsWmg2bFZzNlRWenNRdGRnV29IYzRralktWjUzVzNOLTJYSXRNLVBWZ1JCdngycXFoNW5CYk9wMUtEcUFrTVRIY1hLYThDb2ZrS0E?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/ukraine-drone-strikes-russian-refineries.png",
      "alt": "An oil refinery lit up with flare stacks at night",
      "credit": "Shannon Dosemagen, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sherman's March to the Sea (1864)",
        "excerpt": "In late 1864, Union General William Tecumseh Sherman cut loose from his supply lines and drove his armies from the burning ruins of Atlanta to the sea, deliberately destroying the railroads, mills, granaries and plantations that fed and financed the Confederacy. His aim was not to defeat an army in the field but to carry the war home to the enemy's heartland and make the population feel the hard hand of war. The campaign became the archetype of striking an adversary's supply base and morale deep behind the front.",
        "source": "Wikipedia — Sherman's March to the Sea",
        "href": "https://en.wikipedia.org/wiki/Sherman%27s_March_to_the_Sea",
        "image": {
          "src": "/covers/ukraine-drone-strikes-russian-refineries--a0.png",
          "alt": "Engraving of Sherman's March to the Sea, Union troops destroying railroads and property",
          "credit": "Engraving by Alexander Hay Ritchie after F. O. C. Darley, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The Doolittle Raid on Tokyo (1942)",
        "excerpt": "On 18 April 1942, sixteen B-25 bombers led by Lieutenant Colonel James Doolittle lifted off from the carrier USS Hornet and struck Tokyo and other Japanese cities, the first air raid to reach the Japanese home islands. Militarily the damage was slight, but the raid shattered the illusion that the homeland was beyond reach and forced Japan to divert resources to defense. It stands as a classic instance of a small, daring force carrying fire to an enemy that believed itself safe far behind the front.",
        "source": "Wikipedia — Doolittle Raid",
        "href": "https://en.wikipedia.org/wiki/Doolittle_Raid",
        "image": {
          "src": "/covers/ukraine-drone-strikes-russian-refineries--a1.png",
          "alt": "A U.S. Army B-25 Mitchell bomber taking off from the deck of USS Hornet for the Doolittle Raid",
          "credit": "U.S. Navy photograph, 1942, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book XVI (trans. Alexander Pope) — the fire at the Greek ships",
        "excerpt": "Divine Achilles view’d the rising flames, / And smote his thigh, and thus aloud exclaims: / “Arm, arm, Patroclus! Lo, the blaze aspires! / The glowing ocean reddens with the fires. / Arm, ere our vessels catch the spreading flame; / Arm, ere the Grecians be no more a name;”",
        "source": "Homer, The Iliad, Book XVI, translated by Alexander Pope (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt",
        "image": {
          "src": "/covers/ukraine-drone-strikes-russian-refineries--a2.png",
          "alt": "Jacques-Louis David, The Funeral of Patroclus (1778)",
          "credit": "Jacques-Louis David, 1778, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Judges 15:4–5 (King James Version) — Samson fires the Philistines' fields",
        "excerpt": "And Samson went and caught three hundred foxes, and took firebrands, and turned tail to tail, and put a firebrand in the midst between two tails. And when he had set the brands on fire, he let them go into the standing corn of the Philistines, and burnt up both the shocks, and also the standing corn, with the vineyards and olives.",
        "source": "The Holy Bible, King James Version, Judges 15:4–5 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges",
        "image": {
          "src": "/covers/ukraine-drone-strikes-russian-refineries--a3.png",
          "alt": "Old master engraving of Samson setting the Philistines' cornfields ablaze with firebrands tied to foxes",
          "credit": "Thesaurus sacrarum historiarum veteris testamenti series, Rijksmuseum, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "John Martin, \"The Destruction of Sodom and Gomorrah\" (1852)",
        "excerpt": "John Martin's vast canvas turns divine judgment into a spectacle of fire, as sheets of flame and blood-red light engulf the doomed cities while tiny figures flee a wall of incandescent destruction. The scale dwarfs humanity, insisting that no city is too proud or too distant to be reduced to ash. It is a vision of conflagration brought upon a people who believed themselves secure.",
        "source": "Wikipedia — The Destruction of Sodom and Gomorrah (John Martin, Laing Art Gallery)",
        "href": "https://en.wikipedia.org/wiki/The_Destruction_of_Sodom_and_Gomorrah",
        "image": {
          "src": "/covers/ukraine-drone-strikes-russian-refineries--a4.png",
          "alt": "John Martin's apocalyptic painting of Sodom and Gomorrah consumed by fire",
          "credit": "John Martin, 1852, Laing Art Gallery, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, \"Ride of the Valkyries\" (Die Walküre, 1856)",
        "excerpt": "Wagner's surging brass and galloping strings conjure armored war-maidens riding through storm clouds to gather the slain, martial fury made audible. The music has become the sound of overwhelming force descending from the sky, exhilarating and dreadful at once. It captures the theme of relentless power arriving from afar to bring fire and reckoning.",
        "source": "IMSLP — Die Walküre, WWV 86B (Richard Wagner)",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)",
        "image": {
          "src": "/covers/ukraine-drone-strikes-russian-refineries--a5.png",
          "alt": "Cesare Viazzi's painting La cavalcata delle Valchirie (The Ride of the Valkyries)",
          "credit": "Cesare Viazzi (1857–1943), via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "humpback-whale-supergroups-rebound",
    "headline": "Scientists document humpback whale 'supergroups' as populations rebound from whaling",
    "overview": "Researchers documented large feeding 'supergroups' of humpback whales - including a gathering some 300 strong caught on camera - as evidence that populations are rebounding decades after commercial whaling. Scientists cautioned that the Iran war and related disruptions could pose new dangers to the animals. The findings offer a rare conservation success story amid mounting ocean threats.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOZ01jenB2Z29iYVlCdWFzRENLRHhCVm9MNEYtN1NpMlo5M1p3UGZQbmNLc0loUzdId2tEUnluaXNYOTMxSkdpUzhaeG9Fa1NYS3hyMG5VMUh0MDNtS0VWRW5PSVl6ckdTYXVHcjU0MEUzbFdMNjlsM2NVcUN3VjBVRHQ5WUp6MXpPbW9VaURzYWw3bktCU2JyYzV0UERyWTUzOUdOalhR?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxQY1ZVSG5VeDVkYWpsYU9VdzU1RGxUVEE5TFZxVVlqYlpDcTZhTUtoMnlvMmVubHY4by0xOWhJUkJhRTVRT3A5bmtKakZjRW1ZejhTQlUxenB2VU5ueG5IUDl2QmNQWkozN2JPLTZEcFlveFd1VEtUc3lJSzBqdVU2TUVNWU9BdW1DWV81bEl0S0l0SUdRUFV2TW50Zl9ROWs4bFZwME02b2tOYlRNTzFHaXkxTEZxaFZqMmstMHV3blZ2RlJTNnd3WnZkdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/humpback-whale-supergroups-rebound.png",
      "alt": "A humpback whale breaching out of the ocean surface",
      "credit": "Giles Laurent, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The whaleship Essex, rammed and sunk by a sperm whale (1820)",
        "excerpt": "On 20 November 1820, the Nantucket whaleship Essex was stove in and sunk in the South Pacific by an enraged bull sperm whale estimated at some 85 feet long, which rammed the 238-ton vessel twice before it capsized. Twenty men escaped in three small whaleboats, but months of starvation at sea drove the survivors to cannibalism, and only eight lived to be rescued. Their ordeal, at the height of America's whaling age, later helped inspire Melville's Moby-Dick.",
        "source": "Wikipedia: Essex (whaleship)",
        "href": "https://en.wikipedia.org/wiki/Essex_(whaleship)",
        "image": {
          "src": "/covers/humpback-whale-supergroups-rebound--a0.png",
          "alt": "Engraving of a whale destroying a whaleboat, hurling harpooners into the sea",
          "credit": "\"Boat Struck by a Whale,\" 19th-century whaling engraving, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The 1986 international moratorium on commercial whaling",
        "excerpt": "After centuries of industrial hunting had driven many great whales to the brink of extinction, the International Whaling Commission adopted a global moratorium on commercial whaling that took effect in 1986. The pause slashed the annual kill from nearly 15,000 whales in 1980 to a few hundred, and gave depleted populations, including humpbacks, the breathing room to begin recovering. It remains one of the signal conservation successes of the modern era, though Japan, Norway and Iceland continued to hunt.",
        "source": "Wikipedia: International Whaling Commission",
        "href": "https://en.wikipedia.org/wiki/International_Whaling_Commission",
        "image": {
          "src": "/covers/humpback-whale-supergroups-rebound--a1.png",
          "alt": "Currier and Ives lithograph of whaleboats closing in on a spouting whale",
          "credit": "Nathaniel Currier, \"The Whale Fishery: 'Laying On',\" public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Herman Melville, Moby-Dick; or, The Whale (1851)",
        "excerpt": "By reason of these things, then, the whaling voyage was welcome; the great flood-gates of the wonder-world swung open, and in the wild conceits that swayed me to my purpose, two and two there floated into my inmost soul, endless processions of the whale, and, midmost of them all, one grand hooded phantom, like a snow hill in the air.",
        "source": "Herman Melville, Moby-Dick; or, The Whale (1851), Chapter 1 'Loomings', Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2701/2701-h/2701-h.htm",
        "image": {
          "src": "/covers/humpback-whale-supergroups-rebound--a2.png",
          "alt": "Whaleboats rowing onto a whale amid spouting spray",
          "credit": "Nathaniel Currier, \"The Whale Fishery: 'Laying On',\" public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Book of Job 41: Leviathan (King James Version)",
        "excerpt": "Canst thou draw out leviathan with an hook? or his tongue with a cord which thou lettest down? ... He maketh the deep to boil like a pot: he maketh the sea like a pot of ointment. He maketh a path to shine after him; one would think the deep to be hoary. ... He beholdeth all high things: he is a king over all the children of pride.",
        "source": "The Book of Job, chapter 41 (King James Version)",
        "href": "https://biblehub.com/kjv/job/41.htm",
        "image": {
          "src": "/covers/humpback-whale-supergroups-rebound--a3.png",
          "alt": "Gustave Dore engraving of a divine figure confronting the coiling sea-monster Leviathan in stormy waters",
          "credit": "Gustave Dore, \"The Destruction of Leviathan\" (1865), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Utagawa Kuniyoshi, Miyamoto Musashi Attacking the Giant Whale (c. 1847)",
        "excerpt": "In this dramatic ukiyo-e woodblock triptych, the celebrated swordsman Miyamoto Musashi stands astride the back of an enormous whale off the coast of Hizen, plunging his sword into the beast as white-flecked waves churn around them. Kuniyoshi renders the leviathan's vast, shaded body through the itabokashi abrasion technique, dwarfing the tiny human figure. The print turns a legendary feat of valor into an image of humanity's awe before, and struggle against, the giants of the deep.",
        "source": "Utagawa Kuniyoshi, ukiyo-e woodblock triptych, c. 1847",
        "href": "https://commons.wikimedia.org/wiki/File:Miyamoto-Musashi-Attacking-Giant-Whale-Utagawa-Kuniyoshi.png",
        "image": {
          "src": "/covers/humpback-whale-supergroups-rebound--a4.png",
          "alt": "Ukiyo-e print of Miyamoto Musashi standing on a giant whale and stabbing it amid churning waves",
          "credit": "Utagawa Kuniyoshi (c. 1847), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Claude Debussy, La Mer (1905)",
        "excerpt": "Debussy's three symphonic sketches conjure the sea in sound: shifting light on water at dawn, the restless play of the waves, and the surging dialogue of wind and ocean. Shimmering strings and swelling brass evoke a vast, living immensity, an aural counterpart to the humpback's watery realm. For its 1905 first edition, the publisher chose a detail of Hokusai's Great Wave as the cover, binding the music forever to the ocean's grandeur.",
        "source": "Claude Debussy, La Mer, three symphonic sketches (1905), score at IMSLP",
        "href": "https://imslp.org/wiki/La_mer_(Debussy,_Claude)",
        "image": {
          "src": "/covers/humpback-whale-supergroups-rebound--a5.png",
          "alt": "Hokusai's Great Wave off Kanagawa as reproduced on the 1905 cover of Debussy's La Mer",
          "credit": "Katsushika Hokusai, \"The Great Wave off Kanagawa,\" used on the 1905 La Mer cover, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "chinese-ai-models-us-inroads",
    "headline": "Cheaper, open Chinese AI models gain ground and make inroads in the US",
    "overview": "Chinese-built AI models are gaining ground with cheaper, more open systems that are winning users inside the United States, according to industry analyses. The advances are pressuring American labs even as one leading Chinese developer, DeepSeek, told investors it was pausing a large fundraising round. The shift is reshaping the global race to build and deploy artificial intelligence.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQdm5uUXhNOEcyUXB6LWVpNDJ3UkJZclpja1ctcFdYclhjenJISmRRZGZTT2hoTDFXa2NuQlVzdGRRYmJWTWRCelg1M3hzWnR4WjBRZThDNjRmckw5c2paZU9pZ282ZVJXeTR6SWxhSG9qdkFUdlkyWUdZRDNPVUVBZGthbExxWThEdW5DWEk1NmJCQUJzT0E?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPWExVWVlHMlpBUVQxbV9rU1NVZ0w2LVlSbVk0RjBtS0dtRjc4TW85M3hGT3hscVdkb3J6ZHhIU1NWMEJ2RGlhdXQwdkQ2cHVYN2RpN2Z4THlfZ3NlREhaa2dhNERLU0xKRENLbTgySE1CalYtdTV3VmFOR2g0SkNtaE9pV3RTdWJRSDNWS092dnFUcExFa0ZhRnBtNjhweXJ4TWhLSUFVVUk5WU14bWNvd2NpNHdOWk1BVklxTmxB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/chinese-ai-models-us-inroads.png",
      "alt": "Close-up of a computer circuit board with chips and components",
      "credit": "Harland Quarrington/MOD, OGL v1.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Sputnik Crisis (1957)",
        "excerpt": "When the Soviet Union lofted the beeping, basketball-sized Sputnik 1 into orbit on October 4, 1957, Americans who had taken their technological supremacy for granted were stunned into what Eisenhower called a wave of near-hysteria. A rival that was assumed to be behind had suddenly leapt ahead, and the shock reverberated through defense, education, and national pride. The panic galvanized the country, spurring the creation of NASA and a full-throttle space race almost overnight.",
        "source": "Wikipedia — Sputnik crisis",
        "href": "https://en.wikipedia.org/wiki/Sputnik_crisis",
        "image": {
          "src": "/covers/chinese-ai-models-us-inroads--a0.png",
          "alt": "Replica of Sputnik 1, the first artificial satellite, at the National Air and Space Museum",
          "credit": "NASA, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "China's Four Great Inventions Spread West",
        "excerpt": "Papermaking, printing, gunpowder, and the compass were perfected in China centuries before Europe possessed them, then seeped westward along trade and conquest routes through the Islamic world. By the time these tools reached European hands, they upended the old order: gunpowder toppled castle walls, the compass opened the oceans, and cheap paper and printing put knowledge within reach of the many. A technology born in one civilization became the engine of a rival's ascent, a diffusion that redrew the balance of power.",
        "source": "Wikipedia — Four Great Inventions",
        "href": "https://en.wikipedia.org/wiki/Four_Great_Inventions",
        "image": {
          "src": "/covers/chinese-ai-models-us-inroads--a1.png",
          "alt": "Frontispiece of the Diamond Sutra (868 CE), the earliest dated printed book, produced in China",
          "credit": "British Library, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound",
        "excerpt": "Yes, and numbers, too, chiefest of sciences, I invented for them, and the combining of letters, creative mother of the Muses' arts, with which to hold all things in memory.",
        "source": "Aeschylus, Prometheus Bound, trans. Herbert Weir Smyth — Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010:card=436",
        "image": {
          "src": "/covers/chinese-ai-models-us-inroads--a2.png",
          "alt": "Peter Paul Rubens, Prometheus Bound (c. 1611–1618), Philadelphia Museum of Art",
          "credit": "Peter Paul Rubens, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Tower of Babel (Genesis 11, King James Version)",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth. ... And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do. Go to, let us go down, and there confound their language, that they may not understand one another's speech.",
        "source": "Genesis 11:4, 6-7, King James Version",
        "href": "https://biblehub.com/kjv/genesis/11.htm",
        "image": {
          "src": "/covers/chinese-ai-models-us-inroads--a3.png",
          "alt": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna",
          "credit": "Pieter Bruegel the Elder, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Heinrich Füger, Prometheus Brings Fire to Mankind (1817)",
        "excerpt": "In Heinrich Füger's luminous canvas, the Titan Prometheus leans toward a huddle of newly made mortals and touches a torch to kindle the first human flame. Light spills from his hand into the darkness, a visual hymn to the moment a guarded power passes from the gods to ordinary people. The painting frames the gift of fire as the gift of knowledge itself, radiant, irreversible, and destined to remake the world of those who receive it.",
        "source": "Heinrich Füger, oil painting, Liechtenstein collection",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/chinese-ai-models-us-inroads--a4.png",
          "alt": "Heinrich Füger, Prometheus Brings Fire to Mankind (1817), Prometheus kindling fire for mortals",
          "credit": "Heinrich Füger, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, The Sorcerer's Apprentice (1897)",
        "excerpt": "Paul Dukas's symphonic poem L'apprenti sorcier, based on Goethe's ballad, sets to music the parable of a novice who seizes his master's spell and unleashes a force he cannot command. The bewitched broom marches on and multiplies, its relentless, quickening motif building toward chaos as the apprentice discovers that a powerful tool, once released, obeys no one. It is a vivid musical warning about wielding capabilities faster than one can control them.",
        "source": "Paul Dukas, L'apprenti sorcier (symphonic poem, 1897) — IMSLP",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)",
        "image": {
          "src": "/covers/chinese-ai-models-us-inroads--a5.png",
          "alt": "Ferdinand Barth's 1882 illustration of Goethe's Der Zauberlehrling (The Sorcerer's Apprentice)",
          "credit": "Ferdinand Barth (1882), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "us-iran-airstrikes-pause-talks",
    "headline": "US airstrikes on Iran pause as indirect talks press forward",
    "overview": "US airstrikes inside Iran paused as diplomats pressed forward with indirect talks aimed at ending the confrontation, officials said, with the Gulf quiet after Washington held off on further strikes. The fighting had spread to the Red Sea and Caspian even as both sides weighed an off-ramp. It remained unclear whether Washington and Tehran could seize the opening to de-escalate.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQNDJld2dfWkJobEFGdjZJaUQ0LThjRlJfcDFXSVc4dEwxMjhmeVB4QVVqcFVTV3B3RGRFV2NHWmpQdWsyVEx6ckxOdWVXcXcyRmpuejVER2R2alBhTEIyRlhGaHkyUXRQSjNKQ1kySDR4dHZvdm9LTWxMMXZUZ3p1ZUJqOE1WS1VNYlpKalF0NWdsVTdWZ3c0ZGRB?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPYnVSWlhuMFM5LW94bUxZY2tSeDlTX3p1RC1yNk10aVJobG02aVpFeGc3bFowLVZIT01sQk5yekpRWHNUYmhiS3gxSmJTbF9YU2hROXlmQ3hSMVFvaVpDZlhuUXp6N0d4c2lERjlra2NFeXp6Y1Uwd3M2U3prWUp2LTNvMG5Zd05laVktTmJXaXFTNnp4V3U2RkUwV0FNM04yc0dsQWZKc1BtOFk2aDFKQlUwc21pdW9k?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/us-iran-airstrikes-pause-talks.png",
      "alt": "Delegations seated around a table during Iran diplomatic talks",
      "credit": "Omid Vahabzadeh, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Peace of Nicias (421 BC)",
        "excerpt": "After ten years of exhausting war between Athens and Sparta, the Athenian general Nicias brokered a truce meant to halt the killing and restore what had been seized. Sworn to last fifty years, the peace instead proved brittle, honored only in part and unraveling within a few uneasy seasons. It stands as an early lesson that pausing a war is far simpler than making a lasting peace.",
        "source": "Wikipedia — Peace of Nicias (from Thucydides, History of the Peloponnesian War)",
        "href": "https://en.wikipedia.org/wiki/Peace_of_Nicias",
        "image": {
          "src": "/covers/us-iran-airstrikes-pause-talks--a0.png",
          "alt": "Roman marble bust of the historian Thucydides, who chronicled the Peace of Nicias",
          "credit": "Bust of Thucydides, Royal Ontario Museum; photo via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The Cuban Missile Crisis Back-Channel (1962)",
        "excerpt": "With the United States and the Soviet Union at the brink of nuclear war, the decisive moves came not on the battlefield but through quiet intermediaries. A back-channel ran between a Soviet embassy officer and an ABC reporter, while Robert Kennedy met privately with Ambassador Dobrynin to shape a face-saving off-ramp. The public ultimatum was cooled by private bargaining, and both sides stepped back from the edge.",
        "source": "Wikipedia — Cuban Missile Crisis",
        "href": "https://en.wikipedia.org/wiki/Cuban_Missile_Crisis",
        "image": {
          "src": "/covers/us-iran-airstrikes-pause-talks--a1.png",
          "alt": "President Kennedy meets with the Executive Committee during the Cuban Missile Crisis, 29 October 1962",
          "credit": "Cecil Stoughton, White House / National Archives, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book XXIV (Priam and Achilles)",
        "excerpt": "And now tell me and tell me true, for how many days would you celebrate the funeral rites of noble Hector? Tell me, that I may hold aloof from war and restrain the host.",
        "source": "Homer, The Iliad, Book XXIV, translated by Samuel Butler",
        "href": "https://classics.mit.edu/Homer/iliad.24.xxiv.html"
      },
      {
        "category": "literary",
        "title": "Isaiah 2:4 (King James Version)",
        "excerpt": "And he shall judge among the nations, and shall rebuke many people: and they shall beat their swords into plowshares, and their spears into pruninghooks: nation shall not lift up sword against nation, neither shall they learn war any more.",
        "source": "The Holy Bible, King James Version, Isaiah 2:4",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Isaiah"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, \"Minerva Protects Pax from Mars (Peace and War)\" (c. 1629-30)",
        "excerpt": "Rubens painted this allegory during a diplomatic mission to broker peace between Spain and England. At its center Peace nurses a child amid abundance, while the helmeted goddess Minerva thrusts back the armored war-god Mars and the Fury he brings. The canvas is a plea in paint for the fruits of reconciliation over the ruin of conflict.",
        "source": "Peter Paul Rubens, \"Minerva Protects Pax from Mars (Peace and War),\" National Gallery, London",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_(1577-1640)_Peace_and_War_(1629).jpg",
        "image": {
          "src": "/covers/us-iran-airstrikes-pause-talks--a4.png",
          "alt": "Rubens's allegory Peace and War: Minerva drives back Mars while Peace nourishes a child amid figures of plenty",
          "credit": "Peter Paul Rubens, National Gallery, London; image via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Symphony No. 9 \"Ode to Joy\" (1824)",
        "excerpt": "In the choral finale of his last symphony, Beethoven set Schiller's hymn to a world made one, where all people become brothers under a benevolent heaven. Rising from a stormy, fractured opening into a surging anthem of unity, the movement has become the enduring soundtrack of reconciliation after strife. It sounds the hope that even bitter enemies might yet join in a single chorus.",
        "source": "Ludwig van Beethoven, Symphony No. 9 in D minor, Op. 125 (\"Choral\"), finale on Schiller's \"Ode to Joy\"",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/us-iran-airstrikes-pause-talks--a5.png",
          "alt": "Joseph Karl Stieler's 1820 portrait of Ludwig van Beethoven holding a manuscript",
          "credit": "Joseph Karl Stieler, 1820; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "brazil-denies-us-official-visas",
    "headline": "Brazil denies visas to US officials ahead of its elections",
    "overview": "Brazil's government denied visa requests from US officials tied to the country's upcoming elections, officials said, in a pointed diplomatic rebuff to Washington. Brazilian authorities cast the move as protecting the integrity of its vote. The decision sharpened tensions between Brasilia and the Trump administration.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxNOERMYjhmR2VIUUtiVF9uZE1tUjdFMHZ3SUlKS2taYWhHSkJMLVBZZEg4NkxtRFJORk5qaFhsbjRaY2xMemQ4NXIxU1hXbkxMTDN0WU1IaGU3TnUwTDlqM1Z6U0Zqem8wVWJ1dkFxTko0MjFSQ2pMV05LY2taZEktaG8wazVrbldzcExqWkNXM29FOVZXM2NFS2Y0S2M5cGM?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPcFVGYU1LZGlpcDFxdUZsdEhGVVhaX2w4eXlnbmZvN2FJdXUwM2wySWxaMWhvVEZzRUFWWkdkc0JxajBsbkFId3hBRTVsX2VJRkRJX2JKRXFUajNja05FSUFjUWFuaXlLcmZtbXgtUkt0MDFiREdySVotemhGWm1BNmxEU2ZZOWc2S09fYUEyMzlZbXVleVZBaHZOdlZ3RDBIdGJhY0ttYTllUkZzVlYtMTFmeUN2MDA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/brazil-denies-us-official-visas.png",
      "alt": "The Itamaraty Palace, seat of Brazil's Foreign Ministry, in Brasilia",
      "credit": "Lou Fernando, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sparta's Xenelasia: Lycurgus Expels the Foreigners",
        "excerpt": "Nay more, he actually drove away from the city the multitudes which streamed in there for no useful purpose.",
        "source": "Plutarch, Life of Lycurgus (Bernadotte Perrin translation), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2008.01.0047%3Achapter%3D27"
      },
      {
        "category": "historical",
        "title": "The Monroe Doctrine Warns Europe Off the Americas (1823)",
        "excerpt": "the American continents, by the free and independent condition which they have assumed and maintain, are henceforth not to be considered as subjects for future colonization by any European powers.",
        "source": "President James Monroe, Seventh Annual Message to Congress, December 2, 1823 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/James_Monroe%27s_Seventh_State_of_the_Union_Address"
      },
      {
        "category": "literary",
        "title": "Antigone Defies a Ruler's Decree, Sophocles",
        "excerpt": "Yes, since it was not Zeus that published me that edict, and since not of that kind are the laws which Justice who dwells with the gods below established among men. Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods.",
        "source": "Sophocles, Antigone (R. C. Jebb translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "'This sceptred isle': England's Sovereign Fortress, Shakespeare",
        "excerpt": "This royal throne of kings, this sceptred isle, / This earth of majesty, this seat of Mars, / This other Eden, demi-paradise, / This fortress built by Nature for her self / Against infection and the hand of war, / This happy breed of men, this little world, / This precious stone set in a silver sea / Which serves it in the office of a wall / Or as a moat defensive to a house, / Against the envy of less happier lands",
        "source": "William Shakespeare, Richard II, Act II, Scene 1 (John of Gaunt's speech), Representative Poetry Online, University of Toronto",
        "href": "https://rpo.library.utoronto.ca/content/richard-ii-excerpts-royal-throne-kings-sceptred-isle"
      },
      {
        "category": "artistic",
        "title": "Pedro Américo, 'Independência ou Morte' (1888)",
        "excerpt": "Pedro Américo's vast canvas freezes the Cry of Ipiranga: Dom Pedro rises in his stirrups, sword flashing skyward, as his mounted guard wheels to echo the cry for independence. Peasants and an ox-cart look on from the roadside, dwarfed by the sweep of a nation choosing to belong to no one but itself. It is Brazil's founding gesture of sovereignty rendered as pure defiant spectacle.",
        "source": "Pedro Américo, Independência ou Morte (Cry of Ipiranga), 1888, Museu Paulista — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pedro_Am%C3%A9rico_-_Independ%C3%AAncia_ou_Morte_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/brazil-denies-us-official-visas--a4.png",
          "alt": "Dom Pedro I raising his sword amid mounted soldiers, proclaiming Brazil's independence beside the Ipiranga brook",
          "credit": "Pedro Américo, 1888, Museu Paulista; public domain via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "Jean Sibelius, 'Finlandia' (1899)",
        "excerpt": "Sibelius composed Finlandia as a veiled protest against Russian censorship of the Finnish press, disguising defiance as a concert tableau to slip past the imperial authorities. The tone poem storms from brass-heavy menace into a serene, hymn-like anthem that became the sound of a small nation asserting its identity against a great power. Banned under Russian rule, it survived as a rallying cry for sovereignty and self-determination.",
        "source": "Jean Sibelius, Finlandia, Op. 26 (1899), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)",
        "image": {
          "src": "/covers/brazil-denies-us-official-visas--a5.png",
          "alt": "Photographic portrait of Finnish composer Jean Sibelius, circa 1898-1900",
          "credit": "Photograph by Daniel Nyblin, c. 1900, Finnish Heritage Agency; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "kyiv-overnight-russian-strikes",
    "headline": "Overnight Russian attacks trigger fires in Kyiv as strikes kill at least 15 across Ukraine",
    "overview": "An overnight Russian attack triggered fires in the Ukrainian capital, Kyiv, officials said, part of a wave of strikes that killed at least 15 people across the country. Emergency crews battled blazes and searched damaged buildings as air-raid alerts sounded. The barrage marked another grim night in the war.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxPcXdzREJ5ZV91eFBnWDdFcUI3SHhaSFZnMm9abVlaTjBJcEtfUzVJZEJvRUprZ1gzRHduWVVRN2tTZ0E3WnZzb1RJaW9qenhpRW9nRHVtN3U5RHV2N1JqTEJacGJLWHFSZXIwVlk4VV9Bc2JfN2pBaXFIM3VSRW8tZHpEb3R0QVluOFpxUDVweThnd2pieDRjTzdpZW9DRXNFZnZwSFpONFZDTjNGMUtVUg?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxNaldIRnowMFFmQm9kaFJnWEYwZTJJWDNiYnAxaVlVMzhNa1FKeWZiaWMzbDhJTHJiWWFDbGpHTDRCNnRjU3RUeEpRWGY3ZHo1VEtxU3A3b29Yb0doRjV1Qmk4Tkp6NWZWRjlReGxmajdoZVcwTzF3WC1DS0NfUVl2ZW1sX3U2Y0xQQS1PLVlVX3dySFpvdlIxVXlxWTYyb28?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-26",
    "image": {
      "src": "/covers/kyiv-overnight-russian-strikes.png",
      "alt": "War damage in Kyiv following a Russian strike",
      "credit": "National Police of Ukraine, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Blitz: London under the night bombers, 1940-41",
        "excerpt": "For 57 nights from September 1940 the Luftwaffe bombed London almost without pause, and the raids soon spread to other British cities. Some 40,000 to 43,000 civilians were killed and more than a million London homes damaged or destroyed as incendiaries set the capital ablaze and firemen fought the flames through the dark. Night after night ordinary people sheltered in Underground stations and Anderson shelters, and the endurance of a capital under fire became a defining image of the war.",
        "source": "Wikipedia - The Blitz",
        "href": "https://en.wikipedia.org/wiki/The_Blitz",
        "image": {
          "src": "/covers/kyiv-overnight-russian-strikes--a0.png",
          "alt": "A German Heinkel He 111 bomber over the burning docks of Wapping, East London, on the evening of 7 September 1940",
          "credit": "German Luftwaffe photograph, 7 September 1940 (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Gauls sack and burn Rome, 390 BCE",
        "excerpt": "After routing the Roman army at the River Allia, the Gauls under Brennus marched into a largely undefended Rome and gave the city over to pillage and fire; Livy describes how the houses were rifled and then set alight. The defenders withdrew to the Capitoline Hill, holding out through a long siege while flames consumed the streets below, until the Senones finally accepted a ransom and departed. It became the archetype of a great city put to the torch, remembered by Romans for centuries as their darkest night.",
        "source": "Wikipedia - Battle of the Allia",
        "href": "https://en.wikipedia.org/wiki/Battle_of_the_Allia",
        "image": {
          "src": "/covers/kyiv-overnight-russian-strikes--a1.png",
          "alt": "Paul Jamin's 1893 painting Le Brenn et sa part de butin, depicting the Gaulish chief Brennus amid the spoils of a sacked Rome",
          "credit": "Paul Jamin, 'Le Brenn et sa part de butin' (1893), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II - the fall of Troy by night",
        "excerpt": "Troy is no more, and Ilium was a town!\nThe fatal day, th' appointed hour, is come,\nWhen wrathful Jove's irrevocable doom\nTransfers the Trojan state to Grecian hands.\nThe fire consumes the town, the foe commands;\nAnd armed hosts, an unexpected force,\nBreak from the bowels of the fatal horse.",
        "source": "Virgil, Aeneid, Book II (trans. John Dryden), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt",
        "image": {
          "src": "/covers/kyiv-overnight-russian-strikes--a2.png",
          "alt": "Johann Georg Trautmann's oil painting of Troy burning at night, flames rising above the doomed city",
          "credit": "Johann Georg Trautmann, 'Das brennende Troja' (c. 1759-62), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations - a city that weeps in the night",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! She weepeth sore in the night, and her tears are on her cheeks: among all her lovers she hath none to comfort her.",
        "source": "The Book of Lamentations 1:1-2 (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations",
        "image": {
          "src": "/covers/kyiv-overnight-russian-strikes--a3.png",
          "alt": "David Roberts's painting of Jerusalem in flames during the Roman siege of AD 70",
          "credit": "David Roberts, 'The Siege and Destruction of Jerusalem by the Romans Under the Command of Titus, A.D. 70' (1850), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "John Martin, 'The Fall of Nineveh' (1828)",
        "excerpt": "John Martin's vast, apocalyptic canvas shows the ancient capital of Nineveh collapsing in a single catastrophic night, its palaces and temples engulfed as fire rains from a convulsed sky. Tiny human figures scatter and cower along the riverbank while the doomed king prepares his own funeral pyre, dwarfed by the scale of the burning city. It is one of the great images of a metropolis consumed by fire, terror and the sublime spectacle of destruction from above.",
        "source": "John Martin, 'The Fall of Nineveh' (1828), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Fall_of_nineveh.jpg",
        "image": {
          "src": "/covers/kyiv-overnight-russian-strikes--a4.png",
          "alt": "John Martin's The Fall of Nineveh, the ancient city ablaze beneath a stormy sky as its people flee",
          "credit": "John Martin, 'The Fall of Nineveh' (1828), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Shostakovich, Symphony No. 7 'Leningrad' (1941)",
        "excerpt": "Dmitri Shostakovich began his Seventh Symphony in Leningrad in 1941 as German forces closed in and bombs fell on the city, and he dedicated the work to the besieged capital of the north. Its relentless, grinding invasion theme builds through mechanical repetition into a portrait of a city under siege, before the music turns toward grief and hard-won endurance. Performed by starving musicians during the blockade in August 1942 and broadcast over loudspeakers toward the German lines, it became a sounding symbol of a bombarded city that refused to fall.",
        "source": "Dmitri Shostakovich, Symphony No. 7 in C major, Op. 60 'Leningrad' (1941) - Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Symphony_No._7_(Shostakovich)",
        "image": {
          "src": "/covers/kyiv-overnight-russian-strikes--a5.png",
          "alt": "Photographic portrait of the composer Dmitri Shostakovich",
          "credit": "Photo by Roger & Renate Rossing, 1950, Deutsche Fotothek, via Wikimedia Commons (CC BY-SA 3.0 DE)"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "us-strikes-iran-blockade-vessel",
    "headline": "US strikes deeper inside Iran and fires on a merchant vessel trying to breach its blockade of Iranian ports",
    "overview": "US forces struck bridges and infrastructure deeper inside Iran and said they fired on another merchant vessel attempting to run their naval blockade of Iranian ports, a sharp escalation of the confrontation with Tehran. Officials framed the strikes as pressure to force Iran to the table, while critics warned of a widening war. The campaign has stoked fears of broader Middle East conflict and further disruption to global shipping and oil supplies.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxPQ0ZCeFZOaU1KWFIyaUQyMk1WdFdEbDRNaUJBSlpvcUFqSVRUVmRUV19ndXdqZElDeGtTSlNRUXZXYV84WXI0RjB5YlhXMXNJampLTGJKQzJLYnlienItemZMdHBDckZ3c1lCbVpMLTU3cGNXSnBlZ0RmNUpyUHozNlVwaF9OcjZqbGw5ZXByXzZNdw?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPc2RzRDNJNGE4bkhwenhRYkRLV2tqQjh5akI2MkFmQThkZjdhbjVSUU9kLV9XNEUxbnJ3dmExOHpEb3VDOFVyam5sOTNsUGxXTzVkUDZjS0tFa1NPeDQ0MnRTQ1YzbzVWY0RZaWdMMk9JU08xSk5HWXcxV0FrRE83NXlJTERzRF90dVlLbndEYld6MEYwOXNCdW12NWQxTVk?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/us-strikes-iran-blockade-vessel.png",
      "alt": "A US Navy destroyer under way at sea, its guns trained toward the horizon.",
      "credit": "MC2 Jeff Atherton / U.S. Navy, public domain, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Evening Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides, History of the Peloponnesian War, Book VII — the Athenian attempt to break out of the blockaded Great Harbour of Syracuse (413 BC), Richard Crawley translation",
        "excerpt": "[They] put out from their own camp and sailed straight to the barrier across the mouth of the harbour and to the passage left open, to try to force their way out.... When the rest of the Athenians came up to the barrier, with the first shock of their charge they overpowered the ships stationed there, and tried to undo the fastenings; after this, as the Syracusans and allies bore down upon them from all quarters, the action spread from the barrier over the whole harbour, and was more obstinately disputed than any of the preceding ones.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII, Crawley trans., via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt",
        "image": {
          "src": "/covers/us-strikes-iran-blockade-vessel--a0.png",
          "alt": "Marble bust of the historian Thucydides",
          "credit": "Roman-era bust of Thucydides (after a Greek original), Royal Ontario Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Abraham Lincoln, Proclamation 81 — Declaring a Blockade of Ports in Rebellious States (April 19, 1861)",
        "excerpt": "I have further deemed it advisable to set on foot a blockade of the ports within the States aforesaid.... If the same vessel shall again attempt to enter or leave the blockaded port she will be captured and sent to the nearest convenient port for such proceedings against her and her cargo as prize.",
        "source": "Abraham Lincoln, Proclamation 81 (Apr. 19, 1861), via The American Presidency Project (UC Santa Barbara)",
        "href": "https://www.presidency.ucsb.edu/documents/proclamation-81-declaring-blockade-ports-rebellious-states",
        "image": {
          "src": "/covers/us-strikes-iran-blockade-vessel--a1.png",
          "alt": "1861 cartoon map showing a giant snake coiled around the Southern coastline, illustrating the Union naval blockade",
          "credit": "J. B. Elliott, \"Scott's Great Snake\" (the Anaconda Plan), Cincinnati, 1861. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book VI — Hector foresees the fall of besieged Troy, Samuel Butler prose translation (1898)",
        "excerpt": "Well do I know that the day will surely come when mighty Ilius shall be destroyed with Priam and Priam’s people... for none of these do I grieve as for yourself when the day shall come on which some one of the Achaeans shall rob you for ever of your freedom, and bear you weeping away.",
        "source": "Homer, Iliad, Book VI, Butler trans., via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt",
        "image": {
          "src": "/covers/us-strikes-iran-blockade-vessel--a2.png",
          "alt": "Hellenistic marble bust of the poet Homer",
          "credit": "Hellenistic bust of Homer, British Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, The Persians (472 BC) — the Messenger's report of the Persian fleet's destruction at Salamis, E. D. A. Morshead verse translation",
        "excerpt": "The hulls rolled over, and the sea was hid, / Crowded with wrecks and butchery of men. / No beach nor reef but was with corpses strewn, / And every keel of our barbarian host / Hurried to flee, in utter disarray.",
        "source": "Aeschylus, The Persians, Morshead trans., in \"Four Plays of Aeschylus,\" via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/8714/8714-h/8714-h.htm",
        "image": {
          "src": "/covers/us-strikes-iran-blockade-vessel--a3.png",
          "alt": "Dramatic 19th-century painting of the naval Battle of Salamis, with warships clashing amid struggling figures",
          "credit": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (The Battle of Salamis), 1868. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Battle of Trafalgar, 1822–1824, oil on canvas, National Maritime Museum, Greenwich (BHC0565)",
        "excerpt": "Turner's vast canvas collapses the whole of Trafalgar into a single churning instant: Nelson's flagship Victory looms at the centre amid splintering masts, gun-smoke, drowning sailors and a tangle of rigging and signal flags. Commissioned as a patriotic naval triumph, it reads instead as an overwhelming vision of sea-battle as mass destruction. That dread of ships turned to wreckage hangs over any blockaded coast where merchant vessels are fired upon.",
        "source": "J. M. W. Turner, The Battle of Trafalgar (1822–24), National Maritime Museum, Greenwich; via Wikimedia Commons",
        "href": "https://en.wikipedia.org/wiki/The_Battle_of_Trafalgar_(Turner)",
        "image": {
          "src": "/covers/us-strikes-iran-blockade-vessel--a4.png",
          "alt": "Turner's turbulent painting of the Battle of Trafalgar, with warships, smoke and shattered rigging around HMS Victory",
          "credit": "J. M. W. Turner, The Battle of Trafalgar, 1822–1824, National Maritime Museum, Greenwich. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pyotr Ilyich Tchaikovsky, The Year 1812, Festival Overture in E-flat major, Op. 49 (1880)",
        "excerpt": "Tchaikovsky's overture stages an entire war in sound, setting an Orthodox hymn against \"La Marseillaise\" as defending and invading nations, and building to thundering cannon fire and pealing bells. Written to mark Russia's repulse of Napoleon, it turns bombardment itself into music. It is an apt score for a conflict escalating toward the shelling of bridges, ports and cities.",
        "source": "Tchaikovsky, 1812 Overture, Op. 49 (1880), full orchestral score via IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)",
        "image": {
          "src": "/covers/us-strikes-iran-blockade-vessel--a5.png",
          "alt": "Photographic portrait of the composer Pyotr Ilyich Tchaikovsky",
          "credit": "Pyotr Ilyich Tchaikovsky, photograph by Charles Reutlinger. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "berlin-pride-vehicle-crowd",
    "headline": "Vehicle drives into a crowd at Berlin Pride, injuring several, and the parade is called off",
    "overview": "A car drove into crowds at Berlin's Christopher Street Day Pride parade on Saturday, injuring several people, and police called off the march, authorities said. The circumstances and any motive were not immediately clear as officers sealed off the area and investigated. Berlin's CSD is one of Europe's largest LGBTQ celebrations, drawing hundreds of thousands to the city center.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxOTnQ4WGk3NlZjNmNGamVJNW95bk1mNHhmSmlYeTF1aVhRbkhtaUQ0VnZrZk1EUV9XdkhLVERhYmY0SzdINGNLaUotLTA1NG9zOEZSYmR1WWsydFlDVHdzdUp0bFNIVjFLWDI5LTJYbVVtWFZ3SzcydzRFLUZJb2pvMGpMQXBsRHlTLV9rbWRhTDBOWTJFaGgxOE1Kak5LNXFmMFRXdFFhdXU?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/clyqzylz3zno?at_medium=RSS&at_campaign=rss"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/berlin-pride-vehicle-crowd.png",
      "alt": "Rainbow Pride flags raised above a dense street crowd in a European city.",
      "credit": "C.Suthorn, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Massacre of Thessalonica, 390 CE — Roman soldiers cut down civilians assembled in the city's hippodrome under Emperor Theodosius I",
        "excerpt": "In the spring of 390 the people of Thessalonica had gathered in their hippodrome for the games, one of the great public pleasures of the late-Roman city, when soldiers were loosed upon the crowd; church historians report that thousands of unarmed men, women and children were butchered in a few hours. A place built for shared spectacle and joy became, without warning, a killing floor. The atrocity so shocked the age that Bishop Ambrose of Milan barred the emperor from communion until he did public penance — an early insistence that a slaughter in the midst of a crowd could not simply be forgotten.",
        "source": "Massacre of Thessalonica (390 AD), Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Massacre_of_Thessalonica",
        "image": {
          "src": "/covers/berlin-pride-vehicle-crowd--a0.png",
          "alt": "Baroque painting of Saint Ambrose in bishop's robes standing on cathedral steps, raising a hand to bar the armored Emperor Theodosius and his retinue from entering.",
          "credit": "Anthony van Dyck, Saint Ambrose barring Theodosius from Milan Cathedral, c. 1619–20 (National Gallery, London). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Stonewall uprising, Christopher Street, New York, June 28, 1969 — police raid a gay bar and a marginalized community is forced to defend its own gathering place",
        "excerpt": "Before dawn on June 28, 1969, police raided the Stonewall Inn on Christopher Street, a refuge for the most marginalized of the LGBTQ community — drag queens, trans women and homeless youth who had almost nowhere else safe to gather. The violence of that intrusion into a place of belonging touched off nights of resistance and, a year later, the first Pride marches. The link to Berlin is intimate: its annual parade is called Christopher Street Day, named for this very street, so an attack on the celebration is an attack on the memory the celebration was built to honor.",
        "source": "Stonewall riots, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Stonewall_riots",
        "image": {
          "src": "/covers/berlin-pride-vehicle-crowd--a1.png",
          "alt": "The brick facade of the Stonewall Inn on Christopher Street, its windows hung with rainbow pride flags.",
          "credit": "Rhododendrites, The Stonewall Inn during Pride weekend, 2016. CC BY-SA 4.0, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, \"The Masque of the Red Death\" (1842)",
        "excerpt": "And now was acknowledged the presence of the Red Death. He had come like a thief in the night. And one by one dropped the revellers in the blood-bedewed halls of their revel, and died each in the despairing posture of his fall. And the life of the ebony clock went out with that of the last of the gay. And the flames of the tripods expired. And Darkness and Decay and the Red Death held illimitable dominion over all.",
        "source": "Edgar Allan Poe, \"The Masque of the Red Death,\" via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1064/pg1064.txt",
        "image": {
          "src": "/covers/berlin-pride-vehicle-crowd--a2.png",
          "alt": "Harry Clarke's macabre pen-and-ink illustration of masked revelers recoiling amid the ornate halls of the masque as death intrudes.",
          "credit": "Harry Clarke, illustration for Poe's Tales of Mystery and Imagination, 1919 (British Library). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Euripides, The Bacchae (c. 405 BCE), Gilbert Murray translation",
        "excerpt": "And at the other side / Was Ino rending; and the torn flesh cried, / And on Autonoë pressed, and all the crowd / Of ravening arms. Yea, all the air was loud / With groans that faded into sobbing breath, / Dim shrieks, and joy, and triumph-cries of death.",
        "source": "Euripides, The Bacchae, trans. Gilbert Murray, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/35173/35173-h/35173-h.htm",
        "image": {
          "src": "/covers/berlin-pride-vehicle-crowd--a3.png",
          "alt": "Ancient Greek red-figure vase painting showing maenads in Bacchic frenzy tearing apart the body of Pentheus.",
          "credit": "Attic red-figure cup depicting the death of Pentheus (Louvre G445), c. 480 BCE. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Claude Monet, The Rue Montorgueil in Paris. Celebration of June 30, 1878 (1878), oil on canvas, Musée d'Orsay, Paris",
        "excerpt": "Monet painted a Paris street dissolved in movement and light, its balconies and crowds swallowed by a delirium of tricolour flags on a day France set aside for \"peace and work.\" It is the purest image of public joy — a whole thoroughfare given over to collective celebration, exactly the fragile, exuberant good feeling that a parade like Pride embodies. Set beside the Berlin attack, its fluttering banners and packed, happy street become a portrait of the very thing that violence shatters in an instant.",
        "source": "Claude Monet, The Rue Montorgueil in Paris (1878), Musée d'Orsay; file page via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_The_Rue_Montorgueil_in_Paris._Celebration_of_June_30,_1878_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/berlin-pride-vehicle-crowd--a4.png",
          "alt": "Impressionist painting of a Paris street packed with a crowd beneath dozens of red-white-and-blue French flags on a festival day.",
          "credit": "Claude Monet, The Rue Montorgueil in Paris. Celebration of June 30, 1878, 1878. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gabriel Fauré, Requiem in D minor, Op. 48 (1887–90; concert version 1900)",
        "excerpt": "Fauré called his Requiem a lullaby of death, and it is famously gentle — its Pie Jesu a hushed soprano prayer, its closing In Paradisum a weightless ascent that imagines angels leading the departed into rest rather than a wrathful day of judgment. That consoling, tender voice is what an elegiac work offers a community suddenly bereaved at what should have been a festival. It answers sudden, meaningless violence not with terror but with mourning and the promise of peace for those who were harmed.",
        "source": "Gabriel Fauré, Requiem, Op. 48, full scores via IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Requiem,_Op.48_(Faur%C3%A9,_Gabriel)"
      }
    ],
    "rank": 15
  },
  {
    "slug": "appeals-court-blocks-trump-mail-voting",
    "headline": "US appeals court blocks Trump's order restricting mail-in voting across 23 states",
    "overview": "A federal appeals court ruled that President Trump cannot enforce his executive order curbing mail-in voting, siding with 23 states that had challenged it. The court found the administration overstepped constitutional limits on federal power over elections, which are chiefly run by the states. It is the latest legal defeat for the order, which lower courts had already blocked.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQUVBGajM4Y01KR3FCSm5IT3ZFM1dTSDZ4TEtYY3VQUDJEWk9Lcnh4bE1RTzlvXzAwOHhDSTdVT3FiWWhfYVlfeDNOX0drRVpueUNZdDBuQ005dEVvUUR3S3JmRnplMVFxc2lKaWtaSVg0Ri1JNVJ0c0RUaVBnTlotS3Rsbms5R2RXMGV4bTRqQW51aFpvUC15OUdUZE9OVUhLWVhhWGxNdVJ6VVZq?oc=5"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMiigFBVV95cUxQb1dzZ1lGcXBsWG1aUzN6cHI4WGpIQUFBQmNKaFBJbl8wRVUybWhidGhyLXFLOVFjVGpLS2ZpTWlzV3VDWXBUV3R2SGtjNTV4ZG80N0F1aDBsZlJtQWI5dWExQk1FcmRPOHdjY19nb3I2Rk11N0VoelJWYndzX1JtNThEcDJiaFNZZlE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/appeals-court-blocks-trump-mail-voting.png",
      "alt": "A mail-in ballot envelope being dropped into an official election drop box.",
      "credit": "Michael Barera, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Magna Carta, granted by King John of England, 15 June 1215 (Runnymede), clauses 39-40",
        "excerpt": "No freemen shall be taken or imprisoned or disseised or exiled or in any way destroyed, nor will we go upon him nor send upon him, except by the lawful judgment of his peers or by the law of the land. To no one will we sell, to no one will we refuse or delay, right or justice.",
        "source": "Magna Carta (1215), English translation via the Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/medieval/magna.asp",
        "image": {
          "src": "/covers/appeals-court-blocks-trump-mail-voting--a0.png",
          "alt": "The 1215 Magna Carta, a densely written medieval Latin manuscript on parchment, British Library Cotton MS Augustus II.106",
          "credit": "1215 Magna Carta, British Library Cotton MS Augustus II.106. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Youngstown Sheet & Tube Co. v. Sawyer, 343 U.S. 579 (U.S. Supreme Court, 1952)",
        "excerpt": "At the height of the Korean War, President Truman ordered the federal seizure of the nation's steel mills to avert a strike, claiming inherent executive authority. In a 6-3 decision, the Supreme Court struck the order down, holding that the president has no power to make law or seize private property without authorization from the Constitution or Congress. Like the appeals court's rebuke of an election order, it is a landmark instance of the judiciary halting a president who reached beyond his constitutional bounds, and Justice Jackson's concurrence still frames how far executive power may stretch.",
        "source": "Youngstown Sheet & Tube Co. v. Sawyer (1952), overview via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Youngstown_Sheet_%26_Tube_Co._v._Sawyer"
      },
      {
        "category": "literary",
        "title": "Alexander Hamilton, The Federalist No. 78, 1788 ('The Judiciary Department')",
        "excerpt": "There is no position which depends on clearer principles, than that every act of a delegated authority, contrary to the tenor of the commission under which it is exercised, is void. The interpretation of the laws is the proper and peculiar province of the Courts.",
        "source": "Hamilton, The Federalist No. 78 (1788), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Federalist_Papers/No._78",
        "image": {
          "src": "/covers/appeals-court-blocks-trump-mail-voting--a2.png",
          "alt": "Portrait of Alexander Hamilton in dark coat and white cravat, painted by John Trumbull in 1806",
          "credit": "John Trumbull, Alexander Hamilton, 1806. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Montesquieu, The Spirit of the Laws, 1748 (Book XI, ch. 6, 'Of the Constitution of England'; Nugent trans., 1758)",
        "excerpt": "When the legislative and executive powers are united in the same person, or in the same body of magistrates, there can be no liberty; because apprehensions may arise, lest the same monarch or senate should enact tyrannical laws, to execute them in a tyrannical manner. Again, there is no liberty, if the power of judging be not separated from the legislative and executive powers.",
        "source": "Montesquieu, The Spirit of Laws, Book XI (Nugent translation, 1758), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Spirit_of_Laws_(1758)/Book_XI",
        "image": {
          "src": "/covers/appeals-court-blocks-trump-mail-voting--a3.png",
          "alt": "Portrait of Charles-Louis de Secondat, Baron de Montesquieu, in a powdered wig and formal coat",
          "credit": "Anonymous portrait of Montesquieu, 18th century. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Ambrogio Lorenzetti, Allegory of Good Government, 1338-1339, fresco, Sala dei Nove, Palazzo Pubblico, Siena",
        "excerpt": "In Siena's council hall, Lorenzetti enthroned the Common Good flanked by the virtues, while a separate figure of Justice, guided by Wisdom, balances her scales and binds the citizens together by a cord of concord. Painted to remind the city's magistrates that legitimate rule is tethered to justice and law rather than the will of one man, the fresco is an early civic argument that power divided and answerable produces peace, and power unchecked produces ruin, the very balance the court invoked against an overreaching executive.",
        "source": "Ambrogio Lorenzetti, The Allegory of Good and Bad Government (1338-1339), via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Allegory_of_Good_and_Bad_Government",
        "image": {
          "src": "/covers/appeals-court-blocks-trump-mail-voting--a4.png",
          "alt": "Fresco of the Allegory of Good Government showing an enthroned ruler surrounded by allegorical virtues and the seated figure of Justice with her scales",
          "credit": "Ambrogio Lorenzetti, Allegory of Good Government, 1338-1339, Palazzo Pubblico, Siena. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "George Caleb Bingham, The County Election, 1852, oil on canvas, Saint Louis Art Museum",
        "excerpt": "Bingham crowds the courthouse steps of a Missouri town with citizens on election day: a man swears his oath before casting a ballot, merchants argue with laborers, and party men press their tickets, all under the open eye of the public square. The 'Missouri artist' painted democracy as a raucous, imperfect, but sovereign ritual, elevating the ordinary act of voting into the foundation of self-government. Set beside a ruling that shields mail-in voting across 23 states, it is a vivid reminder that the right to vote is the practice the whole constitutional structure exists to protect.",
        "source": "George Caleb Bingham, The County Election (1852), image and description via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_County_Election.jpg",
        "image": {
          "src": "/covers/appeals-court-blocks-trump-mail-voting--a5.png",
          "alt": "19th-century painting of a crowd of men gathered on courthouse steps in a small town on election day, one voting while others talk and campaign",
          "credit": "George Caleb Bingham, The County Election, 1852, Saint Louis Art Museum. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "maine-democrats-troy-jackson-collins",
    "headline": "Maine Democrats nominate Troy Jackson to challenge Republican Senator Susan Collins",
    "overview": "Maine Democratic delegates chose former state Senate president Troy Jackson as their nominee to face longtime Republican Senator Susan Collins, after the party's earlier candidate dropped out. Jackson, a logger known for his populist streak, will contest one of the most closely watched Senate races of the cycle. Collins is seeking re-election in a state that has leaned Democratic in recent presidential votes.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxPY2VXSjFtQjQ0N0t5eVZCOVhTUUFiWU9XWWg3bTk1RE81UXBuT21DZ1hmV0FYSnhSakhiZ0NVa096M1o5M041T0Jfc0tPTzBtMnEyejFCVTk3RkpQTkw4VVJXZXJRTEVaTzBEdndSR0FteHIwRngyYWpGOW9MT0RSN0UzSnh3RTY3SjMxM0gtTHFFWXl5TjZjSjlNSm0zUTVmX3lzNGcxZ1lsNzA?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPSllqZ2RPVm9vaWtHRlBld0ZGbmlwVlcyMjl2WVNPWHNjNmpGeEJETEhmV1dKMTI1Ukcweng0NnVhUkU1YkFsemFXZ2ZwU1RUaWE1eWg3Q3dSYmhwcF9kQ0FpaVBFSE81NkIzcEloczQ4WWZmLVN0QzM1enA0MkhnbGlteWdvMjFwTnA4ZUQycnRjOHpLTllNNGwyRGdJU0tjUEJpbWxhX2JJdGhLd0ZlWlotTU1Xczc1d085ZFBB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/maine-democrats-troy-jackson-collins.png",
      "alt": "The white dome of the Maine State House rising above summer trees in Augusta.",
      "credit": "Albany NY (English Wikipedia), CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Lucius Quinctius Cincinnatus summoned from his plough to the dictatorship (458 BC), as told in Livy, Ab Urbe Condita (History of Rome), Book III, ch. 26, Rev. Canon Roberts trans. (E. P. Dutton, 1912)",
        "excerpt": "There he was found by the deputation from the senate either digging out a ditch or ploughing, at all events, as is generally agreed, intent on his husbandry.",
        "source": "Livy, History of Rome, Book III, ch. 26, Roberts translation, via Perseus Digital Library (Tufts)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book%3D3:chapter%3D26",
        "image": {
          "src": "/covers/maine-democrats-troy-jackson-collins--a0.png",
          "alt": "Neoclassical painting of Cincinnatus, still barefoot beside his plough, receiving the robes of office from Roman senators.",
          "credit": "Juan Antonio Ribera, Cincinnatus Abandons the Plough to Dictate Laws to Rome, c. 1806, Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Abraham Lincoln as \"The Rail-Splitter,\" the manual laborer turned surprise nominee of the 1860 presidential contest",
        "excerpt": "At the 1860 Illinois Republican convention John Hanks marched in bearing two weathered fence rails placarded \"Abraham Lincoln, The Rail Candidate,\" advertising that the nominee had once split rails with his own hands on the frontier. The image of the axe-swinging woodsman rising to challenge the political establishment became the defining emblem of his campaign, seized on by supporters and lampooned by opponents alike in prints such as the Currier & Ives cartoon of Lincoln straddling the Republican platform rail. Like Troy Jackson the logger, Lincoln turned the calluses of physical work into a claim on public office.",
        "source": "Louis Maurer / Currier & Ives, \"The Rail Candidate\" (1860), Library of Congress Prints and Photographs Division, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Rail_Candidate.jpg",
        "image": {
          "src": "/covers/maine-democrats-troy-jackson-collins--a1.png",
          "alt": "1860 political cartoon of Abraham Lincoln uneasily straddling a fence rail labeled Republican Platform, carried by two figures.",
          "credit": "Louis Maurer, published by Currier & Ives, The Rail Candidate, 1860. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Plutarch, Lives, \"Marcus Cato\" (the Elder), John Dryden translation revised by A. H. Clough — on the farmer-statesman and the Roman \"new man\"",
        "excerpt": "Now it being the custom among the Romans to call those who, having no repute by birth, made themselves eminent by their own exertions, new men or upstarts, they called even Cato himself so, and so he confessed himself to be as to any public distinction or employment.",
        "source": "Plutarch, Lives, \"Marcus Cato,\" Dryden trans. (rev. Clough), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Lives_(Dryden_translation)/Marcus_Cato"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"I Hear America Singing,\" from Leaves of Grass (1860; text of the 1881–82 \"Inscriptions\")",
        "excerpt": "I hear America singing, the varied carols I hear, ... The wood-cutter's song, the ploughboy's on his way in the morning, or at noon intermission or at sundown,",
        "source": "Walt Whitman, \"I Hear America Singing,\" Leaves of Grass, via Wikisource",
        "href": "https://en.wikisource.org/wiki/I_Hear_America_Singing",
        "image": {
          "src": "/covers/maine-democrats-troy-jackson-collins--a3.png",
          "alt": "Steel-engraved portrait of Walt Whitman in an open-collared workingman's shirt and slouch hat, hand on hip.",
          "credit": "Samuel Hollyer after a daguerreotype by Gabriel Harrison, frontispiece to Leaves of Grass, 1855 (engraving 1854). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "George Caleb Bingham, The County Election, 1852, oil on canvas, Saint Louis Art Museum",
        "excerpt": "Bingham's crowded canvas turns an ordinary election day in rural Missouri into a portrait of frontier democracy itself: farmers, laborers, and townsmen jostle at the courthouse steps to cast their votes, some sober, some already drunk, while candidates court the crowd. It captures exactly the ground on which Troy Jackson's race is fought, the messy, face-to-face contest of ordinary citizens deciding who will represent them. Painted by an artist who was himself a working politician, it insists that self-government is a common man's business.",
        "source": "George Caleb Bingham, The County Election (1852), Saint Louis Art Museum, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_County_Election.jpg",
        "image": {
          "src": "/covers/maine-democrats-troy-jackson-collins--a4.png",
          "alt": "Bustling 19th-century American election-day scene with crowds of men gathered before a courthouse to vote.",
          "credit": "George Caleb Bingham, The County Election, 1852. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jean-François Millet, The Wood Sawyers (Les scieurs de bois), c. 1850–52, oil on canvas, Victoria and Albert Museum, London",
        "excerpt": "Millet gives two laborers straining over a great log the monumental dignity earlier painters reserved for saints and heroes, their bent backs and taut muscles making the sheer physical cost of the work palpable. For a race defined by a logger challenging an entrenched senator, the image is almost literal, the honest exertion of the man who works the woods elevated to the stuff of high art. It embodies the analogy's core theme: the laborer's toil as a source of moral authority.",
        "source": "Jean-François Millet, The Wood Sawyers (c. 1850–52), Victoria and Albert Museum, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Fran%C3%A7ois_Millet_(1814-1875)_-_The_Wood_Sawyers_-_CAI.47_-_Victoria_and_Albert_Museum.jpg",
        "image": {
          "src": "/covers/maine-democrats-troy-jackson-collins--a5.png",
          "alt": "Two peasant laborers bent over a large tree trunk, sawing it with a two-man saw, another figure chopping wood behind them.",
          "credit": "Jean-François Millet, The Wood Sawyers, c. 1850–52, Victoria and Albert Museum. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "trump-clean-energy-grants-canceled-politics",
    "headline": "Trump administration admits it canceled about $7.6 billion in clean-energy grants for political reasons",
    "overview": "The Trump administration acknowledged in a court filing that it canceled roughly $7.6 billion in clean-energy grants concentrated in Democratic-leaning states, effectively conceding the cuts were politically driven. The admission bolsters lawsuits from states, including California, that say they were targeted over their 2024 votes. Critics called it an unlawful use of federal funding as a partisan weapon.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQV3N3WHd1azI0WWVReUxaSUF6eXFDVmp3LTFZeWtxcW1nR1lMVWU0cncySkpPZE1hTm1OSzg3T1dqWGp4eXBTMy1HaEJNZ01va2VTTW11NDE4YWFQMDhSR3dPWWlRbjJnWVcxQjlzdmQxenoxZnRmR0ZGbGpIdUo1NFoyWExEQkluWUhHN2ppallZTnVqeTFDQUZBZENSNVU?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxNcnlIU1dfbG1PVWpRS1lhMEN1U1JIS29kN19iM3ZKSE5OSDRQaFkzT1pOaTVaVkpjQjRpc3VOUmVQWkhnbkY0UUF5cEloclRYSk4yQnM4U21EZW1HN2ZXTlluUjd2QWw3QUNQTHVtQzlmbUxGd0ZNczU3YlN4bnZqcXZUY3FwQjhiUDEwV3RB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/trump-clean-energy-grants-canceled-politics.png",
      "alt": "Rows of solar panels stretching across a utility-scale solar farm under open sky.",
      "credit": "Sarvajanik Puralekh, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Proscriptions of Lucius Cornelius Sulla, Rome, 82 BC",
        "excerpt": "Immediately upon this, without communicating with any of the magistrates, Sylla proscribed eighty persons, and notwithstanding the general indignation, after one day's respite, he posted two hundred and twenty more, and on the third again, as many. He issued an edict likewise, making death the punishment of humanity, proscribing any who should dare to receive and cherish a proscribed person, without exception to brother, son, or parents.",
        "source": "Plutarch, Life of Sylla, Dryden translation revised by A. H. Clough, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Sylla",
        "image": {
          "src": "/covers/trump-clean-energy-grants-canceled-politics--a0.png",
          "alt": "Marble bust traditionally identified as the Roman dictator Sulla, Glyptothek, Munich",
          "credit": "Bust of Sulla, Glyptothek Munich (inv. 309). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Jacksonian 'spoils system' and Senator William L. Marcy's Senate defense, 25 January 1832",
        "excerpt": "After Andrew Jackson's 1829 inauguration, federal offices were purged and handed to loyal supporters, turning public appointments into rewards for political friends and instruments against opponents. Defending the practice on the Senate floor, New York's William L. Marcy coined its enduring motto, avowing that politicians 'see nothing wrong in the rule, that to the victor belong the spoils of the enemy.' The story's admission that grants were steered by which states voted the right way is the modern face of the same principle: public resources treated as partisan booty.",
        "source": "William L. Marcy, U.S. Senate speech (1832); overview via Wikipedia, 'Spoils system'",
        "href": "https://en.wikipedia.org/wiki/Spoils_system",
        "image": {
          "src": "/covers/trump-clean-energy-grants-canceled-politics--a1.png",
          "alt": "Photographic portrait of Senator William L. Marcy of New York",
          "credit": "William L. Marcy, Brady-Handy photograph. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Julius Caesar, Act IV, Scene i (c. 1599)",
        "excerpt": "These many then shall die; their names are prick'd. ... He shall not live; look, with a spot I damn him.",
        "source": "Shakespeare, Julius Caesar, Act IV, Scene i, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1522/1522-h/1522-h.htm",
        "image": {
          "src": "/covers/trump-clean-energy-grants-canceled-politics--a2.png",
          "alt": "The Chandos portrait, believed to depict William Shakespeare",
          "credit": "Attributed to John Taylor, the Chandos portrait of Shakespeare, c. 1600–1610. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "James Madison, The Federalist No. 10 (1787)",
        "excerpt": "By a faction, I understand a number of citizens, whether amounting to a majority or a minority of the whole, who are united and actuated by some common impulse of passion, or of interest, adverse to the rights of other citizens, or to the permanent and aggregate interests of the community. When a majority is included in a faction, the form of popular Government, on the other hand, enables it to sacrifice to its ruling passion or interest both the public good and the rights of other citizens.",
        "source": "James Madison, The Federalist No. 10 (Dawson edition), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Federalist_(Dawson)/10",
        "image": {
          "src": "/covers/trump-clean-energy-grants-canceled-politics--a3.png",
          "alt": "Painted portrait of James Madison by Gilbert Stuart",
          "credit": "Gilbert Stuart, portrait of James Madison. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Thomas Nast, 'In Memoriam — Our Civil Service As It Was,' Harper's Weekly, 28 April 1877",
        "excerpt": "Nast draws Andrew Jackson triumphantly astride a hog, mounted on a pedestal inscribed 'To the Victors Belong the Spoils,' with 'Fraud,' 'Bribery,' and 'Plunder' among the trophies at his feet. The cartoon skewers the patronage machine that treated government offices and public money as rewards for political loyalty. It resonates directly with a filing conceding that clean-energy grants were canceled to punish states that voted the wrong way — spoils politics in reverse.",
        "source": "Thomas Nast, 'In Memoriam — Our Civil Service As It Was,' Harper's Weekly (1877), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:In_memoriam_-_our_civil_service_as_it_was.jpg",
        "image": {
          "src": "/covers/trump-clean-energy-grants-canceled-politics--a4.png",
          "alt": "Thomas Nast cartoon of Andrew Jackson riding a hog atop a monument reading 'To the Victors Belong the Spoils'",
          "credit": "Thomas Nast, Harper's Weekly, 1877. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Ambrogio Lorenzetti, Allegory of Bad Government (from The Allegory of Good and Bad Government), 1338–1339, Palazzo Pubblico, Siena",
        "excerpt": "Lorenzetti enthrones a horned, fanged figure of Tyranny flanked by personified vices — Cruelty, Fraud, Fury, Division and War — while Justice lies bound and helpless beneath him. Painted to warn Siena's rulers what befalls a city governed by self-interest rather than the common good, the fresco is an early visual anatomy of power turned against the people it should serve. It illuminates a government that, by its own admission, wielded the public purse to reward allies and punish opponents.",
        "source": "Ambrogio Lorenzetti, Allegory of Bad Government, Palazzo Pubblico, Siena, via Wikimedia Commons",
        "href": "https://en.wikipedia.org/wiki/The_Allegory_of_Good_and_Bad_Government",
        "image": {
          "src": "/covers/trump-clean-energy-grants-canceled-politics--a5.png",
          "alt": "Fresco panel of Tyranny enthroned amid personified vices, with bound Justice below",
          "credit": "Ambrogio Lorenzetti, Allegory of Bad Government, 1338–1339, Palazzo Pubblico, Siena. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "samsung-broadcom-200-billion-chip-deal",
    "headline": "Samsung wins a roughly $200 billion Broadcom deal to supply AI chips, boosting its foundry business",
    "overview": "Samsung Electronics secured a partnership with Broadcom worth about $200 billion to make and supply AI chips, a major win for its contract chipmaking, or foundry, business. The multiyear agreement spans memory and foundry technologies as demand for AI hardware surges. It was unveiled as South Korea hosted a gathering of global technology firms.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi3wFBVV95cUxQVVhSemYyWk9XZmJzMXhYLXFvUm1rdElNNW0zYVktUlBGVFdtbHNJa1NBX2gwSGNVbEZpbnlYVi1CcnBvT1BiZEtNSHdDSDllMTNYQXVKMDN2UEdTS2ZOb1FPNzFBMEhpRERtOXVkODJ5ZEEycTVnRXpaTzlsX2Y5ZXdmUndUakpPUlAtaHY3NzIxczd5X3k4ODk0dW9Fenk0TzlCQ2dQaml2aURvTEgtNENFNTVodmcybEVlTGQ5Nmt4Nm9LUTJNOXV2U05jV3ByVzB5cU85OExDRWlKRjlJ?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQV3J0aTJyaWRzektXZUZydTBZNlk0Ymc5Z2pEYzFnR2NkTmNka0JUdFYzTFRQU2lDdnY5aTZJc0tlTGpoUVU3bDY2dXNqUmQzTTRsWkQ5MWlSWDRVLWl0WmViczMxN3E1VzBKa2M5NFBNczdXbFlIa1pjTFExUDVwTElpMFZzb2R3bV9la0FKQTFYUTdMc19qd2NB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/samsung-broadcom-200-billion-chip-deal.png",
      "alt": "A silicon semiconductor wafer of microchip dies reflecting iridescent light.",
      "credit": "Peellden, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Johannes Gutenberg and the invention of the movable-type printing press, Mainz, c. 1450",
        "excerpt": "Around 1450 the goldsmith Johannes Gutenberg combined movable metal type, an oil-based ink, and an adapted screw press into a system for mass-reproducing text, and printed his 42-line Bible by the mid-1450s. A single new manufacturing technology suddenly made copies cheap and abundant, breaking a bottleneck that had constrained the spread of knowledge for a thousand years. Just as a foundry that can churn out chips at scale becomes the substrate of a new economy, the press turned a craft workshop into an engine that reshaped religion, science, and commerce across the world.",
        "source": "Johannes Gutenberg and the printing press (c. 1450), via Wikipedia; image of the Gutenberg Bible, New York Public Library, via Wikimedia Commons",
        "href": "https://en.wikipedia.org/wiki/Johannes_Gutenberg",
        "image": {
          "src": "/covers/samsung-broadcom-200-billion-chip-deal--a0.png",
          "alt": "An open Gutenberg Bible showing two columns of dense Gothic blackletter type on aged vellum pages",
          "credit": "The Gutenberg Bible (Lenox copy), New York Public Library, photographed 2009. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The invention of the transistor at Bell Telephone Laboratories, Murray Hill, New Jersey, 23 December 1947",
        "excerpt": "On 23 December 1947 John Bardeen and Walter Brattain, working under William Shockley at Bell Labs, demonstrated the first point-contact transistor: two gold contacts pressed onto a sliver of germanium that could amplify an electrical signal. This small semiconductor device replaced the bulky, fragile vacuum tube and became the fundamental building block of every computer, phone, and AI accelerator that followed. A colossal deal to manufacture AI chips is the direct descendant of that germanium sliver, the moment the semiconductor age was born.",
        "source": "History of the transistor (Bell Labs, 1947), via Wikipedia; replica image via Wikimedia Commons",
        "href": "https://en.wikipedia.org/wiki/History_of_the_transistor",
        "image": {
          "src": "/covers/samsung-broadcom-200-billion-chip-deal--a1.png",
          "alt": "A replica of the first point-contact transistor: a small triangular wedge and gold contacts mounted above a germanium base on a metal support",
          "credit": "Replica of the first transistor (Bell Labs, 1947). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Francis Bacon, Novum Organum, Book I, Aphorism CXXIX (1620), Spedding translation",
        "excerpt": "Again, it is well to observe the force and virtue and consequences of discoveries; and these are to be seen nowhere more conspicuously than in those three which were unknown to the ancients, and of which the origin, though recent, is obscure and inglorious; namely, printing, gunpowder, and the magnet. For these three have changed the whole face and state of things throughout the world; the first in literature, the second in warfare, the third in navigation; whence have followed innumerable changes; insomuch that no empire, no sect, no star seems to have exerted greater power and influence in human affairs than these mechanical discoveries.",
        "source": "Francis Bacon, Novum Organum, Book I, Aphorism 129, Spedding trans., via Wikisource",
        "href": "https://en.wikisource.org/wiki/Novum_Organum/Book_I_(Spedding)",
        "image": {
          "src": "/covers/samsung-broadcom-200-billion-chip-deal--a2.png",
          "alt": "The 1620 engraved title page of Novum Organum showing a ship sailing outward between two great columns",
          "credit": "Engraved title page of Francis Bacon's Novum Organum, 1620 (Houghton Library). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, Book I, Chapter I (1776)",
        "excerpt": "One man draws out the wire; another straights it; a third cuts it; a fourth points it; a fifth grinds it at the top for receiving the head; to make the head requires two or three distinct operations; to put it on is a peculiar business; to whiten the pins is another; it is even a trade by itself to put them into the paper; and the important business of making a pin is, in this manner, divided into about eighteen distinct operations.",
        "source": "Adam Smith, The Wealth of Nations, Book I, Ch. 1 (division of labour, the pin factory), via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3300/3300-h/3300-h.htm",
        "image": {
          "src": "/covers/samsung-broadcom-200-billion-chip-deal--a3.png",
          "alt": "The 1776 title page of An Inquiry into the Nature and Causes of the Wealth of Nations by Adam Smith",
          "credit": "Title page of the first edition of The Wealth of Nations, 1776. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Adolph von Menzel, The Iron Rolling Mill (Eisenwalzwerk, 'Modern Cyclopes'), 1875, Alte Nationalgalerie, Berlin",
        "excerpt": "Menzel's vast canvas plunges the viewer into the glowing heart of a German rolling mill, where half-lit workers wrestle a white-hot ingot through massive machinery amid smoke, sparks, and clangor. It was one of the first major paintings to treat heavy industry itself as a heroic subject, capturing the sheer scale, heat, and human choreography of mass production. The image resonates with a $200-billion pact to forge AI chips: the modern foundry is the same furnace-lit temple of industrial power, only its cyclopes now cast silicon.",
        "source": "Adolph von Menzel, The Iron Rolling Mill, 1875, Alte Nationalgalerie, Berlin; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/samsung-broadcom-200-billion-chip-deal--a4.png",
          "alt": "A crowded, smoke-filled iron rolling mill with workers maneuvering a glowing white-hot bar through heavy machinery",
          "credit": "Adolph von Menzel, The Iron Rolling Mill (Eisenwalzwerk), 1875. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1, H.53), 1923",
        "excerpt": "Honegger's orchestral tour de force builds from the heavy stillness of a locomotive at rest into an accelerating, pounding machine in full motion, its rhythms and stacked chords evoking pistons, steam, and gathering speed. It is a landmark of machine-age modernism, music that finds beauty and awe in raw industrial power rather than in nature. That same fascination with the might of engineered systems animates a landmark deal to mass-produce the AI hardware driving the current technological surge.",
        "source": "Arthur Honegger, Pacific 231 (H.53), 1923; score and details via IMSLP",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)",
        "image": {
          "src": "/covers/samsung-broadcom-200-billion-chip-deal--a5.png",
          "alt": "A large French Pacific-type (231) steam locomotive, the wheel arrangement that gave Honegger's work its name, standing at a station",
          "credit": "Pacific 231 G 558 steam locomotive (SNCF 3-231.G.558), photographed 1993 by Roloff. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "ebola-congo-cases-near-3000",
    "headline": "Ebola cases in Congo near 3,000 with more than 1,300 deaths as health workers strike",
    "overview": "The Ebola outbreak in the Democratic Republic of Congo has grown to nearly 3,000 cases and more than 1,300 deaths, with officials warning the virus is spreading rapidly. Health workers have walked off the job over unpaid wages and unsafe conditions, hampering the response. It ranks among the deadliest Ebola outbreaks on record.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMihAFBVV95cUxPbzNGdzhKNDhGaFlOeEtUVzdNLTJTU2FaRWVndDN5UnM0eVNxVnBocDBjWVkxdldKekJDUjNMUlFxeGtXcXVJYUVDTUExc2laNGU4dm91VUY5QTBTZmZYNnlzVkpQSEZSdDNLeEQwTVZOQUxLUnVfV2RfR0FpVVhFb1JUclU?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxPdkVVelBDZll6QXltZUNfaElyaTY5NmFjazZZYUdJMFYzVWdlUlpaNWszZjJVb2FsVXRJWFBMOFMweUthQjdndG5XNHdNYjJqalZ0UnBEbkhjb1hIcjRJTGdPSlVDRnJjZE5MSF9DaDRzVjVkaF9SdlBuUmIzbDBVYnhScG1kcE1sLTRjNDNjQ2xneVFMb2ZPRWF5VWFGSXNVTHBzZFdzaGJqdXdlRW5SatIBtgFBVV95cUxPQjFaQ1RFTnFxZGZQanBmT2dUZjNnS3RhTjRFcXFCaGZGMU5GVzZhdmVnWkZvVDQzRk1XWFVMMC1jOHNnZVNSQWFUNGgzclIxa0xpVVpoZmJNWkdBU29oemdSTnJGZ1Y5c29TTkVkVVo0bVdDZk1TSzBqdjhfUENhZTl3TG4xUmtvX0ZoX1dobUNyX3ExOW9wQzJfQUZzUjJfOG9UbWJidFAwcDNMMFlfUkUzZHhZQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/ebola-congo-cases-near-3000.png",
      "alt": "A health worker in full personal protective equipment at an Ebola treatment center.",
      "credit": "Sgt. 1st Class Nathan Hoskins / U.S. Army, public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Giovanni Boccaccio's eyewitness account of the Black Death in Florence, 1348 (The Decameron, Introduction to the First Day), John Payne translation, 1886",
        "excerpt": "This tribulation had stricken such terror to the hearts of all, men and women alike, that brother forsook brother, uncle nephew and sister brother and oftentimes wife husband; nay (what is yet more extraordinary and well nigh incredible) fathers and mothers refused to visit or tend their very children, as they had not been theirs.",
        "source": "Boccaccio, The Decameron, Introduction to the First Day, John Payne trans., via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm",
        "image": {
          "src": "/covers/ebola-congo-cases-near-3000--a0.png",
          "alt": "Medieval manuscript miniature of townspeople lowering coffins of plague victims into open graves at Tournai during the Black Death.",
          "credit": "Miniature from The Chronicles of Gilles li Muisit, c.1349-52, Bibliotheque royale de Belgique. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The 1918-1919 influenza pandemic (the so-called \"Spanish flu\"), which killed an estimated 50 million people worldwide and overwhelmed hospitals and medical staff",
        "excerpt": "The deadliest outbreak of the modern era, the 1918 flu buried entire towns faster than the living could dig graves and collapsed the systems meant to fight it: doctors and nurses fell sick at their posts, wards overflowed into auditoriums and armories, and volunteers with no training were pressed into caring for the dying. Like Congo's exhausted, striking health workers, the caregivers of 1918 were simultaneously the frontline defense and among the most exposed victims, and the pandemic showed how quickly fear and a failing workforce can turn a disease into a catastrophe.",
        "source": "The American Influenza Epidemic of 1918: A Digital Encyclopedia, University of Michigan Center for the History of Medicine and Michigan Publishing",
        "href": "https://www.influenzaarchive.org/",
        "image": {
          "src": "/covers/ebola-congo-cases-near-3000--a1.png",
          "alt": "Row of cots holding influenza patients tended by masked Red Cross volunteer nurses inside the Oakland Municipal Auditorium, converted to a temporary hospital in 1918.",
          "credit": "Edward A. \"Doc\" Rogers, Oakland Auditorium emergency hospital, 1918. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Thucydides, History of the Peloponnesian War, Book II.51 (the Plague of Athens, 430 BCE), Richard Crawley translation, 1874",
        "excerpt": "there was the awful spectacle of men dying like sheep, through having caught the infection in nursing each other. This caused the greatest mortality. On the one hand, if they were afraid to visit each other, they perished from neglect; indeed many houses were emptied of their inmates for want of a nurse: on the other, if they ventured to do so, death was the consequence.",
        "source": "Thucydides, History of the Peloponnesian War, Book II.51, Crawley trans., via Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
        "image": {
          "src": "/covers/ebola-congo-cases-near-3000--a2.png",
          "alt": "Line engraving depicting the plague of Athens, with the dead and dying strewn among the living in the stricken city.",
          "credit": "The Plague of Athens, line engraving by J. Fittler after M. Sweerts. Wellcome Collection, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Daniel Defoe, A Journal of the Plague Year (London, 1722), an account of the Great Plague of London, 1665",
        "excerpt": "The shrieks of women and children at the windows and doors of their houses, where their dearest relations were perhaps dying, or just dead, were so frequent to be heard as we passed the streets, that it was enough to pierce the stoutest heart in the world to hear them.",
        "source": "Defoe, A Journal of the Plague Year, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm",
        "image": {
          "src": "/covers/ebola-congo-cases-near-3000--a3.png",
          "alt": "Title page of the original 1722 edition of Daniel Defoe's A Journal of the Plague Year, printed for E. Nutt.",
          "credit": "Title page, A Journal of the Plague Year, Daniel Defoe, 1722. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Triumph of Death, c.1562, oil on panel, Museo del Prado, Madrid",
        "excerpt": "Bruegel imagines death as an unstoppable epidemic: skeleton armies sweep across a scorched landscape, herding kings and peasants alike into a giant coffin while the dead-carts roll and the living are cut down mid-flight. Its vision of a society engulfed all at once, with every institution and comfort powerless before mass death, mirrors the scale of Congo's outbreak, where nearly 3,000 cases and over 1,300 deaths have overwhelmed the ordinary machinery of care.",
        "source": "Pieter Bruegel the Elder, The Triumph of Death, Museo del Prado (via Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/The_Triumph_of_Death",
        "image": {
          "src": "/covers/ebola-congo-cases-near-3000--a4.png",
          "alt": "Panoramic panel painting of armies of skeletons overrunning a barren landscape, driving people of every rank toward death amid burning ships, gallows, and dead-carts.",
          "credit": "Pieter Bruegel the Elder, The Triumph of Death, c.1562, Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Arnold Bocklin, The Plague (Die Pest), 1898, tempera on panel, Kunstmuseum Basel",
        "excerpt": "Bocklin paints the plague as a winged, dragon-riding figure of Death swooping low through a narrow medieval street, leaving bodies crumpled in its wake as terrified survivors flee. Painted after a cholera scare, the picture distills exactly the fear and contagion at the heart of Congo's crisis: an invisible killer moving faster than anyone can escape, striking down the sick and those around them without warning.",
        "source": "Arnold Bocklin, Die Pest (The Plague), Kunstmuseum Basel (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/ebola-congo-cases-near-3000--a5.png",
          "alt": "A monstrous winged figure of Death rides a dragon-like beast low through a shadowed medieval street, scythe swinging, as plague victims lie dead and the living flee in terror.",
          "credit": "Arnold Bocklin, Die Pest (The Plague), 1898, Kunstmuseum Basel. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "unesco-world-heritage-additions-2026",
    "headline": "UNESCO adds a West Bank site, Lebanese castles and Georgia's Okefenokee Swamp to its World Heritage List",
    "overview": "UNESCO's World Heritage Committee inscribed a slate of new sites, including a Palestinian location in the West Bank added over Israeli objections, Crusader-era castles in Lebanon and the Okefenokee Swamp in the US state of Georgia. Palestinians hope the designation will help shield the West Bank site from Israeli development. The additions span cultural landmarks and natural wonders.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxOT2RmdWs1SzVTM3hDTTNHb09ZZHFaWnc4dEpHSTdjaUVpaEZBZV9oNUdQUVVCVW12VTdtZXlkSXZfSUV4ZEtlUkYxUi0yY1Z6X0R6VlNsQ19pUTdfaW1BMFJOb2VzN3c5ZkNGTTNRYnMzSlU0VW5hNnNuR3ROdFh5aEIxOHJkOERRd1pLMzQwSkpNVGpmNENYZ0xCWVQyZ0lzYTJVakkweEtXU0U0N1lv?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxQcVkzUGYteC1oVnNGNV9KNXVTY1dZcTRzYjI0aFd3Ykt3YzhfOUVkQ3hCMHVjUGhMUU9WYnduVmpfdUJyaFlLVTA0TEdpZzJvQ3pkQUxFZ0JKOGlJQlRxWTE1bGQ5Y1JZY1IwSlZHS1Z3bHo4T1d0c1NvbDdmQXhZQklBSzFqU3hDSWRPME5raXREdVlJSElIVml1VGRiQUIwb05zWmxORQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/unesco-world-heritage-additions-2026.png",
      "alt": "A mirror-still blackwater channel winding through cypress trees in the Okefenokee Swamp.",
      "credit": "Nell Baldacchino / U.S. Fish and Wildlife Service, public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The founding of Yellowstone National Park, signed into law by President Ulysses S. Grant on March 1, 1872 — the world's first national park",
        "excerpt": "With the Yellowstone Act of 1872, the United States set aside more than two million acres of geysers, canyons and wilderness as a 'public park or pleasuring-ground for the benefit and enjoyment of the people,' inventing the idea that a nation could hold wild land in trust against private exploitation. Painters like Thomas Moran and photographers of the Hayden Survey supplied Congress with images of a landscape so sublime it seemed to demand protection. It is the direct ancestor of the impulse behind inscribing a wild wetland like the Okefenokee Swamp on a global list of protected places.",
        "source": "Yellowstone National Park (founded 1872), via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Yellowstone_National_Park",
        "image": {
          "src": "/covers/unesco-world-heritage-additions-2026--a0.png",
          "alt": "Thomas Moran's grand landscape painting of the Grand Canyon of the Yellowstone, with a rushing waterfall between towering cliffs",
          "credit": "Thomas Moran, Grand Canyon of the Yellowstone, 1872. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Krak des Chevaliers, the Crusader castle of the Knights Hospitaller in the Levant (fortified 11th–13th centuries)",
        "excerpt": "One of the best-preserved medieval fortresses in the world, Krak des Chevaliers was held by the Knights Hospitaller from 1142 until it fell to the Mamluk sultan Baybars in 1271 — contested sacred and strategic ground fought over for generations. Inscribed as a UNESCO World Heritage Site in 2006, it was damaged during the Syrian civil war and placed on the List of World Heritage in Danger, dramatizing how quickly conflict can imperil monuments that outlasted centuries. It is a close historical cousin to the Crusader-era castles of Lebanon now joining the Heritage List.",
        "source": "Krak des Chevaliers (Crusader castle, 11th–13th c.), via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Krak_des_Chevaliers",
        "image": {
          "src": "/covers/unesco-world-heritage-additions-2026--a1.png",
          "alt": "The massive stone walls, round towers and concentric ramparts of the Crusader castle Krak des Chevaliers on a hilltop",
          "credit": "Krak des Chevaliers, photograph by 'Gianfranco Gazzetti / GAR'. CC BY-SA, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (1818)",
        "excerpt": "And on the pedestal these words appear: 'My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!' Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" in The Complete Poetical Works of Percy Bysshe Shelley (ed. Hutchinson, 1914), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ozymandias",
        "image": {
          "src": "/covers/unesco-world-heritage-additions-2026--a2.png",
          "alt": "The colossal granite bust of Ramesses II known as the 'Younger Memnon' in the British Museum, the sculpture that inspired Shelley's poem",
          "credit": "Colossal bust of Ramesses II, the 'Younger Memnon' (c. 1250 BC), British Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Henry David Thoreau, \"Walking\" (1862)",
        "excerpt": "The West of which I speak is but another name for the Wild; and what I have been preparing to say is, that in Wildness is the preservation of the World. Every tree sends its fibers forth in search of the Wild.",
        "source": "Henry David Thoreau, \"Walking,\" via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1022/1022-h/1022-h.htm",
        "image": {
          "src": "/covers/unesco-world-heritage-additions-2026--a3.png",
          "alt": "1856 ambrotype portrait of Henry David Thoreau with a beard, seated in formal dress",
          "credit": "Benjamin D. Maxham, portrait of Henry David Thoreau, 1856 (restored). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, The Course of Empire: Desolation (1836), New-York Historical Society",
        "excerpt": "The final canvas in Cole's five-part cycle shows a once-mighty city fallen to ruin, its broken columns and empty arches slowly swallowed by returning vegetation as birds nest where crowds once thronged. Painted at the height of the American wilderness debate, it is a meditation on the vanity of monuments and the certainty that nature outlasts empire — the very tension between built heritage and wild land that a World Heritage List tries to hold together. It reads as a painted 'Ozymandias' and a warning about what civilizations remember and forget.",
        "source": "Thomas Cole, The Course of Empire: Desolation (1836), via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Course_of_Empire_(paintings)",
        "image": {
          "src": "/covers/unesco-world-heritage-additions-2026--a4.png",
          "alt": "Thomas Cole's painting of a ruined classical city at dusk, with broken columns overgrown by plants beside a still river",
          "credit": "Thomas Cole, The Course of Empire: Desolation, 1836, New-York Historical Society. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Bedřich Smetana, \"Vltava\" (The Moldau), No. 2 of the cycle Má vlast (1874)",
        "excerpt": "In this symphonic poem Smetana traces the river Vltava from two mountain springs through forests, past a peasant wedding and moonlit water-nymphs, to its surge over the St. John's Rapids and its majestic flow through Prague — turning a nation's landscape into music. Composed as Smetana was going deaf, it is a civilization deliberately choosing to remember and enshrine its natural heritage, exactly the impulse behind protecting a wild river or swamp. The piece resonates with the story's celebration of both wild nature and cultural memory.",
        "source": "Bedřich Smetana, \"Vltava\" from Má vlast (1874), score via IMSLP",
        "href": "https://imslp.org/wiki/Vltava,_JB_1:112/2_(Smetana,_Bed%C5%99ich)",
        "image": {
          "src": "/covers/unesco-world-heritage-additions-2026--a5.png",
          "alt": "Photographic portrait of the Czech composer Bedřich Smetana with spectacles and a moustache",
          "credit": "Portrait of Bedřich Smetana. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "zelensky-russia-30000-north-korean-troops",
    "headline": "Zelensky says Russia is preparing to bring 30,000 more North Korean troops into the war",
    "overview": "Ukrainian President Volodymyr Zelensky said Russia is preparing to bring in an additional 30,000 North Korean troops to fight against Ukraine, part of what he described as a broader Russian mobilization. North Korean forces have already been deployed alongside Russian units. Kyiv says the reinforcements signal a longer and more intense conflict ahead.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0AFBVV95cUxQYVE3WVotb1k5eTA4eHhrSEtCWkVJM2xUU3lob3R5OGpPUFZnV0NRUTByU1cwTHJCUi0wYTdVSmVHU1V6TzMydk1EVjBZSVp4aldTLWdaVURyYUM1YmN1U0YtcU9RcDZ5Tm1Jc1hPdGNfZ3dUX19vNXhoV2JWekZaS01WRjBMbUotWHFwLTBTVXVyQXhSbjdBaTAwamJiMkFtZ3E1SV9tc0RZckNIZ3JjS2taS1JfclhQSG5WWUtwS3R1bEFLdE5LY3g4WWdjZjlk?oc=5"
      },
      {
        "name": "The Kyiv Independent",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQaTR6cnVvMklQMmoxQXJzSFdUeS1lYVZ1OWRwUjJ1aUdjMEhwM3VpZ0Z3VG5mdEN3UFhrSWRqc2wwRVQzWTNSUlJGaXJnU3ZxU0tJc3RnQ1NWVE9NVGlVVVRHMkFodC1QaWh6dk44eXFSdUtjNEtiSU1UMHNVMnN5a0ZpR1FuSnlMV2Q3YjRsQ3c1c3oyYmJqS0NYTjFEdW9wblNz?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/zelensky-russia-30000-north-korean-troops.png",
      "alt": "Soldiers marching in tight formation past a reviewing stand at a military parade.",
      "credit": "TSgt James Mossman / U.S. Air Force, public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Roman auxilia — non-citizen foreign troops recruited across the empire (1st–2nd century AD), depicted on Trajan's Column, Rome",
        "excerpt": "At its height the Roman army fielded roughly as many foreign auxiliaries as citizen legionaries — Gauls, Thracians, Batavian cavalry, Syrian and Eastern archers, and countless others levied from conquered and allied peoples to swell Rome's ranks and do much of its fighting and dying. The auxilia let Rome wage relentless wars far from home by drawing manpower from the whole known world, exactly as a great power today reaches beyond its own population to keep its armies in the field. On Trajan's Column these imported soldiers are carved storming Dacian strongholds — the outsourced muscle of a war machine that never stopped feeding.",
        "source": "Roman auxiliary forces; scenes carved on Trajan's Column (dedicated AD 113), documented in Conrad Cichorius's plates",
        "href": "https://en.wikipedia.org/wiki/Auxilia",
        "image": {
          "src": "/covers/zelensky-russia-30000-north-korean-troops--a0.png",
          "alt": "Relief plate from Trajan's Column showing Roman auxiliary soldiers in battle during the Dacian Wars",
          "credit": "Conrad Cichorius, Die Reliefs der Traianssäule, Tafel XXVIII (1896–1900), after Trajan's Column. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "British hire of some 30,000 German ('Hessian') auxiliary troops in the American Revolution (1776), condemned in the U.S. Declaration of Independence",
        "excerpt": "He is at this time transporting large Armies of foreign Mercenaries to compleat the works of death, desolation and tyranny, already begun with circumstances of Cruelty & perfidy scarcely paralleled in the most barbarous ages, and totally unworthy the Head of a civilized nation.",
        "source": "United States Declaration of Independence (July 4, 1776), National Archives transcript — grievance against King George III's hiring of foreign troops, of whom over 30,000 Germans eventually served",
        "href": "https://www.archives.gov/founding-docs/declaration-transcript",
        "image": {
          "src": "/covers/zelensky-russia-30000-north-korean-troops--a1.png",
          "alt": "John Trumbull's painting of the capture of the Hessian troops at the Battle of Trenton, December 26, 1776",
          "credit": "John Trumbull, The Capture of the Hessians at Trenton, December 26, 1776 (1786–1828), Yale University Art Gallery. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Herodotus, The Histories, Book VII, §§20–21 (George Rawlinson translation) — the vast multinational host of Xerxes invading Greece (480 BC)",
        "excerpt": "For of all the armaments whereof any mention has reached us, this was by far the greatest; insomuch that no other expedition compared to this seems of any account ... For was there a nation in all Asia which Xerxes did not bring with him against Greece? Or was there a river, except those of unusual size, which sufficed for his troops to drink?",
        "source": "Herodotus, The History of Herodotus, Book 7, Rawlinson translation, via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7",
        "image": {
          "src": "/covers/zelensky-russia-30000-north-korean-troops--a2.png",
          "alt": "Roman marble portrait bust of the Greek historian Herodotus",
          "credit": "Marble bust of Herodotos, Roman Imperial copy of a Greek original, Metropolitan Museum of Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book II — the 'Catalogue of Ships,' invocation before the muster of the assembled nations (Samuel Butler prose translation)",
        "excerpt": "And now, O Muses, dwellers in the mansions of Olympus, tell me—for you are goddesses and are in all places so that you see all things, while we know nothing but by report—who were the chiefs and princes of the Danaans? As for the common soldiers, they were so that I could not name every single one of them though I had ten tongues, and though my voice failed not and my heart were of bronze within me, unless you, O Olympian Muses, daughters of aegis-bearing Jove, were to recount them to me.",
        "source": "Homer, The Iliad, Book II, Samuel Butler translation, via Project Gutenberg (eBook #2199)",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt",
        "image": {
          "src": "/covers/zelensky-russia-30000-north-korean-troops--a3.png",
          "alt": "Marble bust traditionally identified as the poet Homer, British Museum",
          "credit": "Bust of Homer (Hellenistic type), British Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Vasily Vereshchagin, The Apotheosis of War (1871), oil on canvas, Tretyakov Gallery, Moscow",
        "excerpt": "A pyramid of human skulls rises against a scorched plain and a ruined city, crows circling the heap — the Russian war artist's savage indictment of conquest, which he inscribed as a dedication 'to all great conquerors, past, present and to come.' Painted by a Russian who had seen combat firsthand, it strips war of glory and reduces every mobilized host, whatever its banners or numbers, to the same anonymous harvest of the dead. It resonates with a war fed by ever more imported soldiers: the more men poured in, the taller the pyramid grows.",
        "source": "Vasily Vereshchagin, The Apotheosis of War (1871), Turkestan Series, State Tretyakov Gallery",
        "href": "https://en.wikipedia.org/wiki/The_Apotheosis_of_War",
        "image": {
          "src": "/covers/zelensky-russia-30000-north-korean-troops--a4.png",
          "alt": "Painting of a pyramid of human skulls on a barren plain with crows, before a ruined city",
          "credit": "Vasily Vereshchagin, The Apotheosis of War, 1871. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pyotr Ilyich Tchaikovsky, Marche slave (Slavonic March), Op. 31 (1876), for orchestra",
        "excerpt": "Tchaikovsky composed this brooding, martial march in weeks for a charity concert aiding Serbs and the Russian volunteers fighting alongside them against the Ottomans — a musical enactment of Russia mobilizing and pouring men into a foreign war. It builds from a funereal Serbian folk lament through gathering drums to a thunderous quotation of 'God Save the Tsar,' the sound of a state summoning its people and its allies to the front. As a portrait of escalation dressed in patriotic splendor, it speaks directly to a war widened by rallying and importing ever more fighters.",
        "source": "Pyotr Tchaikovsky, Slavonic March (Marche slave), Op. 31 (1876); full orchestral scores in the public domain via IMSLP",
        "href": "https://imslp.org/wiki/Slavonic_March,_Op.31_(Tchaikovsky,_Pyotr)",
        "image": {
          "src": "/covers/zelensky-russia-30000-north-korean-troops--a5.png",
          "alt": "Photographic portrait of the composer Pyotr Ilyich Tchaikovsky",
          "credit": "Pyotr Ilyich Tchaikovsky, photograph by the Reutlinger studio. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "trump-correspondents-dinner-2026",
    "headline": "Trump returns to the White House Correspondents' Dinner with an insult-filled speech attacking the press",
    "overview": "President Trump attended the White House Correspondents' Dinner and delivered a rambling, insult-laden address that repeatedly attacked journalists, three months after an assassination attempt against him. The annual dinner, traditionally an uneasy truce between the president and the press, instead underscored his combative relationship with the media. Reporters and press-freedom advocates criticized the tone.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxONlpJVXcyQ1h0akY1LUFSQ3N6d2JBVWkzcGFrRlV0Z0xBcGJDZlNWcUNDbGpZRWVBd3pqbndvTmlqbGZHT3hoWUNCM2g0ajBhX2tCTENYVzUzTXVKbTROSXB3WWJWaXV1dnI2eU9NdmV4SjRaM210YnhQSFV2MFdCVC1uei0yWm01VmdYWWxiNEFzaUcwWlpMcjdrZHR3SlEteEJZb1ltaG9nZUNx?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cd7le4ylev2o?at_medium=RSS&at_campaign=rss"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/trump-correspondents-dinner-2026.png",
      "alt": "A microphone at a lectern before a formal black-tie banquet audience.",
      "credit": "angela n. from Washington, DC, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The trial of John Peter Zenger, New York, August 1735 — printer of The New-York Weekly Journal, acquitted of seditious libel against Governor William Cosby",
        "excerpt": "Jailed for eight months on the royal governor's orders, the German-immigrant printer John Peter Zenger stood accused of 'scandalous, virulent, false and seditious reflections' for articles mocking Governor William Cosby's administration. His lawyer Andrew Hamilton urged the jury to accept truth as a defense against libel; they deliberated about ten minutes and returned 'not guilty.' The case became a founding parable of the American principle that a free press may criticize the powerful — the very truce the correspondents' dinner is meant to embody.",
        "source": "John Peter Zenger and the 1735 seditious-libel trial, via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/John_Peter_Zenger",
        "image": {
          "src": "/covers/trump-correspondents-dinner-2026--a0.png",
          "alt": "Illustration of lawyer Andrew Hamilton addressing the court in defense of printer John Peter Zenger at his 1735 libel trial",
          "credit": "Andrew Hamilton defending John Peter Zenger in court, 1734–35. Library of Congress, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Will Sommers, court jester to Henry VIII of England (fl. 1525–1547) — the licensed fool permitted to mock and correct the king",
        "excerpt": "In the Tudor court, the jester Will Sommers held a unique license: alone among Henry VIII's subjects, he could ridicule the king to his face, puncture royal vanity, and voice truths courtiers dared not speak. The fool's motley was a kind of protection — comedy made candor survivable, and the crown tolerated the mockery as a pressure valve. The tradition frames the correspondents' dinner as a modern descendant: a ritual in which the powerful are expected to sit and take the joke.",
        "source": "Will Sommers, jester to Henry VIII, via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Will_Sommers",
        "image": {
          "src": "/covers/trump-correspondents-dinner-2026--a1.png",
          "alt": "Manuscript illumination of Henry VIII playing a harp as King David, with his fool Will Sommers standing beside him, from the Psalter of Henry VIII",
          "credit": "Henry VIII depicted as David with his fool Will Sommers, Psalter of Henry VIII, c. 1540, BL Royal MS 2 A XVI. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "William Shakespeare, King Lear, Act I, Scene 4 (c. 1606) — the Fool's rebuke to the King",
        "excerpt": "Truth's a dog must to kennel; he must be whipped out, when Lady the brach may stand by the fire and stink.",
        "source": "Shakespeare, King Lear, Act I, Scene 4, via The Complete Works of William Shakespeare (MIT)",
        "href": "https://shakespeare.mit.edu/lear/lear.1.4.html"
      },
      {
        "category": "literary",
        "title": "John Milton, Areopagitica: A Speech for the Liberty of Unlicensed Printing (1644)",
        "excerpt": "Give me the liberty to know, to utter, and to argue freely according to conscience, above all liberties.",
        "source": "John Milton, Areopagitica (1644), via Project Gutenberg (ebook 608)",
        "href": "https://www.gutenberg.org/cache/epub/608/pg608.txt"
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier, Gargantua (1831) — lithograph published in La Caricature",
        "excerpt": "Daumier caricatured the French king Louis-Philippe as a bloated Gargantua, enthroned atop a ramp on which ministers shovel the people's gold into his gaping mouth while he excretes honors and favors below. Authorities destroyed the lithographic stone and sentenced the artist to six months in prison for insulting the crown — a direct collision between a ruler and the satirists who mocked him. It stands as an emblem of political caricature as both weapon against power and target of its retaliation.",
        "source": "Honoré Daumier, Gargantua, 1831, lithograph, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Gargantua.jpg",
        "image": {
          "src": "/covers/trump-correspondents-dinner-2026--a4.png",
          "alt": "Lithograph caricature of King Louis-Philippe as a giant Gargantua seated on a throne, swallowing gold carried up a ramp by his subjects",
          "credit": "Honoré Daumier, Gargantua, 1831. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya, The Sleep of Reason Produces Monsters (El sueño de la razón produce monstruos), Plate 43 of Los Caprichos (1799)",
        "excerpt": "In this etching, an artist slumps asleep at his desk while owls, bats, and a wide-eyed lynx swarm up out of the darkness behind him — the monsters that folly and unreason breed once judgment nods off. Goya conceived Los Caprichos as a biting visual satire of the vanities, abuses, and self-deceptions of the powerful, using nightmare imagery to expose what polite discourse would not. It resonates as a warning about what fills the vacuum when reasoned public argument and honest criticism are silenced.",
        "source": "Francisco de Goya, The Sleep of Reason Produces Monsters, Los Caprichos plate 43, 1799, via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Sleep_of_Reason_Produces_Monsters",
        "image": {
          "src": "/covers/trump-correspondents-dinner-2026--a5.png",
          "alt": "Etching of a man asleep over his desk while owls and bats emerge from the darkness around him, inscribed with the phrase about the sleep of reason",
          "credit": "Francisco de Goya, The Sleep of Reason Produces Monsters (Los Caprichos, No. 43), 1799. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "kaepernick-springsteen-aclu-award",
    "headline": "Colin Kaepernick and Bruce Springsteen receive a new ACLU award for activism",
    "overview": "The American Civil Liberties Union honored former NFL quarterback Colin Kaepernick and musician Bruce Springsteen with a new award recognizing activism across the arts, business, science and sports. Kaepernick was cited nearly a decade after his national-anthem protests against police brutality. The ACLU said the honor celebrates public figures who use their platforms to defend civil liberties.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQclZKeTg3bjhnWjI5Z1VuTklXcGJtb1RLVW1NaXpVb0R6cWJBcG9rcHNMTmN4UnB4QlZfNkk5eEVhX1k5M3VXeG1ldnA3S2NkRXJnaVNRV01wYUM0c0YtV25DdUQ3dmVnNTlCREpDQmdHQlR4RjBZaE9qcFBPYlZjSTN5a0hDZWlieHRZU2cxei1GV1NiaGkxTEtnSlV5U3VL?oc=5"
      },
      {
        "name": "USA Today",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNei1ab2tGQ3FfMU13N1kyOWpLTjJSc3M4UDdkWENfWGJQVXVZOTdZUlZKeTRZMmhHSDgwX2t3QjFOcE93OWpVNXJFVkpHaGYyeUsyaVJKT2dnenNKVTRMV2lvb1YwMnlJNmlHTkgzYnJNRHNvdXBWY1hTT0hjU0ZzX1lyNVhpTzVVaXBYSnFHS05zMmx0RGJTNzc5aVdUNXVGbWxuUjJn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/kaepernick-springsteen-aclu-award.png",
      "alt": "A microphone and stage lights set for a formal awards ceremony.",
      "credit": "Erik Drost, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sir Thomas More's refusal of the Oath of Supremacy and execution, London, 6 July 1535",
        "excerpt": "Lord Chancellor of England and celebrated humanist, Thomas More refused to swear the oath acknowledging Henry VIII as Supreme Head of the Church of England, a stand of private conscience against king, court and the tide of public opinion. He kept a careful public silence rather than betray his beliefs, and paid for it with imprisonment in the Tower and, finally, the scaffold — reportedly declaring himself 'the King's good servant, but God's first.' His example is the archetype of the honored citizen who forfeits status, safety and life rather than lend his name to what he believes unjust.",
        "source": "Sir Thomas More (1478–1535), refusal of the Oath of Supremacy and execution, 1535; biographical overview via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Thomas_More",
        "image": {
          "src": "/covers/kaepernick-springsteen-aclu-award--a0.png",
          "alt": "Hans Holbein the Younger's 1527 portrait of Sir Thomas More in fur-collared robe and gold chain of office, looking gravely to one side",
          "credit": "Hans Holbein the Younger, Sir Thomas More, 1527 (Frick Collection). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Tommie Smith and John Carlos raise gloved fists during the U.S. anthem, 1968 Mexico City Olympics, 16 October 1968",
        "excerpt": "On the 200-meter medal podium, gold medalist Tommie Smith and bronze medalist John Carlos bowed their heads and raised black-gloved fists as 'The Star-Spangled Banner' played, a silent protest against racism and injustice at home. The gesture, made before a global audience during the national anthem, cost them dearly: they were suspended from the U.S. team, expelled from the Olympic Village, and met with vilification and death threats for years afterward. It is the closest historical rehearsal of Kaepernick's own anthem protest — an athlete turning the ceremony of national pride into an act of conscience, at severe personal cost.",
        "source": "1968 Olympics Black Power salute, Mexico City; overview via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1968_Olympics_Black_Power_salute"
      },
      {
        "category": "literary",
        "title": "Henry David Thoreau, \"Civil Disobedience\" (1849), via Wikisource",
        "excerpt": "It is not desirable to cultivate a respect for the law, so much as for the right. Under a government which imprisons any unjustly, the true place for a just man is also a prison.",
        "source": "Henry David Thoreau, Resistance to Civil Government (\"Civil Disobedience\"), 1849, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Civil_Disobedience_(Thoreau)",
        "image": {
          "src": "/covers/kaepernick-springsteen-aclu-award--a2.png",
          "alt": "1856 daguerreotype portrait of Henry David Thoreau, a bearded young man in a dark coat",
          "credit": "Benjamin D. Maxham, daguerreotype of Henry David Thoreau, 1856. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Frederick Douglass, \"What to the Slave Is the Fourth of July?\" (5 July 1852), via Wikisource",
        "excerpt": "This Fourth July is yours, not mine. You may rejoice, I must mourn. ... What, to the American slave, is your 4th of July? I answer: a day that reveals to him, more than all other days in the year, the gross injustice and cruelty to which he is the constant victim.",
        "source": "Frederick Douglass, oration at Rochester, New York, 5 July 1852, via Wikisource",
        "href": "https://en.wikisource.org/wiki/What_to_the_Slave_Is_the_Fourth_of_July%3F",
        "image": {
          "src": "/covers/kaepernick-springsteen-aclu-award--a3.png",
          "alt": "Photographic portrait of Frederick Douglass, circa 1879, a distinguished man with a full head of hair and a dark suit",
          "credit": "Portrait of Frederick Douglass, circa 1879 (George Kendall Warren). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Francisco Goya, The Third of May 1808 (El tres de mayo de 1808), 1814, Museo del Prado, Madrid",
        "excerpt": "Goya's masterpiece freezes the instant before an execution: a lone man in a white shirt throws his arms wide, defiant and unarmed, before a faceless firing squad that stands as an anonymous machine of state power. Light falls on the single figure so that his refusal reads as luminous witness against the massed, ordered force in the dark. It is the enduring image of the individual conscience standing exposed and outnumbered against overwhelming authority — the visual grammar of principled dissent at ultimate personal cost.",
        "source": "Francisco de Goya, The Third of May 1808, 1814, oil on canvas, Museo del Prado; overview via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Third_of_May_1808",
        "image": {
          "src": "/covers/kaepernick-springsteen-aclu-award--a4.png",
          "alt": "Goya's painting of a man in a white shirt with arms raised before a firing squad at night, a lantern lighting the scene",
          "credit": "Francisco de Goya, The Third of May 1808, 1814 (Museo del Prado). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Harry T. Burleigh, arrangement of the spiritual \"Go Down, Moses\" (Ricordi, 1917), via IMSLP",
        "excerpt": "Burleigh, the pioneering Black composer (1866–1949) who brought the spirituals into the concert hall, set the old freedom song 'Go Down, Moses' for solo voice in a spare, dignified arrangement. Its refrain — the demand to 'let my people go' — carries the coded protest of the enslaved into art music, turning suffering into a public summons for justice. The spiritual-as-protest is precisely the tradition Springsteen's socially conscious songwriting descends from: art that stands with the oppressed and refuses to be silent, honored here as activism through the arts.",
        "source": "Harry Thacker Burleigh, Go Down, Moses (spiritual arrangement for voice and piano), G. Ricordi & Co., 1917, via IMSLP",
        "href": "https://imslp.org/wiki/Go_Down,_Moses_(Burleigh,_Harry_Thacker)"
      }
    ],
    "rank": 24
  },
  {
    "slug": "medieval-combat-world-championship-2026",
    "headline": "Armored fighters clash with swords, axes and shields at the medieval combat world championship",
    "overview": "Competitors in full steel armor fought hand-to-hand with blunted swords, axes and shields at the world championship of medieval combat, a fast-growing full-contact sport. Teams from dozens of countries battled in melee and duel formats before crowds of spectators. Organizers say the sport fuses historical reenactment with the intensity of modern martial arts.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxOeGw2X0xWZ25QaklXUjZJM2p2OVJoeDE3OUF6cGFpaE5hSW9oLTRFRFQ0QWJRZ3JjQmpnQ2dRWkhpRmpiVnN5NEMwejlMUU83bGttd2k1Q21oNUJrbHRpQ3BOcHhoRklCMFlpeHpqX19ZdmNkdmQyaHJxVUNiUWRwNjluVFZtMjVJb05Ub1lWcUV5SjJScmhEcXFzSnY4YVZmOXB1eQ?oc=5"
      },
      {
        "name": "Jonesboro Sun",
        "href": "https://news.google.com/rss/articles/CBMijgJBVV95cUxQTnlEYXZsVV9jVlhPREJ0VW1oLXNTZ3plNGRmUFhnV2ZXZnBycmd3dmJrUVI4SGMyR2tkekstSnJkUVpXcUFBLVZoTm5HN2U2dDZibk5EX3dvcG5FdlVsUWpxaEJqSG1Jenc2anFObGpNcmNXU1loZnRmXzhKYVdPWmVQTkxjWm5zc0l2QnJYRWxFYk5SUXJDYmh2a1c3TWkyTzBjUkRHM3RIMzRUMW45QjEzdDJFNFZxVnBsTnpCMzNQejg0R3dMeXRocDlhSHRPTy1ueTBlSFBGMzVib3BySGd1dHE5cm9VTG9vZFhFRDhxSTh3TFh3eUNtdVlKWmFjblpRTmxaRlhZMklRZGc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/medieval-combat-world-championship-2026.png",
      "alt": "Armored fighters clashing with swords and shields in a full-contact medieval combat arena.",
      "credit": "Ivan Radic, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Field of the Cloth of Gold, June 1520 — the summit-tournament of Henry VIII and Francis I near Calais",
        "excerpt": "For roughly eighteen days in June 1520, Henry VIII of England and Francis I of France met on a field between Guines and Ardres and turned diplomacy into a two-week festival of jousting, tournaments and feats of arms. Each king strove to outshine the other with cloth-of-gold pavilions, huge feasts, music and armored contests in the lists — Henry even challenged Francis to an impromptu wrestling bout and was thrown. It is the supreme example of the armored tournament as fused spectacle: athletic violence, national pride and pageantry staged before crowds, the distant ancestor of today's nations-versus-nations championship.",
        "source": "Field of the Cloth of Gold (1520), summit of Henry VIII and Francis I — Wikipedia overview",
        "href": "https://en.wikipedia.org/wiki/Field_of_the_Cloth_of_Gold",
        "image": {
          "src": "/covers/medieval-combat-world-championship-2026--a0.png",
          "alt": "Panoramic painting of the 1520 Field of the Cloth of Gold, showing tents, processions and jousting knights on a field near Calais",
          "credit": "British School, The Field of the Cloth of Gold, c.1545, Royal Collection. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Eglinton Tournament, 28-30 August 1839 — the Victorian revival of the medieval joust in Ayrshire, Scotland",
        "excerpt": "When Archibald Montgomerie, 13th Earl of Eglinton, staged a full medieval tournament at Eglinton Castle in August 1839, some forty gentlemen trained for months, donned real steel armour and jousted before a crowd that swelled to around a hundred thousand. Inspired by Walter Scott's Ivanhoe and the Gothic Revival, it was a deliberate resurrection of the Middle Ages — though torrential rain turned the pageant into a mud-soaked debacle and nearly bankrupted its host. It is the direct forerunner of the modern medieval-combat revival: enthusiasts pouring in effort and money to make the armored past live again as spectacle and sport.",
        "source": "The Eglinton Tournament of 1839 — Wikipedia overview",
        "href": "https://en.wikipedia.org/wiki/Eglinton_Tournament_of_1839",
        "image": {
          "src": "/covers/medieval-combat-world-championship-2026--a1.png",
          "alt": "Contemporary print of the melee at the 1839 Eglinton Tournament, armored knights fighting hand-to-hand on horseback before spectators",
          "credit": "The Melee, from a contemporary depiction of the Eglinton Tournament, 1839. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Geoffrey Chaucer, 'The Knightes Tale' (c.1387-1400), lines 2605-2607, ed. W. W. Skeat",
        "excerpt": "Ther shiveren shaftes up-on sheeldes thikke; He feleth thurgh the herte-spoon the prikke. Up springen speres twenty foot on highte;",
        "source": "Geoffrey Chaucer, The Knightes Tale, in The Complete Works of Geoffrey Chaucer, ed. W. W. Skeat, Vol. IV (The Canterbury Tales), via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/22120/22120-h/22120-h.htm",
        "image": {
          "src": "/covers/medieval-combat-world-championship-2026--a2.png",
          "alt": "Illuminated portrait of the Knight on horseback in armour from the Ellesmere manuscript of Chaucer's Canterbury Tales",
          "credit": "The Knight, Ellesmere manuscript of Chaucer's Canterbury Tales, early 15th century. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Sir Thomas Malory, Le Morte d'Arthur, Book XVIII, ch. X ('How the tourney began at Winchester') (Caxton, 1485)",
        "excerpt": "So then trumpets blew unto the field, and King Arthur was set on high upon a scaffold to behold who did best.",
        "source": "Sir Thomas Malory, Le Morte d'Arthur, Vol. II, Book XVIII, ch. X, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1252/1252-h/1252-h.htm"
      },
      {
        "category": "artistic",
        "title": "Paolo Uccello, The Battle of San Romano (Louvre panel: the counterattack of Micheletto da Cotignola), c.1435-1460, tempera on panel, Musee du Louvre, Paris",
        "excerpt": "Uccello freezes a fifteenth-century battle into a lacquered thicket of armored knights, rearing horses and lances leveled and shattered against steel. The rigidly patterned spears, broken shafts and fallen fighters convert real violence into an almost geometric pageant of chivalry — a Renaissance vision of mounted combat as both brutal and beautiful. It mirrors the modern championship's paradox: full-contact ferocity inside a highly formalized, almost choreographed frame of armour and rules.",
        "source": "Paolo Uccello, The Battle of San Romano (three panels, London / Uffizi / Louvre) — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Battle_of_San_Romano",
        "image": {
          "src": "/covers/medieval-combat-world-championship-2026--a4.png",
          "alt": "Renaissance painting of armored knights on horseback charging with lances at the Battle of San Romano, broken spears littering the ground",
          "credit": "Paolo Uccello, The Battle of San Romano (Louvre panel), c.1435-1460. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Codex Manesse, folio 11v: Herzog Heinrich von Breslau crowned at a tournament, c.1305-1340, illuminated manuscript, Heidelberg University Library (Cod. Pal. germ. 848)",
        "excerpt": "This early-fourteenth-century illumination shows Duke Heinrich von Breslau in full tournament array, receiving a garland as victor amid heralds, jousting knights and the trappings of the medieval lists. Rendered in brilliant reds, blues and gold leaf, it captures the tournament exactly as the modern sport reimagines it: armor, heraldry, prizes and public honor bound together in ritual. The scene is the visual DNA of today's world championship — combat as pageant, and the champion crowned before the crowd.",
        "source": "Codex Manesse (Grosse Heidelberger Liederhandschrift), fol. 11v, Heidelberg University Library, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Codex_Manesse_Heinrich_von_Breslau.jpg",
        "image": {
          "src": "/covers/medieval-combat-world-championship-2026--a5.png",
          "alt": "Medieval illuminated manuscript page showing Duke Heinrich von Breslau in armour at a tournament, crowned with a garland, surrounded by knights and heralds",
          "credit": "Codex Manesse, fol. 11v (Herzog Heinrich von Breslau), c.1305-1340, Heidelberg University Library. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "deepseek-funding-pause",
    "headline": "China's DeepSeek tells investors it is pausing a fundraising round reported at about $71 billion",
    "overview": "Chinese AI startup DeepSeek told prospective investors it is pausing a fundraising round, according to Bloomberg, after viral online posts drew fresh scrutiny to the company. Reports put the stalled round at around $71 billion, a valuation that would rank it among the world's most valuable AI firms. The pause raises questions about the frenzy of investment around Chinese AI models.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPWExVWVlHMlpBUVQxbV9rU1NVZ0w2LVlSbVk0RjBtS0dtRjc4TW85M3hGT3hscVdkb3J6ZHhIU1NWMEJ2RGlhdXQwdkQ2cHVYN2RpN2Z4THlfZ3NlREhaa2dhNERLU0xKRENLbTgySE1CalYtdTV3VmFOR2g0SkNtaE9pV3RTdWJRSDNWS092dnFUcExFa0ZhRnBtNjhweXJ4TWhLSUFVVUk5WU14bWNvd2NpNHdOWk1BVklxTmxB?oc=5"
      },
      {
        "name": "Fortune",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNaF9ZblhqeURPakZwTFBTUWd1dkRDWlFHaGx5NXlSUEJNNDI5ZzVJMkZNZV93amlsWmJ3RjlFNFlCWDRoZ29DRmJ3VnYtVkZybUZ6RGw1NldfTG9jclc0al8wSnpBaFZLU0VOTVhvc0pnc0Q1Zi12NkNaWVRKTWxNalJVbkl0a2lERThvci1mRFVocXNOZFhXTl95cHhfU3BETTI5Tg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/deepseek-funding-pause.png",
      "alt": "A glowing golden filament of light curling through dark space, suggesting an artificial mind.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Dutch Tulip Mania, Haarlem and Amsterdam, 1636–1637",
        "excerpt": "In the winter of 1636–37 the Dutch Republic was gripped by a speculative frenzy for tulip bulbs, whose paper prices exploded as buyers who never meant to plant a flower traded contracts for rare varieties like Semper Augustus. By February 1637 a single bulb could change hands for the price of a canal house — and then, almost overnight, confidence evaporated, bids vanished, and the market collapsed. The parallel to a startup pausing a reported $71 billion round after 'viral posts drew fresh scrutiny' is exact: valuations climb on belief alone, and can stop the instant that belief wavers.",
        "source": "Tulip mania (1636–1637), Dutch Republic — overview via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Tulip_mania",
        "image": {
          "src": "/covers/deepseek-funding-pause--a0.png",
          "alt": "Line chart of a standardized tulip-bulb price index rising almost vertically to a peak on 3 February 1637 and then crashing.",
          "credit": "JayHenry, 'Tulip price index, 1636–1637' (data after Earl A. Thompson, 2007). CC BY-SA 3.0, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Dot-com Bubble and the NASDAQ peak of March 2000",
        "excerpt": "Between 1995 and early 2000, investors poured money into internet startups on the strength of a transformative technology story, driving the NASDAQ Composite up roughly fivefold to a peak on 10 March 2000 — after which it fell nearly 78 percent, wiping out companies whose valuations had rested on promise rather than profit. Like the AI investment frenzy now surrounding DeepSeek, the era mistook a genuine technological revolution for a guarantee that any richly-valued vehicle riding it would pay off. The sudden pause in a headline-grabbing raise echoes the moment the dot-com euphoria tipped into reckoning.",
        "source": "Dot-com bubble (c.1995–2000) — overview via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Dot-com_bubble",
        "image": {
          "src": "/covers/deepseek-funding-pause--a1.png",
          "alt": "Line chart of the NASDAQ Composite index spiking to a peak in early 2000 and then falling steeply.",
          "credit": "Lalala666, 'Nasdaq Composite dot-com bubble'. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), 'The Tulipomania'",
        "excerpt": "Many individuals grew suddenly rich. A golden bait hung temptingly out before the people, and one after the other, they rushed to the tulip-marts, like flies around a honey-pot. Every one imagined that the passion for tulips would last for ever, and that the wealthy from every part of the world would send to Holland, and pay whatever prices were asked for them.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, 'The Tulipomania', via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm"
      },
      {
        "category": "literary",
        "title": "Anthony Trollope, The Way We Live Now (1875), on the Vera Cruz railway scheme",
        "excerpt": "The object of Fisker, Montague, and Montague was not to make a railway to Vera Cruz, but to float a company. Paul thought that Mr. Fisker seemed to be indifferent whether the railway should ever be constructed or not. It was clearly his idea that fortunes were to be made out of the concern before a spadeful of earth had been moved.",
        "source": "Anthony Trollope, The Way We Live Now, Chapter IX, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
      },
      {
        "category": "artistic",
        "title": "Jan Brueghel the Younger, Satire on Tulip Mania (c. 1640), oil on panel, Frans Hals Museum, Haarlem",
        "excerpt": "Brueghel dresses the speculators as monkeys in fine merchants' clothes: they weigh bulbs, count money, seal deals with a handshake and feast lavishly — while at the right the bubble bursts, one ape urinates on now-worthless flowers, and another is hauled before a judge for his debts. Painted just after the 1637 crash, it turns a financial mania into a mocking allegory of human folly. For a startup pausing a reported $71 billion round amid 'fresh scrutiny,' the picture is a mirror: the same crowd that inflates a valuation is quick to jeer when it deflates.",
        "source": "Jan Brueghel the Younger, Satire on Tulip Mania (c. 1640), Frans Hals Museum — file page on Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/deepseek-funding-pause--a4.png",
          "alt": "Oil painting of monkeys dressed as 17th-century Dutch merchants trading tulip bulbs, feasting, and, at right, being taken to court after the market's collapse.",
          "credit": "Jan Brueghel the Younger, 'Satire on Tulip Mania', c. 1640, Frans Hals Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "William Hogarth, The South Sea Scheme (An Emblematical Print on the South Sea Scheme), 1721, engraving",
        "excerpt": "Hogarth's engraving satirizes the 1720 South Sea Bubble: a crowd rides a giddy merry-go-round of speculation while Honesty is broken on a wheel and Honour flogged, and figures of every rank scramble after paper riches beneath the London skyline. Often called the first editorial cartoon, it indicts the credulity and greed that swell a mania before the collapse. It speaks directly to a fundraising frenzy that soars on rumor and viral posts, then stalls when scrutiny arrives.",
        "source": "William Hogarth, An Emblematical Print on the South Sea Scheme (1721) — via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Emblematical_Print_on_the_South_Sea_Scheme",
        "image": {
          "src": "/covers/deepseek-funding-pause--a5.png",
          "alt": "Satirical engraving of a chaotic London scene with crowds riding a wooden merry-go-round of speculators, a figure being broken on a wheel, and allegorical figures of ruin.",
          "credit": "William Hogarth, 'The South Sea Scheme', 1721. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "india-education-minister-resigns-protests",
    "headline": "India's education minister Dharmendra Pradhan resigns after weeks of student-led 'Cockroach' protests over exam-paper leaks",
    "overview": "Dharmendra Pradhan resigned as India's education minister on Saturday, the biggest concession yet by Prime Minister Narendra Modi's government to a months-long youth movement. Demonstrators tied to the satirical Cockroach Janta Party had held nationwide sit-ins and hunger strikes demanding his removal over leaks in the country's most competitive entrance exams. The protests channel wider anger among young Indians over exam integrity, job scarcity and government accountability.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQUXFJdGduZGxPd1kyNS03UGZzRjR2eW9oRjVMUGtwV3dsZTcxZlVlRnJtblUzVVdXRmNHZkxpWnZjWktlNFNHaDJrSXp0VTdmSWJiWk0tLUxOMzBERU9Zc0h3a2owckFaa1JGRlcyQm9LeUFsSXZDcUE0TFVLVmNadDVvaFNuLXhCNlQxLVZUM3oycHU0SkQzM3RR?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPajR0a3JtLUFZTGVwMWJFUDdCR2M1UlpfRGpUU3FEUmlsM3lsNnlsNGMzNkx4VFRlVmNyWUdvTHgwbFBuaVF2czduWDdDNXg2X3Z2M0pOTEFSZklJaVBVbXlYLTZ0czY5V0lUWjNob0d0SnF5NWE4dDlUamNvUTVDT2ZrV1l4dmNVdEZjbVl3YjJYajJ1RDJwbzNZWjdWZGdoNm11NUhvb1hiVEhmbU1rRDZEeVBmdDBlS3c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/india-education-minister-resigns-protests.png",
      "alt": "Portrait of India's Union Education Minister Dharmendra Pradhan",
      "credit": "Dharmendra Pradhan, Minister of Education, Government of India; Government Open Data License – India, via Wikimedia Commons."
    },
    "lead": true,
    "rank": 27,
    "edition": "Morning Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, First Oration against Verres (In Verrem), 70 BC (trans. C. D. Yonge)",
        "excerpt": "Caius Verres is brought to trial as a criminal, a man condemned in the opinion of every one by his life and actions, but acquitted by the enormousness of his wealth according to his own hope and boast. I, O judges, have undertaken this cause as prosecutor with the greatest good wishes and expectation on the part of the Roman people, not in order to increase the unpopularity of the senate, but to relieve it from the discredit which I share with it. For I have brought before you a man, by acting justly in whose case you have an opportunity of retrieving the lost credit of your judicial proceedings, of regaining your credit with the Roman people, and of giving satisfaction to foreign nations; a man, the embezzler of the public funds, the petty tyrant of Asia and Pamphylia, the robber who deprived the city of its rights, the disgrace and ruin of the province of Sicily.",
        "source": "Cicero's prosecution of Gaius Verres, the rapacious governor of Sicily, whose guilt was so plain to public opinion that he fled Rome into exile before judgment; it echoes India's education minister Dharmendra Pradhan, a discredited official driven from office by mounting public pressure. C. D. Yonge translation via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Against_Verres/First_pleading",
        "image": {
          "src": "/covers/india-education-minister-resigns-protests--a0.png",
          "alt": "Ancient marble bust of the Roman orator Cicero",
          "credit": "Portrait bust of Cicero (1st century BC), Palazzo Nuovo, Musei Capitolini, Rome; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The April Revolution, South Korea (1960)",
        "excerpt": "In April 1960 South Korean students poured into the streets after a brazenly rigged election and the killing of a young protester whose battered body washed up in Masan harbor. Within days the demonstrations spread nationwide and professors joined their students, until the aging strongman Syngman Rhee, who had ruled for twelve years, resigned and fled into exile. It stands among the twentieth century's clearest cases of a student movement forcing a nation's leader from power.",
        "source": "The Library of Congress research guide to South Korea's April Revolution, when a nationwide student uprising over a rigged election forced President Syngman Rhee to resign — a modern parallel to youth protests toppling a top official.",
        "href": "https://guides.loc.gov/south-korean-democratization-movement/april-19-revolution",
        "image": {
          "src": "/covers/india-education-minister-resigns-protests--a1.png",
          "alt": "Portrait photograph of Syngman Rhee",
          "credit": "Portrait of Syngman Rhee, first President of South Korea; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Victor Hugo, Les Misérables, Vol. V 'Jean Valjean' (1862)",
        "excerpt": "Yes, instruction! light! light! everything comes from light, and to it everything returns. Citizens, the nineteenth century is great, but the twentieth century will be happy.",
        "source": "Enjolras's speech from the ABC students' barricade in Hugo's novel of the 1832 Paris uprising, Isabel F. Hapgood's translation (Project Gutenberg) — the classic literary vision of idealistic youth rising against an unjust order.",
        "href": "https://www.gutenberg.org/cache/epub/135/pg135.txt",
        "image": {
          "src": "/covers/india-education-minister-resigns-protests--a2.png",
          "alt": "Photographic portrait of Victor Hugo",
          "credit": "Victor Hugo photographed by Étienne Carjat, 1876; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Book of Daniel 5:25–28, King James Bible (1611)",
        "excerpt": "And this is the writing that was written, MENE, MENE, TEKEL, UPHARSIN. This is the interpretation of the thing: MENE; God hath numbered thy kingdom, and finished it. TEKEL; Thou art weighed in the balances, and art found wanting. PERES; Thy kingdom is divided, and given to the Medes and Persians.",
        "source": "Daniel reads the writing on the wall to King Belshazzar, warning that the mighty ruler has been weighed and found wanting — the prophet confronting power and reckoning delivered against the unaccountable (King James Version, Project Gutenberg).",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/india-education-minister-resigns-protests--a3.png",
          "alt": "Rembrandt painting of Belshazzar recoiling from glowing Hebrew writing on the wall",
          "credit": "Rembrandt, Belshazzar's Feast (c. 1635–1638), National Gallery, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Eugène Delacroix, Liberty Leading the People (1830)",
        "excerpt": "Delacroix's vast canvas of the July 1830 revolution shows an allegory of Liberty striding across the barricade, tricolour in one hand and a musket in the other, leading a ragged crowd of workers, a top-hatted bourgeois and a pistol-waving boy over the bodies of the fallen. It is the defining image of a people rising as one to topple a discredited ruler.",
        "source": "Delacroix's icon of the July Revolution that drove King Charles X from the throne, now in the Louvre — the emblematic depiction of the people rising to bring down those in power.",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/india-education-minister-resigns-protests--a4.png",
          "alt": "Allegorical figure of Liberty holding a tricolour flag and leading a crowd over a barricade",
          "credit": "Eugène Delacroix, Liberty Leading the People (1830), Louvre; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Rouget de Lisle, La Marseillaise (1792)",
        "excerpt": "Claude-Joseph Rouget de Lisle wrote his war song in Strasbourg in 1792; it swept France as 'La Marseillaise' and became the archetypal call for citizens to rise against tyranny, its opening summons — 'Allons enfants de la Patrie' — rallying crowds against unjust power ever since. Isidore Pils's painting captures the electric moment of its first performance, the composer's voice seizing a roomful of listeners.",
        "source": "France's revolutionary anthem, composed by Claude-Joseph Rouget de Lisle in 1792, with scores at IMSLP — the archetypal song of citizens summoned to rise against tyranny; the image is Pils's painting of its first singing.",
        "href": "https://imslp.org/wiki/La_Marseillaise_(Rouget_de_Lisle,_Claude-Joseph)",
        "image": {
          "src": "/covers/india-education-minister-resigns-protests--a5.png",
          "alt": "Painting of Rouget de Lisle singing La Marseillaise to a gathered group",
          "credit": "Isidore Pils, Rouget de Lisle chantant la Marseillaise (1849), Musée historique de Strasbourg; public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "guterres-un-chief-syria-visit",
    "headline": "UN Secretary-General Antonio Guterres visits Syria, the first trip by a UN chief since before the 2011 civil war",
    "overview": "Antonio Guterres arrived in Damascus on Saturday for the first visit by a United Nations secretary-general since Ban Ki-moon in 2009, before Syria's civil war. He was welcomed by Foreign Minister Asaad al-Shaibani and is due to meet President Ahmed al-Sharaa, whose government took power after the fall of Bashar al-Assad. Guterres said the three-day trip is meant to reaffirm UN support for Syria's transition after more than 13 years of conflict.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPNnQ1ZzI5WjVHajNLZnJhZTRwYndTLUZVZHVldS13NF8xSDdQRzNDcFc2UWQ2TXhvUWtDMEdsUFVOSEZBcE1YX3hfZ1pJNG44UjdlNnNDTkwwM01MQy1qWkRkck1yVjU4Y2pRY3c5VC1hZVVudDZTbEhIOWlOS19SNk44WUNkQ0lTNGxtRWlTXzUtT0UwTmVOTzltUl80V3JsZTBjZHdwYjA3ejBpMnB1YnBKZ1p4WjZyLWc?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/25/guterres-arrives-in-syria-in-first-official-visit-by-a-un-chief-in-17-years"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/guterres-un-chief-syria-visit.png",
      "alt": "Portrait of United Nations Secretary-General Antonio Guterres speaking at a podium",
      "credit": "Photograph of UN Secretary-General Antonio Guterres (2019) by Cancilleria Argentina; CC BY 2.0, via Wikimedia Commons."
    },
    "rank": 28,
    "edition": "Morning Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Book of Nehemiah, chapters 1-2 (c. 445 BC), King James Version",
        "excerpt": "Then said I unto them, Ye see the distress that we are in, how Jerusalem lieth waste, and the gates thereof are burned with fire: come, and let us build up the wall of Jerusalem, that we be no more a reproach. Then I told them of the hand of my God which was good upon me; as also the king's words that he had spoken unto me. And they said, Let us rise up and build. So they strengthened their hands for this good work.",
        "source": "The Hebrew Bible's account of a royal envoy who returns from Babylonian exile to a Jerusalem lying in ruins and rallies its people to rebuild the city walls (KJV via Wikisource), echoing an outsider bearing hope who calls a broken city back to reconstruction.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Nehemiah",
        "image": {
          "src": "/covers/guterres-un-chief-syria-visit--a0.png",
          "alt": "Engraving of Nehemiah on horseback surveying the ruined walls of Jerusalem by night",
          "credit": "Gustave Dore, Nehemiah Views the Ruins of Jerusalem's Walls, engraving from La Grande Bible de Tours (1866); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Procopius of Caesarea, Buildings (De Aedificiis), Book II (c. 550s AD)",
        "excerpt": "Thus did the Emperor Justinian reconstruct the walls of Antiochia; he also rebuilt the entire city, which was burnt by the enemy. As the whole city was reduced to ashes, and levelled to the ground, and only heaps of rubbish remained after the conflagration, it was at first impossible for the citizens of Antiochia to recognise the site of their own dwellings.",
        "source": "The Byzantine court historian describes how the emperor Justinian restored the great Syrian city of Antioch after it was burned to ashes by the Persians (Aubrey Stewart's 1888 translation via Project Gutenberg), a literal account of rebuilding a devastated Syrian city that resonates with UN pledges to support Syria's reconstruction.",
        "href": "https://www.gutenberg.org/files/65404/65404-h/65404-h.htm",
        "image": {
          "src": "/covers/guterres-un-chief-syria-visit--a1.png",
          "alt": "Byzantine mosaic of Emperor Justinian I and his retinue in the Basilica of San Vitale, Ravenna",
          "credit": "Emperor Justinian I mosaic, Basilica of San Vitale, Ravenna (c. 547 AD); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey, Book XIII (c. 8th century BC), trans. Samuel Butler",
        "excerpt": "As she spoke the goddess dispersed the mist and the land appeared. Then Ulysses rejoiced at finding himself again in his own land, and kissed the bounteous soil; he lifted up his hands and prayed to the nymphs.",
        "source": "Homer's epic of the war-weary wanderer's long-delayed homecoming to Ithaca, where the mist lifts to reveal a homeland changed after twenty years of absence and war (Samuel Butler's prose translation via Project Gutenberg), an image of return after long separation.",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm",
        "image": {
          "src": "/covers/guterres-un-chief-syria-visit--a2.png",
          "alt": "Painting of Athena revealing the coast of Ithaca to a returning Ulysses",
          "credit": "Giuseppe Bottani, Athena Revealing Ithaca to Ulysses (18th century); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Book of Isaiah, chapter 61 (c. 6th century BC), King James Version",
        "excerpt": "To appoint unto them that mourn in Zion, to give unto them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness; that they might be called trees of righteousness, the planting of the LORD, that he might be glorified. And they shall build the old wastes, they shall raise up the former desolations, and they shall repair the waste cities, the desolations of many generations.",
        "source": "The prophet Isaiah's promise of comfort to those who mourn and of raising ruined cities from generations of desolation (KJV via Wikisource), a vision of consolation and rebuilding for a broken land.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Isaiah",
        "image": {
          "src": "/covers/guterres-un-chief-syria-visit--a3.png",
          "alt": "Section of the ancient Great Isaiah Scroll from the Dead Sea Scrolls, written in Hebrew on parchment",
          "credit": "The Great Isaiah Scroll (1QIsa-a), Dead Sea Scrolls, Shrine of the Book, Israel Museum, Jerusalem; Google Art Project, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "David Roberts, Baalbec - Ruins of the Temple of Bacchus (1839)",
        "excerpt": "Roberts' luminous lithograph rises over toppled columns and shattered entablatures of a once-magnificent temple, tiny figures dwarfed by the golden stone of a Near Eastern city fallen into ruin. Drawn on the artist's celebrated journey through the Ottoman Levant, it fixes the grandeur and desolation of a great regional metropolis in decay - a Romantic emblem of splendour laid waste and awaiting renewal.",
        "source": "The Scottish painter David Roberts' famous 1839 view of the ruined temples of Baalbek in the Ottoman Levant (via Wikimedia Commons), a vivid image of a magnificent Near Eastern city broken by time and violence.",
        "href": "https://commons.wikimedia.org/wiki/File:David_Roberts_-_Baalbec_-_Ruins_of_the_Temple_of_Bacchus_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/guterres-un-chief-syria-visit--a4.png",
          "alt": "Lithograph of the ruined columns of the Temple of Bacchus at Baalbek in the Levant",
          "credit": "David Roberts, Baalbec - Ruins of the Temple of Bacchus (1839), lithograph; Google Art Project, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Johannes Brahms, Ein deutsches Requiem (A German Requiem), Op. 45 (1868)",
        "excerpt": "Brahms' German Requiem opens not with dread but with consolation, its low strings and hushed chorus intoning that the mourning shall be comforted and that those who sow in tears shall reap in joy. Unlike the traditional Latin mass for the dead, it addresses the living who grieve, moving across seven movements from sorrow toward a serene benediction on those who are at rest. It stands as one of music's most humane meditations on loss and the hope of renewal, fitting for a land emerging from more than thirteen years of war.",
        "source": "Brahms' consoling choral requiem, built on scriptural words of comfort for those who mourn rather than the Latin mass for the dead (public-domain score via IMSLP), a musical meditation on grief and consolation for a people recovering from long conflict.",
        "href": "https://imslp.org/wiki/Ein_deutsches_Requiem,_Op.45_(Brahms,_Johannes)",
        "image": {
          "src": "/covers/guterres-un-chief-syria-visit--a5.png",
          "alt": "Photographic portrait of the composer Johannes Brahms",
          "credit": "Photographic portrait of Johannes Brahms; public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "houthis-missile-attack-saudi-arabia",
    "headline": "Iran-backed Houthis launch a missile attack on Saudi Arabia; a Greek-operated air-defense system intercepts the salvo",
    "overview": "Yemen's Houthi movement said it fired missiles at Saudi Arabia, and Saudi air defenses, including a Greek-operated system, shot down the incoming projectiles aimed at an oil refinery. It was one of the most serious exchanges between the two sides in months and revived fears of a wider Gulf escalation. No casualties were immediately reported.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cj9d27v70j1o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQN3g2TnRFRlEzbjhJTy13dGx3cGszWE0ydEZ2bGlEUlIyR3diOTVmYlJZdDQyY1dhc0dNWjZISm1VOW54akNlQ1FkQTFTZnFLR01adUh6cGlLSV95OVJ2Ym1ydGFtVW5uNnBZaWE2Vzhld0UtdFdRSy05clpSblJHZzdXQXhFcUNseV9zYXFyRUNIRWxLeE92amowZGlMZTg5dGpwTEo1VVF5SzB6b3B6bGt3M3VDREE0M3VHcVFtME40S0JDNHJj?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/houthis-missile-attack-saudi-arabia.png",
      "alt": "A Patriot surface-to-air missile streaking upward from its launcher against a blue sky, trailing smoke and flame.",
      "credit": "U.S. Army photo (Redstone Arsenal), uploaded by Bernd vdB; public domain, via Wikimedia Commons."
    },
    "rank": 29,
    "edition": "Morning Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides, History of the Peloponnesian War, Book 2 — the siege of Plataea (c. 431 BC), Crawley translation",
        "excerpt": "While raising the mound the Peloponnesians also brought up engines against the city, one of which was brought up upon the mound against the great building and shook down a good piece of it, to the no small alarm of the Plataeans. Others were advanced against different parts of the wall but were lassoed and broken by the Plataeans; who also hung up great beams by long iron chains from either extremity of two poles laid on the wall and projecting over it, and drew them up at an angle whenever any point was threatened by the engine, and loosing their hold let the beam go with its chains slack, so that it fell with a run and snapped off the nose of the battering ram.",
        "source": "Thucydides' classical account (Richard Crawley's translation) of the Spartan-led siege of Plataea, in which the defenders improvised a counter-weapon that intercepted and broke the enemy's battering engines in mid-strike — an ancient mirror of a defensive system knocking down incoming projectiles.",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt",
        "image": {
          "src": "/covers/houthis-missile-attack-saudi-arabia--a0.png",
          "alt": "Marble portrait bust of the historian Thucydides.",
          "credit": "Roman marble bust of Thucydides, Royal Ontario Museum; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire, Chapter LXVIII — the fall of Constantinople (1453)",
        "excerpt": "The explosion was felt or heard in a circuit of a hundred furlongs: the ball, by the force of gunpowder, was driven above a mile; and on the spot where it fell, it buried itself a fathom deep in the ground.",
        "source": "Gibbon's narrative of Mehmed II's monstrous bombard hurling a stone ball more than a mile against Constantinople in 1453, one of history's most famous artillery bombardments of a city — a projectile flung across the sky to shatter a defended stronghold.",
        "href": "https://www.ccel.org/g/gibbon/decline/volume2/chap68.htm",
        "image": {
          "src": "/covers/houthis-missile-attack-saudi-arabia--a1.png",
          "alt": "Medieval miniature of the 1453 siege of Constantinople, showing Ottoman forces and cannon arrayed before the city's walls.",
          "credit": "Jean Le Tavernier, The Siege of Constantinople (after 1455), Bibliothèque nationale de France, MS Fr. 9087; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book I (Apollo's plague) — Samuel Butler prose translation",
        "excerpt": "He came down furious from the summits of Olympus, with his bow and his quiver upon his shoulder, and the arrows rattled on his back with the rage that trembled within him. He sat himself down away from the ships with a face as dark as night, and his silver bow rang death as he shot his arrow in the midst of them. First he smote their mules and their hounds, but presently he aimed his shafts at the people themselves, and all day long the pyres of the dead were burning.",
        "source": "The opening of Homer's epic (Samuel Butler's translation), in which the archer-god Apollo descends in wrath and rains death-dealing arrows on the Achaean camp — the ancient literary image of missiles falling from the sky upon those below.",
        "href": "https://www.gutenberg.org/files/2199/2199-h/2199-h.htm",
        "image": {
          "src": "/covers/houthis-missile-attack-saudi-arabia--a2.png",
          "alt": "The Apollo Belvedere, a marble statue of the god Apollo shown as an archer just after loosing an arrow.",
          "credit": "Apollo Belvedere, Roman copy after a Greek bronze, Vatican Museums; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Psalm 91 (King James Version, 1611), verses 4–7",
        "excerpt": "He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler. Thou shalt not be afraid for the terror by night; nor for the arrow that flieth by day; Nor for the pestilence that walketh in darkness; nor for the destruction that wasteth at noonday. A thousand shall fall at thy side, and ten thousand at thy right hand; but it shall not come nigh thee.",
        "source": "The psalm's famous promise of a divine shield against 'the arrow that flieth by day,' pairing the imagery of the incoming missile with the buckler that turns it aside — exactly the spear-and-shield tension of an air-defense interception.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms",
        "image": {
          "src": "/covers/houthis-missile-attack-saudi-arabia--a3.png",
          "alt": "Carolingian manuscript illumination of an armed archer drawing his bow, from the Stuttgart Psalter.",
          "credit": "Archer from the Stuttgart Psalter (c. 820–830), Württembergische Landesbibliothek, Cod. bibl. fol. 23; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Paolo Uccello, The Battle of San Romano (c. 1435–1440), National Gallery, London",
        "excerpt": "A thicket of lances rises across the panel like a barrage frozen in flight, some couched and driving forward, others shattered and falling, while broken weapons litter the ground beneath the rearing horses. Uccello turns a chaotic clash of missiles and armor into a strict lattice of trajectories, every shaft a vector aimed across the field. It is bombardment rendered as geometry — the volley and the guard against it caught in the same rigid perspective.",
        "source": "Uccello's celebrated battle panel depicting the 1432 clash between Florence and Siena, a Renaissance vision of a sky crowded with converging lances and hurled weapons that visually echoes a modern salvo and the defenders arrayed against it.",
        "href": "https://commons.wikimedia.org/wiki/File:San_Romano_Battle_(Paolo_Uccello,_London)_01.jpg",
        "image": {
          "src": "/covers/houthis-missile-attack-saudi-arabia--a4.png",
          "alt": "Paolo Uccello's painting of the Battle of San Romano, with mounted knights and a dense forest of raised and broken lances.",
          "credit": "Paolo Uccello, The Battle of San Romano (c. 1435–1440), National Gallery, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 (1880)",
        "excerpt": "Tchaikovsky's festival overture builds a martial narrative from clashing anthems into a climax punctuated by live cannon fire and pealing bells, staging an assault and its repulse in pure sound. The scored artillery blasts land like incoming ordnance answered by the surging orchestra, a musical drama of bombardment and defiant defense. It remains the most literal depiction of missiles and their thunderous interception in the concert repertoire.",
        "source": "Tchaikovsky's overture commemorating Russia's defense against Napoleon's 1812 invasion, famous for its notated cannon shots — a public-domain work that turns bombardment and resistance into orchestral spectacle, mirroring a salvo met by defending fire.",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)",
        "image": {
          "src": "/covers/houthis-missile-attack-saudi-arabia--a5.png",
          "alt": "Photographic portrait of the composer Pyotr Ilyich Tchaikovsky.",
          "credit": "Portrait of Pyotr Ilyich Tchaikovsky; public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "romania-shoots-down-second-drone",
    "headline": "Romania shoots down a second drone breaching its airspace in two days near the Ukraine border",
    "overview": "Romania said a fighter jet shot down a drone that violated its airspace early Saturday near Sfantu Gheorghe in the Danube Delta, the second such incident in two days. President Nicusor Dan said two F-16s were scrambled after radar detected the intrusion; prosecutors identified the drone downed on Friday as Russian. The NATO member says Russian drones have breached its airspace about 30 times since 2022.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxNenNib19JWnhPbU00bUNBREJvbHB3MzUxaVJZdHpCdVUxQXFSZl9mS3RsU2E4MXpkZ3FLYy0ySWJSOU8ycnljNlJyQjVqRVozcUJQcTROVGl2WERzUmk0VGxLX2xUQkllY0N1d2xCbFgxSXpiSThRc1ZZazBUN0ZtRGthTnRCRF9CQktPdGtqUWZETnFjdHQ2NFktMkpJWVd6TkZOWlhEdkhYZF9hcmhn?oc=5"
      },
      {
        "name": "Times of Israel",
        "href": "https://www.timesofisrael.com/liveblog_entry/romania-shoots-down-second-drone-breaching-its-airspace-defense-ministry-says/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/romania-shoots-down-second-drone.png",
      "alt": "A pair of Romanian Air Force F-16 fighter jets flying in formation over the sea.",
      "credit": "F-16s of the Romanian Air Force over the Baltic Sea; U.S. Air Force photo, public domain, via Wikimedia Commons."
    },
    "rank": 30,
    "edition": "Morning Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Historia Augusta, Life of Hadrian 11.2 (4th c. AD), on the building of Hadrian's Wall",
        "excerpt": "And so, having reformed the army quite in the manner of a monarch, he set out for Britain, and there he corrected many abuses and was the first to construct a wall, eighty miles in length, which was to separate the barbarians from the Romans.",
        "source": "The Roman imperial biography records Hadrian fortifying the empire's edge with a wall to keep the barbarians out, the classic image of a frontier held under threat; David Magie's Loeb translation, hosted on Bill Thayer's LacusCurtius.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Historia_Augusta/Hadrian/1*.html",
        "image": {
          "src": "/covers/romania-shoots-down-second-drone--a0.png",
          "alt": "The stone course of Hadrian's Wall running across open green hills west of Housesteads Roman fort.",
          "credit": "Hadrian's Wall west of Housesteads, Northumberland; photo by Adam Cuerden / others, CC-licensed, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Procopius of Caesarea, Buildings (De Aedificiis), Book IV (c. 550s AD), on Justinian's Danube defences",
        "excerpt": "And wishing, as he did, to make the Ister River the strongest possible line of first defence before them and before the whole of Europe, he distributed numerous forts along the bank of the river, as I shall soon describe, and he placed garrisons of troops everywhere along the shore, in order to put the most rigid check upon the crossing of the barbarians there.",
        "source": "Procopius describes Justinian lining the Danube (Ister) with forts and garrisons to stop barbarians crossing, an ancient echo of a threatened river frontier that runs through the very region of the Danube Delta; H. B. Dewing's Loeb translation, via LacusCurtius.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Buildings/4A*.html",
        "image": {
          "src": "/covers/romania-shoots-down-second-drone--a1.png",
          "alt": "Byzantine mosaic of the Emperor Justinian I, crowned and haloed, flanked by his court and soldiers.",
          "credit": "Emperor Justinian I, mosaic (c. 547) in the Basilica of San Vitale, Ravenna; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, Agamemnon, prologue (458 BC), the watchman's speech",
        "excerpt": "Release from this weary task of mine has been my plea to the gods throughout this long year's watch, in which, lying upon the palace roof of the Atreidae, upon my bent arm, like a dog, I have learned to know well the gathering of the night's stars, those radiant potentates conspicuous in the firmament, bringers of winter and summer to mankind [the constellations, when they rise and set]. So now I am still watching for the signal-flame, the gleaming fire that is to bring news from Troy and tidings of its capture.",
        "source": "The tragedy opens with a lone watchman on the palace roof, wearily scanning the night sky for the beacon fire that signals danger and war, the archetype of the solitary sentinel on duty; Herbert Weir Smyth's translation on Perseus (Tufts).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0004:card=1",
        "image": {
          "src": "/covers/romania-shoots-down-second-drone--a2.png",
          "alt": "Marble portrait bust of the ancient Greek playwright Aeschylus.",
          "credit": "Bust of Aeschylus (Roman copy of a Greek original); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Book of Ezekiel 33:6-7, King James Version (1611)",
        "excerpt": "But if the watchman see the sword come, and blow not the trumpet, and the people be not warned; if the sword come, and take any person from among them, he is taken away in his iniquity; but his blood will I require at the watchman's hand. So thou, O son of man, I have set thee a watchman unto the house of Israel; therefore thou shalt hear the word at my mouth, and warn them from me.",
        "source": "The prophet is charged as a watchman who must blow the trumpet the moment he sees the sword come upon the land, a scriptural image of vigilance and warning against an approaching threat; King James Version text via Bible Hub.",
        "href": "https://biblehub.com/kjv/ezekiel/33.htm",
        "image": {
          "src": "/covers/romania-shoots-down-second-drone--a3.png",
          "alt": "Michelangelo's fresco of the prophet Ezekiel on the Sistine Chapel ceiling, turning sharply as if startled.",
          "credit": "Michelangelo, The Prophet Ezekiel (1510), Sistine Chapel ceiling, Vatican; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Rembrandt van Rijn, The Night Watch (1642), Rijksmuseum, Amsterdam",
        "excerpt": "Rembrandt's vast group portrait shows a civic militia company surging into motion, muskets shouldered and a captain giving the order to march out. Light rakes across the crowd of armed watchmen as they muster to defend their city. It is the most famous image in art of citizen-soldiers turned out to stand guard.",
        "source": "The painting depicts a company of Amsterdam's civic guard mustering under arms, the definitive artistic vision of watchmen called to defend their home; oil on canvas in the Rijksmuseum (object SK-C-5).",
        "href": "https://www.rijksmuseum.nl/en/collection/SK-C-5",
        "image": {
          "src": "/covers/romania-shoots-down-second-drone--a4.png",
          "alt": "Rembrandt's The Night Watch, a militia company in seventeenth-century dress advancing out of shadow into light.",
          "credit": "Rembrandt van Rijn, The Night Watch (1642), Rijksmuseum, Amsterdam; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Symphony No. 100 in G major \"Military\", Hob.I:100 (1794)",
        "excerpt": "Haydn's \"Military\" Symphony erupts with the clamor of the parade ground: a serene G-major melody is suddenly overrun by crashing cymbals, triangle, and bass drum, the \"Turkish\" percussion of war. In the second movement a lone trumpet sounds a startling call to arms, as if a distant sentry had spotted an intruder crossing the frontier. The music mirrors Romania's guarded border, where quiet vigilance gives way in an instant to the alarm of a downed drone.",
        "source": "Haydn's 1794 London symphony, famed for its martial percussion and a sudden trumpet fanfare of alarm, echoes Romania's frontier defenders scrambling to down a second intruding drone. Score and edition via IMSLP.",
        "href": "https://imslp.org/wiki/Symphony_No.100_in_G_major,_Hob.I:100_(Haydn,_Joseph)",
        "image": {
          "src": "/covers/romania-shoots-down-second-drone--a5.png",
          "alt": "Painted portrait of the composer Joseph Haydn",
          "credit": "Thomas Hardy, portrait of Joseph Haydn (1791), Royal College of Music, London; public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "canada-nato-intern-belgium-spying",
    "headline": "Belgium arrests a Canadian former NATO intern on suspicion of spying for a foreign country",
    "overview": "Belgian authorities arrested a Canadian woman who had interned at NATO's SHAPE military headquarters in Mons on suspicion of espionage for a third country and membership of a criminal organization. Investigators said she came to the attention of SHAPE security, which alerted Belgium's intelligence service; police searched her home in the Charleroi area. Officials declined to name her or the country she is accused of aiding.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxQSjhwUHpvTVFodm9TOHNxX3ctYU5lUFNvNURaU1VZemFpak1VZ1R4M2xUblJLMEI0UTM5Si1HZk9XVS1PMjBYaklkUkJvdmhPNGVfdV9GaGoxUmJOVWpQVDZ6QWxoT3dhRU83WERPYnRQTlBoY1NUV3I3emNnMkQxNk1SeEV5RlRmQlozYnRFaHBtQVhVczZXaVJpRjFZU1lya2FwM3ZJdTB1WkxpLU5ScDZkcw?oc=5"
      },
      {
        "name": "Malay Mail",
        "href": "https://www.malaymail.com/news/world/2026/07/25/belgium-detains-nato-intern-accused-of-espionage-and-criminal-ties/228937"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/canada-nato-intern-belgium-spying.png",
      "alt": "The Supreme Headquarters Allied Powers Europe (SHAPE), NATO's military headquarters at Casteau near Mons, Belgium.",
      "credit": "SHAPE headquarters, Casteau (Mons), Belgium; photo by Ex13, via Wikimedia Commons (CC BY-SA)."
    },
    "rank": 31,
    "edition": "Morning Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Livy, History of Rome (Ab Urbe Condita), Book 1.11 (c. 27-25 BC)",
        "excerpt": "Once admitted, they crushed her to death beneath their shields, either that the citadel might appear to have been taken by assault, or that her example might be left as a warning that no faith should be kept with traitors.",
        "source": "Livy's account of Tarpeia, the Roman commander's daughter bribed to open the citadel to the besieging Sabines, is the classical archetype of the insider who betrays a trust from within the walls, exactly the fear SHAPE security had of its intern; Rev. Canon Roberts translation (Everyman, 1912), via Perseus.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=1:chapter=11",
        "image": {
          "src": "/covers/canada-nato-intern-belgium-spying--a0.png",
          "alt": "Roman silver denarius showing Tarpeia half-buried and crushed under the shields of two Sabine soldiers.",
          "credit": "L. Titurius L.f. Sabinus, silver denarius (89 BC, RRC 344/2c), reverse showing the punishment of Tarpeia; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Mary, Queen of Scots to Anthony Babington, the 'Gallows Letter' (17 July 1586)",
        "excerpt": "Trustie and welbeloved. According to the zeale and entier affection which I haue knowen in you towardes the common cause of relligion and mine",
        "source": "The ciphered letter in which Mary authorised the plot against Elizabeth I, telling Babington to 'sett the six gentlemen to woork', was intercepted and decoded by the spymaster Sir Francis Walsingham, whose agents unmasked the conspiracy from the inside, much as SHAPE security flagged its intern to Belgian intelligence; transcript via the British Library.",
        "href": "https://www.bl.uk/stories/blogs/posts/the-gallows-letter",
        "image": {
          "src": "/covers/canada-nato-intern-belgium-spying--a1.png",
          "alt": "Portrait of Sir Francis Walsingham, Elizabeth I's spymaster, dressed in black with a white ruff.",
          "credit": "Attributed to John de Critz the Elder, Sir Francis Walsingham (c. 1585), National Portrait Gallery, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Dante Alighieri, Inferno, Canto XXXIV (c. 1320), trans. Charles Eliot Norton",
        "excerpt": "“That soul up there which has the greatest punishment,” said the Master, “is Judas Iscariot, who has his head within, and plies his legs outside. Of the other two who have their heads down, he who hangs from the black muzzle is Brutus; see how he writhes and says no word; and the other is Cassius, who seems so large-limbed.”",
        "source": "In the Inferno's frozen lowest circle Dante reserves the worst torment for traitors, with Judas, betrayer of a trust, gnawed forever in the mouth of Lucifer beside Brutus and Cassius; Charles Eliot Norton's prose translation (1891-92), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/1995/pg1995.txt",
        "image": {
          "src": "/covers/canada-nato-intern-belgium-spying--a2.png",
          "alt": "Gustave Dore engraving of the giant winged Lucifer frozen in the ice at the center of Hell, chewing the traitors.",
          "credit": "Gustave Dore, illustration of Lucifer and the traitors for Dante's Inferno Canto XXXIV (1861); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Rudyard Kipling, Kim (1901)",
        "excerpt": "When everyone is dead the Great Game is finished. Not before. Listen to me till the end.",
        "source": "Kipling's novel follows an orphan recruited into the 'Great Game', the Anglo-Russian espionage contest on India's frontier, and gave the world its enduring name for the endless secret war of spies that this arrest evokes; via Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/2226/pg2226.txt",
        "image": {
          "src": "/covers/canada-nato-intern-belgium-spying--a3.png",
          "alt": "Decorated cover of the first edition of Rudyard Kipling's novel Kim.",
          "credit": "Cover of the first edition of Rudyard Kipling's Kim (Macmillan, 1901); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Giotto di Bondone, The Kiss of Judas (c. 1305), Scrovegni Chapel, Padua",
        "excerpt": "Judas swings his mustard-yellow cloak around Christ and pulls him into a false embrace, their locked gaze fixed at the still center of a fresco bristling with torches, clubs and spears. The kiss is the signal that marks the man for the soldiers, a private gesture of affection turned into an act of identification. Giotto freezes the exact instant a trusted intimate becomes an informer.",
        "source": "Giotto's fresco depicts the archetypal betrayal by someone close, Judas identifying Christ with a kiss, the image of trust weaponized that underlies every mole and informer.",
        "href": "https://commons.wikimedia.org/wiki/File:Giotto_-_Scrovegni_-_-31-_-_Kiss_of_Judas.jpg",
        "image": {
          "src": "/covers/canada-nato-intern-belgium-spying--a4.png",
          "alt": "Giotto fresco showing Judas embracing Christ to betray him, surrounded by a crowd with torches and spears.",
          "credit": "Giotto di Bondone, The Kiss of Judas (c. 1305), Scrovegni (Arena) Chapel, Padua; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Fidelio, Op. 72 (1805/1814)",
        "excerpt": "In Beethoven's only opera, Leonore disguises herself as a young man named 'Fidelio' and takes a job inside a state prison to reach her husband, a political prisoner held in secret by a vengeful governor. The drama turns on concealed identity, surveillance and a name that is itself a cover, until a trumpet call from the watchtower unmasks the tyrant. It is the opera of the citadel penetrated by someone who is not who they claim to be.",
        "source": "Beethoven's Fidelio dramatizes hidden identity and infiltration behind guarded walls, the same anxieties about the disguised insider raised by a NATO intern accused of spying; full score via IMSLP.",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/canada-nato-intern-belgium-spying--a5.png",
          "alt": "Joseph Karl Stieler's portrait of Ludwig van Beethoven holding a manuscript and pencil.",
          "credit": "Joseph Karl Stieler, portrait of Ludwig van Beethoven (1820); public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "kuwait-kpc-16-billion-pipeline-lease",
    "headline": "Kuwait's KPC signs a $16 billion lease-and-leaseback deal for its oil-pipeline network with Blackstone, KKR and Brookfield",
    "overview": "Kuwait Petroleum Corporation signed a $16 billion agreement to lease and lease back its crude-oil pipeline network to a consortium of Blackstone, KKR and Brookfield, in what Kuwait called the largest foreign direct investment in its history. Under the 20.5-year structure, the investors take a 49% stake while Kuwait Oil Company keeps 51% and operational control of 13 pipelines. The deal is expected to raise about $7.85 billion in upfront proceeds.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxNZ0JQQTg4MlNFY2RMbUw2Y1F6ZDdiLVBZNDUwbDBVYU0yZDVfVEVPSjM1NWVSdFM0SkRRdURmY2RvMXRJbXlJSDJwZXA3TGw1UllzRGFyU0lJLWZFOW9mbG5RcmdzNlAzeEJJT18xcUdRdWV3dUtzTi1Xc0sxX2ROZzhCcXpkdGxnek5QZXNzeVJ1azhQbFRVZloyQzFZZmVoQ2ZiRGdiRnJtaEZmZVVIaGhpZ283UXFnX3Y3MkpLOUx3RjFLSENSSXozUXE?oc=5"
      },
      {
        "name": "The National",
        "href": "https://www.thenationalnews.com/business/energy/2026/07/25/kuwait-signs-16bn-oil-pipeline-lease-deal-with-blackstone-brookfield-and-kkr/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/kuwait-kpc-16-billion-pipeline-lease.png",
      "alt": "Oil pipelines running across the desert of the Burgan oil field in Kuwait.",
      "credit": "Pipelines in the Burgan oil field, Kuwait. Photo by Javier Blas; CC BY-SA 3.0, via Wikimedia Commons."
    },
    "rank": 32,
    "edition": "Morning Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus, The Histories, Book 1 (c. 430 BC), trans. G. C. Macaulay",
        "excerpt": "Thus then, O Croesus, man is altogether a creature of accident. As for thee, I perceive that thou art both great in wealth and king of many men, but that of which thou didst ask me I cannot call thee yet, until I learn that thou hast brought thy life to a fair ending: for the very rich man is not at all to be accounted more happy than he who has but his subsistence from day to day, unless also the fortune go with him of ending his life well in possession of all things fair.",
        "source": "In Herodotus' Histories (G. C. Macaulay's translation, Project Gutenberg), the sage Solon warns the fabulously rich King Croesus that vast treasure guarantees no man's happiness until his life is well ended, a classical caution on reckoning wealth against the final account, as Kuwait converts the future value of its oil arteries into money today.",
        "href": "https://www.gutenberg.org/files/2707/2707-h/2707-h.htm",
        "image": {
          "src": "/covers/kuwait-kpc-16-billion-pipeline-lease--a0.png",
          "alt": "Painting of King Croesus displaying his heaped treasures to the visiting sage Solon.",
          "credit": "Caspar van der Hoecke, Croesus Showing his Treasures to Solon, National Museum in Warsaw; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The First Charter of the East India Company (1600), from A Collection of Charters and Statutes Relating to the East India Company",
        "excerpt": "None of the Queen's Subjects, but the Company, their Servants, or Assigns, shall resort to India without being licenced by the Company, upon Pain of forfeiting Ships and Cargoes, with Imprisonment, till the Offenders give One thousand Pounds Bond to the Company not to trade thither again.",
        "source": "This eighteenth-century collection on Wikisource abstracts Elizabeth I's 1600 charter granting a private company exclusive control over a strategic trade route, the early-modern template for consortiums of capital administering a nation's commercial lifeline, as Blackstone, KKR and Brookfield take a 49% stake in Kuwait's pipelines.",
        "href": "https://en.wikisource.org/wiki/Page:A_Collection_of_Charters_and_Statutes_relating_to_the_East_India_Company.pdf/10",
        "image": {
          "src": "/covers/kuwait-kpc-16-billion-pipeline-lease--a1.png",
          "alt": "The Armada Portrait of Queen Elizabeth I, her hand resting on a globe.",
          "credit": "Attributed to George Gower, Elizabeth I (the Armada Portrait), c. 1588, Queen's House, Royal Museums Greenwich; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Holy Bible (King James Version), Genesis 25 (1611)",
        "excerpt": "And Jacob said, Sell me this day thy birthright. And Esau said, Behold, I am at the point to die: and what profit shall this birthright do to me? And Jacob said, Swear to me this day; and he sware unto him: and he sold his birthright unto Jacob. Then Jacob gave Esau bread and pottage of lentiles; and he did eat and drink, and rose up, and went his way: thus Esau despised his birthright.",
        "source": "In the King James Bible's Genesis 25 (Wikisource), the famished Esau surrenders his birthright, his patrimony and inheritance, to Jacob for a single bowl of red pottage, the archetype of trading a lasting endowment for immediate sustenance, mirrored in leasing away control of a national asset for ready cash.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/kuwait-kpc-16-billion-pipeline-lease--a2.png",
          "alt": "Baroque painting of Esau selling his birthright to Jacob over a table with a bowl of pottage.",
          "credit": "Hendrick ter Brugghen, Esau Selling His Birthright, c. 1627; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "William Shakespeare, The Merchant of Venice, Act I, Scene 3 (c. 1596)",
        "excerpt": "Go with me to a notary, seal me there Your single bond; and in a merry sport, If you repay me not on such a day, In such a place, such sum or sums as are Express’d in the condition, let the forfeit Be nominated for an equal pound Of your fair flesh, to be cut off and taken In what part of your body pleaseth me.",
        "source": "In Shakespeare's Merchant of Venice (Project Gutenberg), Antonio seals Shylock's bond pledging a pound of his own flesh as security for a loan of ready money, the classic dramatization of the peril of mortgaging something vital to raise cash now, an unsettling shadow over pledging a strategic artery to financiers.",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm",
        "image": {
          "src": "/covers/kuwait-kpc-16-billion-pipeline-lease--a3.png",
          "alt": "Engraving of the courtroom trial scene from The Merchant of Venice, with Shylock and his scales before the court.",
          "credit": "The trial scene from The Merchant of Venice, print, British Museum (1851,0901.409); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Hendrick Cornelisz Vroom, The Return to Amsterdam of the Second Expedition to the East Indies (1599)",
        "excerpt": "Vroom's marine panorama crowds the water before Amsterdam with the tall, gun-bristling ships of the returning East India fleet, sails swelling and pennants streaming in the wind. Small boats scurry out to greet the treasure-laden vessels while crowds gather along the shore to welcome home the source of the city's fortune. It is a hymn to seaborne commerce, the moment when private trading capital and a nation's wealth first fused at the water's edge.",
        "source": "Vroom's celebrated seascape in the Rijksmuseum glorifies the homecoming of a merchant fleet laden with Eastern riches, capturing the age when private trading capital and national fortune became inseparable, a painterly echo of foreign investors buying into the arteries of Kuwait's oil wealth.",
        "href": "https://commons.wikimedia.org/wiki/File:De_terugkomst_in_Amsterdam_van_de_tweede_expeditie_naar_Oost-Indi%C3%AB,_Hendrik_Cornelisz_Vroom,_1599,_Rijksmuseum_SK-A-2858.jpg",
        "image": {
          "src": "/covers/kuwait-kpc-16-billion-pipeline-lease--a4.png",
          "alt": "Painting of a Dutch East India merchant fleet returning to a crowded Amsterdam harbour in 1599.",
          "credit": "Hendrick Cornelisz Vroom, The Return to Amsterdam of the Second Expedition to the East Indies (1599), Rijksmuseum (SK-A-2858); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold, WWV 86A (1869)",
        "excerpt": "Wagner's prelude rises from a single sustained E-flat, the Rhine itself murmuring into being, before the Rhinemaidens' song celebrates the gold glinting in the deep. When the dwarf Alberich forswears love to seize the treasure, the innocent glow of the Rhinegold curdles into an emblem of greed and dominion. The whole Ring cycle unspools from that first bargain of gold weighed against everything else.",
        "source": "Wagner's Das Rheingold (score at IMSLP) opens with Alberich's theft of the Rhinemaidens' gold and his renunciation of love to forge a ring of limitless power, a mythic parable of the curse that attaches to gold seized for dominion, resonant with anxieties over who ultimately commands a nation's mineral riches.",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/kuwait-kpc-16-billion-pipeline-lease--a5.png",
          "alt": "Arthur Rackham illustration of the Nibelung dwarves Mime and Alberich, hoarders of the Rhinegold.",
          "credit": "Arthur Rackham, illustration for The Rhinegold & The Valkyrie (1910); public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "typhoon-noul-southern-china",
    "headline": "Southern China suspends transport and issues alerts as Typhoon Noul approaches",
    "overview": "Southern China put its coast on high alert and suspended public transport as Typhoon Noul closed in, threatening heavy rain and strong winds across Guangdong, Hainan and neighboring regions. Authorities moved to evacuate residents and halt ferries and trains as the storm neared landfall. Forecasters warned of flooding and dangerous surf along the densely populated southern coast.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxQR3ZHa2FCUlZiV093RTJZVVpvVVRYM3BmWkU0TzdaOGVnZ0M5T19DeHZlNm5XZmlFUXNyLXhnMHhPblhReDNZRzk0Y0hvT2h2dXd0N1M1Mmh2OEM4Z2ZmZnhONGVteTFES1pKU0tnRGFQTDBNa25idG1VbWtxUWpqSjc5OVhYS2dLcjYxZkl6VkZ1dw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOWTAyMXNxNGtaUXo0Z3pKNk0wdDJTSWxibmNsNi1TTlNLNDdEUnB4M1BfeXBHQWJTeXZmS3JTWVlTUURmZlFCWnNQeVRZY0dmaHprbnhXS21ZTXA2RFVqVFkwZDlWTnl1QmNGQUNNdlQyaTNsUWlibnlfcDVBaDdOY2dtYS1sX0ZCRHVDa2FlX2l1aXUwZ0tlbkR2dlg5bzdodG9NenpacW9mdmV6WVdnQ2d0S2dHbWdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/typhoon-noul-southern-china.png",
      "alt": "Satellite image of Typhoon Noul, a tightly coiled tropical cyclone with a clear eye, over the western Pacific near the coast of Asia.",
      "credit": "VIIRS imagery from the Suomi NPP satellite, NOAA (Typhoon Noul, 10 May 2015); public domain (U.S. NOAA), via Wikimedia Commons."
    },
    "rank": 33,
    "edition": "Morning Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Acts of the Apostles 27:14–17 (King James Version, 1611)",
        "excerpt": "But not long after there arose against it a tempestuous wind, called Euroclydon. And when the ship was caught, and could not bear up into the wind, we let her drive. And running under a certain island which is called Clauda, we had much work to come by the boat: Which when they had taken up, they used helps, undergirding the ship; and, fearing lest they should fall into the quicksands, strake sail, and so were driven.",
        "source": "The New Testament account of Paul's Mediterranean voyage (King James Version) records mariners overpowered by a named tempest and forced to abandon their course, mirroring today's ferries and trains halted before a wind no schedule can withstand.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Acts",
        "image": {
          "src": "/covers/typhoon-noul-southern-china--a0.png",
          "alt": "Baroque painting of a small ship pitched on towering waves under a dark sky as sailors struggle at the rigging.",
          "credit": "Ludolf Backhuysen, Christ in the Storm on the Sea of Galilee (1695); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Frank Brinkley, A History of the Japanese People (1915) — the 'divine wind' of 1281",
        "excerpt": "We know that, after nearly two months of incessant combat, the Yuan armies had made no sensible impression on the Japanese resistance or established any footing upon Japanese soil. We know that, on August the 14th and 15th, there burst on the shores of Kyushu a tempest which shattered nearly the whole of the Chinese flotilla. And we know that the brunt of the loss fell on the Chinese contingent, some twelve thousand of whom were made slaves.",
        "source": "Brinkley's standard English history recounts the kamikaze, or 'divine wind,' that wrecked Kublai Khan's China-based invasion fleet in 1281 — an armada from southern China undone by the same seasonal typhoons now bearing down on Guangdong and Hainan.",
        "href": "https://www.gutenberg.org/cache/epub/27604/pg27604.html",
        "image": {
          "src": "/covers/typhoon-noul-southern-china--a1.png",
          "alt": "Japanese scroll painting of the samurai Takezaki Suenaga on horseback amid arrows and an exploding bomb during the Mongol invasion.",
          "credit": "Detail from the Mōko Shūrai Ekotoba (Illustrated Account of the Mongol Invasion), c. 1293; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "William Shakespeare, The Tempest, Act I, Scene 1 (c. 1611)",
        "excerpt": "Do you not hear him? You mar our labour: keep your cabins: you do assist the storm.",
        "source": "Shakespeare opens his last great play aboard a foundering ship where rank means nothing against the gale, the Boatswain snapping that panicked nobles only 'assist the storm' — the same helplessness authorities try to forestall by clearing the coast before landfall.",
        "href": "https://www.gutenberg.org/cache/epub/23042/pg23042.txt",
        "image": {
          "src": "/covers/typhoon-noul-southern-china--a2.png",
          "alt": "Painting of a young woman on a rocky shore, her hair and cloak streaming in the wind, watching a ship founder in a stormy sea.",
          "credit": "John William Waterhouse, Miranda – The Tempest (1916); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book I (trans. John Dryden, 1697)",
        "excerpt": "The raging winds rush thro’ the hollow wound,\nAnd dance aloft in air, and skim along the ground;\nThen, settling on the sea, the surges sweep,\nRaise liquid mountains, and disclose the deep.\nSouth, East, and West with mix’d confusion roar,\nAnd roll the foaming billows to the shore.\nThe cables crack; the sailors’ fearful cries\nAscend; and sable night involves the skies;\nAnd heav’n itself is ravish’d from their eyes.",
        "source": "In Dryden's translation of Virgil's epic, Aeolus looses the winds and 'liquid mountains' scatter Aeneas's fleet across the sea — the classical image of a storm that flings ships and men apart, echoed as Noul drives ferries into port and residents from the shore.",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm",
        "image": {
          "src": "/covers/typhoon-noul-southern-china--a3.png",
          "alt": "Dramatic painting of a ship breaking apart on rocks in a violent sea storm as survivors struggle amid the wreckage and spray.",
          "credit": "Claude-Joseph Vernet, Storm with a Shipwreck (1754); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Katsushika Hokusai, Under the Wave off Kanagawa (The Great Wave), c. 1830–32",
        "excerpt": "A colossal wave rears over three slender boats, its claw-like crest of foam poised to crash down while distant Mount Fuji sits tiny and serene beneath it. Hokusai freezes the instant before disaster, dwarfing the rowers and reducing human effort to a fragile smudge against the sea's overwhelming force. The print has become the world's shorthand for the ocean's sublime, indifferent power.",
        "source": "Hokusai's woodblock print from Thirty-Six Views of Mount Fuji is the definitive image of small craft engulfed by a towering wall of water — a direct visual analogue to coastal communities bracing as heavy seas and storm surge close in.",
        "href": "https://commons.wikimedia.org/wiki/File:Great_Wave_off_Kanagawa2.jpg",
        "image": {
          "src": "/covers/typhoon-noul-southern-china--a4.png",
          "alt": "Japanese woodblock print of a giant curling wave with foaming claw-like crest towering over small boats, with Mount Fuji in the distance.",
          "credit": "Katsushika Hokusai, Under the Wave off Kanagawa (The Great Wave), from Thirty-Six Views of Mount Fuji, c. 1830–32; The Metropolitan Museum of Art; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Antonio Vivaldi, Violin Concerto in G minor \"L'estate\" (Summer), RV 315, from The Four Seasons (c. 1725)",
        "excerpt": "The finale of Vivaldi's \"Summer\" concerto unleashes a full-blown thunderstorm: racing scales in the strings pour down like torrential rain while the solo violin flashes and cracks like lightning across a blackened sky. Tremolo basses growl with distant thunder as the tempest gathers force, flattening the fields it sweeps over. It is one of music's most vivid depictions of a violent storm bearing down, mirroring Typhoon Noul as it barrels toward the coast of southern China.",
        "source": "The storm-finale of Vivaldi's \"Summer\", a torrent of rushing strings and thunderclaps, echoes Typhoon Noul closing in on southern China. Score and edition via IMSLP.",
        "href": "https://imslp.org/wiki/Violin_Concerto_in_G_minor,_RV_315_(Vivaldi,_Antonio)",
        "image": {
          "src": "/covers/typhoon-noul-southern-china--a5.png",
          "alt": "Painted portrait of the composer Antonio Vivaldi",
          "credit": "Anonymous portrait of Antonio Vivaldi (c. 1723), International Museum and Library of Music, Bologna; public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "spacex-13th-starship-test-starlinks",
    "headline": "SpaceX launches its 13th Starship test flight and briefly deploys the first upgraded Starlink satellites",
    "overview": "SpaceX flew its Starship rocket on another test flight, this time carrying and briefly deploying the first of its most advanced Starlink internet satellites. The company continued to push toward operational use of the giant vehicle it plans to fly to the Moon and Mars. The launch marked the 13th full-scale test of the Starship system.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQR1lLMF96NmlZSHhwV1hacmVIamw2QzIwR3hYVXhObEItWkliT3JWOXk3MlQtZlZENkR6RXJHQkY1Rks4dlVtdFRkdE1LNFY4NUphZUJGNC1saTdSdE5UNTlHXzdETjBpVlg5bE1UQUdLbUhqWTBtWUs4N2NaM1Y4emFMd2t4d1JGMWxtMXBFOHNucGxpRFJkU19QUQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNVW5SOE5xcGxqZEZRZ0xpTE9Wc2JiTUloM1VHUHdxcllUQXI4RHNnZnRqdnZWYTJZS1pwYl9obHh3aDVJNVZMX3lBS2ZxbnNlMklGbjdUX0lnal95RFBaNHE1MUt0anNSVHhqd1dFNTN5bWM0YS02QzNWbzRrUHkzN0VKRUR1aFJYd3NPX2RGWDRzVUo0dEtlQm14alV4N3ByQl9qVWxuZmoybU5sSlAyNC1TUE9YQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/spacex-13th-starship-test-starlinks.png",
      "alt": "A SpaceX Starship rocket climbing on a bright plume of exhaust, photographed from orbit aboard the International Space Station.",
      "credit": "NASA, launch of a SpaceX Starship seen from the International Space Station, 19 November 2024; public domain (PD-NASA), via Wikimedia Commons."
    },
    "rank": 34,
    "edition": "Morning Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plutarch, On the Face which appears in the Orb of the Moon (Moralia, c. 75 AD), trans. A. O. Prickard (1911)",
        "excerpt": "Now men in the moon, if men there be, are compactly framed, we may believe, and capable of being nourished on what they get…",
        "source": "An ancient Greek dialogue arguing the Moon is an earth-like body, rugged with mountains and hollows and perhaps inhabited — humanity's oldest reasoned reaching toward the Moon as another world, the very destination SpaceX now works to make routine; Prickard's public-domain translation in Selected Essays of Plutarch, Vol. II.",
        "href": "https://www.gutenberg.org/files/62858/62858-h/62858-h.htm",
        "image": {
          "src": "/covers/spacex-13th-starship-test-starlinks--a0.png",
          "alt": "Engraved portrait of the ancient Greek writer Plutarch of Chaeronea.",
          "credit": "Engraved portrait of Plutarch of Chaeronea; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Fulgence Marion, Wonderful Balloon Ascents; or, The Conquest of the Skies (1870)",
        "excerpt": "what must have been the astonishment of those who, for the first time since the commencement of the world, beheld one of their fellow-creatures rolling in space, without any other assurance of safety than what his still dim perception of the laws of nature gave him?",
        "source": "A 19th-century history of the Montgolfier brothers' 1783 balloons, when humans first rose off the Earth into the air; it captures the same public wonder and daring that surrounds a Starship test flight.",
        "href": "https://www.gutenberg.org/files/899/899-h/899-h.htm",
        "image": {
          "src": "/covers/spacex-13th-starship-test-starlinks--a1.png",
          "alt": "Period engraving of a Montgolfier hot-air balloon rising over Paris during the first manned flight in 1783.",
          "credit": "Engraving of the Montgolfier brothers' balloon flight, 1783; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VIII, 'The Story of Dædalus and Icarus' (8 AD), trans. Henry T. Riley",
        "excerpt": "when the boy began to be pleased with a bolder flight, and forsook his guide; and, touched with a desire of reaching heaven, pursued his course still higher. The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air.",
        "source": "The Roman poet's archetypal myth of engineered flight and its perils — wings of wax and feathers, a boy soaring too near the sun and falling — the founding fable of daring ascent against which every new flying machine is measured.",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm",
        "image": {
          "src": "/covers/spacex-13th-starship-test-starlinks--a2.png",
          "alt": "Baroque painting of Daedalus fitting feathered wings to his son Icarus before their flight.",
          "credit": "Andrea Sacchi, Daedalus and Icarus (c. 1645); public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "literary",
        "title": "Jules Verne, From the Earth to the Moon (1865)",
        "excerpt": "It is perhaps reserved for us to become the Columbuses of this unknown world. Only enter into my plans, and second me with all your power, and I will lead you to its conquest, and its name shall be added to those of the thirty-six states which compose this Great Union.",
        "source": "Verne's novel of a gun club that builds a colossal cannon to fire a crewed projectile to the Moon — the 19th century's most famous dream of launching people spaceward, uncannily prefiguring a rocket built to carry humans to the Moon and Mars.",
        "href": "https://www.gutenberg.org/cache/epub/83/pg83-images.html",
        "image": {
          "src": "/covers/spacex-13th-starship-test-starlinks--a3.png",
          "alt": "19th-century engraving of the giant Columbiad cannon firing its projectile toward the Moon at night.",
          "credit": "Henri de Montaut, launch illustration for Jules Verne's From the Earth to the Moon (1872 edition); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna",
        "excerpt": "Bruegel's vast spiralling tower grinds up through the clouds, its ramps, arches and cranes swarming with tiny laborers while a port city shrinks to a plain below. Already half-built and quietly cracking, it is the definitive image of humanity raising a structure to breach the sky — ambition and overreach fused in stone.",
        "source": "The Flemish master's monumental painting of the Babel tower straining toward heaven echoes the towering launch stack and the age-old drive to build ever higher toward the heavens.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/spacex-13th-starship-test-starlinks--a4.png",
          "alt": "Pieter Bruegel the Elder's painting of the Tower of Babel, an enormous spiralling structure rising into the clouds.",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna; public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, The Planets, Op. 32 (1914–1917)",
        "excerpt": "Holst's seven-movement orchestral suite gives each planet a voice — the hammering menace of 'Mars, the Bringer of War,' the soaring exuberance of 'Jupiter,' the mystic wordless drift of 'Neptune.' Written while spaceflight was still pure imagination, it turns the solar system into sound and conjures the very worlds, Mars among them, toward which our machines are now dispatched.",
        "source": "The most celebrated musical portrait of the planets, a cultural reaching toward the worlds that a Moon- and Mars-bound rocket program now literally aims for; score hosted at the Petrucci Music Library (IMSLP).",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)",
        "image": {
          "src": "/covers/spacex-13th-starship-test-starlinks--a5.png",
          "alt": "Black-and-white portrait photograph of the composer Gustav Holst.",
          "credit": "Herbert Lambert, portrait photograph of Gustav Holst, c. 1920; public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "trump-investigate-eu-trade-tech-fines",
    "headline": "Trump orders a US investigation into EU trade practices, claiming the bloc unfairly fined American tech giants",
    "overview": "President Donald Trump directed US trade officials to investigate the European Union's practices, arguing that recent multibillion-dollar antitrust fines against American technology companies amount to unfair treatment. The move escalates a transatlantic standoff over how Europe regulates and penalizes US firms. Brussels has defended its enforcement as applying equally to all companies.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOYTZZUEVUR1lwOGRFRnVMMS1aaUROX096eE9Yd2xXaTNxQWlMUXMteE53U0VhZmctYmMtS3lQb0VYRmxfR0taaGNXNy14UW9fN1pNXy14QjJFdi1GbG00YVV1WjJtNHoxM3pqNWlGZ1AyWml0SUlmVWRZdnZYcE5PenJMd3lncTVQN3d3WFpsQTkxTFc0aXc?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cvgjenp4680o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/trump-investigate-eu-trade-tech-fines.png",
      "alt": "Official 2025 presidential portrait of Donald Trump.",
      "credit": "Official Presidential Portrait of Donald J. Trump (2025), The White House; public domain (U.S. federal government work), via Wikimedia Commons."
    },
    "rank": 35,
    "edition": "Morning Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides, History of the Peloponnesian War, Book 1 (c. 431 BC)",
        "excerpt": "the Megarians, in a long list of grievances, called special attention to the fact of their exclusion from the ports of the Athenian empire and the market of Athens, in defiance of the treaty.",
        "source": "Thucydides' history (Richard Crawley translation, via Wikisource) records how Athens' decree barring Megara from its harbours and markets became a central grievance dragging Greece toward war, an ancient trade embargo wielded as a great-power weapon much like Washington's move against the EU.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1",
        "image": {
          "src": "/covers/trump-investigate-eu-trade-tech-fines--a0.png",
          "alt": "Ancient marble bust of the historian Thucydides.",
          "credit": "Roman marble bust of Thucydides (copy of a Greek original), Royal Ontario Museum, Toronto; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "John Adams, Diary entry for 17 December 1773 (on the Boston Tea Party)",
        "excerpt": "Last Night 3 Cargoes of Bohea Tea were emptied into the Sea. This Morning a Man of War sails. This is the most magnificent Movement of all. There is a Dignity, a Majesty, a Sublimity, in this last Effort of the Patriots, that I greatly admire. The People should never rise, without doing something to be remembered—something notable And striking. This Destruction of the Tea is so bold, so daring, so firm, intrepid and inflexible, and it must have so important Consequences, and so lasting, that I cant but consider it as an Epocha in History. This however is but an Attack upon Property.",
        "source": "John Adams's own diary (Adams Papers, Massachusetts Historical Society) is a primary account of the Boston Tea Party, colonists' defiant revolt against an imperial power's tea duty and trade monopoly, an angry rejection of another government's commercial impositions.",
        "href": "https://www.masshist.org/publications/adams-papers/view?id=DJA02d100",
        "image": {
          "src": "/covers/trump-investigate-eu-trade-tech-fines--a1.png",
          "alt": "1846 hand-colored lithograph of colonists dumping tea into Boston Harbor.",
          "credit": "Nathaniel Currier, The Destruction of Tea at Boston Harbor (1846), hand-colored lithograph, Library of Congress; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Aristophanes, The Acharnians (425 BC)",
        "excerpt": "But now some young drunkards go to Megara and carry off the courtesan Simaetha; the Megarians, hurt to the quick, run off in turn with two harlots of the house of Aspasia; and so for three gay women Greece is set ablaze. Then Pericles, aflame with ire on his Olympian height, let loose the lightning, caused the thunder to roll, upset Greece and passed an edict, which ran like the song, \"That the Megarians be banished both from our land and from our markets and from the sea and from the continent.\"",
        "source": "Aristophanes' comedy (anonymous prose translation, via Project Gutenberg) lampoons the Megarian embargo as a squabble over stolen courtesans that Pericles inflated into a ruinous trade war, comic mockery of leaders escalating petty commercial grievances into open confrontation.",
        "href": "https://www.gutenberg.org/files/3012/3012-h/3012-h.htm",
        "image": {
          "src": "/covers/trump-investigate-eu-trade-tech-fines--a2.png",
          "alt": "Engraved portrait of the playwright Aristophanes.",
          "credit": "Portrait of Aristophanes, engraving from Project Gutenberg eText 12788; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Book of Proverbs 11:1 and 20:23 (King James Version, 1611)",
        "excerpt": "A false balance is abomination to the LORD: but a just weight is his delight. ... Divers weights are an abomination unto the LORD; and a false balance is not good.",
        "source": "The Book of Proverbs (King James Version, via Wikisource) condemns false balances and dishonest weights as an abomination, scripture's ancient demand for fair dealing in trade, the very fairness each side now claims the other has violated.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Proverbs",
        "image": {
          "src": "/covers/trump-investigate-eu-trade-tech-fines--a3.png",
          "alt": "Ornate engraved title page of the 1611 King James Bible.",
          "credit": "Title page of the first edition of the King James Bible (1611), engraved by Cornelis Boel; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba (1648)",
        "excerpt": "A golden Mediterranean dawn floods a marble harbour as the Queen of Sheba prepares to embark; merchant vessels ride at anchor while porters load cargo along the crowded quays. Claude Lorrain transforms an act of royal trade and diplomacy into a serene vision of commerce as the shining lifeblood of nations.",
        "source": "Claude Lorrain's luminous harbour scene (National Gallery, London) idealizes the seaport as the grand theatre of international commerce, the seaborne trade whose rules, tolls and access empires have always fought to control.",
        "href": "https://www.nationalgallery.org.uk/paintings/claude-seaport-with-the-embarkation-of-the-queen-of-sheba",
        "image": {
          "src": "/covers/trump-investigate-eu-trade-tech-fines--a4.png",
          "alt": "Baroque painting of a sunlit harbour crowded with merchant ships and figures.",
          "credit": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba (1648), National Gallery, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749)",
        "excerpt": "Trumpets and drums blaze over a full wind band in music written to accompany the fireworks that celebrated peace among Europe's warring crowns. Its swaggering pomp captures how great powers dress up their rivalries and their reconciliations alike in ceremony and spectacle.",
        "source": "Handel's grand orchestral suite (scores via IMSLP) was composed to crown the fireworks marking the Treaty of Aix-la-Chapelle, which ended a great-power war, pageantry for the fragile diplomacy that follows, and sometimes forestalls, such confrontations.",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/trump-investigate-eu-trade-tech-fines--a5.png",
          "alt": "Oil portrait of composer George Frideric Handel holding a score.",
          "credit": "Thomas Hudson, portrait of George Frideric Handel (1756), National Portrait Gallery, London; public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "trump-smithsonian-inaccurate-history-signs",
    "headline": "Trump orders warning signs posted at the Smithsonian saying some history exhibits are 'inaccurate'",
    "overview": "President Trump ordered signs placed outside Smithsonian history exhibits stating that some of their content is inaccurate and should be corrected, an unusual federal intervention into the institution's displays. The directive intensifies his administration's push to reshape how American history is presented in national museums. Historians and Smithsonian staff warned it could undermine the institution's independence and scholarship.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQTmwxZTVQeU9OS0RkV2VrTGZZandHRTV3SjNPSkJOblpldzc4aFRKTVJ6MW9ldlducmNscGNkWXI1V0xkM0Q0SHdTRXdnMnYyUVU2Ml90NVBFN1FaTTFxNWthN3VzaVlpRWdMNzFqbkRfNW5IT05IdXBDNVhaMThUOUw1SDQ0NWU2QWh3M2tKQWQtTlpuODB2MkcybWNrU3B0?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c1w10gwnj74o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/trump-smithsonian-inaccurate-history-signs.png",
      "alt": "The red sandstone Smithsonian Institution Building, the Castle, on the National Mall in Washington, D.C.",
      "credit": "The Smithsonian Institution Building (the 'Castle'), Washington, D.C.; via Wikimedia Commons."
    },
    "rank": 36,
    "edition": "Morning Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tacitus, Annals, Book 4 (c. AD 116)",
        "excerpt": "The Fathers condemned the books to be by the Aediles burned; but they still continued concealed and dispersed: hence we may justly mock the stupidity of those, who imagine that they can, by present power, extinguish the lights and memory of succeeding times: for, quite otherwise, the punishment of writers exalts the credit of the writings: nor did ever foreign kings, or any else, reap other fruit from it, than infamy to themselves, and glory to the sufferers.",
        "source": "The Roman historian's account (Arthur Murphy translation) of Cremutius Cordus, prosecuted under Tiberius and driven to suicide for praising Brutus and Cassius, his histories ordered burned by the Senate; Tacitus mocks the delusion that state power can extinguish the memory of later ages.",
        "href": "https://www.gutenberg.org/cache/epub/7959/pg7959.txt",
        "image": {
          "src": "/covers/trump-smithsonian-inaccurate-history-signs--a0.png",
          "alt": "Engraved portrait of the Roman historian Tacitus",
          "credit": "Engraved portrait of the historian Tacitus; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Diego de Landa, Relacion de las cosas de Yucatan (c. 1566)",
        "excerpt": "We found a great number of books in these letters, and since they contained nothing but superstitions and falsehoods of the devil we burned them all, which they took most grievously, and which gave them great pain.",
        "source": "The Franciscan bishop's own memoir (William Gates translation, 1937) confessing the 1562 burning of the Maya codices at Mani, a first-person record of a colonial authority erasing an entire people's written history as 'falsehoods.'",
        "href": "https://www.globalgreyebooks.com/online-ebooks/diego-de-landa_yucatan-before-and-after-the-conquest_complete-text.html",
        "image": {
          "src": "/covers/trump-smithsonian-inaccurate-history-signs--a1.png",
          "alt": "A painted page from the Maya Dresden Codex showing glyphs and figures",
          "credit": "Page from the Dresden Codex, a surviving Maya screenfold book of the kind Landa burned; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "John Milton, Areopagitica (1644)",
        "excerpt": "For books are not absolutely dead things, but do contain a potency of life in them to be as active as that soul was whose progeny they are; nay, they do preserve as in a vial the purest efficacy and extraction of that living intellect that bred them. ... And yet, on the other hand, unless wariness be used, as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "Milton's 1644 speech to Parliament against pre-publication licensing, arguing that to destroy a book is to kill reason itself, the founding English argument against state control of what may be read (Project Gutenberg text).",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm",
        "image": {
          "src": "/covers/trump-smithsonian-inaccurate-history-signs--a2.png",
          "alt": "Painted portrait of the poet John Milton",
          "credit": "Portrait of John Milton; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Thucydides, History of the Peloponnesian War, Book 1.22 (c. 431-404 BC)",
        "excerpt": "The absence of romance in my history will, I fear, detract somewhat from its interest; but if it be judged useful by those inquirers who desire an exact knowledge of the past as an aid to the interpretation of the future, which in the course of human things must resemble if it does not reflect it, I shall be content. In fine, I have written my work, not as an essay which is to win the applause of the moment, but as a possession for all time.",
        "source": "The Athenian historian's statement of method (Richard Crawley translation), rejecting the pleasing story for a truthful record meant to endure, a claim to accuracy against those who would bend the narrative for the applause of the moment.",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt",
        "image": {
          "src": "/covers/trump-smithsonian-inaccurate-history-signs--a3.png",
          "alt": "Roman marble bust of the historian Thucydides",
          "credit": "Roman marble bust of Thucydides (Royal Ontario Museum); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Dirck van Delen, Iconoclasm in a Church (Beeldenstorm in een kerk), 1630",
        "excerpt": "In a lofty Gothic interior, a mob wields hooks and hammers against the statues of saints, toppling figures from their niches and shattering carved images across the floor. Van Delen paints the Reformation's Beeldenstorm as an orderly architectural stage for disorder: the erasure of a contested past from sacred and public space, sanctioned as a purge of falsehood. What one age enshrines, another arrives to strike out.",
        "source": "A Dutch painting of the Beeldenstorm, the sixteenth-century iconoclasm in which crowds smashed statues and images they deemed idolatrous, staging the physical deletion of memory from public monuments.",
        "href": "https://commons.wikimedia.org/wiki/File:Dirck_van_Delen_-_Beeldenstorm_in_een_kerk.jpg",
        "image": {
          "src": "/covers/trump-smithsonian-inaccurate-history-signs--a4.png",
          "alt": "Painting of a crowd smashing religious statues and images inside a church",
          "credit": "Dirck van Delen, Iconoclasm in a Church (1630), Rijksmuseum, Amsterdam; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Henry Purcell, Dido's Lament ('When I am laid in earth'), from Dido and Aeneas (1689)",
        "excerpt": "Death is now a Welcom Gueſt,\nWhen I am laid in Earth my wrongs Create.\nNo trouble in thy Breaſt,\nRemember me, but ah! forget my Fate.",
        "source": "The closing lament of Purcell's opera (libretto by Nahum Tate), sung by the dying Dido, whose one plea is to be remembered even as her fate is forgotten; a meditation on memory and what survives of us (Wikisource libretto, original 1689 text).",
        "href": "https://en.wikisource.org/wiki/Dido_and_Aeneas_(1689)",
        "image": {
          "src": "/covers/trump-smithsonian-inaccurate-history-signs--a5.png",
          "alt": "Portrait of the composer Henry Purcell",
          "credit": "Henry Purcell, portrait by or after John Closterman (c. 1695); public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "chris-brown-guilty-london-nightclub-affray",
    "headline": "Singer Chris Brown pleads guilty to affray over a bottle attack at a London nightclub",
    "overview": "US singer Chris Brown pleaded guilty to affray over an attack in which a man was struck with a bottle at a London nightclub. The plea resolves a criminal case that had drawn the Grammy-winning artist into the British courts. He faces sentencing at a later hearing.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPMnEtSjFoQ1J6S1d4eHFhbGRpaGxCR0pqZ0FSa29uOUpBMUtFbHg2cjVmODZFcC1EYmVSeGVsZ3hhYS1CVFJjcjk4U0F0Tld6eGlHb3R6WkJsMlFIb1ByNEJYZ21Sb0VfZUp6OG5mMV9RdEt4ak80azhLZzBGeHhzVlRjb3dCbVNic3BMUEV0c1k5eGhEN01KMVVIUTFOOW5tTzBvZWFPQ0RsWG55RWVLeVZrbFdGdw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNbHpaRlN0cG1VeklwSXR6RDVtYzNFY1JOTTZjczgzZm4yU2o5YnhSVllkTGZmeVNKZFpjQmRqV1ZDZTdfeGg0MHlNbVREMjFwbnNXUFkwekhvckxGWmp0eGp2SUdOVE9Tb0FWSzU2NWtxSWF1cVJEaGlQc1E2ZjZSYS1aSEI3V3RiZEI4QTFjdFpNVXVWbFdhb2dudjNOWFZtRkRzNEFibjR5OXNfalFUTGw3NEdsNTQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/chris-brown-guilty-london-nightclub-affray.png",
      "alt": "Singer Chris Brown performing on stage under bright stage lights.",
      "credit": "Chris Brown performing in Tampa, 2015; CC0 1.0 public domain dedication, via Wikimedia Commons."
    },
    "rank": 37,
    "edition": "Morning Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plutarch, Life of Alexander, ch. 50–51 (c. 75 AD), trans. Bernadotte Perrin",
        "excerpt": "And so, at last, Alexander seized a spear from one of his guards, met Cleitus as he was drawing aside the curtain before the door, and ran him through. No sooner had Cleitus fallen with a roar and a groan than the king’s anger departed from him.",
        "source": "Plutarch’s biography (Perrin’s 1919 Loeb translation) records how the brilliant conqueror, inflamed by wine at a feast, ran his old friend Cleitus through with a spear and was instantly consumed by remorse — genius undone by a fatal loss of temper.",
        "href": "https://lexundria.com/plut_alex/50-52/prr",
        "image": {
          "src": "/covers/chris-brown-guilty-london-nightclub-affray--a0.png",
          "alt": "Illustration of Alexander the Great spearing Cleitus at a banquet as onlookers recoil.",
          "credit": "André Castaigne, The Killing of Cleitus (1898–1899); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Benvenuto Cellini, Autobiography, Book I (written 1558–63), trans. John Addington Symonds",
        "excerpt": "I drew a little dagger with a sharpened edge, and breaking the line of his defenders, laid my hands upon his breast so quickly and coolly, that none of them were able to prevent me. Then I aimed to strike him in the face; but fright made him turn his head round; and I stabbed him just beneath the ear. I only gave two blows, for he fell stone dead at the second. I had not meant to kill him; but as the saying goes, knocks are not dealt by measure.",
        "source": "The Renaissance goldsmith-sculptor’s own memoir (Symonds translation) recounts, almost without apology, how the celebrated artist knifed his enemy Pompeo dead in a Roman street — the archetype of dazzling talent yoked to an ungovernable temper.",
        "href": "https://www.gutenberg.org/cache/epub/4028/pg4028.txt",
        "image": {
          "src": "/covers/chris-brown-guilty-london-nightclub-affray--a1.png",
          "alt": "Cellini’s bronze statue of Perseus holding aloft the severed head of Medusa.",
          "credit": "Benvenuto Cellini, Perseus with the Head of Medusa (1545–1554), Loggia dei Lanzi, Florence; photograph via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Romeo and Juliet, Act III, Scene 1 (c. 1595)",
        "excerpt": "No, ’tis not so deep as a well, nor so wide as a church door, but ’tis enough, ’twill serve. Ask for me tomorrow, and you shall find me a grave man. I am peppered, I warrant, for this world. A plague o’ both your houses.",
        "source": "In Shakespeare’s tragedy a hot-blooded street quarrel between young men flares into a duel; the witty Mercutio is stabbed and dies cursing both households, showing how a single brawl can wreck lives and reputations.",
        "href": "https://www.gutenberg.org/cache/epub/1513/pg1513.txt",
        "image": {
          "src": "/covers/chris-brown-guilty-london-nightclub-affray--a2.png",
          "alt": "Painting of the wounded Mercutio collapsing among companions after the street fight.",
          "credit": "Edwin Austin Abbey, The Death of Mercutio — Act III, Scene I, Romeo and Juliet (1902), Yale University Art Gallery; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book XII (c. 8 AD), trans. Brookes More",
        "excerpt": "By chance, an ancient bowl was near at hand. This rough with figures carved, the son of Aegeus caught and hurled it full in that vile centaur’s face. He, spouting out thick gouts of blood, and bleeding from his wounds—his brains and wine mixed,—kicked the blood-soaked sand.",
        "source": "In Ovid’s epic (Brookes More’s translation) the wedding feast of Pirithous collapses into carnage when the drunken Centaurs seize the women and Theseus hurls a heavy bowl into a reveller’s face — a celebration turned to bloodshed, a drinking vessel made a weapon.",
        "href": "https://www.theoi.com/Text/OvidMetamorphoses12.html",
        "image": {
          "src": "/covers/chris-brown-guilty-london-nightclub-affray--a3.png",
          "alt": "Renaissance painting of the chaotic battle between Lapiths and Centaurs at a wedding feast.",
          "credit": "Piero di Cosimo, The Fight between the Lapiths and the Centaurs (c. 1500–1515), National Gallery, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Adriaen Brouwer, A Peasant Brawl (c. 1630–1640)",
        "excerpt": "A dim tavern erupts into violence: one drinker lunges with a knife while another swings a stool, faces contorted with drink and rage as companions scramble to drag the brawlers apart. Brouwer, himself a hard-living tavern habitué, painted such scenes from the inside, distilling a night of carousing into sudden, ugly bloodshed.",
        "source": "Brouwer’s small Baroque panel in the Alte Pinakothek is a defining image of drink-fuelled violence among carousers — the seventeenth-century vision of a night out that turns to knives and flying furniture.",
        "href": "https://commons.wikimedia.org/wiki/File:Adriaen_Brouwer_-_The_brawl.jpg",
        "image": {
          "src": "/covers/chris-brown-guilty-london-nightclub-affray--a4.png",
          "alt": "Baroque painting of peasants fighting with knives and a stool in a tavern.",
          "credit": "Adriaen Brouwer, A Peasant Brawl (c. 1630–1640), Alte Pinakothek, Munich; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi & Francesco Maria Piave, ‘Libiamo ne’ lieti calici’ (Brindisi), La traviata (1853)",
        "excerpt": "Libiam ne’ lieti calici\nChe la bellezza infiora,\nE la fuggevol ora\nS’innebrii a voluttà.\nLibiam ne’ dolci fremiti\nChe suscita l’amore,\nPoichè quell’occhio al core\nOnnipotente va.",
        "source": "The Brindisi from Verdi’s opera, on Piave’s libretto, is a glittering late-night drinking song at a lavish party — the seductive glamour of pleasure-seeking revelry that so often shadows scandal and ruin.",
        "href": "https://it.wikisource.org/wiki/La_traviata/Atto_primo",
        "image": {
          "src": "/covers/chris-brown-guilty-london-nightclub-affray--a5.png",
          "alt": "Portrait of composer Giuseppe Verdi in a top hat and white scarf.",
          "credit": "Giovanni Boldini, Portrait of Giuseppe Verdi (1886), Galleria Nazionale d’Arte Moderna, Rome; public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "light-phone-flip-clamshell-launch",
    "headline": "Light launches the 'Light Flip', a $299 minimalist 5G clamshell phone built to limit distraction",
    "overview": "The company behind the Light Phone unveiled the Light Flip, its first clamshell handset and fourth device, pairing a physical keypad with a 2.8-inch OLED screen and a deliberately stripped-down operating system. Priced at $299, the 5G phone omits an app store, social media and a web browser in a bid to curb screen time. Shipping is expected to begin in 2027.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/24/light-phone-clamshell-flip-model/"
      },
      {
        "name": "The Next Web",
        "href": "https://thenextweb.com/news/light-flip-anti-ai-minimalist-flip-phone"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/light-phone-flip-clamshell-launch.png",
      "alt": "An open modern clamshell flip phone standing upright, showing a small external screen and a hinged body.",
      "credit": "Nafis Fuad Ayon, Cat S22 Flip (open); CC BY-SA 4.0, via Wikimedia Commons."
    },
    "rank": 38,
    "edition": "Morning Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Diogenes Laertius, Lives and Opinions of Eminent Philosophers, Book VI, 'Diogenes' (early 3rd century AD; trans. C. D. Yonge, 1853)",
        "excerpt": "On one occasion he saw a child drinking out of its hands, and so he threw away the cup which belonged to his wallet, saying, “That child has beaten me in simplicity.” He also threw away his spoon, after seeing a boy, when he had broken his vessel, take up his lentils with a crust of bread.",
        "source": "The founding anecdote of Cynic asceticism, in which Diogenes discards even his last cup as superfluous — an ancient precursor to stripping a device down to the barest essentials.",
        "href": "https://www.gutenberg.org/files/57342/57342-h/57342-h.htm",
        "image": {
          "src": "/covers/light-phone-flip-clamshell-launch--a0.png",
          "alt": "Painting of Diogenes seated in his earthenware tub with dogs, lighting a lamp in daylight.",
          "credit": "Jean-Léon Gérôme, Diogenes (1860), The Walters Art Museum, Baltimore; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Athanasius of Alexandria, Life of Antony, §2 (c. 360 AD; trans. Nicene and Post-Nicene Fathers, 1892)",
        "excerpt": "Antony, as though God had put him in mind of the Saints, and the passage had been read on his account, went out immediately from the church, and gave the possessions of his forefathers to the villagers—they were three hundred acres, productive and very fair—that they should be no more a clog upon himself and his sister. And all the rest that was movable he sold, and having got together much money he gave it to the poor.",
        "source": "Athanasius's foundational monastic biography, whose hero renounces his inheritance and withdraws into the desert — the ur-model of deliberately shedding possessions and noise to escape distraction.",
        "href": "https://www.newadvent.org/fathers/2811.htm",
        "image": {
          "src": "/covers/light-phone-flip-clamshell-launch--a1.png",
          "alt": "Fifteenth-century panel painting of Saint Anthony the Abbot walking through a rocky wilderness.",
          "credit": "Master of the Osservanza, Saint Anthony the Abbot in the Wilderness (c. 1435), tempera and gold on panel, The Metropolitan Museum of Art, New York; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Henry David Thoreau, Walden; or, Life in the Woods, ch. 2 'Where I Lived, and What I Lived For' (1854)",
        "excerpt": "Our life is frittered away by detail. An honest man has hardly need to count more than his ten fingers, or in extreme cases he may add his ten toes, and lump the rest. Simplicity, simplicity, simplicity! I say, let your affairs be as two or three, and not a hundred or a thousand; instead of a million count half a dozen.",
        "source": "The classic American manifesto of voluntary simplicity, whose thrice-repeated “Simplicity!” reads almost as a design brief for a deliberately distraction-free phone.",
        "href": "https://www.gutenberg.org/files/205/205-h/205-h.htm",
        "image": {
          "src": "/covers/light-phone-flip-clamshell-launch--a2.png",
          "alt": "Restored 1856 daguerreotype portrait of Henry David Thoreau with a beard.",
          "credit": "Benjamin D. Maxham, daguerreotype of Henry David Thoreau (1856), restored; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ecclesiastes 1:2, 14 (King James Version, 1611)",
        "excerpt": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. … I have seen all the works that are done under the sun; and, behold, all is vanity and vexation of spirit.",
        "source": "The Hebrew wisdom book on the emptiness of endless striving, its verdict on ceaseless labor echoing the modern case that constant connectivity is “vanity and vexation of spirit.”",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes",
        "image": {
          "src": "/covers/light-phone-flip-clamshell-launch--a3.png",
          "alt": "Dutch vanitas still life with a skull, an overturned glass, a watch, and a guttering candle on a table.",
          "credit": "Pieter Claesz, Vanitas Still Life (1630), Mauritshuis, The Hague; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Antonello da Messina, Saint Jerome in His Study (c. 1475)",
        "excerpt": "In a luminous, meticulously ordered interior, the aged scholar sits alone at his raised wooden study, absorbed in a single book while the world recedes beyond the arches. Antonello surrounds him with a few quiet objects and a resting lion, turning the panel into a monument to undistracted concentration: one mind, one task, nothing superfluous.",
        "source": "Antonello's serene portrait of the scholar-saint in a spare, self-contained study — an emblem of the withdrawn, single-focused attention a stripped-down phone hopes to restore.",
        "href": "https://commons.wikimedia.org/wiki/File:Antonello_da_Messina_-_St_Jerome_in_his_study_-_National_Gallery_London.jpg",
        "image": {
          "src": "/covers/light-phone-flip-clamshell-launch--a4.png",
          "alt": "Renaissance painting of Saint Jerome reading at a wooden study set within a large arched interior, with a lion nearby.",
          "credit": "Antonello da Messina, Saint Jerome in His Study (c. 1475), The National Gallery, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Erik Satie, Gymnopédie No. 1 (1888)",
        "excerpt": "Three slow, bare chords rock beneath an unhurried, wandering melody; nothing is rushed and nothing ornamental, and the silence between notes carries as much weight as the notes. Satie pares the piano down to its plainest materials — an 1888 experiment in doing radically less that still sounds like calm made audible.",
        "source": "Satie's spare, hypnotic piano miniature reduces music to its essentials, an aesthetic of deliberate minimalism that mirrors the phone's stripped-down operating system.",
        "href": "https://imslp.org/wiki/3_Gymnop%C3%A9dies_(Satie%2C_Erik)",
        "image": {
          "src": "/covers/light-phone-flip-clamshell-launch--a5.png",
          "alt": "Painted portrait of the composer Erik Satie wearing a pince-nez, by Suzanne Valadon.",
          "credit": "Suzanne Valadon, Portrait of Erik Satie (1893), Centre Pompidou, Paris; public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "france-spain-wildfires-200000-flee",
    "headline": "More than 200,000 people flee wildfires across France and Spain as suburbs around Bordeaux are evacuated",
    "overview": "Wildfires raging across France and Spain forced more than 200,000 people to flee, with some evacuated by boat as flames swept toward the coast. Suburbs around Bordeaux were evacuated as fires advanced amid extreme heat and wind. The blazes marked a sharp escalation of a summer fire crisis gripping southwestern Europe.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxNZUw0V2R4RnNrNmFrdFhRUjB5QVQ4WThwQ2NkYTI3RUdyV0xZdWc3dS1EUmJyaFI4dzc2a0EtU2VOSmQwRkJsLWdlT0VuVG1HcWwtcDIxSkFCdk55T2tOM2ppVVd4Ql9RNXVHZzk5dHZCWlRXdU9VOW1ERmVTQ2s4SkRXRXdNZjlHaEZpd3FR?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNdktMME5KN1ExdnZKbndxQU94dENHWnFXQTgyaEczcHlfVFB3V1ZqUTNib1daZmFtdjNLS1owSU5pZExWOFc5azVBQ2x6MHE2Q1ozYmk4YkcwVmlnd2drS1NzdDBOeDk1TXlpQkJTd3ZybW9QS0ZFVDBjYnRRTlpoZG50VFNreVQtcmJURlE2T0R6MkxBZzlIQ3ZYOTlnM3NOaG1uR2tkdUc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-25",
    "image": {
      "src": "/covers/france-spain-wildfires-200000-flee.png",
      "alt": "A towering wall of smoke and flame rising from burning pine forest near La Teste-de-Buch in the Gironde, southwestern France, July 2022.",
      "credit": "Photo of the July 2022 wildfire at La Teste-de-Buch (Gironde), France; CC BY-SA, via Wikimedia Commons."
    },
    "rank": 39,
    "edition": "Morning Edition · 25 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tacitus, The Annals, Book 15 (c. AD 116), on the Great Fire of Rome of AD 64",
        "excerpt": "Often, while they looked behind them, they were intercepted by flames on their side or in their face. Or if they reached a refuge close at hand, when this too was seized by the fire, they found that, even places, which they had imagined to be remote, were involved in the same calamity.",
        "source": "The Roman historian's account of the fire that swept Rome under Nero, describing crowds trapped and overtaken as they fled; translated by Alfred John Church and William Jackson Brodribb. It echoes today's panicked flight as flames outran evacuees across southwestern Europe.",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15",
        "image": {
          "src": "/covers/france-spain-wildfires-200000-flee--a0.png",
          "alt": "A night scene of classical Rome ablaze, columns and monuments silhouetted against roaring orange flames while figures flee in the foreground.",
          "credit": "Hubert Robert, The Fire of Rome (c. 1771), Musee d'art moderne Andre Malraux, Le Havre; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Samuel Pepys, Diary, entry for 2 September 1666, on the Great Fire of London",
        "excerpt": "So I down to the water-side, and there got a boat and through bridge, and there saw a lamentable fire.  Poor Michell's house, as far as the Old Swan, already burned that way, and the fire running further, that in a very little time it got as far as the Steeleyard, while I was there.  Everybody endeavouring to remove their goods, and flinging into the river or bringing them into lighters that layoff; poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another.",
        "source": "Pepys's eyewitness diary of the Great Fire of London, watching Londoners load their goods into boats and flee to the water as the flames advanced. It mirrors the seaside evacuations by boat as this summer's fires drove toward the coast.",
        "href": "https://en.wikisource.org/wiki/Diary_of_Samuel_Pepys/1666/September",
        "image": {
          "src": "/covers/france-spain-wildfires-200000-flee--a1.png",
          "alt": "A painting of London engulfed in fire seen across the Thames at night, with Old London Bridge and the Tower silhouetted against a sky of flame and smoke.",
          "credit": "Unknown painter, The Great Fire of London (c. 1675), Museum of London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book 2 (19 BC), the flight of Aeneas from burning Troy, tr. John Dryden",
        "excerpt": "'Haste, my dear father, ('tis no time to wait,)\nAnd load my shoulders with a willing freight.\nWhate'er befalls, your life shall be my care;\nOne death, or one deliv'rance, we will share.'",
        "source": "Virgil's epic scene of Aeneas carrying his aged father Anchises on his back out of a Troy consumed by fire, in Dryden's classic verse translation. It is the archetypal image of refugees carrying what they love most from an inferno.",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm",
        "image": {
          "src": "/covers/france-spain-wildfires-200000-flee--a2.png",
          "alt": "A Baroque painting of Aeneas carrying his elderly father on his back while leading his young son from the burning ruins of Troy.",
          "credit": "Federico Barocci, Aeneas' Flight from Troy (1598), Galleria Borghese, Rome; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Book of Joel, chapter 2 (King James Version, 1611)",
        "excerpt": "A fire devoureth before them; and behind them a flame burneth: the land is as the garden of Eden before them, and behind them a desolate wilderness; yea, and nothing shall escape them.",
        "source": "The prophet Joel's vision of an advancing devastation that turns a paradise into a desolate wilderness, in the King James translation. Its image of fire devouring the land captures the scale of the blazes charring southwestern Europe.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Joel",
        "image": {
          "src": "/covers/france-spain-wildfires-200000-flee--a3.png",
          "alt": "An apocalyptic painting of a world collapsing in fire, with cliffs and cities tumbling into a fiery red abyss as tiny human figures fall.",
          "credit": "John Martin, The Great Day of His Wrath (1851-53), Tate, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Burning of the Houses of Lords and Commons (1834-35)",
        "excerpt": "Turner witnessed the Palace of Westminster consumed by fire on the night of 16 October 1834 and turned the catastrophe into a blaze of molten yellows and reds. The flames tower over the Thames while crowds mass on the far bank and bridge, dark against the glare, dwarfed by an inferno that swallows the seat of a nation. His canvas makes fire itself the overwhelming subject, beautiful and annihilating at once.",
        "source": "Turner's great painting of the 1834 destruction of Britain's Houses of Parliament, one of the most famous depictions of a city landmark devoured by fire. It renders the awe and helplessness of watching flames overtake a familiar skyline.",
        "href": "https://en.wikipedia.org/wiki/The_Burning_of_the_Houses_of_Lords_and_Commons",
        "image": {
          "src": "/covers/france-spain-wildfires-200000-flee--a4.png",
          "alt": "A luminous painting of the Houses of Parliament in flames at night, fire and smoke reflected across the Thames as crowds watch from the far shore.",
          "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, October 16, 1834 (1835), Philadelphia Museum of Art; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Hector Berlioz, 'La Course a l'abime' (Ride to the Abyss) from La Damnation de Faust (1846)",
        "excerpt": "In this galloping orchestral episode Berlioz hurls Faust and Mephistopheles on a headlong ride into hell, strings and brass driving forward as the music builds to the Pandaemonium of a burning underworld. Shrieking woodwinds and hammering rhythms conjure a landscape aflame, a descent into fire that has no return. It is the sound of the inferno as devouring judgment.",
        "source": "The climactic 'ride to the abyss' from Berlioz's dramatic legend, a public-domain orchestral vision of a headlong plunge into a fiery hell. Its terror and momentum evoke the roar and rush of an advancing wildfire.",
        "href": "https://imslp.org/wiki/La_damnation_de_Faust,_H_111_(Berlioz,_Hector)",
        "image": {
          "src": "/covers/france-spain-wildfires-200000-flee--a5.png",
          "alt": "A 19th-century photographic portrait of the composer Hector Berlioz.",
          "credit": "Pierre Petit, portrait photograph of Hector Berlioz (1863), Bibliotheque nationale de France (Gallica); public domain, via Wikimedia Commons."
        }
      }
    ]
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
