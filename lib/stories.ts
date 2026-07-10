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
// the Evening Edition of 10 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Afternoon Edition of 10 July 2026 and the Morning Edition of 10 July 2026.
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
    "slug": "eu-meta-addictive-design-dsa",
    "headline": "EU finds Facebook and Instagram in breach of digital rules over 'addictive' design",
    "overview": "The European Commission said on July 10, 2026 that the 'addictive' design of Facebook and Instagram - features such as infinite scroll, autoplay and engagement-driven recommendations - breaches the Digital Services Act by failing to protect users' mental and physical wellbeing. Regulators told Meta to disable the features by default, add screen-time breaks and retune its algorithms, warning that a final non-compliance ruling could bring fines of up to 6% of global annual turnover, more than $12 billion. Meta said it disagreed with the preliminary findings, pointing to the teen-account protections it has already rolled out.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPRUxQS2dYSG5aVnI1cDJONzVVWURrcEE3MzhOZE5VaDBOTGgtR3RHWVAydDVlTUJTSVBDd01TMFp1ZGFiNV9aYXVsMW1hX2ZaamlVcUZQZHlOV3gwcjdXcHJTY2sxY1JOQVRZWGc0SlhXZHJ1M01rUTlkTDkzOFZrUWZNQWlLZGR5b1JHUjFvM0t1LW5NY2ZNUE5EZzJmVHRmc3A1Qmg4MzhQZVpDSlE?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/10/meta-instagram-facebook-addictive-design-breach-eu-laws.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/eu-meta-addictive-design-dsa.png",
      "alt": "The Meta Platforms headquarters sign at Menlo Park, California.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Alypius drunk on the arena: Augustine on a mind captured by spectacle (Confessions, Book VI, c. 397-400 AD)",
        "excerpt": "For, directly he saw that blood, he therewith imbibed a sort of savageness; nor did he turn away, but fixed his eye, drinking in madness unconsciously, and was delighted with the guilty contest, and drunken with the bloody pastime. Nor was he now the same he came in, but was one of the throng he came unto, and a true companion of those who had brought him there. Why need I say more? He looked, shouted, was excited, carried away with him the madness which would stimulate him to return, not only with those who first enticed him, but also before them, yea, and to draw in others.",
        "source": "Augustine of Hippo, Confessions, Book VI, Chapter 8 (trans. J. G. Pilkington), New Advent / Christian Classics.",
        "href": "https://www.newadvent.org/fathers/110106.htm"
      },
      {
        "category": "historical",
        "title": "A king moves against a seductive new habit: James I, 'A Counterblaste to Tobacco' (1604)",
        "excerpt": "A custome lothsome to the eye, hatefull to the Nose, harmefull to the braine, dangerous to the Lungs, and in the blacke stinking fume thereof, neerest resembling the horrible Stigian smoke of the pit that is bottomelesse.",
        "source": "King James I of England, A Counterblaste to Tobacco (1604), Wikisource.",
        "href": "https://en.wikisource.org/wiki/A_Counterblaste_to_Tobacco"
      },
      {
        "category": "literary",
        "title": "The Lotus-Eaters: engineered forgetting of home (Homer, Odyssey, Book 9)",
        "excerpt": "And whosoever of them ate of the honey-sweet fruit of the lotus, had no longer any wish to bring back word or to return, but there they were fain to abide among the Lotus-eaters, feeding on the lotus, and forgetful of their homeward way. These men, therefore, I brought back perforce to the ships, weeping, and dragged them beneath the benches and bound them fast in the hollow ships;",
        "source": "Homer, Odyssey 9.94-100 (trans. A. T. Murray, Loeb Classical Library), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D9%3Acard%3D82"
      },
      {
        "category": "literary",
        "title": "'Thou hast the keys of Paradise': De Quincey praises and dreads the drug (Confessions of an English Opium-Eater, 1821)",
        "excerpt": "Oh, just, subtle, and mighty opium! that to the hearts of poor and rich alike, for the wounds that will never heal, and for \"the pangs that tempt the spirit to rebel,\" bringest an assuaging balm; eloquent opium! that with thy potent rhetoric stealest away the purposes of wrath; and to the guilty man for one night givest back the hopes of his youth, and hands washed pure from blood;",
        "source": "Thomas De Quincey, Confessions of an English Opium-Eater (1821), Project Gutenberg (eBook #2040).",
        "href": "https://www.gutenberg.org/files/2040/2040-h/2040-h.htm"
      },
      {
        "category": "artistic",
        "title": "Music of engineered intoxication: Berlioz, 'Symphonie fantastique' (Episode in the Life of an Artist), 1830",
        "excerpt": "Ayant acquis la certitude que son amour est méconnu, l'artiste s'empoisonne avec de l'opium. La dose de narcotique, trop faible pour lui donner la mort, le plonge dans un sommeil accompagné des plus horribles des visions.",
        "source": "Hector Berlioz, programme of the Symphonie fantastique: Épisode de la vie d'un artiste, H. 48 (1830); programme text via Bibliothèque nationale de France (BnF), Les Essentiels. Full public-domain score: IMSLP / Petrucci Music Library (Symphonie fantastique, H. 48).",
        "href": "https://essentiels.bnf.fr/fr/extrait/cda017ec-36b6-4f13-be55-25ad0802899d-programme-la-symphonie-fantastique"
      },
      {
        "category": "artistic",
        "title": "Hogarth's 'Gin Lane' (1751): a city undone by cheap intoxication, and the law that answered it",
        "excerpt": "A public-domain engraving made to rally support for the Gin Act of 1751. Hogarth crowds the scene with the ruin of a population hooked on cheap spirits: a stupefied mother lets her infant tumble from her arms, a gin-soaked corpse is coffined, buildings collapse, and only the pawnbroker and the distiller prosper. It is propaganda in copperplate, moralists and lawmakers marshalling public horror to curb a compulsion the market was busily manufacturing.",
        "source": "William Hogarth, Gin Lane, 1751, etching and engraving, National Gallery of Art, Washington (Rosenwald Collection).",
        "href": "https://www.nga.gov/artworks/30433-gin-lane",
        "image": {
          "src": "/covers/eu-meta-addictive-design-dsa--art.png",
          "alt": "Hogarth's 1751 engraving Gin Lane: a crowded, crumbling London street devastated by gin; in the foreground a drunken, sore-covered woman takes snuff while her baby falls from her arms, with a corpse, a pawnshop, and collapsing houses beyond.",
          "credit": "William Hogarth, Gin Lane, 1751; National Gallery of Art, Washington (Rosenwald Collection); via Wikimedia Commons (public domain)"
        }
      }
    ],
    "lead": true,
    "rank": 1
  },
  {
    "slug": "us-iran-ceasefire-over-talks",
    "headline": "US and Iran trade fresh strikes as Trump declares the ceasefire over but agrees to keep talking",
    "overview": "President Donald Trump said on July 10, 2026 that Washington had told Tehran 'in no uncertain terms' that the ceasefire was over, even as he confirmed the United States had agreed to Iran's request to continue talks. US and Iranian forces exchanged intensifying fire across the Middle East for a second straight day, with Qatari mediators shuttling to Tehran as diplomacy carried on behind the scenes.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxNQmZnOENNRXdELTloYWdZVG84OGRxcnFydXg5S1RNYWYyeTVkZGQ3XzkwV0hJdXRDNzBrSEp2ZUw2UkU5LVJkcWtyc0FXOHZkM1cwanhvaUFFM3g2WjJ6bkdHZmJVbE8zNGFneWF4VzM5VFdWcGNmUWo4VnljNktvSWJ3eE9XaThVZVVPM2NlQlhoUVh4T2E0cnJB?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNWU8weHNqWU10dDFxUGpMR3Z5LW0xVVVnTlNuU2ZBaWpXS0ZnbHQ4c3BENmZ2QVZMZ0VLWmIyUnU0NVM2Tkp4T0lONVM2NnF5cHluZWRxR3FkOXdsNEJoQ3I1VmV3a3hOcExFWll0Vkp2VUJKN2xpcU13US1lOEkxWE1CcEY2dWZGbUZ4TzZ3V0lYRUhLdC1CZjJNTDVJZVM2TDZpSUU0V0lQdkZn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/us-iran-ceasefire-over-talks.png",
      "alt": "An oil tanker ablaze at dusk in a narrow strait between two arid coastlines.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Peace of Nicias unravels: 'neither war nor peace' (Thucydides, History of the Peloponnesian War, Book V, 421 BC)",
        "excerpt": "Looked at by the light of facts it cannot, it will be found, be rationally considered a state of peace, where neither party either gave or got back all that they had agreed, apart from the violations of it which occurred on both sides in the Mantinean and Epidaurian wars and other instances",
        "source": "Thucydides, History of the Peloponnesian War, Book 5 (Richard Crawley translation, 1874), public domain.",
        "href": "https://classics.mit.edu/Thucydides/pelopwar.5.fifth.html"
      },
      {
        "category": "historical",
        "title": "Talking and fighting at once: the Panmunjom armistice talks, begun July 10, 1951",
        "excerpt": "For two years and seventeen days the guns never fell silent while negotiators bargained across a table at Panmunjom. Talks opened on July 10, 1951 (seventy-five years to the day before this story), yet both sides kept killing to gain leverage over the ink, hurling men at hills like Pork Chop even as the wording of a truce was haggled clause by clause. On the final morning of July 27, 1953, delegates signed to the sound of artillery still thundering in the distance, the perfect emblem of a peace pursued at gunpoint.",
        "source": "National Archives, 'Armistice Agreement for the Restoration of the South Korean State (1953)', Milestone Documents; General Records of the United States Government, Record Group 11.",
        "href": "https://www.archives.gov/milestone-documents/armistice-agreement-restoration-south-korean-state"
      },
      {
        "category": "literary",
        "title": "Pandarus's arrow shatters the sworn truce (Homer, Iliad, Book IV)",
        "excerpt": "He laid the notch of the arrow on the oxhide bowstring, and drew both notch and string to his breast till the arrow-head was near the bow; then when the bow was arched into a half-circle he let fly, and the bow twanged, and the string sang as the arrow flew gladly on over the heads of the throng… The Trojans have trampled on their oaths and have wounded you; nevertheless the oath, the blood of lambs, the drink-offerings and the right hands of fellowship in which have put our trust shall not be vain.",
        "source": "Homer, The Iliad, Book 4 (Samuel Butler translation, 1898), public domain; Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0217:book=4"
      },
      {
        "category": "literary",
        "title": "A truce kept in word, broken in deed: Prince John at Gaultree Forest (Shakespeare, Henry IV, Part 2, Act 4, Scene 2)",
        "excerpt": "I promised you redress of these same grievances\nWhereof you did complain; which, by mine honour,\nI will perform with a most Christian care.\nBut for you, rebels, look to taste the due\nMeet for rebellion and such acts as yours.\n…\nStrike up our drums, pursue the scatter'd stray:\nGod, and not we, hath safely fought to-day.\nSome guard these traitors to the block of death,\nTreason's true bed and yielder up of breath.",
        "source": "William Shakespeare, The Second Part of King Henry the Fourth, Act 4, Scene 2 (Moby/Complete Works, public domain); The Complete Works of William Shakespeare, MIT.",
        "href": "https://shakespeare.mit.edu/2henryiv/2henryiv.4.2.html"
      },
      {
        "category": "artistic",
        "title": "Haydn, Missa in tempore belli ('Mass in Time of War' / 'Paukenmesse'), Hob.XXII:9 (1796)",
        "excerpt": "Written at Eisenstadt in the anxious summer of 1796, as Austria mobilized against Napoleon's advancing armies, Haydn's mass literally scores the collision of war and the plea for peace. In the closing Agnus Dei, the choir's prayer 'Dona nobis pacem' — grant us peace — is stalked and interrupted by ominous military timpani and blaring trumpets, the drums that give the work its nickname. It is the sound of a congregation begging for a truce while the artillery answers back, peace and war sung in the same breath.",
        "source": "Joseph Haydn, Mass in C major, Hob.XXII:9 'Missa in tempore belli' (1796); scores in the public domain via IMSLP/Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Mass_in_C_major,_Hob.XXII:9_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya, The Third of May 1808 (El tres de mayo de 1808 en Madrid), 1814",
        "excerpt": "Goya painted the moment a fragile occupation-era calm gives way to slaughter: a faceless firing squad of French soldiers, rifles levelled in a rigid mechanical line, executes unarmed citizens of Madrid through the night. At the center a man in a white shirt throws his arms wide in a crucifixion pose, lit by a single lantern, while corpses already lie heaped in their own blood at his feet. It is the definitive image of what a broken peace looks like on the ground — not negotiation, but bodies against a wall.",
        "source": "Francisco de Goya, The Third of May 1808, 1814, oil on canvas; Museo Nacional del Prado, Madrid.",
        "href": "https://www.museodelprado.es/coleccion/obra-de-arte/el-3-de-mayo-en-madrid-o-los-fusilamientos/5e177409-2993-4240-97fb-847a02c6496c",
        "image": {
          "src": "/covers/us-iran-ceasefire-over-talks--art.png",
          "alt": "A night execution: a line of faceless French soldiers with rifles raised fires on a group of Madrid citizens; a kneeling man in a white shirt flings his arms wide beside a lantern, with the bloodied dead heaped in front of him.",
          "credit": "Francisco de Goya, The Third of May 1808 (El tres de mayo de 1808 en Madrid), 1814; Museo Nacional del Prado, Madrid; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "trump-refuses-housing-bill",
    "headline": "Trump says he will not sign a bipartisan housing bill, using it as leverage on election law",
    "overview": "President Donald Trump said on July 10, 2026 that he would not sign the bipartisan '21st Century ROAD to Housing Act', which cleared both chambers of Congress with broad support, in protest at the Senate's failure to advance his SAVE America Act requiring proof of citizenship to register to vote. Trump stopped short of a formal veto; without his signature or a veto the housing measure - which speeds construction permitting and limits investor purchases of single-family homes - becomes law automatically at midnight.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPTWtlTzFxYmlQaXNaZDN0U0NKdEhQbGoxTVBXRERicFc2UmpPcElFbU1jYXlUYXY4UWdzb1ZQbHBfaTJCbTNGb3hobkNzZzF0djRNLTdZbkRnbXNKcTJ0RzFaWTFYdGNXbE02MnNEaHQxS2dsWHpvQTBVRWZYeXQzcHN3VkUzRzZuWGFJalNOTUNMcXk0TGZoUQ?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/politics/trump-says-he-wont-sign-bipartisan-housing-affordability-bill"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/trump-refuses-housing-bill.png",
      "alt": "The United States Capitol at dusk.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Livy, on the creation of the tribunes of the plebs after the Secession to the Sacred Mount (494 BC), *Ab Urbe Condita* Book 2.33",
        "excerpt": "An agreement was arrived at, the terms being that the plebs should have its own magistrates, whose persons were to be inviolable, and who should have the right of affording protection against the consuls. Two 'tribunes of the plebs' were elected, C. Licinius and L. Albinus. These chose three colleagues.",
        "source": "Livy, *The History of Rome*, Book 2.33, trans. Rev. Canon Roberts (Perseus Digital Library, Tufts University)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0026%3Abook%3D2%3Achapter%3D33"
      },
      {
        "category": "historical",
        "title": "Andrew Jackson, Bank Veto Message returning the bill to the Senate, Washington, July 10, 1832",
        "excerpt": "WASHINGTON, July 10, 1832. To the Senate. The bill \"to modify and continue\" the act entitled \"An act to incorporate the subscribers to the Bank of the United States\" was presented to me on the 4th July instant. Having considered it with that solemn regard to the principles of the Constitution which the day was calculated to inspire, and come to the conclusion that it ought not to become a law, I herewith return it to the Senate, in which it originated, with my objections.",
        "source": "Andrew Jackson, Veto Message (July 10, 1832), The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/19th_century/ajveto01.asp"
      },
      {
        "category": "literary",
        "title": "Herman Melville, *Bartleby, the Scrivener: A Story of Wall Street* (1853), the first refusal",
        "excerpt": "Imagine my surprise, nay, my consternation, when without moving from his privacy, Bartleby in a singularly mild, firm voice, replied, \"I would prefer not to.\"",
        "source": "Herman Melville, *The Piazza Tales* (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/11231/11231-h/11231-h.htm"
      },
      {
        "category": "literary",
        "title": "Aristophanes, *Lysistrata* (411 BC): the women resolve to withhold themselves as leverage to force a peace",
        "excerpt": "By the two Goddesses, now can't you see / All we have to do is idly sit indoors / With smooth roses powdered on our cheeks, / Our bodies burning naked through the folds / Of shining Amorgos' silk, and meet the men / With our dear Venus-plats plucked trim and neat. / Their stirring love will rise up furiously, / They'll beg our arms to open. That's our time! / We'll disregard their knocking, beat them off— / And they will soon be rabid for a Peace.",
        "source": "Aristophanes, *Lysistrata*, trans. Jack Lindsay (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/7700/7700-h/7700-h.htm"
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, *Coriolan* Overture, Op. 62 (1807) — a musical portrait of the intransigent leader who will not yield",
        "excerpt": "Beethoven's terse C-minor overture, composed in 1807 for Heinrich Joseph von Collin's tragedy on Coriolanus, is music of ultimatum and refusal. Hammered unison C's and slashing chords set the will of the unbending man against the pleading, lyrical second theme; the drama is a standoff of assertion and entreaty. The music simply drains away at the close, the hard resolve dissolving rather than relenting.",
        "source": "Coriolan, Op.62 (Beethoven, Ludwig van) — IMSLP/Petrucci Music Library (public-domain scores)",
        "href": "https://imslp.org/wiki/Coriolan,_Op.62_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Cesare Maccari, *Cicero Denounces Catiline* (Cicerone denuncia Catilina), fresco, 1888",
        "excerpt": "Maccari's Senate fresco stages a legislative confrontation as raw political theatre: Cicero rises to denounce, arm outstretched, while Catiline sits alone on an empty bench, isolated and shunned by the ranked senators. The chamber becomes an arena where assent is granted or withheld and a single figure is held hostage to the collective will. The composition freezes the instant of brinkmanship, before the body decides whether to act.",
        "source": "Cesare Maccari, *Cicero Denounces Catiline* (1888), Palazzo Madama, Rome — via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Cicero_Denounces_Catiline_in_the_Roman_Senate_by_Cesare_Maccari_-_3.jpg",
        "image": {
          "src": "/covers/trump-refuses-housing-bill--art.png",
          "alt": "Fresco of the ancient Roman Senate: Cicero stands at right, arm extended, denouncing Catiline, who sits alone and isolated on a lower bench at left while rows of togaed senators lean away from him.",
          "credit": "Cesare Maccari, Cicero Denounces Catiline (Cicerone denuncia Catilina), 1888; Palazzo Madama, Rome; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "china-helium-export-ban",
    "headline": "China imposes a temporary ban on helium exports as Middle East tensions strain supplies",
    "overview": "China's commerce ministry and customs administration announced an immediate temporary ban on helium exports on July 10, 2026, citing supply strains as renewed US-Iran conflict threatens shipments through the Strait of Hormuz and a major Qatari facility. Helium is critical to semiconductor manufacturing, fibre optics and quantum research; China itself imports most of its supply, and the order named no exemptions, implying it applies to all overseas shipments.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxNc3JNM3pfZEJxTV9oX1JMNXdpSzJ5a2NvTFBNZXBHUWpLMnEyM3BqYjNEcDg0WGZsZGhSaktsODR1di1NbU56SzJRZ2NmcXloY3p1MURESl8xS3NFTDRaYkFLZ3VLQU40X0Rwb0V1amJPRE1BVmdLZmJEc29YVjB0d1FQTFgzZWFSekwxRzE0aDFaeDlUZWlsNkpUcUNuNWM?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://www.scmp.com/economy/china-economy/article/3360114/china-announces-temporary-ban-helium-exports"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/china-helium-export-ban.png",
      "alt": "A technician holds a twelve-inch silicon wafer of the kind whose manufacture depends on helium.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Megarian Decree, Athens' embargo on Megara (c. 432 BC), in Aristophanes' Acharnians (staged 425 BC)",
        "excerpt": "But now some young drunkards go to Megara and carry off the harlot Simaetha; the Megarians, hurt to the quick, run off in turn with two harlots of the house of Aspasia; and so for three whores Greece is set ablaze. Then Pericles, aflame with ire on his Olympian height, let loose the lightning, caused the thunder to roll, upset Greece and passed an edict, which ran like the song, 'That the Megarians be banished both from our land and from our markets and from the sea and from the continent.' Meanwhile the Megarians, who were beginning to die of hunger, begged the Lacedaemonians to bring about the abolition of the decree, of which those harlots were the cause; several times we refused their demand; and from that time there was horrible clatter of arms everywhere.",
        "source": "Aristophanes, The Acharnians (trans. The Athenian Society), The Internet Classics Archive (MIT)",
        "href": "https://classics.mit.edu/Aristophanes/acharnians.html"
      },
      {
        "category": "historical",
        "title": "The Arab (OPEC/OAPEC) oil embargo, October 1973 - March 1974",
        "excerpt": "In October 1973 the Arab members of OPEC cut production and cut off petroleum shipments to the United States and other nations that had backed Israel in the Yom Kippur War, wielding a strategic commodity as an instrument of coercion. Within months the price of a barrel of crude roughly quadrupled, exposing how dependence on a single chokepoint supply could be turned into geopolitical leverage overnight. Gas lines, rationing, and the threat of recession followed, and the embargo reset the balance of power between producer states and the industrial economies they fueled.",
        "source": "U.S. Department of State, Office of the Historian, \"Oil Embargo, 1973-1974\"",
        "href": "https://history.state.gov/milestones/1969-1976/oil-embargo"
      },
      {
        "category": "literary",
        "title": "Joseph corners the grain of Egypt during the famine, Genesis 41 & 47 (King James Version, 1611)",
        "excerpt": "And Joseph gathered corn as the sand of the sea, very much, until he left numbering; for it was without number. ... And Joseph opened all the storehouses, and sold unto the Egyptians. ... And all countries came into Egypt to Joseph for to buy corn; because that the famine was so sore in all lands. ... And Joseph gathered up all the money that was found in the land of Egypt, and in the land of Canaan, for the corn which they bought.",
        "source": "The Holy Bible, King James Version, Genesis 41:49, 41:56-57 and 47:14 (eBible.org)",
        "href": "https://ebible.org/kjv/GEN41.htm"
      },
      {
        "category": "literary",
        "title": "Curtis Jadwin corners the Chicago wheat market, in Frank Norris's The Pit: A Story of Chicago (1903), Chapter IX",
        "excerpt": "There was no wheat on the Chicago market. He, the great man, the 'Napoleon of La Salle Street,' had it all. He sold it or hoarded it, as suited his pleasure. ... He dictated the price to those men who must buy it of him to fill their contracts. His hand was upon the indicator of the wheat dial of the Board of Trade, and he moved it through as many or as few of the degrees of the circle as he chose.",
        "source": "Frank Norris, The Pit: A Story of Chicago (1903), Standard Ebooks",
        "href": "https://standardebooks.org/ebooks/frank-norris/the-pit/text/chapter-9"
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Joseph and his Brethren, HWV 59 (composed 1743; premiered 2 March 1744), libretto by James Miller",
        "excerpt": "The seven fat cattle, and full ears of corn, / Denote seven years of plenty. The like seven / Of meagre kind, and unreplenish'd grain, / Mark the same years of famine to succeed.",
        "source": "G. F. Handel, Joseph and his Brethren, HWV 59 (1744); libretto by James Miller; full scores in the public domain at IMSLP",
        "href": "https://imslp.org/wiki/Joseph_and_his_Brethren,_HWV_59_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Harvesters (1565), The Metropolitan Museum of Art",
        "excerpt": "Under a hazy August sky, peasants scythe and bind a vast field of ripe wheat while others rest and eat beneath a tree, the gathered sheaves stacked like ingots of a precious substance. Painted for an Antwerp merchant-banker, the scene turns the grain harvest into an image of accumulated wealth and stored plenty, the vital resource being reaped, bundled, and laid by. It is a portrait of the moment a life-sustaining commodity passes from open field into private control.",
        "source": "Pieter Bruegel the Elder, The Harvesters (1565), oil on wood, accession 19.164, The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/435809",
        "image": {
          "src": "/covers/china-helium-export-ban--art.png",
          "alt": "A sweeping late-summer landscape of golden wheat fields; peasants cut and bundle the grain into sheaves while others rest and eat under a pear tree, with a village, church, and distant sea beyond.",
          "credit": "Pieter Bruegel the Elder, The Harvesters, 1565; The Metropolitan Museum of Art, New York; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "hasina-december-return-surrender",
    "headline": "Bangladesh's ousted leader Sheikh Hasina says she will return in December to surrender in court",
    "overview": "Sheikh Hasina, Bangladesh's 78-year-old former prime minister, told Reuters in an interview published on July 10, 2026 that she plans to return from exile in India in December alongside senior Awami League colleagues and surrender in court, calling the proceedings against her 'farcical'. Hasina, sentenced to death in absentia after last year's uprising, said she had urged other condemned party members to join her and acknowledged she could be arrested or killed on her return.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxPVDVhX3VqUkM1cjdNT1ZPVHJaLTVjOV9vYW5tQjdJOHp5QVR5bEt4UGxVWDZucnJKT0kzZGgtSnIzZ2VLVnFaWF82UTVhb0FfamxtWF90Wkd5SG5kQnVMT1BWQkhxNHFiZ2xQTGo5cE04aGMzbi1KUmEzeEVVT3dESlI1YVRRVk1uZ2JsQUNaaXM5SHJIM2xqUUt5b1Z4SjAydjByYVNtTG14dk1BXzhhUkd2c3RmN0lDQmltUUU2MC1zTjRIbnc?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/10/condemned-ex-pm-hasina-plans-december-return-to-bangladesh"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/hasina-december-return-surrender.png",
      "alt": "Former Bangladeshi prime minister Sheikh Hasina.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Marcus Atilius Regulus returns to Carthage to face torture (c. 250 BC), recounted in Cicero, De Officiis I.39 (44 BC)",
        "excerpt": "when he was taken prisoner by the Carthaginians, he was sent to Rome on parole to negotiate an exchange of prisoners; he came and, in the first place, it was he that made the motion in the senate that the prisoners should not be restored; and in the second place, when his relatives and friends would have kept him back, he chose to return to a death by torture rather than prove false to his promise, though given to an enemy.",
        "source": "Cicero, De Officiis, trans. Walter Miller (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/47001/47001-h/47001-h.htm"
      },
      {
        "category": "historical",
        "title": "King Charls His Speech Made upon the Scaffold at Whitehall-Gate, 30 January 1649",
        "excerpt": "I Am the Martyr of the People. ... I go from a corruptible, to an incorruptible Crown; where no disturbance can be, no disturbance in the World.",
        "source": "King Charls His Speech Made upon the Scaffold (London, 1649), Project Canterbury / anglicanhistory.org",
        "href": "https://anglicanhistory.org/charles/charles1.html"
      },
      {
        "category": "literary",
        "title": "Sophocles, Antigone, lines 450–460 (441 BC), trans. R. C. Jebb",
        "excerpt": "Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods. ... Die I must, that I knew well (how could I not?). That is true even without your edicts.",
        "source": "Sophocles, Antigone (Perseus Digital Library, Tufts)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "Plato, Crito (c. 360 BC), the Laws of Athens speaking, trans. Benjamin Jowett",
        "excerpt": "Any one who does not like us and the city, and who wants to emigrate to a colony or to any other city, may go where he likes, retaining his property. But he who has experience of the manner in which we order justice and administer the state, and still remains, has entered into an implied contract that he will do as we command him.",
        "source": "Plato, Crito, trans. Benjamin Jowett (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1657/pg1657.txt"
      },
      {
        "category": "artistic",
        "title": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 (1791, unfinished)",
        "excerpt": "Introitus — Kyrie — Dies irae — Tuba mirum — Rex tremendae — Recordare — Confutatis — Lacrimosa — Domine Jesu Christe — Hostias et preces — Sanctus — Benedictus — Agnus Dei — Communio (Lux aeterna). The sequence sets the Day of Wrath and Judgment, the soul standing to answer for its deeds; Mozart's Requiem was unfinished at the time of his death.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "Paul Delaroche, The Execution of Lady Jane Grey (1833)",
        "excerpt": "Blindfolded and robed in white, the young deposed queen kneels on the black-draped scaffold and gropes for the execution block, steadied by a sympathetic official as the axeman waits at her side. Delaroche freezes the instant before the fatal stroke: youth, dignity, and defenselessness meeting a doom the sitter has resolved to accept. The composition turns a political downfall into an image of martyrdom composed and unflinching before death.",
        "source": "Paul Delaroche, National Gallery, London (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:PAUL_DELAROCHE_-_Ejecuci%C3%B3n_de_Lady_Jane_Grey_(National_Gallery_de_Londres,_1834).jpg",
        "image": {
          "src": "/covers/hasina-december-return-surrender--art.png",
          "alt": "A blindfolded young woman in a white gown kneels on a scaffold and reaches for the execution block, guided by an official, with an axeman standing ready against a dark background.",
          "credit": "Paul Delaroche, The Execution of Lady Jane Grey, 1833, National Gallery, London; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "volkswagen-deliveries-drop-brand-cuts",
    "headline": "Volkswagen deliveries fall 8.6% on a China slump as it plans to halve its model line-up",
    "overview": "Volkswagen said on July 10, 2026 that global deliveries fell 8.6% in the second quarter, dragged down by a 36.6% plunge in China where domestic rivals have gained ground, with the core VW brand down 14%, Audi down 8% and Porsche down 18%. The German group said its multi-year 'fundamental realignment' had reached a new phase, announcing plans to cut the number of models by up to half; gains in North America and Western Europe offset part of the decline.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxPRjdBWXBNTThwdmdOV3VXd1F6Q1dmR0I0OUxSV2JxZ3pOQlRoTmFEVUlHU2djQWdONzFIOE9BRVhkcnNzQ2k3SHdpcEFza1NFanIwblZSY184Z3B6Rk8zWThtbTVJTE45RllvUW1fb0FVa2xFRWtqRk0wdmx4TWVSOUZLT3BxdktLaWZQdVNJYldGREd3cnkyX2l2SEFTUTg0MFE?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxNTHJJWUNnNjEzQnBvdjlaMDU0OWRPUUJSRTREVzJrMGFCRzdVaURXbTl2eDdEeXg4ZXVOMEI3ejdaUU9NTTZqWkdncC1nSHRiR0hBaEs3M0k1OFdOejVxMlRYZDhMODI2U3pvX0hWTzA3NGxrQTZBV25uSENEcFZTNVB4amtKQkVGRUgxWDFkVlEyV2pC?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/volkswagen-deliveries-drop-brand-cuts.png",
      "alt": "The Volkswagen factory at Wolfsburg, Germany.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire — \"General Observations on the Fall of the Roman Empire in the West\" (1781)",
        "excerpt": "The decline of Rome was the natural and inevitable effect of immoderate greatness. Prosperity ripened the principle of decay; the causes of destruction multiplied with the extent of conquest; and, as soon as time or accident had removed the artificial supports, the stupendous fabric yielded to the pressure of its own weight. The story of its ruin is simple and obvious; and, instead of inquiring why the Roman empire was destroyed, we should rather be surprised that it had subsisted so long.",
        "source": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire (1781); classical antiquity",
        "href": "https://faculty.georgetown.edu/jod/texts/gibbon.fall.html"
      },
      {
        "category": "historical",
        "title": "John Ruskin, The Stones of Venice, Vol. I, Ch. I \"The Quarry\" (1851)",
        "excerpt": "Since the first dominion of men was asserted over the ocean, three thrones, of mark beyond all others, have been set upon its sands: the thrones of Tyre, Venice, and England. Of the First of these great powers only the memory remains; of the Second, the ruin; the Third, which inherits their greatness, if it forget their example, may be led through prouder eminence to less pitied destruction.",
        "source": "John Ruskin, The Stones of Venice, Volume I (1851); the decline of Venice, the early-modern maritime trading empire",
        "href": "https://www.gutenberg.org/files/30754/30754-h/30754-h.htm"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (1819)",
        "excerpt": "I met a traveller from an antique land\nWho said: Two vast and trunkless legs of stone\nStand in the desart. Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them and the heart that fed:\nAnd on the pedestal these words appear:\n\"My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!\"\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" in Rosalind and Helen, A Modern Eclogue; With Other Poems (1819); via Wikisource",
        "href": "https://en.wikisource.org/wiki/Rosalind_and_Helen,_A_Modern_Eclogue_(1819)/Sonnet"
      },
      {
        "category": "literary",
        "title": "Aesop, \"The Oak and the Reeds\" (V. S. Vernon Jones translation, 1912)",
        "excerpt": "An Oak that grew on the bank of a river was uprooted by a severe gale of wind, and thrown across the stream. It fell among some Reeds growing by the water, and said to them, \"How is it that you, who are so frail and slender, have managed to weather the storm, whereas I, with all my strength, have been torn up by the roots and hurled into the river?\" \"You were stubborn,\" came the reply, \"and fought against the storm, which proved stronger than you: but we bow and yield to every breeze, and thus the gale passed harmlessly over our heads.\"",
        "source": "Aesop's Fables, trans. V. S. Vernon Jones (1912); via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Götterdämmerung (Twilight of the Gods), WWV 86D — first performed 1876",
        "excerpt": "IMSLP catalog, verbatim: work title \"Götterdämmerung, WWV 86D\" (Wagner, Richard), alternative title \"Twilight of the Gods\"; Movements/Sections \"3 acts\"; First Performance \"1876/08/17\"; First Publication \"1876.\" The concluding music-drama of Der Ring des Nibelungen stages the fall of the old ruling order: the gods' fortress of Valhalla is consumed by fire and a new age dawns — the collapse sealed by the great \"Siegfried's Funeral March.\" Its very title names the theme of the once-supreme power passing into twilight.",
        "source": "Richard Wagner, Götterdämmerung, WWV 86D (composed 1848–74, premiered Bayreuth 1876); public-domain scores via IMSLP",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, The Course of Empire: Destruction (1836)",
        "excerpt": "The fourth canvas of Cole's five-part cycle shows a once-magnificent imperial city at the height of its ruin: enemy soldiers pour across a shattered bridge, palaces burn, a headless colossus looms over the carnage, and citizens leap into a bloodied harbour beneath a storm-lit sky. The proud metropolis that had risen to \"Consummation\" is overwhelmed in a single afternoon by forces it could no longer master. Cole intended the series as a warning that no empire, however dominant, is exempt from decline and violent overthrow.",
        "source": "Thomas Cole, The Course of Empire: Destruction (1836), New-York Historical Society; via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg",
        "image": {
          "src": "/covers/volkswagen-deliveries-drop-brand-cuts--art.png",
          "alt": "A grand classical city engulfed in war and fire: soldiers storm a broken bridge, buildings burn and topple, a giant headless warrior statue stands amid the chaos, and terrified figures flee into a smoke-darkened harbour under a turbulent sky.",
          "credit": "Thomas Cole, The Course of Empire: Destruction, 1836, New-York Historical Society; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "uk-regulates-cloud-providers",
    "headline": "Britain brings Microsoft, Google, Amazon and Oracle cloud units under financial regulation",
    "overview": "The UK designated the cloud arms of Microsoft, Google, Amazon and Oracle as 'critical third parties' on July 10, 2026, placing them under the oversight of the Bank of England, the Prudential Regulation Authority and the Financial Conduct Authority from July 13. Regulators said banks' and insurers' growing reliance on a handful of cloud suppliers means an outage at one could ripple across the financial system, and the firms must show they can identify, manage and recover from disruptions.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxPTURGc0ZPdHY3WEU0TGdWcnJsZ3JGWXZuZzR1dmM2V1hLR1BneXMxZXp6aUJveVpNNTdhMUZ1Q0RUX245UENvLWw1MXFfMXpBQXZoNllqWVZURE4yUkxKb0k5SW84ZFVWUXZORkdqXzItUzlBWDg5X0lDTzduTm1pWUlmbjVjdGJkUVJ6NHlFVWNBZm81ejMxUDA0ZDMwQVN2cnIzdkNLc1lRNllsN1N1YUlsQkdLbmJGa19BVHdfSkV0V3A5UDVPN0xrbUtwN01XWFoySg?oc=5"
      },
      {
        "name": "Sharecast",
        "href": "https://www.sharecast.com/news/news-and-announcements/uk-to-regulate-cloud-service-providers-microsoft-google-amazon-and-oracle--22983512.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/uk-regulates-cloud-providers.png",
      "alt": "Rows of servers in a data centre.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tacitus, Annals, Book III.54 (c. AD 116): Rome's daily dependence on grain shipped from overseas provinces",
        "excerpt": "No one represents to the Senate that Italy requires supplies from abroad, and that the very existence of the people of Rome is daily at the mercy of uncertain waves and storms. And unless masters, slaves, and estates have the resources of the provinces as their mainstay, our shrubberies, forsooth, and our country houses will have to support us.",
        "source": "Tacitus, The Annals (Church and Brodribb translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_3"
      },
      {
        "category": "historical",
        "title": "Theodore Roosevelt, First Annual Message to Congress (December 3, 1901): federal supervision of the great interstate corporations",
        "excerpt": "Great corporations exist only because they are created and safeguarded by our institutions; and it is therefore our right and our duty to see that they work in harmony with these institutions. ... In the interest of the whole people the Nation should, without interfering with the power of the States in the matter itself, also assume power of supervision and regulation over all corporations doing an interstate business.",
        "source": "Theodore Roosevelt's First State of the Union Address (1901), Wikisource",
        "href": "https://en.wikisource.org/wiki/Theodore_Roosevelt%27s_First_State_of_the_Union_Address"
      },
      {
        "category": "literary",
        "title": "The Gospel of Matthew 7:24–27 (King James Version, 1611): the house built on rock versus the house built on sand",
        "excerpt": "Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock: And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell not: for it was founded upon a rock. And every one that heareth these sayings of mine, and doeth them not, shall be likened unto a foolish man, which built his house upon the sand: And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell: and great was the fall of it.",
        "source": "Bible (King James), Matthew, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "literary",
        "title": "Aesop, 'The Belly and the Members' (George Fyler Townsend translation, 1867)",
        "excerpt": "THE MEMBERS of the Body rebelled against the Belly, and said, 'Why should we be perpetually engaged in administering to your wants, while you do nothing but take your rest, and enjoy yourself in luxury and self-indulgence?' The Members carried out their resolve and refused their assistance to the Belly. The whole Body quickly became debilitated, and the hands, feet, mouth, and eyes, when too late, repented of their folly.",
        "source": "Aesop's Fables, translated by George Fyler Townsend, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/21/21-h/21-h.htm"
      },
      {
        "category": "artistic",
        "title": "Bedřich Smetana, Vltava (The Moldau), from Má vlast, JB 1:112/2 (composed 1874)",
        "excerpt": "Smetana's tone poem traces a single great river from two trickling springs, through forests, past a peasant wedding and moonlit water-nymphs, swelling into the broad current on which an entire nation's life, trade and cities depend. The whole land leans on one flowing artery, and the music makes audible both its grandeur and the peril of a channel through which everything must pass. The theme surges to a triumphant climax as the Vltava rolls majestically onward, an indispensable lifeline rendered in sound.",
        "source": "Vltava, JB 1:112/2 (Smetana), full orchestral score, IMSLP (public domain)",
        "href": "https://imslp.org/wiki/Vltava,_JB_1:112/2_(Smetana,_Bed%C5%99ich)"
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, Le Pont du Gard (1787), Musée du Louvre",
        "excerpt": "Robert monumentalises the first-century Roman aqueduct near Nîmes, its three tiers of arches striding across the Gardon valley to carry water fifty kilometres to a distant city. Tiny figures at the base of the piers measure the crushing scale of a piece of vital infrastructure on which a whole population's daily supply once depended. Painted for the crown among the 'principal monuments of France,' it presents indispensable public works as both an engineering marvel and an emblem of collective reliance.",
        "source": "File:Pont-du-gard-hubert-robert-1786.jpg, Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Pont-du-gard-hubert-robert-1786.jpg",
        "image": {
          "src": "/covers/uk-regulates-cloud-providers--art.png",
          "alt": "A vast three-tiered Roman aqueduct of golden stone arches spans a river valley beneath a luminous sky, with small human figures dwarfed at its base conveying the immense scale of the structure",
          "credit": "Hubert Robert, Le Pont du Gard, 1787, Musée du Louvre, Paris; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "circle-occ-trust-bank-approval",
    "headline": "Circle wins final US approval to open a national trust bank for its USDC stablecoin",
    "overview": "Stablecoin issuer Circle said on July 10, 2026 that it had received final approval from the US Office of the Comptroller of the Currency to establish First National Digital Currency Bank, N.A., operating as Circle National Trust. The federally regulated charter - a step toward bringing custody of the world's largest regulated stablecoin under national oversight - lifted Circle's shares, which rose about 10% in premarket trading.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxPd2VHNDFOeEhZci15NXdVa2QxY2pVQzBMX1BWbFVpOWRPVW1tRXVGVUZNekpEdlpDa2RyenhBVTliUXBVbHFUa3Z3TDBLaklidXkyQ2Vxakw1NUZFWWVhR3VUalpIbUZrcWdiNWl0OExtRmJCM19tMjRsQUpEd25UeXJpWXlxVnRMcktGZDhpaWZzQl9lRkM5QUt6SzdQVDVjY0RydTU0aWtSUWJKc0laZ2h4ZTN1ZGI1OWRrOUFoYkRXdkdGNWlUeQ?oc=5"
      },
      {
        "name": "Circle",
        "href": "https://www.circle.com/pressroom/circle-receives-final-occ-approval-to-establish-national-trust-bank"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/circle-occ-trust-bank-approval.png",
      "alt": "A glowing digital dollar coin sealed inside a vault of light.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus on the Lydians as the first coiners of gold and silver money, Histories, Book I.94 (5th century BC; G. C. Macaulay trans.)",
        "excerpt": "Now the Lydians have very nearly the same customs as the Hellenes … and they were the first of men, so far as we know, who struck and used coin of gold or silver; and also they were the first retail-traders.",
        "source": "Herodotus, The History of Herodotus, Book I (trans. G. C. Macaulay), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "historical",
        "title": "The founding of the Bank of England by charter, 1694 (from Macaulay, The History of England from the Accession of James II, Vol. IV, 1855)",
        "excerpt": "The plan was that twelve hundred thousand pounds should be borrowed by the government on what was then considered as the moderate interest of eight per cent. In order to induce capitalists to advance the money promptly on terms so favourable to the public, the subscribers were to be incorporated by the name of the Governor and Company of the Bank of England. The corporation was to have no exclusive privilege, and was to be restricted from trading in any thing but bills of exchange, bullion and forfeited pledges.",
        "source": "Thomas Babington Macaulay, The History of England from the Accession of James II, Volume IV, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2613/pg2613.txt"
      },
      {
        "category": "literary",
        "title": "Goethe, Faust, Part II, Act I, Scene IV — 'Pleasure-Garden' / the Paper-Money Scheme (completed 1832; Bayard Taylor trans., 1871)",
        "excerpt": "To all to whom this cometh, be it known:\nA thousand crowns in worth this note doth own.\nIt to secure, as certain pledge, shall stand\nAll buried treasure in the Emperor's land:\nAnd 't is decreed, perfecting thus the scheme,\nThe treasure, soon as raised, shall this redeem.",
        "source": "Johann Wolfgang von Goethe, Faust, Second Part (trans. Bayard Taylor), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Faust_(trans._Bayard_Taylor)/Act_I/IV"
      },
      {
        "category": "literary",
        "title": "Shakespeare, The Merchant of Venice, Act I, Scene 3 — Shylock's bond and the promise to pay (c. 1596–98)",
        "excerpt": "Go with me to a notary, seal me there\nYour single bond; and, in a merry sport,\nIf you repay me not on such a day,\nIn such a place, such sum or sums as are\nExpress'd in the condition, let the forfeit\nBe nominated for an equal pound\nOf your fair flesh, to be cut off and taken\nIn what part of your body pleaseth me.\n… ANTONIO: Content, i' faith: I'll seal to such a bond\nAnd say there is much kindness in the Jew.",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 3, MIT Shakespeare (public domain)",
        "href": "http://shakespeare.mit.edu/merchant/merchant.1.3.html"
      },
      {
        "category": "artistic",
        "title": "Charles Gounod, “Le veau d’or” (Song of the Golden Calf), from Faust, Act II (1859)",
        "excerpt": "Le veau d’or est toujours debout;\nOn encense\nSa puissance\nD’un bout du monde à l’autre bout!\nPour fêter l’infâme idole,\nPeuples et rois confondus,\nAu bruit sombre des écus\nDansent une ronde folle\nAutour de son piédestal?...\nEt Satan conduit le bal!",
        "source": "Charles Gounod, Faust (1859), libretto by Jules Barbier & Michel Carré; Méphistophélès’s “Le veau d’or”; Project Gutenberg (ebook 45806)",
        "href": "https://www.gutenberg.org/files/45806/45806-h/45806-h.htm"
      },
      {
        "category": "artistic",
        "title": "Quentin Massys (Metsys), The Moneylender and His Wife (Le prêteur et sa femme), 1514, Musée du Louvre",
        "excerpt": "At a cloth-covered table an Antwerp money-changer bends over his scales, weighing gold coins and pearls with delicate care, while beside him his wife pauses over an illuminated book of devotion showing the Virgin and Child. A convex mirror in the foreground catches a window, a distant figure, and the reflected world outside, and the shelves behind them hold weights, ledgers, and glinting metal. Massys turns the humble craft of assaying and lending into a meditation on value, faith, and the trust that makes a coin worth its weight.",
        "source": "Quentin Massys, The Moneylender and His Wife, 1514, Musée du Louvre, Paris (INV 1444; MR 821)",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010061690",
        "image": {
          "src": "/covers/circle-occ-trust-bank-approval--art.png",
          "alt": "A Renaissance money-changer weighs gold coins on a balance scale at a table while his wife, turning the pages of an illuminated devotional book, watches; coins, pearls, weights, and a small round mirror lie before them.",
          "credit": "Quentin Massys, The Moneylender and His Wife (Le prêteur et sa femme), 1514, Musée du Louvre, Paris; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "pentagon-uap-fourth-release",
    "headline": "Pentagon releases a fourth batch of declassified UFO files, including 19 videos",
    "overview": "The US Department of War published a fourth tranche of declassified UAP files on July 10, 2026 - 40 records, 19 of them videos - continuing the rolling releases begun in May under President Trump's transparency pledge. The batch includes a 2023 Yellow Sea clip whose sensor footage degrades over nearly five minutes and a 2020 Atlantic encounter matching long-rumoured video of a 'floating brain'-shaped object, all posted to a dedicated government website.",
    "genre": "Science",
    "sources": [
      {
        "name": "NBC News",
        "href": "https://www.nbcnews.com/science/ufos-and-anomalous-phenomena/ufo-uap-files-pentagon-release-trump-rcna344204"
      },
      {
        "name": "NewsNation",
        "href": "https://www.newsnationnow.com/space/ufo/pentagon-ufo-files-fourth-release/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/pentagon-uap-fourth-release.png",
      "alt": "A glowing unidentified orb hovering over a dark ocean at dusk.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder on burning shields and an ominous appearance in the heavens, Natural History Book II, chs. 34–35 (c. AD 77)",
        "excerpt": "A burning shield darted across at sunset, from west to east, throwing out sparks, in the consulship of L. Valerius and C. Marius. We have an account of a spark falling from a star, and increasing as it approached the earth, until it became of the size of the moon, shining as through a cloud; it afterwards returned into the heavens and was converted into a lampas; this occurred in the consulship of Cn. Octavius and C. Scribonius. It was seen by Silanus, the proconsul, and his attendants.",
        "source": "Pliny the Elder, The Natural History, Book II, chapters 34–35, trans. John Bostock & H. T. Riley (Perseus Digital Library, Tufts)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=2:chapter=35"
      },
      {
        "category": "historical",
        "title": "The 1952 Washington, D.C. 'flying saucer' flap, July 19–27, 1952",
        "excerpt": "On two consecutive summer weekends, unidentified blips swarmed the radar screens at Washington National Airport, hovering over the capital and the White House before darting away at impossible speeds; jet interceptors were scrambled and the objects vanished as the fighters closed in. Front pages screamed of saucers over Washington while the Air Force strained to blame temperature inversions, and a rattled CIA quietly convened a scientific panel to decide whether the lights were Soviet weapons, natural mirages, or something no one could name. It was a national lesson in how a democracy reacts when strange lights appear over its own seat of power and no official explanation quite satisfies.",
        "source": "Gerald K. Haines, 'The CIA's Role in the Study of UFOs, 1947–90,' Studies in Intelligence (Central Intelligence Agency, 1997)",
        "href": "https://www.cia.gov/resources/csi/studies-in-intelligence/studies-in-intelligence-1997/cias-role-in-the-study-of-ufos-1947-1990/"
      },
      {
        "category": "literary",
        "title": "H. G. Wells, The War of the Worlds, opening of Book I, ch. 1 'The Eve of the War' (1898)",
        "excerpt": "No one would have believed in the last years of the nineteenth century that this world was being watched keenly and closely by intelligences greater than man's and yet as mortal as his own; that as men busied themselves about their various concerns they were scrutinised and studied, perhaps almost as narrowly as a man with a microscope might scrutinise the transient creatures that swarm and multiply in a drop of water. With infinite complacency men went to and fro over this globe about their little affairs, serene in their assurance of their empire over matter. No one gave a thought to the older worlds of space as sources of human danger, or thought of them only to dismiss the idea of life upon them as impossible or improbable.",
        "source": "H. G. Wells, The War of the Worlds (1898), Project Gutenberg eBook #36",
        "href": "https://www.gutenberg.org/cache/epub/36/pg36.txt"
      },
      {
        "category": "literary",
        "title": "The vision of Ezekiel, a fire in the northern sky, Book of Ezekiel 1:4–7 (King James Version, 1611)",
        "excerpt": "And I looked, and, behold, a whirlwind came out of the north, a great cloud, and a fire infolding itself, and a brightness was about it, and out of the midst thereof as the colour of amber, out of the midst of the fire. Also out of the midst thereof came the likeness of four living creatures. And this was their appearance; they had the likeness of a man. And every one had four faces, and every one had four wings. And their feet were straight feet; and the sole of their feet was like the sole of a calf's foot: and they sparkled like the colour of burnished brass.",
        "source": "Bible (King James Version), Book of Ezekiel, chapter 1 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ezekiel"
      },
      {
        "category": "artistic",
        "title": "Josef Strauss, Sphärenklänge (Music of the Spheres), Walzer, Op. 235 (1868)",
        "excerpt": "Josef Strauss's concert waltz opens with a hushed, shimmering tremolo and a drifting melody meant to evoke the ancient idea of celestial harmony, the inaudible music that the turning heavens were once thought to make. Its title reaches back to the old dream that the sky is ordered and meaningful, that the lights above move to a design we might overhear if only we listened closely enough. Against a story of unreadable objects on a sensor screen, it stands for humanity's oldest instinct: to hear pattern and beauty, rather than dread, in the things that move overhead.",
        "source": "Josef Strauss, Sphärenklänge Walzer, Op. 235 (full score), International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/Sph%C3%A4renkl%C3%A4nge_Walzer,_Op.235_(Strauss,_Josef)"
      },
      {
        "category": "artistic",
        "title": "Hans Glaser, Celestial phenomenon over Nuremberg, 14 April 1561 (broadsheet, 1561)",
        "excerpt": "This hand-colored woodcut news-sheet reports that at dawn on 14 April 1561, the people of Nuremberg looked up to see the sky filled with globes, crosses, and blood-red, black, and blue cylindrical tubes out of which flew spheres, which seemed to battle one another before a great black spear-shaped object appeared and the whole spectacle fell burning to earth. The printed German text below the image frames the apparition as a divine sign and warning, urging citizens to repent, a vivid early-modern instance of witnesses straining to read meaning into unexplained shapes and lights in the sky. It survives as one of the most famous pre-modern 'UFO' documents, blending eyewitness wonder, dread, and the impulse to broadcast the strange sight as news.",
        "source": "Hans Glaser, broadsheet 'Himmelserscheinung über Nürnberg vom 14. April 1561,' Zentralbibliothek Zürich (Wickiana collection); via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Himmelserscheinung_%C3%BCber_N%C3%BCrnberg_vom_14._April_1561.jpg",
        "image": {
          "src": "/covers/pentagon-uap-fourth-release--art.png",
          "alt": "A 1561 colored woodcut showing the sky over Nuremberg crowded with black, red, and blue spheres, tall cylindrical tubes emitting more spheres, crosses, and a large dark spear-shaped object, all above the city's rooftops, depicting a mass aerial apparition witnessed by the townspeople.",
          "credit": "Hans Glaser, 'Celestial phenomenon over Nuremberg, 14 April 1561' (broadsheet woodcut, 1561), Zentralbibliothek Zürich; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "anthony-hopkins-composer-decca",
    "headline": "Anthony Hopkins, 88, signs a record deal as a composer with Decca Classics",
    "overview": "Two-time Oscar-winning actor Anthony Hopkins released his first classical single, 'Bracken Road', on July 10, 2026 after signing to Decca Classics. His debut album 'Life Is a Dream', out August 21, gathers orchestral works written across six decades and inspired by his childhood in south Wales, performed by conductor Gustavo Dudamel and the Philharmonia Orchestra. Hopkins, who learned the piano at four, called it 'the honour of a lifetime'.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNd29zU3Z3SXZTdk1Gb0V5cFVnRGVFQnhwSmJoYy1RYUxfYzZRRkJXblQ4ZjRlZEV3aW9EenF1dXl3MUpvc0VVVThBN2FGb1ZQZzQzNlEtdkZYNkZWMHhIZGxSNTBjVWFSNFRldmt2LUxuNHY0YVRONzNkYkV2VVpiUjZPVVN0Q3NXZm9ONFpyU2tJeGpfZU9FNTh5RGpDa21DV19jTHpXbw?oc=5"
      },
      {
        "name": "Variety",
        "href": "https://variety.com/2026/music/news/anthony-hopkins-decca-classics-life-is-a-dream-album-1236806236/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/anthony-hopkins-composer-decca.png",
      "alt": "Actor and composer Anthony Hopkins.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, Cato Maior de Senectute (On Old Age), §17 (44 BC)",
        "excerpt": "It is not by muscle, speed, or physical dexterity that great things are achieved, but by reflection, force of character, and judgement; in these qualities old age is usually not only not poorer, but is even richer.",
        "source": "Cicero, Cato Maior de Senectute, trans. William Armistead Falconer (1923); Perseus Digital Library (public domain)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2007.01.0039%3Asection%3D17"
      },
      {
        "category": "historical",
        "title": "Grandma Moses takes up painting in her late 70s (from c. 1938)",
        "excerpt": "Anna Mary Robertson 'Grandma Moses' was a Hudson Valley farm wife who had stitched pictures in wool for pleasure until arthritis stiffened her hands; only in her late seventies did she switch to a brush and begin painting the rural scenes she remembered. Discovered in a drugstore window in 1938 and given a New York solo show, 'What a Farmwife Painted,' in 1940, she became a national celebrity in her nineties and painted almost daily until she died at 101, living proof that a hidden gift can flower at the very end of a long life.",
        "source": "Bennington Museum, 'Grandma Moses' (holds the largest public collection of her work)",
        "href": "https://benningtonmuseum.org/portfolio-items/grandma-moses/"
      },
      {
        "category": "literary",
        "title": "Pedro Calderón de la Barca, La vida es sueño, Jornada II — Segismundo's soliloquy (1635)",
        "excerpt": "Yo sueño que estoy aquí\nDestas prisiones cargado,\nY soñé que en otro estado\nMas lisonjero me vi.\n¿Qué es la vida? — Un frenesí.\n¿Qué es la vida? — Una ilusión,\nUna sombra, una ficción,\nY el mayor bien es pequeño:\nQue toda la vida es sueño,\nY los sueños sueño son.",
        "source": "Pedro Calderón de la Barca, La vida es sueño (1635); Wikisource (Spanish, public domain). The play's title is echoed by Hopkins's debut album 'Life Is a Dream.'",
        "href": "https://es.wikisource.org/wiki/La_vida_es_sue%C3%B1o/II"
      },
      {
        "category": "literary",
        "title": "Michelangelo Buonarroti, Sonnet LXV, 'To Giorgio Vasari. On the Brink of Death' (c. 1554)",
        "excerpt": "Now hath my life across a stormy sea\n    Like a frail bark reached that wide port where all\n    Are bidden, ere the final reckoning fall\n    Of good and evil for eternity.\nNow know I well how that fond phantasy\n    Which made my soul the worshipper and thrall\n    Of earthly art, is vain; how criminal\n    Is that which all men seek unwillingly.\nThose amorous thoughts which were so lightly dressed,\n    What are they when the double death is nigh?\n    The one I know for sure, the other dread.\nPainting nor sculpture now can lull to rest\n    My soul that turns to His great love on high,\n    Whose arms to clasp us on the cross were spread.",
        "source": "The Sonnets of Michael Angelo Buonarroti, trans. John Addington Symonds (1878); Project Gutenberg (public domain). The supreme sculptor and painter revealed, in old age, as a maker in a second art — poetry.",
        "href": "https://www.gutenberg.org/cache/epub/10314/pg10314.html.utf8"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, Falstaff — closing fugue 'Tutto nel mondo è burla' (first performed La Scala, 1893)",
        "excerpt": "Tutto nel mondo è burla.\nL'uom è nato burlone,\nLa fede in cor gli ciurla,\nGli ciurla la ragione.\nTutti gabbati! Irride\nL'un l'altro ogni mortal.\nMa ride ben chi ride\nLa risata final.",
        "source": "Giuseppe Verdi, Falstaff (1893), his last opera, composed at the age of 79–80; libretto by Arrigo Boito. Score public domain via IMSLP; libretto text verified at opera-guide.ch.",
        "href": "https://imslp.org/wiki/Falstaff_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Titian, Pietà (1575–1576), Gallerie dell'Accademia, Venice",
        "excerpt": "Titian painted this vast, torch-lit Pietà in his mid-eighties as an offering for his own tomb, and it stood still unfinished on his easel when he died in 1576. Working in loose, almost dissolving strokes — his celebrated 'late style' — the greatest master of the Venetian Renaissance turned at the very end of his life to his most personal and searching image: a grieving Virgin cradling the dead Christ. Left incomplete at his death, it was finished by the younger painter Palma Giovane.",
        "source": "Titian, Pietà, 1575–1576, Gallerie dell'Accademia, Venice; via Wikimedia Commons (public domain)",
        "href": "https://en.wikipedia.org/wiki/Piet%C3%A0_(Titian)",
        "image": {
          "src": "/covers/anthony-hopkins-composer-decca--art.png",
          "alt": "A shadowed Venetian altarpiece: the seated Virgin Mary cradles the pale, dead body of Christ within a stone niche flanked by statues, a kneeling old man (Saint Jerome, a self-portrait of the aged Titian) reaching toward the body, painted in loose, smoky late-style brushwork.",
          "credit": "Titian, Pietà, 1575–1576, Gallerie dell'Accademia, Venice; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "formwork-crouch-end-house",
    "headline": "Formwork Architects turns a derelict north London care home into a light-filled family house",
    "overview": "London studio Formwork Architects has transformed a long-derelict Edwardian care home in Crouch End, north London - the subject of years of contested developer proposals - into a single family home, Dezeen reported on July 10, 2026. The scheme expands the basement and adds a two-storey brick extension around a sunken patio to draw daylight into the rear, finished in a pared-back palette of white walls, pale timber floors and bespoke joinery.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/10/formwork-architects-crouch-end-house/"
      },
      {
        "name": "Wallpaper*",
        "href": "https://www.wallpaper.com/architecture/residential/crouch-end-house-formwork-architects"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/formwork-crouch-end-house.png",
      "alt": "An Edwardian housing terrace in Crouch End, north London.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Paul the Deacon, History of the Langobards, Book IV.36 — the Pantheon made the church of St Mary and All the Martyrs (event 609 AD; written c. 787–796, trans. 1907)",
        "excerpt": "He commanded, at the request of another pope Boniface, that the Church of the Ever-blessed Virgin Mary and of all the Martyrs should be established in the old temple which was called the Pantheon, after all the uncleannesses of idolatry had been removed, so that where formerly the worship, not of all the gods, but of all the devils was performed, there at last there should be a memorial of all the saints.",
        "source": "Paul the Deacon, History of the Langobards, Book IV, ch. 36, trans. William Dudley Foulke (Univ. of Pennsylvania, 1907)",
        "href": "https://archive.org/details/historyoflangoba00pauluoft"
      },
      {
        "category": "historical",
        "title": "John Ruskin, 'The Lamp of Memory,' The Seven Lamps of Architecture (1849) — a founding text of the modern conservation-and-reuse movement",
        "excerpt": "Watch an old building with an anxious care; guard it as best you may, and at any cost from every influence of dilapidation. Count its stones as you would jewels of a crown; set watches about it as if at the gates of a besieged city; bind it together with iron where it loosens; stay it with timber where it declines; do not care about the unsightliness of the aid; better a crutch than a lost limb; and do this tenderly, and reverently, and continually, and many a generation will still be born and pass away beneath its shadow.",
        "source": "John Ruskin, The Seven Lamps of Architecture (1849), 'The Lamp of Memory' — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/35898/pg35898.txt"
      },
      {
        "category": "literary",
        "title": "Genesis 1:1–5, 'Let there be light' — King James Bible (1611/1769 Oxford)",
        "excerpt": "In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. And God said, Let there be light: and there was light. And God saw the light, that it was good: and God divided the light from the darkness.",
        "source": "The Holy Bible (King James Version), Genesis, Chapter 1 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Frances Hodgson Burnett, The Secret Garden (1911) — the neglected walled garden found to be alive",
        "excerpt": "Mary touched it herself in an eager, reverent way. “That one?” she said. “Is that one quite alive quite?” Dickon curved his wide smiling mouth. “It’s as wick as you or me,” he said; and Mary remembered that Martha had told her that “wick” meant “alive” or “lively.” “I’m glad it’s wick!” she cried out in her whisper. “I want them all to be wick. Let us go round the garden and count how many wick ones there are.”",
        "source": "Frances Hodgson Burnett, The Secret Garden (1911) — Project Gutenberg, ebook #113",
        "href": "https://www.gutenberg.org/cache/epub/113/pg113.txt"
      },
      {
        "category": "artistic",
        "title": "Henry Rowley Bishop (music) & John Howard Payne (words), 'Home! Sweet Home!' from the opera Clari, or The Maid of Milan (1823)",
        "excerpt": "’Mid pleasures and palaces though we may roam, / Be it ever so humble, there’s no place like home; / A charm from the sky seems to hallow us there, / Which, seek through the world, is ne’er met with elsewhere. / Home! Home! sweet, sweet Home! / There’s no place like Home! there’s no place like Home!",
        "source": "'Home, Sweet Home' (Bishop, Henry Rowley) — IMSLP/Petrucci Music Library; words by John Howard Payne (public domain)",
        "href": "https://imslp.org/wiki/Home,_Sweet_Home_(Bishop,_Henry_Rowley)"
      },
      {
        "category": "artistic",
        "title": "Pieter de Hooch, A Maid with a Child in a Pantry (c. 1656–1660), Rijksmuseum, Amsterdam",
        "excerpt": "In a quiet Dutch burgher's house a maid stoops to hand a jug to a small child, the two framed by the dark doorway of a cool cellar pantry. Beyond them the eye is drawn through an open passage into a front room where daylight streams across the tiled floor, so that the whole painting becomes a study of light let into the shadowed inner rooms of a home. De Hooch turns the ordinary business of a household into an image of order, care and welcome, the domestic interior redeemed and made luminous.",
        "source": "Pieter de Hooch, A Maid with a Child in a Pantry (c. 1656–1660), Rijksmuseum, Amsterdam (object SK-A-182)",
        "href": "https://www.rijksmuseum.nl/en/collection/SK-A-182",
        "image": {
          "src": "/covers/formwork-crouch-end-house--art.png",
          "alt": "Sunlit Dutch Golden Age interior: a maidservant kneels to give a jug to a young boy at the doorway of a cool tiled pantry, while beyond an open passage daylight floods a front room, drawing the eye through the house.",
          "credit": "Pieter de Hooch, A Maid with a Child in a Pantry, c. 1656–1660, Rijksmuseum, Amsterdam; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "gil-batle-porcelain-prison-plates",
    "headline": "Gil Batle paints scenes of incarceration and freedom onto porcelain plates in a New York show",
    "overview": "Self-taught artist Gil Batle, who learned to draw and carve during 25 years in California prisons, is showing surreal blue-and-white paintings on porcelain plates in 'Double Life' at Ricco/Maresca gallery in New York, Colossal reported on July 10, 2026. The domestic tableware becomes a ground for imagery of bird cages, chains and barbed wire, setting confinement against a longing for freedom; the exhibition runs through August 21.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/gil-batle-porcelain-plate-paintings/"
      },
      {
        "name": "Ricco/Maresca Gallery",
        "href": "https://www.riccomaresca.com/artists/gil-batle"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/gil-batle-porcelain-prison-plates.png",
      "alt": "A blue-and-white porcelain plate painted by Gil Batle with figures, birds and cages.",
      "credit": "Gil Batle / Ricco Maresca Gallery, via Colossal"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Boethius, The Consolation of Philosophy, Book III, Song II — written awaiting execution in prison, c. 524 AD",
        "excerpt": "And the woodland songster, pent\nIn forlorn imprisonment,\nThough a mistress' lavish care\nStore of honeyed sweets prepare;\nYet, if in his narrow cage,\nAs he hops from bar to bar,\nHe should spy the woods afar,\nCool with sheltering foliage,\nAll these dainties he will spurn,\nTo the woods his heart will turn;\nOnly for the woods he longs,\nPipes the woods in all his songs.",
        "source": "Boethius, The Consolation of Philosophy, trans. H. R. James (1897); Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/14328/pg14328.txt"
      },
      {
        "category": "historical",
        "title": "Miguel de Cervantes, Don Quixote, Author's Preface — the book \"begotten in a prison\" (Part I, 1605)",
        "excerpt": "shrivelled, whimsical offspring, full of thoughts of all sorts and such as never came into any other imagination—just what might be begotten in a prison, where every misery is lodged and every doleful sound makes its dwelling? Tranquillity, a cheerful retreat, pleasant fields, bright skies, murmuring brooks, peace of mind, these are the things that go far to make even the most barren muses fertile, and bring into the world births that fill it with wonder and delight.",
        "source": "Miguel de Cervantes, Don Quixote, trans. John Ormsby; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/996/pg996.txt"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde, \"The Ballad of Reading Gaol\" (1898)",
        "excerpt": "But I never saw a man who looked\nSo wistfully at the day.\n\nI never saw a man who looked\nWith such a wistful eye\nUpon that little tent of blue\nWhich prisoners call the sky,\nAnd at every drifting cloud that went\nWith sails of silver by.",
        "source": "Oscar Wilde, The Ballad of Reading Gaol; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/301/pg301.txt"
      },
      {
        "category": "literary",
        "title": "Paul Laurence Dunbar, \"Sympathy\" (1899) — \"I know why the caged bird sings\"",
        "excerpt": "I know what the caged bird feels, alas!\n   When the sun is bright on the upland slopes;\nWhen the wind stirs soft through the springing grass,\nAnd the river flows like a stream of glass;\n   When the first bird sings and the first bud opes,\nAnd the faint perfume from its chalice steals--\nI know what the caged bird feels!\n\nI know why the caged bird beats his wing\n   Till its blood is red on the cruel bars;\nFor he must fly back to his perch and cling\nWhen he fain would be on the bough a-swing;\n   And a pain still throbs in the old, old scars\nAnd they pulse again with a keener sting--\nI know why he beats his wing!\n\nI know why the caged bird sings, ah me,\n   When his wing is bruised and his bosom sore,--\nWhen he beats his bars and he would be free;\nIt is not a carol of joy or glee,\n   But a prayer that he sends from his heart's deep core,\nBut a plea, that upward to Heaven he flings--\nI know why the caged bird sings!",
        "source": "Paul Laurence Dunbar, The Complete Poems of Paul Laurence Dunbar; Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poems_of_Paul_Laurence_Dunbar/Sympathy"
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, \"O welche Lust\" (Prisoners' Chorus), Act I of Fidelio, Op. 72 (final version 1814)",
        "excerpt": "O welche Lust, in freier Luft / Den Atem leicht zu heben! / Nur hier, nur hier ist Leben! / Der Kerker eine Gruft. (Oh what joy, in the open air freely to breathe again! Here alone is life; the dungeon is a grave.) In Beethoven's only opera the prisoners are led briefly from their cells into daylight, and this hushed, swelling chorus of confined men reaching toward light and free air is one of music's supreme images of captivity yearning for freedom.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72; International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Giovanni Battista Piranesi, \"Prisoners on a Projecting Platform,\" from Carceri d'invenzione (Imaginary Prisons), etching, ca. 1749–1760",
        "excerpt": "Piranesi's Carceri conjure vast, impossible dungeons of soaring vaults, endless stairs, hanging chains, ropes and instruments of torture, in which tiny human figures are dwarfed and lost. In this plate prisoners stand marooned on a jutting platform amid a labyrinth of arches and machinery that recedes into shadow with no visible exit. Etched from imagination rather than any real jail, it renders confinement as a boundless architecture of the mind—the same theatre of cages, chains and thwarted escape that Gil Batle inks in blue onto his plates.",
        "source": "Giovanni Battista Piranesi, Carceri d'invenzione; The Metropolitan Museum of Art (via Wikimedia Commons, public domain)",
        "href": "https://www.metmuseum.org/art/collection/search/362671",
        "image": {
          "src": "/covers/gil-batle-porcelain-prison-plates--art.png",
          "alt": "Etching of a colossal, shadowy imaginary prison interior: massive stone arches, staircases and beams recede into darkness while small human figures stand on a projecting platform amid ropes, chains and machinery, with no clear way out.",
          "credit": "Giovanni Battista Piranesi, \"Prisoners on a Projecting Platform,\" from Carceri d'invenzione (Imaginary Prisons), etching, ca. 1749–1760; The Metropolitan Museum of Art; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "imago-ethical-ai-music-player",
    "headline": "Designers unveil Imago, an offline audio player that runs only artist-consented AI models",
    "overview": "Central Saint Martins graduates Domenico di Paolo and Kieran Feechan have designed Imago, a domestic audio player that turns a critical eye on AI in music, Dezeen reported on July 10, 2026. A small aluminium puck holds an NFC key that unlocks an AI model trained solely on sounds a musician has willingly provided; listeners reshape those sounds by hand, entirely offline, with no scraping, cloud or data leaving the device.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/10/imago-audio-player-ai-music/"
      },
      {
        "name": "DesignWanted",
        "href": "https://designwanted.com/imago-ai-deep-listening-device-design/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/imago-ethical-ai-music-player.png",
      "alt": "A small minimalist aluminium audio player disc resting on a shelf in a quiet room.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Statute of Anne, 'An Act for the Encouragement of Learning' (1710)",
        "excerpt": "Whereas printers, booksellers, and other persons have of late frequently taken the liberty of printing, reprinting, and publishing, or causing to be printed, reprinted, and published, books and other writings, without the consent of the authors or proprietors of such books and writings, to their very great detriment, and too often to the ruin of them and their families: for preventing therefore such practices for the future, and for the encouragement of learned men to compose and write useful books...",
        "source": "The Statute of Anne, 1710, The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/18th_century/anne_1710.asp"
      },
      {
        "category": "historical",
        "title": "White-Smith Music Publishing Co. v. Apollo Co., 209 U.S. 1 (1908)",
        "excerpt": "A 'copy' of a musical composition within the meaning of the copyright statute is a written or printed record of it in intelligible notation and this does not include perforated rolls.",
        "source": "White-Smith Music Publishing Company v. Apollo Company, U.S. Supreme Court, via Wikisource",
        "href": "https://en.wikisource.org/wiki/White-Smith_Music_Publishing_Company_v._Apollo_Company"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VI - Apollo and Marsyas (c. 8 CE)",
        "excerpt": "his living skin was ripped off from his limbs, till his whole body was a flaming wound, with nerves and veins and viscera exposed.",
        "source": "Ovid, Metamorphoses (Brookes More translation), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=6:card=382"
      },
      {
        "category": "literary",
        "title": "E. T. A. Hoffmann, 'The Sand-Man' (Der Sandmann, 1816)",
        "excerpt": "Olimpia played on the piano with great skill; and sang as skilfully an aria di bravura, in a voice which was, if anything, almost too sharp, but clear as glass bells.",
        "source": "E. T. A. Hoffmann, The Sand-Man (trans. J. T. Bealby), Project Gutenberg Australia",
        "href": "https://gutenberg.net.au/ebooks06/0605791h.html"
      },
      {
        "category": "artistic",
        "title": "Anatoly Lyadov, 'Une tabatière à musique' (The Musical Snuff-Box), Op. 32 (1893)",
        "excerpt": "A delicate piano miniature in which the composer imitates the thin, tinkling chime of a wind-up music box, its melody circling within a fixed, mechanical loop. The piece is the machine that makes music rendered directly in sound - a human hand impersonating a clockwork device, raising in reverse the very question Imago poses: where the living voice ends and the automaton's begins.",
        "source": "Anatoly Lyadov, Une tabatière à musique, Op. 32, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Music_Box,_Op.32_(Lyadov,_Anatoly)"
      },
      {
        "category": "artistic",
        "title": "Herbert James Draper, 'Ulysses and the Sirens' (1909)",
        "excerpt": "Draper paints the moment the Sirens' song reaches across the water - Ulysses bound to the mast, his crew rowing with stopped ears while the singers climb aboard to seize the listener their voices have entranced. The picture makes the captivating voice itself the prize and the peril, a meditation on a song so powerful others would take and be taken by it - the ownership of a creative voice, and the danger of a sound that cannot be resisted.",
        "source": "Herbert James Draper, Ulysses and the Sirens, Ferens Art Gallery, Kingston upon Hull; via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Ulysses_and_the_Sirens_by_H.J._Draper.jpg",
        "image": {
          "src": "/covers/imago-ethical-ai-music-player--art.png",
          "alt": "Oil painting of Ulysses bound to the mast of his ship as three Sirens, depicted as bare-shouldered women, climb from the sea over the vessel's side while oarsmen strain at their benches.",
          "credit": "Herbert James Draper, Ulysses and the Sirens, 1909, Ferens Art Gallery, Kingston upon Hull; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "china-reusable-rocket-landing",
    "headline": "China lands a Long March 10B rocket booster at sea, becoming the second nation to recover an orbital-class rocket",
    "overview": "China recovered the first-stage booster of its Long March 10B rocket on an offshore platform early on July 10, 2026, after a launch from the Hainan Commercial Space Launch Site, its space agency said. The controlled sea landing makes China only the second country after the United States to retrieve an orbital-class rocket, a milestone toward reusable launchers; engineers said they aim to fly the booster again before year's end.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNN2RjUGFsaXBkem9rVmIyZlJvaUROSmJJY2lVVC1tV0xPcGo2eEd6WHhMeDlLMkV4dnhlaHZwYm9LeThGYkJ3Zm5zZmhiWGtNWmI3Q3hYZFV5M3dYQXpMclMzYTNIV3RSMWlKN2JQLUQ4dzN5OXpKSmctVkt1ckthVV9MQmFHYkFURC16MWxseDVfc0l5SURlb1ktb1lXNnpXalF2Tkkza3dXdXpHSGVHSUdnSm10Q0RqTW53V0lR?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cm2rmmx86pdo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/china-reusable-rocket-landing.png",
      "alt": "A rocket booster descends toward an offshore sea platform amid flame and smoke over the ocean.",
      "credit": "BBC"
    },
    "lead": true,
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Archytas of Tarentum builds a self-propelled wooden dove that flies (c. 400 BC)",
        "excerpt": "Archytas made a wooden model of a dove with such mechanical ingenuity and art that it flew; so nicely balanced was it, you see, with weights and moved by a current of air enclosed and hidden within it.",
        "source": "Aulus Gellius, Attic Nights, Book X.12, trans. John C. Rolfe (Loeb), reporting Favorinus; LacusCurtius, University of Chicago",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Gellius/10*.html"
      },
      {
        "category": "historical",
        "title": "Benjamin Franklin watches the Montgolfier and Charles balloons rise over Paris, 1783",
        "excerpt": "From Passy in 1783 Franklin reported to the Royal Society on the great globes that carried men aloft for the first time, France electrified as balloons ascended and drifted down to be recovered. Pressed on what earthly use so strange a machine could serve, he gave his celebrated retort, likening the new invention to a new-born baby that might one day grow into something great.",
        "source": "Benjamin Franklin to Sir Joseph Banks, 30 August–2 September 1783; Founders Online, U.S. National Archives",
        "href": "https://founders.archives.gov/documents/Franklin/01-40-02-0342"
      },
      {
        "category": "literary",
        "title": "The flight and fall of Icarus in Ovid's Metamorphoses, Book VIII",
        "excerpt": "bold in vanity, began to soar, rising upon his wings to touch the skies; but as he neared the scorching sun, its heat softened the fragrant wax that held his plumes; and heat increasing melted the soft wax— he waved his naked arms instead of wings, with no more feathers to sustain his flight.",
        "source": "Ovid, Metamorphoses 8.183ff, trans. Brookes More; Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D8%3Acard%3D183"
      },
      {
        "category": "literary",
        "title": "Cyrano de Bergerac is carried to the Moon by tiers of firework rockets in A Voyage to the Moon (1657)",
        "excerpt": "For so soon as the Flame had devoured one tier of Squibs, which were ranked by six and six, by means of a Train that reached every half-dozen, another tier went off, and then another; so that the Salt-Peter taking Fire, put off the danger by encreasing it.",
        "source": "Cyrano de Bergerac, A Voyage to the Moon, trans. A. Lovell; Project Gutenberg (ebook 46547)",
        "href": "https://www.gutenberg.org/files/46547/46547-h/46547-h.htm"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, chorus 'Die Himmel erzählen die Ehre Gottes' (The Heavens Are Telling) from The Creation (1798)",
        "excerpt": "Haydn's oratorio crowns the fourth day of creation with a soaring chorus, 'The heavens are telling the glory of God,' voices climbing skyward as the newborn firmament and its fires break into song. It is music of mastery over the heavens and of order kindled from chaos, an apt echo of engineers lofting fire aloft and calling it home.",
        "source": "Joseph Haydn, Die Schöpfung, Hob.XXI:2 (1798), libretto after Genesis, Milton and the Psalms; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus (c. 1555–1560)",
        "excerpt": "A ploughman, a shepherd and a laden ship go calmly about their work while, unremarked in a corner of the sea, two pale flailing legs are all that remains of Icarus after his soaring ascent and headlong plunge. Bruegel sets the daring flight against an indifferent, ongoing world, the sky he dared to climb closing over him without pause.",
        "source": "Pieter Bruegel the Elder, oil on panel, Royal Museums of Fine Arts of Belgium, Brussels (inv. 4030); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Bruegel,_Pieter_de_Oude_-_De_val_van_icarus_-_hi_res.jpg",
        "image": {
          "src": "/covers/china-reusable-rocket-landing--art.png",
          "alt": "Bruegel's panel: a ploughman and coastal landscape in sunlight while Icarus's legs disappear into the sea near a passing ship",
          "credit": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1555–1560, Royal Museums of Fine Arts of Belgium, Brussels; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "sk-hynix-record-nasdaq-debut",
    "headline": "SK Hynix raises $26.5 billion in the largest-ever US market debut by a foreign company",
    "overview": "South Korean chipmaker SK Hynix raised about $26.5 billion ahead of its Nasdaq debut on July 10, 2026, the biggest US listing by a foreign firm, as investors bet on surging demand for AI memory chips. The blockbuster offering lifted global chip stocks and became an early test of appetite for the AI-driven semiconductor boom.",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c4gym70r0y4o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOSWhFRmx4bEZ1MW5rMXlkYmN0d0RqeXR6XzhQOXpiTlJBUGhub1gtWDhkb0hrM1RteDhnTmxacklUTXQ3UjRJb3laeEJoSFZXV0ljWklqMTVTYlpnNzMyLXRTd2xzWTB1QkZkNlI1RnFnWE1FX2kzNkVCTlNLMWpKUDhCVUJ5ZGxoQU1DalJLNFhvTVRZN0ZuSDVDZW1LR0duc3pZ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/sk-hynix-record-nasdaq-debut.png",
      "alt": "Two technology executives give a thumbs-up before a display of AI memory and chip products.",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Roman credit crash of A.D. 33",
        "excerpt": "Hence followed a scarcity of money, a great shock being given to all credit, the current coin too, in consequence of the conviction of so many persons and the sale of their property, being locked up in the imperial treasury or the public exchequer.",
        "source": "Tacitus, The Annals, Book VI (chs. 16–17), trans. Alfred John Church & William Jackson Brodribb, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_6"
      },
      {
        "category": "historical",
        "title": "The Dutch Tulipomania of 1636–37",
        "excerpt": "Nobles, citizens, farmers, mechanics, seamen, footmen, maidservants, even chimney-sweeps and old clotheswomen, dabbled in tulips.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions, \"The Tulipomania\" (1841), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm"
      },
      {
        "category": "literary",
        "title": "The flood-tide roar of the Bourse in Zola's Money",
        "excerpt": "from among the coulissiers, already installed under the clock and hard at work, there arose the clamour of bull and bear, the flood-tide roar of speculation dominating all the rumbling hubbub of the city.",
        "source": "Émile Zola, Money (L'Argent), trans. Ernest A. Vizetelly (1894), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm"
      },
      {
        "category": "literary",
        "title": "The wheat torrent in Frank Norris's The Pit",
        "excerpt": "the roar of the torrent of wheat which drove through Chicago from the Western farms to the mills and bakeshops of Europe. There at the foot of the street the torrent swirled once upon itself, forty million strong, in the eddy which he told himself he mastered.",
        "source": "Frank Norris, The Pit: A Story of Chicago (1903), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/4382/4382-h/4382-h.htm"
      },
      {
        "category": "artistic",
        "title": "\"Some seven men form an Association\" from Utopia, Limited",
        "excerpt": "Some seven men form an Association\n(If possible, all Peers and Baronets),\nThey start off with a public declaration\nTo what extent they mean to pay their debts.\nThat's called their Capital; if they are wary\nThey will not quote it at a sum immense.",
        "source": "W. S. Gilbert & Arthur Sullivan, Utopia, Limited; or, The Flowers of Progress (1893), Mr. Goldbury's song, Wikisource libretto",
        "href": "https://en.wikisource.org/wiki/Utopia,_Limited"
      },
      {
        "category": "artistic",
        "title": "Satire on Tulip Mania",
        "excerpt": "Jan Brueghel the Younger paints the speculators as bewigged monkeys in fine Dutch dress, weighing bulbs, toasting deals, and drawing swords over prices. One ape pisses on a discarded bloom while another is dragged before a magistrate and a third is carried, bankrupt, to the grave — the whole giddy market rendered as a troop of apes.",
        "source": "Jan Brueghel the Younger, Satire on the Tulipomania, oil on panel, c. 1640, Frans Hals Museum, Haarlem (inv. os 75-699); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/sk-hynix-record-nasdaq-debut--art.png",
          "alt": "Monkeys in 17th-century Dutch dress trading, weighing, and quarrelling over tulip bulbs, with one urinating on the flowers and another carried to his grave",
          "credit": "Jan Brueghel the Younger, Satire on the Tulipomania (c. 1640), Frans Hals Museum / Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "typhoon-bavi-japan-china-alert",
    "headline": "Powerful Typhoon Bavi bears down on Japan's Okinawa islands as China reels from a week of deadly storms",
    "overview": "Typhoon Bavi, packing sustained winds near 162 kph (100 mph), closed in on Japan's remote Sakishima Islands in Okinawa on July 10, 2026, forcing more than 1,000 evacuations and the cancellation of dozens of flights and ferries before its expected closest approach on Saturday. The storm came as China braced for the same system after a week of floods and storms that killed dozens.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxNekhCZ2F4SGtjYVBVTG8tZFJ4b1VyeFdyNHpZdW5SNFg4SlQwX3UyZjRKQlNUbzd6VTl3eXl5cUpKTlM3NzdzTDI0b3VDNE84TnZwSnFDcUY2MmJZZEg2NWJLSW5IZHM2SjFVYno2ZE9FV2dIU2gxSE51ZWd6aGdhQlRhTVVfWUFoV3JUS1hXemNmWTBYM3Y1amxHdHl0MUxQM3JQbGdncHFVeVVnSDZ0WDNqbWhSR2FnX0lYTW53RjN2RDRYNWpr?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOYnUzZnNQeXh5WjA5MUZENGN2UDFzUGY3Mk5obDlsOE95TzdzaGxobEowX09pVmlKbU04YUdnTzIxcFF5R1E0QWdWWEp0VGlCbW4tdHdzVF9kX1Jtc3g4Tkk3RWczWE50amYtLUp1S0NGRUVWOEJxQjlKbTI1QTRnYzB3YW5IaGVqTERJeVZHWUN5bHBIZ2c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/typhoon-bavi-japan-china-alert.png",
      "alt": "A shop in Okinawa with its windows taped in crosses and a storm-closure notice as Typhoon Bavi nears.",
      "credit": "The Japan Times"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The storm at Sepias wrecks Xerxes' fleet (480 BC)",
        "excerpt": "at dawn, after clear and calm weather, the sea began to boil, and there brake upon them a great storm and a strong east wind, that wind which the people of that country call the Hellespontian... In that stress there perished by the least reckoning not fewer than four hundred ships, and men innumerable and a great plenty of substance.",
        "source": "Herodotus, Histories 7.188–190, trans. A. D. Godley (Loeb), via LacusCurtius (University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/7D*.html"
      },
      {
        "category": "historical",
        "title": "Isaac Cline's report on the Galveston hurricane (September 8, 1900)",
        "excerpt": "The water rose at a steady rate from 3 p.m. until about 7:30 p.m., when there was a sudden rise of about four feet in as many seconds... Probably more than six thousand persons had passed from life to death during that dreadful night.",
        "source": "Isaac M. Cline, official U.S. Weather Bureau report on the Galveston hurricane, 1900 (NOAA NWS Heritage)",
        "href": "https://vlab.noaa.gov/web/nws-heritage/-/galveston-storm-of-1900"
      },
      {
        "category": "literary",
        "title": "Poseidon raises the storm against Odysseus (Odyssey, Book 5)",
        "excerpt": "So saying, he gathered the clouds, and seizing his trident in his hands troubled the sea, and roused all blasts of all manner of winds, and hid with clouds land and sea alike; and night rushed down from heaven.",
        "source": "Homer, Odyssey 5.291–294, trans. A. T. Murray, Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book=5:card=282"
      },
      {
        "category": "literary",
        "title": "The shipwreck that opens Shakespeare's The Tempest (Act 1, Scene 1)",
        "excerpt": "Blow, till thou burst thy wind, if room enough!... All lost! to prayers, to prayers! all lost!",
        "source": "William Shakespeare, The Tempest, Act I, Scene 1, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/23042/pg23042.txt"
      },
      {
        "category": "artistic",
        "title": "'Gewitter. Sturm' — the storm movement of Beethoven's Pastoral Symphony (No. 6, Op. 68)",
        "excerpt": "Beethoven's fourth movement erupts out of a placid country afternoon: rolling timpani mimic distant thunder, frantic string tremolos drive sheets of rain, and piccolo and trombones enter for the first time to make the tempest's fury physical. The music churns through remote keys until, spent, it dissolves into a shepherd's song of thanksgiving after the storm.",
        "source": "Ludwig van Beethoven, Symphony No. 6 in F major, Op. 68 ('Pastorale'), 4th movement (public domain scores), IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "The Great Wave off Kanagawa",
        "excerpt": "A towering, claw-fingered wave rears over three slender boats whose oarsmen crouch low, dwarfed to specks against the water's curling might, while distant Mount Fuji sits small and still beneath the crest. Hokusai freezes the exact instant before the sea falls, making human smallness before nature the whole subject of the print.",
        "source": "Katsushika Hokusai, 'The Great Wave off Kanagawa,' from Thirty-six Views of Mount Fuji, c. 1830–32 (Tokyo Fuji Art Museum copy), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Katsushika_Hokusai_-_The_Great_Wave_off_the_Coast_of_Kanagawa.jpg",
        "image": {
          "src": "/covers/typhoon-bavi-japan-china-alert--art.png",
          "alt": "A giant cresting wave with foaming claw-like tips looms over small fishing boats, with Mount Fuji visible in the distance",
          "credit": "Katsushika Hokusai (c. 1830–32), public domain via Wikimedia Commons (Tokyo Fuji Art Museum)"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "iris-van-herpen-plasma-couture",
    "headline": "Iris van Herpen unveils the first couture gown lit by plasma at Paris Couture Week",
    "overview": "Dutch designer Iris van Herpen presented \"Helix Nebula,\" billed as the first dress made with plasma, at Paris Couture Week on July 10, 2026. Hand-blown glass horns filled with ionized gas glow red and streak with color as the wearer's body conducts their electrical field, part of her 17-look \"Sonic Starquakes\" collection wrapped in 10,000 hand-blown glass spheres.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/10/iris-van-herpen-glass-gown-glowing-plasma/"
      },
      {
        "name": "FashionUnited",
        "href": "https://fashionunited.com/news/fashion/iris-van-herpen-only-she-could-invent-the-worlds-first-plasma-dress/2026070773354"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/iris-van-herpen-plasma-couture.png",
      "alt": "A plasma globe glowing with filaments of violet electrical light held in two hands.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The High Priest's Vestments as a Map of the Cosmos",
        "excerpt": "And for the twelve stones, whether we understand by them the months, or whether we understand the like number of the signs of that circle which the Greeks call the Zodiac, we shall not be mistaken in their meaning.",
        "source": "Flavius Josephus, Antiquities of the Jews, Book III, ch. 7 (William Whiston translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Antiquities_of_the_Jews/Book_III"
      },
      {
        "category": "historical",
        "title": "Alice Vanderbilt's 'Electric Light' Gown at the 1883 Vanderbilt Ball",
        "excerpt": "Designed by the House of Worth, the yellow-satin gown was threaded with gold and silver in a lightning-bolt pattern and studded with glass beads and pearls. Dry-cell batteries hidden in its folds fed a torch bulb the wearer could raise overhead like the Statue of Liberty, so that a woman herself became a walking source of electric light — a garment animated by the newest science of its age.",
        "source": "House of Worth, 'Electric Light' fancy-dress ensemble (1883), Museum of the City of New York, acc. 51.284.3A-H",
        "href": "https://www.mcny.org/story/vanderbilt-ball"
      },
      {
        "category": "literary",
        "title": "Pygmalion's Ivory Statue Wakes to Life",
        "excerpt": "the ivory seemed to soften at the touch, and its firm texture yielded to his hand",
        "source": "Ovid, Metamorphoses, Book X (Brookes More translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=10:card=243"
      },
      {
        "category": "literary",
        "title": "The Heavens' Embroidered Cloths",
        "excerpt": "Had I the heavens' embroidered cloths, / Enwrought with golden and silver light, / The blue and the dim and the dark cloths / Of night and light and the half light,",
        "source": "W. B. Yeats, 'Aedh wishes for the Cloths of Heaven,' from The Wind Among the Reeds (1899), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Wind_Among_the_Reeds/Aedh_wishes_for_the_Cloths_of_Heaven"
      },
      {
        "category": "artistic",
        "title": "'And there was Light' — Haydn's The Creation",
        "excerpt": "Out of a groping, tonally unmoored 'Representation of Chaos,' the chorus murmurs of the world's first dawn until, on the single word 'Light,' Haydn detonates a sudden blaze of C major. The birth of radiance is rendered as pure sound, the cosmos summoned into being by a chord — music that does not describe light so much as switch it on.",
        "source": "Joseph Haydn, Die Schöpfung (The Creation), Hob. XXI:2 (1796–98), IMSLP",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, The Starry Night (1889)",
        "excerpt": "Van Gogh's night sky churns with spiraling nebulae and swollen, haloed stars, the heavens made turbulent and alive above a sleeping town. The cosmos here is not observed but felt — pigment swept into currents of living light, a universe caught and set glowing in paint.",
        "source": "Vincent van Gogh, The Starry Night (1889), oil on canvas, Museum of Modern Art, New York; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/iris-van-herpen-plasma-couture--art.png",
          "alt": "Vincent van Gogh's The Starry Night: a swirling, luminous night sky of spiraling stars and a glowing crescent moon over a quiet village and cypress tree",
          "credit": "Vincent van Gogh, The Starry Night (1889), Museum of Modern Art / Google Art Project, public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "xi-north-korea-premier-treaty",
    "headline": "North Korea's premier arrives in Beijing for the 65th anniversary of the China–North Korea friendship treaty",
    "overview": "North Korean Premier Pak Thae-song arrived in Beijing on July 10, 2026, leading a delegation to mark the 65th anniversary of the 1961 China–North Korea Treaty of Friendship, Cooperation and Mutual Assistance. It is the first time in seven years Pyongyang has sent a government delegation to Beijing for the anniversary, following a Xi–Kim summit last month and signaling a deepening thaw between the two allies.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQWm8yOEY5OW1ILWYxd3BWdElGRVZBNTlrdDNSZ1F0NWRLMnlwNERTcGV4SlE5Y255SktnYjRZeHpaV1pWU1hDWV9tWmZUR3ZLR3N1aEdPSHZBSjd3MkpIRVNiaTVLc1BKU1U4bUlXSXRuZkJhMWtEY3FKTDlXZUFRZThtbEFPQ282VHBvX1lEdGd3eklvQ1BkdjVCYXVSal8xb0ozcnEtXzVQaTFqTG9lTW9B?oc=5"
      },
      {
        "name": "Xinhua",
        "href": "https://english.news.cn/20260710/e713c57ea57c4d1f8810fb135a9c2618/c.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/xi-north-korea-premier-treaty.png",
      "alt": "The colonnaded facade of the Great Hall of the People in Beijing under a clear sky.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Egyptian–Hittite \"Eternal Treaty\" of Ramesses II and Hattusili III (c. 1259 BC)",
        "excerpt": "Behold then, Khetasar, the great chief of Kheta, is in treaty relation with Usermare-Setepnere (Ramses II), the great ruler of Egypt, beginning with this day, in order to bring about good peace and good brotherhood between us forever, while he is in brotherhood with me, he is in peace with me; and I am in brotherhood with him, and I am in peace with him, forever.",
        "source": "James Henry Breasted, Ancient Records of Egypt, Vol. III: The Nineteenth Dynasty, §375 (Univ. of Chicago Press, 1906), via Internet Archive",
        "href": "https://archive.org/details/ancient-records-of-egypt-vol-3_202012"
      },
      {
        "category": "historical",
        "title": "The Franco-Russian Military Convention of 1892",
        "excerpt": "If France is attacked by Germany, or by Italy supported by Germany, Russia shall employ all her available forces to attack Germany. If Russia is attacked by Germany, or by Austria supported by Germany, France shall employ all her available forces to attack Germany.",
        "source": "The Franco-Russian Alliance Military Convention, August 18, 1892; The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/19th_century/frrumil.asp"
      },
      {
        "category": "literary",
        "title": "The Oath of the Peach Garden in Romance of the Three Kingdoms",
        "excerpt": "We three, Liu Pei, Kuan Yü and Chang Fei, though of different families, swear brotherhood, and promise mutual help to one end. We will rescue each other in difficulty, we will aid each other in danger. We swear to serve the state and save the people. We ask not the same day of birth but we seek to die together.",
        "source": "Luo Guanzhong, Romance of the Three Kingdoms, Chapter 1, trans. C. H. Brewitt-Taylor, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/77416/77416-h/77416-h.htm"
      },
      {
        "category": "literary",
        "title": "The Rütli Oath in Schiller's Wilhelm Tell",
        "excerpt": "We swear to be a nation of true brothers, Never to part in danger or in death!",
        "source": "Friedrich Schiller, Wilhelm Tell, Act II, trans. Theodore Martin, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/6788/6788-h/6788-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Oath of the Knights of Death in Verdi's La battaglia di Legnano (1849)",
        "excerpt": "In Verdi's opera the free cities of the Lombard League bind themselves against the German emperor Frederick Barbarossa, and the warriors of the Compagnia della Morte swear on the cross to conquer or die for a common homeland. Their thundering third-act chorus turns a military pact into a sacred vow of brotherhood, the private oath of allies made public and irrevocable before God and country.",
        "source": "Giuseppe Verdi, La battaglia di Legnano (1849), full and vocal scores (Ricordi), IMSLP",
        "href": "https://imslp.org/wiki/La_battaglia_di_Legnano_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, Oath of the Horatii (1784)",
        "excerpt": "Three brothers stretch their arms as one toward the swords their father lifts high, their bodies rigid with a collective vow to fight and die for the state. David freezes the instant an alliance is sealed by oath: rigid geometry, clasped weapons, and outstretched hands make allegiance a matter of unbreakable ceremony, while the grieving women at the right foretell the cost such pacts exact.",
        "source": "Jacques-Louis David, Le Serment des Horaces, 1784, oil on canvas, Musée du Louvre, Paris; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David-Oath_of_the_Horatii-1784.jpg",
        "image": {
          "src": "/covers/xi-north-korea-premier-treaty--art.png",
          "alt": "Three Roman brothers raise their arms toward three swords held aloft by their father, swearing a martial oath, while women mourn at the right.",
          "credit": "Jacques-Louis David, Oath of the Horatii (1784), Musée du Louvre / Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "bayeux-tapestry-british-museum",
    "headline": "The Bayeux Tapestry arrives at the British Museum after a secret overnight journey from France",
    "overview": "The 70-metre, 11th-century Bayeux Tapestry reached the British Museum in the early hours of July 10, 2026, spirited across the Channel under police escort in a vibration-proof, climate-controlled case. It is the first time the embroidery depicting the 1066 Norman Conquest has been in Britain in nearly a thousand years; the loan, insured for more than $1 billion, goes on display from September.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNdUNLd3BlT282aXJPLVJxUzIzbG1pLTdoajR3S2FyMF9tWXdQM1hqdnVRZXBWdGNTdTVTMlBlUGJqS29EUW9PZWJrMDREcjJuZmFBbmpZSDlibW9RX2VHRE5CazJHZTJaZUtUVzljdzBOVGdzNlZINW5FWmE2dy0waVhsQ29BNUNRd0tsWlZVamZDR1JudmVHVFlvY2xYUQ?oc=5"
      },
      {
        "name": "British Museum",
        "href": "https://www.britishmuseum.org/about-us/press/press-releases/bayeux-tapestry-displayed-british-museum"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/bayeux-tapestry-british-museum.png",
      "alt": "A panel of the Bayeux Tapestry showing Norman knights on horseback charging with archers below.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Trajan's Column: Rome winds a war into a spiral of stone",
        "excerpt": "Trajan constructed over the Ister a stone bridge for which I cannot sufficiently admire him.",
        "source": "Cassius Dio, Roman History, Book LXVIII.13, trans. Earnest Cary (Loeb Classical Library, 1925), LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/68*.html"
      },
      {
        "category": "historical",
        "title": "The Parthenon (Elgin) Marbles: a treasure carried across the sea",
        "excerpt": "Dull is the eye that will not weep to see / Thy walls defaced, thy mouldering shrines removed / By British hands",
        "source": "Lord Byron, Childe Harold's Pilgrimage, Canto II, stanza XI (1812), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/5131/5131-h/5131-h.htm"
      },
      {
        "category": "literary",
        "title": "The Song of Roland — the battle-lay reputedly sung by Taillefer at Hastings",
        "excerpt": "Rollant hath set the olifant to his mouth, / He grasps it well, and with great virtue sounds.",
        "source": "La Chanson de Roland, trans. C. K. Scott-Moncrieff (1919), Laisse CXXXIII, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/391/pg391.html"
      },
      {
        "category": "literary",
        "title": "Helen embroiders the Trojan War into cloth (Iliad, Book 3)",
        "excerpt": "She found Helen in the hall, where she was weaving a great purple web of double fold, and thereon was broidering many battles of the horse-taming Trojans and the brazen-coated Achaeans, that for her sake they had endured at the hands of Ares.",
        "source": "Homer, Iliad 3.125-128, trans. A. T. Murray (Loeb Classical Library, 1924), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D3%3Acard%3D121"
      },
      {
        "category": "artistic",
        "title": "Handel, 'Zadok the Priest' (HWV 258) — an anthem to crown a conquering king",
        "excerpt": "Handel's coronation anthem, first sung at the crowning of George II in 1727 and at every British coronation since, builds from murmuring, rising strings into a sudden blaze of choir and trumpets shouting 'God save the King.' It is the sound of legitimacy conferred by ceremony rather than by blood on the field, the very thing William the Conqueror sought when he was crowned in Westminster Abbey on Christmas Day 1066, the campaign the Tapestry sets out to justify.",
        "source": "George Frideric Handel, Zadok the Priest, Coronation Anthem HWV 258 (1727), IMSLP",
        "href": "https://imslp.org/wiki/Zadok_the_Priest,_HWV_258_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "'Isti mirant stella': Halley's Comet as omen over King Harold (Bayeux Tapestry, Scene 32)",
        "excerpt": "Crowds crane their necks and point at a blazing, fire-tailed star stitched across the linen, above the caption 'Isti mirant stella' - 'these men marvel at the star.' Below, a newly crowned Harold sits uneasy on his throne as a messenger leans in with news, while a ghostly line of empty ship-hulls in the lower border already foretells the invasion the comet is taken to announce.",
        "source": "The Bayeux Tapestry, Scene 32 (embroidery, 1070s), photograph by Myrabella, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Bayeux_Tapestry_scene32_Halley_comet.jpg",
        "image": {
          "src": "/covers/bayeux-tapestry-british-museum--art.png",
          "alt": "Bayeux Tapestry scene of men pointing up at Halley's Comet, with a seated King Harold and empty ships in the lower border",
          "credit": "Bayeux Tapestry, Scene 32 (1070s); photo Myrabella / Wikimedia Commons (CC0 / public domain)"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "australia-h5n1-bird-flu-seabird",
    "headline": "Australia confirms its first H5N1 bird-flu case in a local seabird as detections rise to 12",
    "overview": "Australia recorded its first H5N1 avian-influenza infection in a native seabird, a greater crested tern found at Robe in South Australia, the agriculture minister said on July 10, 2026. The finding, which brought the country's confirmed detections to 12, deepened concern that the virus is spreading after arriving last month, though officials reported no mass die-offs or poultry outbreaks.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1gFBVV95cUxNUWJBa0kyTGdzY2dqcmRCRDRBZDAtVEZNWXVGby1CcDdYVjNFRDFPamxPbGRMaWd3NVg1YVM1eV9hY3lvb0E1eEtVak56dDZjY05kdkRwbXdZbzdwcXVtQVhpQnR6UGp6NzB3MDZWRWZ2dFRwZ0NJSXRQQk1SZHMtZXZNTTBEb0xhc0xWN2x4ZVdudXpGZnQ4T0NlbmtRTUlkcjcxZE9jX2xRcjlHQjJQc0tFV1F4VnR5Q2lrYy01VHZ2OWVkWmozWjVjWkxCMlI2WTFHQ1Vn?oc=5"
      },
      {
        "name": "Xinhua",
        "href": "https://english.news.cn/20260710/2bee1736af0b4101ade744e1aae120bc/c.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/australia-h5n1-bird-flu-seabird.png",
      "alt": "A greater crested tern in flight over dark water, a small fish held in its bill.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens: birds and beasts that fed on the dead perished too",
        "excerpt": "All the birds and beasts that prey upon human bodies, either abstained from touching them (though there were many lying unburied), or died after tasting them.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (trans. Richard Crawley), Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "The Plague of Justinian: a pestilence that spread over the whole world",
        "excerpt": "It started from the Egyptians who dwell in Pelusium. Then it divided and moved in one direction towards Alexandria and the rest of Egypt, and in the other direction it came to Palestine on the borders of Egypt; and from there it spread over the whole world, always moving forward and travelling at times favorable to it.",
        "source": "Procopius, History of the Wars, Book II (trans. H. B. Dewing, 1914), World History Encyclopedia",
        "href": "https://www.worldhistory.org/article/1536/procopius-on-the-plague-of-justinian-text--comment/"
      },
      {
        "category": "literary",
        "title": "Boccaccio's Decameron: the plague leaps from man to beast, and two hogs fall dead",
        "excerpt": "the rags of a poor man, who had died of the plague, being cast out into the public way, two hogs came up to them and having first, after their wont, rooted amain among them with their snouts, took them in their mouths and tossed them about their jaws; then, in a little while, after turning round and round, they both, as if they had taken poison, fell down dead upon the rags with which they had in an ill hour intermeddled.",
        "source": "Giovanni Boccaccio, The Decameron, Introduction to the First Day (trans. John Payne), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm"
      },
      {
        "category": "literary",
        "title": "Poe's 'The Raven': the ominous bird as prophet and thing of evil",
        "excerpt": "\"Prophet!\" said I, \"thing of evil!—prophet still, if bird or devil!\"",
        "source": "Edgar Allan Poe, 'The Raven' (1845), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1065/1065-h/1065-h.htm"
      },
      {
        "category": "artistic",
        "title": "Mozart's Requiem in D minor, K. 626",
        "excerpt": "Left unfinished at Mozart's death in 1791, the Requiem opens in the shadow of the Introitus and swells into the terror of the Dies irae, a mass for the dead that has become the sound of mortality itself. Its Latin sequence pleads for rest and mercy as a wrathful day of reckoning approaches. For a nation watching a new contagion arrive on its shores, it is the music of dread held in suspension.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 (1791), IMSLP Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem,_K.626_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin, 'The Plague' (Die Pest), 1898",
        "excerpt": "A skeletal figure of Death rides a winged, dragon-like beast low through the narrow street of a medieval town, its scythe sweeping the air as bodies crumple in the gutters below. The airborne monster embodies pestilence as a thing that flies in from elsewhere, a harbinger swooping down on a place that had felt safe. Böcklin painted it while cholera stalked Europe, fixing the ancient dread of a contagion arriving on the wing.",
        "source": "Arnold Böcklin, Die Pest (The Plague), 1898, tempera on fir wood, Kunstmuseum Basel; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/australia-h5n1-bird-flu-seabird--art.png",
          "alt": "Death astride a winged creature flying through a plague-stricken medieval street strewn with the dead",
          "credit": "Arnold Böcklin, Die Pest (1898), Kunstmuseum Basel / Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "hungary-orban-protest-sulyok",
    "headline": "Thousands rally in Budapest as Orbán's allies protest a plan to remove President Tamás Sulyok",
    "overview": "Several thousand supporters of former prime minister Viktor Orbán gathered outside the Sándor Palace in Budapest on July 9–10, 2026, to protest the new pro-European government's plan to oust President Tamás Sulyok by constitutional amendment. Prime Minister Péter Magyar, who ended Orbán's 16-year rule in April, says his two-thirds majority gives him a mandate; Orbán's Fidesz calls the move an assault on the rule of law.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxQUjNsNWxUUXBrcGNTeVZpVUNNQ3QwQXZrR0JzNXpKV1dhVlNId0lOdGl4UjhhNzBxMzlwQkpSaW53MWdsODR1VHFnQTNyZndPNGdWSWhUMTVCdUtCUFZUeTFKUU90UlF3WEU4VDNCZ0JmdS12bEtNcTVjZndZTW5LUmFYbHFOSUFRRWZidzBiZjNqbC1fY011c1ZwS2hYSHJCUG5qcg?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/world/orban-allies-protest-in-hungary-against-new-prime-ministers-plans-to-oust-president-sulyok"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/hungary-orban-protest-sulyok.png",
      "alt": "A crowd of protesters waving Hungarian flags applauds at an outdoor rally in Budapest.",
      "credit": "PBS NewsHour"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Expulsion of Tarquin the Proud from Rome (509 BC)",
        "excerpt": "He goaded on the incensed multitude to strip the king of his sovereignty and pronounce a sentence of banishment against Tarquin with his wife and children.",
        "source": "Livy, The History of Rome, Book 1, ch. 59, trans. Rev. Canon Roberts (Perseus Digital Library, Tufts University)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0026%3Abook%3D1%3Achapter%3D59"
      },
      {
        "category": "historical",
        "title": "The Declaration that James II Had 'Abdicated the Government' (Bill of Rights, 1689)",
        "excerpt": "And whereas the said late King James the Second having abdicated the government and the throne being thereby vacant, his Highness the prince of Orange (whom it hath pleased Almighty God to make the glorious instrument of delivering this kingdom from popery and arbitrary power)...",
        "source": "Bill of Rights 1689 (English Parliament), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bill_of_Rights_1689"
      },
      {
        "category": "literary",
        "title": "Richard II Unmakes Himself in the Deposition Scene",
        "excerpt": "Now mark me how I will undo myself: / I give this heavy weight from off my head, / And this unwieldy sceptre from my hand, / The pride of kingly sway from out my heart; / With mine own tears I wash away my balm, / With mine own hands I give away my crown, / With mine own tongue deny my sacred state, / With mine own breath release all duteous rites:",
        "source": "William Shakespeare, King Richard II, Act IV, Scene 1 (Yale edition, 1921), Wikisource",
        "href": "https://en.wikisource.org/wiki/Richard_II_(1921)_Yale/Text/Act_IV"
      },
      {
        "category": "literary",
        "title": "'Ye are many—they are few': Shelley's Call to the Risen Crowd",
        "excerpt": "Rise like Lions after slumber / In unvanquishable number— / Shake your chains to earth like dew / Which in sleep had fallen on you— / Ye are many—they are few.",
        "source": "Percy Bysshe Shelley, The Masque of Anarchy (written 1819), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Masque_of_Anarchy"
      },
      {
        "category": "artistic",
        "title": "La Marseillaise — the Revolution's Anthem of the Sovereign People",
        "excerpt": "Composed in Strasbourg in April 1792 as an army marching song, La Marseillaise became the roaring voice of a people claiming to be the true source of authority. Its summons—citizens to arms, tyranny's banner raised against them—turned a crowd into a nation and a nation into a judge of its rulers. On the palace steps of any contested succession, its cadence is the sound of the street asserting its mandate.",
        "source": "Claude-Joseph Rouget de Lisle, La Marseillaise (1792), scores and arrangements at IMSLP",
        "href": "https://imslp.org/wiki/La_Marseillaise_(Rouget_de_Lisle,_Claude-Joseph)"
      },
      {
        "category": "artistic",
        "title": "Liberty Leading the People (Le 28 Juillet)",
        "excerpt": "Delacroix paints the crowd itself as the protagonist: a bare-breasted Liberty strides over the fallen, tricolor in one hand and musket in the other, a ragged mass of citizens surging up from the barricades behind her. Painted to commemorate the July Revolution of 1830 that toppled Charles X, it is the definitive image of a people overturning a ruler by force of numbers—the will of the crowd made flesh.",
        "source": "Eugène Delacroix, oil on canvas, 1830, Musée du Louvre (RF 129); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/hungary-orban-protest-sulyok--art.png",
          "alt": "Delacroix's painting of Liberty, a bare-breasted woman holding the French tricolor and a musket, leading an armed crowd over barricades and fallen bodies",
          "credit": "Eugène Delacroix, La Liberté guidant le peuple (1830), Musée du Louvre, Paris — Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "africa-clean-cooking-commitments",
    "headline": "African nations secure $900 million in new pledges to expand clean cooking access",
    "overview": "Governments and partners pledged $900 million in fresh funding to bring clean cooking fuels and stoves to Africa, the International Energy Agency said on July 9–10, 2026, lifting total commitments past $3.1 billion since a 2024 Paris summit. Nearly a billion people on the continent still cook over polluting open fires; the IEA also launched a program to shore up supply chains for fuels such as LPG.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxPSjJPOTFzaEhnLUlVeXVjOTJFLVpTc0ZWZDRieUFPUHhiT2c1R3lLa1dsV29vYWF0SDNKcUt4bGZ5b01HWGJaQ3BtcDlJWWlsQzlIRHlXa1BHNWllV0tWaGwwZHhKOUJiZWN2amszOENKNUN3c1ZXLXNzSGwwNnRoS1c4aUh1LVZuSFBvX0d5QkFRbnFuWjRxc1BzR2o?oc=5"
      },
      {
        "name": "IEA",
        "href": "https://www.iea.org/news/new-commitments-to-clean-cooking-in-africa-reach-900-million-ahead-of-2nd-major-summit"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/africa-clean-cooking-commitments.png",
      "alt": "A cooking pot balanced on stones over an open wood fire, smoke rising.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Vestal Virgins and Rome's perpetual sacred fire",
        "excerpt": "to Numa is ascribed the consecration of the Vestal virgins, and in general the worship and care of the perpetual fire entrusted to their charge.",
        "source": "Plutarch, Life of Numa 9; Bernadotte Perrin translation, Loeb Classical Library (1914), hosted at LacusCurtius (Bill Thayer, University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Numa*.html"
      },
      {
        "category": "historical",
        "title": "Count Rumford's public soup-kitchens: warm, cheap, wholesome food for the poor",
        "excerpt": "At the hour of dinner, a large bell was rung in the court, when those at work in the different parts of the building repaired to the dining-hall; where they found a wholesome and nourishing repast; consisting of about A POUND AND A QUARTER, Avoirdupois weight, of a very rich soup of peas and barley, mixed with cuttings of fine white bread",
        "source": "Benjamin Thompson, Count Rumford, 'Essays, Political, Economical, and Philosophical' (First Essay, 1790s), full text at FullTextArchive",
        "href": "https://www.fulltextarchive.com/book/ESSAYS-Political-Economical-and-Philosophical/"
      },
      {
        "category": "literary",
        "title": "Prometheus, who stole fire as the teacher of every human art",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, 'Prometheus Bound', trans. Theodore Alois Buckley, Project Gutenberg eBook 27458",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "literary",
        "title": "The poor cottager's family gathered round the ingle",
        "excerpt": "The cheerfu' supper done, wi' serious face, / They, round the ingle, form a circle wide;",
        "source": "Robert Burns, 'The Cotter's Saturday Night', in 'The Poetical Works of Robert Burns', Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Poetical_Works_of_Robert_Burns/The_Cotter's_Saturday_Night"
      },
      {
        "category": "artistic",
        "title": "Beethoven, 'The Creatures of Prometheus' (Die Geschöpfe des Prometheus), Op. 43",
        "excerpt": "Beethoven's only full-length ballet (1801) dramatizes Prometheus finding humankind in ignorance and raising it through the gifts of fire, science, and art. Its heroic finale theme so possessed the composer that he reused it in the 'Eroica' Symphony, turning the fire-bringer's myth into a hymn of human elevation.",
        "source": "Ludwig van Beethoven, 'Die Geschöpfe des Prometheus', Op. 43 (1801); full public-domain scores at IMSLP",
        "href": "https://imslp.org/wiki/Die_Gesch%C3%B6pfe_des_Prometheus,_Op.43_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, 'The Potato Eaters' (1885)",
        "excerpt": "Around a rough table in a dim cottage, five peasants share a plain meal of potatoes by the glow of a single hanging lamp. Van Gogh wanted the coarse hands and shadowed faces to show people who had 'tilled the earth' eating honestly by their own light, dignifying the humblest hearth-lit gathering of the poor.",
        "source": "Vincent van Gogh, 'The Potato Eaters', oil on canvas, 1885, Van Gogh Museum, Amsterdam; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_potato_eaters_-_Google_Art_Project_(5776925).jpg",
        "image": {
          "src": "/covers/africa-clean-cooking-commitments--art.png",
          "alt": "Five peasants gathered around a wooden table sharing potatoes by the light of a single hanging oil lamp in a dark cottage interior",
          "credit": "Vincent van Gogh, The Potato Eaters (1885), Van Gogh Museum, Amsterdam / Google Art Project via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "tencent-manus-ai-stake",
    "headline": "Tencent in talks to become the largest shareholder of AI startup Manus after Beijing blocks Meta's takeover",
    "overview": "Tencent is negotiating to become the biggest single shareholder of Manus, the Chinese \"agentic\" AI startup whose $2 billion sale to Meta was blocked by Beijing, people familiar with the matter said on July 10, 2026. Early backers including Tencent and ZhenFund would unwind Meta's deal at the same valuation, shifting the company's ownership decisively toward domestic investors.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPbFpzUmJDMlREcGZWUUdDdlJybWdBY0Q5NXcxUFdiT0NrV3V2OUtyZjVHUmFROHB5c2ZHNjN5QkNmNU0wT2dSdm1YaEJKRklfNFZSWmpEdHVYa2VDNXhEX3FpLUhyZFZCZHlndjhJbE1pQUtRRlpyT0ZOdWdFYVc1S3Z4VC1FamNUdlpXNUxQcjZOa1FBSFlHV044NHFKSlNNWjZwVGFQeU9WZUVCYWZqUDF6cXVRQXc?oc=5"
      },
      {
        "name": "The Next Web",
        "href": "https://thenextweb.com/news/tencent-in-talks-to-become-manus-largest-shareholder"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/tencent-manus-ai-stake.png",
      "alt": "The twin glass towers of Tencent's headquarters in Shenzhen rising behind street trees.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Aristotle imagines self-working tools that would end the need for slaves",
        "excerpt": "if every tool could perform its own work when ordered, or by seeing what to do in advance, like the statues of Daedalus in the story, or the tripods of Hephaestus which the poet says 'enter self-moved the company divine,'—if thus shuttles wove and quills played harps of themselves, master-craftsmen would have no need of assistants and masters no need of slaves.",
        "source": "Aristotle, Politics 1.1253b, trans. H. Rackham (Loeb), Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0058:book=1:section=1253b"
      },
      {
        "category": "historical",
        "title": "Kempelen's chess automaton 'The Turk,' the machine that seemed to think for itself",
        "excerpt": "It is quite certain that the operations of the Automaton are regulated by mind, and by nothing else.",
        "source": "Edgar Allan Poe, 'Maelzel's Chess-Player,' Southern Literary Messenger (1836), Edgar Allan Poe Society of Baltimore",
        "href": "https://www.eapoe.org/works/essays/maelzel.htm"
      },
      {
        "category": "literary",
        "title": "Talos, the bronze guardian who hurled rocks to keep strangers from the shore",
        "excerpt": "And Talos, the man of bronze, as he broke off rocks from the hard cliff, stayed them from fastening hawsers to the shore, when they came to the roadstead of Dicte's haven. He was of the stock of bronze, of the men sprung from ash-trees, the last left among the sons of the gods.",
        "source": "Apollonius Rhodius, Argonautica 4, trans. R. C. Seaton (1912), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/830/pg830.txt"
      },
      {
        "category": "literary",
        "title": "Frankenstein's creature opens its eye and the maker recoils from his own hands' work",
        "excerpt": "I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Shelley, Frankenstein (1818), Chapter 5, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, 'The Sorcerer's Apprentice' (L'apprenti sorcier)",
        "excerpt": "Dukas sets Goethe's fable to a shimmering, quickening orchestra: the apprentice enchants a broom to haul water, then watches in horror as the servant obeys too well, splitting into an unstoppable army that cannot be recalled. Bassoon and brass build to a flood the maker can no longer control, until the master returns to break the spell. It is the theme of the servant that acts on its own, made audible.",
        "source": "Paul Dukas, L'apprenti sorcier, symphonic scherzo after Goethe (Paris: Durand & Fils, 1897), public domain, IMSLP",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)"
      },
      {
        "category": "artistic",
        "title": "The Death of Talos, Attic red-figure volute krater by the Talos Painter, c. 400 BC",
        "excerpt": "On this krater the bronze man Talos, painted in pale white to mark his metal skin, topples backward into the arms of the Dioskouroi as Medea works her spell, draining the single vein at his ankle. It is one of antiquity's rare images of a man-made automaton dying, a metal guardian undone by the very people who sought to master him.",
        "source": "Talos Painter, Attic red-figure volute krater (ARV 1338.1), Museo Nazionale Jatta, Ruvo di Puglia (inv. MANJ 36933); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Talos_Painter_-_ARV_1338_1_-_Dionysos_with_satyrs_and_maenads_-_death_of_Talos_-_Argonauts_and_gods_-_Ruvo_MANJ_36933_-_02.jpg",
        "image": {
          "src": "/covers/tencent-manus-ai-stake--art.png",
          "alt": "Red-figure krater showing the bronze giant Talos, rendered in white, collapsing into the arms of the Dioskouroi as Medea enchants him",
          "credit": "Talos Painter, c. 400 BC, Museo Nazionale Jatta, Ruvo di Puglia; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "easyjet-apollo-takeover",
    "headline": "EasyJet backs Apollo's $7.7 billion takeover bid, dropping its support for a rival offer",
    "overview": "EasyJet said on July 10, 2026 it would recommend a £5.7 billion ($7.7 billion) cash offer from private-equity firm Apollo Global Management, judging it superior to a lower bid from Castlelake it had accepted days earlier. Shares in the Luton-based budget airline jumped about 15% to their highest level since 2022 as a bidding war for the carrier took shape.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPSHd2cTd0TXlycFNqcnZHYml2Qzc1NXRyaWt4UERsRktub0dvR0JGc2NfX2FBNW5CdjVFYkZwX1lfZ21TdlpjSTRRR0ZrVml0RG5zUVU3S1Z3cFV1TGJnQlJUQjR4bFRna2lxVFM5emMtU3ZqY1RuOGhSVWhVaGJGcVdqVnlsSFk4aXBxUURkeWdCcm1EUGF5Y1NhM0QwUVk?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/10/easyjet-apollo-takeover-bid-castlelake-share-price.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/easyjet-apollo-takeover.png",
      "alt": "Two easyJet aircraft in orange-and-white livery parked on an airport tarmac.",
      "credit": "CNBC"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Praetorian Guard auctions the Roman Empire to the highest bidder (193 AD)",
        "excerpt": "For, just as if it had been in some market or auction-room, both the City and its entire empire were auctioned off.",
        "source": "Cassius Dio, Roman History, Epitome of Book LXXIV.11, trans. Earnest Cary (Loeb Classical Library); LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/74*.html"
      },
      {
        "category": "historical",
        "title": "Charles V and Francis I outbid each other for the imperial crown (1519)",
        "excerpt": "When Charles and Francis entered the lists as candidates for the imperial dignity, they conducted their rivalship with many professions of regard for each other... \"We both court the same mistress,\" said Francis, with his usual vivacity; \"each ought to urge his suit with all the address of which he is master; the most fortunate will prevail, and the other must rest contented.\"",
        "source": "William Robertson, The History of the Reign of the Emperor Charles V, Book II (1769); Internet Archive",
        "href": "https://archive.org/details/historyofreign01robe"
      },
      {
        "category": "literary",
        "title": "The suitors devour Odysseus's house while contending for Penelope",
        "excerpt": "the chiefs from all our islands, Dulichium, Same, and the woodland island of Zacynthus, as also all the principal men of Ithaca itself, are eating up my house under the pretext of paying their court to my mother",
        "source": "Homer, The Odyssey, Book I, trans. Samuel Butler; Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm"
      },
      {
        "category": "literary",
        "title": "Portia's rival suitors gamble on the caskets for a prize all the world desires",
        "excerpt": "Who chooseth me shall gain what many men desire.",
        "source": "William Shakespeare, The Merchant of Venice, Act II, Scene VII; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1515/pg1515.txt"
      },
      {
        "category": "artistic",
        "title": "Wagner, Die Meistersinger von Nürnberg — a public song contest whose prize is a bride",
        "excerpt": "Wagner's comedy stages a public singing contest in Nuremberg in which the prize is the hand of Eva Pogner, pledged to whichever mastersinger the guild judges best. The pedantic clerk Beckmesser and the young knight Walther von Stolzing become rival suitors, each straining to outdo the other before the assembled townsfolk, until the finer voice carries off both the trophy and the bride.",
        "source": "Richard Wagner, Die Meistersinger von Nürnberg, WWV 96 (1868); IMSLP",
        "href": "https://imslp.org/wiki/Die_Meistersinger_von_N%C3%BCrnberg,_WWV_96_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "John William Waterhouse, Penelope and the Suitors (1912)",
        "excerpt": "Waterhouse paints Penelope bent over her loom, unweaving by night the shroud that stalls her choice, while a press of suitors crowds the window behind her, thrusting flowers, a lyre, and gifts through the frame to advance their competing claims. The canvas freezes the long siege of rival bidders circling a single prize, each convinced his suit will prevail.",
        "source": "John William Waterhouse, \"Penelope and the Suitors\" (1912), Aberdeen Art Gallery & Museums; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:JohnWilliamWaterhouse-PenelopeandtheSuitors(1912).jpg",
        "image": {
          "src": "/covers/easyjet-apollo-takeover--art.png",
          "alt": "Penelope seated at her loom, unweaving her work, while a crowd of suitors leans through the window behind her offering gifts to win her",
          "credit": "John William Waterhouse (1912), Aberdeen Art Gallery & Museums; Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "vodafone-niel-shareholder",
    "headline": "French billionaire Xavier Niel becomes Vodafone's largest shareholder in a $6 billion deal",
    "overview": "The family group of French telecoms magnate Xavier Niel agreed to buy the roughly 16.2% Vodafone stake held by UAE group e& for about £4.4 billion ($5.9 billion), making Niel the biggest shareholder in Britain's largest mobile operator, the companies said on July 10, 2026. Niel, a longtime advocate of European telecom consolidation, expects to take direct ownership by year's end.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxOWDZrN29mWjdCYWhqM0pHcmkwZzVCR0lJUXYxRVYyQTRDS2RjWlpyd3JKaGMyMWZQTGtHWXBWYnZhZFRfQ2RIZEgwQnRsNkpPeEQzLU96ek8tTEhxa2hQLVFSdDU2RmhjZEVNNzU5b0xtUnR6ZnlzMU9RVzJBMWpuN0NPMnBDZlRrQnFmN0RYdE5iRDJUYWdRSlpWLTRfY3RwekdTTE1rOFFuOVhYRVFRdi0tNkZWcUQ5T19ZeG9pdEpublk?oc=5"
      },
      {
        "name": "The Irish Times",
        "href": "https://www.irishtimes.com/business/2026/07/10/eirs-owner-xavier-niel-becomes-biggest-vodafone-investor-in-6bn-deal/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/vodafone-niel-shareholder.png",
      "alt": "A large white Vodafone sign mounted above a storefront.",
      "credit": "The Irish Times"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Marcus Licinius Crassus, the Richest Man in Rome",
        "excerpt": "he got together out of fire and war, making the public calamities his greatest source of revenue",
        "source": "Plutarch, Life of Crassus, ch. 2, trans. Bernadotte Perrin; Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0038:chapter=2"
      },
      {
        "category": "historical",
        "title": "Cosimo de' Medici, the Banker Who Bought Florence",
        "excerpt": "it appeared there was no citizen of any consequence to whom Cosmo had not lent a large sum of money",
        "source": "Niccolò Machiavelli, The History of Florence, Book VII (Universal Classics Library, 1901); Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2464/2464-h/2464-h.htm"
      },
      {
        "category": "literary",
        "title": "Tamburlaine's Ascent: 'passing brave to be a king'",
        "excerpt": "Is it not passing brave to be a king, / And ride in triumph through Persepolis?",
        "source": "Christopher Marlowe, Tamburlaine the Great, Part I, Act II, Scene V; Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1094/1094-h/1094-h.htm"
      },
      {
        "category": "literary",
        "title": "Frank Cowperwood and the Street-Railways of Chicago",
        "excerpt": "Street-cars, he knew, were his natural vocation. Even more than stock-brokerage, even more than banking, even more than stock-organization he loved the thought of street-cars and the vast manipulative life it suggested.",
        "source": "Theodore Dreiser, The Titan (1914); Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3629/3629-h/3629-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Coronation Scene from Mussorgsky's Boris Godunov",
        "excerpt": "Mussorgsky opens his opera with the great bells of the Kremlin as Boris, having schemed his way to the summit, is crowned Tsar of All Russia. In the Coronation Scene the crowd is marshalled to acclaim the new sovereign while Boris, already burdened by ambition and guilt, prays to rule justly. Pealing bells and a massed chorus swell one man's ascent to supreme power into overwhelming public spectacle.",
        "source": "Modest Mussorgsky, Boris Godunov (1874), vocal and full scores; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "Portrait of Cornelius Vanderbilt (Jared B. Flagg, 1879)",
        "excerpt": "Flagg paints the self-made 'Commodore' who built a transport empire by buying up steamship lines and railroads until he commanded the arteries of a nation. Vanderbilt sits square and immovable in sober black, the very image of a magnate whose fortune was assembled through relentless acquisition. It is the Gilded-Age face of one man consolidating scattered networks into a single dominion.",
        "source": "Jared Bradley Flagg, Portrait of Cornelius Vanderbilt (1879), oil on canvas, Preservation Society of Newport County; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Portrait_of_Cornelius_Vanderbilt.jpg",
        "image": {
          "src": "/covers/vodafone-niel-shareholder--art.png",
          "alt": "Oil portrait of railroad and shipping magnate Cornelius Vanderbilt, seated in dark formal dress",
          "credit": "Jared Bradley Flagg, Portrait of Cornelius Vanderbilt (1879), Preservation Society of Newport County — public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "russia-unjammable-drones-ukraine-grid",
    "headline": "Russia uses small fibre-optic drones to slip past defences and knock out Ukrainian power substations",
    "overview": "Russian forces are flying cheap fibre-optic FPV drones—immune to electronic jamming because they trail a thin cable—to strike high-voltage electricity substations in Ukraine's Sumy region, Reuters reported on July 10, 2026. Investigators verified strikes that threaded through ventilation gaps to destroy autotransformers worth millions, a tactic that a roughly $2,000 drone can carry out from up to 26 km behind the front.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0wFBVV95cUxPNFhpZjBWeVhPRG14SGhuQnZJcDFFRzlMR2xfbURJTXBqTU41X2hDa3RvOXBLYjhmZWxEc1J0cE8tOEVSNmtyOG5NVU1hWmw5dk5KSUFDd3ZLdWpoSHhWeEtOeElRRkJtaU5iT0YxUDVkUVk3OGdQSm9TMkdLYnp3ektHT1UwcXJkbWl0RWNrRjVEQTNGVlB6MEQ4ODYzZjZkRkpQLVpycldOWndvUExrM3B4VG1tYXZaNExKMDFuVXZDdHZVdXJ5Q0M1YWNNcHAxT3Q4?oc=5"
      },
      {
        "name": "Atlantic Council",
        "href": "https://www.atlanticcouncil.org/blogs/ukrainealert/fiber-optics-drones-have-emerged-as-critical-kit-for-both-russia-and-ukraine/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-10",
    "image": {
      "src": "/covers/russia-unjammable-drones-ukraine-grid.png",
      "alt": "A small quadcopter FPV drone carrying a payload flies low over a snow-covered field.",
      "credit": "Atlantic Council"
    },
    "edition": "Afternoon Edition · 10 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "David slings a stone into Goliath's forehead (1 Samuel 17)",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. ... And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth.",
        "source": "The Bible, King James Version, 1 Samuel 17:45,49 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "historical",
        "title": "Operation Chastise: a handful of bombers cripples the Ruhr's dams and power stations (16-17 May 1943)",
        "excerpt": "A single squadron with a purpose-built weapon threaded low over Germany at night and breached the Möhne and Eder dams, unleashing floods that swept away two hydroelectric stations and slashed the Ruhr's steel output to a quarter. A tiny, precisely aimed force reached past massed defences to sever the water and current that fed an entire industrial heartland.",
        "source": "RAF reconnaissance photograph of the breached Möhne Dam, 17 May 1943 (UK Crown, public domain, Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Mohne_Dam_Breached.jpg"
      },
      {
        "category": "literary",
        "title": "Ariadne's thread guides Theseus out of the labyrinth (Ovid, Metamorphoses VIII)",
        "excerpt": "and when the difficult entrance, retraced by none of those who have entered it before, has been found by the aid of the maiden, by means of the thread gathered up again",
        "source": "Ovid, Metamorphoses, Book VIII, trans. Henry T. Riley (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "The Greeks fall on sleeping Troy in the dead of night (Virgil, Aeneid II)",
        "excerpt": "'Twas in the dead of night, when sleep repairs / Our bodies worn with toils, our minds with cares",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "1812 Overture, Op. 49 (Overture solennelle)",
        "excerpt": "Tchaikovsky's festival overture stages an invasion in sound: the Marseillaise of the advancing army swelling against Russian hymns and folk tunes, cannon fire punching through the orchestra as a homeland is overrun and then, in triumph, delivered. It is the din of a nation's defences breaking and reforming under assault.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 (1880), full scores and parts (IMSLP/Petrucci Music Library)",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "David with the Head of Goliath",
        "excerpt": "Caravaggio paints the small victor holding the severed head of the giant, the mighty champion undone by a shepherd boy's stone. Light falls out of surrounding darkness onto the sword and the lifeless face, a meditation on how the great are brought low by the least.",
        "source": "Caravaggio, David with the Head of Goliath, c.1610, oil on canvas, Galleria Borghese, Rome (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "image": {
          "src": "/covers/russia-unjammable-drones-ukraine-grid--art.png",
          "alt": "Caravaggio's David holding the severed head of Goliath, emerging from deep shadow",
          "credit": "Caravaggio, c.1610, Galleria Borghese, Rome; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
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
    "rank": 27
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
    "rank": 28
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
    "rank": 29
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
    "rank": 30
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
    "rank": 31
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
    "rank": 32
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
    "rank": 33
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
    "rank": 34
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
    "rank": 35
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
    "rank": 36
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
    "rank": 37
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
    "rank": 38
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
