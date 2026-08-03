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
// the newest edition leads with its hero story, followed by the two prior
// editions rendered as labeled grids.
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
const stories: Story[] = [
  {
    "slug": "rhine-record-low-drought-europe",
    "headline": "The Rhine falls to record-low water levels as a severe drought grips rivers across Europe",
    "overview": "Water levels on the Rhine dropped to record lows as a hot, dry summer parched rivers across Europe, with the Danube and Po also shrinking. The low water has curtailed cargo shipping and cut hydroelectric output, officials said. Drought warnings stretched from Britain to the Balkans as wildfires burned in France and Greece.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c78gn8zvrx4o"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxOWVJ3YktkdzVuTjE5NnBtRXhReVlTNDdxZUpfOHZGTmhfVjRtd0pka2J4Nk5kR3FwNHFTWGc1aVIzX0ZteWF5dGRfdW1fdl9BVF9uRmctOGxnd1QxbzlicEpzaWlwYXVrRWFzLWFTM3VhT1AzV3llelkyUEhCWnRhblRCRHkwdW45aFA4SjZNdEkweExfNU4wMzcxWUFjcnNENm5lV2d2UFZKdFdmZ1NuNnZn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/rhine-record-low-drought-europe.png",
      "alt": "A wide river reduced to a narrow channel between broad expanses of exposed, cracked riverbed and gravel banks under a hazy summer sky.",
      "credit": "BBC"
    },
    "lead": true,
    "edition": "Evening Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Famine Stela of Sehel Island",
        "excerpt": "Carved onto a granite boulder overlooking the Nile at the First Cataract, this inscription speaks in the voice of the pharaoh Djoser, recalling seven years in which the god Hapy — the annual flood — failed to arrive: the grain shriveled, the granaries stood empty, and the whole land starved until the king appealed to the ram-god Khnum at the river's supposed source to loose the waters again. It is humanity's oldest surviving account of a nation brought to ruin by a great river running low, and a reminder that in the ancient world a shrunken river meant not inconvenience but famine.",
        "source": "The Famine Stela, Sehel Island near Aswan, Egypt (carved in the Ptolemaic period, c. 3rd–2nd c. BCE, purporting to record the reign of King Djoser of the 3rd Dynasty); English translation by Miriam Lichtheim, Ancient Egyptian Literature, vol. 3 (1980), via Attalus.org",
        "href": "https://www.attalus.org/egypt/famine_stele.html"
      },
      {
        "category": "historical",
        "title": "The Elbe Hunger Stone at Děčín",
        "excerpt": "\"Wenn du mich siehst, dann weine\" — \"If you see me, weep.\" This warning is cut into a boulder that lies submerged in the Elbe and reappears only in the driest years, when the water sinks to famine-low levels; the Děčín stone's oldest legible date is 1616. Generations of Central Europeans carved such marks so that anyone who saw the same rock bared again by drought would know hard times — failed harvests and hunger — were on the way. When the great European droughts of recent summers exposed these stones once more, an early-modern message crossed four centuries intact.",
        "source": "Hunger stone, Elbe River at Děčín, Czech Republic; the boulder's oldest legible carving dates to 1616. Documented via Wikipedia / Wikimedia Commons",
        "href": "https://en.wikipedia.org/wiki/Hunger_stone",
        "image": {
          "src": "/covers/rhine-record-low-drought-europe--a1.png",
          "alt": "A large inscribed stone exposed above the low water of the Elbe river at Děčín during the drought of summer 2015",
          "credit": "Photo: Norbert Kaiser, hunger stone in the Elbe at Děčín during the low water of summer 2015. CC BY-SA 3.0 DE via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II (The Fall of Phaethon)",
        "excerpt": "Caister's streams amid. In terror Nile / Fled to the farthest earth, and sunk his head, / Yet undiscover'd!--void the seven-fold stream, / His mouth seven dry and dusty vales disclos'd. / Now Hebrus dries, and Strymon, Thracian floods: / And streams Hesperian, Rhine; and Rhone; and Po; / And Tiber, destin'd all the world to rule.",
        "source": "Ovid, The Metamorphoses of Publius Ovidius Naso in English Blank Verse, Book the Second, translated by J. J. Howard (London, 1807), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/28621/28621-h/28621-h.htm"
      },
      {
        "category": "literary",
        "title": "T. S. Eliot, The Waste Land (Part V)",
        "excerpt": "Here is no water but only rock / Rock and no water and the sandy road / The road winding above among the mountains / Which are mountains of rock without water / If there were water we should stop and drink / Amongst the rock one cannot stop or think / Sweat is dry and feet are in the sand ... Dead mountain mouth of carious teeth that cannot spit ... There is not even silence in the mountains / But dry sterile thunder without rain",
        "source": "T. S. Eliot, The Waste Land (1922), Part V, 'What the Thunder Said', Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1321/1321-h/1321-h.htm"
      },
      {
        "category": "artistic",
        "title": "Elijah in the Wilderness",
        "excerpt": "Leighton paints the prophet Elijah collapsed on sun-baked rock during the three-year drought he had called down upon Israel (1 Kings 17–18), his sinewy, sun-darkened body sprawled in exhaustion while an angel stoops to offer bread and a cruse of water. The cracked tawny wilderness and the fallen man make visible what a killing drought does to the living — a land where the rains have simply stopped and even the strongest are laid low. It turns the abstraction of a rainless season into a single human body at the edge of endurance.",
        "source": "Frederic Leighton, Elijah in the Wilderness (1877–78), oil on canvas, Walker Art Gallery, Liverpool; Google Art Project via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Frederic,_Lord_Leighton_-_Elijah_in_the_Wilderness_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/rhine-record-low-drought-europe--a4.png",
          "alt": "An exhausted, sun-darkened Elijah lies on parched rock in a desert while an angel brings him bread and water",
          "credit": "Frederic Leighton, Elijah in the Wilderness (1877–78), Walker Art Gallery, Liverpool. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Haydn, The Seasons — 'Summer'",
        "excerpt": "In the 'Summer' part of Haydn's oratorio, the music depicts a countryside gasping beneath a merciless noon sun — sultry, shimmering air, languishing flocks, and fields drooping in the heat — before a great orchestral thunderstorm at last breaks the drought with rain. Composed in 1801 to Gottfried van Swieten's libretto, it is one of the most vivid portraits in all of music of parched land longing for water, and of the relief when the sky finally opens. The listener hears the very arc of a hot, dry summer and its overdue rescue.",
        "source": "Joseph Haydn, Die Jahreszeiten (The Seasons), Hob. XXI:3, Part 2 'Der Sommer' (first performed 1801), full and vocal scores at IMSLP",
        "href": "https://imslp.org/wiki/Die_Jahreszeiten,_Hob.XXI:3_(Haydn,_Joseph)"
      }
    ],
    "rank": 1
  },
  {
    "slug": "amazon-three-trillion-stocks-rally",
    "headline": "Amazon becomes the fourth company valued at $3 trillion as US stocks rally near a record on falling oil prices",
    "overview": "Amazon's market value closed above $3 trillion for the first time, joining a small club of the world's most valuable companies as AI and cloud growth powered a broad rally. US stock indexes climbed near record highs after oil prices fell sharply, easing Wall Street's worries about inflation. The Dow closed at a record.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOT2h5X3dkMzhkV3ZxZ3UtZ2ZlMEh4bVVzeUF6RDlYS3R6SEFrSXlRRlJ6SDBCVFZITUV1eUYwX21VcFlIQkhrV05NM3Rudnp4LVNxNEN5WnlFM0FrSDZFNC1nX2dISGx5Z0xqQndiWHRqdkxDaHJ3ek5hcjNnZERtWTRnYThyd3MwRkVHdmg3djFLeFdFMFBLeW91NXVaVjUxQUpwSDhkUUpBa2hHNGxlcHVEbUc2NUlrUjdIYWhwcWFsZw?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOWTMweFRadm51ZDBCVG5fZlAzdEFVZGZpZ2dVcVdsb0dfRHI4M3VzTWI4YllxTDBQUzJNUDQwLXFjZnVMMG43aW0zbnJ1ZmxyODhmdk1zeXhIVmdxc2F4OUlPNWZ6MFFZRTlKNnduenlqcjJDQ3JNWHpuZFBpejZmTXVva3ZwTWg1cnduR2hhMTJQYmVVZ3JacklNYw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/amazon-three-trillion-stocks-rally.png",
      "alt": "The columned neoclassical Wall Street facade of the New York Stock Exchange building, draped with a large flag.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Crassus, the richest man in Rome",
        "excerpt": "For at the outset he was possessed of not more than three hundred talents; ... when he made a private inventory of his property before his Parthian expedition, he found that it had a value of seventy-one hundred talents. ... And though he owned numberless silver mines, and highly valuable tracts of land with the labourers upon them, nevertheless one might regard all this as nothing compared with the value of his slaves.",
        "source": "Plutarch, Life of Crassus, ch. 2, trans. Bernadotte Perrin (Loeb, 1916); Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0038:chapter=2"
      },
      {
        "category": "historical",
        "title": "Charter of the Dutch East India Company (VOC), 1602 — the first megacorporation",
        "excerpt": "As the prosperity of the united Netherlands consists principally of the navigation, trade and commerce, which have been carried on from these countries from time immemorial, and which from time to time have been praiseworthily increased ... some principal merchants of the aforementioned countries, lovers of navigation, trade and commerce on foreign countries ... have taken in hand the very praiseworthy navigation, trade and commerce on the East Indies.",
        "source": "Charter granted by the States-General of the United Netherlands, 20 March 1602; English translation, Wikisource",
        "href": "https://en.wikisource.org/wiki/Translation:VOC_charter",
        "image": {
          "src": "/covers/amazon-three-trillion-stocks-rally--a1.png",
          "alt": "A sunlit colonnaded courtyard thronged with merchants trading beneath arches, Emanuel de Witte's painting of the Amsterdam stock exchange",
          "credit": "Emanuel de Witte, 'Courtyard of the Amsterdam Stock Exchange' (1653), Museum Boijmans Van Beuningen, Rotterdam. Via Wikimedia Commons (public domain). The world's first stock exchange, where VOC shares were traded."
        }
      },
      {
        "category": "literary",
        "title": "Swift on the South Sea Bubble: 'What magick makes our money rise'",
        "excerpt": "Ye wise philosophers, explain / What magick makes our money rise, / When dropt into the Southern main; / Or do these jugglers cheat our eyes? ... Put in your money fairly told; / Presto! be gone — 'Tis here again: / Ladies and gentlemen, behold, / Here's every piece as big as ten.",
        "source": "Jonathan Swift, 'The South-Sea Project' (1721), in The Works of the Rev. Jonathan Swift, Vol. 7; Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Works_of_the_Rev._Jonathan_Swift/Volume_7/The_South_Sea_Project"
      },
      {
        "category": "literary",
        "title": "Melmotte, 'the very navel of the commercial enterprise of the world'",
        "excerpt": "It seemed that there was but one virtue in the world, commercial enterprise,—and that Melmotte was its prophet. ... at that time, Melmotte was not the strong rock, the impregnable tower of commerce, the very navel of the commercial enterprise of the world,—as all men now regarded him.",
        "source": "Anthony Trollope, The Way We Live Now (1875); Project Gutenberg (eBook #5231)",
        "href": "https://www.gutenberg.org/cache/epub/5231/pg5231.txt"
      },
      {
        "category": "artistic",
        "title": "Hogarth, 'The South Sea Scheme' (1721)",
        "excerpt": "Often called the first editorial cartoon, Hogarth's crowded scene turns the 1720 speculative mania into a carnival of folly: a merry-go-round of stock-jobbers whirls beside a monument to the ruin the bubble caused, while Honesty is broken on the wheel and a mob scrambles for worthless paper fortunes. It is a portrait of a market intoxicated by its own soaring valuations — and of the reckoning that follows.",
        "source": "William Hogarth, 'Emblematical Print on the South Sea Scheme,' engraving, 1721; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/amazon-three-trillion-stocks-rally--a4.png",
          "alt": "Satirical engraving of a chaotic square where speculators ride a giant merry-go-round and crowds jostle amid emblems of greed and ruin",
          "credit": "William Hogarth, 'The South Sea Scheme' (1721). Via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "'Next!' — the Standard Oil octopus and the anatomy of monopoly",
        "excerpt": "Keppler draws the Standard Oil combine as a bloated octopus, its tentacles already coiled around the steel, copper and shipping industries and around a state capitol and the U.S. Capitol, with one arm stretching hungrily toward the White House. It is the definitive image of a single commercial colossus outgrowing the marketplace and reaching for the machinery of government itself.",
        "source": "Udo J. Keppler, 'Next!', chromolithograph, Puck, 7 September 1904; Library of Congress, Prints & Photographs Division",
        "href": "https://www.loc.gov/item/2001695241/",
        "image": {
          "src": "/covers/amazon-three-trillion-stocks-rally--a5.png",
          "alt": "Political cartoon of an octopus labeled Standard Oil gripping industries and government buildings with its tentacles, reaching toward the White House",
          "credit": "Udo J. Keppler, 'Next!', Puck, 1904. Library of Congress, via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "democratic-states-sue-trump-tariffs",
    "headline": "Twenty-five Democratic-led states sue to challenge President Trump's latest round of tariffs",
    "overview": "A coalition of 25 Democratic-led states filed suit to block President Trump's newest tariffs, calling them a 'pretext' to replace an earlier round struck down in court. The lawsuit argues the president exceeded his authority in imposing sweeping import taxes without congressional approval. It is the latest legal clash over the administration's trade policy.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxQV1dVOXhnRXI2M3NoSHgwTFZTUnFzZDdfdEM1ZkpnQXQ2cS1ycXJtNkFkQkN4R3hRVUdjWnpKWTZ5cUF3TFRQT3FGaGx6YkhNejZpem9hcTdlVzhPRFdhSUVJbFRSWEFsaGtQQUxKTGVuQ0E1cFYxZElnSlJZRnhiRnl6ay10Nk1GWXFDYmtKeGtWaEFEREpFclhPYU9wdw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxNQzdtbnRyNlNqdjVKN2l0dllQSjdlQjM0QWVIbFhiM3NnT1JVR0tSLWY5ajZpTVhsQzdwWUJKcVp5VE5hcFdQZU85TU9yVnJjc1ozM1FJMkY1RmcyZHdYM2hkV21rQlNLSGZLNy1uLUFjNm1NcFVtZUZubjYtNkQyZmpEMEMycXhtZXMzQ0tLMmFhZmdwN2gw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/democratic-states-sue-trump-tariffs.png",
      "alt": "Rows of stacked shipping containers and a gantry crane at a busy port terminal handling imported goods.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Nullification Crisis: South Carolina Defies the Federal Tariff",
        "excerpt": "We, therefore, the people of the State of South Carolina, in convention assembled, do declare and ordain ... that the several acts and parts of acts of the Congress of the United States, purporting to be laws for the imposing of duties and imposts on the importation of foreign commodities ... are unauthorized by the constitution of the United States, and violate the true meaning and intent thereof and are null, void, and no law, nor binding upon this State, its officers or citizens.",
        "source": "South Carolina Ordinance of Nullification, adopted in convention, November 24, 1832; The Avalon Project, Lillian Goldman Law Library, Yale Law School",
        "href": "https://avalon.law.yale.edu/19th_century/ordnull.asp"
      },
      {
        "category": "historical",
        "title": "No Taxes but by Consent: The Stamp Act Congress",
        "excerpt": "That it is inseparably essential to the freedom of a people, and the undoubted right of Englishmen, that no taxes be imposed on them, but with their own consent, given personally, or by their representatives. That the people of these colonies are not, and from their local circumstances cannot be, represented in the House of Commons in Great-Britain, and that no taxes ever have been, or can be constitutionally imposed on them, but by their respective legislatures.",
        "source": "Declaration of Rights of the Stamp Act Congress, New York, October 19, 1765; The Avalon Project, Lillian Goldman Law Library, Yale Law School",
        "href": "https://avalon.law.yale.edu/18th_century/resolu65.asp"
      },
      {
        "category": "literary",
        "title": "The Candlemakers' Petition: A Satire of Protectionism",
        "excerpt": "We are suffering from the intolerable competition of a foreign rival, placed, it would seem, in a condition so far superior to ours for the production of light, that he absolutely inundates our national market with it at a price fabulously reduced. The moment he shows himself, our trade leaves us--all consumers apply to him ... This rival, who is no other than the Sun, wages war to the knife against us.",
        "source": "Frédéric Bastiat, \"Petition of the Manufacturers of Candles, Waxlights, Lamps...\" in Economic Sophisms (1845; trans. Patrick James Stirling, 1873); Project Gutenberg ebook #44145",
        "href": "https://www.gutenberg.org/ebooks/44145"
      },
      {
        "category": "literary",
        "title": "Civil Disobedience: Refusing an Unjust Tax",
        "excerpt": "I heartily accept the motto,--\"That government is best which governs least;\" and I should like to see it acted up to more rapidly and systematically. ... I have paid no poll-tax for six years. I was put into a jail once on this account, for one night.",
        "source": "Henry David Thoreau, \"On the Duty of Civil Disobedience\" (originally \"Resistance to Civil Government,\" 1849); Project Gutenberg ebook #71",
        "href": "https://www.gutenberg.org/files/71/71-h/71-h.htm"
      },
      {
        "category": "artistic",
        "title": "King Andrew the First: A President Tramples the Constitution",
        "excerpt": "This anonymous Whig broadside answers a President accused of governing by veto and decree. Jackson stands robed and crowned, scepter in one hand and a veto in the other, his royal feet planted on a torn Constitution and the shredded charter of the federal judiciary. The caption brands him a tyrant, 'King Andrew the First' -- the era's sharpest image of an executive who scorns the limits meant to bind him.",
        "source": "\"King Andrew the First,\" anonymous lithograph, c. 1832-33 (Library of Congress Prints and Photographs Division)",
        "href": "https://commons.wikimedia.org/wiki/File:King_Andrew_the_First_(political_cartoon_of_President_Andrew_Jackson).jpg",
        "image": {
          "src": "/covers/democratic-states-sue-trump-tariffs--a4.png",
          "alt": "Lithograph of Andrew Jackson as a crowned king in royal robes, holding a veto and scepter, standing on a torn copy of the U.S. Constitution",
          "credit": "\"King Andrew the First,\" c. 1833, Library of Congress Prints and Photographs Division, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The Destruction of Tea at Boston Harbour: A Revolt Against Import Taxes",
        "excerpt": "Currier's popular lithograph turns a tax revolt into a founding tableau: Bostonians crowd the wharves by torchlight as men aboard the ships heave chests of dutied East India Company tea into the harbor. It memorializes colonists' refusal to pay a duty on imports levied without their consent -- resistance to an import tax rendered as an act of civic virtue.",
        "source": "Nathaniel Currier, \"The Destruction of Tea at Boston Harbour,\" hand-colored lithograph, 1846 (Springfield Museums)",
        "href": "https://commons.wikimedia.org/wiki/File:Boston_Tea_Party_Currier_colored.jpg",
        "image": {
          "src": "/covers/democratic-states-sue-trump-tariffs--a5.png",
          "alt": "Hand-colored lithograph of colonists dumping chests of tea from ships into Boston Harbor as a crowd watches from the wharf",
          "credit": "Nathaniel Currier, \"The Destruction of Tea at Boston Harbour,\" 1846, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "sudan-darfur-court-drone-strike",
    "headline": "A Sudanese army drone strike hits a civil court session in Darfur, killing at least 35, a rights group says",
    "overview": "A drone strike blamed on Sudan's army hit a civil court session in a paramilitary-held Darfur village, killing at least 35 people, a rights group said. The army did not comment on claims that civilians were among the dead. The attack came amid the country's grinding war between the army and the Rapid Support Forces.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxOd3NjSDZlSG1reGlHT3VFSVdkQjR6NEJneXIzdC1VWU5vV3h2dDFPZHFZQ0hzalVITUkybVBBRC1sUEsxcHRXWlp6OVZrdXcwS3R6S09TRlJNdjRXTWt2VUFQX2N0R3M1T1N3LTVSaW5yOUFkUnpRMnoxVFFLMV9PbnlMdzJoMEtSdkJRRGVTV05oRUQyQjJaWWNpd0pVT0diWHc?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce85097leydo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/sudan-darfur-court-drone-strike.png",
      "alt": "An empty courtroom with rows of plain wooden benches and tall windows, dust hanging in shafts of pale light.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The massacre at Mycalessus (413 BC)",
        "excerpt": "The Thracians bursting into Mycalessus sacked the houses and temples, and butchered the inhabitants, sparing neither youth nor age, but killing all they fell in with, one after the other, children and women, and even beasts of burden... and in particular they attacked a boys' school, the largest that there was in the place, into which the children had just gone, and massacred them all. In short, the disaster falling upon the whole town was unsurpassed in magnitude, and unapproached by any in suddenness and in horror.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII.29 (trans. Richard Crawley, 1874); Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "historical",
        "title": "The bombing of Guernica (1937)",
        "excerpt": "Guernica, the most ancient town of the Basques and the centre of their cultural tradition, was completely destroyed yesterday afternoon by insurgent air raiders... The object of the bombardment was seemingly the demoralization of the civil population and the destruction of the cradle of the Basque race.",
        "source": "George L. Steer, eyewitness dispatch on the destruction of Guernica, The Times (London), 28 April 1937",
        "href": "https://historynet.com/the-tragedy-of-guernica/"
      },
      {
        "category": "literary",
        "title": "The slaying of Priam at the altar",
        "excerpt": "Then Pyrrhus thus: 'Go thou from me to fate, / And to my father my foul deeds relate. / Now die!' With that he dragg'd the trembling sire, / Slidd'ring thro' clotter'd blood and holy mire, / (The mingled paste his murder'd son had made,) / Haul'd from beneath the violated shade, / And on the sacred pile the royal victim laid... Thus Priam fell, and shar'd one common fate / With Troy in ashes, and his ruin'd state",
        "source": "Virgil, Aeneid, Book II (trans. John Dryden, 1697); Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "The murdered child of Troy",
        "excerpt": "Behold, you hapless wives of Troy, the corpse of Astyanax, whom the Danaids have cruelly slain by hurling him from the battlements.",
        "source": "Euripides, The Trojan Women (trans. E. P. Coleridge, 1891); Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0124%3Acard%3D1118"
      },
      {
        "category": "artistic",
        "title": "The Third of May 1808",
        "excerpt": "Goya freezes the instant before the volley: a rank of faceless soldiers levels muskets at a knot of unarmed townspeople herded to a hillside in the dark. A man in a white shirt flings his arms wide in a cruciform gesture of terror and defiance, lit by a single lantern, while the already-shot lie in their blood at his feet and others cover their eyes. There is no glory in it, only the mechanical execution of the defenseless.",
        "source": "Francisco de Goya, The Third of May 1808 (El tres de mayo de 1808 en Madrid), 1814, oil on canvas; Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/sudan-darfur-court-drone-strike--a4.png",
          "alt": "Goya's painting of French soldiers executing unarmed Madrid civilians at night by lantern light",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Pillaging and Burning of a Village",
        "excerpt": "In Callot's densely etched panorama, soldiers pour through a village, putting houses and church to the torch as columns of smoke boil into the sky. In the foreground troops run through unarmed peasants, drag women by the hair, and loot a burning home; the ordinary countryside has become a killing ground. Made amid the Thirty Years' War, the plate is a cold indictment of the routine savagery visited on noncombatants.",
        "source": "Jacques Callot, 'Pillage et incendie d'un village' (Pillaging and Burning of a Village), plate 7 of Les Misères et les Malheurs de la Guerre, 1633, etching; impression at The Metropolitan Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Les_mis%C3%A8res_et_les_malheurs_de_la_guerre_-_07_-_Pillage_et_incendie_d%27un_village.png",
        "image": {
          "src": "/covers/sudan-darfur-court-drone-strike--a5.png",
          "alt": "Callot etching of soldiers massacring villagers and burning a village during the Thirty Years' War",
          "credit": "Jacques Callot, plate 7 of Les Misères et les Malheurs de la Guerre (1633); public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "russia-black-sea-beach-drone-strike",
    "headline": "Russia says a Ukrainian drone struck a crowded Black Sea beach resort, killing seven, including three children",
    "overview": "Russian officials said a Ukrainian drone crashed onto a crowded beach near the Black Sea resort area of Gelendzhik, killing seven people, three of them children, and wounding about 40. Local authorities said an air-raid warning failed to sound in time. Ukraine did not immediately comment as long-range drone attacks intensified on both sides of the war.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cr7kmnyrdn7o"
      },
      {
        "name": "Meduza",
        "href": "https://meduza.io/en/news/2026/08/03/ukrainian-drone-crashes-on-beach-with-vacationers-at-russian-black-sea-resort-as-warning-system-fails-to-sound-seven-people-killed"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/russia-black-sea-beach-drone-strike.png",
      "alt": "A wide sandy beach along a calm sea under a summer sky, striped umbrellas and empty loungers scattered on the shore.",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Massacre at Mycalessus (413 BC)",
        "excerpt": "The Thracians bursting into Mycalessus sacked the houses and temples, and butchered the inhabitants, sparing neither youth nor age, but killing all they fell in with, one after the other, children and women, and even beasts of burden, and whatever other living creatures they saw... In particular they attacked a boys' school, the largest that there was in the place, into which the children had just gone, and massacred them all.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII (trans. Richard Crawley, 1874), Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_7"
      },
      {
        "category": "historical",
        "title": "The Bombardment of Scarborough (16 December 1914)",
        "excerpt": "On a December morning the German battlecruisers Derfflinger and Von der Tann appeared out of the mist off the Yorkshire coast and rained some 500 shells on the undefended seaside resort of Scarborough, striking the Grand Hotel, homes and churches. For the first time in the war, death fell suddenly on British civilians going about their ordinary lives, killing seventeen townspeople, among them children and a fourteen-month-old baby. The shock that a place of holidays and promenades could become a killing ground turned 'Remember Scarborough!' into a national cry of outrage.",
        "source": "Historic England, 'Scarborough Bombardment 1914' (First World War Home Front research)",
        "href": "https://historicengland.org.uk/research/current/discover-and-understand/military/first-world-war-home-front/sea/scarborough-bombardment-1914/",
        "image": {
          "src": "/covers/russia-black-sea-beach-drone-strike--a1.png",
          "alt": "1915 British recruitment poster showing the shell-wrecked home of a Scarborough family, captioned to remember the women and children killed in the raid",
          "credit": "Parliamentary Recruiting Committee, 'Men of Britain! Will You Stand This?' (1915), Library of Congress Prints and Photographs Division, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Dover Beach",
        "excerpt": "Ah, love, let us be true\nTo one another! for the world, which seems\nTo lie before us like a land of dreams,\nSo various, so beautiful, so new,\nHath really neither joy, nor love, nor light,\nNor certitude, nor peace, nor help for pain;\nAnd we are here as on a darkling plain\nSwept with confused alarms of struggle and flight,\nWhere ignorant armies clash by night.",
        "source": "Matthew Arnold, 'Dover Beach' (1867), Wikisource",
        "href": "https://en.wikisource.org/wiki/Dover_Beach"
      },
      {
        "category": "literary",
        "title": "L'Enfant (The Child of Chios)",
        "excerpt": "Les Turcs ont passé là. Tout est ruine et deuil.\nChio, l'île des vins, n'est plus qu'un sombre écueil,",
        "source": "Victor Hugo, Les Orientales, 'L'Enfant' (1829), Wikisource",
        "href": "https://fr.wikisource.org/wiki/Les_Orientales/L%E2%80%99Enfant",
        "image": {
          "src": "/covers/russia-black-sea-beach-drone-strike--a3.png",
          "alt": "Delacroix's painting of the massacre at Chios: exhausted, wounded Greek civilians, including a child clinging to its dead mother, on a devastated shore",
          "credit": "Eugène Delacroix, 'Scène des massacres de Scio' (1824), Musée du Louvre, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Boys on the Beach (Chicos en la playa)",
        "excerpt": "Three naked boys lie sprawled at the water's edge in the shimmering Mediterranean light, their bodies half-dissolved in the wet reflections of the sand. Sorolla's canvas is the pure image of the summer shore as a place of safety, play, and idle happiness, children entrusting themselves entirely to the sea. Set beside the news, its radiant calm becomes unbearable: this is exactly the world a strike on a crowded beach annihilates.",
        "source": "Joaquín Sorolla, oil on canvas, 1910, Museo Nacional del Prado, Madrid",
        "href": "https://www.museodelprado.es/en/the-collection/art-work/boys-on-the-beach/edd7a202-c069-49f1-a3f4-eacf9b4022c2",
        "image": {
          "src": "/covers/russia-black-sea-beach-drone-strike--a4.png",
          "alt": "Three nude boys lying at the sunlit water's edge on a beach, their bodies reflected in the shallow water",
          "credit": "Joaquín Sorolla, 'Chicos en la playa' (1910), Museo Nacional del Prado, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The Massacre of the Innocents",
        "excerpt": "Bruegel transplants the biblical slaughter of the innocents into a snowbound Flemish village, where armored soldiers ride into an ordinary community and tear children from screaming, pleading parents. The horror is set amid the mundane textures of daily life, houses, a frozen pond, everyday clothes, making the intrusion of organized violence into a place of peace all the more devastating. It remains the West's defining image of war descending on children who have done nothing.",
        "source": "Pieter Bruegel the Elder, oil on panel, c. 1565–67, Royal Collection (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Massacre_of_the_Innocents_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/russia-black-sea-beach-drone-strike--a5.png",
          "alt": "A snow-covered Flemish village where soldiers on horseback seize and kill children as parents beg and grieve",
          "credit": "Pieter Bruegel the Elder, 'Massacre of the Innocents' (c. 1565–67), Royal Collection, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "michigan-cyclosporiasis-first-deaths",
    "headline": "Michigan reports the first two US deaths in a cyclosporiasis outbreak caused by a foodborne parasite",
    "overview": "Michigan health officials reported the first two US deaths tied to a nationwide cyclosporiasis outbreak, an intestinal illness caused by the microscopic parasite Cyclospora that spreads through contaminated food or water. The infection, marked by prolonged watery diarrhea, is not usually life-threatening, officials said. Investigators are working to trace the contaminated produce behind the outbreak.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxPbW9icDFxQ3hEUUY5eV9ubnhsUURuNnpiX0RKbW1BUWRkRGp5ZWVXdnEzdklrMUdtODByVC02T0NxZG9YRGlWYklzNkN3X21kRTNDZlo0Um50Q2hDY0JreUFHcXUwZHh4TFZMVjVheVB0N2lPd0c5RzZNQ05relhmNnhlaUx6NU5MNXQxS0pJY0lOc1hsOHlYbGJYVTZHRy1xRmFOLXlMU1BWUEZ4SmNiOXNmNkFyNlVmZnR1bXVqWlZ4WFdnTzBDZEpBOA?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQbTlMT3pHaGFaRzdjMHdrZ1RWOVhwY1FPSi1TSm5pNEFuaHlLVldYYXF3VHY3WTR2MHNCMW12SVd4dXRSZy13NEkyR3BVc2QwcV9SZnR4Z1hxX05jUGNOYkJnUXp1V2hYbVhZcG4zUUhJVWl2SS1ibTVtdlQ4cjdvcHZSMC1OQS00WldrVmd0RDdWMEN6MlFnT1BOaw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/michigan-cyclosporiasis-first-deaths.png",
      "alt": "A microscope view of round, stained Cyclospora parasite oocysts against a pale laboratory background.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Leeuwenhoek discovers the 'little animals' teeming in a drop of water",
        "excerpt": "incredibly small; nay, so small, in my sight, that I judged that even if 100 of these very wee animals lay stretched out one against another, they could not reach the length of a grain of course sand; and if this be true, then ten hundred thousand of these living creatures could scarce equal the bulk of a course grain of sand",
        "source": "Antony van Leeuwenhoek, 'Observation… concerning little animals by him observed in rain-well-sea and snow water; as also in water wherein pepper had lain infused,' Philosophical Transactions of the Royal Society, vol. 12, 9 Oct. 1676 letter, English'd and published 25 March 1677",
        "href": "https://royalsocietypublishing.org/doi/10.1098/rstl.1677.0003"
      },
      {
        "category": "historical",
        "title": "John Snow maps cholera deaths to a single water pump",
        "excerpt": "On proceeding to the spot, I found that nearly all the deaths had taken place within a short distance of the pump.",
        "source": "John Snow, On the Mode of Communication of Cholera (2nd ed., London: John Churchill, 1855); John Snow Archive & Research Companion, Michigan State University",
        "href": "https://johnsnow.matrix.msu.edu/broadstpump/snow-the-pump-handle/",
        "image": {
          "src": "/covers/michigan-cyclosporiasis-first-deaths--a1.png",
          "alt": "John Snow's 1854 map of the Broad Street cholera outbreak, showing black bars marking deaths clustered around the Broad Street water pump",
          "credit": "John Snow, 1854 cholera map, via Wikimedia Commons (UCLA Dept. of Epidemiology), public domain"
        }
      },
      {
        "category": "literary",
        "title": "The infection 'propagated insensibly' by the unknowing",
        "excerpt": "the infection was propagated insensibly, and by such persons as were not visibly infected, who neither knew whom they infected or who they were infected by.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt"
      },
      {
        "category": "literary",
        "title": "Dr. Stockmann finds the town's healing waters 'full of infusoria'",
        "excerpt": "It proves the presence of decomposing organic matter in the water—it is full of infusoria. The water is absolutely dangerous to use, either internally or externally.",
        "source": "Henrik Ibsen, An Enemy of the People (1882), trans. R. Farquharson Sharp, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2446/pg2446.txt"
      },
      {
        "category": "artistic",
        "title": "Monster Soup, Commonly Called Thames Water",
        "excerpt": "Heath's satirical etching magnifies a single drop of London drinking water into a swarming menagerie of writhing monsters. A genteel lady recoils, dropping her teacup in horror as she peers through a lens at the 'precious stuff' piped from the Thames. Decades before germ theory, the print made visible the invisible menace lurking in ordinary water, mocking a supply already fouled by sewage and, soon, cholera.",
        "source": "William Heath (as 'Paul Pry'), 'Monster Soup commonly called Thames Water, being a correct representation of that precious stuff doled out to us!!!', hand-coloured etching, c. 1828; Wellcome Collection",
        "href": "https://commons.wikimedia.org/wiki/File:Monster_Soup_commonly_called_Thames_Water._Wellcome_V0011218.jpg",
        "image": {
          "src": "/covers/michigan-cyclosporiasis-first-deaths--a4.png",
          "alt": "Coloured etching of a woman dropping her teacup in horror as she views grotesque creatures in a magnified drop of Thames water",
          "credit": "William Heath, 'Monster Soup commonly called Thames Water', c. 1828, Wellcome Collection, via Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Death's Dispensary",
        "excerpt": "A hooded skeleton works the handle of a public water pump, doling out drink to the ragged poor and their children who crowd around with jugs and cups. Published during London's 1866 cholera epidemic, Pinwell's engraving turns the neighborhood well into an instrument of death, indicting the contaminated water supply that Snow's work had implicated. The everyday act of fetching water becomes a queue for the grave.",
        "source": "George John Pinwell, 'Death's Dispensary — Open to the Poor, Gratis, By Permission of the Parish', wood engraving, Fun magazine, 18 August 1866",
        "href": "https://commons.wikimedia.org/wiki/File:Death%27s_Dispensary.jpg",
        "image": {
          "src": "/covers/michigan-cyclosporiasis-first-deaths--a5.png",
          "alt": "Wood engraving of a skeletal figure of Death operating a public water pump while poor Londoners gather to collect water",
          "credit": "George John Pinwell, 'Death's Dispensary', Fun magazine, 18 August 1866, via Wikimedia Commons, public domain"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "total-solar-eclipse-europe-august",
    "headline": "A total solar eclipse on 12 August will sweep across Spain, Iceland and Greenland, the first over mainland Europe since 1999",
    "overview": "Astronomers say a total solar eclipse on 12 August will darken skies across Greenland, Iceland and northern Spain, the first total eclipse visible from mainland Europe since 1999. The moon will fully cover the sun for more than two minutes along a narrow path, drawing eclipse chasers to the region. Forecasters urged viewers to use certified filters to watch safely.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxQMjEzV3E0aFlLOFBzZTY5enhOTW1rRE5YNEtOZlF5V0ktV3JISzdPeldDcU04cnVsbHpsZ3Uyc1dXaFpwZ0hPWVpkaGJ4bllJTjZ6Z2poczFGTkVKRTBNWHlFeFJLSDJuVjR4SEhSd2VlWE5qOVRZS01rbncxREp4VTR5ZUNDYnJLRlFRZ1c5UHVqQQ?oc=5"
      },
      {
        "name": "NASA",
        "href": "https://science.nasa.gov/eclipses/future-eclipses/total-solar-eclipse-on-august-12-2026/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/total-solar-eclipse-europe-august.png",
      "alt": "The sun's glowing white corona streaming around the black disc of the moon during a total solar eclipse against a dark sky.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The eclipse that stopped a war: Thales foretells the day turning to night",
        "excerpt": "in the sixth year a battle took place in which it happened, when the fight had begun, that suddenly the day became night. And this change of the day Thales the Milesian had foretold to the Ionians laying down as a limit this very year in which the change took place.",
        "source": "Herodotus, The History of Herodotus, Book I.74 (on the battle of the Medes and Lydians, 585 BC), trans. G. C. Macaulay, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt",
        "image": {
          "src": "/covers/total-solar-eclipse-europe-august--a0.png",
          "alt": "Renaissance scholars observing a darkened sun above a terrace in Antoine Caron's painting",
          "credit": "Antoine Caron, Astronomers Studying an Eclipse (c. 1571), J. Paul Getty Museum, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Eddington's 1919 eclipse: 302 seconds that weighed light",
        "excerpt": "There is a marvellous spectacle above, and, as the photographs afterwards revealed, a wonderful prominence-flame is poised a hundred thousand miles above the surface of the sun. We have no time to snatch a glance at it. We are conscious only of the weird half-light of the landscape and the hush of nature, broken by the calls of the observers, and beat of the metronome ticking out the 302 seconds of totality.",
        "source": "Arthur Eddington, Space, Time and Gravitation: An Outline of the General Relativity Theory (1920), describing the total eclipse of 29 May 1919, Wikisource",
        "href": "https://en.wikisource.org/wiki/Page:Eddington_A._Space_Time_and_Gravitation._1920.djvu/131",
        "image": {
          "src": "/covers/total-solar-eclipse-europe-august--a1.png",
          "alt": "Photographic negative of the 29 May 1919 total solar eclipse showing the corona and faint stars used to test relativity",
          "credit": "F. W. Dyson, A. S. Eddington & C. Davidson, 1919 eclipse negative (1920), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "The sun in dim eclipse, and monarchs perplexed with fear of change",
        "excerpt": "As when the sun new-risen / Looks through the horizontal misty air / Shorn of his beams, or, from behind the moon, / In dim eclipse, disastrous twilight sheds / On half the nations, and with fear of change / Perplexes monarchs.",
        "source": "John Milton, Paradise Lost, Book I, ll. 594–599 (1667), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm"
      },
      {
        "category": "literary",
        "title": "Now nothing is unexpected: Zeus makes night at midday",
        "excerpt": "Nothing is unexpected, nothing is foresworn and / Nothing amazes now that father Zeus the Olympian / veiled the light to make it night at midday / even as sun was shining...",
        "source": "Archilochus, fragment 122 (on a solar eclipse, traditionally 648 BC), Greek text with English translation, Sententiae Antiquae",
        "href": "https://sententiaeantiquae.com/2015/09/26/now-nothing-is-unexpected-archilochus-on-an-eclipse-fr-122/"
      },
      {
        "category": "artistic",
        "title": "Astronomers Studying an Eclipse: antiquity's wonder seen through Renaissance eyes",
        "excerpt": "Richly robed scholars crowd a marble terrace strewn with armillary spheres, astrolabes and geometric instruments, arms flung upward toward a wan, cloud-veiled sun. Caron paints the ancient philosophers as courtiers of his own Valois France, turning the terror of a darkened sky into a theatre of learned curiosity — human reason craning to read the heavens even as the light fails.",
        "source": "Antoine Caron (French, 1521–1599), Astronomers Studying an Eclipse, oil on panel, c. 1571, J. Paul Getty Museum (acc. 85.PB.117)",
        "href": "https://commons.wikimedia.org/wiki/File:Antoine_Caron_Astronomers_Studying_an_Eclipse.jpg",
        "image": {
          "src": "/covers/total-solar-eclipse-europe-august--a4.png",
          "alt": "Elaborately dressed astronomers on a classical terrace gesturing toward a dimmed sun amid clouds, surrounded by scientific instruments",
          "credit": "Antoine Caron, Astronomers Studying an Eclipse (c. 1571), J. Paul Getty Museum, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "'Total eclipse! No sun, no moon!' — Samson's lament for the vanished light",
        "excerpt": "Total eclipse! No sun, no moon! All dark amidst the blaze of noon! Oh, glorious light! No cheering ray To glad my eyes with welcome day! Why thus depriv'd Thy prime decree? Sun, moon, and stars are dark to me!",
        "source": "George Frideric Handel, Samson (HWV 57, 1743), tenor aria 'Total eclipse,' libretto by Newburgh Hamilton after Milton's Samson Agonistes; text sheet, IPA Source",
        "href": "https://www.ipasource.com/wp-content/uploads/ipa-source/samples/poems/15179.pdf"
      }
    ],
    "rank": 7
  },
  {
    "slug": "supreme-court-plo-judgment",
    "headline": "The US Supreme Court declines to halt a $655 million judgment against the PLO and Palestinian Authority over past attacks",
    "overview": "The US Supreme Court refused to block a roughly $655 million judgment against the Palestine Liberation Organization and the Palestinian Authority won by American victims of attacks abroad. The decision lets the award stand under a 2019 federal law tying the groups to US jurisdiction. Lawyers for the Palestinian bodies had argued the law violated due process.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxPRnJXbFlTcnd5ekloOUVSVFItaUU1d1lSR2wxOXp0V2VHdUd5aHl0Z1QzVTE4cjZ0M2JlOU81d05NaHkzeTlTdEZNRkVMaFoxcVRmMDg4aEgwMTZVTUlxTjZDcTVRLU5aM0hYZmdtbk8zbWlaY3d5ZUFsa3NfaE9EelNhWDJuYWVUSnFZSG1FMXhpblRXRWFTWjdZdkVEUTZHakt5dmlaTkZpYU9qYVo0a1c1eTRfaXZyMzAtSjZ1Z3ZsVVRE?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxOQTNFck1qRmVpNFJZUDBCcll3ZUZicVBTbWZ0Skt1RFJXdGJQWUVOUXhnZEhUYWhQTzRLTlhJaHpzcFIwQ01QbmRSZ05YMHh6eldLQlBjeUtfeEwxd2xaUzJyb1M4ZmJiV25rcUQ4c3ozNkNjcmVweEM0QnM4MGxhWGZ6bFQwckdVemhDUV9qT1ZvOUs0eFpfUl8taHY?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/supreme-court-plo-judgment.png",
      "alt": "The marble west facade of the United States Supreme Court building with its tall Corinthian columns, photographed at dusk.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Code of Hammurabi: a community made to pay silver for the slain",
        "excerpt": "If the robber is not caught, then shall he who was robbed claim under oath the amount of his loss; then shall the community, and . . . on whose ground and territory and in whose domain it was compensate him for the goods stolen. If persons are stolen, then shall the community and . . . pay one mina of silver to their relatives.",
        "source": "Code of Hammurabi, laws 23–24, Babylon, c. 1754 BC (trans. L.W. King); The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/ancient/hamcode.asp",
        "image": {
          "src": "/covers/supreme-court-plo-judgment--a0.png",
          "alt": "The diorite stele of the Code of Hammurabi, inscribed with cuneiform law, Musée du Louvre",
          "credit": "Code of Hammurabi stele, Louvre Museum, Paris. Photo Mbzt, Wikimedia Commons (CC BY 3.0)"
        }
      },
      {
        "category": "historical",
        "title": "The Alabama Claims: a cross-border tribunal to answer for wartime damage",
        "excerpt": "Now, in order to remove and adjust all complaints and claims on the part of the United States, and to provide for the speedy settlement of such claims, which are not admitted by Her Britannic Majesty's Government, the High Contracting Parties agree that all the said claims, growing out of Acts committed by the aforesaid vessels, and generically known as the Alabama Claims, shall be referred to a tribunal of arbitration to be composed of five arbitrators.",
        "source": "Treaty of Washington, Article I, signed 8 May 1871 (United States and Great Britain); Wikisource",
        "href": "https://en.wikisource.org/wiki/Treaty_of_Washington"
      },
      {
        "category": "literary",
        "title": "Portia turns the bond against its holder",
        "excerpt": "Tarry a little, there is something else.\nThis bond doth give thee here no jot of blood.\nThe words expressly are \"a pound of flesh\":\nTake then thy bond, take thou thy pound of flesh,\nBut in the cutting it, if thou dost shed\nOne drop of Christian blood, thy lands and goods\nAre, by the laws of Venice, confiscate\nUnto the state of Venice.",
        "source": "William Shakespeare, The Merchant of Venice, Act IV, Scene 1 (c. 1596–98); Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt"
      },
      {
        "category": "literary",
        "title": "Athena founds a standing court to judge bloodshed",
        "excerpt": "But since this matter has fallen here, I will select judges of homicide bound by oath, and I will establish this tribunal for all time. Summon your witnesses and proofs, sworn evidence to support your case; and I will return when I have chosen the best of my citizens, for them to decide this matter truly.",
        "source": "Aeschylus, Eumenides, lines c. 482–484 (458 BC; trans. Herbert Weir Smyth, 1926), Theoi Classical Texts Library",
        "href": "https://www.theoi.com/Text/AeschylusEumenides.html"
      },
      {
        "category": "artistic",
        "title": "Justitia: the blindfold, the scales, and the sword",
        "excerpt": "Cranach's Justice stands almost nude but for a wisp of gauze, balancing the scales of judgment in one hand and resting a great two-edged sword against her shoulder in the other. The near-nakedness insists that Justice hides nothing and cannot be bribed by finery; the sword promises that her verdicts carry force. It is the Renaissance emblem for exactly what a court claims when it makes a defendant pay: measured judgment backed by the power to compel.",
        "source": "Lucas Cranach the Elder, Justitia (Justice), oil on panel, 1537; private collection (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Gerechtigkeit-1537.jpg",
        "image": {
          "src": "/covers/supreme-court-plo-judgment--a4.png",
          "alt": "Allegorical figure of Justice holding scales and a sword, painted by Lucas Cranach the Elder in 1537",
          "credit": "Lucas Cranach the Elder, Justitia (1537). Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The murdered man returns to exact his reckoning",
        "excerpt": "The Commendatore, slain in a duel in the opera's first act, comes back as a stone statue to demand a final accounting: \"Don Giovanni, a cenar teco m'invitasti, e son venuto\" (Don Giovanni, you invited me to sup with you, and I have come). He orders repentance—\"Pentiti, cangia vita! È l'ultimo momento!\"—and when the unrepentant Don answers \"No!\", the dead man drags him down. It is the murdered victim, not an earthly court, seizing the debt owed for violence.",
        "source": "W.A. Mozart (music) & Lorenzo Da Ponte (libretto), Don Giovanni, K.527, Act II finale (1787); IMSLP",
        "href": "https://imslp.org/wiki/Don_Giovanni,_K.527_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 8
  },
  {
    "slug": "spain-ceuta-migrant-children-eu-borders",
    "headline": "Hundreds of migrant children remain stranded in Spain's Ceuta as the EU calls for stronger external borders",
    "overview": "Hundreds of unaccompanied migrant children were left stranded in Spain's North African enclave of Ceuta after a mass border crossing overwhelmed local shelters. European Commission President Ursula von der Leyen called for stronger external borders ahead of an urgent meeting of EU interior ministers. Spain and Morocco traded blame over the surge.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxQNDliSkR6N1FYa01rQ2d3V0VRV0N2UVd2ZWhmMjhlaE8wVW1BTE45dkp0YUFuSVBYZEplRGlnMkczdDhTbjY0Unk2MVl0R3VBMG96SEZhd1dQSUFGbHRFTTRDTGl5TXhGeGprYldpdUhGTTVlS0VROG4xajAtS0tfbW9pSVlIc0dneDE2SXREbER2cXM?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cyvl84zmgyro"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/spain-ceuta-migrant-children-eu-borders.png",
      "alt": "A tall border fence topped with razor wire running down toward a rocky Mediterranean shoreline.",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Alhambra Decree: Spain expels its Jews across the sea (1492)",
        "excerpt": "we order all Jews and Jewesses of whatever age they may be … that by the end of the month of July next of the present year, they depart from all of these our said realms and lordships, along with their sons and daughters, menservants and maidservants, Jewish familiars, those who are great as well as the lesser folk, of whatever age they may be, and they shall not dare to return to those places.",
        "source": "Ferdinand and Isabella, Alhambra Decree (Edict of the Expulsion of the Jews of Spain), Granada, 31 March 1492; English translation hosted by Florida Atlantic University",
        "href": "https://www.fau.edu/artsandletters/pjhr/chhre/pdf/hh-alhambra-1492-english.pdf"
      },
      {
        "category": "historical",
        "title": "The Kindertransport: unaccompanied children sent to safety (1938–1940)",
        "excerpt": "In the nine months between Kristallnacht and the outbreak of war, Britain admitted roughly 10,000 mostly Jewish children from Germany, Austria and Czechoslovakia—unaccompanied minors placed by desperate parents into the hands of strangers. They travelled by train and boat with identification tags around their necks; the first transport reached Harwich on 2 December 1938, and many of the children never saw their families again. Like the youngsters stranded in Ceuta, they arrived as children first and refugees second, dependent wholly on how the receiving country chose to answer the border.",
        "source": "United States Holocaust Memorial Museum, Holocaust Encyclopedia, 'Kindertransport, 1938–40'",
        "href": "https://encyclopedia.ushmm.org/content/en/article/kindertransport-1938-40"
      },
      {
        "category": "literary",
        "title": "'The New Colossus': the gate that welcomes the wretched",
        "excerpt": "\"Keep, ancient lands, your storied pomp!\" cries she\nWith silent lips. \"Give me your tired, your poor,\nYour huddled masses yearning to breathe free,\nThe wretched refuse of your teeming shore.\nSend these, the homeless, tempest-tost to me,\nI lift my lamp beside the golden door!\"",
        "source": "Emma Lazarus, 'The New Colossus' (sonnet, 1883), as reproduced by the U.S. National Park Service (Statue of Liberty National Monument)",
        "href": "https://www.nps.gov/stli/learn/historyculture/colossus.htm"
      },
      {
        "category": "literary",
        "title": "The Aeneid: the exile driven from his shore by sea and land",
        "excerpt": "Arms, and the man I sing, who, forc'd by fate,\nAnd haughty Juno's unrelenting hate,\nExpell'd and exil'd, left the Trojan shore.\nLong labours, both by sea and land, he bore",
        "source": "Virgil, Aeneid, Book I (trans. John Dryden), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "artistic",
        "title": "'The Last of England': a family departs its homeland by sea",
        "excerpt": "Brown paints emigration as intimate dread rather than adventure: a young couple, modelled on the artist and his wife, huddle on the deck of a departing ship, the white cliffs of England receding behind them under a grey sky. Her hand clasps a tiny fist barely visible beneath her cloak—their infant, carried into exile. The tight oval frame and their fixed, forward stares make the viewer feel the irreversibility of leaving one shore for an uncertain welcome on another.",
        "source": "Ford Madox Brown, 'The Last of England', oil on panel, 1855, Birmingham Museum and Art Gallery",
        "href": "https://en.wikipedia.org/wiki/The_Last_of_England_(painting)",
        "image": {
          "src": "/covers/spain-ceuta-migrant-children-eu-borders--a4.png",
          "alt": "An emigrant couple on a ship's deck under a grey sky, the woman sheltering an infant beneath her cloak as the English coast recedes",
          "credit": "Ford Madox Brown, 'The Last of England' (1855), Birmingham Museum and Art Gallery. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "'The Raft of the Medusa': the stranded straining toward rescue",
        "excerpt": "Géricault built his vast canvas from a real catastrophe: the 1816 wreck of the frigate Méduse, whose castaways were left to drift on a makeshift raft where only fifteen of some 150 survived twelve days at sea. He paints the instant of desperate hope—survivors, living and dead, piled in a pyramid of bodies as one waves a scrap of cloth at a ship barely visible on the horizon. Two centuries on, the image reads as a prophecy of the overloaded boats and stranded lives of the Mediterranean crossing.",
        "source": "Théodore Géricault, 'Le Radeau de la Méduse' (The Raft of the Medusa), oil on canvas, 1818–1819, Musée du Louvre, Paris (INV 4884)",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010059199",
        "image": {
          "src": "/covers/spain-ceuta-migrant-children-eu-borders--a5.png",
          "alt": "Shipwreck survivors crowded on a makeshift raft at sea, the living heaped over the dead as one figure waves cloth toward a distant ship",
          "credit": "Théodore Géricault, 'The Raft of the Medusa' (1818–19), Musée du Louvre. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "faa-certifies-boeing-737-max-7",
    "headline": "The FAA certifies Boeing's 737 MAX 7 jetliner for passenger flight after years of delays",
    "overview": "The US Federal Aviation Administration certified Boeing's smallest 737 MAX model, the MAX 7, clearing the long-delayed jet for commercial service. The approval, years behind schedule after crashes and quality crises, is a rare win for the planemaker. Southwest Airlines is the largest customer awaiting the aircraft.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPV0lkMThrX3BhRzNPenJyd3ZQYXowMUdxdVhyNTUxTEJFZWhLa2VIN3FUN1E4bFFKcW84QTRKbzhFdUhSaDBhSGxSQkE4SjZwTnc4Y2YzR011Mkd1V05qWDNIX0FPX0NnWW9Td1czaExYQlBJMnJBRVRwVHlHcGFTOUxDM3Bpa3RodDA4T0Q5UnpycUxnRjNkVjV4WU53RW1OclBxTWZB?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxObm5abmxuWVVCMWR2ZDdDaTFWSnJ5SEYxZnc5MFg0Qko5RkJWMGZpTndzclotOVAza0ZYRHJoTmpUZk1yclB4MnZxUFlYanVwbnlGd3JaNk5sZ2YxbjliM3EyVk55bUtEZU9mQWNRR214WTlQRVdTRXAwbVdGRzdYdE1CY0hrOXlIWjRlV0V0VGg2d05qLUJzT05iQ0oyaS13UFM4azRFMXF2T2ZOUEhPT2hJblN1bUozNlc1SkNn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/faa-certifies-boeing-737-max-7.png",
      "alt": "A new twin-engine Boeing 737 MAX airliner in flight against a clear sky.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Orville Wright's diary of the first powered flight",
        "excerpt": "After running the engine and propellers a few minutes to get them in working order, I got on the machine at 10:35 for the first trial. ... The machine lifted from the truck just as it was entering on the fourth rail. ... A sudden dart when out about 100 feet from the end of the tracks ended the flight. Time about 12 seconds (not known exactly as watch was not promptly stopped).",
        "source": "Orville Wright, personal diary entry for December 17, 1903 (Wright Brothers Collection); transcription on Wikisource",
        "href": "https://en.wikisource.org/wiki/Orville_Wright_diary/1903",
        "image": {
          "src": "/covers/faa-certifies-boeing-737-max-7--a0.png",
          "alt": "The Wright Flyer lifting off at Kill Devil Hills on December 17, 1903, Orville at the controls and Wilbur running alongside",
          "credit": "Photograph by John T. Daniels, December 17, 1903, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The de Havilland Comet inquiry: fatigue, grounding, and redesign",
        "excerpt": "the cause of the accident to the Comet wrecked off Elba was the structural failure of the pressure cabin brought about by fatigue",
        "source": "Statement by Mr. Boyd-Carpenter on the Report of the Court of Inquiry into the Comet accidents, House of Commons, 16 February 1955 (Hansard)",
        "href": "https://api.parliament.uk/historic-hansard/commons/1955/feb/16/comet-aircraft-accidents-report-of"
      },
      {
        "category": "literary",
        "title": "Daedalus and Icarus",
        "excerpt": "My son, I caution you to keep / the middle way, for if your pinions dip / too low the waters may impede your flight; / and if they soar too high the sun may scorch them. ... but as he neared the scorching sun, its heat / softened the fragrant wax that held his plumes; / and heat increasing melted the soft wax— / he waved his naked arms instead of wings, / with no more feathers to sustain his flight.",
        "source": "Ovid, Metamorphoses, Book 8, trans. Brookes More (1922), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book%3D8:card%3D183",
        "image": {
          "src": "/covers/faa-certifies-boeing-737-max-7--a2.png",
          "alt": "A serene coastal landscape with a ploughman, shepherd and ships; Icarus's legs disappear into the sea at lower right",
          "credit": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1560s, Royal Museums of Fine Arts of Belgium, Brussels — via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Leonardo's prophecy of the great bird",
        "excerpt": "Piglierà il primo volo il grande uccello sopra del dosso del suo magno Cecero e empiendo l'universo di stupore, empiendo di sua fama tutte le scritture e groria eterna al nido dove nacque.",
        "source": "Leonardo da Vinci, Codice sul volo degli uccelli (Codex on the Flight of Birds), c. 1505, Biblioteca Reale, Turin; text as recorded in the entry 'Grande Nibbio' on Italian Wikisource/Wikipedia",
        "href": "https://it.wikipedia.org/wiki/Grande_Nibbio",
        "image": {
          "src": "/covers/faa-certifies-boeing-737-max-7--a3.png",
          "alt": "A folio from Leonardo da Vinci's Codex on the Flight of Birds, with mirror-script notes and sketches analysing birds in flight",
          "credit": "Leonardo da Vinci, Codex on the Flight of Birds, c. 1505, Biblioteca Reale, Turin — via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Landscape with the Fall of Icarus",
        "excerpt": "Bruegel hides catastrophe in plain sight: the ploughman leans into his furrow, the shepherd gazes at the sky, and the merchant ship sails on, while at the lower right only two thrashing legs mark where Icarus has plunged into the sea. The painting is a study in how the world keeps working while one over-reaching flight ends in disaster — a fall that scarcely interrupts the ordinary business of the day.",
        "source": "Pieter Bruegel the Elder (attr.), oil on canvas, c. 1560s, Royal Museums of Fine Arts of Belgium, Brussels",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/faa-certifies-boeing-737-max-7--a4.png",
          "alt": "A serene coastal landscape with a ploughman, shepherd and ships; Icarus's legs disappear into the sea at lower right",
          "credit": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1560s, Royal Museums of Fine Arts of Belgium, Brussels — via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Lament for Icarus",
        "excerpt": "Draper paints the aftermath of the dream rather than the flight: the golden-winged body of Icarus lies limp against a dark rock as three sea-nymphs mourn over him, his great feathered wings still splendid though the wax has failed. The picture turns a cautionary myth into an elegy, dwelling on the beauty and the cost of reaching too high.",
        "source": "Herbert James Draper, oil on canvas, exhibited 1898, Tate Britain, London",
        "href": "https://www.tate.org.uk/art/artworks/draper-the-lament-for-icarus-n01679",
        "image": {
          "src": "/covers/faa-certifies-boeing-737-max-7--a5.png",
          "alt": "The dead Icarus with large golden wings draped over a dark rock, mourned by three sea-nymphs against a dusky sky",
          "credit": "Herbert James Draper, The Lament for Icarus, exhibited 1898, Tate Britain, London — via Wikimedia Commons (Google Art Project)"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "ai-firms-trump-safety-testing",
    "headline": "Meta, Anthropic, Google and OpenAI are set to meet Trump administration officials on AI safety testing",
    "overview": "Leading AI developers including Meta, Anthropic, Google and OpenAI were invited to meet Trump administration officials to discuss how the most advanced AI models are tested for safety. The talks follow a June executive order outlining voluntary government tests of models' cybersecurity and hacking capabilities. The White House has not said how results would be reported or made public.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxObWVNalU0cV9OY2Q0RHFkdFJtakZJRTdzV1BiUDVvamY3RlVRX3ZydGl5YnAzU2dxQldBTVVMMW1wMWl0ekI1eXZJdm84bjBtUFBZc2JBeVJfblJEMVhDZGs4UWpaZXZTTUQtYy1QVFVsYmxsUG1jVHZTd2VFWEJXV2FlNXg4ZVZmRUI5SWpxMWo2cGFTT0hWRUJmNUpyaXZFRnRISnhvNy1YUQ?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-08-03/openai-anthropic-google-to-join-white-house-ai-safety-meeting"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/ai-firms-trump-safety-testing.png",
      "alt": "The White House in Washington, its columned north portico seen across the lawn.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Russell–Einstein Manifesto",
        "excerpt": "We have to learn to think in a new way... In view of the fact that in any future world war nuclear weapons will certainly be employed, and that such weapons threaten the continued existence of mankind, we urge the governments of the world to realize, and to acknowledge publicly, that their purpose cannot be furthered by a world war, and we urge them, consequently, to find peaceful means for the settlement of all matters of dispute between them.",
        "source": "Bertrand Russell, Albert Einstein and nine fellow scientists, statement issued in London, 9 July 1955 (Atomic Heritage Foundation / Nuclear Museum archive)",
        "href": "https://ahf.nuclearmuseum.org/ahf/key-documents/russell-einstein-manifesto/"
      },
      {
        "category": "historical",
        "title": "Summary Statement of the Asilomar Conference on Recombinant DNA Molecules",
        "excerpt": "It is this ignorance that has compelled us to conclude that it would be wise to exercise the utmost caution... it was agreed that standards of protection should be greater at the beginning and modified as assessments of the risks change.",
        "source": "Paul Berg, David Baltimore, Sydney Brenner, Richard O. Roblin III and Maxine F. Singer, Proceedings of the National Academy of Sciences 72(6):1981–1984, 1975",
        "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC432675/"
      },
      {
        "category": "literary",
        "title": "Frankenstein; or, The Modern Prometheus",
        "excerpt": "Remember that I have power; you believe yourself miserable, but I can make you so wretched that the light of day will be hateful to you. You are my creator, but I am your master; obey!",
        "source": "Mary Wollstonecraft Shelley, first published 1818 (Project Gutenberg full text)",
        "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt",
        "image": {
          "src": "/covers/ai-firms-trump-safety-testing--a2.png",
          "alt": "Theodor von Holst's engraved frontispiece to the 1831 edition of Frankenstein, showing the newly animated creature recoiling as Victor flees his laboratory",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "The Sorcerer's Apprentice (\"The Pupil in Magic\")",
        "excerpt": "Ah, he's coming! see, / Great is my dismay! / Spirits raised by me / Vainly would I lay!",
        "source": "Johann Wolfgang von Goethe, \"Der Zauberlehrling\" (1797); anonymous English translation in The Works of J. W. von Goethe, Vol. 9 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic",
        "image": {
          "src": "/covers/ai-firms-trump-safety-testing--a3.png",
          "alt": "An 1882 illustration of the sorcerer's apprentice overwhelmed by the flood as the enchanted broom carries endless buckets of water",
          "credit": "Illustration by F. Barth, c. 1882; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Prometheus Bound",
        "excerpt": "Rubens paints the Titan who stole fire for humankind splayed helpless on his rock, an eagle tearing at his liver as punishment from the gods for handing mortals a power that was not theirs to give. Muscles strain, the torch of stolen knowledge already spent, the giver of a transformative technology now bound to endure the consequences of the gift. It is the promethean bargain made flesh: the very act of empowering the world with fire is inseparable from the terror and the reckoning it unleashes.",
        "source": "Peter Paul Rubens (with the eagle by Frans Snyders), oil on canvas, c. 1611–1618, Philadelphia Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Rubens_-_Prometheus_Bound.jpg",
        "image": {
          "src": "/covers/ai-firms-trump-safety-testing--a4.png",
          "alt": "Rubens's Prometheus Bound: a muscular nude Titan lies on his back on a rocky ledge while a great eagle grips him and tears at his side",
          "credit": "Peter Paul Rubens and Frans Snyders, Prometheus Bound, c. 1611–1618, Philadelphia Museum of Art; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Prometheus: The Poem of Fire, Op. 60",
        "excerpt": "Scriabin's tone poem opens on his unresolved \"mystic chord,\" a sonority hovering outside ordinary tonality, as if to render in sound a power humanity has summoned but cannot yet master. Across the score he binds the orchestra to a keyboard of coloured light, insisting that fire, illumination and creation are one ecstatic and dangerous act. The music climbs toward a blazing, near-uncontainable climax: the myth of stolen fire recast as an intoxicating drive to create something greater and more luminous than ourselves.",
        "source": "Alexander Scriabin, symphonic poem for orchestra, piano, chorus and colour organ, composed 1910 (IMSLP / Petrucci Music Library score)",
        "href": "https://imslp.org/wiki/Prometheus,_Le_Po%C3%A8me_du_Feu,_Op.60_(Scriabin,_Aleksandr)"
      }
    ],
    "rank": 11
  },
  {
    "slug": "uefa-fifa-infantino-world-cup-selloff",
    "headline": "European soccer body UEFA warns FIFA of legal action over Infantino's abandoned plan to sell World Cup stakes",
    "overview": "UEFA warned FIFA it could take legal action over president Gianni Infantino's failed plan to sell commercial stakes in the men's World Cup, according to senior European soccer officials. Opponents threatened 'non co-operation' with FIFA unless Infantino steps back, deepening a governance crisis. Several national federations have withdrawn support for his re-election.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQS1lMdTNycFBsQVJid1UxY0RFd0xEcVRKdW5MM2NSRGlLUTVraUVtU2xuMzk5MGFUVXhzd19XUXJwajdiNTIxX3lGSGF6UlhLODdwbjhzc1d6c09DbWZzMjJyYmo4ZXBSQ1lRWEtSeHFBRjF2UDM4NzY4OFhGX3ZXS1h4YnFXU29WdS1jTE12RW1YVmNtZUliT0E0WQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/sport/football/articles/cp30vg829nxo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/uefa-fifa-infantino-world-cup-selloff.png",
      "alt": "The modernist stone-and-glass headquarters of world soccer's governing body on a wooded hillside above Zurich.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Zanes of Olympia: statues cast from cheaters' fines",
        "excerpt": "By the platform have been set up bronze images of Zeus. These have been made from the fines inflicted on athletes who have wantonly broken the rules of the contests, and they are called Zanes (figures of Zeus) by the natives.",
        "source": "Pausanias, Description of Greece 5.21.2, trans. W. H. S. Jones (Loeb, 1918); Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Paus.+5.21.2",
        "image": {
          "src": "/covers/uefa-fifa-infantino-world-cup-selloff--a0.png",
          "alt": "Row of stone statue bases (the Zanes) lining the entrance to the ancient stadium at Olympia, funded by fines levied on athletes who bribed their way to victory",
          "credit": "Bases of the Zanes, Olympia (4th–1st century BC). Photo by Dennis Jarvis, Wikimedia Commons (CC BY-SA)"
        }
      },
      {
        "category": "historical",
        "title": "The Blue and Green factions and the Nika revolt against Justinian",
        "excerpt": "In every city the population has been divided for a long time past into the Blue and the Green factions; but within comparatively recent times it has come about that, for the sake of these names and the seats which the rival factions occupy in watching the games, they spend their money and abandon their bodies to the most cruel tortures ... I, for my part, am unable to call this anything except a disease of the soul.",
        "source": "Procopius, History of the Wars 1.24, trans. H. B. Dewing (Loeb, 1914); Internet Medieval Sourcebook, Fordham University",
        "href": "https://sourcebooks.fordham.edu/source/procop-wars1.asp",
        "image": {
          "src": "/covers/uefa-fifa-infantino-world-cup-selloff--a1.png",
          "alt": "Byzantine mosaic of Emperor Justinian I flanked by his court and guard, Basilica of San Vitale, Ravenna",
          "credit": "Mosaic of Emperor Justinian I, Basilica of San Vitale, Ravenna (c. 547). Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Pindar's Olympian 1: the glory of the games above all wealth",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth. But if, my heart, you wish to sing of contests, look no further for any star warmer than the sun ... and let us not proclaim any contest greater than Olympia.",
        "source": "Pindar, Olympian 1 (476 BC), trans. Diane Arnson Svarlien; Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1"
      },
      {
        "category": "literary",
        "title": "Dante's simoniacs: those who put holy things up for sale",
        "excerpt": "O Simon Magus, O forlorn disciples, / Ye who the things of God, which ought to be / The brides of holiness, rapaciously / For silver and for gold do prostitute,",
        "source": "Dante Alighieri, Inferno, Canto XIX, trans. Henry Wadsworth Longfellow (1867); Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_19"
      },
      {
        "category": "artistic",
        "title": "Panathenaic Prize Amphora: the foot-race",
        "excerpt": "On the body of this two-handled prize vase four nude runners stretch full-tilt across the clay, heads forward, arms pumping, the timeless image of athletes competing for honor. Such amphorae, filled with sacred olive oil from Athena's groves, were the official prizes of the Panathenaic games, their reverse always stamped with the goddess herself. The vessel fuses the athletic contest, its guardian deity, and its reward into a single object, a reminder that the games and their prizes were once held in trust for a whole community rather than sold off in shares.",
        "source": "Attic black-figure Panathenaic prize amphora attributed to the Euphiletos Painter, ca. 530–520 BC; British Museum (B137), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Panathenaic_amphora_BM_B137.jpg",
        "image": {
          "src": "/covers/uefa-fifa-infantino-world-cup-selloff--a4.png",
          "alt": "Attic black-figure amphora showing four nude runners in a foot-race, painted in black silhouette against the orange clay",
          "credit": "Panathenaic prize amphora, attributed to the Euphiletos Painter, ca. 530–520 BC, British Museum (B137). Photo: Jastrow, Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "El Greco: Christ Driving the Money Changers from the Temple",
        "excerpt": "With a raised cord whip and a swirl of rose and blue robes, Christ scatters the traders who had turned a sacred precinct into a marketplace, their bodies recoiling in a diagonal cascade of alarm. El Greco stages the cleansing amid grand classical columns, coins and caged doves spilling underfoot, dividing the panel between the guilty who flee and the faithful who look on. It is the archetypal image of the sacred defended against those who would put it up for sale.",
        "source": "El Greco (Domenikos Theotokopoulos), Christ Driving the Money Changers from the Temple, c. 1570; Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:El_Greco_(Domenikos_Theotokopoulos)_-_Christ_Driving_the_Money_Changers_from_the_Temple_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/uefa-fifa-infantino-world-cup-selloff--a5.png",
          "alt": "El Greco painting of Christ wielding a whip to drive merchants and money changers out of the temple, figures recoiling amid classical architecture",
          "credit": "El Greco, Christ Driving the Money Changers from the Temple, c. 1570. Wikimedia Commons (Google Art Project), public domain"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "mackintosh-building-rebuild-campaign",
    "headline": "A Scottish architect launches a campaign for a full rebuild of Glasgow's fire-ravaged Mackintosh Building",
    "overview": "Architect Ruairidh Moir launched a public campaign for a faithful reconstruction of Charles Rennie Mackintosh's fire-gutted Glasgow School of Art, dubbed 'Scotland's Notre-Dame'. He called for an independent body to take over the project after the school said it could not afford the roughly £265 million rebuild alone. A petition urging Scottish and UK government support gathered thousands of signatures.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/08/03/glasgow-school-of-art-campaign/"
      },
      {
        "name": "The Scotsman",
        "href": "https://www.scotsman.com/arts-and-culture/campaign-launched-for-full-rebuild-of-scotlands-notre-dame-at-gsa-8813887"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/mackintosh-building-rebuild-campaign.png",
      "alt": "The stone-and-glass facade of Charles Rennie Mackintosh's Glasgow School of Art building, with its tall studio windows.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of London devours Old St Paul's, 1666 — and Wren rebuilds it anew",
        "excerpt": "All Fleet street, the Old Bailey, Ludgate hill, Warwick lane, Newgate, Paul's chain, Watling street, now flaming, and most of it reduced to ashes; the stones of Paul's flew like grenados, the melting lead running down the streets in a stream, and the very pavements glowing with fiery redness, so as no horse, nor man, was able to tread on them, and the demolition had stopped all the passages, so that no help could be applied.",
        "source": "John Evelyn, 'The Diary of John Evelyn' (Vol. 2), entry for 4 September 1666, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/42081/pg42081.txt"
      },
      {
        "category": "historical",
        "title": "Venice's Campanile of San Marco collapses in 1902 and is rebuilt 'as it was, where it was'",
        "excerpt": "When the thousand-year-old bell tower crumbled into a heap of rubble in Piazza San Marco — killing no one but the custodian's cat — Venice resolved almost at once to raise it again exactly as it had stood. Mayor Filippo Grimani's watchword, 'com'era, dov'era' (as it was, where it was), overruled voices who found the square handsomer without it or a replica devoid of historical value. The new campanile, rebuilt with surviving bricks and crowned by the one bell that outlived the fall, was consecrated in 1912, a millennium after the first foundations were laid.",
        "source": "St Mark's Campanile — collapse of 14 July 1902 and reconstruction (inaugurated 25 April 1912) on the principle 'com'era, dov'era', Wikipedia",
        "href": "https://en.wikipedia.org/wiki/St_Mark%27s_Campanile",
        "image": {
          "src": "/covers/mackintosh-building-rebuild-campaign--a1.png",
          "alt": "A mound of rubble where a great bell tower once stood, beside the arcades of St Mark's Square",
          "credit": "Domenico Anderson, ruins of the Campanile of San Marco, 14 July 1902, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "The Phoenix reborn from its own ashes — Ovid's 'Metamorphoses'",
        "excerpt": "There is one bird which reproduces and renews itself: the Assyrians gave this bird his name—the Phoenix. He does not live either on grain or herbs, but only on small drops of frankincense and juices of amomum. ... As soon as he has strewn in this new nest the cassia bark and ears of sweet spikenard, and some bruised cinnamon with yellow myrrh, he lies down on it and refuses life among those dreamful odors.—And they say that from the body of the dying bird is reproduced a little Phoenix which is destined to live just as many years.",
        "source": "Ovid, 'Metamorphoses' Book XV, trans. Brookes More (1922), Theoi Classical Texts Library",
        "href": "https://www.theoi.com/Text/OvidMetamorphoses15.html"
      },
      {
        "category": "literary",
        "title": "Ruskin's warning: to 'restore' is 'the most total destruction which a building can suffer'",
        "excerpt": "Neither by the public, nor by those who have the care of public monuments, is the true meaning of the word restoration understood. It means the most total destruction which a building can suffer: a destruction out of which no remnants can be gathered; a destruction accompanied with false description of the thing destroyed. Do not let us deceive ourselves in this important matter; it is impossible, as impossible as to raise the dead, to restore anything that has ever been great or beautiful in architecture.",
        "source": "John Ruskin, 'The Seven Lamps of Architecture' (1849), ch. VI 'The Lamp of Memory', Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/35898/pg35898.txt"
      },
      {
        "category": "artistic",
        "title": "Turner paints a beloved landmark ablaze: 'The Burning of the Houses of Lords and Commons'",
        "excerpt": "Turner stood among the crowds on the Thames the night the Palace of Westminster burned, and turned catastrophe into incandescence — a torrent of white-gold fire tearing into the sky while Westminster Bridge and the water below blaze in its reflection. The very stone of a national monument seems to dissolve into heat and light, spectators reduced to shadows at the river's edge. The painting fixes the terrible beauty of the moment a treasured building is lost, the same shock Glasgow felt watching the Mackintosh burn.",
        "source": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons, October 16, 1834' (1835), oil on canvas, Philadelphia Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/mackintosh-building-rebuild-campaign--a4.png",
          "alt": "A vast public building engulfed in white-gold flames at night, its fire mirrored in the river below",
          "credit": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons' (1835), Philadelphia Museum of Art, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Stravinsky's 'Firebird' — a score of destruction giving way to radiant rebirth",
        "excerpt": "Stravinsky's 1910 ballet takes the Russian folk emblem of the fire-bird — kin to the phoenix — and drives its music from menace and the shattering of Kashchei's dark kingdom toward a slowly swelling hymn. In the Finale a single horn intones a quiet melody that gathers strength, instrument by instrument, until the whole orchestra blazes into a triumphant coda of bells and brass. It is the sound of something thought lost rising again, luminous and whole — the very hope a full rebuild of the Mackintosh would embody.",
        "source": "Igor Stravinsky, 'The Firebird' (L'Oiseau de feu), ballet, 1910, IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/The_Firebird_(ballet),_K010_(Stravinsky,_Igor)"
      }
    ],
    "rank": 13
  },
  {
    "slug": "cuba-national-grid-collapse-blackout",
    "headline": "Cuba's national electricity grid collapses, plunging the island's roughly 10 million people into darkness in the country's sixth nationwide blackout of 2026",
    "overview": "Cuba's National Electric System disconnected entirely at about 10:43 p.m. on Sunday, the state Electric Union said, cutting power across the island of some 10 million people for the sixth time this year. The grid has repeatedly failed in 2026 amid chronic shortages of fuel and spare parts and breakdowns at thermoelectric plants, some more than 30 years old. Havana has struggled to import fuel since the loss of its main ally, Venezuela, and amid renewed US pressure.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxOMTdFbGhVSWlfdzZ3aWduVjdUeTFvMnBFVFhaMjg4SkhrMXJlcnFtWTlWTTdnRjNLMzRCNHg4Tm9OTlpkM2c3QlFGR2RuejZnNlM5R182b09EbXQ4dG5RaEJjSHNDRjhtOS1aY05DZlAtQWlMZVBHdE1yY0xFb29yazdJeW03ZXVGcXZSQ2FLOFlremVCcGZ0ckZobkFqRG9fZGc?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/8/3/grid-failure-plunges-cuba-into-nationwide-blackout"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/cuba-national-grid-collapse-blackout.png",
      "alt": "A darkened Havana skyline at night during a nationwide power blackout in Cuba.",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "A Darkness Like a Sealed Room",
        "excerpt": "We had scarcely sat down when night was upon us,—not such as we have when there is no moon, or when the sky is cloudy, but such as there is in some closed room when the lights are extinguished. You might hear the shrieks of women, the monotonous wailing of children, the shouts of men.",
        "source": "Pliny the Younger, Letters, Book VI (second letter to Cornelius Tacitus on the eruption of Vesuvius, AD 79), English translation, in 'Pliny's Letters,' Chapter 2. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Pliny%27s_Letters/Chapter_2"
      },
      {
        "category": "historical",
        "title": "The Dark Day of 1780",
        "excerpt": "We were here at the time the 'dark day' happened, (19th of May;) it has been said that the darkness was not so great in New-Jersey as in New-England. How great it was there I do not know, but I know that it was very dark where I then was in New-Jersey; so much so that the fowls went to their roosts, the cocks crew and the whip-poor-wills sung their usual serenade; the people had to light candles in their houses to enable them to see to carry on their usual business; the night was as uncommonly dark as the day was.",
        "source": "Joseph Plumb Martin, The Adventures of a Revolutionary Soldier (A Narrative of Some of the Adventures, Dangers and Sufferings of a Revolutionary Soldier, 1830), Chapter VI. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Adventures_Of_A_Revolutionary_Soldier/Chapter_VI."
      },
      {
        "category": "literary",
        "title": "The Bright Sun Was Extinguished",
        "excerpt": "I had a dream, which was not all a dream.\nThe bright sun was extinguished, and the stars\nDid wander darkling in the eternal space,\nRayless, and pathless, and the icy Earth\nSwung blind and blackening in the moonless air;\nMorn came and went—and came, and brought no day,\nAnd men forgot their passions in the dread\nOf this their desolation; and all hearts\nWere chilled into a selfish prayer for light:\nAnd they did live by watchfires—and the thrones,\nThe palaces of crownéd kings—the huts,\nThe habitations of all things which dwell,",
        "source": "Lord Byron, 'Darkness' (1816), in The Works of Lord Byron, Vol. IV. Project Gutenberg eBook No. 20158.",
        "href": "https://www.gutenberg.org/files/20158/20158-h/20158-h.htm"
      },
      {
        "category": "literary",
        "title": "Darkness Which May Be Felt",
        "excerpt": "And the LORD said unto Moses, Stretch out thine hand toward heaven, that there may be darkness over the land of Egypt, even darkness which may be felt. And Moses stretched forth his hand toward heaven; and there was a thick darkness in all the land of Egypt three days: They saw not one another, neither rose any from his place for three days: but all the children of Israel had light in their dwellings.",
        "source": "The Holy Bible, King James Version, Exodus 10:21–23. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus"
      },
      {
        "category": "artistic",
        "title": "Nocturne on a Darkened River",
        "excerpt": "Whistler drains a great city at night down to a few strokes of blue-black and faint gold: the pier of Old Battersea Bridge looms as a silhouette over a Thames barely distinguishable from the sky, with only distant sparks of light to mark that a metropolis is there at all. The painting turns a darkened urban waterfront into something hushed and near-formless, an apt mirror for an island whose skyline vanishes when the grid fails.",
        "source": "James McNeill Whistler, Nocturne: Blue and Gold – Old Battersea Bridge (c. 1872–1875), oil on canvas, Tate Britain, London. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:James_McNeill_Whistler_-_Nocturne_en_bleu_et_or.jpg",
        "image": {
          "src": "/covers/cuba-national-grid-collapse-blackout--a4.png",
          "alt": "A misty nocturnal view of the Thames with the tall dark pier of Old Battersea Bridge silhouetted against a blue-black sky, faint golden lights and sparks of fireworks glimmering in the distance.",
          "credit": "James McNeill Whistler, Nocturne: Blue and Gold – Old Battersea Bridge (c. 1872–1875), Tate Britain. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Representation of Chaos",
        "excerpt": "Haydn opens The Creation with 'The Representation of Chaos,' an orchestral prelude that refuses to settle: dissonances, drifting harmonies and unresolved phrases evoke a formless, lightless void before order exists—until the chorus finally erupts on the words 'and there was Light.' It is a portrait of the moment before power returns, the exact suspension a darkened nation lives through waiting for the current to come back. The composer is shown here in Thomas Hardy's 1791 portrait, painted during Haydn's London years.",
        "source": "Joseph Haydn, 'The Representation of Chaos,' opening of the oratorio The Creation (Die Schöpfung, 1798); illustrated by Thomas Hardy's portrait of Haydn (1791), Royal College of Music. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Haydn,_portrait_by_Thomas_Hardy.jpg",
        "image": {
          "src": "/covers/cuba-national-grid-collapse-blackout--a5.png",
          "alt": "Half-length painted portrait of composer Joseph Haydn in a grey coat and powdered wig, seated and facing right, holding a bound volume with a keyboard instrument behind him.",
          "credit": "Thomas Hardy, Portrait of Joseph Haydn (1791), Royal College of Music. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "us-japan-joint-yen-intervention",
    "headline": "The United States and Japan jointly intervene in currency markets to support the yen, a rare coordinated move that sends the dollar sharply lower",
    "overview": "Washington and Tokyo carried out a rare joint intervention to prop up the Japanese yen, and both said they would not hesitate to act together again in the future. The dollar fell sharply against the yen after the move, which followed weeks of pressure on the currency. US Treasury Secretary Scott Bessent signaled readiness to repeat the coordinated action and urged a bigger Federal Reserve backstop.",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cglj1pr0wjwo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxOWkpfVU0zTnBZSEZnbmNLUUxSMzVoSzVTMk1xZVRyS1FaU1hHbXBlVlpIWHJsQ1owSndGU3hKS3Znc3RVUjFiS3VnUl9vWU54Y05JT1dWb19GeG50NkttOVZld1hNUndETHJOdzhBSnhsY3FtQml3dXRRWmZxbTVSOE0teE1wMldFVmtuS3F3RXdDM1JMU29DcA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/us-japan-joint-yen-intervention.png",
      "alt": "Japanese yen banknotes fanned out beside US dollar bills, illustrating a currency intervention.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rome manipulates the value of its coin",
        "excerpt": "The weight, however, of the libra of copper was diminished during the First Punic War, the republic not having means to meet its expenditure: in consequence of which, an ordinance was made that the as should in future be struck of two ounces weight. By this contrivance a saving of five-sixths was effected, and the public debt was liquidated. ... Livius Drusus, when tribune of the people, alloyed the silver with one-eighth part of copper.",
        "source": "Pliny the Elder, The Natural History, Book XXXIII, ch. 13, trans. John Bostock and H. T. Riley (London, 1855). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0137%3Abook%3D33%3Achapter%3D13"
      },
      {
        "category": "historical",
        "title": "The Tripartite Agreement of 1936",
        "excerpt": "The Government of the United States, after consultation with the British Government and the French Government, joins with them in affirming a common desire to foster those conditions which safeguard peace and will best contribute to the restoration of order in international economic relations... The United States Government, as also the British and French Governments, declares its intention to continue to use appropriate available resources so as to avoid as far as possible any disturbance of the basis of international exchange resulting from the proposed readjustment. It will arrange for such consultation for this purpose as may prove necessary with the other two Governments and their authorized agencies.",
        "source": "Declaration on currency (Tripartite Agreement), statement issued by the U.S. Treasury, September 25, 1936, reprinted in Federal Reserve Bulletin, Vol. 22, No. 10 (October 1936), pp. 759-760. FRASER, Federal Reserve Bank of St. Louis.",
        "href": "https://fraser.stlouisfed.org/files/docs/publications/FRB/1930s/frb_101936.pdf"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes on the hunger for silver",
        "excerpt": "He that loveth silver shall not be satisfied with silver; nor he that loveth abundance with increase: this is also vanity. When goods increase, they are increased that eat them: and what good is there to the owners thereof, saving the beholding of them with their eyes? The sleep of a labouring man is sweet, whether he eat little or much: but the abundance of the rich will not suffer him to sleep.",
        "source": "Ecclesiastes 5:10-12, King James Version (1611; 1769 standard text). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "literary",
        "title": "Timon's yellow slave that makes black white",
        "excerpt": "Gold? Yellow, glittering, precious Gold?\nNo Gods, I am no idle Votarist,\nRoots you cleere Heauens. Thus much of this will make\nBlacke, white; fowle, faire; wrong, right;\nBase, Noble; Old, young; Coward, valiant.\n...\nThis yellow Slaue,\nWill knit and breake Religions, blesse th' accurst,\nMake the hoare Leprosie ador'd, place Theeues,\nAnd giue them Title, knee, and approbation\nWith Senators on the Bench...",
        "source": "William Shakespeare, The Life of Timon of Athens (First Folio text, 1623), Act IV, Scene 3. Project Gutenberg, ebook no. 1132.",
        "href": "https://www.gutenberg.org/ebooks/1132"
      },
      {
        "category": "artistic",
        "title": "Reymerswaele, ‘The Banker and His Wife’",
        "excerpt": "Marinus van Reymerswaele paints a banker hunched over his balance and stacked gold coins, weighing currency to the last grain while his wife looks up from an illuminated ledger. The obsessive attention to the metal’s exact worth makes money itself the true subject of the picture. It is an early portrait of a world in which the precise value of a coin—and the will to defend it—governs everything.",
        "source": "Marinus van Reymerswaele, The Banker and His Wife (c. 1538), oil on panel. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Marinus_van_Reymerswale_-_The_Banker_and_His_Wife_-_WGA19323.jpg",
        "image": {
          "src": "/covers/us-japan-joint-yen-intervention--a4.png",
          "alt": "A 16th-century banker weighs gold coins on a balance while his wife watches beside an open ledger.",
          "credit": "Marinus van Reymerswaele, The Banker and His Wife (c. 1538). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Rhinegold hoard",
        "excerpt": "In the opening scene of Das Rheingold the Nibelung Alberich steals the gold guarded by the Rhinemaidens and forges it into a ring that promises mastery over the world, setting gods, dwarves and giants scheming to seize and redistribute the hoard. Wagner scores this contest over gold with the shimmering, endlessly rising Rhine motif and the ominous ring theme, turning the manipulation of a single golden treasure into the engine of an entire cosmic drama. The parallel is exact: whoever controls the store of value controls the balance of power, and every party maneuvers to bend that value to its own ends.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (composed 1854, first performed 1869); full score at IMSLP. Portrait: Casar Willich, Portrait of Richard Wagner (c. 1862).",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/us-japan-joint-yen-intervention--a5.png",
          "alt": "Oil portrait of a middle-aged Richard Wagner in dark coat and white cravat, seen half-length against a plain dark background, gazing slightly to one side.",
          "credit": "Casar Willich, Portrait of Richard Wagner (c. 1862), Reiss-Engelhorn-Museen, Mannheim. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "aung-san-suu-kyi-red-cross-visit",
    "headline": "Myanmar's military releases photos of detained former leader Aung San Suu Kyi meeting a Red Cross official, her first confirmed outside contact in about two and a half years",
    "overview": "Myanmar's military government released photographs showing Aung San Suu Kyi, 81, meeting an official of the International Committee of the Red Cross, her first confirmed contact with the outside world since early 2024. The Nobel laureate has been held largely incommunicado since the 2021 coup and is serving decades-long prison sentences. Rights groups have repeatedly demanded proof of her wellbeing.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPRjJySG5fWC1faXFlRjYzYndjVkNQMVhTQ1BHalhDVklUZ3d5TzY2R29lUzFaSTNCaGNWNzVDd0JTY3c2MDZTWm9tbmJFWGtpSl9ldDN4NkVuOV9NaURPNWxKODdJZDZmQ0RqbDNzaUMtc3RwUTJ2UW5RR0ZKdzItbjVuWEVIRjZROFgtbnh6SFkyTElUVG9DdTdiclNzdU5hZWEzS05GRFh6bHJnYy03d2NSenhmZWV3Uy1fR19B?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c1e1d5j6660o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/aung-san-suu-kyi-red-cross-visit.png",
      "alt": "The headquarters of the International Committee of the Red Cross in Geneva.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Boethius awaiting execution in his cell",
        "excerpt": "'Ah! why,' I cried, 'mistress of all excellence, hast thou come down from on high, and entered the solitude of this my exile? Is it that thou, too, even as I, mayst be persecuted with false accusations?'\n\n'Could I desert thee, child,' said she, 'and not lighten the burden which thou hast taken upon thee through the hatred of my name, by sharing this trouble?'",
        "source": "Boethius, The Consolation of Philosophy, written c. 524 AD while imprisoned at Pavia awaiting execution; translated into English prose and verse by H. R. James (1897). Project Gutenberg eBook #14328.",
        "href": "https://www.gutenberg.org/cache/epub/14328/pg14328.txt"
      },
      {
        "category": "historical",
        "title": "The Red Cross reaches Mandela on Robben Island",
        "excerpt": "Like the ICRC photograph now released from Myanmar, the Red Cross visits to apartheid South Africa's political prisoners were often the sole confirmed channel between a detained leader and the outside world. From 1967 to 1986, ICRC delegates saw Nelson Mandela repeatedly, first on Robben Island and later at Pollsmoor, pressing for humane conditions and carrying word of his condition beyond the prison walls when the state kept him otherwise cut off. Their reports made an isolated, incommunicado prisoner visible again, echoing exactly the role a Red Cross official plays for Aung San Suu Kyi.",
        "source": "International Committee of the Red Cross, 'A tribute to Nelson Mandela' (ICRC official record of its 1967-1986 prison visits).",
        "href": "https://www.icrc.org/en/document/tribute-nelson-mandela"
      },
      {
        "category": "literary",
        "title": "Lovelace: stone walls do not a prison make",
        "excerpt": "Stone walls doe not a prison make,\nNor iron bars a cage;\nMindes innocent and quiet take\nThat for an hermitage;\nIf I have freedome in my love,\nAnd in my soule am free,\nAngels alone that sore above\nEnjoy such liberty.",
        "source": "Richard Lovelace, 'To Althea, from Prison' (written 1642 during his imprisonment; published in Lucasta, 1649). Wikisource.",
        "href": "https://en.wikisource.org/wiki/To_Althea,_from_Prison"
      },
      {
        "category": "literary",
        "title": "Wilde's prisoner and the tent of blue",
        "excerpt": "I never saw a man who looked\nWith such a wistful eye\nUpon that little tent of blue\nWhich prisoners call the sky,\nAnd at every drifting cloud that went\nWith sails of silver by.",
        "source": "Oscar Wilde, 'The Ballad of Reading Gaol' (1898), written after his own imprisonment. Project Gutenberg eBook #301.",
        "href": "https://www.gutenberg.org/files/301/301-h/301-h.htm"
      },
      {
        "category": "artistic",
        "title": "Van Gogh: the prisoners' round",
        "excerpt": "Painted in 1890 while Van Gogh was himself confined at the asylum in Saint-Remy, 'Prisoners Exercising' shows inmates trudging in an endless circle at the bottom of a sheer, blue-walled shaft, hemmed in on every side with no sky in view. The tiny, bowed figures and the crushing verticality of the walls make visible the years of enforced isolation behind Aung San Suu Kyi's detention, and the single upturned face suggests the smallest gesture toward the outside world.",
        "source": "Vincent van Gogh, Prisoners Exercising (Prisoners' Round, after Gustave Dore), 1890, oil on canvas, Pushkin Museum of Fine Arts, Moscow.",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_Willem_van_Gogh_037.jpg",
        "image": {
          "src": "/covers/aung-san-suu-kyi-red-cross-visit--a4.png",
          "alt": "A ring of prisoners in muted uniforms trudging single file in a tight circle at the foot of towering blue-grey prison walls, one man's pale face turned toward the viewer.",
          "credit": "Vincent van Gogh, Prisoners Exercising (1890), Pushkin Museum of Fine Arts, Moscow. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven's prisoners, briefly in the light",
        "excerpt": "In the Prisoners' Chorus of Beethoven's only opera, Fidelio, captives are let up from their dungeon into the open air for a single stolen moment and sing tremulously of light and freedom before being driven back below. Composed in a Vienna shadowed by tyranny, it turns a brief, monitored glimpse of the outside world into one of music's great emblems of hope for the unjustly detained, the same fragile opening the released ICRC photograph represents for Aung San Suu Kyi.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72 (1805, rev. 1814); Prisoners' Chorus, 'O welche Lust'. Full scores at IMSLP. Portrait: Joseph Karl Stieler, 1820, Beethoven-Haus, Bonn.",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/aung-san-suu-kyi-red-cross-visit--a5.png",
          "alt": "Oil portrait of Ludwig van Beethoven seated with a red scarf, holding pen and a manuscript, gazing intently upward and to the side.",
          "credit": "Joseph Karl Stieler, Beethoven with the Manuscript of the Missa Solemnis (1820), Beethoven-Haus, Bonn. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "deepseek-alibaba-low-cost-ai-models",
    "headline": "DeepSeek releases what a research firm calls the cheapest well-known AI model to run, hours after Alibaba unveils its largest model yet, escalating China's AI price war",
    "overview": "DeepSeek launched a new model that the research firm Artificial Analysis called by far the cheapest of any well-known model to operate, undercutting rivals on inference cost. The release came shortly after Alibaba unveiled its largest artificial-intelligence model to date. The dueling launches sharpen a race among Chinese developers to combine frontier performance with ultra-low prices.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxOTnd6ckhOVUhwcGJjRmxRdlhObS1ncXRhZm9OeVUwaEgwOTg5YmNBTGVWcHZsdXd4dXVrWWdlZGtsYkw0eDIyY1A3NjdSM0o0bFBGUEZRNDF2NjYwZEtCamNpeTFqN3ZaQVlTclNuQWYxNXh4ZVlqaWF3WkNNVk1fbmJXcTdISlBmUVVWS01STmFYZldLSGk5akJQZVB5X09OSzVoVWF4Wko4TEF4cGozQUlWM202dFJWMGxSRTdpcTNaaUp6bmNyZXpWbVRFb2JoSzdCVQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0wFBVV95cUxObUlCNHp6dVFoTEtqbkF3aFZqaVNUUVRJd0dicUhkb2tidzdkUWg0OVp1SU94aFJ1dmdkbDZIZGxMQVNWMm5vYXNKR0JicHNwZWRVX25ZY0hHaTNVUVdIWGdBNERsS3hDT29CdzlydEFGbFJzblgyempKcjljLVFELTVPRjdHVnRrOVRmQUs5QWVFQlg3aWVET1lNcDE4R2wwSC1vazRDaTNTZFhURm9qUGFfWGE5Sk1pMHNBUWx3TG85S1lZSWV4TUJxRU11UVhMR2Iw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/deepseek-alibaba-low-cost-ai-models.png",
      "alt": "A data-center server hall with rows of racks, illustrating AI model inference.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Bacon names printing as a world-changing engine",
        "excerpt": "Again, we should notice the force, effect, and consequences of inventions, which are nowhere more conspicuous than in those three which were unknown to the ancients; namely, printing, gunpowder, and the compass. For these three have changed the appearance and state of the whole world: first in literature, then in warfare, and lastly in navigation; and innumerable changes have been thence derived, so that no empire, sect, or star, appears to have exercised a greater power and influence on human affairs than these mechanical discoveries.",
        "source": "Francis Bacon, Novum Organum (The New Organon), Book I, Aphorism 129, 1620, trans. from the Latin; Project Gutenberg edition (eBook #45988).",
        "href": "https://www.gutenberg.org/files/45988/45988-h/45988-h.htm"
      },
      {
        "category": "historical",
        "title": "Babbage: machinery, competition, and the collapse of price",
        "excerpt": "We have seen that the application of the division of labour tends to produce cheaper articles; that it thus increases the demand; and gradually, by the effect of competition, or by the hope of increased gain, that it causes large capitals to be embarked in extensive factories.",
        "source": "Charles Babbage, On the Economy of Machinery and Manufactures, 1832 (paragraph 269); Project Gutenberg edition (eBook #4238).",
        "href": "https://www.gutenberg.org/cache/epub/4238/pg4238.html"
      },
      {
        "category": "literary",
        "title": "Capek's cheapest possible worker",
        "excerpt": "DOMIN. No. The one that is the cheapest. The one whose requirements are the smallest. Young Rossum invented a worker with the minimum amount of requirements. He had to simplify him. He rejected everything that did not contribute directly to the progress of work. Everything that makes man more expensive. In fact he rejected man and made the Robot. My dear Miss Glory, the Robots are not people. Mechanically they are more perfect than we are; they have an enormously developed intelligence, but they have no soul.",
        "source": "Karel Capek, R.U.R. (Rossum's Universal Robots), 1920, English translation by Paul Selver and Nigel Playfair; Project Gutenberg edition (eBook #59112).",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm"
      },
      {
        "category": "literary",
        "title": "The spark of being infused into an engineered mind",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Wollstonecraft Shelley, Frankenstein; or, The Modern Prometheus, Chapter 5, 1818; Project Gutenberg edition (eBook #84).",
        "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt"
      },
      {
        "category": "artistic",
        "title": "The Mechanical Turk: a machine that seems to think",
        "excerpt": "Racknitz's cutaway engraving exposes the hidden operator crouched inside Wolfgang von Kempelen's chess-playing 'Turk,' the eighteenth century's most famous automaton. For decades audiences across Europe believed a mere mechanism could out-reason a human being. The print is a fitting emblem for an age dazzled by the apparent intelligence of machines and by the question of how cheaply that intelligence can truly be produced.",
        "source": "Joseph Friedrich Freiherr zu Racknitz, engraving of Kempelen's chess automaton, from Ueber den Schachspieler des Herrn von Kempelen, 1789. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Racknitz_-_The_Turk_3.jpg",
        "image": {
          "src": "/covers/deepseek-alibaba-low-cost-ai-models--a4.png",
          "alt": "A hand-colored engraving showing the Turk automaton, a robed figure seated at a chess cabinet, with the cabinet's doors open to reveal the internal machinery and the space concealing a human operator.",
          "credit": "Joseph Friedrich zu Racknitz, engraving of Kempelen's chess-playing automaton (1789). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Knowledge made visible around a machine",
        "excerpt": "In Joseph Wright of Derby's candlelit scene, a lecturer demonstrates an orrery, a clockwork model of the solar system, to an enthralled group of ordinary onlookers. A single lamp stands in for the sun, throwing rapt faces into golden light. Painted at the dawn of the Industrial Revolution, it captures the moment when mechanized instruments began to place once-rarefied knowledge within everyone's reach.",
        "source": "Joseph Wright of Derby, A Philosopher Lecturing on the Orrery, oil on canvas, c. 1766, Derby Museum and Art Gallery. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Wright_of_Derby,_The_Orrery.jpg",
        "image": {
          "src": "/covers/deepseek-alibaba-low-cost-ai-models--a5.png",
          "alt": "A dramatic candlelit oil painting in which a lecturer and a circle of adults and children lean over a brass mechanical model of the planets, their faces illuminated by a hidden lamp at the model's center.",
          "credit": "Joseph Wright of Derby, A Philosopher Lecturing on the Orrery (c. 1766), Derby Museum and Art Gallery. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "liechtenstein-company-register-cyberattack",
    "headline": "A cyberattack on Liechtenstein's business register exposes information on about 31,000 companies and foundations, including the people behind them, officials say",
    "overview": "Hackers accessed Liechtenstein's central register of legal entities, obtaining data on roughly 31,000 companies and foundations along with details of the beneficial owners behind them, authorities said. The tiny Alpine principality is a well-known offshore financial center, making the breach potentially sensitive for wealthy account holders worldwide. Officials said they were investigating the scope of the intrusion.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPVGxRSjQ4RVRJNVQ3QWY0aGFRemxqN19ISlRTSUdlV1pLWWJob29zcjBHQktNZ3ZpcFBROEpERnBqTHVILXNVbTd2SnFLMExoTktvYy1WLVVpU0VnSDlBd2s3ZjBEZGU2ampLUXd2VFBEcmhnWlEycjMzMjZFcExzbERSS0hEa3hwYkZQTi1sb2owYmh0RHl6UDNQalJIWWdr?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQcWdkeThJMDZ2MFc0N2tjZ1FQdHNlMjg2UXA5NnJjamh6aXAxMkEzUTZlUkxidGtXM29DdS1kVHJYamFoOUM5MVBydXZQbG1UZzJja09oTUoteTdoTGpuY1hLYWJpVXA3TWxDMXNhajZJdmtaZWliRkdhNTVtU2xLMWtMNjZRWWs2bVgxaDVJSTFpS3pzeTlRTmJwQ1M2SW4waUp3Rjg1dGk2OWxj?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/liechtenstein-company-register-cyberattack.png",
      "alt": "Vaduz Castle above the capital of Liechtenstein, the Alpine financial principality.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Clodius Burns the Roman Register",
        "excerpt": "eum qui aedem nympharum incendit ut memoriam publicam recensionis tabulis publicis impressam exstingueret",
        "source": "Cicero, Pro Milone 73 (Latin text, ed. A. C. Clark), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0011:text=Mil.:section=73"
      },
      {
        "category": "historical",
        "title": "Sunlight on the Money Trust",
        "excerpt": "Publicity is justly commended as a remedy for social and industrial diseases. Sunlight is said to be the best of disinfectants; electric light the most efficient policeman. And publicity has already played an important part in the struggle against the Money Trust.",
        "source": "Louis D. Brandeis, Other People's Money and How the Bankers Use It, ch. V, 'What Publicity Can Do' (1914), Project Gutenberg ebook #57819",
        "href": "https://www.gutenberg.org/files/57819/57819-h/57819-h.htm"
      },
      {
        "category": "literary",
        "title": "The Document That Confers Power",
        "excerpt": "“Yes,” replied the Prefect; “and the power thus attained has, for some months past, been wielded, for political purposes, to a very dangerous extent. The personage robbed is more thoroughly convinced, every day, of the necessity of reclaiming her letter.”",
        "source": "Edgar Allan Poe, 'The Purloined Letter' (1845), in The Works of Edgar Allan Poe, Vol. 2, Project Gutenberg ebook #2148",
        "href": "https://www.gutenberg.org/files/2148/2148-h/2148-h.htm"
      },
      {
        "category": "literary",
        "title": "Open, Sesame: The Vault Cracked Open",
        "excerpt": "The finest man among them, whom Ali Baba took to be their captain, went a little way among some bushes, and said: “Open, Sesame!” so plainly that Ali Baba heard him. A door opened in the rocks, and having made the troop go in, he followed them, and the door shut again of itself.",
        "source": "'The Forty Thieves,' in Andrew Lang (ed.), The Blue Fairy Book (1889), Project Gutenberg ebook #503",
        "href": "https://www.gutenberg.org/files/503/503-h/503-h.htm"
      },
      {
        "category": "artistic",
        "title": "Weighing the Hidden Wealth",
        "excerpt": "A moneychanger tips gold coins onto a balance while his wife, distracted from her prayer book, watches the glint of the metal; on the shelf and table sit the instruments of a private financial world kept in ledgers and coin. Like a register of a wealth center's clients, the painting turns intimate, hidden riches into something meticulously counted and recorded, a small convex mirror hinting that an unseen eye is always watching what should stay private.",
        "source": "Quentin Matsys, The Money Changer and His Wife (1514), oil on panel, Musée du Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/liechtenstein-company-register-cyberattack--a4.png",
          "alt": "A seated 16th-century moneychanger weighs gold coins on a small balance while his richly dressed wife beside him looks up from an illuminated prayer book toward the money.",
          "credit": "Quentin Matsys, The Money Changer and His Wife (1514), Musée du Louvre. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Rich Man Alone with His Ledgers",
        "excerpt": "By the glow of a single candle an old man peers through spectacles at a coin, hemmed in by piles of papers, account books, sealed documents and money bags heaped in the dark. Rembrandt's rich fool hoards a fortune of records and coin in secret, a fitting image for a register in which the private holdings of thousands are locked away until a single breach floods the shadows with light.",
        "source": "Rembrandt van Rijn, The Parable of the Rich Fool (The Money Changer) (1627), oil on oak panel, Gemäldegalerie, Berlin",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_The_Parable_of_the_Rich_Fool.jpg",
        "image": {
          "src": "/covers/liechtenstein-company-register-cyberattack--a5.png",
          "alt": "In near-darkness an old bespectacled man holds a gold coin up to a candle flame, surrounded by stacks of ledgers, papers, sealed letters and money bags.",
          "credit": "Rembrandt van Rijn, The Parable of the Rich Fool (1627), Gemäldegalerie, Berlin. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "australia-first-h5n1-seabird-die-off",
    "headline": "Australia confirms its first mass die-off of seabirds from H5N1 bird flu, with about 50 greater crested terns found dead on the South Australian coast",
    "overview": "Testing confirmed H5N1 avian influenza in a colony of greater crested terns off Cape Jaffa, about 250 km south of Adelaide, where some 49 dead and 35 sick birds were spotted from the air, officials said. It is Australia's first confirmed mass-mortality event from the virus, which was first detected in the country in June. The agriculture minister warned Australians should expect further spread among wildlife.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxPM0lHZjUwb2ZfbnBDNTFjMFJWNEdIQnh1Snp0RFQ4bWFJam01S3VnckxsanA0TDRjZkhLdGNvQzV3Zk1DaTNyV1M4SWRkU2IwVjJUdXRQMTBZQUZxRGhyMnZVWGhpSlJ5aHB3SWw2b1k0TXZqVXhuZGVNV3YtVWlid1pYRGRjMnJGdzJFWGtRaEpaSW5OcXBHamc0WTY1QjFVSnk1Sk5mTWJTeDViUHBYeV9qXzVPdE9QNVU3c0piZmFFYkJTWmhTcA?oc=5"
      },
      {
        "name": "IBTimes",
        "href": "https://www.ibtimes.com.au/australia-first-mass-bird-flu-event-1873355"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/australia-first-h5n1-seabird-die-off.png",
      "alt": "A greater crested tern standing on a rocky shore.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The murrain of Egypt: a plague upon the beasts",
        "excerpt": "Behold, the hand of the LORD is upon thy cattle which is in the field, upon the horses, upon the asses, upon the camels, upon the oxen, and upon the sheep: there shall be a very grievous murrain. . . . And the LORD did that thing on the morrow, and all the cattle of Egypt died: but of the cattle of the children of Israel died not one.",
        "source": "The Holy Bible, King James Version (1769 Oxford edition), Exodus 9:3-6. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus"
      },
      {
        "category": "historical",
        "title": "The last of the great auks, hunted from the seas",
        "excerpt": "In like manner the fact is incontestable that its breeding-stations in the western part of the Atlantic were for three centuries regularly visited and devastated with the combined objects of furnishing food or bait to the fishermen from very early days, and its final extinction . . . was owing to “the ruthless trade in its eggs and skin.” . . . yet on this rock (Eldey = fire-island) they were “specially hunted down” whenever opportunity offered, until the stock there was wholly extirpated in 1844.",
        "source": "“Gare-fowl” (the Great Auk, Alca impennis), Encyclopædia Britannica, 11th edition (1911). Wikisource.",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gare-fowl"
      },
      {
        "category": "literary",
        "title": "Lucretius: when the very birds fell sick and died",
        "excerpt": "And though corpse on corpse lay piled\nUnburied on ground, the race of birds and beasts\nWould or spring back, scurrying to escape\nThe virulent stench, or, if they'd tasted there,\nWould languish in approaching death. But yet\nHardly at all during those many suns\nAppeared a fowl, nor from the woods went forth\nThe sullen generations of wild beasts--\nThey languished with disease and died and died.",
        "source": "Lucretius, De Rerum Natura (On the Nature of Things), Book VI — the Plague of Athens, trans. William Ellery Leonard. Project Gutenberg.",
        "href": "https://www.gutenberg.org/ebooks/785"
      },
      {
        "category": "literary",
        "title": "The slain seabird and the crew struck dead",
        "excerpt": "“God save thee, ancient Mariner!\nFrom the fiends, that plague thee thus!--\nWhy look'st thou so?”--With my cross-bow\nI shot the ALBATROSS.\n\n. . .\n\nFour times fifty living men,\n(And I heard nor sigh nor groan)\nWith heavy thump, a lifeless lump,\nThey dropped down one by one.",
        "source": "Samuel Taylor Coleridge, “The Rime of the Ancient Mariner” (1798). Project Gutenberg.",
        "href": "https://www.gutenberg.org/ebooks/151"
      },
      {
        "category": "artistic",
        "title": "Audubon's crested tern on the shore",
        "excerpt": "Audubon's aquatint portrays a Cayenne Tern — a crested tern of the same genus (Thalasseus) as the greater crested terns now dying on South Australian beaches — alert and immaculate on the tideline, the living bird at the height of its spring plumage. Set against a grey sea and lowering sky, the image is a naturalist's celebration of a species in full vigour, which lends a quiet elegy to news of the same kind of bird washing up dead by the dozen.",
        "source": "Robert Havell after John James Audubon, Cayenne Tern (Sterna cayana), Plate 273 from The Birds of America (1835). National Gallery of Art, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Robert_Havell_after_John_James_Audubon,_Cayenne_Tern,_1835,_NGA_32414.jpg",
        "image": {
          "src": "/covers/australia-first-h5n1-seabird-die-off--a4.png",
          "alt": "A hand-colored aquatint of a crested (Cayenne) tern standing on a sandy shore, with a black cap, white face and underparts, pale grey back and long forked tail, and a bright red bill; a pink land crab crouches beside it beneath a grey sea and cloudy sky.",
          "credit": "Robert Havell after John James Audubon, Cayenne Tern, Plate 273 from The Birds of America (1835), National Gallery of Art. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "A still life of dead birds",
        "excerpt": "Dupuis heaps the spoils of the hunt on a cold stone ledge: a great pheasant with its wing flung open, ducks and small songbirds tumbled limp and lifeless, their eyes shut, beside bright oranges and a cut lemon. It is a memento mori in feathers — the beauty of plumage turned to inert weight — that answers grimly to a beach strewn with dead terns.",
        "source": "Pierre Dupuis (1610–1682), Still Life with Dead Birds (1666), oil on canvas. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:%27Still_Life_with_Dead_Birds%27_by_Pierre_Dupuis,_1666.JPG",
        "image": {
          "src": "/covers/australia-first-h5n1-seabird-die-off--a5.png",
          "alt": "An oil still life of several dead game birds — a large pheasant with one wing splayed, ducks and small songbirds — heaped limp on a stone ledge beside oranges and a cut lemon, against a dark background.",
          "credit": "Pierre Dupuis, Still Life with Dead Birds (1666), private collection. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "iran-executes-two-alleged-israel-spies",
    "headline": "Iran executes two men convicted of passing coordinates of military sites to Israel's Mossad, as executions mount during the war with Israel and the US",
    "overview": "Iran hanged Omid Behzad and Pouria Safvat after convicting them of espionage and collaboration with Israel, its judiciary said, accusing them of transmitting the coordinates of sensitive military and security sites to Mossad. Executions on spying charges have accelerated since the war with Israel and the United States began in February. The judiciary did not say when the two were arrested or tried.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxObVpPMnE4MnRQckNZZXg0SU9TYTI4WG5qdmc2aUhydFU0LXlJS04taFVoOU5idUFqb3ZtSFZsVUlpYUhackVhN2lGQUlYQ3hqekNxYkkxd1E1aDU2TGVZTEJQc3V5U1EwVzJLRDdiQmdITzZFYlI4TWZzOTBtT2c5bTREN2tvVVZWUk1hb1EwSlVmRHpSaVJvTDdINzFCaTFHRFI0?oc=5"
      },
      {
        "name": "The Times of Israel",
        "href": "https://www.timesofisrael.com/liveblog_entry/iran-executes-two-accused-of-spying-for-israel-during-fighting/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/iran-executes-two-alleged-israel-spies.png",
      "alt": "The building of Iran's judiciary in Tehran.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Catilinarian conspirators, betrayed by intercepted letters, strangled in the Tullianum",
        "excerpt": "There is a place in the prison, which is called the Tullian dungeon, and which, after a slight ascent to the left, is sunk about twelve feet under ground. Walls secure it on every side, and over it is a vaulted roof connected with stone arches; but its appearance is disgusting and horrible, by reason of the filth, darkness, and stench. When Lentulus had been let down into this place, certain men, to whom orders had been given, strangled him with a cord. ... On Cethegus, Statilius, Gabinius, and Cæparius, punishment was inflicted in a similar manner.",
        "source": "Sallust, The Conspiracy of Catiline, chapter 55, trans. John Selby Watson (1899). Perseus Digital Library, Tufts University. (The conspirators were undone when their letters to the Allobrogian envoys of a foreign power were intercepted at the Mulvian Bridge.)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0124%3Achapter%3D55"
      },
      {
        "category": "historical",
        "title": "The Rosenbergs, executed for passing atomic secrets to a foreign power",
        "excerpt": "Julius and Ethel Rosenberg were convicted of conspiracy to commit espionage for allegedly transmitting United States atomic-weapon secrets to the Soviet Union, and were sent to the electric chair at Sing Sing prison on June 19, 1953, despite worldwide clemency appeals. As in Iran's spy trials, the charge was that ordinary citizens had handed a hostile power the most sensitive coordinates of national security, here the workings of the atomic bomb. The National Archives holds the trial evidence and the once-secret grand jury transcripts that document the case.",
        "source": "The Rosenberg Grand Jury Records and trial evidence, Ethel and Julius Rosenberg espionage case (1951–1953). U.S. National Archives (Records held at the National Archives at New York).",
        "href": "https://www.archives.gov/research/court-records/rosenberg-jury"
      },
      {
        "category": "literary",
        "title": "Thirty pieces of silver: the betrayer's wages and end",
        "excerpt": "Then one of the twelve, called Judas Iscariot, went unto the chief priests, And said unto them, What will ye give me, and I will deliver him unto you? And they covenanted with him for thirty pieces of silver. And from that time he sought opportunity to betray him. ... Then Judas, which had betrayed him, when he saw that he was condemned, repented himself, and brought again the thirty pieces of silver to the chief priests and elders, Saying, I have sinned in that I have betrayed the innocent blood. And they said, What is that to us? see thou to that. And he cast down the pieces of silver in the temple, and departed, and went and hanged himself.",
        "source": "The Gospel According to Saint Matthew 26:14–16, 27:3–5, King James Version (1611). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "literary",
        "title": "\"Yet each man kills the thing he loves\": the condemned awaiting the rope",
        "excerpt": "The man had killed the thing he loved\nAnd so he had to die.\n\nYet each man kills the thing he loves\nBy each let this be heard,\nSome do it with a bitter look,\nSome with a flattering word,\nThe coward does it with a kiss,\nThe brave man with a sword!\n\nSome kill their love when they are young,\nAnd some when they are old;\nSome strangle with the hands of Lust,\nSome with the hands of Gold:\nThe kindest use a knife, because\nThe dead so soon grow cold.\n\nSome love too little, some too long,\nSome sell, and others buy;\nSome do the deed with many tears,\nAnd some without a sigh:\nFor each man kills the thing he loves,\nYet each man does not die.",
        "source": "Oscar Wilde, The Ballad of Reading Gaol (1898). Project Gutenberg, ebook #301.",
        "href": "https://www.gutenberg.org/files/301/301-h/301-h.htm"
      },
      {
        "category": "artistic",
        "title": "Delaroche, The Execution of Lady Jane Grey",
        "excerpt": "Delaroche's vast 1833 canvas freezes the instant before the axe falls: the blindfolded seventeen-year-old queen, condemned for treason after only nine days on the throne, gropes for the block in luminous white satin while an attendant guides her hands and the executioner waits with his axe. By turning a state execution into an intimate, almost unbearable human moment, the painting makes the political victim into a trembling body, much as accounts of prisoners led to the gallows compress a whole apparatus of power into one condemned figure.",
        "source": "Paul Delaroche, The Execution of Lady Jane Grey (1833), National Gallery, London. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:PAUL_DELAROCHE_-_Ejecuci%C3%B3n_de_Lady_Jane_Grey_(National_Gallery_de_Londres,_1834).jpg",
        "image": {
          "src": "/covers/iran-executes-two-alleged-israel-spies--a4.png",
          "alt": "A blindfolded young woman in a white gown kneels and reaches for a wooden execution block as a man gently steadies her hands and an axeman stands by in a dim stone chamber.",
          "credit": "Paul Delaroche, The Execution of Lady Jane Grey (1833), National Gallery, London. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Callot, The Hanging, from Les Grandes Misères de la guerre",
        "excerpt": "In this 1633 etching, the eleventh plate of Jacques Callot's series on the horrors of the Thirty Years' War, a great tree becomes a mass gallows: dozens of condemned men dangle from its branches while soldiers, a priest, and dice-throwing onlookers cluster below. The tiny, teeming figures make wartime execution look industrial and routine, punishment meted out by armies far from any courtroom, an image that resonates with a surge of hangings carried out amid a nation at war.",
        "source": "Jacques Callot, \"La pendaison\" (The Hanging), plate 11 of Les Misères et les malheurs de la guerre (1633). Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Les_mis%C3%A8res_et_les_malheurs_de_la_guerre_-_11_-_La_pendaison.png",
        "image": {
          "src": "/covers/iran-executes-two-alleged-israel-spies--a5.png",
          "alt": "A crowded 17th-century etching of a large tree hung with many bodies, soldiers with pikes and muskets gathered below, a ladder against the trunk and a priest attending a man about to be hanged.",
          "credit": "Jacques Callot, La pendaison (The Hanging), plate 11 of Les Grandes Misères de la guerre (1633). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "shell-sells-onshore-renewables-totalenergies",
    "headline": "Shell agrees to sell its European onshore wind, solar and battery business, a roughly four-gigawatt portfolio, to France's TotalEnergies as it retreats from renewables",
    "overview": "Shell agreed to sell its European onshore renewables arm, with about four gigawatts of wind, solar and battery projects in operation and development across the UK, Italy, the Netherlands and Spain, to TotalEnergies. The deal, expected to close by year end pending regulatory approval, deepens Shell's pullback from low-carbon energy under chief executive Wael Sawan. TotalEnergies is expanding its renewables footprint even as European majors diverge on green strategy.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQdHBuR2ZmM29uWDZCSnBpbXl0RjlCVUgxRFkwV2VRZUhVQS01N1ZRUW1hdVlOdW9VTWZsQ0ZuTjItYUhmT3E0TFVBbFk4MElUOWg0TUxlOHBLNjAxRlRzMVFXZWl5bDJVLUdaX0ZMVTdEUEZaUTk5TF91MUcxNHFQZW8xQ1NhdllMSHZodkV2U2ZrOHcwQXJ6dGFWT3VZMGxwblM5M3FXb212NVdRRDJVM0VmTElYakwtOG82MQ?oc=5"
      },
      {
        "name": "AOL",
        "href": "https://www.aol.co.uk/articles/shell-sell-european-onshore-renewables-083158000.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/shell-sells-onshore-renewables-totalenergies.png",
      "alt": "Onshore wind turbines and solar panels in a European countryside.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Low Countries Call the Air to Their Aid",
        "excerpt": "To drain the lakes they called the air to their aid. The lakes and marshes were surrounded with dykes, the dykes with canals and an army of windmills; these, putting the suction-pumps in motion, poured the waters into the canals, which conducted them into the rivers and to the sea. Thus vast areas of ground which were buried under water saw the light, and were transformed, as if by enchantment, into fertile plains covered with villages and traversed by roads and canals.",
        "source": "Edmondo De Amicis, Holland (Vol. 1 of 2), trans. Caroline Tilton (1880); Project Gutenberg eBook #27799.",
        "href": "https://www.gutenberg.org/files/27799/27799-h/27799-h.htm"
      },
      {
        "category": "historical",
        "title": "Churchill Bets the Fleet on Oil",
        "excerpt": "On no one quality, on no one process, on no one country, on no one company, and no one route, and on no one oil field must we be dependent. Safety and certainty in oil lie in variety, and in variety alone.",
        "source": "Winston Churchill, First Lord of the Admiralty, speech on the Navy Estimates, House of Commons, 17 July 1913 (HC Deb 17 July 1913, vol 55, cc1465-584); UK Parliament Historic Hansard.",
        "href": "https://api.parliament.uk/historic-hansard/commons/1913/jul/17/shipbuilding-repairs-maintenance-etc"
      },
      {
        "category": "literary",
        "title": "Tilting at Windmills",
        "excerpt": "At this point they came in sight of thirty or forty windmills that there are on that plain, and as soon as Don Quixote saw them he said to his squire, “Fortune is arranging matters for us better than we could have shaped our desires ourselves, for look there, friend Sancho Panza, where thirty or more monstrous giants present themselves, all of whom I mean to engage in battle and slay…” “What giants?” said Sancho Panza. … “Look, your worship,” said Sancho; “what we see there are not giants but windmills, and what seem to be their arms are the sails that turned by the wind make the millstone go.”",
        "source": "Miguel de Cervantes, Don Quixote, Part I, Chapter VIII, trans. John Ormsby (1885); Project Gutenberg eBook #996.",
        "href": "https://www.gutenberg.org/files/996/996-h/996-h.htm"
      },
      {
        "category": "literary",
        "title": "Ode to the West Wind",
        "excerpt": "Drive my dead thoughts over the universe\nLike withered leaves to quicken a new birth!\nAnd, by the incantation of this verse,\nScatter, as from an unextinguished hearth\nAshes and sparks, my words among mankind!\nBe through my lips to unawakened earth\nThe trumpet of a prophecy! O, Wind,\nIf Winter comes, can Spring be far behind?",
        "source": "Percy Bysshe Shelley, “Ode to the West Wind” (1820), in The Complete Poetical Works of Percy Bysshe Shelley, ed. Thomas Hutchinson (1914); Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ode_to_the_West_Wind"
      },
      {
        "category": "artistic",
        "title": "The Windmill at Wijk bij Duurstede",
        "excerpt": "Ruisdael sets a single great tower windmill against a vast, storm-heavy Dutch sky, its sails motionless yet its bulk towering over the church and castle it dwarfs. Painted at the height of the Dutch Golden Age, the picture makes the wind machine a monument of national ingenuity and civic pride, a whole country's economy built on harnessing the moving air. It stands as the emblem of an era that embraced wind as the engine of its prosperity, the mirror image of a modern retreat from it.",
        "source": "Jacob van Ruisdael, The Windmill at Wijk bij Duurstede, c. 1668–1670, oil on canvas, Rijksmuseum, Amsterdam (SK-C-211).",
        "href": "https://commons.wikimedia.org/wiki/File:The_Windmill_at_Wijk_bij_Duurstede_1670_Ruisdael.jpg",
        "image": {
          "src": "/covers/shell-sells-onshore-renewables-totalenergies--a4.png",
          "alt": "A massive stone tower windmill on a riverbank dominates a wide, cloud-filled sky, its dark sails still, with a church, houses, and small figures on the bank beside the grey water of the River Lek below.",
          "credit": "Jacob van Ruisdael, The Windmill at Wijk bij Duurstede (c. 1668–1670), Rijksmuseum, Amsterdam. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Impression, Sunrise",
        "excerpt": "Monet's hazy dawn over the harbor of Le Havre reduces the sun to a single burning orange disc, its light rippling across grey-blue water among ghostly ships and cranes. The 1872 canvas gave Impressionism its name and turned the rising sun into a symbol of a new dawn in art. That the French master's most famous sunrise now doubles as an emblem of solar energy is fitting, as France's TotalEnergies is the buyer betting on the light Shell is walking away from.",
        "source": "Claude Monet, Impression, Sunrise (Impression, soleil levant), 1872, oil on canvas, Musée Marmottan Monet, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Monet_-_Impression,_Sunrise.jpg",
        "image": {
          "src": "/covers/shell-sells-onshore-renewables-totalenergies--a5.png",
          "alt": "A hazy blue-grey harbor at dawn with a small orange sun low on the horizon casting a rippling orange reflection on the water, dark rowboats in the foreground and faint masts and cranes behind.",
          "credit": "Claude Monet, Impression, Sunrise (1872), Musée Marmottan Monet, Paris. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "astrazeneca-shares-fall-bristol-myers-talks",
    "headline": "AstraZeneca shares fall about 7%, the biggest drop on the FTSE 100, after reports it held early talks with Bristol Myers Squibb on a possible merger worth around $400 billion",
    "overview": "AstraZeneca's London-listed shares slid roughly 7%, the steepest fall on the FTSE 100, after the Financial Times reported the drugmaker had held preliminary talks with US rival Bristol Myers Squibb about a tie-up. A person familiar with the matter told Reuters the two had held discussions; neither company confirmed the report. A combination would rank among the largest pharmaceutical mergers ever, at a valuation near $400 billion, but investors questioned the strategic rationale.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxPMzhDZ2Y1UkxQTnZCTjg1NHdXUGZBb2Q3d3ppcnZEbWFEY1JJRWZLU0RHd1N3eDRDOVRIUXMycjdyWDNzR2pDY1ZPYXg0cFlUUWNZRWJadkt1Sld3VzZCVjN6YW1zaE1aTUt0U2x6S3p2bTRQd3dMMXc0cDhUcjJERlhyRF80YTF5My1qRmVGSU5kM3Z6bTdUcTJlS2R4TjkwM3RvdXk4eXdkYVhILWdqTS1GZlZtZ0dTZHZUMVZ5Mkk4QnI1U0lyQm1acVBfaHc?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/08/03/astrazeneca-bristol-myers-squibb-merger-talks.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/astrazeneca-shares-fall-bristol-myers-talks.png",
      "alt": "The AstraZeneca headquarters, the Discovery Centre, in Cambridge, England.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rome's credit crash of A.D. 33",
        "excerpt": "Hence followed a scarcity of money, a great shock being given to all credit, the current coin too, in consequence of the conviction of so many persons and the sale of their property, being locked up in the imperial treasury or the public exchequer. To meet this, the Senate had directed that every creditor should have two-thirds of his capital secured on estates in Italy. Creditors however were suing for payment in full, and it was not respectable for persons when sued to break faith. So, at first, there were clamorous meetings and importunate entreaties; then noisy applications to the prætor's court. And the very device intended as a remedy, the sale and purchase of estates, proved the contrary, as the usurers had hoarded up all their money for buying land. The facilities for selling were followed by a fall of prices, and the deeper a man was in debt, the more reluctantly did he part with his property, and many were utterly ruined.",
        "source": "Tacitus, The Annals, Book VI, ch. 17, trans. Alfred John Church & William Jackson Brodribb; Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book%3D6:chapter%3D17"
      },
      {
        "category": "historical",
        "title": "The South Sea Bubble of 1720",
        "excerpt": "In the mean time, innumerable joint-stock companies started up every where. They soon received the name of Bubbles, the most appropriate that imagination could devise. The populace are often most happy in the nicknames they employ. None could be more apt than that of Bubbles. Some of them lasted for a week or a fortnight, and were no more heard of, while others could not even live out that short span of existence. … There were nearly a hundred different projects, each more extravagant and deceptive than the other, To use the words of the Political State, they were “set on foot and promoted by crafty knaves, then pursued by multitudes of covetous fools, and at last appeared to be, in effect, what their vulgar appellation denoted them to be—bubbles and mere cheats.”",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), vol. I, \"The South-Sea Bubble\"; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm"
      },
      {
        "category": "literary",
        "title": "\"If we can float the shares, the money'll come in\"",
        "excerpt": "\"Where's the money to come from?\"\n\"Money to come from, sir? Where do you suppose the money comes from in all these undertakings? If we can float the shares, the money'll come in quick enough. We hold three million dollars of the stock ourselves.\"\n\"Six hundred thousand pounds!\" said Montague.\n\"We take them at par, of course,—and as we sell we shall pay for them. But of course we shall only sell at a premium. If we can run them up even to 110, there would be three hundred thousand dollars.\"",
        "source": "Anthony Trollope, The Way We Live Now (1875), ch. IX, \"The Great Railway to Vera Cruz\"; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
      },
      {
        "category": "literary",
        "title": "The flood-tide roar of speculation",
        "excerpt": "The steps and peristyle of the Bourse were quite black with swarming frock-coats; and from among the coulissiers, already installed under the clock and hard at work, there arose the clamour of bull and bear, the flood-tide roar of speculation dominating all the rumbling hubbub of the city. Passers-by turned their heads, curious and fearful as to what might be going on there—all those mysterious financial operations which few French brains can penetrate, all that sudden ruin and fortune brought about—how, none could understand—amid gesticulation and savage cries.",
        "source": "Émile Zola, Money (L'Argent) (1891), trans. Ernest A. Vizetelly; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm"
      },
      {
        "category": "artistic",
        "title": "Hogarth's \"The South Sea Scheme\"",
        "excerpt": "Hogarth's earliest satirical print skewers the mania around the South Sea Company: at its centre a giant merry-go-round spins investors of every rank while a demon hacks the body of Fortune into pieces and tosses them to the crowd. Devils, whores and a broken figure of Honesty on the wheel turn a stock craze into a moral carnival—an image of speculation running far ahead of any underlying worth, much like a $400bn deal investors struggle to justify.",
        "source": "William Hogarth, Emblematical Print on the South Sea Scheme (\"The South Sea Scheme\"), engraving, 1721. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/astrazeneca-shares-fall-bristol-myers-talks--a4.png",
          "alt": "A crowded 18th-century square where a large merry-go-round of speculators spins, a demon carves up a female figure of Fortune, and a man is broken on a wheel labelled Honesty.",
          "credit": "William Hogarth, Emblematical Print on the South Sea Scheme (1721). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Brueghel's \"Satire on Tulip Mania\"",
        "excerpt": "Jan Brueghel the Younger paints the Dutch tulip frenzy as a troop of monkeys in merchants' dress: they weigh bulbs, count coins, toast their paper profits, and haul contracts about, while one relieves himself on the discarded flowers and another is carried off to the grave once the market collapses. The apes' solemn dealing over a worthless commodity mocks investors who chase a grand valuation until the rationale evaporates.",
        "source": "Jan Brueghel the Younger, Satire on Tulip Mania, oil on panel, c. 1640, Frans Hals Museum, Haarlem. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/astrazeneca-shares-fall-bristol-myers-talks--a5.png",
          "alt": "Monkeys dressed as wealthy Dutch merchants trade tulip bulbs, weigh coins, and feast, while one urinates on flowers and another mourns at a graveside as the market crashes.",
          "credit": "Jan Brueghel the Younger, Satire on Tulip Mania (c. 1640), Frans Hals Museum. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "massive-attack-singapore-ban-palestine",
    "headline": "British band Massive Attack say Singapore has barred them from returning after they displayed a Palestinian flag and led 'free Palestine' chants at a 29 July concert",
    "overview": "The Bristol trip-hop duo Massive Attack said Singaporean authorities have banned them from re-entering the country after they held up a Palestinian flag and led chants of 'free Palestine' during a 29 July show. The band said members were detained, questioned separately and had passports temporarily confiscated, and issued official warnings under laws on foreign emblems and public order. Massive Attack said they were 'surprised and disappointed' by the treatment.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cr59qe86yj4o"
      },
      {
        "name": "Malay Mail",
        "href": "https://www.malaymail.com/news/showbiz/2026/08/03/as-we-were-saying-free-palestine-massive-attack-hits-out-after-singapore-concert-probe/230028"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/massive-attack-singapore-ban-palestine.png",
      "alt": "A concert stage lit in blue with a crowd silhouetted in front, illustrating a live music performance.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Athens fines the poet who staged their grief",
        "excerpt": "The Athenians, on the other hand, showed themselves beyond measure afflicted at the fall of Miletus, in many ways expressing their sympathy, and especially by their treatment of Phrynichus. For when this poet brought out upon the stage his drama of the Capture of Miletus, the whole theatre burst into tears; and the people sentenced him to pay a fine of a thousand drachms, for recalling to them their own misfortunes. They likewise made a law that no one should ever again exhibit that piece.",
        "source": "Herodotus, The History of Herodotus, Book VI, ch. 21, trans. George Rawlinson (1858–60), Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_6"
      },
      {
        "category": "historical",
        "title": "Paul Robeson, silenced by a seized passport",
        "excerpt": "In 1950 the U.S. State Department revoked the passport of the celebrated bass-baritone and actor Paul Robeson, freezing his international career because of his outspoken support for anti-colonial and civil-rights causes; officials offered to return it only if he pledged to make no political speeches abroad. For eight years he was effectively confined within the country, his concerts cancelled and bookings withdrawn, until the Supreme Court restored his right to travel in 1958. Like Massive Attack barred from a stage for their politics, Robeson was punished not for his art but for the dissent he voiced through it.",
        "source": "\"The Case of Paul Robeson's Passport,\" Provisional Committee to Restore Paul Robeson's Passport, ca. 1951, Paul Robeson Collection, Schomburg Center for Research in Black Culture, The New York Public Library.",
        "href": "https://www.nypl.org/events/exhibitions/galleries/selected-transcripts/item/17588"
      },
      {
        "category": "literary",
        "title": "Antigone defies the ruler's decree",
        "excerpt": "Yes; for it was not Zeus that had published me that edict; not such are the laws set among men by the Justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven. For their life is not of to-day or yesterday, but from all time, and no man knows when they were first put forth.\n\nNot through dread of any human pride could I answer to the gods for breaking these. Die I must,—I knew that well (how should I not?)—even without thy edicts.",
        "source": "Sophocles, Antigone, in The Tragedies of Sophocles, trans. Richard C. Jebb (1917), Wikisource.",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Sophocles_(Jebb_1917)/Antigone"
      },
      {
        "category": "literary",
        "title": "Shelley's answer to a massacre: 'Ye are many'",
        "excerpt": "'Rise like Lions after slumber\nIn unvanquishable number—\nShake your chains to earth like dew\nWhich in sleep had fallen on you—\nYe are many—they are few.'",
        "source": "Percy Bysshe Shelley, \"The Mask of Anarchy\" (written 1819, publ. 1832), in The Complete Poetical Works of Percy Bysshe Shelley, ed. Thomas Hutchinson (1914), Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/The_Mask_of_Anarchy"
      },
      {
        "category": "artistic",
        "title": "Daumier's massacre print, seized and destroyed",
        "excerpt": "Daumier's lithograph depicts the aftermath of a state atrocity: in April 1834 French troops hunting a sniper slaughtered the unarmed residents of a Paris apartment house, and the artist rendered a workman sprawled dead across the crushed body of his own child. Though the censors had first passed it, King Louis-Philippe ordered the printing stone and every unsold impression seized and destroyed. The image endures as an artist's indictment of power, answered by the state's attempt to erase the work itself.",
        "source": "Honoré Daumier, Rue Transnonain, le 15 Avril 1834 (1834), lithograph, plate 24 of L'Association mensuelle. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Rue_Transnonain,_April_15,_1834_-_WGA5966.jpg",
        "image": {
          "src": "/covers/massive-attack-singapore-ban-palestine--a4.png",
          "alt": "A dim bedroom where a slain workingman in his nightshirt lies sprawled on his back across the crushed body of a child, amid overturned furniture and shadow.",
          "credit": "Honoré Daumier, Rue Transnonain, le 15 Avril 1834 (1834), lithograph. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Verdi's chorus of exiles longing for a lost homeland",
        "excerpt": "Va, pensiero, sull'ali dorate;\nva, ti posa sui clivi, sui colli,\nove olezzano tepide e molli\nl'aure dolci del suolo natal!\n\nDel Giordano le rive saluta,\ndi Sionne le torri atterrate.\nO, mia patria, sì bella e perduta!\nO, membranza, sì cara e fatal!",
        "source": "Giuseppe Verdi (music) and Temistocle Solera (libretto), \"Va, pensiero\" (Chorus of the Hebrew Slaves), from Nabucco (1842); full score at IMSLP. Portrait photograph by Giacomo Brogi.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/massive-attack-singapore-ban-palestine--a5.png",
          "alt": "Sepia photographic portrait of an elderly bearded Giuseppe Verdi in a dark coat and top hat, seen in three-quarter view against a plain background.",
          "credit": "Giacomo Brogi, photographic portrait of Giuseppe Verdi (before 1881). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "nepal-mourns-nirmal-purja",
    "headline": "Nepal mourns record-setting mountaineer Nirmal Purja, who died at 43 in an avalanche on Pakistan's Broad Peak, with tributes gathering at his former school",
    "overview": "Tributes poured in across Nepal for Nirmal 'Nims' Purja, the celebrated mountaineer who was killed at 43 in an avalanche on Pakistan's 8,047-metre Broad Peak along with several fellow climbers. The former British Army Gurkha won global fame for climbing all 14 of the world's 8,000-metre peaks in just over six months in 2019 and for the Netflix film '14 Peaks: Nothing Is Impossible.' Mourners gathered at his old school, where staff and pupils remembered a national hero.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c07rvy4e7mno"
      },
      {
        "name": "Dawn",
        "href": "https://www.dawn.com/news/2020165"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/nepal-mourns-nirmal-purja.png",
      "alt": "The snow-covered summit of Broad Peak in Pakistan's Karakoram range.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Petrarch climbs Mont Ventoux, 1336",
        "excerpt": "To-day I made the ascent of the highest mountain in this region, which is not improperly called Ventosum. My only motive was the wish to see what so great an elevation had to offer. [...] At first, owing to the unaccustomed quality of the air and the effect of the great sweep of view spread out before me, I stood like one dazed. I beheld the clouds under our feet, and what I had read of Athos and Olympus seemed less incredible as I myself witnessed the same things from a mountain of less fame.",
        "source": "Petrarch, letter to Dionisio da Borgo San Sepolcro, \"The Ascent of Mount Ventoux\" (1336), trans. James Harvey Robinson, in Petrarch, the First Modern Scholar and Man of Letters (New York: G. P. Putnam, 1898). Project Gutenberg ebook 48776.",
        "href": "https://www.gutenberg.org/files/48776/48776-h/48776-h.htm"
      },
      {
        "category": "historical",
        "title": "Whymper's Matterhorn: triumph and the fatal descent, 1865",
        "excerpt": "There have been joys too great to be described in words, and there have been griefs upon which I have not dared to dwell; and with these in mind I say, Climb if you will, but remember that courage and strength are nought without prudence, and that a momentary negligence may destroy the happiness of a lifetime. Do nothing in haste; look well to each step; and from the beginning think what may be the end.",
        "source": "Edward Whymper, The Ascent of the Matterhorn (London: John Murray, 1880), closing reflection on the 1865 first ascent, during which four of his companions fell to their deaths. Project Gutenberg ebook 38044.",
        "href": "https://www.gutenberg.org/files/38044/38044-h/38044-h.htm"
      },
      {
        "category": "literary",
        "title": "Shelley, \"Mont Blanc\"",
        "excerpt": "The everlasting universe of things\nFlows through the mind, and rolls its rapid waves,\nNow dark—now glittering—now reflecting gloom—\nNow lending splendour, where from secret springs\nThe source of human thought its tribute brings\nOf waters,—\n[...]\nThe secret Strength of things\nWhich governs thought, and to the infinite dome\nOf Heaven is as a law, inhabits thee!\nAnd what were thou, and earth, and stars, and sea,\nIf to the human mind's imaginings\nSilence and solitude were vacancy?",
        "source": "Percy Bysshe Shelley, \"Mont Blanc: Lines Written in the Vale of Chamouni\" (composed 1816), in The Complete Poetical Works of Percy Bysshe Shelley, ed. Thomas Hutchinson (Oxford, 1914). Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Mont_Blanc"
      },
      {
        "category": "literary",
        "title": "Coleridge, \"Hymn before Sun-rise, in the Vale of Chamouny\"",
        "excerpt": "Hast thou a charm to stay the Morning-Star\nIn his steep course? So long he seems to pause\nOn thy bald awful head, O sovran Blanc!\nThe Arve and Arveiron at thy base\nRave ceaselessly; but thou, most awful Form!\nRisest from forth thy silent Sea of Pines,\nHow silently! Around thee and above\nDeep is the air and dark, substantial, black.\nAn ebon mass: methinks thou piercest it,\nAs with a wedge! But when I look again,\nIt is thine own calm home, thy crystal shrine,\nThy habitation from eternity!",
        "source": "Samuel Taylor Coleridge, \"Hymn, before Sun-rise, in the Vale of Chamouny\" (1802), in Sibylline Leaves (London, 1817). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Sibylline_Leaves_(Coleridge)/Hymn,_before_Sun-rise,_in_the_Vale_of_Chamouny"
      },
      {
        "category": "artistic",
        "title": "Friedrich, \"Wanderer above the Sea of Fog\"",
        "excerpt": "Caspar David Friedrich's lone figure stands on a rocky summit, back turned to us, gazing over a churning sea of mist from which distant peaks emerge—the very image of the human will set against the mountain sublime. It captures both the solitary heroism of the high climber and his smallness before immensity, the emotional register in which a nation mourns a mountaineer who reached the world's summits and was claimed by them.",
        "source": "Caspar David Friedrich, Wanderer above the Sea of Fog (Der Wanderer über dem Nebelmeer), c. 1818, oil on canvas, Hamburger Kunsthalle.",
        "href": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
        "image": {
          "src": "/covers/nepal-mourns-nirmal-purja--a4.png",
          "alt": "A man in a dark green coat stands on a dark crag with his back to the viewer, leaning on a cane, looking out over a vast sea of fog broken by jagged mountain peaks and receding ridges.",
          "credit": "Caspar David Friedrich, Wanderer above the Sea of Fog (c. 1818), Hamburger Kunsthalle. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Hokusai, \"Fine Wind, Clear Morning (Red Fuji)\"",
        "excerpt": "In this woodblock print from Thirty-six Views of Mount Fuji, Hokusai reduces the sacred peak to a single triumphant red-brown pyramid, streaked with snow and crowned by streaming clouds against a clear morning sky. Where Friedrich frames the mountain as an object of Western awe, Hokusai renders it as a revered, near-divine presence—an eastern counterpart to the veneration Nepal holds for its own great peaks and for the climber who conquered them.",
        "source": "Katsushika Hokusai, Fine Wind, Clear Morning (Gaifū kaisei), also known as Red Fuji, from Thirty-six Views of Mount Fuji, color woodblock print, c. 1830–1832.",
        "href": "https://commons.wikimedia.org/wiki/File:Red_Fuji_southern_wind_clear_morning.jpg",
        "image": {
          "src": "/covers/nepal-mourns-nirmal-purja--a5.png",
          "alt": "A woodblock print of Mount Fuji as a broad red-brown cone streaked with white snow at its summit, set against a blue sky with rows of small white clouds and a dark green forested base.",
          "credit": "Katsushika Hokusai, Fine Wind, Clear Morning (Red Fuji), from Thirty-six Views of Mount Fuji (c. 1830–1832). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "uk-plug-in-balcony-solar-panels",
    "headline": "The UK clears the way for plug-in balcony solar panels, letting households plug low-cost panels into a wall socket from 27 August to cut energy bills",
    "overview": "The UK government said changes to plug and electrical-safety rules will legalize plug-in solar panels from 27 August, allowing flats and rented homes to fit panels on balconies, roofs or outdoor spaces without professional installation. The devices, already common across Europe, connect straight to a mains socket and are expected to sell for around £400, potentially saving up to £110 a year. Ministers cast the move as part of a push to cut reliance on volatile fossil-fuel markets.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/08/03/plug-in-solar-panels-available-uk-end-summer/"
      },
      {
        "name": "Ideal Home",
        "href": "https://www.idealhome.co.uk/house-manual/energy-saving/when-will-plug-in-solar-panels-be-available-to-buy"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/uk-plug-in-balcony-solar-panels.png",
      "alt": "Plug-in solar panels mounted on an apartment balcony railing.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Socrates designs the solar house",
        "excerpt": "Now in houses with a south aspect, the sun's rays penetrate into the porticoes in winter, but in summer the path of the sun is right over our heads and above the roof, so that there is shade. If, then, this is the best arrangement, we should build the south side loftier to get the winter sun and the north side lower to keep out the cold winds.",
        "source": "Xenophon, Memorabilia, Book 3, Chapter 8 (Socrates on the ideal house), trans. E. C. Marchant, Loeb Classical Library, 1923. Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3atext%3a1999.01.0208%3abook%3d3%3achapter%3d8"
      },
      {
        "category": "historical",
        "title": "Bell Labs makes sunlight practical, 1954",
        "excerpt": "On 25 April 1954 Daryl Chapin, Calvin Fuller and Gerald Pearson unveiled the first practical silicon photovoltaic cell at Bell Telephone Laboratories in Murray Hill, New Jersey, converting about six percent of incoming sunlight straight into electricity. Their small blue wafers were the ancestors of every rooftop and balcony panel that follows, turning the ancient dream of drinking power from the sun into a repeatable piece of hardware. It is the pivot from centuries of solar curiosities to the cheap, mass-produced module a UK renter can now clip to a railing and plug into the wall.",
        "source": "\"Milestones: First Practical Photovoltaic Solar Cell, 1954,\" IEEE Engineering and Technology History Wiki (ETHW).",
        "href": "https://ethw.org/Milestones:First_Practical_Photovoltaic_Solar_Cell"
      },
      {
        "category": "literary",
        "title": "The Great Hymn to the Aten",
        "excerpt": "The earth becometh light, thou shootest up in the horizon, shining in the Aten in the day, thou scatterest the darkness. Thou sendest out thine arrows (i.e., rays), the Two Lands make festival, [men] wake up, stand upon their feet, it is thou who raisest them up.",
        "source": "The Great Hymn to the Aten (Hymn of praise of Her-aakhuti), attributed to Akhenaten, trans. E. A. Wallis Budge, in Tutankhamen: Amenism, Atenism and Egyptian Monotheism, 1923. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Great_Hymn_to_Aten"
      },
      {
        "category": "literary",
        "title": "St Francis praises Brother Sun and Brother Fire",
        "excerpt": "Praise be to Thee, my Lord, with all Thy creatures,\nEspecially to my worshipful brother sun,\nThe which lights up the day, and through him dost Thou brightness give;\nAnd beautiful is he and radiant with splendor great;\nOf Thee, most High, signification gives.\n\nPraised be my Lord for brother fire,\nBy the which Thou lightest up the dark.\nAnd fair is he and gay and mighty and strong.",
        "source": "Francis of Assisi, \"The Canticle of the Sun\" (c. 1225), in The Writings of St. Francis of Assisi, trans. Paschal Robinson, 1906. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Writings_of_St._Francis_of_Assisi/The_Canticle_of_the_Sun"
      },
      {
        "category": "artistic",
        "title": "Turner, ‘Norham Castle, Sunrise’",
        "excerpt": "J.M.W. Turner dissolves a castle, a river and grazing cattle into pure light, the rising sun a blazing core that floods the whole canvas in luminous blue and gold. Solid forms melt into radiance until the sun’s energy is almost the only subject that remains. It is Romantic painting’s purest hymn to the power a plug-in panel now quietly gathers from a balcony rail.",
        "source": "J.M.W. Turner, Norham Castle, Sunrise (c. 1845), oil on canvas, Tate, London. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jmw_turner,_norham_castle,_alba,_1845_ca.jpg",
        "image": {
          "src": "/covers/uk-plug-in-balcony-solar-panels--a4.png",
          "alt": "A castle and river dissolve into luminous blue and gold as a blazing sun rises, in Turner’s near-abstract painting.",
          "credit": "J.M.W. Turner, Norham Castle, Sunrise (c. 1845), Tate. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Van Gogh, The Sower",
        "excerpt": "In this June 1888 canvas from Arles, Van Gogh sets a peasant scattering seed against an enormous lemon-yellow sun that fills the sky and gilds the violet furrows below. The sower's ancient labour and the giant disc behind him fuse human work with solar power, a hymn to sunlight as the engine of all growth. The image speaks to the promise behind plug-in solar: sowing small panels now to harvest the sun's free energy at home.",
        "source": "Vincent van Gogh, The Sower, c. 17-28 June 1888, Kroller-Muller Museum, Otterlo. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_Sower_-_c._17-28_June_1888.jpg",
        "image": {
          "src": "/covers/uk-plug-in-balcony-solar-panels--a5.png",
          "alt": "A farmer strides across a violet field scattering seed beneath a huge glowing yellow sun that dominates a golden sky.",
          "credit": "Vincent van Gogh, The Sower (1888), Kroller-Muller Museum, Otterlo. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "egypt-suez-earthquake-magnitude-5-6",
    "headline": "A magnitude 5.6 earthquake strikes near the northern end of the Suez Canal in Egypt, shaking Cairo, Alexandria and neighbouring countries but causing no serious damage",
    "overview": "An earthquake measured at magnitude 5.6 struck about 40 km north of Suez, near the northern mouth of the Suez Canal, shortly after 3 a.m. local time, Egypt's seismology institute said. Tremors were felt across Cairo, the Nile Delta, Alexandria and Port Said, and as far as Gaza, Jordan and Lebanon, followed by several aftershocks. Authorities reported one injury and no significant damage, and the Red Crescent activated its response plan.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNcjE3eW1QaE5nM2hJVXA3OEhrblV6RkJqNTZMWVVrWTZxcTFqRkh4QllhTEJVUWZ3emQ2ZjhCYm5fV1dJdkpBOHhFU21SZzluQlNXMlozaWxGMy1GNnRuamVvUW1xaFlVcTVxYlFtNzRBLWJDZzQ0UUIxUjhNRFhoWmhBUjhiZktWVzdVMmlLcmQwWmZmNzRxaE9Qdmk4T1V2RDl6ZmRn?oc=5"
      },
      {
        "name": "The National",
        "href": "https://www.thenationalnews.com/news/mena/2026/08/03/egypt-hit-by-56-magnitude-earthquake/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/egypt-suez-earthquake-magnitude-5-6.png",
      "alt": "Ships passing through the Suez Canal in Egypt.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides on the Sea That Fled and Returned",
        "excerpt": "About the same time that these earthquakes were so common, the sea at Orobiae, in Euboea, retiring from the then line of coast, returned in a huge wave and invaded a great part of the town, and retreated leaving some of it still under water; so that what was once land is now sea; such of the inhabitants perishing as could not run up to the higher ground in time. A similar inundation also occurred at Atalanta, the island off the Opuntian Locrian coast, carrying away part of the Athenian fort and wrecking one of two ships which were drawn up on the beach. The cause, in my opinion, of this phenomenon must be sought in the earthquake. At the point where its shock has been the most violent, the sea is driven back and, suddenly recoiling with redoubled force, causes the inundation. Without an earthquake I do not see how such an accident could happen.",
        "source": "Thucydides, History of the Peloponnesian War, Book III, ch. 89 (426 BC), trans. Richard Crawley. Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "historical",
        "title": "Darwin Feels the Solid Earth Turn to Liquid, 1835",
        "excerpt": "This day has been memorable in the annals of Valdivia, for the most severe earthquake experienced by the oldest inhabitant. I happened to be on shore, and was lying down in the wood to rest myself. It came on suddenly, and lasted two minutes, but the time appeared much longer. [...] A bad earthquake at once destroys our oldest associations: the earth, the very emblem of solidity, has moved beneath our feet like a thin crust over a fluid;—one second of time has created in the mind a strange idea of insecurity, which hours of reflection would not have produced.",
        "source": "Charles Darwin, Journal of Researches (The Voyage of the Beagle), ch. XVI, on the great Chilean earthquake of 20 February 1835 (1839; text of 1845 edition). Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/944/pg944.txt"
      },
      {
        "category": "literary",
        "title": "The Ruin of Lisbon in 'Candide'",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, Candide, ch. 5 (1759), on the Lisbon earthquake of 1755, English translation. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "literary",
        "title": "The Sixth Seal: A Great Earthquake",
        "excerpt": "And I beheld when he had opened the sixth seal, and, lo, there was a great earthquake; and the sun became black as sackcloth of hair, and the moon became as blood; And the stars of heaven fell unto the earth, even as a fig tree casteth her untimely figs, when she is shaken of a mighty wind. And the heaven departed as a scroll when it is rolled together; and every mountain and island were moved out of their places.",
        "source": "Revelation 6:12–14, King James Version (1611). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Revelation"
      },
      {
        "category": "artistic",
        "title": "Bryullov, 'The Last Day of Pompeii'",
        "excerpt": "Karl Bryullov floods a collapsing city with the lurid red of an erupting Vesuvius, columns toppling and statues pitching from their pedestals as families shield their heads and flee. Lightning and volcanic glare pick out mothers clutching children, a fallen woman beside her infant, and citizens frozen between terror and tenderness. It is the classic Romantic image of a proud city undone in an instant by the trembling earth.",
        "source": "Karl Bryullov, The Last Day of Pompeii (1830–1833), oil on canvas, State Russian Museum, St Petersburg. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/egypt-suez-earthquake-magnitude-5-6--a4.png",
          "alt": "Panicked crowds flee collapsing columns and toppling statues under a red volcanic sky as Vesuvius erupts over Pompeii.",
          "credit": "Karl Bryullov, The Last Day of Pompeii (1830–1833), State Russian Museum. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "John Martin, 'The Destruction of Pompeii and Herculaneum'",
        "excerpt": "John Martin dwarfs tiny human figures beneath a vast apocalyptic panorama: a black sky split by lightning, the cone of Vesuvius spewing fire, and the twin cities engulfed in cataract of ash and molten rock. The scale is deliberately overwhelming, the people mere specks against the machinery of geological catastrophe. Martin turns a natural disaster into a sublime vision of nature's indifference to civilisation.",
        "source": "John Martin, The Destruction of Pompeii and Herculaneum (1822), oil on canvas, Tate, London. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Destruction_of_Pompeii_and_Herculaneum.jpg",
        "image": {
          "src": "/covers/egypt-suez-earthquake-magnitude-5-6--a5.png",
          "alt": "Tiny figures flee beneath a vast black sky as Vesuvius erupts and fire and ash engulf Pompeii and Herculaneum.",
          "credit": "John Martin, The Destruction of Pompeii and Herculaneum (1822), Tate. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "gaza-israeli-strikes-hamas-disarmament",
    "headline": "Israeli airstrikes kill at least 13 people across Gaza in a second straight night of attacks, days after Hamas accepts a US-backed disarmament plan",
    "overview": "Israeli aircraft struck Gaza City, Khan Younis and Deir al-Balah overnight, killing at least 13 Palestinians, including a nine-year-old boy, the territory's Civil Defence Authority said. The Israeli military said it had targeted Hamas military operatives and killed two commanders, while Israel's energy minister, Eli Cohen, said no deal had been reached to stop the strikes even after Hamas this week accepted a plan to hand its weapons to a US-led 'Board of Peace.' More than 1,100 Palestinians have been killed since a supposed ceasefire took effect last October, in a territory now roughly 70% under Israeli control.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMi0AFBVV95cUxPaFJlV0RsNzR2Qm1PeVlvNEZpclF5Rkt2NGQ5Z2JXaGcyR2pFdkt1aC0ybzdzXzNTUEptMnpyOWNrVWk4RTNicjFScDcyYnpEWm1GcFFmb0FxX0J4YkxIdWgxUHlTRE9rNlJPbVFfTFlDSGduQUQ4d3RqQ1hDYXRZRXpobU5qMEdEd05hdmVhcERmVW5IVy0tX2loYnpJc01hNHV1WWdJSXFwdVVhaXRwZUZLNkJSYzdFVVdsZ0dUazFManQ3aVAxNkp1MUxTSmJo?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/czjlvvkzj20o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/gaza-israeli-strikes-hamas-disarmament.png",
      "alt": "Two men dig through the broken concrete and rubble of a destroyed tiled room after an Israeli airstrike in Gaza.",
      "credit": "BBC"
    },
    "lead": true,
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Burning of the Temple, Jerusalem, 70 AD",
        "excerpt": "While the holy house was on fire, every thing was plundered that came to hand, and ten thousand of those that were caught were slain; nor was there a commiseration of any age, or any reverence of gravity, but children, and old men, and profane persons, and priests were all slain in the same manner; so that this war went round all sorts of men, and brought them to destruction, and as well those that made supplication for their lives, as those that defended themselves by fighting. The flame was also carried a long way, and made an echo, together with the groans of those that were slain; and because this hill was high, and the works at the temple were very great, one would have thought the whole city had been on fire.",
        "source": "Flavius Josephus, The Wars of the Jews, Book VI, Chapter 5, translated by William Whiston (1737). Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/2850/pg2850.txt"
      },
      {
        "category": "historical",
        "title": "\"War Is Cruelty\": Sherman to Atlanta, 1864",
        "excerpt": "You cannot qualify war in harsher terms than I will. War is cruelty, and you cannot refine it; and those who brought war into our country deserve all the curses and maledictions a people can pour out.",
        "source": "William Tecumseh Sherman, Letter to James M. Calhoun, Mayor of Atlanta, and others, September 12, 1864. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Letter_to_James_M._Calhoun,_et_al.,_September_12,_1864"
      },
      {
        "category": "literary",
        "title": "The Children Swoon in the Streets",
        "excerpt": "Mine eyes do fail with tears, my bowels are troubled, my liver is poured upon the earth, for the destruction of the daughter of my people; because the children and the sucklings swoon in the streets of the city. They say to their mothers, Where is corn and wine? when they swooned as the wounded in the streets of the city, when their soul was poured out into their mothers' bosom.",
        "source": "Book of Lamentations 2:11-12, King James Version (1611). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "literary",
        "title": "Hecuba Binds the Wounds of a Slain Child",
        "excerpt": "I make thee whole;\nI bind thy wounds, O little vanished soul.\nThis wound and this I heal with linen white:\nO emptiness of aid! . . . Yet let the rite\nBe spoken. This and . . . Nay, not I, but he,\nThy father far away shall comfort thee!",
        "source": "Euripides, The Trojan Women, translated into English rhyming verse by Gilbert Murray (1915). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/35171/35171-h/35171-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Third of May 1808",
        "excerpt": "A lantern throws its harsh light on a row of unarmed townspeople as a faceless firing squad levels its muskets; one man flings his arms wide in a last gesture of defiance and terror. The dead already lie in their own blood at his feet, and a line of the doomed stretches back into the dark. Goya lets no glory into the scene, only the machinery of killing and the human beings it consumes.",
        "source": "Francisco de Goya, El Tres de Mayo de 1808 en Madrid (The Third of May 1808), 1814, oil on canvas, Museo del Prado, Madrid. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/gaza-israeli-strikes-hamas-disarmament--a4.png",
          "alt": "A man in a white shirt kneels with arms thrown wide before a firing squad at night, a large lantern on the ground, bodies bleeding at his feet and more victims waiting in the shadows.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Apotheosis of War",
        "excerpt": "Against a scorched plain and the broken walls of a ruined city stands a pyramid of human skulls, picked clean, ringed by circling crows. There are no soldiers and no banners, only the sum that war leaves behind. Vereshchagin dedicated the canvas to all conquerors, past, present and to come.",
        "source": "Vasily Vereshchagin, The Apotheosis of War (Apofeoz voyny), 1871, oil on canvas, Tretyakov Gallery, Moscow. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Vasily_Vereshchagin_-_Апофеоз_войны_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/gaza-israeli-strikes-hamas-disarmament--a5.png",
          "alt": "A tall pyramid built of human skulls on a barren yellow plain, crows perched on and flying around it, with the ruins of a city and bare trees in the background.",
          "credit": "Vasily Vereshchagin, The Apotheosis of War (1871), Tretyakov Gallery. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "idaho-fast-food-shooting",
    "headline": "A shooting at a fast-food restaurant in an Idaho shopping center kills 3 people and wounds 7 before the gunman takes his own life",
    "overview": "A gunman opened fire at a fast-food restaurant in a shopping center in Idaho, killing three people and wounding seven, a city spokesman said. Police said the suspect died of a self-inflicted gunshot wound. Investigators had not given a motive as they worked to identify the attacker and the victims.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxNYW9uN0pxS05KdmgwSlBrYXdBTjBJTDY2N05QS2FSbUIycnRaR3ZnYTdBVTU5OUxpWnpGZnJUS0tVUWR0dFJIbGNKZGVYZEdxS3RfZjk1bHVnc3h3TTRHN2g1TUFMRU8yZHk3NnE0elkzZXFtUEwxRWNuZjktOTdmcGpCbUxYQW9vM05nZUZ3?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxOSUlHQUFzUk1GbXRXbmxaSzJVZVVFbXpIZ1lvSzhCbHcyZnlCREt6UmtPYi0zaUhya0hSMENVckhaUUxUTDNQMTM4YVhHWmU1dU9mMXJGRE00a0JMOUltaFNDOHJPemk5eXpyZ0tuVHE3MjM0R1hDM3NYWUoxTThHVGxvN3AxcVVpeVZocUk0TQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/idaho-fast-food-shooting.png",
      "alt": "A deserted American shopping-center parking lot at dusk cordoned off with police tape under cold overhead lights.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Massacre at Mycalessus",
        "excerpt": "The Thracians bursting into Mycalessus sacked the houses and temples, and butchered the inhabitants, sparing neither youth nor age, but killing all they fell in with, one after the other, children and women, and even beasts of burden, and whatever other living creatures they saw; the Thracian race, like the bloodiest of the barbarians, being ever most so when it has nothing to fear.\nEverywhere confusion reigned and death in all its shapes; and in particular they attacked a boys' school, the largest that there was in the place, into which the children had just gone, and massacred them all. In short, the disaster falling upon the whole town was unsurpassed in magnitude, and unapproached by any in suddenness and in horror.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII, ch. 29 (trans. Richard Crawley; London: J. M. Dent, 1910), via the Perseus Digital Library.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book=7:chapter=29"
      },
      {
        "category": "historical",
        "title": "The San Ysidro McDonald's Massacre (1984)",
        "excerpt": "On July 18, 1984, a gunman walked into a McDonald's in San Ysidro, California, and opened fire on families eating lunch, killing twenty-one people and wounding nineteen in what was then the deadliest lone-gunman shooting in United States history. The siege ended after seventy-seven minutes when a police sniper killed him. An ordinary fast-food counter had become a scene of mass death, plunging a border community into a grief its survivors still carry decades later.",
        "source": "San Ysidro McDonald's massacre, Wikipedia (accessed 2 August 2026).",
        "href": "https://en.wikipedia.org/wiki/San_Ysidro_McDonald%27s_massacre"
      },
      {
        "category": "literary",
        "title": "Cain and Abel (Genesis 4)",
        "excerpt": "And Cain talked with Abel his brother: and it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him.\nAnd the LORD said unto Cain, Where is Abel thy brother? And he said, I know not: Am I my brother’s keeper?\nAnd he said, What hast thou done? the voice of thy brother’s blood crieth unto me from the ground.",
        "source": "The Holy Bible, King James Version, Genesis 4:8-10. Project Gutenberg eBook #10.",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "literary",
        "title": "Psalm 55: Violence in the City",
        "excerpt": "Destroy, O LORD, and divide their tongues: for I have seen violence and strife in the city.\nDay and night they go about it upon the walls thereof: mischief also and sorrow are in the midst of it.\nWickedness is in the midst thereof: deceit and guile depart not from her streets.",
        "source": "The Holy Bible, King James Version, Psalm 55:9-11, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "artistic",
        "title": "The Massacre of the Innocents",
        "excerpt": "A Roman soldier drives his knee into a mother's body and raises his sword over the naked infant she cannot save, her mouth wrenched open in a scream that fills the sunlit square. To the side another woman flees with a limp child in her arms. Poussin freezes the single unbearable instant when public order collapses into slaughter of the innocent.",
        "source": "Nicolas Poussin, The Massacre of the Innocents (c. 1629), Musee Conde, Chantilly. Via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_Le_massacre_des_Innocents_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/idaho-fast-food-shooting--a4.png",
          "alt": "A Roman soldier pins a mother to the ground with his knee, sword raised over her infant as she screams; another woman flees with a dead child across a sunlit classical square.",
          "credit": "Nicolas Poussin, The Massacre of the Innocents (c. 1629), Musee Conde, Chantilly. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Rue Transnonain, 15 April 1834",
        "excerpt": "Honoré Daumier's lithograph shows the aftermath of a massacre in an ordinary Paris apartment: a working man in his nightshirt sprawled dead on the floor, having fallen across the crushed body of his small child, with another corpse in the shadows. Made after soldiers slaughtered the innocent residents of a tenement during an 1834 uprising, it turned a single quiet room into an indictment of sudden, senseless slaughter. Its unflinching stillness made it one of the most powerful images of civilians killed where they lived.",
        "source": "Honoré Daumier, Rue Transnonain, le 15 avril 1834, 1834, lithograph; National Gallery of Art, Washington.",
        "href": "https://commons.wikimedia.org/wiki/File:Honoré_Daumier,_Rue_Transnonain,_le_15_avril_1834,_1834,_NGA_6133.jpg",
        "image": {
          "src": "/covers/idaho-fast-food-shooting--a5.png",
          "alt": "A stark black-and-white lithograph of a working-class man in his nightshirt lying dead on the floor of a bare room, fallen across the body of a small child, after a massacre in an ordinary home.",
          "credit": "Honoré Daumier, Rue Transnonain, le 15 avril 1834 (1834), National Gallery of Art, Washington. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "pakistan-suicide-bombing-northwest",
    "headline": "A suicide bombing in northwestern Pakistan kills at least 14 people, officials say",
    "overview": "A suicide bomber struck in northwestern Pakistan, killing at least 14 people and wounding many others, officials said, with reports placing the blast at an anti-militant political gathering near a police station in the Khyber Pakhtunkhwa region. No group immediately claimed responsibility. The area has seen a resurgence of militant attacks in recent years.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxQVnpTdXBlTnNKVHNyMDdIQ3cxNUl5OE82Njl6alJWaGlheUtmMkRFSHdLUklEcUczdm5PUnpwcjdZblBvdDJvQWhEYVNzMTBIZjhsQkdZU3dyak50UjVGTDFBUW4zQUxWenhaVXNxR2dqU0ZzbFZuNlZBV1ZGNUVIaGFMc1EtRHk0TWVvTVY5b2NYUnpXeTRFTlE5Z0ZvVXlJTlNWOENPek9KR3hFSVdXUlJQVzdiQQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOVTZuMDlfeGlmTG14UGlTZ2EtWHd6LVR1Nk9zSlE1ZDNwZ19PbTVnS1B2bktSZnMxRjFYaU9RX29Xa0djazNpRW0xVThaOHVtVW0xZTFiVURWd1dGNkd0cWV2OHNLcGI1OTVOY19JUTdTX3RiZmE0RzdHWjdTd29jLVlMNUFtM3R5cHBkNHYzbjVqYkh4eXlGNUtDYlduVkxOTG9jaWlZS1FHN2J6QjZTb00zWC1mblRzcFhsYjYwWUgxb0YxNTRYZXRPcjUxUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/pakistan-suicide-bombing-northwest.png",
      "alt": "A deserted fortified checkpoint on a dusty road at dusk with concrete blast barriers and a thin column of smoke rising against an orange sky.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Josephus on the Sicarii, the festival dagger-men of Jerusalem",
        "excerpt": "When the country was purged of these, there sprang up another sort of robbers in Jerusalem, which were called Sicarii, who slew men in the day time, and in the midst of the city; this they did chiefly at the festivals, when they mingled themselves among the multitude, and concealed daggers under their garments, with which they stabbed those that were their enemies; and when any fell down dead, the murderers became a part of those that had indignation against them; by which means they appeared persons of such reputation, that they could by no means be discovered.",
        "source": "Flavius Josephus, The Wars of the Jews, Book II, ch. 13, trans. William Whiston, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/2850/2850-h/2850-h.htm"
      },
      {
        "category": "historical",
        "title": "Emile Henry defends the Cafe Terminus bombing at his trial",
        "excerpt": "The bourgeoisie did not distinguish among the anarchists. Vaillant, a man on his own, threw a bomb; nine-tenths of the comrades did not even know him. But that meant nothing; the persecution was a mass one, and anyone with the slightest anarchist links was hunted down. And since you hold a whole party responsible for the actions of a single man, and strike indiscriminately, we also strike indiscriminately.",
        "source": "Emile Henry, Defence Speech, Paris, 27 April 1894, Marxists Internet Archive.",
        "href": "https://www.marxists.org/reference/archive/henry/1894/defence-speech.htm"
      },
      {
        "category": "literary",
        "title": "Samson pulls the temple down on himself and the crowd (Judges 16, King James Version)",
        "excerpt": "And Samson took hold of the two middle pillars upon which the house stood, and on which it was borne up, of the one with his right hand, and of the other with his left. And Samson said, Let me die with the Philistines. And he bowed himself with all his might; and the house fell upon the lords, and upon all the people that were therein. So the dead which he slew at his death were more than they which he slew in his life.",
        "source": "The Holy Bible, King James Version, Judges 16:29-30, Christian Classics Ethereal Library (CCEL).",
        "href": "https://www.ccel.org/ccel/bible/kjv.Judg.16.html"
      },
      {
        "category": "literary",
        "title": "Milton, Samson Agonistes: the pillars and the burst of thunder",
        "excerpt": "This utter'd, straining all his nerves he bow'd,\nAs with the force of winds and waters pent,\nWhen Mountains tremble, those two massie Pillars\nWith horrible convulsion to and fro,\nHe tugg'd, he shook, till down they came and drew\nThe whole roof after them, with burst of thunder\nUpon the heads of all who sate beneath,\nLords, Ladies, Captains, Councellors, or Priests,\nThir choice nobility and flower, not only\nOf this but each Philistian City round\nMet from all parts to solemnize this Feast.\nSamson with these immixt, inevitably\nPulld down the same destruction on himself;",
        "source": "John Milton, Samson Agonistes (1671), in The Poetical Works of John Milton, ed. H. C. Beeching, Project Gutenberg eBook #1745.",
        "href": "https://www.gutenberg.org/cache/epub/1745/pg1745.txt"
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya, The Third of May 1808 (1814)",
        "excerpt": "A firing squad of faceless soldiers levels its muskets at a knot of terrified civilians herded together in the dark. One man in a white shirt flings his arms wide above a heap of the already-dead, his eyes blown open in the instant before the volley. A lantern on the ground throws harsh light on the huddle, freezing an entire crowd at the edge of sudden, mechanical death.",
        "source": "Francisco de Goya, The Third of May 1808 in Madrid, 1814, oil on canvas, Museo Nacional del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:El_tres_de_mayo_de_1808_en_Madrid.jpg",
        "image": {
          "src": "/covers/pakistan-suicide-bombing-northwest--a4.png",
          "alt": "Goya's painting: a firing squad aims its muskets at a group of civilians at night, one man in a white shirt with arms flung upward beside the fallen dead.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The assassination of Tsar Alexander II by bomb (1881)",
        "excerpt": "A contemporary newsprint engraving of the Catherine Canal embankment in the seconds after the second bomb. Smoke and snow churn together as figures are hurled to the ground amid scattered debris and the wreckage of the imperial coach. Bystanders and soldiers scramble at the margins, caught in the blast a lone conspirator has just set off in the crowded street.",
        "source": "Gustav Broling, engraving of the assassination of Alexander II, Illustrirte Zeitung, Bd. 76 (Leipzig, 1881), p. 262.",
        "href": "https://commons.wikimedia.org/wiki/File:Attentat_mortal_Alexander_II_(1881).jpg",
        "image": {
          "src": "/covers/pakistan-suicide-bombing-northwest--a5.png",
          "alt": "1881 engraving showing a bomb explosion on a St. Petersburg embankment: figures flung down amid smoke, snow and debris around the shattered imperial coach.",
          "credit": "Gustav Broling, in Illustrirte Zeitung Bd. 76 (1881), p. 262. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "greece-firefighting-helicopters-collide",
    "headline": "Two crew are killed when two firefighting helicopters collide near Athens as wildfires burn across southern Europe",
    "overview": "Two crew members were killed when two water-dropping helicopters collided while fighting a wildfire near Athens, Greece's fire service said; a British pilot survived. The crash came as Greece, France, Spain and other parts of southern Europe battled a wave of blazes fanned by a punishing summer heatwave. Thousands of firefighters and dozens of aircraft have been deployed across the region.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPSVVmOGN3UkdYdHBLWVhmMlFheVFwZkplU2xkekoybWZtRi0tbXFRMHBwVHpBTUlwU1RfdFVBTUhuSEVVYnQ0TFVLYXFTWlFNbDZ6Q3JhQUwtMTk0R25HRlZ4OVNKOWtwN2FzYW5Ia2NKdWFsd1U2OFdXVWFyb290dGFUT2VDREhreE5CbUxUQWlmRi1KaWlNdGVuRF80NThpckZ2c2VsSlVRTzU0aUFUVTI4RQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNSGhDR0RqTHVKV24tazZCX3BDVFFjNmFSQm1UTy1jX2czb2FaTE5EcXlqRF8yRFpBREJmN0l2MmYwWkFzaWZmWlNtSTNUUURCLUNrdUhFdi03a2lGeHFFY3RncWIzVGtOR1UySG5yWGJKWWFWSUFHOE9qTVhFaWdEaGtBclJuNVVkMEdtckZIdTdFUEhLT0NKS2JsRlpQQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/greece-firefighting-helicopters-collide.png",
      "alt": "A firefighting helicopter releases a load of water from a suspended Bambi bucket over a burning forest.",
      "credit": "Photograph by Pöllö, CC BY 3.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome (AD 64), recorded by Tacitus",
        "excerpt": "Added to this were the wailings of terror-stricken women, the feebleness of age, the helpless inexperience of childhood, the crowds who sought to save themselves or others, dragging out the infirm or waiting for them, and by their hurry in the one case, by their delay in the other, aggravating the confusion.",
        "source": "Tacitus, Annals, Book 15.38 (trans. Alfred John Church and William Jackson Brodribb), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D15%3Achapter%3D38"
      },
      {
        "category": "historical",
        "title": "The Great Fire of London (1666), from the diary of Samuel Pepys",
        "excerpt": "And among other things, the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.",
        "source": "Samuel Pepys, The Diary of Samuel Pepys, entry for 2 September 1666, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/4171/4171-h/4171-h.htm"
      },
      {
        "category": "literary",
        "title": "The fall of Icarus, from Ovid's Metamorphoses",
        "excerpt": "The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air.",
        "source": "Ovid, The Metamorphoses of Ovid, Book VIII (trans. Henry T. Riley), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "Phaethon scorches the earth, from Ovid's Metamorphoses",
        "excerpt": "The highest altitudes\nare caught in flames, and as their moistures dry\nthey crack in chasms. The grass is blighted; trees\nare burnt up with their leaves; the ripe brown crops\ngive fuel for self destruction—Oh what small\ncomplaints! Great cities perish with their walls,\nand peopled nations are consumed to dust—\nthe forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book 2 (trans. Brookes More, 1922), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book%3D2:card%3D227"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, \"Landscape with the Fall of Icarus\" (c. 1560s)",
        "excerpt": "His legs can be seen in the water just below the ship. The Sun, already half-set on the horizon, is a long way away; the flight did not reach anywhere near it.",
        "source": "\"Landscape with the Fall of Icarus,\" Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Landscape_with_the_Fall_of_Icarus",
        "image": {
          "src": "/covers/greece-firefighting-helicopters-collide--a4.png",
          "alt": "A tranquil coastal landscape dominated by a ploughman and a shepherd, while in the lower right the legs of the drowning Icarus disappear into the sea beside a passing ship.",
          "credit": "After Pieter Bruegel the Elder, Royal Museums of Fine Arts of Belgium, Brussels. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, \"The Burning of the Houses of Lords and Commons\" (1834–35)",
        "excerpt": "Along with thousands of other spectators, Turner himself witnessed the Burning of Parliament from the south bank of the River Thames, opposite Westminster.",
        "source": "\"The Burning of the Houses of Lords and Commons,\" Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Burning_of_the_Houses_of_Lords_and_Commons",
        "image": {
          "src": "/covers/greece-firefighting-helicopters-collide--a5.png",
          "alt": "A blazing conflagration engulfs the Houses of Parliament at night, its flames and smoke reflected across the River Thames as crowds watch from Westminster Bridge.",
          "credit": "Joseph Mallord William Turner, Philadelphia Museum of Art. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "brazil-lula-reelection-bid",
    "headline": "Brazil's President Lula, 80, launches a bid for a fourth term as officials warn of foreign interference",
    "overview": "President Luiz Inacio Lula da Silva formally launched his campaign for a fourth term in Brazil's 2026 election, telling supporters he was 'in great shape' and vowing to defend the country's sovereignty. His announcement came amid rising official concern over foreign interference and online disinformation in the coming vote. Lula, who first led Brazil from 2003 to 2010 and returned to office in 2023, is expected to face a crowded field on the right.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNQVhVOWVPWk5lVnU3TGw4ZGtCTkNxVkN1VG92cVlJU0YydG1vbk9uVTFuUzZuMFQzQlYyVmEzRG83bnM3MTR1cDNsSzRZMmhldU14d0dMVTZaSDk2VFZKUERDLXJZcE5iWjVtQXBIS2VKSHM4ZHNEYThRbm1ONDhMang2MzhWUlhkVjBuTnp4aWVVNWp3Yzhyci1HbFFhRXZrb2h2MDVoVnZJNG1mTkdMZUM1ZVhGN0ZLSmc?oc=5"
      },
      {
        "name": "France 24",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQQlZsOUFWWU9tU3RkUG9jSkkyTmpPalhPeEZYRnptZ0xZN3Z1S2gtYmJ4TWNEUG5uRmtyWlduRXRPaHpHdnVRQjh3UWVvTXgtR2Fid0p4ZzNmaUFkNVZIWTFMdi05MlVCb1daNEhzUkhxcDlnT0tGSW5DQm85YjNHZlp1TkpHbnMxMnJzb29STF9PTjhvS2xXUGxSV1dQQndqN2dDWjBPRHJTMzZucFBMRTR3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/brazil-lula-reelection-bid.png",
      "alt": "Official 2023 presidential portrait of Brazil's President Luiz Inácio Lula da Silva, wearing a dark suit and the presidential sash.",
      "credit": "Wikimedia Commons — Official portrait of President Luiz Inácio Lula da Silva by Palácio do Planalto, 2023 (CC BY 2.0)."
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cincinnatus Called from the Plough",
        "excerpt": "There he was found by the deputation from the senate either digging out a ditch or ploughing, at all events, as is generally agreed, intent on his husbandry.\nAfter mutual salutations he was requested to put on his toga that he might hear the mandate of the senate, and they expressed the hope that it might turn out well for him and for the State.",
        "source": "Livy, The History of Rome, Book 3, Chapter 26 (trans. Rev. Canon Roberts), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book%3D3:chapter%3D26"
      },
      {
        "category": "historical",
        "title": "Grover Cleveland's Return to the White House",
        "excerpt": "Defeated after a single term, Grover Cleveland refused to treat the presidency as finished business. Four years later, in 1893, he walked back into the White House as the only American president to win a second, non-consecutive term. His comeback made the interrupted career a template for the veteran leader who leaves office only to reclaim it.",
        "source": "Grover Cleveland — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Grover_Cleveland"
      },
      {
        "category": "literary",
        "title": "The Homecoming of Odysseus",
        "excerpt": "Then Ulysses in his turn melted, and wept as he clasped his dear and faithful wife to his bosom.",
        "source": "Homer, The Odyssey, Book XXIII (trans. Samuel Butler), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm"
      },
      {
        "category": "literary",
        "title": "They Shall Still Bring Forth Fruit in Old Age",
        "excerpt": "The righteous shall flourish like the palm tree: he shall grow like a cedar in Lebanon.\nThose that be planted in the house of the LORD shall flourish in the courts of our God.\nThey shall still bring forth fruit in old age; they shall be fat and flourishing;",
        "source": "Psalm 92:12–14, The Bible (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "artistic",
        "title": "Cincinnatus Abandons the Plough to Dictate Laws to Rome",
        "excerpt": "Cincinnatus abandons the Plough to dictate Laws to Rome",
        "source": "Juan Antonio de Ribera, c. 1806, Museo del Prado — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Juan_Antonio_Ribera_-_Cincinato_abandona_el_arado_para_dictar_leyes_a_Roma,_1806.jpg",
        "image": {
          "src": "/covers/brazil-lula-reelection-bid--a4.png",
          "alt": "Neoclassical painting of the aged Roman Cincinnatus leaving his plough as senate deputies arrive to summon him back to lead the Republic.",
          "credit": "Juan Antonio de Ribera, 'Cincinnatus abandons the Plough to dictate Laws to Rome,' c. 1806, Museo del Prado. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Odysseus and Penelope Reunited",
        "excerpt": "Ulysses and Penelope by Francesco Primaticcio",
        "source": "Francesco Primaticcio, c. 1563 — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Francesco_Primaticcio_002.jpg",
        "image": {
          "src": "/covers/brazil-lula-reelection-bid--a5.png",
          "alt": "Mannerist painting of Odysseus and Penelope embracing on their bed at his long-awaited homecoming to Ithaca.",
          "credit": "Francesco Primaticcio, 'Odysseus and Penelope,' c. 1563. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "eu-boards-russian-shadow-fleet-tanker",
    "headline": "An Italian-led EU naval force boards a sanctioned tanker from Russia's 'shadow fleet' in the Mediterranean",
    "overview": "An Italian-led European Union naval force boarded and inspected a sanctioned oil tanker linked to Russia's 'shadow fleet' in the Mediterranean Sea, officials said, in a rare enforcement action against the ageing vessels Moscow uses to evade Western oil sanctions. The Italian navy said personnel checked the ship's documents and cargo. The operation reflects a growing European effort to police the covert tanker fleet that sustains Russian crude exports.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxONW5zbU8yMjdVdGc1Z0pTSGFZVUZRTDJPR2lQM3NNU2p0Ym5OcW5xSkgwbnZ5ZmNsUWRaWHgwckZSRFFPMHNWQWtkVS1wcHIwX19uUEdER3Ewd3BLS25NdnFEb29WNHd3dzVPaHJZRVBwamp6MWltM29hbXNNYTVTc2FCUmZpaWF4b0dsNUJzYnRYMHhfRWR4emdRaFBkd0tHX0ViZlZoMXBDN3FEWS1rV21kaXpqdWlHXzkxaU50SGlfaGdvZEI4LQ?oc=5"
      },
      {
        "name": "The Kyiv Independent",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxQOVhlWVhlcnBVUjhCaEx6Q0cwNUhRSEFZa2h3SnRnZGVIMDRGY05zdDZ6SkZnQ0JWQlpoTUJrWXdtS19mWk1leXNWUExPTzdDczg4VmNBWDhMTjRESzBpcWJxZ2doRlpGcG5tNzlJT3U0ZDFYWnh6NWx6ZHJiS1hOOXppbFRhSE0yWUZDc05aQUVSZldic3hCVg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/eu-boards-russian-shadow-fleet-tanker.png",
      "alt": "A laden crude-oil supertanker, the AbQaiq, riding low and alone across open sea.",
      "credit": "Photo: U.S. Navy (Journalist 1st Class Robert Benson), public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pompey's campaign against the Cilician pirates (67 BC)",
        "excerpt": "In 67 BC the Roman Republic, its grain lanes strangled by raiders based in Cilicia, handed Pompey a sweeping mandate to sweep the Mediterranean clean. He carved the sea into sectors and drove a wall of ships eastward, cornering the pirate fleets and their coastal strongholds. Within a single season an ungovernable maritime menace had been brought under the reach of Roman law.",
        "source": "Pompey's campaign against the pirates, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Pompey%27s_campaign_against_the_pirates"
      },
      {
        "category": "historical",
        "title": "The Royal Navy's West Africa Squadron (19th century)",
        "excerpt": "From 1808 the Royal Navy stationed a squadron off West Africa to hunt the ships that carried on the outlawed slave trade. Its officers exercised a contested right of visit and search, running down suspect vessels and boarding them to look for the tell-tale evidence of chained decks and human cargo. Over half a century the patrols stopped some sixteen hundred ships and freed more than a hundred thousand captives, turning naval force into the blunt instrument of an international ban.",
        "source": "West Africa Squadron, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/West_Africa_Squadron"
      },
      {
        "category": "literary",
        "title": "Psalm 107 (King James Version)",
        "excerpt": "They that go down to the sea in ships, that do business in great waters;\nThese see the works of the LORD, and his wonders in the deep.\nFor he commandeth, and raiseth the stormy wind, which lifteth up the waves thereof.\nThey mount up to the heaven, they go down again to the depths: their soul is melted because of trouble.\nThey reel to and fro, and stagger like a drunken man, and are at their wit’s end.",
        "source": "The Bible, King James Version, Psalm 107:23–27",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "literary",
        "title": "Herman Melville, Moby-Dick; or, The Whale (“The Chase—Third Day”)",
        "excerpt": "“Give way!” cried Ahab to the oarsmen, and the boats darted forward to the attack; but maddened by yesterday’s fresh irons that corroded in him, Moby Dick seemed combinedly possessed by all the angels that fell from heaven.",
        "source": "Herman Melville, Moby-Dick; or, The Whale (1851), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2701/2701-h/2701-h.htm"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Slave Ship (1840)",
        "excerpt": "Turner drowns a slave vessel in a burning sea of orange and blood-red, its masts leaning into an oncoming typhoon while manacled figures slip beneath the churning water. Painted as abolitionist campaigns pressed across the Atlantic, it turns a maritime crime into a scene of cosmic reckoning. The ship flees, but the sea itself has become the enforcer.",
        "source": "The Slave Ship, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Slave_Ship",
        "image": {
          "src": "/covers/eu-boards-russian-shadow-fleet-tanker--a4.png",
          "alt": "A sailing ship in a fiery red-and-gold sea under a coming storm, with human figures and chains sinking in the foreground waves.",
          "credit": "J. M. W. Turner, The Slave Ship (1840), Museum of Fine Arts, Boston; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky, Ship in the Stormy Sea (1887)",
        "excerpt": "Aivazovsky sets a lone vessel against towering, luminous swells, its hull pitched sideways as the sea rears up to meet it. Light breaks through the spray as if the storm itself were passing judgement on the little ship. It is the enduring image of a craft at the mercy of forces far larger than itself.",
        "source": "File:Ivan Aivazovsky - Ship in the Stormy Sea.jpg, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Ivan_Aivazovsky_-_Ship_in_the_Stormy_Sea.jpg",
        "image": {
          "src": "/covers/eu-boards-russian-shadow-fleet-tanker--a5.png",
          "alt": "A single sailing ship heeling among high, glowing storm waves under a dark sky.",
          "credit": "Ivan Aivazovsky, Ship in the Stormy Sea (1887), oil on canvas, Hermitage Museum; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "china-red-lines-economic-model",
    "headline": "China draws 'red lines' around its state-led economic model ahead of trade talks with the EU and US",
    "overview": "China has signalled 'red lines' it will not cross in defending its state-led economic model as it heads into fresh trade negotiations with the European Union and the United States, according to a Reuters analysis. Beijing is resisting Western demands to curb industrial subsidies and rein in export-driven overcapacity, framing them as attempts to contain its development. The stance sets up difficult talks over tariffs, market access and green-technology exports.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQQWk1MXJvXzVGTkx2SW9Kak03MTJDSUlsYWtZREhuT1MwcjJUOWcyOFFwcXFHYlNrV1dlUUdHVG9yZk5JbFJwS1JzWWg4ZE9pY0NQWWdpSVhoT0g1ZERwVlBvTm51dklQLWlGU0UxeEF1NVJfQ1pvdnZUa1dRQ3RUU09lUE50NGJLcE4wYmNtUGNXT0xLV1BkNnlmR1p4ZTkwQ0pIRnpQUVQ3TGkyakUwRm5RRzNJZi1Id3Bv?oc=5"
      },
      {
        "name": "Devdiscourse",
        "href": "https://news.google.com/rss/articles/CBMi2AFBVV95cUxNZGxJbjFleTg5dDNocTRvelVxNWVCX3o5dXU4VVBhaEhaN1RGWXpNWnpoS1ZJLUhuRGhGMExYZ3FHS1Z6RTZudkhKWkpKblRvZVlXQmpWM2VvamwwU0FBN3NCVjYwM3JqNC1JUUY2QThwVDBPV0VmZVQ3MjNCajh6R2gyMnlGS2hEZGJTRmVuSU5kS2x3ZkhyaDNYQklKX2NNcHRMcGZXelVLd3pxRXp0aUR1YkZaUUw4VF8xLUhhdHJUbFpkV1Z6TkI0SDMyMGpRUFJWSlpPTFbSAdgBQVVfeXFMTWRsSW4xZXk4OXQzaHE0b3pVcTVlQl96OXV1OFVQYWhIWjdURll6TVp6aEtWSS1IbkRoRjBMWGdxR0tWekU2bnZISlpKSm5Ub2VZV0JqVjNlb2psMFNBQTdzQlY2MDNyajQtSVFGNkE4cFQwT1dFZmVUNzIzQmo4ekdoMjJ5RktoRGRiU0ZlbklOZEtsd2ZIcmgzWEJJSl9jTXB0THBmV3pVS3d6cUV6dGlEdWJGWlFMOFRfMS1IYXRyVGxaZFdWek5CNEgzMjBqUVBSVkpaT0xW?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/china-red-lines-economic-model.png",
      "alt": "Rows of stacked shipping containers and gantry cranes at Wuhu Port on the Yangtze River in Anhui province, China.",
      "credit": "Wuhu Port, Anhui, China (2017). Photo by MNXANL, CC BY-SA 4.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Popilius Laenas draws a circle around Antiochus IV (168 BC)",
        "excerpt": "Popilius, stern and imperious as ever, drew a circle round the king with the stick he was carrying and said, \"Before you step out of that circle give me a reply to lay before the senate.\" For a few moments he hesitated, astounded at such a peremptory order, and at last replied, \"I will do what the senate thinks right.\"",
        "source": "Livy, History of Rome, Book 45, ch. 12 (Rev. Canon Roberts translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0144:book=45:chapter=12"
      },
      {
        "category": "historical",
        "title": "The Qianlong Emperor's edict to King George III (1793)",
        "excerpt": "As your Ambassador can see for himself, we possess all things. I set no value on objects strange or ingenious, and have no use for your country's manufactures.",
        "source": "Qianlong Emperor, Letter to George III (1793), Internet Modern History Sourcebook, Fordham University",
        "href": "https://sourcebooks.fordham.edu/mod/1793qianlong.asp"
      },
      {
        "category": "literary",
        "title": "Proverbs 22:28 - the ancient landmark",
        "excerpt": "Remove not the ancient landmark, which thy fathers have set.",
        "source": "The Book of Proverbs 22:28, King James Version, via Christian Classics Ethereal Library (CCEL)",
        "href": "https://www.ccel.org/ccel/bible/kjv.Prov.22.html"
      },
      {
        "category": "literary",
        "title": "Robert Frost, \"Mending Wall\" (1914)",
        "excerpt": "He will not go behind his father's saying,\nAnd he likes having thought of it so well\nHe says again, \"Good fences make good neighbours.\"",
        "source": "Robert Frost, \"Mending Wall,\" North of Boston (1914), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3026/3026-h/3026-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Great Wall of China, engraving from Du Halde's Description de la Chine (1735)",
        "excerpt": "An early European engraving of the Great Wall snaking over steep ridges, its watchtowers and battlements marking the frontier the Qing empire kept between itself and the outside world. Published in Jean-Baptiste Du Halde's monumental survey of China, it fixed for Western readers the image of a state that walled its economy and its subjects off from foreign contact.",
        "source": "Jean-Baptiste Du Halde, Description de la Chine (1735), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Du_Halde_-_Description_de_la_Chine_-_Grande_Muraille.jpg",
        "image": {
          "src": "/covers/china-red-lines-economic-model--a4.png",
          "alt": "Eighteenth-century engraving of the Great Wall of China climbing across mountainous terrain, lined with watchtowers.",
          "credit": "Engraving from Jean-Baptiste Du Halde, Description de la Chine (1735). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Great Wall at the Fort of Jiayuguan (1875)",
        "excerpt": "A watercolour view of the fortress at Jiayuguan, the great gate that closed the western end of the Ming wall and the traditional limit of the empire. Painted during a Russian expedition, it shows the massive rammed-earth ramparts and towers where China drew the line between the ordered world within and the frontier beyond.",
        "source": "Adolf Nikolay Boyarsky, view of Jiayuguan (1875), World Digital Library, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Great_Wall_as_It_Appears_near_the_Fort_at_Jiayuguan,_Gansu_Province,_China,_1875_WDL2068.png",
        "image": {
          "src": "/covers/china-red-lines-economic-model--a5.png",
          "alt": "Nineteenth-century watercolour of the fortress and gate at Jiayuguan on the western terminus of the Great Wall of China.",
          "credit": "Adolf Nikolay Boyarsky, 1875 (World Digital Library no. 2068). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "holcim-sells-philippines-huaxin",
    "headline": "Switzerland's Holcim agrees to sell its Philippines cement business to China's Huaxin Cement for about $807 million",
    "overview": "The Swiss building-materials group Holcim agreed to sell its Philippines operations to China's Huaxin Cement for about $807 million, the companies said, as Holcim continues to trim its global portfolio. The deal hands the state-backed Chinese producer a major foothold in Southeast Asia's construction market. Huaxin, which recently expanded in Africa, said the acquisition fit its overseas growth strategy.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQRVVGZmt6VDlQODNUNGdYbUhqdmtGdUNDU0gycTNuU1RaWXFEUFNXNEswbTN4LW1zNnJKdkYwTWtYTy1NZTY0UFRmRlZzNkpyZmxKQnpzMXJ4NWd4N24weXA5YlRxdV9IZU1RVDFDTFJGLU5lZE9xSWNEdkJEYi0yNG1rZ19rU0tncC1wQ2ljN19IdVI1RVBJeTFzZXhBNEg1NGJRLVFZMDRjUS1aNVZ4bzRhSEY5aHpH?oc=5"
      },
      {
        "name": "Inquirer.net",
        "href": "https://news.google.com/rss/articles/CBMiggFBVV95cUxNVzlOTEZsOE16ZkJkMmJlWGw5SjNMWFlZWnZ1dTNlR0ZMSEtHYXFhRUVqT1Jrd3RXRHhQY3R3bklBN2xFcWtEcWpLb1lJMjVmSmtuY2lXQWNjRmw5a3VFZ3VLd20tUnIyZXE3Q1pUbElJZnp2bXhicHlic0NQckRlOUln0gGHAUFVX3lxTE5XQl9VdnN0RE5iZzlPaDg4eHNCRXJIelJtaFByWlRFcVQwbEMyTlJyd0lrWGJ4T3I4M0hkMmVOR1FwbDRUdGpPRzRSVVMtbUJLbGZaRURfVDg2R1pCekU4UG5zY3ltSlplbVBFNzdrcTdQc2kwYW5xM19pV1NUMVJyYjVKa1JvNA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/holcim-sells-philippines-huaxin.png",
      "alt": "A Holcim cement plant at Portland, Colorado, its kilns, storage silos and conveyors standing against a dry western landscape.",
      "credit": "Photo: Jeffrey Beall, CC BY-SA 4.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Britain buys Egypt's share of the Suez Canal (1875)",
        "excerpt": "In 1875, debt-ridden Egypt was forced to sell its stake in the company that owned the newly cut Suez Canal, the great waterway carved through the desert to join two seas. Prime Minister Benjamin Disraeli moved within days, borrowing millions from the Rothschilds to seize the khedive's 177,000 shares before France could. Overnight a rising imperial power became the largest single shareholder in a strategic foreign enterprise, buying its way to a foothold on the road to the East.",
        "source": "Wikipedia: Suez Canal Company",
        "href": "https://en.wikipedia.org/wiki/Suez_Canal_Company"
      },
      {
        "category": "historical",
        "title": "Japan's Mitsubishi buys into Rockefeller Center (1989)",
        "excerpt": "At the height of Japan's 1980s boom, Mitsubishi Estate paid hundreds of millions of dollars for a controlling share of the Rockefeller Group, owner of Manhattan's most storied cluster of skyscrapers. To many Americans it looked like a rising economic power buying up the very landmarks of another nation's ambition. The trophy soon soured: within a few years the property slid into bankruptcy and the Japanese owners walked away.",
        "source": "Wikipedia: Rockefeller Center",
        "href": "https://en.wikipedia.org/wiki/Rockefeller_Center"
      },
      {
        "category": "literary",
        "title": "The Tower of Babel (Genesis 11:3-4, KJV)",
        "excerpt": "3 And they said one to another, Go to, let us make brick, and burn them throughly. And they had brick for stone, and slime had they for morter.\n4 And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "The Holy Bible, King James Version, Genesis 11:3-4 (Christian Classics Ethereal Library)",
        "href": "https://ccel.org/ccel/bible/kjv.Gen.11.html"
      },
      {
        "category": "literary",
        "title": "Except the Lord build the house (Psalm 127:1, KJV)",
        "excerpt": "Except the Lord build the house, they labour in vain that build it: except the Lord keep the city, the watchman waketh but in vain.",
        "source": "The Holy Bible, King James Version, Psalm 127:1 (Christian Classics Ethereal Library)",
        "href": "https://ccel.org/ccel/bible/kjv.Ps.127.html"
      },
      {
        "category": "artistic",
        "title": "The Tower of Babel - Pieter Bruegel the Elder (1563)",
        "excerpt": "The paintings depict the construction of the Tower of Babel, which, according to the Book of Genesis in the Bible, was built by a unified, monolingual humanity as a mark of their achievement and to prevent their dispersion",
        "source": "Wikipedia: The Tower of Babel (Bruegel)",
        "href": "https://en.wikipedia.org/wiki/The_Tower_of_Babel_(Bruegel)",
        "image": {
          "src": "/covers/holcim-sells-philippines-huaxin--a4.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting of the Tower of Babel: a vast, half-finished spiral tower under construction, rising through the clouds above a Flemish port city.",
          "credit": "Pieter Bruegel the Elder, 1563 (Kunsthistorisches Museum, Vienna). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Stonemason's Yard - Canaletto (c. 1725)",
        "excerpt": "Several masons are at work shaping and carving stone probably destined for the reconstruction of the nearby church of San Vidal",
        "source": "Wikipedia: The Stonemason's Yard",
        "href": "https://en.wikipedia.org/wiki/The_Stonemason%27s_Yard",
        "image": {
          "src": "/covers/holcim-sells-philippines-huaxin--a5.png",
          "alt": "Canaletto's mid-1720s painting of a Venetian campo turned into a working stonemasons' yard, with rough blocks of stone and labourers at work beside the Grand Canal.",
          "credit": "Giovanni Antonio Canal (Canaletto), c. 1725 (The National Gallery, London). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "south-korea-record-temperature-yangsan",
    "headline": "South Korea records its highest temperature ever, 42.5C in Yangsan, breaking a 122-year national record",
    "overview": "The southern city of Yangsan reached 42.5 degrees Celsius (108.5 F), the highest temperature ever recorded in South Korea, breaking a national record that had stood since observations began more than a century ago, the Korea Meteorological Administration said. Authorities issued urgent heat warnings and told residents in the worst-hit areas to move immediately to cooling shelters. The record capped a brutal heatwave that has strained the country's power grid and been linked to a rising heat death toll.",
    "genre": "Science",
    "sources": [
      {
        "name": "The Japan Times",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxPQzdSREUxZHR3eHlrZ2std29BNkM2ZV9SUVhfcmxKcDROXzZhR1ZMdFZjV2M1elExQXlGMS1ZZzZadTFCaTdrbzhDSl80dE9fVndfTHBEdHVKZXNfQTJKdE5uRVRDSWx1d2ZGdy1CWkJESXFsVFVsVVRyYUhiZGE4M3pfWTJNLTBWUkp6TjdLRnk1OFk?oc=5"
      },
      {
        "name": "Korea JoongAng Daily",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPS0ViMmxZSnFPSndiSHEweGtVMWJCNDdXa2xtWnJaY19uOTFycnpzQzlsQXRaMnhWbWlzQVVaMkZiaHphNXhjMzFjaWh5NWNUTHB2U2pnbWRKdVJGcFhDMEZ0M0RPaGVPOEE0bm1lZUVZeGljNUQ0X0VnWGNTSXcwODVzLUF1clRObE0ybHplMU5XZ0JfOXhpZTZjamxoM0lqOTZqTktn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/south-korea-record-temperature-yangsan.png",
      "alt": "Sun-baked, cracked and fissured dry mud of a drought-stricken reservoir bed under a bright sky.",
      "credit": "Hydrosami, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "A Roman Drought Recorded by Livy (c. 435 BC)",
        "excerpt": "Not only was there an absence of water from the heavens, but the earth, through lack of its natural moisture, barely sufficed to keep the rivers flowing.",
        "source": "Livy, The History of Rome, Book 4.30 (trans. Rev. Canon Roberts), via the Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=4:chapter=30"
      },
      {
        "category": "historical",
        "title": "The 2003 European Heatwave",
        "excerpt": "In the summer of 2003 a stubborn heat dome settled over Europe and would not lift, driving thermometers past 40C from Iberia to the Rhine. More than 70,000 people died before it broke, over 14,000 in France alone, most of them elderly and alone in cities never built to shed such heat. It remains the deadliest natural disaster in modern European memory, a warning of how a heatwave kills quietly and at scale.",
        "source": "Wikipedia, \"2003 European heatwave\"",
        "href": "https://en.wikipedia.org/wiki/2003_European_heatwave"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II — The Fall of Phaethon",
        "excerpt": "The Clouds disperse in Fumes, the wond'ring Moon\nBeholds her Brother's Steeds beneath her own;\nThe Highlands smoak, cleft by the piercing Rays,\nOr, clad with Woods, in their own Fewel blaze.\nNext o'er the Plains, where ripen'd Harvests grow,\nThe running Conflagration spreads below.\nBut these are trivial Ills: whole Cities burn,\nAnd peopled Kingdoms into Ashes turn.",
        "source": "Ovid, Metamorphoses, Book II, trans. Sir Samuel Garth, John Dryden et al. (1717), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Metamorphoses_(tr._Garth,_Dryden,_et_al.)/Book_II"
      },
      {
        "category": "literary",
        "title": "The Book of Revelation — The Fourth Vial Poured on the Sun",
        "excerpt": "And the fourth angel poured out his vial upon the sun; and power was given unto him to scorch men with fire.",
        "source": "The Holy Bible, King James Version, Revelation 16:8",
        "href": "https://biblehub.com/kjv/revelation/16.htm"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, Regulus (1828)",
        "excerpt": "It is dominated by the large white sun in the centre.",
        "source": "Wikipedia, \"Regulus (Turner)\"",
        "href": "https://en.wikipedia.org/wiki/Regulus_(Turner)",
        "image": {
          "src": "/covers/south-korea-record-temperature-yangsan--a4.png",
          "alt": "J. M. W. Turner's painting Regulus: a classical harbour scene overwhelmed by a huge blazing white sun burning at its centre.",
          "credit": "J. M. W. Turner, Regulus (1828, reworked 1837), Tate. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, The Fall of Phaeton (c. 1604–1605)",
        "excerpt": "Rubens chose to depict the myth at the height of its action, with the thunderbolts hurled by Zeus to the right. The thunderbolts provide the light contrast to facilitate the display of horror on the faces of Phaeton, the horses and other figures while preserving the darkness of the event.",
        "source": "Wikipedia, \"The Fall of Phaeton (Rubens)\"",
        "href": "https://en.wikipedia.org/wiki/The_Fall_of_Phaeton_(Rubens)",
        "image": {
          "src": "/covers/south-korea-record-temperature-yangsan--a5.png",
          "alt": "Peter Paul Rubens's painting The Fall of Phaeton, showing Phaethon and the panicked sun-chariot horses tumbling from the sky amid thunderbolts.",
          "credit": "Peter Paul Rubens, The Fall of Phaeton (c. 1604/1605), National Gallery of Art, Washington. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "spider-man-brand-new-day-box-office",
    "headline": "'Spider-Man: Brand New Day' opens to $355 million in North America and $927 million worldwide, one of the biggest debuts ever",
    "overview": "'Spider-Man: Brand New Day' took in about $355 million in North America, the second-biggest domestic opening on record, and roughly $927 million worldwide in its first weekend, distributor figures showed. The blockbuster gave cinemas one of their strongest results since the pandemic. Its debut trailed only the largest openings in Hollywood history for a domestic bow.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMihwFBVV95cUxQVU5HWmxndk5IaGVQT2tkRnZncDhoejZsSjdDVGQ3V0FCbWhzN1hBd1NHWWFISmYtY3Y5SmVLU0tHNDA5cWZRR09SeWFvY21lLUZoZ0xFXzBZY1dVd2dqM3UyRVFvNUpJYllxaWZZN25fRVh1al9GNWQ1SnBLSm1DcDhuSTh6SU0?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQdFlQbEdGa3g5TjA2Sno1dk5icnlES2wwWHE3MGtQcy1aMUE1d0RiWkU3SmRHMmloT25HeTlJWW8zLTdRdTJfdnFScWlBeDZQYklvRjR5SzFLUlVpZ3lLY3hIZUZnZEVUajRlZ1BJUGEtNzJpdFA5ZTFIaHBaN2tzX3FiVjJib2FsR1lqV2pkWFVSSFNfb01PcEdHajBVc2c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/spider-man-brand-new-day-box-office.png",
      "alt": "A grand movie palace's illuminated marquee and vertical blade sign blaze against the night sky.",
      "credit": "Steve Morgan, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Juvenal, \"Satires\" X — \"bread and circuses\"",
        "excerpt": "For that sovereign people that once gave away military command, consulships, legions, and every thing, now bridles its desires, and limits its anxious longings to two things only—bread, and the games of the circus!",
        "source": "Juvenal, \"The Satires,\" Satire X, translated by the Rev. Lewis Evans (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/50657/50657-h/50657-h.htm"
      },
      {
        "category": "historical",
        "title": "P. T. Barnum on the crowds for Jenny Lind (1850)",
        "excerpt": "Thousands of persons covered the shipping and piers, and other thousands had congregated on the wharf at Canal Street, to see her. The wildest enthusiasm prevailed as the steamer approached the dock.",
        "source": "P. T. Barnum, \"Struggles and Triumphs: or, Forty Years' Recollections of P. T. Barnum\" (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/50115/50115-h/50115-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare, \"Julius Caesar\" (Act I, Scene 1)",
        "excerpt": "Knew you not Pompey? Many a time and oft\nHave you climb’d up to walls and battlements,\nTo towers and windows, yea, to chimney tops,\nYour infants in your arms, and there have sat\nThe livelong day with patient expectation,\nTo see great Pompey pass the streets of Rome.",
        "source": "William Shakespeare, \"The Tragedy of Julius Caesar,\" Act I, Scene 1 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1522/1522-h/1522-h.htm"
      },
      {
        "category": "literary",
        "title": "Lew Wallace, \"Ben-Hur\" — the chariot-race crowd",
        "excerpt": "Forth from each stall, like missiles in a volley from so many great guns, rushed the six fours; and up the vast assemblage arose, electrified and irrepressible, and, leaping upon the benches, filled the Circus and the air above it with yells and screams. This was the time for which they had so patiently waited!—this the moment of supreme interest treasured up in talk and dreams since the proclamation of the games!",
        "source": "Lew Wallace, \"Ben-Hur: A Tale of the Christ\" (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/2145/2145-0.txt"
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme, \"Pollice Verso\" (1872)",
        "excerpt": "Gérôme freezes the instant a triumphant gladiator plants his foot on a fallen foe and looks up for the verdict. Above him the packed tiers of the Colosseum surge forward as one, thumbs jabbing downward, faces bright with bloodlust. It is the ancient blockbuster crowd made visible: tens of thousands fused into a single roar by one staged spectacle.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Leon_Gerome_Pollice_Verso.jpg",
        "image": {
          "src": "/covers/spider-man-brand-new-day-box-office--a4.png",
          "alt": "A victorious Roman gladiator stands over a defeated opponent as the crowded arena tiers thrust their thumbs downward.",
          "credit": "Jean-Léon Gérôme, \"Pollice Verso\" (1872), Phoenix Art Museum. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier, \"The Melodrama\" (c. 1860)",
        "excerpt": "Daumier turns his back on the stage to paint the audience itself, a compact wall of rapt faces rising out of the darkness toward the footlights. Lips part, eyes widen, and hands clutch at collars as the packed house loses itself in the drama. He captures the essential magic of mass entertainment: a crowd of strangers fused into one held breath.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_026.jpg",
        "image": {
          "src": "/covers/spider-man-brand-new-day-box-office--a5.png",
          "alt": "A densely packed theatre audience emerges from shadow, faces turned in rapt attention toward a brightly lit stage.",
          "credit": "Honoré Daumier, \"The Melodrama\" (c. 1860), Neue Pinakothek, Munich. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "bayreuth-wagner-ai-staging-booed",
    "headline": "An AI-assisted staging draws sustained boos at Germany's Bayreuth Festival of Richard Wagner's operas",
    "overview": "A new production at Germany's Bayreuth Festival that used artificial-intelligence-assisted staging and imagery drew loud boos from the audience at its premiere, in the latest clash over AI's place in the arts. The festival, devoted to the operas of Richard Wagner and held at the composer's purpose-built theatre, is one of classical music's most tradition-bound institutions. Directors and critics were divided over whether the technology enriched or cheapened the work.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQY3ozYU5WMW5HQTZ6cTJUaWk1dWxtRmVmQXhFOTBxa25rWUpZYVZPTHBsaXRwcFE5d3hCX2NtLU42cWk5Nm9LVHhhaDN4VWFKSWl5cHBNQUI5MFQ5U2JKUHh4cVF3Zk1MeTRrMndfenkyZmJqQ2RyTWsxYkRGTXJJUk54UndCak5BQXVVdmZtdDRsbWhpaENHS1lsWQ?oc=5"
      },
      {
        "name": "WRBL",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxOdzdnRE5OeDNOMkpOWE55Rm1KeXdYODFBSS15cXhscEE4QktFOFVWMWtTREd0cndsWmg3cklvNndid2p5QU5iaHNFeDBWWjZsVW9fdVJ0SzAwWlNmQWNqbERIYjhBblo2bFUxczdrWlJsWUMyNWM0aDZZdTI3RE5MVlRzc3NnaXZZam5mN3RxcE82SWt4d2VTSUJnWUtDaHBUaU9wV2ZwMXp0YmYzUFVGdkpMVEdqMzJlV1BTMDljSkY1aEhiWlI3VlM5YTbSAdIBQVVfeXFMT2pUWlAwM2ZWLTNGRVdEcC01S3h4b2FfSWo3NU9mS0VLSnZ3ZklUNC1XdFVtTjlUcGRsX09fbEtRRmo5dUhOUHFOSnp3OWhmTDl1a2RGaFp1VDc3Q0JXM254TDFWSzlGV1JBUlFWUVdKaF9jTEhtM3VXU2RGVFYxSGFpbGlLTUpGR284dmV2NUpobEhoZ3lFWndCYWVwbFBySWdNRlhCb2tpMkZrQXZDazM5djl2M25VZDgyRXo1cnFzNC1FSVBnRktmWUdUdnZHMThB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/bayreuth-wagner-ai-staging-booed.png",
      "alt": "Exterior of the Bayreuth Festspielhaus, Richard Wagner's festival theatre on the Green Hill above Bayreuth, seen from the front.",
      "credit": "Bayreuth Festspielhaus (2016). Photo by El Grafo, CC BY-SA 4.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Battle of Hernani (1830)",
        "excerpt": "On the night of 25 February 1830, Victor Hugo's Hernani turned the Comedie-Francaise into a battlefield. Long-haired young Romantics, packed into the pit with tickets Hugo himself had handed out, roared their approval while the powdered partisans of classical tragedy hissed and jeered from the boxes. The uproar over Hugo's rule-breaking verse raged on through the run, and the 'Battle of Hernani' became the founding legend of a new artistic generation storming an old order.",
        "source": "Battle of Hernani, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Battle_of_Hernani"
      },
      {
        "category": "historical",
        "title": "The Riot at The Rite of Spring (1913)",
        "excerpt": "When Stravinsky's The Rite of Spring erupted at the Theatre des Champs-Elysees on 29 May 1913, its pounding rhythms and Nijinsky's jolting choreography split the audience into warring camps. Catcalls and laughter swelled into a near-riot of shouting and scuffles, so loud that the dancers could barely hear the orchestra and dozens of the rowdiest spectators were reportedly ejected. What scandalized Paris that night has since become one of the pillars of modern music.",
        "source": "The Rite of Spring, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Rite_of_Spring"
      },
      {
        "category": "literary",
        "title": "Richard Wagner, The Art-Work of the Future (1849)",
        "excerpt": "The great United Art-work, which must gather up each branch of art to use it as a mean, and in some sense to undo it for the common aim of all, for the unconditioned, absolute portrayal of perfected human nature, this great United Art-work he cannot picture as depending on the arbitrary purpose of some human unit, but can only conceive it as the instinctive and associate product of the Manhood of the Future.",
        "source": "Richard Wagner, 'The Art-Work of the Future', in Richard Wagner's Prose Works, Vol. I, trans. William Ashton Ellis (London: Kegan Paul, Trench, Trubner, 1895)",
        "href": "https://archive.org/stream/richardwagnerspr011341mbp/richardwagnerspr011341mbp_djvu.txt"
      },
      {
        "category": "literary",
        "title": "Samuel Butler, Erewhon: The Book of the Machines (1872)",
        "excerpt": "But who can say that the vapour engine has not a kind of consciousness? Where does consciousness begin, and where end? Who can draw the line? Who can draw any line? Is not everything interwoven with everything?",
        "source": "Samuel Butler, Erewhon; Or, Over the Range (1872), Chapter XXIII, 'The Book of the Machines', via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1906/1906-h/1906-h.htm"
      },
      {
        "category": "artistic",
        "title": "Pierre-Auguste Renoir, Richard Wagner (1882)",
        "excerpt": "Renoir painted this portrait of Richard Wagner in Palermo in January 1882, working from a single sitting of barely thirty-five minutes. The Impressionist's loose, rapid brushwork fixes the ageing composer at the height of his fame, only a year before his death. The encounter brought face to face two very different revolutionaries of nineteenth-century art.",
        "source": "Pierre-Auguste Renoir, 'Richard Wagner' (1882), Musee d'Orsay, Paris, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pierre_auguste_renoir,_richard_wagner,_1882.JPG",
        "image": {
          "src": "/covers/bayreuth-wagner-ai-staging-booed--a4.png",
          "alt": "Impressionist oil portrait of an elderly Richard Wagner, head and shoulders, against a soft blue-grey background.",
          "credit": "Pierre-Auguste Renoir, 'Richard Wagner' (1882), Musee d'Orsay, Paris. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Honore Daumier, The Melodrama (c. 1860)",
        "excerpt": "Instead of the stage, Honore Daumier turned his brush on the audience itself. In 'The Melodrama' the spectators lean forward out of the shadows, their upturned faces caught in the glare of the footlights, rapt and anxious before a drama we never see. Painted around 1860, it is among the first works to make the reacting crowd, rather than the performance, its true subject.",
        "source": "Honore Daumier, 'The Melodrama' (Das Drama), c. 1860, Neue Pinakothek, Munich; Melodrama (Daumier), Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Melodrama_(Daumier)",
        "image": {
          "src": "/covers/bayreuth-wagner-ai-staging-booed--a5.png",
          "alt": "Painting of a darkened theatre audience, pale faces lit from below by stage light, watching an unseen stage.",
          "credit": "Honore Daumier, 'The Melodrama' (Das Drama), c. 1860, Neue Pinakothek, Munich. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "evian-la-source-vive-concert-hall",
    "headline": "French studio PCA-Stream completes La Source Vive, a domed, copper-clad chamber-music hall above Lake Geneva in Evian",
    "overview": "The French studio PCA-Stream has completed La Source Vive, a 490-seat chamber-music hall in Evian, France, designed 'as a musical instrument' with its form shaped by acoustics. Clad in copper shingles and set into a sloping woodland site overlooking Lake Geneva, it sits beside Patrick Bouchain's 1993 timber concert hall La Grange au Lac. The dome and curved timber interior were tuned to carry sound for intimate classical performances.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/08/02/pca-stream-la-source-vive/"
      },
      {
        "name": "RIBA Journal",
        "href": "https://news.google.com/rss/articles/CBMihwFBVV95cUxPbUtmMnphUGUxYmIyQ3MtMFNYNDAxMnlaMWJwdGN2WUxGam14TU1ZT29BRHVsUE4ybjNSZXFuRmlqSjZTaF9sOEtHU2JDLWkxYmNyaXpWNUZxd2NSN2ZjQzIzTXp3VC1wSlVoUWxjNjF4TExlcDZuWm9PUG4yY3RSUFR4WVVVSlk?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/evian-la-source-vive-concert-hall.png",
      "alt": "An aerial view of a domed, shingle-clad concert hall nestled among autumn woodland, with a long dark-roofed timber walkway leading to it.",
      "credit": "Dezeen"
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The ancient theatre of Epidaurus",
        "excerpt": "Cut into the slope of Mount Kynortion in the 4th century BC and credited to Polykleitos the Younger, the theatre of Epidaurus seated some 14,000 spectators and is renowned for acoustics so exact that a coin dropped or a voice raised on the orchestra floor carries clearly to the topmost tier. Modern researchers trace the effect to the corrugated limestone seating, which acts as an acoustic filter, damping low-frequency crowd murmur while letting the performers' higher voices through. More than two millennia before the science of acoustics existed, its builders had shaped raked stone into an instrument for the human voice.",
        "source": "Theatre of Epidaurus (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Theatre_of_Epidaurus"
      },
      {
        "category": "historical",
        "title": "Boston Symphony Hall, tuned by physics",
        "excerpt": "When Symphony Hall opened in 1900, it became the first auditorium in the world designed according to quantifiable acoustic principles, after the young Harvard physicist Wallace Clement Sabine worked out the founding equations of reverberation for its architects. Its narrow 'shoebox' proportions, coffered ceiling and statue-filled niches were dimensioned to sustain and diffuse sound rather than merely to shelter an audience. The result is still counted among the finest concert halls ever built, the moment architecture was first calculated as an instrument.",
        "source": "Symphony Hall, Boston (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Symphony_Hall,_Boston"
      },
      {
        "category": "literary",
        "title": "Goethe: architecture as frozen music",
        "excerpt": "A noble philosopher spoke of architecture as frozen music; and it was inevitable that many people should shake their heads over his remark. We believe that no better repetition of this fine thought can be given than by calling architecture a speechless music.",
        "source": "Johann Wolfgang von Goethe, The Maxims and Reflections of Goethe (trans. Bailey Saunders), no. 493 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/33670/33670-h/33670-h.htm"
      },
      {
        "category": "literary",
        "title": "Vitruvius on siting a theatre for the voice",
        "excerpt": "All this having been settled with the greatest pains and skill, we must see to it, with still greater care, that a site has been selected where the voice has a gentle fall, and is not driven back with a recoil so as to convey an indistinct meaning to the ear.",
        "source": "Vitruvius, The Ten Books on Architecture, Book V, Chapter VIII (trans. Morris Hicky Morgan; Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/20239/20239-h/20239-h.htm"
      },
      {
        "category": "artistic",
        "title": "Raphael, The Ecstasy of Saint Cecilia",
        "excerpt": "The Saint Cecilia Altarpiece is an oil painting by the Italian High Renaissance master Raphael. Completed in his later years, in around 1516–1517, the painting depicts Saint Cecilia, the patron saint of musicians and Church music, listening to a choir of angels in the company of Saints Paul, John the Evangelist, Augustine and Mary Magdalene.",
        "source": "The Ecstasy of Saint Cecilia (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/The_Ecstasy_of_Saint_Cecilia",
        "image": {
          "src": "/covers/evian-la-source-vive-concert-hall--a4.png",
          "alt": "Saint Cecilia stands holding a portative organ whose pipes slip from her hands as she gazes up toward a choir of angels, flanked by four saints, with musical instruments scattered at her feet.",
          "credit": "Raphael, The Ecstasy of Saint Cecilia (c. 1516–1517), Pinacoteca Nazionale di Bologna. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Vermeer, The Music Lesson",
        "excerpt": "The Music Lesson, Woman Seated at a Virginal or A Lady at the Virginals with a Gentleman by Johannes Vermeer is a painting of a young female pupil playing a virginal during a music lesson with a male teacher.",
        "source": "The Music Lesson (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/The_Music_Lesson",
        "image": {
          "src": "/covers/evian-la-source-vive-concert-hall--a5.png",
          "alt": "In a sunlit Dutch interior with a tiled floor and a leaded window, a woman stands at a virginal with her back to the viewer while a man beside her listens; a viola da gamba rests on the floor.",
          "credit": "Johannes Vermeer, The Music Lesson (c. 1662–1665), Royal Collection. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "uganda-netanyahu-entebbe-statue",
    "headline": "Uganda unveils a statue of Yonatan Netanyahu, the Israeli commander killed in the 1976 Entebbe rescue, on the raid's 50th anniversary",
    "overview": "Uganda unveiled a monument to Lieutenant Colonel Yonatan 'Yoni' Netanyahu, the only Israeli soldier killed leading the 1976 raid that freed more than 100 hostages held at Entebbe airport, marking the operation's 50th anniversary. Ugandan army chief Gen Muhoozi Kainerugaba, who led the ceremony, praised Netanyahu's 'courage and selfless service' and hailed warming ties with Israel. The statue, showing Netanyahu striding forward, stands outside the old airport terminal where the rescue took place.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c9v471x89m3o"
      },
      {
        "name": "The Times of Israel",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxOUWRINVBNX3dpQUh4M3V3NWh0UWZXaGhWNUFMUTRpYmhRY1pXejd1Q18zQjd5cVpLd0YzZTUxdEIxcUN0TnpRblRDYVRDNnNHaHJUZXZiaHZDV1ZfWUNnQVdsVFFvM2gzc0JNYm8tS0l0LXdSYVNWdWVUNFNBLTVYanptYkgzTUZvOUQyMkR1RE5wVFBlSTB6cUZOWXJOOV9vUGJHdldRclRrT2tlYXpnbtIBtgFBVV95cUxOOHI0YzBUSmh0UXgta09BTjZvdEFmZHZQdjdBYlo5TnZuRTM3R3czS3hZZHpEQUdvc1dRU1JtdmJ6VEhwYmQxU3IyNk9DaFBmMWs4MC1vTVEzUm5nSVlON0xWYTdOMHJHSThXaGdvX01rRzVrZWtMbVB3ajVMTWdWRE5PWWNZWGc5dURjWjhBNmo3UlRLRE5xV2ZhcmJPeF9yUEczbmJiZFhQWGFGRGdjcFVNWHd3QQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/uganda-netanyahu-entebbe-statue.png",
      "alt": "An archival black-and-white portrait of Lieutenant Colonel Yonatan 'Yoni' Netanyahu, who was killed leading the 1976 Entebbe rescue.",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Xenophon's Ten Thousand reach the sea",
        "excerpt": "Xenophon settled in his mind that something extraordinary must have happened, so he mounted his horse, and taking with him Lycius and the cavalry, he galloped to the rescue. Presently they could hear the soldiers shouting and passing on the joyful word, \"The sea! the sea!\"",
        "source": "Xenophon, Anabasis, Book IV (trans. H. G. Dakyns), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1170/pg1170.txt"
      },
      {
        "category": "historical",
        "title": "Henry Havelock and the relief of Lucknow",
        "excerpt": "In the autumn of 1857, General Henry Havelock drove his outnumbered column through rebel-held country to break the siege of the Lucknow Residency, where British families had been trapped for months. His force cut its way in, only to be besieged in turn until a second army could escort the survivors safely out. Havelock, the commander who had fought his way to the captives, died of dysentery within days of their deliverance, never to see home again.",
        "source": "Henry Havelock, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Henry_Havelock"
      },
      {
        "category": "literary",
        "title": "David recovers the captives at Ziklag (1 Samuel 30)",
        "excerpt": "And David recovered all that the Amalekites had carried away: and David rescued his two wives.\nAnd there was nothing lacking to them, neither small nor great, neither sons nor daughters, neither spoil, nor any thing that they had taken to them: David recovered all.",
        "source": "The Bible, King James Version, 1 Samuel 30:18-19 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "David's lament: 'How are the mighty fallen' (2 Samuel 1)",
        "excerpt": "How are the mighty fallen in the midst of the battle! O Jonathan, thou wast slain in thine high places.\nI am distressed for thee, my brother Jonathan: very pleasant hast thou been unto me: thy love to me was wonderful, passing the love of women.\nHow are the mighty fallen, and the weapons of war perished!",
        "source": "The Bible, King James Version, 2 Samuel 1:25-27 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/2_Samuel"
      },
      {
        "category": "artistic",
        "title": "Benjamin West, The Death of General Wolfe (1770)",
        "excerpt": "Benjamin West froze the moment a victorious commander slips away, painting General James Wolfe sinking into the arms of his officers on the Plains of Abraham just as word arrives that Quebec is won. Grieving soldiers cluster around the pale, Christ-like figure, turning a battlefield death into a secular Deposition. The canvas made the fallen leader an instant icon, mourning cast in oil the way Entebbe's hero is now cast in bronze.",
        "source": "The Death of General Wolfe, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Death_of_General_Wolfe",
        "image": {
          "src": "/covers/uganda-netanyahu-entebbe-statue--a4.png",
          "alt": "Oil painting of the mortally wounded General Wolfe reclining amid a ring of officers and soldiers on the battlefield, a red flag and stormy sky behind them.",
          "credit": "Benjamin West, The Death of General Wolfe (1770), oil on canvas, National Gallery of Canada. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "John Singleton Copley, The Death of Major Peirson (1783)",
        "excerpt": "John Singleton Copley painted the young Major Francis Peirson struck down in the very instant of triumph, as his men repel a French invasion in the streets of St Helier. Around the fallen officer the battle still rages, smoke and banners swirling while a servant avenges him and townsfolk flee. The picture makes a martyr of the commander who fell securing the safety of others, the same paradox now memorialized outside Entebbe's old terminal.",
        "source": "The Death of Major Peirson, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Death_of_Major_Peirson",
        "image": {
          "src": "/covers/uganda-netanyahu-entebbe-statue--a5.png",
          "alt": "Oil painting of a street battle in which the fallen Major Peirson is held by fellow soldiers amid gunsmoke, waving flags, and fleeing civilians.",
          "credit": "John Singleton Copley, The Death of Major Peirson, 6 January 1781 (1783), oil on canvas, Tate. Public domain, via Wikimedia Commons."
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
