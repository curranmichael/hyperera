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
    "slug": "micron-250-billion-us-chips",
    "headline": "Micron commits more than $250 billion to US chip manufacturing through 2035",
    "overview": "Micron said on July 9, 2026 it will invest more than $250 billion in US semiconductor manufacturing and research through 2035, up from a $200 billion plan a year earlier, as it poured the first concrete at a new memory-chip fab in Clay, New York and pressed ahead with plants in Idaho and Virginia. The chipmaker said the expansion, spurred by AI-driven demand and Washington's push for domestic production, supports a goal of making 40% of its DRAM memory in the US and would create more than 90,000 jobs.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxNLWc0Y2R2MHQ0eXRvalR3ZHVqSGZ3a0pobWJ1RGE2N1lXVUFvU05EcW9YWjY3d21NaUJBblRxOHdfNWVDQU1pX2I1eHJkYnB3dmhvdkRsbVVhN1JSNE1taHZTUGJNRVpsOTFDTXBPRVJDdFVsel9jUVBNcDZ2YUlySjFXcjJEanA1eG1TSS1WTVJBN2hDZE5R?oc=5"
      },
      {
        "name": "Micron (GlobeNewswire)",
        "href": "https://www.manilatimes.net/2026/07/09/tmt-newswire/globenewswire/micron-accelerates-us-investments-pours-first-concrete-at-new-york-fab/2381646"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/micron-250-billion-us-chips.png",
      "alt": "A 12-inch (300 mm) polished silicon wafer used in semiconductor and memory-chip manufacturing.",
      "credit": "Peellden / Wikimedia Commons"
    },
    "edition": "Evening Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Xerxes' canal through Athos: a colossal mobilization (Herodotus, Histories, Book VII)",
        "excerpt": "Men of all nations belonging to the army worked at digging, compelled by the lash ... Xerxes when he ordered this to be dug was moved by a love of magnificence and by a desire to make a display of his power.",
        "source": "Herodotus, The History of Herodotus, Book VII, trans. G. C. Macaulay (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Macaulay)/Book_VII"
      },
      {
        "category": "historical",
        "title": "Franklin D. Roosevelt, the 'Arsenal of Democracy' Fireside Chat (December 29, 1940)",
        "excerpt": "Manufacturers of watches, farm implements, linotypes, cash registers, automobiles, sewing machines, lawn mowers and locomotives are now making fuses, bomb packing crates, telescope mounts, shells, pistols and tanks. ... We must be the great arsenal of democracy. For us this is an emergency as serious as war itself.",
        "source": "Franklin D. Roosevelt, Fireside Chat on National Security, 29 December 1940 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Roosevelt%27s_Fireside_Chat,_29_December_1940"
      },
      {
        "category": "literary",
        "title": "The Tower of Babel: a people who set out to build to the heavens (Genesis 11)",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth. ... And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do.",
        "source": "Bible (King James), Genesis 11 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Coketown, the town of furnaces and machinery (Charles Dickens, Hard Times)",
        "excerpt": "It was a town of red brick, or of brick that would have been red if the smoke and ashes had allowed it; but as matters stood, it was a town of unnatural red and black like the painted face of a savage. It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever ... where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Charles Dickens, Hard Times, Book the First, Ch. 5 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/786/pg786.txt"
      },
      {
        "category": "artistic",
        "title": "Alexander Mosolov, 'Iron Foundry' (Music of Machines), Op. 19 (1927) (musical)",
        "excerpt": "Mosolov turns the orchestra into a single roaring machine: chromatic ostinato figures pile up measure by measure over a relentless pounding pulse, brass and percussion hammering like drop-forges while a shaken sheet of metal imitates the clangor of the factory floor. Composed in 1927 to glorify Soviet industry, the piece renders a working furnace as music - the sound of raw matter being beaten into steel.",
        "source": "Alexander Mosolov, Steel (Zavod / Iron Foundry), Op. 19 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Steel,_Op.19_(Mosolov,_Alexander)"
      },
      {
        "category": "artistic",
        "title": "Adolph Menzel, 'The Iron Rolling Mill (Modern Cyclopes)' (1872-1875) (visual artwork)",
        "excerpt": "Menzel's vast canvas plunges the viewer into a white-hot rolling mill, where half-lit workers strain around a glowing bar of iron drawn from the furnace amid smoke, sparks and towering machinery. Nicknamed 'Modern Cyclopes,' it is one of the first great paintings to treat heavy industry as an epic subject - the furnace-forge as the beating heart of a newly industrial nation.",
        "source": "Adolph von Menzel, Das Eisenwalzwerk, 1872-1875, Alte Nationalgalerie, Berlin (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Das_Eisenwalzwerk_-_The_Iron-Rolling_Mill_-_1872-1875.JPG",
        "image": {
          "src": "/covers/micron-250-billion-us-chips--art.png",
          "alt": "Adolph Menzel's painting The Iron Rolling Mill: workers in a smoky factory hall straining around a glowing white-hot bar of iron drawn from a furnace, surrounded by heavy rolling machinery.",
          "credit": "Adolph von Menzel, 'Das Eisenwalzwerk (The Iron Rolling Mill / Modern Cyclopes),' 1872-1875, Alte Nationalgalerie, Berlin; public domain via Wikimedia Commons."
        }
      }
    ],
    "lead": true,
    "rank": 1
  },
  {
    "slug": "ukraine-drone-strikes-russian-fuel",
    "headline": "Ukraine escalates drone strikes on Russian tankers and refineries, halting the Saratov plant",
    "overview": "Ukraine intensified its long-range drone campaign against Russia's fuel supply this week, striking Russian-linked oil tankers near occupied Crimea in the Sea of Azov and forcing the large Saratov oil refinery to halt operations after an overnight attack, which President Volodymyr Zelensky confirmed on July 9, 2026. Kyiv said it had hit more than 20 vessels in three days, part of a strategy to choke Moscow's fuel logistics and export revenue.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c70yd1g67z5o?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxOcjJ3MFQwQ3VucnA5X2wzVVA4S2M2dm54OExheU41WFVMQWZXd2hKNzQzaktCUGFGTWdFNS02WEttdlhaU1R2WHY3ZDBBbE9zdW9CeVlhWEx2OUtOVkU2cnRqZkVPMWMzUE5ZbW1nSDVqb2hrd0M0aHdFRVE2SFpfVlY4OFZ2cWV0TWhCcWE1NVRxQVRZRkJxaWVCR005ZkRnRU9xdjV1Ty01NlIyZEZKbUVmN3pLdXc5bDFZcDRTUXZFdC1zM3c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/ukraine-drone-strikes-russian-fuel.png",
      "alt": "An oil tanker at sea at dusk, dark smoke and orange flame rising from its deck across a narrow strait between hazy arid coastlines.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Byzantine \"Greek fire\" in Anna Komnene's Alexiad",
        "excerpt": "Now this fire is prepared from the following ingredients. The readily combustible rosin is collected from the pine and other similar evergreen trees and mixed with sulphur. Then it is introduced into reed-pipes and blown by the man using it with a strong continuous breath and at the other end fire is applied to it and it bursts into flame and falls like a streak of lightning on the faces of the men opposite.",
        "source": "Anna Komnene, The Alexiad, Book XIII (trans. Elizabeth Dawes) - Internet Medieval Sourcebook, Fordham University",
        "href": "https://sourcebooks.fordham.edu/basis/annacomnena-alexiad13.asp"
      },
      {
        "category": "historical",
        "title": "Operation Tidal Wave: the low-level raid on the Ploesti oil refineries (1943)",
        "excerpt": "On 1 August 1943, 178 American B-24 Liberators struck the Ploesti refineries in Romania - the Axis' single largest source of fuel - bombing at rooftop height through walls of flak and burning oil. It was among the costliest missions of the war, with 54 aircraft and nearly 500 men lost, a stark measure of what it costs to strangle a war machine's fuel supply from the air.",
        "source": "National Museum of the United States Air Force",
        "href": "https://www.nationalmuseum.af.mil/Visit/Museum-Exhibits/Fact-Sheets/Display/Article/1519651/operation-tidalwave-ploesti-august-1-1943/"
      },
      {
        "category": "literary",
        "title": "Aeschylus, The Persians - the great fleet shattered at Salamis",
        "excerpt": "But their throng'd numbers, in the narrow seas Confined, want room for action; and, deprived Of mutual aid, beaks clash with beaks, and each Breaks all the other's oars: with skill disposed The Grecian navy circled them around With fierce assault; and rushing from its height The inverted vessel sinks: the sea no more Wears its accustomed aspect, with foul wrecks And blood disfigured; floating carcasses Roll on the rocky shores.",
        "source": "Aeschylus, The Persians (trans. Robert Potter) - Wikisource",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Aeschylus_(Potter)/Persians"
      },
      {
        "category": "literary",
        "title": "Thucydides, History of the Peloponnesian War - the Syracusan fire-ship",
        "excerpt": "The rest the enemy tried to burn by means of an old merchantman which they filled with faggots and pine-wood, set on fire, and let drift down the wind which blew full on the Athenians. The Athenians, however, alarmed for their ships, contrived means for stopping it and putting it out, and checking the flames and the nearer approach of the merchantman, thus escaped the danger.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII.53 (trans. Richard Crawley) - Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_7"
      },
      {
        "category": "artistic",
        "title": "Ritual Fire Dance (Danza ritual del fuego) from El amor brujo, Manuel de Falla (musical)",
        "excerpt": "De Falla's incendiary dance summons fire as a living, hostile force: a low trilling menace in the strings flares into stabbing brass and pounding rhythm, an exorcism meant to burn a haunting spirit out of the world. Its restless, circling energy captures the character of an attack that keeps returning to set the same target ablaze until the enemy can no longer stand.",
        "source": "Manuel de Falla, El amor brujo (1915) - IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/El_amor_brujo_(Falla,_Manuel_de)"
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky, The Battle of Sinop, Night after Battle (visual artwork)",
        "excerpt": "Aivazovsky paints the Black Sea the night after the 1853 battle at Sinop, when a fleet was left burning at anchor. Shattered hulls glow orange and gold, throwing firelight across the water and up into towering columns of smoke - fire on the water in the very waters off Crimea that the Russian and Ukrainian fleets contest today.",
        "source": "Ivan Aivazovsky, 1853 - Central Naval Museum, St Petersburg (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Battle_of_Sinop.jpg",
        "image": {
          "src": "/covers/ukraine-drone-strikes-russian-fuel--art.png",
          "alt": "Night seascape of burning Ottoman warships glowing orange against dark smoke on the Black Sea after the Battle of Sinop",
          "credit": "Ivan Aivazovsky, 'The Battle of Sinop on 18 November 1853 (Night after Battle)', 1853, Central Naval Museum, Saint Petersburg; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "meta-mtia-ai-chip-production",
    "headline": "Meta to put its own AI chip into mass production in September, memo shows",
    "overview": "An internal memo reviewed by Reuters shows Meta plans to begin mass production of its in-house AI accelerator, code-named 'Iris' and part of its MTIA line, in September 2026, aiming to roughly double its computing capacity toward 14 gigawatts next year. Meta designed the chip with Broadcom and will have TSMC manufacture it, a step meant to reduce its reliance on Nvidia for the silicon that powers Facebook and Instagram's AI.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxOQmJUcmlIQzJ4M0Vmd1QxQno5ajZPWnFqRHMtQkNMSzVRMHlnOXBqZDN4cjVuRU1XR3IyajdHekZJRkNpeXA2UjRBaXdiaDlnbkxVa1VXb1hwY3BDMUE1am9uX0o3OUxYTWVkeUMyemFUQ0JkMlVpX1RWSTBLVzI3bC1uaTVGelVXd1pSdEY4RHpreUQySmhOUjZMemVGQ3k4YTREY3VxN3k5alhELVdJa1hGeGYxbUltMV9mVUtHZWM4SmQ1eGNqRkk0RUk?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/09/meta-to-put-ai-chip-into-production-in-september-report.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/meta-mtia-ai-chip-production.png",
      "alt": "High-resolution macro photograph of a silicon integrated-circuit die showing the chip's internal logic blocks.",
      "credit": "Cole L / Wikimedia Commons"
    },
    "edition": "Evening Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Gutenberg casts his own movable type to print the 42-line Bible (c. 1455)",
        "excerpt": "To make books mechanically, Johannes Gutenberg first had to make the maker: he engineered an adjustable hand mould and a metal alloy that let him cast thousands of identical, reusable letters in his own Mainz workshop. Rather than depend on scribes or existing tools, he forged the entire apparatus of production, from the type-metal to a press adapted from the wine trade, and used it to strike his monumental Bible. The Library of Congress holds one of three known perfect vellum copies of the book that self-sufficiency built.",
        "source": "The Gutenberg Bible, Library of Congress Bible Collection exhibition",
        "href": "https://www.loc.gov/exhibits/bibles/the-gutenberg-bible.html"
      },
      {
        "category": "historical",
        "title": "Ford's River Rouge complex makes its own steel (1920s)",
        "excerpt": "At the River Rouge plant near Detroit, Henry Ford pursued total self-sufficiency, feeding iron ore and coal into on-site blast furnaces, coke ovens and rolling mills so the company could pour the very steel its cars were built from. Charles Sheeler's 1927 photograph of crossed coal conveyors, water tanks and smokestacks became a monument to this vertically integrated 'temple' where raw material entered one end and finished automobiles left the other. The image survives in the Metropolitan Museum of Art as an icon of a maker forging its own supply chain.",
        "source": "Charles Sheeler, 'Criss-Crossed Conveyors, River Rouge Plant, Ford Motor Company' (1927), The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/265132"
      },
      {
        "category": "literary",
        "title": "Hephaestus forges the Shield of Achilles (Homer, Iliad, Book 18)",
        "excerpt": "And the bellows, twenty in all, blew upon the melting-vats... And on the fire he put stubborn bronze and tin and precious gold and silver; and thereafter he set on the anvil-block a great anvil, and took in one hand a massive hammer, and in the other took he the tongs. First fashioned he a shield, great and sturdy, adorning it cunningly in every part, and round about it set a bright rim, threefold and glittering, and therefrom made fast a silver baldric.",
        "source": "Homer, Iliad 18 (trans. A. T. Murray), Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18"
      },
      {
        "category": "literary",
        "title": "Victor Frankenstein infuses the spark of being (Mary Shelley, Frankenstein, Ch. 5)",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open.",
        "source": "Mary Shelley, Frankenstein (1818), Project Gutenberg eBook #84",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, 'Forging Song' (Schmiedelieder) from Siegfried, Act I (musical)",
        "excerpt": "In the first act of Wagner's Siegfried, the young hero rejects every blade handed to him and resolves to reforge the shattered sword Nothung himself, filing the fragments to powder and casting them anew. The orchestra rings with hammer-strokes on the anvil as Siegfried sings 'Nothung! Nothung! Neidliches Schwert!', pumping the bellows until the metal glows and the weapon is born of his own hand. It is opera as an ode to self-reliance: the maker who will trust only the instrument he has forged for himself.",
        "source": "Richard Wagner, Siegfried, WWV 86C (Act I forging scene), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez, 'The Forge of Vulcan' (1630) (visual artwork)",
        "excerpt": "Velázquez paints the smith-god Vulcan and his half-naked assistants frozen at the anvil, hammers raised over glowing metal, as the radiant Apollo intrudes with unwelcome news. Firelight glints on the half-formed armor and the workers' straining bodies, dignifying manual craft with the gravity of history painting. The forge itself becomes the true subject: a workshop where raw fire and skilled hands turn ore into an instrument of power.",
        "source": "Diego Velázquez, 'Apollo in the Forge of Vulcan' (1630), Museo del Prado, Madrid",
        "href": "https://www.museodelprado.es/en/the-collection/art-work/vulcans-forge/84a0240d-b41a-404d-8433-6e4e2efd21ab",
        "image": {
          "src": "/covers/meta-mtia-ai-chip-production--art.png",
          "alt": "Velázquez's painting The Forge of Vulcan, showing Apollo visiting Vulcan and his workers at a glowing forge",
          "credit": "Diego Velázquez, The Forge of Vulcan (1630), Museo del Prado; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "eswatini-us-deportees-fourth-group",
    "headline": "Eswatini receives a fourth group of US deportees under third-country migration deal",
    "overview": "The small southern African kingdom of Eswatini said on July 9, 2026 it had received 11 more people deported from the United States, mostly African nationals, the fourth such group under a roughly $5 million agreement with Washington to house third-country deportees. The arrivals, expected to be held at Matsapha Maximum Security Prison, bring the total to 29 and have drawn criticism from rights groups over transparency and the detention of foreigners without charge.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Associated Press",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNbTRWa192MEx1Y2gzV2NHTkV1cmQ1VVpteERtS3hhaVZ5ZlNGWXRITXVhMWFtU0REbDV0S0VYSzJQWDJGczRweUZyRDRSVEduZkFVZGV2SDdacXBuU2Z2Z043cFBfLTQxUkxqZmlPTjlnSnZfbWNYY25KVmxLY3ZoU0c0UHhIOWNSaENuNkJqdF8zcHNTdk92X2o3N2RvSXVmRGdTYjJGYURuMGp3aTk2aklid1k?oc=5"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2650272/world"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/eswatini-us-deportees-fourth-group.png",
      "alt": "An empty airliner passenger cabin at dusk, rows of vacant seats in cold light receding toward a doorway of pale light.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Babylonian Captivity of the Jews (6th century BC)",
        "excerpt": "After conquering Jerusalem, Nebuchadnezzar carried the population of Judah into exile in Babylon in a series of successive deportations, each counted and recorded: \"This is the people whom Nebuchadrezzar carried away captive: in the seventh year three thousand Jews and three and twenty ... all the persons were four thousand and six hundred.\" As with Eswatini's arriving groups tallied to 29, the exiles were reckoned batch by batch and held far from home in a foreign kingdom.",
        "source": "Book of Jeremiah 52:28-30 (King James Version), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jeremiah"
      },
      {
        "category": "historical",
        "title": "British penal transportation of convicts to distant colonies (1717-1868)",
        "excerpt": "Britain built a system to expel offenders across the ocean, first to the American colonies and later shipping some 162,000 convicts to Australia, held far from home. The founding statute justified it thus: \"and whereas in many of his Majesty's colonies and plantations in America, there is great want of servants, who by their labour and industry might be the means of improving and making the said colonies and plantations more useful to this nation.\"",
        "source": "Transportation Act 1717 (4 Geo. I c. 11), preamble, via The Statutes Project",
        "href": "https://statutes.org.uk/site/the-statutes/eighteenth-century/1717-4-george-1-c-11-the-transportation-act/"
      },
      {
        "category": "literary",
        "title": "Psalm 137, 'By the rivers of Babylon'",
        "excerpt": "By the rivers of Babylon, there we sat down, yea, we wept, when we remembered Zion. We hanged our harps upon the willows in the midst thereof. For there they that carried us away captive required of us a song; and they that wasted us required of us mirth, saying, Sing us one of the songs of Zion. How shall we sing the LORD's song in a strange land?",
        "source": "Psalm 137:1-4 (King James Version), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "literary",
        "title": "Dante, 'Paradiso' Canto XVII (Cacciaguida's prophecy of exile)",
        "excerpt": "Thou shalt abandon everything beloved / Most tenderly, and this the arrow is / Which first the bow of banishment shoots forth. / Thou shalt have proof how savoureth of salt / The bread of others, and how hard a road / The going down and up another's stairs.",
        "source": "Dante Alighieri, Divine Comedy: Paradiso, Canto XVII, trans. H. W. Longfellow (1867), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_17"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, 'Va, pensiero' (Chorus of the Hebrew Slaves), from Nabucco (musical)",
        "excerpt": "In Verdi's 1842 opera, the captive Hebrews, enslaved in Babylon, sing this hushed, swelling chorus in unison, their thought flying on golden wings back to the lost hills and rivers of their homeland. The melody rises from mournful quiet to an aching collective yearning for a country the exiles can no longer reach. It became an anthem for all peoples torn from their native land and held under a foreign power.",
        "source": "Giuseppe Verdi, Nabucco (1842), Act III; vocal score via IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Eduard Bendemann, 'Jews Mourning in Exile' (1832) (visual artwork)",
        "excerpt": "Bendemann's large canvas gathers a cluster of Judean captives beneath the willows by the waters of Babylon, harps set aside and silent. Bowed heads, downcast eyes, and clasped hands render the collective grief of a people expelled from their homeland and stranded in a strange kingdom. The dim, weighted palette makes the exiles' displacement and detention feel palpable and timeless.",
        "source": "Eduard Bendemann, oil on canvas, c. 1832, Wallraf-Richartz Museum and Fondation Corboud, Cologne",
        "href": "https://commons.wikimedia.org/wiki/File:Eduard_Bendemann-_Die_trauernden_Juden_im_Exil_um_1832.jpg",
        "image": {
          "src": "/covers/eswatini-us-deportees-fourth-group--art.png",
          "alt": "Painting of a group of mournful Jewish exiles seated with harps by the rivers of Babylon, heads bowed in grief.",
          "credit": "Eduard Bendemann, 'Jews Mourning in Exile' (c. 1832), Wallraf-Richartz Museum and Fondation Corboud, Cologne; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "mexico-ice-deaths-criminal-complaints",
    "headline": "Mexico to file US criminal complaints over citizens killed in immigration enforcement",
    "overview": "Mexico's government said on July 9, 2026 it will file criminal complaints with US prosecutors over the deaths of Mexican nationals in American immigration custody and enforcement operations, moving 'beyond the diplomatic sphere,' Foreign Ministry official Roberto Velasco said. The announcement followed the fatal shooting of a Mexican national by an ICE officer, with Mexico saying more than a dozen of its citizens have died in ICE custody or operations since early 2025.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOb0lBaTV6VjczNV9ZNFhtMjB6UzRBNkNzMWhmTENJT2phOS1jRTVSbHZYRDhFSmN0VG9iWnNvbmtVa09wSjFtTHV1bER3OElLaFYtLUJXMGliQTRUX1h4R3lIYWpzSm45bFpJTndlclRDRkF5TjBmTWV3ektqREtVRkFfQjQyLVlMTDl1U2FQR2dqZ2Y2U2MzcVFhak5ZY1FSVENzY2J6c3FPbXJVUnFsSXZrd1Q4emRM?oc=5"
      },
      {
        "name": "Xinhua",
        "href": "https://english.news.cn/northamerica/20260709/f210f4b58d09461f8773939c1cc555ca/c.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/mexico-ice-deaths-criminal-complaints.png",
      "alt": "A single lit candle among white flowers and pale glass votives forming a makeshift roadside memorial at dusk beside a bare wall.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, In Verrem: the crucifixion of the Roman citizen Gavius (70 BC)",
        "excerpt": "The unhappy man cried out that he was a Roman citizen, a burgher of Consa... no groan was heard from the unhappy man, no words came from his lips in his agony except 'I am a Roman citizen.'",
        "source": "Cicero, Against Verres 2.5.162 (C. D. Yonge trans., via Attalus)",
        "href": "https://www.attalus.org/cicero/verres25_3.html"
      },
      {
        "category": "historical",
        "title": "Lord Palmerston's Don Pacifico speech (House of Commons, 25 June 1850)",
        "excerpt": "whether, as the Roman, in days of old, held himself free from indignity, when he could say Civis Romanus sum; so also a British subject, in whatever land he may be, shall feel confident that the watchful eye and the strong arm of England, will protect him against injustice and wrong.",
        "source": "Viscount Palmerston, 'Don Pacifico Speech' (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Don_Pacifico_Speech"
      },
      {
        "category": "literary",
        "title": "Sophocles, Antigone",
        "excerpt": "Yes, since it was not Zeus that published me that edict, and since not of that kind are the laws which Justice who dwells with the gods below established among men.",
        "source": "Sophocles, Antigone, lines 450-455 (R. C. Jebb trans., Perseus Digital Library)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "Euripides, Hecuba",
        "excerpt": "I may be a slave and weak as well, but the gods are strong, and Custom too which prevails over them... if this principle, when referred to you, is to be set at nothing, and they are to escape punishment who murder guests or dare to plunder the temples.",
        "source": "Euripides, Hecuba, lines 798-806 (E. P. Coleridge trans., Perseus Digital Library)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0098:card=787"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, Messa da Requiem (musical)",
        "excerpt": "Verdi's colossal Requiem turns the Latin mass for the dead into a public act of grief and reckoning, its thundering Dies irae hurling down like judgment upon the slain. In the closing Libera me a lone voice pleads to be delivered from death, the chorus trembling between terror and the demand that the dead be remembered.",
        "source": "Giuseppe Verdi, Requiem (1874), full scores at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya, The Third of May 1808 (visual artwork)",
        "excerpt": "Goya freezes the instant before execution: a defenseless civilian throws his arms wide in a Christlike surrender as faceless soldiers level their muskets at point-blank range. A lantern glares on the fallen bodies already heaped in blood, an unflinching indictment of citizens gunned down by another state's armed agents.",
        "source": "Francisco de Goya, El Tres de Mayo de 1808 (1814), Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/mexico-ice-deaths-criminal-complaints--art.png",
          "alt": "A white-shirted man flings his arms wide before a firing squad at night, bloodied corpses at his feet, lit by a lantern on the ground.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado; Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "us-power-grid-transformer-shortage",
    "headline": "US utilities scramble for transformers as AI data-center demand strains the power grid",
    "overview": "US power companies are racing to secure transformers, switchgear and circuit breakers as surging electricity demand from AI data centers overwhelms supply, with lead times for large transformers now stretching past three years, Reuters reported on July 9, 2026. Utilities are prepaying, refurbishing old equipment and diversifying suppliers, even as analysts warn that nearly half of planned US data-center builds could be delayed by the equipment crunch.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxQMm1HbXZMcE1qM19kTnZBekU3cndtX2RnS2xTY1lOOWM2TTdHWUFDdmtXN2x4MnZaSERvZnJpclVNdDkzYXhPQ3pCTmVMeXY2eWs0Ul95d09XaFUyM1hFQW9WQUI0b1RUeXR3eTBmd2VUR202SWN6RjdSam1SRF9MdU9XNmhEVFMzdEx1VXp0NzdkREo2UGVZQmd6Y29RaTNubDVCLUI0T2xMa3ZUc2RJdlp5aTZDZHlIV2pCZ25zR3Y1Vmo0N21weXNpZw?oc=5"
      },
      {
        "name": "POWER Magazine",
        "href": "https://www.powermag.com/transformers-in-2026-shortage-scramble-or-self-inflicted-crisis/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/us-power-grid-transformer-shortage.png",
      "alt": "A high-voltage electrical power transformer at an outdoor substation.",
      "credit": "Ptrump16 / Wikimedia Commons"
    },
    "edition": "Evening Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Frontinus on Rome's aqueducts straining to slake a growing city (c. AD 97)",
        "excerpt": "With such an array of indispensable structures carrying so many waters, compare, if you will, the idle Pyramids or the useless, though famous, works of the Greeks!",
        "source": "Frontinus, De aquaeductu urbis Romae, Book I.16 (Bennett trans.), LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Frontinus/De_Aquis/Bennett/1*.html"
      },
      {
        "category": "historical",
        "title": "Edison's Pearl Street dynamos light lower Manhattan (September 4, 1882)",
        "excerpt": "The giant dynamos were started up at 3 o'clock in the afternoon, and, according to Mr. Edison, they will go on forever unless stopped by an earthquake.",
        "source": "The New York Times, September 5, 1882 (reproduced at Today in Science History)",
        "href": "https://todayinsci.com/Events/Buildings/NYTimesElectricLight.htm"
      },
      {
        "category": "literary",
        "title": "Henry Adams, \"The Dynamo and the Virgin\" (1900)",
        "excerpt": "As he grew accustomed to the great gallery of machines, he began to feel the forty-foot dynamos as a moral force, much as the early Christians felt the Cross.",
        "source": "Henry Adams, The Education of Henry Adams, ch. XXV",
        "href": "https://standardebooks.org/ebooks/henry-adams/the-education-of-henry-adams/text/chapter-25"
      },
      {
        "category": "literary",
        "title": "Lord Byron, \"Prometheus\" (1816) - the fire-bringer punished for his gift",
        "excerpt": "Titan! to whose immortal eyes / The sufferings of mortality, / Seen in their sad reality, / Were not as things that gods despise",
        "source": "Lord Byron, \"Prometheus\", Wikisource",
        "href": "https://en.wikisource.org/wiki/Prometheus_(Byron)"
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231, H.53 (1923) (musical)",
        "excerpt": "Honegger sets a colossal machine in motion, from the shuddering inertia of a dead standstill to a hammering, unstoppable momentum. Layer upon layer of rhythm accelerates as if driven by an appetite that cannot be reined in, a mass of iron and energy gathering overwhelming power that can barely be brought back to rest. It is the sound of the machine age straining at full load.",
        "source": "Arthur Honegger, Pacific 231 (full score, Senart 1924), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      },
      {
        "category": "artistic",
        "title": "Joseph Wright of Derby, An Experiment on a Bird in the Air Pump (1768) (visual artwork)",
        "excerpt": "In candlelit darkness a natural philosopher pumps the air from a glass globe, suffocating a white cockatoo as onlookers respond with wonder, fascination and dread. Wright dramatizes the Enlightenment thrill of harnessing invisible natural forces and the moral unease that shadows it, a single fragile life held hostage to a demonstration of humanity's new power over nature.",
        "source": "Joseph Wright of Derby, An Experiment on a Bird in the Air Pump, 1768, National Gallery, London",
        "href": "https://commons.wikimedia.org/wiki/File:An_Experiment_on_a_Bird_in_an_Air_Pump_by_Joseph_Wright_of_Derby,_1768.jpg",
        "image": {
          "src": "/covers/us-power-grid-transformer-shortage--art.png",
          "alt": "An 18th-century candlelit scene of a natural philosopher demonstrating a vacuum air pump on a white bird before a rapt audience",
          "credit": "Joseph Wright of Derby, 1768, National Gallery, London - public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "india-scraps-electronics-import-duty",
    "headline": "India scraps import duties on key electronics and smartphone components",
    "overview": "India on July 9, 2026 removed customs duties of 7.5% and 5% on a range of components used to make smartphones and electronics, including parts for wireless charging modules, displays and lithium-ion cells, in a bid to cut costs and expand domestic manufacturing. The exemptions, which run to March 2029, are expected to benefit firms such as Apple and Xiaomi as India targets $500 billion in electronics manufacturing by 2030.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPeXQxWG1OSmdCdUhUTHg2UDN0MEQyN20tN2tpcS1wcWVkMWlzWEZPRmdwV3dkVjhyNWFOX3JHd3NQYllmRzhVN0FidHBQdG40WnhWUXBubGZlU0xwT3ZXV1BQWGRXWkFkSDBXY0NsVFdKYWZzV0RseHhWY0xHSmpyR0VwTndtSWRnRUJIaE9hQmlxa3pxLUhVZEFxc1NtdEtlWExVZlNINkYtczFVRW5EYkg1MmlmMkxTRHc?oc=5"
      },
      {
        "name": "Republic World",
        "href": "https://www.republicworld.com/tech/government-removes-import-duty-on-key-smartphone-components-in-boost-to-apple-xiaomi-and-local-manufacturing-2026-07-09-131807"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/india-scraps-electronics-import-duty.png",
      "alt": "The internal circuit board of a smartphone-class mobile device, showing processors and memory chips.",
      "credit": "Raimond Spekking / Wikimedia Commons"
    },
    "edition": "Evening Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Periplus of the Erythraean Sea: the Indian port of Barygaza",
        "excerpt": "There are imported into this market-town, wine, Italian preferred, also Laodicean and Arabian; copper, tin, and lead; coral and topaz; thin clothing and inferior sorts of all kinds; bright-colored girdles a cubit wide; storax, sweet clover, flint glass, realgar, antimony, gold and silver coin, on which there is a profit when exchanged for the money of the country; and ointment, but not very costly and not much.",
        "source": "Periplus of the Erythraean Sea, 1st century CE (Schoff translation), Section 49",
        "href": "https://depts.washington.edu/silkroad/texts/periplus/periplus.html"
      },
      {
        "category": "historical",
        "title": "Richard Cobden's Free Trade speech, Manchester, 1846",
        "excerpt": "I see in the Free Trade principle that which shall act on the moral world as the principle of gravitation in the universe, - drawing men together, thrusting aside the antagonism of race and creed and language, and uniting us in the bonds of eternal peace.",
        "source": "Richard Cobden, \"Free Trade With All Nations,\" Manchester, January 15, 1846",
        "href": "https://cooperative-individualism.org/cobden-richard_free-trade-with-all-nations-1846.htm"
      },
      {
        "category": "literary",
        "title": "Adam Smith, The Wealth of Nations (Book IV, Ch. II)",
        "excerpt": "It is the maxim of every prudent master of a family never to attempt to make at home what it will cost him more to make than to buy. ... What is prudence in the conduct of every private family can scarce be folly in that of a great kingdom.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (1776)",
        "href": "https://www.econlib.org/library/Smith/smWN13.html"
      },
      {
        "category": "literary",
        "title": "Frédéric Bastiat, \"The Candlemakers' Petition\"",
        "excerpt": "Our petition is, that it would please your honorable body to pass a law whereby shall be directed the shutting up of all windows, dormers, sky-lights, shutters, curtains, vasistas, oeil-de-boeufs, in a word, all openings, holes, chinks and fissures through which the light of the sun is used to penetrate into our dwellings.",
        "source": "Frédéric Bastiat, Economic Sophisms (1845), \"A Petition\" of the candlemakers",
        "href": "https://monadnock.net/bastiat/petition.html"
      },
      {
        "category": "artistic",
        "title": "Handel, \"The Arrival of the Queen of Sheba,\" from Solomon, HWV 67 (musical)",
        "excerpt": "Handel's brilliant sinfonia bustles with paired oboes darting like traders across a crowded quay, its interlocking runs conjuring the pageantry of a fabled queen arriving laden with gifts to exchange with a distant kingdom. The music is pure festive commerce: energetic, gilded, and outward-looking, a celebration of two realms opening their gates to one another's riches.",
        "source": "George Frideric Handel, Solomon, HWV 67 (1748), Act III sinfonia",
        "href": "https://imslp.org/wiki/Solomon,_HWV_67_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Claude Lorrain, \"Seaport with the Embarkation of the Queen of Sheba\" (visual artwork)",
        "excerpt": "A luminous harbor glows in the golden haze of a rising sun, its water crowded with merchant galleons while porters load cargo along the quay between grand classical palaces. Claude Lorrain frames the open sea as an invitation, the gateway through which goods and fortunes flow, turning a legendary royal departure into a hymn to the promise of trade across horizons.",
        "source": "Claude Lorrain, 1648, oil on canvas, National Gallery, London (NG14)",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Lorrain_008.jpg",
        "image": {
          "src": "/covers/india-scraps-electronics-import-duty--art.png",
          "alt": "A sunlit classical seaport at dawn with sailing ships, figures loading cargo on the quay, and grand palace architecture framing the open sea",
          "credit": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba (1648), National Gallery, London; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "southern-china-guangxi-flood-deaths",
    "headline": "Flooding kills at least 39 in southern China after a dam breach and days of heavy rain",
    "overview": "At least 39 people were killed in southern China's Guangxi region after days of torrential rain from Tropical Storm Maysak caused catastrophic flooding, including a dam breach east of Nanning that alone claimed 26 lives, authorities said on July 9, 2026. About 130,000 people were evacuated and thousands of boats deployed as rescuers searched the inundated region for the missing.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Associated Press",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPSXp1X091MHRxeUJlZzNTNzNxQkZHRnNrQmxpRUVTc25mdVdlSjhsdTB6M0Z4blFJNmFPaGkzMnVmTGg3cFVZNHQweUdSZGtod0VuQ19lVmE2LXNqZVZMY25LbGRDcGs4X0loemZMenF4bWJfVVRpYkpLd0wzWFlsMnFoemxJLUZ4cEJaNXliVXZGWk9LcWFvVlN5NENDZmlqZXNR?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/9/flooding-from-tropical-storm-maysak-kills-39-in-southern-china"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/southern-china-guangxi-flood-deaths.png",
      "alt": "Streets and buildings of Datong Town, Tongling in southern China submerged during flooding.",
      "credit": "Whisper of the heart / Wikimedia Commons"
    },
    "edition": "Evening Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Johnstown Flood and the failure of the South Fork Dam (1889)",
        "excerpt": "On May 31, 1889, the earthen South Fork Dam gave way above Johnstown, Pennsylvania, loosing some 14.5 million cubic meters of water in a wall reported at up to 60 feet high, racing down the valley at around 40 miles per hour. It obliterated the town within minutes and killed more than 2,200 people, the deadliest dam-break flood in American history and an early lesson in how a single ruptured barrier can drown a whole community. As in Guangxi, it was not the rain alone but the breaking of a man-made wall that turned a storm into a mass-casualty catastrophe.",
        "source": "Wikipedia: Johnstown Flood",
        "href": "https://en.wikipedia.org/wiki/Johnstown_Flood"
      },
      {
        "category": "historical",
        "title": "The 1931 China floods, among the deadliest disasters in recorded history",
        "excerpt": "From June to August 1931, torrential rains and swollen rivers overwhelmed central and eastern China, inundating roughly 180,000 square kilometers across eight provinces as the Yangtze, Huai, Yellow River and Grand Canal burst their bounds. Death-toll estimates range from about 422,000 to as many as 3.7 to 4 million, placing it among the worst natural disasters humanity has ever recorded, and it culminated in a catastrophic dike breach at Lake Gaoyou. Nearly a century before the Guangxi deluge, it showed the terrible scale China's waters can reach when the land can no longer hold them.",
        "source": "Wikipedia: 1931 China floods",
        "href": "https://en.wikipedia.org/wiki/1931_China_floods"
      },
      {
        "category": "literary",
        "title": "The flood of the gods in the Epic of Gilgamesh (Chaldean Deluge tablet)",
        "excerpt": "Vul in the midst of it thundered... of Vul the flood, reached to heaven; the bright earth to a waste was turned. The gods, like dogs with tails hidden, couched down. Brother saw not his brother, it did not spare the people... Six days and nights passed, the wind tempest and storm overwhelmed, on the seventh day in its course, was calmed the storm.",
        "source": "George Smith trans., The Chaldean Account of the Deluge (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Chaldean_Account_of_the_Deluge"
      },
      {
        "category": "literary",
        "title": "The Deluge in the Book of Genesis (chapter 7)",
        "excerpt": "And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered. And all flesh died that moved upon the earth, both of fowl, and of cattle, and of beast, and of every creeping thing that creepeth upon the earth, and every man.",
        "source": "Bible (King James), Genesis 7 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Symphony No. 6 'Pastoral', 4th movement: 'The Storm' (musical)",
        "excerpt": "In the fourth movement of his 'Pastoral' Symphony, Beethoven summons a cloudburst out of a calm countryside: distant rumbles in the low strings swell into cracking timpani thunder, shrieking piccolo lightning and sheeting rain from the full orchestra. The music enacts nature's raw, indifferent power before subsiding into gratitude as the storm passes, capturing the same terror and awe that a real deluge visits on those beneath it. It is among the most vivid depictions of a tempest in the orchestral repertoire.",
        "source": "Beethoven, Symphony No. 6, Op. 68 ('Pastoral'), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "John Martin, 'The Deluge' (1834) — visual artwork",
        "excerpt": "John Martin's vast, apocalyptic canvas shows humanity engulfed by the biblical flood: tiny figures cling to the last black crags as a mountainous wall of water rears against a storm-torn sky lit by lightning and a lurid, eclipse-darkened moon. The painting dwarfs its people utterly, staging the drowning of the world as a cosmic event and human beings as powerless before the raw force of rising water. It is one of the great Romantic visions of nature overwhelming the land.",
        "source": "John Martin, The Deluge, 1834, Yale Center for British Art",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Deluge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/southern-china-guangxi-flood-deaths--art.png",
          "alt": "John Martin's 1834 painting The Deluge: tiny human figures on dark rocks overwhelmed by a towering wave beneath a stormy, moonlit sky.",
          "credit": "John Martin (1789-1854), 'The Deluge' (1834), Yale Center for British Art. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "novo-nordisk-weekly-insulin-india",
    "headline": "Novo Nordisk launches once-weekly insulin Awiqli in India",
    "overview": "Novo Nordisk on July 9, 2026 launched Awiqli (insulin icodec), described as the world's first once-weekly basal insulin, in India for adults with type 1 or type 2 diabetes, cutting the number of basal injections from about 365 a year to 52. The drug, already approved in the US, EU and other markets, arrives in a country with one of the world's largest and fastest-growing diabetic populations.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi2wFBVV95cUxQWmlLM1N2RC1HcVRscG1xcXlHN1V3bjJzTXVJVkl5eS03My0wUHdJUWdKTVVzUUJjdkhMOU1IS3ZBeDNFMVFkY0VGOHdUZExHX1docExWZ3BhTGtFMnhzRWtKOXJRckIwaXg0V1JPT1BHQzJJOXlXUWdnV2V6V1Q1eHlKX2VrcU95djFOdXRFOUFDVXVVbDhUbTNqQjRlMFhubnpWLVlWWFpTREpGa2dNV3RGU3VCY2VXVmFvMU5MaVBXR1dTQVBiUHlaSXhrbFJuU0QyUldSUVphcFk?oc=5"
      },
      {
        "name": "Business Standard",
        "href": "https://www.business-standard.com/industry/news/novo-nordisk-launches-awiqli-world-s-first-weekly-basal-insulin-in-india-126070900420_1.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/novo-nordisk-weekly-insulin-india.png",
      "alt": "An insulin injection pen used for diabetes treatment.",
      "credit": "Markus.Michalczyk / Wikimedia Commons"
    },
    "edition": "Evening Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Ebers Papyrus records \"urine that is too plentiful\" (c. 1550 BCE)",
        "excerpt": "In ancient Egypt, more than three millennia before insulin, scribes compiling the Ebers Papyrus set down remedies for a body that wasted as it passed too much water. Its terse prescription to check urine \"which is too plentiful\" is widely read as the first written trace of diabetes, a disease then met only with herbs and prayer. That the same affliction would one day be tamed by a single weekly injection marks the distance medicine has traveled.",
        "source": "History of diabetes (on the Ebers Papyrus, c. 1550 BCE), Wikipedia",
        "href": "https://en.wikipedia.org/wiki/History_of_diabetes"
      },
      {
        "category": "historical",
        "title": "Leonard Thompson receives the first insulin injection, Toronto, 1922",
        "excerpt": "In January 1922 a dying fourteen-year-old, Leonard Thompson, wasted to about sixty-five pounds, became the first human treated with insulin at Toronto General Hospital. Banting and Best's early extract failed, but Collip's purified version dropped his blood sugar to normal within a day and revived him. A death sentence became a manageable condition overnight, launching a century of refinement that now stretches a year's basal injections from hundreds down to fifty-two.",
        "source": "The Discovery of Insulin at the University of Toronto, Thomas Fisher Rare Book Library",
        "href": "https://fisher.library.utoronto.ca/discovery-insulin"
      },
      {
        "category": "literary",
        "title": "Aretaeus of Cappadocia, \"On Diabetes\" (2nd century CE)",
        "excerpt": "Diabetes is a wonderful affection, not very frequent among men, being a melting down of the flesh and limbs into urine. ... the patients never stop making water, but the flow is incessant, as if from the opening of aqueducts.",
        "source": "Aretaeus, The Extant Works, trans. Francis Adams (1856), Book II, Ch. 2, via Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0254:text%3DSD:book%3D2:chapter%3D2"
      },
      {
        "category": "literary",
        "title": "Ecclesiasticus (Sirach) 38, in praise of the physician and medicine",
        "excerpt": "Honour a physician with the honour due unto him for the uses which ye may have of him: for the Lord hath created him. ... The Lord hath created medicines out of the earth; and he that is wise will not abhor them.",
        "source": "Ecclesiasticus 38 (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiasticus"
      },
      {
        "category": "artistic",
        "title": "Handel, \"Comfort ye my people\" from Messiah, HWV 56 (musical)",
        "excerpt": "Handel opens his great oratorio not with triumph but with balm: a solitary tenor, over gently rocking strings, is told to speak comfort to a weary people. The line rises tenderly out of suffering toward relief and reassurance, the musical equivalent of a burden lifted. It is a fitting anthem for any moment when long-endured hardship gives way to ease.",
        "source": "Messiah, HWV 56 (Handel), scores at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Messiah,_HWV_56_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Luke Fildes, \"The Doctor\" (1891), Tate (visual artwork)",
        "excerpt": "In a dim cottage at dawn, a physician leans forward in unbroken vigil over a sick child, chin on hand, while the anxious parents wait in shadow behind him. Fildes distills devoted, patient care into a single tender scene: medicine as steady human attention at the bedside. It stands as an enduring emblem of the calling that, across centuries, has sought to ease suffering and hold back disease.",
        "source": "Samuel Luke Fildes, The Doctor (1891), oil on canvas, Tate Britain (N01522)",
        "href": "https://www.tate.org.uk/art/artworks/fildes-the-doctor-n01522",
        "image": {
          "src": "/covers/novo-nordisk-weekly-insulin-india--art.png",
          "alt": "A Victorian physician sits in vigil at the bedside of a sick child in a dim cottage, watched by anxious parents in the shadows.",
          "credit": "Samuel Luke Fildes, The Doctor (1891), Tate Britain; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "astrazeneca-wainua-heart-trial-fail",
    "headline": "AstraZeneca's Wainua fails a key heart-disease trial, wiping billions off its value",
    "overview": "AstraZeneca shares fell about 9% on July 9, 2026, erasing roughly £19 billion in market value, after its drug Wainua (eplontersen), developed with Ionis, failed the Phase III CARDIO-TTRansform trial in transthyretin amyloid cardiomyopathy (ATTR-CM). The study did not meet its primary goal of cutting cardiovascular deaths and events, a rare high-profile setback for the company in a market once estimated at more than $15 billion.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi3wFBVV95cUxNT1hfTDNWX2IwRHVtOFA5eGxKRWNuWjJOT3Vyd04yUXViOWRGUWxUMmxOVl9fZmV3Z0c4X3BpV2FrVFhRUHg2T1JRMDVaTndpZEZ6WnJ5SXo3c1l5N3BsTXphblBhOENEbG5ueUpxNFl3LUlWMGZXYkduaHNVZ0c3N0JqZTh4dWVpWTNDaUpHdFV6WWpVUUcxTHJfR2x6dHVvTl9KdW9GbVctTFFxbXEwMTdLQVBpQ3Y5dzE3RXdfczNYaDBCLUtMbGJRM0NvU2V3bE9LMlcyNGtpazF5Y21r?oc=5"
      },
      {
        "name": "AstraZeneca",
        "href": "https://www.astrazeneca.com/media-centre/press-releases/2026/update-cardio-ttransform-phase-iii-trial.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/astrazeneca-wainua-heart-trial-fail.png",
      "alt": "AstraZeneca's headquarters building in central Cambridge, England.",
      "credit": "FDV / Wikimedia Commons"
    },
    "edition": "Evening Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The South Sea Bubble bursts (1720)",
        "excerpt": "In 1720 the shares of Britain's South Sea Company were driven skyward by feverish speculation and boundless promises of riches, only to crash within months. Fortunes evaporated, thousands of investors were ruined, and the euphoria that had gripped the nation curdled into panic and recrimination. Charles Mackay chronicled it as a textbook case of inflated hope collapsing under the weight of its own expectation.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm"
      },
      {
        "category": "historical",
        "title": "Pfizer's torcetrapib collapse (2006)",
        "excerpt": "On 2 December 2006 Pfizer abruptly halted Phase III trials of torcetrapib, its great hope for heart disease, after monitors found excess deaths and cardiovascular events among patients taking it. Days earlier the company's chief executive had called it one of the most important compounds of the generation. The shares tumbled by double digits, erasing tens of billions in value in a single session and echoing the sudden reversal now facing AstraZeneca.",
        "source": "BMJ news report, 'Pfizer stops clinical trials of heart drug' (PMC/NIH)",
        "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC1702474/"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VIII - The Fall of Icarus",
        "excerpt": "The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air. His face, too, as he called on the name of his father, was received in the azure water, which received its name from him.",
        "source": "Ovid, Metamorphoses (Riley translation, Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "Robert Burns, 'To a Mouse' (1785)",
        "excerpt": "But, Mousie, thou art no thy lane, / In proving foresight may be vain: / The best laid schemes o' mice an' men / Gang aft a-gley, / An' lea'e us nought but grief an' pain, / For promis'd joy.",
        "source": "The Poetical Works of Robert Burns (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Poetical_Works_of_Robert_Burns/To_a_Mouse,_on_turning_her_up_in_her_nest,_with_the_plough"
      },
      {
        "category": "artistic",
        "title": "Chopin, Marche funebre, from Piano Sonata No. 2 in B-flat minor, Op. 35 (musical)",
        "excerpt": "Chopin's slow, tolling funeral march opens with a heavy, inexorable tread in the minor key, the sound of a cortege advancing under a leaden sky. A brief consoling middle section lifts toward tenderness before the relentless dirge returns, extinguishing the light. It is the definitive musical image of hope solemnly laid to rest.",
        "source": "Chopin, Piano Sonata No. 2, Op. 35, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, 'Landscape with the Fall of Icarus' (c. 1555) (visual artwork)",
        "excerpt": "A ploughman, a shepherd and a fisherman go about their work as a great ship sails on, indifferent, while in a corner of the sea two pale legs vanish beneath the waves - all that remains of Icarus after his plunge from the sky. Bruegel stages catastrophe as a small, almost unnoticed splash within an ongoing world, a quiet meditation on soaring ambition and its abrupt, overlooked collapse.",
        "source": "Royal Museums of Fine Arts of Belgium, Brussels (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/astrazeneca-wainua-heart-trial-fail--art.png",
          "alt": "Bruegel's Landscape with the Fall of Icarus: a sunlit coastal scene where a ploughman works in the foreground while Icarus's legs disappear into the sea near a passing ship",
          "credit": "Pieter Bruegel the Elder, Royal Museums of Fine Arts of Belgium, Brussels; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "riba-national-awards-2026",
    "headline": "RIBA names its 32 best British buildings of 2026, with London dominating",
    "overview": "The Royal Institute of British Architects announced its 32 National Award winners on July 9, 2026, honouring the year's best British architecture, with 17 of the winners in London and a strong showing for conservation, retrofit and cultural projects such as Renzo Piano's Paddington Square and O'Donnell + Tuomey's Sadler's Wells East. The winners become contenders for the Stirling Prize, whose shortlist follows on July 16.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/09/riba-national-awards-2026-uk/"
      },
      {
        "name": "RIBA Journal",
        "href": "https://www.ribaj.com/buildings/riba-national-award-winners-2026-best-uk-architecture/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/riba-national-awards-2026.png",
      "alt": "The contemporary glass-clad Paddington Square building in Westminster, London, seen from the Grand Union Canal.",
      "credit": "Captain Galaxy / Wikimedia Commons"
    },
    "edition": "Evening Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plutarch on the buildings of Periclean Athens",
        "excerpt": "For every particular piece of his work was immediately, even at that time, for its beauty and elegance, antique; and yet in its vigor and freshness looks to this day as if it were just executed.",
        "source": "Plutarch, Life of Pericles (Clough translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Life_of_Pericles"
      },
      {
        "category": "historical",
        "title": "Christopher Wren's epitaph in St Paul's Cathedral",
        "excerpt": "LECTOR SI MONUMENTUM REQUIRIS CIRCUMSPICE - 'Reader, if you seek his monument, look around you.' The Latin inscription over Wren's tomb makes the whole rebuilt cathedral, raised from the ashes of the Great Fire of 1666, his memorial to the craft of building well.",
        "source": "Epitaph of Sir Christopher Wren, St Paul's Cathedral",
        "href": "https://en.wikipedia.org/wiki/Christopher_Wren"
      },
      {
        "category": "literary",
        "title": "Vitruvius on firmness, commodity and delight",
        "excerpt": "All these must be built with due reference to durability, convenience, and beauty.",
        "source": "Vitruvius, The Ten Books on Architecture, Book I, Ch. 3 (Morgan translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/20239/20239-h/20239-h.htm"
      },
      {
        "category": "literary",
        "title": "Ruskin, \"The Lamp of Memory\"",
        "excerpt": "Therefore, when we build, let us think that we build for ever. Let it not be for present delight, nor for present use alone; let it be such work as our descendants will thank us for.",
        "source": "John Ruskin, The Seven Lamps of Architecture (1849), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Seven_Lamps_of_Architecture/Chapter_6"
      },
      {
        "category": "artistic",
        "title": "Bach, Passacaglia and Fugue in C minor, BWV 582 (musical)",
        "excerpt": "Over a single grave ground bass Bach raises twenty variations, stacking voice upon voice like courses of stone until the structure resolves into a towering double fugue. It is the aural counterpart to Goethe's 'frozen music' - architecture built in sound, monumental yet meticulously crafted.",
        "source": "Johann Sebastian Bach, Passacaglia in C minor, BWV 582, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Passacaglia_in_C_minor,_BWV_582_(Bach,_Johann_Sebastian)"
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, The Architect's Dream (1840) (visual artwork)",
        "excerpt": "A dreaming architect reclines atop a colossal column while Egyptian, Greek, Roman and Gothic monuments recede across a luminous imaginary landscape. Cole's capriccio surveys the whole inheritance of building - the ambition, the styles and the enduring grandeur that any new architecture measures itself against.",
        "source": "Thomas Cole, The Architect's Dream (1840), Toledo Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Cole_-_Architect%E2%80%99s_Dream_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/riba-national-awards-2026--art.png",
          "alt": "Thomas Cole's painting The Architect's Dream: a figure reclining on a column amid Egyptian, Greek, Roman and Gothic buildings",
          "credit": "Thomas Cole, The Architect's Dream (1840), Toledo Museum of Art - public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "nvidia-france-antitrust-probe",
    "headline": "France's antitrust probe of Nvidia nears its end, regulator says",
    "overview": "France's competition authority said on July 9, 2026 that its antitrust investigation into Nvidia, the dominant maker of AI chips, is nearing completion, with its general rapporteur saying the inquiry into alleged anti-competitive practices in the AI and cloud-computing supply chain is almost done. The case, which began with a 2023 raid on Nvidia's French offices, could still lead to formal objections or be closed without sanction.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxOQ3ppUXV1TlI5eFJQT1hYUmp3SHl0Q2lXNmowQ2JOSXdTYl9mX00wZXM2TE5ZWXkyMzlVUEJMbDNYMGtLRjBrSDVYVk85YjlIQlF2d1poZC0xU3hvNGhmNTdRSmlTNldSVkxSbVBjU0dVZ3NxZVRsaV9BQXFRUjRtNjVvQXB5Wm5YT25qV0t5ek9fNlF6OV9uVkpRc2o?oc=5"
      },
      {
        "name": "The Next Web",
        "href": "https://thenextweb.com/news/france-nvidia-antitrust-probe-nearing-end"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/nvidia-france-antitrust-probe.png",
      "alt": "An Nvidia H100 Hopper-architecture data-center AI accelerator card.",
      "credit": "Geekerwan / Wikimedia Commons"
    },
    "edition": "Evening Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rome's Lex Julia de Annona against the grain cornerers",
        "excerpt": "By the Julian Law relating to Provisions a penalty is prescribed against him who commits any act, or forms any association by means of which the price of provisions may be increased.",
        "source": "The Digest of Justinian, Book 48, Title 12 (Ulpian, On the Duties of Proconsul), trans. S. P. Scott",
        "href": "https://droitromain.univ-grenoble-alpes.fr/Anglica/D48_Scott.htm"
      },
      {
        "category": "historical",
        "title": "1911: The U.S. Supreme Court dissolves the Standard Oil trust",
        "excerpt": "The unification of power and control over a commodity such as petroleum and its products by combining in one corporation the stocks of many other corporations aggregating a vast capital gives rise, of itself, to the prima facie presumption of an intent and purpose to dominate the industry connected with, and gain perpetual control of the movement of, that commodity and its products in the channels of interstate commerce in violation of the Anti-Trust Act of 1890.",
        "source": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911), U.S. Supreme Court (official syllabus)",
        "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States"
      },
      {
        "category": "literary",
        "title": "Frank Norris, The Octopus: A Story of California (1901)",
        "excerpt": "Abruptly Presley saw again, in his imagination, the galloping monster, the terror of steel and steam, with its single eye, cyclopean, red, shooting from horizon to horizon; but saw it now as the symbol of a vast power, huge, terrible, flinging the echo of its thunder over all the reaches of the valley, leaving blood and destruction in its path; the leviathan, with tentacles of steel clutching into the soil, the soulless Force, the iron-hearted Power, the monster, the Colossus, the Octopus.",
        "source": "Frank Norris, The Octopus (1901), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/268/268-h/268-h.htm"
      },
      {
        "category": "literary",
        "title": "Ida Tarbell, The History of the Standard Oil Company (1904)",
        "excerpt": "Serialized in McClure's and published as a book in 1904, Tarbell's meticulous expose traced how John D. Rockefeller's combine used secret railroad rebates and predatory pricing to strangle rivals and seize command of American oil. Written by the daughter of a ruined independent oilman, it laid bare the machinery of monopoly fact by patient fact, and its revelations helped drive the government toward the 1911 breakup. It remains the template for how careful reporting can turn a private colossus's grip into a public reckoning.",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company (1904), Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/60692"
      },
      {
        "category": "artistic",
        "title": "In the Hall of the Mountain King, from Peer Gynt Suite No. 1, Op. 46 (musical)",
        "excerpt": "Grieg's relentless little theme begins as a whisper low in the strings and, repeating over and over, swells and quickens until it becomes an overwhelming, stamping march. It conjures a subterranean king and his troll horde closing in from every side, an image of a looming power whose grip tightens with each bar. The music's inexorable acceleration mirrors a monopoly's advance: quiet at first, then inescapable.",
        "source": "Edvard Grieg, Peer Gynt Suite No. 1, Op. 46 (1888), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Peer_Gynt_Suite_No.1,_Op.46_(Grieg,_Edvard)"
      },
      {
        "category": "artistic",
        "title": "\"Next!\" - the Standard Oil octopus (visual artwork)",
        "excerpt": "In this 1904 Puck cartoon the Standard Oil company is drawn as a bloated octopus, its steel-cabled tentacles coiled around the U.S. Capitol, a state house, and the copper, steel, and shipping industries, with one arm reaching hungrily toward the White House. The single caption, 'Next!', warns that no institution lies beyond the monopoly's grasp. It became the defining visual shorthand for concentrated corporate power squeezing a democracy.",
        "source": "Udo J. Keppler, Puck, September 7, 1904; Library of Congress",
        "href": "https://commons.wikimedia.org/wiki/File:Standard_oil_octopus_loc_color.jpg",
        "image": {
          "src": "/covers/nvidia-france-antitrust-probe--art.png",
          "alt": "1904 political cartoon depicting the Standard Oil monopoly as a giant octopus, its tentacles gripping government buildings and industries and reaching toward the White House.",
          "credit": "Udo J. Keppler, Puck magazine, 1904. Library of Congress / Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "rob-hann-american-roadside-photography",
    "headline": "Rob Hann's roadside photographs frame the lonely poetry of the American road trip",
    "overview": "The photography site Colossal on July 9, 2026 spotlighted British-born, New York-based photographer Rob Hann, whose chromatic, quietly surreal images of the American West capture roadside signs, lone motels and mysterious installations set in vast empty landscapes. His decades of solo road trips, begun in 2001, distil the nostalgia and boundless grandeur of the great American road.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/rob-hann-photography-landscapes-united-states-nostlagia/"
      },
      {
        "name": "Rob Hann",
        "href": "https://robhann.com/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/rob-hann-american-roadside-photography.png",
      "alt": "An empty stretch of historic Route 66 running through open desert near Amboy, California.",
      "credit": "Dietmar Rabich / Wikimedia Commons"
    },
    "edition": "Evening Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "John L. O'Sullivan coins \"Manifest Destiny\" (1845)",
        "excerpt": "In his essay \"Annexation,\" the editor denounced foreign meddling as \"limiting our greatness and checking the fulfillment of our manifest destiny to overspread the continent allotted by Providence for the free development of our yearly multiplying millions.\" The phrase gave a providential gloss to the 19th-century westward surge, casting the vast, unclaimed spaces of the American West as a birthright waiting at the end of the trail.",
        "source": "John L. O'Sullivan, \"Annexation,\" United States Magazine and Democratic Review (1845), via The American Yawp Reader",
        "href": "https://www.americanyawp.com/reader/manifest-destiny/john-osullivan-declares-americas-manifest-destiny-1845/"
      },
      {
        "category": "historical",
        "title": "U.S. Route 66 is designated (1926)",
        "excerpt": "On November 11, 1926, the Chicago-to-Los Angeles corridor received its now-legendary number as part of the nation's first federal highway system, stitching 2,400 miles across eight states. Fully paved by 1938, it carried Dust Bowl migrants west and later became the archetype of the American road trip, its roadside motels, diners and signs blooming along the shoulder. It is exactly this vernacular of the open highway that Rob Hann's photographs frame decades later.",
        "source": "National Park Service, \"Route 66: 1926-1945\"",
        "href": "https://www.nps.gov/articles/route-66-1926-1945.htm"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"Song of the Open Road\" (Leaves of Grass, 1882)",
        "excerpt": "Afoot and light-hearted I take to the open road, / Healthy, free, the world before me, / The long brown path before me leading wherever I choose.",
        "source": "Walt Whitman, Leaves of Grass (1882 ed.), Wikisource",
        "href": "https://en.wikisource.org/wiki/Leaves_of_Grass_(1882)/Song_of_the_Open_Road"
      },
      {
        "category": "literary",
        "title": "Mark Twain, Roughing It (1872), Chapter II",
        "excerpt": "Just here the land was rolling - a grand sweep of regular elevations and depressions as far as the eye could reach - like the stately heave and swell of the ocean's bosom after a storm.",
        "source": "Mark Twain, Roughing It, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3177/3177-h/3177-h.htm"
      },
      {
        "category": "artistic",
        "title": "Antonín Dvořák, Symphony No. 9 'From the New World' (1893) (musical)",
        "excerpt": "Composed during Dvořák's American sojourn, the symphony translates the immensity of the New World into sound, its plangent cor anglais Largo drifting like a lone figure across an open plain. Broad, homesick melodies swell against wide harmonic horizons, distilling the nostalgia and grandeur of a continent glimpsed from the road. It is a musical counterpart to Hann's quiet, sun-struck vistas of the American West.",
        "source": "Antonín Dvořák, Symphony No. 9, Op. 95, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.95_(Dvo%C5%99%C3%A1k,_Anton%C3%ADn)"
      },
      {
        "category": "artistic",
        "title": "Albert Bierstadt, \"Among the Sierra Nevada, California\" (1868) (visual artwork)",
        "excerpt": "Bierstadt's vast luminist canvas floods a Sierra valley with radiant, theatrical light: mist rises off a mirror-still lake, waterfalls thread down sheer cliffs, and a herd of deer stands dwarfed beneath towering peaks and glowing clouds. Painted to sell Europe on the sublime American West, it swells with the same boundless grandeur and lonely wonder that pervade Hann's roadside landscapes.",
        "source": "Albert Bierstadt, Among the Sierra Nevada, California (1868), Smithsonian American Art Museum, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Albert_Bierstadt_-_Among_the_Sierra_Nevada,_California_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/rob-hann-american-roadside-photography--art.png",
          "alt": "A sunlit Sierra Nevada valley with a mirror-still lake, rising mist, waterfalls and deer beneath towering glowing peaks",
          "credit": "Albert Bierstadt, 1868, Smithsonian American Art Museum (public domain), via Wikimedia Commons"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "germany-europe-heatwave-deaths",
    "headline": "Germany records more than 5,000 heat-related deaths as Western Europe logs its hottest June on record",
    "overview": "Germany's Robert Koch Institute estimated on July 9, 2026 that about 5,120 people have died from heat so far this year, most during a late-June heatwave when weekly average temperatures soared past 20C, and roughly 4,270 of the dead were aged 75 or older. The toll came as the EU's Copernicus Climate Change Service confirmed Western Europe endured its hottest June on record, averaging 20.74C, with national authorities reporting more than 4,700 excess deaths across France, Belgium, Spain and the Netherlands during the June 20-28 heat. Scientists said the pattern of longer, more intense heatwaves is consistent with a warming climate.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQaklFdUlFUnMyUGp3Y1VxTno0ME51cEcxSXBLRHk0Ti1qZXJ1aFdzcV9uWldYV2pRSXFWbjZKaUFxUWp4QWpJNG9QOWxFRHhUZVVnWGJRdm1xRmRkQV9FcTdZYlAtdjBoWXFIcWJVSmlGeWl5WmhDODhqOW04UFVWYy1mVHFIS2ZfYTZGeDYya0FQSGIxOUp3by11c0xhN1VDblJBNldiek5LM1c3UnFfdzln?oc=5"
      },
      {
        "name": "The Print",
        "href": "https://theprint.in/world/more-than-5000-excess-deaths-recorded-as-heatwave-grips-germany/2979999/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/germany-europe-heatwave-deaths.png",
      "alt": "Parched, deeply cracked earth of a drought-stricken field baking under a harsh summer sun.",
      "credit": "USDA NRCS via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The plague of Athens: bodies burning from within",
        "excerpt": "But internally it burned so that the patient could not bear to have on him clothing or linen even of the very lightest description; or indeed to be otherwise than stark naked. What they would have liked best would have been to throw themselves into cold water; as indeed was done by some of the neglected sick, who plunged into the rain-tanks in their agonies of unquenchable thirst; though it made no difference whether they drank little or much.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (Crawley translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "historical",
        "title": "Europe's summer of 2003: 70,000 dead, the old first",
        "excerpt": "The August 2003 heatwave was the deadliest in modern European history, and the closest precedent to 2026. Official European Commission analysis of excess mortality found more than 70,000 additional deaths across the continent that summer, with France, Italy, Spain and Germany worst hit. As in 2026, the burden fell overwhelmingly on the elderly and the isolated, exposing how unprepared modern cities were for sustained extreme heat and prompting the heat-warning systems now in place.",
        "source": "European Commission (DG Health), 'Assessment and prevention of acute health effects of weather conditions in Europe' — report on excess mortality in Europe, summer 2003 (2007)",
        "href": "https://ec.europa.eu/health/ph_projects/2005/action1/docs/action1_2005_a2_15_en.pdf"
      },
      {
        "category": "literary",
        "title": "Coleridge's copper sky and killing thirst",
        "excerpt": "All in a hot and copper sky, The bloody Sun, at noon, Right up above the mast did stand, No bigger than the Moon. Day after day, day after day, We stuck, nor breath nor motion; As idle as a painted ship Upon a painted ocean. Water, water, every where, And all the boards did shrink; Water, water, every where, Nor any drop to drink.",
        "source": "Samuel Taylor Coleridge, 'The Rime of the Ancient Mariner' (Part II), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "literary",
        "title": "Defoe's dead-carts and common graves",
        "excerpt": "How the poor people found the insufficiency of those things, and how many of them were afterwards carried away in the dead-carts and thrown into the common graves of every parish with these hellish charms and trumpery hanging about their necks, remains to be spoken of as we go along.",
        "source": "Daniel Defoe, A Journal of the Plague Year, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt"
      },
      {
        "category": "artistic",
        "title": "Vivaldi's 'Summer': languishing under a burning sun (musical)",
        "excerpt": "Vivaldi's 'L'estate' (Summer), the second concerto of The Four Seasons, sets oppressive heat to music. Its accompanying sonnet opens with man and flock languishing beneath a sun that scorches the pines, and the slow movement depicts a body drained and sleepless in the sweltering air before the violent summer storm erupts. Three centuries before Copernicus logged Europe's hottest June, Vivaldi rendered heat itself as a physical, exhausting force pressing on the living.",
        "source": "Antonio Vivaldi, Le quattro stagioni, Op. 8 — Concerto No. 2 in G minor 'L'estate' (RV 315), IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "Poussin's 'The Plague at Ashdod': a city felled by contagion (visual artwork)",
        "excerpt": "Nicolas Poussin's 1630 canvas stages mass death with cold clarity: amid grand classical architecture, the living recoil and cover their faces while corpses lie sprawled across the foreground, including a dead mother beside her still-living infant. The scattered bodies and the panic of survivors turn abstract catastrophe into an image of the vulnerable overwhelmed — the same grim arithmetic behind thousands of heat deaths among the frail and elderly in 2026.",
        "source": "Nicolas Poussin, The Plague at Ashdod (1630), Musée du Louvre — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_plague_of_ashdod_1630.jpg",
        "image": {
          "src": "/covers/germany-europe-heatwave-deaths--art.png",
          "alt": "Nicolas Poussin's painting The Plague at Ashdod, showing terrified figures recoiling among classical buildings while corpses lie sprawled across the foreground of the stricken city.",
          "credit": "Nicolas Poussin, The Plague at Ashdod (1630), Musée du Louvre, public domain via Wikimedia Commons"
        }
      }
    ],
    "lead": true,
    "rank": 14
  },
  {
    "slug": "germany-us-tomahawk-missiles",
    "headline": "Germany agrees to buy US Tomahawk missiles, Chancellor Merz says at NATO summit",
    "overview": "German Chancellor Friedrich Merz said on July 9, 2026 that Berlin had agreed with Washington to purchase US-made Tomahawk cruise missiles and station them on German soil, reviving a deployment plan that had appeared to stall earlier in the year. Speaking on the sidelines of a NATO meeting in Ankara, Merz said the long-range weapons would close an important strategic gap in Germany's defences while Europe develops its own systems. The move deepens Germany's rearmament amid the wars in Ukraine and the Gulf.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPQ184b0haNkh6NGFSaDg0NnFjVnZkWFdzV0ZxS3Vnb0JFa1ZEbDR4N1JROERaTXBrdGVfMUhXMEd5ZXIwMHFERURueWRrUWg3YXFYZUFUMVJYNEozWkZEZ3lMajRpRHlieGlTZXRHdFVOSUpObENXMGpra2MyZkY0SzJ0Q2FIeDJFRURvb2pmZ1R1cE1rd1U0NTRaYw?oc=5"
      },
      {
        "name": "Hurriyet Daily News",
        "href": "https://www.hurriyetdailynews.com/us-approves-sale-of-tomahawk-missiles-to-germany-merz-224188"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/germany-us-tomahawk-missiles.png",
      "alt": "A US Navy Tomahawk cruise missile lifting off from a warship in a bright burst of fire and smoke.",
      "credit": "U.S. Navy, public domain via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Themistocles persuades Athens to build a war fleet from the silver of Laurium",
        "excerpt": "he, and he alone, dared to come before the people with a motion that this division be given up, and that with these moneys triremes be constructed for the war against Aegina.",
        "source": "Plutarch, Life of Themistocles 4 (Bernadotte Perrin translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0066:chapter=4"
      },
      {
        "category": "historical",
        "title": "NATO's 1979 Dual-Track Decision and the Euromissiles on West German soil",
        "excerpt": "To 'close a strategic gap' opened by the Soviet SS-20, NATO resolved in December 1979 to station 572 American Pershing II and ground-launched cruise missiles across Western Europe, with the Pershing IIs planted on West German soil. The deployments split the country: peace movements filled the streets while governments insisted the weapons were the price of deterrence and a bargaining chip for arms control. It is the closest mirror to Merz's Tomahawk decision, foreign missiles hosted at home as both shield and lightning rod.",
        "source": "National Security Archive, 'The 30th Anniversary of NATO's Dual-Track Decision' (Electronic Briefing Book No. 301)",
        "href": "https://nsarchive2.gwu.edu/nukevault/ebb301/index.htm"
      },
      {
        "category": "literary",
        "title": "Hephaestus forges the arms and shield of Achilles (Iliad, Book 18)",
        "excerpt": "First fashioned he a shield, great and sturdy, adorning it cunningly in every part, and round about it set a bright rim, threefold and glittering, and therefrom made fast a silver baldric.",
        "source": "Homer, Iliad 18 (A. T. Murray translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18:card=468"
      },
      {
        "category": "literary",
        "title": "Longfellow, 'The Arsenal at Springfield'",
        "excerpt": "This is the Arsenal. From floor to ceiling, / Like a huge organ, rise the burnished arms; / But from their silent pipes no anthem pealing / Startles the villages with strange alarms.",
        "source": "Henry Wadsworth Longfellow, 'The Arsenal at Springfield'",
        "href": "https://en.wikisource.org/wiki/The_Arsenal_at_Springfield"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, 'Mars, the Bringer of War' from The Planets, Op. 32 (musical)",
        "excerpt": "Holst opens his planetary suite with a relentless five-beat ostinato hammered out col legno by the strings, a mechanized march that swells into brass fanfares and grinding dissonance. Written on the eve of the First World War, 'Mars' sounds less like a god than like an arms build-up itself, the pitiless momentum of mobilization and firepower. It is the aural counterpart to a nation stockpiling missiles for deterrence.",
        "source": "Gustav Holst, The Planets, Op. 32 (full score, London: Goodwin & Tabb, 1921), IMSLP",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez, 'Apollo in the Forge of Vulcan' (La Fragua de Vulcano), 1630 (visual artwork)",
        "excerpt": "In Velázquez's canvas, Apollo brings word of scandal to Vulcan's smithy just as the god and his sweating assistants beat out armor at the anvil, a half-forged breastplate glowing on the block. The forge is where weapons are made and where news of conflict arrives together, the workshop of war rendered as everyday labor. Its theme, the manufacture of arms as an answer to crisis, rhymes with a modern state acquiring missiles to close a 'strategic gap.'",
        "source": "Museo del Prado, Madrid; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/germany-us-tomahawk-missiles--art.png",
          "alt": "Baroque painting of Apollo, haloed in light, addressing a startled Vulcan and his muscular assistants at a fiery forge where armor is being hammered.",
          "credit": "Diego Velázquez, 'La Fragua de Vulcano' (1630), Museo del Prado, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "australia-india-uranium-deal",
    "headline": "Australia agrees to export uranium to India during Modi's visit to Canberra",
    "overview": "Australia and India signed an administrative arrangement on July 9, 2026 to allow exports of Australian uranium to India for civilian nuclear power, unlocking a trade long stalled by non-proliferation concerns. Prime Ministers Anthony Albanese and Narendra Modi, who called the countries the closest of friends, also agreed to deepen cooperation on renewables, critical minerals and green hydrogen. Australia holds about a third of the world's uranium reserves; India aims to lift its nuclear capacity to 100 gigawatts by 2047.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQcC1LTFhWNGpLbHFtRlZuSWp4bWFhS1dzVFdOSkRSSG5xMEVneW04eHNvd0REREZVVTVTQ2xTdERTUUJpVFROSWYyelljVXNkV0pGdUdEU0tuYkl4cjU4ZExFY3V0QTcxRmtMVWp5VWVSVFZmaXFSbW9KLTJZTm1NandTZEp0Vlh4ZjlyYTUtUHVUdFd4QVl3aGswNjlZVFJySW9XMGxvNUcyVHI2NWdVdkRWRUlLWF84U2I4?oc=5"
      },
      {
        "name": "The Canberra Times",
        "href": "https://www.canberratimes.com.au/story/9307396/closest-of-friends-pm-strikes-indian-uranium-deal/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/australia-india-uranium-deal.png",
      "alt": "An open-pit uranium mine cut into pale terraced earth under a wide evening sky.",
      "credit": "Public domain via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder condemns tearing metals from the earth (Natural History, Book 33, c. 77 AD)",
        "excerpt": "We trace out all the fibres of the earth, and live above the hollows we have made in her, marvelling that occasionally she gapes open or begins to tremble - as if forsooth it were not possible that this may be an expression of the indignation of our holy parent.",
        "source": "Pliny the Elder, Natural History, Book 33 (trans. H. Rackham)",
        "href": "https://www.attalus.org/translate/pliny_hn33a.html"
      },
      {
        "category": "historical",
        "title": "The first controlled nuclear chain reaction, Chicago, 2 December 1942",
        "excerpt": "Beneath the stands of a university squash court, Enrico Fermi's team stacked graphite and uranium into a pile and, by slowly withdrawing cadmium rods, coaxed matter into a self-sustaining chain reaction for the first time. A coded phrase relayed the news that the atomic age had begun, and a plain laboratory notebook captured the moment when the power locked in uranium became a controllable force. The same discovery that promised limitless energy would, within three years, be forged into the Trinity bomb.",
        "source": "U.S. National Archives, 'Manhattan Project Notebook (1942)'",
        "href": "https://www.archives.gov/milestone-documents/manhattan-project-notebook"
      },
      {
        "category": "literary",
        "title": "Prometheus, who stole fire for mortals, in Aeschylus's 'Prometheus Bound'",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, Prometheus Bound (trans. Theodore Alois Buckley)",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "literary",
        "title": "H. G. Wells foresees atomic energy in 'The World Set Free' (1914)",
        "excerpt": "We stand to-day towards radio-activity as our ancestor stood towards fire before he had learnt to make it.",
        "source": "H. G. Wells, The World Set Free (1914)",
        "href": "https://www.gutenberg.org/files/1059/1059-h/1059-h.htm"
      },
      {
        "category": "artistic",
        "title": "Scriabin, 'Prometheus: The Poem of Fire', Op. 60 (musical)",
        "excerpt": "Scriabin's 1910 tone poem stages the myth of stolen fire as pure sound and light, built on his shimmering 'mystic chord' and scored for orchestra, wordless chorus, piano, and a 'clavier a lumieres' meant to flood the hall with coloured light. The music strains upward toward a blazing, ecstatic climax, casting Prometheus's gift as the spark of creative and cosmic energy. It is a fitting emblem for humanity's endless fascination with harnessing the most potent forces of nature.",
        "source": "Alexander Scriabin, Prometheus: Le Poeme du Feu, Op. 60 (1910)",
        "href": "https://imslp.org/wiki/Prometheus,_Le_Po%C3%A8me_du_Feu,_Op.60_(Scriabin,_Aleksandr)"
      },
      {
        "category": "artistic",
        "title": "Heinrich Fuger, 'Prometheus Brings Fire to Mankind' (c. 1817) (visual artwork)",
        "excerpt": "Fuger paints the Titan descending among newly formed mortals, a torch of stolen fire blazing in his upraised hand as pale, half-awakened figures reach toward its light. The scene captures the exact instant a dangerous, transformative power passes from the heavens into human hands. Radiant promise and looming consequence are held together in a single luminous gesture.",
        "source": "Heinrich Friedrich Fuger, oil on canvas, c. 1817",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/australia-india-uranium-deal--art.png",
          "alt": "Prometheus, lit by the flame he holds aloft, brings the stolen fire down to a group of reclining, newly created human figures.",
          "credit": "Heinrich Fuger, 'Prometheus Brings Fire to Mankind' (c. 1817), public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "sudan-icc-war-crimes-probe",
    "headline": "International Criminal Court reports a breakthrough in its Sudan war-crimes investigation",
    "overview": "The International Criminal Court told the BBC on July 9, 2026 that it had made a significant breakthrough in its investigation into war crimes in Sudan's Darfur region, where fighting between the army and the paramilitary Rapid Support Forces has driven the world's largest displacement crisis. Prosecutors said they had gathered evidence of atrocities including mass killings and sexual violence. The disclosure came as a separate UN inquiry concluded that killings, rapes, abductions and starvation by the RSF amount to genocide.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c9928zr2m5xo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxQOGczMld5T3Q2WTlpTExXTWRfdWhEZ01qMnVmZXdEZURTNkc2TnBKdVhzbVVyNmhjX1dNdlNVSEpMNVZRRnRHR1h4bE8yTEJOMDNPN1d1M0ViYjFKY2pOR2Y5aTBkeG4zMy0wNDY5YWpkMWJBRE1tMDRWeDVZZXJDWVU3aUFNOE0yTGN2dDdmbzJRS01lRldmenVIanBtWWMyVFNSdzU5UTZlek9LM0FENWp6dXU1TGdISGkzaVdoYm1UNzhf?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/sudan-icc-war-crimes-probe.png",
      "alt": "The angular glass-and-steel headquarters of the International Criminal Court in The Hague.",
      "credit": "Wikimedia Commons (CC BY-SA)"
    },
    "edition": "Afternoon Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Melian Dialogue: power over justice in the Peloponnesian War",
        "excerpt": "But out of those things which we both of us do really think, let us go through with that which is feasible, both you and we knowing that in human disputation justice is then only agreed on when the necessity is equal; whereas they that have odds of power exact as much as they can, and the weak yield to such conditions as they can get.",
        "source": "Thucydides, History of the Peloponnesian War 5.89 (Hobbes translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0247:book=5:chapter=89"
      },
      {
        "category": "historical",
        "title": "Nuremberg: Robert H. Jackson's opening statement (1945)",
        "excerpt": "The privilege of opening the first trial in history for crimes against the peace of the world imposes a grave responsibility. That four great nations, flushed with victory and stung with injury stay the hand of vengeance and voluntarily submit their captive enemies to the judgment of the law is one of the most significant tributes that Power has ever paid to reason.",
        "source": "Robert H. Jackson, Opening Statement before the International Military Tribunal, Nuremberg, 21 November 1945, Yale Law School Avalon Project",
        "href": "https://avalon.law.yale.edu/imt/11-21-45.asp"
      },
      {
        "category": "literary",
        "title": "The sack of Troy in Virgil's Aeneid, Book II",
        "excerpt": "Thus Priam fell, and shar'd one common fate / With Troy in ashes, and his ruin'd state",
        "source": "Virgil, The Aeneid, Book II (Dryden translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Eumenides: the founding of the tribunal for bloodshed",
        "excerpt": "Hear now my ordinance, people of Attica, as you judge the first trial for bloodshed. In the future, even as now, this court of judges will always exist for the people of Aegeus.",
        "source": "Aeschylus, Eumenides, lines 681-684 (Smyth translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0006:card=681"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, Messa da Requiem — 'Dies irae' (musical)",
        "excerpt": "Verdi unleashes the 'Dies irae' as a shattering apocalypse of sound: hammering strokes, pounding bass drum, and terrified choral cries that make the ancient Day of Wrath sequence into a vision of mass death and reckoning. Amid the storm come pleading solo voices begging for mercy before judgment. It is grief and dread and the demand for justice rendered as pure music.",
        "source": "Giuseppe Verdi, Messa da Requiem, Sequence 'Dies irae' (1874), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya, The Third of May 1808 (visual artwork)",
        "excerpt": "A lantern throws harsh light on a white-shirted man who flings his arms wide before a faceless firing squad, the dead already crumpled at his feet and the next victims cowering in line. Goya strips war of glory and shows only the terror of unarmed civilians in the instant before execution. It has become the archetypal image of state violence against the defenseless.",
        "source": "Francisco de Goya, El Tres de Mayo de 1808 (The Third of May 1808), 1814, Museo del Prado; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/sudan-icc-war-crimes-probe--art.png",
          "alt": "Goya's painting of a firing squad executing civilians at night; a man in a white shirt kneels with arms raised before the soldiers' leveled rifles, the dead lying in blood at his feet.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "volkswagen-board-showdown-job-cuts",
    "headline": "Volkswagen board meets over a restructuring plan that could cut up to 100,000 jobs",
    "overview": "Volkswagen's supervisory board convened in Wolfsburg on July 9, 2026 to weigh what analysts call the most far-reaching overhaul in the carmaker's history, a plan by chief executive Oliver Blume that could eliminate up to 100,000 jobs worldwide by 2030 and put four German plants at risk. Labour leaders and the state of Lower Saxony, which together hold a blocking minority on the board, have vowed bitter resistance. Volkswagen is squeezed by Chinese competition, thinning margins and US tariffs.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxONzBzaFJXdW94QmxuRllSMTJEdmpCTUhmb3F0QzJLSEx4M2U1RWlGLUhPRG52TExjZVQtMmI5SEpPVURtTXlwSTBnajN3UVk2TEtQUVVLMmFueXhSVm5tN3BMMkFUcWt3b1BEY0tqZUNSenRBOVl3bWlMWDNGUVJQQmd5QlZPM2tPM3k3ZldrU0JIZU1ZUjFlNENJbXFxWE5FU0ZoNU9lMGxoTEt5YnJUQ19YTUZxQnFGN0N5WXJR?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/02/volkswagen-vw-job-cuts-germany-autos.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/volkswagen-board-showdown-job-cuts.png",
      "alt": "Car bodies moving down the Volkswagen assembly line inside the Wolfsburg plant.",
      "credit": "Wikimedia Commons (CC BY-SA)"
    },
    "edition": "Afternoon Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Lord Byron's maiden speech against the Frame Work Bill (1812)",
        "excerpt": "These machines were to them an advantage, inasmuch as they superseded the necessity of employing a number of workmen, who were left in consequence to starve.",
        "source": "George Gordon, Lord Byron, Speech on the Frame Work Bill, House of Lords, 27 February 1812 (Hansard)",
        "href": "https://api.parliament.uk/historic-hansard/lords/1812/feb/27/frame-work-bill"
      },
      {
        "category": "historical",
        "title": "Franklin D. Roosevelt's First Inaugural Address amid the Great Depression (1933)",
        "excerpt": "The withered leaves of industrial enterprise lie on every side; farmers find no markets for their produce; the savings of many years in thousands of families are gone. More important, a host of unemployed citizens face the grim problem of existence, and an equally great number toil with little return.",
        "source": "Franklin D. Roosevelt, First Inaugural Address, 4 March 1933 (Avalon Project, Yale Law School)",
        "href": "https://avalon.law.yale.edu/20th_century/froos1.asp"
      },
      {
        "category": "literary",
        "title": "Émile Zola, Germinal — the pit that devours its workers",
        "excerpt": "The shaft swallowed men by mouthfuls of twenty or thirty, and with so easy a gulp that it seemed to feel nothing go down.",
        "source": "Émile Zola, Germinal, trans. Havelock Ellis (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/56528/56528-h/56528-h.htm"
      },
      {
        "category": "literary",
        "title": "Charles Dickens, Hard Times — the smoke of Coketown",
        "excerpt": "It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Charles Dickens, Hard Times, Book I, Ch. V, \"The Key-note\" (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold — the anvils of Nibelheim (musical)",
        "excerpt": "In the third scene Wagner takes us down to Nibelheim, the subterranean forge where Alberich has enslaved the whole race of dwarf-smiths to hammer gold without rest. Eighteen tuned anvils clang out of the orchestra in relentless rhythm as the workers toil in the dark for a master they cannot escape — the sound of labour turned into machinery, and of a people worked to obsolescence beneath the earth.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (full score, public domain, IMSLP)",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Adolph Menzel, The Iron Rolling Mill (Modern Cyclopes), 1875 (visual artwork)",
        "excerpt": "Menzel plunges the viewer into the glare and grime of a Prussian iron works, where half-lit men strain around a white-hot ingot as it is wrestled through the rollers. It is one of the first great paintings to treat the modern factory as its true subject — heroic, deafening, and pitiless, the human body dwarfed and consumed by the machine it serves.",
        "source": "Adolph von Menzel, Das Eisenwalzwerk (The Iron Rolling Mill / Modern Cyclopes), oil on canvas, 1875, Alte Nationalgalerie, Berlin (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/volkswagen-board-showdown-job-cuts--art.png",
          "alt": "Workers straining around a glowing white-hot iron bar in a dark, smoke-filled rolling mill",
          "credit": "Adolph von Menzel, Das Eisenwalzwerk (1875), Alte Nationalgalerie, Berlin; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "china-producer-inflation-4-year-high",
    "headline": "China's factory-gate inflation climbs to a four-year high as consumer prices cool",
    "overview": "China's producer price index rose 4.1% year-on-year in June 2026, the fastest pace since July 2022 and a fourth straight monthly gain, official data showed on July 9, driven by higher prices for coal, electrical machinery and electronics and by demand for AI computing power. Consumer inflation, by contrast, weakened, underscoring soft household demand. Manufacturers reliant on the domestic market said they were struggling to pass higher input costs on to consumers.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxOVXlSd3B5NXFvLXNjdGMtLUxER0FBSUNJQ1dNMEV2eUxHMkF1OXd6aDVuQkx0eUxQNXJQQ2hmMmpJN3NLZy1FTmd0LXUweXdMMlFrVnFONEhKM3dhd1FFaE1VUHp2YnpGWlhpb1FsMVQwRWNnM1pRblRBclNpUnhyZU5iTjhDdDFQcGlWcVRIbEZseENTd0stbzcwTHFLd0c5SXltbnpSWlRxZW8?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/09/china-cpi-ppi-june-inflation-iran-war-.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/china-producer-inflation-4-year-high.png",
      "alt": "A blast furnace flares orange against the night sky at a heavy-industry steelworks.",
      "credit": "Wikimedia Commons (CC BY)"
    },
    "edition": "Afternoon Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Diocletian's Edict on Maximum Prices (301 AD)",
        "excerpt": "...the raging and boundless avarice is inflamed, an avarice which, without regard for the human race, not yearly or monthly or daily only, but almost every hour and even every moment, hastens toward its own development and increase...",
        "source": "The Edict of Diocletian Fixing Maximum Prices, English translation (Internet Archive)",
        "href": "https://archive.org/stream/jstor-3314009/3314009_djvu.txt"
      },
      {
        "category": "historical",
        "title": "Marco Polo on Kublai Khan's Paper Money (c. 1298)",
        "excerpt": "And the Kaan causes every year to be made such a vast quantity of this money, which costs him nothing, that it must equal in amount all the treasure in the world.",
        "source": "The Travels of Marco Polo, Vol. 1 (Yule-Cordier translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/10636/10636-h/10636-h.htm"
      },
      {
        "category": "literary",
        "title": "Geoffrey Chaucer, 'The Pardoner's Tale' (c. 1390s)",
        "excerpt": "My theme is alwey oon, and ever was— \"Radix malorum est Cupiditas.\"",
        "source": "Chaucer's Works, Vol. 4: The Canterbury Tales (Skeat edition), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/22120/22120-h/22120-h.htm"
      },
      {
        "category": "literary",
        "title": "Christina Rossetti, 'Goblin Market' (1862)",
        "excerpt": "Maids heard the goblins cry: \"Come buy our orchard fruits, Come buy, come buy: Apples and quinces, Lemons and oranges, Plump unpecked cherries, Melons and raspberries...\"",
        "source": "Goblin Market and Other Poems, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/19188/19188-h/19188-h.htm"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, 'Das Rheingold' (1869) (musical)",
        "excerpt": "The music opens in the murky depths of the Rhine, where a hoard of gold glimmers untouched until greed enters the world. To seize the metal and forge it into a ring of limitless power, the dwarf Alberich must forswear love itself. Wagner turns the pursuit of wealth into a curse, sounding the ancient bargain that trades human warmth for cold, accumulating treasure.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A — full score, IMSLP",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Quentin Massys, 'The Moneylender and His Wife' (1514) (visual artwork)",
        "excerpt": "A moneylender bends over his balance, weighing gold coins and pearls with fixed concentration, while his wife's attention drifts from her prayer book to the glinting metal. A small convex mirror on the table reflects a window and a distant figure, quietly moralizing on worldly value. The painting captures the exact moment when the measure of money eclipses every other measure of worth.",
        "source": "Quentin Massys, oil on panel, Louvre, Paris — via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/china-producer-inflation-4-year-high--art.png",
          "alt": "A 16th-century Flemish painting of a moneylender weighing gold coins on a balance while his wife beside him turns from her prayer book to watch.",
          "credit": "Quentin Massys, The Moneylender and His Wife (1514), Louvre, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "fed-minutes-inflation-divide",
    "headline": "Fed minutes show policymakers deeply divided over the path of US inflation",
    "overview": "Minutes of the Federal Reserve's June meeting, released July 8, 2026, revealed officials sharply split over how inflation will evolve, with concerns growing that tariffs and a fresh surge in oil prices tied to the Gulf conflict could keep price pressures elevated. The divisions cloud the outlook for interest-rate cuts and unsettled markets already rattled by war and rising energy costs.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQMHk1X2dxdlJMSVBaYnZuTnJBSGFfYjktN2ZSa2N3VkZVUDd6dU9LZl9QOU9BMko5MDltYkh6ZDhKMlJpZGt0R0k5SXN0Rjd4WUhTZFdqaUk0UG0tVFZBLW1xZjMzTkhEOFZxVEk0RVFpajhjMTloWVZZeXhsYVdRM2pRV2Q4b1JNTTdGUXNZRnFZTGhJdVE?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNQ0RTaXNnWWRiR3R0S2lvUlNhQVBYcktaZ00wQmxEc25PZldQUkpJdEpUWGlncExsWGR6M2pISWNYQWpxYUtvMDJFaHlrVVZOMHA3Z3cyd1ZWR2RMVjczczZIeGNucll2d3ByUDJqeElKZ3hkUGw2cUdDUXAxSmFrdktTbkJtYVJ2bWpyR1ZoTUM3TlNTM3pyYjhqeGxqYlNGU1ZXRDI2SzU1TlZn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/fed-minutes-inflation-divide.png",
      "alt": "The neoclassical marble facade of the Marriner S. Eccles Federal Reserve building in Washington.",
      "credit": "Wikimedia Commons (CC BY-SA)"
    },
    "edition": "Afternoon Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Caesar and Cato divide the Roman Senate over the conspirators' fate (63 BC)",
        "excerpt": "It becomes all men, Conscript Fathers, who deliberate on dubious matters, to be influenced neither by hatred, affection, anger, nor pity.",
        "source": "Sallust, The Conspiracy of Catiline, trans. John Selby Watson",
        "href": "https://www.gutenberg.org/cache/epub/7990/pg7990.txt"
      },
      {
        "category": "historical",
        "title": "Washington's cabinet split over a national bank: Jefferson dissents (1791)",
        "excerpt": "I consider the foundation of the Constitution as laid on this ground: That 'all powers not delegated to the United States, by the Constitution, nor prohibited by it to the States, are reserved to the States or to the people.'",
        "source": "Thomas Jefferson, Opinion on the Constitutionality of a National Bank (1791)",
        "href": "https://avalon.law.yale.edu/18th_century/bank-tj.asp"
      },
      {
        "category": "literary",
        "title": "The great consult in Pandemonium: fallen angels debate their course",
        "excerpt": "My sentence is for open war. Of wiles, / More unexpert, I boast not: them let those / Contrive who need, or when they need; not now.",
        "source": "John Milton, Paradise Lost, Book II",
        "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt"
      },
      {
        "category": "literary",
        "title": "The witches' prophecy on the heath: reading an uncertain future",
        "excerpt": "If you can look into the seeds of time, / And say which grain will grow, and which will not, / Speak then to me, who neither beg nor fear / Your favours nor your hate.",
        "source": "William Shakespeare, Macbeth, Act I, Scene 3",
        "href": "https://www.gutenberg.org/cache/epub/1533/pg1533.txt"
      },
      {
        "category": "artistic",
        "title": "Handel, Belshazzar, HWV 61 (1744) — the diviners fail and the writing on the wall is read (musical)",
        "excerpt": "Handel's oratorio stages a court that cannot read its own omens: the king's astrologers and soothsayers are summoned to interpret the hand that writes upon the wall, and all of them fail. Only the prophet Daniel deciphers the verdict, that the kingdom has been weighed in the balance and found wanting. The chorus and orchestra turn a feast into a reckoning, a warning about hubris measured against an uncertain future.",
        "source": "George Frideric Handel, Belshazzar, HWV 61, libretto by Charles Jennens",
        "href": "https://imslp.org/wiki/Belshazzar,_HWV_61_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Cesare Maccari, Cicero Denounces Catiline in the Roman Senate (1889) (visual artwork)",
        "excerpt": "Maccari's fresco freezes the moment of a divided council: Cicero stands, arm outstretched in accusation, while the senators of Rome recoil, murmur, or sit in isolated judgment. The lone, shunned figure of Catiline on the empty benches embodies a chamber split against itself, deliberating in the shadow of crisis.",
        "source": "Cesare Maccari, Cicero Denounces Catiline in the Roman Senate, Palazzo Madama, Rome",
        "href": "https://commons.wikimedia.org/wiki/File:Cicero_Denounces_Catiline_in_the_Roman_Senate_by_Cesare_Maccari_-_3.jpg",
        "image": {
          "src": "/covers/fed-minutes-inflation-divide--art.png",
          "alt": "Fresco of Cicero standing and denouncing Catiline before the seated senators of the Roman Senate, with Catiline sitting alone and shunned",
          "credit": "Cesare Maccari, 1889, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "bonnie-tyler-dies-75",
    "headline": "Bonnie Tyler, Welsh singer of 'Total Eclipse of the Heart,' dies at 75",
    "overview": "Bonnie Tyler, the husky-voiced Welsh singer whose 1983 power ballad Total Eclipse of the Heart topped charts around the world, has died at 75, her representatives said on July 9, 2026. Born Gaynor Hopkins in Skewen, Wales, she rose from working men's clubs to global stardom with hits including It's a Heartache and Holding Out for a Hero. Tributes described a distinctive rasp, the result of vocal-cord surgery, that made her one of pop's most recognisable voices.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQSTQ5VzJpdkt1RXpVOTE2VmpRWUREUmpxTGxoeDNvOEQ5ekRnM0dkVDZ2alctTlJLYUk0MlZHSmFaYy0xMXQtb25XcDNXbXc3RWx6YTZfRUlfaVA4WHFoOGNRY0ZDc0Z4VXd1TzNjNWhMMW9wWF9Gdk0yNXRKbFlvSmlNV0hUTTdWN19DcnBCZkxKRnZrNnp5TnVrZ0NUR0xDaU53LXlR?oc=5"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMijAFBVV95cUxQbnlyOGxWdV9wbzRlOVhwUm54VHBzdVliTlNWVExNWEdydlRsYnU5Q0w3SXlwd1FHTS1Qa2NSYjRpMUEzTG1qZnE5T1pMdzFRLXFCaXdhYWMySGNubkU0bkY3aTZtbWZZY3l0WTlVampKVEZZUTJVTjZsWmVla1BhdTFoZC14UWJuSHYwOA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/bonnie-tyler-dies-75.png",
      "alt": "The Welsh singer Bonnie Tyler, photographed speaking at a press conference.",
      "credit": "Wikimedia Commons (CC BY-SA)"
    },
    "edition": "Afternoon Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The eclipse that turned day into night and stopped a war (585 BC)",
        "excerpt": "in the sixth year a battle took place in which it happened, when the fight had begun, that suddenly the day became night.",
        "source": "Herodotus, The History, Book I.74 (G. C. Macaulay translation)",
        "href": "https://www.gutenberg.org/files/2707/2707-h/2707-h.htm"
      },
      {
        "category": "historical",
        "title": "Caedmon, the humble herdsman granted a miraculous voice (c. 680)",
        "excerpt": "That there was in her monastery a brother, on whom the gift of song was bestowed by Heaven.",
        "source": "Bede, Ecclesiastical History of England, Book IV, Chapter XXIV",
        "href": "https://www.gutenberg.org/files/38326/38326-h/38326-h.html"
      },
      {
        "category": "literary",
        "title": "Keats hails the deathless, immortal voice in 'Ode to a Nightingale'",
        "excerpt": "Thou wast not born for death, immortal Bird! / No hungry generations tread thee down; / The voice I hear this passing night was heard / In ancient days by emperor and clown:",
        "source": "John Keats, 'Ode to a Nightingale' (Poems, 1820)",
        "href": "https://en.wikisource.org/wiki/Keats;_poems_published_in_1820/Ode_to_a_Nightingale"
      },
      {
        "category": "literary",
        "title": "Gray's 'The Bard' — the last Welsh poet defies a conquering king",
        "excerpt": "'Ruin seize thee, ruthless King! / Confusion on thy banners wait, / Tho' fanned by Conquest's crimson wing / They mock the air with idle state.",
        "source": "Thomas Gray, 'The Bard. A Pindaric Ode' (1757)",
        "href": "https://en.wikisource.org/wiki/The_Bard"
      },
      {
        "category": "artistic",
        "title": "Gluck, 'Che farò senza Euridice' from Orfeo ed Euridice (1762) (musical)",
        "excerpt": "In the opera's final act, Orpheus—the singer who could move stones with his music—loses Eurydice a second time and cries out \"Che farò senza Euridice?\" (\"What shall I do without Eurydice?\"). Gluck pours the anguish of loss into a melody of almost unbearable, serene beauty, the greatest voice in myth left singing over an empty silence.",
        "source": "Christoph Willibald Gluck, Orfeo ed Euridice, Wq.30 (1762)",
        "href": "https://imslp.org/wiki/Orfeo_ed_Euridice_(Gluck,_Christoph_Willibald)"
      },
      {
        "category": "artistic",
        "title": "Gustave Moreau, 'Orphée' (1865) (visual artwork)",
        "excerpt": "A young Thracian girl gazes down at the severed head of Orpheus, cradled upon his own lyre after the poet-singer was torn apart. The mouth is stilled, yet the face is strangely serene, as if the music had outlived the man. Moreau turns the death of myth's greatest singer into a hushed meditation on a voice that death could not wholly silence.",
        "source": "Gustave Moreau, Orphée (1865), Musée d'Orsay",
        "href": "https://commons.wikimedia.org/wiki/File:Gustave_Moreau_-_Orpheus_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/bonnie-tyler-dies-75--art.png",
          "alt": "A young Thracian woman in profile holds the severed head of Orpheus resting on his lyre, in a rocky mountain landscape.",
          "credit": "Gustave Moreau, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "messi-argentina-egypt-world-cup",
    "headline": "Messi leads Argentina to a 3-2 comeback over Egypt to reach the World Cup quarter-finals",
    "overview": "Lionel Messi inspired Argentina to a 3-2 comeback victory over Egypt on July 8, 2026, overturning a two-goal deficit to reach the World Cup quarter-finals. Egypt, who had led 2-0 and were bidding to reach the last eight for the first time, were left furious with the officiating and criticised the use of VAR. Argentina next face one of six European sides still alive in the tournament.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxPV1dfb1lPMEtRajZmSzgtUEFmZUswNGVyeklkTXFZRGdLc3ZTelBpcDBCbURkdFpfcXpBR3d3TGFEU1NMaHpTSU4wbWJvRFhvVVZ1TEFLS1RtNjg1M1duYnJidTRZaV91MHpVanFWeDBTZXdwbXBRRl9pVHhxQ3pkUnJnTUsybFF2VXowWHFHbmhKaVJ5TkE?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPdWtlUkJfU1M5V3pOS0djYjBQeVBjbmxtbG9QQjBDWThPU3A5akZNeEd5dGNJQmlwdEt4TzlLM2dNUzRhQVYzbzM1c3RMcDE5RXBjWnNFcHRhajBxLVlsZ3ZpZTg5YmFscUNTT21aRWpoM1pRWWI0Z3Q5bUFfeVBsTXRzNE5JeGRjMm5WQklCd3BJUkNMZ1dvOXFaaVNhUDZITXAzZUh3M1FLaEdtbGpoMUlCUkZBM1lHWWc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/messi-argentina-egypt-world-cup.png",
      "alt": "Lionel Messi in Argentina's blue-and-white stripes striking the ball during a World Cup match.",
      "credit": "Wikimedia Commons (CC BY-SA)"
    },
    "edition": "Afternoon Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nero's disputed chariot victory at the Olympic Games (c. AD 67)",
        "excerpt": "But after he had been thrown from the car and put back in it, he was unable to hold out and gave up before the end of the course; but he received the crown just the same.",
        "source": "Suetonius, The Lives of the Caesars, \"Nero\" 24 (trans. J. C. Rolfe, Loeb, 1914)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Nero*.html"
      },
      {
        "category": "historical",
        "title": "Dorando Pietri and the contested finish of the 1908 Olympic marathon",
        "excerpt": "On 24 July 1908 the Italian Dorando Pietri staggered into the London stadium first, collapsing again and again before 100,000 spectators as umpires hauled him upright and steered him across the line. His triumph was overturned on an American protest for illegal assistance, handing the gold to Johnny Hayes. Queen Alexandra, moved by his ordeal, later presented him a special gilded cup for a glory the officials had denied.",
        "source": "\"Dorando Pietri,\" Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Dorando_Pietri"
      },
      {
        "category": "literary",
        "title": "The chariot race and the quarrel of the judges, Homer's Iliad, Book XXIII",
        "excerpt": "Cease your railing Ajax and Idomeneus; it is not you would be scandalised if you saw any one else do the like: sit down and keep your eyes on the horses",
        "source": "Homer, The Iliad, Book XXIII (trans. Samuel Butler)",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XXIII"
      },
      {
        "category": "literary",
        "title": "The foot-race foul and Salius's protest, Virgil's Aeneid, Book V",
        "excerpt": "But Salius enters; and, exclaiming loud / For Justice, deafens, and disturbs the Crowd:",
        "source": "Virgil, The Aeneid, Book V (trans. John Dryden)",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_V"
      },
      {
        "category": "artistic",
        "title": "Triumphal March from Aida (Giuseppe Verdi, 1871) (musical)",
        "excerpt": "Verdi's blazing brass fanfare heralds the conquering hero's return to a roaring arena, trumpets ringing out over the massed crowd. Its swelling procession turns raw athletic victory into public spectacle and glory. The march has become the very sound of triumph paraded before a stadium of onlookers.",
        "source": "Giuseppe Verdi, Aida, Act II \"Triumphal March\" (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Aida_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "The Chariot Race by Alexander von Wagner (c. 1882) (visual artwork)",
        "excerpt": "Wagner captures the shattering climax of a race in the Roman circus: straining horses at full gallop, a driver hurled toward the sand, and tiers of spectators surging to their feet in the roaring arena. It freezes the exact instant when athletic glory and disaster hang on a single stride before a delirious crowd.",
        "source": "Alexander von Wagner, The Chariot Race, Manchester Art Gallery",
        "href": "https://commons.wikimedia.org/wiki/File:Alexander_von_Wagner_(1838-1919)_-_The_Chariot_Race_-_1898.12_-_Manchester_Art_Gallery.jpg",
        "image": {
          "src": "/covers/messi-argentina-egypt-world-cup--art.png",
          "alt": "Painting of a dramatic ancient Roman chariot race in the circus, galloping horses and a driver thrown to the ground as crowds watch from the stands",
          "credit": "Alexander von Wagner (1838-1919), The Chariot Race, Manchester Art Gallery, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "bumblebees-emotions-study",
    "headline": "Slow-motion study of bumblebees' facial movements revives the question of whether insects have feelings",
    "overview": "Researchers using slow-motion video have found that bumblebees make distinct mouth and facial movements, extending their tongues after tasting sugar and shaking their heads and wiping their mouths after bitter or salty tastes, that resemble liking and disliking reactions once thought unique to mammals. The study of 18 bumblebee colonies, led by Fei Peng and Cwyn Solvi of Southern Medical University in Guangzhou and reported on July 9, 2026, adds to a long debate over insect sentience. Critics caution that facial expressions alone do not prove conscious emotion.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/videos/cpq309jrve4o"
      },
      {
        "name": "Phys.org",
        "href": "https://phys.org/news/2026-07-bees-reveal-emotion-reactions-lip.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/bumblebees-emotions-study.png",
      "alt": "An extreme close-up of a bumblebee, its furry striped body and wings sharply detailed.",
      "credit": "Wikimedia Commons (CC BY-SA)"
    },
    "edition": "Afternoon Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Aristotle observes the industry of bees in The History of Animals (4th century BC)",
        "excerpt": "Of all insects, one may also say of all living creatures, the most industrious are the ant, the bee, the hornet, the wasp",
        "source": "Aristotle, The History of Animals, Book IX (trans. D'Arcy Wentworth Thompson), Internet Classics Archive",
        "href": "https://classics.mit.edu/Aristotle/history_anim.9.ix.html"
      },
      {
        "category": "historical",
        "title": "Charles Darwin, The Expression of the Emotions in Man and Animals (1872)",
        "excerpt": "The community of certain expressions in distinct though allied species, as in the movements of the same facial muscles during laughter by man and by various monkeys, is rendered somewhat more intelligible, if we believe in their descent from a common progenitor.",
        "source": "Charles Darwin, The Expression of the Emotions in Man and Animals, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1227/1227-h/1227-h.htm"
      },
      {
        "category": "literary",
        "title": "Virgil, Georgics, Book IV, on the tiny commonwealth of the bees (trans. John Dryden)",
        "excerpt": "A mighty Pomp, tho' made of little Things. … Of all the Race of Animals, alone / The Bees have common Cities of their own",
        "source": "Virgil, Georgics, Book IV, translated by John Dryden, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Georgics_(Dryden)/Book_4"
      },
      {
        "category": "literary",
        "title": "Emily Dickinson, \"To make a prairie it takes a clover and one bee\"",
        "excerpt": "To make a prairie it takes a clover and one bee, — / One clover, and a bee, / And revery. / The revery alone will do / If bees are few.",
        "source": "Emily Dickinson, Poems, Third Series (1896), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/12241/pg12241.html"
      },
      {
        "category": "artistic",
        "title": "Nikolai Rimsky-Korsakov, \"Flight of the Bumblebee\" from The Tale of Tsar Saltan (1900) (musical)",
        "excerpt": "An orchestral interlude that becomes an unbroken blur of chromatic sixteenth notes, mimicking the frantic, weaving flight of a single insect. In a few restless bars the whole orchestra is bent to portray the inner drive of one small creature. It remains the most famous piece of music ever devoted to the busyness of a bee.",
        "source": "Nikolai Rimsky-Korsakov, The Tale of Tsar Saltan (opera), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Tale_of_Tsar_Saltan_(opera)_(Rimsky-Korsakov,_Nikolay)"
      },
      {
        "category": "artistic",
        "title": "Maria Sibylla Merian, plate from Metamorphosis Insectorum Surinamensium (1705) (visual artwork)",
        "excerpt": "A naturalist's hand-coloured engraving that lavishes reverent detail on butterflies, a caterpillar, a chrysalis and a small bee gathered on one flowering branch. Merian treated the smallest creatures as worthy of the most patient attention, tracing each stage of their hidden lives. The plate embodies the wonder that the inner world of tiny insects can inspire.",
        "source": "Maria Sibylla Merian, Metamorphosis Insectorum Surinamensium, Plate LX (1705), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Merian_Metamorphosis_LX.jpg",
        "image": {
          "src": "/covers/bumblebees-emotions-study--art.png",
          "alt": "Hand-coloured engraving of a large blue morpho butterfly, an owl butterfly, a red caterpillar, a chrysalis and a small bee on a branch with red flowers.",
          "credit": "Maria Sibylla Merian (1647-1717), Metamorphosis Insectorum Surinamensium, Plate LX, 1705, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "openai-gpt-live-launch",
    "headline": "OpenAI launches GPT-Live, a real-time voice model that listens and speaks at once",
    "overview": "OpenAI released GPT-Live on July 8, 2026, a family of full-duplex voice models for ChatGPT that can listen and talk simultaneously, interjecting with mhmm or staying quiet, and handing off to a frontier reasoning model for search and complex tasks before returning an answer. GPT-Live-1 becomes the default voice for paying users and a mini version for free users across iOS, Android and the web, replacing OpenAI's earlier Advanced Voice Mode. The company said API access would follow.",
    "genre": "Technology",
    "sources": [
      {
        "name": "OpenAI",
        "href": "https://openai.com/index/introducing-gpt-live/"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/08/openai-to-publicly-release-gpt-5point6-ai-model-release-ending-government-limits.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/openai-gpt-live-launch.png",
      "alt": "Glowing concentric sound waves rippling outward through darkness, suggesting a voice speaking",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hero of Alexandria's automata (1st century AD)",
        "excerpt": "In Roman Alexandria the engineer Hero built self-moving wonders: temple doors that swung open on their own, statues that poured wine and milk, and a fully mechanical theater ten minutes long, driven by ropes, weights, and a rotating cogwheel, complete with mechanical thunder. His devices were the ancient dream of matter made to imitate life and to perform on command, the distant ancestor of every machine engineered to seem animate.",
        "source": "Hero of Alexandria — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Hero_of_Alexandria"
      },
      {
        "category": "historical",
        "title": "Wolfgang von Kempelen's speaking machine (Vienna, 1791)",
        "excerpt": "For two decades von Kempelen labored to build a machine that could talk, giving it bellows for lungs, a reed for a glottis, and an india-rubber mouth he shaped by hand. It articulated vowels and consonants and could utter whole phrases in French, Italian, and English, the first apparatus to make a mechanism speak in words rather than mere noise. His 1791 treatise on the mechanism of human speech laid out the anatomy of an artificial voice.",
        "source": "Wolfgang von Kempelen's speaking machine — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Wolfgang_von_Kempelen's_speaking_machine"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book X — Pygmalion and the ivory statue",
        "excerpt": "Soft, and more soft at ev'ry touch it grew; / Like pliant wax, when chasing hands reduce ... Presses the pulse, and feels the leaping vein.",
        "source": "Ovid, Metamorphoses, Book X (Garth/Dryden translation, Internet Classics Archive)",
        "href": "https://classics.mit.edu/Ovid/metam.10.tenth.html"
      },
      {
        "category": "literary",
        "title": "Robert Greene, Friar Bacon and Friar Bungay (c. 1590) — the Brazen Head",
        "excerpt": "Friar Bacon's brass head, animated to speak oracles, breaks its long silence with just three utterances while his servant dozes: \"Time is. ... Time was. ... Time is past.\" Then a hand with a hammer descends and shatters it. The talking machine finally speaks, and its keeper misses the moment it had all been built for.",
        "source": "Robert Greene, The Honorable History of Friar Bacon and Friar Bungay (Luminarium / Renascence Editions)",
        "href": "https://www.luminarium.org/renascence-editions/greene2.html"
      },
      {
        "category": "artistic",
        "title": "Jacques Offenbach, Les contes d'Hoffmann (1881) — Olympia's Doll Song (musical)",
        "excerpt": "In Offenbach's final opera the poet Hoffmann falls in love with Olympia, a clockwork automaton, who dazzles a salon with the coloratura aria \"Les oiseaux dans la charmille.\" Her song sputters and winds down whenever her mechanism runs out, and a servant must crank her back to life mid-phrase, a singing machine mistaken for a living woman until she is torn apart before his eyes.",
        "source": "Les contes d'Hoffmann (Offenbach, Jacques) — IMSLP",
        "href": "https://imslp.org/wiki/Les_contes_d'Hoffmann_(Offenbach,_Jacques)"
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme, Pygmalion and Galatea, ca. 1890 (visual artwork)",
        "excerpt": "Gérôme paints the exact threshold of animation: the ivory Galatea, still pale marble from the thighs down, twists and flushes into warm living flesh above as she bends to return the sculptor's kiss. Cupid aims his arrow, a discarded mask and tools lie below, and the artist's own creation turns to embrace him, the made thing waking into a partner.",
        "source": "Jean-Léon Gérôme, Pygmalion and Galatea, ca. 1890, Metropolitan Museum of Art — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me,_Pygmalion_and_Galatea,_ca._1890.jpg",
        "image": {
          "src": "/covers/openai-gpt-live-launch--art.png",
          "alt": "Painting of the sculptor Pygmalion embracing and kissing his statue Galatea as her upper body turns from pale ivory into living flesh, while a winged Cupid aims an arrow.",
          "credit": "Jean-Léon Gérôme, Pygmalion and Galatea, ca. 1890, Metropolitan Museum of Art, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "kpmb-yale-drama-school",
    "headline": "KPMB unveils designs for Yale's new David Geffen School of Drama building",
    "overview": "The Toronto firm KPMB Architects released renderings on July 8, 2026 for a 207,000-square-foot dramatic-arts building at Yale University, the first consolidated home for the David Geffen School of Drama and the Yale Repertory Theater. The seven-storey design centres on a bright red steel circulation spine called Theater Street, wraps a limestone facade rhythmically punched with windows, and adds reconfigurable 400-seat and 100-seat theatres. Construction is due to start this summer and finish in 2029.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/08/kpmb-david-geffen-school-of-drama-building-yale-university-renders/"
      },
      {
        "name": "KPMB",
        "href": "https://www.kpmb.com/project/dramatic-arts-building-yale-university/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/kpmb-yale-drama-school.png",
      "alt": "A modern limestone-clad performing-arts building with a bright red steel staircase visible through tall glazing",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Vitruvius on choosing the site for a theatre (De architectura, Book V)",
        "excerpt": "When the forum is placed, a spot as healthy as possible is to be chosen for the theatre, for the exhibition of games on the festival days of the immortal gods, according to the instructions given in the first book respecting the healthy disposition of the walls of a city.",
        "source": "Vitruvius, The Ten Books on Architecture, Book V (trans. Joseph Gwilt), via LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Vitruvius/5*.html"
      },
      {
        "category": "historical",
        "title": "The building of the Globe Theatre on Bankside (1599)",
        "excerpt": "In the winter of 1598 the Lord Chamberlain's Men had the carpenter Peter Street dismantle their old playhouse, The Theatre, and carry its timbers across the Thames to raise a new polygonal, open-air house at Southwark. Financed by actor-shareholders including Shakespeare and the Burbage brothers, the roughly 100-foot ring enclosed a bare thrust stage and a yard for some three thousand spectators. It opened in 1599, possibly with Henry V, and became the home of Shakespeare's greatest plays, a house purpose-built for performance.",
        "source": "Globe Theatre, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Globe_Theatre"
      },
      {
        "category": "literary",
        "title": "Shakespeare, As You Like It, II.vii - 'All the world's a stage'",
        "excerpt": "All the world's a stage,\nAnd all the men and women merely players;\nThey have their exits and their entrances,\nAnd one man in his time plays many parts,\nHis acts being seven ages.",
        "source": "William Shakespeare, As You Like It, Act II, Scene VII (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1523/1523-h/1523-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Henry V, Prologue - 'this Woodden O'",
        "excerpt": "Can this Cock-Pit hold\nThe vastie fields of France? Or may we cramme\nWithin this Woodden O, the very Caskes\nThat did affright the Ayre at Agincourt?",
        "source": "William Shakespeare, The Life of Henry the Fifth, Prologue (First Folio text, Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2253/pg2253.txt"
      },
      {
        "category": "artistic",
        "title": "Mendelssohn, Overture to A Midsummer Night's Dream, Op. 21 (musical)",
        "excerpt": "Composed by a seventeen-year-old in 1826, this concert overture conjures an entire theatrical world from four hushed woodwind chords before the strings scurry into a fairy scherzo. Braying donkey figures, courtly fanfares and lovers' melodies interweave, translating Shakespeare's play into pure orchestral architecture. It is a house of drama built in sound, later folded into Mendelssohn's full incidental music for the stage.",
        "source": "Felix Mendelssohn, A Midsummer Night's Dream, overture, Op. 21 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/A_Midsummer_Night's_Dream,_overture,_Op.21_(Mendelssohn,_Felix)"
      },
      {
        "category": "artistic",
        "title": "Johannes de Witt, Sketch of the Swan Theatre, London (1596) (visual artwork)",
        "excerpt": "This pen-and-ink sketch is the only surviving contemporary image of the interior of an Elizabethan public playhouse. It shows the round tiers of galleries, a raised stage thrust on two great posts beneath a painted canopy, and actors performing before a standing crowd - the theatre itself rendered as a designed machine for drama. Copied by Aernout van Buchel from a lost original by the Dutch visitor Johannes de Witt, it remains architecture's clearest window onto Shakespeare's stage.",
        "source": "Aernout van Buchel after Johannes de Witt, sketch of the Swan Theatre, 1596; Utrecht University Library MS 842, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Swan-theatre-johannes-de-witt-ms-842-f132r-1596.jpg",
        "image": {
          "src": "/covers/kpmb-yale-drama-school--art.png",
          "alt": "Pen sketch of the interior of the Swan Theatre showing round galleries, a raised stage on two posts under a canopy, and a performance in progress.",
          "credit": "Aernout van Buchel after Johannes de Witt, 1596, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "lego-world-cup-trophy-build",
    "headline": "Lego unveils a 27-foot World Cup trophy built from 1.36 million bricks in New York",
    "overview": "The Lego Group unveiled a giant replica of the FIFA World Cup trophy, standing 8.47 metres (27 feet) tall and assembled from more than 1.36 million bricks, at Rockefeller Plaza in New York on July 9, 2026 ahead of the tournament's final. Billed as the largest mobile Lego build ever, it took 59 builders about 7,040 hours and is held up by an internal steel frame weighing some 3.5 tonnes. Former Brazil captain Cafu helped reveal it as the Lego Fan Zone opened to the public.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/09/lego-giant-world-cup-trophy/"
      },
      {
        "name": "LEGO",
        "href": "https://www.lego.com/en-us/aboutus/news/2026/july/the-lego-group-unveils-huge-fifa-world-cup-trophy-with-cafu"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-09",
    "image": {
      "src": "/covers/lego-world-cup-trophy-build.png",
      "alt": "A towering golden trophy sculpture built entirely from plastic construction bricks in a city plaza",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 9 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Colossus of Rhodes, a giant of the ancient world",
        "excerpt": "Few people can make their arms meet round the thumb of the figure, and the fingers are larger than most statues; and where the limbs have been broken off enormous cavities yawn, while inside are seen great masses of rock with the weight of which the artist steadied it when he erected it.",
        "source": "Pliny the Elder, Natural History, Book 34",
        "href": "https://www.attalus.org/pliny/hn34a.html"
      },
      {
        "category": "historical",
        "title": "Raising the Statue of Liberty, limb by limb",
        "excerpt": "For more than a decade, over sixty craftsmen in a Paris workshop hammered thin copper sheets over wooden molds, raising a colossus piece by piece around Gustave Eiffel's iron skeleton. Completed and stood up in France, the giant was then taken apart into hundreds of numbered sections, crated, and shipped across the Atlantic. On Bedloe's Island a fresh crew, many of them recent immigrants, reassembled the monument that was finally unveiled in 1886.",
        "source": "U.S. National Park Service, Statue of Liberty National Monument",
        "href": "https://www.nps.gov/stli/learn/historyculture/places_creating_statue.htm"
      },
      {
        "category": "literary",
        "title": "Shelley's 'Ozymandias' and the colossal wreck of pride",
        "excerpt": "And on the pedestal these words appear: \"My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!\" Nothing beside remains.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\"",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "literary",
        "title": "Nebuchadnezzar's golden image on the plain of Dura",
        "excerpt": "Nebuchadnezzar the king made an image of gold, whose height was threescore cubits, and the breadth thereof six cubits: he set it up in the plain of Dura, in the province of Babylon.",
        "source": "The Book of Daniel 3:1 (King James Version)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Daniel"
      },
      {
        "category": "artistic",
        "title": "Verdi's 'Triumphal March' from Aida (musical)",
        "excerpt": "Verdi's Grand March swells as a victorious army parades before the throne, trumpets blazing and the whole stage massed with people to honor a spectacle of pomp and pageantry. It is the sound of a crowd gathered around a shining monument, the score made for processions toward a golden prize. Few passages in opera so perfectly evoke a multitude assembling before something colossal and triumphant.",
        "source": "Giuseppe Verdi, Aida (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Aida_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Bruegel's 'The Tower of Babel' (visual artwork)",
        "excerpt": "Bruegel paints a spiraling mountain of masonry swarming with tiny laborers, cranes, and scaffolds, a wonder built by countless hands climbing story upon story toward the clouds. Ramps, arches, and half-finished tiers reveal the sheer human effort of raising something monstrous from innumerable small blocks. The colossal structure dwarfs the city and harbor below, an emblem of collective ambition made visible.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/lego-world-cup-trophy-build--art.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting of the Tower of Babel, a vast spiraling brick structure crowded with tiny workers rising into the clouds above a harbor city",
          "credit": "Pieter Bruegel the Elder, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
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
    "rank": 27
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
    "rank": 28
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
    "rank": 29
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
    "rank": 30
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
    "rank": 31
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
    "rank": 32
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
    "rank": 33
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
    "rank": 34
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
    "rank": 35
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
    "rank": 36
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
    "rank": 37
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
    "rank": 38
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
