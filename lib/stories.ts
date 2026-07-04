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
// the Evening Edition of 2 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Afternoon Edition and the Morning Edition of 2 July 2026.
// Stories are selected from the live RSS feeds in `lib/feeds.ts`. The analogies are
// the heart of each story: six per event, two per category, each linking to a real
// human-written source (a primary text, museum object page, or archive). Excerpts
// quote the most relevant passage verbatim where the source is public domain, and
// otherwise describe rather than quote. Covers are dithered local copies: feed or
// rights-clean Wikimedia art/photos credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated"). Every analogy carries its own
// image too — a rights-clean visual of its subject (the artwork itself, a manuscript
// page, a portrait, a title page; never AI-generated), dithered via
// scripts/dither-art.ts to /covers/<slug>--historical-1|2, --literary-1|2, --music,
// --art. Omit only when nothing rights-clean exists; the home hero crossfades to
// these on hover. Source links to AP/Reuters are Google News redirects (see
// `lib/feeds.ts`).
const stories: Story[] = [
  {
    "slug": "china-coast-guard-patrol-taiwan",
    "headline": "China launches a fresh coast guard patrol east of Taiwan despite international objections",
    "overview": "China's coast guard launched a new law-enforcement patrol in waters east of Taiwan, rotating in a task group led by the vessel Xiushan, the second such patrol in about a month, in a move that has angered Taipei and alarmed some Western capitals. Taiwan said it was tracking two Chinese ships roughly 54 nautical miles off Hualien and condemned the patrol as an 'illegal expansion of power.' Beijing casts the patrols as routine law enforcement to assert its claim over the island.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNM3RSWE5PeUlKd0FaVTNkNG9YS3BlT2s5QzZXdTdZak5yWGpCRWR1NTdvU0FJNU9EQlRGSkZkdmxfcE81YWU0VHYxcFppbFlOZk9BS3BtemlYUzRMX1c4a2NwZmNCSWk5QVVDZW1TU2N4QlRLUlRNLTIxRmNwUnZKOEh3eXNSSlRnczNZS1VadTVvX1JISnJPVVA0RHd3Uk8zTDFmMTJYNDEyVVRTZ3NUNEotNjNVN2VtZEJWNVRxWFE3QQ?oc=5"
      },
      {
        "name": "Nikkei Asia",
        "href": "https://asia.nikkei.com/politics/international-relations/taiwan-tensions/china-sends-coast-guard-east-of-taiwan-in-new-patrol"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/china-coast-guard-patrol-taiwan.png",
      "alt": "A China Coast Guard vessel under way at sea during a multinational maritime exercise",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "edition": "Afternoon Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "History of the Peloponnesian War, Thucydides (c. 411 BC) — the island of Melos told that the powerful bend the weak to their will.",
        "excerpt": "since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm"
      },
      {
        "category": "historical",
        "title": "Commentaries on the Gallic War, Julius Caesar (c. 50 BC) — Rome draws an eleven-mile ring of works around besieged Alesia.",
        "excerpt": "The circuit of that fortification, which was commenced by the Romans, comprised eleven miles.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/10657/pg10657.txt"
      },
      {
        "category": "literary",
        "title": "The Iliad, Homer, trans. Samuel Butler (c. 8th c. BC) — a city beleaguered on an island far out at sea.",
        "excerpt": "As the smoke that goes up into heaven from some city that is being beleaguered on an island far out at sea—all day long do men sally from the city and fight their hardest, and at the going down of the sun the line of beacon-fires blazes forth, flaring high for those that dwell near them to behold, if so be that they may come with their ships and help them.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt"
      },
      {
        "category": "literary",
        "title": "The Siege of Corinth, Lord Byron (1816) — the crescent host arrayed from shore to shore around the citadel.",
        "excerpt": "On Cithaeron's ridge appears / The gleam of twice ten thousand spears; / And downward to the Isthmian plain, / From shore to shore of either main, / The tent is pitch'd, the crescent shines / Along the Moslem's leaguering lines;",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Siege_of_Corinth"
      },
      {
        "category": "artistic",
        "title": "The Siege of Malta: Arrival of the Turkish Fleet, 20 May 1565, Matteo Perez d'Aleccio (c. 1580s) — an armada gathering around a small island fortress.",
        "excerpt": "A crowded sweep of Ottoman galleys advances across the harbor waters toward the fortified shores of Malta, sails and oars filling the sea as the great fleet arrives to encircle the island. Cannon smoke, bristling masts and massed hulls press in on the little bastioned strongholds that cling to the coast. The painting makes visible the moment a small island first sees a great power's armada closing around it.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Matteo_Perez_d%27_Aleccio_(1547-1616)_-_The_Siege_of_Malta,_Arrival_of_the_Turkish_Fleet,_20_May_1565_-_BHC0252_-_Royal_Museums_Greenwich.jpg",
        "image": {
          "src": "/covers/china-coast-guard-patrol-taiwan--art.png",
          "alt": "The Siege of Malta: Arrival of the Turkish Fleet, 20 May 1565, Matteo Perez d'Aleccio (c. 1580s)",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "'Mars, the Bringer of War' from The Planets, Gustav Holst (1916) — a relentless, mechanized march that swells without pause, evoking the steady, menacing tightening of patrols around an island",
        "excerpt": "Holst sets a grinding five-beat ostinato that never relents, strings hammering col legno while brass and timpani pile into vast, crushing chords. The music does not depict a single battle so much as the implacable approach of overwhelming force. It conjures the mood of a great power's warships circling ever closer, patient and inexorable.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      }
    ],
    "rank": 1
  },
  {
    "slug": "trump-july4-america-250-address",
    "headline": "Trump opens America's 250th year with a combative Fourth of July address at Mount Rushmore",
    "overview": "President Donald Trump ushered in the United States' 250th-anniversary celebrations with a Fourth of July address at Mount Rushmore that hailed American exceptionalism before turning sharply partisan. Trump called communism 'a mortal threat to American liberty,' casting it as a greater danger than the World Wars, Pearl Harbor or the September 11 attacks. Critics said the darkly political tone jarred with the unifying occasion.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPblE3V2g1dE5UeTNfUkdDanpSbTdrbktXdjhDUUg5eXhycWtsSEFPcmpLOFZBMDd3ZzJwTFF3MkN5VGVROWhwd1ZTZjZ1OVVYdnZ0Sy10RlhzOVQ3WG5UV2x2Z2tTRHpFVXhpaTl1UWY1NXZrTUJPU3BVV04yTUdtdEpYbURxMkEyVXllMzlDWkpzamR6WXdDd3FFQ2FsYmth?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNTXlFQkJBcUxFQVl1SXZqbXJuR0lfV3RaOTFESHVtRTM4ZjJpdHVqSU1ibzBEdGJZVG5XSEx3NHlwN1ZzTWdiNVh5Mm9EQ3JObTV6Q2s0eWI3TUNJU3pYZTA1UVFWUVZtbTB5YkxGc2VUNlIyTVVKdTU5djNJV2ltNUhhSTVDOFlDLTJPVWo5Z2p2Y0JRamYxV19PWTZIeXVlanowUA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/trump-july4-america-250-address.png",
      "alt": "Mount Rushmore National Memorial in South Dakota, the setting where President Trump opened America's 250th-anniversary celebrations with his July 4 address.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Farewell Address, George Washington (1796) — the first president's parting warning that partisan fury would poison the republic he was leaving to posterity.",
        "excerpt": "Let me now take a more comprehensive view, and warn you in the most solemn manner against the baneful effects of the spirit of party generally. It serves always to distract the public councils and enfeeble the public administration. It agitates the community with ill-founded jealousies and false alarms, kindles the animosity of one part against another.",
        "source": "The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/18th_century/washing.asp"
      },
      {
        "category": "historical",
        "title": "What to the Slave Is the Fourth of July?, Frederick Douglass (1852) — an Independence Day oration that turned the nation's self-congratulation into an indictment, splitting the celebration into \"yours\" and \"mine.\"",
        "excerpt": "What, to the American slave, is your 4th of July? I answer: a day that reveals to him, more than all other days in the year, the gross injustice and cruelty to which he is the constant victim. This Fourth July is yours, not mine. You may rejoice, I must mourn.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/What_to_the_Slave_Is_the_Fourth_of_July%3F"
      },
      {
        "category": "literary",
        "title": "Julius Caesar, William Shakespeare (1599) — Mark Antony's funeral oration, the archetype of the demagogue who inflames a crowd while professing to calm it.",
        "excerpt": "Friends, Romans, countrymen, lend me your ears;\nI come to bury Caesar, not to praise him.\nThe evil that men do lives after them,\nThe good is oft interred with their bones;\nSo let it be with Caesar. The noble Brutus\nHath told you Caesar was ambitious.\nIf it were so, it was a grievous fault,\nAnd grievously hath Caesar answer'd it.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1522/1522-h/1522-h.htm"
      },
      {
        "category": "literary",
        "title": "The Knights, Aristophanes (424 BC) — a comedy skewering the demagogue who wins the People with flattery, a loud voice, and the language of the market-place.",
        "excerpt": "Continue your trade. Mix and knead together all the state business as you do for your sausages. To win the people, always cook them some savoury that pleases them. Besides, you possess all the attributes of a demagogue; a screeching, horrible voice, a perverse, cross-grained nature and the language of the market-place.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/8688/pg8688.txt"
      },
      {
        "category": "artistic",
        "title": "Declaration of Independence, John Trumbull (1819) — the founding ideal of unity Trump invoked at Rushmore, painted as a deliberative act of common purpose rather than combat.",
        "excerpt": "Trumbull crowds the drafting committee before Congress in a warm, ordered hall, all eyes converging on the document laid upon the table. No faction, no menace, no enemy is named; the drama is one of deliberation and shared assent. It is the founding staged as concord, a mirror against which any anniversary speech built on division measures poorly.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg",
        "image": {
          "src": "/covers/trump-july4-america-250-address--art.png",
          "alt": "Declaration of Independence, John Trumbull (1819)",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Stars and Stripes Forever, John Philip Sousa (1897) — the quintessential Fourth of July march, patriotic spectacle as pure, uncontested pageantry.",
        "excerpt": "Sousa's march bursts open with brass and drum into an unbroken current of celebration, the piccolo obbligato soaring over the final strain like fireworks against a summer sky. It is patriotism rendered as sheer festivity, needing no enemy to make the crowd cheer. Set beside a holiday address that turns to grievance and menace, its unclouded jubilation sounds like a reproach.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/The_Stars_and_Stripes_Forever_(Sousa,_John_Philip)"
      }
    ],
    "rank": 2
  },
  {
    "slug": "ukraine-drones-st-petersburg-oil-terminal",
    "headline": "Ukrainian drones strike a St Petersburg oil terminal and the Baltic port of Vysotsk",
    "overview": "A large overnight Ukrainian drone attack struck an oil terminal in St Petersburg and the Baltic port of Vysotsk in Russia's Leningrad region, regional governors said Saturday, in one of Kyiv's deepest strikes yet on Russian energy infrastructure. Officials reported no casualties and said 72 drones were downed over the region. President Volodymyr Zelensky said the strikes hit 'port oil infrastructure that generates revenue for Russia's war,' along with a military target at Kronstadt more than 850 kilometers from the border.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQdG5OWkQ3QVl5emhaZDcyRE9PNU5mSF93SVk5RmU0ME4tNjYyTEVOT3RQaGR4Y3pqWnh1NVlQTm1TTFFnel95RG9UNjlTbjU0aWdkWHZjV05EcnNVaTVLVDdHRzF6TGxGQkYxTVk5R0htcll0T3FJT3pKSFVxcGthc0VTdlg3TkdWWDdkZ0JONGVCbk9Yd3d2RzBPcnRoVEJCc3BNRUFJSXpzSDJLeVZlZnl1TUdsOVI2WkY4ZA?oc=5"
      },
      {
        "name": "Kyiv Independent",
        "href": "https://kyivindependent.com/st-petersburg-oil-terminal-july-4/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/ukraine-drones-st-petersburg-oil-terminal.png",
      "alt": "A nighttime oil refinery fire, towering orange flames and billowing black smoke lighting up the darkness over fuel storage tanks.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Histories (Book 5), Herodotus (c. 430 BC) — a torched city deep in the enemy's heartland that a ruler could never forgive.",
        "excerpt": "But when it was told to Darius that Sardis had been taken and burnt by the Athenians and Ionians, and that Aristagoras the Milesian had been leader of the conspiracy for the weaving of this plan, at his first hearing of it (it is said) he took no account of the Ionians, — being well assured that they of all men would not go scatheless for their rebellion, — but asked who were the Athenians; and being told, he called for his bow, which he took, and laid an arrow on it and shot it into the sky, praying as he sent it aloft, \"O Zeus, grant me vengeance on the Athenians,\" and therewithal he charged one of his servants to say to him thrice whenever dinner was set before him, \"Master, remember the Athenians.\"",
        "source": "LacusCurtius (University of Chicago), trans. A. D. Godley",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/5d*.html"
      },
      {
        "category": "historical",
        "title": "The History of Rome (Book 26), Livy (c. 25 BC) — the enemy suddenly at the capital's approaches, and panic runs through the streets.",
        "excerpt": "A messenger who had travelled from Fregellae for a day and a night without stopping created great alarm in Rome, and the excitement was increased by people running about the City with wildly exaggerated accounts of the news he had brought. The wailing cry of the matrons was heard everywhere, not only in private houses but even in the temples. Here they knelt and swept the temple-floors with their dishevelled hair and lifted up their hands to heaven in piteous entreaty to the gods that they would deliver the City of Rome out of the hands of the enemy and preserve its mothers and children from injury and outrage.",
        "source": "Wikisource (Livy, trans. Rev. Canon Roberts)",
        "href": "https://en.wikisource.org/wiki/From_the_Founding_of_the_City/Book_26"
      },
      {
        "category": "literary",
        "title": "The Persians, Aeschylus (472 BC) — a distant catastrophe whose ruin drifts all the way home to the imperial capital.",
        "excerpt": "In heaps the unhappy dead lie on the strand\nOf Salamis, and all the neighbouring shores.",
        "source": "Wikisource (Aeschylus, trans. Robert Potter)",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Aeschylus_(Potter)/Persians"
      },
      {
        "category": "literary",
        "title": "War and Peace (Book 11), Leo Tolstoy (1869) — the great city of the enemy heartland ablaze, and no one able to say who lit it.",
        "excerpt": "Moscow was burned because it found itself in a position in which any town built of wood was bound to burn, quite apart from whether it had, or had not, a hundred and thirty inferior fire engines. Deserted Moscow had to burn as inevitably as a heap of shavings has to burn on which sparks continually fall for several days.",
        "source": "Wikisource (Tolstoy, trans. Louise and Aylmer Maude)",
        "href": "https://en.wikisource.org/wiki/War_and_Peace_(Tolstoy)/Book_11/Chapter_26"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons, J. M. W. Turner (1835) — the seat of power engulfed, its fire doubled on the water.",
        "excerpt": "Turner paints the October 1834 night the Palace of Westminster went up in flames, the fire roaring skyward while the Thames turns to molten gold beneath it. The dark crowd massed on the bridge is a helpless smear against a furnace that seems to swallow the very heart of the nation's power. It is the sublime terror of watching an institution thought untouchable reduced, in a matter of hours, to a wall of fire.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ukraine-drones-st-petersburg-oil-terminal--art.png",
          "alt": "The Burning of the Houses of Lords and Commons, J. M. W. Turner (1835)",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Year 1812, Festival Overture, Op. 49, Pyotr Tchaikovsky (1880) — Russia's own anthem of invasion and fire, now turned inside out.",
        "excerpt": "Tchaikovsky scored the French army's march on Moscow and its fiery repulse with actual cannon fire, the Marseillaise dissolving beneath Russian hymns and the roar of artillery. Composed to celebrate the homeland saved from the invader, its thunder now reads with grim irony as flames climb Russia's own fuel terminals near Peter's city. The overture's collision of anthems and explosions is the very sound of war arriving where it was never supposed to reach.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      }
    ],
    "rank": 3
  },
  {
    "slug": "germany-protests-against-afd",
    "headline": "About 15,000 protesters block roads to the AfD party conference in Erfurt",
    "overview": "Around 15,000 demonstrators blocked roads leading to the far-right Alternative for Germany's annual conference in the eastern city of Erfurt on Saturday, as unions, civil-society groups and left-wing parties sought to disrupt the two-day meeting. Riot police drafted in from across the country cleared protesters who sat in rows across highways. The gathering, where co-leaders Alice Weidel and Tino Chrupalla are expected to be re-elected, comes before regional elections the AfD hopes to win.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxNSDF2ZkFFUHEyZnpvN3FqZ2QxbV83T1h2RUxZc3p2Um5YeG1GMlBKOXlhUEZ6VzNtc1BqekVGVzVESFhNRk1zcVRmdDV1UDRRVDMtT2lOWEp6T2czM1VpUEVwSUFCdFhwLWtsMmlIT3hxZzNLZGtrazlrRXVGVVQtY0tiT1hsc3dvZUVod1k2NVdmY2c?oc=5"
      },
      {
        "name": "Yahoo News (dpa)",
        "href": "https://www.yahoo.com/news/world/articles/major-protests-accompany-convention-germanys-040446598.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/germany-protests-against-afd.png",
      "alt": "A large nighttime crowd fills a rain-slicked square in Hannover, umbrellas raised and flags flying, at a demonstration against cooperation between the CDU and the far-right AfD",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Declaration of the Rights of Man and of the Citizen (1789) — the founding cry of a people who toppled a tyranny to declare that rights belong to everyone, not to any strongman.",
        "excerpt": "Men are born and remain free and equal in rights. Social distinctions may be founded only upon the general good.",
        "source": "The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/18th_century/rightsof.asp"
      },
      {
        "category": "historical",
        "title": "What to the Slave Is the Fourth of July?, Frederick Douglass (1852) — a lone voice indicting a nation on its own holiday, insisting liberty is a mockery while any are in chains.",
        "excerpt": "This Fourth of July is yours, not mine. You may rejoice, I must mourn.",
        "source": "Frederick Douglass, My Bondage and My Freedom (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/202"
      },
      {
        "category": "literary",
        "title": "The Mask of Anarchy, Percy Bysshe Shelley (1819) — written in fury after the Peterloo massacre, the poem that taught a crowd to see itself as the many who outnumber the few.",
        "excerpt": "Rise like Lions after slumber\nIn unvanquishable number—\nShake your chains to earth like dew\nWhich in sleep had fallen on you—\nYe are many—they are few.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/The_Mask_of_Anarchy"
      },
      {
        "category": "literary",
        "title": "Europe, The 72d and 73d Years of These States, Walt Whitman (1856) — the people erupting from servitude to seize the throats of kings.",
        "excerpt": "Suddenly out of its stale and drowsy lair, the lair of slaves,\nLike lightning it le’pt forth half startled at itself,\nIts feet upon the ashes and the rags, its hands tight to the throats of kings.",
        "source": "Walt Whitman, Leaves of Grass (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/1322"
      },
      {
        "category": "artistic",
        "title": "Liberty Leading the People, Eugène Delacroix (1830) — the people, armed and mingled across every class, surging over the barricades behind Liberty herself.",
        "excerpt": "Liberty strides over the rubble of the barricade, the tricolour raised in one hand and a musket in the other, her gaze fixed forward. Behind her a ragged crowd climbs up out of the powder smoke—a top-hatted bourgeois, a boy brandishing pistols, a worker with a sabre—the whole people fused into a single advancing mass. Delacroix painted the July Revolution not as a battle of armies but as an uprising of ordinary Parisians who would no longer be ruled by a king who had betrayed them.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/germany-protests-against-afd--art.png",
          "alt": "Liberty Leading the People, Eugène Delacroix (1830)",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "La Marseillaise, Claude-Joseph Rouget de Lisle (1792) — the citizens' war-hymn that became the enduring anthem of a people marching against tyrants.",
        "excerpt": "Written overnight in Strasbourg in 1792, its urgent rising phrase—'Allons enfants de la Patrie'—summons the whole citizenry to stand against the tyrant's advancing ranks. The melody climbs like a gathering crowd, each verse swelling into the defiant refrain 'Aux armes, citoyens!' Carried by the Marseille volunteers as they marched on Paris, it has sounded ever since wherever ordinary people rise against those who would rule them by force.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/La_Marseillaise_(Rouget_de_Lisle,_Claude-Joseph)"
      }
    ],
    "rank": 4
  },
  {
    "slug": "mali-insurgent-attacks-army",
    "headline": "Insurgents stage simultaneous attacks on towns across Mali, the army says",
    "overview": "Fighters staged simultaneous attacks on at least five locations across northern and central Mali early Saturday, the army said, striking a northern town where Malian and Russian forces are based and a garrison near Gao. The Tuareg-led Azawad Liberation Front said it took part; in April it joined the al-Qaeda affiliate JNIM in a coordinated assault that reached Bamako's airport and killed the defense minister. Gunfire and rocket fire targeted a military camp in Gao before dawn.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxQYzJYTlVRQU9wendfWlIzeEhIckRDS2RtS0FNenV6TlFkeTdPYW50UEE0RGlhRFhzWUhrTGRQMHRCUmIybzd0bHZYdEgyajFpX180THBfTFpQemFNSzQtSkliMDZVVDBVblBaVC03X1dJUjdUeGgtdEZlLUdvT1RPWFRaWWJIdlNBbnZuT2lPdXZqbFVCbjA1cFFrVVpYd21HTUZtN0Z0bWtlNEVLUDdnNDlpeHM2Zw?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/4/armed-fighters-attack-multiple-towns-across-mali"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/mali-insurgent-attacks-army.png",
      "alt": "Malian soldiers stand beside a military vehicle during a field exercise near Bamako, Mali.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Commentaries on the Gallic War, Book VII, Julius Caesar (c. 52 BC) — why it rhymes: a subject land rises in a single, prearranged instant, the signal of revolt racing from town to town, mirroring insurgents striking five Malian towns at once.",
        "excerpt": "The report is quickly spread among all the states of Gaul; for, whenever a more important and remarkable event takes place, they transmit the intelligence through their lands and districts by a shout; the others take it up in succession, and pass it to their neighbours",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/10657/pg10657.txt"
      },
      {
        "category": "historical",
        "title": "The History, Book IV (Melpomene), Herodotus (c. 430 BC) — why it rhymes: the Scythians, mounted raiders with no fixed towns to defend, prove impossible to pin down or subdue, the enduring dilemma of fighting mobile desert-and-steppe insurgents like Mali's FLA and JNIM.",
        "excerpt": "for they who have neither cities founded nor walls built, but all carry their houses with them and are mounted archers, living not by the plough but by cattle, and whose dwellings are upon cars, these assuredly are invincible and impossible to approach.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "literary",
        "title": "The Ballad of East and West, Rudyard Kipling (1889) — why it rhymes: a border raider slips out with an armed band to plunder the frontier before dawn, the timeless choreography of the pre-dawn raid across a contested land.",
        "excerpt": "Kamal is out with twenty men to raise the Border-side, / And he has lifted the Colonel's mare that is the Colonel's pride: / He has lifted her out of the stable-door between the dawn and the day, / And turned the calkins upon her feet, and ridden her far away.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2334/pg2334.txt"
      },
      {
        "category": "literary",
        "title": "The Second Coming, W. B. Yeats (1920) — why it rhymes: a centre that cannot hold as anarchy is loosed upon the land captures a Malian state besieged on many fronts, its authority failing to keep order.",
        "excerpt": "Turning and turning in the widening gyre / The falcon cannot hear the falconer; / Things fall apart; the centre cannot hold; / Mere anarchy is loosed upon the world, / The blood-dimmed tide is loosed, and everywhere / The ceremony of innocence is drowned;",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Second_Coming_(Yeats)"
      },
      {
        "category": "artistic",
        "title": "The Capture of the Smala of Abd-el-Kader at Taguin, Horace Vernet (1844) — why it rhymes: a sprawling desert encampment overrun in a lightning raid, the same North African frontier warfare of sudden assault and flight now playing out across Mali's towns.",
        "excerpt": "Vernet's colossal canvas unfurls a chaotic dawn raid across the Algerian desert, French cavalry crashing into Abd-el-Kader's mobile camp as robed fighters, women, horses and camels scatter in panic. The eye is swept along a churning frontier of dust, banners and gunfire that stretches to the horizon. It renders the Sahel-and-Sahara style of war — the swift strike on a settlement, the rout, the raiders vanishing into open country — that Mali's insurgents still wage today.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Prise_de_la_smalah_d_Abd-El-Kader_a_Taguin_16_mai_1843_Horace_Vernet.jpg",
        "image": {
          "src": "/covers/mali-insurgent-attacks-army--art.png",
          "alt": "The Capture of the Smala of Abd-el-Kader at Taguin, Horace Vernet (1844)",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In the Steppes of Central Asia, Alexander Borodin (1880) — why it rhymes: a caravan crossing a vast, hostile desert under armed guard, the fragile passage of order through nomad-raided frontier country that Mali's contested north evokes.",
        "excerpt": "Borodin's symphonic sketch opens on a held high violin note like heat-haze over empty sand, then threads a plaintive Eastern melody against a Russian marching tune as a guarded caravan winds across the endless steppe. The two themes overlap and recede, evoking a militarised escort inching through wide, lawless desert country. It conjures exactly the tense frontier expanse — open, raided and never fully controlled — that defines the war in Mali's Sahara and Sahel.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/In_the_Steppes_of_Central_Asia_(Borodin,_Aleksandr)"
      }
    ],
    "rank": 5
  },
  {
    "slug": "great-barrier-reef-unesco-danger-list",
    "headline": "Australia welcomes draft UNESCO decision to keep the Great Barrier Reef off the 'in danger' list",
    "overview": "Australia welcomed a draft decision by UNESCO's World Heritage Committee not to place the Great Barrier Reef on its list of sites 'in danger,' even as the UN body voiced 'utmost concern' over the reef's slow recovery from repeated mass coral bleaching. UN scientists had previously recommended the listing; Canberra has lobbied for years to avoid it, citing tourism that draws more than two million visitors and over A$9 billion a year. The world's largest reef has endured five summers of mass bleaching since 2016, and the draft heads to the committee's session in Busan later this month.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0wFBVV95cUxPa1FtNENMZWowSGhyTGtDbHZheDJWQ3llSjZFTWVPMkd3V0J1WW9Ja3VpRGZzdEZGLUdRRThkT3l2OU9zM0p5Q3VubUp1ZE10eE15VnF4d3hIUEozcGtEYzNMb2VFcHlGQ0VRXzVTM0stMWRIMXpWUzEwdTF2T09nTGExXzRXYjZ1bnVzRkN5QXlGVjFhalV6QVJhV1hNR2NhYzh2WG1tOGxDdFBxeGRFSjRlSVltSE1HZk50LURjejJ6dWNra2p2SWZ3N3JaV2wwaklR?oc=5"
      },
      {
        "name": "The Daily Advertiser (Australian Associated Press)",
        "href": "https://www.dailyadvertiser.com.au/story/9304564/reef-again-avoids-in-danger-world-heritage-listing/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/great-barrier-reef-unesco-danger-list.png",
      "alt": "Densely packed hard and soft corals in vivid browns, greens and blues on the Great Barrier Reef near Michaelmas Reef, Queensland.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Voyage of the Beagle, Charles Darwin (1839) — tiny coral architects out-building the ocean's fury, the fragile wonder that endures against overwhelming odds.",
        "excerpt": "Let the hurricane tear up its thousand huge fragments; yet what will that tell against the accumulated labour of myriads of architects at work night and day, month after month?",
        "source": "Standard Ebooks",
        "href": "https://standardebooks.org/ebooks/charles-darwin/the-voyage-of-the-beagle/text/chapter-20"
      },
      {
        "category": "historical",
        "title": "Man and Nature, George Perkins Marsh (1864) — the first great warning that humanity's tread turns the harmonies of nature to discord, a caution long unheeded.",
        "excerpt": "Man is everywhere a disturbing agent. Wherever he plants his foot, the harmonies of nature are turned to discords.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/37957/37957-h/37957-h.htm"
      },
      {
        "category": "literary",
        "title": "The Rime of the Ancient Mariner, Samuel Taylor Coleridge (1798) — the sea's living beauty blessed unaware, and the long reckoning that trails a wonder unregarded.",
        "excerpt": "O happy living things! no tongue / Their beauty might declare: / A spring of love gushed from my heart, / And I blessed them unaware:",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "literary",
        "title": "Twenty Thousand Leagues Under the Sea, Jules Verne (1870) — the shimmering coral kingdom beneath the waves, a fragile submarine Eden of colour and light.",
        "excerpt": "The light produced a thousand charming varieties, playing in the midst of the branches that were so vividly colored. I seemed to see the membranous and cylindrical tubes tremble beneath the undulation of the waters.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Works_of_Jules_Verne/Twenty_Thousand_Leagues_Under_the_Sea/Chapter_23"
      },
      {
        "category": "artistic",
        "title": "The Great Wave off Kanagawa, Katsushika Hokusai (c.1831) — the sea's sublime, beautiful menace towering over fragile human vessels.",
        "excerpt": "Hokusai's woodblock print pits a colossal, claw-like wave against three slender fishing boats, its foam breaking into grasping fingers while Mount Fuji shrinks to a distant hummock. It is the ocean as both ravishing beauty and mortal peril—the same double edge that a bleaching reef presents. The tiny mariners survive this instant, but the wave hangs poised at its crest, a reprieve that could end at any moment.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/great-barrier-reef-unesco-danger-list--art.png",
          "alt": "The Great Wave off Kanagawa, Katsushika Hokusai (c.1831)",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "La Mer, Claude Debussy (1905) — the ocean rendered in sound, majestic and restless, a natural wonder that dwarfs and enthralls the listener.",
        "excerpt": "Debussy's three symphonic sketches conjure the sea from the first glimmer of dawn through the play of waves to the dialogue of wind and water, all shimmering strings, swelling brass and iridescent colour. The ocean it paints is alive, vast and indifferent—beauty and power made inseparable. Like the reef itself, its splendour cannot be prised apart from its immensity and its danger.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/La_mer_(Debussy,_Claude)"
      }
    ],
    "rank": 6
  },
  {
    "slug": "brazil-lula-bolsonaro-tariff-clash",
    "headline": "Brazil's Lula and Flavio Bolsonaro clash over a proposed 25% US tariff",
    "overview": "Brazil's President Luiz Inacio Lula da Silva and his rival Senator Flavio Bolsonaro clashed over Washington's proposed 25% tariff on Brazilian goods, a flashpoint before October's election. Flavio filed an 86-page submission asking the US trade office to delay the tariffs by 180 days; Lula branded it 'yet another act of treason against the fatherland' and accused the Bolsonaro family of 'sellout policies.' Both front-runners are betting that voters will judge them on how they handle the deeply unpopular tariffs.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOeE9rUUZsRURfR0l3d2hVUU9Gem5fbmc3NWFjYjRBZndFY2lVV1BUZHNWV0VDQmJMdGZKOFdiSmJJbTVlWGtkdG5GYVpiaklxaFBQM0NXcEpuSUJ0OUV6NWNMeGN3Xzl4RUpkRjJKRjRwWi1wbFplc19DM1RRbjdXbzBhODgxbV9LNnpudmE5aE5wUFk?oc=5"
      },
      {
        "name": "The Rio Times",
        "href": "https://www.riotimesonline.com/flavio-bolsonaro-ustr-tariff-delay-180-days-election-2026/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/brazil-lula-bolsonaro-tariff-clash.png",
      "alt": "A large container ship berthed alongside stacked shipping containers at the SBSA TECON terminal in the Port of Santos, Brazil",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Wealth of Nations, Adam Smith (1776) — the founding case that a tariff wall enriches a protected few while the nation pays.",
        "excerpt": "By restraining, either by high duties, or by absolute prohibitions, the importation of such goods from foreign countries as can be produced at home, the monopoly of the home market is more or less secured to the domestic industry employed in producing them.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Wealth_of_Nations/Book_IV/Chapter_2"
      },
      {
        "category": "historical",
        "title": "Report on the Subject of Manufactures, Alexander Hamilton (1791) — a founder argues a nation must produce its own essentials or bow to foreign power.",
        "excerpt": "Every nation, with a view to those great objects, ought to endeavour to possess within itself all the essentials of national supply.",
        "source": "Pepperdine School of Public Policy (Hamilton, Report on Manufactures, 1791)",
        "href": "https://publicpolicy.pepperdine.edu/academics/research/faculty-research/intellectual-foundations/early-american/ahrepman.htm"
      },
      {
        "category": "literary",
        "title": "Coriolanus, William Shakespeare (c. 1608) — a hungry people rages that the powerful hoard the nation's grain while rival leaders wrestle for its loyalty.",
        "excerpt": "They ne'er cared for us yet: suffer us to famish, and their store-houses crammed with grain; make edicts for usury, to support usurers",
        "source": "The Complete Works of William Shakespeare (MIT)",
        "href": "http://shakespeare.mit.edu/coriolanus/full.html"
      },
      {
        "category": "literary",
        "title": "The Candlemakers' Petition, Frederic Bastiat (1845) — a satire skewering the protectionist demand to shut out a cheaper foreign rival.",
        "excerpt": "We are subjected to the intolerable competition of a foreign rival, who enjoys, it would seem, such superior facilities for the production of light, that he is enabled to inundate our national market at so exceedingly reduced a price, that, the moment he makes his appearance, he draws off all custom from us",
        "source": "Bastiat, Economic Sophisms (monadnock.net)",
        "href": "https://monadnock.net/bastiat/petition.html"
      },
      {
        "category": "artistic",
        "title": "Cicero Denounces Catiline, Cesare Maccari (1889) — rival statesmen face off before the Senate over the very survival of the republic.",
        "excerpt": "In the marbled hush of the Roman Senate, Cicero rises with an outstretched arm and thunders his accusation, every senator's gaze bent toward him. On the far bench sits Catiline, shunned and alone, his defiance curdling into isolation. The fresco freezes the instant a nation's course is settled not by armies but by two men quarreling over loyalty and betrayal.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Cicero_Denounces_Catiline_in_the_Roman_Senate_by_Cesare_Maccari_-_3.jpg",
        "image": {
          "src": "/covers/brazil-lula-bolsonaro-tariff-clash--art.png",
          "alt": "Cicero Denounces Catiline, Cesare Maccari (1889)",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Nabucco, Giuseppe Verdi (1842) — an enslaved nation's chorus that became an anthem of homeland and sovereignty against foreign rule.",
        "excerpt": "In 'Va, pensiero,' the captive Hebrews lift a single soaring melody toward the homeland torn from them, longing on golden wings for the banks of the Jordan. Verdi's exiles sing not of vengeance but of a people's memory of itself, and nineteenth-century Italians heard in it their own yearning to be free of a foreign yoke. The chorus swells from hushed unison to full-throated defiance, the sound of a nation refusing to surrender its identity.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 7
  },
  {
    "slug": "colombia-beat-ghana-world-cup",
    "headline": "Colombia beat Ghana 1-0 to reach the World Cup round of 16",
    "overview": "Jhon Arias struck in the 14th minute, finishing a cross from Luis Suarez, as Colombia beat Ghana 1-0 at Arrowhead Stadium in Kansas City to reach the World Cup round of 16. The result completed the last-16 field and ended Ghana's campaign. Colombia will next face Switzerland on Tuesday in Vancouver.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPQ2U2M1EteWgyV0lkOFBVbVd4cWt6WHpCZzJ6dFZ0Z0FWX3gxQkZUMnh2dVBTWDZxeE4wLWVqTU9lNEhNTnVMVGFpTnFVbkJVcUY4elFOLW9rcFNUWU1SRmIyRHRsNFQ5YUV4QkdKdFpQSFh6aFlsQUdabkNlcTdjSGZDS2FMbW1jNEw3UmVSQnV5a2IxRHRKSENETTk4Y01XZ1Fz?oc=5"
      },
      {
        "name": "ESPN",
        "href": "https://www.espn.com/soccer/story/_/id/49262158/colombia-ghana-live-world-cup-2026-latest-updates-commentary-score-result"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/colombia-beat-ghana-world-cup.png",
      "alt": "Colombia's players celebrate after their 1-0 World Cup round-of-32 win over Ghana",
      "credit": "ESPN"
    },
    "edition": "Afternoon Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The History, Herodotus (c. 430 BC) — a contest whose only prize is honour, exactly the currency of a knockout tie.",
        "excerpt": "They told them that the Hellenes were keeping the Olympic festival and were looking on at a contest of athletics and horsemanship. He then inquired again, what was the prize proposed to them, for the sake of which they contended; and they told them of the wreath of olive which is given. Then Tigranes the son of Artabanos uttered a thought which was most noble... \"Ah! Mardonios, what kind of men are these against whom thou hast brought us to fight, who make their contest not for money but for honour!\"",
        "source": "Project Gutenberg (Herodotus, trans. G. C. Macaulay)",
        "href": "https://www.gutenberg.org/cache/epub/2456/pg2456.txt"
      },
      {
        "category": "historical",
        "title": "Life of Titus Flamininus, Plutarch (c. AD 100) — a crowd at the games erupting in a joy loud enough to fell birds from the sky.",
        "excerpt": "such a shout was raised that it was heard as far as the sea coast, and all the spectators rose from their seats, caring nothing more for the games, but rushing with one accord to greet, with transports of delight, the saviour and protector of Greece. On this occasion was observed what is often mentioned as an example of the power of human voices; some crows, which were flying over the racecourse at that moment, fell down among the people.",
        "source": "Project Gutenberg (Plutarch's Lives, trans. Aubrey Stewart & George Long)",
        "href": "https://www.gutenberg.org/cache/epub/14114/pg14114.txt"
      },
      {
        "category": "literary",
        "title": "The Iliad, Homer (c. 8th c. BC) — the foot-race won by a single stride, a margin as narrow as a 1-0.",
        "excerpt": "the son of Oileus took the lead at once, with Ulysses as close behind him as the shuttle is to a woman's bosom when she throws the woof across the warp and holds it close up to her; even so close behind him was Ulysses--treading in his footprints before the dust could settle there, and Ajax could feel his breath on the back of his head as he ran swiftly on... Ulysses therefore carried off the mixing-bowl, for he got before Ajax and came in first.",
        "source": "Project Gutenberg (Homer, The Iliad, trans. Samuel Butler)",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt"
      },
      {
        "category": "literary",
        "title": "The Extant Odes of Pindar, Olympian I (c. 472 BC) — the champion's reward, a sweet calm that lasts a lifetime.",
        "excerpt": "so neither shall we find any games greater than the Olympic whereof to utter our voice: for hence cometh the glorious hymn and entereth into the minds of the skilled in song... but he that overcometh hath for the sake of those games a sweet tranquillity throughout his life for evermore.",
        "source": "Project Gutenberg (Pindar, trans. Ernest Myers)",
        "href": "https://www.gutenberg.org/cache/epub/10717/pg10717.txt"
      },
      {
        "category": "artistic",
        "title": "Panathenaic prize amphora, Euphiletos Painter (c. 530 BC) — sprinters locked stride for stride, the antique image of a race won by inches.",
        "excerpt": "Five nude runners surge across the black-figure vase, bodies overlapping so tightly that only a single leading stride separates first from last. Awarded, filled with sacred olive oil, to the fastest man at Athens's games, it makes the narrow athletic victory tangible in glossy clay. The winning body pulls fractionally clear, the margin of a lone decisive goal frozen in silhouette.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Panathenaic_amphora_attributed_to_the_Euphiletos_Painter,_Met_14.130.12.JPG",
        "image": {
          "src": "/covers/colombia-beat-ghana-world-cup--art.png",
          "alt": "Panathenaic prize amphora, Euphiletos Painter (c. 530 BC)",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Aida, Giuseppe Verdi (1871) — the Triumphal March, brass blazing for a returning conqueror.",
        "excerpt": "Verdi's Act II Grand March lifts long silver trumpets over a swelling chorus as the victorious army parades home to public rapture. Its rising fanfares are the sound of a nation greeting its heroes, the exultation of a knockout win made audible. From a slender advance the music builds to overwhelming, unstoppable jubilation, one moment of triumph amplified into collective ecstasy.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/A%C3%AFda_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 8
  },
  {
    "slug": "india-eggs-school-lunch-row",
    "headline": "West Bengal plan to drop eggs from school lunches ignites a nutrition row in India",
    "overview": "A plan in the Indian state of West Bengal to replace eggs with vegetarian food in government school lunches has ignited a national row over child nutrition, religion and caste. The state's new BJP government handed meal preparation for some Kolkata schools to the Hare Krishna group ISKCON, whose foundation serves only vegetarian food and would swap eggs for paneer, soya and pulses. Nutrition campaigners warn that eggs are one of the cheapest sources of protein for millions of poor children who rely on the midday-meal scheme.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c33yldyd62po?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/1/indias-bengal-drops-eggs-from-school-lunches-why-thats-stoking-debate"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/india-eggs-school-lunch-row.png",
      "alt": "A hard-boiled egg sliced in half, its two halves resting in a bright yellow bowl.",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Leviticus 11, Hebrew Bible (King James Version, 1611) - the oldest surviving rulebook of what a people may and may not eat.",
        "excerpt": "These are the beasts which ye shall eat among all the beasts that are on the earth. Whatsoever parteth the hoof, and is clovenfooted, and cheweth the cud, among the beasts, that shall ye eat.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Leviticus"
      },
      {
        "category": "historical",
        "title": "The Histories, Book II, Herodotus (c. 430 BC) - a priesthood that defines its holiness by the foods it will not touch.",
        "excerpt": "The pig is regarded among them as an unclean animal, so much so that if a man in passing accidentally touch a pig, he instantly hurries to the river, and plunges in with all his clothes on.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_2"
      },
      {
        "category": "literary",
        "title": "Oliver Twist, Charles Dickens (1838) - a starving child dares to ask the institution that feeds him for more.",
        "excerpt": "He rose from the table; and advancing to the master, basin and spoon in hand, said: somewhat alarmed at his own temerity: \"Please, sir, I want some more.\"",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/730/730-h/730-h.htm"
      },
      {
        "category": "literary",
        "title": "The Book of Daniel, chapter 1 (King James Version, 1611) - youths who ask to be fed vegetables and water instead of the king's rich fare.",
        "excerpt": "Prove thy servants, I beseech thee, ten days; and let them give us pulse to eat, and water to drink.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Daniel"
      },
      {
        "category": "artistic",
        "title": "An Old Woman Cooking Eggs, Diego Velazquez (1618) - two humble eggs lifted to the dignity of sacred still life.",
        "excerpt": "In candlelit chiaroscuro a poor Sevillian woman poaches eggs in an earthenware pan while a boy holds a melon and flask, the whole gravity of the picture resting on two cheap eggs. Velazquez insists the humblest protein of the poor is worth monumental attention, the same egg now being taken from millions of children's bowls.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Diego_Vel%C3%A1zquez_-_An_Old_Woman_Cooking_Eggs_-_NG_2180_-_National_Galleries_of_Scotland.jpg",
        "image": {
          "src": "/covers/india-eggs-school-lunch-row--art.png",
          "alt": "An Old Woman Cooking Eggs, Diego Velazquez (1618) - two humble eggs lifted to the dignity of sacred still life.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Roast Beef of Old England, Richard Leveridge (c. 1735) - a whole nation bellowing its dinner as its identity.",
        "excerpt": "Leveridge's rollicking ballad turns a single dish into a patriotic anthem, roast beef standing in for English manhood and virtue against foreign 'effeminate' cookery. It is the eighteenth-century echo of a Bengali insisting that fish and eggs are not just food but who they are, exactly the cultural nerve the midday-meal ban touches.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/The_Roast_Beef_of_Old_England_(Leveridge,_Richard)"
      }
    ],
    "rank": 9
  },
  {
    "slug": "us-small-business-summer-travel",
    "headline": "US small businesses report a strong summer as Americans travel closer to home",
    "overview": "Small businesses across the United States say they are enjoying a strong summer as high airfares and gas prices push more Americans to vacation closer to home, the Associated Press reported. Local shops, diners and attractions in places like Asheville and Kansas City are benefiting, with AAA estimating a record of more than 72 million holiday travelers. Owners also cited a lift from World Cup crowds and the country's 250th-anniversary events.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxNSVVDWUhmWnl3N2Nyel9IUFc0bm9EMFp5NFFnOWJqdmNzNVdqclREM0hNYS1nbUllRUNyVUVmMFhxTjVVeWNOMEV6WmNLRmxPNGxYN2M2RkJGQ09tR0hWd2dPQ1d3NlNBZjI5MFNSRHZGSVFnaVZrZXlVZUotbTRJdXZEa0dMeDJPQzdRMFE4MW12dkRZUTZhU1haeHpGTlE?oc=5"
      },
      {
        "name": "The Boston Globe",
        "href": "https://www.bostonglobe.com/2026/07/04/business/businesses-having-good-summer-as-americans-travel-closer-to-home/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/us-small-business-summer-travel.png",
      "alt": "Made in Kansas City owner Keith Bradley in his shop, where he has seen customer increases as soccer fans visit for FIFA World Cup games.",
      "credit": "AP Photo/Charlie Riedel"
    },
    "edition": "Afternoon Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Wealth of Nations, Adam Smith (1776) — the butcher, brewer and baker whose self-interested trade feeds a town, the classic portrait of main-street commerce that keeps money circulating close to home",
        "excerpt": "It is not from the benevolence of the butcher, the brewer, or the baker that we expect our dinner, but from their regard to their own interest. We address ourselves, not to their humanity, but to their self-love, and never talk to them of our own necessities, but of their advantages.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3300/3300-h/3300-h.htm"
      },
      {
        "category": "historical",
        "title": "The Way to Wealth, Benjamin Franklin (1758) — Poor Richard's gospel of thrift and modest prosperity, the small trader's creed of watching the pennies that now sends vacation budgets to local shops instead of distant airfares",
        "excerpt": "Beware of little expences; 'A small leak will sink a great ship,' as Poor Richard says … 'For age and want save while you may, / No morning sun lasts a whole day.'",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/43855/43855-h/43855-h.htm"
      },
      {
        "category": "literary",
        "title": "Walden, Henry David Thoreau (1854) — a wry hymn to staying put and finding the whole world in one's own township, the pleasures of the near that draw travelers home to Concord's shops and fields",
        "excerpt": "I have travelled a good deal in Concord; and everywhere, in shops, and offices, and fields, the inhabitants have appeared to me to be doing penance in a thousand remarkable ways.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/205/205-h/205-h.htm"
      },
      {
        "category": "literary",
        "title": "Candide, Voltaire (1759) — after chasing the wide world's wonders, the hero settles for tending a small plot near home, the final wisdom that modest, close-at-hand labor is where contentment lies",
        "excerpt": "\"Work then without disputing,\" said Martin; \"it is the only way to render life supportable.\" … \"Excellently observed,\" answered Candide; \"but let us take care of our garden.\"",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Candide/Chapter_30"
      },
      {
        "category": "artistic",
        "title": "A Goldsmith in His Shop, Petrus Christus (1449) — the archetypal small trader at his counter, weighing wares for customers, the timeless dignity of the neighborhood shopkeeper serving those who come to his door",
        "excerpt": "Behind a counter heaped with rings, girdles, coral and coin, a red-robed goldsmith calmly balances a gold scale while a finely dressed couple leans in to complete their purchase. Every object gleams with the merchant's stock-in-trade, and a convex mirror at the edge reveals two more figures passing in the street outside the shop. Painted five centuries ago, it is the enduring image of the small proprietor whose whole world is the transaction across his counter.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:A_Goldsmith_in_his_Shop_MET_DT711.jpg",
        "image": {
          "src": "/covers/us-small-business-summer-travel--art.png",
          "alt": "A Goldsmith in His Shop, Petrus Christus (1449)",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Home! Sweet Home!, Henry Rowley Bishop (1823) — the tender parlor ballad that made 'there's no place like home' a household phrase, the sentiment behind Americans forgoing far-off shores to savor the pleasures near at hand",
        "excerpt": "Bishop's gentle melody, written for the opera Clari, or the Maid of Milan with John Howard Payne's words, swells around the refrain 'Home, home, sweet, sweet home; there's no place like home.' Its simple, homely tune became one of the most sung songs of the nineteenth century, carried in parlors and on battlefields alike. It is the musical embodiment of the near and familiar cherished over the grand and distant, the very impulse now filling main-street shops.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Home,_Sweet_Home_(Bishop,_Henry_Rowley)"
      }
    ],
    "rank": 10
  },
  {
    "slug": "autism-africa-guinea-mother",
    "headline": "Autism remains widely misunderstood across parts of Africa, where a Guinean mother fights for her son",
    "overview": "Autism is still widely misunderstood in parts of Africa, where stigma, myths and a shortage of specialists leave families to cope largely on their own, the Associated Press reported, following Kadiatou Diallo and her son Kazaliou Balde in Fria, Guinea. After years of amulets from traditional healers, the boy was finally diagnosed in the capital, Conakry, even as neighbors urged the family to abandon him. Advocates say diagnosis and services lag far behind need across much of the continent.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikAFBVV95cUxNLXo2bEtoS1BZbXhBa296ODBrTDhibjFzLURQaENsdEpDazFjZE9ubkFhaTE3OGhFNXIwU2dMcmw2UHA4R2FTRjl5bmZsZ0l1VHRwRWRSNDgzSG5XRFFJRFduMlo4SE5MOVFBZEdISU03aUxTbUZoejVxaTJOaUpEejNSY2hVb18tR3Z3TFlEVUQ?oc=5"
      },
      {
        "name": "WRAL",
        "href": "https://www.wral.com/news/ap/ffb21-autism-remains-widely-misunderstood-in-parts-of-africa-a-mother-in-guinea-fights-for-her-child/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/autism-africa-guinea-mother.png",
      "alt": "Houssainatou Diallo, right, an advocate and communicator dedicated to supporting children with autism, spends time with Kazaliou Balde, an autistic child in Fria, Guinea, Saturday, May 16, 2026.",
      "credit": "AP Photo/Fode Toure"
    },
    "edition": "Afternoon Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Gospel of Matthew, attributed to Matthew the Evangelist (c. 80 CE) — a foreign mother's relentless plea for a child the crowd would send away.",
        "excerpt": "And, behold, a woman of Canaan came out of the same coasts, and cried unto him, saying, Have mercy on me, O Lord, thou son of David; my daughter is grievously vexed with a devil. ... And she said, Truth, Lord: yet the dogs eat of the crumbs which fall from their masters' table. Then Jesus answered and said unto her, O woman, great is thy faith: be it unto thee even as thou wilt.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "historical",
        "title": "The Story of My Life, Helen Keller (1903) — a mind sealed in silence and darkness, freed by one teacher's patient devotion.",
        "excerpt": "Suddenly I felt a misty consciousness as of something forgotten—a thrill of returning thought; and somehow the mystery of language was revealed to me. ... That living word awakened my soul, gave it light, hope, joy, set it free!",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2397/2397-h/2397-h.htm"
      },
      {
        "category": "literary",
        "title": "The Idiot Boy, William Wordsworth (1798) — a mother's unashamed, overflowing love for the son others dismiss as simple.",
        "excerpt": "She kisses o'er and o'er again,\nHim whom she loves, her idiot boy,",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Lyrical_Ballads_(1798)/The_Idiot_Boy"
      },
      {
        "category": "literary",
        "title": "The Ugly Duckling, Hans Christian Andersen (1843) — the different creature pecked and driven out, only later understood for what it truly is.",
        "excerpt": "The poor little duckling, who had come last out of its egg-shell, and who was so ugly, was bitten, pecked, and teased by both ducks and hens. ... It matters not to have been born in a duck-yard, if one has been hatched from a swan's egg.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Hans_Andersen's_fairy_tales_(Robinson)/The_Ugly_Duckling"
      },
      {
        "category": "artistic",
        "title": "Madonna della Seggiola, Raphael (1513–1514) — arms that fold a child wholly in against the whole world.",
        "excerpt": "Raphael gathers mother and child into a single warm circle, the Madonna's cheek pressed to her son as her arms wrap him completely against her body. The tondo's round frame echoes that encircling embrace, so the very shape of the picture becomes an act of protection. It is a mother's devotion rendered as gravity — she will not let the world pry her child loose.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Raphael_Madonna_della_seggiola.jpg",
        "image": {
          "src": "/covers/autism-africa-guinea-mother--art.png",
          "alt": "Madonna della Seggiola, Raphael (1513–1514)",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wiegenlied, Op. 49 No. 4, Johannes Brahms (1868) — the fierce tenderness a mother pours out over a sleeping child.",
        "excerpt": "Brahms's cradle song sways on a gentle rocking figure, the melody swinging like a hand on a cradle. Written to greet a friend's newborn, it distills a mother's nightly vigil into a handful of tender bars. Beneath the sweetness runs the ordinary, unbreakable promise of every lullaby: sleep, I am here, you are safe.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/5_Lieder,_Op.49_(Brahms,_Johannes)"
      }
    ],
    "rank": 11
  },
  {
    "slug": "kenya-rural-school-closures",
    "headline": "Falling enrolment empties rural schools across Kenya",
    "overview": "Schools across rural Kenya are closing or standing near-empty as falling enrolment drains the countryside of pupils, the BBC reported. At Kaliluni Primary School in Kitui county, which had more than 200 children three years ago, only five pupils remain, and on the day reporters visited even they and the lone teacher were absent. Kenya has set a minimum viable enrolment of 45 pupils, and more than 2,000 primary schools now face closure or merger.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cy72mn3m7l3o?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "Daily Nation",
        "href": "https://nation.africa/kenya/news/education/2000-primary-schools-face-closure-merger-5255838"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/kenya-rural-school-closures.png",
      "alt": "A young girl points across a grassy field in Kaliluni primary where several cows are grazing, with school buildings and large trees in the background",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rural Rides, William Cobbett (1830) — riding through England's shires he finds vast village churches built for thousands now all but empty, the 'great decay of the villages' foreshadowing schoolrooms built for 200 that hold five",
        "excerpt": "The churches of the last-mentioned villages are all large, particularly the latter, which is capable of containing very conveniently 3 or 4,000 people. … Everywhere you see the indubitable marks of decay in mansions, in parsonage-houses and in people. Nothing can so strongly depict the great decay of the villages as the state of the parsonage-houses, which are so many parcels of public property.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/34238"
      },
      {
        "category": "historical",
        "title": "The History of the Highland Clearances, Alexander Mackenzie (1883) — whole Highland glens emptied of their people to make way for sheep, the well-attended kirk razed and its graveyard left 'filled with tarry sheep,' the starkest echo of a countryside where livestock now outnumber the young",
        "excerpt": "The Parish Church of Farr was no longer in existence; the fine population of Strathnaver was rooted and burnt out during the general conflagration … The church, no longer found necessary, was razed to the ground … I have seen the timber of our well attended kirk covering the inn at Altnaharra; I have seen the kirk-yard where our friends are mouldering filled with tarry sheep.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/51271"
      },
      {
        "category": "literary",
        "title": "The Deserted Village, Oliver Goldsmith (1770) — the poet's lament for depopulated Auburn, where the village master once ruled his 'little school,' a schoolroom fallen silent that rhymes with rural Kenya's abandoned classrooms two and a half centuries on",
        "excerpt": "Sweet Auburn! loveliest village of the plain, / Where health and plenty cheered the labouring swain … Beside yon straggling fence that skirts the way, / With blossomed furze unprofitably gay, / There, in his noisy mansion, skill'd to rule, / The village master taught his little school:",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Deserted_Village"
      },
      {
        "category": "literary",
        "title": "Elegy Written in a Country Churchyard, Thomas Gray (1751) — dusk settling over a rural parish where no children run to greet their fathers, mourning the quiet passing of a humble country way of life",
        "excerpt": "The curfew tolls the knell of parting day, / The lowing herd winds slowly o'er the lea. / The plowman homeward plods his weary way, / And leaves the world to darkness and to me. … For them no more the blazing hearth shall burn, / Or busy housewife ply her evening care: / No children run to lisp their sire's return, / Or climb his knees the envied kiss to share.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Elegy_Written_in_a_Country_Churchyard"
      },
      {
        "category": "artistic",
        "title": "The Country School, Winslow Homer (1871) — a one-room rural schoolhouse crowded with barefoot farm children under a young schoolmistress, the very institution now emptying across the Kenyan countryside",
        "excerpt": "Winslow Homer paints a single sunlit room where a young schoolmistress stands before rows of barefoot country children bent over their slates and primers, one small pupil weeping alone at the back. Light floods through tall windows onto worn floorboards and a battered stove, the cramped space humming with the life of a farming community. It preserves exactly the crowded village schoolroom that mass closures in rural Kenya are now silencing.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Winslow_Homer_-_The_Country_School_(1871).jpg",
        "image": {
          "src": "/covers/kenya-rural-school-closures--art.png",
          "alt": "The Country School, Winslow Homer (1871)",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "A Deserted Farm, from Woodland Sketches, Op. 51, Edward MacDowell (1896) — a brief, hymn-like piano elegy for an abandoned homestead, the musical image of a rural life left to grass and silence",
        "excerpt": "The eighth of MacDowell's Woodland Sketches is a short, slow piano miniature that sighs through hushed, hymn-like chords over an empty farmstead reclaimed by weeds. Its gentle, receding harmonies evoke shuttered doors and a hearth gone cold, a whole way of life quietly withdrawing from the land. The same stillness now settles over Kenyan villages whose schools stand deserted.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Woodland_Sketches,_Op.51_(MacDowell,_Edward)"
      }
    ],
    "rank": 12
  },
  {
    "slug": "us-july4-record-heat-america-250",
    "headline": "Record heat strains US power grids and disrupts Fourth of July events as 'America 250' celebrations begin",
    "overview": "A punishing heat dome pushed temperatures to dangerous highs across much of the United States on Saturday, straining electricity grids and forcing the closure or cancellation of Independence Day events even as the country opened its 250th-anniversary celebrations. President Donald Trump traveled to Mount Rushmore for a holiday address. Forecasters warned the extreme heat would persist through the July Fourth weekend.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPblE3V2g1dE5UeTNfUkdDanpSbTdrbktXdjhDUUg5eXhycWtsSEFPcmpLOFZBMDd3ZzJwTFF3MkN5VGVROWhwd1ZTZjZ1OVVYdnZ0Sy10RlhzOVQ3WG5UV2x2Z2tTRHpFVXhpaTl1UWY1NXZrTUJPU3BVV04yTUdtdEpYbURxMkEyVXllMzlDWkpzamR6WXdDd3FFQ2FsYmth?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOZHhSNy10NWUzeU5fNGp6bDZqLWYxUF92SzdZcmJLREdwYzE0TV9TRy1YYXJzaVNtX2JlRXhCMzNGSEZHNWw2STFMRzdiaDZXeFBjVm84Z0syRzZDbUczTVdGUmJ1X3RqWEJESTJPandwMGtjRUktZUM5dHg2QkFVbHUwNlBwQjlMU0RScWRZQ3BVbUhkVTRCV0J4ZUppS1VIWVVJb3J2aUo1YnhIWVpQa09pd1E3YjhFLXhzZFFsSmxDbmlBQW5jejlWZGJSd9IBzgFBVV95cUxOSXc4T2NhLUZETmwxcUJDY0dmeEJaWDZnTTdBbzdzSXVFeFk4eFdGR1E5OXJsWjVwaTVMSW9CN1VkMGh4WElrNDhnYmd3RUpseV9fT0JRVzJuV0F0MDZfdk45bmJhTnU4cnNra20taDJWYjF4TDJOZGlQaXJzQ0xrX3otWTNIdVBwbXVySHJMdmZMVE1aWEdDeGJmVXgwVmY0clhJSFlpdjhzZFpDM1hhUEIzeE0xOFVWbWhxc1BBRGt0Q1pYVDR5Z1dGTk1lUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/us-july4-record-heat-america-250.png",
      "alt": "A sun-scorched, deserted American town square at noon under a white-hot sky, heat shimmering above empty streets.",
      "credit": "AI-generated"
    },
    "lead": true,
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Fireside Chat on Drought Conditions, Franklin D. Roosevelt (1936) — a US president tours states seared by heat and failed crops, prefiguring today's heat dome bearing down on the nation",
        "href": "https://en.wikisource.org/wiki/Roosevelt's_Fireside_Chat,_6_September_1936",
        "excerpt": "I saw drought devastation in nine States. … I shall never forget the fields of wheat so blasted by heat that they cannot be harvested. … I saw brown pastures which would not keep a cow on fifty acres.",
        "source": "Wikisource"
      },
      {
        "category": "historical",
        "title": "History of the Peloponnesian War — the Plague of Athens, Thucydides (c. 430 BC) — a great power struck at the height of its glory by burning fever and unquenchable thirst, adversity falling on a civilization mid-celebration",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0247:book=2:chapter=49",
        "excerpt": "they were taken first with an extreme ache in their heads, redness and inflammation of the eyes … Many of them that were not looked to, possessed with insatiate thirst, ran unto the wells.",
        "source": "Perseus (Tufts)"
      },
      {
        "category": "literary",
        "title": "The Rime of the Ancient Mariner, Samuel Taylor Coleridge (1817) — a ship becalmed under a bloody noon sun, water everywhere yet none to drink, an emblem of heat and thirst amid apparent abundance",
        "href": "https://en.wikisource.org/wiki/Sibylline_Leaves_(Coleridge)/The_Rime_of_the_Ancient_Mariner",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon. … Water, water, every where, / Nor any drop to drink.",
        "source": "Wikisource"
      },
      {
        "category": "literary",
        "title": "The Waste Land, T. S. Eliot (1922) — 'no water but only rock,' a parched modern wasteland mirroring drought-stricken land baking under a punishing sky",
        "href": "https://www.gutenberg.org/files/1321/1321-h/1321-h.htm",
        "excerpt": "Here is no water but only rock / Rock and no water and the sandy road / The road winding above among the mountains / Which are mountains of rock without water",
        "source": "Project Gutenberg"
      },
      {
        "category": "artistic",
        "title": "The Harvesters, Pieter Bruegel the Elder (1565) — laborers collapsed in the shade at high summer, the age-old bodily toll of extreme heat on those who must work outdoors",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg",
        "excerpt": "Under a hazy golden sky, peasants pause from cutting the wheat to sprawl exhausted beneath a lone pear tree, one man asleep open-mouthed in the heat while others gulp food and drink. The scorched, sun-bleached fields stretch to a shimmering horizon, capturing the oppressive warmth of high summer. It renders the same heat exhaustion that record temperatures now inflict on outdoor workers.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/us-july4-record-heat-america-250--art.png",
          "alt": "Bruegel's The Harvesters (1565): peasants resting exhausted in the heat of the wheat harvest, echoing the human toll of extreme heat",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "'Summer' (L'estate) from The Four Seasons, Antonio Vivaldi (1725) — a concerto whose sonnet has man and flock languishing under a merciless sun before a violent storm, evoking a heat dome breaking into grid-straining tempest",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)",
        "excerpt": "Vivaldi's concerto opens in oppressive stillness, its programmatic sonnet describing man and flock languishing beneath a scorching sun and the pine tree parched by heat. The violins pant and shimmer like heat-haze before erupting into a ferocious thunderstorm that flattens the ripe grain. The music dramatizes exactly the pattern of a heat dome collapsing into violent, power-straining storms.",
        "source": "IMSLP"
      }
    ],
    "rank": 13
  },
  {
    "slug": "trump-pardons-clean-air-act-convictions",
    "headline": "Trump pardons 11, wiping out Clean Air Act emissions-fraud convictions, including a former Abramoff associate",
    "overview": "President Donald Trump granted pardons to 11 people, most of them convicted of violating the Clean Air Act by tampering with vehicle emissions controls, the White House said Saturday. The list includes a former business partner of disgraced lobbyist Jack Abramoff. The clemency, announced over the July Fourth weekend, clears convictions tied to schemes that disabled pollution controls on diesel trucks.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNWWFReFN0Q1VXaGliVGwyUHBkTVM1dEdHSmNKenFtQU9YbHJYRUkwUjU0RGg2NjQxbW5mNVk4VlJtNUhfMGRnd0dJQmZ2aFZlOUxHRUh4YXBmNTdPNkVGSmpwcHYxZE00OHRiMnIwUmVBYmdtVmdMeGlzR0tRVGxwQ0JTcEd0aUFVVUc5V2RkeGxPV0l6M1FkRXZVSVlKWlFFb1FYcDI3ZXFaUmM?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQTl9RODR6cEV0Q3dFY29GdER3bTkxZ1MtUEIwc0hxdEdoRTdiTG1tZ3ZwWUdZbGYxZjluNWlyTGpqWXhmUTRNT1ZneEhLMHVvZHNwOW5JaHNyQm1rUm5yNjZmVlBTZVIwV213YjRQcmZGZVIwVEFuTWxKVUtLTl8waWhpT1dzVlJ1bnhha2FKdm9lVjNmaUp1Q2lLbFdnVkE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/trump-pardons-clean-air-act-convictions.png",
      "alt": "A parked heavy diesel truck idling under a sodium streetlight at night, a faint haze of exhaust hanging in the air.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Federalist No. 74, Alexander Hamilton (1788) — the case for the president's near-unfettered pardon power that Trump now wields to erase Clean Air Act convictions",
        "href": "https://avalon.law.yale.edu/18th_century/fed74.asp",
        "excerpt": "Humanity and good policy conspire to dictate, that the benign prerogative of pardoning should be as little as possible fettered or embarrassed. The reflection that the fate of a fellow-creature depended on his sole fiat, would naturally inspire scrupulousness and caution; the dread of being accused of weakness or connivance, would beget equal circumspection.",
        "source": "Avalon Project, Yale Law School"
      },
      {
        "category": "historical",
        "title": "Proclamation 4311, Gerald R. Ford (1974) — a president's sweeping pardon lifting the threat of prosecution from a powerful ally",
        "href": "https://en.wikisource.org/wiki/Proclamation_4311",
        "excerpt": "do grant a full, free, and absolute pardon unto Richard Nixon for all offenses against the United States which he, Richard Nixon, has committed or may have committed or taken part in during the period from January 20, 1969 through August 9, 1974.",
        "source": "Wikisource"
      },
      {
        "category": "literary",
        "title": "Measure for Measure, William Shakespeare (1604) — a drama of corrupt authority and mercy, warning that 'pardon is still the nurse of second woe'",
        "href": "http://shakespeare.mit.edu/measure/measure.2.1.html",
        "excerpt": "It is but needful:\nMercy is not itself, that oft looks so;\nPardon is still the nurse of second woe:\nBut yet,--poor Claudio! There is no remedy.",
        "source": "The Complete Works of William Shakespeare (MIT)"
      },
      {
        "category": "literary",
        "title": "Inferno, Dante Alighieri (c.1320) — the barrators, corrupt officials boiled in pitch, the reckoning that clemency now cancels",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_21",
        "excerpt": "As in the Arsenal of the Venetians / Boils in the winter the tenacious pitch / To smear their unsound vessels o'er again ... O Malebranche, / Behold one of the elders of Saint Zita; / Plunge him beneath, for I return for others",
        "source": "Wikisource"
      },
      {
        "category": "artistic",
        "title": "The Return of the Prodigal Son, Rembrandt van Rijn (c.1668) — mercy that folds the wayward back into favor with no penance exacted",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg",
        "excerpt": "A ragged, kneeling figure buries his shaved head in his father's chest while the elder man's worn hands rest gently on his shoulders in wordless forgiveness. Rembrandt bathes the reunion in warm light and pushes the disapproving onlookers into shadow, so that clemency, not accountability, fills the canvas. The scene reads as pardon rendered absolute: the transgressor restored, the debt simply dissolved.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/trump-pardons-clean-air-act-convictions--art.png",
          "alt": "Rembrandt's The Return of the Prodigal Son, a father embracing his kneeling wayward son in total forgiveness, echoing clemency that wipes away wrongdoing",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "La clemenza di Tito, Wolfgang Amadeus Mozart (1791) — an opera in which an emperor pardons the very conspirator who plotted his death, staging clemency as the ruler's supreme prerogative",
        "href": "https://imslp.org/wiki/La_clemenza_di_Tito,_K.621_(Mozart,_Wolfgang_Amadeus)",
        "excerpt": "Mozart's final opera seria dramatizes the Roman emperor Titus discovering that his trusted friend Sesto led an armed plot to assassinate him and burn the Capitol. Rather than execute the traitor, Tito tears up the death warrant and forgives him, and the chorus exalts the sovereign's boundless mercy. The work turns an act of clemency toward a guilty intimate into a spectacle of imperial magnanimity, mercy dispensed from on high as an emblem of power.",
        "source": "IMSLP"
      }
    ],
    "rank": 14
  },
  {
    "slug": "netanyahu-trump-us-summit-iran-rift",
    "headline": "Netanyahu and Trump agree in phone call to hold a US summit soon amid friction over the Iran war",
    "overview": "Israeli Prime Minister Benjamin Netanyahu spoke with US President Donald Trump and the two agreed to meet in the United States soon, Netanyahu's office said Saturday. The planned summit comes amid visible strain between the allies following the war with Iran and the death of Supreme Leader Ayatollah Ali Khamenei. Netanyahu's office said Israel greatly appreciates US support.",
    "genre": "Politics",
    "sources": [
      {
        "name": "SBS",
        "href": "https://news.google.com/rss/articles/CBMiZkFVX3lxTFBoQ3JCM0JqVHVSOWFIZW1qTXZlTXBnYW1oemczdU1fMFAydFpicWFlVE5mS0M4TWFMMW91WVlNTlNQQkJkR2JZdVZjdklZZFhzVVVUdWxFbkNJYmVHUk1rdlJDbWllQQ?oc=5"
      },
      {
        "name": "Chosunbiz",
        "href": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxOdzVRUV96c2s2Nmo0dFFTRWwyLVJ0VEVrRExnWGlDQUNVR0pNS0lGMEEtampSYjVNeldQWDNrb2RwMzQtMWdRX1R1TWJsckNiVnVQNHZqZFRwWTJPUTQtLU80ZE8tSjM2emk4di1ZaHBXTUhaVmJWY2swRWs4TDZicmd3Wlp5MnZk0gGcAUFVX3lxTE1zWVBpbDlXQTVwMGg1YnlUVFRyWXdqenNxbGRVQ0txN3EzVTZLV1EtMGFZLVc5dUpJeHY1QmlhU192NWxBWGpwbzBVTkZkT3dwVWF5aGFqaVFiQlhEdi1vQVZncHdmTnZmRnBGMEUwZ2VPdzBjMTdRV0JrU2h4eU5xY3NBbEhWakFhMVNPS2o4Qnh0ZWpvMWpaM0MybA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/netanyahu-trump-us-summit-iran-rift.png",
      "alt": "Two empty high-backed leather chairs facing each other across a polished table in a formal state reception room.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Suez Crisis, Eisenhower Administration (1956) — a great power publicly reining in its own smaller allies just after their war ends",
        "href": "https://history.state.gov/milestones/1953-1960/suez",
        "excerpt": "In 1956 the United States found itself at odds with the very partners who had just fought a war, pressuring Britain, France, and Israel to accept a United Nations ceasefire and withdraw. Washington voted for UN resolutions and publicly censured its allies, a rare open rebuke that temporarily soured relations even among close friends. It is a vivid case of the strongest power constraining the smaller states in its camp in the war's immediate aftermath.",
        "source": "U.S. Department of State, Office of the Historian"
      },
      {
        "category": "historical",
        "title": "The 1973 Arab-Israeli War and Kissinger's Shuttle Diplomacy, United States (1973–1975) — postwar friction between allies channeled into summit diplomacy",
        "href": "https://history.state.gov/milestones/1969-1976/arab-israeli-war-1973",
        "excerpt": "The October 1973 war ended in an Israeli battlefield victory only after a massive American airlift, yet it nearly dragged the superpowers into confrontation and triggered an Arab oil embargo. In its wake, Secretary of State Kissinger launched an intensive round of face-to-face diplomacy to manage a relationship that was at once indispensable and strained. The episode shows how a shared war can leave a great power and its ally needing to sit down together to repair the bond.",
        "source": "U.S. Department of State, Office of the Historian"
      },
      {
        "category": "literary",
        "title": "The Iliad, Homer (c. 8th century BC) — the bitter quarrel between the paramount king and his greatest warrior after a shared war",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D1%3Acard%3D101",
        "excerpt": "Most glorious son of Atreus, most covetous of all, how shall the great-hearted Achaeans give you a prize?",
        "source": "Perseus Digital Library, Tufts University"
      },
      {
        "category": "literary",
        "title": "Julius Caesar, William Shakespeare (1599) — allied victors turning on each other in a tent-side quarrel",
        "href": "https://www.gutenberg.org/files/1522/1522-h/1522-h.htm",
        "excerpt": "Let me tell you, Cassius, you yourself Are much condemn'd to have an itching palm.",
        "source": "Project Gutenberg"
      },
      {
        "category": "artistic",
        "title": "The Meeting of Napoleon I and Tsar Alexander I at Tilsit, Adolphe Roehn (1808) — two rulers, unequal in power, meeting to settle terms after a war",
        "href": "https://commons.wikimedia.org/wiki/File:Tilsitz_1807.JPG",
        "excerpt": "Roehn depicts the June 1807 summit on a raft in the middle of the River Neman, where Napoleon and Tsar Alexander I negotiated the Peace of Tilsit ending the War of the Fourth Coalition. Though staged as an equal meeting, the composition subtly places Napoleon in a posture of ascendancy, waiting for the Russian to approach. It captures the choreography and quiet tension of a face-to-face summit between a dominant power and a partner seeking accommodation.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/netanyahu-trump-us-summit-iran-rift--art.png",
          "alt": "Roehn's painting of Napoleon and Tsar Alexander meeting on a raft on the Niemen at Tilsit, a summit between a great power and a smaller partner after war",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Music for the Royal Fireworks, HWV 351, George Frideric Handel (1749) — grand ceremonial music marking peace and reconciliation among powers after a war",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)",
        "excerpt": "Handel composed this festive suite of overture, bourrees, and triumphant movements for the public celebrations in London's Green Park honoring the peace that ended the War of the Austrian Succession. Its blazing brass and drums were meant to turn the close of a costly, divisive conflict into a display of restored harmony among nations. The music embodies the impulse to convert postwar strain into a stately, public gesture of alliance renewed.",
        "source": "IMSLP / Petrucci Music Library"
      }
    ],
    "rank": 15
  },
  {
    "slug": "aspen-acres-wildfire-colorado",
    "headline": "Aspen Acres wildfire in southern Colorado forces thousands to evacuate and destroys more than 160 structures",
    "overview": "A fast-moving wildfire dubbed the Aspen Acres fire exploded across southern Colorado near Pueblo on Saturday, scorching roughly 28 square miles in hours and growing toward 82,000 acres with little containment. Authorities ordered thousands of residents to evacuate and said the blaze had destroyed more than 160 structures. Firefighters struggled against erratic winds as the fire threatened the landmark Bishop Castle.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Colorado Public Radio",
        "href": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxPZWRrSWozNHpuRjJLLTJjTFFwTU1VdWdScjM3NzZjT20wN1Zibk84TDBJWmhDSHppUkZrMkZjVmZVOXlDOUowcHhPMUllRm5SN2dfQ00zTFdfX05qUTNVbVdBN2xEeloyaW80bkdkajdYWjFIaG9TaF92SWFXSmFCVlRsbkUtUzFO?oc=5"
      },
      {
        "name": "The Denver Post",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxNS0dsVFJ3NkMtdmZuU05aSHRQdlkzSEZ0VENBZUVMLU1xRnJHZ0d6cWExVmhFRHdFc3JFSDVjOXRob1lCMkctRGp2Z0VWYVNkZ2J2RE4tRDRuRk56ZHd2VDZMY0lUTjctbHlFdnZaLWF6am1qVUh0X3hjNzRCbnZzNW01V1hHc1JlZXJZ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/aspen-acres-wildfire-colorado.png",
      "alt": "A hillside of pine forest ablaze at dusk, orange flames and thick smoke rising against a darkening sky.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Annals, Book XV (The Great Fire of Rome), Tacitus (c. 116 AD) — a fast-moving blaze racing through a city faster than anyone could flee, exactly as the Aspen Acres fire outran containment.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=15:chapter=38",
        "excerpt": "Often, while they looked behind them, they were intercepted by flames on their side or in their face. Or if they reached a refuge close at hand, when this too was seized by the fire, they found that, even places, which they had imagined to be remote, were involved in the same calamity.",
        "source": "Perseus Digital Library (Tufts)"
      },
      {
        "category": "historical",
        "title": "The Great Peshtigo Fire: An Eyewitness Account, Rev. Peter Pernin (1874) — the deadliest wildfire in U.S. history, whose wind-driven wall of flame and terrified flight mirror the panic near Pueblo.",
        "href": "https://archive.org/stream/the-great-peshtigo-fire-an-eyewitness-account/The%20Great%20Peshtigo%20Fire%20-%20An%20Eyewitness%20Account_djvu.txt",
        "excerpt": "The neighing of horses, falling of chimneys, crashing of uprooted trees, roaring and whistling of the wind, crackling of fire as it ran with lightning-like rapidity from house to house—all sounds were there save that of the human voice.",
        "source": "Internet Archive"
      },
      {
        "category": "literary",
        "title": "The Aeneid, Book II, Virgil (trans. John Dryden, 1697) — Aeneas fleeing a burning city, its wildfire simile of flame mowing standing corn echoing 28 square miles scorched in hours.",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm",
        "excerpt": "Thus, when a flood of fire by wind is borne, / Crackling it rolls, and mows the standing corn",
        "source": "Project Gutenberg"
      },
      {
        "category": "literary",
        "title": "Metamorphoses, Book II (Phaethon), Ovid (trans. Brookes More) — the sun-chariot loosed to set the whole earth ablaze, cities, forests and mountains consumed like the 82,000-acre front.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227",
        "excerpt": "Great cities perish with their walls, / and peopled nations are consumed to dust— / the forests and the mountains are destroyed.",
        "source": "Perseus Digital Library (Tufts)"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons, October 16, 1834, J. M. W. Turner (1834–35) — a landmark engulfed in roaring flame and glowing sky, as fire threatened Colorado's Bishop Castle.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "excerpt": "Turner turns catastrophe into a towering column of orange-white fire that dissolves stone into light, its heat smearing across the night sky and reflecting in the crowded river below. Tiny onlookers press to the water's edge, dwarfed by a blaze that has swallowed a landmark whole. The painting captures the awe and helplessness of watching an unstoppable fire consume the familiar.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/aspen-acres-wildfire-colorado--art.png",
          "alt": "J. M. W. Turner's 'The Burning of the Houses of Lords and Commons' (1834-35), a landmark consumed by roaring fire, evoking the wildfire threatening Bishop Castle",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Magic Fire Music (Feuerzauber) from Die Walküre, Richard Wagner (1870) — orchestral flames rising to encircle and cut off all approach, sonically mirroring a fire ring closing around evacuees.",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)",
        "excerpt": "Shimmering strings and darting woodwinds flicker upward like sparks catching, building into a radiant, restless blaze of orchestral color. The music surrounds a mountaintop with an impassable ring of fire, beautiful and terrifying at once. Its glowing, ever-shifting textures evoke the mesmerizing menace of flames consuming everything in their path.",
        "source": "IMSLP (Petrucci Music Library)"
      }
    ],
    "rank": 16
  },
  {
    "slug": "geneva-lake-wisconsin-boat-capsize",
    "headline": "Three children die after a boat capsizes on Wisconsin's Geneva Lake during a severe storm",
    "overview": "Three children died and other passengers were rescued after a boat capsized on Geneva Lake in southern Wisconsin when a severe storm swept across the area, authorities said Saturday. Rescuers pulled survivors from the water after the sudden storm overturned the vessel. The deaths came amid a wave of violent weather battering the US Midwest over the holiday weekend.",
    "genre": "Climate",
    "sources": [
      {
        "name": "CBS News",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQTlZHNFdDdWdjTEZ5LUl4RlNadlpucHlibE44N3lISDVJMnhweU9KNkF6b1VlT1ItVzJhOTk5cmdfTzJrcXVCSDhLVWNlRkRjams5Y1otczRWNlBBalNWVUF5dkgtYWNuZ015VzE0ZGdqU0ZzNnRwRDZlTVF2MU16eG1GUjdZaE1jNVBXRXln?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQZzNyMm9MaHowU04ya1FzR1lMMEJfUjZmdGNBdGhPbUluSkM1U3VBY2FLazhfUkdBY2pKYV9xanZxRWdRc2VreUJvcURyVExzYTVZQkpJRmNIUDk1YWlYbXgzbEk4SXN4X2pPR1ZrRTFTbEhJV3ZfZzFSMnk2ZjNGMVRfRmVWd1lBakpvRWVxTV9xQXFTTkE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/geneva-lake-wisconsin-boat-capsize.png",
      "alt": "A small empty pleasure boat overturned on choppy grey lake water under a bank of dark storm clouds.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Children's Blizzard, U.S. Great Plains (January 12, 1888) — a sudden storm on a mild day killed roughly 213 schoolchildren caught in the open, like the squall that swamped the Geneva Lake boat",
        "href": "https://www.weather.gov/unr/1888-01-12",
        "excerpt": "Snow like flour—could not breathe in it. I was 7 years and stuck my head around corner of house and nearly choked before I got indoors again.",
        "source": "National Weather Service (NOAA)"
      },
      {
        "category": "historical",
        "title": "The Wreck of the Steamer Lady Elgin, Lake Michigan (September 8, 1860) — a Great Lakes vessel lost in a nighttime gale, drowning some 300, echoing the sudden storm that capsized the Geneva Lake boat",
        "href": "https://drloihjournal.blogspot.com/2020/03/sinking-of-the-ps-lady-elgin-on-9-8-1860.html",
        "excerpt": "A most appalling calamity has burst upon our community, and the other communities yet to be thrilled with the intelligence of a disaster which has just occurred on this lake [Michigan], without parallel in the marine annals of the lakes.",
        "source": "Chicago Tribune (Sept. 10, 1860), via Digital Research Library of Illinois History Journal"
      },
      {
        "category": "literary",
        "title": "The Wreck of the Hesperus, Henry Wadsworth Longfellow (1842) — a skipper's young daughter, lashed to the mast, dies when a sudden storm wrecks the schooner, mirroring children lost on the water",
        "href": "https://en.wikisource.org/wiki/The_Wreck_of_the_Hesperus",
        "excerpt": "He wrapped her warm in his seaman's coat / Against the stinging blast; / He cut a rope from a broken spar, / And bound her to the mast.",
        "source": "Wikisource"
      },
      {
        "category": "literary",
        "title": "The Tempest, William Shakespeare (c. 1611) — the play opens with a ship foundering in a violent tempest, the mariners crying their farewells as the vessel splits",
        "href": "https://www.gutenberg.org/files/23042/23042-h/23042-h.htm",
        "excerpt": "Mercy on us!—We split, we split!—Farewell my wife and children!—Farewell, brother!—We split, we split, we split!",
        "source": "Project Gutenberg"
      },
      {
        "category": "artistic",
        "title": "The Ninth Wave, Ivan Aivazovsky (1850) — shipwreck survivors cling to a broken mast beneath a towering storm wave, an image of the sea's sudden and lethal violence",
        "href": "https://commons.wikimedia.org/wiki/File:Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg",
        "excerpt": "Aivazovsky paints a handful of survivors lashed to the shattered mast of a wrecked ship, tossed on a blazing dawn sea as an enormous wave rears to break over them. The canvas fuses terror and fragile hope: the light of survival glows through the storm even as the water threatens to engulf them, capturing the exact moment when a sudden tempest turns a vessel into a fight for life.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/geneva-lake-wisconsin-boat-capsize--art.png",
          "alt": "Aivazovsky's The Ninth Wave: shipwreck survivors clinging to a broken mast beneath a giant storm wave, evoking a boat overturned by a sudden squall",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Kindertotenlieder ('Songs on the Death of Children'), Gustav Mahler (1904) — the final song, 'In diesem Wetter' ('In this weather, in this storm'), voices a parent's grief for children lost to the tempest",
        "href": "https://imslp.org/wiki/Kindertotenlieder_(Mahler,_Gustav)",
        "excerpt": "Mahler's cycle sets a grieving parent's meditation on children who have died, and its fifth and final song erupts into a raging orchestral storm—wind, rain, and thunder—before subsiding into unbearable tenderness. The voice laments that the children were carried out into the tempest against the parent's will, then finds fragile consolation that they now rest as if in their mother's house, sheltered from every storm.",
        "source": "IMSLP"
      }
    ],
    "rank": 17
  },
  {
    "slug": "peco-philadelphia-utility-workers-strike",
    "headline": "Philadelphia utility PECO hit by worker strike as contract talks collapse over the July Fourth weekend",
    "overview": "Unionized workers at PECO, the utility serving Philadelphia and its suburbs, walked off the job just after midnight Saturday after contract negotiations broke down, the union said. The walkout began at 12:01 a.m. ahead of a busy July Fourth weekend, with no new deal in place. PECO said it had activated contingency plans to maintain electricity and gas service.",
    "genre": "Economy",
    "sources": [
      {
        "name": "The Philadelphia Inquirer",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQa0RoM083Nm4yVHhCMWhDQzNnMnVfYmhWU0NFZjZESUxlZG05WEpEVTZHbWVTYWNvTTZ4R1dYZUVOS0ZtRVZIRUZWOV9qT0RQd1d5aTJRREVwcXYtRjAwclZLc05OcE9oalNXNTBsYXRjZVJ3enV5LWhxajEyRDVlMkR1TllwaXVpM1JHWmVLb1VzTGpicklrUFBKcw?oc=5"
      },
      {
        "name": "NBC10 Philadelphia",
        "href": "https://news.google.com/rss/articles/CBMia0FVX3lxTE5nUW9PWE5WZzRHaDBnZUtIZVpPWjVxdU0zU21jSEZOaFJnYkhOTnRsc2JmdEE2STRaWnp6T21SaWhpanFRRjNZMmZVM0wwbzZpcUhEMWw1MXhwRllCRUlUSTk5M1dnNFZrejhn0gFzQVVfeXFMT0tXTEpkSTNGVzRmZjB2M21JcGdmcWtScHFicnJZZVBsLVduckJxOEstblM3QjhiQkdPb3A3dThfR1EwYWVKN0dnUzRrZ0Y2TE5Ob2dmbFRRcVNYSGZOaTJSZ00xZGdBUFk2TkdiTWJNZjU4Zw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/peco-philadelphia-utility-workers-strike.png",
      "alt": "An electrical utility hard hat and gloves resting on a coil of heavy cable beside a locked substation gate at dawn.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Telegram to Samuel Gompers on the Boston Police Strike, Calvin Coolidge (1919) — a public-service walkout that framed the tension between the right to strike and uninterrupted public services, exactly the dilemma PECO's contingency plans now confront",
        "href": "https://www.presidency.ucsb.edu/documents/telegram-the-president-the-american-federation-labor-samuel-gompers-the-boston-police",
        "excerpt": "That furnished the opportunity, the criminal element furnished the action. There is no right to strike against the public safety by anybody, anywhere, any time. You ask that the public safety again be placed in the hands of these same policemen while they continue in disobedience to the laws of Massachusetts.",
        "source": "The American Presidency Project"
      },
      {
        "category": "historical",
        "title": "Statement from the Pullman Strikers, American Railway Union delegates (1894) — railway workers who downed tools when negotiations failed, voicing the same last-resort desperation as PECO crews walking out after talks collapsed",
        "href": "https://www.historyisaweapon.com/defcon1/pullmanstrikersstatement.html",
        "excerpt": "We struck at Pullman because we were without hope. We joined the American Railway Union because it gave us a glimmer of hope.",
        "source": "History Is a Weapon"
      },
      {
        "category": "literary",
        "title": "Germinal, Émile Zola (1885) — the coal miners' strike erupts before dawn in a single decisive moment, mirroring PECO workers walking off just after midnight with no deal in place",
        "href": "https://www.gutenberg.org/files/56528/56528-h/56528-h.htm",
        "excerpt": "Suddenly, on this very Monday, at four o'clock in the morning, the strike broke out.",
        "source": "Project Gutenberg"
      },
      {
        "category": "literary",
        "title": "The Masque of Anarchy, Percy Bysshe Shelley (1819) — the archetypal summons to collective action and solidarity, the moral engine behind any labor stoppage like the PECO walkout",
        "href": "https://en.wikisource.org/wiki/The_Masque_of_Anarchy",
        "excerpt": "Rise like Lions after slumber / In unvanquishable number, / Shake your chains to earth like dew / Which in sleep had fallen on you— / Ye are many—they are few.",
        "source": "Wikisource"
      },
      {
        "category": "artistic",
        "title": "The Strike (Der Streik), Robert Koehler (1886) — the first major painting of a strike, showing workers who have downed tools confronting the factory owner, a visual precedent for PECO's crews withholding their labor",
        "href": "https://commons.wikimedia.org/wiki/File:Robert_Koehler_-_Der_Streik_(1886).jpg",
        "excerpt": "Koehler's monumental canvas freezes the instant a strike ignites: workers stream from the mill gates and mass before the owner on his steps, one man arguing with clenched urgency while another stoops to gather a stone. Women and children crowd the margins, and the smokestacks stand cold behind them. It is the dignity of labor rendered as tense, collective confrontation.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/peco-philadelphia-utility-workers-strike--art.png",
          "alt": "Robert Koehler's 1886 painting The Strike, workers confronting a factory owner after downing tools, echoing PECO crews walking off the job",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Solidarity Forever, Ralph Chaplin (1915) — the most famous labor anthem, distilling the collective power PECO's unionized workers assert by walking off together",
        "href": "https://en.wikisource.org/wiki/Songs_of_the_Workers_(15th_edition)/Solidarity_Forever!",
        "excerpt": "Solidarity forever! / Solidarity forever! / Solidarity forever! / But the Union makes us strong.",
        "source": "Wikisource"
      }
    ],
    "rank": 18
  },
  {
    "slug": "anthropic-samsung-custom-ai-chip",
    "headline": "Anthropic in talks with Samsung to manufacture custom AI chips, reports say",
    "overview": "The AI company Anthropic is in discussions with South Korea's Samsung to manufacture custom artificial-intelligence chips, according to reports published Saturday. A deal would deepen Anthropic's push to secure dedicated silicon for training and running its Claude models and reduce reliance on existing suppliers. Neither company confirmed the talks.",
    "genre": "Technology",
    "sources": [
      {
        "name": "UPI",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQZF9aSlNYNWJvblNUYm5SRnpnRkZWUk1UbEVIcW5LclBuc05PQ0lZMkdIb3JwWmNfNDJHcFhUaU9CTDVMNklDaDA1Y1Z4Q0xJRGx3NG9rX0ZvYzF4WUxHNktlQldMZnFfV29mV3VmRkZqeUMya2hBanE3bHBsMmJMX1BQcTFDUEtub3BvNnFrRUFTc29RQ1ppRXJIONIBoAFBVV95cUxNODNpSWktRTdVQlNWRVY1VDJudF84bXRVZm1SQU5aNFJ6R3R2RzZrcGJpQW55b1Y3Tm1PMWtBb2Vnd1BfaTZCVUFMUldGS1lSc25VTDhaM3REbXdyQXZxcUdUMkluTmQ1bXR2N28yTWs5bEZvdkNhX0hFcVNIcGJuZGFFMHFQa3NoOWNXYkswMFZrWFNSd2VNM3FIQmxyWFgz?oc=5"
      },
      {
        "name": "GSMArena",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxOa3B4aHhQeEY5Tk01T1NZZmNqeDZ6OV9Md1VCdjRCZ2Z5ZTNKc1h1cVZRVkxrS1BMT19uQjhmYWstYmF0Nm9WUGZELVF1Q0l4OC1ITXdPNUhjR01WWE5BYnpqSDJyOTZsM2JGc0N3SFQwRWZqR0xoQUIxOFlwUUpKSWNtNlRONDFGQ3cyR1lkdjNjaERL0gGQAUFVX3lxTE5aVEdyTnFjOVVVMERWR0xKcjYxNkZhR19BeVBZLXE0UHkzY0Z1RmJITFZWWF8xYVU2MTBmTkhBVDFMZUtBYTdYSVBpcDJMbWRKOVg0TnpTdGpFb0tJdjNUOFhCWjdoay05Qm12X25nMDhQOTZaSHVyRXlneWx5bHlNWmwxbnlkTGNUamZud1k0TQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/anthropic-samsung-custom-ai-chip.png",
      "alt": "A single silicon wafer held under clean-room light, its mirrored surface catching a grid of circuitry.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Life of Benvenuto Cellini, Benvenuto Cellini (c. 1563) — a master who, rather than trust others, flings his own pewter into the furnace to cast his masterpiece himself, mastering fire and metal",
        "href": "https://en.wikisource.org/wiki/The_Life_of_Benvenuto_Cellini/Section_LXXII_to_LXXXVII",
        "excerpt": "Accordingly I sent for all my pewter platters, porringers, and dishes, to the number of some two hundred pieces, and had a portion of them cast, one by one, into the channels, the rest into the furnace.",
        "source": "Wikisource"
      },
      {
        "category": "historical",
        "title": "My Life and Work, Henry Ford (1922) — Ford makes his own parts and materials so he cannot be crippled when an outside supplier fails, foreshadowing Anthropic forging its own silicon",
        "href": "https://www.gutenberg.org/cache/epub/7213/pg7213-images.html",
        "excerpt": "But also we aim to make some of every part so that we cannot be caught in any market emergency or be crippled by some outside manufacturer being unable to fill his orders.",
        "source": "Project Gutenberg"
      },
      {
        "category": "literary",
        "title": "Iliad, Book 18, Homer (trans. A. T. Murray, 1924) — Hephaestus fires his forge to hammer out new arms for Achilles, the god making the hero's tools with his own hands",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D18%3Acard%3D468",
        "excerpt": "And on the fire he put stubborn bronze and tin and precious gold and silver; and thereafter he set on the anvil-block a great anvil, and took in one hand a massive hammer, and in the other took he the tongs.",
        "source": "Perseus Digital Library"
      },
      {
        "category": "literary",
        "title": "Prometheus Bound, Aeschylus (c. 430 BCE) — Prometheus hands mortals fire so 'they shall learn many arts,' the primal act of seizing the means of making",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0010%3Acard%3D250",
        "excerpt": "Prometheus: In addition, I gave them fire. Chorus: What! Do creatures of a day now have flame-eyed fire? Prometheus: Yes, and from it they shall learn many arts.",
        "source": "Perseus Digital Library"
      },
      {
        "category": "artistic",
        "title": "Apollo in the Forge of Vulcan (La Fragua de Vulcano), Diego Velázquez (1630) — the divine smithy where armor is beaten from glowing metal, an image of owning the forge itself",
        "href": "https://commons.wikimedia.org/wiki/File:Diego_Vel%C3%A1zquez_-_The_Forge_of_Vulcan_-_WGA24376.jpg",
        "excerpt": "Velazquez paints Vulcan and his sweating assistants frozen at the anvil, a bar of iron glowing white-hot between hammer and tongs as Apollo arrives with unwelcome news. Light pours across bare muscle and half-finished armor, dignifying manual labor as the very engine of the divine workshop. It is the forge as a place of self-made power, metal mastered by fire and human hands.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/anthropic-samsung-custom-ai-chip--art.png",
          "alt": "Velazquez's The Forge of Vulcan (1630): smiths at a fiery anvil forging armor, an emblem of controlling the means of production like Anthropic forging its own chips",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Siegfried, Forging Song ('Nothung! Nothung!'), Richard Wagner (1876) — the young hero reforges his father's shattered sword with his own hands rather than rely on the smith Mime",
        "href": "https://www.gutenberg.org/files/49507/49507-h/49507-h.htm",
        "excerpt": "Nothung! Nothung! / Conquering sword! ... Hoho! Hoho! / Hohei! Hohei! Hoho! / Bellows blow! / Brighten the flame!",
        "source": "Project Gutenberg"
      }
    ],
    "rank": 19
  },
  {
    "slug": "argentina-cape-verde-world-cup",
    "headline": "Messi scores again as champion Argentina survive a 3-2 extra-time scare against Cape Verde to reach the World Cup last 16",
    "overview": "Lionel Messi scored to take the Golden Boot lead as defending champion Argentina edged debutants Cape Verde 3-2 after extra time on Saturday to reach the World Cup round of 16. An extra-time own goal ultimately settled a thriller in which Cape Verde pushed the title-holders to the brink. Messi extended his scoring streak to eight games with his 20th career World Cup goal.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPaGk1V1JkY0kyQWNqeC0zZ0gxOU1COWFSYmFOdUgtV0VIaTF0N1pBaVJseXZIcTVBT011Qzl6TWJmWU5RWmxEelJTeEJsZnYxb2ZhS1p1R2ZDaUJmdE9DQmY1Z1YtMGItQWo1YWMxS0hwVlowWnRKTHFqZTdnX1VtR2JWQlo0cFkyaEpRS1NvSHBRaHgtelBMc01GaFJZZ2Jvd1lUeA?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNZjhKaXIyN2txZWRYNVRldjA0dnV1TE5ncWE5LTluTlZtV0JwdkRoQWpaQU1xejBtc1NYNTFNMGR2dXRiZThOZUtPbDRKWk96TXI1WkZ3Wk1vZkcwdHdGa2hzdmtnWVdFVmh1UFVMaklYVmFBbDkwbkpIY3lzdEp2UTRNNFVBb0FBR3AtSFhaUjRJNDRFRFhvRjFoV3dEZ1JwUERsX3IxWUZfQ29PTG1jczRRb20zNzdVcUpyMkxR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/argentina-cape-verde-world-cup.png",
      "alt": "An empty floodlit football stadium at night, a single ball resting on the centre spot amid drifting confetti.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Histories (Book 7: Thermopylae), Herodotus (c. 430 BC) — a tiny band hurls itself at an overwhelming host with reckless valour, as debutant Cape Verde did against the reigning champions",
        "href": "https://anthonyhollingsworth.com/resources/Battle-of-Thermopylae-Herodotus.pdf",
        "excerpt": "The Hellenes with Leonidas, feeling that they were going forth to death, now advanced out much further than at first into the broader part of the defile... they displayed upon the Barbarians all the strength which they had, to its greatest extent, disregarding danger and acting as if possessed by a spirit of recklessness.",
        "source": "Herodotus, The Histories (Macaulay translation)"
      },
      {
        "category": "historical",
        "title": "History of the Peloponnesian War (Book 7: the Sicilian Expedition), Thucydides (c. 400 BC) — the overwhelming favourite's grand campaign brought to the brink of ruin, an echo of the scare Argentina survived",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Thuc.+7.87",
        "excerpt": "Few of many returned home. And thus passed the business concerning Sicily.",
        "source": "Perseus Digital Library, Tufts University"
      },
      {
        "category": "literary",
        "title": "1 Samuel 17 (David and Goliath), King James Bible (1611) — the small shepherd who fells the giant, the frame every report reached for as a tiny island nation staggered the holders",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel",
        "excerpt": "Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. ... So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "Wikisource"
      },
      {
        "category": "literary",
        "title": "Ulysses, Alfred, Lord Tennyson (1842) — the aged hero who refuses to rest or yield, mirroring Messi's persistence as he pressed on for the Golden Boot lead",
        "href": "https://en.wikisource.org/wiki/Ulysses_(Tennyson)",
        "excerpt": "that which we are, we are; / One equal temper of heroic hearts, / Made weak by time and fate, but strong in will / To strive, to seek, to find, and not to yield.",
        "source": "Wikisource"
      },
      {
        "category": "artistic",
        "title": "David with the Head of Goliath, Caravaggio (c. 1610) — the young giant-slayer grasping the vanquished giant's severed head, the ultimate image of the underdog overturning the mighty",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "excerpt": "Caravaggio freezes the aftermath of the upset: a pensive young David lifts the dripping head of the fallen giant out of deep shadow, the whole drama staked on a single unlikely stone. The vanquished colossus, dwarfing the boy in life, is reduced to a trophy in the underdog's grip. It is the definitive picture of the small felling the great.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/argentina-cape-verde-world-cup--art.png",
          "alt": "Caravaggio's David with the Head of Goliath, the underdog boy holding the slain giant's head — a visual analogy for tiny Cape Verde staggering the champions",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Saul, George Frideric Handel (1738) — an oratorio that opens with all Israel hailing the young giant-killer's victory, celebrating the underdog whose feat unsettles the mighty",
        "href": "https://imslp.org/wiki/Saul,_HWV_53_(Handel,_George_Frideric)",
        "excerpt": "Handel's dramatic oratorio opens in the glow of David's triumph over Goliath, the massed chorus swelling in exultation as a nation salutes a shepherd boy who toppled a giant. The music turns that improbable victory into communal jubilation before envy and downfall follow. Its opening captures exactly the roar that greets an underdog who humbles a colossus.",
        "source": "IMSLP (International Music Score Library Project)"
      }
    ],
    "rank": 20
  },
  {
    "slug": "egypt-australia-world-cup-shootout",
    "headline": "Salah's Egypt beat Australia 4-2 on penalties to reach the World Cup knockout stage for the first time",
    "overview": "Mohamed Salah converted a Panenka penalty as Egypt beat Australia 4-2 in a shootout on Saturday, after the last-32 match finished 1-1, to reach the World Cup knockout stage for the first time in the nation's history. The Socceroos, still searching for a first World Cup knockout win, were left heartbroken. Egypt advance to the round of 16.",
    "genre": "Culture",
    "sources": [
      {
        "name": "ESPN",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxPa2k2bnJEcXlzdFg3dGZudk9VQjBjZkxrSTFWOVpVaUZLTVJOM1Y0UThTNjJ0VlFDRmxZR2xULWxMaGs5UU9vOWpMb0gtOXkweTUwa3ZIVm1yWWVUaTkzM2VRYkhydjNCMHFUeGpsTDh3Ym9TNUIza1VhTHFRX1REekxGYk82M2R1WlZFX3VfbUtMWWUwTUM1Vm85YWxzQVZJNGNqb3VFcnZ2RHp3T3ZjY2dn?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOMEctZ3hfTXA1MTRhQTV4VTF6aXl2dDJtVEJSRDFYelFPeFpISXdSZlpBWTF1a1A5QVZMVDhKdFNtT0FZeUxiYlkzX2NXRXJrSEJmaFZoQ25wQjRHWXNJbFgxWWc0SWg1YnR5VUFmV0tTbmYzZzVvaEVpNnRmczc1Y2ZHTUJvTDYzS0w3MWdqNW1JcllMM3c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/egypt-australia-world-cup-shootout.png",
      "alt": "A lone football resting on the penalty spot before an empty goal in a brightly floodlit stadium at night.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Histories, Book 6 (Battle of Marathon), Herodotus (c. 430 BCE) — a free people daring to charge the mighty and win for the first time, as Egypt first broke into the knockout stage",
        "href": "https://lexundria.com/hdt/6.112/mcly",
        "excerpt": "for they were the first of all the Hellenes about whom we know who went to attack the enemy at a run, and they were the first also who endured to face the Median garments and the men who wore them, whereas up to this time the very name of the Medes was to the Hellenes a terror to hear.",
        "source": "Lexundria (Herodotus, trans. G. C. Macaulay)"
      },
      {
        "category": "historical",
        "title": "Inscription of the Battle of Kadesh, Ramesses II (c. 1274 BCE) — an Egyptian leader charging alone when his own had fled, as Salah shouldered a whole nation under pressure",
        "href": "https://archive.org/stream/ancientrecordsof03brea/ancientrecordsof03brea_djvu.txt",
        "excerpt": "I charged all countries, while I was alone, my infantry and my chariotry having forsaken me. Not one among them stood to turn about.",
        "source": "Internet Archive — Breasted, Ancient Records of Egypt, Vol. III (1906)"
      },
      {
        "category": "literary",
        "title": "David and Goliath (1 Samuel 17), King James Bible (1611) — the audacious underdog felling the giant with one decisive stroke, mirroring Salah's cheeky Panenka",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel",
        "excerpt": "And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth.",
        "source": "Wikisource (King James Bible)"
      },
      {
        "category": "literary",
        "title": "Olympian Ode 1, Pindar (476 BCE) — the victory ode immortalizing a single champion's triumph carried home in glory to his people",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth.",
        "source": "Perseus Digital Library (trans. Diane Arnson Svarlien)"
      },
      {
        "category": "artistic",
        "title": "The Narmer Palette, ancient Egyptian (c. 3100 BCE) — the earliest monument to a first-ever national triumph, its ruler standing victorious over the fallen foe",
        "href": "https://commons.wikimedia.org/wiki/File:Narmer_Palette.jpg",
        "excerpt": "Carved in green siltstone more than five thousand years ago, the palette shows King Narmer, the tall white crown on his head, raising a mace to strike down a kneeling enemy. Rows of bound and fallen foes and paired long-necked beasts frame the scene, celebrating one leader who bound Upper and Lower Egypt into a single people. It is Egypt's oldest image of a nation carried, by one man, into an unprecedented new era.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/egypt-australia-world-cup-shootout--art.png",
          "alt": "The Narmer Palette showing an Egyptian king triumphant over a fallen enemy — the first unification of a nation, echoing Egypt's first-ever World Cup breakthrough",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Triumphal March (Gloria all'Egitto) from Aida, Giuseppe Verdi (1871) — Egypt's grand victory anthem for a hero's homecoming triumph",
        "href": "https://imslp.org/wiki/A%C3%AFda_(Verdi,_Giuseppe)",
        "excerpt": "As Act II opens, blazing trumpets in a bright key of victory herald the return of Egypt's conquering hero, and the chorus thunders its hymn of glory to the nation. The march swells with pageantry — massed brass, jubilant rhythms, and a roaring crowd hailing their champion. Verdi's music captures exactly the ecstasy of a people greeting an unprecedented, hard-won triumph.",
        "source": "IMSLP (Petrucci Music Library)"
      }
    ],
    "rank": 21
  },
  {
    "slug": "dearborn-fairlane-mall-shooting",
    "headline": "Two killed in shooting at the Fairlane Town Center mall in Dearborn, Michigan; two in custody",
    "overview": "A shooting at the Fairlane Town Center mall in Dearborn, in suburban Detroit, left two people dead and another wounded, and two suspects were taken into custody, police said Saturday. Investigators were working to determine a motive for the violence at the shopping center. The mall was evacuated as officers responded.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQY29UQWxsVHFlMkZKS21KMmR4LTl3VG9nQmgzYTQzUnpBbzh3YmsybjlMNFJ5aUl3cnRQclhIa3F1TlVrRjdTalNaR1VBbGNYajJCMC1Wc0lPYkF2YWdDV005UUdObEtKSUh1SUZFLVo1TXpRR1pxTWxaSmE0Z282TVZ6T2dReDU5czFKMUplMnJnWnRlTnY4QXhMYU1MUEl3dFE?oc=5"
      },
      {
        "name": "The Detroit News",
        "href": "https://news.google.com/rss/articles/CBMi2gFBVV95cUxNZ0VSQU0zVEMtazBhemZEcDVJQ21WcUNHYkNaUldXVThBRS0wcXNUSkZGVnVqdnc3clhuQUZGczJvRFhZeHc3djhaaWlvbWpSQUJaUjMxMkZsSWtLNGROVkctczNDRzFiNjd3M09BbHNXVU1mZ1hOZzNudE5hbFM3Vl9rZFpGT3o4VF8xVFFxRDdfZllQTzJta0VxRS0xeXY0WEljeE1jX25IVnhhOC1nVENwMXd5SkRnNFFYQ2ZTVW1nbmpoSkd4V05GRzBRM0lFZWFwZHY4cE9VZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/dearborn-fairlane-mall-shooting.png",
      "alt": "An empty shopping-mall concourse at night, polished floor reflecting shuttered storefronts and a lone security light.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "A Short Narrative of the Horrid Massacre in Boston, Boston Town Committee (1770) — soldiers open fire on an ordinary street crowd, the archetype of sudden lethal violence erupting in a public place",
        "href": "https://www.digitalhistory.uh.edu/active_learning/explorations/revolution/account2.cfm",
        "excerpt": "One gun was fired first; then others in succession and with deliberation, till ten or a dozen guns were fired.",
        "source": "Digital History (University of Houston)"
      },
      {
        "category": "historical",
        "title": "A Concise History of the Great Trial of the Chicago Anarchists in 1886, Dyer D. Lum (1886) — a bomb turns a crowded market square into a scene of instant death, a marketplace turned deadly",
        "href": "https://archive.org/stream/ldpd_14875839_000/ldpd_14875839_000_djvu.txt",
        "excerpt": "It rose about twenty feet in the air, describing a curve, and fell right in the middle of the street and among the marching police. It gave a red glare while in the air. The bomb lay on the ground for a few seconds, then a loud explosion occurred, and the crowd took to their heels, scattering in all directions.",
        "source": "Internet Archive"
      },
      {
        "category": "literary",
        "title": "When Lilacs Last in the Dooryard Bloom'd, Walt Whitman (1865) — a nation's recurring public mourning for a life cut down by sudden violence",
        "href": "https://americanliterature.com/author/walt-whitman/poem/when-lilacs-last-in-the-dooryard-bloomd",
        "excerpt": "When lilacs last in the dooryard bloom'd, / And the great star early droop'd in the western sky in the night, / I mourn'd, and yet shall mourn with ever-returning spring. / Ever-returning spring, trinity sure to me you bring, / Lilac blooming perennial and drooping star in the west, / And thought of him I love.",
        "source": "American Literature"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations 1:1, King James Bible (1611) — grief over a once-thronged place left desolate, the fragility of civic peace",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow!",
        "source": "Wikisource"
      },
      {
        "category": "artistic",
        "title": "The Third of May 1808, Francisco de Goya (1814) — anonymous civilians gunned down without warning, ordinary life shattered by sudden lethal violence",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "excerpt": "Goya's oil painting confronts the viewer with faceless soldiers leveling their muskets at unarmed townspeople in the dark. A man in a white shirt throws his arms wide in terror as the dead already lie bloodied at his feet. The canvas turns anonymous slaughter into an enduring image of innocent life extinguished in an instant.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/dearborn-fairlane-mall-shooting--art.png",
          "alt": "Goya's The Third of May 1808, showing a firing squad executing unarmed civilians, evoking sudden lethal violence against ordinary people",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Requiem in D minor, K.626, Wolfgang Amadeus Mozart (1791) — the music of mourning, a mass for the dead answering senseless loss",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "excerpt": "Mozart's unfinished funeral mass gathers grief into sound, its pleading Requiem aeternam and thundering Dies irae voicing both sorrow and dread. The work has become a universal soundtrack for public mourning after violent death. It transforms private loss into a collective rite of remembrance.",
        "source": "IMSLP"
      }
    ],
    "rank": 22
  },
  {
    "slug": "sudan-el-obeid-rsf-drone-strikes",
    "headline": "Drone strikes kill at least 45 civilians in Sudan's El-Obeid as the UN warns of a deepening catastrophe",
    "overview": "Drone strikes by the paramilitary Rapid Support Forces killed at least 45 civilians in the city of El-Obeid in Sudan's North Kordofan state, aid officials said Saturday, as the United Nations warned of a deepening humanitarian catastrophe. The relentless bombardment struck a densely populated area amid the country's grinding civil war. The strikes drew condemnation from rights groups.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Punch",
        "href": "https://news.google.com/rss/articles/CBMigwFBVV95cUxQTFRXQ3JQSHdDNk1vMWlVUXhBaUtPeWhJMVdITmZyUlBJNUxWZnNzckd2SF80aVRrSGRGS010Z2I5SUVSNmwyemxIU05HeU9Ca2hYdGtiRm54dUYwMWg0M2pFNHdkM2M2YXFUUXFzWEduZGZjVFdTWGJXV0ItUUN5U0Y3bw?oc=5"
      },
      {
        "name": "NewsCord",
        "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxOaUJoRzk4Y0lsRnMwSm5XTmNLSWt6dHlZdFljak1pTjlLS21kOUdYbzI2WW80UjhQbkwyaDR4UXhPQm5aUkgxMjlBdUFLejAzWUxaXzdRbWduejVzS01MNGhaaHJieVVKSXgxOHZiZk1GTW96ZFl0cVRNRGptTEloZTZNUkMxUUxjMlhLeDZOVmExVkh3N1paVG9nZlF2d1laM29pN3RzS2IyUV9Vekxsb0U5YWRlUUprSU9CTFlxVDlsV0JfUHh4aU9laFk5dEU?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/sudan-el-obeid-rsf-drone-strikes.png",
      "alt": "A shattered, deserted street in a North African city at dusk, dust hanging in the air and rubble strewn across the road.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Massacre at Mycalessus, Thucydides, History of the Peloponnesian War (c. 413 BC) — a mercenary raid falls on an undefended town and butchers its civilians, prefiguring paramilitary strikes on El-Obeid's crowded streets",
        "href": "https://classics.mit.edu/Thucydides/pelopwar.7.seventh.html",
        "excerpt": "The Thracians bursting into Mycalessus sacked the houses and temples, and butchered the inhabitants, sparing neither youth nor age, but killing all they fell in with, one after the other, children and women... they attacked a boys' school, the largest that there was in the place, into which the children had just gone, and massacred them all.",
        "source": "The Internet Classics Archive (MIT)"
      },
      {
        "category": "historical",
        "title": "The Wars of the Jews (Siege of Jerusalem, AD 70), Flavius Josephus (c. AD 75) — an eyewitness account of a besieged city's streets choked with the dead, echoing the UN's warning of catastrophe in El-Obeid",
        "href": "https://penelope.uchicago.edu/josephus/war-6.html",
        "excerpt": "The ground did no where appear visible, for the dead bodies that lay on it; but the soldiers went over heaps of those bodies, as they ran upon such as fled from them.",
        "source": "LacusCurtius (University of Chicago)"
      },
      {
        "category": "literary",
        "title": "Aeneid, Virgil, Book II (19 BC) — Aeneas watches Troy burn and its people slaughtered by night, the archetype of a populous city destroyed in war",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm",
        "excerpt": "An ancient and imperial city falls: / The streets are fill'd with frequent funerals; / Houses and holy temples float in blood.",
        "source": "Project Gutenberg"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations (King James Version, 1611) — a lament over a stormed and starving Jerusalem, its dead of every age strewn in the streets, as in bombarded El-Obeid",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations",
        "excerpt": "The young and the old lie on the ground in the streets: my virgins and my young men are fallen by the sword; thou hast slain them in the day of thine anger; thou hast killed, and not pitied.",
        "source": "Wikisource (King James Bible)"
      },
      {
        "category": "artistic",
        "title": "Pillage and Burning of a Village, Jacques Callot (1633) — plate 7 of 'Les Grandes Misères de la guerre,' among the first anti-war images, showing soldiers torching a village and cutting down its inhabitants",
        "href": "https://commons.wikimedia.org/wiki/File:Les_mis%C3%A8res_et_les_malheurs_de_la_guerre_-_07_-_Pillage_et_incendie_d%27un_village.png",
        "excerpt": "Callot's small, densely detailed etching shows armed men swarming a village as its houses go up in flames. In the foreground inhabitants are beaten, stabbed, and dragged from their homes while smoke boils over the rooftops. The scene distills war's indiscriminate cruelty toward a defenseless civilian community, the same horror now visited from the sky on El-Obeid.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/sudan-el-obeid-rsf-drone-strikes--art.png",
          "alt": "Jacques Callot's 1633 etching 'Pillage and Burning of a Village': soldiers loot and set fire to a village and kill its inhabitants, mirroring the bombardment of civilians in El-Obeid",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Estragos de la guerra (Ravages of War), Francisco Goya (c. 1810–15, pub. 1863) — plate 30 of 'Los Desastres de la Guerra,' civilians killed in an instant inside their own home by an explosion",
        "href": "https://commons.wikimedia.org/wiki/File:Plate_30_from_%27The_Disasters_of_War%27_(Los_Desastres_de_la_Guerra)-_%27_Ravages_of_War%27_(Estragos_de_la_guerra)_MET_DP817374.jpg",
        "excerpt": "Goya depicts a home collapsing under the blast of a bombardment, its ceiling and walls torn open. A mother and infant, a fallen man, and ordinary household objects are hurled together amid the rubble. The image captures the sudden annihilation of domestic life by a weapon striking from without, the very fate of families killed by drone strikes on a crowded city.",
        "source": "Wikimedia Commons"
      }
    ],
    "rank": 23
  },
  {
    "slug": "chess-federation-suspends-former-champion",
    "headline": "World chess federation suspends a former world champion who accused Daniel Naroditsky of cheating",
    "overview": "The international chess federation has suspended a former world champion who had publicly accused American grandmaster Daniel Naroditsky of cheating, officials said. The governing body took disciplinary action over the unsubstantiated allegations. The case has roiled the elite chess world.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQZXVEdkhVYXBsdTB5VGJZbHF0RXlHbXdLZDVBZ3dRaW1hYlRzZEZNNl92NjZ6aUoyQmNFQjBWN3pQSXZGMmNvcXdZWVlySHVjN3FJNHZIbTd5SHA3SHlTYjd4em5DZFZld09nby03bWZMR1p2UE53cFU1bmlFZm4zbmRqMERadmhrQzZfSjBvLUdnTnQ5ajZrMzdGN3lYSVVpRWk4?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQcVBUblVDVU9IdWtQME1hT2hzQjc3aHVBVmVNaW1PQ1pFS1hzWkEzWkhHNS1paXU3TEFFSldqbml5R2RROW15YzZaM2YyOEdvSXdFM3QtRlQ2MFQ3NXB3OFpHbGd3UGQzVFpmekxIMGZNX2ZpYm1WYU5kV1libWRGT1BXZk5fM0xPSXJMMERlQWFkLXNQSEFILVVhV3QwaVF5SjAtUnE2YlNQTGI4cGfSAbMBQVVfeXFMUHQ0azNyY3JjWjl0a1hHaWc1Nk52ZjZ3b1dUUTVxUWNVME9IQlFGYXQ4TVVUREFsNXRQZk1UQzRYZVV6elJBRDIzUXNoQVhlc3ZZYWRLREY2UGtrQnNYdl9HeXgyU3dRcHRVN24wRkFYWkp0TXhhZVROamZ0WkhFci03UExSeHVqczR1cXdIUHl3cmgySFI2dXpDVWhlaDJ3S2NnZmx6dHZDVGx5WjQxSlZjRGc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/chess-federation-suspends-former-champion.png",
      "alt": "A wooden chessboard mid-game lit from the side, a toppled black king lying beside the remaining pieces.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Maelzel's Chess-Player, Edgar Allan Poe (1836) — a celebrated chess 'automaton' exposed as a fraud, the deception at the heart of the game laid bare",
        "href": "https://en.wikisource.org/wiki/Maelzel%27s_Chess-Player",
        "excerpt": "It is quite certain that the operations of the Automaton are regulated by mind, and by nothing else.",
        "source": "Wikisource"
      },
      {
        "category": "historical",
        "title": "'Oates, Titus' in the Dictionary of National Biography (1885–1900) — the accuser whose sensational plot collapsed into perjury, and who was disgraced, pilloried and whipped for his lies",
        "href": "https://en.wikisource.org/wiki/Dictionary_of_National_Biography,_1885-1900/Oates,_Titus",
        "excerpt": "The prisoner was found guilty upon both indictments, and nine days later Jeffreys deputed Sir Francis Wythens to pronounce sentence.",
        "source": "Wikisource"
      },
      {
        "category": "literary",
        "title": "Othello, William Shakespeare (1603) — Iago's whispered, unfounded slander topples a great man, though 'good name' is 'the immediate jewel' of the soul",
        "href": "https://www.gutenberg.org/files/1531/1531-h/1531-h.htm",
        "excerpt": "Good name in man and woman, dear my lord, / Is the immediate jewel of their souls. / Who steals my purse steals trash.",
        "source": "Project Gutenberg"
      },
      {
        "category": "literary",
        "title": "The Game and Playe of the Chesse, William Caxton (1474) — the medieval 'game of kings' cast as a mirror of wisdom, virtue and just rule",
        "href": "https://www.gutenberg.org/files/10672/10672-h/10672-h.htm",
        "excerpt": "It is a werke of ryght special recomendacion to enforme and to late vnderstonde wysedom and vertue",
        "source": "Project Gutenberg"
      },
      {
        "category": "artistic",
        "title": "Die Schachspieler (The Chess Players), Moritz Retzsch (1831) — a man gambles his soul in a chess match against the Devil, a master poised on the edge of ruin",
        "href": "https://commons.wikimedia.org/wiki/File:Die_Schachspieler_-_Les_joueurs_d%27%C3%A9checs_-_The_Chess_Players.jpg",
        "excerpt": "A young man leans over a chessboard set upon a tomb, locked in a match against a leering Devil who plays for his soul while his guardian angel looks on. The black pieces are carved as the vices—Pride, Deceit, Envy—that will undo him. It is the picture of a player brought to the brink of disgrace by a single, fateful game.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/chess-federation-suspends-former-champion--art.png",
          "alt": "Retzsch's Die Schachspieler: a man playing chess with the Devil for his soul, mirroring a chess master brought low",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Otello, Giuseppe Verdi and Arrigo Boito (1887) — Iago's 'Credo,' the aria of a man who makes lying and false accusation his creed",
        "href": "https://it.wikisource.org/wiki/Otello_(Boito)/Atto_secondo/Scena_seconda",
        "excerpt": "Credo in un Dio crudel che m'ha creato / simile a sè e che nell'ira io nomo.",
        "source": "Wikisource"
      }
    ],
    "rank": 24
  },
  {
    "slug": "congo-ebola-outbreak-worst-ever",
    "headline": "Africa CDC says the Congo Ebola outbreak may be its worst ever and approves a $319 million response",
    "overview": "The Africa Centres for Disease Control and Prevention said the Ebola outbreak in the Democratic Republic of Congo may be the worst on record and approved a $319 million response plan covering the DRC and Uganda, officials said Saturday. Health authorities warned that cases were still climbing. The funding will support treatment, vaccination and containment across the affected regions.",
    "genre": "Science",
    "sources": [
      {
        "name": "AOL",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOYWhhSGdpOHhIbEdxS1JTTDNtRDFtQk5CLVBvTW02Z3lKa0VKSk10dzdnNDB5ZXZjd3VPQWJDczlwRlJUdENROTZTSVdMajdkRUFoeWNJT1R3U2hBWDhKYUlsY3pHSlhQZ3JjT3hPd01HUVBVREd5dHJlZ21IRjBoZHhiOE55Y1E0VldlQTFFM3FOR3VNZVYtLXZWNC1mS2xPTVZONFdLTFA0cjhIN1NTSmlmcXg?oc=5"
      },
      {
        "name": "MSN",
        "href": "https://news.google.com/rss/articles/CBMizgJBVV95cUxPejBWMml6QnhQR2FyMnh1NU1GZlcycXNWYUdKREs5TnZnOUFwSGkyakxiT2FKSkEyQ0xMOW9qZjdlVU1XU3ZlWi1UQy00WG11SnVTc3VOTVc0RU52YVZsZDJmUVoxZG50RGlLdjRiMy1HTVZTalpERUxmc3BrX1lkS1NEbGxlUEtCLWhrQXY0UGcwRjRTT3VINno3VmlGX09VQTZYT1Y5SFhjUWdZeGIwNWJoeC1QSVlJY0NBSUZRNVYtemdfVHRDVUdqZm5DLVlHMkJ1blBPVlctdlF3cjFaZXBlb1BNMlQwNjdpeFp4VWdPWWRCZ0RoUDZmOFU2UVg4XzRrcGlkR3AxN3EwRUM1aUROa19jTHp4SmQwUGVOanF0MXBvUTFzLXVHX1ZkQVF1SHp5dkJ4NzVESTl0dnAwQmNvc3oxazVQbzZvVTRn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/congo-ebola-outbreak-worst-ever.png",
      "alt": "A row of empty protective medical suits and face shields hanging in a dim field-clinic tent.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "History of the Peloponnesian War (Plague of Athens), Thucydides (c. 430 BCE) — an epidemic that outstripped every physician, as the Congo outbreak overwhelms responders",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
        "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often; nor did any human art succeed any better.",
        "source": "Wikisource"
      },
      {
        "category": "historical",
        "title": "History of the Wars (Plague of Justinian), Procopius (c. 550 CE) — a pestilence that respected no border, mirroring warnings that DRC cases are still climbing",
        "href": "https://sourcebooks.fordham.edu/source/542procopius-plague.asp",
        "excerpt": "it embraced the entire world, and blighted the lives of all men, though differing from one another in the most marked degree, respecting neither sex nor age.",
        "source": "Fordham Medieval Sourcebook"
      },
      {
        "category": "literary",
        "title": "The Decameron (Introduction), Giovanni Boccaccio (1353) — medicine helpless before contagion, echoing the scramble for treatment in Congo",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm",
        "excerpt": "To the cure of these maladies nor counsel of physician nor virtue of any medicine appeared to avail or profit aught",
        "source": "Project Gutenberg"
      },
      {
        "category": "literary",
        "title": "A Journal of the Plague Year, Daniel Defoe (1722) — mounting death bills that undercount the true toll, as Africa CDC warns cases keep rising",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm",
        "excerpt": "The second week in June, the parish of St Giles, where still the weight of the infection lay, buried 120, whereof though the bills said but sixty-eight of the plague, everybody said there had been 100 at least",
        "source": "Project Gutenberg"
      },
      {
        "category": "artistic",
        "title": "The Plague of Ashdod, Nicolas Poussin (1630–1631) — a city convulsed by contagion, its dead and dying strewn through the streets like a society under siege",
        "href": "https://commons.wikimedia.org/wiki/File:The_plague_of_ashdod_1630.jpg",
        "excerpt": "Poussin stages a stricken city where the plague-dead sprawl across the foreground and survivors recoil, pinching their noses against the pestilential air. Panic radiates outward as figures flee and mothers collapse over infants, dramatizing a whole community overwhelmed by an unstoppable epidemic. The scene captures exactly the fear behind a $319 million emergency response: contagion outpacing any human effort to contain it.",
        "source": "Wikimedia Commons",
        "image": {
          "src": "/covers/congo-ebola-outbreak-worst-ever--art.png",
          "alt": "Nicolas Poussin's The Plague of Ashdod, showing a city overwhelmed by epidemic dead and dying, paralleling the Congo Ebola outbreak",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Danse macabre, Op. 40, Camille Saint-Saëns (1874) — the old dance of death set to music, evoking pestilence sweeping indiscriminately through the living",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)",
        "excerpt": "Saint-Saëns' tone poem summons Death as a fiddler leading skeletons in a whirling nocturnal dance, a xylophone rattling like dry bones over a feverish waltz. Rooted in the medieval plague-era imagery of the danse macabre, it renders mortality as a force that gathers rich and poor alike into its rhythm. The relentless, accelerating figure resonates with an outbreak Africa CDC fears may be its worst ever, still gathering victims.",
        "source": "IMSLP"
      }
    ],
    "rank": 25
  },
  {
    "slug": "nato-ankara-summit-declaration",
    "headline": "NATO ambassadors approve summit text affirming 'ironclad' Article 5 commitment and €70bn for Ukraine",
    "overview": "NATO ambassadors on Friday approved the declaration for next week's July 7-8 leaders' summit in Ankara, in which all 32 members including US President Donald Trump will reaffirm an \"ironclad commitment\" to collective defence under Article 5 — that \"an attack on one is an attack on all.\" The text also pledges €70 billion ($80 billion) in military aid to Ukraine for 2026, with at least equivalent support in 2027. The wording is striking given Trump's past doubts over whether Washington would defend allies he considers to be underspending on their own security.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1wFBVV95cUxNR21mS1FvbzMzXzlxSUFEVVV5ZENiRktERHRtQ1hycW16UmphZF9RdUEybTVmYjNkOWY4dTFvZ3MyVlZPSnVaLVU2dS1DRjBkempBVkRvd2NROFBkRjlTajI5cjVLSjBxSzlaWmp2Z1RxQVlPaFBJMjQzNUd0VUdFejN1OVItOEhTQUtQU1Zzc2VfU0xQUFgxdWlvZEJfYUROWG9ZMlBhZUNsaTNLWDVzcTc0b2pLc0pRWDBkUGVSbTljVjNudFhGcU84amZSb1dPTzN2TDN0TQ?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPMEJ2U2h1dUV2aFNOZUt1b0NJTkduUEE0RENuNjNqV0JxZjFCNzczV2tnVWNGZXYyOXBTT0s2MkoyYXphVDNCdlZ4bk14cE5NVzhWLThpUEN0NXVSc09WZzVjSG04eDZDMXRJQXdoTjRqRlFNNEZmLTNIRGQtM2c1N3NKUmJYaU53N1FGU1RFUHFaTXM3c2Y3S0hsU3dUVVcxaVRiMlU3b3lZYzgw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/nato-ankara-summit-declaration.png",
      "alt": "A ring of bare flagpoles before a grand government facade under a brooding sky, evoking an alliance closing ranks.",
      "credit": "AI-generated"
    },
    "lead": true,
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "History of the Peloponnesian War, Thucydides (c. 400 BCE) — the Delian League, in which many Greek city-states pooled ships and tribute under Athens for common defence, prefigures NATO's collective-security compact.",
        "excerpt": "The Athenians having thus succeeded to the supremacy by the voluntary act of the allies through their hatred of Pausanias, fixed which cities were to contribute money against the barbarian, which ships; their professed object being to retaliate for their sufferings by ravaging the king's country. Now was the time that the office of 'Treasurers for Hellas' was first instituted by the Athenians. These officers received the tribute, as the money contributed was called. The tribute was first fixed at four hundred and sixty talents. The common treasury was at Delos, and the congresses were held in the temple.",
        "source": "Perseus (Tufts)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0200%3Abook%3D1%3Achapter%3D96"
      },
      {
        "category": "historical",
        "title": "The Federal Charter of 1291, the Three Forest Cantons of Switzerland (1291) — Uri, Schwyz and Unterwalden swear mutual aid 'against one and all,' an early 'attack on one is an attack on all' oath of union.",
        "excerpt": "have promised in good faith to assist each other with aid, with every counsel and every favor, with person and goods, within the valley and without, with might and main, against one and all, who may inflict upon any one of them any violence, molestation or injury, or may plot any evil against their persons or goods.",
        "source": "The Constitution Society (constitution.org)",
        "href": "https://www.constitution.org/cons/swiss/Swiss_Federal_Charter_1291.html"
      },
      {
        "category": "literary",
        "title": "The Three Musketeers, Alexandre Dumas (1844) — the comrades' sworn motto 'All for one, one for all' as the storybook embodiment of a mutual-defence pledge among allies.",
        "excerpt": "“Hold out your hand and swear!” cried Athos and Aramis at once. Overcome by example, grumbling to himself, nevertheless, Porthos stretched out his hand, and the four friends repeated with one voice the formula dictated by D’Artagnan: “All for one, one for all.”",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1257/1257-h/1257-h.htm"
      },
      {
        "category": "literary",
        "title": "The Life of King Henry V, William Shakespeare (1599) — the St Crispin's Day vow that those who fight together become a 'band of brothers,' binding allies by shared blood and sacrifice.",
        "excerpt": "We few, we happy few, we band of brothers; For he to-day that sheds his blood with me Shall be my brother; be he ne'er so vile, This day shall gentle his condition:",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Henry_V_(1918)_Yale/Text/Act_IV"
      },
      {
        "category": "artistic",
        "title": "Oath of the Horatii, Jacques-Louis David (1784) — three brothers swearing a single unified oath of arms to their state, the neoclassical icon of the binding pledge of collective defence.",
        "excerpt": "Three brothers thrust their arms out as one toward their father, who lifts three swords aloft, their taut bodies fused into a single unbending line of resolve. The gesture welds separate wills into one sworn pact—to defend Rome even unto death. David's austere geometry makes the oath itself the subject, rendering mutual commitment as visual law.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/nato-ankara-summit-declaration--art.png",
          "alt": "Jacques-Louis David's Oath of the Horatii: three Roman brothers salute with outstretched arms as their father holds up three swords, swearing a united oath to defend the state.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Symphony No. 9 in D minor, Op. 125 ('Choral'), Ludwig van Beethoven (1824) — the choral finale's setting of Schiller's 'Ode to Joy,' proclaiming all mankind as brothers, an anthem of fraternal union echoing the allies' oath.",
        "excerpt": "In the choral finale Beethoven sets Friedrich Schiller's ode to joy, its massed voices swelling on the vow that all men shall become brothers beneath a loving heaven. The theme rises from one hushed line to a thunderous universal embrace, binding strangers into a single fellowship. Adopted as the Anthem of Europe, it endures as music's supreme hymn of union across nations.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 26
  },
  {
    "slug": "monaco-parcel-bombing-ukrainian-suspect",
    "headline": "Interpol issues Red Notice for Ukrainian woman suspected of Monaco parcel bombing that wounded a sanctioned oligarch",
    "overview": "Monaco's deputy prosecutor said the prime suspect in a parcel bombing in the principality, 39-year-old Anastasiia Berezovska, was \"disguised as a man\" when she left an explosive package in the entrance hall of an apartment building on Monday evening before fleeing on foot and driving to Germany. A sanctioned Ukrainian multi-millionaire, his partner and their 13-year-old son were seriously wounded. Interpol has issued a Red Notice for Berezovska, who speaks German and is wanted for attempted murder, planting an explosive device and criminal conspiracy.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c4gy603z2qlo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxOeVFEX0Zob1hIQnpZTlpfOFVmbkNJcnlKbnZ5WWlqN1BYb2dlR2oyNURsTWhVZmtrU0Y5SDduYWJ4TDNSSXdjekkyT3U5RjZDUFk3dTZGWDFLLXZzc1dUSW9PRzYwRF9TaXBDTUJYOHRuTlF5M0RyN2hCNWMtZ1ZQQm90ckZSVnhTNzZNM1dyV21HX05UUFVlV1lka2pESXFlUU0yMnIya0dod0hDanNCZ3BB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/monaco-parcel-bombing-ukrainian-suspect.png",
      "alt": "A single smartphone-lit parcel on a dim marble entrance-hall floor, tense and deserted, evoking a hidden explosive device.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Book of Judges 3:15-26, King James Bible (1611) — an assassin conceals a dagger, stabs the tyrant in his private chamber, then bolts the doors and escapes",
        "excerpt": "And Ehud came unto him; and he was sitting in a summer parlour, which he had for himself alone. And Ehud said, I have a message from God unto thee. And he arose out of his seat. And Ehud put forth his left hand, and took the dagger from his right thigh, and thrust it into his belly: And the haft also went in after the blade; and the fat closed upon the blade, so that he could not draw the dagger out of his belly; and the dirt came out. Then Ehud went forth through the porch, and shut the doors of the parlour upon him, and locked them... And Ehud escaped while they tarried, and passed beyond the quarries, and escaped unto Seirath.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges"
      },
      {
        "category": "historical",
        "title": "The French Revolution: A History, Thomas Carlyle (1837) — a woman draws a concealed knife and kills the powerful demagogue Marat with a single stroke to the heart",
        "excerpt": "Their heads shall fall within a fortnight, croaks the eager People's-Friend, clutching his tablets to write: Barbaroux, Petion, writes he with bare shrunk arm, turning aside in the bath: Petion, and Louvet, and—Charlotte has drawn her knife from the sheath; plunges it, with one sure stroke, into the writer's heart. 'A moi, chere amie, Help, dear!' No more could the Death-choked say or shriek... but his life with a groan gushes out, indignant, to the shades below. And so Marat People's-Friend is ended; the lone Stylites has got hurled down suddenly from his Pillar.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1301/pg1301.txt"
      },
      {
        "category": "literary",
        "title": "The Book of Judith, Chapter 13 (King James Bible, Apocrypha) — a woman who uses stratagem and disguise to get close to a powerful commander and behead him in his own bed",
        "excerpt": "Then she came to the pillar of the bed, which was at Holofernes' head, and took down his fauchion from thence, And approached to his bed, and took hold of the hair of his head, and said, Strengthen me, O Lord God of Israel, this day. And she smote twice upon his neck with all her might, and she took away his head from him, And tumbled his body down from the bed, and pulled down the canopy from the pillars; and anon after she went forth, and gave Holofernes his head to her maid;",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judith"
      },
      {
        "category": "literary",
        "title": "Agamemnon, Aeschylus (458 BCE), trans. Herbert Weir Smyth — a woman's premeditated vengeance, snaring a mighty man in a robe and striking him down",
        "excerpt": "as if to catch a haul of fish, I cast an impassable net—fatal wealth of robe—so that he should neither escape nor ward off doom. Twice I struck him, and with two groans his limbs relaxed. Once he had fallen, I dealt him yet a third stroke to grace my prayer to the infernal Zeus, the savior of the dead.",
        "source": "Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0004:card=1372"
      },
      {
        "category": "artistic",
        "title": "Judith Slaying Holofernes, Artemisia Gentileschi (c. 1620, Uffizi) — a woman killing a powerful man rendered in unflinching, visceral detail",
        "excerpt": "Gentileschi stages the biblical killing as a brutal, close-quarters struggle: Judith and her maidservant pin the thrashing Holofernes to the bed while she saws through his neck, blood spraying across the white sheets. The powerful general's strength is useless against the resolve of two determined women. The picture is often read as the artist's own defiant answer to the men who had wronged her.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Judith_Slaying_Holofernes_by_Artemisia_Gentileschi.jpg",
        "image": {
          "src": "/covers/monaco-parcel-bombing-ukrainian-suspect--art.png",
          "alt": "Artemisia Gentileschi's painting Judith Slaying Holofernes: two women hold down a man on a bed as one beheads him with a sword, blood streaming across white sheets.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "'Der Hölle Rache kocht in meinem Herzen' from Die Zauberflöte, W. A. Mozart / libretto Emanuel Schikaneder (1791) — a vengeful woman's aria commanding the death of a powerful man",
        "excerpt": "Der Hölle Rache kocht in meinem Herzen, Tod und Verzweiflung flammet um mich her! Fühlt nicht durch dich Sarastro Todesschmerzen, So bist du meine Tochter nimmermehr.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Die_Zauberfl%C3%B6te,_K.620_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 27
  },
  {
    "slug": "us-withdraws-troops-nigeria-isis",
    "headline": "US withdraws about 200 troops from Nigeria after joint operation against Islamic State in the Lake Chad Basin",
    "overview": "The United States has pulled out most of the roughly 200 soldiers it deployed to Nigeria earlier this year to help fight Islamist militants, saying the months-long joint operation in the Lake Chad Basin had \"significantly degraded\" Islamic State's leadership. The mission, launched in December with strikes on Christmas Day, killed senior IS commander Abu-Bilal al-Minuki. Nigeria's military said the withdrawal would \"not affect our momentum,\" even as jihadist groups continue to stage attacks across the country's north-east.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwylkvpl80xo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQcldNbzFNWDVFNE1PZ2RIYjV1RGx3cUlGNHQzd1NEczRFUl9DeGpYMWwyZHhCcTFEX3JiYnZsMTZPRFl4eVJHbElValByaVhxMXEzYVROdzZ4Vk4wZmtKb1ozVWRITFRxUXV3dGdKR212YTZMWmc5NE50MkxhMWJjMWUwakh1NzkxdWZTZUdoNDV5MlgyYnFSV21oVnB1Z1FhdFBQQkVhUERyb2MwaW9ILXpEaFhmQVBzeWxCREM0a2U?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/us-withdraws-troops-nigeria-isis.png",
      "alt": "A remote Sahel airstrip at dawn with an idle transport aircraft and empty desert, evoking soldiers departing after a campaign.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Anabasis (The March of the Ten Thousand), Book IV",
        "excerpt": "Presently they could hear the soldiers shouting and passing on the joyful word, \"The sea! the sea!\" Thereupon they began running, rearguard and all, and the baggage animals and horses came galloping up. But when they had reached the summit, then indeed they fell to embracing one another--generals and officers and all--and the tears trickled down their cheeks.",
        "source": "Xenophon, trans. H. G. Dakyns (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1170/pg1170.txt"
      },
      {
        "category": "historical",
        "title": "Commentaries on the Gallic War, Book V (Caesar withdraws his army from Britain)",
        "excerpt": "When he had received the hostages, he leads back the army to the sea, and finds the ships repaired. After launching these, because he had a large number of prisoners, and some of the ships had been lost in the storm, he determines to convey back his army at two embarkations.",
        "source": "Julius Caesar, trans. W. A. McDevitte & W. S. Bohn (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/10657/pg10657.txt"
      },
      {
        "category": "literary",
        "title": "The Odyssey, Book I (the longing for a soldier's return)",
        "excerpt": "This daughter of Atlas has got hold of poor unhappy Ulysses, and keeps trying by every kind of blandishment to make him forget his home, so that he is tired of life, and thinks of nothing but how he may once more see the smoke of his own chimneys.",
        "source": "Homer, trans. Samuel Butler (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "literary",
        "title": "The Return",
        "excerpt": "Peace is declared, and I return\nTo 'Ackneystadt, but not the same;\nThings 'ave transpired which made me learn\nThe size and meanin' of the game.\n\nIf England was what England seems\nAn' not the England of our dreams,\nBut only putty, brass, an' paint,\n'Ow quick we'd drop 'er! But she ain't!",
        "source": "Rudyard Kipling, from The Five Nations (1903), text via The Kipling Society",
        "href": "https://www.kiplingsociety.co.uk/poem/poems_return.htm"
      },
      {
        "category": "artistic",
        "title": "The Remnants of an Army (Jellalabad, January 13, 1842)",
        "excerpt": "A lone, swaying rider on a spent horse emerges from an empty Afghan waste toward the walls of Jalalabad: Dr. William Brydon, cast by legend as the sole survivor of an army of some 16,000 destroyed on the 1842 retreat from Kabul. Lady Butler paints not the victory that launched the campaign but its bitter remnant, the whole expedition reduced to one exhausted man. It is the image of a foreign intervention's homeward road at its most desolate.",
        "source": "Elizabeth Thompson (Lady Butler), oil on canvas, 1879, Tate (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Remnants_of_an_army2.jpg",
        "image": {
          "src": "/covers/us-withdraws-troops-nigeria-isis--art.png",
          "alt": "Elizabeth Thompson (Lady Butler), 'The Remnants of an Army' (1879): a lone exhausted rider on a stumbling horse approaches the walls of Jalalabad across an empty plain, the sole survivor of the 1842 retreat from Kabul.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "\"See, the Conqu'ring Hero Comes\" (chorus and march), from Judas Maccabaeus, HWV 63",
        "excerpt": "See, the conqu'ring hero comes! Sound the trumpets, beat the drums! Sports prepare, the laurel bring, Songs of triumph to him sing!",
        "source": "George Frideric Handel (music) & Thomas Morell (libretto), 1747 (public domain); score at IMSLP",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      }
    ],
    "rank": 28
  },
  {
    "slug": "iran-oil-sales-japan-waiver",
    "headline": "Iran opens talks to sell oil to Japanese buyers for the first time since 2019, seeking a longer US sanctions waiver",
    "overview": "Iran has begun talks to sell crude to Japanese companies for the first time since 2019, though prospective buyers want Washington to extend a temporary sanctions waiver and to guarantee safe shipping through the Gulf, sources told Reuters. The waiver, part of 60-day peace talks between Tehran and Washington, was issued on June 22 and expires on August 21 — too soon, buyers say, given the weeks-long voyage from Iran to Japan. China has been Iran's main oil customer since President Trump withdrew from the nuclear deal in 2018.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxONlpxZVF6RnlianRMXzVTT05hLXpuT3FCY3pCRzMweXJjUDF5N2pJa3hYOXJzdTFpMTJpWUhKckZZWlllM2pVbzRFcGQ3SUlKZWRyNmRNaW9hNWdBNEU1d2JLYnp2YWJxU2doQXl2bVdZTDlMaWJFbHJiR19VZFVwTHAydHZudzdEN0xJWTdsczNkSmQtZVNUb0FJcjVhV0NSWWJDNEVvcFE1M0RTM2VnSFFPRm1tNGpwTklqSXdUYklQZWIy?oc=5"
      },
      {
        "name": "The Times of Israel",
        "href": "https://www.timesofisrael.com/liveblog_entry/iran-in-talks-with-japanese-companies-to-sell-oil-under-us-sanctions-waiver-sources-say/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/iran-oil-sales-japan-waiver.png",
      "alt": "A vast oil supertanker threading a narrow moonlit strait between dark headlands, evoking sanctioned crude returning to market.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "History of the Peloponnesian War, Book 1.139, Thucydides (c. 431 BCE) — Sparta's ultimatum that war could be averted only by revoking the Megarian Decree, an embargo shutting Megara out of Athenian harbors and markets",
        "excerpt": "Above all, it gave her most distinctly to understand that war might be prevented by the revocation of the Megara decree, excluding the Megarians from the use of Athenian harbors and of the market of Athens.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0200%3Abook%3D1%3Achapter%3D139"
      },
      {
        "category": "historical",
        "title": "The Japan Expedition: Japan and Around the World, J. W. Spalding (1855) — a firsthand account of Commodore Perry's squadron sent to force open the ports of a nation sealed for two centuries and open its sources of trade",
        "excerpt": "The cruel treatment which had long been practised by that singular and secluded people, the Japanese, toward American whalers who were thrown by the misfortune of shipwreck upon their coasts, the incentive of mercantile cupidity, and the urgency of personal ambition, induced the government of the United States, in 1852, to project an expedition to Japan, to obtain some assurance from the government of the country against a continuance or repetition of the inhospitality and cruelty inflicted upon our unfortunate citizens, and, if possible, to open the sources of trade.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/60403/pg60403-images.html"
      },
      {
        "category": "literary",
        "title": "The Merchant of Venice",
        "excerpt": "My ventures are not in one bottom trusted, Nor to one place; nor is my whole estate Upon the fortune of this present year. Therefore my merchandise makes me not sad.",
        "source": "William Shakespeare, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm"
      },
      {
        "category": "literary",
        "title": "The First Voyage of Sindbad the Sailor, from The Arabian Nights' Entertainments",
        "excerpt": "I sold all my household goods by public auction, and joined a company of merchants who traded by sea, embarking with them at Balsora in a ship which we had fitted out between us. We set sail and took our course towards the East Indies by the Persian Gulf, having the coast of Persia upon our left hand and upon our right the shores of Arabia Felix.",
        "source": "Andrew Lang (ed.), via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/128/128-h/128-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Black Ship Scroll (anonymous, 1854)",
        "excerpt": "An anonymous Japanese handscroll from 1854 records the arrival of Commodore Perry's black ships as awestruck local eyes first saw them. Painted the very year Japan's ports were forced open, it captures the moment a sealed nation confronted foreign vessels riding at anchor in its waters. The scroll turns a diplomatic rupture into an intimate visual chronicle of a closed market meeting the outside world.",
        "source": "Wikimedia Commons (Honolulu Museum of Art)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Black_Ship_Scroll,_anonymous,_1854,_handscroll,_Honolulu_Museum_of_Art,_2732.1.jpg",
        "image": {
          "src": "/covers/iran-oil-sales-japan-waiver--art.png",
          "alt": "Detail from the 1854 Japanese Black Ship Scroll depicting Commodore Perry's foreign vessels arriving in Japanese waters.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Meeresstille und gluckliche Fahrt (Calm Sea and Prosperous Voyage), Op. 27",
        "excerpt": "Mendelssohn's 1828 concert overture opens on a becalmed, motionless sea, a stillness that once spelled danger for a merchant vessel dead in the water. Then the winds rise, the strings quicken, and the music carries the ship safely onward to a triumphant arrival in port. It is a musical portrait of anxious waiting giving way to safe passage across the water, the very reassurance that traders now seek through the Gulf.",
        "source": "Felix Mendelssohn, via IMSLP",
        "href": "https://imslp.org/wiki/Meeresstille_und_gl%C3%BCckliche_Fahrt,_Op.27_(Mendelssohn,_Felix)"
      }
    ],
    "rank": 29
  },
  {
    "slug": "russia-fuel-crisis-imports-rationing",
    "headline": "Facing fuel shortages from Ukrainian drone strikes, Russia moves to import gasoline by sea and rations pumps",
    "overview": "Ukrainian drone strikes have knocked out roughly a quarter of Russia's oil-refining capacity, plunging the country into a summer fuel crisis that has forced the Black Sea port of Novorossiysk to suspend gasoline sales to private drivers and pushed Moscow toward importing motor fuel by sea for the first time — a historic reversal for a major oil exporter. Many stations are rationing drivers to 20-30 litres each. President Vladimir Putin publicly shrugged off the shortages even as he intensified attacks on Ukraine.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQNy1VbDFEWnlxYTVzNHpibkVYcmF4cmdPNVFXLVlYbW1rTFktQm5xaXZVN3B1cktjUmJLNWNXUWZZWk40Y0taZWdfb2dmMVdkTVBxTWZleUJQR0t2c3J5WUxPMEd4Y1hNSkNCYzBhckJySGg1Y0dHclhQQlZ3SVJsQzYyWUg2aWpYZTV4Yl9ZbWhzN0lLd29KRGpiTVhlY3pXczRzejZfSUxvYzlBVUZSMXFrT3ZoMDdYSUZ0ek82VXpidF9IOGs0?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNZkg1ZzBwMDZqYVhHLUwtUWhNbWd2eVJkOGdFcDJHZUxKWTRFc3MyZTdoWHpKczlmVTgwR2R5QjQwU0lhUmJNOVYydlppNHR3emVMaEVuQW9GY1RHU1pHVFhYcDRBeWZHcG1sVjFFYWp2blNseUZjVjRHampXU3BPeHVsWDZBMGhOUVJaaWF5dzN1bWdocWR5eFA1MU90ZlQ5cUhvTHEySXJ6LUsw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/russia-fuel-crisis-imports-rationing.png",
      "alt": "A large oil refinery at night with a flare stack burning orange against a black sky, evoking energy infrastructure struck in war.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Book of Genesis, attributed to Moses (King James Version, 1611) — Joseph stockpiles grain in Egypt's years of plenty, then rations the stores when a land of abundance is struck by famine",
        "excerpt": "47 And in the seven plenteous years the earth brought forth by handfuls. 48 And he gathered up all the food of the seven years, which were in the land of Egypt, and laid up the food in the cities: the food of the field, which was round about every city, laid he up in the same. 49 And Joseph gathered corn as the sand of the sea, very much, until he left numbering; for it was without number. ... 53 And the seven years of plenteousness, that was in the land of Egypt, were ended. 54 And the seven years of dearth began to come, according as Joseph had said: and the dearth was in all lands; but in all the land of Egypt there was bread. 55 And when all the land of Egypt was famished, the people cried to Pharaoh for bread: and Pharaoh said unto all the Egyptians, Go unto Joseph; what he saith to you, do. 56 And the famine was over all the face of the earth: And Joseph opened all the storehouses, and sold unto the Egyptians; and the famine waxed sore in the land of Egypt.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "historical",
        "title": "The Wars of the Jews, Flavius Josephus (c. 75 AD, Whiston translation) — a wealthy Jerusalem, besieged and cut off from supply, is reduced to a horror of famine and rationing during the Roman siege",
        "excerpt": "It was now a miserable case, and a sight that would justly bring tears into our eyes, how men stood as to their food, while the more powerful had more than enough, and the weaker were lamenting [for want of it.] But the famine was too hard for all other passions, and it is destructive to nothing so much as to modesty; for what was otherwise worthy of reverence was in this case despised; insomuch that children pulled the very morsels that their fathers were eating out of their very mouths, and what was still more to be pitied, so did the mothers do as to their infants; and when those that were most dear were perishing under their hands, they were not ashamed to take from them the very last drops that might preserve their lives.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2850/pg2850.txt"
      },
      {
        "category": "literary",
        "title": "The Ants and the Grasshopper",
        "excerpt": "The Ants were spending a fine winter's day drying grain collected in the summertime. A Grasshopper, perishing with famine, passed by and earnestly begged for a little food. The Ants inquired of him, 'Why did you not treasure up food during the summer?' He replied, 'I had not leisure enough. I passed the days in singing.' They then said in derision: 'If you were foolish enough to sing all the summer, you must dance supperless to bed in the winter.'",
        "source": "Aesop's Fables (trans. George Fyler Townsend)",
        "href": "https://www.gutenberg.org/files/21/21-h/21-h.htm"
      },
      {
        "category": "literary",
        "title": "Water, Water, Every Where",
        "excerpt": "Water, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancient Mariner (Sibylline Leaves, 1817)",
        "href": "https://en.wikisource.org/wiki/Sibylline_Leaves_(Coleridge)/The_Rime_of_the_Ancient_Mariner"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons, October 16, 1834",
        "excerpt": "Turner turns a national disaster into a blaze of pure light: the seat of a great power dissolves into towering sheets of fire that pour their reflection across the Thames. Crowds press along the bank and bridge, dwarfed and helpless before flames the painter deliberately magnified. It is an image of the mighty consumed, infrastructure burning while spectators can only watch.",
        "source": "J. M. W. Turner (Philadelphia Museum of Art)",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/russia-fuel-crisis-imports-rationing--art.png",
          "alt": "Turner's oil painting of the Houses of Parliament engulfed in golden flames that blaze into the night sky and reflect across the River Thames, with crowds of spectators gathered on the riverbank and Westminster Bridge.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Magic Fire Music (Feuerzauber) from Die Walkure",
        "excerpt": "As the opera closes, Wotan summons Loge and a ring of flame rises to encircle the sleeping Brunnhilde. Wagner's shimmering, flickering strings and glowing brass conjure fire that both punishes and protects, an all-consuming blaze born of a god's own decree. It is the sound of a mighty power ringed by the flames of its own making.",
        "source": "Richard Wagner, Die Walkure, WWV 86B (IMSLP)",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)"
      }
    ],
    "rank": 30
  },
  {
    "slug": "tesla-robotaxi-miami",
    "headline": "Tesla launches its driverless robotaxi service in Miami, its third US market",
    "overview": "Tesla said on Friday that its robotaxi is now available in Miami, expanding the driverless ride-hailing service into a third US state as chief executive Elon Musk pivots the company toward AI and robotics. Miami joins Austin — where the unsupervised service launched last summer — along with Dallas, Houston, San Antonio and the San Francisco Bay Area. The rollout, which initially covers a small mapped zone, sharpens Tesla's competition with Alphabet's Waymo and Amazon's Zoox.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxOYVpPc3UwY3ZUR3huTGF5MWU4YWpKMW1BOXlkTURObnJfaXVjclAtREdhaDk1QnlVd0d5MGV1WG83cXRmd29KRXdXcThIRkhPbnM3RW9jOFhrdEIyb3dFejVNOHU0ckdlTkJtVnpMcU10WldGc3g2RGJOWlNMRjdNZms3R2FnOGk5NU12dUFLNUtmT0dnb1kzWE5SZzZoZ1BqUGNOY2xWNA?oc=5"
      },
      {
        "name": "Electrek",
        "href": "https://electrek.co/2026/07/03/tesla-robotaxi-miami-service-area-map/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/tesla-robotaxi-miami.png",
      "alt": "A driverless white electric car waiting on a palm-lined Miami street at dusk, evoking autonomous ride-hailing.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Politics, Aristotle (c. 350 BCE) — the ancient thought-experiment of self-working tools that would make human drivers and servants unnecessary, now literalized by Tesla's driverless robotaxi",
        "excerpt": "And every assistant is as it were a tool that serves for several tools; for if every tool could perform its own work when ordered, or by seeing what to do in advance, like the statues of Daedalus in the story, or the tripods of Hephaestus which the poet says 'enter self-moved the company divine,'—if thus shuttles wove and quills played harps of themselves, master-craftsmen would have no need of assistants and masters no need of slaves.",
        "source": "Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0058%3Abook%3D1%3Asection%3D1253b"
      },
      {
        "category": "historical",
        "title": "The Iliad, Homer (c. 8th century BCE) — Hephaestus's self-moving golden tripods that roll to the gods' assembly of their own accord, myth's first driverless vehicles anticipating the autonomous robotaxi",
        "excerpt": "for he was fashioning tripods, twenty in all, to stand around the wall of his well-builded hall, and golden wheels had he set beneath the base of each that of themselves they might enter the gathering of the gods at his wish and again return to his house, a wonder to behold.",
        "source": "Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D18%3Acard%3D368"
      },
      {
        "category": "literary",
        "title": "Hephaestus's self-moving tripods and golden handmaids in the Iliad",
        "excerpt": "She found him busy with his bellows, sweating and hard at work, for he was making twenty tripods that were to stand by the wall of his house, and he set wheels of gold under them all that they might go of their own selves to the assemblies of the gods, and come back again—marvels indeed to see. … There were golden handmaids also who worked for him, and were like real young women, with sense and reason, voice also and strength, and all the learning of the immortals …",
        "source": "Homer, The Iliad, Book XVIII, trans. Samuel Butler (1898)",
        "href": "https://www.gutenberg.org/files/2199/2199-h/2199-h.htm"
      },
      {
        "category": "literary",
        "title": "Karel Čapek's R.U.R. and the soulless manufactured worker",
        "excerpt": "My dear Miss Glory, the Robots are not people. Mechanically they are more perfect than we are; they have an enormously developed intelligence, but they have no soul.",
        "source": "Karel Čapek, R.U.R. (Rossum's Universal Robots), trans. Paul Selver & Nigel Playfair (1923)",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm"
      },
      {
        "category": "artistic",
        "title": "Luigi Russolo, Dynamism of a Car (1913)",
        "excerpt": "A Futurist hymn to the automobile: Russolo shatters a speeding car into a wedge of hard red and violet triangles, chevrons of force streaming backward from its nose. There is no driver and barely a road—only pure velocity, the machine dissolving into the energy of its own motion. It captures the era's intoxication with the self-propelled vehicle as a new kind of living, roaring being.",
        "source": "Luigi Russolo, Dinamismo di un'automobile (Dynamism of a Car), 1913, oil on canvas, Musée National d'Art Moderne, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Luigi_Russolo_dynamism-of-a-car-1913.jpg",
        "image": {
          "src": "/covers/tesla-robotaxi-miami--art.png",
          "alt": "Luigi Russolo's 1913 Futurist painting Dynamism of a Car, a speeding automobile fragmented into overlapping red, blue and violet triangular wedges suggesting rushing motion.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231 (1923)",
        "excerpt": "Honegger's orchestral movement portrays a steam locomotive as a machine with a will of its own: it wakes at a standstill, gathers its breathing mass of iron, then accelerates through churning ostinatos to a hurtling, thunderous full speed. The orchestra becomes the engine, driven not by a human hand but by its own relentless mechanical momentum. It is the machine age set to music—awe and menace in the same roaring pulse.",
        "source": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1), composed 1923, first published Paris: Senart, 1924",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      }
    ],
    "rank": 31
  },
  {
    "slug": "india-tata-apple-iphone-leak",
    "headline": "India investigates Tata Electronics breach after ransomware group leaks unreleased Apple iPhone 18 Pro data",
    "overview": "India's IT ministry said it is investigating a data breach at Tata Electronics, an Apple supplier, after a ransomware group posted sensitive component and supplier lists and photographs of the unreleased iPhone 18 Pro on the dark web. IT secretary S. Krishnan said the incident had been reported to India's Computer Emergency Response Team, and Tata has hired a global consultant for a forensic audit. Documents belonging to Tesla, Qualcomm and TSMC were reportedly caught up in the same leak.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPYnNPUm9SdmFzZVBkODdSeUxOc3Joa2FtenhfaWlvVU5OVWMzMXNqVVVQdF9OcllPS3pUdjg5cF9GeTZPanZ4bHdzdmIzVGtZVGZ6Q18zd3dGVk9iNkpjNjAwQ1p0Z05xajZDbWVULXpDN3pmOFNza091RERiOHFNcmpfVFV0d2tVcEswSnNZeFJhcmU2R2Q5SEp4Y3ZGcy1zdU5mZ2NVNkFFY1NzVFEwbGExTHlid28?oc=5"
      },
      {
        "name": "Business Standard",
        "href": "https://www.business-standard.com/industry/news/govt-investigates-tata-electronics-breach-after-apple-iphone-data-leak-126070300679_1.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/india-tata-apple-iphone-leak.png",
      "alt": "A dim data hall of glowing server cabinets with one aisle sealed shut, evoking a corporate breach and stolen secrets.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "History of the Wars, Procopius (c. 550 CE) — monks smuggle the jealously guarded secret of silk out of the East, just as a gang exfiltrates Apple's guarded iPhone designs",
        "excerpt": "At about this time certain monks, coming from India and learning that the Emperor Justinian entertained the desire that the Romans should no longer purchase their silk from the Persians, came before the emperor and promised so to settle the silk question that the Romans would no longer purchase this article from their enemies, the Persians, nor indeed from any other nation... They then once more went to Serinda and brought back the eggs to Byzantium, and in the manner described caused them to be transformed into worms, which they fed on the leaves of the mulberry; and thus they made possible from that time forth the production of silk in the land of the Romans.",
        "source": "penelope.uchicago.edu",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Wars/8C*.html"
      },
      {
        "category": "historical",
        "title": "The Histories, Herodotus (c. 430 BCE) — a hidden message is smuggled out tattooed on a slave's shaved head, prefiguring a secret conveyed past its guardians to the world",
        "excerpt": "Since Histiaeus desired to give word to Aristagoras that he should revolt and had no other safe way of doing so because the roads were guarded, he shaved and branded the head of his most trustworthy slave. He waited till the hair had grown again, and as soon as it was grown, he sent the man to Miletus with no other message except that when he came to Miletus he must bid Aristagoras shave his hair and examine his head. The writing branded on it signified revolt, as I have already said.",
        "source": "perseus.tufts.edu",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D5%3Achapter%3D35"
      },
      {
        "category": "literary",
        "title": "Prometheus Bound",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, Prometheus Bound (T. A. Buckley translation)",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "literary",
        "title": "Pandora opens the jar",
        "excerpt": "But the woman took off the great lid of the jar with her hands and scattered all these and her thought caused sorrow and mischief to men. Only Hope remained there in an unbreakable home within under the rim of the great jar, and did not fly out at the door.",
        "source": "Hesiod, Works and Days (Hugh G. Evelyn-White translation, 1914)",
        "href": "https://www.theoi.com/Text/HesiodWorksDays.html"
      },
      {
        "category": "artistic",
        "title": "Prometheus Bound",
        "excerpt": "Rubens's monumental canvas seizes the instant of divine retribution: the Titan who stole heaven's fire sprawls backward across his rock, chained, as Jupiter's eagle drives its talons into his face and tears at his liver. The pilfered gift of the gods is answered with an unending, public punishment.",
        "source": "Peter Paul Rubens (with Frans Snyders), 1611–1618, Philadelphia Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens,_Flemish_(active_Italy,_Antwerp,_and_England)_-_Prometheus_Bound_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/india-tata-apple-iphone-leak--art.png",
          "alt": "Peter Paul Rubens's Baroque painting Prometheus Bound, depicting the chained Titan wracked by an eagle as punishment for stealing fire from the gods.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Prometheus, Symphonic Poem No. 5, S.99",
        "excerpt": "Liszt's symphonic poem, drawn from the myth of the fire-thief, opens in storm and defiance—jagged, restless music evoking suffering endured for a stolen gift. Out of the turbulence a fugue strives upward toward deliverance, the sound of forbidden knowledge let loose upon the world and never to be recalled.",
        "source": "Franz Liszt, 1850 (revised 1855)",
        "href": "https://imslp.org/wiki/Prometheus,_S.99_(Liszt,_Franz)"
      }
    ],
    "rank": 32
  },
  {
    "slug": "turkey-detains-comedian-erdogan",
    "headline": "Turkish court jails popular stand-up comedian Deniz Göktaş over jokes about Erdogan and Islam",
    "overview": "A court in Istanbul placed stand-up comedian Deniz Göktaş under arrest after he was detained at the city's main airport over a routine that has drawn 9.4 million views on YouTube. Göktaş, one of Turkey's most popular comics, is accused of \"inciting hatred and hostility\" and of insulting President Recep Tayyip Erdoğan. His arrest is the latest in a widening crackdown on dissent that has swept up journalists, activists and LGBT+ groups, with more than 200 people detained ahead of next week's NATO summit in Ankara.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c36yrlzew39o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/turkey-detains-comedian-erdogan.png",
      "alt": "A lone stand-up microphone under a hot spotlight on a dark empty stage, evoking a silenced comedian.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Annals, Tacitus (c. AD 116) — the historian Cremutius Cordus is prosecuted for his writings and his books ordered burned, and defends the writer's freedom to speak",
        "excerpt": "Tacitus records how, under Tiberius, the historian Cremutius Cordus was dragged before the Senate and driven to his death for having praised Brutus and Cassius in his histories, with his books condemned to be burned. In his defence he insists it is his words alone, not any deed, that are on trial: \"It is my words, Senators, which are condemned, so innocent am I of any guilty act; yet these do not touch the emperor or the emperor's mother, who are alone comprehended under the law of treason. I am said to have praised Brutus and Cassius, whose careers many have described and no one mentioned without eulogy.\" Like the comedian jailed for jokes aimed at the ruler, a writer is punished by the state purely for what he said.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D4%3Achapter%3D34"
      },
      {
        "category": "historical",
        "title": "Tristia, Ovid (AD 9–12) — the poet, banished by the emperor Augustus for \"a poem and a mistake,\" laments that he was punished for his verse",
        "excerpt": "Writing from exile on the Black Sea, to which Augustus had relegated him, Ovid traces his ruin to his own writing. In Book 2, addressed to the emperor himself, he names the twin causes of his downfall: \"perdiderint cum me duo crimina, carmen et error\" (\"since two crimes, a poem and a blunder, have destroyed me\"). As with the comedian imprisoned for mocking the ruler, it is an artist punished by an all-powerful state for the words of his art—here, carmen et error, the poem itself the offence.",
        "source": "Perseus",
        "href": "https://scaife.perseus.org/reader/urn:cts:latinLit:phi0959.phi008.perseus-lat2:2/"
      },
      {
        "category": "literary",
        "title": "The Fool whipped for speaking true in Shakespeare's King Lear",
        "excerpt": "I marvel what kin thou and thy daughters are: they'll have me whipped for speaking true, thou'lt have me whipped for lying; and sometimes I am whipped for holding my peace.",
        "source": "William Shakespeare, King Lear, Act I, Scene IV",
        "href": "https://shakespeare.mit.edu/lear/lear.1.4.html"
      },
      {
        "category": "literary",
        "title": "Aristophanes lampoons the demagogue Cleon in The Knights",
        "excerpt": "Easy as lying! Do as now you do. Turn every question to a public stew. Hash things, and cook things. Win the common herd By strong sweet sauces in your every word. For other gifts, you have half the catalogue Already, for the perfect demagogue; A blood-shot voice, low breeding, huckster's tricks— What more can man require for politics?",
        "source": "Aristophanes, The Knights, trans. Gilbert Murray (Gutenberg Canada)",
        "href": "https://gutenberg.ca/ebooks/murrayaristophanes-knights/murrayaristophanes-knights-00-h.html"
      },
      {
        "category": "artistic",
        "title": "Velázquez's dignified portrait of the court jester Don Diego de Acedo (El Primo)",
        "excerpt": "Velázquez painted the jesters and fools of Philip IV's court not as objects of ridicule but as grave, intelligent human beings, seating El Primo among books and papers with the composure of a scholar. The portrait dignifies the very figure a court kept to be laughed at—the licensed fool who, precisely because he was a fool, could speak freely to the king. It is a quiet argument that the jester is a person of substance, not merely a target for royal amusement or royal anger.",
        "source": "Diego Velázquez, El bufón don Diego de Acedo, el Primo (c. 1644), Museo del Prado",
        "href": "https://commons.wikimedia.org/wiki/File:Diego_Vel%C3%A1zquez_-_Don_Diego_de_Acedo_(El_Primo)_-_WGA24436.jpg",
        "image": {
          "src": "/covers/turkey-detains-comedian-erdogan--art.png",
          "alt": "Velázquez's portrait of the court dwarf and jester Don Diego de Acedo, called El Primo, seated in black dress reading a large book with papers at his feet.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Mussorgsky's satirical 'Song of the Flea', mocking a king who ennobles a pest",
        "excerpt": "Setting Mephistopheles' cabaret song from Goethe's Faust, Mussorgsky tells of a king who so doted on a flea that he dressed it in velvet, made it a minister, and let it and its relatives torment the whole court—while no one dared to scratch. The music's mock-solemn strut and jeering laughter turn the fable into a biting caricature of tyranny and the sycophancy that surrounds a ruler. It is comedy aimed squarely at power, the singer as jester exposing a court that fawns on absurd favourites and punishes anyone who complains.",
        "source": "Modest Mussorgsky, Mephistopheles' Song of the Flea (1879), IMSLP",
        "href": "https://imslp.org/wiki/Mephistopheles'_Song_of_the_Flea_(Mussorgsky,_Modest)"
      }
    ],
    "rank": 33
  },
  {
    "slug": "canada-alberta-westcoast-oil-pipeline",
    "headline": "Canada and Alberta advance a new one-million-barrel West Coast oil pipeline to reach Asian markets",
    "overview": "Prime Minister Mark Carney advanced a new Pacific Coast pipeline that would carry more than one million barrels a day of Alberta crude from Bruderheim, near Edmonton, to the southern British Columbia coast for export to Asia — part of his goal to double Canada's non-US exports within a decade and blunt the price discount on oil sold to the United States. The federally owned Trans Mountain Corporation and Calgary's Pembina Pipeline are partners, with construction possible as early as September 2027. BC Premier David Eby secured a commitment to keep the province's northern tanker ban in place.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPTXZHUGpMQ2FTRDhycnBEbWNWc1Zic0NKeWQ5Um5QUWEzR2lBckZZWjhOdV9pc3FaNno3elFXS2kzQzBGTHJLc2lUNDlmbDI4LVhqdVJVUGZBWWFtTGRjNUZVYXhOZkgyOTN5V09DeDFyV3ZHeC1McVFpemVhM0VXVnN3cWVqbDd2d0ZWZTdOM21aUEVvOXUxcllfYUlCSHQ0V3prTV93?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQa3V6aW03b3B2UUh6ek54ZG9nSGJJOVlldWZnNG54ZzJqWVd2d000LU1WRUZqM2FpSmN5S2ZfXzBTTGZnM2hWQlR1WTZHNGJDb1M2T2sxcUd4U1ZJSVhCLUFwUkljZ0d3XzR2dzBjeDZsYmpESmU5cWNERFRZSm5BYzRMOE9BVXRnal9DelNYWlNXb0sydk1FMDlCSlpnWVZ0OW5MMnNERElyUzl6b0NsLXlxdzhwYjZk?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/canada-alberta-westcoast-oil-pipeline.png",
      "alt": "A pipeline right-of-way cutting through forested mountains toward the Pacific coast at dawn, evoking a new export route.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Histories, Herodotus (c. 430 BC) — Pharaoh Necho cuts a canal joining the Nile to the Red Sea to reach distant trade",
        "excerpt": "Psammetichus had a son, Necos, who became king of Egypt. It was he who began building the canal into the Red Sea, which was finished by Darius the Persian. This is four days' voyage in length, and it was dug wide enough for two triremes to move in it rowed abreast. It is fed by the Nile, and is carried from a little above Bubastis by the Arabian town of Patumus; it issues into the Red Sea. Digging began in the part of the Egyptian plain nearest to Arabia; the mountains that extend to Memphis (the mountains where the stone quarries are) come close to this plain; the canal is led along the foothills of these mountains in a long reach from west to east; passing then into a ravine, it bears southward out of the hill country towards the Arabian Gulf. Now the shortest and most direct passage from the northern to the southern or Red Sea is from the Casian promontory, the boundary between Egypt and Syria, to the Arabian Gulf, and this is a distance of one hundred and twenty five miles, neither more nor less; this is the most direct route, but the canal is far longer, inasmuch as it is more crooked. In Necos' reign, a hundred and twenty thousand Egyptians died digging it. Necos stopped work, stayed by a prophetic utterance that he was toiling beforehand for the barbarian.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126:book=2:chapter=158"
      },
      {
        "category": "historical",
        "title": "The Life of Nero, Suetonius (AD 121) — Nero breaks ground to cut the Isthmus of Corinth and join two seas",
        "excerpt": "In Achaia he attempted to cut through the Isthmus and called together the praetorians and urged them to begin the work; then at a signal given on a trumpet he was first to break ground with a mattock and to carry off a basketful of earth upon his shoulders.",
        "source": "penelope.uchicago.edu",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Nero*.html"
      },
      {
        "category": "literary",
        "title": "\"Passage to India\"",
        "excerpt": "Singing my days,\nSinging the great achievements of the present,\nSinging the strong light works of engineers,\nOur modern wonders, (the antique ponderous Seven outvied,)\nIn the Old World the east the Suez canal,\nThe New by its mighty railroad spann'd,\nThe seas inlaid with eloquent gentle wires;",
        "source": "Walt Whitman, Leaves of Grass (1882), Wikisource",
        "href": "https://en.wikisource.org/wiki/Leaves_of_Grass_(1882)/Passage_to_India"
      },
      {
        "category": "literary",
        "title": "\"Columbus\"",
        "excerpt": "Then, pale and worn, he kept his deck,\nAnd thro' the darkness peered that night\nAh, darkest night! and then a speck—\nA light! a light! a light! a light!\nIt grew—a star-lit flag unfurled!\nIt grew to be Time's burst of dawn;\nHe gained a world! he gave that world\nIts watch-word: \"On! and on!\"",
        "source": "Joaquin Miller, in Poems That Every Child Should Know (1904), Wikisource",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Columbus"
      },
      {
        "category": "artistic",
        "title": "American Progress",
        "excerpt": "A luminous allegorical woman floats westward across the continent, stringing telegraph wire and trailing settlers, stagecoaches, and railroads behind her. Ahead of her the light gives way to darkness as Indigenous peoples and buffalo are driven off the land. Gast's 1872 image is the era's most famous picture of Manifest Destiny, capturing both the exhilaration of westward expansion and its human cost.",
        "source": "John Gast (1872), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:American_Progress_(1872)_by_John_Gast.jpg",
        "image": {
          "src": "/covers/canada-alberta-westcoast-oil-pipeline--art.png",
          "alt": "John Gast's 1872 painting American Progress: a female figure in white floats westward over the plains bringing light, telegraph wire, and settlers as Indigenous peoples and animals retreat into shadow.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Symphony No. 9 in E minor, Op. 95, \"From the New World\"",
        "excerpt": "Written in America and premiered in 1893, Dvořák's \"New World\" symphony fuses the composer's Bohemian voice with the wide-open spirit of a young continent. Its surging brass and the vast, homesick calm of the Largo evoke frontier horizons and the pull of distant lands. The work has become the sound of a nation reaching outward across open space toward its future.",
        "source": "Antonín Dvořák (1893), IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.95_(Dvo%C5%99%C3%A1k,_Anton%C3%ADn)"
      }
    ],
    "rank": 34
  },
  {
    "slug": "super-typhoon-bavi-mariana-islands",
    "headline": "Forecasters warn Typhoon Bavi could strike the US Northern Mariana Islands as a super typhoon, months after Sinlaku",
    "overview": "Meteorologists warned that Typhoon Bavi, strengthening over warm Pacific waters east of Guam, could rapidly intensify into a Category 4 or 5 super typhoon and sweep through the US Northern Mariana Islands — Saipan, Tinian and Rota — and Guam early next week, with the Joint Typhoon Warning Center forecasting winds topping 175 mph. The islands are still recovering from Super Typhoon Sinlaku, which devastated Saipan and Tinian as a Category 4 storm in April. Residents queued for fuel and stripped shelves of plywood, water and food.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNNksxWUtLaXMwWXVXX2I2YnRVS2d1T2tUVG5kd1BwWGlneEFiYkJ5STk1NmdfV25vMG93VWRLV3BPZURXTTdWOENjUHRjNzBlbk84S1ZDQXZIYzZtNU5wZEctd1lRT041U3p1dmJoSUNZTnpyV2hxVXRtUmk0M052dW1fLWg3dV9iQm03dFcwRUplQ2k2MEdnYUp4d0p4NXVVcUE?oc=5"
      },
      {
        "name": "weather.com",
        "href": "https://weather.com/2026/07/01/storms/hurricane/super-typhoon-bavi-northern-marianas-guam-forecast"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/super-typhoon-bavi-mariana-islands.png",
      "alt": "Dark spiraling storm clouds massing over a small Pacific island at dusk, evoking an approaching super typhoon.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Histories, Herodotus (c. 430 BC) — a sudden storm out of a clear sky wrecks Xerxes' Persian fleet on the Magnesian coast, as a super typhoon now bears down on the Pacific islands",
        "excerpt": "The Persian fleet put to sea and reached the beach of the Magnesian land, between the city of Casthanaea and the headland of Sepia. The first ships to arrive moored close to land, with the others after them at anchor; since the beach was not large, they lay at anchor in rows eight ships deep out into the sea. They spent the night in this way, but at dawn a storm descended upon them out of a clear and windless sky, and the sea began to boil. A strong east wind blew, which the people living in those parts call Hellespontian. Those who felt the wind rising or had proper mooring dragged their ships up on shore ahead of the storm and so survived with their ships. The wind did, however, carry those ships caught out in the open sea against the rocks called the Ovens at Pelion or onto the beach. Some ships were wrecked on the Sepian headland, others were cast ashore at the city of Meliboea or at Casthanaea. The storm was indeed unbearable.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D7%3Achapter%3D188"
      },
      {
        "category": "historical",
        "title": "The Histories, Herodotus (c. 430 BC) — a great and irresistible north wind off Mount Athos destroys about 300 ships of Mardonius's fleet and drowns 20,000 men, an omen of nature's force from the sea",
        "excerpt": "Crossing over from Thasos they travelled near the land as far as Acanthus, and putting out from there they tried to round Athos. But a great and irresistible north wind fell upon them as they sailed past and dealt very roughly with them, driving many of their ships upon Athos. It is said that about three hundred ships were lost, and more than twenty thousand men. Since the coasts of Athos abound in wild beasts, some men were carried off by beasts and so perished; others were dashed against the rocks; those who could not swim perished because of that, and still others by the cold.",
        "source": "Perseus",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D6%3Achapter%3D44"
      },
      {
        "category": "literary",
        "title": "The Tempest, Act I, Scene 1 (the opening shipwreck storm)",
        "excerpt": "A tempestuous noise of thunder and lightning heard. ... Heigh, my hearts! cheerly, cheerly, my hearts! yare, yare! Take in the topsail. Tend to the master's whistle—Blow, till thou burst thy wind, if room enough!",
        "source": "William Shakespeare, The Tempest (Yale, 1918), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Tempest_(1918)_Yale/Text/Act_I"
      },
      {
        "category": "literary",
        "title": "The Odyssey, Book 5: Poseidon Raises the Storm",
        "excerpt": "So saying, he gathered the clouds, and seizing his trident in his hands troubled the sea, and roused all blasts of all manner of winds, and hid with clouds land and sea alike; and night rushed down from heaven. Together the East Wind and the South Wind dashed, and the fierce-blowing West Wind and the North Wind, born in the bright heaven, rolling before him a mighty wave. Then were the knees of Odysseus loosened and his heart melted.",
        "source": "Homer, The Odyssey (trans. A. T. Murray), via Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book=5:card=291"
      },
      {
        "category": "artistic",
        "title": "The Great Wave off Kanagawa",
        "excerpt": "Hokusai's iconic print towers a single colossal wave over fragile fishing boats, its clawed crest of foam poised to crash down on the helpless crews below. Distant Mount Fuji is dwarfed by the surging sea, capturing in one image nature's overwhelming power over human works. It is the definitive vision of small vessels and small people at the mercy of an unstoppable ocean.",
        "source": "Katsushika Hokusai, woodblock print, c. 1831 (via Wikimedia Commons)",
        "href": "https://en.wikipedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/super-typhoon-bavi-mariana-islands--art.png",
          "alt": "Katsushika Hokusai's woodblock print The Great Wave off Kanagawa, showing a giant cresting wave about to break over small boats with Mount Fuji in the distance.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Four Seasons: \"Summer\" (Concerto No. 2 in G minor, RV 315), the storm finale",
        "excerpt": "The closing Presto of Vivaldi's \"Summer\" unleashes a summer tempest in sound, its racing violins and thundering bass evoking hail, howling wind and a sky torn by lightning. After the languid heat of the earlier movements, the music erupts into churning, unstoppable fury. It is one of music's most vivid portraits of a violent storm bearing down without mercy.",
        "source": "Antonio Vivaldi, Le quattro stagioni, c. 1725 (via IMSLP)",
        "href": "https://imslp.org/wiki/The_Four_Seasons_(Vivaldi,_Antonio)"
      }
    ],
    "rank": 35
  },
  {
    "slug": "declaration-independence-copy-national-archives",
    "headline": "UK National Archives finds a rare Exeter printing of the Declaration of Independence in a captured privateer's papers",
    "overview": "A volunteer cataloguer at Britain's National Archives, retired insurance executive Michael Scurr, discovered a rare early copy of the US Declaration of Independence tucked into the papers of an 18th-century Royal Navy captain. The document — an \"Exeter printing\" produced in Exeter, New Hampshire, days after the July 1776 signing — had been seized with the American privateer Dalton, captured off Portugal on Christmas Eve 1776 by HMS Raisonnable. It is one of just 11 known Exeter copies and the only one identified outside the United States, and is now on display in London.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPSTNGbHhRRS02TkdoeDY4cHBqMmJpWHNPMEpZM3hYRHNldUlnQ0JZUmU0dlNHeFFYSHQ3R3BoMnROeU1abjFPUTdzblpEaXczNEgtc05CS2szVnJwd21VRnR2aTU3VktveURYa09zMVZZVkNmRUswNEVXMFlnMjZkbW5BNi1xRWJNZFNPWlNUZzZhMXNBcFpkbVcyckhPVFJ4dldqOVBoMVhBeWNCalo1MFJodjdPaVN6bFE?oc=5"
      },
      {
        "name": "The Washington Times",
        "href": "https://www.washingtontimes.com/news/2026/jul/2/rare-copy-declaration-independence-found-uk-national-archives-papers/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/declaration-independence-copy-national-archives.png",
      "alt": "An 18th-century printed broadside of the Declaration of Independence, yellowed and folded, resting under archive light.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Magna Carta, King John of England (1215) — the founding charter binding a ruler to the rule of law, echoing the Declaration's assertion of rights against arbitrary power",
        "excerpt": "39. No freemen shall be taken or imprisoned or disseised or exiled or in any way destroyed, nor will we go upon him nor send upon him, except by the lawful judgment of his peers or by the law of the land. 40. To no one will we sell, to no one will we refuse or delay, right or justice.",
        "source": "avalon.law.yale.edu",
        "href": "https://avalon.law.yale.edu/medieval/magna.asp"
      },
      {
        "category": "historical",
        "title": "The Ninety-Five Theses, Martin Luther (1517) — a manifesto defying the highest authority, posted and spread by the printing press like the Declaration it foreshadows",
        "excerpt": "1. Our Lord and Master Jesus Christ, when He said Poenitentiam agite, willed that the whole life of believers should be repentance. 2. This word cannot be understood to mean sacramental penance, i.e., confession and satisfaction, which is administered by the priests. 3. Yet it means not inward repentance only; nay, there is no inward repentance which does not outwardly work divers mortifications of the flesh.",
        "source": "projectwittenberg.org",
        "href": "https://www.projectwittenberg.org/pub/resources/text/wittenberg/luther/web/ninetyfive.html"
      },
      {
        "category": "literary",
        "title": "United States Declaration of Independence (Thomas Jefferson, 1776)",
        "excerpt": "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
        "source": "U.S. National Archives",
        "href": "https://www.archives.gov/founding-docs/declaration-transcript"
      },
      {
        "category": "literary",
        "title": "Common Sense (Thomas Paine, 1776)",
        "excerpt": "We have it in our power to begin the world over again. A situation, similar to the present, hath not happened since the days of Noah until now. The birthday of a new world is at hand, and a race of men, perhaps as numerous as all Europe contains, are to receive their portion of freedom from the event of a few months.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/147/147-h/147-h.htm"
      },
      {
        "category": "artistic",
        "title": "Declaration of Independence (John Trumbull, 1818)",
        "excerpt": "John Trumbull's grand history painting, hung in the Rotunda of the U.S. Capitol, depicts the drafting committee presenting the Declaration to the Continental Congress. It fixed in the public imagination the moment a printed proclamation of liberty was set before the nation, the same document that a captured privateer would later carry across the Atlantic into an enemy's papers.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg",
        "image": {
          "src": "/covers/declaration-independence-copy-national-archives--art.png",
          "alt": "Oil painting by John Trumbull showing the five-man drafting committee presenting the Declaration of Independence to John Hancock and the Continental Congress in a formal Philadelphia chamber.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Chester, from The Singing Master's Assistant (William Billings, 1778)",
        "excerpt": "Let tyrants shake their iron rod, And Slav'ry clank her galling chains, We fear them not, we trust in God, New England's God forever reigns.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Singing_Master's_Assistant_(Billings,_William)"
      }
    ],
    "rank": 36
  },
  {
    "slug": "big-dymak-timber-hq-odense",
    "headline": "BIG completes a circular mass-timber headquarters for Dymak in Odense, built from 44 radial timber frames",
    "overview": "Bjarke Ingels Group has completed a 2,800-square-metre headquarters for the building-materials firm Dymak in Odense, Denmark, conceived as a full-scale showcase of the natural materials the company supplies. The circular building encloses a planted courtyard with stepped terraces and is framed by 44 radial cross-laminated timber trusses beneath an undulating roof carrying 880 solar panels. Its interiors of mass timber, clay, cork, eelgrass and recycled-paper ceilings have earned DGNB Gold, Heart and Diamond certifications.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/03/big-dymak-headquarters-denmark/"
      },
      {
        "name": "Designboom",
        "href": "https://www.designboom.com/architecture/big-bjarke-ingels-group-dymak-headquarters-full-scale-showcase-natural-materials-denmark/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/big-dymak-timber-hq-odense.png",
      "alt": "A circular timber building enclosing a planted courtyard with stepped terraces under an undulating solar roof.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Roman History, Cassius Dio (c. 200 AD) — Agrippa completes the great round Pantheon, the domed temple that 'resembles the heavens'",
        "excerpt": "Also he completed the building called the Pantheon. It has this name, perhaps because it received among the images which decorated it the statues of many gods, including Mars and Venus; but my own opinion of the name is that, because of its vaulted roof, it resembles the heavens.",
        "source": "LacusCurtius (penelope.uchicago.edu)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/53*.html"
      },
      {
        "category": "historical",
        "title": "Germania, Tacitus (98 AD) — the northern peoples build only in timber, each dwelling set apart amid spring, meadow and wood",
        "excerpt": "They live scattered and apart, just as a spring, a meadow, or a wood has attracted them. Their villages they do not arrange in our fashion, with the buildings connected and joined together, but every person surrounds his dwelling with an open space... No use is made by them of stone or tile; they employ timber for all purposes, rude masses without ornament or attractiveness.",
        "source": "Perseus (perseus.tufts.edu)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0083%3Achapter%3D16"
      },
      {
        "category": "literary",
        "title": "Vitruvius, The Ten Books on Architecture (De Architectura)",
        "excerpt": "All these must be built with due reference to durability, convenience, and beauty. Durability will be assured when foundations are carried down to the solid ground and materials wisely and liberally selected.",
        "source": "Vitruvius, trans. Morris Hicky Morgan (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/20239/20239-h/20239-h.htm"
      },
      {
        "category": "literary",
        "title": "Henry David Thoreau, Walden",
        "excerpt": "Near the end of March, 1845, I borrowed an axe and went down to the woods by Walden Pond, nearest to where I intended to build my house, and began to cut down some tall, arrowy white pines, still in their youth, for timber.",
        "source": "Henry David Thoreau, Walden (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/205/205-h/205-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Ideal City (Città ideale), Urbino panel",
        "excerpt": "This Renaissance panel from the 1480s imagines the perfect town as pure geometry: an immaculate piazza opening onto a domed, central-plan circular temple that anchors the whole composition on its axis. The round building is set as the ideal at the heart of communal space, exactly the gesture BIG makes by placing a planted courtyard within a ring of timber. It is architecture painted as an argument, the ideal building offered as a statement of how people should live together.",
        "source": "Formerly attributed to Piero della Francesca; Galleria Nazionale delle Marche, Urbino (Wikipedia)",
        "href": "https://commons.wikimedia.org/wiki/File:Formerly%20Piero%20della%20Francesca%20-%20Ideal%20City%20-%20Galleria%20Nazionale%20delle%20Marche%20Urbino.jpg",
        "image": {
          "src": "/covers/big-dymak-timber-hq-odense--art.png",
          "alt": "Renaissance painting of an ideal city: an empty sunlit piazza flanked by classical palazzi, centered on a circular domed temple.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven, Symphony No. 6 in F major, Op. 68 (\"Pastoral\")",
        "excerpt": "Beethoven built his Pastoral Symphony as sound in harmony with nature, from the \"Awakening of cheerful feelings on arrival in the countryside\" to the \"Scene by the brook\" and the shepherd's grateful hymn after the storm. Its movements are architecture in time, serene proportions that carry the listener through an idealized landscape. The same pastoral serenity animates Dymak's courtyard of timber, clay and living plants, where the building itself is tuned to the rhythms of the natural world.",
        "source": "Ludwig van Beethoven (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 37
  },
  {
    "slug": "swift-kelce-msg-wedding",
    "headline": "Taylor Swift and Travis Kelce marry at Madison Square Garden after giving $26 million to charity",
    "overview": "Pop superstar Taylor Swift and NFL tight end Travis Kelce celebrated their wedding on Friday evening at Madison Square Garden in New York, with about 1,000 guests expected for festivities that could run past midnight. Ahead of the nuptials the couple gave away $26 million to charities, including the nonprofit The Store. The guest list reportedly drew a constellation of celebrities, from Selena Gomez and Ed Sheeran to Robert Pattinson, ringing midtown Manhattan with security and spectacle.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPZVM2RTBVekZXWnY2WVdwanlSNEpkVVJ6Tk14dXBaZHd3b3lDcUJycXd6UEd5STVkYUFscXM1ZjJvMjhreWtrNGJ6VjlrNDI2azhFSjlwMlhoNS1ZQUtfMC1uSG1reDhmUzR2X0FUR0haa3RpOUJjZzljZDFWU3hYSVV0QjJHbW05LUl1VUxCSUJuQVFZdno2QW1kRy0tNW5XQXk1MmVLLUdiQnRtX0E?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPd0RkVnhQanhVVE04YTk3bVdJbDFFTnN1b1FINTVTejZzWmFQNVRfaXVhQm10LVdpT2h4eUt2SVAxVlB2bEdVNXVpVjI1a0dFUUVaSHQwYUZGTHNpenRpWGdOX1l0ZEp1SExvM1hLMUJGWVpGczdzSFZQR3ByaG5DU1E3SnhUeWhjVWFla0JPM0JHZWtLMUdtZVAzLWl3VThFbHlZ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-03",
    "image": {
      "src": "/covers/swift-kelce-msg-wedding.png",
      "alt": "The illuminated facade of Madison Square Garden at night with a red carpet, evoking a celebrated public wedding as spectacle.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 3 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Histories, Herodotus (c. 430 BC) — Cleisthenes of Sicyon summons the suitors of all Greece to a year-long contest for his daughter's hand, a wedding staged as public spectacle",
        "excerpt": "Cleisthenes son of Aristonymus son of Myron son of Andreas had one daughter, whose name was Agariste. He desired to wed her to the best man he could find in Hellas. It was the time of the Olympian games, and when he was victor there with a four-horse chariot, Cleisthenes made a proclamation that whichever Greek thought himself worthy to be his son-in-law should come on the sixtieth day from then or earlier to Sicyon, and Cleisthenes would make good his promise of marriage in a year from that sixtieth day. Then all the Greeks who were proud of themselves and their country came as suitors, and to that end Cleisthenes had them compete in running and wrestling contests.",
        "source": "Perseus (perseus.tufts.edu)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D6%3Achapter%3D126"
      },
      {
        "category": "historical",
        "title": "The Anabasis of Alexander, Arrian (c. 145 AD) — the mass wedding at Susa, where Alexander and scores of his companions wed Persian brides in one splendid ceremony",
        "excerpt": "Likewise to the rest of his Companions he gave the choicest daughters of the Persians and Medes, to the number of eighty. The weddings were celebrated after the Persian manner, seats being placed in a row for the bridegrooms; and after the banquet the brides came in and seated themselves, each one near her own husband. The bridegrooms took them by the right hand and kissed them; the king being the first to begin, for the weddings of all were conducted in the same way.",
        "source": "Wikisource (en.wikisource.org)",
        "href": "https://en.wikisource.org/wiki/The_Anabasis_of_Alexander/Book_VII/Chapter_IV"
      },
      {
        "category": "literary",
        "title": "Edmund Spenser, \"Epithalamion\" (1595)",
        "excerpt": "Open the temple gates unto my love,\nOpen them wide that she may enter in,\nAnd all the postes adorne as doth behove,\nAnd all the pillours deck with girlands trim,\nFor to receyve this saynt with honour dew,\nThat commeth in to you.\nWith trembling steps and humble reverence,\nShe commeth in before th' Almighties vew:",
        "source": "Wikisource: The Works of Edmund Spenser / Epithalamion",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Edmund_Spenser/Epithalamion"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, \"A Midsummer Night's Dream,\" Act V (Oberon's blessing of the bride-bed)",
        "excerpt": "Now, until the break of day,\nThrough this house each fairy stray.\nTo the best bride-bed will we,\nWhich by us shall blessed be;\nAnd the issue there create\nEver shall be fortunate.\nSo shall all the couples three\nEver true in loving be;",
        "source": "Wikisource: A Midsummer-Night's Dream (Rackham), Act V, Sc. 1",
        "href": "https://en.wikisource.org/wiki/A_Midsummer-Night%27s_Dream_(Rackham)/Act_V,_Sc._1"
      },
      {
        "category": "artistic",
        "title": "Paolo Veronese, \"The Wedding at Cana\" (1563), Musée du Louvre",
        "excerpt": "Veronese's colossal canvas, more than six by nine metres, crowds a marble loggia with over a hundred richly dressed guests, musicians, and servants at a wedding feast so sumptuous it dwarfs the miracle at its center. Painted for a Benedictine refectory in Venice, it turns a nuptial banquet into pure spectacle, a shimmering multitude gathered around a single celebrated table. It is the Renaissance vision of the wedding-as-festival, the same instinct that ringed midtown Manhattan with stars.",
        "source": "Wikipedia: Wedding at Cana (Veronese)",
        "href": "https://commons.wikimedia.org/wiki/File:Paolo%20Veronese%20008.jpg",
        "image": {
          "src": "/covers/swift-kelce-msg-wedding--art.png",
          "alt": "Paolo Veronese's monumental 1563 painting The Wedding at Cana, showing a vast crowd of guests, musicians, and servants at an opulent Renaissance wedding banquet set in a columned marble courtyard.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Felix Mendelssohn, \"Wedding March\" from the incidental music to A Midsummer Night's Dream, Op. 61 (1842)",
        "excerpt": "Mendelssohn's blazing C-major march, written to accompany the triple wedding that closes Shakespeare's comedy, became the world's default sound of nuptial triumph, its fanfare summoning a bride down the aisle before a watching throng. Brass and full orchestra turn a private procession into a public rite of pomp and jubilation. It is the aural equivalent of a wedding staged as spectacle, ceremony amplified into celebration.",
        "source": "IMSLP: A Midsummer Night's Dream, Op.61 (Mendelssohn, Felix)",
        "href": "https://imslp.org/wiki/A_Midsummer_Night%27s_Dream,_Op.61_(Mendelssohn,_Felix)"
      }
    ],
    "rank": 38
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
