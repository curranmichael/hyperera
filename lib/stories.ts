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
// the Morning Edition of 1 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Evening Edition and the Afternoon Edition of 30 June 2026.
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
    "slug": "trump-crypto-income-billion",
    "headline": "Trump reports more than $1.4 billion in income from crypto ventures in his first year back in office",
    "overview": "President Donald Trump reported more than $1.4 billion in income from cryptocurrency ventures over his first year back in office, according to a new financial disclosure. The figure, drawn largely from his family's crypto businesses, dwarfs his other sources of income and has intensified questions about conflicts of interest.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cvgmv98ez3zo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPM3BNSU5vN1NhSXlTQXg0M2NCcXV0dEczV2hwTDhFNHJxMFk1ZEhpZUMxd0tPdTZxTUtLdDl3YjdQR0RXV2RiRE5rSzUtVFEwVFNlTVBPNkFyR3RuclFXemJIRF84VkJHcThiOU85N3RUdHRwdjF2QjYzUkhIeC1YS0xIZWNLTVhoUUEzSjM2V0VXZVdSdExhNmpTdTRTaU9wVWpncA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/trump-crypto-income-billion.png",
      "alt": "President Donald Trump pictured alongside imagery of cryptocurrency.",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Vespasian and the Tax on Urine (\"Pecunia non olet\")",
        "excerpt": "When his son Titus blamed him for even laying a tax upon urine, he applied to his nose a piece of the money he received in the first instalment, and asked him, \"if it stunk?\" And he replying no, \"And yet,\" said he, \"it is derived from urine.\"",
        "source": "Suetonius, The Lives of the Twelve Caesars, Divus Vespasianus, ch. 23 (Alexander Thomson trans.), Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0132:life%3Dves.:chapter%3D23"
      },
      {
        "category": "historical",
        "title": "Plutarch on the Avarice of Crassus",
        "excerpt": "The Romans, it is true, say that the many virtues of Crassus were obscured by his sole vice of avarice; and it is likely that the one vice which became stronger than all the others in him, weakened the rest. The chief proofs of his avarice are found in the way he got his property and in the amount of it.",
        "source": "Plutarch, Life of Crassus, ch. 2 (Bernadotte Perrin trans., 1916), Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0038:chapter%3D2:section%3D1"
      },
      {
        "category": "literary",
        "title": "Dante on the Simonists (Inferno, Canto XIX)",
        "excerpt": "O SIMON MAGUS, O forlorn disciples,\nYe who the things of God, which ought to be\nThe brides of holiness, rapaciously\nFor silver and for gold do prostitute,\nNow it behoves for you the trumpet sound,\nBecause in this third Bolgia ye abide.",
        "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto XIX (Henry Wadsworth Longfellow trans., 1867), Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_19"
      },
      {
        "category": "literary",
        "title": "Volpone Worships His Gold (Ben Jonson)",
        "excerpt": "Good morning to the day; and next, my gold!—\nHail the world's soul, and mine!",
        "source": "Ben Jonson, Volpone; or, The Fox, Act I, Scene 1 (1606), Wikisource",
        "href": "https://en.wikisource.org/wiki/Volpone/Act_I"
      },
      {
        "category": "artistic",
        "title": "Wagner, Das Rheingold — MUSIC",
        "excerpt": "The prelude of Wagner's Ring cycle turns on a curse: the dwarf Alberich renounces love to seize the Rhinemaids' gold and forge a ring of limitless power, and the treasure poisons everyone who touches it. Wagner scores the gold's allure with shimmering, hypnotic orchestral color that darkens into menace as greed takes hold. It is the definitive musical parable of vast wealth corrupting whoever grasps for dominion through it.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A, full score (B. Schott's Söhne, Mainz, 1873), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Evelyn De Morgan, The Worship of Mammon — VISUAL ARTWORK",
        "excerpt": "Evelyn De Morgan's 1909 allegory shows a woman abasing herself at the feet of Mammon, the cold idol of riches, who dangles a bag of gold while she clings to his knee and gazes up in rapture. The painting dramatizes the biblical warning that one cannot serve both God and Mammon, rendering the pull of money as literal, degrading worship. It is a pointed image of a person who has traded every higher loyalty for the glitter of wealth.",
        "source": "Evelyn De Morgan, The Worship of Mammon, 1909, oil on canvas, De Morgan Collection; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_worship_of_Mammon.jpg",
        "image": {
          "src": "/covers/trump-crypto-income-billion--art.png",
          "alt": "A kneeling woman in white clings to the knee of a towering golden idol of Mammon who holds out a bag of gold.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "lead": true,
    "rank": 1
  },
  {
    "slug": "us-lifts-anthropic-export-ban",
    "headline": "US lifts export ban on Anthropic's advanced Fable and Mythos AI models",
    "overview": "The United States lifted export curbs that had restricted sales of Anthropic's most advanced artificial-intelligence models, including its Fable and Mythos systems, the company said. The move eases limits that had kept the frontier models out of a number of overseas markets.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNZDJJRUpoY0J3YUZXZWFpUFF5N2pzUTM3X2pSMzZXdVI3ZEtsTnU1b09yRl9TU1NhMlV2RFF4Q3ZEaUVnQXVYWlpzd0k0OGVjRkgzNlBtVTFab3ZxZWFGWUMtWXFCOEZqODdRNzhhSml1Y0pTZGZVNVJLSFZvSGJ2VDFMZ1RTNm5fTXoxVXpQWWRSR3ptWXVpM2Mzc0l4YW05cl9LRDBPV3kwc1FhdmVKcWJwWHA?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cdr42623e1do"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/us-lifts-anthropic-export-ban.png",
      "alt": "An abstract representation of an advanced artificial-intelligence system.",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Byzantine Silk Smuggling under Justinian (c. 552 CE)",
        "excerpt": "About the same time there came from India certain monks; and when they had satisfied Justinian Augustus that the Romans no longer should buy silk from the Persians, they promised the emperor in an interview that they would provide the materials for making silk so that never should the Romans seek business of this kind from their enemy the Persians, or from any other people whatsoever. They said that they were formerly in Serinda, which they call the region frequented by the people of the Indies, and there they learned perfectly the art of making silk. Moreover, to the emperor who plied them with many questions as to whether he might have the secret, the monks replied that certain worms were manufacturers of silk, nature itself forcing them to keep always at work; the worms could certainly not be brought here alive, but they could be grown easily and without difficulty; the eggs of single hatchings are innumerable; as soon as they are laid men cover them with dung and keep them warm for as long as it is necessary so that they produce insects.",
        "source": "Procopius of Caesarea, History of the Wars, Book VIII (Gothic War IV), ch. 17, on the introduction of sericulture into the Byzantine Empire. Internet Medieval Sourcebook (Fordham University).",
        "href": "https://sourcebooks.fordham.edu/source/550byzsilk.asp"
      },
      {
        "category": "historical",
        "title": "The 1843 Debate on the Exportation of Machinery in the House of Commons",
        "excerpt": "These branches of manufacture had found their way abroad; other countries are determined to manufacture for themselves instead of taking them from us, and the only question now was, whether we should inflict the small additional charge upon the prosecution of foreign manufacturing enterprise which the prohibition of the exportation of our machinery seemed to enable us to do.",
        "source": "Mr. Gladstone, \"Exportation of Machinery,\" HC Deb, 10 August 1843, Hansard (UK Parliament historic Hansard archive).",
        "href": "https://api.parliament.uk/historic-hansard/commons/1843/aug/10/exportation-of-machinery"
      },
      {
        "category": "literary",
        "title": "Prometheus Bound",
        "excerpt": "Yes, and I caused mortals to cease foreseeing their doom.\n\nChorus: Of what sort was the cure that you found for this affliction?\n\nPrometheus: I caused blind hopes to dwell within their breasts.\n\nChorus: A great benefit was this you gave to mortals.\n\nPrometheus: In addition, I gave them fire.\n\nChorus: What! Do creatures of a day now have flame-eyed fire?\n\nPrometheus: Yes, and from it they shall learn many arts.",
        "source": "Aeschylus, Prometheus Bound, lines 248-256, trans. Herbert Weir Smyth (1926). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010:card=250"
      },
      {
        "category": "literary",
        "title": "Frankenstein; or, The Modern Prometheus",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge, and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Wollstonecraft Shelley, Frankenstein, or the Modern Prometheus, Revised Edition (London: Henry Colburn and Richard Bentley, 1831), Chapter 4. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Frankenstein,_or_the_Modern_Prometheus_(Revised_Edition,_1831)/Chapter_4"
      },
      {
        "category": "artistic",
        "title": "Scriabin, Prometheus: The Poem of Fire, Op. 60 — MUSIC",
        "excerpt": "Scriabin's single-movement symphonic poem for orchestra, piano, wordless chorus, and a keyboard of colored light channels the Promethean myth into pure sound, built almost entirely on his shimmering, unresolved \"mystic chord.\" The music surges from a dark, hovering haze toward a blazing, ecstatic climax, staging the theft of fire as the awakening of human consciousness. First performed in Moscow in 1911, it fuses light and tone to make the diffusion of a stolen, transformative power almost physically audible.",
        "source": "Aleksandr Scriabin, Prometheus, Le Poème du Feu (Symphony No. 5), Op. 60 (1910). IMSLP / Petrucci Music Library work page.",
        "href": "https://imslp.org/wiki/Prometheus,_Le_Po%C3%A8me_du_Feu,_Op.60_(Scriabin,_Aleksandr)"
      },
      {
        "category": "artistic",
        "title": "Heinrich Füger, Prometheus Brings Fire to Mankind — VISUAL ARTWORK",
        "excerpt": "Heinrich Füger's luminous Neoclassical canvas shows the Titan Prometheus kneeling amid shadowed, half-formed mortals, cupping a newly kindled flame that throws warm light across their awakening faces. The stolen fire becomes the visual center of the composition, radiating knowledge outward from a single source into the surrounding darkness. The painting frames the gift of a forbidden, world-changing power as the very moment humankind steps into enlightenment.",
        "source": "Heinrich Friedrich Füger, Prometheus Brings Fire to Mankind, oil on canvas, c. 1817, Liechtenstein Museum, Vienna. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/us-lifts-anthropic-export-ban--art.png",
          "alt": "Prometheus kneels in shadow holding a bright flame that illuminates awakening human figures around him.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "antarctica-dinosaur-fossil-drawer",
    "headline": "Fossil kept in a drawer for 40 years is identified as Antarctica's first dinosaur bone",
    "overview": "A fossil that sat in a British Antarctic Survey drawer for about 40 years has been identified as the first dinosaur bone ever collected on Antarctica. The 82-million-year-old tail vertebra belonged to a titanosaur, a long-necked plant-eating sauropod, and was originally recorded as a marine reptile when it was gathered on James Ross Island in 1985.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxQOTUxZlhZYTFpM21TSUJpelczQ3JnS08yZFM4Tm9ZRnNNU2ZuWVBLN0hIaVQtcy15V2Z0NDVnRDlNVWhfbjQwaFVRNmJ3VnZiUkVGazZTOGJvbWJxWk5waGtHWTVzOVpTNEp2Y0ZWMEdndlBxRkhLNlQ2Mm5Pb3lodzRxSWs0a0VUbEZZaDNZUTE2NVNXM2xRVlJmMjRsQQ?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/06/30/science/antarctica-first-dinosaur-scli-intl"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/antarctica-dinosaur-fossil-drawer.png",
      "alt": "An illustrated reconstruction of a long-necked titanosaur sauropod dinosaur.",
      "credit": "CNN"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Scott's Last Expedition: fossils gathered at Mount Buckley",
        "excerpt": "From the last Wilson, with his sharp eyes, has picked several plant impressions, the last a piece of coal with beautifully traced leaves in layers, also some excellently preserved impressions of thick stems, showing cellular structure.",
        "source": "Robert Falcon Scott, Scott's Last Expedition, Volume 1 (journal entry of 8 February 1912, at Mount Buckley near the Beardmore Glacier), arranged by Leonard Huxley, 1913. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Scott's_Last_Expedition/Volume_1/Chapter_19"
      },
      {
        "category": "historical",
        "title": "Howard Carter opens the tomb of Tut-ankh-Amen",
        "excerpt": "At first I could see nothing, the hot air escaping from the chamber causing the candle flame to flicker, but presently, as my eyes grew accustomed to the light, details of the room within emerged slowly from the mist, strange animals, statues, and gold—everywhere the glint of gold.",
        "source": "Howard Carter and A. C. Mace, The Tomb of Tut-ankh-Amen, Discovered by the Late Earl of Carnarvon and Howard Carter, Volume 1, George H. Doran Co., New York, 1923. Internet Archive.",
        "href": "https://archive.org/details/tomboftutankhame00cart_1"
      },
      {
        "category": "literary",
        "title": "A Journey to the Centre of the Earth: the field of bleached bones",
        "excerpt": "It seemed like an immense cemetery, where the remains of twenty ages mingled their dust together.",
        "source": "Jules Verne, A Journey to the Centre of the Earth, chapter XXXVII, translated by Frederick Amadeus Malleson (1877). Standard Ebooks.",
        "href": "https://standardebooks.org/ebooks/jules-verne/journey-to-the-center-of-the-earth/f-a-malleson/text/chapter-37"
      },
      {
        "category": "literary",
        "title": "Ozymandias by Percy Bysshe Shelley",
        "excerpt": "Nothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\" (1818), as printed in The Hundred Best Poems (Lyrical) in the English Language, Second Series. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Sinfonia Antartica (Symphony No. 7), Ralph Vaughan Williams — MUSIC",
        "excerpt": "Grown from Vaughan Williams's score for the film Scott of the Antarctic, this five-movement symphony turns the frozen continent itself into sound, with a wordless soprano and women's chorus keening like wind over the ice. Wind machine, organ, tuned percussion and glittering strings conjure a landscape of vast silences and deep, indifferent time. It is a fitting soundtrack to a bone that lay unseen in the polar dark for eighty million years, then decades more in a drawer.",
        "source": "Ralph Vaughan Williams, Sinfonia Antartica (Symphony No. 7), composed 1949–1952, first performed 1953. IMSLP / Petrucci Music Library work page.",
        "href": "https://imslp.org/wiki/Sinfonia_Antartica_(Symphony_No.7)_(Vaughan_Williams,_Ralph)"
      },
      {
        "category": "artistic",
        "title": "The Sea of Ice (Das Eismeer) by Caspar David Friedrich — VISUAL ARTWORK",
        "excerpt": "Jagged slabs of pack ice heave upward in a shattered pyramid, and beneath them the crushed stern of a ship is almost lost, swallowed by the frozen wreckage. Friedrich's polar vision is a monument to human ambition overwhelmed and preserved by the cold, the vessel entombed like a specimen waiting to be found. It captures the icy indifference of the far south, where a titanosaur's tail bone waited eighty-two million years to be recognized.",
        "source": "Caspar David Friedrich, Das Eismeer (The Sea of Ice / The Wreck of Hope), oil on canvas, 1823–1824, Hamburger Kunsthalle. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Das_Eismeer_-_Hamburger_Kunsthalle_-_02.jpg",
        "image": {
          "src": "/covers/antarctica-dinosaur-fossil-drawer--art.png",
          "alt": "A ship crushed and half-buried beneath jagged upthrust slabs of polar pack ice under a pale sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "texas-bible-required-reading",
    "headline": "Texas board approves Bible stories as required reading for more than 5 million public school students",
    "overview": "The Texas State Board of Education approved a reading list that makes Bible stories required reading for more than five million public-school students. The roughly 200 mandated texts, which take effect in 2030, place Texas at the forefront of a conservative push to bring Christian teachings into American classrooms and drew objections over church-state separation.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNYk5leVVPRGxXaDlvbTlOY1NmWmlIRjlzVDJteXMxNWgwWHNsSXk3b2pld0tKeGJXSzhEU01qWW1qN21INzA0VmpEbjhISWVDejljUVNXUU5WeVIzTFdNYlBBbnpEZ1VCZDdxa0o3WXBPbGt2UXRNU1djSGJhUmg5WlhyX1l0THowdlc5VG1EbktVdlo0a2ZQRQ?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/education/texas-education-board-approves-bible-stories-as-required-reading-in-public-schools"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/texas-bible-required-reading.png",
      "alt": "An open Bible resting in a school classroom.",
      "credit": "PBS NewsHour"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Old Deluder Satan Act of 1647",
        "excerpt": "It being one chief project of that old deluder, Satan, to keep men from the knowledge of the Scriptures, as in former times by keeping them in an unknown tongue, so in these latter times by persuading from the use of tongues, that so that at least the true sense and meaning of the original might be clouded and corrupted with false glosses of saint-seeming deceivers...",
        "source": "Massachusetts Bay Colony, \"The Old Deluder Satan Act\" (1647), Records of the Governor and Company of the Massachusetts Bay in New England.",
        "href": "https://constitution.org/1-History/primarysources/deluder.html"
      },
      {
        "category": "historical",
        "title": "Julian's Rescript on Christian Teachers (362 AD)",
        "excerpt": "All who profess to teach anything whatever ought to be men of upright character, and ought not to harbour in their souls opinions irreconcilable with what they publicly profess... if they think that those writers were in error with respect to the most honoured gods, then let them betake themselves to the churches of the Galilaeans to expound Matthew and Luke.",
        "source": "The Emperor Julian, Letter 36, \"Rescript on Christian Teachers,\" in The Works of the Emperor Julian, trans. Wilmer Cave Wright.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_the_Emperor_Julian/Letters/Letter_36"
      },
      {
        "category": "literary",
        "title": "Plato, Republic, Book II — the censorship of tales for the young",
        "excerpt": "And shall we just carelessly allow children to hear any casual tales which may be devised by casual persons, and to receive into their minds ideas for the most part the very opposite of those which we should wish them to have when they are grown up?",
        "source": "Plato, The Republic, Book II (377b), trans. Benjamin Jowett.",
        "href": "https://en.wikisource.org/wiki/The_Republic_of_Plato/Book_2"
      },
      {
        "category": "literary",
        "title": "Charlotte Brontë, Jane Eyre — Mr. Brocklehurst and the Psalms",
        "excerpt": "\"And the Psalms? I hope you like them?\" \"No, sir.\" \"That proves you have a wicked heart; and you must pray to God to change it: to give you a new and clean one: to take away your heart of stone and give you a heart of flesh.\"",
        "source": "Charlotte Brontë, Jane Eyre (1847), Chapter IV.",
        "href": "https://victorianweb.org/authors/bronte/cbronte/janeeyre/4.html"
      },
      {
        "category": "artistic",
        "title": "Bach, Clavier-Übung III (the \"German Organ Mass\") — MUSIC",
        "excerpt": "In this monumental 1739 collection for organ, Bach set the core hymns of Luther's Catechism as a cycle of chorale preludes, framing the whole with a great prelude and fugue. Doctrine becomes counterpoint: the articles of faith a child was made to memorize are woven into music of staggering intricacy. It is scripture drilled into the mind and then transfigured into sound.",
        "source": "Johann Sebastian Bach, Clavier-Übung III (Dritter Teil der Klavierübung), BWV 552, 669–689, 802–805 (Leipzig, 1739).",
        "href": "https://imslp.org/wiki/Clavier-%C3%9Cbung_III_(Bach,_Johann_Sebastian)"
      },
      {
        "category": "artistic",
        "title": "Jan Steen, A School for Boys and Girls — VISUAL ARTWORK",
        "excerpt": "Jan Steen's crowded classroom, painted around 1670, teems with children who squabble, doze, and ignore their exasperated master and mistress. The scene wryly stages the gap between the lofty ideal of instruction and the chaos of actual young minds. Loosely echoing Raphael's School of Athens, it turns the schoolroom into both a temple of learning and a comic riot.",
        "source": "Jan Steen, A School for Boys and Girls, oil on canvas, about 1670, Scottish National Gallery, Edinburgh (NG 2421).",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Steen_-_A_School_for_Boys_and_Girls_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/texas-bible-required-reading--art.png",
          "alt": "A crowded seventeenth-century Dutch schoolroom full of unruly children with a schoolmaster and schoolmistress.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "getty-shutterstock-merger-scrapped",
    "headline": "Getty Images scraps its $3.7 billion merger with Shutterstock after UK regulator's conditions",
    "overview": "Getty Images called off its $3.7 billion merger with Shutterstock after Britain's competition regulator demanded the sale of Shutterstock's editorial business as a condition of approval. The two stock-image companies had announced the tie-up in 2025 to build a larger rival amid growing competition from AI image generators.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOZ2lWLWdzNkRYX2FwdGd3LVhWRkQwSnFsckpuRkV5OTV2YVFUMzRjNVBsdjB5ZVM0c1dQbWNVWm0zUTJBdGRWeHlwUEd3M1BKQzljZGlZNWFydUY4aDA3NGlpY0ttSE9vb2xRSk5Wb1hOX2hGTmlkdFYyc1RPUXByTGJGM2JxamhoMVgtYWIzblNtNE80aTl0a2tqUQ?oc=5"
      },
      {
        "name": "U.S. News & World Report",
        "href": "https://money.usnews.com/investing/news/articles/2026-06-30/getty-images-scraps-shutterstock-merger"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/getty-shutterstock-merger-scrapped.png",
      "alt": "The Getty Images and Shutterstock corporate branding.",
      "credit": "Global Banking & Finance Review"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Northern Securities railroad trust dissolved (1904)",
        "excerpt": "No scheme or device could more certainly come within the words of the act,—'combination in the form of a trust or otherwise . . . in restraint of commerce among the several states or with foreign nations,'—or could more effectively and certainly suppress free competition between the constituent companies.",
        "source": "Justice John Marshall Harlan, majority opinion, Northern Securities Co. v. United States, 193 U.S. 197 (1904).",
        "href": "https://www.law.cornell.edu/supremecourt/text/193/197"
      },
      {
        "category": "historical",
        "title": "The Supreme Court breaks up Standard Oil (1911)",
        "excerpt": "The duty to enforce the statute requires the application of broader and more controlling remedies.",
        "source": "Chief Justice Edward D. White, opinion of the Court, Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911).",
        "href": "https://www.law.cornell.edu/supremecourt/text/221/1"
      },
      {
        "category": "literary",
        "title": "Miss Havisham jilted at the hour of her wedding in Great Expectations",
        "excerpt": "The day came, but not the bridegroom. He wrote a letter—— … When she recovered from a bad illness that she had, she laid the whole place waste, as you have seen it, and she has never since looked upon the light of day.",
        "source": "Charles Dickens, Great Expectations (London: Chapman & Hall, 1890 edition), Chapter XXII (Herbert Pocket recounting the jilting to Pip).",
        "href": "https://en.wikisource.org/wiki/Great_Expectations_(1890)/Chapter_XXII"
      },
      {
        "category": "literary",
        "title": "The colossal wreck of Ozymandias",
        "excerpt": "And on the pedestal these words appear: \"My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!\" Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\" (1818).",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Wagner, Götterdämmerung (Twilight of the Gods) — MUSIC",
        "excerpt": "The final music drama of Wagner's Ring cycle stages the collapse of an entire world order, ending as Valhalla and its gods are consumed by fire. A grand design built on a stolen hoard of gold cannot hold, and the towering ambition of would-be masters is dissolved into ruin. The score's closing conflagration is one of music's most overwhelming depictions of a mighty union coming undone.",
        "source": "Richard Wagner, Götterdämmerung, WWV 86D (composed 1848–74), the fourth part of Der Ring des Nibelungen. Work page at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Tower of Babel — VISUAL ARTWORK",
        "excerpt": "Bruegel's vast unfinished tower spirals up toward the clouds, its upper stages already crumbling even as builders toil below. It is the archetypal image of an over-reaching collective project halted before completion, a would-be monument to unity that scrutiny and disorder bring to nothing. The grand ambition to build something that reaches heaven ends, instead, in a magnificent ruin.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel, 1563, oil on panel, Kunsthistorisches Museum, Vienna. Image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/getty-shutterstock-merger-scrapped--art.png",
          "alt": "Pieter Bruegel the Elder's painting of the unfinished Tower of Babel, a huge spiraling tower rising over a landscape and harbor.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "saab-gripen-ukraine-deal",
    "headline": "Saab signs a $2.54 billion deal to sell 16 Gripen fighter jets to Ukraine",
    "overview": "Sweden's Saab signed a contract to sell 16 Gripen E fighter jets to Ukraine in a deal worth about 24.6 billion Swedish crowns, or $2.54 billion. President Volodymyr Zelensky said deliveries would begin in 2027, though Saab put the timeline at 2029 to 2030.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPVXJlbHk5dlJaTjNCbzVhX3RDS1R2SFh0ajQ4UVJDRkJXa3ZTTm1HVWFBNzE5OXhPY2RwV3VZRHJweXA3aF85TjktQzlhZGh3NFZyc0pEM1NxSTlHQzZYZUdTMkUyZzZ1TjBwaU5QTWo4SmNPZzBUT09pU1FuZ2djZ1VtcF9rN2c1d3F1NFVrRXRhWklwb2NMU3dyclg4NmMxOUdvcW55OWJtUVJhWVBPaW5HZTY5TGF0cTNnZG9BSQ?oc=5"
      },
      {
        "name": "AP",
        "href": "https://www.aol.com/articles/saab-signs-2-54-billion-193146000.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/saab-gripen-ukraine-deal.png",
      "alt": "A Saab Gripen fighter jet in flight.",
      "credit": "Global Banking & Finance Review"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Lend-Lease Act of 1941",
        "excerpt": "To sell, transfer title to, exchange, lease, lend, or otherwise dispose of, to any such government any defense article.",
        "source": "An Act to Promote the Defense of the United States (Lend-Lease Act), Public Law 77-11, Section 3(a)(2), March 11, 1941. U.S. National Archives.",
        "href": "https://www.archives.gov/milestone-documents/lend-lease-act"
      },
      {
        "category": "historical",
        "title": "The Treaty of Alliance with France, 1778",
        "excerpt": "his Majesty and the said united States, shall make it a common cause, and aid each other mutually with their good Offices, their Counsels, and their forces... The essential and direct End of the present defensive alliance is to maintain effectually the liberty, Sovereignty, and independance absolute and unlimited of the said united States.",
        "source": "Treaty of Alliance between the United States and France, Articles 1 and 2, February 6, 1778. U.S. National Archives.",
        "href": "https://www.archives.gov/milestone-documents/treaty-of-alliance-with-france"
      },
      {
        "category": "literary",
        "title": "The Shield of Achilles, Homer's Iliad, Book 18",
        "excerpt": "First fashioned he a shield, great and sturdy, adorning it cunningly in every part... But when the glorious god of the two strong arms had fashioned all the armour, he took and laid it before the mother of Achilles. And like a falcon she sprang down from snowy Olympus, bearing the flashing armour from Hephaestus.",
        "source": "Homer, The Iliad, Book 18, trans. A. T. Murray. Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18"
      },
      {
        "category": "literary",
        "title": "The Arms of Aeneas, Virgil's Aeneid, Book 8",
        "excerpt": "Behold the promised gift, by craft and power of my Olympian spouse made perfect, that my son need never fear Laurentum's haughty host, nor to provoke fierce Turnus to the fray. Cythera's Queen so saying, embraced her son, and hung the arms, all glittering, on an oak that stood thereby.",
        "source": "Virgil, The Aeneid, Book 8, trans. Theodore C. Williams. Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0054:book=8"
      },
      {
        "category": "artistic",
        "title": "Finlandia, Op. 26 by Jean Sibelius — MUSIC",
        "excerpt": "Composed in 1899 as a covert protest against Russian imperial censorship, Sibelius's tone poem became an anthem of a small nation's will to defend itself. Turbulent, martial music surges toward the serene, hymn-like theme that Finns embraced as the sound of their freedom. To evade censors, it was performed under disguised titles, yet its message of resistance was unmistakable.",
        "source": "Jean Sibelius, Finlandia, Op. 26 (1899, rev. 1900). International Music Score Library Project (IMSLP).",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)"
      },
      {
        "category": "artistic",
        "title": "Liberty Leading the People by Eugène Delacroix — VISUAL ARTWORK",
        "excerpt": "Delacroix's 1830 masterpiece shows an allegorical Liberty striding over a barricade, tricolour raised and musket in hand, leading armed citizens of every class into the fight. It is a defining image of a people taking up weapons to defend their freedom against a stronger power. The blend of raw violence and soaring ideal has made it one of the most enduring symbols of a nation in arms.",
        "source": "Eugène Delacroix, La Liberté guidant le peuple (Liberty Leading the People), 1830, oil on canvas, Musée du Louvre, Paris. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/saab-gripen-ukraine-deal--art.png",
          "alt": "An allegorical figure of Liberty holding a tricolour flag and a musket leads armed citizens over a barricade during a revolution.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "swiss-museums-benin-bronzes",
    "headline": "Three Swiss museums return 18 looted Benin Bronzes to Nigeria",
    "overview": "Three Swiss museums returned 18 looted Benin Bronzes to Nigeria, part of a wider agreement to hand back 28 objects. The artefacts, received in Lagos, were taken from the royal palace of the Kingdom of Benin during the 1897 British invasion and had been held in Zurich and Geneva collections for more than a century.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/swiss-museums-return-eighteen-benin-bronzes-to-nigeria-1234753783/"
      },
      {
        "name": "SWI swissinfo.ch",
        "href": "https://www.swissinfo.ch/eng/various/swiss-museums-return-important-benin-bronzes-to-nigeria/91671565"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/swiss-museums-benin-bronzes.png",
      "alt": "One of the Benin Bronzes returned to Nigeria.",
      "credit": "SWI swissinfo.ch"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Benin Massacre — an eyewitness of the 1897 Punitive Expedition",
        "excerpt": "\"On the altars were several rudely carved maces for killing the unfortunate victims\" and there stood \"carved ivory tusks, standing upright, on hideous bronze heads.\" Captain Alan Boisragon, one of only two British survivors of the ambushed Phillips mission, set down this account within months of the reprisal that stripped the Oba's palace of the very bronzes and ivories now being sent home to Nigeria.",
        "source": "Alan Maxwell Boisragon, The Benin Massacre (London: Methuen & Co., 1897), p. 185.",
        "href": "https://archive.org/details/beninmassacre00bois"
      },
      {
        "category": "historical",
        "title": "Byron's curse on Lord Elgin, who stripped the Parthenon",
        "excerpt": "\"Thy country sends a spoiler worse than both. / Survey this vacant, violated fane; / Recount the relics torn that yet remain.\" Writing in 1811, Byron branded Elgin's removal of the Parthenon marbles a sacrilege on a par with the sack of Rome, declaring that \"the insulted wall sustains his hated name\" — the earliest and fiercest voice in a restitution debate that still burns two centuries on.",
        "source": "Lord Byron, \"The Curse of Minerva\" (1811), in The Works of Lord Byron, ed. E. H. Coleridge, vol. 1.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Lord_Byron_(ed._Coleridge,_Prothero)/Poetry/Volume_1/The_Curse_of_Minerva"
      },
      {
        "category": "literary",
        "title": "The sack of Troy in Virgil's Aeneid",
        "excerpt": "\"The palace of Deiphobus ascends / In smoky flames, and catches on his friends. / Ucalegon burns next: the seas are bright / With splendor not their own, and shine with Trojan light.\" Aeneas recalls the night a great city was broken open and its palaces plundered and put to the torch — the archetypal image of a royal seat despoiled by an invading army.",
        "source": "Virgil, Aeneid, Book II, trans. John Dryden (1697), lines ~310-315.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=2:card=298"
      },
      {
        "category": "literary",
        "title": "Belshazzar's feast — the looted temple vessels and the reckoning",
        "excerpt": "\"Belshazzar, whiles he tasted the wine, commanded to bring the golden and silver vessels which his father Nebuchadnezzar had taken out of the temple which was in Jerusalem; that the king, and his princes, his wives, and his concubines, might drink therein. Then they brought the golden vessels that were taken out of the temple of the house of God which was at Jerusalem; and the king, and his princes, his wives, and his concubines, drank in them. They drank wine, and praised the gods of gold, and of silver, of brass, of iron, of wood, and of stone.\"",
        "source": "The Bible, Book of Daniel 5:2-4 (King James Version, 1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Daniel"
      },
      {
        "category": "artistic",
        "title": "Verdi's Triumphal March from Aida — MUSIC",
        "excerpt": "In the Act II Grand March of Verdi's Aida, a victorious Egyptian army parades through Thebes displaying the plunder and captives seized from conquered Ethiopia. The blazing trumpets and processional pomp stage the exact spectacle at the heart of this story: an empire glorying in the spoils it has carried home from a defeated kingdom. First performed in Cairo in 1871, it remains the most famous musical pageant of imperial conquest and its human cost.",
        "source": "Giuseppe Verdi, Aida (opera, 1871), \"Marcia trionfale\" (Act II). IMSLP work page.",
        "href": "https://imslp.org/wiki/Aida_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "A cast brass plaque from the Oba's palace, Benin City — VISUAL ARTWORK",
        "excerpt": "This intricately cast brass plaque is one of the celebrated Benin Bronzes, made to adorn the pillars of the royal palace in Benin City and depicting court figures in high relief. Its virtuoso metalwork gives a face to what was taken in 1897 and to what is now, plaque by plaque, being returned. The example pictured was carried off during the Punitive Expedition and long held in the British Museum.",
        "source": "Cast brass plaque from Benin City, Kingdom of Benin (16th-17th c.). Photograph by Michel wal, 2009, CC BY-SA 3.0, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Benin_brass_plaque_01.jpg",
        "image": {
          "src": "/covers/swiss-museums-benin-bronzes--art.png",
          "alt": "A cast brass plaque from Benin City showing court figures in relief, one of the Benin Bronzes.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "greece-wildfire-deadly",
    "headline": "One dead as firefighters battle a wildfire near Thessaloniki in northern Greece",
    "overview": "Firefighters backed by aircraft and helicopters struggled to contain a wildfire near Thessaloniki in northern Greece, where a body was found in the burned area and a village was evacuated. The blaze is one of several fanned by extreme summer heat across the region.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c0qy3nkex0qo"
      },
      {
        "name": "GreekReporter",
        "href": "https://greekreporter.com/2026/06/30/thessaloniki-wildfire-deadly-body-found/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/greece-wildfire-deadly.png",
      "alt": "Aircraft and firefighters tackling a wildfire in Greece.",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Forest Fire on the Mountain",
        "excerpt": "As when some great forest fire is raging upon a mountain top and its light is seen afar, even so as they marched the gleam of their armor flashed up into the firmament of heaven.",
        "source": "Homer, The Iliad, Book 2 (lines 455-458), trans. Samuel Butler (1898). Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0217%3Abook%3D2%3Acard%3D455"
      },
      {
        "category": "historical",
        "title": "The Great Fire of Rome",
        "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Caelian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus.",
        "source": "Tacitus, The Annals, Book 15.38, trans. Alfred John Church and William Jackson Brodribb. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15"
      },
      {
        "category": "literary",
        "title": "The Burning of Troy",
        "excerpt": "The Palace of Deiphobus ascends In smoaky Flames, and catches on his Friends. Ucalegon burns next; the Seas are bright With splendor, not their own; and thine with Trojan light.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (1697). Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
      },
      {
        "category": "literary",
        "title": "The Chariot of the Sun Sets the World Ablaze",
        "excerpt": "The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction—Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust—",
        "source": "Ovid, Metamorphoses, Book 2 (Phaethon), trans. Brookes More (1922). Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D2%3Acard%3D227"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, The Seasons (Summer) — MUSIC",
        "excerpt": "In the Summer part of Haydn's late oratorio, the music paints a landscape prostrated by drought and merciless heat before a shattering thunderstorm breaks over the fields. Shimmering strings evoke the scorching midday sun and nature succumbing to its pressure, and the chorus erupts in the terror of the tempest. It is the elements turned against the land, rendered as pure orchestral drama.",
        "source": "Joseph Haydn, Die Jahreszeiten (The Seasons), Hob.XXI:3 (1801), Part 2 \"Der Sommer\". IMSLP work page.",
        "href": "https://imslp.org/wiki/Die_Jahreszeiten,_Hob.XXI:3_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, The Fire of Rome — VISUAL ARTWORK",
        "excerpt": "Hubert Robert imagines the great conflagration of 64 AD as a wall of flame swallowing the classical city, its columns and monuments silhouetted against a furnace-red sky. Panicked figures scatter in the foreground as smoke boils upward and the architecture itself seems to dissolve into fire. Painted in 1785, it is a sublime vision of humankind dwarfed and undone by the burning of a city.",
        "source": "Hubert Robert (1733-1808), L'incendie de Rome (The Fire of Rome, 18 July 64 AD), 1785, oil on canvas, Musée des Beaux-Arts André Malraux, Le Havre. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Robert,_Hubert_-_Incendie_%C3%A0_Rome_-.jpg",
        "image": {
          "src": "/covers/greece-wildfire-deadly--art.png",
          "alt": "A painting of the ancient city of Rome engulfed in flames, with panicked figures fleeing as buildings burn against a red sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "scotus-cellphone-location-privacy",
    "headline": "US Supreme Court rules cellphone location data is protected by the Fourth Amendment",
    "overview": "The US Supreme Court ruled 6-3 that police accessing a person's cellphone location history is a search under the Fourth Amendment, even when the data is held by a third-party company such as Google. Writing for the majority, Justice Elena Kagan said people have a reasonable expectation of privacy in records of where their phones have been, sharply limiting the use of 'geofence' warrants.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxPdnVnWktZSmNZWlJ4YU9XVXd4WEJIbXlvR3JXTm05dllGTVU0TXgzYXNBLW9JSTRtSnQ1WTJIVkE1czluWVpZQUVqR1JLSDVmTGZrLU9VV19XTURTdEI3TnlDTW43MUNOUXl3OHB3dnViV2l2cHdMbzZWLTBvS1hrajUwWFVPZ3BJdXdJMWVVUmRyVWJyVWtyeU9HZWtiWTE3THJQLVhhNC13Zw?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/Politics/supreme-court-limits-geofence-warrants-amid-cellphone-data/story?id=134314228"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/scotus-cellphone-location-privacy.png",
      "alt": "The United States Supreme Court building in Washington, D.C.",
      "credit": "ABC News"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Fourth Amendment to the United States Constitution (1791)",
        "excerpt": "The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause, supported by Oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.",
        "source": "Bill of Rights, Amendment IV (ratified 1791). Transcription, U.S. National Archives, \"The Bill of Rights: A Transcription.\"",
        "href": "https://www.archives.gov/founding-docs/bill-of-rights-transcript"
      },
      {
        "category": "historical",
        "title": "Jeremy Bentham, Panopticon; or, The Inspection-House (1787)",
        "excerpt": "the more constantly the persons to be inspected are under the eyes of the persons who should inspect them, the more perfectly will the purpose of the establishment have been attained... the next thing to be wished for is, that... he should conceive himself to be so.",
        "source": "Jeremy Bentham, Panopticon; or, The Inspection-House (written 1787), Letter I. Text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Panopticon_or_the_Inspection-House"
      },
      {
        "category": "literary",
        "title": "George Orwell, Nineteen Eighty-Four (1949)",
        "excerpt": "Orwell's citizens live under the telescreen, a two-way device that watches and listens as it broadcasts, so that no gesture or movement is ever certainly private. Winston Smith learns to assume that any sound or motion may be scrutinized and any record of his whereabouts kept. The novel gave the modern world its enduring image of total surveillance: a watchful authority that need not always be looking, so long as you can never know that it is not.",
        "source": "George Orwell, Nineteen Eighty-Four (Secker & Warburg, 1949). Described here (in copyright); see reference: Wikipedia, \"Telescreen.\"",
        "href": "https://en.wikipedia.org/wiki/Telescreen"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, \"The Tell-Tale Heart\" (1843)",
        "excerpt": "I think it was his eye! yes, it was this! He had the eye of a vulture—a pale blue eye, with a film over it. Whenever it fell upon me, my blood ran cold; and so by degrees—very gradually—I made up my mind to take the life of the old man, and thus rid myself of the eye for ever.",
        "source": "Edgar Allan Poe, \"The Tell-Tale Heart\" (1843), in Poe's Tales of Mystery and Imagination. Text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Poe's_Tales_of_Mystery_and_Imagination/The_Tell-Tale_Heart"
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Symphony No. 5 in C minor, Op. 67 (1808) — MUSIC",
        "excerpt": "Beethoven's Fifth opens with four hammered notes that his biographer described as fate knocking at the door, an inescapable presence that returns again and again across the work. The motif stalks the listener, refusing to be left behind, a relentless force that pursues and will not release its grip. It is music of being followed and marked, then finally struggling toward the light against a power that never stops watching.",
        "source": "Ludwig van Beethoven, Symphony No. 5 in C minor, Op. 67 (composed 1804-1808). Scores at the International Music Score Library Project (IMSLP).",
        "href": "https://imslp.org/wiki/Symphony_No.5,_Op.67_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Jacopo Pontormo, Supper at Emmaus (1525) — VISUAL ARTWORK",
        "excerpt": "Pontormo's altarpiece shows Christ revealed to his disciples at a supper table, and hovering above the scene is a single all-seeing Eye of Providence set within a radiant triangle. The disembodied eye gazes down upon every figure, a watchful authority that sees into the private gathering below. Painted for a Florentine monastery, it renders the ancient conviction that no act, however hidden, escapes an ever-present observer.",
        "source": "Jacopo Pontormo, Supper at Emmaus (Cena in Emmaus), 1525, oil on canvas, Uffizi Gallery, Florence. Via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Pontormo_-_Cena_in_Emmaus_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/scotus-cellphone-location-privacy--art.png",
          "alt": "A Renaissance painting of Christ at a supper table with disciples, watched from above by an all-seeing eye inside a glowing triangle.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "nike-china-turnaround",
    "headline": "Nike beats forecasts but warns its turnaround will run into 2027 as China sales fall 12%",
    "overview": "Nike beat Wall Street forecasts for its fourth quarter but warned that its turnaround would stretch into fiscal 2027 as sales in Greater China fell about 12%. Chief executive Elliott Hill said the recovery was taking longer than expected even as the company insisted its direction was clear.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxOWnNzWkdGLVk5dVdwM0ZUQ3RObWpYSkdGNnhsc1JuMFhWeXBtT1pSS3luR3UxcVNEcTVTM0tCdFRTSHlYQVNZTGFkQXIzeldDUV91djhzbFN1dWZyOWVKOHVrbGFpcy1rRkYxd3dTTzNKMjdTcFN6OFVSVk5iX3ZhU2tULVpzR1RfdVpEcXFkUFZ4ZlFYT01EY1VvNlR3dDBG?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/06/30/nike-nke-q4-2026-earnings.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/nike-china-turnaround.png",
      "alt": "A Nike retail store frontage.",
      "credit": "CNBC"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Croesus on the Pyre: the Richest King Brought Low",
        "excerpt": "Croesus was already on the pile, when it entered his mind in the depth of his woe that there was a divine warning in the words which had come to him from the lips of Solon, \"No one while he lives is happy.\" When this thought smote him he fetched a long breath, and breaking his deep silence, groaned out aloud, thrice uttering the name of Solon.",
        "source": "Herodotus, The Histories, Book 1 (Clio), section 1.86, trans. George Rawlinson.",
        "href": "https://www.parstimes.com/history/herodotus/persian_wars/clio.html"
      },
      {
        "category": "historical",
        "title": "Napoleon's Retreat from Moscow, 1812",
        "excerpt": "The seemingly invincible emperor entered Moscow in triumph, only to find a burned and emptied city that offered no victory to hold. The long march home through snow and hunger destroyed the Grande Armee, turning the greatest conqueror of the age into a fugitive. The disaster shattered the myth of his invincibility and began the unraveling of his empire, a recovery he would never complete.",
        "source": "\"Napoleonic Wars: The retreat from Moscow,\" Encyclopaedia Britannica.",
        "href": "https://www.britannica.com/event/Napoleonic-Wars/The-retreat-from-Moscow"
      },
      {
        "category": "literary",
        "title": "Milton, Samson Agonistes: \"Eyeless in Gaza\"",
        "excerpt": "Ask for this great Deliverer now, and find him / Eyeless in Gaza at the Mill with slaves, / Himself in bonds under Philistian yoke;",
        "source": "John Milton, Samson Agonistes (1671), lines 40-42. The John Milton Reading Room, Dartmouth College.",
        "href": "https://milton.host.dartmouth.edu/reading_room/samson/drama/text.shtml"
      },
      {
        "category": "literary",
        "title": "Boethius, The Consolation of Philosophy: the Wheel of Fortune",
        "excerpt": "What! art thou verily striving to stay the swing of the revolving wheel? Oh, stupidest of mortals, if it takes to standing still, it ceases to be the wheel of Fortune.",
        "source": "Boethius, The Consolation of Philosophy, Book II (\"Fortune's Malice\"), trans. H. R. James (1897). Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Consolation_of_Philosophy_(James)/Fortune%27s_Malice"
      },
      {
        "category": "artistic",
        "title": "Handel, Judas Maccabaeus: \"See, the Conqu'ring Hero Comes\" — MUSIC",
        "excerpt": "Handel's oratorio culminates in a chorus of pure, hard-won triumph, greeting the returning champion with a procession that has become the anthem of victory itself. Written to celebrate a hero's homecoming after a long and costly campaign, the music captures the moment when struggle finally gives way to acclaim. Its stately, marching jubilation makes it the definitive musical portrait of triumph earned rather than assumed.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63 (1746), Act III, No. 35, \"See, the conqu'ring hero comes.\" IMSLP.",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Winged Victory of Samothrace — VISUAL ARTWORK",
        "excerpt": "The goddess Nike alights on the prow of a ship, wings still beating and drapery pressed against her by the sea wind, caught in the instant of announcing victory. Carved around 190 BC, she is headless and armless yet radiates unstoppable forward motion and triumphant power. She stands as the ancient world's supreme image of victory in mid-flight, the very goddess whose name the modern brand bears.",
        "source": "Winged Victory of Samothrace (Nike of Samothrace), Hellenistic marble, c. 190 BC, Musee du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Louvre_-_Winged_Victory_of_Samothrace.jpg",
        "image": {
          "src": "/covers/nike-china-turnaround--art.png",
          "alt": "The headless, winged marble statue of the goddess Nike standing on a ship's prow at the Louvre.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "uk-military-spending-boost",
    "headline": "UK unveils a 15 billion pound defence boost as critics say it falls short",
    "overview": "Britain unveiled a 15 billion pound ($20 billion) boost to defence spending, centred on drones, uncrewed submarines and new stealth fighter jets, as part of a plan to spend nearly 300 billion pounds over four years. Critics said the increase falls short of what a more dangerous world demands, noting it stops short of committing to 3% of GDP by 2030.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijAFBVV95cUxPUjQtSlZLeE9Cd3ZVbmpPQnJFb0UxRnJ2MndBTkRaeHNCMlUyUjFEaWFnR1pYdlZTQTN3V21MLVh0b082WTRXeEcyWGdSb3hmNDd3XzlUREpFblU1U3RGV2pEdHJrLXhVTFVMSHE3dU5RRl90MUc5cU9kU0VWbDVzUjdTdV9vZFJxTlBDMA?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/economy/2026/6/30/uks-starmer-announces-300-billion-pound-defence-investment-plan"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/uk-military-spending-boost.png",
      "alt": "British military personnel and equipment.",
      "credit": "Al Jazeera"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Demosthenes rouses Athens against Philip of Macedon (First Philippic)",
        "excerpt": "When, Athenians, will you take the necessary action? What are you waiting for? Until you are compelled, I presume. But what are we to think of what is happening now? For my own part I think that for a free people there can be no greater compulsion than shame for their position. Or tell me, are you content to run round and ask one another, 'Is there any news today?' Could there be any news more startling than that a Macedonian is triumphing over Athenians and settling the destiny of Hellas?",
        "source": "Demosthenes, First Philippic (Philippic 1), section 10, trans. J. H. Vince, Loeb Classical Library (Harvard University Press, 1930). Delivered c. 351 BC.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0070:speech=4:section=10"
      },
      {
        "category": "historical",
        "title": "Vegetius: si vis pacem, para bellum (Epitoma rei militaris)",
        "excerpt": "Igitur qui desiderat pacem, praeparet bellum; qui victoriam cupit, milites inbuat diligenter; qui secundos optat eventus, dimicet arte, non casu.",
        "source": "Publius Flavius Vegetius Renatus, Epitoma rei militaris, Book III, prologue (c. late 4th century AD). Latin text via The Latin Library. The maxim is the origin of the proverb 'si vis pacem, para bellum' ('if you want peace, prepare for war').",
        "href": "https://www.thelatinlibrary.com/vegetius3.html"
      },
      {
        "category": "literary",
        "title": "Alfred, Lord Tennyson — 'The Fleet'",
        "excerpt": "You, you, if you shall fail to understand\nWhat England is, and what her all-in-all,\nOn you will come the curse of all the land,\nShould this old England fall\nWhich Nelson left so great.",
        "source": "Alfred, Lord Tennyson, 'The Fleet' (first printed in The Times, 23 April 1885; collected in Locksley Hall Sixty Years After, Etc., 1886), stanza I.",
        "href": "http://www.telelib.com/authors/T/TennysonAlfred/verse/locksleyhall/fleet.html"
      },
      {
        "category": "literary",
        "title": "Shakespeare — the Bastard's defiance in King John",
        "excerpt": "This England never did nor never shall\nLie at the proud foot of a conqueror\nBut when it first did help to wound itself.\nNow these her princes are come home again,\nCome the three corners of the world in arms\nAnd we shall shock them. Naught shall make us rue,\nIf England to itself do rest but true.",
        "source": "William Shakespeare, The Life and Death of King John, Act 5, Scene 7 (closing speech of Philip the Bastard), c. 1596. Text: Folger Shakespeare Library.",
        "href": "https://www.folger.edu/explore/shakespeares-works/king-john/read/5/7/"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst — 'Mars, the Bringer of War' from The Planets, Op. 32 — MUSIC",
        "excerpt": "Composed on the eve of the First World War (1914-16), the opening movement of Holst's The Planets is a relentless march driven by a hammering 5/4 ostinato that builds from a menacing whisper to a crushing, machine-like climax. It captures the mechanised, inhuman momentum of a nation mobilising for war and has become the archetypal musical sound of gathering conflict. Its inexorable buildup speaks to arms races and the grinding logic of preparedness that no one seems able to halt.",
        "source": "Gustav Holst, The Planets, Op. 32, movement I, 'Mars, the Bringer of War' (composed 1914-16). Work page at IMSLP (International Music Score Library Project).",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens — The Consequences of War — VISUAL ARTWORK",
        "excerpt": "Rubens' great Baroque allegory shows Mars, the god of war, breaking loose in armour with a bloodied sword, dragged onward by the Fury Alecto while Venus strains in vain to hold him back. Beneath his trampling feet lie a book and a lute, the arts and learning crushed by conflict, as a grieving figure of Europe throws up her arms in despair. Painted amid the devastation of the Thirty Years' War, it is a warning about what unleashed war costs a continent, and about the stakes when nations arm.",
        "source": "Peter Paul Rubens, The Consequences of War (Horrors of War), oil on canvas, 1637-1638, Galleria Palatina, Palazzo Pitti, Florence.",
        "href": "https://commons.wikimedia.org/wiki/File:Rubens_-_The_Consequences_of_War.jpg",
        "image": {
          "src": "/covers/uk-military-spending-boost--art.png",
          "alt": "Baroque painting of the armoured god Mars striding forward with a sword while Venus tries to restrain him and allegorical figures of war and grief surround them.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "france-sweden-world-cup",
    "headline": "France beat Sweden 3-0 at the World Cup as Mbappe scores twice",
    "overview": "France beat Sweden 3-0 in the World Cup last 32, with Kylian Mbappe scoring twice and Michael Olise providing two assists in front of more than 80,000 at the New York New Jersey Stadium. Mbappe's brace moved him level with Lionel Messi on six goals in the tournament as France advanced to a last-16 meeting with Paraguay.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQaXduMS13MGdCamhfZUxPQVoteXZ3V1lJcFlHamZ4eUZEVUhZa1FLaERiSU9ZdXVpdTRvUmhLRmh4a1ZEVGVwNU83aWNEZnBxM21yTl90NHVTdy00bWJNb1I5ZXlYR3l0a1hVdmNmRlQzZUJiRmJ2NkJqWlZEam9OYjdlMm5KZmZVMUtlUFlkbGpMTTBneXlzZVRXMzhINmhWbnNaQzd0QV9rb29iNVdTNDVzUHI0TkVoVi1Z?oc=5"
      },
      {
        "name": "ESPN",
        "href": "https://www.espn.com/soccer/story/_/id/49227768/france-sweden-live-world-cup-2026-latest-updates-commentary-score-result"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/france-sweden-world-cup.png",
      "alt": "France players celebrating during their World Cup match against Sweden.",
      "credit": "Al Jazeera"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Persians marvel that Greeks contend for glory, not gold (Herodotus)",
        "excerpt": "The Arcadians answered - 'They are holding the Olympic Games, seeing the athletic sports and the chariot-races.' 'And what,' said the man, 'is the prize for which they contend?' 'An olive-wreath,' returned the others, 'which is given to the man who wins.' On hearing this, Tritantaechmes, the son of Artabanus, uttered a speech which was in truth most noble... Hearing the men say that the prize was not money but a wreath of olive, he could not forbear from exclaiming before them all: 'Good heavens! Mardonius, what manner of men are these against whom thou hast brought us to fight? - men who contend with one another, not for money, but for honour!'",
        "source": "Herodotus, The History of Herodotus, Book VIII.26, trans. George Rawlinson (1858-60), public domain.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_8"
      },
      {
        "category": "historical",
        "title": "Astylus of Croton, thrice victor in the foot-races at Olympia (Pausanias)",
        "excerpt": "The statue of Astylus of Crotona is the work of Pythagoras; this athlete won three successive victories at Olympia, in the short race and in the double race. But because on the two latter occasions he proclaimed himself a Syracusan, in order to please Hiero the son of Deinomenes, the people of Crotona for this condemned his house to be a prison, and pulled down his statue set up by the temple of Lacinian Hera.",
        "source": "Pausanias, Description of Greece, Book VI.13.1, trans. W. H. S. Jones and H. A. Ormerod (Loeb Classical Library, 1918), public domain.",
        "href": "https://en.wikisource.org/wiki/Description_of_Greece_(Jones)/Book_6"
      },
      {
        "category": "literary",
        "title": "Pindar praises the thrice-victorious house and Xenophon's Olympic garlands (Olympian 13)",
        "excerpt": "While I praise a house that has been three times victorious at Olympia, gentle to her own citizens, and hospitable to strangers, I shall recognize prosperous Corinth, the portal of Isthmian Poseidon, glorious in her young men.",
        "source": "Pindar, Olympian Ode 13 (for Xenophon of Corinth, 464 B.C.), trans. Diane Arnson Svarlien, Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=13"
      },
      {
        "category": "literary",
        "title": "Odysseus hurls the discus past every mark at the Phaeacian games (Odyssey)",
        "excerpt": "He spoke, and, leaping up with his cloak about him as it was, seized a discus larger than the rest and thick, no little heavier than those with which the Phaeacians were wont to contend one with another. This with a whirl he sent from his stout hand, and the stone hummed as it flew; and down they crouched to the earth, the Phaeacians of the long oars, men famed for their ships, beneath the rush of the stone. Past the marks of all it flew, speeding lightly from his hand, and Athena, in the likeness of a man, set the mark, and she spoke and addressed him.",
        "source": "Homer, The Odyssey, Book VIII, trans. S. H. Butcher and A. Lang (1879), Perseus Digital Library, public domain.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book=8:card=165"
      },
      {
        "category": "artistic",
        "title": "Handel, Alexander's Feast, or the Power of Musick, HWV 75 — MUSIC",
        "excerpt": "Handel's 1736 ode, set to Dryden's verse, stages a victory banquet for Alexander the Great in which the musician Timotheus rouses the conqueror through waves of feeling toward the exultation of triumph. Trumpets, choruses, and driving choral fugues make audible the roar of a crowd exalting its hero. It is Baroque music at its most celebratory, a monument to glory won and hailed.",
        "source": "George Frideric Handel, Alexander's Feast, or the Power of Musick, HWV 75 (1736), libretto after John Dryden. IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Alexander's_Feast,_HWV_75_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Black-figure Panathenaic amphora with runners in the foot-race, ca. 530 BC — VISUAL ARTWORK",
        "excerpt": "On this Attic black-figure prize amphora of about 530 BC, four bearded athletes are frozen at full sprint, legs scissoring and arms pumping as they surge across the field. Such vases, filled with sacred olive oil, were the trophies awarded to victors of the Panathenaic footraces in Athens. The image distills the antique thrill of the race and the champion breaking clear of the pack.",
        "source": "Attic black-figure Panathenaic prize amphora depicting runners, ca. 530 BC, Staatliche Antikensammlungen, Munich. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Greek_vase_with_runners_at_the_panathenaic_games_530_bC.jpg",
        "image": {
          "src": "/covers/france-sweden-world-cup--art.png",
          "alt": "An ancient Greek black-figure vase showing four bearded athletes running in a foot-race.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "venezuela-earthquake-rescue",
    "headline": "Three-year-old pulled alive from rubble six days after Venezuela earthquake as US sends 900 personnel",
    "overview": "A three-year-old was pulled alive from the rubble and taken to hospital six days after a powerful earthquake struck Venezuela, as rescuers pressed on through aftershocks. The United States said it had deployed more than 900 personnel to help with the earthquake response.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c1jykwk8n18o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxPSENIWDQtZWZzZE9SenJGVU5xWE0tYS1pQUN4SGFkZ0xCYUdET29ON1pwSWppaEdMZW5yZnJKVXlBTENHTXV5RFVUV3NURURydmxIVTc1UTZ6bnpXa0dOTlVITkVmQzBaOFdwZFBfZ1hqNGR3Vlk0YUNWeHE0QTlJRVRQZUVfRGlMejl6QnNzdmg5VGdGUi1WVS1xV1Fwc3VYTjI5d0hSQzFjRHp4X21uYzR5a2JOUC1ENTI0?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/venezuela-earthquake-rescue.png",
      "alt": "Rescue workers searching earthquake rubble in Venezuela.",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Younger on the shaking earth at Misenum (AD 79)",
        "excerpt": "The chariots, which we had ordered to be drawn out, were so agitated backwards and forwards, though upon the most level ground, that we could not keep them steady, even by supporting them with large stones. The sea seemed to roll back upon itself, and to be driven from its banks by the convulsive motion of the earth; it is certain at least the shore was considerably enlarged, and several sea animals were left upon it.",
        "source": "Pliny the Younger, Letters, Book 6, Letter 20 (to Tacitus), trans. William Melmoth, describing the eruption of Vesuvius and earthquakes at Misenum, AD 79.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Plin.+Ep.+6.20"
      },
      {
        "category": "historical",
        "title": "The Reverend Charles Davy inside the Lisbon earthquake (1755)",
        "excerpt": "The house I was in shook with such violence, that the upper stories immediately fell; and though my apartment (which was the first floor) did not then share the same fate, yet everything was thrown out of its place in such a manner that it was with no small difficulty I kept my feet, and expected nothing less than to be soon crushed to death, as the walls continued rocking to and fro in the frightfulest manner, opening in several places; large stones falling down on every side from the cracks, and the ends of most of the rafters starting out from the roof.",
        "source": "Rev. Charles Davy, eyewitness account of the Lisbon earthquake of 1 November 1755, from Letters Addressed to a Young Gentleman upon Subjects of Literature (London, 1787).",
        "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp"
      },
      {
        "category": "literary",
        "title": "Voltaire, Candide — the earth trembles under their feet",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, Candide, ou l'Optimisme (1759), Chapter V, English translation, Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "literary",
        "title": "Psalm 40 — brought up out of the pit",
        "excerpt": "I waited patiently for the LORD; and he inclined unto me, and heard my cry. He brought me up also out of an horrible pit, out of the miry clay, and set my feet upon a rock, and established my goings. And he hath put a new song in my mouth, even praise unto our God: many shall see it, and fear, and shall trust in the LORD.",
        "source": "The Bible, King James Version (1611), Psalm 40, verses 1-3.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, The Seven Last Words of Our Saviour on the Cross — 'Il terremoto' — MUSIC",
        "excerpt": "Haydn's meditation on the crucifixion, composed in 1786, closes with a movement unlike anything before it: 'Il terremoto,' The Earthquake. After seven slow, hushed sonatas, the orchestra erupts into a Presto e con tutta la forza, driven strings and stabbing chords culminating in the work's only triple-forte, an evocation of the ground itself splitting apart. It renders in sound the moment when the earth quakes and rocks are rent, disaster followed at last by awe.",
        "source": "Joseph Haydn, Die Worte des Erlösers am Kreuze (The Seven Last Words of Our Saviour on the Cross), Hob.XX:1, orchestral version, final movement 'Il terremoto' (composed 1786).",
        "href": "https://imslp.org/wiki/Die_Worte_des_Erl%C3%B6sers_am_Kreuze,_Hob.XX:1_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Karl Bryullov, The Last Day of Pompeii — VISUAL ARTWORK",
        "excerpt": "Bryullov's vast 1830-1833 canvas freezes a city in the instant of its destruction: columns snap and topple, statues pitch from their pedestals, and a blood-red sky of ash presses down on the fleeing crowd. Amid the terror the painter fills the foreground with acts of tenderness, sons carrying an aged father, a mother clutching her children, a fallen woman shielding her infant, showing mercy and love persisting even as the ground gives way. It made Bryullov the first Russian painter to win an international reputation.",
        "source": "Karl Bryullov, The Last Day of Pompeii, oil on canvas, 1830-1833, State Russian Museum, St. Petersburg.",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/venezuela-earthquake-rescue--art.png",
          "alt": "A crowd flees through a collapsing ancient city as statues topple and a red sky of ash and fire looms overhead.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "scotus-birthright-citizenship",
    "headline": "US Supreme Court upholds birthright citizenship, rejecting Trump's bid to restrict it",
    "overview": "The US Supreme Court upheld the constitutional guarantee of birthright citizenship, rejecting the Trump administration's attempt to deny automatic citizenship to children born on US soil to certain non-citizen parents. The ruling leaves the longstanding reading of the Fourteenth Amendment's Citizenship Clause intact.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPeHFHR0ZCdDJuOUJjckJLaWRDcGc4a2xQb3lyM3lnZE9pbFVibF8xeHVxanl1VGF3Tnd1a29IVkpIUHNoTjR2WV9Uc1doeDQ0LWNabVV3MmZmM3luSk94MEo1RXdnSkx1cDdPTDMwNmdvWkZNNlRRX043SUpqTnA1MXdSZFpnOW1FQVVoQnZRazFPdFk5MFBOOVRXTVlrY2MzUmdtQ3JTb1Z0SEduczZxTEpqRDY?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/Politics/faq-birthright-citizenship-ahead-supreme-courts-ruling/story?id=134215675"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/scotus-birthright-citizenship.png",
      "alt": "The United States Supreme Court building in Washington, D.C., at dusk.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "United States v. Wong Kim Ark (1898)",
        "excerpt": "A child born in the United States, of parents of Chinese descent, who, at the time of his birth, are subjects of the Emperor of China, but have a permanent domicil and residence in the United States, and are there carrying on business, and are not employed in any diplomatic or official capacity under the Emperor of China, becomes at the time of his birth a citizen of the United States, by virtue of the first clause of the Fourteenth Amendment.",
        "source": "Supreme Court of the United States, United States v. Wong Kim Ark, 169 U.S. 649 (1898), Wikisource",
        "href": "https://en.wikisource.org/wiki/United_States_v._Wong_Kim_Ark"
      },
      {
        "category": "historical",
        "title": "The Fourteenth Amendment's Citizenship Clause (1868)",
        "excerpt": "All persons born or naturalized in the United States, and subject to the jurisdiction thereof, are citizens of the United States and of the State wherein they reside.",
        "source": "14th Amendment to the U.S. Constitution (1868), Section 1, U.S. National Archives, Milestone Documents",
        "href": "https://www.archives.gov/milestone-documents/14th-amendment"
      },
      {
        "category": "literary",
        "title": "Emma Lazarus, \"The New Colossus\" (1883)",
        "excerpt": "\"Keep, ancient lands, your storied pomp!\" cries she\nWith silent lips. \"Give me your tired, your poor,\nYour huddled masses yearning to breathe free,\nThe wretched refuse of your teeming shore.\nSend these, the homeless, tempest-tost to me,\nI lift my lamp beside the golden door!\"",
        "source": "Emma Lazarus, \"The New Colossus\" (1883), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_New_Colossus"
      },
      {
        "category": "literary",
        "title": "Edward Everett Hale, \"The Man Without a Country\" (1863)",
        "excerpt": "Damn the United States! I wish I may never hear of the United States again!",
        "source": "Edward Everett Hale, \"The Man Without a Country\" (1863), Project Gutenberg ebook #16493",
        "href": "https://www.gutenberg.org/cache/epub/16493/pg16493.txt"
      },
      {
        "category": "artistic",
        "title": "\"The Star-Spangled Banner\" (music by John Stafford Smith) — MUSIC",
        "excerpt": "The national anthem whose melody (originally \"The Anacreontic Song\") and Francis Scott Key's words bind a people to a single flag and homeland. Its swelling, triumphant cadence is the sound of national belonging itself — fitting for a ruling that reaffirms who is counted as American from the moment of birth. IMSLP hosts the original scores and dozens of arrangements in the public domain.",
        "source": "The Star-Spangled Banner (Smith, John Stafford), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Star-Spangled_Banner_(Smith,_John_Stafford)"
      },
      {
        "category": "artistic",
        "title": "Edward Moran, \"Unveiling the Statue of Liberty Enlightening the World\" (1886) — VISUAL ARTWORK",
        "excerpt": "Edward Moran's luminous 1886 oil painting depicts New York Harbor crowded with ships flying French and American flags as gun-smoke rolls across the island and Liberty rises clear above it all, torch lifted to the sky. As the \"Mother of Exiles\" welcoming newcomers to her shores, the image embodies the nation's self-understanding as a country defined by those it receives and claims as its own — the very promise affirmed when the Court left birthright citizenship intact.",
        "source": "Edward Moran (1829–1901), \"Unveiling the Statue of Liberty Enlightening the World\" (1886), Museum of the City of New York; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:EdwardMoran-UnveilingTheStatueofLiberty1886Large.jpg",
        "image": {
          "src": "/covers/scotus-birthright-citizenship--art.png",
          "alt": "Edward Moran's 1886 painting of New York Harbour crowded with ships and gunsmoke as the Statue of Liberty is unveiled, torch lifted to the sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "scotus-transgender-school-sports",
    "headline": "US Supreme Court upholds state laws barring transgender girls and women from female school sports",
    "overview": "The US Supreme Court upheld state laws that bar transgender girls and women from competing on female school and college sports teams, a victory for conservative states. The decision affects athletes in more than two dozen states with similar bans and turns on questions of fairness, sex and inclusion in competition.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxQZ0k5Vmc2S1lZU2JqQXR1SDVRZEVUMnRsUEFCVm14SmI3VTNramx5bEhqeEpIQVlDdjdsa0ZTQjBCaE9nRjRNMS10Yk5sNll3RzJBN2VlbFNyVHRzek4wcUtHVGVucEVJMXhsQUVabHBraGc3dDFyd1VndnN3SEpyMzc5aGJjSkFrMkVaU0NkRUVnVXQtQVdLMHFITmliYU5aS19LanVuSDJZT0U?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/politics/supreme-court-upholds-state-laws-banning-transgender-girls-and-women-from-school-sports"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/scotus-transgender-school-sports.png",
      "alt": "An empty outdoor running track with starting blocks under stadium floodlights at dusk.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Law of Mount Typaeum: Women Barred from Olympia",
        "excerpt": "It is a law of Elis to cast down it any women who are caught present at the Olympic games, or even on the other side of the Alpheius, on the days prohibited to women. However, they say that no woman has been caught, except Callipateira only; some, however, give the lady the name of Pherenice and not Callipateira.",
        "source": "Pausanias, Description of Greece 5.6.7, trans. W. H. S. Jones (1918), Wikisource",
        "href": "https://en.wikisource.org/wiki/Description_of_Greece_(Jones)/Book_5"
      },
      {
        "category": "historical",
        "title": "The Heraea: A Separate Footrace for Maidens",
        "excerpt": "Every fourth year there is woven for Hera a robe by the Sixteen women, and the same also hold games called Heraea. The games consist of foot-races for maidens. These are not all of the same age. The first to run are the youngest; after them come the next in age, and the last to run are the oldest of the maidens. They run in the following way: their hair hangs down, a tunic reaches to a little above the knee, and they bare the right shoulder as far as the breast. These too have the Olympic stadium reserved for their games, but the course of the stadium is shortened for them by about one-sixth of its length.",
        "source": "Pausanias, Description of Greece 5.16.2-3, trans. W. H. S. Jones (1918), Wikisource",
        "href": "https://en.wikisource.org/wiki/Description_of_Greece_(Jones)/Book_5"
      },
      {
        "category": "literary",
        "title": "Atalanta's Footrace: The Condition of the Game",
        "excerpt": "I am not to be had (quoth shee) onlesse yee able bee In ronning for to vanquish mee. Yee must contend with mee In footemanshippe. And who so winnes the wager, I agree To bee his wife. But if that he bee found too slowe, then hee Shall lose his head.",
        "source": "Ovid, Metamorphoses, Book 10, trans. Arthur Golding (1567), Wikisource",
        "href": "https://en.wikisource.org/wiki/Metamorphoses_(tr._Golding)/Book_10"
      },
      {
        "category": "literary",
        "title": "The Rules of the Race: Atalanta and the Golden Apples",
        "excerpt": "she went away to a place that might serve as a racecourse, and, having planted a stake three cubits high in the middle of it, she caused her wooers to race before her from there, and ran herself in arms; and if the wooer was caught up, his due was death on the spot, and if he was not caught up, his due was marriage. When many had already perished, Melanion came to run for love of her, bringing golden apples from Aphrodite, and being pursued he threw them down, and she, picking up the dropped fruit, was beaten in the race.",
        "source": "Apollodorus, The Library 3.9.2, trans. J. G. Frazer (1921), ToposText",
        "href": "https://topostext.org/work/150"
      },
      {
        "category": "artistic",
        "title": "Glazunov, Triumphal March, Op. 40 (1892) — MUSIC",
        "excerpt": "Glazunov wrote this grand march for chorus and orchestra to crown a great public contest of nations at the 1893 Chicago World's Columbian Exposition. Its blazing brass and ceremonial pomp embody the ancient idea of victory celebrated before a watching crowd, a fitting echo of a courtroom and a culture still arguing over who may stand on the winners' podium and under what rules.",
        "source": "Aleksandr Glazunov, Triumphal March, Op. 40 (1892-93), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Triumphal_March,_Op.40_(Glazunov,_Aleksandr)"
      },
      {
        "category": "artistic",
        "title": "Guido Reni, Atalanta and Hippomenes (c. 1620-25) — VISUAL ARTWORK",
        "excerpt": "Reni freezes the decisive instant of the contest: Atalanta bends to snatch a golden apple while Hippomenes surges past, his cloak streaming, the rules of the race bent by a trick. The two near-nude figures form an elegant, almost balletic X across the dark ground, dramatizing how a single condition placed on a competition can decide who wins and who is left behind, a tension at the heart of the modern fight over fairness in sport.",
        "source": "Guido Reni, Atalanta and Hippomenes (c. 1620-25), Museo di Capodimonte, Naples; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Guido_Reni_-_Atalanta_and_Hippomenes_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/scotus-transgender-school-sports--art.png",
          "alt": "Guido Reni's painting Atalanta and Hippomenes, two nude runners crossing the dark canvas as Atalanta stoops for a golden apple.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "monaco-bomb-ukrainian-tycoon",
    "headline": "Manhunt under way after a bomb in Monaco injures a Ukrainian-born tycoon",
    "overview": "A bomb blast in Monaco injured three people, including a Ukrainian-born oligarch, prompting a manhunt after the suspected attacker fled across the border into France, authorities said. The targeted bombing shook the principality, a haven for the global wealthy.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNRkFtOEk3cmZwQUNRT2MxT0ctUDB3Z1JKSWhCQmtGd2tjdjdHb0J6b0U3aEdORlZ5TERrYjRpTDljVFMyTUkxTVpjelJQWk02dUViem1TMzJOQnVQSm5VdVM2eG5Qbkp1alNneHlTWExCVDkzamhGUFVaRmVETlBoOUlPY0JMUWl6Qk5pYXh1LV9VRWhUTlZ1ZA?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/monaco-explosion-ukraine-victim/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/monaco-bomb-ukrainian-tycoon.png",
      "alt": "The harbour and high-rise skyline of Monaco on the Mediterranean coast.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Assassination of Julius Caesar",
        "excerpt": "It was Casca who gave him the first blow with his dagger, in the neck, not a mortal wound, nor even a deep one, for which he was too much confused, as was natural at the beginning of a deed of great daring; so that Caesar turned about, grasped the knife, and held it fast.",
        "source": "Plutarch, Life of Caesar, ch. 66, trans. Bernadotte Perrin (1919), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0244%3Achapter%3D66"
      },
      {
        "category": "historical",
        "title": "Emma Goldman on Political Violence and 'Propaganda of the Deed'",
        "excerpt": "Such acts are the violent recoil from violence, whether aggressive or repressive; they are the last desperate struggle of outraged and exasperated human nature for breathing space and life.",
        "source": "Emma Goldman, 'The Psychology of Political Violence' (1911), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Psychology_of_Political_Violence"
      },
      {
        "category": "literary",
        "title": "Joseph Conrad, The Secret Agent",
        "excerpt": "\"You used a shovel,\" he remarked, observing a sprinkling of small gravel, tiny brown bits of bark, and particles of splintered wood as fine as needles.",
        "source": "Joseph Conrad, The Secret Agent (1907), Chapter 5, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Secret_Agent/Chapter_5"
      },
      {
        "category": "literary",
        "title": "Fyodor Dostoevsky, The Possessed (Demons)",
        "excerpt": "Every member of the society spies on the others, and it's his duty to inform against them. Every one belongs to all and all to every one.",
        "source": "Fyodor Dostoevsky, The Possessed, Part II, Chapter VIII 'Ivan the Tsarevitch', trans. Constance Garnett, AmericanLiterature.com",
        "href": "https://americanliterature.com/author/fyodor-dostoevsky/book/the-possessed/chapter-viii-ivan-the-tsarevitch"
      },
      {
        "category": "artistic",
        "title": "Mussorgsky, Night on Bald Mountain — MUSIC",
        "excerpt": "Mussorgsky's tone poem unleashes a churning, demonic orchestral storm — a witches' sabbath of menace, sudden detonations of brass and roaring strings that erupt out of darkness. Its atmosphere of conspiracy gathering in the night and bursting into violent chaos mirrors the dread of a targeted bombing that shatters a supposed haven of calm.",
        "source": "Modest Mussorgsky, Night on Bald Mountain (1867), public-domain scores at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Night_on_Bald_Mountain_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "The Assassination of Alexander II, 1881 — VISUAL ARTWORK",
        "excerpt": "This 1881 illustrated print depicts the bomb attack that killed Tsar Alexander II on a St. Petersburg street, the carriage wrecked and bodies strewn amid smoke and debris from the explosion. As one of the first modern terrorist bombings, it captures the same shock as the Monaco blast: sudden, premeditated violence striking down a powerful figure in a public place.",
        "source": "A. Baldinger, 'The assassination of Alexander II of Russia on March 1, 1881', Vsemirnaya Illyustratsia (1881), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_assassination_of_Alexander_II_of_Russia_on_March_1_1881.jpg",
        "image": {
          "src": "/covers/monaco-bomb-ukrainian-tycoon--art.png",
          "alt": "An 1881 illustrated print of the bomb attack that killed Tsar Alexander II, his wrecked carriage and figures strewn amid smoke on a St Petersburg street.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "ukraine-dubna-second-strike",
    "headline": "Ukraine strikes a site in Russia's Dubna for a second time, Zelensky says",
    "overview": "Ukraine struck a site in Dubna, north of Moscow, for a second time, President Volodymyr Zelensky said, in the latest deep long-range drone attack on Russian territory. Russia has acknowledged that Ukrainian strikes are causing fuel shortages as Kyiv reaches ever farther behind the front lines.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxQeUxTaWVPX2Z0bm04b1RSNkd0bkF5NGNhQnY3cW1jNXZxdE9SWU9EZGhFSnZINkFHM0hfU2xPbVc0bzBrblVCOVF2TS05MjBYT1Q0RlZCVGh4Z2YwcFVoVHdLVEcyU0J0dUs2bkt3MHZ5dU1aWmpRV3BvMUdybXVaaEtwSWR1SjFWalJkLXBLUFZWd3NCc0VNMFRvcWxsZlRSM0p1U01hSjNkaGlEanJqcUNYOG1RMHVNU1o3Ymh0Z0ZlbmE0czVfX01OSQ?oc=5"
      },
      {
        "name": "Washington Examiner",
        "href": "https://www.washingtonexaminer.com/news/4630094/ukrainian-drones-strike-russian-space-communications-center-in-moscow-region/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/ukraine-dubna-second-strike.png",
      "alt": "An industrial complex burning bright orange against the night sky.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Darius's long march against the distant Scythians",
        "excerpt": "For this Dareios wished to take vengeance upon them, and was gathering together an army to go against them.",
        "source": "Herodotus, The History, Book IV.4 (trans. G. C. Macaulay), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "historical",
        "title": "David and Goliath: the smaller power fells the giant",
        "excerpt": "So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "1 Samuel 17:50, Bible (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "Tennyson, \"The Charge of the Light Brigade\"",
        "excerpt": "Cannon to right of them, / Cannon to left of them, / Cannon in front of them / Volley'd and thunder'd;",
        "source": "Alfred, Lord Tennyson, \"The Charge of the Light Brigade\" (1854), Wikisource",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/The_Charge_of_the_Light_Brigade"
      },
      {
        "category": "literary",
        "title": "Wilfred Owen, \"Dulce et Decorum Est\"",
        "excerpt": "Drunk with fatigue; deaf even to the hoots / Of gas-shells dropping softly behind.",
        "source": "Wilfred Owen, \"Dulce et Decorum Est,\" Poems (1920), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1034/1034-h/1034-h.htm"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture, Op. 49 — MUSIC",
        "excerpt": "Tchaikovsky's festival overture stages an invader reaching deep into Russian territory, building from a solemn hymn to roaring cannon fire and pealing bells. Its very subject is a powerful foe striking far behind the lines and the convulsive response that follows. The clash of distant menace and home-front alarm mirrors drones reaching hundreds of kilometers past the front toward Moscow.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 (1880), full orchestral score, IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, \"David and Goliath\" — VISUAL ARTWORK",
        "excerpt": "Caravaggio's tenebrous canvas shows the boy David binding the head of the felled giant, a single decisive blow having toppled a vastly larger adversary. The dramatic chiaroscuro makes the asymmetry visceral: small hands, immense consequence. It resonates with a smaller power reaching past the front to strike a far more massive foe deep in its own territory.",
        "source": "Caravaggio (Michelangelo Merisi), David and Goliath, c. 1600, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David_and_Goliath_by_Caravaggio.jpg",
        "image": {
          "src": "/covers/ukraine-dubna-second-strike--art.png",
          "alt": "Caravaggio's dark, dramatic painting of the boy David holding the severed head of the giant Goliath.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "europe-heatwave-record-deaths",
    "headline": "Europe's heatwave is linked to about 1,300 deaths as Germany hits a record 41.7C, WHO says",
    "overview": "A severe heatwave across Europe has been linked to roughly 1,300 deaths, the World Health Organization said, as Germany recorded its highest-ever temperature of 41.7C. Health officials warned that the elderly and other vulnerable people are most at risk as extreme heat intensifies.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn4d2vv935lo?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/29/more-than-1300-deaths-in-europe-amid-heatwave-what-can-countries-do"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/europe-heatwave-record-deaths.png",
      "alt": "A sun-scorched, near-empty European city square shimmering in extreme heat.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Phaethon scorches the earth in Ovid's Metamorphoses",
        "excerpt": "Great cities perish with their walls, and peopled nations are consumed to dust—",
        "source": "Ovid, Metamorphoses, Book 2 (trans. Brookes More), hosted at Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D2%3Acard%3D227"
      },
      {
        "category": "historical",
        "title": "The great drought and famine in the days of Elijah (1 Kings)",
        "excerpt": "And Elijah the Tishbite, who was of the inhabitants of Gilead, said unto Ahab, As the LORD God of Israel liveth, before whom I stand, there shall not be dew nor rain these years, but according to my word.",
        "source": "The Bible (King James Version), 1 Kings 17:1, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings/Chapter_17"
      },
      {
        "category": "literary",
        "title": "The bloody Sun at noon in Coleridge's Ancient Mariner",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon.",
        "source": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner,\" Part II, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "literary",
        "title": "Archibald Lampman's \"Heat\" and the shimmering, droughty noon",
        "excerpt": "From plains that reel to southward, dim, / The road runs by me white and bare; / Up the steep hill it seems to swim / Beyond, and melt into the glare.",
        "source": "Archibald Lampman, \"Heat,\" in Among the Millet and Other Poems (1888), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/12413/12413-h/12413-h.htm"
      },
      {
        "category": "artistic",
        "title": "Vivaldi, \"Summer\" (L'estate) from The Four Seasons — MUSIC",
        "excerpt": "Vivaldi's G minor concerto opens with strings drooping under languid, oppressive heat before erupting into a violent thunderstorm — the composer's own accompanying sonnet describes a shepherd terrified beneath a sun that scorches the land. Its depiction of nature pushed past endurance by summer's blaze makes it an uncanny soundtrack to a heatwave that has overwhelmed Europe and claimed some 1,300 lives.",
        "source": "Antonio Vivaldi, Violin Concerto in G minor, RV 315, \"L'estate\" (1723), from Le quattro stagioni, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Violin_Concerto_in_G_minor,_RV_315_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, Regulus — VISUAL ARTWORK",
        "excerpt": "Turner dissolves a Mediterranean harbour into a blinding white-gold detonation of sunlight, so brilliant it nearly erases the architecture and figures around it. The picture makes light itself a force of suffering, an overwhelming sun that scorches the eye — a fitting image for a heatwave whose blazing skies pushed Germany to a record 41.7C and proved lethal to the vulnerable.",
        "source": "J. M. W. Turner, Regulus (1828, reworked 1837), Tate, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Turner_-_Regulus,_1828,_reworked_1837,_N00519.jpg",
        "image": {
          "src": "/covers/europe-heatwave-record-deaths--art.png",
          "alt": "J. M. W. Turner's painting Regulus, a Mediterranean harbour dissolved in a blinding white-gold blaze of sunlight.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "ghana-accra-flooding-deaths",
    "headline": "Flooding in Ghana's capital Accra kills at least 13, with more storms forecast",
    "overview": "Severe flooding struck Ghana's capital, Accra, killing at least 13 people, with authorities warning of further storms. The city's recurring deadly floods have been blamed on clogged drains, unplanned building and intensifying seasonal rains.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn4r8zlv8edo?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "Africa.com",
        "href": "https://www.africa.com/global-south-world/ghanas-capital-accra-submerged-as-floods-expose-long-running-urban-drainage-crisis"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/ghana-accra-flooding-deaths.png",
      "alt": "A flooded tropical city street at dawn, muddy brown water rising over cars and the steps of low houses.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Flood of Genesis",
        "excerpt": "And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered. And all flesh died that moved upon the earth, both of fowl, and of cattle, and of beast, and of every creeping thing that creepeth upon the earth, and every man:",
        "source": "Bible (King James Version), Genesis 7:19-21, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "historical",
        "title": "The Johnstown Flood of 1889",
        "excerpt": "Away up the Conemaugh came a yellow wall, whose crest was white and frothy. I rushed for the platform of the car, not knowing what I did, and just then the train began to move.",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (1889), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
      },
      {
        "category": "literary",
        "title": "The Deluge in the Epic of Gilgamesh",
        "excerpt": "The raging of a storm in the morning arose, from the horizon of heaven extending and wide / Vul in the midst of it thundered, and / Nebo and Saru went in front; / the throne bearers went over mountains and plains; / the destroyer Nergal overturned; / Ninip went in front, and cast down; / the spirits carried destruction; / in their glory they swept the earth; / of Vul the flood, reached to heaven; / the bright earth to a waste was turned",
        "source": "George Smith (trans.), The Chaldean Account of the Deluge (1872), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Chaldean_Account_of_the_Deluge"
      },
      {
        "category": "literary",
        "title": "Deucalion's Flood in Ovid's Metamorphoses",
        "excerpt": "And now one vast expanse, the land and sea were mingled in the waste of endless waves—a sea without a shore.",
        "source": "Ovid, Metamorphoses Book 1 (Brookes More trans.), Perseus Digital Library, Tufts",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=1:card=253"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Symphony No. 6 'Pastoral', Op. 68, IV. 'Gewitter, Sturm' — MUSIC",
        "excerpt": "Beethoven's fourth movement unleashes a sudden, terrifying thunderstorm: low rumbling cellos and basses swell into shrieking piccolo and crashing timpani as the orchestra depicts torrential rain breaking over a peaceful countryside. Its abrupt violence and the dread of nature turned destructive mirror the way ordinary seasonal rains over Accra escalate into a deadly deluge. The storm's eventual subsiding into calm underscores the cyclical, recurring nature of such catastrophes.",
        "source": "Ludwig van Beethoven, Symphony No. 6 in F major, Op. 68 (1808), IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Francis Danby, 'The Deluge' (c. 1840) — VISUAL ARTWORK",
        "excerpt": "Danby's vast canvas shows humanity engulfed by a cataclysmic flood: figures cling desperately to rocks and floating debris as towering, storm-darkened waves swallow the land beneath a fractured, lightning-torn sky. The painting's overwhelming scale and helpless human figures capture the terror of water rising beyond all control. It resonates with Accra's flooding, where rising waters overwhelm a city and its people are left scrambling for higher ground.",
        "source": "Francis Danby, The Deluge, c. 1840, oil on canvas, Tate Britain (via Wikimedia Commons / Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Francis_Danby_-_The_Deluge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ghana-accra-flooding-deaths--art.png",
          "alt": "Francis Danby's painting The Deluge, tiny figures clinging to rocks as towering waves engulf the land under a storm-torn sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "ubs-million-new-millionaires",
    "headline": "Nearly one million people became millionaires worldwide in 2025, UBS report finds",
    "overview": "Almost one million people joined the ranks of dollar millionaires worldwide in 2025, a UBS wealth report found, as rising asset prices swelled fortunes even amid economic uncertainty. The report underscored a widening gap between the very wealthy and everyone else.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQczdTd1FBWlZNVHJMSERzckFVLWthNFJVeUhUNzdsQ2RIRjRRQW0yT2lFSk5uNEVBWUc5ajhvXzlRb0tNR1lJTklHN09hYVQwQUw1TlotMVVFYU1GVE1JZ0xEMGRrZ0NrdEJRVkJnRVB2QVFMQUlnMVV1WEVtaldZTl9MdURlUWdBd3hEdUdJOWR3VWt1LXJpVHE3YTdlR3haQWR4ZGpSOHFzUzVPWVlUUUlzSmc5LXg2Y01VbXBucjZPenlkQnJR?oc=5"
      },
      {
        "name": "Gulf News",
        "href": "https://gulfnews.com/business/markets/nearly-1-million-new-millionaires-created-in-2025-ubs-says-1.500591623"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/ubs-million-new-millionaires.png",
      "alt": "Gold coins heaped before a glittering city skyline of glass towers at dusk.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Solon Warns Croesus: Count No Man Happy Until He Dies",
        "excerpt": "But in every matter it behoves us to mark well the end: for oftentimes God gives men a gleam of happiness, and then plunges them into ruin.",
        "source": "Herodotus, The Histories, Book 1.32, trans. George Rawlinson (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_1"
      },
      {
        "category": "historical",
        "title": "Carnegie's Gospel of Wealth and the Gulf Between Palace and Cottage",
        "excerpt": "The contrast between the palace of the millionaire and the cottage of the laborer with us to-day measures the change which has come with civilization.",
        "source": "Andrew Carnegie, \"The Gospel of Wealth,\" North American Review, 1889 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Gospel_of_Wealth"
      },
      {
        "category": "literary",
        "title": "Gatsby's Gardens of New Money and Excess",
        "excerpt": "In his blue gardens men and girls came and went like moths among the whisperings and the champagne and the stars.",
        "source": "F. Scott Fitzgerald, The Great Gatsby, 1925 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/64317/pg64317.txt"
      },
      {
        "category": "literary",
        "title": "The Parable of the Rich Fool and His Bigger Barns",
        "excerpt": "But God said unto him, Thou foolish one, this night is thy soul required of thee; and the things which thou hast prepared, whose shall they be?",
        "source": "Gospel of Luke 12:20 (American Standard Version, Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(American_Standard)/Luke"
      },
      {
        "category": "artistic",
        "title": "Wagner, Das Rheingold — The Curse of the Hoarded Gold — MUSIC",
        "excerpt": "Wagner's opera opens at the bottom of the Rhine, where the theft of the river's gold and the renunciation of love to forge a ring of limitless power sets a curse upon all who covet the hoard. Its shimmering, restless motifs render wealth as both intoxicating and ruinous — a fitting overture to a world minting nearly a million new millionaires while the gap between the few and the many widens.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A, 1854 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Klimt, Danaë — The Shower of Gold — VISUAL ARTWORK",
        "excerpt": "In Klimt's golden-period masterpiece, Zeus descends upon the sleeping Danaë as a literal shower of gold, fortune pouring down upon a single fortunate body. The lavish gilding and intimate rapture make wealth itself the seductive subject — an apt emblem for a year in which rising asset prices rained new fortunes on the few.",
        "source": "Gustav Klimt, Danaë, c. 1907–08, Leopold Museum, Vienna (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Gustav_Klimt_010.jpg",
        "image": {
          "src": "/covers/ubs-million-new-millionaires--art.png",
          "alt": "Gustav Klimt's painting Danaë, a sleeping woman bathed in a cascading shower of gold.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "usmca-withdrawal-countdown",
    "headline": "US move to exit USMCA starts a decade-long countdown for the North American trade pact",
    "overview": "A US declaration to withdraw from the US-Mexico-Canada Agreement would trigger a years-long countdown that could unwind the continent's free-trade framework, analysts said, as a key review deadline looms. Businesses across the three economies face fresh uncertainty over tariffs and supply chains.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOd3EyUnplRFp0LW81Mjdic3pGeGpSaWVQRkNSZjRjVGY5THBqMGQzb1NjaERnOVhGWFNZSmFRWmtyWlk3T0dhdWtfWWh1ZUVMbEhUbTNCMzJydklzTWxoNV8yUGFMakx2MklYNXRoaGJfcDliMUFRX1ZwNkstR0EwbGpwakljMWlGRzdlRDhVUHZUMXdXcDM1X19JWk5zNC1oeGRmYzFHYUdfYWRFamc?oc=5"
      },
      {
        "name": "Newsweek",
        "href": "https://www.newsweek.com/trump-official-warns-president-may-leave-his-signature-trade-deal-11156415"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/usmca-withdrawal-countdown.png",
      "alt": "A vast container port at dusk, towering stacks of shipping containers and idle cranes under a brooding sky.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Smoot-Hawley Tariff Act of 1930 and the collapse of world trade",
        "excerpt": "Even before its enactment, U.S. trading partners began retaliating by raising their tariff rates, which froze international trade.",
        "source": "United States Senate, \"The Senate Passes the Smoot-Hawley Tariff\" (Senate Art & History, senate.gov)",
        "href": "https://www.senate.gov/artandhistory/history/minute/Senate_Passes_Smoot_Hawley_Tariff.htm"
      },
      {
        "category": "historical",
        "title": "The rise and decline of the Hanseatic League",
        "excerpt": "The assertion of Hanseatic influence in the two decades, 1356 to 1377, marks the zenith of the League's power and the completion of the long process of unification.",
        "source": "\"Hanseatic League,\" Encyclopædia Britannica (11th ed., 1911), via Wikisource",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hanseatic_League"
      },
      {
        "category": "literary",
        "title": "Adam Smith on the folly of restraining commerce",
        "excerpt": "What is prudence in the conduct of every private family can scarce be folly in that of a great kingdom. If a foreign country can supply us with a commodity cheaper than we ourselves can make it, better buy it of them with some part of the produce of our own industry, employed in a way in which we have some advantage.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, Book IV, Ch. II (1776), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Wealth_of_Nations/Book_IV/Chapter_2"
      },
      {
        "category": "literary",
        "title": "The Bastard on kings who \"break faith upon commodity\" in Shakespeare's King John",
        "excerpt": "Mad world! mad kings! mad composition! ... That smooth-fac'd gentleman, tickling commodity, Commodity, the bias of the world ... Since kings break faith upon commodity, Gain, be my lord, for I will worship thee!",
        "source": "William Shakespeare, The Life and Death of King John, Act II, Scene I (c. 1596), via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1511/pg1511.txt"
      },
      {
        "category": "artistic",
        "title": "François Couperin, \"Les nations\" (1726) — MUSIC",
        "excerpt": "Couperin gathers four trio suites each cast as a sovereign nation — \"La Françoise,\" \"L'Espagnole,\" \"L'Impériale,\" and \"La Piémontoise\" — distinct voices set side by side yet bound into one harmonious whole. The work mirrors a continent of separate economies once knit together by a common framework, now at risk of drifting back into their own keys as the trade pact unwinds.",
        "source": "François Couperin, Les nations: Sonades, & Suites de Simphonies en trio (Paris, 1726), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Les_nations_(Couperin,_Fran%C3%A7ois)"
      },
      {
        "category": "artistic",
        "title": "Claude Lorrain, \"Seaport with the Embarkation of the Queen of Sheba\" (1648) — VISUAL ARTWORK",
        "excerpt": "Claude Lorrain bathes a thriving Mediterranean harbor in golden dawn light, its quays crowded with merchants, cargo, and ships poised to set sail on the open trade of nations. The serene, prosperous port stands as an emblem of commerce flowing freely across borders — the very vision of integrated North American trade now facing a decade-long countdown to its possible end.",
        "source": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba, oil on canvas, 1648, National Gallery, London; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Lorrain_-_Seaport_with_the_Embarkation_of_the_Queen_of_Sheba_-_WGA05002.jpg",
        "image": {
          "src": "/covers/usmca-withdrawal-countdown--art.png",
          "alt": "Claude Lorrain's painting Seaport with the Embarkation of the Queen of Sheba, a golden Mediterranean harbour crowded with ships and merchants at dawn.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "meta-states-child-addiction-suit",
    "headline": "Meta loses bid to dismiss US states' claims that Facebook and Instagram addict children",
    "overview": "A US judge refused to throw out claims by dozens of states that Meta deliberately designed Facebook and Instagram to be addictive to children, allowing the lawsuits to proceed. The states argue the company concealed the harms its products cause to young users.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxQTW1oX1plcXNSQ1ZoOXBJanVnUlhSbjZ3WEcwQ1NrUHUyMDFZa1ZzR2o0VERfX1JYdjdkRXIzVmVSMEthblRwOFJqRGZfalA5bE1Yd0QxeGxfNGltaGZJdnhYeHo1M1NkM0xsamRuY0xVWkk0VGxfZnhna083enVoQkhzdWlhdEZhZXRNVUNPQ0djaDhPSDg5YnVDZmx6YkZxVGtVaU0wNHluMUVSaFREejBMOU4zbVRzMWtuNHVCRWJETHJ4ZWRIWEdlRUI?oc=5"
      },
      {
        "name": "Devdiscourse",
        "href": "https://www.devdiscourse.com/article/law-order/3943022-meta-faces-legal-challenge-over-alleged-child-online-safety-violations"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/meta-states-child-addiction-suit.png",
      "alt": "A child's face lit from below by the pale glow of a smartphone screen in a darkened room.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "De Quincey's \"Just, Subtle, and Mighty Opium\"",
        "excerpt": "happiness might now be bought for a penny, and carried in the waistcoat pocket: portable ecstasies might be had corked up in a pint bottle",
        "source": "Thomas De Quincey, Confessions of an English Opium-Eater (1821), \"The Pleasures of Opium\", Wikisource",
        "href": "https://en.wikisource.org/wiki/Confessions_of_an_English_Opium-Eater/The_Pleasures_of_Opium"
      },
      {
        "category": "historical",
        "title": "Longfellow's \"The Children's Crusade\" March Out the Gates",
        "excerpt": "From the gates, that summer day,\nClad in robes of hodden gray,\nWith the red cross on the breast,\nAzure-eyed and golden-haired,\nForth the young crusaders fared;",
        "source": "Henry Wadsworth Longfellow, \"The Children's Crusade\" (In the Harbor), The Complete Poetical Works of Henry Wadsworth Longfellow, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1365/pg1365.html"
      },
      {
        "category": "literary",
        "title": "Browning's Pied Piper Leads the Children Away",
        "excerpt": "Out came the children running.\nAll the little boys and girls,\nWith rosy cheeks and flaxen curls,\nAnd sparkling eyes and teeth like pearls,\nTripping and skipping, ran merrily after\nThe wonderful music with shouting and laughter.",
        "source": "Robert Browning, \"The Pied Piper of Hamelin\" (1842), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/18343/18343-h/18343-h.htm"
      },
      {
        "category": "literary",
        "title": "The Lotus-Eaters Make Odysseus's Men Forget Home",
        "excerpt": "And whosoever of them ate of the honey-sweet fruit of the lotus, had no longer any wish to bring back word or to return, but there they were fain to abide among the Lotus-eaters, feeding on the lotus, and forgetful of their homeward way.",
        "source": "Homer, Odyssey 9.94-97, trans. A.T. Murray (1919), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D9%3Acard%3D82"
      },
      {
        "category": "artistic",
        "title": "Debussy, \"Sirènes\" from Nocturnes — MUSIC",
        "excerpt": "In the final Nocturne, Debussy dissolves a wordless female chorus into shimmering orchestral waves, conjuring the Sirens whose enchanting song lures sailors toward destruction. The piece's seductive, hypnotic pull captures the very allure at the heart of the states' case: a beautiful, irresistible signal engineered to draw the listener helplessly in.",
        "source": "Claude Debussy, Nocturnes (1900), No. 3 \"Sirènes\", IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/Nocturnes_(Debussy,_Claude)"
      },
      {
        "category": "artistic",
        "title": "Waterhouse, \"Ulysses and the Sirens\" — VISUAL ARTWORK",
        "excerpt": "Waterhouse's 1891 canvas shows bird-bodied Sirens swooping around Odysseus's ship as he, bound to the mast, strains toward their lethal song while his crew row on with ears stopped. The image dramatizes the central tension of the Meta case: an alluring, addictive call against which the young are largely defenseless, with the few protections too easily overwhelmed.",
        "source": "John William Waterhouse, Ulysses and the Sirens (1891), National Gallery of Victoria; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:John_William_Waterhouse_-_Ulysses_and_the_Sirens_(1891).jpg",
        "image": {
          "src": "/covers/meta-states-child-addiction-suit--art.png",
          "alt": "John William Waterhouse's painting Ulysses and the Sirens, bird-bodied sirens swooping around Odysseus's ship as he is bound to the mast.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "esa-milky-way-60-million-stars",
    "headline": "New European Space Agency image maps more than 60 million stars in the most detailed photo of the Milky Way yet",
    "overview": "The European Space Agency unveiled the most detailed photograph of the Milky Way ever produced, capturing more than 60 million stars in the crowded heart of the galaxy. The sweeping portrait distills years of observations into a single image of our home galaxy.",
    "genre": "Science",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/european-space-agency-milky-way-photograph/"
      },
      {
        "name": "European Space Agency",
        "href": "https://www.esa.int/Science_Exploration/Space_Science/Euclid/ESA_s_Euclid_captures_the_Milky_Way_s_crowded_heart"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/esa-milky-way-60-million-stars.png",
      "alt": "The European Space Agency's detailed photograph of the crowded heart of the Milky Way galaxy, dense with countless stars.",
      "credit": "ESA/Euclid"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Galileo turns the telescope on the Milky Way (1610)",
        "excerpt": "By the aid of a telescope any one may behold this in a manner which so distinctly appeals to the senses that all the disputes which have tormented philosophers through so many ages are exploded at once by the irrefragable evidence of our eyes, and we are freed from wordy disputes upon this subject, for the Galaxy is nothing else but a mass of innumerable stars planted together in clusters.",
        "source": "Galileo Galilei, The Sidereal Messenger (Sidereus Nuncius), 1610, Edward Stafford Carlos translation; Project Gutenberg eBook #46036",
        "href": "https://www.gutenberg.org/cache/epub/46036/pg46036.txt"
      },
      {
        "category": "historical",
        "title": "Ptolemy catalogues the fixed stars (2nd century AD)",
        "excerpt": "It is the first and most ancient document we possess which gives a description of the heavens of sufficient exactness to admit of comparison with modern observations.",
        "source": "Christian Heinrich Friedrich Peters & Edward Ball Knobel, Ptolemy's Catalogue of Stars: a revision of the Almagest, Carnegie Institution of Washington, 1915; Internet Archive",
        "href": "https://archive.org/details/cu31924012300491"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"When I Heard the Learn'd Astronomer\"",
        "excerpt": "When I heard the learn’d astronomer,\nWhen the proofs, the figures, were ranged in columns before me,\nWhen I was shown the charts and diagrams, to add, divide, and measure them,\nWhen I sitting heard the astronomer where he lectured with much applause in the lecture-room,\nHow soon unaccountable I became tired and sick,\nTill rising and gliding out I wander’d off by myself,\nIn the mystical moist night-air, and from time to time,\nLook’d up in perfect silence at the stars.",
        "source": "Walt Whitman, \"When I Heard the Learn'd Astronomer,\" Leaves of Grass, 1865; Project Gutenberg eBook #1322",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt"
      },
      {
        "category": "literary",
        "title": "Dante closes the Inferno on \"the stars\"",
        "excerpt": "We mounted up, he first and I the second,\n    Till I beheld through a round aperture\n    Some of the beauteous things that Heaven doth bear;\n\nThence we came forth to rebehold the stars.",
        "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto XXXIV, Henry Wadsworth Longfellow translation; Project Gutenberg eBook #1001",
        "href": "https://www.gutenberg.org/cache/epub/1001/pg1001.txt"
      },
      {
        "category": "artistic",
        "title": "Claude Debussy, \"Clair de lune\" from Suite bergamasque — MUSIC",
        "excerpt": "Debussy's shimmering piano nocturne pours moonlight into sound, its rippling arpeggios drifting like light scattered across a vast night sky. The piece evokes the same quiet awe as the new portrait of sixty million stars: a hushed, luminous immensity rendered with delicate, glittering detail. Its serene movement mirrors the slow patient gathering of starlight into one sweeping image of our home galaxy.",
        "source": "Claude Debussy, \"Clair de lune,\" third movement of Suite bergamasque, CD 82 (Paris: E. Fromont, 1905); IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/Suite_bergamasque_(Debussy,_Claude)"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, \"The Starry Night\" (1889) — VISUAL ARTWORK",
        "excerpt": "Van Gogh's swirling cobalt sky churns with oversized, radiant stars spiralling above a sleeping town, transforming the night into a living, turbulent cosmos. Painted from memory and imagination, it captures the human urge to behold and map the heavens that drives the new sixty-million-star portrait. Where the telescope resolves the galaxy's crowded heart into precise points of light, Van Gogh dissolves it into rapturous motion, two visions of the same overwhelming sky.",
        "source": "Vincent van Gogh, The Starry Night, 1889, Museum of Modern Art (Google Art Project); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/esa-milky-way-60-million-stars--art.png",
          "alt": "Vincent van Gogh's The Starry Night, a swirling blue night sky of radiant stars above a sleeping town.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "brazil-beat-japan-world-cup",
    "headline": "Brazil beat Japan 2-1 at the World Cup as Martinelli scores in injury time",
    "overview": "Gabriel Martinelli scored deep in injury time to give Brazil a 2-1 win over Japan at the World Cup, rescuing the five-time champions after a stubborn Japanese fightback. The late goal sent Brazil through in dramatic fashion.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxOQ0RRN1A1TFhqb0dqM2VoaHlqUmN4YXkxWlU3d3M4aHBOcEZWbDFaSVNDVFNjTWJvOHBfWEV6SkFKeHExbjVENjE1YmJWOUJBcnJPeWs2WEE3STRKNE5IQjJrMFQyOTU0a0hwQlNXU2l3TzlLUWVscVVrbnZGUGJmbnBXSWhPOHBNaXZ3TVpuNVk0UQ?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/sports/2026/6/29/martinelli-scores-late-as-brazil-beat-japan-2-1-enter-world-cup-last-16"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/brazil-beat-japan-world-cup.png",
      "alt": "A floodlit football stadium at night with a brilliant green pitch and drifting confetti.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pindar crowns the Olympic victor in song",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth.",
        "source": "Pindar, Olympian Ode 1 (trans. Diane Arnson Svarlien), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1"
      },
      {
        "category": "historical",
        "title": "Pheidippides, the long-course runner of Marathon",
        "excerpt": "First of all, while they were still in the city, the generals sent off to Sparta a herald, namely Pheidippides an Athenian and for the rest a runner of long day-courses and one who practised this as his profession.",
        "source": "Herodotus, The History of Herodotus, Book VI.105 (trans. G. C. Macaulay), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Macaulay)/Book_VI"
      },
      {
        "category": "literary",
        "title": "Casey at the Bat — the great reversal at the death",
        "excerpt": "Oh, somewhere in this favoured land the sun is shining bright, / The band is playing somewhere, and somewhere hearts are light, / And somewhere men are laughing, and somewhere children shout; / But there is no joy in Mudville—mighty Casey has struck out.",
        "source": "Ernest Lawrence Thayer, \"Casey at the Bat\" (1888; 1912 edition), Wikisource",
        "href": "https://en.wikisource.org/wiki/Casey_at_the_Bat_(1912)"
      },
      {
        "category": "literary",
        "title": "To an Athlete Dying Young — glory chaired shoulder-high",
        "excerpt": "The time you won your town the race / We chaired you through the market-place; / Man and boy stood cheering by, / And home we brought you shoulder-high.",
        "source": "A. E. Housman, \"To an Athlete Dying Young,\" A Shropshire Lad (1896), Wikisource",
        "href": "https://en.wikisource.org/wiki/A_Shropshire_Lad/To_an_Athlete_Dying_Young"
      },
      {
        "category": "artistic",
        "title": "Verdi, \"Triumphal March\" from Aida — MUSIC",
        "excerpt": "Verdi's blazing Grand March from Act II of Aida is the sound of victory made into spectacle: trumpets ringing, the conquering procession sweeping the stage. Its surging brass captures the jubilation of a five-time champion saved at the last gasp, the roar of a stadium erupting as the winning goal finds the net.",
        "source": "Giuseppe Verdi, Aida (1871), Act II Triumphal March, IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/Aida_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Henri Rousseau, The Football Players (1908) — VISUAL ARTWORK",
        "excerpt": "Rousseau's naive, dreamlike canvas freezes four mustachioed players leaping for a ball in striped jerseys beneath autumn trees, bodies suspended in joyful, weightless motion. The painting distills the pure play and theatrical drama of the sporting moment — the same suspended instant of leaping bodies that decides a match deep in injury time.",
        "source": "Henri Rousseau, The Football Players (1908), oil on canvas, Solomon R. Guggenheim Museum; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Henri_Rousseau_-_The_Football_Players.jpg",
        "image": {
          "src": "/covers/brazil-beat-japan-world-cup--art.png",
          "alt": "Henri Rousseau's painting The Football Players, four moustachioed players in striped jerseys leaping for a ball among autumn trees.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "rick-owens-adidas-aircon-tracksuits",
    "headline": "Rick Owens designs inflatable Adidas tracksuits that double as personal air conditioning",
    "overview": "Designer Rick Owens has created a line of inflatable Adidas tracksuits that function as personal air conditioning, channeling air around the wearer's body. The collaboration fuses avant-garde fashion with wearable climate control as summers grow hotter.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/30/rick-owens-adidas-inflatable-aircon-tracksuits/"
      },
      {
        "name": "Highsnobiety",
        "href": "https://www.highsnobiety.com/p/rick-owens-adidas-2026/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/rick-owens-adidas-aircon-tracksuits.png",
      "alt": "Avant-garde inflatable, puffed-up tracksuits on faceless mannequins under soft studio light.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Marinetti's Manifesto of Futurism (1909)",
        "excerpt": "the world's magnificence has been enriched by a new beauty: the beauty of speed.",
        "source": "Filippo Tommaso Marinetti, \"The Founding and Manifesto of Futurism,\" Le Figaro, 20 February 1909 (Encyclopædia Britannica primary source)",
        "href": "https://cdn.britannica.com/primary_source/eb/435828.html"
      },
      {
        "category": "historical",
        "title": "Oskar Schlemmer's Triadic Ballet premiere program (1922)",
        "excerpt": "On 30 September 1922 the Bauhaus master Oskar Schlemmer premiered Das Triadische Ballett in Stuttgart, encasing dancers in padded, spherical and conical costumes that swallowed the human silhouette into pure geometry. This program sheet, designed by Schlemmer himself, marks the moment fashion became architecture for the body — the same impulse that puffs Owens's wearers into ballooning, Michelin-Man volumes.",
        "source": "Oskar Schlemmer, program for the premiere of Das Triadische Ballett, Stuttgart, 30 September 1922 (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Das_Triadische_Ballett,_Programmzettel_1922.jpg"
      },
      {
        "category": "literary",
        "title": "Thomas Carlyle, Sartor Resartus (1836)",
        "excerpt": "Clothes gave us individuality, distinctions, social polity; Clothes have made Men of us; they are threatening to make Clothes-screens of us.",
        "source": "Thomas Carlyle, Sartor Resartus, 1836 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1051/1051-h/1051-h.htm"
      },
      {
        "category": "literary",
        "title": "Hans Christian Andersen, \"The Emperor's New Clothes\" (1837)",
        "excerpt": "The tissue is as light as a cobweb, and one might fancy one had nothing on; but that is just its greatest beauty.",
        "source": "Hans Christian Andersen, \"The Emperor's New Clothes,\" 1837 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Fairy_Tales_of_Hans_Christian_Andersen/The_Emperor's_New_Clothes"
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231 — MUSIC",
        "excerpt": "Honegger's 1923 symphonic movement builds a roaring orchestral machine, accelerating a steam locomotive from dead stillness to thundering full speed. Its mechanical exhilaration — the body of music remade as an engine — mirrors Owens's tracksuits humming with built-in fans, turning the wearer into a piece of climate-control apparatus.",
        "source": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1), 1923 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      },
      {
        "category": "artistic",
        "title": "Umberto Boccioni, Unique Forms of Continuity in Space (1913) — VISUAL ARTWORK",
        "excerpt": "Boccioni's striding bronze figure is a human body dissolved into aerodynamic wind and speed, its flesh swelling outward into rippling, sculpted volumes as it forges ahead. This Futurist dream of a body remade by motion anticipates Owens's inflated, air-channeling silhouettes — clothing that swells around the wearer to become a second, dynamic skin.",
        "source": "Umberto Boccioni, Unique Forms of Continuity in Space, 1913 bronze (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:%27Unique_Forms_of_Continuity_in_Space%27,_1913_bronze_by_Umberto_Boccioni.jpg",
        "image": {
          "src": "/covers/rick-owens-adidas-aircon-tracksuits--art.png",
          "alt": "Umberto Boccioni's 1913 Futurist bronze Unique Forms of Continuity in Space, a striding figure whose body swells into rippling aerodynamic volumes.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "guggenheim-strike-threat",
    "headline": "Workers threaten to strike at New York's Guggenheim Museum as the tourist season peaks",
    "overview": "Unionized workers at New York's Guggenheim Museum are threatening to strike at the height of the summer tourist season amid a contract dispute, the museum said. A walkout would disrupt one of the city's busiest cultural institutions.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/strike-looms-at-guggenheim-at-height-of-tourist-season-1234753765/"
      },
      {
        "name": "Hyperallergic",
        "href": "https://hyperallergic.com/904954/guggenheim-museum-workers-rally-for-fair-contract-in-lunch-break-action/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/guggenheim-strike-threat.png",
      "alt": "The spiral exterior of the Solomon R. Guggenheim Museum in New York.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 1894 Pullman Strike",
        "excerpt": "After the Pullman Company refused wage negotiations, workers walked out on May 11, 1894, and the American Railway Union under Eugene V. Debs organized a nationwide boycott of Pullman railway cars that severely disrupted rail traffic until federal troops, an injunction, and the jailing of Debs broke it by mid-July. Like the Guggenheim crews weighing a walkout at the season's peak, the Pullman workers chose the moment of maximum leverage to make a contract grievance impossible to ignore.",
        "source": "National Park Service, Pullman National Historical Park, \"The Strike of 1894\" (nps.gov)",
        "href": "https://www.nps.gov/pull/learn/historyculture/the-strike-of-1894.htm"
      },
      {
        "category": "historical",
        "title": "The 1892 Homestead Strike",
        "excerpt": "The men had hoped for the best all along, but were apprehensive that Mr Frick would not concede anything, or at least would not come to an agreement with the conferees, so when the details of the meeting became noised about the town, preparations for a strike were begun.",
        "source": "Myron R. Stowell, \"Fort Frick,\" or the Siege of Homestead (1893), via Internet Archive",
        "href": "https://archive.org/stream/fortfrickorsiege00stow/fortfrickorsiege00stow_djvu.txt"
      },
      {
        "category": "literary",
        "title": "Émile Zola, Germinal (1885)",
        "excerpt": "The mine ought to belong to the miner, as the sea belongs to the fisherman, and the earth to the peasant. Do you see? The mine belongs to you, to all of you who, for a century, have paid for it with so much blood and misery!",
        "source": "Émile Zola, Germinal, trans. Havelock Ellis (1894), Part Fourth, Ch. 7, Wikisource",
        "href": "https://en.wikisource.org/wiki/Germinal/4/Chapter_7"
      },
      {
        "category": "literary",
        "title": "Marx & Engels, Manifesto of the Communist Party (1848)",
        "excerpt": "Let the ruling classes tremble at a Communistic revolution. The proletarians have nothing to lose but their chains. They have a world to win. Working men of all countries, unite!",
        "source": "Karl Marx & Friedrich Engels, Manifesto of the Communist Party, trans. Samuel Moore (1888), Section IV, Wikisource",
        "href": "https://en.wikisource.org/wiki/Manifesto_of_the_Communist_Party/4"
      },
      {
        "category": "artistic",
        "title": "L'Internationale by Pierre De Geyter — MUSIC",
        "excerpt": "The global anthem of the labor movement, set by Pierre De Geyter to Eugène Pottier's defiant verse, rises as a summons for the workers of the world to stand together and claim their due. Its surging, march-like refrain is the sound of solidarity itself — the exact spirit a unionized museum crew invokes when it threatens to lay down its tools at the busiest hour. To hear it is to feel the collective resolve that turns a contract dispute into a movement.",
        "source": "Pierre De Geyter (music), Eugène Pottier (text), L'Internationale (1888), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/L'Internationale_(De_Geyter,_Pierre)"
      },
      {
        "category": "artistic",
        "title": "Robert Koehler, The Strike (1886) — VISUAL ARTWORK",
        "excerpt": "Robert Koehler's sweeping canvas freezes the charged instant when laborers down their tools and confront the factory owner on his doorstep — fists clenched, a woman pleading, a man stooping for a stone. First shown in New York days before the Haymarket affair, it became an enduring emblem of working-class grievance and resolve. Its taut standoff between labor and management mirrors the Guggenheim workers' threatened walkout, the moment grievance hardens into collective action.",
        "source": "Robert Koehler, The Strike (1886), oil on canvas, Deutsches Historisches Museum, Berlin; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:%22Der_Streik%22_von_Robert_Koehler.jpg",
        "image": {
          "src": "/covers/guggenheim-strike-threat--art.png",
          "alt": "Robert Koehler's 1886 painting The Strike, workers confronting a factory owner outside the mill as one man stoops for a stone.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "guo-wengui-30-years-fraud",
    "headline": "Exiled Chinese tycoon Guo Wengui sentenced to 30 years in US prison for a $1 billion fraud",
    "overview": "Guo Wengui, the self-exiled Chinese businessman and ally of Steve Bannon, was sentenced by a Manhattan federal court to 30 years in prison after being convicted of defrauding thousands of his online followers of more than $1 billion. Prosecutors said he spent the proceeds on a yacht, mansions and luxury cars while casting himself as a crusader against the Chinese Communist Party.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxOWWRvWFlGZFBqSEdVeUF3eXg5VV9FMWdfeGdIU0JFdXhEOTl5Z1VtUVV6dUtHVEpxVzJlMDl1UlpFdGlUSlJUTFZNOG4zNnFWemh5RUR2TFhWRzN2bWpTb3RmUkM1bXJ2VUhWVVBLZHVTTThMWHh0dFRJRmtncjVKOXdXeUNScVlTY08xTWJCQlA2Qjl5d1QtaVF0ZlU?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cjeg15vw3z9o?at_medium=RSS&at_campaign=rss"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/guo-wengui-30-years-fraud.png",
      "alt": "The Thurgood Marshall United States Courthouse in Lower Manhattan, where the federal fraud trial was held.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Charles Mackay, \"The South-Sea Bubble,\" Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841)",
        "excerpt": "It seemed at that time as if the whole nation had turned stockjobbers. Exchange Alley was every day blocked up by crowds, and Cornhill was impassable for the number of carriages.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. 1, Ch. 2 (\"The South-Sea Bubble\"), 1841; hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_2"
      },
      {
        "category": "historical",
        "title": "\"Captain Thomas Strangeways,\" Sketch of the Mosquito Shore, Including the Territory of Poyais (1822) — the fraudulent guidebook of the swindler Gregor MacGregor",
        "excerpt": "Several noble rivers, after having watered some of the richest land, perhaps, in the world, empty themselves in the vast lagoon of which this harbour is part.",
        "source": "Thomas Strangeways (pseud.), Sketch of the Mosquito Shore, Including the Territory of Poyais, Edinburgh, 1822; digitized full text hosted at the Internet Archive. The book was a promotional fiction by which Gregor MacGregor, self-styled \"Cazique of Poyais,\" lured British and Scottish investors and settlers to a country that did not exist.",
        "href": "https://archive.org/details/sketchmosquitos00conggoog"
      },
      {
        "category": "literary",
        "title": "Anthony Trollope, The Way We Live Now (1875) — the financier-swindler Augustus Melmotte",
        "excerpt": "he was regarded in Paris as the most gigantic swindler that had ever lived; that he had made that City too hot to hold him",
        "source": "Anthony Trollope, The Way We Live Now (1875), Project Gutenberg eBook #5231.",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
      },
      {
        "category": "literary",
        "title": "Geoffrey Chaucer, \"The Pardoner's Prologue,\" The Canterbury Tales (late 14th century)",
        "excerpt": "Thus I can preach against that same sin which I practise, and that is avarice. Though of that sin myself be guilty, yet I can make other folk to cast off avarice, and sore to repent; but that is not my principal aim; I preach nothing but for covetousness. For my purpose is naught but gain, and not a whit correction of sin.",
        "source": "Geoffrey Chaucer, The Canterbury Tales of Geoffrey Chaucer (\"The Pardoner's Tale / Prologue\"); modern-English rendering hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Canterbury_Tales_of_Geoffrey_Chaucer/Pardoner%E2%80%99s_Tale/Prologue"
      },
      {
        "category": "artistic",
        "title": "Wolfgang Amadeus Mozart, Don Giovanni, K.527 (1787) — the charismatic deceiver dragged down to his reckoning — MUSIC",
        "excerpt": "Mozart's dramma giocoso follows a glittering, fearless seducer who lies, cheats and squanders his way through the world while charming all who follow him. In the final scene the stone statue of a murdered man arrives at his lavish banquet and, before the eyes of his victims, drags the unrepentant libertine down to the flames. The opera's resonance lies in its insistence that no amount of charm, luxury or defiance can finally outrun the moment of judgment.",
        "source": "Wolfgang Amadeus Mozart, Don Giovanni, K.527 (1787), full scores and parts hosted at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Don_Giovanni,_K.527_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, An Emblematical Print on the South Sea Scheme (1721) — VISUAL ARTWORK",
        "excerpt": "Hogarth's crowded satirical print depicts the frenzy of the 1720 South Sea Bubble: a merry-go-round of deluded speculators whirls beneath a swindler's machine, Honesty is broken on a wheel while Villainy flogs her, and Trade lies dead as the mob scrambles after worthless paper riches. It is among the earliest editorial cartoons, indicting the credulity of the crowd and the cynicism of those who fleece them for vain, ill-gotten gain.",
        "source": "William Hogarth, An Emblematical Print on the South Sea Scheme (also known as The South Sea Scheme), 1721; image hosted at Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/guo-wengui-30-years-fraud--art.png",
          "alt": "William Hogarth's 1721 satirical engraving of the South Sea Bubble: a chaotic London scene with a crowd riding a swindler's merry-go-round, the figure of Honesty broken on a wheel, and speculators scrambling after paper riches.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "taiwan-president-cadets-china",
    "headline": "Taiwan's president urges military cadets to keep the island out of 'China's clutches'",
    "overview": "Taiwan's President Lai Ching-te told graduating military cadets in Taipei to guard against Chinese infiltration and espionage and to keep the island out of Beijing's 'clutches,' as he sought to bolster the armed forces amid sustained pressure from China. Beijing claims Taiwan as its own territory.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxNU0ZSNllHVC1Ea0NYUzk0SlhUSzBRSEtzUEhwYXVIaEkybTQwOEtPMWFGV254UjMyWlJIWS1yZDIwaFRmclpmQXFVM0xIWFhHM0MyQ3c0dkV6Mm5XbGMwSHhDdlBXUnF5dUxJY2pDZExST3BHdnpoWEIwam5Sb2MyaDJvU1YzcktBdG1KUHQxeUlYY1VaenpRWW9abEhNV19RR25lUWg4MFJlcG1DZVJXVk1R?oc=5"
      },
      {
        "name": "Taipei Times",
        "href": "https://news.google.com/rss/articles/CBMiekFVX3lxTFBFTjBHWEYtZHhBb1M3MXRIT0NkeEM2dXRYX0hQektWdmhrT1ZTUlhVM1VCUXgxcWY1WnpnY3dNUXRCOWVjU1REVW14Uk9GdnkzdUhGQ2dDWGREOUpINkg3dG1qSWxZWHZfRDRMdHZTbk9MMkQ2dHVPSWVR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/taiwan-president-cadets-china.png",
      "alt": "The Presidential Office Building in Taipei, seat of Taiwan's government.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides, the Melian Dialogue (History of the Peloponnesian War, Book 5, c. 416 BCE)",
        "excerpt": "right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War 5.89, trans. Richard Crawley, Perseus Digital Library, Tufts University (perseus.tufts.edu)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book%3D5:chapter%3D89:section%3D1"
      },
      {
        "category": "historical",
        "title": "Demosthenes, First Philippic, section 10 (351 BCE)",
        "excerpt": "When, Athenians, will you take the necessary action? What are you waiting for? Until you are compelled, I presume. But what are we to think of what is happening now? For my own part I think that for a free people there can be no greater compulsion than shame for their position.",
        "source": "Demosthenes, Philippic 1, section 10, trans. J. H. Vince (1930), Perseus Digital Library, Tufts University (perseus.tufts.edu)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0070:speech=4:section=10"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Henry V, Act III, Scene 1, \"Once more unto the breach\" (c. 1599)",
        "excerpt": "Once more unto the breach, dear friends, once more, / Or close the wall up with our English dead. / In peace there's nothing so becomes a man / As modest stillness and humility; / But when the blast of war blows in our ears, / Then imitate the action of the tiger; / Stiffen the sinews, summon up the blood, / Disguise fair nature with hard-favour'd rage.",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act III, Scene 1, Project Gutenberg eBook #1521 (gutenberg.org)",
        "href": "https://www.gutenberg.org/files/1521/1521-h/1521-h.htm"
      },
      {
        "category": "literary",
        "title": "Thomas Babington Macaulay, \"Horatius\" from Lays of Ancient Rome, stanza XXVII (1842)",
        "excerpt": "Then out spake brave Horatius, / The Captain of the Gate: / \"To every man upon this earth / Death cometh soon or late. / And how can man die better / Than facing fearful odds, / For the ashes of his fathers, / And the temples of his gods\"",
        "source": "Thomas Babington Macaulay, \"Horatius,\" Lays of Ancient Rome, Project Gutenberg eBook #847 (gutenberg.org)",
        "href": "https://www.gutenberg.org/files/847/847-h/847-h.htm"
      },
      {
        "category": "artistic",
        "title": "Jean Sibelius, Finlandia, Op. 26 (1900) — MUSIC",
        "excerpt": "Composed in 1900 as a veiled protest against Russian censorship of the Finnish press, Sibelius's tone poem opens with growling, oppressive brass before surging into a defiant hymn that became an unofficial anthem of Finnish nationhood. Banned at times by the Tsarist authorities, it crystallized a small nation's will to endure and remain free under the shadow of a vast neighbour — the very resolve Lai Ching-te invokes for Taiwan.",
        "source": "Jean Sibelius, Finlandia, Op. 26 (1900), scores hosted at the International Music Score Library Project / Petrucci Music Library (imslp.org)",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, Leonidas at Thermopylae (1814) — VISUAL ARTWORK",
        "excerpt": "David's vast neoclassical canvas shows the Spartan king Leonidas seated amid his outnumbered band before the pass of Thermopylae, calm and resolute as he prepares to die defending Greece against the overwhelming Persian host. The composition glorifies the disciplined resolve of the few who stand for liberty against an empire — a fitting image for a small free state steeling itself against a looming power.",
        "source": "Jacques-Louis David, Leonidas at Thermopylae (1814), oil on canvas, Musée du Louvre, Paris (INV 3690); image via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:L%C3%A9onidas_aux_Thermopyles_-_Jacques-Louis_David_-_Mus%C3%A9e_du_Louvre_Peintures_INV_3690_%3B_L_3711.jpg",
        "image": {
          "src": "/covers/taiwan-president-cadets-china--art.png",
          "alt": "Jacques-Louis David's neoclassical painting Leonidas at Thermopylae, depicting the Spartan king seated bare-chested with sword and shield amid his soldiers preparing to defend the mountain pass against the Persian army.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "pakistan-strikes-afghanistan-civilians",
    "headline": "Pakistani airstrikes kill dozens of civilians in eastern Afghanistan, the UN says",
    "overview": "Pakistani airstrikes on eastern Afghanistan killed at least 28 civilians, the United Nations said, while Afghan officials put the toll higher, at 36 dead and about 160 wounded, most of them women and children. Pakistan said it was striking militant hideouts; the Taliban government condemned the strikes as a violation of Afghan sovereignty.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cy8wygyed0wo?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQU0F6dXd5RmdVQ3k3UDVULUxVNEsyWmd0LWdIT0FvZENuYlVCcE1lalFGT0xVS2lWVUN1MHcwWVJXT0d1R3JUNlZuekJLZGNkYVNVTXZVcFZ3Q0RvaFZ0b1N4aDBtdFVkNzNJTk1yRmVLaHJYNG13cEEtcm40YnZfbjlZbjREUnJSSTZCZi16Ym42ZW9BN2NRV0FFeTd5Y3poRExN?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/pakistan-strikes-afghanistan-civilians.png",
      "alt": "The Spin Ghar (White Mountains) range in eastern Afghanistan near Jalalabad.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hansard, House of Commons, 'Frontier Operations (Bombing Warnings)' (3 December 1919)",
        "excerpt": "Lieut.-Commander KENWORTHY asked the Secretary of State for India whether warning is given in time to allow the removal of women, children, and other non-combatants before bombing raids by aeroplane are carried out on frontier towns and villages? Mr. MONTAGU: Warning was given to the Wazirs and Mahsuds, after they had rejected our terms, that they would be subjected to bombing from the air, after time had been allowed for the removal of women and children.",
        "source": "Parliamentary Debates (Hansard), House of Commons, 3 December 1919, 'Frontier Operations (Bombing Warnings)', hosted at the UK Parliament Historic Hansard archive (api.parliament.uk/historic-hansard).",
        "href": "https://api.parliament.uk/historic-hansard/commons/1919/dec/03/frontier-operations-bombing-warnings"
      },
      {
        "category": "historical",
        "title": "George Steer, 'The Tragedy of Guernica' — original report in The Times (27 April 1937)",
        "excerpt": "Guernica, the most ancient town of the Basques and the centre of their cultural tradition, was completely destroyed yesterday afternoon by insurgent air raiders. The bombardment of this open town far behind the lines occupied precisely three hours and a quarter, during which a powerful fleet of aeroplanes consisting of three German types, Junkers and Heinkel bombers and Heinkel fighters, did not cease unloading on the town bombs weighing from 1,000lb. downwards.",
        "source": "George L. Steer, 'The Tragedy of Guernica,' The Times (London), 27 April 1937; original newspaper clipping reproduced on Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:The_tragedy_of_Guernica_(George_Steer).jpg"
      },
      {
        "category": "literary",
        "title": "Euripides, The Trojan Women (415 BC), Hecuba's lament (trans. E. P. Coleridge)",
        "excerpt": "Ah me! ah me! What else but tears is now my hapless lot, whose country, children, husband, all are lost? Ah! the high-blown pride of ancestors, humbled! how brought to nothing after all!",
        "source": "Euripides, The Trojan Women, English translation by E. P. Coleridge, in the Perseus Digital Library, Tufts University (perseus.tufts.edu).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0124%3Acard%3D98"
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book XXIV — Andromache's lament for Hector (trans. Samuel Butler)",
        "excerpt": "Husband, you have died young, and leave me in your house a widow; he of whom we are the ill-starred parents is still a mere child, and I fear he may not reach manhood. Ere he can do so our city will be razed and overthrown, for you who watched over it are no more- you who were its saviour, the guardian of our wives and children.",
        "source": "Homer, The Iliad, Book XXIV, prose translation by Samuel Butler (1898), hosted at Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XXIV"
      },
      {
        "category": "artistic",
        "title": "Thomas Tallis, The Lamentations of Jeremiah (c. 1565) — MUSIC",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! ... For these things I weep; mine eye, mine eye runneth down with water, because the comforter that should relieve my soul is far from me: my children are desolate, because the enemy prevailed.",
        "source": "Thomas Tallis, Lamentations of Jeremiah (setting of the Book of Lamentations, ch. 1), public-domain scores at the International Music Score Library Project (imslp.org); scriptural text quoted from the King James Version of Lamentations 1:1, 1:16.",
        "href": "https://imslp.org/wiki/Lamentations_(Tallis,_Thomas)"
      },
      {
        "category": "artistic",
        "title": "Francisco Goya, The Third of May 1808 (1814) — VISUAL ARTWORK",
        "excerpt": "Goya's vast canvas seizes the instant before a faceless firing squad cuts down a row of unarmed townspeople: a white-shirted man flings his arms wide in a cruciform cry while the dead lie bleeding at his feet and others cover their faces in terror. Painted to commemorate Spanish civilians slaughtered during the Napoleonic occupation, it turns the anonymous, mechanical killing of the defenceless into an indictment that resonates with the women and children mourned after the strikes on eastern Afghanistan.",
        "source": "Francisco Goya, El tres de mayo de 1808 en Madrid (The Third of May 1808), oil on canvas, 1814, Museo Nacional del Prado, Madrid; high-resolution image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/pakistan-strikes-afghanistan-civilians--art.png",
          "alt": "Goya's painting The Third of May 1808: a kneeling man in a white shirt throws his arms wide in surrender before a faceless firing squad, the bodies of executed civilians lying bloodied around him under a dark night sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "israel-strikes-gaza-children",
    "headline": "Israeli strikes kill at least 8 people in Gaza, including 2 children, health officials say",
    "overview": "Israeli strikes across the Gaza Strip killed at least eight people, including two children, Palestinian health officials said, with one strike hitting a tent sheltering displaced families. The deaths came amid reports of repeated violations of a fragile ceasefire.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxQSGw4TkJCNUpfellkLVZuMWludlVPMnpDMFJ3OS1WcDRWVHNyUks0MjB2ZERaOXYwQ3BIa3I3VzU1VWhjMHFES0tVZG5tbDdjbGllN05xNWtyZGd1Z2J6cy1tQ01XNTVWMjNtUUFXUk5LQ1ZiNXZiZDZqamRuaHNWRkQ2SnJ4UVRCTWFxb2dMR1A5cVctaVhyYnpmclVUZw?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxOaTRlaE43WkRTTEx6VDdncEE3LTR6b0ExM1hWZkxxTmNCY1pKay1oWlVYdS1hd1VHdXhLQV9lUV9nM294alYzeWJrSm1yTzRhNXB3WnVjOU90SmZiUGwxTVN0Q1VzSW1LdXNvNWNzQVI0N2NOeFUtdno2ODFtcHdRZzZJMlhXTDdGb0pKZVdmTjNZbC1tenk2WXBOanZhZ0plX293Uy1hNnFrZ3hQemEtcXNSbHlubnfSAbwBQVVfeXFMTjBYWkJzUlg0dHdva2dGcnZ2d0VVNzRJZEZpWlRvNXI0b0hWdFR2X084VmluUFBsRFhJTXNKZjFsLXdrZkdSdWl5SmRWbHpva0lJYjg3WFFBRURfc01XdER0R1g5RUZSaDd5VGlkQ1NwQjEyOVVobmpzb1FJQlh6aXE5SjdOc19JU2xOZG8tSVhGTTN2YW1VVEpid2R0UWwzUFFJNkFoSnVHUjYweUVYMmJnQXp3N0ticUxReTk?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/israel-strikes-gaza-children.png",
      "alt": "Displaced families' tents huddled beneath a dark sky in Gaza.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides on the Siege and Massacre of Melos (c. 416 BC), from the History of the Peloponnesian War",
        "excerpt": "they slew all the men of military age, made slaves of the women and children, and inhabited the place with a colony sent thither afterwards of five hundred men of their own.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5.116 (Richard Crawley translation), hosted by the Perseus Digital Library, Tufts University (perseus.tufts.edu).",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Thuc.+5.116"
      },
      {
        "category": "historical",
        "title": "Josephus, The Wars of the Jews (c. 75 AD): the famine in besieged Jerusalem",
        "excerpt": "It was now a miserable case, and a sight that would justly bring tears into our eyes... the famine was too hard for all other passions, and it is destructive to nothing so much as to modesty; for what was otherwise worthy of reverence was in this case despised; insomuch that children pulled the very morsels that their fathers were eating out of their very mouths, and what was still more to be pitied, so did the mothers do as to their infants.",
        "source": "Flavius Josephus, The Wars of the Jews, Book 5, ch. 10, sec. 3 (William Whiston translation), hosted by the Perseus Digital Library, Tufts University (perseus.tufts.edu).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0148%3Abook%3D5%3Awhiston+chapter%3D10%3Awhiston+section%3D3"
      },
      {
        "category": "literary",
        "title": "Euripides, The Trojan Women (415 BC): Hecuba over the body of the slain child Astyanax",
        "excerpt": "Place the shield upon the ground, Hector's shield so deftly rounded, a piteous sight, a bitter grief for me to see. O you Achaeans, more reason have you to boast of your prowess than your wisdom. Why have you in terror of this child been guilty of a murder never matched before? Did you fear that some day he would rear again the fallen walls of Troy?... now that our city is taken and every Phrygian slain, you fear a tender child like this!",
        "source": "Euripides, The Trojan Women (E. P. Coleridge translation, 1891), hosted by the Perseus Digital Library, Tufts University (perseus.tufts.edu).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0124%3Acard%3D1156"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations (Authorized King James Version): the elegy over ruined Jerusalem",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow!... Mine eyes do fail with tears, my bowels are troubled, my liver is poured upon the earth, for the destruction of the daughter of my people; because the children and the sucklings swoon in the streets of the city.",
        "source": "Lamentations 1:1 and 2:11, Bible (King James Version), hosted by Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "Thomas Tallis, The Lamentations of Jeremiah (c. 1565) — MUSIC",
        "excerpt": "Tallis's five-voice setting of the opening of the Book of Lamentations transforms the prophet's grief over the fall of Jerusalem into one of the great laments of Renaissance polyphony. The somber Latin verses, framed by the Hebrew letters Aleph and Beth, unfold in slow, intertwining lines that hold mourning and consolation in the same breath. Its weeping over a desolated, depopulated city resonates directly with grief for a besieged people and the small bodies carried from the rubble.",
        "source": "Thomas Tallis, Lamentations of Jeremiah (Incipit lamentatio / De lamentatione), public-domain score, International Music Score Library Project (imslp.org).",
        "href": "https://imslp.org/wiki/Lamentations_(Tallis,_Thomas)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Massacre of the Innocents (c. 1565–1567) — VISUAL ARTWORK",
        "excerpt": "Bruegel relocates Herod's slaughter of the children of Bethlehem to a snowbound Flemish village, where armored soldiers ride down on ordinary families and tear infants from their parents' arms. Mothers kneel and plead in the snow while their homes are ransacked, the everyday setting making the horror unbearably close. By transposing an ancient massacre of the innocents into his own war-torn present, the painting becomes a timeless indictment of soldiers who kill children and of grief that finds no comfort.",
        "source": "Pieter Bruegel the Elder, The Massacre of the Innocents (oil on panel, c. 1565–1567), Royal Collection, Windsor Castle (RCIN 405787); image via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Massacre_of_the_Innocents_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/israel-strikes-gaza-children--art.png",
          "alt": "A snow-covered Flemish village where armored soldiers on horseback descend on terrified families, seizing and killing infants while mothers kneel weeping and begging in the snow.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "colorado-utah-wildfire-firefighters",
    "headline": "Three firefighters die battling wildfires on the Colorado-Utah border",
    "overview": "Three wildland firefighters were killed fighting fast-moving wildfires along the Colorado-Utah state line, authorities said, with officials reporting the crew had been trying to shield themselves from advancing flames. The fires are among several burning across a parched American West during intense early-summer heat.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cp8l7mpmdggo?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxQcHgwOEVxNkNGS2o3XzBOY2RFaVdmc2dUbm54aGtyOFRDTFZkRnFWd3NTb09sR3RKZ3Nucl9EeG5uMGxKeWU5T21uUlloWEtJYlRQQVNJLV9LRlMxRDkxeW9iU0drdzFNSTlKMWJJUUR0VzZuOC1Ca09naWVDVC1RVlMyNnRRTzFlaUlOU3I3NUtFRzI2cXVRVg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/colorado-utah-wildfire-firefighters.png",
      "alt": "A wildfire burning across rugged forested terrain in the American West.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tacitus, The Annals, Book XV (chapters 38-44), on the Great Fire of Rome (AD 64), written c. AD 116",
        "excerpt": "A disaster followed, whether accidental or treacherously contrived by the emperor, is uncertain, as authors have given both accounts, worse, however, and more dreadful than any which have ever happened to this city by the violence of fire. ... The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city, with those narrow winding passages and irregular streets, which characterised old Rome.",
        "source": "Tacitus, The Annals, Book 15, trans. Alfred John Church and William Jackson Brodribb; hosted on Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15"
      },
      {
        "category": "historical",
        "title": "Samuel Pepys, Diary entry for 2 September 1666, the Great Fire of London",
        "excerpt": "So near the fire as we could for smoke; and all over the Thames, with one's face in the wind, you were almost burned with a shower of fire-drops. ... we saw the fire as only one entire arch of fire from this to the other side the bridge, and in a bow up the hill for an arch of above a mile long: it made me weep to see it. The churches, houses, and all on fire and flaming at once; and a horrid noise the flames made, and the cracking of houses at their ruine.",
        "source": "The Diary of Samuel Pepys, Vol. 45: August/September 1666, transcribed from the Pepysian Library shorthand manuscript; Project Gutenberg ebook #4167.",
        "href": "https://www.gutenberg.org/cache/epub/4167/pg4167.txt"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II (the burning of Troy), trans. John Dryden (1697)",
        "excerpt": "The palace of Deiphobus ascends\nIn smoky flames, and catches on his friends.\nUcalegon burns next: the seas are bright\nWith splendour not their own, and shine with Trojan light.",
        "source": "Virgil, The Aeneid, Book II, translated by John Dryden; Project Gutenberg ebook #228 (gutenberg.org).",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "Robert Frost, \"Fire and Ice\" (1920)",
        "excerpt": "Some say the world will end in fire,\nSome say in ice.\nFrom what I've tasted of desire\nI hold with those who favor fire.\nBut if it had to perish twice,\nI think I know enough of hate\nTo know that for destruction ice\nIs also great,\nAnd would suffice.",
        "source": "Robert Frost, \"Fire and Ice,\" in American Poetry 1922: A Miscellany; hosted on Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/American_Poetry_1922/Fire_and_Ice"
      },
      {
        "category": "artistic",
        "title": "Manuel de Falla, \"Danza ritual del fuego\" (Ritual Fire Dance) from El amor brujo (1915, rev. 1916-20) — MUSIC",
        "excerpt": "Falla's \"Ritual Fire Dance,\" the incandescent centerpiece of his Andalusian ballet El amor brujo, conjures fire through music: shivering tremolos that flicker like sparks, a snapping, obsessive melody that leaps and crackles, and surging orchestral flares that rise and fall like flames in the night. Written to accompany a midnight dance meant to exorcise a haunting spirit, it captures fire as both a consuming danger and an awesome, almost sacred force — a fitting echo of crews confronting an elemental blaze that demands everything of those who face it.",
        "source": "Manuel de Falla, El amor brujo (containing the Danza ritual del fuego); scores hosted at the International Music Score Library Project (imslp.org).",
        "href": "https://imslp.org/wiki/El_amor_brujo_(Falla,_Manuel_de)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1834-35) — VISUAL ARTWORK",
        "excerpt": "Turner painted the night the Houses of Parliament burned, turning catastrophe into the sublime: a wall of golden-white flame erupts into a roiling sky, its glare doubled in the dark river below where tiny crowds gather to watch. The towers of Westminster glow like embers against the inferno. The picture renders fire as Turner saw it that October night — beautiful, overwhelming, and indifferent to the human structures and figures dwarfed before it, much as a fast-moving wildfire dwarfs the firefighters who stand against it.",
        "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, October 16, 1834 (oil on canvas), Philadelphia Museum of Art; image via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/colorado-utah-wildfire-firefighters--art.png",
          "alt": "J. M. W. Turner's 1834-35 oil painting showing the Houses of Parliament engulfed in towering golden-white flames against a turbulent night sky, the fire reflected in the dark River Thames with small crowds of onlookers in the foreground.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "gojek-makarim-graft",
    "headline": "Gojek founder and former Indonesian minister Nadiem Makarim found guilty of corruption",
    "overview": "Nadiem Makarim, the founder of the Southeast Asian super-app Gojek and a former Indonesian education minister, was found guilty of corruption by a Jakarta court and sentenced to prison over a government laptop-procurement scheme. He had been one of the country's most prominent tech entrepreneurs before entering politics.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxOYnN6WVhHYTBtekxWRlRWOXl5LVpzRzJ5Tml6ZnByVjUwM1c2Sl9IMTNJUXhORVJ3UndKRHZwc2Z3VThlVFFYRTdZeE1fSldOd1lNajBuQXVtQlFqbkZQTjVlcmNFS3JhWk9sU0Q4OFlrTGFTS25LMjUyUlRmMjJQcTY5amtqWm10aXpMbUlfcDlNaUVXekFYSUpEZXF0QktSWHJ5SEl0SWMwVFM2S2hQY0M5bVZZWUcwUjRPdg?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c79yvw23yr9o?at_medium=RSS&at_campaign=rss"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/gojek-makarim-graft.png",
      "alt": "Nadiem Makarim, founder of Gojek and former Indonesian education minister.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, In Verrem (First Pleading against Verres), 70 BCE — prosecution of a corrupt Roman governor",
        "excerpt": "For there is now brought before your tribunal a man who is the embezzler of the public funds, the petty tyrant of Asia and Pamphylia, the robber who deprived the city of its rights, the disgrace and ruin of the province of Sicily. And if you come to a decision about this man with severity and a due regard to your oaths, that authority which ought to remain in you will cling to you still; but if that man's vast riches shall break down the sanctity and honesty of the courts of justice, at least I shall achieve this, that it shall be plain that it was rather honest judgment that was wanting to the republic, than a criminal to the judges or an accuser to the criminal.",
        "source": "Marcus Tullius Cicero, Against Verres, First Pleading, trans. C. D. Yonge; hosted at Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/Against_Verres/First_pleading"
      },
      {
        "category": "historical",
        "title": "Edmund Burke, Speech at the Impeachment of Warren Hastings, 1788 — a powerful official charged with plundering public office",
        "excerpt": "I impeach Warren Hastings, Esquire, of high crimes and misdemeanors. I impeach him in the name of the Commons of Great Britain in Parliament assembled, whose parliamentary trust he has betrayed. I impeach him in the name of all the Commons of Great Britain, whose national character he has dishonored. I impeach him in the name of the people of India, whose laws, rights, and liberties he has subverted; whose properties he has destroyed; whose country he has laid waste and desolate. I impeach him in the name and by virtue of those eternal laws of justice which he has violated. I impeach him in the name of human nature itself, which he has cruelly outraged, injured, and oppressed, in both sexes, in every age, rank, situation, and condition of life.",
        "source": "Edmund Burke, 'At the Trial of Warren Hastings,' in The World's Famous Orations, Vol. 6; hosted at Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/The_World's_Famous_Orations/Volume_6/At_the_Trial_of_Warren_Hastings"
      },
      {
        "category": "literary",
        "title": "Dante Alighieri, Inferno, Canto XXI (the Barrators/grafters in boiling pitch), c. 1320, Longfellow translation",
        "excerpt": "\"O Malebranche,\" he began to cry, / \"Behold one of the elders of Saint Zita; / Plunge him beneath, for I return for others / Unto that town, which is well furnished with them. / All there are barrators, except Bonturo; / No into Yes for money there is changed.\" / He hurled him down, and over the hard crag / Turned round, and never was a mastiff loosened / In so much hurry to pursue a thief.",
        "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto XXI, trans. Henry Wadsworth Longfellow (1867); hosted at Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_21"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, King Henry VIII, Act III Scene 2 — Cardinal Wolsey's 'fallen' farewell to greatness, c. 1613",
        "excerpt": "Farewell? a long farewell to all my greatness! / This is the state of man: to-day he puts forth / The tender leaves of hope, to-morrow blossoms, / And bears his blushing honours thick upon him; / The third day comes a frost, a killing frost, / And when he thinks, good easy man, full surely / His greatness is a-ripening, nips his root, / And then he falls, as I do. I have ventur'd, / Like little wanton boys that swim on bladders, / This many summers in a sea of glory, / But far beyond my depth.",
        "source": "William Shakespeare, The Famous History of the Life of King Henry the Eighth, Act III, Scene 2; Project Gutenberg (gutenberg.org).",
        "href": "https://www.gutenberg.org/cache/epub/2235/pg2235.txt"
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Boris Godunov (opera, 1869–1872) — MUSIC",
        "excerpt": "Mussorgsky's masterpiece dramatizes the rise and tormented fall of a ruler who attains supreme power but is hollowed out by hidden guilt. In the great monologue 'I have attained the highest power,' the once-revered Tsar finds his glory turned to ash, haunted by conscience until ruin overtakes him. The opera distills the theme of a celebrated public figure whose golden authority curdles into disgrace and downfall when the truth of his wrongdoing closes in.",
        "source": "Modest Mussorgsky, Boris Godunov, vocal and full scores (incl. Rimsky-Korsakov 1908 revision); hosted at IMSLP / Petrucci Music Library (imslp.org).",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "Giotto di Bondone, Injustice (Iniustitia), Scrovegni Chapel, Padua, c. 1306 — VISUAL ARTWORK",
        "excerpt": "Giotto personifies Injustice as a tyrant enthroned amid crumbling, fortress-like masonry, his hands curled like talons while violence and plunder unfold in the broken landscape below. Set opposite the serene figure of Justice, the fresco is a stark allegory of bad governance: the abuse of power and public trust collapses the very throne it sits upon. It speaks directly to the spectacle of a once-exalted official brought low by corruption.",
        "source": "Giotto di Bondone, 'Injustice,' fresco, Cappella degli Scrovegni (Arena Chapel), Padua, c. 1306; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Giotto_-_Scrovegni_-_-50-_-_Injustice.jpg",
        "image": {
          "src": "/covers/gojek-makarim-graft--art.png",
          "alt": "Giotto's fresco 'Injustice' (c. 1306): a tyrannical figure enthroned amid crumbling, turreted walls, with scenes of violence and robbery in the wilderness below, personifying corrupt and lawless rule.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "automakers-copper-aluminium",
    "headline": "Ferrari and BMW join Tesla in switching car wiring from copper to cheaper aluminium",
    "overview": "Carmakers including Ferrari and BMW are following Tesla and Chinese manufacturers in replacing copper with lighter, cheaper aluminium in parts of their vehicles' wiring. The shift, driven by copper's soaring price and supply constraints, could ripple through global metals markets as the auto industry electrifies.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxNZ2lPRHR2cWFNZDNkUldYQlBkWnNnU0dZU1VMQmZGMHZIWW1YamNpLU9SNktDc1htRnJIVF9QcFVlY1pzNkdOYjZlckduODlyZFdrVXRpSWNHNnEzWW5PblV3ZWFZV3NOUkFoRlZkRnZUS2FabGNvM2xqRXBjZFhOblI4LVRlaEItTmlkclpFbmdBXy10M21ZT25ITXZ5NW1xTkI3ZVcyV1p6enBxQy1jcmEwZFlIYVdGdThGV2pzWV9jaU1L?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNU01ySzZTWkhvMkNfeV95V3FRWTlhVDZVZGxkWmFXelBVbGdmVUNMWWNodnZQRFFaSUlsWk1CQWFrVTEyRk9qOU5lQTFQSlMybjNaMV9SNk9wbXVaXzRRdDlxeV9wUjJxZ1ZUVjNTX3lOd3BWSnVXMkNmajZtMUdpM09yRGFwT3pyakU2VUZMdUtSVndsN2pOZktPR0FVbUZzSnAzeUhGV25hQjNkTVE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/automakers-copper-aluminium.png",
      "alt": "Coiled copper-clad aluminium wire of the kind increasingly used in vehicle wiring.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Setting the Aluminium Apex of the Washington Monument — Harper's Weekly, December 20, 1884",
        "excerpt": "When the Washington Monument was capped on December 6, 1884, its crowning point was cast not from gold or silver but from aluminium — then so difficult to refine that the 100-ounce tip was the largest single piece of the metal ever produced, and aluminium itself was reckoned a precious substance dearer than silver. This Harper's Weekly illustration records the moment workmen set that gleaming apex atop the tallest structure on earth: a humble-seeming light metal chosen for the most prestigious place imaginable. Within two years the Hall-Heroult process collapsed aluminium's price, and the once-precious crown became, in material terms, ordinary — the very inversion now playing out as carmakers reach for cheap aluminium where copper has grown dear.",
        "source": "Harper's Weekly, December 20, 1884, pp. 839, 844-845; engraving of P. H. McLaughlin setting the aluminium-tipped capstone on the Washington Monument. Hosted on Wikimedia Commons (source: Library of Congress Prints and Photographs Division).",
        "href": "https://commons.wikimedia.org/wiki/File:Washington_Monument_-_Setting_the_capstone_-_Harper%27s_Weekly.png"
      },
      {
        "category": "historical",
        "title": "\"Topping Off the Tip\": The Washington Monument's Aluminium Point — U.S. National Archives, Prologue (2014)",
        "excerpt": "This National Archives account describes how, in 1884, the metal we now throw away in cans was rare enough to crown a national monument. As the article puts it, \"Things made of aluminum are commonplace now, but when the monument was completed in 1884, the substance was considered a precious metal\" — it then cost about $1.10 an ounce, twice the price of silver. The chemist William Frishmuth spent decades and tens of thousands of dollars learning to cast it, charging $225 for the small pyramid. The episode is a perfect mirror of the present story in reverse: a metal's worth is never fixed by its nature but by the difficulty of getting it, and when that difficulty shifts, so does which metal industry prizes and which it discards.",
        "source": "Eric Niderost, \"Topping Off the Tip,\" Prologue Magazine, Vol. 46, No. 2 (Summer 2014), U.S. National Archives and Records Administration (archives.gov).",
        "href": "https://www.archives.gov/publications/prologue/2014/summer/aluminum-tip-monument"
      },
      {
        "category": "literary",
        "title": "Hesiod, Works and Days — The Ages of Man (c. 700 BC; Evelyn-White translation)",
        "excerpt": "Of the third, bronze race Hesiod writes: \"Their armour was of bronze, and their houses of bronze, and of bronze were their implements: there was no black iron.\" Of the present, fallen age he laments: \"For now truly is a race of iron, and men never rest from labour and sorrow by day, and from perishing by night,\" wishing \"that I were not among the men of the fifth generation, but either had died before or been born afterwards.\" Hesiod's scheme — each age named for its defining metal — is the oldest Western frame for what we are witnessing: an industry sliding, by necessity, out of one metal's era and into another's.",
        "source": "Hesiod, Works and Days, trans. Hugh G. Evelyn-White (1914), \"The Five Ages.\" Project Gutenberg eBook #348 (gutenberg.org).",
        "href": "https://www.gutenberg.org/files/348/348-h/348-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book I — The Iron Age (8 AD; Riley translation, 1851)",
        "excerpt": "Ovid traces humanity's decline from gold to iron, and locates the fall precisely in the digging of metals from the ground: \"And not only was the rich soil required to furnish corn and due sustenance, but men even descended into the entrails of the Earth; and riches were dug up, the incentives to vice, which the Earth had hidden, and had removed to the Stygian shades.\" In Ovid the worth of metals drives men into the earth and into strife; the modern carmaker, by contrast, descends after the cheaper metal to escape the precious one's price — but the deep link he draws between buried ore and the fortunes of an age is exactly the one rumbling through today's copper and aluminium markets.",
        "source": "Ovid, Metamorphoses, Book I (\"The Iron Age\"), trans. Henry T. Riley (1851). Project Gutenberg eBook #21765 (gutenberg.org).",
        "href": "https://www.gutenberg.org/cache/epub/21765/pg21765.txt"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Siegfried, WWV 86C — Act I \"Forging Song\" (Schmiedelieder), 1871 — MUSIC",
        "excerpt": "In the first act of Siegfried, the young hero reforges the shattered sword Nothung from its fragments, and Wagner sets the labour to music: hammer-blows fall on rhythmic anvil strokes while Siegfried sings \"Nothung! Nothung! Neidliches Schwert!\" and bellows roar in the orchestra. The whole Ring turns on metal — the Rhinegold wrenched into a ring of power, the sword melted down and made new — so that forging becomes the cycle's central act of transformation. Wagner dramatizes exactly what an assembly line now performs in prose: the breaking down of one metal stock and its remaking into the indispensable tool of a new age.",
        "source": "Richard Wagner, Siegfried (Der Ring des Nibelungen, third evening), WWV 86C, completed 1871. Full scores and vocal scores at the International Music Score Library Project (imslp.org).",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Diego Velazquez, The Forge of Vulcan (La Fragua de Vulcano), 1630 — VISUAL ARTWORK",
        "excerpt": "Velazquez paints the god of metalworking interrupted mid-labour: Apollo, haloed and radiant, brings unwelcome news to Vulcan and his half-naked smiths, who freeze with hammers raised over a white-hot bar at the anvil. The forge — glowing iron, blackened tools, the sweat and muscle of men who turn raw metal into finished things — is rendered with unidealized realism, dignifying ordinary metallurgical work as the engine of the made world. It is the human face of the abstract market story: behind every decision to swap copper for aluminium stand the workshops, the heat, and the craft of shaping base metal into value.",
        "source": "Diego Velazquez, The Forge of Vulcan, 1630, oil on canvas, 223 x 290 cm, Museo Nacional del Prado, Madrid. Image hosted on Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/automakers-copper-aluminium--art.png",
          "alt": "Velazquez's 1630 painting The Forge of Vulcan: the radiant god Apollo speaks to a startled Vulcan and four muscular blacksmiths who pause at the anvil, a bar of metal glowing white-hot, amid the dark tools and fire of an antique forge.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "morocco-eliminate-netherlands-world-cup",
    "headline": "Morocco knock the Netherlands out of the World Cup on penalties in Monterrey",
    "overview": "Morocco beat the Netherlands in a penalty shootout in Monterrey to advance at the 2026 World Cup, ending the Dutch campaign after a tense match. The result extended a strong run for African and underdog sides at the tournament and set off celebrations among Moroccan fans.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxOOEFRR3U1THl0VW5kSkc3QWhKbW50TW9Cc2xmd2prSVJkdUFnbUZ2TmF2R1NIaGRJczBCb2xTM3M4U2xwRlJvQlJENm13cVM3bjhENEFoaUc1bUtQRXhnczJJenBtRVZ5emoxMXV0Q1lnYzhHRlZXdmU4bDVHcTUxSWxkTjBlbHdOQ1I3MVVRdC11YTVGNmRTQnRWalNrckVFRXBUVlpqU0NJbXoyNVR5VDcwRXFRM1p6SWhJ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxOMXFhSEQtTTc5dG16dnN6WnhMcjdyaXRMaDNoXy12b0ktNWlpY29QTmdYYlNOWXJhdGwyeFkyR2J3a2dQa2ZrWU9ZbmhnQVJOd2hYRXNTN0VwSnM0VEJNSXRYUFRJVS1MZ2N4cnpQekRNOVlobUhBNnA3T0JnTXU3ZUxUOHRLNEpLS3ZmX1FXLTVMd3lMWGxtMHN2U2k4UlItamw3LV96UWpiUVJtZjRaWlFHMFpvUUE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/morocco-eliminate-netherlands-world-cup.png",
      "alt": "A floodlit football stadium at night after a dramatic penalty shootout.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Livy, History of Rome, Book 1.24-25: The Combat of the Horatii and the Curiatii (c. 27-9 BC)",
        "excerpt": "So, that he might encounter each singly, he took to flight, assuming that they would follow as well as their wounds would allow. He had run some distance from the spot where the combat began, when, on looking back, he saw them following at long intervals from each other, the foremost not far from him. He turned and made a desperate attack upon him... had already slain his foe and, flushed with victory, was awaiting the second encounter.",
        "source": "Titus Livius (Livy), The History of Rome, Book 1, chapter 25, trans. Rev. Canon Roberts (1912); hosted by the Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book%3D1:chapter%3D25"
      },
      {
        "category": "historical",
        "title": "David and Goliath, 1 Samuel 17 (King James Bible, 1611)",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied... And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth. So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "The Holy Bible, King James Version (1611), 1 Samuel 17:45-50; hosted by Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book 23: The Boxing Match of Epeius and Euryalus at the Funeral Games of Patroclus (c. 8th century BC)",
        "excerpt": "Let him draw nigh, whoso is to bear as his prize the two-handled cup... But upon him goodly Epeius rushed as he peered for an opening, and smote him on the cheek, nor after that, methinks, did he long stand upright, for even there did his glorious limbs sink beneath him.",
        "source": "Homer, The Iliad, Book 23, trans. A.T. Murray (1924); hosted by the Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=23:card=664"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book 5: The Boxing Match of Entellus and Dares at the Funeral Games of Anchises (c. 19 BC)",
        "excerpt": "He lays on load with either hand, amain, / And headlong drives the Trojan o'er the plain; / Nor stops, nor stays; nor rest nor breath allows; / But storms of strokes descend about his brows, / A rattling tempest, and a hail of blows.",
        "source": "Virgil, The Aeneid, Book 5, trans. John Dryden; hosted by the Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=5:card=424"
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, \"See, the Conqu'ring Hero Comes\" from Judas Maccabaeus, HWV 63 (1746-47) — MUSIC",
        "excerpt": "Handel's triumphal chorus, sung as the victorious hero returns to his people, became the supreme musical emblem of acclaimed victory in the English-speaking world. Its rising trumpet-and-drum exultation captures exactly the roar that greeted Morocco's winning penalty in Monterrey: the multitude rising as one to hail an unexpected conqueror, the agony of the contest dissolving into pealing, processional joy.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63, Act III, No. 35; scores hosted by the International Music Score Library Project (IMSLP / Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, David with the Head of Goliath (c. 1606-07) — VISUAL ARTWORK",
        "excerpt": "Caravaggio shows the young, slight victor holding aloft the severed head of the fallen giant, his expression caught between triumph and a strange melancholy. The painting distills the David-versus-Goliath archetype that frames Morocco's upset: the smaller, doubted challenger who topples the towering favourite, and the unsettling weight that comes with having felled a colossus before a watching world.",
        "source": "Michelangelo Merisi da Caravaggio, David with the Head of Goliath, oil on poplar, c. 1606-07, Kunsthistorisches Museum, Vienna; image hosted by Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(c.1606-7).jpg",
        "image": {
          "src": "/covers/morocco-eliminate-netherlands-world-cup--art.png",
          "alt": "Caravaggio's chiaroscuro painting of the youthful David holding a sword and grasping by the hair the severed, shadowed head of the giant Goliath against a dark background.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "adani-ports-msc-stake",
    "headline": "Adani Ports to sell a 49% stake in an Indian port to shipping giant MSC for $1.4 billion",
    "overview": "India's Adani Ports agreed to sell a 49% stake in one of its Indian ports to the Swiss-based shipping group MSC, the world's largest container line, for about $1.4 billion. The deal deepens ties between India's biggest private port operator and a global carrier and reshapes part of the country's port landscape.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxORDZyZlF2Y2h6RGZiVE5VSzBFb3VZQnB2bXVIdDJkM1Q4SkNHMVJfb2lCTmhBYlNHeUVvZkxvWFB1Qmo0VlhPaFM5dUJTcDJfbE5IXzFZTUxqU0dQdnVxUUhlaEhXbUh0SGpINXItR2lCZTduUUowVHZMYk1vSUpJRDFtU0xYbTJPYUJiVTdiczhhOXp0cV9va1dHYkd2YzIxTGdTUkhR?oc=5"
      },
      {
        "name": "WSJ",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxQcnpVR3pEYzBQb3d5VkhIUm1sdzBGNGQ0ZXdXRFhzWnBib2dKcWdWUEdBN1R4c1dHYzJVckxNNTdRdVFqRDZNcURxVDBkLVU2cldrc3I3SnB2VTZrR0J3S0hwRmlTZm80N3Z4a1ZQUDROTVRXM3FEWjd4M1ZESnVQMUVmb3NEUHg1SWZPM0lSRXlfYk1ZOGNmN0dKRTN5RVlRRDFielVYTk1DM2JyTXU4Zk8tRHh4cExKbFhnc3ZWTQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/adani-ports-msc-stake.png",
      "alt": "Container cranes and quays at Mundra Port in Gujarat, India.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Periplus of the Erythraean Sea on the Indian port of Barygaza (Schoff translation, 1st century AD) — Greco-Roman merchant's guide to Indian Ocean trade",
        "excerpt": "There are imported into this market-town, wine, Italian preferred, also Laodicean and Arabian; copper, tin, and lead; coral and topaz; thin clothing and inferior sorts of all kinds; bright-colored girdles a cubit wide; storax, sweet clover, flint glass, realgar, antimony, gold and silver coin, on which there is a profit when exchanged for the money of the country... There are exported from these places spikenard, costus, bdellium, ivory, agate and carnelian, lycium, cotton cloth of all kinds, silk cloth, mallow cloth, yarn, long pepper and such other things as are brought here from the various market-towns. Those bound for this market-town from Egypt make the voyage favorably about the month of July, that is Epiphi.",
        "source": "Anonymous, The Periplus of the Erythraean Sea, trans. Wilfred H. Schoff (1912), Section 49, hosted at Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Periplus_of_the_Erythraean_Sea"
      },
      {
        "category": "historical",
        "title": "Charter of the Dutch East India Company (VOC), 20 March 1602 — the world's first chartered megacorporation of sea trade",
        "excerpt": "As the prosperity of the united Netherlands consists principally of the navigation, trade and commerce, which have been carried on from these countries from time immemorial, and which from time to time have been praiseworthily increased, not only with the neighbouring kingdoms and provinces, but also with those further away from these countries in Europe, Asia, and Africa...",
        "source": "States General of the United Netherlands, Charter of the Dutch East India Company (1602), English translation hosted at Wikisource",
        "href": "https://en.wikisource.org/wiki/Translation:VOC_charter"
      },
      {
        "category": "literary",
        "title": "The Lament over Tyre, Ezekiel 27 (King James Bible, 1611) — the prophet's dirge for the great merchant city at the entry of the sea",
        "excerpt": "And say unto Tyrus, O thou that art situate at the entry of the sea, which art a merchant of the people for many isles, Thus saith the Lord GOD; O Tyrus, thou hast said, I am of perfect beauty. Thy borders are in the midst of the seas, thy builders have perfected thy beauty... The ships of Tarshish did sing of thee in thy market: and thou wast replenished, and made very glorious in the midst of the seas. Thy rowers have brought thee into great waters: the east wind hath broken thee in the midst of the seas.",
        "source": "The Book of the Prophet Ezekiel 27:3-4, 25-26, King James Version, Project Gutenberg eBook #10",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Merchant of Venice, Act 1 Scene 1 (1600) — Antonio's argosies riding the flood like princes of the sea",
        "excerpt": "Your minde is tossing on the Ocean, There where your Argosies with portly saile Like Signiors and rich Burgers on the flood, Or as it were the Pageants of the sea, Do ouer-peere the pettie Traffiquers That curtsie to them, do them reuerence As they flye by them with their wouen wings",
        "source": "William Shakespeare, The Merchant of Venice, Act 1, Scene 1 (First Folio spelling), Project Gutenberg eBook #2243",
        "href": "https://www.gutenberg.org/cache/epub/2243/pg2243.txt"
      },
      {
        "category": "artistic",
        "title": "Felix Mendelssohn, The Hebrides (Fingal's Cave) Overture, Op. 26 (1830-32) — MUSIC",
        "excerpt": "Mendelssohn's concert overture, sparked by a visit to the basalt sea-cave of Staffa in the Hebrides, conjures the swell and surge of cold northern waters in its rolling opening figure. Its undulating strings and brooding brass evoke ships meeting the open sea and the immense, indifferent power of the ocean over which trade and fortunes move. The piece resonates with a story of carriers and harbours, where maritime might and the meeting of waters decide the wealth of nations.",
        "source": "Felix Mendelssohn, The Hebrides (Fingal's Cave), Op. 26, MWV P 7 (full scores), hosted at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Hebrides,_Op.26_(Mendelssohn,_Felix)"
      },
      {
        "category": "artistic",
        "title": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba, 1648 (National Gallery, London) — VISUAL ARTWORK",
        "excerpt": "Claude Lorrain's luminous harbour glows at the hour of departure: stately classical palaces frame a busy quay where merchant vessels ride at anchor and figures load a launch beneath a rising sun. The Queen of Sheba sets sail to meet King Solomon, making the painting an image of two rich trading powers brought together across the water. Its grand port, gateway between nations and a meeting place of wealth, mirrors a deal that binds a global shipping line to an Indian harbour.",
        "source": "Claude Lorrain (Claude Gellee), Seaport with the Embarkation of the Queen of Sheba, oil on canvas, 1648, National Gallery London (NG14); image via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Lorrain_008.jpg",
        "image": {
          "src": "/covers/adani-ports-msc-stake--art.png",
          "alt": "Claude Lorrain's 1648 painting Seaport with the Embarkation of the Queen of Sheba: a sunlit classical harbour with grand palace facades on the right, tall-masted merchant ships at anchor, and richly dressed figures descending stone steps to board a small boat as the sun rises over the calm sea.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "australia-sues-amazon-prime-ads",
    "headline": "Australia's consumer regulator sues Amazon over ads added to Prime Video",
    "overview": "Australia's competition watchdog, the ACCC, sued an Amazon unit, alleging it misled about 850,000 Prime subscribers by introducing advertisements into Prime Video and then charging an extra fee to remove them. Amazon began showing ads on the service after customers had signed up expecting ad-free streaming.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxNbEV0VVVMbHRrdXQzOVJiME1OS1BTVmVkd1R2OXJNNUNSc1hwdzJDODFsTU5sQXZPVlNhT3BDMlY1bHI2RkM3aDNRdXZFWWc4VVY0dFUxYnd3M0hvS0dFU2JSeTE5RXdtM3VsZlJVREd6bGg4LU1lWkE3STdBdERxWDYzM2psRV9hdHp1NGhnMVR3Y28tSDVIZ2dBSUNUWDQ2NmhhREZoR1lfVmlZYWxlT1VWbWFPa1JCS0tF?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOd3djdXdaa0k4ajBvX29PRmR6SUx6eXM5TEh2R3V1S09pbFhza09PSWF3akRXbkgycHM1bXhnamtLZHhpdXl4bzlqbTVuNm16M285ZFMyU2JfX3kwUkJPdVpydjJHazhwdnJmWTNCMnpBUjJMNXNjUWhvSlZGT3V1UXFFaENEWGpfampqWHFvNEpFNHktTFJOQlJXRmJmMER5VVlPOTRGMDYtaWQxM014d0FNbEJrQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/australia-sues-amazon-prime-ads.png",
      "alt": "A television screen interrupted by advertising in a darkened living room.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911)",
        "excerpt": "The unanimous opinion of Chief Justice White held that John D. Rockefeller's petroleum combine had unlawfully monopolized the trade and ordered it broken up, reading the Sherman Act's ban on 'every contract... in restraint of trade' through the lens of a 'rule of reason.' It is the archetype of the public watchdog calling a private giant to account: a regulator dragging the dominant seller into court to answer for the way it had bent the market to its own advantage. The ACCC's suit against Amazon stands in this lineage of antitrust and consumer-protection enforcement, where the state insists that scale does not exempt a company from honest dealing.",
        "source": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911), official U.S. Reports vol. 221, hosted by the Library of Congress (tile.loc.gov).",
        "href": "https://tile.loc.gov/storage-services/service/ll/usrep/usrep221/usrep221001/usrep221001.pdf"
      },
      {
        "category": "historical",
        "title": "Magna Carta, clause 35 (1215)",
        "excerpt": "Let there be one measure of wine throughout our whole realm; and one measure of ale; and one measure of corn, to wit, 'the London quarter'; and one width of cloth (whether dyed, or russet, or 'halberget'), to wit, two ells within the selvedges; of weights also let it be as of measures.",
        "source": "Magna Carta (1215), clause 35, English translation, The Avalon Project, Lillian Goldman Law Library, Yale Law School (avalon.law.yale.edu).",
        "href": "https://avalon.law.yale.edu/medieval/magna.asp"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, The Merchant of Venice, Act IV, Scene 1 (Portia and the bond), c. 1596-98",
        "excerpt": "Tarry a little; there is something else. / This bond doth give thee here no jot of blood; / The words expressly are 'a pound of flesh:' / Take then thy bond, take thou thy pound of flesh; / But, in the cutting it, if thou dost shed / One drop of Christian blood, thy lands and goods / Are, by the laws of Venice, confiscate / Unto the state of Venice.",
        "source": "William Shakespeare, The Merchant of Venice, Act IV, Scene 1, Perseus Digital Library, Tufts University (perseus.tufts.edu).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.03.0050:act=4:scene=1"
      },
      {
        "category": "literary",
        "title": "Aesop, 'The Wolf and the Crane' (V. S. Vernon-Jones translation, 1912)",
        "excerpt": "A WOLF once got a bone stuck in his throat. So he went to a Crane and begged her to put her long bill down his throat and pull it out. 'I'll make it worth your while,' he added. The Crane did as she was asked, and got the bone out quite easily. The Wolf thanked her warmly, and was just turning away, when she cried, 'What about that fee of mine?' 'Well, what about it?' snapped the Wolf, baring his teeth as he spoke; 'you can go about boasting that you once put your head into a Wolf's mouth and didn't get it bitten off. What more do you want?'",
        "source": "Aesop, 'The Wolf and the Crane,' in Aesop's Fables, trans. V. S. Vernon-Jones (1912), Wikisource (en.wikisource.org).",
        "href": "https://en.wikisource.org/wiki/%C3%86sop's_Fables_(V._S._Vernon-Jones)/The_Wolf_and_the_Crane"
      },
      {
        "category": "artistic",
        "title": "Charles Gounod, 'Le veau d'or' (Song of the Golden Calf) from Faust, 1859 — MUSIC",
        "excerpt": "In this Act II aria Mephistopheles steps before the crowd and proclaims that the golden calf still stands and that all of humankind dances around its pedestal, worshiping money while Satan conducts the round. The devil's sardonic hymn to gold as the true idol of the world resonates with a streaming giant that quietly turned a paid promise into a new revenue stream, charging tribute to switch the advertisements back off. The full public-domain score, including 'Le veau d'or' in Act II, is available on IMSLP.",
        "source": "Charles Gounod, Faust (1859), libretto by Jules Barbier and Michel Carre; full vocal and orchestral scores, IMSLP / Petrucci Music Library (imslp.org).",
        "href": "https://imslp.org/wiki/Faust_(Gounod,_Charles)"
      },
      {
        "category": "artistic",
        "title": "Marinus van Reymerswaele, The Tax Collectors, c. 1540s — VISUAL ARTWORK",
        "excerpt": "Two grasping officials in gaudy, outmoded costume hunch over a ledger and a heap of coins, their pinched, avaricious faces caricaturing the bureaucracy of money and exaction. The painting satirizes those who turn the counting of other people's money into private gain, recording and re-tallying every charge owed. It is a fitting emblem for a dispute over fees levied after the bargain was struck, where a powerful collector adds a new toll to an account the customer thought was already settled.",
        "source": "Marinus van Reymerswaele, The Tax Collectors (oil on panel, c. 1540s), Louvre Museum, Paris; image via Wikimedia Commons (commons.wikimedia.org).",
        "href": "https://commons.wikimedia.org/wiki/File:Marinus_van_Reymerswale_-_The_Tax_Collectors_-_WGA19332.jpg",
        "image": {
          "src": "/covers/australia-sues-amazon-prime-ads--art.png",
          "alt": "Renaissance oil painting of two tax collectors in ornate red and green costume seated at a table, one writing in a ledger beside stacks of gold coins, with sour, exaggerated faces.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "uk-cma-app-store-payments",
    "headline": "UK regulator proposes forcing Apple and Google to open their app stores to rival payment systems",
    "overview": "Britain's Competition and Markets Authority proposed requiring Apple and Google to let app developers steer users to alternative, cheaper payment options outside the companies' own app-store billing. The move, part of new powers over firms with 'strategic market status,' could cut the commissions the two charge developers.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNVGZHZ0IzdUU5OXVwTFFxcjhpbHhucnNJMHpjb2tNZmhXWnBoWF9BRGdiNFR1OEg0bXJuYW1FR2JSeTBRZ05JN1UyQVdfcm1vUjJoaXpwV3J5VVpKOThDaXgyRVhTYkJWdzRIRmJlX3lKOEh6b01hbm91T3d6WlZfOFc5VXBLQ0ZzQmd3RDZPaUlIMi1UZWxWUGlRLVZtZ0xGWUJhYlBnUDJTNVU?oc=5"
      },
      {
        "name": "The Independent",
        "href": "https://news.google.com/rss/articles/CBMihwFBVV95cUxNYkJPU3plSWRPZ3Z1TjBXUXJjYlFJOFVJdThYYUhNbDNjWkFLMlVRUFQxU2RjbGg1S0lHNVFYX2dlLXhPYVU0ZXFJb2dLYVN2MVh2dGxIUnBNZ0Z0Sjc1MXJKMUdyZ2ZDTXV6TGF2LTl4Y3RHRnlvRWhNTTMwRFhDOXZNSWNrb1U?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/uk-cma-app-store-payments.png",
      "alt": "A smartphone displaying a grid of app icons, held in the hand.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Statute of Monopolies (1624, 21 Jac. 1, c. 3)",
        "excerpt": "All monopolies and all commissions, grants, licenses, charters, and letters patents heretofore made or granted... are altogether contrary to the laws of this realm, and so are and shall be utterly void and of none effect. Born of Parliament's revolt against the Crown's habit of selling exclusive rights to court favourites, this is the ancestor of every modern law against the private gatekeeper who taxes all who would trade; the CMA's move against Apple and Google's billing monopolies echoes its founding principle that an exclusive right to charge toll on commerce is no natural property but a privilege the law may declare void.",
        "source": "Statute of Monopolies (An Act concerning Monopolies and Dispensations with Penal Laws), English Parliament, 1623/24, hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Statute_of_Monopolies"
      },
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911)",
        "excerpt": "The decision dissolved Rockefeller's petroleum colossus into competing firms, the canonical instance of public law breaking an overmighty private power that had taxed an entire industry. Reading the Sherman Act's ban on combinations 'in restraint of trade' through a 'rule of reason,' the Court insisted that no firm is too large to answer to the public for how it bends a market. As regulators once pried open the pipelines and refineries, Britain's CMA now proposes to pry open the digital storefront, forcing the gatekeeper to permit rival routes to the customer's purse.",
        "source": "United States Supreme Court, Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911), hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States"
      },
      {
        "category": "literary",
        "title": "Wilhelm Tell by Friedrich Schiller (1804), trans. Theodore Martin",
        "excerpt": "Soon she will come to count our sheep, our cattle, / To portion out the Alps, e'en to their summits, / And in our own free woods to hinder us / From striking down the eagle or the stag; / To set her tolls on every bridge and gate, / Impoverish us to swell her lust of sway, / And drain our dearest blood to feed her wars.",
        "source": "Friedrich Schiller, Wilhelm Tell (1804), English translation by Theodore Martin, Project Gutenberg (eBook #6788).",
        "href": "https://www.gutenberg.org/files/6788/6788-h/6788-h.htm"
      },
      {
        "category": "literary",
        "title": "\"The Three Billy-Goats Gruff,\" from Popular Tales from the Norse, trans. George Webbe Dasent (1859)",
        "excerpt": "\"WHO'S THAT tramping over my bridge?\" roared the Troll. \"IT'S I! THE BIG BILLY-GOAT GRUFF,\" said the billy-goat, and he had such a big voice of his own. \"Well, come along! I've got two spears, and I'll poke your eyeballs out at your ears; I've got besides two curling-stones, and I'll crush you to bits, body and bones.\" That was what the big billy-goat said; and so he flew at the Troll, and poked his eyes out with his horns, and crushed him to bits, body and bones, and tossed him out into the burn.",
        "source": "Asbjornsen & Moe, \"The Three Billy-Goats Gruff,\" in Popular Tales from the Norse, trans. George Webbe Dasent (Edinburgh, 1859), hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/Popular_Tales_from_the_Norse/The_Three_Billy-Goats_Gruff"
      },
      {
        "category": "artistic",
        "title": "\"O welche Lust\" (Prisoners' Chorus), Act I Finale of Fidelio, Op. 72, by Ludwig van Beethoven (1814) — MUSIC",
        "excerpt": "Beethoven's prisoners, briefly released into the courtyard, raise a hushed, swelling hymn to liberty — 'O welche Lust, in freier Luft den Atem leicht zu heben!' ('Oh, what joy, in the open air freely to breathe again!'). The chorus is music's supreme image of a confined multitude tasting the open air denied them, of bars and walls giving way. Its resonance with a market opened to the light — developers and users no longer penned within a single billing gate — needs no translation; it is the sound of a closed enclosure breaking open.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72, Act I Finale, No. 10, \"O welche Lust, in freier Luft\" (Prisoners' Chorus); full scores hosted at IMSLP (International Music Score Library Project).",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Christ Driving the Money Changers from the Temple by El Greco (c. 1570), Minneapolis Institute of Art — VISUAL ARTWORK",
        "excerpt": "And Jesus went into the temple, and began to cast out them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves... and he taught, saying unto them, Is it not written, My house shall be called of all nations the house of prayer? but ye have made it a den of thieves. (Mark 11:15-17, KJV.) El Greco freezes the instant of overturned tables and scattered coin — the gatekeepers' commerce upended by a higher authority, the perfect visual analogue for a regulator overturning the toll-takers' tables at the door of the digital marketplace.",
        "source": "El Greco (Domenikos Theotokopoulos), Christ Driving the Money Changers from the Temple, c. 1570, oil on panel, Minneapolis Institute of Art (acc. 24.1); image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Greco_Christ_Driving_the_Money_Changers_from_the_Temple.jpg",
        "image": {
          "src": "/covers/uk-cma-app-store-payments--art.png",
          "alt": "El Greco's painting Christ Driving the Money Changers from the Temple: Christ in rose and blue robes raises a cord of whips amid a crowd of merchants and moneychangers who recoil and scatter, their tables and goods overturned, within a classical temple architecture.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "sothebys-london-record-sale",
    "headline": "Sotheby's London sale of the Joe Lewis collection brings a record $392.6 million",
    "overview": "A pair of Sotheby's auctions in London, led by works from the collection of British businessman Joe Lewis, brought in about $392.6 million, a European record for the house, with a Modigliani nude setting an auction high. The strong result signaled resilience at the top end of the art market.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/sothebys-london-masterpiece-sale-earns-392-million-1234753425/"
      },
      {
        "name": "CBS News",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNZF9TcHo3T0puaDEtZGRyWWQwSGZVNHRCblloZkZYRkhDbjNMdXdHSXNQTkRoZk9QZFhYMEpzelNzQ1dKVlVBSi0tTmk3MFhqS2JxREpQaVoxYkRwdjA2em9RT3V3dEQ2VndtSi1adE56ZjE5dV9nN1o5RmhlM0Y4V2hDX3hJTDBIbjlpc3pickg4WXk0MW1YYUV4RDB6Y3RBS0RUYw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/sothebys-london-record-sale.png",
      "alt": "Sotheby's auction house on New Bond Street in London.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Hamilton Palace Sale, Christie, Manson & Woods, London (1882)",
        "excerpt": "For seventeen days in the summer of 1882 the contents of Hamilton Palace passed under the hammer at Christie's, some 2,213 lots of pictures, French furniture, tapestries, plate and curiosities dispersed to relieve the debts of the 12th Duke of Hamilton. Gerald Reitlinger called it 'unquestionably the most magnificent sale of a single collection that has ever been held anywhere.' Like the Sotheby's dispersal of Joe Lewis's pictures, a single great private cabinet was unbound lot by lot and converted, at the fall of the hammer, into a record-breaking river of money, even as buyers from across the world competed to carry off its treasures.",
        "source": "\"The Hamilton Palace Collection: Illustrated Priced Catalogue,\" Christie, Manson & Woods, London, 1882; hosted at the Internet Archive.",
        "href": "https://archive.org/details/hamilton00chri"
      },
      {
        "category": "historical",
        "title": "Pliny the Elder, Natural History, Book XXXV — Mummius, King Attalus, and the price of a painting (1st c. AD)",
        "excerpt": "The high estimation in which the paintings of foreigners were held at Rome commenced with Lucius Mummius, who, from his victories, acquired the surname of \"Achaicus.\" For upon the sale of the spoil on that occasion, King Attalus having purchased, at the price of six thousand denarii, a painting of Father Liber by Aristides, Mummius, feeling surprised at the price, and suspecting that there might be some merit in it of which he himself was unaware, in spite of the complaints of Attalus, broke off the bargain, and had the picture placed in the Temple of Ceres; the first instance, I conceive, of a foreign painting being publicly exhibited at Rome.",
        "source": "Pliny the Elder, \"The Natural History,\" Book XXXV, ch. 8, trans. John Bostock & H. T. Riley (London: Bohn, 1857); The Natural History of Pliny, Volume VI, Project Gutenberg ebook #62704.",
        "href": "https://www.gutenberg.org/cache/epub/62704/pg62704-images.html"
      },
      {
        "category": "literary",
        "title": "Honore de Balzac, Cousin Pons (1847) — the secret collector and his hidden museum",
        "excerpt": "Since Pons returned from Italy, he had regularly spent about two thousand francs a year upon a collection of masterpieces of every sort and description, a collection hidden away from all eyes but his own; and now his catalogue had reached the incredible number of 1907.",
        "source": "Honore de Balzac, \"Cousin Pons,\" trans. Ellen Marriage; Project Gutenberg ebook #1856.",
        "href": "https://www.gutenberg.org/files/1856/1856-h/1856-h.htm"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde, The Picture of Dorian Gray (1890) — beauty bought at the price of a soul",
        "excerpt": "How sad it is! I shall grow old, and horrible, and dreadful. But this picture will remain always young. It will never be older than this particular day of June.... If it were only the other way! If it were I who was to be always young, and the picture that was to grow old! For that—for that—I would give everything! Yes, there is nothing in the whole world I would not give! I would give my soul for that!",
        "source": "Oscar Wilde, \"The Picture of Dorian Gray,\" Ch. II; Project Gutenberg ebook #174.",
        "href": "https://www.gutenberg.org/files/174/174-h/174-h.htm"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold, WWV 86A (composed 1854) — the curse of gold and the lust for treasure — MUSIC",
        "excerpt": "In the prologue to the Ring, Alberich renounces love to seize the Rhinegold and forge it into a ring of limitless power, and from that theft flows a tide of greed, bargaining and ruin. Wagner's shimmering gold motif and the gods' haggling over a ransom of treasure render in music the very alchemy on display at the saleroom: beauty weighed against money, and desire transmuted into vast, glittering, and corrupting sums.",
        "source": "Richard Wagner, \"Das Rheingold\" (prologue to Der Ring des Nibelungen), full orchestral score, B. Schott's Sohne, Mainz, 1873; hosted at IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "David Teniers the Younger, Archduke Leopold Wilhelm in his Painting Gallery in Brussels (c. 1647-1651), Museo del Prado — VISUAL ARTWORK",
        "excerpt": "Teniers, court painter and keeper of the archduke's pictures, shows Leopold Wilhelm amid the dense-hung walls of his Brussels gallery, dozens of Italian and Flemish masterpieces stacked frame to frame while connoisseurs lean in to examine canvases propped against chairs. It is the Kunstkammer as a monument to the passion, the power, and the vanity of collecting, a single princely cabinet of accumulated beauty, of the very kind that auctions like Sotheby's gather, catalogue, and ultimately disperse.",
        "source": "David Teniers the Younger, \"Archduke Leopold Wilhelm in his Painting Gallery in Brussels,\" oil on canvas, c. 1647-1651, Museo Nacional del Prado, Madrid; image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:El_archiduque_Leopoldo_Guillermo_en_su_galer%C3%ADa_de_pinturas_en_Bruselas_(David_Teniers_II).jpg",
        "image": {
          "src": "/covers/sothebys-london-record-sale--art.png",
          "alt": "A 17th-century painting of Archduke Leopold Wilhelm standing in his Brussels gallery, its walls densely hung with dozens of framed Old Master paintings while gentlemen examine canvases.",
          "credit": "Wikimedia Commons (Museo del Prado)"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "sas-airbus-widebody-order",
    "headline": "SAS orders up to 40 Airbus widebody jets in a deal worth more than $10 billion",
    "overview": "Scandinavian airline SAS placed an order for up to 40 Airbus A330neo widebody aircraft in a deal valued at more than $10 billion at list prices, part of a long-haul fleet renewal as the carrier emerges from restructuring. The order is a boost for Airbus's widebody programme.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOZFJYR3UyTHN0Y0drcHVlZG1qTkJQcHUzZm9fcmRDVHZtZXI5SFFpS0ZvcWRvcUxZUHNBV0lpa0RDaUIzSXptTUliaFFUaTVlcElKV0ttdE5RODlZMHNHRXpNckpYeWs1b0JyZ3VJMVVoaktVWDZqUGstVjlFOXNTaEhhcHRSYjJkanNqWWFicndMOHp6dGUzajZuWlR1bllYWTh3?oc=5"
      },
      {
        "name": "Simple Flying",
        "href": "https://news.google.com/rss/articles/CBMiakFVX3lxTE1XVDhQNDNfdURoc1FBcWREVjhqbzlab0F1TmhwdjlodmY5R3JtVmdSeFBDQUpUQnVQbEI4Y2JuakRtbEo2RkV5aHhYLVJhRUE4Mk05SUptaWtET01lTnE5cVh0VXRWb3VXV2c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-30",
    "image": {
      "src": "/covers/sas-airbus-widebody-order.png",
      "alt": "A Scandinavian Airlines Airbus A350 widebody jet.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 30 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Orville and Wilbur Wright, \"The Early History of the Airplane\" (1908)",
        "excerpt": "The first flight lasted only 12 seconds, a flight very modest compared with that of birds, but it was, nevertheless, the first in the history of the world in which a machine carrying a man had raised itself by its own power into the air in free flight, had sailed forward on a level course without reduction of speed, and had finally landed without being wrecked.",
        "source": "Orville and Wilbur Wright, The Early History of the Airplane (Dayton, 1908/1922); Project Gutenberg eBook #25420",
        "href": "https://www.gutenberg.org/files/25420/25420-h/25420-h.htm"
      },
      {
        "category": "historical",
        "title": "Benjamin Franklin, Letter to Sir Joseph Banks on the First Balloon Ascents (1 December 1783)",
        "excerpt": "Between One & Two aClock, all Eyes were gratified with seeing it rise majestically from among the Trees, and ascend gradually above the Buildings, a most beautiful Spectacle! When it was about 200 feet high, the brave Adventurers held out and wav'd a little white Pennant, on both Sides their Car, to salute the Spectators, who return'd loud Claps of Applause. Never before was a philosophical Experiment so magnificently attended.",
        "source": "Benjamin Franklin and the First Balloons, ed. Abbott Lawrence Rotch (1907); Project Gutenberg eBook #43809",
        "href": "https://gutenberg.org/files/43809/43809-h/43809-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VIII: Daedalus and Icarus (8 AD; Riley trans. 1851)",
        "excerpt": "Although Minos may beset the land and the sea, still the skies, at least, are open. By that way will we go... Icarus, I recommend thee to keep the middle tract; lest, if thou shouldst go too low, the water should clog thy wings; if too high, the fire of the sun should scorch them.",
        "source": "Ovid, The Metamorphoses, trans. Henry T. Riley (1851), Book VIII; Project Gutenberg eBook #26073",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "Alfred, Lord Tennyson, \"Locksley Hall\" (1842)",
        "excerpt": "For I dipt into the future, far as human eye could see, / Saw the vision of the world, and all the wonder that would be; / Saw the heavens fill with commerce, argosies of magic sails, / Pilots of the purple twilight, dropping down with costly bales;",
        "source": "Alfred Tennyson, \"Locksley Hall,\" Poems (1842); Wikisource",
        "href": "https://en.wikisource.org/wiki/Locksley_Hall"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, The Planets, Op. 32 — \"Mercury, the Winged Messenger\" (1914-1916) — MUSIC",
        "excerpt": "In this dazzling, quicksilver scherzo Holst sets the winged god Mercury, the swift messenger of the heavens, in perpetual flickering motion, melodies darting between two keys at once and orchestral colors flashing like sunlight on metal. Light, fleet, and weightless, the movement is the sound of pure speed aloft, an apt fanfare for a fleet of new wide-bodied craft built to carry travelers swiftly across the great distances of the sky.",
        "source": "Gustav Holst, The Planets, Op. 32 (1916), full score; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus (c. 1555) — VISUAL ARTWORK",
        "excerpt": "A serene wide landscape of sea, ships, and a plowman at his furrow occupies the eye, while in the lower right corner Icarus has already plunged into the water, only two flailing legs still showing above the waves. The most famous image of flight's oldest myth, it pairs human soaring ambition with the ever-present warning of overreach, the same balance of daring and prudence that governs any fleet built to conquer the air.",
        "source": "Pieter Bruegel the Elder (after), Landscape with the Fall of Icarus, c. 1555, oil on canvas, Royal Museums of Fine Arts of Belgium, Brussels; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/sas-airbus-widebody-order--art.png",
          "alt": "Pieter Bruegel the Elder's Landscape with the Fall of Icarus: a sunlit coastal scene with a plowman, shepherd, and sailing ships, while the small flailing legs of the fallen Icarus disappear into the sea at lower right.",
          "credit": "Wikimedia Commons"
        }
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
