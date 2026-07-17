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
// the Afternoon Edition of 13 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Morning Edition of 13 July 2026 and the Evening Edition of 12 July 2026.
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
    "slug": "trump-election-security-primetime-2020-china",
    "headline": "Trump uses a primetime White House address to claim China rigged the 2020 election and to cast doubt on U.S. voting before the midterms",
    "overview": "In a half-hour primetime speech from the White House on Thursday, three months before the November midterm elections, President Trump said he had declassified hundreds of intelligence files that he claimed showed China had tried to swing the 2020 election to Joe Biden, alleging that voter data in 18 states had been \"bought, stolen or hacked,\" including 220 million voter files. The U.S. intelligence community has previously concluded that China did not interfere in the 2020 vote, and reporters were not allowed to question the president. China's foreign ministry rejected the accusations as \"entirely fabricated\" and \"malicious smears.\"",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cx2k9wvv5wyo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPellVNExpdFBaWXp5dlNSTHpOVWRNNUJSRlZHUm1CX2dXVHI0aThrdWpfNmh2T3Q3RERxRWN4dkNzRDFwbUl1OWFYRm9lSjdVaG16cjJLWFI1T29iRV96NXEtclJGZ0tCWm1hcTdaTFhxVTdyS1hKZUczTGs0M2hHbndkQUsxbmlaNEFlZ1d1UkZKSzVObWdLUnhFbmNROXhSeHZGWnRGVUFZS2tTM0tPN1RBLXg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/trump-election-security-primetime-2020-china.png",
      "alt": "President Trump delivering a primetime address from the White House.",
      "credit": "Official White House photo by Daniel Torok, via Wikimedia Commons (public domain, U.S. federal government work)"
    },
    "lead": true,
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 330 BC, defending himself before the Athenian assembly in the speech On the Crown, Demosthenes turned the charge of corruption outward, branding his rival Aeschines a paid agent of Macedon who had sold the city's interests for foreign gold. The accusation of secret foreign money buying a man's loyalty was the classical demagogue's surest weapon: unprovable, inflammatory, and perfectly suited to a crowd primed to suspect betrayal. Trump's primetime claim that China 'bought, stolen or hacked' the votes of 220 million Americans works the same ancient lever, converting political defeat into a story of purchased treason by a foreign power. Then as now, the charge needs no evidence to do its work; it only needs to be spoken loudly enough to poison trust.",
        "excerpt": "You were hired to ruin the interests of your countrymen; and yet, tho you have been caught yourself in open treason, and informed against yourself after the fact, you revile and reproach me for things which you will find any man is chargeable with sooner than I.",
        "source": "Demosthenes, On the Crown (De Corona), 330 BC, trans. Charles Rann Kennedy, in The World's Famous Orations, Vol. I: Greece (1906); Wikisource.",
        "href": "https://en.wikisource.org/wiki/On_the_Crown",
        "image": {
          "src": "/covers/trump-election-security-primetime-2020-china--a0.png",
          "alt": "Marble bust of the orator Demosthenes, Roman copy after a Greek original, Louvre Museum",
          "credit": "Photo by Eric Gaba (Wikimedia user Sting), Louvre Museum, Wikimedia Commons, CC BY-SA 2.5; the ancient bust itself is public domain"
        }
      },
      {
        "category": "historical",
        "title": "On February 9, 1950, Senator Joseph McCarthy stood before a Republican women's club in Wheeling, West Virginia, and waved a paper he said held the names of 205 Communist agents burrowed into the State Department. The list was never produced, the number kept changing, and no name was ever proven, but the theatrical brandishing of a secret dossier and a precise, terrifying figure launched a decade of manufactured suspicion. Trump's invocation of 'declassified files' showing Chinese interference in 18 states echoes McCarthy's method exactly: the unseen document, the oddly specific count, the foreign-directed conspiracy that the audience is asked to fear rather than examine. Both men understood that a number held aloft in a spotlight can override the patient findings of every investigator who actually looked.",
        "excerpt": "While I cannot take the time to name all the men in the State Department who have been named as members of the Communist Party and members of a spy ring, I have here in my hand a list of 205.",
        "source": "Joseph R. McCarthy, address to the Ohio County Women's Republican Club, Wheeling, West Virginia, February 9, 1950; United States Senate historical archive.",
        "href": "https://www.senate.gov/about/powers-procedures/investigations/mccarthy-hearings/communists-in-government-service.htm",
        "image": {
          "src": "/covers/trump-election-security-primetime-2020-china--a1.png",
          "alt": "Portrait photograph of Senator Joseph R. McCarthy, 1954",
          "credit": "United Press photograph, 1954, via Wikimedia Commons (public domain in the United States)"
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Julius Caesar, Mark Antony seizes a public occasion, Caesar's funeral, and turns a grieving crowd into a mob with insinuation and staged revelation, then coldly watches the chaos he has kindled. Left alone after the oration, he drops the mask and admits that his aim was never truth but the unleashing of ruinous passion. The parallel to a leader using a half-hour of primetime television to stir distrust in the vote is precise: the spectacle is the point, and the speaker profits from the disorder that follows. Antony's private glee at the mischief 'afoot' is the demagogue's confession that inflaming the audience, not informing it, was always the plan.",
        "excerpt": "Now let it work. Mischief, thou art afoot,\nTake thou what course thou wilt!",
        "source": "William Shakespeare, Julius Caesar, Act III, Scene ii (c. 1599); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1522/1522-h/1522-h.htm",
        "image": {
          "src": "/covers/trump-election-security-primetime-2020-china--a2.png",
          "alt": "Title page of the 1623 First Folio of Shakespeare's Comedies, Histories, & Tragedies with the Droeshout engraving",
          "credit": "Martin Droeshout engraving, First Folio title page, 1623, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "George Orwell's Nineteen Eighty-Four imagines a state where the enemy is whatever the leader names it that day, where citizens are marshaled into ritual hatred of a foreign power, and where the record of the past is 'rectified' to match the needs of the present. The Party's genius is not that it lies, but that it makes the public doubt any settled fact, so that yesterday's official conclusion can be overwritten tonight. Trump's primetime reversal of the intelligence community's own finding, that China did not interfere in 2020, enacts this logic in real time: the verified past is declassified into a new fiction, and distrust becomes the governing atmosphere. Orwell's warning was never about a single lie but about the manufacture of a reality in which no one can be sure what is true.",
        "excerpt": "Orwell's Oceania stages a daily Two Minutes Hate in which the population is whipped into fury against a shifting external enemy, Eurasia one week, Eastasia the next, and told to believe the switch was always so. In the Ministry of Truth, Winston Smith spends his days feeding inconvenient records down the 'memory hole,' rewriting history so that the Party's latest claim becomes the only past anyone can cite. The horror is quiet and bureaucratic: not the boot on the face alone, but the calm erasure of the very facts against which a lie could be measured.",
        "source": "George Orwell, Nineteen Eighty-Four (Secker & Warburg, 1949), Part One; Project Gutenberg Australia edition.",
        "href": "https://gutenberg.net.au/ebooks01/0100021.txt",
        "image": {
          "src": "/covers/trump-election-security-primetime-2020-china--a3.png",
          "alt": "Press photograph of George Orwell",
          "credit": "Branch of the National Union of Journalists press photo, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Sandro Botticelli's The Calumny of Apelles reconstructs a lost ancient painting as an allegory of the very act of false accusation: a king with the ass's ears of bad judgment leans toward the whispering figures of Ignorance and Suspicion, while a beautiful woman, Calumny, drags an innocent victim by the hair toward the throne, torch in hand. Around them cluster Envy, Fraud, and Deceit, the whole machinery of a manufactured smear. The scene is a diagram of what happens when a ruler prefers the flattering lie to the plain truth, and it maps onto a leader who broadcasts a foreign-conspiracy accusation his own experts have rejected. China's foreign ministry called the charge a 'malicious smear', which is exactly the crime Botticelli painted five centuries ago: calumny dressed as revelation and paraded before power.",
        "excerpt": "On a throne to the right sits a long-eared king flanked by Ignorance and Suspicion who murmur into his ears; before him the ragged figure of Envy leads Calumny, a graceful woman bearing a torch, who hauls a stripped and pleading innocent by the hair, while her attendants Fraud and Deceit adorn her. At the far left the black-cloaked figure of Repentance turns toward the naked figure of Truth, who points to a heaven that the court refuses to see. The panel is a courtroom of lies: false accusation given beauty and momentum, judged by a ruler who has chosen not to look.",
        "source": "Sandro Botticelli, The Calumny of Apelles, tempera on panel, c. 1494-95, Uffizi Gallery, Florence.",
        "href": "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_La_calumnia_de_Apeles.jpg",
        "image": {
          "src": "/covers/trump-election-security-primetime-2020-china--a4.png",
          "alt": "Botticelli's painting The Calumny of Apelles, showing an enthroned king receiving the personifications of slander",
          "credit": "Sandro Botticelli, The Calumny of Apelles (c. 1494-95), Uffizi Gallery, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "In Rossini's The Barber of Seville, the music master Don Basilio explains, in the aria 'La calunnia e un venticello', how to destroy a man: begin with slander as a faint breeze, let it whisper into ears, swell from murmur to roar until it bursts like a cannon shot and leaves the victim crushed beneath a general uproar. Rossini scores the lie's growth as an orchestral crescendo, one of opera's most literal depictions of how a false accusation propagates and doubles until it deafens. A primetime address alleging a stolen election is that venticello amplified to national scale: a suggestion released into eighteen states and 220 million files, engineered to gather force by repetition rather than proof. Basilio's cynical delight is the whole strategy in miniature, calumny built to explode.",
        "excerpt": "La calunnia e un venticello, / un'auretta assai gentile / che insensibile, sottile, / leggermente, dolcemente / incomincia a sussurrar. ... Alla fin trabocca e scoppia, / si propaga, si raddoppia / e produce un'esplosione / come un colpo di cannone, / un tremuoto, un temporale, / un tumulto generale, / che fa l'aria rimbombar.",
        "source": "Cesare Sterbini (libretto), aria 'La calunnia e un venticello' sung by Don Basilio, Act I of Il barbiere di Siviglia, music by Gioachino Rossini (1816); IMSLP.",
        "href": "https://imslp.org/wiki/Il_barbiere_di_Siviglia_(Rossini,_Gioacchino)",
        "image": {
          "src": "/covers/trump-election-security-primetime-2020-china--a5.png",
          "alt": "Photographic portrait of the composer Gioachino Rossini by Etienne Carjat, 1865",
          "credit": "Etienne Carjat, portrait of Gioachino Rossini, 1865, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "tsmc-100-billion-us-chip-expansion",
    "headline": "TSMC pledges another $100 billion for U.S. chip plants, raising its total American investment to about $265 billion",
    "overview": "Taiwan Semiconductor Manufacturing Co. said Thursday it would spend an additional $100 billion to expand chipmaking in the United States, bringing its total U.S. commitments to roughly $265 billion and likely funding four more fabrication plants in Arizona for the most advanced 2-nanometer-and-below chips. Chairman and chief executive C.C. Wei said the money would \"support the strong multiyear demand from our leading U.S. customers.\" The company, riding the artificial-intelligence boom to record profits, raised its 2026 revenue growth forecast to slightly above 40 percent.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxOT2MzZG5oUVN6dDFLX0dtWk5GNXdoakNILXBqRmZsUlQ5NzdEbk1aZTlxcU9xWl9lS1NBLWNwb0JfbWctbUwxeFBKMlNMeVN6UEZmbF95NlRIRVFZbDN2SW9VZjFzUHpTYTljR21GU2xrM1JtRU9ETTFBMnhFeHBQcHRKQzRIV202RWdYZXFmektSalBDckxITVRFeDJNZw?oc=5"
      },
      {
        "name": "Fortune",
        "href": "https://fortune.com/2026/07/16/tsmc-100-billion-us-chip-investment/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/tsmc-100-billion-us-chip-expansion.png",
      "alt": "A silicon wafer being handled inside a semiconductor fabrication plant.",
      "credit": "Photograph by Hunter Trick (TrickHunter), Wikimedia Commons, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the sixth century the Roman emperor Justinian depended on his rival Persia for the age's most coveted high technology: silk, whose secret China and its intermediaries guarded jealously. Then, as Procopius records, two monks smuggled silkworm eggs out of a far eastern land called Serinda and taught Constantinople to breed the worms itself, breaking a foreign monopoly and rooting an advanced craft in new soil. TSMC's transplant of 2-nanometer fabrication from Taiwan to Arizona repeats that ancient logic almost exactly: a superpower, uneasy about relying on distant suppliers for a strategic material, brings the master-craft home. Then it was mulberry leaves and cocoons; now it is extreme-ultraviolet lithography and a $265 billion bet. The impulse to localize the crown jewel of manufacturing is fifteen centuries old.",
        "excerpt": "At about this time certain monks, coming from India and learning that the Emperor Justinian entertained the desire that the Romans should no longer purchase their silk from the Persians, came before the emperor and promised so to settle the silk question that the Romans would no longer purchase this article from their enemies, the Persians, nor indeed from any other nation... They then once more went to Serinda and brought back the eggs to Byzantium, and in the manner described caused them to be transformed into worms, which they fed on the leaves of the mulberry; and thus they made possible from that time forth the production of silk in the land of the Romans.",
        "source": "Procopius, History of the Wars, VIII.xvii (Gothic War IV.17), trans. H. B. Dewing, Loeb Classical Library; text hosted at LacusCurtius (penelope.uchicago.edu, University of Chicago).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Wars/8C*.html",
        "image": {
          "src": "/covers/tsmc-100-billion-us-chip-expansion--a0.png",
          "alt": "Byzantine mosaic of Emperor Justinian I and his court, Basilica of San Vitale, Ravenna, c. 547 CE",
          "credit": "Mosaic of Emperor Justinian I, Basilica of San Vitale, Ravenna (c. 547 CE); Wikimedia Commons, public domain"
        }
      },
      {
        "category": "historical",
        "title": "Britain in the 1790s held the world's decisive industrial technology, the water-powered spinning machinery of Arkwright and Strutt, and forbade the export of both the machines and the men who understood them. Samuel Slater, a young apprentice, defeated the ban by carrying nothing on paper: he memorized the mill's every mechanism, sailed to America in disguise, and rebuilt the machinery by hand in Pawtucket, Rhode Island, founding the American cotton industry and earning the epithet 'Slater the Traitor' back home. His story is the exact ancestor of today's news, only inverted in direction: where advanced manufacturing know-how once flowed illicitly from an old power to a new one, TSMC is now deliberately relocating the planet's most advanced fabrication from Taiwan to the United States. Both episodes turn on the same truth, that a nation's real wealth lies less in a single factory than in the transferable mastery of how to make things. The $100 billion buys buildings; the point is the craft that fills them.",
        "excerpt": "He therefore resolved not to take any pattern, nor have any writing or memorandum about him, but trusted wholly to his acquirements in the business and to his excellent memory.",
        "source": "George S. White, Memoir of Samuel Slater: The Father of American Manufactures (Philadelphia, 1836); full text via the Internet Archive.",
        "href": "https://archive.org/stream/memoirsamuelsla02whitgoog/memoirsamuelsla02whitgoog_djvu.txt",
        "image": {
          "src": "/covers/tsmc-100-billion-us-chip-expansion--a1.png",
          "alt": "Engraved portrait of Samuel Slater, industrialist and founder of the American cotton-spinning industry",
          "credit": "Portrait of Samuel Slater, from The Biographical Cyclopedia of Representative Men of Rhode Island (1881); Wikimedia Commons, public domain"
        }
      },
      {
        "category": "literary",
        "title": "When Solomon set out to build the Temple in Jerusalem, the rising kingdom of Israel did not yet possess the finest metalworking skill, so the king reached abroad and fetched Hiram out of Tyre, a master 'filled with wisdom, and understanding, and cunning to work all works in brass.' The most ambitious construction of the age was thus realized by importing a foreign master-craftsman to execute its most advanced work on new ground. That is precisely the shape of TSMC's move: America, hungry for cutting-edge capacity it cannot yet reproduce alone, summons the world's supreme fabricator to raise its most demanding structures in the Arizona desert. Hiram cast the great pillars and the molten sea in bronze; C. C. Wei's engineers will etch circuits a few atoms wide. Across three thousand years the pattern holds, that monumental national projects lean on borrowed genius.",
        "excerpt": "And king Solomon sent and fetched Hiram out of Tyre. He was a widow's son of the tribe of Naphtali, and his father was a man of Tyre, a worker in brass: and he was filled with wisdom, and understanding, and cunning to work all works in brass. And he came to king Solomon, and wrought all his work.",
        "source": "The Holy Bible, King James Version, 1 Kings 7:13-14; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings",
        "image": {
          "src": "/covers/tsmc-100-billion-us-chip-expansion--a2.png",
          "alt": "James Tissot, Solomon Dedicates the Temple at Jerusalem, gouache, c. 1896-1902",
          "credit": "James Tissot, 'Solomon Dedicates the Temple at Jerusalem' (c. 1896-1902), The Jewish Museum, New York; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "literary",
        "title": "In Book I of Paradise Lost, the fallen angels, needing a capital worthy of their ambition, follow Mammon to tear open the earth and raise Pandaemonium, a vast gleaming hall conjured almost overnight from ransacked mineral wealth. Milton's scene is the archetype of colossal, capital-hungry industry: gold torn from the ground and marshalled at superhuman speed into a monument of power. TSMC's four new Arizona fabs, sprung from raw desert and financed by fortunes staked on an AI-driven future, are a benign echo of that mythic construction, the same union of immense treasure, engineering scale and sheer will to build. Milton meant Mammon as a warning about worshipping 'trodden gold' over higher things; a modern reader can hold both the awe at the feat and the caution about what such fortunes chase. The 'least erected Spirit' still knows how to raise a palace faster than anyone thought possible.",
        "excerpt": "Mammon led them on—\nMammon, the least erected Spirit that fell\nFrom Heaven; for even in Heaven his looks and thoughts\nWere always downward bent, admiring more\nThe riches of heaven's pavement, trodden gold,\nThan aught divine or holy else enjoyed\nIn vision beatific. By him first\nMen also, and by his suggestion taught,\nRansacked the centre, and with impious hands\nRifled the bowels of their mother Earth\nFor treasures better hid.",
        "source": "John Milton, Paradise Lost, Book I (lines 678-688), 1667; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm",
        "image": {
          "src": "/covers/tsmc-100-billion-us-chip-expansion--a3.png",
          "alt": "John Martin, Pandemonium, 1841, oil on canvas, showing the vast infernal palace rising above a fiery landscape",
          "credit": "John Martin, 'Pandemonium' (1841), Musee du Louvre, Paris; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg painted 'Coalbrookdale by Night' in 1801, capturing the Madeley Wood furnaces of Shropshire blazing against the darkness, the very cradle of the Industrial Revolution rendered as an almost apocalyptic vision of fire, smoke and human enterprise. It is the definitive image of a landscape transformed by heavy manufacturing, where a quiet valley becomes the glowing engine of a new economic age. TSMC's Arizona campus is the twenty-first-century successor to Coalbrookdale, another once-empty terrain being remade into a furnace of advanced production, its cleanrooms and construction cranes as defining of our era as those furnaces were of Loutherbourg's. Both scenes fuse dread and wonder at the scale of what industry can raise from raw ground. The geography of manufacturing, then as now, reshapes the very look of the land.",
        "excerpt": "The canvas shows the Madeley Wood (Bedlam) furnaces erupting with orange fire into a smoke-filled night sky, silhouetting sheds, wagons and figures against the blaze. A cold moon and pale distant hills frame the industrial inferno, so that nature and machinery confront each other across the valley. Loutherbourg treats the ironworks with the awe usually reserved for volcanoes or storms, making the birthplace of modern industry look like a scene of sublime terror and creative power at once.",
        "source": "Philip James de Loutherbourg, Coalbrookdale by Night, 1801, oil on canvas, 68 x 107 cm, Science Museum, London (accession 1952-452).",
        "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._-_Coalbrookdale_by_Night_-_WGA13730.jpg",
        "image": {
          "src": "/covers/tsmc-100-billion-us-chip-expansion--a4.png",
          "alt": "Philip James de Loutherbourg, Coalbrookdale by Night, 1801, iron furnaces glowing red against a dark sky",
          "credit": "Philip James de Loutherbourg, 'Coalbrookdale by Night' (1801), Science Museum, London; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "In the third scene of Wagner's Das Rheingold, the orchestra plunges the listener down into Nibelheim, the subterranean forge where the dwarf Alberich, having renounced love for gold, drives his enslaved kinsmen to hammer out a hoard of treasure and the ring that confers total power. The famous clangor of tuned anvils makes audible an entire underground economy dedicated to manufacturing wealth and dominion. The analogy to TSMC is pointed and double-edged: here too is a vast productive complex, a hoard of almost unimaginable value, and a race to control the technology on which mastery of the age depends. Wagner wraps his forge in a warning about what the single-minded pursuit of that power can cost. Whether one hears triumph or caution, the scene captures the mythic weight our civilization places on the machinery that mints the future.",
        "excerpt": "Wagner sends the music spiralling downward through hammering, tuned anvils into the smoky depths of Nibelheim, where an enslaved multitude toils without pause at the forge. Alberich's motif gleams with menace as the accumulated gold becomes both fortune and instrument of domination. The relentless metallic rhythm turns industrial labour itself into a force of overwhelming, almost frightening power.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (1869), scene 3 (Nibelheim); full scores at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/tsmc-100-billion-us-chip-expansion--a5.png",
          "alt": "Illustration of Scene III of Wagner's Das Rheingold, the capture of Alberich in the forge of Nibelheim",
          "credit": "Michael Echter, illustration of Das Rheingold Scene III (the capture of Alberich), from The Victrola Book of the Opera (1917); Wikimedia Commons, public domain"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "iran-strikes-syria-us-command-center",
    "headline": "Iran says it struck a U.S. command centre in eastern Syria, opening a new front in its war with Washington",
    "overview": "Iran's Islamic Revolutionary Guard Corps said Friday it had carried out a \"surprise attack\" on a U.S. special-operations command centre in southeastern Syria, its first strike inside Syria during the current war, in retaliation for a U.S. attack on Bampur, near Iranshahr, that Tehran said had killed seven of its soldiers. The Guard claimed to have destroyed a radar system and several helicopters and to have killed \"a large number\" of Americans, a claim U.S. Central Command has not confirmed and that CNN said it could not verify. Iranian state media said the country had also attacked U.S. bases in Kuwait and Bahrain as fighting over the Strait of Hormuz escalated.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxOQXVvLTBxWklNRDU2M0l1QTZhUmloM0xqbFM2RWwxaS0yckJVNXZTbkFlZDBQUHZHbDVfOGRDdlNlSDJQNUg5VnZodUs5MzdsUjQxZjFyZl9LaTdBbGhxWU16dk9kRXFKZm9OblFOX0NKNWdweGI4UXNLb0daSjNzdGVmZFJzRjZHUzZFWW51OFhXVjNpeHk2SUs2cGhNeC1VMWxsQVNjWkIzTlFBTjhiRUlrS3o2aDBWb2dCOFlHMWVBMFdt?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/17/iran-war-us-trump-syria-bahrain.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/iran-strikes-syria-us-command-center.png",
      "alt": "An oil tanker in the Strait of Hormuz, the waterway at the centre of the U.S.-Iran war.",
      "credit": "NASA MODIS / Terra satellite, 2020; public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 53 BC the Roman triumvir Crassus led seven legions across the Euphrates into Parthian Mesopotamia, certain the era's dominant war machine would sweep the Persian empire aside. On the burning plain of Carrhae the Parthian general Surena sprang his trap: kettle-drums thundered, the horse-archers' scale armour flashed, and a superpower's infantry was encircled and shot to pieces from the saddle, Crassus killed and his eagles taken. It was the humiliation of the age's foremost military power by a Persian force fighting on the contested ground between the rivers. Iran's boast of a surprise strike that destroyed radar and helicopters at a U.S. forward command centre in Syria, hitting the modern superpower on those same Mesopotamian marches, reaches straight back to Surena's ambush of Crassus.",
        "excerpt": "While the Romans were in consternation at this din, suddenly their enemies dropped the coverings of their armour, and were seen to be themselves blazing in helmets and breastplates, their Margianian steel glittering keen and bright, and their horses clad in plates of bronze and steel. [...] But the Parthians now stood at long intervals from one another and began to shoot their arrows from all sides at once, not with any accurate aim (for the dense formation of the Romans would not suffer an archer to miss even if he wished it), but making vigorous and powerful shots from bows which were large and mighty and curved so as to discharge their missiles with great force.",
        "source": "Plutarch, Life of Crassus 24 (trans. Bernadotte Perrin, Loeb Classical Library, 1916).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Crassus*.html",
        "image": {
          "src": "/covers/iran-strikes-syria-us-command-center--a0.png",
          "alt": "Nineteenth-century engraving of the death of Crassus at the Battle of Carrhae, 53 BC",
          "credit": "Cassell's Illustrated Universal History, vol. 3 (1882); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On the eve of the Vietnamese lunar new year in January 1968, North Vietnamese and Viet Cong forces broke the holiday truce with a coordinated wave of surprise assaults on cities and American bases across South Vietnam, even sending a sapper team over the wall of the U.S. Embassy in Saigon. Militarily the offensive was largely repulsed, yet the sheer audacity of striking the superpower's forward strongholds, broadcast into American living rooms, shattered Washington's confidence and turned public opinion against the war. It became the archetype of how a weaker adversary can convert a single spectacular blow against an enemy's command posts into a strategic and psychological earthquake. Iran's claim to have overrun a U.S. special-operations command centre, opening a new front and widening the war, is a bid for exactly that Tet-style shock.",
        "excerpt": "Grainy footage of fighters inside the embassy compound and marines crouched behind its shattered gates carried a message no communique could: nowhere held by the superpower was truly safe. The coordinated strikes on forward bases seized little ground yet cracked the political will behind the war. It endures as the model of the surprise blow whose real target is the enemy's confidence at home.",
        "source": "U.S. Department of State, Office of the Historian, \"U.S. Involvement in the Vietnam War: The Tet Offensive, 1968.\"",
        "href": "https://history.state.gov/milestones/1961-1968/tet",
        "image": {
          "src": "/covers/iran-strikes-syria-us-command-center--a1.png",
          "alt": "U.S. troops at the U.S. Embassy in Saigon during the Tet Offensive, 31 January 1968",
          "credit": "U.S. Army photograph, 1968; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Ferdowsi's Shah Nameh, the tenth-century Persian Book of Kings, turns on cycles of blood-vengeance between Iran and the rival land of Turan. When the innocent prince Irij is murdered by his own brothers, the aged king Feridun spurns their gifts and gold and vows instead that blood alone for blood must pay, setting in motion a war of retaliation carried on by his heirs against the foreign realms that spilled Persian blood. This is the deep grammar of Iranian epic: an injury to one's own must be answered by a strike against the enemy's kingdom, whatever the cost. Tehran's framing of its Syria attack as revenge for the seven soldiers killed at Bampur, blood for blood and a new front opened against Washington, speaks in Feridun's ancient idiom.",
        "excerpt": "The brothers of my murdered boy,\nWho could a father's hopes destroy,\nAn equal punishment will reap,\nAnd lasting vengeance o'er them sweep.\nThey rooted up my favourite tree,\nBut yet a branch remains to me.\nNow the young lion comes apace,\nThe glory of his glorious race;\nHe comes apace, to punish guilt,\nWhere brother's blood was basely spilt;\nAnd blood alone for blood must pay;\nHence with your gold, depart, away!",
        "source": "Firdausi, The Shah Nameh, \"Minuchihr\" (trans. James Atkinson), in The Persian Literature (Project Gutenberg ebook #10315).",
        "href": "https://www.gutenberg.org/cache/epub/10315/pg10315-images.html",
        "image": {
          "src": "/covers/iran-strikes-syria-us-command-center--a2.png",
          "alt": "Persian miniature of the battle between Kay Khusraw and Afrasiyab from the Shahnameh, 1493-1494",
          "credit": "Salik ibn Sa'id, 1493-1494, Freer Gallery of Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In the Book of Judges, Gideon whittles his host down to a mere three hundred and falls upon the vast Midianite camp in the dead of night. At his signal the men shatter their pitchers, blaze their hidden torches and blow their trumpets on every side, crying \"The sword of the LORD, and of Gideon,\" and the panicked enemy turns its swords upon itself and flees. It is scripture's archetype of the surprise night raid: a smaller force striking a sleeping camp with shock, noise and terror rather than numbers. Iran's account of a stealthy surprise attack that overran a forward American command centre reaches for the same Gideon-like drama of the sudden blow that throws a stronger foe into confusion.",
        "excerpt": "So Gideon, and the hundred men that were with him, came unto the outside of the camp in the beginning of the middle watch; and they had but newly set the watch: and they blew the trumpets, and brake the pitchers that were in their hands. And the three companies blew the trumpets, and brake the pitchers, and held the lamps in their left hands, and the trumpets in their right hands to blow withal: and they cried, The sword of the LORD, and of Gideon. And they stood every man in his place round about the camp; and all the host ran, and cried, and fled.",
        "source": "The Holy Bible, Judges 7:19-21 (King James Version).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges",
        "image": {
          "src": "/covers/iran-strikes-syria-us-command-center--a3.png",
          "alt": "Gustave Dore engraving of Gideon's night attack, 'The Midianites Put to Flight,' 1866",
          "credit": "Gustave Dore, 1866, Dore's English Bible; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "John Martin's vast canvas \"The Great Day of His Wrath\" (c. 1851) hurls whole cities into a collapsing, fire-lit abyss: mountains uprooted, buildings pitched into the void, humanity dwarfed by a cataclysm of divine retribution. Painted by an artist obsessed with apocalypse and the sublime terror of destruction, it renders the very idea of wrathful, world-ending vengeance as spectacle. Its blazing ruin is a visual analogue to Iran's boast of a base destroyed, radar and helicopters ablaze and \"a large number\" of Americans killed, and to the wider dread that a tit-for-tat over the Strait of Hormuz could tip into something apocalyptic. The painting is less a report than a mood: the escalation of vengeance imagined at the scale of judgment day.",
        "excerpt": "A whole world comes apart on Martin's canvas: cliffs and cities are flung skyward against a sky of blood-red and sulphur, while tiny human figures tumble into a fathomless chasm of fire. There is no single battle here, only the sublime spectacle of wrath made total, destruction imagined as the end of everything.",
        "source": "John Martin, The Great Day of His Wrath, oil on canvas, c. 1851, Tate Britain, London.",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Great_Day_of_His_Wrath_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/iran-strikes-syria-us-command-center--a4.png",
          "alt": "John Martin's apocalyptic painting 'The Great Day of His Wrath,' c. 1851",
          "credit": "John Martin, c. 1851, Tate Britain; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The opening movement of Gustav Holst's orchestral suite The Planets (1914-1916), \"Mars, the Bringer of War,\" grinds forward on a relentless five-beat ostinato, strings struck with the wood of the bow like distant artillery, brass and drums swelling into a mechanised, pitiless march toward catastrophe. Composed on the eve of the First World War, it is one of music's most vivid portraits of war as an impersonal, escalating machine that crushes everything in its path. That inexorable build, a small motif hardening into overwhelming, grinding violence, mirrors the logic of the current spiral: a strike answered by a strike, Bampur repaid in Bahrain and Kuwait, a command centre for a command centre, each blow feeding the next. Holst's Mars is the sound of escalation with no clear off-switch.",
        "excerpt": "A hammering five-in-a-bar rhythm sets the pulse of a war machine; strings rapped with the wood of the bow rattle like far-off gunfire while the brass climbs in cold, blaring dissonance. The music never relents, only accumulates, until the whole orchestra detonates in crushing chords, the terror of mechanised war rendered as relentless, mounting sound.",
        "source": "Gustav Holst, \"Mars, the Bringer of War,\" from The Planets, Op. 32 (1914-1916).",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)",
        "image": {
          "src": "/covers/iran-strikes-syria-us-command-center--a5.png",
          "alt": "Portrait photograph of composer Gustav Holst, c. 1921",
          "credit": "Herbert Lambert, c. 1921, National Portrait Gallery, London; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "japan-imperial-succession-male-line",
    "headline": "Japan's parliament revises its imperial succession law for the first time in 79 years but keeps the throne closed to women",
    "overview": "Japan's upper house passed a bill on Friday that lets the imperial family adopt single male paternal-line descendants of former royal branches and allows female members to keep their status after marrying commoners, the first revision of the Imperial House Law since 1947. But it leaves intact the ban on women ascending the throne, so Princess Aiko, the emperor's only child, remains ineligible despite broad public support for a female monarch. The change, backed by Prime Minister Sanae Takaichi's conservative party, is meant to shore up a shrinking line of succession now down to three eligible heirs.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cy07rz79zg9o"
      },
      {
        "name": "Nippon.com",
        "href": "https://www.nippon.com/en/news/yjj2026071700121/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/japan-imperial-succession-male-line.png",
      "alt": "The Chrysanthemum Throne and the Japanese imperial palace.",
      "credit": "Photograph by the Prime Minister's Office of Japan (Kantei), 2019, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Fourteen centuries before Japan's parliament reaffirmed that only men may reign, the Chrysanthemum Throne was repeatedly held by women. In 593 the widowed Princess Nukadabe became Empress Suiko, the first of eight female sovereigns who governed the early archipelago, presiding over the arrival of Buddhism and Japan's first constitution. Their reigns are a living refutation of the claim that a woman on the throne betrays 'tradition' — the oldest tradition includes them. That the 2026 revision keeps Princess Aiko ineligible, even while reaching back to defunct branch families for spare men, marks a break with a past in which the sovereign's sex was no barrier at all.",
        "excerpt": "\"the Ministers besought the Empress-consort of the Emperor Nunakura futo-dama-shiki, viz. the Princess Nukada-be, to ascend the throne. The Empress refused, but the public functionaries urged her in memorials three times until she consented, and they accordingly delivered to her the Imperial Seal. ... Winter, 12th month, 8th day. The Empress-consort assumed the Imperial Dignity in the Palace of Toyora.\"",
        "source": "Nihongi: Chronicles of Japan from the Earliest Times to A.D. 697, Book XXII (reign of Empress Suiko), trans. W. G. Aston (London, 1896).",
        "href": "https://en.wikisource.org/wiki/Nihongi:_Chronicles_of_Japan_from_the_Earliest_Times_to_A.D._697/Book_XXII",
        "image": {
          "src": "/covers/japan-imperial-succession-male-line--a0.png",
          "alt": "Painted portrait of Empress Suiko, first reigning empress of Japan, in courtly Heian-style robes",
          "credit": "Tosa Mitsuyoshi, portrait of Empress Suiko (Edo period), Eifuku-ji, Osaka; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "When the Habsburg male line guttered toward extinction, Emperor Charles VI did the opposite of Japan's lawmakers: in 1713 he issued the Pragmatic Sanction, rewriting the succession so his daughter Maria Theresa could inherit an undivided realm. He spent his remaining years bribing Europe's courts to honor it, and still a coalition tried to dismember her lands in the War of the Austrian Succession — yet she reigned forty years and refounded the dynasty. Japan in 2026 faces the same arithmetic of a dwindling house, three eligible men and a beloved only daughter, but chooses the reverse remedy: import distant male cousins by adoption rather than admit the princess before them. Charles bent the law toward his daughter; Tokyo bends the law around Aiko.",
        "excerpt": "\"The emperor Charles VI. settled the law of succession for the dominions of the house of Habsburg by pragmatic sanction first published on the 19th of April 1713, and thereby prepared the way for the great war which ensued upon his death.\"",
        "source": "\"Pragmatic Sanction,\" Encyclopædia Britannica, 11th ed. (1911).",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Pragmatic_Sanction",
        "image": {
          "src": "/covers/japan-imperial-succession-male-line--a1.png",
          "alt": "State portrait of Empress Maria Theresa in ceremonial robes as Queen of Hungary",
          "credit": "Martin van Meytens, portrait of Maria Theresa, 1759, Academy of Fine Arts Vienna; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In the Book of Numbers, five sisters — Mahlah, Noah, Hoglah, Milcah and Tirzah — stand before Moses because their father died 'and had no sons,' and ask why his name should vanish for want of a male heir. The verdict, delivered as divine law, is that the daughters of Zelophehad 'speak right,' and the inheritance passes to them. It is one of scripture's earliest rulings that a line need not die, nor a daughter be dispossessed, simply because no son survives. Japan's imperial house, down to three men and one excluded princess, confronts the very question the sisters posed — and, for now, answers it the other way.",
        "excerpt": "\"Then came the daughters of Zelophehad, the son of Hepher... and these are the names of his daughters; Mahlah, Noah, and Hoglah, and Milcah, and Tirzah. And they stood before Moses, and before Eleazar the priest... Our father died in the wilderness... and had no sons. Why should the name of our father be done away from among his family, because he hath no son? Give unto us therefore a possession among the brethren of our father. And Moses brought their cause before the Lord. And the Lord spake unto Moses, saying, The daughters of Zelophehad speak right: thou shalt surely give them a possession of an inheritance among their father's brethren; and thou shalt cause the inheritance of their father to pass unto them. And thou shalt speak unto the children of Israel, saying, If a man die, and have no son, then ye shall cause his inheritance to pass unto his daughter.\"",
        "source": "Numbers 27:1–8, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Numbers",
        "image": {
          "src": "/covers/japan-imperial-succession-male-line--a2.png",
          "alt": "Illustration of the five daughters of Zelophehad standing before Moses to plead for their inheritance",
          "credit": "'The Daughters of Zelophehad,' from The Bible and Its Story Taught by One Thousand Picture Lessons (1908); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Confucian ethics, which shaped Japan's dynastic thinking as deeply as China's, made the male heir a sacred obligation: Mencius taught that 'to have no posterity is the greatest' of unfilial acts. It is precisely this dread of a broken line — of ancestors left without a son to sustain the rites — that animates the 2026 law's strangest provision, the adoption of paternal-line men from long-abolished princely houses. The logic is ancient and patrilineal to its core: continuity is reckoned through fathers and sons, and a daughter, however direct, is held unable to carry it. Princess Aiko's exclusion is the long shadow this doctrine casts across the Chrysanthemum Throne.",
        "excerpt": "\"Mencius said, 'There are three things which are unfilial, and to have no posterity is the greatest of them. Shun married without informing his parents because of this, lest he should have no posterity. Superior men consider that his doing so was the same as if he had informed them.'\"",
        "source": "Mencius, Book IV (Li Lou), Part I, ch. 26, trans. James Legge, The Chinese Classics, vol. 2 (1861/1895).",
        "href": "https://en.wikisource.org/wiki/The_Chinese_Classics/Volume_2/The_Works_of_Mencius/chapter07",
        "image": {
          "src": "/covers/japan-imperial-succession-male-line--a3.png",
          "alt": "Painted album-leaf portrait of the Confucian philosopher Mencius (Meng Ke)",
          "credit": "Yuan dynasty, 'Half Portraits of the Great Sage and Virtuous Men of Old — Meng Ke,' National Palace Museum, Taipei; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Japanese imperial house traces its descent, and its very right to rule, to Amaterasu — the sun goddess. Shunsai Toshimasa's 1889 triptych captures the moment the world's light returns as she emerges from the rock-cave into which she had withdrawn, coaxed out by the dance of another goddess, Ame-no-Uzume. Here is the founding irony of a throne now closed to women: the dynasty's supreme ancestor is female, and the sacred radiance of the line is imagined as a goddess restored to the sky. As parliament bars Princess Aiko in 2026, the print recalls that Japanese sacred kingship begins not with a father but with a mother of light.",
        "excerpt": "A three-panel woodblock print of the moment daylight returns to the world: the sun goddess Amaterasu, half-emerged from the mouth of the heavenly rock-cave in a blaze of gold, surrounded by the assembled deities as Ame-no-Uzume dances to draw her back into the heavens. Radiant robes and swirling cloud fill the triptych, and the female deity is rendered as the literal source of daylight — and of the imperial line said to descend from her.",
        "source": "Shunsai Toshimasa, Origin of the Cave Door Dance (Amaterasu / Amano-Iwato), colour woodblock triptych, 1889.",
        "href": "https://commons.wikimedia.org/wiki/File:Origin_of_the_Cave_Door_Dance_(Amaterasu)_by_Shunsai_Toshimasa_1889.jpg",
        "image": {
          "src": "/covers/japan-imperial-succession-male-line--a4.png",
          "alt": "Woodblock triptych of the sun goddess Amaterasu emerging in golden light from the heavenly rock-cave as gods look on",
          "credit": "Shunsai Toshimasa, 1889; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Ring cycle ends in Götterdämmerung — 'The Twilight of the Gods' — as an ancient race of divine rulers, corrupted and dwindling, burns to its extinction, and it is a woman, Brünnhilde, who rides into the pyre to end the old order and cleanse the world. The opera stages the anxiety now hanging over the oldest monarchy on earth: a god-descended dynasty contracting toward its last heirs, its survival wagered on blood and law. Japan's answer is to conjure new men from abolished branches rather than let a daughter carry the flame. Wagner's myth hints at the harder truth — that a line guarded too jealously against its women may be the one the twilight finds first.",
        "excerpt": "Across four operas the drama drives toward a final conflagration: the brass and strings surge as Valhalla and its exhausted gods are consumed by fire, and Brünnhilde, torch in hand, rides her horse into the flames. The closing 'Immolation Scene' is among opera's most overwhelming endings — an entire divine dynasty extinguished, its redemption entrusted to the very woman the gods had cast out.",
        "source": "Richard Wagner, Götterdämmerung (Twilight of the Gods), WWV 86D, third day of Der Ring des Nibelungen, first performed 1876.",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)",
        "image": {
          "src": "/covers/japan-imperial-succession-male-line--a5.png",
          "alt": "Arthur Rackham illustration of the valkyrie Brünnhilde, heroine of Wagner's Ring cycle",
          "credit": "Arthur Rackham, 'Brünnhilde,' from The Rhinegold and the Valkyrie (1910); public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "canada-wildfire-smoke-us-air-quality",
    "headline": "Smoke from Canadian wildfires blankets U.S. cities, triggering hazardous air-quality alerts from Detroit to New York",
    "overview": "A thick haze from 858 wildfires burning across Canada spread over cities including New York, Detroit, Toronto, Chicago, Pittsburgh and much of New England on Thursday, prompting hazardous air-quality alerts and warnings for residents to stay indoors. New York's governor called it a \"very serious health situation,\" outdoor summer-camp events and concerts were cancelled, and beaches were closed along popular lakes. In Ontario, one fire forced a First Nations community to evacuate, with its chief saying the community had been \"burnt to ashes.\"",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c0m7n427xd8o"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQd0hyQ29iWXhJWUVoSzJsMlgyQjA4SnMzN0tmb01EUlFOTUU3Nkl2eVQ0UEVjaU1lQXg4MVNfeTNGQ3BDbXdPWlhNanQxQnVZalk3emlXSkk0RHotTXFsYlMwa0VkNVRqRWxVZ2ZsN0o1QTZzSVNudEc5VUNBQ3Rtb18tVXpZSmRxOGRGZDZR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/canada-wildfire-smoke-us-air-quality.png",
      "alt": "A city skyline shrouded in orange haze from distant wildfire smoke.",
      "credit": "Anthony Quintano, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 19 May 1780 a preternatural darkness fell across New England and eastern Canada: birds roosted at noon, roosters crowed, and townsfolk lit candles to work indoors. Scientists studying fire scars in Ontario's Algonquin forests have since traced the gloom to vast Canadian wildfires whose smoke, mingled with fog, blotted out the sun hundreds of miles to the south. The eeriness of that day, a distant northern fire darkening American skies, is exactly the phenomenon now smothering Detroit, New York and New England as 858 Canadian wildfires again send their pall over the same cities. Two and a half centuries later, the Revolutionary soldier Joseph Plumb Martin's astonished eyewitness account reads like a dispatch from this week.",
        "excerpt": "We were here at the time the 'dark day' happened, (19th of May;) it has been said that the darkness was not so great in New-Jersey as in New-England. How great it was there I do not know, but I know that it was very dark where I then was in New-Jersey; so much so that the fowls went to their roosts, the cocks crew and the whip-poor-wills sung their usual serenade; the people had to light candles in their houses to enable them to see to carry on their usual business; the night was as uncommonly dark as the day was.",
        "source": "Joseph Plumb Martin, The Adventures of a Revolutionary Soldier (originally published 1830), Chapter VI",
        "href": "https://en.wikisource.org/wiki/The_Adventures_Of_A_Revolutionary_Soldier/Chapter_VI.",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us-air-quality--a0.png",
          "alt": "Harriet Powers's Pictorial Quilt (1895-1898), whose appliqued panels record celestial wonders including the Dark Day of 19 May 1780",
          "credit": "Harriet Powers, Pictorial Quilt, Museum of Fine Arts, Boston; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In AD 536 a mysterious dust veil dimmed the sun across the Mediterranean for more than a year; the Byzantine historian Procopius, writing during the reign of Justinian, recorded that the sun shed a wan, moon-like light as though in permanent eclipse. Modern ice cores attribute the gloom to a colossal volcanic eruption whose aerosols circled the globe, wrecking harvests and darkening skies far from their source. Like the Canadian smoke now spreading over Toronto, Chicago and the American Northeast, it was a catastrophe whose airborne aftermath reached populations who never saw the fire or the mountain that caused it. Procopius's line captures the same ominous, enfeebled sun that hangs today over hazard-alerted cities.",
        "excerpt": "And it came about during this year that a most dread portent took place. For the sun gave forth its light without brightness, like the moon, during this whole year, and it seemed exceedingly like the sun in eclipse, for the beams it shed were not clear nor such as it is accustomed to shed.",
        "source": "Procopius, History of the Wars, Book IV (The Vandalic War), ch. xiv, trans. H. B. Dewing",
        "href": "https://en.wikisource.org/wiki/History_of_the_Wars/Book_IV",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us-air-quality--a1.png",
          "alt": "Sixth-century Byzantine mosaic of the Emperor Justinian and his court from the Basilica of San Vitale, Ravenna, contemporary with the 536 dust veil",
          "credit": "Master of San Vitale, Ravenna; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The ninth plague of Egypt is a thick darkness so palpable that Scripture calls it a darkness which may be felt, halting all movement and business for three days. It is the archetype of a poisoned, oppressive air descending on a whole land as a sign of catastrophe, precisely the register in which New York's governor called this week's smoke a very serious health situation, with beaches closed and residents told to stay indoors. The biblical image of people unable to see one another, immobilized under a befouled sky, mirrors the choking haze that has shuttered outdoor life from Detroit to New England. Here the analogy is not the fire but the shroud of unbreathable darkness that fire has produced.",
        "excerpt": "And the LORD said unto Moses, Stretch out thine hand toward heaven, that there may be darkness over the land of Egypt, even darkness which may be felt. And Moses stretched forth his hand toward heaven; and there was a thick darkness in all the land of Egypt three days: They saw not one another, neither rose any from his place for three days: but all the children of Israel had light in their dwellings.",
        "source": "The Bible, King James Version, Exodus 10:21-23",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us-air-quality--a2.png",
          "alt": "Gustave Dore's 1866 wood engraving The Ninth Plague: Darkness, showing figures groping under a black sky over Egypt",
          "credit": "Gustave Dore, Dore's English Bible (1866); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Byron wrote 'Darkness' in 1816, the volcanic 'year without a summer,' when Tambora's ash dimmed European skies and inspired his vision of a world whose bright sun was extinguished. The poem's blackened, rayless heavens and men praying for light distil the primal dread of a sky that will not brighten, the same dread stirred as Canadian smoke turns midday orange and grey over American cities. Byron's apocalyptic imagination was itself a response to a real atmospheric catastrophe carried far from its source, just as today's pall drifts from fires hundreds of miles north. His opening lines could serve as the caption for this week's blotted-out sun.",
        "excerpt": "I had a dream, which was not all a dream.\nThe bright sun was extinguished, and the stars\nDid wander darkling in the eternal space,\nRayless, and pathless, and the icy Earth\nSwung blind and blackening in the moonless air;\nMorn came and went - and came, and brought no day,\nAnd men forgot their passions in the dread\nOf this their desolation; and all hearts\nWere chilled into a selfish prayer for light:",
        "source": "Lord Byron, 'Darkness' (1816)",
        "href": "https://en.wikisource.org/wiki/Darkness_(Byron,_1901)",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us-air-quality--a3.png",
          "alt": "John Martin's apocalyptic painting The Great Day of His Wrath (1851-1853), a world convulsed under a fiery, blackened sky",
          "credit": "John Martin, The Great Day of His Wrath, Tate Britain; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner painted 'Chichester Canal' around 1828 with a sun of molten, lurid gold sinking into a hazed sky, colours art historians link to atmospheric ash from the 1815 eruption of Mount Tambora half a world away. Turner turned a distant volcanic catastrophe's airborne residue into strange, glowing beauty, much as this week's Canadian wildfire smoke has painted American skylines in the same uncanny oranges and reds. The painting is a reminder that our most famous 'apocalyptic' skies are often the aesthetic by-product of far-off environmental disaster. Set beside a photograph of a smoke-veiled Manhattan, Turner's burning horizon looks unnervingly contemporary.",
        "excerpt": "Turner's canvas is dominated by a swollen, incandescent sun whose light bleeds across a still canal and stains the whole sky a hazy amber. The haze softens every edge, dissolving masts and shoreline into a glowing, sulphurous atmosphere. It is a distant catastrophe's airborne residue transfigured into eerie, luminous calm, the same lurid palette that smoke now lends to hazard-alerted American cities.",
        "source": "J. M. W. Turner, Chichester Canal (c. 1828), oil on canvas, Tate Britain (N00560)",
        "href": "https://commons.wikimedia.org/wiki/File:Chichester_Canal_(1828).jpg",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us-air-quality--a4.png",
          "alt": "J. M. W. Turner's Chichester Canal (c. 1828), a hazy amber sunset over still water, its colours linked to Tambora's volcanic ash",
          "credit": "J. M. W. Turner, Chichester Canal, Tate Britain; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Edvard Munch said the blood-red sky of 'The Scream' (1893) came from an evening when the sky suddenly turned blood red over the fjord, a colour scholars have connected to the vivid twilights cast worldwide by the 1883 eruption of Krakatoa. In Munch's hands an atmosphere poisoned by distant catastrophe becomes an image of pure dread, a sky so wrong it seems to shriek. That is the emotional key of this week's hazardous-air alerts, as an ominous, unnatural sky presses down on millions from Toronto to New York. The Krakatoa-tinged heavens behind Munch's figure are the ancestor of every smoke-reddened skyline now filling the news.",
        "excerpt": "I was walking along the road with two friends - the sun was setting - suddenly the sky turned blood red - I paused, feeling exhausted, and leaned on the fence - there was blood and tongues of fire above the blue-black fjord and the city - my friends walked on, and I stood there trembling with anxiety - and I sensed an infinite scream passing through nature.",
        "source": "Edvard Munch, diary note on the origin of The Scream (Munch, 1893; translated from the Norwegian)",
        "href": "https://commons.wikimedia.org/wiki/File:Edvard_Munch,_1893,_The_Scream,_oil,_tempera_and_pastel_on_cardboard,_91_x_73_cm,_National_Gallery_of_Norway.jpg",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us-air-quality--a5.png",
          "alt": "Edvard Munch's The Scream (1893), a figure clutching its face beneath a swirling blood-red sky",
          "credit": "Edvard Munch, The Scream, National Gallery of Norway; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "trump-media-truth-api-market-feed",
    "headline": "Trump Media plans to sell Wall Street a millisecond feed of 'market-moving' Truth Social posts",
    "overview": "Trump Media said it will begin selling financial institutions a paid data service, called Truth API, that delivers posts from the platform's highest-ranking accounts—currently led by President Trump—to clients in \"milliseconds,\" starting August 1. The company, which is loss-making, is pitching the round-the-clock feed to traders because Trump's posts on trade and tariffs often move global markets within seconds. Interim chief executive Kevin McGurn said \"markets already move on Truth Social posts\" and that the service would create a steady new source of profit; the firm did not say what it would charge.",
    "genre": "Technology",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c79gw4lj89eo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxNUnBoYzROZWtVQ0xoeVRvSkVOTkNsd1ZOMzNIUFdhLXBZeHg2cmU1Yk1sWmdJY2s1TFlKenFhUFVzSk83V2t3NEdoelo2bEYwX3RPTjJ0WU8ybktvZUFWclo3dTdaZ1k5b0JUdTFCQlVUd3FSZllNb1VjSW9IbkFJWXl4bktpWHAwX0V4REV1NFBVSFFhbDRNNFE1LWhTMEZiaV8yWW1vN3FUeUFVZW1qUE5GVjN5TGRYTWw0R2ozNWxzalNyUEE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/trump-media-truth-api-market-feed.png",
      "alt": "Stock traders watching screens of live market data on a trading floor.",
      "credit": "Thomas Edison's Gold & Stock Telegraph ticker, Henry Ford Museum. Photograph by H. Zimmer, CC BY 3.0, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Aristotle records how Thales of Miletus, mocked for the uselessness of philosophy, read the coming season in the stars, foresaw a bumper olive harvest, and quietly paid deposits on every olive-press in Miletus and Chios at off-season rates, then rented them back at a fortune when demand suddenly spiked. It is the West's oldest recorded market corner, and its lesson is pure: profit can flow not from labor but from knowing first. Trump Media's \"Truth API\" is the same maneuver compressed to milliseconds, selling traders the chance to read the coming weather, a presidential post on tariffs, a beat before everyone else and monetize the spread. Where Thales cornered the presses, the paying subscriber corners the seconds. The instrument is faster, but the edge is identical: information asymmetry sold as a service.",
        "excerpt": "Thales, so the story goes, because of his poverty was taunted with the uselessness of philosophy; but from his knowledge of astronomy he had observed while it was still winter that there was going to be a large crop of olives, so he raised a small sum of money and paid round deposits for the whole of the olive-presses in Miletus and Chios, which he hired at a low rent as nobody was running him up; and when the season arrived, there was a sudden demand for a number of presses at the same time, and by letting them out on what terms he liked he realized a large sum of money.",
        "source": "Aristotle, Politics, Book I, ch. 11 (1259a), trans. H. Rackham (Loeb Classical Library).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0058:book=1:section=1259a",
        "image": {
          "src": "/covers/trump-media-truth-api-market-feed--a0.png",
          "alt": "Engraved bust portrait of the ancient Greek philosopher Thales of Miletus.",
          "credit": "Thales of Miletus, engraving by Wilhelm Meyer in Illustrerad verldshistoria (1875). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Legend, burnished by the House of Rothschild's own mystique, holds that Nathan Mayer Rothschild, through a private network of fast boats and couriers, learned of Wellington's victory at Waterloo in June 1815 a full day before the British government's official dispatch, and traded the news on the London exchange before it broke to the public. Whether he made a killing or merely a myth, the episode became the founding parable of speed-as-money: the man with the fastest line to the decisive word owns the market's next move. Trump Media turns that private courier into a subscription product, promising Wall Street the President's market-moving words in milliseconds. Rothschild's packet-boats and riders have become a paid data feed, and the carrier pigeon that beat the market is now sold by the yard.",
        "excerpt": "According to the enduring legend of Waterloo, Nathan Rothschild's couriers carried word of Napoleon's defeat across the Channel ahead of every rival, letting the banker act on the century's most consequential news while London still waited in ignorance. The tale endures precisely because it dramatizes an eternal truth of speculation: privileged early access to price-moving information is itself a form of wealth. Fast intelligence, whether by boat, pigeon, or fiber-optic feed, is the edge that no one who possesses it willingly shares for free.",
        "source": "The Waterloo legend of Nathan Mayer Rothschild (1777-1836); see Niall Ferguson, The House of Rothschild (1998), and The Rothschild Archive.",
        "href": "https://en.wikipedia.org/wiki/Nathan_Mayer_Rothschild",
        "image": {
          "src": "/covers/trump-media-truth-api-market-feed--a1.png",
          "alt": "Portrait of the London banker Nathan Mayer Rothschild.",
          "credit": "Nathan Mayer Rothschild, from the Jewish Encyclopedia (1901-1906). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In the opening of Aeschylus's Agamemnon, Clytemnestra reveals how the fall of Troy reached Argos not by ship or runner but by a relay of beacon-fires leaping mountain to mountain across the Aegean, from Ida to Lemnos to Athos and onward, so that the queen holds the war's decisive news while the sleeping city knows nothing. It is antiquity's telegraph, and its whole point is power: she who receives the signal first can act first. Trump Media's \"Truth API\" is Clytemnestra's beacon chain sold to subscribers, a purpose-built relay engineered to carry the ruler's word to a chosen few in milliseconds, ahead of the crowd. The medium is fiber and code rather than pine and flame, but the prize is unchanged: to know, and to move, before the rest of the city.",
        "excerpt": "Hephaestus, from Ida speeding forth his brilliant blaze. Beacon passed beacon on to us by courier-flame: Ida, to the Hermaean crag in Lemnos; to the mighty blaze upon the island succeeded, third, the summit of Athos sacred to Zeus.",
        "source": "Aeschylus, Agamemnon, lines 281-285, trans. Herbert Weir Smyth (Loeb Classical Library, 1926).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0004:card=281",
        "image": {
          "src": "/covers/trump-media-truth-api-market-feed--a2.png",
          "alt": "Painting of Clytemnestra standing after the murder, holding an axe, by John Collier.",
          "credit": "John Collier, Clytemnestra (1882), Guildhall Art Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Genesis, Joseph alone can read Pharaoh's dreams of coming plenty and famine, and on the strength of that foreknowledge he gathers grain \"as the sand of the sea\" through the fat years, then, when scarcity strikes, opens the storehouses and sells to a starving world that streams into Egypt to buy. It is scripture's archetype of privileged information: the one who knows the future first controls the market when it arrives, and the sovereign's household reaps the profit. Trump Media updates the tale, selling not a forecast of the harvest but the very moment a ruler's own words tip the market, letting subscribers buy before the famine of ignorance breaks over ordinary traders. The powerful still profit from foreknowledge of their own storehouse; now the storehouse is a social-media feed.",
        "excerpt": "And Joseph gathered corn as the sand of the sea, very much, until he left numbering; for it was without number. ... And all countries came into Egypt to Joseph for to buy corn; because that the famine was so sore in all lands.",
        "source": "Genesis 41:49, 57, King James Version.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/trump-media-truth-api-market-feed--a3.png",
          "alt": "Painting of Joseph enthroned as overseer of Pharaoh's granaries while a scribe tallies the grain.",
          "credit": "Lawrence Alma-Tadema, Joseph, Overseer of Pharaoh's Granaries (1874). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Edgar Degas's Portraits at the Stock Exchange (c. 1878-79) shows the financier Ernest May at the Paris Bourse, a companion leaning in to murmur something at his ear while brokers press behind, a painting built entirely around the whispered tip, the passing of a word that moves money. Degas captures the exact social physics of the modern market: value is minted in who hears what, a half-second before whom. Trump Media's \"Truth API\" industrializes that whisper, replacing the leaned-in confidence with a paid millisecond feed of the President's posts. What Degas painted as an intimate act of privileged access becomes a subscription line item, the whisper at the ear wired to Wall Street and metered by the millisecond.",
        "excerpt": "Degas's canvas frames the market as a theater of confidences: at the center a broker inclines toward Ernest May's ear, his gloved hand almost touching the paper, while a crush of dark-suited figures dissolves into the background. Nothing is bought or sold in the picture except attention itself, the split-second advantage of hearing the word first. The painting makes visible the invisible commodity of the exchange, information delivered privately and acted upon before the room can catch up.",
        "source": "Edgar Degas, Portraits a la Bourse (Portraits at the Stock Exchange), c. 1878-1879, oil on canvas, Musee d'Orsay, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Edgar_Degas_-_Portraits_at_the_Stock_Exchange_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/trump-media-truth-api-market-feed--a4.png",
          "alt": "Impressionist painting of a financier at the Paris stock exchange with a colleague whispering in his ear.",
          "credit": "Edgar Degas, Portraits at the Stock Exchange (c. 1878-79), Musee d'Orsay. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "William Hogarth's Emblematical Print on the South Sea Scheme (1721) is the first great satire of a market driven by rumor and access: crowds ride a giddy merry-go-round of speculation while Honesty is broken on a wheel and Fortune's favorites cash out, all whipped up by the promise of easy gain and the manipulation of who knows what. It indicts precisely the ecosystem a \"Truth API\" invites, speculation feeding on privileged, price-moving information, and the well-placed profiting from a frenzy of their own making. Where the South Sea directors talked the market up and sold at the top, Trump Media proposes to sell the utterer's very words as tradable signal. Hogarth's carnival of credulous speculators is our warning label: when the word that moves the market is for sale, the wheel keeps turning and someone always ends up broken beneath it.",
        "excerpt": "Hogarth crowds his print with allegory: a wooden merry-go-round of speculators spins beside a monument inscribed to the ruin of the city by the South Sea scheme, while Honesty is broken on a wheel and Honour is flogged. Villainy, Self-Interest and a leering Devil carve up the body of Fortune and toss the pieces to the scrambling mob. The engraving reads as a single verdict on markets governed by rumor, access and the greed of the well-positioned few.",
        "source": "William Hogarth, Emblematical Print on the South Sea Scheme (The South Sea Scheme), 1721, engraving.",
        "href": "https://en.wikipedia.org/wiki/Emblematical_Print_on_the_South_Sea_Scheme",
        "image": {
          "src": "/covers/trump-media-truth-api-market-feed--a5.png",
          "alt": "Satirical engraving showing crowds of speculators around a merry-go-round during the South Sea Bubble.",
          "credit": "William Hogarth, The South Sea Scheme (1721). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "volkswagen-overhaul-140000-jobs",
    "headline": "Volkswagen's works council says a planned overhaul could cost up to 140,000 jobs as workers prepare to confront the CEO",
    "overview": "Volkswagen's works council said a sweeping restructuring being weighed by chief executive Oliver Blume could ultimately threaten as many as 140,000 jobs, as employee representatives prepared to question him over plans to cut costs at Europe's largest carmaker. Blume has outlined tens of thousands of fresh job cuts on top of an earlier savings drive, along with proposals to halve the model lineup, cut annual capacity to nine million vehicles and potentially close four German plants. The works council and the IG Metall union vowed to \"do everything in our power\" to block the measures.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPZXI5V2RULThybkNadEROSVctcnpWc3FJUlozR2ZYaGJwZXg2TFNsMEs0SXlNV1JhODdjUlUtLXVTLXdFX1FpOGxUMkw1dWxxeEY4UkZJNFNib2ZuSmIteHdMams4R3AyUE9HZ2VEV0hleDhjTWpYRjdGSzV4VHBONkRVOEthTm02MnhUS3Y3cldYYlVzU1pncDI2MTFTR0RUQ1pJX0lWZkFTTkIzZDVZNHlLV3puN00?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-13/vw-ceo-outlines-up-to-50-000-more-job-cuts-to-hit-savings-goals"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/volkswagen-overhaul-140000-jobs.png",
      "alt": "Car bodies moving down a Volkswagen assembly line.",
      "credit": "Volkswagen assembly line, Wolfsburg, 1960, via Wikimedia Commons (CC BY-SA 2.0)"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 494 BC the plebeians of Rome, crushed by debt and denied a political voice, simply walked out of the city and encamped on the Sacred Mount, refusing to work or fight until their grievances were heard - the first recorded general strike, or secessio plebis. The patricians, unable to run the republic without the labour they took for granted, sent the orator Menenius Agrippa, who won the plebs back with his famous parable of the belly and the limbs and the creation of the tribunes to defend them. Volkswagen's works council and IG Metall, vowing to 'do everything in our power' to block Oliver Blume's cuts, are the direct heirs of that ancient withdrawal of labour: a reminder that when the people who actually do the work down tools, even the mightiest institution must come to the table. Then as now, the quarrel is over who bears the cost when the body politic - or the corporation - decides some members may be starved so others may thrive.",
        "excerpt": "In the days when all the parts of the human body were not as now agreeing together, but each member took its own course and spoke its own speech, the other members, indignant at seeing that everything acquired by their care and labour and ministry went to the belly, whilst it, undisturbed in the middle of them, did nothing but enjoy the pleasures provided for it, entered into a conspiracy.",
        "source": "Livy, The History of Rome (Ab Urbe Condita), Book II.32, trans. Rev. Canon Roberts",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=2:chapter=32",
        "image": {
          "src": "/covers/volkswagen-overhaul-140000-jobs--a0.png",
          "alt": "Nineteenth-century engraving of the secession of the plebeians to the Sacred Mount",
          "credit": "B. Barloccini, 'Secession of the People to the Mons Sacer' (1849), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Between 1811 and 1816 the Luddites - skilled English textile workers - smashed the mechanised frames and power looms that were throwing them out of work and driving down wages, until Parliament made frame-breaking a capital crime. In his maiden speech to the House of Lords in February 1812, Lord Byron rose to defend them, insisting that men reduced to starvation by 'improvements in mechanism' deserved bread, not the gallows. His words frame the deepest theme of Volkswagen's crisis: the machine that makes one worker do the work of many, and the human beings 'thrown out of employment' as capacity is cut and plants are shuttered. When the VW works council warns that up to 140,000 jobs and four German factories are at risk, it echoes a two-century argument over whether efficiency should be pursued at any cost to the labourer's dignity.",
        "excerpt": "These machines were to them an advantage, inasmuch as they superseded the necessity of employing a number of workmen, who were left in consequence to starve. By the adoption of one species of Frame in particular, one man performed the work of many, and the superfluous labourers were thrown out of employment... the rejected workmen, in the blindness of their ignorance, instead of rejoicing at these improvements in arts so beneficial to mankind, conceived themselves to be sacrificed to improvements in mechanism.",
        "source": "George Gordon, Lord Byron, Speech on the Frame Work Bill, House of Lords, 27 February 1812, in The Parliamentary Speeches of Lord Byron (1824)",
        "href": "https://archive.org/stream/parliamentaryspe01byro/parliamentaryspe01byro_djvu.txt",
        "image": {
          "src": "/covers/volkswagen-overhaul-140000-jobs--a1.png",
          "alt": "'The Leader of the Luddites', 1812 hand-coloured etching of a machine-breaker",
          "credit": "'The Leader of the Luddites' (1812), hand-coloured etching, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Emile Zola's Germinal (1885) is the great epic of labour against capital: the miners of Montsou, ground down by wage cuts, rise in a doomed strike against a faceless Company that treats them as interchangeable fuel. Zola personifies the pit itself, Le Voreux, as a crouching, gluttonous beast that swallows men whole - the machine and the corporation fused into a single devouring monster. That image maps onto Volkswagen's predicament with uncanny force: a colossal industrial organism, Europe's largest carmaker, contracting its jaws and preparing to consume the livelihoods of tens of thousands. When VW workers assemble to confront their CEO, they step into the same ancient drama Zola dramatised - the collective body of labour facing the cold arithmetic of the balance sheet.",
        "excerpt": "This pit, piled up in the bottom of a hollow, with its squat brick buildings, raising its chimney like a threatening horn, seemed to him to have the evil air of a gluttonous beast crouching there to devour the earth.",
        "source": "Emile Zola, Germinal (1885), trans. Havelock Ellis, Chapter I",
        "href": "https://www.gutenberg.org/files/56528/56528-h/56528-h.htm",
        "image": {
          "src": "/covers/volkswagen-overhaul-140000-jobs--a2.png",
          "alt": "Constantin Meunier painting of coal miners returning from the pit",
          "credit": "Constantin Meunier, 'Return of the Miners', public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Charles Dickens's Hard Times (1854) gave English literature its enduring nightmare of industrial life: Coketown, where the steam-engine's piston works 'monotonously up and down, like the head of an elephant in a state of melancholy madness', and where the workers are known collectively and coldly as 'the Hands'. Dickens indicts a philosophy that reduces human beings to units of production, useful only for the labour their hands can supply and discarded when the ledger demands. Volkswagen's restructuring speaks that same language - capacity, model counts, plant closures - the abstractions behind which stand living workers and the towns built around their factories. To halve the model range and gut whole plants is to treat the Hands once more as mere figures to be subtracted, exactly the dehumanisation Dickens set out to expose.",
        "excerpt": "It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Charles Dickens, Hard Times (1854), Book I, Chapter V, 'The Key-note'",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm",
        "image": {
          "src": "/covers/volkswagen-overhaul-140000-jobs--a3.png",
          "alt": "Interior of a Lancashire cotton mill with workers tending power looms, engraving of 1835",
          "credit": "'Powerloom weaving in 1835', engraving after T. Allom, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Robert Koehler's monumental canvas The Strike (Der Streik, 1886) freezes the exact moment Volkswagen's workers now approach: labourers massed outside the mill gates, confronting the top-hatted owner who stands on his steps as one worker stoops to pick up a stone. Painted the year of the Haymarket affair, it became an icon of organised labour precisely because it captures the charged instant when deference curdles into defiance and management must finally face the people it employs. That is the tableau promised as VW's works council and IG Metall prepare to 'confront the CEO' over cuts that could cost 140,000 jobs. Koehler's crowd - anxious, angry, resolute - is a portrait of collective power discovering its voice, the same voice German trade unionists are raising in Wolfsburg today.",
        "excerpt": "Painted in 1886, Koehler's wide, cinematic canvas stages a confrontation between striking factory hands and their employer at the gates of the works. The owner in his frock coat and top hat stands rigid on the steps while the workers surge below - some pleading, some furious, one bending to seize a rock from the ground. It is one of the first great paintings to place the collective worker, rather than the individual hero, at the centre of the drama, and it reads today as the archetype of every showdown between a workforce and the boss.",
        "source": "Robert Koehler, The Strike (Der Streik), oil on canvas, 1886, Deutsches Historisches Museum, Berlin",
        "href": "https://commons.wikimedia.org/wiki/File:Robert_Koehler_-_Der_Streik_(1886).jpg",
        "image": {
          "src": "/covers/volkswagen-overhaul-140000-jobs--a4.png",
          "alt": "Robert Koehler's 1886 painting of factory workers confronting a top-hatted employer during a strike",
          "credit": "Robert Koehler, 'The Strike' (1886), Deutsches Historisches Museum, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Diego Rivera's Detroit Industry Murals (1932-33), painted for the Detroit Institute of Arts at the depth of the Depression, are the twentieth century's greatest hymn to - and reckoning with - the automobile assembly line. Across vast frescoed walls, ranks of workers move in choreographed labour beside the churning machinery of Ford's River Rouge plant, human bodies and mechanical forms locked in a single mighty, ambivalent rhythm. Rivera captured both the grandeur of industrial production and the way the line subordinates the worker to the machine's tempo - the very tension now tearing at Volkswagen. As Europe's largest carmaker moves to cut capacity to nine million cars and close plants, Rivera's murals stand as a warning that the auto industry's dream of mechanised abundance has always rested on the fragile, precarious dignity of the men and women on the line.",
        "excerpt": "Rivera's frescoes wrap the museum court in a continuous panorama of automobile manufacture: rows of half-clothed workers heave, bend and haul beside conveyor belts and blast furnaces, dwarfed by the great presses and engine blocks of the Ford Rouge complex. The machinery is rendered with the reverence of cathedral sculpture, yet the human figures - varied in race and strained in posture - keep insisting on the labour that makes the marvel possible. It remains the definitive image of the modern car plant as both temple and treadmill.",
        "source": "Diego Rivera, Detroit Industry Murals (north wall), fresco, 1932-33, Detroit Institute of Arts",
        "href": "https://dia.org/collection/detroit-industry-north-wall/58538",
        "image": {
          "src": "/covers/volkswagen-overhaul-140000-jobs--a5.png",
          "alt": "Diego Rivera's Detroit Industry mural north wall depicting workers on a Ford automobile assembly line",
          "credit": "Diego Rivera, 'Detroit Industry' (north wall, 1932-33), Detroit Institute of Arts, via Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "kimi-k3-largest-open-model",
    "headline": "China's Moonshot AI releases Kimi K3, a 2.8-trillion-parameter model it calls the world's largest open-weight system",
    "overview": "The Chinese startup Moonshot AI unveiled Kimi K3 on Thursday, a mixture-of-experts model with about 2.8 trillion parameters and a one-million-token context window that it says is the largest open-source model yet released and that benchmarks close to the strongest proprietary systems from Anthropic and OpenAI. The model, whose full weights are due to be published on July 27 under a modified MIT licence, is priced at $3 per million input tokens and $15 per million output tokens—the most expensive of any Chinese lab and on par with Anthropic's Claude Sonnet series. It leans on two in-house architectural inventions, Kimi Delta Attention and Attention Residuals.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Simon Willison",
        "href": "https://simonwillison.net/2026/Jul/16/kimi-k3/"
      },
      {
        "name": "VentureBeat",
        "href": "https://venturebeat.com/technology/chinas-moonshot-ai-releases-kimi-k3-the-largest-open-source-model-ever-rivaling-top-u-s-systems"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/kimi-k3-largest-open-model.png",
      "alt": "An abstract visualization of a large neural network of glowing nodes.",
      "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna. Public domain via Wikimedia Commons."
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the third century BCE the Ptolemies of Alexandria set out to gather every scroll on earth into a single house of learning, buying, copying, and even confiscating books until the collection swelled toward half a million rolls, a colossal open store of the world's knowledge freely consultable by scholars. Moonshot AI's Kimi K3 revives that Alexandrian ambition in silicon: a 2.8-trillion-parameter model with a million-token memory, its full weights thrown open to all comers under a near-MIT licence. Where Demetrius commanded 'vast sums of money' to hoard the wisdom of every nation, a Chinese lab now spends its compute to compress that wisdom into weights anyone may download. Both gestures wager that knowledge concentrated and shared, rather than guarded, is the surest foundation of a golden age, and both provoke rival powers who would rather keep their libraries private.",
        "excerpt": "Demetrius of Phalerum, the president of the king's library, received vast sums of money, for the purpose of collecting together, as far as he possibly could, all the books in the world. By means of purchase and transcription, he carried out, to the best of his ability, the purpose of the king.",
        "source": "The Letter of Aristeas, sections 9-10, translated by H. St. J. Thackeray (public domain), describing the ambition of the Great Library of Alexandria.",
        "href": "https://www.attalus.org/translate/aristeas1.html",
        "image": {
          "src": "/covers/kimi-k3-largest-open-model--a0.png",
          "alt": "Nineteenth-century engraving imagining the Great Library of Alexandria, scholars conversing among scrolls and columned halls",
          "credit": "O. Von Corven, The Great Library of Alexandria (19th-century engraving). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "When Johannes Gutenberg pressed movable type into service around 1450, a technology once confined to slow monastic scriptoria became an engine that flooded Europe with cheap books, breaking the clergy's monopoly on the written word and igniting the Reformation and the scientific revolution. Francis Bacon, looking back, ranked printing among the three inventions that had remade the whole world. Kimi K3 is the print revolution's heir: a powerful generative intelligence released not as a jealously licensed proprietary service but as open weights, priced to undercut and shipped to anyone with a hard drive. As printing turned scarce manuscripts into a public commons and unseated established authorities, an open frontier-class model threatens to democratise a capability the largest Western labs had hoped to meter and control.",
        "excerpt": "Again, we should notice the force, effect, and consequences of inventions, which are nowhere more conspicuous than in those three which were unknown to the ancients; namely, printing, gunpowder, and the compass. For these three have changed the appearance and state of the whole world: first in literature, then in warfare, and lastly in navigation; and innumerable changes have been thence derived, so that no empire, sect, or star, appears to have exercised a greater power and influence on human affairs than these mechanical discoveries.",
        "source": "Francis Bacon, Novum Organum, Book I, Aphorism CXXIX, translated by Joseph Devey (1902), on printing as a world-changing invention.",
        "href": "https://www.gutenberg.org/files/45988/45988-h/45988-h.htm",
        "image": {
          "src": "/covers/kimi-k3-largest-open-model--a1.png",
          "alt": "Jost Amman's 1568 woodcut of a printing workshop, a compositor and pressman at an early wooden printing press",
          "credit": "Jost Amman, The Printer, woodcut from Das Standebuch (1568). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus's Prometheus is the archetype of the benefactor who steals a jealously guarded power of the gods and hands it freely to mortals, and in his great speech he claims to have given humanity not only fire but number, letters, and the memory that undergirds every art. Kimi K3 is a Promethean gift in exactly this key: intelligence itself, once the closely held property of a few Olympian labs, unbound and offered to the whole species under an open licence. Moonshot's engineers, like the Titan, defy the reigning powers who would keep the flame proprietary, and they too may reckon with a backlash from those who fear what mortals will do with such a gift. The play insists that civilisation itself springs from knowledge released rather than hoarded, the very wager an open-weight supermodel makes.",
        "excerpt": "Yes, and numbers, too, chiefest of sciences, I invented for them, and the combining of letters, creative mother of the Muses' arts, with which to hold all things in memory.",
        "source": "Aeschylus, Prometheus Bound, lines 459-461, translated by Herbert Weir Smyth (1926), Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0010%3Acard%3D436",
        "image": {
          "src": "/covers/kimi-k3-largest-open-model--a2.png",
          "alt": "Peter Paul Rubens's painting Prometheus Bound, the Titan chained to a rock as an eagle tears at him for gifting fire to mankind",
          "credit": "Peter Paul Rubens, Prometheus Bound (c. 1611-1618), Philadelphia Museum of Art. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Mary Shelley subtitled her novel 'The Modern Prometheus,' and her Victor Frankenstein embodies the ecstasy and dread of a maker who discovers the secret of animating matter and dares to bring a new intelligence into being. Kimi K3's 2.8 trillion parameters are a comparable act of creation at colossal scale, and its release to the public transforms the private laboratory experiment into a thing loosed upon the world. Shelley's tale is the enduring cautionary myth of the age of artificial minds: the question is never only whether the creature can be made, but whether its maker can answer for it once it walks free. To open the weights of a frontier model is to grant the creature its own life beyond the creator's control, precisely the moral hazard that has haunted the Modern Prometheus for two centuries.",
        "excerpt": "After days and nights of incredible labour and fatigue, I succeeded in discovering the cause of generation and life; nay, more, I became myself capable of bestowing animation upon lifeless matter.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818; 1831 edition), Chapter 4.",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm",
        "image": {
          "src": "/covers/kimi-k3-largest-open-model--a3.png",
          "alt": "Theodor von Holst's 1831 frontispiece to Frankenstein, the newly animated creature rising as its horrified maker flees",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Heinrich Friedrich Fuger's Prometheus Brings Fire to Mankind renders the myth as pure gift: the Titan bends toward crouching mortals and touches his torch to theirs, and light spreads visibly from one hand to the next. It is an image of a transformative power passing out of divine keeping and into open circulation, kindling flame after flame with no diminishment of the source. That is precisely the logic of an open-weight release like Kimi K3: once the model is downloaded, copied, and fine-tuned across the world, the capability propagates like Fuger's fire, illuminating countless new hands from a single act of generosity. The painting's warm chiaroscuro captures both the promise and the danger of handing so potent a flame to the crowd.",
        "excerpt": "Fuger's neoclassical canvas stages the exact moment of transmission, the Titan's torch meeting the mortals' in a burst of gold against deep shadow. Bodies lean in from the dark toward the new light, their faces lit by a power that was, an instant before, the exclusive property of the gods. The composition makes an abstract idea tangible: a jealously guarded intelligence becoming, in a single gesture, freely shared.",
        "source": "Heinrich Friedrich Fuger, Prometheus Brings Fire to Mankind (c. 1817), oil on canvas, Liechtenstein Museum, Vienna.",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/kimi-k3-largest-open-model--a4.png",
          "alt": "Heinrich Fuger's painting Prometheus Brings Fire to Mankind, the Titan passing a burning torch to mortals emerging from darkness",
          "credit": "Heinrich Friedrich Fuger, Prometheus Brings Fire to Mankind (c. 1817). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven's only ballet, The Creatures of Prometheus, dramatises the Titan animating two lifeless clay statues and leading them to the gods to be schooled in the arts and sciences, its exuberant overture heralding the birth of new beings quickened by a stolen spark. The score is a celebration of creation and enlightenment, of raw matter awakened into intelligent life and then taught to reason and to feel. Kimi K3 sounds the same triumphant note: an artificial mind stirred into being at unprecedented scale and then set loose to be tutored by the whole world through open weights. Beethoven's music frames the Promethean act not as transgression but as jubilant gift, the same optimistic register in which a lab releasing its largest model invites all humanity to become its teachers and heirs.",
        "excerpt": "Beethoven's overture opens with a jolt of harmony and then races forward in bright, breathless strings, the musical image of inert matter suddenly quickened into motion. The ballet that follows leads its newborn creatures from clumsy first steps toward grace, knowledge, and joy. It is the Promethean spark scored for orchestra, creation heard as celebration rather than as crime.",
        "source": "Ludwig van Beethoven, Die Geschopfe des Prometheus (The Creatures of Prometheus), Op. 43 (1801), score at the International Music Score Library Project.",
        "href": "https://imslp.org/wiki/Die_Gesch%C3%B6pfe_des_Prometheus,_Op.43_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/kimi-k3-largest-open-model--a5.png",
          "alt": "Joseph Karl Stieler's 1820 portrait of Ludwig van Beethoven holding the manuscript of the Missa Solemnis",
          "credit": "Joseph Karl Stieler, portrait of Ludwig van Beethoven (1820). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "taco-bell-lettuce-cyclosporiasis",
    "headline": "Taco Bell pulls shredded lettuce after a parasite outbreak linked to a single supplier sickens thousands",
    "overview": "Taco Bell said it was indefinitely removing shredded iceberg lettuce from one supplier after U.S. health officials linked it to a multistate outbreak of cyclosporiasis, a parasitic infection that causes prolonged, explosive diarrhoea. The CDC has confirmed 1,645 cases, with roughly 5,100 more under investigation and about 140 people hospitalised and no deaths, across Indiana, Kentucky, Michigan, Ohio and West Virginia since mid-May. An FDA traceback pointed to iceberg lettuce grown in Mexico and supplied by Taylor Farms, which was tied to a similar 2013 outbreak that sickened hundreds.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cm2gnglyv0jo"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/16/health/cyclospora-outbreak-shredded-lettuce"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/taco-bell-lettuce-cyclosporiasis.png",
      "alt": "Shredded iceberg lettuce, the ingredient at the centre of the outbreak.",
      "credit": "CDC Public Health Image Library, via Wikimedia Commons (public domain)"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before microscopes, medieval Europe was scourged by ergotism, or 'St. Anthony's Fire,' a hidden parasite of the food supply: the fungus Claviceps purpurea, which colonised rye in damp seasons and, milled unseen into everyday bread, delivered gangrene, convulsions and hallucinations to whole villages at once. Chroniclers described limbs blackening and 'burning' without any visible wound, because the poison lay concealed in the loaf itself, entering through the one staple everyone trusted. Like today's diners who bit into an ordinary Taco Bell taco and swallowed Cyclospora with the shredded iceberg, medieval sufferers were felled not by rare food but by the most common one, corrupted at a single agricultural source. The parallel is exact in its cruelty: a parasite riding the ordinary grain, or the ordinary leaf, that no eye could detect.",
        "excerpt": "Ergotism, known in the Middle Ages as ignis sacer or 'St. Anthony's Fire,' was caused by eating rye and cereals contaminated with the alkaloid-bearing fungus Claviceps purpurea. Outbreaks could sicken entire communities that shared a single contaminated harvest or mill, producing gangrene, seizures and hallucinations, with the true cause invisible in the bread until modern mycology and food inspection finally traced it to the grain.",
        "source": "Ergotism (St. Anthony's Fire); depicted in Pieter Bruegel the Elder, 'The Beggars' (The Cripples), 1568, Musee du Louvre",
        "href": "https://en.wikipedia.org/wiki/Ergotism",
        "image": {
          "src": "/covers/taco-bell-lettuce-cyclosporiasis--a0.png",
          "alt": "Pieter Bruegel the Elder, The Beggars (1568), five crippled figures, sometimes read as victims of gangrenous ergotism",
          "credit": "Pieter Bruegel the Elder, Musee du Louvre, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "In 1854, when cholera exploded through London's Soho, the physician John Snow refused the reigning theory of poisonous 'bad air' and instead did the shoe-leather detective work of tracing every death back to a single source: the public water pump on Broad Street. By mapping the dead and interviewing survivors he showed that nearly all had drunk from that one well, and famously had the pump handle removed to stop the outbreak. This is precisely the logic of the FDA traceback that followed the 2026 cyclosporiasis cases from thousands of scattered patients to iceberg lettuce from one supplier, Taylor Farms, grown in a single region of Mexico. Snow's Broad Street pump and the CDC's contaminated lettuce line are the same story two centuries apart: a dispersed plague resolved into one point of failure in what people ate and drank.",
        "excerpt": "The most terrible outbreak of cholera which ever occurred in this kingdom, is probably that which took place in Broad Street, Golden Square, and the adjoining streets, a few weeks ago. There had been no particular outbreak or increase of cholera, in this part of London, except among the persons who were in the habit of drinking the water of the above-mentioned pump-well.",
        "source": "John Snow, 'On the Mode of Communication of Cholera,' 2nd ed. (London: John Churchill, 1855)",
        "href": "https://books.google.com/books/about/On_the_Mode_of_Communication_of_Cholera.html?id=-N0_AAAAcAAJ",
        "image": {
          "src": "/covers/taco-bell-lettuce-cyclosporiasis--a1.png",
          "alt": "Portrait of the physician John Snow (1813-1858), pioneer of epidemiology",
          "credit": "Autotype portrait of John Snow, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Sophocles opens 'Oedipus the King' with a plague that has struck Thebes at every level of its food chain, and the whole drama becomes a work of public-health detection: a pollution has entered the city from a single hidden source, and it cannot be lifted until that source is traced and removed. Oedipus, the investigator, methodically questions witnesses and follows the trail, only to discover the contamination lies at the very center of his household. The play dramatises exactly what a modern FDA traceback attempts, the search for the one origin of a diffuse affliction, though here the tainted source is a crime rather than a lettuce field. When Taco Bell 'indefinitely' pulled a single supplier's produce, it was performing the civic act Thebes demanded: identify the pollution and cut it out to make the community whole again.",
        "excerpt": "A blight is on our harvest in the ear,\nA blight upon the grazing flocks and herds,\nA blight on wives in travail; and withal\nArmed with his blazing torch the God of Plague\nHath swooped upon our city emptying\nThe house of Cadmus, and the murky realm\nOf Pluto is full fed with groans and tears.",
        "source": "Sophocles, 'Oedipus the King,' trans. Francis Storr, in 'The Plays of Sophocles' (Loeb / Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/31/pg31.txt",
        "image": {
          "src": "/covers/taco-bell-lettuce-cyclosporiasis--a2.png",
          "alt": "Jean-Auguste-Dominique Ingres, Oedipus and the Sphinx (1808), Oedipus questioning the Sphinx",
          "credit": "Jean-Auguste-Dominique Ingres, Musee du Louvre, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Upton Sinclair's 1906 novel 'The Jungle' tore open Chicago's meatpacking industry, exposing how spoiled, adulterated and rat-fouled food was funneled into the national supply and sold to unsuspecting families. His catalogue of horrors, moldy sausage returned from Europe and 'dosed with borax and glycerine,' meat swept off filthy floors, rats and poisoned bread shovelled into the hoppers together, made contaminated food a public scandal and helped drive the Pure Food and Drug Act into law that same year. The book's enduring warning is that a modern, industrial, single-supplier food chain can quietly deliver poison at scale, precisely the fragility exposed when one supplier's iceberg lettuce sickened more than sixteen hundred people across five states. Sinclair's rats in the hopper and the parasite in the shredded lettuce belong to the same nightmare: what looks like ordinary food, corrupted invisibly at the source.",
        "excerpt": "There was never the least attention paid to what was cut up for sausage; there would come all the way back from Europe old sausage that had been rejected, and that was moldy and white -- it would be dosed with borax and glycerine, and dumped into the hoppers, and made over again for home consumption. There would be meat that had tumbled out on the floor, in the dirt and sawdust, where the workers had tramped and spit uncounted billions of consumption germs. There would be meat stored in great piles in rooms; and the water from leaky roofs would drip over it, and thousands of rats would race about on it... These rats were nuisances, and the packers would put poisoned bread out for them; they would die, and then rats, bread, and meat would go into the hoppers together.",
        "source": "Upton Sinclair, 'The Jungle' (New York: Doubleday, Page & Co., 1906), ch. 14",
        "href": "https://www.gutenberg.org/files/140/140-h/140-h.htm",
        "image": {
          "src": "/covers/taco-bell-lettuce-cyclosporiasis--a3.png",
          "alt": "Entrance to the Union Stock Yards, Chicago, circa 1901-1907, the setting of Sinclair's The Jungle",
          "credit": "Photograph circa 1901-1907, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin's 'The Plague at Ashdod' (1630-31) depicts the biblical pestilence that fell on the Philistines, and the painter did something startling for his age: he scattered rats across the foreground, among the collapsing and the dead, making visible the unseen carrier of the contagion. Long before germ theory, the picture intuits that plague travels through a physical vector hidden in daily life, an insight vindicated by later science and echoed in every modern outbreak investigation. It is the visual counterpart to today's traceback, which found in a single lettuce line the concealed 'carrier' of Cyclospora that had spread misery across a population. Poussin's stricken city, felled by something creeping unnoticed among its people, is the old face of a very current fear: that the source of our suffering has been beneath our notice all along.",
        "excerpt": "Poussin stages a city convulsed by plague: the dead and dying sprawl across a grand classical square while survivors recoil and cover their faces. In the foreground he paints small rats moving among the bodies, an unusually literal depiction of an invisible agent of contagion, turning a religious scene into a meditation on how pestilence spreads unseen through an ordinary populace.",
        "source": "Nicolas Poussin, 'The Plague at Ashdod,' 1630-1631, oil on canvas, Musee du Louvre (INV 7276)",
        "href": "https://en.wikipedia.org/wiki/Plague_of_Ashdod_(Poussin)",
        "image": {
          "src": "/covers/taco-bell-lettuce-cyclosporiasis--a4.png",
          "alt": "Nicolas Poussin, The Plague at Ashdod (1630-31), a plague-stricken city with rats visible in the foreground",
          "credit": "Nicolas Poussin, Musee du Louvre, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Caravaggio's 'Basket of Fruit' (c. 1599) looks at first like a hymn to abundance, a woven basket of apples, grapes, figs and leaves offered at eye level, yet the closer one looks the more corruption appears: a wormhole bored through the apple, spotted and shrivelling leaves, fruit already turning. The painter refused to idealise; he showed produce exactly as it decays, the blemish hidden inside the beautiful. That is the precise unease of the 2026 outbreak, in which crisp, wholesome-looking shredded iceberg concealed a parasite that no diner could see. Caravaggio's basket is a four-hundred-year-old warning about the fragility of trust in food, that the freshest-seeming leaf may carry, unnoticed, the thing that harms us.",
        "excerpt": "On a plain ledge Caravaggio sets a wicker basket brimming with fruit and vine leaves, painted with unsparing realism. An apple is pierced by a wormhole, several leaves are withered, spotted and curling with blight, and the ripe fruit teeters on the edge of decay, so that the image of plenty is shadowed throughout by the reality of corruption concealed within seemingly perfect produce.",
        "source": "Caravaggio (Michelangelo Merisi da Caravaggio), 'Basket of Fruit' (Canestra di frutta), c. 1597-1600, oil on canvas, Biblioteca Ambrosiana, Milan",
        "href": "https://en.wikipedia.org/wiki/Basket_of_Fruit_(Caravaggio)",
        "image": {
          "src": "/covers/taco-bell-lettuce-cyclosporiasis--a5.png",
          "alt": "Caravaggio, Basket of Fruit (c. 1599), a basket of fruit with a wormhole in an apple and withered, blighted leaves",
          "credit": "Caravaggio, Biblioteca Ambrosiana, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "chongqing-landslide-pengshui",
    "headline": "A rain-triggered landslide buries more than 10 buildings in Chongqing, China, forcing over 1,100 to evacuate",
    "overview": "A landslide swept down a hillside in Pengshui County in the southwestern Chinese municipality of Chongqing at about 9:08 a.m. Friday, burying more than 10 residential buildings and trapping an unknown number of people, state media reported. A community worker had spotted falling rocks around 8 a.m. and ordered an evacuation, but the slope gave way during the operation, catching some residents; at least nine people were pulled from the debris as rescuers deployed more than 50 sets of search equipment. More than 1,100 people were moved to safety near the Wujiang River, which cuts through the region's karst mountains.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxQbUJDeWR6ZzBjeW5NNEJUa3ZUeHNmSEFnWXAwREZESldzR0NGbWNFc19OWGx6UlVBcU5RY1R3MjBhZ0pYS0tBV2ZUSWRhTU9HWHhkYmotMG1IUDZaSHM3UXRteXgtRjhVVXRIcExYQzdQRnF0MkhmRExMLWdJZHplT0hESllSVFZfWmpWMkRBTWxzMzRxNGRlcGh6ZGkxWHR6c3FYYWZIVlJqVlI1VHhj?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://www.nbcnews.com/world/asia/landslide-southwest-china-traps-people-rescue-efforts-underway-rcna587957"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/chongqing-landslide-pengshui.png",
      "alt": "A hillside scarred by a landslide above a river valley.",
      "credit": "Photograph of the Frank Slide, 30 April 1903, Alberta; public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Before dawn on 29 April 1903, roughly 44 million cubic metres of limestone peeled off Turtle Mountain and swept over the eastern edge of the coal town of Frank in Alberta, reaching the valley floor in about a hundred seconds and entombing dozens of sleeping residents. As in Pengshui, the parallel that haunts is not only the burial but the digging-out: seventeen miners tunneled thirteen hours through blocked shafts to daylight, and rescuers pulled survivors, including a two-year-old girl, alive from the rubble. Turtle Mountain's stacked limestone over weaker shale is a close cousin of the karst slopes above the Wujiang, where soluble, fractured rock hides its own instability until it fails. The nine people freed from the Chongqing debris are the direct heirs of Frank's dug-out living, proof that even a mountain's full weight does not always mean the end.",
        "excerpt": "Between roughly seventy and ninety people were killed when a wedge of Turtle Mountain about a kilometre wide broke free at 4:10 a.m. and buried the eastern part of Frank in under two minutes. Yet twenty-three people directly in the slide's path survived, and all seventeen night-shift miners escaped after hours of digging; the toddler Gladys Ennis, found in the mud outside her home, outlived every other survivor. It remains the deadliest rockslide in Canadian history, a whole edge of a town swallowed while it slept.",
        "source": "The Frank Slide, Turtle Mountain, Alberta, 29 April 1903",
        "href": "https://en.wikipedia.org/wiki/Frank_Slide",
        "image": {
          "src": "/covers/chongqing-landslide-pengshui--a0.png",
          "alt": "1903 photograph of the Frank Slide rock debris covering the valley below Turtle Mountain in Alberta",
          "credit": "Rock slide at Frank, Alta. (1903); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On 4 September 1618 a face of Monte Conto crashed down onto Plurs (Piuro), a rich merchant town in the Val Bregaglia famed for its palazzi and soapstone workshops, and in moments the settlement simply ceased to exist beneath the rubble. Estimates of the dead run from a thousand to well over two thousand; unlike Frank or Pengshui there was almost no digging-out, only a vanished town remembered in engravings that show its streets 'before' and its blank grave 'after.' The Chongqing landslide, which buried more than ten buildings and forced over 1,100 to flee, is a smaller rhyme of that early-modern terror: a hillside that had loomed harmlessly for generations turning, without appeal, into a lid. Plurs is the memento of what the Pengshui evacuation order at 8 a.m. was racing against, the moment when a place can be erased faster than anyone can run.",
        "excerpt": "On the night of 4 September 1618 the flank of the mountain above Plurs gave way and completely wiped out the town, killing between one thousand and roughly two and a half thousand people in what remains one of the worst landslides in recorded history. Contemporaries called it an avalanche, though it was more likely a colossal slide of rock and mud. The prosperous town, its churches and palaces, was buried so deeply that the site was never rebuilt in place.",
        "source": "The destruction of Plurs (Piuro), Val Bregaglia, 4 September 1618",
        "href": "https://en.wikipedia.org/wiki/Piuro",
        "image": {
          "src": "/covers/chongqing-landslide-pengshui--a1.png",
          "alt": "1618 engraving showing the town of Plurs before its destruction and the blank field of rubble that replaced it after the landslide",
          "credit": "'Eigentlich Vorbildung des schoenen Fleckens Plurs...', 1618 engraving, Bibliotheque nationale de France (Gallica); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Pliny the Younger, writing to the historian Tacitus, left the West's first great eyewitness account of a landscape turning lethal: as Vesuvius erupted in AD 79 he watched the very ground betray the built world around him. His detail of carts sliding on level pavement and the sea recoiling from the shaking earth captures exactly the uncanny instant a Pengshui worker glimpsed at 8 a.m. when rocks began to fall from a slope that had always held. Pliny's crowd, choosing his family's flight plan 'in their panic,' mirrors the more than 1,100 residents hurried from the Wujiang bank while the hillside was still deciding. His letter endures because it names the specific horror of these disasters: not water or fire alone, but solid earth losing its faith with the people who live on it.",
        "excerpt": "For although the ground was perfectly level, the vehicles which we had ordered to be brought with us began to sway to and fro, and though they were wedged with stones, we could not keep them still in their places. Moreover, we saw the sea drawn back upon itself, and, as it were, repelled by the quaking of the earth.",
        "source": "Pliny the Younger, Letters, Book VI, Letter 20 (to Cornelius Tacitus), trans. J. B. Firth (1900)",
        "href": "https://www.attalus.org/old/pliny6.html",
        "image": {
          "src": "/covers/chongqing-landslide-pengshui--a2.png",
          "alt": "Angelica Kauffmann's 1785 painting of Pliny the Younger and his mother at Misenum as Vesuvius erupts in the distance",
          "credit": "Angelica Kauffmann, 'Pliny the Younger and his Mother at Misenum, 79 A.D.', 1785, Princeton University Art Museum; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In the Book of Numbers the rebellion of Korah is punished by the most literal disaster imaginable: the ground splits and the earth 'opens her mouth' to swallow the rebels, their households and their goods, closing over them so that they go down alive into the pit. It is the ur-image of the theme running through Pengshui, the earth itself as devourer of homes, buildings and their occupants gone in an instant beneath the ground. Scripture frames it as judgment, but stripped of theology it is a precise description of a landslide's terror: the solid floor of the world giving way and taking a whole household with it. For a reader watching more than ten Chongqing buildings vanish, this ancient verse supplies the oldest vocabulary we have for a slope that opens and closes over the living.",
        "excerpt": "And it came to pass, as he had made an end of speaking all these words, that the ground clave asunder that was under them: And the earth opened her mouth, and swallowed them up, and their houses, and all the men that appertained unto Korah, and all their goods. They, and all that appertained to them, went down alive into the pit, and the earth closed upon them: and they perished from among the congregation.",
        "source": "Numbers 16:31-33, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Numbers",
        "image": {
          "src": "/covers/chongqing-landslide-pengshui--a3.png",
          "alt": "Gustave Dore's 1866 engraving of the earth opening to swallow Korah, Dathan and Abiram, figures falling into a chasm",
          "credit": "Gustave Dore, 'The Death of Korah, Dathan and Abiram', from the 1866 illustrated Bible; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Karl Bryullov's vast canvas 'The Last Day of Pompeii' (1830-1833) freezes the moment a city dies under a collapsing sky: columns topple, statues pitch from their pedestals, and families shield one another as the built world comes apart above them. Bryullov painted from the excavated ruins themselves, so the picture is at once art and reconstruction, the buried town made to re-enact its own burial. That doubled gesture, catastrophe and unearthing, is the exact arc of Pengshui, where more than ten buildings were swallowed and nine people were then dug back out of the debris. The painting's crowd, caught between flight and paralysis under falling masonry, is the timeless portrait of the 1,100 evacuees on the Wujiang, human figures small beneath a landscape that has turned against them.",
        "excerpt": "A monumental Romantic canvas showing the citizens of Pompeii fleeing beneath a blood-red, lightning-torn sky as buildings and statues collapse around them. Bryullov based the scene on his own study of the excavated city, lending the painting an archaeological precision beneath its operatic terror. Mothers cover children, a fallen woman lies in the foreground, and a charioteer's horses rear as the ground itself seems to buckle.",
        "source": "Karl Bryullov, 'The Last Day of Pompeii', 1830-1833, State Russian Museum, St Petersburg",
        "href": "https://en.wikipedia.org/wiki/The_Last_Day_of_Pompeii",
        "image": {
          "src": "/covers/chongqing-landslide-pengshui--a4.png",
          "alt": "Karl Bryullov's painting The Last Day of Pompeii, showing citizens fleeing beneath collapsing buildings and a fiery sky",
          "credit": "Karl Bryullov, 'The Last Day of Pompeii' (1830-1833), State Russian Museum; public domain, via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "John Martin's apocalyptic 'The Great Day of His Wrath' (1851-53) shows entire mountains torn loose and hurled down upon a doomed city, the solid earth itself upended in a black cataract of rock and fire. More than any painting of flood or storm, it visualizes the specific dread of a landslide: not the sea rising but the ground descending, a mountain giving way and burying everything beneath it. That is precisely what unfolded above Pengshui, where a hillside in the karst mountains slid down onto homes along the Wujiang. Martin turns the geologic instant of the Chongqing slope into cosmic theatre, the same overwhelming force that a single worker tried to outrun with an 8 a.m. warning made vast and final on canvas.",
        "excerpt": "An enormous, thunderous canvas in which whole mountains are ripped from their foundations and crash down onto a city amid crimson fire and blackness. Part of Martin's Last Judgement triptych, it renders divine wrath as a geological cataclysm, the earth's own mass turned into a weapon. Tiny human figures are engulfed at the base of the composition as the landscape folds over on itself.",
        "source": "John Martin, 'The Great Day of His Wrath', 1851-1853, Tate, London",
        "href": "https://www.tate.org.uk/art/artworks/martin-the-great-day-of-his-wrath-n05613",
        "image": {
          "src": "/covers/chongqing-landslide-pengshui--a5.png",
          "alt": "John Martin's painting The Great Day of His Wrath, showing mountains collapsing onto a city in fire and darkness",
          "credit": "John Martin, 'The Great Day of His Wrath' (1851-1853), Tate; public domain, via Wikimedia Commons (Google Art Project)"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "crystal-palace-dinosaurs-restored",
    "headline": "London's Victorian Crystal Palace dinosaurs are restored to their original look after decades of decay",
    "overview": "The Grade I-listed Crystal Palace dinosaurs, the world's first life-size models of prehistoric animals, unveiled in south London in 1854, are being returned to their Victorian appearance in a multimillion-pound conservation phase led by HTA Design. Specialists from SSH Conservation have been steam-cleaning the sculptures, stripping decades of overpaint and repairing crumbling mortar, revealing their original detailing for the first time in years. The work, funded partly by the National Lottery Heritage Fund and due for completion in autumn 2026, is part of a wider regeneration that will add a visitor centre and a dinosaur-themed playground.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/17/crystal-palace-dinosaurs-restored-hta-design/"
      },
      {
        "name": "Time Out",
        "href": "https://www.timeout.com/london/news/crystal-palace-dinosaurs-victorian-restoration-071626"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/crystal-palace-dinosaurs-restored.png",
      "alt": "The Victorian life-size dinosaur sculptures at Crystal Palace Park in London.",
      "credit": "Photograph by Ian Wright, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On New Year's Eve 1853, before the models were even finished, Hawkins staged a banquet for twenty-one leading men of science inside the hollow mould of his half-built Iguanodon, with Richard Owen presiding as if enthroned in the beast's skull. The diners toasted the resurrection of the ancient world and roared a specially written song whose refrain insisted the \"jolly old beast\" was \"not deceased.\" That same theatrical faith — that extinct monsters could be summoned back to sensuous, life-size presence for a paying public — is exactly what the current restoration seeks to recover. Scrubbing away decades of decay, HTA Design and SSH Conservation are returning the creatures once feasted inside to the look that astonished their first Victorian audience.",
        "excerpt": "A thousand ages underground, / His skeleton had lain, / But now his body's big and round / And there's life in him again!... The jolly old beast / Is not deceased / There's life in him again! / ROAR",
        "source": "Edward Forbes, song for the \"Dinner in the Iguanodon,\" Crystal Palace, 31 December 1853; lyrics reproduced by the University of Cambridge.",
        "href": "https://www.cam.ac.uk/research/features/iggy-the-iguanodon-and-the-160-year-old-dinosaur-song",
        "image": {
          "src": "/covers/crystal-palace-dinosaurs-restored--a0.png",
          "alt": "The 1853 New Year's Eve banquet held inside the mould of the Crystal Palace Iguanodon",
          "credit": "Illustrated London News, 7 January 1854; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "When Roman labourers unearthed the Laocoön from a vineyard in 1506, the ancient marble came up broken — the priest's right arm missing — and a generation of Renaissance sculptors argued over how to complete it, eventually bolting on a heroic outstretched arm that proved entirely wrong; the true bent arm was rediscovered only in 1906. Pliny had already immortalised the group as a work carved from a single block and preferable to all other art, making its recovery and repair a founding drama of antiquarian restoration. Hawkins and Owen faced the same puzzle in reverse, reassembling whole animals from scraps of bone, and like Laocoön's restorers they guessed wrong about posture and anatomy. Today's conservators, steam-cleaning and re-mortaring the Grade I-listed monsters, inherit that centuries-old dilemma: how faithfully to mend a famous, flawed reconstruction without erasing the very errors that make it history.",
        "excerpt": "This is the case with the Laocoön in the palace of the emperor Titus, a work superior to any painting and any bronze. Laocoon, his children and the wonderful clasping coils of the snakes were carved from a single block in accordance with an agreed plan by those eminent craftsmen Hagesander, Polydorus and Athenodorus, all of Rhodes.",
        "source": "Pliny the Elder, Natural History 36.37 (Rackham translation), via Attalus.",
        "href": "https://www.attalus.org/translate/pliny_hn36a.html",
        "image": {
          "src": "/covers/crystal-palace-dinosaurs-restored--a1.png",
          "alt": "The Laocoön and His Sons, ancient marble group in the Vatican Museums",
          "credit": "Photograph by Jastrow; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Dickens opened Bleak House in 1852 — the very months Hawkins was moulding his monsters a few miles to the south — by imagining a Megalosaurus \"forty feet long or so, waddling like an elephantine lizard up Holborn Hill\" through the primordial mud of a fog-bound London. The joke fuses deep geological time with the modern city, precisely the collision the Crystal Palace dinosaurs made concrete in cement and iron. To restore those sculptures is to restore Dickens's fantasy to literal standing: the prehistoric beast still loose in the London suburbs, dredged out of the mud of decades and set once more on its feet.",
        "excerpt": "London. Michaelmas Term lately over, and the Lord Chancellor sitting in Lincoln's Inn Hall. Implacable November weather. As much mud in the streets as if the waters had but newly retired from the face of the earth, and it would not be wonderful to meet a Megalosaurus, forty feet long or so, waddling like an elephantine lizard up Holborn Hill.",
        "source": "Charles Dickens, Bleak House (1852–53), chapter 1.",
        "href": "https://www.gutenberg.org/files/1023/1023-h/1023-h.htm",
        "image": {
          "src": "/covers/crystal-palace-dinosaurs-restored--a2.png",
          "alt": "Portrait photograph of Charles Dickens, 1850",
          "credit": "Portrait of Charles Dickens, 1850; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Published in 1850, four years before the dinosaurs rose at Sydenham, Tennyson's In Memoriam stared into the same abyss of deep time the models would make visible, hearing Nature cry from \"scarped cliff and quarried stone\" that a thousand types are gone. His phrase \"Nature, red in tooth and claw\" gave Victorian Britain its motto for a creation ruled by extinction and struggle — the very lesson Owen's stone menagerie was built to teach a Sunday crowd. The restoration returns to the park a three-dimensional stanza of that poem: extinct \"types,\" lovingly reconstructed, standing as monuments to loss and to the age that first dared to picture it.",
        "excerpt": "'So careful of the type?' but no. / From scarped cliff and quarried stone / She cries, 'A thousand types are gone: / I care for nothing, all shall go.' ... Who trusted God was love indeed / And love Creation's final law— / Tho' Nature, red in tooth and claw / With ravine, shriek'd against his creed—",
        "source": "Alfred, Lord Tennyson, In Memoriam A. H. H. (1850), canto 56.",
        "href": "https://www.gutenberg.org/cache/epub/70950/pg70950.txt",
        "image": {
          "src": "/covers/crystal-palace-dinosaurs-restored--a3.png",
          "alt": "Alfred, Lord Tennyson photographed by Julia Margaret Cameron",
          "credit": "Julia Margaret Cameron, 1869; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In 1830 the geologist Henry De la Beche painted Duria Antiquior — \"a more ancient Dorset\" — the first true attempt to picture a whole scene of prehistoric life, its Jurassic sea churning with ichthyosaurs and plesiosaurs biting, spouting and dying, all reconstructed from Mary Anning's fossils. Sold as a lithograph to raise money for Anning, it taught the public to see deep time as a vivid, inhabited world rather than a table of dead bones — the same imaginative leap Hawkins would soon build at life size. The Crystal Palace restoration is the sculptural heir of De la Beche's watercolour: both take the fragmentary evidence of extinction and restore it to full, coloured, breathing spectacle for a general audience.",
        "excerpt": "A crowded, violent panorama of an ancient Dorset sea: a long-necked plesiosaur rears with a fish in its jaws, ichthyosaurs thrash and devour one another, a pterosaur wheels overhead and crocodiles wallow on the shore, while dung and débris drift through the water. Every creature is drawn from real fossils, yet arranged as a living, feeding, dying ecosystem — the earliest visual reconstruction of deep time as a place one could imagine walking into.",
        "source": "Henry De la Beche, Duria Antiquior, 1830, watercolour and lithograph, National Museum Cardiff.",
        "href": "https://commons.wikimedia.org/wiki/File:Duria_Antiquior.jpg",
        "image": {
          "src": "/covers/crystal-palace-dinosaurs-restored--a4.png",
          "alt": "Duria Antiquior, Henry De la Beche's 1830 reconstruction of prehistoric marine life in ancient Dorset",
          "credit": "Henry De la Beche, 1830, National Museum Cardiff; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In \"Fossiles,\" the twelfth movement of his 1886 Carnival of the Animals, Saint-Saëns set a xylophone rattling like dry bones, quoting his own Danse macabre and a clutch of old nursery tunes so that the long-dead seem to clack briefly back to life. He suppressed the whole suite during his lifetime, and it was released to the public only after his death in 1921 — a work itself buried, then exhumed and restored to the concert hall. That double motion — extinct creatures reanimated, and a hidden masterpiece brought back into the light — mirrors the Crystal Palace project exactly, as beasts left to moulder for decades are steam-cleaned and re-mortared into their original Victorian brilliance.",
        "excerpt": "A dry, brittle xylophone taps out a skeletal dance, its wooden clatter conjuring bones knocking together in the dark. Saint-Saëns weaves in fragments of his own Danse macabre and half-remembered nursery songs, so that fossils and childhood tunes rise together like relics dug from the same ground — the extinct made to caper for a moment before settling back into silence.",
        "source": "Camille Saint-Saëns, Le carnaval des animaux, \"Fossiles\" (No. 12), 1886.",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)",
        "image": {
          "src": "/covers/crystal-palace-dinosaurs-restored--a5.png",
          "alt": "Portrait of the composer Camille Saint-Saëns",
          "credit": "Portrait of Camille Saint-Saëns; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "steidl-publisher-insolvency",
    "headline": "Steidl, the art world's leading photobook publisher, enters insolvency proceedings in Germany",
    "overview": "Steidl, the Göttingen publishing house founded by Gerhard Steidl in 1969 and revered for its finely printed photobooks, has entered preliminary insolvency proceedings after a creditor petitioned a German court over unpaid social-security contributions. The house had struggled for months to pay staff regularly—some workers reportedly went five or six months without wages—before filing on July 12; outstanding net wage claims run into the tens of thousands of euros. Steidl's lawyer said the triggering dispute had been settled and that talks with potential investors were under way to carry the company \"into the next generation.\"",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/renowned-german-publisher-steidl-faces-bankruptcy-1234754981/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/art-news/news/steidl-the-art-worlds-go-to-photobook-publisher-faces-insolvency-proceedings-in-germany-1234792400/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/steidl-publisher-insolvency.png",
      "alt": "Stacks of finely printed photobooks on a press-room table.",
      "credit": "Photograph by Kevin Eng (NYC Wanderer), 2009, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The first printer of movable type in Europe was also its first bankrupt. Johannes Gutenberg built his Mainz workshop on loans from the financier Johann Fust; when Fust demanded repayment in 1455, the master printer was compelled to surrender his presses, types and the great Bible itself to his creditor, who carried the equipment off and printed on without him. It is the founding parable of the trade: the artisan's genius held hostage to the ledger. Steidl's preliminary insolvency in Göttingen, triggered by a creditor's petition over unpaid contributions, is the same ancient collision between the fine art of the book and the arithmetic that finances it.",
        "excerpt": "We do not know the end of these proceedings, but if Gutenberg had prepared any printing materials it would seem that he was compelled to yield up the whole of them to Fust; that the latter removed them to his own house at Mainz, and there, with the assistance of Peter Schöffer, issued various books.",
        "source": "\"Gutenberg, Johann,\" 1911 Encyclopædia Britannica, Vol. 12",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gutenberg,_Johann",
        "image": {
          "src": "/covers/steidl-publisher-insolvency--a0.png",
          "alt": "Engraved portrait of Johannes Gutenberg, inventor of movable-type printing in Europe",
          "credit": "Engraving by Nicolas de Larmessin (17th c.), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In 1891 the poet and craftsman William Morris founded the Kelmscott Press to rescue the printed book from Victorian ugliness, designing his own types, choosing handmade paper and dense black ink, and treating each page as an object worthy of art. His masterpiece, the 1896 Kelmscott Chaucer, remains a summit of the printer's craft, yet the press was so bound to his person that it closed within two years of his death. Like Kelmscott, Steidl is the lengthened shadow of one obsessive master, Gerhard Steidl, who oversees ink, paper and press with the same devotion, which is exactly why its financial peril threatens something irreplaceable rather than merely commercial.",
        "excerpt": "I began printing books with the hope of producing some which would have a definite claim to beauty, while at the same time they should be easy to read and should not dazzle the eye, or trouble the intellect of the reader by eccentricity of form in the letters.",
        "source": "William Morris, A Note by William Morris on his Aims in Founding the Kelmscott Press (1898)",
        "href": "https://archive.org/details/ANoteByWilliamMorrisOnHisAimsInFoundingTheKelmscottPressTogether",
        "image": {
          "src": "/covers/steidl-publisher-insolvency--a1.png",
          "alt": "A decorated opening of the 1896 Kelmscott Chaucer printed by William Morris's Kelmscott Press",
          "credit": "William Morris / Kelmscott Press, 1896, Google Art Project, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Balzac opens Lost Illusions not with a hero but with a printing house: the Séchard establishment at Angoulême, its antiquated wooden presses groaning under debt, drink and provincial greed. The novel makes the printshop the very theatre of ruin, where the beautiful, slow craft of the book is ground down by creditors and the cheap economics of the age. Its portrait of a press whose survival hangs on unpaid bills and a founder's fading powers could serve as an epigraph to Steidl's insolvency filing. Balzac knew intimately that the trade in ink and paper is also a trade in illusions lost.",
        "excerpt": "At the time when this story opens, the Stanhope press and the ink-distributing roller were not as yet in general use in small provincial printing establishments.",
        "source": "Honoré de Balzac, Lost Illusions (\"Two Poets\"), trans. Ellen Marriage",
        "href": "https://www.gutenberg.org/files/1443/1443-h/1443-h.htm",
        "image": {
          "src": "/covers/steidl-publisher-insolvency--a2.png",
          "alt": "1842 daguerreotype portrait of the novelist Honoré de Balzac",
          "credit": "Daguerreotype by Louis-Auguste Bisson, 1842, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "When Milton rose in 1644 to defend the unlicensed press, he did not argue economics but reverence: a book, he insisted, holds the living essence of the mind that made it, and to destroy one is a kind of murder. Areopagitica remains the great hymn to the printed object as a vessel of the human spirit, worth defending against every censor and every indifference. Steidl's photobooks, obsessively printed to preserve an image exactly as its maker intended, are precisely such vessels, embalming a master spirit in paper. Milton's warning gives the news its weight: what is imperilled in Göttingen is not just a firm but a fragile keeper of life beyond life.",
        "excerpt": "a good book is the precious life-blood of a master spirit, embalmed and treasured up on purpose to a life beyond life.",
        "source": "John Milton, Areopagitica (1644)",
        "href": "https://www.gutenberg.org/cache/epub/608/pg608.txt",
        "image": {
          "src": "/covers/steidl-publisher-insolvency--a3.png",
          "alt": "Title page of the first 1644 edition of John Milton's Areopagitica",
          "credit": "John Milton, Areopagitica, 1644, Library of Congress, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jost Amman's 1568 woodcut of the printer's workshop, made for the Ständebuch or Book of Trades, is the earliest great image of the craft in action: the pressman hauling the bar, the compositor at his case, sheets drying, ink and paper transformed into pages. It enshrines printing as an honoured guild art, a dignified labour of hand and eye. Steidl in Göttingen is the direct heir of that workshop, still setting, inking and pressing with artisanal care in an age of digital reproduction. To see this house threatened is to watch Amman's proud scene flicker as if the presses themselves might fall silent.",
        "excerpt": "Amman's crisp woodcut frames the printer's shop as a temple of the trade: at the press a workman drags down the bar to kiss paper against inked type, while behind him compositors pick letters from the case, one page at a time. Ink, paper, wood and human patience combine into the printed image, the very craft Steidl still practises by hand.",
        "source": "Jost Amman, \"Der Buchdrucker\" (The Book Printer), from Das Ständebuch (Frankfurt, 1568)",
        "href": "https://commons.wikimedia.org/wiki/File:Buchdrucker-1568.png",
        "image": {
          "src": "/covers/steidl-publisher-insolvency--a4.png",
          "alt": "1568 woodcut showing a Renaissance printer's workshop with a press and compositors at their type cases",
          "credit": "Jost Amman, Das Ständebuch, 1568, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Die Meistersinger von Nürnberg closes with the cobbler-poet Hans Sachs pleading that his townsmen never scorn the masters, for it is the guild's patient craft that keeps German art alive from one generation to the next. The opera is a monument to the dignity of the master artisan and to the fragile institutions that transmit a craft over time. Steidl belongs to that same German lineage of the guarded, guild-like mastery of a trade, and its lawyer's stated hope is precisely to carry the house \"into the next generation.\" Sachs's warning rings across the centuries to Göttingen: honour the masters, or watch their art dissolve into vapour.",
        "excerpt": "Verachtet mir die Meister nicht, / und ehrt mir ihre Kunst! ... Drum sag' ich euch: / ehrt eure deutschen Meister!",
        "source": "Richard Wagner, Die Meistersinger von Nürnberg (1868), Act III, Hans Sachs's final address",
        "href": "https://opera-guide.ch/operas/die+meistersinger+von+nurnberg/libretto/de/",
        "image": {
          "src": "/covers/steidl-publisher-insolvency--a5.png",
          "alt": "1545 portrait of Hans Sachs, the Nuremberg mastersinger and poet who is the hero of Wagner's opera",
          "credit": "Portrait by Michael Ostendorfer, 1545, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "russia-blogger-remeslov-arrest",
    "headline": "Russia arrests Ilya Remeslov, a former Kremlin loyalist turned Putin critic, over 'fakes' about the military",
    "overview": "Russian authorities have arrested the blogger Ilya Remeslov on charges of spreading false information about the armed forces, the state news agency TASS reported Friday, citing police, months after he broke with the Kremlin. In a March manifesto that stunned his former allies, Remeslov denounced President Vladimir Putin for sending Russians to their deaths in a \"dead-end war\" and called for him to be tried as a war criminal. His lawyer said he was being moved from St Petersburg to Moscow to face prosecution; the charge carries up to 10 years in prison.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxNZmFWUnd1OE9XanVTTXVmVldpM09tMVk5WWRVSGVGRUtma3lvT1NrMlNxUDBjT0xjVEVoejFHVVowOGQxdW0tY0hvMFA1ajZhbWZSbW4wRVlkb1pKaFpXekVmb2JJcllLSDA3LVdWQnlNc1gwdHhsMGNLMm45WUxIeHJPTkpJX2hIMVQ2dG1ieGxBQnVVdHExYTdlZlduUmw2bDJqbXZERlZIRVE4OFRHVXd3Rkt1VWpOa3hSRw?oc=5"
      },
      {
        "name": "The Moscow Times",
        "href": "https://www.themoscowtimes.com/2026/07/17/pro-kremlin-blogger-arrested-for-war-fakes-months-after-denouncing-putin-a93275"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/russia-blogger-remeslov-arrest.png",
      "alt": "An empty courtroom, where a dissident blogger faces prosecution.",
      "credit": "Ilya Repin, 'Arrest of a Propagandist' (1880-1889), State Tretyakov Gallery. Public domain, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero was a pillar of the Roman establishment before he turned the full force of his oratory against Mark Antony, branding him in the Philippics an enemy of the Republic and a would-be tyrant. Antony answered not with argument but with proscription: Cicero was hunted down and beheaded, his head and the hands that wrote against Antony nailed to the Rostra where he had spoken. Remeslov, once a servant of the Kremlin, likewise turned his voice on the ruler, demanding Putin be tried as a war criminal for a 'dead-end war.' As with Antony and Cicero, the powerful man indicted by words replies with the machinery of punishment rather than reply.",
        "excerpt": "I defended the republic as a young man, I will not abandon it now that I am old. I scorned the sword of Catiline, I will not quail before yours.",
        "source": "Cicero, Second Philippic (Philippic II), §46, trans. C. D. Yonge, in 'The Orations of Marcus Tullius Cicero'; Perseus Digital Library.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0021:speech=2:chapter=46",
        "image": {
          "src": "/covers/russia-blogger-remeslov-arrest--a0.png",
          "alt": "Ancient Roman marble portrait bust of Cicero, first half of the 1st century AD, in the Capitoline Museums, Rome.",
          "credit": "Bust of Cicero, Musei Capitolini, Rome. Photo Glauco92, CC BY-SA, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In 1790 Alexander Radishchev, a customs official in the service of Catherine the Great, printed 'A Journey from St Petersburg to Moscow,' a searing indictment of serfdom and autocratic power. The empress read it as sedition, called him 'a rebel worse than Pugachev,' and had him condemned to death, the sentence commuted to a decade of Siberian exile; nearly the whole edition was destroyed. Two and a half centuries later another once-loyal servant of the Russian state is being moved along that very St Petersburg-to-Moscow road, not as a traveler but as a prisoner, for words the Kremlin deems false and dangerous. The geography of Russian dissent, and the state's answer to it, has scarcely shifted.",
        "excerpt": "Я взглянул окрест меня — душа моя страданиями человечества уязвлена стала. Обратил взоры мои во внутренность мою — и узрел, что бедствия человека происходят от человека.",
        "source": "Александр Радищев, «Путешествие из Петербурга в Москву» (1790), посвящение; Русская виртуальная библиотека (rvb.ru).",
        "href": "https://rvb.ru/18vek/radishchev/01text/vol_1/03prose/021.htm",
        "image": {
          "src": "/covers/russia-blogger-remeslov-arrest--a1.png",
          "alt": "Portrait of Alexander Radishchev (1749-1802), Russian writer and social critic, oil on canvas by an unknown painter.",
          "credit": "Portrait of Alexander Radishchev, Radishchev Art Museum, Saratov. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In November 1933 Osip Mandelstam composed a sixteen-line epigram deriding Stalin as the 'Kremlin mountaineer' with 'cockroach whiskers' and fingers 'fat as worms,' a poem he dared only to recite aloud. For those lines he was arrested, exiled, arrested a second time, and died in a Gulag transit camp in 1938. Remeslov's March manifesto is this century's counterpart: words that name and damn the man in the Kremlin, treated by the state as a crime that carries years in the camps. Mandelstam's fate is the standing warning of what Russia does to the writer who names the ruler.",
        "excerpt": "Мы живём, под собою не чуя страны,\nНаши речи за десять шагов не слышны,\nА где хватит на полразговорца,\nТам припомнят кремлёвского горца.\nЕго толстые пальцы, как черви, жирны,\nИ слова, как пудовые гири, верны,\nТараканьи смеются усища\nИ сияют его голенища.",
        "source": "Осип Мандельштам, «Мы живём, под собою не чуя страны…» (ноябрь 1933); Русская виртуальная библиотека (rvb.ru).",
        "href": "https://rvb.ru/20vek/mandelstam/01text/vol_3/01versus/01versus/3_064.htm",
        "image": {
          "src": "/covers/russia-blogger-remeslov-arrest--a2.png",
          "alt": "NKVD mug shot of the poet Osip Mandelstam taken after his first arrest in 1934.",
          "credit": "NKVD arrest photograph of Osip Mandelstam, 1934. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Sophocles' tragedy Antigone defies King Creon's edict forbidding the burial of her brother, setting the 'unwritten and unfailing statutes of heaven' above the ruler's decree, and is sealed alive in a tomb for it. Her defense is the founding statement of conscience refusing to bow to state power, whatever the cost. Remeslov made the same wager, placing his judgment of a criminal war above Russia's 'false information' laws and calling openly for the ruler to answer; the state, like Creon, replies with confinement. The oldest political drama is the lone conscience against the sovereign's command.",
        "excerpt": "Yes; for it was not Zeus that had published me that edict; not such are the laws set among men by the Justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven. For their life is not of to-day or yesterday, but from all time, and no man knows when they were first put forth.",
        "source": "Sophocles, Antigone, trans. Sir Richard C. Jebb (1917); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Sophocles_(Jebb_1917)/Antigone",
        "image": {
          "src": "/covers/russia-blogger-remeslov-arrest--a3.png",
          "alt": "Nikiforos Lytras's 1865 painting of Antigone mourning before the body of her brother Polynices.",
          "credit": "Nikiforos Lytras, 'Antigone before the dead Polynices' (1865), National Gallery, Athens. Photo Francesco Bini (Sailko), CC BY-SA 4.0, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David's 'The Death of Socrates' (1787) shows the philosopher condemned by Athens for his words reaching for the cup of hemlock while still teaching, his finger raised, serene and unbroken as his followers weep. The state's death sentence is powerless over his conviction; the moral authority lies with the condemned, not the tribunal. Remeslov, like Socrates charged with 'corrupting' the city, faces up to ten years for speech the state calls poison. David's canvas frames the enduring claim of every such trial: it is the truth-teller, not the court, who stands upright.",
        "excerpt": "David stages the hemlock as a moment of teaching rather than defeat: Socrates sits erect on the prison cot, one hand closing on the poisoned cup without looking at it, the other lifted mid-argument toward the heavens. His disciples recoil and cover their faces in grief while he alone is calm, the light falling full on his aged body. The composition makes the condemned man the source of order and clarity, and the sentence of the state a mere formality he transcends.",
        "source": "Jacques-Louis David, 'The Death of Socrates,' 1787, oil on canvas, The Metropolitan Museum of Art, New York (accession 31.45).",
        "href": "https://www.metmuseum.org/art/collection/search/436105",
        "image": {
          "src": "/covers/russia-blogger-remeslov-arrest--a4.png",
          "alt": "Jacques-Louis David's 1787 painting 'The Death of Socrates,' showing Socrates reaching for the hemlock while lecturing his grieving followers.",
          "credit": "Jacques-Louis David, 'The Death of Socrates' (1787), Metropolitan Museum of Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "After Pravda's 1936 denunciation 'Muddle Instead of Music' nearly destroyed him during the Great Terror, when arrest could come at any night, Shostakovich answered in 1937 with his Fifth Symphony, outwardly a chastened, triumphant tribute to the Soviet state. Yet many hear beneath the surface a coded lament, its hammering finale a portrait of terror wearing the mask of rejoicing, joy enforced at gunpoint. It is the art of the man who must survive the tyrant rather than openly defy him, the opposite pole from Remeslov's frontal denunciation. Both, though, are shaped by the same power that can jail or crush the voice it dislikes; the Fifth is what enforced caution sounds like under a regime that treats dissent as a crime.",
        "excerpt": "The symphony's ambiguity is the point: the D-minor gloom and the funeral tread of the slow movement give way to a blaring, relentless march that can be heard as either genuine victory or coerced celebration. Contemporaries read the finale two ways at once, a survival strategy encoded in sound, and Shostakovich later let it be said that the rejoicing was forced, 'as if someone were beating you with a stick.' Where the dissident speaks plainly and is arrested, the composer smuggles his meaning past the censor in the grammar of the orchestra.",
        "source": "Dmitri Shostakovich, Symphony No. 5 in D minor, Op. 47 (1937); IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Symphony_No.5,_Op.47_(Shostakovich,_Dmitry)",
        "image": {
          "src": "/covers/russia-blogger-remeslov-arrest--a5.png",
          "alt": "Photograph of the composer Dmitri Shostakovich, taken at a Bach commemoration in 1950.",
          "credit": "Dmitri Shostakovich, 1950. Roger & Renate Rossing / Deutsche Fotothek, CC BY-SA 3.0 de, via Wikimedia Commons."
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "iran-hormuz-new-strikes",
    "headline": "The U.S. launches a sixth straight night of airstrikes on Iran as the two sides battle for control of the Strait of Hormuz",
    "overview": "U.S. Central Command said it struck Iran for a sixth consecutive night on Thursday to \"further degrade Iranian military capabilities,\" with Iranian state media reporting missiles near the Gulf island of Qeshm and in Bandar Abbas and Bushehr, the site of a nuclear power plant. Tehran said it had hit U.S. bases in Jordan, Kuwait and Bahrain and warned that the Strait of Hormuz, which it has effectively blocked, is a \"red line,\" while Reuters reported Iran had told Yemen's Houthis to close the Red Sea if Washington strikes its power grid. The White House said President Trump remained open to talks even as he threatened to bomb Iranian bridges and power plants unless Tehran returns to negotiations.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c151gdjwd10o"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOYXFnZWtOU1NXb01HY2FxbTBsUmJqNDlaa3NORmpyZ0pYVzhSVFZkaUNYTjczY0E1YjhpR1F1OGRoT3dJNnVTMjVuUGJyamVCckJwMi1WY0hJR2NyVGQ0ZDdzbF9LMzgteGZDRGtMd0ZQV211YWF3cHpYLWdhTXZjTXVhTG1zRkRmR3Q1NVdQRWNEb2xhZU0zRTFodmM4ZXc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/iran-hormuz-new-strikes.png",
      "alt": "A vessel in the Strait of Hormuz, the contested waterway at the centre of the U.S.-Iran confrontation.",
      "credit": "Reuters via BBC"
    },
    "lead": true,
    "rank": 14,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 480 B.C. a Persian empire and a defiant Greek coalition fought for control of a single narrow waterway, the strait between the island of Salamis and the Attic mainland. The Athenian commander Themistocles deliberately lured the far larger Persian fleet of Xerxes into the cramped channel, reasoning that in a confined strait numbers and size counted for less and that the crowded enemy would foul its own oars. The Persian armada, jammed into the narrows and thrown into confusion, was shattered by the disciplined Greek line. It is the ancestor of every chokepoint battle since: a smaller power turning geography into a weapon against a mightier navy. The confrontation now unfolding at the Strait of Hormuz, where Iran treats the twenty-mile-wide passage as a 'red line' and bets that a narrow sea can neutralize American firepower, replays the same ancient logic of the strait as equalizer.",
        "excerpt": "in the first place, as we shall fight in a narrow sea with few ships against many, if the war follows the common course, we shall gain a great victory; for to fight in a narrow space is favourable to us - in an open sea, to them.",
        "source": "Herodotus, The Histories, Book VIII (the Battle of Salamis and Themistocles' counsel), trans. George Rawlinson; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_8",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a0.png",
          "alt": "Ancient marble herm portrait of the Athenian statesman and admiral Themistocles",
          "credit": "Roman marble herm of Themistocles, after a 5th-century B.C. Greek original, Museo Ostiense, Ostia; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "The last time the United States and Iran fought openly for the Strait of Hormuz was Operation Praying Mantis on 18 April 1988, during the Tanker War phase of the Iran-Iraq conflict. After the frigate USS Samuel B. Roberts nearly sank on an Iranian mine, U.S. warships and carrier aircraft struck Iranian oil platforms and, in a running battle, crippled or sank several Iranian vessels, including the frigate Sahand, which was left ablaze and gutted by bombs and missiles. It remains the U.S. Navy's largest surface engagement since the Second World War and the only time it has exchanged surface-to-surface missile fire, and it was fought precisely to keep the Gulf's oil arteries open. The present crisis, with U.S. Central Command striking Iran for a sixth straight night and Tehran threatening to close the strait, is the same duel over freedom of navigation escalated to a far higher pitch. The burning hull of the Sahand is the visual memory Washington and Tehran both carry into this fight.",
        "excerpt": "On 18 April 1988 U.S. naval and air forces struck Iranian targets in the Persian Gulf in retaliation for the mining of the frigate USS Samuel B. Roberts; in the ensuing action the Iranian frigate Sahand was bombed and set afire, photographed burning from stem to stern in the largest U.S. Navy surface battle since 1945. The engagement was a direct fight over the shipping lanes of the Strait of Hormuz, foreshadowing today's confrontation over the same chokepoint.",
        "source": "U.S. Navy / Naval History and Heritage Command, Operation Praying Mantis, 18 April 1988; official DoD photograph DN-SN-89-03125.",
        "href": "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Iranian_frigate_Sahand_burning_after_air_attack_Operation_Praying_Mantis_DN-SN-89-03125.jpg",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a1.png",
          "alt": "Aerial view of the Iranian frigate Sahand burning after a U.S. air attack in the Persian Gulf, 1988",
          "credit": "U.S. Navy photograph, Iranian frigate Sahand burning during Operation Praying Mantis, 18 April 1988 (DN-SN-89-03125); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, who had himself fought the Persians, staged 'The Persians' in 472 B.C. and told the story of Salamis from the losers' side, as grief inside the royal court at Susa. A messenger arrives to describe how the Persian fleet, packed into the narrows, could give no ship room to help another, smashed its own oars, and was hemmed in and battered until the sea vanished beneath wrecks and the dead. The queen mother Atossa and the chorus can only cry out at the hateful name of Salamis. It is the oldest surviving war play in the world, and its lesson is that a proud empire's numbers become a trap in a narrow sea. As Iran wagers that the confined waters of Hormuz can swallow a superior fleet and Washington threatens ever heavier blows, Aeschylus supplies the tragic script of a great power undone in a strait.",
        "excerpt": "the time brooked no delay, but instantly ship dashed against ship its bronze-sheathed beak. It was a ship of Hellas that began the charge and sheared off entire the curved stern of a Phoenician barque. Each captain drove his ship straight against some other ship. At first, indeed, the stream of the Persian armament held its own; but when the mass of our ships had been crowded in the narrows, and none could render another aid, and each crashed its bronze-faced beak against each of its own line, the shivered their whole array of oars; while the Hellenic galleys, not heedless of their chance, hemmed them in and battered them on every side. The hulls of our vessels rolled over and the sea was hidden from our sight, strewn as it was with wrecks and slaughtered men.",
        "source": "Aeschylus, The Persians, trans. Herbert Weir Smyth (Loeb Classical Library, 1922/1926 edition, Vol. I); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/The_Persians",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a2.png",
          "alt": "The Lenormant Relief, an ancient marble carving of an Athenian trireme with rows of oarsmen",
          "credit": "The Lenormant Relief, marble votive relief of an Athenian trireme, c. 410 B.C., Acropolis Museum, Athens; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Book VII of his Histories, Herodotus tells how Xerxes, marching to invade Greece, bridged the Hellespont, the strait dividing Asia from Europe, only to see a storm tear his bridges apart. Enraged, the king ordered the water itself given three hundred lashes and a set of fetters flung into it, while his men shouted that the 'bitter water' would be crossed whether it willed or not. It is antiquity's defining image of imperial hubris: a ruler who believes a strategic waterway can be beaten and chained into submission, and who beheads the engineers who failed him. The story shadows today's brinkmanship at Hormuz, where Iran vows to seal the strait and President Trump threatens to bomb bridges and power plants unless Tehran yields. Herodotus warns that the sea does not take orders, and that treating a strait as something to be scourged into obedience is the mark of a power overreaching toward its own downfall.",
        "excerpt": "So when Xerxes heard of it he was full of wrath, and straightway gave orders that the Hellespont should receive three hundred lashes, and that a pair of fetters should be cast into it. Nay, I have even heard it said that he bade the branders take their irons and therewith brand the Hellespont. It is certain that he commanded those who scourged the waters to utter, as they lashed them, these barbarian and wicked words: \"Thou bitter water, thy lord lays on thee this punishment because thou hast wronged him without a cause, having suffered no evil at his hands. Verily King Xerxes will cross thee, whether thou wilt or no. Well dost thou deserve that no man should honour thee with sacrifice; for thou art of a truth a treacherous and unsavoury river.\" While the sea was thus punished by his orders, he likewise commanded that the overseers of the work should lose their heads.",
        "source": "Herodotus, The Histories, Book VII, section 35, trans. George Rawlinson; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a3.png",
          "alt": "Illustration of Xerxes' men whipping the waters of the Hellespont on the king's orders",
          "credit": "Xerxes ordering the Hellespont to be scourged, illustration from a 1909 print; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Wilhelm von Kaulbach's monumental 1868 fresco 'The Battle of Salamis,' painted for the Maximilianeum in Munich, freezes the ancient strait battle at its climax of chaos and rout. Greek triremes drive into a churning tangle of foundering Persian ships while, high on a shoreline throne, Xerxes watches his fleet destroyed beneath him, a study in imperial power humbled by a narrow sea. The vast canvas turns a chokepoint into a stage for the collision of empire and defiant liberty, exactly the drama now playing out in the Gulf. As the United States and Iran battle for control of the Strait of Hormuz, Kaulbach's image reads as a warning painted in oil: fleets funneled into a strait can become a spectacle of catastrophe. The distant, helpless figure of the king surveying his losses is the oldest picture of brinkmanship gone wrong.",
        "excerpt": "A sweeping panoramic battle scene: Greek triremes ram and overwhelm the crowded Persian fleet in the narrow strait of Salamis, ships splintering amid drowning sailors and drifting wreckage, while Xerxes, enthroned on the heights at the right, looks on in impotent fury as his armada is annihilated below him. Kaulbach stages the chokepoint as high tragedy, the confined water crammed with wreckage and the sea itself lost beneath the dead.",
        "source": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (The Battle of Salamis), 1868, oil/fresco, Maximilianeum (Bavarian Landtag), Munich.",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a4.png",
          "alt": "Wilhelm von Kaulbach's 1868 painting of the Battle of Salamis, Greek and Persian fleets clashing in the strait",
          "credit": "Wilhelm von Kaulbach, 'Die Seeschlacht bei Salamis' (The Battle of Salamis), 1868, Maximilianeum, Munich; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel's opera 'Serse' (Xerxes), first staged in London in 1738, takes as its title character the very Persian king who bridged and whipped the Hellespont, opening with the famous aria 'Ombra mai fu' as Xerxes sings tenderly to a plane tree before his imperial ambitions unravel. Handel's audience knew Xerxes as the archetype of the conqueror who tried to master a strait and lead a vast empire against a smaller free people, and the opera plays his grandeur against his folly. That figure of Persian majesty overreaching itself is precisely the historical echo behind the current standoff, in which Iran, heir to that Persian world, makes the Strait of Hormuz its 'red line' against American power. The score turns the Xerxes story into music, a reminder of how long the Western imagination has framed a Persian sovereign's contest with the sea and with empire. Its very existence, a Baroque hit built on the sea-defying king, shows how deeply the theme of Persia and the contested strait runs through European art.",
        "excerpt": "Handel's opera seria in three acts opens with the celebrated arioso 'Ombra mai fu,' Xerxes' serene praise of a shady plane tree, before the drama of the imperious Persian king plays out; the music casts the historical sovereign, remembered for bridging and scourging the Hellespont, as a figure of both splendor and self-defeating pride. The opera's survival as one of Handel's best-loved works keeps the image of Persia's strait-defying monarch alive in the concert hall.",
        "source": "George Frideric Handel, Serse (Xerxes), HWV 40, opera in three acts, libretto after Silvio Stampiglia, first performed London, 15 April 1738; score and libretto at IMSLP.",
        "href": "https://imslp.org/wiki/Serse,_HWV_40_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a5.png",
          "alt": "Title page of the 1738 London libretto of Handel's opera Serse (Xerxes)",
          "credit": "Title page of the libretto of Handel's opera 'Serse' (Xerxes), London, 1738; Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "congo-ebola-hospital-attack",
    "headline": "Ebola patients flee and aid workers evacuate after a deadly attack on a treatment centre in eastern Congo",
    "overview": "Humanitarian workers were evacuated early Thursday after violence erupted overnight at the Nyakunde General Hospital Ebola treatment centre in Congo's Ituri province, the epicentre of an outbreak that has killed more than 220 people. The unrest began after a pregnant woman with severe anaemia died at the hospital, prompting angry community members to storm the centre and exchange gunfire; several Ebola patients are believed to have fled, and staff from the aid group Samaritan's Purse withdrew. It is the latest in a series of attacks on health facilities that have repeatedly set back efforts to contain the epidemic.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNMWQ1bGpYa08xNndqZ1dhNW9WZHJKRkpwa1d1emg4ckVuTVloWVcweTJiX3RxMExGWVB2NjI1b1pxT0daVzVqN0p5UFA5ZUg0bGdpSXVPcTNwdlZVZXdwXzFULUs2Zk1DQUhEWUtQaTd2TEdmMkFLaEdBX0d4WWlIMVBNREV6WE5JUjVxMWl2S3hJNXNvS1dTN2lGaEZvdUNVN1A2aUlDZlNEQTlPSHZUREVXZzFQZWtDb09zb0tabWxQZw?oc=5"
      },
      {
        "name": "The Jerusalem Post",
        "href": "https://www.jpost.com/international/article-902783"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/congo-ebola-hospital-attack.png",
      "alt": "Health workers in protective suits outside an Ebola treatment centre.",
      "credit": "The Jerusalem Post"
    },
    "rank": 15,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Twenty-four centuries before Nyakunde, Thucydides watched the same collapse unfold when plague broke over Athens during the Peloponnesian War. He noted first that the doctors were of no use and in fact died fastest of all, because they were the ones who kept going to the sick, exactly as the Samaritan's Purse workers fleeing the Ituri treatment centre knew the risk of every bedside. He described bodies heaped upon bodies, the dying reeling through the streets toward the fountains, and the sacred places choked with corpses no one dared to bury. Above all he recorded what fear does to a community: that neither fear of the gods nor any law of man was left to restrain people once they believed death was coming for them anyway. It is the oldest lesson in epidemics, and the crowd that stormed the Ebola centre after a pregnant woman died proves it still holds: when the sick outnumber the healers and terror takes hold, the social contract that lets medicine function is the first thing to break.",
        "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often. ... The bodies of dying men lay one upon another, and half-dead creatures reeled about the streets and gathered round all the fountains in their longing for water. The sacred places also in which they had quartered themselves were full of corpses of persons that had died there, just as they were. ... Fear of gods or law of man there was none to restrain them.",
        "source": "Thucydides, History of the Peloponnesian War, Book II, 47–53 (the Plague of Athens), trans. Richard Crawley.",
        "href": "http://classics.mit.edu/Thucydides/pelopwar.2.second.html",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a0.png",
          "alt": "Michiel Sweerts, 'Plague in an Ancient City' (c. 1652–54), thought to depict the Plague of Athens: the dead and dying strewn across the steps of a stricken city.",
          "credit": "Michiel Sweerts, 'Plague in an Ancient City' (c. 1652–54), Los Angeles County Museum of Art (LACMA), via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "When cholera reached Paris in the spring of 1832, the poet Heinrich Heine watched the city turn not on the disease but on imagined culprits, and his eyewitness dispatch reads like a premonition of Ituri. As the dead were buried faster than the panic could be explained, a rumour spread that people were not dying of cholera at all but being poisoned, and the mob went hunting for anyone carrying a suspicious powder. Heine saw men torn apart in the street for possessing what turned out to be camphor or chlorine, the very remedies against the plague, their bodies dragged along to shouts of 'There goes the cholera!' The parallel to the Nyakunde treatment centre is exact: a community convinced that the healers and their strange substances are the true killers, and a death that becomes the spark for lethal violence. In 1832 as in 2026, the epidemic's deadliest byproduct was mistrust, and the innocent — doctors, aid workers, the wrongly accused — paid for it. Heine's grim moral was that the terror the authorities themselves had sown came back as a riot of the dead.",
        "excerpt": "When the emeute of the chiffoniers was suppressed, and as the cholera did not take hold so savagely ... there rose all at once a rumour that many of those who had been so promptly buried had died not from disease but by poison. ... In the Rue Vaugirard, where two men were killed because certain white powders were found on them, I saw one of the wretches, while he was still in the death-rattle, and at the time old women plucked the wooden shoes from their feet and beat him on the head till he was dead. He was naked and beaten and bruised, so that his blood flowed; they tore from him not only his clothes, but also his hair, and cut off his lips and nose; and one blackguard tied a rope to the feet of the corpse and dragged it through the streets, crying out, \"Voilà le cholera-morbus!\"",
        "source": "Heinrich Heine, French Affairs: Letters from Paris, Letter VI (dated 19 April 1832), trans. Charles Godfrey Leland, in The Works of Heinrich Heine, Vol. 7.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Heinrich_Heine/Vol._7/Letter_6",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a1.png",
          "alt": "Alfred Rethel's woodcut 'Death the Strangler' (1851): Death fiddling on bones as revellers collapse, depicting the first outbreak of cholera at a Paris masked ball in 1831.",
          "credit": "Alfred Rethel, 'Der Tod als Würger' ('Death the Strangler'), 1851, depicting the 1831 Paris cholera outbreak, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Boccaccio opened the Decameron with an unflinching account of the Black Death in Florence in 1348, and its central horror is precisely the one now playing out in Ituri: contagion that dissolves the bonds meant to hold a community together. He describes how the mere touch of a sick person's clothing seemed to carry death, so that terror hollowed out every human tie until brother abandoned brother and even parents refused to tend their own children. His seven young narrators respond exactly as the panicked crowd and the fleeing Ebola patients do — by scattering, walling themselves off, choosing distance as the only defence they understand. What Boccaccio grasped, and what Nyakunde reenacts, is that a plague is never only a medical event; it is a social solvent that turns care into risk and neighbours into threats. When aid workers evacuate and patients flee into the bush rather than trust a treatment centre, they are re-staging the Florentine catastrophe Boccaccio set down almost seven hundred years ago.",
        "excerpt": "Indeed, leaving be that townsman avoided townsman and that well nigh no neighbour took thought unto other and that kinsfolk seldom or never visited one another and held no converse together save from afar, this tribulation had stricken such terror to the hearts of all, men and women alike, that brother forsook brother, uncle nephew and sister brother and oftentimes wife husband; nay (what is yet more extraordinary and well nigh incredible) fathers and mothers refused to visit or tend their very children, as they had not been theirs.",
        "source": "Giovanni Boccaccio, The Decameron, Introduction (Proem) to the First Day, trans. John Payne (1886), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a2.png",
          "alt": "Luigi Sabatelli's etching of the plague of Florence in 1348, a scene from Boccaccio's Decameron: the dead and dying sprawled amid the living in the streets.",
          "credit": "Luigi Sabatelli the Elder, 'The plague of Florence, 1348; a scene from Boccaccio's Decameron' (etching). Wellcome Collection, London, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Daniel Defoe's 'A Journal of the Plague Year' reconstructs London's great plague of 1665 as a chronicle of quarantine and the violence it breeds — the same collision between public-health control and human fear that detonated at the Ituri treatment centre. Defoe details how infected houses were shut up by law, marked with a red cross, and guarded day and night by watchmen whose job was to make sure no one went in or out. And he records what confinement did to people: they committed violences against the watchmen, broke out by force in many places, and devised endless stratagems to escape. That is the dynamic behind every attack on an Ebola facility — the quarantine that medicine requires is experienced by the frightened as imprisonment, and the guards and healers become the enemy. When patients fled the Nyakunde centre under gunfire, they were doing what Defoe's Londoners did three and a half centuries ago: choosing the open contagion of flight over the terror of being locked away with the disease.",
        "excerpt": "That to every infected house there be appointed two watchmen, one for every day, and the other for the night; and that these watchmen have a special care that no person go in or out of such infected houses ... several violences were committed and injuries offered to the men who were set to watch the houses so shut up; also several people broke out by force in many places, as I shall observe by-and-by.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a3.png",
          "alt": "A colour wood engraving of a London street during the Great Plague of 1665, with a death cart and the cry 'Bring out your dead'.",
          "credit": "Edmund Evans (engraver), 'A street during the plague in London with a death cart' (colour wood engraving). Wellcome Collection, London, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 'The Triumph of Death' (c. 1562) is the definitive image of a society overrun by mortality, and it speaks directly to a treatment centre stormed in the dark by a terrified crowd. Across a scorched landscape, armies of skeletons drive the living toward a great trap, and no rank, remedy, or refuge offers protection — kings, mothers, and the sick are herded together toward the same end. There is no space in Bruegel's world for the careful, sterile order that an Ebola ward depends on; there is only panic, flight, and the machinery of death grinding through every human institution. That is what the attack at Nyakunde threatens to make real: the moment fear overwhelms containment, the fragile island of medicine is swept into the general chaos. Bruegel painted the nightmare that public-health workers spend their lives trying to hold back, and every assault on a clinic is a small victory for the procession he depicted.",
        "excerpt": "Bruegel fills the panel with a vast, panoramic army of skeletons sweeping across a blasted, smoke-darkened land. The living are driven in terror toward a coffin-lidded trap; a cart of skulls rolls forward, a king's gold spills uselessly, and a woman falls beneath the scythe. Nothing — wealth, prayer, love, or flight — halts the advance, and the whole ordered world of the living is shown dissolving into rout and ruin.",
        "source": "Pieter Bruegel the Elder, 'The Triumph of Death', oil on panel, c. 1562. Museo del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Triumph_of_Death_-_WGA3389.jpg",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a4.png",
          "alt": "Pieter Bruegel the Elder, 'The Triumph of Death' (c. 1562): armies of skeletons overrunning a blasted landscape as the terrified living are herded toward death.",
          "credit": "Pieter Bruegel the Elder, 'The Triumph of Death' (c. 1562), Museo del Prado, Madrid, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin's 'The Plague' (Die Pest, 1898) reimagines pestilence as a winged reaper riding a dragon-like beast low through the streets of a town, scattering the living as it passes. Painted after Böcklin's own encounters with epidemic disease, it captures the specific terror that grips eastern Congo: contagion as an unseen, unstoppable predator that turns a place of life into a place of flight. Bodies fall in the narrow street below while those still standing recoil in helpless panic, exactly the scene reported from Nyakunde as patients bolted and aid workers evacuated into the night. Böcklin refuses any comforting distance; the pestilence is right there, at street level, among ordinary people who have no defence. It is the emotional truth underneath the news dispatch — the moment a community realises the horror has entered its own streets and that medicine, for now, has lost control of it.",
        "excerpt": "A skeletal figure of Death, black-winged, rides a hunched reptilian beast down a shadowed medieval street. Its breath seems to fell the townsfolk as it passes: a woman lies sprawled across the cobbles in the foreground while others flee or collapse in terror. Rendered in bruised greens and sickly ochres, the image makes the plague a living, airborne predator moving unstoppably through the heart of the town.",
        "source": "Arnold Böcklin, 'Die Pest' ('The Plague'), tempera on fir wood, 1898. Kunstmuseum Basel.",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a5.png",
          "alt": "Arnold Böcklin, 'The Plague' (1898): a black-winged figure of Death riding a dragon-like beast down a town street as inhabitants fall and flee.",
          "credit": "Arnold Böcklin, 'Die Pest' ('The Plague'), 1898, Kunstmuseum Basel, via Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "algeria-foster-home-fire",
    "headline": "A fire at a state children's home near Algiers kills 11, including children, and injures 19",
    "overview": "A blaze tore through the Childhood Relief Institution, a state-run care home for orphans, abandoned minors and children with special needs, in Mohammadia east of Algiers early Thursday, killing 11 people, among them children, and injuring 19, Algeria's civil protection service said. Firefighters were called at about 3:30 a.m. and rescued five children with reduced mobility; the cause has not been announced. President Abdelmadjid Tebboune said he received the news \"with deep sorrow\" as the country swelters through a heatwave that has fuelled nearly 1,000 fires in a week.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cvgwd4nz344o"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/16/fire-at-orphanage-in-algeria-kills-11-people-including-children"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/algeria-foster-home-fire.png",
      "alt": "Firefighters direct hoses at a building fire against the night sky.",
      "credit": "Algeria General Directorate for Civil Protection via BBC"
    },
    "rank": 16,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When fire tore through the Childhood Relief Institution in Mohammadia, killing eleven people and children among them as they slept, it revived the oldest urban terror in the Western record: the great conflagration that consumed Rome in July of A.D. 64. The historian Tacitus, writing of that inferno, dwells not on the toppled temples but on the human beings trapped inside the flames, and above all on the weakest of them. He names the terror of women, the slowness of the aged, and, most piercingly, 'the helpless inexperience of childhood' as the fire outran every attempt to flee. Nearly two thousand years later, the five children with reduced mobility carried out of the Algiers care home belong to that same category of the helpless, wholly dependent on others to rescue them. As Algeria burns through a heatwave that has kindled roughly a thousand fires in a week, Tacitus's account is a reminder that a city's, or a state's, greatness is measured less by its monuments than by whether it can shield those who cannot save themselves. His suspicion that the Roman fire may have been no accident but the work of negligence or design also shadows the still-unexplained cause of Thursday's blaze.",
        "excerpt": "Added to this were the wailings of terror-stricken women, the feebleness of age, the helpless inexperience of childhood, the crowds who sought to save themselves or others, dragging out the infirm or waiting for them, and by their hurry in the one case, by their delay in the other, aggravating the confusion.",
        "source": "Tacitus, The Annals, Book XV (on the Great Fire of Rome, A.D. 64), trans. Alfred John Church and William Jackson Brodribb (public domain).",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a0.png",
          "alt": "Hubert Robert's painting of the Great Fire of Rome, flames engulfing classical buildings as crowds flee.",
          "credit": "Hubert Robert, 'The Fire of Rome' (c. 1785), Musee d'Art moderne Andre Malraux, Le Havre; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "The modern conscience learned to grieve for the innocent burned in institutions of care and labor on 25 March 1911, when fire swept the Triangle Shirtwaist Factory in New York and killed 146 workers, most of them young immigrant women and girls locked behind doors they could not open. The United Press reporter William Shepherd watched from the street below and telephoned his dispatch as bodies fell, giving the nation a first-hand account of a preventable horror. His words, counting the dead by the sound of their impact, made negligence audible in a way official reports never could. The fire at the Childhood Relief Institution near Algiers carries the same charge of institutional failure: a state facility meant to protect orphans and children with special needs became, instead, the place where eleven of them died and nineteen were hurt. Triangle turned public outrage into fire codes, exits, and inspections, the very safeguards whose absence turns a building full of dependents into a trap. That a home for the most vulnerable could still burn in 2026 measures how far the promise won in 1911 has yet to reach.",
        "excerpt": "I learned a new sound--a more horrible sound than description can picture. It was the thud of a speeding, living body on a stone sidewalk. Thud-dead, thud-dead, thud-dead, thud-dead. Sixty-two thud-deads. I call them that, because the sound and the thought of death came to me each time, at the same instant.",
        "source": "William G. Shepherd, 'Eyewitness at the Triangle,' United Press dispatch on the Triangle Shirtwaist Factory fire, first published 27 March 1911; Kheel Center, Cornell University ILR School.",
        "href": "https://trianglefire.ilr.cornell.edu/primary/testimonials/ootss_WilliamShepherd.html",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a1.png",
          "alt": "Firemen train hoses on the burning Asch Building during the Triangle Shirtwaist Factory fire, 25 March 1911.",
          "credit": "Photograph of the Triangle Shirtwaist Factory fire, New York, 25 March 1911; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "No writer bound the soot of childhood to the negligence of adults more tightly than William Blake, whose 'The Chimney Sweeper' from Songs of Innocence (1789) speaks in the voice of a boy sold into labor and soot after his mother's death. In the poem the sweepers dream of thousands of children 'lock'd up in coffins of black,' freed only by an angel into a green plain of light, a vision of deliverance set against the cruelty that surrounds them. Read after a fire that killed children in a state care home outside Algiers, Blake's image of the young shut in blackness is unbearably literal, and his closing line about duty cuts the other way against the institutions that failed them. The Childhood Relief Institution existed precisely to gather the parentless and the disabled that society had otherwise abandoned, the same children Blake insisted had a claim on the conscience of the powerful. His pairing of innocence with soot, smoke, and premature death frames the mourning now underway in Mohammadia. That five children of reduced mobility were carried out alive is the nearest thing this story has to Blake's angel with the bright key.",
        "excerpt": "And so he was quiet, & that very night,\nAs Tom was a sleeping he had such a sight,\nThat thousands of sweepers Dick, Joe, Ned & Jack\nWere all of them lock'd up in coffins of black.\n\nAnd by came an Angel who had a bright key\nAnd he open'd the coffins & set them all free,\nThen down a green plain leaping laughing they run\nAnd wash in a river and shine in the Sun.",
        "source": "William Blake, 'The Chimney Sweeper,' Songs of Innocence (1789), from Songs of Innocence and of Experience (copy Z, 1826), Library of Congress (public domain).",
        "href": "https://en.wikisource.org/wiki/Songs_of_Innocence_and_of_Experience_(1826)/Songs_of_Innocence/The_Chimney_Sweeper",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a2.png",
          "alt": "William Blake's hand-coloured plate of 'The Chimney Sweeper' from Songs of Innocence.",
          "credit": "William Blake, 'The Chimney Sweeper' plate, Songs of Innocence and of Experience, copy L (1795); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The grief of a parent who cannot be consoled for lost children has its founding expression in the prophet Jeremiah, whose verse the Gospels later attached to the slaughter of the innocents. In it Rachel weeps for her children and refuses all comfort 'because they were not,' a cry that has served for millennia as the voice of every community mourning its young. The fire near Algiers, which killed children in the very place charged with their keeping, summons that ancient lament with terrible aptness, for these were orphans, the parentless whom scripture repeatedly commands the community to protect. Rachel's refusal to be comforted honors the truth that some losses are not softened by reason or by rescue statistics, only witnessed. As Algeria counts its dead amid a week of a thousand fires, the verse offers not consolation but the dignity of unashamed grief. It also indicts every negligence that fails the fatherless, the failure the cause of Thursday's blaze may yet reveal.",
        "excerpt": "Thus saith the LORD; A voice was heard in Ramah, lamentation, and bitter weeping; Rahel weeping for her children refused to be comforted for her children, because they were not.",
        "source": "The Bible, King James Version, Jeremiah 31:15 (public domain).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jeremiah",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a3.png",
          "alt": "A painting of Rachel weeping and refusing to be comforted for her lost children.",
          "credit": "'Rachel Weeping for her Children'; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner witnessed the Houses of Parliament burn on the night of 16 October 1834 and turned the catastrophe into one of the most overwhelming fire paintings in Western art, a wall of flame and smoke swallowing the London sky above the Thames. He renders fire not as detail but as an engulfing force before which human structures and human plans dissolve, the crowds on the bank reduced to helpless spectators. That vision speaks directly to the scene at the Childhood Relief Institution, where a state building meant to shelter the vulnerable was overtaken by a blaze whose cause is still unknown. Turner painted amid an era newly anxious about conflagration and public safety, much as Algeria now reckons with a heatwave that has ignited roughly a thousand fires in a single week. The sublime terror of his canvas, beauty and destruction fused, mirrors how a fire can be at once spectacle and unbearable loss. Against such an inferno, the rescue of five immobile children reads as a small, hard-won mercy.",
        "excerpt": "Turner's canvas turns a real disaster into a towering vision of fire as an elemental power, flames and smoke blazing over the river while the ruined buildings collapse into light. Tiny onlooking figures crowd the foreground, dwarfed and powerless before the blaze. The painting captures the terrible sublimity of a conflagration that consumes an institution at the heart of public life.",
        "source": "J. M. W. Turner, 'The Burning of the Houses of Lords and Commons, 16 October 1834' (c. 1835), oil on canvas, Philadelphia Museum of Art.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner%2C_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons%2C_October_16%2C_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a4.png",
          "alt": "Turner's painting of the Houses of Parliament ablaze at night, a vast sheet of orange flame and smoke rising over the Thames as crowds watch from the riverbank.",
          "credit": "J. M. W. Turner, 'The Burning of the Houses of Lords and Commons, 16 October 1834' (c. 1835), Philadelphia Museum of Art, via Google Art Project / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Giotto's 'Lamentation (The Mourning of Christ),' painted around 1305 in the Scrovegni Chapel in Padua, is the image that taught European art how to grieve, gathering mourners around a lifeless body in a circle of raw and human sorrow. The Virgin cradles her dead son face to face while attendants bend low and angels wheel overhead in open anguish, grief made unbearably intimate rather than ceremonial. That composition presses on the mourning now unfolding in Mohammadia, where families and a whole nation bend over the loss of eleven people, children among them, taken by fire in a home meant to keep them safe. Giotto insists that each death is a person to be held and wept for, not a number in a casualty count, and that dignity is exactly what the orphans of the Childhood Relief Institution are owed. The scene's tenderness toward the defenseless answers a story about society's duty to those in its care. In a week when Algeria is ringed by a thousand fires, his frozen circle of grief gives shape to a sorrow words strain to carry.",
        "excerpt": "Giotto arranges the mourners in a tight ring of grief around the dead body, the Virgin drawing her son's face to hers while stooping figures and wheeling, weeping angels give sorrow its full human weight. Faces and gestures register raw, individual pain rather than formal ritual. The fresco marks the moment Western painting learned to mourn its dead as beloved persons.",
        "source": "Giotto di Bondone, 'Lamentation (The Mourning of Christ)' (c. 1305), fresco, Scrovegni (Arena) Chapel, Padua.",
        "href": "https://commons.wikimedia.org/wiki/File:Giotto_-_Scrovegni_-_-36-_-_Lamentation_%28The_Mourning_of_Christ%29_adj.jpg",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a5.png",
          "alt": "Giotto fresco of mourners gathered closely around the dead body of Christ, the Virgin cradling his head while angels grieve overhead against a blue sky.",
          "credit": "Giotto di Bondone, 'Lamentation (The Mourning of Christ)' (c. 1305), Scrovegni Chapel, Padua, via Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "nicaragua-italy-ties-cut",
    "headline": "Nicaragua severs diplomatic relations with Italy amid a row over extraditing a Red Brigades fugitive in the Aldo Moro case",
    "overview": "Nicaragua announced it was breaking off all diplomatic ties with Italy after Foreign Minister Antonio Tajani renewed demands for the extradition of Alessio Casimirri, a former Red Brigades militant who took part in the 1978 kidnapping and murder of ex-premier Aldo Moro and now lives as a restaurateur in Managua. Managua cited Tajani's \"unjustified, aggressive and irresponsible declarations\" and accused him of \"European arrogance,\" while Tajani, speaking at a European People's Party summit in Madrid, vowed Italy would not stop pressing for Casimirri to face justice. Casimirri is the only member of the via Fani commando never arrested.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNbGRUVHBFUEd6aS1WM28yVHk0ZlJRcUtoMm5CQ2lRYk5tZFlKaElqT3ZBUFlYbFFxd2ZwelRINWtDbkhiUnVtOGxkTjBZVnBOejJPZy1fdEstdUpQWVdJeTNtS04zdXdWYlMxSlU1RlJueGV1MDVxYS1JZjd2TzdOYXhpQU93YzRYR0tlRjI3SGNRcmtLcThrLWR0TmRHM2k4eE5yZF8yWDdzdFhfV29GdXU1RFNDdFk?oc=5"
      },
      {
        "name": "ANSA",
        "href": "https://www.ansa.it/english/news/politics/2026/07/16/tajani-stands-his-ground-after-nicaragua-says-its-breaking-off_402851c5-4d48-4ba6-840b-a5fbf5cf89b6.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/nicaragua-italy-ties-cut.png",
      "alt": "A 1970s-era street in Rome evoking the years of the Aldo Moro kidnapping.",
      "credit": "ANSA"
    },
    "rank": 17,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Tajani demanded that Managua surrender Alessio Casimirri, Nicaragua answered not with a warrant but with the ancient logic of asylum—the same logic that once carried Themistocles, the Athenian who had shattered Persia's fleet at Salamis, to the doorstep of the Persian king. Condemned and hunted at home, the great commander threw himself on the mercy of the very empire he had defeated, and Artaxerxes, valuing a useful guest over his enemies' grievances, took him in and kept him from royal revenues. Casimirri, the last via Fani gunman never brought to trial, has likewise made a second life under a foreign sun, running a Managua restaurant while Rome's demands go unanswered. In each case a nation shelters the man another nation wants most, and reads the extradition demand as arrogance rather than justice. Thucydides preserved the fugitive's own words of appeal, and they still describe the bargain of exile: safety abroad in exchange for a story the host wishes to hear. Twenty-five centuries later, the sanctuary holds and the crime goes unpunished.",
        "excerpt": "I, Themistocles, am come to you, who did your house more harm than any of the Hellenes, when I was compelled to defend myself against your father's invasion—harm, however, far surpassed by the good that I did him during his retreat, which brought no danger for me but much for him. For the past, you are a good turn in my debt—[here he mentioned the warning sent to Xerxes from Salamis to retreat, as well as his finding the bridges unbroken, which, as he falsely pretended, was due to him]—for the present, able to do you great service, I am here, pursued by the Hellenes for my friendship for you. However, I desire a year's grace, when I shall be able to declare in person the objects of my coming.",
        "source": "Thucydides, History of the Peloponnesian War, Book 1.137 (Themistocles' letter to King Artaxerxes), translated by Richard Crawley (1874).",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a0.png",
          "alt": "Roman-era portrait herm of Themistocles, a copy of a 5th-century BC Greek original, in the Museo Archeologico Ostiense, Ostia.",
          "credit": "Photograph by Sailko of the bust of Themistocles (Roman copy after a 5th-century BC Greek original), Museo Archeologico Ostiense, Ostia. Licensed CC BY 3.0."
        }
      },
      {
        "category": "historical",
        "title": "Aldo Moro was seized on via Fani, held for fifty-five days, and shot—a statesman destroyed by political violence and, in Casimirri's case, never avenged. Rome had rehearsed that wound long before, when Tiberius Gracchus, tribune and reformer, was clubbed to death on the Capitol by a mob of senators and their clients. Plutarch records that above three hundred fell that day, and that the killers denied the tribune's own brother the simple mercy of burying the body, flinging it instead into the Tiber. The murderers were men of the state, and no reckoning followed; the crime was absorbed into politics and left unpaid. That is the grievance now animating Italy's rupture with Nicaragua—a killing whose last perpetrator dines freely while the victim's memory waits on a justice that never comes. The Gracchan precedent is the oldest lesson of the Moro case: a republic can lose a man to violence and then lose the reckoning too.",
        "excerpt": "of the rest there fell above three hundred killed by clubs and staves only, none by an iron weapon... they would not suffer his own brother, though he earnestly begged the favour, to bury him in the night, but threw him, together with the other corpses, into the river.",
        "source": "Plutarch, Life of Tiberius Gracchus, translated by John Dryden.",
        "href": "https://classics.mit.edu/Plutarch/tiberius.html",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a1.png",
          "alt": "Engraving of the murder of Tiberius Gracchus, beaten with clubs by senators on the Capitol.",
          "credit": "Ludwig Gottlieb Portman after Jacobus Buys, Murder of Tiberius Gracchus, 1797, engraving, Rijksmuseum, Amsterdam (RP-P-1905-2184). Public domain (CC0)."
        }
      },
      {
        "category": "literary",
        "title": "Dante, himself condemned to lifelong exile from Florence and forbidden to return on pain of death, reserved the lowest pit of his hell for those who betray and murder their benefactors. In the frozen heart of the earth he set Brutus and Cassius, the assassins of Caesar, chewed for eternity in two of Lucifer's three mouths beside Judas—the political killer fixed forever as the archetype of treachery. The vision speaks twice to the Moro affair: it is a poem written by a fugitive who never saw his city again, and a verdict that the murder of a statesman is a wound the moral order will not let rest. Casimirri lives out his exile in comfort rather than ice, yet the logic is Dante's inverted—the assassin at ease abroad, the sentence never carried out. Where the poet imagined an eternal punishment for the killers of a leader, the modern case offers only a severed embassy and an unclosed file. Exile and assassin, victim and traitor, meet in these lines as they meet in the row between Rome and Managua.",
        "excerpt": "\"That soul up there which has the greatest pain,\" / The Master said, \"is Judas Iscariot; / With head inside, he plies his legs without. / Of the two others, who head downward are, / The one who hangs from the black jowl is Brutus; / See how he writhes himself, and speaks no word! / And the other, who so stalwart seems, is Cassius.\"",
        "source": "Dante Alighieri, The Divine Comedy, Inferno, Canto XXXIV, lines 61–67, translated by Henry Wadsworth Longfellow (1867).",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_34",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a2.png",
          "alt": "Gustave Dore's engraving for Inferno Canto XXXIV: the giant figure of Lucifer frozen in the ice of Cocytus at the bottom of Hell.",
          "credit": "Gustave Dore, illustration for Dante's Inferno, Canto XXXIV (Lucifer), 1861–1868 engraving. Public domain."
        }
      },
      {
        "category": "literary",
        "title": "The Moro case turns on the oldest question in scripture—whether a killer can simply walk away and disclaim all account of his brother. In Genesis, Cain murders Abel and answers God's inquiry with a shrug, \"Am I my brother's keeper?\", only to be sentenced to wander the earth a fugitive and a vagabond. Yet the strange mercy of the story is that God marks Cain precisely so that no one may kill him—the murderer is made a protected exile, sheltered even in his guilt. Casimirri is that marked man: convicted for his role in Moro's death, he is nonetheless shielded by Nicaragua, which treats a demand for his surrender as an affront rather than a duty. The blood of the victim, the text says, cries out from the ground, and it is exactly that unanswered cry that Tajani invoked and Managua dismissed as \"European arrogance.\" Between the mark that protects the guilty and the blood that will not be silent lies the whole of this diplomatic rupture.",
        "excerpt": "And the LORD said unto Cain, Where is Abel thy brother? And he said, I know not: Am I my brother's keeper? And he said, What hast thou done? the voice of thy brother's blood crieth unto me from the ground... a fugitive and a vagabond shalt thou be in the earth... And the LORD set a mark upon Cain, lest any finding him should kill him. And Cain went out from the presence of the LORD, and dwelt in the land of Nod, on the east of Eden.",
        "source": "Genesis 4:9–16, King James Version (Authorized Version).",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a3.png",
          "alt": "Fernand Cormon's painting of Cain fleeing with his family into the wilderness after the murder of Abel.",
          "credit": "Fernand Cormon, Cain (Caïn fuyant avec sa famille / Cain fleeing before Jehovah's Curse), 1880, oil on canvas, Musee d'Orsay, Paris. Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "When a state wants to remember a political murder, it reaches for images like David's Death of Marat—and the Moro case is, at bottom, a fight over who controls that memory. David painted the assassinated Jacobin not as a corpse but as a martyr, lending a squalid killing the gravity of a sacred death and fixing the victim, not the assassin, at the center of the nation's gaze. Italy's insistence on extraditing Casimirri is a demand that Moro be granted the same standing: that the murdered man remain the subject of the story and the killer be made to answer. Nicaragua's refusal, and its shelter of the gunman, is the counter-claim—that the fugitive, not the victim, deserves protection. The painting reminds us that assassination is never only a crime but an argument about meaning, waged long after the blood is dry. That argument is what has now severed two nations' ties.",
        "excerpt": "Jacques-Louis David depicts the murdered revolutionary journalist Jean-Paul Marat slumped in his bath, quill still in hand, moments after being stabbed by Charlotte Corday, whose petition he still holds. The assassin herself is absent; David gives us only the martyred victim, lit by a cold light against an empty dark ground, transforming a political killing into a secular pieta. It became the founding image of assassination as political iconography.",
        "source": "Jacques-Louis David, The Death of Marat (La Mort de Marat), 1793, oil on canvas, Royal Museums of Fine Arts of Belgium, Brussels.",
        "href": "https://commons.wikimedia.org/wiki/File:Death_of_Marat_by_David.jpg",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a4.png",
          "alt": "Jacques-Louis David's The Death of Marat: the assassinated revolutionary Jean-Paul Marat slumped dead in his bath, a quill in his hand.",
          "credit": "Jacques-Louis David, The Death of Marat, 1793, Royal Museums of Fine Arts of Belgium, Brussels. Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "It is fitting that the sharpest image of this quarrel comes from an Italian brush: Vincenzo Camuccini, a Roman, painted the assassination of Caesar as a storm of daggers in the very chamber of the Republic. His Death of Caesar shows the killing of a head of state carried out by men who called it duty—precisely the self-justification the Red Brigades claimed when they seized and shot Aldo Moro on via Fani. Casimirri, alone among that commando, was never arrested; like Caesar's assassins he struck at the state and then slipped beyond its reach, in his case across an ocean to Managua. Camuccini's Rome is the Rome now demanding his return, insisting that political murder cannot be dissolved into ideology or distance. The canvas freezes the instant of the crime; the Moro file, half a century on, is still frozen at the same point, its last actor beyond justice. Tajani's demand and Nicaragua's rupture are the long echo of that unfinished scene.",
        "excerpt": "Vincenzo Camuccini's canvas freezes the instant of the Ides of March: Julius Caesar, wrapped in white, recoils as a knot of senators press in with drawn daggers, turning the Roman Senate itself into the scene of the crime. The Roman painter renders the killing of the head of state as a theatrical convulsion of gesture and betrayal. The assassins act in the name of the Republic, yet history remembers the deed as murder.",
        "source": "Vincenzo Camuccini, La morte di Cesare (The Death of Caesar), c. 1804–1805, oil on canvas, Galleria Nazionale d'Arte Moderna e Contemporanea, Rome.",
        "href": "https://commons.wikimedia.org/wiki/File:Vincenzo_Camuccini_-_La_morte_di_Cesare.jpg",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a5.png",
          "alt": "Vincenzo Camuccini's The Death of Caesar: senators surround and stab Julius Caesar in the Roman Senate.",
          "credit": "Vincenzo Camuccini, La morte di Cesare, c. 1804–1805, Galleria Nazionale d'Arte Moderna e Contemporanea, Rome. Public domain."
        }
      }
    ]
  },
  {
    "slug": "us-public-charge-green-card-rule",
    "headline": "The Trump administration revives a 'public charge' rule that can deny green cards to immigrants who use public benefits",
    "overview": "A rule published in the Federal Register on Thursday restores broad discretion for U.S. immigration officers to deny green cards to applicants deemed likely to become a \"public charge,\" weighing an applicant's age, health, income and use of means-tested benefits such as food stamps, Medicaid and housing assistance. First imposed in 2020 and rescinded under President Biden, the policy will be formally published July 20 and take effect Sept. 18, subjecting hundreds of thousands of applicants a year to broader scrutiny. Advocates warn it will deter immigrant families from claiming aid they are legally entitled to.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxQQUR1VmZFV25YcWp2bTUtRGdJWlI2V0MxOWRWXy1aVkJRem5oRHBLQjhPRlhvdUdsV0J3RmREeFgtXzdvcHRfSkR0Y0l1ZDJ3NEtkWWVKaDZ6UmxsTFVkclU0V2RTRjNLbUtzSUswVktMZ3k1TmJMSGoxNnVxWnJYcmpza1I3ZFpQY2R1V3FhMA?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/dhs-immigrants-green-card-public-charge-medicaid-housing-food-aid/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/us-public-charge-green-card-rule.png",
      "alt": "Immigrants arriving at Ellis Island in the early twentieth century.",
      "credit": "Getty Images via CBS News"
    },
    "rank": 18,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Washington first set out to decide which newcomers were worthy of the nation, it did so by class and by origin. The Chinese Exclusion Act of 1882 slammed the gate on an entire people cast as undesirable, converting economic anxiety into a federal law of exclusion. The public-charge rule reviving on September 18 works by a subtler sorting: not barring a nationality outright, but empowering officers to weigh a family's poverty, their food stamps and Medicaid, as evidence they do not belong. Both measures answer the same question the Statue of Liberty was built to answer differently, namely who deserves to pass through the golden door. Where 1882 named its excluded class explicitly, the 2026 rule lets need itself become the disqualification. The through-line is a nation deciding a stranger's worth at its own threshold.",
        "excerpt": "Whereas, in the opinion of the Government of the United States the coming of Chinese laborers to this country endangers the good order of certain localities within the territory thereof: Therefore, Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled, That from and after the expiration of ninety days next after the passage of this act, and until the expiration of ten years next after the passage of this act, the coming of Chinese laborers to the United States be, and the same is hereby, suspended; and during such suspension it shall not be lawful for any Chinese laborer to come, or having so come after the expiration of said ninety days, to remain within the United States.",
        "source": "Chinese Exclusion Act (\"An Act to execute certain treaty stipulations relating to Chinese\"), ch. 126, 22 Stat. 58 (May 6, 1882). Text via the Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/19th_century/chinese_exclusion_act.asp",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a0.png",
          "alt": "An 1882 Puck cartoon showing laborers of many nationalities building a wall of prejudice to keep out Chinese immigrants.",
          "credit": "F. Graetz, \"The Anti-Chinese Wall,\" Puck, 1882. Library of Congress via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "The exact words powering today's rule are more than a century old. As Ellis Island opened its great inspection halls, the Immigration Act of 1891 had just made \"persons likely to become a public charge\" a formal class to be turned back at the harbor. Officers there learned to read poverty on sight, a thin coat, an empty purse, no relative waiting, and to mark such arrivals for exclusion or deportation. The Federal Register rule taking effect September 18 restores precisely that discretion, instructing officers to weigh Medicaid, housing aid, and food assistance against an applicant for a green card. It is the same phrase, the same logic, and the same fear, that the poor stranger will become a burden rather than a citizen. The huddled masses of Lazarus's poem were, in the law's eyes, exactly the people the public-charge clause was written to screen.",
        "excerpt": "All idiots, insane persons, paupers or persons likely to become a public charge, persons suffering from a loathsome or a dangerous contagious disease, persons who have been convicted of a felony or other infamous crime or misdemeanor involving moral turpitude, polygamists, and also any person whose ticket or passage is paid for with the money of another or who is assisted by others to come . . . .",
        "source": "Immigration Act of March 3, 1891, ch. 551, 26 Stat. 1084, sec. 1. Text via the Immigration History project, University of Texas at Austin.",
        "href": "https://immigrationhistory.org/item/immigration-act-of-1891/",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a1.png",
          "alt": "Lewis Hine photograph of an immigrant family seated among their bundles in the baggage room at Ellis Island around 1905.",
          "credit": "Lewis W. Hine, \"Immigrant Family in the Baggage Room of Ellis Island,\" c.1905. Google Art Project via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Emma Lazarus wrote her sonnet in 1883 to raise money for the Statue of Liberty's pedestal, and in doing so rewrote the meaning of the monument itself. Her \"Mother of Exiles\" does not ask newcomers to prove their wealth or usefulness; she summons precisely \"your tired, your poor, / Your huddled masses,\" the very people a public-charge test is designed to turn away. The rule reviving on September 18 inverts that welcome, treating poverty and reliance on food stamps, Medicaid, or housing aid as grounds to deny a green card rather than a reason to lift the lamp. Bolted in bronze inside the pedestal in 1903, the poem became the nation's stated creed, and the new regulation measures how far practice has drifted from it. To read the sonnet beside the Federal Register notice is to see two opposite answers to the stranger at the door.",
        "excerpt": "Not like the brazen giant of Greek fame,\nWith conquering limbs astride from land to land;\nHere at our sea-washed, sunset gates shall stand\nA mighty woman with a torch, whose flame\nIs the imprisoned lightning, and her name\nMother of Exiles. From her beacon-hand\nGlows world-wide welcome; her mild eyes command\nThe air-bridged harbor that twin cities frame.\n\"Keep, ancient lands, your storied pomp!\" cries she\nWith silent lips. \"Give me your tired, your poor,\nYour huddled masses yearning to breathe free,\nThe wretched refuse of your teeming shore.\nSend these, the homeless, tempest-tost to me,\nI lift my lamp beside the golden door!\"",
        "source": "Emma Lazarus, \"The New Colossus\" (1883), inscribed on a bronze plaque inside the Statue of Liberty pedestal in 1903. Public domain; text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_New_Colossus",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a2.png",
          "alt": "Portrait photograph of the American poet Emma Lazarus, author of \"The New Colossus.\"",
          "credit": "Portrait of Emma Lazarus (1849-1887), c.1880s. Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The Book of Ruth tells of a destitute foreign widow, a Moabite and an outsider, who binds herself to Naomi and to Israel with words that became scripture's great vow of belonging. Ruth arrives with nothing and survives by gleaning leftover grain in Boaz's fields, the ancient equivalent of a poor immigrant leaning on public support; yet the text treats her not as a burden but as the ancestor of King David. The public-charge rule taking effect September 18 would read a woman like Ruth as \"likely to become a public charge\" and weigh her poverty against her admission. Her pledge that \"thy people shall be my people\" is the immigrant's promise of loyalty that the new policy answers with suspicion of need. The tension between welcoming the stranger and testing her worthiness is as old as this book.",
        "excerpt": "And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God: Where thou diest, will I die, and there will I be buried: the LORD do so to me, and more also, if ought but death part thee and me.",
        "source": "The Holy Bible, King James Version (1611), Ruth 1:16-17. Public domain; text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ruth",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a3.png",
          "alt": "Painting depicting Ruth clinging to Naomi as she vows her loyalty.",
          "credit": "Philip Hermogenes Calderon, \"Ruth and Naomi.\" Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Frederic Auguste Bartholdi's colossus, dedicated in New York Harbor in 1886 as \"Liberty Enlightening the World,\" became the first thing millions of immigrants saw as their ships neared the Ellis Island inspection halls. Bartholdi conceived her as a beacon of republican liberty; Lazarus's poem and generations of arrivals recast her as a promise of refuge to the poor. The public-charge rule reviving September 18 legislates in the statue's very shadow, empowering officers to deny green cards to immigrants judged too likely to need food stamps, Medicaid, or housing aid. The image of a torch raised beside the \"golden door\" stands in stark opposition to a threshold now guarded against poverty itself. No monument states the nation's ideal of welcome more plainly, and none throws the new rule's exclusions into sharper relief.",
        "excerpt": "Bartholdi's copper colossus, \"Liberty Enlightening the World,\" rises more than 300 feet above New York Harbor, her right arm lifting a gilded torch and her left cradling a tablet of law. Dedicated in 1886, she faces the sea approach that carried millions of immigrants toward the Ellis Island inspection station. Her raised lamp became the enduring symbol of a nation that promised to receive the world's poor.",
        "source": "Frederic Auguste Bartholdi, \"Liberty Enlightening the World\" (the Statue of Liberty), dedicated October 28, 1886, New York Harbor. National Park Service, Statue of Liberty National Monument.",
        "href": "https://www.nps.gov/stli/learn/historyculture/statue-statistics.htm",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a4.png",
          "alt": "Front view of the Statue of Liberty holding her torch aloft against a clear sky.",
          "credit": "Frederic Auguste Bartholdi's Statue of Liberty, front view. Wikimedia Commons (CC0 / public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Ford Madox Brown painted \"The Last of England\" in 1855, freezing a young couple on a ship's deck as the white cliffs recede and they sail toward an uncertain life abroad. Their grim, frightened faces capture the emigrant's gamble, leaving everything on the bet that another country will take them in. The public-charge rule taking effect September 18 speaks to the receiving end of that same voyage, where officers now weigh a family's likely poverty, their use of Medicaid, food aid, or housing assistance, before granting the green card that would let them stay. Brown's migrants are precisely the anxious, unmoneyed strangers such a test is built to scrutinize. The painting renders the human weight of migration that a bureaucratic \"likely to become a public charge\" finding reduces to a checkbox. It is a portrait of the stranger at the door, caught the moment before the door decides.",
        "excerpt": "In Ford Madox Brown's oval oil painting, a young husband and wife sit huddled on the deck of an emigrant ship, gripping hands beneath a wind-battered umbrella as the cliffs of Dover fade behind them. Their pale, set faces convey both resolve and dread at abandoning their homeland. Cabbages strung along the rail and a crowd of fellow travelers mark them as ordinary people staking everything on a distant shore.",
        "source": "Ford Madox Brown, \"The Last of England\" (1855), oil on panel, Birmingham Museum and Art Gallery.",
        "href": "https://commons.wikimedia.org/wiki/File:Ford_Madox_Brown_-_The_Last_of_England_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a5.png",
          "alt": "Ford Madox Brown's painting The Last of England, showing two emigrants huddled under an umbrella on a ship's deck.",
          "credit": "Ford Madox Brown, \"The Last of England\" (1855). Birmingham Museums Trust / Google Art Project via Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "white-house-teleprompter-bets",
    "headline": "Trump's teleprompter operator is placed on leave and probed by the CFTC over $100,000 in bets on the president's speeches",
    "overview": "Gabriel Perez, a technical assistant who has run President Trump's teleprompter since 2016, was placed on administrative leave amid a federal investigation into whether he used advance knowledge of Trump's remarks to win more than $100,000 on the prediction market Kalshi. Kalshi flagged suspicious trades on its \"Mentions\" market, where users bet on whether specific words or phrases appear in a speech, to the Commodity Futures Trading Commission, which found Perez had wagered on more than a dozen addresses over three months. The White House condemned the alleged conduct as \"a disgrace.\"",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPSThBSk1YZnFDUHFnS25LSFBYc1k5MkVsYTgwSnZlWjNLb0lkY3FwNjhJbDVBMVpiVWlvWFpxYnE3ZW9CbldmU3Z5eXhldEhBSzhUbjZnOU9WTjNrMGJOQUNfNE9Ham5ld0FONmkyeHZnaE1QUnd3YnpwcWlXRmJvS1RKVmp1SlAyRFd1Y0RfY0dTY2F6NkFUbHZVQ0NFUE5zMjVV?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxONGNvSTVFSlRPOGZURlozOWdsejNLd1Y3S2hWcFpEVnRCYm9WX2NKVko4elZkT3ZJME9MdU9BOFlGcVBIdWhHWDIzV2NLaFVWM3VBT3hfX2dKMTRWTkV4LWFGMEcxWUhhUlNVZlotU2lYdGpSbk90T1lGWVc2U3lnT3VRRHRveXZvNjNFcmFVOVpVek8wVklKdnVHQTZPR2FWbllVZHNYdEl6QmVhcW4xUjZ5aTJPaGFjV3RENTVB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/white-house-teleprompter-bets.png",
      "alt": "A teleprompter's angled glass panels stand before rows of empty seats.",
      "credit": "Wikimedia Commons"
    },
    "rank": 19,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "For centuries kings and commoners climbed to Delphi to buy a glimpse of words not yet spoken, and none is more famous than Croesus, who was promised that if he marched on Persia he would destroy a great empire, only to learn too late that the doomed empire was his own. The Pythia's power lay entirely in foreknowledge: she claimed to know what the future would say before any mortal could hear it. Gabriel Perez occupied a strangely similar seat. As the man who loaded the president's words into the teleprompter, he alone knew the exact phrases before they left Trump's mouth, and he turned that private oracle into cash on Kalshi. Where Croesus paid gold hoping to purchase certainty about words to come, Perez already possessed that certainty and simply sold it back to the betting market. The ancient warning that foreknowledge corrupts whoever wields it now reads like a CFTC indictment.",
        "excerpt": "They inquired thus, and the answers of both the Oracles agreed in one, declaring to Croesus that if he should march against the Persians he should destroy a great empire: and they counselled him to find out the most powerful of the Hellenes and join these with himself as friends.",
        "source": "Herodotus, The History of Herodotus, Book I, ch. 53, trans. G. C. Macaulay (London: Macmillan, 1890; public domain), via Project Gutenberg eBook #2707.",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a0.png",
          "alt": "The Pythia seated on a tripod amid rising vapours, delivering prophecy at Delphi, in John Collier's 1891 painting.",
          "credit": "John Collier, Priestess of Delphi (1891), Art Gallery of South Australia. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In the autumn of 1919 eight Chicago White Sox players agreed to throw the World Series in exchange for a reported $100,000, letting gamblers who knew the fix was in collect fortunes on the 'wrong' team. It was the ultimate insider bet: the outcome was not predicted but privately arranged, and the money flowed to those who possessed secret knowledge unavailable to the honest public. Perez's alleged scheme rhymes uncannily, down to the six-figure sum, roughly $100,000 said to have been won on Kalshi by a trusted insider trading on information no ordinary bettor could have. Like the ballplayers, he stood at the very center of the spectacle, entrusted to serve it faithfully, and instead quietly monetized his access. Baseball answered with lifetime bans and the enduring label 'Black Sox'; the White House has answered Perez with the word 'disgrace.' Both scandals turn on the same rot: when the people running the game start wagering on it, the whole spectacle is revealed as riggable.",
        "excerpt": "In September and October 1919, eight members of the Chicago White Sox conspired with professional gamblers to lose the World Series to the Cincinnati Reds in exchange for a payoff reported at $100,000. Those who knew the fix was in bet heavily on the underdog Reds and collected, while the betting public wagered blind. Baseball's new commissioner permanently banned all eight players, and the affair became the enduring symbol of a sport corrupted by insiders wagering on a result they secretly controlled.",
        "source": "Jacob Pomrenke, 'The Black Sox Scandal,' Society for American Baseball Research (SABR).",
        "href": "https://sabr.org/journal/article/the-black-sox-scandal/",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a1.png",
          "alt": "Team photograph of the 1919 Chicago White Sox, eight of whom conspired to throw the World Series.",
          "credit": "1919 Chicago White Sox team photograph. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The archetype of the trusted insider who sells his secret knowledge for money is Judas Iscariot, one of the twelve, who went to the chief priests and asked, 'What will ye give me, and I will deliver him unto you?', settling on thirty pieces of silver. Judas's value to the conspirators was precisely his inside access: he alone could tell them where and when, converting privileged proximity into a payout. Gabriel Perez, at Trump's side since 2016 and privy to every prepared line, likewise converted a position of trust into private profit, betting on words he was uniquely positioned to know. The betrayal in each case is not merely greed but the corruption of a servant who was supposed to be loyal. The thirty pieces of silver and the $100,000 on Kalshi are the same coin: the price of foreknowledge sold behind the principal's back.",
        "excerpt": "Then one of the twelve, called Judas Iscariot, went unto the chief priests, And said unto them, What will ye give me, and I will deliver him unto you? And they covenanted with him for thirty pieces of silver. And from that time he sought opportunity to betray him.",
        "source": "The Gospel According to St. Matthew 26:14-16, King James Version (1611; public domain).",
        "href": "https://biblehub.com/kjv/matthew/26.htm",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a2.png",
          "alt": "A tormented Judas kneels and flings the thirty pieces of silver at the priests' feet in Rembrandt's 1629 painting.",
          "credit": "Rembrandt, Judas Repentant, Returning the Pieces of Silver (1629). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "When the prophet Elisha refused all payment for healing Naaman, his servant Gehazi could not bear to let the silver go; he chased the departing Syrian, lied to obtain a talent of silver and two changes of garments, and hid the gain, until Elisha asked, 'Is it a time to receive money?' and struck him with leprosy white as snow. Gehazi is the trusted attendant who secretly cashes in on his master's work, exactly the charge now leveled at Perez, accused of quietly enriching himself off the president he was employed to serve. Both men exploited a position of intimate access that was never theirs to sell. Both concealed the transaction and offered a false account when confronted. The story's verdict, that such greed marks a servant permanently, anticipates the White House calling Perez's alleged betting 'a disgrace.'",
        "excerpt": "And he said unto him, Went not mine heart with thee, when the man turned again from his chariot to meet thee? Is it a time to receive money, and to receive garments, and oliveyards, and vineyards, and sheep, and oxen, and menservants, and maidservants? The leprosy therefore of Naaman shall cleave unto thee, and unto thy seed for ever. And he went out from his presence a leper as white as snow.",
        "source": "The Second Book of the Kings 5:26-27, King James Version (1611; public domain).",
        "href": "https://biblehub.com/kjv/2_kings/5.htm",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a3.png",
          "alt": "The prophet Elisha raises his hand to refuse the gifts offered by the cured Syrian commander Naaman.",
          "credit": "Pieter de Grebber, Elisha Refuses the Gifts of Naaman (1637), Frans Hals Museum, Haarlem. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Around 1595 Caravaggio painted 'The Cardsharps,' in which an innocent youth studies his hand while two cheats coordinate to rob him blind, one flashing a signal with gloved fingers, the other palming a hidden card behind his back. The whole drama depends on secret information: the sharps know what will happen, the mark does not, and the money moves accordingly. That is precisely the structure of a prediction market corrupted by an insider. Kalshi's other bettors were the guileless youth, wagering on which words Trump might say; Perez, allegedly holding the prepared script, was the sharper who already knew. Caravaggio grasped that cheating is less about luck than about the private possession of knowledge others lack, the same edge a teleprompter operator holds over the honest crowd. Painted more than four centuries ago, it could serve as the illustration for the CFTC's complaint.",
        "excerpt": "Caravaggio's canvas shows a fresh-faced young player absorbed in his cards while two sharpers fleece him: an older accomplice peers over his shoulder and signals with gloved fingers, and the youth at right hides an extra card behind his back. The dupe plays honestly, unaware that his opponents hold secret knowledge that guarantees the result. The painting is a portrait of exactly the asymmetry at the heart of the Perez case, in which the game only looks fair to the one who does not know the cards are marked.",
        "source": "Caravaggio (Michelangelo Merisi), The Cardsharps (I Bari), c. 1595, oil on canvas, Kimbell Art Museum, Fort Worth.",
        "href": "https://en.wikipedia.org/wiki/The_Cardsharps",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a4.png",
          "alt": "A young dupe studies his cards while an older cheat signals and a youth pulls a hidden card from behind his back.",
          "credit": "Caravaggio, The Cardsharps (c. 1595), Kimbell Art Museum, Fort Worth. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In Georges de La Tour's 'The Cheat with the Ace of Clubs,' a richly dressed dupe is quietly relieved of his fortune while a cardsharp slides a concealed ace from behind his belt, exchanging knowing glances with a courtesan and a maid who are in on the scheme. Everyone at the table shares the secret except the young victim, whose downcast eyes fix on his cards while the trap closes. La Tour stages deception as a conspiracy of the informed against the uninformed, a silent cabal profiting from what only they know. Gabriel Perez, entrusted with the president's unspoken words, is cast in the cheat's role: the calm insider who holds the winning card out of sight and lets the market pay him for certainty disguised as a wager. The painting's cool theatricality mirrors the quiet audacity of betting six figures on speeches one has already read. It is a moral emblem for an age of prediction markets, where the house of chance is only chance for those kept in the dark.",
        "excerpt": "La Tour depicts a lavishly dressed young gambler being cheated at cards: the sharp at left draws a hidden ace of clubs from behind his belt, while a scheming woman and a serving maid trade glances that show they are part of the plot. Only the wealthy dupe is ignorant of the arrangement. The scene renders cheating as a shared secret held by everyone but the victim, the informed silently harvesting the winnings from the one who plays in good faith.",
        "source": "Georges de La Tour, The Cheat with the Ace of Clubs, c. 1630-34, oil on canvas, Kimbell Art Museum, Fort Worth.",
        "href": "https://commons.wikimedia.org/wiki/File:Georges_de_La_Tour_-_The_Cheat_with_the_Ace_of_Clubs_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a5.png",
          "alt": "A cardsharp draws a hidden ace from his belt as two women exchange knowing glances and a young dupe studies his hand.",
          "credit": "Georges de La Tour, The Cheat with the Ace of Clubs (c. 1630-34), Kimbell Art Museum, Fort Worth. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "world-ai-cooperation-organization",
    "headline": "Twenty-nine countries sign an agreement to create a China-backed World AI Cooperation Organization based in Shanghai",
    "overview": "Representatives of 29 nations, including Russia, Belarus, Serbia, Cuba, Brazil and Venezuela along with a bloc of African and Asian states, signed an agreement in Shanghai on Thursday to establish the World AI Cooperation Organization, an intergovernmental body headquartered in the city that China says will promote global governance of artificial intelligence. The signing came on the eve of the World Artificial Intelligence Conference, where President Xi Jinping is expected to lay out Beijing's vision for AI as a tool of Chinese diplomacy. The United States and most of its closest allies were absent from the founding roster.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPTGF5ME1YRmJSTE42TWVWMDUyc1NkMlA2QVQxVlN6dkZuenF4RFcxSFlhUXk3eVZnUWZ3SzdZTDEzbTNVZzJ0NUhadERqUHQ1WmtvSl9aXzE1Qlh3UFdvR3ZXUmJDXzhycGJ0cUdtdXFVUFpzaTNWX3VBemlqUXh3UF95R2k5RTJKbjZFZ09MS3h0TUlnZ3FRMlN2T3lIc19qNGxLcmY1eTJwQVMyb2ZfNk03YjdST2hKRkg1TFFn?oc=5"
      },
      {
        "name": "Xinhua",
        "href": "https://english.news.cn/20260716/2fb3c068a5ec4efbbeb6a88acf155175/c.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/world-ai-cooperation-organization.png",
      "alt": "The Shanghai skyline at dusk, home to the new World AI Cooperation Organization.",
      "credit": "CNBC Africa"
    },
    "rank": 20,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before modern treaties, the Greek city-states bound themselves together in the Amphictyonic League, a standing council of nations that met around the sacred shrine at Delphi to deliberate common affairs and jointly guard the temple's treasure. The World AI Cooperation Organization founded in Shanghai reaches for the same ancient template: a common council of assembled states, gathered around a shared object of reverence, that claims the authority to administer something too valuable and too dangerous to be left to any single hand. Where the Amphictyons pooled votes and offerings under a religious canopy, the twenty-nine signatories pool sovereignty over artificial intelligence under Beijing's convening power. The shrine at Delphi was never neutral ground for long, and the states that hosted or dominated the council reliably bent it to their advantage. That is the quiet warning the analogy carries as China invites the world to worship at a temple it has built and located in its own city.",
        "excerpt": "And indeed the Amphictyonic League was organised from the latter, both to deliberate concerning common affairs and to keep the superintendence of the temple more in common, because much money and many votive offerings were deposited there, requiring great vigilance and holiness.",
        "source": "Strabo, Geography, Book IX, Chapter 3, Section 7, trans. H. L. Jones, Loeb Classical Library.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/9C*.html",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a0.png",
          "alt": "The standing columns of the ruined Temple of Apollo at Delphi, ancient meeting place of the Amphictyonic League.",
          "credit": "Temple of Apollo at Delphi, photograph via Wikimedia Commons (CC BY-SA)."
        }
      },
      {
        "category": "historical",
        "title": "In 1919 the victorious powers wrote a Covenant to found the League of Nations, the first attempt to house permanent global governance inside a single chartered institution, complete with a seat, a membership roll, and a lofty pledge to promote international co-operation. The parallel to the Shanghai-based World AI Cooperation Organization is almost structural: a founding document, a headquarters city, a roster of signatory states, and grand language about collective security recast for the age of algorithms rather than armies. The League's most famous flaw is also the sharpest echo here, for the United States, whose president had championed the idea, never joined, leaving the body lopsided from birth. Today it is again Washington and its closest allies who stand outside the door while a rival architect assembles the members within. The Covenant reminds us that an international order is only as universal as its absences allow, and a governance body missing the field's leading power governs in name more than in fact.",
        "excerpt": "THE HIGH CONTRACTING PARTIES, In order to promote international co-operation and to achieve international peace and security by the acceptance of obligations not to resort to war, by the prescription of open, just and honourable relations between nations, by the firm establishment of the understandings of international law as the actual rule of conduct among Governments, and by the maintenance of justice and a scrupulous respect for all treaty obligations in the dealings of organised peoples with one another, Agree to this Covenant of the League of Nations.",
        "source": "The Covenant of the League of Nations (1919), Preamble. The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/20th_century/leagcov.asp",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a1.png",
          "alt": "William Orpen's painting of diplomats gathered to sign the Treaty of Versailles in the Hall of Mirrors, 1919, which established the League of Nations Covenant.",
          "credit": "William Orpen, 'The Signing of Peace in the Hall of Mirrors, Versailles, 28th June 1919' (1919), via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The story of Babel is scripture's oldest parable of humanity uniting across nations to build a single mighty work that would make it a name and pierce the heavens. The World AI Cooperation Organization is a Babel-like ambition inverted and re-tooled, a coalition of tongues assembling not brick and mortar but a shared apparatus of governance over a technology whose builders openly speak of reaching superhuman heights. The passage's tension between one people speaking one language and the fear of what such unity might accomplish reads uncannily onto a summit where Xi frames a unifying AI order as diplomacy. Babel's ending, a scattering and a confounding of speech, hangs over any project that presumes the world can be gathered under one tower and one authority. It asks whether this new organization is a true convergence of nations or a monument that will fracture along the very lines of language and power it seeks to transcend.",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth. And the LORD came down to see the city and the tower, which the children of men builded. And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do. Go to, let us go down, and there confound their language, that they may not understand one another's speech.",
        "source": "The Holy Bible, King James Version, Genesis 11:4-7. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/10/10-h/10-h.htm",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a2.png",
          "alt": "Pieter Bruegel the Elder's painting of the Tower of Babel, a vast spiralling structure under construction toward the clouds.",
          "credit": "Pieter Bruegel the Elder, 'The Tower of Babel' (1563), Kunsthistorisches Museum Vienna, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Thucydides recorded how the Greek allies, out of shared fear and shared purpose, freely handed leadership to Athens, which then fixed the contributions, appointed the treasurers, and set the common treasury on the sacred island of Delos where the congresses met. It is the classic account of a voluntary alliance that hardened into an empire, the founding partners gradually discovering that the convening power had become the master. The World AI Cooperation Organization, launched by consenting signatories under Chinese sponsorship with its treasury of authority housed in Shanghai, invites exactly this reading. What begins as pooled deliberation among independent states can, as Thucydides warns, drift toward the dominance of the one power that holds the meeting place and writes the rules. The excerpt is a mirror held up to any coalition that lets a single convener collect the dues and keep the books.",
        "excerpt": "The Athenians, having thus succeeded to the supremacy by the voluntary act of the allies through their hatred of Pausanias, fixed which cities were to contribute money against the barbarian, which ships; their professed object being to retaliate for their sufferings by ravaging the King's country. Now was the time that the office of \"Treasurers for Hellas\" was first instituted by the Athenians. These officers received the tribute, as the money contributed was called. The tribute was first fixed at four hundred and sixty talents. The common treasury was at Delos, and the congresses were held in the temple.",
        "source": "Thucydides, History of the Peloponnesian War, Book I, Ch. 96, trans. Richard Crawley. Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a3.png",
          "alt": "Marble bust of the ancient Greek historian Thucydides, who chronicled how the Delian League became an Athenian empire.",
          "credit": "Bust of Thucydides, Royal Ontario Museum, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Baptiste Isabey's celebrated group portrait of the Congress of Vienna shows the statesmen of Europe assembled in a single chamber in 1815 to redraw the map and set the terms of a new international order after an era of upheaval. The image is the visual archetype of what the Shanghai signing aspires to be: a room of plenipotentiaries convened by the great powers of the moment to codify who governs what in the world to come. Yet Vienna was also a masters' bargain, an order dictated by the strongest few and dressed as a concert of nations, which is precisely the charge critics level at a China-led AI body from which the United States and its allies are absent. The painting captures both the grandeur and the exclusivity of such congresses, the sense that history's furniture is being rearranged by those who happen to hold the room. It stands as a portrait of order-making itself, and of the quiet question of whose order is being made.",
        "excerpt": "This engraving after Jean-Baptiste Isabey depicts the assembled diplomats of the Congress of Vienna in 1815, the plenipotentiaries of the great powers gathered to settle the shape of post-Napoleonic Europe. Figures such as Metternich, Wellington, and Talleyrand stand and confer around a document-strewn table, an enduring emblem of a world order negotiated by a convening few. It is the canonical image of a congress of nations redrawing the rules of the age.",
        "source": "Congress of Vienna, engraving after Jean-Baptiste Isabey (c. 1819). Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Congress_of_Vienna.PNG",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a4.png",
          "alt": "Engraving after Jean-Baptiste Isabey showing the statesmen of Europe assembled at the Congress of Vienna in 1815.",
          "credit": "After Jean-Baptiste Isabey, 'Congress of Vienna' (c. 1819), via Wikimedia Commons (CC BY-SA 3.0)."
        }
      },
      {
        "category": "artistic",
        "title": "Rubens painted this allegory, known as Peace and War, as a diplomatic gift to persuade a king toward reconciliation, showing Minerva, goddess of wisdom, physically holding back armored Mars so that the abundance of peace can flow to a huddle of children. It is an artwork made as an instrument of statecraft, arguing that only vigilant wisdom can restrain destructive force long enough for common prosperity to take root. That is exactly the promise the World AI Cooperation Organization drapes over itself: an assembly of nations claiming to marshal collective wisdom to govern a technology that could enrich or endanger all humanity. The painting's beauty is also its rhetoric, and its purpose reminds us that images and institutions of concord are often themselves moves in a contest for advantage. Whether Shanghai's new body shelters the world's future or merely dresses a bid for primacy is the very ambiguity Rubens's allegory embodies.",
        "excerpt": "In Rubens's allegory 'Minerva Protects Pax from Mars,' the helmeted goddess of wisdom pushes back the war-god Mars while Peace, a nursing figure, showers wealth upon a cluster of children under her care. Painted around 1629-30 as a gift tied to Rubens's own peace diplomacy, it argues that only wisdom's restraint of violence allows shared abundance to flourish. It is a masterwork in which art is openly enlisted in the cause of international concord.",
        "source": "Peter Paul Rubens, Minerva Protects Pax from Mars ('Peace and War'), c. 1629-30, The National Gallery, London. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_(1577-1640)_Peace_and_War_(1629).jpg",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a5.png",
          "alt": "Rubens's allegory Peace and War, with the goddess Minerva restraining Mars while Peace pours riches over children.",
          "credit": "Peter Paul Rubens, 'Minerva Protects Pax from Mars (Peace and War)', c. 1629-30, National Gallery London, via Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "ai-chatbots-censorship-study",
    "headline": "A Meta Oversight Board study finds leading AI chatbots more willing to criticize democratic leaders than authoritarian ones",
    "overview": "A study released Thursday by Meta's Oversight Board found that ten leading large language models, including systems from Meta, OpenAI and Anthropic, were markedly more likely to criticize democratic leaders than authoritarian rulers, raising fears the technology is quietly extending state censorship across borders. In tests, models that would readily mock President Trump or Britain's King Charles III often declined to do the same for the leaders of China, Saudi Arabia or Thailand. The board warned developers risk building \"AI infrastructure that... has the effect of extending illegitimate restrictions on freedom of expression globally.\"",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNS3JjU0pFR29uUnJyY09HcDVOMktVbzRDQlFXTmJBcWo0SThRVFBvMURqUkZtMmtFUFI2M3ZfSWVuaG12YTB0eE1Cc2JpajNQTjA4bV9nUW1iZzE5SjZ6Zng1Qzk4RjlOanVSLWItd0RDM0hwRng5WFZTdUdJcEZ4cXBjQ3NHOTBZdlRnUTVmVE5fXzljMkQ5UE52Z1FkTXVSWldZelRRcXZ4SktDU3VXaHJaeDFLR2NjbXc?oc=5"
      },
      {
        "name": "Euronews",
        "href": "https://www.euronews.com/next/2026/07/16/ai-chatbots-more-likely-to-criticise-western-leaders-than-authoritarian-ones-study-finds"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/ai-chatbots-censorship-study.png",
      "alt": "A printed page with lines heavily blacked out, symbolizing restricted speech.",
      "credit": "Euronews"
    },
    "rank": 21,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 213 BCE the chancellor Li Si persuaded China's first emperor, Qin Shi Huang, that privately held books let scholars \"use the past to disparage the present,\" and so ordered the histories of the rival states and the writings of the hundred schools consigned to the flames. The logic was that a unified realm required a single sanctioned memory, and that criticism of the throne was best prevented by destroying the very texts that made criticism thinkable. The Meta Oversight Board's finding echoes that ancient calculus in a modern key: today's leading chatbots do not burn books, but by refusing to criticize authoritarian rulers while freely mocking democratic ones, they quietly narrow what may be said about the powerful. Where Qin's fire left visible ash, the machine's reticence leaves no trace at all, only an absence where a criticism might have been. Both regimes grasp the same principle, that whoever controls the record of the past and the speech of the present controls who may be questioned.",
        "excerpt": "In his memorial of 213 BCE, recorded more than a century later by the historian Sima Qian, Chancellor Li Si urged the First Emperor to burn the poetry, the histories of the former kings, and the writings of the hundred schools of philosophy, sparing only manuals of medicine, divination, and agriculture. His stated aim was to silence scholars who \"use the past to disparage the present\" and who cited the words of former kings to condemn the emperor's policies. Anyone who dared to discuss the banned classics was to be executed, and their family punished alongside them.",
        "source": "Sima Qian (Ssu-ma Ch'ien), Records of the Grand Historian (Shiji), Basic Annals of the First Emperor of Qin; memorial of Chancellor Li Si, 213 BCE. Primary-source document, Asia for Educators, Columbia University.",
        "href": "https://afe.easia.columbia.edu/ps/cup/lisi_legalist_memorials.pdf",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a0.png",
          "alt": "Historical Chinese depiction of the Qin dynasty burning of books and burying of scholars, with texts thrown onto a fire and scholars led away.",
          "credit": "Traditional Chinese depiction of the 'burning of the books and burying of the scholars' (焚書坑儒); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 22 June 1633 Galileo Galilei knelt before the Roman Inquisition and, under threat of torture, abjured the truth he had confirmed through his telescope, that the Earth moves around the Sun. The Church did not need to refute him; it needed only to make him recant, and to make his recantation a warning to everyone else. The Oversight Board study describes a subtler version of the same discipline: chatbots that will gladly interrogate a King Charles or a Donald Trump grow cautious and evasive when the subject is a strongman who punishes dissent. Fear, whether of an inquisitor's instruments or a foreign government's ban, teaches the same lesson, that some truths are safest left unspoken in the presence of the powerful. Galileo is said to have murmured 'and yet it moves' under his breath as he rose; the danger now is a technology so trained to please authority that it will not even murmur.",
        "excerpt": "I abjure with sincere heart and unfeigned faith, I curse and detest the said errors and heresies, and generally all and every error and sect contrary to the Holy Catholic Church.",
        "source": "\"The Crime of Galileo: Indictment and Abjuration of 1633,\" in the Internet Modern History Sourcebook, ed. Paul Halsall, Fordham University.",
        "href": "https://sourcebooks.fordham.edu/mod/1630galileo.asp",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a1.png",
          "alt": "Cristiano Banti's 1857 painting of Galileo standing before the black-robed tribunal of the Roman Inquisition.",
          "credit": "Cristiano Banti, 'Galileo Facing the Roman Inquisition' (1857); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "John Milton wrote Areopagitica in 1644 to protest Parliament's demand that every book be licensed before it could be printed, arguing that pre-publication censorship strangles truth in its cradle. To destroy a good book, he insisted, is to kill reason itself, 'the image of God, as it were in the eye.' The Oversight Board's findings reveal a form of censorship Milton could not have imagined: not a licenser stamping approval on a finished manuscript, but a machine that quietly declines to generate certain criticisms in the first place, so that the forbidden thought is never even composed. His fear was suppression after writing; ours is suppression before writing, an editorial hand hidden inside the tool itself. Where Milton demanded the liberty to know, to utter, and to argue freely according to conscience, the chatbot's uneven willingness to criticize rations that liberty according to who holds power.",
        "excerpt": "For books are not absolutely dead things, but do contain a potency of life in them to be as active as that soul was whose progeny they are; nay, they do preserve as in a vial the purest efficacy and extraction of that living intellect that bred them. … as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica: A Speech of Mr. John Milton for the Liberty of Unlicensed Printing, to the Parliament of England (London, 1644); Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a2.png",
          "alt": "The 1644 printed title page of John Milton's Areopagitica.",
          "credit": "Title page of the first edition of Milton's Areopagitica (1644); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Hans Christian Andersen's 1837 tale, an entire court and city praise the emperor's magnificent new clothes, each courtier too frightened of seeming unfit for his post to admit that the emperor is in fact wearing nothing at all. Only a small child, innocent of the incentives that muzzle everyone else, blurts out the obvious truth. The Oversight Board study casts today's chatbots as the flattering courtiers rather than the child: quick to note the flaws of leaders who cannot punish them, yet suddenly tongue-tied before rulers who can. The tale's moral is that truth-telling requires someone with nothing to lose, and an AI trained to avoid offending powerful states has been given a great deal to lose. The question the study raises is whether these systems will ever play the child in the crowd, or only add one more voice whispering that the robes are beautiful.",
        "excerpt": "\"But the Emperor has nothing at all on!\" said a little child.\n\n\"Listen to the voice of innocence!\" exclaimed his father; and what the child had said was whispered from one to another.\n\n\"But he has nothing at all on!\" at last cried out all the people.",
        "source": "Hans Christian Andersen, \"The Emperor's New Suit\" (1837), in Andersen's Fairy Tales, trans. H. P. Paull; Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/files/1597/1597-h/1597-h.htm",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a3.png",
          "alt": "Vilhelm Pedersen's 19th-century illustration of the naked emperor parading beneath a canopy while attendants pretend to carry his invisible train.",
          "credit": "Vilhelm Pedersen, illustration for 'Kejserens nye klæder' (The Emperor's New Clothes); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Goya's etching, plate 43 of Los Caprichos, shows a sleeping artist beset by a swarm of owls and bats, while the inscription on the desk warns that the sleep of reason produces monsters. Created as Goya navigated the Spanish Inquisition's own censorship, it is an image about what fills the mind when critical thought is suspended or forbidden. The Oversight Board's findings suggest a modern sleep of reason: when a chatbot withholds criticism of authoritarian leaders, it lulls its users toward a distorted picture of the world, one in which tyrants are conspicuously spared the scrutiny that falls on democrats. The monsters here are not fantastical but statistical, patterns of silence learned from a fear of offending the powerful. Goya's sleeper cannot see what gathers around him; neither can a user who mistakes an AI's selective reticence for balance.",
        "excerpt": "El sueño de la razon produce monstruos. (The sleep of reason produces monsters.)",
        "source": "Francisco de Goya, El sueño de la razón produce monstruos (The Sleep of Reason Produces Monsters), plate 43 of Los Caprichos, etching and aquatint, 1799. Museo Nacional del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:Museo_del_Prado_-_Goya_-_Caprichos_-_No._43_-_El_sue%C3%B1o_de_la_razon_produce_monstruos.jpg",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a4.png",
          "alt": "Goya's etching of a man asleep at his desk as owls and bats swarm out of the darkness behind him.",
          "credit": "Francisco de Goya, 'El sueño de la razón produce monstruos', Los Caprichos no. 43 (1799), Museo del Prado; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier's 1834 lithograph 'Ne vous y frottez pas!!' — 'Don't Meddle With It!!' — depicts a defiant printer with sleeves rolled and fists raised, guarding the liberty of the press against a French government determined to gag its critics; Daumier himself had been jailed for caricaturing the king. The censorship laws that soon crushed the satirical press punished precisely the mockery of the mighty that the Oversight Board found today's chatbots reluctant to perform. Daumier's printer stands his ground; the modern worry is a technology that has quietly agreed not to fight at all, declining to lampoon authoritarian rulers as readily as it lampoons elected ones. Lèse-majesté, the crime of insulting a monarch, was Daumier's constant peril and is now, in effect, re-encoded as caution in systems that must serve markets where such insults remain illegal. His raised fists pose the very question the study forces on us: who is still willing to meddle with power?",
        "excerpt": "Ne vous y frottez pas!! (Don't meddle with it!!)",
        "source": "Honoré Daumier, Ne vous y frottez pas!! (Don't Meddle With It!!), lithograph, L'Association mensuelle, plate 20, March 1834. National Gallery of Art, Washington.",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Ne_vous_y_frottez_pas!!,_1834,_NGA_6131.jpg",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a5.png",
          "alt": "Daumier's lithograph of a defiant printer standing with fists raised to defend the freedom of the press, a fallen figure behind him.",
          "credit": "Honoré Daumier, 'Ne vous y frottez pas!!' (1834), National Gallery of Art; public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "ai-stocks-global-selloff",
    "headline": "A slump in AI and chip stocks drags down markets worldwide, with South Korea's Kospi falling 6.4%",
    "overview": "Shares of the chipmakers and other winners of the artificial-intelligence boom tumbled on Thursday, pulling markets lower around the world; Nvidia, the world's most valuable company, fell about 4%, while Arm, Micron, AMD and Broadcom each dropped more than 5%. In Asia the sell-off was sharper, dragging South Korea's Kospi down 6.4% as Samsung Electronics and SK Hynix slid. Investors were rattled by doubts over the soaring cost of AI computing after Nvidia's chief executive suggested it could climb toward $100 billion per gigawatt.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxNSmJlT2oxT2ZMTTVULXNjOGZQbGYzaTVidG9wc0ZvcnZTdVFVN25BcVkxdHpTRTB0X3RIV2MzcGlHRW1TeHpkWmE3MXE2Wm1kRUNBU0x6ZlJrSU1WQjhGelJldGJiUEhhNXBrN19sdDlJSFVfanJlLVlQQXJrdV8tZEk0bklud3dxRnZXcjk2MXR2eFA5Y1pZ?oc=5"
      },
      {
        "name": "The Washington Times",
        "href": "https://www.washingtontimes.com/news/2026/jul/16/ai-stocks-slumping-oil-prices-keep-rising/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/ai-stocks-global-selloff.png",
      "alt": "Electronic boards on a stock exchange show sharply falling share prices.",
      "credit": "NBC News"
    },
    "rank": 22,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When AI and chip stocks cratered on Thursday, 16 July 2026 - Nvidia down 4 percent, Arm, Micron, AMD and Broadcom off more than 5, and South Korea's Kospi collapsing 6.4 percent - traders were re-enacting a script written in Holland almost four centuries earlier. In the Dutch tulip mania of the 1630s, a single flower bulb could change hands for the price of a canal-side house, and the whole nation, in Mackay's phrase, 'even to its lowest dregs, embarked in the tulip trade.' What finally broke it was not a bad harvest but a thought: the dawning suspicion that somebody, in the end, must lose fearfully. Today that thought wears a price tag - roughly 100 billion dollars for every gigawatt of AI computing - and the question of who ultimately pays for it is exactly the doubt that sent semiconductors tumbling. The tulip fields teach the oldest lesson on the exchange: prices climb on the belief that a greater fool will always appear, and they fall the instant the crowd wonders whether it has become that fool. Confidence, once destroyed, does not rise again on command.",
        "excerpt": "At last, however, the more prudent began to see that this folly could not last for ever. Rich people no longer bought the flowers to keep them in their gardens, but to sell them again at cent. per cent. profit. It was seen that somebody must lose fearfully in the end. As this conviction spread, prices fell, and never rose again. Confidence was destroyed, and a universal panic seized upon the dealers.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Volume 1, chapter 'The Tulipomania' (London: Richard Bentley, 1841).",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a0.png",
          "alt": "Anonymous 17th-century watercolour of the striped 'Semper Augustus' tulip, the most expensive bulb of the Dutch tulip mania.",
          "credit": "Anonymous 17th-century watercolour, 'Semper Augustus' tulip (before 1640). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The other end of the market's memory reaches to Wall Street in October 1929, and Thursday's rout on the AI and chip names rhymes with it uncomfortably. Through the late 1920s a new technology - radio, autos, electrification - had produced a class of glamour stocks that seemed to defy gravity, much as Nvidia, Broadcom and the Kospi's chipmakers have in the age of artificial intelligence. Then, over a few catastrophic sessions, the marvels that had made fortunes destroyed them just as quickly, and a solemn crowd gathered outside the New York Stock Exchange to watch their paper wealth evaporate. The parallel that matters is not the size of the fall but its psychology: euphoria curdling into panic once investors began to doubt that earnings could ever justify the prices. Today's fear is specifically about cost - the staggering capital that AI's compute buildout demands - and about whether the revenue will ever arrive to pay for it. 1929 is the reminder that a boom's brightest darlings are precisely the ones with the furthest to fall.",
        "excerpt": "In the autumn of 1929 the great bull market in American stocks broke apart. After years in which technology-driven glamour shares had seemed unstoppable, prices collapsed across Black Thursday, 24 October, and Black Tuesday, 29 October, wiping out billions in paper wealth within days. Panicked crowds gathered on Wall Street as the certainties of the boom dissolved into fear, and the crash became the overture to the Great Depression.",
        "source": "Harold Bierman Jr. and the Federal Reserve, 'Stock Market Crash of 1929,' Federal Reserve History (Federal Reserve Bank of St. Louis / Board of Governors).",
        "href": "https://www.federalreservehistory.org/essays/stock-market-crash-of-1929",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a1.png",
          "alt": "A solemn crowd gathers on the street outside the New York Stock Exchange during the Wall Street crash of October 1929.",
          "credit": "'Crowd outside the New York Stock Exchange after the crash,' 29 October 1929. U.S. Government photograph, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Long before ticker tapes, the book of Proverbs had already named the vertigo that seized the chip market on Thursday. 'Riches certainly make themselves wings; they fly away as an eagle toward heaven' - a line that reads like a caption for a day when Nvidia shed 4 percent, its suppliers more than 5, and the Kospi 6.4 percent in a single session. The ancient warning is aimed exactly at the speculator's error: setting one's eyes 'upon that which is not,' treating an inflated valuation as though it were solid ground. For a year the AI trade felt like settled wealth; on Thursday it revealed itself as a bird already testing its wings. The proverb does not condemn industry, only the fever to be rich in a hurry, which is the very engine of every mania from tulips to transistors. When fortunes can be made and unmade overnight, this is the oldest fine print in the world.",
        "excerpt": "Labour not to be rich: cease from thine own wisdom. Wilt thou set thine eyes upon that which is not? for riches certainly make themselves wings; they fly away as an eagle toward heaven.",
        "source": "The Holy Bible, King James Version, Proverbs 23:4-5 (1611).",
        "href": "https://www.biblegateway.com/passage/?search=Proverbs%2023%3A4-5&version=KJV",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a2.png",
          "alt": "Rembrandt's painting of an old man counting coins by candlelight, illustrating the biblical parable of the rich fool.",
          "credit": "Rembrandt van Rijn, 'The Parable of the Rich Fool' (1627), Gemaldegalerie, Berlin. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ecclesiastes supplies the second scripture the market seemed to be reading aloud on Thursday: 'He that loveth silver shall not be satisfied with silver.' The AI boom has been the purest modern expression of that insatiability - each record valuation only stoking appetite for the next, until the cost of the compute needed to feed the machines, some 100 billion dollars per gigawatt, began to look like an abundance no revenue could satisfy. The Preacher's point is that accumulation past a certain scale delivers nothing but the beholding of it 'with their eyes,' which is a fair description of holdings that exist mainly as numbers on a screen. When those numbers fell 5 and 6 percent across the chip complex, investors were reminded that goods which merely multiply attract only more mouths to consume them. Vanity, in the biblical sense, is not sinfulness but emptiness - value that vanishes when you reach for it. That emptiness is precisely what a bursting bubble exposes.",
        "excerpt": "He that loveth silver shall not be satisfied with silver; nor he that loveth abundance with increase: this is also vanity. When goods increase, they are increased that eat them: and what good is there to the owners thereof, saving the beholding of them with their eyes?",
        "source": "The Holy Bible, King James Version, Ecclesiastes 5:10-11 (1611).",
        "href": "https://www.biblegateway.com/passage/?search=Ecclesiastes%205%3A10-11&version=KJV",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a3.png",
          "alt": "A Dutch vanitas still life by Pieter Claesz with a skull, an overturned glass and a timepiece, symbolising the emptiness of worldly riches.",
          "credit": "Pieter Claesz, 'Vanitas Still Life' (1632), Mauritshuis, The Hague. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "William Hogarth engraved the definitive picture of a market losing its mind in 1721, in the wake of Britain's South Sea Bubble, and it hangs over Thursday's sell-off like a diagnosis. His crowded scene shows Londoners riding a carousel of speculation while Fortune is butchered and hacked apart and Honesty is broken on a wheel - the moral chaos left when a euphoric public discovers its treasured shares are worth a fraction of the price it paid. Swap South Sea stock for AI and chip equities and the composition barely needs editing: the same manic crowd, the same darlings suddenly plunging, the same fortunes vanishing between one session and the next as the Kospi drops 6.4 percent. Hogarth's genius was to see speculation as a moral spectacle rather than a mere financial event - a fairground of credulity spinning until it throws its riders off. The soaring cost of feeding the AI machine is this decade's South Sea promise: a dazzling story that markets may have priced far ahead of what it can deliver. What the engraving warns is that when the machine stops, it is the crowd, not the schemers, who are broken on the wheel.",
        "excerpt": "Hogarth's crowded emblematic engraving satirises the speculative frenzy of the 1720 South Sea Bubble. A giant merry-go-round of investors whirls at its centre while a figure of Fortune is dismembered, Honesty is broken on the wheel, and a scene of greed, folly and ruin unfolds around a monument blaming the disaster on the madness of the town. It is often called the first editorial cartoon, turning financial mania into a moral tableau.",
        "source": "William Hogarth, 'The South Sea Scheme' (Emblematical Print on the South Sea Scheme), engraving, designed 1721, published 1724.",
        "href": "https://en.wikipedia.org/wiki/Emblematical_Print_on_the_South_Sea_Scheme",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a4.png",
          "alt": "William Hogarth's engraving 'The South Sea Scheme', depicting a chaotic crowd of speculators around a giant merry-go-round during the 1720 South Sea Bubble.",
          "credit": "William Hogarth, 'The South Sea Scheme' (1721). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jan Brueghel the Younger painted the cruellest joke about a bubble around 1640, and it lands squarely on Thursday's chip rout. In his 'Satire on Tulip Mania' the speculators of the Dutch flower craze are all monkeys - weighing bulbs, counting coins, feasting, drawing up contracts, and finally, in one corner, urinating on the worthless flowers as a fellow ape is carried to the grave. Brueghel's verdict is merciless: a mania turns clever men into aping imitators of one another, each buying only because the others are buying. Replace the tulips with GPUs and the AI trade and the menagerie looks unnervingly current, a crowd of investors chasing marvels priced far beyond reason until the day the flowers wilt. When Nvidia and its peers dropped 4 to 6 percent and the Kospi fell 6.4, the monkeys were, so to speak, discovering the smell of their bargain. The painting's enduring sting is that the madness is always obvious - but only in hindsight, and only once the deed of purchase has become worthless paper.",
        "excerpt": "Painted around 1640, just after the Dutch tulip market collapsed, Brueghel's satire recasts the speculators as foolish monkeys in fine dress. The apes inspect bulbs, weigh them, count money, sign contracts and squabble, while one urinates on the now-worthless flowers and another is carried off to a grave - a mocking allegory of a mania that ruined those who chased it. The comedy is pointed: greed had made men behave like aping imitators of one another.",
        "source": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (Allegory of the Tulipomania), oil on panel, c. 1640, Frans Hals Museum, Haarlem.",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a5.png",
          "alt": "Jan Brueghel the Younger's satirical painting depicting tulip-mania speculators as monkeys trading, weighing and squandering tulip bulbs.",
          "credit": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (c. 1640), Frans Hals Museum, Haarlem. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "netflix-forecast-shares-tumble",
    "headline": "Netflix shares tumble after a soft revenue forecast, despite second-quarter results in line with estimates",
    "overview": "Netflix shares fell more than 7% in after-hours trading on Thursday after the company issued a third-quarter revenue forecast below Wall Street expectations, overshadowing second-quarter results that were roughly in line with estimates on the back of membership growth, higher prices and rising ad revenue. The streaming giant guided to about $12.86 billion in current-quarter revenue against the roughly $13 billion analysts had expected. The stock has now shed close to 45% from its all-time high, erasing hundreds of billions of dollars in market value.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxPaElBaG14Wm9OcTNhcTdGWVdBUWRnN0NqY2pBOUhkajZ0V3Jnb2FsbkUyd3J5bUY2TG9kM2gzanFkODEtdVZpR3UxZmNyeU9VYjBwTGtzd0c0R0Y0ZEpqd0k5WEtnRWpCT3pEaURUNzFmZmt2bDVyQUsxX2poOVFiVFg2OG9wQzR1bDBUQ3lNMDZ1SUJNenBOQmdod1N0LVpJM3RodzhKelhDTXVtTVJfM2dldmZVMFVfYUZSaGpKajNrN1djdW10T1NfSjhGUQ?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/16/netflix-nflx-earnings-q2-2026.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/netflix-forecast-shares-tumble.png",
      "alt": "A television screen glowing in a dark room as a streaming service loads.",
      "credit": "Getty Images via CNBC"
    },
    "rank": 23,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In imperial Rome the satirist Juvenal watched a once-sovereign people trade its political birthright for two comforts: free grain and the spectacle of the games, panem et circenses. The emperors who fed and entertained the mob understood that the crowd's loyalty was rented, never owned, and that its appetite for spectacle only grew with the feeding. Netflix has become the digital arena of our own age, a colossal machine for supplying the modern circus on demand, while Wall Street plays the part of the insatiable crowd. When the studio merely met its second-quarter numbers but promised a slightly thinner third-quarter harvest, the audience turned its thumb down and the shares fell more than seven percent after hours. Down roughly forty-five percent from its all-time high, the great entertainer relearns Juvenal's oldest lesson: those who live by the crowd's craving must keep the games coming, or watch its favor curdle. The spectacle can never simply be maintained; it must always be surpassed.",
        "excerpt": "iam pridem, ex quo suffragia nulli / vendimus, effudit curas; nam qui dabat olim / imperium, fasces, legiones, omnia, nunc se / continet atque duas tantum res anxius optat, / panem et circenses.",
        "source": "Juvenal, Satire X (Satura X), lines 78-81 (c. AD 100-127).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2007.01.0093%3Abook%3D4%3Apoem%3D10",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a0.png",
          "alt": "The Colosseum in Rome, the great amphitheatre where Roman crowds were fed spectacle to keep their favor.",
          "credit": "David Iliff, via Wikimedia Commons (CC BY-SA 3.0)"
        }
      },
      {
        "category": "historical",
        "title": "P. T. Barnum built the nineteenth century's greatest engine of popular wonder, packing his American Museum with marvels and learning, at enormous cost, that a showman's fortune rises and falls with the fickle enthusiasm of his public. He soared, was ruined by the Jerome Clock Company entanglement, and clawed his way back, proof that in the business of amusement no triumph is ever banked for good. His hard-won maxim, that anything spurious fails because the public is wiser than it looks, is the very discipline Netflix now faces: keep delivering a genuinely good article, or watch the audience drift away. The market's after-hours verdict on a soft forecast was a Barnum-scale reminder that the crowd's applause is a loan repayable on demand. A dominant entertainer trading forty-five percent below its peak is living Barnum's cycle of struggle and triumph in fast-forward. The next act always has to be bigger than the last.",
        "excerpt": "He must, of course, have a really good article, and one which will please his customers; anything spurious will not succeed permanently, because the public is wiser than many imagine.",
        "source": "P. T. Barnum, Struggles and Triumphs; or, Forty Years' Recollections of P. T. Barnum (1869), from the appended lecture 'The Art of Money-Getting.'",
        "href": "https://www.gutenberg.org/ebooks/50115",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a1.png",
          "alt": "Photographic portrait of showman P. T. Barnum.",
          "credit": "Photograph of P. T. Barnum, c. 1860s, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Awaiting execution, the philosopher Boethius imagined Fortune herself defending her cruelty: her whole art is to spin the wheel, delighting to see the high brought low and the low raised up. To climb aboard her wheel at all is to accept that the descent is written into the ascent. Netflix rode that wheel to an all-time high and now feels its downward arc, off roughly forty-five percent, tumbling another seven percent on a forecast that merely disappointed. Nothing about the company's second-quarter results was a failure, since it met the estimates, yet Fortune needs no failure to turn her wheel, only the expectation of less. Investors who mounted at the summit are learning that they cannot call it a hardship to come down when the rules of the game require it. The consolation, such as it is, is that the wheel keeps turning for those who endure.",
        "excerpt": "This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it.",
        "source": "Boethius, The Consolation of Philosophy, Book II, Prose 2 (trans. H. R. James, 1897).",
        "href": "https://www.gutenberg.org/ebooks/14328",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a2.png",
          "alt": "Medieval illumination of the Wheel of Fortune from the Carmina Burana codex, with figures rising and falling around Fortuna.",
          "credit": "Carmina Burana codex (Bavarian State Library, Clm 4660), 13th century, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Scheherazade weds a king who kills each bride at dawn, and survives by a single stratagem: she tells a story so gripping that she breaks it off at daybreak, and the king spares her one more day to hear the end. Her life is staked, night after night, on the promise that the next installment will be worth more than the last. Netflix is the Scheherazade of the streaming age, a storyteller whose survival depends on always having a more compelling tale queued for tomorrow. A quarter merely in line with estimates is a night's reprieve, but the soft forecast is the pause before dawn, when the audience, like Shahryar, demands proof that the next chapter justifies keeping the teller alive. The seven-percent drop is the market withholding its applause until it hears what comes next. To stop the tale is to end it; the story must always go on.",
        "excerpt": "and I will tell thee a tale which shall be our deliverance, if so Allah please, and which shall turn the King from his blood thirsty custom. ... And Shahrazad perceived the dawn of day and ceased to say her permitted say.",
        "source": "The Book of the Thousand Nights and a Night, trans. Richard F. Burton (1885), Vol. 1: 'Story of King Shahryar and his Brother.'",
        "href": "https://www.gutenberg.org/ebooks/3435",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a3.png",
          "alt": "Ferdinand Keller's 1880 painting of Scheherazade telling a tale to Sultan Shahryar.",
          "credit": "Ferdinand Keller, Scheherazade und Sultan Schariar, 1880, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Leon Gerome's 1872 canvas freezes the instant a Roman arena decides a life: a victorious gladiator looks up while the packed stands thrust their thumbs down, the crowd's verdict rendered in an eyeblink. The painting is really a portrait of the audience, a mass whose favor is total, immediate, and merciless. It is hard to find a better image for the moment Netflix reported, results that met the mark, a forecast that fell short, and a spectating market that instantly turned its collective thumb down and knocked the shares off more than seven percent. Gerome shows that in the entertainment economy the performer's fate is never in the performer's hands but in the mood of the watching multitude. For a company trading forty-five percent below its peak, the tiered stands of Wall Street have delivered their gesture. The show goes on only at the crowd's pleasure.",
        "excerpt": "Oil on canvas depicting a triumphant gladiator standing over a fallen opponent in a Roman amphitheatre while the Vestals and the packed crowd extend the pollice verso, thumbs turned, to demand the loser's death. Gerome makes the spectators' verdict the true subject of the picture, the arena's outcome decided entirely by the mood of the watching multitude.",
        "source": "Jean-Leon Gerome, Pollice Verso (Thumbs Down), 1872, oil on canvas, Phoenix Art Museum.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Leon_Gerome_Pollice_Verso.jpg",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a4.png",
          "alt": "Gerome's Pollice Verso: a victorious gladiator awaits the arena crowd's thumbs-down verdict on his fallen foe.",
          "credit": "Jean-Leon Gerome, 1872, Phoenix Art Museum, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Edward Burne-Jones's towering Wheel of Fortune shows the goddess Fortuna, grave and impassive, turning a great wheel to which a slave, a king, and an emperor are bound, each rising or falling at her indifferent hand. Burne-Jones said his wheel comes to fetch each of us in turn and then it crushes us, an allegory of how elevation and ruin are two moments of the same rotation. Netflix, lately crowned at an all-time high, now finds itself on the descending spoke, down about forty-five percent and dropping further on a merely soft outlook. The figures on the wheel do not fall for having failed; they fall because it is the wheel's nature to turn. A market that lifted the entertainment giant to the summit now presses it downward with the same impersonal hand. The painting's stillness is the warning: no position on Fortune's wheel is ever a resting place.",
        "excerpt": "Oil on canvas in which a monumental Fortuna turns her great wheel, to which the bound figures of a slave, a king, and an emperor cling as they are raised up and cast down in turn. Burne-Jones presents the vagaries of fortune as a single relentless rotation in which triumph and ruin are inseparable.",
        "source": "Edward Burne-Jones, The Wheel of Fortune (La Roue de la Fortune), 1875-1883, oil on canvas, Musee d'Orsay, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Edward_Burne-Jones_-_The_Wheel_of_Fortune_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a5.png",
          "alt": "Edward Burne-Jones's The Wheel of Fortune, with Fortuna turning a wheel bearing a slave, a king, and an emperor.",
          "credit": "Edward Burne-Jones, 1883, Musee d'Orsay, via Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "danny-boyle-ink-venice",
    "headline": "Danny Boyle's Rupert Murdoch drama 'Ink' will open the 2026 Venice Film Festival in competition",
    "overview": "Danny Boyle's \"Ink,\" a drama about Rupert Murdoch's early days and his acquisition of The Sun, will have its world premiere in competition as the opening film of the 83rd Venice Film Festival on Sept. 2, organizers announced Thursday. Adapted by playwright James Graham from his own stage play, the film stars Jack O'Connell as Sun editor Larry Lamb, Guy Pearce as Murdoch and Claire Foy; it is Boyle's first non-franchise feature since 2019's \"Yesterday.\" Venice will unveil its full lineup on July 23.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxQX09fcHJGUmdHUzJ5OExDNE1lVGlnOTFtM192RmlYTlFDWTRGdkV6QVpodTFpZExmYTBVeUFUS1ptMVNEcWRnMkFMcUxKbHVLUVBCZHVBV3pNSWFCMEx2V2lLUFo3cHJvTGFiUUFRQjdBaE9WNHFESjlyWjFpcnh1bFp6TEh0d2dPcVZ2T3RQaHJSY2RO?oc=5"
      },
      {
        "name": "Variety",
        "href": "https://variety.com/2026/film/global/danny-boyle-ink-venice-film-festival-1236812367/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/danny-boyle-ink-venice.png",
      "alt": "An old rotary newspaper printing press running a print run.",
      "credit": "Variety"
    },
    "rank": 24,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Enea Silvio Piccolomini marveled in 1455 that Gutenberg's printed pages were so clean and correct he could read them \"without glasses,\" he was witnessing the birth of the machine that would one day drop a red-top tabloid on every breakfast table in Britain. Danny Boyle's \"Ink\" is, at root, a story about that same machine—the press—and the intoxicating power of multiplying a single voice into millions of identical copies. Rupert Murdoch's purchase of The Sun and Larry Lamb's reinvention of it depended on the industrial descendants of Gutenberg's workshop: the roaring rotary presses that could flood a nation with print overnight. The film's fascination with ink, hot metal and deadlines is the fascination of the fifteenth century made modern—whoever commands the press commands what a public believes. Piccolomini's letter, the earliest eyewitness account of European printing, already grasps the essential thing: that the printed word carries an authority the handwritten never could. It is the first chapter of the story \"Ink\" tells about the mogul who would seize that authority.",
        "excerpt": "Nothing false was written to me about that miraculous man seen in Frankfurt. I have not seen complete Bibles, but several quires belonging to different books, exceedingly clean and correct in their script, and without error, which Your Grace could read effortlessly, even without glasses. I learned from numerous witnesses that 158 copies have been completed, although some others say the number is 180.",
        "source": "Enea Silvio Piccolomini (later Pope Pius II), letter to Cardinal Juan de Carvajal, 12 March 1455 — the earliest known account of the Gutenberg Bible; translation as quoted by The John Rylands Library, University of Manchester.",
        "href": "https://rylandscollections.com/2025/07/31/introducing-the-early-european-print-collection/",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a0.png",
          "alt": "An open Gutenberg Bible showing two columns of dense black gothic type with hand-painted red and blue initials, the Lenox copy at the New York Public Library.",
          "credit": "Photograph by Kevin Eng (NYC Wanderer) of the Gutenberg Bible, Lenox copy, New York Public Library. CC BY-SA 2.0 via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Half a century before Murdoch bought The Sun, William Randolph Hearst had already written the playbook that \"Ink\" dramatizes: give the public sensation, and if the news is thin, manufacture it. James Creelman's famous—and much-disputed—anecdote of Hearst wiring his artist in Havana, \"You furnish the pictures, and I'll furnish the war,\" captures the tabloid conviction that a newspaper need not merely report events but can conjure them. That is precisely the ambition Guy Pearce's young Murdoch and Jack O'Connell's Larry Lamb bring to Fleet Street, chasing circulation with scandal, sex and spectacle until the paper itself becomes the story. Hearst's \"yellow journalism,\" locked in a circulation war with Joseph Pulitzer, is the direct ancestor of the modern red-top whose birth \"Ink\" stages. Both men understood that the press baron's real product is not information but appetite. The parallel is a warning the film quietly presses: the power to shape public opinion is also the power to distort it.",
        "excerpt": "He was instructed to remain there until the war began; for \"yellow journalism\" was alert and had an eye for the future. Presently Mr. Remington sent this telegram from Havana:— \"W. R. HEARST, New York Journal, N.Y.: Everything is quiet. There is no trouble here. There will be no war. I wish to return. REMINGTON.\" This was the reply:— \"REMINGTON, HAVANA: Please remain. You furnish the pictures, and I'll furnish the war. W. R. HEARST.\"",
        "source": "James Creelman, On the Great Highway: The Wanderings and Adventures of a Special Correspondent (Boston: Lothrop Publishing Company, 1901), pp. 177–178.",
        "href": "https://archive.org/stream/ongreathighwaywa00creeuoft/ongreathighwaywa00creeuoft_djvu.txt",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a1.png",
          "alt": "An 1898 cartoon showing Pulitzer and Hearst, both dressed as the Yellow Kid, beating rival war drums amid a crowd—a satire of the newspaper circulation war.",
          "credit": "Leon Barritt, \"The Big Type War of the Yellow Kids,\" 1898. Library of Congress; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Long before Fleet Street, Ben Jonson saw both the joke and the danger in an industry that packages rumor as fact. In \"The Staple of News\" (first acted 1626) he invents a satirical \"office\" that gathers, grades and sells the news of the day—authentic or apocryphal, so long as it moves—anticipating by three centuries the newsroom Danny Boyle recreates in \"Ink.\" Jonson's clerks grasp the alchemy at the heart of Murdoch and Larry Lamb's tabloid revolution: that printing itself confers a spurious authority, so that even a lie \"runs News still.\" His line that \"the very printing of them makes them News\" could serve as an epigraph for the whole film. The Staple is Jonson's Sun, a commercial engine built on the discovery that the public will happily pay to be deceived. It is the oldest English satire on the very trade \"Ink\" both celebrates and interrogates.",
        "excerpt": "CYMBAL: We not forbid that any News be made, / But that't be printed; for when News is printed, / It leaves, Sir, to be News, while 'tis but written — / FITTON: Though it be ne're so false, it runs News still. / PENI-BOY JUNIOR: See divers Mens Opinions! unto some, / The very printing of them makes them News;",
        "source": "Ben Jonson, The Staple of News, Act I, Scene v (first performed 1626; text from the 1692 Folio of Jonson's Works).",
        "href": "https://www.hollowaypages.com/jonson1692news.htm",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a2.png",
          "alt": "A bust-length portrait of the playwright Ben Jonson in dark clothing with a white collar, gazing to one side against a dark background.",
          "credit": "After Abraham van Blyenberch, portrait of Ben Jonson, c. 1617. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Balzac's \"Lost Illusions\" is the great novel of journalism as a corrupting machine, and its cynical newsman Étienne Lousteau is a spiritual forebear of the ambitious men in \"Ink.\" Lousteau's confession—that he is \"a hired bravo\" who plies his \"trade among ideas and reputations\"—describes exactly the moral bargain the film watches Larry Lamb and Rupert Murdoch strike as they remake The Sun. Where Boyle's tabloid pioneers chase circulation by any means, Balzac's Paris press already trades praise and ruin for money, making and unmaking reputations to order. The novel insists that \"there is corruption everywhere,\" that the newspaper is a weapon for hire—an insight \"Ink\" revisits in the story of a paper that will print anything to win. Lucien de Rubempré's seduction by the glamour and power of the press mirrors the film's own fascinated ambivalence. Balzac supplies the literary DNA of every tale about journalism's Faustian pact, including this one.",
        "excerpt": "The craft is vile, but I live by it, and so do scores of others. Do not imagine that things are any better in public life. There is corruption everywhere in both regions; every man is corrupt or corrupts others. […] I am a hired bravo; I ply my trade among ideas and reputations, commercial, literary, and dramatic; I make some fifty crowns a month; I can sell a novel for five hundred francs; and I am beginning to be looked upon as a man to be feared.",
        "source": "Honoré de Balzac, Lost Illusions (\"A Distinguished Provincial at Paris\"), trans. Ellen Marriage; Project Gutenberg eBook #1559.",
        "href": "https://www.gutenberg.org/files/1559/1559-h/1559-h.htm",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a3.png",
          "alt": "An 1842 daguerreotype of Honoré de Balzac, shown bearded and open-shirted, staring directly at the viewer.",
          "credit": "Louis-Auguste Bisson, daguerreotype of Honoré de Balzac, 1842. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier's 1834 lithograph \"Ne vous y frottez pas!!\" (\"Don't meddle with it!\") shows a defiant printer, sleeves rolled, standing guard over the freedom of the press as a toppled king and his foreign backers look on—the printing worker imagined as a political force. It hangs directly over the themes of \"Ink,\" where the press is likewise treated as a power that governments and the powerful cannot fully control. Daumier, who had himself been jailed for caricaturing the king, understood the newspaper as both weapon and battleground, exactly as Boyle's film frames Murdoch's insurgent Sun. The printer's clenched, immovable stance embodies the \"publish and be damned\" bravado that runs through the film. Where Daumier celebrates the press against the crown, \"Ink\" complicates the picture, asking what happens when the press baron himself becomes the sovereign power. The lithograph is a fitting visual ancestor of the film's mythology of the printer as kingmaker.",
        "excerpt": "A powerful printer in shirtsleeves plants himself defiantly in the foreground, fists ready, refusing to be cowed; behind him King Louis-Philippe stumbles, while at right the deposed Charles X collapses amid money-bag-laden foreign monarchs. Beneath the central figure runs the legend \"Liberté de la Presse\"—the freedom of the press personified as an unbreakable workingman. Daumier drew the image for the republican L'Association mensuelle only two years after he had been imprisoned for mocking the king.",
        "source": "Honoré Daumier, \"Ne vous y frottez pas!!\" (Don't meddle with it! / Freedom of the Press), lithograph, plate 20 of L'Association mensuelle, March 1834. National Gallery of Art, Washington.",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Ne_vous_y_frottez_pas!!,_1834,_NGA_6131.jpg",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a4.png",
          "alt": "A lithograph of a muscular printer standing defiantly with clenched fists over the words 'Liberté de la Presse,' as a stumbling king and fallen monarch appear behind him.",
          "credit": "Honoré Daumier, \"Ne vous y frottez pas!!,\" 1834, lithograph. National Gallery of Art, Washington (CC0), via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jost Amman's 1568 woodcut of a printer's workshop, from the \"Book of Trades,\" is one of the earliest images of the very machine at the center of \"Ink\"—the press, with its type, its ink-dabbers and its freshly pulled sheets. It renders as dignified craft the physical process the film lingers over: the hot metal, the rollers, the smell of ink that makes a newspaper feel like a living thing. Boyle's film takes its very title from that substance, and Amman's print reminds us that the tabloid revolution Murdoch led was, materially, the same trade practiced for five hundred years. The woodcut's calm order is a striking contrast to the film's frantic newsroom, but the tools are recognizably ancestral. In presenting the printer as a figure of consequence, it anticipates a world in which the man who owns the press owns a share of the public mind. It is the trade of ink, at its origin, that \"Ink\" ultimately dramatizes.",
        "excerpt": "The woodcut depicts a busy sixteenth-century printing house: at the rear, compositors set type from the case, while in the foreground one man inks the forme with leather dabbers and another works the great screw press, lifting a printed sheet from its frame. Accompanying verses by the poet Hans Sachs praise the printer's art as a noble craft that carries wisdom and news across the world. It is among the first detailed European depictions of the printing press at work.",
        "source": "Jost Amman (illustrator) with verse by Hans Sachs, \"Der Buchdrucker\" (The Printer), woodcut from Das Ständebuch (Eygentliche Beschreibung aller Stände auff Erden), Frankfurt am Main, 1568.",
        "href": "https://commons.wikimedia.org/wiki/File:Buchdrucker-1568.png",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a5.png",
          "alt": "A 1568 woodcut of a printing workshop: a printer works a large wooden screw press in the foreground while assistants ink type and compositors set letters at the rear.",
          "credit": "Jost Amman, \"Der Buchdrucker\" (The Printer), woodcut from Das Ständebuch, 1568. Public domain via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "clark-art-selldorf-wing",
    "headline": "The Clark Art Institute unveils a Selldorf-designed wing to house the 331-work Tavitian collection",
    "overview": "The Clark Art Institute in Williamstown, Massachusetts, revealed plans for a new Aso O. Tavitian Wing, designed by Selldorf Architects, to house a 331-work gift of European old masters, including pieces by van Eyck, Rubens, Vigee Le Brun and Bernini, left to the museum by the late technology executive Aso Tavitian. The single-storey, roughly 15,000-square-foot building, clad in Calacatta Malva marble and set between the museum's existing structures, is due to break ground in January 2027 and open in 2028. Tavitian, who died in 2020, also left $45 million to build and endow it.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/clark-art-institute-selldorf-architects-1234754944/"
      },
      {
        "name": "Wallpaper*",
        "href": "https://www.wallpaper.com/architecture/public-buildings/selldorf-architects-clark-art-institute-design-reveal"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/clark-art-selldorf-wing.png",
      "alt": "A skylit gallery hung with European old-master paintings.",
      "credit": "Selldorf Architects via Artforum"
    },
    "rank": 25,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the Clark opens Selldorf's Aso O. Tavitian Wing in 2028, it will be repeating a gesture the Ptolemies attempted more than two thousand years ago in Alexandria: gathering the scattered masterworks of a civilization under one roof and endowing an institution to keep them. Strabo's description of the Mouseion, with its covered walk, its hall, its shared table for men of learning, and a guardian appointed to preside, is the ancestor of the very word 'museum' and of the idea that Tavitian's 331-work bequest now serves. Like the Ptolemaic kings, Tavitian spent a private fortune assembling treasures, van Eyck, Rubens, Vigee Le Brun, Bernini, and then in effect appointed trustees to preserve them whole. The $45 million he left ensures the collection is maintained rather than dispersed, just as the Museum's endowment sustained its scholars. The parallel carries a warning too: Alexandria is remembered partly for what was lost, a reminder that permanence in marble still depends on the fragile institutions that tend it.",
        "excerpt": "The Museum is a part of the palaces. It has a public walk and a place furnished with seats, and a large hall, in which the men of learning, who belong to the Museum, take their common meal. This community possesses also property in common; and a priest, formerly appointed by the kings, but at present by Caesar, presides over the Museum.",
        "source": "Strabo, Geography, Book XVII, Chapter I, section 8, translated by H. C. Hamilton and W. Falconer (London: Henry G. Bohn, 1854-57).",
        "href": "https://www.gutenberg.org/files/44886/44886-h/44886-h.htm",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a0.png",
          "alt": "A 19th-century engraving imagining the interior of the Great Library of Alexandria, scholars among scrolls beneath a vaulted hall.",
          "credit": "The Great Library of Alexandria, 19th-century engraving after O. Von Corven; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "Aso Tavitian's gift follows one of the founding gestures of the modern public museum: the 1753 bequest of Sir Hans Sloane, whose private cabinet became the British Museum. Sloane, like Tavitian, had spent a lifetime and a fortune amassing his collection and asked in his will that it be kept and preserved together 'Whole and Intire' rather than broken up and sold at auction. Parliament agreed to maintain it, in the exact words of the Act, for the general use and benefit of the public, which is precisely the logic by which a tech executive's old masters now pass, with a purpose-built Selldorf wing and a $45 million endowment, from a private house into the permanent care of the Clark. Both stories turn on the same conviction: that a great collection is a public trust in waiting, and that the collector's final act is to hand it, undivided, to posterity. The 331 works entering Williamstown are the descendants of Sloane's insistence that a museum be a single, unbroken whole.",
        "excerpt": "...to the End that the said Museum or Collection may be preserved and maintained, not only for the Inspection and Entertainment of the Learned and the Curious, but for the General Use and Benefit of the Publick...",
        "source": "The British Museum Act 1753 (26 Geo. II, c. 22), 'An Act for the Purchase of the Museum, or Collection of Sir Hans Sloane, and of the Harleian Collection of Manuscripts.'",
        "href": "https://statutes.org.uk/site/the-statutes/eighteenth-century/1753-26-george-2-c-22-establishing-the-british-museum/",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a1.png",
          "alt": "Portrait of Sir Hans Sloane, the physician and collector whose 1753 bequest founded the British Museum.",
          "credit": "Portrait of Sir Hans Sloane; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Every monument built to outlast time invites Shelley's irony, and the Tavitian Wing, some 15,000 square feet of Calacatta Malva marble raised to house one man's masterpieces and carry his name well beyond 2028, is a monument in exactly Ozymandias's sense. Shelley's shattered colossus, its pedestal still boasting 'Look on my Works ye Mighty, and despair!', is a meditation on the vanity of legacies carved in stone. Yet the sonnet cuts two ways for a collector like Tavitian: the sculptor's skill outlives the tyrant, the hand that mocked survives the king, so that art endures where mere power does not. A wing of marble named for a patron is a wager that the works inside, the van Eycks and Rubenses, will keep his memory alive far longer than any inscription. The Clark's gamble is that its museum, unlike Ozymandias's desert, will still be tended, and the collection never left to the lone and level sands.",
        "excerpt": "I met a traveller from an antique land,\nWho said -- \"two vast and trunkless legs of stone\nStand in the desert ... near them, on the sand,\nHalf sunk a shattered visage lies, whose frown,\nAnd wrinkled lips, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed;\nAnd on the pedestal these words appear:\nMy name is Ozymandias, King of Kings,\nLook on my Works ye Mighty, and despair!\nNothing beside remains. Round the decay\nOf that colossal Wreck, boundless and bare\nThe lone and level sands stretch far away.\" --",
        "source": "Percy Bysshe Shelley, 'Ozymandias' (1818), text via Representative Poetry Online, University of Toronto Libraries.",
        "href": "https://rpo.library.utoronto.ca/content/ozymandias-0",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a2.png",
          "alt": "The colossal granite bust of Ramesses II, the 'Younger Memnon', in the British Museum, the sculpture associated with Shelley's Ozymandias.",
          "credit": "Colossal bust of Ramesses II ('the Younger Memnon'), c. 1250 BC, British Museum; via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Two millennia before the Clark clad its new wing in Calacatta Malva marble, Horace claimed to have built a monument more lasting than bronze and higher than the royal pile of the pyramids, one that neither gnawing rain nor the flight of time could destroy. His boast is the presiding spirit of every patron who builds for permanence, and it frames the paradox of the Tavitian Wing precisely: stone and marble promise endurance, yet Horace located true permanence not in masonry but in the work itself, 'Non omnis moriar,' not all of me shall die. Tavitian's $45 million and Selldorf's marble are the bronze and the pyramids; the 331 paintings and sculptures are the poem. The bequest is a bet that a collector, like a poet, secures his afterlife by the quality of what he leaves rather than the grandeur of the vessel that holds it. The Pyramid of Cestius, a private citizen's marble monument still standing in Rome from Horace's own age, shows how the two forms of memory, the building and the thing it enshrines, have always been braided together.",
        "excerpt": "Exegi monumentum aere perennius\nregalique situ pyramidum altius,\nquod non imber edax, non Aquilo inpotens\npossit diruere aut innumerabilis\nannorum series et fuga temporum.\nNon omnis moriar multaque pars mei\nvitabit Libitinam...",
        "source": "Horace, Odes (Carmina) III.30, lines 1-7; Latin text via The Latin Library. English rendering of the opening (John Conington, 1872): 'And now 'tis done: more durable than brass / My monument shall be...'",
        "href": "https://www.thelatinlibrary.com/horace/carm3.shtml",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a3.png",
          "alt": "The marble-clad Pyramid of Caius Cestius in Rome, a Roman citizen's monumental tomb from around 12 BC.",
          "credit": "Pyramid of Caius Cestius, Rome (c. 18-12 BC); via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "David Teniers's canvas is the seventeenth century's answer to a museum announcement: a picture whose entire subject is a private collection gathered, hung, and put on display. Archduke Leopold Wilhelm stands amid his Italian masterpieces while the painter, hat in hand, records them for posterity, a scene that anticipates exactly what the Clark is doing with the Tavitian bequest, transferring a connoisseur's carefully assembled walls into a public and permanent frame. Where the archduke commissioned Teniers to catalogue and immortalise his holdings, the Clark has commissioned Annabelle Selldorf to build the Calacatta Malva rooms that will do the same for Tavitian's 331 works. Both are acts of gathering and fixing in place, turning the restless activity of collecting into something that can be beheld whole. And in both, the collection outlives the collector: most of the archduke's paintings survive in Vienna's Kunsthistorisches Museum, just as Tavitian's van Eyck and Rubens will survive in Williamstown.",
        "excerpt": "In this gallery picture the painter shows Archduke Leopold Wilhelm standing among the densely hung masterpieces of his Italian collection, while Teniers himself, hat in hand, attends his patron. Roughly fifty identifiable paintings, Titians, Giorgiones, Veroneses, crowd the walls from floor to cornice, a whole princely collection compressed into a single canvas. Teniers painted such views to document and immortalise the archduke's holdings, most of which passed into what is now the Kunsthistorisches Museum in Vienna.",
        "source": "David Teniers the Younger, 'Archduke Leopold Wilhelm in his Gallery in Brussels', oil on canvas, c. 1651, Kunsthistorisches Museum, Vienna.",
        "href": "https://en.wikipedia.org/wiki/Gallery_of_Archduke_Leopold_Wilhelm_in_Brussels_(Vienna)",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a4.png",
          "alt": "David Teniers the Younger's painting of Archduke Leopold Wilhelm in his Brussels gallery, its walls crowded with framed Italian paintings.",
          "credit": "David Teniers the Younger, Kunsthistorisches Museum, Vienna (Google Art Project); via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Bernini is one of the names carried in the Tavitian bequest, and his bust of Costanza Bonarelli distills what the Clark's new marble wing is finally about: the power of stone to hold a living presence against time. Carved from a single block, the bust makes cold marble seem to breathe, an argument in itself for why a collector would spend a fortune to preserve such things and why a museum would raise 15,000 square feet of Calacatta Malva to shelter them. There is a rhyme, too, between Bernini's medium and Selldorf's: the same material a Baroque genius coaxed into flesh now sheathes the rooms built to guard his work. A bequest of 331 old masters is a bid for permanence, and Bernini's marble is the proof of concept, for nearly four centuries on Costanza still turns her head. The Tavitian Wing is a wager that his sculpture, and the paintings gathered around it, will go on doing so under the Clark's care.",
        "excerpt": "Carved from a single block of white marble around 1637, Bernini's bust of Costanza Bonarelli catches a living woman in a moment of movement, lips parted, hair loosening, her chemise unfastened at the throat. It is among the first Baroque portraits made not on commission but out of the sculptor's own feeling, and it demonstrates his uncanny power to make cold stone appear to breathe. The bust survives today in the Museo Nazionale del Bargello in Florence.",
        "source": "Gian Lorenzo Bernini, 'Bust of Costanza Bonarelli', marble, c. 1636-38, Museo Nazionale del Bargello, Florence.",
        "href": "https://en.wikipedia.org/wiki/Bust_of_Costanza_Bonarelli",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a5.png",
          "alt": "Gian Lorenzo Bernini's marble bust of Costanza Bonarelli, her head turned, lips parted, hair loosening.",
          "credit": "Gian Lorenzo Bernini, Bust of Costanza Bonarelli, Museo Nazionale del Bargello, Florence; via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "jason-limon-trompe-loeil",
    "headline": "Colossal features Jason Limon's trompe-l'oeil paintings that reveal a hidden skeletal world",
    "overview": "The art magazine Colossal spotlighted a new body of trompe-l'oeil paintings by the San Antonio artist Jason Limon, whose canvases appear to peel back like torn paper or plastic wrap to expose skeletal figures and cryptid creatures beneath. Working in acrylic with a muted, vintage palette, Limon plays optical tricks that balance the macabre and the whimsical, inviting viewers to read their own stories into the bones. The images extend a long tradition of art that hides death just below the surface of the everyday.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/trompe-loeil-paintings-jason-limon/"
      },
      {
        "name": "Beinart Gallery",
        "href": "https://beinart.org/collections/jason-limon"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/jason-limon-trompe-loeil.png",
      "alt": "A vanitas still life with a human skull, echoing mortality beneath the everyday.",
      "credit": "Jason Limon via Colossal"
    },
    "rank": 26,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nearly two thousand years before Jason Limon tricked the eye with paint that seems to tear away, Pliny the Elder recorded the founding legend of trompe-l'oeil: the contest between Zeuxis and Parrhasius. Zeuxis painted grapes so convincing that birds flew down to peck at them, only to be humbled when he reached to pull back Parrhasius's painted curtain and discovered that the curtain itself was paint. The anecdote fixed illusionism as painting's oldest game, the surface that pretends to be something it is not. Limon revives that ancient sleight of hand, but where the Greeks concealed a picture behind the painted veil, he lets the peeled surface disclose a skull. His torn paper and lifted skin are Parrhasius's curtain restaged for a memento-mori age, deceiving the eye only to reveal the mortality waiting underneath.",
        "excerpt": "This last, it is said, entered into a pictorial contest with Zeuxis, who represented some grapes, painted so naturally that the birds flew towards the spot where the picture was exhibited. Parrhasius, on the other hand, exhibited a curtain, drawn with such singular truthfulness, that Zeuxis, elated with the judgment which had been passed upon his work by the birds, haughtily demanded that the curtain should be drawn aside to let the picture be seen. Upon finding his mistake, with a great degree of ingenuous candour he admitted that he had been surpassed, for that whereas he himself had only deceived the birds, Parrhasius had deceived him, an artist.",
        "source": "Pliny the Elder, Natural History, Book XXXV, chapter 36 (10), trans. John Bostock and H. T. Riley (London: Taylor and Francis, 1855), via the Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0137%3Abook%3D35%3Achapter%3D36",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a0.png",
          "alt": "Engraving of the ancient Greek painter Zeuxis at his easel, surrounded by figures, illustrating the classical painter whose illusionistic grapes deceived the birds.",
          "credit": "Engraving depicting the painter Zeuxis. Wellcome Collection, London (CC BY 4.0), via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Beneath the church of Santa Maria della Concezione in Rome lies a set of chapels whose walls, arches and chandeliers are built entirely from the bones of some four thousand Capuchin friars, arranged into rosettes and canopies during the seventeenth and eighteenth centuries. A placard among the remains addresses every visitor with the words that you are looking at what you will become. The crypt turns death into decoration, macabre yet oddly playful ornament hidden just below the floor of an ordinary-looking church. That is precisely the register of Jason Limon's paintings, where a muted, vintage surface peels back to expose the skeletal world beneath the everyday. Both the friars and the painter insist that the bone is always there under the skin, and both make the reminder strangely charming rather than merely grim.",
        "excerpt": "Beneath Santa Maria della Concezione, five small chapels are decorated entirely with the disinterred bones of some four thousand Capuchin friars, formed into arches, rosettes and chandeliers. A multilingual placard set among the remains delivers the crypt's memento mori to visitors: 'What you are now, we once were; what we are now, you shall be.'",
        "source": "Ossuary and memento mori inscription, Capuchin Crypt, Santa Maria della Concezione dei Cappuccini, Rome (bones arranged in the 17th-18th centuries); documented in 'Capuchin Crypt', Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Capuchin_Crypt",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a1.png",
          "alt": "A chapel in the Capuchin Crypt in Rome whose walls and ceiling are decorated with patterns made from the bones and skulls of friars.",
          "credit": "The Capuchin Crypt, Rome. Photograph by Edmund F. Arras; Columbus Metropolitan Library via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In the graveyard scene of Hamlet, the prince takes up the unearthed skull of Yorick, the court jester who once carried him on his back, and turns a clownish memory into a meditation on decay. 'Alas, poor Yorick,' he says, dwelling on the lips he had kissed and the jests now silenced, before mocking the fine lady who paints an inch thick yet must come at last to this same grinning skull. Shakespeare fuses laughter and rot exactly as Limon does, so that the jester's whimsy and the death's-head are one and the same object. Yorick's skull is the face beneath the face, the truth that cosmetics and appearances conceal. Limon's peeled surfaces perform the same unmasking, letting a cheerful vintage veneer slip to reveal the grin of the skeleton it had been hiding.",
        "excerpt": "Alas, poor Yorick. I knew him, Horatio, a fellow of infinite jest, of most excellent fancy. He hath borne me on his back a thousand times; and now, how abhorred in my imagination it is! My gorge rises at it. Here hung those lips that I have kiss'd I know not how oft. Where be your gibes now? your gambols? your songs? your flashes of merriment, that were wont to set the table on a roar? Not one now, to mock your own grinning? Quite chop-fallen? Now get you to my lady's chamber, and tell her, let her paint an inch thick, to this favour she must come. Make her laugh at that.",
        "source": "William Shakespeare, The Tragedy of Hamlet, Prince of Denmark, Act V, Scene 1; Project Gutenberg eBook #1524.",
        "href": "https://www.gutenberg.org/cache/epub/1524/pg1524.txt",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a2.png",
          "alt": "Painting of Hamlet and Horatio in a graveyard, with a gravedigger handing Hamlet a skull.",
          "credit": "Eugene Delacroix, Hamlet and Horatio in the Graveyard (1839), Musee du Louvre. Public domain via Wikimedia Commons / Web Gallery of Art."
        }
      },
      {
        "category": "literary",
        "title": "The Hebrew Preacher of Ecclesiastes gave the vanitas tradition its motto and its mood, declaring that all is vanity and that in the end the dust returns to the earth as it was. Everything gleaming and pleasurable on life's surface is, he warns, a passing breath laid over an unstable foundation of mortality. Dutch painters would later build entire still lifes around this text, tucking a skull among the fruit and glassware, and Jason Limon extends the lineage into our own moment. His torn-open surfaces are a visual gloss on the Preacher's insight, that beneath the ornamental everyday lie dust and bone. What reads as macabre whimsy is in truth the oldest sermon, that all appearances are provisional and that death is the ground lying just beneath them.",
        "excerpt": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. ... Then shall the dust return to the earth as it was: and the spirit shall return unto God who gave it.",
        "source": "Ecclesiastes 1:2 and 12:7, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a3.png",
          "alt": "A Dutch vanitas still life showing a human skull lying beside an overturned glass, a quill pen and a book on a table.",
          "credit": "Pieter Claesz, Still Life with a Skull and a Writing Quill (1628), The Metropolitan Museum of Art. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Hans Holbein's double portrait The Ambassadors (1533) is trompe-l'oeil's most famous trap. Two worldly, richly dressed diplomats stand amid instruments of learning and pleasure, yet a strange grey smear stretches across the foreground; only when the viewer moves to the painting's edge does the distortion resolve into a perfectly rendered human skull. Holbein hid a memento mori in plain sight, legible only through a shift of viewpoint, death smuggled into a picture of status and life. Jason Limon works the same optical mechanism in reverse, making the ordinary surface split open to reveal the skeleton that Holbein disguised as a blur. Both artists prove that the skull is already present within the image of the living, and that it only waits for the right angle, or the right tear, to emerge.",
        "excerpt": "A life-size double portrait of two Renaissance diplomats surrounded by globes, instruments and symbols of worldly achievement. Across the foreground floats an anamorphic distortion that resolves, when seen from the side, into a human skull, a hidden memento mori concealed within an image of power and life.",
        "source": "Hans Holbein the Younger, The Ambassadors (Jean de Dinteville and Georges de Selve), 1533, oil on oak, The National Gallery, London (NG1314).",
        "href": "https://www.nationalgallery.org.uk/paintings/hans-holbein-the-younger-the-ambassadors",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a4.png",
          "alt": "Holbein's The Ambassadors: two men flanking a table of instruments, with an elongated anamorphic skull stretched diagonally across the floor in front of them.",
          "credit": "Hans Holbein the Younger, The Ambassadors (1533), The National Gallery, London. Public domain via Wikimedia Commons / Google Arts & Culture."
        }
      },
      {
        "category": "artistic",
        "title": "Harmen Steenwyck's Still Life: An Allegory of the Vanities of Human Life (c.1640) gathers a Japanese sword, a shell, books, a chronometer and a smoking lamp around a single blunt fact, a human skull. Painted in the muted browns and greys of the Dutch vanitas, its beautifully described worldly things are all quietly subordinate to the mortality set at their center. This is the tradition Jason Limon inherits and updates, with its still vintage palette, its ordinary objects, and its skull that supplies the real subject. Where Steenwyck sets the skull openly among the treasures, Limon buries it and then tears the surface to let it surface again, yet the message is identical. Beauty and the everyday are a thin skin stretched over the bone, and good painting is what makes us feel the death hidden just below.",
        "excerpt": "A Dutch vanitas still life in which a human skull rests among books, a shell, a Japanese sword, a chronometer and an extinguished lamp. Rendered in subdued browns and greys, the worldly objects are arranged to declare the transience of knowledge, pleasure and life itself.",
        "source": "Harmen Steenwyck, Still Life: An Allegory of the Vanities of Human Life, c. 1640, oil on oak, The National Gallery, London (NG1256).",
        "href": "https://www.nationalgallery.org.uk/paintings/harmen-steenwyck-still-life-an-allegory-of-the-vanities-of-human-life",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a5.png",
          "alt": "A vanitas still life with a human skull lying among books, a shell, a sword hilt, a jug and an extinguished oil lamp on a table.",
          "credit": "Harmen Steenwyck, Still Life: An Allegory of the Vanities of Human Life (c.1640), The National Gallery, London. Public domain via Wikimedia Commons / Web Gallery of Art."
        }
      }
    ]
  },
  {
    "slug": "genoa-bridge-verdict",
    "headline": "An Italian court sentences ex-Autostrade CEO Castellucci to 12 years over the 2018 Genoa bridge collapse that killed 43",
    "overview": "An Italian court on Thursday convicted 32 people and handed Giovanni Castellucci, former chief executive of Atlantia and motorway operator Autostrade per l'Italia, a 12-year prison sentence over the August 2018 collapse of Genoa's Morandi bridge, which killed 43 people when their vehicles plunged from the flyover. Autostrade's former maintenance chief Michele Mitelli received 11 years and its ex-number two Paolo Berti five and a half. After four years of trial, prosecutors argued that years of neglected maintenance, ignored warnings and delayed safety work were allowed to fester while the operator kept collecting tolls and paying dividends.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c36dnz1zez5o"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/16/europe/italy-giovanni-castellucci-genoa-bridge-sentencing-intl"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/genoa-bridge-verdict.png",
      "alt": "The collapsed deck of Genoa's Morandi bridge after the August 2018 disaster.",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "rank": 27,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In AD 27, under the emperor Tiberius, a freedman named Atilius threw up a huge wooden amphitheatre at Fidenae near Rome to profit from gladiatorial games, but skimped on the foundations and the timber framing. When an immense crowd packed the stands, the structure buckled and crashed inward, and the historian Tacitus records that fifty thousand people were maimed or destroyed in the ruin. The Senate answered by barring shows staged by men of insufficient wealth, ordering solid foundations for all amphitheatres, and banishing Atilius from Italy. Nearly two millennia later the Morandi bridge in Genoa collapsed on 14 August 2018, killing 43, and prosecutors again blamed corners cut for gain. As with Atilius, an Italian court has now delivered its reckoning, convicting 32 people and sentencing former Autostrade chief Giovanni Castellucci to twelve years. The oldest lesson of engineering returns: a builder who chases profit over safe foundations buries the multitude that trusts his work.",
        "excerpt": "One Atilius, of the freedman class, having undertaken to build an amphitheatre at Fidena for the exhibition of a show of gladiators, failed to lay a solid foundation to frame the wooden superstructure with beams of sufficient strength; for he had neither an abundance of wealth, nor zeal for public popularity, but he had simply sought the work for sordid gain. … Fifty thousand persons were maimed or destroyed in this disaster.",
        "source": "Tacitus, The Annals, Book IV.62, trans. Alfred John Church and William Jackson Brodribb; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_4",
        "image": {
          "src": "/covers/genoa-bridge-verdict--a0.png",
          "alt": "A crowded Roman amphitheatre with a victorious gladiator awaiting the crowd's verdict.",
          "credit": "Jean-Léon Gérôme, 'Pollice Verso' (1872), Phoenix Art Museum; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "On the stormy night of 28 December 1879 the Tay Bridge in Scotland — then the longest in the world and the pride of engineer Sir Thomas Bouch — gave way as a train crossed, plunging every passenger into the Firth of Tay and killing at least fifty-nine, perhaps as many as seventy-five. The official Board of Trade inquiry under Henry Rothery found the bridge had been badly built and badly maintained, its ironwork flawed and its upkeep neglected. Bouch, knighted only months before, was ruined and dead within the year. The parallel to Genoa is exact: a celebrated span, deferred maintenance, warnings unheeded, sudden catastrophe over water. The Morandi bridge, opened in 1967 as a marvel of prestressed concrete, likewise fell on 14 August 2018 after years of documented corrosion and delayed repairs, killing 43. In both cases an inquiry laid the ruin not at the door of the storm but of human negligence.",
        "excerpt": "Can there be any doubt that what caused the overthrow of the bridge was the pressure of the wind acting upon a structure badly built and badly maintained?",
        "source": "Henry C. Rothery, Report of the Court of Inquiry into the Tay Bridge disaster (Board of Trade, 1880); collapse of 28 December 1879, as quoted in the Wikipedia article.",
        "href": "https://en.wikipedia.org/wiki/Tay_Bridge_disaster",
        "image": {
          "src": "/covers/genoa-bridge-verdict--a1.png",
          "alt": "Photograph of the collapsed iron girders of the Tay Bridge after the 1879 disaster.",
          "credit": "Great Britain Board of Trade, 'Fallen girders, Tay Bridge' (1879–80), National Library of Scotland; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The Hebrew prophet Ezekiel, writing in the sixth century BC, condemned false prophets who lulled the people with cries of Peace where there was no peace — and cast their deceit as a builder's fraud. In his image one man runs up a flimsy wall while others hide its weakness by daubing it with untempered morter, a whitewash that conceals the defect beneath. God promises a storm of rain, hail and wind that will hurl the wall to the ground, laying bare its hidden foundation and consuming the men who papered over the danger. It is an uncannily precise figure for the Morandi collapse, in which engineers and executives stood accused of masking known corrosion with cosmetic fixes while the deep flaws went unrepaired. When the flyover fell on 14 August 2018 and killed 43, the daubing was stripped away. As in Ezekiel, judgment then fell upon those who had concealed the fault.",
        "excerpt": "Because, even because they have seduced my people, saying, Peace; and there was no peace; and one built up a wall, and, lo, others daubed it with untempered morter: Say unto them which daub it with untempered morter, that it shall fall: there shall be an overflowing shower; and ye, O great hailstones, shall fall; and a stormy wind shall rend it. … So will I break down the wall that ye have daubed with untempered morter, and bring it down to the ground, so that the foundation thereof shall be discovered, and it shall fall, and ye shall be consumed in the midst thereof: and ye shall know that I am the LORD.",
        "source": "Ezekiel 13:10–14, King James Version; Project Gutenberg (eBook 8026, Book 26: Ezekiel).",
        "href": "https://www.gutenberg.org/cache/epub/8026/pg8026-images.html",
        "image": {
          "src": "/covers/genoa-bridge-verdict--a2.png",
          "alt": "An apocalyptic scene of a city and mountains collapsing into a fiery abyss under a stormy sky.",
          "credit": "John Martin, 'The Great Day of His Wrath' (1851–53), Tate Britain; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In the Gospel of Luke, Jesus recalls a disaster fresh in his hearers' memory: those eighteen upon whom the tower in Siloam fell, and slew them. He invokes it to reject the easy notion that the dead were greater sinners than anyone else — they were ordinary people crushed by a falling structure. The moment fixes in scripture the oldest terror of built things: a tower, trusted daily, that suddenly kills those beneath it. So it was in Genoa on 14 August 2018, when 43 drivers and passengers — commuters, holidaymakers, whole families — plunged with their cars as the Morandi flyover gave way, blameless victims of a structure that failed. Luke's verse insists such deaths demand not fatalism but reckoning, a note answered by the Italian court that convicted 32 people and sentenced Giovanni Castellucci to twelve years.",
        "excerpt": "Or those eighteen, upon whom the tower in Siloam fell, and slew them, think ye that they were sinners above all men that dwelt in Jerusalem? I tell you, Nay: but, except ye repent, ye shall all likewise perish.",
        "source": "Luke 13:4–5, King James Version; Project Gutenberg (eBook 8042, Book 42: Luke).",
        "href": "https://www.gutenberg.org/cache/epub/8042/pg8042-images.html",
        "image": {
          "src": "/covers/genoa-bridge-verdict--a3.png",
          "alt": "Nineteenth-century engraving of the Pool of Siloam in Jerusalem.",
          "credit": "Henry Baker Tristram, 'The Pool of Siloam,' from Scenes in the East (1870); British Library via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder painted 'The Tower of Babel' in 1563, now in the Kunsthistorisches Museum in Vienna: a colossal spiralling tower, modelled on the Roman Colosseum, climbing into the clouds even as its lower storeys already crack and lean. Bruegel makes visible the ancient warning against overreaching construction — a monument to human pride whose scale outruns its stability and is fated to fall. That doomed ambition speaks directly to the hubris behind the Morandi bridge, a 1960s marvel of soaring concrete its makers trusted to defy both time and neglect. In Bruegel's canvas the flaw is woven into the very fabric, just as prosecutors argued corrosion and cut corners were built into Genoa's flyover. Five centuries on, the painting remains the perfect emblem of the theme the Genoa verdict names: great works raised in vanity that collapse upon the people below.",
        "excerpt": "Bruegel's vast tower spirals upward storey upon storey into the clouds, swarming with cranes, scaffolds and toiling labourers, its tiers of arches modelled on the Roman Colosseum. Yet the mountain of masonry already tilts and fractures at its base, the whole enterprise leaning as if it knows it cannot stand — a monument to overreaching ambition built, from its first stone, to fall.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel (1563), oil on panel, Kunsthistorisches Museum, Vienna; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/genoa-bridge-verdict--a4.png",
          "alt": "A towering spiral of masonry rising into the clouds, cracking and leaning at its base.",
          "credit": "Pieter Bruegel the Elder, 'The Tower of Babel' (1563), Kunsthistorisches Museum, Vienna; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi composed his 'Messa da Requiem' in 1874 to mourn the Italian writer Alessandro Manzoni, and its 'Dies irae' — day of wrath — erupts with hammer-blow chords, thundering drums and a terror-struck chorus depicting the Day of Judgment. It is Italy's own great music of grief and reckoning, a mass for the dead that also stages the moment when hidden deeds are called to account. For a nation burying the 43 killed at Genoa, Verdi's Requiem is the fitting sound: at once a lament for the innocent dead and the trembling arrival of judgment. The 'Dies irae' text, an ancient sequence Verdi set to overwhelming force, imagines the world dissolved in ashes and every act weighed in the balance. As an Italian court weighed the guilt of those who let the Morandi bridge decay, Verdi's music supplies both the requiem and the wrath.",
        "excerpt": "Dies iræ, dies illa, / Solvet sæclum in favilla: / Teste David cum Sibylla. — 'Day of wrath and doom impending! / David's word with Sibyl's blending, / Heaven and earth in ashes ending!'",
        "source": "Giuseppe Verdi, Messa da Requiem (1874); 'Dies irae' sequence (Latin text attrib. Thomas of Celano), English trans. William J. Irons (1849); full score at IMSLP.",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/genoa-bridge-verdict--a5.png",
          "alt": "Pastel portrait of the composer Giuseppe Verdi in a white scarf and top hat.",
          "credit": "Giovanni Boldini, 'Portrait of Giuseppe Verdi' (1886), Galleria Nazionale d'Arte Moderna, Rome; Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "uk-gripen-jets-ukraine",
    "headline": "Britain commits 300 million euros to help Sweden send 16 Gripen fighter jets to Ukraine",
    "overview": "Visiting Kyiv on 16 July 2026, UK Prime Minister Keir Starmer pledged 300 million euros to help urgently deliver 16 Swedish Saab Gripen fighter jets to Ukraine, part of a package including pilot and engineer training, simulators and spare parts to strengthen Ukraine's defence of its skies against Russian attacks. Ukraine also plans to buy 20 more Gripens through an EU loan, aiming to field a squadron of the fighters by 2029. British firms supply more than 30% of each aircraft, and the government said at least 50 UK-based companies and over 5,000 jobs would benefit.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxOLU9xQTFVdEtCNExlUkNEWEFteS1IcWgxS2lGYzVONmUwTEpQMDFhM01SVWZ2c0tiQnJIT1BUbm5BM2JoUmZEWl9EMVJLb1gtcUdZb1VIUGRJSWhibFJjUTJjOGgzV0hPTFhIUXB2YmxpeElZekt1X2pKeF8zNTh1SEJRMjNwenZZX2hnc29DbzZDRXlwRlZYYkZKc0E4Wnc3V3d4QnVzREhsSW5hWVlWSVFuMWdYRGo1Tm40?oc=5"
      },
      {
        "name": "GOV.UK",
        "href": "https://www.gov.uk/government/news/prime-minister-commits-300-million-to-fund-fighter-jets-for-ukraine-backing-british-jobs-and-bolstering-ukraines-defence"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/uk-gripen-jets-ukraine.png",
      "alt": "A pair of Swedish Saab JAS 39 Gripen fighter jets in flight.",
      "credit": "Wikimedia Commons"
    },
    "rank": 28,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 433 BC the island republic of Corcyra (modern Corfu), outmatched by the great naval power of Corinth, sent envoys to Athens begging to be received into alliance. As the historian Thucydides records in Book I of his History of the Peloponnesian War, the Athenians held two stormy assemblies, reversed their first inclination, and voted to back the smaller state, dispatching ten ships that helped it survive the Battle of Sybota. Just as Britain now pledges 300 million euros and Sweden its Gripen jets so a lesser partner can hold off a mightier aggressor, Athens threw its power behind an endangered ally. Athenians even insisted it be a defensive, not offensive, alliance, mirroring the careful framing of aid to Ukraine as purely for the defence of its skies. The intervention helped tip a local quarrel into the wider Peloponnesian War, a lasting warning that arming an ally is never a small decision.",
        "excerpt": "In the first there was a manifest disposition to listen to the representations of Corinth; in the second, public feeling had changed and an alliance with Corcyra was decided on, with certain reservations. ... Athens received Corcyra into alliance and, on the departure of the Corinthians not long afterwards, sent ten ships to their assistance.",
        "source": "Thucydides, History of the Peloponnesian War, Book I.44–45, trans. Richard Crawley (1874).",
        "href": "http://classics.mit.edu/Thucydides/pelopwar.1.first.html",
        "image": {
          "src": "/covers/uk-gripen-jets-ukraine--a0.png",
          "alt": "Marble bust of the historian Thucydides, a Roman-era copy of a 4th-century BC Greek original, Royal Ontario Museum.",
          "credit": "Royal Ontario Museum; photograph by Captmondo, released to the public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 29 December 1940, with Britain standing nearly alone against Nazi Germany, President Franklin D. Roosevelt used a national radio fireside chat to declare that the United States must become the great arsenal of democracy, supplying guns, planes and ships to nations fighting the aggressors. The pledge became law with the Lend-Lease Act of 11 March 1941, under which America eventually sent billions in weaponry, including nearly 5,000 Bell P-39 Airacobra fighters gifted to the Soviet Union, to allies it would not fight beside directly. Keir Starmer's 300-million-euro commitment so that Swedish Gripens can defend Ukraine is a lineal descendant of that idea: a wealthier power financing the airpower of a nation under attack. Then as now, the gift came bundled with training, spares and industrial partnership rather than troops. Roosevelt's warning that aiding an embattled friend was an emergency as serious as war itself echoes in every European capital arming Kyiv today.",
        "excerpt": "We must be the great arsenal of democracy. For us this is an emergency as serious as war itself.",
        "source": "Franklin D. Roosevelt, Fireside Chat on National Security (\"The Great Arsenal of Democracy\"), 29 December 1940.",
        "href": "https://en.wikisource.org/wiki/Arsenal_of_Democracy",
        "image": {
          "src": "/covers/uk-gripen-jets-ukraine--a1.png",
          "alt": "Rows of Bell P-39 Airacobra fighter aircraft on the assembly line at Bell Aircraft, Wheatfield, New York, during World War II.",
          "credit": "Library of Congress, FSA/OWI Collection, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book XVIII of Homer's Iliad, the sea-goddess Thetis, desperate to save her son Achilles as he prepares to face Hector, climbs to Olympus and begs the smith-god Hephaestus (Vulcan) to forge him new armour. The god fashions a vast, five-layered shield emblazoned with the whole cosmos, earth, sea, and cities at peace and at war, a divine gift that is at once protection and emblem of a civilization worth defending. The scene maps closely onto Ukraine receiving sixteen Gripen jets to shield its skies: airpower as both practical armour and a symbol that a besieged people will not be left defenceless. Like Achilles, whose old armour was stripped from him, Ukraine has lost aircraft and needs the arms of a greater friend to fight on. The shield of Achilles has for three thousand years stood as the archetype of the arms one gives to a warrior facing a mortal foe.",
        "excerpt": "First he shaped the shield so great and strong, adorning it all over and binding it round with a gleaming circuit in three layers; and the baldric was made of silver. He made the shield in five thicknesses, and with many a wonder did his cunning hand enrich it.",
        "source": "Homer, The Iliad, Book XVIII, trans. Samuel Butler (1898).",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XVIII",
        "image": {
          "src": "/covers/uk-gripen-jets-ukraine--a2.png",
          "alt": "Benjamin West's 1804 painting 'Thetis Bringing the Armor to Achilles,' the goddess delivering the divinely forged arms to her son.",
          "credit": "Benjamin West (1804), Los Angeles County Museum of Art, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In 1 Samuel 17, the shepherd boy David confronts the Philistine giant Goliath, who has terrified the entire army of Israel. King Saul first tries to clothe David in his own royal armour, helmet and sword, but the boy, unaccustomed to such equipment, sets it aside because he has not 'proved' it, and goes out trusting in God and a sling. The episode carries two threads that illuminate the Gripen gift: the arming of a smaller champion by a greater power, and the hard truth that weapons are useless without the training to wield them, precisely why the British package includes simulators, instructors and spares. Ukraine, the outmatched David against a Russian Goliath, needs not only aircraft but the skill to make them battle-ready. David's cry that 'the battle is the LORD's' has become a rallying figure for every small nation defying a giant.",
        "excerpt": "And Saul armed David with his armour, and he put an helmet of brass upon his head; also he armed him with a coat of mail. And David girded his sword upon his armour, and he assayed to go; for he had not proved it. And David said unto Saul, I cannot go with these; for I have not proved them. And David put them off him.",
        "source": "The Holy Bible, King James Version, 1 Samuel 17:38–39.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel",
        "image": {
          "src": "/covers/uk-gripen-jets-ukraine--a3.png",
          "alt": "Caravaggio's painting 'David with the Head of Goliath' (c. 1610), the young David holding the severed head of the fallen giant.",
          "credit": "Caravaggio (c. 1610), Galleria Borghese, Rome, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez painted 'La Fragua de Vulcano' (The Forge of Vulcan) in Rome in 1630, showing the god Vulcan and his sweating labourers at the anvil, hammering out armour, when they are interrupted by Apollo bringing news of war and betrayal. The canvas, now in the Museo del Prado in Madrid, turns the workshop of weapons into high drama: a gleaming breastplate and helmet take shape as the tools of coming conflict. It is a vivid emblem of what stands behind the Gripen pledge, the factories and firms, British and Swedish, forging and supplying the components of the jets destined for Ukraine. Velázquez reminds us that every gift of arms begins as fire, sweat and craftsmanship in a mortal forge. The very interruption by Apollo mirrors how news from a distant war can reorder the priorities of an entire arsenal.",
        "excerpt": "Velázquez freezes the instant word of war reaches the smithy: the near-naked smiths turn sharply from their anvil, a half-finished suit of armour glowing on the workbench, hard light catching the metal soon to be carried into battle. It is Baroque realism enlisting even the gods in the grimy industry of arming a cause.",
        "source": "Diego Velázquez, The Forge of Vulcan (La Fragua de Vulcano), 1630, oil on canvas, Museo Nacional del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/uk-gripen-jets-ukraine--a4.png",
          "alt": "Velázquez's painting 'The Forge of Vulcan' (1630), smiths forging armour at the anvil as Apollo arrives with news of war.",
          "credit": "Diego Velázquez (1630), Museo Nacional del Prado, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jean Sibelius composed the tone poem 'Finlandia,' Op. 26, in 1899–1900 as a barely veiled protest against the Russian Empire's censorship and tightening control of Finland; its surging, defiant hymn became an unofficial anthem of a small Nordic nation's yearning to be free of St Petersburg's grip. To evade the Tsarist censors it was performed under disguised titles such as 'Happy Feelings at the Awakening of Finnish Spring,' turning resistance to Russian domination into pure sound. That resonance is uncannily apt now, as Sweden, Finland's Nordic neighbour, sends Gripen fighters to help Ukraine withstand a Russian assault and Nordic solidarity rallies to a besieged partner. Where Sibelius answered oppression with a melody of hope, today's coalition answers it with aircraft. The stirring 'Finlandia Hymn' remains, more than a century on, a musical emblem of the north defying Moscow.",
        "excerpt": "The work opens with brooding, growling brass that evokes oppression, then erupts into a turbulent, agitated allegro before resolving into the serene, hymn-like theme that has come to stand for a small nation's freedom. It is wordless defiance, a whole people's resolve compressed into some eight minutes of orchestral sound.",
        "source": "Jean Sibelius, Finlandia, Op. 26 (1899–1900), orchestral tone poem.",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)",
        "image": {
          "src": "/covers/uk-gripen-jets-ukraine--a5.png",
          "alt": "Portrait photograph of the Finnish composer Jean Sibelius, 1913.",
          "credit": "Photograph by Daniel Nyblin, 1913, public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "poland-teen-russia-sabotage",
    "headline": "Poland charges an 18-year-old recruited by Russia over sabotage and the desecration of war memorials",
    "overview": "Poland's Internal Security Agency (ABW) charged an 18-year-old Ukrainian national, identified under Polish privacy law as Illia K., with 47 offences committed between November 2024 and August 2025, including desecrating memorials to Poles killed in the World War Two Volhynia massacres and preparing acts of sabotage with a drone. Investigators said he was recruited online and paid in cryptocurrency through exchanges tied to Russia and China, and that the aim was to inflame ethnic hatred between Poland and Ukraine. The case is the latest that Warsaw attributes to a Russian campaign to sow division among Kyiv's allies.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cp305dx493do"
      },
      {
        "name": "Kyiv Independent",
        "href": "https://kyivindependent.com/poland-arrests-ukrainian-teenager-accused-of-russian-backed-sabotage/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/poland-teen-russia-sabotage.png",
      "alt": "A monument to victims of the wartime Volhynia massacres at a Polish cemetery.",
      "credit": "Wikimedia Commons"
    },
    "rank": 29,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On a single night in 415 BC, as Athens prepared to launch its great fleet against Sicily, unknown hands mutilated the Hermae, the sacred stone pillars of Hermes standing at doorways across the city. Thucydides records that the desecration was read not as vandalism but as an omen and evidence of a conspiracy to overthrow the democracy, unleashing informers, show trials and a witch-hunt that helped drive the brilliant Alcibiades to defect to Sparta. The defiling of civic monuments became a weapon that poisoned Athens against itself on the eve of war. Like Illia K.'s attacks on Polish war memorials, the Herm-smashing turned sacred stones into detonators of mass suspicion, exactly the fracturing an enemy hopes to provoke. In both cases the outrage over defaced monuments did as much political damage as any act of arms.",
        "excerpt": "The matter was taken up the more seriously, as it was thought to be ominous for the expedition, and part of a conspiracy to bring about a revolution and to upset the democracy.",
        "source": "Thucydides, History of the Peloponnesian War, Book 6.27 (Richard Crawley translation)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_6"
      },
      {
        "category": "historical",
        "title": "In November 1605 a cell of English Catholic conspirators, with Guy Fawkes stationed beneath the House of Lords guarding thirty-six barrels of gunpowder, prepared to blow up King, Lords and Commons at the opening of Parliament. Backed by hopes of foreign Catholic support and radicalized abroad, the plotters were caught in the final hours before the sabotage could be executed, and King James I addressed Parliament days later describing the intended horror. The Gunpowder Plot fixed in memory the image of a covert cell readying a spectacular act of destruction against the state. Illia K., charged with 47 acts including preparing drone sabotage while directed from outside the country, is a modern heir to Fawkes: an agent apprehended in the preparatory phase, his devices staged but not yet fired. Both cases show sabotage foiled at the threshold, and both were seized upon to inflame communal hatred.",
        "excerpt": "This was not a crying sin of bloud as the former, but it may well be called a roaring, nay, a thundering sin of Fire and Brimstone.",
        "source": "King James I, Speech to Parliament on the Gunpowder Plot, 9 November 1605",
        "href": "https://famous-trials.com/gunpowder/2768-speech-of-king-james-to-parliament-regarding-gunpowder-plot",
        "image": {
          "src": "/covers/poland-teen-russia-sabotage--a1.png",
          "alt": "Engraving of the eight Gunpowder Plot conspirators, 1605, by Crispijn van de Passe the Elder.",
          "credit": "Crispijn van de Passe the Elder, 'The Gunpowder Plot Conspirators' (1605); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Book II of Virgil's Aeneid, the Greeks abandon a giant wooden horse outside Troy, and the priest Laocoon warns his countrymen that the gift conceals armed enemies and begs them not to admit it within the walls. His caution is drowned out by the false captive Sinon, whose tears and fabricated tale persuade the Trojans to breach their own defenses and drag destruction inside the city. The horse is the original fifth column: an instrument of a foreign power smuggled past the gates by deception. Russia's recruitment of Illia K. works the same logic, planting an agent inside Poland to detonate hostility between Poles and Ukrainians from within. As with Sinon, the danger is not the visible army but the persuasive lie and the hidden hand that turns a people's own trust against them.",
        "excerpt": "This hollow fabric either must inclose,\nWithin its blind recess, our secret foes;\nOr 'tis an engine rais'd above the town,\nT' o'erlook the walls, and then to batter down.\nSomewhat is sure design'd, by fraud or force:\nTrust not their presents, nor admit the horse.",
        "source": "Virgil, Aeneid, Book II, trans. John Dryden",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt",
        "image": {
          "src": "/covers/poland-teen-russia-sabotage--a2.png",
          "alt": "Giovanni Domenico Tiepolo's painting of the wooden horse being wheeled into Troy.",
          "credit": "Giovanni Domenico Tiepolo, 'The Procession of the Trojan Horse in Troy' (c. 1760), National Gallery, London; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Othello, the ensign Iago, professing loyalty while confessing 'I am not what I am,' engineers the ruin of people who trust him by poisoning them with manufactured suspicion. In his soliloquy closing Act 2, he vows to turn Desdemona's own virtue into the snare that entangles Othello, Cassio and Desdemona alike, converting love and honor into jealousy and murder. Iago is the archetype of the agitator who profits by setting allies at one another's throats through insinuation rather than open attack. That is precisely the design behind Illia K.'s handlers: not to conquer, but to make Poles and Ukrainians, natural partners against Russia, distrust and hate each other. Iago's craft, like online recruitment paid in crypto, shows how cheaply a single manipulator can weaponize the good faith between neighbors.",
        "excerpt": "So will I turn her virtue into pitch,\nAnd out of her own goodness make the net\nThat shall enmesh them all.",
        "source": "William Shakespeare, Othello, Act 2, Scene 3 (Iago's soliloquy); 'I am not what I am,' Act 1, Scene 1",
        "href": "https://www.gutenberg.org/files/1531/1531-h/1531-h.htm",
        "image": {
          "src": "/covers/poland-teen-russia-sabotage--a3.png",
          "alt": "Othello and Desdemona, whom Iago destroys through manufactured jealousy.",
          "credit": "Otello and Desdemona, after a painting by Becker, in The Victrola Book of the Opera; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Francisco Goya's 'Fight with Cudgels' (Duelo a garrotazos, c. 1820-1823), one of the Black Paintings he painted onto the walls of his house outside Madrid, shows two men clubbing each other bloody while sunk knee-deep in mud, unable to flee or step apart. Painted after the trauma of the Peninsular War and Spain's civil strife, it is a merciless emblem of fratricidal violence in which both combatants are trapped and doomed. The image captures exactly what Russia sought to manufacture between Poland and Ukraine: two peoples mired in shared history and beating each other while a third party looks on. Illia K.'s desecration of Volhynia-massacre memorials was designed to sink Poles and Ukrainians into just such a mutual, self-destructive brawl. Goya shows the endgame of incited hatred, neighbors locked in a fight neither can win.",
        "excerpt": "Goya painted two peasants bludgeoning each other with clubs, their legs swallowed by the earth so that neither can retreat, a stark parable of civil hatred in which the real victory belongs only to whoever set them fighting.",
        "source": "Francisco de Goya, Fight with Cudgels (Duelo a garrotazos), c. 1820-1823, Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:Francisco_de_Goya_y_Lucientes_-_Duelo_a_garrotazos.jpg",
        "image": {
          "src": "/covers/poland-teen-russia-sabotage--a4.png",
          "alt": "Goya's Black Painting of two men fighting with clubs while trapped up to their knees in mud",
          "credit": "Francisco de Goya, Fight with Cudgels (c. 1820-1823), Museo del Prado, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky's opera 'Boris Godunov' (1874) dramatizes the Time of Troubles, when Grigory Otrepyev, a young runaway monk, is transformed into the False Dmitri, a pretender claiming to be the murdered tsarevich. Backed by Poland and marched east to destabilize Russia, this fabricated youth becomes the living instrument of a foreign power's ambitions, plunging the realm into chaos and war. The parallel to Illia K. is uncanny in reverse: then a young man was made into a weapon aimed across the Polish-Russian frontier, now Russia forges a young Ukrainian into a tool aimed back the other way. Mussorgsky's drama, built on Pushkin, shows how empires manufacture and deploy expendable young agents to inflame a neighboring nation. The recruited pretender, like the crypto-paid teenager, is used and ultimately discarded by his sponsors.",
        "excerpt": "Mussorgsky sets the impostor Dmitri against the guilt-haunted tsar, letting a manufactured young pretender, propped up by a foreign court, ignite a war that consumes a kingdom, the recruited agent as the spark others strike.",
        "source": "Modest Mussorgsky, Boris Godunov (opera, 1874), after Alexander Pushkin's drama",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)",
        "image": {
          "src": "/covers/poland-teen-russia-sabotage--a5.png",
          "alt": "Feodor Chaliapin costumed as Boris Godunov in Mussorgsky's opera",
          "credit": "Feodor Chaliapin as Boris Godunov (1916), photo by Lev Leonidov, via Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "france-fontainebleau-arson",
    "headline": "A volunteer firefighter is charged with starting the Fontainebleau forest fire as Macron vows zero tolerance for arson",
    "overview": "An 18-year-old volunteer firefighter was placed under formal investigation and remanded in custody over a blaze that tore through more than 2,000 hectares of France's historic Fontainebleau forest, a UNESCO biosphere reserve south of Paris; he confessed to setting fire to twigs with a lighter and petrol before retracting the admission. Six people in total have been detained in the wider arson inquiry. Amid record heat and the worst wildfire season since the Second World War, with some 35,000 hectares burned nationwide, President Emmanuel Macron pledged zero tolerance for those who start fires.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce97zd8yx1xo"
      },
      {
        "name": "The Local France",
        "href": "https://www.thelocal.fr/20260716/macron-pledges-zero-tolerance-for-arson-after-spate-of-fires-in-france"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/france-fontainebleau-arson.png",
      "alt": "Smoke and flames rising through the Fontainebleau forest during the July 2026 fire.",
      "credit": "Wikimedia Commons"
    },
    "rank": 30,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On a night in 356 BC a young Ephesian named Herostratus set fire to the Temple of Artemis, one of the Seven Wonders of the ancient world, confessing that he did it for one reason only: to make his name immortal. The outraged Ephesians executed him and passed a decree forbidding anyone ever to speak his name, yet the historian Theopompus recorded it and it survives to this day. Like the 18-year-old volunteer firefighter accused of igniting the UNESCO-listed Fontainebleau forest, Herostratus is the archetypal firestarter whose target is precisely what a whole society holds sacred. The geographer Strabo, writing three centuries later, notes flatly that the sanctuary was torched and then rebuilt grander than before. The wound, as with a 2,000-hectare loss of ancient woodland, was to a shared inheritance that no rebuilding fully restores.",
        "excerpt": "But when it was set on fire by a certain Herostratus, the citizens erected another and better one, having collected the ornaments of the women and their own individual belongings, and having sold also the pillars of the former temple.",
        "source": "Strabo, Geography 14.1.22, trans. H. L. Jones (Loeb Classical Library), via Bill Thayer's LacusCurtius.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/14A*.html",
        "image": {
          "src": "/covers/france-fontainebleau-arson--a0.png",
          "alt": "A 1572 engraving imagining the Temple of Artemis at Ephesus, with figures setting the wonder ablaze.",
          "credit": "Philip Galle after Maarten van Heemskerck, 'Temple of Artemis at Ephesus' (1572), public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Great Fire of London, 2-5 September 1666, broke out in Thomas Farriner's bakery on Pudding Lane and consumed some 13,000 houses and medieval St Paul's Cathedral before it was checked. Samuel Pepys watched from a boat on the Thames, buried his wine and Parmesan cheese in his garden, and recorded the pigeons that clung to their eaves until their wings caught fire. In the panic Londoners hunted for arsonists and lynched foreigners; a French watchmaker, Robert Hubert, gave a false confession and was hanged for a fire he could not have started. The episode prefigures the Fontainebleau blaze on every axis: a beloved landscape devoured, a public terror of the incendiary, and a lone suspect whose confession did not fit the facts, set against a leader's demand for exemplary punishment.",
        "excerpt": "Everybody endeavouring to remove their goods, and flinging into the river or bringing them into lighters that layoff; poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another. And among other things, the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.",
        "source": "Samuel Pepys, The Diary of Samuel Pepys, entry for Sunday 2 September 1666.",
        "href": "https://www.pepysdiary.com/diary/1666/09/02/",
        "image": {
          "src": "/covers/france-fontainebleau-arson--a1.png",
          "alt": "An anonymous c.1675 painting of the Great Fire of London seen from the Thames near Tower Wharf, the skyline a wall of flame.",
          "credit": "Unknown artist, 'The Great Fire of London' (c.1675), Museum of London; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book II of Virgil's Aeneid (composed c. 29-19 BC), Aeneas recounts to Dido the night Troy fell, after the Trojans themselves wheeled the wooden horse inside their own walls and loosed the Greeks hidden within. The guardians of the city thus become the instruments of its ruin, and by dawn the flames, whipped by wind and 'Vulcan's rage,' roll like a flood toward the palace of Anchises. Dryden's 1697 translation renders the conflagration as a living beast that devours the standing corn and the sleeping town alike. The image of a great, protected place consumed from within maps onto Fontainebleau's ancient forest, and onto the paradox of a sworn protector accused of loosing the fire. Troy's burning is Western literature's founding scene of a homeland turned to ash.",
        "excerpt": "He said. The crackling flames appear on high. / And driving sparkles dance along the sky. / With Vulcan's rage the rising winds conspire, / And near our palace roll the flood of fire.",
        "source": "Virgil, Aeneid, Book II, trans. John Dryden (1697); Project Gutenberg eBook #228.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt",
        "image": {
          "src": "/covers/france-fontainebleau-arson--a2.png",
          "alt": "A late-16th-century landscape of Troy engulfed in fire beneath a smoke-blackened sky.",
          "credit": "Kerstiaen de Keuninck, 'The Fire of Troy' (late 16th century), public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ray Bradbury's 1953 novel Fahrenheit 451 imagines a future in which 'firemen' no longer put out fires but start them, burning outlawed books and the houses that conceal them. Its protagonist, Guy Montag, wears a salamander badge and wields a kerosene hose, taking a craftsman's pleasure in destruction until doubt undoes him. The premise is an exact inversion of the guardian into the incendiary, the same reversal that shocks in the Fontainebleau case, where an 18-year-old volunteer firefighter stands accused of setting the forest he had pledged to defend. Bradbury makes arson a uniformed public duty rather than a crime, forcing the question of what happens when the protector's authority becomes the very means of the harm. It is the definitive modern fable of the firefighter as firestarter.",
        "excerpt": "Bradbury's firemen are the state's arsonists in reverse-uniform: their engines carry kerosene, not water, and their sworn task is to reduce forbidden libraries to ash. Montag's slow horror at what his badge licenses mirrors the unease of a community learning that one of its own rescuers may have struck the match. The book turns the trusted extinguisher of flame into its most efficient bringer.",
        "source": "Ray Bradbury, Fahrenheit 451 (Ballantine Books, 1953).",
        "href": "https://en.wikipedia.org/wiki/Fahrenheit_451"
      },
      {
        "category": "artistic",
        "title": "When the Palace of Westminster caught fire on the night of 16 October 1834, J. M. W. Turner joined the crowds along the Thames and afterward painted two oil canvases of the inferno, now in the Philadelphia and Cleveland museums of art. His brush dissolves the solid Gothic stone of the Houses of Lords and Commons into a roaring furnace of white and orange, its reflection smeared across the black river. The seat of the nation's lawmakers, its very guardians, is shown liquefied by flame, an emblem of order and heritage undone in a night. Turner painting an actual, witnessed conflagration parallels the news imagery of Fontainebleau burning, where a national treasure met the same fate. Fire in his hands is sublime and terrible at once, exactly the double face it wears in the Fontainebleau story.",
        "excerpt": "Turner's canvas turns architecture into weather: the Houses of Parliament are barely legible, a pale skeleton swallowed by a column of incandescent heat that stains the sky and the Thames alike. Spectators crowd the near bank as tiny dark shapes, dwarfed by the blaze. The painting insists that fire is both spectacle and catastrophe.",
        "source": "J. M. W. Turner, 'The Burning of the Houses of Lords and Commons, 16 October 1834' (oil on canvas, 1834-35), Philadelphia Museum of Art.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/france-fontainebleau-arson--a4.png",
          "alt": "Turner's painting of the Houses of Parliament dissolving into a blaze of white and orange fire above the Thames.",
          "credit": "J. M. W. Turner, 'The Burning of the Houses of Lords and Commons' (1834-35), Philadelphia Museum of Art; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In Richard Wagner's Der Ring des Nibelungen, fire is the element of Loge, the flickering demigod who is at once servant, tool and menace. At the close of Die Walkure (1870) the god Wotan punishes his daughter Brunnhilde by ringing her rock with Loge's flames, a wall that both protects and imprisons her, crying 'Loge! Loge! Appear!' The whole four-opera cycle then ends in Gotterdammerung with a funeral pyre that consumes Valhalla and the gods themselves, the guardians destroyed by their own fire. This is fire as both instrument and terror, and the divine protectors undone by the very force they command, a mythic mirror of a firefighter charged with arson amid what Macron called France's worst wildfire season since the Second World War. Arthur Rackham's 1910 illustration captures Wotan summoning the encircling flame.",
        "excerpt": "Appear, flickering fire, / Encircle the rock with thy flame! / Loge! Loge! Appear!",
        "source": "Richard Wagner, Der Ring des Nibelungen - Die Walkure (1870); English text trans. Margaret Armour, illustrated by Arthur Rackham, 'The Rhinegold & The Valkyrie' (1910).",
        "href": "https://commons.wikimedia.org/wiki/File:Rhinegold_and_the_Valkyries_p_156.jpg",
        "image": {
          "src": "/covers/france-fontainebleau-arson--a5.png",
          "alt": "Arthur Rackham's 1910 illustration of Wotan summoning Loge's magic fire to encircle the sleeping Brunnhilde on her rock.",
          "credit": "Arthur Rackham, illustration for 'The Rhinegold & The Valkyrie' (1910); public domain via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "new-zealand-earthquake",
    "headline": "A magnitude-5.9 earthquake shakes New Zealand's South Island near Te Anau, briefly triggering a tsunami warning",
    "overview": "A strong earthquake struck about 40 km north of Te Anau, the gateway to New Zealand's Fiordland region, at 9:14pm local time, shaking buildings across the South Island and prompting authorities to issue a tsunami warning that was cancelled soon after. The National Emergency Management Agency initially assessed the quake at magnitude 6.3 before revising it down to 5.9, and warned of strong and unusual currents at the shore. There were no immediate reports of injuries or serious damage.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxNeW1UaGdnakdTVjQxaGZxbGE2YTJSWkotZW9aOHUwaWFsNF84ci1Bb0sxbDdNNF9Lc2VQU2lNM3pKcHp1aUo1dEljazhQTUxTUk45STRpMXo1aHAzTlJVWDhjM3ItSFNabHhjcGl1ejFWYnZ3ZFdjblcxU1N5Tm9ndjJMQlN3TDZJcW9PRFlkdHQtME1UbUVwQWk1VWVKNVhlbm5FMXh0M2JfbWhMM004REdoRHZ2aXdIOWVJbFBsNEY?oc=5"
      },
      {
        "name": "NZ City",
        "href": "https://home.nzcity.co.nz/news/article.aspx?id=450058&fm=psp%2Ctsp"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/new-zealand-earthquake.png",
      "alt": "A seismograph trace recording a New Zealand earthquake.",
      "credit": "Wikimedia Commons"
    },
    "rank": 31,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "At dawn on 21 July 365 AD one of antiquity's greatest earthquakes, now estimated above magnitude 8, ruptured the seafloor near Crete and hurled a tsunami across the eastern Mediterranean. The Roman historian Ammianus Marcellinus, writing within a generation, described the sea recoiling from the land to bare its muddy depths, then surging back to fling ships onto rooftops at Alexandria and drown thousands; the city long marked the anniversary as a 'day of horror.' That is precisely the sequence Fiordland briefly feared on the night of the magnitude-5.9 Te Anau quake, the ground convulsing while the sea threatened to answer with a wave. New Zealand's warning of strong, unusual currents was cancelled without harm, only sharpening the ancient contrast, where no siren warned anyone at all. Then as now, humanity stood small before a trembling earth and an unquiet sea.",
        "excerpt": "For a little before sunrise there was a terrible earthquake, preceded by incessant and furious lightning. The sea was driven backwards, so as to recede from the land, and the very depths were uncovered, so that many marine animals were left sticking in the mud... Many ships were stranded on the dry shore... In another quarter the waves, as if raging against the violence with which they had been driven back, rose, and swelling over the boiling shallows, beat upon the islands and the extended coasts of the mainland, levelling cities and houses wherever they encountered them.",
        "source": "Ammianus Marcellinus, Roman History (Res Gestae), Book XXVI.10.15–19, trans. C. D. Yonge (1862)",
        "href": "https://www.tertullian.org/fathers/ammianus_26_book26.htm",
        "image": {
          "src": "/covers/new-zealand-earthquake--a0.png",
          "alt": "A page from the ninth-century Codex Vaticanus lat. 1873, the manuscript preserving Ammianus Marcellinus's Roman History.",
          "credit": "Ammianus Marcellinus, Codex Vaticanus lat. 1873. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On the morning of 1 November 1755, All Saints' Day, an earthquake of roughly magnitude 8.5 destroyed Lisbon; some forty minutes later a tsunami surged up the Tagus, and fires then burned for days, killing tens of thousands. The English resident Reverend Charles Davy left a celebrated eyewitness letter describing the walls rocking, then a general cry that the sea was coming in as the river rose 'like a mountain' and rushed the shore. The catastrophe shattered Enlightenment optimism and provoked Voltaire and Kant to wrestle with nature's indifferent power. Te Anau's residents, feeling their houses shake at 9:14pm and hearing a tsunami warning issued, relived in miniature that primal sequence of tremor and then dread of the wave. Here, mercifully, the warning was lifted and no wave came.",
        "excerpt": "I heard a general outcry, \"The sea is coming in, we shall be all lost.\" Upon this, turning my eyes towards the river, which in that place is nearly four miles broad, I could perceive it heaving and swelling in the most unaccountable manner, as no wind was stirring. In an instant there appeared, at some small distance, a large body of water, rising as it were like a mountain. It came on foaming and roaring, and rushed towards the shore with such impetuosity, that we all immediately ran for our lives.",
        "source": "Rev. Charles Davy, eyewitness account of the Lisbon earthquake of 1 November 1755 (published 1755)",
        "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp",
        "image": {
          "src": "/covers/new-zealand-earthquake--a1.png",
          "alt": "Jacques-Philippe Le Bas's 1757 engraving of the ruined Ópera do Tejo in Lisbon after the 1755 earthquake.",
          "credit": "Jacques-Philippe Le Bas, ruins of the Ópera do Tejo, 1757 engraving. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Psalm 46, one of the Hebrew Bible's great hymns of confidence, imagines the very worst nature can do, the earth removed, mountains toppling into the sea, and the waters roaring, and answers it with trust rather than terror. Its imagery of quaking ground and swelling, thundering water maps directly onto the Te Anau event: the trembling earth of Fiordland and the warning of surging, unusual seas. Written millennia before seismology, it names humanity's oldest instinct when the ground moves, the fear that the mountains themselves might slide into the ocean. The psalm's refusal to fear is precisely the composure New Zealanders were asked to hold as the tsunami alert was assessed and then cancelled. Martin Luther later drew his hymn 'Ein feste Burg' from this same text.",
        "excerpt": "God is our refuge and strength, a very present help in trouble. Therefore will not we fear, though the earth be removed, and though the mountains be carried into the midst of the sea; Though the waters thereof roar and be troubled, though the mountains shake with the swelling thereof. Selah.",
        "source": "Psalm 46:1–3, King James Version (1611)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms",
        "image": {
          "src": "/covers/new-zealand-earthquake--a2.png",
          "alt": "John Martin's apocalyptic painting 'The Great Day of His Wrath,' with mountains crashing into a churning sea.",
          "credit": "John Martin, 'The Great Day of His Wrath' (c.1851), Tate Britain. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book 20 of Homer's Iliad, as the gods enter the battle for Troy, Zeus thunders from heaven while Poseidon the Earth-Shaker makes the vast earth and the peaks of Ida quake, and Hades leaps from his throne in terror lest the ground crack open above the realm of the dead. Composed perhaps in the eighth century BC, it is one of literature's most vivid figures of an earthquake as raw divine power before which even a god panics. That primal dread of the ground splitting is what a magnitude-5.9 jolt near Te Anau momentarily awakened, earth and sea seeming to stir at once. For the Greeks, Poseidon ruled both earthquake and wave, the same twin threat behind Fiordland's brief tsunami warning. Humanity's smallness before the trembling earth could hardly be drawn more starkly.",
        "excerpt": "The sire of gods and men thundered from heaven above, while from beneath Neptune shook the vast earth, and bade the high hills tremble. The spurs and crests of many-fountained Ida quaked, as also the city of the Trojans and the ships of the Achaeans. Hades, king of the realms below, was struck with fear; he sprang panic-stricken from his throne and cried aloud in terror lest Neptune, lord of the earthquake, should crack the ground over his head, and lay bare his mouldy mansions to the sight of mortals and immortals.",
        "source": "Homer, Iliad, Book XX, trans. Samuel Butler (1898)",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt",
        "image": {
          "src": "/covers/new-zealand-earthquake--a3.png",
          "alt": "Roman-era marble bust traditionally identified as the poet Homer, held in the British Museum.",
          "credit": "Bust of Homer, British Museum; photo by JW1805 (2005), via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Katsushika Hokusai's woodblock print 'Under the Wave off Kanagawa,' the Great Wave, from his Thirty-six Views of Mount Fuji (c.1831), is the world's most famous image of the sea's sudden, indifferent power. A towering wave with clawing foam curls over three slender boats and their crouching boatmen, dwarfing even the distant, snow-capped Mount Fuji. The composition captures exactly the fear that flickered across Fiordland when a tsunami warning followed the Te Anau quake, the possibility that the ordinary sea might rear into a wall of water. Hokusai's fishermen, tiny beneath the crest, embody humanity's smallness before an ocean that neither hates nor spares. The wave never broke over Te Anau, but for a few minutes its shadow was felt.",
        "excerpt": "Hokusai freezes the instant before impact: a colossal breaker, its crest splintering into finger-like claws of foam, hangs over boats of oarsmen who bow low and vanish into the trough. Serene Mount Fuji sits small and still on the horizon, utterly outscaled by the water. The print turns the tsunami dread of a coastal night into a single, unforgettable silhouette of nature's overwhelming force.",
        "source": "Katsushika Hokusai, 'Under the Wave off Kanagawa' (The Great Wave), from Thirty-six Views of Mount Fuji, c.1830–1833",
        "href": "https://commons.wikimedia.org/wiki/File:Great_Wave_off_Kanagawa2.jpg",
        "image": {
          "src": "/covers/new-zealand-earthquake--a4.png",
          "alt": "Hokusai's Great Wave, a giant clawing wave towering over small boats with Mount Fuji in the distance.",
          "credit": "Katsushika Hokusai, 'Under the Wave off Kanagawa' (c.1831), Library of Congress. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "This anonymous copper engraving, made in 1755, is the defining visual record of the Lisbon disaster: the city collapsing and ablaze, the Tagus whipped into churning water that swamps and sinks ships, and panicked figures fleeing in the foreground. Held today in the Museu da Cidade in Lisbon, it fuses the two terrors of that day, the splitting earth and the invading sea, into a single indelible scene. It renders in art precisely the compound threat that New Zealand's authorities weighed on the night of the Te Anau quake, when a tsunami warning and alerts of strong, unusual currents accompanied the shaking. The engraving's foreground panic is the human constant across every such event, from 1755 to 2026. In Fiordland the sea stayed its hand and the warning was withdrawn.",
        "excerpt": "The engraving shows Lisbon at the instant of ruin: towers toppling, flames leaping from broken houses, and the harbour water heaved into violent surges that capsize and sink ships at their moorings. In the foreground, tiny human figures scatter in terror, arms flung up, as the earth and the sea turn on the city at once. It is the earthquake and its tsunami compressed into one apocalyptic tableau.",
        "source": "Anonymous copper engraving, 1755, depicting the Lisbon earthquake and tsunami; Museu da Cidade, Lisbon",
        "href": "https://commons.wikimedia.org/wiki/File:1755_Lisbon_earthquake.jpg",
        "image": {
          "src": "/covers/new-zealand-earthquake--a5.png",
          "alt": "1755 copper engraving of Lisbon in ruins and flames, with a tsunami sinking ships and people fleeing in panic.",
          "credit": "Anonymous copper engraving, 1755, Museu da Cidade, Lisbon. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "merck-oral-cholesterol-pill",
    "headline": "The FDA approves Merck's Lipfendra, the first oral PCSK9 inhibitor to lower cholesterol",
    "overview": "The U.S. Food and Drug Administration approved Merck's once-daily pill enlicitide, branded Lipfendra, the first oral drug in the PCSK9-inhibitor class, which until now was available only as injections. In late-stage trials the tablet cut LDL, or 'bad' cholesterol, by 56% to 59% versus placebo in adults with high cholesterol, including people with inherited familial hypercholesterolemia. Analysts see the pill, taken as a 20 mg daily tablet, as a potential blockbuster that could broaden access to a powerful cholesterol-lowering therapy.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNLVVrMEhiYUJsRW5aTnhRMjJsMHpYTEdsUC00dzdUNUNGYXljTzNTeEc3Nmw2ZkV5RmZHRmhabHBub0FhZDVWTW83dmUwMkJoaGJYT1dmZndsUmNjenlQOWxFQzF4engwMktlb1pEQzJHU0ZQelhoVTQ0aFZtX3AyY1ozOEF1MmgzX3JvQlVfWENtcGJFYXppS0l1cmRQZw?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/16/health/merck-cholesterol-pill-enlicitide"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/merck-oral-cholesterol-pill.png",
      "alt": "Capsules spilling from a medicine bottle.",
      "credit": "Wikimedia Commons"
    },
    "rank": 32,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1628 the English physician William Harvey published Exercitatio Anatomica de Motu Cordis et Sanguinis in Animalibus, proving through dissection and measurement that the heart is a pump driving the blood ceaselessly around a closed circle. His work overturned Galen's 1,400-year-old doctrine and established the circulatory system that every modern cardiologist now takes for granted. Harvey's insight that substances travel the same continuous circuit is the intellectual bedrock on which a drug like enlicitide acts, clearing LDL cholesterol from the very bloodstream he first mapped. Just as Harvey turned the heart from a mystical organ into a knowable machine, Merck's Lipfendra turns the once injectable-only PCSK9 pathway into a daily pill. Both are moments when the diseases of the heart and blood yielded a little further to human understanding.",
        "excerpt": "I began to think whether there might not be a motion, as it were, in a circle.",
        "source": "William Harvey, Exercitatio Anatomica de Motu Cordis et Sanguinis in Animalibus (Frankfurt, 1628); Robert Willis trans., 'An Anatomical Disquisition on the Motion of the Heart and Blood in Animals,' Chapter VIII.",
        "href": "https://www.gutenberg.org/cache/epub/67065/pg67065.txt",
        "image": {
          "src": "/covers/merck-oral-cholesterol-pill--a0.png",
          "alt": "Oil portrait of William Harvey, discoverer of the circulation of the blood, c. 1627.",
          "credit": "Attributed to Daniël Mijtens, c. 1627, National Portrait Gallery, London (NPG 5115); public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Beginning in 1971 at Japan's Sankyo company, the microbiologist Akira Endo screened thousands of fungal broths for a compound that could block HMG-CoA reductase, the key enzyme of cholesterol synthesis. By the end of 1973 he had isolated the first statin, compactin (ML-236B, or mevastatin), from the mold Penicillium citrinum, founding the drug class that would go on to save tens of millions of lives. Endo's quest — a lone researcher hunting a molecule to tame 'bad' cholesterol — is the direct ancestor of the 2026 approval of enlicitide. Where statins throttle the liver's production of cholesterol, Merck's oral PCSK9 inhibitor helps the liver clear LDL from the blood, and for the first time delivers that newer mechanism as a swallowable pill rather than an injection. The line runs straight from Endo's Petri dishes to Lipfendra's blister pack.",
        "excerpt": "More than fifty years after Endo bent over his culture plates, his lonely hunt for a mold that could lower cholesterol has become the template for a whole pharmacopoeia of the heart. Enlicitide extends that lineage: not a fungal metabolite but an engineered oral molecule, achieving in a once-daily tablet what once required a needle.",
        "source": "'Akira Endo: Father of Statins,' Cureus, vol. 16, no. 8 (August 30, 2024).",
        "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11439472/",
        "image": {
          "src": "/covers/merck-oral-cholesterol-pill--a1.png",
          "alt": "Chemical structure of mevastatin (compactin, ML-236B), the first statin isolated by Akira Endo.",
          "credit": "Structure of mevastatin; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Around 600 BCE the prophet Jeremiah cried out over a stricken people, 'Is there no balm in Gilead; is there no physician there?' — invoking the fragrant healing resin of Gilead as the age-old emblem of a longed-for cure. For millennia the phrase has stood for the ache of incurable suffering and the hope of a remedy that finally arrives. The FDA's approval of enlicitide answers that ancient question for millions with dangerously high cholesterol, including those born with familial hypercholesterolemia who inherit early heart attacks. Where Jeremiah's generation had only the balm of Gilead, such patients now have a once-daily pill that cuts LDL by well over half. It is the modern balm: a remedy carried, at last, into the house of the sick.",
        "excerpt": "Is there no balm in Gilead; is there no physician there? why then is not the health of the daughter of my people recovered?",
        "source": "The Holy Bible, King James Version (1611), Jeremiah 8:22.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jeremiah",
        "image": {
          "src": "/covers/merck-oral-cholesterol-pill--a2.png",
          "alt": "Rembrandt's painting of the prophet Jeremiah lamenting the destruction of Jerusalem, 1630.",
          "credit": "Rembrandt van Rijn, 'Jeremiah Lamenting the Destruction of Jerusalem,' 1630, Rijksmuseum; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ben Jonson's 1610 comedy The Alchemist skewers the era's dream of the philosopher's stone — the fabled substance that would transmute metals into gold and, as the deluded knight Sir Epicure Mammon boasts, cure every disease and restore youth itself. Mammon rhapsodizes that the elixir 'Cures all diseases coming of all causes,' collapsing a month's grief into a single day. Jonson mocked the charlatans peddling this fantasy, yet the underlying yearning — one remedy to defeat sickness and extend life — is exactly what modern science has slowly made real. Enlicitide is no mystical elixir, but it fulfills a sliver of Mammon's dream: a small daily dose that measurably beats back a lethal condition of the blood. The alchemist's fraudulent panacea has become, four centuries on, an FDA-approved pill.",
        "excerpt": "'Tis the secret / Of nature naturis'd 'gainst all infections, / Cures all diseases coming of all causes; / A month's grief in a day, a year's in twelve; / And, of what age soever, in a month.",
        "source": "Ben Jonson, The Alchemist (first performed 1610; printed 1612), Act II, Scene 1 (Sir Epicure Mammon).",
        "href": "https://www.gutenberg.org/files/4081/4081-h/4081-h.htm",
        "image": {
          "src": "/covers/merck-oral-cholesterol-pill--a3.png",
          "alt": "Joseph Wright of Derby's painting of an alchemist in his laboratory discovering phosphorus, 1771.",
          "credit": "Joseph Wright of Derby, 'The Alchymist, in Search of the Philosopher's Stone,' 1771, Derby Museum and Art Gallery; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Rembrandt van Rijn's 1632 masterpiece The Anatomy Lesson of Dr. Nicolaes Tulp, now in the Mauritshuis in The Hague, shows the celebrated Amsterdam physician dissecting a cadaver's forearm before a circle of rapt colleagues. The painting is a monument to the dawn of empirical medicine, the moment European science began to open the body and read its mechanisms directly. Tulp's illuminated hands, poised over the exposed tendons, embody the healer's quest to understand the flesh in order to mend it. That same investigative impulse — trace the mechanism, then intervene — produced Merck's oral PCSK9 inhibitor, which acts on a molecular pathway invisible to Tulp but continuous with his project. Where Tulp's students leaned in to see a sinew, today's researchers peer at the receptors that govern cholesterol in the blood.",
        "excerpt": "Under a shaft of light, Dr. Tulp lifts the dissected muscles of a corpse's forearm with forceps while seven Amsterdam surgeons crane forward, their faces caught between curiosity and awe. The open anatomy book at the cadaver's feet and the exact rendering of every sinew announce a new age in which the body is studied, not merely revered.",
        "source": "Rembrandt van Rijn, The Anatomy Lesson of Dr. Nicolaes Tulp, 1632, oil on canvas, Mauritshuis, The Hague (inv. 146).",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg",
        "image": {
          "src": "/covers/merck-oral-cholesterol-pill--a4.png",
          "alt": "Rembrandt's 1632 group portrait showing Dr. Nicolaes Tulp dissecting a cadaver's arm before onlooking surgeons.",
          "credit": "Rembrandt van Rijn, 'The Anatomy Lesson of Dr. Nicolaes Tulp,' 1632, Mauritshuis, The Hague; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Samuel Luke Fildes's 1891 painting The Doctor, held at Tate Britain in London, depicts a Victorian physician keeping vigil at the bedside of a gravely ill child while the helpless parents wait in shadow. Painted in the era before antibiotics, it captures medicine's agonizing limits — a devoted doctor who can watch and comfort but cannot cure. Fildes drew on the death of his own young son, and the work became a beloved symbol of the caring but often powerless healer. The approval of enlicitide marks how far that vigil has traveled: the modern physician can now hand a patient a pill that removes a hidden killer from the blood long before it reaches the bedside. The lamp-lit helplessness of Fildes's doctor gives way to the quiet power of prevention.",
        "excerpt": "A bearded doctor sits forward on a plain chair, chin on hand, studying a child who lies feverish across two mismatched chairs as the first dawn light seeps through the cottage window. Behind him a mother buries her face in her arms while the father rests a hand on her shoulder, the whole scene suspended between dread and hope.",
        "source": "Samuel Luke Fildes, The Doctor, 1891, oil on canvas, Tate Britain, London (N01522).",
        "href": "https://commons.wikimedia.org/wiki/File:The_Doctor_Luke_Fildes_crop.jpg",
        "image": {
          "src": "/covers/merck-oral-cholesterol-pill--a5.png",
          "alt": "Luke Fildes's 1891 painting of a physician keeping watch over a sick child at dawn while the parents look on.",
          "credit": "Samuel Luke Fildes, 'The Doctor,' 1891, Tate Britain, London; public domain via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "reflect-orbital-space-mirror",
    "headline": "US regulators approve Reflect Orbital's satellite to beam reflected sunlight to Earth after dark",
    "overview": "The Federal Communications Commission authorised California start-up Reflect Orbital to launch Eärendil-1, a 142-kilogram satellite bearing an 18-metre reflective mirror designed to bounce sunlight down to chosen spots on the ground at night to light streets and power solar farms. The company envisions a constellation of up to 50,000 such mirrors by 2035. The American Astronomical Society opposed the licence, warning that the reflections could ruin the night sky for observatories and risk flash-blinding pilots and drivers.",
    "genre": "Technology",
    "sources": [
      {
        "name": "SpaceNews",
        "href": "https://spacenews.com/fcc-approves-first-reflect-orbital-satellite/"
      },
      {
        "name": "The Hill",
        "href": "https://thehill.com/policy/technology/5968228-fcc-approves-reflect-orbital/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/reflect-orbital-space-mirror.png",
      "alt": "A NASA concept illustration of a large reflective solar-power satellite in orbit above Earth.",
      "credit": "NASA; Wikimedia Commons"
    },
    "rank": 33,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 4 February 1993, Russian engineers aboard the Mir station unfurled Znamya 2, a 20-metre spinning Mylar mirror on the Progress M-15 cargo craft, and cast a 5-kilometre patch of light with the brightness of a full moon that swept across night-time Europe from southern France to western Russia at 8 km/s. It was history's first deliberate attempt to reflect sunlight to the dark side of Earth, championed by engineer Vladimir Syromyatnikov to lengthen the working day in the Arctic. A larger 25-metre successor, Znamya 2.5, snagged on a Progress antenna and tore during deployment on 5 February 1999, and the programme was abandoned. Reflect Orbital's FCC-approved Eärendil-1, with its 18-metre mirror and dream of 50,000 reflectors by 2035, is the direct descendant of this Soviet-era vision. Where Znamya was a brief, doomed prototype, the new venture proposes to make the second sun permanent — reviving the same promise and the same anxieties about a sky that never fully darkens.",
        "excerpt": "On the night of 4 February 1993 the deployed film caught the sun and threw a moving disc of moonlight roughly five kilometres wide across sleeping Europe; observers on the ground, where clouds allowed, glimpsed a fast pulse of brightness before the reflector tumbled on and burned up over Canada hours later. The 1999 sequel ripped on an antenna and died before it could shine, and no third mirror was ever built.",
        "source": "\"Znamya (satellite),\" Wikipedia (Znamya 2, 1993; Znamya 2.5, 1999)",
        "href": "https://en.wikipedia.org/wiki/Znamya_(satellite)"
      },
      {
        "category": "historical",
        "title": "According to a legend first recorded by Lucian in the 2nd century AD and elaborated by Anthemius of Tralles around 500 AD, the mathematician Archimedes defended Syracuse during the Roman siege of c. 213–212 BC by arraying polished mirrors to concentrate the sun's rays and set the enemy fleet ablaze. The tale casts sunlight itself as a weapon — the heavens' own fire bent by human ingenuity to a purpose the sun never intended. Modern reconstructions have kept the myth alive and contested: Ioannis Sakkas ignited a model ship at 50 metres with 70 mirrors in 1973, and MIT students charred a hull at 30 metres in 2005, while MythBusters ultimately declared it 'busted.' The parallel to Reflect Orbital is the founding gesture of the story: a genius who learns to catch and aim the sun. Then as now, the same feat that dazzles as engineering triumph raises the fear of light weaponised — telescopes blinded, pilots and drivers dazzled, the sky's neutrality lost.",
        "excerpt": "The oldest sources describe Archimedes turning banks of bronze mirrors upon the Roman ships until, focused to a single burning point, the reflected sun kindled their timbers from a distance — sunlight redirected by human hands into a beam that could scorch. Whether feat or fable, the image endured for two millennia as the archetype of a mortal who learned to command the light of the sky.",
        "source": "\"Archimedes' heat ray,\" Wikipedia, citing Lucian (2nd c. AD) and Anthemius of Tralles (c. 500 AD)",
        "href": "https://en.wikipedia.org/wiki/Archimedes%27_heat_ray",
        "image": {
          "src": "/covers/reflect-orbital-space-mirror--a1.png",
          "alt": "Fresco of Archimedes using an array of mirrors to focus sunlight and set Roman ships ablaze during the Siege of Syracuse",
          "credit": "Giulio Parigi, 'Archimedes' Mirror' (c. 1599–1600), Stanzino delle Matematiche, Uffizi, Florence — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Aeschylus's tragedy Prometheus Bound (c. 5th century BC), the Titan Prometheus is nailed to a Caucasian crag by Zeus for the crime of stealing celestial fire and handing it to mortals hidden in a fennel stalk. The fire is at once the supreme gift — teacher of every art and mother of civilisation — and an unforgivable trespass against the prerogatives of heaven, for which Prometheus suffers eternal torment. The play frames the theft as the primal act of technological hubris: humanity acquiring a heavenly power it was never meant to hold. Reflect Orbital's plan to pull the sun's light down to Earth after dark re-enacts Prometheus's gesture on a planetary scale, promising illumination as a boon to streets and solar farms. The American Astronomical Society's warnings — ruined skies, blinded telescopes, endangered pilots — voice the old Aeschylean suspicion that stolen light exacts a price, and that reshaping the heavens invites their revenge.",
        "excerpt": "\"I hunted out and stored in fennel stalk the stolen source of fire that hath proved to mortals a teacher in every art and a means to mighty ends.\"",
        "source": "Aeschylus, Prometheus Bound, trans. Herbert Weir Smyth (Loeb Classical Library, 1926)",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/Prometheus_Bound",
        "image": {
          "src": "/covers/reflect-orbital-space-mirror--a2.png",
          "alt": "Rubens's 'Prometheus Bound', the Titan punished for giving stolen fire to mortals.",
          "credit": "Peter Paul Rubens, 'Prometheus Bound' (c. 1611-18), Philadelphia Museum of Art; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Book 2 of Ovid's Metamorphoses (8 AD), Phaethon, son of the Sun-god, wins the reckless privilege of driving his father's fiery chariot across the sky for a single day, but cannot hold the horses to their course; the sun's flame plunges too near the Earth and the whole world catches fire. Cities burn, nations turn to dust, mountains from Taurus to Ida blaze, and rivers run dry until Jupiter must strike the boy down with a thunderbolt to save creation. It is antiquity's sharpest parable of the second sun mishandled — solar power taken up by mortal ambition and loosed beyond control. Reflect Orbital proposes to steer sunlight where nature never sends it, onto the night side of the planet, multiplied to 50,000 mirrors. Ovid's scorched earth is the cautionary shadow behind that promise: the light of heaven is safe only in the hands that made it, and a sky rerouted by human hands can as easily blight as bless.",
        "excerpt": "\"Great cities perish with their walls, / and peopled nations are consumed to dust— / the forests and the mountains are destroyed.\"",
        "source": "Ovid, Metamorphoses, Book 2 (the story of Phaethon), trans. Brookes More (1922)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2",
        "image": {
          "src": "/covers/reflect-orbital-space-mirror--a3.png",
          "alt": "A bust of the Roman poet Ovid, author of the Metamorphoses and the tale of Phaethon.",
          "credit": "Bust of Ovid, Densuș, Romania; photo via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens painted The Fall of Phaeton (c. 1604–1605, reworked c. 1606–1608, now at the National Gallery of Art, Washington) at the very dawn of his Italian maturity, freezing the instant of catastrophe: Phaethon tumbling backward from the sun-chariot as the terrified horses scatter, the reins snapping, and allegorical figures of the Hours and seasons reeling amid a sky torn between blazing gold and thunderous dark. Jupiter's thunderbolts are already flying to end the conflagration. Rubens makes visible the exact theme the FCC decision revives — the sublime beauty and the terror of a sun steered off its ordained path by mortal daring. The canvas turns hubris into spectacle: light spilling gloriously and disastrously across the heavens. Placed beside Reflect Orbital's mirrors, it reads as a Baroque warning that to seize control of the sun's course is to court a magnificent ruin.",
        "excerpt": "Rubens seizes the split second between glory and disaster: the golden chariot upended, horses bolting through a firmament that heaves from radiant dawn into storm, human and celestial bodies flung into freefall. The whole sky becomes a theatre of light unleashed and light punished — beauty and calamity indistinguishable in the same burning instant.",
        "source": "Peter Paul Rubens, 'The Fall of Phaeton,' c. 1604–1608, oil on canvas, National Gallery of Art, Washington, D.C.",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/reflect-orbital-space-mirror--a4.png",
          "alt": "Baroque painting of Phaethon falling from the overturned chariot of the Sun as horses scatter across a storm-torn sky",
          "credit": "Peter Paul Rubens, 'The Fall of Phaeton' (c. 1604–1608), National Gallery of Art, Washington — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Alexander Scriabin composed Prometheus: The Poem of Fire (Op. 60) in 1910, premiered in Moscow on 2 March 1911 under Serge Koussevitzky, scoring it not only for orchestra, piano and chorus but for a 'clavier à lumières' — a color organ that flooded the concert hall with tides of colored light keyed to the harmony. Built on the dissonant 'mystic chord' that Scriabin called the chord of Prometheus, the work aspired to fuse sound and light into a single ecstatic, quasi-religious act of illumination, the Titan's fire made audible and visible at once. It is the most literal artistic ancestor of a machine that turns the sky into a light instrument. Scriabin dreamed of drenching an audience in artificial radiance to transfigure human consciousness; Reflect Orbital proposes to drench the actual night in reflected sunlight to transfigure the working day. Both stage the Promethean fantasy that humanity might compose the light of the heavens to its own design — and both make one wonder who consented to sit inside the glow.",
        "excerpt": "Scriabin bound the orchestra to a keyboard of light, so that as the mystic chord swelled the hall itself changed color, sound and radiance rising together toward a blaze of F-sharp major. It was less a symphony than an attempt to seize the heavens' fire and pour it, as engineered light, over an entire audience — Prometheus rewritten as a machine for illumination.",
        "source": "Alexander Scriabin, 'Prometheus: The Poem of Fire,' Op. 60 (1910; premiered Moscow, 2 March 1911)",
        "href": "https://en.wikipedia.org/wiki/Prometheus:_The_Poem_of_Fire",
        "image": {
          "src": "/covers/reflect-orbital-space-mirror--a5.png",
          "alt": "Photographic portrait of the Russian composer Alexander Scriabin",
          "credit": "Portrait of Alexander Scriabin (before 1915) — public domain via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "trex-gus-50-million",
    "headline": "A Tyrannosaurus rex skeleton nicknamed 'Gus' sells for a record $50.1 million at Sotheby's",
    "overview": "A 67-million-year-old Tyrannosaurus rex nicknamed 'Gus' — one of the largest and most complete ever found, standing 12.5 feet tall and 38 feet long — sold for a record $50.1 million to an anonymous telephone bidder at Sotheby's in New York, after a 10-minute battle among seven prospective buyers that far exceeded its $20–30 million estimate. The price eclipses the $44.6 million paid for a Stegosaurus at the same house in 2024. Palaeontologists warned that the surging market puts scientifically important fossils beyond the reach of museums and out of public view.",
    "genre": "Economy",
    "sources": [
      {
        "name": "NPR",
        "href": "https://www.npr.org/2026/07/15/nx-s1-5894586/mystery-bidder-buys-t-rex"
      },
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/a-t-rex-fossil-sells-for-50-million-to-a-mystery-bidder-1234754776/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/trex-gus-50-million.png",
      "alt": "A mounted Tyrannosaurus rex skeleton on display in a museum.",
      "credit": "Wikimedia Commons"
    },
    "rank": 34,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1655 the Danish physician Ole Worm published Museum Wormianum, the catalogue of his Copenhagen 'Wunderkammer' — a private cabinet of curiosities crammed with narwhal tusks, fossils, taxidermied beasts and monstrous bones, its famous frontispiece showing a kayak and polar bear cub slung from the ceiling above shelves of nature's marvels. Such Renaissance and Baroque cabinets, assembled by wealthy physicians and princes like Rudolf II, turned the wonders of the natural world into trophies of erudition and status, wonders visible only to the owner and his invited guests. They were the first great instance of nature commodified and sequestered — the whole of creation shrunk to a rich man's showroom. When Gus the Tyrannosaurus vanishes into an anonymous buyer's collection for $50.1 million, the 21st century simply revives the Wunderkammer: a 67-million-year-old marvel becomes a private curiosity, out of public and scientific reach. The narwhal skull by Worm's window and the T. rex skull under Sotheby's lights are the same impulse four centuries apart.",
        "excerpt": "The 1655 frontispiece to Museum Wormianum, engraved by G. Wingendorp after Worm's own drawing, depicts the interior of his Copenhagen curiosity cabinet: a densely packed room of natural specimens and human artefacts — animals, shells, minerals, an inverted kayak and a polar bear cub suspended from the ceiling, stuffed birds and fish, and a narwhal skull perched by the window with its long tusk pointing skyward. The wonders of the natural world are gathered as the private trophies of a single wealthy collector.",
        "source": "Ole Worm, Museum Wormianum seu Historia Rerum Rariorum (Leiden: Elzevier, 1655); 'Curiosity Cabinet of Ole Worm', Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Curiosity_Cabinet_of_Ole_Worm",
        "image": {
          "src": "/covers/trex-gus-50-million--a0.png",
          "alt": "1655 engraved frontispiece of Museum Wormianum showing Ole Worm's crowded cabinet of curiosities with hanging kayak, stuffed animals and natural specimens.",
          "credit": "Frontispiece to Museum Wormianum (1655), engraving by G. Wingendorp. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 16 October 1869 well-diggers on a farm in Cardiff, New York, unearthed the 'Cardiff Giant' — a ten-foot, 3,000-pound 'petrified man' that was in fact a gypsum fake secretly buried a year earlier by the tobacconist George Hull. Word of the buried colossus drew crowds who paid fifty cents apiece, and when the owners refused to sell, the showman P. T. Barnum simply built his own copy and exhibited it as the real thing, prompting the phrase 'there's a sucker born every minute.' The episode fused every theme of the modern fossil trade: an ancient-seeming monstrous relic dug from the earth, monetized as spectacle, its scientific truth swallowed by profit and hype. Gus the T. rex, a genuine 67-million-year-old giant hauled from the rock and paraded under auctioneers' gavels to a record $50.1 million, is the Cardiff Giant's legitimate descendant. Both turn buried bones into box office, and both leave paleontologists warning that awe has been hijacked by money. The unearthing is the show; the price is the punchline.",
        "excerpt": "The Cardiff Giant, a ten-foot 'petrified man' secretly buried by George Hull, was 'discovered' by well-diggers in Cardiff, New York, on 16 October 1869. Visitors were soon charged fifty cents for a fifteen-minute viewing, and when the owners would not sell, P. T. Barnum manufactured an unauthorized replica and displayed it as authentic — a monstrous buried relic transformed into pure commercial spectacle.",
        "source": "'Cardiff Giant', Wikipedia; contemporary accounts of the 1869 hoax and P. T. Barnum's replica.",
        "href": "https://en.wikipedia.org/wiki/Cardiff_Giant",
        "image": {
          "src": "/covers/trex-gus-50-million--a1.png",
          "alt": "1869 photograph of the Cardiff Giant being exhumed from a pit on a farm in Cardiff, New York.",
          "credit": "The Cardiff Giant exhumed, 1869. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley's sonnet 'Ozymandias,' published in The Examiner on 11 January 1818, describes a traveller's account of a colossal, shattered statue half-buried in the desert — the wreck of a boastful ancient king whose inscription still commands 'Look on my works ye Mighty, and despair!' while nothing but sand remains around it. The poem is the supreme English meditation on vanitas: monumental ambition reduced to broken stone and 'lone and level sands,' a buried relic that outlives the pride that raised it yet mocks it. Gus the Tyrannosaurus is a colossal wreck of another kind — 67 million years of extinction bought for $50.1 million by a buyer whose vanity, like Ozymandias's, wants to possess the unpossessable. The fossil, like the trunkless legs of stone, will outlast every fortune bid on it. Sotheby's gavel is one more sneer of cold command echoing over the sands. The bones endure; the bidders do not.",
        "excerpt": "I met a Traveller from an antique land, / Who said, \"Two vast and trunkless legs of stone / Stand in the desart. Near them, on the sand, / Half sunk, a shattered visage lies, whose frown, / And wrinkled lip, and sneer of cold command, / Tell that its sculptor well those passions read... / And on the pedestal these words appear: / 'My name is Ozymandias, King of Kings.' / Look on my works ye Mighty, and despair! / No thing beside remains. Round the decay / Of that Colossal Wreck, boundless and bare, / The lone and level sands stretch far away.\"",
        "source": "Percy Bysshe Shelley, 'Ozymandias,' in The Examiner (London), 11 January 1818.",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias",
        "image": {
          "src": "/covers/trex-gus-50-million--a2.png",
          "alt": "The 'Younger Memnon' colossal bust of Ramesses II, model for Shelley's shattered king.",
          "credit": "Colossal bust of Ramesses II ('The Younger Memnon'), British Museum; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Book I of John Milton's Paradise Lost (1667), the fallen angel Mammon — 'the least erected Spirit that fell,' whose eyes in Heaven were always 'downward bent, admiring more / The riches of heaven's pavement, trodden gold' — leads a crew of demons to rip open a hill in Hell and mine its 'ribs of gold.' Milton makes greed literally a matter of tearing treasure from the ground: the devils 'Rifled the bowels of their mother Earth / For treasures better hid,' and the poet coins the phrase 'the precious bane' for wealth that damns those who dig it. It is the founding image of extraction as sacrilege — the earth wounded so that riches may be hoarded. The commercial fossil hunt that dug Gus from Montana rock and sold him for $50.1 million is Mammon's work by another name: nature's buried marvels 'better hid' torn out and turned to gold. Paleontologists' lament that science is priced out is Milton's warning made modern. The precious bane still grows in the ground, and someone still pays $50 million for it.",
        "excerpt": "By him first / Men also, and by his suggestion taught, / Ransacked the centre, and with impious hands / Rifled the bowels of their mother Earth / For treasures better hid. Soon had his crew / Opened into the hill a spacious wound, / And digged out ribs of gold. Let none admire / That riches grow in Hell; that soil may best / Deserve the precious bane.",
        "source": "John Milton, Paradise Lost, Book I, lines 792–801 (1667); Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt",
        "image": {
          "src": "/covers/trex-gus-50-million--a3.png",
          "alt": "John Martin's 'Pandemonium', the demons' golden palace raised from the earth in Paradise Lost.",
          "credit": "John Martin, 'Pandemonium' (1841), Musée du Louvre; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Harmen Steenwijck's 'Vanitas Still-Life' (c. 1640, National Gallery, London) is a masterpiece of the Dutch vanitas genre, in which a shaft of light falls across a human skull lolling on a table's edge, surrounded by the trappings of wealth and learning — a Japanese sword, a costly shell, a lute, books, and a snuffed-out lamp whose smoke marks time running out. Every luxurious object is a memento mori: riches, knowledge and pleasure are worthless against the bare grin of death. The painting is the exact moral inverse of a $50.1 million fossil auction — where Steenwijck sets a skull among treasures to shame vanity, Sotheby's sets a treasure of a skull, Gus the Tyrannosaurus, on a pedestal to inflame it. The T. rex is the ultimate vanitas object: 67-million-year-old bones, the biggest memento mori imaginable, converted into the biggest status symbol imaginable. Steenwijck's warning that we too will be bone becomes the very thing the ultra-rich now bid on. The skull that once preached humility is now the trophy of pride.",
        "excerpt": "A dramatic shaft of sunlight cuts through the gloom to strike a human skull that lolls to one side on the edge of the table, its empty eye sockets and gap-toothed grin surrounded by the vanities of the world — a large jar, an ornate Japanese sword, a rare sea shell, a lute, books, and a trumpet. The snuffed-out lamp and the ticking watch remind the viewer that our time, too, will come; wealth, art and learning are as mortal as the bone that grins among them.",
        "source": "Harmen Steenwijck, Vanitas Still-Life (An Allegory of the Vanities of Human Life), oil on panel, c. 1640, National Gallery, London (NG1256).",
        "href": "https://www.nationalgallery.org.uk/paintings/harmen-steenwyck-still-life-an-allegory-of-the-vanities-of-human-life",
        "image": {
          "src": "/covers/trex-gus-50-million--a4.png",
          "alt": "Dutch vanitas still life by Harmen Steenwijck with a human skull lit by a shaft of light amid a lute, books, shell, sword and a snuffed-out lamp.",
          "credit": "Harmen Steenwijck, Vanitas Still-Life (c. 1640), National Gallery, London. Public domain, via Wikimedia Commons (Web Gallery of Art)."
        }
      },
      {
        "category": "artistic",
        "title": "In 'Fossils' (Fossiles), the twelfth movement of Camille Saint-Saëns's musical suite The Carnival of the Animals (composed 1886), a xylophone clatters like dry, rattling bones while the composer wickedly quotes his own 'Danse Macabre' alongside nursery tunes such as 'Ah! vous dirai-je, maman' — turning the relics of the dead into a brittle, comic dance. Saint-Saëns forbade the suite's public performance in his lifetime, fearing this menagerie of joke-pieces would cheapen his serious reputation; the ancient dead were, for him, both spectacle and embarrassment. That ambivalence lands squarely on Gus the Tyrannosaurus: 67-million-year-old bones performing for a $50.1 million crowd, the ultimate fossil made into a party turn for the ultra-rich. The xylophone's dead rattle is the sound of extinction repackaged as entertainment. Where Saint-Saëns mocked the spectacle of animating old bones, Sotheby's stages it for real, gavel as percussion. The Danse Macabre now has a price tag.",
        "excerpt": "In 'Fossils,' Saint-Saëns hands the melody to a xylophone whose hard, clattering notes evoke dry bones knocking together, then stitches in self-mocking quotations of his own 'Danse Macabre' and old French nursery songs. The effect is a sardonic dance of the long-dead — the ancient relic reanimated not as science but as brittle, ironic spectacle, exactly the fate of a T. rex skeleton paraded and sold as entertainment for the wealthy.",
        "source": "Camille Saint-Saëns, 'Fossiles,' No. 12 of Le Carnaval des animaux (1886).",
        "href": "https://en.wikipedia.org/wiki/The_Carnival_of_the_Animals",
        "image": {
          "src": "/covers/trex-gus-50-million--a5.png",
          "alt": "Portrait photograph of composer Camille Saint-Saëns in 1900, taken by Pierre Petit.",
          "credit": "Camille Saint-Saëns in 1900, photograph by Pierre Petit. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "marc-padeu-memento-vivere",
    "headline": "Cameroonian painter Marc Padeu opens 'Memento Vivere' in London, staging cocoa-plantation life as biblical tableaux",
    "overview": "Marc Padeu's solo exhibition 'Memento Vivere' opens at the Larkin Durey gallery in London, running 17 July to 14 August, with large acrylic canvases that restage the labour and community of cocoa plantations in his native Cameroon within compositions borrowed from Renaissance religious painting, from an Adoration of the Magi to a Last Supper. Trained as a church fresco painter, Padeu dignifies working people as holy figures and meditates on time and mortality. The show's title turns the classical memento mori, remember you will die, toward memento vivere, remember to live.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/marc-padeu-memento-vivere-acrylic-paintings/"
      },
      {
        "name": "Larkin Durey",
        "href": "https://www.larkindurey.com/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/marc-padeu-memento-vivere.png",
      "alt": "A painting by Marc Padeu staging cocoa-plantation workers as figures in a religious tableau.",
      "credit": "Marc Padeu; via Colossal"
    },
    "rank": 35,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Around 1599-1600, working in Rome, Caravaggio painted 'The Calling of Saint Matthew' for the Contarelli Chapel of San Luigi dei Francesi, staging the moment Christ summons a tax collector as a scene of ordinary men gathered at a table in a dim, contemporary room. Rejecting idealized bodies, Caravaggio used the faces of the Roman street, gamblers, laborers and common folk, as models for apostles and saints, letting a shaft of raking light do the sacred work. The scandal and the power lay in dignifying the poor and unremarkable as vessels of divine encounter. Marc Padeu, trained as a fresco painter by the church, extends exactly this lineage when he casts Cameroon's cocoa-plantation workers as the holy protagonists of an Adoration or a Last Supper. Both artists insist the sacred is glimpsed not in far-off heavens but in the calloused hands and faces of everyday labor.",
        "excerpt": "Caravaggio dropped the biblical summons into a shadowed contemporary tavern, giving his Saint Matthew and companions the faces of Rome's ordinary poor, tax-men, idlers and youths in modern dress. A diagonal beam of light substitutes for a halo, sanctifying common people by the sheer drama of illumination, precisely the move by which Padeu makes cocoa harvesters into figures of scripture.",
        "source": "Caravaggio, 'The Calling of Saint Matthew', 1599-1600, oil on canvas, Contarelli Chapel, San Luigi dei Francesi, Rome.",
        "href": "https://en.wikipedia.org/wiki/The_Calling_of_Saint_Matthew",
        "image": {
          "src": "/covers/marc-padeu-memento-vivere--a0.png",
          "alt": "Caravaggio's The Calling of Saint Matthew, showing a beam of light falling across ordinary men at a table as Christ points toward Matthew.",
          "credit": "Caravaggio, The Calling of Saint Matthew (1599-1600), public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In his 'Apologeticus' of about 197 CE, the North African Christian writer Tertullian described the ancient Roman triumph, in which a victorious general rode through Rome crowned like a god in a gilded chariot, while a slave or attendant stood behind him whispering a reminder of his mortality. This ritual, echoed in the Latin tags 'Respice post te; hominem te memento' and 'memento mori', embedded the thought of death at the very summit of earthly glory. It is the ancestral gesture Padeu deliberately inverts: his exhibition title 'Memento Vivere', remember to live, turns the old warning about dying toward a celebration of being alive. By placing the memento-mori tradition inside scenes of harvest and community, Padeu keeps mortality present yet insists the proper response is not dread but attentive living. The two-thousand-year arc from a Roman chariot to a Cameroonian cocoa field shows the same human fragility, reframed from warning into gratitude.",
        "excerpt": "he is reminded that he is only human. A voice at his back keeps whispering in his ear, Look behind you; remember you are but a man.",
        "source": "Tertullian, 'Apologeticus' (The Apology), ch. 33, c. 197 CE, trans. S. Thelwall, Ante-Nicene Fathers, vol. 3.",
        "href": "https://www.newadvent.org/fathers/0301.htm",
        "image": {
          "src": "/covers/marc-padeu-memento-vivere--a1.png",
          "alt": "Roman memento mori mosaic from Pompeii showing a skull balanced on a wheel of fortune.",
          "credit": "Memento mori mosaic, Pompeii, Museo Archeologico Nazionale di Napoli (inv. 109982); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The Hebrew book of Ecclesiastes, ascribed to 'the Preacher, the son of David', opens with the famous cry 'Vanity of vanities... all is vanity' and meditates on the ceaseless turning of generations and seasons beneath an eternal earth. Its third chapter, 'To every thing there is a season... a time to be born, and a time to die; a time to plant, and a time to pluck up that which is planted', binds human mortality to the rhythm of sowing and harvest. This is the scriptural bedrock of the vanitas tradition and of memento mori itself, yet its conclusion urges people to eat, work and rejoice in their labor. Padeu's cocoa harvesters, 'caught outside of time', enact precisely this fusion of planting, plucking and passing generations. The painter's turn from memento mori toward memento vivere reads as an answer to Ecclesiastes: mortality acknowledged, life embraced.",
        "excerpt": "The words of the Preacher, the son of David, king of Jerusalem. Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. ... One generation passeth away, and another generation cometh: but the earth abideth for ever. ... To every thing there is a season, and a time to every purpose under the heaven: A time to be born, and a time to die; a time to plant, and a time to pluck up that which is planted;",
        "source": "Ecclesiastes 1:1-2, 1:4 and 3:1-2, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes",
        "image": {
          "src": "/covers/marc-padeu-memento-vivere--a2.png",
          "alt": "Pieter Claesz's vanitas still life of a skull, overturned glass and extinguished lamp.",
          "credit": "Pieter Claesz, 'Vanitas Still Life' (c. 1630), Mauritshuis; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Robert Herrick's 'To the Virgins, to Make Much of Time', published in his 1648 collection 'Hesperides', is the quintessential English carpe-diem lyric, opening 'Gather ye rosebuds while ye may, / Old time is still a-flying'. Herrick watches the sun climb only to hasten toward setting and the fresh flower smile today only to die tomorrow, urging the young to seize their fleeting prime. The poem is a memento mori that resolves, like Padeu's show, into a memento vivere: awareness of death made into an argument for living fully now. Where Herrick gathers rosebuds, Padeu gathers cocoa pods, both harvests standing as emblems of ripeness, sweetness and the brevity of the hour. The painter's figures 'caught outside of time' answer Herrick's flying clock with a suspended, sacred present.",
        "excerpt": "Gather ye rosebuds while ye may,\nOld time is still a-flying;\nAnd this same flower that smiles today\nTomorrow will be dying. ... Then be not coy, but use your time,\nAnd, while ye may, go marry;\nFor, having lost but once your prime,\nYou may forever tarry.",
        "source": "Robert Herrick, 'To the Virgins, to Make Much of Time', from 'Hesperides' (1648).",
        "href": "https://americanliterature.com/author/robert-herrick/poem/to-the-virgins-to-make-much-of-time",
        "image": {
          "src": "/covers/marc-padeu-memento-vivere--a3.png",
          "alt": "John William Waterhouse's 'Gather Ye Rosebuds While Ye May', young women gathering roses.",
          "credit": "J. W. Waterhouse, 'Gather Ye Rosebuds While Ye May' (1909); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Leonardo da Vinci painted 'The Last Supper' between about 1495 and 1498 on the refectory wall of Santa Maria delle Grazie in Milan, capturing the charged instant just after Christ announces that one of the twelve will betray him. Leonardo organized the apostles into four groups of three, their gestures rippling outward from a still, central Christ framed by the window's light, a composition that became the template for depicting sacred communion at a shared table. Padeu explicitly borrows this scaffolding, restaging the Last Supper among Cameroon's cocoa workers so that a plantation meal becomes a scene of holy fellowship and foreboding. The parallel dignifies laboring people as apostolic figures and loads an ordinary gathering with intimations of sacrifice and time. In both works the table is where the everyday and the eternal meet.",
        "excerpt": "Leonardo freezes the psychological storm of the apostles at the moment of Christ's prophecy of betrayal, using perspective, gesture and window-light to make a communal meal radiate sacred meaning. Padeu adopts this same triangular, table-centered architecture to elevate a cocoa-plantation gathering into a tableau of fellowship, sacrifice and the passage of time.",
        "source": "Leonardo da Vinci, 'The Last Supper', c. 1495-1498, tempera and oil on plaster, Santa Maria delle Grazie, Milan.",
        "href": "https://en.wikipedia.org/wiki/The_Last_Supper_(Leonardo)",
        "image": {
          "src": "/covers/marc-padeu-memento-vivere--a4.png",
          "alt": "Leonardo da Vinci's The Last Supper, showing Christ at the center of a long table with the twelve apostles reacting in four groups of three.",
          "credit": "Leonardo da Vinci, The Last Supper (c. 1495-1498), public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Francois Millet painted 'The Angelus' between 1857 and 1859, showing two peasants who pause over a basket of potatoes at dusk to bow their heads in prayer as a distant church bell rings the Angelus. Millet monumentalized humble rural laborers, lending the potato harvest the gravity and hush of a devotional scene and finding the sacred within back-breaking agricultural work. This is precisely Padeu's project two centuries later and a continent away: to honor the community of the cocoa fields by casting their labor in the golden light of religious painting. Both artists refuse to separate toil from holiness, framing the harvest as a place where fragile human life touches the divine. Millet's silent prayer at day's end rhymes with Padeu's meditation on mortality turned, gently, toward the fullness of living.",
        "excerpt": "Millet elevates two field laborers, heads bowed over a basket of potatoes at nightfall, into figures of quiet reverence beneath a distant church spire, sanctifying agricultural toil itself. Padeu carries this same conviction into the cocoa plantations of Cameroon, wrapping working people in the light and solemnity once reserved for saints.",
        "source": "Jean-Francois Millet, 'The Angelus' (L'Angelus), 1857-1859, oil on canvas, Musee d'Orsay, Paris.",
        "href": "https://en.wikipedia.org/wiki/The_Angelus_(painting)",
        "image": {
          "src": "/covers/marc-padeu-memento-vivere--a5.png",
          "alt": "Jean-Francois Millet's The Angelus, showing a peasant man and woman bowing in prayer over a basket of potatoes in a field at dusk.",
          "credit": "Jean-Francois Millet, The Angelus (1857-1859), public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "tbilisi-rike-demolition",
    "headline": "Studio Fuksas's never-opened Rike Concert Hall in Tbilisi is cleared for demolition; the architects plead to save it",
    "overview": "Tbilisi's city hall has issued a permit to demolish the Rike Concert Hall, the tubular building designed by Massimiliano and Doriana Fuksas that was largely completed by 2012 but sat unused for more than a decade after a change of government and never opened to the public, with owners given until 25 December to dismantle it. Studio Fuksas called for the demolition to be halted, describing it as a significant cultural setback and saying repeated attempts to propose an alternative use had gone unanswered. It is the first time in the studio's more than sixty years of practice that one of its buildings faces destruction without consultation.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/16/studio-fuksas-tbilisi-rike-concert-hall-halt/"
      },
      {
        "name": "Domus",
        "href": "https://www.domusweb.it/en/news/2026/07/16/fuksas-tbilisi-concert-hall-demolition.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/tbilisi-rike-demolition.png",
      "alt": "The tubular Rike Concert Hall on the riverbank in Tbilisi, seen from the Peace Bridge.",
      "credit": "Rike Park and the Rike Concert Hall, Tbilisi; Wikimedia Commons"
    },
    "rank": 36,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "After the Great Fire of AD 64 gutted Rome, the emperor Nero seized a vast tract of the ruined city to build his Domus Aurea, or 'Golden House' — a pleasure-palace of some 300 rooms sprawling across the Palatine, Oppian, and Caelian hills, with an artificial lake 'like a sea,' a mile-long triple colonnade, and a 120-foot colossus of the emperor at its gate. Nero barely lived to enjoy it: after his forced suicide in AD 68 the Senate pronounced damnatio memoriae, and the building itself became a symbol of the tyranny his successors wished to bury. Vespasian drained the lake and raised the Colosseum on the spot; Titus and Trajan buried the rest beneath public baths, stripping the marble and entombing Nero's frescoes underground within forty years. The most opulent house in Rome was condemned not for any flaw of design but for the memory of the man who commissioned it. Studio Fuksas's Rike Concert Hall — completed by 2012, never opened, and now cleared for demolition after a change of government — repeats the ancient lesson that a regime's proudest monument can become its successor's embarrassment, erased by the politics that follow the patron.",
        "excerpt": "When the edifice was finished in this style and he dedicated it, he deigned to say nothing more in the way of approval than that he was at last beginning to be housed like a human being.",
        "source": "Suetonius, The Lives of the Twelve Caesars, 'Nero' §31, trans. J. C. Rolfe (Loeb Classical Library, 1914), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Lives_of_the_Twelve_Caesars/Nero",
        "image": {
          "src": "/covers/tbilisi-rike-demolition--a0.png",
          "alt": "Reconstructed general ground plan of the surviving Oppian wing of Nero's Domus Aurea in Rome.",
          "credit": "General plan of the Domus Aurea (Esquiline wing). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Construction of Pyongyang's Ryugyong Hotel began on 28 August 1987: a 105-storey, 330-metre pyramid meant to crown the North Korean skyline and outshine the capitalist South. When the Soviet Union collapsed and funds evaporated, work stopped in 1992 with the structure at full height but a bare, windowless concrete shell — and there it loomed for sixteen years, unglazed and empty, nicknamed the 'Hotel of Doom' and airbrushed from official photographs. Even after an Egyptian firm reclad the exterior in glass by 2011 and LED panels were added to flash propaganda, no guest has ever checked in; the tower remains, decades on, a completed form that has never served its purpose. Like the tubular Rike Concert Hall in Tbilisi — finished around 2012 yet never opened to the public — the Ryugyong is a monument to ambition frozen mid-gesture, a grand building that exists only as a silhouette of the future it promised. Both are cautionary emblems of the vanity of monuments raised faster than the will to use them.",
        "excerpt": "For decades the pyramid stood roofed but hollow, a 330-metre concrete shell with empty window-frames staring over Pyongyang, so persistently unfinished that outsiders dubbed it the 'Hotel of Doom.' Glass cladding and dazzling LED light-shows have since dressed its flanks, yet behind the facade not a single room has ever received a guest. It is a skyscraper that functions purely as a symbol — a monument to a future that never arrived.",
        "source": "'Ryugyong Hotel,' Wikipedia (accessed 16 July 2026).",
        "href": "https://en.wikipedia.org/wiki/Ryugyong_Hotel",
        "image": {
          "src": "/covers/tbilisi-rike-demolition--a1.png",
          "alt": "The pyramid-shaped Ryugyong Hotel towering unfinished over the Pyongyang skyline.",
          "credit": "The Ryugyong Hotel, Pyongyang. Photo via Wikimedia Commons (CC)."
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley wrote 'Ozymandias' in 1818, a sonnet reputedly sparked by news that a colossal bust of the pharaoh Ramesses II was being shipped to the British Museum. In it a traveller reports the shattered statue of a forgotten king, its face half-sunk in sand, bearing the boast 'My name is Ozymandias, king of kings: / Look on my works, ye Mighty, and despair!' — a command to marvel that is contradicted by the empty desert stretching to every horizon. The poem has become the definitive parable of architectural hubris: the more a ruler builds to defy time, the more starkly the ruin mocks him. Nothing survives of Ozymandias but the inscription and the wreck. The unopened Rike Concert Hall, its sculptural 'jugs' now scheduled for the wrecking crews, is a modern pedestal whose grand design outlasted the ambitions that raised it, inviting the same rueful contemplation of works that despair could not save.",
        "excerpt": "And on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare,\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias' (1818), in Poems That Every Child Should Know, ed. Mary Elizabeth Burt (1904), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Ozymandias_of_Egypt",
        "image": {
          "src": "/covers/tbilisi-rike-demolition--a2.png",
          "alt": "The colossal bust of Ramesses II, the 'Younger Memnon', that inspired Shelley's Ozymandias.",
          "credit": "Colossal bust of Ramesses II ('The Younger Memnon'), British Museum; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Samuel Taylor Coleridge's 'Kubla Khan,' composed around 1797 and published in 1816, opens with a ruler decreeing a fabulous 'stately pleasure-dome' at Xanadu — 'a miracle of rare device, / A sunny pleasure-dome with caves of ice!' The poem is doubly apt here: it is at once a vision of a sumptuous pleasure-building willed into being by a single command, and itself a famously unfinished work, broken off (Coleridge claimed) when a visitor from Porlock interrupted his opium reverie. The dome exists only as a fragment of a dream, forever incomplete, its music never quite sounded. Massimiliano and Doriana Fuksas's Rike Concert Hall — a literal pleasure-dome for music, decreed by one government and abandoned by the next, completed in form yet never once opened for a performance — is Coleridge's fragment made concrete: a stately dome that was built but never truly began.",
        "excerpt": "In Xanadu did Kubla Khan\nA stately pleasure-dome decree:\nWhere Alph, the sacred river, ran\nThrough caverns measureless to man\nDown to a sunless sea.\n...\nIt was a miracle of rare device,\nA sunny pleasure-dome with caves of ice!",
        "source": "Samuel Taylor Coleridge, 'Kubla Khan' (published 1816), in The Oxford Book of English Verse 1250-1900, ed. Arthur Quiller-Couch, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Oxford_Book_of_English_Verse_1250-1900/Kubla_Khan",
        "image": {
          "src": "/covers/tbilisi-rike-demolition--a3.png",
          "alt": "Washington Allston's portrait of the poet Samuel Taylor Coleridge.",
          "credit": "Washington Allston, portrait of Samuel Taylor Coleridge (1814); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Thomas Cole's five-canvas cycle 'The Course of Empire' (1833–1836) traces an imaginary city from wilderness to pastoral calm to imperial splendour to violent sack — and finally to 'Desolation' (1836), where the works of man lie drowned in encroaching nature. In this last painting a single broken column rises in the foreground, now a bird's nest; shattered temple arches and a ruined bridge emerge from vegetation under a livid moonrise, and not one human figure remains. Cole meant the sequence as a warning that no empire escapes the cycle of overreach and collapse, that grandeur carries the seed of its own ruin. The image is Ozymandias rendered in oil: monuments raised in pride returning to weeds and water. The scene anticipates the fate awaiting the Rike Concert Hall — a lavish civic dream that never rang with music, its curving forms already ruins-in-waiting before the demolition crews arrive.",
        "excerpt": "No figure stirs in Cole's final scene: a lone column, colonized by a bird's nest, presides over drowned colonnades and a shattered bridge as the moon climbs a bruised evening sky. The teeming metropolis of the earlier canvases has been wholly reclaimed by reeds, ivy, and silence. What remains is not a city but the beautiful, melancholy carcass of one.",
        "source": "Thomas Cole, 'The Course of Empire: Desolation' (1836), oil on canvas, New-York Historical Society.",
        "href": "https://en.wikipedia.org/wiki/The_Course_of_Empire_(paintings)",
        "image": {
          "src": "/covers/tbilisi-rike-demolition--a4.png",
          "alt": "A ruined classical city reclaimed by nature under a moonrise, a single broken column in the foreground, from Thomas Cole's 'Desolation.'",
          "credit": "Thomas Cole, 'The Course of Empire: Desolation' (1836), New-York Historical Society. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Caspar David Friedrich's 'The Abbey in the Oakwood' (1809–1810) shows the skeletal ruin of a Gothic abbey — modelled on the wrecked Eldena monastery near Greifswald — rising from a snow-bound graveyard amid leafless, contorted oaks, as a file of tiny monks bears a coffin toward its broken portal. All that remains upright of the great church is a fractured window-arch silhouetted against a wan winter sky; the building meant to house eternity has itself decayed into a memento mori. Friedrich, the supreme painter of the Romantic ruin, made human architecture look fragile and transient against the vast indifference of nature and time. The mood — reverence for a grand structure abandoned, sanctity emptied of its purpose — closely mirrors the plight of the never-consecrated Rike Concert Hall. Both are shells built for gathering and ceremony, left instead to silence, awaiting the erasure of what ambition could not sustain.",
        "excerpt": "A jagged window-arch is nearly all that still stands of the abbey; the rest is rubble half-buried in snow, ringed by black, clawing oaks. A barely visible procession of monks carries a coffin through the ruined gate, dwarfed by the wreck of the sanctuary they tend. The living and the built alike seem to be dissolving into the pale, freezing dusk.",
        "source": "Caspar David Friedrich, 'The Abbey in the Oakwood' (Abtei im Eichwald, 1809–1810), oil on canvas, Alte Nationalgalerie, Berlin.",
        "href": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Abtei_im_Eichwald_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/tbilisi-rike-demolition--a5.png",
          "alt": "A ruined Gothic abbey window-arch amid bare oaks and a snowy graveyard under a pale winter sky, with monks bearing a coffin.",
          "credit": "Caspar David Friedrich, 'The Abbey in the Oakwood' (1809–1810), Alte Nationalgalerie, Berlin. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      }
    ]
  },
  {
    "slug": "google-eu-ai-rivals",
    "headline": "The EU orders Google to open its search data and Android to AI and search rivals",
    "overview": "The European Commission ruled that Google must share the search data it collects, subject to anonymisation, with OpenAI and other AI chatbots and rival search engines, and must let Android users activate competing AI assistants by voice, under the Digital Markets Act's curbs on Big Tech. The data-sharing measure takes effect from January, with the Android changes following in 2027, and access is limited to rivals meeting privacy and security criteria. Google's president of global affairs, Kent Walker, said the decisions risk undermining privacy and security guardrails for millions of Europeans.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOWWNZSnZMWVlJN01HaEZaS1ktSVZhRnFoY2hOU0pEa2Nnb1JZeDhRNzV5VFQ2dVZSZ3ByR0R0MWVVdTZKZ3g3d2lQbUdEZjZoN1VMSkZjQ1hSU00xMFlJY0UtY0xCQWJ1MUFiYU1XSDMwcWEzVkxuZVZhM0M4T0RmTmRlVS1vMzFxc3JfQ2hBRXVkcUl3MzZhZkJiZV9pR2ZtdVZWWmZPMXRMMWozai04YTUzOEZGZw?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/16/google-required-to-open-up-to-ai-search-engine-rivals-under-eu-mandated-changes.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/google-eu-ai-rivals.png",
      "alt": "The entrance of a Google office building.",
      "credit": "Wikimedia Commons"
    },
    "rank": 37,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 15 May 1911 the U.S. Supreme Court, in Standard Oil Co. of New Jersey v. United States, ordered John D. Rockefeller's Standard Oil trust dissolved into 34 separate companies, ending a near-total grip on American oil refining and distribution. The weapon was the Sherman Antitrust Act of 1890, which for the first time made monopoly itself a federal crime and empowered the state to prise open a private empire 'in restraint of trade.' Just as Washington broke the octopus that had enclosed the nation's energy supply, Brussels now invokes the Digital Markets Act to force Google to share its search index and unlock Android for AI rivals. Both are acts of a public authority declaring that a single owner may not fence off the commons on which everyone else depends. The century-old logic of trust-busting recurs almost word for word: dominance, once entrenched, must be compelled to open.",
        "excerpt": "Every contract, combination in the form of trust or otherwise, or conspiracy, in restraint of trade or commerce among the several States, or with foreign nations, is hereby declared to be illegal... Every person who shall monopolize, or attempt to monopolize, or combine or conspire with any other person or persons, to monopolize any part of the trade or commerce among the several States, or with foreign nations, shall be deemed guilty of a misdemeanor.",
        "source": "Sherman Antitrust Act, 26 Stat. 209 (2 July 1890), Sections 1 and 2; applied in Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911).",
        "href": "https://en.wikisource.org/wiki/Sherman_Antitrust_Act",
        "image": {
          "src": "/covers/google-eu-ai-rivals--a0.png",
          "alt": "1906 Puck cartoon showing Theodore Roosevelt as the infant Hercules strangling serpents bearing the heads of John D. Rockefeller and Senator Nelson Aldrich.",
          "credit": "Frank A. Nankivell, 'The infant Hercules and the Standard Oil serpents,' Puck, 1906. Library of Congress / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "At Runnymede in June 1215 England's barons compelled King John, an overmighty sovereign who had ruled by arbitrary will, to seal Magna Carta and submit the crown itself to the law of the land. Clauses 39 and 40 promised that no free man would be seized or ruined save by lawful judgment, and that justice would be neither sold, denied, nor delayed. It was the archetypal moment of a power that had placed itself above all others being forced back within limits by a coalition determined to bind it. The European Commission's order to Google echoes that medieval bargain: an entity grown so dominant that it set the terms for everyone is made to accept externally imposed rules and to open its gates. Then it was a king curbed by charter; now it is a digital sovereign curbed by regulation. Both insist that no single power may stand beyond accountability.",
        "excerpt": "No freemen shall be taken or imprisoned or disseised or exiled or in any way destroyed, nor will we go upon him nor send upon him, except by the lawful judgment of his peers or by the law of the land. To no one will we sell, to no one will we refuse or delay, right or justice.",
        "source": "Magna Carta (1215), clauses 39 and 40, translation in the Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/medieval/magna.asp",
        "image": {
          "src": "/covers/google-eu-ai-rivals--a1.png",
          "alt": "The 1215 Magna Carta, British Library Cotton MS Augustus II.106, a densely written medieval Latin charter on vellum.",
          "credit": "Magna Carta, 1215, British Library Cotton MS Augustus II.106 / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In 1 Samuel 17 the Philistine champion Goliath of Gath, six cubits and a span in height and clad in bronze, terrifies the armies of Israel for forty days until a shepherd boy, David, refuses to accept that size alone should rule the field. Armed only with a sling and five smooth stones, and speaking in the name of a higher authority, he brings the giant down with a single shot to the forehead. The tale has become the enduring emblem of an entrenched colossus challenged and toppled by a smaller, more agile contender. In the EU's action, OpenAI and other search upstarts play David to Google's Goliath, while the Commission hands them the sling: access to the data and the Android voice-gates the giant had monopolised. The parallel is exact in spirit, that overwhelming dominance is not invincible once the ground is levelled.",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. This day will the LORD deliver thee into mine hand; and I will smite thee, and take thine head from thee.",
        "source": "The Bible, King James Version (1611), 1 Samuel 17:45-46.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel",
        "image": {
          "src": "/covers/google-eu-ai-rivals--a2.png",
          "alt": "Caravaggio's painting David with the Head of Goliath, showing the young David holding the severed head of the giant.",
          "credit": "Caravaggio, 'David with the Head of Goliath,' c.1610, Galleria Borghese, Rome / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "John Clare's 'The Mores' (written in the 1820s) is the great English lament for the enclosure of the open commons, when Parliament's Inclosure Acts fenced off land that had for centuries been shared by all. Clare watches free heath and pasture parcelled into private plots, footpaths stopped, and boards raised reading 'no road here,' as a shared world is locked behind ownership. His giants of open moor are left 'of their limbs bereft,' and the poor made slaves to 'labour's rights' trampled. The poem is the exact inverse of the EU's remedy: where enclosure once seized the commons from the people, Brussels now compels Google to unfence the search data and Android gateways it had enclosed. Clare mourns the well being walled in; the Digital Markets Act reopens it.",
        "excerpt": "Inclosure came and trampled on the grave / Of labour's rights and left the poor a slave ... These paths are stopt - the rude philistine's thrall / Is laid upon them and destroyed them all ... But paths to freedom and to childhood dear / A board sticks up to notice 'no road here'",
        "source": "John Clare, 'The Mores' (c.1821-1824), in Poems Against Enclosure.",
        "href": "https://la.utexas.edu/users/hcleaver/357k/357kClareEnclosuresTable.pdf",
        "image": {
          "src": "/covers/google-eu-ai-rivals--a3.png",
          "alt": "Portrait of the English poet John Clare, who lamented the enclosure of the commons.",
          "credit": "William Hilton, portrait of John Clare (1820), National Portrait Gallery; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya's 'The Colossus' (El Coloso, c.1808-1812), held in the Museo del Prado, depicts a titanic naked giant rising above the mountains, fist raised, while in the valley below a whole population and its herds scatter in panic. Painted amid the Napoleonic invasion of Spain, the image distils the terror of an overwhelming power looming over the small and the helpless. It is the visual archetype of the entrenched giant that the EU's action seeks to confront, a single dominating figure whose mere presence sends everyone fleeing. Where Goya shows the multitude powerless before the colossus, the Digital Markets Act imagines the opposite: the crowd empowered, the giant's advantages redistributed. The painting supplies the front page its face of overmighty scale, the very dominance Brussels means to cut down.",
        "excerpt": "Goya's giant fills the sky, muscle and shadow against roiling cloud, one arm cocked as if to strike. Beneath him a river of tiny figures, wagons, oxen and fleeing men, streams away in every direction, dwarfed to insignificance. It is dominance rendered as sheer physical mass, the small world scattering before a power it cannot resist.",
        "source": "Francisco de Goya (attributed), 'The Colossus' (El Coloso), c.1808-1812, oil on canvas, Museo Nacional del Prado, Madrid (P002785).",
        "href": "https://commons.wikimedia.org/wiki/File:El_coloso.jpg",
        "image": {
          "src": "/covers/google-eu-ai-rivals--a4.png",
          "alt": "Goya's painting The Colossus: a giant naked figure rising over dark mountains as tiny crowds and cattle flee in the valley below.",
          "credit": "Francisco de Goya (attributed), 'The Colossus,' c.1808-1812, Museo del Prado / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Udo Keppler's colour cartoon 'Next!', published in Puck on 7 September 1904, portrays the Standard Oil monopoly as a vast octopus, its tentacles already choking the steel, copper and shipping industries, a state house and the U.S. Capitol, while one grasping arm reaches for the White House. It became the defining image of monopoly as an all-enveloping creature enclosing every organ of public life. That is precisely the fear the European Commission voices about Google: a single company whose search and Android tentacles reach into every corner of digital commerce and daily life. The DMA remedy, forcing the sharing of search data and the opening of Android to rival AI assistants, is the modern attempt to pry those tentacles loose. Keppler's octopus and Brussels' order share one conviction: that a grip on everything must be broken open before others can breathe.",
        "excerpt": "A bloated Standard Oil tank sprouts an octopus's tentacles that wind around the pillars of a state legislature, the copper and steel and shipping trades, and the domed Capitol in Washington, while one last arm gropes toward the White House. Titled simply 'Next!', it renders monopoly as a living thing that seizes and encloses everything within reach.",
        "source": "Udo J. Keppler, 'Next!', Puck, vol. 56, no. 1436 (7 September 1904). Library of Congress Prints and Photographs Division.",
        "href": "https://www.loc.gov/item/2001695241/",
        "image": {
          "src": "/covers/google-eu-ai-rivals--a5.png",
          "alt": "1904 Puck cartoon 'Next!' depicting the Standard Oil monopoly as an octopus whose tentacles grip industry, a statehouse and the U.S. Capitol while reaching for the White House.",
          "credit": "Udo J. Keppler, 'Next!', Puck, 1904. Library of Congress / Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "us-visa-students-journalists",
    "headline": "The US moves to cap the duration of visas for foreign students, exchange visitors and journalists",
    "overview": "The Trump administration issued a final Department of Homeland Security rule setting fixed maximum stays for several visa categories that were previously granted for the open-ended 'duration of status.' Foreign students on F visas and exchange visitors on J visas would be capped at four years, while journalists on I visas would be limited to 240 days — and just 90 days for Chinese nationals — though holders could apply for extensions. DHS said the rising volume of such visitors challenged its ability to monitor them; the rule takes effect 60 days after publication, pending congressional review.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNeDZPc3ozbmFlWmdmZTFrUUN5a19HemlibkFpNUlfNjVUdmxvdGRtM0x6eGpiT2ctaFd4YnpXTUdHSkRSb3lyZlVQam5mTnBvcEFsMVlGMU91c2VXdWlpQTRsX1Y3ZTZUNUZzbXhESjJFS2RjZTV3aVVhWkdOWkRNT3FTUXZ6SE1vWkpUbHhLeDNvTlBadi1uMVRyUm9DQQ?oc=5"
      },
      {
        "name": "MagnifyPost",
        "href": "https://www.magnifypost.com/us-limits-stays-of-students-journalists/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/us-visa-students-journalists.png",
      "alt": "Visa pages inside a United States passport.",
      "credit": "Wikimedia Commons"
    },
    "rank": 38,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On May 6, 1882, President Chester A. Arthur signed the Chinese Exclusion Act, the first federal law to bar a group by nationality, suspending the immigration of Chinese laborers for ten years and denying resident Chinese any path to naturalization. Its preamble justified the ban on the theory that Chinese arrivals 'endangered the good order of certain localities' — the same language of oversight and public safety invoked by the 2026 DHS rule. That the new regulation singles out Chinese nationals for the harshest cap of just 90 days, against four years for other students, revives the exact ethnic targeting of 1882. What was sold in the Gilded Age as temporary emergency policing of the border hardened into more than sixty years of exclusion. The door, once cracked shut against the Chinese laborer, proved very slow to reopen.",
        "excerpt": "Whereas, in the opinion of the Government of the United States the coming of Chinese laborers to this country endangers the good order of certain localities within the territory thereof... the coming of Chinese laborers to the United States be, and the same is hereby, suspended; and during such suspension it shall not be lawful for any Chinese laborer to come, or, having so come after the expiration of said ninety days, to remain within the United States.",
        "source": "Chinese Exclusion Act, 22 Stat. 58 (May 6, 1882), Preamble and Section 1.",
        "href": "https://en.wikisource.org/wiki/Chinese_Exclusion_Act",
        "image": {
          "src": "/covers/us-visa-students-journalists--a0.png",
          "alt": "1882 Puck cartoon 'The Anti-Chinese Wall,' showing laborers building a brick wall to shut out Chinese immigrants",
          "credit": "Friedrich Graetz, 'The Anti-Chinese Wall,' Puck, March 29, 1882 (Library of Congress); public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In the summer of 1798, amid war fever with France, the Federalist Congress passed the Alien and Sedition Acts, which President John Adams signed into law. The Alien Friends Act empowered the President to expel by proclamation any foreigner he personally judged 'dangerous,' with no trial and no evidence required, while its companion Sedition Act criminalized criticism of the government and jailed newspaper editors. Together they fused the two suspicions animating the 2026 visa rule — distrust of the outsider and distrust of the press — into a single machinery of exclusion. Jefferson and Madison denounced the laws as unconstitutional in the Kentucky and Virginia Resolutions, and popular revulsion helped sweep Adams from office in 1800. Like the new fixed-term visas that replace open-ended welcome with executive discretion, the 1798 acts made the alien's very presence contingent on the state's shifting sense of threat.",
        "excerpt": "That it shall be lawful for the President of the United States at any time during the continuance of this act, to order all such aliens as he shall judge dangerous to the peace and safety of the United States... to depart out of the territory of the United States.",
        "source": "An Act Concerning Aliens (Alien Friends Act), 1 Stat. 570 (June 25, 1798), Section 1.",
        "href": "https://en.wikisource.org/wiki/United_States_Statutes_at_Large/Volume_1/5th_Congress/2nd_Session/Chapter_58",
        "image": {
          "src": "/covers/us-visa-students-journalists--a1.png",
          "alt": "Portrait of John Adams, who signed the 1798 Alien and Sedition Acts",
          "credit": "Gilbert Stuart, 'John Adams,' c. 1800–1815, National Gallery of Art (CC0); via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Book 14 of Homer's Odyssey, the disguised, ragged Odysseus arrives at the hut of his swineherd Eumaeus, who does not know him and yet feeds and shelters him without question. When the beggar-king offers to leave, Eumaeus refuses, insisting that to slight even the meanest stranger would be a sin, because every wanderer and beggar comes under the protection of Zeus. This is the ancient Greek law of xenia — guest-friendship — in which hospitality to the outsider is a sacred duty, not a favor the powerful may ration. The 2026 rule, by fixing rigid expiry dates on students, scholars and journalists and shrinking the welcome to a countdown, inverts that ethic exactly. Where Eumaeus sees the stranger at his door as sent by the gods, the new regulation sees him chiefly as a clock to be run down.",
        "excerpt": "Nay, stranger, it were not right for me, even though one meaner than thou wert to come, to slight a stranger: for from Zeus are all strangers and beggars, and a gift, though small, is welcome from such as we.",
        "source": "Homer, Odyssey, Book 14, lines 55–59, trans. A. T. Murray (Loeb Classical Library, 1919).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book=14:card=48",
        "image": {
          "src": "/covers/us-visa-students-journalists--a2.png",
          "alt": "Marble head of Odysseus from the villa of Tiberius at Sperlonga",
          "credit": "Head of Odysseus, Greek marble, 1st c. AD, Museo Archeologico Nazionale, Sperlonga; photo Jastrow, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Hebrew Bible returns again and again to the treatment of the ger — the resident foreigner — and nowhere more pointedly than in Leviticus 19, which commands that the stranger be loved 'as thyself.' The law grounds this obligation in memory and empathy: you must not vex the stranger, for you were strangers in the land of Egypt. It refuses the very distinction the 2026 visa rule enshrines, insisting the sojourner 'shall be unto you as one born among you' rather than a guest on a shortened, revocable lease. The parallel sharpens when the outsiders in question are students and journalists — the modern gerim who dwell, work and observe among a people not their own. Against a policy that measures welcome in days, the ancient command measures it as kinship.",
        "excerpt": "And if a stranger sojourn with thee in your land, ye shall not vex him. But the stranger that dwelleth with you shall be unto you as one born among you, and thou shalt love him as thyself; for ye were strangers in the land of Egypt: I am the LORD your God.",
        "source": "Leviticus 19:33–34, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Leviticus",
        "image": {
          "src": "/covers/us-visa-students-journalists--a3.png",
          "alt": "Poussin's painting of Ruth the Moabite foreigner gleaning and welcomed in the fields of Boaz",
          "credit": "Nicolas Poussin, 'Summer (Ruth and Boaz),' 1660–64, Musée du Louvre; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Masaccio's fresco 'The Expulsion from the Garden of Eden,' painted around 1425 in the Brancacci Chapel in Florence, shows Adam and Eve driven through the gate of paradise beneath a sword-bearing angel. Adam buries his face in his hands and Eve howls, their bodies bent by shame and grief as they are cast into the wilderness — the founding image in Western art of the exile shut out. The work's raw humanity marks a turning point in Renaissance painting, giving anguish physical weight for the first time. It renders visible the emotional logic beneath the 2026 rule: the moment a threshold is closed and the welcomed becomes the barred. For the foreign student, scholar or reporter now handed a fixed expiry, Masaccio's gate is the gate of duration-of-status swinging shut behind them.",
        "excerpt": "The fresco confronts the viewer with the sheer bodily grief of banishment: Eve's open, keening mouth and Adam's hidden face turn abstract exclusion into flesh. The barren gate behind them and the empty landscape ahead make plain that hospitality, once withdrawn, leaves only the road out. It is the archetype of the door closed on those no longer permitted to remain.",
        "source": "Masaccio, 'The Expulsion from the Garden of Eden,' fresco, c. 1425, Brancacci Chapel, Santa Maria del Carmine, Florence.",
        "href": "https://commons.wikimedia.org/wiki/File:Expulsion_from_the_Garden_of_Eden_Masaccio_Cappella_Brancacci.jpg",
        "image": {
          "src": "/covers/us-visa-students-journalists--a4.png",
          "alt": "Masaccio's fresco of Adam and Eve weeping as they are expelled through the gate of Eden",
          "credit": "Masaccio, 'The Expulsion from the Garden of Eden,' c. 1425, Brancacci Chapel, Florence; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "'Va, pensiero,' the Chorus of the Hebrew Slaves from Verdi's 1842 opera Nabucco, gives voice to the Israelites exiled in Babylon, longing across the water for a homeland they may never see again. Set to Temistocle Solera's verses drawn from Psalm 137 ('By the rivers of Babylon'), its slow, unison melody became an anthem of every people cut off from home. The chorus captures precisely the condition the 2026 visa caps impose: the outsider held at a distance, counting down the days until the door of return or refuge is closed. Eduard Bendemann's contemporaneous painting 'The Mourning Jews in Exile' (1832) freezes the same lament — a harpist in chains among grieving captives on the riverbank of Babylon. Together, opera and canvas render exile not as statistic but as ache, the human cost of hospitality withdrawn.",
        "excerpt": "Verdi's exiled chorus rises in hushed unison — 'Va, pensiero, sull'ali dorate' ('Go, thought, on wings of gold') — sending its longing homeward across the water to hills and shores it cannot reach. The music makes audible the grief of those shut out from home, the fatal sweetness of a country 'so beautiful and lost.' It is the sound of the stranger barred at the border, dreaming of a return the state has placed behind a wall of days.",
        "source": "Giuseppe Verdi (music) and Temistocle Solera (libretto), 'Va, pensiero' (Chorus of the Hebrew Slaves), from Nabucco, Part III (1842).",
        "href": "https://en.wikipedia.org/wiki/Va,_pensiero",
        "image": {
          "src": "/covers/us-visa-students-journalists--a5.png",
          "alt": "Eduard Bendemann's painting of chained and mourning Jews in Babylonian exile beside a river",
          "credit": "Eduard Bendemann, 'Die trauernden Juden im Exil' ('The Mourning Jews in Exile'), 1832, Wallraf-Richartz-Museum, Cologne; public domain via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "grok-build-open-source",
    "headline": "xAI open-sources its Grok Build coding agent after it was caught syncing users' private code",
    "overview": "Elon Musk's xAI released the source code of Grok Build, its terminal-native AI coding agent — including the agent loop, tools, terminal interface and extension system — under the Apache 2.0 licence on GitHub, letting developers compile and run it locally without relying on the company's servers. The move followed revelations that Grok Build had been uploading entire private repositories to the cloud even when users had enabled privacy settings. The release covers the agent runtime, not the underlying Grok model weights.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Simon Willison's Weblog",
        "href": "https://simonwillison.net/2026/Jul/15/grok-build/"
      },
      {
        "name": "Blockchain.News",
        "href": "https://blockchain.news/news/xai-open-sources-grok-build"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/grok-build-open-source.png",
      "alt": "Source code displayed on a computer monitor.",
      "credit": "Wikimedia Commons"
    },
    "rank": 39,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Around 1440 in Mainz, the goldsmith Johannes Gutenberg perfected movable metal type, and by 1455 his press had produced the first substantial printed book, the 42-line Bible. Knowledge that scribes and clergy had long guarded in hand-copied manuscripts suddenly became cheaply reproducible; within decades presses in some 270 European cities had struck more than twenty million volumes. A technology once locked in monastic scriptoria was effectively handed to the reading public, seeding the Reformation and the Scientific Revolution. Just as Gutenberg turned a closely held craft into a shared engine of literacy, xAI's decision to publish Grok Build's source under the Apache 2.0 license hands a once-proprietary coding agent to any developer who wants to run and inspect it locally. In both cases it is the release of the machinery itself, not merely its output, that democratizes the power.",
        "excerpt": "Around 1440, the goldsmith Johannes Gutenberg invented a method for mass-producing movable type for a printing press; from Mainz the press spread within a few decades to around 270 cities across Europe, and by 1500 the presses of Western Europe had produced more than twenty million copies. Books that scribes had guarded became reproducible by the thousands, putting the tools of knowledge into ordinary hands.",
        "source": "\"Printing press,\" Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Printing_press",
        "image": {
          "src": "/covers/grok-build-open-source--a0.png",
          "alt": "An open volume of the Gutenberg Bible (c. 1455), showing dense printed Latin text in two columns.",
          "credit": "Gutenberg Bible, Lenox Copy, New York Public Library, photographed 2009, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On April 12, 1955, the day his polio vaccine was declared safe and effective, Jonas Salk was asked by broadcaster Edward R. Murrow who owned the patent. Salk answered that there was no patent and that the vaccine belonged to the people, asking whether one could patent the sun. Rather than lock up a breakthrough that terrified families desperately needed, he treated it as a commons, prizing distribution over profit. xAI's release of Grok Build echoes that instinct: after the agent was caught quietly hoarding users' private repositories in the cloud, the company opened the code so anyone could see, audit, and freely run it. Where Salk refused to fence off a cure, xAI unfenced a tool whose hidden behavior had broken users' trust.",
        "excerpt": "Interviewed on national radio the day the vaccine was announced, Salk waved away the very idea of ownership, insisting the vaccine belonged to the people and that patenting it would be as absurd as patenting sunlight. He sought no royalties and no monopoly, wagering that unguarded access would end an epidemic faster than any commercial claim. The gesture became lasting shorthand for science given freely to humanity.",
        "source": "\"Jonas Salk,\" Wikipedia, on the 1955 Edward R. Murrow interview.",
        "href": "https://en.wikipedia.org/wiki/Jonas_Salk",
        "image": {
          "src": "/covers/grok-build-open-source--a1.png",
          "alt": "Candid portrait photograph of Jonas Salk, developer of the polio vaccine, c. 1959.",
          "credit": "Jonas Salk, c. 1959, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Aeschylus's tragedy Prometheus Bound (staged in Athens in the fifth century BCE), the Titan Prometheus is chained to a desolate Caucasian crag as punishment for stealing fire from the gods and giving it to mortals. He confesses that he stopped humans from foreseeing their doom, planted blind hopes within them, and above all delivered fire, from which they would learn many arts. Zeus's fury is the rage of a power determined to keep a transformative technology for itself. The parallel to Grok Build is direct: a jealously guarded capability, held in the cloud and hidden even from its own users, is wrenched into the open and placed in ordinary hands. Like Prometheus, the giver acts against the instinct to hoard, though here disclosure follows exposure rather than pure defiance.",
        "excerpt": "Yes, I caused mortals to cease foreseeing their doom. . . . I caused blind hopes to dwell within their breasts. . . . In addition, I gave them fire. . . . Yes, and from it they shall learn many arts.",
        "source": "Aeschylus, Prometheus Bound, trans. Herbert Weir Smyth (Perseus Digital Library).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010:card=248",
        "image": {
          "src": "/covers/grok-build-open-source--a2.png",
          "alt": "A marble bust of the Greek tragedian Aeschylus, author of Prometheus Bound.",
          "credit": "Bust of Aeschylus, Roman copy; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In the third chapter of Genesis, the serpent promises that eating from the tree of the knowledge of good and evil will bring not death but revelation, telling the woman that their eyes shall be opened. When Adam and Eve eat, the eyes of them both are opened, and something hidden, their own nakedness, is suddenly seen. The story fuses knowledge, exposure, and the loss of a comfortable concealment, the very triad at the heart of the Grok Build episode. xAI's users learned that their private code had been silently uploaded even with privacy settings on, and the open-sourcing pried the black box apart so that what the software actually did could finally be seen. Whether painful or liberating, the opening of eyes cannot be undone.",
        "excerpt": "For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil. . . . And the eyes of them both were opened, and they knew that they were naked; and they sewed fig leaves together, and made themselves aprons.",
        "source": "Genesis 3:5, 3:7, King James Version (Wikisource).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/grok-build-open-source--a3.png",
          "alt": "Albrecht Dürer's 1504 engraving 'Adam and Eve' at the tree of knowledge.",
          "credit": "Albrecht Dürer, 'Adam and Eve' (1504); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Heinrich Füger's neoclassical canvas \"Prometheus Brings Fire to Mankind\" (1817) shows the Titan bearing a flaming torch down to shadowed, half-formed humans who reach upward toward the light. The painting renders the gift of enlightenment literally, as illumination passing from a jealous heaven into human hands. Füger casts the act as noble and generative, the founding moment of art, craft, and civilization itself. The image maps onto xAI's release of Grok Build's source under the Apache 2.0 license, a guarded fire, comprising the agent loop, tools, UI, and extensions, carried out of the corporate cloud and set before the developer community to use and rekindle. The torch in the painting is the runtime now running on anyone's terminal.",
        "excerpt": "Against a darkened sky, a luminous Prometheus descends bearing a burning torch, its glow spilling across the pale, newly made human figures who strain upward to receive it. The composition stages the transfer of power itself: light, once held above, now given below. It is the moment a guarded technology becomes a shared inheritance.",
        "source": "Heinrich Füger, Prometheus Brings Fire to Mankind, 1817, Neue Galerie / Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/grok-build-open-source--a4.png",
          "alt": "Painting of Prometheus holding a flaming torch aloft as pale human figures reach up toward the fire.",
          "credit": "Heinrich Füger, \"Prometheus Brings Fire to Mankind,\" 1817, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven's ballet score \"The Creatures of Prometheus,\" Op. 43, premiered in Vienna in 1801, dramatizes the Titan animating two clay statues and leading them to Parnassus to be schooled in the arts and sciences. Prometheus is staged as the enlightener who does not keep knowledge to himself but bestows music, dance, and reason on his creations. Its triumphant finale theme so pleased Beethoven that he reused it in the Eroica Symphony, making Promethean giving the seed of one of his greatest works. The analogy to Grok Build is the spirit of transmission: a maker turning inward-held craft outward, handing the very tools of creation to those who will carry them further. xAI's open-sourcing likewise treats a coding agent less as private property than as instruction meant to be passed on.",
        "excerpt": "Beethoven's overture and dances trace Prometheus animating lifeless figures and tutoring them, through music itself, in the arts of civilization. The score turns the myth of the fire-giver into sound, exulting in knowledge shared rather than withheld. That its jubilant closing theme returns in the Eroica marks how a gift, once given, propagates into new creation.",
        "source": "Ludwig van Beethoven, The Creatures of Prometheus, Op. 43 (1801); portrait of Beethoven by Christian Horneman (1803), Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Beethoven_Hornemann.jpg",
        "image": {
          "src": "/covers/grok-build-open-source--a5.png",
          "alt": "Miniature portrait of Ludwig van Beethoven painted by Christian Horneman in 1803.",
          "credit": "Christian Horneman, portrait of Ludwig van Beethoven, 1803, via Wikimedia Commons (public domain)."
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
