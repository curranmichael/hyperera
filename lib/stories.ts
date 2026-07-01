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
    "rank": 1,
    "lead": true
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
    "rank": 2
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
    "rank": 3
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
    "rank": 4
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
    "rank": 5
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
    "rank": 6
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
    "rank": 7
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
    "rank": 8
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
    "rank": 9
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
    "rank": 10
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
    "rank": 11
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
    "rank": 12
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
    "rank": 13
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
    "rank": 14
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
    "rank": 15
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
    "rank": 16
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
    "rank": 17
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
    "rank": 18
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
    "rank": 19
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
    "rank": 20
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
    "rank": 21
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
    "rank": 22
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
    "rank": 23
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
    "rank": 24
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
    "rank": 25
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
    "rank": 26
  },
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
    "rank": 27
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
    "rank": 28
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
    "rank": 29
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
    "rank": 30
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
    "rank": 31
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
    "rank": 32
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
    "rank": 33
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
    "rank": 34
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
    "rank": 35
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
    "rank": 36
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
    "rank": 37
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
    "rank": 38
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
