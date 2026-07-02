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
    "rank": 1
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
    "rank": 2
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
    "rank": 3
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
    "rank": 4
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
    "rank": 5
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
    "rank": 6
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
    "rank": 7
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
    "rank": 8
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
    "rank": 9
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
    "rank": 10
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
    "rank": 11
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
    "rank": 12
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
    "rank": 13
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
    "rank": 14
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
    "rank": 15
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
    "rank": 16
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
    "rank": 17
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
    "rank": 18
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
    "rank": 19
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
    "rank": 20
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
    "rank": 21
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
    "rank": 22
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
    "rank": 23
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
    "rank": 24
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
    "rank": 25
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
    "rank": 26
  },
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
    "rank": 27
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
    "rank": 28
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
    "rank": 29
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
    "rank": 30
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
    "rank": 31
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
    "rank": 32
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
    "rank": 33
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
    "rank": 34
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
    "rank": 35
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
    "rank": 36
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
    "rank": 37
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
    "rank": 38
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
