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
// the Evening Edition of 4 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Afternoon Edition and the Morning Edition of 4 July 2026.
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
    "slug": "iran-khamenei-funeral-tehran",
    "headline": "Iran begins a days-long state funeral in Tehran for Supreme Leader Khamenei, killed in the war",
    "overview": "Iran opened a state funeral in Tehran on July 4, 2026, for Supreme Leader Ayatollah Ali Khamenei, who led the country from 1989 until he was killed, along with four family members, in a U.S.-Israeli airstrike on February 28, 2026 that opened the war against Iran. Enormous crowds gathered at the Imam Khomeini Grand Mosalla, where his casket lies in state, with officials saying they expect millions to attend the roughly six-day rites, delayed nearly four months by what a spokesperson called 'the war conditions.' The ceremonies run through July 9, with the body to travel from Tehran to Qom and on to the Iraqi shrine cities of Najaf and Karbala before burial in his birthplace of Mashhad; his son, Mojtaba Khamenei, has assumed leadership but has not appeared publicly.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP (via Google News)",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOUTNod0xTMjJIckxKX0NjQ1Z3OXJDbEZFcXNka1dQNVFfdjE5WVNnNUFfRWFuaEtnRExzV3huaXBRQ1BCUnozUnV0eG9ReGlvTUdrNDU2SjBKNzVkaE42MVNPcWt1a2U1RTllNTFFUjVuMnBkYU44SUUzSUtDaDUzbE1SNHlxMVQ5aXBHS3BxamR0eHpuWGo1WWxJNWRNaXFBVUd5SHhYaW41dDVreWVJYVhiYVhLQQ?oc=5"
      },
      {
        "name": "NPR",
        "href": "https://www.npr.org/2026/07/04/nx-s1-5882083/iran-funeral-ayatollah-ali-khamenei"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/iran-khamenei-funeral-tehran.png",
      "alt": "A vast crowd of mourners fills a Tehran prayer complex around the flag-draped casket of Ayatollah Ali Khamenei during the first day of his state funeral.",
      "credit": "Associated Press (via NPR)"
    },
    "lead": true,
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Funeral of Julius Caesar, from Suetonius, The Lives of the Twelve Caesars",
        "excerpt": "on a sudden, two men, with swords by their sides, and spears in their hands, set fire to the bier with lighted torches. The throng around immediately heaped upon it dry faggots, the tribunals and benches of the adjoining courts, and whatever else came to hand. Then the musicians and players stripped off the dresses they wore on the present occasion, taken from the wardrobe of his triumph at spectacles, rent them, and threw them into the flames. The legionaries, also, of his veteran bands, cast in their armour, which they had put on in honour of his funeral. Most of the ladies did the same by their ornaments, with the bullae, and mantles of their children. In this public mourning there joined a multitude of foreigners, expressing their sorrow according to the fashion of their respective countries; but especially the Jews, who for several nights together frequented the spot where the body was burnt.",
        "source": "Suetonius, The Lives of the Twelve Caesars (Thomson trans.), via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/6400/pg6400.txt"
      },
      {
        "category": "historical",
        "title": "The Death of Cyrus the Great and His Instructions on Succession, from Xenophon's Cyropaedia, Book VIII",
        "excerpt": "And now I must leave instructions about my kingdom, that there may be no dispute among you after my death. Sons of mine, I love you both alike, but I choose the elder-born, the one whose experience of life is the greater, to be the leader in council and the guide in action.",
        "source": "Xenophon, Cyropaedia (H. G. Dakyns trans.), Book VIII, via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2085/pg2085.txt"
      },
      {
        "category": "literary",
        "title": "Mark Antony's Funeral Oration, from Shakespeare's Julius Caesar (Act III, Scene ii)",
        "excerpt": "Friends, Romans, countrymen, lend me your ears;\nI come to bury Caesar, not to praise him.\nThe evil that men do lives after them,\nThe good is oft interred with their bones;\nSo let it be with Caesar. The noble Brutus\nHath told you Caesar was ambitious.\nIf it were so, it was a grievous fault,\nAnd grievously hath Caesar answer'd it.\nHere, under leave of Brutus and the rest,\nFor Brutus is an honourable man,\nSo are they all, all honourable men,\nCome I to speak in Caesar's funeral.",
        "source": "William Shakespeare, Julius Caesar, via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1522/pg1522.txt"
      },
      {
        "category": "literary",
        "title": "When Lilacs Last in the Dooryard Bloom'd (on the death of Abraham Lincoln), section 6",
        "excerpt": "Coffin that passes through lanes and streets,\nThrough day and night with the great cloud darkening the land,\nWith the pomp of the inloop'd flags with the cities draped in black,\nWith the show of the States themselves as of crape-veil'd women standing,\nWith processions long and winding and the flambeaus of the night,\nWith the countless torches lit, with the silent sea of faces and the unbared heads,\nWith the waiting depot, the arriving coffin, and the sombre faces,\nWith dirges through the night, with the thousand voices rising strong and solemn,\nWith all the mournful voices of the dirges pour'd around the coffin,\nThe dim-lit churches and the shuddering organs—where amid these you journey,\nWith the tolling tolling bells' perpetual clang,\nHere, coffin that slowly passes,\nI give you my sprig of lilac.",
        "source": "Walt Whitman, Leaves of Grass, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1322/1322-h/1322-h.htm"
      },
      {
        "category": "artistic",
        "title": "Marche funèbre, third movement of the Piano Sonata No. 2 in B-flat minor, Op. 35",
        "excerpt": "Chopin's slow, tolling march has become the universal sound of the state funeral, its heavy repeated chords falling like the tread of an endless procession behind the bier. A fragile major-key consolation rises in the middle, only for the relentless dead-march to close back over it and swallow the light. It is music built for a nation walking its slain leader through the streets.",
        "source": "IMSLP: Piano Sonata No.2, Op.35 (Chopin, Frédéric)",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      },
      {
        "category": "artistic",
        "title": "The Death of Marat (La Mort de Marat), Jacques-Louis David, 1793",
        "excerpt": "David turned a murdered revolutionary into a secular martyr, laying Marat back in his bath like a fallen saint, the fatal wound and dropped quill lit against a vast, empty darkness. The propaganda of grief becomes an instrument of power: mourning marshaled to sanctify a cause and to steel those who survive. A slain leader is made holy, and his death made useful to the living.",
        "source": "Royal Museums of Fine Arts of Belgium / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Death_of_Marat_by_David.jpg",
        "image": {
          "src": "/covers/iran-khamenei-funeral-tehran--art.png",
          "alt": "A slain man slumped dead in a bathtub, one arm hanging over the side still holding a letter and a quill, his fatal chest wound visible, set against a stark dark background—an image of political martyrdom.",
          "credit": "Jacques-Louis David (1793), Royal Museums of Fine Arts of Belgium, Brussels; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "ukraine-kostiantynivka-contested",
    "headline": "Zelensky denies Russian capture of key eastern city Kostiantynivka",
    "overview": "Russia's military told President Vladimir Putin on 4 July 2026 that its forces had captured Kostiantynivka, a strategically important city in Ukraine's eastern Donetsk region. President Volodymyr Zelensky and Ukraine's General Staff rejected the claim, insisting the city remains under Ukrainian control, with Zelensky challenging Putin to meet him there. Kyiv acknowledges that some Russian infantry have pushed into the city and that the situation is difficult, but says Kostiantynivka has not fallen and fighting continues.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters — Zelensky denies Russian capture of key eastern city Kostiantynivka",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxPQnNiZ2ZRUk1xcWxoWkcyNjNibHV2R0c2S1E5Ym9TbTNnVHpwWHNWQVRaMXE2T1M0aDRiejN1TC1rTThEX2VlT0hiYnVsWGRWOEFnMGZST2NXOFFiTFF6RTF6cThEb0xnOW9SSlRnZFdRVHZoZHlJd2stZ05BeHdOc0pXWHNFT3pZUFBMd1lzQ0t4TmoxenpXWTV0RmszdmxvNkJ6YXVua0lwQi1VbVpOUEhGNFktVEcwMnprLTRnX0tHeFE?oc=5"
      },
      {
        "name": "Reuters — Russia claims capture of Kostiantynivka",
        "href": "https://news.google.com/rss/articles/CBMi2wFBVV95cUxNQ0RBRmlpN2UtbDdMQUpmZDNuaXozSW1uMm1qWTBoT3lWc25yamFFUklpYW81bFk4ZHY4cVVqdGtIU0o2bGlpeldFcjJ4b1d4aGxxQTlzS1R0T2JxRXplR1M0MGphWnpTdVFzcFJQUGFPVWhmNUFISVNHSURvYnpOMnBUVVhHWlpOekJNUkxKS3N3cEZlYUlJZzhScllvc29yVFV6UmFNa2Q0cGRqQ2dkSUhERHoyS1dxelBGVS1NM0lwOE5iN1VZSWlxaXUwZzdtQmFGenJHaVVKalE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/ukraine-kostiantynivka-contested.png",
      "alt": "Wreckage of Kostiantynivka's central market after a Russian missile strike in Ukraine's Donetsk region, twisted metal and rubble under a grey sky.",
      "credit": "Donetsk Regional Military Civil Administration (dn.gov.ua), CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The fall and razing of Plataea (Peloponnesian War, 427 BC)",
        "excerpt": "...and afterwards razed it to the ground from the very foundations",
        "source": "Thucydides, History of the Peloponnesian War, Book 3 (Crawley translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_3"
      },
      {
        "category": "historical",
        "title": "The surrender at the siege of Alesia (52 BC)",
        "excerpt": "He himself took his seat in the entrenchments in front of the camp: the leaders were brought out to him there. Vercingetorix was surrendered, arms were thrown down.",
        "source": "Julius Caesar, The Gallic War, Book VII, ch. 89 (public-domain translation), LacusCurtius, University of Chicago",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Caesar/Gallic_War/7G*.html"
      },
      {
        "category": "literary",
        "title": "The Red Badge of Courage — the smoke and phantoms of battle",
        "excerpt": "Buried in the smoke of many rifles his anger was directed not so much against the men whom he knew were rushing toward him as against the swirling battle phantoms which were choking him, stuffing their smoke robes down his parched throat.",
        "source": "Stephen Crane, The Red Badge of Courage, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/73/pg73.txt"
      },
      {
        "category": "literary",
        "title": "The Charge of the Light Brigade — a blunder remembered as glory",
        "excerpt": "Their's not to reason why, / Their's but to do and die.",
        "source": "Alfred, Lord Tennyson, 'The Charge of the Light Brigade', Maud, and Other Poems (1855), Wikisource",
        "href": "https://en.wikisource.org/wiki/Maud,_and_other_poems/The_Charge_of_the_Light_Brigade"
      },
      {
        "category": "artistic",
        "title": "Wellington's Victory (Wellingtons Sieg), Op. 91 — Beethoven",
        "excerpt": "Beethoven's noisy 1813 'battle symphony' stages a proclaimed triumph as pure spectacle: opposing fanfares, marching drums, ratchets and actual cannon fire hurled across the orchestra until one side's anthem drowns the other. Written to celebrate a real victory at Vitoria, it is music as war bulletin — bombast standing in for the confusion and carnage of the field. Its swagger is a reminder of how easily a battlefield claim can be dressed as unarguable, resounding fact.",
        "source": "IMSLP: Wellingtons Sieg, Op.91 (Beethoven, Ludwig van)",
        "href": "https://imslp.org/wiki/Wellingtons_Sieg,_Op.91_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "The Apotheosis of War (1871) — Vasily Vereshchagin",
        "excerpt": "Vereshchagin painted a pyramid of human skulls on a scorched plain before the broken walls of a dead city, crows wheeling above and settling in the eye sockets. He inscribed it 'to all great conquerors, past, present and to come' — a flat rebuke to every dispatch that turns a ruined town into a boast of glory. It is the reality behind the victory claim: not a captured prize, but ash, bone and silence.",
        "source": "Wikimedia Commons (painting held in the Tretyakov Gallery, Moscow)",
        "href": "https://commons.wikimedia.org/wiki/File:1871_Vereshchagin_Apotheose_des_Krieges_anagoria.JPG",
        "image": {
          "src": "/covers/ukraine-kostiantynivka-contested--art.png",
          "alt": "A pyramid of human skulls on a barren, scorched plain before the ruined walls of a town, with black crows circling and perched among the bones under a pale sky.",
          "credit": "Vasily Vereshchagin, The Apotheosis of War (1871), Tretyakov Gallery; photograph by Wikimedia user Anagoria, public domain"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "peru-fujimori-wins-presidency",
    "headline": "Keiko Fujimori declared winner of Peru's presidential runoff by a razor-thin margin",
    "overview": "Peru's National Jury of Elections declared conservative Keiko Fujimori the winner of the June 7 presidential runoff on 3 July 2026, nearly four weeks after the vote, with roughly 50.14% (about 9,223,000 votes) to leftist congressman Roberto Sanchez's 49.87% (about 9,173,000), a margin of only some 50,000 ballots. The daughter of jailed former president Alberto Fujimori, she prevailed on her fourth presidential attempt after losing the 2011, 2016 and 2021 races, and is due to be sworn in on 28 July for a five-year term. Sanchez alleged irregularities in the count but offered no evidence, underscoring the depth of the country's political divide.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cr5jpvv06e1o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxPWTFiY3VtRVlUMFdLZVNuZnZxRVBMOWxoU2NyQ2dmZ3Itd3dEX18xMlFYV3RSdGtVa1l4NFNueHVwbkJjeG43YW40Sjl0NFJ4cjZaMWZ6SnRoVWpFWkItaGdJWlB4WkpCSmtlM2tYNXU2bHhjdm5Ua3BVQjZwVEF2UTJSZ3B5dmQ5ZEFsSUhubGJmUHlSQVNicDdBZHN1RGZNcGhFRnRsRQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/peru-fujimori-wins-presidency.png",
      "alt": "Keiko Fujimori speaking at a podium, gesturing as she addresses supporters and the press.",
      "credit": "Dikilucario, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Disputed United States Presidential Election of 1876",
        "excerpt": "Upon one point there is entire unanimity in public sentiment—that conflicting claims to the Presidency must be amicably and peaceably adjusted, and that when so adjusted the general acquiescence of the nation ought surely to follow.",
        "source": "Rutherford B. Hayes, Inaugural Address (1877), Wikisource",
        "href": "https://en.wikisource.org/wiki/Rutherford_B._Hayes's_Inaugural_Address"
      },
      {
        "category": "historical",
        "title": "Louis Bonaparte and the Return of a Dynasty (1851)",
        "excerpt": "He forgot to add: 'Once as tragedy, and again as farce.'",
        "source": "Karl Marx, The Eighteenth Brumaire of Louis Bonaparte, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1346/1346-h/1346-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare, King Richard III (Act 1, Scene 1)",
        "excerpt": "Now is the Winter of our Discontent, Made glorious Summer by this Son of Yorke: And all the clouds that lowr'd vpon our house In the deepe bosome of the Ocean buried. Now are our browes bound with Victorious Wreathes, Our bruised armes hung vp for Monuments;",
        "source": "William Shakespeare, King Richard III, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1103/pg1103.html"
      },
      {
        "category": "literary",
        "title": "Milton, Paradise Lost (Book I)",
        "excerpt": "Here at least We shall be free; th' Almighty hath not built Here for his envy, will not drive us hence: Here we may reign secure, and in my choyce To reign is worth ambition though in Hell: Better to reign in Hell, then serve in Heav'n.",
        "source": "John Milton, Paradise Lost, Book I, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/20/pg20.txt"
      },
      {
        "category": "artistic",
        "title": "Mussorgsky, Boris Godunov",
        "excerpt": "Mussorgsky's opera opens on a Russia that hails a new sovereign even as guilt and rumor gnaw at his legitimacy: Boris ascends the throne amid pealing coronation bells and a crowd goaded into acclaiming him, only for the triumph to curdle into paranoia and revolt. It is a portrait of power grasped under a cloud of doubt, where a divided nation's cheers can never quite silence the whispers of a contested succession.",
        "source": "IMSLP: Boris Godunov (Mussorgsky, Modest)",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Coronation of Napoleon (1805–1807)",
        "excerpt": "David's vast canvas freezes the instant a self-made ruler crowns his own dynasty: Napoleon, having taken the diadem from the Pope's hands, lifts the crown above the kneeling Josephine while church and court look on in gilded splendor. The painting monumentalizes raw ambition dressed as sacred legitimacy—a divisive figure staging his hard-won ascent as inevitability.",
        "source": "Musee du Louvre / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David,_The_Coronation_of_Napoleon_edit.jpg",
        "image": {
          "src": "/covers/peru-fujimori-wins-presidency--art.png",
          "alt": "Jacques-Louis David's monumental painting of Napoleon in coronation robes raising a golden crown above the kneeling Josephine inside Notre-Dame, as clergy and court look on.",
          "credit": "Jacques-Louis David, The Coronation of Napoleon (1805–1807), Musee du Louvre; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "albania-flamingo-revolution-protests",
    "headline": "Tens of thousands rally in Tirana as 'Flamingo Revolution' demands PM Rama's resignation",
    "overview": "Tens of thousands of demonstrators massed in Tirana on 4 July 2026 in the anti-government movement known as the 'Flamingo Revolution', renewing demands for the resignation of Prime Minister Edi Rama after more than a month of daily protests. The unrest began on 23 May over a Kushner-backed luxury resort project on the protected Narta Lagoon wetland and swelled into a broad anti-corruption movement, drawing an estimated 250,000 people at its 20 June peak in the capital. Clashes outside parliament on 2 July left roughly 19 people needing treatment, most of them police, and more than 20 protesters detained.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c8925jnl0z3o"
      },
      {
        "name": "Independent Balkan News Agency (IBNA)",
        "href": "https://www.ibnaeu.com/en/2026/07/04/albania-protests-edi-rama-international-credibility/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/albania-flamingo-revolution-protests.png",
      "alt": "Vast crowd of protesters filling Dëshmorët e Kombit Boulevard in central Tirana during a Flamingo Revolution demonstration on 13 June 2026.",
      "credit": "Albinfo, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "United States Declaration of Independence (1776)",
        "excerpt": "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
        "source": "The U.S. National Archives",
        "href": "https://www.archives.gov/founding-docs/declaration-transcript"
      },
      {
        "category": "historical",
        "title": "Declaration of the Rights of Man and of the Citizen (1789)",
        "excerpt": "The aim of all political association is the preservation of the natural and imprescriptible rights of man. These rights are liberty, property, security, and resistance to oppression.",
        "source": "The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/18th_century/rightsof.asp"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, 'The Mask of Anarchy' (1819)",
        "excerpt": "Rise like Lions after slumber / In unvanquishable number— / Shake your chains to earth like dew / Which in sleep had fallen on you— / Ye are many—they are few.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Masque_of_Anarchy"
      },
      {
        "category": "literary",
        "title": "James Russell Lowell, 'The Present Crisis' (1845)",
        "excerpt": "Once to every man and nation comes the moment to decide, / In the strife of Truth with Falsehood, for the good or evil side",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Present_Crisis"
      },
      {
        "category": "artistic",
        "title": "Frédéric Chopin, Étude in C minor, Op. 10 No. 12 'Revolutionary' (1831)",
        "excerpt": "Legend holds that Chopin dashed off this C-minor study on learning that Warsaw had fallen to the Tsar's armies during the 1831 November Uprising. Over a left hand that churns like an onrushing tide of bodies, the right hammers out a defiant, grief-stricken cry — the sound of a people refusing to kneel to an empire. It has been the anthem of doomed but unbowed revolt ever since.",
        "source": "IMSLP: Études, Op.10 (Chopin, Frédéric)",
        "href": "https://imslp.org/wiki/%C3%89tudes,_Op.10_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      },
      {
        "category": "artistic",
        "title": "Eugène Delacroix, 'Liberty Leading the People' (1830)",
        "excerpt": "Delacroix's canvas shows the people of Paris surging over the barricades of the July Revolution of 1830, a bare-armed figure of Liberty raising the tricolour above a crowd of workers, students and street boys. Powder smoke and the bodies of the fallen fill the foreground as the living press forward toward the viewer. It endures as the defining image of a crowd in the public square toppling an entrenched king.",
        "source": "Musée du Louvre",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010065872",
        "image": {
          "src": "/covers/albania-flamingo-revolution-protests--art.png",
          "alt": "Allegorical figure of Liberty in a Phrygian cap raises the French tricolour and leads an armed crowd over a barricade strewn with the dead.",
          "credit": "Eugène Delacroix, Musée du Louvre, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "pope-leo-lampedusa-migrants",
    "headline": "Pope Leo marks July 4 with Lampedusa appeal urging US and Europe to welcome migrants",
    "overview": "On July 4, 2026, Pope Leo XIV, the first US-born pontiff, visited the Italian island of Lampedusa, a frontline gateway for Mediterranean migrant crossings, praying at the graves of migrants who died at sea and blessing a dock dedicated to Pope Francis. In a message to Americans on the 250th anniversary of US independence and in his homily, he urged that defending human life also means \"welcoming, protecting and assisting immigrants,\" and called on Europe to build a long-term plan to receive, protect, support and integrate migrants. He described their loss at sea as the fruit of choices made and unmade, and appealed for compassion toward those seeking freedom and prosperity.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPbmUxemdCWjNHSUZXb2tQNFRVeEFWRml5c3BMaDdCMkVNYUsxOFh1dHNnLUh4cU4xM01jdlJobWJLdzFLZkxadXJjRS1XTEpPeEU4NEpQX1Z2Ymp2RG9fV0JWNkVWRXF0Rm1pYUVBOXNST005X09Bb1lkVzkyMkc3RThwYWd4bUxwVnNYRVVHSU1LVWVtdmJ1YmZJMkZlQ2FiOTRYY1N3Qm1rT0VH?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c5yz83n7q5no"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/pope-leo-lampedusa-migrants.png",
      "alt": "Pope Leo XIV in white papal vestments, photographed at the Vatican in October 2025.",
      "credit": "Ricardo Stuckert / Palácio do Planalto, via Wikimedia Commons (CC BY-SA 4.0)"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Homily of Pope Francis at Lampedusa (8 July 2013)",
        "excerpt": "For his first journey outside Rome in 2013, Pope Francis chose this same tiny island, casting a wreath into the sea for the drowned and denouncing what he called the \"globalization of indifference\" that has robbed the world of the ability to weep for the stranger. Leo XIV's return to Lampedusa on Independence Day consciously echoes that gesture, extending a decade-old summons to conscience from one shepherd to the next.",
        "source": "The Holy See, Vatican.va",
        "href": "https://www.vatican.va/content/francesco/en/homilies/2013/documents/papa-francesco_20130708_omelia-lampedusa.html"
      },
      {
        "category": "historical",
        "title": "Emma Lazarus, \"The New Colossus\" (1883), inscribed on the Statue of Liberty",
        "excerpt": "\"Give me your tired, your poor, / Your huddled masses yearning to breathe free, / The wretched refuse of your teeming shore. / Send these, the homeless, tempest-tost to me, / I lift my lamp beside the golden door!\"",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_New_Colossus"
      },
      {
        "category": "literary",
        "title": "The Parable of the Good Samaritan, Gospel of Luke 10 (King James Version)",
        "excerpt": "\"But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him, And went to him, and bound up his wounds, pouring in oil and wine, and set him on his own beast, and brought him to an inn, and took care of him.\"",
        "source": "Wikisource, Bible (King James)/Luke",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke#Chapter_10"
      },
      {
        "category": "literary",
        "title": "The Book of Exodus, the crossing of the sea, Exodus 14 (King James Version)",
        "excerpt": "\"And the children of Israel went into the midst of the sea upon the dry ground: and the waters were a wall unto them on their right hand, and on their left.\"",
        "source": "Wikisource, Bible (King James)/Exodus",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, \"Va, pensiero\" (Chorus of the Hebrew Slaves) from Nabucco",
        "excerpt": "Verdi's 1841 opera gives voice to the Hebrews exiled by the waters of Babylon, and its great third-act chorus, \"Va, pensiero, sull'ali dorate,\" sends thought flying on golden wings back to a lost homeland. The lament of a people driven from their own shores became an anthem of longing and displacement, its yearning melody a mirror to those who cross the sea dreaming of the land they have left behind.",
        "source": "IMSLP: Nabucco (Verdi, Giuseppe)",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Théodore Géricault, The Raft of the Medusa (1818–1819)",
        "excerpt": "Géricault's monumental canvas depicts the survivors of the wrecked French frigate Méduse adrift on a makeshift raft, bodies heaped in despair as a handful of figures strain toward a distant sail on the horizon. Built from interviews with real survivors and studies of the dying, the painting turns a maritime catastrophe into a towering emblem of hope and abandonment at sea, uncannily resonant with the perilous Mediterranean crossings mourned at Lampedusa.",
        "source": "Wikimedia Commons / Musée du Louvre",
        "href": "https://commons.wikimedia.org/wiki/File:JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_(Museo_del_Louvre,_1818-19).jpg",
        "image": {
          "src": "/covers/pope-leo-lampedusa-migrants--art.png",
          "alt": "Shipwreck survivors crowded on a makeshift raft at sea, some collapsed and dead, others straining upward to signal a distant ship on the horizon.",
          "credit": "Théodore Géricault, The Raft of the Medusa (1818–19), Musée du Louvre; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "continental-contitech-sale",
    "headline": "Continental to sell ContiTech unit to Lone Star Funds for $4.6 billion",
    "overview": "German automotive and industrial group Continental AG on 4 July 2026 agreed to sell its ContiTech industrial rubber and plastics division to US private-equity firm Lone Star Funds, in a deal valuing the unit at 4.0 billion euros (about $4.6 billion) plus up to 250 million euros in performance-based payments. Continental expects roughly 3.1 billion euros in cash proceeds on closing, which is targeted for the end of 2026, and plans to return about 2.5 billion euros to shareholders. The divestment completes Continental's breakup and strategic realignment around its core Tires business.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNdktvMlBtS2JhMDUxczNHYkQxdmV6a0NjRDNNM0o0UGtSRl8xLVdkckdkQVd0Rm1hU3dFSFhyeWRvSWt0Y2l5ZDVGZUJPalhETGxOaE1yWGU2bmJ4d3p1bzFXQ2cyUDlzWjM2dEZ1WGJwSENmcTd1UnBoRXB1R3BQbUxxay1rWUZHdnloaEUtZVdUZmdKUEtBbUl5ekQxdURWeW4yclRwT1Fwd0JLRWpkdkVsSm8?oc=5"
      },
      {
        "name": "Continental AG ad-hoc press release (EQS), 4 July 2026",
        "href": "https://www.finanzwire.com/press-release/continental-ag-etr-con-eqs-adhoc-continental-ag-continental-ag-sells-contitech-group-sector-n3BDZvEdFLn"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/continental-contitech-sale.png",
      "alt": "Interior of a ContiTech conveyor-belt manufacturing plant, part of Continental's industrial rubber division.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Dissolution of Standard Oil (1911)",
        "excerpt": "The remedy to be administered in case of a combination violating the Anti-Trust Act is two-fold: first, to forbid the continuance of the prohibited act, and second, to so dissolve the combination as to neutralize the force of the unlawful power.",
        "source": "U.S. Supreme Court, Standard Oil Co. of New Jersey v. United States (1911), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States"
      },
      {
        "category": "historical",
        "title": "The Praetorian Guard Auctions the Roman Empire (193 AD)",
        "excerpt": "just as if it had been in some market or auction-room, both the City and its entire empire were auctioned off.",
        "source": "Cassius Dio, Roman History, Book LXXIV (LacusCurtius / University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/74*.html"
      },
      {
        "category": "literary",
        "title": "The Cherry Orchard (1904)",
        "excerpt": "The cherry orchard is mine now, mine! [Roars with laughter] My God, my God, the cherry orchard's mine!",
        "source": "Anton Chekhov, The Cherry Orchard, trans. Julius West (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/7986/7986-h/7986-h.htm"
      },
      {
        "category": "literary",
        "title": "The Fall of the House of Usher (1839)",
        "excerpt": "the deep and dank tarn at my feet closed sullenly and silently over the fragments of the \"House of Usher\".",
        "source": "Edgar Allan Poe, The Fall of the House of Usher (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/932"
      },
      {
        "category": "artistic",
        "title": "Edward Elgar, Cello Concerto in E minor, Op. 85 (1919)",
        "excerpt": "Written in the ashes of the First World War, Elgar's concerto is a long autumnal farewell to a vanished order, its opening cello lament falling like a house settling into dusk. The music mourns a grand and confident world quietly coming apart, its splendour receding beyond recall. It is the elegy of an old estate broken up and sold on, dignity and loss sounding in the same breath.",
        "source": "IMSLP: Cello Concerto, Op.85 (Elgar, Edward)",
        "href": "https://imslp.org/wiki/Cello_Concerto,_Op.85_(Elgar,_Edward)"
      },
      {
        "category": "artistic",
        "title": "The Course of Empire: Destruction (1836)",
        "excerpt": "Thomas Cole's canvas shows the proud imperial city at the moment of its undoing: bridges collapse, colonnades topple into the harbor, and smoke boils over marble palaces once thought eternal. The fourth panel of his five-part cycle, it charts how a great and confident civilization is torn apart at the height of its wealth. It is a vision of an old and mighty house consumed, its splendor broken up and carried off amid fire and ruin.",
        "source": "Thomas Cole, The Course of Empire: Destruction, New-York Historical Society (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg",
        "image": {
          "src": "/covers/continental-contitech-sale--art.png",
          "alt": "Painting of a great classical city being sacked and burned, its bridges and columns collapsing into the harbor amid smoke and chaos.",
          "credit": "Thomas Cole, New-York Historical Society, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "trump-accounts-newborn-debut",
    "headline": "Trump Accounts debut on July 4, seeding $1,000 for every eligible US newborn",
    "overview": "The federal government's \"Trump Accounts\" officially debuted on July 4, 2026, as the United States opened its 250th Independence Day celebrations, seeding a tax-advantaged investment account with a one-time $1,000 U.S. Treasury contribution for every eligible newborn. To receive the seed money a child must be a U.S. citizen with a Social Security number and born between January 1, 2025, and December 31, 2028; the funds are invested in low-cost U.S. equity index funds and generally cannot be withdrawn until age 18. Parents and others may contribute up to $5,000 per year to each account.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPdl81dTVpMVFTMlB1alhyU1pPazFyLTVGWjlHWG50d1ZuZWZjRGptdnl0V3hmSjQ4dWxlWFFQVE9La0xwODJNZDgtd1J5RWh1dEtReUFncTNTdUthcTFLWjY4Y3RTS2xOeHFRUU9wWUphbWFsZlB1VFk0dmZWdkpzeTFkejBsWm1FTjVYc1VLazZhaWhuR0xRLTlZTDRkMXRRUlB6dVNHREV0Mk1Ia3VyUE41VDQ2MnMxX0NEMUQ1VQ?oc=5"
      },
      {
        "name": "Associated Press (via ABC News)",
        "href": "https://abcnews.com/Business/wireStory/trump-accounts-launch-july-4-giving-newborns-1000-134405062"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/trump-accounts-newborn-debut.png",
      "alt": "The neoclassical United States Treasury Building in Washington, D.C., seat of the department seeding the new newborn accounts.",
      "credit": "Photograph by Loren (Wikimedia user Changlc), released into the public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thomas Paine, Agrarian Justice (1797)",
        "excerpt": "To create a national fund, out of which there shall be paid to every person, when arrived at the age of twenty-one years, the sum of fifteen pounds sterling, as a compensation in part, for the loss of his or her natural inheritance, by the introduction of the system of landed property",
        "source": "Thomas Paine, Agrarian Justice (1797)",
        "href": "https://www.ushistory.org/paine/agrarian/agrarian1.htm"
      },
      {
        "category": "historical",
        "title": "The Homestead Act (1862)",
        "excerpt": "Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled, That any person who is the head of a family, or who has arrived at the age of twenty-one years, and is a citizen of the United States … shall … be entitled to enter one quarter section or a less quantity of unappropriated public lands",
        "source": "Homestead Act (1862), U.S. National Archives",
        "href": "https://www.archives.gov/milestone-documents/homestead-act"
      },
      {
        "category": "literary",
        "title": "Charles Dickens, Great Expectations (1861)",
        "excerpt": "Further, that it is the desire of the present possessor of that property, that he be immediately removed from his present sphere of life and from this place, and be brought up as a gentleman—in a word, as a young fellow of great expectations.",
        "source": "Charles Dickens, Great Expectations (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1400/1400-h/1400-h.htm"
      },
      {
        "category": "literary",
        "title": "The Parable of the Talents, Gospel of Matthew 25:14–15 (KJV)",
        "excerpt": "For the kingdom of heaven is as a man travelling into a far country, who called his own servants, and delivered unto them his goods. And unto one he gave five talents, to another two, and to another one; to every man according to his several ability; and straightway took his journey.",
        "source": "The Gospel of Matthew 25:14–15, King James Version (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "artistic",
        "title": "Franz Lehár, Gold und Silber (Gold and Silver Waltz), Op. 79 (1902)",
        "excerpt": "Lehár's shimmering Viennese waltz, composed for a lavish \"Gold and Silver\" ball, spins the glitter of precious metal into music, its lilting three-quarter time evoking coins cascading and fortunes turning. The very title makes wealth audible, a swirl of aspiration and glamour fit for a scheme that promises each child a small treasure. Its opening flourish suggests a nest egg catching the light before the dance of compounding years begins.",
        "source": "IMSLP: Gold und Silber, Op.79 (Lehár, Franz)",
        "href": "https://imslp.org/wiki/Gold_und_Silber,_Op.79_(Leh%C3%A1r,_Franz)"
      },
      {
        "category": "artistic",
        "title": "Quentin Massys, The Moneylender and His Wife (1514)",
        "excerpt": "In Massys' luminous Flemish panel a banker weighs gold coins on a delicate balance while his wife, distracted from her prayer book, watches the glinting money with quiet fascination. The painting meditates on wealth counted and weighed, on the pull that money exerts on a household and the careful stewardship it demands. It is an apt emblem for a scheme that places a small fortune on the scales of a newborn's future.",
        "source": "The Moneylender and His Wife, Louvre (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/trump-accounts-newborn-debut--art.png",
          "alt": "A Renaissance moneylender weighing gold coins on a balance while his wife looks on, turning from her illuminated prayer book.",
          "credit": "Quentin Massys, The Moneylender and His Wife, 1514, oil on panel, Louvre, Paris; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "ukraine-railway-locomotives-damage",
    "headline": "Ukraine says Russia damaged more than 200 railway locomotives in 2026",
    "overview": "Ukraine's state railway operator Ukrzaliznytsia says Russian strikes have destroyed or damaged more than 200 locomotives since the start of 2026, part of over 1,000 attacks on the rail network this year. Deputy Prime Minister Oleksii Kuleba said two more locomotives were hit in a strike on the Dnipropetrovsk region on the evening of 3 July, with repair costs mounting steadily. The railway, which carries more than 90% of Ukraine's export shipments, underpins the country's wartime economy and civilian transport.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPeFQwdlh0cWRleHdwbVpJQ2E3cnNvUzE0TGE3RHZiVlZ3SlhDemlsLWlfOG81a1dWX0Iwc0Z4NEk1cmxxc3pCMFh3TDA3X3pVWTcyN0ZQMGRXazFiNlZiblRtblllT2hHUkhxa0VCNTlYWnh2aDZSQUQtY1NjWlRkVFlWbVROZjBjNzRzaGtMMTBwa0g2VDFneU5sc2h6MVlrZkJGcHhmUFdXaGtP?oc=5"
      },
      {
        "name": "Ukrainian National News (UNN)",
        "href": "https://unn.ua/en/news/the-russian-federation-attacked-railway-infrastructure-in-the-dnipropetrovsk-region-damaging-two-locomotives"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/ukraine-railway-locomotives-damage.png",
      "alt": "A Ukrainian Railways ChME3 diesel shunting locomotive stands in the Port of Odessa in early morning light.",
      "credit": "Clay Gilliland / Wikimedia Commons (CC BY-SA 2.0)"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Demolition of the Long Walls of Athens (404 BC)",
        "excerpt": "And so they fell to levelling the fortifications and walls with much enthusiasm, to the accompaniment of female flute-players, deeming that day the beginning of liberty to Greece.",
        "source": "Xenophon, Hellenica (trans. H. G. Dakyns), Book 2, Chapter 2 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Hellenica_(Dakyns)/Book_2/Chapter_2"
      },
      {
        "category": "historical",
        "title": "Grant's Army Destroys the Railroads at Jackson, Mississippi (1863)",
        "excerpt": "McPherson reached Clinton with the advance early on the 13th and immediately set to work destroying the railroad.",
        "source": "Ulysses S. Grant, Personal Memoirs of U. S. Grant, Chapter XXXV — Wikisource",
        "href": "https://en.wikisource.org/wiki/Personal_Memoirs_of_U._S._Grant/Chapter_XXXV"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, 'To a Locomotive in Winter'",
        "excerpt": "Thee for my recitative, / Thee in the driving storm even as now, the snow, the winter-day declining,",
        "source": "Walt Whitman, Leaves of Grass (1882), 'To a Locomotive in Winter' — Wikisource",
        "href": "https://en.wikisource.org/wiki/Leaves_of_Grass_(1882)/From_Noon_to_Starry_Night/To_A_Locomotive_in_Winter"
      },
      {
        "category": "literary",
        "title": "Charles Dickens, 'Dombey and Son' — the Railway Tears Through Staggs's Gardens",
        "excerpt": "The first shock of a great earthquake had, just at that period, rent the whole neighbourhood to its centre.",
        "source": "Charles Dickens, Dombey and Son (1848), Chapter 6 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Dombey_and_Son_(1848)/Chapter_6"
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1)",
        "excerpt": "Honegger's 1923 orchestral tour de force does not so much depict a locomotive as embody one: from a vast steam engine trembling at rest, the music accelerates through churning, interlocking rhythms into a headlong three-hundred-ton rush, then grinds to a shuddering halt. It remains the definitive musical portrait of the iron road as raw industrial power — the same awesome machine that, in Ukraine today, means survival rather than spectacle.",
        "source": "IMSLP: Pacific 231, H.53 (Honegger, Arthur)",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, 'Rain, Steam and Speed – The Great Western Railway' (1844)",
        "excerpt": "Turner dissolves a Great Western Railway locomotive into a blaze of rain, steam and golden light as it storms across Brunel's bridge over the Thames. The machine is at once triumphant and menacing — the newborn power of the railway age hurtling out of the mist. Where Turner painted the iron road as the sublime engine of progress, its destruction in wartime Ukraine turns the same image into one of loss.",
        "source": "J. M. W. Turner, National Gallery, London — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Turner_-_Rain,_Steam_and_Speed_-_National_Gallery_file.jpg",
        "image": {
          "src": "/covers/ukraine-railway-locomotives-damage--art.png",
          "alt": "A steam locomotive races across a bridge through a golden storm of rain and mist in Turner's impressionistic 1844 painting.",
          "credit": "J. M. W. Turner, National Gallery, London / Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "india-ethanol-fuel-mandate",
    "headline": "India's auto industry defends E20 ethanol petrol mandate amid consumer backlash over mileage and engine wear",
    "overview": "India's leading automakers and the Society of Indian Automobile Manufacturers (SIAM) publicly defended the government's E20 ethanol-blended petrol mandate on 4 July 2026, saying years of laboratory and real-world testing had found no evidence that the fuel causes engine damage or abnormal wear. The defense came amid a growing consumer backlash over complaints of reduced mileage, engine wear and higher costs, with critics planning protests after the attorney general described E20 as an 'experiment' in a court hearing. Representatives from Toyota Kirloskar Motor, Maruti Suzuki, Hero MotoCorp, TVS Motor, Bajaj Auto and Hyundai argued the transition followed extensive testing by manufacturers, the Automotive Research Association of India (ARAI) and SIAM.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQNG9TelFsOVI5bm11YUJ3VHV6YTlPX1BnV1RMVnZuZkZ5NXl1UldvODZNZmVzRnNCUEdweUJidjdyWFBQUXA3SEVGSUx4U2lXWkE2SWRBLUJSV0Nld0pyT052Vl9EVTFwZVVWdjVvaEZnY3N2NXN3ZHhEVW4tejRMVnNzYlhDajJFSXh4YTJsZnM2c2xsbGxJalczRTd0TXVFS2t3SVlpV0hYN1o0R0JQVA?oc=5"
      },
      {
        "name": "Outlook India",
        "href": "https://www.outlookindia.com/national/industry-experts-defend-ethanol-blending-say-e20-fuel-safe-for-vehicles"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/india-ethanol-fuel-mandate.png",
      "alt": "A Hindustan Petroleum fuel pump on an Indian petrol station forecourt in Coimbatore.",
      "credit": "Photo by Wikimedia Commons user Ask27, CC BY-SA 4.0"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "A Treatise on Adulterations of Food, and Culinary Poisons (1820)",
        "excerpt": "But of all possible nefarious traffic and deception, practised by mercenary dealers, that of adulterating the articles intended for human food with ingredients deleterious to health, is the most criminal.",
        "source": "Friedrich Accum (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/19031"
      },
      {
        "category": "historical",
        "title": "Speech on the Frame-Work Bill, House of Lords, 27 February 1812",
        "excerpt": "By the adoption of one species of Frame in particular, one man performed the work of many, and the superfluous labourers were thrown out of employment.",
        "source": "Lord Byron, Hansard (UK Parliament)",
        "href": "https://api.parliament.uk/historic-hansard/lords/1812/feb/27/frame-work-bill"
      },
      {
        "category": "literary",
        "title": "Frankenstein; or, The Modern Prometheus",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Shelley (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/84"
      },
      {
        "category": "literary",
        "title": "Erewhon: The Book of the Machines",
        "excerpt": "let him think of a hundred thousand years, and the accumulated progress which they will bring, unless man can be awakened to a sense of his situation, and of the doom which he is preparing for himself.",
        "source": "Samuel Butler (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Erewhon/Chapter_23"
      },
      {
        "category": "artistic",
        "title": "Sergei Prokofiev, Le pas d'acier (The Steel Step), Op. 41 (1925–26)",
        "excerpt": "Prokofiev's constructivist ballet score churns with the pistons and hammers of the machine age, its driving ostinatos and clanging brass staging the factory floor as a kind of mechanized dance. Written to glorify a society retooling itself around industry, it captures both the exhilaration and the brute relentlessness of a nation remaking its engines. It is the sound of modernization imposed at full throttle, thrilling and faintly menacing at once.",
        "source": "IMSLP: Le pas d'acier, Op.41 (Prokofiev, Sergey)",
        "href": "https://imslp.org/wiki/Le_pas_d%27acier,_Op.41_(Prokofiev,_Sergey)"
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg, Coalbrookdale by Night (1801)",
        "excerpt": "Loutherbourg's canvas sets the Bedlam ironworks of Coalbrookdale ablaze against the night, furnaces throwing a hellish orange glare over the Shropshire valley as smoke boils into the dark. Painted at the dawn of the industrial age, it renders a new fuel-driven technology as at once sublime and unsettling — progress lighting up the sky and scorching the land beneath. It is the ambivalent face of every energy revolution, wonder and dread burning together.",
        "source": "Philip James de Loutherbourg, Coalbrookdale by Night (1801), Science Museum, London / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._002.jpg",
        "image": {
          "src": "/covers/india-ethanol-fuel-mandate--art.png",
          "alt": "A night landscape of the Coalbrookdale ironworks with furnaces glowing fiery orange and smoke billowing into the dark sky.",
          "credit": "Philip James de Loutherbourg, Coalbrookdale by Night (1801), Science Museum, London; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "ai-small-business-growth",
    "headline": "For one small business, AI was key to a quick start and expansion",
    "overview": "Reuters profiles Here Now Health, a Medicaid-funded mental-health platform for foster children founded in 2025 by first-time entrepreneur Michelle Turner, who worked from her Virginia Beach home and used AI tools to teach herself startup fundamentals, draft a business plan and refine her pitch to investors. Turner likened the technology to \"going to a master's level class every day from the robot,\" and the company now employs 16 people and is certified in three states. Economists cited in the report argue AI is dramatically reducing the cost and complexity of launching and scaling a company, lowering the barriers for founders without an MBA or startup pedigree.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxOSEhsMnNsNTVEQ29fZ1pGMzB6ZzNyZHgxWmUwaGp5Z0JxeGpUS3hCNUw5NHZ1NTFLVDFJUjd1bFZoQmpfRFFMMEQtZXVadnFmc01yaUpwSFl0Njc4X2Jsc1ZmYWdXcHdMRkJfUi1wLVNzNHQzcGhfNThMV2RLYU5faW1SSUE2ZXExV25uOERMSG5XNG43UHBmbmM4c2hkSVlNT0tNVFNvandxempMejF1MmZYWWF3SGRueVJ2dlllUV8?oc=5"
      },
      {
        "name": "U.S. Chamber of Commerce (CO—): How AI Is Driving 'Growth Engines' for Small Businesses in 2026",
        "href": "https://www.uschamber.com/co/run/technology/ai-powered-growth-engines"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/ai-small-business-growth.png",
      "alt": "A craftsman's hands shaping wooden details at a cluttered workbench in a small workshop, tools laid out around the work.",
      "credit": "Shixart1985, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The boy who tied a string to the valve",
        "excerpt": "One of those boys, who loved to play with his companions, observed that, by tying a string from the handle of the valve which opened this communication to another part of the machine, the valve would open and shut without his assistance, and leave him at liberty to divert himself with his play-fellows. One of the greatest improvements that has been made upon this machine, since it was first invented, was in this manner the discovery of a boy who wanted to save his own labour.",
        "source": "Adam Smith, The Wealth of Nations (1776)",
        "href": "https://www.gutenberg.org/cache/epub/3300/pg3300.txt"
      },
      {
        "category": "historical",
        "title": "The tradesman and his wheelbarrow",
        "excerpt": "I drest plainly; I was seen at no places of idle diversion. I never went out a fishing or shooting; a book, indeed, sometimes debauch'd me from my work, but that was seldom, snug, and gave no scandal; and, to show that I was not above my business, I sometimes brought home the paper I purchas'd at the stores thro' the streets on a wheelbarrow.",
        "source": "Benjamin Franklin, The Autobiography of Benjamin Franklin",
        "href": "https://www.gutenberg.org/cache/epub/148/pg148.txt"
      },
      {
        "category": "literary",
        "title": "Silas Marner at his loom",
        "excerpt": "The questionable sound of Silas's loom, so unlike the natural cheerful trotting of the winnowing-machine, or the simpler rhythm of the flail, had a half-fearful fascination for the Raveloe boys, who would often leave off their nutting or birds'-nesting to peep in at the window of the stone cottage, counterbalancing a certain awe at the mysterious action of the loom, by a pleasant sense of scornful superiority, drawn from the mockery of its alternating noises, along with the bent, tread-mill attitude of the weaver.",
        "source": "George Eliot, Silas Marner (1861)",
        "href": "https://www.gutenberg.org/cache/epub/550/pg550.txt"
      },
      {
        "category": "literary",
        "title": "The Secret of the Machines",
        "excerpt": "We were taken from the ore-bed and the mine, / We were melted in the furnace and the pit— / We were cast and wrought and hammered to design, / We were cut and filed and tooled and gauged to fit. / Some water, coal, and oil is all we ask, / And a thousandth of an inch to give us play, / And now if you will set us to our task, / We will serve you four and twenty hours a day!",
        "source": "Rudyard Kipling, 'The Secret of the Machines' (1911)",
        "href": "https://en.wikisource.org/wiki/The_Secret_of_the_Machines"
      },
      {
        "category": "artistic",
        "title": "Siegfried forges the sword Nothung",
        "excerpt": "In Wagner's forging scene the young Siegfried, an untutored apprentice raised in a forest smithy, shatters and reforges the fragments of his father's broken sword into the mighty blade Nothung, hammering in time to a driving orchestral pulse. Wagner turns the workshop into a stage: bellows roar, the anvil rings, and a novice suddenly wields a power far beyond his years. It is the archetype of the apprentice handed a transformative new instrument and remaking his own future with it.",
        "source": "IMSLP: Siegfried, WWV 86C (Wagner, Richard)",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "An Iron Forge",
        "excerpt": "Joseph Wright of Derby's An Iron Forge (1772) sets a family workshop aglow around a single incandescent bar of white-hot iron, the light modelling the smith's calm face and the awed children gathered close. Painted at the dawn of the Industrial Revolution, it dignifies a small craft enterprise transformed by a new machine — a water-powered tilt-hammer looming in the shadows — where the human hand still guides the metal. Its radiant glow prefigures our own image of the softly lit workspace transformed by a powerful new instrument.",
        "source": "Joseph Wright of Derby, An Iron Forge (1772), Tate",
        "href": "https://www.tate.org.uk/art/artworks/wright-an-iron-forge-t06670",
        "image": {
          "src": "/covers/ai-small-business-growth--art.png",
          "alt": "A blacksmith and his family gathered in a dim workshop around a brilliant white-hot bar of iron on the anvil, its glow lighting their faces.",
          "credit": "Joseph Wright of Derby, An Iron Forge (1772), Tate; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "williams-wimbledon-injury-exit",
    "headline": "Serena Williams withdraws from Wimbledon doubles with a knee injury, ending her comeback",
    "overview": "Serena Williams pulled out of her first-round Wimbledon doubles match alongside her sister Venus Williams after aggravating a right knee injury sustained during her singles defeat to Maya Joint, bringing her Wimbledon comeback to a premature close. The 44-year-old six-time Wimbledon doubles champions had been due to compete together for the first time since the 2022 US Open. The withdrawal was announced on the sisters' social media on 4 July 2026.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/sport/tennis/articles/ce95mxn1rlmo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPNWF2WUFsM215UG9hZnQySUpIbDhScFZRaFFwUXJGMVQxeGNmbEVicWFGOFN6ckg3N25QY0xrRE4wZGpWNDlmZnJNZVhlSFBMVlpDdlQ3QjF3eUtFZzh0cldhZUdpV0JQWDc5OUxqTDZCNVVsZzIwMEZMNHI4cDZGY2ZOOEw5S19BN3dra0hQcExZbFA3SE4tbw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/williams-wimbledon-injury-exit.png",
      "alt": "Serena Williams in mid-swing during a 2013 US Open doubles match played alongside her sister Venus.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Diagoras of Rhodes carried in triumph by his sons",
        "excerpt": "The story goes that Diagoras came to Olympia in the company of his sons Acusilaus and Damagetus. The youths on defeating their father proceeded to carry him through the crowd, while the Greeks pelted him with flowers and congratulated him on his sons.",
        "source": "Pausanias, Description of Greece 6.7.3 (trans. W.H.S. Jones)",
        "href": "https://www.theoi.com/Text/Pausanias6A.html"
      },
      {
        "category": "historical",
        "title": "The death of Milo of Croton, greatest of wrestlers",
        "excerpt": "They say that he was killed by wild beasts. The story has it that he came across in the land of Crotona a tree-trunk that was drying up; wedges were inserted to keep the trunk apart. Milo in his pride thrust his hands into the trunk, the wedges slipped, and Milo was held fast by the trunk until the wolves ... made him their prey.",
        "source": "Pausanias, Description of Greece 6.14.8 (trans. W.H.S. Jones)",
        "href": "https://www.theoi.com/Text/Pausanias6A.html"
      },
      {
        "category": "literary",
        "title": "A.E. Housman, 'To an Athlete Dying Young'",
        "excerpt": "The time you won your town the race / We chaired you through the market-place; / Man and boy stood cheering by, / And home we brought you shoulder-high. // To-day, the road all runners come, / Shoulder-high we bring you home, / And set you at your threshold down, / Townsman of a stiller town.",
        "source": "A.E. Housman, A Shropshire Lad (1896), no. XIX",
        "href": "https://www.gutenberg.org/cache/epub/5720/pg5720.txt"
      },
      {
        "category": "literary",
        "title": "Homer, the generations of leaves",
        "excerpt": "Even as are the generations of leaves, such are those also of men. As for the leaves, the wind scattereth some upon the earth, but the forest, as it bourgeons, putteth forth others when the season of spring is come; even so of men one generation springeth up and another passeth away.",
        "source": "Homer, Iliad 6.146-149 (trans. A.T. Murray)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=6:card=119"
      },
      {
        "category": "artistic",
        "title": "Haydn, Symphony No. 45 in F-sharp minor, 'Farewell'",
        "excerpt": "Haydn's 1772 symphony ends with one of music's most poignant leave-takings: in the closing Adagio the players fall silent one by one, each snuffing out the candle on his stand and quietly walking off, until only two muted violins remain to finish alone in the dark. Composed as a plea for the Esterhazy musicians to be sent home, it has become the enduring emblem of the graceful exit and the end of an era, greatness dispersing note by note.",
        "source": "IMSLP: Symphony No.45 in F-sharp minor, Hob.I:45 (Haydn, Joseph)",
        "href": "https://imslp.org/wiki/Symphony_No.45_in_F-sharp_minor,_Hob.I:45_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "The Townley Discobolus (Discus-Thrower), after Myron",
        "excerpt": "This Roman marble, copied from a lost bronze of about 460-450 BC by Myron, freezes an athlete at the coiled instant before release, body wound like a spring at the absolute summit of physical power. It is antiquity's supreme image of the human form in its perfection, a beauty that the marble holds forever and the living body can hold only for a moment.",
        "source": "The British Museum / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Discus-thrower_(discobolus),_Roman_copy_of_a_bronze_original_of_the_5th_century_BC,_found_at_Hadrians_Villa,_Winning_at_the_ancient_Games,_British_Museum_(7376120902).jpg",
        "image": {
          "src": "/covers/williams-wimbledon-injury-exit--art.png",
          "alt": "Marble statue of a nude Greek athlete coiled at the moment of hurling the discus, the Townley Discobolus in the British Museum.",
          "credit": "Carole Raddato / Wikimedia Commons (CC BY-SA 2.0)"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "ohtani-biceps-injury-all-star",
    "headline": "Ohtani leaves game against Padres with biceps issue and is unlikely to pitch in All-Star Game",
    "overview": "Los Angeles Dodgers two-way star Shohei Ohtani left Friday night's game against the San Diego Padres with a right biceps issue and is now considered unlikely to pitch in the upcoming MLB All-Star Game. Ohtani said he first felt the biceps problem during an at-bat in the sixth inning and was lifted as a precaution; he had allowed three runs over six innings with nine strikeouts on a season-high 110 pitches. He remains penciled into the National League's starting lineup as designated hitter after leading the first phase of fan balloting.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxPUjBwbXdVakw5cUlka0hxZE5GVUpXR3dwMzFfd0MwaXU1MlRzdlc1UUNmZGZHMjRVcElpTHh0TUNWUG1OaGJKSHUxcG5jNnhKYnljNktOWXFab3ZpQWZ2ZnFBYTZBbkF3T09pRWFYX01lVnA1X2RGTG5vaE9aVnpVUFZPX29WQ3lDb3ZsT2lSV1I0Y0djWUFBaFNR?oc=5"
      },
      {
        "name": "MLB.com",
        "href": "https://www.mlb.com/news/shohei-ohtani-unlikely-to-pitch-in-2026-all-star-game"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/ohtani-biceps-injury-all-star.png",
      "alt": "Los Angeles Dodgers two-way star Shohei Ohtani at bat during a 2024 game.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Milo of Croton, the strongman undone by his own sinews",
        "excerpt": "The story has it that he came across in the land of Crotona a tree-trunk that was drying up; wedges were inserted to keep the trunk apart. Milo in his pride thrust his hands into the trunk, the wedges slipped, and Milo was held fast by the trunk until the wolves—a beast that roves in vast packs in the land of Crotona—made him their prey.",
        "source": "Pausanias, Description of Greece 6.14 (trans. W. H. S. Jones)",
        "href": "https://myths.uvic.ca/PAUS1-6.html"
      },
      {
        "category": "historical",
        "title": "Theagenes of Thasos, the boxer who also conquered the pancratium",
        "excerpt": "At the Festival following this, Theagenes was the winner in the pancratium. The total number of crowns that he won was one thousand four hundred.",
        "source": "Pausanias, Description of Greece 6.11 (trans. W. H. S. Jones)",
        "href": "https://myths.uvic.ca/PAUS1-6.html"
      },
      {
        "category": "literary",
        "title": "Achilles and the twofold fate of the peerless warrior",
        "excerpt": "For my mother the goddess, silver-footed Thetis, telleth me that twofold fates are bearing me toward the doom of death: if I abide here and war about the city of the Trojans, then lost is my home-return, but my renown shall be imperishable; but if I return home to my dear native land, lost then is my glorious renown, yet shall my life long endure, neither shall the doom of death come soon upon me.",
        "source": "Homer, Iliad 9 (trans. A. T. Murray)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Hom.+Il.+9.410&fromdoc=Perseus:text:1999.01.0134"
      },
      {
        "category": "literary",
        "title": "Samson, the strongman whose strength departs",
        "excerpt": "And she said, The Philistines be upon thee, Samson. And he awoke out of his sleep, and said, I will go out as at other times before, and shake myself. And he wist not that the LORD was departed from him.",
        "source": "The Bible, Judges 16 (King James Version)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges"
      },
      {
        "category": "artistic",
        "title": "Handel's oratorio of the fallen champion of Israel",
        "excerpt": "Handel's 1743 oratorio dramatizes the blinded, shorn hero at his lowest ebb, the mightiest of men reduced to grinding at a Philistine mill, before summoning one final surge of ruinous strength. Its choruses swell from lament to triumphant blaze, mourning the fragility of a body that was once its people's whole defense. In the music the strongman's failing sinew and his last, fatal exertion become a meditation on greatness spent.",
        "source": "IMSLP: Samson, HWV 57 (Handel, George Frideric)",
        "href": "https://imslp.org/wiki/Samson,_HWV_57_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Dying Gaul, the champion brought low by a wound",
        "excerpt": "The Roman marble copy of a lost Hellenistic bronze shows a mortally wounded warrior sinking onto his shield, the strength draining from a magnificent athletic body. Every muscle is rendered in perfect vigor even as a single wound below the ribs proves fatal, the hero's greatness and his fragility carved into the same stone. He props himself on one failing arm, a floodlit portrait of physical excellence undone in an instant.",
        "source": "The Dying Gaul, Capitoline Museums, Rome (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Dying_Gaul.jpg",
        "image": {
          "src": "/covers/ohtani-biceps-injury-all-star--art.png",
          "alt": "Ancient marble sculpture of a nude wounded warrior collapsing onto his shield, propped on one arm.",
          "credit": "BeBo86, CC BY-SA 3.0, via Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "ricardo-leal-hempcrete-coop",
    "headline": "Ricardo Leal completes a hempcrete and timber chicken coop beside a Portuguese home",
    "overview": "Portuguese architect Ricardo Leal has completed Pestana Chicken Coop, a compact hen-house built from hempcrete and timber on a gently sloping, moss-covered site in São Pedro do Sul, Portugal. Raised on slender timber stilts to avoid disturbing the ground, it combines an open run, nesting boxes and an enclosed roosting area beneath two opposing corrugated roofs. Informed by Walter Segal's self-build timber method, Leal designed it to argue that 'even the most modest structures deserve careful thought'.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/04/ricardo-leal-pestana-chicken-coop/"
      },
      {
        "name": "Ricardo Leal — architect's studio portfolio",
        "href": "https://cargocollective.com/ricardoleal"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-04",
    "image": {
      "src": "/covers/ricardo-leal-hempcrete-coop.png",
      "alt": "Pestana Chicken Coop by Ricardo Leal — a small hempcrete and timber hen-house raised on slender stilts beside a rustic Portuguese home.",
      "credit": "Dezeen"
    },
    "edition": "Evening Edition · 4 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Vitruvius, The Ten Books on Architecture, Book II",
        "excerpt": "Some made them of green boughs, others dug caves on mountain sides, and some, in imitation of the nests of swallows and the way they built, made places of refuge out of mud and twigs.",
        "source": "Vitruvius, The Ten Books on Architecture (trans. M. H. Morgan), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/20239/20239-h/20239-h.htm"
      },
      {
        "category": "historical",
        "title": "Varro, On Farming (Rerum Rusticarum), Book III",
        "excerpt": "In front of it, as I said, should be an enclosed yard, in which they may run during the daytime and dust themselves.",
        "source": "Varro, Rerum Rusticarum III.9 (Loeb translation), LacusCurtius (University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Varro/de_Re_Rustica/3*.html"
      },
      {
        "category": "literary",
        "title": "Henry David Thoreau, Walden, 'Economy'",
        "excerpt": "Near the end of March, 1845, I borrowed an axe and went down to the woods by Walden Pond, nearest to where I intended to build my house, and began to cut down some tall, arrowy white pines, still in their youth, for timber.",
        "source": "Thoreau, Walden, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/205/205-h/205-h.htm"
      },
      {
        "category": "literary",
        "title": "Virgil, Georgics, Book II",
        "excerpt": "Oh! all too happy tillers of the soil,\nCould they but know their blessedness, for whom\nFar from the clash of arms all-equal earth\nPours from the ground herself their easy fare!",
        "source": "Virgil, The Georgics, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/232/232-h/232-h.htm"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Symphony No. 6 in F major 'Pastoral', Op. 68",
        "excerpt": "Beethoven's Sixth Symphony translates a country walk into sound — from the cheerful feelings on arriving in the fields, to the murmuring 'Scene by the Brook', to the shepherds' grateful hymn after the storm. Its unhurried, rustic warmth is the aural cousin of Leal's small coop: ordinary rural life rendered with the utmost care. The music dignifies humble farmyard existence exactly as the architect dignifies a modest agricultural building.",
        "source": "IMSLP: Symphony No.6, Op.68 (Beethoven, Ludwig van)",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Jan Steen, 'The Poultry Yard' (1660)",
        "excerpt": "In Jan Steen's sunlit farmyard a young girl feeds a motley flock of hens, doves and chicks beside the weathered timber of a country estate, offering milk to a lamb at her side. The painting finds nobility in the humble poultry yard — the same rural world Leal's coop is built to serve. Rustic outbuildings and clucking fowl become, under Steen's brush, a scene worthy of a formal portrait.",
        "source": "Jan Steen, The Poultry Yard, Mauritshuis, The Hague",
        "href": "https://www.mauritshuis.nl/en/our-collection/artworks/166-portrait-of-jacoba-maria-van-wassenaer-1654-1683-known-as-the-poultry-yard",
        "image": {
          "src": "/covers/ricardo-leal-hempcrete-coop--art.png",
          "alt": "A young girl in a poultry yard feeding hens, doves and chicks beside rustic farm buildings, giving milk to a lamb.",
          "credit": "Jan Steen, The Poultry Yard, 1660, Mauritshuis, The Hague (public domain, via Wikimedia Commons)"
        }
      }
    ],
    "rank": 13
  },
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
    "rank": 14
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
    "rank": 15
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
    "rank": 16
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
    "rank": 17
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
    "rank": 18
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
    "rank": 19
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
    "rank": 20
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
    "rank": 21
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
    "rank": 22
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
    "rank": 23
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
    "rank": 24
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
    "rank": 25
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
        "excerpt": "I saw drought devastation in nine States. … I shall never forget the fields of wheat so blasted by heat that they cannot be harvested. … I saw brown pastures which would not keep a cow on fifty acres.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Roosevelt's_Fireside_Chat,_6_September_1936"
      },
      {
        "category": "historical",
        "title": "History of the Peloponnesian War — the Plague of Athens, Thucydides (c. 430 BC) — a great power struck at the height of its glory by burning fever and unquenchable thirst, adversity falling on a civilization mid-celebration",
        "excerpt": "they were taken first with an extreme ache in their heads, redness and inflammation of the eyes … Many of them that were not looked to, possessed with insatiate thirst, ran unto the wells.",
        "source": "Perseus (Tufts)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0247:book=2:chapter=49"
      },
      {
        "category": "literary",
        "title": "The Rime of the Ancient Mariner, Samuel Taylor Coleridge (1817) — a ship becalmed under a bloody noon sun, water everywhere yet none to drink, an emblem of heat and thirst amid apparent abundance",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon. … Water, water, every where, / Nor any drop to drink.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Sibylline_Leaves_(Coleridge)/The_Rime_of_the_Ancient_Mariner"
      },
      {
        "category": "literary",
        "title": "The Waste Land, T. S. Eliot (1922) — 'no water but only rock,' a parched modern wasteland mirroring drought-stricken land baking under a punishing sky",
        "excerpt": "Here is no water but only rock / Rock and no water and the sandy road / The road winding above among the mountains / Which are mountains of rock without water",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1321/1321-h/1321-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Harvesters, Pieter Bruegel the Elder (1565) — laborers collapsed in the shade at high summer, the age-old bodily toll of extreme heat on those who must work outdoors",
        "excerpt": "Under a hazy golden sky, peasants pause from cutting the wheat to sprawl exhausted beneath a lone pear tree, one man asleep open-mouthed in the heat while others gulp food and drink. The scorched, sun-bleached fields stretch to a shimmering horizon, capturing the oppressive warmth of high summer. It renders the same heat exhaustion that record temperatures now inflict on outdoor workers.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/us-july4-record-heat-america-250--art.png",
          "alt": "Bruegel's The Harvesters (1565): peasants resting exhausted in the heat of the wheat harvest, echoing the human toll of extreme heat",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "'Summer' (L'estate) from The Four Seasons, Antonio Vivaldi (1725) — a concerto whose sonnet has man and flock languishing under a merciless sun before a violent storm, evoking a heat dome breaking into grid-straining tempest",
        "excerpt": "Vivaldi's concerto opens in oppressive stillness, its programmatic sonnet describing man and flock languishing beneath a scorching sun and the pine tree parched by heat. The violins pant and shimmer like heat-haze before erupting into a ferocious thunderstorm that flattens the ripe grain. The music dramatizes exactly the pattern of a heat dome collapsing into violent, power-straining storms.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)"
      }
    ],
    "rank": 26
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
        "excerpt": "Humanity and good policy conspire to dictate, that the benign prerogative of pardoning should be as little as possible fettered or embarrassed. The reflection that the fate of a fellow-creature depended on his sole fiat, would naturally inspire scrupulousness and caution; the dread of being accused of weakness or connivance, would beget equal circumspection.",
        "source": "Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/18th_century/fed74.asp"
      },
      {
        "category": "historical",
        "title": "Proclamation 4311, Gerald R. Ford (1974) — a president's sweeping pardon lifting the threat of prosecution from a powerful ally",
        "excerpt": "do grant a full, free, and absolute pardon unto Richard Nixon for all offenses against the United States which he, Richard Nixon, has committed or may have committed or taken part in during the period from January 20, 1969 through August 9, 1974.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Proclamation_4311"
      },
      {
        "category": "literary",
        "title": "Measure for Measure, William Shakespeare (1604) — a drama of corrupt authority and mercy, warning that 'pardon is still the nurse of second woe'",
        "excerpt": "It is but needful:\nMercy is not itself, that oft looks so;\nPardon is still the nurse of second woe:\nBut yet,--poor Claudio! There is no remedy.",
        "source": "The Complete Works of William Shakespeare (MIT)",
        "href": "http://shakespeare.mit.edu/measure/measure.2.1.html"
      },
      {
        "category": "literary",
        "title": "Inferno, Dante Alighieri (c.1320) — the barrators, corrupt officials boiled in pitch, the reckoning that clemency now cancels",
        "excerpt": "As in the Arsenal of the Venetians / Boils in the winter the tenacious pitch / To smear their unsound vessels o'er again ... O Malebranche, / Behold one of the elders of Saint Zita; / Plunge him beneath, for I return for others",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_21"
      },
      {
        "category": "artistic",
        "title": "The Return of the Prodigal Son, Rembrandt van Rijn (c.1668) — mercy that folds the wayward back into favor with no penance exacted",
        "excerpt": "A ragged, kneeling figure buries his shaved head in his father's chest while the elder man's worn hands rest gently on his shoulders in wordless forgiveness. Rembrandt bathes the reunion in warm light and pushes the disapproving onlookers into shadow, so that clemency, not accountability, fills the canvas. The scene reads as pardon rendered absolute: the transgressor restored, the debt simply dissolved.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/trump-pardons-clean-air-act-convictions--art.png",
          "alt": "Rembrandt's The Return of the Prodigal Son, a father embracing his kneeling wayward son in total forgiveness, echoing clemency that wipes away wrongdoing",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "La clemenza di Tito, Wolfgang Amadeus Mozart (1791) — an opera in which an emperor pardons the very conspirator who plotted his death, staging clemency as the ruler's supreme prerogative",
        "excerpt": "Mozart's final opera seria dramatizes the Roman emperor Titus discovering that his trusted friend Sesto led an armed plot to assassinate him and burn the Capitol. Rather than execute the traitor, Tito tears up the death warrant and forgives him, and the chorus exalts the sovereign's boundless mercy. The work turns an act of clemency toward a guilty intimate into a spectacle of imperial magnanimity, mercy dispensed from on high as an emblem of power.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/La_clemenza_di_Tito,_K.621_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 27
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
        "excerpt": "In 1956 the United States found itself at odds with the very partners who had just fought a war, pressuring Britain, France, and Israel to accept a United Nations ceasefire and withdraw. Washington voted for UN resolutions and publicly censured its allies, a rare open rebuke that temporarily soured relations even among close friends. It is a vivid case of the strongest power constraining the smaller states in its camp in the war's immediate aftermath.",
        "source": "U.S. Department of State, Office of the Historian",
        "href": "https://history.state.gov/milestones/1953-1960/suez"
      },
      {
        "category": "historical",
        "title": "The 1973 Arab-Israeli War and Kissinger's Shuttle Diplomacy, United States (1973–1975) — postwar friction between allies channeled into summit diplomacy",
        "excerpt": "The October 1973 war ended in an Israeli battlefield victory only after a massive American airlift, yet it nearly dragged the superpowers into confrontation and triggered an Arab oil embargo. In its wake, Secretary of State Kissinger launched an intensive round of face-to-face diplomacy to manage a relationship that was at once indispensable and strained. The episode shows how a shared war can leave a great power and its ally needing to sit down together to repair the bond.",
        "source": "U.S. Department of State, Office of the Historian",
        "href": "https://history.state.gov/milestones/1969-1976/arab-israeli-war-1973"
      },
      {
        "category": "literary",
        "title": "The Iliad, Homer (c. 8th century BC) — the bitter quarrel between the paramount king and his greatest warrior after a shared war",
        "excerpt": "Most glorious son of Atreus, most covetous of all, how shall the great-hearted Achaeans give you a prize?",
        "source": "Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D1%3Acard%3D101"
      },
      {
        "category": "literary",
        "title": "Julius Caesar, William Shakespeare (1599) — allied victors turning on each other in a tent-side quarrel",
        "excerpt": "Let me tell you, Cassius, you yourself Are much condemn'd to have an itching palm.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1522/1522-h/1522-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Meeting of Napoleon I and Tsar Alexander I at Tilsit, Adolphe Roehn (1808) — two rulers, unequal in power, meeting to settle terms after a war",
        "excerpt": "Roehn depicts the June 1807 summit on a raft in the middle of the River Neman, where Napoleon and Tsar Alexander I negotiated the Peace of Tilsit ending the War of the Fourth Coalition. Though staged as an equal meeting, the composition subtly places Napoleon in a posture of ascendancy, waiting for the Russian to approach. It captures the choreography and quiet tension of a face-to-face summit between a dominant power and a partner seeking accommodation.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Tilsitz_1807.JPG",
        "image": {
          "src": "/covers/netanyahu-trump-us-summit-iran-rift--art.png",
          "alt": "Roehn's painting of Napoleon and Tsar Alexander meeting on a raft on the Niemen at Tilsit, a summit between a great power and a smaller partner after war",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Music for the Royal Fireworks, HWV 351, George Frideric Handel (1749) — grand ceremonial music marking peace and reconciliation among powers after a war",
        "excerpt": "Handel composed this festive suite of overture, bourrees, and triumphant movements for the public celebrations in London's Green Park honoring the peace that ended the War of the Austrian Succession. Its blazing brass and drums were meant to turn the close of a costly, divisive conflict into a display of restored harmony among nations. The music embodies the impulse to convert postwar strain into a stately, public gesture of alliance renewed.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      }
    ],
    "rank": 28
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
        "excerpt": "Often, while they looked behind them, they were intercepted by flames on their side or in their face. Or if they reached a refuge close at hand, when this too was seized by the fire, they found that, even places, which they had imagined to be remote, were involved in the same calamity.",
        "source": "Perseus Digital Library (Tufts)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=15:chapter=38"
      },
      {
        "category": "historical",
        "title": "The Great Peshtigo Fire: An Eyewitness Account, Rev. Peter Pernin (1874) — the deadliest wildfire in U.S. history, whose wind-driven wall of flame and terrified flight mirror the panic near Pueblo.",
        "excerpt": "The neighing of horses, falling of chimneys, crashing of uprooted trees, roaring and whistling of the wind, crackling of fire as it ran with lightning-like rapidity from house to house—all sounds were there save that of the human voice.",
        "source": "Internet Archive",
        "href": "https://archive.org/stream/the-great-peshtigo-fire-an-eyewitness-account/The%20Great%20Peshtigo%20Fire%20-%20An%20Eyewitness%20Account_djvu.txt"
      },
      {
        "category": "literary",
        "title": "The Aeneid, Book II, Virgil (trans. John Dryden, 1697) — Aeneas fleeing a burning city, its wildfire simile of flame mowing standing corn echoing 28 square miles scorched in hours.",
        "excerpt": "Thus, when a flood of fire by wind is borne, / Crackling it rolls, and mows the standing corn",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "Metamorphoses, Book II (Phaethon), Ovid (trans. Brookes More) — the sun-chariot loosed to set the whole earth ablaze, cities, forests and mountains consumed like the 82,000-acre front.",
        "excerpt": "Great cities perish with their walls, / and peopled nations are consumed to dust— / the forests and the mountains are destroyed.",
        "source": "Perseus Digital Library (Tufts)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons, October 16, 1834, J. M. W. Turner (1834–35) — a landmark engulfed in roaring flame and glowing sky, as fire threatened Colorado's Bishop Castle.",
        "excerpt": "Turner turns catastrophe into a towering column of orange-white fire that dissolves stone into light, its heat smearing across the night sky and reflecting in the crowded river below. Tiny onlookers press to the water's edge, dwarfed by a blaze that has swallowed a landmark whole. The painting captures the awe and helplessness of watching an unstoppable fire consume the familiar.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/aspen-acres-wildfire-colorado--art.png",
          "alt": "J. M. W. Turner's 'The Burning of the Houses of Lords and Commons' (1834-35), a landmark consumed by roaring fire, evoking the wildfire threatening Bishop Castle",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Magic Fire Music (Feuerzauber) from Die Walküre, Richard Wagner (1870) — orchestral flames rising to encircle and cut off all approach, sonically mirroring a fire ring closing around evacuees.",
        "excerpt": "Shimmering strings and darting woodwinds flicker upward like sparks catching, building into a radiant, restless blaze of orchestral color. The music surrounds a mountaintop with an impassable ring of fire, beautiful and terrifying at once. Its glowing, ever-shifting textures evoke the mesmerizing menace of flames consuming everything in their path.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)"
      }
    ],
    "rank": 29
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
        "excerpt": "Snow like flour—could not breathe in it. I was 7 years and stuck my head around corner of house and nearly choked before I got indoors again.",
        "source": "National Weather Service (NOAA)",
        "href": "https://www.weather.gov/unr/1888-01-12"
      },
      {
        "category": "historical",
        "title": "The Wreck of the Steamer Lady Elgin, Lake Michigan (September 8, 1860) — a Great Lakes vessel lost in a nighttime gale, drowning some 300, echoing the sudden storm that capsized the Geneva Lake boat",
        "excerpt": "A most appalling calamity has burst upon our community, and the other communities yet to be thrilled with the intelligence of a disaster which has just occurred on this lake [Michigan], without parallel in the marine annals of the lakes.",
        "source": "Chicago Tribune (Sept. 10, 1860), via Digital Research Library of Illinois History Journal",
        "href": "https://drloihjournal.blogspot.com/2020/03/sinking-of-the-ps-lady-elgin-on-9-8-1860.html"
      },
      {
        "category": "literary",
        "title": "The Wreck of the Hesperus, Henry Wadsworth Longfellow (1842) — a skipper's young daughter, lashed to the mast, dies when a sudden storm wrecks the schooner, mirroring children lost on the water",
        "excerpt": "He wrapped her warm in his seaman's coat / Against the stinging blast; / He cut a rope from a broken spar, / And bound her to the mast.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Wreck_of_the_Hesperus"
      },
      {
        "category": "literary",
        "title": "The Tempest, William Shakespeare (c. 1611) — the play opens with a ship foundering in a violent tempest, the mariners crying their farewells as the vessel splits",
        "excerpt": "Mercy on us!—We split, we split!—Farewell my wife and children!—Farewell, brother!—We split, we split, we split!",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/23042/23042-h/23042-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Ninth Wave, Ivan Aivazovsky (1850) — shipwreck survivors cling to a broken mast beneath a towering storm wave, an image of the sea's sudden and lethal violence",
        "excerpt": "Aivazovsky paints a handful of survivors lashed to the shattered mast of a wrecked ship, tossed on a blazing dawn sea as an enormous wave rears to break over them. The canvas fuses terror and fragile hope: the light of survival glows through the storm even as the water threatens to engulf them, capturing the exact moment when a sudden tempest turns a vessel into a fight for life.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/geneva-lake-wisconsin-boat-capsize--art.png",
          "alt": "Aivazovsky's The Ninth Wave: shipwreck survivors clinging to a broken mast beneath a giant storm wave, evoking a boat overturned by a sudden squall",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Kindertotenlieder ('Songs on the Death of Children'), Gustav Mahler (1904) — the final song, 'In diesem Wetter' ('In this weather, in this storm'), voices a parent's grief for children lost to the tempest",
        "excerpt": "Mahler's cycle sets a grieving parent's meditation on children who have died, and its fifth and final song erupts into a raging orchestral storm—wind, rain, and thunder—before subsiding into unbearable tenderness. The voice laments that the children were carried out into the tempest against the parent's will, then finds fragile consolation that they now rest as if in their mother's house, sheltered from every storm.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Kindertotenlieder_(Mahler,_Gustav)"
      }
    ],
    "rank": 30
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
        "excerpt": "That furnished the opportunity, the criminal element furnished the action. There is no right to strike against the public safety by anybody, anywhere, any time. You ask that the public safety again be placed in the hands of these same policemen while they continue in disobedience to the laws of Massachusetts.",
        "source": "The American Presidency Project",
        "href": "https://www.presidency.ucsb.edu/documents/telegram-the-president-the-american-federation-labor-samuel-gompers-the-boston-police"
      },
      {
        "category": "historical",
        "title": "Statement from the Pullman Strikers, American Railway Union delegates (1894) — railway workers who downed tools when negotiations failed, voicing the same last-resort desperation as PECO crews walking out after talks collapsed",
        "excerpt": "We struck at Pullman because we were without hope. We joined the American Railway Union because it gave us a glimmer of hope.",
        "source": "History Is a Weapon",
        "href": "https://www.historyisaweapon.com/defcon1/pullmanstrikersstatement.html"
      },
      {
        "category": "literary",
        "title": "Germinal, Émile Zola (1885) — the coal miners' strike erupts before dawn in a single decisive moment, mirroring PECO workers walking off just after midnight with no deal in place",
        "excerpt": "Suddenly, on this very Monday, at four o'clock in the morning, the strike broke out.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/56528/56528-h/56528-h.htm"
      },
      {
        "category": "literary",
        "title": "The Masque of Anarchy, Percy Bysshe Shelley (1819) — the archetypal summons to collective action and solidarity, the moral engine behind any labor stoppage like the PECO walkout",
        "excerpt": "Rise like Lions after slumber / In unvanquishable number, / Shake your chains to earth like dew / Which in sleep had fallen on you— / Ye are many—they are few.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Masque_of_Anarchy"
      },
      {
        "category": "artistic",
        "title": "The Strike (Der Streik), Robert Koehler (1886) — the first major painting of a strike, showing workers who have downed tools confronting the factory owner, a visual precedent for PECO's crews withholding their labor",
        "excerpt": "Koehler's monumental canvas freezes the instant a strike ignites: workers stream from the mill gates and mass before the owner on his steps, one man arguing with clenched urgency while another stoops to gather a stone. Women and children crowd the margins, and the smokestacks stand cold behind them. It is the dignity of labor rendered as tense, collective confrontation.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Robert_Koehler_-_Der_Streik_(1886).jpg",
        "image": {
          "src": "/covers/peco-philadelphia-utility-workers-strike--art.png",
          "alt": "Robert Koehler's 1886 painting The Strike, workers confronting a factory owner after downing tools, echoing PECO crews walking off the job",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Solidarity Forever, Ralph Chaplin (1915) — the most famous labor anthem, distilling the collective power PECO's unionized workers assert by walking off together",
        "excerpt": "Solidarity forever! / Solidarity forever! / Solidarity forever! / But the Union makes us strong.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Songs_of_the_Workers_(15th_edition)/Solidarity_Forever!"
      }
    ],
    "rank": 31
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
        "excerpt": "Accordingly I sent for all my pewter platters, porringers, and dishes, to the number of some two hundred pieces, and had a portion of them cast, one by one, into the channels, the rest into the furnace.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Life_of_Benvenuto_Cellini/Section_LXXII_to_LXXXVII"
      },
      {
        "category": "historical",
        "title": "My Life and Work, Henry Ford (1922) — Ford makes his own parts and materials so he cannot be crippled when an outside supplier fails, foreshadowing Anthropic forging its own silicon",
        "excerpt": "But also we aim to make some of every part so that we cannot be caught in any market emergency or be crippled by some outside manufacturer being unable to fill his orders.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7213/pg7213-images.html"
      },
      {
        "category": "literary",
        "title": "Iliad, Book 18, Homer (trans. A. T. Murray, 1924) — Hephaestus fires his forge to hammer out new arms for Achilles, the god making the hero's tools with his own hands",
        "excerpt": "And on the fire he put stubborn bronze and tin and precious gold and silver; and thereafter he set on the anvil-block a great anvil, and took in one hand a massive hammer, and in the other took he the tongs.",
        "source": "Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D18%3Acard%3D468"
      },
      {
        "category": "literary",
        "title": "Prometheus Bound, Aeschylus (c. 430 BCE) — Prometheus hands mortals fire so 'they shall learn many arts,' the primal act of seizing the means of making",
        "excerpt": "Prometheus: In addition, I gave them fire. Chorus: What! Do creatures of a day now have flame-eyed fire? Prometheus: Yes, and from it they shall learn many arts.",
        "source": "Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0010%3Acard%3D250"
      },
      {
        "category": "artistic",
        "title": "Apollo in the Forge of Vulcan (La Fragua de Vulcano), Diego Velázquez (1630) — the divine smithy where armor is beaten from glowing metal, an image of owning the forge itself",
        "excerpt": "Velazquez paints Vulcan and his sweating assistants frozen at the anvil, a bar of iron glowing white-hot between hammer and tongs as Apollo arrives with unwelcome news. Light pours across bare muscle and half-finished armor, dignifying manual labor as the very engine of the divine workshop. It is the forge as a place of self-made power, metal mastered by fire and human hands.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Diego_Vel%C3%A1zquez_-_The_Forge_of_Vulcan_-_WGA24376.jpg",
        "image": {
          "src": "/covers/anthropic-samsung-custom-ai-chip--art.png",
          "alt": "Velazquez's The Forge of Vulcan (1630): smiths at a fiery anvil forging armor, an emblem of controlling the means of production like Anthropic forging its own chips",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Siegfried, Forging Song ('Nothung! Nothung!'), Richard Wagner (1876) — the young hero reforges his father's shattered sword with his own hands rather than rely on the smith Mime",
        "excerpt": "Nothung! Nothung! / Conquering sword! ... Hoho! Hoho! / Hohei! Hohei! Hoho! / Bellows blow! / Brighten the flame!",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/49507/49507-h/49507-h.htm"
      }
    ],
    "rank": 32
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
        "excerpt": "The Hellenes with Leonidas, feeling that they were going forth to death, now advanced out much further than at first into the broader part of the defile... they displayed upon the Barbarians all the strength which they had, to its greatest extent, disregarding danger and acting as if possessed by a spirit of recklessness.",
        "source": "Herodotus, The Histories (Macaulay translation)",
        "href": "https://anthonyhollingsworth.com/resources/Battle-of-Thermopylae-Herodotus.pdf"
      },
      {
        "category": "historical",
        "title": "History of the Peloponnesian War (Book 7: the Sicilian Expedition), Thucydides (c. 400 BC) — the overwhelming favourite's grand campaign brought to the brink of ruin, an echo of the scare Argentina survived",
        "excerpt": "Few of many returned home. And thus passed the business concerning Sicily.",
        "source": "Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Thuc.+7.87"
      },
      {
        "category": "literary",
        "title": "1 Samuel 17 (David and Goliath), King James Bible (1611) — the small shepherd who fells the giant, the frame every report reached for as a tiny island nation staggered the holders",
        "excerpt": "Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. ... So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "Ulysses, Alfred, Lord Tennyson (1842) — the aged hero who refuses to rest or yield, mirroring Messi's persistence as he pressed on for the Golden Boot lead",
        "excerpt": "that which we are, we are; / One equal temper of heroic hearts, / Made weak by time and fate, but strong in will / To strive, to seek, to find, and not to yield.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Ulysses_(Tennyson)"
      },
      {
        "category": "artistic",
        "title": "David with the Head of Goliath, Caravaggio (c. 1610) — the young giant-slayer grasping the vanquished giant's severed head, the ultimate image of the underdog overturning the mighty",
        "excerpt": "Caravaggio freezes the aftermath of the upset: a pensive young David lifts the dripping head of the fallen giant out of deep shadow, the whole drama staked on a single unlikely stone. The vanquished colossus, dwarfing the boy in life, is reduced to a trophy in the underdog's grip. It is the definitive picture of the small felling the great.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "image": {
          "src": "/covers/argentina-cape-verde-world-cup--art.png",
          "alt": "Caravaggio's David with the Head of Goliath, the underdog boy holding the slain giant's head — a visual analogy for tiny Cape Verde staggering the champions",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Saul, George Frideric Handel (1738) — an oratorio that opens with all Israel hailing the young giant-killer's victory, celebrating the underdog whose feat unsettles the mighty",
        "excerpt": "Handel's dramatic oratorio opens in the glow of David's triumph over Goliath, the massed chorus swelling in exultation as a nation salutes a shepherd boy who toppled a giant. The music turns that improbable victory into communal jubilation before envy and downfall follow. Its opening captures exactly the roar that greets an underdog who humbles a colossus.",
        "source": "IMSLP (International Music Score Library Project)",
        "href": "https://imslp.org/wiki/Saul,_HWV_53_(Handel,_George_Frideric)"
      }
    ],
    "rank": 33
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
        "excerpt": "for they were the first of all the Hellenes about whom we know who went to attack the enemy at a run, and they were the first also who endured to face the Median garments and the men who wore them, whereas up to this time the very name of the Medes was to the Hellenes a terror to hear.",
        "source": "Lexundria (Herodotus, trans. G. C. Macaulay)",
        "href": "https://lexundria.com/hdt/6.112/mcly"
      },
      {
        "category": "historical",
        "title": "Inscription of the Battle of Kadesh, Ramesses II (c. 1274 BCE) — an Egyptian leader charging alone when his own had fled, as Salah shouldered a whole nation under pressure",
        "excerpt": "I charged all countries, while I was alone, my infantry and my chariotry having forsaken me. Not one among them stood to turn about.",
        "source": "Internet Archive — Breasted, Ancient Records of Egypt, Vol. III (1906)",
        "href": "https://archive.org/stream/ancientrecordsof03brea/ancientrecordsof03brea_djvu.txt"
      },
      {
        "category": "literary",
        "title": "David and Goliath (1 Samuel 17), King James Bible (1611) — the audacious underdog felling the giant with one decisive stroke, mirroring Salah's cheeky Panenka",
        "excerpt": "And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth.",
        "source": "Wikisource (King James Bible)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "Olympian Ode 1, Pindar (476 BCE) — the victory ode immortalizing a single champion's triumph carried home in glory to his people",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth.",
        "source": "Perseus Digital Library (trans. Diane Arnson Svarlien)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1"
      },
      {
        "category": "artistic",
        "title": "The Narmer Palette, ancient Egyptian (c. 3100 BCE) — the earliest monument to a first-ever national triumph, its ruler standing victorious over the fallen foe",
        "excerpt": "Carved in green siltstone more than five thousand years ago, the palette shows King Narmer, the tall white crown on his head, raising a mace to strike down a kneeling enemy. Rows of bound and fallen foes and paired long-necked beasts frame the scene, celebrating one leader who bound Upper and Lower Egypt into a single people. It is Egypt's oldest image of a nation carried, by one man, into an unprecedented new era.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Narmer_Palette.jpg",
        "image": {
          "src": "/covers/egypt-australia-world-cup-shootout--art.png",
          "alt": "The Narmer Palette showing an Egyptian king triumphant over a fallen enemy — the first unification of a nation, echoing Egypt's first-ever World Cup breakthrough",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Triumphal March (Gloria all'Egitto) from Aida, Giuseppe Verdi (1871) — Egypt's grand victory anthem for a hero's homecoming triumph",
        "excerpt": "As Act II opens, blazing trumpets in a bright key of victory herald the return of Egypt's conquering hero, and the chorus thunders its hymn of glory to the nation. The march swells with pageantry — massed brass, jubilant rhythms, and a roaring crowd hailing their champion. Verdi's music captures exactly the ecstasy of a people greeting an unprecedented, hard-won triumph.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/A%C3%AFda_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 34
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
        "excerpt": "One gun was fired first; then others in succession and with deliberation, till ten or a dozen guns were fired.",
        "source": "Digital History (University of Houston)",
        "href": "https://www.digitalhistory.uh.edu/active_learning/explorations/revolution/account2.cfm"
      },
      {
        "category": "historical",
        "title": "A Concise History of the Great Trial of the Chicago Anarchists in 1886, Dyer D. Lum (1886) — a bomb turns a crowded market square into a scene of instant death, a marketplace turned deadly",
        "excerpt": "It rose about twenty feet in the air, describing a curve, and fell right in the middle of the street and among the marching police. It gave a red glare while in the air. The bomb lay on the ground for a few seconds, then a loud explosion occurred, and the crowd took to their heels, scattering in all directions.",
        "source": "Internet Archive",
        "href": "https://archive.org/stream/ldpd_14875839_000/ldpd_14875839_000_djvu.txt"
      },
      {
        "category": "literary",
        "title": "When Lilacs Last in the Dooryard Bloom'd, Walt Whitman (1865) — a nation's recurring public mourning for a life cut down by sudden violence",
        "excerpt": "When lilacs last in the dooryard bloom'd, / And the great star early droop'd in the western sky in the night, / I mourn'd, and yet shall mourn with ever-returning spring. / Ever-returning spring, trinity sure to me you bring, / Lilac blooming perennial and drooping star in the west, / And thought of him I love.",
        "source": "American Literature",
        "href": "https://americanliterature.com/author/walt-whitman/poem/when-lilacs-last-in-the-dooryard-bloomd"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations 1:1, King James Bible (1611) — grief over a once-thronged place left desolate, the fragility of civic peace",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow!",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "The Third of May 1808, Francisco de Goya (1814) — anonymous civilians gunned down without warning, ordinary life shattered by sudden lethal violence",
        "excerpt": "Goya's oil painting confronts the viewer with faceless soldiers leveling their muskets at unarmed townspeople in the dark. A man in a white shirt throws his arms wide in terror as the dead already lie bloodied at his feet. The canvas turns anonymous slaughter into an enduring image of innocent life extinguished in an instant.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/dearborn-fairlane-mall-shooting--art.png",
          "alt": "Goya's The Third of May 1808, showing a firing squad executing unarmed civilians, evoking sudden lethal violence against ordinary people",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Requiem in D minor, K.626, Wolfgang Amadeus Mozart (1791) — the music of mourning, a mass for the dead answering senseless loss",
        "excerpt": "Mozart's unfinished funeral mass gathers grief into sound, its pleading Requiem aeternam and thundering Dies irae voicing both sorrow and dread. The work has become a universal soundtrack for public mourning after violent death. It transforms private loss into a collective rite of remembrance.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 35
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
        "excerpt": "The Thracians bursting into Mycalessus sacked the houses and temples, and butchered the inhabitants, sparing neither youth nor age, but killing all they fell in with, one after the other, children and women... they attacked a boys' school, the largest that there was in the place, into which the children had just gone, and massacred them all.",
        "source": "The Internet Classics Archive (MIT)",
        "href": "https://classics.mit.edu/Thucydides/pelopwar.7.seventh.html"
      },
      {
        "category": "historical",
        "title": "The Wars of the Jews (Siege of Jerusalem, AD 70), Flavius Josephus (c. AD 75) — an eyewitness account of a besieged city's streets choked with the dead, echoing the UN's warning of catastrophe in El-Obeid",
        "excerpt": "The ground did no where appear visible, for the dead bodies that lay on it; but the soldiers went over heaps of those bodies, as they ran upon such as fled from them.",
        "source": "LacusCurtius (University of Chicago)",
        "href": "https://penelope.uchicago.edu/josephus/war-6.html"
      },
      {
        "category": "literary",
        "title": "Aeneid, Virgil, Book II (19 BC) — Aeneas watches Troy burn and its people slaughtered by night, the archetype of a populous city destroyed in war",
        "excerpt": "An ancient and imperial city falls: / The streets are fill'd with frequent funerals; / Houses and holy temples float in blood.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations (King James Version, 1611) — a lament over a stormed and starving Jerusalem, its dead of every age strewn in the streets, as in bombarded El-Obeid",
        "excerpt": "The young and the old lie on the ground in the streets: my virgins and my young men are fallen by the sword; thou hast slain them in the day of thine anger; thou hast killed, and not pitied.",
        "source": "Wikisource (King James Bible)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "Pillage and Burning of a Village, Jacques Callot (1633) — plate 7 of 'Les Grandes Misères de la guerre,' among the first anti-war images, showing soldiers torching a village and cutting down its inhabitants",
        "excerpt": "Callot's small, densely detailed etching shows armed men swarming a village as its houses go up in flames. In the foreground inhabitants are beaten, stabbed, and dragged from their homes while smoke boils over the rooftops. The scene distills war's indiscriminate cruelty toward a defenseless civilian community, the same horror now visited from the sky on El-Obeid.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Les_mis%C3%A8res_et_les_malheurs_de_la_guerre_-_07_-_Pillage_et_incendie_d%27un_village.png",
        "image": {
          "src": "/covers/sudan-el-obeid-rsf-drone-strikes--art.png",
          "alt": "Jacques Callot's 1633 etching 'Pillage and Burning of a Village': soldiers loot and set fire to a village and kill its inhabitants, mirroring the bombardment of civilians in El-Obeid",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Estragos de la guerra (Ravages of War), Francisco Goya (c. 1810–15, pub. 1863) — plate 30 of 'Los Desastres de la Guerra,' civilians killed in an instant inside their own home by an explosion",
        "excerpt": "Goya depicts a home collapsing under the blast of a bombardment, its ceiling and walls torn open. A mother and infant, a fallen man, and ordinary household objects are hurled together amid the rubble. The image captures the sudden annihilation of domestic life by a weapon striking from without, the very fate of families killed by drone strikes on a crowded city.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Plate_30_from_%27The_Disasters_of_War%27_(Los_Desastres_de_la_Guerra)-_%27_Ravages_of_War%27_(Estragos_de_la_guerra)_MET_DP817374.jpg"
      }
    ],
    "rank": 36
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
        "excerpt": "It is quite certain that the operations of the Automaton are regulated by mind, and by nothing else.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Maelzel%27s_Chess-Player"
      },
      {
        "category": "historical",
        "title": "'Oates, Titus' in the Dictionary of National Biography (1885–1900) — the accuser whose sensational plot collapsed into perjury, and who was disgraced, pilloried and whipped for his lies",
        "excerpt": "The prisoner was found guilty upon both indictments, and nine days later Jeffreys deputed Sir Francis Wythens to pronounce sentence.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Dictionary_of_National_Biography,_1885-1900/Oates,_Titus"
      },
      {
        "category": "literary",
        "title": "Othello, William Shakespeare (1603) — Iago's whispered, unfounded slander topples a great man, though 'good name' is 'the immediate jewel' of the soul",
        "excerpt": "Good name in man and woman, dear my lord, / Is the immediate jewel of their souls. / Who steals my purse steals trash.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1531/1531-h/1531-h.htm"
      },
      {
        "category": "literary",
        "title": "The Game and Playe of the Chesse, William Caxton (1474) — the medieval 'game of kings' cast as a mirror of wisdom, virtue and just rule",
        "excerpt": "It is a werke of ryght special recomendacion to enforme and to late vnderstonde wysedom and vertue",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/10672/10672-h/10672-h.htm"
      },
      {
        "category": "artistic",
        "title": "Die Schachspieler (The Chess Players), Moritz Retzsch (1831) — a man gambles his soul in a chess match against the Devil, a master poised on the edge of ruin",
        "excerpt": "A young man leans over a chessboard set upon a tomb, locked in a match against a leering Devil who plays for his soul while his guardian angel looks on. The black pieces are carved as the vices—Pride, Deceit, Envy—that will undo him. It is the picture of a player brought to the brink of disgrace by a single, fateful game.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Die_Schachspieler_-_Les_joueurs_d%27%C3%A9checs_-_The_Chess_Players.jpg",
        "image": {
          "src": "/covers/chess-federation-suspends-former-champion--art.png",
          "alt": "Retzsch's Die Schachspieler: a man playing chess with the Devil for his soul, mirroring a chess master brought low",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Otello, Giuseppe Verdi and Arrigo Boito (1887) — Iago's 'Credo,' the aria of a man who makes lying and false accusation his creed",
        "excerpt": "Credo in un Dio crudel che m'ha creato / simile a sè e che nell'ira io nomo.",
        "source": "Wikisource",
        "href": "https://it.wikisource.org/wiki/Otello_(Boito)/Atto_secondo/Scena_seconda"
      }
    ],
    "rank": 37
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
        "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often; nor did any human art succeed any better.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "History of the Wars (Plague of Justinian), Procopius (c. 550 CE) — a pestilence that respected no border, mirroring warnings that DRC cases are still climbing",
        "excerpt": "it embraced the entire world, and blighted the lives of all men, though differing from one another in the most marked degree, respecting neither sex nor age.",
        "source": "Fordham Medieval Sourcebook",
        "href": "https://sourcebooks.fordham.edu/source/542procopius-plague.asp"
      },
      {
        "category": "literary",
        "title": "The Decameron (Introduction), Giovanni Boccaccio (1353) — medicine helpless before contagion, echoing the scramble for treatment in Congo",
        "excerpt": "To the cure of these maladies nor counsel of physician nor virtue of any medicine appeared to avail or profit aught",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm"
      },
      {
        "category": "literary",
        "title": "A Journal of the Plague Year, Daniel Defoe (1722) — mounting death bills that undercount the true toll, as Africa CDC warns cases keep rising",
        "excerpt": "The second week in June, the parish of St Giles, where still the weight of the infection lay, buried 120, whereof though the bills said but sixty-eight of the plague, everybody said there had been 100 at least",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Plague of Ashdod, Nicolas Poussin (1630–1631) — a city convulsed by contagion, its dead and dying strewn through the streets like a society under siege",
        "excerpt": "Poussin stages a stricken city where the plague-dead sprawl across the foreground and survivors recoil, pinching their noses against the pestilential air. Panic radiates outward as figures flee and mothers collapse over infants, dramatizing a whole community overwhelmed by an unstoppable epidemic. The scene captures exactly the fear behind a $319 million emergency response: contagion outpacing any human effort to contain it.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_plague_of_ashdod_1630.jpg",
        "image": {
          "src": "/covers/congo-ebola-outbreak-worst-ever--art.png",
          "alt": "Nicolas Poussin's The Plague of Ashdod, showing a city overwhelmed by epidemic dead and dying, paralleling the Congo Ebola outbreak",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Danse macabre, Op. 40, Camille Saint-Saëns (1874) — the old dance of death set to music, evoking pestilence sweeping indiscriminately through the living",
        "excerpt": "Saint-Saëns' tone poem summons Death as a fiddler leading skeletons in a whirling nocturnal dance, a xylophone rattling like dry bones over a feverish waltz. Rooted in the medieval plague-era imagery of the danse macabre, it renders mortality as a force that gathers rich and poor alike into its rhythm. The relentless, accelerating figure resonates with an outbreak Africa CDC fears may be its worst ever, still gathering victims.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
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
