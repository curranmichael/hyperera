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
// the Afternoon Edition of 13 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Morning Edition of 13 July 2026 and the Evening Edition of 12 July 2026.
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
    "slug": "trump-50-percent-tariffs-canada",
    "headline": "Trump imposes 50% tariffs on Canadian goods over autos, alcohol and dairy disputes",
    "overview": "President Donald Trump on Monday imposed 50% tariffs on most Canadian goods, invoking Section 338 of the Tariff Act of 1930 and accusing Canada of discriminating against American automobiles, alcohol and dairy products. The duties, which follow Canadian boycotts of US alcohol and dairy, are set to take effect in 30 days. Prime Minister Mark Carney said his government believes in 'free and fair trade' and vowed to intensify negotiations with Washington.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNTVJzOTFERXBSclRBTElQM0l6VzlJV092REdRYkdyeFJRZVgwVzBhSEQ3NFItdWh6SGxCZnp1TFFqQzFyZnFzd21jSlpReEZDZ2lOVm51cV9GalNodHFyb0FsUC1kVy0tMFZUQ19hU2x6RDhYTHBWVDZlOXRUOWhXV2NQek1ONzVYblNGM3lIUDdVUnBnaEEzNmxMalV5NVdGX2c4UkJ3?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cg4dzq3x3e1o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/trump-50-percent-tariffs-canada.png",
      "alt": "U.S. Customs and Border Protection officers on duty at the Detroit-Windsor port of entry on the U.S.-Canada border",
      "credit": "U.S. Customs and Border Protection / Wikimedia Commons"
    },
    "lead": true,
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Megarian Decree, c. 432 BC (Thucydides)",
        "excerpt": "There were many who came forward and made their several accusations; among them the Megarians, in a long list of grievances, called special attention to the fact of their exclusion from the ports of the Athenian empire and the market of Athens, in defiance of the treaty.",
        "source": "Thucydides, History of the Peloponnesian War (Crawley translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm",
        "image": {
          "src": "/covers/trump-50-percent-tariffs-canada--a0.png",
          "alt": "Marble bust of the Greek historian Thucydides",
          "credit": "Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Napoleon's Berlin Decree and the Continental System, 1806",
        "excerpt": "That this monstrous abuse of the right of blockade has no other aim than to prevent communication among the nations and to raise the commerce and the industry of England upon the ruins of that of the continent... That it is a natural right to oppose such arms against an enemy as he makes use of, and to fight in the same way that he fights... We have consequently decreed and do decree that which follows: 1. The British Isles are declared to be in a state of blockade. 2. All commerce and all correspondence with the British Isles are forbidden... 5. Trade in English goods is prohibited, and all goods belonging to England or coming from her factories or her colonies are declared a lawful prize.",
        "source": "Berlin Decree (1806), Wikisource",
        "href": "https://en.wikisource.org/wiki/Berlin_Decree",
        "image": {
          "src": "/covers/trump-50-percent-tariffs-canada--a1.png",
          "alt": "Jacques-Louis David's 1812 portrait of the Emperor Napoleon in his study at the Tuileries",
          "credit": "Jacques-Louis David / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Aristophanes, The Acharnians (425 BC)",
        "excerpt": "But now some young drunkards go to Megara and carry off the courtesan Simaetha; the Megarians, hurt to the quick, run off in turn with two harlots of the house of Aspasia; and so for three gay women Greece is set ablaze. Then Pericles, aflame with ire on his Olympian height, let loose the lightning, caused the thunder to roll, upset Greece and passed an edict, which ran like the song, \"That the Megarians be banished both from our land and from our markets and from the sea and from the continent.\"",
        "source": "Aristophanes, The Acharnians, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3012/3012-h/3012-h.htm",
        "image": {
          "src": "/covers/trump-50-percent-tariffs-canada--a2.png",
          "alt": "Marble bust of the comic playwright Aristophanes",
          "credit": "Wikimedia Commons (CC BY-SA 4.0)"
        }
      },
      {
        "category": "literary",
        "title": "Frederic Bastiat, \"The Candlemakers' Petition\" (1845)",
        "excerpt": "We are suffering from the intolerable competition of a foreign rival, placed, it would seem, in a condition so far superior to ours for the production of light, that he absolutely inundates our national market with it at a price fabulously reduced... This rival, who is no other than the Sun, wages war to the knife against us... What we pray for is, that it may please you to pass a law ordering the shutting up of all windows, sky-lights, dormer-windows, outside and inside shutters, curtains, blinds, bull's-eyes; in a word, of all openings, holes, chinks, clefts, and fissures, by or through which the light of the sun has been in use to enter houses.",
        "source": "Frederic Bastiat, Economic Sophisms (Stirling translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/44145/44145-h/44145-h.htm",
        "image": {
          "src": "/covers/trump-50-percent-tariffs-canada--a3.png",
          "alt": "1848 engraved portrait of the French economist Frederic Bastiat",
          "credit": "Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Marinus van Reymerswaele, The Tax Collectors (c. 1540s)",
        "excerpt": "Marinus van Reymerswaele's biting sixteenth-century panel shows two customs-and-duty officials hunched over their ledgers, one greedily tallying the levies owed while the other records the take. Their exaggerated, grasping faces turn the machinery of tariffs and excise into a grotesque satire on the collection of trade duties. It is an early Netherlandish mirror of the endless quarrels over who owes what on the goods that cross a border.",
        "source": "Marinus van Reymerswaele, The Tax Collectors - Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Marinus_van_Reymerswale_-_The_Tax_Collectors_-_WGA19332.jpg",
        "image": {
          "src": "/covers/trump-50-percent-tariffs-canada--a4.png",
          "alt": "Renaissance painting of two tax collectors surrounded by ledgers and coins",
          "credit": "Marinus van Reymerswaele / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "C. J. Taylor, \"The Open Sesame\" - a Puck cartoon on the McKinley high tariff",
        "excerpt": "In this Gilded-Age Puck cartoon by C. J. Taylor, the protective tariff is pictured as a robber baron's cave: the high McKinley duties throw open the door so favored monopolists can plunder the American consumer, all under the banner of protecting home industry. It skewers economic nationalism as a racket dressed in patriotic language - the same argument that recurs whenever a government raises walls of duties against foreign goods.",
        "source": "C. J. Taylor, Puck (Library of Congress) - Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_open_sesame_-_C.J._Taylor_cartoon_-_McKinley_High_Tariff_Robber_Baron_Cave.jpg",
        "image": {
          "src": "/covers/trump-50-percent-tariffs-canada--a5.png",
          "alt": "Political cartoon depicting the high tariff as a robber baron's cave plundering consumers",
          "credit": "C. J. Taylor, Puck / Library of Congress via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "china-ai-model-chip-export-controls",
    "headline": "China weighs export controls on advanced AI models and chips, Financial Times reports",
    "overview": "China is considering tighter export controls on its most advanced artificial-intelligence models and semiconductors, the Financial Times reported Tuesday, citing people familiar with the deliberations. Regulators led by the Ministry of Commerce have consulted leading domestic AI and chipmaking firms on how to prevent cutting-edge technology and start-ups from being acquired by the West. The move mirrors US restrictions and signals that Beijing now treats frontier AI as a strategic national asset.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxQMnQtRVFFNl9xQzJhYWtqMjlrVEx5NW9FYmp4UzM3QlNHdjYwaDhfT3BTdkdaX0QwUHF2X0Z3a3pEMnl0b0RqN0VVMFZ2NndBT1YtWDhjbE85dGZKT2lpWmtFYTJaY1E5UHljUmVvcXhvV0FTTUFyck5GZHBYRU1Nc1hTNDg4aUxoeFFNZmhKOVVKcDNLQVo3SFBYcnZ0VFFhVlBhNndHOWtuMVZpaDhmVE9JY051NmVzQUx4QUln?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://finance.yahoo.com/technology/ai/articles/china-considers-tighter-export-controls-041139427.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/china-ai-model-chip-export-controls.png",
      "alt": "Rows of servers inside a data center",
      "credit": "Photo by Carl Lender, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The guarded secret of Greek fire",
        "excerpt": "The readily combustible rosin is collected from the pine and other similar evergreen trees and mixed with sulphur. Then it is introduced into reed-pipes and blown by the man using it with a strong continuous breath and at the other end fire is applied to it and it bursts into flame and falls like a streak of lightning on the faces of the men opposite.",
        "source": "Anna Komnene, The Alexiad, Book XIII (trans. Elizabeth A. S. Dawes, 1928)",
        "href": "https://en.wikisource.org/wiki/The_Alexiad/Book_XIII",
        "image": {
          "src": "/covers/china-ai-model-chip-export-controls--a0.png",
          "alt": "Byzantine sailors direct Greek fire from a siphon against an enemy ship in a medieval manuscript miniature",
          "credit": "Madrid Skylitzes, 12th century, Biblioteca Nacional de Espana. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Britain's ban on exporting its machinery",
        "excerpt": "...even supposing the certainty, that their own machinery in time will equal ours, is to surrender in the mean time the temporary advantage which we possess, and to yield to the foreigner that start which our own producers have for the moment got of him in the market.",
        "source": "House of Commons debate, \"Exportation of Machinery\" (Hansard, 16 February 1841), James Emerson Tennent MP",
        "href": "https://api.parliament.uk/historic-hansard/commons/1841/feb/16/exportation-of-machinery",
        "image": {
          "src": "/covers/china-ai-model-chip-export-controls--a1.png",
          "alt": "Rows of power looms operated by workers in a 19th-century cotton mill, from an 1835 engraving",
          "credit": "Engraving by J. Tingle after T. Allom, 1835 (Baines, History of the Cotton Manufacture). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Prometheus steals the fire of the gods",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, Prometheus Bound (trans. Theodore Alois Buckley)",
        "href": "https://www.gutenberg.org/ebooks/27458",
        "image": {
          "src": "/covers/china-ai-model-chip-export-controls--a2.png",
          "alt": "Prometheus kneeling to bring the stolen fire of the gods to mankind, in Heinrich Fueger's 1817 painting",
          "credit": "Heinrich Fueger, 1817. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Frankenstein and the danger of forbidden knowledge",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818)",
        "href": "https://www.gutenberg.org/ebooks/84",
        "image": {
          "src": "/covers/china-ai-model-chip-export-controls--a3.png",
          "alt": "Victor Frankenstein recoiling from his newly animated creature, frontispiece of the 1831 edition",
          "credit": "Theodor von Holst, engraved by William Chevalier, 1831 frontispiece. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wright of Derby's alchemist and his hidden craft",
        "excerpt": "Wright paints the alchemist alone in a vaulted, cathedral-like chamber, kneeling before a retort that erupts with an unearthly glow as he stumbles upon phosphorus. The secret is wrested from nature by a lone adept who works in darkness, guarding a transformative knowledge he dares not share. The pursuit of hidden technical power is made to look like a sacred and jealously kept mystery.",
        "source": "Joseph Wright of Derby, The Alchymist, in Search of the Philosopher's Stone (exhibited 1771), Derby Museum and Art Gallery",
        "href": "https://www.revolutionaryplayers.org.uk/the-alchymist-in-search-of-the-philosophers-stone-exhibited-1771/",
        "image": {
          "src": "/covers/china-ai-model-chip-export-controls--a4.png",
          "alt": "An alchemist kneeling before a glowing flask in a darkened vaulted chamber, by Joseph Wright of Derby",
          "credit": "Joseph Wright of Derby, 1771, Derby Museum and Art Gallery. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Rhinegold, a coveted source of power",
        "excerpt": "In the opening scene of Wagner's Das Rheingold, three river-maidens guard a hoard of gold that grants its master limitless power, so long as its secret is kept. The spurned dwarf Alberich seizes the treasure and forges it into a ring, and the whole cycle turns on who controls that coveted source of strength. Wagner's shimmering, restless music dramatizes a strategic asset that everyone schemes to possess and no one can safely surrender.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (full score, 1873), IMSLP",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/china-ai-model-chip-export-controls--a5.png",
          "alt": "The Rhinemaidens swimming around the rock where the Rhinegold lay, illustrated by Arthur Rackham",
          "credit": "Arthur Rackham, 1910. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "houthis-red-sea-saudi-maritime-embargo",
    "headline": "Yemen's Houthis declare maritime embargo, threaten to block Saudi shipping at Red Sea gateway",
    "overview": "Yemen's Iranian-backed Houthi movement announced a 'maritime embargo' on Saudi Arabia, saying it would block Saudi-linked ships from passing through the Bab el-Mandeb strait at the southern gateway to the Red Sea. The declaration threatens to widen disruption to one of the world's busiest shipping corridors, already strained by attacks on commercial vessels. Saudi authorities did not immediately respond to the threat.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOeUxVTTdGN3I2VHpkcGVLZFAzeXZlSjh3TmVGaXpPVjlsdG5iMEtmR1hscHVmbnlNQjBVYUVoTFI1c2Q2VS15SDVfSTVPb3FjM1FFMVREY0NKdk1hQ2Y2SGhkN3hvN2p2NHk1MTd0RU1HbDJvM3ZDTGhvQmpBNzBLQ1hpNk1mNjhpQmNxUmMtMnJ1Vk45N25lN3NBUQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cm2gmddx1ldo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/houthis-red-sea-saudi-maritime-embargo.png",
      "alt": "A cargo ship passing through the Red Sea shipping lane",
      "credit": "U.S. Navy photo by Mass Communication Specialist 2nd Class Jason R. Zalasky, via Wikimedia Commons (public domain)"
    },
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Megarian Decree: Athens shuts its harbours (5th century BC)",
        "excerpt": "Among them the Megarians, in a long list of grievances, called special attention to the fact of their exclusion from the ports of the Athenian empire and the market of Athens, in defiance of the treaty.",
        "source": "Thucydides, History of the Peloponnesian War, Book I.67 (Crawley translation)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1",
        "image": {
          "src": "/covers/houthis-red-sea-saudi-maritime-embargo--a0.png",
          "alt": "Ancient bust of the historian Thucydides",
          "credit": "Photo by user:shakko, Pushkin Museum, via Wikimedia Commons (CC BY-SA 3.0)"
        }
      },
      {
        "category": "historical",
        "title": "Lincoln proclaims the Union blockade of the Confederacy (1861)",
        "excerpt": "I have further deemed it advisable to set on foot a blockade of the ports within the States aforesaid... For this purpose a competent force will be posted so as to prevent entrance and exit of vessels from the ports aforesaid.",
        "source": "Abraham Lincoln, Proclamation 81 — Declaring a Blockade of Ports in Rebellious States, April 19, 1861",
        "href": "https://www.presidency.ucsb.edu/documents/proclamation-81-declaring-blockade-ports-rebellious-states",
        "image": {
          "src": "/covers/houthis-red-sea-saudi-maritime-embargo--a1.png",
          "alt": "1861 'Scott's Great Snake' cartoon map illustrating the Anaconda Plan to blockade the Confederacy",
          "credit": "J. B. Elliott, 1861, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Scylla and Charybdis: the deadly narrow strait",
        "excerpt": "You will find the other rock lie lower, but they are so close together that there is not more than a bow-shot between them... and under it lies the sucking whirl-pool of Charybdis. Three times in the day does she vomit forth her waters, and three times she sucks them down again.",
        "source": "Homer, The Odyssey, Book XII (Samuel Butler translation)",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_XII",
        "image": {
          "src": "/covers/houthis-red-sea-saudi-maritime-embargo--a2.png",
          "alt": "Henry Fuseli painting of Odysseus facing Scylla and Charybdis",
          "credit": "Henry Fuseli, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "The corsair claims the sea as his empire",
        "excerpt": "O'er the glad waters of the dark blue sea,\nOur thoughts as boundless, and our souls as free,\nFar as the breeze can bear, the billows foam,\nSurvey our empire and behold our home!\nThese are our realms, no limits to their sway—\nOur flag the sceptre all who meet obey.",
        "source": "Lord Byron, The Corsair, Canto I (1814)",
        "href": "https://en.wikisource.org/wiki/The_Corsair_(Byron,_1814)/CANTO_I",
        "image": {
          "src": "/covers/houthis-red-sea-saudi-maritime-embargo--a3.png",
          "alt": "Portrait of Lord Byron by Richard Westall",
          "credit": "Richard Westall, National Portrait Gallery, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The Battle of Trafalgar, 21 October 1805",
        "excerpt": "Turner's vast canvas, commissioned by George IV, depicts Nelson's fleet at Trafalgar, fought off the approach to the Strait of Gibraltar, the chokepoint gateway between the Atlantic and the Mediterranean. The painting became an icon of British naval supremacy and command of contested sea lanes. It is the artist's only work executed by royal command.",
        "source": "J. M. W. Turner, oil on canvas, 1822–24, National Maritime Museum, Greenwich",
        "href": "https://www.rmg.co.uk/collections/objects/rmgc-object-12057",
        "image": {
          "src": "/covers/houthis-red-sea-saudi-maritime-embargo--a4.png",
          "alt": "J. M. W. Turner's painting The Battle of Trafalgar, 21 October 1805",
          "credit": "J. M. W. Turner, National Maritime Museum, Greenwich, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Rule, Britannia! — a hymn to ruling the waves",
        "excerpt": "When Britain first, at Heaven's command,\nArose from out the azure main;\nThis was the charter of the land,\nAnd guardian angels sung this strain:\n\"Rule, Britannia! rule the waves:\n\"Britons never will be slaves.\"",
        "source": "Thomas Arne (music) and James Thomson (words), from the masque Alfred, 1740",
        "href": "https://imslp.org/wiki/Rule_Britannia_(Arne,_Thomas_Augustine)",
        "image": {
          "src": "/covers/houthis-red-sea-saudi-maritime-embargo--a5.png",
          "alt": "Portrait of composer Thomas Augustine Arne",
          "credit": "Robert Dunkarton, after William Humphrey, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "el-mayo-zambada-life-sentence",
    "headline": "Sinaloa cartel co-founder 'El Mayo' Zambada sentenced to life in US prison, ordered to forfeit $15 billion",
    "overview": "Ismael 'El Mayo' Zambada, the 76-year-old co-founder of Mexico's Sinaloa cartel, was sentenced Monday to life in prison without parole by US District Judge Brian Cogan in Brooklyn, New York. As part of a plea deal in which prosecutors agreed not to seek the death penalty, Zambada admitted responsibility for trafficking at least 1.5 million kilograms of cocaine and was ordered to forfeit $15 billion in drug profits. He is the most prominent Mexican trafficker sentenced in the US since Joaquin 'El Chapo' Guzman in 2019.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce3q1d1ed5do"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/20/mexican-drug-lord-ismael-el-mayo-zambada-sentenced-to-life-in-us-prison"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/el-mayo-zambada-life-sentence.png",
      "alt": "Exterior of the federal courthouse in Brooklyn, New York",
      "credit": "Ajay Suresh, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Jugurtha, King of Numidia, led in triumph and left to die in the dungeon",
        "excerpt": "When, however, he was led in triumph, it is said that he fell distracted, and when he was afterwards thrown into prison, where some tore off his clothes by force, and others, whilst they struggled for his golden ear-ring, with it pulled off the tip of his ear, and when he was, after this, cast naked into the dungeon, in his amazement and confusion, with a ghastly laugh, he cried out, \"O Hercules! how cold your bath is!\" Here for six days struggling with hunger, and to the very last minute desirous of life, he was overtaken by the just reward of his villainies.",
        "source": "Plutarch, Life of Caius Marius (trans. John Dryden, rev. A. H. Clough)",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Caius_Marius",
        "image": {
          "src": "/covers/el-mayo-zambada-life-sentence--a0.png",
          "alt": "1772 engraving of the captured Numidian king Jugurtha brought as a prisoner before the Romans",
          "credit": "Engraving by Manuel Salvador Carmona after Mariano Salvador Maella (1772), from a Madrid edition of Sallust; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Captain William Kidd, the pirate, condemned at the Old Bailey and hanged at Execution Dock (1701)",
        "excerpt": "When Kidd was asked what he had to say why sentence should not pass against him, he answered, that he had nothing to say, but that he had been sworn against by perjured and wicked people. And when sentence was pronounced, he said, My Lord, it is a very hard sentence. For my part, I am the most innocent person of them all, only I have been sworn against by perjured persons.",
        "source": "Charles Ellms, The Pirates Own Book: Authentic Narratives of the Most Celebrated Sea Robbers (1837)",
        "href": "https://www.gutenberg.org/files/12216/12216-h/12216-h.htm",
        "image": {
          "src": "/covers/el-mayo-zambada-life-sentence--a1.png",
          "alt": "Captain William Kidd's body hanging in a gibbet cage over the River Thames after his execution",
          "credit": "National Maritime Museum, Greenwich, London; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "I met a traveller from an antique land\nWho said: Two vast and trunkless legs of stone\nStand in the desert. . . . Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:\nAnd on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\" (1818), in The Complete Poetical Works (ed. Hutchinson, 1914)",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ozymandias",
        "image": {
          "src": "/covers/el-mayo-zambada-life-sentence--a2.png",
          "alt": "The colossal bust of Ramesses II, the 'Younger Memnon', in the British Museum, the statue that inspired Shelley's sonnet",
          "credit": "Photo by Szilas, CC BY-SA 4.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Beggar's Opera: Captain Macheath in the condemned hold",
        "excerpt": "Since Laws were made for ev'ry Degree,\nTo curb Vice in others, as well as me,\nI wonder we han't better Company,\nUpon Tyburn Tree!\nBut Gold from Law can take out the Sting;\nAnd if rich Men like us were to swing,\n'Twou'd thin the Land, such Numbers to string\nUpon Tyburn Tree!",
        "source": "John Gay, The Beggar's Opera (1728), Act III, Air LXVI",
        "href": "https://www.gutenberg.org/cache/epub/2421/pg2421.txt",
        "image": {
          "src": "/covers/el-mayo-zambada-life-sentence--a3.png",
          "alt": "William Hogarth's painting of a scene from The Beggar's Opera, showing the highwayman Macheath in chains",
          "credit": "William Hogarth (1729), Yale Center for British Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Vercingetorix Throws Down His Arms at the Feet of Julius Caesar",
        "excerpt": "Lionel Royer's monumental 1899 canvas depicts the Gaulish chieftain Vercingetorix, after his defeat at Alesia, riding up to the seated Julius Caesar and flinging his sword and armour at the conqueror's feet. The proud warlord, once master of a vast rebellion, is shown at the instant of total submission, surrounded by Roman legionaries. He would be paraded in Caesar's triumph and eventually put to death, the archetype of a mighty rebel leader brought low by an implacable state.",
        "source": "Lionel Royer, oil on canvas (1899), Musée Crozatier, Le Puy-en-Velay",
        "href": "https://commons.wikimedia.org/wiki/File:Lionel_Royer_-_Vercingetorix_Throwing_down_His_Weapons_at_the_feet_of_Julius_Caesar.jpg",
        "image": {
          "src": "/covers/el-mayo-zambada-life-sentence--a4.png",
          "alt": "Painting of the Gaulish chieftain Vercingetorix surrendering his weapons at the feet of a seated Julius Caesar",
          "credit": "Lionel Royer (1899), Musée Crozatier; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Idle 'Prentice Executed at Tyburn (Industry and Idleness, Plate 11)",
        "excerpt": "Plate 11 of Hogarth's moral series Industry and Idleness shows Tom Idle, the idle apprentice whose crimes have led him to the gallows, seated in a cart with his own coffin as a preacher exhorts him to repent. Around the scaffold at Tyburn a vast, jeering crowd presses in, hawkers sell ballads of his life, and the hangman waits above. The print is a thronged eighteenth-century tableau of a notorious criminal delivered at last to public justice.",
        "source": "William Hogarth, etching and engraving (1747), British Museum",
        "href": "https://commons.wikimedia.org/wiki/File:The_Idle_%27Prentice_Executed_at_Tyburn_(BM_1868,0822.1582).jpg",
        "image": {
          "src": "/covers/el-mayo-zambada-life-sentence--a5.png",
          "alt": "Hogarth engraving of the idle apprentice being taken in a cart to be hanged before a huge crowd at Tyburn",
          "credit": "William Hogarth (1747), British Museum; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "philippines-china-south-china-sea-sailor",
    "headline": "Philippines accuses Chinese coast guard of injuring Filipino sailor at disputed shoal",
    "overview": "The Philippines accused the Chinese coast guard of injuring a Filipino sailor during a confrontation at a contested shoal in the South China Sea, and Manila and Beijing each summoned the other's envoy over the incident. Philippine officials said Chinese vessels used force against a resupply mission, while China blamed the Philippine boat for the encounter. The clash is the latest flashpoint in an escalating maritime dispute.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxQOE5XVDd4MGtscjZPSkhZQmtsWU1odXEtMm9hdjR0QUR2bzlBTDkxV0hWU2hqck8wRFkwWWg5Z0VFenpZVHRYZEg3cFRQVmNrRDdHQ3VLWUpEMFFxMTMxQmRlSEtJT3RrclhaLWlIUTRDRUlEOFZrMXZvN0FFX0ZVanVBd1llUnNqSUg1QVpkekVsV0k5MkhWVWFIejA1TmhSa3E5NFBiNEZ0dkk?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNU1JrWlBzY2hhTkQ5dlhFNkhEamdNSW1rUGFmNEJPQzdLVHZxaTVrdE5zSzVKSnl5MG1Nckx0UWVxZmd1RUh1ZlNsU0RoQ2xsNGhwT2FDRGNFUDJuWllrNzFjRXhBLWFiaU12eHpFUVBNUW5oMEdQMjRjekg4VmtkMVphU0hjOFhOQUU4NEhkX09mZWRQOGM4ZE9LTjJiN29fcDJtRVhMSXBmc1ZLSGp0c3dhcFQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/philippines-china-south-china-sea-sailor.png",
      "alt": "A coast guard vessel patrolling contested waters in the South China Sea",
      "credit": "China Coast Guard vessel CCG 3105 near Scarborough Shoal, 2 February 2024. Photo: Philippine Coast Guard / Philippine Information Agency, public domain via Wikimedia Commons."
    },
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Melian Dialogue",
        "excerpt": "For ourselves, we shall not trouble you with specious pretences... since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book V (416 BC), translated by Richard Crawley",
        "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm",
        "image": {
          "src": "/covers/philippines-china-south-china-sea-sailor--a0.png",
          "alt": "Roman-era marble bust of the historian Thucydides, who recorded the Melian Dialogue",
          "credit": "Roman copy of a portrait bust of Thucydides, Royal Ontario Museum; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Mare Liberum (The Freedom of the Seas)",
        "excerpt": "If many writers, Augustine himself among them, believed it was right to take up arms because innocent passage was refused across foreign territory, how much more justly will arms be taken up against those from whom the demand is made of the common and innocent use of the sea, which by the law of nature is common to all?",
        "source": "Hugo Grotius, The Freedom of the Seas, or the Right Which Belongs to the Dutch to Take Part in the East Indian Trade (1609), translated by Ralph van Deman Magoffin (1916)",
        "href": "https://archive.org/details/freedomofseasorr1916grot",
        "image": {
          "src": "/covers/philippines-china-south-china-sea-sailor--a1.png",
          "alt": "Portrait of the Dutch jurist Hugo Grotius, author of Mare Liberum",
          "credit": "Michiel Jansz. van Mierevelt, portrait of Hugo Grotius; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Revenge: A Ballad of the Fleet",
        "excerpt": "At Flores, in the Azores Sir Richard Grenville lay,\nAnd a pinnace, like a flutter'd bird, came flying from far away;\n\"Spanish ships of war at sea! we have sighted fifty-three!\"",
        "source": "Alfred, Lord Tennyson, \"The Revenge: A Ballad of the Fleet\" (1878)",
        "href": "https://www.english.cam.ac.uk/multimedia/tennyson/revenge.htm",
        "image": {
          "src": "/covers/philippines-china-south-china-sea-sailor--a2.png",
          "alt": "Painting of the single English galleon Revenge fighting the encircling Spanish fleet off Flores in 1591",
          "credit": "Charles Dixon, \"The Last Fight of the Revenge off Flores in the Azores, 1591\"; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Persians",
        "excerpt": "On, you men of Hellas! Free your native land. Free your children, your wives, the temples of your fathers' gods, and the tombs of your ancestors. Now you are fighting for all you have.",
        "source": "Aeschylus, The Persians (472 BC), translated by Herbert Weir Smyth (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0012:card=402",
        "image": {
          "src": "/covers/philippines-china-south-china-sea-sailor--a3.png",
          "alt": "Painting of the naval Battle of Salamis, where a smaller Greek fleet defeated the Persian empire's navy",
          "credit": "Wilhelm von Kaulbach, \"The Battle of Salamis\" (1868), Maximilianeum, Munich; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Defeat of the Spanish Armada, 8 August 1588",
        "excerpt": "De Loutherbourg's dramatic canvas shows Elizabeth I's smaller, nimbler English ships scattering the towering galleons of Philip II's Armada amid smoke and heavy seas. The painting became an enduring image of an island nation repelling the era's greatest maritime empire, celebrating seamanship and resolve over sheer size and might.",
        "source": "Philip James de Loutherbourg, oil on canvas (1796), National Maritime Museum, Greenwich (Royal Museums Greenwich)",
        "href": "https://www.rmg.co.uk/collections/objects/rmgc-object-11756",
        "image": {
          "src": "/covers/philippines-china-south-china-sea-sailor--a4.png",
          "alt": "Painting of the English fleet defeating the much larger Spanish Armada in 1588",
          "credit": "Philip James de Loutherbourg, \"Defeat of the Spanish Armada, 8 August 1588\" (1796), National Maritime Museum, Greenwich; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Brig \"Mercury\" Attacked by Two Turkish Ships",
        "excerpt": "Aivazovsky depicts the tiny 18-gun Russian brig Mercury dwarfed between two towering Ottoman ships of the line during their 1829 encounter near the Bosphorus, which the outgunned brig famously survived. The composition dramatizes a lone vessel's defiance against overwhelming force, a David-and-Goliath duel staged on the open sea.",
        "source": "Ivan Aivazovsky, oil on canvas (1892), Feodosia National Art Gallery",
        "href": "https://commons.wikimedia.org/wiki/File:Aivazovsky,_Brig_Mercury_Attacked_by_Two_Turkish_Ships_1892.jpg",
        "image": {
          "src": "/covers/philippines-china-south-china-sea-sailor--a5.png",
          "alt": "Painting of the small Russian brig Mercury fighting between two much larger Turkish warships at sea",
          "credit": "Ivan Aivazovsky, \"Brig 'Mercury' Attacked by Two Turkish Ships\" (1892), Feodosia National Art Gallery; public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "tropical-storm-bertha-hurricane-fausto",
    "headline": "Tropical Storm Bertha drifts toward US Gulf Coast as Hurricane Fausto forms in eastern Pacific",
    "overview": "Tropical Storm Bertha formed Monday evening in the Gulf of Mexico about 140 miles south of Panama City, Florida, with 40 mph winds, threatening storm surge of up to four feet and 3 to 5 inches of rain along the Louisiana coast. Far to the west, Hurricane Fausto strengthened over the eastern Pacific with 75 mph winds but posed no threat to land, though its swells could bring dangerous surf to Mexico's Baja California peninsula.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPWUtZaU1rRXotenV4eWFXNm9PdnF3bHgxaWFyZ1hGeF9laVlyak1TWWdVSDNkY0FlUkw2YVhhWG1lVDhrc192Z0JlNllKc2ZrOFFCZEMwREtYelhTUlVWS1h0b2NvZXlHeENJYll6eDVMLTd0b04zTGR5SjlsNW5MZDZNeGFxalNLMlBNb0ZSY3l2dnQ1R3VJSw?oc=5"
      },
      {
        "name": "Washington Post",
        "href": "https://www.washingtonpost.com/national/2026/07/20/gulf-tropical-depression-flooding/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/tropical-storm-bertha-hurricane-fausto.png",
      "alt": "Satellite view of a swirling tropical storm over the Gulf of Mexico",
      "credit": "NASA / NOAA GOES satellite image of Hurricane Katrina over the Gulf of Mexico, 28 August 2005. Public domain, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The storm that wrecked Xerxes' Persian fleet off Sepias (480 BC)",
        "excerpt": "For that night they lay thus; but at early dawn, after clear sky and windless calm, the sea began to be violently agitated and a great storm fell upon them with a strong East Wind, that wind which they who dwell about those parts call Hellespontias. Now as many of them as perceived that the wind was rising and who were so moored that it was possible for them to do so, drew up their ships on land before the storm came, and both they and their ships escaped; but as for those of the ships which it caught out at sea, some it cast away at the place called Ipnoi in Pelion and others on the beach, while some were wrecked on the headland of Sepias itself, others at the city of Meliboia, and others were thrown up on shore at Casthanaia: and the violence of the storm could not be resisted.",
        "source": "Herodotus, The History of Herodotus, Book VII (trans. G. C. Macaulay)",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Macaulay)/Book_VII"
      },
      {
        "category": "historical",
        "title": "The Great Storm of 1703 that devastated Britain and its shipping",
        "excerpt": "Some which had not a Mast standing, nor an Anchor or Cable left them, went out to Sea wherever the Winds drove them; and lying like a Trough in the Water, wallow'd about till the Winds abated; and after were driven, some into one Port, some into another, as Providence guided them. In short, Horror and Confusion seiz'd upon all, whether on Shore or at Sea: No Pen can describe it, no Tongue can express it, no Thought conceive it, unless some of those who were in the Extremity of it; and who, being touch'd with a due sense of the sparing Mercy of their Maker, retain the deep Impressions of his Goodness upon their Minds, tho' the Danger be past.",
        "source": "Daniel Defoe, The Storm (1704) — the first substantial work of modern storm journalism",
        "href": "https://www.gutenberg.org/ebooks/42234"
      },
      {
        "category": "literary",
        "title": "Poseidon raises the storm that shatters Odysseus' raft",
        "excerpt": "With that he gathered the clouds and troubled the waters of the deep, grasping his trident in his hands; and he roused all storms of all manner of winds, and shrouded in clouds the land and sea: and down sped night from heaven. The East Wind and the South Wind clashed, and the stormy West, and the North, that is born in the bright air, rolling onward a great wave. Then were the knees of Odysseus loosened and his heart melted, and heavily he spake to his own great spirit.",
        "source": "Homer, The Odyssey, Book V (trans. S. H. Butcher and Andrew Lang)",
        "href": "https://www.gutenberg.org/ebooks/1728"
      },
      {
        "category": "literary",
        "title": "The tempest and shipwreck that open Shakespeare's play",
        "excerpt": "The sky, it seems, would pour down stinking pitch, But that the sea, mounting to the welkin's cheek, Dashes the fire out. O, I have suffer'd With those that I saw suffer! a brave vessel, Who had, no doubt, some noble creature in her, Dash'd all to pieces. O, the cry did knock Against my very heart! Poor souls, they perish'd!",
        "source": "William Shakespeare, The Tempest, Act I, Scene 2 (Cambridge edition)",
        "href": "https://www.gutenberg.org/ebooks/23042"
      },
      {
        "category": "artistic",
        "title": "Snow Storm: Steam-Boat off a Harbour's Mouth",
        "excerpt": "Turner's late seascape dissolves a steamboat into a vortex of driving snow, spray and spume, placing the viewer inside the chaos of a gale rather than at a safe distance from it. The artist claimed he had himself lashed to the mast of a ship to witness such a storm, and the swirling paint conveys the sublime terror of wind and water overwhelming human vessels — a fitting image for coasts bracing against a tropical storm.",
        "source": "J. M. W. Turner, oil on canvas, exhibited 1842, Tate (N00530)",
        "href": "https://www.tate.org.uk/art/artworks/turner-snow-storm-steam-boat-off-a-harbours-mouth-n00530",
        "image": {
          "src": "/covers/tropical-storm-bertha-hurricane-fausto--a4.png",
          "alt": "Turner's Snow Storm: a steamboat engulfed in a swirling vortex of storm, snow and sea spray",
          "credit": "J. M. W. Turner, 'Snow Storm: Steam-Boat off a Harbour's Mouth' (1842), Tate. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Ninth Wave",
        "excerpt": "Aivazovsky's most celebrated marine painting shows a handful of shipwreck survivors clinging to a fragment of mast as the sea rears up against them at dawn. Folklore held the ninth wave to be the largest and most destructive of a storm, and the canvas balances the sublime terror of towering water against the fragile hope of the rising sun — an enduring emblem of humanity facing the fury of wind and sea.",
        "source": "Ivan Aivazovsky, oil on canvas, 1850, State Russian Museum, St Petersburg",
        "href": "https://commons.wikimedia.org/wiki/File:Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/tropical-storm-bertha-hurricane-fausto--a5.png",
          "alt": "Aivazovsky's The Ninth Wave: shipwreck survivors cling to a mast as a huge wave rises at dawn",
          "credit": "Ivan Aivazovsky, 'The Ninth Wave' (1850), State Russian Museum. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "spp-central-states-rolling-blackouts",
    "headline": "US central-states grid operator warns of possible rolling blackouts amid record heat",
    "overview": "The Southwest Power Pool, which manages the grid across 14 central US states, warned Monday evening that it could order rolling blackouts after several power plants unexpectedly tripped offline during a heat wave stretching from North Dakota to Louisiana. The operator declared a level-three energy alert, tapping operating reserves to meet record demand, before easing the warning a few hours later. No blackouts were ultimately ordered.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPejYtZ1NMQ254UFNyVmx2dUZRS3VxeEt1TFRMc3FLNWxzSjlCSzdkOGhxdjd0QUhxTWk1eWFnNVkyUHlqWXVOMzYwdF9pM3lJb0hoYkhtanRCNkxOa05KbnZFTnZEdUdxMFItNXZpcmdrZm5vU3dRa2JPTUtqSDZoUjZfeDhPcU1nenZ2VUw1YThRU2xaQW5ENW44TlMtTUo5MGxjZ1ZubDEwU05NdVRfbzNLeFR2X3RT?oc=5"
      },
      {
        "name": "WSAU",
        "href": "https://wsau.com/2026/07/20/grid-operator-in-us-central-states-warns-of-potential-rolling-blackouts/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/spp-central-states-rolling-blackouts.png",
      "alt": "High-voltage electricity transmission lines against a hazy summer sky",
      "credit": "Stefan Andrej Shambora, 2007. CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of London (1666)",
        "excerpt": "So near the fire as we could for smoke; and all over the Thames, with one's face in the wind, you were almost burned with a shower of firedrops. This is very true; so as houses were burned by these drops and flakes of fire, three or four, nay, five or six houses, one from another. … We staid till, it being darkish, we saw the fire as only one entire arch of fire from this to the other side the bridge, and in a bow up the hill for an arch of above a mile long: it made me weep to see it. The churches, houses, and all on fire and flaming at once; and a horrid noise the flames made, and the cracking of houses at their ruins.",
        "source": "The Diary of Samuel Pepys, entry for 2 September 1666",
        "href": "https://www.gutenberg.org/cache/epub/4167/pg4167.txt",
        "image": {
          "src": "/covers/spp-central-states-rolling-blackouts--a0.png",
          "alt": "The Great Fire of London (1666), painted c.1675 by an unknown artist, showing the city ablaze along the Thames",
          "credit": "Unknown painter, c.1675, Museum of London. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Northeast Blackout of 2003",
        "excerpt": "On the afternoon of August 14, 2003, a cascading failure that began in Ohio swept across the northeastern United States and Ontario, cutting power to roughly 50 million people in the largest blackout in North American history. Overgrown transmission lines, a software failure, and poor situational awareness let a local problem spiral into a grid-wide collapse on a warm summer day. Cities from Detroit to New York went dark for hours or days, stranding commuters and knocking out water, transit, and communications.",
        "source": "U.S.-Canada Power System Outage Task Force, Final Report on the August 14, 2003 Blackout in the United States and Canada (U.S. Department of Energy, 2004)",
        "href": "https://www.energy.gov/sites/prod/files/oeprod/DocumentsandMedia/BlackoutFinal-Web.pdf",
        "image": {
          "src": "/covers/spp-central-states-rolling-blackouts--a1.png",
          "alt": "Satellite night-lights image of the northeastern United States on August 14, 2003, showing cities darkened by the blackout",
          "credit": "NOAA / U.S. Air Force DMSP. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Darkness",
        "excerpt": "I had a dream, which was not all a dream. / The bright sun was extinguished, and the stars / Did wander darkling in the eternal space, / Rayless, and pathless, and the icy Earth / Swung blind and blackening in the moonless air; / Morn came and went—and came, and brought no day, / And men forgot their passions in the dread / Of this their desolation; and all hearts / Were chilled into a selfish prayer for light: / And they did live by watchfires—and the thrones, / The palaces of crownéd kings—the huts, / The habitations of all things which dwell, / Were burnt for beacons; cities were consumed",
        "source": "Lord Byron, \"Darkness\" (Diodati, July 1816)",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Lord_Byron_(ed._Coleridge,_Prothero)/Poetry/Volume_4/Darkness",
        "image": {
          "src": "/covers/spp-central-states-rolling-blackouts--a2.png",
          "alt": "Portrait of Lord Byron by Richard Westall, 1813",
          "credit": "Richard Westall, 1813, National Portrait Gallery, London. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Rime of the Ancient Mariner",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon. … Water, water, every where, / And all the boards did shrink; / Water, water, every where, / Nor any drop to drink.",
        "source": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner\" (final text, 1834)",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm",
        "image": {
          "src": "/covers/spp-central-states-rolling-blackouts--a3.png",
          "alt": "Gustave Doré's engraving for Coleridge's \"The Rime of the Ancient Mariner\" (1876)",
          "credit": "Gustave Doré, 1876. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Great Day of His Wrath",
        "excerpt": "Painted in the last years of Martin's life, this vast apocalyptic canvas shows an entire city being torn from its foundations and hurled into a fiery abyss beneath a blood-red, lightning-riven sky. Mountains collapse and crowds of tiny figures are swept into darkness, an image of civilization overwhelmed in an instant. Martin drew on the Book of Revelation, but the painting also channels a Victorian dread of a world convulsed by natural and industrial cataclysm.",
        "source": "John Martin, \"The Great Day of His Wrath\" (1851–1853), Tate, London (N05613)",
        "href": "https://www.tate.org.uk/art/artworks/martin-the-great-day-of-his-wrath-n05613",
        "image": {
          "src": "/covers/spp-central-states-rolling-blackouts--a4.png",
          "alt": "John Martin's apocalyptic painting \"The Great Day of His Wrath\", a city plunged into fiery darkness beneath a red sky",
          "credit": "John Martin, 1851–1853, Tate, London. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Seasons (Die Jahreszeiten) — \"Summer\"",
        "excerpt": "In the \"Summer\" part of Haydn's late oratorio, an oppressive noonday heat settles over the land as the sun climbs to its zenith and the shepherd, flocks, and fields languish in the still, burning air. The music grows heavy and airless before erupting into one of the most vivid thunderstorms in the classical repertoire, driven by hammering timpani and racing strings. Haydn turns the endurance of extreme heat and the sudden violence of summer weather into pure orchestral drama.",
        "source": "Joseph Haydn, Die Jahreszeiten, Hob. XXI:3 (1801), Part 2: \"Der Sommer\"",
        "href": "https://imslp.org/wiki/Die_Jahreszeiten,_Hob.XXI:3_(Haydn,_Joseph)",
        "image": {
          "src": "/covers/spp-central-states-rolling-blackouts--a5.png",
          "alt": "Portrait of the composer Joseph Haydn by Thomas Hardy, 1791",
          "credit": "Thomas Hardy, 1791, Royal College of Music, London. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "samsung-robotics-division-rx",
    "headline": "Samsung creates dedicated robotics division led by former Hyundai executive",
    "overview": "Samsung Electronics said Tuesday it will establish a robotics division, called RX, that reports directly to the chief executive, aiming to make robotics a core growth engine. Executive vice-president Lee Dongkun, who previously directed robotics strategy at Hyundai Motor Group and oversaw Boston Dynamics, will lead the new unit's strategy team. Samsung also plans robotics research hubs in the US, China and Japan.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxOUUZzV0hGcjR4YUpvTFkyVDhjRUE2M0VUWEtvTWhydFpQZDhaRDdaU1RyRmNtR05HZkhjQVVpU25mSTBHbkdWNXdmNjd4eFYxQW55Z08walRTai1aNjB1SGplODZTZVB3aEl2OVdMZ3RZN19Wd0l5dVRYQWV6LUMwaVZWNzhrTGk0RXJXNlF5LW1Pb3ZZal9UZFJuSE9mN3d6VWJpYTZ6Q1Z6NnBId2JXS2V6aHRhenNJcnBtUENJZXBNTmc?oc=5"
      },
      {
        "name": "SamMobile",
        "href": "https://www.sammobile.com/news/samsung-rx-robotics-division-created-future-growth/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/samsung-robotics-division-rx.png",
      "alt": "A humanoid robot on an exhibition stand",
      "credit": "TOPIO 3.0 humanoid robot at the Tokyo International Robot Exhibition, November 2009. Photo by Humanrobo, CC BY-SA 3.0, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Al-Jazari, The Book of Knowledge of Ingenious Mechanical Devices",
        "excerpt": "Writing in 1206 as chief engineer to the Artuqid court at Diyarbakir, Ismail al-Jazari described some fifty machines and the exact means to build them, among them water clocks and humanoid figures that poured drinks, offered soap and towels, and struck the hours. His illustrated manuscripts, copied for centuries, are among the earliest detailed blueprints for programmable automata built in the likeness of human servants. This folio depicts his celebrated elephant clock, whose figures moved and sounded on the half hour.",
        "source": "The Metropolitan Museum of Art (folio from al-Jazari's treatise, dated A.H. 715 / A.D. 1315)",
        "href": "https://www.metmuseum.org/art/collection/search/451402",
        "image": {
          "src": "/covers/samsung-robotics-division-rx--a0.png",
          "alt": "Manuscript painting of al-Jazari's elephant clock, with mechanical figures of a scribe, a bird, dragons and a driver mounted on an elephant.",
          "credit": "\"The Elephant Clock,\" folio from a Book of the Knowledge of Ingenious Mechanical Devices by al-Jazari, A.D. 1315. The Metropolitan Museum of Art, CC0, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Jaquet-Droz automaton 'The Writer' (L'Ecrivain)",
        "excerpt": "Built between 1768 and 1774 by the Swiss watchmaker Pierre Jaquet-Droz with his son Henri-Louis and Jean-Frederic Leschot, 'The Writer' is a clockwork boy of some 6,000 parts who dips a quill in ink and writes any programmed text up to forty characters, his eyes following the letters as his hand moves. Set by a wheel of interchangeable cams, it is often called one of the oldest ancestors of the programmable computer. The Enlightenment automaton dramatized the dream of a machine crafted in human form that could perform a human's work.",
        "source": "Musee d'art et d'histoire, Neuchatel, Switzerland",
        "href": "https://www.mahn.ch/en/expositions/automates-jaquet-droz",
        "image": {
          "src": "/covers/samsung-robotics-division-rx--a1.png",
          "alt": "The Jaquet-Droz 'Writer' automaton, a seated mechanical child figure holding a quill pen at a wooden desk.",
          "credit": "Jaquet-Droz automaton 'The Writer,' Musee d'art et d'histoire, Neuchatel. Photo by Gre regiment, CC BY-SA 4.0, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book 18 - the golden handmaidens of Hephaestus",
        "excerpt": "but there moved swiftly to support their lord handmaidens wrought of gold in the semblance of living maids. In them is understanding in their hearts, and in them speech and strength, and they know cunning handiwork by gift of the immortal gods.",
        "source": "Homer, Iliad 18.417-420, translated by A. T. Murray, Perseus Digital Library (Tufts University)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18:card=368"
      },
      {
        "category": "literary",
        "title": "Karel Capek, R.U.R. (Rossum's Universal Robots)",
        "excerpt": "In fact he rejected man and made the Robot. My dear Miss Glory, the Robots are not people. Mechanically they are more perfect than we are; they have an enormously developed intelligence, but they have no soul.",
        "source": "Karel Capek, R.U.R., English version by Nigel Playfair (Project Gutenberg, eBook #59112)",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm",
        "image": {
          "src": "/covers/samsung-robotics-division-rx--a3.png",
          "alt": "Stage photograph from Act I of the Theatre Guild production of R.U.R., showing actors in the factory office set.",
          "credit": "Act I of the Theatre Guild production of Karel Capek's R.U.R., 1923. Photo by Francis Bruguiere; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Death of Talos - Attic red-figure volute krater by the Talos Painter",
        "excerpt": "This late fifth-century BC krater shows the death of Talos, the giant bronze automaton whom Hephaestus forged to guard Crete by circling the island three times a day. Painted in pale tones to mark him as metal rather than flesh, Talos collapses into the arms of the Dioskouroi as Medea, at left, works the sorcery that drains the ichor from his single vein. It is one of antiquity's most vivid images of an artificial being made in human form by a craftsman's hand.",
        "source": "Talos Painter, c. 400 BC; Museo Archeologico Nazionale Jatta, Ruvo di Puglia (name vase of the painter)",
        "href": "https://commons.wikimedia.org/wiki/File:Vaso_di_Talos.JPG",
        "image": {
          "src": "/covers/samsung-robotics-division-rx--a4.png",
          "alt": "Ancient Greek red-figure vase painting of the bronze automaton Talos, shown in white, falling backward into the arms of two youths while Medea stands by.",
          "credit": "The Death of Talos, Attic red-figure volute krater by the Talos Painter, Museo Jatta, Ruvo di Puglia. Photo by Forzaruvo94, CC BY-SA 3.0, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Leo Delibes, Coppelia, ou La fille aux yeux d'email",
        "excerpt": "Delibes's 1870 ballet turns on Dr. Coppelius, an eccentric inventor whose life-size mechanical doll, Coppelia, is so lifelike that a young villager falls in love with her. The score gives the wind-up dancer her own jerky, clockwork music before the deception unravels. It set the automaton fantasy - a maker infatuated with the artificial being he has crafted in human likeness - to some of the nineteenth century's most beloved dance music.",
        "source": "Leo Delibes, Coppelia (ballet, Paris, 1870) - IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Copp%C3%A9lia_(Delibes,_L%C3%A9o)",
        "image": {
          "src": "/covers/samsung-robotics-division-rx--a5.png",
          "alt": "1870 photograph of ballerina Giuseppina Bozzacchi in costume as Swanilda in the original Paris production of Coppelia.",
          "credit": "Giuseppina Bozzacchi as Swanilda in the premiere production of Delibes's Coppelia, Paris, 1870. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "hungary-byd-szijjarto-investigation",
    "headline": "Hungary opens investigation into BYD deal after ex-foreign minister joins the Chinese carmaker",
    "overview": "Hungary's government said Monday it is investigating a major investment by Chinese automaker BYD that was negotiated by former foreign minister Peter Szijjarto, who resigned from Parliament last week to take an executive job at the company. Prime Minister Peter Magyar told lawmakers the probe would examine subsidies, tax breaks and permits granted to BYD, alleging Szijjarto had backed the firm with 'hundreds of billions' of forints in public money. The inquiry will also review incentives handed to multinationals during Viktor Orban's tenure.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxPdl95Y3haUXBWakVhR3hodjlLUFlxTUJ5Q1ZyRkF1ZFNNY1hMM01MZHVQQkc0SlAwMHFYQjViZThMZnRZTHZoOW9BNEFDQmVrVkpKaTFOdTlJQnliRkVBMl9yUXgwQlV3M1RDUTFGQmM0TlBOZThrM1Q4ZHM3SFBIRmhNNWxHUk9FMEFkMjJGQk9jQmQwckdN?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://www.scmp.com/business/china-evs/article/3361258/hungary-investigates-deal-chinas-byd-after-ex-foreign-minister-takes-job-there"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/hungary-byd-szijjarto-investigation.png",
      "alt": "A row of BYD electric buses parked together in Bogota, Colombia",
      "credit": "BYD Colombia, CC BY-SA 2.5, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero prosecutes Verres for plundering his province",
        "excerpt": "… they have got to fear who have stolen only as much as is enough for themselves, but that he has stolen so much that it may easily be plenty for many; that nothing is so holy that it cannot be corrupted, or so strongly fortified that it cannot be stormed by money.",
        "source": "Cicero, First Oration Against Verres (Actio Prima, 70 BC), trans. C. D. Yonge",
        "href": "https://en.wikisource.org/wiki/Against_Verres/First_pleading",
        "image": {
          "src": "/covers/hungary-byd-szijjarto-investigation--a0.png",
          "alt": "Ancient marble bust of the Roman orator and statesman Cicero, Capitoline Museums, Rome",
          "credit": "Photograph by Glauco92, CC BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Edmund Burke impeaches Warren Hastings for corruption in office",
        "excerpt": "Mr. Hastings' government was one whole system of oppression, of robbery of individuals, of spoliation of the public, and of supersession of the whole system of the English government, in order to vest in the worst of the natives all the power that could possibly exist in any government.",
        "source": "Edmund Burke, Speech at the Trial (Impeachment) of Warren Hastings, Westminster Hall (1788)",
        "href": "https://en.wikisource.org/wiki/The_World%27s_Famous_Orations/Volume_6/At_the_Trial_of_Warren_Hastings",
        "image": {
          "src": "/covers/hungary-byd-szijjarto-investigation--a1.png",
          "alt": "Portrait of Warren Hastings, Governor-General of Bengal, painted circa 1772 by Tilly Kettle",
          "credit": "Tilly Kettle (c. 1772), National Portrait Gallery, London; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Dante's barrators boil in pitch for selling public office",
        "excerpt": "Behold one of the elders of Saint Zita; Plunge him beneath, for I return for others Unto that town, which is well furnished with them. All there are barrators, except Bonturo; No into Yes for money there is changed.",
        "source": "Dante Alighieri, Inferno, Canto XXI, trans. Henry Wadsworth Longfellow (1867)",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_21",
        "image": {
          "src": "/covers/hungary-byd-szijjarto-investigation--a2.png",
          "alt": "Gustave Dore engraving for Inferno Canto XXI: Virgil rebuking the demons over the pit of boiling pitch where the barrators are punished",
          "credit": "Gustave Dore (1861), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Trollope's swindler-financier Melmotte buys his way into society and Parliament",
        "excerpt": "People said that Mr. Melmotte had a reputation throughout Europe as a gigantic swindler,—as one who in the dishonest and successful pursuit of wealth had stopped at nothing. People said of him that he had framed and carried out long premeditated and deeply laid schemes for the ruin of those who had trusted him, that he had swallowed up the property of all who had come in contact with him, that he was fed with the blood of widows and children.",
        "source": "Anthony Trollope, The Way We Live Now (1875)",
        "href": "https://www.gutenberg.org/ebooks/5231",
        "image": {
          "src": "/covers/hungary-byd-szijjarto-investigation--a3.png",
          "alt": "Caricature of the novelist Anthony Trollope by Frederick Waddy, 1872",
          "credit": "Frederick Waddy, 'Cartoon Portraits and Biographical Sketches of Men of the Day' (1873), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Hogarth satirizes electoral bribery in 'Canvassing for Votes'",
        "excerpt": "Hogarth's second election print shows a prosperous farmer being simultaneously plied with bribes and treats by agents of both the Whig and Tory parties as innkeepers count their takings, a biting image of votes and public favour openly bought with money.",
        "source": "William Hogarth, Canvassing for Votes (Four Prints of an Election, plate 2), engraved by Charles Grignion, 1757",
        "href": "https://commons.wikimedia.org/wiki/File:Canvassing_for_Votes,_Plate_II-_Four_Prints_of_an_Election_MET_DP827058.jpg",
        "image": {
          "src": "/covers/hungary-byd-szijjarto-investigation--a4.png",
          "alt": "William Hogarth's 1757 engraving 'Canvassing for Votes', depicting political agents bribing a voter outside an inn",
          "credit": "After William Hogarth, engraved by Charles Grignion; The Metropolitan Museum of Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Daumier's 'The Legislative Belly' lampoons a corrupt, bloated chamber",
        "excerpt": "Daumier's 1834 lithograph ranks the ministerial benches of the July Monarchy's Chamber of Deputies as rows of paunchy, smug, dozing legislators, each an identifiable public man, skewering the self-satisfied greed and corruption of those meant to serve the public interest.",
        "source": "Honore Daumier, Le Ventre legislatif (The Legislative Belly), lithograph, 1834",
        "href": "https://commons.wikimedia.org/wiki/File:Le_ventre_l%C3%A9gislatif-_Aspect_des_bancs_minist%C3%A9riels_de_la_chambre_improstitu%C3%A9e_de_1834_MET_48055.jpg",
        "image": {
          "src": "/covers/hungary-byd-szijjarto-investigation--a5.png",
          "alt": "Honore Daumier's 1834 lithograph 'Le Ventre legislatif', caricaturing corpulent, complacent deputies on the ministerial benches",
          "credit": "Honore Daumier (1834); The Metropolitan Museum of Art; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "mvrdv-rotterdam-rocks-world-wonder",
    "headline": "MVRDV wins competition to build Rotterdam climate landmark billed as a 'new world wonder'",
    "overview": "Dutch architecture firm MVRDV won an international competition to design 'Rotterdam Rocks!', a 240-million-euro sustainability landmark on the city's Maas waterfront intended as a 'new wonder of the world' promoting climate action. The 30,000-square-meter building, a stack of planted, rock-like volumes, will house an immersive experience, a hotel, a conference center and a food court. MVRDV beat shortlisted rivals including Heatherwick Studio and Mecanoo among 80 international entries.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/21/mvrdv-rotterdam-rocks-shift-competition/"
      },
      {
        "name": "Designboom",
        "href": "https://www.designboom.com/architecture/mvrdv-competition-rotterdam-shift-embassy-landmark-ecological-change/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/mvrdv-rotterdam-rocks-world-wonder.png",
      "alt": "The Maas waterfront skyline in Rotterdam, the Netherlands",
      "credit": "Erasmusbrug & De Rotterdam, photo by Fred Romero, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Hanging Garden of Babylon",
        "excerpt": "The park extended four plethra on each side, and since the approach to the garden sloped like a hillside and the several parts of the structure rose from one another tier on tier, the appearance of the whole resembled that of a theatre. When the ascending terraces had been built, there had been constructed beneath them galleries which carried the entire weight of the planted garden and rose little by little one above the other along the approach; and the uppermost gallery, which was fifty cubits high, bore the highest surface of the park, which was made level with the circuit wall of the battlements of the city.",
        "source": "Diodorus Siculus, Library of History, Book II.10 (Loeb translation, C. H. Oldfather)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Diodorus_Siculus/2A*.html",
        "image": {
          "src": "/covers/mvrdv-rotterdam-rocks-world-wonder--a0.png",
          "alt": "The Hanging Gardens of Babylon, a 16th-century engraving after Maarten van Heemskerck, showing terraced planted gardens rising above the city walls",
          "credit": "Maarten van Heemskerck (16th century), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Dome of Santa Maria del Fiore",
        "excerpt": "And it can be said with confidence that the ancients never went so high with their buildings, and never exposed themselves to so great a risk as to try to challenge the heavens, even as this structure truly appears to challenge them, seeing that it rises to such a height that the mountains round Florence appear no higher. And it seems, in truth, that the heavens are envious of it, since the lightning keeps on striking it every day.",
        "source": "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors and Architects — Life of Filippo Brunelleschi (trans. Gaston du C. de Vere)",
        "href": "https://www.gutenberg.org/files/25759/25759-h/25759-h.htm",
        "image": {
          "src": "/covers/mvrdv-rotterdam-rocks-world-wonder--a1.png",
          "alt": "Brunelleschi's dome of the Cathedral of Santa Maria del Fiore dominating the skyline of Florence, Italy",
          "credit": "Photo by Petar Milošević, CC BY-SA 4.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Tower of Babel (Genesis 11:4–9)",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth. And the LORD came down to see the city and the tower, which the children of men builded. And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do. Go to, let us go down, and there confound their language, that they may not understand one another's speech. So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city. Therefore is the name of it called Babel; because the LORD did there confound the language of all the earth: and from thence did the LORD scatter them abroad upon the face of all the earth.",
        "source": "The Holy Bible, King James Version — Genesis, chapter 11",
        "href": "https://www.gutenberg.org/files/10/10-h/10-h.htm",
        "image": {
          "src": "/covers/mvrdv-rotterdam-rocks-world-wonder--a2.png",
          "alt": "The Confusion of Tongues, Gustave Doré's engraving of the abandoned Tower of Babel",
          "credit": "Gustave Doré (1865–66), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Kubla Khan; or, A Vision in a Dream",
        "excerpt": "In Xanadu did Kubla Khan\nA stately pleasure-dome decree:\nWhere Alph, the sacred river, ran\nThrough caverns measureless to man\nDown to a sunless sea.\nSo twice five miles of fertile ground\nWith walls and towers were girdled round;\nAnd here were gardens bright with sinuous rills\nWhere blossom'd many an incense-bearing tree;\nAnd here were forests ancient as the hills,\nAnd folding sunny spots of greenery.",
        "source": "Samuel Taylor Coleridge, Kubla Khan, first published 1816 (Christabel; Kubla Khan; The Pains of Sleep)",
        "href": "https://en.wikisource.org/wiki/Christabel;_Kubla_Khan;_The_Pains_of_Sleep_(1816)/Kubla_Khan"
      },
      {
        "category": "artistic",
        "title": "The Tower of Babel",
        "excerpt": "Bruegel imagines the biblical tower as a colossal spiralling megastructure of arches and ramps, hewn into a living rock outcrop and dwarfing the harbour city and ships at its foot. Its unfinished upper storeys and visibly leaning form turn the monument into a meditation on overreaching human ambition — a vast work of engineering fused with the natural crag it rises from.",
        "source": "Pieter Bruegel the Elder, oil on panel, 1563, Kunsthistorisches Museum, Vienna",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/mvrdv-rotterdam-rocks-world-wonder--a4.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting The Tower of Babel, a vast spiralling tower rising beside a harbour",
          "credit": "Pieter Bruegel the Elder (1563), Kunsthistorisches Museum, Vienna; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "La cathédrale engloutie (The Sunken Cathedral)",
        "excerpt": "Debussy's piano prelude evokes the legend of the drowned cathedral of Ys, which rises out of the sea at dawn amid pealing bells and chanting before sinking beneath the waves again. Through parallel chords and swelling sonorities the music builds a monumental edifice out of sound, dissolving the boundary between a great human structure and the water from which it emerges. It is a fitting overture for a landmark conceived to rise, rock-like, from a waterfront.",
        "source": "Claude Debussy, Préludes, Livre 1, No. 10, composed 1909–10 (Paris: Durand et Cie., 1910)",
        "href": "https://imslp.org/wiki/Pr%C3%A9ludes,_Livre_1_(Debussy,_Claude)"
      }
    ],
    "rank": 10
  },
  {
    "slug": "sri-lanka-drones-dengue-outbreak",
    "headline": "Sri Lanka deploys air force drones to fight worst dengue outbreak in nearly a decade",
    "overview": "Sri Lanka is using air force drones to spot stagnant rooftop water after monsoon rains as it battles its worst dengue outbreak in almost ten years, with troops and police also inspecting homes, building sites and schools for mosquito-breeding grounds. Since January the mosquito-borne disease has killed 53 people and infected more than 76,000, with roughly three-quarters of cases tied to the more virulent DENV-2 strain. Health officials expect infections to ease as the monsoon weakens in August.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0gFBVV95cUxPSDVoUG4tUU94eDVpWTlBMzhFNHBHNFItRGVUaldmLXdpVkMyOS1iUjRVV05qSG1PTFJMNXdPR2d5UUdLSWx3aWNtcTFkNmUwRVA1aS1MSkNleTVfZlNBQ1BGUEZuaFl6RzN1RWtsTUVKVFZDOUg5ZWgzZUFOT2NRd2gwd1lsZXoycS0xa3pEZ0lHMEoxRUNyX2FqZUJoZWVpU09YeVU3S1dBODJoZnpLVVZwSDJ5X3BlOFNiSmdraUdlanVLY2gzVnhDTVktNE5NdUE?oc=5"
      },
      {
        "name": "Free Malaysia Today",
        "href": "https://www.freemalaysiatoday.com/category/world/2026/07/21/sri-lanka-uses-air-force-drones-to-tackle-spreading-dengue-outbreak"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/sri-lanka-drones-dengue-outbreak.png",
      "alt": "A quadcopter drone flying over rooftops",
      "credit": "Josh Sorenson, CC0 (public domain), via Wikimedia Commons"
    },
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens (430 BC)",
        "excerpt": "people in good health were all of a sudden attacked by violent heats in the head, and redness and inflammation in the eyes, the inward parts, such as the throat or tongue, becoming bloody and emitting an unnatural and fetid breath. These symptoms were followed by sneezing and hoarseness, after which the pain soon reached the chest, and produced a hard cough.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (Richard Crawley translation)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
        "image": {
          "src": "/covers/sri-lanka-drones-dengue-outbreak--a0.png",
          "alt": "Michael Sweerts, Plague in an Ancient City (c. 1652-1654), long associated with the Plague of Athens, showing the dead and dying in a stricken classical city",
          "credit": "Michael Sweerts, Los Angeles County Museum of Art (LACMA), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The war on the mosquito: eradicating yellow fever in Havana (1901)",
        "excerpt": "It was evident, therefore, that if we could prevent this being done in every case of yellow fever in Havana, the disease would disappear. This measure alone would be sufficient for eliminating yellow fever.",
        "source": "William C. Gorgas, Sanitation in Panama (1915), Chapter V: Sanitary Work at Havana",
        "href": "https://archive.org/details/sanitationinpana00gorgrich"
      },
      {
        "category": "literary",
        "title": "A Journal of the Plague Year (1722)",
        "excerpt": "The second week in June, the parish of St Giles, where still the weight of the infection lay, buried 120, whereof though the bills said but sixty-eight of the plague, everybody said there had been 100 at least, calculating it from the usual number of funerals in that parish, as above.",
        "source": "Daniel Defoe, A Journal of the Plague Year",
        "href": "https://www.gutenberg.org/ebooks/376"
      },
      {
        "category": "literary",
        "title": "The Masque of the Red Death (1842)",
        "excerpt": "The “Red Death” had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal—the redness and the horror of blood. There were sharp pains, and sudden dizziness, and then profuse bleeding at the pores, with dissolution. The scarlet stains upon the body and especially upon the face of the victim, were the pest ban which shut him out from the aid and from the sympathy of his fellow-men. And the whole seizure, progress and termination of the disease, were the incidents of half an hour.",
        "source": "Edgar Allan Poe, The Masque of the Red Death",
        "href": "https://www.gutenberg.org/ebooks/1064"
      },
      {
        "category": "artistic",
        "title": "The Triumph of Death (c. 1562-1563)",
        "excerpt": "Bruegel's panoramic panel imagines death as an unstoppable epidemic sweeping the whole of society, with armies of skeletons harvesting kings and peasants alike across a scorched landscape. Painted in an age when plague repeatedly emptied Europe's cities, it renders pestilence as a mass event that no wall, rank, or wealth can hold back. The teeming detail turns collective mortality into a single overwhelming image of contagion triumphant.",
        "source": "Pieter Bruegel the Elder, Museo Nacional del Prado, Madrid",
        "href": "https://www.museodelprado.es/en/the-collection/art-work/the-triumph-of-death/d3d82b0b-9bf2-4082-ab04-66ed53196ccc",
        "image": {
          "src": "/covers/sri-lanka-drones-dengue-outbreak--a4.png",
          "alt": "Pieter Bruegel the Elder's The Triumph of Death, a vast landscape overrun by armies of skeletons driving the living toward death",
          "credit": "Pieter Bruegel the Elder, Museo del Prado, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Die Pest / The Plague (1898)",
        "excerpt": "Böcklin personifies plague as a skeletal Death riding a winged, dragon-like beast that swoops low through a narrow street, scattering the dying in its shadow. The airborne monster gives visual form to the old fear of pestilence descending from above and moving faster than any human defence. Painted near the end of the artist's life, it distils centuries of dread of epidemic disease into a single predatory figure in flight.",
        "source": "Arnold Böcklin, Kunstmuseum Basel",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/sri-lanka-drones-dengue-outbreak--a5.png",
          "alt": "Arnold Böcklin's Die Pest, showing Death astride a winged beast flying low through a medieval street as townspeople fall",
          "credit": "Arnold Böcklin, Kunstmuseum Basel, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "anti-ice-veteran-manhattan-fire",
    "headline": "Army veteran arrested after setting fire outside Manhattan federal building housing ICE offices",
    "overview": "A US Army veteran was arrested Monday after pouring gasoline and igniting a fire outside 26 Federal Plaza in Lower Manhattan, which houses federal immigration offices, in what the FBI is investigating as an anti-government attack. Authorities said the suspect also set off a large firework and fired pellets from an airsoft rifle toward the building, and had wheeled a cart bearing an 'ICE Off Our Streets' sign. One civilian and two government employees suffered minor injuries before the blaze was extinguished.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c1m1rr90dzxo"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/20/us/new-york-federal-building-incendiary-device"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/anti-ice-veteran-manhattan-fire.png",
      "alt": "Police tape cordoning off the entrance to a federal government building",
      "credit": "Jacob K. Javits Federal Office Building, 26 Federal Plaza, Lower Manhattan. Photo by Ken Lund, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herostratus burns the Temple of Artemis at Ephesus (356 BC)",
        "excerpt": "As for the temple of Artemis, its first architect was Chersiphron; and then another man made it larger. But when it was set on fire by a certain Herostratus, the citizens erected another and better one, having collected the ornaments of the women and their own individual belongings, and having sold also the pillars of the former temple.",
        "source": "Strabo, Geography 14.1.22 (trans. H. L. Jones, Loeb Classical Library)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/14A*.html"
      },
      {
        "category": "historical",
        "title": "The Gunpowder Plot: the Monteagle Letter warns of a “terrible blow” (1605)",
        "excerpt": "for though there be no apparance of anni stir, yet I saye they shall receive a terrible blow this parliament and yet they shall not seie who hurts them this cowncel is not to be contemned because it may do yowe good and can do yowe no harme for the dangere is passed as soon as yowe have burnt the letter",
        "source": "Anonymous letter to Lord Monteagle, 26 October 1605 (The National Archives, SP 14/216/2)",
        "href": "https://en.wikisource.org/wiki/Monteagle_Letter"
      },
      {
        "category": "literary",
        "title": "The Secret Agent",
        "excerpt": "“Yes,” he continued, with a contemptuous smile, “the blowing up of the first meridian is bound to raise a howl of execration.”",
        "source": "Joseph Conrad, The Secret Agent (1907), ch. 2 — Mr Vladimir demands an attack on the Greenwich Observatory",
        "href": "https://www.gutenberg.org/cache/epub/974/pg974.txt"
      },
      {
        "category": "literary",
        "title": "Barnaby Rudge: A Tale of the Riots of ’Eighty",
        "excerpt": "they fired the pile with lighted matches and with blazing tow, and then stood by, awaiting the result. The furniture being very dry, and rendered more combustible by wax and oil, besides the arts they had used, took fire at once.",
        "source": "Charles Dickens, Barnaby Rudge (1841) — the mob burns Newgate Prison during the Gordon Riots",
        "href": "https://www.gutenberg.org/cache/epub/917/pg917.txt"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons, 16 October 1834",
        "excerpt": "Turner witnessed the fire that destroyed the Palace of Westminster on 16 October 1834 and returned to the subject in several works. In this version he renders the burning seat of British government as a towering wall of orange and yellow reflected across the Thames, the watching crowd reduced to dark silhouettes before the blaze.",
        "source": "J. M. W. Turner — Cleveland Museum of Art (accession no. 1942.647)",
        "href": "https://www.clevelandart.org/art/1942.647",
        "image": {
          "src": "/covers/anti-ice-veteran-manhattan-fire--a4.png",
          "alt": "J. M. W. Turner's depiction of the Houses of Parliament engulfed in flames at night, the fire reflected on the River Thames",
          "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 — Cleveland Museum of Art (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Gunpowder Plot Conspirators",
        "excerpt": "This engraving by the Dutch printmaker Crispijn de Passe the Elder is the only contemporary group portrait of the Gunpowder Plot conspirators, showing eight of the men — Guy Fawkes among them — who schemed to blow up the House of Lords in 1605. The Latin, French and German text beneath the figures recounts the conspiracy and the plotters' grisly fate, broadcasting their infamy to an international audience.",
        "source": "Crispijn de Passe the Elder, engraving, c.1605 — National Portrait Gallery, London (accession no. 334a)",
        "href": "https://artuk.org/discover/artworks/the-gunpowder-plot-conspirators-272715",
        "image": {
          "src": "/covers/anti-ice-veteran-manhattan-fire--a5.png",
          "alt": "Contemporary 1605 engraving showing eight Gunpowder Plot conspirators, including Guy Fawkes, grouped together in cloaks and hats",
          "credit": "Crispijn de Passe the Elder, The Gunpowder Plot Conspirators, c.1605 — National Portrait Gallery, London (public domain), via Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "pablo-rochat-phoebe-bridgers-video",
    "headline": "Pablo Rochat and Lance Oppenheim direct Phoebe Bridgers' medieval-themed 'Lost Boys' video shot in Atlanta",
    "overview": "Designer and animator Pablo Rochat co-directed, with filmmaker Lance Oppenheim, the new music video for Phoebe Bridgers' single 'Lost Boys,' turning suburban Atlanta into a surreal Renaissance faire where Bridgers appears as an elven queen among motorcycle-riding knights. The dreamlike visuals, intercut with vintage RuneScape game footage, were shot in Atlanta using a local crew and cast. 'Lost Boys' is the first single from Bridgers' album 'Lost Weekend,' due August 14, 2026.",
    "genre": "Culture",
    "sources": [
      {
        "name": "It's Nice That",
        "href": "https://www.itsnicethat.com/articles/pablo-rochat-lost-boys-film-animation-project-210726"
      },
      {
        "name": "Rolling Stone",
        "href": "https://www.rollingstone.com/music/music-news/phoebe-bridgers-lost-boys-new-song-1235582808/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/pablo-rochat-phoebe-bridgers-video.png",
      "alt": "Performers in medieval costume at a Renaissance faire",
      "credit": "Jousting at the Sterling Renaissance Festival, New York. U.S. Department of Transportation / U.S. National Archives (public domain), via Wikimedia Commons."
    },
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Windsor tilts and the founding of the Order of the Garter",
        "excerpt": "St. George's Day drew near, when the grand feast was to be celebrated at the castle of Windsor. The king had made great preparations for it; and there were earls, barons, ladies, and damsels most nobly entertained. The festivities and tilts lasted a fortnight. Many knights came to them from beyond sea, from Flanders, Hainault, and Brabant, but not one from France.",
        "source": "Jean Froissart, Chronicles (late 14th century), trans. Thomas Johnes, in The Boy's Froissart, ed. Sidney Lanier (1879)",
        "href": "https://www.gutenberg.org/cache/epub/61710/pg61710.txt",
        "image": {
          "src": "/covers/pablo-rochat-phoebe-bridgers-video--a0.png",
          "alt": "A medieval manuscript miniature of two armoured knights jousting on horseback with lances before a crowd",
          "credit": "Miniature of a joust from Froissart's Chronicles (Bruges, 1470-1475). British Library, Harley MS 4379, f.19v. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Eglinton Tournament of 1839",
        "excerpt": "In August 1839 Archibald Montgomerie, the 13th Earl of Eglinton, staged a full medieval tournament in the park of his Ayrshire castle, with knights in real armour jousting in the lists before tens of thousands of spectators, many of them in period costume. The pageant was the most spectacular expression of the Victorian romantic revival of chivalry, inspired by the novels of Sir Walter Scott. It is best remembered because torrential rain turned the day into a mudbath, forcing the knights and their heralds to shelter under umbrellas.",
        "source": "The Eglinton Tournament, contemporary account (John Richardson, published c. 1843)",
        "href": "https://archive.org/details/eglintontourname00rich",
        "image": {
          "src": "/covers/pablo-rochat-phoebe-bridgers-video--a1.png",
          "alt": "A 19th-century print of costumed knights fighting on horseback in the melee at the Eglinton Tournament",
          "credit": "James Henry Nixon, 'The Melee, Eglinton Tournament' (1839). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The oath of the Knights of the Round Table",
        "excerpt": "then the king stablished all his knights, and them that were of lands not rich he gave them lands, and charged them never to do outrageousity nor murder, and always to flee treason; also, by no means to be cruel, but to give mercy unto him that asketh mercy, upon pain of forfeiture of their worship and lordship of King Arthur for evermore; and always to do ladies, damosels, and gentlewomen succour, upon pain of death. … Unto this were all the knights sworn of the Table Round, both old and young. And every year were they sworn at the high feast of Pentecost.",
        "source": "Sir Thomas Malory, Le Morte d'Arthur (1485), Book III, ch. XV",
        "href": "https://www.gutenberg.org/files/1251/1251-h/1251-h.htm",
        "image": {
          "src": "/covers/pablo-rochat-phoebe-bridgers-video--a2.png",
          "alt": "Aubrey Beardsley ink drawing of the Lady of the Lake telling Arthur of the sword Excalibur",
          "credit": "Aubrey Beardsley, 'The Lady of the Lake telleth Arthur of the sword Excalibur' (1893-94), from J. M. Dent's Le Morte Darthur. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Redcrosse Knight rides for the Faerie Queene",
        "excerpt": "A Gentle Knight was pricking on the plaine,\nY cladd in mightie armes and siluer shielde,\nWherein old dints of deepe wounds did remaine,\nThe cruell markes of many'a bloudy fielde;\nYet armes till that time did he neuer wield:\nHis angry steede did chide his foming bitt,\nAs much disdayning to the curbe to yield:\nFull iolly knight he seemd, and faire did sitt,\nAs one for knightly giusts and fierce encounters fitt.",
        "source": "Edmund Spenser, The Faerie Queene (1590), Book I, Canto I, stanza 1",
        "href": "https://www.gutenberg.org/files/6930/6930.txt",
        "image": {
          "src": "/covers/pablo-rochat-phoebe-bridgers-video--a3.png",
          "alt": "Walter Crane painting of the female knight Britomart in armour, from Spenser's The Faerie Queene",
          "credit": "Walter Crane, 'Britomart' (1900), the lady-knight of Spenser's The Faerie Queene. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Accolade",
        "excerpt": "A queen in a shimmering white gown lays a sword upon the shoulder of a kneeling knight, dubbing him in a hushed medieval courtyard. Painted in 1901 by the English artist Edmund Blair Leighton, the picture distils the Victorian and Edwardian romance of chivalry into a single ceremonial gesture. It became one of the era's most reproduced images of knighthood and the idealised bond between a lady and her champion.",
        "source": "Edmund Blair Leighton, oil on canvas (1901)",
        "href": "https://commons.wikimedia.org/wiki/File:Accolade_by_Edmund_Blair_Leighton.jpg",
        "image": {
          "src": "/covers/pablo-rochat-phoebe-bridgers-video--a4.png",
          "alt": "Painting of a queen in a white gown knighting a kneeling armoured knight with a sword",
          "credit": "Edmund Blair Leighton, 'The Accolade' (1901). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Beguiling of Merlin",
        "excerpt": "The Pre-Raphaelite painter Edward Burne-Jones shows the enchantress Nimue casting a spell over the wizard Merlin, who lies helpless among blossoming hawthorn as she reads from a book of magic. Painted between 1872 and 1877, it is a defining image of the Pre-Raphaelite medieval revival, steeped in Arthurian legend. The work embodies the Victorian dream of an enchanted Middle Ages of sorcery, beauty and doom.",
        "source": "Edward Burne-Jones, oil on canvas (1872-1877), Lady Lever Art Gallery, Liverpool",
        "href": "https://commons.wikimedia.org/wiki/File:The_Beguiling_of_Merlin_by_Edward_Burne-Jones.jpg",
        "image": {
          "src": "/covers/pablo-rochat-phoebe-bridgers-video--a5.png",
          "alt": "Pre-Raphaelite painting of the enchantress Nimue casting a spell over Merlin amid flowering hawthorn",
          "credit": "Edward Burne-Jones, 'The Beguiling of Merlin' (1872-1877), Lady Lever Art Gallery. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "andy-burnham-becomes-uk-prime-minister",
    "headline": "Andy Burnham becomes UK prime minister after Starmer resigns, pledging to 'rewire Britain'",
    "overview": "Andy Burnham, the 56-year-old mayor of Greater Manchester known as the 'King of the North,' became Britain's prime minister on Monday after Keir Starmer tendered his resignation to King Charles III and Burnham was asked to form a government. Burnham is the country's seventh prime minister in a decade and pledged to 'rewire Britain' around the cost of living and failing public services, floating stronger public control of utilities such as Thames Water. His immediate task is naming a cabinet and, above all, a finance minister.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxNTE9VQlQ2S2NibFRmdVNMTC1ISHlWLUt2YTl3T3FxOW9yZnRla2lOSm9pUFVMU2poWDFfOGZFcVVEa0ZfbHRDeXIzakRUaGxTYTlZOE1LUF9WRkFXOGFYWHR6V2VVU3Z6TG1BOVFYRnAwTlVEQ1F3Sm0wWmpTM2FlTU0tdWthMWlNWWFzZHg0UlM2TlVuY0hMR25BS1h5R3c?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxObmpFTnBJcVJSbTdmSFR6SXIyOU9saWNFLWJ5QW1uS2QzanBfU3hyREhOdHJGTGI2VTlqeHJXTXA5NjZ5OEJyQ0k0bmliV0lsMTZfQXZWOGpmR244SUFCX3hRMjFFVFlCNV9feWNBMXd1NDFMRE9ZNkZrTTVMcWZZT3h4RHFxZzlZc3B6UlZsLUdndGdUUW93Rk1MdGY5MlJYamc2ZWdvaE4?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-20",
    "image": {
      "src": "/covers/andy-burnham-becomes-uk-prime-minister.png",
      "alt": "Andy Burnham speaking at a podium at the 2016 Labour Party Conference in Liverpool.",
      "credit": "Rwendland, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Morning Edition · 20 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 20 November 284, after the sudden death of the emperor Numerian, the assembled Roman army at Nicomedia raised on its shields a low-born cavalry commander named Diocles and hailed him Augustus. Born around 244 near Salona in the province of Dalmatia, the son of former slaves, he Latinised his name to Diocletian and inherited an empire that had cycled through some fifty emperors and usurpers in half a century of civil war, plague and invasion. Rather than merely rule, he rebuilt the machinery of the state: he split the empire and created the Tetrarchy of four rulers in 293, more than doubled the number of provinces, overhauled the coinage and taxation, and in 301 issued the sweeping Edict on Maximum Prices. Just as Diocletian, a provincial outsider of humble birth, seized supreme office and set about re-engineering a state exhausted by decades of turmoil, Andy Burnham takes power promising to 'rewire Britain.'",
        "excerpt": "As the reign of Diocletian was more illustrious than that of any of his predecessors, so was his birth more abject and obscure. The parents of Diocletian had been slaves in the house of Anulinus, a Roman senator; nor was he himself distinguished by any other name than that which he derived from a small town in Dalmatia, from whence his mother deduced her origin.",
        "source": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire, Vol. I, Chapter XIII (1776), via Christian Classics Ethereal Library",
        "href": "https://www.ccel.org/g/gibbon/decline/volume1/chap13.htm",
        "image": {
          "src": "/covers/andy-burnham-becomes-uk-prime-minister--a0.png",
          "alt": "Marble bust of the Roman emperor Diocletian, late 3rd century AD.",
          "credit": "Bust of Diocletian from Nikomedia (Izmit), late 3rd century AD, Istanbul Archaeological Museums, CC BY-SA, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On 4 March 1829, Andrew Jackson stood on the East Portico of the Capitol as the seventh president of the United States, the first born in a frontier cabin and the first from west of the Appalachians. Orphaned as a boy in the Carolina backcountry and self-made as a soldier and lawyer in Tennessee, 'Old Hickory' had been swept into office on a wave of popular anger at a distant Washington establishment. So many rough supporters mobbed the White House reception afterward that a horrified onlooker spoke of 'the reign of King Mob.' In his inaugural address Jackson pledged himself squarely to 'the task of reform,' vowing to cleanse a government he cast as captured by insiders. Just as Jackson, the provincial outsider borne to power by public discontent, made reform his opening promise, Andy Burnham enters Downing Street vowing to fix a decade of failing public services.",
        "excerpt": "The recent demonstration of public sentiment inscribes on the list of Executive duties, in characters too legible to be overlooked, the task of reform, which will require particularly the correction of those abuses that have brought the patronage of the Federal Government into conflict with the freedom of elections, and the counteraction of those causes which have disturbed the rightful course of appointment and have placed or continued power in unfaithful or incompetent hands.",
        "source": "Andrew Jackson, First Inaugural Address, 4 March 1829, via The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/19th_century/jackson1.asp",
        "image": {
          "src": "/covers/andy-burnham-becomes-uk-prime-minister--a1.png",
          "alt": "Painted portrait of President Andrew Jackson in a black coat.",
          "credit": "Ralph E. W. Earl, Andrew Jackson, c. 1835. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In the Hebrew scriptures, the prophet Samuel is sent by God to Bethlehem to anoint a new king over Israel in secret, while Saul still reigns. Jesse parades seven older sons before him, each seemingly kingly, yet none is chosen; the Lord tells Samuel that man looks on the outward appearance, but the Lord looks on the heart. Only when the youngest, David, a ruddy shepherd boy left tending the flock in the fields, is summoned does Samuel pour out the horn of oil and anoint him in the midst of his brethren. The least regarded of the household is raised over them all, and in time becomes Israel's greatest king. Just as the overlooked provincial youth is unexpectedly lifted above his elders to the throne, Andy Burnham, long passed over in Westminster and dubbed the 'King of the North,' ascends at last to Britain's highest office.",
        "excerpt": "And Samuel said unto Jesse, Are here all thy children? And he said, There remaineth yet the youngest, and, behold, he keepeth the sheep. And Samuel said unto Jesse, Send and fetch him: for we will not sit down till he come hither.\nAnd he sent, and brought him in. Now he was ruddy, and withal of a beautiful countenance, and goodly to look to. And the LORD said, Arise, anoint him: for this is he.\nThen Samuel took the horn of oil, and anointed him in the midst of his brethren: and the Spirit of the LORD came upon David from that day forward.",
        "source": "The Holy Bible, King James Version (1611), 1 Samuel 16:11-13, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel",
        "image": {
          "src": "/covers/andy-burnham-becomes-uk-prime-minister--a2.png",
          "alt": "Ancient wall painting of the prophet Samuel anointing David among his brothers.",
          "credit": "Samuel anointing David, wall painting from the Dura-Europos synagogue, c. 245 CE, National Museum of Damascus. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In 'The Passing of Arthur,' the final book of Tennyson's 'Idylls of the King,' the mortally wounded King Arthur is borne away on a dark barge as his kingdom of Camelot dissolves into ruin around him. His last knight, Sir Bedivere, despairs that the fellowship of the Round Table is broken and that an age is ending. From the departing vessel Arthur answers with consolation rather than lament, insisting that endings make way for beginnings and that no single custom, however good, should be allowed to ossify and corrupt the world. The line 'The old order changeth, yielding place to new' became Victorian England's byword for orderly, providential renewal. Just as Tennyson frames the fall of one reign as the necessary prelude to another, Britain watches one prime minister depart and Andy Burnham take up the helm pledging national renewal.",
        "excerpt": "And slowly answered Arthur from the barge:\n'The old order changeth, yielding place to new,\nAnd God fulfils himself in many ways,\nLest one good custom should corrupt the world.\nComfort thyself: what comfort is in me?\nI have lived my life, and that which I have done\nMay He within himself make pure!'",
        "source": "Alfred, Lord Tennyson, 'The Passing of Arthur,' Idylls of the King (1869), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Idylls_of_the_King/The_Passing_of_Arthur",
        "image": {
          "src": "/covers/andy-burnham-becomes-uk-prime-minister--a3.png",
          "alt": "Photographic portrait of the poet Alfred, Lord Tennyson.",
          "credit": "Julia Margaret Cameron, Alfred, Lord Tennyson, 1869. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "When George Frideric Handel was commissioned to write music for the coronation of King George II at Westminster Abbey on 11 October 1727, he chose for the first anthem the ancient words describing the anointing of Solomon. 'Zadok the Priest' (HWV 258) opens with a long, quietly gathering string figure that swells for some twenty-three bars before the choir erupts in a blaze of D major, drums and trumpets on the word 'Zadok.' The text, drawn from the First Book of Kings, has accompanied the sacred moment of the sovereign's anointing at every British coronation since, most recently for King Charles III in May 2023. Just as Handel's anthem enshrines in music the solemn passing of authority to a new sovereign, Britain marks its own transfer of power as Keir Starmer resigns to King Charles III and Andy Burnham is asked to form a government.",
        "excerpt": "Zadok the priest and Nathan the prophet anointed Solomon king. And all the people rejoiced and said: God save the King! Long live the King! God save the King! May the King live for ever. Amen. Hallelujah.",
        "source": "George Frideric Handel, 'Zadok the Priest' (Coronation Anthem No. 1, HWV 258), 1727; text adapted from 1 Kings 1; via IMSLP",
        "href": "https://imslp.org/wiki/Zadok_the_Priest,_HWV_258_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/andy-burnham-becomes-uk-prime-minister--a4.png",
          "alt": "Painted portrait of the composer George Frideric Handel.",
          "credit": "Thomas Hudson, George Frideric Handel, 1756. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Eugene Delacroix's 'Liberty Leading the People' (1830), a vast canvas some 2.6 metres high now in the Louvre, commemorates the July Revolution of that year, the 'Three Glorious Days' of 27-29 July when Parisians rose against King Charles X and toppled the Bourbon monarchy. At its centre a bare-breasted allegorical figure of Liberty, the tricolour flag in one hand and a musket in the other, strides over the barricades and the fallen, leading a ragged coalition, a top-hatted bourgeois, a street urchin brandishing pistols, a worker in shirtsleeves, toward a new order. It became the enduring emblem of a people demanding change and renewal from a discredited regime. Just as Delacroix captured a nation impatient to sweep away an exhausted government, Andy Burnham inherits a Britain restless with discontent over the cost of living and failing public services, and hungry for renewal.",
        "excerpt": "Delacroix builds the composition as a rising pyramid of bodies, the living surging upward over the dead sprawled in the foreground. Liberty herself, part goddess and part woman of the streets, turns her head back to summon the crowd forward through drifting gunsmoke, the towers of Notre-Dame just visible in the haze. The tricolour at the apex blazes red, white and blue against a smoke-darkened Paris sky, a single note of hope over the wreckage.",
        "source": "Eugene Delacroix, La Liberte guidant le peuple (Liberty Leading the People), 1830, oil on canvas, Musee du Louvre (RF 129), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/andy-burnham-becomes-uk-prime-minister--a5.png",
          "alt": "Painting of Liberty as a woman holding the French tricolour and a musket, leading revolutionaries over a barricade.",
          "credit": "Eugene Delacroix, Liberty Leading the People, 1830, Musee du Louvre. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "iran-hormuz-tankers-explode-ninth-day",
    "headline": "Iran says two oil tankers explode in the Strait of Hormuz as U.S. strikes on Iran enter a ninth day",
    "overview": "Iran said two oil tankers in the Strait of Hormuz exploded and were immobilized as U.S. airstrikes against Iran entered their ninth day, and a Dynacom-managed vessel caught fire near Oman after being hit by a projectile. The waterway carries roughly a fifth of the world's oil, and the blasts sharpened fears of disruption to global crude shipments. Tehran said it would retaliate against Gulf states hosting U.S. forces.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPbmtOemhMR1UtaVNoMENBMHltNEpKTWJNekRXUEtSa3hidndTM0VZVnRoTEJlV2ZENWtkYVFCUkJtSk8zdFhPeEJQSXRNMS1vWC03N2NJek14WklXdzhNZWkzMnZRUFpGcHg2OXotaHpyVW9jblFTYUM4U2lGcXFWa1NFbnZSQnpreVF6OXVhMW1oeHdIdkFNMjBJa09UZGgycjRkMjZ6Z1dxNC10enJIVDZJdlVSQjRxQlBZc05Tdw?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQajNHTE9aUmxpa2RIMy1jNjZ4RmgzZlk2OXE3ZXBtRzdxaUpnQldzeUtxaHh6Z3VTQzZMUGNtZ1oxNE5lQzZwLVhnX3BTZWk1OVBVT1ZiNFFtMnoyRDhHbFBnV0pFdTdNcnBKdWVuT0RidVJoWXFCYkdlNDE2V1hmZ1VhUlZhLXExZTZjOHo1YmRYMm5ra1U4RE9DU29CMVU?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-20",
    "image": {
      "src": "/covers/iran-hormuz-tankers-explode-ninth-day.png",
      "alt": "An oil tanker ablaze and pouring black smoke in the waters near the Strait of Hormuz after being attacked.",
      "credit": "Tasnim News Agency, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 20 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 405 BC the Spartan admiral Lysander led his fleet up to the Hellespont, the narrow strait through which the grain ships passed from the Black Sea to feed Athens. For four days he refused battle at Aegospotami; on the fifth, as the Athenian crews beached their vessels and scattered ashore to forage, he swept across the channel and seized all but nine of some one hundred and eighty ships without a fight. Athens' lifeline was cut. Lysander then funnelled every captured Athenian back toward the city, knowing the swollen population would starve the faster. When the state galley Paralus brought the news, a wail ran up the long walls from Piraeus and no man slept. Within months the blockaded city surrendered, ending the Peloponnesian War. Just as Lysander throttled Athens by seizing the strait its grain had to cross, the blasts in the Strait of Hormuz menace the narrow channel through which a fifth of the world's oil must pass.",
        "excerpt": "It was night when the \"Paralus\" reached Athens with her evil tidings, on receipt of which a bitter wail of woe broke forth. From Piraeus, following the line of the long walls up to the heart of the city, it swept and swelled, as each man to his neighbour passed on the news. On that night no man slept.",
        "source": "Xenophon, Hellenica, Book II, trans. H. G. Dakyns, Project Gutenberg eBook #1174.",
        "href": "https://www.gutenberg.org/files/1174/1174-h/1174-h.htm",
        "image": {
          "src": "/covers/iran-hormuz-tankers-explode-ninth-day--a0.png",
          "alt": "Ancient marble bust identified as the historian Xenophon.",
          "credit": "Ancient bust identified as Xenophon, Aphrodisias Museum, Turkey. Public domain (CC0), via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "For most of the 1980s the same waters ran with fire. During the Iran-Iraq War both belligerents turned on the merchant fleets of the Gulf: from 1981 to 1988 more than four hundred ships were attacked, Iraq striking tankers loading at Iran's Kharg Island terminal and Iran retaliating against Kuwaiti and neutral vessels near the Strait of Hormuz. In May 1987 an Iraqi jet's Exocet missiles killed thirty-seven sailors aboard the USS Stark. After the frigate USS Samuel B. Roberts struck an Iranian mine, the United States launched Operation Praying Mantis on 18 April 1988, sinking or crippling much of Iran's navy, including the frigate Sahand, left ablaze from bow to stern. Just as the Tanker War once set Gulf shipping alight and drew American warships into open battle with Iran, the explosions now reported in the Strait of Hormuz, as U.S. strikes on Iran enter a ninth day, revive that same peril to the world's oil traffic.",
        "excerpt": "By the war's end, burning hulks and salvage tugs had become common sights along the shipping lanes, and marine insurers spoke of the Gulf as the most dangerous stretch of water on earth. Reflagged tankers steamed in armed convoys past minefields and speedboat swarms, shepherded by U.S. cruisers and destroyers. For eight years the Strait of Hormuz was a gauntlet through which the world's oil ran under fire.",
        "source": "The \"Tanker War\" of the Iran-Iraq War, 1981-1988, and the U.S. Navy's Operation Praying Mantis, 18 April 1988.",
        "href": "https://en.wikipedia.org/wiki/Tanker_war",
        "image": {
          "src": "/covers/iran-hormuz-tankers-explode-ninth-day--a1.png",
          "alt": "The Iranian frigate Sahand burning from bow to stern after being struck by U.S. forces during Operation Praying Mantis, April 1988.",
          "credit": "U.S. Navy photograph of the Iranian frigate Sahand ablaze during Operation Praying Mantis, 18 April 1988. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book XII of Homer's Odyssey, the enchantress Circe warns Odysseus that his homeward course must thread a strait so narrow that two deaths guard its opposite shores: the six-headed monster Scylla, lodged in a cliff, and the whirlpool Charybdis, which three times a day sucks the sea down to its black sand and belches it back. There is no clean passage, only the lesser loss. Odysseus steers close to Scylla's rock, and she plucks his six best men from the deck, snatching them up screaming as a fisherman lifts small fish on his line. It is, he says, the most sickening sight of all his voyages. The narrow water exacts its toll from any ship that dares it. Just as Odysseus could not cross the strait without paying it in blood, the tankers of Hormuz now run a channel where passage and peril are inseparable.",
        "excerpt": "Then we entered the Straits in great fear of mind, for on the one hand was Scylla, and on the other dread Charybdis kept sucking up the salt water. As she vomited it up, it was like the water in a cauldron when it is boiling over upon a great fire, and the spray reached the top of the rocks on either side.",
        "source": "Homer, The Odyssey, Book XII, trans. Samuel Butler (1900), Project Gutenberg eBook #1727.",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm",
        "image": {
          "src": "/covers/iran-hormuz-tankers-explode-ninth-day--a2.png",
          "alt": "Henry Fuseli's painting of Odysseus at the oars between the monster Scylla and the whirlpool Charybdis.",
          "credit": "Henry Fuseli (Johann Heinrich Fussli), 'Odysseus in front of Scylla and Charybdis,' 1794-96, Aargauer Kunsthaus. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The prophet Ezekiel, writing among the Babylonian exiles in the sixth century BC, composed a funeral dirge for Tyre, the Phoenician island-city that was the great maritime emporium of the ancient world. He pictures her as a magnificent merchant ship, planked with fir, masted with cedar of Lebanon, her decks heaped with silver, iron, tin, ivory, wine and fine linen traded from every coast. Then the vision turns: her oarsmen row her out into deep water, the east wind breaks her far from land, and her wares, her mariners, her pilots and all her men of war sink together into the heart of the sea. The merchants of the nations hiss at the ruin of a city that had seemed unassailable. Just as Ezekiel saw the world's richest trading fleet swallowed in the midst of the seas, the burning tankers of Hormuz cast the wealth of global commerce into peril upon the water.",
        "excerpt": "Thy rowers have brought thee into great waters: the east wind hath broken thee in the midst of the seas.\nThy riches, and thy fairs, thy merchandise, thy mariners, and thy pilots, thy calkers, and the occupiers of thy merchandise, and all thy men of war, that are in thee, and in all thy company which is in the midst of thee, shall fall into the midst of the seas in the day of thy ruin.",
        "source": "The Holy Bible, King James Version, Ezekiel 27:26-27, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ezekiel",
        "image": {
          "src": "/covers/iran-hormuz-tankers-explode-ninth-day--a3.png",
          "alt": "Michelangelo's fresco of the prophet Ezekiel on the Sistine Chapel ceiling.",
          "credit": "Michelangelo Buonarroti, 'The Prophet Ezekiel,' 1510, Sistine Chapel ceiling, Vatican. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "On the night of 1 August 1798, at the Battle of the Nile in Aboukir Bay, Nelson's fleet trapped and destroyed the French squadron guarding Napoleon's Egyptian expedition. At around ten o'clock the French flagship L'Orient, a 118-gun ship of the line, caught fire and her magazine blew up, killing her admiral and most of a crew of more than a thousand. The French-born British painter Philip James de Loutherbourg fixed that instant in his 1800 canvas, now in Tate Britain: masts and bodies flung against a black sky, the sea lit blood-orange by the blast, tiny rescue boats dwarfed beneath the fireball. The explosion decided command of the eastern Mediterranean and stranded Bonaparte's army in Egypt. Just as de Loutherbourg's picture froze the moment a warship became a fireball on a contested sea, the tankers reported exploding in the Strait of Hormuz turn ships into infernos astride a vital trade route.",
        "excerpt": "De Loutherbourg builds the whole picture around a single flash of light. The exploding L'Orient hurls timbers, guns and men into a smoke-blackened sky, while the surrounding warships and the little rescue boats are thrown into silhouette against the glare. Water and gunsmoke glow with the same murderous orange, until the sea itself seems to be on fire.",
        "source": "Philip James de Loutherbourg, 'The Battle of the Nile,' 1800, oil on canvas, Tate Britain (T01452).",
        "href": "https://www.tate.org.uk/art/artworks/de-loutherbourg-the-battle-of-the-nile-t01452",
        "image": {
          "src": "/covers/iran-hormuz-tankers-explode-ninth-day--a4.png",
          "alt": "Philip James de Loutherbourg's painting of the French flagship L'Orient exploding at the Battle of the Nile.",
          "credit": "Philip James de Loutherbourg, 'The Battle of the Nile,' 1800, Tate Britain. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Nikolai Rimsky-Korsakov, a former naval officer, poured his love of the sea into Scheherazade (1888), the symphonic suite drawn from the Arabian Nights. Its surging swells and the solo violin of the storyteller carry the listener through tales of Sinbad's voyages and Eastern seafaring. In the finale the music returns to the open water amid a festival at Baghdad, then builds to a shattering climax as Sinbad's ship is driven onto a rock crowned by a bronze warrior and smashed to pieces, the full orchestra crashing down in waves before the sea at last grows calm. The great brass surges and pounding percussion depict a vessel broken upon the water. Just as Rimsky-Korsakov's finale drives a merchant's ship to its destruction on the rocks, the explosions in the Strait of Hormuz wreck vessels on the very sea lane that sustains the world's trade.",
        "excerpt": "The finale gathers up the suite's earlier themes in a whirling festival before turning back to the open sea. Brass and percussion mount to a violent climax as the ship is hurled against the cliff and breaks apart, the whole orchestra crashing in waves. Then the storm subsides and the solo violin of Scheherazade rises alone over quiet strings, the storyteller surviving where the ship did not.",
        "source": "Nikolai Rimsky-Korsakov, Scheherazade, Op. 35 (1888), fourth movement ('The Sea and Sinbad's Ship'); full score via IMSLP.",
        "href": "https://imslp.org/wiki/Scheherazade,_Op.35_(Rimsky-Korsakov,_Nikolay)",
        "image": {
          "src": "/covers/iran-hormuz-tankers-explode-ninth-day--a5.png",
          "alt": "Ilya Repin's 1893 portrait of the composer Nikolai Rimsky-Korsakov.",
          "credit": "Ilya Repin, 'Portrait of the Composer Nikolai Rimsky-Korsakov,' 1893. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "south-korea-kospi-drops-ai-margin-loans",
    "headline": "South Korea's Kospi falls 4.5% as AI stocks slide and oil climbs, exposing margin-loan risks",
    "overview": "South Korea's benchmark Kospi index dropped 4.5% as some AI-related shares slumped and oil prices kept climbing amid the U.S.-Iran conflict. The sell-off spotlighted the dangers of a boom in retail margin lending, with heavily leveraged small investors forced to sell into the decline. It was one of the sharpest single-day falls for the index in months.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxORW43YVlhU1dNU0ZSTVNQc2tJRGpwLTNlY3FCcExTWDhOSWJ2ZC0tci10V0pYeUpMNTk5OFpReGVia2wzaHRqS09CNk56MkJzN3N2Nkk4UlNNVlFoamhFS0NrT3JjODhSRG9lSmdHRG5wald0UUtlTHpZRGlnWHJ6ZWthWnlKRkdTX0t3US1EejB1Rzg?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOVUJEdTQybDFaUnQ0Nk1QdnROR0YtbG5iVWZ2WEwxNEZ1M1ZSOWdYRFhyNExDdW5oU3NEQmkzVWY2dmVFY2F2aGEta2JLSm90WEdNVDBrd3JyNktDZVdfYUxyRnEyM21GaEpMOGl3LXhvejFtSnc3am5Ic1hzVlUzY0dwTzZkbVVrMTBxcmpMcTZwUGZJekZBWGRvaWZrRW5Na2NycE5YQ0FPeGpTSnNBX3JNbFVTTlhlYUdoY1VHc2tOMUJaTjFxbGFsa2NKdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-20",
    "image": {
      "src": "/covers/south-korea-kospi-drops-ai-margin-loans.png",
      "alt": "The Korea Exchange building in Busan, South Korea, operator of the Kospi stock market.",
      "credit": "Photo by Hyolee2, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 20 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In A.D. 33, the Roman world convulsed in what may be antiquity's clearest financial panic. Under Tiberius, prosecutors revived old usury statutes, notably a Caesarian law requiring creditors to hold much of their capital in Italian land. The Senate granted eighteen months to comply, but frightened lenders instead called in their loans all at once. Debtors, unable to pay, were forced to sell property into a falling market; coin vanished into hoards and the treasury; interest rates spiked and land prices collapsed. Tacitus records suicides among the ruined elite before Tiberius calmed the crisis by lending 100 million sesterces, interest-free, against real estate. Just as leveraged Roman debtors were forced to dump land into a plunging market, South Korea's over-borrowed retail investors were compelled to sell their shares into the Kospi's 4.5 percent slide, deepening the very fall that ruined them.",
        "excerpt": "Hence followed a scarcity of money, a great shock being given to all credit, the current coin too, in consequence of the conviction of so many persons and the sale of their property, being locked up in the imperial treasury or the public exchequer.",
        "source": "Tacitus, The Annals, Book VI, ch. 17, translated by Alfred John Church and William Jackson Brodribb, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_6",
        "image": {
          "src": "/covers/south-korea-kospi-drops-ai-margin-loans--a0.png",
          "alt": "Drawing of the Roman historian Cornelius Tacitus, based on an antique bust.",
          "credit": "Drawing of Cornelius Tacitus by an unknown illustrator, based on an antique bust, from The Book of History (Grolier Society, 1920). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Wall Street Crash of 1929 was, above all, a catastrophe of borrowed money. Through the boom of the 1920s, ordinary Americans bought shares \"on margin,\" putting down as little as ten percent and borrowing the rest against the stock itself. When the market broke on Black Thursday, October 24, and again on Black Tuesday, October 29, roughly sixteen million shares changed hands as prices cascaded. Brokers issued margin calls that leveraged investors could not meet, forcing them to sell at any price and driving the Dow relentlessly downward—from a September peak of 381 toward an eventual 1932 low near 41. Solemn crowds gathered outside the New York Stock Exchange. Just as the 1929 margin-buyers were liquidated by calls they could not answer, South Korea's boom in retail margin lending turned small, heavily leveraged investors into forced sellers the moment AI shares slumped and oil climbed.",
        "excerpt": "The crash of 1929 was magnified by the pyramid of margin debt built through the decade: investors had bought stock with borrowed money, so that a falling market triggered brokers' demands for repayment, and those demands forced still more selling into an already collapsing exchange. What began as a speculative mania in a handful of glamour stocks ended as a mechanical avalanche of liquidation that no single seller could stop.",
        "source": "Federal Reserve History, \"Stock Market Crash of 1929\" (Federal Reserve Bank).",
        "href": "https://www.federalreservehistory.org/essays/stock-market-crash-of-1929",
        "image": {
          "src": "/covers/south-korea-kospi-drops-ai-margin-loans--a1.png",
          "alt": "A large crowd gathered on the street outside the New York Stock Exchange after the crash of 1929.",
          "credit": "Crowd outside the New York Stock Exchange, October 1929. U.S. Government photograph, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Charles Mackay's Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841) remains the classic anatomy of financial mania. In its opening chapters he dissects the South Sea Bubble of 1720, when the South Sea Company promised to pay down the national debt and its stock rocketed from about £128 to nearly £1,000 within months. Peers, servants, and clergymen alike scrambled to subscribe; hundreds of absurd \"bubble\" companies sprang up beside it, one proposing an undertaking \"of great advantage, but nobody to know what it is.\" Then the whole edifice collapsed, ruining thousands and disgracing ministers. Mackay's enduring insight is that greed spreads by contagion and unwinds in fear. Just as his crowds went mad together chasing paper riches and were beggared together when the bubble burst, South Korea's retail investors piled into leveraged AI bets in unison—and were caught, together, in the rush to sell.",
        "excerpt": "Men, it has been well said, think in herds; it will be seen that they go mad in herds, while they only recover their senses slowly, and one by one.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841; second edition 1852), via Project Gutenberg (eBook #24518).",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm",
        "image": {
          "src": "/covers/south-korea-kospi-drops-ai-margin-loans--a2.png",
          "alt": "Portrait photograph of the author Charles Mackay by Herbert Watkins.",
          "credit": "Charles Mackay, photograph by Herbert Watkins, c. 1860. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Émile Zola's novel Money (L'Argent, 1891) is a portrait of a stock-market bubble and its human wreckage. Its schemer, Aristide Saccard, floats the Universal Bank on visions of Middle-Eastern riches, and its shares climb from 500 francs to a delirious 3,000 as clerks, widows, and priests mortgage everything to buy in. Zola shows the trading floor of the Paris Bourse as a temple of gambling fever, the crowd intoxicated by rising prices—until the pyramid cracks, the bank fails, and small investors are stripped of their savings while Saccard faces arrest. It is speculation shown as a fire that consumes those who feed it. Just as Zola's little shareholders were lured by soaring quotations into borrowing beyond their means and then ruined in the collapse, South Korea's leveraged retail investors chased an AI boom on credit and were left exposed when the Kospi broke.",
        "excerpt": "Swindling financial concerns were already springing up like mushrooms; great companies, by the example they set, were urging people into risky speculative ventures; an intense gambling fever was breaking out amidst the uproarious prosperity of the reign, amidst all the dazzling whirl of pleasure and luxury.",
        "source": "Émile Zola, Money (L'Argent), 1891, translated by Ernest A. Vizetelly, via Project Gutenberg (eBook #56987).",
        "href": "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm",
        "image": {
          "src": "/covers/south-korea-kospi-drops-ai-margin-loans--a3.png",
          "alt": "Portrait photograph of the novelist Émile Zola by Nadar.",
          "credit": "Émile Zola, photograph by Nadar. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "William Hogarth's engraving The South Sea Scheme (1721) is often called the first English editorial cartoon, a savage response to the bubble that had just ruined thousands. At its center a demonic figure hacks flesh from the goddess Fortune and flings it to a scrambling mob; nearby, a great merry-go-round whirls speculators of every rank—lord and prostitute, clergyman and bootblack—round and round in the giddy circle of the market. Honesty is broken on the wheel while Villainy scourges Honour; Trade lies dying and neglected in a corner; and a mock monument records the City \"destroy'd by the South Sea in 1720.\" The whole print is a moral diagram of greed, credulity, and collapse. Just as Hogarth froze a whole society spinning heedlessly on the carousel of easy money until it threw them off, South Korea's margin-fueled crowd rode the AI boom upward before the sudden lurch flung the over-leveraged to the ground.",
        "excerpt": "Hogarth crowds his emblematic print with allegory: Fortune butchered and her flesh scattered to a greedy throng, a giddy merry-go-round of speculators of every station, Honesty broken on the wheel, and Trade left dying in a corner. It is a visual sermon on a nation that gambled its savings on a single glittering scheme and was maimed when the scheme collapsed.",
        "source": "William Hogarth, Emblematical Print on the South Sea Scheme (The South Sea Scheme), 1721, engraving; file page via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/south-korea-kospi-drops-ai-margin-loans--a4.png",
          "alt": "Hogarth's satirical engraving of the South Sea Bubble, showing a crowd around a merry-go-round and figures of Fortune, Honesty and Villainy.",
          "credit": "William Hogarth, The South Sea Scheme, 1721, engraving. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner's music-drama Das Rheingold (first performed in Munich in 1869), the prologue to his Ring cycle, opens with a theft that dooms an entire world. The dwarf Alberich renounces love to seize the Rhinemaidens' gold and forge it into a ring that grants mastery over all things. When the god Wotan wrests the ring from him, Alberich lays a curse upon it: whoever holds it will be gnawed by anxiety, and whoever lacks it consumed by envy, so that the gold breeds only murder and ruin as it passes from hand to hand. That curse works itself out across four operas until, in Twilight of the Gods, greed brings down Valhalla itself. Just as Wagner's cursed gold destroys everyone seduced by its promise of effortless power, the seductive, leveraged bet on AI riches turned toxic for South Korea's small investors the instant the Kospi tumbled.",
        "excerpt": "Wagner's score gives greed a sound: Alberich's renunciation of love, the sinister descent of the Nibelung motif hammered out on nineteen anvils, and the somber curse that shadows the ring from that moment on. The gleaming Rhinegold theme returns transformed, darkened, a musical warning that the pursuit of limitless wealth carries its own destruction within it.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (Vorabend of Der Ring des Nibelungen), first performed 1869; score via IMSLP.",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/south-korea-kospi-drops-ai-margin-loans--a5.png",
          "alt": "Photographic portrait of the composer Richard Wagner.",
          "credit": "Richard Wagner, photograph by Franz Hanfstaengl, c. 1871. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "ukraine-drones-strike-moscow-region",
    "headline": "Ukrainian drones strike the Moscow region, wounding at least 10 as Kyiv launches about 400 drones",
    "overview": "Ukraine launched roughly 400 drones toward Moscow, and at least 10 people were wounded as the attack struck the Russian capital's region, officials said. The barrage was one of the largest aimed at Moscow and forced temporary closures at the city's airports. It came as President Volodymyr Zelenskyy also faced protests at home.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi2gFBVV95cUxNTG5JRFJTbDhZWlVxTVBoMFVnNVJsdkUtRjY0Yy04TUpNb3pMa2JmbzZMdFNPeGdDU3JvM2FhcVpHakNPZ1AtdUYyU2puTUtqQWpoNUlFbzI3MmNNTkpPS3pVdllaQmlRbXFfQmtQWkFnRUplaWREOUVTYXNhVHpvZmJnekItWUtzSVltQXVCQTloaDBWNWpqbXdJVmk1cGx3S05BTFRPODhfVU1GWUdLNXRnbzhyUkRaUXptakpmYmQ4QTM1SmYtOHc1SEtySEdPZ09ya0ZET1BDUQ?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxOSnM5TW1ZWS1VbC1iWXBVbmRfOVd2UENvWllLeTlpMGJ1NzByRkQ1a291WDNxaXJIb1NZUkhqdWJFOG5xcXFkYmpwaHFDdGdVVXFzc3V1a1MzaDdqeWVIaDVIQmZoYTdnSlRVdU80X1N2RHlmTFpoaEpzNmhsR2ZWVEhUaEZyUDYyZkZLNWx3THRxYkI5Zy1TZ21ZSkVzMnNlN2MzbnE4QQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-20",
    "image": {
      "src": "/covers/ukraine-drones-strike-moscow-region.png",
      "alt": "A Ukrainian UKRJET UJ-22 Airborne long-range strike drone on display at a defence exhibition in Kyiv.",
      "credit": "VoidWanderer, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 20 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 211 BC, at the height of the Second Punic War, Hannibal Barca broke off from southern Italy and marched his Carthaginian army north until he pitched camp on the river Anio, barely three miles from Rome. He rode up to the Colline Gate itself, and the cry 'Hannibal ad portas' — Hannibal is at the gates — passed into Latin as a byword for looming catastrophe. Yet the Senate refused to recall the legions besieging Capua, and, Livy records, the very ground on which the invader was encamped was auctioned in the Forum at no discount. Storms scattered his assaults, and the greatest general of the age withdrew, having come closer to Rome than he ever would again. Just as Hannibal carried the war to the walls of his enemy's capital, Ukraine's roughly 400 drones brought the fighting to the Moscow region, striking at the heartland of the power that invaded it.",
        "excerpt": "The other incident, which he learnt from a prisoner, was the sale by auction of the spot on which he had fixed his camp, and the fact that, in spite of his occupation of it, there was no abatement in the price. That any one should have been found in Rome to buy the ground which he was holding in possession as spoil of war, seemed to Hannibal such an insulting piece of arrogance that he instantly summoned a crier and made him give notice of the sale of the silversmiths' shops round the Forum of Rome.",
        "source": "Livy, The History of Rome (Ab Urbe Condita), Book 26, ch. 11, trans. Rev. Canon Roberts; via Wikisource.",
        "href": "https://en.wikisource.org/wiki/From_the_Founding_of_the_City/Book_26",
        "image": {
          "src": "/covers/ukraine-drones-strike-moscow-region--a0.png",
          "alt": "Marble bust traditionally identified as Hannibal Barca, found near ancient Capua.",
          "credit": "So-called bust of Hannibal, from Capua; photograph, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On 18 April 1942, four months after Pearl Harbor, sixteen twin-engined B-25B Mitchell bombers under Lieutenant Colonel James H. Doolittle rumbled off the pitching deck of the carrier USS Hornet some 650 miles from Japan — farther out than planned, after a picket boat spotted the task force. The raiders skimmed the waves to Tokyo, Yokohama, Nagoya and Kobe, dropped their bombs in daylight, and flew on toward China, most crews crash-landing or bailing out. The material damage was slight, but the psychological blow was immense: the Japanese home islands and the imperial capital, thought inviolable, had been struck, humbling the high command and lifting American morale. Just as Doolittle's raiders proved that the enemy's capital lay within reach, Ukraine's swarm of some 400 drones showed that Moscow, seat of the power that began the war, is no longer beyond the front's reach.",
        "excerpt": "Sixteen B-25s clawed into the air from a heaving flight deck no bomber was ever meant to leave, trading fuel and cover for a single daylight pass over the enemy's cities. The bombs they dropped changed little on the ground, but the raid shattered the belief that the home islands were safe. Its true payload was a message: no capital is out of range.",
        "source": "Historical account of the Doolittle Raid, 18 April 1942, U.S. Army Air Forces and U.S. Navy; via Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Doolittle_Raid",
        "image": {
          "src": "/covers/ukraine-drones-strike-moscow-region--a1.png",
          "alt": "A U.S. Army B-25B Mitchell bomber taking off from the deck of USS Hornet during the Doolittle Raid, 18 April 1942.",
          "credit": "U.S. Army Air Forces / U.S. Navy, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In the second book of Virgil's Aeneid, written around 19 BC, the Trojan prince Aeneas relives the night Troy fell. Hidden Greek soldiers pour from the wooden horse, throw open the gates, and set the sleeping city ablaze; from the rooftop Aeneas watches palace after palace catch fire, the seas made bright 'with splendour not their own.' Amid the smoke and the screams of the dying, the greatest city of its age is consumed in a single night, its towers toppled, King Priam butchered at his own altar. The passage became Western literature's defining image of a proud metropolis brought to ruin. Just as Virgil made the burning of a great capital the emblem of a war's terrible turn, the barrage of some 400 drones set sirens wailing and airports closing across the Moscow region, carrying fire toward the heart of a great city.",
        "excerpt": "The palace of Deiphobus ascends\nIn smoky flames, and catches on his friends.\nUcalegon burns next: the seas are bright\nWith splendour not their own, and shine with Trojan light.\nNew clamours and new clangours now arise,\nThe sound of trumpets mix’d with fighting cries.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (1697); Project Gutenberg eBook #228.",
        "href": "https://www.gutenberg.org/ebooks/228",
        "image": {
          "src": "/covers/ukraine-drones-strike-moscow-region--a2.png",
          "alt": "Night scene of Troy in flames, with the wooden horse and Aeneas carrying his father Anchises in the foreground.",
          "credit": "Johann Georg Trautmann (1713–1769), 'A View of Burning Troy', 18th century, Collection of the Grand Duke of Baden, Karlsruhe; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Lord Byron's 'The Destruction of Sennacherib', published in his Hebrew Melodies of 1815, compresses an ancient reversal into six galloping stanzas. Drawing on the Book of Kings, it describes the vast Assyrian army of King Sennacherib descending 'like the wolf on the fold' upon Jerusalem, cohorts gleaming in purple and gold — only to be annihilated overnight by the Angel of Death, so that the invaders who came to sack a city lie still and cold by morning, 'unsmote by the sword.' The poem's power lies in its sudden turn: the mighty aggressor, certain of conquest, is undone at the very gates of his intended prey. Just as Byron dramatised the moment a confident invader's host is stricken far from home, Ukraine's launch of some 400 drones turned the war back upon the capital region of the army that marched against it.",
        "excerpt": "The Assyrian came down like the wolf on the fold,\nAnd his cohorts were gleaming in purple and gold;\nAnd the sheen of their spears was like stars on the sea,\nWhen the blue wave rolls nightly on deep Galilee.\n\nLike the leaves of the forest when Summer is green,\nThat host with their banners at sunset were seen:\nLike the leaves of the forest when Autumn hath blown,\nThat host on the morrow lay withered and strown.\n\nAnd the widows of Ashur are loud in their wail,\nAnd the idols are broke in the temple of Baal;\nAnd the might of the Gentile, unsmote by the sword,\nHath melted like snow in the glance of the Lord!",
        "source": "George Gordon, Lord Byron, 'The Destruction of Sennacherib', from Hebrew Melodies (1815); via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Hebrew_Melodies_(Byron,_1815)/The_destruction_of_Semnacherib",
        "image": {
          "src": "/covers/ukraine-drones-strike-moscow-region--a3.png",
          "alt": "Portrait of the poet Lord Byron by Richard Westall, 1813.",
          "credit": "Richard Westall, portrait of George Gordon, 6th Baron Byron, 1813, National Portrait Gallery, London; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In 1880 Pyotr Ilyich Tchaikovsky composed his 'Year 1812' Festival Overture, Op. 49, to mark Russia's deliverance from Napoleon's invasion. Over roughly fifteen minutes it stages the war in sound: the Orthodox hymn 'O Lord, Save Thy People', the jaunty 'Marseillaise' of the advancing French, the surge and clangour of battle around Moscow, and finally a blaze of pealing bells and live cannon fire celebrating the invader's ruin. Tchaikovsky privately judged the piece loud and lacking warmth, yet it became one of the most famous evocations of a great city fought over and set aflame. Just as the overture thunders with Moscow at the centre of a war — cannon booming over the capital — Ukraine's barrage of some 400 drones brought real explosions and closed skies to the Moscow region, the roles of besieger and besieged now reversed.",
        "excerpt": "The overture opens in hushed lower strings intoning a Russian Orthodox hymn, then gathers into cannonades and the clash of the 'Marseillaise' against Russian themes. As the French motif is beaten back, church bells peal and artillery fires in triumph over the din. It is music engineered to sound like a capital first under bombardment and then delivered.",
        "source": "Pyotr Ilyich Tchaikovsky, 'The Year 1812', Festival Overture in E-flat major, Op. 49 (1880); orchestral score via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)",
        "image": {
          "src": "/covers/ukraine-drones-strike-moscow-region--a4.png",
          "alt": "Photographic portrait of the composer Pyotr Ilyich Tchaikovsky.",
          "credit": "Photograph of Pyotr Ilyich Tchaikovsky, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Russian war painter Vasily Vereshchagin — who had seen combat first-hand and would die aboard a battleship at Port Arthur in 1904 — devoted a celebrated cycle of canvases in the 1890s to Napoleon's catastrophic 1812 campaign. In one, often titled 'The Glow of Zamoskvorechye', French soldiers stand against a night sky made lurid by the flames engulfing Moscow across the river, the great city burning behind them as their triumph curdles into doom. Vereshchagin painted war without glory, insisting on its smoke, ash and ruin; here the captured capital in flames becomes an omen of the invader's destruction. Just as Vereshchagin fixed on canvas the image of Moscow ablaze during an invasion of Russia, Ukraine's launch of some 400 drones lit fires and forced airport closures around that same capital — the metropolis under fire once more, but now as the aggressor's own seat of power.",
        "excerpt": "Against a sky stained orange by the burning city, French soldiers loiter in the foreground, small before the vast conflagration. Vereshchagin renders no heroism, only the glow of a metropolis consuming itself and the silhouettes of the men who set it alight. The captured capital in flames reads as a verdict on the invader.",
        "source": "Vasily Vereshchagin, 'Fire in Zamoskvorechye' (The Glow of Zamoskvorechye), from the Napoleon in Russia series, 1890s; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Zamoskvorechye_in_fire_by_Vereschagin.jpg",
        "image": {
          "src": "/covers/ukraine-drones-strike-moscow-region--a5.png",
          "alt": "Painting of French soldiers before the fiery glow of Moscow's Zamoskvorechye district burning in 1812.",
          "credit": "Vasily Vereshchagin, 'Fire in Zamoskvorechye', 1890s, Museum of the Patriotic War of 1812, Moscow; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "india-cockroach-movement-delhi-tear-gas",
    "headline": "Police fire tear gas at India's Gen Z 'Cockroach' protesters marching on Parliament in Delhi",
    "overview": "Police fired tear gas at supporters of India's youth-led 'Cockroach' movement as they attempted to march to Parliament in Delhi, while the movement's leaders were set to meet a government minister. The anti-establishment protests, driven largely by young people angry over jobs and governance, have swelled from hundreds to thousands in recent weeks. The confrontation marked one of the movement's largest mobilizations yet.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQUm03WGJ4dXBXemV0VkZrdVotZHNnYU5NZXpNMUNrcXExUHh2SGRfOC1UNWo5ZmNWWG9lVk82ZmZmVWpMNTRfaDR4YmpSU1BFbm1UZl9GR0tHbEJvdXhVWXBQcWhYaTg4dlVCeHBVZG1yamNVOTgwTXNrMXlVZ1U4RVlxZnhuQ3VXYmxsdG94ZHBnZFM5TGxfazRrRDJESjRwZEFFamdKWGMzN3puaXZjTDhKTTl3Vk0?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNZHI2Z0E0VHBNWTNNUXI0RnJPdXZUQ3V4QVBHYmZzTVJab2NfTi1UdHhON2ZyZlRzcDZESExqOHlkWWMwdkxRTEVMUHIwdG1GdmlIWi15UDNLQlEtYTREVGNMdm8xbWUyOEtrOFg2M3lNemJGUk5ZZXlmeDN2LW9NQ3o3QkhOSGpUSDRMd1NhNW5CZ3J3YWtvS2ZxMGpCMG1rYllWVGp2Z2xuWGhRSEdka0NiTG81dVk?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-20",
    "image": {
      "src": "/covers/india-cockroach-movement-delhi-tear-gas.png",
      "alt": "The avenue leading to the circular Parliament House (Sansad Bhavan) in New Delhi, seat of India's legislature.",
      "credit": "Bhasa, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 20 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 494 BC, crushed by debt and endless war-levies and shut out of power by the patricians, the common people of Rome did something audacious: they simply left. On the advice of one Sicinius, the plebeian soldiers withdrew from the city to the Sacred Mount beyond the river Anio, three miles off, and there pitched a fortified camp, refusing to fight or labour for a state that scorned them. A paralysed Senate sent the eloquent Menenius Agrippa, who coaxed them back with his fable of the belly and the limbs. The price of their return was the creation of the tribunes of the plebs, magistrates sworn to shield the many from the few. Just as India's Gen Z 'Cockroach' protesters, dismissed from on high, swell from hundreds to thousands to force the powerful to reckon with them, the Roman plebs proved that the disregarded multitude, once withdrawn and united, cannot be ignored.",
        "excerpt": "they, by the advice of one Sicinius, retired, without the orders of the consuls, to the sacred mount, beyond the river Anio, three miles from the city... There without any leader, their camp being fortified with a rampart and trench, remaining quiet, taking nothing but what was necessary for sustenance, they kept themselves for several days, neither being attacked, nor attacking others.",
        "source": "Livy, The History of Rome (Ab Urbe Condita), Book II.32, translated by D. Spillan; Project Gutenberg eBook #19725.",
        "href": "https://www.gutenberg.org/cache/epub/19725/pg19725.txt",
        "image": {
          "src": "/covers/india-cockroach-movement-delhi-tear-gas--a0.png",
          "alt": "Engraved portrait of the Roman historian Titus Livius (Livy).",
          "credit": "Engraving of Livy, from Bibliothek des allgemeinen und praktischen Wissens, Bd. 5 (1905). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On 5 October 1789, with bread scarce and prices soaring, thousands of Parisian market-women seized the Hotel de Ville, took up pikes and even cannon, and set out through pouring rain on the road to Versailles, twelve miles off, the seat of Louis XVI's court. Led by the tipstaff Stanislas Maillard beating his drum, this 'Menadic host,' as Thomas Carlyle called it, swelled with fishwives, laundresses and armed men until it engulfed the palace gates the next morning. The King was forced to yield on bread and reform, and was dragged back to Paris a near-prisoner of his own people. Just as India's youth-led 'Cockroach' movement pushes from the Jantar Mantar protest ground toward Parliament to demand a minister's resignation, the women of 1789 showed that a hungry, furious crowd converging on the seat of government can bend even a throne.",
        "excerpt": "Maillard hastens the languid march. Maillard, beating rhythmic, with sharp ran-tan, all along the Quais, leads forward, with difficulty his Menadic host. Such a host—marched not in silence! The bargeman pauses on the River; all wagoners and coachdrivers fly; men peer from windows,—not women, lest they be pressed.",
        "source": "Thomas Carlyle, The French Revolution: A History (1837), Vol. I, Book VII, 'The Insurrection of Women'; Project Gutenberg eBook #1301.",
        "href": "https://www.gutenberg.org/cache/epub/1301/pg1301.txt",
        "image": {
          "src": "/covers/india-cockroach-movement-delhi-tear-gas--a1.png",
          "alt": "Contemporary 1789 engraving of the Women's March on Versailles, women armed and marching on the royal palace.",
          "credit": "Women's March on Versailles, 5–6 October 1789, contemporary engraving, unknown artist; Bibliotheque nationale de France. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley wrote 'The Masque of Anarchy' in white heat in the autumn of 1819, on hearing of the Peterloo Massacre, when cavalry charged a peaceful crowd of some 60,000 gathered at St Peter's Field, Manchester, to demand parliamentary reform, killing about eighteen and wounding hundreds. Too incendiary to print in his lifetime, the poem parades Murder, Fraud and Anarchy through England, then answers them with a vision of the people rising in disciplined, overwhelming numbers. Its closing refrain became the enduring anthem of nonviolent mass protest, echoed by Chartists and demonstrators ever since. Just as India's 'Cockroach' generation, insulted from the bench and met with tear gas and batons, turns its sheer numbers into defiant strength, Shelley told the many that their multitude was itself their weapon against the few who rule.",
        "excerpt": "Rise like Lions after slumber\nIn unvanquishable number,\nShake your chains to earth like dew\nWhich in sleep had fallen on you—\nYe are many—they are few.",
        "source": "Percy Bysshe Shelley, 'The Masque of Anarchy' (written 1819; first published 1832), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Masque_of_Anarchy",
        "image": {
          "src": "/covers/india-cockroach-movement-delhi-tear-gas--a2.png",
          "alt": "Portrait of the poet Percy Bysshe Shelley.",
          "credit": "Percy Bysshe Shelley, by Alfred Clint (after Amelia Curran, 1819). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Les Miserables (1862), Victor Hugo immortalised the June Rebellion of 1832, when students and workers threw up barricades in the streets of Paris against the July Monarchy. His young idealists, the Friends of the A B C, led by the beautiful and implacable Enjolras, are a secret society of students who dream of elevating the downtrodden people and die, almost to a man, behind their paving-stones and overturned carts. Hugo makes their doomed, glorious revolt the moral heart of the novel: a rising of the young against a complacent, comfortable order. Just as India's Gen Z 'Cockroach' movement is driven by students enraged over exam-paper leaks, joblessness and the suicides of their peers, Hugo's ABC bound a whole generation together in the conviction that the future belonged to the young who dared to demand it.",
        "excerpt": "The greater part of the Friends of the A B C were students, who were on cordial terms with the working classes. Here are the names of the principal ones. They belong, in a certain measure, to history: Enjolras, Combeferre, Jean Prouvaire, Feuilly, Courfeyrac, Bahorel, Lesgle or Laigle, Joly, Grantaire.",
        "source": "Victor Hugo, Les Miserables (1862), Vol. III 'Marius', Book IV, translated by Isabel F. Hapgood; Project Gutenberg eBook #135.",
        "href": "https://www.gutenberg.org/cache/epub/135/pg135.txt",
        "image": {
          "src": "/covers/india-cockroach-movement-delhi-tear-gas--a3.png",
          "alt": "Photographic portrait of the novelist Victor Hugo.",
          "credit": "Victor Hugo, photograph by Etienne Carjat, 1876. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Honore Daumier painted 'The Uprising' (L'Emeute) around 1848–1860, in the aftermath of the revolutions that convulsed Paris. Out of a shadowy press of bodies filling a narrow street, a single young man in an open white shirt bursts forward, one arm flung violently upward, his face lit and transfigured by conviction. The faceless crowd behind him blurs into a single dark mass, so that the whole canvas becomes the portrait of a collective surge finding its voice in one figure. Daumier, better known as a caricaturist once jailed for mocking the king, here refuses both heroics and contempt: the rising is simply an elemental human force. Now in the Phillips Collection in Washington, it endures as the definitive image of an anonymous multitude in motion. Just as India's Gen Z 'Cockroach' movement swells from hundreds to thousands and thrusts a raised young arm toward Parliament through clouds of tear gas, Daumier caught the instant an ordinary crowd becomes an uprising.",
        "excerpt": "From a crush of shadowed figures in a cramped street, a young man in an unbuttoned white shirt lunges forward, his arm flung up and his face burning with resolve. The others behind him dissolve into a single dark, anonymous tide, their features barely legible. Daumier gives the scene no leader's name and no banner, only the raw, upward motion of a people beginning to rise.",
        "source": "Honore Daumier, The Uprising (L'Emeute), c. 1848–1860, oil on canvas, The Phillips Collection, Washington, D.C.",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_The_Uprising_(L%27Emeute)_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/india-cockroach-movement-delhi-tear-gas--a4.png",
          "alt": "Daumier's painting The Uprising, a young man in a white shirt with arm raised bursting from a crowd in a street.",
          "credit": "Honore Daumier, The Uprising (L'Emeute), c. 1848–1860, The Phillips Collection. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In the night of 25–26 April 1792, as revolutionary France went to war with Austria, an army officer named Claude Joseph Rouget de Lisle composed a 'War Song for the Army of the Rhine' at Strasbourg. Volunteer soldiers from Marseille sang it as they marched north on Paris, and it took their name: 'La Marseillaise.' With its summons—Aux armes, citoyens!—it welded a frightened, hungry people into a marching mass certain of its cause, and by 1795 it was France's national anthem, banned and revived with each swing of the nation's politics. Francois Rude later carved its spirit into the Arc de Triomphe as a winged fury driving the volunteers forward. Just as India's youth-led 'Cockroach' movement grows from hundreds to thousands and presses toward Parliament in the teeth of tear gas, Rouget de Lisle's anthem shows how a single shared song can fuse scattered citizens into one advancing multitude.",
        "excerpt": "A lone, bugle-like melody gathers into a driving march, its verses swelling toward a refrain that calls the citizens to arms and to form their battalions. Composed overnight by an amateur musician, it spread by mouth from town square to marching column faster than any decree could travel. Its force lies less in refinement than in how readily a crowd can seize it and roar it in unison.",
        "source": "Claude Joseph Rouget de Lisle, 'La Marseillaise' (Chant de guerre pour l'armee du Rhin), 1792; via IMSLP.",
        "href": "https://imslp.org/wiki/La_Marseillaise_(Rouget_de_Lisle%2C_Claude-Joseph)",
        "image": {
          "src": "/covers/india-cockroach-movement-delhi-tear-gas--a5.png",
          "alt": "Francois Rude's stone relief 'La Marseillaise' on the Arc de Triomphe, a winged figure urging on marching volunteers.",
          "credit": "Francois Rude, Le Depart de 1792 (La Marseillaise), Arc de Triomphe, Paris; photo by Michal Osmenda, CC BY 2.0, via Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "china-delivery-rider-lu-xun-literary-prize",
    "headline": "Chinese food-delivery rider Wang Jibing wins the Lu Xun Literary Prize for his poetry",
    "overview": "Wang Jibing, a 56-year-old food-delivery rider from Kunshan, won China's Lu Xun Literary Prize, one of the country's top literary honors, for his poetry collection 'Flying Low.' Wang, who left school in junior high and worked as a laborer, dredger and scrap collector before becoming a courier at 50, said the award 'will never change who I am' and intends to keep delivering food. The prize, awarded every three years by the China Writers Association, drew wide attention to a writer of the working class.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c5ydr3xd0kvo"
      },
      {
        "name": "Xinhua",
        "href": "https://english.news.cn/20260715/c5b1f7279e1e484196aeb709fb613a02/c.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-20",
    "image": {
      "src": "/covers/china-delivery-rider-lu-xun-literary-prize.png",
      "alt": "A Meituan food-delivery rider in yellow uniform carrying a delivery box in a Chinese city.",
      "credit": "黎飞羽 (Li Feiyu), 2025, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 20 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Publius Terentius Afer—Terence—was born around 195 BC, most likely in Carthage, and carried to Rome as the slave of the senator Terentius Lucanus. Struck by the boy's wit and grace, his master had him educated and then set him free. Between roughly 166 and 160 BC this African freedman wrote six verse comedies—among them Andria and Heauton Timorumenos—that were staged at Rome's public games and admired by the aristocratic 'Scipionic circle.' Dead before he was thirty, he left plays that schoolboys have copied for two thousand years, and a single line—'I am a man; nothing human is alien to me'—became one of antiquity's most quoted verses. Just as Wang Jibing rose from scrap-collecting and food delivery to win Chinese literature's highest honour, Terence rose from a slave's quarters to the Roman stage, proof that celebrated art can spring from the most bound and humble of lives.",
        "excerpt": "Homo sum: humani nil a me alienum puto.\n(I am a man: I count nothing human alien to me.)",
        "source": "Terence, Heauton Timorumenos (The Self-Tormentor), line 77, c. 163 BC; Latin text via The Latin Library.",
        "href": "https://www.thelatinlibrary.com/ter.heauton.html",
        "image": {
          "src": "/covers/china-delivery-rider-lu-xun-literary-prize--a0.png",
          "alt": "Illuminated author portrait of Terence from the Carolingian Vatican Terence manuscript.",
          "credit": "Vatican Terence (Codex Vaticanus Latinus 3868), fol. 2r, c. 825, Biblioteca Apostolica Vaticana; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Aleksei Peshkov was born in 1868 in Nizhny Novgorod, orphaned young and pushed out to earn his own bread by the age of eight. He laboured as a cobbler's boy, an icon-painter's errand runner, a dishwasher on a Volga steamer, a dockhand, a night-watchman and a baker in Kazan—beaten by employers, often hungry, almost wholly self-taught, reading whatever came to hand. From that bitterness he took his pen name, Maxim Gorky, 'the bitter one.' His first tale appeared in 1892; 'Chelkash' (1895) made him famous, and he became modern Russia's most celebrated writer, nominated five times for the Nobel Prize. Just as Wang Jibing turned years of construction sites, sand-dredging and delivery runs into the poems of 'Flying Low,' Gorky forged the hunger and toil of the Russian underclass into literature that the whole world came to read.",
        "excerpt": "There were six-and-twenty of us--six-and-twenty living machines in a damp, underground cellar, where from morning till night we kneaded dough and rolled it into kringels. Opposite the underground window of our cellar was a bricked area, green and mouldy with moisture. The window was protected from outside with a close iron grating, and the light of the sun could not pierce through the window panes, covered as they were with flour dust.",
        "source": "Maxim Gorky, 'Twenty-six Men and a Girl' (1899), in Creatures That Once Were Men and Other Stories; Project Gutenberg eBook #1466.",
        "href": "https://www.gutenberg.org/cache/epub/1466/pg1466-images.html",
        "image": {
          "src": "/covers/china-delivery-rider-lu-xun-literary-prize--a1.png",
          "alt": "Photographic portrait of the Russian writer Maxim Gorky.",
          "credit": "Maxim Gorky, photograph, Library of Congress; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Stephen Duck was born about 1705 at Charlton in Wiltshire to labouring parents, left a charity school at thirteen, and threshed grain in the barns for wages of four shillings and sixpence a week. Teaching himself from a borrowed handful of books, he turned his own drudgery into verse, and 'The Thresher's Labour' made him a sensation. On 11 September 1730 his poems were read aloud to Queen Caroline at Windsor; delighted, she granted him an annuity and a small house in Richmond Park, and London hailed 'the thresher poet.' Just as Wang Jibing composed his prize-winning lines between deliveries and vowed to keep riding as a courier, Duck drew his poetry straight from the flail and the sweat of the threshing floor—manual labour itself transformed into art.",
        "excerpt": "DIVESTED of our Cloathes, with Flail in Hand,\nAt proper Distance, Front to Front we stand:\nAnd first the Threshal's gently swung, to prove\nWhether with just Exactness it will move:\nThat once secure, we swiftly whirl them round;\nFrom the strong Planks our Crab-tree Staves rebound,\nAnd echoing Barns return the rattling Sound.\nNow in the Air our knotty Weapons fly,\nAnd now with equal Force descend from high;\nDown one, one up, so well they keep the Time,\nThe CYCLOPS' Hammers could not truer chime;\nNor with more heavy Strokes could Aetna groan,\nWhen VULCAN forg'd the Arms for THETIS' Son.\nIn briny Streams our Sweat descends apace,\nDrops from our Locks, or trickles down our Face.",
        "source": "Stephen Duck, 'The Thresher's Labour' (first published 1730), lines 29–43; via the Eighteenth-Century Poetry Archive.",
        "href": "https://www.eighteenthcenturypoetry.org/works/o4741-w0030.shtml",
        "image": {
          "src": "/covers/china-delivery-rider-lu-xun-literary-prize--a2.png",
          "alt": "Boris Kustodiev's 1908 painting of peasants threshing grain in a barn yard.",
          "credit": "Boris Kustodiev, Threshing (Молотьба), 1908; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "'The Song of the Shirt' appeared anonymously in the Christmas 1843 number of Punch and became a Victorian sensation, reportedly trebling the magazine's sale and soon reprinted on broadsheets, cotton handkerchiefs and the stage. Thomas Hood (1799–1845), himself ailing and poor, gave voice to a starving London seamstress stitching shirts through the night for pennies—'a voice of dolorous pitch' raised against the exploitation of the labouring poor. It became the anthem of every unseen needle-worker of the industrial age. Just as Wang Jibing paid roughly 140 fellow delivery riders to share their stories and lent them the dignity of his verse, Hood lent his art to the sweated worker whom polite society preferred not to see, turning invisible drudgery into public conscience.",
        "excerpt": "With fingers weary and worn,\nWith eyelids heavy and red,\nA woman sat in unwomanly rags,\nPlying her needle and thread—\nStitch! stitch! stitch!\nIn poverty, hunger, and dirt,\nAnd still with a voice of dolorous pitch\nShe sang the \"Song of the Shirt!\"\n\nWork—work—work\nTill the brain begins to swim!\nWork—work—work\nTill the eyes are heavy and dim!\nSeam, and gusset, and band,\nBand, and gusset, and seam,\nTill over the buttons I fall asleep,\nAnd sew them on in a dream!",
        "source": "Thomas Hood, 'The Song of the Shirt,' first published in Punch, 1843; via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Poetical_Works_of_Thomas_Hood/The_Song_of_the_Shirt",
        "image": {
          "src": "/covers/china-delivery-rider-lu-xun-literary-prize--a3.png",
          "alt": "Portrait of the English poet Thomas Hood.",
          "credit": "Portrait of Thomas Hood, photographic reproduction, Rijksmuseum; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In 1857 Jean-François Millet exhibited 'Des glaneuses' ('The Gleaners') at the Paris Salon: three peasant women bent low across a shorn field, gathering the stray ears of grain left behind after the harvest—the ancient right of the very poorest. Painted with monumental gravity, without sentiment or overt protest, the canvas unsettled bourgeois critics who sensed the dignity Millet granted to the lowliest rural labour. The son of Normandy peasants, he knew that world at first hand. The picture now hangs in the Musée d'Orsay. Just as Wang Jibing once gleaned scrap metal and now gleans poems from the leftover minutes of a courier's day, Millet made the stooped, patient gathering of the poor into one of art's most enduring images of the dignity of labour.",
        "excerpt": "Three women in coarse caps and aprons stoop across a vast stubble field in the flat evening light, their broad backs and reddened hands forming the compositional heart of the picture. Behind them, haystacks, a mounted overseer and a bountiful harvest recede into the distance—abundance that is not theirs. Millet monumentalises the humblest gesture of gathering leftover grain, lending peasant toil a gravity once reserved for gods and kings.",
        "source": "Jean-François Millet, The Gleaners (Des glaneuses), 1857, oil on canvas, Musée d'Orsay, Paris; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg",
        "image": {
          "src": "/covers/china-delivery-rider-lu-xun-literary-prize--a4.png",
          "alt": "Millet's painting of three peasant women gleaning grain in a harvested field.",
          "credit": "Jean-François Millet, The Gleaners, 1857, Musée d'Orsay; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Franz Joseph Haydn was born in 1732 in the village of Rohrau, the son of Mathias Haydn, a wheelwright who could not read a note of music, and a former palace cook. Sent away at about six because his gifts could find no training at home, he became a choirboy at St Stephen's Cathedral in Vienna, then endured lean years as a struggling freelance musician before rising to become the most celebrated composer in Europe—the 'father of the symphony.' Fêted in London in 1791, he there wrote the Symphony No. 94 in G major, the 'Surprise.' Just as Wang Jibing carried poetry out of manual labour and insisted the Lu Xun Prize would 'never change who I am,' Haydn carried the folk music of a wheelwright's cottage into the concert halls of Europe without ever ceasing to be that village child.",
        "excerpt": "The second movement opens with a demure, tiptoeing tune in the strings, disarmingly simple—until a sudden fortissimo chord, timpani and full orchestra, jolts the drowsy listener awake. From that famous joke Haydn spins a set of graceful variations. The whole 'Surprise' Symphony, written for his triumphant London seasons, weds village good humour and folk-like melody to the grandest symphonic craft of the age.",
        "source": "Joseph Haydn, Symphony No. 94 in G major ('Surprise'), Hob. I:94 (1791); score via IMSLP.",
        "href": "https://imslp.org/wiki/Symphony_No.94_in_G_major,_Hob.I:94_(Haydn,_Joseph)",
        "image": {
          "src": "/covers/china-delivery-rider-lu-xun-literary-prize--a5.png",
          "alt": "Thomas Hardy's 1791 portrait of the composer Joseph Haydn.",
          "credit": "Thomas Hardy, Portrait of Joseph Haydn, 1791, Royal College of Music, London; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "tsmc-ai-chip-demand-arizona-investment",
    "headline": "TSMC forecasts strong multi-year AI chip demand and adds $100 billion to its Arizona investment",
    "overview": "Taiwan Semiconductor Manufacturing Co. said it expects 'strong, multi-year' demand for AI chips and announced an additional $100 billion for its Arizona operations, bringing planned U.S. investment to about $265 billion. The company raised its 2026 revenue growth outlook to above 40% after a record quarter, with revenue of $40.2 billion. Executives described the AI-driven demand as structural and likely to persist for years.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxNeWtrc3R6QmdYREpuRHNxR3dFNkJkVjdSMTRYcFhmRHJYQ18yaGFfSHcwbmVKSjZvWVo2M0FqdF9VZkJmbG9CVTVObEZTQ2t1amx5MTlJZ201YWR3cE9IMFNxVTNXdlp6SVV5MnZDLXotWS1EQVFNbUFFV2hZUWJJeUVScVNRaUhjci1zUXJoUTBnMFBkSnFzeWgwWkNpd2FqZ2hZQW14cTNCRDcydkp4X2p2QlYyRWlTRWFISmFoSllBY01OWmNlVWNpamk?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/20/tsmc-arizona-fab-capacity-ai-chip-demand.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-20",
    "image": {
      "src": "/covers/tsmc-ai-chip-demand-arizona-investment.png",
      "alt": "Aerial view of TSMC's Fab 21 semiconductor plant under construction in Phoenix, Arizona, November 2023",
      "credit": "Photograph by Hunter Trick, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 20 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "For four centuries the Venetian Arsenal was the greatest industrial engine in Europe. Begun around 1104 and vastly enlarged after 1320, it sprawled across some 45 hectares—roughly 15 percent of Venice—behind crenellated walls and the marble Porta Magna of 1460. At its early-sixteenth-century peak the Arsenal employed about 16,000 arsenalotti who, using standardized, interchangeable parts on a production-line basis, could frame, launch, arm, and provision a war galley in a single day. This concentrated capacity underwrote Venice's commercial empire across the Mediterranean; whoever needed a fleet had, in effect, to come to the lagoon. Just as Venice's one indispensable shipyard armed an age and made a small republic the pivot of Mediterranean power, TSMC's fabs now supply the advanced chips on which the entire AI boom depends, drawing the world's technology giants to its door.",
        "excerpt": "As in the Arsenal of the Venetians\nBoils in the winter the tenacious pitch\nTo smear their unsound vessels o’er again,\n\nFor sail they cannot; and instead thereof\nOne makes his vessel new, and one recaulks\nThe ribs of that which many a voyage has made;\n\nOne hammers at the prow, one at the stern,\nThis one makes oars, and that one cordage twists,\nAnother mends the mainsail and the mizzen;",
        "source": "Dante Alighieri, Inferno, Canto XXI, ll. 7–15, trans. Henry Wadsworth Longfellow (1867); via Wikisource. Longfellow's simile likens Hell's boiling pitch to the ceaseless industry of the Venetian Arsenal.",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_21",
        "image": {
          "src": "/covers/tsmc-ai-chip-demand-arizona-investment--a0.png",
          "alt": "Canaletto's 1732 painting of the water entrance to the Venetian Arsenal, with its towers and the marble Porta Magna gateway",
          "credit": "Canaletto (Giovanni Antonio Canal), 'View of the entrance to the Arsenal,' c. 1732. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "When gold was found at Sutter's Mill in 1848, Samuel Brannan—a Mormon elder, storekeeper, and publisher of California's first newspaper—grasped the real opportunity. Rather than dig, he quietly bought up every pick, shovel, pan, and tin of provisions he could find, then paraded through San Francisco brandishing a bottle of dust and shouting that gold lay in the American River. The stampede he ignited made his stores the only supply for tens of thousands of miners; he is said to have cleared as much as $36,000 in a single month and became California's first millionaire, while most prospectors went home empty-handed. His example crystallized a maxim: in a gold rush, sell shovels. Just as Brannan prospered not by mining but by furnishing the indispensable tools of the rush, TSMC is reaping record profits by supplying the essential hardware of the AI gold rush rather than chasing the applications built atop it.",
        "excerpt": "Brannan understood that the surest fortune in a stampede belongs not to the digger but to the man who owns the only store. Having cornered the region's picks, shovels, and pans before the news broke, he sold them back to the frenzied crowds at prices that made him rich while the diggings around him were still barren. The miners chased the metal; he simply supplied the means of the chase, and grew wealthier than nearly all of them.",
        "source": "Historical account of Samuel Brannan (1819–1889), merchant of the California Gold Rush, and the origin of the maxim 'in a gold rush, sell shovels'; via Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Samuel_Brannan",
        "image": {
          "src": "/covers/tsmc-ai-chip-demand-arizona-investment--a1.png",
          "alt": "Nineteenth-century portrait photograph of Samuel Brannan, California Gold Rush merchant and the state's first millionaire",
          "credit": "Unknown photographer, portrait of Samuel Brannan (before 1889), Utah State Historical Society. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Book I of Virgil's Aeneid, composed between roughly 29 and 19 BC, the shipwrecked Aeneas climbs a hill above a Libyan shore and looks down in wonder on Carthage rising under Queen Dido. The Tyrians swarm at their work—raising walls and a citadel, hauling great stones, laying deep foundations, and hewing mighty columns from marble quarries for a future theatre—and Virgil likens their toil to bees laboring in the early-summer sun. The passage is a hymn to collective industry and to a city being built at breathtaking speed. John Dryden rendered it into heroic couplets in 1697. Just as Aeneas marvels at a whole new city and industry conjured from bare ground, the world now watches TSMC raise vast semiconductor works in the Arizona desert, some $265 billion of planned investment, to meet the surging demand of the AI age.",
        "excerpt": "The toiling Tyrians on each other call\nTo ply their labour: some extend the wall;\nSome build the citadel; the brawny throng\nOr dig, or push unwieldly stones along.\nSome for their dwellings choose a spot of ground,\nWhich, first design’d, with ditches they surround.\nSome laws ordain; and some attend the choice\nOf holy senates, and elect by voice.\nHere some design a mole, while others there\nLay deep foundations for a theatre;\nFrom marble quarries mighty columns hew,\nFor ornaments of scenes, and future view.\nSuch is their toil, and such their busy pains,\nAs exercise the bees in flow’ry plains,\nWhen winter past, and summer scarce begun,\nInvites them forth to labour in the sun;",
        "source": "Virgil, Aeneid, Book I, trans. John Dryden (1697); Project Gutenberg eBook #228.",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm",
        "image": {
          "src": "/covers/tsmc-ai-chip-demand-arizona-investment--a2.png",
          "alt": "Roman mosaic showing the poet Virgil seated with a scroll of the Aeneid between the Muses Clio and Melpomene",
          "credit": "Virgil between two Muses, Roman mosaic from Hadrumetum (Sousse), 3rd century AD, Bardo National Museum, Tunis. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Book I of John Milton's Paradise Lost (1667), the defeated angels turn at once to industry. Mammon—'the least erected Spirit that fell,' forever eyeing heaven's 'trodden gold'—leads a brigade to a hill 'belching fire and rolling smoke,' its interior rich with metallic ore. They ransack the ground, open 'a spacious wound' in the hillside, and dig out 'ribs of gold,' from which the architect Mulciber's engines raise Pandaemonium, a golden temple that 'rose like an exhalation' to the sound of sweet symphonies. Milton's scene is at once mining boom and monumental construction: treasure torn from the earth to build a seat of power at supernatural speed. Just as Milton's fallen host mines precious ore to erect a gleaming new capital almost overnight, the AI boom is pouring hundreds of billions into wringing value from silicon and building TSMC's costly new fabs at extraordinary speed.",
        "excerpt": "Mammon led them on—\nMammon, the least erected Spirit that fell\nFrom Heaven; for even in Heaven his looks and thoughts\nWere always downward bent, admiring more\nThe riches of heaven’s pavement, trodden gold,\nThan aught divine or holy else enjoyed\nIn vision beatific. By him first\nMen also, and by his suggestion taught,\nRansacked the centre, and with impious hands\nRifled the bowels of their mother Earth\nFor treasures better hid. Soon had his crew\nOpened into the hill a spacious wound,\nAnd digged out ribs of gold.",
        "source": "John Milton, Paradise Lost, Book I (1667); Project Gutenberg eBook #26.",
        "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm",
        "image": {
          "src": "/covers/tsmc-ai-chip-demand-arizona-investment--a3.png",
          "alt": "Portrait of the English poet John Milton, author of Paradise Lost",
          "credit": "Portrait of John Milton. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Strauss composed the tone poem 'Also sprach Zarathustra,' Op. 30, in 1896, inspired by Nietzsche's philosophical prose-poem and premiered under his own baton in Frankfurt that November. Its opening 'Sunrise' (Einleitung) is one of the most famous passages in all music: over a low, barely audible organ pedal on C, a solo trumpet intones a rising three-note figure, and the full orchestra answers with blazing brass and a thunderous timpani tattoo, twice more surging upward until the whole ensemble erupts in overwhelming C-major light. In under two minutes it depicts nothing less than the dawn of a new age of consciousness. Just as Strauss's sunrise heralds the breaking of a wholly new era, TSMC casts the surge in AI as the dawn of a structural, multi-year era—one it is arming with a roughly $265 billion build-out of advanced fabs in Arizona.",
        "excerpt": "The music begins almost inaudibly, a deep sustained hum from the organ and basses, as if the world itself were holding its breath before daybreak. A lone trumpet climbs a bare, elemental three-note figure; the brass swell, the timpani pound out their double-stroke, and the orchestra rises three times in mounting waves. On the third, it bursts into radiant C major with clashing cymbals and full organ—an aural sunrise, the threshold of a new age flung open.",
        "source": "Richard Strauss, Also sprach Zarathustra, Op. 30 (1896); full score via IMSLP.",
        "href": "https://imslp.org/wiki/Also_sprach_Zarathustra,_Op.30_(Strauss,_Richard)",
        "image": {
          "src": "/covers/tsmc-ai-chip-demand-arizona-investment--a4.png",
          "alt": "Photographic portrait of the German composer Richard Strauss",
          "credit": "Portrait of Richard Strauss (1864–1949). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg's 'Coalbrookdale by Night,' painted in 1801 and now held by the Science Museum in London, is the defining image of the early Industrial Revolution. It depicts the Bedlam ironworks in the Ironbridge Gorge of Shropshire—the very cradle of industrial iron—where blast furnaces throw a lurid red glare and dense smoke into the night sky while dark figures haul raw materials and pig iron across the foreground. Loutherbourg based the canvas on sketches from tours of England and Wales in 1786 and 1800, and critics have called it the classic example of the 'industrial sublime,' beauty and dread fused in the machinery of a new age. Just as Loutherbourg captured the fiery, round-the-clock infrastructure on which a technological revolution was being built, TSMC's blazing, ceaselessly running fabs are the physical infrastructure of today's AI revolution.",
        "excerpt": "Against a moonlit gorge, the Bedlam furnaces blaze at the canvas's heart, spewing a column of fire and orange smoke that stains the night. Tiny laborers and horses move through the glare in the foreground, dwarfed by the industry around them, while the cold silver of the sky beyond throws the man-made inferno into sharper relief. It is at once beautiful and unsettling—the birth of a new industrial world rendered as sublime spectacle.",
        "source": "Philip James de Loutherbourg, Coalbrookdale by Night, 1801, oil on canvas, Science Museum, London; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._002.jpg",
        "image": {
          "src": "/covers/tsmc-ai-chip-demand-arizona-investment--a5.png",
          "alt": "Philip James de Loutherbourg's painting Coalbrookdale by Night, showing iron furnaces glowing red against a dark sky",
          "credit": "Philip James de Loutherbourg, 'Coalbrookdale by Night,' 1801, Science Museum, London. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "northern-india-floods-landslides-kill-25",
    "headline": "Floods and landslides across northern India kill at least 25 after torrential rain",
    "overview": "At least 25 people were killed in floods and landslides triggered by torrential monsoon rain across northern and northeastern India over the weekend, officials said, with more rain forecast. About 15 died in rain-related incidents in the Poonch, Rajouri and Doda districts of Indian-administered Kashmir, and nine were killed by landslides in the northeastern state of Nagaland. Rescuers searched for people still missing as roads and hillsides gave way.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPSHdTd1JiRGlKNG9PLVdSZlZ0Z19rdm9FQldfQmpvOXlxczhleDZISXdoRDdvYXVVcnZ4STFVaVUyX2x1WS1telN1eF9xZC0xWm56TzJBZDRHYXRLWmVmRjctblQ5Qjd0QVdLX0xiSzRCOWkwX2Rxd3pwOWs0UXJ2Q25CX3NJUEttenA0YjZ3U1ZEQVJNTnlvNTFJOW1vRG9kT2J0aFpxTHVFS1dwdkNZ?oc=5"
      },
      {
        "name": "APN Live",
        "href": "https://apnlive.com/india-news/heavy-rain-landslides-himachal-uttarakhand-floods-northeast-india/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-20",
    "image": {
      "src": "/covers/northern-india-floods-landslides-kill-25.png",
      "alt": "Aerial view of vast flood waters submerging villages and fields across the Jammu and Kashmir region.",
      "credit": "Government of India (Press Information Bureau), GODL-India, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 20 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the winter of 373 BC the prosperous Greek city of Helike, capital of the Achaean League on the southern shore of the Gulf of Corinth, was annihilated in a single night. Ancient writers record that violent earth tremors struck after dark and that the sea then rose and rolled inland, drowning the city and every inhabitant; by morning only the tops of the drowned trees in Poseidon's sacred grove broke the surface. For centuries afterward travellers such as Pausanias, writing in the 2nd century AD, reported that the submerged ruins and a bronze statue of Poseidon could still be glimpsed beneath the shallow water. Many Greeks read the catastrophe as the wrath of Poseidon, god of both sea and earthquake, whose great temple had stood there. Just as Helike vanished beneath water loosed by the trembling earth in one terrible night, the villages of Poonch, Rajouri and Doda were overwhelmed as saturated hillsides and swollen rivers gave way in the monsoon dark.",
        "excerpt": "This was the type of earthquake, they say, that on the occasion referred to levelled Helice to the ground, and that it was accompanied by another disaster in the season of winter. The sea flooded a great part of the land, and covered up the whole of Helice all round. Moreover, the tide was so deep in the grove of Poseidon that only the tops of the trees remained visible. What with the sudden earthquake, and the invasion of the sea that accompanied it, the tidal wave swallowed up Helice and every man in it.",
        "source": "Pausanias, Description of Greece, Book 7 (Achaia) 24.12, trans. W.H.S. Jones and H.A. Ormerod (Loeb Classical Library, 1918), via the Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0160:book=7:chapter=24:section=12",
        "image": {
          "src": "/covers/northern-india-floods-landslides-kill-25--a0.png",
          "alt": "Bronze statue of Zeus or Poseidon recovered from the sea off Cape Artemision, c. 460 BC.",
          "credit": "Artemision Bronze (Zeus or Poseidon), c. 460 BC, National Archaeological Museum, Athens; photograph CC BY-SA, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On the afternoon of 31 May 1889, after days of torrential rain, the poorly maintained South Fork Dam collapsed above Johnstown, Pennsylvania, releasing some 14.5 million cubic metres of Lake Conemaugh down a narrow valley. A wall of water and debris up to eighteen metres high roared toward the steel town at speeds approaching 65 km/h, smashing houses, trains and factories and heaping a burning tangle of wreckage against the Pennsylvania Railroad's stone bridge. In minutes 2,209 people were dead; 777 of the recovered bodies were never identified. The reservoir had been enlarged for the private lakeside retreat of wealthy Pittsburgh industrialists, and their neglected earthen dam became one of America's deadliest engineering failures. Just as an entire valley of the Conemaugh was scoured away in a single afternoon of rain-fed flood, torrential monsoon downpours turned the rivers and slopes of northern India into torrents that killed at least 25 people in one weekend.",
        "excerpt": "The whole mass became honeycombed. And still the rain poured down, and still the South Fork and a hundred minor streams sent in their swelling floods, until, with a roar like that of the opening gates of the Inferno belching forth the legions of the damned, the wall gave way, and with the rush of a famished tiger into a sheepfold, the whirlwind of water swept down the valley on its errand of destruction—",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (Edgewood Publishing Co., 1889), Chapter III, via Project Gutenberg eBook #41271.",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm",
        "image": {
          "src": "/covers/northern-india-floods-landslides-kill-25--a1.png",
          "alt": "Photograph of shattered houses and mounded wreckage left by the 1889 Johnstown Flood.",
          "credit": "Johnstown Flood, 1889, general view of debris; Library of Congress (LCCN 2005683592), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Hebrew Book of Genesis preserves the archetypal flood story of the West. Grieved by human wickedness, God resolves to blot out all life and commands the righteous Noah to build an ark. Then the fountains of the great deep burst open and rain falls for forty days and forty nights until the waters prevail exceedingly upon the earth, lifting the ark and covering even the highest mountains fifteen cubits deep. Every living thing on dry land perishes; only those aboard the ark survive, and the waters hold dominion for a hundred and fifty days before slowly receding. The tale, echoed in the older Mesopotamian epics of Atrahasis and Gilgamesh, fixed forever the image of a world dissolved back into water. Just as Genesis imagines the high hills disappearing beneath a rising deluge, the rain-swollen rivers of Kashmir and Nagaland rose over homes and hillsides until at least 25 people were swept to their deaths.",
        "excerpt": "And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered. And all flesh died that moved upon the earth, both of fowl, and of cattle, and of beast, and of every creeping thing that creepeth upon the earth, and every man: All in whose nostrils was the breath of life, of all that was in the dry land, died. And every living substance was destroyed which was upon the face of the ground, both man, and cattle, and the creeping things, and the fowl of the heaven; and they were destroyed from the earth: and Noah only remained alive, and they that were with him in the ark.",
        "source": "The Holy Bible, King James Version (1611), Genesis 7:19–23, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/northern-india-floods-landslides-kill-25--a2.png",
          "alt": "Gustave Dore engraving of desperate figures clinging to a rock as the flood waters rise around them.",
          "credit": "Gustave Dore, 'The Deluge,' from The Holy Bible, 1866; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In the first book of his Metamorphoses (c. 8 AD) the Roman poet Ovid retells the Greek flood myth of Deucalion and Pyrrha. Enraged by the impiety of the iron age, Jupiter summons the rains and calls on Neptune to unleash the rivers; the swollen floods remove the living stones and pour across the world. Fields, flocks, houses and shrines vanish as seas and earth are lost in confusion, and the drowned landscape becomes a world of waters without a coast, where dolphins swim among the oak branches and the wolf paddles among the sheep. Only two survivors, Deucalion and Pyrrha, wash up on Mount Parnassus to refound the human race from stones cast over their shoulders. Just as Ovid pictures a whole ordered world dissolving into a shoreless sea when the heavens open, the torrential monsoon of northern India turned settled valleys into a chaos of water, mud and sliding earth.",
        "excerpt": "Now seas and Earth were in confusion lost;\nA world of waters, and without a coast.\nOne climbs a cliff; one in his boat is born:\nAnd ploughs above, where late he sow'd his corn.\nOthers o'er chimney-tops and turrets row,\nAnd drop their anchors on the meads below:\nOr downward driv'n, they bruise the tender vine,\nOr tost aloft, are knock'd against a pine.\nAnd where of late the kids had cropt the grass,\nThe monsters of the deep now take their place.\nInsulting Nereids on the cities ride,\nAnd wond'ring dolphins o'er the palace glide.\nOn leaves, and masts of mighty oaks they brouze;\nAnd their broad fins entangle in the boughs.\nThe frighted wolf now swims amongst the sheep;\nThe yellow lion wanders in the deep:",
        "source": "Ovid, Metamorphoses, Book I (the Flood), trans. Sir Samuel Garth, John Dryden et al. (1717), via the Internet Classics Archive.",
        "href": "https://classics.mit.edu/Ovid/metam.1.first.html",
        "image": {
          "src": "/covers/northern-india-floods-landslides-kill-25--a3.png",
          "alt": "Sixteenth-century engraving of Deucalion and Pyrrha surviving the flood amid a drowned landscape.",
          "credit": "Virgil Solis, 'Deucalion and Pyrrha,' engraving for Ovid's Metamorphoses, 16th century; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin painted Winter, also called The Deluge (L'Hiver ou Le Deluge), between 1660 and 1664 as the last canvas of his Four Seasons cycle, made for the Duc de Richelieu and now in the Louvre (INV 7306). In a cold, leaden light the great classicist abandoned his usual serenity to render Noah's flood as the end of the world: black storm clouds are split by a single bolt of lightning above a drowned landscape of dark rock and rising water; a small boat founders, a snake glides over a ledge, and tiny human figures cling to the last outcrops or reach helplessly from the flood. Painted in his final years, it was revered by Romantics from Constable to Turner for its bleak grandeur. Just as Poussin reduced humanity to desperate specks amid an engulfing deluge, the monsoon torrents of northern India dwarfed the villagers of Kashmir and Nagaland beneath rising water and collapsing hills.",
        "excerpt": "Poussin drains the scene of colour, letting a livid grey-green gloom stand for the extinction of the world. A jagged flash of lightning is the only light, catching a swamped boat, a floating body and hands stretched out of the water toward a rock that offers no rescue. Nature is monumental and indifferent, and the human figures are almost too small to find, tiny against the immensity of the closing flood.",
        "source": "Nicolas Poussin, L'Hiver ou Le Deluge (Winter, or The Flood), oil on canvas, 1660–1664, Musee du Louvre, Paris (INV 7306); Louvre collections online.",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010066113",
        "image": {
          "src": "/covers/northern-india-floods-landslides-kill-25--a4.png",
          "alt": "Poussin's dark painting of the biblical flood, with tiny figures clinging to rocks under a lightning-lit sky.",
          "credit": "Nicolas Poussin, 'Winter (The Flood),' 1660–1664, Musee du Louvre, Paris; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven's Sixth Symphony in F major, the 'Pastoral,' first performed in Vienna in December 1808, celebrates the countryside but places a violent thunderstorm at its heart. Its fourth movement, marked Allegro and titled Gewitter, Sturm ('Thunder, Storm'), erupts without pause after a scene of peasant merrymaking: distant rumbles in the low strings swell into crashing timpani thunder, a shrieking piccolo, trombones and pounding tremolando strings as sheeting rain and wind overwhelm the pastoral idyll. Beethoven, who loved to walk in nature, captures the sheer terror of the elements before the storm subsides into a grateful hymn of calm. It remains music's most famous portrait of nature turning suddenly and overwhelmingly destructive. Just as Beethoven's storm shatters a peaceful landscape with sudden, engulfing force, the torrential monsoon rains burst upon the hills and valleys of northern India, sweeping away homes and lives in Poonch, Rajouri, Doda and Nagaland.",
        "excerpt": "Out of a hush the double basses growl the first far-off thunder, then the whole orchestra breaks loose: timpani hammer, the piccolo tears through the texture like lightning, and trombones enter for the first time in the symphony as the tempest reaches its height. Beethoven lets the fury spend itself gradually, the rain thinning to a few dripping figures in the strings before a shepherd's pipe signals that the storm has passed.",
        "source": "Ludwig van Beethoven, Symphony No. 6 in F major, Op. 68 ('Pastoral'), fourth movement 'Gewitter, Sturm' (1808), via IMSLP.",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/northern-india-floods-landslides-kill-25--a5.png",
          "alt": "Joseph Karl Stieler's 1820 portrait of Ludwig van Beethoven holding a manuscript.",
          "credit": "Joseph Karl Stieler, Portrait of Ludwig van Beethoven, 1820; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "norway-opens-2011-massacre-memorial",
    "headline": "Norway opens a permanent memorial in Oslo to the 77 victims of the 2011 terror attacks",
    "overview": "Norway opened a permanent national memorial in Oslo's government quarter to the 77 people killed in the 22 July 2011 terror attacks, days before the 15th anniversary. The artwork, titled 'Upholding' by artist Matias Faldbakken, links the two attack sites and carries the names of all the victims, most of them teenagers gunned down at a Labour Party youth camp on Utoya island. Survivors and the royal family attended the unveiling.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c07r9m22gyyo"
      },
      {
        "name": "The Local Norway",
        "href": "https://www.thelocal.no/20260719/norway-unveils-memorial-to-victims-of-2011-massacre"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-20",
    "image": {
      "src": "/covers/norway-opens-2011-massacre-memorial.png",
      "alt": "A vast crowd holds roses aloft at the rose march outside Oslo City Hall days after the 22 July 2011 attacks",
      "credit": "Ingvild Hunsrod, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 20 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In September 490 BC, on the coastal plain at Marathon, a citizen army of Athenians and their Plataean allies routed a far larger Persian invasion force. When the fighting ended, 192 Athenian dead were cremated where they had fallen and buried beneath a single earthen mound, the Soros, which still rises about nine metres above the plain. Rather than carry them back to the city cemetery, Athens honoured these ordinary soldiers on the very spot, erecting stone stelae inscribed with their names arranged by their ten tribes, and the poet Simonides supplied an epitaph. The mound became a place of pilgrimage and hero-cult for centuries. Just as Athens cut the names of its 192 fallen into stone at the ground where they died, Norway has set the names of its 77 dead into a permanent memorial in the Oslo quarter the killer first attacked.",
        "excerpt": "On the plain is the grave of the Athenians, and upon it are slabs giving the names of the killed according to their tribes",
        "source": "Pausanias, Description of Greece 1.32.3, trans. W. H. S. Jones and H. A. Ormerod (Loeb Classical Library, 1918), via the Periegesis project, Uppsala University.",
        "href": "https://periegesis.abm.uu.se/en/reports.php?reportid=32",
        "image": {
          "src": "/covers/norway-opens-2011-massacre-memorial--a0.png",
          "alt": "The grassy burial mound (Soros) of the 192 Athenians killed at the Battle of Marathon",
          "credit": "The Tumulus of the Athenians (Soros), plain of Marathon, Greece, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In 1981 a 21-year-old Yale undergraduate, Maya Lin, won an open competition of more than 1,400 entries to design a memorial to America's Vietnam dead. Her design rejected heroic statuary: two long wings of polished black granite, sunk into the earth of the National Mall, meeting in a shallow V. Onto the mirror-like stone were incised the names of the fallen, 57,939 at the 1982 dedication and now 58,318, listed not by rank but chronologically, by date of death. Dedicated on 13 November 1982, 'the Wall' became the most visited memorial in Washington; mourners trace names onto paper, leave letters and dog tags, and see their own faces reflected among the dead. Just as Maya Lin let grief speak through the plain recitation of names cut in stone, Faldbakken's Oslo memorial gathers all 77 victims into a single inscribed surface for the living to touch and remember.",
        "excerpt": "Two polished black granite walls, each nearly 250 feet long, angle into the earth to form a shallow V pointing toward the Washington Monument and the Lincoln Memorial. The stone is mirror-bright, so the living see themselves reflected among the incised names of the dead. The names run in the order the soldiers died, so that the war reads as one long, unbroken roll of loss.",
        "source": "Vietnam Veterans Memorial, designed by Maya Lin, dedicated 13 November 1982, Washington, D.C.; National Park Service.",
        "href": "https://www.nps.gov/vive/index.htm",
        "image": {
          "src": "/covers/norway-opens-2011-massacre-memorial--a1.png",
          "alt": "Rows of names of the fallen incised into the polished black granite of the Vietnam Veterans Memorial",
          "credit": "Names on the Vietnam Veterans Memorial, Washington, D.C., via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "After Babylon's armies stormed Jerusalem in 586 BC, burning the Temple and driving its people into exile, an anonymous poet, whom tradition names as the prophet Jeremiah, composed five funeral dirges over the ruined city. The Book of Lamentations mourns a slaughter that spared neither young nor old: streets choked with the dying, mothers bereaved, virgins and young men fallen by the sword. Its first four poems are alphabetic acrostics, each stanza beginning with a successive letter of the Hebrew alphabet, as though grief were being spelled out letter by letter and forced into order. For more than two millennia it has furnished the words of communal mourning after atrocity. Just as Lamentations refuses to look away from the young cut down in a single day of fury, Norway's memorial fixes in stone the names of the teenagers massacred at Utoya, insisting that the loss be seen and named.",
        "excerpt": "Behold, O LORD, and consider to whom thou hast done this. Shall the women eat their fruit, and children of a span long? shall the priest and the prophet be slain in the sanctuary of the LORD?\nThe young and the old lie on the ground in the streets: my virgins and my young men are fallen by the sword; thou hast slain them in the day of thine anger; thou hast killed, and not pitied.",
        "source": "The Holy Bible, King James Version, Lamentations 2:20-21, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations",
        "image": {
          "src": "/covers/norway-opens-2011-massacre-memorial--a2.png",
          "alt": "Rembrandt's painting of the prophet Jeremiah mourning, head in hand, as Jerusalem burns behind him",
          "credit": "Rembrandt, Jeremiah Lamenting the Destruction of Jerusalem, 1630, Rijksmuseum, Amsterdam. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Thomas Gray's 'Elegy Written in a Country Churchyard', completed at Stoke Poges and published in 1751, is English poetry's great meditation on the anonymous dead. Wandering a village graveyard at dusk, the poet contemplates the 'rude forefathers of the hamlet' asleep beneath their mounds, labourers and unknown souls whose lives left no monument but crooked headstones. Against the marble of the mighty he sets the 'frail memorial' of the poor: rough-cut stones on which an unlettered mason has spelt out only a name, a span of years, and a scrap of scripture, imploring the passing stranger for a sigh of remembrance. The poem became the most quoted in the language. Just as Gray insists that even the humblest dead deserve their name and years cut in stone, Faldbakken's memorial gives each of the 77 Norwegian victims an enduring inscription and asks the passer-by to pause.",
        "excerpt": "Yet even these bones from insult to protect\nSome frail memorial still erected nigh,\nWith uncouth rhymes and shapeless sculpture decked,\nImplores the passing tribute of a sigh.\n\nTheir name, their years, spelt by the unlettered muse,\nThe place of fame and elegy supply:\nAnd many a holy text around she strews,\nThat teach the rustic moralist to die.",
        "source": "Thomas Gray, 'Elegy Written in a Country Churchyard' (1751), via the Thomas Gray Archive.",
        "href": "https://www.thomasgray.org/texts/poems/elcc",
        "image": {
          "src": "/covers/norway-opens-2011-massacre-memorial--a3.png",
          "alt": "Oil portrait of the poet Thomas Gray holding a scroll",
          "credit": "John Giles Eccardt, Portrait of Thomas Gray, 1747-48, National Portrait Gallery, London. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "On 23 October 1914, in the war's first weeks, the German artist Kathe Kollwitz lost her son Peter, an eighteen-year-old volunteer, near Diksmuide in Flanders. For nearly two decades she laboured over a memorial, discarding version after version, until in 1932 she completed two over-life-size figures carved in Belgian granite: a mother and a father kneeling in grief, their faces her own and her husband Karl's. Installed at the Roggevelde cemetery beside Peter's grave, and later moved to Vladslo, where the parents now kneel before 25,644 German dead, the figures do not glorify sacrifice but simply mourn. Just as Kollwitz turned a parent's unbearable loss of a teenage son into enduring stone, Norway's memorial to the young dead of Utoya translates private, inconsolable grief into a public monument of granite and name.",
        "excerpt": "Two massive granite figures kneel a little apart on the grass: a mother folding into herself, arms crossed over her breast, and a father upright and rigid, holding in his own grief. Their bowed heads face the field of flat grave markers. There is no heroism here and no allegory, only two parents, carved larger than life, kept forever at the edge of their child's grave.",
        "source": "Kathe Kollwitz, The Grieving Parents (Die trauernden Eltern), 1932, Vladslo German war cemetery, Belgium; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Het_treurende_ouderpaar_-_K%C3%A4the_Kolwitz.JPG",
        "image": {
          "src": "/covers/norway-opens-2011-massacre-memorial--a4.png",
          "alt": "Kathe Kollwitz's granite sculpture of a grieving mother and father kneeling at Vladslo German war cemetery",
          "credit": "Kathe Kollwitz, The Grieving Parents, 1932, Vladslo German war cemetery; photo by 1970gemini, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Between 1865 and 1868 Johannes Brahms wrote 'Ein deutsches Requiem', his largest work, in the shadow of two deaths: his mother's and, years earlier, that of his mentor Robert Schumann. Breaking with the Latin Mass for the dead, Brahms chose his own texts from Luther's German Bible, and pointedly began not with the terrors of judgement but with consolation for the bereaved: 'Selig sind, die da Leid tragen', 'Blessed are they that mourn, for they shall be comforted.' Scored with no violins at the outset, its seven movements, first performed complete in 1869, turn the listener's gaze from the dead toward the living who must go on grieving. Just as Brahms conceived a requiem addressed to mourners rather than to the departed, Norway's new memorial is built above all for the survivors and bereaved families who gather each 22 July to remember the 77.",
        "excerpt": "Brahms opens without violins, the lower strings and chorus rising in a slow, consoling hush on the words 'Blessed are they that mourn.' Across seven movements the music moves from the ache of loss toward a hard-won comfort, never naming Christ, addressing itself instead to everyone left behind. Its central soprano solo, added after his mother's death, promises 'As one whom his mother comforteth, so will I comfort you.'",
        "source": "Johannes Brahms, Ein deutsches Requiem, Op. 45 (1868); full score via IMSLP.",
        "href": "https://imslp.org/wiki/Ein_deutsches_Requiem,_Op.45_(Brahms,_Johannes)",
        "image": {
          "src": "/covers/norway-opens-2011-massacre-memorial--a5.png",
          "alt": "Photograph of the young composer Johannes Brahms, 1853.",
          "credit": "Johannes Brahms, photograph, 1853. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "nyc-legionnaires-outbreak-second-death",
    "headline": "A second person dies in a Legionnaires' disease outbreak on Manhattan's Upper East Side",
    "overview": "A second person, an 88-year-old man, has died in a Legionnaires' disease outbreak on Manhattan's Upper East Side that has sickened about 72 people, New York City health officials said. Authorities believe the source, contaminated cooling towers in the neighborhood, has been cleaned and that new cases are declining. Nine people remained hospitalized.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxNYnpNVzMzNXVpaFpYOVV0QjZqWTctTVFaeHJ3WUE2WmxheUdtT2x2UmNRMHo3clZhSTdWN0FCM2REd2lTNGF6YWRLRWhGbzBaUkxRaUpVLUgxajlFQWF6ZVlJdjgxMTB2cHBydkZuZzlMVFpyeTMyXzduSEpxcWRGSnFybGtETGtLUm9sNDROY2dFa28?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://www.nbcnews.com/health/health-news/second-person-dies-legionnaires-disease-new-york-city-rcna588240"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-20",
    "image": {
      "src": "/covers/nyc-legionnaires-outbreak-second-death.png",
      "alt": "Transmission electron micrograph of rod-shaped Legionella pneumophila bacteria, the cause of Legionnaires' disease",
      "credit": "CDC/Public Health Image Library #1187, public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 20 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 430 BC, in the second summer of the Peloponnesian War, a devastating plague swept through Athens, whose population had swollen with country folk crowded behind the Long Walls at Pericles' urging. The historian Thucydides, who caught the disease and survived, recorded that it began with fever and inflamed eyes, then coughing, vomiting, ulceration and unquenchable thirst, turning the packed, unsanitary city into a charnel house. Physicians, ignorant of its cause, died fastest of all, and prayer and oracle proved useless. Perhaps a quarter of the population perished over the following years, among them Pericles himself in 429 BC, and the catastrophe broke Athenian morale. Just as New York's health officials scrambled to name and cleanse the source of an unseen killer as the Upper East Side toll rose to a second death, the Athenians faced a contagion whose origin baffled every authority they trusted.",
        "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often; nor did any human art succeed any better. Supplications in the temples, divinations, and so forth were found equally futile, till the overwhelming nature of the disaster at last put a stop to them altogether.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (the Plague of Athens), trans. Richard Crawley (1874), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
        "image": {
          "src": "/covers/nyc-legionnaires-outbreak-second-death--a0.png",
          "alt": "Baroque painting of a plague in an ancient city, with dead and dying figures sprawled among classical ruins",
          "credit": "Michiel Sweerts, Plague in an Ancient City, c. 1652-1654, Los Angeles County Museum of Art. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In late August 1854, cholera erupted in London's Soho district, killing more than 500 people within ten days around Broad Street. Rejecting the reigning theory that 'bad air' caused the disease, the physician John Snow plotted each death on a street map and saw the cases cluster tightly around a single public water pump. He interviewed families, chased down anomalies, and identified the pump, later found contaminated by a leaking cesspool, as the common source. On 7 September he persuaded the Board of Guardians of St James's parish to act, and the pump handle was removed the next day; new cases, already ebbing, dwindled. Snow's shoe-leather detective work is celebrated as a founding moment of epidemiology. Just as New York investigators linked about 72 illnesses to specific rooftop cooling towers and moved to disinfect them, Snow located an invisible waterborne source and simply shut it off.",
        "excerpt": "I had an interview with the Board of Guardians of St. James's parish, on the evening of Thursday, 7th September, and represented the above circumstances to them. In consequence of what I said, the handle of the pump was removed on the following day.",
        "source": "John Snow, On the Mode of Communication of Cholera, 2nd ed. (London, 1855), via Project Gutenberg eBook #72894.",
        "href": "https://www.gutenberg.org/ebooks/72894",
        "image": {
          "src": "/covers/nyc-legionnaires-outbreak-second-death--a1.png",
          "alt": "John Snow's 1854 map of Soho showing cholera deaths clustered around the Broad Street water pump",
          "credit": "John Snow, map of the Soho cholera epidemic of 1854 (from On the Mode of Communication of Cholera, 1855). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Daniel Defoe's A Journal of the Plague Year, published in 1722 but set during the Great Plague of London of 1665, purports to be the eyewitness account of a saddler identified only as H.F. who stays behind in the stricken city. Drawing on parish 'bills of mortality' and his own childhood memories, Defoe chronicles shuttered houses daubed with red crosses, hired watchmen, midnight burial carts, mass graves, and a death toll approaching 100,000. His narrator obsessively theorizes how the sickness passes from body to body by unseen 'effluvia,' groping toward a germ theory nearly two centuries early. Just as scientists now track the microscopic Legionella bacteria drifting invisibly on mist from Manhattan cooling towers, Defoe's narrator strained to comprehend an unseen contagion moving silently through a frightened metropolis.",
        "excerpt": "This put it out of question to me, that the calamity was spread by infection; that is to say, by some certain steams or fumes, which the physicians call effluvia, by the breath, or by the sweat, or by the stench of the sores of the sick persons, or some other way, perhaps, beyond even the reach of the physicians themselves, which effluvia affected the sound who came within certain distances of the sick, immediately penetrating the vital parts of the said sound persons, putting their blood into an immediate ferment, and agitating their spirits to that degree which it was found they were agitated; and so those newly infected persons communicated it in the same manner to others.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722), via Project Gutenberg eBook #376.",
        "href": "https://www.gutenberg.org/ebooks/376",
        "image": {
          "src": "/covers/nyc-legionnaires-outbreak-second-death--a2.png",
          "alt": "Portrait of the English writer Daniel Defoe in a full wig, after Godfrey Kneller",
          "credit": "Portrait of Daniel Defoe, after Godfrey Kneller. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Edgar Allan Poe's 1842 tale 'The Masque of the Red Death,' Prince Prospero tries to outrun a pestilence that has already killed half his subjects by sealing himself and a thousand nobles inside a fortified abbey stocked with every pleasure. He throws a masked ball across seven vividly colored rooms, the last draped in black and lit blood-red, where a great ebony clock tolls each hour and stills the dancers. At midnight a figure in the grave-clothes and blood-dabbled mask of the Red Death itself appears; when Prospero confronts it, he falls dead, and one by one his guests perish too. Poe's parable insists that no wall, wealth, or revelry can keep contagion out. Just as an 88-year-old man became the second to die amid the affluence of the Upper East Side, Poe warns that neither privilege nor precaution can seal a community off from an unseen death.",
        "excerpt": "The \"Red Death\" had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal—the redness and the horror of blood. There were sharp pains, and sudden dizziness, and then profuse bleeding at the pores, with dissolution. The scarlet stains upon the body and especially upon the face of the victim, were the pest ban which shut him out from the aid and from the sympathy of his fellow-men. And the whole seizure, progress and termination of the disease, were the incidents of half an hour.",
        "source": "Edgar Allan Poe, 'The Masque of the Red Death' (1842), via the Edgar Allan Poe Society of Baltimore (eapoe.org).",
        "href": "https://www.eapoe.org/works/tales/masqueb.htm",
        "image": {
          "src": "/covers/nyc-legionnaires-outbreak-second-death--a3.png",
          "alt": "Portrait of Edgar Allan Poe based on an 1848 daguerreotype",
          "credit": "Retouched portrait of Edgar Allan Poe, based on an 1848 daguerreotype. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin painted Die Pest (The Plague) in 1898, near the end of a century scarred by recurring cholera epidemics that had killed thousands across Europe and by his own losses of children to disease. In sombre, sickly greens and browns, a skeletal figure of Death rides a winged, dragon-like beast low along a narrow medieval street, its breath sweeping down upon the townsfolk. A woman lies dead across the foreground stones while others flee or collapse against the walls; the tall houses press in, offering no way out. Böcklin rendered pestilence not as statistic but as a living force loosed upon an ordinary town. Just as an unseen bacterium rode the mist of rooftop cooling towers into the lungs of Upper East Side residents, Böcklin's Death rides its beast through the city's streets, indifferent to who happens to fall beneath it.",
        "excerpt": "Death, a grinning skeleton, hunches forward on the neck of a leathery winged dragon that skims just above the cobblestones, a scythe in its grip. Its passage leaves bodies crumpled in the gutter of a steep, shadowed street, while the pale survivors recoil helplessly against the walls. Böcklin drains the scene of nearly all colour, so that the whole town seems already half-consumed by the sickness.",
        "source": "Arnold Böcklin, Die Pest (The Plague), 1898, Kunstmuseum Basel, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/nyc-legionnaires-outbreak-second-death--a4.png",
          "alt": "Arnold Böcklin's painting The Plague, showing Death astride a winged beast flying low through a medieval street strewn with victims",
          "credit": "Arnold Böcklin, Die Pest (The Plague), 1898, Kunstmuseum Basel. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns's symphonic poem Danse macabre, Op. 40, first performed in Paris in 1875, sets to music an old European superstition: that on Halloween at midnight Death appears as a fiddler and calls the dead from their graves to dance until dawn. A harp strikes twelve; a solo violin, deliberately mistuned to a dissonant tritone, the medieval 'devil's interval,' summons the skeletons, whose rattling bones the composer evokes with a xylophone. The plainchant Dies irae, the church's ancient melody of the dead, threads through the whirling waltz until an oboe's cockcrow scatters the revelers back underground. Just as the Upper East Side counts its dead even as officials promise the danger is receding, Saint-Saëns's midnight dance reminds a city that pestilence levels age and rank alike, whirling on until the dawn at last breaks its spell.",
        "excerpt": "The piece opens with twelve plucked harp notes tolling midnight, answered by a solo violin tuned to a jarring, diabolical interval. Xylophone bones clatter over a swirling waltz as flutes and strings pass the dance between a living melody and the grim Dies irae. At the close a single oboe crows like the dawn cock, and the music evaporates as the dead sink back into their tombs.",
        "source": "Camille Saint-Saëns, Danse macabre, Op. 40 (1874), via IMSLP.",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)",
        "image": {
          "src": "/covers/nyc-legionnaires-outbreak-second-death--a5.png",
          "alt": "Photographic portrait of composer Camille Saint-Saëns by Nadar",
          "credit": "Camille Saint-Saëns photographed by Nadar. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "ryan-fox-wins-british-open-2026",
    "headline": "Ryan Fox of New Zealand wins the British Open at Royal Birkdale with a birdie on the final hole",
    "overview": "Ryan Fox of New Zealand won the 154th Open Championship at Royal Birkdale, sinking a birdie putt on the 18th to finish at 10-under 270 and edge Cameron Young by a stroke. It was the 39-year-old's first major title after 29 previous major starts without a top-10 finish. Fox became only the third New Zealander to win a major championship.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNMUVncGxDQmt1amhORWMzWWtvd09La2JhYXJQZUZsOTVwM1ExZmJ5S1NZb29uS0RqVzVFS2c0WmdtRDZBVU15SzM5RC01cWpISkpfSHdZQk9ObzJ4Y28zTFZ4MGdxYUpDaUx6SU1QRy01ZzBiSlVjbjlTelhRRjEtWmZsRGpIUE5hOXlGLUdRMmlzb0FrU3ZJMVh1TFZyTi1tWDcxaGZPMA?oc=5"
      },
      {
        "name": "Golf Digest",
        "href": "https://www.golfdigest.com/story/openchampionship2026-ryan-fox-wins-at-royal-birkdale-cameron-young"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-20",
    "image": {
      "src": "/covers/ryan-fox-wins-british-open-2026.png",
      "alt": "New Zealand professional golfer Ryan Fox pictured at the 2025 Travelers Championship.",
      "credit": "Photo by Bryan Berlin (Berlination), CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 20 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In September 480 BC the Greek city-states, outnumbered and quarreling, faced the vast fleet of the Persian king Xerxes in the narrow strait of Salamis. The Athenian commander Themistocles—jeered by the Corinthian Adeimantus as a man with no city to call his own, for Athens itself had just been burned—insisted the allies fight in the cramped waters where Persian numbers counted for nothing. When Adeimantus scoffed that at the Games those who start too soon are scourged, Themistocles shot back that those who wait too late are never crowned. Luring the enemy into the channel, the Greek triremes rammed and shattered the Persian armada, disabling hundreds of ships in one decisive day and turning back the invasion. Just as Themistocles, the derided outsider, seized the great prize with one crowning stroke, Ryan Fox—long dismissed among golf's elite—struck the winning birdie at Royal Birkdale to claim The Open at last.",
        "excerpt": "Far the greater number of the Persian ships engaged in this battle were disabled, either by the Athenians or by the Eginetans.",
        "source": "Herodotus, The Histories, Book VIII (trans. George Rawlinson, 1858–60), via the Internet Classics Archive (MIT)",
        "href": "https://classics.mit.edu/Herodotus/history.8.viii.html",
        "image": {
          "src": "/covers/ryan-fox-wins-british-open-2026--a0.png",
          "alt": "Wilhelm von Kaulbach's 1868 painting of the naval Battle of Salamis, Greek and Persian ships locked in combat.",
          "credit": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis, 1868, Maximilianeum. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "By 1858 Abraham Lincoln had absorbed a lifetime of political defeats: a failed bid for the Illinois legislature in 1832, an unsuccessful run for the U.S. Senate in 1855, a losing vice-presidential nomination in 1856. That November, after his celebrated debates with Stephen Douglas, he lost the Senate race yet again. Writing to his friend Dr. Anson G. Henry, the weary prairie lawyer supposed he would now sink out of view, yet believed he had made some marks for the cause of liberty. Two years later the outsider from the frontier won the presidency of the United States. Just as Lincoln climbed to the highest prize only after a string of near-misses and public dismissal, Ryan Fox—winless in 29 major starts and never once a top-ten finisher—finally broke through at Royal Birkdale to lift the Claret Jug at thirty-nine.",
        "excerpt": "I am glad I made the late race. It gave me a hearing on the great and durable question of the age, which I could have had in no other way; and though I now sink out of view, and shall be forgotten, I believe I have made some marks which will tell for the cause of civil liberty long after I am gone.",
        "source": "Abraham Lincoln, letter to Anson G. Henry, November 19, 1858, in Roy P. Basler, ed., The Collected Works of Abraham Lincoln, vol. III; via the U.S. National Park Service",
        "href": "https://www.nps.gov/liho/learn/historyculture/loss1858.htm",
        "image": {
          "src": "/covers/ryan-fox-wins-british-open-2026--a1.png",
          "alt": "Beardless photographic portrait of Abraham Lincoln taken by Alexander Hesler in 1857.",
          "credit": "Abraham Lincoln, photograph by Alexander Hesler, 1857. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In the twenty-first book of Homer's Odyssey, the hero returns to Ithaca after twenty years of war and wandering, disguised in a beggar's rags and mocked in his own hall. Penelope sets a contest: whoever can string Odysseus's massive bow and shoot an arrow clean through twelve axe-heads will win her hand. One by one the arrogant suitors strain at the bow and fail. Then the ragged stranger lifts it and, effortlessly, strings it; the taut cord sings beneath his hand like a swallow. Setting an arrow to the string, he looses it straight through all twelve axes without missing—then turns the same bow upon the suitors. Just as the long-suffering, unrecognized Odysseus reclaimed everything with a single decisive shot after enduring years of hardship, Ryan Fox—overlooked and doubted through a long career—seized his championship with one clutch birdie on the final hole at Royal Birkdale.",
        "excerpt": "even as when a man well-skilled in the lyre and in song easily stretches the string about a new peg, making fast at either end the twisted sheep-gut—so without effort did Odysseus string the great bow. And he held it in his right hand, and tried the string, which sang sweetly beneath his touch, like to a swallow in tone. ... This he took, and laid upon the bridge of the bow, and drew the bow-string and the notched arrow even from the chair where he sat, and let fly the shaft with sure aim, and did not miss the end of the handle of one of the axes, but clean through and out at the end passed the arrow weighted with bronze.",
        "source": "Homer, The Odyssey, Book 21 (trans. A. T. Murray, Loeb Classical Library, 1919), via the Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D21",
        "image": {
          "src": "/covers/ryan-fox-wins-british-open-2026--a2.png",
          "alt": "Engraving of Odysseus shooting an arrow through the twelve axe-heads while the suitors look on.",
          "credit": "Theodor van Thulden (1606–1669), Odysseus's shot through the twelve axes, engraving from the Foulis edition of Homer (Glasgow, 1758). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Around 476 BC the poet Pindar composed his first Olympian Ode to honour Hieron of Syracuse, victor in the single-horse race at Olympia, and wove into it the myth of Pelops. To win Hippodameia, Pelops had to beat her father Oinomaos in a deadly chariot race that thirteen earlier suitors had lost with their lives. On the eve of the contest Pelops went down alone in the darkness to the edge of the grey sea and called upon Poseidon, lord of the trident, who granted him a golden car and tireless winged steeds. With them he overcame Oinomaos in the decisive race and carried off both his bride and his glory. Just as Pelops, the lone underdog, staked everything on one climactic contest and seized the great prize, Ryan Fox summoned his finest effort on the last hole at Royal Birkdale, winning The Open with a single decisive birdie.",
        "excerpt": "And he came and stood upon the margin of the hoary sea, alone in the darkness of the night, and called aloud on the deep-voiced Wielder of the Trident; and he appeared unto him nigh at his foot. ... Thus spake he, nor were his words in vain: for the god made him a glorious gift of a golden car and winged untiring steeds: so he overcame Oinomaos and won the maiden for his bride.",
        "source": "Pindar, Olympian Ode 1 (for Hieron of Syracuse), trans. Ernest Myers, 1874, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/1",
        "image": {
          "src": "/covers/ryan-fox-wins-british-open-2026--a3.png",
          "alt": "Roman marble bust believed to portray the Greek lyric poet Pindar, seen in three-quarter view.",
          "credit": "Bust of Pindar, Roman copy after a Greek original (mid-5th century BC), Museo Archeologico Nazionale, Naples; photo by Stas Kozlovsky, CC BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven completed his Symphony No. 5 in C minor, Op. 67, in 1808, as encroaching deafness threatened to end the life he had built on sound. The work opens with its famous four-note motif—three short notes and a long—hammered out in brooding, turbulent C minor, a figure often described as fate knocking at the door. Across four movements the music struggles, gathers, and at last erupts, without pause, from the shadowy scherzo into a blazing C-major finale reinforced by trombones and piccolo: darkness conquered, victory seized. It stands among art's supreme dramas of adversity transfigured into triumph through sheer perseverance. Just as Beethoven forged glory out of long suffering, driving the symphony from struggle to a hard-won C-major victory, Ryan Fox turned years of near-misses into triumph, carrying his long campaign to a jubilant finish on the eighteenth at Royal Birkdale.",
        "excerpt": "From the hushed, ominous hammer-strokes of the opening Allegro con brio, the symphony wages a four-movement struggle in stormy C minor. Then, without a break, the shadowy scherzo swells through a long crescendo and bursts into the triumphant C-major finale, trombones blazing. It is the sound of fate resisted and, at the last, overcome.",
        "source": "Ludwig van Beethoven, Symphony No. 5 in C minor, Op. 67 (1808); score via IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.5,_Op.67_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/ryan-fox-wins-british-open-2026--a4.png",
          "alt": "Christian Horneman's 1803 miniature portrait of Ludwig van Beethoven.",
          "credit": "Ludwig van Beethoven, miniature by Christian Horneman, 1803. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Charioteer of Delphi, a life-size bronze standing about 1.8 metres tall, was cast around 470 BC and dedicated at the Sanctuary of Apollo at Delphi to commemorate a victory in the chariot race of the Pythian Games, offered by Polyzalos of Gela. Once part of a larger group with a chariot and horses, the surviving figure shows the young driver standing erect in the instant after his triumph, the reins still gathered in his right hand, his inlaid glass-and-stone eyes gazing calmly ahead. One of the finest works of the Severe style to survive from antiquity, it was buried by a rockfall and rediscovered only in 1896. Just as the charioteer was raised in enduring bronze to immortalise a hard-won victory in the games, Ryan Fox's triumph at Royal Birkdale—sealed with a birdie on the final hole—crowned a long, patient career with the great prize he had so long pursued.",
        "excerpt": "Cast in bronze and inlaid with glass and stone eyes, the youth stands utterly composed, the long pleated chiton falling from his waist like the fluting of a marble column. He holds the remnants of the reins in one outstretched hand, the calm of victory already settled upon him. Buried and forgotten for more than two thousand years, he still embodies the quiet dignity of a champion in the moment of his triumph.",
        "source": "Charioteer of Delphi (Heniokhos), bronze, c. 470 BC; Delphi Archaeological Museum, Greece",
        "href": "https://commons.wikimedia.org/wiki/File:Delphi_charioteer_front_DSC06255.JPG",
        "image": {
          "src": "/covers/ryan-fox-wins-british-open-2026--a5.png",
          "alt": "The bronze Charioteer of Delphi, a standing young chariot driver in a long pleated robe holding the reins, front view.",
          "credit": "Charioteer of Delphi, c. 470 BC, Delphi Archaeological Museum; photo by David Monniaux, CC BY-SA, via Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "jd-vance-usha-vance-welcome-son",
    "headline": "Vice President JD Vance and his wife Usha welcome a son, the first child born to a sitting U.S. VP in over 150 years",
    "overview": "Vice President JD Vance and his wife, Usha Vance, announced the birth of a baby boy, the first child born to a sitting U.S. vice president in more than 150 years. The couple, who have three older children, shared the news publicly. The last such birth dates to the 19th century.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxNRzBJS1czWDNOM2hJZkpCNXVtQ2huZEdfMUZQMXpZM3Z0aG4tR0tVX3JaSVdWWFJlSkF2bDJMTnMtcEc5WDZaaTQ3UEtiVDZJVjFyaGV1UmJtc0dkSGFrWm9IbUhucEFPcldTanJyMGVMM0hyNm5LOGR2TTF5aXZZa1dCOTVfX08zV004TlRn?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQdmxnSVc2b0hNWlpUOU40am9DazNNdnowN0QtYjV1cXBiaURBUndtejJWaVBNLUktZVpCT3c0TXBEWEdkbUVudms4RFpkNUM4cmZuLW5vYlpWQjd6WVhsVnRCTFYzVDU1bTgtODJWdGF6dDA1cjRqMUU0bzJWU01aM09sQktqMmFnMVlDWXJKU08zRFNTUUE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-20",
    "image": {
      "src": "/covers/jd-vance-usha-vance-welcome-son.png",
      "alt": "Vice President JD Vance and his wife Usha Vance together at an official function.",
      "credit": "Office of the Vice President of the United States, public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 20 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 5 September 1638, at the Chateau-Neuf de Saint-Germain-en-Laye, Queen Anne of Austria gave birth to a son after twenty-three years of a marriage long thought barren. King Louis XIII, then reigning, had the boy christened Louis-Dieudonne, \"Louis the God-given.\" France, starved for a direct heir, erupted in joy: Te Deums rang in the cathedrals, bonfires blazed in Paris, cannon thundered, and ambassadors carried the news across Europe. The infant, who would become Louis XIV and reign seventy-two years, was hailed as a miracle of continuity for the Bourbon line and a pledge of the kingdom's future, briefly softening the image of a monarch consumed by war with Spain and the intrigues of Cardinal Richelieu. Just as France celebrated the God-given Dauphin born to its reigning king, the United States marked the arrival of a son to a sitting vice president as a moment of renewal amid the weight of office.",
        "excerpt": "The birth of the long-awaited heir turned a private royal confinement into a public festival of thanksgiving. A childless king and queen who had all but abandoned hope were suddenly the parents of a Dauphin, and the whole realm read the event as a sign that the dynasty, and with it the peace of France, would endure.",
        "source": "Birth of Louis XIV (Louis-Dieudonne), 5 September 1638; see 'Louis XIV,' via Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Louis_XIV",
        "image": {
          "src": "/covers/jd-vance-usha-vance-welcome-son--a0.png",
          "alt": "Painting of the infant Louis XIV of France held by his royal nurse.",
          "credit": "Circle of Pierre Mignard, 'Portrait of Louis XIV as an infant, with the royal nurse'; Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On 9 September 1893, in an upstairs room of the White House, Frances Folsom Cleveland gave birth to a daughter, Esther, during the second term of her husband, President Grover Cleveland. Esther was the first, and remains the only, child of a sitting president to be born inside the executive mansion, earning her the nickname \"the White House baby.\" The birth captivated a curious public: newspapers reported each detail, and the nation, weary of that year's financial panic, embraced the domestic scene unfolding at the very heart of national power. Cleveland, a famously stern and overworked chief executive, guarded his family's privacy fiercely even as the country claimed a share in the joy. Just as Esther Cleveland's birth in the White House made a private family milestone a national event unmatched for generations, JD and Usha Vance's newborn son became the first child born to a sitting vice president in more than 150 years.",
        "excerpt": "That a child should be born within the walls of the president's own house struck Americans as extraordinary, a homely miracle at the summit of the state. The papers dubbed her the White House baby, and a public wearied by hard times found in the small arrival a welcome reminder that ordinary life, and hope, persisted even in the seat of power.",
        "source": "Esther Cleveland (b. 9 September 1893), 'the White House baby'; see 'Esther Cleveland,' via Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Esther_Cleveland",
        "image": {
          "src": "/covers/jd-vance-usha-vance-welcome-son--a1.png",
          "alt": "Portrait photograph of Esther Cleveland, daughter of President Grover Cleveland.",
          "credit": "Esther Cleveland, Library of Congress; Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Around 40 BC, in the fourth of his pastoral Eclogues, the Roman poet Virgil hailed the imminent birth of a boy whose coming would roll back the ages and restore a golden age of peace. Written amid the exhaustion of civil war and addressed to the consul Pollio, the poem imagines the newborn growing to rule a world pacified by his father, with the earth itself offering flowers at his cradle. So luminous was its vision of a child-redeemer that later Christians read it as an unwitting prophecy of Christ, and Dante made Virgil his guide partly on its strength. The poem fuses the intimate wonder of a single birth with the vast hope of a people weary of strife. Just as Virgil saw in one child's birth the promise of renewal for a troubled age, the arrival of the Vances' son offered a note of hope and continuity amid the burdens of public office.",
        "excerpt": "The Virgin reappears and Saturn reigns:\nFrom heav'n descends a novel progeny;\nNow to this child in whom the iron race\nThroughout the world shall cease and turn to gold,\nExtend thy aid, Lucina, chaste and kind,\nFor thy Apollo reigns.",
        "source": "Virgil, Eclogue IV, trans. John William Mackail (1908), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Eclogues_of_Virgil_(1908)/Eclogue_4",
        "image": {
          "src": "/covers/jd-vance-usha-vance-welcome-son--a2.png",
          "alt": "Roman mosaic of the poet Virgil seated between two Muses, holding a scroll of the Aeneid.",
          "credit": "Virgil flanked by the Muses Clio and Melpomene, Roman mosaic, 3rd century AD, Bardo National Museum, Tunis; Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare and John Fletcher's late history play Henry VIII (All Is True), first performed in 1613, the final scene stages the christening of the infant Princess Elizabeth. Archbishop Cranmer, cradling the baby, delivers a soaring prophecy: this \"royal infant,\" though still in her cradle, will bring \"a thousand thousand blessings\" upon the land and grow into a paragon of princes. The speech transforms a royal nursery into a stage for national destiny, folding the tenderness of a newborn into the grand hopes of a kingdom and its succession. Written for the court of James I, Elizabeth's successor, it flatters the crown while celebrating the continuity that a child secures. Just as Cranmer beheld in a swaddled infant the future of a nation, the birth of JD and Usha Vance's son set a small, tender life against the weight of the office its father holds.",
        "excerpt": "This royal infant--heaven still move about her!--\nThough in her cradle, yet now promises\nUpon this land a thousand thousand blessings,\nWhich time shall bring to ripeness: she shall be--\nBut few now living can behold that goodness--\nA pattern to all princes living with her",
        "source": "William Shakespeare and John Fletcher, King Henry VIII, Act 5, Scene 5 (Cranmer's prophecy), c. 1613, via The Complete Works of William Shakespeare (MIT).",
        "href": "https://shakespeare.mit.edu/henryviii/henryviii.5.5.html",
        "image": {
          "src": "/covers/jd-vance-usha-vance-welcome-son--a3.png",
          "alt": "The Chandos portrait, a painting believed to depict William Shakespeare.",
          "credit": "The Chandos portrait, attributed to John Taylor, c. 1600-1610, National Portrait Gallery, London; Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Between 1622 and 1625, Peter Paul Rubens painted a monumental cycle of twenty-four canvases glorifying the life of Marie de' Medici, Queen of France, for her Luxembourg Palace in Paris; the paintings now hang in the Louvre. One vast canvas depicts the birth of the future Louis XIII at Fontainebleau on 27 September 1601. Rubens renders the royal delivery as cosmic allegory: the queen reclines, radiant, while Justice, the goddess Astraea, returns to earth and the infant is entrusted to Themis, goddess of divine order, signifying his birthright to the throne. Cherubs, a cornucopia, and personified virtues crowd the scene, transfiguring a private birth into a promise of dynastic continuity and national peace. Just as Rubens exalted the birth of a royal heir as a pledge of order and hope for the realm, the Vances' newborn son marked a rare moment of new life within the highest circle of American public life.",
        "excerpt": "Rubens stages the delivery like a heavenly event: light pours over the exhausted, glowing queen while allegorical figures crowd in to receive the child. Justice descends and Divine Order takes the infant into her arms, so that a bloody, dangerous confinement becomes a serene emblem of a kingdom's future secured by a single newborn heir.",
        "source": "Peter Paul Rubens, 'The Birth of Louis XIII at Fontainebleau' (Marie de' Medici cycle), 1622-1625, Musee du Louvre, Paris; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:0_La_Naissance_du_dauphin_%C3%A0_Fontainebleau_-_P.P._Rubens_-_Louvre_2.JPG",
        "image": {
          "src": "/covers/jd-vance-usha-vance-welcome-son--a4.png",
          "alt": "Rubens's allegorical painting of the birth of the Dauphin, the future Louis XIII, at Fontainebleau.",
          "credit": "Peter Paul Rubens, 'The Birth of Louis XIII at Fontainebleau' (Marie de' Medici cycle), 1622-1625, Musee du Louvre; Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In 1868 Johannes Brahms published his \"Wiegenlied\" (Lullaby), Op. 49, No. 4, one of the most beloved cradle songs ever written. He composed it for his friend Bertha Faber to mark the birth of her second son, weaving into the piano accompaniment, as a hidden counter-melody, a folk tune she had once sung to him. Over a gently rocking accompaniment the voice murmurs \"Guten Abend, gut' Nacht\"--good evening, good night--wishing the sleeping infant a night watched over by roses and angels. In a few tender bars the song distills the universal hush of a family bending over a newborn's cradle. Just as Brahms turned the birth of a friend's child into music of pure, protective tenderness, the arrival of a son to JD and Usha Vance set a moment of intimate family gentleness against the public gravity of the vice presidency.",
        "excerpt": "The melody sways above a softly syncopated accompaniment that seems to rock the cradle itself, unhurried and endlessly gentle. Brahms asks for almost nothing loud; the whole song is a whispered benediction over a sleeping child, and its tenderness has made it, for generations, the sound of a parent watching over a newborn.",
        "source": "Johannes Brahms, 'Wiegenlied,' Op. 49, No. 4 (Funf Lieder), first published by N. Simrock, 1868; via IMSLP.",
        "href": "https://imslp.org/wiki/5_Lieder,_Op.49_(Brahms,_Johannes)",
        "image": {
          "src": "/covers/jd-vance-usha-vance-welcome-son--a5.png",
          "alt": "Photographic portrait of the composer Johannes Brahms.",
          "credit": "Johannes Brahms, photograph, late 19th century; Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "lockheed-cheaper-patriot-pac3-ace",
    "headline": "Lockheed Martin unveils a cheaper Patriot interceptor, the PAC-3 ACE, as air-defense demand soars",
    "overview": "Lockheed Martin announced a new, lower-cost Patriot interceptor, the PAC-3 Adapted Capability Effector (ACE), at the Farnborough Airshow, saying it would cost less than half of its roughly $4 million PAC-3 MSE missile. The company said the interceptor, aimed partly at the European market, could reach initial production within 36 months as militaries seek cheaper ways to shoot down drones and missiles. Defense makers are racing to cut the cost-per-kill against mass-produced threats.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxNb1RTMlFEeUZVRDZEVXRrLWdMZGNnODVmM0RMM0FQZEpQb2UxUEN0bG9PUGU0S0ZUWXlwa0lLTXhYc3JjdWVmamlPR09UTWRjbGtmdF9IMjQ5Q2hXMVVtcnVLSE1ZQ1JHdGx3Qy1TNUJ3Q1RfUU9BelJRU2dTU0g5RXRKTGw3UHhCeHVOckYxSHEzUkJTVGU0TGhtYU14QWRCanpta3VrMnl6ZHUwb2hJenp5Z2VPb2gwOGZkLUE0bzNJV3ZBbkFYa21B?oc=5"
      },
      {
        "name": "Aviation Week",
        "href": "https://aviationweek.com/defense/missile-defense-weapons/lockheed-martin-announces-lower-cost-patriot-interceptor"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-20",
    "image": {
      "src": "/covers/lockheed-cheaper-patriot-pac3-ace.png",
      "alt": "A Patriot PAC-3 (ERINT) interceptor missile lifting off in a cloud of exhaust during a test launch.",
      "credit": "Missile Defense Agency, public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 20 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the Roman general Marcus Claudius Marcellus besieged Syracuse by land and sea in 213 BC during the Second Punic War, he expected the wealthy Sicilian city to fall quickly. Instead he met the mind of Archimedes. The geometer had fitted the walls with catapults and stone-throwers of every range; his cranes swung out over the harbour, dropping weights that smashed the Roman galleys or seizing their prows with an iron 'claw' to hoist and capsize them. One engine hurled rocks of ten talents. The assault collapsed into a two-year blockade, and the Romans grew so unnerved that a rope glimpsed over the parapet sent them running. Defence, cleverly engineered, had humbled a superpower's offence. Just as Archimedes' machines turned Syracuse's ramparts into a shield no fleet could rush, Lockheed's cheaper PAC-3 ACE aims to make defence against missiles and drones affordable enough to hold the wall.",
        "excerpt": "In fine, when such terror had seized upon the Romans, that, if they did but see a little rope or a piece of wood from the wall, instantly crying out, that there it was again, Archimedes was about to let fly some engine at them, they turned their backs and fled, Marcellus desisted from conflicts and assaults, putting all his hope in a long siege.",
        "source": "Plutarch, Life of Marcellus, trans. John Dryden, via The Internet Classics Archive (MIT).",
        "href": "http://classics.mit.edu/Plutarch/marcellu.html",
        "image": {
          "src": "/covers/lockheed-cheaper-patriot-pac3-ace--a0.png",
          "alt": "Painting of Archimedes on the walls of Syracuse directing his war machines against the Roman fleet.",
          "credit": "Thomas Ralph Spence, Archimedes Directing the Defences of Syracuse, 1895. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "For a thousand years the Theodosian Walls had shielded Constantinople, turning back Persians, Avars and Arabs. In 1453 the young Ottoman sultan Mehmed II broke them with money and metal. A founder named Urban, spurned by the cash-poor Byzantines, cast for the sultan a monstrous bronze cannon at Adrianople with a bore of twelve palms, throwing a stone ball above six hundred pounds. Gibbon records that the blast was heard for a hundred furlongs and the ball flew above a mile; sixty oxen and two hundred men dragged the gun into place, though it could fire only seven times a day. After a fifty-three-day bombardment the great walls crumbled and the city fell on 29 May. The costliest defence in Christendom was undone by a new offensive weapon. Just as Urban's gun ended the age of impregnable walls, today's cheap drones and missiles threaten to outrun the defences arrayed against them.",
        "excerpt": "The explosion was felt or heard in a circuit of a hundred furlongs: the ball, by the force of gunpowder, was driven above a mile.",
        "source": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire, ch. LXVIII (1788), via the Christian Classics Ethereal Library.",
        "href": "https://www.ccel.org/g/gibbon/decline/volume2/chap68.htm",
        "image": {
          "src": "/covers/lockheed-cheaper-patriot-pac3-ace--a1.png",
          "alt": "The Dardanelles Gun, a giant 15th-century Ottoman bronze bombard, displayed at Fort Nelson.",
          "credit": "Photograph by Gaius Cornelius of the 1464 Dardanelles Gun (Great Turkish Bombard), Royal Armouries, Fort Nelson. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Book 18 of Homer's Iliad, Achilles' friend Patroclus has been killed and stripped of the hero's own armour. His divine mother Thetis climbs to Olympus and begs the smith-god Hephaestus to forge fresh arms. In his bronze-floored workshop the lame god sets twenty bellows blowing, heats silver, gold, tin and stubborn bronze, and hammers out a shield of five layers, embossing on it the whole world: earth, sky and sea, two cities at peace and at war, ploughed fields, a wedding, a vineyard, a dancing-floor. Then he beats out corslet, helmet and greaves. The armour is meant to keep its wearer alive amid the spears of Troy. Just as Hephaestus laboured at the forge to give Achilles a shield equal to the coming battle, Lockheed's engineers race to forge an interceptor that can meet the arrows of a new era at bearable cost.",
        "excerpt": "Then first he formed the immense and solid shield;\nRich various artifice emblazed the field;",
        "source": "Homer, The Iliad, Book XVIII, trans. Alexander Pope (1720), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_18",
        "image": {
          "src": "/covers/lockheed-cheaper-patriot-pac3-ace--a2.png",
          "alt": "Eighteenth-century engraving of the Shield of Achilles as described in Alexander Pope's translation of the Iliad.",
          "credit": "Engraving of the Shield of Achilles from Alexander Pope's translation of the Iliad (1720), unknown engraver. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In the Valley of Elah, the Philistine champion Goliath of Gath, 'six cubits and a span' tall, defied the armies of Israel for forty days. He was a walking arsenal: a brass helmet, a coat of mail weighing five thousand shekels, greaves of brass, and a spear whose iron head alone weighed six hundred shekels, with a shield-bearer marching ahead. Against this the shepherd David refused King Saul's armour and went down with a staff, a sling, and five smooth stones from the brook. A single stone, slung, sank into the giant's forehead and felled him; David took Goliath's own sword to finish the work. The cheapest weapon on the field had beaten the most expensive. Just as one slung stone, costing almost nothing, toppled a champion sheathed in the era's most expensive armour, a cheaper interceptor aims to flip the ruinous economics of firing costly missiles at cheap attackers.",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied.\nAnd David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth.\nSo David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "1 Samuel 17:45, 49-50, King James Version (1611), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel",
        "image": {
          "src": "/covers/lockheed-cheaper-patriot-pac3-ace--a3.png",
          "alt": "Painting of the young David swinging his sling as the armoured giant Goliath advances.",
          "credit": "Osmar Schindler, David und Goliath, c. 1888. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Painted in Rome in 1630 and now in Madrid's Prado, Diego Velazquez's The Forge of Vulcan shows the god of fire at work when Apollo arrives, haloed in light, to reveal that Vulcan's wife Venus has been unfaithful. Around the anvil, four muscular journeymen freeze mid-labour, one still gripping the hammer over a glowing sheet of armour. Velazquez paints no idealised deities but real Spanish workmen, sweat and all, in a smoky shop cluttered with tongs and a half-finished breastplate. It is one of Western art's great images of the arms trade as manual craft, the unglamorous foundry where the weapons and armour of heroes are actually beaten out of hot metal. Just as Velazquez dignifies the forge as the workshop where protection is hammered into being, the contest over cheaper interceptors is, at bottom, a story about the industry and economics of making arms.",
        "excerpt": "In a shadowed Roman workshop, Velazquez freezes the instant a radiant Apollo tells the blacksmith god of his wife's betrayal; the labourers halt, hammers poised, a half-worked breastplate glowing orange on the anvil. Bare-torsoed and sinewy, the smiths are painted as ordinary Spanish tradesmen, their forge the mundane engine behind the armour of gods and heroes.",
        "source": "Diego Velazquez, The Forge of Vulcan (La Fragua de Vulcano), 1630, Museo Nacional del Prado, Madrid; file via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Diego_Vel%C3%A1zquez_-_The_Forge_of_Vulcan_-_WGA24376.jpg",
        "image": {
          "src": "/covers/lockheed-cheaper-patriot-pac3-ace--a4.png",
          "alt": "Baroque painting of Apollo visiting Vulcan and his workmen at a blacksmith's forge, armour on the anvil.",
          "credit": "Diego Velazquez, The Forge of Vulcan, 1630, Museo del Prado. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The centrepiece of Act I of Wagner's Siegfried (premiered 1876), the third opera of the Ring cycle, is a forging scene. The fearless young Siegfried scorns the feeble swords his dwarf foster-father Mime keeps making and resolves to reforge Nothung, the shattered blade of his father Siegmund, with his own hands. He files the broken fragments to powder, melts them in the furnace, and casts the sword anew, singing 'Nothung! Nothung!' as he swings the hammer. Wagner drives the orchestra with off-beat anvil-strokes and a gleaming brass motif until Siegfried splits an anvil in two with the finished weapon. It is opera as metallurgy, the making of an unbreakable arm staged as heroic labour. Just as Siegfried must forge a better blade to win his coming battles, defence manufacturers are re-engineering their interceptors, seeking a weapon that strikes as surely but costs far less to wield.",
        "excerpt": "In Act I's forging scene, Siegfried rejects the brittle blades his foster-father hammers out and reforges the shattered sword Nothung himself, filing the shards to powder, melting them, and casting the metal anew. Wagner scores the labour with pounding anvil-strokes on the offbeat and a blazing brass theme, so the orchestra itself seems to ring like a smithy as the unbreakable weapon takes shape.",
        "source": "Richard Wagner, Siegfried, WWV 86C (Act I, forging scene), first performed Bayreuth 1876; score via IMSLP.",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)",
        "image": {
          "src": "/covers/lockheed-cheaper-patriot-pac3-ace--a5.png",
          "alt": "Photographic portrait study of the composer Richard Wagner, c. 1862.",
          "credit": "Richard Wagner, portrait by Caesar Willich, c. 1862. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "us-service-member-killed-northern-iraq",
    "headline": "A U.S. service member is killed and another wounded in an Iranian attack in northern Iraq as the war's American death toll reaches 17",
    "overview": "U.S. Central Command said a U.S. service member was killed and another wounded in an Iranian attack in northern Iraq on Sunday, one day after two American soldiers were killed in a strike in Jordan. The Associated Press reported that 17 U.S. service members have now died in the war with Iran, a conflict fought largely in the air through missile and drone exchanges. The latest death deepens an escalating confrontation that has drawn in American bases across the region.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPbWhlMjhBVDQ5MWpFeHNXcUZOcHF4S2NYVzlRRXo4WFhOTmRyWHI1elU3aGRKN21pVzJMTFpvQkIwak9yWnNVbERyNFpuUUhZYTR1SHA3UUJYSlc2MDNDSjhkaXROVFBuelhQbV8xSnlSYTl2Um5VOXNHQ0VqdXRzaEo2djloRWNuSXNaUm1kS2J5VkhvTC1qMDdkWmdmZlo4c3RVRjZ2WlVPUV9SR08yZktIYkNneHc?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMihAFBVV95cUxOR0hpOHR6RFNuWW1CU2M2ZXdqMVgta1lXUld6b2VBSTMzTXdicTQweDJZZ2RaQnhoenBYdExDN0ZtRjlsb3NxRTB4SGtCQUw2aW9jbWZHaWJsc3dhUjVXeDVPRm5NcVQxSVdITmxRbFdMTXlmVTBiWFFDUTNJbnJscWVYc2k?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/us-service-member-killed-northern-iraq.png",
      "alt": "A U.S. Air Force F-15 fighter jet climbing steeply into the sky",
      "credit": "U.S. Air Force (Staff Sgt. Jeffrey Allen). Public domain, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 53 BC the Roman triumvir Marcus Licinius Crassus, hungry for the military glory that rivaled Pompey and Caesar, led roughly 40,000 legionaries across the Euphrates into Parthian Mesopotamia. Near the town of Carrhae, in what is today the borderland of northern Iraq and Syria, the Parthian general Surena trapped the heat-exhausted Romans on open ground and destroyed them with mounted horse-archers who loosed arrows from a distance and never closed to hand-to-hand fighting. Crassus himself was killed during a treacherous parley, and Plutarch reports about twenty thousand Romans slain and ten thousand taken prisoner, with the survivors hunted down as they fled. The disaster opened centuries of grinding, inconclusive warfare between Rome and Parthia along the same Mesopotamian frontier. Just as Crassus's soldiers died far from Rome in the deserts of Mesopotamia, caught in an escalating contest between two empires that neither could end, American service members are now dying in northern Iraq in a war of long-range strikes between the United States and Iran.",
        "excerpt": "Crassus was killed by a Parthian, called Pomaxathres; others say, by a different man, and that Pomaxathres only cut off his head and right hand after he had fallen. But this is conjecture rather than certain knowledge, for those that were by had not leisure to observe particulars, and were either killed fighting about Crassus, or ran off at once to get to their comrades on the hill. But the Parthians coming up to them, and saying that Crassus had the punishment he justly deserved, and that Surena bade the rest come down from the hill without fear, some of them came down and surrendered themselves, others were scattered up and down in the night, a very few of whom got safe home, and others the Arabians, beating through the country, hunted down and put to death. It is generally said, that in all twenty thousand men were slain, and ten thousand taken prisoners.",
        "source": "Plutarch, Life of Crassus (on the death of Crassus at Carrhae, 53 BC), in Plutarch's Lives, translated by John Dryden and revised by Arthur Hugh Clough; via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Lives_(Dryden_translation)/Crassus",
        "image": {
          "src": "/covers/us-service-member-killed-northern-iraq--a0.png",
          "alt": "Roman marble portrait head identified as Marcus Licinius Crassus",
          "credit": "Head of Marcus Licinius Crassus, middle of the 1st century BC, Ny Carlsberg Glyptotek, Copenhagen. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In October 1962 the discovery of Soviet nuclear missile sites in Cuba brought the United States and the Soviet Union to the brink of nuclear war. For thirteen days President John F. Kennedy and Premier Nikita Khrushchev traded ultimatums and naval maneuvers while the world waited, with Kennedy warning that any missile fired from Cuba would require a full retaliatory response upon the Soviet Union. On October 27, 1962, the tensest day of the crisis, a U.S. Air Force U-2 reconnaissance plane was shot down over Cuba by a Soviet surface-to-air missile, killing its pilot, Major Rudolf Anderson Jr., the only combat death of the confrontation. His death, ordered by a local Soviet commander without Moscow's direct approval, showed how quickly a standoff between superpowers could turn lethal and how easily events could slip past the leaders trying to control them. Just as Major Anderson was killed far from home by a missile amid tit-for-tat escalation that neither capital fully commanded, U.S. service members are now dying in northern Iraq in an air war of missiles and drones between two powers locked in reprisal.",
        "excerpt": "We no longer live in a world where only the actual firing of weapons represents a sufficient challenge to a nation's security to constitute maximum peril. Nuclear weapons are so destructive and ballistic missiles are so swift, that any substantially increased possibility of their use or any sudden change in their deployment may well be regarded as a definite threat to peace. For many years both the Soviet Union and the United States, recognizing this fact, have deployed strategic nuclear weapons with great care, never upsetting the precarious status quo which insured that these weapons would not be used in the absence of some vital challenge.",
        "source": "John F. Kennedy, Radio and Television Address to the American People on the Soviet Arms Buildup in Cuba, October 22, 1962 (public domain U.S. government work); via Wikisource.",
        "href": "https://en.wikisource.org/wiki/John_F._Kennedy%27s_Address_on_the_Buildup_of_Arms_in_Cuba",
        "image": {
          "src": "/covers/us-service-member-killed-northern-iraq--a1.png",
          "alt": "Portrait of Major Rudolf Anderson Jr., U.S. Air Force U-2 pilot",
          "credit": "U.S. Air Force portrait of Major Rudolf Anderson Jr. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Homer's Iliad, composed in the eighth century BC, opens not with triumph but with rage and death: the wrath of Achilles that hurls the souls of countless warriors down to the underworld, leaving their bodies unburied on a foreign shore. The whole epic turns on cycles of vengeance: Achilles withdraws in anger, his friend Patroclus is killed, Achilles kills Hector in revenge, and Hector's father Priam must come begging for his son's body. Again and again Homer names men who fall far from the homes and fathers they will never see again, killed in a war begun over a quarrel between powerful men. The poem's unblinking catalogue of the slain has made it the West's founding meditation on soldiers dying in someone else's fight. Just as the Iliad mourns warriors who perished on a distant shore in an escalating chain of reprisal, this news tells of Americans killed far from home in a widening war of blow and counter-blow.",
        "excerpt": "Achilles' wrath, to Greece the direful spring\nOf woes unnumber'd, heavenly goddess, sing!\nThat wrath which hurl'd to Pluto's gloomy reign\nThe souls of mighty chiefs untimely slain;\nWhose limbs unburied on the naked shore,\nDevouring dogs and hungry vultures tore.\nSince great Achilles and Atrides strove,\nSuch was the sovereign doom, and such the will of Jove!",
        "source": "Homer, The Iliad, Book I, translated by Alexander Pope; Project Gutenberg eBook #6130.",
        "href": "https://www.gutenberg.org/files/6130/6130-h/6130-h.htm",
        "image": {
          "src": "/covers/us-service-member-killed-northern-iraq--a2.png",
          "alt": "Marble bust of the poet Homer",
          "credit": "Bust of Homer, British Museum. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Wilfred Owen wrote Dulce et Decorum est in 1917 while recovering from shell shock at Craiglockhart hospital, and it was published in 1920, two years after he was killed in action one week before the Armistice. The poem describes a British gas attack on the Western Front: exhausted soldiers stumbling through mud, one man too slow with his mask, drowning in his own lungs as the poet watches helplessly. Owen ends by denouncing as a lie the old Roman line that it is sweet and fitting to die for one's country. His verse strips away the glory of war to show its mechanized cruelty and the young men consumed by it far from home. Just as Owen forced his readers to see the real cost paid by ordinary soldiers sent to die abroad, the deaths of U.S. service members in northern Iraq are the human price beneath the abstractions of missile exchange and strategic escalation.",
        "excerpt": "Gas!  GAS!  Quick, boys!--An ecstasy of fumbling\nFitting the clumsy helmets just in time,\nBut someone still was yelling out and stumbling\nAnd flound'ring like a man in fire or lime.--\nDim through the misty panes and thick green light,\nAs under a green sea, I saw him drowning.\n\nIn all my dreams before my helpless sight\nHe plunges at me, guttering, choking, drowning.\n\nIf in some smothering dreams, you too could pace\nBehind the wagon that we flung him in,\nAnd watch the white eyes writhing in his face,\nHis hanging face, like a devil's sick of sin,\nIf you could hear, at every jolt, the blood\nCome gargling from the froth-corrupted lungs\nBitter as the cud\nOf vile, incurable sores on innocent tongues,--\nMy friend, you would not tell with such high zest\nTo children ardent for some desperate glory,\nThe old Lie:  Dulce et decorum est\nPro patria mori.",
        "source": "Wilfred Owen, Dulce et Decorum est, in Poems (London, 1920), edited by Siegfried Sassoon; Project Gutenberg eBook #1034.",
        "href": "https://www.gutenberg.org/cache/epub/1034/pg1034.txt",
        "image": {
          "src": "/covers/us-service-member-killed-northern-iraq--a3.png",
          "alt": "Photographic portrait of the poet Wilfred Owen",
          "credit": "Photograph of Wilfred Owen, c. 1916. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya painted The Third of May 1808 in 1814 to commemorate the Spanish civilians executed by Napoleon's occupying army in Madrid after the uprising of the previous day. The canvas, now in the Museo del Prado, shows a faceless firing squad in rigid line-abreast gunning down a group of terrified townsmen lit by a single harsh lantern, one figure in a white shirt thrown into a Christlike pose of surrender. Goya refuses to ennoble the killing: the soldiers are an anonymous machine, the victims are known only by their fear, and the ground is already littered with the dead. Painted in the wake of the Peninsular War, it became the archetypal image of state violence and the cycle of uprising and brutal reprisal in modern conflict. Just as Goya fixes the moment when retaliation between an occupier and the occupied hardens into ordinary, anonymous killing, the deaths in northern Iraq mark ordinary soldiers caught in an escalating cycle of strike and counter-strike.",
        "excerpt": "A firing squad of faceless soldiers leans into their rifles in the dark, a single boxy lantern throwing white light onto the men about to die. At the center a man in a white shirt flings his arms wide, his eyes huge, while corpses already lie in their own blood at his feet and a line of the condemned stretches back into the night. The killing is mechanical, anonymous, and unending, the executioners painted as one blank machine and the victims as separate, terrified human faces.",
        "source": "Francisco de Goya, The Third of May 1808 (El Tres de Mayo de 1808), 1814, oil on canvas, Museo Nacional del Prado, Madrid; image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/us-service-member-killed-northern-iraq--a4.png",
          "alt": "Goya's painting The Third of May 1808 showing a firing squad executing civilians",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Between 1914 and 1916, as the First World War consumed Europe, the English composer Gustav Holst wrote Mars, the Bringer of War, the opening movement of his orchestral suite The Planets, Op. 32. Built on a relentless five-beat ostinato pounded out by strings and timpani, the music grows from a menacing whisper into grinding, dissonant climaxes of brass and organ, evoking not a heroic battle but the impersonal, mechanized momentum of modern war. Holst, writing before the tank and the mass air raid had fully arrived, seemed to hear the machinery of destruction moving on its own, indifferent to the men caught inside it. First performed in full in 1920, it remains the most vivid musical portrait of war as a force beyond any single hand to guide. Just as Mars depicts violence that builds by its own momentum toward catastrophe, the war between the United States and Iran advances through a self-feeding cycle of missile and drone strikes that neither side seems able to halt.",
        "excerpt": "A relentless five-beat rhythm hammers in the low strings and drums, quiet at first, then swelling as brass and organ pile onto it in grinding, dissonant chords. The music never argues or pleads; it simply advances, mechanical and impersonal, building toward a shattering climax of collision and collapse. It is the sound of war as a process that has slipped past any single hand to guide it, its momentum feeding on itself until it detonates.",
        "source": "Gustav Holst, Mars, the Bringer of War, from The Planets, Op. 32 (composed 1914-1916); full score via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)",
        "image": {
          "src": "/covers/us-service-member-killed-northern-iraq--a5.png",
          "alt": "Photographic portrait of the composer Gustav Holst",
          "credit": "Photograph of Gustav Holst. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "spain-win-world-cup-final-2026",
    "headline": "Spain beat 10-man Argentina 1-0 in extra time to win the 2026 World Cup",
    "overview": "Spain defeated Argentina 1-0 after extra time to win the 2026 World Cup, scoring the decisive goal against an Argentine side reduced to 10 men. The result denied Lionel Messi's Argentina back-to-back titles and delivered Spain its second men's World Cup, sixteen years after its first. The final capped a tournament co-hosted by the United States, Canada and Mexico.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxOVUx2OGh0QS1KQmVRb2g0SGlOYmdmdzlEd1E1dTlnYmJoWElCMHR4dnUtR0k3RlMxX3hUcDg1b3VjS2dTVWVKMjN3MmtacGhXWV9VRDg3RTBWSFRfel9nVkFuX21pbFZkTzhkcXhESHJqWUFIcmxaRzRHTFNCYzNsZ3N3Ymo3d1otR2dOSGNQRlpYdFJpbXJHZVdiVnRxTWNnOV9GLVRnanhTZWFhczdYczhsZw?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQTG45T0ZaXzVrTjdEaDBIT010bmFkclUtOGh1NHVyR3NIaFJ2RmV0RHRHTTllR29hWktPczZIN2tiRGJJS3QzWUZCWTlJZ1JCSHp4U0UzVnQ5UkYtb2oyMjBzZ3RndlZYRWVEUzlCS3RWTVNYMS1uM2l6emI5c0dUbzlEREJTN3RxNkItMjV5MGNxcUxMVHc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/spain-win-world-cup-final-2026.png",
      "alt": "A replica of the FIFA World Cup Trophy on display",
      "credit": "Ank Kumar, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In August 480 BC, King Leonidas of Sparta held the narrow coastal pass of Thermopylae with a few thousand Greeks against the vast invading army of the Persian king Xerxes. When a local man named Ephialtes betrayed a mountain path and the defenders were surrounded, Leonidas dismissed most of his allies and made a last stand with his three hundred Spartans and a band of Thespians. Their spears shattered, they fought on with swords, and finally with hands and teeth on a low hillock until they were buried under a storm of Persian arrows, as Herodotus records in his Histories. The doomed defense became the ancient world's emblem of courage against impossible odds and of honor won even in defeat. Just as the shorthanded Spartans earned undying glory even as they were overwhelmed, ten-man Argentina's doomed resistance in the 2026 final showed that a side can fall one blow short and still leave the arena wreathed in honor.",
        "excerpt": "On this spot while defending themselves with daggers, that is those who still had them left, and also with hands and with teeth, they were overwhelmed by the missiles of the Barbarians, some of these having followed directly after them and destroyed the fence of the wall, while others had come round and stood about them on all sides.",
        "source": "Herodotus, The History of Herodotus, Book VII (Polymnia), ch. 225, translated by G. C. Macaulay (Macmillan, 1890); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/2456/2456-h/2456-h.htm",
        "image": {
          "src": "/covers/spain-win-world-cup-final-2026--a0.png",
          "alt": "Jacques-Louis David's painting of King Leonidas amid the Spartans before the Battle of Thermopylae",
          "credit": "Jacques-Louis David, Leonidas at Thermopylae (1814), Musee du Louvre, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "On 18 June 1815, near the Belgian village of Waterloo, the Emperor Napoleon Bonaparte staked his restored throne on one last battle against the Duke of Wellington's Anglo-Allied army and Marshal Blucher's advancing Prussians. Late in the day he flung his elite Imperial Guard, the veterans who had never been beaten, up the ridge in a final bid for victory, and, met by disciplined British fire, they broke and fled for the first time in their history. The French army dissolved into rout, and Napoleon, who spoke of dying on the field, was led away as his era closed forever. Sir Edward Creasy ranked Waterloo among the fifteen decisive battles that shaped the world. Just as the greatest commander of his age was denied one final triumph and watched his reign end on that field, Lionel Messi's Argentina was denied back-to-back crowns, and a champion's era passed as the last charge fell short.",
        "excerpt": "Some regiments of the Old Guard in vain endeavoured to form in squares and stem the current. They were swept away, and wrecked among the waves of the flyers. Napoleon had placed himself in one of these squares: Marshal Soult, Generals Bertrand, Drouot, Corbineau, De Flahaut, and Gourgaud, were with him. The Emperor spoke of dying on the field, but Soult seized his bridle and turned his charger round, exclaiming, \"Sire, are not the enemy already lucky enough?\"",
        "source": "Sir Edward Shepherd Creasy, The Fifteen Decisive Battles of the World: from Marathon to Waterloo, ch. XV, 'The Battle of Waterloo, A.D. 1815' (first published 1851); Project Gutenberg ebook #4061.",
        "href": "https://www.gutenberg.org/cache/epub/4061/pg4061.txt",
        "image": {
          "src": "/covers/spain-win-world-cup-final-2026--a1.png",
          "alt": "George Jones's painting of Napoleon leaving the field of Waterloo amid his fleeing army",
          "credit": "George Jones, Napoleon Leaving the Field of Waterloo, 18 June 1815, Nottingham City Museums & Galleries, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "In Homer's Iliad, the climactic duel of the Trojan War pits Achilles, the greatest of the Greek warriors, against Hector, the noble champion and shield of Troy. Deceived by the goddess Athena and abandoned by the gods, Hector realizes he stands alone, yet resolves to die not as a fugitive but in a deed worthy of memory, charging Achilles sword in hand before a spear finds the one gap in his armor. Alexander Pope's celebrated verse translation renders Hector's defiance as he chooses a glorious end over a shameful flight. The scene has stood for nearly three millennia as the archetype of the hero who falls at the very height of the contest, mourned even by his enemies. Just as Troy's champion met his fate in single combat and passed into legend, Messi, the talisman of his generation, was overcome in the arena, a hero denied one last victory before the watching world.",
        "excerpt": "Then welcome fate! ’Tis true I perish, yet I perish great: Yet in a mighty deed I shall expire, Let future ages hear it, and admire!",
        "source": "Homer, The Iliad, Book XXII (The Death of Hector), translated by Alexander Pope (1715-1720); Project Gutenberg ebook #6130.",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt",
        "image": {
          "src": "/covers/spain-win-world-cup-final-2026--a2.png",
          "alt": "Peter Paul Rubens's painting of Achilles slaying Hector in single combat",
          "credit": "Peter Paul Rubens, Achilles Slays Hector (c. 1630-1635), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Alfred, Lord Tennyson wrote 'Ulysses' in 1833 and first published it in 1842, giving voice to the aged Greek hero Odysseus who, restless after his long-sought return to Ithaca, resolves to set sail once more toward the unknown. Old and weakened by time, he summons his mariners for a final voyage, refusing to let age or fate end his quest for noble deeds and vowing to strive, to seek, to find, and not to yield. The poem is the supreme English meditation on the twilight of a heroic life and on the will that endures even as strength fades. Written soon after the death of his friend Arthur Hallam, it fuses private grief with defiant resolve. Just as Tennyson's aging hero insists on one more great endeavor even knowing his powers have waned, Messi sought a last crowning triumph at the close of his era, a bid that, though it fell short, spoke to that same unyielding will.",
        "excerpt": "Tho’ much is taken, much abides; and tho’ We are not now that strength which in old days Moved earth and heaven; that which we are, we are; One equal temper of heroic hearts, Made weak by time and fate, but strong in will To strive, to seek, to find, and not to yield.",
        "source": "Alfred, Lord Tennyson, 'Ulysses' (first published 1842), in The Early Poems of Alfred Lord Tennyson; Project Gutenberg ebook #8601.",
        "href": "https://www.gutenberg.org/files/8601/8601-h/8601-h.htm",
        "image": {
          "src": "/covers/spain-win-world-cup-final-2026--a3.png",
          "alt": "Photographic portrait of the poet Alfred, Lord Tennyson, 1869",
          "credit": "Portrait of Alfred, Lord Tennyson, 1869, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The Winged Victory of Samothrace, carved in gleaming marble around 190 BC and now the crowning glory of the Louvre's grand Daru staircase, depicts the goddess Nike alighting on the prow of a warship. Her wings still beat and her drapery streams as if against a sea wind, capturing the very instant of triumph, most likely raised to commemorate a Greek naval victory in the Aegean. Discovered in fragments on the island of Samothrace in 1863, the headless, armless figure remains among the most celebrated sculptures of the Hellenistic age. She is antiquity's purest embodiment of victory made visible, exultant motion frozen in stone. Just as Nike descends to bestow the laurel at the moment of conquest, Spain's players felt victory alight upon them as the final whistle blew in extra time, while their opponents could only watch the goddess pass them by.",
        "excerpt": "Poised on the prow of a ship, the goddess seems to have just swept down out of the sky, her great wings still sweeping the air behind her. The sea wind presses her thin robe against her body and gathers it into deep, driving folds. There is no head and no arms, and yet nothing feels missing: the whole marble surges forward in the exultant instant of a triumph won.",
        "source": "Winged Victory of Samothrace (Victoire de Samothrace), Hellenistic Greek, c. 190 BC, marble, Musee du Louvre, Paris (inv. Ma 2369).",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010252531",
        "image": {
          "src": "/covers/spain-win-world-cup-final-2026--a4.png",
          "alt": "The Winged Victory of Samothrace, a Hellenistic marble sculpture of the goddess Nike on a ship's prow",
          "credit": "Winged Victory of Samothrace, Musee du Louvre, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel composed the chorus 'See, the Conqu'ring Hero Comes' in the summer of 1747 to a libretto by Thomas Morell; first written for the oratorio Joshua, its popularity led Handel to add it to Judas Maccabaeus (HWV 63), where it hails the victorious hero's return. Beginning with a hushed treble chorus and building through trumpets and drums to a jubilant full ensemble, the music enacts a conqueror's homecoming, with laurels, sports, and songs of triumph prepared to greet him. It became one of the most enduring victory anthems in Western music, sounded at coronations, medal ceremonies, and the openings of new railways across nineteenth-century Britain. The melody is still played today when champions are crowned. Just as Handel's chorus swells to welcome the triumphant hero home with trumpets and rejoicing, Spain returned as conquering champions of the 2026 World Cup, greeted by the roar of a stadium and a nation's acclaim.",
        "excerpt": "Voices enter softly, and then the trumpets and drums break in and the whole chorus rises in exultation to greet the returning victor. Handel builds the music like a procession: the laurel is brought, songs of triumph are prepared, and the hero's brow is made ready for its crown. It is the sound of a champion welcomed home, a wave of communal joy that has hailed the victorious for nearly three centuries.",
        "source": "George Frideric Handel, 'See, the Conqu'ring Hero Comes,' chorus from the oratorio Judas Maccabaeus, HWV 63 (composed 1747; libretto by Thomas Morell); International Music Score Library Project (IMSLP).",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/spain-win-world-cup-final-2026--a5.png",
          "alt": "Thomas Hudson's 1756 portrait of the composer George Frideric Handel",
          "credit": "Thomas Hudson, portrait of George Frideric Handel (1756), via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "nolan-odyssey-box-office-opening",
    "headline": "Christopher Nolan's 'The Odyssey' opens to $264.1 million worldwide, topping his 'Oppenheimer' debut",
    "overview": "Christopher Nolan's 'The Odyssey,' an adaptation of Homer's epic poem, opened to $264.1 million in worldwide ticket sales, the studio said, surpassing the debut of Nolan's 'Oppenheimer.' The launch ranks among the strongest global openings yet for the director. Some classicists have questioned the film's liberties with the ancient text even as audiences turned out in force.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxQcmM5OFFvSjFuYmlTNkR1SkhuWXdzWjZuRkFjN2VDTFpuejJ6M1l0SFJjemcxZm1GM1BURDhkem1UZmVQajNGV2tlMlRNLTR5RXhaVU1QVlI3VXFVWjJoaUwzZHA3VkkwcC10X0luQnVLeFMzVExrdUoyQTdIRmZ4M0pGWWFHa1h5UHhBNmRJaVBkTEpvbllLcFRTN04?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxQei1XQkJWZ3l6WjVKc0xDNjVMbVhCd0oxanlsUUlzcGJHc01zYTdSRnN4Z0pVNHJqZ2ZSX1IzWVFNSkV3MlBzb1RWOUlDaDkxSDhPNk1lWnFuNlE1SmhzbkVCTURZNXJ3ZXdGTm1zLXV6TDZCOWUyTld2aXhoa3lMQndRVmVVM1pHcFlHVVVEdWg2YkJqX1A3cmRzdEZuVGdQVG1XMzROd1ZMX1l0QVJzLS1PSHJZOWh6T3RLSWEtN05wVVU?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/nolan-odyssey-box-office-opening.png",
      "alt": "Herbert James Draper's painting Ulysses and the Sirens",
      "credit": "Herbert James Draper, 'Ulysses and the Sirens' (1909). Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In classical Athens, Homer's epics were not read privately but performed aloud by professional reciters called rhapsodes at great civic festivals such as the Panathenaea. Plato's dialogue 'Ion' (composed around 380 BCE) captures one such star performer, the rhapsode Ion, fresh from winning first prize at the festival of Asclepius in Epidaurus, who moved audiences numbering in the tens of thousands to tears and terror as he chanted the deeds of Odysseus and Achilles. Socrates treats this as a kind of divine possession, a chain of inspiration running from the Muse through the poet to the performer and finally into the crowd. The recitation of Homer was, in other words, the mass entertainment of its age, a shared public spectacle staged for the whole city. Just as Ion held twenty thousand faces rapt with Homer's tale in the open theatre, Nolan's 'The Odyssey' drew millions into darkened cinemas worldwide on a single opening weekend to hear the same ancient story told anew.",
        "excerpt": "Well, Ion, and what are we to say of a man who at a sacrifice or festival, when he is dressed in holiday attire, and has golden crowns upon his head, of which nobody has robbed him, appears weeping or panic-stricken in the presence of more than twenty thousand friendly faces, when there is no one despoiling or wronging him;--is he in his right mind or is he not?",
        "source": "Plato, 'Ion,' translated by Benjamin Jowett. Project Gutenberg eBook #1635 (archived at gutenberg.org).",
        "href": "https://www.gutenberg.org/ebooks/1635",
        "image": {
          "src": "/covers/nolan-odyssey-box-office-opening--a0.png",
          "alt": "Marble portrait bust of the philosopher Plato",
          "credit": "Roman copy of a portrait bust of Plato, Glyptothek, Munich. Photo: User:Bibi Saint-Pol, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 18 April 1914 the Italian silent epic 'Cabiria,' directed by Giovanni Pastrone with intertitles by the poet Gabriele D'Annunzio, premiered in Turin and Milan and became one of the first true blockbusters of the cinema age. Set during the Punic Wars, it dazzled audiences with monumental sets, a towering statue of the god Moloch, and sweeping tracking shots, and it was screened in grand theatres with live orchestras as a prestige public event. The film proved that the ancient world could be rebuilt as spectacle for a new mass medium, influencing D. W. Griffith and generations of epic filmmakers. It turned classical antiquity into a ticketed marvel that drew crowds far beyond the readers of any book. Just as 'Cabiria' transformed the old epic imagination into a shared cinematic sensation for a modern public, Nolan's 'The Odyssey' packages Homer's three-thousand-year-old story as a global opening-weekend event measured in hundreds of millions of dollars.",
        "excerpt": "Premiering in Turin and Milan in the spring of 1914, 'Cabiria' turned the ancient Mediterranean into a moving cathedral of plaster and light, its colossal sets and roaming camera making antiquity feel newly, thrillingly alive. Audiences filed into grand halls where full orchestras underscored the flames of Moloch's temple, and left having witnessed something closer to a civic festival than a mere show. It was proof that the oldest stories could become the newest spectacle.",
        "source": "Still from 'Cabiria' (1914), directed by Giovanni Pastrone; Library of Congress print collection, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Cabiria_LCCN2007676108-restored.jpg",
        "image": {
          "src": "/covers/nolan-odyssey-box-office-opening--a1.png",
          "alt": "Restored poster-style still from the 1914 Italian silent epic Cabiria",
          "credit": "Still/print from 'Cabiria' (1914), Library of Congress; restoration by H. Morgillo. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Homer's 'Odyssey,' composed in Greek roughly in the eighth century BCE, is the founding poem of the long voyage home, the nostos of Odysseus as he struggles for ten years to return to Ithaca after the fall of Troy. In the prose translation by Samuel Butler (1900), the poem opens by invoking the Muse to sing of the 'ingenious hero' who wandered far, suffered much at sea, and fought to bring his men safely home. Every later voyage narrative in the Western tradition is in some sense a descendant of this single text, which fuses homecoming, cunning, and the pull of the familiar hearth. It is the sacred old story that Nolan's film both honours and rearranges. Just as the 'Odyssey' has been endlessly recited, translated, and reimagined without exhausting its hold on audiences, Nolan's adaptation draws record crowds precisely because the tale of the man trying to get home still speaks to everyone.",
        "excerpt": "Tell me, O Muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home; but do what he might he could not save his men, for they perished through their own sheer folly in eating the cattle of the Sun-god Hyperion; so the god prevented them from ever reaching home.",
        "source": "Homer, 'The Odyssey,' translated by Samuel Butler. Project Gutenberg eBook #1727 (archived at gutenberg.org).",
        "href": "https://www.gutenberg.org/ebooks/1727",
        "image": {
          "src": "/covers/nolan-odyssey-box-office-opening--a2.png",
          "alt": "Marble bust traditionally identified as the poet Homer",
          "credit": "Hellenistic-style marble bust of Homer, British Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "James Joyce's 'Ulysses,' first published in Paris in 1922, is the most famous modern retelling of Homer, mapping the wanderings of Odysseus onto a single ordinary day, 16 June 1904, in Dublin. Its hero, the advertising canvasser Leopold Bloom, is a comic, tender everyman whose small-scale odyssey through the city mirrors, episode by episode, the structure of the ancient epic. Joyce transplanted the sacred old framework into the textures of modern urban life, insisting that myth still lived in the mundane, a project that scandalised some readers even as it electrified others. The book was banned and prosecuted before being recognised as a landmark; its 1922 text is now in the public domain and freely available on Project Gutenberg. Just as Joyce took liberties with Homer's epic to make it new for his own age and provoked purists in the process, Nolan reinvents the 'Odyssey' for the screen, delighting mass audiences even as some classicists question his departures from the ancient text.",
        "excerpt": "Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed. A yellow dressinggown, ungirdled, was sustained gently behind him on the mild morning air. He held the bowl aloft and intoned: —Introibo ad altare Dei.",
        "source": "James Joyce, 'Ulysses' (1922). Project Gutenberg eBook #4300 (archived at gutenberg.org).",
        "href": "https://www.gutenberg.org/ebooks/4300",
        "image": {
          "src": "/covers/nolan-odyssey-box-office-opening--a3.png",
          "alt": "Portrait photograph of the writer James Joyce, 1915",
          "credit": "James Joyce photographed by Alex Ehrenzweig, 1915 (restored). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The British painter Herbert James Draper completed 'Ulysses and the Sirens' in 1909, a large oil now held at the Ferens Art Gallery in Kingston upon Hull. It depicts the climactic sea-peril of the 'Odyssey': Odysseus lashed to the mast of his ship, straining against his bonds, while sensuous sirens clamber aboard and swirl through the water around the vessel, embodying the deadly seduction that threatens to derail his homecoming. Draper renders the ancient scene with late-Victorian drama and lush colour, translating Homer's verse into a single arresting visual spectacle. The painting is a reminder that the 'Odyssey' has always been reinterpreted through the popular art forms of each era. Just as Draper turned the story's most cinematic moment into a grand, crowd-pleasing image for gallery audiences, Nolan stages the same mythic perils as blockbuster spectacle for viewers around the world.",
        "excerpt": "Odysseus is bound to the mast, sinews taut, his face torn between longing and resolve as the sirens rise dripping from the swell to claw their way aboard. Draper crowds the canvas with sea-green water and pale, urgent bodies, so that the single instant of temptation becomes a whole storm of motion. It is Homer's warning against the sweet voice that would keep a man from home, painted as pure spectacle.",
        "source": "Herbert James Draper, 'Ulysses and the Sirens' (1909), oil on canvas, Ferens Art Gallery, Kingston upon Hull; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Herbert_James_Draper,_Ulysses_and_the_Sirens,_1909.jpg",
        "image": {
          "src": "/covers/nolan-odyssey-box-office-opening--a4.png",
          "alt": "Painting of Odysseus bound to the mast as sirens surround his ship",
          "credit": "Herbert James Draper, 'Ulysses and the Sirens' (1909), Ferens Art Gallery. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Claudio Monteverdi's opera 'Il ritorno d'Ulisse in patria' ('The Return of Ulysses to His Homeland'), with a libretto by Giacomo Badoaro, premiered in Venice during the 1639-1640 carnival season and is one of the earliest surviving operas. It dramatises the final movement of the 'Odyssey', the nostos itself: Ulysses' arrival home in Ithaca, the suffering of the faithful Penelope, the slaughter of the suitors, and the couple's long-delayed reunion. Written for Venice's new public opera houses, it turned Homer's homecoming into ticketed musical theatre for a paying urban audience, a genuinely popular spectacle of its day. Monteverdi treats the ancient tale not as a museum piece but as living drama, freely shaped to move contemporary listeners. Just as Monteverdi recast the 'Odyssey' as grand public entertainment for seventeenth-century Venice and found a new mass audience for the old epic, Nolan recasts the same homecoming as twenty-first-century cinema drawing record crowds.",
        "excerpt": "Monteverdi lets the whole weight of the 'Odyssey' fall on its ending, the moment of return, so that years of wandering resolve into a single reunion of husband and wife. Voices ache and swell over the strings as Ulysses sheds his disguise and Penelope, at last, dares to believe. It is the nostos made audible, homecoming staged as public music for a paying crowd.",
        "source": "Claudio Monteverdi, 'Il ritorno d'Ulisse in patria,' SV 325 (1640); full score via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Il_ritorno_d%27Ulisse_in_patria_(Monteverdi,_Claudio)",
        "image": {
          "src": "/covers/nolan-odyssey-box-office-opening--a5.png",
          "alt": "Etched portrait of the composer Claudio Monteverdi",
          "credit": "Etching of Claudio Monteverdi by Barberis. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "taylor-farms-lettuce-cyclospora-recall",
    "headline": "Taylor Farms recalls lettuce in 27 states after the FDA links iceberg lettuce sold at Taco Bell and Walmart to a cyclospora outbreak",
    "overview": "The U.S. Food and Drug Administration identified iceberg lettuce supplied by Taylor Farms and sold at Taco Bell and Walmart locations as the source of a cyclospora outbreak, and Taylor Farms recalled lettuce shipped to 27 states. Cyclosporiasis is an intestinal illness caused by a microscopic parasite spread through contaminated food or water. Health officials urged consumers and restaurants to check for and discard affected products.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPakZ4ckZETnFzYzROSFpIZmRrZHdPeTl6Mmo4ZVFjYmhJVTl3ZHNjcFRLZmotODlGYVZ5Y2hIdjJxa3NvZUFQb0M0SXRuZGJ5Vi1kMGE2N2RNa0RGMTZLRWYzTmZYME10WVBoRlFsN2tpRUtFY2M2cnlRME90S0dUQWdXRkdUUXJWem43b2dIOWd4YW5GczZPY0w5eF83UVZBOWNoVVJzUlo4SEdh?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c4gw9n1kx9do"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/taylor-farms-lettuce-cyclospora-recall.png",
      "alt": "Heads of iceberg lettuce growing in a field",
      "credit": "Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In late August 1854 a violent cholera outbreak erupted in the Soho district of London, killing more than 500 people in the space of about ten days. The physician John Snow, skeptical of the reigning \"miasma\" theory that blamed foul air, mapped every death and traced the cluster to a single public water pump on Broad Street whose well had been fouled by sewage. When he persuaded the parish authorities to remove the pump's handle, the outbreak subsided, and his investigation became a founding case of modern epidemiology. Snow's method was simple but revolutionary: follow the sick back to the one thing they had in common. Just as John Snow tied hundreds of cholera cases to a single tainted pump, the FDA traced this cyclospora outbreak back to iceberg lettuce from one supplier, Taylor Farms, that had fanned out to Taco Bell and Walmart across 27 states.",
        "excerpt": "On proceeding to the spot, I found that nearly all the deaths had taken place within a short distance of the pump. There were only ten deaths in houses situated decidedly nearer to another street pump. In five of these cases the families of the deceased persons informed me that they always sent to the pump in Broad-street, as they preferred the water to that of the pumps which were nearer. In three other cases the deceased were children who went to school near the pump in Broad-street.",
        "source": "John Snow, On the Mode of Communication of Cholera, 2nd ed. (London: John Churchill, 1855), reproduced on the UCLA John Snow Site, UCLA Fielding School of Public Health.",
        "href": "https://epi-snow.ph.ucla.edu/Stream2_BSPoutbreak_d.html",
        "image": {
          "src": "/covers/taylor-farms-lettuce-cyclospora-recall--a0.png",
          "alt": "John Snow's 1854 map of cholera deaths clustered around the Broad Street pump in Soho, London",
          "credit": "John Snow, cholera map from On the Mode of Communication of Cholera (1855). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In 430 BC, in the second year of the Peloponnesian War, a devastating plague struck Athens while its population was crowded behind the city walls. The historian Thucydides, who caught the disease and survived, recorded that it first appeared in the port of Piraeus, prompting rumors that the enemy Peloponnesians had poisoned the cisterns there. He carefully set down the symptoms so that the sickness might be recognized if it ever returned, refusing to merely guess at its ultimate cause. His account is one of the earliest attempts to reason about how a contagion enters and spreads through a population from a common point. Just as the frightened Athenians suspected their water supply had been tainted at a single source, modern investigators hunted down the hidden origin of the cyclospora sickness and found it in lettuce shipped from one grower to stores and restaurants nationwide.",
        "excerpt": "Suddenly falling upon Athens, it first attacked the population in Piraeus—which was the occasion of their saying that the Peloponnesians had poisoned the reservoirs, there being as yet no wells there—and afterwards appeared in the upper city, when the deaths became much more frequent.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (trans. Richard Crawley). Project Gutenberg eBook #7142.",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt",
        "image": {
          "src": "/covers/taylor-farms-lettuce-cyclospora-recall--a1.png",
          "alt": "Michael Sweerts, 'Plague in an Ancient City' (c. 1652), a scene of death often identified with the Plague of Athens",
          "credit": "Michael Sweerts, Plague in an Ancient City, c. 1652–54, Los Angeles County Museum of Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Daniel Defoe's A Journal of the Plague Year, published in 1722, is a vivid fictionalized eyewitness account of the Great Plague that ravaged London in 1665. Narrated by a citizen who stays in the city as it empties, the book dwells on the terror of an infection that moved unseen, carried by people who looked perfectly healthy and did not yet know they were sick. Defoe returns again and again to the impossibility of quarantine when the contagion spreads insensibly through those who show no symptoms. The horror lies not in visible danger but in the invisible, in provisions and bodies that seem safe until it is too late. Just as Defoe's Londoners could not see the contagion passing among them, cyclospora is an invisible parasite that rode along on ordinary iceberg lettuce, sickening consumers who had no way of knowing their food was contaminated.",
        "excerpt": "the danger was spreading insensibly, for the sick could infect none but those that came within reach of the sick person; but that one man who may have really received the infection and knows it not, but goes abroad and about as a sound person, may give the plague to a thousand people, and they to greater numbers in proportion, and neither the person giving the infection or the persons receiving it know anything of it, and perhaps not feel the effects of it for several days after.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722). Project Gutenberg eBook #376.",
        "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt",
        "image": {
          "src": "/covers/taylor-farms-lettuce-cyclospora-recall--a2.png",
          "alt": "Contemporary illustration of the Great Plague of London, 1665",
          "credit": "The Great Plague of London, 1665. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Sophocles' tragedy Oedipus the King, first performed in Athens around 429 BC, opens with the city of Thebes in the grip of a devastating plague that blights the crops, the herds, and the wombs of women alike. The oracle declares that the pestilence will lift only when the hidden source of the city's pollution is found and driven out, and King Oedipus vows to hunt down the cause. His relentless investigation into the true origin of the sickness ultimately reveals that he himself is the unwitting pollution he seeks. The play is an archetype of the inquiry as public-health detective story: a community cannot heal until the concealed source of its affliction is exposed. Just as Thebes could not recover until the hidden cause of its plague was identified, the outbreak at Taco Bell and Walmart could not be stopped until the FDA traced the contamination back to its true source and Taylor Farms pulled the tainted lettuce from shelves.",
        "excerpt": "She wasteth in the fruitless buds of earth,\nIn parched herds and travail without birth\nOf dying women: yea, and midst of it\nA burning and a loathly god hath lit\nSudden, and sweeps our land, this Plague of power;\nTill Cadmus' house grows empty, hour by hour,\nAnd Hell's house rich with steam of tears and blood.",
        "source": "Sophocles, Oedipus, King of Thebes (trans. Gilbert Murray, 1911). Project Gutenberg eBook #27673.",
        "href": "https://www.gutenberg.org/cache/epub/27673/pg27673.txt",
        "image": {
          "src": "/covers/taylor-farms-lettuce-cyclospora-recall--a3.png",
          "alt": "Oedipus and the Sphinx of Thebes, Attic red-figure kylix, c. 470 BC, Vatican Museums",
          "credit": "Attic red-figure kylix attributed to the Oedipus Painter, c. 470 BC, Vatican Museums. Photo: Carole Raddato, CC BY-SA 2.0, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin's tempera painting Die Pest (The Plague), completed in 1898 and held at the Kunstmuseum Basel, personifies epidemic disease as a winged, dragon-like beast ridden by a scythe-wielding figure of Death. The creature swoops low through a narrow medieval street, and in its wake bodies crumple to the ground while survivors flee in panic. Painted late in the artist's life, the work channels the ancient European dread of a contagion that arrives from nowhere and passes invisibly from body to body. It renders in a single terrifying image the idea of sickness sweeping through a community faster than anyone can escape it. Just as Böcklin's plague descends unseen upon an ordinary town, an invisible parasite in everyday lettuce spread quietly through the food supply of 27 states before officials could name and recall its source.",
        "excerpt": "A winged monster the color of decay skims through a cramped town street, and on its back rides a pale figure scattering death with a swinging scythe. Below, the living stumble over the fallen, too slow to outrun a thing that moves through the air itself. Böcklin gives contagion a face but leaves its approach as silent and inescapable as any real epidemic.",
        "source": "Arnold Böcklin, Die Pest (The Plague), 1898, tempera on wood, Kunstmuseum Basel. Via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/taylor-farms-lettuce-cyclospora-recall--a4.png",
          "alt": "Arnold Böcklin, 'Die Pest' (The Plague), 1898, Death riding a winged beast through a town",
          "credit": "Arnold Böcklin, Die Pest (The Plague), 1898, Kunstmuseum Basel. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns composed his tone poem Danse macabre, Op. 40, in 1874, drawing on the medieval \"dance of death\" tradition that flourished in the plague-haunted Europe of the late Middle Ages. In the music, Death appears at midnight, tunes his fiddle, and summons the dead from their graves to dance until the crowing of the cock scatters them at dawn. The danse macabre motif itself was born of the mass mortality of the Black Death, when art insisted that pestilence levels rich and poor without distinction. Saint-Saëns turns that grim folk memory into a whirling, rattling orchestral showpiece. Just as the danse macabre imagines death moving unbidden through a whole population, a single contaminated crop moved silently across state lines, reaching diners and shoppers who never suspected the danger on their plates.",
        "excerpt": "At the stroke of midnight Death draws his bow across the strings, and the dead rise to spin in a clattering waltz until the first cockcrow drives them back underground. The melody is gay and macabre at once, a reminder that the plague once made dancers of everyone it touched. It is the sound of mortality moving freely and impartially through a crowd.",
        "source": "Camille Saint-Saëns, Danse macabre, Op. 40 (1874). Score and details via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)",
        "image": {
          "src": "/covers/taylor-farms-lettuce-cyclospora-recall--a5.png",
          "alt": "Portrait of the composer Camille Saint-Saëns",
          "credit": "Camille Saint-Saëns (portrait). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "jingye-british-steel-compensation-claim",
    "headline": "China's Jingye demands UK compensation over the nationalization of British Steel",
    "overview": "China's Jingye Group is demanding compensation from the British government over losses tied to the nationalization of British Steel, whose Scunthorpe works London took control of under emergency powers to keep the country's last virgin steelmaking running. Jingye, which bought British Steel in 2020, says its investment was effectively expropriated. The dispute adds strain to already tense UK-China commercial ties.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPektqZmZxSDJVTGl0S2lFMU9vT2h3bkw1ekk5YWJPMENWNHBrYUpjNnJMWGRPLTJEd1JHdUpoMW5yN24zRTZvdEhITmMxMEd0dURHTXhNdXpfT2g3WHFIVzZCMTBfMmJXcmUyVkNXdkRLM0JFNWstdU1vS1drMnI5ODBlQmtoRU9hUUJ1YmNLQTJITVpxVGk5VGxFVQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNc2RqYlFpN2JQRTF1eV9zWnJEWHQxeThpU1Uya2VLVEVqRUFDSUljajMzRTNodE1NWUhlVjdqc3hsMjNqZUVEZF9BSHFpNThWLXAtODZFeXgzdVotSFFla3B4RHo5OTlieHFldkdNaExoVE15WjAwYVZ4QkhtLTlFeXVrVGxHTUdxQjlvOE4zS2I4TC1YVUdoRkhXM1doMW9feEZuUmdMVHJheTFERVE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/jingye-british-steel-compensation-claim.png",
      "alt": "The British Steel works at Scunthorpe, England",
      "credit": "Gareth James, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 18 March 1938 Mexican president Lázaro Cárdenas announced the expropriation of the assets of seventeen foreign oil companies, chiefly the British-Dutch Royal Dutch Shell (El Águila) and the American Standard Oil, after the firms defied a Supreme Court order to settle a bitter labor dispute. Cárdenas placed the wells, refineries and pipelines under a new state monopoly, Petróleos Mexicanos (Pemex), casting oil as the patrimony of the nation rather than the property of foreign shareholders. London and Washington protested furiously, Britain briefly broke off diplomatic relations, and the companies organized a global boycott of Mexican crude while demanding compensation for their seized holdings. After years of arbitration Mexico eventually paid a negotiated sum, far below the owners' original claims, and 18 March became a national holiday. Just as Cárdenas seized foreign-owned oil in the name of national sovereignty and left the former owners pressing for compensation, Britain's emergency takeover of Scunthorpe has left Jingye demanding to be paid for an investment it says was effectively expropriated.",
        "excerpt": "On 18 March 1938, Mexico's President Lázaro Cárdenas signed a decree seizing the properties of foreign oil companies that had defied his government and the courts. Overnight, wells, refineries and pipelines built with foreign capital became the patrimony of the Mexican nation, gathered into the new state firm Pemex. The expelled owners denounced the act as theft and spent years pressing for the compensation they insisted their expropriated assets were worth.",
        "source": "Mexican oil expropriation (18 March 1938), overview via Wikipedia, archived by the Wikimedia Foundation.",
        "href": "https://en.wikipedia.org/wiki/Mexican_oil_expropriation",
        "image": {
          "src": "/covers/jingye-british-steel-compensation-claim--a0.png",
          "alt": "Portrait of Mexican president Lázaro Cárdenas",
          "credit": "Lázaro Cárdenas, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In March 1951 the Iranian parliament, led by nationalist prime minister Mohammad Mossadegh, voted to nationalize the Anglo-Iranian Oil Company, the British-controlled concern whose vast Abadan refinery was the largest in the world and whose profits flowed overwhelmingly to London. Britain regarded the company's assets as its property and its lifeblood, imposed a Royal Navy blockade and a global embargo on Iranian oil, and took its claim to the International Court of Justice while Abadan ground to a halt. The confrontation between a sovereign government asserting control over its own resources and a foreign owner demanding redress culminated in 1953 in the CIA- and MI6-backed coup that toppled Mossadegh. The episode became the twentieth century's defining clash between economic nationalism and foreign capital. Just as the British-owned oil company insisted its expropriated Iranian assets must be compensated when a sovereign state seized them, Jingye now stands where the foreign owner once stood, demanding payment from a British government that has invoked national interest to take control of British Steel.",
        "excerpt": "In 1951 Iran's parliament nationalized the Anglo-Iranian Oil Company, wresting the giant Abadan refinery from British hands and declaring the country's oil to be Iranian property. Britain answered with a naval blockade and a worldwide boycott, insisting that the company's seized assets be restored or paid for in full. What began as a quarrel over who owned the wells ended two years later in a foreign-backed coup that removed Mossadegh from power.",
        "source": "Nationalization of the Anglo-Iranian Oil Company and the Abadan Crisis (1951-1953), overview via Wikipedia, archived by the Wikimedia Foundation.",
        "href": "https://en.wikipedia.org/wiki/Abadan_Crisis",
        "image": {
          "src": "/covers/jingye-british-steel-compensation-claim--a1.png",
          "alt": "Portrait of Iranian prime minister Mohammad Mossadegh",
          "credit": "Mohammad Mosaddegh, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Émile Zola's novel Germinal (1885) plunges into the coalfields of northern France, where the young migrant Étienne Lantier arrives at the Voreux pit and finds the mine looming in the darkness like a living, insatiable creature. Through the doomed strike of the Maheu family and their fellow miners, Zola dramatizes the grinding collision between labor and the distant capital of the shareholders, between the men who dig the coal and the invisible owners who profit from it. The pit itself becomes a monster that swallows human flesh to feed industry, a symbol of an industrial order that treats workers as fuel. The novel's title, evoking the revolutionary month of Germinal, hints at the buried seeds of revolt. Just as Zola imagined heavy industry as a devouring beast fed by human labor and owned by remote masters, the fight over Scunthorpe pits the men and the nation at the furnaces against a distant owner, raising anew the old question of who truly controls the means of production.",
        "excerpt": "This pit, piled up in the bottom of a hollow, with its squat brick buildings, raising its chimney like a threatening horn, seemed to him to have the evil air of a gluttonous beast crouching there to devour the earth.",
        "source": "Émile Zola, Germinal (1885), English translation, Project Gutenberg (ebook 56528).",
        "href": "https://www.gutenberg.org/cache/epub/56528/pg56528-images.html",
        "image": {
          "src": "/covers/jingye-british-steel-compensation-claim--a2.png",
          "alt": "Photographic portrait of Émile Zola by Nadar",
          "credit": "Émile Zola photographed by Nadar, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "William Blake's short lyric beginning \"And did those feet in ancient time,\" written around 1804 as a preface to his epic Milton and later set to music as the hymn Jerusalem, contrasts a vision of a holy, green England with the \"dark Satanic mills\" of the dawning industrial age. In a few charged stanzas Blake indicts the smoke-belching factories and forges that were remaking the nation, and vows a spiritual struggle to build a just society amid them. The poem fuses iron, industry and national destiny into a single burning image, turning the machinery of manufacture into a moral question about what England should become. It has since served as an anthem for those who believe the country's soul is bound up with its labor and its land. Just as Blake set England's identity against the mills that powered its industry, the battle for Britain's last virgin steelworks casts the blast furnaces of Scunthorpe as sinews of national power too vital to leave in foreign hands.",
        "excerpt": "And did the Countenance Divine\nShine forth upon our clouded hills?\nAnd was Jerusalem builded here\nAmong those dark Satanic mills?",
        "source": "William Blake, \"And did those feet in ancient time\" (Preface to Milton, c. 1804), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/And_did_those_feet_in_ancient_time",
        "image": {
          "src": "/covers/jingye-british-steel-compensation-claim--a3.png",
          "alt": "Portrait of William Blake by Thomas Phillips",
          "credit": "William Blake by Thomas Phillips, 1807, National Portrait Gallery, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Adolph Menzel's monumental painting Das Eisenwalzwerk (The Iron Rolling Mill), completed in 1875 and now in the Alte Nationalgalerie in Berlin, is one of the first great European canvases to take heavy industry as its subject. It depicts the searing interior of a Silesian rolling mill, where bare-armed workers wrestle a glowing white-hot bar of iron beneath vast machinery, their bodies lit by the furnace glare in a swirl of smoke and effort. Menzel, who made scores of preparatory studies on the factory floor, captured both the raw power of modern steelmaking and the toll it exacted on the men who fed it. The work became an icon of the industrial age and of labor as spectacle and sacrifice. Just as Menzel monumentalized the forge as the fiery heart of a rising nation's strength, the struggle over Scunthorpe treats its furnaces as the irreplaceable sinews of British power, worth seizing to keep alight.",
        "excerpt": "Menzel's canvas throws open the doors of a roaring rolling mill, where men strain half-naked against a bar of iron pulled white-hot from the furnace. Light and smoke coil around their bodies as the great machinery towers over them, indifferent and immense. It is industry rendered as both glory and ordeal, the making of iron shown as the making of a nation's power.",
        "source": "Adolph Menzel, Das Eisenwalzwerk (The Iron Rolling Mill), 1875, Alte Nationalgalerie, Berlin; via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/jingye-british-steel-compensation-claim--a4.png",
          "alt": "Painting of workers at a glowing iron rolling mill",
          "credit": "Adolph Menzel, The Iron Rolling Mill (1875), Alte Nationalgalerie, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Wright of Derby's painting An Iron Forge, exhibited in 1772 and now in the Tate collection, shows a family gathered around a glowing bar of white-hot iron on the anvil of a blacksmith's forge during the early Industrial Revolution. Wright, celebrated for his dramatic candlelit scenes, makes the incandescent metal the sole source of light, illuminating the proud ironworker, his wife and children in a tableau that dignifies manual labor and the new power of iron. The forge stands as a small temple of industry, where raw material is transformed by fire and human skill into the stuff of a modernizing nation. It captures the moment when Britain's mastery of iron was beginning to remake the world. Just as Wright bathed the ironworker and his forge in the light of the glowing metal that promised national prosperity, the fight to keep Scunthorpe's fires burning treats the ability to make iron and steel as a source of sovereign power too precious to surrender.",
        "excerpt": "Wright lets a single bar of white-hot iron on the anvil light the whole scene, casting its glow across the ironworker and his gathered family. The forge becomes a quiet shrine to human skill and the new power of metal, half domestic hearth and half engine of a changing world. In that incandescent light, the making of iron is shown as something close to sacred.",
        "source": "Joseph Wright of Derby, An Iron Forge, 1772, Tate, London; via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Wright_-_An_Iron_Forge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/jingye-british-steel-compensation-claim--a5.png",
          "alt": "Painting of a family around a glowing iron bar at a forge",
          "credit": "Joseph Wright of Derby, An Iron Forge (1772), Tate, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "china-chongqing-landslide-rescue",
    "headline": "A landslide in southwestern China kills at least 8 and leaves 34 missing as more rain looms",
    "overview": "Rescuers in southwestern China searched through rubble for survivors after a landslide killed at least eight people and left 34 missing, state media reported. Authorities warned that southern China, including the Chongqing region, faces more heavy rain that could trigger further slides. The disaster is among the deadliest in a punishing season of floods and mountainside collapses.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQRmZoWnNuc19oY2JQX3FqRjc3bkZvS2E4dWU2VlBmdGxlNEQ0a3ZXUXZBVXpUekxhdUhuWVVvendLekM4Z3p3QTNQaktlMExiN0ZKQWJuNzhMdVZDZ01tUUNIY2F6WlZYdkoyaUpNTXJzc3JJdDZfRGNiZVNBS2NrUTFSc0h1bUFtSnJBVlUtRjhvdXF3MHBr?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxONmNaUEtsR0M3eFNjX2N2M0RfQ3NEMXlGYklTZFFhdTNPcW9CZkNQRFlySlpHbmJKN3QzNlNYOGJNejhCWk9jNm41Y1Q3Q2t5cEFwYnp2Zy1XLWtQbEY3TXAzT3JaLU1kQzhodzVKU05hQ2daNkdDcWZUczZjSlg3QUs5NEdLTUlkZkVMQmt3aHRwSUlYajl2NW1ZY1htUGE2Q3lDRGNlQXVCVm1fTHZIOWxza08wYWI4Q2h6ZkppZXNudG8?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/china-chongqing-landslide-rescue.png",
      "alt": "Rock and earth debris from a landslide covering a road",
      "credit": "CaseGrillot, CC0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 24 August AD 79, Mount Vesuvius erupted above the Bay of Naples and buried the Roman towns of Pompeii and Herculaneum under metres of ash, pumice and pyroclastic surge in the course of a single day. Thousands died where they stood or huddled, and centuries later excavators found the hollows left by their decayed bodies and filled them with plaster to recover their final postures. The Roman historian Cassius Dio recorded that the eruption \"buried two entire cities,\" while the young Pliny watched a black cloud roll over the coast. Whole communities simply vanished beneath the debris shed by the mountain, the living entombed by falling earth. Just as Vesuvius smothered Pompeii and Herculaneum under a suffocating blanket of volcanic earth, the Chongqing hillside collapsed onto the homes below, burying residents in mud and rock and leaving rescuers to dig for the missing.",
        "excerpt": "While this was going on, an inconceivable quantity of ashes was blown out, which covered both sea and land and filled all the air. It wrought much injury of various kinds, as chance befell, to men and farms and cattle, and in particular it destroyed all fish and birds. Furthermore, it buried two entire cities, Herculaneum and Pompeii, the latter place while its populace was seated in the theatre.",
        "source": "Cassius Dio, Roman History, Book LXVI (Epitome), trans. Earnest Cary, Loeb Classical Library (1925); digitized at LacusCurtius, University of Chicago.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/66*.html",
        "image": {
          "src": "/covers/china-chongqing-landslide-rescue--a0.png",
          "alt": "Plaster cast of a victim of the AD 79 eruption in the Garden of the Fugitives, Pompeii",
          "credit": "Photograph via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On the morning of 21 October 1966, after days of heavy rain, a vast colliery spoil tip perched above the Welsh mining village of Aberfan gave way and slid down the mountainside as a black slurry of saturated coal waste. The avalanche engulfed Pantglas Junior School and a row of houses, killing 144 people, 116 of them children who had just returned to their classrooms. Miners and rescuers dug frantically through the sodden debris by hand, but almost no one was pulled out alive after the first hour. An official tribunal later blamed the National Coal Board for tipping waste on top of mountain springs, so that the rain turned the heap into a moving mass. Just as the rain-soaked tip buried Aberfan's children and left a village clawing through the muck for survivors, the Chongqing landslide swallowed homes after relentless rain and sent rescuers to search the rubble for the missing.",
        "excerpt": "After days of downpour the mountain of coal waste turned to a black river and poured down onto the school in minutes, silencing a whole generation of a village's children. Fathers came running from the pit to dig into the slurry with their bare hands, listening for any sound beneath the mud. For hours the crowd worked and prayed, but the tip had given up almost no one alive.",
        "source": "People's Collection Wales, \"Aberfan Disaster\" archive; and Report of the Tribunal appointed to inquire into the Disaster at Aberfan on 21st October 1966 (HMSO, 1967).",
        "href": "https://www.peoplescollection.wales/collections/1791831",
        "image": {
          "src": "/covers/china-chongqing-landslide-rescue--a1.png",
          "alt": "Rescuers searching through the demolished Pantglas school after the Aberfan disaster, 1966",
          "credit": "Via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Flood narrative in the Book of Genesis (chapters 6 to 9), preserved here in the King James Version of 1611, tells how God, grieved by human wickedness, sent forty days and nights of rain until the waters prevailed exceedingly and covered even the highest mountains. Every living thing outside Noah's ark perished, drowned and blotted out from the face of the ground. It is the archetypal deluge story of Western literature, an image of the whole world dissolved and of humanity engulfed by rising water. The tale has shaped how cultures narrate catastrophic floods for millennia. Just as Genesis imagines whole populations swept away and buried beneath the waters, the rain-triggered landslide in Chongqing engulfed homes and people, earth and water together closing over the living.",
        "excerpt": "And all flesh died that moved upon the earth, both of fowl, and of cattle, and of beast, and of every creeping thing that creepeth upon the earth, and every man: All in whose nostrils was the breath of life, of all that was in the dry land, died.",
        "source": "The Holy Bible, King James Version, Book of Genesis 7:21-22; Project Gutenberg eBook #10.",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/china-chongqing-landslide-rescue--a2.png",
          "alt": "'The Deluge', engraving by Gustave Dore for The Holy Bible, showing figures clinging to a rock above the flood",
          "credit": "Gustave Dore, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In two celebrated letters to the historian Tacitus, written around AD 106, Pliny the Younger described the eruption of Vesuvius that he had witnessed as a young man at Misenum, across the bay, in AD 79. In the second letter he recounts the fall of ash, a darkness like that of a sealed and lightless room, and the panic of crowds groping and fleeing in the dark. His account is the earliest detailed eyewitness description of a volcanic catastrophe and a masterpiece of Latin epistolary prose. He captured both the terror of burial beneath falling debris and the desperate search of families for one another by the sound of their voices. Just as Pliny recorded people crying out for their children and parents amid the choking ash, families in Chongqing waited as rescuers combed the mud for loved ones lost when the slope came down.",
        "excerpt": "You might hear the shrieks of women, the screams of children, and the shouts of men; some calling for their children, others for their parents, others for their husbands, and seeking to recognise each other by the voices that replied; one lamenting his own fate, another that of his family; some wishing to die, from the very fear of dying; some lifting their hands to the gods; but the greater part convinced that there were now no gods at all, and that the final endless night of which we have heard had come upon the world.",
        "source": "Pliny the Younger, Letters, Book VI, Letter 20 (to Tacitus), trans. William Melmoth, rev. F. C. T. Bosanquet; Letters of Pliny, Project Gutenberg eBook #2811.",
        "href": "https://www.gutenberg.org/files/2811/2811-h/2811-h.htm",
        "image": {
          "src": "/covers/china-chongqing-landslide-rescue--a3.png",
          "alt": "'Pliny the Younger and his Mother at Misenum, 79 A.D.', painted by Angelica Kauffmann, 1785",
          "credit": "Angelica Kauffmann; Princeton University Art Museum, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Karl Bryullov painted \"The Last Day of Pompeii\" between 1830 and 1833, a vast Romantic canvas now held in the State Russian Museum in St Petersburg. It depicts the AD 79 eruption of Vesuvius as a moment of sublime terror: columns and statues topple, the sky burns red and black, and figures shield their children and the fallen as ash and stone rain down. Bryullov had walked the excavated ruins and modelled several poses on the plaster casts of the dead. The painting became a European sensation and an enduring emblem of a civilization overwhelmed by nature. Just as Bryullov froze the instant a city was crushed and its people buried beneath a collapsing, fiery sky, the Chongqing landslide struck without warning, burying homes and lives under earth loosened by days of rain.",
        "excerpt": "Bryullov's enormous canvas holds the eye on a single unbearable instant: the ground heaves, monuments crack and fall, and the crowd scatters beneath a sky choked with black smoke and red fire. Mothers curl over their children, a son carries his aged father, and the newly dead lie among the fleeing, all lit by lightning and the glow of the erupting mountain. It is the image of an entire community caught in the act of being swallowed.",
        "source": "Karl Bryullov, \"The Last Day of Pompeii\" (1830-1833), oil on canvas, State Russian Museum, St Petersburg; image via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/china-chongqing-landslide-rescue--a4.png",
          "alt": "'The Last Day of Pompeii' by Karl Bryullov, 1830-1833",
          "credit": "Karl Bryullov; State Russian Museum, via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "The English Romantic painter John Martin produced several apocalyptic versions of \"The Deluge\" in the 1820s and 1830s, including a celebrated 1834 oil now in the Yale Center for British Art. Martin renders Noah's flood as a cosmic cataclysm: tiny human figures cling to a last black crag while towering walls of water rise beneath a storm-riven sky and a blood-coloured moon. His grand, terrifying visions of the earth engulfed made him one of the most popular artists of his age. The scene distils the horror of a world drowned and of humanity swept helplessly away. Just as Martin's canvas shows helpless figures overwhelmed by an unstoppable surge of water and earth, the deluge of rain in Chongqing loosened the hillside and swept homes and people into the rubble below.",
        "excerpt": "In Martin's vision the last survivors are reduced to specks, clinging to a jagged spur of rock as the sea climbs to drown the mountains. Above them the heavens split with lightning and a lurid moon, and the water advances as an immense, indifferent wall. Nothing human can stand against it; the whole world is going under at once.",
        "source": "John Martin, \"The Deluge\" (1834), oil on canvas, Yale Center for British Art; image via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Deluge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/china-chongqing-landslide-rescue--a5.png",
          "alt": "'The Deluge' by John Martin, 1834",
          "credit": "John Martin; Yale Center for British Art, via Wikimedia Commons (Google Art Project)"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "boeing-farnborough-air-force-one-2028",
    "headline": "Boeing says it is on track to deliver Air Force One in 2028 as costs rise, focusing on production at the Farnborough Airshow",
    "overview": "Boeing told the Farnborough International Airshow it is concentrating on stabilizing aircraft production rather than chasing new orders, and said it remains on track to deliver the delayed new Air Force One presidential jets in 2028 even as costs on the program keep rising. The manufacturer has spent years working to recover from production and safety setbacks. Executives framed the airshow as a moment to prove Boeing's factories are running steadily again.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxNYVQtT1FGajJ6R2NhQ2FoRmZVWlNUMVpCa3NFbkZNSkFhWTd5MXVOWGpqUkpFektxWkg2dEIyQzB5N3l0RUFzVXdsR29mME9HR3I0WVlKMkZDR25BM2V0VEZkVDJxX0x0RzhiTXJrdVktYUZIMVBnWWh1Y0pKMmd4NXU1U2RldWpSZ3hWUTRLaw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOOFN4blNJcmlZR1hNMV9xZ1BkUF9uMjY1TE53bjBxX1B6TmFBRzg3NE1CR0tNME94elA0cEpXRC1FMEttb21zdnR2TTUwOWs1ZS1POEpnZFpRa01udnhhT0VfV2RuT25DRWFiTkU2bGI1NFl3b2lHbVpvdDlRdnpRWnoydXBtX0RFZTZmUjNBTU9BWG44SkdyNnJ2dFhoRDRKNVVnUnEyaVBFSFE3c3J3aEFaRUhBU0Z6?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/boeing-farnborough-air-force-one-2028.png",
      "alt": "A Boeing VC-25, the aircraft that serves as Air Force One",
      "credit": "Oren Rozen, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Swedish warship Vasa was the proudest project of King Gustavus Adolphus, a floating palace bristling with gilded sculpture and two full gun decks, built at Stockholm between 1626 and 1628 under royal pressure to be grander and more heavily armed than any ship afloat. On 10 August 1628, before a celebrating crowd, she set out on her maiden voyage, sailed barely 1,300 metres into Stockholm harbour, heeled over in a gust of wind, took water through her open gun ports and sank, killing about thirty people. Rushed design changes and a top-heavy hull, never properly tested, doomed a vessel meant to advertise the crown's power and craftsmanship. The wreck was raised almost intact in 1961 and is now the centrepiece of Stockholm's Vasa Museum. Just as the Vasa was a ruler's showcase ship pushed toward completion despite unproven engineering, Boeing's presidential jets are a state vessel whose ambitions have collided with the hard limits of getting the manufacturing right.",
        "excerpt": "The Vasa was a ceremonial and military symbol of a rising empire, its hull crowded with hundreds of painted and gilded carvings glorifying the Swedish crown. Ordered in haste and altered during construction to carry ever heavier armament, it capsized within minutes of leaving the quay, a monument to ambition outrunning sound engineering. The disaster showed how a project meant to project power could instead expose the fragility beneath its splendour.",
        "source": "\"Vasa (ship),\" Wikipedia, The Free Encyclopedia (accessed 2026); see also the Vasa Museum, Stockholm.",
        "href": "https://en.wikipedia.org/wiki/Vasa_(ship)",
        "image": {
          "src": "/covers/boeing-farnborough-air-force-one-2028--a0.png",
          "alt": "The ornately carved and gilded stern of the warship Vasa, preserved in the Vasa Museum",
          "credit": "Stern of the Vasa, Vasa Museum, Stockholm; photograph via Wikimedia Commons (CC BY-SA)"
        }
      },
      {
        "category": "historical",
        "title": "The British airship R101 was one of the grandest flying machines ever attempted, a state-backed giant more than 220 metres long built at Cardington to carry passengers across the Empire as part of the government's Imperial Airship Scheme. Beset by delays, ballooning costs, and pressure to prove itself, the R101 was hurried into service before its problems with weight and lift were resolved. On 5 October 1930, on its maiden overseas flight to India, it crashed into a hillside near Beauvais, France, and burst into flames, killing 48 of the 54 people aboard, including the Air Minister Lord Thomson. The catastrophe effectively ended Britain's rigid-airship programme overnight. Just as the R101 was a prestige aircraft rushed aloft before the engineering was truly ready, Boeing's decision at Farnborough to slow down and stabilise production reads as the hard-won lesson that a flagship flying machine cannot be forced to fly on a schedule.",
        "excerpt": "The R101 embodied a nation's dream of mastering the air, a colossal silver hull financed by the state and freighted with imperial expectation. Chronically overweight and behind schedule, it was pushed into a showcase voyage before its designers had solved the problems that dogged it, and it fell in flames on a French hillside. Its wreck became a warning that grand engineering, hurried toward a deadline, can end not in triumph but in disaster.",
        "source": "\"R101,\" Wikipedia, The Free Encyclopedia (accessed 2026).",
        "href": "https://en.wikipedia.org/wiki/R101",
        "image": {
          "src": "/covers/boeing-farnborough-air-force-one-2028--a1.png",
          "alt": "The British rigid airship R101 in flight",
          "credit": "The airship R101 in flight, c. 1929–1930; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Book VIII of Ovid's Metamorphoses, written around 8 AD, the master craftsman Daedalus, imprisoned in Crete with his son Icarus, builds wings of feathers and wax so that the pair may escape by flight, warning the boy to keep a middle course between sea and sun. Exhilarated by the new machine, Icarus climbs too high; the sun melts the wax, his wings fall apart, and he plunges into the sea that would bear his name. Daedalus, the great inventor, is left cursing his own artistry as he buries his son. The tale has stood for two millennia as the archetype of human ingenuity, ambition, and the dream of flight ending in ruin. Just as Daedalus's brilliant contraption is undone by overreach and the limits of its materials, Boeing's presidential jets show how even the most advanced engineering can falter when ambition runs ahead of what can be safely built.",
        "excerpt": "The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air. His face, too, as he called on the name of his father, was received in the azure water, which received its name from him.",
        "source": "Ovid, The Metamorphoses of Ovid, Book VIII, trans. Henry T. Riley (London, 1893); Project Gutenberg eBook #26073.",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm",
        "image": {
          "src": "/covers/boeing-farnborough-air-force-one-2028--a2.png",
          "alt": "Painting of Daedalus fitting winged Icarus with feathered wings",
          "credit": "Anthony van Dyck, Daedalus and Icarus, c. 1620; Art Gallery of Ontario, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The story of the Tower of Babel, told in Genesis 11 of the Hebrew Bible, describes how the descendants of Noah, speaking a single language, resolve to build a city and a tower \"whose top may reach unto heaven\" to make a name for themselves. Their grand construction is a monument to collective ambition, but the project is never finished: God confounds their language so they can no longer understand one another, and the builders are scattered across the earth, leaving the tower unbuilt. The name Babel, glossed as \"confusion,\" became the enduring emblem of an ambitious mega-project undone by human pride and by the practical impossibility of holding it together. For centuries artists and writers have returned to it as the image of overreaching engineering. Just as Babel's builders reached for the heavens only to see their work stall and fragment, Boeing's long-delayed presidential jets illustrate how a soaring project can bog down when ambition outpaces the ability to complete it.",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "Genesis 11:4, The Holy Bible, King James Version (1611); Project Gutenberg eBook #10.",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/boeing-farnborough-air-force-one-2028--a3.png",
          "alt": "Pieter Bruegel the Elder's painting of the unfinished Tower of Babel",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel, 1563; Kunsthistorisches Museum, Vienna, via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "\"Landscape with the Fall of Icarus,\" a painting associated with Pieter Bruegel the Elder and dating to around the 1560s (the surviving version hangs in the Royal Museums of Fine Arts of Belgium in Brussels), turns the myth of failed flight into a quiet, unsettling landscape. A ploughman, a shepherd, and a fisherman go about their work while, almost unnoticed in a corner of the sea, a pair of pale legs disappears beneath the water: all that remains of Icarus after his plunge. The grand catastrophe of the ambitious flying machine is reduced to a small splash the world barely registers. The painting has become the most famous meditation on the gap between soaring aspiration and its indifferent, humbling end. Just as Bruegel frames the fall of the would-be aviator as the costly footnote to human overreach, the saga of Boeing's presidential jets is a reminder that a flagship dream of flight can quietly founder amid rising costs while ordinary work carries on around it.",
        "excerpt": "In Bruegel's tranquil harbour the eye searches for the hero and finds only two flailing legs vanishing into the green water, easy to miss beside the plodding ploughman and the grazing sheep. The painter renders the collapse of the great flying venture as a small disturbance in the corner of the world, unremarked and almost private. It is a portrait of ambition's downfall dressed as an ordinary afternoon.",
        "source": "Pieter Bruegel the Elder (attrib.), Landscape with the Fall of Icarus, c. 1560s; Royal Museums of Fine Arts of Belgium, Brussels. Image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/boeing-farnborough-air-force-one-2028--a4.png",
          "alt": "Bruegel's painting of a coastal landscape with a ploughman, ships, and the legs of Icarus disappearing into the sea",
          "credit": "After Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1560s; Royal Museums of Fine Arts of Belgium, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Canaletto's \"Return of the Bucintoro on Ascension Day,\" painted around 1732, depicts Venice's most magnificent ceremonial vessel, the Bucintoro, a gilded state galley used by the Doge for the annual \"Marriage of the Sea\" ritual. In the painting the immense, richly ornamented barge, glittering with gold carving and rowed in stately procession before the Doge's Palace, is the ultimate symbol of a ruler's power made visible through lavish craftsmanship. The Bucintoro existed purely to carry the head of state in splendour, a floating throne whose grandeur announced the prestige of the Republic. It stands in the tradition of the ceremonial vessels and state carriages that sovereigns have always commissioned to project majesty. Just as the Bucintoro was a magnificent ship built to bear the ruler in ceremony, Boeing's new Air Force One is the modern presidential vessel, a flying symbol of state whose costly, painstaking construction reflects how much prestige is invested in the craft that carries a leader.",
        "excerpt": "Canaletto sets the Doge's golden barge against the shimmering water before the Piazzetta, every carved figure and gilded flourish catching the Venetian light. The great ceremonial ship dominates a stage crowded with gondolas and onlookers, a spectacle engineered to make the ruler's authority visible on the water. It is the state vessel as pure pageantry, magnificence built to carry power.",
        "source": "Canaletto (Giovanni Antonio Canal), Return of the Bucintoro on Ascension Day, c. 1732. Image via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Canaletto_-_Return_of_%27Il_Bucintoro%27_on_Ascension_Day_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/boeing-farnborough-air-force-one-2028--a5.png",
          "alt": "Canaletto's painting of the gilded Venetian state galley Bucintoro before the Doge's Palace",
          "credit": "Canaletto, Return of the Bucintoro on Ascension Day, c. 1732; via Wikimedia Commons (Google Art Project)"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "gulf-oil-exports-markets-iran-war",
    "headline": "Gulf oil exports slow and Gulf stock markets fall as the U.S.-Iran war intensifies",
    "overview": "Crude exports from the Gulf jumped in July but tanker shipments have begun slowing as renewed U.S.-Iran hostilities disrupt regional shipping, ship-tracking data showed. Gulf stock markets fell as the fighting intensified, with bourses across the region retreating on fears the war could choke off energy flows through the Strait of Hormuz. The twin pressures underscored how quickly conflict can ripple into the world's oil trade.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxON0s2bmk4NkZfVGZ5R2tpZzEwYXo4Ymhxb0lyYUlNQlR4X29mekhzS0RGUndSMllMbnpZTGdRYlRZV3NmT0dBNGFyOTkxSFNTZEJTcE05cWtoNzREYU16TW5IUGJ4Zm9qa0lkbUI5Rmg1X1dldEI4MnZJdjNLcTBjTlkyMnRPSzRaUGdtNG9hWFRkaExsV3B4S3ZTb3ptaGlmM2w1ZWcteU5Jc1RTSGFRVjJncHZZLXoxUFliWTFWdGhHWnlkSkRudQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQTzIxWFlrMnEyMFZoNHBRTjFybFYyNWtmNktvMlRFaGM0X2RBeWNzZzhycWxlVl9rSTlpdnBGVzY2dlZzWkFGUThqbkZPQUREak85NUREUjFkalExaHBJSk53aEFScDA0dFY2b1NwMlNiRVNkWndZanEzM05HVF9NNktScnUyNDdESkY5VlBTZDNsU3c0ZVY4aG1aaWZlZi1iQ3J2Y1Rn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/gulf-oil-exports-markets-iran-war.png",
      "alt": "An oil tanker under naval escort in the Persian Gulf",
      "credit": "U.S. Navy (PH2 Elliot). Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the spring of 1452 the Ottoman sultan Mehmed II raised the great fortress of Rumeli Hisari on the European bank of the Bosphorus, the narrow strait guarding Constantinople, and armed it with cannon to command the waterway. He posted an aga and four hundred Janissaries to levy a toll on every passing ship, and when a Venetian vessel refused to submit it was sunk with a single shot, its crew dragged in chains to the Porte. The blockade choked the grain and Black Sea trade that fed the city and helped seal its fall on 29 May 1453, an event that later spurred Europe to seek new sea routes to the spices of the East. A single garrison on a slender channel could throttle the commerce of an empire. Just as one fortress on the Bosphorus once strangled the shipping of a whole capital, so today the fear that war could seal the Strait of Hormuz sends Gulf tankers and stock markets reeling.",
        "excerpt": "he stationed a vigilant Aga and four hundred Janizaries, to levy a tribute on the ships of every nation that should pass within the reach of their cannon. A Venetian vessel, refusing obedience to the new lords of the Bosphorus, was sunk with a single bullet.",
        "source": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire, Chapter LXVIII. Project Gutenberg (public domain).",
        "href": "https://www.gutenberg.org/cache/epub/25717/pg25717.txt",
        "image": {
          "src": "/covers/gulf-oil-exports-markets-iran-war--a0.png",
          "alt": "Sultan Mehmed II and his army entering conquered Constantinople in 1453",
          "credit": "Fausto Zonaro, 'Mehmed II Entering Constantinople' (1903). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "During the October 1973 Arab-Israeli War, the Arab members of OPEC, led by Saudi Arabia, declared an embargo on oil shipments to the United States and other nations that had supported Israel, and cut production besides. The price of crude roughly quadrupled, from about three to twelve dollars a barrel, triggering fuel rationing, shuttered filling stations and the long lines that became the enduring image of the crisis; U.S. and European stock markets slid into a punishing bear market. It took months of shuttle diplomacy before the embargo was lifted in March 1974, but it had exposed how a distant political conflict could seize up the engine of the world economy. Energy had become a weapon, and every importing nation felt its edge. Just as the 1973 embargo showed how quickly war in the Middle East could spike prices and shake markets far away, so the renewed U.S.-Iran fighting now slows Gulf exports and drives regional bourses lower.",
        "excerpt": "During the 1973 Arab-Israeli War, Arab members of the Organization of Petroleum Exporting Countries (OPEC) imposed an embargo against the United States in retaliation for the U.S. decision to re-supply the Israeli military and to gain leverage in the post-war peace negotiations.",
        "source": "U.S. Department of State, Office of the Historian, 'Oil Embargo, 1973-1974' (U.S. government, public domain).",
        "href": "https://history.state.gov/milestones/1969-1976/oil-embargo",
        "image": {
          "src": "/covers/gulf-oil-exports-markets-iran-war--a1.png",
          "alt": "A downtown Portland gas station displays a 'Sold Out' sign during the 1974 fuel shortage",
          "credit": "David Falconer, U.S. National Archives (DOCUMERICA), May 1974. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In the opening scene of Shakespeare's The Merchant of Venice (c. 1596-98), the merchant Antonio's friends tease that his melancholy must spring from worry over his fortunes, all of which are ventured at sea. Salarino pictures Antonio's 'argosies with portly sail' riding the ocean like great lords, dwarfing the smaller 'traffickers' that bob past them, and imagines the dreadful moment a wrecking wind might scatter that wealth across the waters. The whole plot turns on this exposure: Antonio's ships are rumored lost, his bond to Shylock falls due, and a man's life hangs on cargoes still at the mercy of wind and rock. Fortune built on distant shipping can capsize in an instant. Just as Antonio's fortunes rise and fall with vessels he cannot see, so Gulf traders and investors watch anxiously as war threatens the tankers carrying their prosperity.",
        "excerpt": "Your mind is tossing on the ocean,\nThere where your argosies, with portly sail\nLike signiors and rich burghers on the flood,\nOr as it were the pageants of the sea,\nDo overpeer the petty traffickers\nThat curtsy to them, do them reverence,\nAs they fly by them with their woven wings.",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 1. Project Gutenberg (public domain).",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm",
        "image": {
          "src": "/covers/gulf-oil-exports-markets-iran-war--a2.png",
          "alt": "Shylock and his daughter Jessica, a scene from The Merchant of Venice",
          "credit": "Maurycy Gottlieb, 'Shylock and Jessica' (1876). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In the frame of the Thousand and One Nights, Sindbad the Sailor recounts to a poor porter how he squandered his inheritance, then sold his goods and staked everything on seaborne trade. In the First Voyage he sails from Basra down through the Persian Gulf with a company of merchants, only to be shipwrecked when the 'island' they land on proves to be a vast whale that dives beneath them. Across seven voyages he is repeatedly enriched and ruined by the sea, his fortune forever hostage to storm, monster and chance in the same Gulf waters that carry today's oil. The tales, translated into English by the eighteenth century, made the merchant-adventurer of the Indian Ocean and the Gulf a byword for wealth wrung from perilous voyages. Just as Sindbad's riches ride the uncertain currents of the Persian Gulf, so the Gulf's modern export trade now trembles as war unsettles the very same passage.",
        "excerpt": "I sold all my household goods by public auction, and joined a company of merchants who traded by sea, embarking with them at Balsora in a ship which we had fitted out between us. We set sail and took our course towards the East Indies by the Persian Gulf, having the coast of Persia upon our left hand and upon our right the shores of Arabia Felix.",
        "source": "'The Seven Voyages of Sindbad the Sailor,' in The Arabian Nights Entertainments (Andrew Lang, ed.). Project Gutenberg (public domain).",
        "href": "https://www.gutenberg.org/files/128/128-h/128-h.htm",
        "image": {
          "src": "/covers/gulf-oil-exports-markets-iran-war--a3.png",
          "alt": "Sindbad the Sailor amid the perils of one of his sea voyages",
          "credit": "Illustration to 'The Fifth Voyage of Sindbad the Sailor.' Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Claude Lorrain painted 'Seaport with the Embarkation of the Queen of Sheba' in 1648, now in the National Gallery, London. It shows a grand Mediterranean harbour at dawn, the low sun laying a golden path across the water while merchant ships ride at anchor and figures load boats along a marble quay lined with palaces. Though its subject is biblical, the picture is really a hymn to seaborne commerce at its serene, prosperous height, the very ideal of trade flowing freely and safely from a great port. That calm is precisely what war removes. Just as Claude's harbour glows with the untroubled abundance of open sea trade, so its opposite haunts the Gulf today, where the threat of a blockaded strait replaces such tranquil commerce with fear and falling markets.",
        "excerpt": "In Claude Lorrain's canvas the harbour lies bathed in a tranquil golden light, its ships mirrored in still water as merchants and porters go calmly about the business of loading and departure. Every mast and colonnade speaks of trade flowing without hindrance, of wealth carried safely across an open and untroubled sea. It is the serene abundance that war and blockade extinguish.",
        "source": "Claude Lorrain, 'Seaport with the Embarkation of the Queen of Sheba' (1648), The National Gallery, London. Via Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Lorrain_-_Seaport_with_the_Embarkation_of_the_Queen_of_Sheba_-_WGA05002.jpg",
        "image": {
          "src": "/covers/gulf-oil-exports-markets-iran-war--a4.png",
          "alt": "A luminous Mediterranean harbour at sunrise crowded with merchant ships and figures on the quay",
          "credit": "Claude Lorrain, 'Seaport with the Embarkation of the Queen of Sheba' (1648), The National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Nikolai Rimsky-Korsakov composed his symphonic suite 'Scheherazade,' Op. 35, in 1888, drawing on the Thousand and One Nights. Its very first movement, 'The Sea and Sinbad's Ship,' rolls out a broad, surging theme that evokes swelling waves and a merchant vessel setting forth across the deep, while a solo violin, the storyteller Scheherazade, weaves the frame that binds the tales. The music captures both the romance and the danger of ocean voyaging: the sea gives fortune and just as readily swallows it. A former naval officer, Rimsky-Korsakov knew the moods of the water at first hand. Just as his surging seascape carries Sinbad's trading ship over waves that may enrich or drown it, so the Gulf's oil-laden vessels now sail waters whose calm has been broken by war.",
        "excerpt": "Rimsky-Korsakov's suite opens with a broad, rocking theme that seems to lift and drop like a ship on an open swell, carrying Sinbad's vessel out toward the horizon. The solo violin returns again and again as the storyteller, spinning fortune and peril from the same restless sea. It is music in which trade, adventure and danger ride the very same waves.",
        "source": "Nikolai Rimsky-Korsakov, 'Scheherazade,' Op. 35 (1888), I. 'The Sea and Sinbad's Ship.' Score via IMSLP (public domain).",
        "href": "https://imslp.org/wiki/Scheherazade,_Op.35_(Rimsky-Korsakov,_Nikolay)",
        "image": {
          "src": "/covers/gulf-oil-exports-markets-iran-war--a5.png",
          "alt": "Portrait of the Russian composer Nikolai Rimsky-Korsakov",
          "credit": "Valentin Serov, 'Portrait of the Composer Nikolai Rimsky-Korsakov' (1898). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "hungary-magyar-nominates-polgar-president",
    "headline": "Hungary's PM Peter Magyar says he will nominate chess champion Judit Polgar as president",
    "overview": "Hungary's prime minister, Peter Magyar, said he will nominate the chess grandmaster Judit Polgar, widely regarded as the strongest female player in the game's history, to become the country's next president. The move follows President Tamas Sulyok's agreement to step down after parliament backed a constitutional change forcing his removal. Polgar would bring an unusually apolitical, internationally admired profile to the largely ceremonial post.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPUWxOZ3R4MG94U0tvZGVmdV9qcS1iMkN3dldKV3o0a1M0VTNlTllWV2JEWlMtTU93eHhZdU1QV0VGMWh6R2ZFcVBZdVE3MGVrSC1ybHUyTUlBbWJTQV9MZGd5M3RfclN2a3Q5STVxWXFoMURUdF95cEw0Y3FSc2tub0ZSaHFpSTBVSjg1RFdjdEstWU5SaDdrN2Vuak1iQnpaa0FhNWFDNVNEUDRDNkE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/hungary-magyar-nominates-polgar-president.png",
      "alt": "Chess grandmaster Judit Polgar",
      "credit": "Przemyslaw Jahr, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 458 BC, with a Roman army trapped by the Aequi at Mount Algidus, the Senate turned to Lucius Quinctius Cincinnatus, a former consul who had retired to farm a small plot across the Tiber. The deputation found him at his plough; he laid down his tools, assumed the office of dictator, raised a levy, and crushed the enemy within days. Then, having held absolute power for barely two weeks, he resigned the dictatorship and returned to his fields, becoming Rome's enduring emblem of the reluctant leader who serves and steps aside. Livy preserved the story as a rebuke to those who measure human worth by wealth alone. Just as Rome summoned an unassuming man of proven virtue from private life to hold its highest office and stand above faction, Hungary's leaders would call Judit Polgar from the world of chess into the ceremonial presidency, a figure deliberately placed above the political fray.",
        "excerpt": "The one hope of Rome, L. Quinctius, used to cultivate a four-acre field on the other side of the Tiber, just opposite the place where the dockyard and arsenal are now situated; it bears the name of the ‘Quinctian Meadows.’ There he was found by the deputation from the senate either digging out a ditch or ploughing, at all events, as is generally agreed, intent on his husbandry.",
        "source": "Livy, History of Rome, Book 3, ch. 26 (trans. Rev. Canon Roberts). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0026%3Abook%3D3%3Achapter%3D26",
        "image": {
          "src": "/covers/hungary-magyar-nominates-polgar-president--a0.png",
          "alt": "Painting of Cincinnatus receiving the Roman senate's deputation at his farm",
          "credit": "Giovanni Francesco Romanelli, Cincinnatus, Musée du Louvre, Paris. Via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Ignacy Jan Paderewski (1860–1941) was the most celebrated pianist of his age, a Polish virtuoso whose recitals in Vienna, Paris, London and America provoked near-hysterical adulation. When Poland regained its independence after the First World War, this artist with no political career was thrust into statecraft: in January 1919 he became Prime Minister and Foreign Minister of the new republic, and he signed the Treaty of Versailles on Poland's behalf. It was his worldwide fame and moral authority, not partisan maneuvering, that made him a unifying national figure. His elevation showed how a country can reach past its politicians to a universally admired talent as a symbol of the nation. Just as Poland turned to a globally renowned musician to embody its young republic, Hungary would raise its most acclaimed chess grandmaster to the presidency as an apolitical figure standing above party.",
        "excerpt": "He made his first public appearance in Vienna in 1887, in Paris in 1889, and in London in 1890, his brilliant playing created a furore which went to almost extravagant lengths of admiration; and his triumphs were repeated in America in 1891. His name at once became synonymous with the highest pitch of pianoforte playing, and society was at his feet.",
        "source": "“Paderewski, Ignace Jan,” Encyclopædia Britannica (11th ed., 1911), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Paderewski,_Ignace_Jan",
        "image": {
          "src": "/covers/hungary-magyar-nominates-polgar-president--a1.png",
          "alt": "Painted portrait of pianist and statesman Ignacy Jan Paderewski",
          "credit": "Lawrence Alma-Tadema, Portrait of Ignacy Jan Paderewski (1891), National Museum in Warsaw. Via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Lewis Carroll's Through the Looking-Glass, and What Alice Found There (1871), young Alice steps into a mirror-world laid out as a giant chessboard, its landscape divided into squares and its inhabitants moving as the pieces. Entering as a mere pawn — the White Queen's Pawn — she is told that if she can reach the eighth rank she will herself become a Queen, and the whole plot follows that promotion across the board. Carroll even prefaced the book with a chess diagram charting Alice's moves to her coronation. The story turns the game into a metaphor for ambition, rules, and the unlikely rise of the smallest player to the highest rank. Just as Carroll's pawn crosses the board to be crowned Queen, a chess prodigy who mastered the sixty-four squares would be raised, in Hungary, to the nation's crowning ceremonial office.",
        "excerpt": "It's a great huge game of chess that's being played—all over the world—if this is the world at all, you know. Oh, what fun it is! How I wish I was one of them! I wouldn't mind being a Pawn, if only I might join—though of course I should like to be a Queen, best.",
        "source": "Lewis Carroll, Through the Looking-Glass, and What Alice Found There (1871), ch. 2. Project Gutenberg eBook #12.",
        "href": "https://www.gutenberg.org/files/12/12-0.txt",
        "image": {
          "src": "/covers/hungary-magyar-nominates-polgar-president--a2.png",
          "alt": "John Tenniel illustration of Alice with the Red Queen on the chessboard landscape",
          "credit": "John Tenniel, illustration for Through the Looking-Glass (1871). Via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Plato's Republic (c. 375 BC), Socrates argues that a just city is impossible until wisdom and power are united in the same hands — the famous doctrine of the philosopher-king. Rulers, he insists, should be those trained in truth rather than those hungry for office, and only when the wise are compelled to govern will the state find rest from its evils. The idea founded a long Western tradition of the scholar-ruler: the master of a demanding discipline summoned, almost against inclination, to lead. It frames high leadership as the duty of the gifted rather than the prize of the ambitious. Just as Plato imagined the state healed by placing a master of rigorous thought at its head, Hungary's plan would set an internationally admired champion — schooled in the most cerebral of games — into its highest office.",
        "excerpt": "Until philosophers are kings, or the kings and princes of this world have the spirit and power of philosophy, and political greatness and wisdom meet in one, and those commoner natures who pursue either to the exclusion of the other are compelled to stand aside, cities will never have rest from their evils,—nor the human race, as I believe,—and then only will this our State have a possibility of life and behold the light of day.",
        "source": "Plato, The Republic, Book V (trans. Benjamin Jowett). Project Gutenberg eBook #1497.",
        "href": "https://www.gutenberg.org/cache/epub/1497/pg1497.txt",
        "image": {
          "src": "/covers/hungary-magyar-nominates-polgar-president--a3.png",
          "alt": "Marble portrait bust of the philosopher Plato",
          "credit": "Roman copy after Silanion, portrait of Plato, Musei Capitolini, Rome. Photo Marie-Lan Nguyen, CC BY 2.5, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Thomas Eakins painted The Chess Players in 1876, a small, meticulously observed oil showing two older men bent over a game in the study of the artist's father, who looks on from behind. The scene treats chess as an image of concentration, intellect, and quiet mastery, the players wholly absorbed in a contest of pure mind. Eakins presented the picture to the Metropolitan Museum of Art in 1881, where it remains a touchstone of American realism. The painting elevates the board into a stage for thought and dignity rather than mere pastime. Just as Eakins framed the chessboard as an arena of disciplined intelligence worthy of reverence, Hungary would honor a supreme practitioner of that same intelligence by inviting her into the presidency.",
        "excerpt": "Under a warm lamp the players lean into the board, the room hushed to the geometry of the game. Every carved piece and furrowed brow insists that this is serious work — the labor of the mind made visible. Chess here is no idle diversion but a portrait of intellect at its most composed.",
        "source": "Thomas Eakins, The Chess Players (1876), oil on wood. The Metropolitan Museum of Art, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Chess_Players_MET_DT1506.jpg",
        "image": {
          "src": "/covers/hungary-magyar-nominates-polgar-president--a4.png",
          "alt": "Thomas Eakins painting of two men playing chess as an older man watches",
          "credit": "Thomas Eakins, The Chess Players (1876), The Metropolitan Museum of Art (CC0). Via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Sofonisba Anguissola, one of the first women to win international renown as a painter, completed The Chess Game in 1555, depicting three of her sisters and a servant gathered around a chessboard out of doors. The eldest sister, Lucia, has just won and turns with a knowing smile as the others react — a strikingly intimate scene that presents young women as intellectual equals in a game long coded as male and martial. Anguissola herself broke into a domain closed to women, both as a professional artist and by portraying female mastery of chess. The work now hangs in the National Museum in Poznań. Just as Anguissola pictured a young woman triumphant at the board — a prodigy claiming a space reserved for men — Judit Polgar rose to become the strongest female player in history and now stands to be crowned Hungary's president.",
        "excerpt": "Three sisters gather at the board in the cool of a garden, and the eldest lifts her hand in the small, sure gesture of victory. The painter grants these young women the gravity of strategists, their glances alive with intelligence and delight. In an age that reserved the game for men, the canvas quietly insists that mastery has no sex.",
        "source": "Sofonisba Anguissola, The Chess Game (1555), oil on canvas. National Museum, Poznań, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Chess_Game_(Sofonisba_Anguissola)_1555_(4096x3236px).jpg",
        "image": {
          "src": "/covers/hungary-magyar-nominates-polgar-president--a5.png",
          "alt": "Renaissance painting of three young women playing chess in a garden",
          "credit": "Sofonisba Anguissola, The Chess Game (1555), National Museum in Poznań. Via Wikimedia Commons."
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "taiwan-president-china-taiwan-warning",
    "headline": "Taiwan's president warns the island must not become 'China's Taiwan'",
    "overview": "Taiwan's president said the island's democracy must not be allowed to become 'China's Taiwan,' rejecting Beijing's claim of sovereignty and vowing to defend the self-governed island's freedoms. The remarks came amid sustained military drills and political pressure from China. Beijing regards Taiwan as its territory and has not ruled out taking it by force.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPNmMyZ1pTd2EyNnlYUW5BYnpZOXJXb1BkOGxER3c0SXpjajlNRzlzXzl6cU9qOUhBNmY4VFlOdlFHT0NFcWxMdTNLQkxndmY0ajk5SnBvLVItSWxkQ0lDNGxzZnNfU0ZBUFRhUnZPZHJHZUR4ZGxHdW9NTm41Y0dVSGxDRXdtU2ZHNGYwZzVaS3lMOEhZbWJSUkxyXzRkeE9aSG9rcElHNHpQRmd1X1RJ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/taiwan-president-china-taiwan-warning.png",
      "alt": "The Taipei skyline, with the Taipei 101 tower",
      "credit": "Sinchen.Lin, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 30 November 1939 the Soviet Union, having demanded territory and military bases that Finland refused to cede, invaded its small northern neighbour with overwhelming force, expecting a swift conquest. Instead, Finnish troops on skis, clad in white and led by Marshal Carl Gustaf Emil Mannerheim, held the frozen Karelian Isthmus through the winter and shattered whole Soviet divisions at battles such as Suomussalmi. Though Finland was finally forced to cede territory in the Moscow Peace Treaty of March 1940, it preserved its independence and its democracy, and the 'spirit of the Winter War' became a lasting emblem of a tiny free nation defying a superpower. A country of under four million had refused to be swallowed by a neighbour of nearly two hundred million. Just as Finland refused Moscow's ultimatum and fought to keep its self-rule, Taiwan's president insists the island's democracy must not be absorbed into 'China's Taiwan.'",
        "excerpt": "The Winter War (1939-1940) began when the Soviet Union, after Finland rejected its territorial demands, launched a massive invasion expecting a quick victory. Finnish forces, vastly outnumbered, held out for more than three months in brutal cold, and though Finland ceded land in the March 1940 peace, it kept its sovereignty and democratic government. The war became an enduring symbol of a small free people refusing to be conquered by a mighty neighbour.",
        "source": "The Winter War (Finland vs. the Soviet Union, 1939-1940); Moscow Peace Treaty, March 1940. Photograph via Imperial War Museums (HU 55566), Wikimedia Commons; historical overview via Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Winter_War",
        "image": {
          "src": "/covers/taiwan-president-china-taiwan-warning--a0.png",
          "alt": "Finnish troops in white winter gear during the Winter War, 1940",
          "credit": "Finnish troops during the Winter War, 1940. Imperial War Museums (HU 55566), public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 26 July 1581 the representatives of the Low Countries, meeting at The Hague, adopted the Plakkaat van Verlatinghe, the Act of Abjuration, formally renouncing their allegiance to King Philip II of Spain, then the mightiest empire of the age. Reasoning that a ruler who oppresses his subjects and treats them as slaves forfeits his right to rule, the provinces declared themselves free and set in motion the birth of the Dutch Republic. The decision launched decades of war against Habsburg Spain, but the northern provinces ultimately secured their sovereignty and became a beacon of self-government and commerce. It stands as one of history's boldest assertions that a people, not a distant sovereign, hold the right to determine how they are governed. Just as the Dutch provinces rejected a great power's claim to rule them from afar, Taiwan's president rejects Beijing's claim of sovereignty over the island's democratic self-rule.",
        "excerpt": "With the Act of Abjuration of 1581, the provinces of the Low Countries declared that King Philip II of Spain had forfeited his sovereignty by oppressing the people he was meant to protect, and they renounced their allegiance to him. The declaration launched the independent Dutch Republic and decades of war against the Spanish crown. It became a landmark statement that legitimate authority rests on the consent of the governed, not on the claim of a distant power.",
        "source": "Act of Abjuration (Plakkaat van Verlatinghe), 26 July 1581. Image of the original 1581 printing via Wikimedia Commons; historical overview via Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Act_of_Abjuration",
        "image": {
          "src": "/covers/taiwan-president-china-taiwan-warning--a1.png",
          "alt": "Title page of the 1581 Act of Abjuration (Plakkaat van Verlatinghe)",
          "credit": "Plakkaat van Verlatinghe (Act of Abjuration), 1581. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book 5 of his History of the Peloponnesian War, the Athenian historian Thucydides recounts the confrontation in 416 BC between the imperial city of Athens and the small island of Melos, whose people wished only to remain neutral and free. The Athenian envoys, dispensing with appeals to justice, told the Melians bluntly that in the affairs of men the powerful take what they can and the weak concede what they must. The Melians, refusing to surrender the freedom of a city inhabited for seven hundred years, put their trust in the gods and in hope; Athens then besieged the island, killed its men, and enslaved its women and children. For two and a half millennia the Melian Dialogue has stood as the starkest statement of how empires justify domination, and of a small people's refusal to accept it. Just as the Melians rejected Athens' logic that the strong simply do as they will, Taiwan's president rejects Beijing's assertion that its power alone should settle the island's fate.",
        "excerpt": "since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5.89 (the Melian Dialogue), trans. Richard Crawley. London: J. M. Dent; New York: E. P. Dutton, 1910. Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book=5:chapter=89",
        "image": {
          "src": "/covers/taiwan-president-china-taiwan-warning--a2.png",
          "alt": "Roman marble bust of the historian Thucydides",
          "credit": "Roman bust of Thucydides, Royal Ontario Museum. Photo via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Friedrich Schiller's verse drama Wilhelm Tell (1804) dramatizes the legendary rebellion of the Swiss forest cantons against the tyranny of their Habsburg overlords in the early fourteenth century. In its central scene, the men of Uri, Schwyz, and Unterwalden gather by night on the meadow of the Ruetli above Lake Lucerne and swear a solemn oath to stand together as one people and defend their ancient liberties. Their vow, to be a band of brothers, to be free as their fathers were, and to trust in God rather than quail before the might of man, became a founding myth of Swiss independence and a rallying cry for national freedom across Europe. Schiller turned a small mountain people's defiance of an empire into one of the most enduring dramas of liberty ever written. Just as the Ruetli confederates swore to remain free rather than submit to a foreign power, Taiwan's president vows to defend the island's self-government against absorption.",
        "excerpt": "A band of brothers true we swear to be, / Never to part in danger or in death! ... We swear we will be free as were our sires, / And sooner die than live in slavery! ... We swear, to put our trust in God Most High, / And not to quail before the might of man!",
        "source": "Friedrich Schiller, Wilhelm Tell (1804), Act II, Scene 2 (the Ruetli oath), trans. Theodore Martin. Project Gutenberg eBook #2782.",
        "href": "https://www.gutenberg.org/cache/epub/2782/pg2782.txt",
        "image": {
          "src": "/covers/taiwan-president-china-taiwan-warning--a3.png",
          "alt": "Painting of the three Swiss confederates swearing the oath on the Ruetli",
          "credit": "Henry Fuseli (Johann Heinrich Fuessli), The Oath on the Ruetli, c. 1780, Kunsthaus Zuerich. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Eugene Delacroix painted La Liberte guidant le peuple (Liberty Leading the People) in 1830 to commemorate the July Revolution that toppled the Bourbon king Charles X in Paris. At its centre a bare-breasted allegory of Liberty, the tricolour flag in one hand and a musket in the other, strides over the barricades and the fallen, leading a mixed crowd of workers, students, and bourgeois toward freedom. Now hanging in the Louvre, the canvas became the definitive image of a people rising to claim its own government against an oppressive power, and an emblem of liberty far beyond France. Its charged fusion of the ideal and the real has made it one of the most recognizable political paintings in the world. Just as Delacroix's Liberty rallies a people to seize its freedom, Taiwan's president summons the island to defend its hard-won democracy against a mightier claimant.",
        "excerpt": "Painted in 1830, Delacroix's Liberty Leading the People shows an armed, flag-bearing figure of Liberty striding over the barricades of revolutionary Paris, leading citizens of every class forward. It transforms a specific uprising into a timeless image of a people asserting its right to self-government against tyranny. Bold, turbulent, and defiant, the canvas has become one of the world's enduring symbols of the struggle for freedom.",
        "source": "Eugene Delacroix, La Liberte guidant le peuple (Liberty Leading the People), 1830, oil on canvas, Musee du Louvre, Paris. Image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/taiwan-president-china-taiwan-warning--a4.png",
          "alt": "Delacroix's painting Liberty Leading the People, with Liberty raising the tricolour over the barricades",
          "credit": "Eugene Delacroix, Liberty Leading the People (1830), Musee du Louvre. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jean Sibelius composed Finlandia in 1899, revising it in 1900, at the height of Russian efforts to suppress Finnish autonomy and impose press censorship under the tsar. Written for a patriotic pageant, the tone poem opens with dark, brooding brass evoking oppression before rising to a serene, hymn-like melody that swells into a triumphant affirmation of the national spirit. So charged was its effect that it had to be performed under disguised titles to evade Russian censors, and it became an unofficial anthem of Finnish resistance and eventual independence. Today the 'Finlandia Hymn' remains one of the world's best-loved musical symbols of a small nation's yearning to be free. Just as Sibelius's music gave voice to a people determined not to be silenced by an empire, Taiwan's president gives voice to an island determined to keep its own democratic identity.",
        "excerpt": "Finlandia, composed by Jean Sibelius in 1899 and revised in 1900, begins in dark, oppressive tones before breaking into a soaring hymn of hope and defiance. Written while Russia was tightening its grip on Finland, the work had to be disguised under other names to slip past the censors. It became a musical emblem of a small people's resistance and its longing for independence.",
        "source": "Jean Sibelius, Finlandia, Op. 26 (1899, rev. 1900). Score at the Petrucci Music Library (IMSLP); composer portrait (1913) via Wikimedia Commons.",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)",
        "image": {
          "src": "/covers/taiwan-president-china-taiwan-warning--a5.png",
          "alt": "Portrait photograph of the composer Jean Sibelius, 1913",
          "credit": "Jean Sibelius, 1913. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "meta-facebook-instagram-outage",
    "headline": "Meta's Facebook and Instagram are hit by outages affecting users worldwide",
    "overview": "Users of Facebook and Instagram reported outages on Sunday, unable to load feeds or refresh posts across parts of the world, according to Reuters. Meta, which operates both platforms, did not immediately detail a cause as monitoring sites logged a spike in complaints. The disruption briefly cut off billions of people from two of the world's most used social networks.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPZjZCUU55QWV3ZE5DeFpBalhfaVNTR1pMNTFKaFpFNzRYR2o4QWJGZmZoWUJ0c204TXZhNzRjUFZyRXZrdXVpcEtVZThMV0dnUEdjTlgybDdfVHRmSDZVZEtnUWFHaTBUb21CSFhiaUhKbXBnR0FLcDRieVBsVWFCTi1kVUlJam41STByRDlWcjJxYUdaQmIwdTlmdDVyMDg0YjVRWk5JMzRwRDBUbWx3d1ZZcXhvdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/meta-facebook-instagram-outage.png",
      "alt": "A hand holding a smartphone with a blank screen",
      "credit": "Santeri Viinamaki, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In August 1858 the first transatlantic telegraph cable, laid between Valentia in Ireland and Trinity Bay in Newfoundland, briefly seemed to annihilate the ocean, carrying Queen Victoria's congratulations to President James Buchanan and igniting bonfires and processions in cities on both sides of the Atlantic. Yet the marvel was fleeting: the last coherent message crossed on 1 September 1858, one day short of four weeks, after which its signals dwindled to a few faint whispers and then to nothing. Overworked electricians had driven the delicate line with too high a voltage, and the cable simply died in its ocean grave, plunging the two continents back into weeks of postal silence. The sudden collapse turned public euphoria into profound discouragement, a reminder of how thin the newly woven thread between peoples really was. Just as that celebrated link fell abruptly silent and cut the continents off from one another, Meta's outage severed a global network in an instant, leaving billions unable to reach the people on the other side.",
        "excerpt": "When at last the friends of the Atlantic Telegraph were obliged to confess that the cable had ceased to work; when all the efforts of the electricians failed to draw more than a few faint whispers, a dying gasp, from the depths of the sea, there ensued in the public mind a feeling of profound discouragement.",
        "source": "Henry M. Field, The Story of the Atlantic Telegraph (New York: Charles Scribner's Sons, 1892), ch. XIII. Project Gutenberg eBook #34765.",
        "href": "https://www.gutenberg.org/cache/epub/34765/pg34765.txt",
        "image": {
          "src": "/covers/meta-facebook-instagram-outage--a0.png",
          "alt": "Painting of HMS Agamemnon paying out the Atlantic telegraph cable at sea in 1858",
          "credit": "Robert Charles Dudley, 'H.M.S. Agamemnon Laying the Atlantic Telegraph Cable in 1858' (The Metropolitan Museum of Art, public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "For centuries the Roman cursus publicus, the imperial relay of couriers, horses and staging posts, was the nervous system of the state, carrying tax convoys, official dispatches and urgent word of invasion swiftly across provinces from Constantinople to Egypt. Writing in the sixth century, the historian Procopius charged the emperor Justinian with wrecking this network: he suppressed whole stretches of the post, forced couriers onto dangerous small boats, and replaced strings of fast horses with a handful of asses. As a result, news that once crossed a ten-day distance in a single day now arrived too late to be of any use, long after the events it described. The empire's shared channels of information went effectively dark, and provinces that had felt bound to the center found themselves isolated and blind. Just as the deliberate crippling of Rome's message relay left distant communities cut off and uninformed, Meta's silence stranded a connected world that had come to rely on instant word from everywhere at once.",
        "excerpt": "In the case of the road to Persia, he permitted the former system to remain; but everywhere else in the East, as far as Egypt, he reduced the number of stages making a day's journey to one, and provided, instead of horses, a few asses. Consequently news of what happened in each province was brought with great difficulty, too late to be of any use and long after the event, and the farm owners got no benefit of their crops which either rotted or lay idle.",
        "source": "Procopius, The Secret History (Anecdota), ch. 30, trans. Richard Atwater (1927). Internet Medieval Sourcebook, Fordham University.",
        "href": "https://sourcebooks.fordham.edu/basis/procop-anec.asp",
        "image": {
          "src": "/covers/meta-facebook-instagram-outage--a1.png",
          "alt": "The Tabula Peutingeriana, a long medieval copy of a Roman road-network map",
          "credit": "Tabula Peutingeriana (medieval copy of a Roman itinerary map), Osterreichische Nationalbibliothek, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "In the eleventh chapter of Genesis, the whole earth is said to share a single language and a single speech, and its people gather on a plain in the land of Shinar to build a city and a tower whose top would reach to heaven. Displeased by their unified ambition, the Lord confounds their common tongue so that they can no longer understand one another, and scatters them across the face of the earth, leaving the great work abandoned. The place is named Babel, a byword ever after for the sudden breakdown of shared understanding and the fragmentation of a once-connected humanity. The story turns on a single terrifying idea: that the bond holding a civilization together is language itself, and that when the signal fails, the crowd disperses into mutual incomprehension. Just as one confounded tongue turned a united multitude into scattered strangers, Meta's outage briefly broke the shared channels through which billions speak, refresh and understand one another.",
        "excerpt": "Go to, let us go down, and there confound their language, that they may not understand one another’s speech. So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city. Therefore is the name of it called Babel; because the LORD did there confound the language of all the earth: and from thence did the LORD scatter them abroad upon the face of all the earth.",
        "source": "The Holy Bible, King James Version, Genesis 11:7-9. Project Gutenberg eBook #10.",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/meta-facebook-instagram-outage--a2.png",
          "alt": "Gustave Dore engraving of an angel above the Tower of Babel as the peoples scatter",
          "credit": "Gustave Dore, 'The Confusion of Tongues' (1865), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "E. M. Forster's 1909 story 'The Machine Stops' imagines a future in which humanity lives underground in isolated cells, never meeting face to face, communicating entirely through a vast global apparatus of buttons, screens and speaking-tubes that answers every desire. The heroine Vashti conducts her whole social and intellectual life through this instant network, dismissing her son Kuno's warning that 'the Machine stops' as a piece of venomous nonsense. Then, without the slightest warning, the entire communication-system breaks down all over the world, and the applause, the voices and the summoned friends fall into an unbroken silence. For people who had forgotten how to live outside the network, the failure is not an inconvenience but the end of the world as they understood it. Just as Forster's global communication-system collapses without warning and leaves its dependents suddenly mute and alone, Meta's outage exposed how completely modern life leans on tools that can go dark in a heartbeat.",
        "excerpt": "But there came a day when, without the slightest warning, without any previous hint of feebleness, the entire communication-system broke down, all over the world, and the world, as they understood it, ended.",
        "source": "E. M. Forster, 'The Machine Stops' (1909), in The Eternal Moment and Other Stories. Project Gutenberg eBook #72890.",
        "href": "https://www.gutenberg.org/cache/epub/72890/pg72890.txt",
        "image": {
          "src": "/covers/meta-facebook-instagram-outage--a3.png",
          "alt": "Painted portrait of the author E. M. Forster by Dora Carrington",
          "credit": "Dora Carrington, portrait of E. M. Forster (1924-25), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 'The Tower of Babel', painted in 1563 and now in the Kunsthistorisches Museum in Vienna, depicts a colossal spiralling tower rising into the clouds above a bustling Flemish port, its ramps and arches modeled on the Roman Colosseum. Thousands of tiny laborers, cranes and workshops swarm across its tiers, yet the structure already tilts and cracks, its upper stories unfinished and doomed. Bruegel renders the biblical parable as a monument to overreaching human ambition and to the confusion that will scatter the workers when their common language fails. The painting freezes the moment before a vast collective project, bound together by shared communication, dissolves into disorder. Just as Bruegel's teeming tower stands on the brink of the silence and scattering to come, Meta's global platforms, humming with billions of voices, revealed how quickly a shared structure can falter when its connective language breaks down.",
        "excerpt": "Bruegel populates his tower with a thousand small dramas: masons hauling stone, ships unloading at the quay, a king inspecting the works. The eye climbs the doomed spiral and senses the coming hush, when the shared word that binds all these hands together will suddenly mean nothing. It is a portrait of connection at the very instant before it fails.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel (1563), oil on panel, Kunsthistorisches Museum, Vienna. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/meta-facebook-instagram-outage--a4.png",
          "alt": "Bruegel's painting of the vast spiralling Tower of Babel under a cloudy sky",
          "credit": "Pieter Bruegel the Elder, 'The Tower of Babel' (1563), Kunsthistorisches Museum, Vienna (Google Art Project), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Thomas Cole's 'Desolation', the fifth and final canvas of his 1836 series 'The Course of Empire', shows the same imagined bay he had earlier filled with a thriving metropolis, now returned to silence at dusk. Broken columns and a single ruined arch rise above still water; a solitary heron nests on a toppled pillar where crowds once thronged the forum, and no human figure remains. Cole meant the cycle as a warning that even the mightiest civilizations, with their marketplaces, temples and networks of exchange, inevitably fall quiet and empty. The painting is the visual echo of a great public square from which every voice has vanished. Just as Cole's deserted forum stands eerily mute where a whole society once gathered and spoke, Meta's outage briefly emptied the digital squares where billions meet, leaving the world's common gathering places suddenly still.",
        "excerpt": "Cole paints the aftermath of connection: a ruined arch, a lone bird on a fallen column, a marketplace drained of every voice. Where crowds once traded news across a crowded forum, only water and silence remain. It is the hush that falls when a shared public space goes dark.",
        "source": "Thomas Cole, The Course of Empire: Desolation (1836), oil on canvas, New-York Historical Society. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Desolation_1836.jpg",
        "image": {
          "src": "/covers/meta-facebook-instagram-outage--a5.png",
          "alt": "Thomas Cole painting of ruined classical columns and a lone bird over a silent bay at dusk",
          "credit": "Thomas Cole, 'The Course of Empire: Desolation' (1836), New-York Historical Society, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "canada-bars-congo-travelers-outbreak",
    "headline": "Canada will temporarily bar entry to travelers who have recently been in Congo, against UN advice",
    "overview": "Canada said it will temporarily bar entry to foreign nationals who have recently been in Congo, a precaution the government linked to a disease outbreak there. The measure runs counter to United Nations guidance, which generally opposes blanket travel bans as ineffective and stigmatizing. Public-health experts have long debated whether closing borders slows an epidemic or merely drives it underground.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxQb1BHOFZRUDNmWEJPRW4tNnRsRlhvZ2xWRTlsN2RZRmgyNmhYUkF6SFdBdkplMnZhTHYzTzUtWGxJZjlKNHM4UmNXMmRWZEs5V21taFE1cEtHdWtpUFFTVVFSRkNvQWJla1owRldCMnF3dlNrVGZSYWtiLUxvUUt1N1N6dzlNaEo2ZmY2NldGSndGbHpaOUZyaHVyb3J5QWRwT3Bjb3JOOEFZRnJ6bWdUMGs1M3lSX24yYVFxd3Joa1U4bDFRWkJod0pR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/canada-bars-congo-travelers-outbreak.png",
      "alt": "Travelers moving through an airport arrivals hall",
      "credit": "Wpcpey, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the summer of 430 BC, in the second year of the Peloponnesian War, a devastating plague swept through Athens, whose walls were crowded with refugees who had fled the Attic countryside ahead of the invading Spartans. The historian Thucydides, who caught the disease and survived, recorded in Book II of his 'History of the Peloponnesian War' how fear itself reshaped human behavior: people were terrified to nurse one another, so that some died in total neglect while those brave enough to tend the sick caught the infection and died too. The Athenians shunned each other, abandoned the customary burial rites, and gave way to lawlessness as social bonds dissolved under the weight of contagion. Thucydides' clinical eye captured the central dilemma of every epidemic, that the instinct to avoid the sick and the duty to care for them pull in opposite directions. Just as Canada now weighs shutting its gates to travelers from Congo, ancient Athens shows how fear of contagion has always driven people to wall themselves off from the afflicted, at a terrible human cost.",
        "excerpt": "On the one hand, if they were afraid to visit each other, they perished from neglect; indeed many houses were emptied of their inmates for want of a nurse: on the other, if they ventured to do so, death was the consequence.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (c. 431-404 BC), Richard Crawley translation, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
        "image": {
          "src": "/covers/canada-bars-congo-travelers-outbreak--a0.png",
          "alt": "Baroque painting of a plague-stricken ancient city with the dead and dying strewn among classical ruins",
          "credit": "Michiel Sweerts, 'Plague in an Ancient City' (c. 1652-1654), Los Angeles County Museum of Art, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "During the Great Plague of London in 1665, which killed roughly a fifth of the city's population, authorities enforced a brutal policy of 'shutting up' infected houses, locking the sick together with the healthy behind doors marked with a red cross and the words 'Lord have mercy upon us,' guarded by watchmen. The naval administrator Samuel Pepys recorded the creeping dread in his diary; on 7 June 1665 he saw such marked doors for the first time in Drury Lane and was so unnerved he bought tobacco to chew as a supposed protection. The measure was meant to cordon off contagion by sealing individual households, but it effectively condemned the well along with the ill and bred desperation and evasion. Pepys's entry captures the moment abstract epidemic policy became visible on the streets as a frightening emblem of exclusion. Just as Canada moves to bar entry to those recently in Congo, seventeenth-century London tried to hold back plague by sealing gates and doors against the infected.",
        "excerpt": "This day, much against my will, I did in Drury Lane see two or three houses marked with a red cross upon the doors, and \"Lord have mercy upon us\" writ there; which was a sad sight to me, being the first of the kind that, to my remembrance, I ever saw.",
        "source": "Samuel Pepys, The Diary of Samuel Pepys, Volume 35: May/June 1665, entry for 7 June 1665, Project Gutenberg (ebook 4156).",
        "href": "https://www.gutenberg.org/cache/epub/4156/pg4156.txt",
        "image": {
          "src": "/covers/canada-bars-congo-travelers-outbreak--a1.png",
          "alt": "Composite engraving of the Great Plague of London showing death carts, fleeing citizens and shut-up houses",
          "credit": "'Great Plague of London, 1665,' contemporary broadside engraving, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Daniel Defoe's 'A Journal of the Plague Year,' published in 1722 but set during London's plague of 1665, is a documentary-style novel narrated by a saddler who stays in the city and observes the epidemic in unflinching detail. A major theme of the book is the official policy of shutting up infected houses, which Defoe's narrator repeatedly condemns as both cruel and useless, arguing that confining the healthy with the sick only spread misery and drove terrified people to break out and flee. Defoe stages the very debate now surrounding travel bans, whether sealing people in (or out) actually stops disease or merely makes them desperate enough to evade control and scatter the contagion further. His narrator concludes bluntly that the practice did not achieve its end. Just as experts warn that Canada's ban on travelers from Congo may drive the outbreak underground rather than contain it, Defoe warned three centuries ago that shutting the gates against plague could not be depended upon.",
        "excerpt": "the shutting up of houses was in no wise to be depended upon. Neither did it answer the end at all, serving more to make the people desperate, and drive them to such extremities as that they would break out at all adventures.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722), Project Gutenberg (ebook 376).",
        "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt",
        "image": {
          "src": "/covers/canada-bars-congo-travelers-outbreak--a2.png",
          "alt": "Portrait of the English writer Daniel Defoe in a periwig",
          "credit": "Portrait of Daniel Defoe, after Sir Godfrey Kneller, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe's 1842 short story 'The Masque of the Red Death' tells of Prince Prospero, who, as a deadly pestilence ravages his country, retreats with a thousand courtiers into a fortified abbey and welds shut its iron gates to keep the plague outside. Behind these sealed walls the prince throws a lavish masked ball, convinced that wealth and isolation can buy immunity, while the poor and the sick are left to die beyond the barrier. The Red Death nonetheless enters, embodied as a masked figure, and destroys them all, exposing the fatal arrogance of believing one can simply lock contagion out. Poe's parable is a meditation on the futility and the moral blindness of exclusion, the fantasy that a border can be sealed tightly enough to hold back a disease. Just as Canada seeks to bar the sick and the exposed at its frontier, Poe's story warns that sealing the gates offers a false and self-deceiving security.",
        "excerpt": "A strong and lofty wall girdled it in. This wall had gates of iron. The courtiers, having entered, brought furnaces and massy hammers and welded the bolts. They resolved to leave means neither of ingress nor egress to the sudden impulses of despair or of frenzy from within.",
        "source": "Edgar Allan Poe, \"The Masque of the Red Death\" (1842), in The Works of Edgar Allan Poe, Project Gutenberg (ebook 1064).",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm",
        "image": {
          "src": "/covers/canada-bars-congo-travelers-outbreak--a3.png",
          "alt": "Photographic portrait of the writer Edgar Allan Poe",
          "credit": "Daguerreotype of Edgar Allan Poe (c. 1849), retouched, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin's oil painting 'Die Pest' (The Plague), completed in 1898 and held at the Kunstmuseum Basel, depicts Death as a winged, scythe-bearing figure riding a monstrous bat-like beast low over the streets of a medieval town, sowing corpses in its wake. The Swiss Symbolist painted it late in his life, after personally losing several children to disease, and the image renders pestilence as an airborne force that no wall or gate could arrest as it swoops down among fleeing, collapsing townspeople. The painting captures the visceral terror of contagion arriving from outside and the helplessness of ordinary people before it. Its very form, a plague that flies over the rooftops, dramatizes how disease slips past every physical barrier meant to hold it back. Just as Canada debates whether closing its borders can stop an outbreak in Congo, Böcklin's vision insists that plague travels on the wind, indifferent to the boundaries humans erect against it.",
        "excerpt": "Böcklin gives contagion a body: a hooded reaper astride a leathery-winged beast, skimming just above the cobblestones of a stricken town. Beneath its shadow figures crumple in doorways and stairwells, too slow to flee the thing that has already flown over the walls. The painting makes visible the oldest fear of every quarantine, that the sickness is already inside the gate.",
        "source": "Arnold Böcklin, 'Die Pest' (The Plague), 1898, tempera on panel, Kunstmuseum Basel; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/canada-bars-congo-travelers-outbreak--a4.png",
          "alt": "Symbolist painting of Death as a winged figure with a scythe flying over a medieval town strewn with the dead",
          "credit": "Arnold Böcklin, 'Die Pest' (The Plague), 1898, Kunstmuseum Basel, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin's 'The Plague at Ashdod,' painted in 1630-31 and now in the Louvre, depicts the Old Testament episode from the First Book of Samuel in which the Philistine city of Ashdod is struck by plague after they seize the Ark of the Covenant. The French classical master fills the foreground with the dead and dying, including a chilling detail of an infant still trying to nurse at its dead mother's breast, while figures in the middle ground recoil and pinch their noses against the stench and danger of infection. Painted during outbreaks of plague in Italy, the work is a study in the human impulse to flee and turn away from the contagious, isolating the sick with gestures of horror and self-protection. Poussin freezes the exact instant when compassion gives way to the fearful urge to escape. Just as Canada moves to exclude travelers who may carry disease, Poussin's canvas shows the ancient reflex to shrink back and shut out the afflicted in a time of pestilence.",
        "excerpt": "Poussin arranges the catastrophe like a stage: mothers and children lie dead across the paving stones of a sunlit classical city, while the living twist away, one man clamping a cloth to his face against the contagious air. In the shadow of the temple steps, the survivors do not rush to help but pull back, hands raised, bodies half-turned to flee. It is a picture of the moment a community decides to save itself by abandoning the stricken.",
        "source": "Nicolas Poussin, 'The Plague at Ashdod' (La Peste d'Asdod), 1630-1631, oil on canvas, Musée du Louvre, Paris; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_plague_of_ashdod_1630.jpg",
        "image": {
          "src": "/covers/canada-bars-congo-travelers-outbreak--a5.png",
          "alt": "Baroque painting of plague victims in a classical city as onlookers recoil and cover their faces",
          "credit": "Nicolas Poussin, 'The Plague at Ashdod,' 1630-1631, Musée du Louvre, via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "kpf-tp-link-landscape-ribbon-shenzhen",
    "headline": "KPF wraps a Shenzhen tech campus for TP-Link in a one-kilometer 'landscape ribbon'",
    "overview": "The New York firm Kohn Pedersen Fox has completed TP-Link LXD, a technology campus in Shenzhen, China, whose three interconnected towers are wrapped by a one-kilometer-long 'landscape ribbon' of planted terraces and staircases. The 124,600-square-meter complex houses offices, research-and-development space and housing, threading shared greenery up a compact urban site. The design answers a dense brief by turning circulation into a continuous public garden.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/18/tp-link-lxd-tech-campus-kpf-china/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/kpf-tp-link-landscape-ribbon-shenzhen.png",
      "alt": "The skyline of Shenzhen, China",
      "credit": "Dinkun Chen, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Hanging Gardens of Babylon were the ancient world's most celebrated marriage of engineering and green fantasy, a terraced park raised on vaulted stone galleries said to have been built by King Nebuchadnezzar II (reigned 605–562 BC) for his Median queen, who missed the wooded hills of her homeland. The Greek historian Diodorus Siculus, writing in the first century BC, described a structure that ascended tier on tier like a theatre, its roofs sealed with reeds, bitumen, baked brick and lead so that deep soil could hold trees on the rooftops, watered by hidden machines that lifted water from the Euphrates. Counted among the Seven Wonders of the World, it fused the idea of a soaring citadel with a planted paradise open to the sky. It made the act of climbing a wall into an ascent through a garden. Just as Babylon lifted a forest onto its ramparts, KPF's TP-Link LXD wraps three Shenzhen towers in a one-kilometre 'landscape ribbon' of planted terraces and stairs, turning the building's circulation into a continuous public garden in the air.",
        "excerpt": "When the ascending terraces had been built, there had been constructed beneath them galleries which carried the entire weight of the planted garden and rose little by little one above the other along the approach; and the uppermost gallery, which was fifty cubits high, bore the highest surface of the park, which was made level with the circuit wall of the battlements of the city.",
        "source": "Diodorus Siculus, Library of History, Book II.10, trans. C. H. Oldfather, Loeb Classical Library (1935); digitized at LacusCurtius, University of Chicago.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Diodorus_Siculus/2A*.html",
        "image": {
          "src": "/covers/kpf-tp-link-landscape-ribbon-shenzhen--a0.png",
          "alt": "Ferdinand Knab's 1886 painting imagining the terraced Hanging Gardens of Babylon",
          "credit": "Ferdinand Knab, 'The Hanging Gardens of Babylon' (1886), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The Crystal Palace was a colossus of glass and cast iron erected in London's Hyde Park to house the Great Exhibition of 1851, designed by the gardener-turned-engineer Joseph Paxton and built in a matter of months. Some 564 metres long and enclosing 92,000 square metres, its ridge-and-furrow glazing was derived directly from Paxton's greenhouses, and it was raised high enough to shelter Hyde Park's mature elm trees inside the building, so that living nature stood within the industrial cage. Contemporaries hailed it as a vision of a new age in which prefabricated modules could conjure a transparent palace that dissolved the boundary between garden and architecture. It became the emblem of an era's technological ambition and optimism. Just as the Crystal Palace enclosed a park within a feat of modular engineering and made an exhibition hall feel like a conservatory, KPF's TP-Link LXD threads planted terraces through a 124,600-square-metre complex of offices, R&D and housing, dissolving the line between built city and continuous garden.",
        "excerpt": "The Crystal Palace of 1851 was a masterwork of prefabricated glass and iron that grew from Joseph Paxton's greenhouse experiments, its transparent vaults rising over the living elms of Hyde Park. It proved that a building could be at once a machine of modular parts and a garden held up to the light. In its shimmering nave, the age glimpsed a paradise engineered by human hands.",
        "source": "The Great Exhibition of the Works of Industry of All Nations, Hyde Park, London, 1851; contemporary print held via Wikimedia Commons.",
        "href": "https://en.wikisource.org/wiki/Encyclop%C3%A6dia_Britannica,_Ninth_Edition/Exhibition",
        "image": {
          "src": "/covers/kpf-tp-link-landscape-ribbon-shenzhen--a1.png",
          "alt": "Colour print of the Crystal Palace in Hyde Park for the Great Exhibition of 1851",
          "credit": "'The Crystal Palace in Hyde Park for Grand International Exhibition of 1851', via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "The Tower of Babel is the archetypal story of humanity building skyward, told in the eleventh chapter of the Book of Genesis and fixed in English by the King James Bible of 1611. In the plain of Shinar the whole earth, still of one language, resolves to bake bricks and raise a city with a tower 'whose top may reach unto heaven,' both to make a name for themselves and to keep from being scattered. The Lord comes down, confounds their single tongue into many, and scatters them abroad, leaving the unfinished tower named Babel. It is at once the oldest emblem of collective architectural ambition and a warning about the reach of human hands toward the sky. Just as Babel imagines a single people binding a city and a tower into one soaring gesture, KPF's TP-Link LXD binds three interconnected towers into a single reaching form, though here the skyward ambition is answered by a green ribbon that returns the building to the earth and the public.",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "The Holy Bible, King James Version (1611), Genesis 11:4; text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/kpf-tp-link-landscape-ribbon-shenzhen--a2.png",
          "alt": "Gustave Doré's engraving 'The Confusion of Tongues' showing the Tower of Babel",
          "credit": "Gustave Doré, 'The Confusion of Tongues' (1865–1868), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Samuel Taylor Coleridge's 'Kubla Khan: or, A Vision in a Dream: A Fragment' was composed in 1797 and published in 1816, reputedly conjured in an opium-tinged reverie after the poet read of Xanadu, the summer capital of the Mongol emperor Kublai Khan. In its opening lines the Khan decrees 'a stately pleasure-dome' where the sacred river Alph runs through caverns to a sunless sea, and 'twice five miles of fertile ground' are girdled with walls and towers, enclosing bright gardens, sinuous rills and incense-bearing trees. The poem became the touchstone image of an earthly paradise raised by human command, a built enclosure in which architecture and cultivated nature are fused into a single visionary decree. It reads circulation, water and greenery as one continuous dream. Just as Kubla Khan decrees a pleasure-dome girdled with gardens and towers, KPF's TP-Link LXD encircles its towers with a kilometre-long ribbon of planted terraces, staircases and greenery, turning a working campus into a garden decreed in the air.",
        "excerpt": "In Xanadu did Kubla Khan\nA stately pleasure-dome decree:\nWhere Alph, the sacred river, ran\nThrough caverns measureless to man\nDown to a sunless sea.\nSo twice five miles of fertile ground\nWith walls and towers were girdled round;\nAnd here were gardens bright with sinuous rills\nWhere blossom'd many an incense-bearing tree;",
        "source": "Samuel Taylor Coleridge, 'Kubla Khan', in Christabel; Kubla Khan, a Vision; The Pains of Sleep (London: John Murray, 1816); text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Christabel;_Kubla_Khan;_The_Pains_of_Sleep_(1816)/Kubla_Khan",
        "image": {
          "src": "/covers/kpf-tp-link-landscape-ribbon-shenzhen--a3.png",
          "alt": "Portrait of the poet Samuel Taylor Coleridge",
          "credit": "Portrait of Samuel Taylor Coleridge, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 'The Tower of Babel', painted in oil on panel in 1563 and now held in the Kunsthistorisches Museum in Vienna, is the most famous visual image of humanity's tallest ambition. Bruegel sets a vast spiralling ziggurat, modelled in part on the Roman Colosseum, rising into the clouds above a Flemish port city, its ramps and arches swarming with cranes, scaffolds and tiny labourers while King Nimrod inspects the works below. The tower's upper storeys pierce the sky even as its lower courses remain unfinished, capturing both the grandeur and the hubris of building toward heaven. It renders architecture as an entire living world of terraces, tiers and continuous ascent. Just as Bruegel piles arcaded tier upon tier into a single spiralling ascent, KPF's TP-Link LXD winds a one-kilometre landscape ribbon of terraces and staircases around its towers, making the climb through the building a spectacle of layered, inhabited levels.",
        "excerpt": "Bruegel's tower spirals upward in ochre arcades, each terraced storey a small city stacked upon the last, cranes and scaffolds clinging to its flanks. The unfinished summit vanishes into cloud while the base still swarms with labourers, so that ambition and incompletion share the same frame. It is the built dream of reaching heaven, rendered as an endless ascent of tiers.",
        "source": "Pieter Bruegel the Elder, 'The Tower of Babel' (1563), oil on panel, Kunsthistorisches Museum, Vienna; image via Wikimedia Commons.",
        "href": "https://en.wikipedia.org/wiki/The_Tower_of_Babel_(Bruegel)",
        "image": {
          "src": "/covers/kpf-tp-link-landscape-ribbon-shenzhen--a4.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting The Tower of Babel, a vast spiralling tower rising into clouds",
          "credit": "Pieter Bruegel the Elder, 'The Tower of Babel' (1563), Kunsthistorisches Museum Vienna, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Maarten van Heemskerck's engraving of 'The Hanging Gardens of Babylon' belongs to his celebrated series depicting the Seven Wonders of the Ancient World, designed by the Dutch master and engraved by Philips Galle in Antwerp around 1572. The print imagines the gardens as a monumental colonnaded palace crowned with lush planted terraces and cascading greenery, while gardeners tend the raised beds and figures marvel at the towering walls of Babylon behind. Heemskerck's vision turned a legendary wonder into a concrete image of architecture and cultivated nature fused into a single ornamented mass, a paradise stacked in the air. It gave later Europe its enduring picture of what a building carpeted in gardens might look like. Just as Heemskerck crowns a great structure with terrace upon terrace of hanging greenery, KPF's TP-Link LXD sheathes its Shenzhen towers in a continuous ribbon of planted terraces, realising in steel and soil the paradise-on-earth that the engraving could only imagine.",
        "excerpt": "In Heemskerck's engraving a colonnaded palace rises in receding storeys, each ledge spilling over with trees and trailing vines like a green cascade frozen in stone. Gardeners tend the raised beds while the vast walls of Babylon loom beyond, dwarfing the tiny onlookers. The print makes visible an ancient dream: a building wholly clothed in its own hanging garden.",
        "source": "Maarten van Heemskerck (designer) and Philips Galle (engraver), 'The Hanging Gardens of Babylon', from the series The Eight Wonders of the World, Antwerp, c. 1572; image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Heemskerck-hanginggardens.jpg",
        "image": {
          "src": "/covers/kpf-tp-link-landscape-ribbon-shenzhen--a5.png",
          "alt": "Maarten van Heemskerck's engraving of the Hanging Gardens of Babylon, a terraced palace covered in greenery",
          "credit": "Maarten van Heemskerck / Philips Galle, 'The Hanging Gardens of Babylon' (c. 1572), via Wikimedia Commons (public domain)"
        }
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
