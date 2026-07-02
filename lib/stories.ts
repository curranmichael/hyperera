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
    "slug": "kyiv-strikes-kill-eight",
    "headline": "Russian missile and drone strikes on Kyiv kill at least eight and wound dozens",
    "overview": "A large overnight barrage of Russian missiles and drones struck Kyiv, killing at least eight people and wounding dozens more, Ukrainian officials said. Rescuers dug through damaged apartment blocks as the assault deepened one of the war's most intense stretches of aerial attacks on the capital.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxOUXpINkNPNmhoNlBLZ1FyUHM5alRZVWp0dUlGS3F2ajlhNGJmUFlrU1lYNHBWQzlZenZUYWRaSFByeFVxTG5vVlMtQm5Gd3E1U3FKVlM0TTdZXzFJMEZ3RFZGQV8xdDB5dVUya2dXNWRhTF9Xa1hmdXQ1bXF0WjFELU0xaWdvVFhSbEhMRElBdUtnNk5sRFEtR0NsUmxZNXZLV1NlVEtrNHBTaEFhWmlHQ2luUQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c4gyv05gk4do"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/kyiv-strikes-kill-eight.png",
      "alt": "Smoke rising over a damaged apartment block in Kyiv at dawn after an overnight Russian missile and drone strike.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides on the burning of besieged Plataea (429 BC)",
        "excerpt": "The consequence was a fire greater than any one had ever yet seen produced by human agency ... And this fire was not only remarkable for its magnitude, but was also, at the end of so many perils, within an ace of proving fatal to the Plataeans; a great part of the town became entirely inaccessible, and had a wind blown upon it, in accordance with the hopes of the enemy, nothing could have saved them.",
        "source": "Thucydides, History of the Peloponnesian War 2.77 (trans. Richard Crawley), Livius.org",
        "href": "https://www.livius.org/sources/content/thucydides-historian/siege-of-plataea/"
      },
      {
        "category": "historical",
        "title": "Josephus on the fall and burning of Jerusalem (AD 70)",
        "excerpt": "The ground did no where appear visible, for the dead bodies that lay on it; but the soldiers went over heaps of those bodies, as they ran upon such as fled from them.",
        "source": "Flavius Josephus, The War of the Jews, Book VI (trans. William Whiston), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_War_of_the_Jews/Book_VI"
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book XXII — Troy grieving beneath its walls",
        "excerpt": "No less than if the rage of hostile fires,\nFrom her foundations curling to her spires,\nO'er the proud citadel at length should rise,\nAnd the last blaze send Ilion to the skies.",
        "source": "Homer, The Iliad, Book XXII (trans. Alexander Pope), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_22"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations, over a stricken city",
        "excerpt": "Mine eyes do fail with tears, my bowels are troubled, my liver is poured upon the earth, for the destruction of the daughter of my people; because the children and the sucklings swoon in the streets of the city.",
        "source": "Lamentations 2:11, King James Version, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 — MUSIC",
        "excerpt": "Tchaikovsky built this overture around the roar of literal cannon fire, pealing bells, and two national anthems locked in combat, staging a capital under overwhelming assault. The terror of bombardment is answered by a hymn-like theme that gathers into a defiant final carillon of survival. Heard against Kyiv's nights of missiles and drones, its cannonades sound less like celebration than like a people refusing to be erased.",
        "source": "International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, The Course of Empire: Destruction (1836) — VISUAL ARTWORK",
        "excerpt": "Cole's canvas seizes a once-glittering capital at the instant of its sacking: bridges buckle, colonnades burn, and a storm-dark sky glows orange with fires set by an invading army. Civilians are cut down or hurled into the river as smoke swallows the temples that an hour earlier signified an empire's confidence. Painted in 1836, it reads now as a timeless image of what aerial and artillery terror does to a living city — the swift passage from ordinary streets to rubble and flame.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg",
        "image": {
          "src": "/covers/kyiv-strikes-kill-eight--art.png",
          "alt": "Thomas Cole's 1836 painting 'The Course of Empire: Destruction', showing a classical city being sacked and set ablaze by invaders, with civilians fleeing across a collapsing bridge under a smoke-filled sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "lead": true,
    "rank": 1
  },
  {
    "slug": "usmca-renewal-declined",
    "headline": "US declines to renew USMCA trade pact, triggering annual reviews with Canada and Mexico",
    "overview": "The United States let a July 1 deadline pass without agreeing to a 16-year renewal of the USMCA trade pact, opting instead for yearly reviews and further talks aimed at narrowing its trade deficits with Canada and Mexico. The agreement stays in force but now faces annual reviews that could reopen major provisions, and is set to expire in 2036 if no resolution is reached.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxORWxhSVNvODM1MVFkUkxYbEZKQ0FTbUhoOWpsdUdCTkRDYzlLTDZaTjlKOGQ5ZDQyd3MxOUUxblp4eUxtZGZIeEpKVGtkMXJMNFpkUVpNNnNHTzlSOU5rc21LU1dnNnBld0dmdzItZ2dpS05aOC1BRm8xdmt5WUduWDJjUUc0Nmd3OFdBX3JsbnhOY2RPdm50a2Vyek5IMGhWa1lPSHRWanNWMno1RkJOQkM3NFdOV3pSZVgzX053WnBOWGRGM3VF?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce8j2lmrvrdo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/usmca-renewal-declined.png",
      "alt": "Stacked shipping containers and cranes at a North American border trade port under an overcast sky.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Treaty of Amity, Commerce, and Navigation (Jay Treaty), Article 28 — 1794",
        "excerpt": "It is agreed that the first Ten Articles of this Treaty shall be permanent and that the subsequent Articles except the Twelfth shall be limited in their duration to Twelve years to be computed from the Day on which the Ratifications of this Treaty shall be exchanged... But if it should unfortunately happen that His Majesty and the United States should not be able to agree on such new Arrangements, in that case, all the Articles of this Treaty except the first Ten shall then cease and expire together.",
        "source": "The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/18th_century/jay.asp"
      },
      {
        "category": "historical",
        "title": "Reciprocity Treaty between the United States and Great Britain, Article V — 1854",
        "excerpt": "Such assent having been given, the treaty shall remain in force for ten years from the date at which it may come into operation, and further until the expiration of twelve months after either of the high contracting parties shall give notice to the other of its wish to terminate the same; each of the high contracting parties being at liberty to give such notice to the other at the end of the said term of ten years, or at any time afterwards.",
        "source": "PrimaryDocuments.ca — text of the 1854 Reciprocity Treaty (terminated by the United States in 1866)",
        "href": "https://primarydocuments.ca/the-reciprocity-treaty-of-1854-canada-united-states-5-june-1854-ratified-february-1855-terminated-march-1866/"
      },
      {
        "category": "literary",
        "title": "Robert Frost, \"Mending Wall\"",
        "excerpt": "Something there is that doesn't love a wall, ... He only says, 'Good fences make good neighbours.'",
        "source": "Robert Frost, \"Mending Wall,\" North of Boston (1914), Wikisource",
        "href": "https://en.wikisource.org/wiki/North_of_Boston/Mending_Wall"
      },
      {
        "category": "literary",
        "title": "Aesop, \"The Wolves and the Sheep\"",
        "excerpt": "\"If you would only dismiss them from your heels, there might soon be treaties of peace and of reconciliation between us.\" The Sheep, poor silly creatures! were easily beguiled, and dismissed the Dogs. The Wolves destroyed the unguarded flock at their own pleasure.",
        "source": "Wikisource — Three Hundred Aesop's Fables (trans. George Fyler Townsend, 1867)",
        "href": "https://en.wikisource.org/wiki/Three_Hundred_%C3%86sop%27s_Fables/The_Wolves_and_the_Sheep"
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 — MUSIC",
        "excerpt": "Handel scored this suite of pomp for the public celebration of the 1748 Treaty of Aix-la-Chapelle, the pact that ended the War of the Austrian Succession. Blazing trumpets, drums, and massed wind instruments turn a hard-won diplomatic settlement into open-air spectacle, the Overture swelling from martial tension into a triumphant peace. It is the sound of rival nations pausing their quarrels to shake hands beneath a shower of sparks.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Benjamin West, American Commissioners of the Preliminary Peace Negotiations with Great Britain — VISUAL ARTWORK",
        "excerpt": "Benjamin West's unfinished 1783 canvas gathers the American peacemakers—Franklin, Jay, Adams and their colleagues—around a table to settle the treaty ending the Revolutionary War. Because the British commissioners refused to sit for the painter, one side of the composition trails off into bare, ghostly emptiness where a partner to the bargain should be. The picture freezes diplomacy mid-negotiation: an agreement half-made, its other party conspicuously absent.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Treaty_of_Paris_by_Benjamin_West_1783.jpg",
        "image": {
          "src": "/covers/usmca-renewal-declined--art.png",
          "alt": "Benjamin West's unfinished 1783 painting of the American commissioners seated at the Treaty of Paris peace negotiations, with the right side of the canvas left blank where the absent British delegates would have been.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "us-iran-doha-talks-conclude",
    "headline": "US and Iran conclude two days of indirect talks in Doha as oil prices fall",
    "overview": "Qatar-mediated indirect talks between the United States and Iran concluded in Doha after two days, with Qatar reporting positive progress on the Strait of Hormuz and the unfreezing of Iranian funds. Oil prices fell on the easing tensions, with Brent sliding about 1% toward its worst quarter since 2020.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPQjJuTlNEejJjWHZfckJtT3BHcWVLbXpJQUZzOVEzaDJCMThGUmJaU1pXRXdKYV9RUG9Nc09WaVRaVHhYUXh5LW43QzNzU3dzNDd5dGVQaFpmQzNhenJRcW1HMVVOQ3pnNVptVHpCSk9mUC1BWl9xTUJyQmttcHdRWF9jdkZiS3dZMkQ2ekY5aWpPX284MnFMOVVBaw?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/02/oil-prices-fall-after-us-iran-talks-conclude-in-doha.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/us-iran-doha-talks-conclude.png",
      "alt": "Empty chairs around a long negotiating table in a Doha conference hall at dusk.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Treaty of Portsmouth (1905), Article I",
        "excerpt": "There shall henceforth be peace and amity between their Majesties the Emperor of Japan and the Emperor of all the Russias, and between their respective States and subjects.",
        "source": "Russo-Japanese Peace Treaty (Treaty of Portsmouth), mediated by President Theodore Roosevelt",
        "href": "https://wwi.lib.byu.edu/index.php/Treaty_of_Portsmouth"
      },
      {
        "category": "historical",
        "title": "Treaty of Ghent (1814), Article the First",
        "excerpt": "There shall be a firm and universal Peace between His Britannic Majesty and the United States, and between their respective Countries, Territories, Cities, Towns, and People of every degree without exception of places or persons. All hostilities both by sea and land shall cease as soon as this Treaty shall have been ratified by both parties as hereinafter mentioned.",
        "source": "Treaty of Peace and Amity between the United States and Great Britain, The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/19th_century/ghent.asp"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book IX (The Embassy to Achilles)",
        "excerpt": "Even now, however, be appeased, and put away your anger from you. Agamemnon will make you great amends if you will forgive him; listen, and I will tell you what he has said in his tent that he will give you.",
        "source": "Homer, The Iliad, trans. Samuel Butler (public domain), The Internet Classics Archive",
        "href": "https://classics.mit.edu/Homer/iliad.9.ix.html"
      },
      {
        "category": "literary",
        "title": "Aristophanes, Lysistrata (Reconciliation Scene)",
        "excerpt": "Now, brethren twined with mutual benefactions, Can you still war, can you suffer such disgrace? Why not be friends? What is there to prevent you?",
        "source": "Aristophanes, Lysistrata, trans. Jack Lindsay (public domain), Project Gutenberg eBook #7700",
        "href": "https://www.gutenberg.org/files/7700/7700-h/7700-h.htm"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Missa in tempore belli ('Mass in Time of War' / Paukenmesse), Hob.XXII:9 — MUSIC",
        "excerpt": "Haydn composed this mass in 1796 as Napoleonic armies pressed toward Austria, threading military drum-strokes and trumpet calls through a sacred text. Its closing Agnus Dei rises from anxious martial rumbling into an urgent, almost pleading appeal for peace. The work embodies the very hinge of the Doha story: a moment poised between the machinery of war and a fragile prayer for its aversion.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Missa_in_tempore_belli_'Paukenmesse',_Hob.XXII:9_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Gerard ter Borch, The Ratification of the Treaty of Münster (1648) — VISUAL ARTWORK",
        "excerpt": "Ter Borch's small oil on copper captures the exact instant on 15 May 1648 when Spanish and Dutch envoys swear the oath ending eighty years of war, a founding image of diplomacy made visible. Enemies stand crowded in a single room, hands raised in a shared gesture that converts hostility into treaty. It is the pictorial answer to the Doha talks: the quiet, negotiated room that averts the battlefield.",
        "source": "Rijksmuseum, Amsterdam (SK-A-405); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Ratification_of_the_Treaty_of_Munster,_Gerard_Ter_Borch_(1648).jpg",
        "image": {
          "src": "/covers/us-iran-doha-talks-conclude--art.png",
          "alt": "Spanish and Dutch delegations raising their hands to swear the oath ratifying the Peace of Münster in the town hall, 15 May 1648, in Gerard ter Borch's group portrait",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "us-ai-voluntary-model-standards",
    "headline": "US in talks with leading AI companies over voluntary standards for releasing new models",
    "overview": "The US government is in advanced talks with major AI developers including OpenAI, Anthropic, Google, Microsoft and Amazon to set voluntary standards for releasing new models, the Financial Times reported, with an announcement possible within days. The benchmarks would flag risks and clarify who can access advanced models at home and abroad amid concerns about misuse by rival powers.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOcE1CSXY3b1NVTmdnRDcyM3dUeUpxLW93SE9MNW9TX2VSZTJzdHRmTzNpdkdwaFVxTkFqQjFpUnk0cU1JWmtrTTNWVnliSERyVnZGWFZ2VmgtelpEMHhPMDBsVVc4S3RfakFlMFJZTjNDbVpVN1NGVk56R3dJdFZNQTR1RXFyUURVY18zVktHMmJwSGNNbTd4dVBEWUppOXFpc0pJQ3pDYnZsc1lYNzZXU3U1TDA5dzFTemRhX1M2cWlJZw?oc=5"
      },
      {
        "name": "Gizmodo",
        "href": "https://gizmodo.com/trump-administration-reportedly-on-verge-of-standards-deal-with-big-ai-2000780479"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/us-ai-voluntary-model-standards.png",
      "alt": "A single illuminated server cabinet glowing in a darkened data hall.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Oath of Hippocrates (c. 5th century BCE)",
        "excerpt": "No entreaties shall induce me to give to any one noxious drugs, nor shall I take part in any such counsels. ... I shall conduct my life and practise my art in holiness.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Oath_of_Hippocrates"
      },
      {
        "category": "historical",
        "title": "A Proclamation for the Suppression of Coffee-Houses (Charles II, 1675)",
        "excerpt": "Whereas it is most apparent, that the Multitude of Coffee-Houses of late years set up and kept within this Kingdom, the Dominion of Wales, and the Town of Berwick upon Tweed, and the great resort of Idle and disaffected persons to them, have produced very evil and dangerous effects.",
        "source": "University of Giessen (transcription of the 1675 royal proclamation)",
        "href": "https://www.uni-giessen.de/de/fbz/fb05/germanistik/absprache/sprachverwendung/gloning/tx/suppress.htm"
      },
      {
        "category": "literary",
        "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818)",
        "excerpt": "I had worked hard for nearly two years, for the sole purpose of infusing life into an inanimate body ... but now that I had finished, the beauty of the dream vanished, and breathless horror and disgust filled my heart.",
        "source": "Wikisource (First Edition, 1818, Vol. 1, Ch. 4)",
        "href": "https://en.wikisource.org/wiki/Frankenstein,_or_the_Modern_Prometheus_(First_Edition,_1818)/Volume_1/Chapter_4"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VIII: Daedalus and Icarus (8 CE)",
        "excerpt": "My son, I caution you to keep the middle way, for if your pinions dip too low the waters may impede your flight; and if they soar too high the sun may scorch them.",
        "source": "Perseus Digital Library (Brookes More translation, 1922)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D8%3Acard%3D183"
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), 1897 — MUSIC",
        "excerpt": "Dukas's symphonic scherzo sets Goethe's ballad of an apprentice who enchants a broom to fetch water and then cannot stop it, the surging orchestral theme multiplying out of control. The music is the definitive sonic image of a power casually unleashed and impossible to recall — until the master returns to impose order. First performed in Paris in 1897, the score is in the public domain.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)"
      },
      {
        "category": "artistic",
        "title": "Heinrich Füger, Prometheus Brings Fire to Mankind, c. 1817 — VISUAL ARTWORK",
        "excerpt": "Heinrich Füger's neoclassical painting shows the titan Prometheus delivering fire — the first transformative technology — to a humanity reaching eagerly toward it. In the myth this gift of power provokes the wrath of the gods, who punish the giver for handing mortals a force they were not trusted to wield. It is the ur-image of a world-changing capability released to humankind and the anxious question of who should control it. The work is public domain; Füger died in 1818.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/us-ai-voluntary-model-standards--art.png",
          "alt": "Neoclassical painting of the titan Prometheus holding a flame aloft to a group of nude figures reaching toward the new light, against a dark sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "germany-charges-ukrainian-nord-stream",
    "headline": "Germany charges a Ukrainian man over the 2022 Nord Stream pipeline explosions",
    "overview": "German federal prosecutors indicted a Ukrainian national, identified only as Serhii K under privacy rules, over the 2022 explosions that ruptured the Nord Stream gas pipelines beneath the Baltic Sea. Prosecutors accuse the former special-forces officer, arrested in Italy last August, of attacking civilian energy infrastructure; Ukraine has denied any state involvement.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxOalRlaFpyS3FBM2dSdHM0ck5wVzNlWXpQUEZIczhyWF9ITVFqbFNFWE1kQkZkTlVLcUNiWXItYmFTVzNpallnQ1BiVnJ5MmlkWi0zSjNKVzBLMml2cnJ4Vi1RckwxaUxrRFI2OVZaUFJlSWhZem1pUC1tamhWdXFrU29kNTZUTExkZE5ZUHJtUW9TX0xya2M0Z1l6bTltLWJ4UHhmOE5rRHg3UlF5OVRYS3hSWHNRdV96b0ZPRw?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c33yjk0ldkdo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/germany-charges-ukrainian-nord-stream.png",
      "alt": "Gas bubbling to the surface of the dark Baltic Sea above a ruptured undersea pipeline.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "King James I, Speech to Parliament on the Gunpowder Plot (1605)",
        "excerpt": "But in this which did so lately fall out, and which was a destruction prepared not for me alone, but for you all that are here present, and wherein no rank, age, or sex should have been spared; This was not a crying sin of bloud as the former, but it may well be called a roaring, nay, a thundering sin of Fire and Brimstone, from the which, God hath so miraculously delivered us all.",
        "source": "King James I, Speech to Parliament on the Gunpowder Plot (1605) — Famous Trials, UMKC",
        "href": "https://famous-trials.com/gunpowder/2768-speech-of-king-james-to-parliament-regarding-gunpowder-plot"
      },
      {
        "category": "historical",
        "title": "Thucydides, History of the Peloponnesian War, Book II (the night attack on Plataea)",
        "excerpt": "a Theban force a little over three hundred strong, under the command of their Boeotarchs, Pythangelus, son of Phyleides, and Diemporus, son of Onetorides, about the first watch of the night, made an armed entry into Plataea, a town of Boeotia in alliance with Athens. The gates were opened to them by a Plataean called Naucleides, who, with his party, had invited them in, meaning to put to death the citizens of the opposite party, bring over the city to Thebes, and thus obtain power for themselves.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (the night attack on Plataea) — Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "literary",
        "title": "Joseph Conrad, The Secret Agent, Chapter 2",
        "excerpt": "The demonstration must be against learning—science. But not every science will do. The attack must have all the shocking senselessness of gratuitous blasphemy.",
        "source": "Joseph Conrad, The Secret Agent, Chapter 2 — Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Secret_Agent/Chapter_2"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Macbeth, Act II, Scene 2",
        "excerpt": "Will all great Neptune's ocean wash this blood\nClean from my hand? No, this my hand will rather\nThe multitudinous seas incarnadine,\nMaking the green one red.",
        "source": "William Shakespeare, Macbeth, Act II, Scene 2 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Macbeth_(1918)_Yale/Text/Act_II"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Der fliegende Holländer (The Flying Dutchman), WWV 63 — MUSIC",
        "excerpt": "Wagner's storm-lashed overture and opera conjure a cursed ship condemned to wander the seas, a doom that surfaces from beneath the waves. Its churning strings and the ghost-ship legend evoke nemesis rising out of the deep — an apt musical mirror for sabotage carried out unseen, underwater, and a reckoning that will not stay submerged. The full public-domain scores are catalogued on IMSLP.",
        "source": "Richard Wagner, Der fliegende Holländer (The Flying Dutchman), WWV 63 — MUSIC — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Der_fliegende_Holl%C3%A4nder,_WWV_63_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Crispijn van de Passe the Elder, The Gunpowder Plot Conspirators (1605) — VISUAL ARTWORK",
        "excerpt": "This contemporary engraving groups eight of the Gunpowder Plot conspirators — Guy Fawkes third from the right — in hushed, close-huddled conference. Produced within the year of the plot, it became the enduring image of covert conspirators bound to a hidden act of destruction and its public reckoning. The work is in the public domain.",
        "source": "Crispijn van de Passe the Elder, The Gunpowder Plot Conspirators (1605) — VISUAL ARTWORK — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Gunpowder_Plot_conspirators.jpg",
        "image": {
          "src": "/covers/germany-charges-ukrainian-nord-stream--art.png",
          "alt": "A 1605 engraving showing eight cloaked Gunpowder Plot conspirators, including Guy Fawkes, gathered together in secret conference",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "judge-blocks-usps-mail-voting",
    "headline": "Federal judge blocks Postal Service plan to restrict mail-in ballot delivery",
    "overview": "US District Judge Emmet Sullivan blocked a Postal Service proposal that would have required states to verify voters before the agency delivered mail-in ballots, siding with the NAACP and citing a 2021 settlement guaranteeing timely ballot delivery. It was the second courtroom defeat in two weeks for President Trump's push to curtail mail voting ahead of the November midterms.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPbGpZNWZEVGo4VWgzR21MZ1RIbkdpM1B0enE2OU1BcF9TdmY1STNteWhjOWpIc3BHaTZla1BWaEN5TEtmaFBFZnZ5SWNwS2pYeEU3VDMzbzZIQ0hFYWVSZ3J1S2ZjQkNmdzZlRENobk5xX20yZkhnaUdtYTFSMXlsTEZQbXNJNG8wYWppRHM3SFNIUjhoSFlGZkg4SVR6c0RkdFMwRWkzYlNmckpRTW1v?oc=5"
      },
      {
        "name": "Democracy Docket",
        "href": "https://www.democracydocket.com/news-alerts/judge-blocks-trump-mail-voting-executive-order/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/judge-blocks-usps-mail-voting.png",
      "alt": "A wall of postal pigeonhole slots stuffed with plain white envelopes under a hanging lamp.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Fifteenth Amendment to the U.S. Constitution (ratified 1870)",
        "excerpt": "The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of race, color, or previous condition of servitude. The Congress shall have power to enforce this article by appropriate legislation.",
        "source": "The Fifteenth Amendment to the U.S. Constitution (ratified 1870) — U.S. National Archives",
        "href": "https://www.archives.gov/milestone-documents/15th-amendment"
      },
      {
        "category": "historical",
        "title": "Susan B. Anthony, \"Is It a Crime for a Citizen of the United States to Vote?\" (1873)",
        "excerpt": "It was we, the people; not we, the white male citizens; nor yet we, the male citizens; but we, the whole people, who formed the Union.",
        "source": "Susan B. Anthony, \"Is It a Crime for a Citizen of the United States to Vote?\" (1873) — Famous Trials, UMKC",
        "href": "https://famous-trials.com/anthony/438-anthonyaddress"
      },
      {
        "category": "literary",
        "title": "Sophocles, Antigone (Jebb translation, 1917)",
        "excerpt": "Yes; for it was not Zeus that had published me that edict; not such are the laws set among men by the Justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven. For their life is not of to-day or yesterday, but from all time, and no man knows when they were first put forth.",
        "source": "Sophocles, Antigone (Jebb translation, 1917) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Sophocles_(Jebb_1917)/Antigone"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, The Mask of Anarchy (1819)",
        "excerpt": "Rise like lions after slumber\nIn unvanquishable number—\nShake your chains to earth like dew\nWhich in sleep had fallen on you—\nYe are many—they are few.",
        "source": "Percy Bysshe Shelley, The Mask of Anarchy (1819) — Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Mask_of_Anarchy"
      },
      {
        "category": "artistic",
        "title": "Rouget de Lisle, La Marseillaise — MUSIC",
        "excerpt": "Composed in 1792 during the French Revolution, La Marseillaise became the enduring anthem of a people asserting liberty against arbitrary authority. Its rising, marching melody turned a call to defend citizens' rights into a shared musical emblem of the franchise won from tyranny. It endures as one of the world's foremost anthems of liberty.",
        "source": "Rouget de Lisle, La Marseillaise — MUSIC — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/La_Marseillaise_(Rouget_de_Lisle,_Claude-Joseph)"
      },
      {
        "category": "artistic",
        "title": "George Caleb Bingham, The County Election (1852) — VISUAL ARTWORK",
        "excerpt": "Bingham's 1852 painting depicts an American election day as a crowded civic ritual, ordinary citizens lining up on the courthouse steps to cast their ballots. Housed in the Saint Louis Art Museum, it renders voting as the living machinery of self-government. The work is in the public domain (artist died 1879).",
        "source": "George Caleb Bingham, The County Election (1852) — VISUAL ARTWORK — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_County_Election.jpg",
        "image": {
          "src": "/covers/judge-blocks-usps-mail-voting--art.png",
          "alt": "A bustling frontier Missouri town on election day, with a crowd of citizens gathered on and around a courthouse porch to cast their votes by voice, figures ascending steps toward the polling official.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "alibaba-600-million-drug-sales-settlement",
    "headline": "Alibaba to pay $600 million to settle US probe into illegal pharmaceutical sales",
    "overview": "Alibaba and its payment affiliate AUS Merchant Services agreed to pay $600 million to resolve a US Justice Department investigation into illegal sales of pharmaceuticals and medical products on its platforms. The company admitted overseas customers made roughly 80,000 unlawful purchases worth more than $200 million between 2016 and 2024, in the largest settlement in the history of the District of Rhode Island.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQMmJDMmhkeHMxSFpCOWF5NnM5UkpPMlJTX3AwTG5JdjRxb0pOa3pXZ1ZiYVpQaF83VU9VN3p1U1ZZSzZQcFBMS0JOcENSN3BZV3I2YWVoMTQyNmJyQlJMcXNZNzFJamt1Z1UwSm9tVmotaGJQTHFhQWFDMkpIRmRuRHlxaHBZVC1feE9HUTlLRTVmc2MxUzUyR3NWYTBMTHV5bTZwbXptZVR4MlpRSlQzaQ?oc=5"
      },
      {
        "name": "U.S. Justice Department",
        "href": "https://www.justice.gov/opa/pr/alibaba-group-and-aus-merchant-services-agree-pay-600-million-resolve-allegations-they"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/alibaba-600-million-drug-sales-settlement.png",
      "alt": "Rows of plain brown parcels moving along a conveyor in a large e-commerce fulfilment warehouse at night.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Cleansing of the Temple — Gospel of Matthew 21:12–13 (King James Version)",
        "excerpt": "And Jesus went into the temple of God, and cast out all them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves, And said unto them, It is written, My house shall be called the house of prayer; but ye have made it a den of thieves.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "historical",
        "title": "The Pure Food and Drug Act of 1906, Section 1",
        "excerpt": "That it shall be unlawful for any person to manufacture within any Territory or the District of Columbia any article of food or drug which is adulterated or misbranded, within the meaning of this Act; and any person who shall violate any of the provisions of this section shall be guilty of a misdemeanor, and for each offense shall, upon conviction thereof, be fined not to exceed five hundred dollars.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Pure_Food_and_Drug_Act_of_1906"
      },
      {
        "category": "literary",
        "title": "Romeo and Juliet, Act V, Scene 1 — Romeo and the Apothecary (Shakespeare)",
        "excerpt": "I do remember an apothecary, And hereabouts he dwells, which late I noted In tatter'd weeds, with overwhelming brows, Culling of simples; meagre were his looks, Sharp misery had worn him to the bones:",
        "source": "Wikisource (1917 Yale edition)",
        "href": "https://en.wikisource.org/wiki/Romeo_and_Juliet_(1917)_Yale/Text/Act_V"
      },
      {
        "category": "literary",
        "title": "The Jungle, Chapter 14 — What Went Into the Meat (Upton Sinclair)",
        "excerpt": "These rats were nuisances, and the packers would put poisoned bread out for them; they would die, and then rats, bread, and meat would go into the hoppers together. This is no fairy story and no joke; the meat would be shovelled into carts.",
        "source": "Wikisource (Sinclair, 1906)",
        "href": "https://en.wikisource.org/wiki/The_Jungle_(Sinclair,_1906)/Chapter_14"
      },
      {
        "category": "artistic",
        "title": "Pictures at an Exhibition (Modest Mussorgsky) — MUSIC",
        "excerpt": "Mussorgsky's 1874 piano suite walks the listener from gallery to gallery, and in the movement 'Limoges. The Market Place' it bursts into the chatter, haggling, and jostling gossip of a French market square. The music captures a marketplace as a living organism of commerce, its clamor swelling until it tumbles headlong into the darkness of the catacombs.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Pictures_at_an_Exhibition_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "Christ Driving the Money Changers from the Temple (Rembrandt, 1626) — VISUAL ARTWORK",
        "excerpt": "In this early Rembrandt panel, a furious Christ raises a cord whip to scatter the traders, coins, and beasts that have turned the temple into a den of commerce. The chaotic tumble of overturned tables and fleeing merchants renders the moment of reckoning when a sacred space is violently purged of illicit trade.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Christ_Driving_the_Money_Changers_from_the_Temple.jpg",
        "image": {
          "src": "/covers/alibaba-600-million-drug-sales-settlement--art.png",
          "alt": "Rembrandt's 1626 painting of Christ, whip raised, scattering the money changers, merchants, and their overturned tables and fleeing animals from the temple.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "belgium-senegal-world-cup-comeback",
    "headline": "Belgium beat Senegal 3-2 in extra time on the latest goal in World Cup history",
    "overview": "Trailing 2-0 in the 85th minute, Belgium stormed back through Romelu Lukaku and Youri Tielemans to force extra time, then won their round-of-32 tie 3-2 when Tielemans converted a penalty in the 125th minute, the latest goal ever scored at a World Cup. Senegal had led through Habib Diarra and Ismaila Sarr before the collapse in Seattle.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPdGY4ME1Rc0NxYjZGekVLZG1KRTktTWVtVHQ5dTdWazA1TkhYOGlnN1pfdkZ4Si13MG9TSVFFRU5qNEsxTDlyOHhTZE1WNWNPMUpOZkxUTGxYd3pzSnBCV2NKdUQ2ZGUydWFJVUw1QWNWRlJqZGdMY0E5MWNIbUdDYzNvR1B4RFkwWVltcXFEUEMwXzZtb0J6U0RTRC1Da2x0WTNtZHRoVDdkb3JsdlN0RzltQTZ2MTU1RlE?oc=5"
      },
      {
        "name": "ESPN",
        "href": "https://www.espn.com/soccer/story/_/id/49238481/belgium-vs-senegal-live-world-cup-2026-updates-round-32-clash"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/belgium-senegal-world-cup-comeback.png",
      "alt": "A floodlit World Cup stadium at night with a ball resting on the penalty spot amid drifting confetti.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus, Histories 6.112 — the Athenians charge at a run at Marathon",
        "excerpt": "And when they had been arranged in their places and the sacrifices proved favourable, then the Athenians were let go, and they set forth at a run to attack the Barbarians. … they were the first of all the Hellenes about whom we know who went to attack the enemy at a run.",
        "source": "Herodotus, The Histories 6.112 (Macaulay translation), via Lexundria",
        "href": "https://lexundria.com/hdt/6.112-6.113/mcly"
      },
      {
        "category": "historical",
        "title": "The Duke of Wellington's Waterloo Dispatch to Lord Bathurst, 19 June 1815",
        "excerpt": "The attack succeeded in every point: the enemy was forced from his positions on the heights, and fled in the utmost confusion. … the operation of General Bülow upon the enemy's flank was a most decisive one.",
        "source": "Arthur Wellesley, Duke of Wellington, official dispatch, 19 June 1815, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Wellingon%27s_Waterloo_dispatch_to_Lord_Bathurst,_19_June_1815"
      },
      {
        "category": "literary",
        "title": "Aesop, \"The Hare and the Tortoise\" (Townsend translation)",
        "excerpt": "The Tortoise never for a moment stopped, but went on with a slow but steady pace straight to the end of the course. The Hare, trusting to his native swiftness, cared little about the race, and lying down by the wayside, fell fast asleep. At last waking up, and moving as fast as he could, he saw the Tortoise had reached the goal.",
        "source": "Three Hundred Æsop's Fables, trans. George Fyler Townsend, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Three_Hundred_%C3%86sop's_Fables/The_Hare_and_the_Tortoise"
      },
      {
        "category": "literary",
        "title": "Pindar, Olympian Ode 1 — victory hymn for Hieron of Syracuse",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth. But if, my heart, you wish to sing of contests, look no further for any star warmer than the sun, shining by day through the lonely sky, and let us not proclaim any contest greater than Olympia.",
        "source": "Pindar, Olympian 1, trans. Diane Arnson Svarlien (1990), via Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1"
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Symphony No. 5 in C minor, Op. 67 — MUSIC",
        "excerpt": "Beethoven's Fifth opens with its famous four-note hammer-blows of fate and drives through darkness and struggle before breaking, in its finale, into a blazing C-major triumph. The symphony enacts the very arc of a side battered and all but beaten that finds one last surge to wrench victory from defeat. Its exultant close is the sound of adversity overcome at the final moment.",
        "source": "Ludwig van Beethoven, Symphony No. 5, Op. 67 (1808), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.5,_Op.67_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Ulpiano Checa, \"Carrera de carros romanos\" (Roman Chariot Race), 1890 — VISUAL ARTWORK",
        "excerpt": "Checa's canvas seizes the climactic instant of the race, chariots thundering neck-and-neck toward the line as drivers lash their teams to a final surge. The dust and violent motion capture a contest decided in its last desperate seconds. Victory belongs to whoever finds one more burst of speed at the very end.",
        "source": "Ulpiano Checa (1860–1916), Carrera de carros romanos, 1890; public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Carrera_de_carros_romanos-Ulpiano_Checa.JPG",
        "image": {
          "src": "/covers/belgium-senegal-world-cup-comeback--art.png",
          "alt": "Roman charioteers racing at full gallop, straining horses and swirling dust as chariots hurtle toward the finish",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "swift-kelce-madison-square-garden-wedding",
    "headline": "Taylor Swift and Travis Kelce to hold wedding celebration at Madison Square Garden",
    "overview": "Pop superstar Taylor Swift and NFL star Travis Kelce are set to marry over the July Fourth weekend at Madison Square Garden in New York, according to people familiar with the plans, with a rehearsal dinner Thursday and a ceremony and reception Friday. Swift's team applied for a street permit around the arena from July 2 to 4 as fans and media gathered outside.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOQkNoRnQ1ejRXZVF0NG9TOUVqTkNJeW43WmpTNFkxWm9pQ05PSldVTTd4ODZEeFJXTVpIUDVIMGFJWlFwWjh5cTJUbDZYcUNub3VSeHZIOUV2WWF5bkc4QmEtc1FLUFZxSmQtMXR4bDVyMldJS3lJYWwxeEx2TklhNTFldzIyOGM1bmJoa0FWV3IyUHZueFF4X1JZOEdmLXNha2JBaEZB?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/01/entertainment/taylor-swift-travis-kelce-wedding-weekend"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/swift-kelce-madison-square-garden-wedding.png",
      "alt": "The illuminated exterior of a great New York arena at night before a celebrated wedding.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Samuel Pepys: bells and bonfires for the Queen's arrival (1662)",
        "excerpt": "At night, all the bells of the town rung, and bonfires made for the joy of the Queen's arrival, who came and landed at Portsmouth last night.",
        "source": "Diary of Samuel Pepys, 1662 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Diary_of_Samuel_Pepys/1662/May"
      },
      {
        "category": "historical",
        "title": "Arrian: the mass wedding at Susa",
        "excerpt": "...seats being placed in a row for the bridegrooms; and after the banquet the brides came in and seated themselves, each one near her own husband... He also ordered that the names of all the other Macedonians who had married any of the Asiatic women should be registered. They were over 10,000 in number; and to these Alexander made presents on account of their weddings.",
        "source": "The Anabasis of Alexander, Book VII, Chapter IV (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Anabasis_of_Alexander/Book_VII/Chapter_IV"
      },
      {
        "category": "literary",
        "title": "The Wedding at Cana (Gospel of John 2:1–10, King James Version)",
        "excerpt": "AND the third day there was a marriage in Cana of Galilee; and the mother of Jesus was there: And both Jesus was called, and his disciples, to the marriage... Every man at the beginning doth set forth good wine; and when men have well drunk, then that which is worse: but thou hast kept the good wine until now.",
        "source": "Bible (King James)/John, chapter 2 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/John"
      },
      {
        "category": "literary",
        "title": "Edmund Spenser, Epithalamion — the bride comes forth",
        "excerpt": "Loe! where she comes along with portly pace, / Lyke Phoebe, from her chamber of the east, / Arysing forth to run her mighty race, / Clad all in white, that seemes a virgin best.",
        "source": "Epithalamion (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Epithalamion_(Spenser)"
      },
      {
        "category": "artistic",
        "title": "Felix Mendelssohn: Wedding March from A Midsummer Night's Dream, Op. 61 — MUSIC",
        "excerpt": "Composed as part of the incidental music to Shakespeare's play (Op. 61, 1842), the exultant Wedding March in C major has become the near-universal processional for the recessional of a bride and groom. Scored for full orchestra and crowned by triumphant fanfares, it turns a private union into a public flourish of pageantry, the sound of a whole assembly rising to celebrate.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/A_Midsummer_Night's_Dream,_incidental_music,_Op.61_(Mendelssohn,_Felix)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder: The Peasant Wedding (c. 1567–68) — VISUAL ARTWORK",
        "excerpt": "Bruegel crowds a barn with the whole village gathered for a wedding feast, bagpiper playing while dishes are ferried in on an unhinged door. The bride sits beneath a paper crown before a green cloth of honour, radiant amid the communal throng. The painting captures the timeless spectacle of a marriage that belongs not just to the couple but to an entire society watching, eating, and rejoicing together.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Peasant_Wedding_(Bruegel).jpg",
        "image": {
          "src": "/covers/swift-kelce-madison-square-garden-wedding--art.png",
          "alt": "Pieter Bruegel the Elder's oil painting 'The Peasant Wedding', a crowded barn feast with a bride seated beneath a paper crown before a green cloth of honour, guests eating and a bagpiper playing",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "us-historic-heatwave-july-fourth",
    "headline": "Historic heat dome bakes central and eastern US ahead of July Fourth weekend",
    "overview": "A sprawling heat dome pushed dangerous temperatures across the central and eastern United States, with the National Weather Service warning of possibly historic highs and heat indices of 100 to 115 degrees from the Midwest to the East Coast. More than 140 million people were under heat alerts, and forecasters said over 300 records could fall by Saturday as the holiday weekend nears.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxNSVZfeDc3SzNzMVRYVUhhNEIzamlpOHJySC11eURNODU0dlVxM0t6UENzVFpmYW4xb1pieWEzWTJYZlhXOHNaeXE0blRqcVZmaTZKMlJZbVBZMmFGYV9uMEd2OFVRcDQtTmJkQ1h6a3dVWEpjcXFFUHZuN3VaN1dSZWw5VEJLMHJndl9qUWhIVmhjMlEzM05GLXZjdm9nQVRGQWxiZkMxRmh4cW5laFNjdQ?oc=5"
      },
      {
        "name": "NPR",
        "href": "https://www.npr.org/2026/06/30/nx-s1-5876093/heat-wave-fourth-midwest-east-coast"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/us-historic-heatwave-july-fourth.png",
      "alt": "A sun-scorched city skyline shimmering under a hazy, white-hot summer sky.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "William Bradford on the great drought of 1623, Of Plymouth Plantation",
        "excerpt": "...the great drought which continued from the third week in May, till about the middle of July, without any rain and with great heat for the most part, insomuch as the corn began to wither away.",
        "source": "William Bradford, Of Plymouth Plantation (Bradford's History of the Plymouth Settlement, rendered into modern English by Harold Paget, 1920)",
        "href": "https://www.gutenberg.org/files/69871/69871-h/69871-h.htm"
      },
      {
        "category": "historical",
        "title": "Gilbert White on the scorching summer of 1783, The Natural History of Selborne",
        "excerpt": "The sun, at noon, looked as blank as a clouded moon, and shed a rust-coloured ferruginous light on the ground, and floors of rooms; but was particularly lurid and blood-coloured at rising and setting.",
        "source": "Gilbert White, The Natural History of Selborne, Letter LXV to Daines Barrington (1789)",
        "href": "https://www.gutenberg.org/files/1408/1408-h/1408-h.htm"
      },
      {
        "category": "literary",
        "title": "The becalmed sea beneath a burning sun — Coleridge, The Rime of the Ancient Mariner",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon.",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancient Mariner (text of 1834)",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "literary",
        "title": "Drought as divine judgment — Deuteronomy 28, King James Bible",
        "excerpt": "And thy heaven that is over thy head shall be brass, and the earth that is under thee shall be iron. The LORD shall make the rain of thy land powder and dust: from heaven shall it come down upon thee, until thou be destroyed.",
        "source": "The Holy Bible, King James Version, Deuteronomy 28:23–24",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Deuteronomy"
      },
      {
        "category": "artistic",
        "title": "\"Summer\" (L'estate), RV 315, from Vivaldi's The Four Seasons — MUSIC",
        "excerpt": "Vivaldi's \"Summer\" is prefaced by a sonnet in which, beneath the blazing and relentless sun, both man and flock languish and even the pines are scorched. The solo violin evokes bodies sapped by the heat and a land gasping in breathless, drought-like stillness before a violent summer thunderstorm finally breaks. It endures as one of music's most vivid portraits of oppressive, punishing heat.",
        "source": "Antonio Vivaldi, Le quattro stagioni (The Four Seasons), Op. 8 (1725), Concerto No. 2 in G minor, RV 315",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "The Fall of Phaeton by Peter Paul Rubens — VISUAL ARTWORK",
        "excerpt": "Rubens seizes the moment the sun-god's chariot, driven recklessly by the mortal Phaeton, careers out of control and sets the heavens and the earth ablaze, so that Zeus must hurl a thunderbolt to save the scorched world. Bodies and horses plunge through lurid, fiery light in a Baroque vision of a sky and land consumed by uncontrolled solar heat. It is an emblem of a merciless sun grown too close and too hot for the earth to bear.",
        "source": "Peter Paul Rubens, The Fall of Phaeton (c. 1604–1605), National Gallery of Art, Washington, D.C.",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/us-historic-heatwave-july-fourth--art.png",
          "alt": "Baroque painting of Phaeton falling from the blazing chariot of the sun as rearing horses and tumbling figures scatter across a fiery, smoke-filled sky.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "nrc-radiation-rule-overhaul",
    "headline": "US nuclear regulator proposes easing decades-old radiation protection rules",
    "overview": "The Nuclear Regulatory Commission proposed the first major overhaul of US radiation protection standards in half a century, moving to reconsider the long-standing linear no-threshold model and the 'as low as reasonably achievable' dose limits in favor of a risk-based approach. Supporters say it would speed reactor licensing while critics warn of weakened safeguards; the plan faces a 45-day public comment period.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxQS0M0clBnUnpWa0NVdnRCYlFjcFFDaGg5TXU0VnRZS3JROF9YZzB1LWduQ05IMUc4S0M1WGRqb0VTMTkzcHEzM2RjZWZRbVNRZVhmY0NoT2U3dWE0UXhuYzNlaDM5VFVRNEhvVy1SeWdIZkZ4QUpEc2U5aTQ0NlVYRzdkUkxXVGxyd3pOS3d2RV94RjR3T0FLQUVhZ1Z1eDc3a2E1TmN2b3JjTFRxOTFLdjlmMU81Sjd5dU4wVExrVGEwZWhyQTBPYTlR?oc=5"
      },
      {
        "name": "Nuclear Regulatory Commission",
        "href": "https://www.nrc.gov/sites/default/files/cdn/doc-collection-news/2026/26-056.pdf"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/nrc-radiation-rule-overhaul.png",
      "alt": "The cooling towers of a nuclear power plant releasing steam at dawn.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pierre Curie asks whether humanity should know the secrets of nature (Nobel address, 1903)",
        "excerpt": "It is possible to conceive that in criminal hands radium might prove very dangerous, and the question therefore arises whether it be to the advantage of humanity to know the secrets of nature, whether we be sufficiently mature to profit by them, or whether that knowledge may not prove harmful.",
        "source": "Marie Curie, Pierre Curie (1923), quoting Pierre Curie's 1903 Nobel conference — Wikisource (public domain)",
        "href": "https://en.wikisource.org/wiki/Pierre_Curie"
      },
      {
        "category": "historical",
        "title": "Marie Curie, \"The Discovery of Radium\" (Vassar College address, 1921)",
        "excerpt": "And this is a proof that scientific work must not be considered from the point of view of the direct usefulness of it. It must be done for itself, for the beauty of science, and then there is always the chance that a scientific discovery may become like the radium a benefit for humanity.",
        "source": "Marie Skłodowska Curie — Wikisource (public domain)",
        "href": "https://en.wikisource.org/wiki/The_Discovery_of_Radium"
      },
      {
        "category": "literary",
        "title": "Nathaniel Hawthorne, \"Rappaccini's Daughter\"",
        "excerpt": "It appeared to him, however, that a drop or two of moisture from the broken stem of the flower descended upon the lizard's head. For an instant the reptile contorted itself violently, and then lay motionless in the sunshine.",
        "source": "Nathaniel Hawthorne, \"Rappaccini's Daughter,\" Mosses from an Old Manse (1846), Wikisource",
        "href": "https://en.wikisource.org/wiki/Mosses_from_an_Old_Manse/Rappaccini%27s_Daughter"
      },
      {
        "category": "literary",
        "title": "Victor Frankenstein on the danger of forbidden knowledge — Mary Shelley, Frankenstein (1831)",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge, and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Shelley, Frankenstein; or, the Modern Prometheus (Revised Edition, 1831), Chapter 4 — Wikisource (public domain)",
        "href": "https://en.wikisource.org/wiki/Frankenstein,_or_the_Modern_Prometheus_(Revised_Edition,_1831)/Chapter_4"
      },
      {
        "category": "artistic",
        "title": "Alexander Scriabin, \"Prometheus: The Poem of Fire,\" Op. 60 — MUSIC",
        "excerpt": "Scriabin's 1910 tone poem for orchestra, piano, wordless chorus and a color organ (clavier à lumières) casts the Prometheus myth as the ecstatic, dangerous gift of fire to humankind. Built on his shimmering \"mystic chord,\" the work fuses light and sound to evoke a creative-destructive force barely under human control — an apt sonic emblem for harnessing radiation, the modern fire we cannot see.",
        "source": "Aleksandr Scriabin — IMSLP work page",
        "href": "https://imslp.org/wiki/Prometheus,_Le_Po%C3%A8me_du_Feu,_Op.60_(Scriabin,_Aleksandr)"
      },
      {
        "category": "artistic",
        "title": "John William Waterhouse, \"Pandora\" (1896) — VISUAL ARTWORK",
        "excerpt": "Waterhouse paints the moment Pandora lifts the lid of the forbidden jar, an invisible mist of the world's evils escaping before she can stop it. Her calm curiosity captures how easily an unseen hazard is loosed and how impossible it becomes to shut it away again — the very risk in relaxing safeguards against a danger no eye can detect.",
        "source": "John William Waterhouse — Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:John_William_Waterhouse_-_Pandora,_1896.jpg",
        "image": {
          "src": "/covers/nrc-radiation-rule-overhaul--art.png",
          "alt": "A young woman kneels beside an ornate golden casket and lifts its lid, a faint vapor curling out into the dim forest — Waterhouse's depiction of Pandora releasing the world's unseen ills.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "softbank-openai-margin-loan",
    "headline": "SoftBank revives talks for a $10 billion loan backed by its OpenAI stake",
    "overview": "SoftBank has reopened negotiations with banks for a $10 billion loan secured against its stake in OpenAI, offering to guarantee repayment after lenders balked at collateral tied solely to the hard-to-value shares. The financing would help fund the group's vast AI bets as it faces a March 2027 deadline to repay a $40 billion bridge loan.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxPcHlPOXhkWFNZNWNNTG91STB2SHYzaDZRNXNGVXdVb1NRY2VRVDJFam1oQllaLWFoY29sM1hNbTFUSUNpWWxRVGtxQk44UHhNTGl5bnV6VnpXdVdSN3o5MFhmaFl2b3pnOXk5TTN1M2lkNmxTaWh2b2xqZUJqVlZMXzJsZUotdHRCWHJoOGZuUTJTM2k4bDZDekY5U3pBYVV6V3RZRGNFSEtnWl9PNTZ6b3hiMkNYUnZqOWlFNlNhNy1sdm5rVmdxcFRUWQ?oc=5"
      },
      {
        "name": "The Next Web",
        "href": "https://thenextweb.com/news/softbank-10b-margin-loan-openai-stake-collateral"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/softbank-openai-margin-loan.png",
      "alt": "A towering glass corporate skyscraper reflecting a cool evening sky, seen from below.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Adam Smith on the Mississippi Scheme",
        "excerpt": "The idea of the possibility of multiplying paper to almost any extent was the real foundation of what is called the Mississippi scheme, the most extravagant project both of banking and stock-jobbing that, perhaps, the world ever saw.",
        "source": "An Inquiry into the Nature and Causes of the Wealth of Nations, Book II, Chapter II",
        "href": "https://www.marxists.org/reference/archive/smith-adam/works/wealth-of-nations/book02/ch02-2.htm"
      },
      {
        "category": "historical",
        "title": "Adam Smith on the South Sea Company",
        "excerpt": "But they had an immense capital divided among an immense number of proprietors. The knavery and extravagance of their stock-jobbing projects are sufficiently known, and the explication of them would be foreign to the present subject.",
        "source": "An Inquiry into the Nature and Causes of the Wealth of Nations, Book V, Chapter I",
        "href": "https://www.marxists.org/reference/archive/smith-adam/works/wealth-of-nations/book05/ch01c.htm"
      },
      {
        "category": "literary",
        "title": "Shylock's Bond in The Merchant of Venice",
        "excerpt": "Go with me to a notary, seal me there\nYour single bond; and, in a merry sport,\nIf you repay me not on such a day,\nIn such a place, such sum or sums as are\nExpress'd in the condition, let the forfeit\nBe nominated for an equal pound\nOf your fair flesh, to be cut off and taken\nIn what part of your body pleaseth me.",
        "source": "The Merchant of Venice, Act I, Scene III",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm"
      },
      {
        "category": "literary",
        "title": "The Tulipomania",
        "excerpt": "In 1634, the rage among the Dutch to possess them was so great that the ordinary industry of the country was neglected, and the population, even to its lowest dregs, embarked in the tulip trade. People of all grades converted their property into cash, and invested it in flowers.",
        "source": "Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, \"The Tulipomania\"",
        "href": "https://www.econlib.org/book-chapters/chapter-ch-3-the-tulipomania/"
      },
      {
        "category": "artistic",
        "title": "Franz Liszt, Les préludes, S.97 — MUSIC",
        "excerpt": "Liszt's third symphonic poem takes as its motto the notion that human life is but a series of preludes to an unknown song — a surge from tender beginnings through storm and struggle toward triumphant fulfilment. Its swelling brass and restless modulations dramatize ambition wagered against an uncertain fate, the very posture of one who mortgages the present on the promise of a coming boom.",
        "source": "IMSLP — Les préludes, S.97 (Liszt, Franz)",
        "href": "https://imslp.org/wiki/Les_pr%C3%A9ludes,_S.97_(Liszt,_Franz)"
      },
      {
        "category": "artistic",
        "title": "Quentin Massys, The Moneylender and His Wife — VISUAL ARTWORK",
        "excerpt": "Massys shows a banker absorbed in weighing gold coins and pearls while his wife's attention drifts from her devotional book to the glinting money on the table. The painting is an early meditation on the seductions of wealth and the fine reckoning of value — the eternal tension between spiritual duty and the appraisal of speculative fortune.",
        "source": "Wikimedia Commons — The Moneylender and his Wife (1514), Musée du Louvre",
        "href": "https://commons.wikimedia.org/wiki/File:Quinten_Massijs_(I)_-_The_Moneylender_and_his_Wife_-_WGA14281.jpg",
        "image": {
          "src": "/covers/softbank-openai-margin-loan--art.png",
          "alt": "A Flemish moneylender weighs gold coins and pearls on a balance scale while his wife, distracted from her prayer book, watches the money; a convex mirror on the table reflects a window and a reading figure.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "rembrandt-hidden-turban-restoration",
    "headline": "Restoration of an early Rembrandt reveals a turbaned figure painted out for centuries",
    "overview": "Conservators cleaning Rembrandt's early biblical scene 'Let the Little Children Come Unto Me' found that a later hand had painted a Dutch cap over a bearded man's turban and clothed a nude child, apparently softening the young artist's image of religious tolerance. The rediscovered work, begun around 1627, went to auction at Sotheby's in London with an estimate of 8 to 12 million pounds.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/restoration-of-rembrandt-painting-reveals-hidden-figure-1234753866/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/art-news/market/rediscovered-restored-early-rembrandt-auction-sothebys-1234789939/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-02",
    "image": {
      "src": "/covers/rembrandt-hidden-turban-restoration.png",
      "alt": "A conservator examining a dark seventeenth-century oil painting under raking light in a studio.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 2 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Union of Utrecht (1579), Article XIII — Dutch freedom of religion",
        "excerpt": "As for the matter of religion... each person shall remain free in his religion and that no one shall be investigated or persecuted because of his religion, as is provided in the Pacification of Ghent.",
        "source": "Union of Utrecht, 1579 (English translation), Article XIII",
        "href": "https://constitution.org/1-Constitution/cons/dutch/Union_Utrecht_1579.html"
      },
      {
        "category": "historical",
        "title": "T. L. Heath, The Method of Archimedes (1912) — the recovered palimpsest",
        "excerpt": "An attempt was made (fortunately with only partial success) to wash out the old writing, and then the parchment was used again, for the purpose of writing a Euchologion thereon, in the 12th—13th or 13th—14th centuries. The earlier writing appears with more or less clearness on most of the 177 leaves.",
        "source": "T. L. Heath, The Method of Archimedes, Recently Discovered by Heiberg (Cambridge University Press, 1912), Introductory Note",
        "href": "https://archive.org/details/methodofarchimed00arch"
      },
      {
        "category": "literary",
        "title": "Lessing, Nathan the Wise — the Parable of the Rings",
        "excerpt": "Let each feel honoured by this free affection. Unwarped of prejudice; let each endeavour To vie with both his brothers in displaying The virtue of his ring; assist its might With gentleness, benevolence, forbearance, With inward resignation to the godhead,",
        "source": "Gotthold Ephraim Lessing, Nathan the Wise, Act III (trans. William Taylor of Norwich), Project Gutenberg eBook 3820",
        "href": "https://www.gutenberg.org/ebooks/3820"
      },
      {
        "category": "literary",
        "title": "Milton, Areopagitica (1644) — Truth and Falsehood grapple",
        "excerpt": "And though all the windes of doctrin were let loose to play upon the earth, so Truth be in the field, we do injuriously, by licencing and prohibiting to misdoubt her strength. Let her and Falshood grapple; who ever knew Truth put to the wors, in a free and open encounter.",
        "source": "John Milton, Areopagitica (1644), John Milton Reading Room, Dartmouth (original spelling)",
        "href": "https://milton.host.dartmouth.edu/reading_room/areopagitica/text.shtml"
      },
      {
        "category": "artistic",
        "title": "Sweelinck, Fantasia cromatica, SwWV 258 — MUSIC",
        "excerpt": "Jan Pieterszoon Sweelinck's Fantasia cromatica is a keyboard fantasia built upon a slowly descending chromatic subject, threaded through ever-denser counterpoint. Composed by the great organist of Amsterdam's Oude Kerk at the dawn of the Dutch Golden Age, its winding lines seem to search through shadow toward resolution — an apt emblem, from Rembrandt's own city and era, for a buried image working its way back into the light.",
        "source": "Jan Pieterszoon Sweelinck, Fantasia cromatica (SwWV 258), for organ or harpsichord (IMSLP work page)",
        "href": "https://imslp.org/wiki/Fantasia_cromatica,_SwWV_258_(Sweelinck,_Jan_Pieterszoon)"
      },
      {
        "category": "artistic",
        "title": "Rembrandt, Man in Oriental Costume (\"The Noble Slav\") — VISUAL ARTWORK",
        "excerpt": "A separate, fully attested Rembrandt of 1632, now in the Metropolitan Museum of Art, portrays a dignified figure in a great turban and gold-brocaded robe. Like the turbaned man newly uncovered beneath layers of overpaint, it reflects the Dutch Golden Age's fascination with — and readiness to ennoble — the Near-Eastern 'other.'",
        "source": "Rembrandt van Rijn, Man in Oriental Costume (\"The Noble Slav\"), 1632, oil on canvas, The Metropolitan Museum of Art (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Man_in_Oriental_Costume_(%22The_Noble_Slav%22)_MET_DP146479.jpg",
        "image": {
          "src": "/covers/rembrandt-hidden-turban-restoration--art.png",
          "alt": "Rembrandt's oil painting of a standing man in a large white turban and a richly embroidered golden robe, one hand resting on a staff, gazing calmly to the side against a dark ground.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "china-export-controls-japan",
    "headline": "China imposes export controls on 40 Japanese firms as tensions with Tokyo rise",
    "overview": "China announced new export controls targeting 40 Japanese companies, escalating a diplomatic and trade dispute with Tokyo. The measures restrict shipments to the named entities and mark a sharp deterioration in relations between Asia's two largest economies.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPNC1UQ0FNc0t3cE41MlROU0dWZXplUGY5dUozSjVPM1R0MVotUzZkWFg3elRMOGRxNFFfeDBQSUFVME02ZDkzLXY3NlU5T3YzNGRxTUMzdW9iSTVDMWhtSk8xZ24yeWdmUEUzUFhrYzc0OG84b0dfUGRZRmI4OVAzNVRsZ2ZZXzhVUlBxeUpFMGFZQ0N6LWRpVURCNTl6a00?oc=5"
      },
      {
        "name": "Nikkei Asia",
        "href": "https://asia.nikkei.com/politics/international-relations/japan-china-tensions/china-restricts-exports-to-mitsubishi-hitachi-komatsu-units"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/china-export-controls-japan.png",
      "alt": "Rows of stacked shipping containers at a Chinese port under a grey, overcast sky.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Napoleon's Berlin Decree and the Continental System (1806)",
        "excerpt": "Article 1. The British Isles are declared to be in a state of blockade.\n\nArticle 2. All commerce and all correspondence with the British Isles are forbidden. Consequently letters or packages directed to England or to an Englishman or written in the English language shall not pass through the mails and shall be seized.",
        "source": "Napoleon I, \"The Berlin Decree\" (21 November 1806), English translation, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Berlin_Decree"
      },
      {
        "category": "historical",
        "title": "The Megarian Decree in Plutarch's Life of Pericles",
        "excerpt": "The Corinthians were incensed at this procedure, and denounced the Athenians at Sparta, and were joined by the Megarians, who brought their complaint that from every market-place and from all the harbors over which the Athenians had control, they were excluded and driven away, contrary to the common law and the formal oaths of the Greeks.",
        "source": "Plutarch, Life of Pericles 29, trans. Bernadotte Perrin (Loeb Classical Library, 1916), Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0055:chapter=29"
      },
      {
        "category": "literary",
        "title": "Aristophanes, The Acharnians",
        "excerpt": "Then Pericles, aflame with ire on his Olympian height, let loose the lightning, caused the thunder to roll, upset Greece and passed an edict, which ran like the song, 'That the Megarians be banished both from our land and from our markets and from the sea and from the continent.' Meanwhile the Megarians, who were beginning to die of hunger, begged the Lacedaemonians to bring about the abolition of the decree, of which those harlots were the cause; several times we refused their demand.",
        "source": "Aristophanes, The Acharnians, trans. anonymous (Athenian Society edition), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/3012/3012-h/3012-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Coriolanus",
        "excerpt": "Suffer us to famish, and their storehouses crammed with grain; make edicts for usury to support usurers; repeal daily any wholesome act established against the rich, and provide more piercing statutes daily to chain up and restrain the poor.",
        "source": "William Shakespeare, Coriolanus, Act I, Scene 1 (First Citizen), Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/1535/pg1535.txt"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Wellington's Victory, Op. 91 — MUSIC",
        "excerpt": "Beethoven's battle piece stages the clash of two great powers as raw sound, marshalling the British side under Arne's 'Rule Britannia' against the French advancing to 'Malbrough s'en va-t-en guerre,' the two national tunes colliding in cannon-fire and drum-rolls. Composed to mark Wellington's rout of the French in 1813, it belongs to the same era of Napoleonic economic warfare and continental blockade, when commerce and armies alike were weapons between rival empires. Its programmatic din makes audible the theme of two dominant states locked in coercive confrontation, each refusing the other passage.",
        "source": "Ludwig van Beethoven, Wellingtons Sieg, Op. 91 (Wellington's Victory), IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Wellingtons_Sieg,_Op.91_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "James Gillray, The Plumb-pudding in danger — VISUAL ARTWORK",
        "excerpt": "Gillray's 1805 satire seats William Pitt and Napoleon at opposite ends of a table, each carving a slice from a globe-shaped plum pudding, coldly dividing the world into rival spheres of control. Pitt's trident-fork stakes Britain's claim to the oceans while Napoleon's blade sweeps across Europe, a vivid image of two dominant powers partitioning trade and territory between them. The print distills the logic of great-power economic rivalry, in which access to the world's commerce is something the strong apportion to themselves.",
        "source": "James Gillray, \"The Plumb-pudding in danger; –or– State Epicures taking un Petit Souper\" (1805), hand-coloured etching, Library of Congress via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Caricature_gillray_plumpudding.jpg",
        "image": {
          "src": "/covers/china-export-controls-japan--art.png",
          "alt": "James Gillray's 1805 caricature The Plumb-pudding in danger, showing Pitt and Napoleon carving up a globe-shaped pudding of the world.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "google-klarna-antitrust-sweden",
    "headline": "Swedish court orders Google to pay $1.5 billion to Klarna in antitrust case",
    "overview": "A Swedish court ordered Google to pay 1.5 billion dollars in damages to the payments company Klarna, finding the search giant had abused its market position. It is one of the largest private antitrust awards against Google in Europe.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPSUR2WFBXY0dxNVhUYnNOUDF2OWRvZTB2SDU3a2djdHF6NWRkRm1Fc1JTUDl2NENKQ0ZKaC15N1V5QzRLWXo0OGNLT2h4LU1fbWpCODBNMTh3VVJqcFlyTXA0ektubGxMQWx3NzFvblJ4SG1wcXpRQm93OVpmdkZ1cXowUk5yd3lnUjdMS2I1QldWa3NYdzEyaFV1YldrVWhqN3kzVnl3QjNhTktkaVkwNVl1Yw?oc=5"
      },
      {
        "name": "PYMNTS",
        "href": "https://www.pymnts.com/legal/antitrust/2026/klarnas-pricerunner-awarded-1-9-billion-in-google-antitrust-case/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/google-klarna-antitrust-sweden.png",
      "alt": "A glass corporate office tower reflecting a pale sky, seen from below.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "David and Goliath (1 Samuel 17)",
        "excerpt": "Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied.",
        "source": "The Bible (King James Version), 1 Samuel 17:45, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "historical",
        "title": "Theodore Roosevelt on the trusts (First Annual Message, 1901)",
        "excerpt": "Great corporations exist only because they are created and safeguarded by our institutions; and it is therefore our right and our duty to see that they work in harmony with these institutions.",
        "source": "Theodore Roosevelt, First State of the Union Address (3 December 1901), Wikisource",
        "href": "https://en.wikisource.org/wiki/Theodore_Roosevelt%27s_First_State_of_the_Union_Address"
      },
      {
        "category": "literary",
        "title": "Prometheus Bound by Aeschylus",
        "excerpt": "Such an ignominious bondage hath the new ruler of the immortals devised against me.",
        "source": "Aeschylus, Prometheus Bound (trans. Theodore Alois Buckley), Project Gutenberg eBook #27458",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "literary",
        "title": "Gulliver's Travels by Jonathan Swift",
        "excerpt": "I found my arms and legs were strongly fastened on each side to the ground; and my hair, which was long and thick, tied down in the same manner.",
        "source": "Jonathan Swift, Gulliver's Travels, Part I, Chapter I, Project Gutenberg eBook #829",
        "href": "https://www.gutenberg.org/files/829/829-h/829-h.htm"
      },
      {
        "category": "artistic",
        "title": "Judas Maccabaeus, HWV 63 by George Frideric Handel — MUSIC",
        "excerpt": "Handel's 1746 oratorio turns a small people's revolt against a mighty empire into blazing choral triumph, its trumpets and drums swelling as the underdog prevails. The famous chorus 'See, the Conqu'ring Hero Comes' crowns the victor not by sheer force but by righteous resolve. It is the sound of a colossus overmatched and a lesser rival exalted, an apt fanfare for a giant humbled in court.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63 (1746), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "David with the Head of Goliath by Caravaggio — VISUAL ARTWORK",
        "excerpt": "Caravaggio's David with the Head of Goliath (c. 1610, Galleria Borghese) shows a pensive young shepherd holding aloft the severed head of the fallen giant. The tenebrist light isolates the trophy against darkness, making the toppling of overwhelming might feel intimate and sober rather than boastful. The image distills the theme of a smaller challenger who, against all odds, brings down a dominant power.",
        "source": "Michelangelo Merisi da Caravaggio, David with the Head of Goliath (c. 1610), Galleria Borghese, Rome; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "image": {
          "src": "/covers/google-klarna-antitrust-sweden--art.png",
          "alt": "Caravaggio's painting David with the Head of Goliath, a young David holding the severed head of the giant Goliath against a dark background",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "un-panel-ai-catastrophic-risks",
    "headline": "UN scientific panel warns unchecked AI progress could pose catastrophic risks",
    "overview": "A United Nations expert panel warned that rapid, unchecked advances in artificial intelligence could pose catastrophic risks to humanity, while also citing enormous potential benefits. The report urged stronger international governance of the technology.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPZzlYcjZBRTVTUHhqcGM3ZXZwVS1XWktHaWVmckFuZjg1bzZPNnZqWDJxUzktV2c4TDA5VHY4ajIxbjVrb21MYnRiM0Q3WDRmMUZZQWxpWlZzZGh4QlVsWF82SGlYZ3lSZVNab056ZWdhTWphSnhXY2lZZHUxb19oWF9udWpTQnNGWkFVVFo0Y0VPckVYTkU5VmozMHA2dE9OanE3SER1cFVzN0U4WkE?oc=5"
      },
      {
        "name": "UN News",
        "href": "https://news.un.org/en/story/2026/07/1167848"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/un-panel-ai-catastrophic-risks.png",
      "alt": "Rows of glowing server racks receding into darkness in a data centre.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Prometheus steals fire from the gods",
        "excerpt": "He hid fire; but that the noble son of Iapetus stole again for men from Zeus the counsellor in a hollow fennel-stalk, so that Zeus who delights in thunder did not see it. But afterwards Zeus who gathers the clouds said to him in anger: 'Son of Iapetus, surpassing all in cunning, you are glad that you have outwitted me and stolen fire—a great plague to you yourself and to men that shall be.'",
        "source": "Hesiod, Works and Days, trans. Hugh G. Evelyn-White, Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0132:card=42"
      },
      {
        "category": "historical",
        "title": "Pandora opens the jar of evils",
        "excerpt": "But the woman took off the great lid of the jar with her hands and scattered, all these and her thought caused sorrow and mischief to men. Only Hope remained there in an unbreakable home within under the rim of the great jar, and did not fly out at the door.",
        "source": "Hesiod, Works and Days, trans. Hugh G. Evelyn-White, Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0132:card=90"
      },
      {
        "category": "literary",
        "title": "Frankenstein warns of dangerous knowledge",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "literary",
        "title": "Faust's fateful bargain",
        "excerpt": "When thus I hail the Moment flying: 'Ah, still delay—thou art so fair!' Then bind me in thy bonds undying, My final ruin then declare!",
        "source": "Johann Wolfgang von Goethe, Faust, trans. Bayard Taylor, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/14591/14591-h/14591-h.htm"
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, L'apprenti sorcier — MUSIC",
        "excerpt": "Paul Dukas's orchestral scherzo L'apprenti sorcier (The Sorcerer's Apprentice, 1897) sets Goethe's ballad in which an apprentice enchants a broom to fetch water, only to lose control of the force he has summoned. Unable to reverse the spell, he watches his creation multiply and flood the workshop until the master returns to restore order. The music has become a byword for a powerful technology unleashed without the wisdom to command it—an apt parallel to warnings that AI is outpacing our ability to govern it.",
        "source": "Paul Dukas, L'apprenti sorcier (score and parts), International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)"
      },
      {
        "category": "artistic",
        "title": "Heinrich Füger, Prometheus Brings Fire to Mankind — VISUAL ARTWORK",
        "excerpt": "Heinrich Friedrich Füger's neoclassical canvas Prometheus Brings Fire to Mankind (c. 1817) shows the Titan pressing a stolen flame toward newly formed humanity, a gift of transformative power that Zeus had deliberately withheld. The painting captures the double edge of the myth: the same fire that lifts humankind toward civilization also invites divine retribution and unforeseen consequences. It stands as an enduring image of a creation both liberating and perilous, echoing debates over an AI technology whose promise is matched by its capacity for catastrophic harm.",
        "source": "Heinrich Friedrich Füger, Prometheus Brings Fire to Mankind (c. 1817), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/un-panel-ai-catastrophic-risks--art.png",
          "alt": "Neoclassical painting of the Titan Prometheus bringing fire to reclining human figures",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "kroger-giant-eagle-acquisition",
    "headline": "Kroger to buy grocery chain Giant Eagle in a $1.65 billion deal",
    "overview": "The supermarket giant Kroger agreed to acquire the regional grocer Giant Eagle for 1.65 billion dollars, expanding its footprint as competition in US grocery intensifies. The deal adds Giant Eagle's stores and fuel outlets to Kroger's national network.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOU0xTcWNLdGw2QWFGbUtjLTBIcjFtQXIybUdxTlRJdE9lV0F4ZlZsWkxndjgxek5UWVRuX1ZtVEFMbHRSaC1LaV9jd2IxNGphblY3X1NjZWtKbEtfalM3VzJxX2R1anJYM2JMS0NpSzM0S0MzSGZsSjVXTEx5R1FsOU1pMkZWTURwYl9IT2g0Tk9SenMyeFFfd2Z3dw?oc=5"
      },
      {
        "name": "Supermarket News",
        "href": "https://www.supermarketnews.com/mergers-acquisitions/kroger-to-acquire-giant-eagle-for-1-65b"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/kroger-giant-eagle-acquisition.png",
      "alt": "A brightly lit supermarket aisle lined with stocked shelves, empty of shoppers.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Cleveland Conquest: Standard Oil absorbs its rivals",
        "excerpt": "In less than four months in 1872, in what was later known as \"The Cleveland Conquest\" or \"The Cleveland Massacre\", Standard Oil absorbed 22 of its 26 Cleveland competitors. By 1880, through elimination of competitors, mergers with other firms, and use of favourable railroad rebates, it controlled the refining of 90 to 95 percent of all oil produced in the United States.",
        "source": "Encyclopaedia Britannica, \"Standard Oil | History, Monopoly, & Breakup\"",
        "href": "https://www.britannica.com/money/Standard-Oil"
      },
      {
        "category": "historical",
        "title": "The Sherman Antitrust Act of 1890",
        "excerpt": "Every contract, combination in the form of trust or otherwise, or conspiracy, in restraint of trade or commerce among the several States, or with foreign nations, is hereby declared to be illegal.",
        "source": "Sherman Anti-Trust Act (1890), Section 1, U.S. National Archives, Milestone Documents",
        "href": "https://www.archives.gov/milestone-documents/sherman-anti-trust-act"
      },
      {
        "category": "literary",
        "title": "Ahab's boundless pursuit of the White Whale in Moby-Dick",
        "excerpt": "Aye, aye! and I'll chase him round Good Hope, and round the Horn, and round the Norway Maelstrom, and round perdition's flames before I give him up. And this is what ye have shipped for, men! to chase that white whale on both sides of land, and over all sides of earth, till he spouts black blood and rolls fin out.",
        "source": "Herman Melville, Moby-Dick; or, The Whale (1851), Chapter 36, \"The Quarter-Deck\"; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2701/pg2701.txt"
      },
      {
        "category": "literary",
        "title": "The Parable of the Talents: to him that hath shall be given",
        "excerpt": "Take therefore the talent from him, and give it unto him which hath ten talents. For unto every one that hath shall be given, and he shall have abundance: but from him that hath not shall be taken away even that which he hath.",
        "source": "The Gospel According to St. Matthew 25:28-29, King James Bible; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "artistic",
        "title": "Smetana, Vltava (The Moldau) from Má vlast — MUSIC",
        "excerpt": "Bedřich Smetana's symphonic poem Vltava (1874) traces the course of Bohemia's great river from its two tiny mountain springs, whose trickling motifs merge and swell until they become a single mighty current sweeping toward Prague. The music dramatizes how many small tributaries are gathered up and absorbed into one dominant flow, a natural image of consolidation and the great growing ever greater by drawing in the small. The score is in the public domain and freely available on IMSLP.",
        "source": "Bedřich Smetana, Vltava, JB 1:112/2 (from Má vlast), 1874; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Vltava,_JB_1:112/2_(Smetana,_Bed%C5%99ich)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, \"Big Fish Eat Little Fish\" — VISUAL ARTWORK",
        "excerpt": "Pieter Bruegel the Elder's 1556 design, engraved by Pieter van der Heyden in 1557, shows an enormous beached fish being sliced open to spill out dozens of smaller fish it has swallowed, while a man points out the scene to a boy and hands hold up ever-smaller fish devouring one another. The proverb it illustrates, \"the big fish eat the little fish,\" is a centuries-old emblem for how the powerful consume the weak and how markets tend toward the great absorbing the small. The work is in the public domain and held at the Rijksmuseum and other collections.",
        "source": "Pieter Bruegel the Elder, \"Big Fish Eat Little Fish,\" 1556 (engraving by Pieter van der Heyden, 1557); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Big_Fish_Eat_Little_Fish,_1556_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/kroger-giant-eagle-acquisition--art.png",
          "alt": "Bruegel's engraving Big Fish Eat Little Fish, showing a giant fish cut open to reveal many smaller fish it swallowed",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "cma-cgm-fedex-logistics-deal",
    "headline": "CMA CGM to buy FedEx's third-party logistics arm in a $1.4 billion deal",
    "overview": "The French shipping group CMA CGM agreed to acquire FedEx's third-party logistics business for 1.4 billion dollars, deepening its move into contract logistics. The purchase expands CMA CGM's land-based supply-chain operations beyond container shipping.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxQdS1JUGhGT0JHVHBZOTQ4UEVQb0xGMXlVbDl1RDlsWWJfM21abmZ3Yk9ydHdKdWpBM09yS0xnV0duNl80Mkh0Z2NUVmVMTkRwcEJpSTBiajBYOW9vMnRMT0JNWHlSRld1YVZvVlk2YTFjbDBURllmVTlFREdCMHBtRzdwcDZrbGhUbmlZNnktZlBaZUxfMElBSW95OU5zeFpoRWVsNGlxeGpGOElxNm5iczBJLTJrQQ?oc=5"
      },
      {
        "name": "Supply Chain Dive",
        "href": "https://www.supplychaindive.com/news/cma-cgm-to-buy-fedexs-contract-logistics-unit-for-14b/824222/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/cma-cgm-fedex-logistics-deal.png",
      "alt": "A container ship stacked with cargo docked beside cranes at a port terminal.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Hanseatic League",
        "excerpt": "Hanseatic League, organization founded by north German towns and German merchant communities abroad to protect their mutual trading interests. The league dominated commercial activity in northern Europe from the 13th to the 15th century.",
        "source": "\"Hanseatic League,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/topic/Hanseatic-League"
      },
      {
        "category": "historical",
        "title": "The Phoenician Sea Traders",
        "excerpt": "The Phoenicians were well known to their contemporaries as sea traders and colonizers, and by the 2nd millennium they had already extended their influence along the coast of the Levant by a series of settlements, including Joppa (Jaffa, now part of Tel Aviv–Yafo), Dor, Acre, and Ugarit.",
        "source": "\"Phoenicia,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/topic/Phoenicia"
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey (Book II)",
        "excerpt": "They set the mast in its socket in the cross plank, raised it, and made it fast with the forestays; then they hoisted their white sails aloft with ropes of twisted ox hide. As the sail bellied out with the wind, the ship flew through the deep blue water, and the foam hissed against her bows as she sped onward.",
        "source": "Homer, The Odyssey, trans. Samuel Butler (Project Gutenberg, eBook #1727)",
        "href": "https://www.gutenberg.org/files/1727/1727-0.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Merchant of Venice (Act 1, Scene 1)",
        "excerpt": "Your minde is tossing on the Ocean,\nThere where your Argosies with portly saile\nLike Signiors and rich Burgers on the flood,\nOr as it were the Pageants of the sea,\nDo ouer-peere the pettie Traffiquers\nThat curtsie to them, do them reuerence\nAs they flye by them with their wouen wings",
        "source": "William Shakespeare, The Merchant of Venice (First Folio text, Project Gutenberg, eBook #2243)",
        "href": "https://www.gutenberg.org/cache/epub/2243/pg2243.txt"
      },
      {
        "category": "artistic",
        "title": "Mendelssohn, Meeresstille und glückliche Fahrt (Calm Sea and Prosperous Voyage), Op. 27 — MUSIC",
        "excerpt": "Felix Mendelssohn's concert overture of 1828, inspired by two Goethe poems, paints in music the dread stillness of a becalmed ship and then the joyous rush of a returning wind that carries the vessel safely to harbour. Its slow, motionless opening followed by a bright, surging Allegro mirrors the perilous patience and eventual triumph of a maritime voyage. The overture became a touchstone for Romantic sea music, evoking the movement of ships and goods across open water.",
        "source": "Felix Mendelssohn, Meeresstille und glückliche Fahrt, Op. 27 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Meeresstille_und_gl%C3%BCckliche_Fahrt,_Op.27_(Mendelssohn,_Felix)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, Dutch Boats in a Gale ('The Bridgewater Sea Piece') — VISUAL ARTWORK",
        "excerpt": "J. M. W. Turner's 1801 oil painting shows Dutch fishing and trading vessels struggling under billowing sails in a heavy sea, the water churning as the boats fight to keep their course. The scene captures the danger and drama of commerce carried by ship, when the movement of goods across the water depended on wind, seamanship, and nerve. Turner's dynamic seascape stands as a Romantic emblem of maritime trade at the mercy of the elements.",
        "source": "J. M. W. Turner, Dutch Boats in a Gale ('The Bridgewater Sea Piece'), 1801, oil on canvas — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Dutch_Boats_in_a_Gale_-_WGA23163.jpg",
        "image": {
          "src": "/covers/cma-cgm-fedex-logistics-deal--art.png",
          "alt": "Turner's painting of Dutch sailing boats pitching in a stormy sea under heavy clouds",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "micron-gm-chip-supply-deal",
    "headline": "Micron and General Motors sign a semiconductor supply agreement for vehicles",
    "overview": "The chipmaker Micron and General Motors signed a multi-year agreement to supply memory chips for GM vehicles, tightening ties between US automakers and domestic semiconductor suppliers. The deal reflects a broader push to secure automotive chip supply chains.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOTzBDSjNpak1rX0FwX3phTURLa2dYbkRSUzFyWDNBTlZ0MXR3aElaWEhjMEUxOHRiNmY1NWlRYm50ZUxiRl9zcldSUjBQNGNCV0tDdGpSLUNyTEZleXpFSUphSEk2RVRURGU0QS00Q1hHZkdoUU44UXBLeEhVM3FQSTBLdjVNNUpMT0t6cjNndW1zNWlIcVBRNm43T3FJaGNoaEw4?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://finance.yahoo.com/technology/articles/general-motors-shares-rise-securing-133524326.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/micron-gm-chip-supply-deal.png",
      "alt": "A silicon wafer held under bright light, its circuitry catching a rainbow sheen.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Augustus and Rome's grain supply",
        "excerpt": "I was strongly inclined to do away forever with distributions of grain, because through dependence on them agriculture was neglected; but I did not carry out my purpose, feeling sure that they would one day be renewed through desire for popular favour.",
        "source": "Suetonius, The Lives of the Caesars, \"The Deified Augustus\" 42, trans. J. C. Rolfe (Loeb Classical Library, 1914), public domain (LacusCurtius/Penelope, University of Chicago).",
        "href": "https://penelope.uchicago.edu/Thayer/e/roman/texts/suetonius/12caesars/augustus*.html"
      },
      {
        "category": "historical",
        "title": "Pliny on iron, the maker's essential metal",
        "excerpt": "Iron serves as the best and the worst part of the apparatus of life, inasmuch as with it we plough the ground, plant trees, trim the trees that prop our vines, force the vines to renew their youth yearly by ridding them of decrepit growth; with it we build houses and quarry rocks, and we employ it for all other useful purposes, but we likewise use it for wars and slaughter and brigandage.",
        "source": "Pliny the Elder, Natural History, Book XXXIV.39, trans. H. Rackham (Loeb Classical Library), public domain (Attalus.org).",
        "href": "https://www.attalus.org/pliny/hn34b.html"
      },
      {
        "category": "literary",
        "title": "Hephaestus forges the arms of Achilles (Iliad, Book 18)",
        "excerpt": "And the bellows, twenty in all, blew upon the melting-vats, sending forth a ready blast of every force, now to further him as he laboured hard, and again in whatsoever way Hephaestus might wish and his work go on.",
        "source": "Homer, Iliad 18, trans. A. T. Murray (Harvard University Press / Loeb Classical Library, 1924), public domain (Perseus Digital Library, Tufts University).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18"
      },
      {
        "category": "literary",
        "title": "The forging of the sword Gram (Volsunga Saga)",
        "excerpt": "So he made a sword, and as he bore it forth from the forge, it seemed to the smiths as though fire burned along the edges thereof. Now he bade Sigurd take the sword, and said he knew not how to make a sword if this one failed. Then Sigurd smote it into the anvil, and cleft it down to the stock thereof, and neither burst the sword nor brake it.",
        "source": "The Story of the Volsungs (Volsunga Saga), Chapter XV, trans. Eirikr Magnusson and William Morris (1888), public domain (Project Gutenberg).",
        "href": "https://www.gutenberg.org/files/1152/1152-h/1152-h.htm"
      },
      {
        "category": "artistic",
        "title": "Wagner, Siegfried (the Forging Song) — MUSIC",
        "excerpt": "In the first act of Wagner's music drama Siegfried, the second opera of the Ring cycle, the young hero reforges the shards of his father's shattered sword Nothung, singing the ringing \"Schmiedelieder\" (Forging Songs) as he blows the bellows and hammers the blade on the anvil. The orchestra drives the scene with hammer-stroke rhythms, dramatizing self-reliance and the making of one's own essential weapon from raw material. This IMSLP page hosts public-domain full and vocal scores of the work.",
        "source": "Richard Wagner, Siegfried, WWV 86C (1876), full and vocal scores, public domain, IMSLP Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Velázquez, The Forge of Vulcan — VISUAL ARTWORK",
        "excerpt": "Diego Velázquez's Apollo in the Forge of Vulcan (La Fragua de Vulcano, 1630, Museo del Prado) shows Apollo arriving at the smoky workshop where Vulcan and his laborers pause at the anvil, glowing iron in hand. It is a monumental study of the smith's craft and of skilled makers supplying the tools and armor on which gods and heroes depend. The painting is in the public domain and held in the Prado, Madrid.",
        "source": "Diego Velázquez, Apollo in the Forge of Vulcan (La Fragua de Vulcano), 1630, oil on canvas, Museo del Prado, Madrid; public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/micron-gm-chip-supply-deal--art.png",
          "alt": "Velázquez's painting The Forge of Vulcan, showing Apollo visiting Vulcan and his smiths at the anvil",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "poland-russia-sabotage-warning",
    "headline": "Poland warns Russia is seeking to exploit Ukraine tensions with sabotage operations",
    "overview": "Poland warned that Russia is seeking to exploit tensions over Ukraine by mounting sabotage operations across Europe, citing a rise in arson, cyberattacks and other disruptions. Warsaw said it had stepped up security in response to the threat.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQdGNZQnZSazhzRWRvTFhYQjQ0NG9NYmhMdGRmQUxYLTkzUUlrMUtRTll5TlFkbG5DM2hzdU1SSVJCSnJqVHFKcE5IUUdWcE9ZSXJySkF5dUpHTWZmVFZLdnRLeHdtVkUxU2piUUllWEFscmdzbVFhMU1vWk1VbW40TkM1UVJrWVBaZnNlSHI4RVNqWlFOTnZlaXotaWRjbFdOdUJQMjVqVDlUNW5udnBCbTU5YTNKOGk3?oc=5"
      },
      {
        "name": "Ukrainska Pravda",
        "href": "https://www.yahoo.com/news/world/articles/poland-warns-russia-may-exploit-085300859.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/poland-russia-sabotage-warning.png",
      "alt": "Empty railway tracks stretching into darkness under a single security floodlight.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sun Tzu, The Art of War, Chapter XIII: The Use of Spies",
        "excerpt": "Thus, what enables the wise sovereign and the good general to strike and conquer, and achieve things beyond the reach of ordinary men, is _foreknowledge_. Now this foreknowledge cannot be elicited from spirits; it cannot be obtained inductively from experience, nor by any deductive calculation. Knowledge of the enemy's dispositions can only be obtained from other men.",
        "source": "Sun Tzu, The Art of War, trans. Lionel Giles (1910), Chapter XIII: The Use of Spies, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/17405/17405-h/17405-h.htm"
      },
      {
        "category": "historical",
        "title": "The Gunpowder Plot: Guy Fawkes's Confession (1605)",
        "excerpt": "I stood as sentinel, to descrie any man that came near, whereof I gave them warning, and so they ceased until I gave notice again to proceed.",
        "source": "Thomas Lathbury, Guy Fawkes; or, A Complete History of the Gunpowder Treason, quoting Guy Fawkes's confession (1605), Project Gutenberg.",
        "href": "https://gutenberg.org/files/31031/31031-h/31031-h.htm"
      },
      {
        "category": "literary",
        "title": "Virgil, The Aeneid, Book II: The Trojan Horse",
        "excerpt": "Thus they pretend, but in the hollow side\nSelected numbers of their soldiers hide:\nWith inward arms the dire machine they load,\nAnd iron bowels stuff the dark abode.",
        "source": "Virgil, The Aeneid, trans. John Dryden, Book II, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "Joseph Conrad, The Secret Agent",
        "excerpt": "The door of the shop was the only means of entrance to the house in which Mr Verloc carried on his business of a seller of shady wares, exercised his vocation of a protector of society, and cultivated his domestic virtues.",
        "source": "Joseph Conrad, The Secret Agent: A Simple Tale (1907), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/974/974-h/974-h.htm"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, Un ballo in maschera — MUSIC",
        "excerpt": "Verdi's 1859 opera dramatises a hidden conspiracy: behind the glittering surface of court life, a circle of plotters conspires in secret to assassinate the ruler, their treachery masked until it strikes at a masked ball. Its brooding conspirators' choruses and whispered scheming make it a musical portrait of the enemy within — subversion, betrayal and a plot hatched behind the lines. The full orchestral score, published by Ricordi, is freely available on IMSLP.",
        "source": "Giuseppe Verdi, Un ballo in maschera (opera in three acts, 1859), full score, G. Ricordi; IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Un_ballo_in_maschera_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse in Troy — VISUAL ARTWORK",
        "excerpt": "Giovanni Domenico Tiepolo's canvas (c. 1773) shows the Trojans jubilantly hauling the great wooden horse through their own gates, unaware that armed Greeks lie concealed within it. The painting captures the essence of the fifth column and the hidden enemy: destruction welcomed inside the walls under the guise of a gift. It is a Rococo meditation on deception, misplaced trust and sabotage carried out from within.",
        "source": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse in Troy (c. 1773), oil on canvas, National Gallery, London (NG3319); Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Giovanni_Domenico_Tiepolo_-_The_Procession_of_the_Trojan_Horse_in_Troy_-_WGA22382.jpg",
        "image": {
          "src": "/covers/poland-russia-sabotage-warning--art.png",
          "alt": "Painting of Trojans pulling the large wooden horse into the city of Troy, concealing hidden Greek soldiers",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "romania-storm-deadly",
    "headline": "A powerful storm sweeps Romania, killing at least one person",
    "overview": "A powerful storm battered Romania with high winds and heavy rain, killing at least one person and causing widespread damage. Emergency services responded to fallen trees and flooding as the severe weather moved across the country.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNOG9yVnhOaFRqZUZGV3ZPZ1ZRYWdwQl9yZHQ0Y2dZZ3d2V2I1cVk3XzVvbms0WlRVc2U1eUdYd3RBdUtjWmZyRWJ0TVZzSEZEZFozVDZDaVFnYWl5eU9Ibzc1cmdaemhLUkxKelNNVGRGSjNNT2o0bFA2enpKWFloa1JlWjAtNE91ZENTaFFsREEzVHR3WVRYRDRNbkJlSjdrYldpMQ?oc=5"
      },
      {
        "name": "Romania Insider",
        "href": "https://www.romania-insider.com/powerful-storm-bucharest-july1-2026"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/romania-storm-deadly.png",
      "alt": "Dark storm clouds massing over the rooftops of a Central European city.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Storm of 1703, as recorded by Daniel Defoe",
        "excerpt": "the Bricks, Tiles, and Stones, from the Tops of the Houses, flew with such force, and so thick in the Streets, that no one thought fit to venture out",
        "source": "Daniel Defoe, The Storm; or, a Collection of the most Remarkable Casualties and Disasters which happen'd in the Late Dreadful Tempest, both by Sea and Land (1704), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/42234/42234-h/42234-h.htm"
      },
      {
        "category": "historical",
        "title": "Aeolus unleashes the winds in Virgil's Aeneid, Book I",
        "excerpt": "The raging winds rush thro' the hollow wound, / And dance aloft in air, and skim along the ground; / Then, settling on the sea, the surges sweep, / Raise liquid mountains, and disclose the deep.",
        "source": "Virgil, The Aeneid, Book I, translated by John Dryden, Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "King Lear rages against the storm, Act III, Scene 2",
        "excerpt": "Blow, winds, and crack your cheeks! Rage! blow! You cataracts and hurricanoes, spout Till you have drench'd our steeples, drown'd the cocks! You sulphurous and thought-executing fires, Vaunt-couriers to oak-cleaving thunderbolts, Singe my white head! And thou, all-shaking thunder, Strike flat the thick rotundity o' the world!",
        "source": "William Shakespeare, King Lear, Act III, Scene 2, Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/1532/pg1532.txt"
      },
      {
        "category": "literary",
        "title": "The tempest sent upon Jonah's ship, Book of Jonah 1:4-5",
        "excerpt": "But the LORD sent out a great wind into the sea, and there was a mighty tempest in the sea, so that the ship was like to be broken. Then the mariners were afraid, and cried every man unto his god, and cast forth the wares that were in the ship into the sea, to lighten it of them.",
        "source": "The Book of Jonah 1:4-5, King James Version, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jonah"
      },
      {
        "category": "artistic",
        "title": "Beethoven's Symphony No. 6 in F major, Op. 68 (Pastoral), 4th movement 'Gewitter, Sturm' — MUSIC",
        "excerpt": "The fourth movement of Beethoven's Pastoral Symphony, marked 'Gewitter, Sturm' (Thunderstorm, Tempest), erupts as a sudden violent storm that shatters the pastoral calm of the preceding movements. Rumbling low strings, stabbing timpani and shrieking piccolo evoke gathering wind, lightning and torrential downpour before the tempest gradually subsides. It stands as one of music's most vivid depictions of nature's fury unleashed.",
        "source": "Ludwig van Beethoven, Symphony No. 6 in F major, Op. 68 ('Pastoral'), fourth movement, full score, IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, 'Snow Storm: Steam-Boat off a Harbour's Mouth' (c. 1842) — VISUAL ARTWORK",
        "excerpt": "Turner's late masterpiece dissolves a steamboat into a swirling vortex of snow, spray and churning sea, placing the viewer at the heart of the tempest itself. The artist claimed he had himself lashed to the mast of a ship to witness such a storm, and the painting's whirling energy conveys the overwhelming, engulfing violence of wind and water. It is a quintessential Romantic image of nature's sublime fury overwhelming human endeavour.",
        "source": "Joseph Mallord William Turner, Snow Storm: Steam-Boat off a Harbour's Mouth, oil on canvas, c. 1842, Tate Britain; public domain reproduction via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_Snow_Storm_-_Steam-Boat_off_a_Harbour%27s_Mouth_-_WGA23178.jpg",
        "image": {
          "src": "/covers/romania-storm-deadly--art.png",
          "alt": "Turner's painting Snow Storm: Steam-Boat off a Harbour's Mouth, a steamboat engulfed in a swirling vortex of snow, spray and turbulent sea.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "uganda-marburg-case",
    "headline": "Africa CDC says Uganda has confirmed an isolated case of Marburg virus",
    "overview": "The Africa Centres for Disease Control said Uganda had confirmed an isolated case of Marburg virus disease, a highly lethal hemorrhagic fever related to Ebola. Health authorities said contact tracing was under way to contain any spread.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0gFBVV95cUxNYnE5dWdkeVJ4b3FqWC1jdG1UYXl6NTFfaUtLWDlwNFJjU2hvUHpKWFpkd0UyQXVObkttRndNVGpSbG5QaDVMUU9SdUI0amplZ1JzMGZ4QzV2WEJjeGFaVzdJMk56NU0tY191RVBQVENBRk1ZakJvb0FXX1BtZlZVOGt1VmRyLUIwaUVWalZvU01ORFJLakY4QlJZeFUxMm1ibWF1VUVub3BnVTdtZ01Ha3ZlYXpfd0lfdDRkTFoyVk5KdmtQV1JLcUk4NlJrTmw0WFE?oc=5"
      },
      {
        "name": "STAT News",
        "href": "https://www.statnews.com/2026/06/30/marburg-virus-cases-ugandan-ebola-outbreak-zone/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/uganda-marburg-case.png",
      "alt": "A lab technician in full protective gear handling vials in a biosafety laboratory.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides on the Plague of Athens",
        "excerpt": "As a rule, however, there was no ostensible cause; but people in good health were all of a sudden attacked by violent heats in the head, and redness and inflammation in the eyes, the inward parts, such as the throat or tongue, becoming bloody and emitting an unnatural and fetid breath.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2, ch. 49 (Wikisource, Crawley translation)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "Boccaccio's account of the Black Death in Florence",
        "excerpt": "in men and women alike there appeared, at the beginning of the malady, certain swellings, either on the groin or under the armpits, whereof some waxed of the bigness of a common apple, others like unto an egg",
        "source": "Giovanni Boccaccio, The Decameron, Introduction to the First Day, trans. John Payne (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/23700/pg23700.txt"
      },
      {
        "category": "literary",
        "title": "Daniel Defoe, A Journal of the Plague Year",
        "excerpt": "Business led me out sometimes to the other end of the town, even when the sickness was chiefly there; and as the thing was new to me, as well as to everybody else, it was a most surprising thing to see those streets which were usually so thronged now grown desolate, and so few people to be seen in them.",
        "source": "Daniel Defoe, A Journal of the Plague Year (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, The Masque of the Red Death",
        "excerpt": "The \"Red Death\" had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal--the redness and the horror of blood.",
        "source": "Edgar Allan Poe, The Masque of the Red Death (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1064/pg1064.txt"
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns, Danse macabre, Op. 40 — MUSIC",
        "excerpt": "Saint-Saëns's 1874 symphonic poem gives orchestral form to the medieval danse macabre, in which Death fiddles the living into a graveyard dance. A solo violin tuned to a rasping tritone and a xylophone evoking rattling bones summon the dead to their revels before the crowing of the cock scatters them at dawn. The work distils the old terror of an unseen killer that claims high and low alike into a single, feverish nocturne.",
        "source": "Camille Saint-Saëns, Danse macabre, Op. 40 (score, IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Triumph of Death — VISUAL ARTWORK",
        "excerpt": "Painted around 1562, Bruegel's panel spreads a panoramic vision of pestilence and mortality across a scorched landscape, where armies of skeletons harvest the living without regard for rank, wealth or piety. Kings, lovers, soldiers and peasants are herded alike toward a great coffin-lidded trap, dramatising the universal, indiscriminate reach of a lethal contagion. The work is a defining image of the fear of an unseen killer and of a world overwhelmed by death.",
        "source": "Pieter Bruegel the Elder, The Triumph of Death (c. 1562), Museo del Prado, Madrid; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Triumph_of_Death_-_WGA3389.jpg",
        "image": {
          "src": "/covers/uganda-marburg-case--art.png",
          "alt": "Pieter Bruegel the Elder's painting The Triumph of Death, showing armies of skeletons overwhelming people of all social ranks across a barren landscape",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "carroll-trump-damages-appeal",
    "headline": "E. Jean Carroll seeks $5.8 million from Trump after his high court appeal fails",
    "overview": "The writer E. Jean Carroll called on President Trump to pay 5.8 million dollars in damages after the Supreme Court declined to hear his appeal in her defamation and sexual-abuse case. The ruling leaves the earlier civil judgment against Trump in place.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNM2lmN1lVOEttaElYZU9NRWF5MFNjX1h2MG5IYk9xQWhkTFNaNWg2QzA0VW1vMEV3N3dqVUJObGp6VlUza2NBVXJrS2F4TVJCZjdPZUM4WTNfaGVYM2NtRkFwUjRvUVNjMzUyMzI2ZXpOLXdSWGtqdWl1OTUwb3d2ZFAxU0xPOC1Yc3hna29xRUpuSHA0cEtVTA?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://www.nbcnews.com/news/us-news/e-jean-carroll-calls-trump-pay-58m-high-court-appeal-fails-rcna352526"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/carroll-trump-damages-appeal.png",
      "alt": "The stone steps and columns of a US federal courthouse in flat daylight.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nathan Confronts King David (2 Samuel 12)",
        "excerpt": "And Nathan said to David, Thou art the man. Thus saith the LORD God of Israel, I anointed thee king over Israel, and I delivered thee out of the hand of Saul.",
        "source": "The Holy Bible, King James Version, 2 Samuel 12:7 (public domain), Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/2_Samuel"
      },
      {
        "category": "historical",
        "title": "The Parable of the Widow and the Unjust Judge (Luke 18)",
        "excerpt": "Yet because this widow troubleth me, I will avenge her, lest by her continual coming she weary me.",
        "source": "The Holy Bible, King James Version, Luke 18:5 (public domain), Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "literary",
        "title": "Portia's \"Quality of Mercy\" Speech, The Merchant of Venice",
        "excerpt": "The quality of mercy is not strain'd, It droppeth as the gentle rain from heaven Upon the place beneath. It is twice blest, It blesseth him that gives and him that takes.",
        "source": "William Shakespeare, The Merchant of Venice, Act IV, Scene I (public domain), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm"
      },
      {
        "category": "literary",
        "title": "Jarndyce and Jarndyce, Bleak House",
        "excerpt": "This scarecrow of a suit has, in course of time, become so complicated that no man alive knows what it means. ... but Jarndyce and Jarndyce still drags its dreary length before the court, perennially hopeless.",
        "source": "Charles Dickens, Bleak House, Chapter I (public domain), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1023/1023-h/1023-h.htm"
      },
      {
        "category": "artistic",
        "title": "Verdi, \"Dies Irae\" from the Requiem — MUSIC",
        "excerpt": "Verdi's Requiem (1874) turns the medieval \"Dies Irae\" into a thunderous vision of the Day of Wrath, when every hidden deed is dragged into the light and no one, however mighty, escapes the final reckoning. Its hammering chorus and blazing brass make audible the terror of accountability that no rank or power can evade. The movement stands as one of music's most overwhelming portraits of justice descending upon the great and the small alike.",
        "source": "Giuseppe Verdi, Messa da Requiem, \"Dies irae\" (1874), full score (public domain), IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Judgment of Solomon — VISUAL ARTWORK",
        "excerpt": "Poussin's 1649 canvas freezes the instant when Solomon's ruling exposes the truth, the false claimant and the true mother divided by the king's terrible test. The rigid symmetry and stark gestures stage justice as an act of unflinching discernment, the powerful throne bending toward the wronged. It is a monument to the idea that authority is legitimate only when it renders the right verdict.",
        "source": "Nicolas Poussin, The Judgment of Solomon (1649), oil on canvas, Musée du Louvre (public domain), Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Le_Jugement_de_Salomon_-_1649_-_Nicolas_Poussin_-_Louvre_-_INV_7277_;_MR_2316.jpg",
        "image": {
          "src": "/covers/carroll-trump-damages-appeal--art.png",
          "alt": "Nicolas Poussin's 1649 painting The Judgment of Solomon, showing the enthroned king ruling between two women claiming a child.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "mexico-city-world-cup-deaths",
    "headline": "Three people die during Mexico City World Cup celebrations",
    "overview": "Three people died during celebrations in Mexico City after the national team's World Cup victory, as huge crowds filled the streets. Authorities reported the deaths amid the crush of fans marking the result.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cx2xjwj8p39o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxONHRuWjl1VEhoVC1qTllkS0RUSERFbEJCbG9ydkQ0NTF4WG5jSXEzU2J2WkdRb0JUZkNER2loa2FRbmpuNEtRSXo5eVd4dXdlamE0VzBrQmI2TGo3TG9Ud3JfRy0zQThKcmxrUUJ1a3VCMENmMTJKZW1CSHBISHgzSXUzVXJkTVgzMzBtd21taHhGQzJkZC1ZYXRJd2xvVllvcElpS2NEaVBUZTYwdXRVWlVpQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/mexico-city-world-cup-deaths.png",
      "alt": "A dense night-time crowd of football fans waving flags under city lights.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Fidenae amphitheatre disaster in Tacitus' Annals",
        "excerpt": "Thither flocked all who loved such sights and who during the reign of Tiberius had been wholly debarred from such amusements; men and women of every age crowding to the place because it was near Rome. And thus the calamity was all the more fatal. The building was densely crowded; then came a violent shock, as it fell inwards or spread outwards, precipitating and burying an immense multitude which was intently gazing on the show or standing round.",
        "source": "Tacitus, The Annals, Book IV, ch. 62, trans. Alfred John Church and William Jackson Brodribb (1876), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_4"
      },
      {
        "category": "historical",
        "title": "The triumph of Aemilius Paulus in Plutarch's Lives",
        "excerpt": "The people erected scaffolds in the forum, in the circuses, as they call their buildings for horse-races, and in all other parts of the city where they could best behold the show. The spectators were clad in white garments; all the temples were open, and full of garlands and perfumes.",
        "source": "Plutarch, Life of Aemilius Paulus, ch. 32 (Dryden translation), via The Internet Classics Archive",
        "href": "https://classics.mit.edu/Plutarch/paulus.html"
      },
      {
        "category": "literary",
        "title": "\"Our dance is turned into mourning\" (Lamentations 5)",
        "excerpt": "The elders have ceased from the gate, the young men from their musick. The joy of our heart is ceased; our dance is turned into mourning.",
        "source": "Lamentations 5:14-15, King James Version, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "literary",
        "title": "The revel struck down in Poe's \"The Masque of the Red Death\"",
        "excerpt": "And now was acknowledged the presence of the Red Death. He had come like a thief in the night. And one by one dropped the revellers in the blood-bedewed halls of their revel, and died each in the despairing posture of his fall. And Darkness and Decay and the Red Death held illimitable dominion over all.",
        "source": "Edgar Allan Poe, \"The Masque of the Red Death\" (1842), Project Gutenberg eBook #1064",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm"
      },
      {
        "category": "artistic",
        "title": "Berlioz, \"Marche au supplice\" from Symphonie fantastique — MUSIC",
        "excerpt": "The fourth movement of Berlioz's Symphonie fantastique (1830), the \"Marche au supplice\" or March to the Scaffold, casts a festive, brass-heavy procession that swells with crowd-like energy only to end in a sudden fall of the blade. Its blend of pageantry and doom mirrors a celebration overtaken by death, the triumphant march collapsing into silence. The public-domain score and parts are freely available on IMSLP.",
        "source": "Hector Berlioz, Symphonie fantastique, H. 48 (1830), IV. Marche au supplice, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphonie_fantastique,_H_48_(Berlioz,_Hector)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, \"The Peasant Dance\" — VISUAL ARTWORK",
        "excerpt": "Bruegel's \"The Peasant Dance\" (c. 1567) throws the viewer into a whirl of villagers dancing, drinking, and embracing at a festival, the whole crowd surging toward the right of the panel. Beneath the boisterous revelry the painter hints at excess and disorder, the celebration teetering on the edge of chaos. The work is in the Kunsthistorisches Museum, Vienna, and is in the public domain.",
        "source": "Pieter Bruegel the Elder, The Peasant Dance, c. 1567, Kunsthistorisches Museum, Vienna; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Peasant_Dance_-_WGA3499.jpg",
        "image": {
          "src": "/covers/mexico-city-world-cup-deaths--art.png",
          "alt": "Pieter Bruegel the Elder's painting The Peasant Dance, showing villagers dancing and reveling at a festival",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "canada-eurovision-2027-debut",
    "headline": "Canada will make its Eurovision Song Contest debut in 2027",
    "overview": "Organizers announced that Canada will compete in the Eurovision Song Contest for the first time in 2027, extending the European music competition further beyond its traditional borders. The move follows Australia's long-running participation as a guest nation.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c8x2y2vwqn1o"
      },
      {
        "name": "ESCToday",
        "href": "https://esctoday.com/206004/canada-cbc-confirms-debut-and-participation-at-eurovision-2027/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/canada-eurovision-2027-debut.png",
      "alt": "A brightly lit concert stage with beams of coloured light and a lone microphone.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Contest of Apollo and Marsyas (Ovid, Metamorphoses, Book VI)",
        "excerpt": "The Satyr Marsyas, when he played the flute in rivalry against Apollo's lyre, lost that audacious contest and, alas! His life was forfeit.",
        "source": "Ovid, Metamorphoses, Book VI (trans. Brookes More), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=6:card=382"
      },
      {
        "category": "historical",
        "title": "The Contest of Pan and Apollo, judged by Tmolus (Ovid, Metamorphoses, Book XI)",
        "excerpt": "his left hand held his lyre, adorned with gems and Indian ivory. His right hand held the plectrum—as an artist he stood there.",
        "source": "Ovid, Metamorphoses, Book XI (trans. Brookes More), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=11:card=146"
      },
      {
        "category": "literary",
        "title": "The Bard: A Pindaric Ode by Thomas Gray",
        "excerpt": "'Ruin seize thee, ruthless king! / 'Confusion on thy banners wait, / 'Though fanned by Conquest's crimson wing / 'They mock the air with idle state.",
        "source": "Thomas Gray, \"The Bard: A Pindaric Ode\" (1757), Eighteenth-Century Poetry Archive",
        "href": "https://www.eighteenthcenturypoetry.org/works/tgaen-wbapo.shtml"
      },
      {
        "category": "literary",
        "title": "Tannhäuser und der Sängerkrieg auf Wartburg by Richard Wagner (Wartburg Song Contest)",
        "excerpt": "Minstrels assembled here, I give you greeting. Full oft within these walls your lays have sounded; In veiled wisdom, or in mirthful measures They ever gladdened every list'ning heart.",
        "source": "Richard Wagner, Tannhäuser, Act II (English translation), Internet Archive",
        "href": "https://archive.org/stream/tannhaeuserconta00wagnuoft/tannhaeuserconta00wagnuoft_djvu.txt"
      },
      {
        "category": "artistic",
        "title": "Die Meistersinger von Nürnberg, WWV 96 (Overture) by Richard Wagner — MUSIC",
        "excerpt": "Wagner's comic opera dramatizes a public song contest among the master-singers of Nuremberg, in which an outsider must prove himself before the assembled guild and townsfolk. Its jubilant Overture (Vorspiel) gathers the work's principal themes into a grand processional celebration of song. Free scores and orchestral parts are hosted on IMSLP.",
        "source": "Richard Wagner, Die Meistersinger von Nürnberg, WWV 96, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Meistersinger_von_N%C3%BCrnberg,_WWV_96_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Apollo and the Muses on Parnassus (after Anton Raphael Mengs) — VISUAL ARTWORK",
        "excerpt": "This engraving after Anton Raphael Mengs depicts Apollo enthroned on Mount Parnassus amid the nine Muses, the mythic gathering of many voices from which poetry and song flow. The image evokes the ideal of a shared festival of the arts, where different talents assemble in one harmonious company. The work is in the public domain.",
        "source": "After Anton Raphael Mengs (engraved by Raffaello Morghen), \"Apollo and the Muses on Parnassus,\" The Metropolitan Museum of Art, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Apollo_and_the_Muses_on_Parnassus_MET_268819.jpg",
        "image": {
          "src": "/covers/canada-eurovision-2027-debut--art.png",
          "alt": "Engraving of Apollo enthroned on Mount Parnassus surrounded by the nine Muses, after Anton Raphael Mengs",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "swiss-traditionalists-defy-pope",
    "headline": "Traditionalist Catholics defy Pope Leo XIV with bishop consecrations in Switzerland",
    "overview": "A traditionalist Catholic group went ahead with the consecration of new bishops in Switzerland in defiance of Pope Leo XIV, deepening a rift with the Vatican. The ceremony proceeded despite warnings that the ordinations were unauthorized.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxQTmphVU5YWWRJWVo0emtCMTNuYkgtU0NrempyVXViNjJNNmRjWHA0OGJmenh2Xzctb0s4X2J1NFpJcnB0Y3ZwcjcwcWpXNFp1dnJyWTF3NkRzSFdPbjZsUFZMOU1Da1U2QUFPYlJTZnJIdGdlbjU5VlRCVHRCQWRQMldVZkQ4YkJpUTNYNjNveVpXMmJfQlFBQw?oc=5"
      },
      {
        "name": "The Pillar",
        "href": "https://www.pillarcatholic.com/p/sspx-illicitly-ordains-four-new-bishops"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/swiss-traditionalists-defy-pope.png",
      "alt": "The cand-lit stone interior of a gothic cathedral with soaring arches.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Martin Luther before the Diet of Worms (1521)",
        "excerpt": "If, then, I am not convinced by proof from Holy Scripture, or by cogent reasons, if I am not satisfied by the very text I have cited, and if my judgment is not in this way brought into subjection to God's word, I neither can nor will retract anything; for it can not be right for a Christian to speak against his conscience. I stand here and can say no more. God help me. Amen.",
        "source": "Martin Luther, \"Before the Diet of Worms\" (1521), in The World's Famous Orations, Vol. VII, ed. William Jennings Bryan (New York: Funk & Wagnalls, 1906), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_World's_Famous_Orations/Volume_7/Before_the_Diet_of_Worms"
      },
      {
        "category": "historical",
        "title": "The East–West Schism of 1054",
        "excerpt": "When the leader of the legation, Cardinal Humbert of Silva Candida, learned that Cerularius had refused to accept the demand, he excommunicated him, and in response Cerularius excommunicated Humbert and the other legates.",
        "source": "\"East–West Schism,\" Wikipedia, The Free Encyclopedia (accessed 1 July 2026).",
        "href": "https://en.wikipedia.org/wiki/East%E2%80%93West_Schism"
      },
      {
        "category": "literary",
        "title": "Milton, Paradise Lost, Book I — Satan's defiance",
        "excerpt": "To reign is worth ambition, though in Hell:\nBetter to reign in Hell than serve in Heaven.",
        "source": "John Milton, Paradise Lost, Book I, lines 262–263 (1667), Project Gutenberg eBook No. 26.",
        "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt"
      },
      {
        "category": "literary",
        "title": "Sophocles, Antigone — defying Creon's decree",
        "excerpt": "Yes, since it was not Zeus that published me that edict, and since not of that kind are the laws which Justice who dwells with the gods below established among men. Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods.",
        "source": "Sophocles, Antigone, lines 450–455, trans. Sir Richard C. Jebb, via the Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "artistic",
        "title": "Mendelssohn, Symphony No. 5 \"Reformation,\" Op. 107 — MUSIC",
        "excerpt": "Felix Mendelssohn composed his Fifth Symphony, the \"Reformation\" (1830), to mark the tercentenary of the Augsburg Confession, the founding statement of Lutheran faith. Its finale is built upon Luther's own defiant chorale \"Ein feste Burg ist unser Gott\" (\"A Mighty Fortress Is Our God\"), the anthem of the Reformation's break with Rome. The symphony thus sounds the same theme of principled rupture with an established religious authority that runs through the Écône consecrations.",
        "source": "Felix Mendelssohn, Symphony No. 5 in D minor/major, Op. 107 (\"Reformation\"), 1830; score via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Symphony_No.5,_Op.107_(Mendelssohn,_Felix)"
      },
      {
        "category": "artistic",
        "title": "Anton von Werner, \"Luther at the Diet of Worms\" (1877) — VISUAL ARTWORK",
        "excerpt": "Anton von Werner's 1877 oil painting depicts Martin Luther standing before Emperor Charles V and the assembled princes of the Holy Roman Empire in 1521, refusing to recant his writings. The lone reformer, upright amid a hostile hierarchy, became the enduring image of conscientious defiance against Rome's authority. It offers a striking visual parallel to a traditionalist body standing firm against the Pope's demand to turn back.",
        "source": "Anton von Werner, Luther auf dem Reichstag zu Worms (\"Luther at the Diet of Worms\"), 1877, oil on canvas, Staatsgalerie Stuttgart; public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Luther_at_the_Diet_of_Worms.jpg",
        "image": {
          "src": "/covers/swiss-traditionalists-defy-pope--art.png",
          "alt": "Anton von Werner's 1877 painting of Martin Luther standing before Emperor Charles V and the princes at the Diet of Worms, refusing to recant.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "ukraine-drones-russian-refinery-fuel",
    "headline": "Ukrainian drone strikes on oil refineries push Russia into a summer fuel crisis",
    "overview": "A sustained campaign of Ukrainian drone strikes on Russian oil refineries has triggered a summer fuel crisis, with shortages and sharply higher pump prices reported across Russia. The attacks have knocked out significant refining capacity, and Moscow has moved to curb fuel exports as the disruption spreads.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxPVWhCd0owd29LOGZjcXNhWmpEaVRIb1lyUE5jamlUVlhLNE5aMWVPLUVvTTdDSlRUNkNIa2RjS2NUY3gyZG5VWHl1bV9IUERWVkR4NlpHYk9xZ3pzY2VOZUdpdWtZNzhYTVEtWjJ1c0xvTlJjZVZ3STlBcmFtUl96RnRoZHA2dFRxVXZSUzZCQmZCbldBT0hEZ1Zn?oc=5"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2649211/world"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/ukraine-drones-russian-refinery-fuel.png",
      "alt": "A Russian oil refinery burning at night after a drone strike, flare stacks and storage tanks aflame against a dark sky.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides on the ravaging of Attica",
        "excerpt": "In the first days of summer the Lacedaemonians and their allies, with two-thirds of their forces as before, invaded Attica, under the command of Archidamus, son of Zeuxidamus, King of Lacedaemon, and sat down and laid waste the country.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2 (second invasion of Attica), trans. Richard Crawley; Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "Samson burns the Philistines' standing corn",
        "excerpt": "And when he had set the brands on fire, he let them go into the standing corn of the Philistines, and burnt up both the shocks, and also the standing corn, with the vineyards and olives.",
        "source": "The Bible (King James Version), Judges 15:5; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges"
      },
      {
        "category": "literary",
        "title": "Tolstoy on the burning of Moscow",
        "excerpt": "Moscow was burned by its inhabitants, it is true, but by those who had abandoned it and not by those who remained in it.\nDeserted Moscow had to burn as inevitably as a heap of shavings has to burn on which sparks continually fall for several days.",
        "source": "Leo Tolstoy, War and Peace, Book 11, Chapter 26, trans. Louise and Aylmer Maude; Wikisource.",
        "href": "https://en.wikisource.org/wiki/War_and_Peace_(Tolstoy)/Book_11/Chapter_26"
      },
      {
        "category": "literary",
        "title": "Virgil on Troy in flames",
        "excerpt": "Transfers the Trojan State to Grecian Hands.\nThe Fire consumes the Town, the Foe commands:",
        "source": "Virgil, Aeneid, Book II, trans. John Dryden (The Works of Virgil, 1697); Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture, Op. 49 — MUSIC",
        "excerpt": "Tchaikovsky's festival overture dramatizes Napoleon's doomed 1812 invasion of Russia as a musical war of attrition, opposing a plaintive Russian hymn against the advancing strains of the Marseillaise. Cannon fire, tolling bells and surging orchestral flames depict an army swallowed by the vast, unforgiving interior it sought to conquer. Its arc from invasion to collapse mirrors a modern campaign that turns an aggressor's own energy and logistics into the source of its undoing.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture (Festival Overture), Op. 49 (1880); IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Turner, The Burning of the Houses of Lords and Commons — VISUAL ARTWORK",
        "excerpt": "Turner renders a great national institution devoured by fire, its stone silhouette dissolving into a furnace of orange and gold reflected across the Thames. Crowds mass helplessly on the far bank as flame and smoke rise into the night, an inferno beyond any hope of control. The vision of vital infrastructure consumed in a single blaze speaks directly to refineries set alight and a nation's fuel going up in smoke.",
        "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (c. 1834-35), oil on canvas, Philadelphia Museum of Art; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ukraine-drones-russian-refinery-fuel--art.png",
          "alt": "J. M. W. Turner's oil painting of the Houses of Parliament engulfed in fire at night, flames and smoke reflected across the Thames.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "sudan-rsf-el-fasher-crimes",
    "headline": "Sudan's RSF committed crimes against humanity in the siege of el-Fasher, Amnesty says",
    "overview": "The paramilitary Rapid Support Forces committed crimes against humanity during their assault on the city of el-Fasher in Sudan's Darfur region, Amnesty International said in a new report documenting mass killings, sexual violence and other abuses as the RSF seized the city. The rights group called for accountability and an arms embargo.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cz9lqvx0z1vo"
      },
      {
        "name": "Amnesty International",
        "href": "https://www.amnesty.org/en/latest/news/2026/07/sudan-rsf-atrocities-in-el-fasher-a-stain-on-the-conscience-of-humanity-new-report/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/sudan-rsf-el-fasher-crimes.png",
      "alt": "A besieged Darfur city at dusk, deserted streets and shuttered houses beneath a smoke-darkened sky.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Josephus on the fall of Jerusalem, AD 70",
        "excerpt": "But when they went in numbers into the lanes of the city with their swords drawn, they slew those whom they overtook without and set fire to the houses whither the Jews were fled, and burnt every soul in them, and laid waste a great many of the rest; and when they were come to the houses to plunder them, they found in them entire families of dead men, and the upper rooms full of dead corpses, that is, of such as died by the famine; they then stood in a horror at this sight, and went out without touching any thing.",
        "source": "Flavius Josephus, The Wars of the Jews, Book VI, Whiston chapter 8, section 5, trans. William Whiston. Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0148:book=6:whiston%20chapter=8:whiston%20section=5"
      },
      {
        "category": "historical",
        "title": "Thucydides on the massacre at Mycalessus",
        "excerpt": "The Thracians, entering into Mycalessus, spoiled both houses and temples, slew the people without mercy on old or young, but killed all they could light on, both women and children, yea, and the labouring cattle, and whatsoever other living thing they saw. For the nation of the Thracians, where they dare, are extreme bloody, equal to any of the barbarians. Insomuch as there was put in practice at this time, besides other disorder, all forms of slaughter that could be imagined; they likewise fell upon the schoolhouse, which was in the city a great one, and the children newly entered into it; and killed them every one. And the calamity of the whole city, as it was as great as ever befell any, so also was it more unexpected and more bitter.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII, chapter 29, trans. Thomas Hobbes (London: Bohn, 1843). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0247:book=7:chapter=29"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid Book II: the sack of Troy",
        "excerpt": "The bars are broken, and the guards are slain.\nIn rush the Greeks, and all the apartments fill;\nThose few defendants whom they find, they kill.",
        "source": "Virgil, Aeneid, Book II (lines 496–498), trans. John Dryden. Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=2:card=486"
      },
      {
        "category": "literary",
        "title": "The Lamentations of Jeremiah over fallen Jerusalem",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary!\nShe weepeth sore in the night, and her tears are on her cheeks: among all her lovers she hath none to comfort her: all her friends have dealt treacherously with her, they are become her enemies.",
        "source": "The Book of Lamentations 1:1–2, King James Version. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "Thomas Tallis, Lamentations of Jeremiah — MUSIC",
        "excerpt": "Tallis sets the Latin lament of the prophet over a desolated Jerusalem in two grave, interweaving polyphonic settings for five unaccompanied voices. The Hebrew letters that open each verse are drawn out into slow, aching melismas, and the falling lines seem to mourn a city emptied of its people. It is one of the supreme Renaissance meditations on the sack and abandonment of a great city.",
        "source": "Thomas Tallis, Lamentations of Jeremiah (two settings, for five voices, c. 1560s). Public domain. IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Lamentations_of_Jeremiah_(Tallis,_Thomas)"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Destruction and Sack of the Temple of Jerusalem — VISUAL ARTWORK",
        "excerpt": "Poussin crowds the canvas with the frenzy of a stormed city: Roman soldiers surge through the collapsing colonnades of the Temple, plundering its golden vessels as terrified inhabitants are struck down amid the smoke. Titus reins his horse at the center while bodies tumble across the marble steps, the sacred architecture itself splitting apart. Painted around 1625–1626, it renders the archetypal fall of a besieged holy city as pure, terrible tumult.",
        "source": "Nicolas Poussin, The Destruction and Sack of the Temple of Jerusalem, oil on canvas, 1625–1626, Israel Museum, Jerusalem. Public domain. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_The_Destruction_and_Sack_of_the_Temple_of_Jerusalem_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/sudan-rsf-el-fasher-crimes--art.png",
          "alt": "Nicolas Poussin's painting The Destruction and Sack of the Temple of Jerusalem, showing Roman soldiers storming and plundering the burning Temple amid falling figures.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "colorado-kiros-defeats-degette",
    "headline": "Democratic socialist Melat Kiros defeats longtime Representative Diana DeGette in Colorado primary",
    "overview": "Democratic socialist Melat Kiros defeated longtime Representative Diana DeGette in a Colorado Democratic primary, unseating one of the US House's most senior members. The upset adds to a wave of insurgent progressive challenges within the party.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOeTRzNlZzZl9PeWZDaDdDaUE0UXBYMUtPMjltVWYyakRETUtlM08wWmMtN05sY2pyUGQtdXdfLXYycGJxYlZ3X0MyTGU2S2xJR0NpenBZMEVWMW15eHUtbmVSYjdXZEp5V3VnbjZLUFdvcDNwdzNWQkVIWmE1ek5ycFlhSEpPY0k3XzI1bmgxaktCbmhoOGc3SEQzc1ZycFkyc25QM1FiWVVheGNpYzhCWnp4MjQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPVElnV0tST3A5X3hGOFVyN2Q5bDAycUR6QWctVGZkeGtZUzZ0QS1fTkJkN3B5QmVKd0hnQ2cyWGNjZUlDMkxsRDk0NUcyVG4wOXR4ejJwNHdoZDZMWnVwZDJfbTZqbFhfLTRFUzRLWWtYdm1OOFNTTTZ4N255Z0dveHFHU3dIaXNjR3o0ZzhpRUZmQTBjRGM3RUlrLV9SUHRpZ3RnWERSUnFqUWNqdUtNWmJtR3BfODhRUHRJMmczZWQ3Zw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/colorado-kiros-defeats-degette.png",
      "alt": "An empty US congressional primary polling place at dusk, a ballot box on a plain table.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "David and Goliath (1 Samuel 17)",
        "excerpt": "45 Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied.\n49 And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth.\n50 So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "The Holy Bible, King James Version, 1 Samuel 17:45, 49-50. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "historical",
        "title": "The Declaration of Independence on the Right to Alter Government",
        "excerpt": "That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to effect their Safety and Happiness.",
        "source": "The Declaration of Independence, July 4, 1776. National Archives, transcription of the engrossed document.",
        "href": "https://www.archives.gov/founding-docs/declaration-transcript"
      },
      {
        "category": "literary",
        "title": "The Fall of Caesar in Shakespeare's Julius Caesar",
        "excerpt": "O, what a fall was there, my countrymen!\nThen I, and you, and all of us fell down,\nWhilst bloody treason flourish'd over us.\nO, now you weep; and I perceive you feel\nThe dint of pity.",
        "source": "William Shakespeare, The Tragedy of Julius Caesar, Act III, Scene II (Antony's oration). Project Gutenberg eBook #1522.",
        "href": "https://www.gutenberg.org/cache/epub/1522/pg1522.txt"
      },
      {
        "category": "literary",
        "title": "The Magnificat: He Hath Put Down the Mighty (Luke 1)",
        "excerpt": "51 He hath shewed strength with his arm; he hath scattered the proud in the imagination of their hearts.\n52 He hath put down the mighty from their seats, and exalted them of low degree.\n53 He hath filled the hungry with good things; and the rich he hath sent empty away.",
        "source": "The Holy Bible, King James Version, Luke 1:51-53 (the Magnificat). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture, Op. 49 — MUSIC",
        "excerpt": "A young nation's defiance made audible: Tchaikovsky pits the ominous, advancing tread of the invader against surging folk melodies until the smaller force turns the tide. Cannon fire and pealing bells crown a triumph that seemed impossible when the overture began, the entrenched giant scattered by an underdog's resolve. It is the sound of an overwhelming favorite toppled and a changing of the guard rung out in brass and thunder.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture (Ouverture solennelle), Op. 49 (1880). IMSLP / Petrucci Music Library, public domain.",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, David with the Head of Goliath — VISUAL ARTWORK",
        "excerpt": "Caravaggio's David stands in a shaft of raking light, sword lowered, holding aloft the severed head of the giant who had terrorized an army. The youth's expression is not triumphal but pensive, as if awed by how completely the mighty have fallen to the small. Darkness swallows the vanquished champion while the unlikely victor emerges into the light, the ultimate image of an entrenched power overthrown.",
        "source": "Michelangelo Merisi da Caravaggio, David with the Head of Goliath, oil on canvas, c. 1610, Galleria Borghese, Rome. Wikimedia Commons, public domain.",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "image": {
          "src": "/covers/colorado-kiros-defeats-degette--art.png",
          "alt": "Caravaggio's painting of David holding aloft the severed head of Goliath, emerging from deep shadow into light.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "student-loan-forgiveness-struck-down",
    "headline": "Federal judges strike down the Trump administration's overhaul of the student loan forgiveness program",
    "overview": "Federal judges in Massachusetts and Washington blocked the Trump administration's overhaul of the Public Service Loan Forgiveness program a day before the new rules were to take effect. The changes would have let officials strip loan forgiveness from public workers whose employers were deemed to have a 'substantial illegal purpose.' The courts found the Education Department had exceeded its authority and raised First Amendment concerns.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxQUmQ5dnhlZEZGSExfY1Z4R2NMNU95OHlRVlBBM2szV1pkdjF0QlQ4M3oyaWk3UWVmaVdJSWNIQ2xXaldxN2szcVdMZHBKYjJNUXdwTUV5YnFJdXJiX0ViaEhfbjdsMU54UFFjWU9ONmZrMndnSUgxSkFhUU4yc1NBMGhONld3WXRwcDJyU190VmVNQ3puNy1uU05HUjF6YTB4LU95dQ?oc=5"
      },
      {
        "name": "Benzinga",
        "href": "https://www.benzinga.com/news/education/26/07/60208203/trump-suffers-fresh-court-setback-as-federal-judges-block-student-loan-forgiveness-overhaul-ahead-of-rollout"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/student-loan-forgiveness-struck-down.png",
      "alt": "A judge's carved wooden bench in a grand courtroom beneath brass scales of justice, cold light from tall windows.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Jubilee year proclaimed in Leviticus",
        "excerpt": "And ye shall hallow the fiftieth year, and proclaim liberty throughout all the land unto all the inhabitants thereof: it shall be a jubile unto you; and ye shall return every man unto his possession, and ye shall return every man unto his family.\nA jubile shall that fiftieth year be unto you: ye shall not sow, neither reap that which groweth of itself in it, nor gather the grapes in it of thy vine undressed.\nFor it is the jubile; it shall be holy unto you: ye shall eat the increase thereof out of the field.\nIn the year of this jubile ye shall return every man unto his possession.",
        "source": "Leviticus 25:10-13, The Holy Bible (King James Version, 1611; 1769 Oxford standard text). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Leviticus/Chapter_25"
      },
      {
        "category": "historical",
        "title": "Solon's seisachtheia, the 'disburdenment' of debts in Athens",
        "excerpt": "But Solon was the first, it would seem, to use this device, when he called his cancelling of debts a 'disburdenment.' For the first of his public measures was an enactment that existing debts should be remitted, and that in future no one should lend money on the person of a borrower.",
        "source": "Plutarch, Life of Solon, chapter 15, translated by Bernadotte Perrin (Loeb Classical Library). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0063:chapter%3D15"
      },
      {
        "category": "literary",
        "title": "The Parable of the Unforgiving Servant, forgiven his debt yet showing no mercy",
        "excerpt": "32 Then his lord called him in, and said to him, 'You wicked servant! I forgave you all that debt because you begged me. 33 Shouldn't you also have had mercy on your fellow servant, even as I had mercy on you?'",
        "source": "Gospel of Matthew 18:32-33, World English Bible (public domain). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(World_English)/Matthew"
      },
      {
        "category": "literary",
        "title": "Portia's plea for mercy against the letter of the bond in The Merchant of Venice",
        "excerpt": "The quality of mercy is not strain'd,\nIt droppeth as the gentle rain from heaven\nUpon the place beneath. It is twice blest,\nIt blesseth him that gives and him that takes.\n'Tis mightiest in the mightiest; it becomes\nThe throned monarch better than his crown.\nHis sceptre shows the force of temporal power,\nThe attribute to awe and majesty,\nWherein doth sit the dread and fear of kings;\nBut mercy is above this sceptred sway,\nIt is enthroned in the hearts of kings,\nIt is an attribute to God himself;\nAnd earthly power doth then show likest God's\nWhen mercy seasons justice.",
        "source": "William Shakespeare, The Merchant of Venice, Act IV, Scene I (Portia). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm"
      },
      {
        "category": "artistic",
        "title": "Va, pensiero (Chorus of the Hebrew Slaves) from Verdi's Nabucco — MUSIC",
        "excerpt": "Giuseppe Verdi's great chorus for the enslaved Hebrews rises as a single hushed, homesick line before swelling into a full-voiced yearning for a lost homeland and release from bondage. Sung in unison over a rocking accompaniment, it turns the ancient captivity by the waters of Babylon into an anthem of longing for liberty. In the opera's arc of a proud ruler humbled and captives set free, the music embodies the hope that decrees of oppression are never the final word.",
        "source": "Giuseppe Verdi, Nabucco (opera in four acts, 1841-1842; libretto by Temistocle Solera), Act III, 'Va, pensiero, sull'ali dorate' (Chorus of the Hebrew Slaves). IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Jan van Hemessen's The Parable of the Unmerciful Servant — VISUAL ARTWORK",
        "excerpt": "Jan Sanders van Hemessen crowds his broad panel with the very moment of reckoning, as the servant who was forgiven a vast debt seizes his own debtor by the throat. Sharp Northern light rakes across muscular, gesturing figures whose ledgers, coins and grasping hands make the accounting of debt almost tactile. The painting turns Christ's parable into a stark drama of mercy received and mercy withheld, where the powerful are called to account for how they treat those beneath them.",
        "source": "Jan Sanders van Hemessen (c. 1500 - c. 1566), The Parable of the Unmerciful Servant, oil on panel, c. 1556, University of Michigan Museum of Art (accession 1959/1.108). Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_van_Hemessen_-_The_Parable_of_the_Unmerciful_Servant.jpg",
        "image": {
          "src": "/covers/student-loan-forgiveness-struck-down--art.png",
          "alt": "16th-century oil painting by Jan van Hemessen depicting the parable of the unmerciful servant seizing his fellow servant by the throat over a small debt.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "xi-chinese-wisdom-developing-nations",
    "headline": "Xi Jinping touts Chinese wisdom and solutions as a model for developing nations",
    "overview": "Chinese leader Xi Jinping promoted what he called Chinese wisdom and solutions as a development model for other nations, casting Beijing's governance as an alternative for the developing world. The remarks came as China seeks to expand its influence across the Global South.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxPZWpuWTRXY1hpVjQwMXdieEVNcGVXbWdMZ3dpcW1FMnAwVmFMNk9QOW5pVTM3N1JubUJTLTJSRENwN3d6UmhFLWZHMW1XVEU0dVE1MDF0T2NCSEplNXZrcEU4UlVrMUhPODNZVGtRZ21mbTQ0aEo1VnMzUkZwNjh3LWRFQUo3UEVzbU05QmF6RXphQk9vZVlQaF84M1hxalMzdTdjcGV1OEJFNEpsZjEydw?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://www.scmp.com/news/china/politics/article/3359003/xi-projects-confidence-chinas-communist-party-home-and-world-stage"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/xi-chinese-wisdom-developing-nations.png",
      "alt": "An official portrait of Chinese leader Xi Jinping in a dark suit and blue tie.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Mencius, King Hui of Liang, Part I, Chapter 1",
        "excerpt": "Mencius went to see king Hui of Liang. The king said, 'Venerable sir, since you have not counted it far to come here, a distance of a thousand li, may I presume that you are provided with counsels to profit my kingdom?'\n\nMencius replied, 'Why must your Majesty use that word \"profit?\" What I am provided with, are counsels to benevolence and righteousness, and these are my only topics.",
        "source": "Mencius (Mengzi), Book I ('Liang Hui Wang'), Part I, Ch. 1, trans. James Legge, The Chinese Classics, Vol. II (1895); Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Chinese_Classics/Volume_2/The_Works_of_Mencius/chapter01"
      },
      {
        "category": "historical",
        "title": "Confucius, Analects, Book II ('Wei Chang'), Chapter 1",
        "excerpt": "The Master said, 'He who exercises government by means of his virtue may be compared to the north polar star, which keeps its place and all the stars turn towards it.'",
        "source": "Confucius, Confucian Analects, Book II, Ch. 1, trans. James Legge, The Chinese Classics, Vol. I: Confucian Analects (1893); Project Gutenberg eBook #4094.",
        "href": "https://www.gutenberg.org/cache/epub/4094/pg4094.txt"
      },
      {
        "category": "literary",
        "title": "Laozi, Tao Te Ching, Chapter 61",
        "excerpt": "What makes a great state is its being (like) a low-lying, down-flowing (stream);--it becomes the centre to which tend (all the small states) under heaven.\n\nThus it is that a great state, by condescending to small states, gains them for itself; and that small states, by abasing themselves to a great state, win it over to them. In the one case the abasement leads to gaining adherents, in the other case to procuring favour.\n\nThe great state only wishes to unite men together and nourish them; a small state only wishes to be received by, and to serve, the other. Each gets what it desires, but the great state must learn to abase itself.",
        "source": "Laozi, The Tao Teh King (Tao Te Ching), Ch. 61, trans. James Legge, Sacred Books of the East, Vol. 39 (1891); Project Gutenberg eBook #216.",
        "href": "https://www.gutenberg.org/cache/epub/216/pg216.txt"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book VI (Anchises' prophecy of Rome's mission)",
        "excerpt": "But, Rome, ’tis thine alone, with awful sway,\nTo rule mankind, and make the world obey,\nDisposing peace and war by thy own majestic way;\nTo tame the proud, the fetter’d slave to free:\nThese are imperial arts, and worthy thee.”",
        "source": "Virgil, The Aeneid, Book VI, trans. John Dryden (1697); Project Gutenberg eBook #228.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "Edward Elgar, Pomp and Circumstance Marches, Op. 39 — MUSIC",
        "excerpt": "Elgar's imperial marches stride forward with brass-crowned pomp, their broad central melody swelling into the anthem later sung as 'Land of Hope and Glory.' The music is the very sound of a confident empire proclaiming its greatness to the world, ceremony elevated into soft power. Grand, processional and unabashedly self-celebrating, it casts national grandeur as a model for others to admire and follow.",
        "source": "Edward Elgar, Pomp and Circumstance Marches, Op. 39 (1901-1930); public-domain scores at IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Pomp_and_Circumstance_Marches,_Op.39_(Elgar,_Edward)"
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, The Consummation of Empire (The Course of Empire) — VISUAL ARTWORK",
        "excerpt": "Thomas Cole's 1836 canvas depicts a civilization at the dazzling zenith of its power: marble colonnades, gilded temples and triumphal processions crowd a sunlit harbor while throngs celebrate imperial splendor. Every column and crowd proclaims a society certain that its way is the summit of human achievement. Painted as one scene in a cautionary cycle, it shows the seductive grandeur of an empire presenting itself as the model for all.",
        "source": "Thomas Cole, The Consummation of Empire, from the series The Course of Empire, 1836, oil on canvas, New-York Historical Society; Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Consummation_The_Course_of_the_Empire_1836.jpg",
        "image": {
          "src": "/covers/xi-chinese-wisdom-developing-nations--art.png",
          "alt": "Thomas Cole's 1836 painting The Consummation of Empire, showing a grand classical city at the height of its imperial power",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "eu-parcel-fee-shein-temu",
    "headline": "EU imposes a 3-euro fee on cheap e-commerce parcels in a blow to Shein, Temu and AliExpress",
    "overview": "The European Union agreed to impose a 3-euro handling fee on low-value e-commerce parcels shipped directly to consumers, targeting the surge of cheap goods from retailers such as Shein, Temu and AliExpress. Officials said the charge would help fund customs and product-safety checks on the billions of small parcels entering the bloc each year.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxPQnBaVHNyUzh0S3pVeFR6OXRkT3U2Ym9jX3IzUk1HMnZGSW1rSXY3aTF6V3FWb1pyWW9aeERLc01xVlU2REVNSUQ1UG1VREk0dmJwQ1VfNjV6aEVLeXdBSzcxcnJtWXZOc2pSeXd0ZWVreExCeGVCdjBuTDV0Qldzdzkyby1OUUhYRkljV0kxM2sxcFZDZWVRektpMWtZcDB6dVNhaEpMUzJPMlN6Q2lEUUpBdDJfTG9CWUhrZ09ORDNRRnhO?oc=5"
      },
      {
        "name": "Euronews",
        "href": "https://www.euronews.com/my-europe/2026/07/01/eu-slaps-3-duty-fee-on-shein-temu-and-aliexpress-imports"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/eu-parcel-fee-shein-temu.png",
      "alt": "Stacks of small cardboard e-commerce parcels on a conveyor at a customs sorting depot.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Adam Smith on restraints upon the importation of foreign goods",
        "excerpt": "BY RESTRAINING, either by high duties, or by absolute prohibitions, the importation of such goods from foreign countries as can be produced at home, the monopoly of the home market is more or less secured to the domestic industry employed in producing them.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (1776), Book IV, Chapter II, “Of Restraints upon the Importation from Foreign Countries of such Goods as can be produced at Home.” Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Wealth_of_Nations/Book_IV/Chapter_2"
      },
      {
        "category": "historical",
        "title": "Richard Cobden against a tax on the people's bread",
        "excerpt": "I will not further detain the House. The question resolves itself into a very narrow compass. If you find that there are exclusive burdens on the land, do not put a tax upon the bread of the people, but remove the burdens.",
        "source": "Richard Cobden, speech in the House of Commons, 24 February 1842, on a motion to abolish the duties payable on the importation of corn (the Corn Laws). Wikisource, “The working classes and the corn laws.”",
        "href": "https://en.wikisource.org/wiki/The_working_classes_and_the_corn_laws"
      },
      {
        "category": "literary",
        "title": "The money changers driven from the temple",
        "excerpt": "And Jesus went into the temple of God, and cast out all them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves,\nAnd said unto them, It is written, My house shall be called the house of prayer; but ye have made it a den of thieves.",
        "source": "The Gospel According to St. Matthew 21:12–13, King James Version (1611). Wikisource, Bible (King James)/Matthew.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "literary",
        "title": "Vanity Fair, where the wares of every nation are vended",
        "excerpt": "And as in other fairs of less moment, there are the several rows and streets, under their proper names, where such and such wares are vended; so here likewise you have the proper places, rows, streets, (viz. countries and kingdoms), where the wares of this fair are soonest to be found. Here is the Britain Row, the French Row, the Italian Row, the Spanish Row, the German Row, where several sorts of vanities are to be sold.",
        "source": "John Bunyan, The Pilgrim's Progress from this World to that which is to Come (1678), the description of Vanity Fair. Project Gutenberg eBook #131.",
        "href": "https://www.gutenberg.org/cache/epub/131/pg131.txt"
      },
      {
        "category": "artistic",
        "title": "Smetana, The Bartered Bride — MUSIC",
        "excerpt": "Smetana's comic opera whirls the listener straight into the bustle of a village marketplace, its famous overture scampering with the chatter of gossip, haggling and the clink of coins. At its heart lies a bargain struck over a bride, a contract of goods and money mistaken for love, until the arithmetic of the marriage-broker unravels. The dances, from the stamping polka to the breathless furiant, are the sound of a fair in full swing, where everything, it seems, has its price.",
        "source": "Bedřich Smetana, Prodaná nevěsta (The Bartered Bride), JB 1:100, comic opera in three acts (1866, revised 1870); libretto by Karel Sabina. IMSLP work page.",
        "href": "https://imslp.org/wiki/Prodan%C3%A1_nev%C4%9Bsta,_JB_1:100_(Smetana,_Bed%C5%99ich)"
      },
      {
        "category": "artistic",
        "title": "Quinten Massys, The Moneylender and his Wife — VISUAL ARTWORK",
        "excerpt": "In Massys' meticulous panel a moneylender bends over his counter, weighing gold coins on a delicate balance while his wife, a devotional book open in her hands, lets her attention drift toward the glinting metal. Every object on the table — the scales, the pearls, the stacked coins, the convex mirror — speaks of value counted, taxed and measured at the point of exchange. It is an unblinking portrait of commerce at the gate, where piety and the reckoning of money sit side by side.",
        "source": "Quinten Massys (Quentin Matsys), The Moneylender and his Wife, 1514, oil on panel, Musée du Louvre, Paris (INV 1444). Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Quinten_Massijs_(I)_-_The_Moneylender_and_his_Wife_-_WGA14281.jpg",
        "image": {
          "src": "/covers/eu-parcel-fee-shein-temu--art.png",
          "alt": "A 1514 painting by Quinten Massys of a moneylender weighing gold coins on a balance while his wife looks on beside her prayer book.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "australia-big-four-accounting-breakup",
    "headline": "Australia weighs breaking up the Big Four accounting firms after a series of scandals",
    "overview": "Australia's government said it was considering breaking up the Big Four accounting firms - Deloitte, EY, KPMG and PwC - and tightening their oversight after a run of scandals over conflicts of interest and audit failures. Treasury proposals include structurally separating the firms' audit and consulting arms and capping partnership sizes. The move follows the PwC tax-leaks affair and fresh allegations against KPMG.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxOMHQ2ai1Ma0hPUXcwMFBpRXR5TFpzc2hlMkJtNVV5Wk5keERpX2QybW1USkhUMzZfc0c3SlBYUVNqNGVNTlJDdmQ2bWpSZXhjbjF2N1RwbWN6VGdScTBlN0FzM2E4TFBTbGRVT0xjMDZpTGI3YmJHSUV1Xzg2dVkyWjgzNE4wbEFvTUJtTHpwT2o5cWV2ZW1TOVR3UUJqRGZVdWNib1BfYVhLWm1VbVdPclVyZWRnUm16aXZxXzhR?oc=5"
      },
      {
        "name": "Nikkei Asia",
        "href": "https://asia.nikkei.com/business/companies/australia-eyes-big-four-accounting-reforms-after-scandals"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/australia-big-four-accounting-breakup.png",
      "alt": "A hushed corporate boardroom at dusk, a long polished table and empty chairs beneath a set of brass scales.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Sherman Antitrust Act of 1890",
        "excerpt": "Every contract, combination in the form of trust or otherwise, or conspiracy, in restraint of trade or commerce among the several States, or with foreign nations, is hereby declared to be illegal.",
        "source": "Sherman Antitrust Act (An act to protect trade and commerce against unlawful restraints and monopolies), United States, approved July 2, 1890, Section 1. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Sherman_Act"
      },
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States (1911)",
        "excerpt": "The remedy to be administered in case of a combination violating the Anti-Trust Act is two-fold: first, to forbid the continuance of the prohibited act, and second, to so dissolve the combination as to neutralize the force of the unlawful power.",
        "source": "Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (decided May 15, 1911), syllabus. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States"
      },
      {
        "category": "literary",
        "title": "Juvenal, Satire VI — \"who will watch the warders?\"",
        "excerpt": "I hear all this time the advice of my old friends—keep your women at home, and put them under lock and key. Yes, but who will watch the warders? Wives are crafty and will begin with them.",
        "source": "Juvenal, Satire VI (\"quis custodiet ipsos custodes\"), translated by G. G. Ramsay, in Juvenal and Persius (Loeb Classical Library, 1918). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Juvenal_and_Persius/The_Satires_of_Juvenal/Satire_6"
      },
      {
        "category": "literary",
        "title": "The Gospel of Matthew — \"No man can serve two masters\"",
        "excerpt": "No man can serve two masters: for either he will hate the one, and love the other; or else he will hold to the one, and despise the other. Ye cannot serve God and mammon.",
        "source": "The Gospel According to St. Matthew 6:24, Authorized (King James) Version, 1611. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "artistic",
        "title": "Verdi, Messa da Requiem, \"Dies irae\" — MUSIC",
        "excerpt": "Verdi unleashes the day of reckoning in a torrent of hammered chords, thundering bass drum, and a chorus screaming in terror as the trumpets of judgment answer one another across the hall. It is music of accounts finally called due, of every hidden deed dragged into the open light. Beneath the terror runs a trembling awe: no power, however great, escapes the weighing of the scales.",
        "source": "Giuseppe Verdi, Messa da Requiem (1874, rev. 1875), No. 2 Sequence (\"Dies irae\"). Full score, IMSLP.",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Marinus van Reymerswaele, \"The Money Changer and His Wife\" — VISUAL ARTWORK",
        "excerpt": "A money changer bends intently over his balance, weighing gold coins with a jeweller's precision while ledgers, receipts, and glinting specie crowd the cramped table. His wife, a devotional book open before her, lets her eyes drift from the sacred page toward the shimmering money—faith and profit tugging in opposite directions. The painting turns the counting-house into a quiet parable of divided loyalty, where the scales of commerce quietly displace the scales of conscience.",
        "source": "Marinus van Reymerswaele (workshop of), The Money Changer and His Wife, c. 1538, oil on panel, Musée des Beaux-Arts de Nantes. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Marinus_van_Reymerswale_007.jpg",
        "image": {
          "src": "/covers/australia-big-four-accounting-breakup--art.png",
          "alt": "A money changer weighing coins on a balance beside his wife, who looks up from her prayer book toward the gold, in a cramped counting-house scene.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "south-korea-google-android-app-store",
    "headline": "South Korea's antitrust regulator accuses Google of abusing its position in the Android app store",
    "overview": "South Korea's Fair Trade Commission accused Google of abusing its dominant position in the Android app store market, alleging the company pressured game developers to release titles exclusively on its Play Store. The regulator signalled possible penalties.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOeVRQQzlfMWh6TktXNVhTZTJCNkFzTVNTRmdkODhXSWlIMGdLQThtQ2hGZ01pZHRvbVFnQlZTc1NVeWF4MzBwaXYwN25VblhpVGlWd29xenk1STJicDhGdFJoWlk1aUxYbVYzaTBOX3JEb1dkd3plUXJhU2hKYWpVTWdycGZ2Y2JISURvZlB1SkJFOWthNmUwS2NKaDQ3Ym9CRmhGRWtyQk5GZDFJckVJZDA1VkM3cTg0N0ZwUEJrRnVlSnFDcUYwMFplb25Ydw?oc=5"
      },
      {
        "name": "The Korea Times",
        "href": "https://www.koreatimes.co.kr/business/companies/20260701/watchdog-launches-review-on-googles-alleged-fair-trade-violation"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/south-korea-google-android-app-store.png",
      "alt": "A single smartphone in soft light showing a grid of blank app tiles against a dark background.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Sherman Antitrust Act, §2 (1890)",
        "excerpt": "Every person who shall monopolize, or attempt to monopolize, or combine or conspire with any other person or persons, to monopolize any part of the trade or commerce among the several States, or with foreign nations, shall be deemed guilty of a misdemeanor, and, on conviction thereof; shall be punished by fine not exceeding five thousand dollars, or by imprisonment not exceeding one year, or by both said punishments, in the discretion of the court.",
        "source": "Sherman Antitrust Act, Section 2 (26 Stat. 209, July 2, 1890), transcribed at Wikisource, “Sherman Act.”",
        "href": "https://en.wikisource.org/wiki/Sherman_Antitrust_Act"
      },
      {
        "category": "historical",
        "title": "Ida M. Tarbell, The History of the Standard Oil Company (1904)",
        "excerpt": "“There was a pressure brought to bear upon my mind, and upon almost\nall citizens of Cleveland engaged in the oil business, to the effect\nthat unless we went into the South Improvement Company we were\nvirtually killed as refiners; that if we did not sell out we should\nbe crushed out. … There was only one buyer in the market, and we had\nto sell on their terms or be crushed out, as it was represented to\nus. … After learning what the arrangements were I felt as if, rather than fight such a monopoly, I would withdraw from the business, even at a sacrifice.”",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company (New York: McClure, Phillips & Co., 1904), testimony of Mr. Alexander, of Alexander, Scofield and Company; Project Gutenberg eBook No. 60692.",
        "href": "https://www.gutenberg.org/cache/epub/60692/pg60692.txt"
      },
      {
        "category": "literary",
        "title": "The Three Billy-Goats Gruff",
        "excerpt": "“Trip, trap; trip, trap!” went the bridge.\n\n“WHO’S THAT tripping over my bridge?” roared the Troll.\n\n“Oh! it is only I, the tiniest billy-goat Gruff; and I’m going up to\nthe hill-side to make myself fat”, said the billy-goat, with such a\nsmall voice.\n\n“Now, I’m coming to gobble you up”, said the Troll.",
        "source": "“The Three Billy-Goats Gruff,” in Popular Tales from the Norse, trans. George Webbe Dasent (Edinburgh: David Douglas, 1888); Project Gutenberg eBook No. 8933.",
        "href": "https://www.gutenberg.org/cache/epub/8933/pg8933.txt"
      },
      {
        "category": "literary",
        "title": "John Bunyan, The Pilgrim’s Progress — Apollyon straddles the way",
        "excerpt": "APOL. Then Apollyon straddled quite over the whole breadth of the\nway, and said, I am void of fear in this matter: prepare thyself\nto die; for I swear by my infernal den, that thou shalt go no\nfurther; here will I spill thy soul.",
        "source": "John Bunyan, The Pilgrim’s Progress from This World to That Which Is to Come (1678); Project Gutenberg eBook No. 131.",
        "href": "https://www.gutenberg.org/cache/epub/131/pg131.txt"
      },
      {
        "category": "artistic",
        "title": "Edvard Grieg, “In the Hall of the Mountain King,” Peer Gynt Suite No. 1, Op. 46 — MUSIC",
        "excerpt": "A single skulking theme creeps up from the depths on plucked low strings, then repeats and repeats, gathering instruments and speed as it goes. What begins as a furtive tiptoe swells into a stamping, overwhelming stampede, as if a single dominant power were slowly closing every exit and crushing all resistance. By the frenzied end the listener is engulfed, trapped in the mountain king’s cavern with no room left to escape.",
        "source": "Edvard Grieg, Peer Gynt Suite No. 1, Op. 46, No. 4, “In the Hall of the Mountain King (I Dovregubbens hall)” (composed 1874–75); work page at IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Peer_Gynt_Suite_No.1,_Op.46_(Grieg,_Edvard)"
      },
      {
        "category": "artistic",
        "title": "Udo Keppler, “Next!” (Standard Oil octopus), Puck, 1904 — VISUAL ARTWORK",
        "excerpt": "A bloated Standard Oil storage tank looms as a monstrous octopus, its tentacles snaking out to throttle the copper, steel, and shipping industries and to coil around a statehouse and the Capitol. One last tentacle reaches hungrily toward the White House, the giant’s grip tightening on every rival and every lever of power. The cartoon renders monopoly as a living creature that strangles competition and swallows the public square whole.",
        "source": "Udo J. Keppler, “Next!” chromolithograph, Puck, vol. 56, no. 1436 (September 7, 1904); Library of Congress; reproduced on Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Standard_oil_octopus_loc_color.jpg",
        "image": {
          "src": "/covers/south-korea-google-android-app-store--art.png",
          "alt": "1904 Puck political cartoon depicting Standard Oil as an octopus whose tentacles grip industry, statehouses, the U.S. Capitol, and reach toward the White House.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "kim-dotcom-extradition-appeal",
    "headline": "Kim Dotcom loses his latest appeal against extradition from New Zealand to the United States",
    "overview": "A New Zealand court rejected Kim Dotcom's latest appeal against his extradition to the United States, where he faces criminal charges tied to the defunct file-sharing site Megaupload. The ruling brings the internet entrepreneur's long-running legal battle closer to an end.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPS3dMYmhRdjNHUUcwMFRwYnJJWVYwUHRFM3JRR3NlVnNxSzlKQmR1WWt6Z1ppLWRjTmRTV0hWZjhYQmtDbnd0SzBZX3hmZDdzWjdoUnpDQlZUZ3pPS0QzVGI5eVZBeU5KMGkzSFRTWkVjb2dDLVVMLUJqSVZjNUtkN2VTd0hPSEZCVXBDUm82NkdLRzVGbWhqaUZlTktvTFFzYVl0enJXUmpQZGtJNnc4UV9HRk1mZFRZamc?oc=5"
      },
      {
        "name": "The New Zealand Herald",
        "href": "https://www.nzherald.co.nz/nz/court-of-appeal-dismisses-kim-dotcom-challenge-to-us-extradition/KF6O7TYEMVGTDLS6KLB7OHZD3A/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/kim-dotcom-extradition-appeal.png",
      "alt": "Internet entrepreneur Kim Dotcom speaking into a microphone at a press conference.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, First Oration Against Catiline",
        "excerpt": "When, O Catiline, do you mean to cease abusing our patience? How long is that madness of yours still to mock us? When is there to be an end of that unbridled audacity of yours, swaggering about as it does now?",
        "source": "Marcus Tullius Cicero, \"The First Oration Against Lucius Catilina\" (In Catilinam I), 63 B.C., trans. C. D. Yonge (1856), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0019%3Atext%3DCatil.%3Aspeech%3D1%3Achapter%3D1"
      },
      {
        "category": "historical",
        "title": "Suetonius, The Life of Nero",
        "excerpt": "He was suddenly struck with horror at an earthquake, and by a flash of lightning which darted full in his face, and heard from the neighbouring camp the shouts of the soldiers, wishing his destruction, and prosperity to Galba.",
        "source": "Gaius Suetonius Tranquillus, \"Nero,\" ch. 48, in The Lives of the Twelve Caesars, trans. Alexander Thomson, Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0132%3Alife%3Dnero%3Achapter%3D48"
      },
      {
        "category": "literary",
        "title": "Victor Hugo, Les Misérables — the pursuit of Jean Valjean",
        "excerpt": "As eleven o'clock struck from Saint-Etienne-du-Mont, he was traversing the Rue de Pontoise, in front of the office of the commissary of police, situated at No. 14. A few moments later, the instinct of which we have spoken above made him turn round. At that moment he saw distinctly, thanks to the commissary's lantern, which betrayed them, three men who were following him closely, pass, one after the other, under that lantern, on the dark side of the street.",
        "source": "Victor Hugo, Les Misérables (1862), Volume 2 (Cosette), Book Fifth (\"For a Black Hunt, a Mute Pack\"), Chapter 1, trans. Isabel F. Hapgood, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Les_Mis%C3%A9rables/Volume_2/Book_Fifth/Chapter_1"
      },
      {
        "category": "literary",
        "title": "A Gest of Robyn Hode — the courteous outlaw",
        "excerpt": "Robyn was a prude outlaw,\n  Whyles he walked on grounde;\nSo curteyse an outlaw as he was one\n  Was never non yfounde.",
        "source": "\"A Gest of Robyn Hode,\" stanza 2, in Ballads of Robin Hood and other Outlaws: Popular Ballads of the Olden Times, Fourth Series, ed. Frank Sidgwick (London: Sidgwick & Jackson, 1912), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/28744/28744-h/28744-h.htm"
      },
      {
        "category": "artistic",
        "title": "Franz Schubert, Erlkönig, D. 328 — MUSIC",
        "excerpt": "",
        "source": "Franz Schubert, Erlkönig, D. 328 (1815), ballad for voice and piano, text by Johann Wolfgang von Goethe; work page at the International Music Score Library Project (IMSLP / Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Erlk%C3%B6nig,_D.328_(Schubert,_Franz)"
      },
      {
        "category": "artistic",
        "title": "John Singer Sargent, Orestes Pursued by the Furies — VISUAL ARTWORK",
        "excerpt": "",
        "source": "John Singer Sargent, Orestes Pursued by the Furies (1921), oil on canvas, 347.9 × 317.5 cm, Museum of Fine Arts, Boston (accession no. 25.645); public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Singer_Sargent,_John_-_Orestes_Pursued_by_the_Furies_-_1921.jpg",
        "image": {
          "src": "/covers/kim-dotcom-extradition-appeal--art.png",
          "alt": "Painting of a nude Orestes recoiling in terror as a swarm of avenging Furies with snakes in their hair press in around him",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "italy-etruscan-tomb-paintings",
    "headline": "Italy puts the frescoes of the ancient Etruscan François Tomb on public display in Rome",
    "overview": "Italy put the celebrated wall paintings of the François Tomb, a 4th-century BC Etruscan burial from Vulci, on public display at Rome's Villa Giulia National Etruscan Museum. The state acquired the frescoes for about 15 million euros from the Torlonia family, ending more than a century in private hands. The panels, depicting scenes from Greek myth and Etruscan history, anchor a new exhibition of recovered antiquity.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxQc1l1dTVoaDJtRkZmbHFRYVJKb1VzOEdZQVN4TXhFSXk5d3ZseVRJaFJoV1FZLTU1OXp0RGVZYl9vbXh5RjFQdVlqY1d0ME9aTWhLX0lwOFVtakg4MzZzbzdBLTRLVC1vSTJ2RVc0dVgwZVkxYUtaWkEwTmhMY2JDam8xMFIwZ3BYenMtQVBZamJidw?oc=5"
      },
      {
        "name": "Artnet News",
        "href": "https://news.artnet.com/art-world/italy-acquired-etruscan-frescoes-on-display-in-rome-2785043"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/italy-etruscan-tomb-paintings.png",
      "alt": "A brightly painted ancient Etruscan tomb fresco of banqueters and dancers.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Frederik Poulsen enters the painted tombs of Etruria",
        "excerpt": "The tombs and tomb-paintings of Etruria constitute a field of archaeology in which the investigator is particularly apt to be reminded of numerous sins of omission and to be haunted by a painfully uneasy conscience.",
        "source": "Frederik Poulsen, \"Etruscan Tomb Paintings: Their Subjects and Significance,\" trans. Ingeborg Andersen (Oxford: Clarendon Press, 1922), opening of Chapter I. Project Gutenberg eBook No. 62431.",
        "href": "https://www.gutenberg.org/cache/epub/62431/pg62431.txt"
      },
      {
        "category": "historical",
        "title": "George Dennis stands before an opened Etruscan tomb at Tarquinii",
        "excerpt": "The next impression is one of surprise. Can this be the resting-place of the dead? — Can these scenes of feasting and merriment, this dancing, this piping, this sporting, appertain to a tomb?",
        "source": "George Dennis, \"The Cities and Cemeteries of Etruria\" (London: John Murray, 1848), Chapter XVIII, \"Corneto — Tarquinii: The Cemetery.\" Transcribed text hosted by the University of Chicago (Bill Thayer's LacusCurtius/Penelope).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Gazetteer/Places/Europe/Italy/_Periods/Roman/Archaic/Etruscan/_Texts/DENETR*/18A.html"
      },
      {
        "category": "literary",
        "title": "Keats addresses an urn that outlives its makers",
        "excerpt": "Thou still unravish'd bride of quietness,\n    Thou foster-child of silence and slow time,\nSylvan historian, who canst thus express\n    A flowery tale more sweetly than our rhyme:\nWhat leaf-fring'd legend haunts about thy shape\n    Of deities or mortals, or of both,\n        In Tempe or the dales of Arcady?\n    What men or gods are these? What maidens loth?\nWhat mad pursuit? What struggle to escape?\n    What pipes and timbrels? What wild ecstasy?",
        "source": "John Keats, \"Ode on a Grecian Urn,\" in \"Lamia, Isabella, The Eve of St. Agnes, and Other Poems\" (London: Taylor and Hessey, 1820), first stanza. Wikisource, from the 1909 Robertson edition.",
        "href": "https://en.wikisource.org/wiki/Keats;_poems_published_in_1820/Ode_on_a_Grecian_Urn"
      },
      {
        "category": "literary",
        "title": "Shelley on the sculptor's hand surviving in the desert",
        "excerpt": "Half sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read,\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" first published (under the pen-name Glirastes) in \"The Examiner,\" 11 January 1818. Wikisource transcription of the 1818 Examiner printing.",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Respighi, Pini di Roma — MUSIC",
        "excerpt": "Respighi conjures the eternal city as living stone, closing his tetralogy with \"I pini della Via Appia,\" where distant footsteps swell out of the dawn mist into an overwhelming brass procession. Like the recovered frescoes, the music summons a vanished people back into presence, marching phantom legions across ground that has outlived them. It is antiquity made audible: buried life exhumed, and the dead given voice through art.",
        "source": "Ottorino Respighi, \"Pini di Roma\" (Pines of Rome), symphonic poem in four movements for orchestra (1924). Score hosted on IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Pini_di_Roma_(Respighi,_Ottorino)"
      },
      {
        "category": "artistic",
        "title": "Musician of the Tomb of the Triclinium — VISUAL ARTWORK",
        "excerpt": "A young musician turns, barbiton in hand, his fingers caught mid-note against a bright field scattered with foliage and birds. Painted around 470 BCE for the walls of a tomb at Tarquinia, he was made to play forever for the dead reclining nearby. Colour and gesture survive where the mourners did not, so that a lost people still feasts and pipes to us across twenty-five centuries.",
        "source": "Etruscan master, \"Detail of a musician with a barbiton, Tomb of the Triclinium, Necropolis of Monterozzi, Tarquinia,\" fresco, c. 470 BCE. Public domain reproduction on Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Etruskischer_Meister_001.jpg",
        "image": {
          "src": "/covers/italy-etruscan-tomb-paintings--art.png",
          "alt": "Etruscan fresco detail of a musician playing a barbiton among trees and birds, from the Tomb of the Triclinium at Tarquinia, c. 470 BCE.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "mexico-beat-ecuador-world-cup",
    "headline": "Mexico beat Ecuador 2-0 to reach the World Cup round of 16, ending a 40-year knockout drought",
    "overview": "Mexico beat Ecuador 2-0 to reach the round of 16 at the World Cup, ending a knockout-stage drought that had stretched about 40 years. The win, played before a home crowd, sends the host nation through to the last 16.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijAFBVV95cUxNTWJNR2NWYjI2NmVIdmVzQi1yMGdtYmFEV2k4ZTBsX1lRaFdHWDNFbllsdll4dHlFMmlfWUlsQXJpYTE2eFZENEhLaHFXQk9pc2NoRHEwQmp4MlljQ0Exa3JTRFl5Y3lEOHVFN0g3TmFUZzNNWnk4X1B3NUFEdXltYnlWUTQwZm1zN3RObg?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOVkRkdzNZdExtUXNZTEVvWHdjT1pRcjdoLUVPUFNCQWptaUhPUkdVSjFKTDRsbUt4QVhaTUR0M29LWDhWQWRXcV9Zc3FqbmtqQkg5UlBUM0FQUzNrS0pINGtYSlJnejRIT185T2trWTVGX0lJRjJUWGJwLU9qS2NidWxTVkpTM25PNEpReFBhM2R4VVBpbUtUa0tMMElTdURWT3V0aV94aFlCMlZOblVYbzJOWk91WTVu?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/mexico-beat-ecuador-world-cup.png",
      "alt": "An empty floodlit football stadium at night, a brilliant green pitch and a single ball on the centre spot.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pindar, Olympian 1 (for Hieron of Syracuse, 476 BC)",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth. But if, my heart, you wish to sing of contests, [5] look no further for any star warmer than the sun, shining by day through the lonely sky, and let us not proclaim any contest greater than Olympia.",
        "source": "Pindar, Olympian 1, trans. Diane Arnson Svarlien (1990); Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0162%3Abook%3DO.%3Apoem%3D1"
      },
      {
        "category": "historical",
        "title": "Pindar, Olympian 2 (for Theron of Acragas, 476 BC)",
        "excerpt": "Songs, rulers of the lyre, what god, what hero, what man shall we celebrate? Indeed, Pisa belongs to Zeus; and Heracles established the Olympic festival, as the finest trophy of battle; and Theron must be proclaimed because of his victorious four-horse chariot.",
        "source": "Pindar, Olympian 2, trans. Diane Arnson Svarlien (1990); Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0162%3Abook%3DO.%3Apoem%3D2"
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey, Book XXIII — the homecoming of Ulysses",
        "excerpt": "“Wake up Penelope, my dear child,” she exclaimed, “and see with your own eyes something that you have been wanting this long time past. Ulysses has at last indeed come home again, and has killed the suitors who were giving so much trouble in his house, eating up his estate and ill treating his son.”",
        "source": "Homer, The Odyssey, Book XXIII, trans. Samuel Butler; Project Gutenberg eBook #1727.",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm"
      },
      {
        "category": "literary",
        "title": "Psalm 126 (King James Version) — the ending of a long captivity",
        "excerpt": "When the LORD turned again the captivity of Zion, we were like them that dream. Then was our mouth filled with laughter, and our tongue with singing: then said they among the heathen, The LORD hath done great things for them. The LORD hath done great things for us; whereof we are glad.",
        "source": "Psalm 126:1–3, Authorized (King James) Version; Wikisource, Bible (King James)/Psalms.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, Triumphal March from Aïda — MUSIC",
        "excerpt": "Verdi's Grand March from Act II of Aïda is the sound of a nation exulting before its own people: blaring long-belled trumpets in bright A-flat, a broad striding melody, and massed chorus swelling as the victorious army parades home. Brass fanfares answer one another across the stage while the orchestra drives forward with festive, unstoppable momentum. It is the archetype of public triumph, a homecoming celebrated in the open before a rejoicing crowd.",
        "source": "Giuseppe Verdi, Aïda (1870–71), Act II Triumphal March (“Gloria all'Egitto”); work page, International Music Score Library Project (IMSLP / Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Aida_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Euphiletos Painter, Panathenaic Prize Amphora with a foot race — VISUAL ARTWORK",
        "excerpt": "Five nude, bearded runners surge across the black-figure surface of this Athenian prize vase, each with a leg thrown forward in a long stride, muscles taut in the sprint of the stadion. Awarded to victors at the Panathenaic Games held in honour of Athena, the amphora itself was the trophy, brimming with sacred olive oil. It fuses the theme of athletic contest and the glory of the winner into a single object of the ancient games.",
        "source": "Attributed to the Euphiletos Painter, Terracotta Panathenaic prize amphora (foot race), Greek, Attic, Archaic, ca. 530 BC; The Metropolitan Museum of Art, New York, accession no. 14.130.12 (Open Access, CC0). Photograph by Eileen Travell, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Terracotta_Panathenaic_prize_amphora_MET_DP245711.jpg",
        "image": {
          "src": "/covers/mexico-beat-ecuador-world-cup--art.png",
          "alt": "Black-figure Panathenaic prize amphora showing five nude runners in a foot race, attributed to the Euphiletos Painter, ca. 530 BC.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "california-food-date-labels",
    "headline": "California becomes the first US state to ban 'sell by' food date labels to cut waste",
    "overview": "California became the first US state to bar consumer-facing 'sell by' food date labels, with a law taking effect that standardizes wording to 'best if used by' for quality and 'use by' for safety. Officials said a confusing patchwork of more than 50 date phrases drives Americans to throw out billions of meals of good food each year. Regulators framed the change as a way to cut household waste and the organic matter piling up in landfills.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQSjZZLWNySl8wd1pneUJka3VFVWwxSTE0X1I5Vk40WGxfX3J2OTVVRXYwSkE1VUNtVF81dDlYTlRFaV9xVkktdXFJdHlhLWUzMXRuTkx6Uk92ZkJHcmdtR1BfOVR0dG5oNU5SY3BkdlpQRkJMVlhxekZUSEhZRjV3UklVTXNxSkU1RmFRdHRsX2paMmtkSmMzaW13?oc=5"
      },
      {
        "name": "KTVU",
        "href": "https://www.ktvu.com/news/starting-july-1-new-california-law-changes-confusing-food-safety-sell-by-labeling-rules"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/california-food-date-labels.png",
      "alt": "Rows of packaged food on brightly lit grocery-store shelves.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Gleaning Law of Leviticus",
        "excerpt": "And when ye reap the harvest of your land, thou shalt not wholly reap the corners of thy field, neither shalt thou gather the gleanings of thy harvest.\nAnd thou shalt not glean thy vineyard, neither shalt thou gather every grape of thy vineyard; thou shalt leave them for the poor and stranger: I am the LORD your God.",
        "source": "Leviticus 19:9-10, King James Version, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Leviticus"
      },
      {
        "category": "historical",
        "title": "Ruth Gleans in the Fields of Boaz",
        "excerpt": "And Ruth the Moabitess said unto Naomi, Let me now go to the field, and glean ears of corn after him in whose sight I shall find grace.",
        "source": "Ruth 2:2, King James Version, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ruth"
      },
      {
        "category": "literary",
        "title": "Gather Up the Fragments That Remain",
        "excerpt": "When they were filled, he said unto his disciples, Gather up the fragments that remain, that nothing be lost.",
        "source": "The Gospel of John 6:12, King James Version, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/John"
      },
      {
        "category": "literary",
        "title": "Hesiod on Thrift and the Wine Cask",
        "excerpt": "Take your fill when the cask is first opened and when it is nearly spent, but midways be sparing: it is poor saving when you come to the lees.",
        "source": "Hesiod, Works and Days, trans. Hugh G. Evelyn-White (1914), Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0132:card=356"
      },
      {
        "category": "artistic",
        "title": "Haydn, Die Jahreszeiten (The Seasons) — Autumn — MUSIC",
        "excerpt": "Haydn's late oratorio ripens from sowing to reaping to feast, and in Der Herbst (Autumn) the chorus swells with the joy of the full harvest and the groaning abundance of laden fields. Horns blaze through the exhilarating hunting chorus while the vineyard's tumult of song celebrates the pressing of the grape. It is music of plenty at its peak, the very moment when gathered fruit is either honored or left to rot.",
        "source": "Joseph Haydn, Die Jahreszeiten (The Seasons), Hob.XXI:3, Part 3 'Der Herbst' (Autumn), composed 1799-1801; work page at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Die_Jahreszeiten,_Hob.XXI:3_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Jean-François Millet, The Gleaners — VISUAL ARTWORK",
        "excerpt": "Three peasant women stoop across a vast shorn field, gathering by hand the stray stalks left behind after the reapers and the towering stacks of the landowner's harvest in the sunlit distance. Millet dignifies the ancient right of the poor to glean what would otherwise be wasted, casting the bent backs of the gatherers in monumental, almost sacred solemnity. Nothing of the harvest is meant to be lost, and the painting makes a quiet moral drama of abundance and its remainders.",
        "source": "Jean-François Millet (1814-1875), The Gleaners (Des glaneuses), 1857, oil on canvas, Musée d'Orsay, Paris; public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg",
        "image": {
          "src": "/covers/california-food-date-labels--art.png",
          "alt": "Three peasant women bending to gather leftover stalks of grain in a wide harvested field, with haystacks and reapers in the sunlit background.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "spain-june-heat-deaths",
    "headline": "Spain links more than 1,000 excess deaths to heat during its second-hottest June on record",
    "overview": "Spain attributed more than 1,000 excess deaths to high temperatures during what its weather service called the country's second-hottest June on record. Health authorities said the elderly were most affected as an early, intense heatwave gripped the Iberian peninsula.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxOOE4zcnY2eUV1cXBPNDV6b01mR1BpcE1pc2RLZG1ReDZ0LXFJdERlMG9zV1dYLW55c2xzeUt3dHB3THdKaGRoSW1DbnpLaWFfU1lFLTBDTC1YUExQOHlLT3d2VWcyNi1ZN1lWcmpsaXpiUXYwcm1wY29PejJMZVhDZDFFTUlFak9IMGtUdUYwVTlsc1loVllQV1N6c2JFQXZIMEJYSU4wVnp2WWRSWFV6bVNnTndRWGVaUUVLVWtBNE9RVFY1Ymc?oc=5"
      },
      {
        "name": "RTÉ News",
        "href": "https://www.rte.ie/news/world/2026/0701/1581217-spain-heatwave/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-01",
    "image": {
      "src": "/covers/spain-june-heat-deaths.png",
      "alt": "A sun-bleached Spanish city square at midday in a heatwave, a dry stone fountain shimmering under a white-hot sky.",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 1 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens",
        "excerpt": "Externally the body was not very hot to the touch, nor pale in its appearance, but reddish, livid, and breaking out into small pustules and ulcers. But internally it burned so that the patient could not bear to have on him clothing or linen even of the very lightest description; or indeed to be otherwise than stark naked. What they would have liked best would have been to throw themselves into cold water; as indeed was done by some of the neglected sick, who plunged into the rain-tanks in their agonies of unquenchable thirst; though it made no difference whether they drank little or much.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (the plague of Athens), translated by Richard Crawley. Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "Fever in the Summer Heat of Mesopotamia",
        "excerpt": "extremely dry and hot. And the Romans were not accustomed to this and especially those who came from Thrace; and since they were living their daily life in a place where the heat was excessive and in stuffy huts in the summer season, they became so ill that the third part of the army were lying half-dead.",
        "source": "Procopius, History of the Wars, Book II, translated by H. B. Dewing (Loeb Classical Library). Project Gutenberg eBook #16764.",
        "href": "https://www.gutenberg.org/files/16764/16764-h/16764-h.htm"
      },
      {
        "category": "literary",
        "title": "The Ravening Dog-Star",
        "excerpt": "And now the ravening dog-star that burns up\nThe thirsty Indians blazed in heaven; his course\nThe fiery sun had half devoured: the blades\nWere parched, and the void streams with droughty jaws\nBaked to their mud-beds by the scorching ray,",
        "source": "Virgil, Georgics, Book IV, translated by James Rhoades. Project Gutenberg eBook #232.",
        "href": "https://www.gutenberg.org/cache/epub/232/pg232.txt"
      },
      {
        "category": "literary",
        "title": "The Bloody Sun at Noon",
        "excerpt": "All in a hot and copper sky,\nThe bloody Sun, at noon,\nRight up above the mast did stand,\nNo bigger than the Moon.\n\nDay after day, day after day,\nWe stuck, nor breath nor motion,\nAs idle as a painted ship\nUpon a painted ocean.\n\nWater, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.",
        "source": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner\" (Sibylline Leaves, 1817), Part the Second. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Sibylline_Leaves_(Coleridge)/The_Rime_of_the_Ancient_Mariner"
      },
      {
        "category": "artistic",
        "title": "Summer, from The Four Seasons — MUSIC",
        "excerpt": "Over a shimmering, oppressive stillness the strings droop and languish, evoking a land and its people worn thin beneath a merciless sun. Vivaldi's accompanying sonnet describes man and flock exhausted and the pine tree scorched, before the music erupts into a furious summer thunderstorm. The Presto finale unleashes torrents of racing notes, the violent release of a heat that has built until the sky itself breaks.",
        "source": "Antonio Vivaldi, Violin Concerto in G minor, RV 315, \"L'estate\" (Summer), No. 2 of Le quattro stagioni (The Four Seasons), Op. 8 (1725). IMSLP work page.",
        "href": "https://imslp.org/wiki/Violin_Concerto_in_G_minor,_RV_315_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "Sower at Sunset — VISUAL ARTWORK",
        "excerpt": "A vast molten sun hangs low and enormous over a burning field, flooding the whole canvas with searing yellow. A lone sower strides across the parched, harvest-gold earth, dwarfed beneath the blazing orb that seems less to warm than to consume. Van Gogh turns the summer sun into a radiant, almost violent force, at once life-giving and scorching the land it rules.",
        "source": "Vincent van Gogh, Sower at Sunset (De zaaier), oil on canvas, Arles, June 1888, Kröller-Müller Museum, Otterlo. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Sower_at_Sunset_-_Vincent_Van_Gogh.jpg",
        "image": {
          "src": "/covers/spain-june-heat-deaths--art.png",
          "alt": "Van Gogh's Sower at Sunset: an enormous glowing sun over a field of parched golden earth, with a solitary sower scattering seed beneath it.",
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
