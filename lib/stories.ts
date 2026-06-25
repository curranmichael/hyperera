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

// Hand-curated front page. The 2026-06-24 edition (ranks 1-13) leads; the prior
// 2026-06-23 edition follows (ranks 14-26). Selected from the live RSS feeds in
// `lib/feeds.ts`. The analogies are the heart of each story: six per event, two
// per category, each linking to a real human-written source (a primary text,
// museum object page, or archive). Excerpts quote the most relevant passage
// verbatim where the source is public domain, and otherwise describe rather than
// quote, in keeping with the strict-verification ethos. Covers are dithered local copies: feed
// or rights-clean Wikimedia art credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated", from `npm run images:generate`).
// Source links to AP/Reuters are Google News redirects (see `lib/feeds.ts`); a
// later verify pass canonicalizes them.
const stories: Story[] = [
  {
    "slug": "herculaneum-scroll-fully-read",
    "headline": "Researchers read a complete carbonized Herculaneum scroll for the first time",
    "overview": "Scientists announced that they have, for the first time, virtually unrolled and read the complete text of a papyrus scroll that was carbonized by the eruption of Mount Vesuvius in AD 79, without physically opening the fragile artifact. Using high-resolution scans and machine learning developed through the Vesuvius Challenge, researchers recovered columns of ancient text from one of the charred library rolls buried at Herculaneum.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxPd0JnOGV1dVJ5X0xoUVF2NUx1Z0hBTm5jV2dzQTgtNnZNRnVOSWd4Q1VjeXl2cmg2V1JNU1lFYmlkQTlHV0c2MnFfR3N1eGxBYXBTMEFlMzF2blF4NkhBM2phWWloNkhrS0ppb3lXX1BubWRuQURuNDZicTdPZkpUVHBfN1ZiR0tMaktJcHpkWmp3bXpvYURyRHBpeS00ME9DbTZZMDdCT2tUc00?oc=5"
      },
      {
        "name": "Vesuvius Challenge (Scroll Prize)",
        "href": "https://scrollprize.org/firstscroll"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/herculaneum-scroll-fully-read.png",
      "alt": "A blazing eruption of Mount Vesuvius over the Bay of Naples, evoking the disaster that carbonized the Herculaneum library scrolls.",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "rank": 1,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Younger describes the eruption of AD 79",
        "excerpt": "Those who were looking at the cloud from some distance could not make out from which mountain it was rising - it was afterwards discovered to have been Mount Vesuvius - but in likeness and form it more closely resembled a pine-tree than anything else, for what corresponded to the trunk was of great length and height, and then spread out into a number of branches, the reason being, I imagine, that while the vapour was fresh, the cloud was borne upwards, but when the vapour became wasted, it lost its motion, or even became dissipated by its own weight, and spread out laterally.",
        "source": "Pliny the Younger, Letters 6.16 (to Tacitus), trans. J. B. Firth (1900)",
        "href": "https://www.attalus.org/old/pliny6.html"
      },
      {
        "category": "historical",
        "title": "The rediscovery of the Villa of the Papyri and its buried library",
        "excerpt": "When the carbonized scroll now read end to end was sealed in AD 79, it sat in the only library to survive intact from the ancient world. The Villa of the Papyri at Herculaneum, stumbled upon by well-diggers in 1750 and tunneled into under the Bourbon kings of Naples, gave up more than 1,800 charred rolls, many of them Epicurean works by Philodemus of Gadara. For two and a half centuries those blackened lumps resisted every attempt to open them; the breakthrough announced in 2026 reaches the words inside without ever unrolling the papyrus.",
        "source": "Wikipedia, \"Villa of the Papyri\"",
        "href": "https://en.wikipedia.org/wiki/Villa_of_the_Papyri"
      },
      {
        "category": "literary",
        "title": "Lucretius opens De Rerum Natura, the great Epicurean poem",
        "excerpt": "Mother of Rome, delight of Gods and men,\nDear Venus that beneath the gliding stars\nMakest to teem the many-voyaged main\nAnd fruitful lands - for all of living things\nThrough thee alone are evermore conceived,\nThrough thee are risen to visit the great sun -\nBefore thee, Goddess, and thy coming on,\nFlee stormy wind and massy cloud away,\nFor thee the daedal Earth bears scented flowers,\nFor thee waters of the unvexed deep\nSmile, and the hollows of the serene sky\nGlow with diffused radiance for thee!",
        "source": "Lucretius, De Rerum Natura, Book I, trans. William Ellery Leonard (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/785/785-h/785-h.htm"
      },
      {
        "category": "literary",
        "title": "Milton on books as the living blood of the mind",
        "excerpt": "For books are not absolutely dead things, but do contain a potency of life in them to be as active as that soul was whose progeny they are; nay, they do preserve as in a vial the purest efficacy and extraction of that living intellect that bred them. I know they are as lively, and as vigorously productive, as those fabulous dragon's teeth; and being sown up and down, may chance to spring up armed men. And yet, on the other hand, unless wariness be used, as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica (1644), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm"
      },
      {
        "category": "artistic",
        "title": "Mendelssohn revives Bach's St Matthew Passion from oblivion",
        "excerpt": "Bach's Passio Domini Nostri J.C. Secundum Evangelistam Matthaeum (St Matthew Passion), BWV 244, written in 1727, fell into near-total neglect after his death. In 1829 the twenty-year-old Felix Mendelssohn conducted a celebrated revival in Berlin, the first performance outside Leipzig in a century, lifting a buried masterwork back into living sound - much as virtual unrolling now lifts a charred scroll back into legible text.",
        "source": "Johann Sebastian Bach, Matthauspassion, BWV 244, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Matth%C3%A4uspassion,_BWV_244_(Bach,_Johann_Sebastian)"
      },
      {
        "category": "artistic",
        "title": "Bryullov paints the last day of Pompeii",
        "excerpt": "Karl Bryullov's vast canvas The Last Day of Pompeii (1830-1833) stages the AD 79 catastrophe that also buried Herculaneum: a lurid sky split by lightning over toppling statues, a crowd frozen between flight and devotion as Vesuvius rains fire. The painting made the eruption an icon of beauty and terror; the scroll just read end to end is the quiet survivor of the same disaster, its words returned after seventeen centuries.",
        "source": "Karl Bryullov, The Last Day of Pompeii (1830-1833), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/herculaneum-scroll-fully-read--art.png",
          "alt": "The Last Day of Pompeii by Karl Bryullov: panicked crowds beneath a fiery, lightning-torn sky as Vesuvius erupts.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "us-supreme-court-curbs-roundup-cancer-suits",
    "headline": "US Supreme Court curbs thousands of Roundup cancer lawsuits against Bayer",
    "overview": "The US Supreme Court ruled in favor of Bayer, holding that federal pesticide law can shield the company from many failure-to-warn claims over its Roundup weedkiller, threatening to block thousands of lawsuits by plaintiffs who say the herbicide caused their non-Hodgkin lymphoma. Bayer acquired Roundup maker Monsanto in 2018 and has faced tens of billions of dollars in potential liability.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxQdGVzRlNlZmZtMkxVa2xTd1ZJVzE5aXdOakpWa3BZaTJTZGlQVXFVNjl5NzRxYnlyNW9Tb0VvRGZtY3hVcldPbzZndk5YZ3ZCcWRnS2NZX3RSMl8xZFRlenU5RjRMSDF4UEhxMmR4WEJ3WTdkaVM5NUJxZlFVVlFzZ2ctcEZTSEp3Vm16TmhGREtPU0Fq?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/politics/supreme-court-ruling-blocks-thousands-of-lawsuits-against-maker-of-roundup-weedkiller"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/us-supreme-court-curbs-roundup-cancer-suits.png",
      "alt": "Rows of green crops under a heavy sky, evoking the weedkiller at the center of a Supreme Court ruling.",
      "credit": "Wikimedia Commons"
    },
    "rank": 2,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Radium Girls and U.S. Radium Corporation (1925-1928)",
        "excerpt": "Young women hired to paint glowing watch dials were told the radium paint was harmless and instructed to point their brushes between their lips, even as the company's own chemists handled the same material behind lead screens and tongs. When the dial painters began to sicken and die, five of them sued U.S. Radium in New Jersey; their 1928 settlement became a landmark in the long fight to hold manufacturers liable for failing to warn workers of a known poison.",
        "source": "Library of Congress, Headlines & Heroes blog",
        "href": "https://blogs.loc.gov/headlinesandheroes/2019/03/radium-girls-living-dead-women/"
      },
      {
        "category": "historical",
        "title": "The 1948 Donora Smog Disaster",
        "excerpt": "In October 1948, fluoride and sulfur-dioxide emissions from U.S. Steel's zinc works settled over the Pennsylvania mill town of Donora during a temperature inversion, killing twenty people and sickening nearly half the population. The catastrophe forced the first large U.S. epidemiological investigation of an industrial poisoning and helped drive the federal clean-air laws that followed, illustrating how corporate emissions and weak regulation can become a public-health reckoning.",
        "source": "American Journal of Public Health (via PubMed Central)",
        "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5922205/"
      },
      {
        "category": "literary",
        "title": "An Enemy of the People, by Henrik Ibsen (1882)",
        "excerpt": "Dr. Stockmann. The whole Bath establishment is a whited, poisoned sepulchre, I tell you—the gravest possible danger to the public health! All the nastiness up at Molledal, all that stinking filth, is infecting the water in the conduit-pipes leading to the reservoir; and the same cursed, filthy poison oozes out on the shore too—",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/2446"
      },
      {
        "category": "literary",
        "title": "The Jungle, by Upton Sinclair (1906)",
        "excerpt": "The people of Chicago saw the government inspectors in Packingtown, and they all took that to mean that they were protected from diseased meat; they did not understand that these hundred and sixty-three inspectors had been appointed at the request of the packers, and that they were paid by the United States government to certify that all the diseased meat was kept in the state.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/140"
      },
      {
        "category": "artistic",
        "title": "Fidelio, Op. 72, by Ludwig van Beethoven (1805-1814)",
        "excerpt": "Beethoven's only opera turns on a prisoner unjustly buried in the dungeons of a corrupt official, Don Pizarro, who would silence the truth to protect himself. Leonore's fearless rescue and the final chorus of liberation make the work an enduring hymn to justice forced upon power that would rather conceal its wrongs, a fitting counterpoint to plaintiffs fighting for their day in court.",
        "source": "IMSLP (International Music Score Library Project)",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "The Harvesters, by Pieter Bruegel the Elder (1565)",
        "excerpt": "Bruegel's golden wheat field, with laborers resting at the edge of an abundant harvest, is one of Western art's great images of the cultivated land and the people who depend upon it. Set against a modern case over a weedkiller blamed for cancer, the painting reads as a quiet meditation on the bond between human health and the fields we treat to feed ourselves.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/us-supreme-court-curbs-roundup-cancer-suits--art.png",
          "alt": "The Harvesters, a 1565 oil painting by Pieter Bruegel the Elder showing peasants harvesting wheat in a golden summer field.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "europe-heatwave-shifts-east",
    "headline": "France raises heat alert to its highest level as a record heatwave spreads across Europe",
    "overview": "France raised its heat-health alert to the highest level as a punishing heatwave pushed temperatures toward 40C and shifted eastward across Europe, with Germany among the countries bracing for extreme heat. French officials said the heat was linked to deaths, including among young people, as authorities urged precautions.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cwy0pdq89zno"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/24/power-outage-in-france-as-europe-bakes-in-record-heat"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/europe-heatwave-shifts-east.png",
      "alt": "A sun-scorched European city shimmering in extreme heat as a record heatwave spreads across the continent.",
      "credit": "Wikimedia Commons"
    },
    "rank": 3,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 2003 European heatwave",
        "excerpt": "The August 2003 heatwave was one of the deadliest natural disasters in modern European history, with tens of thousands of excess deaths concentrated in France, where overwhelmed hospitals and morgues and a vulnerable elderly population turned record temperatures into a public-health catastrophe. France's national heat-record indicator from that summer stood for years until being surpassed in the June 2026 event, underscoring how a once-exceptional disaster is now being eclipsed.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/2003_European_heatwave"
      },
      {
        "category": "historical",
        "title": "The Dust Bowl, 1930s",
        "excerpt": "Through the 1930s, severe drought and relentless heat scorched the American Great Plains, killing crops and livestock and stripping the topsoil into towering dust storms that darkened the sky. The disaster drove hundreds of thousands of families off their parched land, a lasting reminder of how prolonged extreme heat and dryness can hollow out a society's foundations.",
        "source": "Library of Congress",
        "href": "https://www.loc.gov/classroom-materials/dust-bowl/"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II (the fall of Phaethon)",
        "excerpt": "Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust— the forests and the mountains are destroyed.",
        "source": "Perseus Digital Library (Tufts), Brookes More translation",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2"
      },
      {
        "category": "literary",
        "title": "Coleridge, The Rime of the Ancient Mariner",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon. // Day after day, day after day, / We stuck, nor breath nor motion, / As idle as a painted ship / Upon a painted ocean.",
        "source": "Wikisource (Sibylline Leaves, 1817)",
        "href": "https://en.wikisource.org/wiki/Sibylline_Leaves_(Coleridge)/The_Rime_of_the_Ancient_Mariner"
      },
      {
        "category": "artistic",
        "title": "Vivaldi, \"Summer\" (L'estate), The Four Seasons, RV 315",
        "excerpt": "Vivaldi's 1723 violin concerto translates a blistering summer into sound: its opening movement is marked \"Languidezza per il caldo\" (languor from the heat), depicting humans and animals wilting under an oppressive sun, before the finale, \"Tempo impetuoso d'estate,\" erupts into a violent summer storm. It is among the earliest works of program music to render extreme heat as a physical, almost menacing force.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Violin_Concerto_in_G_minor,_RV_315_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Harvesters (1565)",
        "excerpt": "Bruegel's late-summer panorama shows laborers cutting and gathering wheat beneath a hazy, heat-laden sky, while exhausted figures collapse in the meager shade of a tree. The sun-bleached golden fields and the toll the heat takes on the workers make it one of the most vivid early depictions of high summer's punishing warmth.",
        "source": "Wikimedia Commons / Metropolitan Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/europe-heatwave-shifts-east--art.png",
          "alt": "Pieter Bruegel the Elder, The Harvesters (1565): peasants cutting golden wheat under a hazy summer sky",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "ibm-sub-nanometer-chip",
    "headline": "IBM unveils chip technology with features smaller than one nanometer",
    "overview": "IBM said it demonstrated the world's first chip technology with features below one nanometer, using a vertically stacked \"block of flats\" transistor design to pack more computing power into the same space. The company framed it as a step toward more powerful, efficient processors for artificial intelligence, while cautioning that commercial production remains years away.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNeXRoRXR0MWRpYVVHXzBQY21WWXRiczFaVm9jaDJVdW1hQ0lYQWRVLURRQU45UHBldVdoQklvZVRKUE1DTENTZzA1bUhtQWI5SEVmaWlaTDhHSzd3czRsT1JocnRlOXMxclRUbXo0ZS1yMXNyaDhPUEdIMWVJZjVkQkFSX3NuZ3NKcDFGTTBKdW1oeU1ZZ0p0WkdPUDQ5eXJWSmZOcldCakpUWkN5T0E?oc=5"
      },
      {
        "name": "MIT Technology Review",
        "href": "https://www.technologyreview.com/2026/06/25/1139696/ibm-unveils-sub1nm-chip/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/ibm-sub-nanometer-chip.png",
      "alt": "A silicon wafer patterned with microchips, representing IBM's sub-one-nanometer transistor breakthrough.",
      "credit": "MIT Technology Review"
    },
    "rank": 4,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The first transistor at Bell Labs (December 1947)",
        "excerpt": "On December 16, 1947, John Bardeen and Walter Brattain built the first semiconductor amplifier by pressing two closely spaced gold contacts onto a slab of high-purity germanium, finding that the voltage on one contact could modulate the current through the other and amplify a signal up to a hundredfold. They demonstrated the device to Bell Labs officials on December 23, an event William Shockley called \"a magnificent Christmas present.\" That single point-contact device began the entire lineage of solid-state electronics that IBM now extends down past one nanometer.",
        "source": "Computer History Museum, The Silicon Engine",
        "href": "https://www.computerhistory.org/siliconengine/invention-of-the-point-contact-transistor/"
      },
      {
        "category": "historical",
        "title": "Gutenberg's movable type and the 42-line Bible (c. 1455)",
        "excerpt": "The Gutenberg Bible, also known as the 42-line Bible or B42, is the earliest major book printed in Europe using mass-produced metal movable type. Preparation probably began soon after 1450, and the first finished copies were available in 1454 or 1455 in Mainz. By casting reusable metal type at a precision far finer than any scribe and combining it with a new oil-based ink, Gutenberg packed far more information into a reproducible form, a leap in density and replication that prefigures the relentless miniaturization of the chip.",
        "source": "UNESCO Memory of the World",
        "href": "https://www.unesco.org/en/memory-world/42-line-gutenberg-bible-printed-vellum-and-its-contemporary-documentary-background"
      },
      {
        "category": "literary",
        "title": "William Blake, \"Auguries of Innocence\"",
        "excerpt": "To see a World in a Grain of Sand\nAnd a Heaven in a Wild Flower\nHold Infinity in the palm of your hand\nAnd Eternity in an hour",
        "source": "Wikisource (The Pickering Manuscript)",
        "href": "https://en.wikisource.org/wiki/The_Pickering_Manuscript/Auguries_of_Innocence"
      },
      {
        "category": "literary",
        "title": "Jonathan Swift, Gulliver's Travels — A Voyage to Lilliput",
        "excerpt": "I felt something alive moving on my left leg, which advancing gently forward over my breast, came almost up to my chin; when, bending my eyes downwards as much as I could, I perceived it to be a human creature not six inches high, with a bow and arrow in his hands, and a quiver at his back.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/829/829-h/829-h.htm"
      },
      {
        "category": "artistic",
        "title": "J. S. Bach, Die Kunst der Fuge (The Art of Fugue), BWV 1080",
        "excerpt": "Left incomplete and published posthumously in 1751, The Art of Fugue is a cycle of fugues and canons in D minor that all elaborate a single principal subject, generally ordered to increase in complexity. Bach stacks voice upon voice, layering inversions, augmentations, and canons into an ever denser contrapuntal structure built from one theme, an architecture of precision that echoes IBM stacking transistors into a vertical block to pack more capability into the same space.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Kunst_der_Fuge,_BWV_1080_(Bach,_Johann_Sebastian)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
        "excerpt": "Bruegel's vast 1563 panel depicts a colossal spiraling tower climbing tier upon tier into the clouds, an ambitious human structure built ever upward to reach beyond its limits. Its stacked, receding stories make it a fitting visual counterpart to IBM's \"block of flats\" transistor, which similarly piles layer on layer to gain ground in a finite footprint, even as the painting hints at the hubris and fragility of such towering ambition.",
        "source": "Wikimedia Commons (Kunsthistorisches Museum, Vienna)",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ibm-sub-nanometer-chip--art.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting The Tower of Babel, a massive spiraling tower rising into the clouds",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "apple-raises-mac-ipad-prices",
    "headline": "Apple raises MacBook and iPad prices as memory chip costs surge",
    "overview": "Apple increased the prices of several MacBook and iPad models, blaming a sharp rise in the cost of memory chips that has rippled across the electronics industry. The move makes Apple one of the most prominent consumer brands to pass soaring component costs on to buyers.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQbXhvZDBfVzdFNGpzU0JyTC11YWFqMHE4THNGLUhlcGN6R0JxMUdKNmR2dWpuSUZLXzJuUU9qc19oQ3BFR256dVJaRFJ4dUxYcGNDUmozNjZ2RVpTd0U1YV80bTVLSEdPUGVWQXVVcnRrZ0xZaHZqUVJ2Wjd5aE1qQmJxR0k0ZmpJanB0bkl5cnRCQ1VMdXpLcVByYkw0SDZGRnpBZXJNOHQ5MU4xSWY2aThn?oc=5"
      },
      {
        "name": "The Globe and Mail",
        "href": "https://www.theglobeandmail.com/business/international-business/us-business/article-apple-raises-macbook-ipad-prices-memory-shortage-costs/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/apple-raises-mac-ipad-prices.png",
      "alt": "An Apple laptop and tablet on a clean surface, illustrating Apple's price increases driven by memory chip costs.",
      "credit": "The Globe and Mail"
    },
    "rank": 5,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 1973 Oil Embargo and the Price Shock",
        "excerpt": "When OAPEC imposed its 1973 embargo, the price of oil per barrel first doubled, then quadrupled, destabilizing economies worldwide. The sudden scarcity of a single critical input imposed severe hardship on consumers and exposed how dependence on a constrained commodity can ripple across an entire economy.",
        "source": "U.S. Department of State, Office of the Historian",
        "href": "https://history.state.gov/milestones/1969-1976/oil-embargo"
      },
      {
        "category": "historical",
        "title": "Tulip Mania and the Volatility of Scarce Goods",
        "excerpt": "In the Dutch Republic of the 1630s, contract prices for rare tulip bulbs soared to extraordinary heights before collapsing, an episode long cited as a parable of how demand for a scarce commodity can outrun any sensible measure of value. The frenzy showed how quickly the cost of a coveted good can detach from its underlying worth when supply is limited and buyers compete.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/event/Tulip-Mania"
      },
      {
        "category": "literary",
        "title": "Adam Smith, The Wealth of Nations (1776)",
        "excerpt": "When the quantity of any commodity which is brought to market falls short of the effectual demand, all those who are willing to pay the whole value of the rent, wages, and profit, which must be paid in order to bring it thither, cannot be supplied with the quantity which they want. Rather than want it altogether, some of them will be willing to give more. A competition will immediately begin among them, and the market price will rise more or less above the natural price, according as either the greatness of the deficiency, or the wealth and wanton luxury of the competitors, happens to animate more or less the eagerness of the competition.",
        "source": "Project Gutenberg / Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Wealth_of_Nations/Book_I/Chapter_7"
      },
      {
        "category": "literary",
        "title": "Charles Dickens, Hard Times (1854)",
        "excerpt": "Thomas Gradgrind, sir—peremptorily Thomas—Thomas Gradgrind. With a rule and a pair of scales, and the multiplication table always in his pocket, sir, ready to weigh and measure any parcel of human nature, and tell you exactly what it comes to.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold (1854)",
        "excerpt": "Wagner's opera opens with gold stolen from the Rhine and forged into a ring that promises mastery over the world. Its drama turns on how the lust to possess a scarce and precious substance corrupts gods and dwarves alike, a mythic meditation on greed, value, and the price exacted by coveted treasure.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys, The Moneylender and His Wife (1514)",
        "excerpt": "Matsys depicts a moneylender weighing gold coins on a delicate balance while his wife pauses over a devotional book, her attention drifting to the glinting metal. The painting is an enduring study of value, commerce, and the pull of money over everyday life—the same weighing of worth that surfaces whenever the cost of a coveted good climbs.",
        "source": "Wikimedia Commons (Louvre)",
        "href": "https://commons.wikimedia.org/wiki/File:Quentin_Massys_001.jpg",
        "image": {
          "src": "/covers/apple-raises-mac-ipad-prices--art.png",
          "alt": "The Moneylender and His Wife (1514) by Quentin Matsys, a man weighing gold coins as his wife looks on",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "us-pce-inflation-4-1-may",
    "headline": "US inflation rises to 4.1% in May, keeping a Federal Reserve rate increase in play",
    "overview": "The Federal Reserve's preferred inflation gauge, the personal consumption expenditures price index, rose 4.1% in May from a year earlier, a faster pace that keeps the door open to another interest-rate increase. The reading complicates the central bank's path as it weighs stubborn price pressures against signs of a cooling economy.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQTkttQ2dqWE53WS1XUWNlT0FUb2pERERFc2pkTEFDSV9tU3JUaWk3aEs5SjAxMnd3amRlZG12N0gtcFN5My1Bb0JkR3BzSGMwSHJzNE1JX2hEMmRkNW1IbnpaRHNiUVEzMDBVaFphUlVjUS1hUDFtMW9pYjI0SmVIeTljUDFUTkRXdEMzdUxSM2hTXzlYUndiU084c05sY0w1dFNINFVxeldPNlhU?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/pce-report-report-may-2026-federal-reserve-inflation/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/us-pce-inflation-4-1-may.png",
      "alt": "The facade of the US Federal Reserve, evoking the central bank's response to rising inflation.",
      "credit": "Wikimedia Commons"
    },
    "rank": 6,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Diocletian's Edict on Maximum Prices (301 AD)",
        "excerpt": "He also, when by various extortions he had made all things exceedingly dear, attempted by an ordinance to limit their prices. Then much blood was shed for the veriest trifles; men were afraid to expose anything to sale, and the scarcity became more excessive and grievous than ever, until, in the end, the ordinance, after having proved destructive to multitudes, was from mere necessity abrogated.",
        "source": "Lactantius, Of the Manner in Which the Persecutors Died, ch. 7",
        "href": "https://www.newadvent.org/fathers/0705.htm"
      },
      {
        "category": "historical",
        "title": "The German hyperinflation of 1923",
        "excerpt": "In the autumn of 1923 Germany's paper mark collapsed almost completely, with prices doubling in days and the exchange rate against the dollar climbing into the trillions. Wages had to be spent within hours of being paid, and workers were sometimes paid twice a day so the money could be carried home before it lost its worth. The episode stands as the modern world's most vivid warning of how quickly confidence in a currency can evaporate when price increases run out of control.",
        "source": "Encyclopaedia Britannica, \"Hyperinflation\"",
        "href": "https://www.britannica.com/money/hyperinflation"
      },
      {
        "category": "literary",
        "title": "Silas Marner by George Eliot",
        "excerpt": "He handled them, he counted them, till their form and colour were like the satisfaction of a thirst to him; but it was only in the night, when his work was done, that he drew them out to enjoy their companionship.",
        "source": "George Eliot, Silas Marner (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/550/550-h/550-h.htm"
      },
      {
        "category": "literary",
        "title": "The Parable of the Talents (Matthew 25, KJV)",
        "excerpt": "Then he which had received the one talent came and said, Lord, I knew thee that thou art an hard man, reaping where thou hast not sown, and gathering where thou hast not strawed: And I was afraid, and went and hid thy talent in the earth: lo, there thou hast that is thine. His lord answered and said unto him, Thou wicked and slothful servant, thou knewest that I reap where I sowed not, and gather where I have not strawed: Thou oughtest therefore to have put my money to the exchangers, and then at my coming I should have received mine own with usury.",
        "source": "Bible (King James Version), Gospel of Matthew 25:24-27, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "artistic",
        "title": "Das Rheingold, WWV 86A by Richard Wagner",
        "excerpt": "In the prologue to Wagner's Ring cycle, the dwarf Alberich renounces love itself in order to seize the Rhine's gold and forge from it a ring of absolute power. The treasure brings only a curse, dragging gods and mortals toward ruin as greed corrodes every bond it touches. Wagner's score makes audible the seduction and peril of hoarded wealth that anchors the whole epic.",
        "source": "Richard Wagner, Das Rheingold (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "The Moneylender and His Wife by Quentin Matsys (1514)",
        "excerpt": "A moneylender weighs gold coins on a small balance while his wife, a devotional book open before her, turns her attention from her reading to the glittering pile of money. The Flemish master makes the convex mirror, the scales and the careful counting of coin into a meditation on the value of money and the pull of worldly wealth over the spirit. Painted in Antwerp in 1514, it is among the most enduring images of commerce and the lure of gold.",
        "source": "Quentin Matsys, The Moneylender and His Wife, Musee du Louvre (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Quentin_Massys_001.jpg",
        "image": {
          "src": "/covers/us-pce-inflation-4-1-may--art.png",
          "alt": "The Moneylender and His Wife (1514) by Quentin Matsys, a man weighing gold coins beside his wife",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "eu-cloud-gatekeeper-rules",
    "headline": "EU moves to put Amazon and Microsoft cloud divisions under Big Tech \"gatekeeper\" rules",
    "overview": "European Union regulators moved to bring the cloud-computing arms of Amazon and Microsoft under the bloc's Digital Markets Act, the strict \"gatekeeper\" regime that imposes obligations on dominant online platforms. The step would subject Amazon Web Services and Microsoft Azure to new requirements aimed at curbing their market power.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0wFBVV95cUxQR1BQRlVrQkliUkJJbW8xalpOR21kdkhzRG10cEh6cHZ6bkZ6WDk4WF9Ra1JuU1lva2MwR3VGLXNicWE4Y1lzaWRtbkFmeUtNUU40YkM0SUJTLU9BWVd6Q1FhOUtCSFI1MEdrbE8xVXpWT3h4cDhSa3E2aGFySUFJNVkxMHQ0TU9KQ1VIVUFuS29SQi0tbHZvYVVXdC1ldVRlV3Z2Q1ptdHVTb0lVdHJ5WXBqTHlZMldvcUFXUC1WRVlLWlc1OWhxTkpsZGRMMUtRQTU0?oc=5"
      },
      {
        "name": "European Commission",
        "href": "https://digital-strategy.ec.europa.eu/en/news/commission-reaches-preliminary-position-amazons-and-microsofts-market-leading-cloud-services-should"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/eu-cloud-gatekeeper-rules.png",
      "alt": "A vast data center server hall, representing EU rules targeting the cloud arms of Amazon and Microsoft.",
      "credit": "Wikimedia Commons"
    },
    "rank": 7,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Sherman Antitrust Act (1890)",
        "excerpt": "Every contract, combination in the form of trust or otherwise, or conspiracy, in restraint of trade or commerce among the several States, or with foreign nations, is hereby declared to be illegal. ... Every person who shall monopolize, or attempt to monopolize, or combine or conspire with any other person or persons, to monopolize any part of the trade or commerce among the several States, or with foreign nations, shall be deemed guilty of a misdemeanor.",
        "source": "U.S. National Archives, Milestone Documents",
        "href": "https://www.archives.gov/milestone-documents/sherman-anti-trust-act"
      },
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States (1911)",
        "excerpt": "In a landmark application of antitrust law, the U.S. Supreme Court found that John D. Rockefeller's Standard Oil had unlawfully monopolized the petroleum industry and ordered the colossus broken into dozens of independent companies. The ruling established the 'rule of reason,' holding that the law forbids combinations amounting to an unreasonable restraint of trade. It remains the archetype for using regulation to rein in a dominant firm whose scale alone tilts an entire market.",
        "source": "Justia U.S. Supreme Court Center, 221 U.S. 1 (1911)",
        "href": "https://supreme.justia.com/cases/federal/us/221/1/"
      },
      {
        "category": "literary",
        "title": "David and Goliath (1 Samuel 17, King James Version)",
        "excerpt": "And there went out a champion out of the camp of the Philistines, named Goliath, of Gath, whose height was six cubits and a span. ... And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth. So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "Wikisource, Bible (King James), 1 Samuel",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "Gulliver's Travels, Part II: A Voyage to Brobdingnag (Jonathan Swift)",
        "excerpt": "I was endeavoring to find some gap in the hedge, when I discovered one of the inhabitants in the next field, advancing towards the stile, of the same size with him whom I saw in the sea pursuing our boat. He appeared as tall as an ordinary spire steeple, and took about ten yards at every stride, as near as I could guess. I was struck with the utmost fear and astonishment, and ran to hide myself in the corn, from whence I saw him at the top of the stile, looking back into the next field on the right hand, and heard him call in a voice many degrees louder than a speaking trumpet.",
        "source": "Project Gutenberg (eBook #17157)",
        "href": "https://www.gutenberg.org/files/17157/17157-h/17157-h.htm"
      },
      {
        "category": "artistic",
        "title": "Saul, HWV 53 (George Frideric Handel, 1738)",
        "excerpt": "Handel's three-act oratorio dramatizes the rise of the shepherd David after his sling fells the giant Goliath, and the jealous King Saul's descent as the unlikely youth eclipses him. Built around an exultant Epinicion, or Song of Triumph, celebrating the victory over the Philistines, the score sets the toppling of a feared giant to grand choral and orchestral writing. It is a public-domain musical meditation on power, envy, and the upending of those who once seemed invincible.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Saul,_HWV_53_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Colossus (El coloso), attributed to Francisco Goya, c. 1808-1812",
        "excerpt": "A towering giant looms over a fleeing landscape, its sheer scale dwarfing the tiny figures and herds scattering in panic below. The painting captures the terror of an overwhelming, faceless power that dominates everything in its shadow, a fitting emblem for outsized market giants and the small players who must contend with them.",
        "source": "Museo del Prado / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:El_coloso.jpg",
        "image": {
          "src": "/covers/eu-cloud-gatekeeper-rules--art.png",
          "alt": "The Colossus, a painting of an immense giant rising over a fleeing landscape, attributed to Francisco Goya",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "china-supercomputer-fastest",
    "headline": "Chinese supercomputer ranked world's fastest, ending US lead since 2017",
    "overview": "A Chinese supercomputer has been ranked the world's fastest, displacing US machines from the top spot for the first time since 2017. The shift marks a milestone in the long-running US-China competition over high-performance computing, which underpins scientific research, defense and artificial intelligence.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNLXk4LTR0VFhXOVlfU0Vua19vbGIya0hEaWg2cGFHY2tnNC1wNXF4dU9iT05MV1RCY05kUUpkMHJUdVB6czRaNnIwQm9fLXU4dDIzWTZ6NHNNS3RmZkMyMUQzZG12RkpsajdQbmY2OGFjZ0wtTm1FX0txeWtPRFR2RDA5YVBEa1Q1THJpSkxrRkU2T0NxWjVDQlpIY2J5VThyd1Jzc2RhclpTSVRC?oc=5"
      },
      {
        "name": "TOP500",
        "href": "https://top500.org/news/lineshine-debuts-no-1-top500-enters-new-global-exascale-era/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/china-supercomputer-fastest.png",
      "alt": "Long rows of supercomputer cabinets, marking China's machine ranked the world's fastest.",
      "credit": "Wikimedia Commons"
    },
    "rank": 8,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sputnik 1 and the Origins of the Space Age (1957)",
        "excerpt": "The Soviet launch of the first artificial satellite stunned the United States and triggered the Space Race. As NASA historian Roger Launius writes, \"The only appropriate characterization that begins to capture the mood on 5 October involves the use of the word hysteria.\" The shock \"created an illusion of a technological gap and provided the impetus for increased spending for aerospace endeavors, technical and scientific educational programs, and the chartering of new federal agencies to manage air and space research and development.\"",
        "source": "NASA History Division — Roger D. Launius",
        "href": "https://www.nasa.gov/history/sputnik/sputorig.html"
      },
      {
        "category": "historical",
        "title": "ENIAC, the World's First General-Purpose Electronic Computer (1946)",
        "excerpt": "Unveiled at the University of Pennsylvania's Moore School in 1946, ENIAC was the world's first general-purpose, electronic, programmable computer, built from more than 17,000 vacuum tubes. Unlike earlier machines fixed to a single task, it could be reprogrammed to solve many different problems, establishing the electronic foundation on which all modern computing — and today's exascale supercomputing race — was built.",
        "source": "Penn Today, University of Pennsylvania",
        "href": "https://penntoday.upenn.edu/news/penns-eniac-worlds-first-electronic-computer-turns-80"
      },
      {
        "category": "literary",
        "title": "The Hare and the Tortoise (Aesop's Fables)",
        "excerpt": "A HARE one day ridiculed the short feet and slow pace of the Tortoise, who replied, laughing: \"Though you be swift as the wind, I will beat you in a race.\" The Hare, believing her assertion to be simply impossible, assented to the proposal; and they agreed that the Fox should choose the course and fix the goal. On the day appointed for the race the two started together. The Tortoise never for a moment stopped, but went on with a slow but steady pace straight to the end of the course. The Hare, lying down by the wayside, fell fast asleep. At last waking up, and moving as fast as he could, he saw the Tortoise had reached the goal, and was comfortably dozing after her fatigue.",
        "source": "Project Gutenberg — Aesop's Fables (Townsend translation)",
        "href": "https://www.gutenberg.org/files/21/21-h/21-h.htm"
      },
      {
        "category": "literary",
        "title": "Ada Lovelace, Notes on the Analytical Engine (1843)",
        "excerpt": "In her translator's notes — signed \"A. A. L.\" — Augusta Ada Lovelace foresaw the power of a general computing machine: \"The Analytical Engine weaves algebraical patterns just as the Jacquard-loom weaves flowers and leaves.\" Her distinction between the machine's operations and the data it processes anticipated modern computing by more than a century.",
        "source": "Wikisource — Sketch of the Analytical Engine, Notes by the Translator",
        "href": "https://en.wikisource.org/wiki/Scientific_Memoirs/3/Sketch_of_the_Analytical_Engine_invented_by_Charles_Babbage,_Esq./Notes_by_the_Translator"
      },
      {
        "category": "artistic",
        "title": "Triumphal March (Grand March), from Verdi's Aida, Act II (1871)",
        "excerpt": "Verdi's Grand March in Act II of Aida accompanies a victorious army returning home in triumph, its brassy fanfares the archetypal music of conquest and national pride. The score is in the public domain and freely available on IMSLP, a fitting soundtrack for a contest in which one power celebrates seizing a crown from another.",
        "source": "IMSLP / Petrucci Music Library — Aida (Verdi)",
        "href": "https://imslp.org/wiki/A%C3%AFda_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "The Tower of Babel by Pieter Bruegel the Elder (1563)",
        "excerpt": "Bruegel's vast unfinished tower spirals into the clouds, a monument to human ambition that overreaches its grasp — an enduring image of the drive to build ever higher and faster, and of the rivalries such ambition unleashes.",
        "source": "Wikimedia Commons (Kunsthistorisches Museum, Vienna)",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/china-supercomputer-fastest--art.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting The Tower of Babel, a towering spiral structure reaching into the clouds",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "eu-3-billion-ukraine-recovery-loan",
    "headline": "EU releases a 3-billion-euro recovery loan for Ukraine under a two-year commitment",
    "overview": "The European Union released a 3-billion-euro loan package for Ukraine's recovery, part of a two-year financial commitment to help the country rebuild and stabilize its economy as the war with Russia continues. The disbursement underscores continued European support for Kyiv.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxQSFpMQzRrVk1Vd29pWTZaRlFWQ0tzRkZPMmoweFFtMWJhS1o3d1ZBT0hfYjFuWURJVXZEOWdXQ3gzbVQzM3VYRFRiNUdNdHdYQWdaUG9rUlhpaHBqZTk4LUhRYWNqeHBTdDI0UFFoWlczWHRacUwzeW1vVnZsYnptWU9tRDV0NFJWQjc4cDFjSlJROTVn?oc=5"
      },
      {
        "name": "Euronews",
        "href": "https://www.euronews.com/my-europe/2026/06/25/von-der-leyen-announces-first-payment-to-ukraine-under-90-billion-loan"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/eu-3-billion-ukraine-recovery-loan.png",
      "alt": "European Union and Ukrainian flags side by side, representing a multibillion-euro EU recovery loan for Ukraine.",
      "credit": "Euronews"
    },
    "rank": 9,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Marshall Plan Speech (George C. Marshall, Harvard, 5 June 1947)",
        "excerpt": "The remedy seems to lie in breaking the vicious circle and restoring the confidence of the people of Europe in the economic future of their own countries and of Europe as a whole. ... Any assistance that this Government may render in the future should provide a cure rather than a mere palliative.",
        "source": "Wikisource (public domain)",
        "href": "https://en.wikisource.org/wiki/The_Marshall_Plan_Speech"
      },
      {
        "category": "historical",
        "title": "Roosevelt's 'Arsenal of Democracy' Fireside Chat and the Lend-Lease Act (1941)",
        "excerpt": "In December 1940 Franklin Roosevelt urged that the United States become the great arsenal of democracy, equipping nations fighting for their liberty with the implements of war. The Lend-Lease Act of March 1941 then empowered the president to lend or lease arms and supplies to any country whose defense was deemed vital, channeling some fifty billion dollars in aid to allies at war.",
        "source": "U.S. National Archives, Milestone Documents",
        "href": "https://www.archives.gov/milestone-documents/lend-lease-act"
      },
      {
        "category": "literary",
        "title": "The Book of Nehemiah (King James Version) — Rebuilding the Walls of Jerusalem",
        "excerpt": "Then said I unto them, Ye see the distress that we are in, how Jerusalem lieth waste, and the gates thereof are burned with fire: come, and let us build up the wall of Jerusalem, that we be no more a reproach. ... So built we the wall; and all the wall was joined together unto the half thereof: for the people had a mind to work.",
        "source": "Wikisource, Bible (King James) (public domain)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Nehemiah"
      },
      {
        "category": "literary",
        "title": "Virgil, The Aeneid, Book I (trans. John Dryden) — Founding a New City After Troy's Fall",
        "excerpt": "Arms, and the man I sing, who, forc'd by fate, / And haughty Juno's unrelenting hate, / Expell'd and exil'd, left the Trojan shore.",
        "source": "Project Gutenberg (public domain)",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Symphony No. 9 in D minor, Op. 125 ('Ode to Joy', the European anthem)",
        "excerpt": "Beethoven's choral finale sets Schiller's 'Ode to Joy' as a hymn to universal brotherhood, the melody adopted as the anthem of the European Union. Composed amid the composer's deafness, it transforms struggle into communal exultation, a fitting emblem of shared resolve and renewal.",
        "source": "IMSLP / Petrucci Music Library (public domain)",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, Imaginary View of the Grande Galerie in the Louvre in Ruins (1796)",
        "excerpt": "Robert imagines the Louvre's grand gallery fallen into picturesque ruin, sunlight pouring through a collapsed vault while figures sketch and gather amid the rubble. The painting's contemplation of ruin and the persistence of human activity within it speaks to the cycle of destruction and rebuilding.",
        "source": "Wikimedia Commons (Louvre Museum, public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Hubert_Robert_-_Imaginary_View_of_the_Grande_Galerie_in_the_Louvre_in_Ruins_-_WGA19589.jpg",
        "image": {
          "src": "/covers/eu-3-billion-ukraine-recovery-loan--art.png",
          "alt": "Hubert Robert's 1796 painting of the Louvre's Grande Galerie imagined in ruins",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "france-seizes-russian-shadow-fleet-tanker",
    "headline": "France seizes a Russian \"shadow fleet\" tanker, escalating pressure on Moscow",
    "overview": "French authorities seized a tanker linked to Russia's so-called shadow fleet, the network of aging vessels used to evade Western sanctions on Russian oil exports. The seizure marks an escalation in European efforts to choke off the revenue funding Russia's war in Ukraine.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxNaHVlcXpzR21OZGhuQXR3YUFIdFVuakxCbEhVUzJvaktGRHhFbnBmSlUxaGNyM3kzTGV2SGpQRlFnazdGNWItalVwelIyQUM2QWZFLVF5NDd3TUpfOHJfY1V1TDhkTUNCRnpuZmVFYWZPa2NDenAwRGQ5MGh1dFNDWGR4M2FxRUk0Vk41NnVIdjk3TzlQYU5ucmtKdDhrLVJxUExEcFVJWlpfOERuOWVtNmtLUWlpOVlQ?oc=5"
      },
      {
        "name": "France 24",
        "href": "https://www.france24.com/en/france/20260601-france-and-allies-intercept-sanctioned-russian-oil-tanker-in-atlantic"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/france-seizes-russian-shadow-fleet-tanker.png",
      "alt": "A large oil tanker at sea under a grey sky, evoking France's seizure of a Russian shadow-fleet vessel.",
      "credit": "Wikimedia Commons"
    },
    "rank": 10,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pompey clears the sea of pirates (Plutarch, Life of Pompey)",
        "excerpt": "he divided the waters and the adjacent coasts of the Mediterranean Sea into thirteen districts, and assigned to each a certain number of ships with a commander, and with his forces thus scattered in all quarters he encompassed whole fleets of piratical ships that fell in his way, and straight-way hunted them down and brought them into port",
        "source": "Plutarch, Life of Pompey 26 (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:abo:tlg,0007,045:26"
      },
      {
        "category": "historical",
        "title": "Napoleon's Continental System: the Berlin Decree (1806)",
        "excerpt": "The British islands are declared in a state of blockade. All commerce and correspondence with the British islands are prohibited. In consequence, letters or packets, addressed either to England, to an Englishman, or in the English language, shall not pass through the post-office and shall be seized.",
        "source": "Berlin Decree of Napoleon I, 1806 (Teaching American History primary document)",
        "href": "https://teachingamericanhistory.org/document/berlin-decree/"
      },
      {
        "category": "literary",
        "title": "Jim Hawkins seizes the Hispaniola (Treasure Island)",
        "excerpt": "And, again dodging the boom, I ran to the colour lines, handed down their cursed black flag, and chucked it overboard. ... In three minutes I had the Hispaniola sailing easily before the wind along the coast of Treasure Island, with good hopes of turning the northern point ere noon, and beating down again as far as North Inlet before high water, when we might beach her safely and wait till the subsiding tide permitted us to land.",
        "source": "Robert Louis Stevenson, Treasure Island (1883), Chapter 25 'I Strike the Jolly Roger' (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Treasure_Island_(1883)/Chapter_25"
      },
      {
        "category": "literary",
        "title": "The pirate menace before Pompey (Plutarch, Life of Pompey)",
        "excerpt": "The ships of the pirates numbered more than a thousand, and the cities captured by them four hundred. They attacked and plundered places of refuge and sanctuaries hitherto inviolate, such as those of Claros, Didyma, and Samothrace; the temple of Chthonian Earth at Hermione; that of Asclepius in Epidaurus; those of Poseidon at the Isthmus, at Taenarum, and at Calauria; those of Apollo at Actium and Leucas; and those of Hera at Samos, at Argos, and at Lacinium.",
        "source": "Plutarch, Life of Pompey 24 (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:abo:tlg,0007,045:24"
      },
      {
        "category": "artistic",
        "title": "Wagner, Overture to Der fliegende Holländer (The Flying Dutchman), WWV 63",
        "excerpt": "Wagner's overture (composed 1840-41) conjures a raging North Sea storm, with churning strings and brass evoking a cursed ghost ship doomed to roam the waves. It is among the most vivid musical portraits of a vessel at the mercy of wind, sea, and fate, an apt echo of a tanker run to ground in the Atlantic.",
        "source": "Richard Wagner, Der fliegende Holländer, WWV 63 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Der_fliegende_Holl%C3%A4nder,_WWV_63_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Fighting Temeraire (1839)",
        "excerpt": "Turner's painting shows the once-mighty warship Temeraire, a veteran of Trafalgar, being towed by a small steam tug to be broken up, a ghostly old vessel hauled to its end against a blazing sunset. It is a meditation on a ship reaching the close of its working life, much like the aging hulls of the shadow fleet.",
        "source": "J. M. W. Turner, The Fighting Temeraire (1839), National Gallery, London (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg",
        "image": {
          "src": "/covers/france-seizes-russian-shadow-fleet-tanker--art.png",
          "alt": "J. M. W. Turner's 1839 painting The Fighting Temeraire, an old warship towed by a steam tug at sunset.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "merck-kgaa-buys-bio-techne",
    "headline": "Germany's Merck to buy US life-sciences firm Bio-Techne for about $11 billion",
    "overview": "Germany's Merck KGaA agreed to acquire US life-sciences company Bio-Techne in a deal valued at roughly $11 billion, expanding its tools-and-reagents business for biotech and pharmaceutical research. It is one of the largest acquisitions in the life-sciences supply sector this year.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOcWNaOGNZamhRcU9HZTBZWHcxSjN3WFNFcVhBNVNmeE1uYW5DRFJNcVpFQy1GZDZLS1ZfQmRmeUVJVjg3ZWtqVldBOFRuWE1sVEtwRjJ4WVFIYzhSQjJHTVNOM1JndmhmNUF3OFdXVkhtS1NaWUkyMk1zMjZTYlFJbjQ4WURocHdPN3d5NHM5eHhveEFlQjlaeHBKYWNmbXd0TS00UWF0OXVNbnZRMmtKQ3RtXzI?oc=5"
      },
      {
        "name": "Merck KGaA press release (via PR Newswire)",
        "href": "https://www.prnewswire.com/news-releases/merck-kgaa-darmstadt-germany-agrees-to-acquire-bio-techne-strengthening-leadership-position-in-fast-growing-life-sciences-markets-302810602.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/merck-kgaa-buys-bio-techne.png",
      "alt": "A laboratory bench with pipettes and sample vials, representing Merck's acquisition of life-sciences firm Bio-Techne.",
      "credit": "Wikimedia Commons"
    },
    "rank": 11,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Standard Oil Trust Agreement (1882)",
        "excerpt": "All of the property, real and personal, assets and business of each and all of the corporations and limited partnerships mentioned or embraced in class first, shall be transferred to and vested in the said several Standard Oil companies.",
        "source": "Standard Oil Trust Agreement of 1882, reprinted in Ida M. Tarbell, The History of the Standard Oil Company (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_History_of_the_Standard_Oil_Company/Volume_2/Appendix/Number_52"
      },
      {
        "category": "historical",
        "title": "Ida M. Tarbell, The History of the Standard Oil Company",
        "excerpt": "Tarbell's landmark account traces how a single firm grew into a colossus by absorbing rivals and folding their assets into one controlling structure, building an empire one acquisition at a time. Her chronicle remains the classic study of consolidation as a strategy for industrial dominance, a pattern echoed whenever a large company expands by buying up the suppliers and tools of an entire sector.",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/60692"
      },
      {
        "category": "literary",
        "title": "Robert Hooke, Micrographia (1665) — Preface",
        "excerpt": "By the means of Telescopes, there is nothing so far distant but may be represented to our view; and by the help of Microscopes, there is nothing so small, as to escape our inquiry; hence there is a new visible World discovered to the understanding.",
        "source": "Robert Hooke, Micrographia, Preface (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/15491"
      },
      {
        "category": "literary",
        "title": "Goethe, Faust — Faust's study monologue",
        "excerpt": "I've studied now Philosophy / And Jurisprudence, Medicine,— / And even, alas! Theology,— / From end to end, with labor keen; / And here, poor fool! with all my lore / I stand, no wiser than before... That I may detect the inmost force / Which binds the world, and guides its course; / Its germs, productive powers explore.",
        "source": "Johann Wolfgang von Goethe, Faust, trans. Bayard Taylor (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/14591"
      },
      {
        "category": "artistic",
        "title": "J. S. Bach, Die Kunst der Fuge (The Art of Fugue), BWV 1080",
        "excerpt": "Bach's final contrapuntal cycle takes a single musical subject and builds upon it voice by voice, fugue after fugue, each movement growing in complexity until many independent lines combine into one vast, unified structure. It is a study in how separate parts, joined under a common theme, can compound into something far greater than any one of them alone.",
        "source": "Die Kunst der Fuge, BWV 1080 (Bach, Johann Sebastian) — IMSLP",
        "href": "https://imslp.org/wiki/Die_Kunst_der_Fuge,_BWV_1080_(Bach,_Johann_Sebastian)"
      },
      {
        "category": "artistic",
        "title": "Joseph Wright of Derby, The Alchemist Discovering Phosphorus (1771)",
        "excerpt": "In a darkened laboratory crowded with glass vessels, an alchemist kneels before a flask of glowing phosphorus, his quest for transformation suddenly illuminating the night. Wright's painting captures the moment scientific tools and patient experiment yield discovery — the very enterprise of reagents, instruments and research that a life-sciences acquisition is built to serve.",
        "source": "Joseph Wright of Derby, The Alchemist Discovering Phosphorus (Wikimedia Commons file page)",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Wright_of_Derby_The_Alchemist.jpg",
        "image": {
          "src": "/covers/merck-kgaa-buys-bio-techne--art.png",
          "alt": "An alchemist kneels amid glassware in a dark vaulted chamber, lit by a flask of glowing phosphorus.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "pharrell-louis-vuitton-tidal-wave",
    "headline": "Pharrell Williams stages Louis Vuitton menswear show around a 37-metre water-powered wave in Paris",
    "overview": "Louis Vuitton creative director Pharrell Williams unveiled the house's Spring/Summer 2027 menswear collection in Paris on a set built around a 37-metre-wide wave structure powered by cascading water. The spectacle, staged during Paris Fashion Week, continued the brand's run of elaborate runway scenography.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/25/jumbo-tidal-wave-louis-vuitton-menswear-show/"
      },
      {
        "name": "Wallpaper*",
        "href": "https://www.wallpaper.com/fashion-beauty/louis-vuitton-ss-2027-set-pharrell-williams"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/pharrell-louis-vuitton-tidal-wave.png",
      "alt": "A towering wave structure cascading with water as the backdrop of a Louis Vuitton fashion show in Paris.",
      "credit": "AI-generated"
    },
    "rank": 12,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Suetonius records Augustus flooding Rome for a mock naval battle",
        "excerpt": "He entertained the people with wrestlers in the Campus Martius, where wooden seats were erected for the purpose; and also with a naval fight, for which he excavated the ground near the Tiber, where there is now the grove of the Caesars.",
        "source": "Suetonius, Life of Augustus 43 (Perseus Digital Library)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0132%3Alife%3Daug.%3Achapter%3D43"
      },
      {
        "category": "historical",
        "title": "Cassius Dio on the staged sea battle of Persians and Athenians",
        "excerpt": "a naval battle between the 'Persians' and the 'Athenians' was given on the spot where even to-day some relics of it are still pointed out. These were the spectacles, and the 'Athenians' prevailed as of old.",
        "source": "Cassius Dio, Roman History, Book 55 (LacusCurtius / University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/55*.html"
      },
      {
        "category": "literary",
        "title": "Byron's apostrophe to the ocean in Childe Harold's Pilgrimage",
        "excerpt": "Roll on, thou deep and dark blue Ocean--roll!\nTen thousand fleets sweep over thee in vain;\nMan marks the earth with ruin--his control\nStops with the shore;--upon the watery plain\nThe wrecks are all thy deed, nor doth remain\nA shadow of man's ravage, save his own,\nWhen for a moment, like a drop of rain,\nHe sinks into thy depths with bubbling groan,\nWithout a grave, unknelled, uncoffined, and unknown.",
        "source": "Lord Byron, Childe Harold's Pilgrimage, Canto IV, stanza CLXXIX (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/5131/pg5131.txt"
      },
      {
        "category": "literary",
        "title": "Tennyson's 'Break, break, break' on the restless sea",
        "excerpt": "Break, break, break,\n    On thy cold gray stones, O Sea!\nAnd I would that my tongue could utter\n    The thoughts that arise in me.\n\nO well for the fisherman's boy,\n    That he shouts with his sister at play!\nO well for the sailor lad,\n    That he sings in his boat on the bay!\n\nAnd the stately ships go on\n    To their haven under the hill;\nBut O for the touch of a vanish'd hand,\n    And the sound of a voice that is still!\n\nBreak, break, break,\n    At the foot of thy crags, O Sea!\nBut the tender grace of a day that is dead\n    Will never come back to me.",
        "source": "Alfred Tennyson, 'Break, break, break', Poems (1843) Vol. 2 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Poems_(Tennyson,_1843)/Volume_2/Break,_break,_break"
      },
      {
        "category": "artistic",
        "title": "Debussy's 'La Mer', the sea rendered as orchestral motion",
        "excerpt": "Debussy's three symphonic sketches translate the ocean into sound, moving from the slow brightening of 'From dawn to noon on the sea' through the glittering, broken rhythms of 'Play of the waves' to the surging climax of 'Dialogue of the wind and the sea'. The score conjures water as something alive and shifting, swelling and collapsing rather than fixed, a fitting echo of a cascading wall of water built as runway spectacle.",
        "source": "Claude Debussy, La mer, CD 111 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/La_mer,_CD_111_(Debussy,_Claude)"
      },
      {
        "category": "artistic",
        "title": "Hokusai's 'The Great Wave off Kanagawa'",
        "excerpt": "Hokusai's woodblock print frames a single towering wave, its clawed crest of foam reared above tiny boats while Mount Fuji sits small and serene in the distance. Made around 1831 for the series Thirty-six Views of Mount Fuji, it has become the defining image of the wave in world art, the obvious visual ancestor of any monumental wave staged for spectacle.",
        "source": "Katsushika Hokusai, The Great Wave off Kanagawa, c. 1831 (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/pharrell-louis-vuitton-tidal-wave--art.png",
          "alt": "Katsushika Hokusai's woodblock print The Great Wave off Kanagawa, a towering foam-crested wave above boats with Mount Fuji behind",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "artist-accused-copying-basquiat",
    "headline": "Australian artist accused of copying Jean-Michel Basquiat in prizewinning paintings",
    "overview": "Australian artist Jane Allan is facing allegations that she closely imitated the work of American neo-expressionist Jean-Michel Basquiat and the late artist Nicholas Harding in two paintings that won prizes. The claims have reignited debate over originality, influence and appropriation in contemporary art.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/prizewinning-artist-accused-of-copying-jean-michel-basquiat-1234753259/"
      },
      {
        "name": "The Canberra Times",
        "href": "https://www.canberratimes.com.au/story/9298021/jane-allan-painting-faces-gallery-probe-after-art-copy-claims/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/artist-accused-copying-basquiat.png",
      "alt": "An artist's studio with paintings and brushes, evoking a dispute over originality and imitation in contemporary art.",
      "credit": "Artforum"
    },
    "rank": 13,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Han van Meegeren, the forger who fooled the experts with fake Vermeers",
        "excerpt": "Dismissed by critics as derivative, the Dutch painter Han van Meegeren set out to prove his genius by forging Dutch Old Masters. His 1937 The Supper at Emmaus was hailed as a lost Vermeer masterpiece and bought for a fortune. Only at his 1947 trial, when an expert commission found 20th-century synthetic resin in the paint, was the deception exposed, turning a question of authenticity into a national sensation.",
        "source": "Wikipedia (Han van Meegeren)",
        "href": "https://en.wikipedia.org/wiki/Han_van_Meegeren"
      },
      {
        "category": "historical",
        "title": "Michelangelo's forged 'sleeping Cupid', artfully aged to pass as antique",
        "excerpt": "Around 1496 the young Michelangelo carved a marble sleeping Cupid and buried it in acidic earth to give it the look of a buried antique so it would fetch a higher price. It was sold as a genuine ancient relic to Cardinal Raffaello Riario, who demanded his money back on discovering the deception, yet was so struck by the artist's skill that he became one of Michelangelo's first patrons, an early case of imitation prized until its true, modern hand was revealed.",
        "source": "The Museum of Hoaxes",
        "href": "https://hoaxes.org/archive/permalink/michelangelos_cupid"
      },
      {
        "category": "literary",
        "title": "Seneca: imitation as bees gathering nectar to make a new honey",
        "excerpt": "We also, I say, ought to copy these bees, and sift whatever we have gathered from a varied course of reading, for such things are better preserved if they are kept separate; then, by applying the supervising care with which our nature has endowed us,—in other words, our natural gifts,—we should so blend those several flavours into one delicious compound that, even though it betrays its origin, yet it nevertheless is clearly a different thing from that whence it came.",
        "source": "Seneca, Moral Letters to Lucilius, Letter 84 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_84"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde on art, the artist, and the mirror of Caliban",
        "excerpt": "The artist is the creator of beautiful things. To reveal art and conceal the artist is art's aim. ... The nineteenth century dislike of realism is the rage of Caliban seeing his own face in a glass. The nineteenth century dislike of romanticism is the rage of Caliban not seeing his own face in a glass. ... All art is at once surface and symbol. Those who go beneath the surface do so at their peril.",
        "source": "Oscar Wilde, Preface to The Picture of Dorian Gray (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/174/pg174.txt"
      },
      {
        "category": "artistic",
        "title": "Brahms, Variations on a Theme by Haydn, borrowing turned to invention",
        "excerpt": "Brahms took a theme he believed was Haydn's, the so-called St. Anthony Chorale, and spun it into eight variations and a grand passacaglia finale (Op. 56, 1873). The work is a celebrated demonstration that borrowing another's material can be the seed of wholly original art, the very line that separates homage from copying now disputed in Jane Allan's case.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Variations_on_a_Theme_by_Haydn,_Op.56_(Brahms,_Johannes)"
      },
      {
        "category": "artistic",
        "title": "Vermeer's Girl with a Pearl Earring, an anchor for the question of authenticity",
        "excerpt": "Johannes Vermeer's luminous tronie became the touchstone of authenticity that forgers like Han van Meegeren tried to counterfeit. Its singular, unrepeatable hand stands as a measure against which imitation is judged, a fitting emblem for a debate over whether a prizewinning painting is influence or copy.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Meisje_met_de_parel.jpg",
        "image": {
          "src": "/covers/artist-accused-copying-basquiat--art.png",
          "alt": "Johannes Vermeer, Girl with a Pearl Earring, c. 1665, oil on canvas.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "colombia-de-la-espriella-wins-runoff",
    "headline": "Far-right lawyer Abelardo de la Espriella wins Colombia's presidential runoff by a razor-thin margin",
    "overview": "Right-wing lawyer Abelardo de la Espriella, a Trump-endorsed outsider known as “El Tigre,” narrowly won Colombia's presidential runoff with 49.7 percent of the vote to leftist senator Iván Cepeda's 48.7 percent. The result, decided by about one percentage point, hands the presidency to a combative populist and deepens the country's political divide. President Trump congratulated him on social media.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNZHhSUnh5OTJITFRKQ0FNTEZPOFM5ZTlKdmNiY2hMN3F3WUN2S3ZCT0JpWGc2SW9WQ3JUWUs0T2poOHBUMTVmaU9Ec3pSa01aWTVxdDlodXUxWFZwYUlMUUh3VElBa1FEenhfQmxTQTdOQkhCZk9BaGZXUl85YVZ1MDJDX2gwR1JzNmxtS1BPeWlXcXE5WDFTbF9CQ2pFOTZSaFI3S1UtX0UyRURnbFFkLTlRUnI?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/06/21/americas/colombia-trump-abelardo-de-la-espriella-intl-latam"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/colombia-de-la-espriella-wins-runoff.png",
      "alt": "A dim polling station at night as officials count paper ballots under a hanging lamp during a tightly contested election.",
      "credit": "AI-generated"
    },
    "lead": true,
    "rank": 14,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Eighteenth Brumaire of Louis Bonaparte",
        "excerpt": "Hegel remarks somewhere that all great world-historic facts and personages appear, so to speak, twice. He forgot to add: the first time as tragedy, the second time as farce.",
        "source": "Marxists Internet Archive",
        "href": "https://www.marxists.org/archive/marx/works/1852/18th-brumaire/ch01.htm"
      },
      {
        "category": "historical",
        "title": "Act Creating an Electoral Commission, January 29, 1877",
        "excerpt": "decide whether any and what votes from such State are the votes provided for by the Constitution",
        "source": "The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/19th_century/elect01.asp"
      },
      {
        "category": "literary",
        "title": "Plato, Republic, Book VIII",
        "excerpt": "This and no other is the root from which a tyrant springs; when he first appears above ground he is a protector.",
        "source": "The Internet Classics Archive",
        "href": "https://classics.mit.edu/Plato/republic.9.viii.html"
      },
      {
        "category": "literary",
        "title": "Aristophanes, The Knights",
        "excerpt": "The demagogues will neither have an educated nor an honest man; they require an ignoramus and a rogue.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/8688/pg8688.txt"
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Boris Godunov (Coronation Scene)",
        "excerpt": "Mussorgsky's opera opens on a fearful, divided people herded to acclaim a new ruler whose power was seized over a buried rival. The Coronation bells peal in triumph, yet Boris steps forward already haunted, knowing the throne rests on blood and that the realm he inherits is a land of troubles split against itself.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "George Caleb Bingham, The County Election",
        "excerpt": "Bingham paints democracy at its raw and partisan edge: a crowd of citizens jostles before the polling steps, electioneers ply voters with drink and persuasion, and the contest's outcome hangs on the swayable will of an ordinary, deeply divided crowd.",
        "source": "Saint Louis Art Museum",
        "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_County_Election.jpg",
        "image": {
          "src": "/covers/colombia-de-la-espriella-wins-runoff--art.png",
          "alt": "George Caleb Bingham's painting The County Election, showing a crowd of citizens gathered at a polling place as candidates and electioneers court voters",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "japan-iwate-earthquake",
    "headline": "Magnitude 7.2 earthquake strikes off northern Japan; no tsunami warning issued",
    "overview": "A magnitude 7.2 earthquake struck off the coast of Iwate in northern Japan on Thursday morning, injuring about ten people and briefly halting the Tohoku Shinkansen line. Japan's Meteorological Agency issued no tsunami warning, and nuclear facilities including the Fukushima Daiichi plant reported no abnormalities.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMijAFBVV95cUxONk9vbDNHSXF5NUU2MGh1eFBaZzJnRktPMUNjZGtObFl2azNGemw4Ym14NW1RMlZaRXRSLU5ZdDk0VFJGNE9EemxiQ2RKdkFVZTJnOGdoTWlzVWpVa25leEV5WXl4bDlPY2VqdUhodU9YanktSnRubzh6SG8xWlhRUVhFWDl3UU85ckVQWg?oc=5"
      },
      {
        "name": "The Japan Times",
        "href": "https://www.japantimes.co.jp/news/2026/06/25/japan/tohoku-strong-earthquake/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/japan-iwate-earthquake.png",
      "alt": "A quiet Japanese coastal town at dawn seen from a hillside, the calm grey sea beyond a harbour.",
      "credit": "AI-generated"
    },
    "rank": 15,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nihongi (Chronicles of Japan), Book XXIX: the great earthquake of A.D. 684",
        "excerpt": "At the hour of the boar (10 p.m.) there was a great earthquake. Throughout the country men and women shrieked aloud, and knew not East from West. Mountains fell down and rivers gushed forth; the official buildings of the provinces and districts, the barns and houses of the common people, the temples, pagodas and shrines were destroyed in numbers which surpass all estimate. In consequence many of the people and of domestic animals were killed or injured. The hot springs of Iyo were dried up at this time and ceased to flow. In the province of Tosa more than 500,000 shiro of cultivated land were swallowed up and became sea.",
        "source": "Nihongi: Chronicles of Japan from the Earliest Times to A.D. 697, trans. W. G. Aston (1896), Book XXIX (reign of Emperor Temmu)",
        "href": "https://en.wikisource.org/wiki/Nihongi/Book_XXIX"
      },
      {
        "category": "historical",
        "title": "Rev. Charles Davy, eyewitness account of the 1755 Lisbon earthquake",
        "excerpt": "Being instantly stunned with a most horrid crash, as if every edifice in the city had tumbled down at once.",
        "source": "Rev. Charles Davy, \"The Earthquake at Lisbon, 1755,\" in Letters Addressed to a Young Gentleman upon Subjects of Literature (1787); Internet History Sourcebook, Fordham University",
        "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp"
      },
      {
        "category": "literary",
        "title": "Voltaire, Candide, Chapter V: the earthquake at Lisbon",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, Candide (1759), Chapter V; Project Gutenberg",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "literary",
        "title": "Lafcadio Hearn, \"A Living God\" (Gleanings in Buddha-Fields)",
        "excerpt": "It seemed to be moving against the wind. It was running away from the land.",
        "source": "Lafcadio Hearn, Gleanings in Buddha-Fields: Studies of Hand and Soul in the Far East (1897), \"A Living God\"; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/55681/pg55681-images.html"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, \"Il Terremoto\" (The Earthquake), finale of The Seven Last Words of Christ",
        "excerpt": "Haydn closes his 1786 orchestral meditation with a single shattering movement marked Presto e con tutta la forza. After the long stillness of the Cross, the strings convulse in the work's only fortississimo, depicting the earth that quaked and the rocks that rent at the moment of death. It is music as seismic shock: the ground itself rising up in violence after a held, fragile peace.",
        "source": "Joseph Haydn, Die Worte des Erlösers am Kreuze (The Seven Last Words of Christ), Hob.XX:1 (1786), Mvt. \"Il Terremoto\"; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Worte_des_Erl%C3%B6sers_am_Kreuze,_Hob.XX:1_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Katsushika Hokusai, \"Under the Wave off Kanagawa\" (The Great Wave)",
        "excerpt": "In Hokusai's woodblock print from the early 1830s, a towering wave curls its clawed crest over three slender boats while a small, snow-capped Mount Fuji sits unmoved in the distance. The sea is rendered as a living, indifferent force, dwarfing the fishermen who cling to their hulls. It is the enduring image of Japan's life atop the fault line: human craft suspended in the instant before nature's overwhelming power.",
        "source": "Katsushika Hokusai, Under the Wave off Kanagawa (Kanagawa oki nami ura), from Thirty-Six Views of Mount Fuji, c. 1830–32; The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/60013238",
        "image": {
          "src": "/covers/japan-iwate-earthquake--art.png",
          "alt": "A giant cresting wave with foam like claws towers over small boats, with Mount Fuji small in the distance",
          "credit": "Katsushika Hokusai, Under the Wave off Kanagawa (The Great Wave), c. 1830–32, The Metropolitan Museum of Art (accession JP1847); via Wikimedia Commons, public domain"
        }
      }
    ]
  },
  {
    "slug": "super-puff-planets-discovered",
    "headline": "Astronomers discover the largest “super-puff” planets yet, lighter than cotton candy",
    "overview": "Astronomers have found a pair of Jupiter-sized exoplanets so diffuse that they are less dense than cotton candy, orbiting a star about 1,110 light-years away. Likely composed mostly of hydrogen and helium, they are the lightest planets of their size yet discovered; one researcher likened their density to “a nice blob of shaving foam.” Follow-up observations with the Webb telescope may confirm their makeup.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxQNTVmM3N0S2tqR2RvNmd4MGg1NzBKaXQxOUpIMWxSa3ByZmdRaHlPMGNnLTNhOHpxVUtZZ0cxaUlRRy01Q285TEIwSlNJVlE5LU5OWU1VTGlOQXpHVE1Tcmc5OEJDZzd1MTU2NVVJRkVsRG5QOFh5ZzBabXdDWUd4UnM4Ny1zTFAzTEVxR1hIQ3ZPdXFkMzVONlpQSVhXTXRkbDN6ampjdw?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/health/2026/06/24/super-puffs-cotton-candy-giant-light-planets/171f3766-7032-11f1-8730-e7fd0e2a6404_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/super-puff-planets-discovered.png",
      "alt": "Artist's impression of a super-puff exoplanet, a giant low-density world, against a field of stars.",
      "credit": "Pablo Carlos Budassi / Wikimedia Commons"
    },
    "rank": 16,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Galileo, The Sidereal Messenger (Sidereus Nuncius, 1610)",
        "excerpt": "By the aid of a telescope any one may behold this in a manner which so distinctly appeals to the senses that all the disputes which have tormented philosophers through so many ages are exploded at once by the irrefragable evidence of our eyes. The Galaxy is nothing else but a mass of innumerable stars planted together in clusters. Upon whatever part of it you direct the telescope straightway a vast crowd of stars presents itself to view.",
        "source": "Galileo Galilei, The Sidereal Messenger, trans. Edward Stafford Carlos (1880), via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/46036/46036-h/46036-h.htm"
      },
      {
        "category": "historical",
        "title": "Camille Flammarion, Astronomy for Amateurs",
        "excerpt": "According to all the probabilities, universal life is distributed there as well as here, and has sown the germ of intelligence upon those distant worlds that we divine in the vicinity of the innumerable suns that plow the ether, for everything upon the Earth tends to show that Life is the goal of Nature.",
        "source": "Camille Flammarion, Astronomy for Amateurs, trans. Frances A. Welby, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/25267/25267-h/25267-h.htm"
      },
      {
        "category": "literary",
        "title": "Lucretius, On the Nature of Things, Book II",
        "excerpt": "'Tmust be confessed in other realms there are / Still other worlds, still other breeds of men, / And other generations of the wild. / Hence too it happens in the sum there is / No one thing single of its kind in birth, / And single and sole in growth.",
        "source": "Lucretius, De Rerum Natura, Book II, trans. William Ellery Leonard (1916), via Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0131:book=2:card=1048"
      },
      {
        "category": "literary",
        "title": "Cyrano de Bergerac, A Voyage to the Moon",
        "excerpt": "I believe, that the Moon is a World like ours, to which this of ours serves likewise for a Moon. And perhaps, (Gentlemen) just so they laugh now in the Moon, at some who maintain, That this Globe, where we are, is a World.",
        "source": "Cyrano de Bergerac, A Voyage to the Moon, trans. A. Lovell, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/46547/46547-h/46547-h.htm"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, The Planets, Op. 32 (1914-1916) - Jupiter, the Bringer of Jollity",
        "excerpt": "Holst's seven-movement orchestral suite gives each planet a character and a sound, conjuring whole worlds out of orchestral color. Jupiter swells into broad, buoyant jollity while Neptune, the Mystic dissolves into a wordless offstage chorus that seems to drift weightlessly into deep space, an apt music for planets lighter than cotton candy.",
        "source": "Gustav Holst, The Planets, Op. 32, full scores and parts via IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, The Starry Night (1889)",
        "excerpt": "Painted from the window of his asylum room at Saint-Remy, Van Gogh turned the night sky into churning rivers of light, the stars swelling into luminous haloes and the heavens rendered as something fluid and alive rather than fixed and solid. The cosmos here is all motion and diffuse glow, a vision of celestial matter so airy it seems to swirl like foam.",
        "source": "Vincent van Gogh, The Starry Night (1889), Museum of Modern Art, New York; image via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/super-puff-planets-discovered--art.png",
          "alt": "Vincent van Gogh's The Starry Night (1889): a swirling, luminous night sky with glowing stars and a crescent moon over a sleeping village and a dark cypress tree.",
          "credit": "Vincent van Gogh, The Starry Night (1889), Museum of Modern Art, New York. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "carone-adams-bribery-charges",
    "headline": "Former chief of staff to ex-NYC mayor Eric Adams charged in federal bribery scheme",
    "overview": "Frank Carone, the former chief of staff to ex-New York Mayor Eric Adams, was arrested and charged in a federal bribery case in Brooklyn. Prosecutors allege he accepted about $120,000 in bribes to steer a multimillion-dollar emergency migrant-shelter hotel contract; three others were also charged. Adams himself was not accused of wrongdoing.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxNd05pNklWOUpaeUQxYnpybGMtYUdyYkE4SUJ2UEc4eS1pT0hxTTJGRjNQTEctR2R0ZjFDcXNIaE5KSTVvSWstRDN6MjdRLTAxcHZNN09ON3FXSWxBbjlvZVlnWm5LZl9JS2h3Z0VzeUxxcDZaQ3BESTlXcV9uQVBoejBuQTNjUXpxUjdCbURNNGxsY09NT25HRjVpR1lCTkpI?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://www.nbcnews.com/news/us-news/eric-adams-adviser-frank-carone-arrested-fbi-alleged-bribery-scheme-so-rcna351533"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/carone-adams-bribery-charges.png",
      "alt": "An empty marble courthouse corridor at dusk, tall columns and a polished floor lit by a shaft of cold light.",
      "credit": "AI-generated"
    },
    "rank": 17,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, The First Oration Against Verres (70 BC)",
        "excerpt": "For an opinion has now become established, pernicious to us, and pernicious to the republic, which has been the common talk of every one, not only at Rome, but among foreign nations also,—that in the courts of law as they exist at present, no wealthy man, however guilty he may be, can possibly be convicted.",
        "source": "Cicero, In Verrem, First Pleading, trans. C. D. Yonge (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0018:text=Ver.:actio=1"
      },
      {
        "category": "historical",
        "title": "Thomas Nast, \"Who Stole the People's Money? — 'Twas Him\" (Harper's Weekly, 1871)",
        "excerpt": "At the height of the Tweed Ring's plunder of New York's treasury, Nast drew the Tammany insiders in a ring, each pointing the finger at the man beside him. The cartoon made the machine's graft legible to voters who could not read the indictments, and helped bring down a city government built on padded contracts and kickbacks.",
        "source": "Thomas Nast, Harper's Weekly, August 19, 1871 (Library of Congress copy, via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Two_great_questions._%22Who_is_Ingersoll%27s_Co.%3F_-_%22Who_stole_the_people%27s_money%3F_-_Th._Nast._LCCN2006685392.jpg"
      },
      {
        "category": "literary",
        "title": "Dante, Inferno, Canto XXI — the barrators boiled in pitch",
        "excerpt": "As in the Arsenal of the Venetians / Boils in the winter the tenacious pitch / To smear their unsound vessels o'er again, / For sail they cannot; and instead thereof / One makes his vessel new, and one recaulks / The ribs of that which many a voyage has made.",
        "source": "Dante Alighieri, Inferno, Canto XXI, trans. Henry Wadsworth Longfellow (1867), Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_21"
      },
      {
        "category": "literary",
        "title": "Gogol, The Inspector-General (1836)",
        "excerpt": "AMMOS (the Judge): \"I tell everyone plainly that I take bribes. I make no bones about it. But what kind of bribes? White greyhound puppies. That's quite a different matter.\"",
        "source": "Nikolai Gogol, The Inspector-General, trans. Thomas Seltzer (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/3735/3735-h/3735-h.htm"
      },
      {
        "category": "artistic",
        "title": "John Gay, The Beggar's Opera (1728) — Peachum's opening air",
        "excerpt": "Through all the Employments of Life / Each Neighbour abuses his Brother; / Whore and Rogue they call Husband and Wife: / All Professions be-rogue one another: / The Priest calls the Lawyer a Cheat, / The Lawyer be-knaves the Divine: / And the Statesman, because he's so great, / Thinks his Trade as honest as mine.",
        "source": "John Gay, The Beggar's Opera, Air I (Peachum), music arr. J. C. Pepusch (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2421/pg2421.html"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, Canvassing for Votes (1754–1755)",
        "excerpt": "In the second scene of Hogarth's election series, rival party agents crowd around a country innkeeper, each pressing money and favors into his hands to buy his vote. The painting turns the everyday transaction of bribery into a stage on which the whole machinery of corrupt influence — the cash, the flattery, the broker in the middle — is laid bare.",
        "source": "William Hogarth, Canvassing for Votes (Humours of an Election, plate 2), Sir John Soane's Museum, London",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_032.jpg",
        "image": {
          "src": "/covers/carone-adams-bribery-charges--art.png",
          "alt": "William Hogarth's painting Canvassing for Votes, showing party agents bribing a country innkeeper for his vote outside an inn.",
          "credit": "William Hogarth, Canvassing for Votes (1754–1755), Sir John Soane's Museum, London. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "anduril-nissan-plant-drones",
    "headline": "US defense firm Anduril in talks to turn a Nissan car plant in Japan into a drone factory",
    "overview": "The American defense company Anduril is in talks to acquire Nissan's Oppama plant near Tokyo — the birthplace of the Leaf electric car — to manufacture military drones, sources told Reuters. The move comes as Japan expands defense production amid concern that a Taiwan crisis could draw it into war, and would convert a postwar symbol of peaceful industry into an arms works.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxNdHM1ajZmSGx3RkRERFNvczBoaGU3cEVucUVHZk1ON2lwUml3N3FuNzJCalg3VEloRE5hVjlhTEkzbmxRZkhyOVhzTXMwdFZsYzhUMFJoZlhkNkJkaldkZm9hbmQzNXpzZWxpNkNJZjBERTFXTkpGbWlyYUNuckFJX0kwNlhaLVNybkVqY010aW5kb2hJYm5yRjNwdWk4TUpBYzVvQ3VQVm95eVpnRm9lbmZwdEt3UlRSMFNCaHVKRkNNdEFlZFpj?oc=5"
      },
      {
        "name": "Investing.com",
        "href": "https://www.investing.com/news/stock-market-news/exclusiveus-defence-firm-anduril-in-talks-for-nissan-plant-to-build-drones-in-japan-sources-say-4759729"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/anduril-nissan-plant-drones.png",
      "alt": "The vast empty floor of a shuttered automobile assembly hall with idle robotic arms beneath skylights.",
      "credit": "AI-generated"
    },
    "rank": 18,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Franklin D. Roosevelt, \"Arsenal of Democracy\" Fireside Chat (Dec. 29, 1940)",
        "excerpt": "Manufacturers of watches, of farm implements, of linotypes and cash registers, of automobiles and sewing machines and lawn mowers and locomotives, are now making fuses and bomb packing crates and telescope mounts and shells and pistols and tanks. ... We must be the great arsenal of democracy.",
        "source": "Franklin D. Roosevelt, Fireside Chat (radio address), December 29, 1940 — The American Presidency Project (UC Santa Barbara)",
        "href": "https://www.presidency.ucsb.edu/documents/fireside-chat-9"
      },
      {
        "category": "historical",
        "title": "The Willow Run Bomber Plant: a carmaker turned to war (Ford, Michigan, 1942)",
        "excerpt": "Production. Willow Run bomber plant. Spot welding parts for the nacelle of an aircraft engine. These women work in the largest one-story building in the works, the giant bomber plant at Willow Run, Michigan. Ford plant, Willow Run.",
        "source": "U.S. Office of War Information photograph, 1942 — Library of Congress, FSA/OWI Collection (public domain)",
        "href": "https://www.loc.gov/item/2017693349/"
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book XVIII — Vulcan kindles his forge to arm Achilles (Pope translation)",
        "excerpt": "Soon as he bade them blow, the bellows turned\nTheir iron mouths, and, where the furnace burned,\nResounding breathed: at once the blast expires,\nAnd twenty forges catch at once the fires;\nJust as the god directs, now loud, now low,\nThey raise a tempest, or they gently blow.",
        "source": "Homer, The Iliad of Homer, trans. Alexander Pope, Book 18 — Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_18"
      },
      {
        "category": "literary",
        "title": "Virgil, The Aeneid, Book VIII — the Cyclops at Vulcan's forge hammer out arms (Dryden translation)",
        "excerpt": "Sacred to Vulcan's name, an isle there lay,\nBetwixt Sicilia's coasts and Lipare,\nRais'd high on smoking rocks; and, deep below,\nIn hollow caves the fires of Aetna glow.\nThe Cyclops here their heavy hammers deal;\nLoud strokes, and hissings of tormented steel,\nAre heard around; the boiling waters roar,\nAnd smoky flames thro' fuming tunnels soar.",
        "source": "Virgil, The Aeneid, trans. John Dryden, Book VIII — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez, \"Apollo in the Forge of Vulcan\" (1630)",
        "excerpt": "Velázquez catches the instant peace is interrupted by news of war: radiant Apollo steps into the smoke-blackened smithy where Vulcan and his half-naked workmen are beating armor on the anvil. Tools, glowing iron, and a half-finished breastplate fill the dim workshop, and the laborers freeze mid-stroke, their honest industry abruptly bent to the making of weapons. The everyday forge becomes, in a heartbeat, a manufactory of arms.",
        "source": "Diego Velázquez, La fragua de Vulcano (The Forge of Vulcan), oil on canvas, 1630 — Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/anduril-nissan-plant-drones--art.png",
          "alt": "Velázquez's painting of Apollo arriving at Vulcan's forge, where smiths pause from hammering armor on an anvil amid glowing fire and tools.",
          "credit": "Diego Velázquez, The Forge of Vulcan (1630), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Franz Schubert, 3 Marches militaires, D. 733 (No. 1 in D major)",
        "excerpt": "Schubert's crisp, strutting Marche militaire turns the cadence of the parade ground into music: a brisk dotted rhythm drives forward with the unstoppable confidence of marshaled ranks. Once a domestic piece for piano four hands, it has marched into a thousand arrangements for full military band, the sound of a peaceful drawing room reshaped into the swagger of an army on the move.",
        "source": "Franz Schubert, 3 Marches militaires, D. 733 (composed c. 1818) — full scores at IMSLP / Petrucci Music Library (public domain)",
        "href": "https://imslp.org/wiki/3_Marches_militaires,_D.733_(Schubert,_Franz)"
      }
    ]
  },
  {
    "slug": "iraq-weighs-opec-exit",
    "headline": "Iraq, a founding OPEC member, weighs leaving the cartel unless its oil quota is raised",
    "overview": "Iraq, one of OPEC's five founding members and its second-largest producer, has weighed leaving the group unless its production quota is sharply increased, sources told Reuters. A financial crisis deepened by the Iran war is pushing Baghdad to seek to pump far more oil. The United Arab Emirates already quit the cartel earlier this year.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxQNGtxVmo4OG9QRVAyTjJvcGpWUVFzWlJaZEhHSHBsazFQRWZxZXllakNTM2FXN2FxZjhialVFN0o1aW1DY2t1Q2JucHZRNlkzRHk4MFpCeGdOaHpEUXhRVVZSWEtGRDhfTGVKX3lyX1dqZ2tmYjg3QmtTWXMwVS1vNXlTVDRQeFVzakd3WXVuaGplbWdqY0JQUzhtcV9HSWRvSU1CUlp3aW5nYmdZbHNLeDJ2Tk5mZVhHLXh6S3AyZVFZS1ktWUg4X0J3?oc=5"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2648527/middle-east"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/iraq-weighs-opec-exit.png",
      "alt": "A lone oil derrick and storage tanks silhouetted against a hazy desert sunset, a single road leading away.",
      "credit": "AI-generated"
    },
    "rank": 19,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Mytilene revolts from the Delian League (428 BC)",
        "excerpt": "So it was more for fear than love that we remained their confederates; and whereas in others good will assureth loyalty, in us it was the effect of fear.",
        "source": "Thucydides, History of the Peloponnesian War, Book 3.12 (Crawley/Hobbes translation)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0247:book%3D3:chapter%3D12"
      },
      {
        "category": "historical",
        "title": "South Carolina dissolves the Union (1860)",
        "excerpt": "We, therefore, the People of South Carolina, by our delegates in Convention assembled, ... have solemnly declared that the Union heretofore existing between this State and the other States of North America, is dissolved, and that the State of South Carolina has resumed her position among the nations of the world, as a separate and independent State.",
        "source": "Declaration of the Immediate Causes Which Induce and Justify the Secession of South Carolina (1860), Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/19th_century/csa_scarsec.asp"
      },
      {
        "category": "literary",
        "title": "Achilles withdraws from the alliance over his share of the spoils",
        "excerpt": "Now I will go back to Phthia, since it is far better to return home with my beaked ships, nor do I intend while I am here dishonoured to pile up riches and wealth for you.",
        "source": "Homer, Iliad, Book 1 (A. T. Murray translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book%3D1:card%3D148"
      },
      {
        "category": "literary",
        "title": "Esau sells his birthright (Genesis 25)",
        "excerpt": "And Jacob said, Sell me this day thy birthright. And Esau said, Behold, I am at the point to die: and what profit shall this birthright do to me? And Jacob said, Swear to me this day; and he sware unto him: and he sold his birthright unto Jacob.",
        "source": "Genesis 25:31-33, King James Bible, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis/Chapter_25"
      },
      {
        "category": "artistic",
        "title": "Wagner, Götterdämmerung — the broken oaths and the curse of the gold",
        "excerpt": "The final music-drama of the Ring closes the cycle in which a hoard of gold, seized and cursed, binds gods and mortals to oaths they cannot keep. Treaties of self-interest fracture, blood-brotherhood is betrayed, and the order founded on the treasure consumes itself in flame. The collective built on the gold cannot survive each party's pursuit of it.",
        "source": "Richard Wagner, Götterdämmerung, WWV 86D (full score), IMSLP",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Konstantin Bogaevsky, Baku Oil Fields (1930)",
        "excerpt": "A forest of wooden derricks crowds the oil-soaked littoral, the industrial landscape stretching to the horizon under a heavy sky. The painting renders petroleum as the very ground a state stands on — the lifeblood that fortunes and conflicts are pumped from.",
        "source": "Konstantin Bogaevsky, Baku Oil Fields (1930), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:%D0%9A.%D0%92._%D0%91%D0%BE%D0%B3%D0%B0%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9._%D0%91%D0%B0%D0%BA%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B5_%D0%BD%D0%B5%D1%84%D1%82%D1%8F%D0%BD%D1%8B%D0%B5_%D0%BF%D1%80%D0%BE%D0%BC%D1%8B%D1%81%D0%BB%D1%8B._1930.jpg",
        "image": {
          "src": "/covers/iraq-weighs-opec-exit--art.png",
          "alt": "Konstantin Bogaevsky's 1930 painting of the Baku oil fields, a dense landscape of derricks along the Caspian shore",
          "credit": "Konstantin Bogaevsky, Baku Oil Fields (1930), public domain, via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "south-africa-world-cup-knockouts",
    "headline": "South Africa beats South Korea 1-0 to reach the World Cup knockout stage for the first time",
    "overview": "South Africa's Bafana Bafana defeated South Korea 1-0 on a 63rd-minute goal by Thapelo Maseko to reach the World Cup knockout rounds for the first time in the nation's history. The victory carries them out of the group stage and into a meeting with co-hosts Canada.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNMWVQYXowNWpLdmVlNEtnOXdUdC03YkNPNGJqclpiZzYwR3JCaUhSZVNQekdyTTFxUXQzNmlERFJMaGZZQWtGdzJORTctLVNtaTBQS2VGQmNaM2p2a04xNFhXZjJFdjl2Q3B1c3FlRjMzTmw5WFhEN012STRMNnRZdl9GRFN1dHkzN0NRMG96UVdwQVB0V2V1TEFaMDI2Zl9MZ0Z6VFM0eng5WGlfQnprdWt0Q3V0SkpNWEVJMlJB?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/sports/2026/6/25/south-africa-stun-south-korea-to-reach-world-cup-knockouts-for-the-first-time"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/south-africa-world-cup-knockouts.png",
      "alt": "An empty floodlit football stadium at night, the pitch a brilliant green, a lone ball at the centre circle.",
      "credit": "AI-generated"
    },
    "rank": 20,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pausanias on the first Olympic race and its olive crown",
        "excerpt": "Heracles, being the eldest, matched his brothers, as a game, in a running-race, and crowned the winner with a branch of wild olive, of which they had such a copious supply that they slept on heaps of its leaves while still green.",
        "source": "Pausanias, Description of Greece 5.7.7, trans. W. H. S. Jones (Loeb)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0160:book=5:chapter=7"
      },
      {
        "category": "historical",
        "title": "South Africa's 1995 Rugby World Cup triumph",
        "excerpt": "On 24 June 1995, on home soil at Ellis Park, the Springboks beat New Zealand 15-12 after Joel Stransky's extra-time drop goal. Nelson Mandela, in a green Springbok jersey, handed the trophy to captain Francois Pienaar, turning a sporting victory into the emblem of a newborn rainbow nation. Three decades on, Bafana Bafana's first World Cup knockout berth echoes that same fusion of contest and national becoming.",
        "source": "1995 Rugby World Cup final, Johannesburg",
        "href": "https://en.wikipedia.org/wiki/1995_Rugby_World_Cup_final"
      },
      {
        "category": "literary",
        "title": "Pindar crowns the Olympic victor in song",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth. ... The fame of Pelops shines from afar in the races of the Olympic festivals, where there are contests for swiftness of foot, and the bold heights of toiling strength.",
        "source": "Pindar, Olympian 1, trans. Diane Arnson Svarlien",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1"
      },
      {
        "category": "literary",
        "title": "The footrace at the funeral games of Patroclus",
        "excerpt": "Ranged in a line the ready racers stand; / Pelides points the barrier with his hand: / All start at once; Oileus led the race; / The next Ulysses, measuring pace with pace.",
        "source": "Homer, Iliad, Book XXIII, trans. Alexander Pope",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_23"
      },
      {
        "category": "artistic",
        "title": "Handel, 'See, the conqu'ring hero comes' (Judas Maccabaeus)",
        "excerpt": "Handel's chorus rises in a slow march of voices, then full-voiced acclaim, as a people welcomes home its champion. Trumpets and drums answer the choir in waves of public rejoicing. The music sounds exactly like a stadium finding its anthem after a long-awaited win.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63, No. 35 (1747)",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Runners on a Panathenaic prize amphora",
        "excerpt": "On this black-figure amphora by the Berlin Painter, lean athletes surge forward in a frozen sprint, elbows back and legs at full stretch. The vase itself was a victor's prize, the body of an ancient footrace immortalized on the trophy it once decorated.",
        "source": "Panathenaic amphora with runners, Berlin Painter, c. 490-480 BC, Altes Museum, Berlin",
        "href": "https://commons.wikimedia.org/wiki/File:Runners._Black_figures_panathenaic_amphora._Berlin_Painter._Altes_Museum,_Berlin.JPG",
        "image": {
          "src": "/covers/south-africa-world-cup-knockouts--art.png",
          "alt": "Black-figure Panathenaic amphora depicting nude runners in a footrace, attributed to the Berlin Painter, c. 490-480 BC",
          "credit": "Berlin Painter, Panathenaic amphora (runners), Altes Museum, Berlin. Wikimedia Commons, CC BY-SA."
        }
      }
    ]
  },
  {
    "slug": "paris-drug-raid-stolen-picasso",
    "headline": "Stolen Picasso portrait worth up to $17 million recovered by chance in a Paris-area drug raid",
    "overview": "French narcotics police raiding a house near Paris stumbled by chance upon a stolen 1937 Picasso portrait of Marie-Thérèse Walter, valued at up to $17 million. A security guard at an art-storage firm admitted taking it, and six people were arrested. Investigators said the theft was opportunistic — “the gang had no idea what to do with it.”",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/paris-drug-bust-nets-pilfered-picasso-1234752741/"
      },
      {
        "name": "The Art Newspaper",
        "href": "https://www.theartnewspaper.com/2026/06/24/picasso-painting-recovered-in-french-drug-raid-was-stolen-opportunistically-say-police-source"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/paris-drug-raid-stolen-picasso.png",
      "alt": "A gilt-framed portrait recovered and propped against a wall, lit by a single lamp in a dim room.",
      "credit": "Artforum"
    },
    "rank": 21,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Theft of the Mona Lisa from the Louvre (1911)",
        "excerpt": "On 21 August 1911 a former Louvre handyman, Vincenzo Peruggia, walked out of the museum with Leonardo's masterpiece tucked under a workman's smock. He kept the most famous painting in the world hidden in a trunk in his cramped Paris apartment for more than two years, with no real idea how to turn it into money. When he finally tried to sell it to a Florence dealer in 1913, the picture surfaced again and was recovered. The contemporary American newspaper coverage gathered by the Library of Congress records a thief who possessed a priceless treasure yet could not fathom what to do with it.",
        "source": "Theft of Mona Lisa: Topics in Chronicling America, Library of Congress",
        "href": "https://guides.loc.gov/chronicling-america-theft-mona-lisa"
      },
      {
        "category": "historical",
        "title": "The Isabella Stewart Gardner Museum Heist (1990)",
        "excerpt": "In the early hours of 18 March 1990, two men in police uniforms talked their way into Boston's Isabella Stewart Gardner Museum, handcuffed the guards in the basement, and left eighty-one minutes later with thirteen works of art, among them Vermeer's The Concert. More than three decades on, none has been recovered, despite a standing ten-million-dollar reward and an FBI investigation; the empty frames still hang on the museum's walls. It is the inverse of the Paris case: the masterpiece lost, but never found by lucky accident.",
        "source": "Isabella Stewart Gardner Museum Heist, Federal Bureau of Investigation",
        "href": "https://www.fbi.gov/history/famous-cases/isabella-stewart-gardner-museum-heist"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, \"The Purloined Letter\" (1844)",
        "excerpt": "to conceal this letter, the Minister had resorted to the comprehensive and sagacious expedient of not attempting to conceal it at all. ... the Minister had deposited the letter immediately beneath the nose of the whole world, by way of best preventing any portion of that world from perceiving it.",
        "source": "The Works of Edgar Allan Poe, Volume 2, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2148/2148-h/2148-h.htm"
      },
      {
        "category": "literary",
        "title": "The Parable of the Hidden Treasure (Gospel of Matthew 13:44)",
        "excerpt": "Again, the kingdom of heaven is like unto treasure hid in a field; the which when a man hath found, he hideth, and for joy thereof goeth and selleth all that he hath, and buyeth that field.",
        "source": "Bible (King James), Gospel of Matthew, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "artistic",
        "title": "Robert Schumann, \"Glückes genug\" (Happy Enough), from Kinderszenen, Op. 15 (1838)",
        "excerpt": "A small piano miniature whose German title means \"Happiness Enough,\" the fifth of Schumann's thirteen Scenes from Childhood. Its tender, rocking phrases capture exactly the kind of quiet, almost private joy described in the parable of the buried treasure: the surge of fortune that comes when something precious is suddenly found. Composed in 1838 and long in the public domain, it is a sketch of contentment over a treasure unexpectedly within one's grasp.",
        "source": "Kinderszenen, Op.15 (Schumann, Robert), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Kinderszenen,_Op.15_(Schumann,_Robert)"
      },
      {
        "category": "artistic",
        "title": "Rembrandt (and Gerrit Dou), \"The Parable of the Hidden Treasure\" (c. 1630)",
        "excerpt": "By candle and lantern light, a man crouches in a field at night, digging up a chest of treasure he has stumbled upon. The painting renders the Gospel parable as a scene of furtive discovery: a fortune found by chance and clutched in the dark, its finder scarcely able to believe what his hands have closed around. It is the very image of a treasure unearthed and a man overtaken by the luck of finding it.",
        "source": "Museum of Fine Arts, Budapest (Szépművészeti Múzeum); image via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Parable_of_the_hidden_treasure_Rembrandt_-_Gerard_Dou.jpg",
        "image": {
          "src": "/covers/paris-drug-raid-stolen-picasso--art.png",
          "alt": "A man kneeling in a dark field by lantern light, digging up a chest of treasure, in an oil painting attributed to Rembrandt and Gerrit Dou, c. 1630",
          "credit": "Rembrandt / Gerrit Dou, The Parable of the Hidden Treasure (c. 1630), Museum of Fine Arts, Budapest. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "pentagon-restores-flu-shots",
    "headline": "Pentagon restores mandatory flu shots for recruits after boot-camp outbreak sickens nearly 300",
    "overview": "The Pentagon reinstated mandatory flu vaccinations for all military recruits after an outbreak at the Air Force's Lackland boot camp sickened nearly 300 people. The shot had been made optional in April, and only about 40 percent of trainees chose to take it. Recruits live in close quarters under high stress, conditions that speed the spread of illness.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPbXVZWk1meExDUDBBN0U2cklITERHOFU4UVZhSnR3MUdWSGpkQzZIVE5rT2dVNDBPQzdOTmxmZHZvd0lETmJ6SjUzNEhmakVNcjlCZkczMFJ5UUJWVV9rVW9jWVdpdGU1b2UwZ19NenVVMmJEMzZJV29aajZLUEZyOW9fVmRPTnJnenhfWkkxR2xfRUdJOGtBZ2J1UGRKNWRLX016dlpaN1hvb05C?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/Health/military-services-requiring-recruits-flu-shots-air-force/story?id=134126794"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/pentagon-restores-flu-shots.png",
      "alt": "Rows of empty steel bunk beds in a long military barracks dormitory at dawn, pale light through high windows.",
      "credit": "AI-generated"
    },
    "rank": 22,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens",
        "excerpt": "An aggravation of the existing calamity was the influx from the country into the city, and this was especially felt by the new arrivals. As there were no houses to receive them, they had to be lodged at the hot season of the year in stifling cabins, where the mortality raged without restraint. There was the awful spectacle of men dying like sheep, through having caught the infection in nursing each other.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (trans. Richard Crawley)",
        "href": "http://www.thelatinlibrary.com/historians/thucyd/thucydides5.html"
      },
      {
        "category": "historical",
        "title": "Washington Inoculates the Continental Army",
        "excerpt": "Finding the small pox to be spreading much and fearing that no precaution can prevent it from running through the whole of our Army, I have determined that the Troops shall be inoculated. Necessity not only authorizes but seems to require the measure, for should the disorder infect the Army in the natural way and rage with its usual virulence we should have more to dread from it than from the Sword of the Enemy.",
        "source": "George Washington to Dr. William Shippen, Jr., 6 February 1777 (National Library of Medicine)",
        "href": "https://www.nlm.nih.gov/exhibition/georgewashington/mobile/item1.html"
      },
      {
        "category": "literary",
        "title": "A Journal of the Plague Year",
        "excerpt": "It was, however, upon inquiry found that this Frenchman who died in Bearbinder Lane was one who, having lived in Long Acre, near the infected houses, had removed for fear of the distemper, not knowing that he was already infected.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722)",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "literary",
        "title": "The Decameron: The Plague in Florence",
        "excerpt": "And this pestilence was the more virulent for that, by communication with those who were sick thereof, it gat hold upon the sound, no otherwise than fire upon things dry or greasy, when they are brought very near thereunto.",
        "source": "Giovanni Boccaccio, The Decameron, Introduction (trans. John Payne)",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm"
      },
      {
        "category": "artistic",
        "title": "Danse macabre, Op. 40",
        "excerpt": "Saint-Saens's symphonic poem summons Death as a fiddler who, at the stroke of midnight, calls the dead from their graves to dance until dawn. The solo violin, tuned to a harsh, rasping discord, scrapes out a whirling waltz over rattling xylophone bones. It is the old vision of contagion and mortality made into music: the impartial leveler who gathers all ranks into one heedless, swirling crowd.",
        "source": "Camille Saint-Saens, Danse macabre, Op. 40 (1874), IMSLP",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "The Plague at Ashdod",
        "excerpt": "Poussin stages an epidemic as civic catastrophe: amid grand classical architecture, the stricken collapse in the streets while the living recoil, pinch their noses against the stench, and turn away from the dead. In the foreground an infant still reaches for the breast of its lifeless mother. The painting renders the terror of a community overtaken by an unseen contagion it cannot outrun.",
        "source": "Nicolas Poussin, The Plague at Ashdod (1630-1631), Musee du Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_poussin,_peste_di_asdod,_1630-31.JPG",
        "image": {
          "src": "/covers/pentagon-restores-flu-shots--art.png",
          "alt": "Nicolas Poussin's painting The Plague at Ashdod (1630-1631), showing plague victims collapsing among classical buildings as the living recoil from the dead",
          "credit": "Nicolas Poussin, The Plague at Ashdod (1630-1631), Musee du Louvre (INV 7276). Photo: Sailko, via Wikimedia Commons, CC BY-SA 3.0"
        }
      }
    ]
  },
  {
    "slug": "manhattan-50-million-arts",
    "headline": "Manhattan borough president pledges his entire $50 million budget to the arts",
    "overview": "Manhattan Borough President Brad Hoylman-Sigal pledged his office's full $50 million annual discretionary budget — a program he calls the “Manhattan Multiplier” — to 28 schools and 55 cultural institutions, from the Metropolitan Opera to the Schomburg Center. He framed the move as a rebuff to threats against federal arts funding, calling arts and culture “economic engines and essential infrastructure.”",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/manhattan-borough-president-pledges-50-million-to-arts-orgs-1234753249/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/art-news/news/manhattan-borough-president-2026-budget-arts-trump-1234790051/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/manhattan-50-million-arts.png",
      "alt": "The grand columned facade of a Manhattan cultural institution at dusk, banners hanging by the entrance.",
      "credit": "Artforum"
    },
    "rank": 23,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pericles' building program on the Athenian Acropolis",
        "excerpt": "In fifth-century Athens, Pericles answered his critics by turning the city's surplus into a vast public works program — the Parthenon and the temples of the Acropolis. The project was meant not only to crown Athens with beauty but to put the whole citizenry to work, spreading civic prosperity through every trade. He cast public spending on art and architecture as the shared inheritance and glory of the city itself.",
        "source": "Plutarch, Life of Pericles (Bernadotte Perrin trans., Loeb Classical Library)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Pericles*.html"
      },
      {
        "category": "historical",
        "title": "The Medici and the flowering of Renaissance Florence",
        "excerpt": "Across the fifteenth century the Medici bank turned its fortune into patronage, commissioning Brunelleschi, Donatello, Botticelli, and others and funding libraries, churches, and the rebirth of classical learning. Cosimo the Elder and Lorenzo the Magnificent treated the cultivation of art and scholarship as a duty of civic magnificence, binding the prestige of the family to the splendor of the city. Their spending made Florence the workshop of the Renaissance and a model of the city as patron.",
        "source": "Encyclopaedia Britannica, \"House of Medici\"",
        "href": "https://www.britannica.com/topic/Medici-family"
      },
      {
        "category": "literary",
        "title": "Plutarch on Pericles and the public works of Athens",
        "excerpt": "The materials to be used were stone, bronze, ivory, gold, ebony, and cypress-wood; the arts which should elaborate and work up these materials were those of carpenter, moulder, bronze-smith, stone-cutter, dyer, worker in gold and ivory, painter, embroiderer, embosser, to say nothing of the forwarders and furnishers of the material, such as factors, sailors and pilots by sea, and, by land, wagon-makers, trainers of yoked beasts, and drivers. There were also rope-makers, weavers, leather-workers, road-builders, and miners.",
        "source": "Plutarch, Life of Pericles 12.6-7 (Bernadotte Perrin trans., Loeb Classical Library)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Pericles*.html"
      },
      {
        "category": "literary",
        "title": "Vasari on Cosimo de' Medici and Fra Filippo Lippi",
        "excerpt": "For this reason he strove to keep a hold on him for the future by kindnesses; and so he was served by Filippo with greater readiness, and was wont to say that the virtues of rare minds were celestial beings, and not slavish hacks.",
        "source": "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors and Architects, Vol. III, \"Life of Fra Filippo Lippi\" (Gaston du C. de Vere trans.)",
        "href": "https://www.gutenberg.org/files/26860/26860-h/26860-h.htm"
      },
      {
        "category": "artistic",
        "title": "Botticelli, Primavera (Allegory of Spring)",
        "excerpt": "Painted for a Medici patron around 1480, Botticelli's Primavera gathers Venus, the Three Graces, Flora, and Mercury in an orange grove where spring perpetually flowers. The picture is the fruit of private wealth poured into beauty — a Medici commission that became one of civilization's most beloved images, the kind of cultural inheritance public money is invoked to protect.",
        "source": "Sandro Botticelli, Primavera, c. 1480, tempera on panel, Galleria degli Uffizi, Florence",
        "href": "https://commons.wikimedia.org/wiki/File:Botticelli-primavera.jpg",
        "image": {
          "src": "/covers/manhattan-50-million-arts--art.png",
          "alt": "Botticelli's Primavera: Venus stands at center in an orange grove, flanked by the dancing Three Graces, Mercury, and the flower-strewn figures of Flora, Chloris, and Zephyrus.",
          "credit": "Sandro Botticelli, Primavera (c. 1480), Galleria degli Uffizi, Florence. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Handel, Water Music (HWV 348-350)",
        "excerpt": "Handel composed the Water Music for King George I, whose orchestra of some fifty players performed it from a barge as the royal party drifted up the Thames in July 1717. The buoyant suites of overture, minuets, bourrees, and hornpipes are music born directly of royal patronage — a sovereign underwriting splendor for the delight of his city. It survives as a public-domain monument to art made possible by a patron's purse.",
        "source": "George Frideric Handel, Water Music, HWV 348-350 (1717), scores at the International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/Water_Music,_HWV_348-350_(Handel,_George_Frideric)"
      }
    ]
  },
  {
    "slug": "china-future-industries-bubble",
    "headline": "China's push into “future industries” unleashes a venture-capital flood and bubble fears",
    "overview": "China's state-backed drive into “future industries” — quantum technology, nuclear fusion, space and brain-machine interfaces — has triggered a surge of venture capital, with investment up nearly 60 percent to 620 billion yuan in the first five months of the year. Soaring startup valuations have stirred fears of a speculative bubble; one veteran investor called the frenzy unlike anything in his career.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxQYkE4TjEwYlRaekZnWko3cnYtaGtfa19pdE5CcXI1STBjNVJRbU5MN3F3NzdWWVNmUjE2M2puRWMzZzlmbHZoQTdINEhQSzRpbVprMzhDeGFtZWV5dFVXbVlEWk0wS3dGY09CTlYzbDVVRnZTOGxuaFhIbDNrMWZ4QXp5WUprTU8yNEZQbWthaFpRaUhQc3cwTEFGblUzRVFOUmdZVWRSWlhZTlJ1THgxZzluSEtMang3akdkWXdGSHA3UV9UVW13M3JBaw?oc=5"
      },
      {
        "name": "The Jakarta Post",
        "href": "http://www.thejakartapost.com/business/2026/06/25/chinas-future-industries-push-triggers-flood-of-venture-capital-bubble-concerns"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/china-future-industries-bubble.png",
      "alt": "A glittering forest of glass skyscrapers rising into mist at dusk, a single iridescent soap bubble drifting among the towers.",
      "credit": "AI-generated"
    },
    "rank": 24,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Dutch Tulip Mania, recorded in the Dialogues of Waermondt and Gaergoedt (1637)",
        "excerpt": "When the speculation in tulip bulbs gripped Holland in 1634-1637, contemporaries watched ordinary goods of life converted overnight into flowers traded at impossible prices. The anonymous Haarlem pamphlets known as the Samen-Spraeck tusschen Waermondt ende Gaergoedt, the most important primary source for the mania, put the frenzy in the mouth of the speculator Gaergoedt: \"Everything was worth money and so current that one could get in exchange almost anything one desired.\"",
        "source": "Samen-Spraeck tusschen Waermondt ende Gaergoedt (anonymous Dialogues, Haarlem, 1637), as presented by the University of Chicago",
        "href": "https://penelope.uchicago.edu/encyclopaedia_romana/aconite/tulipomania.html"
      },
      {
        "category": "historical",
        "title": "The South-Sea Bubble (1720), from Mackay's contemporary-sourced account",
        "excerpt": "In 1720 the South Sea Company's stock soared on the promise of fabulous future trade, and all of England seemed to abandon its trades to gamble in shares before the bubble burst and ruined thousands. Charles Mackay's history, drawn from contemporary records, describes the scene: \"It seemed at that time as if the whole nation had turned stockjobbers. Exchange Alley was every day blocked up by crowds, and Cornhill was impassable for the number of carriages.\"",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. 1, \"The South-Sea Bubble\"",
        "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_2"
      },
      {
        "category": "literary",
        "title": "Aesop, \"The Goose That Laid the Golden Eggs\"",
        "excerpt": "A Man and his Wife had the good fortune to possess a Goose which laid a Golden Egg every day. Lucky though they were, they soon began to think they were not getting rich fast enough, and, imagining the bird must be made of gold inside, they decided to kill it in order to secure the whole store of precious metal at once. But when they cut it open they found it was just like any other goose. Thus, they neither got rich all at once, as they had hoped, nor enjoyed any longer the daily addition to their wealth. Much wants more and loses all.",
        "source": "Aesop's Fables, a new translation by V. S. Vernon Jones (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm"
      },
      {
        "category": "literary",
        "title": "Jonathan Swift, \"The South Sea Project\" (1721)",
        "excerpt": "Subscribers here by thousands float,\nAnd jostle one another down;\nEach paddling in his leaky boat,\nAnd here they fish for gold, and drown.",
        "source": "Jonathan Swift, \"The South Sea Project\" (1721), in The Works of the Rev. Jonathan Swift, Vol. 7",
        "href": "https://en.wikisource.org/wiki/The_Works_of_the_Rev._Jonathan_Swift/Volume_7/The_South_Sea_Project"
      },
      {
        "category": "artistic",
        "title": "Hendrik Gerritsz Pot, \"Flora's Wagon of Fools\" (c. 1637)",
        "excerpt": "Painted in the immediate aftermath of the Dutch tulip crash, Pot's allegory loads the goddess Flora and her gaudy entourage of fools onto a wind-driven wagon rolling toward the sea, while weavers abandon their looms to chase the float and a crowd follows after it. The wagon's sail, the empty promise of riches on the wind, captures a whole society betting its fortune on a speculative bloom.",
        "source": "Frans Hals Museum, Haarlem (oil on panel, accession os I-286)",
        "href": "https://commons.wikimedia.org/wiki/File:Flora's_Wagon_of_Fools_(Flora's_Mallewagen)_tulipomania,_Hendrik_Gerritsz_Pot_c1637.jpg",
        "image": {
          "src": "/covers/china-future-industries-bubble--art.png",
          "alt": "Flora's Wagon of Fools (c. 1637) by Hendrik Gerritsz Pot: an allegorical painting of the goddess Flora and fools riding a wind-blown wagon toward the sea, satirizing the Dutch tulip mania.",
          "credit": "Hendrik Gerritsz Pot, Flora's Wagon of Fools, c. 1637, Frans Hals Museum, Haarlem. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns, \"Danse macabre,\" Op. 40 (1874)",
        "excerpt": "Saint-Saëns' tone poem summons Death at midnight to scrape his fiddle while the skeletons of the rich and the poor alike rise to dance, a feverish whirl that spins faster and faster until the cock crows and the whole glittering revel collapses into nothing. Its frenzy and abrupt dissolution make it a fitting score for any mania that dances on air until dawn breaks the spell.",
        "source": "Camille Saint-Saëns, Danse macabre, Op. 40 (symphonic poem, 1874), full scores on IMSLP",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
      }
    ]
  },
  {
    "slug": "trump-withholds-housing-bill",
    "headline": "Trump refuses to sign bipartisan housing bill, demanding Congress pass his voting law first",
    "overview": "President Trump abruptly canceled the signing of a bipartisan housing bill — which cleared the House 358-32 and the Senate 85-5 — saying he will not sign it until Congress passes his SAVE America Act on voting. The standoff risks a pocket veto and leaves a measure intended to lower housing costs in limbo. Republican senators called the move “inexplicable.”",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQbldpcm13b1ZGdlB6MTY5dUNYOXVHUVJocFcwN1ZzbFpSOXZwMGItZGtrdUZlTUU5ZXo4N2g3ZDgwdUJfY1BHZWc4S0NtZnltOENBYUgwY1B2MWw1aXg0VUdyc1ZnQXF2NExVVWtER2NrcWgyanBfaW1NS1NJeEE5dFMtOWNuWWFhaUZrNWduQTg4Zm5VNnhhNXlMN2ozRWF0?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/politics/trump-says-he-wont-sign-major-housing-bill-until-congress-passes-save-act"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/trump-withholds-housing-bill.png",
      "alt": "A grand domed legislative capitol at dusk under a brooding sky, an unsigned document and a capped pen on a desk in the foreground.",
      "credit": "AI-generated"
    },
    "rank": 25,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The grievances against George III: refusing assent to laws",
        "excerpt": "He has refused his Assent to Laws, the most wholesome and necessary for the public good. He has forbidden his Governors to pass Laws of immediate and pressing importance, unless suspended in their operation till his Assent should be obtained; and when so suspended, he has utterly neglected to attend to them.",
        "source": "Declaration of Independence (1776), U.S. National Archives transcript",
        "href": "https://www.archives.gov/founding-docs/declaration-transcript"
      },
      {
        "category": "historical",
        "title": "Plutarch on the tribune's veto (intercessio) blocking the will of the many",
        "excerpt": "For the decisive power is in the hands of any tribune who interposes his veto; since the wishes of the majority avail nothing if one tribune is in opposition.",
        "source": "Plutarch, Life of Tiberius Gracchus, ch. 10 (Perseus Digital Library, trans. Perrin)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0065:chapter=10"
      },
      {
        "category": "literary",
        "title": "Coriolanus withholds himself from the people",
        "excerpt": "I will not seal your knowledge with showing them. I will make much of your voices and so trouble you no farther.",
        "source": "William Shakespeare, Coriolanus, Act II, Scene III (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1535/pg1535.txt"
      },
      {
        "category": "literary",
        "title": "Bartleby's quiet refusal: 'I would prefer not to'",
        "excerpt": "\"I would prefer not to,\" replied Bartleby, in a singularly mild, firm voice.",
        "source": "Herman Melville, Bartleby, the Scrivener: A Story of Wall-Street (1853), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/11231/pg11231.txt"
      },
      {
        "category": "artistic",
        "title": "Beethoven's Egmont, Op. 84 — music against a ruler's oppression",
        "excerpt": "Beethoven's incidental music for Goethe's tragedy Egmont dramatizes a people crushed under an unyielding sovereign and the count who defies him. The brooding overture coils in tension before erupting into a blazing Victory Symphony, turning resistance to arbitrary power into pure sound.",
        "source": "Ludwig van Beethoven, Egmont, Op. 84 (1810), full scores at IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/Egmont,_Op.84_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Trumbull's 'Declaration of Independence': the act of assent given",
        "excerpt": "John Trumbull's monumental canvas shows the drafting committee presenting its text to the Continental Congress — the founding image of a deliberative body whose work becomes binding only by formal assent. It hangs in the U.S. Capitol Rotunda as a portrait of self-government and the signatures that make law.",
        "source": "John Trumbull, Declaration of Independence (1819), U.S. Capitol Rotunda (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg",
        "image": {
          "src": "/covers/trump-withholds-housing-bill--art.png",
          "alt": "John Trumbull's 1819 painting Declaration of Independence, showing the drafting committee presenting the document to the Continental Congress.",
          "credit": "John Trumbull, Declaration of Independence (1819), U.S. Capitol Rotunda. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "paris-museums-close-heatwave",
    "headline": "Louvre and Eiffel Tower close early as a record heatwave bakes France",
    "overview": "The Louvre and the Eiffel Tower closed early and the Palais de Tokyo shut entirely as a record-breaking heatwave pushed French temperatures toward 44 degrees Celsius (about 112 Fahrenheit). Air conditioning is uncommon in France's cultural institutions, and the Louvre noted that heat builds up worst late in the day amid high visitor numbers.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/paris-museums-close-as-france-swelters-1234753245/"
      },
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c78y4102n1zo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/paris-museums-close-heatwave.png",
      "alt": "The glass pyramid of a great Paris museum under a blazing white midday sky, the courtyard nearly empty in the heat.",
      "credit": "Artforum"
    },
    "rank": 26,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 2003 European Heat Wave",
        "excerpt": "In the summer of 2003 a record heat wave settled over Europe, the hottest the continent had seen in roughly five centuries. France was struck hardest: temperatures soared past 40C, and with air conditioning a rarity even night brought no relief in the stone and brick of its cities. The toll was staggering, with nearly 15,000 heat-related deaths in France alone, mostly among the elderly, and tens of thousands more across the continent.",
        "source": "Encyclopaedia Britannica, \"European heat wave of 2003\"",
        "href": "https://www.britannica.com/event/European-heat-wave-of-2003"
      },
      {
        "category": "historical",
        "title": "Pliny the Elder on the Rising of the Dog-Star",
        "excerpt": "Who is there that does not know that the vapour of the sun is kindled by the rising of the Dog-star? The most powerful effects are felt on the earth from this star. When it rises, the seas are troubled, the wines in our cellars ferment, and stagnant waters are set in motion.",
        "source": "Pliny the Elder, Natural History, Book II, ch. 40 (Bostock & Riley trans.)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=2:chapter=40"
      },
      {
        "category": "literary",
        "title": "Coleridge, The Rime of the Ancient Mariner",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon.",
        "source": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner\" (Part the Second)",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid, The Burning Earth of Phaethon",
        "excerpt": "Great cities perish with their walls, and peopled nations are consumed to dust— the forests and the mountains are destroyed. The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction.",
        "source": "Ovid, Metamorphoses, Book II (Brookes More trans.)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "artistic",
        "title": "Vivaldi, \"Summer\" from The Four Seasons",
        "excerpt": "Vivaldi's \"L'estate\" (Summer), the second of his Four Seasons concertos, opens under a languor so heavy the music itself seems to wilt. Its accompanying sonnet describes man and beast laid low beneath a merciless sun, the pine scorched, the very air motionless—before the storm breaks the spell. It is the sound of a world paralyzed by heat.",
        "source": "Antonio Vivaldi, Le quattro stagioni, Op. 8 — Concerto No. 2 in G minor, RV 315 \"L'estate\"",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "Van Gogh, The Sower (Sower at Sunset)",
        "excerpt": "Painted in Arles in the summer of 1888, van Gogh set a lone sower against an immense lemon-yellow sun that floods the whole canvas. The fierce southern light seems to dissolve the field into bands of molten color, the heat made visible. It captures exactly the blinding, all-consuming sun of a Provencal summer.",
        "source": "Vincent van Gogh, The Sower (Sower at Sunset), 1888, Kröller-Müller Museum",
        "href": "https://commons.wikimedia.org/wiki/File:The_Sower_-_painting_by_Van_Gogh.jpg",
        "image": {
          "src": "/covers/paris-museums-close-heatwave--art.png",
          "alt": "Van Gogh's The Sower: a peasant sowing seed in the foreground beneath an enormous glowing yellow sun low over a field, in swirling bands of yellow and violet.",
          "credit": "Vincent van Gogh, The Sower (Sower at Sunset), 1888, Kröller-Müller Museum. Public domain via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "venezuela-earthquakes-strike-caracas",
    "headline": "Back-to-back earthquakes strike Venezuela, collapsing buildings in Caracas",
    "overview": "Two powerful back-to-back earthquakes struck Venezuela, toppling buildings in the capital, Caracas, and prompting rescue efforts as officials warned of high casualties. The tremors sent residents into the streets and knocked out power and communications in parts of the city.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxOVXpHa29VWnJ2cGpHZkR5NUJiU1NaTHNkNFJmeTU3WGhlMlFodlZ5cGFSRVhLVnlEcHhJUDN1VVZCenR5UExaQmNrYS1OSVFJRE5yUkN3RjlzZWxPZktaSjY2b0R3YW9oRzh3S05WanhJQjRLb1NUanp1ZEdrb3FVWWxaR1ViTGhxU0FhQTJTajI0UQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxNc09ZREJlMlRMQTdKeWM3QUI4RmpVbHBtWl9zamk2V1lxU2NESnVPaXZYa2pWdllSWGpHZ3hpWVMxbzV5OUJLN084ZDNtWEJSV1R5d3Fqb29GajBGbTFGaldHWmxaM1phOEw4YUdUYklTTEo3cU0tVHNDMmsyVTZ1Q3JrcThUeUZkajl3ZVlGYw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/venezuela-earthquakes-strike-caracas.png",
      "alt": "Rescue workers searching a partly collapsed apartment building after an earthquake.",
      "credit": "AI-generated"
    },
    "lead": true,
    "rank": 27,
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Caracas Earthquake of 1812",
        "excerpt": "On Maundy Thursday, 26 March 1812, a powerful earthquake threw down Caracas in an instant, killing an estimated 15,000-20,000 people and reducing much of the capital to ruins. Royalist clergy proclaimed the disaster divine punishment for the independence struggle; Simon Bolivar, digging in the rubble for survivors, answered that if Nature were against the patriots they would fight Nature and force it to obey. The episode is the closest precedent for today's catastrophe: the same city, the same sudden collapse of buildings, the same desperate rescue work amid the wreckage.",
        "source": "Encyclopaedia Britannica, \"Caracas\" (History)",
        "href": "https://www.britannica.com/place/Caracas"
      },
      {
        "category": "historical",
        "title": "The Lisbon Earthquake of 1755",
        "excerpt": "The most famous urban earthquake in European history struck on All Saints' Day, when much of the population was at mass. As Britannica records, \"Violent shaking demolished large public buildings and about 12,000 dwellings,\" and \"the churches, unable to withstand the seismic shock, collapsed, killing or injuring thousands of worshippers,\" with an estimated 60,000 dead in Lisbon alone. Like Caracas, a thriving capital was thrown down between one moment and the next, leaving survivors to dig through ruins.",
        "source": "Encyclopaedia Britannica, \"Lisbon earthquake of 1755\"",
        "href": "https://www.britannica.com/event/Lisbon-earthquake-of-1755"
      },
      {
        "category": "literary",
        "title": "Candide, Chapter V (Voltaire)",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, Candide (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "literary",
        "title": "Revelation 16:18-20 (King James Bible)",
        "excerpt": "And there were voices, and thunders, and lightnings; and there was a great earthquake, such as was not since men were upon the earth, so mighty an earthquake, and so great. And the great city was divided into three parts, and the cities of the nations fell: and great Babylon came in remembrance before God, to give unto her the cup of the wine of the fierceness of his wrath. And every island fled away, and the mountains were not found.",
        "source": "The Bible (King James), Revelation (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Revelation"
      },
      {
        "category": "artistic",
        "title": "The Earthquake of 1755 (Joao Glama Stroberle)",
        "excerpt": "Painted in the decades after the disaster by a Lisbon-born artist who lived through its aftermath, this large canvas plunges the viewer into the moment of collapse: figures flee through tilting streets while buildings crack and topple, the dead and dying scattered across the foreground beneath a roiling sky. It captures exactly what Caracas now confronts, a city overwhelmed in an instant, with the living clambering over fallen masonry to reach the trapped.",
        "source": "Joao Glama Stroberle, The Earthquake of 1755, Museu Nacional de Arte Antiga, Lisbon (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:O_Terramoto_de_1755_(1756-92)_-_Jo%C3%A3o_Glama_(MNAA).png",
        "image": {
          "src": "/covers/venezuela-earthquakes-strike-caracas--art.png",
          "alt": "Painting depicting the 1755 Lisbon earthquake, with collapsing buildings, fleeing crowds, and the dead amid ruins under a dark sky.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Il Terremoto (The Earthquake), from Haydn's Seven Last Words of Christ",
        "excerpt": "Haydn closed his 1786 orchestral meditation on the death of Christ with a finale marked Presto e con tutta la forza, titled Il Terremoto, The Earthquake. After hours of slow, hushed contemplation, the full orchestra erupts in violent unison hammer-blows, trumpets and timpani shaking the music to its foundations to depict the earth convulsing. It is the sound of the ground itself giving way, the same terror that swallowed the buildings of Caracas.",
        "source": "Joseph Haydn, Die Worte des Erlosers am Kreuze (Seven Last Words of Christ), Hob.XX:1 (IMSLP)",
        "href": "https://imslp.org/wiki/Die_Worte_des_Erl%C3%B6sers_am_Kreuze,_Hob.XX:1_(Haydn,_Joseph)"
      }
    ]
  },
  {
    "slug": "micron-qualcomm-ai-chip-stock-rally",
    "headline": "Micron and Qualcomm forecasts spark a $400 billion AI chip stock rally",
    "overview": "Upbeat forecasts from Micron and Qualcomm ignited a roughly $400 billion rally in AI-related chip stocks, easing fears of a slowdown in artificial-intelligence spending. Micron topped earnings estimates and pointed to $22 billion in customer deals, while Qualcomm projected $15 billion in data-center chip sales by 2029.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPdVFvNUJ1aWV0VTctX1lFeEFKM1dkVUVKWlhLT3FORGtCUlNnbWx1MFJnVEpNSzc3NjhQVWc3ekJyRDBwNHpaNERuMjl4NHR0Vjd1b0oyVGF0aHZVU19pb01jQ18yTmF3azh3d1pQeWhMbFlxd0pjM2NDR3VwbDNCWjJ4QXUta0lHYUFHOUIwaHZ6aUVJajNZZHNsaUxCUWRYTlgxczNwU3FzTDFVMkE?oc=5"
      },
      {
        "name": "Reuters — Qualcomm data-center forecast",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxOYnR1NDI4aWZHU3RPUlpodXhUMGlKSXFMU3k0QWZOY2hYSVdsVDlDdnhuSF9BaHh3UlV2WURZeFZQVGVKSFluTlJ4WmVHTEJVQy04clNMR3VONzUycVVUNm5zcHhOVW9EcmdGVXFtR2V6bEVMeE4zOVVNUnAyYUpnRklIWWh3eTZyR0lnUzBkeGNiWXhMRFN4ME9IZm9WMlFwM2I0eC1mY2lwY1B3T21RYUhqNjhNbXhGcHB5UHQxOTlQcXJfN2VV?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/micron-qualcomm-ai-chip-stock-rally.png",
      "alt": "A stock-exchange display board lit up with rising share prices.",
      "credit": "AI-generated"
    },
    "rank": 28,
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Tulipomania",
        "excerpt": "Nobles, citizens, farmers, mechanics, seamen, footmen, maidservants, even chimney-sweeps and old clotheswomen, dabbled in tulips. People of all grades converted their property into cash, and invested it in flowers.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), ch. 3, “The Tulipomania”",
        "href": "https://www.econlib.org/book-chapters/chapter-ch-3-the-tulipomania/"
      },
      {
        "category": "historical",
        "title": "The South-Sea Bubble",
        "excerpt": "Exchange Alley was in a fever of excitement. The company's stock, which had been at a hundred and thirty the previous day, gradually rose to three hundred, and continued to rise with the most astonishing rapidity during the whole time that the bill in its several stages was under discussion.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), ch. 2, “The South-Sea Bubble”",
        "href": "https://www.econlib.org/book-chapters/chapter-ch-2-the-south-sea-bubble/"
      },
      {
        "category": "literary",
        "title": "The Alchemist",
        "excerpt": "This is the day, wherein, to all my friends, / I will pronounce the happy word, BE RICH; / THIS DAY YOU SHALL BE SPECTATISSIMI. / You shall no more deal with the hollow die, / Or the frail card.",
        "source": "Ben Jonson, The Alchemist (1610), Act II, Scene I (Sir Epicure Mammon)",
        "href": "https://www.gutenberg.org/files/4081/4081-h/4081-h.htm"
      },
      {
        "category": "literary",
        "title": "Roughing It",
        "excerpt": "To make money, and make it fast, was as easy as it was to eat your dinner.",
        "source": "Mark Twain, Roughing It (1872), on the Nevada silver “flush times”",
        "href": "https://www.gutenberg.org/files/8586/8586-h/8586-h.htm"
      },
      {
        "category": "artistic",
        "title": "Oh! Susanna",
        "excerpt": "Stephen Foster's lilting 1848 minstrel tune became the unofficial anthem of the 1849 gold rush, sung by forty-niners as they streamed west chasing instant fortune. Its giddy, optimistic refrain captured the euphoric certainty that untold riches lay just over the horizon. The melody distilled an entire nation's speculative dream into a few bars of irrepressible cheer.",
        "source": "Stephen Foster, “Oh! Susanna” (first published 1848), gold-rush anthem of the forty-niners",
        "href": "https://imslp.org/wiki/Oh!_Susanna_(Foster,_Stephen)"
      },
      {
        "category": "artistic",
        "title": "Satire on Tulip Mania",
        "excerpt": "Jan Brueghel the Younger paints the tulip speculators of 1630s Holland as foolish monkeys in fine merchant dress, weighing bulbs, counting coins, and sealing deals with handshakes over a lavish banquet. In the aftermath one monkey urinates on now-worthless blooms while another is hauled before a judge and a ruined buyer is carried to his grave. The canvas turns a financial frenzy into a biting allegory of greed and the inevitable reckoning that follows euphoria.",
        "source": "Jan Brueghel the Younger, A Satire of Tulip Mania, c. 1640, oil on panel, Frans Hals Museum, Haarlem",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/micron-qualcomm-ai-chip-stock-rally--art.png",
          "alt": "Jan Brueghel the Younger's painting depicting tulip-mania speculators as monkeys weighing bulbs, counting money, and facing ruin in a Dutch landscape",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "anthropic-accuses-alibaba-of-extracting-claude",
    "headline": "Anthropic accuses Alibaba of illicitly extracting its Claude AI capabilities",
    "overview": "Anthropic accused the Chinese technology giant Alibaba of illicitly extracting capabilities from its Claude AI models, a technique that can be used to copy a rival's system. The allegation deepens tensions between leading US and Chinese artificial-intelligence developers.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxOUjhQd2FfckN3bVZ1MS1YQUs1OUJ2R0lsVDREY0tJMlRPbVBTMHFscE92X3B5UnVOajZaYnhsSUhNSHdmNE1md3hIc0FJWWRfcEktajFjTjBkX04tNEIxOVpFajd3eWJJRk05T1d2WTJhRjF5Mkl1TFNjbTJNY0czVGR2bDNFVTdrOUI5czR1dUZpckVzMXdqenJNbGppNjVVWXZNbHpUMlIteTJ1Q3hnSDltTnpSSFBhWmpZ?oc=5"
      },
      {
        "name": "Reuters (via AOL)",
        "href": "https://www.aol.com/articles/anthropic-says-alibaba-illicitly-extracted-203048000.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/anthropic-accuses-alibaba-of-extracting-claude.png",
      "alt": "Glowing data streaming between two rows of server racks in a dark data center.",
      "credit": "AI-generated"
    },
    "rank": 29,
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Robert Fortune and the theft of China's tea secrets",
        "excerpt": "Another journey, undertaken in 1848 on behalf of the East India Company, had much more important consequences, occasioning the successful introduction into India of the tea plant in 1851.",
        "source": "Encyclopaedia Britannica, \"Robert Fortune\"",
        "href": "https://www.britannica.com/biography/Robert-Fortune"
      },
      {
        "category": "historical",
        "title": "The stolen arcanum of Meissen porcelain",
        "excerpt": "By 1717, however, a competing production was set up at Vienna, as Samuel Stöltzel, head of the craftsmen and arcanist at Meissen, sold the secret recipe, which involved the use of kaolin.",
        "source": "Wikipedia, \"Meissen porcelain\"",
        "href": "https://en.wikipedia.org/wiki/Meissen_porcelain"
      },
      {
        "category": "literary",
        "title": "Prometheus steals fire from Zeus (Hesiod, Works and Days)",
        "excerpt": "He hid fire; but that the noble son of Iapetus stole again for men from Zeus the counsellor in a hollow fennel-stalk, so that Zeus who delights in thunder did not see it.",
        "source": "Hesiod, Works and Days, trans. Hugh G. Evelyn-White (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/348/348-h/348-h.htm"
      },
      {
        "category": "literary",
        "title": "The Pupil in Magic (The Sorcerer's Apprentice), by Goethe",
        "excerpt": "I am now,—what joy to hear it!—\nOf the old magician rid;\nAnd henceforth shall every spirit\nDo whate'er by me is bid;\nI have watched with rigour\nAll he used to do,\nAnd will now with vigour\nWork my wonders too.",
        "source": "The Works of J. W. von Goethe, Vol. 9, \"The Pupil in Magic,\" trans. Edgar Alfred Bowring (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic"
      },
      {
        "category": "artistic",
        "title": "Prometheus Bound, by Peter Paul Rubens (with Frans Snyders)",
        "excerpt": "Rubens and Snyders depict the Titan Prometheus chained to a rock, his torso torn open by Zeus's eagle as punishment for stealing fire from the gods and giving it to humankind. The violent, muscular composition turns the price of stolen knowledge into a monumental image of divine retribution. The painting, begun about 1611-12 and completed by 1618, hangs in the Philadelphia Museum of Art.",
        "source": "Philadelphia Museum of Art / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens,_Flemish_(active_Italy,_Antwerp,_and_England)_-_Prometheus_Bound_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/anthropic-accuses-alibaba-of-extracting-claude--art.png",
          "alt": "Rubens's painting Prometheus Bound, showing the chained Titan attacked by an eagle as punishment for stealing fire",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "L'apprenti sorcier (The Sorcerer's Apprentice), by Paul Dukas",
        "excerpt": "Dukas's 1897 symphonic scherzo sets Goethe's ballad to music, depicting the apprentice who, having watched his master, recites a half-learned spell to make a broom fetch water and then loses all control of the forces he has unleashed. The orchestral score is preserved on IMSLP. It dramatizes the peril of copying a master's craft without truly mastering it.",
        "source": "L'apprenti sorcier (Dukas, Paul) — IMSLP",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)"
      }
    ]
  },
  {
    "slug": "world-court-judges-sue-trump-over-sanctions",
    "headline": "International Court of Justice judges sue the Trump administration over US sanctions",
    "overview": "Judges of the International Court of Justice filed suit against the Trump administration over sanctions imposed on the court, arguing the measures unlawfully target them for their official work. The case escalates a confrontation between Washington and the United Nations' top judicial body.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQeHlOSy1RQVNCdks4TlFKbm1TajIwQTd6T19rYVVYTzBETWlYTDRxYkFmb080QWh6RTNUdk8wSjNkN0lqUXVxWjZlTmMxUFVsaFE5cXdhNEdMLTkyY19zNENRcWRpU1NfTzNqR2Q1YnNXTFE0N3RCaXdUeXJpZE8zeDZrZXctWnl0MTZDNlRXU1hZUDRwTGo5RzRyT3B0Z0hmZmZ4TWVkRnNUNU9ZV1JfOQ?oc=5"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2648485/world"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/world-court-judges-sue-trump-over-sanctions.png",
      "alt": "An empty judge's bench beneath a set of brass scales of justice.",
      "credit": "AI-generated"
    },
    "rank": 30,
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Trial of Socrates (Plato's Apology)",
        "excerpt": "Men of Athens, I honour and love you; but I shall obey God rather than you, and while I have life and strength I shall never cease from the practice and teaching of philosophy, exhorting any one whom I meet and saying to him after my manner: You, my friend,—a citizen of the great and mighty and wise city of Athens,—are you not ashamed of heaping up the greatest amount of money and honour and reputation, and caring so little about wisdom and truth and the greatest improvement of the soul, which you never regard or heed at all?",
        "source": "Plato, Apology, trans. Benjamin Jowett (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm"
      },
      {
        "category": "historical",
        "title": "Sir Edward Coke Defies King James I (Prohibitions del Roy, 1607)",
        "excerpt": "that Bracton saith, Quod Rex non debet esse sub homine, sed sub Deo & Lege.",
        "source": "Sir Edward Coke, Prohibitions del Roy (1607), Online Library of Liberty",
        "href": "https://oll.libertyfund.org/pages/1658-coke-prohibitions-del-roy-pamphlet"
      },
      {
        "category": "literary",
        "title": "Antigone defies Creon's decree",
        "excerpt": "Yes; for it was not Zeus that had published me that edict; not such are the laws set among men by the Justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven.",
        "source": "Sophocles, Antigone, trans. R. C. Jebb (1917), Wikisource",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Sophocles_(Jebb_1917)/Antigone"
      },
      {
        "category": "literary",
        "title": "A Man for All Seasons by Robert Bolt",
        "excerpt": "Robert Bolt's drama stages the fatal collision between Henry VIII and his lord chancellor Sir Thomas More, who will not bend his conscience or the law to serve the king's will. More insists that the protections of the law must stand even for the king's enemies, and he is destroyed for refusing to make the law a mere instrument of power. The play has become a touchstone for the idea that justice must not yield to a ruler's displeasure.",
        "source": "Britannica entry on A Man for All Seasons (play by Bolt)",
        "href": "https://www.britannica.com/topic/A-Man-for-All-Seasons-play-by-Bolt"
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier, Les Gens de Justice",
        "excerpt": "In his mid-19th-century lithograph series Les Gens de Justice, Honoré Daumier turned a satirical eye on the courts, depicting robed judges and advocates whose grand poses mask vanity, cruelty and the gulf between legal ritual and true justice. The works expose how the machinery of the law can be bent by those who wield it, making the courtroom a stage for power rather than fairness. Daumier's biting images remain a lasting visual indictment of justice betrayed.",
        "source": "Honoré Daumier, Les Gens de Justice (lithograph series, c. 1846), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Les_Gens_de_Justice-_M._L%27Avocat_a_rendu_pleine_Justice..._-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/world-court-judges-sue-trump-over-sanctions--art.png",
          "alt": "Honoré Daumier lithograph from Les Gens de Justice showing a robed advocate gesturing in a courtroom",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Fidelio, Op. 72",
        "excerpt": "Beethoven's only opera tells of Florestan, a man unjustly imprisoned by the tyrannical governor Pizarro for daring to speak the truth, and of Leonore, who disguises herself to free him. The score builds to the triumph of justice over arbitrary power, as lawful authority arrives to overturn the abuses of a ruler who placed himself above the law. Fidelio stands as music's great hymn to liberty and the vindication of the innocent against political persecution.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72, IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      }
    ]
  },
  {
    "slug": "judge-blocks-trump-proof-of-citizenship-voting",
    "headline": "Federal judge blocks Trump's proof-of-citizenship requirement to vote",
    "overview": "A federal judge barred the Trump administration from implementing a requirement that voters show documentary proof of citizenship to register, ruling the policy exceeded the president's authority. The decision is the latest court setback for the administration's election measures.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxON2FiZ2FvcDFKQzFnek9IUy1oRnJfY3I4SU5UeVJZNVJFRjJkWkxqQ2kyb2lSa01nT1htUDZiMmg3XzBkcGJoSWxieTVKbjE0d1lPeEhZbEljSGxTNWxtRDFyQVBwNldpVjZUODVFZDBzQ1pJQkVENnlpcFZXN3hLQl9jOTR6VURa?oc=5"
      },
      {
        "name": "Democracy Docket",
        "href": "https://www.democracydocket.com/news-alerts/court-permanently-blocks-key-parts-of-trumps-first-anti-voting-executive-order/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/judge-blocks-trump-proof-of-citizenship-voting.png",
      "alt": "A hand placing a paper ballot into a sealed voting box.",
      "credit": "AI-generated"
    },
    "rank": 31,
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Fifteenth Amendment to the U.S. Constitution (1870)",
        "excerpt": "The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of race, color, or previous condition of servitude. The Congress shall have power to enforce this article by appropriate legislation.",
        "source": "U.S. National Archives, Milestone Documents",
        "href": "https://www.archives.gov/milestone-documents/15th-amendment"
      },
      {
        "category": "historical",
        "title": "Lyndon B. Johnson, \"The American Promise\" (We Shall Overcome) speech, March 15, 1965",
        "excerpt": "Every device of which human ingenuity is capable has been used to deny this right. The Negro citizen may go to register only to be told that the day is wrong, or the hour is late, or the official in charge is absent.",
        "source": "Wikisource (Public Papers of the Presidents: Lyndon B. Johnson, 1965)",
        "href": "https://en.wikisource.org/wiki/We_Shall_Overcome_(Johnson)"
      },
      {
        "category": "literary",
        "title": "Frederick Douglass, \"What to the Slave is the Fourth of July?\" (1852)",
        "excerpt": "Your high independence only reveals the immeasurable distance between us. The blessings in which you, this day, rejoice, are not enjoyed in common.—The rich inheritance of justice, liberty, prosperity and independence, bequeathed by your fathers, is shared by you, not by me.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/What_to_the_Slave_is_the_Fourth_of_July"
      },
      {
        "category": "literary",
        "title": "John Greenleaf Whittier, \"The Poor Voter on Election Day\" (1852)",
        "excerpt": "The proudest now is but my peer, / The highest not more high; / To-day, of all the weary year, / A king of men am I.",
        "source": "Wikisource (The Complete Poetical Works of John Greenleaf Whittier, 1895)",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_John_Greenleaf_Whittier/The_Poor_Voter_on_Election_Day"
      },
      {
        "category": "artistic",
        "title": "George Caleb Bingham, \"The County Election\" (1852)",
        "excerpt": "Bingham's panoramic oil painting stages the spectacle of a frontier Missouri election day, with a clerk swearing in voters one by one as a boisterous crowd of citizens gathers at the polling place. It dramatizes who is allowed to step up and cast a ballot, capturing both the promise and the limits of the franchise in the early republic.",
        "source": "Wikimedia Commons (Saint Louis Art Museum)",
        "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_County_Election.jpg",
        "image": {
          "src": "/covers/judge-blocks-trump-proof-of-citizenship-voting--art.png",
          "alt": "George Caleb Bingham's 1852 painting The County Election, depicting a crowd of citizens gathered at a frontier polling place as voters are sworn in one by one.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Henry Mayer, \"The Awakening\" (1915)",
        "excerpt": "Mayer's centerfold cartoon from Puck magazine shows a torch-bearing figure of Liberty in a cape reading \"Votes for Women\" striding eastward across a map of the United States. Light spreads from the western states that had already enfranchised women toward the darkened East, where women reach out for the vote, picturing suffrage as an unstoppable advance of citizenship.",
        "source": "Wikimedia Commons (Cornell University Library, PJ Mode Collection)",
        "href": "https://commons.wikimedia.org/wiki/File:Henry_Mayer,_The_Awakening,_1915_Cornell_CUL_PJM_1176_01_-_Restoration.jpg"
      }
    ]
  },
  {
    "slug": "us-clears-f-35-jet-sales-to-turkey",
    "headline": "US moves to clear F-35 and jet-engine sales to Turkey ahead of NATO summit",
    "overview": "The United States said it is reviewing how to let Turkey acquire F-35 fighter jets and signaled it will move forward with jet-engine sales, days before a NATO summit. The shift would mark a thaw after Washington removed Turkey from the F-35 program over its purchase of Russian air defenses.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPa3dUYTdScGtsb05LZVB3dVFuY1ZUX0Fjcl9iY0hmOTFkZVhRYXZXRWRiMWtxVFlZY0lQOWVhaXI3MFBwWHp0LXRQaUNwc0hRTWVfYlNVMk8wcWRIT044VzZFSXRRVFdNeEY1eEEzMzJQcWZKOGUwUXg1S2NKN1lGcUxINWN3YUxTYWF0SFl1LWhPaU5md2VoRGxDcGRIRjR2anY4U2ZPYmtMRkhQY0R5bmVaY0syaHlEX2ZyMmFR?oc=5"
      },
      {
        "name": "Reuters — jet engine sales",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxORHZBcXlkVU9EbDhWVWgyV0tpTDlTUndYdnNpZk1vMzFuQXBGTHdGTFB2WWVFdkFpeGNPQXFManowX1NHdWxqTjZFVU9NSG9DaGk5ODRBNmhNNE9sSl8tX3FTdmdxUGpjeWxQa2RMb2ZFdm1uZDlWYTNNWE44M1hzeVY5NnVxU1RLTTVyQ0hXazN2em9fMjV5SnZlLUo5V3BPVEUxSE5QVTY5cHZXQW54VUFsYXpJY3NnV0hIQWJTLXZlcW5HY004?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/us-clears-f-35-jet-sales-to-turkey.png",
      "alt": "A modern fighter jet parked on a runway at dusk.",
      "credit": "AI-generated"
    },
    "rank": 32,
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Lend-Lease Act (1941)",
        "excerpt": "To sell, transfer title to, exchange, lease, lend, or otherwise dispose of, to any such government any defense article",
        "source": "U.S. National Archives, Milestone Documents: Lend-Lease Act (1941)",
        "href": "https://www.archives.gov/milestone-documents/lend-lease-act"
      },
      {
        "category": "historical",
        "title": "Treaty of Alliance Between the United States and France (1778)",
        "excerpt": "The essential and direct End of the present defensive alliance is to maintain effectually the liberty, Sovereignty, and independance absolute and unlimited of the said united States, as well in Matters of Gouvernement as of commerce.",
        "source": "The Avalon Project, Yale Law School: Treaty of Alliance Between The United States and France; February 6, 1778 (Article 2)",
        "href": "https://avalon.law.yale.edu/18th_century/fr1788-2.asp"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II (Laocoon's warning)",
        "excerpt": "O wretched countrymen! what fury reigns? / What more than madness has possess'd your brains? / Think you the Grecians from your coasts are gone? / And are Ulysses' arts no better known? / This hollow fabric either must inclose, / Within its blind recess, our secret foes; / Or 'tis an engine rais'd above the town, / T' o'erlook the walls, and then to batter down. / Somewhat is sure design'd, by fraud or force: / Trust not their presents, nor admit the horse.",
        "source": "Virgil, The Aeneid, trans. John Dryden, Book II (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228-images.html"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book VI (Diomedes and Glaucus exchange armour)",
        "excerpt": "And let us make exchange of armour, each with the other, that these men too may know that we declare ourselves to be friends from our fathers' days.",
        "source": "Homer, Iliad, Book 6, trans. A. T. Murray (Perseus Digital Library, Tufts University)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D6%3Acard%3D212"
      },
      {
        "category": "artistic",
        "title": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse into Troy (c. 1760)",
        "excerpt": "Tiepolo's canvas shows the Trojans hauling the great wooden horse through their gates, rejoicing over what they take to be a gift while it secretly conceals an armed enemy. The crowd's feverish triumph and the looming bulk of the horse turn a celebrated alliance-by-arms into an image of fatal misjudgment. In the background Cassandra is dragged away for prophesying that admitting the gift will doom the city.",
        "source": "The National Gallery, London: Giovanni Domenico Tiepolo, The Procession of the Trojan Horse into Troy (NG3319)",
        "href": "https://www.nationalgallery.org.uk/paintings/giovanni-domenico-tiepolo-the-procession-of-the-trojan-horse-into-troy",
        "image": {
          "src": "/covers/us-clears-f-35-jet-sales-to-turkey--art.png",
          "alt": "Oil painting of crowds hauling a giant wooden horse on wheels through the gates of Troy beneath towering walls",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Judas Maccabaeus, HWV 63 (chorus: See, the conqu'ring hero comes!)",
        "excerpt": "See, the conqu'ring hero comes!",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63, Act III (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      }
    ]
  },
  {
    "slug": "chemours-forever-chemicals-settlement",
    "headline": "Chemours to pay $450 million to settle 'forever chemicals' case",
    "overview": "The chemical maker Chemours agreed to pay $450 million to settle claims that PFAS 'forever chemicals' contaminated water supplies, US officials said. The settlement is among the largest in a wave of litigation over the long-lasting pollutants.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPY3VmTGVjNlhOYzM4Ym52RXRFbUFXR1ZxZmpWQ3AxTWFieTgwRmY3LWFqZ0VmZXFlLVZIdnNvY25wRmE2eGxiTXlqeVFrNWxERFppVHdxSXlIRmJWdG9CLU53SHpLQTc0b1pWMlo2QXFOS3laUy1VNmV6Rm0zNmNHcmRjTG5VVm1Bb0ItUEVudnFlTmxvWnBBR3lLM3U3LWVGR3Uzb1d0TlpMajhubmc?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/chemours-forever-chemicals-pfas-450-million/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/chemours-forever-chemicals-settlement.png",
      "alt": "Foam gathering on the surface of a river below an industrial chemical plant.",
      "credit": "AI-generated"
    },
    "rank": 33,
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Minamata Disease (Chisso mercury poisoning, Japan)",
        "excerpt": "Beginning in the 1930s the Chisso chemical factory discharged methylmercury into Minamata Bay, where it accumulated in fish and shellfish and poisoned the people who ate them, causing crippling neurological illness and birth defects. Officially recognized in 1956, it became the first disease acknowledged to be caused by industrial water pollution. Decades of denial, litigation, and compensation followed, making Minamata the archetype of a corporation forced to reckon with the waters it had silently fouled.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/science/Minamata-disease"
      },
      {
        "category": "historical",
        "title": "The Love Canal Toxic Waste Disaster",
        "excerpt": "In the 1940s and 1950s the Hooker Chemicals and Plastics Corporation buried roughly 22,000 tons of chemical waste in an abandoned canal in Niagara Falls, New York, which was later covered over and built upon as a neighborhood. By 1978 toxic chemicals were seeping into basements and yards, sickening residents, and the site became a national symbol of hidden industrial contamination. Protracted litigation ended with multimillion-dollar settlements paid by Occidental Chemical, the corporate successor, for past contamination of land and water.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/place/Love-Canal"
      },
      {
        "category": "literary",
        "title": "London, by William Blake",
        "excerpt": "I wander thro' each charter'd street, / Near where the charter'd Thames does flow, / And mark in every face I meet / Marks of weakness, marks of woe.",
        "source": "Wikisource (Songs of Innocence and of Experience, 1826)",
        "href": "https://en.wikisource.org/wiki/London_(Songs_of_Experience)"
      },
      {
        "category": "literary",
        "title": "The Deserted Village, by Oliver Goldsmith",
        "excerpt": "Ill fares the land, to hast'ning ills a prey, / Where wealth accumulates, and men decay: / Princes and lords may flourish, or may fade; / A breath can make them, as a breath has made: / But a bold peasantry, their country's pride, / When once destroy'd, can never be supplied.",
        "source": "CELT: Corpus of Electronic Texts (University College Cork)",
        "href": "https://celt.ucc.ie/published/E750001-001/text001.html"
      },
      {
        "category": "artistic",
        "title": "Israel in Egypt, HWV 54 ('He turned their waters into blood'), by George Frideric Handel",
        "excerpt": "In this 1739 oratorio Handel sets the biblical plagues of Egypt to music, including the grim chorus 'They loathed to drink of the river: He turned their waters into blood.' The chromatic, lurching fugue makes the listener feel the revulsion of waters made undrinkable, dramatizing a land afflicted because of human wrongdoing. It stands as a centuries-old musical image of poisoned waters and the reckoning that follows.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Israel_in_Egypt,_HWV_54_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Coalbrookdale by Night, by Philip James de Loutherbourg",
        "excerpt": "Painted in 1801, this oil shows the Bedlam furnaces of Coalbrookdale roaring with flame and smoke, the fires of industry consuming a once-pastoral landscape beneath the moonlight. It has come to symbolize the birth of the Industrial Revolution and the way human industry both transformed and despoiled the natural world. The lurid glow over the darkened valley reads today as an early vision of nature blighted by human hands.",
        "source": "Wikipedia (Coalbrookdale by Night)",
        "href": "https://en.wikipedia.org/wiki/Coalbrookdale_by_Night",
        "image": {
          "src": "/covers/chemours-forever-chemicals-settlement--art.png",
          "alt": "Coalbrookdale by Night (1801) by Philip James de Loutherbourg, showing the fiery glow of industrial furnaces over a darkened valley",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "france-air-conditioning-debate-heatwave",
    "headline": "Air conditioning splits France politically after the country records its hottest day",
    "overview": "France's record-breaking heat has ignited a political fight over air conditioning, with parties split over whether to expand its use or discourage it on environmental grounds. The debate erupted after the country logged its hottest day on record during a heatwave across western Europe.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c4gyqldl3p5o?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "Fortune",
        "href": "https://fortune.com/2026/06/22/france-heat-wave-spain-italy-uk-music-dayac/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/france-air-conditioning-debate-heatwave.png",
      "alt": "People resting in narrow strips of shade by a dry fountain during a European heatwave.",
      "credit": "AI-generated"
    },
    "rank": 34,
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The European heat wave of 2003",
        "excerpt": "France's deadliest modern heat disaster killed more than 14,000 people in August 2003, most of them elderly and isolated, exposing how little of the country was equipped to cope with extreme heat. The catastrophe shocked French society into rethinking public-health and building responses and remains the touchstone for every later argument over adaptation, including the present fight over air conditioning.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/event/European-heat-wave-of-2003"
      },
      {
        "category": "historical",
        "title": "The 1976 European heatwave and drought",
        "excerpt": "The summer of 1976 was remembered as the hottest of the twentieth century in western Europe, with the highest temperatures recorded across western France and a months-long drought that scorched crops and emptied reservoirs. It became an early test of how governments and citizens should respond to a sustained, hostile heat, prefiguring today's contest between relief and restraint.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1976_European_heatwave"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II (Phaethon scorches the earth)",
        "excerpt": "The grass is blighted; trees / are burnt up with their leaves; the ripe brown crops / give fuel for self destruction—Oh what small / complaints! Great cities perish with their walls, / and peopled nations are consumed to dust— / the forests and the mountains are destroyed.",
        "source": "Perseus Digital Library (Ovid, Metamorphoses, trans. Brookes More)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "literary",
        "title": "William Cullen Bryant, “Summer Wind”",
        "excerpt": "It is a sultry day; the sun has drunk\nThe dew that lay upon the morning grass;\nThere is no rustling in the lofty elm\nThat canopies my dwelling, and its shade\nScarce cools me. All is silent, save the faint\nAnd interrupted murmur of the bee,\nSettling on the sick flowers, and then again\nInstantly on the wing.",
        "source": "Project Gutenberg (Poems by William Cullen Bryant)",
        "href": "https://www.gutenberg.org/files/16341/16341-h/16341-h.htm"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, The Sower (June 1888)",
        "excerpt": "Van Gogh paints a peasant striding across a stubble field beneath an enormous yellow sun that fills nearly half the sky, its halo radiating across the canvas. The blazing disc dominates the landscape, turning the heavens molten and pressing its heat over the small laboring figure, an image of human endurance under an overwhelming sun.",
        "source": "Wikimedia Commons (The Sower, Van Gogh, Kröller-Müller Museum)",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_sower_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/france-air-conditioning-debate-heatwave--art.png",
          "alt": "Van Gogh's The Sower, a peasant sowing in a field beneath a huge blazing yellow sun that dominates the sky",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Antonio Vivaldi, “Summer” (L'Estate) from The Four Seasons",
        "excerpt": "Sotto dura Staggion dal Sole accesa / Langue l' huom, langue 'l gregge, ed arde il Pino",
        "source": "IMSLP / Petrucci Music Library (Le quattro stagioni, Vivaldi)",
        "href": "https://imslp.org/wiki/The_Four_Seasons_(Vivaldi,_Antonio)"
      }
    ]
  },
  {
    "slug": "ramsa-new-york-historical-extension",
    "headline": "RAMSA completes the Tang Wing extension of the New-York Historical museum",
    "overview": "Robert A. M. Stern Architects has completed the Tang Wing, a new extension for the New-York Historical museum dedicated to the study of American democracy. The classically styled addition adds galleries, a library and an academy on Manhattan's Upper West Side.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/23/tang-wing-american-democracy-new-york-city-ramsa/"
      },
      {
        "name": "Galerie Magazine",
        "href": "https://galeriemagazine.com/tang-wing-for-american-democracy-debuts-at-new-york-historical-society/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/ramsa-new-york-historical-extension.png",
      "alt": "The classical limestone facade of the museum's new Tang Wing extension.",
      "credit": "Dezeen"
    },
    "rank": 35,
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Vitruvius, The Ten Books on Architecture, Book I, Chapter VII",
        "excerpt": "For the temples, the sites for those of the gods under whose particular protection the state is thought to rest and for Jupiter, Juno, and Minerva, should be on the very highest point commanding a view of the greater part of the city.",
        "source": "Project Gutenberg (Morris H. Morgan translation, 1914)",
        "href": "https://www.gutenberg.org/files/20239/20239-h/20239-h.htm"
      },
      {
        "category": "historical",
        "title": "Thucydides, History of the Peloponnesian War, Book II (Pericles' Funeral Oration)",
        "excerpt": "For heroes have the whole earth for their tomb; and in lands far from their own, where the column with its epitaph declares it, there is enshrined in every breast a record unwritten with no tablet to preserve it, except that of the heart.",
        "source": "Wikisource (Crawley translation)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"For You O Democracy\" (Leaves of Grass, Calamus)",
        "excerpt": "Come, I will make the continent indissoluble,\nI will make the most splendid race the sun ever shone upon,\nI will make divine magnetic lands,\n     With the love of comrades,\n       With the life-long love of comrades.",
        "source": "American Literature (full text, public domain)",
        "href": "https://americanliterature.com/author/walt-whitman/poem/for-you-o-democracy"
      },
      {
        "category": "literary",
        "title": "Daniel Webster, Bunker Hill Monument Oration (1825)",
        "excerpt": "It rises over the land and over the sea; and visible, at their homes, to three hundred thousand of the people of Massachusetts, it stands a memorial of the last, and a monitor to the present, and to all succeeding generations.",
        "source": "American Battlefield Trust (primary sources)",
        "href": "https://www.battlefields.org/learn/primary-sources/dedication-speech-unveiling-bunker-hill-monument"
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, The Architect's Dream (1840)",
        "excerpt": "Cole's oil painting frames a young architect reclining atop a colossal column, dreaming of an imagined landscape crowded with the monuments of the ages. Egyptian pyramids, a Greek Doric temple, a Roman aqueduct and a Gothic cathedral rise in luminous succession, presenting classical architecture as the keeper of civilization's memory. It is a fitting parallel to a classical-style wing conceived as a temple to the American republic and its history.",
        "source": "Toledo Museum of Art / Wikimedia Commons",
        "href": "https://en.wikipedia.org/wiki/The_Architect's_Dream",
        "image": {
          "src": "/covers/ramsa-new-york-historical-extension--art.png",
          "alt": "Thomas Cole's 1840 painting The Architect's Dream, showing an architect reclining atop a tall column amid classical temples, an aqueduct and a Gothic cathedral",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Charles Ives, \"The St.-Gaudens in Boston Common\" from Three Places in New England",
        "excerpt": "The opening movement of Ives's orchestral set is a musical meditation on a civic monument, Augustus Saint-Gaudens's bronze memorial on Boston Common to Colonel Robert Gould Shaw and the 54th Massachusetts Regiment. The slow, layered score weaves Civil War tunes and spirituals into a hushed processional, turning a public memorial into sound. Like a classical wing devoted to American democracy, it treats a monument as a vessel for the keeping of national memory.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Three_Places_in_New_England_(Ives,_Charles)"
      }
    ]
  },
  {
    "slug": "saype-clasping-arms-mural-minneapolis",
    "headline": "Saype paints a 23,000-square-foot 'clasping arms' land mural in Minneapolis",
    "overview": "The land artist Saype created a 23,000-square-foot biodegradable grass mural of two clasping arms on a Minneapolis green space, part of his global 'Beyond Walls' series celebrating community and human connection. Painted with natural pigments, the work is designed to fade back into the grass.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/saype-beyond-walls-minneapolis-temporary-mural/"
      },
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/saype-beyond-walls-minneapolis-temporary-mural/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/saype-clasping-arms-mural-minneapolis.png",
      "alt": "An aerial view of Saype's giant grass mural of two clasping arms on a lawn.",
      "credit": "Colossal"
    },
    "rank": 36,
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Baltic Way (1989)",
        "excerpt": "On 23 August 1989, roughly two million people across Estonia, Latvia, and Lithuania joined hands to form an unbroken human chain stretching some 675 kilometres between the three capitals. Held on the fiftieth anniversary of the Molotov-Ribbentrop Pact, the fifteen-minute demonstration turned clasped hands into a continent-spanning symbol of solidarity and the shared desire for independence. Like Saype's intertwined arms, it made human connection itself the medium of a vast, temporary, collective artwork.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Baltic_Way"
      },
      {
        "category": "historical",
        "title": "Hands Across America (1986)",
        "excerpt": "On 25 May 1986, an estimated five million people attempted to link hands in a continuous chain from New York's Battery Park to Long Beach, California, threading through sixteen states to raise money against hunger and homelessness. Where gaps opened across the desert, ribbons and ropes stood in for missing hands, yet the gesture of a nation clasping hands across its divides became the event's enduring image. It anticipates the message of Saype's Beyond Walls: that a chain of joined hands can stage solidarity on a landscape scale.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Hands_Across_America"
      },
      {
        "category": "literary",
        "title": "Ozymandias by Percy Bysshe Shelley (1818)",
        "excerpt": "And on the pedestal these words appear: \"My name is Ozymandias, King of Kings.\" Look on my works ye Mighty, and despair! No thing beside remains. Round the decay Of that Colossal Wreck, boundless and bare, The lone and level sands stretch far away.",
        "source": "Wikisource (The Examiner, 1818)",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "literary",
        "title": "For You O Democracy by Walt Whitman (Leaves of Grass)",
        "excerpt": "I will plant companionship thick as trees along all the rivers of America, and along the shores of the great lakes, and all over the prairies, I will make inseparable cities with their arms about each other's necks, By the love of comrades, By the manly love of comrades.",
        "source": "Project Gutenberg (Leaves of Grass)",
        "href": "https://www.gutenberg.org/files/1322/1322-h/1322-h.htm"
      },
      {
        "category": "artistic",
        "title": "Praying Hands by Albrecht Durer (1508)",
        "excerpt": "Durer's celebrated study renders a pair of hands pressed and clasped together in ink and wash on blue paper, drawn as preparation for the lost Heller Altarpiece. Isolated from any figure, the two hands alone carry the entire weight of devotion and human feeling, much as Saype's mural distills connection into nothing but clasping arms. It remains one of the most reproduced images of joined hands in Western art.",
        "source": "Wikimedia Commons / Albertina, Vienna",
        "href": "https://commons.wikimedia.org/wiki/File:Albrecht_D%C3%BCrer_-_Praying_Hands,_1508_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/saype-clasping-arms-mural-minneapolis--art.png",
          "alt": "Albrecht Durer's 1508 study of two hands pressed and clasped together in prayer, drawn in ink and wash on blue paper.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Symphony No. 9 (Ode to Joy) by Ludwig van Beethoven (1824)",
        "excerpt": "Beethoven's choral finale sets Schiller's hymn to universal brotherhood, its chorus calling on millions to embrace one another and proclaiming that all people shall become brothers. The surging melody has since become a global anthem of solidarity and fellowship across divides. Its plea to embrace the multitudes mirrors the heart of Saype's Beyond Walls, where clasped hands stand for a single human chain joining city to city.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
      }
    ]
  },
  {
    "slug": "ntsb-investigates-texas-tesla-crash",
    "headline": "US NTSB opens an investigation into a fatal Tesla crash in Texas",
    "overview": "The National Transportation Safety Board said it will investigate a fatal Tesla crash in Texas, examining whether the vehicle's driver-assistance systems were in use. It is the latest federal scrutiny of the automaker's automated-driving technology.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPbzQ4REhDNmNqNW5maVlSakJPdnRrTTFnOVFSOWxiQXFuSl9DRFNKaDM0aEhhNklNMU16dnlOV29ncDc1QXdQek5pZDNJb3Z1X3FUSFlBYXZkQ29XbmVPWGNRYjRqRDl5azcxeVp0R2hjdXZYTVFGd1FBZFhNSnNQRk1rVkQtSFdaZWFuWjZKOHctR19sdjFGVHhrNVM3Z0hueWlnUnhR?oc=5"
      },
      {
        "name": "Transport Topics",
        "href": "https://www.ttnews.com/articles/ntsb-tesla-texas-crash"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/ntsb-investigates-texas-tesla-crash.png",
      "alt": "A damaged electric car at the roadside on a dark highway at night.",
      "credit": "AI-generated"
    },
    "rank": 37,
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Death of William Huskisson at the Opening of the Liverpool and Manchester Railway (1830)",
        "excerpt": "At the triumphant inauguration of the Liverpool and Manchester Railway on 15 September 1830, the statesman William Huskisson stepped down onto the line and was struck by Stephenson's celebrated locomotive Rocket, becoming one of the first widely reported railway casualties. The very machine paraded as the future of transport killed a man at its own debut, and his death broadcast to the world that rapid mechanical travel was as dangerous as it was revolutionary. It set the enduring pattern of a new technology whose promise and its peril arrive together.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/William_Huskisson"
      },
      {
        "category": "historical",
        "title": "The Tay Bridge Disaster (1879)",
        "excerpt": "On the stormy night of 28 December 1879 the first Tay Rail Bridge, hailed as a marvel of Victorian engineering, collapsed as a passenger train crossed it, plunging every soul aboard into the Firth of Tay and killing 59 people. The Court of Inquiry blamed the design itself, which had made no proper allowance for wind loading, ruining the reputation of its engineer Sir Thomas Bouch. It stands as a parable of automation and engineering hubris outrunning the limits its makers failed to reckon with.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Tay_Bridge_disaster"
      },
      {
        "category": "literary",
        "title": "Frankenstein; or, The Modern Prometheus (Mary Shelley, 1818)",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II: The Fall of Phaethon",
        "excerpt": "Soon as the steeds perceived it, with a rush / impetuous, they left the beaten track; / regardless of all order and control; / and Phaethon filled with fear, knew not to guide / with trusted reins, nor where the way might be—",
        "source": "Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=150"
      },
      {
        "category": "artistic",
        "title": "Landscape with the Fall of Icarus (after Pieter Bruegel the Elder, c. 1560)",
        "excerpt": "In this celebrated panel held by the Royal Museums of Fine Arts of Belgium, Icarus has already plunged into the sea after flying too near the sun, and only his flailing legs break the water in a corner of the canvas. Plowman, shepherd and ship carry on unmoved, indifferent to the boy whose soaring ambition has just destroyed him. The image distills the myth of human overreach with flight technology, the fatal hubris that drives a creation beyond its safe limits.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Landscape_with_the_Fall_of_Icarus",
        "image": {
          "src": "/covers/ntsb-investigates-texas-tesla-crash--art.png",
          "alt": "Landscape with the Fall of Icarus, showing a plowman, shepherd and ship while Icarus's legs disappear into the sea in the lower right",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "L'apprenti sorcier (The Sorcerer's Apprentice), Paul Dukas (1897)",
        "excerpt": "Dukas's symphonic poem, after Goethe's ballad, sets to music an apprentice who enchants a broomstick to do his labor and then loses all command of it, the magic multiplying and flooding the workshop beyond any human control. Surging, accelerating orchestral figures drive the runaway servant onward until only the returning master can halt the machine the apprentice set in motion. It is the archetypal warning of a created mechanism that turns on its maker once it slips past the bounds of human oversight.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)"
      }
    ]
  },
  {
    "slug": "white-house-seeks-87-billion-iran-war-ebola",
    "headline": "White House asks Congress for $87.6 billion for Iran war costs, farmers and Ebola",
    "overview": "The White House asked Congress for $87.6 billion in emergency funding to cover costs from the war with Iran, aid to US farmers and the response to an Ebola outbreak. The request would add to federal spending already strained by the recent conflict.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxOUDQzaWl6M29jQjFXRGM2MC1IbkhBbG93TVVJcmg1emQ2SkFlYlNRdUtlRlVDU0ExWWY1UGpfaHFvSE4yekhRVGlNWVNrY2p5Nk1Mb05PVEYzX2U4MjFWU1lYUkw3VElTOTFJS1VkLTdoMzF1b25PdzJ5aVdQc2V6X2dZSjNscVdDV1A4eEtoMTM0UDRwVXowYm9uc0VDSVJKMHlFX0J4Vl95dFk?oc=5"
      },
      {
        "name": "Reuters — Ebola funding",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPZXdwRVVIQW8wdjlRU1lTVGNDcHRmNmtOUDh3cFh2cmZLamFFdFp6Q0poS2Ztc3YxTjJoMloyNTdKTmk3SWgxMGpwa1ItaTZyVjFjS3Q1Y0toNFU5SDhnWUlDU0g5aDA4RHVDUnJfYUFsNkxQaWJIRkFkYlB2RjRWcENNNDZtUndGSnVOVW84T1hxWkJnM2VDSzVRMmh5QkVN?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/white-house-seeks-87-billion-iran-war-ebola.png",
      "alt": "The dome of the US Capitol against a brooding, stormy sky.",
      "credit": "AI-generated"
    },
    "rank": 38,
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, Philippic V (44 BC)",
        "excerpt": "What is this but to lavish on an enemy all the weapons for civil war? first of all, the sinews of war, infinite treasure, which he now needs; in the next place, cavalry, as many as he wishes.",
        "source": "Cicero, The Fifth Philippic, section 5 (Attalus.org translation)",
        "href": "https://www.attalus.org/cicero/philippic5.html"
      },
      {
        "category": "historical",
        "title": "Dwight D. Eisenhower, \"The Chance for Peace\" (1953)",
        "excerpt": "Every gun that is made, every warship launched, every rocket fired signifies, in the final sense, a theft from those who hunger and are not fed, those who are cold and are not clothed. This world in arms is not spending money alone. It is spending the sweat of its laborers, the genius of its scientists, the hopes of its children. The cost of one modern heavy bomber is this: a modern brick school in more than 30 cities.",
        "source": "Address \"The Chance for Peace\" Delivered Before the American Society of Newspaper Editors, April 16, 1953 (The American Presidency Project)",
        "href": "https://www.presidency.ucsb.edu/documents/address-the-chance-for-peace-delivered-before-the-american-society-newspaper-editors"
      },
      {
        "category": "literary",
        "title": "Rudyard Kipling, \"A Dead Statesman\" from Epitaphs of the War (1919)",
        "excerpt": "I could not dig: I dared not rob:\nTherefore I lied to please the mob.\nNow all my lies are proved untrue\nAnd I must face the men I slew.\nWhat tale shall serve me here among\nMine angry and defrauded young?",
        "source": "Rudyard Kipling, \"Epitaphs of the War\" (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Epitaphs_of_the_War"
      },
      {
        "category": "literary",
        "title": "Wilfred Owen, \"Dulce et Decorum Est\" (1920)",
        "excerpt": "My friend, you would not tell with such high zest\nTo children ardent for some desperate glory,\nThe old Lie: Dulce et decorum est\nPro patria mori.",
        "source": "Poems by Wilfred Owen, \"Dulce et Decorum est\" (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Poems_by_Wilfred_Owen/Dulce_et_Decorum_est"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, \"Mars, the Bringer of War\" from The Planets, Op. 32 (1914-1916)",
        "excerpt": "Holst's relentless opening movement drives forward on a hammering five-beat ostinato, a mechanized march that swells into brassy, dissonant climaxes. It depicts war not as glory but as an implacable, grinding machine that consumes everything in its path, an apt sonic image for treasure and lives poured into conflict.",
        "source": "The Planets, Op. 32 (Holst, Gustav) (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya, The Disasters of War (c. 1810-1820)",
        "excerpt": "Goya's series of etchings strips war of all pageantry, recording famine, plunder, and slaughter with unsparing realism. The opening plate, \"Tristes presentimientos de lo que va a acontecer\" (Sad forebodings of what is to come), sets the tone for a catalogue of the human price paid when nations turn their resources to violence.",
        "source": "File:Francisco de Goya, Desastre de la Guerra (Disasters of War) (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Francisco_de_Goya,_Desastre_de_la_Guerra_(Disasters_of_War).JPG",
        "image": {
          "src": "/covers/white-house-seeks-87-billion-iran-war-ebola--art.png",
          "alt": "Francisco de Goya etching \"Tristes presentimientos de lo que va a acontecer\" (Sad forebodings of what is to come), plate 1 of The Disasters of War, showing a kneeling figure amid darkness.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "misan-harriman-steps-down-southbank",
    "headline": "Misan Harriman steps down as chair of London's Southbank Centre",
    "overview": "The photographer Misan Harriman announced he will step down as chair of the Southbank Centre, one of Britain's largest arts institutions. His tenure paired his rise as a photographer with a push to broaden the audiences and artists the centre serves.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/misan-harriman-steps-down-as-southbank-centre-chair-1234753263/"
      },
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/misan-harriman-steps-down-as-southbank-centre-chair-1234753263/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/misan-harriman-steps-down-southbank.png",
      "alt": "Portrait of the photographer Misan Harriman.",
      "credit": "Artforum"
    },
    "rank": 39,
    "edition": "Morning Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Abdication of Diocletian (305 AD)",
        "excerpt": "After more than two decades reshaping the Roman state, Diocletian did what no emperor before him had willingly done: he laid down supreme power and retired to private life. He had arranged a succession in advance and entrusted the empire to younger men, then withdrew to his palace by the Adriatic. His voluntary surrender of the highest office became the archetype of the steward who hands on the trust rather than clinging to it.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/biography/Diocletian/Domestic-reforms"
      },
      {
        "category": "historical",
        "title": "George Washington Resigns His Commission (1783)",
        "excerpt": "On 23 December 1783, having won the war, George Washington walked into the Maryland State House at Annapolis and handed his military commission back to Congress, voluntarily relinquishing power to return to private life. The gesture astonished a world accustomed to victorious generals seizing the state, and it set the founding precedent of civilian stewardship over force. It remains the defining image of a leader who lets go of high office when the work is done.",
        "source": "Wikipedia (George Washington's resignation as commander-in-chief)",
        "href": "https://en.wikipedia.org/wiki/George_Washington%27s_resignation_as_commander-in-chief"
      },
      {
        "category": "literary",
        "title": "King Lear lays down his kingdom (Shakespeare, Act I, Scene 1)",
        "excerpt": "Give me the map there. Know that we have divided / In three our kingdom: and 'tis our fast intent / To shake all cares and business from our age; / Conferring them on younger strengths, while we / Unburthen'd crawl toward death.",
        "source": "The Complete Works of William Shakespeare (MIT)",
        "href": "https://shakespeare.mit.edu/lear/lear.1.1.html"
      },
      {
        "category": "literary",
        "title": "Prospero abjures his art (Shakespeare, The Tempest, Act V)",
        "excerpt": "But this rough magic\nI here abjure; and, when I have required\nSome heavenly music,—which even now I do,—\nTo work mine end upon their senses, that\nThis airy charm is for, I'll break my staff,\nBury it certain fathoms in the earth,\nAnd deeper than did ever plummet sound\nI'll drown my book.",
        "source": "The Tempest, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/23042/23042-h/23042-h.htm"
      },
      {
        "category": "artistic",
        "title": "Napoleon at Fontainebleau, 31 March 1814 (Paul Delaroche)",
        "excerpt": "Paul Delaroche's painting shows the deposed Napoleon seated alone in a chamber of the Palace of Fontainebleau in the hours surrounding his abdication, his hat fallen to the floor and his expression turned inward. The grandeur of the setting only sharpens the picture of a man stripped of supreme office. It is one of art's most studied meditations on the relinquishing of power and the solitude that follows the surrender of high stewardship.",
        "source": "Wikipedia (Napoleon I at Fontainebleau on March 31, 1814)",
        "href": "https://en.wikipedia.org/wiki/Napoleon_I_at_Fontainebleau_on_March_31,_1814",
        "image": {
          "src": "/covers/misan-harriman-steps-down-southbank--art.png",
          "alt": "Paul Delaroche's painting of Napoleon seated alone at the Palace of Fontainebleau around the time of his 1814 abdication, his hat on the floor",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Haydn, Symphony No. 45 in F-sharp minor, 'Farewell' (1772)",
        "excerpt": "Joseph Haydn's 'Farewell' Symphony ends with a quiet stagecraft of departure: in the final Adagio the musicians finish their parts one by one, snuff out their candles and leave the platform, until only a pair of violins remain to close the work. Written so Haydn's players might be released to go home, it has become music's enduring emblem of taking leave and handing the moment on. The slow emptying of the stage turns a resignation into a graceful, deliberate exit.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.45_in_F-sharp_minor,_Hob.I:45_(Haydn,_Joseph)"
      }
    ]
  }
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
