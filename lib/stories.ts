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
    "slug": "khamenei-laid-to-rest-iran-us-strikes",
    "headline": "Iran buries Ayatollah Khamenei as US and Iranian forces trade fresh strikes across the Middle East",
    "overview": "A bitterly divided Iran laid its late Supreme Leader Ayatollah Ali Khamenei to rest on July 10, 2026, even as Tehran said it had struck US military targets in the Gulf and US Central Command reported hitting some 90 Iranian sites in the latest round of fighting. Iran's health ministry said 14 people had been killed since Tuesday, and the escalating exchanges have cast doubt on a fragile ceasefire effort.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPWEs0dENjNEJ4M2hrN3hRSDVMdUxHZHpOSGtpTHl6S1lOa0RJVnhQNFdVUG5ZYVZDRV83c3ZuM3F4OHF5ekJlaVpERHF4aUp0azQwWnRMa3RIWGNrcFlSUEZhVHZsUW84ZFZYMXU0V2dSbkxrWHVKaDFpampmbHFCSFAxQ1QwSlNlSUZUUjJLSy1hSlJBbHNSY2ZiYkFkQ2RQUzgxYXRB?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxOU0l1cEJNcjlUQjVYcXFjUVViTThKdnVqSGJMTUpEM2Jqem5HUGJyN1VvcEtyQUdrUnFBYWFhNXB3aEFUX2RmRHhCbXJxQ1JhX1Y1RXVyZUp3TXFlY1RFRXpLMWxHQnlQa3Q2OU1wekRWOEY4dGVzNVhQMnhYd1gyVEM0c080bUdGY01KNGJ2RW05MnlQMER1Q21EeUNfME1TVTh2aFk3TFZqMnpnOFowUzhmMWpXdUVHTmJtaXE1VkU?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/khamenei-laid-to-rest-iran-us-strikes.png",
      "alt": "Mourners in black fill a vast public square in Tehran for a state funeral procession, portraits and banners raised above the crowd under a hazy sky.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The funeral of Julius Caesar and the fury it unleashed (44 BC)",
        "excerpt": "When Piso brought Caesar's body into the forum a countless multitude ran together with arms to guard it, and with acclamations and magnificent pageantry placed it on the rostra. Wailing and lamentation were renewed for a long time, the armed men clashed their shields, and gradually they began to repent themselves of the amnesty... The people could no longer bear the pitiful sight presented to them. They groaned, and, girding up their loins, they burned the senate-chamber where Caesar was slain, and ran hither and thither searching for the murderers, who had fled some time previously.",
        "source": "Appian, The Civil Wars, Book 2 (trans. Horace White, 1899), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0232:book%3D2:chapter%3D20"
      },
      {
        "category": "historical",
        "title": "A nation in mourning at Lincoln's death, April 1865",
        "excerpt": "On the Avenue in front of the White House were several hundred colored people, mostly women and children, weeping and wailing their loss. This crowd did not appear to diminish through the whole of that cold, wet day; they seemed not to know what was to be their fate since their great benefactor was dead, and their hopeless grief affected me more than almost anything else.",
        "source": "Diary of Gideon Welles, Secretary of the Navy under Lincoln and Johnson, entry of April 15, 1865 (Boston: Houghton Mifflin, 1911), vol. II",
        "href": "https://archive.org/details/diaryofgideonwel02well"
      },
      {
        "category": "literary",
        "title": "The mourning and funeral of Hector in Homer's Iliad",
        "excerpt": "Foremost among them all Andromache led their wailing as she clasped the head of mighty Hector in her embrace. “Husband,” she cried, “you have died young, and leave me in your house a widow... Ere he can do so our city will be razed and overthrown, for you who watched over it are no more—you who were its saviour, the guardian of our wives and children...” ... When they had heaped up the barrow they went back again into the city, and being well assembled they held high feast in the house of Priam their king. Thus, then, did they celebrate the funeral of Hector tamer of horses.",
        "source": "Homer, The Iliad, Book XXIV, trans. Samuel Butler (1898), Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/2199"
      },
      {
        "category": "literary",
        "title": "David's lament for Saul and Jonathan, \"How are the mighty fallen\" (2 Samuel 1)",
        "excerpt": "The beauty of Israel is slain upon thy high places: how are the mighty fallen! Tell it not in Gath, publish it not in the streets of Askelon; lest the daughters of the Philistines rejoice, lest the daughters of the uncircumcised triumph... Saul and Jonathan were lovely and pleasant in their lives, and in their death they were not divided: they were swifter than eagles, they were stronger than lions... How are the mighty fallen in the midst of the battle! O Jonathan, thou wast slain in thine high places... How are the mighty fallen, and the weapons of war perished!",
        "source": "The Holy Bible, King James Version, 2 Samuel 1:19–27, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/2_Samuel"
      },
      {
        "category": "artistic",
        "title": "Beethoven's \"Eroica\" Symphony, Marcia funebre (musical)",
        "excerpt": "The second movement of Beethoven's Third Symphony is a vast C-minor funeral march—slow, tolling and grief-stricken—conceived for the obsequies of a fallen hero. Its heavy tread, muffled drum-like basses and anguished fugal climaxes became Europe's archetypal music of public mourning for a departed leader. Born of the composer's shattered hopes for a great liberator, the march has sounded at state funerals ever since, sanctifying the death of the powerful.",
        "source": "Ludwig van Beethoven, Symphony No. 3 in E-flat major (\"Eroica\"), Op. 55, II. Marcia funebre — IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Death of Marat (visual artwork)",
        "excerpt": "David painted the murdered revolutionary leader Jean-Paul Marat slumped in his bath moments after his assassination in July 1793, pen still in hand, the fatal wound and bloodied water rendered with unflinching clarity. Bathed in a stark, almost sacred light against a bare dark ground, the picture transforms a slain political figure into a secular martyr and object of veneration. Unveiled to a grieving, war-torn Revolutionary France, it fused mourning with propaganda, exalting the fallen leader even as factional violence and reprisals raged.",
        "source": "Jacques-Louis David, The Death of Marat (1793), Royal Museums of Fine Arts of Belgium, Brussels; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Death_of_Marat_by_David.jpg",
        "image": {
          "src": "/covers/khamenei-laid-to-rest-iran-us-strikes--art.png",
          "alt": "Oil painting of the assassinated revolutionary Jean-Paul Marat lying dead in his bathtub, head wrapped in a white cloth, one arm hanging down holding a quill pen, against a dark empty background",
          "credit": "Jacques-Louis David, The Death of Marat, 1793, Royal Museums of Fine Arts of Belgium, Brussels; public domain via Wikimedia Commons"
        }
      }
    ],
    "lead": true,
    "rank": 1
  },
  {
    "slug": "spain-almeria-wildfire-heatwave",
    "headline": "Wildfire kills 12 in Spain's Almería province as a heatwave grips southern Europe",
    "overview": "At least 12 people were killed and six injured by a fast-moving wildfire near Los Gallardos in Spain's southern Almería province, authorities said on July 10, 2026, with several of the dead found in vehicles as they tried to flee the flames. The blaze erupted during a punishing heatwave that has pushed temperatures across southern Europe past 40C, straining firefighting crews from Spain to the Balkans.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c8e2382jk7jo?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxOTUpVM2tZODYyUTJxdnY2OHJnRnAxcnpldm9jY2ZIMzB0Y3lZYzVrQjVKMTJ4N3BOblhWNzZaOWV2QlhkdGJoLWVqdVFoXzhFWGJsU21scFk1amd3WjMxLUY4Vy1ycDgzRGxUX20tTlE1R1ZZdF9wWmRVMzJDMDdUNVotdjAzelc1WnpybW1uVFNPbnpvcWlpS25PWW51QzRvaXllTXlYMl90Ykx6ZzF3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/spain-almeria-wildfire-heatwave.png",
      "alt": "Flames sweeping through a stand of trees under a smoke-darkened sky.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome under Nero (64 AD)",
        "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Cælian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus... Often, while they looked behind them, they were intercepted by flames on their side or in their face. Or if they reached a refuge close at hand, when this too was seized by the fire, they found that, even places, which they had imagined to be remote, were involved in the same calamity.",
        "source": "Tacitus, Annals, Book XV.38 (Church & Brodribb translation), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=15:chapter=38"
      },
      {
        "category": "historical",
        "title": "The Great Fire of London, eyewitnessed by Samuel Pepys (2 September 1666)",
        "excerpt": "Everybody endeavouring to remove their goods, and flinging into the river or bringing them into lighters that layoff; poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another. And among other things, the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.",
        "source": "The Diary of Samuel Pepys, entry for 2 September 1666, Wikisource",
        "href": "https://en.wikisource.org/wiki/Diary_of_Samuel_Pepys/1666/September"
      },
      {
        "category": "literary",
        "title": "The Burning of Troy in Virgil's Aeneid, Book II",
        "excerpt": "The Palace of Deiphobus ascends / In smoaky Flames, and catches on his Friends. / Ucalegon burns next; the Seas are bright / With splendor, not their own; and thine with Trojan light.",
        "source": "Virgil, Aeneid, Book II (John Dryden translation, 1697), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
      },
      {
        "category": "literary",
        "title": "Fire and brimstone upon Sodom and Gomorrah (Genesis 19)",
        "excerpt": "Then the LORD rained upon Sodom and upon Gomorrah brimstone and fire from the LORD out of heaven; And he overthrew those cities, and all the plain, and all the inhabitants of the cities, and that which grew upon the ground. But his wife looked back from behind him, and she became a pillar of salt.",
        "source": "Genesis 19:24–26, King James Bible, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "The Magic Fire Music (Feuerzauber) from Wagner's Die Walküre",
        "excerpt": "At the close of the opera Wotan summons Loge, the god of fire, to ring the sleeping Brünnhilde with a wall of flame. Shimmering strings, harps and woodwind flicker upward like sparks while the brass intones the fire motif, conjuring a landscape wholly given over to blaze — a terrifying yet sublime ring of fire that only a hero dare cross. The full orchestral score is available as a primary-source edition.",
        "source": "Richard Wagner, Die Walküre, WWV 86B, Act III finale — full orchestral score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Walküre,_WWV_86B_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Burning of the Houses of Lords and Commons (1835)",
        "excerpt": "Turner, who witnessed the 1834 blaze from the banks of the Thames, renders the conflagration as a vast wall of incandescent orange and gold erupting into the night sky, its heat dissolving stone architecture into pure light. The flames tower over a churning crowd of tiny onlookers, capturing at once the terror and the sublimity of an uncontrollable fire consuming a great landmark.",
        "source": "J. M. W. Turner, oil on canvas, 1834–35, Cleveland Museum of Art (acc. 1942.647), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_16_October_1834_-_1942.647_-_Cleveland_Museum_of_Art.jpg",
        "image": {
          "src": "/covers/spain-almeria-wildfire-heatwave--art.png",
          "alt": "J. M. W. Turner's painting of the Houses of Parliament engulfed in towering orange flames at night, reflected in the River Thames with crowds watching from Westminster Bridge",
          "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1834–35), Cleveland Museum of Art, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "trump-fires-election-assistance-commission",
    "headline": "Trump fires the remaining members of the US Election Assistance Commission ahead of the midterms",
    "overview": "President Donald Trump dismissed the remaining members of the bipartisan US Election Assistance Commission, the federal agency that helps administer and set standards for national elections, in a move disclosed on July 10, 2026, months before the midterm vote. Voting-rights groups and Democrats warned the purge could disrupt election administration and sow chaos, while the White House framed it as a routine change of leadership.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQMFRlUlhpcnZIaHhYTndHeHVSQXFCNFkyOEItb1hCU1NRRXI2YVNGcklBNllrdG5nYnA4ZWtHRDZQaUFmSVYzZ3JoMndRVnhuY25jQ01GR2lFTHJmUkxGZFhxRVA1U1FtZjJHcGpvd1BFU2JLT3VacXY4Y19kOEVFMHBJWXdHYjNYR3hVSk1CZVBlVWdhSlhHTWdpNDBOWWtBTVl1V1hnMlhGSUVJ?oc=5"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMiigFBVV95cUxQbXhkVzlfaGxqTlFlU3dOVUpZOGZ3ZExJYmkwZWR6d2hhejlzQV9QdW16RlAwVjByaDY2N3FrOW1IRnJBN0JsNGk0eW1CbGhXVzZCVzRneXJUdEZ5LTFNeGYwMjdBY2lLNXIxN09RU1d2aWxzaW9BTm9kcnlPcTN1RkktYUhXd2FXVmc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/trump-fires-election-assistance-commission.png",
      "alt": "A curtained voting booth set up in a US polling place, ready for voters to cast their ballots.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cleomenes III abolishes Sparta's ephors",
        "excerpt": "Cleomenes, when day came, published a list of eighty citizens who must go into exile, and removed all the ephoral chairs except one; in this he purposed to sit himself for the transaction of public business.",
        "source": "Plutarch, Life of Cleomenes 10 (trans. Bernadotte Perrin, Loeb Classical Library)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Cleomenes*.html"
      },
      {
        "category": "historical",
        "title": "The Declaration of Independence indicts a king for dismantling the people's institutions",
        "excerpt": "He has dissolved Representative Houses repeatedly, for opposing with manly firmness his invasions on the rights of the people... He has made Judges dependent on his Will alone, for the tenure of their offices, and the amount and payment of their salaries.",
        "source": "United States Declaration of Independence (1776), U.S. National Archives",
        "href": "https://www.archives.gov/founding-docs/declaration-transcript"
      },
      {
        "category": "literary",
        "title": "Cassius warns of one man bestriding the republic",
        "excerpt": "Why, man, he doth bestride the narrow world / Like a Colossus, and we petty men / Walk under his huge legs, and peep about / To find ourselves dishonourable graves. / Men at some time are masters of their fates: / The fault, dear Brutus, is not in our stars, / But in ourselves, that we are underlings.",
        "source": "William Shakespeare, Julius Caesar, Act I, Scene 2",
        "href": "https://www.gutenberg.org/ebooks/1522"
      },
      {
        "category": "literary",
        "title": "An elected American president dissolves Congress in 'It Can't Happen Here'",
        "excerpt": "Sinclair Lewis imagines a folksy demagogue, Berzelius 'Buzz' Windrip, winning the presidency and then swiftly hollowing out the republic from within. He sidelines Congress and the courts, replaces independent officials with loyal enforcers, and jails critics, all while insisting it is ordinary, patriotic governance. The novel's chill lies in how procedurally the machinery of a free state is captured and turned against the citizens it was built to serve.",
        "source": "Sinclair Lewis, It Can't Happen Here (1935)",
        "href": "https://gutenberg.net.au/ebooks03/0301001h.html"
      },
      {
        "category": "artistic",
        "title": "Beethoven's Egmont Overture: music for a nobleman crushed by an autocrat",
        "excerpt": "Beethoven's incidental music for Goethe's tragedy dramatizes Count Egmont, a defender of his people's liberties, imprisoned and executed on the orders of the tyrannical Duke of Alba. The overture moves from oppressive, weighted chords through mounting struggle to a blazing 'Victory Symphony,' scoring the collision between arbitrary power and the institutions and freedoms it seeks to extinguish.",
        "source": "Ludwig van Beethoven, Egmont, Op. 84 (1810) — full orchestral score, IMSLP",
        "href": "https://imslp.org/wiki/Egmont,_Op.84_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "David's Brutus: the terrible cost of guarding a republic",
        "excerpt": "Jacques-Louis David paints Lucius Junius Brutus, founder of the Roman Republic, sitting rigid in shadow as lictors carry in the bodies of his own sons, whom he condemned to death for conspiring to restore the monarchy. Painted on the eve of the French Revolution, the canvas fixes the anguished tension between private loyalty and the survival of free institutions, between the man who would be king and the guardians who refuse him.",
        "source": "Jacques-Louis David, The Lictors Bring to Brutus the Bodies of His Sons (1789), Musée du Louvre",
        "href": "https://commons.wikimedia.org/wiki/File:David_Brutus.jpg",
        "image": {
          "src": "/covers/trump-fires-election-assistance-commission--art.png",
          "alt": "Jacques-Louis David's 1789 painting: Brutus sits in shadow at left while lictors bear his sons' bodies into his home, his wife and daughters recoiling in grief.",
          "credit": "Jacques-Louis David, 'The Lictors Bring to Brutus the Bodies of His Sons' (1789), Musée du Louvre. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "illinois-assault-weapons-ban-upheld",
    "headline": "US appeals court upholds Illinois' ban on assault weapons and high-capacity magazines",
    "overview": "A federal appeals court on July 10, 2026 upheld Illinois' ban on semiautomatic assault weapons and high-capacity magazines, overturning a lower-court ruling that had struck the law down. The decision by the 7th US Circuit Court of Appeals landed as the US Supreme Court prepares to weigh similar bans, setting up a broader national test of how far states can restrict such firearms.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQS29GYWdZVGh5RHE0MWVvRlpfTXh0MGhsVS0xb1JHU0NkQUFuUkpRQWxuR2x6M1kwTTAxTjhOQXlDZGlqNEcxTE5ONEk0dVFfcU1UckpoZ0ZBNjRiZF9wOEdYWnRxRWpabS1VWXZVMWYyc1VSNEE3cndLMnpubFU5bGdxeDgxX05nbXYtS1pwZks3ZTRkYVpSRzlXazE0aHFxU0FjNlRqUFp5TFlFUjlBR19fa3JHT0k?oc=5"
      },
      {
        "name": "Capitol News Illinois",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNclZjNkpFWmlBLXBxcmtwZkh5WWN1LUhXWnAtNTZWRWswV1V6WEJsZFpSVWh5cW5HWEtMY0xXbkxKSlY2U19UMWRlRFdFcnRHU2lXREI5Qll2eXN0VzluOEZDd3BnWkZSWGpaQmx6YTVRVkJhR1VBNUpqcm12UjRFajh0NWJWdHN0Qjd5VlpyWjNyUjVTcWRUZVcwZ3FuUEtIN2RGR2o2NS1BODZlcnZPRVUxV2JNQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/illinois-assault-weapons-ban-upheld.png",
      "alt": "The modern glass-and-steel facade of the Dirksen United States Courthouse in downtown Chicago.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Athenians the first to lay aside their arms",
        "excerpt": "The whole of Hellas used once to carry arms, their habitations being unprotected and their communication with each other unsafe... The Athenians were the first to lay aside their weapons, and to adopt an easier and more luxurious mode of life.",
        "source": "Thucydides, History of the Peloponnesian War, Book 1.6 (Crawley translation)",
        "href": "http://classics.mit.edu/Thucydides/pelopwar.1.first.html"
      },
      {
        "category": "historical",
        "title": "The right to arms, 'as allowed by law'",
        "excerpt": "That the subjects which are Protestants may have arms for their defence suitable to their conditions and as allowed by law.",
        "source": "English Bill of Rights, 1689 (Avalon Project, Yale Law School)",
        "href": "https://avalon.law.yale.edu/17th_century/england.asp"
      },
      {
        "category": "literary",
        "title": "The Discourse on Arms and Letters",
        "excerpt": "that without them laws can not be maintained, for by arms states are defended, kingdoms preserved, cities protected, roads made safe, seas cleared of pirates",
        "source": "Miguel de Cervantes, Don Quixote, Vol. 1, Ch. 38 (Ormsby translation)",
        "href": "https://en.wikisource.org/wiki/Don_Quixote_(Cervantes/Ormsby)/Volume_1/Chapter_38"
      },
      {
        "category": "literary",
        "title": "The Arsenal at Springfield",
        "excerpt": "Were half the power, that fills the world with terror, / Were half the wealth, bestowed on camps and courts, / Given to redeem the human mind from error, / There were no need of arsenals nor forts:",
        "source": "Henry Wadsworth Longfellow, 'The Arsenal at Springfield' (1845)",
        "href": "https://en.wikisource.org/wiki/The_Belfry_of_Bruges_and_Other_Poems/The_Arsenal_at_Springfield"
      },
      {
        "category": "artistic",
        "title": "Missa in tempore belli (Mass in Time of War), Hob.XXII:9",
        "excerpt": "Agnus Dei, qui tollis peccata mundi: dona nobis pacem. — the closing plea for peace set by Haydn in 1796, as Austria mobilized for war, its timpani rolls earning the mass its nickname 'Paukenmesse.'",
        "source": "Joseph Haydn (1796); first edition full score, Breitkopf und Härtel, via IMSLP",
        "href": "https://imslp.org/wiki/Mass_in_C_major,_Hob.XXII:9_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "The Peaceable Kingdom",
        "excerpt": "Hicks paints Isaiah's prophecy of peace: wolf and lamb, leopard and kid, lion and ox lie down together while a child leads them, and beyond them Penn's settlers and the Lenape conclude a peaceful treaty — a vision of a world that has laid down its weapons.",
        "source": "Edward Hicks, 'The Peaceable Kingdom,' c. 1834, National Gallery of Art, Washington",
        "href": "https://commons.wikimedia.org/wiki/File:Edward_Hicks_-_Peaceable_Kingdom.jpg",
        "image": {
          "src": "/covers/illinois-assault-weapons-ban-upheld--art.png",
          "alt": "Oil painting of wild and domestic animals — lion, leopard, wolf, lamb, ox and small children — resting together peaceably in a wooded landscape, with figures making a treaty by a river in the background.",
          "credit": "Edward Hicks, The Peaceable Kingdom, c. 1834, oil on canvas, National Gallery of Art, Washington (Gift of Edgar William and Bernice Chrysler Garbisch). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "white-house-ufc-attack-plot-indictment",
    "headline": "US grand jury indicts eight men over an alleged drone-and-sniper plot to attack a White House UFC event",
    "overview": "A federal grand jury indicted eight men over an alleged plot to attack a planned UFC mixed-martial-arts event at the White House using drones and snipers, the Justice Department said on July 10, 2026. Prosecutors described a coordinated conspiracy targeting the high-profile cage-fighting card that President Trump had promoted for the White House grounds.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxPd3gyRHhkcUM1N3Bxck44OS1QcjByNUppZVNzekxESVFlNUJsOXg5ZExZZWl5Umtvd2NKaTRKMGxKU1p1S3VnMlVCNGdKbUxTV05UdUlJUWhta0Q1cnJockd4MTFFTWF3cVpHRVNZSzB1czRTaGI4dWdSSnJQOW55UGJTWGoxY2ZYemZycVlWUQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxNOTJzNGgwYmw2MEk4X21JSVJtRXZDNmoxZ3lwMTI3b2tRT3VfVGZMOTVyT2xndkZ1YUJFdjh2T3Y1a2hJZlp4eFc1R3RzZ1p5WHRLWEstVXo3eEN0b2NGdXN6ZFY5dWJjV1F0ODZtc0dsMldud1pGUDlILVpwNjFsMUVHR25sYXVBNGpKMl9BTmVSQndhbEZHTnFtQWRFaE1IRnVBMkhDR0hBTW9QWDA4R1U3amh0a1pxeElmeFlrRmkzcE5lUUpYZDRvU1E?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/white-house-ufc-attack-plot-indictment.png",
      "alt": "A small quadcopter drone silhouetted against a dusk sky above a security fence, with floodlit government rooftops in the distance.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero exposes the Catiline conspiracy",
        "excerpt": "Quo usque tandem abutere, Catilina, patientia nostra? quam diu etiam furor iste tuus nos eludet?",
        "source": "Cicero, Oratio in Catilinam Prima (63 BC)",
        "href": "https://www.thelatinlibrary.com/cicero/cat1.shtml"
      },
      {
        "category": "historical",
        "title": "The Monteagle letter foils the Gunpowder Plot",
        "excerpt": "My lord, out of the love I beare to some of youere frends, I have a care of youre preservacion, therefore I would aduyse you as you tender your life to devise some excuse to shift youer attendance at this parliament... yet I saye they shall receive a terrible blow this parliament and yet they shall not seie who hurts them.",
        "source": "Anonymous warning letter to Lord Monteagle, 1605 (The National Archives, SP 14/216/2)",
        "href": "https://www.nationalarchives.gov.uk/explore-the-collection/stories/the-monteagle-letter/"
      },
      {
        "category": "literary",
        "title": "Artemidorus's warning to Caesar",
        "excerpt": "Caesar, beware of Brutus; take heed of Cassius; come not near Casca; have an eye to Cinna, trust not Trebonius: mark well Metellus Cimber: Decius Brutus loves thee not: thou hast wronged Caius Ligarius. There is but one mind in all these men, and it is bent against Caesar. If thou beest not immortal, look about you: security gives way to conspiracy.",
        "source": "Shakespeare, Julius Caesar, Act 2, Scene 3",
        "href": "https://shakespeare.mit.edu/julius_caesar/julius_caesar.2.3.html"
      },
      {
        "category": "literary",
        "title": "A bomb outrage plotted against Greenwich",
        "excerpt": "The whole civilised world has heard of Greenwich. The very boot-blacks in the basement of Charing Cross Station know something of it.",
        "source": "Joseph Conrad, The Secret Agent, Chapter 2 (1907)",
        "href": "https://en.wikisource.org/wiki/The_Secret_Agent/Chapter_2"
      },
      {
        "category": "artistic",
        "title": "Un ballo in maschera: an assassination at the ball",
        "excerpt": "Verdi's opera turns a real regicide into spectacle: conspirators draw lots and stalk their ruler through a glittering masked ball, blades hidden beneath festive costume. The plot to strike amid public revelry, and the doomed effort to warn the victim, mirrors an ambush staged around a crowd's entertainment.",
        "source": "Giuseppe Verdi, Un ballo in maschera, full score (Ricordi, 1914)",
        "href": "https://imslp.org/wiki/Un_ballo_in_maschera_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "The exposed faces of the Gunpowder plotters",
        "excerpt": "A contemporary engraving lines up the conspirators shoulder to shoulder, hats and cloaks huddled in conference, their names inscribed above each head. Printed for a shocked European public once the plot was uncovered, it fixes the image of the exposed conspirator: the secret cabal dragged into daylight and named.",
        "source": "Crispijn van de Passe the Elder, The Gunpowder Plot Conspirators, c.1605 (Wikimedia Commons / National Portrait Gallery)",
        "href": "https://commons.wikimedia.org/wiki/File:Gunpowder_Plot_conspirators.jpg",
        "image": {
          "src": "/covers/white-house-ufc-attack-plot-indictment--art.png",
          "alt": "Engraving of the eight Gunpowder Plot conspirators standing in a group, wearing cloaks and hats, with their names inscribed in Latin above each figure",
          "credit": "Crispijn van de Passe the Elder, c.1605; National Portrait Gallery, London (public domain, via Wikimedia Commons)"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "china-ballistic-missile-us-message",
    "headline": "China's Pacific ballistic-missile launch draws US condemnation as a message to Washington",
    "overview": "China carried out a ballistic-missile launch into the Pacific that the United States condemned as irresponsible, with analysts and officials reading the test on July 10, 2026 as a deliberate message to Washington amid rising tensions. Taiwan said its radar tracked the launch, and the US State Department called the demonstration a provocation.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxQLVQ5Vk1TZlNBeWtGa2lkM0Vkc2dGMWpSMW5ib0U5b0o3ZGd6a0ZjOEtpOGJFUEF1Y0RVTnRVNndhWjhfRGptdGhmVzZvcjFsUW1JSHM5aDMzLU1OMTdfaGZCNzJYQVVQaEgwXzNBWjRWVWQwejNmTC1pa0s0VHJOd18wRW1OeGxIc2o5cXNmUXNLOHUzSVJZdXZFOUlDajNIeVFPZ1ZpbVV3MWM?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQR3I3VERYUVdJRWhaNVVFcklJQTByTTIzV1lwLUlLMXpvUkdfVGZ3eE00Q3hrUGh5dVpkS2xHNnRXYWY0WjA3S2NOaUxOTnN6SVZrcnh4YU8wY0hWOWE1V1I4QUFjY2RJX3BKNzdlb3ZNZm5kZFhUb3UzZzU5Ukg0bDc3b20zSkgtZkw5bzVqUVdWVHlyWmVTWWp2QW40NHJiWXZoMGgtVTVDbTJqWXpYYWxGbWo1d2dmZkhv?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/china-ballistic-missile-us-message.png",
      "alt": "A ballistic missile lifting off on a bright plume of exhaust, trailing smoke into a pale sky.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Xerxes reviews his host at Abydos",
        "excerpt": "Arrived here, Xerxes wished to look upon all his host; so as there was a throne of white marble upon a hill near the city, which they of Abydos had prepared beforehand, by the king's bidding, for his especial use, Xerxes took his seat on it, and, gazing thence upon the shore below, beheld at one view all his land forces and all his ships.",
        "source": "Herodotus, Histories, Book VII (Rawlinson trans.)",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7"
      },
      {
        "category": "historical",
        "title": "Kennedy announces the Soviet missiles in Cuba",
        "excerpt": "Within the past week, unmistakable evidence has established the fact that a series of offensive missile sites is now in preparation on that imprisoned island. The purpose of these bases can be none other than to provide a nuclear strike capability against the Western Hemisphere.",
        "source": "President John F. Kennedy, Radio and Television Report on the Soviet Arms Build-up in Cuba, Oct. 22, 1962 (U.S. National Archives)",
        "href": "https://catalog.archives.gov/id/193899"
      },
      {
        "category": "literary",
        "title": "Achilles' terrifying war-cry at the trench",
        "excerpt": "There did he stand and shout aloud. Minerva also raised her voice from afar, and spread terror unspeakable among the Trojans. Ringing as the note of a trumpet that sounds alarm then the foe is at the gates of a city, even so brazen was the voice of the son of Aeacus, and when the Trojans heard its clarion tones they were dismayed.",
        "source": "Homer, The Iliad, Book XVIII (Butler trans.)",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XVIII"
      },
      {
        "category": "literary",
        "title": "The rebel angels unveil their cannon in Heaven",
        "excerpt": "From those deep throated Engins belcht, whose roar / Emboweld with outragious noise the Air, / And all her entrails tore, disgorging foule / Thir devilish glut, chaind Thunderbolts and Hail / Of Iron Globes",
        "source": "John Milton, Paradise Lost, Book VI (Dartmouth Milton Reading Room)",
        "href": "https://milton.host.dartmouth.edu/reading_room/pl/book_6/text.shtml"
      },
      {
        "category": "artistic",
        "title": "1812 Overture (Festival Overture, Op. 49)",
        "excerpt": "Tchaikovsky's festival overture scores live cannon fire and pealing bells into the orchestra, staging a battle as music: the roar of artillery becomes a public spectacle of triumph and might, a martial demonstration performed for an audience rather than an enemy.",
        "source": "Pyotr Ilyich Tchaikovsky, full orchestral score (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "The Apotheosis of War",
        "excerpt": "Vereshchagin paints a pyramid of human skulls rising alone on a scorched plain before a ruined city, circled by crows. Dedicated 'to all conquerors, past, present and to come,' it turns the trophy of martial power into an indictment, showing where displays of force and the boasting of arms finally lead.",
        "source": "Vasily Vereshchagin, oil on canvas, 1871, Tretyakov Gallery (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Vasily_Vereshchagin_-_%D0%90%D0%BF%D0%BE%D1%84%D0%B5%D0%BE%D0%B7_%D0%B2%D0%BE%D0%B9%D0%BD%D1%8B_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/china-ballistic-missile-us-message--art.png",
          "alt": "A pyramid of human skulls on a barren plain before a ruined city, with crows circling and perched among them",
          "credit": "Vasily Vereshchagin, The Apotheosis of War (1871), Tretyakov Gallery; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "japan-wholesale-inflation-three-year-high",
    "headline": "Japan's wholesale inflation climbs to a three-year high on fuel costs and a weak yen",
    "overview": "Japan's wholesale, or producer, prices rose at their fastest pace in three years in June, data released on July 10, 2026 showed, driven higher by surging fuel costs and a persistently weak yen amid Middle East supply fears. The reading intensifies pressure on the Bank of Japan as it weighs how quickly to keep raising interest rates without choking off a fragile recovery.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxOVEstY3lWMk9KNHhEd3FYem8zOVI4OGd4MVFuN3JGTWdSeGFTQjRUeXdqMnkxMGVIYk85Rm9fT0oxMmFfbjU5bVEyeG1JdWFzZVhJMzNEWWdSWlFrR0FVSWJmVE84eHBiWVc1cmFPTWpEYUQxSV9rOV9lRFVxY0ZXNk93ckxiQTIyM2EtUXNReUNWV3U4Sk5ic2p4b1FzM2RJLV9NU210NmhZMUtzT29Sb29NQUtBa3l0TGc?oc=5"
      },
      {
        "name": "Firstpost",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxOTmZaZ0E5amF6a1hEbEdNcTd4MUVaRFJ4bHpXeHoxbGpudzZzanlsSjNDTnVDWGItMzBOYjk5TGZHY1ZZUC02akZjdUI3NkJ0c241UmdnRUNjNTNJb1JhMGt0VlladUlKUEpQUndGczZZcFZjdDl1ZDJ5XzBMbVdGOUdzbGpsdUxyOUlKOVZvNW5QdkktcmQzelpnVHNoQVAwS3FMcmlCbUEzVFBuX1dVR0FPX0VreHE4Yjh4eUprRGZ1LWpfS3ZaYUxB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/japan-wholesale-inflation-three-year-high.png",
      "alt": "A fully laden container ship underway at sea, stacked high with steel shipping containers.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Diocletian's price edict and the scarcity it bred",
        "excerpt": "When by various extortions he had made all things exceedingly dear, he attempted by an ordinance to limit their prices. Then much blood was shed for the veriest trifles; men were afraid to expose aught to sale, and the scarcity became more excessive and grievous than ever, until, in the end, the ordinance, after having proved destructive to multitudes, was from mere necessity abrogated.",
        "source": "Lactantius, Of the Manner in Which the Persecutors Died, Chap. VII (Ante-Nicene Fathers, Vol. VII)",
        "href": "https://en.wikisource.org/wiki/Ante-Nicene_Fathers/Volume_VII/Lactantius/Of_the_Manner_in_Which_the_Persecutors_Died/Chap._VII"
      },
      {
        "category": "historical",
        "title": "Copernicus names debasement a scourge of states",
        "excerpt": "Quanquam innumere pestes sunt quibus regna, principatus, et respublice decrescere solent, hæc tamen quatuor (meo judicio) potissime sunt: discordia, mortalitas, terre sterilitas et monete vilitas. [Though countless are the plagues by which kingdoms, principalities and republics decay, these four in my judgment are the gravest: discord, mortality, barren soil, and debasement of the coinage.] Vilescit hec ut plurimum propter nimiam multitudinem. [Money loses value chiefly through excessive quantity.]",
        "source": "Nicolaus Copernicus, Monetae cudendae ratio (Essay on the Coinage of Money, 1526), Latin text",
        "href": "https://www.taieb.net/auteurs/Copernic/monetel.html"
      },
      {
        "category": "literary",
        "title": "Mephistopheles conjures paper money in Faust",
        "excerpt": "A thousand crowns in worth this note doth own. / It to secure, as certain pledge, shall stand / All buried treasure in the Emperor's land.",
        "source": "Goethe, Faust, Part II, Act I ('Pleasure-Garden'), trans. Bayard Taylor",
        "href": "https://en.wikisource.org/wiki/Faust_(trans._Bayard_Taylor)/Act_I/IV"
      },
      {
        "category": "literary",
        "title": "Aristophanes' good coin driven out by base",
        "excerpt": "Often has it crossed my fancy, that the city loves to deal / With the very best and noblest members of her commonweal, / Just as with our ancient coinage, and the newly-minted gold.",
        "source": "Aristophanes, The Frogs, trans. B. B. Rogers (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/7998/7998-h/7998-h.htm"
      },
      {
        "category": "artistic",
        "title": "The lust for gold curses the world in Das Rheingold",
        "excerpt": "Der Welt Erbe gewänne zu eigen, wer aus dem Rheingold schüfe den Ring, der maaßlose Macht ihm verlieh'. [The world's wealth would be won by the man who, out of the Rhinegold, fashioned the ring that measureless might would bestow.]",
        "source": "Richard Wagner, Das Rheingold (WWV 86A), Scene 1; full orchestral score, IMSLP",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "A money-changer weighs gold as his wife looks on",
        "excerpt": "In Quentin Massys' 1514 panel a money-changer bends over his scales, weighing coins, rings and pearls with fixed concentration, while his wife lets her devotional book fall open, her eyes drawn from the Virgin's image to the glinting gold. A convex mirror on the table catches a window, a figure and the world outside, folding the whole marketplace of value into the scene. The painting is an enduring meditation on money, the price of goods and the pull of worldly wealth over the spirit.",
        "source": "Quentin Massys (Metsys), The Moneylender and His Wife, 1514, oil on panel, Musée du Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/japan-wholesale-inflation-three-year-high--art.png",
          "alt": "A money-changer weighing gold coins on a balance while his wife, holding a prayer book, watches; a convex mirror sits on the table before them",
          "credit": "Quentin Massys, The Moneylender and His Wife (1514), Musée du Louvre; public domain via Wikimedia Commons (The Yorck Project)"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "asian-stocks-surge-ai-chips",
    "headline": "Asian stocks surge as investors bet on AI chipmakers and look past Middle East attacks",
    "overview": "Asian equity markets rallied on July 10, 2026, led by semiconductor and AI-linked shares, as investors set aside the escalating conflict in the Middle East and refocused on booming demand for artificial-intelligence hardware. A blockbuster US listing by memory-chip maker SK Hynix helped revive appetite for the AI trade and lifted benchmarks across the region.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMie0FVX3lxTE9PQktWellrNTNYUFdxV3NsVFlBaks1ZVZnUG4yNWhRZW9xdTZwNFhiLUJfcjlXZ2pUMEZHVmdhYXNidEM2QjBuSGlqVWFhT05zV1RwVW5jdFBoeXprQlJhUUFCOG9zcXpfQzNiQl9IVlMwaFdmdXFxOFVnTQ?oc=5"
      },
      {
        "name": "France 24",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPZWF2LWE0U1dwV2JCb2k3VS1tVm1ELWxWMnJPVWdUbklFa2tnclZCamVrdTZldHQzWF9YcUNVUGl3eU1WbXhrUjA1YVlHVUxZaXVnSHgxR3hZWGIwazlDbk82bUJ1XzhjUHo3LW5yX1NNb19VOEdJN25hQXplbHptYmNjOWRiaXBDVGhBMXVqdGNXV2xHdWx4VDUwS09zT2w5b3pCaGRiRGJmVnFhekhr?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/asian-stocks-surge-ai-chips.png",
      "alt": "A large electronic stock board on a Tokyo street displaying share prices, with pedestrians passing below.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Tulipomania",
        "excerpt": "A golden bait hung temptingly out before the people, and one after the other, they rushed to the tulip-marts, like flies around a honey-pot. Every one imagined that the passion for tulips would last for ever, and that the wealthy from every part of the world would send to Holland, and pay whatever prices were asked for them.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions (1841) — \"The Tulipomania\"",
        "href": "https://www.gutenberg.org/cache/epub/24518/pg24518.txt"
      },
      {
        "category": "historical",
        "title": "The South-Sea Bubble",
        "excerpt": "In the mean time, innumerable joint-stock companies started up every where. They soon received the name of Bubbles, the most appropriate that imagination could devise. ... Every evening produced new schemes, and every morning new projects. The highest of the aristocracy were as eager in this hot pursuit of gain as the most plodding jobber in Cornhill.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions (1841) — \"The South-Sea Bubble\"",
        "href": "https://www.gutenberg.org/cache/epub/24518/pg24518.txt"
      },
      {
        "category": "literary",
        "title": "The Alchemist",
        "excerpt": "Come on, sir. Now, you set your foot on shore / In Novo Orbe; here's the rich Peru: / And there within, sir, are the golden mines, / Great Solomon's Ophir!",
        "source": "Ben Jonson, The Alchemist (1610), Act II, Sir Epicure Mammon",
        "href": "https://www.gutenberg.org/cache/epub/4081/pg4081.txt"
      },
      {
        "category": "literary",
        "title": "The Way We Live Now",
        "excerpt": "It seemed that there was but one virtue in the world, commercial enterprise,—and that Melmotte was its prophet.",
        "source": "Anthony Trollope, The Way We Live Now (1875), ch. XLIV",
        "href": "https://www.gutenberg.org/cache/epub/5231/pg5231.txt"
      },
      {
        "category": "artistic",
        "title": "Das Rheingold, WWV 86A",
        "excerpt": "Wagner's music-drama opens in the green depths of the Rhine, where the gleaming Rhinegold sleeps until the dwarf Alberich renounces love to snatch and forge it into a ring of limitless power. The primal lust for the treasure sets a curse in motion that drags gods and mortals alike toward ruin—a mythic parable of what the hunger for gold does to all who chase it.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (1854) — full orchestral score",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Satire on Tulip Mania",
        "excerpt": "Jan Brueghel the Younger dresses tulip speculators as monkeys in Dutch merchants' finery: they haggle over blooms, weigh bulbs on scales, draw up contracts and feast on their paper profits—while, as the bubble bursts, one ape urinates on the now-worthless flowers and another is hauled before a judge for his debts. It is a mordant emblem of euphoria curdling into collapse, folly aping the market to its own ruin.",
        "source": "Jan Brueghel the Younger, Satire on Tulip Mania (c. 1640), Frans Hals Museum, Haarlem",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/asian-stocks-surge-ai-chips--art.png",
          "alt": "Monkeys dressed as Dutch merchants trade, weigh, and feast on tulips while one urinates on the now-worthless flowers and another debtor is dragged before a magistrate",
          "credit": "Jan Brueghel the Younger, Satire on Tulip Mania, c. 1640, Frans Hals Museum, Haarlem. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "france-returns-syrian-antiquities-damascus",
    "headline": "France returns 23 Syrian antiquities as Macron makes a landmark visit to Damascus",
    "overview": "France handed back 23 Syrian antiquities that had been held in French museums for about 15 years as President Emmanuel Macron made a landmark visit to Damascus on July 10, 2026, one of the first by a Western leader since the fall of the Assad government. Macron met Syria's new transitional leadership and signaled a broader French opening toward reconstruction and investment in the country.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPRnU2MWlkck1LVFRQODNZUWhUdVJLdnIzMlJqcU1PeHlGTFJuN0N2UXItZDA4RWxQbTdCYTZ5YjZrMWRPbWZCUVJuOG5uTlY1WGEtamM0WEFqSGNTQl8wUHZFNlNBaURjUkprUXNoRzJXTzJmS1lhUTdua3plc2VBc1FPaldicE9lODNyYWF0emN0V2RNb0ZLU19XNzNiTXdnaUVTaV92c29waTdqeWc?oc=5"
      },
      {
        "name": "The Media Line",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQQzhLZll1RmlsemI3T3lVOS1CcmZkR1BCLWtzN1NVQXplTG1rLXVGb19vVXp4UVpES0hkU3NkY1NXQ2F5eXcyeG5IS2dlUFpoQVh5bmQ0NXBNQ3JDQ21rUE9adTFmQnkzaHBxSDk1NkxzVk1OelVFV1h5QVJERFVQcGsxZDhHVHRCUndXTW1tdm1ZeXhlTThLZTIyRndCTzd1?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/france-returns-syrian-antiquities-damascus.png",
      "alt": "The weathered stone colonnade and ruins of the Temple of Bel at Palmyra, Syria, under a clear sky.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Cyrus Cylinder: gods and peoples restored to their homes",
        "excerpt": "I returned the images of the gods, who had resided there, to their places and I let them dwell in eternal abodes. I gathered all their inhabitants and returned to them their dwellings.",
        "source": "Cyrus Cylinder, Babylon, c. 539 BCE (Akkadian cuneiform; English translation)",
        "href": "https://www.livius.org/sources/content/cyrus-cylinder/cyrus-cylinder-translation/"
      },
      {
        "category": "historical",
        "title": "The Obelisk of Axum returns home after 68 years",
        "excerpt": "Looted from Ethiopia by Mussolini's troops and raised in Rome, the 1,700-year-old, 24-metre granite stele was finally flown back in three sections and reassembled at the Aksum World Heritage site in April 2005. UNESCO coordinated the reinstallation, and the monument's homecoming was celebrated as the restoration of a stolen symbol of national identity. Its long-delayed return became a landmark case of postwar restitution and reconciliation.",
        "source": "UN News, coverage of the Aksum obelisk's return to Ethiopia (2005)",
        "href": "https://news.un.org/en/story/2005/04/135932"
      },
      {
        "category": "literary",
        "title": "Volney meditates amid the ruins of Palmyra",
        "excerpt": "Hail, solitary ruins, holy sepulchres, and silent walls! you I invoke; to you I address my prayer. While your aspect averts, with secret terror, the vulgar regard, it excites in my heart the charm of delicious sentiments—sublime contemplations.",
        "source": "C.-F. Volney, The Ruins; or, Meditation on the Revolutions of Empires (1791), Invocation",
        "href": "https://archive.org/details/volneysruinsorm00voln"
      },
      {
        "category": "literary",
        "title": "Psalm 126: when the captives came home like those who dream",
        "excerpt": "When the Lord turned again the captivity of Zion, we were like them that dream. Then was our mouth filled with laughter, and our tongue with singing: then said they among the heathen, The Lord hath done great things for them. The Lord hath done great things for us; whereof we are glad.",
        "source": "Psalm 126:1-3, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "artistic",
        "title": "Rossini, Aureliano in Palmira",
        "excerpt": "Rossini's 1813 opera stages the confrontation of the Roman emperor Aurelian and the Palmyrene queen Zenobia over the fate of the desert city, ending not in ruin alone but in clemency and reconciliation. Its music turns the fall of Palmyra into a drama of pride, defeat, and mercy. The score echoes the story's mingling of loss and the possibility of restoration.",
        "source": "Gioachino Rossini, Aureliano in Palmira (opera seria, 1813), full score on IMSLP",
        "href": "https://imslp.org/wiki/Aureliano_in_Palmira_(Rossini,_Gioacchino)"
      },
      {
        "category": "artistic",
        "title": "Zenobia's Last Look on Palmyra",
        "excerpt": "Herbert Schmalz's 1888 canvas shows the captured queen Zenobia pausing on a marble terrace to gaze back over the colonnades and temples of her lost desert capital, its towers glowing gold beyond her. The painting distills the ache of a heritage about to be surrendered and a city about to fall silent. It renders Palmyra as both a living splendour and an imminent ruin.",
        "source": "Herbert Gustave Schmalz, Zenobia's Last Look on Palmyra, oil on canvas, 1888 (Art Gallery of South Australia)",
        "href": "https://commons.wikimedia.org/wiki/File:Herbert_G_Schmalz_-_Zenobia%27s_last_look_on_Palmyra_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/france-returns-syrian-antiquities-damascus--art.png",
          "alt": "Queen Zenobia standing on a marble terrace looking out over the sunlit ruins and colonnades of Palmyra",
          "credit": "Herbert Gustave Schmalz (1888), Art Gallery of South Australia, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "peanut-butter-floor-museum-tribute",
    "headline": "A Rotterdam museum reinstalls its peanut-butter floor to honor its late creator",
    "overview": "A museum in Rotterdam reopened Wim T. Schippers' famous 'Pindakaasvloer,' or Peanut Butter Floor, spreading roughly 800 pounds of peanut butter across a gallery floor as a tribute to the late Dutch conceptual artist, curators said on July 10, 2026. The slick, glistening expanse of peanut butter is enough to make an estimated 15,000 sandwiches, and returns one of postwar Dutch art's most provocative gestures to public view.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxNdi1CTXdaOFdOR01YSExiYXVFVlQ4TWxJb3QtM3dBRkdxcXppVVBMaERZWFVxQjhMcTdOTWVha1hLT1BEMWVYZkdxSUJtQ3lZR0ZyYlNtbHhEcE1ycmV3T0FiaTJJcnpQRmN4ckRwSWFXVzZKcjktdXNOQUhOdTJOZVlacmVPSVBZVFpLbkZzZUx3UXhKZmVKb3RuRnE1Ykxv?oc=5"
      },
      {
        "name": "Smithsonian Magazine",
        "href": "https://news.google.com/rss/articles/CBMi4wFBVV95cUxOOW9QbDNZYXg1X3phTWh2cE9IQkkwVlhrYmpZTG5DVWJRVktnRjJZQkwxc1laZGtBbDRxVWxXRm03Ry14R3doOGlnTjhpaUR4SUh6b2J0RnNvRFJyNlpTUWpzbGR1elFZLVNPeXpxSnl3ekZOeEFmZF8yTnBlU3pRSFd6Mm1qMW5naElTWlZpLUdMZldWUWxBY1RFWlp6ZXlwYzBSdGdQVklFRFVqdnFic3NkVlpkMTBzeTA4a1AwdzVtZXIxUkotQXF5ZnN4WHRydkF3d1B4ZEFDa3prTGJ5VEpoUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/peanut-butter-floor-museum-tribute.png",
      "alt": "A gallery floor covered entirely in a smooth, glistening layer of peanut butter, its brown surface reflecting the white museum walls.",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Feast of Fools condemned",
        "excerpt": "Priests and clerks may be seen wearing masks and monstrous visages at the hours of office. They dance in the choir dressed as women, panders or minstrels. They sing wanton songs. They eat black puddings at the horn of the altar while the celebrant is saying mass. They play at dice there. They cense with stinking smoke from the soles of old shoes. They run and leap through the church, without a blush at their own shame.",
        "source": "E. K. Chambers, The Mediaeval Stage (1903), rendering the 1445 University of Paris letter",
        "href": "https://archive.org/details/mediaevalstage01chamuoft"
      },
      {
        "category": "historical",
        "title": "The Richard Mutt Case",
        "excerpt": "Whether Mr. Mutt with his own hands made the fountain or not has no importance. He CHOSE it. He took an ordinary article of life, placed it so that its useful significance disappeared under the new title and point of view—created a new thought for that object.",
        "source": "The Blind Man, no. 2 (New York, May 1917)",
        "href": "https://sdrc.lib.uiowa.edu/dada/blindman/2/"
      },
      {
        "category": "literary",
        "title": "In praise of fools",
        "excerpt": "And now, by the immortal Gods! I think nothing more happy than that generation of men we commonly call fools, ideots, lack-wits and dolts; splendid Titles too, as I conceive 'em.",
        "source": "Erasmus, The Praise of Folly (trans. John Wilson, 1668)",
        "href": "https://en.wikisource.org/wiki/The_Praise_of_Folly/The_Praise_of_Folly"
      },
      {
        "category": "literary",
        "title": "Rabelais to the Reader",
        "excerpt": "'Tis true that it brings forth to you no birth / Of any value, but in point of mirth; / Thinking therefore how sorrow might your mind / Consume, I could no apter subject find; / One inch of joy surmounts of grief a span; / Because to laugh is proper to the man.",
        "source": "Rabelais, Gargantua (trans. Urquhart & Motteux)",
        "href": "https://en.wikisource.org/wiki/Gargantua/Rabelais_to_the_Reader"
      },
      {
        "category": "artistic",
        "title": "Embryons desséchés (Desiccated Embryos)",
        "excerpt": "Satie's 1913 suite of three miniature piano portraits of marine crustaceans — \"d'Holothurie,\" \"d'Edriophthalma,\" and \"de Podophthalma\" — turns dictionary curiosities into deadpan comedy. He fills the score with absurd instructions and jokes, mocking a \"celebrated mazurka by Schubert\" that is really a parody of Chopin's funeral march and imitating the \"purring\" of a sea cucumber. Humble, ridiculous subject matter is elevated with mock-solemn conservatory craft.",
        "source": "Erik Satie, Embryons desséchés (1913), IMSLP primary-source score",
        "href": "https://imslp.org/wiki/Embryons_dess%C3%A9ch%C3%A9s_(Satie,_Erik)"
      },
      {
        "category": "artistic",
        "title": "Netherlandish Proverbs",
        "excerpt": "Bruegel's 1559 panel crams more than a hundred Dutch proverbs and follies into a single teeming village, where peasants bang their heads against brick walls, cast roses before swine, and shear a pig for nothing. Human foolishness is rendered as everyday, ordinary spectacle — absurdity made monumental. The comedy of proverbs literalized celebrates the sublime ridiculousness of ordinary life.",
        "source": "Pieter Bruegel the Elder, Netherlandish Proverbs (1559), Gemäldegalerie, Berlin",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Dutch_Proverbs_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/peanut-butter-floor-museum-tribute--art.png",
          "alt": "A crowded 16th-century Flemish village scene illustrating over a hundred Netherlandish proverbs and follies",
          "credit": "Pieter Bruegel the Elder, Netherlandish Proverbs (1559), Gemäldegalerie Berlin; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "france-morocco-world-cup-semifinal",
    "headline": "Mbappé leads France past Morocco 2-0 to reach the World Cup semifinals",
    "overview": "Kylian Mbappé scored his eighth goal of the tournament and set up another as France beat Morocco 2-0 on July 10, 2026 to reach the World Cup semifinals. The captain limped off late with what the team described as a slight ankle injury, leaving France to weigh his fitness as it advances to the final four.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxOUUZFZUhfX0NXTXdUbGtJN0t5QU0ta0ZOVG9ZY2dkQ010SEZUdVVfTkUtbHo0MUV5MHh6cERKaUNvT2FMNTZGM044bF9meXBWZnNsTzBfcE1RWTlwMDJjdWd3UXRDTl9nMVJ1UC1aRlJUWHpyTXdRejNSdUpjcWdSVzBmbloyMFV2b2NzYi1OTkdMVzJs?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPbFQxckEzYndFZjluM1NJVDZjN0l6QVdqQ0xLX0JwQ0E5bmVkY0J2UGZMWWd2Q2JYUllPUk4tUUpFeFZFUEx0VlU2TUlyUU9la3JfREZoRDh5NEFGLVdRVjRFQmZIT0ZaYmZmdUZ6NndvTG5MM0VNRnhhb0VRcW1ITG5Rd2pmM0lSNWw1Y1J5Tk9OZFA5aDZ3WmdaaEhRVFN1LURLMg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/france-morocco-world-cup-semifinal.png",
      "alt": "A floodlit football stadium at night, players contesting the ball on a bright green pitch before the stands.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Leonidas of Rhodes, the crowned Olympic runner",
        "excerpt": "The most famous runner was Leonidas of Rhodes. He maintained his speed at its prime for four Olympiads, and won twelve victories for running.",
        "source": "Pausanias, Description of Greece 6.13.4 (trans. W. H. S. Jones), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Paus.%206.13.4"
      },
      {
        "category": "historical",
        "title": "Jesse Owens sprints to gold at the 1936 Berlin Olympics",
        "excerpt": "On the cinder track of Berlin's Olympic Stadium, the swiftest man of the Games surged clear of the field to take the 100 metres, the first of four gold medals. Before a hostile crowd he turned raw speed into a triumph that outran the propaganda staged around him, becoming the enduring image of the crowned athlete-hero of the modern age.",
        "source": "National Archives (Still Pictures) via DPLA / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Photograph_of_Jesse_Owens_at_the_1936_Olympics_in_Berlin,_Germany_-_DPLA_-_4da1d9c3055db6d180835b91c32ce4ec.jpg"
      },
      {
        "category": "literary",
        "title": "Pindar crowns the Olympic victor",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice.",
        "source": "Pindar, Olympian Ode 1 (trans. Ernest Myers), Wikisource",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/1"
      },
      {
        "category": "literary",
        "title": "The foot-race at the funeral games for Patroclus",
        "excerpt": "The next Ulysses, measuring pace with pace: / Behind him, diligently close, he sped, / As closely following as the running thread / The spindle follows, and displays the charms / Of the fair spinster's breast, and moving arms: / Graceful in motion thus, his foe he plies, / And treads each footstep ere the dust can rise: / His glowing breath upon his shoulders plays.",
        "source": "Homer, Iliad Book 23 (trans. Alexander Pope), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_23"
      },
      {
        "category": "artistic",
        "title": "Handel: 'See, the conquering hero comes' from Judas Maccabaeus",
        "excerpt": "See, the conqu'ring hero comes! Sound the trumpets, beat the drums! Sports prepare, the laurel bring, songs of triumph to him sing. — the triumphal chorus (Act III) hailing the victor's return, sung to Thomas Morell's libretto and long adopted as an anthem of athletic and martial victory.",
        "source": "G. F. Handel, Judas Maccabaeus HWV 63 (full scores, public domain), IMSLP",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Panathenaic prize amphora with a foot-race",
        "excerpt": "Five nude athletes stretch in full stride across the black-figure vase, left legs thrust forward and arms pumping, frozen at the instant of the sprint. Made about 530 BC and filled with sacred olive oil as a prize for victory in the Games, it renders the swift runner as the very emblem of the crowned champion.",
        "source": "Attributed to the Euphiletos Painter, Terracotta Panathenaic prize amphora, ca. 530 BC, The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/248902",
        "image": {
          "src": "/covers/france-morocco-world-cup-semifinal--art.png",
          "alt": "Black-figure Panathenaic prize amphora showing five nude runners in a foot-race, mid-stride",
          "credit": "The Metropolitan Museum of Art, New York (CC0 / Public Domain); attributed to the Euphiletos Painter, ca. 530 BC"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "israel-sea-munitions-clearance",
    "headline": "Israel races to clear unexploded munitions from its seabed in a wider push to protect coastal waters",
    "overview": "Israel is scaling up an effort to locate and clear unexploded munitions littering its seabed, part of a growing global campaign to make coastal waters safer for shipping, fishing and marine life, The Associated Press reported on July 10, 2026. Specialist teams are surveying and disposing of ordnance ranging from wartime shells to modern explosives that pose lingering risks to people and ecosystems.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPR0xMOTEwTXJGVmg0TklXZFRJUnJoQUtOV0xjeDQzR19UZkpPN1ZWbkh5VUZveVRZN3lHQ2pxeTdPbzFRUHdkYmJTektVVE5DazZkMWZuank0UVpWYzFEbWJOSFFYdTR6VklnVFRSeEkyZXFTV3pEM2RuYjVyM1c3LURMdjRKY0pnWVNrcU03elNydkZkWGgxQ291cUNucmRlWWJvWjJvQl9vM3JWS0Z3?oc=5"
      },
      {
        "name": "Audacy",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxQZUMyTVBvU3JRSVhpSlFUVkNOX1A4MGNlX0ZPeGZIZVJCU2JNWkR1TGxMTWIyWFVFUF9JQ3o0Y0Z0TS11SWVPYXhCRjI1cF91RkdBZ1luSlNOZEdMVVRaYkNkTzV6YTctT0FyODltOGFuUTRYTk5YSWo2RC0zel92eGZoaUNCMDdFcXJUT3FqMGRDNzJYbjdyXzExaU5JMnQ1bzRKUEk5cGE1b1JTRDZIbXhGT1cwaDZNdDROczZhSQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/israel-sea-munitions-clearance.png",
      "alt": "Military explosive-ordnance-disposal divers working at the surface of the water during a clearance operation.",
      "credit": "U.S. Navy / Wikimedia Commons"
    },
    "edition": "Morning Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The wrecks driven ashore after Salamis",
        "excerpt": "But many of the wrecks were caught by a west wind and carried to the strand in Attica called Colias; so that not only was the rest of the prophecy fulfilled which had been uttered by Bacis and Musaeus concerning that sea-fight, but also that which had been prophesied many years ago by an Athenian oracle-monger named Lysistratus, about the wrecks that were here cast ashore.",
        "source": "Herodotus, Histories, Book VIII.96 (Godley trans.)",
        "href": "https://en.wikisource.org/wiki/Herodotus_The_Persian_Wars_(Godley)/Book_VIII"
      },
      {
        "category": "historical",
        "title": "Sweeping up the North Sea Mine Barrage",
        "excerpt": "Even before the end of the war was clearly in sight it was recognized that one of the most seriously urgent duties of reconstruction would be to clear the seas of mines. Few dangers more treacherous than mines jeopardize the safety of ships and the lives of mariners in time of peace, for, aside from the actual areas in which mines had been laid, thousands of them break adrift and, carried by the wind and currents, infest the neighboring waters for miles around.",
        "source": "The Northern Barrage: Taking Up the Mines, U.S. Navy Dept., 1920",
        "href": "https://archive.org/details/thenorthernbarra00unitrich"
      },
      {
        "category": "literary",
        "title": "Ariel's Song: \"Full fathom five\"",
        "excerpt": "Full fathom five thy father lies. / Of his bones are coral made. / Those are pearls that were his eyes. / Nothing of him that doth fade / But doth suffer a sea change / Into something rich and strange. / Sea nymphs hourly ring his knell. / Ding dong. / Hark, now I hear them: ding dong bell.",
        "source": "William Shakespeare, The Tempest, Act 1, Scene 2 (Folger Shakespeare)",
        "href": "https://www.folger.edu/explore/shakespeares-works/the-tempest/read/1/2/"
      },
      {
        "category": "literary",
        "title": "Mine-Sweepers",
        "excerpt": "Dawn off the Foreland—the young flood making / Jumbled and short and steep— / Black in the hollows and bright where it's breaking— / Awkward water to sweep. / \"Mines reported in the fairway, / Warn all traffic and detain. / 'Sent up Unity, Claribel, Assyrian, Stormcock, and Golden Gain.'\"",
        "source": "Rudyard Kipling, \"Mine-Sweepers\", in Sea Warfare (1917)",
        "href": "https://archive.org/details/seawarfare00kipluoft"
      },
      {
        "category": "artistic",
        "title": "La mer, three symphonic sketches",
        "excerpt": "Debussy's orchestral evocation of the sea, in three movements whose score bears the titles \"De l'aube à midi sur la mer,\" \"Jeux de vagues,\" and \"Dialogue du vent et de la mer\" — the play of light and water at dawn, the games of the waves, and the restless dialogue of wind and sea.",
        "source": "Claude Debussy, La mer, CD 111 (Durand, 1905); full score, IMSLP",
        "href": "https://imslp.org/wiki/La_mer_(Debussy,_Claude)"
      },
      {
        "category": "artistic",
        "title": "The Ninth Wave",
        "excerpt": "Aivazovsky's 1850 seascape shows a handful of shipwreck survivors clinging to a broken mast as dawn breaks over a still-heaving sea. The translucent, mountainous swell of the folkloric \"ninth wave\" — held to be the most destructive of a series — rears against them, even as the warming light hints that the storm, and its danger, may at last be passing.",
        "source": "Ivan Aivazovsky, The Ninth Wave (1850), State Russian Museum",
        "href": "https://commons.wikimedia.org/wiki/File:Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/israel-sea-munitions-clearance--art.png",
          "alt": "Shipwreck survivors cling to a mast as a huge translucent green-gold wave rises at sunrise in Aivazovsky's The Ninth Wave",
          "credit": "Ivan Aivazovsky, The Ninth Wave (1850), State Russian Museum; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "palm-beach-airport-renamed-trump",
    "headline": "Palm Beach International Airport is officially renamed for President Trump",
    "overview": "Palm Beach International Airport in South Florida was officially renamed President Donald J. Trump International Airport, officials confirmed on July 10, 2026. The gateway near Trump's Mar-a-Lago residence becomes the latest landmark to carry the president's name, a move that drew both celebration and criticism in the closely divided county.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQcVA4bjlMTlZJTTFFTWx0WlExUlJ6TUFLaFFJcjYzT2JYTEQ2WkhlWS1qdzc1bjUwMk9rTDdFUUd0NlNqYmx1RE5EVV9QQjJ0SElVU19QVjRnbUV4RzFmNDVMVjU1RDlqUXZUTl9pekdRcVFiN0JSTE9xdV9mSUtIZXI2YXBmdGZOQkgyYVVBTlJkTGoya180?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxQYXVldkY0UmdRa3Jsamk2R1QxVTB6cFctUVdRRHB3dWNaakduZmxEcF8zQWkwT1NDV0M5S1hTa005VFQxUnJ6LVZ3Zzh6RzJXZEQ0SE5BX01xLXV2UzQtSl95cXp6cUM5enVJUnZLaC1zaWxwRVR1R1g0dEZZQUYtSlFWeHZnNWVlUFNXS25JWXhjcXJfQ3JYUHRMTnprUkYzSk1zbmpEdWNiVHp3cU9R?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/palm-beach-airport-renamed-trump.png",
      "alt": "An aerial view of Palm Beach International Airport in Florida, its runways and terminals ringed by greenery.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Alexander founds Alexandria and gives it his name",
        "excerpt": "They say, namely, that after his conquest of Egypt he wished to found a large and populous Greek city which should bear his name, and by the advice of his architects was on the point of measuring off and enclosing a certain site for it.",
        "source": "Plutarch, Life of Alexander 26 (Loeb trans., B. Perrin)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Alexander*/4.html"
      },
      {
        "category": "historical",
        "title": "Constantine renames Byzantium after himself as Constantinople",
        "excerpt": "He resolved upon founding a city which should be called by his own name, and should be equal in celebrity to Rome. ... He named it New Rome and Constantinople, and constituted it the imperial capital for all the inhabitants of the North, the South, the East, and the shores of the Mediterranean.",
        "source": "Sozomen, Ecclesiastical History II.3",
        "href": "https://www.newadvent.org/fathers/26022.htm"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "I met a Traveller from an antique land,\nWho said, \"Two vast and trunkless legs of stone\nStand in the desart. Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read,\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:\nAnd on the pedestal these words appear:\n\"My name is Ozymandias, King of Kings.\nLook on my works ye Mighty, and despair!\nNo thing beside remains. Round the decay\nOf that Colossal Wreck, boundless and bare,\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, in The Examiner (1818)",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes on vanity and the erasure of memory",
        "excerpt": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. What profit hath a man of all his labour which he taketh under the sun? One generation passeth away, and another generation cometh: but the earth abideth for ever. ... There is no remembrance of former things; neither shall there be any remembrance of things that are to come with those that shall come after.",
        "source": "Ecclesiastes 1 (King James Version)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "artistic",
        "title": "Zadok the Priest (Coronation Anthem, HWV 258)",
        "excerpt": "Handel's blazing coronation anthem, first sung at the crowning of George II in 1727 and at every British coronation since, sets the ancient acclamation of a king: \"Zadok the priest and Nathan the prophet anointed Solomon king. And all the people rejoiced, and said: God save the King! Long live the King! May the King live for ever.\" Its slow swell of strings breaking into trumpets and choir is the very sound of a ruler's name made glorious in stone and song.",
        "source": "George Frideric Handel, Coronation Anthems HWV 258-261 (IMSLP full score)",
        "href": "https://imslp.org/wiki/Coronation_Anthems,_HWV_258-261_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Younger Memnon — colossal bust of Ramesses II",
        "excerpt": "Agostino Aglio's 1821 engraving, from Belzoni's plates, depicts the colossal granite bust of Ramesses II known as the \"Younger Memnon\" — the very fragment whose journey to England helped inspire Shelley's Ozymandias. The pharaoh's serene, faintly smiling face towers over the viewer, a living god's likeness carved to outlast all empire, yet shown here as a severed relic dragged from the Theban sands, its \"frown, and wrinkled lip, and sneer of cold command\" surviving only as ruin.",
        "source": "Agostino Aglio, engraving in 'Plates illustrative of the Researches and Operations of G. Belzoni in Egypt and Nubia' (London: Murray, 1821); Wikimedia Commons (Public Domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Aglio_-_Belzoni_-_Memnon.jpg",
        "image": {
          "src": "/covers/palm-beach-airport-renamed-trump--art.png",
          "alt": "1821 engraving of the colossal bust of Ramesses II, the 'Younger Memnon', showing the pharaoh's serene face and shoulders",
          "credit": "Agostino Aglio, from Belzoni's 'Plates illustrative of the Researches and Operations in Egypt and Nubia' (1821). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 13
  },
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
    "rank": 14
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
    "rank": 15
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
    "rank": 16
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
    "rank": 17
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
    "rank": 18
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
    "rank": 19
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
    "rank": 20
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
    "rank": 21
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
    "rank": 22
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
    "rank": 23
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
    "rank": 24
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
    "rank": 25
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
    "rank": 26
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
    "rank": 27
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
    "rank": 28
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
    "rank": 29
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
    "rank": 30
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
    "rank": 31
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
    "rank": 32
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
    "rank": 33
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
    "rank": 34
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
    "rank": 35
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
    "rank": 36
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
    "rank": 37
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
    "rank": 38
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
