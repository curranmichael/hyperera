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
// the Evening Edition of 28 June 2026 (ranks 1-13) leads with its hero story,
// followed by the Afternoon Edition of 28 June and the Evening Edition of 27 June 2026. Stories are
// selected from the live RSS feeds in `lib/feeds.ts`. The analogies are the heart
// of each story: six per event, two per category, each linking to a real
// human-written source (a primary text, museum object page, or archive). Excerpts
// quote the most relevant passage verbatim where the source is public domain, and
// otherwise describe rather than quote. Covers are dithered local copies: feed or
// rights-clean Wikimedia art/photos credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated"). Source links to AP/Reuters
// are Google News redirects (see `lib/feeds.ts`).

const stories: Story[] = [
  {
    "slug": "iran-strikes-bahrain-kuwait",
    "headline": "Iran strikes U.S. targets in Bahrain and Kuwait after renewed American airstrikes, threatening to abandon ceasefire talks",
    "overview": "Iran's Revolutionary Guard fired ballistic missiles and drones at U.S. military targets in Bahrain and Kuwait on June 28, 2026, striking near the Fifth Fleet's base at Port Salman and the Ali al-Salem airbase, after fresh American airstrikes hit Iranian missile, drone and radar sites near the Strait of Hormuz. The U.S. said the strikes answered an Iranian drone attack on the oil tanker Kiku; Iran called the American raids a violation of the June ceasefire memorandum. Tehran warned that continued attacks could bring a complete halt to negotiations aimed at ending the war.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQcDBTQkFEbzlzV3FGUXhBeks0Wm5CV2RIU0J4aFcwTl9jRFRNeHRNbkxzVEZNa3ZNSTcwS1FDZm5PM3RDbVJuMFc0bWRwR1hhSlZFVGlMSkdvOC1GcnlLUWpUbjQ0aFlMYWN3X0gtdVBUWHZYSHNKR3BKelJtdUZ1dUpnTWVubU1BOWowd1N3aE1kckE1Uklya1huN25iLUxYM2Q5N0JtcVY?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/28/iran-attacks-kuwait-and-bahrain-in-response-to-us-strikes"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/iran-strikes-bahrain-kuwait.png",
      "alt": "Night sky over a Gulf coastline streaked with missile trails and anti-air fire, a struck military installation burning on the horizon as sirens flare",
      "credit": "AI-generated"
    },
    "lead": true,
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Mytilenian Debate, History of the Peloponnesian War (Book III)",
        "excerpt": "For myself, I adhere to my former opinion, and wonder at those who have proposed to reopen the case of the Mitylenians, and who are thus causing a delay which is all in favour of the guilty, by making the sufferer proceed against the offender with the edge of his anger blunted; although where vengeance follows most closely upon the wrong, it best equals it and most amply requites it.",
        "source": "Thucydides, History of the Peloponnesian War, Book III (Cleon's speech), trans. Richard Crawley",
        "href": "https://classics.mit.edu/Thucydides/pelopwar.3.third.html"
      },
      {
        "category": "historical",
        "title": "The Outbreak of the Second Punic War (Book XXI)",
        "excerpt": "The Romans were furious with indignation because the vanquished had dared to take the offensive against their conquerors; the Carthaginians bitterly resented what they regarded as the tyrannical and rapacious conduct of Rome.",
        "source": "Livy, The History of Rome, Book XXI, ch. 1, trans. Rev. Canon Roberts (E. P. Dutton, 1912), via Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0144:book%3D21:chapter%3D1"
      },
      {
        "category": "literary",
        "title": "The Iliad, Book I (the wrath of Achilles)",
        "excerpt": "Achilles' wrath, to Greece the direful spring\nOf woes unnumber'd, heavenly goddess, sing!\nThat wrath which hurl'd to Pluto's gloomy reign\nThe souls of mighty chiefs untimely slain;\nWhose limbs unburied on the naked shore,\nDevouring dogs and hungry vultures tore.",
        "source": "Homer, The Iliad, Book I, trans. Alexander Pope (1715-1720)",
        "href": "https://poets.org/poem/iliad-book-i-lines-1-15"
      },
      {
        "category": "literary",
        "title": "The Persians (the ghost of Darius on hubris and retribution)",
        "excerpt": "Zeus, of a truth, is a chastiser of overweening pride and corrects with heavy hand. ... For presumptuous pride, when it has burgeoned, bears as its fruit a crop of calamity, whence it reaps a plenteous harvest of tears.",
        "source": "Aeschylus, The Persians, trans. Herbert Weir Smyth (1922), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/The_Persians"
      },
      {
        "category": "artistic",
        "title": "The Third of May 1808",
        "excerpt": "Goya's canvas freezes the instant before slaughter: a faceless firing squad of soldiers, rifles raised in a rigid mechanical row, confronts a huddle of condemned civilians lit by a stark lantern. At the center a man in a white shirt throws his arms wide in helpless defiance, his hands marked like wounds, while the dead already lie in a pool of blood at his feet. The painting turns reprisal into an image of war's indiscriminate vengeance against the defenseless.",
        "source": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:El_tres_de_mayo_de_1808_en_Madrid.jpg",
        "image": {
          "src": "/covers/iran-strikes-bahrain-kuwait--art.png",
          "alt": "Goya's The Third of May 1808: a firing squad of Napoleonic soldiers executes a group of Spanish civilians at night, a man in a white shirt flinging his arms wide before the rifles",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Mars, the Bringer of War (from The Planets, Op. 32)",
        "excerpt": "A relentless ostinato hammers in an off-kilter five-beat meter, driving strings and brass forward like the gears of a war machine grinding into motion. Dissonant fanfares pile atop one another in a remorseless crescendo, each repetition more massive and menacing, until the orchestra detonates in pounding, mechanized fury.",
        "source": "Gustav Holst, \"Mars, the Bringer of War\" from The Planets, Op. 32 (1914-16)",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      }
    ],
    "rank": 1
  },
  {
    "slug": "uganda-military-shuts-media",
    "headline": "Uganda's military chief orders the shutdown of two of the country's leading media outlets",
    "overview": "Uganda's military chief, General Muhoozi Kainerugaba, ordered the shutdown of two of the country's leading media outlets, the Daily Monitor newspaper and the broadcaster NTV Uganda, both owned by Nation Media Group. Declaring on X that \"In Uganda, I do not believe in a free press,\" he said all critical coverage must be cleared by his office. The move, made as Kainerugaba is positioned to succeed his father President Yoweri Museveni, drew condemnation from press-freedom advocates.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cj9gyk1z7ngo"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/28/ugandas-military-chief-orders-shutdown-of-two-media-outlets"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/uganda-military-shuts-media.png",
      "alt": "A silenced printing press standing dark and still in an empty newsroom, lights switched off and a single unfinished front page left in the carriage",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Burning of Cremutius Cordus' Histories",
        "excerpt": "Under the emperor Tiberius, the Roman historian Cremutius Cordus was prosecuted for praising the assassins of Caesar, and the Senate ordered his writings burned. Tacitus records that the suppression failed: hidden copies survived and circulated again, and the persecution only magnified the very authority it sought to erase.",
        "source": "Tacitus, Annals, Book IV.34-35",
        "href": "https://www.poetryintranslation.com/PITBR/Latin/AnnalsBookIV-34to58.php"
      },
      {
        "category": "historical",
        "title": "Milton's Areopagitica Against Licensing",
        "excerpt": "Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica (1644)",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm"
      },
      {
        "category": "literary",
        "title": "Milton's Plea for the Liberty to Speak",
        "excerpt": "Give me the liberty to know, to utter, and to argue freely according to conscience, above all liberties.",
        "source": "John Milton, Areopagitica (1644)",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm"
      },
      {
        "category": "literary",
        "title": "Heine's Warning in Almansor",
        "excerpt": "Das war ein Vorspiel nur, dort wo man Bücher / verbrennt, verbrennt man auch am Ende Menschen.",
        "source": "Heinrich Heine, Almansor (1823)",
        "href": "https://de.wikisource.org/wiki/Almansor_(Heine)"
      },
      {
        "category": "artistic",
        "title": "Daumier, Ne vous y frottez pas!! (Freedom of the Press)",
        "excerpt": "Honoré Daumier's 1834 lithograph plants a defiant printer in the center of the frame, sleeves rolled, fists ready, standing his ground over the words \"Liberté de la presse,\" holding off a charging King Louis-Philippe. The print became an emblem of the press resisting the state, made the year before censorship laws silenced political caricature in France.",
        "source": "Honoré Daumier, L'Association Mensuelle, Plate 20 (March 1834), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/Category:Lithographs_by_Honor%C3%A9_Daumier",
        "image": {
          "src": "/covers/uganda-military-shuts-media--art.png",
          "alt": "A burly printer stands defiant over the words Liberté de la presse as the king is held at bay, in Daumier's 1834 lithograph",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Étude in C minor, Op. 10 No. 12 (\"Revolutionary\")",
        "excerpt": "Over a stormy, cascading torrent of left-hand passagework, the right hand hurls out defiant, declamatory phrases that refuse to be silenced. Surging and turbulent, the music channels anguish into resistance, rising again and again from the depths until it ends in a fierce, unbowed gesture of defiance.",
        "source": "Frédéric Chopin, \"Revolutionary\" Étude in C minor, Op. 10 No. 12 (1831)",
        "href": "https://imslp.org/wiki/Études,_Op.10_(Chopin,_Frédéric)"
      }
    ],
    "rank": 2
  },
  {
    "slug": "south-korea-japan-defence-ties",
    "headline": "South Korea and Japan reaffirm North Korea's denuclearisation as a shared goal and pledge closer defence ties",
    "overview": "South Korea and Japan reaffirmed their shared goal of the denuclearisation of the Korean peninsula and pledged to deepen defence cooperation during the sixth round of bilateral defence talks. Meeting in Seoul on 28 June 2026, South Korean Defence Minister Ahn Gyu-back and Japanese Defence Minister Shinjiro Koizumi agreed to revive joint search-and-rescue drills and to work on regional stability bilaterally and alongside Washington. The warming ties mark continued reconciliation between two neighbours long divided by wartime history.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQcHYtTGtUR2VwUTN6TGpYaGpCeU9pWnp0WHU1YjhPc3V3UWNSS2V2V2t2Yl9qYVpPeVRhVHZna3VlWU9FOXBsOVU3YXZGdG03b2RZTFdoajEydlQwS0ZLb2xXTkJtNmNzMW5qUF9PNWR3a19tVlJxWHA0ajdOWWtSYmZ1X1FFbThsakN3VkRuQmQ3MnZ5ZWxZRjlGYnBhWFVRTWtiV2RWeE5yVWJIbkt3ZFNkRGJzRkFldkZIc0F6Tk8?oc=5"
      },
      {
        "name": "Japan Today (Reuters)",
        "href": "https://japantoday.com/category/politics/south-korea-japan-reaffirm-denuclearisation-goal-closer-defence-ties"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/south-korea-japan-defence-ties.png",
      "alt": "The national flags of South Korea and Japan standing side by side before a diplomatic handshake, no text",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Greek city-states reconcile their feuds to face Persia (Herodotus, Histories 7.145)",
        "excerpt": "they thought it well first of all things to reconcile the enmities and bring to an end the wars which they had with one another",
        "source": "Herodotus, The Histories, Book 7.145 (Macaulay translation)",
        "href": "https://lexundria.com/hdt/7.145/mcly"
      },
      {
        "category": "historical",
        "title": "The Elysee Treaty: France and Germany end centuries of enmity (1963)",
        "excerpt": "Signed on 22 January 1963 by Charles de Gaulle and Konrad Adenauer, the Elysee Treaty bound two states that had fought three wars in a century into formal friendship. It mandated regular consultations on defence, foreign policy, education and youth, transforming hereditary adversaries into the core partnership of European integration.",
        "source": "Wikipedia, Elysee Treaty",
        "href": "https://en.wikipedia.org/wiki/%C3%89lys%C3%A9e_Treaty"
      },
      {
        "category": "literary",
        "title": "Priam and Achilles weep together (Homer, Iliad, Book 24)",
        "excerpt": "the one for man-slaying Hector wept sore, while he grovelled at Achilles' feet, but Achilles wept for his own father, and now again for Patroclus",
        "source": "Homer, Iliad, Book 24 (A. T. Murray translation, Perseus)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D24%3Acard%3D507"
      },
      {
        "category": "literary",
        "title": "Athena turns strife outward against foreign foes (Aeschylus, Eumenides)",
        "excerpt": "Let their war be with foreign enemies, and without stint for one in whom there will be a terrible passion for glory",
        "source": "Aeschylus, Eumenides (H. W. Smyth translation, Perseus)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0006:card=858"
      },
      {
        "category": "artistic",
        "title": "The Ratification of the Treaty of Munster (Gerard ter Borch, 1648)",
        "excerpt": "Ter Borch's small oil on copper records the swearing of the oath that ended the Eighty Years' War between Spain and the Dutch Republic on 15 May 1648. Former enemies, Catholic Spaniards and Reformed Dutch, raise their hands in the Munster town hall in the first known oil painting to depict an actual political event factually rather than as allegory.",
        "source": "Gerard ter Borch, The Ratification of the Treaty of Munster (1648), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Ratification_of_the_Treaty_of_Munster,_Gerard_Ter_Borch_(1648).jpg",
        "image": {
          "src": "/covers/south-korea-japan-defence-ties--art.png",
          "alt": "Delegates of Spain and the Dutch Republic swearing the oath ratifying the Peace of Munster in 1648",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Sheep May Safely Graze (Schafe können sicher weiden), from BWV 208",
        "excerpt": "Two gentle flutes weave a tranquil, lilting pastoral above a calm, steady accompaniment, painting a meadow at peace under watchful, benevolent care. The serene melody unfolds with unhurried grace, evoking flocks grazing in safety where a wise shepherd keeps order and all is secure.",
        "source": "Johann Sebastian Bach, \"Sheep May Safely Graze\" from Cantata BWV 208 (1713)",
        "href": "https://imslp.org/wiki/Was_mir_behagt,_ist_nur_die_muntre_Jagd,_BWV_208_(Bach,_Johann_Sebastian)"
      }
    ],
    "rank": 3
  },
  {
    "slug": "budapest-first-pride-post-orban",
    "headline": "Tens of thousands march in Budapest's first Pride since Viktor Orbán was voted out of power",
    "overview": "Tens of thousands of people marched through Budapest on Saturday, June 27, 2026, in the city's 31st annual Pride parade, the first since former Prime Minister Viktor Orbán, who had sought to ban the event, was voted out in an April election. Setting off from the Opera house and crossing the Erzsébet Bridge over the Danube amid a record heat wave, marchers waved rainbow and EU flags in celebration. Police authorized and secured the route, even though the new government has not yet repealed the Orbán-era law that had outlawed the march.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/videos/c23yezpg2ypo"
      },
      {
        "name": "PBS NewsHour (Associated Press)",
        "href": "https://www.pbs.org/newshour/world/tens-of-thousands-march-in-the-first-budapest-pride-since-viktor-orban-was-voted-out"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/budapest-first-pride-post-orban.png",
      "alt": "Marchers with rainbow flags at Budapest Pride",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Hungarian Revolution of 1956",
        "excerpt": "In October 1956 the people of Budapest rose in a spontaneous nationwide revolt against Soviet domination and the Stalinist regime, briefly installing reform premier Imre Nagy and reclaiming the streets and public squares of the capital. The Soviet Union answered with a massive military invasion on 4 November that crushed the uprising and led to Nagy's execution. Though defeated, the revolution endured as a powerful symbol of the Hungarian struggle for freedom and self-determination.",
        "source": "Encyclopaedia Britannica, 'Hungarian Revolution'",
        "href": "https://www.britannica.com/event/Hungarian-Revolution-1956"
      },
      {
        "category": "historical",
        "title": "The fall of the Berlin Wall (1989)",
        "excerpt": "On the night of November 9, 1989, East German authorities opened the border crossings and crowds streamed through the Berlin Wall, ending nearly three decades of division and becoming an enduring symbol of liberation as an authoritarian order gives way and ordinary citizens reclaim public space in jubilation.",
        "source": "U.S. National Archives",
        "href": "https://www.archives.gov/research/foreign-policy/cold-war/fall-of-berlin-wall"
      },
      {
        "category": "literary",
        "title": "Lord Byron, \"Sonnet on Chillon\" (1816)",
        "excerpt": "Eternal Spirit of the chainless Mind!\nBrightest in dungeons, Liberty! thou art:\nFor there thy habitation is the heart—\nThe heart which love of thee alone can bind;\nAnd when thy sons to fetters are consigned—\nTo fetters, and the damp vault's dayless gloom,\nTheir country conquers with their martyrdom,\nAnd Freedom's fame finds wings on every wind.\nChillon! thy prison is a holy place,\nAnd thy sad floor an altar—for 'twas trod,\nUntil his very steps have left a trace\nWorn, as if thy cold pavement were a sod,\nBy Bonnivard!—May none those marks efface!\nFor they appeal from tyranny to God.",
        "source": "Lord Byron, Sonnet on Chillon (prefatory sonnet to The Prisoner of Chillon, 1816)",
        "href": "https://en.wikisource.org/wiki/Sonnet_on_Chillon"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"The Mask of Anarchy\" (1819)",
        "excerpt": "Rise like Lions after slumber / In unvanquishable number— / Shake your chains to earth like dew / Which in sleep had fallen on you— / Ye are many—they are few.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Masque_of_Anarchy"
      },
      {
        "category": "artistic",
        "title": "Eugène Delacroix, \"Liberty Leading the People\" (1830)",
        "excerpt": "Delacroix's painting commemorates the July Revolution of 1830, with a bare-breasted personification of Liberty raising the French tricolor and leading a crowd of fighters from every class over the barricades. It has become a universal emblem of popular uprising and of freedom won in the streets.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/budapest-first-pride-post-orban--art.png",
          "alt": "Liberty, raising the tricolor flag, leads a crowd over a barricade in Delacroix's painting",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, \"Va, pensiero\" (Chorus of the Hebrew Slaves) from Nabucco (1842)",
        "excerpt": "Verdi's chorus for the captive Hebrew slaves, longing on golden wings for their lost homeland, became an unofficial anthem of freedom and national longing. Sung in unison by an exiled people yearning for liberty, it grew into a rallying cry of solidarity and hope against oppression.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 4
  },
  {
    "slug": "bis-warns-global-risks",
    "headline": "Bank for International Settlements warns that high debt and an AI investment boom are raising global financial risks",
    "overview": "In its Annual Economic Report 2026, released on 28 June 2026, the Bank for International Settlements warned that record-high public debt, an investment boom tied to artificial intelligence, and underlying financial fragilities are raising risks to the global economy. The report flagged elevated asset valuations and investor complacency, noting that the AI boom is increasingly financed by debt and complex funding structures and could end in the kind of overinvestment seen in past boom-and-bust cycles. The BIS urged policymakers to safeguard price stability, ensure fiscal sustainability, and strengthen oversight beyond the banking sector.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMigAFBVV95cUxNNVR4T0hxcEdBMnhpb3UwQThfajRZbl9DVkdCNVRmaUFoaHhNX1hzWm9MM3pXTk5aazFzMGpySTRCY3BPWUJfX0cyZE41ZjlmOVVOdWZBVk81QkllWjdxcEFSYmJnU19tZjN2MEpabDFrSS1FZk9LMXNfR3FTX0pLYg?oc=5"
      },
      {
        "name": "Bank for International Settlements",
        "href": "https://www.bis.org/publ/arpdf/ar2026e.htm"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/bis-warns-global-risks.png",
      "alt": "The Bank for International Settlements tower in Basel",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Charles Mackay, \"The South-Sea Bubble\" (Memoirs of Extraordinary Popular Delusions)",
        "excerpt": "Exchange Alley was in a fever of excitement. The Company's stock, which had been at a hundred and thirty the previous day, gradually rose to three hundred, and continued to rise with the most astonishing rapidity during the whole time that the bill in its several stages was under discussion.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm"
      },
      {
        "category": "historical",
        "title": "Herodotus, The Histories, Book I (Solon warns Croesus)",
        "excerpt": "Croesus, thou art inquiring about human fortunes of one who well knows that the Deity is altogether envious and apt to disturb our lot... But we must of every thing examine the end and how it will turn out at the last, for to many God shows but a glimpse of happiness and then plucks them up by the roots and overturns them.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2707/2707-h/2707-h.htm"
      },
      {
        "category": "literary",
        "title": "The Parable of the Rich Fool, Luke 12:16-21 (King James Version)",
        "excerpt": "And he spake a parable unto them, saying, The ground of a certain rich man brought forth plentifully: And he thought within himself, saying, What shall I do, because I have no room where to bestow my fruits? And he said, This will I do: I will pull down my barns, and build greater; and there will I bestow all my fruits and my goods. And I will say to my soul, Soul, thou hast much goods laid up for many years; take thine ease, eat, drink, and be merry. But God said unto him, Thou fool, this night thy soul shall be required of thee: then whose shall those things be, which thou hast provided? So is he that layeth up treasure for himself, and is not rich toward God.",
        "source": "The Gospel According to St. Luke 12:16-21, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "literary",
        "title": "Dante Alighieri, Inferno, Canto VII (the hoarders and the spendthrifts), trans. Longfellow",
        "excerpt": "Crying, \"Why keepest?\" and, \"Why squanderest thou?\"... Ill giving and ill keeping the fair world have ta'en from them, and placed them in this scuffle... Now canst thou, Son, behold the transient farce of goods that are committed unto Fortune.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_7"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, \"The South Sea Scheme\" (1721)",
        "excerpt": "Hogarth's satirical engraving caricatures the speculative madness of the South Sea Bubble: crowds clamber onto a spinning merry-go-round of fortune while Honesty is broken on the wheel and Honour is flogged. The print, often called the first editorial cartoon, exposes the greed, corruption and credulity that drove ordinary people to ruin when the bubble burst.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth,_The_South_Sea_Scheme,_1721,_NGA_30435.jpg",
        "image": {
          "src": "/covers/bis-warns-global-risks--art.png",
          "alt": "Hogarth's 1721 engraving 'The South Sea Scheme' depicting the speculative frenzy of the South Sea Bubble",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Danse macabre, Op. 40",
        "excerpt": "A solo violin, tuned to a sour, grating interval, summons skeletons from their graves to caper in a feverish midnight waltz where king and pauper dance as equals. The whirling revelry spins ever faster and more delirious until a rooster's crow scatters the dancers and the giddy carnival collapses back into silence.",
        "source": "Camille Saint-Saëns, Danse macabre, Op. 40 (1874)",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Saëns,_Camille)"
      }
    ],
    "rank": 5
  },
  {
    "slug": "vw-shareholder-china-models-germany",
    "headline": "A key Volkswagen shareholder proposes building Chinese-brand cars at the company's under-used German plants",
    "overview": "Lower Saxony premier Olaf Lies, who sits on Volkswagen's supervisory board representing the carmaker's second-largest shareholder, proposed building Chinese-brand models at VW's under-used German factories to stabilise plant utilisation amid weak electric-vehicle demand. Producing Chinese cars inside the European Union would also let those manufacturers bypass import tariffs while preserving German jobs. Volkswagen's leadership signalled openness to exploring the idea.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOeERBal9MZVI0Q0d4anN0bjEwbnNkSWFXbUJpeUc4LWFYMzlkMXZXWU1WaUdwcGk1QklXNTBtVTIyYnR4RG4ydkZLT2xqckQ3SHdjM251WDRTTXBSVmVkWldRaGRqMEFPcTZJWG9MWDBiUGxLaXVrRDRZWFBNbUhRcGNoRktVLU82RVY0WkZIOFRXSDRYc01SRVQwc0lRemVYYWFfWkQtOWpFYVZmZDVZb1RUUUl3NW5N?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://uk.finance.yahoo.com/news/key-volkswagen-shareholder-pitches-producing-093138488.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/vw-shareholder-china-models-germany.png",
      "alt": "A vast, idle German automobile assembly hall with empty production lines and silent machinery, no text, no logos",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Britain Loses Its Crown as 'the Workshop of the World'",
        "excerpt": "From 1815 to 1870 Britain was the first industrial nation and styled itself 'the workshop of the world,' underselling rival nations in their own markets. Yet by 1900 Germany was outproducing Britain in pig iron and the United States produced nearly double, as both invested in education and new technologies the early leader had pioneered. The original master of industry was overtaken by the pupils it had once supplied.",
        "source": "Wikipedia, Manufacturing in the United Kingdom",
        "href": "https://en.wikipedia.org/wiki/Manufacturing_in_the_United_Kingdom"
      },
      {
        "category": "historical",
        "title": "Honda Builds Japanese Cars on American Soil at Marysville",
        "excerpt": "On 1 November 1982 the first Honda Accord rolled off the line at Marysville, Ohio, the first Japanese automaker to build a car in the United States. As Japanese rivals overtook Detroit, they planted factories inside their competitor's home market to make foreign-brand cars on local soil. The plant grew into a vast operation, a mirror image of the proposal that foreign models now be built in Germany.",
        "source": "Wikipedia, Marysville Auto Plant",
        "href": "https://en.wikipedia.org/wiki/Marysville_Auto_Plant"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes 9:11 — The Race Is Not to the Swift",
        "excerpt": "I returned, and saw under the sun, that the race is not to the swift, nor the battle to the strong, neither yet bread to the wise, nor yet riches to men of understanding, nor yet favour to men of skill; but time and chance happeneth to them all.",
        "source": "Bible (King James Version), Ecclesiastes 9:11",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "literary",
        "title": "Oliver Goldsmith, \"The Deserted Village\" (1770)",
        "excerpt": "Ill fares the land, to hastening ills a prey,\nWhere wealth accumulates, and men decay:\nPrinces and lords may flourish, or may fade;\nA breath can make them, as a breath has made:\nBut a bold peasantry, their country's pride,\nWhen once destroy'd, can never be supplied.",
        "source": "Oliver Goldsmith, The Deserted Village (1770)",
        "href": "https://www.gutenberg.org/files/50500/50500-h/50500-h.htm"
      },
      {
        "category": "artistic",
        "title": "Adolph Menzel, 'The Iron Rolling Mill' (Eisenwalzwerk)",
        "excerpt": "Painted 1872-1875, Menzel's vast canvas depicts a Silesian rail-works ablaze with furnaces and labouring men, the first large-format painting of a great industrial operation. It captured German industry at the moment of its rise, the very heavy industry whose modern descendant now contemplates handing its idle halls to foreign hands. The 'Modern Cyclopes' of the title cast Germany's workers as titans of a new age.",
        "source": "Adolph Menzel, Alte Nationalgalerie, Berlin (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/vw-shareholder-china-models-germany--art.png",
          "alt": "Adolph Menzel's painting The Iron Rolling Mill, showing workers labouring amid the glow of furnaces in a 19th-century German ironworks",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner, the Forging Song from 'Siegfried'",
        "excerpt": "In Act I of Wagner's 'Siegfried' (WWV 86C), the young hero forges the broken sword Nothung anew, shredding, melting and recasting the metal as he sings 'Hoho! Hoho! Hohei! Schmiede, mein Hammer.' The Forging Song is the supreme musical emblem of German smithcraft and the reforging of strength from shattered pieces. It sounds the theme of industrial renewal that now hangs over Volkswagen's silent forges.",
        "source": "Richard Wagner, 'Siegfried' WWV 86C (IMSLP, public domain)",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      }
    ],
    "rank": 6
  },
  {
    "slug": "kentucky-flooding-deaths",
    "headline": "At least four people die in flooding from heavy rains in Kentucky, the governor says",
    "overview": "At least four people died in flooding caused by heavy rains in Kentucky, Governor Andy Beshear said. Storms dropped as much as 10 inches of rain across the region, knocking out roads and trapping residents inside homes and vehicles. Emergency crews carried out numerous water rescues as the governor declared a state of emergency.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxNSXpFdWlZaWlJVVZNNndBVHB2a0lxaG9pNWxOLTJlN3IzdXZGN2ZyVG9IZDZHSWd6UjhXbENKdnA5MlF1VUg2akJ1a2FZaDVLREtIeVVJYUVUYzVFcVUyQklYWkd0ZmF2Zk5TV2JPVFlyZW5VNFdYLXJIT3JhUGExQkdiYzMwMTA5YnlFa0F4d0syclFHYkJhLW15U1BOODJ6?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/kentucky-heavy-rain-flood-deaths/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/kentucky-flooding-deaths.png",
      "alt": "A flooded street with buildings and vehicles standing in brown floodwater.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Johnstown Flood (1889)",
        "excerpt": "On May 31, 1889, after days of heavy rain, the South Fork Dam above Johnstown, Pennsylvania, gave way and sent some 20 million tons of water roaring down the valley. More than 2,200 people were killed in one of the deadliest flood disasters in American history. The catastrophe became a national symbol of how swiftly rising water can overwhelm a community, and it spurred a landmark relief effort by the new American Red Cross under Clara Barton.",
        "source": "National Park Service",
        "href": "https://www.nps.gov/jofl/learn/historyculture/index.htm"
      },
      {
        "category": "historical",
        "title": "The Great Mississippi Flood of 1927",
        "excerpt": "In the spring of 1927 the Mississippi River, swollen by months of relentless rain, burst its levees and inundated some 27,000 square miles across the lower South. Hundreds died and roughly 700,000 people were displaced as floodwaters reached depths of up to thirty feet. The disaster reshaped federal flood policy and drove a wave of migration, and it remains one of the most destructive river floods in United States history.",
        "source": "PBS American Experience",
        "href": "https://www.pbs.org/wgbh/americanexperience/films/flood/"
      },
      {
        "category": "literary",
        "title": "The Genesis Flood (Book of Genesis, KJV)",
        "excerpt": "In the six hundredth year of Noah's life, in the second month, the seventeenth day of the month, the same day were all the fountains of the great deep broken up, and the windows of heaven were opened. And the rain was upon the earth forty days and forty nights. And the waters prevailed, and were increased greatly upon the earth; and the ark went upon the face of the waters. And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered.",
        "source": "Genesis 7 (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "The Flood of Deucalion (Ovid, Metamorphoses, Book I)",
        "excerpt": "With soaking wings the South Wind flies abroad, having his terrible face covered with pitchy darkness; his beard is loaded with showers, the water streams down from his hoary locks, clouds gather upon his forehead, his wings and the folds of his robe drip with wet. And now sea and land had no mark of distinction; everything now was ocean; and to that ocean shores were wanting.",
        "source": "Ovid's Metamorphoses, trans. Henry T. Riley (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/21765/21765-h/21765-h.htm"
      },
      {
        "category": "artistic",
        "title": "Francis Danby, \"The Deluge\" (exhibited 1840)",
        "excerpt": "Francis Danby's vast apocalyptic canvas depicts the Genesis flood at its climax, with churning black waves engulfing the last desperate figures clinging to rocks and one another beneath a storm-torn sky. The scene fuses sublime terror and divine judgment, dwarfing humanity against the overwhelming force of the deluge. The painting now hangs in Tate Britain, London.",
        "source": "Francis Danby, The Deluge (exhibited 1840), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Francis_Danby_-_The_Deluge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/kentucky-flooding-deaths--art.png",
          "alt": "Francis Danby's painting The Deluge, showing figures overwhelmed by a vast biblical flood under a stormy sky",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Symphony No. 6 'Pastoral', Op. 68 - IV. 'Gewitter, Sturm' (Ludwig van Beethoven, 1808)",
        "excerpt": "The fourth movement of Beethoven's 'Pastoral' Symphony, titled 'Thunderstorm. Tempest', erupts after the peasants' merrymaking with rumbling low strings, stabbing string figures and crashing timpani that evoke a sudden, violent storm. Piccolo and trombones heighten the fury before the tempest subsides into the calm of the closing shepherd's hymn, making it one of music's most vivid depictions of a deluge breaking over the land.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 7
  },
  {
    "slug": "austria-algeria-world-cup-thriller",
    "headline": "Austria and Algeria advance to the World Cup round of 32 after a 3-3 thriller that eliminates Iran",
    "overview": "Austria and Algeria played out a 3-3 draw at Arrowhead Stadium in Kansas City on 27 June 2026, a Group J result that sent both nations into the 2026 World Cup round of 32 and eliminated Iran. Riyad Mahrez put Algeria 3-2 ahead in the 93rd minute before substitute Sasa Kalajdzic equalised with virtually the last touch of the game. Austria coach Ralf Rangnick dismissed suggestions of collusion over the mutually beneficial outcome, saying the chaotic stoppage-time sequence was far too unpredictable to have been planned.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNaDBnWUw2ZjNJbF82RElqNG5JNmlqcnA2Q0R0NFhObzBrSVZ5TThlZHlyV1M5bjNGVlgxWUNzMnFuLUV5SmhTNmtEeFFQN01JdkZwM3M1M2FfV3NUel84UlhsQVNNM3JqZ3o5bk1fNFJST3U1WUJjbmtLOTRLRXJFNGNZS0xMR0phcnNEaVE1aWo3RDJNZUFaWklzVHhqeXphaERIel9INHFkSWZN?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxORGZtUTNvcnNDU2dHNjd4OUFzNEdJSldUYXhxdk1MSHJ2VUdKeExCMW42X1QzMFg0RG0yWXFFQVBpLTd3aG00TWhZc3pCaHRpX2QxUlA4Nm52b2lnNmJpVjBoeTBfSTBJX0VFWUVZSHY4S014RUVVZVNjV2tQWUlEei1IakJPMGVyWkkza3JldUlPSGRVTnRVY3RJSHFDTlMxQmI4clVycmM4YkJhcUlGdXA2VS1zeDQxbExxRURmc2M?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/austria-algeria-world-cup-thriller.png",
      "alt": "Arrowhead Stadium in Kansas City, a large open-air sports stadium, viewed from the stands.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Disgrace of Gijon (1982 World Cup)",
        "excerpt": "In the final Group 2 match of the 1982 World Cup, West Germany and Austria played out a 1-0 result that suited both teams and eliminated Algeria, who had stunned the Germans days earlier. After Horst Hrubesch's early goal the two sides visibly stopped attacking and passed the ball harmlessly for the rest of the match, prompting outrage and accusations of collusion. The scandal led FIFA to schedule the final group matches simultaneously thereafter. The 2026 Austria-Algeria thriller carried the same shadow of a convenient result, which Rangnick was at pains to deny.",
        "source": "FIFA / World Cup history",
        "href": "https://en.wikipedia.org/wiki/Disgrace_of_Gij%C3%B3n"
      },
      {
        "category": "historical",
        "title": "The Ancient Olympic Games",
        "excerpt": "From 776 BC the Greeks gathered every four years at Olympia to contest foot races, wrestling, boxing and the four-horse chariot race, with victors crowned only with a wreath of wild olive yet immortalised in song and statue. A sacred truce suspended warfare so athletes and spectators could travel safely, and victory conferred glory on a man's whole city. The Games framed athletic contest as the supreme stage of human striving, fortune and renown, a tradition the modern World Cup self-consciously inherits.",
        "source": "Encyclopaedia / Olympic history",
        "href": "https://en.wikipedia.org/wiki/Ancient_Olympic_Games"
      },
      {
        "category": "literary",
        "title": "Pindar, Olympian Ode 1",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice.",
        "source": "Odes of Pindar, trans. Ernest Myers (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/1"
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book XXIII (the chariot race)",
        "excerpt": "Their heart, their eyes, their voice, they send before; / And up the champaign thunder from the shore: / Thick, where they drive, the dusty clouds arise, / And the lost courser in the whirlwind flies; / Loose on their shoulders the long manes reclined, / Float in their speed, and dance upon the wind.",
        "source": "The Iliad of Homer, trans. Alexander Pope (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_23"
      },
      {
        "category": "artistic",
        "title": "The Chariot Race by Alexander von Wagner",
        "excerpt": "Painted around 1882, this dramatic oil on canvas shows the climax of a chariot race in the Roman Circus Maximus, the lead driver hurtling toward the viewer amid a storm of dust, straining horses and a roaring crowd. Wagner captures the raw spectacle, speed and peril of competitive sport, the ancient ancestor of the floodlit drama of the modern stadium. The work hangs in the Manchester Art Gallery.",
        "source": "Manchester Art Gallery / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Alexander_von_Wagner_(1838-1919)_-_The_Chariot_Race_-_1898.12_-_Manchester_Art_Gallery.jpg",
        "image": {
          "src": "/covers/austria-algeria-world-cup-thriller--art.png",
          "alt": "The Chariot Race, a chariot hurtling toward the viewer through dust in a Roman circus, by Alexander von Wagner",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Pomp and Circumstance March No. 1 in D, Op. 39",
        "excerpt": "A swaggering march strides in with crisp brass and snapping rhythms before swelling into a broad, soaring melody of unmistakable triumph. The grand tune returns in full ceremonial splendor, an anthem of acclamation and hard-won victory that lifts the whole orchestra to a glowing, exultant peak.",
        "source": "Edward Elgar, \"Pomp and Circumstance\" March No. 1 in D, Op. 39 (1901)",
        "href": "https://imslp.org/wiki/Pomp_and_Circumstance_Marches,_Op.39_(Elgar,_Edward)"
      }
    ],
    "rank": 8
  },
  {
    "slug": "bad-bunny-london-stadium",
    "headline": "Bad Bunny becomes the first Latin American artist to headline a UK stadium with sold-out London shows",
    "overview": "Puerto Rican superstar Bad Bunny performed at London's Tottenham Hotspur Stadium on 27 and 28 June 2026 as part of his DeBI TiRAR MAS FOToS World Tour, playing his Spanish-language repertoire to two sold-out crowds of around 50,000. The shows made him the first artist from Latin America to headline a UK stadium, a milestone for Latin music in Britain. His staging included 'La Casita,' a full-scale replica of a traditional working-class Puerto Rican home.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c2dyrk56dg9o"
      },
      {
        "name": "ITV News",
        "href": "https://www.itv.com/news/2026-06-28/bad-bunny-becomes-first-artist-from-latin-america-to-headline-a-uk-stadium-show"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/bad-bunny-london-stadium.png",
      "alt": "Bad Bunny performing on stage",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Roman triumph: a conqueror received with acclamation",
        "excerpt": "...he himself, girding his clothes about him, and crowning his head with a laurel-garland, his hair gracefully flowing, carried the trophy resting erect upon his right shoulder, and so marched on, singing songs of triumph, and his whole army following after, the citizens all receiving him with acclamations of joy and wonder. The procession of this day was the origin and model of all after triumphs.",
        "source": "Plutarch, Life of Romulus (Dryden translation)",
        "href": "https://www.gutenberg.org/cache/epub/674/pg674.txt"
      },
      {
        "category": "historical",
        "title": "Haydn conquers London, 1791",
        "excerpt": "When the Austrian composer Joseph Haydn travelled to London at the impresario Johann Peter Salomon's invitation, arriving on New Year's Day 1791, the foreign genius took the city by storm. Across an eighteen-month stay he was, in Britannica's words, feted, lionized, and treated as a genius, with Charles Burney publishing a poem in his honour. The London symphonies he wrote there became the climax of his orchestral output, an outsider crowned in the capital that came to claim him as its own.",
        "source": "Encyclopaedia Britannica, 'Joseph Haydn: English period'",
        "href": "https://www.britannica.com/biography/Joseph-Haydn/English-period"
      },
      {
        "category": "literary",
        "title": "Orpheus sings down the powers of the underworld",
        "excerpt": "As he said such things, and touched the strings to his words, the bloodless spirits wept. Tantalus did not catch at the retreating water, and the wheel of Ixion stood still, {as though} in amazement; the birds did not tear the liver {of Tityus}; and the granddaughters of Belus paused at their urns; thou, too, Sisyphus, didst seat thyself on thy stone. The story is, that then, for the first time, the cheeks of the Eumenides, overcome by his music, were wet with tears.",
        "source": "Ovid, Metamorphoses, Book X (Riley translation)",
        "href": "https://www.gutenberg.org/cache/epub/26073/pg26073.txt"
      },
      {
        "category": "literary",
        "title": "Whitman hears a nation singing in many voices",
        "excerpt": "I hear America singing, the varied carols I hear, / Those of mechanics, each one singing his as it should be blithe and strong, / The carpenter singing his as he measures his plank or beam, / The mason singing his as he makes ready for work, or leaves off work, / ... / Each singing what belongs to him or her and to none else, / The day what belongs to the day--at night the party of young / fellows, robust, friendly, / Singing with open mouths their strong melodious songs.",
        "source": "Walt Whitman, 'I Hear America Singing,' Leaves of Grass",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt"
      },
      {
        "category": "artistic",
        "title": "Roelant Savery, 'Orpheus Charming the Animals with His Music' (1627)",
        "excerpt": "In Roelant Savery's panel the legendary singer sits at the centre of a teeming wilderness, lyre in hand, as every creature of land and air gathers around him in rapt stillness. The Flemish master crowds the scene with meticulously observed beasts drawn together by sound alone, a Baroque image of music's power to summon and unite a whole world before one performer.",
        "source": "Roelant Savery, oil on panel, 1627, Mauritshuis",
        "href": "https://commons.wikimedia.org/wiki/File:Orpheus_Charming_the_Animals_with_His_Music_by_Roelant_Savery_Mauritshuis_157.jpg",
        "image": {
          "src": "/covers/bad-bunny-london-stadium--art.png",
          "alt": "Painting of Orpheus playing his lyre surrounded by animals gathered to hear his music",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Gluck, 'Orfeo ed Euridice' (1762)",
        "excerpt": "Christoph Willibald Gluck's reform opera 'Orfeo ed Euridice' makes the singer himself the hero, his voice powerful enough to move the dead. Its celebrated Act III aria 'Che faro senza Euridice?' distils the work's central claim, that song is a force capable of crossing every threshold. The full score is in the public domain on IMSLP.",
        "source": "Christoph Willibald Gluck, 'Orfeo ed Euridice,' Wq.30 (1762), IMSLP",
        "href": "https://imslp.org/wiki/Orfeo_ed_Euridice,_Wq.30_(Gluck,_Christoph_Willibald)"
      }
    ],
    "rank": 9
  },
  {
    "slug": "turrell-100th-skyscape-aarhus",
    "headline": "James Turrell opens his 100th Skyspace, 'As Seen Below,' at the ARoS museum in Aarhus",
    "overview": "James Turrell has opened 'As Seen Below,' a monumental domed Skyspace, at the ARoS Aarhus Kunstmuseum in Denmark, where it opened in June 2026. The installation stands more than 50 feet high and 130 feet wide, with an oculus open to the sky and programmed colour shifts that transform the space. It is Turrell's 100th Skyscape, a series now installed across 26 countries.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/james-turrell-as-seen-below-skyscape-aros-aarhus-denmark/"
      },
      {
        "name": "ARoS Aarhus Kunstmuseum",
        "href": "https://www.aros.dk/en/aros-collection/as-seen-below-the-dome-a-skyspace-by-james-turrell/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/turrell-100th-skyscape-aarhus.png",
      "alt": "Interior of James Turrell's domed Skyscape with an oculus open to a coloured sky",
      "credit": "Colossal"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The oculus of the Pantheon, Rome (c. 118-128 CE)",
        "excerpt": "Hadrian's Pantheon receives illumination exclusively through a single opening at the apex of its vast concrete dome, the roughly 27-foot oculus, or 'eye,' open directly to the sky. As the sun crosses the heavens, a shifting disc of daylight moves across the coffered interior, making the building itself an instrument for watching the sky. Turrell's domed Skyspaces revive this ancient architecture of light, where a circular aperture turns the human gaze upward toward the heavens.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/topic/Pantheon-building-Rome-Italy"
      },
      {
        "category": "historical",
        "title": "Isaac Newton, 'Opticks' (1704)",
        "excerpt": "In his treatise on the reflexions, refractions and colours of light, Newton showed by prism experiments that white light is composed of the spectrum of colours, and he devised the first colour circle in the history of colour theory. His work established that perceived colour is the result of how light is refracted and received rather than an objective property of objects. Turrell's programmed colour shifts, which 'cast brilliant colour around the space,' are a direct artistic descendant of Newton's demonstration that light and human perception together produce what we see.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/topic/Opticks-by-Newton"
      },
      {
        "category": "literary",
        "title": "Genesis 1:1-5 (King James Version, 1611)",
        "excerpt": "In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. And God said, Let there be light: and there was light. And God saw the light, that it was good: and God divided the light from the darkness.",
        "source": "Wikisource (King James Bible)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Dante Alighieri, 'Paradiso,' Canto XXXIII (trans. Longfellow, 1867)",
        "excerpt": "O Light Eterne, sole in thyself that dwellest, / Sole knowest thyself, and, known unto thyself / And knowing, lovest and smilest on thyself! ... But now was turning my desire and will, / Even as a wheel that equally is moved, / The Love which moves the sun and the other stars.",
        "source": "Wikisource (Divine Comedy, Longfellow 1867)",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_33"
      },
      {
        "category": "artistic",
        "title": "Caspar David Friedrich, 'The Monk by the Sea' (1808-1810)",
        "excerpt": "Friedrich reduces his canvas to a thin strip of shore beneath an immense, luminous expanse of sky and sea, before which a single small monk stands in contemplation. The painting confronts the viewer with the sublime emptiness of the heavens and the smallness of the human figure gazing upward into it. It anticipates the contemplative encounter Turrell stages, in which a solitary viewer turns the gaze skyward and surrenders to the boundless light overhead.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Der_M%C3%B6nch_am_Meer_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/turrell-100th-skyscape-aarhus--art.png",
          "alt": "A solitary monk stands on a narrow shore beneath a vast luminous sky in Caspar David Friedrich's painting The Monk by the Sea",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Clair de lune (from Suite bergamasque)",
        "excerpt": "Soft, rippling piano figures drift like moonlight settling over still water, each phrase shimmering with delicate, suspended luminosity. The harmonies glow and dissolve in gentle waves, an intimate, contemplative play of light and shadow that invites quiet, attentive perception.",
        "source": "Claude Debussy, \"Clair de lune\" from Suite bergamasque (1890, rev. 1905)",
        "href": "https://imslp.org/wiki/Suite_bergamasque_(Debussy,_Claude)"
      }
    ],
    "rank": 10
  },
  {
    "slug": "the-box-museum-of-the-year",
    "headline": "The Box in Plymouth wins the UK's 2026 Art Fund Museum of the Year award",
    "overview": "The Box in Plymouth has won the 2026 Art Fund Museum of the Year, the UK's most prestigious museum prize, along with its £120,000 award. The prize was presented to Box CEO Victoria Pomery by broadcaster and judge June Sarpong aboard the Cutty Sark in London on 25 June 2026. The four other shortlisted institutions — the Fitzwilliam Museum, Norwich Castle Museum & Art Gallery, the National Gallery, and V&A East Storehouse — each received £20,000.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/the-box-in-plymouth-wins-uks-2026-museum-of-the-year-award-1234753479/"
      },
      {
        "name": "Art Fund",
        "href": "https://www.artfund.org/museum-of-the-year"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/the-box-museum-of-the-year.png",
      "alt": "The Box museum in Plymouth",
      "credit": "Artforum"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Library and Mouseion of Alexandria",
        "excerpt": "Founded under the early Ptolemies in the 3rd century BCE, the Mouseion of Alexandria was conceived as a temple to the Nine Muses — the root of the word \"museum\" — and an intellectual hub gathering scholars from across the Mediterranean. Its ambition was to assemble a comprehensive repository of all human knowledge, from epic poetry to cookbooks, and to translate important foreign works into Greek. Like The Box, it embodied the idea of a single institution as the keeper and gathering-point of a culture's treasures.",
        "source": "World History Encyclopedia",
        "href": "https://www.worldhistory.org/Library_of_Alexandria/"
      },
      {
        "category": "historical",
        "title": "The Founding of the British Museum",
        "excerpt": "Established on 7 June 1753 by the British Museum Act, the British Museum grew from the bequest of some 71,000 objects amassed by the physician and collector Sir Hans Sloane, and opened to the public in Montagu House in 1759. It was the world's first public national museum — belonging to neither church nor king, freely open to all, and aiming to collect everything. It set the template, echoed in The Box's award, for the museum as a civic keeper of memory and collections.",
        "source": "Wikipedia (British Museum)",
        "href": "https://en.wikipedia.org/wiki/British_Museum"
      },
      {
        "category": "literary",
        "title": "Horace, Odes III.30 (\"Exegi monumentum\")",
        "excerpt": "I constructed a monument of pyramids more durable than bronze / and higher than a royal site, / which the greedy rain, the raging North Wind / would not be able to tear apart or countless / series of years and flight of time. / I would not entirely die and a large part of me / will avoid Libitina; fresh, I continually / would grow with future praise, while / the high priest will climb the Capitol with a quiet maiden.",
        "source": "Wikisource (Translation: Odes of Horace, Book III.30)",
        "href": "https://en.wikisource.org/wiki/Translation:Odes_(Horace)/Book_III/30"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Sonnet 55",
        "excerpt": "Not marble nor the gilded monuments\nOf princes shall outlive this powerful rhyme,\nBut you shall shine more bright in these contents\nThan unswept stone besmeared with sluttish time.\nWhen wasteful war shall statues overturn,\nAnd broils root out the work of masonry,\nNor Mars his sword nor war's quick fire shall burn\nThe living record of your memory.\n'Gainst death and all oblivious enmity\nShall you pace forth; your praise shall still find room\nEven in the eyes of all posterity\nThat wear this world out to the ending doom.\nSo, till the judgment that yourself arise,\nYou live in this, and dwell in lovers' eyes.",
        "source": "William Shakespeare, Sonnet 55",
        "href": "https://www.folger.edu/explore/shakespeares-works/shakespeares-sonnets/read/55/"
      },
      {
        "category": "artistic",
        "title": "David Teniers the Younger, \"Archduke Leopold Wilhelm in his Picture Gallery at Brussels\" (c. 1647-1651)",
        "excerpt": "Teniers, court painter and keeper of the archduke's collection, depicts Leopold Wilhelm standing amid wall-to-wall masterpieces in his Brussels gallery — one of the earliest \"gallery pictures\" showing a princely collection assembled and displayed. The painting is itself a portrait of collecting: an inventory in oils that captures the gathering and display of treasures, prefiguring the modern museum honoured by the Art Fund award.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David_Teniers_(II)_-_Archduke_Leopold_Wilhelm_in_his_Picture_Gallery_at_Brussels.jpg",
        "image": {
          "src": "/covers/the-box-museum-of-the-year--art.png",
          "alt": "The Archduke Leopold Wilhelm standing in his picture gallery in Brussels, the walls densely hung with paintings",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Henry Purcell, \"Hail, Bright Cecilia\" (Ode for St Cecilia's Day, 1692), Z.328",
        "excerpt": "Purcell's grand ode in honour of St Cecilia, patron saint of music, sets a text by Nicholas Brady for soloists, chorus and orchestra across thirteen movements. A celebration of the Muses' art and of music as a force that orders the world, it stands as a sounding monument to a culture's creative inheritance — the aural equivalent of a museum gathering and preserving its treasures.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Hail,_Bright_Cecilia,_Z.328_(Purcell,_Henry)"
      }
    ],
    "rank": 11
  },
  {
    "slug": "german-court-google-ai-liability",
    "headline": "A German court holds Google liable for false claims generated by its AI Overviews",
    "overview": "The Regional Court of Munich (Landgericht München, case 26 O 869/26) issued a temporary injunction holding Google liable for false statements its AI Overviews generated about two Munich publishers, which the summaries falsely linked to scams and subscription traps. The court treated the AI-generated text as Google's own independent statements rather than mere indexing of search results, and rejected the argument that users were obliged to fact-check the answers themselves. It is regarded as one of the first rulings to hold an AI company directly liable for speech produced by its own system.",
    "genre": "Technology",
    "sources": [
      {
        "name": "The Decoder",
        "href": "https://the-decoder.com/landmark-german-ruling-declares-googles-ai-overviews-are-googles-own-words-and-makes-it-liable-for-false-answers/"
      },
      {
        "name": "Simon Willison",
        "href": "https://simonwillison.net/2026/Jun/25/ai-and-liability/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/german-court-google-ai-liability.png",
      "alt": "Exterior of the Justizpalast (Palace of Justice) in Munich, Germany, viewed from Stachus (Karlsplatz), a monumental neo-baroque courthouse building.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Golem of Prague",
        "excerpt": "In the Jewish legend, Rabbi Judah Loew of sixteenth-century Prague molds a man of clay and animates it to serve and protect the community. The created servant, lacking judgment of its own, eventually grows uncontrollable and dangerous, forcing its maker to take responsibility and deactivate it. The story endures as a parable of human creators answerable for the artificial agents they bring to life.",
        "source": "Encyclopaedia Britannica, entry on the golem",
        "href": "https://www.britannica.com/topic/golem"
      },
      {
        "category": "historical",
        "title": "Respondeat superior: the master answers for the agent",
        "excerpt": "The common-law doctrine respondeat superior, 'let the master answer,' holds a principal liable for the wrongful acts of agents and servants acting on its behalf. Rooted in older principles of agency, it places responsibility on the party who deploys and directs another to act in its interest. Commentators on the Munich ruling invoked precisely this logic, arguing that an AI system is an agent of the organization that deploys it and should be treated as such.",
        "source": "Legal Information Institute, Cornell Law School",
        "href": "https://www.law.cornell.edu/wex/respondeat_superior"
      },
      {
        "category": "literary",
        "title": "The False Witness, Proverbs 6:16-19 (King James Version)",
        "excerpt": "These six things doth the LORD hate: yea, seven are an abomination unto him: A proud look, a lying tongue, and hands that shed innocent blood, An heart that deviseth wicked imaginations, feet that be swift in running to mischief, A false witness that speaketh lies, and he that soweth discord among brethren.",
        "source": "The Proverbs 6:16-19, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Proverbs"
      },
      {
        "category": "literary",
        "title": "Plato, \"Phaedrus\" (trans. Benjamin Jowett) - Socrates on writing",
        "excerpt": "For it is like a picture, which can give no answer to a question, and has only a deceitful likeness of a living creature. It has no power of adaptation, but uses the same words for all.",
        "source": "Plato, Phaedrus, trans. Benjamin Jowett",
        "href": "https://www.gutenberg.org/cache/epub/1636/pg1636.txt"
      },
      {
        "category": "artistic",
        "title": "Sandro Botticelli, \"The Calumny of Apelles\" (c. 1494-95)",
        "excerpt": "Botticelli's allegory stages the destruction of an innocent man by slander: the hooded figure of Calumny drags her bound, helpless victim by the hair while Envy, Fraud, and Deceit attend her, and a credulous, ass-eared judge inclines his ear to Ignorance and Suspicion. The scene is a visual indictment of false accusation and defamatory testimony, showing how lies dressed as righteousness can condemn the blameless. The tempera panel hangs in the Uffizi Gallery, Florence.",
        "source": "Sandro Botticelli, The Calumny of Apelles (c. 1494-95), Uffizi, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_La_calumnia_de_Apeles.jpg",
        "image": {
          "src": "/covers/german-court-google-ai-liability--art.png",
          "alt": "Botticelli's The Calumny of Apelles, an allegorical scene of a slandered innocent dragged before an ass-eared judge",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "La calunnia è un venticello (from Il barbiere di Siviglia)",
        "excerpt": "Don Basilio describes slander as a faint little breeze, beginning as the softest murmur barely heard. As the music builds with relentless, accelerating crescendo, that whisper gathers force into a thunderous gale, swelling and exploding until a falsely accused victim is left crushed beneath the storm of rumor.",
        "source": "Gioachino Rossini, \"La calunnia è un venticello\" from Il barbiere di Siviglia (1816)",
        "href": "https://imslp.org/wiki/Il_barbiere_di_Siviglia_(Rossini,_Gioacchino)"
      }
    ],
    "rank": 12
  },
  {
    "slug": "wild-form-stonewall-bar",
    "headline": "Studio Wild Form designs a 'no straight lines' interior for a new bar beside New York's Stonewall Inn",
    "overview": "New York studio Wild Form has designed Love Thy Neighbor, a curving, cavern-like cocktail bar in the West Village beside the historic Stonewall Inn, dedicated to queer community and chosen family. Guided by an ethos of 'no straight lines,' its hand-shaped microcement walls, vaulted archways and curved booths reject rigid geometry in favour of fluid, organic form. A single brick salvaged from the Stonewall Inn is illuminated inside, and a Marsha P. Johnson quote is set into the floor at the entrance.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/27/wild-form-design-studio-love-thy-neighbor-west-village-nyc/"
      },
      {
        "name": "Hospitality Design - Wild Form Design Studio Shapes a Queer Sanctuary in New York",
        "href": "https://hospitalitydesign.com/news/love-thy-neighbor-west-village-new-york/629526"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/wild-form-stonewall-bar.png",
      "alt": "The Stonewall Inn in Greenwich Village, New York City, its storefront decorated with rainbow gay-pride flags and a banner.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Stonewall uprising of 1969",
        "excerpt": "The Stonewall riots were a 'series of violent confrontations that began in the early hours of June 28, 1969, between police and gay rights activists outside the Stonewall Inn' in Greenwich Village. As Britannica notes, 'Stonewall soon became a symbol of resistance to social and political discrimination that would inspire solidarity among homosexual groups for decades,' making the inn the birthplace of the modern Pride movement that the new bar now stands beside.",
        "source": "Encyclopaedia Britannica, 'Stonewall riots'",
        "href": "https://www.britannica.com/event/Stonewall-riots"
      },
      {
        "category": "historical",
        "title": "The ancient sanctuary of the altar (Aeschylus, The Suppliant Maidens)",
        "excerpt": "The war-worn fliers from the battle's wrack / Find refuge at the hallowed altar-side, / The sanctuary divine,— / Ye gods! such refuge unto me provide— / Such sanctuary be mine!",
        "source": "Aeschylus, 'The Suppliant Maidens,' trans. E. D. A. Morshead, in Four Plays of Aeschylus",
        "href": "https://www.gutenberg.org/cache/epub/8714/pg8714.html.utf8"
      },
      {
        "category": "literary",
        "title": "For You O Democracy (Calamus) by Walt Whitman",
        "excerpt": "Come, I will make the continent indissoluble, / I will make the most splendid race the sun ever shone upon, / I will make divine magnetic lands, / With the love of comrades, / With the life-long love of comrades. // I will plant companionship thick as trees along all the rivers of America, and along the shores of the great lakes, and all over the prairies, / I will make inseparable cities with their arms about each other's necks, / By the love of comrades, / By the manly love of comrades. // For you these from me, O Democracy, to serve you ma femme! / For you, for you I am trilling these songs.",
        "source": "Walt Whitman, 'For You O Democracy,' Leaves of Grass (Calamus)",
        "href": "https://www.poetryfoundation.org/poems/51567/for-you-o-democracy"
      },
      {
        "category": "literary",
        "title": "Sappho's fragment of the sacred grove",
        "excerpt": "All around through branches of apple-orchards / Cool streams call, while down from the leaves a-tremble / Slumber distilleth.",
        "source": "Sappho, Fragment, trans. J. A. Symonds (1883), in Sappho: Memoir, Text, Selected Renderings",
        "href": "https://www.gutenberg.org/files/57390/57390-h/57390-h.htm"
      },
      {
        "category": "artistic",
        "title": "Hector Guimard's Art Nouveau Paris Metro entrance, Porte Dauphine (1900)",
        "excerpt": "Hector Guimard's cast-iron Metro entrances are the supreme statement of Art Nouveau's revolt against the straight line. At Porte Dauphine, the only surviving glazed 'edicule,' green-painted iron stems uncurl like plant tendrils into whiplash arches, fanning out into a glass canopy. Like Wild Form's sculpted bar, the design treats architecture as living, organic growth rather than rigid assembly.",
        "source": "Wikimedia Commons (photo Jean-Pierre Dalbera, CC BY 2.0)",
        "href": "https://commons.wikimedia.org/wiki/File:La_station_art_nouveau_de_la_porte_Dauphine_(Hector_Guimard).jpg",
        "image": {
          "src": "/covers/wild-form-stonewall-bar--art.png",
          "alt": "Hector Guimard's curving green Art Nouveau cast-iron Metro entrance at Porte Dauphine, Paris",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Slavonic Dance No. 8 in G minor, Op. 46",
        "excerpt": "A stamping, fiery furiant bursts forth with cross-rhythms and whirling momentum, sweeping the listener into a communal village dance. Bright, folk-flavored melodies surge and spin in joyous abandon, a breathless celebration of belonging that races to an exhilarating finish.",
        "source": "Antonín Dvořák, Slavonic Dance No. 8 in G minor, Op. 46 (1878)",
        "href": "https://imslp.org/wiki/Slavonic_Dances,_Op.46_(Dvořák,_Antonín)"
      }
    ],
    "rank": 13
  },
  {
    "slug": "serbia-vucic-resign",
    "headline": "Serbia's President Aleksandar Vučić says he will resign within weeks and call early elections",
    "overview": "Serbia's populist president Aleksandar Vučić told supporters at a Belgrade rally that he will step down within weeks, paving the way for early presidential and parliamentary elections. The announcement follows more than a year of student-led mass protests sparked by the November 2024 Novi Sad rail-station disaster that killed 16 people. Vučić, who is barred from a third term, said he would campaign to help his Serbian Progressive Party win the coming vote.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNaWswUmpzRjlYcjZidUdnOF9iYmxXUDVFNUdHRWdINUJ0bHliUjVva2I1dHNCUjRTTmRndXdfZlIwamRUanplQWhMcFI5bWJTWHZ3cXY0VzE4TTEwNjNoY1d1aFdadVdnMW1xeXJ3aEtoaFctZjhYd0J4dlR5REVlMG8tamU2aklpQWFQRG85UUR4SmtYenJmWTBsSkZmb2lOQ3kxMHhVMUViVEV0Z3J6cnFpZEs1TkZpcXc?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/27/serbias-president-aleksandar-vucic-says-will-resign-within-weeks"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/serbia-vucic-resign.png",
      "alt": "Serbian President Aleksandar Vučić speaking at a podium",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Abdication of King Edward VIII (1936)",
        "excerpt": "But you must believe me when I tell you that I have found it impossible to carry the heavy burden of responsibility and to discharge my duties as King as I would wish to do without the help and support of the woman I love.",
        "source": "Edward VIII, Abdication broadcast, 11 December 1936 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Edward_VIII_of_the_United_Kingdom%27s_Abdication"
      },
      {
        "category": "historical",
        "title": "Napoleon's First Abdication at Fontainebleau (1814)",
        "excerpt": "The allied powers having proclaimed that the Emperor Napoleon was the sole obstacle to the re-establishment of peace in Europe, the Emperor Napoleon, faithful to his oath, declares that he is ready to descend from the throne, to leave France and even to lay down his life for the welfare of the fatherland, which cannot lie separated from the rights of his son, those of the regency of the Empress, and the laws of the Empire.",
        "source": "Act of Abdication of Napoleon I, Fontainebleau, April 1814 (Napoleon & Empire, official texts)",
        "href": "https://www.napoleon-empire.org/en/official-texts/abdication_1.php"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Richard II (Act IV, Scene 1 — the deposition)",
        "excerpt": "Now mark me, how I will undo myself; I give this heavy weight from off my head And this unwieldy sceptre from my hand, The pride of kingly sway from out my heart; With mine own tears I wash away my balm, With mine own hands I give away my crown, With mine own tongue deny my sacred state",
        "source": "Shakespeare, The Life and Death of King Richard II, Act IV, Scene 1 (MIT Complete Works of Shakespeare)",
        "href": "https://shakespeare.mit.edu/richardii/richardii.4.1.html"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (1818)",
        "excerpt": "And on the pedestal these words appear: 'My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!' Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare The lone and level sands stretch far away.",
        "source": "P. B. Shelley, \"Ozymandias,\" Complete Poetical Works (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/4798/pg4798-images.html"
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Boris Godunov (opera, 1869–72) — musical work",
        "excerpt": "Mussorgsky's towering Russian opera dramatizes a guilt-haunted ruler whose grip on power dissolves amid popular unrest and rumor, culminating in the Tsar's anguished collapse and death. The brooding orchestral colors, the great Coronation Scene's pealing bells, and the surging choruses of the common people make the crowd itself a character that can lift up and bring down a sovereign. It is a study of the loneliness and impermanence of authority — apt for a strongman forced toward the exit by a restless nation.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "Paul Delaroche, Napoleon I at Fontainebleau, 31 March 1814 (1840) — visual artwork",
        "excerpt": "Delaroche paints the once-invincible emperor slumped in a chair, his hat fallen to the floor and his boots still dirty from the field, the very image of a fallen strongman. The stillness and downcast gaze turn a world-shaking abdication into an intimate portrait of exhaustion and defeat. Against the empty room, the diminished figure makes vivid how swiftly absolute power can drain away under the weight of events.",
        "source": "Paul Delaroche, Museum der bildenden Künste, Leipzig (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:DelarocheNapoleon.jpg",
        "image": {
          "src": "/covers/serbia-vucic-resign--art.png",
          "alt": "Paul Delaroche's painting of a dejected Napoleon seated at Fontainebleau after his 1814 abdication, hat on the floor and gaze cast down.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "pakistan-rangers-hq-attack",
    "headline": "Militant rams explosive-laden vehicle into Pakistan Rangers headquarters in Karachi, killing six",
    "overview": "A militant rammed an explosives-laden vehicle into the provincial headquarters of the paramilitary Pakistan Rangers in Karachi, setting off an intense gun battle with security forces. A little-known group, Jamaat-ul-Ahrar, claimed responsibility for the assault. At least three troops and three militants were killed, in the latest of a surge of attacks on Pakistani security forces.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxNN09XY3hBLUg0WUZOc3ZuZVRQSUsySjZtTVFSbWRMNTRFa3VzMjR0Y0hiODA0b2IyMG1tY1hpNHNmVENPN1Z6ajBmaV9hZXVqTWhfazJSU1NxOUxwZGpNRUJyM3RiT19rOENMcXB1MHhaNnpEZktweldza3poT1ZBcjBXZnNjb2IwMHhJdzlhbEd2TlA2RWRlQ3dUenJGSUxlOE9YamVDZzBMR3BZTHdFMmE5V2ZZVk9PRGlpM1VkSXdILUNPS0E?oc=5"
      },
      {
        "name": "Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/06/27/pakistan-militants-attack-paramilitary-rangers-headquarters-karachi/f6a7895a-7254-11f1-8730-e7fd0e2a6404_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/pakistan-rangers-hq-attack.png",
      "alt": "Smoke and floodlights over the wall of a fortified security compound at night",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Fall of Constantinople (1453): Storming of the Theodosian Walls",
        "excerpt": "Hassan and his twelve companions had reached the summit: the giant was precipitated from the rampart: he rose on one knee, and was again oppressed by a shower of darts and stones. But his success had proved that the achievement was possible: the walls and towers were instantly covered with a swarm of Turks; and the Greeks, now driven from the vantage ground, were overwhelmed by increasing multitudes.",
        "source": "Edward Gibbon, History of the Decline and Fall of the Roman Empire, Chapter LXVIII",
        "href": "https://www.ccel.org/g/gibbon/decline/volume2/chap68.htm"
      },
      {
        "category": "historical",
        "title": "The Storming of the Bastille (1789): The Fortress Stronghold Falls",
        "excerpt": "Smite, thou Louis Tournay, cartwright of the Marais, old-soldier of the Regiment Dauphine; smite at that Outer Drawbridge chain, though the fiery hail whistles round thee! ... Sinks the drawbridge,-- Usher Maillard bolting it when down; rushes-in the living deluge: the Bastille is fallen! Victoire! La Bastille est prise!",
        "source": "Thomas Carlyle, The French Revolution: A History (1837)",
        "href": "https://fulltextarchive.com/page/The-French-Revolution-A-History4"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Henry V — \"Once more unto the breach\" (Act III, Scene I)",
        "excerpt": "Once more unto the breach, dear friends, once more;\nOr close the wall up with our English dead!\nIn peace there's nothing so becomes a man,\nAs modest stillness and humility;",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act III, Scene I",
        "href": "https://poets.org/poem/henry-v-act-iii-scene-i-once-more-unto-breach-dear-friends"
      },
      {
        "category": "literary",
        "title": "Homer's Iliad, Book XII — Hector Bursts the Rampart Gate (trans. Pope)",
        "excerpt": "Then thundering through the planks, with forceful sway,\nDrives the sharp rock: the solid beams give way;\nThe folds are shattered; from the crackling door\nLeap the resounding bars, the flying hinges roar.",
        "source": "Homer, The Iliad, Book XII, translated by Alexander Pope",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_12"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture, Op. 49 (musical)",
        "excerpt": "Tchaikovsky's festival overture stages a battle in sound, opening with a solemn Orthodox hymn that is soon overrun by the clash of opposing themes, surging strings, and martial brass. The music drives toward a thunderous climax of cannon fire, pealing bells, and a triumphant fanfare, evoking the assault, defense, and breaking of a besieged stronghold. Its relentless escalation from quiet prayer to explosive violence mirrors the storming of a fortified position.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Emanuel Leutze, Storming of the Teocalli by Cortez and His Troops (1848) (visual artwork)",
        "excerpt": "Leutze's sweeping 1848 history painting depicts conquistadors fighting their way to the summit of an Aztec temple-pyramid in a desperate, close-quarters assault on a fortified height. Bodies tumble from the stone terraces as armored attackers and defenders grapple amid smoke, banners, and bristling weapons at the breached stronghold. The vertiginous composition captures the savagery of storming a citadel gate-by-gate to its very pinnacle.",
        "source": "Emanuel Leutze, Wadsworth Atheneum (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Leutze,_Emanuel_%E2%80%94_Storming_of_the_Teocalli_by_Cortez_and_His_Troops_%E2%80%94_1848.jpg",
        "image": {
          "src": "/covers/pakistan-rangers-hq-attack--art.png",
          "alt": "Spanish conquistadors storming the summit of an Aztec temple-pyramid in close combat, defenders falling from the terraces",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "iraq-green-zone-corruption-arrests",
    "headline": "Iraqi forces seal Baghdad's Green Zone and arrest seven officials, including five lawmakers, on corruption charges",
    "overview": "Iraqi security forces sealed off the fortified Green Zone in Baghdad and carried out overnight raids, arresting seven people, among them five members of parliament whose immunity had been lifted. The arrests, tied to testimony from a detained former deputy oil minister, are part of Prime Minister Ali Al Zaidi's escalating anti-corruption campaign. Some of those detained belong to the bloc of a former prime minister.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxNMGNjMGlKN1dXNmp4T1lwWkhISjhBZF8wRXhHa0o5YzVPUjRiemZub1BFNFJBLWxCakU3d1NFUkxxb3k0aHR2a1V5OEFBMmRsQ3hWMXl4U0RtVDVOTVVuN0JTQkZwbWViWXBOWlV2NVJpNU1BelRoVmNkWHFHLWFJUmtrNWk0N1RVN1NF?oc=5"
      },
      {
        "name": "The National",
        "href": "https://www.thenationalnews.com/news/mena/2026/06/28/wave-of-overnight-arrests-hits-baghdads-green-zone-amid-anti-corruption-push/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/iraq-green-zone-corruption-arrests.png",
      "alt": "The Republican Palace inside Baghdad's fortified Green Zone",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Impeachment of Warren Hastings (Edmund Burke, 1788)",
        "excerpt": "Therefore, it is with confidence that, ordered by the Commons, I impeach Warren Hastings, Esquire, of high crimes and misdemeanors. I impeach him in the name of the Commons of Great Britain in Parliament assembled, whose parliamentary trust he has betrayed. I impeach him in the name of all the Commons of Great Britain, whose national character he has dishonored.",
        "source": "Edmund Burke, \"At the Trial of Warren Hastings,\" The World's Famous Orations, Vol. VI (via Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_World%27s_Famous_Orations/Volume_6/At_the_Trial_of_Warren_Hastings"
      },
      {
        "category": "historical",
        "title": "Cicero, The First Oration Against Verres (70 BC)",
        "excerpt": "For an opinion has now become established, pernicious to us, and pernicious to the republic, which has been the common talk of every one, not only at Rome, but among foreign nations also,—that in the courts of law as they exist at present, no wealthy man, however guilty he may be, can possibly be convicted.",
        "source": "Cicero, Against Verres I.1, trans. C. D. Yonge (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0018:text=Ver.:actio=1:book=1:section=1"
      },
      {
        "category": "literary",
        "title": "Dante, Inferno, Canto XXI — The Bolgia of the Peculators",
        "excerpt": "Behold one of the elders of Saint Zita; / Plunge him beneath, for I return for others / Unto that town, which is well furnished with them. / All there are barrators, except Bonturo; / No into Yes for money there is changed.",
        "source": "Dante Alighieri, The Divine Comedy: Hell, Canto XXI, trans. Henry Wadsworth Longfellow (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1001/pg1001-images.html"
      },
      {
        "category": "literary",
        "title": "The Cleansing of the Temple (Gospel of Matthew 21:12–13)",
        "excerpt": "And Jesus went into the temple of God, and cast out all them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves, And said unto them, It is written, My house shall be called the house of prayer; but ye have made it a den of thieves.",
        "source": "The Holy Bible, King James Version, Matthew 21:12–13 (via Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "artistic",
        "title": "Handel, Belshazzar, HWV 61 (1745) — oratorio (musical)",
        "excerpt": "Handel's oratorio sets the Book of Daniel's account of the doomed Babylonian king whose feast is interrupted by a divine hand inscribing the words of judgment upon the wall. With a single eerie violin line Handel paints the spectral writing taking form, and the prophet Daniel reads the verdict: the kingdom is weighed, found wanting, and divided. The mighty ruler is brought low overnight, his city falling to Cyrus, a tale of pride and venality answered by sudden reckoning.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Belshazzar,_HWV_61_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Rembrandt, Belshazzar's Feast (c. 1635–1638) — painting (visual artwork)",
        "excerpt": "In Rembrandt's blazing canvas the Babylonian king recoils in terror from the supernatural Hebrew script glowing in the darkness above his banquet. Gold goblets plundered from the Temple spill their wine as courtiers shrink back, the whole scene lit by the cold fire of divine judgment. It captures the precise instant a powerful, sacrilegious ruler is told his reign of greed and impiety is finished.",
        "source": "Rembrandt, National Gallery, London (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt-Belsazar.jpg",
        "image": {
          "src": "/covers/iraq-green-zone-corruption-arrests--art.png",
          "alt": "Rembrandt's Belshazzar's Feast: a startled king turns from glowing Hebrew writing on the wall as gold vessels spill at a torchlit banquet",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "obamacare-enrollment-drops-subsidies",
    "headline": "Nearly 3 million Americans drop Affordable Care Act coverage after subsidies expire and premiums soar",
    "overview": "About 3 million fewer people held Affordable Care Act health plans in February than a year earlier, a 13% drop from 22.1 million to 19.2 million, according to new federal data. Health analysts attribute the decline to the January 1 expiration of enhanced federal subsidies, which sent premiums up by double and triple digits and priced many enrollees out. The administration instead credited a crackdown on fraudulent enrollment.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPclVEQU9pV2NjNEl5aWhjQnJHa05pSlNxUTgtanVod3dZR3N4ZXd6ZF9YSjdPREVzR3doaDN0WWZubzZPaGxOM0hyNlo1MHQ0d0RMRmtqWDVoZzU2Y1M4cXU0VkhGX2pYYlVOZDRub0MxcThXYnV0am05QXJoOEZLRGdTYUFzbE1fS1pxWE5QcmtpSThZM1dUZThVOUVPTFg1bWpUamxLLWc0eS1heUsydzJycGdVQQ?oc=5"
      },
      {
        "name": "U.S. News & World Report",
        "href": "https://www.usnews.com/news/business/articles/2026-06-27/millions-drop-obamacare-health-coverage-after-subsidies-expire-and-costs-rise"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/obamacare-enrollment-drops-subsidies.png",
      "alt": "A pharmacist filling prescriptions behind a counter",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Elizabethan Poor Law (An Acte for the Reliefe of the Poore, 1601)",
        "excerpt": "And also competent Sums of Money for and towards the necessary Relief of the Lame, Impotent, Old, Blind, and such other among them being Poor, and not able to work",
        "source": "An Act for the Relief of the Poor, 43 Elizabeth I (1601)",
        "href": "https://www.workhouses.org.uk/poorlaws/1601act.shtml"
      },
      {
        "category": "historical",
        "title": "Daniel Defoe, A Journal of the Plague Year (1722) — the poor untended in the Great Plague of London",
        "excerpt": "and had not public charity provided for these poor creatures, whose number was exceeding great and in all cases of this nature must be so, they would have been in the worst condition of any people in the city.",
        "source": "Daniel Defoe, A Journal of the Plague Year (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "literary",
        "title": "The Parable of the Good Samaritan (Gospel of Luke, King James Version)",
        "excerpt": "But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him, And went to him, and bound up his wounds, pouring in oil and wine, and set him on his own beast, and brought him to an inn, and took care of him.",
        "source": "The Bible, King James Version, Luke 10:33–34 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "literary",
        "title": "Charles Dickens, A Christmas Carol (1843) — Scrooge refuses the charity collectors",
        "excerpt": "\"If they would rather die,\" said Scrooge, \"they had better do it, and decrease the surplus population.\"",
        "source": "Charles Dickens, A Christmas Carol (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/46/pg46.txt"
      },
      {
        "category": "artistic",
        "title": "Giovanni Battista Pergolesi, Stabat Mater, P.77 (1736) — musical work",
        "excerpt": "Pergolesi's final composition sets the medieval Latin sequence of the grieving mother standing at the foot of the cross, scored intimately for soprano, alto, strings, and continuo. Its aching suspensions and weeping melodic lines turn private sorrow into a universal cry of compassion for the suffering. The work has endured as one of music's most tender meditations on mercy in the face of pain.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Stabat_Mater,_P.77_(Pergolesi,_Giovanni_Battista)"
      },
      {
        "category": "artistic",
        "title": "Luke Fildes, Applicants for Admission to a Casual Ward (1874) — visual artwork",
        "excerpt": "Fildes lines up a shivering queue of the homeless and destitute against a cold London wall as they wait for a ticket admitting them to a workhouse ward for a single night. Mothers clutch infants, the sick lean on the well, and a policeman regulates the desperate column, making charity feel rationed and grudging. A landmark of Victorian social realism, the painting confronts the viewer with the human face of poverty pushed to the edge of survival.",
        "source": "Luke Fildes, Applicants for Admission to a Casual Ward, Royal Holloway, University of London (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Luke_Fildes_(1843-1927)_-_Applicants_for_Admission_to_a_Casual_Ward_-_THC0021_-_Royal_Holloway,_University_of_London.jpg",
        "image": {
          "src": "/covers/obamacare-enrollment-drops-subsidies--art.png",
          "alt": "Oil painting of a ragged, weary line of poor men, women, and children waiting in the cold outside a workhouse casual ward",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "japan-tropical-storms-floods",
    "headline": "Two tropical storms batter Japan with floods and landslides, killing at least one",
    "overview": "Two storm systems, Mekkhala and Higos, struck Japan during the annual rainy season, dumping heavy rain that triggered landslides and flooding. A man in his 70s died and three people were injured when a house was buried by a landslide in Yamaguchi prefecture. Flooding alerts were issued across Kyoto, Osaka and other parts of western Japan, where dozens of homes were inundated.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxNUHJCNzlnVE12LU51OWtkZVh2bHpLbFFneXdmbVB2bk5GOG9VSTctV0xEQU04a0VuSVJxVTdxSTVxRFdQSzRCZ2ptTWtlUE5UVDBNcktZNTBGcWRnMGctVXhQc3gwVWlTUkFyU09CMWp4X2ZqT3BmY0kxT1ZBLVhlR3BPOXZDUWxU?oc=5"
      },
      {
        "name": "Washington Times",
        "href": "https://www.washingtontimes.com/news/2026/jun/27/2-tropical-storms-pound-japan-floods-landslides-killing-1/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/japan-tropical-storms-floods.png",
      "alt": "Aerial view of floodwaters submerging streets and homes in Japan",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Johnstown Flood of 1889",
        "excerpt": "Houses were spinning through beneath the bridge, and I did not know at what moment the structure would melt away under the train.",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (1889), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
      },
      {
        "category": "historical",
        "title": "The Great Galveston Hurricane of 1900",
        "excerpt": "With the first shifting of the wind the waters of the Gulf swept over the city.",
        "source": "Paul Lester, The Great Galveston Disaster (1900), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/60105/60105-h/60105-h.htm"
      },
      {
        "category": "literary",
        "title": "The Genesis Flood (Genesis 7)",
        "excerpt": "The waters prevailed exceedingly on the earth. All the high mountains that were under the whole sky were covered.",
        "source": "Genesis 7:19, World English Bible, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(World_English)/Genesis"
      },
      {
        "category": "literary",
        "title": "The Deluge of Deucalion in Ovid's Metamorphoses, Book I",
        "excerpt": "And now sea and land had no mark of distinction; everything now was ocean; and to that ocean shores were wanting.",
        "source": "Ovid, Metamorphoses, Book I (trans. Henry T. Riley), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/21765/21765-h/21765-h.htm"
      },
      {
        "category": "artistic",
        "title": "Antonio Vivaldi, Violin Concerto in E-flat major, RV 253, \"La tempesta di mare\" (musical)",
        "excerpt": "Published in 1725 within Vivaldi's Op. 8, this Baroque concerto translates a storm at sea into sound, its outer Presto movements driving forward in restless surges of rushing strings that mimic howling wind and pounding waves. Between them a brief Largo offers a fragile lull, like a lone ship riding the swell before the tempest closes in again. The relentless rhythmic energy makes the listener feel small before the fury of the elements.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Violin_Concerto_in_E-flat_major,_RV_253_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "Katsushika Hokusai, \"The Great Wave off Kanagawa\" (visual artwork)",
        "excerpt": "In this iconic woodblock print from Hokusai's Thirty-six Views of Mount Fuji (c. 1831), a towering wave rears up with claw-like crests of foam, dwarfing the tiny fishing boats and the rowers clinging to them. Far in the distance, Mount Fuji sits small and serene beneath the curling water, underscoring humanity's fragility before nature's overwhelming power. It is perhaps the most famous image ever made of the sea's sublime and terrifying force.",
        "source": "Katsushika Hokusai (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Katsushika_Hokusai_-_Thirty-Six_Views_of_Mount_Fuji-_The_Great_Wave_Off_the_Coast_of_Kanagawa_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/japan-tropical-storms-floods--art.png",
          "alt": "A great cresting wave with foaming claw-like crests towers over small boats, with a small Mount Fuji in the distance",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "google-limits-meta-gemini",
    "headline": "Google limits Meta's access to its Gemini AI models amid a compute capacity crunch",
    "overview": "Google has capped Meta's use of its Gemini artificial-intelligence models after Meta sought more computing capacity than Google could supply, the Financial Times reported. Google told Meta around March it could not meet the full demand, delaying some of Meta's internal AI projects and prompting it to tell staff to use AI 'tokens' more efficiently. Other Google clients were affected to a lesser degree as the industry scrambles for scarce compute.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQOEhSTWNhT0E1aGtldms3cmlxVjFlOVl5Z2t1ZTRTU2hjb2FSV1ZfczIwOGMwU0JMU2lqNTI1THhWU0UyS1k5aGVrNjBlYy1Iek9TNW5DOXVmM2ZiUmUxaGVoZ0N0cDFLZTNXejVLWExrV01nR2hFY2N2c0FqT1JvM3V1R0l1eTlwLWVPbkg4SHZ2SzJRczc2dDBFaC1YQ1Y3dkE?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-06-28/google-caps-meta-s-use-of-gemini-ai-financial-times-reports"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/google-limits-meta-gemini.png",
      "alt": "Rows of servers inside a data center",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nixon's Address on the Energy Shortages (1973)",
        "excerpt": "We are heading toward the most acute shortages of energy since World War II. Our supply of petroleum this winter will be at least 10 percent short of our anticipated demands, and it could fall short by as much as 17 percent.",
        "source": "Richard Nixon, Address to the Nation About Policies To Deal With the Energy Shortages, November 7, 1973 — The American Presidency Project",
        "href": "https://www.presidency.ucsb.edu/documents/address-the-nation-about-policies-deal-with-the-energy-shortages"
      },
      {
        "category": "historical",
        "title": "Augustus and Rome's Grain Supply (Res Gestae Divi Augusti)",
        "excerpt": "I did not decline in the great scarcity of corn and the superintendence of the supply, and I so administered it that within a few days I had freed the whole community from the immediate fear and peril through my expenditure and care.",
        "source": "Res Gestae Divi Augusti (The Achievements of the Deified Augustus), §5 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Translation:The_Achievements_of_the_Deified_Augustus"
      },
      {
        "category": "literary",
        "title": "Hesiod, Works and Days — Zeus hides fire, Prometheus steals it",
        "excerpt": "But Zeus in the anger of his heart hid it, because Prometheus the crafty deceived him; therefore he planned sorrow and mischief against men. He hid fire; but that the noble son of Iapetus stole again for men from Zeus the counsellor in a hollow fennel-stalk, so that Zeus who delights in thunder did not see it.",
        "source": "Hesiod, Works and Days (Hugh G. Evelyn-White trans.) — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/348/pg348.txt"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound — the stolen source of fire",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, Prometheus Bound (Theodore Alois Buckley trans.) — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "artistic",
        "title": "Beethoven — The Creatures of Prometheus, Op. 43 (musical)",
        "excerpt": "Beethoven's only full-length ballet, composed in 1800-01, dramatizes the Titan who carries divine fire to humankind and awakens lifeless clay figures into thinking, feeling beings. Its brilliant overture bursts open with a jolt of energy that mirrors the spark of stolen knowledge being handed to mortals, and the finale's heroic theme would later reappear in the Eroica Symphony. The work casts Prometheus as the great benefactor whose gift, like access to a guarded power, transforms those he chooses to bestow it upon.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Gesch%C3%B6pfe_des_Prometheus,_Op.43_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Jan Cossiers — Prometheus Carrying Fire, 1637 (visual artwork)",
        "excerpt": "In this Flemish Baroque oil painting, the Titan Prometheus strides through darkness shielding a single flickering torch, his muscular body twisting to guard the precious stolen fire from the night around him. The chiaroscuro turns the small flame into the painting's only true light, an image of a scarce and vital resource clutched against the dark. Based on a design by Rubens for the Torre de la Parada, it now hangs in the Museo del Prado.",
        "source": "Jan Cossiers, Museo del Prado (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Cossiers_-_Prometheus_Carrying_Fire.jpg",
        "image": {
          "src": "/covers/google-limits-meta-gemini--art.png",
          "alt": "Baroque painting of Prometheus striding through darkness, shielding a lit torch of stolen fire against his body",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "ukraine-strikes-russian-refineries",
    "headline": "Ukrainian drones strike two oil refineries in the Russian city of Ufa in overnight raids",
    "overview": "Ukraine said its Security Service drones struck two oil refineries, Ufaneftekhim and Bashneft Novoil, in the Russian city of Ufa, more than 1,300 kilometers from the front line. The raids are part of an intensified Ukrainian campaign against Russian energy infrastructure meant to choke fuel supplies and pressure Moscow toward negotiations. Russia said its defenses destroyed hundreds of drones overnight.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOYTFJUS10c1JERUVWMWFOZEsyR2xuRDlJNWZGQ2VvaVU3YWlxQjVzME50Nm10ZWVjMGUyNnZEZ0FjVlJldk9ydkVYNGdqdUt6UlJzWVk4c2MzM3NFMHV6ZDJuZU5XTy00YlBwZ0lmUWEtcER6OWk3eEotdmFXRTJ3STFnUVZnMlIzZllHYTFIZ1lKNkdUSzdtc0VWTXZZa1RaNmNv?oc=5"
      },
      {
        "name": "The Kyiv Independent",
        "href": "https://kyivindependent.com/ukrainian-drones-reportedly-strike-oil-refinery-in-russian-city-of-ufa/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/ukraine-strikes-russian-refineries.png",
      "alt": "An oil refinery's flare stacks burning against a dark night sky",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sherman's telegram to Grant: \"make Georgia howl\" (October 9, 1864)",
        "excerpt": "Until we can repopulate Georgia it is useless to occupy it, but utter destruction of its roads, houses, and people will cripple their military resources. By attempting to hold the roads we will lose a thousand men monthly and will gain no result. \"I can make the march and make Georgia howl.\"",
        "source": "Telegram of William T. Sherman to Ulysses S. Grant, October 9, 1864 (Civil War Era NC, North Carolina State University)",
        "href": "https://cwnc.omeka.chass.ncsu.edu/items/show/143"
      },
      {
        "category": "historical",
        "title": "United States Strategic Bombing Survey: The Attack on Oil (1945)",
        "excerpt": "Consumption of oil exceeded production from May 1944 on. Accumulated stocks were rapidly used up, and in six months were practically exhausted.",
        "source": "The United States Strategic Bombing Survey, Summary Report (European War), 1945 — public-domain U.S. Government document",
        "href": "https://www.anesi.com/ussbs02.htm"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II — the burning of Troy (Dryden's translation)",
        "excerpt": "The palace of Deiphobus ascends\nIn smoky flames, and catches on his friends.\nUcalegon burns next: the seas are bright\nWith splendour not their own, and shine with Trojan light.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (Project Gutenberg eBook #228)",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book XV — Hector calls for fire to burn the Greek ships (Pope's translation)",
        "excerpt": "Haste, bring the flames! the toil of ten long years\nIs finished, and the day desired appears;",
        "source": "Homer, The Iliad, Book XV, trans. Alexander Pope (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_15"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky — 1812 Overture, Op. 49 (musical)",
        "excerpt": "Tchaikovsky's thunderous festival overture stages the 1812 repulse of Napoleon's invasion of Russia as a sonic battlefield, building from a solemn hymn through churning martial themes to a climax punctuated by live cannon fire and pealing bells. The clash of the French \"Marseillaise\" against Russian melodies and the imperial anthem dramatizes an enemy army broken deep inside hostile territory. It remains the definitive orchestral evocation of war waged with fire, artillery, and the burning of a campaign's hopes.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner — The Burning of the Houses of Lords and Commons, 16 October 1834 (visual artwork)",
        "excerpt": "Turner's oil painting captures the night the Palace of Westminster went up in flames, a wall of orange-white fire roaring into the dark sky and reflecting in lurid streaks across the Thames. Tiny crowds and boats are dwarfed by the conflagration, conveying the helplessness of onlookers before an inferno consuming the heart of a nation's power. The blaze, set far from any front line yet striking at a symbolic stronghold, makes the canvas a vivid emblem of fire as both spectacle and instrument of destruction.",
        "source": "Philadelphia Museum of Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ukraine-strikes-russian-refineries--art.png",
          "alt": "J. M. W. Turner's painting of the Houses of Parliament engulfed in towering flames at night, the fire reflected across the Thames",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "dr-congo-first-world-cup-win",
    "headline": "DR Congo win their first World Cup match, beating Uzbekistan 3-1 to reach the round of 32",
    "overview": "DR Congo's Leopards won their first-ever World Cup match, coming from behind to beat Uzbekistan 3-1 and advance to the round of 32, where they will face England. Newcastle forward Yoane Wissa scored twice and Fiston Mayele added the other goal after Uzbekistan took an early lead. The result set off jubilation across the central African nation at the expanded 2026 tournament.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQaWMxczk0eGI3azhIenI2WjNWZU1QQTIydzZ3ekpsMU1nR2lUczM3OFpOS2VJTUtXRExQRlhCcm8zX2RuMVIzWl9yWkhBeU5sMEZ6SjVmUnVXNGZKd3ZmOWltdm9aN0ZHQTZYdjJlcVZRbVNFOXJjZFczUG1VWVJoLVJGMTBkdFc1OVo0OVRZQ2dUcWxWRFdkcWtLdXBzb3ZOOUN6Y1NmNFNYTDl1bnF1QjlOZFgxY3NfUlNia3pGWTg?oc=5"
      },
      {
        "name": "Sky Sports",
        "href": "https://www.skysports.com/football/news/12098/13556707/world-cup-2026-dr-congo-3-1-uzbekistan-yoane-wissa-stars-as-the-leopards-complete-comeback-win-to-set-up-last-32-clash-against-england"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/dr-congo-first-world-cup-win.png",
      "alt": "Jubilant Congolese football supporters celebrating in the stands",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Athenians charge at Marathon (490 BC)",
        "excerpt": "but the Athenians, closing all together with the Persians, fought in admirable fashion; for they were the first Greeks, within my knowledge, who charged their enemies at a run, and the first who endured the sight of Median garments and men clad therein; till then, the Greeks were affrighted by the very name of the Medes.",
        "source": "Herodotus, Histories, Book VI.112 (Godley translation)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/6c*.html"
      },
      {
        "category": "historical",
        "title": "The epitaph of the Spartans at Thermopylae (480 BC)",
        "excerpt": "Go tell the Spartans, thou that passest by, / That here obedient to their words we lie.",
        "source": "Herodotus, Histories, Book VII.228 (Godley translation)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/7D*.html"
      },
      {
        "category": "literary",
        "title": "David answers Goliath (1 Samuel 17:45-46, King James Bible)",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. This day will the LORD deliver thee into mine hand; and I will smite thee, and take thine head from thee.",
        "source": "The Holy Bible, King James Version, 1 Samuel 17:45-46",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "Shakespeare, King Henry V — the St Crispin's Day speech",
        "excerpt": "From this day to the ending of the world, / But we in it shall be remembered; / We few, we happy few, we band of brothers; / For he to-day that sheds his blood with me / Shall be my brother.",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act IV, Scene III",
        "href": "https://en.wikisource.org/wiki/Henry_V_(1918)_Yale/Text/Act_IV"
      },
      {
        "category": "artistic",
        "title": "Handel, \"See, the Conqu'ring Hero Comes\" from Judas Maccabaeus, HWV 63 (musical)",
        "excerpt": "Composed by George Frideric Handel for his 1746 oratorio Judas Maccabaeus, this radiant chorus greets a victorious leader returning home in triumph, its melody rising from a single treble line into full, pealing rejoicing. Originally celebrating a small people's deliverance against a mighty empire, the march became the universal anthem of the hero's homecoming, sounded for conquerors and champions ever since. Its bright, processional swing turns a hard-won victory into shared public jubilation.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, David with the Head of Goliath (visual artwork)",
        "excerpt": "In Caravaggio's late masterpiece (c. 1610, Galleria Borghese, Rome), a young, almost sorrowful David holds aloft the severed head of the giant Goliath, the slain champion's face emerging from deep shadow. The unheralded shepherd boy has felled the seemingly invincible warrior, the eternal image of the small triumphing over the great. Caravaggio's stark light and unflinching realism make the underdog's victory feel both monumental and intimately human.",
        "source": "Caravaggio (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "image": {
          "src": "/covers/dr-congo-first-world-cup-win--art.png",
          "alt": "Caravaggio's painting of a young David holding the severed head of the giant Goliath against a dark background",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "trump-250th-passport-portrait",
    "headline": "US to issue limited commemorative passports bearing Trump's portrait for America's 250th anniversary",
    "overview": "The State Department plans a limited release of commemorative US passports featuring a portrait of President Donald Trump, who would be the first living president pictured in the travel document, to mark the nation's 250th anniversary. Between 25,000 and 30,000 will be offered at the Washington passport office around July 4, with Trump's likeness and signature added to an interior page. The unusual design has drawn criticism as a cult-of-personality gesture.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce3ewkdgw9ro"
      },
      {
        "name": "Washington Post",
        "href": "https://www.washingtonpost.com/politics/2026/06/27/trump-reveals-new-image-passports-mark-america-250th/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/trump-250th-passport-portrait.png",
      "alt": "A United States passport book",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Suetonius on Augustus remaking Rome in his own image",
        "excerpt": "he could justly boast that he had found it built of brick and left it in marble.",
        "source": "Suetonius, The Lives of the Caesars, Life of Augustus, ch. 28 (Loeb/Rolfe trans., LacusCurtius)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Augustus*.html"
      },
      {
        "category": "historical",
        "title": "Augustus tallies his own statues in the Res Gestae",
        "excerpt": "Some eighty silver statues of me, on foot, on horse and in chariots had been set up in Rome ; I myself removed them, and with the money that they realized I set golden offerings in the temple of Apollo, in my own name and in the names of those who had honored me with the statues.",
        "source": "Res Gestae Divi Augusti, section 24 (English translation)",
        "href": "https://droitromain.univ-grenoble-alpes.fr/Anglica/resgest_engl.htm"
      },
      {
        "category": "literary",
        "title": "Shelley, \"Ozymandias\" — the ruler's image outlasted by ruin",
        "excerpt": "And on the pedestal these words appear:\n\"My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!\"\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\" (1818), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "literary",
        "title": "\"Render unto Caesar\" — the image and superscription on the coin",
        "excerpt": "And he saith unto them, Whose is this image and superscription? They say unto him, Caesar's. Then saith he unto them, Render therefore unto Caesar the things which are Caesar's; and unto God the things that are God's.",
        "source": "Gospel of Matthew 22:20–21, King James Version",
        "href": "https://www.gutenberg.org/cache/epub/8040/pg8040.txt"
      },
      {
        "category": "artistic",
        "title": "Handel, \"Zadok the Priest\" from the Coronation Anthems, HWV 258–261 (musical)",
        "excerpt": "Composed in 1727 for the coronation of George II at Westminster Abbey, Handel's four Coronation Anthems are the supreme musical expression of sacred royal pageantry. \"Zadok the Priest,\" the most famous, opens with a long, swelling orchestral crescendo that bursts into a blaze of choral and trumpet acclamation at the words \"Zadok the Priest, and Nathan the Prophet anointed Solomon King.\" Sung at every British coronation since, it transforms the anointing of a ruler into an overwhelming public spectacle of legitimacy and power.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Coronation_Anthems,_HWV_258-261_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Ingres, \"Napoleon I on his Imperial Throne\" (1806) (visual artwork)",
        "excerpt": "Jean-Auguste-Dominique Ingres painted the newly crowned emperor enthroned in rigid frontal majesty, clutching the scepter of Charlemagne and the hand of justice, robed in ermine and gold like a Byzantine icon or pagan idol. The deliberately archaic, almost god-like image fuses the man and the symbols of absolute power into a single graven emblem of the state. Contemporaries found its cold grandeur unsettling — a portrait less of a person than of authority itself demanding worship.",
        "source": "Jean-Auguste-Dominique Ingres, Musée de l'Armée, Paris (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Ingres,_Napoleon_on_his_Imperial_throne.jpg",
        "image": {
          "src": "/covers/trump-250th-passport-portrait--art.png",
          "alt": "Ingres's 1806 state portrait of Napoleon I enthroned in coronation robes, holding scepter and hand of justice in rigid frontal majesty",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "nasa-webb-cigar-galaxy-image",
    "headline": "NASA's Webb telescope captures a 223-megapixel image of the Cigar Galaxy revealing 16.5 million stars",
    "overview": "NASA's James Webb Space Telescope has produced a 223-megapixel composite image of Messier 82, the Cigar Galaxy, resolving roughly 16.5 million stars across 65 hours of observation. The starburst galaxy, 12 million light-years away, is forming stars about ten times faster than the Milky Way. The image combines Webb's infrared data with Hubble's visible-light observations for unprecedented detail.",
    "genre": "Science",
    "sources": [
      {
        "name": "NASA",
        "href": "https://science.nasa.gov/missions/webb/nasas-webb-pinpoints-millions-of-stars-within-cigar-galaxy/"
      },
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/messier-82-cigar-galaxy-webb-image/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/nasa-webb-cigar-galaxy-image.png",
      "alt": "The Cigar Galaxy Messier 82 resolved into millions of stars by the Webb telescope",
      "credit": "NASA, ESA, CSA"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Galileo turns his telescope on the Milky Way (Sidereus Nuncius, 1610)",
        "excerpt": "The Galaxy is nothing else but a mass of innumerable stars planted together in clusters.",
        "source": "Galileo Galilei, Sidereus Nuncius (The Sidereal Messenger, 1610), trans. Edward Stafford Carlos",
        "href": "https://www.gutenberg.org/cache/epub/46036/pg46036-images.html"
      },
      {
        "category": "historical",
        "title": "Galileo on the uncountable small stars revealed by the spyglass",
        "excerpt": "a vast crowd of stars presents itself to view; many of them are tolerably large and extremely bright, but the number of small ones is quite beyond determination.",
        "source": "Galileo Galilei, Sidereus Nuncius (The Sidereal Messenger, 1610), trans. Edward Stafford Carlos",
        "href": "https://www.gutenberg.org/cache/epub/46036/pg46036-images.html"
      },
      {
        "category": "literary",
        "title": "Psalm 8 — \"When I consider thy heavens\" (King James Bible)",
        "excerpt": "When I consider thy heavens, the work of thy fingers, the moon and the stars, which thou hast ordained; What is man, that thou art mindful of him?",
        "source": "The Bible, King James Version, Psalm 8:3–4",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"When I Heard the Learn'd Astronomer\" (1865)",
        "excerpt": "Till rising and gliding out I wander'd off by myself, In the mystical moist night-air, and from time to time, Look'd up in perfect silence at the stars.",
        "source": "Walt Whitman, Leaves of Grass (\"When I Heard the Learn'd Astronomer,\" 1865)",
        "href": "https://www.poetryfoundation.org/poems/45479/when-i-heard-the-learnd-astronomer"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, \"The Heavens Are Telling\" from The Creation (Die Schöpfung, 1798) — musical",
        "excerpt": "Closing Part I of Haydn's oratorio, this radiant chorus sets Psalm 19 — \"The heavens are telling the glory of God\" — for soloists and full chorus. The voices build from hushed wonder to a jubilant fugue on \"and the firmament sheweth his handywork,\" turning the contemplation of the star-filled sky into an outpouring of cosmic praise. It remains the work's most beloved hymn to the order and grandeur of the heavens.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, The Starry Night (1889) — visual artwork",
        "excerpt": "Painted from his asylum window at Saint-Rémy in 1889, Van Gogh's most famous canvas swirls a luminous night sky of blazing stars and a radiant crescent moon above a quiet village. Thick, rhythmic brushstrokes set the heavens churning in spirals of blue and gold, conveying both the immensity and the emotional pull of the cosmos. It endures as art's defining vision of humanity gazing up in awe at the stars.",
        "source": "Vincent van Gogh, The Starry Night, Museum of Modern Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/nasa-webb-cigar-galaxy-image--art.png",
          "alt": "Vincent van Gogh's The Starry Night, a swirling night sky filled with bright stars and a glowing crescent moon over a village",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "kennedy-center-tarp-court-order",
    "headline": "Federal judge orders Trump administration to explain the tarp covering the Kennedy Center facade",
    "overview": "US District Judge Christopher Cooper ordered the Trump administration to explain by July 31 why a large tarp still covers the facade of Washington's Kennedy Center after the president's name was removed from the building. The tarp went up on June 13, the deadline Cooper had set for the name's removal; he had earlier blocked a renovation plan and ordered the name taken down. The dispute is part of a broader fight over control of the arts center.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/judge-demands-trump-explain-kennedy-center-tarp-1234753521/"
      },
      {
        "name": "NPR",
        "href": "https://www.npr.org/2026/06/24/nx-s1-5869578/kennedy-center-tarp"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/kennedy-center-tarp-court-order.png",
      "alt": "The facade of the John F. Kennedy Center for the Performing Arts",
      "credit": "Artforum"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The damnatio memoriae of the emperor Geta (211 AD)",
        "excerpt": "Indeed, if anyone so much as wrote the name Geta or even uttered it, he was immediately put to death.",
        "source": "Cassius Dio, Roman History, Epitome of Book LXXVIII (Loeb / Earnest Cary trans.), via LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/78*.html"
      },
      {
        "category": "historical",
        "title": "Pulling down the leaden statue of King George III at Bowling Green, New York, 9 July 1776",
        "excerpt": "Emanations from the Leaden George ... deep impressions in the Bodies of some of his red-Coated and Torie Subjects",
        "source": "Lt. Isaac Bangs, contemporary journal, quoted in Smithsonian Magazine",
        "href": "https://www.smithsonianmag.com/history/a-toppled-statue-of-george-iii-epitomizes-the-ongoing-debate-over-americas-monuments-180979463/"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (1818)",
        "excerpt": "And on the pedestal these words appear:\n\"My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!\"\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Wikisource (The Hundred Best Poems in the English Language)",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "literary",
        "title": "Nathaniel Hawthorne, \"The Minister's Black Veil\" (1836)",
        "excerpt": "I look around me, and, lo! on every visage a Black Veil!",
        "source": "Nathaniel Hawthorne, Twice-Told Tales, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/508/508-h/508-h.htm"
      },
      {
        "category": "artistic",
        "title": "Maurice Ravel, \"Pavane pour une infante défunte\" (1899) (musical)",
        "excerpt": "A slow, hushed processional dance composed in 1899, its title — a \"pavane for a dead princess\" — evokes the courtly funeral rites of a vanished Spanish past. Its tender, archaic melody drifts like a memory half-effaced, mourning not a real person but a lost age and the fading of remembrance itself. The score, in the public domain, suits a meditation on monuments shrouded and names removed.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Pavane_pour_une_infante_d%C3%A9funte,_M.19_(Ravel,_Maurice)"
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, \"Imaginary View of the Grande Galerie in the Louvre in Ruins\" (1796) (visual artwork)",
        "excerpt": "Hubert Robert, nicknamed \"Robert des Ruines,\" imagines the very gallery in which his picture hung reduced to a roofless, crumbling shell, its grand vaulted arches open to the sky. Tiny figures sketch and scavenge among the broken statuary, a vision of how even the proudest monument is destined for decay. Painted in 1796, it turns a living institution into a future ruin — a meditation on impermanence, erasure, and the fragility of public memory.",
        "source": "Hubert Robert, Musée du Louvre (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Hubert_Robert_-_Imaginary_View_of_the_Grande_Galerie_in_the_Louvre_in_Ruins_-_WGA19589.jpg",
        "image": {
          "src": "/covers/kennedy-center-tarp-court-order--art.png",
          "alt": "Oil painting of the Louvre's Grande Galerie depicted as a roofless ruin, with broken columns and statuary and small figures amid the rubble",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "saype-beyond-walls-minneapolis",
    "headline": "Artist Saype paints a monumental biodegradable grass mural of clasping hands in Minneapolis",
    "overview": "Franco-Swiss land artist Saype created a vast mural of two clasping hands on the grass of Minneapolis's Boom Island Park, using a biodegradable paint designed to fade over time. The work, the first US edition of his global 'Beyond Walls' series, was made in response to recent community trauma, with hundreds of residents forming a human chain to symbolize solidarity and resilience. Saype said he found 'an incredible humanity in Minneapolis.'",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/saype-beyond-walls-minneapolis-temporary-mural/"
      },
      {
        "name": "MPR News",
        "href": "https://www.mprnews.org/story/2026/06/05/massive-mural-by-franco-swiss-artist-saype-debuts-at-boom-island-park-in-minneapolis"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/saype-beyond-walls-minneapolis.png",
      "alt": "Saype's giant grass mural of two clasping hands seen from above",
      "credit": "Saype"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Marcus Aurelius on the impermanence of all things",
        "excerpt": "Consider how quickly all things are dissolved and resolved: the bodies and substances themselves, into the matter and substance of the world: and their memories into the general age and time of the world.",
        "source": "Marcus Aurelius, Meditations, Book III (trans. Méric Casaubon), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2680/2680-h/2680-h.htm"
      },
      {
        "category": "historical",
        "title": "The Roman dextrarum iunctio: the clasped right hands of fellowship",
        "excerpt": "This early-3rd-century A.D. Roman marble sarcophagus fragment from the Metropolitan Museum of Art depicts a marriage scene in which husband and wife perform the dextrarum iunctio, the ceremonial joining of right hands. The ancient gesture of clasped hands signified concord, fidelity, and the bond between people, the same symbolism Saype invokes with his mural of two arms reaching across to clasp one another.",
        "source": "Marble sarcophagus fragment with marriage scene, Roman, ca. 3rd century A.D., The Metropolitan Museum of Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Marble_sarcophagus_fragment-_marriage_scene_MET_DP276799.jpg"
      },
      {
        "category": "literary",
        "title": "John Donne, \"No man is an island\" (Meditation XVII)",
        "excerpt": "No man is an island, entire of itself; every man is a piece of the continent, a part of the main. If a clod be washed away by the sea, Europe is the less, as well as if a promontory were, as well as if a manor of thy friend's or of thine own were: any man's death diminishes me, because I am involved in mankind, and therefore never send to know for whom the bell tolls; it tolls for thee.",
        "source": "John Donne, Devotions upon Emergent Occasions, Meditation XVII (1624), Wikisource",
        "href": "https://en.wikisource.org/wiki/Meditation_XVII"
      },
      {
        "category": "literary",
        "title": "Robert Herrick, \"To the Virgins, to Make Much of Time\"",
        "excerpt": "Gather ye Rose-buds while ye may,\n    Old Time is still a-flying:\nAnd this same flower that smiles to day,\n    To morrow will be dying.",
        "source": "Robert Herrick, Hesperides (1648), Wikipedia",
        "href": "https://en.wikipedia.org/wiki/To_the_Virgins,_to_Make_Much_of_Time"
      },
      {
        "category": "artistic",
        "title": "Friedrich Schiller, \"Ode to Joy\" / Beethoven's Symphony No. 9 (musical)",
        "excerpt": "Beethoven set Schiller's \"An die Freude\" in the choral finale of his Ninth Symphony, Op. 125, completed in 1824, where massed voices proclaim that \"All men become brothers.\" The exultant tune, rising through soloists, chorus, and orchestra, has become a universal anthem of joy, fellowship, and human solidarity. Its score is freely available in the public domain.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Roman marble relief of the dextrarum iunctio, marriage scene (visual artwork)",
        "excerpt": "This Roman marble sarcophagus fragment, dated to about the early 3rd century A.D. and held at the Metropolitan Museum of Art, shows a bride and groom joining their right hands in the dextrarum iunctio while a small winged Eros looks on. The carved gesture of two clasped hands made fellowship, trust, and union visible in stone. It is an ancient counterpart to Saype's grass mural of two arms reaching to grasp each other.",
        "source": "Marble sarcophagus fragment with marriage scene, Roman, ca. 3rd century A.D., The Metropolitan Museum of Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Marble_sarcophagus_fragment-_marriage_scene_MET_DP276799.jpg",
        "image": {
          "src": "/covers/saype-beyond-walls-minneapolis--art.png",
          "alt": "Roman marble relief fragment showing a married couple clasping right hands in the dextrarum iunctio, with a small winged Eros between them",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "gaudi-centenary-influence",
    "headline": "Architecture world marks the centenary of Antoni Gaudí's death and weighs his global influence",
    "overview": "A century after the Catalan architect Antoni Gaudí died in Barcelona on 10 June 1926, days after being struck by a tram, the design world is reassessing his enduring influence. His organic, nature-inspired Modernisme — above all the still-unfinished Sagrada Família basilica, now nearing completion — reshaped ideas of structure, ornament and form. Critics and architects are debating whether he ranks among the greatest builders in history.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/27/gaudi-centenary-impact-dezeen-in-depth/"
      },
      {
        "name": "Dezeen (Weekly)",
        "href": "https://www.dezeen.com/2026/06/26/gaudi-dezeen-weekly-podcast/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/gaudi-centenary-influence.png",
      "alt": "Antoni Gaudí's Sagrada Família basilica in Barcelona",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Brunelleschi's dome of Florence Cathedral, in Vasari's Lives",
        "excerpt": "And it can be said with confidence that the ancients never went so high with their buildings, and never exposed themselves to so great a risk as to try to challenge the heavens, even as this structure truly appears to challenge them, seeing that it rises to such a height that the mountains round Florence appear no higher. And it seems, in truth, that the heavens are envious of it, since the lightning keeps on striking it every day.",
        "source": "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors & Architects, Vol. II, Life of Filippo Brunelleschi (trans. de Vere)",
        "href": "https://www.gutenberg.org/files/25759/25759-h/25759-h.htm"
      },
      {
        "category": "historical",
        "title": "The building of Solomon's Temple (1 Kings 6:7)",
        "excerpt": "And the house, when it was in building, was built of stone made ready before it was brought thither: so that there was neither hammer nor ax nor any tool of iron heard in the house, while it was in building.",
        "source": "The Holy Bible, King James Version, 1 Kings 6:7",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "literary",
        "title": "Victor Hugo, Notre-Dame de Paris — \"This Will Kill That\"",
        "excerpt": "In fact, from the origin of things down to the fifteenth century of the Christian era, inclusive, architecture is the great book of humanity, the principal expression of man in his different stages of development, either as a force or as an intelligence.",
        "source": "Victor Hugo, Notre-Dame de Paris (trans. Isabel F. Hapgood), Book Fifth, Ch. II",
        "href": "https://www.gutenberg.org/files/2610/2610-h/2610-h.htm"
      },
      {
        "category": "literary",
        "title": "John Ruskin, \"The Nature of Gothic,\" The Stones of Venice",
        "excerpt": "No human face is exactly the same in its lines on each side, no leaf perfect in its lobes, no branch in its symmetry. All admit irregularity as they imply change; and to banish imperfection is to destroy expression, to check exertion, to paralyse vitality. All things are literally better, lovelier, and more beloved for the imperfections which have been divinely appointed, that the law of human life may be Effort, and the law of human judgment, Mercy.",
        "source": "John Ruskin, The Stones of Venice, Vol. II, Ch. VI, \"The Nature of Gothic\"",
        "href": "https://www.gutenberg.org/files/30755/30755-h/30755-h.htm"
      },
      {
        "category": "artistic",
        "title": "J. S. Bach, Toccata and Fugue in D minor, BWV 565 (musical)",
        "excerpt": "Bach's most famous organ work opens with a thunderous descending flourish before unfurling into a vast contrapuntal fugue, the very sound of cathedral grandeur conjured from pipes and stone vaults. Its towering arches of sound and dramatic registration evoke the soaring interior of a great church, an apt sonic parallel to Gaudí's stone forests rising toward heaven. The Bach-Gesellschaft edition score is in the public domain.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Toccata_and_Fugue_in_D_minor,_BWV_565_(Bach,_Johann_Sebastian)"
      },
      {
        "category": "artistic",
        "title": "Claude Monet, Rouen Cathedral, Facade (Morning Effect) (visual artwork)",
        "excerpt": "Painted between 1892 and 1894, this canvas dissolves the great Gothic facade of Rouen Cathedral into shimmering veils of dawn light, its carved stone seemingly melting into atmosphere. Monet returned again and again to the same portal at different hours, treating the ancient edifice as living, changing matter rather than fixed masonry. The series anticipates Gaudí's own conviction that architecture should breathe with the rhythms and forms of nature.",
        "source": "Claude Monet, Museum Folkwang, Essen (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Rouen_Cathedral,_Facade_(Morning_effect).JPG",
        "image": {
          "src": "/covers/gaudi-centenary-influence--art.png",
          "alt": "Impressionist painting of the light-dappled Gothic facade of Rouen Cathedral at morning by Claude Monet",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "venezuela-earthquakes-kill-920",
    "headline": "Venezuela earthquakes kill at least 920 as international rescue teams arrive in Caracas",
    "overview": "Two powerful earthquakes that struck Venezuela have killed at least 920 people, the country's worst seismic disaster in modern memory, with the death toll still climbing as rescuers dig through collapsed buildings in Caracas and surrounding states. International rescue teams, including some 1,600 foreign personnel, have arrived to join the search for survivors. Many residents, frustrated by the pace of the official response, have taken the search for missing relatives into their own hands.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c39y79g7gzko"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPc0sxNlk4eExrc1BtZ0M1ZW1ocUJlSUxWdXdhTmhQdjNqRVFJYmdkdlJBUGttZHd5VzJNcGR2UkFHQVh1REs2N2tnWHowMVlqVzlBd3gydlNMRzFqSlQ2U1I2LU01WVVlM2ltRUpZNnNYc0lZSVl2aHVwd2Y4bDdVTWpRbkZZUktQclAtUHM2QUhpNDVlWFZtR2ZQUFZOYzQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/venezuela-earthquakes-kill-920.png",
      "alt": "Rescue workers searching the rubble of a collapsed building after an earthquake",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Younger on the Earthquakes at Misenum (AD 79)",
        "excerpt": "It was now the first hour of the day, but the light was still faint and weak. The buildings all round us were beginning to totter, and, though we were in the open, the courtyard was so narrow that we were greatly afraid, and indeed sure of being overwhelmed by their fall. So that decided us to leave the town. We were followed by a distracted crowd, which, when in a panic, always prefers someone else's judgment to its own as the most prudent course to adopt, and when we set out these people came crowding in masses upon us, and pressed and urged us forward.",
        "source": "Attalus (J. B. Firth translation)",
        "href": "https://www.attalus.org/old/pliny6.html"
      },
      {
        "category": "historical",
        "title": "Jack London, \"The Story of an Eyewitness\" (1906 San Francisco)",
        "excerpt": "The earthquake shook down in San Francisco hundreds of thousands of dollars worth of walls and chimneys. But the conflagration that followed burned up hundreds of millions of dollars' worth of property There is no estimating within hundreds of millions the actual damage wrought. Not in history has a modern imperial city been so completely destroyed. San Francisco is gone. Nothing remains of it but memories and a fringe of dwelling-houses on its outskirts. Its industrial section is wiped out. Its business section is wiped out. Its social and residential section is wiped out.",
        "source": "California State Parks",
        "href": "https://www.parks.ca.gov/?page_id=24206"
      },
      {
        "category": "literary",
        "title": "Voltaire, Candide, Chapter V (The Lisbon Earthquake)",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/19942/pg19942.txt"
      },
      {
        "category": "literary",
        "title": "Heinrich von Kleist, Das Erdbeben in Chili (1807)",
        "excerpt": "In St. Jago, der Hauptstadt des Königreichs Chili, stand gerade in dem Augenblicke der großen Erderschütterung vom Jahre 1647, bei welcher viele tausend Menschen ihren Untergang fanden, ein junger, auf ein Verbrechen angeklagter Spanier, namens Jeronimo Rugera, an einem Pfeiler des Gefängnisses, in welches man ihn eingesperrt hatte, und wollte sich erhenken.",
        "source": "Project Gutenberg Canada",
        "href": "https://gutenberg.ca/ebooks/kleist-erdbebeninchili/kleist-erdbebeninchili-00-h.html"
      },
      {
        "category": "artistic",
        "title": "Karl Bryullov, The Last Day of Pompeii (1830–1833)",
        "excerpt": "Karl Bryullov's monumental canvas freezes the instant Vesuvius buries Pompeii: under a blood-red sky split by lightning, statues topple from their pedestals and columns crash down upon crowds fleeing into the dark. Mothers shield their children, a son carries his aged father, and a fallen woman lies beside her infant amid the rubble. Painted between 1830 and 1833 and now in the State Russian Museum in Saint Petersburg, it became the most celebrated Russian image of a city destroyed in a single catastrophic night.",
        "source": "The State Russian Museum (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/venezuela-earthquakes-kill-920--art.png",
          "alt": "Karl Bryullov's painting The Last Day of Pompeii, crowds fleeing beneath a fiery sky as columns and statues fall",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Mozart, Requiem in D minor, K. 626",
        "excerpt": "Left unfinished at Mozart's death in 1791 and completed by his pupil Süssmayr, the Requiem is the West's great public-domain music of mass death and mourning. Its \"Dies irae\" hurls the chorus into the terror of a day of wrath, while the \"Lacrimosa\" sinks into weeping for the dead being raised from the ashes — a fitting score for a city digging its people from collapsed stone. The full scores and parts are freely available here.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 27
  },
  {
    "slug": "iran-us-tanker-hormuz-escalation",
    "headline": "Tanker struck in Strait of Hormuz as Iran and U.S. trade attacks in worst escalation since peace deal",
    "overview": "A tanker was struck in the Strait of Hormuz and Iranian drones attacked Bahrain after the United States carried out airstrikes on Iran, marking the worst escalation in the Gulf since the two sides reached a peace deal. Iran said it had struck U.S.-linked targets in response to the American attacks, which Washington said answered a drone strike on a Gulf cargo ship. The exchange has rattled global shipping through the world's most important oil chokepoint.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxOamVFR0VfZVlNU01BWjNWakdNczVUSHAzNWFlM0J3MGV1b0ZmbldmdnhQUHVpLTNabjVZSG5tSDJ0RDlQREk0emJnT3ZGbjFEZjVpTEt2UDgxOXpMdWV3dTIzX1ZtQVNpeUdDRVplMkUxd0FVNzNPTEFwZ3BVSUo4SG1BcHFDeEdYS2tIM3RUaWpZNEtyeWlub0h5c29pNjJmdDZ6Y2tha2hKWkNGa3Y0Y2JNYnk4ZWJuUlk4?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxOU21jd0pJa095S19rRUp3Q1NSN3dJZkxJVzYwNGFNbWtMa2ZqZ1lxWkx1T2xjbGI4UkhJd0sxXzJNcjVNNmllcmZ5SDlnZUlTMU1sV1NSRGlSbVRHMHFvX2pOWW5zT0JNNF8tdnEtSnYwQ1dQV3d0M0g4U0RBZEdZWlcwMFVFMGVER1N6NlRUOVVacVp4X18yS2FoczFWd1piYzdDeDlhSkc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/iran-us-tanker-hormuz-escalation.png",
      "alt": "An oil tanker silhouetted at dusk in a narrow strait",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Oil Platforms (Islamic Republic of Iran v. United States of America)",
        "excerpt": "The last time U.S. and Iranian forces traded blows across the Persian Gulf, it ended at the World Court. During the 'Tanker War' of the 1980s, mines, missiles and gunboats turned the Strait of Hormuz into a shooting gallery for oil shipping, and in October 1987 and April 1988 American warships destroyed Iranian offshore oil platforms in retaliation for attacks on U.S.-flagged vessels. In 2003 the International Court of Justice ruled fourteen votes to two that those strikes 'cannot be justified as measures necessary to protect the essential security interests of the United States,' a verdict that still frames every cycle of tit-for-tat escalation in these narrow waters.",
        "source": "International Court of Justice, Judgment of 6 November 2003",
        "href": "https://www.icj-cij.org/node/101613"
      },
      {
        "category": "historical",
        "title": "The History of Herodotus, Book VIII (Themistocles argues to fight in the narrows)",
        "excerpt": "If however thou shalt do as I say, thou wilt find therein all the advantages which I shall tell thee of:—in the first place by engaging in a narrow place with few ships against many, if the fighting has that issue which it is reasonable to expect, we shall have very much the better; for to fight a sea-fight in a narrow space is for our advantage, but to fight in a wide open space is for theirs.",
        "source": "Herodotus, trans. G. C. Macaulay (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2456/pg2456.txt"
      },
      {
        "category": "literary",
        "title": "The Persians (the Messenger reports the Persian fleet destroyed at Salamis)",
        "excerpt": "Ship into ship drave hard its brazen beak\nWith speed of thought, a shattering blow! and first\nOne Grecian bark plunged straight, and sheared away\nBowsprit and stem of a Phoenician ship.\nAnd then each galley on some other’s prow\nCame crashing in. Awhile our stream of ships\nHeld onward, till within the narrowing creek\nOur jostling vessels were together driven,\nAnd none could aid another: each on each\nDrave hard their brazen beaks, or brake away\nThe oar-banks of each other, stem to stern,\nWhile the Greek galleys, with no lack of skill,\nHemmed them and battered in their sides, and soon\nThe hulls rolled over, and the sea was hid,\nCrowded with wrecks and butchery of men.",
        "source": "Aeschylus, trans. E. D. A. Morshead (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/8714/8714-h/8714-h.htm"
      },
      {
        "category": "literary",
        "title": "The Odyssey, Book XII (the ship runs the strait of Scylla and Charybdis)",
        "excerpt": "We entered the Straits in great fear of mind, for on the one hand was Scylla, and on the other dread Charybdis kept sucking up the salt water. As she vomited it up, it was like the water in a cauldron when it is boiling over upon a great fire, and the spray reached the top of the rocks on either side. When she began to suck again, we could see the water all inside whirling round and round, and it made a deafening sound as it broke against the rocks. We could see the bottom of the whirlpool all black with sand and mud, and the men were at their wits ends for fear.",
        "source": "Homer, trans. Samuel Butler (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "artistic",
        "title": "Die Seeschlacht bei Salamis (The Naval Battle of Salamis)",
        "excerpt": "Kaulbach's vast 1868 canvas freezes the moment a chokepoint becomes a slaughterhouse: in the narrow strait between Salamis and the mainland, Greek and Persian galleys are jammed prow to prow, oars splintering, men spilling into a sea churned white with wreckage. The painting renders in paint exactly what Aeschylus and Herodotus describe in words—how superior numbers count for nothing once a fleet is funneled into water too tight to maneuver. It stands as a permanent emblem of how decisive, and how ruinous, a battle in a strait can be.",
        "source": "Wilhelm von Kaulbach, 1868 (Maximilianeum, Munich)",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/iran-us-tanker-hormuz-escalation--art.png",
          "alt": "Wilhelm von Kaulbach's 1868 painting of the Battle of Salamis, with Greek and Persian galleys colliding in the crowded strait amid wreckage and drowning men",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Fighting Temeraire, tugged to her last berth to be broken up",
        "excerpt": "Turner's elegiac seascape shows a ghostly warship—veteran of Trafalgar—towed across glassy water beneath a burning sunset toward the breaker's yard. It is a meditation on the passing of an age of sail and sea power, the fragile glory of fleets that command straits and then fade. Against the Hormuz crisis it reads as a warning about the impermanence of any maritime order: the ships that rule the world's narrows today drift, like the Temeraire, toward their own twilight.",
        "source": "J. M. W. Turner, 1839 (The National Gallery, London)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg"
      }
    ],
    "rank": 28
  },
  {
    "slug": "hezbollah-rejects-israel-lebanon-deal",
    "headline": "Hezbollah rejects U.S.-brokered Israel-Lebanon security deal as a 'surrender'",
    "overview": "Hezbollah has rejected the U.S.-brokered security agreement signed by Israel and Lebanon, denouncing the framework as a 'surrender' and casting doubt on whether the deal can hold. The Iran-backed group's opposition sets up a confrontation with the Lebanese state, which agreed to the framework in Washington after months of American mediation. Analysts warn the rejection could unravel one of the region's most fragile recent settlements.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxNMUlLNE8zdUhsWi1UT2xqU2F4aFdsNlpQUzlUdUlMQ19wNXFJaEpibm9ZVXlsS09xd3llRXYtd09uX2NKNzBIX0lHNlRVS2owX3pFcjlXcUU5YXNJeDRkbWNacXBaa0tSdjlCaW5BV0RJbDhXQU13ZWtWM0lHd3Y4bE43V3E3eEhlenlVc204MHZwOE5aOGFscmdvTUFMV2FpTUtPWjlZS2VEMEJfVTJWS1cycXA1RVFWMWszUg?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxNYWtiMUI4NktLVWg4WjVHQTd5emRGX0hkMXVOaW5FWjlSN3Q2WGZJcmVSa1A0WEFUZ21MUDlpRXBHMzBGSm9hN1NPalJpMEdPWmE5X1hDY2U1WXN1cFp6N0dXRHMyNGJpdEc5YzdSb1c5aWkxU2FUVGpaMllDdDJmSk9rVFhETUZHaDh5UVJaSTNGTW9sY3dxVHdJa0NJVXhlV1pzWjR0X3ZOclNBeV8zSUxB0gG3AUFVX3lxTE9LRU9jNV9teVhSVG1YVWVJYzlCVVpybXZUS3R6YnR6SFlVMTdGM19mZkhIeHVkOEVjaWhibGFCTUw4YXN3dkJLcElzZF9uVE9pT3llaC00ZVFIUUs1cHR1WmFZNC1CN21sWGNfdkpVUHV4Y2hoRkxWSzRFWk5VYTlIMWJiaHl3RDB3dXZ5T2JKX2FYelJsZTVTNllQN2pIN25YZFdaa1prbjN2TGRPM2g1d2FTSXFRTQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/hezbollah-rejects-israel-lebanon-deal.png",
      "alt": "Flags of Israel and Lebanon at a diplomatic signing table",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Anglo-Irish Treaty (1921) and the cry of 'surrender'",
        "excerpt": "Ireland shall have the same constitutional status in the Community of Nations known as the British Empire as the Dominion of Canada, the Commonwealth of Australia, the Dominion of New Zealand, and the Union of South Africa with a Parliament having powers to make laws for the peace, order and good government of Ireland and an Executive responsible to that Parliament, and shall be styled and known as the Irish Free State.",
        "source": "Articles of Agreement for a Treaty between Great Britain and Ireland, 6 December 1921 (Documents on Irish Foreign Policy / National Archives of Ireland)",
        "href": "https://www.difp.ie/volume-1/1921/final-text-of-the-articles-of-agreement-for-a-treaty-between-great-britain-and-ireland-as-signed/214/"
      },
      {
        "category": "historical",
        "title": "Henry Cabot Lodge and the Senate's rejection of the League of Nations (1919)",
        "excerpt": "We abandon entirely by the proposed constitution the policy laid down by Washington in his Farewell Address and the Monroe doctrine. It is worse than idle, it is not honest, to evade or deny this fact, and every fairminded supporter of this draft plan for a league admits it. ... Standing always firmly by these great policies, we have thriven and prospered and have done more to preserve the world's peace than any nation, league, or alliance which ever existed.",
        "source": "Henry Cabot Lodge, Speech in the U.S. Senate opposing the League of Nations, 12 August 1919 (MIT primary-source text)",
        "href": "https://web.mit.edu/21h.102/www/Lodge,%20Opposition%20to%20the%20League%20of%20Nations.html"
      },
      {
        "category": "literary",
        "title": "Coriolanus turns on the city: 'I banish you'",
        "excerpt": "You common cry of curs! whose breath I hate / As reek o' the rotten fens, whose loves I prize / As the dead carcasses of unburied men / That do corrupt my air, I banish you; / And here remain with your uncertainty! / Let every feeble rumour shake your hearts! / Your enemies, with nodding of their plumes, / Fan you into despair! Have the power still / To banish your defenders; till at length / Your ignorance, which finds not till it feels, / Making not reservation of yourselves, / Still your own foes, deliver you as most / Abated captives to some nation / That won you without blows! Despising, / For you, the city, thus I turn my back: / There is a world elsewhere.",
        "source": "William Shakespeare, Coriolanus, Act III, Scene iii (Complete Moby Shakespeare text)",
        "href": "http://shakespeare.mit.edu/coriolanus/coriolanus.3.3.html"
      },
      {
        "category": "literary",
        "title": "Achilles refuses the embassy and Agamemnon's gifts (Iliad, Book 9)",
        "excerpt": "For hateful in my eyes, even as the gates of Hades, is that man that hideth one thing in his mind and sayeth another.",
        "source": "Homer, Iliad 9.307 ff., trans. A. T. Murray (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D9%3Acard%3D307"
      },
      {
        "category": "artistic",
        "title": "The Signing of Peace in the Hall of Mirrors, Versailles, 1919",
        "excerpt": "Orpen was the British official war artist at the 1919 peace conference and was commissioned to record the signing of the Versailles treaty. He came to despise the assembled statesmen as vain and self-serving, and in this canvas he dwarfs them beneath the vast gilded mirrors of the hall, the diplomats reduced to small figures swallowed by the grandeur around them. The painting reads less as a celebration of peace than as a quiet indictment of a settlement many believed was already doomed.",
        "source": "Sir William Orpen, oil on canvas, 1919 (Imperial War Museum, IWM ART 2856), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:William_Orpen_-_The_Signing_of_Peace_in_the_Hall_of_Mirrors.jpg",
        "image": {
          "src": "/covers/hezbollah-rejects-israel-lebanon-deal--art.png",
          "alt": "William Orpen's 1919 painting of statesmen signing the Treaty of Versailles beneath the gilded mirrors of the Hall of Mirrors at Versailles",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Sibelius, Finlandia, Op. 26 (1900) — music of national defiance",
        "excerpt": "Composed in 1900 to rouse Finnish feeling against Russian press censorship and imperial rule, Finlandia opens with menacing brass that gives way to a soaring hymn of resistance. So charged was its nationalism that censors forced it to be performed under disguised, innocuous titles. It endures as the sound of a people refusing an order imposed from outside, an unofficial anthem of defiance set to music.",
        "source": "Jean Sibelius, Finlandia, Op. 26 (1900), public-domain scores (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)"
      }
    ],
    "rank": 29
  },
  {
    "slug": "europe-heatwave-breaks-german-record",
    "headline": "Europe's deadly heatwave breaks Germany's temperature record and halts public events",
    "overview": "A severe heatwave gripping Europe has broken Germany's national temperature record and forced the cancellation of public events as the hot air mass moves east into Denmark, Switzerland and the Czech Republic. Authorities have reported deaths linked to the extreme heat and issued health warnings across the continent. The episode is the latest in a string of intensifying European summers that scientists link to climate change.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cx2knzzwprgo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxPNW4yWVJLNlBEUHVERnVYU0hDWHc0bE5Ua0psdk04TkRMTk9JZjZiRlRkWGhlR2ljZTV6Tmx2eXFiM09ZdjFZTkswTkczeG1iZGJzVDk5ZWRSckZrV2o3cGFxSjV1ZDNnZk45Rkw1ZXhZdm1uOXJVZTg2Z2l4Y1g0M1hsU1F5VWxqUnRSdjdOX3ZidV8yNnYwU05yRlV0VnVyNHVaZnQ1V19IQ2xpMjBjWEpRLTlwVE5MT0k0?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/europe-heatwave-breaks-german-record.png",
      "alt": "People sheltering from the sun in a sweltering European city square",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The August 2003 European heat wave in France",
        "excerpt": "From August 1st to 5th, 2003, the average maximum temperatures recorded in France increased from a value close to the normal value (25°C) to 37°C, then remained between 36 and 37°C until August 13th. From August 1st to 20th, 2003, 15000 excess deaths were observed. The present heat wave was the most disastrous one ever recorded, since the next most dramatic one, in 1976, was responsible for only 6000 excess deaths.",
        "source": "Fouillet et al., \"Excess mortality related to the August 2003 heat wave in France,\" International Archives of Occupational and Environmental Health (PubMed Central PMC1950160)",
        "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC1950160/"
      },
      {
        "category": "historical",
        "title": "Black Sunday and the Dust Bowl, April 14, 1935",
        "excerpt": "The wall of blowing sand and dust first blasted into the eastern Oklahoma panhandle and far northwestern Oklahoma around 4 PM. It raced to the south and southeast across the main body of Oklahoma that evening, accompanied by heavy blowing dust, winds of 40 MPH or more, and rapidly falling temperatures. As eyewitness Pauline Winkler Grey recalled: \"As the wall of dust and sand struck our house the sun was instantly blotted out completely...We stood in our living room in pitch blackness. We were stunned.\"",
        "source": "NOAA / National Weather Service, Norman OK — \"The Black Sunday Dust Storm of April 14, 1935\" (with contemporary eyewitness accounts)",
        "href": "https://www.weather.gov/oun/events-19350414"
      },
      {
        "category": "literary",
        "title": "Phaethon and the Burning Earth — Ovid, Metamorphoses, Book II",
        "excerpt": "The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction—Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust. The highest altitudes are caught in flames, and as their moistures dry they crack in chasms.",
        "source": "Ovid, Metamorphoses, Book 2 (Brookes More translation), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "literary",
        "title": "The Rain of Fire on the Burning Sands — Dante, Inferno, Canto XIV",
        "excerpt": "It was an area wide / Of arid sand and thick, resembling most / The soil that erst by Cato's foot was trod. / Vengeance of Heav'n! Oh! how shouldst thou be fear'd / By all, who read what here my eyes beheld! ... O'er all the sand fell slowly wafting down / Dilated flakes of fire, as flakes of snow / On Alpine summit, when the wind is hush'd.",
        "source": "Dante Alighieri, The Vision of Hell (Inferno), trans. Henry Francis Cary, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/8800/pg8800.txt"
      },
      {
        "category": "artistic",
        "title": "Languor in the Scorching Heat — Vivaldi, \"L'estate\" (Summer), The Four Seasons",
        "excerpt": "Vivaldi's \"Summer\" concerto (1723), the second of The Four Seasons, opens with the marking Allegro non molto and the instruction Languidezza per il caldo — \"languor caused by the heat.\" The strings droop and pant in the oppressive air before the music erupts into the Tempo impetuoso d'estate, the violent summer storm. The score, public domain, sets a sonnet of fields parched under a merciless sun until thunder breaks the swelter.",
        "source": "Antonio Vivaldi, Violin Concerto in G minor, RV 315 (\"L'estate\"), Op. 8 No. 2, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Violin_Concerto_in_G_minor,_RV_315_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "The Sower beneath a Blazing Sun — Vincent van Gogh (1888)",
        "excerpt": "Painted in Arles in June 1888, van Gogh's \"The Sower\" sets a laboring figure against an enormous, low-hanging sun that fills the sky with searing yellow. The disc of the sun blazes like a halo over a parched field, its heat radiating in concentric strokes. Van Gogh, obsessed with the southern light, turned the Provencal summer sun into a near-sacred force of fire that dominates the burning landscape.",
        "source": "Vincent van Gogh, \"The Sower\" (1888), Van Gogh Museum / Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_sower_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/europe-heatwave-breaks-german-record--art.png",
          "alt": "Van Gogh's painting The Sower (1888), a sower in a field beneath a huge blazing yellow sun",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "australia-toughens-child-social-media-ban",
    "headline": "Australia toughens its under-16 social media ban and doubles potential penalties for tech firms",
    "overview": "Australia has strengthened its world-first ban on social media for children under 16, doubling the maximum penalties that technology companies can face for failing to keep minors off their platforms. The expanded rules increase enforcement powers and broaden the services covered by the law. Tech firms have warned the regime is difficult to implement, while the government says it is protecting children from online harms.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxPdjNWWE45OGxaRVY3b2FvV0x4RDRfT3d5aTZBRFM0UFhQREVLaGpEQjhFelA0UHBPUFhqWTlYcEwtTWI0dWdNanVJdDRjTlpmNndMLTZMQV9XeGRnQm1OakVkaDJMOE5ZYnEwb3Q3bWhxVDAwYUlRQlp3R3FjekV4Yk1wR2psQTZLNERqMEppOEJQU0RfZ2hnb0VzaE9sWktHc25oOWtuS1o4amFwQkt5bmJpakcwT1I3OEoxMDRqdHJFSW1NM1I4SFV6Um82aWh2YXQySw?oc=5"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxOWUEtdENFQ2FYTXU4SjA1b1BoVmR2dmtRQzNQUHBqemtYWncyMnJkQkNsS1dfWE85TFFpZEJ6SnRaWklaWkIxZEtoZmhTRXhHWFFZcXdaOHF4anRjRlNHQW53Z0J5MW5SOWM2QVItMkpnNTBGekxQQkZQRkhyVFg4RGFSNnQ3VzVReDlpSF9xWWV6NTY1Ykk0eDhTeUhocm5mQngwSFdPNVYtRWdsRUxXcUQtUWphajFKM2NvQg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/australia-toughens-child-social-media-ban.png",
      "alt": "A teenager's hands holding a smartphone in shadow",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plato establishes a censorship of children's tales in the Republic",
        "excerpt": "And shall we just carelessly allow children to hear any casual tales which may be devised by casual persons, and to receive into their minds ideas for the most part the very opposite of those which we should wish them to have when they are grown up? We cannot. Then the first thing will be to establish a censorship of the writers of fiction, and let the censors receive any tale of fiction which is good, and reject the bad.",
        "source": "Plato, The Republic, Book II (trans. Benjamin Jowett)",
        "href": "https://www.gutenberg.org/cache/epub/1497/pg1497.txt"
      },
      {
        "category": "historical",
        "title": "The 1954 comic-book panic: Wertham's Seduction of the Innocent",
        "excerpt": "Slowly, and at first reluctantly, I have come to the conclusion that this chronic stimulation, temptation and seduction by comic books, both their content and their alluring advertisements of knives and guns, are contributing factors to many children's maladjustment. It is our clinical judgment, in all kinds of behavior disorders and personality difficulties of children, that comic books do play a part.",
        "source": "Fredric Wertham, Seduction of the Innocent (1954), Chapter I",
        "href": "https://archive.org/stream/fredricwerthamseductionoftheinnocent19542ndprinting/Fredric%20Wertham%20Seduction%20of%20the%20Innocent%201954%202nd%20Printing_djvu.txt"
      },
      {
        "category": "literary",
        "title": "Socrates indicted for corrupting the youth",
        "excerpt": "It says that Socrates is a doer of evil, who corrupts the youth; and who does not believe in the gods of the state, but has other new divinities of his own. Such is the charge; and now let us examine the particular counts. He says that I am a doer of evil, and corrupt the youth.",
        "source": "Plato, Apology (trans. Benjamin Jowett)",
        "href": "https://www.gutenberg.org/cache/epub/1656/pg1656.txt"
      },
      {
        "category": "literary",
        "title": "Frankenstein and the creation that escapes its maker",
        "excerpt": "I had desired it with an ardour that far exceeded moderation; but now that I had finished, the beauty of the dream vanished, and breathless horror and disgust filled my heart. Unable to endure the aspect of the being I had created, I rushed out of the room and continued a long time traversing my bed-chamber, unable to compose my mind to sleep.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818), Chapter V",
        "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt"
      },
      {
        "category": "artistic",
        "title": "Goya: The Sleep of Reason Produces Monsters",
        "excerpt": "Goya's etching shows a slumped, dreaming author swarmed by owls and bats as reason sleeps. Its inscription warns that fantasy abandoned by reason produces impossible monsters. The image became the era's emblem for what happens when a society stops guarding the minds it is meant to enlighten.",
        "source": "Francisco de Goya, El sueño de la razón produce monstruos (Los Caprichos, plate 43), 1799",
        "href": "https://commons.wikimedia.org/wiki/File:Francisco_Jos%C3%A9_de_Goya_y_Lucientes_-_The_sleep_of_reason_produces_monsters_(No._43),_from_Los_Caprichos_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/australia-toughens-child-social-media-ban--art.png",
          "alt": "Goya etching of a man asleep at his desk as owls and bats swarm around him; inscription reads 'El sueño de la razon produce monstruos'",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Dukas's The Sorcerer's Apprentice: forces unleashed beyond control",
        "excerpt": "Dukas's 1897 scherzo, written after Goethe's ballad Der Zauberlehrling, sets the tale of an apprentice who borrows his master's magic to animate a broom and then cannot stop it. The music swells into a relentless, flooding deluge as the enchantment multiplies out of control. It is the perfect score for a technology summoned for convenience that no one knows how to switch off.",
        "source": "Paul Dukas, L'apprenti sorcier (symphonic scherzo after Goethe), 1897",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)"
      }
    ],
    "rank": 31
  },
  {
    "slug": "ntsb-ends-tesla-power-steering-probe",
    "headline": "U.S. safety regulator ends its power-steering investigation into 376,000 Tesla vehicles",
    "overview": "The U.S. National Highway Traffic Safety Administration has closed its investigation into power-steering failures affecting about 376,000 Tesla electric vehicles, concluding a probe opened after reports of loss of steering control. The agency ended the inquiry without ordering a new recall. The case is among several federal safety reviews of the automaker's vehicles in recent years.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxQdFp0VUdMWjBPQ2NXdEVRemwxZkx0czFWWXlISDVkNzlqOEJITVhVQUN0am4takgxUkxYc3htWG44cHYtZjZvOEJfcmhtN3l5b25abHpFb2RvSHVzaEp1bDM5YzgySHVfQ1R2bUtQZ2JNU3VKWGRPZ2FGNTNQVWZLMXFwaXhCVmtDYVBzbXNvNmxFUEpYOUMzemU2RXQ2LTNfZVNlQ1FpZEZvelFNN0dGT3ppZzhmd0kzTS1ULXZQYy1uX1VVYTUyX1Nn?oc=5"
      },
      {
        "name": "Finimize",
        "href": "https://news.google.com/rss/articles/CBMikAFBVV95cUxQbXJ3UmRKazBWOUJ2N3FLMGV2UlZMQzJFUEpBekZ5b0ZvdE54UlpXRGxCbEFkVlJKUnpoTXpCbHJqcmZMSE4wME5CNHB4T3VvbW9hMGZiUUlvcVN0aWJSbXlLc01DcDdQQkV5OXdiSjdFUXFhMFRxelJJVFlybHZwc0U2MlhIaVM5TTZEUHNtdGE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/ntsb-ends-tesla-power-steering-probe.png",
      "alt": "A steering wheel inside a modern electric car",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Ralph Nader, \"Unsafe at Any Speed\" (1965)",
        "excerpt": "A decade before the federal safety agency existed, Ralph Nader's 1965 book accused American automakers of building cars whose dangers were engineered in rather than accidental, and of treating driver error as an excuse to ignore mechanical defects. The uproar helped create the National Highway Traffic Safety Administration itself in 1970 and the legal machinery of the federal defect investigation. Tesla's closed power-steering probe is a direct descendant of that machinery: a regulator weighing whether a loss of control was the driver's fault or the design's.",
        "source": "Ralph Nader, Unsafe at Any Speed: The Designed-In Dangers of the American Automobile",
        "href": "https://www.nhtsa.gov/book/countermeasures/countermeasures-discourage-speeding"
      },
      {
        "category": "historical",
        "title": "The Tay Bridge Disaster (1879)",
        "excerpt": "Beautiful Railway Bridge of the Silv'ry Tay! / Alas! I am very sorry to say / That ninety lives have been taken away / On the last Sabbath day of 1879, / Which will be remember'd for a very long time.",
        "source": "William McGonagall, \"The Tay Bridge Disaster\" (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Tay_Bridge_Disaster"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses Book II — Phaethon cannot control the chariot of the Sun",
        "excerpt": "and Phaethon filled with fear, knew not to guide with trusted reins, nor where the way might be— nor, if he knew, could he control their flight. ... the steeds perceived it, with a rush impetuous, they left the beaten track; regardless of all order and control.",
        "source": "Ovid, Metamorphoses, trans. Brookes More (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=150"
      },
      {
        "category": "literary",
        "title": "Horace, Odes I.14 — \"O ship\" (the ship of state)",
        "excerpt": "O navis, referent in mare te novi fluctus. ... nonne vides, ut nudum remigio latus et malus celeri saucius Africo ... non tibi sunt integra lintea, non di, quos iterum pressa voces malo.",
        "source": "Horace, Carmina (Odes) Book 1, Poem 14 (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0024:book=1:poem=14"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, \"The Fall of Phaeton\" (c. 1604–08)",
        "excerpt": "Rubens freezes the catastrophe at its peak: Phaethon is hurled from the sun-chariot as the panicked horses of the Sun bolt off course, the reins useless, the wheels and bodies tumbling through a sky split by lightning. The machine has overpowered its master, and the only fix left is the thunderbolt that ends the ride. Oil on canvas, National Gallery of Art, Washington (accession 1990.1.1).",
        "source": "Peter Paul Rubens, The Fall of Phaeton, National Gallery of Art (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/ntsb-ends-tesla-power-steering-probe--art.png",
          "alt": "Peter Paul Rubens, The Fall of Phaeton — Phaethon hurled from the runaway chariot of the Sun amid panicked horses and lightning",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Rossini, Guillaume Tell Overture — the galloping Finale (\"March of the Swiss Soldiers\")",
        "excerpt": "Rossini's 1829 overture closes with its famous galloping finale, the \"March of the Swiss Soldiers\": a headlong cavalry charge of trumpets and racing strings that has become the universal sound of horses at full, barely-governed speed. It is the runaway chariot rendered as music — exhilaration and the edge of losing control in the same breathless gallop. Public-domain full scores and parts are available on IMSLP.",
        "source": "Gioachino Rossini, Guillaume Tell (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Guillaume_Tell_(Rossini,_Gioacchino)"
      }
    ],
    "rank": 32
  },
  {
    "slug": "leon-black-walks-out-epstein-hearing",
    "headline": "Billionaire Leon Black walks out of a congressional hearing on the Epstein investigation",
    "overview": "Billionaire investor Leon Black walked out of a hearing tied to the investigation into Jeffrey Epstein, abruptly ending his appearance before lawmakers examining Epstein's finances and associates. Black, the former Apollo Global Management chief, has previously acknowledged large payments to Epstein for advisory work but denied wrongdoing. His departure drew sharp criticism from members of the panel.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn948lwyl3jo"
      },
      {
        "name": "The New York Times",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxNeV9QV0pzT0tyN2llZ01rMERKRWRGcEVNWU9XdVNCR3hGaHlUUzViRnpfMUZYdXJ6RnI4ZzZrWEVxRUdQOHg0U2tRVlFhN3RFdjg0LXBsUHktN2RXZXg0RGtZSW1ta2NlRjQybDBYLXU1ZllMSUJHd1BnS0FsWVJ6OF9hc2JqZE1ITTFv?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/leon-black-walks-out-epstein-hearing.png",
      "alt": "An empty witness chair before a congressional hearing dais",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Joseph Welch confronts McCarthy: \"Have you no sense of decency?\"",
        "excerpt": "Until this moment, Senator, I think I have never really gauged your cruelty or your recklessness. ... Have you no sense of decency, sir? At long last, have you left no sense of decency?",
        "source": "Army-McCarthy hearings, June 9, 1954 (Joseph N. Welch)",
        "href": "https://en.wikiquote.org/wiki/Joseph_N._Welch"
      },
      {
        "category": "historical",
        "title": "Émile Zola, \"J'Accuse...!\" — the Dreyfus inquiry",
        "excerpt": "I accuse Major Du Paty de Clam as the diabolic workman of the miscarriage of justice ... I accuse General Billot of having held in his hands the unquestionable evidence of Dreyfus's innocence ... I accuse the offices of the war of carrying out an abominable press campaign",
        "source": "Émile Zola, open letter to the President of the Republic, L'Aurore, 13 January 1898 (Wikisource translation)",
        "href": "https://en.wikisource.org/wiki/Translation:J%27Accuse...!"
      },
      {
        "category": "literary",
        "title": "Socrates before his accusers — Plato's Apology",
        "excerpt": "How you, O Athenians, have been affected by my accusers, I cannot tell; but I know that they almost made me forget who I was—so persuasively did they speak; and yet they have hardly uttered a word of truth.",
        "source": "Plato, Apology, trans. Benjamin Jowett (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm"
      },
      {
        "category": "literary",
        "title": "Geryon, the image of fraud, and the usurers — Dante's Inferno",
        "excerpt": "“Behold the monster with the pointed tail, / Who cleaves the hills, and breaketh walls and weapons, / Behold him who infecteth all the world.” / Thus unto me my Guide began to say,",
        "source": "Dante Alighieri, Inferno, Canto XVII, trans. Henry Wadsworth Longfellow (1867), Wikisource",
        "href": "https://www.gutenberg.org/cache/epub/1001/pg1001.txt"
      },
      {
        "category": "artistic",
        "title": "A defendant before the judges — Gérôme's \"Phryne before the Areopagus\"",
        "excerpt": "Gérôme's 1861 canvas stages the ancient trial of the hetaira Phryne, hauled before the assembled judges of the Areopagus on a charge of impiety. Her advocate Hypereides flings back her robe, and the magistrates recoil in a single startled gesture — the moment a tribunal's solemn judgment collapses into spectacle. It is the powerful brought to account, and the theater of standing before one's accusers.",
        "source": "Jean-Léon Gérôme, Phryne revealed before the Areopagus (1861), Hamburger Kunsthalle (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me,_Phryne_revealed_before_the_Areopagus_(1861)_-_01.jpg",
        "image": {
          "src": "/covers/leon-black-walks-out-epstein-hearing--art.png",
          "alt": "Jean-Léon Gérôme's painting Phryne before the Areopagus, showing a defendant exposed before a row of judges who react in alarm.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The day of wrath and judgment — Verdi's \"Dies Irae\"",
        "excerpt": "Verdi's 1874 Requiem unleashes its \"Dies Irae\" — the medieval \"day of wrath\" — with hammered bass-drum strokes and a chorus crying out before the throne of judgment. The text imagines no defendant who can evade the summons: every hidden thing is brought forth, and the mighty are called at last to answer. The movement is the sound of accounting that cannot be walked out on.",
        "source": "Giuseppe Verdi, Messa da Requiem (1874), \"Dies Irae\" sequence (IMSLP, public domain)",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 33
  },
  {
    "slug": "buttigieg-false-report-children",
    "headline": "Pete Buttigieg briefly separated from his children after a false police report",
    "overview": "Former U.S. Transportation Secretary Pete Buttigieg was briefly separated from his children after police responded to a false report at his home, an apparent 'swatting' incident, authorities said. Officers arrived in force before determining the report was a hoax. The episode is the latest in a wave of false emergency calls targeting public figures in the United States.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQVGktUXdaTUpaYmFCZWJwOG4tVWwzLVR4cEtCWk1zY3ExQnItQkxmWE9jRTJuRFcta2JYYUFyNG5GU0tzZ1FnODBVbVRmVVhlMjlQM0FIS3FqRm1naDhBSElkSldIbmZkWkxDSkZXaXlXZmtrVTg4WTAxZ1djUC00UnJlbWtVUURoTFVPTnNvUTJHNTB6WmV3Y0k1QUQ3bjZN?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwydx95kjx0o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/buttigieg-false-report-children.png",
      "alt": "Police cruiser lights glowing outside a suburban home at night",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tacitus on the revival of the treason law under Tiberius",
        "excerpt": "It was Augustus who first, under colour of this law, applied legal inquiry to libellous writings, provoked, as he had been, by the licentious freedom with which Cassius Severus had defamed men and women of distinction in his insulting satires. Tiberius, when consulted by Pompeius Macer, the praetor, as to whether prosecutions for treason should be revived, replied that the laws must be enforced. The revival of the maiestas charge opened the door to a swarm of informers, the delatores, who could summon the full machinery of the state against a man on nothing more than a whispered accusation.",
        "source": "Tacitus, Annals, Book 1.72 (trans. Church & Brodribb)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D1%3Achapter%3D72"
      },
      {
        "category": "historical",
        "title": "Émile Zola, 'J'Accuse...!' on the false conviction of Alfred Dreyfus",
        "excerpt": "I accuse the first council of war of violating the law by condemning a defendant with unrevealed evidence, and I accuse the second council of war of covering up this illegality, by order, by committing in his turn the legal crime of knowingly discharging the culprit.",
        "source": "Émile Zola, 'J'Accuse...!', open letter in L'Aurore, 13 January 1898 (English translation, Wikisource)",
        "href": "https://en.wikisource.org/wiki/Translation:J%27Accuse...!"
      },
      {
        "category": "literary",
        "title": "Aesop, 'The Shepherd's Boy and the Wolf' — the cry of 'Wolf!'",
        "excerpt": "A SHEPHERD-BOY, who watched a flock of sheep near a village, brought out the villagers three or four times by crying out, “Wolf! Wolf!” and when his neighbors came to help him, laughed at them for their pains. The Wolf, however, did truly come at last. The Shepherd-boy, now really alarmed, shouted in an agony of terror: “Pray, do come and help me; the Wolf is killing the sheep;” but no one paid any heed to his cries, nor rendered any assistance. The Wolf, having no cause of fear, at his leisure lacerated or destroyed the whole flock. ... There is no believing a liar, even when he speaks the truth.",
        "source": "Aesop's Fables (George Fyler Townsend translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/21/pg21.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, 'Othello' — the false report that demands 'ocular proof'",
        "excerpt": "Villain, be sure thou prove my love a whore;\nBe sure of it. Give me the ocular proof,\nOr, by the worth of man's eternal soul,\nThou hadst been better have been born a dog\nThan answer my waked wrath!",
        "source": "William Shakespeare, Othello, Act 3, Scene 3, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1531/pg1531.txt"
      },
      {
        "category": "artistic",
        "title": "Artemisia Gentileschi, 'Susanna and the Elders' (1610) — the false accusation made flesh",
        "excerpt": "Gentileschi paints the moment before the lie is told: two elders crowd over the bathing Susanna, who recoils and twists away, hands raised against them. When she refuses them, they will fabricate a charge of adultery and condemn her to death on their false testimony — 'these things do we testify' — until Daniel exposes their perjury. The painting turns the Apocryphal story of malicious denunciation into a study of a woman trapped by powerful men's words.",
        "source": "Artemisia Gentileschi, Susanna and the Elders (1610), oil on canvas, Schönborn Collection, Pommersfelden — Wikimedia Commons object page",
        "href": "https://commons.wikimedia.org/wiki/File:Susanna_and_the_Elders_(1610),_Artemisia_Gentileschi.jpg",
        "image": {
          "src": "/covers/buttigieg-false-report-children--art.png",
          "alt": "Artemisia Gentileschi's 1610 painting Susanna and the Elders, showing a nude Susanna recoiling from two elders leaning over her",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven, 'Wellington's Victory', Op. 91 — the alarum that summons cannon and force",
        "excerpt": "Beethoven's 'Battle Symphony' opens with opposing drum-rolls, trumpet signals and answering volleys of musket and cannon fire scored directly into the orchestra — the music of an alarm raised and an armed force converging. It is the eighteenth-century sound of overwhelming response: bugles, fusillades and the rush of troops, summoned and bearing down before a single note of victory is sounded.",
        "source": "Ludwig van Beethoven, Wellingtons Sieg (Wellington's Victory, or the Battle of Vittoria), Op. 91 (1813), public-domain scores on IMSLP",
        "href": "https://imslp.org/wiki/Wellingtons_Sieg,_Op.91_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 34
  },
  {
    "slug": "cape-verde-world-cup-round-of-32",
    "headline": "Cape Verde reaches the World Cup round of 32 and will face Argentina",
    "overview": "Cape Verde, one of the smallest nations ever to qualify for the World Cup, has advanced to the round of 32 at the expanded tournament and will play Argentina next. The island nation's improbable run has been celebrated as a fairytale of the new 48-team format. Players and fans described the achievement as a defining moment for the country's football history.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxPLWxmNDBfN1h2Wm9ZaF9VMXRnQjNCaC12UGZGXzFsTzVWcXgwRDF5OHl3TWYxYk1FS3I5NktTU1d6QXI1YXRtdnl1SHlKWUpLTmhSRWVoN2JXTHVPNU9iMlQ5X291Z1piZDY5WDFrdFlvQlpvdzc1eTdyNmNGMldGMlgzaGROd0lMdlFOY3NDMFUtYUNsX0lwUXh1a3Qyejhtd05yU1BWSGFQY0RSNkNRUmxB?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxPa1VpZDYwbWFVTk8wOFVwRVU1VHg1Zm9UU0JfbnhXazZtOWVNY2lTWDVXc2x4RkRZaXNTYjB6Ul9hcld4SXlHVXlYelV3bHlNV3lLUXBiRV9JYWxXUWRWX1g0R1FTXy1tbWFJcW5lQjgtTXFXNXRtQTVuUDF0bnpucnFZeEpJTnlXenRkb0tnYmt2RXhEWFktanZxcklCMVc0bGQxWnFqQllKS2lhSGFEMXJMU1RtTl82UmYxbkFENVg2RFE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/cape-verde-world-cup-round-of-32.png",
      "alt": "A football resting on the centre spot of a floodlit pitch at night",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "David and Goliath",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. ... So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "The Bible, King James Version, 1 Samuel 17 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "historical",
        "title": "The Battle of Marathon: the few who ran at the many",
        "excerpt": "And when they had been arranged in their places and the sacrifices proved favourable, then the Athenians were let go, and they set forth at a run to attack the Barbarians.",
        "source": "Herodotus, The History, Book VI.112, trans. G. C. Macaulay (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2456/pg2456.txt"
      },
      {
        "category": "literary",
        "title": "The Hare and the Tortoise: the race is not always to the swift",
        "excerpt": "The Hare was soon far out of sight, and to make the Tortoise feel very deeply how ridiculous it was for him to try a race with a Hare, he lay down beside the course to take a nap until the Tortoise should catch up. The Tortoise meanwhile kept going slowly but steadily, and, after a time, passed the place where the Hare was sleeping. ... The Hare now ran his swiftest, but he could not overtake the Tortoise in time. The race is not always to the swift.",
        "source": "Aesop, The Aesop for Children, illus. Milo Winter (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/19994/19994-h/19994-h.htm"
      },
      {
        "category": "literary",
        "title": "Pindar, Olympian Ode I: the glory of the unlikely victor",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice: for hence cometh the glorious hymn and entereth into the minds of the skilled in song.",
        "source": "Pindar, The Extant Odes of Pindar, Olympian I, trans. Ernest Myers (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/10717/pg10717.txt"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, David with the Head of Goliath",
        "excerpt": "In Caravaggio's late masterpiece the boy David, lit by a single raking beam, holds aloft the severed head of the giant he was never meant to beat. The sword bears the abbreviated motto humilitas occidit superbiam, humility kills pride. The painting freezes the instant the underdog's improbable triumph becomes undeniable fact.",
        "source": "Michelangelo Merisi da Caravaggio, David with the Head of Goliath (c. 1610), Galleria Borghese, Rome (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "image": {
          "src": "/covers/cape-verde-world-cup-round-of-32--art.png",
          "alt": "Caravaggio's painting David with the Head of Goliath, the young David holding the giant's severed head against a dark background",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Handel, \"See, the Conqu'ring Hero Comes\" from Judas Maccabaeus",
        "excerpt": "Handel wrote his triumphal chorus to greet a small people's victorious champion, and ever since it has been the music of the unlikely conqueror's homecoming. Trumpet, drum and rising voices turn a humble return into a national celebration. It is the sound of a tiny nation hailing heroes the world thought could never win.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63 (1746), Act III chorus (IMSLP, public domain)",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      }
    ],
    "rank": 35
  },
  {
    "slug": "gehry-abu-dhabi-arts-venue",
    "headline": "Abu Dhabi unveils plans for a Frank Gehry-designed performing arts centre on Saadiyat Island",
    "overview": "Abu Dhabi has revealed plans for Dar al Funoon, a performing arts venue designed by architect Frank Gehry for its Saadiyat Island cultural district. The building joins a cluster of major museums on the island, including the Louvre Abu Dhabi and a forthcoming Guggenheim, also designed by Gehry. The sculptural design continues the architect's signature language of curving, fragmented forms.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/26/dar-al-funoon-abu-dhabi-frank-gehry/"
      },
      {
        "name": "The National",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQSWdsQlFMT25kWU0yVXlFaEhTNkloMWVoUVBCWjUtNUtPaWF0MmNlYlA4aGRnQ01pMzBkUUV3cUFUWWc3eW5FVExQaXUtTEVmS29penozOTZRZGlGTS1IRXpPRHFjWHpLNndmOFpidnc5X1p3ekxIMkd1dGhlZFo5TmFscEJTMFdKRDhFRkdndzdfUjM5c3VlWVlJQkphYm1ZVGNNUm00ZzZ3T3JITzlxcQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/gehry-abu-dhabi-arts-venue.png",
      "alt": "A sculptural performing arts building with curving fragmented forms",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The building of the Parthenon under Pericles",
        "excerpt": "For this reason are the works of Pericles all the more to be wondered at; they were created in a short time for all time. Each one of them, in its beauty, was even then and at once antique; but in the freshness of its vigor it is, even to the present day, recent and newly wrought. Such is the bloom of perpetual newness, as it were, upon these works of his, which makes them ever to look untouched by time, as though the unfaltering breath of an ageless spirit had been infused into them.",
        "source": "Plutarch, Life of Pericles 13 (Perrin trans., LacusCurtius)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Pericles*.html"
      },
      {
        "category": "historical",
        "title": "Justinian's Hagia Sophia, a dome hung from heaven",
        "excerpt": "Yet it seems not to rest upon solid masonry, but to cover the space with its golden dome suspended from Heaven. And all these details, fitted together with incredible skill in mid-air and floating off from each other and resting only on the parts next to them, produce a single and most extraordinary harmony in the work, and yet do not permit the spectator to linger much over the study of any one of them. Indeed one might say that its interior is not illuminated from without by the sun, but that the radiance comes into being within it, such an abundance of light bathes this shrine.",
        "source": "Procopius, Buildings I.i (Dewing trans., LacusCurtius)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Buildings/1A*.html"
      },
      {
        "category": "literary",
        "title": "Coleridge's stately pleasure-dome in Xanadu",
        "excerpt": "In Xanadu did Kubla Khan / A stately pleasure-dome decree: / Where Alph, the sacred river, ran / Through caverns measureless to man / Down to a sunless sea. / So twice five miles of fertile ground / With walls and towers were girdled round: / And there were gardens bright with sinuous rills, / Where blossomed many an incense-bearing tree; / And here were forests ancient as the hills, / Enfolding sunny spots of greenery.",
        "source": "Samuel Taylor Coleridge, \"Kubla Khan\", The Complete Poetical Works of Samuel Taylor Coleridge (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/29090.txt.utf-8"
      },
      {
        "category": "literary",
        "title": "Shelley's Ozymandias: monuments and ambition in the sand",
        "excerpt": "I met a traveller from an antique land / Who said: Two vast and trunkless legs of stone / Stand in the desert...Near them, on the sand, / Half sunk, a shattered visage lies, whose frown, ... Tell that its sculptor well those passions read / Which yet survive, stamped on these lifeless things, / The hand that mocked them, and the heart that fed: / And on the pedestal these words appear: ... Look on my works, ye Mighty, and despair!’",
        "source": "Percy Bysshe Shelley, \"Ozymandias\", The Complete Poetical Works of Percy Bysshe Shelley (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/4800.txt.utf-8"
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, \"The Architect's Dream\" (1840)",
        "excerpt": "Cole's 1840 canvas seats a tiny architect atop an oversized column, reclining before a fantastical skyline that vaults across four thousand years of building. Egyptian pylons, Greek temples, Roman aqueducts and a Gothic cathedral rise from a luminous harbour, a dreamer's compendium of every wonder humanity has dared to raise. It is the patron's vision made paint: architecture imagined as pure spectacle, untethered from utility and answerable only to ambition.",
        "source": "Thomas Cole, The Architect's Dream, Toledo Museum of Art (via Wikimedia Commons / Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Cole_-_Architect%E2%80%99s_Dream_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/gehry-abu-dhabi-arts-venue--art.png",
          "alt": "The Architect's Dream by Thomas Cole, 1840 oil painting showing a reclining architect before a fantastical assembly of Egyptian, Greek, Roman and Gothic structures",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Handel's Music for the Royal Fireworks, a festival for a monument",
        "excerpt": "Handel scored his Royal Fireworks suite for a vast wind band of oboes, horns, trumpets and drums to crown a public spectacle staged before a purpose-built ceremonial pavilion in London's Green Park. The blazing overture and its dancing movements turn the unveiling of a monument into communal jubilation, sound rising with the architecture it celebrates. Like a new temple of the arts, it announces that a place has been made for wonder, and invites a whole city in.",
        "source": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749), IMSLP",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      }
    ],
    "rank": 36
  },
  {
    "slug": "arizona-sect-leader-convicted-abuse",
    "headline": "Polygamous sect leader convicted of abuse after girls were found in a trailer on an Arizona highway",
    "overview": "A polygamous sect leader has been convicted on abuse charges after authorities discovered young girls in a trailer stopped on an Arizona highway, a case that exposed the group's practices. Prosecutors said the conviction caps a long investigation into the sect's leadership. The verdict was welcomed by advocates for the children involved.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQYXM5NDllNUY2dHUwc2dCTFV5RGh2bnVLOFlISjB2bEJvQnVTRmhnV2luU2xFRV9HekRTdDRlVzh5Rm1SRG1uWU1EVnU5anFZTnpwSDdjVlFCUWNGRVY5ZjJmUXdmNjN0anZRbUhjN05URkdXYU80TkF4WmtaY2xTOUNaalJTWGdWVzB4ZFUwb09fZzZZQW9VaFA4VDdCeXFvY0lqZmRQZG9xN1duVGc?oc=5"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMihwFBVV95cUxPX1U5eUdKWkZSanFxM3JhamNteVBLU2U2bUtqSDl3a09xUVhOc0liUkl2a2RwSS1PQnppYVlsYnBERkZLN29rZmJSS3VZbm9Ucm9QbTFqbXFKMEdpX3FDbDU1bmE2bEMzQ2V1TUdIajhWSk42dDNQQ0JZWHFCMldLRzhfMnRjams?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/arizona-sect-leader-convicted-abuse.png",
      "alt": "A lonely desert highway stretching toward distant hills",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "John of Leiden and the polygamous \"kingdom\" of Münster (1534-35)",
        "excerpt": "Gresbeck betrays himself on one occasion by his reference to the fact that Jan shared in the universal want: \"Most of the women, therefore, had fled the town through great hunger. The king had fifteen wives, to whom, with the exception of the queen, he gave leave of absence, telling them that each should go to her friends, and that all were to obtain food wherever they could.\"",
        "source": "Karl Kautsky, Communism in Central Europe in the Time of the Reformation (1897), quoting the eyewitness account of Heinrich Gresbeck — Internet Archive",
        "href": "https://archive.org/details/communismincentr00kautuoft"
      },
      {
        "category": "historical",
        "title": "David Koresh and the Branch Davidians at Mount Carmel (Waco, 1993)",
        "excerpt": "On February 28, 1993, the Bureau of Alcohol, Tobacco and Firearms (BATF) attempted to serve a search warrant on the Branch Davidian religious community near Waco, TX, and an arrest warrant on the community's leader, David Koresh. The fact that approximately 80 men, women and children did not flee tear gas and flames, and instead met gruesome deaths, has led a large cross section of the American public to suspect that the government somehow prevented the Davidians from escaping their residence on April 19, 1993.",
        "source": "U.S. House of Representatives, Committee on Government Reform, Report 106-1037, \"The Tragedy at Waco: New Evidence Examined\" (December 28, 2000) — GovInfo",
        "href": "https://www.govinfo.gov/content/pkg/CRPT-106hrpt1037/html/CRPT-106hrpt1037.htm"
      },
      {
        "category": "literary",
        "title": "Susanna and the wicked elders (History of Susanna, Apocrypha)",
        "excerpt": "And the two elders saw her going in every day, and walking; so that their lust was inflamed toward her. ... Behold, the garden doors are shut, that no man can see us, and we are in love with thee; therefore consent unto us, and lie with us. If thou wilt not, we will bear witness against thee, that a young man was with thee: and therefore thou didst send away thy maids from thee.",
        "source": "The History of Susanna, King James Version — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Susanna"
      },
      {
        "category": "literary",
        "title": "The false shepherds who feed on the flock (Ezekiel 34)",
        "excerpt": "Son of man, prophesy against the shepherds of Israel, prophesy, and say unto them, Thus saith the Lord GOD unto the shepherds; Woe be to the shepherds of Israel that do feed themselves! should not the shepherds feed the flocks? Ye eat the fat, and ye clothe you with the wool, ye kill them that are fed: but ye feed not the flock. ... but with force and with cruelty have ye ruled them.",
        "source": "Book of Ezekiel, chapter 34, King James Version — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ezekiel"
      },
      {
        "category": "artistic",
        "title": "William Blake, \"The Chimney Sweeper\" (Songs of Innocence, 1789; illuminated plate, copy Z, 1826)",
        "excerpt": "When my mother died I was very young,\nAnd my father sold me while yet my tongue,\nCould scarcely cry weep weep weep weep.\nSo your chimneys I sweep & in soot I sleep.\n\nTheres little Tom Dacre who cried when his head\nThat curl'd like a lambs back, was shav'd, so I said,\nHush Tom never mind it, for when your head's bare,\nYou know that the soot cannot spoil your white hair.",
        "source": "William Blake, Songs of Innocence and of Experience, copy Z (1826), Library of Congress — Wikisource transcription of the illuminated plate",
        "href": "https://en.wikisource.org/wiki/Songs_of_Innocence_and_of_Experience_(1826)/Songs_of_Innocence/The_Chimney_Sweeper",
        "image": {
          "src": "/covers/arizona-sect-leader-convicted-abuse--art.png",
          "alt": "William Blake's illuminated plate of \"The Chimney Sweeper\" from Songs of Innocence and of Experience, copy Z (1826), depicting exploited child sweeps and an angel setting them free from coffins of black.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Susanna, HWV 66 (oratorio, 1749)",
        "excerpt": "Handel's 1749 oratorio dramatizes the apocryphal History of Susanna: two respected elders, consumed by lust, ambush a virtuous wife in her garden and, when rebuffed, swear false witness to send her to death. The music turns the courtroom into a moral reckoning, with the youth Daniel cross-examining the predators until their lies collapse and judgment falls on them instead of their innocent victim. The score is a public-domain meditation on hidden abuse exposed and the deliverance of the wronged.",
        "source": "Susanna, HWV 66 (Handel) — full public-domain scores at IMSLP (Walsh 1749 print and Chrysander edition)",
        "href": "https://imslp.org/wiki/Susanna,_HWV_66_(Handel,_George_Frideric)"
      }
    ],
    "rank": 37
  },
  {
    "slug": "vespa-80th-anniversary-rome",
    "headline": "Thousands of Vespa scooters swarm Rome's historic center to mark the icon's 80th anniversary",
    "overview": "Thousands of Vespa riders converged on Rome's historic center to celebrate the 80th anniversary of the iconic Italian scooter, parading past the city's landmarks in a sea of pastel bodywork. The Vespa, first produced in 1946, became a symbol of postwar Italian design and the country's economic recovery. Enthusiasts traveled from around the world to join the commemorative ride.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNb0JNazNkT0w1YXQ2LVFuTGRHZ0Nxa2pFVDFwQ1VqZV9KUjFpdy04NlFKaUhKR3lqLXNjell2ZWRZNnFyazJ3dFhpV0hkSG9TU1hGQi1WRkk0WUFkSzRjb3hNRWhsbDV2U3o1WjZmNnpZVkpEc3lKcGJOZnJNQTF4WE5QREViWWFIRE9uZmFuQlE3aS1FSmRVbExhYnExVHdlZXNMMXB3?oc=5"
      },
      {
        "name": "France 24",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxPUVV6SHlVZkpHa2NwSUpjQ3ByVGhxV05ScXQ0SkoydGRBMDdLZVE4NDZjMjliNE9EUXE3WE5mMS01OWZYM2VqdnlqSGhDb1ZTamJ5Y083Z2FDa0NvdGVfV0tqWFNkWVYtSmxta3ZwM2YzX0UxMy1lWlNzNlpmMWJwbG5JSHBzWmdrVlU2MjNCXzZhNmdEckkwdGhrd0NFNXZEVUswMzY5TTJZME4wcWF5Nm10SW9uUGtLZTQzUG1yclBBUDRDc2dPZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/vespa-80th-anniversary-rome.png",
      "alt": "A crowd of vintage Vespa scooters parading through a historic Italian square",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Roman Triumph of Aemilius Paulus",
        "excerpt": "Three days were assigned for the triumphal procession. The first barely sufficed for the exhibition of the captured statues, paintings, and colossal figures, which were carried on two hundred and fifty chariots.",
        "source": "Plutarch, Life of Aemilius Paulus 32 (trans. Bernadotte Perrin, Loeb 1918)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0003:chapter=32"
      },
      {
        "category": "historical",
        "title": "The Marshall Plan and Italy's Postwar Recovery",
        "excerpt": "The rehabilitation of the economic structure of Europe quite evidently will require a much longer time and greater effort than had been foreseen. It is logical that the United States should do whatever it is able to do to assist in the return of normal economic health in the world, without which there can be no political stability and no assured peace.",
        "source": "George C. Marshall, Harvard Commencement Address, June 5, 1947 (U.S. National Archives, Milestone Documents)",
        "href": "https://www.archives.gov/milestone-documents/marshall-plan"
      },
      {
        "category": "literary",
        "title": "Song of the Open Road",
        "excerpt": "Afoot and light-hearted I take to the open road, / Healthy, free, the world before me, / The long brown path before me leading wherever I choose.",
        "source": "Walt Whitman, Leaves of Grass (1882), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Leaves_of_Grass_(1882)/Song_of_the_Open_Road"
      },
      {
        "category": "literary",
        "title": "Phaethon Mounts the Chariot of the Sun",
        "excerpt": "The other leaps into the light chariot with his youthful body, and stands aloft, and rejoices to take in his hand the reins presented to him, and then gives thanks to his reluctant parent. In the meantime the swift Pyroeis, and Eoüs and Æthon, the horses of the sun, and Phlegon, making the fourth, fill the air with neighings, sending forth flames, and beat the barriers with their feet.",
        "source": "Ovid, Metamorphoses, Book II (trans. Henry T. Riley), via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/21765/21765-h/21765-h.htm"
      },
      {
        "category": "artistic",
        "title": "Unique Forms of Continuity in Space",
        "excerpt": "Boccioni's striding bronze figure dissolves a body into pure forward motion, its surfaces fluttering like flames in a slipstream. The Futurist sculpture distills the joy of speed and the worship of the machine that would later make a little Italian scooter a national emblem of mobility and modern life.",
        "source": "Umberto Boccioni, 1913 (cast bronze), Italian Futurism — via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:%27Unique_Forms_of_Continuity_in_Space%27,_1913_bronze_by_Umberto_Boccioni.jpg",
        "image": {
          "src": "/covers/vespa-80th-anniversary-rome--art.png",
          "alt": "Umberto Boccioni's bronze sculpture 'Unique Forms of Continuity in Space' (1913), a striding figure abstracted into flowing forms of motion",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Overture to Guillaume Tell (William Tell)",
        "excerpt": "Rossini's galloping finale, with its breathless cavalry rhythm and headlong rush of strings, has become the universal sound of joyful pursuit and the open road. Composed in 1829 and long in the public domain, its exuberant momentum mirrors a sea of scooters streaming through the Eternal City.",
        "source": "Gioachino Rossini, 1829 — full score on IMSLP (public domain)",
        "href": "https://imslp.org/wiki/Guillaume_Tell_(Rossini,_Gioacchino)"
      }
    ],
    "rank": 38
  },
  {
    "slug": "willison-red-team-ai-assistant",
    "headline": "Public challenge to hack an AI email assistant ends with no one leaking its secret after 6,000 tries",
    "overview": "Developer Fernando Irarrázaval invited the public to try to make an AI email assistant reveal a secret it held, running a challenge at hackmyclaw.com against a test instance of the OpenClaw assistant. After roughly 2,000 participants and 6,000 attempts — and about $500 in token costs — no one succeeded in extracting the secret through prompt-injection or social-engineering emails. The experiment, widely shared after a write-up by AI commentator Simon Willison, became a practical case study in the security of giving language models access to real tools.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Fernando Irarrázaval",
        "href": "https://www.fernandoi.cl/posts/hackmyclaw/"
      },
      {
        "name": "Simon Willison's Weblog",
        "href": "https://simonwillison.net/2026/Jun/26/hack-my-ai-assistant/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/willison-red-team-ai-assistant.png",
      "alt": "A glowing terminal screen reflected in a developer's glasses in a dark room",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Laocoön's warning and the Trojan Horse (Virgil, Aeneid II)",
        "excerpt": "aut hoc inclusi ligno occultantur Achivi, aut haec in nostros fabricata est machina muros inspectura domos venturaque desuper urbi, aut aliquis latet error; equo ne credite, Teucri. Quicquid id est, timeo Danaos et dona ferentis.",
        "source": "Virgil, Aeneid, Book II (Latin text, Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0055%3Abook%3D2%3Acard%3D40"
      },
      {
        "category": "historical",
        "title": "The Sirens' deceptive song (Homer, Odyssey XII)",
        "excerpt": "Come hither, as thou farest, renowned Odysseus, great glory of the Achaeans; stay thy ship that thou mayest listen to the voice of us two. For never yet has any man rowed past this isle in his black ship until he has heard the sweet voice from our lips. Nay, he has joy of it, and goes his way a wiser man.",
        "source": "Homer, Odyssey, Book XII, trans. A. T. Murray (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D12%3Acard%3D153"
      },
      {
        "category": "literary",
        "title": "\"Trust not their presents, nor admit the horse\" (Dryden's Aeneid)",
        "excerpt": "This hollow fabric either must inclose, / Within its blind recess, our secret foes; / Or 'tis an engine rais'd above the town, / T' o'erlook the walls, and then to batter down. / Somewhat is sure design'd, by fraud or force: / Trust not their presents, nor admit the horse.",
        "source": "Virgil, Aeneid, Book II, trans. John Dryden (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "The servant that obeys too literally (Goethe, \"The Sorcerer's Apprentice\")",
        "excerpt": "And now come, thou well-worn broom, / And thy wretched form bestir; / Thou hast ever served as groom, / So fulfil my pleasure, sir! / On two legs now stand, / With a head on top; / Waterpail in hand, / Haste, and do not stop!",
        "source": "Goethe, \"The Pupil in Magic\" (Der Zauberlehrling), trans. Edgar Alfred Bowring (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic"
      },
      {
        "category": "artistic",
        "title": "The city wheels its own ruin through the gate",
        "excerpt": "Tiepolo paints the moment of fatal welcome: crowds of Trojans haul the towering wooden horse through their own gates in festive procession, mistaking the engine of their destruction for a trophy. The deceit has already won; the walls that held for ten years are opened from the inside by trust alone.",
        "source": "Giovanni Domenico Tiepolo, \"The Procession of the Trojan Horse into Troy\" (c. 1760), National Gallery, London",
        "href": "https://commons.wikimedia.org/wiki/File:Giovanni_Domenico_Tiepolo_-_The_Procession_of_the_Trojan_Horse_in_Troy_-_WGA22382.jpg",
        "image": {
          "src": "/covers/willison-red-team-ai-assistant--art.png",
          "alt": "Crowds of Trojans drawing the great wooden horse in procession through the gates of Troy, oil painting by Giovanni Domenico Tiepolo",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, \"L'apprenti sorcier\" (The Sorcerer's Apprentice)",
        "excerpt": "Dukas's 1897 scherzo sets Goethe's parable to music: a giddy theme marches the enchanted broom into motion, then surges out of control as the apprentice's command, obeyed too well, floods the room. It is the sound of an automaton that follows instructions perfectly and disastrously, halting only when the master returns to speak the words that bind it.",
        "source": "Paul Dukas, L'apprenti sorcier, full orchestral score (Durand, 1897), IMSLP",
        "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)"
      }
    ],
    "rank": 39
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
