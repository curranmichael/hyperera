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

// Hand-curated front page. Three separated editions are shown, newest first:
// the Evening Edition of 2 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Afternoon Edition and the Morning Edition of 2 July 2026.
// Stories are selected from the live RSS feeds in `lib/feeds.ts`. The analogies are
// the heart of each story: six per event, two per category, each linking to a real
// human-written source (a primary text, museum object page, or archive). Excerpts
// quote the most relevant passage verbatim where the source is public domain, and
// otherwise describe rather than quote. Covers are dithered local copies: feed or
// rights-clean Wikimedia art/photos credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated"). Source links to AP/Reuters
// are Google News redirects (see `lib/feeds.ts`).
const stories: Story[] = [
    {
      "slug": "iiss-russia-shadow-fleet-drone-campaign",
      "headline": "Russia likely launched drones over Europe from disguised shadow-fleet ships, IISS report finds",
      "overview": "A report published Thursday by the International Institute for Strategic Studies plotted 144 suspected drone sightings across NATO members including Germany, France, Belgium, the Netherlands, the UK and Denmark between 2024 and 2026, peaking in late 2025 and forcing temporary closures of several European airports. The IISS concluded it is highly likely that Russia used sanctions-dodging \"shadow fleet\" tankers as covert launch platforms, in a gray-zone campaign designed to stay below the threshold of a collective NATO response that it called a \"strategic failure\" for European air defences.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTE1Wd2lXcWMwR2JGT0xxSG5EakhLN3V2YWxxeFkwN1FMY1d3LW83dGRoMFU5R0xUOEk0cDAtVVdxVmM5ZWp0T1daWXN5OXRudEkwR1Vqa1FkRTktY3BNZDB2LWRRWUlicUE?oc=5"
        },
        {
          "name": "Washington Post",
          "href": "https://www.washingtonpost.com/national/2026/07/02/russia-drones-europe-defense/a9aba20e-75f0-11f1-b665-5f8be87f3787_story.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/iiss-russia-shadow-fleet-drone-campaign.png",
        "alt": "A lone oil tanker riding low on a grey open sea under an overcast sky.",
        "credit": "Wikimedia Commons"
      },
      "lead": true,
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "E. Keble Chatterton, \"Q-Ships and Their Story\" (1922) — Royal Navy decoy vessels disguised as harmless merchantmen to hunt U-boats",
          "excerpt": "The basic plan was for the Admiralty to take up a number of merchantmen and fishing craft, arm them with a few light quick-firing guns, and then send them forth to cruise in likely submarine areas, flying neutral colours.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/54338/54338-h/54338-h.htm"
        },
        {
          "category": "historical",
          "title": "Sun Tzu, \"The Art of War,\" translated by Lionel Giles (1910) — on deception as the foundation of warfare",
          "excerpt": "All warfare is based on deception. Hence, when able to attack, we must seem unable; when using our forces, we must seem inactive; when we are near, we must make the enemy believe we are far away; when far away, we must make him believe we are near. Hold out baits to entice the enemy.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/132/132-h/132-h.htm"
        },
        {
          "category": "literary",
          "title": "Virgil, \"Aeneid,\" Book II, translated by John Dryden (1697) — Laocoön warns of the armed foe hidden inside the Trojan Horse",
          "excerpt": "This hollow Fabrick either must inclose, Within its blind Recess, our secret Foes; Or tis an Engine rais'd above the Town, T' o'erlook the Walls, and then to batter down. Somewhat is sure design'd; by Fraud or Force; Trust not their Presents, nor admit the Horse.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
        },
        {
          "category": "literary",
          "title": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner\" (1834) — the spectre-bark crewed by Death and Life-in-Death",
          "excerpt": "And is that Woman all her crew? Is that a DEATH? and are there two? Is DEATH that woman's mate? Her lips were red, her looks were free, Her locks were yellow as gold: Her skin was as white as leprosy, The Night-Mare LIFE-IN-DEATH was she, Who thicks man's blood with cold.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
        },
        {
          "category": "artistic",
          "title": "Giovanni Domenico Tiepolo, \"The Procession of the Trojan Horse in Troy\" (c. 1773), National Gallery, London",
          "excerpt": "Tiepolo paints the fatal moment of triumph: crowds strain at ropes to haul the towering wooden horse through Troy's breached wall, mistaking a hidden strike force for a votive gift. The disguised vessel glides in beneath a bright sky while the city celebrates its own undoing. It is the perfect emblem of an attack that arrives dressed as something harmless, welcomed past the very defences meant to stop it.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Giovanni_Domenico_Tiepolo_-_The_Procession_of_the_Trojan_Horse_in_Troy_-_WGA22382.jpg",
          "image": {
            "src": "/covers/iiss-russia-shadow-fleet-drone-campaign--art.png",
            "alt": "Oil painting of Trojans hauling the giant wooden horse through the walls into their city as crowds celebrate",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Richard Wagner, \"Der fliegende Holländer\" (The Flying Dutchman), WWV 63 (1843) — the phantom ship condemned to roam the seas",
          "excerpt": "Wagner's opera conjures a spectral vessel out of storm and surging strings, a blood-red-sailed ship that materialises from the dark and vanishes again as if it were never there. Its cursed captain haunts the shipping lanes unseen, deniable, always just beyond reckoning. The music makes audible the dread of an adversary who comes and goes like a ghost, leaving only the memory of the threat behind.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Der_fliegende_Holl%C3%A4nder,_WWV_63_(Wagner,_Richard)"
        }
      ],
      "rank": 1
    },
    {
      "slug": "zuckerberg-meta-ai-agents-slower",
      "headline": "Zuckerberg tells Meta staff AI agent development is progressing slower than expected",
      "overview": "At an internal town hall on Thursday, Meta chief executive Mark Zuckerberg said work on AI agents had not \"accelerated in the way we expected\" over the past four months and acknowledged that a recent reorganization had yet to deliver its promised gains. The restructuring cut about 10 percent of Meta's workforce and moved some 7,000 employees into AI workflow teams; the company still plans to spend up to $145 billion on AI infrastructure this year, with Zuckerberg saying he expects larger returns within three to six months.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxOdGNldFRXdDZERDRIN2R3QnRmV1JuUW9saEVNdDVmTEZwdXZLSlM0MHRzN21IMlN2RTNTaDBYa1Z1YS1kVE11SUZJLUhlQktoTm1nVVp0a0x0UzFNbW5nQnhOSXJRRlkwMjY1NEVyRFVHVk5aTktfeDZ5YjRqWWxKbm5EZU1zaHFjVkh1U3hNQVBORWtVaWFyOTZUSkI1V2pfMHEyMS1pcXFwN1lN?oc=5"
        },
        {
          "name": "TechCrunch",
          "href": "https://techcrunch.com/2026/07/02/mark-zuckerberg-tells-staff-that-ai-agents-havent-progressed-as-quickly-as-hed-hoped/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/zuckerberg-meta-ai-agents-slower.png",
        "alt": "The Meta headquarters campus in Menlo Park, its infinity-loop logo mounted at the entrance.",
        "credit": "Wikimedia Commons"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Charles Mackay, \"The South-Sea Bubble,\" Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841)",
          "excerpt": "It seemed at that time as if the whole nation had turned stockjobbers.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_2"
        },
        {
          "category": "historical",
          "title": "Ferdinand de Lesseps and the French Panama Canal (1879-1889)",
          "excerpt": "Fresh from his triumph at Suez, the seventy-four-year-old de Lesseps promised investors he would carve a sea-level canal through Panama in eight years, and hundreds of thousands of French savers believed him. The jungle answered with landslides, malaria, and yellow fever that buried some twenty thousand workers, while the money vanished faster than the earth could be moved. By 1889 the company had collapsed into bankruptcy and scandal, a monument to a visionary who mistook past success for a guarantee of the next.",
          "source": "Wikipedia",
          "href": "https://en.wikipedia.org/wiki/Ferdinand_de_Lesseps"
        },
        {
          "category": "literary",
          "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818; revised 1831)",
          "excerpt": "I had worked hard for nearly two years, for the sole purpose of infusing life into an inanimate body. For this I had deprived myself of rest and health. I had desired it with an ardour that far exceeded moderation; but now that I had finished, the beauty of the dream vanished, and breathless horror and disgust filled my heart.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Frankenstein,_or_the_Modern_Prometheus_(Revised_Edition,_1831)/Chapter_5"
        },
        {
          "category": "literary",
          "title": "Johann Wolfgang von Goethe, \"The Pupil in Magic\" (Der Zauberlehrling, 1797; trans. Edgar Alfred Bowring, 1853)",
          "excerpt": "Ah, he's coming! see, / Great is my dismay! / Spirits raised by me / Vainly would I lay!",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic"
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
          "excerpt": "Bruegel's colossal tower spirals into the clouds, swarming with cranes, scaffolds, and toiling figures, yet its tilting arches already betray the flaw that will bring it down. The grandest construction project ever imagined is depicted mid-failure, its ambition visibly outrunning the stone beneath it. It is the perfect emblem of a monument begun in confidence that no amount of labor or expenditure can finish on schedule.",
          "source": "Kunsthistorisches Museum, Vienna (via Wikimedia Commons)",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
          "image": {
            "src": "/covers/zuckerberg-meta-ai-agents-slower--art.png",
            "alt": "Pieter Bruegel the Elder's 1563 painting The Tower of Babel: an immense, partly ruined spiral tower rising into clouds above a harbor, crowded with scaffolding and tiny laborers.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Thomas Cole, The Course of Empire: Destruction (1836)",
          "excerpt": "The fourth canvas in Cole's five-part cycle shows the gleaming metropolis of the previous scene engulfed in flame, its marble colonnades toppling as invaders storm across a shattered bridge. The same civilization that had crowned itself at the height of consummation is now consumed by the forces it could no longer command. Cole paints the moment when accumulated splendor and overreach curdle into ruin, the reckoning that follows every empire convinced its ascent would never stall.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg"
        }
      ],
      "rank": 2
    },
    {
      "slug": "herculaneum-scroll-ai-virtual-unwrapping",
      "headline": "Researchers virtually unwrap a carbonized Herculaneum scroll, revealing a likely Stoic philosophical text",
      "overview": "An international team led by University of Kentucky computer scientist Brent Seales, working through the Vesuvius Challenge, used artificial intelligence and synchrotron X-ray imaging to read a papyrus scroll charred by the AD 79 eruption of Mount Vesuvius and long deemed physically impossible to open. The recovered columns discuss ethics, human nature and moral progress and name Aristocreon, a disciple of the Stoic philosopher Chrysippus, placing the treatise firmly in the Stoic tradition of the second century BC.",
      "genre": "Science",
      "sources": [
        {
          "name": "Artforum",
          "href": "https://www.artforum.com/news/a-i-deciphers-ancient-carbonized-herculaneum-scroll-1234753958/"
        },
        {
          "name": "Vesuvius Challenge",
          "href": "https://scrollprize.org/firstscroll"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/herculaneum-scroll-ai-virtual-unwrapping.png",
        "alt": "A blackened, tightly rolled ancient papyrus scroll carbonized by volcanic heat.",
        "credit": "Artforum"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Lettre à M. Dacier relative à l'alphabet des hiéroglyphes phonétiques (Jean-François Champollion, 1822)",
          "excerpt": "Il s'agit de la série des hiéroglyphes qui, faisant exception à la nature générale des signes de cette écriture, étaient doués de la faculté d'exprimer les sons des mots, et ont servi à inscrire sur les monuments publics de l'Égypte, les titres, les noms et les surnoms des souverains grecs ou romains.",
          "source": "Wikisource (French)",
          "href": "https://fr.wikisource.org/wiki/Lettre_%C3%A0_M._Dacier_relative_%C3%A0_l%E2%80%99alphabet_des_hi%C3%A9roglyphes_phon%C3%A9tiques"
        },
        {
          "category": "historical",
          "title": "Discovery of the Dead Sea Scrolls (Qumran caves, from 1947)",
          "excerpt": "A shepherd chasing a stray goat into a limestone cave stumbles instead onto jars holding words that had waited in the dark for two thousand years. From eleven caves above the Dead Sea came nearly a thousand manuscripts, the oldest surviving copies of texts long known only through later hands. Like the charred Herculaneum roll, they proved that silence is not the same as loss, and that patient recovery can hand an ancient community its voice back.",
          "source": "Wikipedia",
          "href": "https://en.wikipedia.org/wiki/Dead_Sea_Scrolls"
        },
        {
          "category": "literary",
          "title": "Letters, Book VI.16, to Tacitus (Pliny the Younger, c. AD 107; Melmoth–Hutchinson translation)",
          "excerpt": "Those who were looking at the cloud from some distance could not make out from which mountain it was rising — it was afterwards discovered to have been Mount Vesuvius — but in likeness and form it more closely resembled a pine-tree than anything else, for what corresponded to the trunk was of great length and height, and then spread out into a number of branches. At times it looked white, and at other times dirty and spotted, according to the quantity of earth and cinders that were shot up.",
          "source": "Pliny the Younger, Letters (public-domain translation)",
          "href": "https://cmuntz.hosted.uark.edu/texts/pliny-the-younger/the-eruption-of-vesuvius.html"
        },
        {
          "category": "literary",
          "title": "Meditations, Book II (Marcus Aurelius, c. AD 170–180; George Long translation)",
          "excerpt": "We are made for co-operation, like feet, like hands, like eyelids, like the rows of the upper and lower teeth. To act against one another then is contrary to nature.",
          "source": "The Internet Classics Archive (MIT)",
          "href": "https://classics.mit.edu/Antoninus/meditations.2.two.html"
        },
        {
          "category": "artistic",
          "title": "The Last Day of Pompeii (Karl Bryullov, 1830–1833)",
          "excerpt": "Bryullov freezes the instant the sky turns to ash: statues topple, mothers shield children, and a lurid red glow floods a city already condemned. The eruption that buried these figures is the same catastrophe that carbonized the Herculaneum library, sealing both flesh and text in the dark. Where the painter imagines the moment of loss, the scanner now reverses it, coaxing a legible sentence out of the very ruin Bryullov mourned.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/herculaneum-scroll-ai-virtual-unwrapping--art.png",
            "alt": "Karl Bryullov's painting The Last Day of Pompeii, showing terrified citizens fleeing collapsing statues under a red, ash-filled sky during the eruption of Vesuvius",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "L'ultimo giorno di Pompei (Giovanni Pacini, opera, 1825)",
          "excerpt": "Half a century before Bryullov painted it, Pacini set the doom of Pompeii to music, letting orchestra and chorus swell toward the moment the mountain opens. The eruption is not a backdrop but the drama's climax, a rush of sound standing in for the fire that would soon fossilize an entire civilization. To read a scroll sealed by that same eruption is to answer the opera's roar with a quiet, recovered human sentence.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/L%27ultimo_giorno_di_Pompei_(Pacini,_Giovanni)"
        }
      ],
      "rank": 3
    },
    {
      "slug": "who-ebola-treatment-trial-drc",
      "headline": "WHO begins clinical trial of two Ebola therapeutics in DR Congo as outbreak passes 430 deaths",
      "overview": "The World Health Organization announced Thursday that the first patient has been enrolled in a clinical trial of two potential treatments for the Bundibugyo strain of Ebola driving the current outbreak in the Democratic Republic of Congo, which has no approved vaccine or therapy. The DRC has recorded 1,406 confirmed cases and 438 deaths as of 30 June; the trial is coordinated by the country's Institut National de Recherche Biomédicale with Belgium's Institute of Tropical Medicine and the University of Oxford.",
      "genre": "Science",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c75ykve4zzxo"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQNmwwT2tQZjJqVmNHRVVubHZFR2VRZXV5V3FTNGVFQkZHNWYtdi1HdmNtTmx3RGliTXBWN21IeFRXaTYtYTZaQ3NpeE9zNW92R3dYemh4MlcwOWVDZ0w1V0RjRzN6S1p5RjNONzNJRkZZSHA1ZFZIeWFuYVozbHFPb21VNGZlOGpZdDBoVU54YnJKSHFOS0NJUE9OMnVIRnZkYVE?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/who-ebola-treatment-trial-drc.png",
        "alt": "A health worker in full protective gear at an Ebola treatment centre.",
        "credit": "BBC"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Edward Jenner, \"An Inquiry into the Causes and Effects of the Variolae Vaccinae\" (1798)",
          "excerpt": "But what renders the Cow-pox virus so extremely singular, is, that the person who has been thus affected is for ever after secure from the infection of the Small Pox; neither exposure to the variolous effluvia, nor the insertion of the matter into the skin, producing this distemper.",
          "source": "Project Gutenberg (public domain)",
          "href": "https://www.gutenberg.org/cache/epub/29414/pg29414.txt"
        },
        {
          "category": "historical",
          "title": "John Snow, \"On the Mode of Communication of Cholera\" (2nd ed., 1855)",
          "excerpt": "I had an interview with the Board of Guardians of St. James's parish, on the evening of Thursday, 7th September, and represented the above circumstances to them. In consequence of what I said, the handle of the pump was removed on the following day.",
          "source": "UCLA Department of Epidemiology, John Snow archive (reproducing Snow's 1855 text, public domain)",
          "href": "https://epi-snow.ph.ucla.edu/Stream2_BSPoutbreak_a.html"
        },
        {
          "category": "literary",
          "title": "Daniel Defoe, \"A Journal of the Plague Year\" (1722)",
          "excerpt": "But the following week it returned again, and the distemper was spread into two or three other parishes, viz., St Andrew's, Holborn; St Clement Danes; and, to the great affliction of the city, one died within the walls, in the parish of St Mary Woolchurch.",
          "source": "Project Gutenberg (public domain)",
          "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt"
        },
        {
          "category": "literary",
          "title": "Thucydides, \"History of the Peloponnesian War,\" Book II (the Plague of Athens, c. 431 BC; Crawley translation)",
          "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often; nor did any human art succeed any better.",
          "source": "Wikisource (public domain)",
          "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder, \"The Triumph of Death\" (c. 1562)",
          "excerpt": "Bruegel's panoramic panel spreads an army of skeletons across a scorched land, herding kings, peasants and lovers alike toward a great coffin-lidded trap. It is the danse macabre rendered as total warfare, disease as an unstoppable social leveller that no rank or remedy can escape. Against such a vision, the modern clinic in the DRC is precisely the counter-image: a deliberate human refusal to let contagion have the last word.",
          "source": "Museo del Prado, via Wikimedia Commons (public domain)",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Triumph_of_Death_-_WGA3389.jpg",
          "image": {
            "src": "/covers/who-ebola-treatment-trial-drc--art.png",
            "alt": "Pieter Bruegel the Elder's painting 'The Triumph of Death', showing skeletal armies driving people of all stations toward death across a devastated landscape.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Arnold Böcklin, \"The Plague\" (Die Pest) (1898)",
          "excerpt": "Böcklin personifies pestilence as a winged, skeletal rider astride a monstrous dragon-beast, sweeping low through a shadowed medieval street as townsfolk fall beneath it. Painted as the artist himself feared an epidemic in his own city, it distils the terror of an airborne, uncontainable death. The image throws into relief what the WHO trial attempts: to answer that faceless dread with a named strain, a protocol and a treatment.",
          "source": "Kunstmuseum Basel, via Wikimedia Commons (public domain)",
          "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg"
        }
      ],
      "rank": 4
    },
    {
      "slug": "spain-austria-world-cup-round-of-16",
      "headline": "Spain beat Austria 3-0 with an Oyarzabal double to reach the 2026 World Cup round of 16",
      "overview": "Mikel Oyarzabal scored twice and Pedro Porro added a third as the reigning European champions eased past Austria 3-0 to advance to the last 16 of the World Cup. Oyarzabal opened the scoring in the 34th minute and struck again shortly before full time, taking his tournament tally to four goals, as Spain set up a last-16 tie against the winner of Portugal or Croatia.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPRkl3T2g0eXg0d0oxQUMtV3VfbDFLVHR5WGxrcWdVanlEOXRjZVg1MDNuaW5NWjR5ai1qUnNLTl9HNXE1WjFxZWY3VWJ1R2kybmV5QlVwU2pVcWNRLVZIdXVTZGRwRnBveEpueEhNLTVFZUxHTjJVXzdSUjg0OF9VeGJxWTFmQUdWNFBiTlhWQ1gwRHhqWk9GWWVoY1ZoQjNyOUxmTVVB?oc=5"
        },
        {
          "name": "ESPN",
          "href": "https://www.espn.com/soccer/story/_/id/49251007/spain-austria-fifa-world-cup-2026-round-32-mikel-oyarzabal"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/spain-austria-world-cup-round-of-16.png",
        "alt": "Spain forward Mikel Oyarzabal in the national team's red shirt.",
        "credit": "Wikimedia Commons"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Pausanias, Description of Greece 5.8 — the first victors at Olympia (2nd century AD)",
          "excerpt": "So Iolaus won the chariot-race, and Iasius, an Arcadian, the horse-race; while of the sons of Tyndareus one won the foot-race and Polydeuces the boxing-match. Of Heracles himself it is said that he won victories at wrestling and the pancratium.",
          "source": "Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0160:book=5:chapter=8"
        },
        {
          "category": "historical",
          "title": "Pausanias, Description of Greece 6.14 — Milo of Croton (2nd century AD)",
          "excerpt": "Milo won six victories for wrestling at Olympia, one of them among the boys; at Pytho he won six among the men and one among the boys. He came to Olympia to wrestle for the seventh time, but did not succeed in mastering Timasitheus, a fellow-citizen who was also a young man, and who refused, moreover, to come to close quarters with him.",
          "source": "Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0160:book=6:chapter=14"
        },
        {
          "category": "literary",
          "title": "Pindar, Olympian Ode 1, trans. Ernest Myers (1874)",
          "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice: for hence cometh the glorious hymn and entereth into the minds of the skilled in song, so that they celebrate the son of Kronos.",
          "source": "The Extant Odes of Pindar, trans. Ernest Myers, Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/10717/pg10717.txt"
        },
        {
          "category": "literary",
          "title": "Homer, Iliad, Book 23 (the funeral games of Patroclus), trans. Samuel Butler",
          "excerpt": "The first prize he offered was for the chariot races- a woman skilled in all useful arts, and a three-legged cauldron that had ears for handles, and would hold twenty-two measures.",
          "source": "Homer, The Iliad, Book XXIII, trans. Samuel Butler (The Internet Classics Archive, MIT)",
          "href": "http://classics.mit.edu/Homer/iliad.23.xxiii.html"
        },
        {
          "category": "artistic",
          "title": "Panathenaic prize amphora with runners, attributed to the Kleophrades Painter (c. 500 BC), Louvre F277",
          "excerpt": "This black-figure amphora was itself the trophy: victors at the Panathenaic Games received such vessels, filled with sacred olive oil, painted with the very event they had won. On its belly a file of nude runners strides forward at full sprint, muscles taut, frozen forever in the instant of the race. Like this vase, Spain's win becomes an image of the contest as spectacle — athletic effort transformed into an object of admiration and glory.",
          "source": "Wikimedia Commons / Musée du Louvre, F277",
          "href": "https://commons.wikimedia.org/wiki/File:Panathenaic_amphora_Kleophrades_Louvre_F277.jpg",
          "image": {
            "src": "/covers/spain-austria-world-cup-round-of-16--art.png",
            "alt": "Ancient Greek black-figure Panathenaic prize amphora showing a row of nude male runners sprinting in profile, attributed to the Kleophrades Painter, c. 500 BC",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "George Frideric Handel, \"See, the Conqu'ring Hero Comes,\" from Judas Maccabaeus, libretto by Thomas Morell (1747)",
          "excerpt": "See, the conqu'ring hero comes! Sound the trumpets, beat the drums. ... Myrtle wreaths, and roses twine, to deck the hero's brow divine.",
          "source": "Handel / Thomas Morell, chorus \"See, the Conqu'ring Hero Comes\" (public-domain libretto)",
          "href": "https://drsethward.wordpress.com/2013/03/14/see-the-conquering-hero-comes-and-the-hebrew-hanukkah-tradition/"
        }
      ],
      "rank": 5
    },
    {
      "slug": "nyc-record-culture-budget-mamdani",
      "headline": "New York City budget allocates a record $323 million for culture under Mayor Mamdani",
      "overview": "New York City's adopted fiscal 2027 budget directs a record $323.8 million to the Department of Cultural Affairs, $24.2 million above the previous high, Mayor Zohran Mamdani and City Council Speaker Julie Menin announced. The package funds institutions including the Metropolitan Museum of Art, the American Museum of Natural History and the Brooklyn Museum, and establishes a Cultural Stability Fund distributing $10 million a year to organizations facing emergencies.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Artforum",
          "href": "https://www.artforum.com/news/mamdani-allocates-a-record-323-million-for-culture-1234753986/"
        },
        {
          "name": "The Art Newspaper",
          "href": "https://www.theartnewspaper.com/2026/07/02/new-york-city-budget-2027-record-culture-funding"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/nyc-record-culture-budget-mamdani.png",
        "alt": "The neoclassical Fifth Avenue facade and steps of the Metropolitan Museum of Art.",
        "credit": "Wikimedia Commons"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Plutarch, \"Life of Pericles\" (1st–2nd c. AD; John Dryden translation)",
          "excerpt": "That which gave most pleasure and ornament to the city of Athens, and the greatest admiration and even astonishment to all strangers, and that which now is Greece's only evidence that the power she boasts of and her ancient wealth are no romance or idle story, was his construction of the public and sacred buildings. For every particular piece of his work was immediately, even at that time, for its beauty and elegance, antique; and yet in its vigour and freshness looks to this day as if it were just executed.",
          "source": "The Internet Classics Archive, MIT",
          "href": "http://classics.mit.edu/Plutarch/pericles.html"
        },
        {
          "category": "historical",
          "title": "The WPA Federal Art Project / Federal Project Number One (1935–1943)",
          "excerpt": "In the depths of the Depression, Franklin Roosevelt's government did something no American administration had done before or since: it put artists, musicians, actors, and writers on the federal payroll. Over eleven years, tax dollars underwrote thousands of murals, canvases, and concerts, treating culture not as a luxury to be cut but as work worth funding and as a public good to be shared with ordinary citizens. It remains the boldest experiment in state patronage of the arts in the nation's history.",
          "source": "U.S. National Archives, \"A New Deal for the Arts\" exhibit",
          "href": "https://www.archives.gov/exhibits/new_deal_for_the_arts/"
        },
        {
          "category": "literary",
          "title": "Percy Bysshe Shelley, \"A Defence of Poetry\" (written 1821; published 1840)",
          "excerpt": "Poets are the hierophants of an unapprehended inspiration; the mirrors of the gigantic shadows which futurity casts upon the present; the words which express what they understand not; the trumpets which sing to battle and feel not what they inspire; the influence which is moved not, but moves. Poets are the unacknowledged legislators of the world.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/A_Defence_of_Poetry"
        },
        {
          "category": "literary",
          "title": "Giorgio Vasari, \"Lives of the Most Excellent Painters, Sculptors, and Architects\" — Life of Sandro Botticelli (1550/1568)",
          "excerpt": "He executed various works in the Medici Palace for the elder Lorenzo, more particularly a figure of Pallas on a shield wreathed with vine branches, whence flames are proceeding: this he painted of the size of life. He must have died of hunger had he not been supported by Lorenzo de' Medici, for whom he had worked at the small hospital of Volterra and other places, who assisted him while he lived.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Lives_of_the_Most_Excellent_Painters,_Sculptors,_and_Architects/Sandro_Botticelli"
        },
        {
          "category": "artistic",
          "title": "Sandro Botticelli, \"Primavera\" (c. 1480)",
          "excerpt": "Painted for the Medici and long housed in a family villa, Botticelli's Primavera turns a private fortune into an enduring public wonder: Venus presides over a flowering orange grove as the Three Graces dance and Flora scatters blossoms. It is patronage made visible, wealth transmuted into myth and beauty. Five centuries on, the money that Lorenzo de' Medici spent survives only as this shimmering vision of spring, the true dividend of civic magnificence.",
          "source": "Galleria degli Uffizi, Florence / Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_La_Primavera_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/nyc-record-culture-budget-mamdani--art.png",
            "alt": "Botticelli's Primavera: Venus in a blossoming orange grove, flanked by the dancing Three Graces, Flora scattering flowers, Mercury, and Zephyr, a Medici-commissioned Renaissance masterpiece",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Aaron Copland, \"Fanfare for the Common Man\" (1942)",
          "excerpt": "Commissioned by conductor Eugene Goossens for the Cincinnati Symphony as a wartime tribute, Copland answered not with a salute to generals but with a fanfare for the ordinary citizen. Solemn drumbeats and gong strokes give way to a rising brass theme of plain, democratic grandeur. It is the sound of a nation deciding that its common people, and the culture made for them, are worthy of ceremony and public expense.",
          "source": "The Aaron Copland Fund for Music (official works page)",
          "href": "https://www.aaroncopland.com/works/fanfare-for-the-common-man/"
        }
      ],
      "rank": 6
    },
    {
      "slug": "canada-defence-security-resilience-bank-nato",
      "headline": "Canada aims to unveil about 10 founding nations for a new global defence bank at NATO summit",
      "overview": "Canada expects to announce roughly 10 founding members of a proposed Defence, Security and Resilience Bank at next week's NATO summit in Turkey, its lead negotiator said, part of Prime Minister Mark Carney's push for a coalition of \"middle powers\" amid a fracturing US-led order. The bank would raise up to $133 billion in low-cost financing for allied defence; so far only Luxembourg, its planned European base, has publicly signed on.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOZ1JFOEl5RnFBT0phSHFEdGYzeURhcUJCNHM3MFI1czF5Q1d0Y0JXOVNUaEt6cGtTeWowSl9yRjFGNFZrbC02enRzQmpFbUMtNnNrcTVlZ1BfSzdEelAtLTEyS2kyTDhieFJSck5STmFKcWtXU3Rwdzdkb0pKUDVOb0hGOFBpQV85aHNGNFFXakREaXc2dHdLcnYzRVprV0d1aTN1LXMydlZuMFFFbmhPckJRZk5MZw?oc=5"
        },
        {
          "name": "The Globe and Mail",
          "href": "https://www.theglobeandmail.com/business/article-canada-founding-partners-global-defence-bank-nato-summit/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/canada-defence-security-resilience-bank-nato.png",
        "alt": "The angular glass exterior of NATO's headquarters in Brussels.",
        "credit": "Wikimedia Commons"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "History of the Peloponnesian War, Book 1.96 (the founding of the Delian League) — Thucydides, trans. Richard Crawley (1874)",
          "excerpt": "Now was the time that the office of 'Treasurers for Hellas' was first instituted by the Athenians. These officers received the tribute, as the money contributed was called. The tribute was first fixed at four hundred and sixty talents. The common treasury was at Delos, and the congresses were held in the temple.",
          "source": "Perseus Digital Library, Tufts University",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0200%3Abook%3D1%3Achapter%3D96"
        },
        {
          "category": "historical",
          "title": "Remarks at Harvard University (the Marshall Plan speech) — George C. Marshall (1947)",
          "excerpt": "Its purpose should be the revival of a working economy in the world so as to permit the emergence of political and social conditions in which free institutions can exist. Our policy is directed not against any country or doctrine but against hunger, poverty, desperation and chaos.",
          "source": "George C. Marshall Foundation",
          "href": "https://www.marshallfoundation.org/the-marshall-plan/speech/"
        },
        {
          "category": "literary",
          "title": "\"The Bundle of Sticks,\" The Fables of Aesop — trans. Joseph Jacobs (1894)",
          "excerpt": "\"Untie the faggots,\" said the father, \"and each of you take a stick.\" When they had done so, he called out to them: \"Now, break,\" and each stick was easily broken. \"You see my meaning,\" said their father. Union gives strength.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Fables_of_%C3%86sop_(Jacobs)/The_Bundle_of_Sticks"
        },
        {
          "category": "literary",
          "title": "Henry V, Act IV, Scene 3 (the St Crispin's Day speech) — William Shakespeare (c. 1599)",
          "excerpt": "We few, we happy few, we band of brothers; / For he to-day that sheds his blood with me / Shall be my brother; be he ne'er so vile, / This day shall gentle his condition:",
          "source": "The Complete Works of William Shakespeare, MIT",
          "href": "https://shakespeare.mit.edu/henryv/henryv.4.3.html"
        },
        {
          "category": "artistic",
          "title": "Minerva Protects Pax from Mars ('Peace and War') — Peter Paul Rubens (1629–30)",
          "excerpt": "Painted while Rubens was serving as a peace envoy between Spain and England, the canvas shows Minerva, goddess of wisdom, thrusting back the armoured war-god Mars so that Pax can suckle an infant and pour out her riches among gathered children. Its argument is plain: only when wisdom shields peace from war does prosperity flow. It is a fitting emblem for allies who would band together and pool their treasure to keep the peace.",
          "source": "Wikimedia Commons / National Gallery, London",
          "href": "https://commons.wikimedia.org/wiki/File:Rubens_peace-war.jpg",
          "image": {
            "src": "/covers/canada-defence-security-resilience-bank-nato--art.png",
            "alt": "Rubens's allegory 'Minerva Protects Pax from Mars': Minerva pushes back the war-god Mars while Pax, seated, offers her bounty to a group of children.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "\"Ode to Joy\" (An die Freude) — Friedrich Schiller (1785), set by Ludwig van Beethoven in Symphony No. 9 (1824)",
          "excerpt": "Your magics bind again / What custom has strictly parted. / All men become brothers / Where your tender wing lingers.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Ode_to_Joy"
        }
      ],
      "rank": 7
    },
    {
      "slug": "pjm-heat-dome-data-center-curtailment",
      "headline": "US emergency orders let largest grid PJM curtail data centers as heat dome pushes power demand toward records",
      "overview": "With a heat dome over the eastern United States driving grid operator PJM Interconnection toward a record power demand near 166,000 megawatts, two Department of Energy emergency orders now authorize it to force data centers and other large users onto backup generators to protect households. The measures underscore how AI-driven data-center growth, concentrated in northern Virginia, is straining a grid where wholesale capacity prices have jumped roughly elevenfold in two years.",
      "genre": "Climate",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxPaHlpWW5jMk9haXBWdy1mWWVfTzdzeUREeGt3Z29ULUp6OUR5THFTSGRNMHpDUFR3WWNmR2p0TlNoRFpDbk1NTmZTZ2VUVnF4YTRhUTVRYnNLLUF6anM0TW0yN1EwQ3dCQ2VRV19hMFFXdzVhQ1VwbVNDa2RvRnQ0NklLWlI0RDRFVGNoSEdmRUlUUQ?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNUEg0aE5oal81M0kxNWpVaTV0TWVNOU40OGhibWdyNFdOV2xLR2xYSDQ4Y0ZjWDdLOGd6ZklQOERqNVFnWU9lLXNCYms5TWJNR2c3Wmw4bUk0bWIyRVVHTVMwVGRhZkxPcExkZEhXdVlQcXdHbTlfRjZNNFkxa1I1T0Z3d0RuelBpdVdwb3dISjcxMEpvVWFtU0pDX0tHMGlZdzRZSEtjNE5meEVzR29aeU1TdnJhaF9XRUE?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/pjm-heat-dome-data-center-curtailment.png",
        "alt": "High-voltage transmission towers and power lines receding across a hazy landscape.",
        "credit": "Wikimedia Commons"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The coal-and-steam Industrial Revolution (Britain, c. 1760–1840)",
          "excerpt": "When steam engines replaced water and muscle, industry entered a self-reinforcing spiral of appetite: factories demanded more engines, engines demanded more coal, and the mines and furnaces roared to keep pace. Britain's steam power leapt from an estimated 10,000 horsepower in 1800 to 210,000 by 1815, each new machine another mouth to feed. Like today's data centers multiplying across the grid, the first industrial age discovered that harnessing concentrated energy does not sate hunger for it but inflames it.",
          "source": "Wikipedia, \"Industrial Revolution\"",
          "href": "https://en.wikipedia.org/wiki/Industrial_Revolution"
        },
        {
          "category": "historical",
          "title": "The Northeast Blackout of 2003",
          "excerpt": "On a hot August afternoon in 2003, a single unnoticed fault in Ohio cascaded across three states in minutes, and within hours 256 power plants had tripped offline, leaving roughly 55 million people across the Northeast and Ontario in the dark. A software alarm that failed silently meant operators never saw the collapse coming until the lights were already gone. It remains the starkest modern warning of what PJM's emergency curtailments aim to prevent: an overstretched grid that fails not gradually but all at once.",
          "source": "Wikipedia, \"Northeast blackout of 2003\"",
          "href": "https://en.wikipedia.org/wiki/Northeast_blackout_of_2003"
        },
        {
          "category": "literary",
          "title": "Aeschylus, \"Prometheus Bound\" (5th century BCE; Smyth translation, 1926)",
          "excerpt": "\"I hunted out and stored in fennel stalk the stolen source of fire that hath proved to mortals a teacher in every art and a means to mighty ends.\"",
          "source": "Wikisource — Aeschylus (Smyth 1927) v1, \"Prometheus Bound\"",
          "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/Prometheus_Bound"
        },
        {
          "category": "literary",
          "title": "Mary Shelley, \"Frankenstein; or, The Modern Prometheus\" (1818)",
          "excerpt": "\"It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet.\"",
          "source": "Page by Page Books — Mary Shelley, Frankenstein, Chapter 5",
          "href": "https://www.pagebypagebooks.com/Mary_Wollstonecraft_Shelley/Frankenstein/Chapter_5_p1.html"
        },
        {
          "category": "artistic",
          "title": "Philip James de Loutherbourg, \"Coalbrookdale by Night\" (1801)",
          "excerpt": "De Loutherbourg painted the Madeley Wood (Bedlam) Furnaces blazing against a black Shropshire night, their fires staining the sky an infernal red as smoke boils over the darkened valley. It is the founding image of the \"industrial sublime\" — a scene at once awesome and terrible, celebrating human power over fire while shuddering at the furnace it has kindled. Two centuries on, its glow reads like a premonition of northern Virginia's server farms burning through the grid to feed the machines.",
          "source": "Wikipedia, \"Coalbrookdale by Night\" (Science Museum, London)",
          "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._002.jpg",
          "image": {
            "src": "/covers/pjm-heat-dome-data-center-curtailment--art.png",
            "alt": "Coalbrookdale by Night (1801) by Philip James de Loutherbourg: iron furnaces blazing fiery red against a dark night sky, smoke billowing over the Shropshire valley",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "J.M.W. Turner, \"Rain, Steam and Speed – The Great Western Railway\" (1844)",
          "excerpt": "Turner dissolves a steam locomotive into a storm of rain, mist and speed as it hurtles across Maidenhead Bridge, technology and weather blurred into a single overwhelming force. First shown at the Royal Academy in 1844, it is less a scene than an allegory of the sublime collision between the powers of nature and the powers of the machine. The heat dome bearing down on PJM stages that same confrontation — human invention racing headlong against an elemental force it cannot outrun.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Rain_Steam_and_Speed_the_Great_Western_Railway.jpg"
        }
      ],
      "rank": 8
    },
    {
      "slug": "scattered-spider-suspect-arrested-finland",
      "headline": "Alleged Scattered Spider hacker Peter Stokes, 19, extradited from Finland to face US charges",
      "overview": "US prosecutors charged Peter Stokes, a 19-year-old dual US-Estonian national, with computer intrusion, conspiracy and fraud after his arrest in Finland in April and extradition; he appeared in federal court in Chicago and was ordered held. Prosecutors link the Scattered Spider group to more than 100 network intrusions and over $100 million in ransom payments, including an $8 million cryptocurrency demand to a luxury jewellery retailer and the 2024 Transport for London cyber-attack.",
      "genre": "Technology",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cwy0we4yw1lo"
        },
        {
          "name": "US Department of Justice",
          "href": "https://www.justice.gov/opa/pr/alleged-member-criminal-cyber-hacking-group-scattered-spider-arrested-finland-and-extradited"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/scattered-spider-suspect-arrested-finland.png",
        "alt": "A darkened computer keyboard lit by the glow of a screen.",
        "credit": "BBC"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "A General History of the Pyrates (Captain Charles Johnson, 1724) — the death of Blackbeard",
          "excerpt": "Black-beard received a Shot into his Body from the Pistol that Lieutenant Maynard discharg'd, yet he stood his Ground, and fought with great Fury, till he received five and twenty Wounds, and five of them by Shot. At length, as he was cocking another Pistol, having fired several before, he fell down dead.",
          "source": "Wikisource — A General History of the Pyrates, Chapter 3, \"Of Captain Teach, alias Black-Beard\"",
          "href": "https://en.wikisource.org/wiki/A_General_History_of_the_Pyrates/Chapter_3"
        },
        {
          "category": "historical",
          "title": "The Newgate Calendar — Jonathan Wild, the \"Thief-Taker General\" hanged at Tyburn (1725)",
          "excerpt": "OF all the thieves that ever infested London this man was the most notorious. That eminent vagabond, Barnfylde Moore Carew, was recognized as 'King of the Beggars:'—in like manner may the name and memory of Jonathan Wild be ever held in abhorrence as 'The Prince of Robbers.'",
          "source": "The Newgate Calendar (ExClassics online edition), entry for Jonathan Wild",
          "href": "https://www.exclassics.com/newgate/ng175.htm"
        },
        {
          "category": "literary",
          "title": "Ovid, Metamorphoses, Book VI (8 AD) — the weaver Arachne transformed into a spider",
          "excerpt": "the slender fingers clung to her side as legs; the rest was belly. Still from this she ever spins a thread; and now, as a spider, she exercises her old-time weaver-art.",
          "source": "Wikisource — Metamorphoses (Miller translation), Book VI",
          "href": "https://en.wikisource.org/wiki/Metamorphoses_(Miller)/Book_VI"
        },
        {
          "category": "literary",
          "title": "Mary Howitt, \"The Spider and the Fly\" (1829)",
          "excerpt": "\"Will you walk into my parlor?\" said the spider to the fly; \"'Tis the prettiest little parlor that ever you may spy. The way into my parlor is up a winding stair, And I have many curious things to show when you are there.\"",
          "source": "Family Friend Poems — \"The Spider and the Fly\" by Mary Howitt",
          "href": "https://www.familyfriendpoems.com/poem/the-spider-and-the-fly-by-mary-howitt"
        },
        {
          "category": "artistic",
          "title": "Odilon Redon, \"The Smiling Spider\" (L'Araignée souriante), c.1881",
          "excerpt": "Redon's charcoal noir looms out of the dark: a bloated, hairy spider that walks on human-like legs and turns to face the viewer with a wide, toothy, unsettling grin. The predator is charming and monstrous at once — an image of menace disguised as mirth, the perfect emblem of a lure that smiles as it waits at the center of its web.",
          "source": "Wikimedia Commons — File:Redon smiling-spider.jpg",
          "href": "https://commons.wikimedia.org/wiki/File:Redon_smiling-spider.jpg",
          "image": {
            "src": "/covers/scattered-spider-suspect-arrested-finland--art.png",
            "alt": "Odilon Redon's charcoal work 'The Smiling Spider', depicting a large dark spider with a grinning human-like face and long legs on a pale tiled floor",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "The Rolling Stones, \"The Spider and the Fly\" (Jagger/Richards, 1965)",
          "excerpt": "Cut quickly at the tail end of a 1965 session and buried as the B-side to \"(I Can't Get No) Satisfaction,\" this slow Jimmy Reed–style blues borrows its title straight from Mary Howitt's poem. Over a lazy harmonica riff Jagger narrates a post-gig seduction as pure predator and prey, the spider patiently working its web while the fly convinces itself it is the one in control.",
          "source": "Wikipedia — \"The Spider and the Fly\" (song)",
          "href": "https://en.wikipedia.org/wiki/The_Spider_and_the_Fly_(song)"
        }
      ],
      "rank": 9
    },
    {
      "slug": "louisiana-ag-murrill-indicted-new-orleans-courts",
      "headline": "Louisiana Attorney General Liz Murrill indicted on 16 counts over threats in New Orleans court dispute",
      "overview": "An Orleans Parish grand jury returned a 16-count indictment, eight counts of malfeasance and eight of intimidation, against Louisiana Attorney General Liz Murrill, accusing her of threatening New Orleans officials who opposed a law abolishing the elected criminal-court clerk's post. A judge set bond at $400,000; Republican Governor Jeff Landry said he would pardon Murrill \"as fast as the law allows.\"",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPbFl5Vmk1eF9Oa3FWMnFVRnFseEhGaDVXRkJQNktLRkM5c0J0RjFBNHNDVWJJTnpnN1l2QndlMjhtYmRPSTBmM3JUcTNEWDRiX0trcTdONXVvXzZ1Qm1SR1h2bUtwTlFmYkQxSUk3Mk91ZlZVVXFQd1FLQVlwR3ExYloxS2pSeFVVeGM4RTI0RHhUUGREdXI5SE9wVmg5UUE3RDBZVVNvOGFvMFc4Vnc?oc=5"
        },
        {
          "name": "The Hill",
          "href": "https://thehill.com/homenews/state-watch/5952272-louisiana-attorney-general-indicted/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/louisiana-ag-murrill-indicted-new-orleans-courts.png",
        "alt": "The domed Louisiana State Capitol tower rising in Baton Rouge.",
        "credit": "Wikimedia Commons"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Cicero, \"In Verrem\" (Against Verres), Second Pleading, Book 5, sec. 170 (70 BC)",
          "excerpt": "To bind a Roman citizen is a crime, to flog him is an abomination, to slay him is almost an act of murder: to crucify him is - what?",
          "source": "Cicero, Against Verres, 2.5.170 (Yonge/Greenwood translation), via Attalus.org",
          "href": "https://www.attalus.org/cicero/verres25_3.html"
        },
        {
          "category": "historical",
          "title": "The Impeachment of Warren Hastings, Governor-General of Bengal (trial 1788-1795)",
          "excerpt": "When Edmund Burke rose in Westminster Hall to prosecute the most powerful colonial administrator of his age, he insisted that high office is a public trust that can be forfeited by its abuse. For seven years the Governor-General of Bengal answered charges of extortion, coercion and the bending of law to private power. Hastings was ultimately acquitted, but the spectacle established that no official stands above the reach of accountability.",
          "source": "Wikipedia, \"Impeachment of Warren Hastings\"",
          "href": "https://en.wikipedia.org/wiki/Impeachment_of_Warren_Hastings"
        },
        {
          "category": "literary",
          "title": "William Shakespeare, \"Measure for Measure,\" Act 2, Scene 2 (c. 1604)",
          "excerpt": "O, it is excellent / To have a giant's strength; but it is tyrannous / To use it like a giant. ... but man, proud man, / Drest in a little brief authority, / Most ignorant of what he's most assured, / His glassy essence, like an angry ape, / Plays such fantastic tricks before high heaven / As make the angels weep.",
          "source": "The Complete Works of William Shakespeare (MIT), Measure for Measure, 2.2",
          "href": "http://shakespeare.mit.edu/measure/measure.2.2.html"
        },
        {
          "category": "literary",
          "title": "Robert Penn Warren, \"All the King's Men\" (1946)",
          "excerpt": "Warren's Pulitzer-winning novel traces the Louisiana strongman Willie Stark from idealistic country lawyer to a governor who rules through patronage, blackmail and intimidation. Around him the machinery of the state becomes an instrument for punishing enemies and burying secrets, until the law itself bends to the will of the man who commands it. Modeled on Huey Long, Stark embodies how populist power in Louisiana can curdle into the very corruption it once vowed to destroy.",
          "source": "Wikipedia, \"All the King's Men\"",
          "href": "https://en.wikipedia.org/wiki/All_the_King%27s_Men"
        },
        {
          "category": "artistic",
          "title": "Honore Daumier, \"Les Gens de Justice: M. l'Avocat a rendu pleine justice...\" (1846)",
          "excerpt": "In his savage lithograph series on the men of the law, Daumier strips the robed advocate of every pretense, showing a self-satisfied officer of justice preening over a verdict rendered for his own advantage. The caption's boast that the lawyer has done \"full justice\" drips with irony, exposing how the machinery of the courts can be turned to serve the powerful rather than the wronged. It is a portrait of the corrupt magistrate as a type: authority cloaked in the language of righteousness.",
          "source": "Honore Daumier, \"Les Gens de Justice\" lithograph series (The Phillips Collection), via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Les_Gens_de_Justice-_M._L'Avocat_a_rendu_pleine_Justice..._-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/louisiana-ag-murrill-indicted-new-orleans-courts--art.png",
            "alt": "Honore Daumier lithograph from 'Les Gens de Justice' depicting a smug, robed lawyer boasting that he has rendered full justice",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Ludwig van Beethoven, \"Fidelio\" (opera, premiered 1805)",
          "excerpt": "Beethoven's only opera sets its drama in a prison ruled by Don Pizarro, a governor who has secretly jailed the nobleman Florestan for daring to expose his crimes. To conceal his abuse of power before an official inspection, Pizarro plots to murder his prisoner and erase the evidence of his tyranny. The opera stages justice turned against the just, and its triumph comes only when a higher authority arrives to strip the corrupt official of his stolen power.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
        }
      ],
      "rank": 10
    },
    {
      "slug": "snohetta-theodore-roosevelt-presidential-library",
      "headline": "Snohetta's mass-timber Theodore Roosevelt Presidential Library opens in the North Dakota badlands",
      "overview": "The Theodore Roosevelt Presidential Library, designed by Snohetta, opens on July 4 in Medora, North Dakota, on a 93-acre site beside Theodore Roosevelt National Park. The 96,000-square-foot building of mass timber, reclaimed wood, low-carbon concrete and rammed earth sits beneath a 121,000-square-foot living-prairie roof and is pursuing the rigorous Living Building certification under the principle \"The Library is the Landscape.\"",
      "genre": "Culture",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/07/02/theodore-roosevelt-presidential-library-snohetta-north-dakot/"
        },
        {
          "name": "Architectural Record",
          "href": "https://www.architecturalrecord.com/articles/18287-the-theodore-roosevelt-presidential-library-designed-by-snohetta-is-set-to-open-in-the-north-dakota-badlands"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/snohetta-theodore-roosevelt-presidential-library.png",
        "alt": "A low timber-and-earth building with a living-prairie roof settling into the North Dakota badlands.",
        "credit": "Snohetta"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Theodore Roosevelt, \"Conservation as a National Duty\" (1908)",
          "excerpt": "Any right thinking father earnestly desires and strives to leave his son both an untarnished name and a reasonable equipment for the struggle of life. So this Nation as a whole should earnestly desire and strive to leave to the next generation the national honor unstained and the national resources unexhausted.",
          "source": "Voices of Democracy: The U.S. Oratory Project (University of Maryland)",
          "href": "https://voicesofdemocracy.umd.edu/theodore-roosevelt-conservation-as-a-national-duty-speech-text/"
        },
        {
          "category": "historical",
          "title": "Theodore Roosevelt, Seventh Annual Message to Congress (December 3, 1907)",
          "excerpt": "The conservation of our natural resources and their proper use constitute the fundamental problem which underlies almost every other problem of our National life. We must maintain for our civilization the adequate material basis without which that civilization can not exist. We must show foresight, we must look ahead.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Theodore_Roosevelt%27s_Seventh_State_of_the_Union_Address"
        },
        {
          "category": "literary",
          "title": "Henry David Thoreau, \"Walking\" (1862)",
          "excerpt": "The West of which I speak is but another name for the Wild; and what I have been preparing to say is, that in Wildness is the preservation of the World.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Walking"
        },
        {
          "category": "literary",
          "title": "John Muir, \"Our National Parks\" (1901)",
          "excerpt": "Thousands of tired, nerve-shaken, over-civilized people are beginning to find out that going to the mountains is going home; that wildness is a necessity; and that mountain parks and reservations are useful not only as fountains of timber and irrigating rivers, but as fountains of life.",
          "source": "Sierra Club, John Muir Exhibit",
          "href": "https://vault.sierraclub.org/john_muir_exhibit/writings/our_national_parks/chapter_1.aspx"
        },
        {
          "category": "artistic",
          "title": "Thomas Moran, \"Green River Cliffs, Wyoming\" (1881)",
          "excerpt": "Moran's luminous oil renders the eroded, banded buttes of the Wyoming badlands as a natural cathedral rising from the plain, the geology itself made monumental. Painted from sketches made on his Western expeditions, the canvas helped convince a nation that these arid, sculpted lands were worth preserving. Its wide, horizon-spanning format frames the West as landscape and memory at once.",
          "source": "National Gallery of Art (via Wikimedia Commons)",
          "href": "https://commons.wikimedia.org/wiki/File:Thomas_Moran,_Green_River_Cliffs,_Wyoming,_1881,_NGA_82648.jpg",
          "image": {
            "src": "/covers/snohetta-theodore-roosevelt-presidential-library--art.png",
            "alt": "Thomas Moran's 1881 oil painting Green River Cliffs, Wyoming, showing red and ochre eroded cliffs and buttes rising above a river and plain in the American West",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Aaron Copland, \"Billy the Kid\" ballet (1938)",
          "excerpt": "Copland opens and closes the ballet with \"The Open Prairie,\" a slow, wide-interval theme that seems to stretch the orchestra across an unbounded horizon, weaving in cowboy tunes like \"Git Along Little Dogies.\" The music invented a distinctly American sound for the West: spare, luminous, and vast. Like a building that becomes its landscape, the score dissolves the frontier tale back into the land it came from.",
          "source": "Aaron Copland (official works catalogue), Boosey & Hawkes",
          "href": "https://www.aaroncopland.com/works/billy-the-kid-ballet/"
        }
      ],
      "rank": 11
    },
    {
      "slug": "tibetan-flag-self-immolation-un-headquarters",
      "headline": "Man dies after setting himself on fire while holding a Tibetan flag outside UN headquarters in New York",
      "overview": "A man died on Thursday after setting himself on fire on the street in front of the United Nations headquarters in New York while holding a Tibetan flag, police and Tibetan activists said, after officers responding to a 911 call found him with severe burns. Activists said he had made an appeal for Tibetan independence before setting himself alight, in protest of Chinese restrictions on Tibetans.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxORW9IVDJnaW8wclJhcDUyUTZXS21DUXl0OUNxYmEwTXhRbjdVQ3owUnhtaFdFTFM5VkE0Q3FRd29jcDVlbzZkMUNDdkM5SWZ2bGF1Z1VZVXZFeG4tMEEtMTZ1N29tN3NDa3dpUW1nTmZMbFpwS1NLTl9EWEE5aHB3VjU4azl1N2ZfY1RUX2Z6dlFjZDB6M2toNmtwZVJ5T1BYbW9rd2dR?oc=5"
        },
        {
          "name": "U.S. News",
          "href": "https://www.usnews.com/news/world/articles/2026-07-02/tibetan-man-dies-after-setting-himself-on-fire-near-un-headquarters-activists-say"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/tibetan-flag-self-immolation-un-headquarters.png",
        "alt": "The Secretariat tower of the United Nations headquarters in New York seen against the sky.",
        "credit": "Wikimedia Commons"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The self-immolation of Thich Quang Duc (Saigon, 1963)",
          "excerpt": "On the morning of 11 June 1963, the elderly Buddhist monk sat in the lotus position at a busy Saigon intersection while fellow monks doused him with gasoline, protesting the persecution of Buddhists under Ngo Dinh Diem's regime. He struck a match and remained perfectly still and silent as the flames consumed him. Malcolm Browne's photograph of the burning monk carried the appeal around the world and shook the conscience of governments an ocean away.",
          "source": "Wikipedia",
          "href": "https://en.wikipedia.org/wiki/Thich_Quang_Duc"
        },
        {
          "category": "historical",
          "title": "The self-immolation of Jan Palach (Prague, 1969)",
          "excerpt": "On 16 January 1969, the 20-year-old student set himself on fire in Wenceslas Square to protest the crushing of the Prague Spring by Soviet tanks and the demoralization of his occupied nation. He suffered burns over most of his body and died three days later. His funeral swelled into a mass demonstration, and the memory of a single life offered against an empire outlasted the regime that provoked it.",
          "source": "Wikipedia",
          "href": "https://en.wikipedia.org/wiki/Jan_Palach"
        },
        {
          "category": "literary",
          "title": "Antigone by Sophocles (c. 441 BC), trans. R. C. Jebb",
          "excerpt": "Yes; for it was not Zeus that had published me that edict; not such are the laws set among men by the justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven. Die I must,-I knew that well (how should I not?)-even without thy edicts. But if I am to die before my time, I count that a gain.",
          "source": "The Internet Classics Archive (MIT)",
          "href": "http://classics.mit.edu/Sophocles/antigone.html"
        },
        {
          "category": "literary",
          "title": "Apology by Plato (c. 399 BC), trans. Benjamin Jowett",
          "excerpt": "Men of Athens, I honor and love you; but I shall obey God rather than you, and while I have life and strength I shall never cease from the practice and teaching of philosophy. For a man who is good for anything ought not to calculate the chance of living or dying; he ought only to consider whether in doing anything he is doing right or wrong - acting the part of a good man or of a bad.",
          "source": "The Internet Classics Archive (MIT)",
          "href": "http://classics.mit.edu/Plato/apology.html"
        },
        {
          "category": "artistic",
          "title": "The Third of May 1808 by Francisco Goya (1814)",
          "excerpt": "Goya lights a lone laborer in a white shirt at the center of the darkness, kneeling among the bodies of the already dead, his arms flung wide in a pose that echoes the crucifixion. The faceless firing squad of the occupying empire aims as a single mechanical wall, indifferent to his plea. The painting refuses heroic consolation and instead insists on the raw dignity and terror of one human being facing annihilation for his people.",
          "source": "Wikipedia",
          "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_thin_black_margin.jpg",
          "image": {
            "src": "/covers/tibetan-flag-self-immolation-un-headquarters--art.png",
            "alt": "Goya's The Third of May 1808: a man in a white shirt kneels with arms outstretched before a firing squad amid fallen bodies at night",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Symphony No. 3, 'Symphony of Sorrowful Songs' by Henryk Gorecki (1976)",
          "excerpt": "Gorecki's slow, hymn-like symphony gathers three laments of the powerless into a single grieving voice for solo soprano and strings. Its central movement sets words that an 18-year-old girl scratched onto the wall of a Gestapo prison cell, a testimony of composure rather than despair in the face of death. The music holds suffering with such gravity that it becomes an act of witness, turning private sorrow into a memorial the whole world can hear.",
          "source": "Wikipedia",
          "href": "https://en.wikipedia.org/wiki/Symphony_No._3_(G%C3%B3recki)"
        }
      ],
      "rank": 12
    },
    {
      "slug": "venezuela-earthquake-survivor-rescued",
      "headline": "Man pulled alive from rubble eight days after Venezuela's twin earthquakes killed at least 2,595",
      "overview": "Rescuers freed Hernan Gil alive after spending more than 100 hours reaching him beneath 140 tonnes of rubble, eight days after twin earthquakes struck Venezuela on 24 June. Officials say at least 2,595 people are confirmed dead with tens of thousands still missing; a Chilean firefighter on the team called it the most complex and technically difficult rescue of his career.",
      "genre": "Science",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/ce375v12z0qo"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPNGg2Y2g5TUpaZkxFVXJRdXFMcnpmX2d3R2lUa2ppZTY5UWFxZktRNDRMWktBRUgwcVBvck9tYWx6UXJHNXo2Sm1TNlRDdzhfU0NINkJVdzNYTmQySlk3Z3BvNGNKajJraW1KRTQ3cGVteVRaMzlpR2NyMG5jYVlQcWoycHVUR2pfMEdUWWZyZU5scnItZTF0MjU0RzBlZzNMN2J1Z3BBOEZ6VTF4VFNnQ2xuTGYxQQ?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/venezuela-earthquake-survivor-rescued.png",
        "alt": "Rescue workers searching the rubble of a building collapsed by an earthquake.",
        "credit": "BBC"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Rescue of the 33 Chilean Miners (Copiapó mine rescue, 2010)",
          "excerpt": "When the San José copper-gold mine collapsed on 5 August 2010, thirty-three men were sealed roughly 700 metres beneath the Atacama Desert with no way out. For 69 days the world held its breath, until each miner was drawn up one by one through a narrow bore in the Fénix 2 capsule. Like Hernán Gil freed from 140 tonnes of rubble, their emergence into daylight became a global emblem of survival against impossible odds.",
          "source": "Wikipedia — 2010 Copiapó mining accident",
          "href": "https://en.wikipedia.org/wiki/2010_Copiap%C3%B3_mining_accident"
        },
        {
          "category": "historical",
          "title": "The Rev. Charles Davy, eyewitness letter on the Lisbon earthquake (1 November 1755)",
          "excerpt": "It was on the morning of this fatal day, between the hours of nine and ten, that I was set down in my apartment, just finishing a letter, when the papers and table I was writing on began to tremble with a gentle motion, which rather surprised me, as I could not perceive a breath of wind stirring.",
          "source": "Fordham Modern History Sourcebook",
          "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp"
        },
        {
          "category": "literary",
          "title": "The Raising of Lazarus, Gospel of John 11:43–44 (King James Version, 1611)",
          "excerpt": "And when he thus had spoken, he cried with a loud voice, Lazarus, come forth. And he that was dead came forth, bound hand and foot with graveclothes: and his face was bound about with a napkin. Jesus saith unto them, Loose him, and let him go.",
          "source": "Project Gutenberg — The King James Version of the Bible (eBook #10)",
          "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
        },
        {
          "category": "literary",
          "title": "\"The Premature Burial\" by Edgar Allan Poe (1844)",
          "excerpt": "To be buried while alive is, beyond question, the most terrific of these extremes which has ever fallen to the lot of mere mortality. That it has frequently, very frequently, so fallen will scarcely be denied by those who think. The boundaries which divide Life from Death are at best shadowy and vague. Who shall say where the one ends, and where the other begins?",
          "source": "Project Gutenberg — The Works of Edgar Allan Poe, Volume 2 (eBook #2148)",
          "href": "https://www.gutenberg.org/cache/epub/2148/pg2148.txt"
        },
        {
          "category": "artistic",
          "title": "\"The Raising of Lazarus\" by Sebastiano del Piombo, with designs by Michelangelo (1517–1519)",
          "excerpt": "Sebastiano's monumental altarpiece freezes the instant a body returns from the grave: Lazarus, muscular and still half-wrapped in his shroud, twists back toward the living as Christ raises a commanding hand. Around him a crowd recoils between terror and wonder, unsure whether to believe the dead can rise. It is the visual counterpart to a man pulled breathing from the earth after eight days entombed in rubble.",
          "source": "Wikimedia Commons (painting held at the National Gallery, London, NG1)",
          "href": "https://commons.wikimedia.org/wiki/File:Sebastiano_del_Piombo_-_The_Raising_of_Lazarus_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/venezuela-earthquake-survivor-rescued--art.png",
            "alt": "Sebastiano del Piombo's painting The Raising of Lazarus, showing Lazarus half-unwrapped from his shroud rising from the tomb as Christ raises his hand amid an astonished crowd.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Symphony No. 2 in C minor \"Resurrection\" by Gustav Mahler (1888–1894)",
          "excerpt": "Mahler's second symphony opens in funeral rites and death, then labours across five movements toward an overwhelming choral finale set to Klopstock's resurrection ode, promising that what was buried shall rise again. The music enacts precisely the arc of a rescue from the tomb: annihilation answered by an insistence that life endures. Its final blaze of hope amid darkness mirrors the cry that went up when Hernán Gil was lifted, alive, from beneath the ruins.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Symphony_No.2_(Mahler,_Gustav)"
        }
      ],
      "rank": 13
    },
    {
      "slug": "vatican-excommunicates-traditionalist-schism",
      "headline": "Vatican excommunicates traditionalist bishops and priests over unauthorized consecrations in Switzerland",
      "overview": "The Vatican announced Thursday that it has excommunicated a group of traditionalist Catholic bishops and priests who defied Pope Leo XIV by carrying out unauthorized episcopal consecrations in Switzerland, and warned that their followers risk the same penalty. The decree formalizes a schism with a breakaway movement that rejects the reforms of the Second Vatican Council, cautioning hundreds of thousands of adherents that taking part in the group's sacraments places them outside communion with Rome.",
      "genre": "Culture",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxORFhPdjNudUZFenptYVBPVGI2ZGNaU0txdFZ0VE1ZOHVFN0FjbXlFN1psdXU1cDgtOFpnQVVmd2FwYmVqenA0Sks0UGxTRUhJNmNLQWp0VTU5UzlmWDVoemUtY2RkVkRhOGhrUUVlbkRIVWstRV9RZnp4dC1QcnJHcFF4UjlOeG5RSFUzenFENHNyUVJqOVM0Y3pCTndrcEpVcHpr?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxPT0Z2MWZZSHg4YmZJMktZek1XakNxdVVncmtlb090S2wzMEQ2SWNVbHBrbWxJZkpYLS1MTFFzVW5QYnphZUlPekx4elBaekJSTmRoSTBXenhaam9CN0VjLWJuZFlRekZDZkxUb3hvNHJSNDJCaDRLOGZmYXEySFZFZERoMWF2VDE1Mll1dDZTRmpaRTJZbWRxaXd0Rm1VOWxCd05hQjFBb1JwNWE0YU54aklB?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/vatican-excommunicates-traditionalist-schism.png",
        "alt": "The candle-lit interior of a gothic cathedral at dusk with empty pews and a bishop's mitre resting on a carved wooden stall.",
        "credit": "AI-generated"
      },
      "lead": true,
      "edition": "Evening Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Act of Supremacy 1534 (Parliament of England, 1534)",
          "excerpt": "the king our sovereign lord, his heirs and successors, kings of this realm, shall be taken, accepted, and reputed the only supreme head in earth of the church of England, called Anglicana Ecclesia",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Act_of_Supremacy_1534"
        },
        {
          "category": "historical",
          "title": "Canons and Decrees of the Council of Trent: Condemnation of the Errors of Wickliff, Hus, and Luther (1546)",
          "excerpt": "All and each of the aforesaid articles, or errors, as being, as is premised, respectively heretical or scandalous, or false, or offensive to pious ears, or suited to lead astray simple minds, or contrary to Catholic truth, we condemn, reprobate, and entirely reject.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Canons_and_Decrees_of_the_Council_of_Trent/Second_Part/Condemnation_of_the_Errors_of_Wickliff,_Hus,_and_Luther"
        },
        {
          "category": "literary",
          "title": "The Divine Comedy: Inferno, Canto XXVIII, by Dante Alighieri, trans. Henry Wadsworth Longfellow (1867)",
          "excerpt": "See now how I rend me; / How mutilated, see, is Mahomet; / In front of me doth Ali weeping go, / Cleft in the face from forelock unto chin; / And all the others whom thou here beholdest, / Disseminators of scandal and of schism / While living were, and therefore are cleft thus.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_28"
        },
        {
          "category": "literary",
          "title": "Paradise Lost, Book I, by John Milton (1674)",
          "excerpt": "Here we may reign secure; and, in my choice, / To reign is worth ambition, though in Hell: / Better to reign in Hell than serve in Heaven.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Paradise_Lost_(1674)/Book_I"
        },
        {
          "category": "artistic",
          "title": "Luther at the Diet of Worms, by Anton von Werner (1877)",
          "excerpt": "A monumental history painting of the pivotal 1521 confrontation between reformer and Church. Luther stands alone and upright before the massed ranks of Emperor Charles V, princes, and prelates, refusing to recant his writings. The scene distills a single figure's defiance of established ecclesiastical authority, the very act that hardens dissent into schism.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Luther_at_the_Diet_of_Worms.jpg",
          "image": {
            "src": "/covers/vatican-excommunicates-traditionalist-schism--art.png",
            "alt": "A robed Martin Luther stands and gestures before Emperor Charles V and assembled princes and clergy at the Diet of Worms.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Symphony No. 5 in D major/minor, Op. 107, \"Reformation,\" by Felix Mendelssohn (1830)",
          "excerpt": "Mendelssohn composed this symphony for the tercentenary of the Augsburg Confession, and its finale builds entirely on Luther's chorale \"Ein feste Burg ist unser Gott.\" The tune that became the battle hymn of the breakaway Reformation rises through the orchestra into a triumphant statement, turning the sound of religious rupture into music that celebrates the new confession born from it.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Symphony_No.5,_Op.107_(Mendelssohn,_Felix)"
        }
      ],
      "rank": 14
    },
    {
      "slug": "chinese-ai-model-glm-rivals-us-labs",
      "headline": "Chinese startup Z.ai's GLM-5.2 model rivals OpenAI and Anthropic at a fraction of the cost",
      "overview": "A new open-weight artificial-intelligence model called GLM-5.2, released by the Beijing startup Z.ai, has climbed to the top of third-party developer leaderboards and now rivals the coding and agent capabilities of leading American systems from OpenAI and Anthropic while costing roughly a sixth as much to run. Analysts are calling it a \"mini DeepSeek moment,\" reviving debate over how quickly China is closing the gap in the global AI race.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxPRHN2T0NPR3ZJMWZheVBDbUxxS1pBbHpfSjBmSTNseVFEU0FUcnc1OFJJNzNGZVB1M1ZIdExGb0NfTWpKYnhTSm8xRUhzbm14RWRNRWJyaWctbjVLWmdRM0d1UjFBalpyNDJoTDNwVldrRGxGN1U0aUtUcEp3a2t1aDYxdFpfRFMzZDZodUNNdEJpMkoyOWFYakZLb1NrZ0M4a01qQW9HTkFUQkltaGNjWk9CcXYxUGdndmNPclNEOVlxVFk?oc=5"
        },
        {
          "name": "BusinessWorld",
          "href": "https://bworldonline.com/technology/2026/07/02/760688/a-new-inexpensive-chinese-ai-model-is-catching-up-with-anthropic-openai-on-their-home-turf/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/chinese-ai-model-glm-rivals-us-labs.png",
        "alt": "A single flame cupped in a pair of open hands being passed toward many reaching hands in the dark.",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Announcement of the First Satellite (Sputnik), from Pravda / TASS, October 5, 1957",
          "excerpt": "the first artificial satellite in the world has been created. On October 4, 1957, this first satellite was successfully launched in the USSR.",
          "source": "NASA History (translation of the Soviet TASS/Pravda announcement)",
          "href": "https://www.nasa.gov/history/sputnik/14.html"
        },
        {
          "category": "historical",
          "title": "The Gutenberg Bible (the 42-line Bible), Mainz, c. 1455",
          "excerpt": "Printed at Mainz around 1455 with Johannes Gutenberg's newly invented movable metal type, the 42-line Bible was the first major book mass-produced in Europe. What once took a scribe years to copy by hand could now be struck off in identical, comparatively cheap editions, and within a few decades the technology spread across the continent. The press turned the reproduction of knowledge from a costly monopoly into something fast, repeatable, and impossible to contain, remaking who could rival whom in learning.",
          "source": "Wikimedia Commons (Library of Congress copy)",
          "href": "https://commons.wikimedia.org/wiki/File:Gutenberg_Bible,_Library_of_Congress,_1944.jpg"
        },
        {
          "category": "literary",
          "title": "The Hare and the Tortoise, from Aesop's Fables (trans. George Fyler Townsend, 1867)",
          "excerpt": "A HARE one day ridiculed the short feet and slow pace of the Tortoise, who replied, laughing: 'Though you be swift as the wind, I will beat you in a race.' The Hare, believing her assertion to be simply impossible, assented to the proposal; and they agreed that the Fox should choose the course and fix the goal. On the day appointed for the race the two started together. The Tortoise never for a moment stopped, but went on with a slow but steady pace straight to the end of the course. The Hare, lying down by the wayside, fell fast asleep. At last waking up, and moving as fast as he could, he saw the Tortoise had reached the goal, and was comfortably dozing after her fatigue. Slow but steady wins the race.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/21/21-h/21-h.htm"
        },
        {
          "category": "literary",
          "title": "Prometheus Bound, Aeschylus (5th century BCE), trans. Herbert Weir Smyth, 1926",
          "excerpt": "Yes, and numbers, too, chiefest of sciences, I invented for them, and the combining of letters, creative mother of the Muses' arts, with which to hold all things in memory.",
          "source": "Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010:card%3D436"
        },
        {
          "category": "artistic",
          "title": "Carrera de carros romanos (Roman Chariot Race), Ulpiano Checa, 1890",
          "excerpt": "Four-horse chariots thunder around the sand of a Roman circus, wheels almost touching as rival teams fight for the lead before a packed grandstand. Checa freezes the instant when the outcome is still open and any driver might yet surge ahead. It is competition rendered as raw speed and nerve, victory belonging to whoever dares the final push.",
          "source": "Museo Ulpiano Checa / Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Carrera_de_carros_romanos-Ulpiano_Checa.JPG",
          "image": {
            "src": "/covers/chinese-ai-model-glm-rivals-us-labs--art.png",
            "alt": "Ancient Roman charioteers drive four-horse chariots at full gallop around a crowded circus arena.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "A Philosopher Lecturing on the Orrery, Joseph Wright of Derby, c. 1766",
          "excerpt": "A lecturer demonstrates a mechanical model of the solar system, a single lamp standing in for the sun and throwing dramatic light across the rapt faces of ordinary onlookers, children among them. Wright of Derby dignifies the sharing of scientific knowledge with the reverence once reserved for religious scenes. The painting captures an Enlightenment faith that understanding, once demonstrated in the open, belongs to everyone who cares to learn.",
          "source": "Derby Museum and Art Gallery / Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Wright_of_Derby,_The_Orrery.jpg"
        }
      ],
      "rank": 15
    },
    {
      "slug": "germany-merz-tax-pension-labour-reforms",
      "headline": "Germany's Merz unveils sweeping package of tax cuts, pension overhaul and new sick-leave rules",
      "overview": "Chancellor Friedrich Merz's coalition unveiled a sweeping reform package on Thursday aimed at reviving Germany's stagnant economy, combining tax cuts, an overhaul of the pension system and tighter sick-leave rules. The plan arrives as the ruling coalition faces mounting pressure over weak growth and internal divisions.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxPOTJJZFpiQng2TXJEbXlJYWpEMVFvNlZkdHZxSnBPeG5aSzVvQ01zVXdpNWJFWURnaDgxZzJwNWJjelhLS09nZ1ItWDFReEdUVmtXSkNNVHh0VWdLTEpPeTJmU3RmNDBuUFVPQVZEZ3lfM1FRLWFjZjVRWE8tOXFPTk0wNkU1cjZzbHVyRmcwYjRjQldOR3c?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPeC12SkJFeXFXYUY5eDhRMnV6TUloNWtndnExTVpQaUxlaVY3eUExR2Fxc21IeVNLYy14Q3pxemtTVVBydlZ4S3AyN1JVU1MydDZPakN1S3VsekVnRFJIVkN1RFVLcjBWb0prckdBU3BETlBJN192NERFV2RqblJ4dWc1d3pSV1pIZ1l1eUdzd3BZVXlNcnk3cFNUaUVPR0xKVGFR?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/germany-merz-tax-pension-labour-reforms.png",
        "alt": "A grand neoclassical German government building at dusk beneath a brooding grey sky.",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Kaiser Wilhelm I's Royal Proclamation on Social Policy, the Imperial Message read to the Reichstag by Otto von Bismarck (November 17, 1881)",
          "excerpt": "curing social defects will have to be pursued not only through the repression of Social Democratic excesses but also through the consistent and positive promotion of workers' welfare",
          "source": "German History in Documents and Images (GHDI)",
          "href": "https://germanhistorydocs.org/en/forging-an-empire-bismarckian-germany-1866-1890/kaiser-wilhelm-i-s-royal-proclamation-on-social-policy-november-17-1881"
        },
        {
          "category": "historical",
          "title": "Franklin D. Roosevelt, Statement on Signing the Social Security Act (August 14, 1935)",
          "excerpt": "The civilization of the past hundred years, with its startling industrial changes, has tended more and more to make life insecure. Young people have come to wonder what would be their lot when they came to old age. The man with a job has wondered how long the job would last.",
          "source": "U.S. Social Security Administration",
          "href": "https://www.ssa.gov/history/fdrstmts.html"
        },
        {
          "category": "literary",
          "title": "Jean-Jacques Rousseau, The Social Contract (1762; trans. G. D. H. Cole)",
          "excerpt": "Man is born free; and everywhere he is in chains.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/ebooks/46333"
        },
        {
          "category": "literary",
          "title": "Charles Dickens, Hard Times (1854)",
          "excerpt": "Now, what I want is, Facts. Teach these boys and girls nothing but Facts. Facts alone are wanted in life.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/ebooks/786"
        },
        {
          "category": "artistic",
          "title": "Giuseppe Pellizza da Volpedo, Il Quarto Stato (The Fourth Estate), 1901",
          "excerpt": "A column of working men, women and a child advance out of shadow toward the viewer, three figures striding at their head with quiet resolve. Painted over three years as a monument to the labouring class taking its place beside the older estates of society, the vast canvas turns an ordinary strike into a solemn procession. It has become Europe's enduring emblem of workers pressing their claim on the social order.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Il_quarto_stato_(Volpedo).jpg",
          "image": {
            "src": "/covers/germany-merz-tax-pension-labour-reforms--art.png",
            "alt": "A large crowd of working-class men, women and a child walk forward together with three figures leading at the front.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Ludwig van Beethoven, Symphony No. 9 in D minor, Op. 125 ('Choral'), 1824",
          "excerpt": "In its final movement the symphony gathers soloists, chorus and full orchestra to sing Schiller's vision of all people becoming brothers, an audacious attempt to bind a fractured society into a single harmony. The music strains, argues and finally resolves into a shared theme that every voice can carry. It stands as the great artistic image of a common social bond forged out of dissonance.",
          "source": "IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
        }
      ],
      "rank": 16
    },
    {
      "slug": "tesla-record-q2-deliveries-europe-rebound",
      "headline": "Tesla posts record second-quarter deliveries as European sales rebound",
      "overview": "Tesla reported record deliveries for the second quarter, with a rebound in European sales suggesting that the worst of the consumer backlash tied to Elon Musk may be easing. The results lifted the automaker's shares and offered relief after a bruising stretch of falling demand.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMi0AFBVV95cUxPeWZHTktUcmFRU1MwcGdiZVRlajZncTROdU1wTHg5MkN3aFZFQ3NuYWZFV1A4eWtnRTk5cEFBWUVEMlJoUmRjZl9TbEF3MHkxNUFiY0puWlh2enZxLURfRFVPRjV3MlNoQndBYlY2TjhfSi1QUG80bDdQRjl2cmljTTE3a0UyNkhQUTd6NWlXVTJuVXV0NS01Y29YTWJlQ1NKR1JQVHFYN2RSUUtFb21iQUc3SmVQc1o4UlZqdHpJbzB4RTVMT1VfOFJMck5lN25K?oc=5"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPLWlBdHdMMmNVUE5Ja1NRZnJuNXh4SXJiTXpPdWY4LVBqRE95LXp3R01FSVRfUUFac05IcHg3UzFUMEM2YmdFcHpDVnZXb1FMTGZ5Q1R6M2FYQ21yOVlxb0lWTW1Gd3VLMGxNbnVVQjl6cGZJdFNHUjZnZ0VQdWxFUHNjazNKdkVIdGNUQ0dPQTBMenAtS3VGcjRla1o4aU0?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/tesla-record-q2-deliveries-europe-rebound.png",
        "alt": "Rows of identical electric cars parked in a vast lot at golden hour, seen from above.",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Henry Ford (with Samuel Crowther), \"My Life and Work\" (1922)",
          "excerpt": "We build our cars absolutely interchangeable. All parts are as nearly alike as chemical analysis, the finest machinery, and the finest workmanship can make them.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/ebooks/7213"
        },
        {
          "category": "historical",
          "title": "Napoleon Bonaparte, \"Speech upon returning from exile\" (1815)",
          "excerpt": "They bring you back these eagles; let them be your rallying-point.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Napoleon_I's_speech_upon_returning_from_exile"
        },
        {
          "category": "literary",
          "title": "William Shakespeare, \"Coriolanus,\" Act III (c. 1608; Yale ed. 1924)",
          "excerpt": "You common cry of curs! whose breath I hate / As reek o' the rotten fens, whose loves I prize / As the dead carcasses of unburied men / That do corrupt my air, I banish you",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Coriolanus_(1924)_Yale/Text/Act_III"
        },
        {
          "category": "literary",
          "title": "The Book of Job 42:12, King James Bible (1611)",
          "excerpt": "So the LORD blessed the latter end of Job more than his beginning: for he had fourteen thousand sheep, and six thousand camels, and a thousand yoke of oxen, and a thousand she asses.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Job"
        },
        {
          "category": "artistic",
          "title": "Umberto Boccioni, \"The City Rises\" (La città che sale), 1910-11",
          "excerpt": "Boccioni's vast Futurist canvas is a whirlwind of surging color in which straining horses and toiling workers dissolve into pure forward energy amid the scaffolding of a rising industrial city. It is a hymn to the machine age and the momentum of mass modern labor, the same restless drive toward speed and scale that powers the automobile boom. The painting turns raw industrial ambition into an image of unstoppable acceleration.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:The_City_Rises_by_Umberto_Boccioni_1910.jpg",
          "image": {
            "src": "/covers/tesla-record-q2-deliveries-europe-rebound--art.png",
            "alt": "A large Futurist painting showing a rearing horse and laborers blurred into swirling strokes of color before the scaffolding of buildings under construction.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Arthur Honegger, \"Pacific 231\" (Mouvement symphonique No. 1), 1923",
          "excerpt": "Honegger's orchestral movement builds from the heavy stillness of a steam locomotive at rest into a driving, accelerating roar as the great machine gathers speed. Rhythms pile on rhythms until the whole orchestra seems to hurtle down the rails, an unapologetic celebration of the beauty and power of the machine. It captures the exhilaration of engineered speed that has always defined the romance of the automobile.",
          "source": "IMSLP (Petrucci Music Library)",
          "href": "https://imslp.org/wiki/Pacific_231_(Honegger,_Arthur)"
        }
      ],
      "rank": 17
    },
    {
      "slug": "microsoft-frontier-ai-deployment-firm",
      "headline": "Microsoft launches Frontier, a $2.5 billion unit with 6,000 engineers to help companies deploy AI",
      "overview": "Microsoft said Thursday it is committing $2.5 billion to a new division called Microsoft Frontier that will embed 6,000 engineers, consultants and salespeople directly with corporate clients to help them adopt artificial intelligence. The move, led by former Asia business chief Rodrigo Kede Lima, follows a similar $1 billion \"forward-deployed engineering\" push announced by Amazon two days earlier.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxObWVCMGFFWk1NRWJKRmI5T0hzWmxuNXZoUUM3VUJlNjY4RzZuU2tVRWNwZXliQlRNNDZZbFhSdHlBc2dQUzl5TS05YjBjOENFVTExaU0xMGp0TU1WemlYNDlEazNMSTRSXy1MSDJ2RnZZcHMzcDZiTVFQaDBPWUhYQWhDalUtUFE0Z21YRVltY29jR205dVc0Q3JiOWE1UTdwanR0VGlhRkJqYTZRVVJyUXZzODltSUNlZkJkS3RDelR6Zw?oc=5"
        },
        {
          "name": "CNBC",
          "href": "https://www.cnbc.com/2026/07/02/microsoft-commits-2point5-billion-6000-employees-ai-implementation-unit.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/microsoft-frontier-ai-deployment-firm.png",
        "alt": "A lone figure walking toward a softly glowing server cabinet in a dim data hall.",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Principles of Scientific Management — Frederick Winslow Taylor (1911)",
          "excerpt": "When one ceases to deal with men in large gangs or groups, and proceeds to study each workman as an individual, if the workman fails to do his task, some competent teacher should be sent to show him exactly how his work can best be done, to guide, help, and encourage him, and, at the same time, to study his possibilities as a workman.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/6435/pg6435.txt"
        },
        {
          "category": "historical",
          "title": "Electricity for the Farm — Frederick Irving Anderson (1915)",
          "excerpt": "Instantly light sprang from everywhere. In the barn-yard a street lamp with an 18-inch reflector illuminated all under it for a space of 100 feet with bright white rays of light.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/27257/pg27257.txt"
        },
        {
          "category": "literary",
          "title": "A Connecticut Yankee in King Arthur's Court — Mark Twain (1889)",
          "excerpt": "I was training a crowd of ignorant folk into experts—experts in every sort of handiwork and scientific calling.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/A_Connecticut_Yankee_in_King_Arthur's_Court/Chapter_X"
        },
        {
          "category": "literary",
          "title": "Looking Backward: 2000–1887 — Edward Bellamy (1888)",
          "excerpt": "When the nation became the sole employer, all the citizens, by virtue of their citizenship, became employees, to be distributed according to the needs of industry.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/624/624-h/624-h.htm"
        },
        {
          "category": "artistic",
          "title": "An Experiment on a Bird in an Air Pump — Joseph Wright of Derby (1768)",
          "excerpt": "A travelling natural philosopher stages the era's new technology as live theatre, pumping the air from a glass globe in which a white cockatoo begins to suffocate before a family gathered at a candlelit table. The onlookers' faces run from rapt fascination to alarm to indifference, mapping every reaction a household might have when a powerful new capability is demonstrated in its midst. It captures the moment an outside expert carries a marvelous, disquieting instrument directly into the client's own parlour.",
          "source": "National Gallery, London (via Wikimedia Commons)",
          "href": "https://commons.wikimedia.org/wiki/File:An_Experiment_on_a_Bird_in_an_Air_Pump_by_Joseph_Wright_of_Derby,_1768.jpg",
          "image": {
            "src": "/covers/microsoft-frontier-ai-deployment-firm--art.png",
            "alt": "A travelling scientist demonstrates a vacuum air pump containing a bird in a glass globe to a family gathered around a candlelit table at night.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Die Meistersinger von Nürnberg — Richard Wagner (1868)",
          "excerpt": "Wagner's comedy unfolds inside a guild of master craftsmen who have codified their art into strict rules, ranks, and rituals of apprenticeship, and who must decide whether a gifted outsider can be admitted as a master. The apprentice David reels off the guild's exhaustive tabulature while the elder masters debate how their craft should be taught, judged, and handed on. It is a portrait of how hard-won expertise is institutionalized and deliberately propagated to newcomers—the human machinery behind spreading a specialized skill.",
          "source": "IMSLP (Petrucci Music Library)",
          "href": "https://imslp.org/wiki/Die_Meistersinger_von_N%C3%BCrnberg,_WWV_96_(Wagner,_Richard)"
        }
      ],
      "rank": 18
    },
    {
      "slug": "damascus-cafe-bombing",
      "headline": "Explosive device kills at least five at a café in Damascus",
      "overview": "An explosive device detonated at a café in Damascus on Thursday, killing at least five people and wounding 16, Syrian state media reported. The blast is among the deadliest attacks in the capital since the country's fragile post-war transition.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxPdVdqcVBhMG5ZdnNMX2tqUnZGVjh3QnJNMjlWbkhIMjBmejdjYjhCOUQ4RzhVdFZQc1UySF9mRzRCTjM4U1dRMFNxV2J0TW1MUzlNekROSk9PR3ZVdnR6N2Eyd2RaRDloaUVzbC1IQnJvZW9PaV81VlU5ZVE2YlpQU3NJR1dRZWR1eDByRTcxTE50V2c?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNQ1FuZFNuTEZTUUhkZmNuOFJ1VXBOR3JCNTJSeWE1bzlGUm5LSGZ4aGVWREdueU9uckxILVUzMzlyZWprdDc0cXBzQnVBR3h0YXJta2hBdG0yS3IyS3cwYWozN3UzNV9xTUpySFVkQW5FR2sxUmIxbmRabml3RTh1eGduZDF5RmtaZkZKT2hRQXNZYXBvc1UtbUhvT25rSHRMY0RkSHRYOHp1cUtOempvQWZ1WQ?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/damascus-cafe-bombing.png",
        "alt": "The shattered, deserted interior of a small café at night, filled with dust and overturned chairs.",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "History of the Peloponnesian War (Book VII, the massacre at Mycalessus), Thucydides, c. 411 BC",
          "excerpt": "The Thracians bursting into Mycalessus sacked the houses and temples, and butchered the inhabitants, sparing neither youth nor age, but killing all they fell in with, one after the other, children and women, and even beasts of burden, and whatever other living creatures they saw.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_7"
        },
        {
          "category": "historical",
          "title": "The Annals (Book XIV, the riot at the Pompeii amphitheatre, AD 59), Tacitus, c. AD 117",
          "excerpt": "There were brought to Rome a number of the people of Nuceria, with their bodies mutilated by wounds, and many lamented the deaths of children or of parents.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_14"
        },
        {
          "category": "literary",
          "title": "The Book of Lamentations (King James Version), c. 6th century BC",
          "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow!",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
        },
        {
          "category": "literary",
          "title": "The Second Coming, W. B. Yeats, 1920",
          "excerpt": "Things fall apart; the centre cannot hold; / Mere anarchy is loosed upon the world, / The blood-dimmed tide is loosed, and everywhere / The ceremony of innocence is drowned.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Second_Coming_(Yeats)"
        },
        {
          "category": "artistic",
          "title": "The Third of May 1808, Francisco de Goya, 1814",
          "excerpt": "Goya's canvas freezes the instant before a faceless firing squad kills unarmed townspeople rounded up in the dark. A single figure in a white shirt throws his arms wide in terror and defiance, lit by a stark lantern, while the dead already lie in their own blood at his feet. It is the definitive image of anonymous state violence tearing through ordinary civilian lives.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
          "image": {
            "src": "/covers/damascus-cafe-bombing--art.png",
            "alt": "A firing squad shoots a group of unarmed civilians at night, one man kneeling with his arms flung upward before the raised rifles.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Requiem in D minor, K.626 (Lacrimosa), Wolfgang Amadeus Mozart, 1791",
          "excerpt": "Mozart's unfinished Requiem gives musical shape to collective mourning, its Lacrimosa rising in slow, sighing strings toward a lament for the dead. The movement's swelling and breaking phrases evoke a community weeping over bodies carried from a scene of sudden death. Left incomplete at the composer's own death, it stands as an elegy for lives cut short before their time.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
        }
      ],
      "rank": 19
    },
    {
      "slug": "papua-rebels-kill-american-pilot",
      "headline": "Separatist rebels in Indonesia's Papua kill an American pilot and burn his plane",
      "overview": "Separatist rebels in Indonesia's Papua region said they shot and killed an American pilot and set fire to his aircraft, accusing him of transporting Indonesian troops. Indonesian authorities were working to verify the claim from the remote, conflict-torn highlands where a decades-old independence insurgency has flared.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxOZkRCWmRtUEhPUkxPRjZHRWhFd1AyMUNnQzRLbXZBOUVFRzlxeHJrUmpmRVhyZ29ZNTJ2ZVF6b3VVdldXQ3NnR3hYSVlwek5GLWhxd0pmWW9KQ05zdFRlTmNIY2pQdUpvMjNEVzhNWFVSTUp3VGU1bHdWVDFreTlEWG1BWk9qUXZFU2xpZVc4MHIxTUUzNXV0QmpKajAtQQ?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMi0AFBVV95cUxNWThBR2drem1BZlZ3X2l3cUNHOXZuc3NlOUNpaWpQQm5kZDlZTDdMa2pTZ1JQb2lBUzVwNGp5MzZkYnAxSk9fN0pCVUJQQ281S0Q4ZHBQS285RFhxaTAzcWI1YjZZREZabmRQX3RqX0VEZ1dLc1J1M0R3UGhpUldOMmpqZkFCbUV1bEx1cjlEd2RoTWE1RC1BQkxGcVZYa2Rxa2tuUllPQ2JiU1VrZHA0WDV4cWtjV3RUMFFxdzZzcUNVR042VERILURhd25kUmxR?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/papua-rebels-kill-american-pilot.png",
        "alt": "The charred wreckage of a small aircraft smouldering in a misty highland jungle clearing at dawn.",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Sukarno's Proclamation of Indonesian Independence, read by Sukarno and Hatta (17 August 1945)",
          "excerpt": "WE THE PEOPLE OF INDONESIA HEREBY DECLARE THE INDEPENDENCE OF INDONESIA. MATTERS WHICH CONCERN THE TRANSFER OF POWER AND OTHER THINGS WILL BE EXECUTED BY CAREFUL MEANS AND IN THE SHORTEST POSSIBLE TIME.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Sukarno's_Proclamation_of_Indonesian_Independence"
        },
        {
          "category": "historical",
          "title": "Emilio Aguinaldo's Proclamation of June 23, 1898 (establishing the revolutionary government)",
          "excerpt": "The dictatorial government will be entitled hereafter the revolutionary government, whose object is to struggle for the independence of the Philippines until all nations, including the Spanish, shall expressly recognize it, and to prepare the country so that a true republic may be established.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Emilio_Aguinaldo's_Proclamation_of_June_23,_1898"
        },
        {
          "category": "literary",
          "title": "\"The Man Who Would Be King\" by Rudyard Kipling (1888)",
          "excerpt": "Out he goes, looking neither right nor left, and when he was plumb in the middle of those dizzy dancing ropes, 'Cut, you beggars,' he shouts; and they cut, and old Dan fell, turning round and round and round, twenty thousand miles, for he took half an hour to fall till he struck the water, and I could see his body caught on a rock with the gold crown close beside.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/8147/8147-h/8147-h.htm"
        },
        {
          "category": "literary",
          "title": "Heart of Darkness by Joseph Conrad (1899/1902)",
          "excerpt": "It was the shaft of a spear that, either thrown or lunged through the opening, had caught him in the side, just below the ribs; the blade had gone in out of sight, after making a frightful gash; my shoes were full; a pool of blood lay very still, gleaming dark-red under the wheel.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/ebooks/219"
        },
        {
          "category": "artistic",
          "title": "The Death of General Wolfe, Benjamin West, 1770",
          "excerpt": "West staged the death of a British commander on a distant colonial battlefield during the war for North America, surrounding the dying general with grieving officers and, in the foreground, a contemplative Indigenous warrior. The scene renders a faraway frontier conflict as high tragedy, dwelling on a foreign soldier who fell far from home in a war over remote, contested land. It became the defining image of the outsider undone in a colonial struggle at the edge of empire.",
          "source": "Wikimedia Commons (National Gallery of Canada)",
          "href": "https://commons.wikimedia.org/wiki/File:Benjamin_West_005.jpg",
          "image": {
            "src": "/covers/papua-rebels-kill-american-pilot--art.png",
            "alt": "A dying general in a white shirt lies surrounded by grieving officers on a battlefield, with a seated Indigenous warrior in the foreground under a stormy sky.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Finlandia, Op. 26 by Jean Sibelius (1900)",
          "excerpt": "Sibelius composed this tone poem as a veiled protest against imperial Russian censorship, and it became the musical emblem of a small northern nation's drive for independence. Brooding, menacing brass gives way to a surging call to arms and finally to a serene, hymn-like theme of national hope. Its story is that of a remote frontier people insisting on self-rule against a vastly larger power.",
          "source": "IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)"
        }
      ],
      "rank": 20
    },
    {
      "slug": "peru-el-nino-state-of-emergency",
      "headline": "Peru declares a 60-day state of emergency in 796 districts ahead of El Niño rains",
      "overview": "Peru's government declared a state of emergency in 796 districts — about 40% of the country — for 60 days, citing the \"very high\" risk of intense rainfall, flooding and landslides from the El Niño phenomenon. The decree, signed by President José María Balcázar and covering regions from Lima to Cusco and Arequipa, is meant to speed prevention and relief work before the rainy season.",
      "genre": "Climate",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQTjQtWGhzT2hhQ016X1d6Z1BCRFBLUnBrQ0dtV04wS2xtLXN1SkhseGRUdE9uS3pQWmU0S1JPN3h4UHBieDZLOWNCd0J5Vk9weGx2Wk9ZUW1WVkpHekNrcGdGQmt1d3RKd2NhdmZzTm5XZUJpb2NvNnVLYVNLTlRfbWI3UE5sNjFxcmlMS2k2VndWaUFUUU5kYjZyOTU5cGxsMUZSNDVteHcycE9nNUNpa1BR?oc=5"
        },
        {
          "name": "PQS",
          "href": "https://pqs.pe/actualidad/gobierno-declara-en-emergencia-796-distritos-ante-el-riesgo-por-el-fenomeno-el-nino/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/peru-el-nino-state-of-emergency.png",
        "alt": "Dark storm clouds and heavy rain over an Andean valley town beside a swollen muddy river.",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Flood Tablet (Epic of Gilgamesh, Tablet XI), Neo-Assyrian, Nineveh, c. 7th century BC",
          "excerpt": "On this clay tablet from Ashurbanipal's library, the survivor Utnapishtim recounts how the gods secretly warned him of a coming deluge and told him to abandon his possessions and build a great boat. Forewarned, he loaded aboard his family, craftsmen and animals and rode out the flood that destroyed all mankind. It is humanity's oldest written record of heeding a warning and preparing before the waters rise, the same logic behind Peru declaring an emergency ahead of the rains.",
          "source": "British Museum (via Google Arts & Culture)",
          "href": "https://artsandculture.google.com/asset/the-flood-tablet-relating-part-of-the-epic-of-gilgamesh/wQGL1dmyVmXRYA"
        },
        {
          "category": "historical",
          "title": "History of the Johnstown Flood, Willis Fletcher Johnson, 1889",
          "excerpt": "When the great wall that held the body of water began to crumble at the top he sent a message begging the people of Johnstown for God's sake to take to the hills.... The warning so often proved useless that little attention was paid to it this time.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/41271/pg41271-images.html"
        },
        {
          "category": "literary",
          "title": "Genesis 7 (the Flood of Noah), World English Bible",
          "excerpt": "The waters prevailed exceedingly on the earth. All the high mountains that were under the whole sky were covered.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Bible_(World_English)/Genesis"
        },
        {
          "category": "literary",
          "title": "Metamorphoses, Book 1 (Deucalion's Flood), Ovid, trans. Brookes More, 1922",
          "excerpt": "And now one vast expanse, the land and sea were mingled in the waste of endless waves—a sea without a shore.",
          "source": "Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=1:card=253"
        },
        {
          "category": "artistic",
          "title": "The Great Wave off Kanagawa, Katsushika Hokusai, c. 1830–1832",
          "excerpt": "A colossal wave, its crest splintering into grasping claws of foam, rears over three slender boats whose oarsmen bend helplessly beneath it, while the sacred cone of Mount Fuji shrinks to a small triangle on the far horizon. Hokusai captures the instant before the sea falls, the frailty of human craft measured against the ocean's overwhelming power. It is the enduring image of coastal communities bracing against a force they cannot hold back.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Katsushika_Hokusai_-_Thirty-Six_Views_of_Mount_Fuji-_The_Great_Wave_Off_the_Coast_of_Kanagawa_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/peru-el-nino-state-of-emergency--art.png",
            "alt": "A towering ocean wave with clawlike curls of foam breaks over three long boats while a small Mount Fuji sits in the distance.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Symphony No. 6 in F major, Op. 68 'Pastoral' (IV. Gewitter. Sturm), Ludwig van Beethoven, 1808",
          "excerpt": "In the fourth movement Beethoven turns an idyllic countryside into a scene of terror: distant rumbles in the low strings gather into hammering timpani, a shriek of piccolo lightning, and swirling string figures that lash like wind and rain. The storm builds without warning and overwhelms everything before it slowly subsides into calm. It is nature's fury rendered in sound, and the dread of the gathering sky that drives people to seek shelter before it breaks.",
          "source": "IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
        }
      ],
      "rank": 21
    },
    {
      "slug": "samsung-90-billion-chungcheong",
      "headline": "Samsung to invest $90 billion in South Korea's Chungcheong region for chips, displays and batteries",
      "overview": "Samsung Group detailed plans to invest 140 trillion won ($90 billion) in South Korea's central Chungcheong region to produce display panels, memory chips, chip-packaging and next-generation batteries. Samsung Display will spend 67 trillion won and Samsung Electronics 56 trillion won on high-bandwidth memory packaging, part of a broader push unveiled at an event hosted by President Lee Jae Myung.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxNaXVxbzFtcnF6cXd6eFZKMFpnZjBoTHZaR0c2anZBQWY4bnNQeTJ5aUpEQVFjZV96Y3ZnWmQyM2EwZEdnMldwZW1Tcm9DeVE4VUdvYlkyRnRXc1lQTDRjUERxcjRSdl9xbGFMSno2QUhsWVlCcHpvcFg4cUxHRUh4Nm9mWE5sd1NPUUs5ZUVFS1dMbFo3czlTVExiM2dEQnFna04yaW9WcF9PcWZkU1ZFX19SUW55RUVibDltZ2hldFFDWjIxZ09j?oc=5"
        },
        {
          "name": "The Star",
          "href": "https://www.thestar.com.my/tech/tech-news/2026/07/02/samsung-group-details-plans-to-invest-90-billion-in-south-korea039s-central-region"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/samsung-90-billion-chungcheong.png",
        "alt": "The vast interior of a semiconductor fabrication plant with long rows of gleaming clean-room machinery.",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Herodotus, The Histories, Book II (An Account of Egypt), c. 430 BC — Cheops builds the Great Pyramid",
          "excerpt": "So some were appointed to draw stones from the stone-quarries in the Arabian mountains to the Nile, and others he ordered to receive the stones after they had been carried over the river in boats, and to draw them to those which are called the Libyan mountains; and they worked by a hundred thousand men at a time, for each three months continually. Of this oppression there passed ten years while the causeway was made by which they drew the stones... For the making of the pyramid itself there passed a period of twenty years.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/2131/2131-h/2131-h.htm"
        },
        {
          "category": "historical",
          "title": "The Pacific Railway Act of 1862, United States Congress",
          "excerpt": "An Act To aid in the construction of a railroad and telegraph line from the Missouri River to the Pacific Ocean, and to secure to the Government the use of the same for postal, military, and other purposes.",
          "source": "U.S. National Archives",
          "href": "https://www.archives.gov/milestone-documents/pacific-railway-act"
        },
        {
          "category": "literary",
          "title": "Kubla Khan by Samuel Taylor Coleridge, 1816",
          "excerpt": "In Xanadu did Kubla Khan / A stately pleasure-dome decree: / Where Alph, the sacred river, ran / Through caverns measureless to man / Down to a sunless sea. / So twice five miles of fertile ground / With walls and towers were girdled round.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/29090/pg29090.txt"
        },
        {
          "category": "literary",
          "title": "Paradise Lost, Book I, by John Milton, 1667 — Mammon and the building of Pandemonium",
          "excerpt": "By him first / Men also, and by his suggestion taught, / Ransacked the centre, and with impious hands / Rifled the bowels of their mother Earth / For treasures better hid.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm"
        },
        {
          "category": "artistic",
          "title": "The Alchymist, in Search of the Philosopher's Stone, Discovers Phosphorus by Joseph Wright of Derby, 1771 (reworked 1795)",
          "excerpt": "In a vaulted, cathedral-like chamber a kneeling alchemist is struck with wonder as his retort blazes with the cold light of newly discovered phosphorus, the entire scene lit by that single unearthly glow. Wright makes the pursuit of transmutation feel monumental and sacred, a private laboratory raised to the scale of a temple. It is the perfect image of turning base matter into something priceless — the ancient dream that anticipates transforming sand into silicon.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Joseph_Wright_of_Derby_The_Alchemist.jpg",
          "image": {
            "src": "/covers/samsung-90-billion-chungcheong--art.png",
            "alt": "A kneeling alchemist in a vast vaulted chamber gazes at a large glass flask that glows brilliantly with newly discovered phosphorus.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Das Rheingold, WWV 86A, by Richard Wagner, 1869 — the Nibelheim forge scene",
          "excerpt": "In the third scene Wagner plunges into Nibelheim, the subterranean smithy where the dwarf Alberich, having renounced love for gold, drives his enslaved kin to hammer treasure without pause. The orchestra churns with the relentless clang of eighteen tuned anvils, a soundscape of industrial toil harnessed to boundless ambition. It captures the seductive, ringing promise and the ruthless cost of forging vast wealth from the raw ore of the earth.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
        }
      ],
      "rank": 22
    },
    {
      "slug": "skyroot-vikram-1-first-private-orbital",
      "headline": "India's Skyroot sets July launch window for Vikram-1, the country's first private orbital rocket",
      "overview": "Skyroot Aerospace announced a launch window of July 12 to August 4 for Vikram-1, which would be the first orbital-class rocket built by a private Indian company, to fly from the Satish Dhawan Space Centre at Sriharikota. The multi-stage rocket, designed to carry up to 350 kilograms to low Earth orbit, follows Skyroot's 2022 suborbital flight and marks a milestone for India's fast-growing private space sector.",
      "genre": "Science",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxOOC1TUVhvdVZ5YU1KdU8ybFgxRldSWmU5R242WXp0VWd3UzdDQmNiTHZmUVdrdWFmcnJqTjc1TWpNRFo3ckk1RDJydkJ3el85eENNYy0yblNqS3pvMnR5aFBGV3YtZjBMVGNLbVEyenMzejdLOUhiUDU0d0ZkdHg1aklGVGZwR2pjQjJlaWJBaWM1djVfRDNLZUdqdkFrcUZwLTlsZ19yenphQzc5eUlhd2FtRFl3ZlpFa0pENVVR?oc=5"
        },
        {
          "name": "Deccan Herald",
          "href": "https://www.deccanherald.com/science/space/skyroot-announces-launch-window-for-vikram-1-indias-first-privately-developed-orbital-class-rocket-4059703"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/skyroot-vikram-1-first-private-orbital.png",
        "alt": "A slender white rocket on a coastal launch pad at dawn, wreathed in venting vapour.",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Robert H. Goddard, \"A Method of Reaching Extreme Altitudes\" (1919/1920)",
          "excerpt": "A further application of much general interest is the possibility of sending a mass beyond the predominating gravitational field of the earth. Concerning the possibility of demonstrating this point by hitting the moon with a rocket, it can be said, apart from the questions of aiming and of correcting the flight, that the ignition of but a few pounds of flash powder should be visible in a powerful telescope.",
          "source": "Nature / Internet Archive",
          "href": "https://archive.org/details/paper-doi-10_1038_105809a0"
        },
        {
          "category": "historical",
          "title": "Orville Wright's telegram announcing the first powered flight, 17 December 1903",
          "excerpt": "Success four flights thursday morning all against twenty one mile wind started from level with engine power alone average speed through air thirty one miles longest 57 seconds inform Press home Christmas.",
          "source": "Wikimedia Commons (Library of Congress)",
          "href": "https://commons.wikimedia.org/wiki/File:Telegram_from_Orville_Wright_in_Kitty_Hawk,_North_Carolina,_to_His_Father_Announcing_Four_Successful_Flights,_1903_December_17.png"
        },
        {
          "category": "literary",
          "title": "Jules Verne, \"From the Earth to the Moon\" (1865)",
          "excerpt": "It is perhaps reserved for us to become the Columbuses of this unknown world. Only enter into my plans, and second me with all your power, and I will lead you to its conquest, and its name shall be added to those of the thirty-six states which compose this Great Union.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/ebooks/83"
        },
        {
          "category": "literary",
          "title": "Ovid, \"Metamorphoses,\" Book VIII: Daedalus and Icarus (8 CE)",
          "excerpt": "My son, I caution you to keep the middle way, for if your pinions dip too low the waters may impede your flight; and if they soar too high the sun may scorch them.",
          "source": "Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=8:card=183"
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder, \"Landscape with the Fall of Icarus\" (c. 1555)",
          "excerpt": "Bruegel sets the boy's plunge from the sky at the margin of an ordinary working world: a ploughman turns his furrow, a shepherd gazes upward, and ships sail on while Icarus vanishes into the sea. The painting is the great emblem of the dream of flight and the price of reaching too high, a warning shadow behind every audacious attempt to leave the earth. Its serene, indifferent landscape makes the ambition at its center feel all the more daring.",
          "source": "Wikimedia Commons (Royal Museums of Fine Arts of Belgium)",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Landscape_with_the_Fall_of_Icarus_-_WGA03322.jpg",
          "image": {
            "src": "/covers/skyroot-vikram-1-first-private-orbital--art.png",
            "alt": "A wide coastal landscape with a ploughman, a shepherd, and sailing ships, while the legs of the fallen Icarus disappear into the sea at lower right.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Richard Strauss, \"Also sprach Zarathustra,\" Op. 30 (1896)",
          "excerpt": "The tone poem opens with the famous \"Sunrise\" fanfare, a low organ rumble giving way to a rising trumpet call that climbs from darkness into blazing, full-orchestra daylight. That surge upward has become the universal musical image of dawn, aspiration, and humanity reaching toward the heavens. Its arc of accumulating power mirrors the slow build and sudden triumph of a rocket rising from the pad.",
          "source": "IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/Also_sprach_Zarathustra,_Op.30_(Strauss,_Richard)"
        }
      ],
      "rank": 23
    },
    {
      "slug": "uk-apology-forced-adoptions",
      "headline": "UK government formally apologizes for state role in decades of forced adoptions",
      "overview": "Prime Minister Keir Starmer issued a formal apology on Thursday for the British state's role in pressuring tens of thousands of unmarried mothers to give up their babies for adoption between the late 1940s and the 1970s. An estimated 185,000 babies were adopted in England and Wales during the period, and the government paired the apology with expanded access to adoption records and mental-health support.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxObWl2UjRFeEVHREMxbzVLZFZ0YkQzdk5PVnJ5clczMTFEbEx6OThEb3c3ODJBSjhhMXNrN251STNEajlsMXpsN0NjNGtGVTQ2anUxVHZMM2dMVGVpM0V1NGw2NnQ5RW1nUEo3ZXhaNWhzRHlTUTJfQ0tjNXlHanl6MDN2bDRoVTFXLUFCdmxQR3VWcTVrd1FSX202aElkd3pi?oc=5"
        },
        {
          "name": "The Washington Post",
          "href": "https://www.washingtonpost.com/world/2026/07/02/uk-forced-adoption-apology-keir-starmer/e077fb7e-75f6-11f1-b665-5f8be87f3787_story.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/uk-apology-forced-adoptions.png",
        "alt": "An empty vintage nursery at dusk with a single wooden cradle beneath a tall window.",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Apology to Australia's Indigenous Peoples (the Stolen Generations) — Prime Minister Kevin Rudd, 13 February 2008",
          "excerpt": "To the mothers and the fathers, the brothers and the sisters, for the breaking up of families and communities, we say sorry.",
          "source": "Wikisource (Australian Parliament)",
          "href": "https://en.wikisource.org/wiki/Apology_to_Australia%27s_Indigenous_Peoples"
        },
        {
          "category": "historical",
          "title": "State Apology to the Magdalene Women — Taoiseach Enda Kenny, Dáil Éireann, 19 February 2013",
          "excerpt": "Therefore, I, as Taoiseach, on behalf of the State, the government and our citizens deeply regret and apologise unreservedly to all those women for the hurt that was done to them, and for any stigma they suffered, as a result of the time they spent in a Magdalene Laundry",
          "source": "RTÉ / Government of Ireland (official statement)",
          "href": "https://www.rte.ie/documents/news/kenny-magdelene-speech.pdf"
        },
        {
          "category": "literary",
          "title": "The Scarlet Letter — Nathaniel Hawthorne (1850)",
          "excerpt": "Prynne,—yes, at herself,—who stood on the scaffold of the pillory, an infant on her arm, and the letter A, in scarlet, fantastically embroidered with gold-thread, upon her bosom!",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/25344/25344-h/25344-h.htm"
        },
        {
          "category": "literary",
          "title": "\"The Affliction of Margaret\" — William Wordsworth (written 1804, published 1807)",
          "excerpt": "Seven years, alas! to have received / No tidings of an only child; / To have despaired, and have believed, / And be for evermore beguiled;",
          "source": "Wikisource (Poems, 1815)",
          "href": "https://en.wikisource.org/wiki/Poems_(Wordsworth,_1815)/Volume_1/The_Affliction_of_%E2%80%94"
        },
        {
          "category": "artistic",
          "title": "The Outcast — Richard Redgrave (1851), Royal Academy of Arts, London",
          "excerpt": "Redgrave's melodramatic oil painting shows a rigidly puritanical father standing at an open door, pointing out into the falling snow as he expels his unmarried daughter and her illegitimate baby from the family home. A sister kneels pleading for mercy while the mother and other children weep in the shadows. It distills the Victorian machinery of shame that, a century later, still pressured unmarried mothers to give up their children.",
          "source": "Wikimedia Commons / Royal Academy of Arts",
          "href": "https://commons.wikimedia.org/wiki/File:The_Outcast_(1851)_-_Richard_Redgrave.jpg",
          "image": {
            "src": "/covers/uk-apology-forced-adoptions--art.png",
            "alt": "A stern father stands at an open door pointing out into the snow while his daughter, clutching a baby, is turned out of the house and the rest of the family weeps.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "The Foundling Restored to Its Mother — Emma Brownlow (1858), The Foundling Museum, London",
          "excerpt": "Brownlow paints the rare and longed-for moment of reunion: a mother reclaims from the Foundling Hospital the child she had once been forced to surrender. Overcome, she has let the admission receipt that proves her claim slip from her hand, while the hospital secretary looks on from behind the table. Painted from within the institution itself, it captures both the grief of separation and the fragile hope of return that runs through the story of forced adoption.",
          "source": "The Foundling Museum, London",
          "href": "https://foundlingmuseum.org.uk/object/the-foundling-restored/"
        }
      ],
      "rank": 24
    },
    {
      "slug": "hamilton-laocoon-bronze-auction-record",
      "headline": "Bronze 'Laocoön' sells for £13.6 million at Sotheby's, a record for neoclassical sculpture",
      "overview": "A life-size bronze cast of the ancient 'Laocoön and His Sons,' made in 1817 by the French sculptor Auguste-Jean Marie Carbonneaux, sold for £13.6 million ($18.1 million) at Sotheby's in London, a record for a neoclassical sculpture at auction. The work, one of only four full-size bronze casts and long held by British collectors including the Duke of Hamilton, far exceeded its £2–3 million estimate after a 15-minute bidding battle.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Artforum",
          "href": "https://www.artforum.com/news/bronze-laocoon-sets-auction-record-neoclassical-sculpture-1234753900/"
        },
        {
          "name": "The Art Newspaper",
          "href": "https://www.theartnewspaper.com/2026/07/02/19th-century-bronze-laocoon-leads-london-old-master-auctions-selling-for-%C2%A3136m-at-sothebys"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/hamilton-laocoon-bronze-auction-record.png",
        "alt": "A classical bronze sculpture of intertwined struggling figures spotlit on a plinth in an auction saleroom.",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Pliny the Elder, Natural History, Book 36.4 (trans. Bostock & Riley, 1855)",
          "excerpt": "Such is the case with the Laocoön, for example, in the palace of the Emperor Titus, a work that may be looked upon as preferable to any other production of the art of painting or of statuary. It is sculptured from a single block, both the main figure as well as the children, and the serpents with their marvellous folds. This group was made in concert by three most eminent artists, Agesander, Polydorus, and Athenodorus, natives of Rhodes.",
          "source": "Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=36:chapter=4"
        },
        {
          "category": "historical",
          "title": "The Laocoön Group, Vatican Museums, Museo Pio-Clementino (c. 40–30 BC)",
          "excerpt": "Unearthed on the Esquiline in 1506 near the Baths of Trajan, the marble was instantly matched to the very statue Pliny had praised, and Pope Julius II acquired it within weeks to become the anchor of the papal antiquities collection. For five centuries it has functioned as the benchmark against which the worth of ancient and neoclassical sculpture is measured. That inherited prestige is exactly what a modern buyer chases when a mere 1817 cast of the group commands a record price far above estimate.",
          "source": "Vatican Museums",
          "href": "https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/museo-pio-clementino/Cortile-Ottagono/laocoonte.html"
        },
        {
          "category": "literary",
          "title": "Virgil, Aeneid, Book II, ll. 42–49 (Latin, ed. Greenough, 1900)",
          "excerpt": "O miseri, quae tanta insania, cives? Creditis avectos hostis? Aut ulla putatis dona carere dolis Danaum? … Quicquid id est, timeo Danaos et dona ferentis.",
          "source": "Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0055:book=2:card=40"
        },
        {
          "category": "literary",
          "title": "Gotthold Ephraim Lessing, Laocoon: An Essay upon the Limits of Painting and Poetry (1766; trans. Frothingham, 1873)",
          "excerpt": "Pain, in its disfiguring extreme, was not compatible with beauty, and must therefore be softened. Screams must be reduced to sighs, not because screams would betray weakness, but because they would deform the countenance to a repulsive degree.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/73078/pg73078-images.html"
        },
        {
          "category": "artistic",
          "title": "Laocoön and His Sons (Hagesander, Athenodoros and Polydorus of Rhodes), Vatican Museums",
          "excerpt": "The original Hellenistic marble shows the Trojan priest and his two sons locked in a writhing knot of muscle and serpent coils, the father's face contorted between agony and defiance. It is this ancient composition, endlessly studied and copied, that Carbonneaux reproduced in bronze in 1817. The auction record for that later cast is ultimately a tribute to the enduring authority of this single block of stone.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Laocoon_Pio-Clementino_Inv1059-1064-1067.jpg",
          "image": {
            "src": "/covers/hamilton-laocoon-bronze-auction-record--art.png",
            "alt": "The ancient marble Laocoön Group in the Vatican Museums, showing a bearded man and his two sons struggling against two large serpents.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "El Greco, Laocoön (c. 1610–1614), National Gallery of Art",
          "excerpt": "El Greco transplants the doomed priest and his sons to a stormy hillside before a spectral view of Toledo, stretching the antique figures into pale, elongated forms wracked with Mannerist tension. Painted from knowledge of the Vatican marble rather than the ancient site, it is itself a reinterpretation of a revered original. It shows how the Laocoön's authority passes from copy to copy, each new version drawing value from the fame of the first.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:El_Greco_-_Laocoon.jpg"
        }
      ],
      "rank": 25
    },
    {
      "slug": "mad-tengyun-cloud-buildings-tencent",
      "headline": "MAD completes Tengyun Center, three 'cloud' office towers for Tencent in Shenzhen",
      "overview": "The architecture studio MAD has completed the Tengyun Center, a Tencent headquarters complex in Shenzhen whose three cloud-like office volumes are lifted about 8.6 metres off the ground on ten structural cores, opening the land beneath as public coastal parkland. The scheme, by Ma Yansong's practice, preserves mangroves and tidal habitats along the reclaimed shoreline.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/07/02/mad-tengyun-center-tencent-headquarters-shenzhen/"
        },
        {
          "name": "Designboom",
          "href": "https://www.designboom.com/architecture/mad-shenzhen-tengyun-center-cloud-offices-tencent-china/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/mad-tengyun-cloud-buildings-tencent.png",
        "alt": "Three cloud-like white office volumes lifted on structural cores above open parkland beside the sea.",
        "credit": "AI-generated"
      },
      "edition": "Evening Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Villa Savoye, Le Corbusier and Pierre Jeanneret (1928-1931)",
          "excerpt": "At Poissy, Le Corbusier raised the white villa on slender concrete pilotis so that the living volume floats clear of the earth and the ground plane runs on uninterrupted beneath it. Lifting the structure turned the site into open, flowing space rather than a footprint pressed into the land. It is the modern origin of MAD's gesture at the Shenzhen coast: hoist the building, and give the ground back.",
          "source": "Fondation Le Corbusier",
          "href": "https://www.fondationlecorbusier.fr/en/work-architecture/achievements-villa-savoye-and-gardeners-lodge-poissy-france-1928-1931/"
        },
        {
          "category": "historical",
          "title": "New Babylon, Constant Nieuwenhuys (1956-1974)",
          "excerpt": "Constant imagined an entire civilization living in a vast megastructure suspended on pillars high above the earth, its decks given over to landscaped walkways while the freed ground below carried traffic and open terrain. The city becomes a lifted canopy, deliberately raised so that the land it covers is returned to movement and nature. His visionary drawings dream almost exactly the bargain the Tengyun Center strikes above its mangroves.",
          "source": "Kunstmuseum Den Haag",
          "href": "https://www.kunstmuseum.nl/en/collections/constant-new-babylon"
        },
        {
          "category": "literary",
          "title": "The Birds, Aristophanes (414 BCE)",
          "excerpt": "First I advise that the birds gather together in one city and that they build a wall of great bricks, like that at Babylon, round the plains of the air and the whole region of space that divides earth from heaven.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/3013/3013-h/3013-h.htm"
        },
        {
          "category": "literary",
          "title": "Gulliver's Travels, Part III: A Voyage to Laputa, Jonathan Swift (1726)",
          "excerpt": "I turned back, and perceiving a vast opake body between me and the sun, moving forwards towards the island: it seemed to be about two miles high, and hid the sun six or seven minutes, but I did not observe the air to be much colder, or the sky more darkened, than if I had stood under the shade of a mountain.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Works_of_the_Rev._Jonathan_Swift/Volume_6/A_Voyage_to_Laputa/Chapter_1"
        },
        {
          "category": "artistic",
          "title": "Cloudy Mountains, Mi Youren (before 1200)",
          "excerpt": "In this ink handscroll, rounded peaks dissolve into banks of luminous mist built from soft, wet 'Mi-family' dots, so that solid land and drifting cloud become a single continuous breath. The painting embodies the Chinese landscape ideal that MAD invokes directly, treating architecture as cloud and holding nature and form in weightless balance. The mountains seem to hover rather than stand, much like three office volumes lifted above a tidal shore.",
          "source": "Wikimedia Commons / Metropolitan Museum of Art",
          "href": "https://commons.wikimedia.org/wiki/File:Mi_Youren_-_Cloudy_Mountains_-_1973.121.1_-_Metropolitan_Museum_of_Art.jpg",
          "image": {
            "src": "/covers/mad-tengyun-cloud-buildings-tencent--art.png",
            "alt": "A monochrome ink handscroll showing rounded mountain peaks emerging from horizontal bands of mist above water and trees.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Nuages, from Trois Nocturnes, Claude Debussy (1897-1899)",
          "excerpt": "Nuages, the first of Debussy's three orchestral Nocturnes, evokes the unchanging expanse of the sky and the slow, solemn passage of clouds across it, rendered in muted greys and drifting, unresolved harmonies. The music never settles onto solid ground; it hovers and dissolves. It is the sublime cloud translated into sound, the same weightless atmosphere MAD sought to build in structure and glass.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Nocturnes_(Debussy,_Claude)"
        }
      ],
      "rank": 26
    },
    {
      "slug": "google-eu-android-fine-upheld",
      "headline": "EU's top court upholds record €4.1 billion antitrust fine against Google over Android",
      "overview": "The European Union's Court of Justice upheld a €4.1 billion antitrust fine against Google on Wednesday, ending the company's long appeal over the way it used its Android operating system to entrench its search engine. The judgment confirms the largest antitrust penalty the bloc has ever imposed and closes a case first brought by the European Commission in 2018.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNeFFsalo3LWdiNVRiVnR2aGx3VEhYRm9JZW9XMFpWMTNzWENjczNPdG5JOUNrVWJYN3lVeFV6Q1RITnI5OUN3Y3Q4Sno4UlNoNGRybmppNGxVa3hOTXZyNGc4eV9JcUUzaE45cGhGWkRjNlhYSVpvcjR2TWtjZUN4TG9ZWjFOWllFcHBrNnBYM09pS19GYzVxdTFOVGJEUFNrdDJUTHNrWGcwVElWY3dNbGVuSmZSeVB3dGZBbUlR?oc=5"
        },
        {
          "name": "CNBC",
          "href": "https://www.cnbc.com/2026/07/02/alphabet-google-android-eu-antitrust-fine-4-1-billion-euro-appeal.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/google-eu-android-fine-upheld.png",
        "alt": "Brass scales of justice on a dark bench before a glowing glass corporate tower at dusk, symbolising a technology giant weighed by the law.",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Standard Oil Co. of New Jersey v. United States (U.S. Supreme Court, 1911)",
          "excerpt": "The remedy to be administered in case of a combination violating the Anti-Trust Act is two-fold: first, to forbid the continuance of the prohibited act, and second, to so dissolve the combination as to neutralize the force of the unlawful power.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States"
        },
        {
          "category": "historical",
          "title": "Sherman Antitrust Act (United States, 1890)",
          "excerpt": "Every contract, combination in the form of trust or otherwise, or conspiracy, in restraint of trade or commerce among the several States, or with foreign nations, is hereby declared to be illegal. ... Every person who shall monopolize, or attempt to monopolize, or combine or conspire with any other person or persons, to monopolize any part of the trade or commerce among the several States, or with foreign nations, shall be deemed guilty of a misdemeanor.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Sherman_Antitrust_Act"
        },
        {
          "category": "literary",
          "title": "The First Book of Samuel, chapter 17 (King James Bible, 1611)",
          "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. This day will the LORD deliver thee into mine hand; and I will smite thee, and take thine head from thee; ... And all this assembly shall know that the LORD saveth not with sword and spear: for the battle is the LORD's, and he will give you into our hands.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
        },
        {
          "category": "literary",
          "title": "Ozymandias, by Percy Bysshe Shelley (The Examiner, 1818)",
          "excerpt": "I met a Traveller from an antique land, / Who said, \"Two vast and trunkless legs of stone / Stand in the desart. Near them, on the sand, / Half sunk, a shattered visage lies, whose frown, / And wrinkled lip, and sneer of cold command, / Tell that its sculptor well those passions read, / Which yet survive, stamped on these lifeless things, / The hand that mocked them, and the heart that fed: / And on the pedestal these words appear: / \"My name is Ozymandias, King of Kings.\" / Look on my works ye Mighty, and despair! / No thing beside remains. Round the decay / Of that Colossal Wreck, boundless and bare, / The lone and level sands stretch far away.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
        },
        {
          "category": "artistic",
          "title": "The Bosses of the Senate, by Joseph Keppler (Puck, 23 January 1889)",
          "excerpt": "Keppler crowds the Senate chamber with the bloated trusts of the Gilded Age, their bodies swollen money-bags marked Steel, Copper, Oil, and Sugar, looming over the seated lawmakers who scurry beneath them. A doorway labeled for the monopolists stands wide open, while the People's Entrance is bolted shut, a savage visual argument that industrial giants, not the electorate, hold the levers of government. It is the enduring image of concentrated economic power capturing the sovereign body meant to check it.",
          "source": "Library of Congress",
          "href": "https://www.loc.gov/pictures/item/2002718861/",
          "image": {
            "src": "/covers/google-eu-android-fine-upheld--art.png",
            "alt": "Political cartoon showing giant money-bag figures labeled with trusts towering over the U.S. Senate",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Next!, by Udo J. Keppler (Puck, 7 September 1904)",
          "excerpt": "The Standard Oil monopoly sprawls as a vast octopus, its steel tentacles already coiled around statehouses, Congress, and the copper, steel, and shipping trades. One last tentacle stretches hungrily toward the White House, the single word 'Next!' capturing the boundless appetite of a giant that answers to no border and no ballot. The cartoon frames dominance itself as the threat that a sovereign power must finally reach out and sever.",
          "source": "Library of Congress",
          "href": "https://www.loc.gov/pictures/item/2001695241/"
        }
      ],
      "rank": 27
    },
    {
      "slug": "iran-hormuz-tanker-warning",
      "headline": "Iran warns oil tankers to use approved routes in Strait of Hormuz or face a 'forceful response'",
      "overview": "Iran warned that oil tankers crossing the Strait of Hormuz must stick to Iranian-approved routes or risk a 'forceful response,' sharpening tensions over the waterway that carries roughly a fifth of the world's oil. The warning came as Tehran cautioned the United States and Israel against fresh attacks ahead of funeral processions for Ayatollah Ali Khamenei.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQOEM2Y1VRaV9hZEpMWVFYU05hd2FsQjlnbDI5S2FvVmlJNVVjQi1hbTVVTWthM251SFpNcEFsb1ZRX2NuNmo2S3UyUXF3NlkzcHJXTlFGRlotQzR3bDBHSngwcUNYckFDY3VnWUgtRXI5cW9qd0tvUGFjb19kdTVIRXlyU3RkY05neGtOeWRXWmZPdmF0QlQyOG9FdGcxVkxEOWc?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxQVjd1X1pITDBSckd0dXdzYzdCbTZ2T3o2UmFUWG5yaHRuZFZWR1pMclo4Z3BLNGYzeS1WREhPZ291WFlJcmZGOGNHclp0dEp4cVhaQTdweUx5Rl90U2tnRGdJOEtjZHNnbC05aUJRMXZJbHl3aUtKMzlxRl94SUl5N251SENtMVBqVVFHdldIcDJCTnpaamphc2VVWUlReGZCMkZpOEJYMlBxcGlOaVktWUdIR2RseW94clhPenQzVlVhOWM?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/iran-hormuz-tanker-warning.png",
        "alt": "An oil tanker under way in the narrow shipping lanes of the Strait of Hormuz.",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Herodotus, The Histories, Book VIII (on the Battle of Salamis, 480 BC), trans. George Rawlinson",
          "excerpt": "About the hour of midnight, they advanced their western wing towards Salamis, so as to inclose the Greeks. At the same time the force stationed about Ceos and Cynosura moved forward, and filled the whole strait as far as Munychia with their ships.",
          "source": "Wikisource — History of Herodotus, Book 8",
          "href": "https://en.wikisource.org/wiki/History_of_Herodotus/Book_8"
        },
        {
          "category": "historical",
          "title": "Convention respecting the Free Navigation of the Suez Maritime Canal (Convention of Constantinople), signed 29 October 1888",
          "excerpt": "The Suez Maritime Canal shall always be free and open, in time of war as in time of peace, to every vessel of commerce or of war, without distinction of flag. Consequently, the High Contracting Parties agree not in any way to interfere with the free use of the Canal, in time of war as in time of peace. The Canal shall never be subjected to the exercise of the right of blockade.",
          "source": "Wikisource — Constantinople Convention of the Suez Canal, Article I",
          "href": "https://en.wikisource.org/wiki/Constantinople_Convention_of_the_Suez_Canal"
        },
        {
          "category": "literary",
          "title": "Homer, The Odyssey, Book XII (Circe's warning of Scylla and Charybdis), trans. Samuel Butler",
          "excerpt": "On the one hand there are some overhanging rocks against which the deep blue waves of Amphitrite beat with terrific fury; the blessed gods call these rocks the Wanderers. ... Three times in the day does she vomit forth her waters, and three times she sucks them down again; see that you be not there when she is sucking, for if you are, Neptune himself could not save you.",
          "source": "Wikisource — The Odyssey (Butler), Book XII",
          "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_XII"
        },
        {
          "category": "literary",
          "title": "Aeschylus, The Persians (472 BC), Messenger's speech on Salamis, trans. E. D. A. Morshead",
          "excerpt": "Awhile our stream of ships held onward, till within the narrowing creek our jostling vessels were together driven, and none could aid another: each on each drave hard their brazen beaks, or brake away the oar-banks of each other, stem to stern, while the Greek galleys, with no lack of skill, hemmed them and battered in their sides, and soon the hulls rolled over, and the sea was hid, crowded with wrecks and butchery of men.",
          "source": "Wikisource — Four Plays of Aeschylus (1908), Morshead / Persians",
          "href": "https://en.wikisource.org/wiki/Four_Plays_of_Aeschylus_(1908)_Morshead/Persians"
        },
        {
          "category": "artistic",
          "title": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (The Sea Battle at Salamis), 1868",
          "excerpt": "Kaulbach's vast history painting crams the whole clash of empires into one boiling channel, where Persian galleys founder against the Greeks in waters too narrow for their numbers to matter. Fighters spill from splintered hulls into a churning strait, and the sea itself becomes the trap that turns a superior fleet into wreckage. The scene stages the ancient lesson now echoing over Hormuz: whoever holds the narrows holds the fate of everyone who must pass through them.",
          "source": "Wikimedia Commons — object page, Maximilianeum, Munich",
          "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
          "image": {
            "src": "/covers/iran-hormuz-tanker-warning--art.png",
            "alt": "Wilhelm von Kaulbach's 1868 painting of the Battle of Salamis, showing Greek and Persian warships colliding and men drowning in a narrow strait",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "J. M. W. Turner, Ulysses deriding Polyphemus — Homer's Odyssey, 1829",
          "excerpt": "Turner paints the moment of escape: Ulysses' ship slipping out of the giant's reach as sea and sky blaze with molten light. The vessel threads a hazardous passage past a hostile, looming power that could still crush it, freedom of movement won only by cunning and nerve. It is the perennial drama of the narrow water, where a single coastal force can menace every ship that dares the strait.",
          "source": "Wikimedia Commons — object page, National Gallery, London",
          "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_064.jpg"
        }
      ],
      "rank": 28
    },
    {
      "slug": "india-japan-strategic-pacts",
      "headline": "India and Japan sign agreements on AI, critical minerals and energy after Modi–Takaichi summit",
      "overview": "India and Japan signed a package of agreements on artificial intelligence, critical minerals, semiconductors and clean energy after Prime Minister Narendra Modi met Japanese Prime Minister Sanae Takaichi. The two leaders framed the deals as a push to secure supply chains and to jointly resist economic coercion.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQdzFpMWZDTXlQMENEWENudWcwWThrNU00ZVp5UWQwWGp6QXd6d3ZBcmtjRnhLdFZzdFZvWjgxeWRLdDk0eEtiZWV1UGpEUWhhRlYtaHdtODVSNkdqdHlBR3lpYkpkOVNNWTdROHhEX0FlQzdlYTdmRThfd1ZVX2pkc3ZYYlVwdzVZUXU2TWh1c09NRGgyRVpWMEZ6RFhJVk5ld3pQLXlUdXZiRHE3WHBaTXZn?oc=5"
        },
        {
          "name": "Deccan Herald",
          "href": "https://www.deccanherald.com/india/india-japan-summit-modi-takaichi-to-launch-ai-cooperation-plan-push-back-against-economic-coercion-4057849"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/india-japan-strategic-pacts.png",
        "alt": "A grand, sunlit diplomatic conference room with a long polished table and rows of empty chairs, set for a summit.",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Anglo-Japanese Agreement (Alliance), signed 30 January 1902",
          "excerpt": "The High Contracting Parties, having mutually recognised the independence of China and Corea, declare themselves to be entirely uninfluenced by any aggressive tendencies in either country.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Anglo-Japanese_Agreement_(1902)"
        },
        {
          "category": "historical",
          "title": "Treaty of Alliance between the United States and France, signed 6 February 1778",
          "excerpt": "The essential and direct End of the present defensive alliance is to maintain effectually the liberty, Sovereignty, and independance absolute and unlimited of the said united States, as well in Matters of Gouvernement as of commerce.",
          "source": "U.S. National Archives",
          "href": "https://www.archives.gov/milestone-documents/treaty-of-alliance-with-france"
        },
        {
          "category": "literary",
          "title": "Thucydides, History of the Peloponnesian War, Book I (trans. Richard Crawley)",
          "excerpt": "It was to be a defensive, not an offensive alliance. It did not involve a breach of the treaty with Peloponnese: Athens could not be required to join Corcyra in any attack upon Corinth.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm"
        },
        {
          "category": "literary",
          "title": "William Shakespeare, The Life of King Henry the Fifth, Act V, Scene 2 (Queen Isabel)",
          "excerpt": "God, the best maker of all marriages, / Combine your hearts in one, your realms in one! / As man and wife, being two, are one in love, / So be there 'twixt your kingdoms such a spousal, / That never may ill office, or fell jealousy, / Which troubles oft the bed of blessed marriage, / Thrust in between the paction of these kingdoms, / To make divorce of their incorporate league.",
          "source": "Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.03.0043:act=5:scene=2"
        },
        {
          "category": "artistic",
          "title": "Gerard ter Borch, The Ratification of the Treaty of Münster, 1648",
          "excerpt": "Ter Borch, an eyewitness in Münster, records the exact moment envoys swear the oath confirming the peace that ended the Eighty Years' War and bound the Dutch and Spanish crowns to a settlement. Some seventy-seven soberly dressed diplomats crowd the town hall, hands raised, turning a diplomatic bargain into a solemn public compact. It is the first known oil painting to depict a real political treaty as sober fact rather than allegorical glory.",
          "source": "National Gallery, London (on loan from the Rijksmuseum, Amsterdam)",
          "href": "https://www.nationalgallery.org.uk/paintings/gerard-ter-borch-the-ratification-of-the-treaty-of-munster",
          "image": {
            "src": "/covers/india-japan-strategic-pacts--art.png",
            "alt": "Gerard ter Borch's 1648 painting of diplomats raising their hands to swear the oath ratifying the Treaty of Münster in the town hall.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "George Frideric Handel, Music for the Royal Fireworks, HWV 351, 1749",
          "excerpt": "Commissioned by George II to crown the celebrations for the Treaty of Aix-la-Chapelle, Handel's suite turns a diplomatic settlement into public spectacle for massed trumpets, horns, oboes and drums. Its central movement, pointedly titled La Paix, sounds the peace itself before La Réjouissance breaks into rejoicing. The music makes audible the political hope that a signed accord can convert rivalry into shared triumph.",
          "source": "IMSLP (Petrucci Music Library)",
          "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
        }
      ],
      "rank": 29
    },
    {
      "slug": "south-korea-kospi-chip-selloff",
      "headline": "South Korea's Kospi plunges nearly 8% as investors dump chip shares",
      "overview": "South Korea's Kospi index fell almost 8% as a sharp sell-off in semiconductor stocks dragged Asian markets lower, unwinding part of a chip-fuelled rally. The slide hit heavyweights such as Samsung and SK Hynix and rippled across the region as traders braced for U.S. jobs data.",
      "genre": "Economy",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQd054NTR5cGRhMk1DMi1qN1FNYmlBNXJILWFLTkE4ZXZBNnVmQml2WTdkRjZnQTAyeUJKSGJaUVhydVk5cW5VQmVyQktFZXVMLV95TFhUZG9mYVRwM0o2QzQxQlZGVVJrU05BQTVqUmpIVXduNGNVZjRvcUh5QzB1alVXMXdSUHU0bV9nMHZ3?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMie0FVX3lxTE9hNUdGZ1o0UkVpa1k0SDE5eG1CUlhJZGhIaklZMjV1VVEtekJxazZHMV8xT2lrU25mWlJuSVJxQ3ZtWF9iNEVsQk9tQjRqazRPUTRLYk9VWHVaRjM0a2FVa29SSUJfakV3MXU5Z0ZLTS1Gc0NhQmlQOEZZOA?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/south-korea-kospi-chip-selloff.png",
        "alt": "A darkened trading floor beneath a towering wall of plunging red bars, a lone silhouetted trader watching.",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Tulipomania (Dutch tulip mania, 1636–1637), from Charles Mackay's \"Memoirs of Extraordinary Popular Delusions and the Madness of Crowds\" (1841)",
          "excerpt": "Nobles, citizens, farmers, mechanics, seamen, footmen, maidservants, even chimney-sweeps and old clotheswomen, dabbled in tulips. People of all grades converted their property into cash, and invested it in flowers. Houses and lands were offered for sale at ruinously low prices, or assigned in payment of bargains made at the tulip-mart.",
          "source": "Library of Economics and Liberty (Econlib)",
          "href": "https://www.econlib.org/book-chapters/chapter-ch-3-the-tulipomania/"
        },
        {
          "category": "historical",
          "title": "The South-Sea Bubble (London, 1720), from Charles Mackay's \"Memoirs of Extraordinary Popular Delusions and the Madness of Crowds\" (1841)",
          "excerpt": "Exchange Alley was every day blocked up by crowds, and Cornhill was impassable for the number of carriages.",
          "source": "Library of Economics and Liberty (Econlib)",
          "href": "https://www.econlib.org/book-chapters/chapter-ch-2-the-south-sea-bubble/"
        },
        {
          "category": "literary",
          "title": "Émile Zola, \"L'Argent\" (Money), 1891 — chapitre XI (the crash of the Banque Universelle)",
          "excerpt": "les actions de l'Universelle étaient tombées, coup sur coup, au-dessous du pair, à 430 francs ; et la baisse continuait, l'édifice craquait et s'écroulait, d'heure en heure.",
          "source": "Wikisource (French)",
          "href": "https://fr.wikisource.org/wiki/L%E2%80%99Argent_(Zola)/11"
        },
        {
          "category": "literary",
          "title": "Ecclesiastes 1:2, 14 (King James Version, 1611)",
          "excerpt": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. ... I have seen all the works that are done under the sun; and, behold, all is vanity and vexation of spirit.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
        },
        {
          "category": "artistic",
          "title": "William Hogarth, \"An Emblematical Print on the South Sea Scheme\" (1721)",
          "excerpt": "This monument was erected in memory of the destruction of the city by the South Sea in 1720.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
          "image": {
            "src": "/covers/south-korea-kospi-chip-selloff--art.png",
            "alt": "Hogarth's satirical engraving of the South Sea Bubble: a merry-go-round of speculators whirls around a maypole while a monument records the city's ruin by speculation.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Jan Brueghel the Younger, \"Satire on Tulip Mania\" (c. 1640), oil on panel, Frans Hals Museum, Haarlem",
          "excerpt": "Brueghel casts the tulip speculators as finely dressed monkeys, gravely weighing bulbs, counting coins and drawing up contracts over a lavish dinner. As the market breaks, one ape is hauled before a magistrate while another urinates on the now-worthless flowers, and a fellow gambler weeps over his ruin. The painting turns a financial frenzy into a mocking parable of greed, folly and the sudden reckoning that follows a burst bubble.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg"
        }
      ],
      "rank": 30
    },
    {
      "slug": "openai-us-government-stake",
      "headline": "OpenAI proposes handing the US government a 5% stake, Financial Times reports",
      "overview": "OpenAI has proposed giving the U.S. government a roughly 5% equity stake as it tries to ease mounting political pressure in Washington, the Financial Times reported. Chief executive Sam Altman has floated the idea to senior Trump administration officials, suggesting other leading AI companies could cede similar stakes through a sovereign fund.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNbUNkeGxUSzgzdlZ3STBUWGtaU3pHVUFhUWlCYWh6MVZKVjNnckJRTVBiNFF0d0ZvTjB0OWtGcWtxR1ZIY1lLVUdtSHQ4LXY3MUQ4ZHNIdkFyMzRuOXZkaEVqMDBaTjRkeXYzcGNTVWg2TEwxWUNVVFJDcEtSbUFnd2J1NzVJLXJPX3lHcG1icFh3YmxqMDR0cS1qTW85ZnpQeXBwdUNuQjBETmIw?oc=5"
        },
        {
          "name": "CNBC",
          "href": "https://www.cnbc.com/2026/07/02/openai-proposes-us-government-own-5percent-stake-to-address-political-blowback.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/openai-us-government-stake.png",
        "alt": "A glowing orb of blue light suspended beneath a domed marble rotunda, a small human figure standing far below.",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Anglo-Persian Oil Company (Acquisition of Capital), speech by Winston Churchill, First Lord of the Admiralty (7 July 1914)",
          "excerpt": "I am arranging contracts in such a way as to obtain a continued and independent supply of oil from those regions, so that we shall be not only in possession of this supply of oil, but we shall be able to purchase the rest of the oil we require—only half being drawn from Persia—on terms which will be the result of fair and independent bargaining on each side, and not on terms which are those usually imposed upon a forced purchaser in a close and cornered market.",
          "source": "Hansard, House of Commons Debates, UK Parliament",
          "href": "https://api.parliament.uk/historic-hansard/commons/1914/jul/07/anglo-persian-oil-company-acquisition-of-1"
        },
        {
          "category": "historical",
          "title": "Bank of England Act 1694 (also called the Tonnage Act), 5 and 6 Will. and Mar. c. 20",
          "excerpt": "An Act for granting to theire Majesties severall Rates and Duties upon Tunnage of Shipps and Vessells and upon Beere Ale and other Liquors for secureing certaine Recompenses and Advantages in the said Act mentioned to such Persons as shall voluntarily advance the summe of [£1,500,000] towards the carrying on the Warr against France",
          "source": "legislation.gov.uk, The National Archives (enacted text)",
          "href": "https://www.legislation.gov.uk/aep/WillandMar/5-6/20/enacted"
        },
        {
          "category": "literary",
          "title": "The Prince, Chapter XIII (Concerning Auxiliaries, Mixed Soldiery, and One's Own), by Niccolò Machiavelli, trans. W. K. Marriott",
          "excerpt": "These arms may be useful and good in themselves, but for him who calls them in they are always disadvantageous; for losing, one is undone, and winning, one is their captive.",
          "source": "Project Gutenberg (ebook 1232)",
          "href": "https://www.gutenberg.org/files/1232/1232-h/1232-h.htm"
        },
        {
          "category": "literary",
          "title": "Faust, Part I, \"The Study\" scene, by Johann Wolfgang von Goethe, trans. Bayard Taylor",
          "excerpt": "When thus I hail the Moment flying:\n“Ah, still delay—thou art so fair!”\nThen bind me in thy bonds undying,\nMy final ruin then declare!",
          "source": "Project Gutenberg (ebook 14591)",
          "href": "https://www.gutenberg.org/files/14591/14591-h/14591-h.htm"
        },
        {
          "category": "artistic",
          "title": "The Sampling Officials of the Amsterdam Drapers' Guild, Known as 'The Syndics' (De Staalmeesters), by Rembrandt van Rijn, 1662",
          "excerpt": "Five soberly dressed guild officials look up from their ledger as though the viewer had just entered the room, catching a governing board mid-audit. Their authority is quiet but absolute: appointed to inspect and stamp every bale of cloth, they embody the marriage of civic power and private commerce that ran the Dutch trading economy. The portrait is a monument to a body that answered to both the city and the market at once.",
          "source": "Rijksmuseum, Amsterdam (SK-C-6)",
          "href": "https://www.rijksmuseum.nl/en/collection/object/The-Sampling-Officials-of-the-Amsterdam-Drapers-Guild-Known-as-The-Syndics--575b43f479d021359fb5f63b32f7c234",
          "image": {
            "src": "/covers/openai-us-government-stake--art.png",
            "alt": "Group portrait of five seated officials of the Amsterdam Drapers' Guild in black robes and hats around a table with a ledger, with a bareheaded servant behind them, by Rembrandt (1662).",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "The Return to Amsterdam of the Second Expedition to the East Indies, 19 July 1599, by Hendrik Cornelisz Vroom, 1599",
          "excerpt": "Four great merchant ships ride into the IJ, cannon firing in salute, swarmed by a flotilla of small boats crowded with jubilant citizens welcoming the spice fleet home. The triumphant homecoming of this pre-Company venture helped ignite the merger of rival traders into the chartered Dutch East India Company just three years later—a private enterprise soon armed with quasi-sovereign powers by the state. The painting captures the exact moment commerce and national fortune fused into a single spectacle.",
          "source": "Rijksmuseum, Amsterdam (SK-A-2858)",
          "href": "https://www.rijksmuseum.nl/en/collection/object/The-Return-to-Amsterdam-of-the-Second-Expedition-to-the-East-Indies--68e3266d15d285dcdf44379c4add1c7c"
        }
      ],
      "rank": 31
    },
    {
      "slug": "france-wildfires-heatwave",
      "headline": "Wildfires scorch southern France as firefighters battle blazes after European heatwave",
      "overview": "Hundreds of firefighters battled a wildfire that burned some 800 hectares in southern France's Hérault and Aude regions, forcing evacuations days after a deadly heatwave gripped Europe. Water-dumping aircraft were deployed as drought and strong winds spread the flames, with smaller fires breaking out near Marseille.",
      "genre": "Climate",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPR2h4ZHBiMThiaTBnRzk1UHM5WEc1eU5lUkVhMGU0amhvVVpzeU9TTnFYR3RJQ2Y5TUZ3S1I5UVBXQWwwNHJoUG9aVUZHVWRsbldGSU5XYUJKQWJqWjVuZ3FMUEJMbTBFMVdRUE5mUngtTmJFTHotZGMzazh5ZXo1ZTdLWlBzNWxYaXNsZ1k5eUFLTzR6bE9RVDRaZFdGV19HcmU0?oc=5"
        },
        {
          "name": "PBS NewsHour",
          "href": "https://www.pbs.org/newshour/world/a-heatwave-scorches-parts-of-europe-and-fans-wildfire-threat-in-southern-france"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/france-wildfires-heatwave.png",
        "alt": "Firefighters and a water-dropping aircraft tackling a wildfire on a dry hillside in southern France.",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Diary of Samuel Pepys, entry for 2 September 1666 (the Great Fire of London), by Samuel Pepys",
          "excerpt": "the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned... So we down to the water-side, and there got a boat and through bridge, and there saw a lamentable fire... we saw the fire as only one entire arch of fire from this to the other side the bridge, and in a bow up the hill for an arch of above a mile long: it made me weep to see it. The churches, houses, and all on fire and flaming at once; and a horrid noise the flames made, and the cracking of houses at their ruins.",
          "source": "Project Gutenberg — Diary of Samuel Pepys, Volume 45: August/September 1666 (Wheatley/Bright edition)",
          "href": "https://www.gutenberg.org/cache/epub/4167/pg4167.html"
        },
        {
          "category": "historical",
          "title": "The Annals of Tacitus, Book XV, chapter 38 (the Great Fire of Rome, 64 AD), by Tacitus, trans. Alfred John Church & William Jackson Brodribb",
          "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Cælian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus. For here there were no houses fenced in by solid masonry, or temples surrounded by walls, or any other obstacle to interpose delay. The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city, with those narrow winding passages and irregular streets, which characterised old Rome.",
          "source": "Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=15:chapter=38"
        },
        {
          "category": "literary",
          "title": "The Aeneid, Book II (the burning of Troy), by Virgil, trans. John Dryden (1697)",
          "excerpt": "The palace of Deiphobus ascends / In smoky flames, and catches on his friends. / Ucalegon burns next: the seas are bright / With splendor not their own, and shine with Trojan light... Driv'n on the wings of winds, whole sheets of fire, / Thro' air transported, to the roofs aspire.",
          "source": "Wikisource — The Works of Virgil (Dryden), Aeneid, Book II",
          "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
        },
        {
          "category": "literary",
          "title": "Metamorphoses, Book II (Phaethon sets the earth ablaze), by Ovid, trans. Sir Samuel Garth, John Dryden, et al. (1717)",
          "excerpt": "But these are trivial Ills: whole Cities burn, / And peopl'd Kingdoms into Ashes turn... The Mountains kindle as the Car draws near, / Athos and Tmolus red with Fires appear... The Ground, deep-cleft, admits the dazling Ray, / And startles Pluto with the Flash of Day.",
          "source": "Wikisource — Metamorphoses (tr. Garth, Dryden, et al.), Book II",
          "href": "https://en.wikisource.org/wiki/Metamorphoses_(tr._Garth,_Dryden,_et_al.)/Book_II"
        },
        {
          "category": "artistic",
          "title": "The Burning of the Houses of Lords and Commons, October 16, 1834 (c. 1835), by Joseph Mallord William Turner",
          "excerpt": "Turner, who witnessed the destruction of the Palace of Westminster among tens of thousands of spectators, transforms catastrophe into a vision of elemental force. A towering wall of orange-white flame erupts against the night, its glare doubled in the black water of the Thames and smearing the sky with smoke, while the fragile silhouettes of towers dissolve at the fire's edge. The plunging perspective of Westminster Bridge, crowded with tiny onlookers, measures human smallness against the conflagration—the same helplessness of a landscape overwhelmed by fire it cannot stop.",
          "source": "Philadelphia Museum of Art (John Howard McFadden Collection)",
          "href": "https://philamuseum.org/collection/object/103831",
          "image": {
            "src": "/covers/france-wildfires-heatwave--art.png",
            "alt": "J. M. W. Turner's painting of the 1834 fire at the Houses of Parliament, a towering blaze of orange flame and smoke reflected in the Thames beneath Westminster Bridge",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Feuerzauber (Magic Fire Music) from Die Walküre, WWV 86B, Act III (1856–70), by Richard Wagner",
          "excerpt": "As Wotan lays the sleeping Brünnhilde upon her rock, he summons Loge to encircle her with flame, and Wagner's orchestra answers with shimmering, flickering figuration—strings and woodwinds licking upward like tongues of fire over a glowing brass haze. The music makes an element audible: heat that ripples, crackles, and spreads, beautiful and untouchable at once. It renders in sound the double face of fire in the news from France—radiant and consuming, protective barrier and destroying force in the same blaze.",
          "source": "IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)"
        }
      ],
      "rank": 32
    },
    {
      "slug": "gaza-1000-days-war",
      "headline": "Gaza marks 1,000 days of war as Palestinians face an uncertain future",
      "overview": "The war in Gaza reached its 1,000th day, with more than two million Palestinians still largely displaced amid ruins and a fragile ceasefire scarred by continued attacks. Aid officials warned that reconstruction has stalled and that a return to any semblance of normal life remains far off.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxOUnBid29GQ1Vabk5YaVRvUklFZVJuRlNFUkZUT3gzbmoxYVdaZ3k0WEhlZHpneE00Q0pRMlByd3pyZ1pFQ25CMVhmdmdsTUlSR1Q1VmRWeGpjMzRrTFVRUklMWGtfNWdkM0Uwc1VieFFTLWZRTVl3dERpOVNRSm5uS2xwZzlzbzhRRkY4a191MU4tcWFuS0RmcWhNZkZ6ekRyS3ktVDBiakxnbVNRNWpRTQ?oc=5"
        },
        {
          "name": "South China Morning Post",
          "href": "https://www.scmp.com/news/world/middle-east/article/3359135/gaza-marks-1000-days-war-palestinians-there-face-uncertain-future"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/gaza-1000-days-war.png",
        "alt": "A displaced Palestinian family walking past destroyed buildings in Gaza.",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Siege of Leningrad (1941–1944)",
          "excerpt": "For 872 days German and Finnish forces encircled a city and let hunger do the work of armies, cutting food, fuel and heat until roughly a million residents perished, most of them from starvation and cold. Those who survived measured time not in battles but in the slow erosion of ordinary life, sharing rationed bread and burying the dead in frozen ground. It stands as the archetype of a population trapped in place, enduring an assault that grinds on far longer than anyone imagines a city can withstand.",
          "source": "Encyclopaedia Britannica",
          "href": "https://www.britannica.com/event/Siege-of-Leningrad"
        },
        {
          "category": "historical",
          "title": "The Siege of Sarajevo (1992–1996)",
          "excerpt": "For nearly 1,400 days, the longest siege of a capital in modern history, Sarajevans lived under snipers and shellfire, hauling water past ruined tram lines and crossing streets that had become killing grounds. Reconstruction remained unthinkable while the encirclement held; survival meant improvised gardens, candlelit basements and a stubborn insistence on normal gestures amid rubble. When the guns finally fell silent, the wounded city faced years of rebuilding and a future that would never simply resume where it had been broken off.",
          "source": "Encyclopaedia Britannica",
          "href": "https://www.britannica.com/event/Siege-of-Sarajevo"
        },
        {
          "category": "literary",
          "title": "The Book of Lamentations 1:1–4 (King James Version, 1611)",
          "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary! She weepeth sore in the night, and her tears are on her cheeks: among all her lovers she hath none to comfort her: all her friends have dealt treacherously with her, they are become her enemies. Judah is gone into captivity because of affliction, and because of great servitude: she dwelleth among the heathen, she findeth no rest: all her persecutors overtook her between the straits. The ways of Zion do mourn, because none come to the solemn feasts: all her gates are desolate: her priests sigh, her virgins are afflicted, and she is in bitterness.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
        },
        {
          "category": "literary",
          "title": "Euripides, \"The Trojan Women\" (trans. E. P. Coleridge, 1891)",
          "excerpt": "Lift your head, unhappy one, from the ground; raise up your neck; this is Troy no more, no longer am I queen in Ilium. Though fortune change, endure your lot; sail with the stream, and follow fortune's tack, do not steer your ship of life against the tide, since chance must guide your course. Ah me! ah me! What else but tears is now my hapless lot, whose country, children, husband, all are lost?",
          "source": "Perseus Digital Library, Tufts University",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0124:card=98"
        },
        {
          "category": "artistic",
          "title": "Francisco de Goya, \"I saw it (Yo lo vi),\" Plate 44 of \"The Disasters of War,\" c. 1810 (published 1863)",
          "excerpt": "Goya's etching shows a panicked crowd of civilians in headlong flight, a mother clutching her child at the front as families flee across an empty landscape with only the bundles they can carry. The blunt title, \"I saw it,\" turns the artist and viewer into eyewitnesses of displacement, refusing any heroic framing of war. It renders the anonymous, repeatable catastrophe of ordinary people driven from their homes, an image of uprooting that outlasts the particular war that produced it.",
          "source": "The Metropolitan Museum of Art",
          "href": "https://www.metmuseum.org/art/collection/search/381372",
          "image": {
            "src": "/covers/gaza-1000-days-war--art.png",
            "alt": "Goya etching 'Yo lo vi' (I saw it): a crowd of civilians, including a mother and child, fleeing in terror across a barren landscape.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 — \"Lacrimosa\" (1791)",
          "excerpt": "Lacrimosa dies illa, qua resurget ex favilla judicandus homo reus. Huic ergo parce, Deus.",
          "source": "IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
        }
      ],
      "rank": 33
    },
    {
      "slug": "onion-infowars-sandy-hook",
      "headline": "The Onion launches its Infowars parody, sending $100,000 to Sandy Hook families",
      "overview": "Satirical outlet The Onion launched its parody version of Alex Jones's Infowars, pledging an initial $100,000 from branded merchandise sales to families of the Sandy Hook shooting. The relaunch, built around mock livestreams and a licensing deal, proceeds even as Jones fights the takeover of his brand in court.",
      "genre": "Culture",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxOWU9Ccmx5a1RWM3RIV3dFTUQ4dExWU3YyOTJESUhZTFBjUnZpU3NJeC1kUXFOT1dmbG1JTXBOV2pqNWdYN0x2eUZBSkw1aWdTNGhCYUhlLU5lMTV4RjZfY1hFMHdiT2hhMzB1NmNpZkFNOXRfNGVpUjhjcVNTNlI4Nkl2RUhxWHluMThUMXZHU1NfLVh0bGJIV2QzaE9pMUVZbEx1Nw?oc=5"
        },
        {
          "name": "The Boston Globe",
          "href": "https://www.bostonglobe.com/2026/07/02/nation/the-onion-alex-jones-infowars/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/onion-infowars-sandy-hook.png",
        "alt": "A studio microphone and 'On Air' broadcast sign in a talk-radio set.",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Thomas Nast's cartoons against \"Boss\" Tweed and the Tammany Ring (1871)",
          "excerpt": "Two great questions. \"Who is Ingersoll's Co.?\" — \"Who stole the people's money? / Do tell.\"",
          "source": "Library of Congress, Prints & Photographs Division (Harper's Weekly)",
          "href": "https://www.loc.gov/item/2006685392/"
        },
        {
          "category": "historical",
          "title": "Voltaire and the Calas affair — Traité sur la tolérance (1763)",
          "excerpt": "LE meurtre de Calas, commis dans Toulouse avec le glaive de la Justice, le 9me Mars 1762, est un des plus singuliers événements qui méritent l'attention de notre âge & de la postérité.",
          "source": "Wikisource (Édition 1763, ch. I: Histoire abrégée de la mort de Jean Calas)",
          "href": "https://fr.wikisource.org/wiki/Trait%C3%A9_sur_la_tol%C3%A9rance/%C3%89dition_1763/01"
        },
        {
          "category": "literary",
          "title": "Jonathan Swift, \"A Modest Proposal\" (1729)",
          "excerpt": "I have been assured by a very knowing American of my acquaintance in London, that a young healthy child well nursed, is, at a year old, a most delicious nourishing and wholesome food, whether stewed, roasted, baked, or boiled; and I make no doubt that it will equally serve in a fricassee, or a ragout.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/1080/1080-h/1080-h.htm"
        },
        {
          "category": "literary",
          "title": "Aristophanes, \"The Knights\" (Equites, 424 BC), tr. Eugene O'Neill, Jr.",
          "excerpt": "Oh! alas! alas! Oh! woe! oh! woe! Miserable Paphlagonian! may the gods destroy both him and his cursed advice! Since that evil day when this new slave entered the house he has never ceased belaboring us with blows.",
          "source": "Perseus Digital Library, Tufts University",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0034"
        },
        {
          "category": "artistic",
          "title": "Honoré Daumier, \"Gargantua\" (lithograph, La Caricature, 16 December 1831)",
          "excerpt": "Daumier draws King Louis-Philippe as Rabelais's insatiable giant, enthroned on a commode and gorging on baskets of gold hauled up a ramp from the emptied pockets of the poor. From the well-fed monarch the plunder is excreted back as commissions and honours scrambled for by his cronies below. For this mockery the stone was destroyed, the print banned, and Daumier jailed for six months — proof of how much a caricature could frighten power.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Gargantua.jpg",
          "image": {
            "src": "/covers/onion-infowars-sandy-hook--art.png",
            "alt": "Honoré Daumier's 1831 lithograph \"Gargantua\" depicting King Louis-Philippe as a giant devouring gold coins carried up a ramp",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Charles Philipon, \"Les Poires\" — Louis-Philippe as a pear (Le Charivari, 1834; after the 1831 original)",
          "excerpt": "In four deft strokes Philipon morphs the jowly face of King Louis-Philippe into a common pear — a joke he first sketched at his own press trial to argue that any resemblance was the censor's problem, not his. The \"poire\" became an emblem of resistance the throne could not suppress; banned as a drawing, it reappeared spelled out in type and scrawled on walls across Paris. The jester's single image turned the monarch into a walking punchline.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Les_Poires_(1834)_(cropped).jpg"
        }
      ],
      "rank": 34
    },
    {
      "slug": "microsoft-lightstorm-undersea-cable",
      "headline": "Microsoft and Lightstorm to build India–Southeast Asia undersea cable for AI traffic",
      "overview": "Microsoft joined a consortium led by Singapore's Lightstorm to build a 3,600-kilometre undersea cable, called I-2SEA, linking India with Malaysia and Singapore to feed surging AI and cloud demand. The system, with partners including Tata Communications and NEC, is expected to enter service in late 2029.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxNSVkwdWpuTlF6d2w2QVpYbGlSZ2RHbzlkTTFtYkRabnlKbE9KVlB1S1VldTdvUDlMTDlsREk2SVlyMDQzVDZzWnNpUzhQdDRUcW45TEg5dEV2RlNZcm9BUk1PMExtR21QNk8yLTRRb0xtQWR1cHgySzNZV3lMQmg3eUNtRGdUWmJOdmh4U3hzT283UHJpbDIzcGtkOWJYYlE0TDd3MjhuY0hBSDJYdGN5d2JFTHkxMEN4Mkh4QVkwSWxpbkxtaUwyUUVkbw?oc=5"
        },
        {
          "name": "Yahoo Finance",
          "href": "https://finance.yahoo.com/technology/articles/microsoft-partners-singapores-lightstorm-build-033554631.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/microsoft-lightstorm-undersea-cable.png",
        "alt": "A submarine fibre-optic cable being laid from the deck of a cable-laying ship at sea.",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The first transatlantic telegraph cable (1858, permanently in 1866)",
          "excerpt": "In August 1858 the frigates Agamemnon and Niagara met in mid-ocean, spliced their cable ends and paid out a copper thread across some two thousand miles of Atlantic floor, letting Queen Victoria and President Buchanan exchange greetings that had lately taken ten days by ship. That first line failed within weeks, but in 1866 Brunel's colossal Great Eastern laid a durable cable from Ireland to Newfoundland, and the Old and New Worlds could suddenly speak in minutes rather than weeks. Contemporaries hailed the deep-sea wire as the nervous system of a newly shrunken planet, the same promise now made for an AI-era artery beneath the Indian Ocean.",
          "source": "The Story of the Atlantic Telegraph, Henry M. Field (Project Gutenberg)",
          "href": "https://www.gutenberg.org/ebooks/34765"
        },
        {
          "category": "historical",
          "title": "The opening of the Suez Canal (17 November 1869)",
          "excerpt": "On 17 November 1869 the imperial yacht L'Aigle led a flotilla of some forty ships into Ferdinand de Lesseps' new canal, a hundred-mile channel cut through the isthmus to join the Mediterranean with the Red Sea. At a stroke the sea route from Europe to India and the Far East was shortened by thousands of miles, sparing vessels the long haul around the Cape of Good Hope. Like a fresh artery slashed through desert sand, the canal rerouted the commerce of empires and pulled distant continents into faster, closer contact.",
          "source": "Fondation Napoléon – Inauguration Ceremony of the Suez Canal at Port-Said, 17 November 1869",
          "href": "https://www.napoleon.org/en/history-of-the-two-empires/paintings/inauguration-ceremony-of-the-suez-canal-at-port-said-17-november-1869/"
        },
        {
          "category": "literary",
          "title": "\"The Deep-Sea Cables,\" Rudyard Kipling (from The Seven Seas, 1896)",
          "excerpt": "The wrecks dissolve above us; their dust drops down from afar—\nDown to the dark, to the utter dark, where the blind white sea-snakes are.\nThere is no sound, no echo of sound, in the deserts of the deep,\nOr the great gray level plains of ooze where the shell-burred cables creep.\n\nHere in the womb of the world—here on the tie-ribs of earth\nWords, and the words of men, flicker and flutter and beat—\nWarning, sorrow and gain, salutation and mirth—\nFor a Power troubles the Still that has neither voice nor feet.\n\nThey have wakened the timeless Things; they have killed their father Time;\nJoining hands in the gloom, a league from the last of the sun.\nHush! Men talk to-day o'er the waste of the ultimate slime,\nAnd a new Word runs between: whispering, \"Let us be one!\"",
          "source": "The Seven Seas, Rudyard Kipling (Project Gutenberg)",
          "href": "https://www.gutenberg.org/files/27870/27870-h/27870-h.htm"
        },
        {
          "category": "literary",
          "title": "\"Passage to India,\" Walt Whitman (1871; Leaves of Grass)",
          "excerpt": "Passage to India!\nLo, soul, seest thou not God's purpose from the first?\nThe earth to be spann'd, connected by network,\nThe races, neighbors, to marry and be given in marriage,\nThe oceans to be cross'd, the distant brought near,\nThe lands to be welded together.\n\nIn the Old World the east the Suez canal,\nThe New by its mighty railroad spann'd,\nThe seas inlaid with eloquent gentle wires;",
          "source": "Leaves of Grass (1882), Walt Whitman (Wikisource)",
          "href": "https://en.wikisource.org/wiki/Leaves_of_Grass_(1882)/Passage_to_India"
        },
        {
          "category": "artistic",
          "title": "The Eighth Wonder of the World – The Atlantic Cable (Kimmel & Forster, New York, 1866)",
          "excerpt": "This exuberant allegorical lithograph crowns the completion of the 1866 Atlantic cable as a modern marvel. The submarine wire arcs across the ocean from the paw of a British lion to the talon of an American eagle, while Neptune reclines below and a portrait of promoter Cyrus W. Field presides above the flag-draped scene. The ports of London and Manhattan shimmer on either shore, their clock towers marking the time zones now bridged in an instant — a Victorian vision of two continents wired into one.",
          "source": "Library of Congress, Prints & Photographs Division",
          "href": "https://www.loc.gov/item/93510355/",
          "image": {
            "src": "/covers/microsoft-lightstorm-undersea-cable--art.png",
            "alt": "1866 allegorical lithograph of the Atlantic telegraph cable arcing across the ocean between a British lion and an American eagle, with Neptune below and a portrait of Cyrus Field above.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "The Atlantic Telegraph Cable Fleet Assembled at Berehaven, Robert Charles Dudley (1865–1866)",
          "excerpt": "Dudley, the official artist of the 1865–66 expeditions, shows the cable fleet gathered off the southwest coast of Ireland before setting out to sea. At the center looms the vast hull of the Great Eastern — the only ship large enough to carry the coiled deep-sea cable — flanked by H.M.S. Terrible and the tenders Alby, Medway and William Cory. The calm, ceremonial gathering of ships captures the sheer industrial scale required to lay a single thread of connection between continents.",
          "source": "The Metropolitan Museum of Art, New York",
          "href": "https://www.metmuseum.org/art/collection/search/383832"
        }
      ],
      "rank": 35
    },
    {
      "slug": "new-jersey-medicaid-employer-fee",
      "headline": "New Jersey to charge employers whose workers rely on Medicaid",
      "overview": "New Jersey Governor Mikie Sherrill signed a measure charging companies with at least 50 workers covered by Medicaid, a fee the state expects to raise about $145 million this year. Per-worker charges range from $325 to $725 a year, and officials say other states are weighing similar moves as federal changes strain the program.",
      "genre": "Economy",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxNZDA1bGpRNHVjRzFnanAxUkVOTURkaEtXbFNoWUsyaHpCZWF4Y1NDYWNKSmtjcEpJRkVZVUQ0ODNMaV9BaTVnbS1mcmNncVhERVBkMjFoZ0p3S2d1Ym81c1QzQ2N4VDI5TTRCM09ZSDhWYmJ2SnB3SzVjY2Z6NjlGX2RxLTJMeWdaRUFWRzFjUWhvSDZWdmc?oc=5"
        },
        {
          "name": "The Boston Globe",
          "href": "https://www.bostonglobe.com/2026/07/02/nation/new-jersey-charge-companies-with-workers-on-medicaid/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/new-jersey-medicaid-employer-fee.png",
        "alt": "A stethoscope and a plain folder resting on a bench in a quiet, dimly lit clinic waiting room.",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "An Acte for the Reliefe of the Poore (43 Elizabeth I, c. 2), 1601",
          "excerpt": "And also to raise weekly or otherwise (by taxation of every Inhabitant, Parson, Vicar, and other, and of every occupier of Lands, Houses, Tithes impropriate, or Propriations of Tithes, Coalmines, or saleable underwoods in the said Parish, in such competent sum and sums of money as they think fit) a convenient stock of Flax, Hemp, Wool, Thread, iron, and other necessary ware and stuff to set the poor on work, and also competent sums of money, for, and towards the necessary relief of the lame, impotent, old, blind, and such other among them being poor, and not able to work, and also for the putting out of such children to be apprentices, to be gathered out of the same Parish.",
          "source": "The Statutes Project — full text of the Elizabethan Poor Law of 1601",
          "href": "https://statutes.org.uk/site/the-statutes/seventeenth-century/1601-43-elizabeth-c-2-act-for-the-relief-of-the-poor/"
        },
        {
          "category": "historical",
          "title": "Bismarck's Reichstag Speech on the Law for Workers' Compensation (March 15, 1884)",
          "excerpt": "Defending Germany's pioneering insurance laws, Bismarck argued that a modern state has a positive duty to care for its helpless, injured, and aged citizens rather than abandon them to private charity or the poorhouse. Financed by compulsory contributions from employers and workers alike, his sickness, accident, and old-age insurance schemes bound the very industries that profited from labor to the upkeep of the laborers they used up. He framed it as both a Christian obligation and a shrewd means of drawing the poor away from revolution.",
          "source": "German History in Documents and Images (GHDI), trans. in University of Chicago Readings in Western Civilization, vol. 8",
          "href": "https://germanhistorydocs.org/en/forging-an-empire-bismarckian-germany-1866-1890/bismarck-s-reichstag-speech-on-the-law-for-workers-compensation-march-15-1884"
        },
        {
          "category": "literary",
          "title": "A Christmas Carol, by Charles Dickens (1843), Stave One",
          "excerpt": "\"The Treadmill and the Poor Law are in full vigour, then?\" said Scrooge.\n\n\"Both very busy, sir.\"\n\n\"Oh! I was afraid, from what you said at first, that something had occurred to stop them in their useful course,\" said Scrooge. \"I'm very glad to hear it.\"\n\n\"Under the impression that they scarcely furnish Christian cheer of mind or body to the multitude,\" returned the gentleman, \"a few of us are endeavouring to raise a fund to buy the Poor some meat and drink, and means of warmth. We choose this time, because it is a time, of all others, when Want is keenly felt, and Abundance rejoices. What shall I put you down for?\"\n\n\"Nothing!\" Scrooge replied.",
          "source": "Project Gutenberg, eBook #46",
          "href": "https://www.gutenberg.org/files/46/46-0.txt"
        },
        {
          "category": "literary",
          "title": "The Gospel According to St. Matthew 25:34-40 (King James Bible, 1611/1769)",
          "excerpt": "Then shall the King say unto them on his right hand, Come, ye blessed of my Father, inherit the kingdom prepared for you from the foundation of the world: For I was an hungred, and ye gave me meat: I was thirsty, and ye gave me drink: I was a stranger, and ye took me in: Naked, and ye clothed me: I was sick, and ye visited me: I was in prison, and ye came unto me. Then shall the righteous answer him, saying, Lord, when saw we thee an hungred, and fed thee? or thirsty, and gave thee drink? When saw we thee a stranger, and took thee in? or naked, and clothed thee? Or when saw we thee sick, or in prison, and came unto thee? And the King shall answer and say unto them, Verily I say unto you, Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me.",
          "source": "Wikisource — Bible (King James), Matthew",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
        },
        {
          "category": "artistic",
          "title": "The Potato Eaters, by Vincent van Gogh (1885)",
          "excerpt": "Van Gogh's dim, earthen scene gathers five peasants around a single dish of potatoes beneath one hanging lamp, their knotted hands and weathered faces the same colour as the soil they work. He meant the picture as an honest reckoning with rural poverty: these are people who have dug the earth with the very hands now reaching for their meagre supper, laborers whose toil sustains a society that barely sustains them in return.",
          "source": "Van Gogh Museum, Amsterdam — via Wikimedia Commons (Google Art Project)",
          "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_potato_eaters_-_Google_Art_Project_(5776925).jpg",
          "image": {
            "src": "/covers/new-jersey-medicaid-employer-fee--art.png",
            "alt": "Vincent van Gogh's 1885 painting The Potato Eaters, showing five poor peasants sharing a plate of potatoes by lamplight in a dark cottage.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Applicants for Admission to a Casual Ward, by Luke Fildes (1874)",
          "excerpt": "Fildes lines up a ragged crowd of the destitute — a shivering mother with an infant, a broken laborer, exhausted children — waiting against a cold wall outside a police station for a ticket that might admit them to the workhouse for a single night. Grown from a sketch titled 'Houseless and Hungry,' this landmark of Victorian social realism forced comfortable gallery-goers to look directly at the human cost of the Poor Law, at those the prosperous city had left to queue for charity in the dark.",
          "source": "Tate, London — via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Applicants_for_Admission_to_a_Casual_Ward.jpg"
        }
      ],
      "rank": 36
    },
    {
      "slug": "europe-leaders-close-ranks-trump",
      "headline": "Europe's leaders close ranks amid barbs and pressure from Trump",
      "overview": "European leaders rallied around Italian Prime Minister Giorgia Meloni after President Donald Trump questioned Italy's reliability and mocked her standing, thawing ties once strained by her hard-right roots. Analysts said the episode is drawing European governments closer on defence, trade and foreign policy ahead of a NATO summit in Turkey.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxOMi0tMUp4U2tXN2pRRTA1QzBqQXZkbFBjQ3lTZmRJZU1lS0pPY096Qm1fMU9rbV9RMGxObUdnaTdkYjhWemFNODh1OWNvdkxLTWNZRWUtWHhIaXhtN0VBeU9FRkdYcm1tSmZlWFF4Q1l0RE0wR2x4aFhFWjFfSUp3UEs5UlRnZm5mMG1DbHZyX0NEbU1ERzZFNW1B?oc=5"
        },
        {
          "name": "The Washington Post",
          "href": "https://www.washingtonpost.com/world/2026/07/02/italy-europe-trump-meloni-iran-war/e4055bae-75cb-11f1-b665-5f8be87f3787_story.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/europe-leaders-close-ranks-trump.png",
        "alt": "European Union flags flying outside a government building in Europe.",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Hellenic League against Persia (Congress at the Isthmus of Corinth, 481 BC)",
          "excerpt": "Facing the vast invasion force of Xerxes, the fractious and habitually feuding Greek city-states set aside their quarrels and met at the Isthmus of Corinth to swear common cause. Athens and Sparta, longtime rivals, agreed to pool their fleets and armies under a shared command against the Persian giant. It was the external menace, not any prior affection, that forged the alliance which would hold at Salamis and Plataea.",
          "source": "Herodotus, The Histories, Book 7 (trans. George Rawlinson, 1858), on Wikisource",
          "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7"
        },
        {
          "category": "historical",
          "title": "The Lombard League and the Peace of Constance (1183)",
          "excerpt": "When Emperor Frederick Barbarossa pressed his imperial claims over the wealthy towns of northern Italy, once-competing communes such as Milan, Verona and Cremona bound themselves into the Lombard League. Their combined militias broke the emperor's cavalry at Legnano in 1176, and the Peace of Constance in 1183 forced him to recognize their liberties and self-government. A domineering overlord had inadvertently welded scattered, jealous cities into a durable defensive union.",
          "source": "Internet Medieval Sourcebook, Fordham University (Diet of Roncaglia and the Peace of Constance)",
          "href": "https://sourcebooks.web.fordham.edu/source/barbarossa-lombards.asp"
        },
        {
          "category": "literary",
          "title": "Herodotus, The Histories, Book 8.144 (the Athenians' reply to Sparta; trans. George Rawlinson, 1858)",
          "excerpt": "Again, there is our common brotherhood with the Greeks: our common language, the altars and the sacrifices of which we all partake, the common character which we bear - did the Athenians betray all these, of a truth it would not be well. Know then now, if ye have not known it before, that while one Athenian remains alive, we will never join alliance with Xerxes.",
          "source": "Wikisource, The History of Herodotus (Rawlinson), Book 8",
          "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_8"
        },
        {
          "category": "literary",
          "title": "Aesop, \"The Bundle of Sticks\", Aesop's Fables (trans. V. S. Vernon Jones, 1912)",
          "excerpt": "An old man on the point of death summoned his sons around him to give them some parting advice. He ordered his servants to bring in a faggot of sticks, and said to his eldest son: \"Break it.\" The son strained and strained, but with all his efforts was unable to break the Bundle. The other sons also tried, but none of them was successful. \"Untie the faggots,\" said the father, \"and each of you take a stick.\" When they had done so, he called out to them: \"Now, break,\" and each stick was easily broken. \"You see my meaning,\" said their father.\n\nUnion gives strength.",
          "source": "Project Gutenberg, Aesop's Fables (EBook #28)",
          "href": "https://www.gutenberg.org/files/28/28-h/28-h.htm"
        },
        {
          "category": "artistic",
          "title": "Jacques-Louis David, \"The Oath of the Horatii\" (Le Serment des Horaces), 1784-1785",
          "excerpt": "Three brothers thrust their arms out in unison toward the raised swords their father holds aloft, their bodies drawn taut into a single line of resolve. David freezes the instant private feeling is surrendered to a shared vow, the grieving women collapsed to one side underscoring the cost of that solidarity. It became the defining image of citizens binding themselves together for a cause greater than any of them alone.",
          "source": "Musee du Louvre, collections online object page",
          "href": "https://collections.louvre.fr/en/ark:/53355/cl010062239",
          "image": {
            "src": "/covers/europe-leaders-close-ranks-trump--art.png",
            "alt": "Jacques-Louis David's Oath of the Horatii: three brothers stretch their arms toward their father, who holds up three swords, as women mourn at the right.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Johann Heinrich Fussli (Henry Fuseli), \"The Oath on the Rutli\" (Die drei Eidgenossen beim Schwur auf dem Rutli), 1780",
          "excerpt": "Three men from separate Alpine valleys clasp their swords together and raise their arms as one, sealing the founding oath of the Swiss Confederation against Habsburg domination. Fuseli lights the figures dramatically against darkness, making the moment of union feel like a sacred, almost superhuman pact. Small, independent communities are shown fusing into a single body precisely because a mightier power threatens them all.",
          "source": "Kunsthaus Zurich (inv. 1989/0015), via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Henry_Fuseli_-_Die_drei_Eidgenossen_beim_Schwur_auf_dem_R%C3%BCtli_-_1989-0015_-_Kunsthaus_Z%C3%BCrich.jpg"
        }
      ],
      "rank": 37
    },
    {
      "slug": "puerto-rico-hurricane-funds-audit",
      "headline": "Federal audit finds Puerto Rico still awaiting billions in grid funds nearly a decade after Hurricane Maria",
      "overview": "A federal audit found that only about a quarter of some $14 billion obligated to rebuild Puerto Rico's power grid after Hurricane Maria has actually reached the island nearly nine years on. Democratic lawmakers who released the 86-page report said residents had watched billions be appropriated while almost none of it arrived.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxOdjNSNFZKRWNHdXZhb0J6Tk1tV1RqSnotQmtJb0V1UnlZckt6czBSdURuY0NHV251RXhMSXBTanZxVnhrY0RWSXFybVc1LWtXa0llS2ZoaFdmM29HaUtfZk1WU3BXQWI5Y2pYdHZRQTNsQUZwcGM4aUxaTW16WTloYWZhd0UyT052VkI1NDU5WGE1MG1CU2J1NW03V2FvaTdsZmN4QXRETTJxTnNWcHE0?oc=5"
        },
        {
          "name": "The Washington Post",
          "href": "https://www.washingtonpost.com/business/2026/07/01/gao-audit-puerto-rico-hurricane-federal-funds-grid/937cf95e-75ac-11f1-b665-5f8be87f3787_story.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/puerto-rico-hurricane-funds-audit.png",
        "alt": "Damaged electrical transmission towers and power lines in Puerto Rico.",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "\"The Story of an Eyewitness\" — Jack London on the 1906 San Francisco earthquake and fire (Collier's, 1906)",
          "excerpt": "Not in history has a modern imperial city been so completely destroyed. San Francisco is gone. Nothing remains of it but memories and a fringe of dwelling-houses on its outskirts.",
          "source": "Jack London, eyewitness dispatch for Collier's, 1906 (UCSB Understanding Earthquakes archive)",
          "href": "https://projects.eri.ucsb.edu/understanding/accounts/london.html"
        },
        {
          "category": "historical",
          "title": "History of the Johnstown Flood — Willis Fletcher Johnson (1889)",
          "excerpt": "All day long men, women, and children were plodding about the desolate waste looking in vain to locate the boundaries of their former homes.",
          "source": "Project Gutenberg, History of the Johnstown Flood by Willis Fletcher Johnson (1889)",
          "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
        },
        {
          "category": "literary",
          "title": "\"The Lisbon Earthquake\" (Poem on the Lisbon Disaster) — Voltaire, 1756 (trans. W. F. Fleming)",
          "excerpt": "Oh wretched man, earth-fated to be cursed;\nAbyss of plagues, and miseries the worst!\nHorrors on horrors, griefs on griefs must show,\nThat man's the victim of unceasing woe,\nAnd lamentations which inspire my strain,\nProve that philosophy is false and vain.\nApproach in crowds, and meditate awhile\nYon shattered walls, and view each ruined pile,\nWomen and children heaped up mountain high,\nLimbs crushed which under ponderous marble lie;\nWretches unnumbered in the pangs of death,\nWho mangled, torn, and panting for their breath,\nBuried beneath their sinking roofs expire,",
          "source": "Wikisource, The Works of Voltaire, Volume 36",
          "href": "https://en.wikisource.org/wiki/The_Works_of_Voltaire/Volume_36/The_Lisbon_Earthquake"
        },
        {
          "category": "literary",
          "title": "The Book of Lamentations, Chapter 1 (King James Version, 1611)",
          "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary! She weepeth sore in the night, and her tears are on her cheeks: among all her lovers she hath none to comfort her: all her friends have dealt treacherously with her, they are become her enemies. Judah is gone into captivity because of affliction, and because of great servitude: she dwelleth among the heathen, she findeth no rest: all her persecutors overtook her between the straits. The ways of Zion do mourn, because none come to the solemn feasts: all her gates are desolate: her priests sigh, her virgins are afflicted, and she is in bitterness.",
          "source": "Wikisource, Bible (King James) / Lamentations",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
        },
        {
          "category": "artistic",
          "title": "The Course of Empire: Desolation — Thomas Cole (1836)",
          "excerpt": "In the last canvas of Cole's five-part cycle the proud city has become a silent ruin. The sun has set and a pale moon climbs a twilight sky as ivy swallows the shattered colonnades and a lone heron nests on a broken column. What men built and celebrated has been abandoned to time; the empire that once thronged these streets is gone, leaving only overgrown wreckage where a people used to live.",
          "source": "Wikimedia Commons (original in the New-York Historical Society)",
          "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Desolation_1836.jpg",
          "image": {
            "src": "/covers/puerto-rico-hurricane-funds-audit--art.png",
            "alt": "Twilight over the ivy-grown ruins of a fallen classical city, a lone column standing amid shattered colonnades beside a still river, from Thomas Cole's 1836 painting Desolation.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Requiem in D minor, K.626 — Wolfgang Amadeus Mozart (1791)",
          "excerpt": "Requiem aeternam dona eis, Domine: et lux perpetua luceat eis. (Grant them eternal rest, O Lord: and let perpetual light shine upon them.)",
          "source": "IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
        }
      ],
      "rank": 38
    },
    {
      "slug": "davidson-prize-routemaster-playgrounds",
      "headline": "Davidson Prize goes to plan turning retired London Routemaster buses into mobile playgrounds",
      "overview": "R.U.A Studio won the 2026 Davidson Prize for Playdeck, a proposal to convert more than 1,000 decommissioned New Routemaster buses into intergenerational mobile playgrounds parked in neighbourhoods short of play space. Each bus would carry modular play blocks that unpack into a climbing-and-gathering landscape, with the concept unveiled during the London Festival of Architecture.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/07/02/rua-studio-playdeck-davidson-prize/"
        },
        {
          "name": "Architects' Journal",
          "href": "https://www.architectsjournal.co.uk/news/davidson-prize-2026-reveals-playful-winning-concept"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-02",
      "image": {
        "src": "/covers/davidson-prize-routemaster-playgrounds.png",
        "alt": "A retired red London Routemaster double-decker bus reimagined as a children's play space.",
        "credit": "AI-generated"
      },
      "edition": "Afternoon Edition · 2 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "\"They shall beat their swords into plowshares\" — Isaiah 2:4, King James Bible (1611)",
          "excerpt": "And he shall judge among the nations, and shall rebuke many people: and they shall beat their swords into plowshares, and their spears into pruninghooks: nation shall not lift up sword against nation, neither shall they learn war any more.",
          "source": "The Book of Isaiah, chapter 2, verse 4 (Authorized King James Version)",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Isaiah"
        },
        {
          "category": "historical",
          "title": "The Emdrup Junk Playground — Carl Theodor Sørensen, Copenhagen (opened 1943)",
          "excerpt": "In the middle of the Nazi occupation of Denmark, Carl Theodor Sørensen carved out a fenced patch of Copenhagen where city children could dig, build and invent with scrap timber, tools and salvaged junk. The first planned adventure playground was born not from new equipment but from cast-off material and free imagination, and is now cited as the birthplace of playwork. Its lesson runs straight to Playdeck: give children discarded stuff, a little space, and their play remakes the leftovers of the adult world into something alive.",
          "source": "Emdrup Junk Playground (Skrammellegepladsen), designed by landscape architect Carl Theodor Sørensen with pedagogue John Bertelsen",
          "href": "https://en.wikipedia.org/wiki/Emdrup_Junk_Playground"
        },
        {
          "category": "literary",
          "title": "Letters on the Aesthetic Education of Man, Letter XV — Friedrich Schiller (1795)",
          "excerpt": "For, to speak out once for all, man only plays when in the full meaning of the word he is a man, and he is only completely a man when he plays.",
          "source": "Friedrich Schiller, On the Aesthetic Education of Man in a Series of Letters, Letter XV",
          "href": "https://monadnock.net/schiller/letter-15.html"
        },
        {
          "category": "literary",
          "title": "\"The Ecchoing Green,\" from Songs of Innocence — William Blake (1789)",
          "excerpt": "The Sun does arise,\nAnd make happy the skies.\nThe merry bells ring\nTo welcome the Spring.\nThe sky-lark and thrush,\nThe birds of the bush,\nSing louder around,\nTo the bells' chearful sound.\nWhile our sports shall be seen\nOn the Ecchoing Green.",
          "source": "William Blake, Songs of Innocence and of Experience, \"The Ecchoing Green\" (first stanza)",
          "href": "https://en.wikisource.org/wiki/Songs_of_Innocence_and_of_Experience_(1826)/Songs_of_Innocence/The_Ecchoing_Green"
        },
        {
          "category": "artistic",
          "title": "Children's Games (Kinderspiele) — Pieter Bruegel the Elder (1560)",
          "excerpt": "From a raised, bird's-eye vantage Bruegel fills an entire town square with more than two hundred children absorbed in some eighty-three different games, from hobby-horses and hoops to leapfrog and blind man's buff. There are no adults at play; the whole urban space has been handed over to childhood, its streets and buildings turned into instruments of invention. It is the perfect antecedent for Playdeck's vision of neighbourhoods reclaimed for play.",
          "source": "Kunsthistorisches Museum, Vienna (inv. GG 1017), oil on panel",
          "href": "https://www.khm.at/en/objectdb/detail/321/",
          "image": {
            "src": "/covers/davidson-prize-routemaster-playgrounds--art.png",
            "alt": "Pieter Bruegel the Elder's 1560 painting Children's Games, showing a town square crowded with children playing dozens of different games",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Kinderszenen (Scenes from Childhood), Op. 15 — Robert Schumann (1838)",
          "excerpt": "Schumann's thirteen brief piano pieces are an adult's tender recollection of childhood, with movements like \"Of Foreign Lands and Peoples,\" \"Catch Me If You Can,\" \"Knight of the Hobbyhorse\" and the beloved \"Träumerei\" (Dreaming). Simple in means yet inexhaustible in feeling, they treat play not as something small but as a doorway back to wonder. That is exactly the spirit Playdeck stages: an intergenerational return to play, where the old machines of the city become a bridge between grown-ups and children.",
          "source": "Robert Schumann, Kinderszenen, Op. 15 (thirteen piano miniatures), scores hosted at IMSLP / Petrucci Music Library",
          "href": "https://imslp.org/wiki/Kinderszenen,_Op.15_(Schumann,_Robert)"
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
