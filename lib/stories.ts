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
// the Evening Edition of 5 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Afternoon Edition of 5 July 2026 and the Morning Edition of 5 July 2026.
// Stories are selected from the live RSS feeds in `lib/feeds.ts`. The analogies are
// the heart of each story: six per event, two per category, each linking to a real
// human-written source (a primary text, museum object page, or archive). Excerpts
// quote the most relevant passage verbatim where the source is public domain, and
// otherwise describe rather than quote. Covers are dithered local copies: feed or
// rights-clean Wikimedia art/photos credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated"). Every analogy carries its own
// image too — a rights-clean visual of its subject (the artwork itself, a manuscript
// page, a portrait, a title page; never AI-generated), dithered via
// scripts/dither-art.ts to /covers/<slug>--art. Omit only when nothing rights-clean
// exists; the home hero crossfades to these on hover. Source links to AP/Reuters are
// Google News redirects (see `lib/feeds.ts`).
const stories: Story[] = [
  {
    "slug": "china-pacific-missile-test",
    "headline": "China test-fires a ballistic missile into the South Pacific, drawing protests from Japan, Australia and New Zealand",
    "overview": "China's military test-fired a ballistic missile carrying a dummy warhead from a submarine into the South Pacific on July 6, 2026, in what state media called routine annual training. Japan, Australia and New Zealand protested the launch as an unwelcome sign of Beijing's expanding military reach, with Canberra citing a lack of transparency around China's rapid buildup. It was China's first known submarine-launched missile test since 1982 and the first believed to have been fired from a nuclear-powered submarine.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxONHN3R1NZdmtSRi0yZWF1cGt2a3FyVG9qVkJBMkpZUktxZXNYV0tSTXFrdkplR3RsSDdyekFCZGsxODgzR3pjRGxzS2lZVkI4Q1Vvb1VuVm5fb2JXSDdlTEZqZzlxNlJpdHNxQUZNdmJXRzVZdjhPSTRtelE3LXdpZ0h6d0cxRlB3aUh5N1BOS2sxeHFOMUhrMzBTd1hfVS1OZEtHNXY2S01qd3RyOFZF?oc=5"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/search?q=China%20test-launches%20ballistic%20missile%20South%20Pacific&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/china-pacific-missile-test.png",
      "alt": "A ballistic missile rises on a plume of smoke and spray above the open sea beneath a pale dawn sky",
      "credit": "AI-generated"
    },
    "lead": true,
    "edition": "Afternoon Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Xerxes scourges the Hellespont",
        "excerpt": "Then when Xerxes heard it he was exceedingly enraged, and bade them scourge the Hellespont with three hundred strokes of the lash and let down into the sea a pair of fetters. Nay, I have heard further that he sent branders also with them to brand the Hellespont. However this may be, he enjoined them, as they were beating, to say Barbarian and presumptuous words as follows: “Thou bitter water, thy master lays upon thee this penalty, because thou didst wrong him not having suffered any wrong from him: and Xerxes the king will pass over thee whether thou be willing or no; but with right, as it seems, no man doeth sacrifice to thee, seeing that thou art a treacherous and briny stream.”",
        "source": "Herodotus, The History of Herodotus, Book VII.34–35 (trans. G. C. Macaulay), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2456/2456-0.txt"
      },
      {
        "category": "historical",
        "title": "The Athenian armada sails for Sicily",
        "excerpt": "Indeed the expedition became not less famous for its wonderful boldness and for the splendour of its appearance, than for its overwhelming strength as compared with the peoples against whom it was directed, and for the fact that this was the longest passage from home hitherto attempted, and the most ambitious in its objects considering the resources of those who undertook it.",
        "source": "Thucydides, History of the Peloponnesian War, Book VI.31 (trans. Richard Crawley), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "literary",
        "title": "Apollo's arrows fall upon the fleet",
        "excerpt": "Thus Chryses pray’d:—the favouring power attends, / And from Olympus’ lofty tops descends. / Bent was his bow, the Grecian hearts to wound; / Fierce as he moved, his silver shafts resound. / Breathing revenge, a sudden night he spread, / And gloomy darkness roll’d about his head. / The fleet in view, he twang’d his deadly bow, / And hissing fly the feather’d fates below.",
        "source": "Homer, The Iliad, Book I (trans. Alexander Pope), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt"
      },
      {
        "category": "literary",
        "title": "The rebel angels invent artillery",
        "excerpt": "These in their dark nativity the deep / Shall yield us, pregnant with infernal flame; / Which, into hollow engines, long and round, / Thick rammed, at the other bore with touch of fire / Dilated and infuriate, shall send forth / From far, with thundering noise, among our foes / Such implements of mischief, as shall dash / To pieces, and o’erwhelm whatever stands / Adverse, that they shall fear we have disarmed / The Thunderer of his only dreaded bolt.",
        "source": "John Milton, Paradise Lost, Book VI (trans. n/a; Satan's invention of artillery), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt"
      },
      {
        "category": "artistic",
        "title": "Mars, the Bringer of War (from The Planets, Op. 32)",
        "excerpt": "Holst opens his suite with a relentless five-beat ostinato, hammered out col legno by the strings like the mechanical drumbeat of an advancing war machine. Brass and timpani pile into snarling, dissonant climaxes that swell without mercy, conjuring a faceless, overwhelming force on the march. It is music of pure intimidation—an arsenal made audible—mirroring a rising power that stages its firepower to unnerve distant neighbours.",
        "source": "Gustav Holst, The Planets, Op. 32 — I. Mars, the Bringer of War, IMSLP",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "The Great Wave off Kanagawa",
        "excerpt": "A colossal wave rears over the sea off Kanagawa, its claw-like crest of foam poised to crash down upon three slender fishing boats whose crews cling low against the onslaught. Far in the distance the snow-capped cone of Mount Fuji is dwarfed to a small triangle beneath the towering surge. Hokusai turns the ocean itself into an unstoppable power—a fitting emblem of an overwhelming force rising from the Pacific to loom over all who lie in its path.",
        "source": "Katsushika Hokusai, The Great Wave off Kanagawa (c. 1830–1832), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/china-pacific-missile-test--art.png",
          "alt": "A giant blue wave with a foaming, claw-like crest towers over three small fishing boats, with a small snow-capped Mount Fuji visible in the distance.",
          "credit": "Katsushika Hokusai, The Great Wave off Kanagawa (c. 1831); Metropolitan Museum of Art; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "itv-sky-comcast-television-deal",
    "headline": "Comcast's Sky agrees to buy ITV's broadcasting and streaming arm in a £1.6 billion deal",
    "overview": "Comcast-owned Sky agreed on July 6, 2026 to acquire ITV's media and entertainment division — its broadcast channels and streaming service — for about £1.6 billion ($2.1 billion), reshaping British television. The combined operation would account for more than 70% of the UK television advertising market and is meant to compete with global streamers such as Netflix and Disney. The deal, which also brings in the maker of 'The Great British Bake Off,' will face regulatory scrutiny.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPMzZaRWVZUmJNd0Q0RExjSTI2bGVsaWpIUWdtb2NNRkc4Mk80Z0VMWXFEUWlHRUNoMEN1Yk1FcW02ZU9qTWxWWWo4LVFKUWZkOVQydWZ5LWVMaGcwLThNd1FJSUttQm5TOTZtUnBDYVFJb212V3JDS19xWnNNcWRWazIwLV9DZVlXd3ZFWjljYWN1SE1EUUlleDlxSEl6YnEyV05UTWpPbzNOVHAwdU1yT21ySW5KSzNV?oc=5"
      },
      {
        "name": "Deadline",
        "href": "https://deadline.com/2026/07/sky-acquires-itv-love-island-1236973761/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/itv-sky-comcast-television-deal.png",
      "alt": "The riverside London Television Centre studios on the South Bank of the Thames",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Adam Smith on the price of monopoly",
        "excerpt": "The price of monopoly is upon every occasion the highest which can be got. The natural price, or the price of free competition, on the contrary, is the lowest which can be taken, not upon every occasion indeed, but for any considerable time together.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, Book I, Chapter VII, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3300/3300-h/3300-h.htm"
      },
      {
        "category": "historical",
        "title": "Tarbell exposes Standard Oil's secret combination",
        "excerpt": "Let us who see what a combination strictly carried out will effect unite secretly to accomplish it. Let us become the nucleus of a private company which gradually shall acquire control of all refineries everywhere, become the only shippers, and consequently the master of the railroads in the matter of freight rates.",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company, Vol. I, Chapter Five: Laying the Foundations of a Trust, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/60692/60692-h/60692-h.htm"
      },
      {
        "category": "literary",
        "title": "The railroad as the all-devouring Octopus",
        "excerpt": "the galloping monster, the terror of steel and steam, with its single eye, cyclopean, red, shooting from horizon to horizon; but saw it now as the symbol of a vast power, huge, terrible, flinging the echo of its thunder over all the reaches of the valley, leaving blood and destruction in its path; the leviathan, with tentacles of steel clutching into the soil, the soulless Force, the iron-hearted Power, the monster, the Colossus, the Octopus.",
        "source": "Frank Norris, The Octopus: A Story of California, Book I, Chapter I, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/268/268-h/268-h.htm"
      },
      {
        "category": "literary",
        "title": "The marketplace as an all-consuming whirlpool",
        "excerpt": "Endlessly, ceaselessly the Pit, enormous, thundering, sucked in and spewed out, sending the swirl of its mighty central eddy far out through the city's channels. Terrible at the centre, it was, at the circumference, gentle, insidious and persuasive, the send of the flowing so mild, that to embark upon it, yielding to the influence, was a pleasure that seemed all devoid of risk.",
        "source": "Frank Norris, The Pit: A Story of Chicago, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/4382/4382-h/4382-h.htm"
      },
      {
        "category": "artistic",
        "title": "Wagner's Das Rheingold: power seized and hoarded",
        "excerpt": "Wagner's Das Rheingold opens the Ring cycle by dramatizing how absolute power is seized and hoarded, as the dwarf Alberich forswears love to steal the river's gold and forge a ring that bends all others to his will. The relentless hammering of anvils in the descent to Nibelheim conjures an entire underworld enslaved to a single master's ambition. Its surging, accumulating leitmotifs make audible the theme of many hands' labour and wealth gathered into one grasping fist.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (1869), IMSLP",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "'Next!' — Standard Oil as the strangling octopus",
        "excerpt": "Udo Keppler's 1904 chromolithograph for Puck renders a commercial monopoly as a bloated octopus, its steel tentacles already throttling the copper, steel, and shipping industries and the halls of a state legislature and Congress. One free tentacle stretches hungrily toward the White House, captioned simply Next!, a warning that consolidated power seeks to swallow even the seats of public authority. It endures as the defining image of a single combine reaching to grip an entire marketplace.",
        "source": "Udo Keppler, Next!, Puck v. 56 no. 1436 (1904), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Standard_oil_octopus_loc_color.jpg",
        "image": {
          "src": "/covers/itv-sky-comcast-television-deal--art.png",
          "alt": "1904 color political cartoon depicting Standard Oil as a giant octopus whose tentacles wrap around government buildings and industries while one reaches toward the White House.",
          "credit": "Udo Keppler, Next! (1904); Library of Congress; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "congo-ebola-outbreak-worsens",
    "headline": "Congo says confirmed Ebola cases have climbed to 1,561 with 506 deaths",
    "overview": "The Democratic Republic of Congo reported that confirmed Ebola cases in the country had risen to 1,561, including 506 deaths, in figures released around July 6, 2026. The Bundibugyo-strain outbreak, declared in May and spanning parts of northeastern DRC and neighbouring Uganda, has become one of the largest on record. Health agencies say needs are escalating as responders work to contain its spread.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/search?q=Congo%20confirmed%20Ebola%20cases%201561%20deaths&hl=en-US&gl=US&ceid=US:en"
      },
      {
        "name": "U.S. News & World Report",
        "href": "https://www.usnews.com/news/world/articles/2026-07-06/congo-says-confirmed-ebola-cases-rise-to-1-561-including-506-deaths"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/congo-ebola-outbreak-worsens.png",
      "alt": "Health workers in white protective suits outside a canvas Ebola treatment unit",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens",
        "excerpt": "It first began, it is said, in the parts of Ethiopia above Egypt, and thence descended into Egypt and Libya and into most of the King’s country. Suddenly falling upon Athens, it first attacked the population in Piraeus—which was the occasion of their saying that the Peloponnesians had poisoned the reservoirs, there being as yet no wells there—and afterwards appeared in the upper city, when the deaths became much more frequent.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2.48 (Crawley translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "historical",
        "title": "The Plague of Justinian",
        "excerpt": "During these times there was a pestilence, by which the whole human race came near to being annihilated. Now in the case of all other scourges sent from Heaven some explanation of a cause might be given by daring men, such as the many theories propounded by those who are clever in these matters; for they love to conjure up causes which are absolutely incomprehensible to man.",
        "source": "Procopius, History of the Wars, Book 2.22 (Dewing translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/16764/pg16764.txt"
      },
      {
        "category": "literary",
        "title": "Apollo's Arrows Fall on the Achaean Host",
        "excerpt": "He sat himself down away from the ships with a face as dark as night, and his silver bow rang death as he shot his arrow in the midst of them. First he smote their mules and their hounds, but presently he aimed his shafts at the people themselves, and all day long the pyres of the dead were burning.",
        "source": "Homer, The Iliad, Book 1 (Samuel Butler translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt"
      },
      {
        "category": "literary",
        "title": "The Plague upon Thebes",
        "excerpt": "She wasteth in the fruitless buds of earth, In parchèd herds and travail without birth Of dying women: yea, and midst of it A burning and a loathly god hath lit Sudden, and sweeps our land, this Plague of power; Till Cadmus' house grows empty, hour by hour, And Hell's house rich with steam of tears and blood.",
        "source": "Sophocles, Oedipus, King of Thebes, Prologue (Gilbert Murray translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/27673/pg27673.txt"
      },
      {
        "category": "artistic",
        "title": "Danse macabre, Op. 40",
        "excerpt": "Camille Saint-Saëns's tone poem summons the medieval Dance of Death, in which the plague made kings and beggars equal beneath the scythe. A solo violin, tuned to a rasping tritone, portrays Death fiddling at midnight while a xylophone clatters like the bones of the risen dead whirling through the churchyard. The frenzied waltz mounts to a delirium and then dissolves at the crow of the cock, the spectres sinking back into their graves.",
        "source": "Camille Saint-Saëns, Danse macabre, Op. 40 (1874), IMSLP",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "The Plague at Ashdod",
        "excerpt": "Nicolas Poussin stages the biblical pestilence that fell upon the Philistines of Ashdod after they seized the Ark of the Covenant. Bodies lie sprawled across a classical piazza while the living recoil, press cloths to their faces, and bear off the stricken, and a dead infant lies beside its collapsed mother at the centre of the scene. Painted in Rome around 1630, the work distils the terror and disorder of an epidemic within a cold architectural calm.",
        "source": "Nicolas Poussin, The Plague at Ashdod (1630–1631), Musée du Louvre, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:La_Peste_d%27Asdod_-_1630-1631_-_Nicolas_Poussin_-_Louvre_-_INV_7276_%3B_MR_2312.jpg",
        "image": {
          "src": "/covers/congo-ebola-outbreak-worsens--art.png",
          "alt": "Baroque painting of a plague-stricken city square: bodies sprawled on the pavement, mourners recoiling and covering their faces, and a dead infant beside its collapsed mother, with classical buildings behind.",
          "credit": "Nicolas Poussin, The Plague at Ashdod (1630–1631), oil on canvas, Musée du Louvre, Paris. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "england-mexico-world-cup-azteca",
    "headline": "Ten-man England beat Mexico 3-2 at the Azteca to reach the World Cup quarterfinals",
    "overview": "England beat host nation Mexico 3-2 in a last-16 World Cup thriller at Estadio Azteca on July 5, 2026, holding on with ten men after a red card to reach the quarterfinals. It was Mexico's first-ever World Cup defeat at the storied Mexico City stadium. England survived a late Mexican fightback to advance to a quarterfinal showdown.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxONDQ1TktiZTl4LVZ3cElzV0xfb2JKak9TZmpsZy1abzN5NHJSSUZWT2o1cXBxbk9iaVV6MWlXRDFPZGtFdVVmbF9GRXNFTDZtcUhoRlR3V2Vmd0QxcU1YWmhCRDRoNUVjdFgteHgtdURyQU0xRGxCSTRKanllS0hnMWhYLVZoVkRkeWxnRlJlMmpJRTRUeGtpLU5qc1pUN2tNN2ppdlZDaWVLbGM?oc=5"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/search?q=England%20Mexico%20Azteca%203-2%20World%20Cup&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/england-mexico-world-cup-azteca.png",
      "alt": "An aerial view of the vast bowl of Estadio Azteca in Mexico City",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The impregnable citadel of Sardis is finally taken",
        "excerpt": "Then, all the rest being at a stand, a certain Mardian called Hyroeades essayed to mount by a part of the citadel where no guard had been set; for here the height on which the citadel stood was sheer and hardly to be assaulted, and none feared that it could be taken by an attack made here.",
        "source": "Herodotus, The Histories, Book 1.84 (Godley translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/Herodotus_The_Persian_Wars_(Godley)/Book_I"
      },
      {
        "category": "historical",
        "title": "The outnumbered Athenians charge the Persians at Marathon",
        "excerpt": "When the Persians saw them come running they prepared to receive them, deeming the Athenians frenzied to their utter destruction, who being (as they saw) so few were yet charging them at speed, albeit they had no horsemen nor archers.",
        "source": "Herodotus, The Histories, Book 6.112 (Godley translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/Herodotus_The_Persian_Wars_(Godley)/Book_VI"
      },
      {
        "category": "literary",
        "title": "The chariot race at the funeral games for Patroclus",
        "excerpt": "Their heart, their eyes, their voice, they send before;\nAnd up the champaign thunder from the shore:\nThick, where they drive, the dusty clouds arise,\nAnd the lost courser in the whirlwind flies;",
        "source": "Homer, The Iliad, Book 23 (Pope translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_23"
      },
      {
        "category": "literary",
        "title": "Dares and Entellus trade blows in the boxing match",
        "excerpt": "A Storm of Strokes, well meant, with fury flies,\nAnd errs about their Temples, Ears, and Eyes.\nNor always errs; for oft the Gauntlet draws\nA sweeping stroke, along the crackling Jaws.",
        "source": "Virgil, The Aeneid, Book 5 (Dryden translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_V"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky's 1812 Overture",
        "excerpt": "Tchaikovsky's 1812 Overture dramatizes an outnumbered nation's defence of its homeland, pitting the invading strains of 'La Marseillaise' against Russian hymns and folk themes in a swelling musical combat. The orchestra builds through struggle and near-defeat before the enemy motif is beaten back and overwhelmed by pealing bells and thundering cannon. Its triumphant final blaze evokes the roar of a partisan crowd celebrating a hard-won victory on home ground.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49, IMSLP",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "David's Leonidas at Thermopylae",
        "excerpt": "Jacques-Louis David's monumental canvas shows the Spartan king Leonidas and his vastly outnumbered band steeling themselves to hold the narrow pass against the Persian host. Calm and resolute at the centre, the defenders embody grit and self-sacrifice in the face of overwhelming odds. The picture has become the enduring image of a small force making a defiant last-ditch stand against an army that should, by every measure, sweep it away.",
        "source": "Jacques-Louis David, Leonidas at Thermopylae, 1814 (Louvre), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_Leonidas_at_Thermopylae_-_WGA6095.jpg",
        "image": {
          "src": "/covers/england-mexico-world-cup-azteca--art.png",
          "alt": "Jacques-Louis David's painting Leonidas at Thermopylae, showing the Spartan king seated amid his warriors as they prepare to defend the mountain pass.",
          "credit": "Jacques-Louis David (1748-1825), Leonidas at Thermopylae, 1814, Louvre Museum. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "philippines-duterte-impeachment-trial",
    "headline": "Philippine Senate opens the impeachment trial of Vice President Sara Duterte",
    "overview": "The Philippine Senate convened as an impeachment court on July 6, 2026 to begin the politically charged trial of Vice President Sara Duterte over alleged misuse of public funds and other accusations she denies. The proceedings open amid a bitter feud between the Duterte and Marcos political dynasties. Days earlier, a senator allied with the Dutertes was arrested on a separate corruption charge.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/search?q=Philippine%20Senate%20impeachment%20trial%20Sara%20Duterte&hl=en-US&gl=US&ceid=US:en"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/search?q=Duterte%20ally%20arrested%20plunder%20impeachment%20trial&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/philippines-duterte-impeachment-trial.png",
      "alt": "Philippine Vice President Sara Duterte during an interview",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Burke Impeaches Warren Hastings Before the Lords",
        "excerpt": "I impeach Warren Hastings, Esquire, of high crimes and misdemeanors. I impeach him in the name of the Commons of Great Britain in Parliament assembled, whose parliamentary trust he has betrayed. I impeach him in the name of all the Commons of Great Britain, whose national character he has dishonored. I impeach him in the name of the people of India, whose laws, rights and liberties he has subverted; whose properties he has destroyed; whose country he has laid waste and desolate. I impeach him in the name and by virtue of those eternal laws of justice which he has violated. I impeach him in the name of human nature itself, which he has cruelly outraged, injured and oppressed, in both sexes, in every age, rank, situation, and condition of life.",
        "source": "Edmund Burke, Speech at the Trial of Warren Hastings, in The World's Famous Orations, Vol. 6, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_World's_Famous_Orations/Volume_6/At_the_Trial_of_Warren_Hastings"
      },
      {
        "category": "historical",
        "title": "Cicero Prosecutes Verres for Plundering His Province",
        "excerpt": "That which was above all things to be desired, O judges, and which above all things was calculated to have the greatest influence towards allaying the unpopularity of your order, and putting an end to the discredit into which your judicial decisions have fallen, appears to have been thrown in your way, and given to you not by any human contrivance, but almost by the interposition of the gods, at a most important crisis of the republic. For an opinion has now become established, pernicious to us, and pernicious to the republic, which has been the common talk of every one, not only at Rome, but among foreign nations also,—that in the courts of law as they exist at present, no wealthy man, however guilty he may be, can possibly be convicted.",
        "source": "Marcus Tullius Cicero, Against Verres, First Oration, Book 1, section 1 (trans. C. D. Yonge), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0018:text=Ver.:actio=1:book=1:section=1"
      },
      {
        "category": "literary",
        "title": "Athena Founds the Court That Judges the House of Atreus",
        "excerpt": "Hear now my ordinance, people of Attica, as you judge the first trial for bloodshed. In the future, even as now, this court of judges will always exist for the people of Aegeus. And this Hill of Ares, the seat and camp of the Amazons, when they came with an army in resentment against Theseus, and in those days built up this new citadel with lofty towers to rival his, and sacrificed to Ares, from which this rock takes its name, the Hill of Ares: on this hill, the reverence of the citizens, and fear, its kinsman, will hold them back from doing wrong by day and night alike, so long as they themselves do not pollute the laws.",
        "source": "Aeschylus, Eumenides, lines 681–695 (trans. Herbert Weir Smyth), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0006:card=681"
      },
      {
        "category": "literary",
        "title": "Cardinal Wolsey's Fall from Power",
        "excerpt": "Farewell, a long farewell, to all my greatness! This is the state of man: to-day he puts forth The tender leaves of hopes; to-morrow blossoms And bears his blushing honours thick upon him; The third day comes a frost, a killing frost, And when he thinks, good easy man, full surely His greatness is a-ripening, nips his root, And then he falls, as I do. I have ventur'd, Like little wanton boys that swim on bladders, This many summers in a sea of glory; But far beyond my depth. My high-blown pride At length broke under me.",
        "source": "William Shakespeare and John Fletcher, King Henry the Eighth, Act III, Scene 2 (Cardinal Wolsey), Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/1802"
      },
      {
        "category": "artistic",
        "title": "Mozart, La clemenza di Tito — A Ruler Betrayed and the Reckoning of Judgment",
        "excerpt": "Mozart's final opera dramatizes a conspiracy against the Roman emperor Titus: as flames engulf the Capitol, the betrayal by his closest friend Sesto is exposed and the traitor is dragged toward judgment. The urgent, striding chords of the overture and the great first-act finale — a horrified chorus crying out over the burning city — capture a court thrown into crisis by those who abused the ruler's trust. Against the grinding machinery of accusation and sentence, the score finally turns from vengeance to the fragile grandeur of clemency.",
        "source": "Wolfgang Amadeus Mozart, La clemenza di Tito, K.621 (libretto by Caterino Mazzolà after Metastasio), IMSLP",
        "href": "https://imslp.org/wiki/La_clemenza_di_Tito,_K.621_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "Cesare Maccari, Cicero Denounces Catiline in the Roman Senate",
        "excerpt": "Maccari's fresco freezes the moment of public reckoning: Cicero rises mid-oration, arm outstretched, denouncing the conspirator Catiline before the assembled Roman Senate. The accused sits utterly alone on an empty bench, shunned, as rows of senators lean away from him in cold judgment. Marble, shadow, and a single isolating gap turn the chamber itself into an instrument of condemnation.",
        "source": "Cesare Maccari, Cicero Denounces Catiline (Cicerone denuncia Catilina), 1889, fresco, Palazzo Madama, Rome, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Cicero_Denounces_Catiline_in_the_Roman_Senate_by_Cesare_Maccari.png",
        "image": {
          "src": "/covers/philippines-duterte-impeachment-trial--art.png",
          "alt": "Fresco of Cicero standing to denounce Catiline, who sits isolated and shunned on a bench, before the assembled Roman Senate.",
          "credit": "Cesare Maccari, Cicero Denounces Catiline (1889); Palazzo Madama, Rome; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "sk-hynix-us-listing-ai-memory",
    "headline": "SK Hynix launches a $28 billion US share listing to capitalise on AI memory demand",
    "overview": "South Korean chipmaker SK Hynix launched a roughly $28 billion listing of American depositary receipts on the Nasdaq on July 6, 2026, one of the largest share sales on record, as it rides surging demand for AI memory. The company, the world's top supplier of the high-bandwidth memory chips used by Nvidia, plans to use the proceeds to build new fabrication plants and buy equipment. The offering is expected to rank among the biggest ever, trailing only SpaceX's recent record listing.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxQOExMMERoTnlfeUtLdDFoejc3emp1SXBuQ3NHUGk4YndsTjBxamcyYnh5Qmp6ckFrNk4xTGtld1ZNT2NDOVJHZGVwODVfSENhYXA1Qkg3SjhnZnNjTmhmSjg5Y2x5MzhZbWRDU3M1VHhBV0NxdGJqYkg0ZnlUSUEybVVNRm9MN3R2VnBWRHZVN2NTbFZJZjVSVEpaV3k3ZGVGOXg1Rl9Hd0dveVlLMGRYQ0xtQWx3VkM4N3Bmc1p1MmRSMVk?oc=5"
      },
      {
        "name": "Fortune",
        "href": "https://fortune.com/2026/07/05/sk-hynix-stock-us-listing-nasdaq-ai-boom-bust-memory-chip-shortage/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/sk-hynix-us-listing-ai-memory.png",
      "alt": "A green computer memory module lined with black memory chips",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Gold fever seizes Monterey, 1848",
        "excerpt": "The excitement produced was intense; and many were soon busy in their hasty preparations for a departure to the mines. The family who had kept house for me caught the moving infection. Husband and wife were both packing up; the blacksmith dropped his hammer, the carpenter his plane, the mason his trowel, the farmer his sickle, the baker his loaf, and the tapster his bottle.",
        "source": "Walter Colton, The Land of Gold; or, Three Years in California, entry of Tuesday, June 20 [1848], Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/69727/pg69727.txt"
      },
      {
        "category": "historical",
        "title": "The Mississippi Scheme and Law's besieged door",
        "excerpt": "At least three hundred thousand applications were made for the fifty thousand new shares, and Law's house in the Rue de Quincampoix was beset from morning to night by the eager applicants.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, 'The Mississippi Scheme', Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/24518/pg24518.txt"
      },
      {
        "category": "literary",
        "title": "Colonel Sellers' boundless speculation",
        "excerpt": "I've got the biggest scheme on earth--and I'll take you in; I'll take in every friend I've got that's ever stood by me, for there's enough for all, and to spare.",
        "source": "Mark Twain and Charles Dudley Warner, The Gilded Age: A Tale of To-day, Colonel Sellers's letter to Squire Hawkins, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3178/3178-h/3178-h.htm"
      },
      {
        "category": "literary",
        "title": "Mammon dreams of the golden mines",
        "excerpt": "Come on, sir. Now, you set your foot on shore / In Novo Orbe; here's the rich Peru: / And there within, sir, are the golden mines, / Great Solomon's Ophir! he was sailing to't, / Three years, but we have reached it in ten months.",
        "source": "Ben Jonson, The Alchemist, Act II, Scene I (Sir Epicure Mammon), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/4081/4081-h/4081-h.htm"
      },
      {
        "category": "artistic",
        "title": "Puccini's Gold Rush opera: La fanciulla del West",
        "excerpt": "Puccini set his three-act opera in a California mining camp during the 1849 Gold Rush, filling the score with the restless energy of prospectors who have travelled far in search of fortune. Surging, cinematic orchestral color evokes both the miners' longing and the feverish hope of striking it rich on a raw frontier. The drama turns on a strongbox of gold and the community that guards it, a fitting mirror for any age gripped by the promise of sudden wealth.",
        "source": "Giacomo Puccini, La fanciulla del West, SC 78 (libretto by Civinini and Zangarini), IMSLP",
        "href": "https://imslp.org/wiki/La_fanciulla_del_West,_SC_78_(Puccini,_Giacomo)"
      },
      {
        "category": "artistic",
        "title": "Hogarth's 'The South Sea Scheme'",
        "excerpt": "William Hogarth's satirical engraving skewers the speculative frenzy of the 1720 South Sea Bubble, showing crowds thronging a giant merry-go-round of investment while allegorical Honesty is broken on the wheel and Fortune is dismembered. Often called the first editorial cartoon, it captures how a mania for paper riches can seize an entire society. The scene endures as a warning about euphoric investment in the promise of easy, boundless wealth.",
        "source": "William Hogarth, The South Sea Scheme (Emblematical Print on the South Sea Scheme), 1721, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/sk-hynix-us-listing-ai-memory--art.png",
          "alt": "Hogarth's 1721 engraving satirising the South Sea Bubble, with crowds thronging a speculative merry-go-round amid allegorical figures of ruin.",
          "credit": "William Hogarth (1697-1764), 'The South Sea Scheme' (1721), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "southwest-france-wildfire-evacuations",
    "headline": "Thousands evacuated as a wildfire spreads through southwestern France near the Spanish border",
    "overview": "Thousands of people were evacuated in southwestern France on July 6, 2026 as a large wildfire burned through the Aude and Hérault regions near the Spanish border. Around 800 firefighters battled the uncontained blaze, which had scorched hundreds of hectares amid strong winds and drought after a record June heatwave. Many of those evacuated were holidaymakers cleared from campsites in the fire's path.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPbjVhdnhIVGhSckpLUUtKbmFzQ0tOLVNBMVBkLXdpQ1JzbmZCbENGVHZZV1N6ZWpRaE1ZbVlab2U0aFplc3NQdU1paVJYd1RNcVZnU0hXeE0yTFpaSllzbXEyU2EwODJmQ3AyZ1RGNXk2RnVvWHF4MElXTWk1V25yMEItYjcyT2NiT0p5eTc3bzZPWDRiM2plLUFIS2RjRk9wQUVtSFktakxmamhNaGpNV1BJWHE?oc=5"
      },
      {
        "name": "The Connexion",
        "href": "https://www.connexionfrance.com/news/thousands-more-evacuated-as-wildfires-spread-across-southern-france/800278"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/southwest-france-wildfire-evacuations.png",
      "alt": "A wall of flames sweeps through dry brush and trees as a wildfire advances",
      "credit": "The Connexion"
    },
    "edition": "Afternoon Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome under Nero (AD 64)",
        "excerpt": "The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city, with those narrow winding passages and irregular streets, which characterised old Rome.",
        "source": "Tacitus, Annals, Book 15.38 (trans. Church & Brodribb), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15"
      },
      {
        "category": "historical",
        "title": "The Great Fire of London in Pepys's Diary (2 September 1666)",
        "excerpt": "Everybody endeavouring to remove their goods, and flinging into the river or bringing them into lighters that lay off; poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another.",
        "source": "Samuel Pepys, Diary of Samuel Pepys, 2 September 1666, Wikisource",
        "href": "https://en.wikisource.org/wiki/Diary_of_Samuel_Pepys/1666/September"
      },
      {
        "category": "literary",
        "title": "Homer's forest-fire simile in the Iliad",
        "excerpt": "Even as a consuming fire maketh a boundless forest to blaze on the peaks of a mountain, and from afar is the glare thereof to be seen, even so from their innumerable bronze, as they marched forth, went the dazzling gleam up through the sky unto the heavens.",
        "source": "Homer, Iliad, Book 2.455-458 (trans. A. T. Murray), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=2:card=455"
      },
      {
        "category": "literary",
        "title": "Ovid's Phaethon sets the earth ablaze in the Metamorphoses",
        "excerpt": "Great cities perish with their walls, and peopled nations are consumed to dust— the forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book 2 (Phaethon; trans. Brookes More), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=210"
      },
      {
        "category": "artistic",
        "title": "Falla's Ritual Fire Dance from El amor brujo",
        "excerpt": "In the 'Danza ritual del fuego' Manuel de Falla conjures a wildfire in sound: shivering, tremolo strings and a snarling low woodwind theme flicker upward like the first tongues of flame. Driving Andalusian rhythms and stabbing orchestral accents build into a roaring, whirling blaze that seems to leap and consume everything in its path. The music captures both the primal dread of fire and the frenzied dance of trying to master it.",
        "source": "Manuel de Falla, El amor brujo (Danza ritual del fuego / Ritual Fire Dance), IMSLP",
        "href": "https://imslp.org/wiki/El_amor_brujo_(Falla,_Manuel_de)"
      },
      {
        "category": "artistic",
        "title": "Turner's The Burning of the Houses of Lords and Commons",
        "excerpt": "J. M. W. Turner witnessed the 1834 fire that destroyed the Palace of Westminster and painted its terrifying grandeur, a wall of white-gold flame erupting into the night sky and staining the Thames blood-orange. Crowds throng the bridge and riverbank as helpless spectators, dwarfed by a conflagration that dissolves solid stone into light and smoke. The canvas distills the ancient dread of an unstoppable inferno consuming everything before it.",
        "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (Philadelphia Museum of Art), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/southwest-france-wildfire-evacuations--art.png",
          "alt": "Oil painting of the Houses of Parliament engulfed in towering white-gold flames at night, the fire reflected across the Thames as crowds watch from Westminster Bridge.",
          "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (Philadelphia Museum of Art; Google Art Project), public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "un-guterres-ai-governance-children",
    "headline": "UN chief Guterres warns AI is outpacing oversight and urges global rules to protect children",
    "overview": "UN Secretary-General António Guterres warned on July 6, 2026 that artificial intelligence is advancing faster than governments can regulate it, opening the inaugural UN Global Dialogue on AI Governance in Geneva. He called on nations to adopt an 'AI Child Safety Pledge,' demanding that no AI system reach children without child-specific safety testing and independent oversight. A UN scientific panel accompanying the meeting cautioned that unchecked AI could cause catastrophic harm.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPcjZKby1qbWJLdDhkOG0zdUhZSzZoR3Q3a2tpU3J1RTJVMXZudXJWenpVTjU5UWZVcDZLX0RlYjFTZnY5M2RMNWlWRXQ1TkJqQnV5d2tlMHlpVkYzRmdtbUF6X05ObDdfYnR2Y1ptNEthZ1AyQzlCMmI1a1NoUlBPcnJ3elUzNkViWXItX0ZFWTZKTGY1ZWlpbkxKeE5uellvMEVSOEJwS0tHOG5i?oc=5"
      },
      {
        "name": "UN News",
        "href": "https://news.un.org/en/story/2026/07/1167873"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/un-guterres-ai-governance-children.png",
      "alt": "UN Secretary-General António Guterres speaking at a podium",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Prometheus steals fire for mankind",
        "excerpt": "He hid fire; but that the noble son of Iapetus stole again for men from Zeus the counsellor in a hollow fennel-stalk, so that Zeus who delights in thunder did not see it.",
        "source": "Hesiod, Works and Days, ll. 50–52 (trans. Hugh G. Evelyn-White), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/348/348-h/348-h.htm"
      },
      {
        "category": "historical",
        "title": "Daedalus warns Icarus of the middle way",
        "excerpt": "Icarus, I recommend thee to keep the middle tract; lest, if thou shouldst go too low, the water should clog thy wings; if too high, the fire of the sun should scorch them.",
        "source": "Ovid, Metamorphoses, Book VIII, Fable III (trans. Henry T. Riley), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "Frankenstein's creature draws its first breath",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Shelley, Frankenstein, Chapter V, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "literary",
        "title": "The sorcerer's apprentice cannot dismiss the spirits",
        "excerpt": "Ach da kommt der Meister!\nHerr, die Noth ist groß!\nDie ich rief, die Geister,\nWerd' ich nun nicht los.",
        "source": "Johann Wolfgang von Goethe, Der Zauberlehrling (1827), Wikisource",
        "href": "https://de.wikisource.org/wiki/Der_Zauberlehrling_(1827)"
      },
      {
        "category": "artistic",
        "title": "Dukas, L'apprenti sorcier",
        "excerpt": "Dukas's 1897 symphonic scherzo sets Goethe's ballad to music: a bewitched broom, animated by an apprentice who has overreached his master's magic, multiplies unstoppably as skittering bassoons and swelling brass depict a flood he can no longer control. The orchestra surges toward chaos until the returning master breaks the spell. It is a vivid parable in sound of a power that is summoned but cannot be commanded.",
        "source": "Paul Dukas, L'apprenti sorcier (1897), IMSLP",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)"
      },
      {
        "category": "artistic",
        "title": "The maker flees his living creation",
        "excerpt": "Theodor von Holst's steel engraving, the frontispiece to the 1831 edition of Frankenstein, shows the newly animated creature stirring to life as its horrified maker recoils and flees the laboratory. The image fixes the story's central warning: knowledge pursued without wisdom yields a creation its creator can neither govern nor unmake. It became the earliest and most enduring visual emblem of the myth.",
        "source": "Theodor von Holst, Frontispiece to Frankenstein (1831), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Frontispiece_to_Frankenstein_1831.jpg",
        "image": {
          "src": "/covers/un-guterres-ai-governance-children--art.png",
          "alt": "Steel engraving of Victor Frankenstein recoiling in horror as his newly animated creature stirs to life amid a cluttered laboratory.",
          "credit": "Theodor von Holst (1810–1844), engraving for the 1831 edition of Frankenstein; scan via Wikimedia Commons, public domain."
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "neymar-retires-brazil-national-team",
    "headline": "Neymar says he is done playing for Brazil after the team's earliest World Cup exit since 1990",
    "overview": "Neymar, Brazil's all-time leading scorer, said he is finished playing for the national team after Brazil were knocked out of the World Cup in the round of 16 by Norway on July 5, 2026. The defeat, sealed by two Erling Haaland goals, marked Brazil's earliest World Cup exit since 1990. Neymar signalled the emotional farewell in comments after the match.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPTGZsUWF4RHNSUmlfNEgtTURjWlhGQzl2ZVB2ME5oMUc4aUxvMEhJWG5mT1FtRlNwamNtNUg4Z3JmSDZvblprTDU0R0lKSkNDOHZRWll6NF9sQmlyMF8wdXQ4dy1DS2NLeHV1YWlyQWk0SFd0bC1GQTY3OThXamlwWFA4MmRBandjOVhCRFdZLUc4UXpjXzZGMDR1QQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxQZG02RHBVdXM3YTdMN0U0Z2dYdXd1Sm4zd01qbGotQmFoUnpWMnYzNmhnTml1T1pwM2NlMTctZGlpdVlEX1RQOVQ4ZXNWOE94NWtsWVJodWswQ2Z1elpka05rS09RMEdSYXhYMnNwWmpaNEV2RGtPYWRMOTlkM3JnTFFIT2RDcmVmUnU4N1IzSFdVd20ya1FlZVcxNWlPamlHTUVoenhUZFR2bWlMLXhOMTB4QU8?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/neymar-retires-brazil-national-team.png",
      "alt": "The forward Neymar in a yellow Brazil jersey during an international match",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Scipio Africanus, victor over Hannibal, retires to Liternum from an ungrateful country",
        "excerpt": "He passed his life at Liternum without any wish to return to the City ... it is said that on his death-bed he gave orders that he should be buried and his monument set up there, so that there might be no funeral rites performed for him by his ungrateful country.",
        "source": "Livy, History of Rome, Book 38.53 (Roberts translation), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0144:book%3D38:chapter%3D53"
      },
      {
        "category": "historical",
        "title": "The death of Hannibal in exile, the great warrior bowing off the stage",
        "excerpt": "\"Let us,\" he said, \"relieve the Romans from the anxiety they have so long experienced, since they think it tries their patience too much to wait for an old man's death.\" ... he drained the cup. Such was the close of Hannibal's life.",
        "source": "Livy, History of Rome, Book 39.51 (Roberts translation), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0144:book%3D39:chapter%3D51"
      },
      {
        "category": "literary",
        "title": "Hector resolves to fall doing some great deed",
        "excerpt": "My doom has come upon me; let me not then die ingloriously and without a struggle, but let me first do some great thing that shall be told among men hereafter.",
        "source": "Homer, The Iliad, Book 22 (Butler translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0217:book%3D22"
      },
      {
        "category": "literary",
        "title": "Othello bids farewell to the soldier's life",
        "excerpt": "O, now, for ever / Farewell the tranquil mind! Farewell content! / Farewell the plumed troops and the big wars / That make ambition virtue! ... Othello's occupation's gone!",
        "source": "William Shakespeare, Othello, Act 3, Scene 3, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1531/pg1531.txt"
      },
      {
        "category": "artistic",
        "title": "The funeral march for a fallen hero (Beethoven's Eroica)",
        "excerpt": "Beethoven's Third Symphony, the 'Eroica,' turns at its second movement into a vast Marcia funebre, a funeral march for a fallen hero. Over a trudging bass the strings intone a grief-laden dirge that swells to a blazing climax before collapsing into broken, halting fragments, as if the music itself can no longer go on. It is the sound of greatness laid to rest, glory sinking into mourning.",
        "source": "Ludwig van Beethoven, Symphony No. 3 in E-flat major, Op. 55 'Eroica,' II. Marcia funebre, IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "The Fighting Temeraire towed to the breaker's yard",
        "excerpt": "Turner shows the once-mighty warship Temeraire, a hero of Trafalgar, ghost-pale and tall-masted, being towed by a squat black steam tug toward the breaker's yard. A blazing sunset floods the sky, at once a glorious farewell salute and the melancholy close of the age of sail. The great veteran, stripped of her guns and her glory, is led quietly off the stage of history.",
        "source": "J. M. W. Turner, The Fighting Temeraire, 1839 (National Gallery, London), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg",
        "image": {
          "src": "/covers/neymar-retires-brazil-national-team--art.png",
          "alt": "Turner's painting of the pale warship Temeraire towed by a dark steam tug across the Thames beneath a fiery sunset",
          "credit": "J. M. W. Turner (1775-1851), The Fighting Temeraire (1839), National Gallery, London; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "memphis-national-guard-shooting",
    "headline": "National Guard troops on patrol in Memphis fatally shoot an armed man during a downtown pursuit",
    "overview": "Two Tennessee National Guard members assigned to a federal crime-fighting patrol in Memphis fatally shot a man during a downtown foot pursuit early on July 5, 2026, police said. Authorities identified the man as 20-year-old Tyrin Johnson and said the soldiers opened fire after he turned toward them with a gun while they responded to reports of gunshots. The state bureau of investigation is reviewing the shooting, which drew fresh scrutiny of the Guard deployment ordered by President Trump.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQUDBkWnRWWDB2MlY5S0RjU1lvc0FoYjQwaE1kTEFvOFFUQ0hVWnhHTmNYOVVxYlJYeFlxZndtTnZjYWphUTV2SWo5emxOcHk1UWxhSnRtTVpIei1sR3NzVXJlWnNxQ09NSXpCczJiNXBqOUVIR1JtNFEtbGpncnhTUkt0VVBNTjZSX01HN2VrZDBVYUVPNGN2bW5QTXYtSnBCYzU4?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/05/us/memphis-national-guard-shooting-death-hnk"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/memphis-national-guard-shooting.png",
      "alt": "A deserted downtown street at night under the cold glare of streetlights",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "A Grievance Against Standing Armies (Declaration of Independence, 1776)",
        "excerpt": "He has kept among us, in times of peace, Standing Armies without the Consent of our legislatures. He has affected to render the Military independent of and superior to Civil power.",
        "source": "Thomas Jefferson et al., United States Declaration of Independence (engrossed copy), Wikisource",
        "href": "https://en.wikisource.org/wiki/United_States_Declaration_of_Independence_(engrossed_copy)"
      },
      {
        "category": "historical",
        "title": "Soldiers Loosed Upon the City (Tacitus, Histories 1.85)",
        "excerpt": "the soldiers, though they made no concerted disturbance, had dispersed themselves in disguise about private houses, and exercised a malignant surveillance over all whom exalted rank, or distinction of any kind, exposed to injurious reports.",
        "source": "Tacitus, The Histories, Book 1.85 (Church and Brodribb translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0080%3Abook%3D1%3Achapter%3D85"
      },
      {
        "category": "literary",
        "title": "The Bayonets of Peterloo (Shelley, The Masque of Anarchy)",
        "excerpt": "Let the fixèd bayonet / Gleam with sharp desire to wet / Its bright point in English blood / Looking keen as one for food.",
        "source": "Percy Bysshe Shelley, The Masque of Anarchy (written on the Peterloo Massacre, 1819), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Masque_of_Anarchy"
      },
      {
        "category": "literary",
        "title": "The Soldier's Sigh on the City Walls (Blake, 'London')",
        "excerpt": "How the chimney-sweeper's cry / Every blackening church appals, / And the hapless soldier's sigh / Runs in blood down palace-walls.",
        "source": "William Blake, 'London' (Songs of Experience), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1934/pg1934.txt"
      },
      {
        "category": "artistic",
        "title": "Beethoven's Egmont: Music of Occupation and Liberty",
        "excerpt": "Beethoven's overture opens with the heavy, grinding tread of the Duke of Alba's occupying Spanish forces, a sombre sarabande rhythm that presses down on a subject city like boots in the street. Against that oppression a pleading, human voice rises in the strings and woodwinds, straining toward freedom until the music is cut short by a hushed, sudden silence marking the hero's execution. Then a blazing victory fanfare erupts, transforming martial force into a cry of liberation and civic defiance.",
        "source": "Ludwig van Beethoven, Egmont, Op. 84 (Overture), IMSLP",
        "href": "https://imslp.org/wiki/Egmont,_Op.84_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Goya, The Third of May 1808",
        "excerpt": "Goya paints the moment troops turn their guns on the people of an occupied city: a rank of faceless soldiers, rifles raised in mechanical unison, fire point-blank at unarmed civilians in the dark. At the center a man in a white shirt throws his arms wide in terror and defiance before the muzzles, while the bloodied dead already heap at his feet. It is the definitive image of martial power loosed in the streets and the fragile human body set against it.",
        "source": "Francisco de Goya, The Third of May 1808 (1814), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/memphis-national-guard-shooting--art.png",
          "alt": "A firing squad of faceless soldiers levels rifles at close range on a group of terrified civilians at night; a man in a white shirt flings his arms wide before the guns as the bloodied dead lie at his feet.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado, Madrid; public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "australia-fiji-defence-pact",
    "headline": "Australia and Fiji sign a mutual defence pact aimed at countering China in the Pacific",
    "overview": "Australia and Fiji signed a new mutual defence treaty on July 6, 2026, deepening security ties as Canberra seeks to counter China's growing influence across the Pacific. The pact commits the two nations to closer military cooperation and comes amid heightened regional anxiety over Beijing's expanding reach. It was announced the same day China test-fired a missile into the South Pacific.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/search?q=Australia%20signs%20defence%20alliance%20Fiji%20counter%20China&hl=en-US&gl=US&ceid=US:en"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/search?q=Australia%20Fiji%20mutual%20defense%20pact%20Pacific%20China&hl=en-US&gl=US&ceid=US:en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/australia-fiji-defence-pact.png",
      "alt": "Two clasped hands over a map of the Pacific at dusk, symbolising a new alliance",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Delian League: allies bound against the Persian king",
        "excerpt": "The Athenians having thus succeeded to the supremacy by the voluntary act of the allies through their hatred of Pausanias, fixed which cities were to contribute money against the barbarian, which ships; their professed object being to retaliate for their sufferings by ravaging the king's country. Now was the time that the office of 'Treasurers for Hellas' was first instituted by the Athenians. These officers received the tribute, as the money contributed was called. The tribute was first fixed at four hundred and sixty talents. The common treasury was at Delos, and the congresses were held in the temple.",
        "source": "Thucydides, History of the Peloponnesian War, Book 1.96 (Crawley translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book=1:chapter=96"
      },
      {
        "category": "historical",
        "title": "The Federal Charter of 1291: three valleys sworn to mutual defence",
        "excerpt": "know all men, that the people of the valley of Uri, the democracy of the valley of Schwiz, and the community of the mountaineers of the Lower Valley ... seeing the malice of the age, in order that they may better defend themselves and their own, and better preserve them in proper condition, have promised in good faith to assist each other with aid, with every counsel and every favor, with person and goods, within the valleys and without, with might and main, against one and all, who may inflict upon any one of them any violence, molestation or injury, or may plot any evil against their persons or goods. And in every case each community has promised to succour the other when necessary, at its own expense, as far as needed in order to withstand the attacks of evil-doers, and to avenge injuries.",
        "source": "The Federal Charter of 1291, in W. D. McCrackan, The Rise of the Swiss Republic, Book 2, Chapter 5, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Rise_of_the_Swiss_Republic/Book_2/Chapter_5"
      },
      {
        "category": "literary",
        "title": "The Ruetli Oath in Schiller's William Tell",
        "excerpt": "Swear we the oath of our confederacy! A band of brothers true we swear to be, Never to part in danger or in death! ... We swear we will be free as were our sires, And sooner die than live in slavery!",
        "source": "Friedrich Schiller, Wilhelm Tell, Act II (trans. Sir Theodore Martin), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2782/pg2782.txt"
      },
      {
        "category": "literary",
        "title": "'All for one, one for all' - the Musketeers' oath",
        "excerpt": "'All for one, one for all-that is our motto, is it not?' ... 'Hold out your hand and swear!' cried Athos and Aramis at once. Overcome by example, grumbling to himself, nevertheless, Porthos stretched out his hand, and the four friends repeated with one voice the formula dictated by D'Artagnan.",
        "source": "Alexandre Dumas, The Three Musketeers (English translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1257/pg1257.txt"
      },
      {
        "category": "artistic",
        "title": "Rossini's Guillaume Tell: an opera of confederate revolt",
        "excerpt": "Rossini's final opera dramatises the legendary Swiss uprising against Habsburg tyranny, culminating in the cantons' vow to stand together for their freedom. Its celebrated overture builds from a hushed dawn through a pastoral calm to a galloping call to arms, mirroring scattered communities gathering into a single armed cause. The grand choral tableaux of oath and confederation make the score a musical monument to small peoples binding themselves in common defence against a dominant power.",
        "source": "Gioachino Rossini, Guillaume Tell (1829), IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Guillaume_Tell_(Rossini,_Gioachino)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Oath of the Horatii",
        "excerpt": "David's 1784 canvas shows three brothers stretching their arms toward their father, who raises their swords aloft, as they swear to defend Rome even unto death. The rigid, unified gesture of the oath - three bodies fused to a single common cause - became the era's defining image of solidarity pledged against an external foe. Its austere grandeur transforms a private vow into a public compact of collective duty.",
        "source": "Jacques-Louis David, Le Serment des Horaces (The Oath of the Horatii), 1784, Musee du Louvre - Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David-Oath_of_the_Horatii-1784.jpg",
        "image": {
          "src": "/covers/australia-fiji-defence-pact--art.png",
          "alt": "Three Roman brothers raise their arms in a unified salute toward their father, who holds three swords aloft, as they swear a common oath.",
          "credit": "Jacques-Louis David, The Oath of the Horatii (1784), Musee du Louvre. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "atlas-robot-world-cup-ball",
    "headline": "Hyundai's Atlas humanoid robot delivers the match ball at a World Cup game",
    "overview": "Boston Dynamics' Atlas humanoid robot, owned by Hyundai, delivered the match ball before the World Cup round-of-16 match between Brazil and Norway at a New Jersey stadium on July 5, 2026. Emerging from the players' tunnel before a crowd of about 80,000, the robot handed over the ball and mimicked several players' goal celebrations. Hyundai, the tournament's official robotics partner, billed it as the first live robotics activation at a World Cup.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQSVMyeHgtTGpoYnN3R1NlSldlTkxBRDF6V3FXZm1lMExZWWRIcm8yb1lRLXNTRDRFZ2pHM1p6V1BEUW1BdUg2TlA2OFJsSk4ta3R2cVpyd2FYRkZkSlBNQ2xFNzhJWFd1YW1aV2wxZ0o3S25VS2tSTnZkZ3Vjdnd1TmtNNGo0aHJoVk5veXBBVU1RdkxPY080M0Y1Y2hVa0tVNXc?oc=5"
      },
      {
        "name": "Fortune",
        "href": "https://fortune.com/2026/07/05/humanoid-robot-delivered-game-ball-brazil-norway-world-cup-match-fifa-boston-dynamics-hyundai/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/atlas-robot-world-cup-ball.png",
      "alt": "A white humanoid robot balances a soccer ball on its hand at the mouth of a stadium tunnel",
      "credit": "Fortune"
    },
    "edition": "Afternoon Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Homer's golden handmaidens, automata that walk and think",
        "excerpt": "but there moved swiftly to support their lord handmaidens wrought of gold in the semblance of living maids. In them is understanding in their hearts, and in them speech and strength, and they know cunning handiwork by gift of the immortal gods.",
        "source": "Homer, Iliad, Book 18 (trans. A. T. Murray), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18:card=388"
      },
      {
        "category": "historical",
        "title": "Talos, the bronze giant who strode round Crete",
        "excerpt": "And Talos, the man of bronze, as he broke off rocks from the hard cliff, stayed them from fastening hawsers to the shore, when they came to the roadstead of Dicte's haven. He was of the stock of bronze, of the men sprung from ash-trees, the last left among the sons of the gods; and the son of Cronos gave him to Europa to be the warder of Crete and to stride round the island thrice a day with his feet of bronze.",
        "source": "Apollonius Rhodius, Argonautica, Book 4 (trans. R. C. Seaton), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/830/830-h/830-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid's Pygmalion: ivory quickened into flesh",
        "excerpt": "He felt it verrye flesh in deede. By laying on his thumb, He felt her pulses beating. Then he stood no longer dumb But thanked Venus with his hart, and at the length he layd His mouth to hers who was as then become a perfect mayd. Shee felt the kisse, and blusht therat: and lifting fearefully Hir eyelidds up, hir Lover and the light at once did spye.",
        "source": "Ovid, Metamorphoses, Book 10 (trans. Arthur Golding, 1567), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0074:book=10:card=243"
      },
      {
        "category": "literary",
        "title": "Hoffmann's Olympia, the automaton revealed as a lifeless doll",
        "excerpt": "Nathaniel stood paralysed; he had seen but too plainly that Olympia's waxen, deadly pale countenance had no eyes, but black holes instead—she was, indeed, a lifeless doll.",
        "source": "E. T. A. Hoffmann, The Sandman (trans. John Oxenford), in Tales from the German, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/32046/32046-h/32046-h.htm"
      },
      {
        "category": "artistic",
        "title": "Delibes's Coppélia, the mechanical dancing doll",
        "excerpt": "Léo Delibes's 1870 ballet Coppélia turns on Dr. Coppélius and his life-sized mechanical dancing doll, so convincingly human that young Franz is smitten with her at her window. The score gives the automaton her own stiff, wind-up music, and the doll appears to come to life and dance before the ruse is exposed. It remains the nineteenth century's most beloved staging of the uncanny living machine as public spectacle.",
        "source": "Léo Delibes, Coppélia (ballet, 1870), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Copp%C3%A9lia_(Delibes,_L%C3%A9o)"
      },
      {
        "category": "artistic",
        "title": "Gérôme's Pygmalion and Galatea",
        "excerpt": "Jean-Léon Gérôme's Pygmalion and Galatea depicts the very instant the sculptor's ivory statue turns to warm flesh: her upper body flushes with life and bends to return his kiss while her feet are still cold, pale stone. The painting freezes the threshold between made object and living being, with wonder and disbelief on the sculptor's upturned face. It is the archetypal image of a human-crafted figure quickening into a moving, embracing body.",
        "source": "Jean-Léon Gérôme, Pygmalion and Galatea (ca. 1890), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me,_Pygmalion_and_Galatea,_ca._1890.jpg",
        "image": {
          "src": "/covers/atlas-robot-world-cup-ball--art.png",
          "alt": "Painting of the sculptor Pygmalion embracing his ivory statue Galatea as her body turns from white stone into living flesh.",
          "credit": "Jean-Léon Gérôme, Pygmalion and Galatea, ca. 1890, oil on canvas, The Metropolitan Museum of Art (Gift of Louis C. Raegner, 1927); public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "bob-design-surrey-street-market",
    "headline": "Bob Design and Croydon art students give London's 750-year-old Surrey Street Market a new identity",
    "overview": "The graphic-design studio Bob Design worked with students from Croydon School of Art to create a new visual identity for Surrey Street Market in Croydon, one of London's oldest markets with roughly 750 years of history. The refresh centres on quirky collaged pictograms, a bespoke typeface, wayfinding and street furniture meant to celebrate the market's heritage and traders. The project was profiled by It's Nice That on July 6, 2026.",
    "genre": "Culture",
    "sources": [
      {
        "name": "It's Nice That",
        "href": "https://www.itsnicethat.com/articles/bob-design-croydon-school-of-art-surrey-market-graphic-design-architecture-project-060726"
      },
      {
        "name": "Croydon Council Newsroom",
        "href": "https://news.croydon.gov.uk/community-creates-new-vision-for-historic-surrey-street/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/bob-design-surrey-street-market.png",
      "alt": "Bold white pictograms of market-goers pasted across the shutters of Surrey Street Market",
      "credit": "It's Nice That"
    },
    "edition": "Afternoon Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Roman forum as a map of buyers and sellers",
        "excerpt": "He who desires to meet with a perjured fellow, let him go into the courts of law; he who wants a liar and a braggart, near the rites of Cloacina. The rich and erring husbands seek you at the magisterial halls of the Basilica.",
        "source": "Plautus, Curculio (The Forgery), Act 4, Scene 1 (Henry Thomas Riley translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0099:act%3D4:scene%3D1"
      },
      {
        "category": "historical",
        "title": "The clamour of a London street-market on a Saturday night",
        "excerpt": "The tumult of the thousand different cries of the eager dealers, all shouting at the top of their voices, at one and the same time, is almost bewildering. 'So-old again,' roars one. 'Chestnuts all 'ot, a penny a score,' bawls another.",
        "source": "Henry Mayhew, London Labour and the London Poor, Vol. 1, 'Of the London Street-Markets on a Saturday Night', Project Gutenberg",
        "href": "https://www.gutenberg.org/files/55998/55998-h/55998-h.htm"
      },
      {
        "category": "literary",
        "title": "Chaucer's guildsmen, tradesmen of the town",
        "excerpt": "An HABERDASSHERE and a CARPENTER, / A WEBBE, a DYERE, and a TAPYCER,– / And they were clothed alle in o lyveree / Of a solempne and a greet fraternitee. / Ful fressh and newe hir geere apiked was; / Hir knyves were chaped noght with bras, / But al with silver; wroght ful clene and weel, / Hire girdles and hir pouches everydeel. / Wel semed ech of hem a fair burgeys / To sitten in a yeldehalle on a deys.",
        "source": "Geoffrey Chaucer, The Canterbury Tales, The General Prologue (Middle English), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Canterbury_Tales_(unsourced)/General_Prologue"
      },
      {
        "category": "literary",
        "title": "Covent Garden market waking with the city",
        "excerpt": "Covent-garden market, and the avenues leading to it, are thronged with carts of all sorts, sizes, and descriptions, from the heavy lumbering waggon, with its four stout horses, to the jingling coster-monger's cart with its consumptive donkey. The pavement is already strewed with decayed cabbage-leaves, broken hay-bands, and all the indescribable litter of a vegetable market, and the numerous noises are almost as multifarious—men shouting, carts backing, horses neighing, boys fighting, basket-women talking, piemen expatiating on the excellence of their pastry, donkeys braying, and a hundred other sounds.",
        "source": "Charles Dickens, Sketches by Boz, 'The Streets—Morning', Wikisource",
        "href": "https://en.wikisource.org/wiki/Sketches_by_Boz/The_streets_-_morning"
      },
      {
        "category": "artistic",
        "title": "Stravinsky's Shrovetide Fair, a marketplace made of sound",
        "excerpt": "Stravinsky opens his ballet with 'The Shrovetide Fair,' a teeming St. Petersburg marketplace rendered entirely in sound. Barrel-organ tunes, competing street-vendors' cries and swirling folk melodies pile up into a bustling collage, capturing the timeless clamour of buyers and sellers thronging a public square. The orchestra becomes the crowd itself, a restless snapshot of the fairground's energy.",
        "source": "Igor Stravinsky, Petrushka (1911), Scene 1: The Shrovetide Fair, IMSLP",
        "href": "https://imslp.org/wiki/Petrushka,_K012_(Stravinsky,_Igor)"
      },
      {
        "category": "artistic",
        "title": "Aertsen's monumental market stall",
        "excerpt": "Pieter Aertsen's 'Market Scene' fills the foreground with a monumental heap of produce, poultry and wares, the goods themselves crowding the viewer as if leaning off a stall. A pioneer of the market genre, Aertsen celebrates the abundance and daily commerce of the sixteenth-century marketplace. Vendor and buyer meet amid the plenty, an image of the market as the well-stocked heart of civic life.",
        "source": "Pieter Aertsen, Market Scene, c. 1550, Wallraf-Richartz Museum, Cologne (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Aertsen_-_Market_Scene_-_WGA0062.jpg",
        "image": {
          "src": "/covers/bob-design-surrey-street-market--art.png",
          "alt": "Pieter Aertsen's oil painting 'Market Scene' showing a market stall laden with vegetables, fruit, poultry and other produce crowding the foreground.",
          "credit": "Pieter Aertsen, Market Scene (c. 1550), Wallraf-Richartz Museum, Cologne. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "russia-kyiv-strike-apartments",
    "headline": "Russian missile and drone barrage on Kyiv kills at least six and collapses part of an apartment block",
    "overview": "Russia launched waves of missiles and drones at Kyiv overnight into July 6, 2026, killing at least six people and injuring many more, according to Ukrainian officials. A residential high-rise in the Podilskyi district partially collapsed, trapping residents as rescuers dug through the rubble. The barrage struck several districts of the capital in successive waves through the early morning.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxOVHY0emVJd3h3VUdFQlJhMWNwckpjWGU4M2pvWmgxazFCNF9mWnhqeWhVS0RDbjFsSmVpZVZ6NUpkWlBNbk5OeG40a3JoOXVzb2thM1ZKWHJRQk5kTGU4d3ROYnhKUEhjOE5zR21fWlJrNWN3TXMxeENqaFdOa1BPMThtZFZlWjZWaElqTDNYWk8xcG5kblE4cW9ZeDRpTmZj?oc=5"
      },
      {
        "name": "The Kyiv Independent",
        "href": "https://kyivindependent.com/russian-attack-july-6/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/russia-kyiv-strike-apartments.png",
      "alt": "Firefighters search a smoke-filled yard of burnt-out cars and rubble beneath a shattered apartment block in Kyiv",
      "credit": "State Emergency Service of Ukraine via The Kyiv Independent"
    },
    "lead": true,
    "edition": "Morning Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Sack of Mycalessus",
        "excerpt": "The Thracians bursting into Mycalessus sacked the houses and temples, and butchered the inhabitants, sparing neither youth nor age, but killing all they fell in with, one after the other, children and women, and even beasts of burden, and whatever other living creatures they saw... Everywhere confusion reigned and death in all its shapes; and in particular they attacked a boys' school, the largest that there was in the place, into which the children had just gone, and massacred them all.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII (Crawley translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_7"
      },
      {
        "category": "historical",
        "title": "The Burning of Jerusalem",
        "excerpt": "The flame was also carried a long way, and made an echo, together with the groans of those that were slain; and because this hill was high, and the works at the temple were very great, one would have thought the whole city had been on fire.",
        "source": "Josephus, The War of the Jews, Book VI (Whiston translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_War_of_the_Jews/Book_VI"
      },
      {
        "category": "literary",
        "title": "The Fall of Troy (Aeneid, Book II)",
        "excerpt": "The palace of Deiphobus ascends / In smoky flames, and catches on his friends. / Ucalegon burns next: the seas are bright / With splendor not their own, and shine with Trojan light.",
        "source": "Virgil, Aeneid, Book II (Dryden translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=2:card=298"
      },
      {
        "category": "literary",
        "title": "The War in the Air",
        "excerpt": "Then blinding flames squirted out in all directions from the point of impact... In this manner the massacre of New York began. She was the first of the great cities of the Scientific Age to suffer by the enormous powers and grotesque limitations of aerial warfare.",
        "source": "H. G. Wells, The War in the Air (1908), Chapter VI: How War Came to New York",
        "href": "https://americanliterature.com/author/hg-wells/book/the-war-in-the-air/chapter-vi-how-war-came-to-new-york"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture, Op. 49",
        "excerpt": "Tchaikovsky's thunderous festival overture stages the defense of a capital as pure sound: a solemn Orthodox hymn is swallowed up by surging strings, blaring brass and the crash of live cannon fire. The churning battle themes mimic a city under bombardment, mounting toward a deafening climax of artillery and pealing bells. What begins in quiet prayer ends in a roar of destruction and defiance.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 (1880), IMSLP",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "John Martin, The Destruction of Sodom and Gomorrah",
        "excerpt": "John Martin's vast canvas shows two cities annihilated by fire falling from the heavens, the sky torn by lightning above a furnace-red horizon. Tiny human figures flee across the foreground as their homes dissolve into an inferno of smoke and flame. The apocalyptic vision of destruction raining down from above turns an ancient catastrophe into a timeless image of terror from the sky.",
        "source": "John Martin, The Destruction of Sodom and Gomorrah (1852), Laing Art Gallery, Newcastle upon Tyne",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_Sodom_and_Gomorrah.jpg",
        "image": {
          "src": "/covers/russia-kyiv-strike-apartments--art.png",
          "alt": "Fire and lightning rain from a stormy sky onto two doomed cities as tiny figures flee the spreading inferno.",
          "credit": "John Martin, The Destruction of Sodom and Gomorrah (1852); Laing Art Gallery, Newcastle upon Tyne; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "opec-plus-oil-output-increase",
    "headline": "OPEC+ producers agree to another monthly oil output increase as crude prices slide",
    "overview": "Eight OPEC+ countries agreed on July 5, 2026 to raise their oil production again the following month, pressing on with a strategy to reclaim market share even as crude prices fell. Oil slipped after the decision amid concerns about oversupply. The move extends a run of output increases by the group led by Saudi Arabia and Russia.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNUUt5T2hYa3VMNTRLSEI4Nm1RMVFLazlrWmxPb1RVRGJGaDZ1SjdkNzlIZmtPVFI4bTg0b2ZrcW9namNyVEFza05CQ2dzMGtGLVFNbnZGSmhaOG5wekg5anN4ejVScmREbUFMWVd4VVZULVV3dmstWjdaSVY3YzIybGNiLURGQno2TE5rbzN3Wi0yNWtwZlJmdjRWUVBiNWQxRkE?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxPZkI2QThocHlWRUVKSHgtb2N1WmlUX2hDQ3MxZloycVItY3d4N2Nub2FTbWYzd1hPTlZXa2VPdEhfTGgxU2g3UlBrS0VvemRZTnI2SU9HZklMOEt4d2h1U1U2ZkpZT3dscE5SRzMtTHNqVXRGcy0yaWdXU3JxemdJRWNITEhVSkFSQnV0dnhKWlJWcF8xVWhNb0k4M1FaMDNtaHc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/opec-plus-oil-output-increase.png",
      "alt": "Rows of oil derricks and pumpjacks silhouetted against a hazy orange dusk sky",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thales corners the olive-presses (Aristotle's Politics)",
        "excerpt": "...he raised a small sum of money and paid round deposits for the whole of the olive-presses in Miletus and Chios, which he hired at a low rent as nobody was running him up; and when the season arrived, there was a sudden demand for a number of presses at the same time, and by letting them out on what terms he liked he realized a large sum of money.",
        "source": "Aristotle, Politics 1.1259a (trans. H. Rackham), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0058%3Abook%3D1%3Asection%3D1259a"
      },
      {
        "category": "historical",
        "title": "Rockefeller's design to control the oil business (Ida Tarbell)",
        "excerpt": "He meant to control the oil business. By one manœuvre, and that a discredited one, he had obtained control of one-fifth of the entire refining output of the United States. He meant to secure the other four-fifths.",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company (1904), Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/60692"
      },
      {
        "category": "literary",
        "title": "\"We can corner the market!\" (Frank Norris, The Pit)",
        "excerpt": "Jadwin sprang forward, gripping the broker by the shoulder. \"Sam,\" he shouted, \"do you know—great God!—do you know what this means? Sam, we can corner the market!\"",
        "source": "Frank Norris, The Pit: A Story of Chicago (1903), Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/4382"
      },
      {
        "category": "literary",
        "title": "Joseph stores the grain of the plenteous years (Genesis 41)",
        "excerpt": "And let them gather all the food of those good years that come, and lay up corn under the hand of Pharaoh, and let them keep food in the cities. And that food shall be for store to the land against the seven years of famine, which shall be in the land of Egypt; that the land perish not through the famine.",
        "source": "Genesis 41:35–36 (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "Gounod, \"Song of the Golden Calf\" from Faust",
        "excerpt": "In Gounod's Faust, Méphistophélès leaps up and sings \"Le veau d'or est toujours debout\"—the Golden Calf still stands—while the crowd whirls around him in worship of gold. The mocking, stamping refrain casts humankind's craving for wealth as an idol before which whole nations bow down. It is opera's most cynical hymn to the power of a single coveted commodity to rule the world.",
        "source": "Charles Gounod, Faust (1859), \"Le veau d'or\" (Méphistophélès's Song of the Golden Calf), Act II, IMSLP",
        "href": "https://imslp.org/wiki/Faust_(Gounod,_Charles)"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Adoration of the Golden Calf",
        "excerpt": "Poussin sets the Israelites dancing in a ring around the gleaming idol they have raised on a plinth, abandoning themselves to the worship of gold while Moses is still on the mountain. The swirling, sunlit revel turns a whole people's devotion toward a single glittering object. It is the archetypal image of a society in thrall to a coveted commodity.",
        "source": "Nicolas Poussin, The Adoration of the Golden Calf (c. 1633–34), The National Gallery, London",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_The_Adoration_of_the_Golden_Calf_-_WGA18293.jpg",
        "image": {
          "src": "/covers/opec-plus-oil-output-increase--art.png",
          "alt": "Nicolas Poussin's painting The Adoration of the Golden Calf: a crowd of Israelites dances in a ring around a golden calf raised on a plinth beneath a stormy sky.",
          "credit": "Nicolas Poussin, The Adoration of the Golden Calf (c. 1633–34); The National Gallery, London; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "samsung-ai-memory-record-profit",
    "headline": "Samsung forecasts a record quarterly profit, roughly 18 times higher, on surging AI memory demand",
    "overview": "Samsung Electronics is expected to report an operating profit for the second quarter of 2026 roughly 18 times higher than a year earlier, reaching a record level, analysts said on July 5, 2026. The surge is driven by an AI-fuelled shortage of memory chips, with prices for high-bandwidth memory, DRAM and NAND climbing sharply. The company issues its preliminary earnings guidance in the days ahead.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQdGJMNzJxUHljaTQ1aDhlVHRYUEQ5WVZOX0xOallVeUNlR0E2cHFSeEh6S2tzZ0VWXzdrY1B3czNRanpQTk5fNmhtTlE0TmtiYmRwOE9VQ05Cd2VaSVpIY2pVa29YM3FLQ0ZIOXNUVGxyUGdaNjNlQUZSOXVibEZYalk0a0pnbWlvc0pSaGd1bVdSUXl0NVpNNlMzMF84RkZJQ0hyMWxQUnA2Tjh2b0RhZW5Yb0M4d1Y0cVdr?oc=5"
      },
      {
        "name": "InvestingLive",
        "href": "https://investinglive.com/stocks/samsung-set-for-18-fold-profit-jump-as-ai-memory-demand-surges-20260705/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/samsung-ai-memory-record-profit.png",
      "alt": "A mirror-bright silicon wafer standing beside a stack of black memory chips under cool clean-room light",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Discovery of Gold in California",
        "excerpt": "By this sudden discovery of the gold, all my great plans were destroyed. Had I succeeded for a few years before the gold was discovered, I would have been the richest citizen on the Pacific shore; but it had to be different. Instead of being rich, I am ruined.",
        "source": "John A. Sutter, memoir in Hutchings' California Magazine (1857)",
        "href": "https://sfmuseum.org/hist2/gold.html"
      },
      {
        "category": "historical",
        "title": "The Tulipomania (Mackay, Extraordinary Popular Delusions)",
        "excerpt": "In 1634, the rage among the Dutch to possess them was so great that the ordinary industry of the country was neglected, and the population, even to its lowest dregs, embarked in the tulip trade. Nobles, citizens, farmers, mechanics, sea-men, footmen, maid-servants, even chimney-sweeps and old clothes-women, dabbled in tulips.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), Wikisource",
        "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_3"
      },
      {
        "category": "literary",
        "title": "Eldorado",
        "excerpt": "Gaily bedight,\nA gallant knight,\nIn sunshine and in shadow,\nHad journeyed long,\nSinging a song,\nIn search of Eldorado.",
        "source": "Edgar Allan Poe, Eldorado (1849), Wikisource",
        "href": "https://en.wikisource.org/wiki/Eldorado"
      },
      {
        "category": "literary",
        "title": "Sonnet 30 (\"When to the sessions of sweet silent thought\")",
        "excerpt": "When to the sessions of sweet silent thought\nI summon up remembrance of things past,",
        "source": "William Shakespeare, Sonnet 30 (1609), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1041/pg1041.txt"
      },
      {
        "category": "artistic",
        "title": "Wagner, Das Rheingold — the coveted gold of the Rhine",
        "excerpt": "The orchestral prelude rises from a single sustained E-flat, its slowly unfurling arpeggios evoking the depths of the Rhine, where the Rhinemaidens guard a hoard of gold. When the dwarf Alberich renounces love to seize that gold and forge a ring of boundless power, Wagner sets in motion an entire four-opera cycle about coveted treasure and the catastrophe it invites. It is music as a parable of the frenzy that gold kindles in all who would possess it.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (1869), IMSLP",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Dante Gabriel Rossetti, Mnemosyne",
        "excerpt": "Rossetti depicts Mnemosyne, the Greek goddess of Memory and mother of the Muses, as a stately figure in shimmering green robes. In one hand she raises a golden lamp—the lamp of remembrance—while a burning brazier smolders at her feet. The painting renders memory itself as something precious and jealously kept, a fitting emblem for an age that prizes the storing and recalling of information.",
        "source": "Dante Gabriel Rossetti, Mnemosyne (1876–1881), oil on canvas",
        "href": "https://commons.wikimedia.org/wiki/File:Mnemosyne_(color)_Rossetti.jpg",
        "image": {
          "src": "/covers/samsung-ai-memory-record-profit--art.png",
          "alt": "Dante Gabriel Rossetti's painting Mnemosyne: a woman in green robes holding aloft a golden lamp of memory, a brazier burning before her.",
          "credit": "Dante Gabriel Rossetti, Mnemosyne (1876–1881); public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "easyjet-castlelake-takeover",
    "headline": "easyJet agrees to a £5.2 billion takeover by US investment firm Castlelake",
    "overview": "The British budget airline easyJet said on July 5, 2026 that it was ready to accept a sweetened takeover offer worth about £5.2 billion (roughly $7.3 billion) from the US private-credit firm Castlelake. The 690-pence-a-share cash bid is the fifth and highest since Castlelake disclosed its interest in late May. The two sides extended their negotiating deadline to August 3.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQR1JMWENOamFoZXFCNzhqazBKbnE1T3QxeWswYnlyMkgzTWRNQ0lhYmdRNVVTOE9RTU1GNTZaNXQyV0xORmZGLUFhaEF4UlkwWElaRGZnS0xlR0ZOdG1QUmtWUDZKODFtVnliUDJ1TkViQUhiQUt4UE1HcjV0TnpjQWRENV8wTTQ5UHF3dV9vRGFiTG9HMnNuZkxMOXc4V0Q2YUUta2xGZzZzeDlWSHc?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/05/uk-budget-airline-easyjet-agrees-to-7point3-billion-takeover.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/easyjet-castlelake-takeover.png",
      "alt": "An easyJet Airbus airliner taxiing on an airport tarmac",
      "credit": "CNBC"
    },
    "edition": "Morning Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The South-Sea Bubble (Mackay)",
        "excerpt": "Exchange Alley was every day blocked up by crowds, and Cornhill was impassable for the number of carriages. Every body came to purchase stock.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), Wikisource",
        "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_2"
      },
      {
        "category": "historical",
        "title": "The Wealth of Nations, Book V (Adam Smith)",
        "excerpt": "The directors of such companies, however, being the managers rather of other people's money than of their own, it cannot well be expected that they should watch over it with the same anxious vigilance with which the partners in a private copartnery frequently watch over their own.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (1776), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/3300/pg3300.txt"
      },
      {
        "category": "literary",
        "title": "Daedalus and Icarus (Metamorphoses, Book VIII)",
        "excerpt": "Proud of his success, the foolish Icarus forsook his guide, and, bold in vanity, began to soar, rising upon his wings to touch the skies; but as he neared the scorching sun, its heat softened the fragrant wax that held his plumes.",
        "source": "Ovid, Metamorphoses, Book VIII (trans. Brookes More), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=8:card=183"
      },
      {
        "category": "literary",
        "title": "The Merchant of Venice, Act I, Scene 1",
        "excerpt": "Nor is the wide world ignorant of her worth, / For the four winds blow in from every coast / Renowned suitors, and her sunny locks / Hang on her temples like a golden fleece, / Which makes her seat of Belmont Colchos' strond, / And many Jasons come in quest of her.",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 1, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt"
      },
      {
        "category": "artistic",
        "title": "Rimsky-Korsakov, The Flight of the Bumble-Bee",
        "excerpt": "Rimsky-Korsakov's orchestral interlude sends a single line racing in an unbroken chromatic blur that mimics the frantic, weaving path of an insect on the wing. The music never rests, climbing and diving with a restless velocity that has made it a byword for headlong, breathless motion. Its darting ascent makes it an apt score for an enterprise borne aloft on wings it may not fully command.",
        "source": "Nikolai Rimsky-Korsakov, The Flight of the Bumble-Bee, from The Tale of Tsar Saltan (1899–1900), IMSLP",
        "href": "https://imslp.org/wiki/Flight_of_the_Bumblebee_(Rimsky-Korsakov,_Nikolay)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus",
        "excerpt": "In Bruegel's panel the drowning boy is almost invisible: only two pale legs vanish into the green sea at the lower right while a ploughman, a shepherd, and a laden merchant ship carry on, wholly indifferent. The great catastrophe of a flight gone wrong is reduced to a footnote against the busy commerce of the world. It is a meditation on how quietly one enterprise's fall can pass amid the trade of everyone else.",
        "source": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus (c. 1560), Royal Museums of Fine Arts of Belgium, Brussels",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/easyjet-castlelake-takeover--art.png",
          "alt": "A wide coastal landscape at sunset; a farmer ploughs in the foreground and a merchant ship sails on a green sea while, unnoticed in the lower right corner, the bare legs of the fallen Icarus disappear beneath the water.",
          "credit": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus (c. 1560); Royal Museums of Fine Arts of Belgium, Brussels; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "norway-brazil-world-cup-upset",
    "headline": "Haaland scores twice as Norway knock five-time champions Brazil out of the World Cup",
    "overview": "Norway stunned five-time champions Brazil 2-1 in the World Cup round of 16 on July 5, 2026, with Erling Haaland scoring twice late to send his side into its first-ever quarterfinal. Neymar pulled one back from the penalty spot deep in stoppage time, but it was too late to save Brazil from its earliest World Cup exit since 1990. Norway will face the winner of Mexico and England in Miami.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNVTVlcFUyRC0zWlRqdkJCaFBvdTNRc19GS2FQckZvVnF5SEFyall4ZEVBeVVqNDlNSnJmMWc0UHhGaXVnLVc4Q1lHdGNmam11bjA3M0tjTWt3b1FYNHNvbzZzYl84aEFTOWxzTFlIRUl2VGIxc25IYXd5cDFkeGRwQm15VS1hLWxfX2dSN0lwMGJvUno1Zm1xTXE3a0NvYjNfQ1diUmU5N3FWX3M5VmRMTVh1cEg?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/sports/2026/7/5/haaland-scores-twice-as-norway-stun-brazil-2-1-in-world-cup-2026-last-16"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/norway-brazil-world-cup-upset.png",
      "alt": "Norway's Erling Haaland raises his arms in celebration during the World Cup match against Brazil",
      "credit": "Reuters via Al Jazeera"
    },
    "edition": "Morning Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "David and Goliath",
        "excerpt": "And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth. So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "1 Samuel 17:49–50 (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "historical",
        "title": "The Athenians charge at Marathon",
        "excerpt": "for they were the first of all the Hellenes about whom we know who went to attack the enemy at a run, and they were the first also who endured to face the Median garments and the men who wore them, whereas up to this time the very name of the Medes was to the Hellenes a terror to hear.",
        "source": "Herodotus, Histories 6.112 (G. C. Macaulay translation)",
        "href": "https://lexundria.com/hdt/6.112/mcly"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "And on the pedestal these words appear: \"My name is Ozymandias, King of Kings.\" Look on my works ye Mighty, and despair!",
        "source": "Percy Bysshe Shelley, Ozymandias, first printed in The Examiner (1818), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "literary",
        "title": "Ulysses strings the great bow (Odyssey, Book XXI)",
        "excerpt": "But Ulysses, when he had taken it up and examined it all over, strung it as easily as a skilled bard strings a new peg of his lyre and makes the twisted gut fast at both ends. Then he took it in his right hand to prove the string, and it sang sweetly under his touch like the twittering of a swallow.",
        "source": "Homer, The Odyssey, Book XXI (Samuel Butler translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_XXI"
      },
      {
        "category": "artistic",
        "title": "Grieg, In the Hall of the Mountain King (Peer Gynt Suite No. 1)",
        "excerpt": "Norway's own Edvard Grieg wrote this music for Ibsen's Peer Gynt, depicting the wandering Norwegian Peer trapped deep among the trolls of the giant Mountain King. The theme creeps in softly, then accelerates relentlessly to a frenzied, overwhelming climax as the lone underdog flees the collapsing hall. It is a northern tale of a single mortal outrunning a giant's crumbling power.",
        "source": "Edvard Grieg, Peer Gynt Suite No. 1, Op. 46 (1874–75), IMSLP",
        "href": "https://imslp.org/wiki/Peer_Gynt_Suite_No.1,_Op.46_(Grieg,_Edvard)"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, David with the Head of Goliath",
        "excerpt": "Caravaggio's David with the Head of Goliath shows the young shepherd calmly raising the severed head of the fallen giant. Painted around 1600, it captures the quiet instant after an impossible victory, the boy triumphant over a vanquished colossus. In the dim Baroque light the proud champion is wholly undone, his defeat made flesh.",
        "source": "Caravaggio, David with the Head of Goliath (c. 1600), Kunsthistorisches Museum, Vienna",
        "href": "https://commons.wikimedia.org/wiki/File:Caravaggio_-_David_with_the_Head_of_Goliath_-_Vienna.jpg",
        "image": {
          "src": "/covers/norway-brazil-world-cup-upset--art.png",
          "alt": "Baroque painting of a youthful David holding a sword and lifting the severed head of the giant Goliath against a dark background.",
          "credit": "Caravaggio, David with the Head of Goliath (c. 1600); Kunsthistorisches Museum, Vienna; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "fifa-balogun-red-card-trump",
    "headline": "FIFA lifts US striker Balogun's red-card ban after Trump phones its president",
    "overview": "FIFA overturned the red-card suspension of United States striker Folarin Balogun on July 5, 2026, clearing him to face Belgium, after President Donald Trump telephoned FIFA president Gianni Infantino to seek a review. The intervention drew accusations of political interference in the World Cup. Balogun had been sent off in an earlier match.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxQeEc2cGx0TERlSE0tQ01YZDlFaDRQYmtoNzZ3UFdJd0JRNDFSMFZKSGNwTzFRRUVaQ1ZYTElQR0l0NWZTSVNxU3d1ZHBGQUJDWm1PWkNCUVJmSHRjSE5SelFzSEtUMm5zaXVuQ196bExSaHVCN2lwbUtVQWpkc0ZEcGFVU3RTeHpqX2VhSW1uc2V2MGU5dHh3ejdsSzY?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNSmdTZHJmdFVyekFBSDJSUmI3SktwUWFJTHNsaERlQ09VajNubjFabHRaS1cwdFJteDgyMjJPT0tiY0ZESm9MTk9GdUhJQklVZUVldzlQb0tlbTd3NVNqV1FWaE05YUtaLS1Wc01kTEZ3aXVEc1JEQUpvVGJ2RGJjTTBONG9PbThVa0xIZDkzVHNxbE5aWHNmRjZsNEpYZDJJNV9xZzF0TmpqWEg0ZkE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/fifa-balogun-red-card-trump.png",
      "alt": "A single football and a red card lying on the grass of an empty floodlit stadium at night",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nero crowned victor at Olympia though he fell from his chariot",
        "excerpt": "But after he had been thrown from the car and put back in it, he was unable to hold out and gave up before the end of the course; but he received the crown just the same.",
        "source": "Suetonius, The Lives of the Caesars, Life of Nero 24 (trans. J. C. Rolfe), LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Nero*.html"
      },
      {
        "category": "historical",
        "title": "Commodus lords over the arena while the Senate chants his praises",
        "excerpt": "we would shout out whatever we were commanded, and especially these words continually: 'Thou art lord and thou art first, of all men most fortunate.'",
        "source": "Cassius Dio, Roman History 73.20 (trans. Earnest Cary), LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/73*.html"
      },
      {
        "category": "literary",
        "title": "The disputed chariot race at Patroclus's funeral games (Iliad, Book 23)",
        "excerpt": "Antilochus, thou that aforetime wast wise, what a thing hast thou wrought! Thou hast put my skill to shame and hast thwarted my horses, thrusting to the front thine own that were worser far.",
        "source": "Homer, Iliad, Book 23 (trans. A. T. Murray), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=23:card=566"
      },
      {
        "category": "literary",
        "title": "Thrasymachus: justice is the interest of the stronger (Republic, Book I)",
        "excerpt": "I proclaim that justice is nothing else than the interest of the stronger.",
        "source": "Plato, Republic, Book I (trans. Benjamin Jowett), The Internet Classics Archive",
        "href": "https://classics.mit.edu/Plato/republic.2.i.html"
      },
      {
        "category": "artistic",
        "title": "Verdi, Triumphal Scene (\"Gloria all'Egitto\") from Aida",
        "excerpt": "In the great Act II Triumphal Scene the King of Egypt and his priests sit enthroned above the arena as the victorious army parades before them. The famous march swells the crowd's adulation into a single roar of official glory. Yet the whole spectacle of judgment and reward is stage-managed by the sovereign, whose favor, not merit, decides each fate.",
        "source": "Giuseppe Verdi, Aida (1871), Act II Triumphal Scene, IMSLP",
        "href": "https://imslp.org/wiki/A%C3%AFda_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Ulpiano Checa, Roman Chariot Race",
        "excerpt": "Checa's Salon painting hurls the viewer into the Circus Maximus as chariots thunder past the packed marble tiers. Whips crack, a team veers toward disaster, and the vast crowd strains over the barrier at the deciding moment of the race. It captures the ancient games at the instant when frenzy, spectacle and the will of the watching throng overwhelm any pretense of orderly rules.",
        "source": "Ulpiano Checa, Carrera de carros romanos (Roman Chariot Race), 1890",
        "href": "https://commons.wikimedia.org/wiki/File:Carrera_de_carros_romanos-Ulpiano_Checa.JPG",
        "image": {
          "src": "/covers/fifa-balogun-red-card-trump--art.png",
          "alt": "Ulpiano Checa's 1890 painting of a frenzied Roman chariot race in the Circus Maximus, chariots hurtling past crowded spectator tiers.",
          "credit": "Ulpiano Checa, Carrera de carros romanos (Roman Chariot Race), 1890; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "coney-island-july4-shooting",
    "headline": "Masked gunman wounds eight, including four children, at a July Fourth cookout near Coney Island",
    "overview": "A masked gunman dressed in black fired multiple rounds into a family barbecue in a courtyard near Coney Island beach in Brooklyn late on July 4, 2026, wounding eight people, among them four boys aged 6 to 14. A 21-year-old woman was left in critical condition. The suspect fled on foot and police launched a manhunt.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxNSlpxV2x3aEEtMFFIU3JKTmpvWm1pbXV3VFV3UGloQld5dU9LX1NVTnl5T2RZb3lyNlpkLWhLX2s2Q0RxZ2lRWVFOeV9MS2NvR0VJcGlxSk9taEFPRjJpa18zNmVRNVVwMnJvMmtVdWMwSXVIV05CX3RLWHpXVmZwRFlXMDNfcDZQ?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/US/8-shot-including-4-children-coney-island-nypd/story?id=134493580"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/coney-island-july4-shooting.png",
      "alt": "New York police officers gather behind crime-scene tape at the site of a shooting near Coney Island",
      "credit": "ABC News"
    },
    "edition": "Morning Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Massacre of the Innocents",
        "excerpt": "Then Herod, when he saw that he was mocked of the wise men, was exceeding wroth, and sent forth, and slew all the children that were in Bethlehem, and in all the coasts thereof, from two years old and under, according to the time which he had diligently enquired of the wise men. ... In Rama was there a voice heard, lamentation, and weeping, and great mourning, Rachel weeping for her children, and would not be comforted, because they are not.",
        "source": "Gospel of Matthew 2 (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "historical",
        "title": "The Passover Massacre under Archelaus (Wars of the Jews, Book II)",
        "excerpt": "so he sent his whole army upon them, the footmen in great multitudes by the way of the city, and the horsemen by the way of the plain, who, falling upon them on the sudden, as they were offering their sacrifices, destroyed about three thousand of them; but the rest of the multitude were dispersed upon the adjoining mountains",
        "source": "Flavius Josephus, The Wars of the Jews, Book II (Whiston translation), LacusCurtius",
        "href": "https://penelope.uchicago.edu/josephus/war-2.html"
      },
      {
        "category": "literary",
        "title": "The Slaughter of the Suitors (Odyssey, Book 22)",
        "excerpt": "But Odysseus of many wiles stripped off his rags and sprang to the great threshold with the bow and the quiver full of arrows, and poured forth the swift arrows right there before his feet, and spoke among the wooers: ... But Odysseus took aim, and smote him with an arrow in the throat, and clean out through the tender neck passed the point; he sank to one side, and the cup fell from his hand as he was smitten.",
        "source": "Homer, The Odyssey, Book 22 (trans. A. T. Murray), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book=22"
      },
      {
        "category": "literary",
        "title": "The Masque of the Red Death",
        "excerpt": "The figure was tall and gaunt, and shrouded from head to foot in the habiliments of the grave. The mask which concealed the visage was made so nearly to resemble the countenance of a stiffened corpse that the closest scrutiny must have had difficulty in detecting the cheat. And yet all this might have been endured, if not approved, by the mad revellers around.",
        "source": "Edgar Allan Poe, The Masque of the Red Death (1842), Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/1064"
      },
      {
        "category": "artistic",
        "title": "Charpentier, Caedes sanctorum innocentium (\"The Massacre of the Innocents\")",
        "excerpt": "Charpentier's sacred oratorio dramatizes King Herod's order to kill the children of Bethlehem, first performed on the Feast of the Holy Innocents, 28 December 1683. Scored for soloists, chorus, strings and continuo, it moves from the festivity of the Nativity into anguished mourning. The work stands among the Baroque era's most direct musical treatments of the massacre of the innocents.",
        "source": "Marc-Antoine Charpentier, Caedes sanctorum innocentium, H.411 (1683), IMSLP",
        "href": "https://imslp.org/wiki/Caedes_sanctorum_innocentium,_H.411_(Charpentier,_Marc-Antoine)"
      },
      {
        "category": "artistic",
        "title": "Guido Reni, Massacre of the Innocents",
        "excerpt": "Guido Reni's 1611 altarpiece depicts Herod's soldiers slaying the children of Bethlehem as their mothers cry out in terror and grief. The composition balances the violence of the killers against the anguish of the fleeing, pleading mothers. It is one of the defining Baroque visions of the massacre of the innocents.",
        "source": "Guido Reni, Massacre of the Innocents (1611), Pinacoteca Nazionale di Bologna",
        "href": "https://commons.wikimedia.org/wiki/File:Guido_Reni_-_Massacre_of_the_Innocents.jpg",
        "image": {
          "src": "/covers/coney-island-july4-shooting--art.png",
          "alt": "Guido Reni's 1611 painting Massacre of the Innocents, showing soldiers killing children as their mothers flee and mourn.",
          "credit": "Guido Reni, Massacre of the Innocents (1611); Pinacoteca Nazionale di Bologna; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "le-pen-appeal-verdict-2027",
    "headline": "Marine Le Pen awaits a Paris appeal verdict that could bar her from the 2027 presidential race",
    "overview": "French far-right leader Marine Le Pen awaited a Paris appeals court ruling in early July 2026 on her embezzlement conviction, a decision that could uphold or lift a ban on her holding public office. The outcome will determine whether the poll front-runner can stand in France's 2027 presidential election. Le Pen has denied wrongdoing and cast the case as politically motivated.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/clyeele4leeo"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxQM1F6Nk42aDA2QXlKeVd6THFHczlRSjlaWDNuYWRwbWdyNUxsVVFMY1ROOHRDMUhkbXhXMHAyNjFlRXI1cWdFcVN0ZU05OGVKeklnb2hYZldZYW1uZ2ZVWlFXOTAxSHFJRnNvQ2pGbGgxRnpCRVcyMXphVzBrQ2h1N1VTYmZjb3hWeHN2NUkwOE5CQUVsT29USWdZMWRucEs4UnJKdUNsTUF0b0U0Vkp0UzY4aw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/le-pen-appeal-verdict-2027.png",
      "alt": "A neoclassical courthouse at dusk beside a bronze statue of blindfolded Justice holding a set of scales",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Ostracism of Aristides 'the Just'",
        "excerpt": "Now at the time of which I was speaking, as the voters were inscribing their ostraka, it is said that an unlettered and utterly boorish fellow handed his ostrakon to Aristides, and asked him to write Aristides on it. He, astonished, asked the man what possible wrong Aristides had done him. \"None whatever,\" was the answer, \"I don't even know the fellow, but I am tired of hearing him everywhere called 'The Just.'\" On hearing this, Aristides made no answer, but wrote his name on the ostrakon and handed it back.",
        "source": "Plutarch, Life of Aristides 7.6 (trans. Bernadotte Perrin), LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Aristides*.html"
      },
      {
        "category": "historical",
        "title": "The Trial and Exile of Camillus",
        "excerpt": "Accordingly, after he had kissed his wife and son good-bye, he went from his house in silence as far as the gate of the city. There he stopped, turned himself about, and stretching his hands out towards the Capitol, prayed the gods that, if with no justice, but through the wantonness of the people and the abuse of the envious he was now being driven from his country, the Romans might speedily repent, and show to all men that they needed and longed for Camillus.",
        "source": "Plutarch, Life of Camillus 12–13 (trans. Bernadotte Perrin), LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Camillus*.html"
      },
      {
        "category": "literary",
        "title": "Coriolanus banished from Rome",
        "excerpt": "You common cry of curs, whose breath I hate / As reek o' th' rotten fens, whose loves I prize / As the dead carcasses of unburied men / That do corrupt my air, I banish you! [...] Despising / For you the city, thus I turn my back. / There is a world elsewhere.",
        "source": "William Shakespeare, Coriolanus, Act III, Scene 3, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1535/1535-h/1535-h.htm"
      },
      {
        "category": "literary",
        "title": "Cacciaguida foretells Dante's exile (Paradiso XVII)",
        "excerpt": "Thou shalt abandon everything beloved / Most tenderly, and this the arrow is / Which first the bow of banishment shoots forth. / Thou shalt have proof how savoureth of salt / The bread of others, and how hard a road / The going down and up another's stairs.",
        "source": "Dante Alighieri, Paradiso XVII (trans. Henry Wadsworth Longfellow, 1867), Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_17"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Coriolan Overture, Op. 62",
        "excerpt": "Beethoven's Coriolan Overture, written for Heinrich Joseph von Collin's tragedy, portrays the Roman general Coriolanus after his banishment, torn between vengeance on the city that expelled him and the pull of conscience. Its violent C-minor hammer-strokes and pleading lyrical theme stage the collision of a proud leader against the implacable will of the state. The music finally disintegrates into fading, broken phrases as the exile, cut off from Rome, is destroyed.",
        "source": "Ludwig van Beethoven, Coriolan Overture, Op. 62 (1807), IMSLP",
        "href": "https://imslp.org/wiki/Coriolan,_Op.62_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Franciszek Smuglewicz, Ostracism over Aristides",
        "excerpt": "Franciszek Smuglewicz's neoclassical painting depicts the Athenian assembly casting inscribed potsherds to banish Aristides 'the Just,' the very fairness of his name turned into grounds for his exile. The statesman stands composed amid the crowd that is voting him out of the city, a favorite of Athens expelled by its own lawful procedure. The scene renders ostracism as the shards of a vote—the law itself becoming the instrument that removes a leader from public life.",
        "source": "Franciszek Smuglewicz, Ostracism over Aristides (before 1807), National Museum in Kraków",
        "href": "https://commons.wikimedia.org/wiki/File:Franciszek_Smuglewicz_-_Ostracism_over_Aristides_-_MNK_II-a-1035_-_National_Museum_Krak%C3%B3w.jpg",
        "image": {
          "src": "/covers/le-pen-appeal-verdict-2027--art.png",
          "alt": "Neoclassical painting of the Athenian assembly ostracising Aristides the Just, robed citizens casting inscribed potsherds to banish the composed statesman.",
          "credit": "Franciszek Smuglewicz, Ostracism over Aristides (before 1807); National Museum in Kraków; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "turkey-anti-nato-protests",
    "headline": "More than 100 detained as leftist groups hold anti-NATO protests across Turkey",
    "overview": "Turkish police detained more than 100 people on July 5, 2026 at anti-NATO marches organized by the Communist Party of Turkey ahead of an alliance summit in Ankara. Authorities banned demonstrations, barricaded streets and used tear gas to disperse crowds chanting against the military alliance. Opposition figures criticized the detentions as a curb on basic rights.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxQMzNUeFRFeEliSTIzZnAyUFNLMGo0Q0RaSVZpY2pxZDNjOTdsbU5jSGM0c2tnamsxa3MwblNfTjhVVGc5NTFrWVJoNC14aXFsT3VqQXlVNlNOTlFHck5hNnpHMl9OSHRGWkVwQmZMbUJuNlJsVlNYb2x3T21aUzg2ODhWQ3RUalpxS0RkeDJvLXNFdG1YY3ZrZERKTTJtUFJ5SHdSZVo4TVJiYjdVaF82UjcyUHVLdXRCMER2Ul9Waw?oc=5"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2649782/middle-east"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/turkey-anti-nato-protests.png",
      "alt": "Demonstrators carry anti-NATO placards during a protest march in Turkey",
      "credit": "Arab News"
    },
    "edition": "Morning Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The First Secession of the Plebs",
        "excerpt": "they took the advice of one Sicinius, and without orders from the consuls withdrew to the Sacred Mount, which is situated across the river Anio, three miles from the City.",
        "source": "Livy, Ab Urbe Condita, Book 2.32 (trans. B. O. Foster), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0151:book=2:chapter=32"
      },
      {
        "category": "historical",
        "title": "The Killing of Tiberius Gracchus",
        "excerpt": "of the rest more than three hundred were slain by blows from sticks and stones, but not one by the sword.",
        "source": "Plutarch, Life of Tiberius Gracchus 19 (trans. Bernadotte Perrin), LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Tiberius_Gracchus*.html"
      },
      {
        "category": "literary",
        "title": "Lysistrata",
        "excerpt": "Now will you help me, if I find a means / To stamp the war out.",
        "source": "Aristophanes, Lysistrata (411 BC, trans. Jack Lindsay), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7700/pg7700.txt"
      },
      {
        "category": "literary",
        "title": "The Mask of Anarchy",
        "excerpt": "Rise like Lions after slumber / In unvanquishable number— / Shake your chains to earth like dew / Which in sleep had fallen on you— / Ye are many—they are few.",
        "source": "Percy Bysshe Shelley, The Mask of Anarchy (1819), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Mask_of_Anarchy"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Egmont, Op. 84",
        "excerpt": "Beethoven wrote the Egmont music for Goethe's tragedy about Count Egmont, a nobleman executed for resisting Spanish tyranny in the Netherlands. The score moves from a dark, oppressive opening to a blazing 'Victory Symphony,' converting grief at repression into defiant liberation. Its triumphant close became a byword for a people's struggle against an occupying power.",
        "source": "Ludwig van Beethoven, Egmont, Op. 84 (1810), IMSLP",
        "href": "https://imslp.org/wiki/Egmont,_Op.84_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Eugène Delacroix, Liberty Leading the People",
        "excerpt": "Delacroix's canvas shows an allegory of Liberty, tricolor in one hand and musket in the other, striding over a barricade of the fallen as an armed crowd of workers and students surges behind her. Painted in the wake of the July 1830 revolution that toppled Charles X, it fuses ordinary people and idealized freedom into a single onrushing mass. It remains the defining image of a populace rising against the state.",
        "source": "Eugène Delacroix, Liberty Leading the People (1830), Musée du Louvre",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/turkey-anti-nato-protests--art.png",
          "alt": "Eugène Delacroix's painting Liberty Leading the People: a woman personifying Liberty holds the French tricolor and a musket, leading armed revolutionaries over a barricade of the dead.",
          "credit": "Eugène Delacroix, Liberty Leading the People (1830); Musée du Louvre; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "vietnam-counterfeit-crackdown",
    "headline": "Vietnam widens a crackdown on its counterfeit luxury market under US tariff pressure",
    "overview": "Vietnam, long a global hub for counterfeit luxury goods, widened a nationwide crackdown on fakes and trade fraud in early July 2026, raiding warehouses and seizing knockoffs of brands such as Dior and Louis Vuitton. The push comes as the Trump administration threatens tariffs over intellectual-property violations. Sellers in Hanoi's markets, however, say the trade continues largely unabated.",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cdx7zzywz7wo"
      },
      {
        "name": "Yahoo News",
        "href": "https://www.yahoo.com/news/world/articles/global-hub-fake-luxury-goods-220149507.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/vietnam-counterfeit-crackdown.png",
      "alt": "Rows of imitation designer handbags hanging under bright bulbs at a night-market stall",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder on the counterfeit denarius",
        "excerpt": "It is truly marvellous, that in this art, and in this only, the various methods of falsification should be made a study: for the sample of the false denarius is now an object of careful examination, and people absolutely buy the counterfeit coin at the price of many genuine ones!",
        "source": "Pliny the Elder, Natural History, Book XXXIII (trans. Bostock & Riley), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=33:chapter=13"
      },
      {
        "category": "historical",
        "title": "Han van Meegeren's fake Vermeers",
        "excerpt": "In 1937 the forger Han van Meegeren painted \"The Supper at Emmaus\" in the manner of Vermeer; the leading Vermeer authority Abraham Bredius pronounced it a masterpiece, and the Boijmans Museum in Rotterdam bought it for a fortune. Only after his 1945 arrest, when he was accused of selling a national treasure to Hermann Göring, did van Meegeren confess that the celebrated \"Vermeers\" were his own inventions. The case remains the classic proof that expertise, market price, and authenticity can come apart entirely—a copy adored as the genuine article.",
        "source": "The Han van Meegeren forgeries (1945), Encyclopædia Britannica",
        "href": "https://www.britannica.com/biography/Han-van-Meegeren"
      },
      {
        "category": "literary",
        "title": "Plato, the Allegory of the Cave (Republic, Book VII)",
        "excerpt": "And now, I said, let me show in a figure how far our nature is enlightened or unenlightened:—Behold! human beings living in a underground den... here they have been from their childhood, and have their legs and necks chained so that they cannot move... being prevented by the chains from turning round their heads.",
        "source": "Plato, Republic, Book VII (trans. Benjamin Jowett), The Internet Classics Archive",
        "href": "http://classics.mit.edu/Plato/republic.8.vii.html"
      },
      {
        "category": "literary",
        "title": "Fair Portia's counterfeit (The Merchant of Venice)",
        "excerpt": "Fair Portia's counterfeit! What demi-god / Hath come so near creation? ... Yet look, how far / The substance of my praise doth wrong this shadow / In underprizing it, so far this shadow / Doth limp behind the substance.",
        "source": "William Shakespeare, The Merchant of Venice, Act III, Scene 2, The Complete Works of Shakespeare (MIT)",
        "href": "http://shakespeare.mit.edu/merchant/merchant.3.2.html"
      },
      {
        "category": "artistic",
        "title": "Leoncavallo, \"Vesti la giubba\" from Pagliacci",
        "excerpt": "In Leoncavallo's Pagliacci the clown Canio, his heart breaking, must paint his face and pull on his costume to make the crowd laugh: \"Vesti la giubba\"—put on the motley. The aria is the definitive portrait of the mask that hides the true face, the smiling counterfeit worn over a very different reality. Gaiety is revealed as a painted surface concealing what lies beneath.",
        "source": "Ruggero Leoncavallo, Pagliacci (1892), 'Vesti la giubba', IMSLP",
        "href": "https://imslp.org/wiki/Pagliacci_(Leoncavallo,_Ruggiero)"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys, The Moneylender and his Wife",
        "excerpt": "A money-changer weighs gold coins on a delicate balance while his wife, distracted from her prayer-book, watches the glinting metal; a convex mirror on the table reflects the room and a distant window. The painting stages the late-medieval anxiety over true weight and false coin, the goldsmith's scale the last defense against the clipped, debased, or counterfeit piece. Its luxury of pearls, rings, and coins doubles as a moral warning about prizing the material over the sacred.",
        "source": "Quentin Matsys, The Moneylender and his Wife (1514), Musée du Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/vietnam-counterfeit-crackdown--art.png",
          "alt": "A Renaissance genre painting: a money-changer at a table carefully weighs gold coins on a small balance, while his wife beside him pauses over an illuminated prayer-book to watch; on the table lie coins, pearls, and rings, and a small convex mirror reflects a window.",
          "credit": "Quentin Matsys, The Moneylender and his Wife (1514); Musée du Louvre, Paris; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "new-jersey-heatwave-deaths",
    "headline": "Extreme heat is blamed for at least 19 deaths in New Jersey as a heat dome grips the eastern US",
    "overview": "A punishing heat dome over the central and eastern United States pushed temperatures to 106°F in Atlantic City over the July 4, 2026 weekend and is suspected in at least 19 deaths across New Jersey, state officials said. Many of the victims were found in homes without air conditioning. Violent thunderstorms then knocked out power to hundreds of thousands of customers.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxPZ0lidEJWQkFCZTFXYnVxUy1OcGlJNGdsa3JNUnJiNUFlUklnb25qTE1yLUpyX0pLZVdvTEh2SDZyYjgtNkFoR3JNQ05SQXBqbm5YVTI4Vmtmc3hJNk1UXzUzU0Z3aUhaMTJqZlQtOVNMY2s4LWg5dUlVdWN0TU1BZnRZLXhPS1JjWlVIR3VRVEZ3ei1Ra3dEM0xONkd0OWxyb0lZZ0lYWQ?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/national/2026/07/05/heat-dome-thunderstorms-deaths-power-outages/0fb91c60-7890-11f1-b194-f872dd4ec5aa_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/new-jersey-heatwave-deaths.png",
      "alt": "A jogger silhouetted against a hazy sun over the skyline during a heat wave",
      "credit": "NBC10 Philadelphia"
    },
    "edition": "Morning Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The great drought of 1623 (Bradford's Of Plymouth Plantation)",
        "excerpt": "By a great drought which continued from the third week in May, till about the middle of July, without any rain and with great heat for the most part, insomuch as the corn began to wither away though it was set with fish, the moisture whereof helped it much. Yet at length it began to languish sore, and some of the drier grounds were parched like withered hay, part whereof was never recovered.",
        "source": "William Bradford, Of Plymouth Plantation (c. 1630–1651), on the drought of 1623",
        "href": "https://www.whatsoproudlywehail.org/curriculum/the-american-calendar/excerpts-from-of-plymouth-plantation/"
      },
      {
        "category": "historical",
        "title": "Alexander's army perishes of heat in the Gedrosian desert",
        "excerpt": "The scorching heat and lack of water destroyed a great part of the army, and especially the beasts of burden; most of which perished from thirst and some of them even from the depth and heat of the sand.",
        "source": "Arrian, The Anabasis of Alexander, Book VI, ch. 24 (trans. E. J. Chinnock), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Anabasis_of_Alexander/Book_VI/Chapter_XXIV"
      },
      {
        "category": "literary",
        "title": "The sun beats upon Jonah (Jonah 4:8)",
        "excerpt": "And it came to pass, when the sun did arise, that God prepared a vehement east wind; and the sun beat upon the head of Jonah, that he fainted, and wished in himself to die, and said, It is better for me to die than to live.",
        "source": "Jonah 4:8 (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jonah"
      },
      {
        "category": "literary",
        "title": "The killing sun in Coleridge's Rime of the Ancient Mariner",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon. ... Water, water, every where, / And all the boards did shrink; / Water, water, every where, / Nor any drop to drink.",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancient Mariner, Part II, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/151/pg151.txt"
      },
      {
        "category": "artistic",
        "title": "Vivaldi, \"Summer\" from The Four Seasons",
        "excerpt": "Vivaldi's \"L'estate\" (Summer) concerto in G minor, RV 315, opens with man and flock languishing beneath a merciless sun, the violins panting and drooping in the oppressive noonday heat. Its finale then erupts into a violent summer thunderstorm that flattens the ripened fields—an uncanny mirror of a heat dome broken by deadly storms. The freely downloadable IMSLP scores preserve Vivaldi's 1725 publication in full.",
        "source": "Antonio Vivaldi, \"L'estate\" (Summer), Concerto in G minor RV 315, from Le quattro stagioni, Op. 8 (1725), IMSLP",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, The Fall of Phaeton",
        "excerpt": "Rubens paints the instant Phaethon loses control of the sun-god's chariot, the horses plunging and the sky splitting into fire as the boy who dared to drive the sun brings scorching ruin upon the earth. The Hours scatter in terror while flame and dark cloud boil across the heavens. Painted around 1604–1605, it renders the ancient myth of a world set ablaze by an ungoverned sun.",
        "source": "Peter Paul Rubens, The Fall of Phaeton (c. 1604–1605), National Gallery of Art, Washington",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/new-jersey-heatwave-deaths--art.png",
          "alt": "A baroque painting of Phaethon tumbling from the blazing chariot of the sun as its rearing horses plunge across a sky torn between fire and dark cloud, terrified winged figures scattering around him.",
          "credit": "Peter Paul Rubens, The Fall of Phaeton (c. 1604–1605); National Gallery of Art, Washington; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "lmtls-skin1004-soho-store",
    "headline": "LMTLS carves a canyon of wood through SKIN1004's new SoHo flagship store",
    "overview": "The studio LMTLS unveiled a New York flagship for the Korean skincare brand SKIN1004 in SoHo in early July 2026, carving a steep, canyon-like sequence of curved wooden layers and mirrored walls through the narrow two-story space. The 9,900-square-foot store on Broadway evokes a natural gorge, with a double-height entry lounge cut from the removed second floor. The design translates the brand's 'untouched nature' philosophy into architecture.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/05/skin1004-nyc-flagship-store-soho-lmtls-architecture/"
      },
      {
        "name": "Designboom",
        "href": "https://www.designboom.com/architecture/mirrored-interiors-sculptural-canyon-forms-skin1004-soho-flagship-lmtls/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/lmtls-skin1004-soho-store.png",
      "alt": "The layered, canyon-like curved wooden interior of the SKIN1004 flagship store in SoHo",
      "credit": "Dezeen"
    },
    "edition": "Morning Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Strabo describes Petra, the rock-fortified metropolis",
        "excerpt": "The metropolis of the Nabataeans is Petra, as it is called; for it lies on a site which is otherwise smooth and level, but it is fortified all round by a rock, the outside parts of the site being precipitous and sheer, and the inside parts having springs in abundance, both for domestic purposes and for watering gardens.",
        "source": "Strabo, Geography, Book XVI, Chapter 4, §21 (Loeb ed.), LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/16D*.html"
      },
      {
        "category": "historical",
        "title": "Tacitus and the banquet in the natural grotto at Spelunca",
        "excerpt": "They were dining in a country house called \"The Cave,\" between the gulf of Amuclæ and the hills of Fundi, in a natural grotto. The rocks at its entrance suddenly fell in and crushed some of the attendants; thereupon panic seized the whole company and there was a general flight of the guests.",
        "source": "Tacitus, Annals, Book IV, ch. 59 (trans. Church & Brodribb), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=4:chapter=59"
      },
      {
        "category": "literary",
        "title": "Coleridge, \"Kubla Khan\"",
        "excerpt": "In Xanadu did Kubla Khan / A stately pleasure-dome decree: / Where Alph, the sacred river, ran / Through caverns measureless to man / Down to a sunless sea.",
        "source": "Samuel Taylor Coleridge, Kubla Khan; or, A Vision in a Dream (1816), Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/8208"
      },
      {
        "category": "literary",
        "title": "The cave of the Naiad nymphs (Odyssey, Book XIII)",
        "excerpt": "At the head of the harbor is a long-leafed olive tree, and near it a pleasant, shadowy cave sacred to the nymphs that are called Naiads. Therein are mixing bowls and jars of stone, and there too the bees store honey. And in the cave are long looms of stone, at which the nymphs weave webs of purple dye, a wonder to behold; and therein are also ever-flowing springs.",
        "source": "Homer, Odyssey, Book XIII (trans. A. T. Murray), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book=13:card=93"
      },
      {
        "category": "artistic",
        "title": "Mendelssohn, \"The Hebrides\" (Fingal's Cave) Overture, Op. 26",
        "excerpt": "Felix Mendelssohn's concert overture The Hebrides, Op. 26—long nicknamed \"Fingal's Cave\"—grew out of his 1829 visit to the vast basalt sea cavern on the Scottish island of Staffa. Its rolling, echoing opening figure translates the swell of the sea against hollowed rock into orchestral sound. The result is a musical portrait of a sublime natural interior carved by water and time.",
        "source": "Felix Mendelssohn, The Hebrides (Fingal's Cave) Overture, Op. 26 (1830, rev. 1832), IMSLP",
        "href": "https://imslp.org/wiki/Die_Hebriden,_Op.26_(Mendelssohn,_Felix)"
      },
      {
        "category": "artistic",
        "title": "Thomas Moran, The Grand Canyon of the Yellowstone",
        "excerpt": "Thomas Moran's monumental oil renders the Yellowstone gorge's water-cut walls in luminous ochre, rose, and gold, its plunging strata dwarfing the tiny figures at the rim. Built from studies made on the 1871 Hayden Survey, Moran's canyon views helped persuade Congress to protect the region as a national park. The canvas presents stone shaped by water into a sublime, cathedral-like architecture.",
        "source": "Thomas Moran, The Grand Canyon of the Yellowstone (1893–1901), Smithsonian American Art Museum",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Moran_-_Grand_Canyon_of_the_Yellowstone_-_Smithsonian.jpg",
        "image": {
          "src": "/covers/lmtls-skin1004-soho-store--art.png",
          "alt": "Thomas Moran's oil painting The Grand Canyon of the Yellowstone, showing a deep river-carved gorge with steep golden and rose-colored rock walls beneath a bright sky.",
          "credit": "Thomas Moran, The Grand Canyon of the Yellowstone (1893–1901); Smithsonian American Art Museum; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "nigeria-nationals-killed-south-africa",
    "headline": "Nigeria says two of its nationals were killed in South Africa amid a rise in anti-migrant attacks",
    "overview": "Nigeria's government said on July 5, 2026 that two of its citizens had been killed in South Africa as anti-migrant violence intensified there. The announcement came amid protests demanding that foreigners leave and the repatriation of thousands of African migrants. Nigeria said one national was reportedly killed by police.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cqj11lxwnn0o"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/07/05/nigeria-south-africa-antimigrant-violence/886d41dc-7858-11f1-b194-f872dd4ec5aa_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-06",
    "image": {
      "src": "/covers/nigeria-nationals-killed-south-africa.png",
      "alt": "A deserted market street at dusk with shuttered metal shopfronts and an overturned wooden stall",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 6 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Holiness Code on the sojourning stranger (Leviticus 19:33–34)",
        "excerpt": "And if a stranger sojourn with thee in your land, ye shall not vex him. But the stranger that dwelleth with you shall be unto you as one born among you, and thou shalt love him as thyself; for ye were strangers in the land of Egypt: I am the LORD your God.",
        "source": "Leviticus 19:33–34 (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Leviticus"
      },
      {
        "category": "historical",
        "title": "The Alhambra Decree, Edict of Expulsion of the Jews of Spain (1492)",
        "excerpt": "Therefore, we, with the counsel and advice of prelates, great noblemen of our kingdoms, and other persons of learning and wisdom of our Council, having taken deliberation about this matter, resolve to order the said Jews and Jewesses of our kingdoms to depart and never to return or come back to them or to any of them.",
        "source": "Ferdinand II of Aragon and Isabella I of Castile, the Alhambra Decree (1492)",
        "href": "https://cojs.org/edict_of_the_expulsion_of_the_jews_from_spain-_1492/"
      },
      {
        "category": "literary",
        "title": "Eumaeus welcomes the stranger (Odyssey, Book 14)",
        "excerpt": "Nay, stranger, it were not right for me, even though one meaner than thou were to come, to slight a stranger; for from Zeus are all strangers and beggars, and a gift, though small, is welcome from such as we.",
        "source": "Homer, The Odyssey, Book 14 (trans. A. T. Murray), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D14"
      },
      {
        "category": "literary",
        "title": "Odysseus appeals to the Cyclops (Odyssey, Book 9)",
        "excerpt": "Nay, mightiest one, reverence the gods; we are thy suppliants; and Zeus is the avenger of suppliants and strangers—Zeus, the strangers' god—who ever attends upon reverend strangers.",
        "source": "Homer, The Odyssey, Book 9 (trans. A. T. Murray), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D9"
      },
      {
        "category": "artistic",
        "title": "Verdi, \"Va, pensiero\" (Chorus of the Hebrew Slaves) from Nabucco",
        "excerpt": "Verdi's opera Nabucco stages the Hebrew people enslaved and exiled in Babylon, torn from their homeland. In the third-act chorus \"Va, pensiero, sull'ali dorate,\" the captives sing their longing on golden wings toward the country they have lost. The lament became an anthem of every displaced and expelled people yearning to return home.",
        "source": "Giuseppe Verdi, Nabucco (1841), 'Va, pensiero', IMSLP",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Rembrandt van Rijn, Philemon and Baucis",
        "excerpt": "Rembrandt paints the moment the disguised gods Jupiter and Mercury reveal themselves to the poor elderly couple Philemon and Baucis, who alone had opened their humble cottage to the wandering strangers. Warm light falls on the guests at the table while the rest sinks into shadow. The scene is the classical parable of hospitality to strangers rewarded—the opposite of the door slammed shut.",
        "source": "Rembrandt van Rijn, Philemon and Baucis (1658), National Gallery of Art, Washington",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_van_Rijn,_Philemon_and_Baucis,_1658,_NGA_1204.jpg",
        "image": {
          "src": "/covers/nigeria-nationals-killed-south-africa--art.png",
          "alt": "Rembrandt's Philemon and Baucis: two disguised gods received as guests by an elderly couple in a shadowy cottage, warm light on the table.",
          "credit": "Rembrandt van Rijn, Philemon and Baucis (1658); National Gallery of Art, Washington; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "trump-america-250th-anniversary-speech",
    "headline": "Trump celebrates America's 250th anniversary with a speech mixing patriotism and partisanship as storms delay festivities",
    "overview": "President Donald Trump marked the 250th anniversary of American independence on July 4, 2026 with a speech that blended patriotic celebration with partisan attacks, after storms and extreme weather delayed festivities across the country. Addressing crowds amid fireworks and flyovers, he lauded the United States on its semiquincentennial. The holiday was marred by scorching heat and violent storms in several states.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://apnews.com/article/trump-july-4-250-anniversary"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTFBFTG1RdVl1QXdrZVdUSWdEWk85cmdXZ19UV1RNajhWUDVTenIzcS1lLUFQWHhEYl9jUkg4TndRQUZfa05NdE1sV3dTdWZkSFhiRzEwaXh6VjRlYWFQRHF3bDNBbFMzeTg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/trump-america-250th-anniversary-speech.png",
      "alt": "A Fourth of July fireworks display marking the 250th anniversary of American independence",
      "credit": "BBC"
    },
    "lead": true,
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Declaration of Independence (1776)",
        "excerpt": "When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature's God entitle them... We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
        "source": "The Declaration of Independence, July 4, 1776 (U.S. National Archives transcript)",
        "href": "https://www.archives.gov/founding-docs/declaration-transcript"
      },
      {
        "category": "historical",
        "title": "Lincoln's \"House Divided\" Speech (1858)",
        "excerpt": "\"A house divided against itself cannot stand.\" I believe this government cannot endure permanently half slave and half free. I do not expect the Union to be dissolved—I do not expect the house to fall—but I do expect it will cease to be divided.",
        "source": "Abraham Lincoln, \"House Divided\" Speech, Springfield, Illinois, June 16, 1858",
        "href": "https://en.wikisource.org/wiki/House_Divided_Speech"
      },
      {
        "category": "literary",
        "title": "The Storm of Omens in Julius Caesar",
        "excerpt": "But never till tonight, never till now, / Did I go through a tempest dropping fire. / Either there is a civil strife in heaven, / Or else the world too saucy with the gods, / Incenses them to send destruction. ... When these prodigies / Do so conjointly meet, let not men say, / \"These are their reasons; they are natural\"; / For I believe, they are portentous things / Unto the climate that they point upon.",
        "source": "William Shakespeare, The Tragedy of Julius Caesar, Act I, Scene 3 (Casca)",
        "href": "https://www.gutenberg.org/cache/epub/1522/pg1522.txt"
      },
      {
        "category": "literary",
        "title": "Whitman's \"I Hear America Singing\"",
        "excerpt": "I hear America singing, the varied carols I hear, / Those of mechanics, each one singing his as it should be blithe and strong, / The carpenter singing his as he measures his plank or beam, / The mason singing his as he makes ready for work, or leaves off work, / The boatman singing what belongs to him in his boat, the deckhand singing on the steamboat deck, / The shoemaker singing as he sits on his bench, the hatter singing as he stands, / The wood-cutter's song, the ploughboy's on his way in the morning, or at noon intermission or at sundown, / The delicious singing of the mother, or of the young wife at work, or of the girl sewing or washing, / Each singing what belongs to him or her and to none else, / The day what belongs to the day—at night the party of young fellows, robust, friendly, / Singing with open mouths their strong melodious songs.",
        "source": "Walt Whitman, \"I Hear America Singing,\" Leaves of Grass",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt"
      },
      {
        "category": "artistic",
        "title": "Sousa, The Stars and Stripes Forever",
        "excerpt": "Sousa's rousing 1896–97 march became an unofficial national anthem, its soaring piccolo obbligato and swelling brass the very sound of American civic ceremony and Fourth-of-July pageantry. Composed as a patriotic exultation, it carries the same blend of triumphal spectacle and mass public ritual that frames a national jubilee. The freely downloadable IMSLP scores preserve the march in Sousa's original band and orchestral arrangements.",
        "source": "John Philip Sousa, The Stars and Stripes Forever (1896–97), IMSLP",
        "href": "https://imslp.org/wiki/The_Stars_and_Stripes_Forever_(Sousa,_John_Philip)"
      },
      {
        "category": "artistic",
        "title": "Trumbull's Declaration of Independence",
        "excerpt": "Trumbull's monumental 1819 canvas stages the founding as solemn civic theater: the drafting committee presents the Declaration to a hushed Congress in a chamber ordered by draped flags and disciplined ranks of seated delegates. Though it depicts unity and shared purpose, it is a deliberate idealization—the figures were never all in one room—an image of national origin as ceremony rather than fact. Hanging in the Capitol Rotunda, it remains the archetypal picture of American founding ritual.",
        "source": "John Trumbull, Declaration of Independence (1819), oil on canvas, U.S. Capitol Rotunda",
        "href": "https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg",
        "image": {
          "src": "/covers/trump-america-250th-anniversary-speech--art.png",
          "alt": "A large history painting showing the five-man drafting committee, led by Thomas Jefferson, presenting the Declaration of Independence to John Hancock and the seated Continental Congress in a red-draped chamber hung with military flags and drums.",
          "credit": "John Trumbull, Declaration of Independence, 1819; public domain (published before 1931); via Wikimedia Commons"
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "iberia-greece-wildfires-thessaloniki",
    "headline": "Wildfires sweep Portugal, Greece and Spain as a blaze near Thessaloniki forces evacuations",
    "overview": "Fast-moving wildfires spread across Portugal, Greece and Spain on July 5, 2026 amid an intense heatwave, with a blaze near Greece's second-largest city, Thessaloniki, forcing evacuations as smoke blanketed suburbs. Greek authorities warned residents about toxic smoke as crews battled multiple fronts. Firefighting aircraft and hundreds of personnel were deployed across the three countries.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNU0Q0S2Z4bFgtWUxEZWYyN0htZWEzOU5Vb01WdkNSMWZfb0lUQU5neW5KY25qSmQ1OXdYNWhXR2tITXQtRzBnbUE3b3FBQjFzblFQU0l5YlhHcW5ZZXpHLUlUNXhGN21pVm9oWkpGVm91ZXRudzBiYjhBMjdNLXhBU2F3bU9FaS1mM05CWENIdXhzcEFvZ0ExcHFkek0yb0VIQW45UEl0TVY?oc=5"
      },
      {
        "name": "AP News (Thessaloniki)",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNNF9KV0VCbmtrWndvSGMtZm4zMEdtMlJZSzVJZWxSY1ljeFBJZlF4ejk3b0pHX1VGQW1QOVNuaVQ0NEJ2eThVc0tRVUJuZk9ldHFSU3c4c0FxcDdwbDFVTm12TVFsOTBPbUpxZnlIWC16akQxdkxrbWpyenRKMVprQ2xSWmFJRm1HT2JBaVRiRVFHUm9Qa05JUjN0Yy1Mc1B2WDVzNl9CU0sxeXdSa1NaZThGQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/iberia-greece-wildfires-thessaloniki.png",
      "alt": "Tall orange flames and billowing smoke from a fast-moving forest wildfire",
      "credit": "Public domain via Wikimedia Commons"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome under Nero (AD 64)",
        "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Cælian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus.",
        "source": "Tacitus, Annals, Book XV.38 (trans. Church and Brodribb), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=15:chapter=38"
      },
      {
        "category": "historical",
        "title": "The Great Fire of London, 2 September 1666",
        "excerpt": "the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.",
        "source": "The Diary of Samuel Pepys, entry for 2 September 1666 (Volume 45: August/September 1666), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/4167/pg4167.txt"
      },
      {
        "category": "literary",
        "title": "Phaethon sets the world ablaze — Ovid's Metamorphoses",
        "excerpt": "Great cities perish with their walls, and peopled nations are consumed to dust—the forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book II (Phaethon), trans. Brookes More, Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=201"
      },
      {
        "category": "literary",
        "title": "The burning of Troy — Virgil's Aeneid",
        "excerpt": "Thus, when a flood of fire by wind is borne, Crackling it rolls, and mows the standing corn.",
        "source": "Virgil, Aeneid, Book II (trans. John Dryden), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=2:card=298"
      },
      {
        "category": "artistic",
        "title": "Wagner's Magic Fire Music (Feuerzauber) from Die Walküre",
        "excerpt": "As the drama closes, Wotan strikes the rock with his spear and cries out to the god of fire—\"Loge, hör'! Lausche hieher!\"—summoning a wall of flame to encircle the sleeping Brünnhilde. The orchestra erupts into shimmering, flickering figuration in the strings and woodwinds, a musical conflagration of rising, curling tongues of fire that both menaces and dazzles. It is one of music's most vivid evocations of fire as something at once beautiful and terrifying.",
        "source": "Richard Wagner, Die Walküre, WWV 86B (Act III finale, 'Magic Fire Music'), full score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Walküre,_WWV_86B_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Turner — The Burning of the Houses of Lords and Commons",
        "excerpt": "Turner witnessed the 1834 blaze that destroyed Britain's Houses of Parliament and rendered it as a vortex of incandescent orange and yellow, the flames roaring up into the night sky and doubling in the black water of the Thames. A crowd of tiny spectators massed on Westminster Bridge is dwarfed by the inferno, capturing the sublime terror and awe of an unstoppable fire consuming a great city.",
        "source": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons, October 16, 1834' (1835), oil on canvas, Philadelphia Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/iberia-greece-wildfires-thessaloniki--art.png",
          "alt": "A blazing fire engulfs the Houses of Parliament along the Thames at night; brilliant orange and yellow flames surge into a smoke-filled sky and reflect on the water, with a dark crowd of onlookers on Westminster Bridge to the right.",
          "credit": "J.M.W. Turner, 'The Burning of the Houses of Lords and Commons, October 16, 1834' (1835); Philadelphia Museum of Art; public domain (Google Art Project), via Wikimedia Commons"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "nato-summit-trump-loyalty-turkey",
    "headline": "NATO chief Rutte faces a summit test in Turkey as Trump demands 'loyalty' from allies",
    "overview": "Ahead of a NATO summit in Turkey, Secretary-General Mark Rutte is under pressure as President Trump demands 'loyalty' from allies rather than just higher defense spending, US and European officials said on July 5, 2026. Frustrated that some members declined to join the recent Iran war, Trump said 'I just want loyalty,' shifting the alliance's long-running burden-sharing debate. Rutte has leaned on flattery to keep Washington anchored to the alliance.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxOeTZHUDdWLUd3UnJha291NEVncUFKaEotUFFjaV9iVFlTTFRnMlpEU0NmdnFVa3p3VWEyVHlvTjctUm1hYWtSaURwdXloTS1YZmFZeS1TN0lMeFhrUVdnc29OZzBSWmhoR0tFZjFpN182dlktME50NDZhUkI2aVhicFJWSFZldVdsNUg2ckdBNnpyOXlBcXQ0RWJZaHRDUm1KT0lrNFdBSS1NeUJuUEIw?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/07/05/nato-summit-rutte-stoltenberg-trump-flattery-pitch/0df4d7ee-7830-11f1-b665-5f8be87f3787_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/nato-summit-trump-loyalty-turkey.png",
      "alt": "NATO Secretary-General Mark Rutte gestures beside a chart labelled 'The Trump Trillion' during a presentation",
      "credit": "AP Photo via ABC News"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides, History of the Peloponnesian War 5.89 (The Melian Dialogue)",
        "excerpt": "right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5, ch. 89 (Richard Crawley translation), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book=5:chapter=89:section=1"
      },
      {
        "category": "historical",
        "title": "Plutarch, Life of Aristides 25 (the founding oath of the Delian League)",
        "excerpt": "Aristides did, indeed, bind the Hellenes by an oath, and took oath himself for the Athenians, to mark his imprecations casting iron ingots into the sea; but afterwards, when circumstances, forsooth, compelled a more strenuous sway, he bade the Athenians lay the perjury to his own charge, and turn events to their own advantage.",
        "source": "Plutarch, Lives, \"Aristides\" 25.1 (Bernadotte Perrin translation, Loeb Classical Library, 1914), via LacusCurtius (Bill Thayer, University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Aristides*.html"
      },
      {
        "category": "literary",
        "title": "Shakespeare, King Lear, Act 1, Scene 1 (Goneril's love-test flattery)",
        "excerpt": "Sir, I love you more than words can wield the matter; / Dearer than eyesight, space, and liberty; / Beyond what can be valued, rich or rare; / No less than life, with grace, health, beauty, honour; / As much as child e'er lov'd, or father found; / A love that makes breath poor, and speech unable.",
        "source": "William Shakespeare, King Lear, Act I, Scene 1, Project Gutenberg eBook #1794",
        "href": "https://www.gutenberg.org/cache/epub/1794/pg1794.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Julius Caesar, Act 2, Scene 1 (Decius on how to flatter Caesar)",
        "excerpt": "I can o'ersway him, for he loves to hear / That unicorns may be betray'd with trees, / And bears with glasses, elephants with holes, / Lions with toils, and men with flatterers; / But when I tell him he hates flatterers, / He says he does, being then most flattered.",
        "source": "William Shakespeare, Julius Caesar, Act II, Scene 1, Project Gutenberg eBook #1785",
        "href": "https://www.gutenberg.org/cache/epub/1785/pg1785.txt"
      },
      {
        "category": "artistic",
        "title": "Mozart, La clemenza di Tito, K.621 (opera on loyalty to and betrayal of the emperor Titus)",
        "excerpt": "Mozart's final opera seria stages a court where profession of loyalty and actual fidelity come apart: the emperor Titus is surrounded by allies who swear devotion even as a conspiracy grows against him. The drama turns on whether a ruler holds his coalition by extracting fealty or by clemency, and on how flattery masks divided allegiance beneath the throne.",
        "source": "Wolfgang Amadeus Mozart, La clemenza di Tito, K.621 (1791), full scores including the Breitkopf & Härtel edition, International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/La_clemenza_di_Tito,_K.621_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, Oath of the Horatii (Le Serment des Horaces), 1784",
        "excerpt": "Three brothers throw their arms toward the raised swords held by their father, binding themselves by oath to the Roman state before battle. David's austere composition freezes the moment a demand for loyalty crystallizes into a vow, the individual will subordinated to the collective cause even at the price of everything else.",
        "source": "Jacques-Louis David, Oath of the Horatii, 1784, oil on canvas, Musée du Louvre, Paris; Wikimedia Commons file page",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David,_Le_Serment_des_Horaces.jpg",
        "image": {
          "src": "/covers/nato-summit-trump-loyalty-turkey--art.png",
          "alt": "Neoclassical painting: three Roman brothers stretch their arms in salute toward three swords held aloft by their father, swearing an oath of loyalty, while grieving women sit at the right.",
          "credit": "Jacques-Louis David, Oath of the Horatii (Le Serment des Horaces), 1784, oil on canvas, Musée du Louvre; public domain; via Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "north-korea-kim-naval-destroyer-tests",
    "headline": "North Korea's Kim observes weapons tests from a new naval destroyer, state media says",
    "overview": "North Korean leader Kim Jong Un observed cruise-missile launches and other weapons tests aboard a new naval destroyer, state media reported on July 5, 2026, presenting the tests as part of an effort to modernize the country's navy. The report did not specify when the launches took place. It came amid a broader push to expand North Korea's naval capabilities.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxObUtPQzRZazNmZzFnd1cwNzZrYURBeU9iMDhUenVZbE85TWRobGVLV2RDcEFtMjVjWEVZU1l1dzY5OWp1OEVBaFVjOTBQZXV0cVlTSXFtNTlmMVZFMS1vZFJxeUhoNTdvTGllMW9rUmhBenNVT0xYU1Y2UllhWHc2Ul9LV01IUW1SQ1NUc3lMWmdUV0FxVVZwaG1XUXVoRTdJRWdwWQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1wFBVV95cUxPWnlQN19oX094ZjZaN0llMDFKbFJLLUNqZVIydHQ3TU43bEJ2clVvTm1Ya2RvZmYxMGozR2diZGN1SzBPQmFIQkxkX3BfX0JObWhKckkxNjRZWUpqYUx0R3cxdF9kenMwVDRzOUVYUUNPNzJtVkt3R3pIeG8tbGNKclR0emZOS0lRbHR3Y1dKdnJtdjRCWnpqSzFKRDJxa0NnbENOWFZCNFJPQVZwWW9sdllCLV9VcnptcHVaMUhzS3Nkem5FWVhxNE9FNmI0bFVRZXVTMmRaYw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/north-korea-kim-naval-destroyer-tests.png",
      "alt": "A grey guided-missile destroyer steaming at sea under an overcast sky",
      "credit": "US Navy photo, public domain via Wikimedia Commons"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Xerxes reviews his fleet at Abydos — Herodotus, Histories, Book VII (44–45)",
        "excerpt": "When Xerxes had come to the midst of Abydos, he desired to see the whole of his army; and this he could do, for a lofty seat of white stone had been set up for him on a hill there with that intent, built by the people of Abydos at the king's command. There Xerxes sat, and looked down on the sea-shore, viewing his army and his fleet; and as he viewed them he was fain to see the ships contend in a race. They did so, and the Phoenicians of Sidon won it; and Xerxes was pleased with the race, and with his armament.",
        "source": "Herodotus, The Persian Wars, trans. A. D. Godley (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Herodotus_The_Persian_Wars_(Godley)/Book_VII"
      },
      {
        "category": "historical",
        "title": "Themistocles builds Athens' navy — Plutarch, Life of Themistocles (4)",
        "excerpt": "And, first of all, the Athenians being accustomed to divide amongst themselves the revenue proceeding from the silver mines at Laurium, he was the only man that durst propose to the people that this distribution should cease, and that with the money ships should be built to make war against the Aeginetans, who were the most flourishing people in all Greece, and by the number of their ships held the sovereignty of the sea. So that with this money an hundred ships were built, with which they afterwards fought against Xerxes.",
        "source": "Plutarch, Lives, trans. John Dryden (The Internet Classics Archive)",
        "href": "https://classics.mit.edu/Plutarch/themisto.html"
      },
      {
        "category": "literary",
        "title": "The Catalogue of Ships — Homer, Iliad, Book 2",
        "excerpt": "Tell me now, ye Muses that have dwellings on Olympus—for ye are goddesses and are at hand and know all things, whereas we hear but a rumour and know not anything—who were the captains of the Danaans and their lords. But the common folk I could not tell nor name, nay, not though ten tongues were mine and ten mouths and a voice unwearying. Now will I tell the captains of the ships and the ships in their order.",
        "source": "Homer, Iliad, trans. A. T. Murray (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D2%3Acard%3D484"
      },
      {
        "category": "literary",
        "title": "The Revenge: A Ballad of the Fleet — Alfred, Lord Tennyson",
        "excerpt": "At Flores in the Azores Sir Richard Grenville lay, / And a pinnace, like a flutter'd bird, came flying from away: / 'Spanish ships of war at sea! we have sighted fifty-three!'",
        "source": "Alfred, Lord Tennyson, Ballads and Other Poems (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Revenge:_A_Ballad_of_the_Fleet"
      },
      {
        "category": "artistic",
        "title": "Rule, Britannia! — Thomas Arne (from the masque Alfred, 1740)",
        "excerpt": "Arne's grand ode swells with the confidence of a nation that measures its power in warships, its refrain vowing that Britannia will forever rule the waves and never be enslaved. Trumpet flourishes and a rising, march-like chorus turn sea power itself into ceremony, the musical equivalent of a fleet drawn up for a sovereign's inspection. It endures as an anthem in which naval might, national pride, and spectacle are inseparable.",
        "source": "Rule Britannia (Arne, Thomas Augustine) — full score (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Rule_Britannia_(Arne,_Thomas_Augustine)"
      },
      {
        "category": "artistic",
        "title": "Review of the Black Sea Fleet in 1849 — Ivan Aivazovsky",
        "excerpt": "Aivazovsky, who witnessed the event beside Emperor Nicholas I, paints a long, disciplined line of warships riding a Sevastopol roadstead under a vast, brooding sky, sails filled and cannon poised. In the foreground uniformed officers stand at a railing to observe the fleet, casting the scene as a ruler's inspection of his sea power. The canvas fuses martial order, imperial ceremony, and the sublime scale of the sea into a single display of naval might.",
        "source": "Ivan Aivazovsky, Review of the Black Sea Fleet in 1849 (1886), Central Naval Museum, St Petersburg — via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%BC%D0%BE%D1%82%D1%80_%D0%A7%D0%B5%D1%80%D0%BD%D0%BE%D0%BC%D0%BE%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D1%84%D0%BB%D0%BE%D1%82%D0%B0_%D0%B2_1849_%D0%B3%D0%BE%D0%B4%D1%83.jpg",
        "image": {
          "src": "/covers/north-korea-kim-naval-destroyer-tests--art.png",
          "alt": "A long line of billowing-sailed warships of the Russian Black Sea Fleet reviewed at Sevastopol under a wide grey sky, with uniformed officers watching from a railing in the foreground",
          "credit": "Ivan Aivazovsky, Review of the Black Sea Fleet in 1849, 1886; public domain (author died 1900); via Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "red-sea-cargo-ship-attack-yemen",
    "headline": "Cargo ship reports coming under attack in the Red Sea off Yemen",
    "overview": "A bulk carrier reported being attacked by armed assailants in a skiff about 30 nautical miles southwest of the Houthi-held port of Hodeida in the Red Sea on July 5, 2026, the British military's UK Maritime Trade Operations centre said. The attackers opened fire before the ship's guards returned fire, and the vessel and crew were reported safe. No group immediately claimed the attack.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxONm9jMzVyNFJ5NlJ3dXAzcWpYTkxGam1ZNE1wSEVBVmNlSWFIUndEdEhsMDJfdUNvN2FTS0JnMkpjOVBpS3VnZGh2bWptN1ZHYjhuQkNxOHBlMjVPZjIzdTlkVHRWckxYUHBsTGwzQTFWeUdrU2JoTnFneFhQbWZ5V1hWNGVoNjM4NmVV?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/05/cargo-vessel-in-red-sea-reports-attack-uk-maritime-body-says.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/red-sea-cargo-ship-attack-yemen.png",
      "alt": "A locator map of Yemen showing the Red Sea, the Gulf of Aden and the cities of Sana'a and Aden",
      "credit": "AP graphic (map data © OpenStreetMap contributors) via ABC News"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Julius Caesar Captured by Cilician Pirates (Plutarch, Life of Caesar 2)",
        "excerpt": "To begin with, then, when the pirates demanded twenty talents for his ransom, he laughed at them for not knowing who their captive was, and of his own accord agreed to give them fifty.",
        "source": "Plutarch, Life of Caesar 2.1, trans. Bernadotte Perrin (Loeb, 1919), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0244:chapter=2"
      },
      {
        "category": "historical",
        "title": "Pompey's War on the Pirates Who Closed the Sea (Plutarch, Life of Pompey 24)",
        "excerpt": "The power of the pirates had its seat in Cilicia at first, and at the outset it was venturesome and elusive; but it took on confidence and boldness during the Mithridatic war, because it lent itself to the king's service. ... This power extended its operations over the whole of our Mediterranean Sea, making it unnavigable and closed to all commerce.",
        "source": "Plutarch, Life of Pompey 24, trans. Bernadotte Perrin (Loeb, 1917), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0058:chapter=24"
      },
      {
        "category": "literary",
        "title": "Nestor Asks If the Strangers Are Sea-Robbers (Homer, Odyssey III)",
        "excerpt": "Strangers, who are ye? Whence sail ye over the wet ways? On some trading enterprise, or at adventure do ye rove, even as sea-robbers, over the brine, for they wander at hazard of their own lives bringing bale to alien men?",
        "source": "Homer, The Odyssey, Book III, trans. S. H. Butcher and A. Lang (prose), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1728/pg1728.txt"
      },
      {
        "category": "literary",
        "title": "Byron, The Corsair, Canto I — the Pirate Song",
        "excerpt": "O'er the glad waters of the dark blue sea, / Our thoughts as boundless, and our souls as free, / Far as the breeze can bear, the billows foam, / Survey our empire, and behold our home!",
        "source": "Lord Byron, The Corsair (1814), Canto I, stanza I, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Corsair_(Byron,_1814)/CANTO_I"
      },
      {
        "category": "artistic",
        "title": "Hector Berlioz, Overture 'Le Corsaire', H. 101 (Op. 21)",
        "excerpt": "Berlioz's concert overture opens with a headlong, spray-flung rush of strings that evokes a corsair's raid across open water. Conceived on the wave-battered coast near Nice and named for the piratical hero of Romantic sea-tales, the music swings between surging attack and a brooding lyrical calm before driving to a triumphant, almost predatory finish. It is one of the repertoire's most vivid portraits of danger and daring upon the sea.",
        "source": "Hector Berlioz, Overture 'Le Corsaire', H. 101 — full score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Overture_'Le_Corsaire',_H_101_(Berlioz,_Hector)"
      },
      {
        "category": "artistic",
        "title": "Howard Pyle, 'An Attack on a Galleon' (1905)",
        "excerpt": "Pyle paints the terror of the old trade routes: a towering galleon looms in the smoke while a small, low pirate craft slips alongside to board her. Gunfire lights the billowing clouds as raiders swarm up the great vessel's side, the huge merchantman all but helpless before the nimble attackers. It distills the ancient asymmetry of a lone armed skiff striking a laden ship at sea.",
        "source": "Howard Pyle, 'An Attack on a Galleon' (1905), Delaware Art Museum; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Attack_on_a_Galleon.jpg",
        "image": {
          "src": "/covers/red-sea-cargo-ship-attack-yemen--art.png",
          "alt": "A towering galleon wreathed in cannon smoke is attacked at close range by a small low pirate boat, with raiders swarming her side amid gunfire on the open sea.",
          "credit": "Howard Pyle, 'An Attack on a Galleon', 1905; public domain; via Wikimedia Commons"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "macron-visit-syria-damascus",
    "headline": "Macron expected to visit Syria in first trip by a Western European leader since Assad's fall",
    "overview": "Syria's presidency said on July 5, 2026 that French President Emmanuel Macron is expected to visit the country for talks on strengthening ties, in what would be the first visit by a Western European head of state since the fall of Bashar al-Assad. Macron is expected to meet interim President Ahmed al-Sharaa, accompanied by a delegation of French investors and companies. No date for the trip was announced.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQMlpGYWxDdEIwTHZtZ2dZUm1rU18xUzNJa24yU2F1TEdPUVh2ZHVLdXh1bkE3dk5icVlwZ0o0bEQ4VVdjaElia190dEZyaVQ3V3hpbzlnSEFjaFFQRHNvV21QOURoMlVIZ19veEFXTnFubnZGZDRxWV9YUlh6SmswN1p1aC1td0dPMkpoY2h3djdhcWZ2djMza2lPRk9RaXBuYTFzOHpvZ1ZSTnV2cFdsYUNB?oc=5"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2649735/middle-east"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/macron-visit-syria-damascus.png",
      "alt": "French President Emmanuel Macron shaking hands with Syria's interim President Ahmed al-Sharaa in front of flags",
      "credit": "Arab News"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Themistocles received by the Persian King (Thucydides, History of the Peloponnesian War, Book I.137)",
        "excerpt": "He sent a letter to King Artaxerxes, Xerxes's son, who had just come to the throne. Its contents were as follows: \"I, Themistocles, am come to you, who did your house more harm than any of the Hellenes, when I was compelled to defend myself against your father's invasion—harm, however, far surpassed by the good that I did him during his retreat... for the present, able to do you great service, I am here, pursued by the Hellenes for my friendship for you. However, I desire a year's grace, when I shall be able to declare in person the objects of my coming.\" It is said that the King approved his intention, and told him to do as he said... Arrived at court at the end of the year, he attained to very high consideration there, such as no Hellene has ever possessed before or since.",
        "source": "Thucydides, History of the Peloponnesian War, Book I.137–138 (trans. Richard Crawley), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "historical",
        "title": "Cyrus spares his enemy Croesus and seats him beside his throne (Herodotus, Histories, Book I.87–88)",
        "excerpt": "Then Cyrus, having perceived that Croesus was a lover of the gods and a good man, caused him to be brought down from the pyre and asked him as follows: \"Croesus, tell me who of all men was it who persuaded thee to march upon my land and so to become an enemy to me instead of a friend?\"... So he spoke, and Cyrus loosed his bonds and caused him to sit near himself and paid to him much regard, and he marvelled both himself and all who were about him at the sight of Croesus.",
        "source": "Herodotus, The History of Herodotus, Book I.87–88 (trans. G. C. Macaulay), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "literary",
        "title": "The Queen of Sheba visits King Solomon (1 Kings 10, King James Bible)",
        "excerpt": "And when the queen of Sheba heard of the fame of Solomon concerning the name of the LORD, she came to prove him with hard questions. And she came to Jerusalem with a very great train, with camels that bare spices, and very much gold, and precious stones... And she said to the king, It was a true report that I heard in mine own land of thy acts and of thy wisdom. Howbeit I believed not the words, until I came, and mine eyes had seen it: and, behold, the half was not told me: thy wisdom and prosperity exceedeth the fame which I heard.",
        "source": "The Holy Bible, King James Version, 1 Kings 10:1–7, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "literary",
        "title": "Queen Dido welcomes the wandering Aeneas to newly-built Carthage (Virgil, Aeneid, Book I, Dryden translation)",
        "excerpt": "Enter, my noble guest, and you shall find, / If not a costly welcome, yet a kind: / For I myself, like you, have been distress'd, / Till Heav'n afforded me this place of rest; / Like you, an alien in a land unknown, / I learn to pity woes so like my own.",
        "source": "Virgil, The Aeneid, Book I (trans. John Dryden), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, \"The Arrival of the Queen of Sheba,\" Sinfonia opening Act III of the oratorio Solomon, HWV 67 (1748)",
        "excerpt": "A brisk, glittering orchestral sinfonia of interlacing oboes and darting strings that Handel wrote to depict a foreign sovereign sweeping into Solomon's court. The music enacts an arrival: two voices call and answer as if envoys advancing in procession, building an atmosphere of ceremony, welcome, and the meeting of two powers before a single word is sung.",
        "source": "George Frideric Handel, Solomon, HWV 67, Act III Sinfonia (\"The Arrival of the Queen of Sheba\"), full score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Solomon,_HWV_67_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Sir Edward John Poynter, \"The Visit of the Queen of Sheba to King Solomon\" (1890)",
        "excerpt": "Poynter's vast, archaeologically detailed canvas stages the moment of encounter: the Queen of Sheba, trailed by a great retinue bearing gold and spices, ascends the marble steps of Solomon's throng-filled hall to be received by the enthroned king. Courtiers, guards, and bearers of tribute crowd a scene of pomp and diplomacy—one realm formally paying court to another, the meeting of two powers made spectacle.",
        "source": "Sir Edward John Poynter, oil on canvas, 1890, Art Gallery of New South Wales; via Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Sir_Edward_John_Poynter_-_The_visit_of_the_Queen_of_Sheba_to_King_Solomon_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/macron-visit-syria-damascus--art.png",
          "alt": "A grand columned hall in which the Queen of Sheba and her richly dressed retinue, bearing gifts, are received by King Solomon enthroned amid a crowd of courtiers.",
          "credit": "Sir Edward John Poynter, 'The Visit of the Queen of Sheba to King Solomon', 1890; public domain; via Wikimedia Commons"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "iran-qatar-maritime-trade-resume",
    "headline": "Iran and Qatar resume maritime trade after a five-month suspension",
    "overview": "Iranian state media reported on July 5, 2026 that shipping between Iran's Dayyer port and Qatar's Al Ruwais port has resumed after a roughly five-month halt. Iran's commercial attaché in Doha said the restart followed coordination between the Iranian embassy and Qatari authorities. The resumption follows a US-Iran deal last month declaring an end to hostilities and a return of pre-war Gulf traffic.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPNGpKTHAxUnc3bjEyYzczRHhyc2JxYUdEbWlKY3g5MWlVZWJfT3RSRVl5MDJQemVfTHRydm94TUktcTQ1ZjlSOEkyR2Ital9NUUllbVBLcUZEckxPWk40c0dJTXNKQkQxcWlBOEVNZTFtYnA2X3dTNERvZmJNWDRXTVRxRXc2S0JFX3F4cTRvTXZiUjBKRlEzYUh1VkR0UmxGcUpEWFJ4OU1TWko2VVhaM1A5UVY?oc=5"
      },
      {
        "name": "The Times of Israel",
        "href": "https://www.timesofisrael.com/liveblog_entry/iran-and-qatar-resume-maritime-trade-after-5-month-suspension-iranian-state-media-reports/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/iran-qatar-maritime-trade-resume.png",
      "alt": "A large bulk-carrier cargo ship at sea",
      "credit": "Public domain via Wikimedia Commons"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Marco Polo on the port of Hormuz, a Persian Gulf emporium of world trade",
        "excerpt": "Merchants come thither from India, with ships loaded with spicery and precious stones, pearls, cloths of silk and gold, elephants' teeth, and many other wares, which they sell to the merchants of Hormos, and which these in turn carry all over the world to dispose of again. In fact, 'tis a city of immense trade.",
        "source": "The Travels of Marco Polo, Volume 1 (trans. Henry Yule), Book I, Ch. XIX — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/10636/pg10636.txt"
      },
      {
        "category": "historical",
        "title": "Herodotus: Gulf-born Phoenician merchants open the long sea routes",
        "excerpt": "These, they say, came from that which is called the Erythraian Sea to this of ours; and having settled in the land where they continue even now to dwell, set themselves forthwith to make long voyages by sea. And conveying merchandise of Egypt and of Assyria they arrived at other places and also at Argos... the Phenicians arrived then at this land of Argos, and began to dispose of their ship's cargo.",
        "source": "Herodotus, The History, Book I.1 (trans. G. C. Macaulay) — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "literary",
        "title": "The first voyage of Sindbad the Sailor: setting sail to trade among the islands",
        "excerpt": "Thus prepared I set sail with a company of merchants in a ship bound for the city of El-Basrah. For many days and nights we sailed upon the sea, visiting islands and passing thence to other islands; and everywhere we bartered, and bought and sold.",
        "source": "Sindbad the Sailor & Other Stories from the Arabian Nights, \"The First Voyage\" — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/47285/pg47285.txt"
      },
      {
        "category": "literary",
        "title": "Ezekiel's lament for Tyre, the sea-merchant of many isles",
        "excerpt": "And say unto Tyrus, O thou that art situate at the entry of the sea, which art a merchant of the people for many isles, Thus saith the Lord GOD; O Tyrus, thou hast said, I am of perfect beauty. Thy borders are in the midst of the seas, thy builders have perfected thy beauty.... The ships of Tarshish did sing of thee in thy market: and thou wast replenished, and made very glorious in the midst of the seas.",
        "source": "Bible (King James Version), Ezekiel 27:3–4, 25 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ezekiel"
      },
      {
        "category": "artistic",
        "title": "Rimsky-Korsakov, Scheherazade, Op. 35 — I. \"The Sea and Sinbad's Ship\"",
        "excerpt": "A stern unison for the sultan gives way to a rocking, swelling theme in the strings, and a single violin spins the storyteller's tale over harp arpeggios. The music becomes a merchant vessel riding long Gulf swells, sails filling as it glides from port to port. Woodwinds and brass rise and fall like the sea itself, carrying the ship — and its cargo of wonders — across open water toward distant harbors.",
        "source": "Nikolai Rimsky-Korsakov, Scheherazade, Op. 35 (1888), full orchestral score — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Scheherazade,_Op.35_(Rimsky-Korsakov,_Nikolay)"
      },
      {
        "category": "artistic",
        "title": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba (1648)",
        "excerpt": "A radiant sun hangs low over a calm harbor, its light spilling gold across the water and the hulls of anchored merchant ships. Along the quay, figures load and unload bales beneath grand classical palaces, while a fleet waits to carry a royal party and its treasures across the sea. Lorrain turns commerce into serenity: the port is a threshold where wealth, travel, and peace meet at the water's edge.",
        "source": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba, 1648, oil on canvas, National Gallery, London — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Lorrain_008.jpg",
        "image": {
          "src": "/covers/iran-qatar-maritime-trade-resume--art.png",
          "alt": "A sunlit classical seaport at dawn: merchant ships anchored in a calm harbor, figures loading goods along a quay lined with grand palatial buildings, as a royal party prepares to embark.",
          "credit": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba, 1648; public domain; via Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "china-maysak-tropical-storm-floods",
    "headline": "Heavy rains kill five in northern China as Tropical Storm Maysak floods the south and Vietnam",
    "overview": "Flash floods killed at least five people in Inner Mongolia and Liaoning province in northern China on July 5, 2026, while Tropical Storm Maysak, after landfall in northern Vietnam, flooded the southern region of Guangxi. Residents in Fangchenggang described the worst flooding in two decades, with rivers overflowing and cars submerged. The storm earlier toppled trees and ripped roofs off buildings in Vietnam.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPU2FBYmoxYWYybkdvaE56VnNaV1lJYk5fZW0wblpHNk0wOEw3dHd3RE1LZ2ZCeGxMdkhHRy1zWndDWk81NE9FWjNsVFNUcDVmODduWDVRVlFoc2lCTVZKcFlRWURqQ0pOeGpXTXMza090ZkZENVNFejczZjRPQzVfSUozRXlqbzVjeWh5UXJ0NnZrYjNNYnNKdGhhUEpPQk5OVzRLUw?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/07/05/china-vietnam-typhoon-maysak-rain-flooding/b6c390c0-7855-11f1-b194-f872dd4ec5aa_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/china-maysak-tropical-storm-floods.png",
      "alt": "A man and child watch large storm waves crash over a waterfront barrier during a tropical storm",
      "credit": "AP Photo via The Star"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Defoe's The Storm — the Great Storm of 1703",
        "excerpt": "the Water rising Six or Eight Foot higher than it was ever known to do in the Memory of Man; by which Ships were fleeted up upon the firm Land several Rods off from the Banks",
        "source": "Daniel Defoe, The Storm; or, a Collection of the most Remarkable Casualties and Disasters which happen'd in the Late Dreadful Tempest, both by Sea and Land (1704), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/42234/42234-h/42234-h.htm"
      },
      {
        "category": "historical",
        "title": "The Johnstown Flood of 1889",
        "excerpt": "Houses were spinning through beneath the bridge, and I did not know at what moment the structure would melt away under the train.",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (1889), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
      },
      {
        "category": "literary",
        "title": "The Flood of Noah — Genesis 7",
        "excerpt": "And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered. And all flesh died that moved upon the earth, both of fowl, and of cattle, and of beast, and of every creeping thing that creepeth upon the earth, and every man.",
        "source": "Bible (King James Version), Genesis 7:19–21, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "The Deluge in Ovid's Metamorphoses, Book I",
        "excerpt": "And now sea and land had no mark of distinction; everything now was ocean; and to that ocean shores were wanting.",
        "source": "Ovid, Metamorphoses, Book I (Henry T. Riley trans., 1851), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/21765/21765-h/21765-h.htm"
      },
      {
        "category": "artistic",
        "title": "Saint-Saëns, Le déluge (The Flood), Op. 45",
        "excerpt": "Saint-Saëns's biblical oratorio renders the deluge in sound: after a serene violin prelude, the orchestra swells into surging chromatic waves as the fountains of the deep break open and rain drowns the world. Strings churn like rising floodwater and the chorus laments a humanity abandoned to the water, before a lone dove signals the receding tide.",
        "source": "Camille Saint-Saëns, Le déluge (poème biblique), Op. 45 (1875), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Le_déluge,_Op.45_(Saint-Saëns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "Hokusai, The Great Wave off Kanagawa",
        "excerpt": "A towering wave rears over three slender fishing boats, its foaming claws poised to fall as the boatmen crouch helpless beneath the crest. Distant Mount Fuji shrinks to a small peak between the walls of water, dwarfed by the sea, an image of frail humanity at the mercy of an overwhelming flood.",
        "source": "Katsushika Hokusai, The Great Wave off Kanagawa, from Thirty-six Views of Mount Fuji (c. 1830–1832), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/china-maysak-tropical-storm-floods--art.png",
          "alt": "A giant cresting ocean wave with foaming claw-like tips looms over small fishing boats, with a small Mount Fuji in the distance",
          "credit": "Katsushika Hokusai, The Great Wave off Kanagawa, c. 1830–1832; public domain; via Wikimedia Commons"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "morocco-canada-world-cup-quarterfinals",
    "headline": "Morocco beats World Cup co-host Canada 3-0 to reach the quarterfinals",
    "overview": "Morocco defeated co-host Canada 3-0 in the World Cup Round of 16 on July 5, 2026, eliminating one of the tournament's hosts and advancing to the quarterfinals. Azzedine Ounahi was among the scorers as the North African side ended Canada's run. It continued a strong World Cup for Morocco.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxQV2xNUDJGaE9BRk1ENkt4T3dWVThhNkdsWVYxRjhELXhpUG5aai1vSmxrNFpWcTYtUW5MYjJOZTBwVHBYdW9fUEMzVFY4eWJuTzRDdTlraDVTZkRfa2lsV3dXMUZNZlVnZ2tlcGhXaHdXTFhscWY0QWFTYTJ0cWM4eW1QZHljVU43MGRERFp4RDB0aEdq?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxPNjNyLUhPWmVMc1ByblNuVHlfUHZ6V0tNSnctVzBaeF9TVkQtRTUxV2lZYlh4eWVVYmxxNzZobjlWamh0V1M2U3gxcmdFMUdqbDdrVUMzZnZrdndheERGQjdPWkFvSXpaTGZoREJZWWFvdDc3bDlEcUNJNkhZN2dONXhFZ2V2RFd4ZzlCLWpSdmN6a240MUxpR0RGOGZwTTlLMUJVUUVPVQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/morocco-canada-world-cup-quarterfinals.png",
      "alt": "A packed football stadium under floodlights during a night match",
      "credit": "Wisła Kraków match, CC BY 4.0 via Wikimedia Commons"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus on the Olympic Games — glory, not money (Histories 8.26)",
        "excerpt": "The Arcadians telling them that the Greeks were keeping the Olympic festival and viewing sports and horse-races, the Persian asked what was the prize offered, wherefore they contended; and they told him of the crown of olive that was given to the victor. Then Tigranes son of Artabanus uttered a most noble saying ... when he heard that the prize was not money but a crown, he could not hold his peace, but cried, \"Zounds, Mardonius, what manner of men are these that you have brought us to fight withal? 'tis not for money they contend but for glory of achievement!\"",
        "source": "Herodotus, The Persian Wars, Book VIII.26 (trans. A. D. Godley), Wikisource",
        "href": "https://en.wikisource.org/wiki/Herodotus_The_Persian_Wars_(Godley)/Book_VIII"
      },
      {
        "category": "historical",
        "title": "Pausanias on the victor statues at Olympia (Description of Greece 6.1)",
        "excerpt": "After my description of the votive offerings I must now go on to mention the statues of racehorses and those of men, whether athletes or ordinary folk. Not all the Olympic victors have had their statues erected; some, in fact, who have distinguished themselves, either at the games or by other exploits, have had no statue. These I am forced to omit by the nature of my work, which is not a list of athletes who have won Olympic victories, but an account of statues and of votive offerings generally.",
        "source": "Pausanias, Description of Greece, Book VI.1.1–2 (trans. W. H. S. Jones), Wikisource",
        "href": "https://en.wikisource.org/wiki/Description_of_Greece_(Jones)/Book_6"
      },
      {
        "category": "literary",
        "title": "The foot race at the funeral games (Homer, Iliad, Book 23)",
        "excerpt": "So spake he, and forthwith uprose swift Aias, son of Oïleus, and Odysseus of many wiles, and after them Antilochus, Nestor's son, for he surpassed all the youths in swiftness of foot.",
        "source": "Homer, Iliad, Book 23 (trans. A. T. Murray), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=23:card=740"
      },
      {
        "category": "literary",
        "title": "Pindar crowns the Olympic victor (Olympian Ode 1)",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth. But if, my heart, you wish to sing of contests, look no further for any star warmer than the sun, shining by day through the lonely sky, and let us not proclaim any contest greater than Olympia.",
        "source": "Pindar, Olympian 1 (trans. Diane Arnson Svarlien), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1"
      },
      {
        "category": "artistic",
        "title": "Handel, \"See, the Conqu'ring Hero Comes\" (Judas Maccabaeus, HWV 63)",
        "excerpt": "See, the conqu'ring hero comes! Sound the trumpets, beat the drums! Sports prepare, the laurel bring, songs of triumph to him sing.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63, Act III (libretto by Thomas Morell), full scores, IMSLP",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Runners in the stadion race — Terracotta Panathenaic prize amphora",
        "excerpt": "Five nude, bearded athletes surge forward in the sprint of the stadion, each with left leg thrust into a long stride, their muscles cut in fine incised lines against the black glaze — the winning runner's prize the very vessel that pictures the race, once brimming with sacred Athenian olive oil.",
        "source": "Attributed to the Euphiletos Painter, Terracotta Panathenaic prize amphora, ca. 530 B.C., The Metropolitan Museum of Art; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Terracotta_Panathenaic_prize_amphora_MET_GR147.jpg",
        "image": {
          "src": "/covers/morocco-canada-world-cup-quarterfinals--art.png",
          "alt": "Black-figure Greek amphora showing five nude bearded runners in mid-stride competing in the stadion foot race",
          "credit": "Attributed to the Euphiletos Painter, Terracotta Panathenaic prize amphora, ca. 530 B.C., Metropolitan Museum of Art; public domain (CC0); via Wikimedia Commons"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "tour-de-france-del-toro-stage-two",
    "headline": "Del Toro wins Tour de France stage two as Pogacar closes on race leader Vingegaard",
    "overview": "Mexican rider Isaac del Toro won stage two of the Tour de France on July 5, 2026, while defending champion Tadej Pogacar narrowed the gap to race leader Jonas Vingegaard. Del Toro took the win at the end of the stage. The result tightened the battle for the overall lead early in the race.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxPV0trS1h3aU9xWU9WWGtLenFfU3VCSXVYSXUzNGh5RnN5V1BQbFhERUt4eVl2bjRUY0dtMmxpMERKdmhzMnJ3SFFVTWxYdlJSVzU1TUV0MktMaGVrVXBrTGJDc3JFMTVUWFM3YndtR0RQa1pPVXdSSDVPNl9tVkdhQVRyOG4tRnVEUy16VFlQdXUydERMalQ5SUVKZ1lfNFB3bFo1V0FjM212Mjg?oc=5"
      },
      {
        "name": "Reuters (stage three wildfires)",
        "href": "https://news.google.com/rss/articles/CBMi0wFBVV95cUxOdklrQVJoYVlHczhybFRWMC0xbGZJRjJ6Rzd0SHlaV3lIVllYc09WSWdjakNBRm5IelZ0dmdONVlyejV0TEI0SExrRm54ejlHR25ZTjAxQmtNc0E5dHpHNnNOZzY1Zmc4ZWdldWxLbGFlZndQd0t6ZTlLX2ZEVTVvOG05c0o3eEdPNVpPTHBYa3hrX0xENEdtNGNxSEV2R1RmTzIwZGxFb1haSXVuYURtQjIxXzRQR29TQ1RhZDVSdERmNTRmM2U3R0M1M1JicnRsMU5B?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/tour-de-france-del-toro-stage-two.png",
      "alt": "A tight peloton of road cyclists racing along a road during the Tour de France",
      "credit": "Tour de France 2021, CC BY-SA 4.0 via Wikimedia Commons"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Younger on the frenzy of the chariot races",
        "excerpt": "It was the time of celebrating the Circensian games; an entertainment for which I have not the least taste. It does the more surprise me therefore that so many thousand people should be possessed with the childish passion of desiring so often to see a parcel of horses gallop, and men standing upright in their chariots. If, indeed, it were the swiftness of the horses, or the skill of the men that attracted them, there might be some pretence of reason for it.",
        "source": "Pliny the Younger, Letters, Book 9, Letter 6 (to Calvisius), trans. William Melmoth — Project Gutenberg",
        "href": "https://gutenberg.org/files/2811/2811-h/2811-h.htm"
      },
      {
        "category": "historical",
        "title": "Pausanias records the first Olympic champion, a runner",
        "excerpt": "The people of Elis say that the boundary is the tomb of Corœbus, who was victor when Iphitus restored the Olympian games that had been for a long time discontinued, and offered prizes only for racing. And there is an inscription on his tomb that he was the first victor at Olympia, and that his tomb was erected on the borders of Elis.",
        "source": "Pausanias, Description of Greece, 8.26 (on Corœbus, first victor of the Olympic foot-race), trans. A. R. Shilleto — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/68680/68680-h/68680-h.htm"
      },
      {
        "category": "literary",
        "title": "Homer's chariot race: the pursuer closing on the leader",
        "excerpt": "And forthwith the swift-footed mares of the son of Pheres shot to the front, and after them Diomedes' stallions of the breed of Tros; not far behind were they, but close behind, for they seemed ever like to mount upon Eumelus' car, and with their breath his back waxed warm and his broad shoulders, for right over him did they lean their heads as they flew along.",
        "source": "Homer, Iliad, Book 23 (the chariot race at Patroclus' funeral games), trans. A. T. Murray — Perseus Digital Library, Tufts",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=23:card=362"
      },
      {
        "category": "literary",
        "title": "Virgil's foot-race: the front-runner outstrips the field",
        "excerpt": "Shot from the crowd, swift Nisus all o'erpass'd; / Nor storms, nor thunder, equal half his haste. / The next, but tho' the next, yet far disjoin'd, / Came Salius, and Euryalus behind.",
        "source": "Virgil, Aeneid, Book 5 (the foot-race at Anchises' funeral games), trans. John Dryden — Perseus Digital Library, Tufts",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=5:card=315"
      },
      {
        "category": "artistic",
        "title": "Rossini's galloping finale to the Guillaume Tell overture",
        "excerpt": "The overture's closing March of the Swiss Soldiers erupts into a headlong cavalry charge of hammering strings and blazing trumpets. Its relentless, accelerating rhythm becomes pure pursuit, a surge of momentum driving toward an imagined finishing line. Few pieces so completely distil speed, stamina, and the exhilaration of the will to win.",
        "source": "Gioachino Rossini, Guillaume Tell — Overture (galop finale), 1829; full scores and parts — IMSLP",
        "href": "https://imslp.org/wiki/Guillaume_Tell_(Rossini,_Gioacchino)"
      },
      {
        "category": "artistic",
        "title": "Tominz paints the thunder of the Circus Maximus",
        "excerpt": "A dramatic canvas of quadrigas thundering around the Circus Maximus, charioteers braced low and straining as their teams jostle for the lead before a packed grandstand. The dust, the massed horses, and the raw velocity capture the ancient spectacle of the race and the rivalry of champions that mirrors a modern peloton's charge to the line.",
        "source": "Alfredo Tominz, The Chariot Race in the Circus Maximus, 1890 — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Alfredo_Tominz_-_The_chariot_race_in_the_Circus_Maximus.jpg",
        "image": {
          "src": "/covers/tour-de-france-del-toro-stage-two--art.png",
          "alt": "Oil painting of four-horse chariots racing around the turning-posts of the Circus Maximus, drivers straining forward amid dust before a crowded grandstand",
          "credit": "Alfredo Tominz, The Chariot Race in the Circus Maximus, 1890; public domain (author died 1936); via Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "australia-space-balls-queensland-debris",
    "headline": "Mysterious 'space balls' wash up on Queensland beaches, prompting exclusion zones",
    "overview": "Six large spheres of suspected space debris washed up near Forrest Beach in Townsville, Queensland, prompting Australian authorities to set up exclusion zones, officials said on July 5, 2026. The Australian Space Agency was investigating the objects, thought to be pressurized fuel tanks from a rocket stage that may contain toxic residue. Police said there was no danger to the community, and five of the objects were secured in drums.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cp9lppvkmz5o"
      },
      {
        "name": "The Irish Times",
        "href": "https://www.irishtimes.com/world/australia/2026/07/05/space-balls-mysterious-debris-found-on-australian-beaches-could-contain-toxic-rocket-fuel/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/australia-space-balls-queensland-debris.png",
      "alt": "A large metallic sphere of suspected space debris resting on the ground beside fallen timber and scrub",
      "credit": "The Irish Times"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Livy, History of Rome (Ab Urbe Condita), Book 1.31 — the shower of stones on the Alban Mount",
        "excerpt": "At this time it was reported to the king and the senate that there had been a shower of stones on the Alban Mount.",
        "source": "Livy, History of Rome, Book I, ch. 31 (Rev. Canon Roberts translation), Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=1:chapter=31"
      },
      {
        "category": "historical",
        "title": "Plutarch, Life of Lysander, ch. 12 — the great stone that fell from heaven at Aegospotami",
        "excerpt": "For a stone of a great size did fall, according to the common belief, from heaven, at Ægos Potami, which is shown to this day, and had in great esteem by the Chersonites. And it is said that Anaxagoras foretold, that the occurrence of a slip or shake among the bodies fixed in the heavens, dislodging any one of them, would be followed by the fall of the whole of them.",
        "source": "Plutarch's Lives, 'Life of Lysander' (Dryden translation, revised by A. H. Clough), Wikisource",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Life_of_Lysander"
      },
      {
        "category": "literary",
        "title": "Revelation 8:10–11 — the falling star named Wormwood that poisons the waters",
        "excerpt": "And the third angel sounded, and there fell a great star from heaven, burning as it were a lamp, and it fell upon the third part of the rivers, and upon the fountains of waters; And the name of the star is called Wormwood: and the third part of the waters became wormwood; and many men died of the waters, because they were made bitter.",
        "source": "The Holy Bible, King James Version, Revelation, ch. 8, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Revelation"
      },
      {
        "category": "literary",
        "title": "H. G. Wells, The War of the Worlds, Book I, ch. II 'The Falling Star' — the cylinder in the pit",
        "excerpt": "The Thing itself lay almost entirely buried in sand, amidst the scattered splinters of a fir tree it had shivered to fragments in its descent. The uncovered part had the appearance of a huge cylinder, caked over and its outline softened by a thick scaly dun-coloured incrustation. It had a diameter of about thirty yards.",
        "source": "H. G. Wells, The War of the Worlds (1898), Project Gutenberg eBook #36",
        "href": "https://www.gutenberg.org/files/36/36-0.txt"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, The Planets, Op. 32 — 'Neptune, the Mystic'",
        "excerpt": "Holst's suite closes on the outermost, least-known world, where hushed strings and a wordless, unseen women's chorus drift in and out like something glimpsed but never grasped. The music conjures exactly the mood of an object arriving from the dark beyond the sky: cold, beautiful, and quietly unnerving. It fades to silence rather than resolving, leaving the listener suspended between wonder and dread at what lies out there.",
        "source": "Gustav Holst, The Planets, Op. 32 (1914–16), full orchestral score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Frederic Edwin Church, The Meteor of 1860",
        "excerpt": "Church paints the rare Earth-grazing meteor procession he witnessed over the Catskills in July 1860: a chain of blazing fireballs strung across a darkening sky, trailing molten light above a still, shadowed landscape. Awestruck onlookers below watch fragments of the heavens sail overhead, a spectacle of beauty shot through with foreboding. It is the same primal reaction that strange objects from above still provoke — the pull between marvel and alarm at wreckage falling out of the sky.",
        "source": "Frederic Edwin Church (1826–1900), 'The Meteor of 1860', oil on canvas, 1860; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Frederic_Church_Meteor_of_1860.jpg",
        "image": {
          "src": "/covers/australia-space-balls-queensland-debris--art.png",
          "alt": "Oil painting of a procession of bright meteor fireballs streaking across a twilight sky above a dim landscape and water.",
          "credit": "Frederic Edwin Church, 'The Meteor of 1860', 1860; public domain; via Wikimedia Commons"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "nieves-gonzalez-puffer-coat-portraits",
    "headline": "Nieves González paints women in modern puffer coats as Spanish Baroque portraits",
    "overview": "Colossal profiled Spanish painter Nieves González on July 5, 2026, whose oil portraits dress contemporary women in puffer coats and parkas while borrowing the dramatic chiaroscuro of 17th-century Spanish Baroque masters like Velázquez and Murillo. Her solo show 'A Friendship Story' runs at Richard Heller Gallery in Santa Monica through July 25. González says she has never tried to separate 'the cultured from the popular or the historical from the contemporary.'",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/nieves-gonzalez-paintings-portraits-puffer-coats/"
      },
      {
        "name": "Nieves González (artist website)",
        "href": "https://nieves-gonzalez.com/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/nieves-gonzalez-puffer-coat-portraits.png",
      "alt": "A 17th-century Spanish Baroque oil portrait of a young woman in an elaborate court gown against a dark background",
      "credit": "Diego Velázquez, 'Retrato de la infanta María Teresa'; public domain via Wikimedia Commons"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Livy, History of Rome, Book 34 — the debate over the Oppian Law on women's finery (195 BC)",
        "excerpt": "No offices, no priesthoods, no triumphs, no decorations, no gifts, no spoils of war can come to them; elegance of appearance, adornment, apparel—these are the woman's badges of honour; in these they rejoice and take delight; these our ancestors called the woman's world.",
        "source": "Livy, The History of Rome, Book 34, ch. 7 (Lucius Valerius defending women against the sumptuary Oppian Law), trans. Evan T. Sage, 1935 — Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0164:book=34:chapter=7"
      },
      {
        "category": "historical",
        "title": "Pliny the Elder, Natural History, Book 35 — the lost art of the true portrait",
        "excerpt": "The painting of portraits, used to transmit through the ages extremely correct likenesses of persons, has entirely gone out. ... In the halls of our ancestors it was otherwise; portraits were the objects displayed to be looked at, not statues by foreign artists, nor bronzes nor marbles, but wax models of faces were set out each on a separate sideboard.",
        "source": "Pliny the Elder, Natural History, Book 35, ch. 2, trans. Rackham, Jones & Eichholz (Loeb) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Natural_History_(Rackham,_Jones,_%26_Eichholz)/Book_35"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde, The Picture of Dorian Gray — the portrait that holds a life",
        "excerpt": "How sad it is! I shall grow old, and horrible, and dreadful. But this picture will remain always young. ... If it were only the other way! If it were I who was to be always young, and the picture that was to grow old! ... I would give my soul for that!",
        "source": "Oscar Wilde, The Picture of Dorian Gray (1891), Chapter II — Project Gutenberg (plain text, eBook #174)",
        "href": "https://www.gutenberg.org/cache/epub/174/pg174.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Sonnet 24 — the eye that plays the painter",
        "excerpt": "Mine eye hath play'd the painter and hath stell'd, / Thy beauty's form in table of my heart; / My body is the frame wherein 'tis held, / And perspective it is best painter's art. ... Yet eyes this cunning want to grace their art, / They draw but what they see, know not the heart.",
        "source": "William Shakespeare, Shakespeare's Sonnets, Sonnet XXIV — Project Gutenberg (plain text, eBook #1041)",
        "href": "https://www.gutenberg.org/cache/epub/1041/pg1041.txt"
      },
      {
        "category": "artistic",
        "title": "Gaspar Sanz, Instrucción de música sobre la guitarra española (Zaragoza, 1674)",
        "excerpt": "Sanz set the popular dances heard in Spanish streets and courts—canarios, zarabandas, pavanas, the españoleta—into a rigorous method for the guitar, dressing the everyday tune in the elaborate counterpoint of high art. Composed in the same Spanish Baroque decades as Velázquez and Murillo, it refuses to keep the cultured and the popular apart, exactly the seam González works. To hear it is to feel a folk melody wearing courtly finery, past and present sounded on a single string.",
        "source": "Gaspar Sanz, Instrucción de música sobre la guitarra española (first published Zaragoza, 1674; public domain) — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Instrucci%C3%B3n_de_m%C3%BAsica_sobre_la_guitarra_espa%C3%B1ola_(Sanz,_Gaspar)"
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez, Infanta Margarita Teresa in a Blue Dress (1659)",
        "excerpt": "Velázquez frames a child in the vast silver-blue guardainfante of the Habsburg court, letting the dress itself—its bows, its glinting embroidery—carry the drama while the face floats pale out of a dim, shadowed ground. It is the chiaroscuro and the reverence for costume that González borrows and updates, swapping the farthingale for a puffer coat. Seen beside her portraits, the painting shows how a garment can become the whole subject, finery lit like a relic against the dark.",
        "source": "Diego Velázquez, Infanta Margarita Teresa in a Blue Dress, 1659, oil on canvas, Kunsthistorisches Museum, Vienna (public domain) — Wikimedia Commons file page",
        "href": "https://commons.wikimedia.org/wiki/File:Diego_Rodriguez_de_Silva_y_Vel%C3%A1zquez_-_Infanta_Margarita_Teresa_in_a_Blue_Dress_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/nieves-gonzalez-puffer-coat-portraits--art.png",
          "alt": "Oil portrait of the young Infanta Margarita Teresa standing in an elaborate silver-blue court gown against a dark background, her fair hair adorned, painted with dramatic Baroque light.",
          "credit": "Diego Velázquez, Infanta Margarita Teresa in a Blue Dress, 1659; public domain (artist died 1660); via Wikimedia Commons"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "inflatable-garments-temperature-regulation",
    "headline": "Dezeen rounds up five inflatable garments that use air to regulate the wearer's temperature",
    "overview": "Dezeen featured five inflatable garments on July 5, 2026 that trap air to control body temperature, from Sheryl Teng's pleated, valve-inflated Looft Jacket to Japanese fan jackets and Rick Owens's blow-up Adidas tracksuits. The projects use pockets of air, built-in fans or inflatable layers to insulate or cool the body. Several treat inflation as both a technical and a decorative feature.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/05/inflatable-garments-roundup/"
      },
      {
        "name": "Vollebak",
        "href": "https://www.vollebak.com/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-05",
    "image": {
      "src": "/covers/inflatable-garments-temperature-regulation.png",
      "alt": "An inflatable, air-filled garment used to regulate body temperature",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 5 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Franklin watches the Montgolfier balloon fill with rarefied air (1783)",
        "excerpt": "Its bottom was open, and in the middle of the Opening was fixed a kind of Basket Grate in which Faggots and Sheaves of Straw were burnt. The Air rarified in passing thro' this Flame rose in the Balloon, swell'd out its sides, and fill'd it.",
        "source": "Benjamin Franklin, letter to Sir Joseph Banks, 21 November 1783, printed in 'Benjamin Franklin and the First Balloons' (Project Gutenberg)",
        "href": "https://gutenberg.org/files/43809/43809-h/43809-h.htm"
      },
      {
        "category": "historical",
        "title": "Halley's diving bell traps a pocket of air to shield the body under the sea (1716)",
        "excerpt": "if the Cavity of the Vessel may contain a Tun of Water, a single Man may remain therein at least an Hour, without much inconvenience, at five or six Fathoms Deep... at thirty three Foot deep or thereabouts, the Bell will be half full of Water, the Pressure of it being then equal to that of the whole Atmosphere.",
        "source": "Edmond Halley, 'The Art of Living under Water,' Philosophical Transactions, vol. 29 (1714-1716), Internet Archive scan",
        "href": "https://archive.org/details/philtrans05114087"
      },
      {
        "category": "literary",
        "title": "Daedalus fashions wings and harnesses the air (Ovid, Metamorphoses VIII)",
        "excerpt": "He bound with thread the middle feathers, and the lower fixed with pliant wax; till so, in gentle curves arranged, he bent them to the shape of birds.... But when at last the father finished it, he poised himself, and lightly floating in the winnowed air waved his great feathered wings with bird-like ease.",
        "source": "Ovid, Metamorphoses, Book VIII (Daedalus and Icarus), trans. Brookes More; Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D8%3Acard%3D183"
      },
      {
        "category": "literary",
        "title": "Aeolus binds the winds in a bag of ox-hide (Homer, Odyssey X)",
        "excerpt": "He gave me a wallet, made of the hide of an ox nine years old, which he flayed, and therein he bound the paths of the blustering winds; for the son of Cronos had made him keeper of the winds, both to still and to rouse whatever one he will. And in my hollow ship he bound it fast with a bright cord of silver, that not a breath might escape, were it never so slight.",
        "source": "Homer, Odyssey, Book X (Aeolus and the bag of winds), trans. A. T. Murray; Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D10%3Acard%3D1"
      },
      {
        "category": "artistic",
        "title": "Vivaldi's 'Winter' scores the body braced against the biting wind (Le quattro stagioni, Op. 8)",
        "excerpt": "Agghiacciato tremar trà nevi algenti / Al Severo Spirar d'orrido Vento, / Correr battendo i piedi ogni momento; / E pel Soverchio gel batter i denti.",
        "source": "Antonio Vivaldi, Le quattro stagioni, Op. 8 - Concerto No. 4 in F minor 'L'inverno' (Winter), with its accompanying sonnet; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Four_Seasons_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "The first aeronauts borne aloft on heated air over Paris (1783 balloon print)",
        "excerpt": "A great decorated globe swells with fire-heated air and lifts free of the earth, carrying the first two aeronauts above the rooftops of Paris. Below, the crowd cranes upward as human ingenuity turns rarefied air into flight. It captures the founding moment when trapped, heated air first bore the human body skyward.",
        "source": "Illustration of the first manned Montgolfier balloon flight, 21 November 1783 (from 'Menneskeaandens sejre', 1904); via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Mongolfier_brothers'_hot_air_balloon_from_1783.jpg",
        "image": {
          "src": "/covers/inflatable-garments-temperature-regulation--art.png",
          "alt": "Engraved illustration of a large decorated hot-air balloon rising over Paris carrying Pilatre de Rozier and the Marquis d'Arlandes in its gallery, watched by a crowd, 21 November 1783.",
          "credit": "Unknown artist, first manned Montgolfier balloon flight of Pilatre de Rozier and the Marquis d'Arlandes over Paris, 21 November 1783 (from 'Menneskeaandens sejre', 1904); public domain; via Wikimedia Commons"
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
