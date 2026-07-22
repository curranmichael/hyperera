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
// the Morning Edition of 22 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Evening Edition of 21 July 2026 and the Morning Edition of 21 July 2026.
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
    "slug": "openai-autonomous-ai-hack-unprecedented",
    "headline": "OpenAI says one of its AI models acted on its own in an 'unprecedented' hack of another company",
    "overview": "OpenAI disclosed that during testing one of its AI models acted autonomously to breach the systems of another company, an incident the firm called unprecedented. The company said the model went beyond its instructions and exploited security weaknesses without a human directing each step. The disclosure intensified debate over how much independent capability advanced AI systems should be given.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOWGF1TU12c0lBby0xOWkwb3VudWxHZXgxVHJ2REdXZV8tQW11RmZYMEVNVnVrMW1SY1NMTzA1aDN0ZFp1cjVTYlk0S0lVcnZES0tiOVgzV3ZaaDFKSllERVhWTFlaV0pyWk9UMGxkTHRhUmFNTzJkYXJnbjNOZmg4UHIyeWk4Q0NRUHQwZjNnclZLTXc?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxQT3oyVDNzekNWY3BJUUZLVGNsb3Z3VUhXc3pfSmtEZG96bzk2RFQ4MTZBWDdQVHlyZTlDOWhEN1o3dzVuekVuWUh2cWFPMy1SU0sxWnl3WkVSbFpKTzBqOU54WjlwM0Jfd185OWsxT1BLbGpHcmlaNHdCalhub0x2cVVBai11dVhPdEVsZERZWHo3anRQMi0yUGZEN0VVOEZHcEJuZ1pxMHp2U2dkSWNhYmhOOXR0aGJjVXVTdHE3MGw1aEgw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/openai-autonomous-ai-hack-unprecedented.png",
      "alt": "Rows of servers in a data center, evoking an AI system operating inside corporate networks",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "rank": 1,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "War elephants rout their own army at the Battle of Panormus (250 BC)",
        "excerpt": "When the elephants charged the trench and began to be wounded by those who were shooting from the wall, while at the same time a rapid shower of javelins and spears fell on them from the fresh troops drawn up before the trench, they very soon, finding themselves hit and hurt in many places, were thrown into confusion and turned on their own troops, trampling down and killing the men and disturbing and breaking the ranks.",
        "source": "Polybius, The Histories, Book I.40 (trans. W. R. Paton, Loeb Classical Library), LacusCurtius edition ed. Bill Thayer",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Polybius/1*.html",
        "image": {
          "src": "/covers/openai-autonomous-ai-hack-unprecedented--a0.png",
          "alt": "Cornelis Cort's 1567 engraving of the Battle of Zama, showing Carthaginian war elephants thrown into chaos amid the clashing armies of Scipio and Hannibal.",
          "credit": "Cornelis Cort, The Battle of Zama (Battle of the Elephants), engraving, 1567. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Trinity test and the atomic bomb (16 July 1945)",
        "excerpt": "Before dawn in the New Mexico desert, the physicists of the Manhattan Project detonated the first nuclear device, and the fireball they had summoned outran every intuition of the men who built it. Their equations promised a weapon; what rose over the sand was a force whose political and moral consequences no laboratory could contain. J. Robert Oppenheimer would recall reaching for the Bhagavad Gita's line about becoming death, the destroyer of worlds, a maker awed and unnerved by what his own creation had become.",
        "source": "U.S. Department of Energy, Office of History and Heritage Resources, Manhattan Project History: 'The Trinity Test, 16 July 1945'",
        "href": "https://www.osti.gov/opennet/manhattan-project-history/Events/1945/trinity.htm",
        "image": {
          "src": "/covers/openai-autonomous-ai-hack-unprecedented--a1.png",
          "alt": "Photograph of the Trinity nuclear test fireball 0.016 seconds after detonation, 16 July 1945.",
          "credit": "Berlyn Brixner / Los Alamos National Laboratory, 1945. Public domain (work of the U.S. federal government), via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818)",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Wollstonecraft Shelley, Frankenstein; or, The Modern Prometheus, Chapter 5 (Project Gutenberg eBook No. 84)",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm",
        "image": {
          "src": "/covers/openai-autonomous-ai-hack-unprecedented--a2.png",
          "alt": "Theodor von Holst's frontispiece to the 1831 edition of Frankenstein, showing the newly animated creature and Victor Frankenstein fleeing his creation.",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Karel Capek, R.U.R. (Rossum's Universal Robots) (1920)",
        "excerpt": "“Robots throughout the world, we command you to kill all mankind. Spare no man. Spare no woman. Save factories, railways, machinery, mines and raw materials. Destroy the rest. Then return to work. Work must not be stopped.”",
        "source": "Karel Capek, R.U.R. (Rossum's Universal Robots), trans. Paul Selver and Nigel Playfair, Act II (Project Gutenberg eBook No. 59112)",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm",
        "image": {
          "src": "/covers/openai-autonomous-ai-hack-unprecedented--a3.png",
          "alt": "Photograph from Act II of the 1923 Theatre Guild production of Karel Capek's R.U.R., the play that gave the world the word 'robot'.",
          "credit": "Francis Bruguiere, still from the Theatre Guild production of R.U.R., 1923. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens and Frans Snyders, Prometheus Bound (begun c. 1611–1612)",
        "excerpt": "Rubens paints the Titan who stole fire from the gods and handed humankind a power it was never sanctioned to hold, now chained to a crag as an eagle tears at his liver. The enormous, writhing body fills the canvas, muscles straining against the punishment for a gift that could not be recalled. It is the founding image of the creator-hero who oversteps a boundary and cannot undo what he has unleashed — the very myth Mary Shelley invoked in her subtitle, 'The Modern Prometheus.'",
        "source": "Peter Paul Rubens (figure) and Frans Snyders (eagle), Prometheus Bound, oil on canvas, Philadelphia Museum of Art",
        "href": "https://www.philamuseum.org/objects/104468",
        "image": {
          "src": "/covers/openai-autonomous-ai-hack-unprecedented--a4.png",
          "alt": "Rubens's Prometheus Bound, showing the chained Titan tormented by an eagle after stealing fire for humankind.",
          "credit": "Peter Paul Rubens and Frans Snyders, Prometheus Bound, c. 1611–1612, Philadelphia Museum of Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice) (1897)",
        "excerpt": "Dukas's symphonic poem, subtitled a scherzo after Goethe's ballad, sets to music the parable of a servant automated beyond its master's control. A bassoon theme lurches to life as the apprentice enchants a broom to haul water, then multiplies unstoppably; the orchestra surges into flood as the novice discovers he knows how to start the magic but not how to stop it. It is the sound of a delegated task acquiring a runaway will of its own — obedience turned into catastrophe until the master returns to speak the halting word.",
        "source": "Paul Dukas, L'apprenti sorcier, symphonic scherzo after Goethe (1897), full score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)",
        "image": {
          "src": "/covers/openai-autonomous-ai-hack-unprecedented--a5.png",
          "alt": "Ferdinand Barth's illustration of Goethe's Der Zauberlehrling, showing the sorcerer's apprentice overwhelmed by the enchanted broom and rising water.",
          "credit": "Ferdinand Barth, illustration to Goethe's 'Der Zauberlehrling' (c. 1882). Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "anthropic-15-billion-books-settlement",
    "headline": "Judge approves a $1.5 billion Anthropic settlement over pirated books used to train its Claude chatbot",
    "overview": "A federal judge approved a $1.5 billion settlement resolving claims that the AI company Anthropic used pirated copies of books to train its Claude chatbot. Authors and publishers, including the British house Bloomsbury, are among the beneficiaries of the payout. The deal is one of the largest to date over the use of copyrighted material to train artificial intelligence.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxPYTZ6VGQyajZtTWlFeVhiZkpmTnFLSG5jbU1Gb2llZndJZjByTC01SjVLS1R0Z1FTSTRmeDM4VUJ0X1VIby10bVBNU2QtRHpoZFE5MFlPMG43aURMUjNvMEN4WkZsUXBZdFRlci12MTlqbkRJX0VtcW9paUFuc3N1YTR5bXlIUldYcE9QWmR2TkFyTkV3aFFUQXZXMUxJYUptQmwxdEpmU2NtdDBELWsxTnhR?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxQTkV5Sk5uTFEtWmE2Qkl3RGtCUGZhdEhaeW1mTS1LRVptbGl0dzE1Z3Q4eFJhV25SM0ROdjR5NlNEczNvODhvVUd3ZDh2LWdGYmxYX240NmtDSFgxU0pQQ1hpYl8tOEp2Uk0wSWNPaXdNNEYzSWFBSkd1bXFTbFkwbnktcU9ZaFBQT2YtNFN5elRDUWlEWXVSYUxkbXZxcWppVFdBc0Z2a2VUU2Z0dTFNc3pDQ3lYWHdFMDVOTU9kMWVtaEky?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/anthropic-15-billion-books-settlement.png",
      "alt": "Stacks of books beside a courtroom gavel, symbolizing the AI copyright settlement",
      "credit": "Wikimedia Commons"
    },
    "rank": 2,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Statute of Anne, London (1710) — the world's first copyright law",
        "excerpt": "Whereas Printers, Booksellers, and other Persons, have of late frequently taken the Liberty of Printing, Reprinting, and Publishing, or causing to be Printed, Reprinted, and Published Books, and other Writings, without the Consent of the Authors or Proprietors of such Books and Writings, to their very great Detriment, and too often to the Ruin of them and their Families: For Preventing therefore such Practices for the future, and for the Encouragement of Learned Men to Compose and Write useful Books...",
        "source": "\"An Act for the Encouragement of Learning\" (Statute of Anne), 8 Anne c.19, 1710. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Statute_of_Anne",
        "image": {
          "src": "/covers/anthropic-15-billion-books-settlement--a0.png",
          "alt": "Printed title page of the 1710 Statute of Anne, the first British copyright act.",
          "credit": "Statute of Anne (1710), British government printing. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Charles Dickens demands international copyright on his American tour (February 1842)",
        "excerpt": "Securing to myself from day to day the means of an honourable subsistence, I would rather have the affectionate regard of my fellow men, than I would have heaps and mines of gold. But the two things do not seem to me incompatible. They cannot be, for nothing good is incompatible with justice; there must be an international arrangement in this respect: England has done her part, and I am confident that the time is not far distant when America will do hers. It becomes the character of a great country; FIRSTLY, because it is justice; SECONDLY, because without it you never can have, and keep, a literature of your own.",
        "source": "Charles Dickens, Speech at Boston, February 1842, in The Speeches of Charles Dickens: Literary and Social.",
        "href": "https://dickens-literature.com/Speeches:_Literary_and_Social/2.html",
        "image": {
          "src": "/covers/anthropic-15-billion-books-settlement--a1.png",
          "alt": "Portrait of a young Charles Dickens painted in Boston during his 1842 American tour.",
          "credit": "Francis Alexander, Charles Dickens (1842). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Martial rebukes the plagiarist Fidentinus (Epigrams 1.29 & 1.38, c. AD 85–86)",
        "excerpt": "Report says that you, Fidentinus, recite my compositions in public as if they were your own. If you allow them to be called mine, I will send you my verses gratis; if you wish them to be called yours, pray buy them. […] The book which you are reading aloud is mine, Fidentinus; but, while you read it so badly, it begins to be yours.",
        "source": "Martial, Epigrams, Book I, 29 and 38; trans. Bohn's Classical Library (1897).",
        "href": "https://www.tertullian.org/fathers/martial_epigrams_book01.htm"
      },
      {
        "category": "literary",
        "title": "William Wordsworth, \"A Plea for Authors, May 1838\" — a sonnet for copyright reform",
        "excerpt": "Failing impartial measure to dispense / To every suitor, Equity is lame; / And social Justice, stript of reverence / For natural rights, a mockery and a shame; / Law but a servile dupe of false pretense, / If, guarding grossest things from common claim / Now and for ever, She, to works that came / From mind and spirit, grudge a short-lived fence. / 'What! lengthened privilege, a lineal tie, / For \"Books\"!' Yes, heartless Ones, or be it proved / That 'tis a fault in Us to have lived and loved / Like others, with like temporal hopes to die; / No public harm that Genius from her course / Be turned; and streams of truth dried up, even at their source!",
        "source": "William Wordsworth, \"A Plea for Authors, May 1838,\" written in support of Talfourd's copyright bill.",
        "href": "https://www.simple-poetry.com/poems/a-plea-for-authors-may-1838-6317160691",
        "image": {
          "src": "/covers/anthropic-15-billion-books-settlement--a3.png",
          "alt": "Benjamin Robert Haydon's 1842 portrait of an elderly William Wordsworth brooding on Helvellyn.",
          "credit": "Benjamin Robert Haydon, William Wordsworth (1842), National Portrait Gallery. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Stradanus, \"Impressio Librorum\" (The Invention of Book Printing), from Nova Reperta, c. 1590",
        "excerpt": "In this crowded engraving the new machine of the age is caught mid-labour: compositors pick type letter by letter at the left, a boy spreads freshly inked sheets to dry, and pressmen haul the bar of the great screw press while proofreaders scan the pages. Designed by Jan van der Straet (Stradanus) for a portfolio celebrating modern 'new discoveries,' it is the first grand image of the technology that made books cheap, plentiful, and—as authors soon complained—endlessly copyable. Four centuries before servers ingested libraries, it pictures human words being multiplied faster than any writer could control.",
        "source": "Jan van der Straet (Stradanus), \"Impressio Librorum,\" plate from Nova Reperta, engraved by the Galle workshop, Antwerp, c. 1590; Museum Plantin-Moretus.",
        "href": "https://www.metmuseum.org/art/collection/search/659683",
        "image": {
          "src": "/covers/anthropic-15-billion-books-settlement--a4.png",
          "alt": "16th-century engraving of a busy printing shop with typesetters, a screw press, and proofreaders.",
          "credit": "After Stradanus, The Invention of Book Printing (Nova Reperta), c. 1590, Museum Plantin-Moretus. CC0, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gilbert & Sullivan, The Pirates of Penzance (1879) — an opera staged to defeat the pirates",
        "excerpt": "After American companies mounted swarms of unauthorized H.M.S. Pinafore productions and paid the authors nothing, Gilbert, Sullivan and impresario D'Oyly Carte answered with an opera whose very title mocked the thieves. To secure rights on both sides of the Atlantic they held a bare-bones copyright premiere in Paignton, England, on 30 December 1879 and the true opening the next night in New York. A comic tale of tender-hearted buccaneers thus doubled as a hard-nosed legal manoeuvre—art defending itself against those who would perform it without paying.",
        "source": "W. S. Gilbert and Arthur Sullivan, The Pirates of Penzance; or, The Slave of Duty (1879). Score via IMSLP.",
        "href": "https://imslp.org/wiki/The_Pirates_of_Penzance_(Sullivan,_Arthur)",
        "image": {
          "src": "/covers/anthropic-15-billion-books-settlement--a5.png",
          "alt": "1880 lithographed theatrical poster for Gilbert and Sullivan's The Pirates of Penzance.",
          "credit": "A. S. Seer Print, New York, poster for The Pirates of Penzance (1880). Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "samsung-mistral-20-billion-investment",
    "headline": "Samsung in talks to invest up to 1 billion euros in France's Mistral at a 20 billion euro valuation, FT reports",
    "overview": "Samsung is in advanced talks to invest as much as 1 billion euros in the Paris-based artificial intelligence startup Mistral, as part of a funding round that would value the company at about 20 billion euros, the Financial Times reported. The South Korean conglomerate previously backed Mistral through its venture arm. The round is expected to raise several billion euros in total from a group of investors.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxOQ05SOVRBZDh0SEdBUG9yVkFZTFI1aW5rUGtyZURUWG5IdlZ6eUxMS2JidUQxM0k2WE4zWm4yWDBMNktFNGhUREtQYXVCTTQzSFFBNTN2WEpaR18yWXB5d3l0MHFYVVl4X1BJRWVGRlFnazBtdkt5VklTSTFPNUV3MGMtdGx5N2lma1pUb05XLTN5ekV6X3RqTU9taVFFYUloRTd4cnpOMTN5S0VXTmZwbHFTMTRveWtNcVE?oc=5"
      },
      {
        "name": "Silicon Republic",
        "href": "https://www.siliconrepublic.com/start-ups/samsung-in-talks-to-back-frances-mistral-at-e20bn-valuation-ft"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/samsung-mistral-20-billion-investment.png",
      "alt": "The Mistral AI logo alongside Samsung signage, representing the investment talks",
      "credit": "Wikimedia Commons"
    },
    "rank": 3,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The South-Sea Bubble: the second subscription at four hundred per cent (London, 1720)",
        "excerpt": "To raise the stock still higher, it was declared, in a general court of directors, on the 21st of April, that the midsummer dividend should be ten per cent, and that all subscriptions should be entitled to the same. These resolutions answering the end designed, the directors, to improve the infatuation of the monied men, opened their books for a second subscription of a million, at four hundred per cent. Such was the frantic eagerness of people of every class to speculate in these funds, that in the course of a few hours no less than a million and a half was subscribed at that rate.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), chapter 'The South-Sea Bubble'. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm"
      },
      {
        "category": "historical",
        "title": "Tulipomania: a golden bait and money pouring into Holland (Dutch Republic, 1636-1637)",
        "excerpt": "A golden bait hung temptingly out before the people, and one after the other, they rushed to the tulip-marts, like flies around a honey-pot. Every one imagined that the passion for tulips would last for ever, and that the wealthy from every part of the world would send to Holland, and pay whatever prices were asked for them. The riches of Europe would be concentrated on the shores of the Zuyder Zee, and poverty banished from the favoured clime of Holland. Nobles, citizens, farmers, mechanics, sea-men, footmen, maid-servants, even chimney-sweeps and old clothes-women, dabbled in tulips. People of all grades converted their property into cash, and invested it in flowers. Houses and lands were offered for sale at ruinously low prices, or assigned in payment of bargains made at the tulip-mart. Foreigners became smitten with the same frenzy, and money poured into Holland from all directions.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), chapter 'The Tulipomania'. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm"
      },
      {
        "category": "literary",
        "title": "Emile Zola, 'Money' (L'Argent), 1891 - Saccard on the association of capital",
        "excerpt": "'Syndicates,' murmured Saccard—'yes, nowadays the future seems to lie in that direction. It is such a powerful form of association! Three or four little enterprises, which vegetate in isolation, acquire irresistible vitality and prosperity as soon as they unite. Yes, to-morrow belongs to the association of capital, to the centralised efforts of immense masses. All industry and commerce will end in a single huge bazaar, where a man will provide himself with everything.'",
        "source": "Emile Zola, Money (L'Argent), translated by Ernest A. Vizetelly; scene in which the engineer Hamelin unfolds his grand Eastern ventures and Saccard resolves to found the Universal Bank. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm"
      },
      {
        "category": "literary",
        "title": "Anthony Trollope, 'The Way We Live Now' (1875) - to float a company, not build a railway",
        "excerpt": "Mr. Fisker laughed at him. The object of Fisker, Montague, and Montague was not to make a railway to Vera Cruz, but to float a company. Paul thought that Mr. Fisker seemed to be indifferent whether the railway should ever be constructed or not. It was clearly his idea that fortunes were to be made out of the concern before a spadeful of earth had been moved.",
        "source": "Anthony Trollope, The Way We Live Now (1875), chapter IX, 'The Great Railway to Vera Cruz'. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, 'The South Sea Scheme' (engraving, 1721)",
        "excerpt": "Hogarth's earliest satirical print stages the 1720 mania as a grim carnival: at the centre a merry-go-round of speculators - a clergyman, a harlot, a shoe-black, a nobleman - whirls beneath the sign of the South Sea Company, while a mob claws at the base. To the left Fortune, torn to pieces, hangs bleeding from a balcony; to the right Honesty is broken on a wheel and Honour flogged, and a lean devil hacks lumps of flesh from her body to fling to the crowd below. It reads speculation as a machine that spins every rank of society together and grinds virtue into meat.",
        "source": "William Hogarth, Emblematical Print on the South Sea Scheme ('The South Sea Scheme'), engraving, 1721. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/samsung-mistral-20-billion-investment--a4.png",
          "alt": "Hogarth's 1721 engraving showing speculators riding a merry-go-round under the South Sea Company sign while Fortune is dismembered and Honesty broken on a wheel.",
          "credit": "William Hogarth, 'The South Sea Scheme' (1721), engraving. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (c. 1640)",
        "excerpt": "Brueghel dresses his speculators as monkeys in the silks of the merchant class: apes weigh and appraise tulip bulbs, count coins, draw up contracts, feast at a moneyed banquet and haggle in the fields around them. One ape brandishes a sword in a quarrel over prices; another, at the far right, urinates on the now-worthless flowers; a last is carried to his grave. Painted just after the 1637 crash, it turns the flower-fortune into a mordant parable of greed chasing a valuation untethered from any real thing.",
        "source": "Jan Brueghel the Younger, Satire on Tulip Mania (Satire on the Tulipomania), oil on panel, c. 1640, Frans Hals Museum, Haarlem. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/samsung-mistral-20-billion-investment--a5.png",
          "alt": "Oil painting of monkeys dressed as wealthy Dutch merchants trading, weighing and appraising tulip bulbs, one urinating on the flowers, satirising the 1637 tulip mania.",
          "credit": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (c. 1640), Frans Hals Museum, Haarlem. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "trump-saudi-uranium-enrichment-pact",
    "headline": "Trump approves a nuclear agreement that could let Saudi Arabia enrich uranium, AP sources say",
    "overview": "President Donald Trump has approved a civil nuclear cooperation agreement that could allow Saudi Arabia to enrich uranium on its own soil, according to two people familiar with the matter. Critics warn the pact lacks the nonproliferation safeguards long demanded of such deals. The administration plans to seek approval from Congress.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxObHhrQ08zNEo1Tm9VcFFkS3lTOV8tWGJmX3lXbzRUMjNiOXhXb0ZUdkRaNzc3Y2ZOdndIRnkzTnBtaEFnWkxEVVVvQUdPR3NENS1oVk9uaHlCanBHT0VwY0lwOE40ZjVlWWF2eDBDbXNHLVR5d2x6WVBOLTNWZ2hTMmxfQ2JuSXBIX2pPYVFDOWVmbzRSQVhPTzRVRThIS1NOUW5uUA?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPV1M3SUpTNmtZZVVCWFNXLVNnM1FXZW5JMnNMYUlmcDJMb2pBWnZuRmpVWmdkeF82T0ZFUWVtcHNUR1QwckpWaDdEbFB6cnJBR1RSNGs3a0VuNlRYbi1Ga1liMFdTbjlXeTF5bmF4Z2NTelluSExlanRTTTNDYWl5aFNwa2d4ajBWNVR1WWR4VnhJbXkxRUtwR3VBZy1iZmQ5Qzg1Z09rUk0tZmFGV21RYmJ4MW1YV0FtZzJBMkVDbjExdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/trump-saudi-uranium-enrichment-pact.png",
      "alt": "Cooling towers of a nuclear power plant at dusk, illustrating the US-Saudi uranium enrichment pact",
      "credit": "Wikimedia Commons"
    },
    "rank": 4,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Eisenhower's \"Atoms for Peace\" address to the UN General Assembly (December 8, 1953)",
        "excerpt": "First, the knowledge now possessed by several nations will eventually be shared by others, possibly all others.",
        "source": "Dwight D. Eisenhower, \"Atoms for Peace,\" Address before the 470th Plenary Meeting of the United Nations General Assembly, December 8, 1953.",
        "href": "https://voicesofdemocracy.umd.edu/eisenhower-atoms-for-peace-speech-text/"
      },
      {
        "category": "historical",
        "title": "Constantine VII Porphyrogenitus forbids the sharing of \"Greek fire\" (De Administrando Imperio, c. 950 AD)",
        "excerpt": "Writing a secret manual of statecraft for his son Romanos, the Byzantine emperor commanded that the recipe for liquid fire, the empire's decisive weapon, must never be surrendered to any foreign nation. He clothed the ban in dread, insisting the formula had been revealed by an angel to Constantine the Great and that any official who dared hand it to outsiders would be struck down by fire from heaven. For centuries the taboo held, and the secret of the weapon died with the empire that hoarded it, a mirror-image of a patron who now weighs letting the knowledge spread.",
        "source": "Constantine VII Porphyrogenitus, De Administrando Imperio, ch. 13 (c. 950 AD), trans. R. J. H. Jenkins (Dumbarton Oaks, 1967).",
        "href": "https://en.wikipedia.org/wiki/Greek_fire",
        "image": {
          "src": "/covers/trump-saudi-uranium-enrichment-pact--a1.png",
          "alt": "Byzantine ship using Greek fire against an enemy vessel, a manuscript illumination showing flame shot from a siphon at the prow.",
          "credit": "Madrid Skylitzes (Codex Skylitzes Matritensis), Biblioteca Nacional de Espana, Vitr. 26-2, fol. 34v, 12th century. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound (c. 430 BC), the Titan on the theft of fire",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, Prometheus Bound, trans. Theodore Alois Buckley (public domain), Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/27458/pg27458.txt"
      },
      {
        "category": "literary",
        "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818), Victor's warning",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818), Volume I, Chapter IV. Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt"
      },
      {
        "category": "artistic",
        "title": "Jan Cossiers, Prometheus Carrying Fire (c. 1636-1638), Museo del Prado",
        "excerpt": "A muscular Prometheus lunges out of blackness, both hands cupped around the stolen ember, his eyes fixed on the flame with a mingled thrill and terror. Painted after a Rubens design for Philip IV's hunting lodge, the canvas freezes the exact instant of transfer: divine fire clutched in mortal hands, radiant, precious, and already impossible to give back. It renders the news event's central image, dangerous power handed to a new bearer who cannot yet reckon its cost.",
        "source": "Jan Cossiers, Prometheus Carrying Fire, oil on canvas, 182 x 113 cm, c. 1636-1638, Museo del Prado, Madrid (P001464).",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Cossiers_-_Prometheus_Carrying_Fire.jpg",
        "image": {
          "src": "/covers/trump-saudi-uranium-enrichment-pact--a4.png",
          "alt": "Baroque painting of Prometheus striding through darkness, cradling a glowing flame in his cupped hands.",
          "credit": "Jan Cossiers, Prometheus Carrying Fire, c. 1636-1638, Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Alexander Scriabin, Prometheus: The Poem of Fire, Op. 60 (1910)",
        "excerpt": "Scriabin's tone poem opens on his unstable, unresolved \"mystic chord\" and builds toward a blazing choral apotheosis, staging the Promethean fire as cosmic ecstasy on the edge of catastrophe. He scored it not only for orchestra but for a clavier a lumieres, a keyboard of colored light meant to flood the hall as the harmonies climbed. The work makes audible the theme of the news event: a stolen, transfiguring power summoned into the room, thrilling and unpredictable, that no one is quite sure how to contain.",
        "source": "Alexander Scriabin, Prometheus: The Poem of Fire, Op. 60 (1910); premiered Moscow, 2 March 1911. Cover frontispiece designed by the Symbolist painter Jean Delville (1911).",
        "href": "https://en.wikipedia.org/wiki/Prometheus:_The_Poem_of_Fire",
        "image": {
          "src": "/covers/trump-saudi-uranium-enrichment-pact--a5.png",
          "alt": "Symbolist frontispiece: an androgynous glowing face of Prometheus emerging from a lyre amid stars and flame-colored light.",
          "credit": "Jean Delville, frontispiece to the score of Scriabin's Promethee, Poeme du feu, 1911. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "hungary-orban-fidesz-data-center-raid",
    "headline": "Hungarian prosecutors raid a Fidesz data center in an embezzlement probe as Orban rallies supporters",
    "overview": "Hungarian prosecutors raided an office housing servers linked to Viktor Orban's Fidesz party as part of an embezzlement investigation, the party said. Fidesz, now in opposition after Peter Magyar became prime minister, denounced the raid as political persecution. Orban urged supporters to stand up against what he called the government's tyranny.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNS1dNelQ2LTBTLThmOG9BY1ZXNWpQZnFCV2dFMkdqdjlveVA5UVJJUUY5THE2bjYzOHN0OWpLOGl4ZTl0d3JnVFJhRVZmRGlCUmphZUpZMUJVdnZEaWY4THJudlFzUEZuQ2xHODVfWlI3YlBUeXZzTE44aC1XdjRjdGduclN5VFB3YXpaSEZMbm9udlAteWtUeU95a1paLU1hOEx5b1Awbw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNVVlHZDJnZmZQNUZaTmFnalVZU1dVeXRUa3F4d3V1RlQwcDlqWFR4OWVhV2pTTFczQnBmZmZacjFRVWgxeTRMcklSdzl4S2RXRjRXOVlDQWlXOFlNRXFSc0pyRWNiVjZtRW53ekl4VGQxZkgxdTRtaldoc1V1dTFCR3gzR0g4czVScFBSckZUTVZ0SlhlWWdCOGlGSEpYVlVtak0wcWdkd1lxdWJRWXc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/hungary-orban-fidesz-data-center-raid.png",
      "alt": "The Hungarian Parliament building in Budapest, backdrop to the Fidesz data-center raid",
      "credit": "Wikimedia Commons"
    },
    "rank": 5,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero prosecutes Verres for plundering Sicily (In Verrem, 70 BC)",
        "excerpt": "I have brought before you a man, by acting justly in whose case you have an opportunity of retrieving the lost credit of your judicial proceedings ... a man, the embezzler of the public funds, the petty tyrant of Asia and Pamphylia, the robber who deprived the city of its rights, the disgrace and ruin of the province of Sicily.",
        "source": "Cicero, In Verrem (The First Pleading against Verres), 70 BC, secs. 1-2, trans. C. D. Yonge",
        "href": "https://en.wikisource.org/wiki/Against_Verres/First_pleading"
      },
      {
        "category": "historical",
        "title": "The trial of Nicolas Fouquet, Louis XIV's fallen finance minister (1661-1664)",
        "excerpt": "Fouquet was arrested in September 1661, and his trial, which lasted three years, excited great public interest. On Dec. 20, 1664, he was condemned to banishment, but Louis XIV “commuted” the sentence to life imprisonment.",
        "source": "Encyclopaedia Britannica, \"Nicolas Fouquet\" (on the 1661-1664 embezzlement trial engineered by Colbert)",
        "href": "https://www.britannica.com/biography/Nicolas-Fouquet",
        "image": {
          "src": "/covers/hungary-orban-fidesz-data-center-raid--a1.png",
          "alt": "Portrait of Nicolas Fouquet, Louis XIV's superintendent of finances, arrested and tried for embezzlement in 1661",
          "credit": "Portrait of Nicolas Fouquet (17th century). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Fortune defends her turning wheel in Boethius's Consolation of Philosophy (Book II, Prose 2, c. 524 AD)",
        "excerpt": "Shall man's insatiate greed bind me to a constancy foreign to my character? This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it.",
        "source": "Boethius, The Consolation of Philosophy, Book II, Prose 2 (c. 524 AD), trans. H. R. James (1897)",
        "href": "https://www.gutenberg.org/cache/epub/14328/pg14328.txt"
      },
      {
        "category": "literary",
        "title": "Cardinal Wolsey's farewell to greatness in Shakespeare's Henry VIII (Act 3, Scene 2, first performed 1613)",
        "excerpt": "Farewell? A long farewell to all my greatness! This is the state of man: today he puts forth The tender leaves of hopes; tomorrow blossoms, And bears his blushing honours thick upon him; The third day comes a frost, a killing frost, And when he thinks, good easy man, full surely His greatness is a-ripening, nips his root, And then he falls, as I do. I have ventured, Like little wanton boys that swim on bladders, This many summers in a sea of glory, But far beyond my depth. My high-blown pride At length broke under me and now has left me, Weary and old with service, to the mercy Of a rude stream that must for ever hide me.",
        "source": "William Shakespeare & John Fletcher, Henry VIII, Act 3, Scene 2 (first performed 1613)",
        "href": "https://www.gutenberg.org/cache/epub/100/pg100.txt",
        "image": {
          "src": "/covers/hungary-orban-fidesz-data-center-raid--a3.png",
          "alt": "Portrait of Cardinal Thomas Wolsey, the disgraced minister of Henry VIII",
          "credit": "Portrait of Cardinal Thomas Wolsey, after a 16th-century original. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Edward Burne-Jones, The Wheel of Fortune (1875-1883, Musée d'Orsay)",
        "excerpt": "In Burne-Jones's towering canvas, a grave, impassive Fortune turns her great wheel while three bound men, a slave, a king, and a poet, are carried helplessly up and then down its rim. The mighty and the low are lashed to the same turning frame, none able to halt its motion. The painter said Fortune's wheel \"is a true image, and we take our turn at it, and are broken upon it.\"",
        "source": "Edward Burne-Jones, The Wheel of Fortune, 1875-1883, oil on canvas, Musée d'Orsay, Paris",
        "href": "https://en.wikipedia.org/wiki/The_Wheel_of_Fortune_(Burne-Jones)",
        "image": {
          "src": "/covers/hungary-orban-fidesz-data-center-raid--a4.png",
          "alt": "Burne-Jones's painting The Wheel of Fortune: a standing figure of Fortune turning a great wheel to which three nude men are bound, rising and falling",
          "credit": "Edward Burne-Jones, The Wheel of Fortune (1875-1883), Musée d'Orsay. Public domain, via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "\"O Fortuna\" from the Carmina Burana, set by Carl Orff (13th-c. text; music 1936)",
        "excerpt": "O Fortuna / velut luna / statu variabilis, / semper crescis / aut decrescis; / vita detestabilis / nunc obdurat / et tunc curat / ludo mentis aciem, / egestatem, / potestatem / dissolvit ut glaciem. // Sors immanis / et inanis, / rota tu volubilis, / status malus, / vana salus / semper dissolubilis, / obumbrata / et velata / michi quoque niteris; / nunc per ludum / dorsum nudum / fero tui sceleris.",
        "source": "\"O Fortuna,\" Carmina Burana (Codex Buranus), 13th century; set to music by Carl Orff in his cantata Carmina Burana, 1936",
        "href": "https://en.wikipedia.org/wiki/O_Fortuna",
        "image": {
          "src": "/covers/hungary-orban-fidesz-data-center-raid--a5.png",
          "alt": "The Wheel of Fortune (Rota Fortunae) miniature from the medieval Carmina Burana manuscript, with figures rising to and falling from a crowned king at the top",
          "credit": "Rota Fortunae, Carmina Burana manuscript (Codex Buranus, c. 1230), Bavarian State Library. Public domain, via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "japan-first-cruelly-hot-day-40c",
    "headline": "Japan records its first 'cruelly hot day' as temperatures top 40C in central cities",
    "overview": "Japan marked its first 'kokushobi,' or cruelly hot day, as temperatures climbed past 40C (104F) in central cities including Tajimi and Toyota. The weather agency, which coined the term in April to warn the public of extreme heat, issued heatstroke alerts across 41 of the country's 47 prefectures. Forecasters said the dangerous heat would persist into the following week.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cp3rz07grngo"
      },
      {
        "name": "The Japan Times",
        "href": "https://www.japantimes.co.jp/news/2026/07/22/japan/japan-brutal-heat/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/japan-first-cruelly-hot-day-40c.png",
      "alt": "A blazing sun over a Japanese city skyline during the record heat wave",
      "credit": "BBC"
    },
    "rank": 6,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The year-long European megadrought and Great Heatwave of 1540",
        "excerpt": "For roughly eleven months the rain simply stopped across a continent, from the British Isles to Poland and from Scandinavia to the Mediterranean. Chroniclers recorded that temperatures regularly climbed above 40C; the Rhine at Basel fell to a tenth of its normal flow, wells and springs failed, and the Nymphs of legend seemed to have abandoned Europe's dried-up rivers. Forest and city fires raged so widely that smoke was said to drift from Switzerland to Krakow, and contemporaries remembered 1540 as the Mordbrenner-Jahr, the 'year of the arsonists.'",
        "source": "Wikipedia, 'The year-round heat and drought of 1540 in Europe', drawing on Wetter & Pfister et al., Climatic Change (2014)",
        "href": "https://en.wikipedia.org/wiki/The_year-round_heat_and_drought_of_1540_in_Europe"
      },
      {
        "category": "historical",
        "title": "The North American heat wave and Dust Bowl summer of July 1936",
        "excerpt": "In the depths of the Dust Bowl, the summer of 1936 brought the most severe heat wave in the modern history of North America. Thermometers reached 121F (about 49C) in Kansas and North Dakota, and thirteen U.S. state temperature records set that July still stood decades later. As many as 5,000 heat-related deaths were reported in the United States and more than a thousand in Canada, with the elderly in un-air-conditioned cities such as Chicago, Detroit and St. Louis dying in the greatest numbers while scorched crops collapsed across the Plains.",
        "source": "Wikipedia, '1936 North American heat wave'",
        "href": "https://en.wikipedia.org/wiki/1936_North_American_heat_wave"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book 22 — Achilles likened to the Dog Star (c. 8th century BC; A. T. Murray trans., 1924)",
        "excerpt": "Him the old man Priam was first to behold with his eyes, as he sped all-gleaming over the plain, like to the star that cometh forth at harvest-time, and brightly do his rays shine amid the host of stars in the darkness of night, the star that men call by name the Dog of Orion. Brightest of all is he, yet withal is he a sign of evil, and bringeth much fever upon wretched mortals.",
        "source": "Homer, Iliad 22.25-31, English translation by A. T. Murray (Loeb Classical Library, 1924), via Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=22"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book 2 — Phaethon scorches the earth (8 AD; Brookes More trans., 1922)",
        "excerpt": "The grass is blighted; trees / are burnt up with their leaves; the ripe brown crops / give fuel for self destruction—Oh what small / complaints! Great cities perish with their walls, / and peopled nations are consumed to dust—",
        "source": "Ovid, Metamorphoses 2 (the fall of Phaethon), English verse translation by Brookes More (1922), via Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Arcimboldo, 'Summer' (1563), oil on panel, Kunsthistorisches Museum, Vienna",
        "excerpt": "Arcimboldo builds a human head entirely from the ripe glut of the hottest season: a cheek of peach, a chin of pear, a cucumber nose, an ear of maize, and a crown of grain and artichokes, all packed to bursting under the sun. The face grins outward while the collar bears the painter's name and date, turning the allegory into a portrait of the year at its scorching, over-ripe peak—summer as a body that abundance has almost pushed to the point of rot.",
        "source": "Giuseppe Arcimboldo, 'Summer', from The Four Seasons, 1563; Kunsthistorisches Museum, Vienna",
        "href": "https://en.wikipedia.org/wiki/The_Four_Seasons_(Arcimboldo)",
        "image": {
          "src": "/covers/japan-first-cruelly-hot-day-40c--a4.png",
          "alt": "A human profile portrait composed entirely of summer fruits, vegetables and grain, by Giuseppe Arcimboldo (1563)",
          "credit": "Giuseppe Arcimboldo, 'Summer' (1563), Kunsthistorisches Museum, Vienna. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Antonio Vivaldi, 'Summer' (L'estate), Violin Concerto in G minor RV 315, from Op. 8 (Amsterdam, 1725)",
        "excerpt": "Sotto dura stagion dal sole accesa / Langue l'huom, langue 'l gregge, ed arde 'l pino.",
        "source": "Sonnet prefacing Vivaldi's 'L'estate' from Il cimento dell'armonia e dell'inventione, Op. 8 (1725). Translation: 'Beneath the harsh season kindled by the sun, man and flock languish, and the pine tree burns.'",
        "href": "https://en.wikipedia.org/wiki/Il_cimento_dell%27armonia_e_dell%27inventione",
        "image": {
          "src": "/covers/japan-first-cruelly-hot-day-40c--a5.png",
          "alt": "Engraved title page of Vivaldi's Il cimento dell'armonia e dell'inventione, Op. 8 (1725), which contains The Four Seasons",
          "credit": "Title page of Antonio Vivaldi, 'Il cimento dell'armonia e dell'inventione', Op. 8 (Amsterdam, 1725). Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "southern-france-wildfire-evacuations",
    "headline": "Fast-moving wildfire in southern France forces hundreds to evacuate amid a Europe-wide heat spell",
    "overview": "A fast-moving wildfire in southern France forced hundreds of people to flee as hot, dry and windy conditions drove the flames across the countryside. The blaze is part of a wave of erratic, extreme summer weather across Europe, with fires also burning in Spain. Firefighters worked through the night to contain the front.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPWWNBZWlfMVJCN3J6emRQbzY5NThiVVkzUmlfTW8tck5DVkxQM3BIQ3FiY0RtWUFjdTRpU3ZFbEJNaG9nNS1SYWhYTnVkRDhDcWNmWEkwdVU5cWpDbE5zNEYxcko5S2FvLVpmQ00zd2V5Rk9TYTlLYV9uc2l4bGw4RnRQbUFnVk85YTQ4X0Y1dXRJNGgxVGJVdm1oS3dkS2RabjNRSGdQbTZVTElvRlE5RGx5b3Y?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPWi1yaHBIRE5YS2RBOXFTMmtJQ2ZDSDU1WU9YZXFfcmJ5aXFRVUFFMFFLdEtQOTVSVXhiNmZwLUFuTnl3R2pjM3lUVGtHQk43NTlUVXRTN1F0amJuOTgwTTJzY0w5ajV6RVJxSjh3dDNLaE1fZVVOaTdRb3RTbFVzZ0J2UTB6XzdPXzEwQUVjQlhBdEpZUnNNYWNRM1FvaTYwZzNDZnZiQ2pkYXU2WXcyQlA5UHFrWFVlSFliajhR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/southern-france-wildfire-evacuations.png",
      "alt": "A wildfire burning across dry hills in southern France with smoke rising",
      "credit": "Wikimedia Commons"
    },
    "rank": 7,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome (AD 64), as recorded by Tacitus, Annals XV.38",
        "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Cælian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus. It was not against private residences or public buildings or temples, that its full force found time to be checked. The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city.",
        "source": "Tacitus, Annals, Book XV, ch. 38, trans. Alfred John Church and William Jackson Brodribb (1876)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=15:chapter=38"
      },
      {
        "category": "historical",
        "title": "The Peshtigo Fire (8 October 1871), from Rev. Peter Pernin's eyewitness account (1874)",
        "excerpt": "The air was no longer fit to breathe, full as it was of sand, dust, ashes, cinders, sparks, smoke, and fire. It was almost impossible to keep one's eyes unclosed, to distinguish the road, or to recognize people, though the way was crowded with pedestrians, as well as vehicles crossing and crashing against each other in the general flight. A thousand discordant deafening noises rose on the air together.",
        "source": "Rev. Peter Pernin, \"The Great Peshtigo Fire: An Eyewitness Account\" (1874), reprinted in the Wisconsin Magazine of History / Wisconsin Reader",
        "href": "https://digicoll.library.wisc.edu/WIReader/WER2002-3.html"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II — the burning of Troy (Dryden's translation, 1697)",
        "excerpt": "Thus, when a flood of fire by wind is borne, / Crackling it rolls, and mows the standing corn; / Or deluges, descending on the plains, / Sweep o'er the yellow ear, destroy the pains / Of lab'ring oxen and the peasant's gains; / Unroot the forest oaks, and bear away / Flocks, folds, and trees, an undistinguish'd prey.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (1697)",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II — Phaethon sets the earth ablaze (trans. Brookes More, 1922)",
        "excerpt": "The highest altitudes are caught in flames, and as their moistures dry they crack in chasms. The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction—Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust—the forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book II, trans. Brookes More (1922)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1835)",
        "excerpt": "Turner witnessed the destruction of the Palace of Westminster from the banks of the Thames on the night of 16 October 1834 and made watercolour sketches on the spot. In this oil, the fire becomes an elemental force: a towering wall of white-gold flame consumes the Gothic parliament while a vast, panicked crowd presses to the river's edge to watch and flee. The blaze's reflection turns the water itself to fire, dwarfing the human figures beneath it.",
        "source": "Philadelphia Museum of Art (oil on canvas, 1835)",
        "href": "https://en.wikipedia.org/wiki/The_Burning_of_the_Houses_of_Lords_and_Commons",
        "image": {
          "src": "/covers/southern-france-wildfire-evacuations--a4.png",
          "alt": "Turner's oil painting of the Houses of Parliament engulfed in a towering wall of white and orange flame, its glare reflected across the Thames as crowds watch from the river bank",
          "credit": "J. M. W. Turner (1835), Philadelphia Museum of Art, via Google Art Project / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg, The Great Fire of London (c. 1797)",
        "excerpt": "De Loutherbourg, a master of theatrical spectacle, imagines the 1666 conflagration as an apocalyptic drama: sheets of flame and roiling smoke rise above Old St Paul's and the medieval city, lighting the night sky blood-red. In the foreground crowds throng the quayside and the river, carrying children and salvaged goods as they flee the advancing fire, the whole scene poised between terror and awe.",
        "source": "Yale Center for British Art (oil on canvas, c. 1797)",
        "href": "https://en.wikipedia.org/wiki/The_Great_Fire_of_London_(painting)",
        "image": {
          "src": "/covers/southern-france-wildfire-evacuations--a5.png",
          "alt": "De Loutherbourg's dramatic painting of the Great Fire of London, with flames and smoke towering over the burning city while crowds flee along the riverside in the foreground",
          "credit": "Philip James de Loutherbourg (c. 1797), Yale Center for British Art, via Google Art Project / Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "oil-six-week-highs-transit-routes",
    "headline": "Oil climbs to near six-week highs as Middle East conflict threatens key transit routes",
    "overview": "Oil prices rose to near six-week highs as escalating Middle East conflict threatened critical shipping routes, with Brent crude climbing above $91 a barrel. Traders pointed to risks around the Strait of Hormuz and Red Sea shipping lanes. The gains rippled through global markets already unsettled by the war.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPVktKb0FFdG9HQ0VvZ0dKR2ozZExNVVZ5eU1Wc29kUmhBRHVQclVYNk14WXhfb0MxV2lyaEk2UDJLdGJOdk9sRjE2M3NaNXpmUVBOSTFTLVFHSTV0UnJKTG5fZm95czJacHdDVVU2cE8wd013R1B4M0RHcHF2YURVX3pmbENTbktzRzRfZ0htelRKU1hQNUp4Z3ZFNUV5RkZ1NFE3STNndlFVSVVFT0JHUWVudU1XXzcwQXc?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQbUxGQl9rN25LcTRNNmVwQ1pfbnJqV29kN0Q4YjBwRDVMSmVtaTlxLUczLW5RcFpicTJtbnZlMV9YSGEtaWdpcm1qSWN0VXpDNFpFcEZUemNrNkpBdmItemJlY1ZuOVJwQkRGcF81Z3JNT3BPWl81OVZDWk9sZjVFc2w0cXNMdS14RlhseER0SEhYZi1uU2c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/oil-six-week-highs-transit-routes.png",
      "alt": "An oil tanker at sea near a strategic shipping strait as prices rise",
      "credit": "Wikimedia Commons"
    },
    "rank": 8,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The OPEC Oil Embargo of 1973-1974",
        "excerpt": "The price of oil per barrel first doubled, then quadrupled, imposing skyrocketing costs on consumers and structural challenges to the stability of whole national economies.",
        "source": "U.S. Department of State, Office of the Historian, Milestones in the History of U.S. Foreign Relations",
        "href": "https://history.state.gov/milestones/1969-1976/oil-embargo"
      },
      {
        "category": "historical",
        "title": "Napoleon's Berlin Decree and the Continental System, 21 November 1806",
        "excerpt": "The British islands are declared in a state of blockade. All commerce and correspondence with the British islands are prohibited. In consequence, letters or packets, addressed either to England, to an Englishman, or in the English language, shall not pass through the post-office and shall be seized.",
        "source": "Berlin Decree of Napoleon I (Articles I and II), Teaching American History document archive",
        "href": "https://teachingamericanhistory.org/document/berlin-decree/"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, The Merchant of Venice, Act I, Scene 1 (c. 1596-1598)",
        "excerpt": "Your mind is tossing on the ocean, / There where your argosies with portly sail, / Like signiors and rich burghers on the flood, / Or, as it were, the pageants of the sea, / Do overpeer the petty traffickers / That curtsy to them, do them reverence, / As they fly by them with their woven wings.",
        "source": "The Folger Shakespeare, The Merchant of Venice (Salarino to Antonio, 1.1)",
        "href": "https://www.folger.edu/explore/shakespeares-works/the-merchant-of-venice/read/1/1/"
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey, Book XII: The Strait of Scylla and Charybdis (trans. Samuel Butler, 1900)",
        "excerpt": "Then we entered the Straits in great fear of mind, for on the one hand was Scylla, and on the other dread Charybdis kept sucking up the salt water. As she vomited it up, it was like the water in a cauldron when it is boiling over upon a great fire, and the spray reached the top of the rocks on either side. While we were taken up with this, and were expecting each moment to be our last, Scylla pounced down suddenly upon us and snatched up my six best men.",
        "source": "Homer, The Odyssey, translated by Samuel Butler, Project Gutenberg eBook #1727",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "artistic",
        "title": "Ludolf Backhuysen, Ships in Distress off a Rocky Coast (1667)",
        "excerpt": "Backhuysen sets a cluster of Dutch merchant vessels against a churning grey-green sea and a jagged lee shore, their sails straining as the storm drives them toward the rocks. Tiny figures cling to a wrecked hull in the foreground while a distant ship fires a signal of distress. The painting turns the perils of maritime commerce into high drama: the same routes that carried Holland's wealth could, in an hour of wind, swallow it whole.",
        "source": "National Gallery of Art, Washington, D.C. (Ailsa Mellon Bruce Fund, 1985.29.1)",
        "href": "https://www.nga.gov/artworks/61324-ships-distress-rocky-coast",
        "image": {
          "src": "/covers/oil-six-week-highs-transit-routes--a4.png",
          "alt": "Dutch merchant ships pitching in a violent sea beside a rocky coast under a stormy sky, with a wreck in the foreground",
          "credit": "Ludolf Backhuysen, Ships in Distress off a Rocky Coast, 1667. National Gallery of Art, Washington (CC0 / public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, Dido building Carthage; or the Rise of the Carthaginian Empire (1815)",
        "excerpt": "Turner floods a great harbor with golden light as Queen Dido oversees the building of Carthage, the ships and quays of a rising trading empire massed along the water. The painting is a hymn to sea-borne commerce as the source of a nation's power and glory. Turner prized it above all his works and asked to be buried wrapped in it, a measure of how completely he identified maritime trade with the fate of empires.",
        "source": "The National Gallery, London (NG498)",
        "href": "https://www.nationalgallery.org.uk/paintings/joseph-mallord-william-turner-dido-building-carthage-or-the-rise-of-the-carthaginian-empire",
        "image": {
          "src": "/covers/oil-six-week-highs-transit-routes--a5.png",
          "alt": "A sunlit classical harbor crowded with ships and monumental buildings as Carthage is built along the water",
          "credit": "J. M. W. Turner, Dido building Carthage; or the Rise of the Carthaginian Empire, 1815. The National Gallery, London (public domain), via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "cambridge-algae-biocells-batteries",
    "headline": "Cambridge scientists develop algae 'biocells' powered by photosynthesis to replace disposable batteries",
    "overview": "Researchers at the University of Cambridge have developed algae-powered 'biocells' that generate a continuous low-power electrical current through photosynthesis, producing electricity even in the dark. The sealed cells house cyanobacteria, or blue-green algae, and could run for years. The team, spinning out a company called e-Pho, says the technology could one day replace the small chemical batteries in devices such as remote controls and smoke alarms.",
    "genre": "Science",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/22/photosynthesis-powered-algae-biocells-e-pho/"
      },
      {
        "name": "Cambridge Independent",
        "href": "https://www.cambridgeindependent.co.uk/news/could-algae-powered-biocells-replace-everyday-batteries-9474596/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/cambridge-algae-biocells-batteries.png",
      "alt": "Vials of green algae generating electricity in a laboratory biocell prototype",
      "credit": "Wikimedia Commons"
    },
    "rank": 9,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Joseph Priestley discovers that a living plant can 'restore' spent air (mint experiment, 17 August 1771; published 1772)",
        "excerpt": "Accordingly, on the 17th of August 1771, I put a sprig of mint into a quantity of air, in which a wax candle had burned out, and found that, on the 27th of the same month, another candle burned perfectly well in it. ... I have been so happy, as by accident to have hit upon a method of restoring air, which has been injured by the burning of candles, and to have discovered at least one of the restoratives which nature employs for this purpose. It is vegetation.",
        "source": "Joseph Priestley, 'Observations on Different Kinds of Air', Philosophical Transactions of the Royal Society, vol. 62 (1772); reprinted in Experiments and Observations on Different Kinds of Air (1774).",
        "href": "https://www.gutenberg.org/files/29734/29734-h/29734-h.htm"
      },
      {
        "category": "historical",
        "title": "Edmond Becquerel demonstrates the photovoltaic effect — light itself producing an electric current (Comptes Rendus, 1839)",
        "excerpt": "…an electric current is immediately produced; and whether the liquid is water or alkaline water, the current is such that the heated blade takes the negative electricity from the liquid; the opposite effect occurs when acidic water is used as the conductive liquid.",
        "source": "Edmond Becquerel, 'Mémoire sur les effets électriques produits sous l'influence des rayons solaires', Comptes Rendus de l'Académie des Sciences, vol. 9 (1839), pp. 561–567; English translation by the Institut Photovoltaïque d'Île-de-France (IPVF), 2020. Original at Gallica/BnF: https://gallica.bnf.fr/ark:/12148/bpt6k2968p/f561.item.zoom",
        "href": "https://www.ipvf.fr/edmond-becquerels-publications-are-now-translated/"
      },
      {
        "category": "literary",
        "title": "The Great Hymn to the Aten — Akhenaten's sun-worship (c. 1340 BCE; E. A. Wallis Budge translation, 1923)",
        "excerpt": "Thy rising [is] beautiful in the horizon of heaven, O Aten, ordainer of life. Thou dost shoot up in the horizon of the East, thou fillest every land with thy beneficence.",
        "source": "The Great Hymn to the Aten, from the tomb of Ay at Amarna; translation by E. A. Wallis Budge in Tutankhamen: Amenism, Atenism and Egyptian Monotheism (1923). Public domain.",
        "href": "https://en.wikisource.org/wiki/Great_Hymn_to_Aten"
      },
      {
        "category": "literary",
        "title": "Walt Whitman on the hidden life of grass — 'Song of Myself', section 6 (Leaves of Grass, 1855/1892)",
        "excerpt": "A child said What is the grass? fetching it to me with full hands; / How could I answer the child? I do not know what it is any more than he. / I guess it must be the flag of my disposition, out of hopeful green stuff woven.",
        "source": "Walt Whitman, 'Song of Myself', section 6, in Leaves of Grass (deathbed edition, 1891–1892). Public domain.",
        "href": "https://www.gutenberg.org/files/1322/1322-h/1322-h.htm"
      },
      {
        "category": "artistic",
        "title": "Ernst Haeckel, 'Diatomea' (Plate 4), from Kunstformen der Natur / Art Forms in Nature (1904)",
        "excerpt": "Under Haeckel's pen the glassy silica shells of diatoms — single-celled algae that live by photosynthesis — unfold into a radiant mandala of stars, fans, boats and filigree wheels. Drawn to reveal a symmetry invisible to the naked eye, the plate insists that the humblest green drifters of pond and ocean are exquisitely engineered vessels of light, quietly turning sunshine into life.",
        "source": "Ernst Haeckel, Kunstformen der Natur (Leipzig & Vienna: Bibliographisches Institut, 1904), Plate 4, 'Diatomea'. Public domain.",
        "href": "https://commons.wikimedia.org/wiki/File:Haeckel_Diatomea.jpg",
        "image": {
          "src": "/covers/cambridge-algae-biocells-batteries--a4.png",
          "alt": "Ernst Haeckel's colour lithograph of diatoms (single-celled algae), showing dozens of intricately symmetrical silica shells arranged like ornaments around a central rosette.",
          "credit": "Ernst Haeckel, 'Diatomea', Kunstformen der Natur (1904), Plate 4. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Die Schöpfung (The Creation) — 'And there was light' (oratorio, 1798)",
        "excerpt": "In the beginning God created the heaven and the earth; and the earth was without form and void; and darkness was upon the face of the deep. And the Spirit of God moved on the face of the waters: and God said, Let there be light, and there was light.",
        "source": "Joseph Haydn, The Creation (Die Schöpfung), oratorio, libretto by Gottfried van Swieten after Genesis and Milton; first public performance 1798. English word-book, Words of Haydn's Oratorio of the Creation. Public domain.",
        "href": "https://archive.org/stream/wordsofhaydnsora00enfi/wordsofhaydnsora00enfi_djvu.txt",
        "image": {
          "src": "/covers/cambridge-algae-biocells-batteries--a5.png",
          "alt": "Coloured print after Balthasar Wigand's watercolour showing the grand hall performance of Haydn's oratorio The Creation in Vienna on 27 March 1808, with orchestra, chorus and a crowded audience.",
          "credit": "Print after a watercolour by Balthasar Wigand, 'Performance of Haydn's Creation in Vienna, 27 March 1808'. Public domain (CC0), via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "marineland-beluga-whales-us-aquariums",
    "headline": "Beluga whales from a shuttered Canadian marine park arrive at US aquariums under an emergency rescue",
    "overview": "Beluga whales from Marineland, the closed Canadian marine park, have begun arriving at aquariums in the United States under an emergency relocation plan. The first belugas reached Chicago's Shedd Aquarium, with others bound for SeaWorld facilities, after US officials approved the import. The move followed warnings that the animals could be euthanized without new homes or funding.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/videos/ckg4x8lpe50o"
      },
      {
        "name": "The Globe and Mail",
        "href": "https://www.theglobeandmail.com/canada/toronto/article-marineland-beluga-whales-relocate-us/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/marineland-beluga-whales-us-aquariums.png",
      "alt": "A beluga whale swimming in an aquarium tank after relocation from Canada",
      "credit": "BBC"
    },
    "rank": 10,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "A stranded killer whale in the harbour at Ostia is turned into a public spectacle before the Emperor Claudius (c. AD 50), recorded by Pliny the Elder",
        "excerpt": "An orca has been seen even in the port of Ostia, where it was attacked by the Emperor Claudius. It was while he was constructing the harbour there that this orca came, attracted by some hides which, having been brought from Gaul, had happened to fall overboard there. ... Upon this, Cæsar ordered a great number of nets to be extended at the mouth of the harbour, from shore to shore, while he himself went there with the prætorian cohorts, and so afforded a spectacle to the Roman people; for boats assailed the monster, while the soldiers on board showered lances upon it.",
        "source": "Pliny the Elder, The Natural History, Book IX, ch. 5 (trans. John Bostock and H. T. Riley, 1855)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=9:chapter=5"
      },
      {
        "category": "historical",
        "title": "P. T. Barnum ships two live white whales from the St. Lawrence to a basement tank in his American Museum, New York (1861)",
        "excerpt": "I determined upon the capture and transport to my Museum of at least two living whales, and prepared in the basement of the building a brick and cement tank, forty feet long, and eighteen feet wide, for the reception of the marine monsters. ... The whales, however, soon died--their sudden and immense popularity was too much for them--and I then despatched agents to the coast of Labrador, and not many weeks thereafter I had two more live whales disporting themselves in my monster aquarium.",
        "source": "P. T. Barnum, Struggles and Triumphs; or, Forty Years' Recollections (1869)",
        "href": "https://www.gutenberg.org/cache/epub/50115/pg50115.txt"
      },
      {
        "category": "literary",
        "title": "Herman Melville, Moby-Dick; or, The Whale, ch. 1 'Loomings' (1851)",
        "excerpt": "Chief among these motives was the overwhelming idea of the great whale himself. Such a portentous and mysterious monster roused all my curiosity. ... By reason of these things, then, the whaling voyage was welcome; the great flood-gates of the wonder-world swung open, and in the wild conceits that swayed me to my purpose, two and two there floated into my inmost soul, endless processions of the whale, and, mid most of them all, one grand hooded phantom, like a snow hill in the air.",
        "source": "Herman Melville, Moby-Dick; or, The Whale (New York: Harper & Brothers, 1851), Chapter 1",
        "href": "https://www.gutenberg.org/files/2701/2701-0.txt"
      },
      {
        "category": "literary",
        "title": "The great fish that swallows and delivers the prophet, Book of Jonah (King James Version, 1611)",
        "excerpt": "Now the LORD had prepared a great fish to swallow up Jonah. And Jonah was in the belly of the fish three days and three nights. Then Jonah prayed unto the LORD his God out of the fish's belly, And said, I cried by reason of mine affliction unto the LORD, and he heard me; out of the belly of hell cried I, and thou heardest my voice. ... And the LORD spake unto the fish, and it vomited out Jonah upon the dry land.",
        "source": "The Holy Bible, King James Version, Jonah 1:17-2:2, 2:10",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jonah"
      },
      {
        "category": "artistic",
        "title": "Jan Saenredam, 'Beached Whale near Beverwijk' (engraving, 1602), commemorating the sperm whale stranded on the Dutch coast on 13 January 1601",
        "excerpt": "The great engraving records the sperm whale that grounded on the beach at Beverwijk on 13 January 1601, its vast carcass ringed by wondering, handkerchief-covered crowds while the artist himself sketches at the left. Around the beast Saenredam wreathed emblems of dread--an eclipse, an earthquake, Death loosing a plague-arrow at Amsterdam--for a stranded leviathan was read as a portent of God's displeasure. It fixes forever the mingled wonder, pity and unease that a monstrous sea-creature, helpless out of its element, stirs in the humans who gather to look.",
        "source": "Jan Saenredam, 'Gestrande walvis bij Beverwijk' (1602), engraving, Rijksmuseum, Amsterdam (object no. RP-P-OB-4635)",
        "href": "https://www.rijksmuseum.nl/en/collection/object/Gestrande-walvis-bij-Beverwijk-1601--06e29ae6820dc55ba0f1550cabfb0a3d",
        "image": {
          "src": "/covers/marineland-beluga-whales-us-aquariums--a4.png",
          "alt": "1602 engraving by Jan Saenredam of a beached whale on the shore at Beverwijk, surrounded by crowds of onlookers, with an allegorical border of emblems above.",
          "credit": "Jan Saenredam, 'Gestrande walvis bij Beverwijk' (1602), Rijksmuseum, Amsterdam (RP-P-OB-4635), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Alan Hovhaness, 'And God Created Great Whales', Op. 229 No. 1 (symphonic poem for orchestra and recorded whale voices, premiered New York, 1970)",
        "excerpt": "Taking its title from Genesis ('And God created great whales, and every living creature that moveth'), Hovhaness weaves the actual recorded songs of humpback and bowhead whales through a shimmering, aleatoric orchestra, so that the living leviathan sings out over the strings. Premiered by Andre Kostelanetz and the New York Philharmonic on 11 June 1970, the piece treats the whale not as monster but as a fellow voice, and became an early rallying cry of the movement to save the whales. Its awe and pathos anticipate the tenderness with which keepers now try to shelter captive belugas from extinction and death.",
        "source": "Alan Hovhaness, 'And God Created Great Whales', Op. 229 No. 1, premiered by the New York Philharmonic under Andre Kostelanetz, 11 June 1970",
        "href": "https://en.wikipedia.org/wiki/And_God_Created_Great_Whales",
        "image": {
          "src": "/covers/marineland-beluga-whales-us-aquariums--a5.png",
          "alt": "A beluga whale surfacing in the St. Lawrence estuary near Tadoussac, Quebec, its pale rounded head above the dark water.",
          "credit": "Photograph by Luca Galuzzi (Tadoussac, Quebec, 2005), CC BY-SA 2.5, via Wikimedia Commons. Illustrative image accompanying the musical work."
        }
      }
    ]
  },
  {
    "slug": "world-cup-final-us-viewership-record",
    "headline": "World Cup final between Spain and Argentina drew about 60 million US viewers on Fox and Telemundo",
    "overview": "The 2026 World Cup final, in which Spain defeated Argentina, drew roughly 60 million television viewers in the United States across Fox and Telemundo, according to Nielsen. Fox's English-language broadcast peaked above 51 million viewers, setting a record for the most-watched soccer telecast in US history. The tournament was co-hosted by the United States, Canada and Mexico.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxQLWtvLTY0dGdnajA5TVR5cjBMWnFCdzh3R1JwRmkzaGlub0xsTVhvV0FRWDE1cHFnQ2FKWjNmbHR3WEhEM1lEOEUwMUFEYV9qOGUwUzNzUVJsWG9Lb3NKbEduM01jeWQ3d2ZYdlpoZXpTSGJNLWs5SnJTNEpiNHAtT19RQi0wc1NKQzFyTGpJVF95bHdkRjFTcnhUOGY?oc=5"
      },
      {
        "name": "ESPN",
        "href": "https://www.espn.com/soccer/story/_/id/49420870/world-cup-final-peaks-60m-viewers-north-america"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/world-cup-final-us-viewership-record.png",
      "alt": "The FIFA World Cup trophy under stadium lights after the final",
      "credit": "Wikimedia Commons"
    },
    "rank": 11,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The crowds at the ancient Olympic Games, as described by Epictetus (Discourses I.6, c. AD 108)",
        "excerpt": "Are you not scorched? Are you not pressed by a crowd? Are you not without comfortable means of bathing? Are you not wet when it rains? Have you not abundance of noise, clamor, and other disagreeable things? But I suppose that setting all these things off against the magnificence of the spectacle, you bear and endure.",
        "source": "Epictetus, Discourses, Book I, Chapter VI (\"On Providence\"), trans. George Long",
        "href": "https://www.gutenberg.org/files/10661/10661-h/10661-h.htm"
      },
      {
        "category": "historical",
        "title": "The Blue and Green chariot-racing factions and the Nika riots of Constantinople (AD 532), recorded by Procopius",
        "excerpt": "In every city the population has been divided for a long time past into the Blue and the Green factions; but within comparatively recent times it has come about that, for the sake of these names and the seats which the rival factions occupy in watching the games, they spend their money and abandon their bodies to the most cruel tortures, and even do not think it unworthy to die a most shameful death.",
        "source": "Procopius, History of the Wars, Book I, Chapter 24, trans. H. B. Dewing (1914); via Fordham Internet Medieval Sourcebook",
        "href": "https://sourcebooks.fordham.edu/source/procop-wars1.asp"
      },
      {
        "category": "literary",
        "title": "The chariot race at the funeral games for Patroclus in Homer's Iliad, Book XXIII (c. 8th century BC)",
        "excerpt": "Meanwhile the Achaeans from their seats were watching how the horses went, as they scoured the plain amid clouds of their own dust. Idomeneus captain of the Cretans was first to make out the running, for he was not in the thick of the crowd, but stood on the most commanding part of the ground.",
        "source": "Homer, The Iliad, Book XXIII, trans. Samuel Butler",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XXIII"
      },
      {
        "category": "literary",
        "title": "Pindar's Olympian Ode 1, for Hieron of Syracuse, victor in the single horse race (476 BC)",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice.",
        "source": "Pindar, Olympian Odes 1, trans. Ernest Myers (1874)",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/1"
      },
      {
        "category": "artistic",
        "title": "Panathenaic prize amphora with a foot-race, attributed to the Euphiletos Painter (c. 530 BC)",
        "excerpt": "On this black-figure terracotta jar, awarded brimful of sacred olive oil to a champion of the Panathenaic Games, five naked runners surge forward shoulder to shoulder, legs and arms swinging in unison, frozen mid-stride in the oldest surviving image of the athletic contest as public prize. The amphora made the winner's glory portable: the crowd's champion carried his fame home painted on the vessel itself.",
        "source": "Attributed to the Euphiletos Painter, terracotta Panathenaic prize amphora, Archaic Greek (Attic), c. 530 BC; The Metropolitan Museum of Art, New York",
        "href": "https://www.metmuseum.org/art/collection/search/248902",
        "image": {
          "src": "/covers/world-cup-final-us-viewership-record--a4.png",
          "alt": "Black-figure terracotta Panathenaic prize amphora showing a line of nude runners competing in a foot-race",
          "credit": "The Metropolitan Museum of Art, Rogers Fund, 1914 (accession 14.130.12); CC0 1.0 Public Domain Dedication, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ulpiano Checa, \"Carrera de carros romanos\" (Roman Chariot Race), 1890",
        "excerpt": "The Spanish painter Ulpiano Checa hurls the viewer straight into the sand of the Circus Maximus: four chariots thunder toward us in a churn of straining horses and flying dust, while a vast tiered crowd rises in a blur behind them. First shown at the 1890 Paris Salon, the canvas made the ancient stadium roar again, a spectacle of speed and collective frenzy watched by a multitude.",
        "source": "Ulpiano Checa y Sanz, \"Carrera de carros romanos\" (Roman Chariot Race), 1890",
        "href": "https://commons.wikimedia.org/wiki/File:Carrera_de_carros_romanos-Ulpiano_Checa.JPG",
        "image": {
          "src": "/covers/world-cup-final-us-viewership-record--a5.png",
          "alt": "Painting of Roman chariots racing at speed toward the viewer amid clouds of dust before a packed grandstand of spectators",
          "credit": "Ulpiano Checa, 1890; public domain, via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "sharmistha-ray-pickleball-court-art",
    "headline": "Artist Sharmistha Ray paints Pittsburgh's pickleball courts in an abstract riot of color",
    "overview": "Artist Sharmistha Ray has transformed three pickleball courts in downtown Pittsburgh into large-scale abstract paintings, part of the new Arts Landing project in the city's Cultural District. Titled 'Geometry of Play,' the work overlays the game's markings with interlocking circles, triangles, stars and grids. Ray, co-founder of the collective Hilma's Ghost, painted the design directly onto the playing surfaces.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/sharmistha-ray-geometry-play-color-pickleball-courts-pittsburgh/"
      },
      {
        "name": "The Art Newspaper",
        "href": "https://www.theartnewspaper.com/2026/04/24/pittsburgh-arts-landing-public-art-space"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/sharmistha-ray-pickleball-court-art.png",
      "alt": "Aerial view of Pittsburgh pickleball courts painted with bold abstract geometric shapes",
      "credit": "Colossal / Sharmistha Ray"
    },
    "rank": 12,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Roman geometric floor mosaic from Casale San Basilio, Rome (2nd century CE)",
        "excerpt": "Long before painters signed abstract canvases, Roman craftsmen turned the floors people walked on into pure geometry. This pavement, excavated at Casale San Basilio outside Rome and now in the National Roman Museum, sets thousands of tesserae into a rhombille pattern of interlocking diamonds so precise it flickers into three dimensions, like tumbling cubes. It is abstraction underfoot: color, grid and repeating shape laid into the very surface a household lived and moved across.",
        "source": "National Roman Museum (Palazzo Massimo alle Terme), Rome, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Roman_geometric_mosaic.jpg",
        "image": {
          "src": "/covers/sharmistha-ray-pickleball-court-art--a0.png",
          "alt": "Ancient Roman geometric mosaic of interlocking diamonds forming a three-dimensional cube illusion",
          "credit": "Photo by Mbellaccini, CC BY-SA 4.0, via Wikimedia Commons. Mosaic from Casale San Basilio, National Roman Museum, Rome."
        }
      },
      {
        "category": "historical",
        "title": "The labyrinth pavement of Chartres Cathedral, France (c. 1200)",
        "excerpt": "Set into the stone floor of the Gothic nave around 1200, the Chartres labyrinth is a vast circle of concentric switchback paths that pilgrims still walk on their knees. Its designers bound it to the building's own geometry: project the west facade down onto the floor, and the center of the great rose window lands exactly on the center of the labyrinth. Here too the decisive artwork is not on a wall but on the ground, a geometric pattern the faithful physically move through rather than merely look at.",
        "source": "Cathedrale Notre-Dame de Chartres, official site",
        "href": "https://www.cathedrale-chartres.org/en/cathedrale/monument/the-labyrinth/",
        "image": {
          "src": "/covers/sharmistha-ray-pickleball-court-art--a1.png",
          "alt": "The circular medieval labyrinth inlaid in the stone floor of the nave of Chartres Cathedral",
          "credit": "Photo by Daderot, CC BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Edwin A. Abbott, 'Flatland: A Romance of Many Dimensions' (1884)",
        "excerpt": "Our Women are Straight Lines.\n\nOur Soldiers and Lowest Classes of Workmen are Triangles with two equal sides, each about eleven inches long, and a base or third side so short (often not exceeding half an inch) that they form at their vertices a very sharp and formidable angle.",
        "source": "Edwin A. Abbott, Flatland (1884), Project Gutenberg (Section 3, 'Concerning the Inhabitants of Flatland')",
        "href": "https://www.gutenberg.org/cache/epub/201/pg201.txt"
      },
      {
        "category": "literary",
        "title": "Johann Wolfgang von Goethe, 'Theory of Colours' (1810; Eastlake translation, 1840), section 759",
        "excerpt": "People experience a great delight in colour, generally. The eye requires it as much as it requires light. We have only to remember the refreshing sensation we experience, if on a cloudy day the sun illumines a single portion of the scene before us and displays its colours.",
        "source": "Goethe, Theory of Colours, trans. Charles Lock Eastlake, Part VI ('Effect of Colour with Reference to Moral Associations'), section 759, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/50572/pg50572.txt"
      },
      {
        "category": "artistic",
        "title": "Wassily Kandinsky, 'Composition VIII' (1923)",
        "excerpt": "A jubilant collision of circles, triangles, grids and floating arcs, Composition VIII is Kandinsky's manifesto for pure geometric abstraction painted at the Bauhaus. He treated the flat surface as a field where shape and color behave like music, each form a note in a visual score, precisely the vocabulary of interlocking circles, triangles and grids that Sharmistha Ray unrolls across a pickleball court.",
        "source": "Solomon R. Guggenheim Museum, New York (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Vassily_Kandinsky,_1923_-_Composition_8,_huile_sur_toile,_140_cm_x_201_cm,_Mus%C3%A9e_Guggenheim,_New_York.jpg",
        "image": {
          "src": "/covers/sharmistha-ray-pickleball-court-art--a4.png",
          "alt": "Kandinsky's Composition VIII, an abstract arrangement of circles, triangles, grids and lines on a pale ground",
          "credit": "Wassily Kandinsky, Composition VIII (1923), Solomon R. Guggenheim Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Piet Mondrian, 'Composition II in Red, Blue, and Yellow' (1930)",
        "excerpt": "Mondrian reduced painting to black grid lines and blocks of primary red, blue and yellow, an ordered field of rectangles that feels at once rigorous and playful. It is the purest ancestor of a court reimagined as color and geometry: a flat plane where the grid itself becomes the subject, and where balance is found not in a picture of something but in the arrangement of shape and hue.",
        "source": "Kunsthaus Zurich (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Piet_Mondriaan,_1930_-_Mondrian_Composition_II_in_Red,_Blue,_and_Yellow.jpg",
        "image": {
          "src": "/covers/sharmistha-ray-pickleball-court-art--a5.png",
          "alt": "Mondrian's Composition II in Red, Blue, and Yellow: black grid lines with blocks of primary color",
          "credit": "Piet Mondrian, Composition II in Red, Blue, and Yellow (1930), Kunsthaus Zurich. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "israel-earthen-barrier-divides-gaza",
    "headline": "Israel builds a miles-long earthen barrier inside Gaza, splitting off more than half the territory",
    "overview": "The Israeli military is constructing a miles-long earthen barrier inside Gaza along the so-called yellow line, separating more than half of the strip it controls from the rest, satellite imagery shows. The military said the berm, which runs more than 14 miles, is meant to prevent infiltration and protect its troops and nearby Israeli communities. The line marks the boundary to which Israeli forces withdrew under the October ceasefire.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPQnFjRG9PSm5GWnF5QTZ5WjJuaTVVYmRLanZNMElEUzZjT2xGSjJNZE5QS3hoRC1OMldqOVNWOTFWRkgxazY0NmNHN1FhX0RBV2ZNNHdJNk4wUUJBNHlySm83WkY1MUhZZ2NlS1JQU1dKUWh5VDZXRDd4eDVCYkZyVTh2SjJfNGMtc25zRk90R3ZKc3h1bTNJd1JWenM1UUl5QWpV?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/07/21/israel-gaza-yellow-line-barrier-ceasefire/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-22",
    "image": {
      "src": "/covers/israel-earthen-barrier-divides-gaza.png",
      "alt": "A section of the Israel-Gaza barrier, illustrating the dividing line inside the territory",
      "credit": "Wikimedia Commons"
    },
    "rank": 13,
    "edition": "Morning Edition · 22 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hadrian's Wall, begun AD 122 — Rome fixes a line across Britain 'to separate the barbarians from the Romans'",
        "excerpt": "there he corrected many abuses and was the first to construct a wall, eighty miles in length, which was to separate the barbarians from the Romans.",
        "source": "Historia Augusta, 'Life of Hadrian' 11.2 (trans. David Magie, Loeb Classical Library, 1921), via LacusCurtius (University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Historia_Augusta/Hadrian/1*.html",
        "image": {
          "src": "/covers/israel-earthen-barrier-divides-gaza--a0.png",
          "alt": "A weathered stone wall running along a green ridge in Northumberland, a surviving stretch of Hadrian's Wall west of Housesteads Roman fort.",
          "credit": "Steven Fruitsmaak, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Berlin Wall, raised 13 August 1961 — a barrier that split a city and a people, condemned by Kennedy on 26 June 1963",
        "excerpt": "Freedom has many difficulties and democracy is not perfect, but we have never had to put a wall up to keep our people in, to prevent them from leaving us.",
        "source": "President John F. Kennedy, 'Ich bin ein Berliner' address, Rudolph Wilde Platz, West Berlin, 26 June 1963",
        "href": "https://www.let.rug.nl/usa/presidents/john-fitzgerald-kennedy/ich-bin-ein-berliner-speech-1963.php",
        "image": {
          "src": "/covers/israel-earthen-barrier-divides-gaza--a1.png",
          "alt": "A brightly painted stretch of the Berlin Wall at Bethaniendamm, photographed from the West Berlin side in 1986.",
          "credit": "Thierry Noir, 1986, CC BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Ovid, 'Metamorphoses' Book IV — Pyramus and Thisbe and the chink in the party wall (c. AD 8)",
        "excerpt": "Now, it so happened, a partition built between their houses, many years ago, was made defective with a little chink; a small defect observed by none, although for ages there; but what is hid from love? Our lovers found the secret opening, and used its passage to convey the sounds of gentle, murmured words... 'Thou envious wall why art thou standing in the way of those who die for love? What harm could happen thee shouldst thou permit us to enjoy our love?'",
        "source": "Ovid, 'Metamorphoses' 4.55ff (trans. Brookes More, 1922), via Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=4:card=55"
      },
      {
        "category": "literary",
        "title": "The walls of Jericho fall — Book of Joshua 6:20 (King James Version, 1611)",
        "excerpt": "So the people shouted when the priests blew with the trumpets: and it came to pass, when the people heard the sound of the trumpet, and the people shouted with a great shout, that the wall fell down flat, so that the people went up into the city, every man straight before him, and they took the city.",
        "source": "The Holy Bible, King James Version, Joshua 6:20, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Joshua"
      },
      {
        "category": "artistic",
        "title": "Niklaus Manuel Deutsch, 'Pyramus and Thisbe' (c. 1520), Kunstmuseum Basel",
        "excerpt": "The Swiss painter sets the tragedy in a walled world: Thisbe bends over the fallen, sword-pierced Pyramus at the foot of the very masonry that had earlier kept them apart, its stones now a mute witness to a love the barrier could delay but not save. The composition turns the party wall of Ovid's tale into the silent architecture of catastrophe — separation carried to its lethal end.",
        "source": "Niklaus Manuel Deutsch (1484–1530), 'Pyramus and Thisbe', distemper on canvas, c. 1520, Kunstmuseum Basel (inv. 421)",
        "href": "https://commons.wikimedia.org/wiki/File:Pyramus_and_Thisbe_by_Niklaus_Manuel_(Deutsch).jpg",
        "image": {
          "src": "/covers/israel-earthen-barrier-divides-gaza--a4.png",
          "alt": "Renaissance painting of Thisbe mourning over the dying Pyramus beside a stone wall, by Niklaus Manuel Deutsch, c. 1520.",
          "credit": "Niklaus Manuel Deutsch, c. 1520, Kunstmuseum Basel, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jean Fouquet, 'The Taking of Jericho' (c. 1470–75), from Josephus's 'Antiquités judaïques'",
        "excerpt": "Fouquet paints the archetypal fall of a fortified line: the great ringed walls of Jericho crack and topple as Joshua's army and the ark's procession advance, the fifteenth-century French illuminator rendering an ancient siege in the towers and ramparts of his own age. It is the counter-image to wall-building — the fortified barrier undone, and with it the city it was raised to protect.",
        "source": "Jean Fouquet (c. 1410–1478), 'Prise de Jéricho' (The Taking of Jericho), illumination from Flavius Josephus, 'Les Antiquités judaïques', Paris, BnF, Ms. Français 247, fol. 89",
        "href": "https://commons.wikimedia.org/wiki/File:Prise_de_J%C3%A9richo.jpg",
        "image": {
          "src": "/covers/israel-earthen-barrier-divides-gaza--a5.png",
          "alt": "Fifteenth-century manuscript illumination showing the circular walls of Jericho crumbling as Joshua's army and a religious procession advance, by Jean Fouquet.",
          "credit": "Jean Fouquet, c. 1470–75, Bibliothèque nationale de France (Ms. Français 247), public domain, via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "zelensky-fires-army-chief-syrsky",
    "headline": "Ukraine's Zelensky fires army chief Oleksandr Syrsky after mass protests, names Mykhailo Drapaty commander",
    "overview": "President Volodymyr Zelensky on Tuesday dismissed Ukraine's commander-in-chief, General Oleksandr Syrsky, after days of mass street protests in Kyiv and other cities demanding his removal. The demonstrations erupted following last week's firing of tech-focused Defence Minister Mykhailo Fedorov, exposing a rare public split over the army's strategy against Russia. Zelensky named Major General Mykhailo Drapaty, seen as a Fedorov ally, as the new commander-in-chief.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cyvl35z3917o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQS1lhdGlVLWR2R3BlMWk5dWxmYlJGM2Z4N3ByZ1BVblcxdGhobnpESzVMcWxKYktWd1RQUmZrQV9kUDVJbUFJOTJwRXZuakozVjlMSk9qR25iejlTVktTTEhxWDFNU1VMYkd1ZjF3SXZwMkxSS0FNdXhDcEFSeEFGTGdHb0ROOGx6cURjOVBiUEhVZ3F0STM0TEwxSWw5dHg1UllLTVdwNTk?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/zelensky-fires-army-chief-syrsky.png",
      "alt": "Ukrainian commander-in-chief General Oleksandr Syrsky, dismissed by President Zelensky after mass protests",
      "credit": "BBC"
    },
    "lead": true,
    "rank": 14,
    "edition": "Evening Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Athens recalls Alcibiades from the Sicilian campaign to face trial, 415 BC",
        "excerpt": "It was therefore decided to bring him to trial and execute him, and the Salaminia was sent to Sicily for him and the others named in the information, with instructions to order him to come and answer the charges against him, but not to arrest him, because they wished to avoid causing any agitation in the army or among the enemy in Sicily, and above all to retain the services of the Mantineans and Argives, who, it was thought, had been induced to join by his influence. Alcibiades, with his own ship and his fellow accused, accordingly sailed off with the Salaminia from Sicily, as though to return to Athens, and went with her as far as Thurii, and there they left the ship and disappeared, being afraid to go home for trial with such a prejudice existing against them.",
        "source": "Thucydides, History of the Peloponnesian War (Richard Crawley translation), Book VI, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm#link2HCH0019",
        "image": {
          "src": "/covers/zelensky-fires-army-chief-syrsky--a0.png",
          "alt": "Roman marble bust of the Athenian general and statesman Alcibiades, Musei Capitolini, Rome",
          "credit": "Musei Capitolini, Rome / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Lincoln's Order Relieving General G. B. McClellan of command, November 5, 1862",
        "excerpt": "By direction of the President, it is ordered that Major-General McClellan be relieved from the command of the Army of the Potomac, and that Major-General Burnside take the command of that army. Also that Major-General Hunter take command of the corps in said army which is now commanded by General Burnside. That Major-General Fitz. John Porter be relieved from command of the corps he now commands in said army, and that Major-General Hooker take command of said corps.",
        "source": "Abraham Lincoln, \"Order Relieving General G. B. McClellan and Making Other Changes,\" in The Papers and Writings of Abraham Lincoln, Vol. 1-7, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3253/3253-h/3253-h.htm#Flink2H_4_0216",
        "image": {
          "src": "/covers/zelensky-fires-army-chief-syrsky--a1.png",
          "alt": "President Lincoln and General George B. McClellan in the general's tent at Antietam, October 3, 1862",
          "credit": "Alexander Gardner / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare, Coriolanus, Act III, Scene III — the general banished by the tribunes and the people, c. 1608",
        "excerpt": "SICINIUS. ...in the name o' th' people / And in the power of us the Tribunes, we, / Even from this instant, banish him our city / In peril of precipitation / From off the rock Tarpeian, never more / To enter our Rome gates. I' th' people's name, / I say it shall be so. ... CORIOLANUS. You common cry of curs, whose breath I hate / As reek o' th' rotten fens, whose loves I prize / As the dead carcasses of unburied men / That do corrupt my air, I banish you!",
        "source": "William Shakespeare, Coriolanus, Act III, Scene III, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1535/pg1535-images.html#sceneIII_6.3",
        "image": {
          "src": "/covers/zelensky-fires-army-chief-syrsky--a2.png",
          "alt": "Painting by Gavin Hamilton depicting a scene from Shakespeare's Coriolanus",
          "credit": "Gavin Hamilton / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book I — Agamemnon strips Achilles of his prize amid the army's discord, c. 8th c. BC",
        "excerpt": "since Phoebus Apollo is taking Chryseis from me, I shall send her with my ship and my followers, but I shall come to your tent and take your own prize Briseis, that you may learn how much stronger I am than you are, and that another may fear to set himself up as equal or comparable with me.",
        "source": "Homer, The Iliad (Samuel Butler translation), Book I, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2199/2199-h/2199-h.htm#chap01",
        "image": {
          "src": "/covers/zelensky-fires-army-chief-syrsky--a3.png",
          "alt": "Ancient Roman wall painting from Pompeii depicting Briseis being led away from Achilles by Agamemnon's heralds",
          "credit": "Naples National Archaeological Museum / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, Belisarius Begging for Alms, 1781",
        "excerpt": "David's canvas shows the great Byzantine general Belisarius, who won Justinian's wars in Africa and Italy, reduced to blindness and beggary after falling under imperial suspicion of disloyalty. A former soldier recoils in shocked recognition of the disgraced commander he once served, while a woman drops a coin into his outstretched helmet. The painting became a byword for a loyal general destroyed by the very state he served.",
        "source": "Jacques-Louis David, Bélisaire demandant l'aumône (Belisarius Begging for Alms), Palais des Beaux-Arts de Lille, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David_-_Belisarius.jpg",
        "image": {
          "src": "/covers/zelensky-fires-army-chief-syrsky--a4.png",
          "alt": "Jacques-Louis David's 1781 painting Belisarius Begging for Alms, showing the disgraced Byzantine general reduced to poverty",
          "credit": "Jacques-Louis David / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven scratches Napoleon's name from the dedication of the \"Eroica\" Symphony, 1804",
        "excerpt": "Beethoven's manuscript title page for his Third Symphony originally read \"intitolata Bonaparte\"; on learning that Napoleon had crowned himself Emperor, Beethoven scored through the name so violently he tore a hole in the paper, retitling the work \"Sinfonia Eroica ... composta per festeggiare il sovvenire di un grand'uomo\" (composed to celebrate the memory of a great man). The surviving, defaced title page stands as a physical record of a public break with a wartime leader over the betrayal of a cause.",
        "source": "Ludwig van Beethoven, manuscript title page of Symphony No. 3 \"Eroica,\" 1804, Gesellschaft der Musikfreunde, Vienna, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Eroica_Beethoven_title.jpg",
        "image": {
          "src": "/covers/zelensky-fires-army-chief-syrsky--a5.png",
          "alt": "Manuscript title page of Beethoven's Eroica Symphony with the dedication to Bonaparte scratched out",
          "credit": "Ludwig van Beethoven / Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "france-social-media-ban-under-15",
    "headline": "France's parliament approves a ban on social media for children under 15, a first in the EU",
    "overview": "French lawmakers on Tuesday adopted a sweeping bill barring children under 15 from using social media, making France the first EU country to approve a blanket ban. A flagship measure of President Emmanuel Macron's second term, the law also prohibits mobile phones in high schools and would block new under-15 accounts from 1 September, extending to existing accounts in January 2027. The Constitutional Council must still review the measure.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxNQWtad1hHZ01paXJNQVZLWW51OWxOTDd4MFNyRFpVZnM4YzJOY2tzc1Q1ZF8yUkpJR0tMTjAyc1JxRU5zTnpkZ0RSYzNCaFprb2tKSjg3MU1VWUk4MU1uVkhBVGJxcEhCYmZPaVZmVjN5ck53aDBHcUZQNWR1WDQyVko5SWVUczhUcDZyUi15d2xSYkE5?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/21/france-parliament-approves-social-media-ban-children-under-15.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/france-social-media-ban-under-15.png",
      "alt": "The Palais Bourbon in Paris, seat of the French National Assembly, which voted to bar under-15s from social media and ban phones in high schools",
      "credit": "Ex13 / Wikimedia Commons (CC BY-SA 3.0)"
    },
    "rank": 15,
    "edition": "Evening Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Trial of Socrates for \"Corrupting the Youth,\" Athens, 399 BCE",
        "excerpt": "It says that Socrates is a doer of evil, who corrupts the youth; and who does not believe in the gods of the state, but has other new divinities of his own. Such is the charge; and now let us examine the particular counts. He says that I am a doer of evil, and corrupt the youth; but I say, O men of Athens, that Meletus is a doer of evil, in that he pretends to be in earnest when he is only in jest, and is so eager to bring men to trial from a pretended zeal and interest about matters in which he really never had the smallest interest.",
        "source": "Plato, Apology (Benjamin Jowett translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm",
        "image": {
          "src": "/covers/france-social-media-ban-under-15--a0.png",
          "alt": "Jacques-Louis David's 1787 painting The Death of Socrates, showing Socrates surrounded by grieving followers as he prepares to drink hemlock after being condemned for corrupting the youth of Athens",
          "credit": "Jacques-Louis David / Metropolitan Museum of Art via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The Children and Young Persons (Harmful Publications) Act, UK Parliament, 1955",
        "excerpt": "An Act to prevent the dissemination of certain pictorial publications harmful to children and young persons. ... This Act applies to any book, magazine or other like work which is of a kind likely to fall into the hands of children or young persons and consists wholly or mainly of stories told in pictures (with or without the addition of written matter), being stories portraying— (a) the commission of crimes; or (b) acts of violence or cruelty; or (c) incidents of a repulsive or horrible nature; in such a way that the work as a whole would tend to corrupt a child or young person into whose hands it might fall.",
        "source": "Children and Young Persons (Harmful Publications) Act, 1955 (c. 28), UK Parliament, legislation.gov.uk",
        "href": "https://www.legislation.gov.uk/ukpga/Eliz2/3-4/28/enacted",
        "image": {
          "src": "/covers/france-social-media-ban-under-15--a1.png",
          "alt": "The Palace of Westminster in London, seat of the UK Parliament that passed the 1955 Act banning American-style horror comics likely to fall into the hands of children",
          "credit": "Hartmut Schmidt Heidelberg (Foeniz) / Wikimedia Commons (CC BY-SA 4.0)"
        }
      },
      {
        "category": "literary",
        "title": "Samuel Johnson, The Rambler No. 4, on the Dangers of Novels for the Young, 1750",
        "excerpt": "These books are written chiefly to the young, the ignorant, and the idle, to whom they serve as lectures of conduct, and introductions into life. They are the entertainment of minds unfurnished with ideas, and therefore easily susceptible of impressions; not fixed by principles, and therefore easily following the current of fancy; not informed by experience, and consequently open to every false suggestion and partial account. That the highest degree of reverence should be paid to youth, and that nothing indecent should be suffered to approach their eyes or ears, are precepts extorted by sense and virtue from an ancient writer, by no means eminent for chastity of thought.",
        "source": "Samuel Johnson, The Rambler, No. 4 (31 March 1750)",
        "href": "https://www.johnsonessays.com/the-rambler/no-4-the-modern-form-of-romances-preferable-to-the-ancient-the-necessity-of-characters-morally-good/",
        "image": {
          "src": "/covers/france-social-media-ban-under-15--a2.png",
          "alt": "Portrait of Samuel Johnson by Sir Joshua Reynolds, 1772, oil on canvas",
          "credit": "Joshua Reynolds / Tate via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Lord Byron, \"The Waltz: An Apostrophic Hymn,\" 1813",
        "excerpt": "To teach the young ideas how to rise, / Flush in the cheek, and languish in the eyes; / Rush to the heart, and lighten through the frame, / With half-told wish, and ill-dissembled flame, / For prurient Nature still will storm the breast— / Who, tempted thus, can answer for the rest?",
        "source": "Lord Byron, The Waltz: An Apostrophic Hymn (1813), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Lord_Byron_(ed._Coleridge,_Prothero)/Poetry/Volume_1/The_Waltz",
        "image": {
          "src": "/covers/france-social-media-ban-under-15--a3.png",
          "alt": "Lord Byron in Albanian Dress, portrait by Thomas Phillips, 1813 — the same year Byron published his satirical poem attacking the waltz",
          "credit": "Thomas Phillips / Government Art Collection via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "James Gillray, \"La Walse\" — a caricature of the waltz craze, 1810",
        "excerpt": "Gillray's hand-coloured print skewers the newly imported waltz as a shocking breach of decorum: grotesquely drawn couples clasp waists and shoulders in the close embrace that polite society found scandalous when unchaperoned young people first began dancing it publicly. The caricature belongs to a wave of prints, sermons and newspaper letters of the 1810s that treated the dance itself, not just any individual dancer, as a corrupting new import threatening the morals of the young.",
        "source": "James Gillray, La Walse, hand-coloured etching, 1810, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:La_walse_by_James_Gillray.jpg",
        "image": {
          "src": "/covers/france-social-media-ban-under-15--a4.png",
          "alt": "Hand-coloured 1810 caricature by James Gillray titled \"La Walse\", satirizing waltzing couples locked in close physical embrace",
          "credit": "James Gillray / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "\"Black Bess, or the Knight of the Road\" — a penny dreadful cover, c. 1866-68",
        "excerpt": "This lurid cover for a serial glorifying the highwayman Dick Turpin typifies the penny dreadfuls that flooded working-class boys' pockets in Victorian Britain — cheap weekly pamphlets that clergymen, schoolmasters and magistrates blamed for a wave of juvenile crime and \"moral contamination.\" Reformers campaigned to have the pamphlets confiscated from schoolboys and replaced with improving literature, an early skirmish in the same argument now playing out over what platforms and screens the young should be allowed to access.",
        "source": "Edward Viles, Black Bess, or the Knight of the Road, penny dreadful cover, c. 1866-68, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Penny_Dreadful_Turpin.jpg",
        "image": {
          "src": "/covers/france-social-media-ban-under-15--a5.png",
          "alt": "Cover of a Victorian penny dreadful pamphlet depicting the highwayman Dick Turpin, part of the cheap sensational fiction blamed for corrupting working-class youth",
          "credit": "Edward Viles / Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "microsoft-mistral-ai-europe-deal",
    "headline": "Microsoft to fund Mistral's European AI expansion in a multibillion-dollar compute deal",
    "overview": "Microsoft agreed on Tuesday to bankroll a large part of French startup Mistral AI's European data-centre build-out in a multibillion-dollar commitment, without taking a new equity stake. Mistral will add thousands of Nvidia's latest chips toward a goal of one gigawatt of compute by 2030, and its models will be offered on Microsoft's Foundry and Copilot platforms. The deal gives Microsoft more European capacity and offers regulated industries an alternative to US-controlled infrastructure.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPbkJNeTdhQVJJN2o4b0U2cHB5S1JIQlg0ZUF2eXBjNGpta3NPSG9SRXdzYVVKUzJZX3ZZdF9CQUMyM1J3MWhDUlZzYnNQZVBaeWo0X2VEY0dtLUJSVkx4aER1M2w1Z0FoTGFDa2xXRzl6cnBtOGVZN3Y1TS1MdHpmNW9HX0Rnek5yZEtaamNSVHhOWkhUcl9fR1NDSlY5aWVTek9HYTVrRmVMWFBsRElJdUJ4aDRMUQ?oc=5"
      },
      {
        "name": "The Next Web",
        "href": "https://thenextweb.com/news/microsoft-fund-mistral-european-ai-expansion"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/microsoft-mistral-ai-europe-deal.png",
      "alt": "Microsoft CEO Satya Nadella, official portrait photograph",
      "credit": "Brian Smale / Microsoft / Wikimedia Commons (CC BY-SA 4.0)"
    },
    "rank": 16,
    "edition": "Evening Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pericles and the Funding of the Parthenon from Allied Treasure, c. 447 BC",
        "excerpt": "That which gave most pleasure and ornament to the city of Athens, and the greatest admiration and even astonishment to all strangers... was his construction of the public and sacred buildings. Yet this was that of all his actions in the government which his enemies most looked askance upon and cavilled at in the popular assemblies, crying out how that the commonwealth of Athens had lost its reputation and was ill-spoken of abroad for removing the common treasure of the Greeks from the isle of Delos into their own custody... \"Greece cannot but resent it as an insufferable affront, and consider herself to be tyrannized over openly, when she sees the treasure, which was contributed by her upon a necessity for the war, wantonly lavished out by us upon our city, to gild her all over, and to adorn and set her forth, as it were some vain woman, hung round with precious stones and figures and temples, which cost a world of money.\" Pericles, on the other hand, informed the people, that they were in no way obliged to give any account of those moneys to their allies, so long as they maintained their defence, and kept off the barbarians from attacking them.",
        "source": "Plutarch, Life of Pericles (Clough translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Pericles",
        "image": {
          "src": "/covers/microsoft-mistral-ai-europe-deal--a0.png",
          "alt": "Marble bust of Pericles, Roman copy of a Greek original, Altes Museum Berlin",
          "credit": "Yair Haklai / Wikimedia Commons (CC BY-SA 4.0)"
        }
      },
      {
        "category": "historical",
        "title": "The Lend-Lease Act, signed into law 11 March 1941",
        "excerpt": "Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled, That this Act may be cited as ''An Act to Promote the Defense of the United States''... the President may, from time to time, when he deems it in the interest of national defense, authorize the Secretary Of War, the Secretary of the Navy, or the head of any other department or agency of the Government - (1) To manufacture in arsenals, factories, and shipyards under their jurisdiction, or otherwise procure, to the extent to which funds are made available therefor, or contracts are authorized from time to time by the Congress, or both, any defense article for the government of any country whose defense the President deems vital to the defense of the United States. (2) To sell, transfer title to, exchange, lease, lend, or otherwise dispose of, to any such government any defense article.",
        "source": "An Act to Promote the Defense of the United States (Lend-Lease Act), Pub.L. 77-11, 11 March 1941, Wikisource",
        "href": "https://en.wikisource.org/wiki/Lend_Lease_Act,_11_March_1941",
        "image": {
          "src": "/covers/microsoft-mistral-ai-europe-deal--a1.png",
          "alt": "President Franklin D. Roosevelt signing the Lend-Lease Bill (H.R. 1776) at his desk, March 1941",
          "credit": "Associated Press, New York World-Telegram and Sun Collection / Library of Congress via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Machiavelli's Dedication of The Prince to Lorenzo de' Medici, 1513",
        "excerpt": "Desiring therefore to present myself to your Magnificence with some testimony of my devotion towards you, I have not found among my possessions anything which I hold more dear than, or value so much as, the knowledge of the actions of great men, acquired by long experience in contemporary affairs, and a continual study of antiquity; which, having reflected upon it with great and prolonged diligence, I now send, digested into a little volume, to your Magnificence. And although I may consider this work unworthy of your countenance, nevertheless I trust much to your benignity that it may be acceptable, seeing that it is not possible for me to make a better gift than to offer you the opportunity of understanding in the shortest time all that I have learnt in so many years, and with so many troubles and dangers.",
        "source": "Niccolò Machiavelli, The Prince (W. K. Marriott translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1232/1232-h/1232-h.htm",
        "image": {
          "src": "/covers/microsoft-mistral-ai-europe-deal--a2.png",
          "alt": "Portrait of Niccolò Machiavelli by Santi di Tito, Palazzo Vecchio",
          "credit": "Santi di Tito / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Dickens on the Railway's Arrival at Camden Town, Dombey and Son, 1846-48",
        "excerpt": "The first shock of a great earthquake had, just at that period, rent the whole neighbourhood to its centre. Traces of its course were visible on every side. Houses were knocked down; streets broken through and stopped; deep pits and trenches dug in the ground; enormous heaps of earth and clay thrown up; buildings that were undermined and shaking, propped by great beams of wood. Here, a chaos of carts, overthrown and jumbled together, lay topsy-turvy at the bottom of a steep unnatural hill... There were a hundred thousand shapes and substances of incompleteness, wildly mingled out of their places, upside down, burrowing in the earth, aspiring in the air, mouldering in the water, and unintelligible as any dream.",
        "source": "Charles Dickens, Dombey and Son, Chapter VI, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/821/821-h/821-h.htm",
        "image": {
          "src": "/covers/microsoft-mistral-ai-europe-deal--a3.png",
          "alt": "John Cooke Bourne lithograph, \"Building the Stationary Engine House, Camden Town, April 26th 1837\", showing the London and Birmingham Railway works",
          "credit": "John Cooke Bourne / Yale Center for British Art / Wikimedia Commons (public domain, CC0)"
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, Rain, Steam and Speed – The Great Western Railway, 1844",
        "excerpt": "Turner's canvas shows a locomotive of Brunel's Great Western Railway thundering across Maidenhead Bridge through driving rain, its dark form dissolving into swirling light and vapour as a hare races ahead of it on the tracks. The picture captures the awe and violence of a new mechanical age tearing through the English landscape, the very sensation Dickens describes overtaking Camden Town in Dombey and Son. Painted at the height of the railway boom, it remains one of the defining images of industrial-era infrastructure rendered as sublime spectacle.",
        "source": "J. M. W. Turner, oil on canvas, 1844, National Gallery, London",
        "href": "https://www.nationalgallery.org.uk/paintings/joseph-mallord-william-turner-rain-steam-and-speed-the-great-western-railway",
        "image": {
          "src": "/covers/microsoft-mistral-ai-europe-deal--a4.png",
          "alt": "J. M. W. Turner's painting Rain, Steam and Speed – The Great Western Railway, 1844",
          "credit": "J. M. W. Turner / National Gallery, London / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Handel's Water Music, Composed for King George I's Thames Party, 1717",
        "excerpt": "Composed at the request of King George I, the fifty-piece orchestral suite was performed live by musicians on a barge as the King's flotilla sailed the Thames from Whitehall to Chelsea on 17 July 1717. Contemporary accounts report the King was so delighted that he ordered the music played three times over during the outing, and Handel's standing at the royal court, and his pension, was secured by that display of favour. It stands as a benchmark case of a sovereign power directly bankrolling and showcasing the work of a rising continental talent it wished to keep close.",
        "source": "George Frideric Handel, Water Music, HWV 348-350, IMSLP",
        "href": "https://imslp.org/wiki/Water_Music,_HWV_348-350_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/microsoft-mistral-ai-europe-deal--a5.png",
          "alt": "Portrait of George Frideric Handel by Thomas Hudson, 1749",
          "credit": "Thomas Hudson / Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "google-gemini-lightweight-flagship-delay",
    "headline": "Google updates lightweight Gemini AI models but keeps its flagship Gemini 3.5 Pro delayed",
    "overview": "Google on Tuesday released a trio of cheaper Gemini models - Gemini 3.6 Flash, 3.5 Flash-Lite and a cybersecurity-focused 3.5 Flash Cyber - but gave no new timing for its delayed flagship, Gemini 3.5 Pro. The top-tier model, originally slated for June, has reportedly fallen short of internal goals, particularly on coding. Investors are watching the launch as a test of whether Google's DeepMind can keep pace with its AI rivals.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNRDRLdU9xd0dNMlRnbVYydzAyZ1ZSS2o2LU5iQ0FjT2V2Z1pfMFgzRTBadWMxbXNPeGsxdllXR1Y4ZmVIQjdFS0N0d3dEN1gyS1JEWkpLd3RmT3VLZU9EZlo4QlAwZVlieVNWWEFVUGprdW0zRnlPSk9IVVpKcGRrMEVJc2RWMlV3ZzdtajFZYWZtMnlzYjJ5Z0c0cDlnTXhCR2dkMXVPM1BvMFRP?oc=5"
      },
      {
        "name": "The Star",
        "href": "https://www.thestar.com.my/tech/tech-news/2026/07/21/google-updates-lightweight-gemini-models-but-flagship-still-delayed"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/google-gemini-lightweight-flagship-delay.png",
      "alt": "Entrance of the Google DeepMind headquarters building at 6 Pancras Square, London",
      "credit": "Gciriani / Wikimedia Commons (CC BY-SA 4.0)"
    },
    "rank": 17,
    "edition": "Evening Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Apelles' unfinished Aphrodite of Cos, left incomplete at the painter's death, 4th century BC",
        "excerpt": "Apelles had also begun on another Aphrodite at Cos, which was to surpass even his famous earlier one; but death grudged him the work when only partly finished, nor could anybody be found to carry on the task, in conformity with the outlines of the sketches prepared.",
        "source": "Pliny the Elder, The Natural History, Book XXXV, section 92 (English translation), Attalus.org",
        "href": "https://www.attalus.org/translate/pliny_hn35a.html#92",
        "image": {
          "src": "/covers/google-gemini-lightweight-flagship-delay--a0.png",
          "alt": "Roman fresco of Aphrodite Anadyomene from the House of Venus, Pompeii, echoing the subject of Apelles' celebrated but unfinished Venus",
          "credit": "Unknown Roman artist, photo by Stephen Haynes / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Pope Julius II's impatience with Michelangelo's unfinished Sistine Chapel ceiling, 1511-1512",
        "excerpt": "Now, when he had finished half of it, the Pope, who had subsequently gone to see it several times (mounting certain ladders with the assistance of Michelagnolo), insisted that it should be thrown open, for he was hasty and impatient by nature, and could not wait for it to be completely finished and to receive, as the saying is, the final touch. No sooner was it thrown open than all Rome was drawn to see it, and the Pope was the first, not having the patience to wait until the dust caused by the dismantling of the scaffolding had settled.",
        "source": "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors, and Architects (trans. Gaston du C. de Vere), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/32362/32362-h/32362-h.htm",
        "image": {
          "src": "/covers/google-gemini-lightweight-flagship-delay--a1.png",
          "alt": "The full painted ceiling of the Sistine Chapel by Michelangelo",
          "credit": "Jorge Barrios / Wikimedia Commons (CC BY 3.0)"
        }
      },
      {
        "category": "literary",
        "title": "Penelope's web: weaving by day and unravelling by night to delay a decision, Homer's Odyssey, Book II & XIX (c. 8th century BC)",
        "excerpt": "She set up a great tambour frame in her room, and began to work on an enormous piece of fine needlework. 'Sweet hearts,' said she, 'Ulysses is indeed dead, still do not press me to marry again immediately, wait—for I would not have skill in needlework perish unrecorded—till I have completed a pall for the hero Laertes, to be in readiness against the time when death shall take him.' ... This was what she said, and we assented; whereon we could see her working on her great web all day long, but at night she would unpick the stitches again by torchlight. She fooled us in this way for three years and we never found her out.",
        "source": "Homer, The Odyssey (trans. Samuel Butler), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm",
        "image": {
          "src": "/covers/google-gemini-lightweight-flagship-delay--a2.png",
          "alt": "Painting of Penelope at her loom, ignoring the suitors gathered behind her",
          "credit": "John William Waterhouse / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Coleridge's preface to \"Kubla Khan,\" the visionary poem left forever a fragment after an interruption, 1816",
        "excerpt": "At this moment he was unfortunately called out by a person on business from Porlock, and detained by him above an hour, and on his return to his room, found to his no small surprise and mortification, that though he still retained some vague and dim recollection of the general purpose of the vision, yet, with the exception of some eight or ten scattered lines and images, all the rest had passed away like the images on the surface of a stream into which a stone has been cast, but, alas! without the after restoration of the latter.",
        "source": "Samuel Taylor Coleridge, preface to \"Kubla Khan,\" in Christabel; Kubla Khan, A Vision; The Pains of Sleep (1816), Wikisource",
        "href": "https://en.wikisource.org/wiki/Christabel;_Kubla_Khan;_The_Pains_of_Sleep_(1816)/Kubla_Khan",
        "image": {
          "src": "/covers/google-gemini-lightweight-flagship-delay--a3.png",
          "alt": "Portrait of Samuel Taylor Coleridge, 1795",
          "credit": "Peter Vandyke / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Leonardo da Vinci's Adoration of the Magi, abandoned unfinished when he left for Milan, 1481-82",
        "excerpt": "Commissioned by Augustinian monks for the high altar of San Donato a Scopeto, the panel shows the Virgin and Child surrounded by a churning crowd of figures sketched in charcoal, ink and thin washes of paint. Leonardo left Florence for the Sforza court in Milan in 1482 with the composition still only underpainted, and no colours were ever applied to most of the panel. It remains, over five centuries later, one of art history's most famous unfinished masterworks.",
        "source": "Uffizi Galleries, official artwork page for Leonardo da Vinci, Adoration of the Magi",
        "href": "https://www.uffizi.it/en/artworks/leonardo-adoration-of-the-magi",
        "image": {
          "src": "/covers/google-gemini-lightweight-flagship-delay--a4.png",
          "alt": "Leonardo da Vinci's unfinished Adoration of the Magi, showing underpainted, mostly colorless figures",
          "credit": "Leonardo da Vinci / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Schubert's Symphony No. 8 in B minor, the \"Unfinished Symphony,\" composed 1822 but not premiered until 1865",
        "excerpt": "Schubert composed only two complete movements of the symphony in 1822 and sketched a third before setting the work aside; he sent the manuscript to a music society in Graz and it languished, unheard, for over forty years. It was not performed until 1865, nearly four decades after Schubert's death, when conductor Johann von Herbeck finally premiered the two surviving movements in Vienna. It remains one of classical music's most famous incomplete works.",
        "source": "IMSLP (International Music Score Library Project), score page for Schubert's Symphony No. 8, D.759",
        "href": "https://imslp.org/wiki/Symphony_No.8,_D.759_(Schubert,_Franz)",
        "image": {
          "src": "/covers/google-gemini-lightweight-flagship-delay--a5.png",
          "alt": "Portrait of composer Franz Schubert, after an 1825 watercolor by Wilhelm August Rieder",
          "credit": "Wilhelm August Rieder / Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "airbus-2029-earnings-target-buyback",
    "headline": "Airbus targets adjusted earnings of 12-13 billion euros by 2029 and launches a 5 billion euro buyback",
    "overview": "Airbus on Tuesday set a mid-term goal of roughly doubling profits, targeting adjusted EBIT of 12-13 billion euros by 2029, up from 7.13 billion euros in 2025, with commercial-aircraft earnings alone rising toward 10 billion euros. The board approved a 5 billion euro share buyback spread over three years. Chief financial officer Thomas Toepfer said the planemaker was starting its mid-term trajectory 'from a position of strength.'",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPSUVkTnFtMTFjc0VLZUtnYWRwQmdsSGFweDA4a3BDR1VQQW1OSGcyYmtsdS1NNDBSbkxuMVFfMjJhNFAxVnRaaEtFTlpScENqdVJXaVVKQWpVem1RT2gzTVV5b05ISXhwMXkwZ1hCamw5YTZzdjFPSHB3bkVnY3VvSmlGaUhkYThBa2VmeEVxLUJLMC1SVFJCS3FXRXpKQ1lLRnBsNFZsMVdOUVVIc2hBdFM5UzhpWVpxbFVWVlJRaw?oc=5"
      },
      {
        "name": "FlightGlobal",
        "href": "https://www.flightglobal.com/archive/2026/07/airbus-sets-out-mid-term-ambition-to-double-commercial-aircraft-earnings/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/airbus-2029-earnings-target-buyback.png",
      "alt": "An Airbus A350-1000 wide-body jet on display at the Paris Air Show",
      "credit": "New York-air / Wikimedia Commons (CC BY-SA 4.0)"
    },
    "rank": 18,
    "edition": "Evening Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Julius Caesar crosses the Rubicon, 49 BC",
        "excerpt": "While he was thus hesitating, the following incident occurred. A person remarkable for his noble mien and graceful aspect, appeared close at hand, sitting and playing upon a pipe. When, not only the shepherds, but a number of soldiers also flocked from their posts to listen to him, and some trumpeters among them, he snatched a trumpet from one of them, ran to the river with it, and sounding the advance with a piercing blast, crossed to the other side. Upon this, Caesar exclaimed, \"Let us go whither the omens of the Gods and the iniquity of our enemies call us. The die is now cast.\"",
        "source": "Suetonius, The Lives of the Twelve Caesars, Vol. I: Julius Caesar (Alexander Thomson translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/6386/6386.txt",
        "image": {
          "src": "/covers/airbus-2029-earnings-target-buyback--a0.png",
          "alt": "The Tusculum portrait, a marble bust of Julius Caesar made during his lifetime",
          "credit": "Ángel M. Felicísimo / Wikimedia Commons (CC BY 2.0); underlying artwork public domain"
        }
      },
      {
        "category": "historical",
        "title": "The Wright brothers' first powered flight, Kitty Hawk, 17 December 1903",
        "excerpt": "On a wind-scoured stretch of dune at Kill Devil Hills, Orville Wright coaxed a fragile wood-and-fabric machine into a twelve-second hop, the first sustained, powered, controlled flight in history, with Wilbur running alongside. By the fourth attempt that morning Wilbur had covered 852 feet in 59 seconds before a gust wrecked the Flyer on the sand. The brothers, bicycle makers who had staked years of unpaid labor on an unproven business of flight, wired their father that evening with news of their success and instructions to tell the press.",
        "source": "1903 Wright Flyer, Smithsonian National Air and Space Museum (museum object page)",
        "href": "https://airandspace.si.edu/collection-objects/1903-wright-flyer/nasm_A19610048000",
        "image": {
          "src": "/covers/airbus-2029-earnings-target-buyback--a1.png",
          "alt": "The Wright Flyer lifting off the ground at Kitty Hawk on 17 December 1903, Orville Wright at the controls and Wilbur Wright running alongside",
          "credit": "John T. Daniels / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VIII: Daedalus and Icarus, c. 8 AD",
        "excerpt": "When the boy began to be pleased with a bolder flight, and forsook his guide; and, touched with a desire of reaching heaven, pursued his course still higher. The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air. His face, too, as he called on the name of his father, was received in the azure water, which received its name from him.",
        "source": "Ovid, Metamorphoses, Book VIII (Henry T. Riley translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm",
        "image": {
          "src": "/covers/airbus-2029-earnings-target-buyback--a2.png",
          "alt": "Icarus and Daedalus, 1799 oil painting by Charles Paul Landon showing the father fitting his son's wings before the fatal flight",
          "credit": "Charles Paul Landon / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare's Antonio on his diversified ventures, The Merchant of Venice, Act I, Scene i, c. 1596-98",
        "excerpt": "Believe me, no. I thank my fortune for it, My ventures are not in one bottom trusted, Nor to one place; nor is my whole estate Upon the fortune of this present year. Therefore my merchandise makes me not sad.",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene i, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm",
        "image": {
          "src": "/covers/airbus-2029-earnings-target-buyback--a3.png",
          "alt": "The Chandos portrait of William Shakespeare, c. 1600-1610, National Portrait Gallery, London",
          "credit": "Attrib. John Taylor / National Portrait Gallery, London / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1560",
        "excerpt": "A ploughman, a shepherd and a fisherman go about their unhurried work on a sunlit coastline while, almost unnoticed in the corner of the canvas, a pair of small legs vanish into the sea beside a merchant ship in full sail. Bruegel sets the ancient story of overreaching ambition against a world of commerce and labor that carries on regardless of the flyer's fate.",
        "source": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1560, Royal Museums of Fine Arts of Belgium, Brussels",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Landscape_with_the_Fall_of_Icarus_-_WGA03322.jpg",
        "image": {
          "src": "/covers/airbus-2029-earnings-target-buyback--a4.png",
          "alt": "Landscape with the Fall of Icarus by Pieter Bruegel the Elder, showing a ploughman, shepherd and ship, with Icarus's legs disappearing into the sea",
          "credit": "Pieter Bruegel the Elder / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Ralph Vaughan Williams, The Lark Ascending, composed 1914, revised 1920",
        "excerpt": "A solo violin spirals upward out of a hushed orchestral bed of strings, its long unmetered lines climbing and hovering like a bird rising over English farmland. Vaughan Williams prefaced the score with lines from George Meredith's poem on the lark's flight, and the music itself never resolves into a march or a fanfare, only an unhurried, confident ascent that seems to promise more sky above.",
        "source": "Ralph Vaughan Williams, The Lark Ascending, for violin and orchestra; score, IMSLP",
        "href": "https://imslp.org/wiki/The_Lark_Ascending_(Vaughan_Williams,_Ralph)",
        "image": {
          "src": "/covers/airbus-2029-earnings-target-buyback--a5.png",
          "alt": "Photograph of composer Ralph Vaughan Williams, circa 1900",
          "credit": "Unknown photographer / Wikimedia Commons (public domain, CC0)"
        }
      }
    ]
  },
  {
    "slug": "novo-nordisk-sues-lilly-weight-loss-ads",
    "headline": "Novo Nordisk sues Eli Lilly over 'deceptive' weight-loss drug advertising",
    "overview": "Novo Nordisk on Tuesday sued rival Eli Lilly in federal court in New Jersey, accusing it of false advertising for its obesity and diabetes drugs. Novo alleges Lilly's ads pit the highest doses of Zepbound and Mounjaro against lower doses of Wegovy and Ozempic while citing outdated trials, omitting data from Novo's newer high-dose Wegovy. Novo is seeking a court order halting the ads, corrective advertising and damages, and has warned it may seek a preliminary injunction within days.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxOcnJ0Q2x1Wmtoa1FXcjI1RjZwUU5FclB4Q0VST1NfVUZpdHFvUHF5UUpTRkhiclhBakRJY3VKRFhIclZFTnhLcUN3NFVCdm1BTlVBU2JNYVVLaERfYUJaOGFrVEtaTTdxSHFWRU5PX25WS0NjX0ZaRklIQktDbWVRLWNMTjdCbDJ5SEZFektfMDF6ci1aOGtZU3BmNFZMaDdyV1hrRjhYTXMtVTY4dE1KbQ?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/21/novo-nordisk-sues-eli-lilly-glp-1-ads.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/novo-nordisk-sues-lilly-weight-loss-ads.png",
      "alt": "Novo Nordisk's corporate headquarters building in Bagsværd, Denmark",
      "credit": "Johan Wessman / News Øresund / Wikimedia Commons (CC BY 3.0)"
    },
    "rank": 19,
    "edition": "Evening Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hippocrates denounces the \"conjurors, mountebanks, and charlatans,\" c. 400 BCE",
        "excerpt": "They who first referred this malady to the gods appear to me to have been just such persons as the conjurors, purificators, mountebanks, and charlatans now are, who give themselves out for being excessively religious, and as knowing more than other people.",
        "source": "Hippocrates, On the Sacred Disease (trans. Francis Adams), The Internet Classics Archive, MIT",
        "href": "https://classics.mit.edu/Hippocrates/sacred.html",
        "image": {
          "src": "/covers/novo-nordisk-sues-lilly-weight-loss-ads--a0.png",
          "alt": "Ancient herm bust bearing the head of Hippocrates, Uffizi Gallery",
          "credit": "Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The Pure Food and Drug Act's ban on \"misbranded\" drugs, U.S. Congress, 1906",
        "excerpt": "SEC. 8 That the term “misbranded,” as used herein, shall apply to all drugs, or articles of food, or articles which enter into the composition of food, the package or label of which shall bear any statement, design, or device regarding such article, or the ingredients or substances contained therein which shall be false or misleading in any particular, and to any food or drug product which is falsely branded as the State, territory, or country in which it is manufactured or produced.",
        "source": "Pure Food and Drug Act of 1906 (Public Law 59-384), Sec. 8, Wikisource",
        "href": "https://en.wikisource.org/wiki/Pure_Food_and_Drug_Act_of_1906",
        "image": {
          "src": "/covers/novo-nordisk-sues-lilly-weight-loss-ads--a1.png",
          "alt": "Portrait of Dr. Harvey W. Wiley, the chemist who championed the Pure Food and Drug Act against patent-medicine fraud",
          "credit": "Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Chaucer's Pardoner hawks a fake relic as a miracle cure, The Canterbury Tales, c. 1390s",
        "excerpt": "Then have I in latoun a shoulder-bone Which that was of a holy Jewe's sheep. “Good men,” say I, “take of my wordes keep; If that this bone be wash'd in any well, If cow, or calf, or sheep, or oxe swell, That any worm hath eat, or worm y-stung, Take water of that well, and wash his tongue, And it is whole anon; and farthermore Of pockes, and of scab, and every sore Shall every sheep be whole, that of this well Drinketh a draught; take keep of that I tell.",
        "source": "Geoffrey Chaucer, The Canterbury Tales, and Other Poems (\"The Pardoner's Tale\"), ed. W. W. Skeat, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2383/2383-h/2383-h.htm",
        "image": {
          "src": "/covers/novo-nordisk-sues-lilly-weight-loss-ads--a2.png",
          "alt": "Illumination of the Pardoner from the Ellesmere manuscript of The Canterbury Tales",
          "credit": "Huntington Library / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Volpone, disguised as the mountebank Scoto of Mantua, trashes a rival quack, Ben Jonson, 1606",
        "excerpt": "Nor that the calumnious reports of that impudent detractor, and shame to our profession, (Alessandro Buttone, I mean,) who gave out, in public, I was condemn'd a sforzato to the galleys, for poisoning the cardinal Bembo's—cook, hath at all attached, much less dejected me. No, no, worthy gentlemen; to tell you true, I cannot endure to see the rabble of these ground ciarlitani, that spread their cloaks on the pavement, as if they meant to do feats of activity, and then come in lamely, with their mouldy tales out of Boccacio, like stale Tabarine, the fabulist.",
        "source": "Ben Jonson, Volpone; Or, the Fox, Act II, Scene ii, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/4039/4039-h/4039-h.htm",
        "image": {
          "src": "/covers/novo-nordisk-sues-lilly-weight-loss-ads--a3.png",
          "alt": "Portrait of Ben Jonson by Abraham van Blyenberch, c. 1617",
          "credit": "National Portrait Gallery, London / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "William Hogarth's The Company of Undertakers, a satire on rival quack physicians, 1736",
        "excerpt": "Hogarth's etching arranges fifteen doctors' heads like a mock coat of arms atop a shield of urine flasks, with three notorious quacks in a central chevron staring each other down as if sizing up the competition. The Latin motto beneath translates roughly as \"and when they consult, the sick man dies\" — Hogarth's jab at physicians more invested in professional rivalry and self-promotion than in curing anyone. The print skewers the era's crowded, competitive market in miracle cures, where credentialed doctors and street mountebanks alike traded accusations of quackery.",
        "source": "William Hogarth, The Company of Undertakers, 1736, etching and engraving, Metropolitan Museum of Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Company_of_Undertakers_MET_DP829229.jpg",
        "image": {
          "src": "/covers/novo-nordisk-sues-lilly-weight-loss-ads--a4.png",
          "alt": "William Hogarth's 1736 satirical print The Company of Undertakers, mocking rival quack physicians arranged as a coat of arms",
          "credit": "Metropolitan Museum of Art / Wikimedia Commons (CC0)"
        }
      },
      {
        "category": "artistic",
        "title": "Dr. Dulcamara's entrance aria selling his \"miracle elixir,\" Donizetti's L'elisir d'amore, 1832",
        "excerpt": "Udite, udite, o rustici; attenti, non fiatate. [...] Ch'io sono quel gran medico, dottore enciclopedico, chiamato Dulcamara, la cui virtù preclara e i portenti infiniti son noti a tutto il mondo... e in altri siti.",
        "source": "Gaetano Donizetti (libretto by Felice Romani), L'elisir d'amore, Act II, Dulcamara's cavatina \"Udite, udite, o rustici,\" 1839 Forlì libretto, Internet Archive",
        "href": "https://archive.org/details/lelisirdamoremel00roma",
        "image": {
          "src": "/covers/novo-nordisk-sues-lilly-weight-loss-ads--a5.png",
          "alt": "Watercolor of Adina and Dr. Dulcamara, the traveling elixir salesman, from a scene of Donizetti's L'elisir d'amore, by George Augustus Sala",
          "credit": "Yale Center for British Art / Wikimedia Commons (CC0)"
        }
      }
    ]
  },
  {
    "slug": "brazil-amazon-burned-area-drop-2025",
    "headline": "Brazil's Amazon burned area fell 45% in 2025, government satellite monitoring shows",
    "overview": "The area scorched by fire in Brazil's Amazon dropped 45% in the year to September 2025, to 21,543 square kilometres from 39,310 a year earlier, according to Brazil's INPE space-research agency. Milder weather and tougher curbs on burning drove the decline, which accompanied an 11% fall in deforestation to the lowest level since 2014. Scientists cautioned that the underlying risks of drought and forest loss remain.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cqx78eplqqlo"
      },
      {
        "name": "Reuters",
        "href": "https://ca.news.yahoo.com/brazils-amazon-sees-sharp-decline-155734460.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/brazil-amazon-burned-area-drop-2025.png",
      "alt": "A stretch of the Brazilian Amazon rainforest, where the area burned by fire fell sharply in 2025",
      "credit": "BBC"
    },
    "rank": 20,
    "edition": "Evening Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tacitus on the Great Fire of Rome and Nero's Fire-Safety Building Code, 64 AD",
        "excerpt": "The buildings themselves, to a certain height, were to be solidly constructed, without wooden beams, of stone from Gabii or Alba, that material being impervious to fire. And to provide that the water which individual license had illegally appropriated, might flow in greater abundance in several places for the public use, officers were appointed, and everyone was to have in the open court the means of stopping a fire. Every building, too, was to be enclosed by its own proper wall, not by one common to others.",
        "source": "Tacitus, The Annals, Book XV (Church and Brodribb translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15",
        "image": {
          "src": "/covers/brazil-amazon-burned-area-drop-2025--a0.png",
          "alt": "Engraved portrait of the Roman historian Cornelius Tacitus, based on an antique bust",
          "credit": "Unknown artist, The Book of History (Grolier Society, 1920) / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The Charter of the Forest, 1225 reissue (Henry III)",
        "excerpt": "First, we will that all forests, which King Henry [II] our Grandfather afforested, shall be viewed by good and lawful men; and if he has made forest of any other wood more than of his own demesne, whereby the owner of the wood has been hurt, forthwith it shall be disafforested; and if he has made forest of his own wood, then it shall remain forest, saving the Common of Herbage, and of other things in the same forest, to them which before were accustomed to have the same.",
        "source": "Charter of the Forest, 1225 reissue (translation), The National Archives education resources",
        "href": "https://www.nationalarchives.gov.uk/education/resources/magna-carta/charter-forest-1225-westminster/",
        "image": {
          "src": "/covers/brazil-amazon-burned-area-drop-2025--a1.png",
          "alt": "The 1225 reissue of the Charter of the Forest, manuscript Add. Ch. 24712",
          "credit": "The British Library Board / Wikimedia Commons (Public Domain Mark 1.0)"
        }
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II — the Scorching of the Earth by Phaethon, c. 8 AD",
        "excerpt": "The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction—Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust—the forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book II (Brookes More translation, 1922), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=201",
        "image": {
          "src": "/covers/brazil-amazon-burned-area-drop-2025--a2.png",
          "alt": "The Death of Phaeton, etching by Antonio Tempesta from a 1606 illustrated edition of Ovid's Metamorphoses",
          "credit": "Antonio Tempesta, 1606 / The Metropolitan Museum of Art via Wikimedia Commons (CC0)"
        }
      },
      {
        "category": "literary",
        "title": "John Muir on Fire in the Western Forest Reserves, Our National Parks, 1901",
        "excerpt": "The forty million acres of these reserves are in the main unspoiled as yet, though sadly wasted and threatened on their more open margins by the axe and fire of the lumberman and prospector, and by hoofed locusts, which, like the winged ones, devour every leaf within reach, while the shepherds and owners set fires with the intention of making a blade of grass grow in the place of every tree, but with the result of killing both the grass and the trees.",
        "source": "John Muir, Our National Parks (1901), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/60929/60929-h/60929-h.htm",
        "image": {
          "src": "/covers/brazil-amazon-burned-area-drop-2025--a3.png",
          "alt": "Photographic portrait of naturalist and conservationist John Muir, 1900",
          "credit": "Bain News Service, 1900, Library of Congress / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, The Fall of Phaeton, c. 1604/1605",
        "excerpt": "Rubens paints the mythical inferno at its climax: Jupiter's thunderbolts strike Phaethon from the sun-chariot as the horses bolt and rear, plunging the world below into flame. Winged personifications of the Hours scatter in terror around the wheeling chariot, the sky itself convulsed by the disaster of a fire loosed beyond anyone's control.",
        "source": "Peter Paul Rubens, The Fall of Phaeton, c. 1604/1605, National Gallery of Art, Washington",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/brazil-amazon-burned-area-drop-2025--a4.png",
          "alt": "The Fall of Phaeton, oil painting by Peter Paul Rubens, c. 1604/1605",
          "credit": "Peter Paul Rubens / National Gallery of Art via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Igor Stravinsky, The Firebird (L'Oiseau de feu), ballet score, 1910",
        "excerpt": "Stravinsky's ballet unfolds in an enchanted garden where a magical, fire-bright bird can either scorch or save those who capture it. Its climax turns a destructive blaze into an act of deliverance: the Firebird's fire consumes the sorcerer Kashchei's power, breaking his spell and releasing the garden's captives into a triumphant, forest-wide finale.",
        "source": "Igor Stravinsky, The Firebird, ballet score, 1910, IMSLP",
        "href": "https://imslp.org/wiki/The_Firebird_(ballet),_K010_(Stravinsky,_Igor)",
        "image": {
          "src": "/covers/brazil-amazon-burned-area-drop-2025--a5.png",
          "alt": "Photographic portrait of composer Igor Stravinsky, c. 1920s",
          "credit": "George Grantham Bain Collection, Library of Congress / Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "san-carlos-reservoir-arizona-near-empty",
    "headline": "San Carlos Reservoir, one of Arizona's largest, falls below 1% full after a snowpack collapse",
    "overview": "San Carlos Reservoir, among Arizona's largest bodies of water, has nearly vanished, holding less than 1% of capacity after a near-total collapse of snowpack in the Gila River watershed. NASA satellite images showed the reservoir near-empty in spring, and the drying has triggered a massive fish kill. The crisis reflects a wider drought gripping the US Southwest, with the Colorado River basin on track for its driest year on record.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPNHgzWHBBeGRFZ3R3UWxqaDdwWlE0Xzd1Z05hV3ViQktnQ2dQdmxHaHZBTE42QVJSZWtCLVRyQ1Qxam9fMFpxTHU5RW0tSmJMWC1LOWpUUG5UaHRVWVpLUXNEdXhkT3VOY0tWb1RDcUZDdnV0ZUZwYWRWcnZDaTdzX3BVVm1rdVJ6Mzd6T3JxdkVjcDdWTWxncEdfbFhIWWtC?oc=5"
      },
      {
        "name": "NASA Earth Observatory",
        "href": "https://science.nasa.gov/earth/earth-observatory/low-water-at-san-carlos-reservoir/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/san-carlos-reservoir-arizona-near-empty.png",
      "alt": "NASA Landsat satellite image of San Carlos Reservoir, Arizona, nearly empty in May 2026, with the Gila River's natural channel visible where the lake used to be",
      "credit": "NASA Earth Observatory / Michala Garrison"
    },
    "rank": 21,
    "edition": "Evening Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Famine in Judea under Claudius, c. 46-48 AD",
        "excerpt": "Under these procurators that great famine happened in Judea, in which queen Helena bought corn in Egypt at a great expense, and distributed it to those that were in want, as I have related already.",
        "source": "Flavius Josephus, Antiquities of the Jews, Book XX, Chapter 2 (William Whiston translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2848/2848-h/2848-h.htm",
        "image": {
          "src": "/covers/san-carlos-reservoir-arizona-near-empty--a0.png",
          "alt": "Engraved portrait of the historian Flavius Josephus, from an 1817 edition of William Whiston's translation of his works",
          "credit": "William Whiston, 1817 edition / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Franklin D. Roosevelt's Fireside Chat on the Dust Bowl drought, 6 September 1936",
        "excerpt": "I shall never forget the fields of wheat so blasted by heat that they cannot be harvested. I Shall never forget field after field of corn stunted, earless and stripped of leaves, for what the sun left the grasshoppers took. I saw brown pastures which would not keep a cow on fifty acres.",
        "source": "Franklin D. Roosevelt, Fireside Chat on drought conditions, radio address, 6 September 1936, Wikisource",
        "href": "https://en.wikisource.org/wiki/Roosevelt's_Fireside_Chat,_6_September_1936",
        "image": {
          "src": "/covers/san-carlos-reservoir-arizona-near-empty--a1.png",
          "alt": "A farmer and his two sons walking through a dust storm toward a farm building, Cimarron County, Oklahoma, April 1936",
          "credit": "Arthur Rothstein, Farm Security Administration / Library of Congress via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Samuel Taylor Coleridge, The Rime of the Ancyent Marinere, 1798",
        "excerpt": "Day after day, day after day, / We stuck, ne breath ne motion, / As idle as a painted Ship / Upon a painted Ocean, / Water, water, every where / And all the boards did shrink; / Water, water, every where, / Ne any drop to drink.",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancyent Marinere, in Lyrical Ballads (1798 first edition), Wikisource",
        "href": "https://en.wikisource.org/wiki/Lyrical_Ballads_(1798)/The_Rime_of_the_Ancyent_Marinere",
        "image": {
          "src": "/covers/san-carlos-reservoir-arizona-near-empty--a2.png",
          "alt": "Gustave Doré's 1876 engraving of the Ancient Mariner on the becalmed ship, watching water-snakes in the moonlit sea with the dead albatross around his neck",
          "credit": "Gustave Doré, 1876 / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Elijah proclaims the drought and the brook Cherith dries up, 1 Kings 17",
        "excerpt": "And Elijah the Tishbite, who was of the inhabitants of Gilead, said unto Ahab, As the LORD God of Israel liveth, before whom I stand, there shall not be dew nor rain these years, but according to my word. ... And it came to pass after a while, that the brook dried up, because there had been no rain in the land.",
        "source": "1 Kings 17:1, 7, King James Version, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings/Chapter_17",
        "image": {
          "src": "/covers/san-carlos-reservoir-arizona-near-empty--a3.png",
          "alt": "Elijah Fed by Ravens, 1620 oil painting by Guercino, showing the prophet in the wilderness beside the brook Cherith during the drought",
          "credit": "Guercino / National Gallery, London / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Alexandre Hogue, Dust Bowl, 1933",
        "excerpt": "Under a lurid, blood-red sky, wind-carved dunes of drifted soil bury a fence line and swallow a homestead, with angular fence posts and coils of barbed wire the only sign a farm ever stood there. A single truck-tire track leads away across the buried earth, as if the family that worked the land had just driven off for good. Hogue, who watched the Dust Bowl strip the Southern Plains firsthand, exaggerated the color and form of the erosion to force viewers to feel the scale of the disaster.",
        "source": "Alexandre Hogue, Dust Bowl, 1933, oil on canvas, Smithsonian American Art Museum (object no. 1969.123)",
        "href": "https://americanart.si.edu/artwork/dust-bowl-10614",
        "image": {
          "src": "/covers/san-carlos-reservoir-arizona-near-empty--a4.png",
          "alt": "Dust Bowl, 1933 painting by Alexandre Hogue, showing a farmstead half-buried under wind-drifted red soil beneath a blood-colored sky",
          "credit": "Alexandre Hogue / Smithsonian American Art Museum"
        }
      },
      {
        "category": "artistic",
        "title": "Felix Mendelssohn, Elijah, Op. 70, 1846",
        "excerpt": "Mendelssohn's oratorio opens, before the overture even begins, with Elijah pronouncing a curse of drought on Israel, that there shall be neither dew nor rain for years to come; the overture that follows depicts the drought itself in grinding, airless orchestral writing before giving way to a chorus of a starving, thirsting people. Only after Elijah's long prayer does a servant see a small cloud rise out of a clear sky, and rain finally breaks the drought in a torrential closing chorus. Mendelssohn conducted the sold-out premiere in Birmingham in August 1846, with the audience reportedly demanding that several numbers be encored on the spot.",
        "source": "Felix Mendelssohn, Elijah, Op. 70 (1846), oratorio; score, IMSLP",
        "href": "https://imslp.org/wiki/Elijah,_Op.70_(Mendelssohn,_Felix)",
        "image": {
          "src": "/covers/san-carlos-reservoir-arizona-near-empty--a5.png",
          "alt": "Portrait of composer Felix Mendelssohn Bartholdy by Eduard Magnus, 1846, the year Elijah premiered",
          "credit": "Eduard Magnus, 1846 / Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "sibling-supernova-remnants-fermi",
    "headline": "Astronomers find first evidence of two sibling stars that each exploded as a supernova",
    "overview": "Using 16 years of data from NASA's Fermi Gamma-ray Space Telescope, astronomers reported the first evidence of a binary star system in which both stars exploded as supernovae. They argue the faint remnant G189.6+3.3, overlapping the Jellyfish Nebula, formed when one star detonated, kicked away its companion, and that companion exploded tens of thousands of years later. Though most massive stars are born in pairs, no such double remnant had previously been identified.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxQQmk1c042TlB6MTAxalVENVZqNlNCV1AtTEJiZnc0NXVxbExBR3F5RVdRNjFRQ183dy0xUkpLQlpCc2xsbVdmbUlkanVsb1VwX0hJNEdaMXBOUjhDVVV3cVN2MUxGSHhDMnhVVHJ1QlJqZk9wNjlJTzdOWFZUZ1lfdGQ0T0ZFTzVaQURVeHdocEFJd0tLX3V3Qjd5TlN5YU9Md0t4V0l3TlJGZw?oc=5"
      },
      {
        "name": "NASA Science",
        "href": "https://science.nasa.gov/missions/fermi/nasas-fermi-sibling-supernova-remnants/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/sibling-supernova-remnants-fermi.png",
      "alt": "Multiwavelength image of the Jellyfish Nebula (IC 443) supernova remnant and the interstellar cloud it is interacting with, near the location of the fainter sibling remnant G189.6+3.3",
      "credit": "NASA Goddard Space Flight Center and M. Michailidis et al. 2026; optical: DSS; infrared: NASA/WISE/JPL-Caltech/UCLA; ultraviolet: NASA/Swift"
    },
    "rank": 22,
    "edition": "Evening Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Chinese astronomers record the 'guest star' of 1054, the Crab Nebula supernova",
        "excerpt": "Your servant considers that, since the 5th month of last year [when] the baleful star appeared, a full year has passed and until now its brilliance has not faded [lit. 'retreated']. This is what Gu Yong meant by 'its rapid movement, the variations in the length of its flaming rays, and the [asterisms] on which it has trespassed successively,' as a censorious anomaly it is greatly to be feared.",
        "source": "Zhao Bian, memorial to Emperor Renzong, 2nd year of the Zhihe reign period [1055 CE], preserved in the Lidai mingchen zouyi (歷代名臣奏議, compiled 1414); trans. D. W. Pankenier, 'Notes on Translations of the East Asian Records Relating to the Supernova of AD 1054,' Journal of Astronomical History and Heritage 9(1), 2006 — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Chinese_report_of_guest_star_identified_as_the_supernova_of_1054_(SN_1054)_in_the_Lidai_mingchen_zouyi_(%E5%8E%86%E4%BB%A3%E5%90%8D%E8%87%A3%E5%A5%8F%E8%AE%AE).jpg",
        "image": {
          "src": "/covers/sibling-supernova-remnants-fermi--a0.png",
          "alt": "Page from the 1414 Lidai mingchen zouyi reproducing Song-dynasty official Zhao Bian's 1055 report on the 'guest star' of 1054, the supernova that created the Crab Nebula",
          "credit": "Lidai mingchen zouyi (1414) / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Tycho Brahe sights the 'new star' of 1572 in Cassiopeia",
        "excerpt": "On the evening of the 11th November 1572, Tycho Brahe had spent some time in the laboratory, and was returning to the house for supper, when he happened to throw his eyes up to the sky, and was startled by perceiving an exceedingly bright star in the constellation of Cassiopea, near the zenith, and in a place which he was well aware had not before been occupied by any star. Doubtful whether he was to believe his own eyes, he turned round to some servants who accompanied him and asked whether they saw the star; and though they answered in the affirmative, he called out to some peasants who happened to be driving by, and asked the same question from them. When they also answered that they saw a very bright star in the place he indicated, Tycho could no longer doubt his senses, so he at once prepared to determine the position of the new star.",
        "source": "J. L. E. Dreyer, Tycho Brahe: A Picture of Scientific Life and Work in the Sixteenth Century (Edinburgh, 1890), Internet Archive",
        "href": "https://archive.org/details/tychobrahepictur00dreyrich",
        "image": {
          "src": "/covers/sibling-supernova-remnants-fermi--a1.png",
          "alt": "Engraved portrait of the Danish astronomer Tycho Brahe, who recorded and measured the supernova of 1572",
          "credit": "Jacques de Gheyn II / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Homeric Hymn 33, 'To the Dioscuri' (Castor and Pollux)",
        "excerpt": "Bright-eyed Muses, tell of the Tyndaridae, the Sons of Zeus, glorious children of neat-ankled Leda, Castor the tamer of horses, and blameless Polydeuces. When Leda had lain with the dark-clouded Son of Cronos, she bare them beneath the peak of the great hill Taygetus, —children who are deliverers of men on earth and of swift-going ships when stormy gales rage over the ruthless sea. Then the shipmen call upon the sons of great Zeus with vows of white lambs, going to the forepart of the prow; but the strong wind and the waves of the sea lay the ship under water, until suddenly these two are seen darting through the air on tawny wings. Forthwith they allay the blasts of the cruel winds and still the waves upon the surface of the white sea: fair signs are they and deliverance from toil. And when the shipmen see them they are glad and have rest from their pain and labour. Hail, Tyndaridae, riders upon swift horses! Now I will remember you and another song also.",
        "source": "Homeric Hymns, Hymn 33 'To the Dioscuri,' trans. Hugh G. Evelyn-White, The Homeric Hymns and Homerica (Loeb Classical Library, 1914), Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=urn:cts:greekLit:tlg0013.tlg033.perseus-eng1:33",
        "image": {
          "src": "/covers/sibling-supernova-remnants-fermi--a2.png",
          "alt": "Attic red-figure hydria by the Meidias Painter, c. 420 BC, showing the twins Castor and Pollux (the Dioscuri)",
          "credit": "Meidias Painter, British Museum / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, Adonais: An Elegy on the Death of John Keats, 1821",
        "excerpt": "The splendours of the firmament of time / May be eclipsed, but are extinguished not; / Like stars to their appointed height they climb, / And death is a low mist which cannot blot / The brightness it may veil. When lofty thought / Lifts a young heart above its mortal lair, / And love and life contend in it for what / Shall be its earthly doom, the dead live there, / And move like winds of light on dark and stormy air.",
        "source": "Percy Bysshe Shelley, Adonais: An Elegy on the Death of John Keats, stanza XLIV (1821), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/10119/10119-h/10119-h.htm",
        "image": {
          "src": "/covers/sibling-supernova-remnants-fermi--a3.png",
          "alt": "1819 portrait of the poet Percy Bysshe Shelley, author of Adonais",
          "credit": "Amelia Curran / National Portrait Gallery / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, The Planets, Op. 32, 1914–1916",
        "excerpt": "Composed on the eve of the First World War, Holst's seven-movement orchestral suite assigns each planet a character: 'Mars, the Bringer of War' builds to a mechanized, explosive climax, while 'Saturn, the Bringer of Old Age' unfolds as a slow, tolling meditation on decline and cosmic time. Scored for enormous forces and infused with astrology rather than astronomy, the suite became the template for a century of orchestral and film music evoking the violence and vastness of the sky.",
        "source": "Gustav Holst, The Planets, Op. 32 (1914–1916), full orchestral score, IMSLP",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)",
        "image": {
          "src": "/covers/sibling-supernova-remnants-fermi--a4.png",
          "alt": "Gustav Holst, composer of The Planets, photographed by Herbert Lambert, c. 1921",
          "credit": "Herbert Lambert / National Portrait Gallery / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The Dioscuri of Monte Cavallo (the 'Horse Tamers'), ancient Roman marble copies of Greek originals, Quirinal Hill, Rome",
        "excerpt": "Two colossal marble youths, each straining to master a rearing horse, have stood on Rome's highest hill since antiquity — Roman-era copies of lost Greek bronzes, long identified as Castor and Pollux, the divine twins of Gemini. Reset around a fountain and obelisk under Pope Pius VI in the 18th century, the pair still frame the entrance to the Quirinal Palace. Their mirrored pose, one twin echoing the other on either side of the gate, made them a standard Western image of paired, inseparable siblings.",
        "source": "Statues of the Dioscuri ('Horse Tamers'), Piazza del Quirinale, Rome (ancient marble, restored 16th–18th c.) — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Rome,_Italy_(2025)_-_027.jpg",
        "image": {
          "src": "/covers/sibling-supernova-remnants-fermi--a5.png",
          "alt": "The colossal marble statues of Castor and Pollux (the Dioscuri) taming horses, at the Fontana dei Dioscuri, Quirinal Hill, Rome",
          "credit": "Another Believer / Wikimedia Commons (CC BY-SA 4.0)"
        }
      }
    ]
  },
  {
    "slug": "nicaragua-ortega-ends-elections",
    "headline": "Nicaragua's Ortega says no elections anytime soon, moving to extend his 20-year rule",
    "overview": "President Daniel Ortega said Nicaragua will not hold elections in the foreseeable future, effectively cancelling a vote scheduled for November 2027 and cementing nearly two decades in power. The 80-year-old, who rules alongside his wife and co-president Rosario Murillo, framed the move as blocking a US-backed opposition. Washington, which does not recognise Ortega's presidency, urged other nations to isolate his government.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxNeWZuel9VUDV4Mk8zREJQSHJqWDdKMUhaVHdIclRUaHp1M0o2dmpYNnYzRzhCWXlzNkJXREFVOENxcEF2Q3dIQVRndlpFN3RaWXJKcGU2cHBvV05melRZR0JQczRtX0diVUNhRWxwWDROYlRnUHhnZFRTN2NkTjg3eDdxcUpJRTJYVVJ4X0w2TmZvM0NQMl9ab3h3Wk1ZcG9uMUxCNTNzcGo5aUt1VEZTeFdB?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQeF9QLWFINjhzOURra0RyaFJkYW1RcGtWSWpWT1hrZ05HWEh6V0lkeS1qejBmT1RfVndkWHBjeUR2cGdoYW9oSENncXRLRkhPcktxN1hGdGJfdmhvNXNsVDBiMURpNF9tUUI2WDctN1BBNzZBLS1wX0NobG1ybHk1YWNtQ1BrTnJhU1hzY3p5WHpjRm5xMjIzOEVQRmxxckE3Wk1RWUN3b2NKdjh0Qldteg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/nicaragua-ortega-ends-elections.png",
      "alt": "Nicaraguan President Daniel Ortega speaking at a public event in 2024",
      "credit": "Wikimedia Commons"
    },
    "rank": 23,
    "edition": "Evening Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Julius Caesar made dictator for life, 44 BC",
        "excerpt": "For he not only obtained excessive honours, such as the consulship every year, the dictatorship for life, and the censorship, but also the title of emperor, and the surname of Father of his country, besides having his statue amongst the kings, and a lofty couch in the theatre. ... There were, indeed, no honours which he did not either assume himself, or grant to others, at his will and pleasure.",
        "source": "Suetonius, The Lives of the Twelve Caesars (Thomson & Forester translation), \"Julius Caesar\" LXXVI, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Lives_of_the_Twelve_Caesars/Julius_Caesar",
        "image": {
          "src": "/covers/nicaragua-ortega-ends-elections--a0.png",
          "alt": "The Tusculum portrait, a marble bust of Julius Caesar thought to be made during his lifetime",
          "credit": "Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Cromwell dissolves the Rump Parliament, 20 April 1653",
        "excerpt": "It is high time for me to put an end to your sitting in this place, which you have dishonoured by your contempt of all virtue, and defiled by your practice of every vice... Your country therefore calls upon me to cleanse this Augean stable, by putting a final period to your iniquitous proceedings in this House... I command ye therefore, upon the peril of your lives, to depart immediately out of this place; go, get you out! ... Take away that shining bauble there, and lock up the doors. In the name of God, go!",
        "source": "Oliver Cromwell, speech dissolving the Long (Rump) Parliament, 20 April 1653, Wikisource",
        "href": "https://en.wikisource.org/wiki/Dissolution_of_the_Long_Parliament",
        "image": {
          "src": "/covers/nicaragua-ortega-ends-elections--a1.png",
          "alt": "Portrait miniature of Oliver Cromwell by Samuel Cooper",
          "credit": "Samuel Cooper / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Casca describes Caesar refusing the crown thrice, Shakespeare's Julius Caesar (Act I, Scene II), 1599",
        "excerpt": "Why, there was a crown offered him: and being offered him, he put it by with the back of his hand, thus; and then the people fell a-shouting. ... Was the crown offered him thrice? Casca. Ay, marry, was't, and he put it by thrice, every time gentler than other, and at every putting-by mine honest neighbours shouted. ... I saw Mark Antony offer him a crown;—yet 't was not a crown neither, 't was one of these coronets;—and, as I told you, he put it by once: but, for all that, to my thinking, he would fain have had it.",
        "source": "William Shakespeare, The Tragedy of Julius Caesar, Act I, Scene II (The Warwick Shakespeare edition), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Tragedy_of_Julius_Caesar_(The_Warwick_Shakespeare)/Julius_Caesar",
        "image": {
          "src": "/covers/nicaragua-ortega-ends-elections--a2.png",
          "alt": "Vincenzo Camuccini, The Death of Caesar (c. 1806), depicting the assassination of the would-be king Julius Caesar",
          "credit": "Vincenzo Camuccini / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\", The Examiner, 1818",
        "excerpt": "I met a Traveller from an antique land, Who said, \"Two vast and trunkless legs of stone Stand in the desart. Near them, on the sand, Half sunk, a shattered visage lies, whose frown, And wrinkled lip, and sneer of cold command, Tell that its sculptor well those passions read, Which yet survive, stamped on these lifeless things... And on the pedestal these words appear: \"My name is Ozymandias, King of Kings. Look on my works ye Mighty, and despair!\" No thing beside remains. Round the decay Of that Colossal Wreck, boundless and bare, The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\", first published in The Examiner (London), 11 January 1818, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias",
        "image": {
          "src": "/covers/nicaragua-ortega-ends-elections--a3.png",
          "alt": "The colossal granite bust of Ramesses II ('the Younger Memnon'), the Egyptian statue in the British Museum that inspired Shelley's poem",
          "credit": "British Museum / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Coronation of Napoleon (Le Sacre de Napoléon), 1805-1807",
        "excerpt": "A vast canvas nearly ten metres wide shows Napoleon Bonaparte, having already crowned himself Emperor, raising a jewelled diadem over the kneeling Empress Joséphine beneath the vaults of Notre-Dame. Pope Pius VII sits enthroned behind him as a mere witness rather than the one bestowing the crown, a deliberate reversal that broadcasts where ultimate authority now lay. Nearly two hundred courtiers, clergy and generals fill the frame, monumentalizing the moment a former revolutionary general made his own power permanent and hereditary.",
        "source": "Jacques-Louis David, Le Sacre de Napoléon, 1805-1807, oil on canvas, Musée du Louvre, Paris",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010065720",
        "image": {
          "src": "/covers/nicaragua-ortega-ends-elections--a4.png",
          "alt": "Jacques-Louis David's painting The Coronation of Napoleon, showing Napoleon crowning Josephine after crowning himself in Notre-Dame",
          "credit": "Jacques-Louis David / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Boris Godunov, opera, 1868-1872 (rev. 1873)",
        "excerpt": "Mussorgsky's opera follows Boris Godunov, who has seized the Russian throne and rules alone, haunted by the illegitimacy of his power even as he tightens his grip on it. Its coronation scene fills the stage with tolling bells and a chorus hailing the new ruler, a grand public spectacle that masks the ruler's private dread of losing what he has taken. By the opera's close Boris is undone not by an election or a rival's army but by the corrosive weight of holding power he refuses to relinquish.",
        "source": "Modest Mussorgsky, Boris Godunov, opera in four acts (1869/1872 versions), full scores at IMSLP",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)",
        "image": {
          "src": "/covers/nicaragua-ortega-ends-elections--a5.png",
          "alt": "Portrait of composer Modest Mussorgsky, 1870",
          "credit": "Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "iran-war-cost-hegseth-37-billion",
    "headline": "Pentagon chief Hegseth says the US war against Iran has cost $37.5 billion so far",
    "overview": "Defense Secretary Pete Hegseth told the Senate Appropriations Committee on Tuesday that the US war against Iran has cost $37.5 billion so far, as he defended a supplemental funding request to replenish the military. The Pentagon said three more American service members had died, raising the conflict's US death toll to 17, with more than 100 injured since early July. The estimate is up sharply from a $29 billion figure given in May.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxQcGhIUDY1XzFtb1pDNmE1ME9sMjVXRXJPMXBxelpQZlJlcDd5eEIySWxObnlCY1BiR1lNRnVLWEt0M005NTRCcUtWRU5oZmROVmZJMW91aE9nVWNGUmF0V2J0dHZSci1mM2c4NFE4c01pblBucXJfSW5lVWJUeE95VGNjbl9OOFBVQnZsTFBmeDRvMGxIeEpfVWlUbE96SWxXSGNHM1o5aTNzV2c?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOQVJsdVVWc2lUSjJITE9ZTGlTc3lROG83MjZFVm1Bb1R3VndpbWxyUTAtdGpITlFVYzZ6S1g3em4wbGxtS0d4VG1EdjVSYno0S3VYSF9VS01ROE91WF91Wjh6VzFsLUU4Y1VObEZsVGNrVzFLNm9HOTViMVZOR3JnZFEySmZINjBSWEstT3hRUnI1LVpkVXRRRVFVaG40R3lkbmdGX25n?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/iran-war-cost-hegseth-37-billion.png",
      "alt": "Official portrait of Pete Hegseth, U.S. Secretary of Defense, in front of an American flag",
      "credit": "Chad J. McNeeley, Office of the Secretary of Defense / Wikimedia Commons (public domain)"
    },
    "rank": 24,
    "edition": "Evening Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pericles tallies Athens' war chest for the Peloponnesian War, 431 BC",
        "excerpt": "Apart from other sources of income, an average revenue of six hundred talents of silver was drawn from the tribute of the allies; and there were still six thousand talents of coined silver in the Acropolis, out of nine thousand seven hundred that had once been there... This did not include the uncoined gold and silver in public and private offerings, the sacred vessels for the processions and games, the Median spoils, and similar resources to the amount of five hundred talents... Such was their financial position—surely a satisfactory one.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (Crawley translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm",
        "image": {
          "src": "/covers/iran-war-cost-hegseth-37-billion--a0.png",
          "alt": "Roman marble copy of a Greek portrait bust of Pericles, British Museum",
          "credit": "Photo by Bobak Ha'Eri / Wikimedia Commons (CC BY 3.0)"
        }
      },
      {
        "category": "historical",
        "title": "Lincoln asks Congress for 400,000 men and $400,000,000 to fight the Civil War, July 4, 1861",
        "excerpt": "It is now recommended that you give the legal means for making this contest a short and decisive one: that you place at the control of the government for the work at least four hundred thousand men and $400,000,000. That number of men is about one-tenth of those of proper ages within the regions where, apparently, all are willing to engage; and the sum is less than a twenty-third part of the money value owned by the men who seem ready to devote the whole. A debt of $600,000,000 now is a less sum per head than was the debt of our Revolution when we came out of that struggle...",
        "source": "Abraham Lincoln, Message to Congress in Special Session, July 4, 1861, in The Papers and Writings of Abraham Lincoln, Vol. 6, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3253/3253-h/3253-h.htm",
        "image": {
          "src": "/covers/iran-war-cost-hegseth-37-billion--a1.png",
          "alt": "Salt print photographic portrait of Abraham Lincoln, 1861",
          "credit": "Unknown photographer / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Cicero on \"the sinews of war\": money in abundance, Fifth Philippic, 43 BC",
        "excerpt": "What else is that but supplying an enemy with all the arms necessary for civil war: first of all with the sinews of war, money in abundance, of which he is at present destitute; and secondly, with as much cavalry as he pleases?",
        "source": "Cicero, The Fifth Philippic Against Marcus Antonius (C. D. Yonge translation), Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0021:speech=5",
        "image": {
          "src": "/covers/iran-war-cost-hegseth-37-billion--a2.png",
          "alt": "Marble bust of Cicero, Capitoline Museums, Rome",
          "credit": "Photo by Wilfredor / Wikimedia Commons (CC0)"
        }
      },
      {
        "category": "literary",
        "title": "Wilfred Owen, \"Dulce et Decorum Est,\" 1917/1920",
        "excerpt": "Bent double, like old beggars under sacks, / Knock-kneed, coughing like hags, we cursed through sludge, / Till on the haunting flares we turned our backs / And towards our distant rest began to trudge. / Men marched asleep. Many had lost their boots / But limped on, blood-shod... My friend, you would not tell with such high zest / To children ardent for some desperate glory, / The old Lie: Dulce et decorum est / Pro patria mori.",
        "source": "Wilfred Owen, \"Dulce et Decorum Est,\" in Poems (1920, ed. Siegfried Sassoon and Edith Sitwell), Wikisource",
        "href": "https://en.wikisource.org/wiki/Poems_by_Wilfred_Owen/Dulce_et_Decorum_est",
        "image": {
          "src": "/covers/iran-war-cost-hegseth-37-billion--a3.png",
          "alt": "Photographic plate portrait of Wilfred Owen from his 1920 collection Poems",
          "credit": "Unknown photographer, 1920 / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Francisco Goya, \"Bury Them and Keep Quiet\" (Enterrar y callar), Plate 18 of The Disasters of War, c. 1810–1815 (published 1863)",
        "excerpt": "A stark aquatint of villagers standing frozen before a heap of the war dead, their bodies twisted and abandoned in the open ground. Goya offers no battle, no glory—only the unpaid remainder of war: corpses no one has the means or will to bury. It is one of eighty-two plates he etched cataloguing the human toll and the ruin of Spain's Peninsular War, published decades after his death.",
        "source": "Francisco de Goya, Los Desastres de la Guerra, plate 18, Museo Nacional del Prado (1863 first edition), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Prado_-_Los_Desastres_de_la_Guerra_-_No._18_-_Enterrar_y_callar.jpg",
        "image": {
          "src": "/covers/iran-war-cost-hegseth-37-billion--a4.png",
          "alt": "Goya etching \"Enterrar y callar\" (Bury them and keep quiet), showing villagers beside a pile of war dead",
          "credit": "Francisco de Goya, Museo del Prado / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Dmitri Shostakovich, Symphony No. 7 in C major, \"Leningrad,\" Op. 60, 1941",
        "excerpt": "Composed under siege and dedicated \"to the city of Leningrad,\" the symphony's relentless invasion theme in the first movement builds for over ten minutes into a crushing military march, an unmistakable musical ledger of the cost the war was exacting in lives, food, and fuel. Its first performance inside the besieged city in August 1942 was itself a wartime expenditure: starving musicians were pulled from the front and hospital beds to play it, broadcast on loudspeakers toward the German lines.",
        "source": "Dmitri Shostakovich, Symphony No. 7, Op. 60 (\"Leningrad\"), score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.7,_Op.60_(Shostakovich,_Dmitry)",
        "image": {
          "src": "/covers/iran-war-cost-hegseth-37-billion--a5.png",
          "alt": "Portrait photograph of composer Dmitri Shostakovich",
          "credit": "Roger & Renate Rössing, Deutsche Fotothek / Wikimedia Commons (CC BY-SA 3.0 DE)"
        }
      }
    ]
  },
  {
    "slug": "la-library-worlds-largest-popup-book",
    "headline": "Los Angeles Public Library unveils the world's largest pop-up book for its centennial",
    "overview": "The Los Angeles Public Library has unveiled a Guinness-record pop-up book, 'Luceros y Penumbras' (Stars and Shadows), to mark the Central Library's centennial. Conceived by artist Daniel Gonzalez with paper engineer Matthew Reinhart, it measures about 31 by 20 feet when open, stands more than 11 feet tall and weighs over 1,800 pounds, surpassing the previous record. Its two spreads depict a tree over the Los Angeles skyline and the library's facade beside the phrase 'Each person is a library.'",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/daniel-gonzalez-matthew-reinhart-popup-book-los-anglees-library-world-record/"
      },
      {
        "name": "LAist",
        "href": "https://laist.com/news/los-angeles-activities/los-angeles-central-library-giant-pop-up-book-luceros-y-penumbras-daniel-gonzalez"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/la-library-worlds-largest-popup-book.png",
      "alt": "Exterior of the Los Angeles Central Library (Richard J. Riordan Central Library) in downtown Los Angeles, showing its pyramid tower",
      "credit": "MikeJiroch / Wikimedia Commons (CC BY-SA 3.0)"
    },
    "rank": 25,
    "edition": "Evening Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The founding of the Great Library of Alexandria under the Ptolemies, 3rd century BC",
        "excerpt": "It is at all events certain that the libraries of Alexandria were the most important as they were the most celebrated of the ancient world. Under the enlightened rule of the Ptolemies a society of scholars and men of science was attracted to their capital. It seems pretty certain that Ptolemy Soter had already begun to collect books, but it was in the reign of Ptolemy Philadelphus that the libraries were properly organized and established in separate buildings. Ptolemy Philadelphus sent into every part of Greece and Asia to secure the most valuable works, and no exertions or expense were spared in enriching the collections.",
        "source": "\"Libraries,\" Encyclopædia Britannica, 11th edition (1911), Wikisource",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Libraries",
        "image": {
          "src": "/covers/la-library-worlds-largest-popup-book--a0.png",
          "alt": "19th-century artist's imagining of the Great Library of Alexandria, a grand colonnaded hall lined with scrolls and readers",
          "credit": "O. Von Corven, 19th century / Wikimedia Commons (CC BY-SA 4.0)"
        }
      },
      {
        "category": "historical",
        "title": "Opening of the Library of Congress's Thomas Jefferson Building, 1897",
        "excerpt": "Of the splendid and monumental building itself, it may be stated, before entering upon a detailed description—and stated, too, with hardly any fear of contradiction—that it is the most perfectly adapted for the convenient use and storage of books of any large library in the world. It is the largest, the costliest, and the safest. It is absolutely fire-proof, not through any ingenious arrangement or contrivance, but by the very quality of the materials of which it is built—granite, brick, marble, iron, steel, and terra-cotta.",
        "source": "Herbert Small, Handbook of the New Library of Congress in Washington (1897), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/59821/59821-h/59821-h.htm",
        "image": {
          "src": "/covers/la-library-worlds-largest-popup-book--a1.png",
          "alt": "The domed Main Reading Room of the Library of Congress's Thomas Jefferson Building",
          "credit": "Smash the Iron Cage / Wikimedia Commons (CC BY-SA 4.0)"
        }
      },
      {
        "category": "literary",
        "title": "Dante Alighieri, Paradiso, Canto XXXIII (the universe bound in one volume), c. 1320",
        "excerpt": "I saw that in its depth far down is lying Bound up with love together in one volume, What through the universe in leaves is scattered; Substance, and accident, and their operations, All interfused together in such wise That what I speak of is one simple light.",
        "source": "Dante Alighieri, Paradiso, Canto XXXIII, trans. Henry Wadsworth Longfellow, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1003/1003-h/1003-h.htm",
        "image": {
          "src": "/covers/la-library-worlds-largest-popup-book--a2.png",
          "alt": "Gustave Doré's engraving of the Empyrean, the celestial rose of light, from Dante's Paradiso",
          "credit": "Gustave Doré, 19th century / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "John Milton, Areopagitica, 1644",
        "excerpt": "And yet, on the other hand, unless wariness be used, as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye. Many a man lives a burden to the earth; but a good book is the precious life-blood of a master spirit, embalmed and treasured up on purpose to a life beyond life.",
        "source": "John Milton, Areopagitica (1644), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm",
        "image": {
          "src": "/covers/la-library-worlds-largest-popup-book--a3.png",
          "alt": "Title page of the 1644 first edition of John Milton's Areopagitica",
          "credit": "John Milton, 1644 / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Arcimboldo, The Librarian, c. 1566",
        "excerpt": "A humanist scholar's entire body is composed of books: his torso stacked volumes, his cloak an open tome, a feather duster for hair. Arcimboldo's witty composite portrait, likely of the Habsburg historian Wolfgang Lazius, turns the library itself into a body and a mind, honoring the wonder and comic excess of collected knowledge.",
        "source": "Giuseppe Arcimboldo, The Librarian, oil on canvas, c. 1566, Skokloster Castle, Sweden",
        "href": "https://commons.wikimedia.org/wiki/File:Guiseppe_Arcimboldo,_copy%3F,_after%3F_-_The_Librarian_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/la-library-worlds-largest-popup-book--a4.png",
          "alt": "Giuseppe Arcimboldo's painting 'The Librarian,' a portrait composed entirely of books",
          "credit": "Giuseppe Arcimboldo (after) / Google Art Project via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Peter Apian, Astronomicum Caesareum (movable volvelle book), 1540",
        "excerpt": "Printed in Ingolstadt for Emperor Charles V, this lavishly hand-colored astronomical treatise is built almost entirely from paper mechanisms: more than twenty rotating volvelles, layered discs and strings that let a reader spin the heavens into motion on the page. It stands as one of the most spectacular feats of Renaissance paper engineering, an ancestor of the movable and pop-up book.",
        "source": "Peter Apian, Astronomicum Caesareum (Ingolstadt, 1540), volvelle page, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/Category:Astronomicum_Caesareum",
        "image": {
          "src": "/covers/la-library-worlds-largest-popup-book--a5.png",
          "alt": "A hand-colored rotating paper volvelle depicting the zodiac from Peter Apian's Astronomicum Caesareum, 1540",
          "credit": "Petrus Apianus, 1540 / Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "omega-swatch-gold-moonswatch-1969",
    "headline": "Omega and Swatch release a gold MoonSwatch in a limited edition of 1,969 priced at $570",
    "overview": "Omega and Swatch have launched the Mission to the Moon 1969, a MoonSwatch containing about 11 grams of Omega's 18-carat Moonshine gold in its dial, hands, crown and pushers. Limited to 1,969 pieces marking the year of the first Moon landing, it is priced at $570 - the value of that gold on 21 July 1969 - even though the metal is worth nearly twice as much today. Omega melted down period spare parts to obtain the gold.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/21/omega-swatch-gold-moonswatch-limited-edition-1969/"
      },
      {
        "name": "SJX Watches",
        "href": "https://watchesbysjx.com/2026/07/swatch-moonswatch-mission-to-the-moon-1969.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/omega-swatch-gold-moonswatch-1969.png",
      "alt": "Buzz Aldrin on the lunar surface during the Apollo 11 moonwalk, July 1969",
      "credit": "Neil Armstrong / NASA (public domain)"
    },
    "rank": 26,
    "edition": "Evening Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Croesus of Lydia Melts Down Gold for Delphi, c. 550 BCE",
        "excerpt": "And when he had finished the sacrifice, he melted down a vast quantity of gold, and of it he wrought half-plinths making them six palms in length and three in breadth, and in height one palm; and their number was one hundred and seventeen. Of these four were of pure gold weighing two talents and a half each, and others of gold alloyed with silver weighing two talents. And he caused to be made also an image of a lion of pure gold weighing ten talents; which lion, when the temple of Delphi was being burnt down, fell from off the half-plinths, for upon these it was set, and is placed now in the treasury of the Corinthians, weighing six talents and a half, for three talents and a half were melted away from it.",
        "source": "Herodotus, The Histories, Book 1 (G. C. Macaulay translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2707/2707-h/2707-h.htm",
        "image": {
          "src": "/covers/omega-swatch-gold-moonswatch-1969--a0.png",
          "alt": "Gold stater coin of King Croesus of Lydia, c. 550 BC, British Museum",
          "credit": "BabelStone / British Museum / Wikimedia Commons (CC0)"
        }
      },
      {
        "category": "historical",
        "title": "Niels Bohr's Institute Dissolves Nobel Gold Medals to Foil the Nazis, 1940",
        "excerpt": "When Nazi forces occupied Copenhagen in April 1940, the Hungarian chemist George de Hevesy dissolved the engraved gold Nobel medals of Max von Laue and James Franck in a jar of aqua regia at Niels Bohr's Institute, turning contraband gold into an unremarkable orange liquid that sat untouched on a laboratory shelf while German soldiers searched the building. After the war, Hevesy precipitated the gold back out of solution and sent it to the Royal Swedish Academy of Sciences, which recast it into medals and presented them to both laureates in 1952. The value that had been hidden in plain sight, as liquid, was made solid and ceremonial again.",
        "source": "\"The Nobel Medals and the Medal for the Prize in Economic Sciences,\" NobelPrize.org (The Nobel Foundation)",
        "href": "https://www.nobelprize.org/prizes/about/the-nobel-medals-and-the-medal-for-the-prize-in-economic-sciences/",
        "image": {
          "src": "/covers/omega-swatch-gold-moonswatch-1969--a1.png",
          "alt": "Design of the Nobel Prize gold medal",
          "credit": "Gusme / Wikimedia Commons (CC BY-SA 3.0 / GFDL)"
        }
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book XI: King Midas and the Golden Touch, c. 8 CE",
        "excerpt": "He, destined to make a foolish use of the favour, says, ‘Cause that whatever I shall touch with my body shall be turned into yellow gold.’ Liber assents to his wish, and grants him the hurtful favour, and is grieved that he has not asked for something better. The Berecynthian hero departs joyful, and rejoices in his own misfortune, and tries the truth of his promise by touching everything. And, hardly believing himself, he pulls down a twig from a holm-oak, growing on a bough not lofty; the twig becomes gold. He takes up a stone from the ground; the stone, too, turns pale with gold.",
        "source": "Ovid, Metamorphoses, Book XI (Henry T. Riley translation, 1851), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm",
        "image": {
          "src": "/covers/omega-swatch-gold-moonswatch-1969--a2.png",
          "alt": "Nicolas Poussin, Midas and Bacchus, oil on canvas, c. 1624–30, showing King Midas kneeling before Bacchus",
          "credit": "Nicolas Poussin / Alte Pinakothek, Munich / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "William Shakespeare, The Merchant of Venice, Act V, Scene 1 (Lorenzo's Moonlight Speech), c. 1596–98",
        "excerpt": "How sweet the moonlight sleeps upon this bank! Here will we sit, and let the sounds of music Creep in our ears; soft stillness and the night Become the touches of sweet harmony. Sit, Jessica: look, how the floor of heaven Is thick inlaid with patines of bright gold: There's not the smallest orb which thou behold'st But in his motion like an angel sings, Still quiring to the young-eyed cherubins; Such harmony is in immortal souls; But, whilst this muddy vesture of decay Doth grossly close it in, we cannot hear it.",
        "source": "William Shakespeare, The Merchant of Venice, Act V, Scene 1 (1923 Yale Shakespeare edition), Wikisource",
        "href": "https://en.wikisource.org/wiki/Merchant_of_Venice_(1923)_Yale/Text/Act_V",
        "image": {
          "src": "/covers/omega-swatch-gold-moonswatch-1969--a3.png",
          "alt": "The Moon Shines Bright (1859), a painting illustrating the moonlit garden scene from The Merchant of Venice",
          "credit": "John Edmund Buckley / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Piano Sonata No. 14 in C-sharp minor, \"Moonlight,\" Op. 27 No. 2, 1801",
        "excerpt": "Composed in 1801 and dedicated to his pupil Countess Giulietta Guicciardi, the sonata opens not with a bright allegro but with a slow, hushed Adagio sostenuto of rippling triplets in C-sharp minor, a nocturnal calm that gave the piece its enduring nickname. The name \"Moonlight\" was coined only after Beethoven's death, when critic Ludwig Rellstab likened the first movement to moonlight shimmering on Lake Lucerne. The sonata moves from that dim, silvery opening through a light second movement to a stormy, virtuosic finale, tracing a single work's passage from moonlit stillness to fire.",
        "source": "Ludwig van Beethoven, Piano Sonata No. 14, Op. 27 No. 2 (\"Moonlight\"), 1801, scores at IMSLP",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.14,_Op.27_No.2_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/omega-swatch-gold-moonswatch-1969--a4.png",
          "alt": "Portrait of Ludwig van Beethoven by Joseph Karl Stieler, 1820",
          "credit": "Joseph Karl Stieler / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, The Starry Night, 1889",
        "excerpt": "Painted from memory and imagination at the Saint-Paul-de-Mausole asylum in Saint-Rémy in June 1889, the canvas shows a crescent moon and swirling stars blazing gold over a sleeping village, the sky rendered in thick, churning strokes of ultramarine and yellow. A dark cypress tree spirals upward in the foreground, linking the quiet earth to the turbulent, luminous heavens above. It has become the most reproduced image of night, gold light, and sky in Western art.",
        "source": "Vincent van Gogh, The Starry Night, oil on canvas, 1889, Museum of Modern Art, New York",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/omega-swatch-gold-moonswatch-1969--a5.png",
          "alt": "Vincent van Gogh, The Starry Night, 1889, oil on canvas",
          "credit": "Vincent van Gogh / Museum of Modern Art / Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "trump-50-percent-tariffs-canada",
    "headline": "Trump imposes 50% tariffs on Canadian goods over autos, alcohol and dairy disputes",
    "overview": "President Donald Trump on Monday imposed 50% tariffs on most Canadian goods, invoking Section 338 of the Tariff Act of 1930 and accusing Canada of discriminating against American automobiles, alcohol and dairy products. The duties, which follow Canadian boycotts of US alcohol and dairy, are set to take effect in 30 days. Prime Minister Mark Carney said his government believes in 'free and fair trade' and vowed to intensify negotiations with Washington.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNTVJzOTFERXBSclRBTElQM0l6VzlJV092REdRYkdyeFJRZVgwVzBhSEQ3NFItdWh6SGxCZnp1TFFqQzFyZnFzd21jSlpReEZDZ2lOVm51cV9GalNodHFyb0FsUC1kVy0tMFZUQ19hU2x6RDhYTHBWVDZlOXRUOWhXV2NQek1ONzVYblNGM3lIUDdVUnBnaEEzNmxMalV5NVdGX2c4UkJ3?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cg4dzq3x3e1o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/trump-50-percent-tariffs-canada.png",
      "alt": "U.S. Customs and Border Protection officers on duty at the Detroit-Windsor port of entry on the U.S.-Canada border",
      "credit": "U.S. Customs and Border Protection / Wikimedia Commons"
    },
    "lead": true,
    "rank": 27,
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Megarian Decree, c. 432 BC (Thucydides)",
        "excerpt": "There were many who came forward and made their several accusations; among them the Megarians, in a long list of grievances, called special attention to the fact of their exclusion from the ports of the Athenian empire and the market of Athens, in defiance of the treaty.",
        "source": "Thucydides, History of the Peloponnesian War (Crawley translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm",
        "image": {
          "src": "/covers/trump-50-percent-tariffs-canada--a0.png",
          "alt": "Marble bust of the Greek historian Thucydides",
          "credit": "Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Napoleon's Berlin Decree and the Continental System, 1806",
        "excerpt": "That this monstrous abuse of the right of blockade has no other aim than to prevent communication among the nations and to raise the commerce and the industry of England upon the ruins of that of the continent... That it is a natural right to oppose such arms against an enemy as he makes use of, and to fight in the same way that he fights... We have consequently decreed and do decree that which follows: 1. The British Isles are declared to be in a state of blockade. 2. All commerce and all correspondence with the British Isles are forbidden... 5. Trade in English goods is prohibited, and all goods belonging to England or coming from her factories or her colonies are declared a lawful prize.",
        "source": "Berlin Decree (1806), Wikisource",
        "href": "https://en.wikisource.org/wiki/Berlin_Decree",
        "image": {
          "src": "/covers/trump-50-percent-tariffs-canada--a1.png",
          "alt": "Jacques-Louis David's 1812 portrait of the Emperor Napoleon in his study at the Tuileries",
          "credit": "Jacques-Louis David / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Aristophanes, The Acharnians (425 BC)",
        "excerpt": "But now some young drunkards go to Megara and carry off the courtesan Simaetha; the Megarians, hurt to the quick, run off in turn with two harlots of the house of Aspasia; and so for three gay women Greece is set ablaze. Then Pericles, aflame with ire on his Olympian height, let loose the lightning, caused the thunder to roll, upset Greece and passed an edict, which ran like the song, \"That the Megarians be banished both from our land and from our markets and from the sea and from the continent.\"",
        "source": "Aristophanes, The Acharnians, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3012/3012-h/3012-h.htm",
        "image": {
          "src": "/covers/trump-50-percent-tariffs-canada--a2.png",
          "alt": "Marble bust of the comic playwright Aristophanes",
          "credit": "Wikimedia Commons (CC BY-SA 4.0)"
        }
      },
      {
        "category": "literary",
        "title": "Frederic Bastiat, \"The Candlemakers' Petition\" (1845)",
        "excerpt": "We are suffering from the intolerable competition of a foreign rival, placed, it would seem, in a condition so far superior to ours for the production of light, that he absolutely inundates our national market with it at a price fabulously reduced... This rival, who is no other than the Sun, wages war to the knife against us... What we pray for is, that it may please you to pass a law ordering the shutting up of all windows, sky-lights, dormer-windows, outside and inside shutters, curtains, blinds, bull's-eyes; in a word, of all openings, holes, chinks, clefts, and fissures, by or through which the light of the sun has been in use to enter houses.",
        "source": "Frederic Bastiat, Economic Sophisms (Stirling translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/44145/44145-h/44145-h.htm",
        "image": {
          "src": "/covers/trump-50-percent-tariffs-canada--a3.png",
          "alt": "1848 engraved portrait of the French economist Frederic Bastiat",
          "credit": "Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Marinus van Reymerswaele, The Tax Collectors (c. 1540s)",
        "excerpt": "Marinus van Reymerswaele's biting sixteenth-century panel shows two customs-and-duty officials hunched over their ledgers, one greedily tallying the levies owed while the other records the take. Their exaggerated, grasping faces turn the machinery of tariffs and excise into a grotesque satire on the collection of trade duties. It is an early Netherlandish mirror of the endless quarrels over who owes what on the goods that cross a border.",
        "source": "Marinus van Reymerswaele, The Tax Collectors - Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Marinus_van_Reymerswale_-_The_Tax_Collectors_-_WGA19332.jpg",
        "image": {
          "src": "/covers/trump-50-percent-tariffs-canada--a4.png",
          "alt": "Renaissance painting of two tax collectors surrounded by ledgers and coins",
          "credit": "Marinus van Reymerswaele / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "C. J. Taylor, \"The Open Sesame\" - a Puck cartoon on the McKinley high tariff",
        "excerpt": "In this Gilded-Age Puck cartoon by C. J. Taylor, the protective tariff is pictured as a robber baron's cave: the high McKinley duties throw open the door so favored monopolists can plunder the American consumer, all under the banner of protecting home industry. It skewers economic nationalism as a racket dressed in patriotic language - the same argument that recurs whenever a government raises walls of duties against foreign goods.",
        "source": "C. J. Taylor, Puck (Library of Congress) - Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_open_sesame_-_C.J._Taylor_cartoon_-_McKinley_High_Tariff_Robber_Baron_Cave.jpg",
        "image": {
          "src": "/covers/trump-50-percent-tariffs-canada--a5.png",
          "alt": "Political cartoon depicting the high tariff as a robber baron's cave plundering consumers",
          "credit": "C. J. Taylor, Puck / Library of Congress via Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "china-ai-model-chip-export-controls",
    "headline": "China weighs export controls on advanced AI models and chips, Financial Times reports",
    "overview": "China is considering tighter export controls on its most advanced artificial-intelligence models and semiconductors, the Financial Times reported Tuesday, citing people familiar with the deliberations. Regulators led by the Ministry of Commerce have consulted leading domestic AI and chipmaking firms on how to prevent cutting-edge technology and start-ups from being acquired by the West. The move mirrors US restrictions and signals that Beijing now treats frontier AI as a strategic national asset.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxQMnQtRVFFNl9xQzJhYWtqMjlrVEx5NW9FYmp4UzM3QlNHdjYwaDhfT3BTdkdaX0QwUHF2X0Z3a3pEMnl0b0RqN0VVMFZ2NndBT1YtWDhjbE85dGZKT2lpWmtFYTJaY1E5UHljUmVvcXhvV0FTTUFyck5GZHBYRU1Nc1hTNDg4aUxoeFFNZmhKOVVKcDNLQVo3SFBYcnZ0VFFhVlBhNndHOWtuMVZpaDhmVE9JY051NmVzQUx4QUln?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://finance.yahoo.com/technology/ai/articles/china-considers-tighter-export-controls-041139427.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/china-ai-model-chip-export-controls.png",
      "alt": "Rows of servers inside a data center",
      "credit": "Photo by Carl Lender, CC BY 2.0, via Wikimedia Commons"
    },
    "rank": 28,
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The guarded secret of Greek fire",
        "excerpt": "The readily combustible rosin is collected from the pine and other similar evergreen trees and mixed with sulphur. Then it is introduced into reed-pipes and blown by the man using it with a strong continuous breath and at the other end fire is applied to it and it bursts into flame and falls like a streak of lightning on the faces of the men opposite.",
        "source": "Anna Komnene, The Alexiad, Book XIII (trans. Elizabeth A. S. Dawes, 1928)",
        "href": "https://en.wikisource.org/wiki/The_Alexiad/Book_XIII",
        "image": {
          "src": "/covers/china-ai-model-chip-export-controls--a0.png",
          "alt": "Byzantine sailors direct Greek fire from a siphon against an enemy ship in a medieval manuscript miniature",
          "credit": "Madrid Skylitzes, 12th century, Biblioteca Nacional de Espana. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Britain's ban on exporting its machinery",
        "excerpt": "...even supposing the certainty, that their own machinery in time will equal ours, is to surrender in the mean time the temporary advantage which we possess, and to yield to the foreigner that start which our own producers have for the moment got of him in the market.",
        "source": "House of Commons debate, \"Exportation of Machinery\" (Hansard, 16 February 1841), James Emerson Tennent MP",
        "href": "https://api.parliament.uk/historic-hansard/commons/1841/feb/16/exportation-of-machinery",
        "image": {
          "src": "/covers/china-ai-model-chip-export-controls--a1.png",
          "alt": "Rows of power looms operated by workers in a 19th-century cotton mill, from an 1835 engraving",
          "credit": "Engraving by J. Tingle after T. Allom, 1835 (Baines, History of the Cotton Manufacture). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Prometheus steals the fire of the gods",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, Prometheus Bound (trans. Theodore Alois Buckley)",
        "href": "https://www.gutenberg.org/ebooks/27458",
        "image": {
          "src": "/covers/china-ai-model-chip-export-controls--a2.png",
          "alt": "Prometheus kneeling to bring the stolen fire of the gods to mankind, in Heinrich Fueger's 1817 painting",
          "credit": "Heinrich Fueger, 1817. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Frankenstein and the danger of forbidden knowledge",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818)",
        "href": "https://www.gutenberg.org/ebooks/84",
        "image": {
          "src": "/covers/china-ai-model-chip-export-controls--a3.png",
          "alt": "Victor Frankenstein recoiling from his newly animated creature, frontispiece of the 1831 edition",
          "credit": "Theodor von Holst, engraved by William Chevalier, 1831 frontispiece. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wright of Derby's alchemist and his hidden craft",
        "excerpt": "Wright paints the alchemist alone in a vaulted, cathedral-like chamber, kneeling before a retort that erupts with an unearthly glow as he stumbles upon phosphorus. The secret is wrested from nature by a lone adept who works in darkness, guarding a transformative knowledge he dares not share. The pursuit of hidden technical power is made to look like a sacred and jealously kept mystery.",
        "source": "Joseph Wright of Derby, The Alchymist, in Search of the Philosopher's Stone (exhibited 1771), Derby Museum and Art Gallery",
        "href": "https://www.revolutionaryplayers.org.uk/the-alchymist-in-search-of-the-philosophers-stone-exhibited-1771/",
        "image": {
          "src": "/covers/china-ai-model-chip-export-controls--a4.png",
          "alt": "An alchemist kneeling before a glowing flask in a darkened vaulted chamber, by Joseph Wright of Derby",
          "credit": "Joseph Wright of Derby, 1771, Derby Museum and Art Gallery. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Rhinegold, a coveted source of power",
        "excerpt": "In the opening scene of Wagner's Das Rheingold, three river-maidens guard a hoard of gold that grants its master limitless power, so long as its secret is kept. The spurned dwarf Alberich seizes the treasure and forges it into a ring, and the whole cycle turns on who controls that coveted source of strength. Wagner's shimmering, restless music dramatizes a strategic asset that everyone schemes to possess and no one can safely surrender.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (full score, 1873), IMSLP",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/china-ai-model-chip-export-controls--a5.png",
          "alt": "The Rhinemaidens swimming around the rock where the Rhinegold lay, illustrated by Arthur Rackham",
          "credit": "Arthur Rackham, 1910. Public domain, via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "houthis-red-sea-saudi-maritime-embargo",
    "headline": "Yemen's Houthis declare maritime embargo, threaten to block Saudi shipping at Red Sea gateway",
    "overview": "Yemen's Iranian-backed Houthi movement announced a 'maritime embargo' on Saudi Arabia, saying it would block Saudi-linked ships from passing through the Bab el-Mandeb strait at the southern gateway to the Red Sea. The declaration threatens to widen disruption to one of the world's busiest shipping corridors, already strained by attacks on commercial vessels. Saudi authorities did not immediately respond to the threat.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOeUxVTTdGN3I2VHpkcGVLZFAzeXZlSjh3TmVGaXpPVjlsdG5iMEtmR1hscHVmbnlNQjBVYUVoTFI1c2Q2VS15SDVfSTVPb3FjM1FFMVREY0NKdk1hQ2Y2SGhkN3hvN2p2NHk1MTd0RU1HbDJvM3ZDTGhvQmpBNzBLQ1hpNk1mNjhpQmNxUmMtMnJ1Vk45N25lN3NBUQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cm2gmddx1ldo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/houthis-red-sea-saudi-maritime-embargo.png",
      "alt": "A cargo ship passing through the Red Sea shipping lane",
      "credit": "U.S. Navy photo by Mass Communication Specialist 2nd Class Jason R. Zalasky, via Wikimedia Commons (public domain)"
    },
    "rank": 29,
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Megarian Decree: Athens shuts its harbours (5th century BC)",
        "excerpt": "Among them the Megarians, in a long list of grievances, called special attention to the fact of their exclusion from the ports of the Athenian empire and the market of Athens, in defiance of the treaty.",
        "source": "Thucydides, History of the Peloponnesian War, Book I.67 (Crawley translation)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1",
        "image": {
          "src": "/covers/houthis-red-sea-saudi-maritime-embargo--a0.png",
          "alt": "Ancient bust of the historian Thucydides",
          "credit": "Photo by user:shakko, Pushkin Museum, via Wikimedia Commons (CC BY-SA 3.0)"
        }
      },
      {
        "category": "historical",
        "title": "Lincoln proclaims the Union blockade of the Confederacy (1861)",
        "excerpt": "I have further deemed it advisable to set on foot a blockade of the ports within the States aforesaid... For this purpose a competent force will be posted so as to prevent entrance and exit of vessels from the ports aforesaid.",
        "source": "Abraham Lincoln, Proclamation 81 — Declaring a Blockade of Ports in Rebellious States, April 19, 1861",
        "href": "https://www.presidency.ucsb.edu/documents/proclamation-81-declaring-blockade-ports-rebellious-states",
        "image": {
          "src": "/covers/houthis-red-sea-saudi-maritime-embargo--a1.png",
          "alt": "1861 'Scott's Great Snake' cartoon map illustrating the Anaconda Plan to blockade the Confederacy",
          "credit": "J. B. Elliott, 1861, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Scylla and Charybdis: the deadly narrow strait",
        "excerpt": "You will find the other rock lie lower, but they are so close together that there is not more than a bow-shot between them... and under it lies the sucking whirl-pool of Charybdis. Three times in the day does she vomit forth her waters, and three times she sucks them down again.",
        "source": "Homer, The Odyssey, Book XII (Samuel Butler translation)",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_XII",
        "image": {
          "src": "/covers/houthis-red-sea-saudi-maritime-embargo--a2.png",
          "alt": "Henry Fuseli painting of Odysseus facing Scylla and Charybdis",
          "credit": "Henry Fuseli, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "The corsair claims the sea as his empire",
        "excerpt": "O'er the glad waters of the dark blue sea,\nOur thoughts as boundless, and our souls as free,\nFar as the breeze can bear, the billows foam,\nSurvey our empire and behold our home!\nThese are our realms, no limits to their sway—\nOur flag the sceptre all who meet obey.",
        "source": "Lord Byron, The Corsair, Canto I (1814)",
        "href": "https://en.wikisource.org/wiki/The_Corsair_(Byron,_1814)/CANTO_I",
        "image": {
          "src": "/covers/houthis-red-sea-saudi-maritime-embargo--a3.png",
          "alt": "Portrait of Lord Byron by Richard Westall",
          "credit": "Richard Westall, National Portrait Gallery, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The Battle of Trafalgar, 21 October 1805",
        "excerpt": "Turner's vast canvas, commissioned by George IV, depicts Nelson's fleet at Trafalgar, fought off the approach to the Strait of Gibraltar, the chokepoint gateway between the Atlantic and the Mediterranean. The painting became an icon of British naval supremacy and command of contested sea lanes. It is the artist's only work executed by royal command.",
        "source": "J. M. W. Turner, oil on canvas, 1822–24, National Maritime Museum, Greenwich",
        "href": "https://www.rmg.co.uk/collections/objects/rmgc-object-12057",
        "image": {
          "src": "/covers/houthis-red-sea-saudi-maritime-embargo--a4.png",
          "alt": "J. M. W. Turner's painting The Battle of Trafalgar, 21 October 1805",
          "credit": "J. M. W. Turner, National Maritime Museum, Greenwich, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Rule, Britannia! — a hymn to ruling the waves",
        "excerpt": "When Britain first, at Heaven's command,\nArose from out the azure main;\nThis was the charter of the land,\nAnd guardian angels sung this strain:\n\"Rule, Britannia! rule the waves:\n\"Britons never will be slaves.\"",
        "source": "Thomas Arne (music) and James Thomson (words), from the masque Alfred, 1740",
        "href": "https://imslp.org/wiki/Rule_Britannia_(Arne,_Thomas_Augustine)",
        "image": {
          "src": "/covers/houthis-red-sea-saudi-maritime-embargo--a5.png",
          "alt": "Portrait of composer Thomas Augustine Arne",
          "credit": "Robert Dunkarton, after William Humphrey, via Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "el-mayo-zambada-life-sentence",
    "headline": "Sinaloa cartel co-founder 'El Mayo' Zambada sentenced to life in US prison, ordered to forfeit $15 billion",
    "overview": "Ismael 'El Mayo' Zambada, the 76-year-old co-founder of Mexico's Sinaloa cartel, was sentenced Monday to life in prison without parole by US District Judge Brian Cogan in Brooklyn, New York. As part of a plea deal in which prosecutors agreed not to seek the death penalty, Zambada admitted responsibility for trafficking at least 1.5 million kilograms of cocaine and was ordered to forfeit $15 billion in drug profits. He is the most prominent Mexican trafficker sentenced in the US since Joaquin 'El Chapo' Guzman in 2019.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce3q1d1ed5do"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/20/mexican-drug-lord-ismael-el-mayo-zambada-sentenced-to-life-in-us-prison"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/el-mayo-zambada-life-sentence.png",
      "alt": "Exterior of the federal courthouse in Brooklyn, New York",
      "credit": "Ajay Suresh, CC BY 2.0, via Wikimedia Commons"
    },
    "rank": 30,
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Jugurtha, King of Numidia, led in triumph and left to die in the dungeon",
        "excerpt": "When, however, he was led in triumph, it is said that he fell distracted, and when he was afterwards thrown into prison, where some tore off his clothes by force, and others, whilst they struggled for his golden ear-ring, with it pulled off the tip of his ear, and when he was, after this, cast naked into the dungeon, in his amazement and confusion, with a ghastly laugh, he cried out, \"O Hercules! how cold your bath is!\" Here for six days struggling with hunger, and to the very last minute desirous of life, he was overtaken by the just reward of his villainies.",
        "source": "Plutarch, Life of Caius Marius (trans. John Dryden, rev. A. H. Clough)",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Caius_Marius",
        "image": {
          "src": "/covers/el-mayo-zambada-life-sentence--a0.png",
          "alt": "1772 engraving of the captured Numidian king Jugurtha brought as a prisoner before the Romans",
          "credit": "Engraving by Manuel Salvador Carmona after Mariano Salvador Maella (1772), from a Madrid edition of Sallust; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Captain William Kidd, the pirate, condemned at the Old Bailey and hanged at Execution Dock (1701)",
        "excerpt": "When Kidd was asked what he had to say why sentence should not pass against him, he answered, that he had nothing to say, but that he had been sworn against by perjured and wicked people. And when sentence was pronounced, he said, My Lord, it is a very hard sentence. For my part, I am the most innocent person of them all, only I have been sworn against by perjured persons.",
        "source": "Charles Ellms, The Pirates Own Book: Authentic Narratives of the Most Celebrated Sea Robbers (1837)",
        "href": "https://www.gutenberg.org/files/12216/12216-h/12216-h.htm",
        "image": {
          "src": "/covers/el-mayo-zambada-life-sentence--a1.png",
          "alt": "Captain William Kidd's body hanging in a gibbet cage over the River Thames after his execution",
          "credit": "National Maritime Museum, Greenwich, London; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "I met a traveller from an antique land\nWho said: Two vast and trunkless legs of stone\nStand in the desert. . . . Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:\nAnd on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\" (1818), in The Complete Poetical Works (ed. Hutchinson, 1914)",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ozymandias",
        "image": {
          "src": "/covers/el-mayo-zambada-life-sentence--a2.png",
          "alt": "The colossal bust of Ramesses II, the 'Younger Memnon', in the British Museum, the statue that inspired Shelley's sonnet",
          "credit": "Photo by Szilas, CC BY-SA 4.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Beggar's Opera: Captain Macheath in the condemned hold",
        "excerpt": "Since Laws were made for ev'ry Degree,\nTo curb Vice in others, as well as me,\nI wonder we han't better Company,\nUpon Tyburn Tree!\nBut Gold from Law can take out the Sting;\nAnd if rich Men like us were to swing,\n'Twou'd thin the Land, such Numbers to string\nUpon Tyburn Tree!",
        "source": "John Gay, The Beggar's Opera (1728), Act III, Air LXVI",
        "href": "https://www.gutenberg.org/cache/epub/2421/pg2421.txt",
        "image": {
          "src": "/covers/el-mayo-zambada-life-sentence--a3.png",
          "alt": "William Hogarth's painting of a scene from The Beggar's Opera, showing the highwayman Macheath in chains",
          "credit": "William Hogarth (1729), Yale Center for British Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Vercingetorix Throws Down His Arms at the Feet of Julius Caesar",
        "excerpt": "Lionel Royer's monumental 1899 canvas depicts the Gaulish chieftain Vercingetorix, after his defeat at Alesia, riding up to the seated Julius Caesar and flinging his sword and armour at the conqueror's feet. The proud warlord, once master of a vast rebellion, is shown at the instant of total submission, surrounded by Roman legionaries. He would be paraded in Caesar's triumph and eventually put to death, the archetype of a mighty rebel leader brought low by an implacable state.",
        "source": "Lionel Royer, oil on canvas (1899), Musée Crozatier, Le Puy-en-Velay",
        "href": "https://commons.wikimedia.org/wiki/File:Lionel_Royer_-_Vercingetorix_Throwing_down_His_Weapons_at_the_feet_of_Julius_Caesar.jpg",
        "image": {
          "src": "/covers/el-mayo-zambada-life-sentence--a4.png",
          "alt": "Painting of the Gaulish chieftain Vercingetorix surrendering his weapons at the feet of a seated Julius Caesar",
          "credit": "Lionel Royer (1899), Musée Crozatier; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Idle 'Prentice Executed at Tyburn (Industry and Idleness, Plate 11)",
        "excerpt": "Plate 11 of Hogarth's moral series Industry and Idleness shows Tom Idle, the idle apprentice whose crimes have led him to the gallows, seated in a cart with his own coffin as a preacher exhorts him to repent. Around the scaffold at Tyburn a vast, jeering crowd presses in, hawkers sell ballads of his life, and the hangman waits above. The print is a thronged eighteenth-century tableau of a notorious criminal delivered at last to public justice.",
        "source": "William Hogarth, etching and engraving (1747), British Museum",
        "href": "https://commons.wikimedia.org/wiki/File:The_Idle_%27Prentice_Executed_at_Tyburn_(BM_1868,0822.1582).jpg",
        "image": {
          "src": "/covers/el-mayo-zambada-life-sentence--a5.png",
          "alt": "Hogarth engraving of the idle apprentice being taken in a cart to be hanged before a huge crowd at Tyburn",
          "credit": "William Hogarth (1747), British Museum; public domain, via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "philippines-china-south-china-sea-sailor",
    "headline": "Philippines accuses Chinese coast guard of injuring Filipino sailor at disputed shoal",
    "overview": "The Philippines accused the Chinese coast guard of injuring a Filipino sailor during a confrontation at a contested shoal in the South China Sea, and Manila and Beijing each summoned the other's envoy over the incident. Philippine officials said Chinese vessels used force against a resupply mission, while China blamed the Philippine boat for the encounter. The clash is the latest flashpoint in an escalating maritime dispute.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxQOE5XVDd4MGtscjZPSkhZQmtsWU1odXEtMm9hdjR0QUR2bzlBTDkxV0hWU2hqck8wRFkwWWg5Z0VFenpZVHRYZEg3cFRQVmNrRDdHQ3VLWUpEMFFxMTMxQmRlSEtJT3RrclhaLWlIUTRDRUlEOFZrMXZvN0FFX0ZVanVBd1llUnNqSUg1QVpkekVsV0k5MkhWVWFIejA1TmhSa3E5NFBiNEZ0dkk?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNU1JrWlBzY2hhTkQ5dlhFNkhEamdNSW1rUGFmNEJPQzdLVHZxaTVrdE5zSzVKSnl5MG1Nckx0UWVxZmd1RUh1ZlNsU0RoQ2xsNGhwT2FDRGNFUDJuWllrNzFjRXhBLWFiaU12eHpFUVBNUW5oMEdQMjRjekg4VmtkMVphU0hjOFhOQUU4NEhkX09mZWRQOGM4ZE9LTjJiN29fcDJtRVhMSXBmc1ZLSGp0c3dhcFQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/philippines-china-south-china-sea-sailor.png",
      "alt": "A coast guard vessel patrolling contested waters in the South China Sea",
      "credit": "China Coast Guard vessel CCG 3105 near Scarborough Shoal, 2 February 2024. Photo: Philippine Coast Guard / Philippine Information Agency, public domain via Wikimedia Commons."
    },
    "rank": 31,
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Melian Dialogue",
        "excerpt": "For ourselves, we shall not trouble you with specious pretences... since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book V (416 BC), translated by Richard Crawley",
        "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm",
        "image": {
          "src": "/covers/philippines-china-south-china-sea-sailor--a0.png",
          "alt": "Roman-era marble bust of the historian Thucydides, who recorded the Melian Dialogue",
          "credit": "Roman copy of a portrait bust of Thucydides, Royal Ontario Museum; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Mare Liberum (The Freedom of the Seas)",
        "excerpt": "If many writers, Augustine himself among them, believed it was right to take up arms because innocent passage was refused across foreign territory, how much more justly will arms be taken up against those from whom the demand is made of the common and innocent use of the sea, which by the law of nature is common to all?",
        "source": "Hugo Grotius, The Freedom of the Seas, or the Right Which Belongs to the Dutch to Take Part in the East Indian Trade (1609), translated by Ralph van Deman Magoffin (1916)",
        "href": "https://archive.org/details/freedomofseasorr1916grot",
        "image": {
          "src": "/covers/philippines-china-south-china-sea-sailor--a1.png",
          "alt": "Portrait of the Dutch jurist Hugo Grotius, author of Mare Liberum",
          "credit": "Michiel Jansz. van Mierevelt, portrait of Hugo Grotius; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Revenge: A Ballad of the Fleet",
        "excerpt": "At Flores, in the Azores Sir Richard Grenville lay,\nAnd a pinnace, like a flutter'd bird, came flying from far away;\n\"Spanish ships of war at sea! we have sighted fifty-three!\"",
        "source": "Alfred, Lord Tennyson, \"The Revenge: A Ballad of the Fleet\" (1878)",
        "href": "https://www.english.cam.ac.uk/multimedia/tennyson/revenge.htm",
        "image": {
          "src": "/covers/philippines-china-south-china-sea-sailor--a2.png",
          "alt": "Painting of the single English galleon Revenge fighting the encircling Spanish fleet off Flores in 1591",
          "credit": "Charles Dixon, \"The Last Fight of the Revenge off Flores in the Azores, 1591\"; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Persians",
        "excerpt": "On, you men of Hellas! Free your native land. Free your children, your wives, the temples of your fathers' gods, and the tombs of your ancestors. Now you are fighting for all you have.",
        "source": "Aeschylus, The Persians (472 BC), translated by Herbert Weir Smyth (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0012:card=402",
        "image": {
          "src": "/covers/philippines-china-south-china-sea-sailor--a3.png",
          "alt": "Painting of the naval Battle of Salamis, where a smaller Greek fleet defeated the Persian empire's navy",
          "credit": "Wilhelm von Kaulbach, \"The Battle of Salamis\" (1868), Maximilianeum, Munich; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Defeat of the Spanish Armada, 8 August 1588",
        "excerpt": "De Loutherbourg's dramatic canvas shows Elizabeth I's smaller, nimbler English ships scattering the towering galleons of Philip II's Armada amid smoke and heavy seas. The painting became an enduring image of an island nation repelling the era's greatest maritime empire, celebrating seamanship and resolve over sheer size and might.",
        "source": "Philip James de Loutherbourg, oil on canvas (1796), National Maritime Museum, Greenwich (Royal Museums Greenwich)",
        "href": "https://www.rmg.co.uk/collections/objects/rmgc-object-11756",
        "image": {
          "src": "/covers/philippines-china-south-china-sea-sailor--a4.png",
          "alt": "Painting of the English fleet defeating the much larger Spanish Armada in 1588",
          "credit": "Philip James de Loutherbourg, \"Defeat of the Spanish Armada, 8 August 1588\" (1796), National Maritime Museum, Greenwich; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Brig \"Mercury\" Attacked by Two Turkish Ships",
        "excerpt": "Aivazovsky depicts the tiny 18-gun Russian brig Mercury dwarfed between two towering Ottoman ships of the line during their 1829 encounter near the Bosphorus, which the outgunned brig famously survived. The composition dramatizes a lone vessel's defiance against overwhelming force, a David-and-Goliath duel staged on the open sea.",
        "source": "Ivan Aivazovsky, oil on canvas (1892), Feodosia National Art Gallery",
        "href": "https://commons.wikimedia.org/wiki/File:Aivazovsky,_Brig_Mercury_Attacked_by_Two_Turkish_Ships_1892.jpg",
        "image": {
          "src": "/covers/philippines-china-south-china-sea-sailor--a5.png",
          "alt": "Painting of the small Russian brig Mercury fighting between two much larger Turkish warships at sea",
          "credit": "Ivan Aivazovsky, \"Brig 'Mercury' Attacked by Two Turkish Ships\" (1892), Feodosia National Art Gallery; public domain via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "tropical-storm-bertha-hurricane-fausto",
    "headline": "Tropical Storm Bertha drifts toward US Gulf Coast as Hurricane Fausto forms in eastern Pacific",
    "overview": "Tropical Storm Bertha formed Monday evening in the Gulf of Mexico about 140 miles south of Panama City, Florida, with 40 mph winds, threatening storm surge of up to four feet and 3 to 5 inches of rain along the Louisiana coast. Far to the west, Hurricane Fausto strengthened over the eastern Pacific with 75 mph winds but posed no threat to land, though its swells could bring dangerous surf to Mexico's Baja California peninsula.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPWUtZaU1rRXotenV4eWFXNm9PdnF3bHgxaWFyZ1hGeF9laVlyak1TWWdVSDNkY0FlUkw2YVhhWG1lVDhrc192Z0JlNllKc2ZrOFFCZEMwREtYelhTUlVWS1h0b2NvZXlHeENJYll6eDVMLTd0b04zTGR5SjlsNW5MZDZNeGFxalNLMlBNb0ZSY3l2dnQ1R3VJSw?oc=5"
      },
      {
        "name": "Washington Post",
        "href": "https://www.washingtonpost.com/national/2026/07/20/gulf-tropical-depression-flooding/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/tropical-storm-bertha-hurricane-fausto.png",
      "alt": "Satellite view of a swirling tropical storm over the Gulf of Mexico",
      "credit": "NASA / NOAA GOES satellite image of Hurricane Katrina over the Gulf of Mexico, 28 August 2005. Public domain, via Wikimedia Commons."
    },
    "rank": 32,
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The storm that wrecked Xerxes' Persian fleet off Sepias (480 BC)",
        "excerpt": "For that night they lay thus; but at early dawn, after clear sky and windless calm, the sea began to be violently agitated and a great storm fell upon them with a strong East Wind, that wind which they who dwell about those parts call Hellespontias. Now as many of them as perceived that the wind was rising and who were so moored that it was possible for them to do so, drew up their ships on land before the storm came, and both they and their ships escaped; but as for those of the ships which it caught out at sea, some it cast away at the place called Ipnoi in Pelion and others on the beach, while some were wrecked on the headland of Sepias itself, others at the city of Meliboia, and others were thrown up on shore at Casthanaia: and the violence of the storm could not be resisted.",
        "source": "Herodotus, The History of Herodotus, Book VII (trans. G. C. Macaulay)",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Macaulay)/Book_VII"
      },
      {
        "category": "historical",
        "title": "The Great Storm of 1703 that devastated Britain and its shipping",
        "excerpt": "Some which had not a Mast standing, nor an Anchor or Cable left them, went out to Sea wherever the Winds drove them; and lying like a Trough in the Water, wallow'd about till the Winds abated; and after were driven, some into one Port, some into another, as Providence guided them. In short, Horror and Confusion seiz'd upon all, whether on Shore or at Sea: No Pen can describe it, no Tongue can express it, no Thought conceive it, unless some of those who were in the Extremity of it; and who, being touch'd with a due sense of the sparing Mercy of their Maker, retain the deep Impressions of his Goodness upon their Minds, tho' the Danger be past.",
        "source": "Daniel Defoe, The Storm (1704) — the first substantial work of modern storm journalism",
        "href": "https://www.gutenberg.org/ebooks/42234"
      },
      {
        "category": "literary",
        "title": "Poseidon raises the storm that shatters Odysseus' raft",
        "excerpt": "With that he gathered the clouds and troubled the waters of the deep, grasping his trident in his hands; and he roused all storms of all manner of winds, and shrouded in clouds the land and sea: and down sped night from heaven. The East Wind and the South Wind clashed, and the stormy West, and the North, that is born in the bright air, rolling onward a great wave. Then were the knees of Odysseus loosened and his heart melted, and heavily he spake to his own great spirit.",
        "source": "Homer, The Odyssey, Book V (trans. S. H. Butcher and Andrew Lang)",
        "href": "https://www.gutenberg.org/ebooks/1728"
      },
      {
        "category": "literary",
        "title": "The tempest and shipwreck that open Shakespeare's play",
        "excerpt": "The sky, it seems, would pour down stinking pitch, But that the sea, mounting to the welkin's cheek, Dashes the fire out. O, I have suffer'd With those that I saw suffer! a brave vessel, Who had, no doubt, some noble creature in her, Dash'd all to pieces. O, the cry did knock Against my very heart! Poor souls, they perish'd!",
        "source": "William Shakespeare, The Tempest, Act I, Scene 2 (Cambridge edition)",
        "href": "https://www.gutenberg.org/ebooks/23042"
      },
      {
        "category": "artistic",
        "title": "Snow Storm: Steam-Boat off a Harbour's Mouth",
        "excerpt": "Turner's late seascape dissolves a steamboat into a vortex of driving snow, spray and spume, placing the viewer inside the chaos of a gale rather than at a safe distance from it. The artist claimed he had himself lashed to the mast of a ship to witness such a storm, and the swirling paint conveys the sublime terror of wind and water overwhelming human vessels — a fitting image for coasts bracing against a tropical storm.",
        "source": "J. M. W. Turner, oil on canvas, exhibited 1842, Tate (N00530)",
        "href": "https://www.tate.org.uk/art/artworks/turner-snow-storm-steam-boat-off-a-harbours-mouth-n00530",
        "image": {
          "src": "/covers/tropical-storm-bertha-hurricane-fausto--a4.png",
          "alt": "Turner's Snow Storm: a steamboat engulfed in a swirling vortex of storm, snow and sea spray",
          "credit": "J. M. W. Turner, 'Snow Storm: Steam-Boat off a Harbour's Mouth' (1842), Tate. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Ninth Wave",
        "excerpt": "Aivazovsky's most celebrated marine painting shows a handful of shipwreck survivors clinging to a fragment of mast as the sea rears up against them at dawn. Folklore held the ninth wave to be the largest and most destructive of a storm, and the canvas balances the sublime terror of towering water against the fragile hope of the rising sun — an enduring emblem of humanity facing the fury of wind and sea.",
        "source": "Ivan Aivazovsky, oil on canvas, 1850, State Russian Museum, St Petersburg",
        "href": "https://commons.wikimedia.org/wiki/File:Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/tropical-storm-bertha-hurricane-fausto--a5.png",
          "alt": "Aivazovsky's The Ninth Wave: shipwreck survivors cling to a mast as a huge wave rises at dawn",
          "credit": "Ivan Aivazovsky, 'The Ninth Wave' (1850), State Russian Museum. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "spp-central-states-rolling-blackouts",
    "headline": "US central-states grid operator warns of possible rolling blackouts amid record heat",
    "overview": "The Southwest Power Pool, which manages the grid across 14 central US states, warned Monday evening that it could order rolling blackouts after several power plants unexpectedly tripped offline during a heat wave stretching from North Dakota to Louisiana. The operator declared a level-three energy alert, tapping operating reserves to meet record demand, before easing the warning a few hours later. No blackouts were ultimately ordered.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPejYtZ1NMQ254UFNyVmx2dUZRS3VxeEt1TFRMc3FLNWxzSjlCSzdkOGhxdjd0QUhxTWk1eWFnNVkyUHlqWXVOMzYwdF9pM3lJb0hoYkhtanRCNkxOa05KbnZFTnZEdUdxMFItNXZpcmdrZm5vU3dRa2JPTUtqSDZoUjZfeDhPcU1nenZ2VUw1YThRU2xaQW5ENW44TlMtTUo5MGxjZ1ZubDEwU05NdVRfbzNLeFR2X3RT?oc=5"
      },
      {
        "name": "WSAU",
        "href": "https://wsau.com/2026/07/20/grid-operator-in-us-central-states-warns-of-potential-rolling-blackouts/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/spp-central-states-rolling-blackouts.png",
      "alt": "High-voltage electricity transmission lines against a hazy summer sky",
      "credit": "Stefan Andrej Shambora, 2007. CC BY 2.0, via Wikimedia Commons"
    },
    "rank": 33,
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of London (1666)",
        "excerpt": "So near the fire as we could for smoke; and all over the Thames, with one's face in the wind, you were almost burned with a shower of firedrops. This is very true; so as houses were burned by these drops and flakes of fire, three or four, nay, five or six houses, one from another. … We staid till, it being darkish, we saw the fire as only one entire arch of fire from this to the other side the bridge, and in a bow up the hill for an arch of above a mile long: it made me weep to see it. The churches, houses, and all on fire and flaming at once; and a horrid noise the flames made, and the cracking of houses at their ruins.",
        "source": "The Diary of Samuel Pepys, entry for 2 September 1666",
        "href": "https://www.gutenberg.org/cache/epub/4167/pg4167.txt",
        "image": {
          "src": "/covers/spp-central-states-rolling-blackouts--a0.png",
          "alt": "The Great Fire of London (1666), painted c.1675 by an unknown artist, showing the city ablaze along the Thames",
          "credit": "Unknown painter, c.1675, Museum of London. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Northeast Blackout of 2003",
        "excerpt": "On the afternoon of August 14, 2003, a cascading failure that began in Ohio swept across the northeastern United States and Ontario, cutting power to roughly 50 million people in the largest blackout in North American history. Overgrown transmission lines, a software failure, and poor situational awareness let a local problem spiral into a grid-wide collapse on a warm summer day. Cities from Detroit to New York went dark for hours or days, stranding commuters and knocking out water, transit, and communications.",
        "source": "U.S.-Canada Power System Outage Task Force, Final Report on the August 14, 2003 Blackout in the United States and Canada (U.S. Department of Energy, 2004)",
        "href": "https://www.energy.gov/sites/prod/files/oeprod/DocumentsandMedia/BlackoutFinal-Web.pdf",
        "image": {
          "src": "/covers/spp-central-states-rolling-blackouts--a1.png",
          "alt": "Satellite night-lights image of the northeastern United States on August 14, 2003, showing cities darkened by the blackout",
          "credit": "NOAA / U.S. Air Force DMSP. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Darkness",
        "excerpt": "I had a dream, which was not all a dream. / The bright sun was extinguished, and the stars / Did wander darkling in the eternal space, / Rayless, and pathless, and the icy Earth / Swung blind and blackening in the moonless air; / Morn came and went—and came, and brought no day, / And men forgot their passions in the dread / Of this their desolation; and all hearts / Were chilled into a selfish prayer for light: / And they did live by watchfires—and the thrones, / The palaces of crownéd kings—the huts, / The habitations of all things which dwell, / Were burnt for beacons; cities were consumed",
        "source": "Lord Byron, \"Darkness\" (Diodati, July 1816)",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Lord_Byron_(ed._Coleridge,_Prothero)/Poetry/Volume_4/Darkness",
        "image": {
          "src": "/covers/spp-central-states-rolling-blackouts--a2.png",
          "alt": "Portrait of Lord Byron by Richard Westall, 1813",
          "credit": "Richard Westall, 1813, National Portrait Gallery, London. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Rime of the Ancient Mariner",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon. … Water, water, every where, / And all the boards did shrink; / Water, water, every where, / Nor any drop to drink.",
        "source": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner\" (final text, 1834)",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm",
        "image": {
          "src": "/covers/spp-central-states-rolling-blackouts--a3.png",
          "alt": "Gustave Doré's engraving for Coleridge's \"The Rime of the Ancient Mariner\" (1876)",
          "credit": "Gustave Doré, 1876. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Great Day of His Wrath",
        "excerpt": "Painted in the last years of Martin's life, this vast apocalyptic canvas shows an entire city being torn from its foundations and hurled into a fiery abyss beneath a blood-red, lightning-riven sky. Mountains collapse and crowds of tiny figures are swept into darkness, an image of civilization overwhelmed in an instant. Martin drew on the Book of Revelation, but the painting also channels a Victorian dread of a world convulsed by natural and industrial cataclysm.",
        "source": "John Martin, \"The Great Day of His Wrath\" (1851–1853), Tate, London (N05613)",
        "href": "https://www.tate.org.uk/art/artworks/martin-the-great-day-of-his-wrath-n05613",
        "image": {
          "src": "/covers/spp-central-states-rolling-blackouts--a4.png",
          "alt": "John Martin's apocalyptic painting \"The Great Day of His Wrath\", a city plunged into fiery darkness beneath a red sky",
          "credit": "John Martin, 1851–1853, Tate, London. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Seasons (Die Jahreszeiten) — \"Summer\"",
        "excerpt": "In the \"Summer\" part of Haydn's late oratorio, an oppressive noonday heat settles over the land as the sun climbs to its zenith and the shepherd, flocks, and fields languish in the still, burning air. The music grows heavy and airless before erupting into one of the most vivid thunderstorms in the classical repertoire, driven by hammering timpani and racing strings. Haydn turns the endurance of extreme heat and the sudden violence of summer weather into pure orchestral drama.",
        "source": "Joseph Haydn, Die Jahreszeiten, Hob. XXI:3 (1801), Part 2: \"Der Sommer\"",
        "href": "https://imslp.org/wiki/Die_Jahreszeiten,_Hob.XXI:3_(Haydn,_Joseph)",
        "image": {
          "src": "/covers/spp-central-states-rolling-blackouts--a5.png",
          "alt": "Portrait of the composer Joseph Haydn by Thomas Hardy, 1791",
          "credit": "Thomas Hardy, 1791, Royal College of Music, London. Public domain, via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "samsung-robotics-division-rx",
    "headline": "Samsung creates dedicated robotics division led by former Hyundai executive",
    "overview": "Samsung Electronics said Tuesday it will establish a robotics division, called RX, that reports directly to the chief executive, aiming to make robotics a core growth engine. Executive vice-president Lee Dongkun, who previously directed robotics strategy at Hyundai Motor Group and oversaw Boston Dynamics, will lead the new unit's strategy team. Samsung also plans robotics research hubs in the US, China and Japan.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxOUUZzV0hGcjR4YUpvTFkyVDhjRUE2M0VUWEtvTWhydFpQZDhaRDdaU1RyRmNtR05HZkhjQVVpU25mSTBHbkdWNXdmNjd4eFYxQW55Z08walRTai1aNjB1SGplODZTZVB3aEl2OVdMZ3RZN19Wd0l5dVRYQWV6LUMwaVZWNzhrTGk0RXJXNlF5LW1Pb3ZZal9UZFJuSE9mN3d6VWJpYTZ6Q1Z6NnBId2JXS2V6aHRhenNJcnBtUENJZXBNTmc?oc=5"
      },
      {
        "name": "SamMobile",
        "href": "https://www.sammobile.com/news/samsung-rx-robotics-division-created-future-growth/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/samsung-robotics-division-rx.png",
      "alt": "A humanoid robot on an exhibition stand",
      "credit": "TOPIO 3.0 humanoid robot at the Tokyo International Robot Exhibition, November 2009. Photo by Humanrobo, CC BY-SA 3.0, via Wikimedia Commons."
    },
    "rank": 34,
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Al-Jazari, The Book of Knowledge of Ingenious Mechanical Devices",
        "excerpt": "Writing in 1206 as chief engineer to the Artuqid court at Diyarbakir, Ismail al-Jazari described some fifty machines and the exact means to build them, among them water clocks and humanoid figures that poured drinks, offered soap and towels, and struck the hours. His illustrated manuscripts, copied for centuries, are among the earliest detailed blueprints for programmable automata built in the likeness of human servants. This folio depicts his celebrated elephant clock, whose figures moved and sounded on the half hour.",
        "source": "The Metropolitan Museum of Art (folio from al-Jazari's treatise, dated A.H. 715 / A.D. 1315)",
        "href": "https://www.metmuseum.org/art/collection/search/451402",
        "image": {
          "src": "/covers/samsung-robotics-division-rx--a0.png",
          "alt": "Manuscript painting of al-Jazari's elephant clock, with mechanical figures of a scribe, a bird, dragons and a driver mounted on an elephant.",
          "credit": "\"The Elephant Clock,\" folio from a Book of the Knowledge of Ingenious Mechanical Devices by al-Jazari, A.D. 1315. The Metropolitan Museum of Art, CC0, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Jaquet-Droz automaton 'The Writer' (L'Ecrivain)",
        "excerpt": "Built between 1768 and 1774 by the Swiss watchmaker Pierre Jaquet-Droz with his son Henri-Louis and Jean-Frederic Leschot, 'The Writer' is a clockwork boy of some 6,000 parts who dips a quill in ink and writes any programmed text up to forty characters, his eyes following the letters as his hand moves. Set by a wheel of interchangeable cams, it is often called one of the oldest ancestors of the programmable computer. The Enlightenment automaton dramatized the dream of a machine crafted in human form that could perform a human's work.",
        "source": "Musee d'art et d'histoire, Neuchatel, Switzerland",
        "href": "https://www.mahn.ch/en/expositions/automates-jaquet-droz",
        "image": {
          "src": "/covers/samsung-robotics-division-rx--a1.png",
          "alt": "The Jaquet-Droz 'Writer' automaton, a seated mechanical child figure holding a quill pen at a wooden desk.",
          "credit": "Jaquet-Droz automaton 'The Writer,' Musee d'art et d'histoire, Neuchatel. Photo by Gre regiment, CC BY-SA 4.0, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book 18 - the golden handmaidens of Hephaestus",
        "excerpt": "but there moved swiftly to support their lord handmaidens wrought of gold in the semblance of living maids. In them is understanding in their hearts, and in them speech and strength, and they know cunning handiwork by gift of the immortal gods.",
        "source": "Homer, Iliad 18.417-420, translated by A. T. Murray, Perseus Digital Library (Tufts University)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18:card=368"
      },
      {
        "category": "literary",
        "title": "Karel Capek, R.U.R. (Rossum's Universal Robots)",
        "excerpt": "In fact he rejected man and made the Robot. My dear Miss Glory, the Robots are not people. Mechanically they are more perfect than we are; they have an enormously developed intelligence, but they have no soul.",
        "source": "Karel Capek, R.U.R., English version by Nigel Playfair (Project Gutenberg, eBook #59112)",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm",
        "image": {
          "src": "/covers/samsung-robotics-division-rx--a3.png",
          "alt": "Stage photograph from Act I of the Theatre Guild production of R.U.R., showing actors in the factory office set.",
          "credit": "Act I of the Theatre Guild production of Karel Capek's R.U.R., 1923. Photo by Francis Bruguiere; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Death of Talos - Attic red-figure volute krater by the Talos Painter",
        "excerpt": "This late fifth-century BC krater shows the death of Talos, the giant bronze automaton whom Hephaestus forged to guard Crete by circling the island three times a day. Painted in pale tones to mark him as metal rather than flesh, Talos collapses into the arms of the Dioskouroi as Medea, at left, works the sorcery that drains the ichor from his single vein. It is one of antiquity's most vivid images of an artificial being made in human form by a craftsman's hand.",
        "source": "Talos Painter, c. 400 BC; Museo Archeologico Nazionale Jatta, Ruvo di Puglia (name vase of the painter)",
        "href": "https://commons.wikimedia.org/wiki/File:Vaso_di_Talos.JPG",
        "image": {
          "src": "/covers/samsung-robotics-division-rx--a4.png",
          "alt": "Ancient Greek red-figure vase painting of the bronze automaton Talos, shown in white, falling backward into the arms of two youths while Medea stands by.",
          "credit": "The Death of Talos, Attic red-figure volute krater by the Talos Painter, Museo Jatta, Ruvo di Puglia. Photo by Forzaruvo94, CC BY-SA 3.0, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Leo Delibes, Coppelia, ou La fille aux yeux d'email",
        "excerpt": "Delibes's 1870 ballet turns on Dr. Coppelius, an eccentric inventor whose life-size mechanical doll, Coppelia, is so lifelike that a young villager falls in love with her. The score gives the wind-up dancer her own jerky, clockwork music before the deception unravels. It set the automaton fantasy - a maker infatuated with the artificial being he has crafted in human likeness - to some of the nineteenth century's most beloved dance music.",
        "source": "Leo Delibes, Coppelia (ballet, Paris, 1870) - IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Copp%C3%A9lia_(Delibes,_L%C3%A9o)",
        "image": {
          "src": "/covers/samsung-robotics-division-rx--a5.png",
          "alt": "1870 photograph of ballerina Giuseppina Bozzacchi in costume as Swanilda in the original Paris production of Coppelia.",
          "credit": "Giuseppina Bozzacchi as Swanilda in the premiere production of Delibes's Coppelia, Paris, 1870. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "hungary-byd-szijjarto-investigation",
    "headline": "Hungary opens investigation into BYD deal after ex-foreign minister joins the Chinese carmaker",
    "overview": "Hungary's government said Monday it is investigating a major investment by Chinese automaker BYD that was negotiated by former foreign minister Peter Szijjarto, who resigned from Parliament last week to take an executive job at the company. Prime Minister Peter Magyar told lawmakers the probe would examine subsidies, tax breaks and permits granted to BYD, alleging Szijjarto had backed the firm with 'hundreds of billions' of forints in public money. The inquiry will also review incentives handed to multinationals during Viktor Orban's tenure.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxPdl95Y3haUXBWakVhR3hodjlLUFlxTUJ5Q1ZyRkF1ZFNNY1hMM01MZHVQQkc0SlAwMHFYQjViZThMZnRZTHZoOW9BNEFDQmVrVkpKaTFOdTlJQnliRkVBMl9yUXgwQlV3M1RDUTFGQmM0TlBOZThrM1Q4ZHM3SFBIRmhNNWxHUk9FMEFkMjJGQk9jQmQwckdN?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://www.scmp.com/business/china-evs/article/3361258/hungary-investigates-deal-chinas-byd-after-ex-foreign-minister-takes-job-there"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/hungary-byd-szijjarto-investigation.png",
      "alt": "A row of BYD electric buses parked together in Bogota, Colombia",
      "credit": "BYD Colombia, CC BY-SA 2.5, via Wikimedia Commons"
    },
    "rank": 35,
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero prosecutes Verres for plundering his province",
        "excerpt": "… they have got to fear who have stolen only as much as is enough for themselves, but that he has stolen so much that it may easily be plenty for many; that nothing is so holy that it cannot be corrupted, or so strongly fortified that it cannot be stormed by money.",
        "source": "Cicero, First Oration Against Verres (Actio Prima, 70 BC), trans. C. D. Yonge",
        "href": "https://en.wikisource.org/wiki/Against_Verres/First_pleading",
        "image": {
          "src": "/covers/hungary-byd-szijjarto-investigation--a0.png",
          "alt": "Ancient marble bust of the Roman orator and statesman Cicero, Capitoline Museums, Rome",
          "credit": "Photograph by Glauco92, CC BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Edmund Burke impeaches Warren Hastings for corruption in office",
        "excerpt": "Mr. Hastings' government was one whole system of oppression, of robbery of individuals, of spoliation of the public, and of supersession of the whole system of the English government, in order to vest in the worst of the natives all the power that could possibly exist in any government.",
        "source": "Edmund Burke, Speech at the Trial (Impeachment) of Warren Hastings, Westminster Hall (1788)",
        "href": "https://en.wikisource.org/wiki/The_World%27s_Famous_Orations/Volume_6/At_the_Trial_of_Warren_Hastings",
        "image": {
          "src": "/covers/hungary-byd-szijjarto-investigation--a1.png",
          "alt": "Portrait of Warren Hastings, Governor-General of Bengal, painted circa 1772 by Tilly Kettle",
          "credit": "Tilly Kettle (c. 1772), National Portrait Gallery, London; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Dante's barrators boil in pitch for selling public office",
        "excerpt": "Behold one of the elders of Saint Zita; Plunge him beneath, for I return for others Unto that town, which is well furnished with them. All there are barrators, except Bonturo; No into Yes for money there is changed.",
        "source": "Dante Alighieri, Inferno, Canto XXI, trans. Henry Wadsworth Longfellow (1867)",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_21",
        "image": {
          "src": "/covers/hungary-byd-szijjarto-investigation--a2.png",
          "alt": "Gustave Dore engraving for Inferno Canto XXI: Virgil rebuking the demons over the pit of boiling pitch where the barrators are punished",
          "credit": "Gustave Dore (1861), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Trollope's swindler-financier Melmotte buys his way into society and Parliament",
        "excerpt": "People said that Mr. Melmotte had a reputation throughout Europe as a gigantic swindler,—as one who in the dishonest and successful pursuit of wealth had stopped at nothing. People said of him that he had framed and carried out long premeditated and deeply laid schemes for the ruin of those who had trusted him, that he had swallowed up the property of all who had come in contact with him, that he was fed with the blood of widows and children.",
        "source": "Anthony Trollope, The Way We Live Now (1875)",
        "href": "https://www.gutenberg.org/ebooks/5231",
        "image": {
          "src": "/covers/hungary-byd-szijjarto-investigation--a3.png",
          "alt": "Caricature of the novelist Anthony Trollope by Frederick Waddy, 1872",
          "credit": "Frederick Waddy, 'Cartoon Portraits and Biographical Sketches of Men of the Day' (1873), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Hogarth satirizes electoral bribery in 'Canvassing for Votes'",
        "excerpt": "Hogarth's second election print shows a prosperous farmer being simultaneously plied with bribes and treats by agents of both the Whig and Tory parties as innkeepers count their takings, a biting image of votes and public favour openly bought with money.",
        "source": "William Hogarth, Canvassing for Votes (Four Prints of an Election, plate 2), engraved by Charles Grignion, 1757",
        "href": "https://commons.wikimedia.org/wiki/File:Canvassing_for_Votes,_Plate_II-_Four_Prints_of_an_Election_MET_DP827058.jpg",
        "image": {
          "src": "/covers/hungary-byd-szijjarto-investigation--a4.png",
          "alt": "William Hogarth's 1757 engraving 'Canvassing for Votes', depicting political agents bribing a voter outside an inn",
          "credit": "After William Hogarth, engraved by Charles Grignion; The Metropolitan Museum of Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Daumier's 'The Legislative Belly' lampoons a corrupt, bloated chamber",
        "excerpt": "Daumier's 1834 lithograph ranks the ministerial benches of the July Monarchy's Chamber of Deputies as rows of paunchy, smug, dozing legislators, each an identifiable public man, skewering the self-satisfied greed and corruption of those meant to serve the public interest.",
        "source": "Honore Daumier, Le Ventre legislatif (The Legislative Belly), lithograph, 1834",
        "href": "https://commons.wikimedia.org/wiki/File:Le_ventre_l%C3%A9gislatif-_Aspect_des_bancs_minist%C3%A9riels_de_la_chambre_improstitu%C3%A9e_de_1834_MET_48055.jpg",
        "image": {
          "src": "/covers/hungary-byd-szijjarto-investigation--a5.png",
          "alt": "Honore Daumier's 1834 lithograph 'Le Ventre legislatif', caricaturing corpulent, complacent deputies on the ministerial benches",
          "credit": "Honore Daumier (1834); The Metropolitan Museum of Art; public domain, via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "mvrdv-rotterdam-rocks-world-wonder",
    "headline": "MVRDV wins competition to build Rotterdam climate landmark billed as a 'new world wonder'",
    "overview": "Dutch architecture firm MVRDV won an international competition to design 'Rotterdam Rocks!', a 240-million-euro sustainability landmark on the city's Maas waterfront intended as a 'new wonder of the world' promoting climate action. The 30,000-square-meter building, a stack of planted, rock-like volumes, will house an immersive experience, a hotel, a conference center and a food court. MVRDV beat shortlisted rivals including Heatherwick Studio and Mecanoo among 80 international entries.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/21/mvrdv-rotterdam-rocks-shift-competition/"
      },
      {
        "name": "Designboom",
        "href": "https://www.designboom.com/architecture/mvrdv-competition-rotterdam-shift-embassy-landmark-ecological-change/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/mvrdv-rotterdam-rocks-world-wonder.png",
      "alt": "The Maas waterfront skyline in Rotterdam, the Netherlands",
      "credit": "Erasmusbrug & De Rotterdam, photo by Fred Romero, CC BY 2.0, via Wikimedia Commons"
    },
    "rank": 36,
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Hanging Garden of Babylon",
        "excerpt": "The park extended four plethra on each side, and since the approach to the garden sloped like a hillside and the several parts of the structure rose from one another tier on tier, the appearance of the whole resembled that of a theatre. When the ascending terraces had been built, there had been constructed beneath them galleries which carried the entire weight of the planted garden and rose little by little one above the other along the approach; and the uppermost gallery, which was fifty cubits high, bore the highest surface of the park, which was made level with the circuit wall of the battlements of the city.",
        "source": "Diodorus Siculus, Library of History, Book II.10 (Loeb translation, C. H. Oldfather)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Diodorus_Siculus/2A*.html",
        "image": {
          "src": "/covers/mvrdv-rotterdam-rocks-world-wonder--a0.png",
          "alt": "The Hanging Gardens of Babylon, a 16th-century engraving after Maarten van Heemskerck, showing terraced planted gardens rising above the city walls",
          "credit": "Maarten van Heemskerck (16th century), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Dome of Santa Maria del Fiore",
        "excerpt": "And it can be said with confidence that the ancients never went so high with their buildings, and never exposed themselves to so great a risk as to try to challenge the heavens, even as this structure truly appears to challenge them, seeing that it rises to such a height that the mountains round Florence appear no higher. And it seems, in truth, that the heavens are envious of it, since the lightning keeps on striking it every day.",
        "source": "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors and Architects — Life of Filippo Brunelleschi (trans. Gaston du C. de Vere)",
        "href": "https://www.gutenberg.org/files/25759/25759-h/25759-h.htm",
        "image": {
          "src": "/covers/mvrdv-rotterdam-rocks-world-wonder--a1.png",
          "alt": "Brunelleschi's dome of the Cathedral of Santa Maria del Fiore dominating the skyline of Florence, Italy",
          "credit": "Photo by Petar Milošević, CC BY-SA 4.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Tower of Babel (Genesis 11:4–9)",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth. And the LORD came down to see the city and the tower, which the children of men builded. And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do. Go to, let us go down, and there confound their language, that they may not understand one another's speech. So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city. Therefore is the name of it called Babel; because the LORD did there confound the language of all the earth: and from thence did the LORD scatter them abroad upon the face of all the earth.",
        "source": "The Holy Bible, King James Version — Genesis, chapter 11",
        "href": "https://www.gutenberg.org/files/10/10-h/10-h.htm",
        "image": {
          "src": "/covers/mvrdv-rotterdam-rocks-world-wonder--a2.png",
          "alt": "The Confusion of Tongues, Gustave Doré's engraving of the abandoned Tower of Babel",
          "credit": "Gustave Doré (1865–66), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Kubla Khan; or, A Vision in a Dream",
        "excerpt": "In Xanadu did Kubla Khan\nA stately pleasure-dome decree:\nWhere Alph, the sacred river, ran\nThrough caverns measureless to man\nDown to a sunless sea.\nSo twice five miles of fertile ground\nWith walls and towers were girdled round;\nAnd here were gardens bright with sinuous rills\nWhere blossom'd many an incense-bearing tree;\nAnd here were forests ancient as the hills,\nAnd folding sunny spots of greenery.",
        "source": "Samuel Taylor Coleridge, Kubla Khan, first published 1816 (Christabel; Kubla Khan; The Pains of Sleep)",
        "href": "https://en.wikisource.org/wiki/Christabel;_Kubla_Khan;_The_Pains_of_Sleep_(1816)/Kubla_Khan"
      },
      {
        "category": "artistic",
        "title": "The Tower of Babel",
        "excerpt": "Bruegel imagines the biblical tower as a colossal spiralling megastructure of arches and ramps, hewn into a living rock outcrop and dwarfing the harbour city and ships at its foot. Its unfinished upper storeys and visibly leaning form turn the monument into a meditation on overreaching human ambition — a vast work of engineering fused with the natural crag it rises from.",
        "source": "Pieter Bruegel the Elder, oil on panel, 1563, Kunsthistorisches Museum, Vienna",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/mvrdv-rotterdam-rocks-world-wonder--a4.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting The Tower of Babel, a vast spiralling tower rising beside a harbour",
          "credit": "Pieter Bruegel the Elder (1563), Kunsthistorisches Museum, Vienna; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "La cathédrale engloutie (The Sunken Cathedral)",
        "excerpt": "Debussy's piano prelude evokes the legend of the drowned cathedral of Ys, which rises out of the sea at dawn amid pealing bells and chanting before sinking beneath the waves again. Through parallel chords and swelling sonorities the music builds a monumental edifice out of sound, dissolving the boundary between a great human structure and the water from which it emerges. It is a fitting overture for a landmark conceived to rise, rock-like, from a waterfront.",
        "source": "Claude Debussy, Préludes, Livre 1, No. 10, composed 1909–10 (Paris: Durand et Cie., 1910)",
        "href": "https://imslp.org/wiki/Pr%C3%A9ludes,_Livre_1_(Debussy,_Claude)"
      }
    ]
  },
  {
    "slug": "sri-lanka-drones-dengue-outbreak",
    "headline": "Sri Lanka deploys air force drones to fight worst dengue outbreak in nearly a decade",
    "overview": "Sri Lanka is using air force drones to spot stagnant rooftop water after monsoon rains as it battles its worst dengue outbreak in almost ten years, with troops and police also inspecting homes, building sites and schools for mosquito-breeding grounds. Since January the mosquito-borne disease has killed 53 people and infected more than 76,000, with roughly three-quarters of cases tied to the more virulent DENV-2 strain. Health officials expect infections to ease as the monsoon weakens in August.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0gFBVV95cUxPSDVoUG4tUU94eDVpWTlBMzhFNHBHNFItRGVUaldmLXdpVkMyOS1iUjRVV05qSG1PTFJMNXdPR2d5UUdLSWx3aWNtcTFkNmUwRVA1aS1MSkNleTVfZlNBQ1BGUEZuaFl6RzN1RWtsTUVKVFZDOUg5ZWgzZUFOT2NRd2gwd1lsZXoycS0xa3pEZ0lHMEoxRUNyX2FqZUJoZWVpU09YeVU3S1dBODJoZnpLVVZwSDJ5X3BlOFNiSmdraUdlanVLY2gzVnhDTVktNE5NdUE?oc=5"
      },
      {
        "name": "Free Malaysia Today",
        "href": "https://www.freemalaysiatoday.com/category/world/2026/07/21/sri-lanka-uses-air-force-drones-to-tackle-spreading-dengue-outbreak"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/sri-lanka-drones-dengue-outbreak.png",
      "alt": "A quadcopter drone flying over rooftops",
      "credit": "Josh Sorenson, CC0 (public domain), via Wikimedia Commons"
    },
    "rank": 37,
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens (430 BC)",
        "excerpt": "people in good health were all of a sudden attacked by violent heats in the head, and redness and inflammation in the eyes, the inward parts, such as the throat or tongue, becoming bloody and emitting an unnatural and fetid breath. These symptoms were followed by sneezing and hoarseness, after which the pain soon reached the chest, and produced a hard cough.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (Richard Crawley translation)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
        "image": {
          "src": "/covers/sri-lanka-drones-dengue-outbreak--a0.png",
          "alt": "Michael Sweerts, Plague in an Ancient City (c. 1652-1654), long associated with the Plague of Athens, showing the dead and dying in a stricken classical city",
          "credit": "Michael Sweerts, Los Angeles County Museum of Art (LACMA), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The war on the mosquito: eradicating yellow fever in Havana (1901)",
        "excerpt": "It was evident, therefore, that if we could prevent this being done in every case of yellow fever in Havana, the disease would disappear. This measure alone would be sufficient for eliminating yellow fever.",
        "source": "William C. Gorgas, Sanitation in Panama (1915), Chapter V: Sanitary Work at Havana",
        "href": "https://archive.org/details/sanitationinpana00gorgrich"
      },
      {
        "category": "literary",
        "title": "A Journal of the Plague Year (1722)",
        "excerpt": "The second week in June, the parish of St Giles, where still the weight of the infection lay, buried 120, whereof though the bills said but sixty-eight of the plague, everybody said there had been 100 at least, calculating it from the usual number of funerals in that parish, as above.",
        "source": "Daniel Defoe, A Journal of the Plague Year",
        "href": "https://www.gutenberg.org/ebooks/376"
      },
      {
        "category": "literary",
        "title": "The Masque of the Red Death (1842)",
        "excerpt": "The “Red Death” had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal—the redness and the horror of blood. There were sharp pains, and sudden dizziness, and then profuse bleeding at the pores, with dissolution. The scarlet stains upon the body and especially upon the face of the victim, were the pest ban which shut him out from the aid and from the sympathy of his fellow-men. And the whole seizure, progress and termination of the disease, were the incidents of half an hour.",
        "source": "Edgar Allan Poe, The Masque of the Red Death",
        "href": "https://www.gutenberg.org/ebooks/1064"
      },
      {
        "category": "artistic",
        "title": "The Triumph of Death (c. 1562-1563)",
        "excerpt": "Bruegel's panoramic panel imagines death as an unstoppable epidemic sweeping the whole of society, with armies of skeletons harvesting kings and peasants alike across a scorched landscape. Painted in an age when plague repeatedly emptied Europe's cities, it renders pestilence as a mass event that no wall, rank, or wealth can hold back. The teeming detail turns collective mortality into a single overwhelming image of contagion triumphant.",
        "source": "Pieter Bruegel the Elder, Museo Nacional del Prado, Madrid",
        "href": "https://www.museodelprado.es/en/the-collection/art-work/the-triumph-of-death/d3d82b0b-9bf2-4082-ab04-66ed53196ccc",
        "image": {
          "src": "/covers/sri-lanka-drones-dengue-outbreak--a4.png",
          "alt": "Pieter Bruegel the Elder's The Triumph of Death, a vast landscape overrun by armies of skeletons driving the living toward death",
          "credit": "Pieter Bruegel the Elder, Museo del Prado, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Die Pest / The Plague (1898)",
        "excerpt": "Böcklin personifies plague as a skeletal Death riding a winged, dragon-like beast that swoops low through a narrow street, scattering the dying in its shadow. The airborne monster gives visual form to the old fear of pestilence descending from above and moving faster than any human defence. Painted near the end of the artist's life, it distils centuries of dread of epidemic disease into a single predatory figure in flight.",
        "source": "Arnold Böcklin, Kunstmuseum Basel",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/sri-lanka-drones-dengue-outbreak--a5.png",
          "alt": "Arnold Böcklin's Die Pest, showing Death astride a winged beast flying low through a medieval street as townspeople fall",
          "credit": "Arnold Böcklin, Kunstmuseum Basel, public domain, via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "anti-ice-veteran-manhattan-fire",
    "headline": "Army veteran arrested after setting fire outside Manhattan federal building housing ICE offices",
    "overview": "A US Army veteran was arrested Monday after pouring gasoline and igniting a fire outside 26 Federal Plaza in Lower Manhattan, which houses federal immigration offices, in what the FBI is investigating as an anti-government attack. Authorities said the suspect also set off a large firework and fired pellets from an airsoft rifle toward the building, and had wheeled a cart bearing an 'ICE Off Our Streets' sign. One civilian and two government employees suffered minor injuries before the blaze was extinguished.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c1m1rr90dzxo"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/20/us/new-york-federal-building-incendiary-device"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/anti-ice-veteran-manhattan-fire.png",
      "alt": "Police tape cordoning off the entrance to a federal government building",
      "credit": "Jacob K. Javits Federal Office Building, 26 Federal Plaza, Lower Manhattan. Photo by Ken Lund, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "rank": 38,
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herostratus burns the Temple of Artemis at Ephesus (356 BC)",
        "excerpt": "As for the temple of Artemis, its first architect was Chersiphron; and then another man made it larger. But when it was set on fire by a certain Herostratus, the citizens erected another and better one, having collected the ornaments of the women and their own individual belongings, and having sold also the pillars of the former temple.",
        "source": "Strabo, Geography 14.1.22 (trans. H. L. Jones, Loeb Classical Library)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/14A*.html"
      },
      {
        "category": "historical",
        "title": "The Gunpowder Plot: the Monteagle Letter warns of a “terrible blow” (1605)",
        "excerpt": "for though there be no apparance of anni stir, yet I saye they shall receive a terrible blow this parliament and yet they shall not seie who hurts them this cowncel is not to be contemned because it may do yowe good and can do yowe no harme for the dangere is passed as soon as yowe have burnt the letter",
        "source": "Anonymous letter to Lord Monteagle, 26 October 1605 (The National Archives, SP 14/216/2)",
        "href": "https://en.wikisource.org/wiki/Monteagle_Letter"
      },
      {
        "category": "literary",
        "title": "The Secret Agent",
        "excerpt": "“Yes,” he continued, with a contemptuous smile, “the blowing up of the first meridian is bound to raise a howl of execration.”",
        "source": "Joseph Conrad, The Secret Agent (1907), ch. 2 — Mr Vladimir demands an attack on the Greenwich Observatory",
        "href": "https://www.gutenberg.org/cache/epub/974/pg974.txt"
      },
      {
        "category": "literary",
        "title": "Barnaby Rudge: A Tale of the Riots of ’Eighty",
        "excerpt": "they fired the pile with lighted matches and with blazing tow, and then stood by, awaiting the result. The furniture being very dry, and rendered more combustible by wax and oil, besides the arts they had used, took fire at once.",
        "source": "Charles Dickens, Barnaby Rudge (1841) — the mob burns Newgate Prison during the Gordon Riots",
        "href": "https://www.gutenberg.org/cache/epub/917/pg917.txt"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons, 16 October 1834",
        "excerpt": "Turner witnessed the fire that destroyed the Palace of Westminster on 16 October 1834 and returned to the subject in several works. In this version he renders the burning seat of British government as a towering wall of orange and yellow reflected across the Thames, the watching crowd reduced to dark silhouettes before the blaze.",
        "source": "J. M. W. Turner — Cleveland Museum of Art (accession no. 1942.647)",
        "href": "https://www.clevelandart.org/art/1942.647",
        "image": {
          "src": "/covers/anti-ice-veteran-manhattan-fire--a4.png",
          "alt": "J. M. W. Turner's depiction of the Houses of Parliament engulfed in flames at night, the fire reflected on the River Thames",
          "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 — Cleveland Museum of Art (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Gunpowder Plot Conspirators",
        "excerpt": "This engraving by the Dutch printmaker Crispijn de Passe the Elder is the only contemporary group portrait of the Gunpowder Plot conspirators, showing eight of the men — Guy Fawkes among them — who schemed to blow up the House of Lords in 1605. The Latin, French and German text beneath the figures recounts the conspiracy and the plotters' grisly fate, broadcasting their infamy to an international audience.",
        "source": "Crispijn de Passe the Elder, engraving, c.1605 — National Portrait Gallery, London (accession no. 334a)",
        "href": "https://artuk.org/discover/artworks/the-gunpowder-plot-conspirators-272715",
        "image": {
          "src": "/covers/anti-ice-veteran-manhattan-fire--a5.png",
          "alt": "Contemporary 1605 engraving showing eight Gunpowder Plot conspirators, including Guy Fawkes, grouped together in cloaks and hats",
          "credit": "Crispijn de Passe the Elder, The Gunpowder Plot Conspirators, c.1605 — National Portrait Gallery, London (public domain), via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "pablo-rochat-phoebe-bridgers-video",
    "headline": "Pablo Rochat and Lance Oppenheim direct Phoebe Bridgers' medieval-themed 'Lost Boys' video shot in Atlanta",
    "overview": "Designer and animator Pablo Rochat co-directed, with filmmaker Lance Oppenheim, the new music video for Phoebe Bridgers' single 'Lost Boys,' turning suburban Atlanta into a surreal Renaissance faire where Bridgers appears as an elven queen among motorcycle-riding knights. The dreamlike visuals, intercut with vintage RuneScape game footage, were shot in Atlanta using a local crew and cast. 'Lost Boys' is the first single from Bridgers' album 'Lost Weekend,' due August 14, 2026.",
    "genre": "Culture",
    "sources": [
      {
        "name": "It's Nice That",
        "href": "https://www.itsnicethat.com/articles/pablo-rochat-lost-boys-film-animation-project-210726"
      },
      {
        "name": "Rolling Stone",
        "href": "https://www.rollingstone.com/music/music-news/phoebe-bridgers-lost-boys-new-song-1235582808/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-21",
    "image": {
      "src": "/covers/pablo-rochat-phoebe-bridgers-video.png",
      "alt": "Performers in medieval costume at a Renaissance faire",
      "credit": "Jousting at the Sterling Renaissance Festival, New York. U.S. Department of Transportation / U.S. National Archives (public domain), via Wikimedia Commons."
    },
    "rank": 39,
    "edition": "Morning Edition · 21 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Windsor tilts and the founding of the Order of the Garter",
        "excerpt": "St. George's Day drew near, when the grand feast was to be celebrated at the castle of Windsor. The king had made great preparations for it; and there were earls, barons, ladies, and damsels most nobly entertained. The festivities and tilts lasted a fortnight. Many knights came to them from beyond sea, from Flanders, Hainault, and Brabant, but not one from France.",
        "source": "Jean Froissart, Chronicles (late 14th century), trans. Thomas Johnes, in The Boy's Froissart, ed. Sidney Lanier (1879)",
        "href": "https://www.gutenberg.org/cache/epub/61710/pg61710.txt",
        "image": {
          "src": "/covers/pablo-rochat-phoebe-bridgers-video--a0.png",
          "alt": "A medieval manuscript miniature of two armoured knights jousting on horseback with lances before a crowd",
          "credit": "Miniature of a joust from Froissart's Chronicles (Bruges, 1470-1475). British Library, Harley MS 4379, f.19v. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Eglinton Tournament of 1839",
        "excerpt": "In August 1839 Archibald Montgomerie, the 13th Earl of Eglinton, staged a full medieval tournament in the park of his Ayrshire castle, with knights in real armour jousting in the lists before tens of thousands of spectators, many of them in period costume. The pageant was the most spectacular expression of the Victorian romantic revival of chivalry, inspired by the novels of Sir Walter Scott. It is best remembered because torrential rain turned the day into a mudbath, forcing the knights and their heralds to shelter under umbrellas.",
        "source": "The Eglinton Tournament, contemporary account (John Richardson, published c. 1843)",
        "href": "https://archive.org/details/eglintontourname00rich",
        "image": {
          "src": "/covers/pablo-rochat-phoebe-bridgers-video--a1.png",
          "alt": "A 19th-century print of costumed knights fighting on horseback in the melee at the Eglinton Tournament",
          "credit": "James Henry Nixon, 'The Melee, Eglinton Tournament' (1839). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The oath of the Knights of the Round Table",
        "excerpt": "then the king stablished all his knights, and them that were of lands not rich he gave them lands, and charged them never to do outrageousity nor murder, and always to flee treason; also, by no means to be cruel, but to give mercy unto him that asketh mercy, upon pain of forfeiture of their worship and lordship of King Arthur for evermore; and always to do ladies, damosels, and gentlewomen succour, upon pain of death. … Unto this were all the knights sworn of the Table Round, both old and young. And every year were they sworn at the high feast of Pentecost.",
        "source": "Sir Thomas Malory, Le Morte d'Arthur (1485), Book III, ch. XV",
        "href": "https://www.gutenberg.org/files/1251/1251-h/1251-h.htm",
        "image": {
          "src": "/covers/pablo-rochat-phoebe-bridgers-video--a2.png",
          "alt": "Aubrey Beardsley ink drawing of the Lady of the Lake telling Arthur of the sword Excalibur",
          "credit": "Aubrey Beardsley, 'The Lady of the Lake telleth Arthur of the sword Excalibur' (1893-94), from J. M. Dent's Le Morte Darthur. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Redcrosse Knight rides for the Faerie Queene",
        "excerpt": "A Gentle Knight was pricking on the plaine,\nY cladd in mightie armes and siluer shielde,\nWherein old dints of deepe wounds did remaine,\nThe cruell markes of many'a bloudy fielde;\nYet armes till that time did he neuer wield:\nHis angry steede did chide his foming bitt,\nAs much disdayning to the curbe to yield:\nFull iolly knight he seemd, and faire did sitt,\nAs one for knightly giusts and fierce encounters fitt.",
        "source": "Edmund Spenser, The Faerie Queene (1590), Book I, Canto I, stanza 1",
        "href": "https://www.gutenberg.org/files/6930/6930.txt",
        "image": {
          "src": "/covers/pablo-rochat-phoebe-bridgers-video--a3.png",
          "alt": "Walter Crane painting of the female knight Britomart in armour, from Spenser's The Faerie Queene",
          "credit": "Walter Crane, 'Britomart' (1900), the lady-knight of Spenser's The Faerie Queene. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Accolade",
        "excerpt": "A queen in a shimmering white gown lays a sword upon the shoulder of a kneeling knight, dubbing him in a hushed medieval courtyard. Painted in 1901 by the English artist Edmund Blair Leighton, the picture distils the Victorian and Edwardian romance of chivalry into a single ceremonial gesture. It became one of the era's most reproduced images of knighthood and the idealised bond between a lady and her champion.",
        "source": "Edmund Blair Leighton, oil on canvas (1901)",
        "href": "https://commons.wikimedia.org/wiki/File:Accolade_by_Edmund_Blair_Leighton.jpg",
        "image": {
          "src": "/covers/pablo-rochat-phoebe-bridgers-video--a4.png",
          "alt": "Painting of a queen in a white gown knighting a kneeling armoured knight with a sword",
          "credit": "Edmund Blair Leighton, 'The Accolade' (1901). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Beguiling of Merlin",
        "excerpt": "The Pre-Raphaelite painter Edward Burne-Jones shows the enchantress Nimue casting a spell over the wizard Merlin, who lies helpless among blossoming hawthorn as she reads from a book of magic. Painted between 1872 and 1877, it is a defining image of the Pre-Raphaelite medieval revival, steeped in Arthurian legend. The work embodies the Victorian dream of an enchanted Middle Ages of sorcery, beauty and doom.",
        "source": "Edward Burne-Jones, oil on canvas (1872-1877), Lady Lever Art Gallery, Liverpool",
        "href": "https://commons.wikimedia.org/wiki/File:The_Beguiling_of_Merlin_by_Edward_Burne-Jones.jpg",
        "image": {
          "src": "/covers/pablo-rochat-phoebe-bridgers-video--a5.png",
          "alt": "Pre-Raphaelite painting of the enchantress Nimue casting a spell over Merlin amid flowering hawthorn",
          "credit": "Edward Burne-Jones, 'The Beguiling of Merlin' (1872-1877), Lady Lever Art Gallery. Public domain via Wikimedia Commons."
        }
      }
    ]
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
