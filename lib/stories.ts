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
// the newest edition leads with its hero story, followed by the two prior
// editions rendered as labeled grids.
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
    "slug": "cuba-national-grid-collapse-blackout",
    "headline": "Cuba's national electricity grid collapses, plunging the island's roughly 10 million people into darkness in the country's sixth nationwide blackout of 2026",
    "overview": "Cuba's National Electric System disconnected entirely at about 10:43 p.m. on Sunday, the state Electric Union said, cutting power across the island of some 10 million people for the sixth time this year. The grid has repeatedly failed in 2026 amid chronic shortages of fuel and spare parts and breakdowns at thermoelectric plants, some more than 30 years old. Havana has struggled to import fuel since the loss of its main ally, Venezuela, and amid renewed US pressure.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxOMTdFbGhVSWlfdzZ3aWduVjdUeTFvMnBFVFhaMjg4SkhrMXJlcnFtWTlWTTdnRjNLMzRCNHg4Tm9OTlpkM2c3QlFGR2RuejZnNlM5R182b09EbXQ4dG5RaEJjSHNDRjhtOS1aY05DZlAtQWlMZVBHdE1yY0xFb29yazdJeW03ZXVGcXZSQ2FLOFlremVCcGZ0ckZobkFqRG9fZGc?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/8/3/grid-failure-plunges-cuba-into-nationwide-blackout"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/cuba-national-grid-collapse-blackout.png",
      "alt": "A darkened Havana skyline at night during a nationwide power blackout in Cuba.",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "A Darkness Like a Sealed Room",
        "excerpt": "We had scarcely sat down when night was upon us,—not such as we have when there is no moon, or when the sky is cloudy, but such as there is in some closed room when the lights are extinguished. You might hear the shrieks of women, the monotonous wailing of children, the shouts of men.",
        "source": "Pliny the Younger, Letters, Book VI (second letter to Cornelius Tacitus on the eruption of Vesuvius, AD 79), English translation, in 'Pliny's Letters,' Chapter 2. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Pliny%27s_Letters/Chapter_2"
      },
      {
        "category": "historical",
        "title": "The Dark Day of 1780",
        "excerpt": "We were here at the time the 'dark day' happened, (19th of May;) it has been said that the darkness was not so great in New-Jersey as in New-England. How great it was there I do not know, but I know that it was very dark where I then was in New-Jersey; so much so that the fowls went to their roosts, the cocks crew and the whip-poor-wills sung their usual serenade; the people had to light candles in their houses to enable them to see to carry on their usual business; the night was as uncommonly dark as the day was.",
        "source": "Joseph Plumb Martin, The Adventures of a Revolutionary Soldier (A Narrative of Some of the Adventures, Dangers and Sufferings of a Revolutionary Soldier, 1830), Chapter VI. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Adventures_Of_A_Revolutionary_Soldier/Chapter_VI."
      },
      {
        "category": "literary",
        "title": "The Bright Sun Was Extinguished",
        "excerpt": "I had a dream, which was not all a dream.\nThe bright sun was extinguished, and the stars\nDid wander darkling in the eternal space,\nRayless, and pathless, and the icy Earth\nSwung blind and blackening in the moonless air;\nMorn came and went—and came, and brought no day,\nAnd men forgot their passions in the dread\nOf this their desolation; and all hearts\nWere chilled into a selfish prayer for light:\nAnd they did live by watchfires—and the thrones,\nThe palaces of crownéd kings—the huts,\nThe habitations of all things which dwell,",
        "source": "Lord Byron, 'Darkness' (1816), in The Works of Lord Byron, Vol. IV. Project Gutenberg eBook No. 20158.",
        "href": "https://www.gutenberg.org/files/20158/20158-h/20158-h.htm"
      },
      {
        "category": "literary",
        "title": "Darkness Which May Be Felt",
        "excerpt": "And the LORD said unto Moses, Stretch out thine hand toward heaven, that there may be darkness over the land of Egypt, even darkness which may be felt. And Moses stretched forth his hand toward heaven; and there was a thick darkness in all the land of Egypt three days: They saw not one another, neither rose any from his place for three days: but all the children of Israel had light in their dwellings.",
        "source": "The Holy Bible, King James Version, Exodus 10:21–23. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus"
      },
      {
        "category": "artistic",
        "title": "Nocturne on a Darkened River",
        "excerpt": "Whistler drains a great city at night down to a few strokes of blue-black and faint gold: the pier of Old Battersea Bridge looms as a silhouette over a Thames barely distinguishable from the sky, with only distant sparks of light to mark that a metropolis is there at all. The painting turns a darkened urban waterfront into something hushed and near-formless, an apt mirror for an island whose skyline vanishes when the grid fails.",
        "source": "James McNeill Whistler, Nocturne: Blue and Gold – Old Battersea Bridge (c. 1872–1875), oil on canvas, Tate Britain, London. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:James_McNeill_Whistler_-_Nocturne_en_bleu_et_or.jpg",
        "image": {
          "src": "/covers/cuba-national-grid-collapse-blackout--a4.png",
          "alt": "A misty nocturnal view of the Thames with the tall dark pier of Old Battersea Bridge silhouetted against a blue-black sky, faint golden lights and sparks of fireworks glimmering in the distance.",
          "credit": "James McNeill Whistler, Nocturne: Blue and Gold – Old Battersea Bridge (c. 1872–1875), Tate Britain. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Representation of Chaos",
        "excerpt": "Haydn opens The Creation with 'The Representation of Chaos,' an orchestral prelude that refuses to settle: dissonances, drifting harmonies and unresolved phrases evoke a formless, lightless void before order exists—until the chorus finally erupts on the words 'and there was Light.' It is a portrait of the moment before power returns, the exact suspension a darkened nation lives through waiting for the current to come back. The composer is shown here in Thomas Hardy's 1791 portrait, painted during Haydn's London years.",
        "source": "Joseph Haydn, 'The Representation of Chaos,' opening of the oratorio The Creation (Die Schöpfung, 1798); illustrated by Thomas Hardy's portrait of Haydn (1791), Royal College of Music. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Haydn,_portrait_by_Thomas_Hardy.jpg",
        "image": {
          "src": "/covers/cuba-national-grid-collapse-blackout--a5.png",
          "alt": "Half-length painted portrait of composer Joseph Haydn in a grey coat and powdered wig, seated and facing right, holding a bound volume with a keyboard instrument behind him.",
          "credit": "Thomas Hardy, Portrait of Joseph Haydn (1791), Royal College of Music. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "us-japan-joint-yen-intervention",
    "headline": "The United States and Japan jointly intervene in currency markets to support the yen, a rare coordinated move that sends the dollar sharply lower",
    "overview": "Washington and Tokyo carried out a rare joint intervention to prop up the Japanese yen, and both said they would not hesitate to act together again in the future. The dollar fell sharply against the yen after the move, which followed weeks of pressure on the currency. US Treasury Secretary Scott Bessent signaled readiness to repeat the coordinated action and urged a bigger Federal Reserve backstop.",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cglj1pr0wjwo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxOWkpfVU0zTnBZSEZnbmNLUUxSMzVoSzVTMk1xZVRyS1FaU1hHbXBlVlpIWHJsQ1owSndGU3hKS3Znc3RVUjFiS3VnUl9vWU54Y05JT1dWb19GeG50NkttOVZld1hNUndETHJOdzhBSnhsY3FtQml3dXRRWmZxbTVSOE0teE1wMldFVmtuS3F3RXdDM1JMU29DcA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/us-japan-joint-yen-intervention.png",
      "alt": "Japanese yen banknotes fanned out beside US dollar bills, illustrating a currency intervention.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rome manipulates the value of its coin",
        "excerpt": "The weight, however, of the libra of copper was diminished during the First Punic War, the republic not having means to meet its expenditure: in consequence of which, an ordinance was made that the as should in future be struck of two ounces weight. By this contrivance a saving of five-sixths was effected, and the public debt was liquidated. ... Livius Drusus, when tribune of the people, alloyed the silver with one-eighth part of copper.",
        "source": "Pliny the Elder, The Natural History, Book XXXIII, ch. 13, trans. John Bostock and H. T. Riley (London, 1855). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0137%3Abook%3D33%3Achapter%3D13"
      },
      {
        "category": "historical",
        "title": "The Tripartite Agreement of 1936",
        "excerpt": "The Government of the United States, after consultation with the British Government and the French Government, joins with them in affirming a common desire to foster those conditions which safeguard peace and will best contribute to the restoration of order in international economic relations... The United States Government, as also the British and French Governments, declares its intention to continue to use appropriate available resources so as to avoid as far as possible any disturbance of the basis of international exchange resulting from the proposed readjustment. It will arrange for such consultation for this purpose as may prove necessary with the other two Governments and their authorized agencies.",
        "source": "Declaration on currency (Tripartite Agreement), statement issued by the U.S. Treasury, September 25, 1936, reprinted in Federal Reserve Bulletin, Vol. 22, No. 10 (October 1936), pp. 759-760. FRASER, Federal Reserve Bank of St. Louis.",
        "href": "https://fraser.stlouisfed.org/files/docs/publications/FRB/1930s/frb_101936.pdf"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes on the hunger for silver",
        "excerpt": "He that loveth silver shall not be satisfied with silver; nor he that loveth abundance with increase: this is also vanity. When goods increase, they are increased that eat them: and what good is there to the owners thereof, saving the beholding of them with their eyes? The sleep of a labouring man is sweet, whether he eat little or much: but the abundance of the rich will not suffer him to sleep.",
        "source": "Ecclesiastes 5:10-12, King James Version (1611; 1769 standard text). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "literary",
        "title": "Timon's yellow slave that makes black white",
        "excerpt": "Gold? Yellow, glittering, precious Gold?\nNo Gods, I am no idle Votarist,\nRoots you cleere Heauens. Thus much of this will make\nBlacke, white; fowle, faire; wrong, right;\nBase, Noble; Old, young; Coward, valiant.\n...\nThis yellow Slaue,\nWill knit and breake Religions, blesse th' accurst,\nMake the hoare Leprosie ador'd, place Theeues,\nAnd giue them Title, knee, and approbation\nWith Senators on the Bench...",
        "source": "William Shakespeare, The Life of Timon of Athens (First Folio text, 1623), Act IV, Scene 3. Project Gutenberg, ebook no. 1132.",
        "href": "https://www.gutenberg.org/ebooks/1132"
      },
      {
        "category": "artistic",
        "title": "Reymerswaele, ‘The Banker and His Wife’",
        "excerpt": "Marinus van Reymerswaele paints a banker hunched over his balance and stacked gold coins, weighing currency to the last grain while his wife looks up from an illuminated ledger. The obsessive attention to the metal’s exact worth makes money itself the true subject of the picture. It is an early portrait of a world in which the precise value of a coin—and the will to defend it—governs everything.",
        "source": "Marinus van Reymerswaele, The Banker and His Wife (c. 1538), oil on panel. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Marinus_van_Reymerswale_-_The_Banker_and_His_Wife_-_WGA19323.jpg",
        "image": {
          "src": "/covers/us-japan-joint-yen-intervention--a4.png",
          "alt": "A 16th-century banker weighs gold coins on a balance while his wife watches beside an open ledger.",
          "credit": "Marinus van Reymerswaele, The Banker and His Wife (c. 1538). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Rhinegold hoard",
        "excerpt": "In the opening scene of Das Rheingold the Nibelung Alberich steals the gold guarded by the Rhinemaidens and forges it into a ring that promises mastery over the world, setting gods, dwarves and giants scheming to seize and redistribute the hoard. Wagner scores this contest over gold with the shimmering, endlessly rising Rhine motif and the ominous ring theme, turning the manipulation of a single golden treasure into the engine of an entire cosmic drama. The parallel is exact: whoever controls the store of value controls the balance of power, and every party maneuvers to bend that value to its own ends.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (composed 1854, first performed 1869); full score at IMSLP. Portrait: Casar Willich, Portrait of Richard Wagner (c. 1862).",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/us-japan-joint-yen-intervention--a5.png",
          "alt": "Oil portrait of a middle-aged Richard Wagner in dark coat and white cravat, seen half-length against a plain dark background, gazing slightly to one side.",
          "credit": "Casar Willich, Portrait of Richard Wagner (c. 1862), Reiss-Engelhorn-Museen, Mannheim. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "aung-san-suu-kyi-red-cross-visit",
    "headline": "Myanmar's military releases photos of detained former leader Aung San Suu Kyi meeting a Red Cross official, her first confirmed outside contact in about two and a half years",
    "overview": "Myanmar's military government released photographs showing Aung San Suu Kyi, 81, meeting an official of the International Committee of the Red Cross, her first confirmed contact with the outside world since early 2024. The Nobel laureate has been held largely incommunicado since the 2021 coup and is serving decades-long prison sentences. Rights groups have repeatedly demanded proof of her wellbeing.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPRjJySG5fWC1faXFlRjYzYndjVkNQMVhTQ1BHalhDVklUZ3d5TzY2R29lUzFaSTNCaGNWNzVDd0JTY3c2MDZTWm9tbmJFWGtpSl9ldDN4NkVuOV9NaURPNWxKODdJZDZmQ0RqbDNzaUMtc3RwUTJ2UW5RR0ZKdzItbjVuWEVIRjZROFgtbnh6SFkyTElUVG9DdTdiclNzdU5hZWEzS05GRFh6bHJnYy03d2NSenhmZWV3Uy1fR19B?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c1e1d5j6660o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/aung-san-suu-kyi-red-cross-visit.png",
      "alt": "The headquarters of the International Committee of the Red Cross in Geneva.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Boethius awaiting execution in his cell",
        "excerpt": "'Ah! why,' I cried, 'mistress of all excellence, hast thou come down from on high, and entered the solitude of this my exile? Is it that thou, too, even as I, mayst be persecuted with false accusations?'\n\n'Could I desert thee, child,' said she, 'and not lighten the burden which thou hast taken upon thee through the hatred of my name, by sharing this trouble?'",
        "source": "Boethius, The Consolation of Philosophy, written c. 524 AD while imprisoned at Pavia awaiting execution; translated into English prose and verse by H. R. James (1897). Project Gutenberg eBook #14328.",
        "href": "https://www.gutenberg.org/cache/epub/14328/pg14328.txt"
      },
      {
        "category": "historical",
        "title": "The Red Cross reaches Mandela on Robben Island",
        "excerpt": "Like the ICRC photograph now released from Myanmar, the Red Cross visits to apartheid South Africa's political prisoners were often the sole confirmed channel between a detained leader and the outside world. From 1967 to 1986, ICRC delegates saw Nelson Mandela repeatedly, first on Robben Island and later at Pollsmoor, pressing for humane conditions and carrying word of his condition beyond the prison walls when the state kept him otherwise cut off. Their reports made an isolated, incommunicado prisoner visible again, echoing exactly the role a Red Cross official plays for Aung San Suu Kyi.",
        "source": "International Committee of the Red Cross, 'A tribute to Nelson Mandela' (ICRC official record of its 1967-1986 prison visits).",
        "href": "https://www.icrc.org/en/document/tribute-nelson-mandela"
      },
      {
        "category": "literary",
        "title": "Lovelace: stone walls do not a prison make",
        "excerpt": "Stone walls doe not a prison make,\nNor iron bars a cage;\nMindes innocent and quiet take\nThat for an hermitage;\nIf I have freedome in my love,\nAnd in my soule am free,\nAngels alone that sore above\nEnjoy such liberty.",
        "source": "Richard Lovelace, 'To Althea, from Prison' (written 1642 during his imprisonment; published in Lucasta, 1649). Wikisource.",
        "href": "https://en.wikisource.org/wiki/To_Althea,_from_Prison"
      },
      {
        "category": "literary",
        "title": "Wilde's prisoner and the tent of blue",
        "excerpt": "I never saw a man who looked\nWith such a wistful eye\nUpon that little tent of blue\nWhich prisoners call the sky,\nAnd at every drifting cloud that went\nWith sails of silver by.",
        "source": "Oscar Wilde, 'The Ballad of Reading Gaol' (1898), written after his own imprisonment. Project Gutenberg eBook #301.",
        "href": "https://www.gutenberg.org/files/301/301-h/301-h.htm"
      },
      {
        "category": "artistic",
        "title": "Van Gogh: the prisoners' round",
        "excerpt": "Painted in 1890 while Van Gogh was himself confined at the asylum in Saint-Remy, 'Prisoners Exercising' shows inmates trudging in an endless circle at the bottom of a sheer, blue-walled shaft, hemmed in on every side with no sky in view. The tiny, bowed figures and the crushing verticality of the walls make visible the years of enforced isolation behind Aung San Suu Kyi's detention, and the single upturned face suggests the smallest gesture toward the outside world.",
        "source": "Vincent van Gogh, Prisoners Exercising (Prisoners' Round, after Gustave Dore), 1890, oil on canvas, Pushkin Museum of Fine Arts, Moscow.",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_Willem_van_Gogh_037.jpg",
        "image": {
          "src": "/covers/aung-san-suu-kyi-red-cross-visit--a4.png",
          "alt": "A ring of prisoners in muted uniforms trudging single file in a tight circle at the foot of towering blue-grey prison walls, one man's pale face turned toward the viewer.",
          "credit": "Vincent van Gogh, Prisoners Exercising (1890), Pushkin Museum of Fine Arts, Moscow. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven's prisoners, briefly in the light",
        "excerpt": "In the Prisoners' Chorus of Beethoven's only opera, Fidelio, captives are let up from their dungeon into the open air for a single stolen moment and sing tremulously of light and freedom before being driven back below. Composed in a Vienna shadowed by tyranny, it turns a brief, monitored glimpse of the outside world into one of music's great emblems of hope for the unjustly detained, the same fragile opening the released ICRC photograph represents for Aung San Suu Kyi.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72 (1805, rev. 1814); Prisoners' Chorus, 'O welche Lust'. Full scores at IMSLP. Portrait: Joseph Karl Stieler, 1820, Beethoven-Haus, Bonn.",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/aung-san-suu-kyi-red-cross-visit--a5.png",
          "alt": "Oil portrait of Ludwig van Beethoven seated with a red scarf, holding pen and a manuscript, gazing intently upward and to the side.",
          "credit": "Joseph Karl Stieler, Beethoven with the Manuscript of the Missa Solemnis (1820), Beethoven-Haus, Bonn. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "deepseek-alibaba-low-cost-ai-models",
    "headline": "DeepSeek releases what a research firm calls the cheapest well-known AI model to run, hours after Alibaba unveils its largest model yet, escalating China's AI price war",
    "overview": "DeepSeek launched a new model that the research firm Artificial Analysis called by far the cheapest of any well-known model to operate, undercutting rivals on inference cost. The release came shortly after Alibaba unveiled its largest artificial-intelligence model to date. The dueling launches sharpen a race among Chinese developers to combine frontier performance with ultra-low prices.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxOTnd6ckhOVUhwcGJjRmxRdlhObS1ncXRhZm9OeVUwaEgwOTg5YmNBTGVWcHZsdXd4dXVrWWdlZGtsYkw0eDIyY1A3NjdSM0o0bFBGUEZRNDF2NjYwZEtCamNpeTFqN3ZaQVlTclNuQWYxNXh4ZVlqaWF3WkNNVk1fbmJXcTdISlBmUVVWS01STmFYZldLSGk5akJQZVB5X09OSzVoVWF4Wko4TEF4cGozQUlWM202dFJWMGxSRTdpcTNaaUp6bmNyZXpWbVRFb2JoSzdCVQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0wFBVV95cUxObUlCNHp6dVFoTEtqbkF3aFZqaVNUUVRJd0dicUhkb2tidzdkUWg0OVp1SU94aFJ1dmdkbDZIZGxMQVNWMm5vYXNKR0JicHNwZWRVX25ZY0hHaTNVUVdIWGdBNERsS3hDT29CdzlydEFGbFJzblgyempKcjljLVFELTVPRjdHVnRrOVRmQUs5QWVFQlg3aWVET1lNcDE4R2wwSC1vazRDaTNTZFhURm9qUGFfWGE5Sk1pMHNBUWx3TG85S1lZSWV4TUJxRU11UVhMR2Iw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/deepseek-alibaba-low-cost-ai-models.png",
      "alt": "A data-center server hall with rows of racks, illustrating AI model inference.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Bacon names printing as a world-changing engine",
        "excerpt": "Again, we should notice the force, effect, and consequences of inventions, which are nowhere more conspicuous than in those three which were unknown to the ancients; namely, printing, gunpowder, and the compass. For these three have changed the appearance and state of the whole world: first in literature, then in warfare, and lastly in navigation; and innumerable changes have been thence derived, so that no empire, sect, or star, appears to have exercised a greater power and influence on human affairs than these mechanical discoveries.",
        "source": "Francis Bacon, Novum Organum (The New Organon), Book I, Aphorism 129, 1620, trans. from the Latin; Project Gutenberg edition (eBook #45988).",
        "href": "https://www.gutenberg.org/files/45988/45988-h/45988-h.htm"
      },
      {
        "category": "historical",
        "title": "Babbage: machinery, competition, and the collapse of price",
        "excerpt": "We have seen that the application of the division of labour tends to produce cheaper articles; that it thus increases the demand; and gradually, by the effect of competition, or by the hope of increased gain, that it causes large capitals to be embarked in extensive factories.",
        "source": "Charles Babbage, On the Economy of Machinery and Manufactures, 1832 (paragraph 269); Project Gutenberg edition (eBook #4238).",
        "href": "https://www.gutenberg.org/cache/epub/4238/pg4238.html"
      },
      {
        "category": "literary",
        "title": "Capek's cheapest possible worker",
        "excerpt": "DOMIN. No. The one that is the cheapest. The one whose requirements are the smallest. Young Rossum invented a worker with the minimum amount of requirements. He had to simplify him. He rejected everything that did not contribute directly to the progress of work. Everything that makes man more expensive. In fact he rejected man and made the Robot. My dear Miss Glory, the Robots are not people. Mechanically they are more perfect than we are; they have an enormously developed intelligence, but they have no soul.",
        "source": "Karel Capek, R.U.R. (Rossum's Universal Robots), 1920, English translation by Paul Selver and Nigel Playfair; Project Gutenberg edition (eBook #59112).",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm"
      },
      {
        "category": "literary",
        "title": "The spark of being infused into an engineered mind",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Wollstonecraft Shelley, Frankenstein; or, The Modern Prometheus, Chapter 5, 1818; Project Gutenberg edition (eBook #84).",
        "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt"
      },
      {
        "category": "artistic",
        "title": "The Mechanical Turk: a machine that seems to think",
        "excerpt": "Racknitz's cutaway engraving exposes the hidden operator crouched inside Wolfgang von Kempelen's chess-playing 'Turk,' the eighteenth century's most famous automaton. For decades audiences across Europe believed a mere mechanism could out-reason a human being. The print is a fitting emblem for an age dazzled by the apparent intelligence of machines and by the question of how cheaply that intelligence can truly be produced.",
        "source": "Joseph Friedrich Freiherr zu Racknitz, engraving of Kempelen's chess automaton, from Ueber den Schachspieler des Herrn von Kempelen, 1789. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Racknitz_-_The_Turk_3.jpg",
        "image": {
          "src": "/covers/deepseek-alibaba-low-cost-ai-models--a4.png",
          "alt": "A hand-colored engraving showing the Turk automaton, a robed figure seated at a chess cabinet, with the cabinet's doors open to reveal the internal machinery and the space concealing a human operator.",
          "credit": "Joseph Friedrich zu Racknitz, engraving of Kempelen's chess-playing automaton (1789). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Knowledge made visible around a machine",
        "excerpt": "In Joseph Wright of Derby's candlelit scene, a lecturer demonstrates an orrery, a clockwork model of the solar system, to an enthralled group of ordinary onlookers. A single lamp stands in for the sun, throwing rapt faces into golden light. Painted at the dawn of the Industrial Revolution, it captures the moment when mechanized instruments began to place once-rarefied knowledge within everyone's reach.",
        "source": "Joseph Wright of Derby, A Philosopher Lecturing on the Orrery, oil on canvas, c. 1766, Derby Museum and Art Gallery. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Wright_of_Derby,_The_Orrery.jpg",
        "image": {
          "src": "/covers/deepseek-alibaba-low-cost-ai-models--a5.png",
          "alt": "A dramatic candlelit oil painting in which a lecturer and a circle of adults and children lean over a brass mechanical model of the planets, their faces illuminated by a hidden lamp at the model's center.",
          "credit": "Joseph Wright of Derby, A Philosopher Lecturing on the Orrery (c. 1766), Derby Museum and Art Gallery. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "liechtenstein-company-register-cyberattack",
    "headline": "A cyberattack on Liechtenstein's business register exposes information on about 31,000 companies and foundations, including the people behind them, officials say",
    "overview": "Hackers accessed Liechtenstein's central register of legal entities, obtaining data on roughly 31,000 companies and foundations along with details of the beneficial owners behind them, authorities said. The tiny Alpine principality is a well-known offshore financial center, making the breach potentially sensitive for wealthy account holders worldwide. Officials said they were investigating the scope of the intrusion.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPVGxRSjQ4RVRJNVQ3QWY0aGFRemxqN19ISlRTSUdlV1pLWWJob29zcjBHQktNZ3ZpcFBROEpERnBqTHVILXNVbTd2SnFLMExoTktvYy1WLVVpU0VnSDlBd2s3ZjBEZGU2ampLUXd2VFBEcmhnWlEycjMzMjZFcExzbERSS0hEa3hwYkZQTi1sb2owYmh0RHl6UDNQalJIWWdr?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQcWdkeThJMDZ2MFc0N2tjZ1FQdHNlMjg2UXA5NnJjamh6aXAxMkEzUTZlUkxidGtXM29DdS1kVHJYamFoOUM5MVBydXZQbG1UZzJja09oTUoteTdoTGpuY1hLYWJpVXA3TWxDMXNhajZJdmtaZWliRkdhNTVtU2xLMWtMNjZRWWs2bVgxaDVJSTFpS3pzeTlRTmJwQ1M2SW4waUp3Rjg1dGk2OWxj?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/liechtenstein-company-register-cyberattack.png",
      "alt": "Vaduz Castle above the capital of Liechtenstein, the Alpine financial principality.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Clodius Burns the Roman Register",
        "excerpt": "eum qui aedem nympharum incendit ut memoriam publicam recensionis tabulis publicis impressam exstingueret",
        "source": "Cicero, Pro Milone 73 (Latin text, ed. A. C. Clark), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0011:text=Mil.:section=73"
      },
      {
        "category": "historical",
        "title": "Sunlight on the Money Trust",
        "excerpt": "Publicity is justly commended as a remedy for social and industrial diseases. Sunlight is said to be the best of disinfectants; electric light the most efficient policeman. And publicity has already played an important part in the struggle against the Money Trust.",
        "source": "Louis D. Brandeis, Other People's Money and How the Bankers Use It, ch. V, 'What Publicity Can Do' (1914), Project Gutenberg ebook #57819",
        "href": "https://www.gutenberg.org/files/57819/57819-h/57819-h.htm"
      },
      {
        "category": "literary",
        "title": "The Document That Confers Power",
        "excerpt": "“Yes,” replied the Prefect; “and the power thus attained has, for some months past, been wielded, for political purposes, to a very dangerous extent. The personage robbed is more thoroughly convinced, every day, of the necessity of reclaiming her letter.”",
        "source": "Edgar Allan Poe, 'The Purloined Letter' (1845), in The Works of Edgar Allan Poe, Vol. 2, Project Gutenberg ebook #2148",
        "href": "https://www.gutenberg.org/files/2148/2148-h/2148-h.htm"
      },
      {
        "category": "literary",
        "title": "Open, Sesame: The Vault Cracked Open",
        "excerpt": "The finest man among them, whom Ali Baba took to be their captain, went a little way among some bushes, and said: “Open, Sesame!” so plainly that Ali Baba heard him. A door opened in the rocks, and having made the troop go in, he followed them, and the door shut again of itself.",
        "source": "'The Forty Thieves,' in Andrew Lang (ed.), The Blue Fairy Book (1889), Project Gutenberg ebook #503",
        "href": "https://www.gutenberg.org/files/503/503-h/503-h.htm"
      },
      {
        "category": "artistic",
        "title": "Weighing the Hidden Wealth",
        "excerpt": "A moneychanger tips gold coins onto a balance while his wife, distracted from her prayer book, watches the glint of the metal; on the shelf and table sit the instruments of a private financial world kept in ledgers and coin. Like a register of a wealth center's clients, the painting turns intimate, hidden riches into something meticulously counted and recorded, a small convex mirror hinting that an unseen eye is always watching what should stay private.",
        "source": "Quentin Matsys, The Money Changer and His Wife (1514), oil on panel, Musée du Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/liechtenstein-company-register-cyberattack--a4.png",
          "alt": "A seated 16th-century moneychanger weighs gold coins on a small balance while his richly dressed wife beside him looks up from an illuminated prayer book toward the money.",
          "credit": "Quentin Matsys, The Money Changer and His Wife (1514), Musée du Louvre. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Rich Man Alone with His Ledgers",
        "excerpt": "By the glow of a single candle an old man peers through spectacles at a coin, hemmed in by piles of papers, account books, sealed documents and money bags heaped in the dark. Rembrandt's rich fool hoards a fortune of records and coin in secret, a fitting image for a register in which the private holdings of thousands are locked away until a single breach floods the shadows with light.",
        "source": "Rembrandt van Rijn, The Parable of the Rich Fool (The Money Changer) (1627), oil on oak panel, Gemäldegalerie, Berlin",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_The_Parable_of_the_Rich_Fool.jpg",
        "image": {
          "src": "/covers/liechtenstein-company-register-cyberattack--a5.png",
          "alt": "In near-darkness an old bespectacled man holds a gold coin up to a candle flame, surrounded by stacks of ledgers, papers, sealed letters and money bags.",
          "credit": "Rembrandt van Rijn, The Parable of the Rich Fool (1627), Gemäldegalerie, Berlin. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "australia-first-h5n1-seabird-die-off",
    "headline": "Australia confirms its first mass die-off of seabirds from H5N1 bird flu, with about 50 greater crested terns found dead on the South Australian coast",
    "overview": "Testing confirmed H5N1 avian influenza in a colony of greater crested terns off Cape Jaffa, about 250 km south of Adelaide, where some 49 dead and 35 sick birds were spotted from the air, officials said. It is Australia's first confirmed mass-mortality event from the virus, which was first detected in the country in June. The agriculture minister warned Australians should expect further spread among wildlife.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxPM0lHZjUwb2ZfbnBDNTFjMFJWNEdIQnh1Snp0RFQ4bWFJam01S3VnckxsanA0TDRjZkhLdGNvQzV3Zk1DaTNyV1M4SWRkU2IwVjJUdXRQMTBZQUZxRGhyMnZVWGhpSlJ5aHB3SWw2b1k0TXZqVXhuZGVNV3YtVWlid1pYRGRjMnJGdzJFWGtRaEpaSW5OcXBHamc0WTY1QjFVSnk1Sk5mTWJTeDViUHBYeV9qXzVPdE9QNVU3c0piZmFFYkJTWmhTcA?oc=5"
      },
      {
        "name": "IBTimes",
        "href": "https://www.ibtimes.com.au/australia-first-mass-bird-flu-event-1873355"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/australia-first-h5n1-seabird-die-off.png",
      "alt": "A greater crested tern standing on a rocky shore.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The murrain of Egypt: a plague upon the beasts",
        "excerpt": "Behold, the hand of the LORD is upon thy cattle which is in the field, upon the horses, upon the asses, upon the camels, upon the oxen, and upon the sheep: there shall be a very grievous murrain. . . . And the LORD did that thing on the morrow, and all the cattle of Egypt died: but of the cattle of the children of Israel died not one.",
        "source": "The Holy Bible, King James Version (1769 Oxford edition), Exodus 9:3-6. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus"
      },
      {
        "category": "historical",
        "title": "The last of the great auks, hunted from the seas",
        "excerpt": "In like manner the fact is incontestable that its breeding-stations in the western part of the Atlantic were for three centuries regularly visited and devastated with the combined objects of furnishing food or bait to the fishermen from very early days, and its final extinction . . . was owing to “the ruthless trade in its eggs and skin.” . . . yet on this rock (Eldey = fire-island) they were “specially hunted down” whenever opportunity offered, until the stock there was wholly extirpated in 1844.",
        "source": "“Gare-fowl” (the Great Auk, Alca impennis), Encyclopædia Britannica, 11th edition (1911). Wikisource.",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gare-fowl"
      },
      {
        "category": "literary",
        "title": "Lucretius: when the very birds fell sick and died",
        "excerpt": "And though corpse on corpse lay piled\nUnburied on ground, the race of birds and beasts\nWould or spring back, scurrying to escape\nThe virulent stench, or, if they'd tasted there,\nWould languish in approaching death. But yet\nHardly at all during those many suns\nAppeared a fowl, nor from the woods went forth\nThe sullen generations of wild beasts--\nThey languished with disease and died and died.",
        "source": "Lucretius, De Rerum Natura (On the Nature of Things), Book VI — the Plague of Athens, trans. William Ellery Leonard. Project Gutenberg.",
        "href": "https://www.gutenberg.org/ebooks/785"
      },
      {
        "category": "literary",
        "title": "The slain seabird and the crew struck dead",
        "excerpt": "“God save thee, ancient Mariner!\nFrom the fiends, that plague thee thus!--\nWhy look'st thou so?”--With my cross-bow\nI shot the ALBATROSS.\n\n. . .\n\nFour times fifty living men,\n(And I heard nor sigh nor groan)\nWith heavy thump, a lifeless lump,\nThey dropped down one by one.",
        "source": "Samuel Taylor Coleridge, “The Rime of the Ancient Mariner” (1798). Project Gutenberg.",
        "href": "https://www.gutenberg.org/ebooks/151"
      },
      {
        "category": "artistic",
        "title": "Audubon's crested tern on the shore",
        "excerpt": "Audubon's aquatint portrays a Cayenne Tern — a crested tern of the same genus (Thalasseus) as the greater crested terns now dying on South Australian beaches — alert and immaculate on the tideline, the living bird at the height of its spring plumage. Set against a grey sea and lowering sky, the image is a naturalist's celebration of a species in full vigour, which lends a quiet elegy to news of the same kind of bird washing up dead by the dozen.",
        "source": "Robert Havell after John James Audubon, Cayenne Tern (Sterna cayana), Plate 273 from The Birds of America (1835). National Gallery of Art, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Robert_Havell_after_John_James_Audubon,_Cayenne_Tern,_1835,_NGA_32414.jpg",
        "image": {
          "src": "/covers/australia-first-h5n1-seabird-die-off--a4.png",
          "alt": "A hand-colored aquatint of a crested (Cayenne) tern standing on a sandy shore, with a black cap, white face and underparts, pale grey back and long forked tail, and a bright red bill; a pink land crab crouches beside it beneath a grey sea and cloudy sky.",
          "credit": "Robert Havell after John James Audubon, Cayenne Tern, Plate 273 from The Birds of America (1835), National Gallery of Art. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "A still life of dead birds",
        "excerpt": "Dupuis heaps the spoils of the hunt on a cold stone ledge: a great pheasant with its wing flung open, ducks and small songbirds tumbled limp and lifeless, their eyes shut, beside bright oranges and a cut lemon. It is a memento mori in feathers — the beauty of plumage turned to inert weight — that answers grimly to a beach strewn with dead terns.",
        "source": "Pierre Dupuis (1610–1682), Still Life with Dead Birds (1666), oil on canvas. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:%27Still_Life_with_Dead_Birds%27_by_Pierre_Dupuis,_1666.JPG",
        "image": {
          "src": "/covers/australia-first-h5n1-seabird-die-off--a5.png",
          "alt": "An oil still life of several dead game birds — a large pheasant with one wing splayed, ducks and small songbirds — heaped limp on a stone ledge beside oranges and a cut lemon, against a dark background.",
          "credit": "Pierre Dupuis, Still Life with Dead Birds (1666), private collection. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "iran-executes-two-alleged-israel-spies",
    "headline": "Iran executes two men convicted of passing coordinates of military sites to Israel's Mossad, as executions mount during the war with Israel and the US",
    "overview": "Iran hanged Omid Behzad and Pouria Safvat after convicting them of espionage and collaboration with Israel, its judiciary said, accusing them of transmitting the coordinates of sensitive military and security sites to Mossad. Executions on spying charges have accelerated since the war with Israel and the United States began in February. The judiciary did not say when the two were arrested or tried.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxObVpPMnE4MnRQckNZZXg0SU9TYTI4WG5qdmc2aUhydFU0LXlJS04taFVoOU5idUFqb3ZtSFZsVUlpYUhackVhN2lGQUlYQ3hqekNxYkkxd1E1aDU2TGVZTEJQc3V5U1EwVzJLRDdiQmdITzZFYlI4TWZzOTBtT2c5bTREN2tvVVZWUk1hb1EwSlVmRHpSaVJvTDdINzFCaTFHRFI0?oc=5"
      },
      {
        "name": "The Times of Israel",
        "href": "https://www.timesofisrael.com/liveblog_entry/iran-executes-two-accused-of-spying-for-israel-during-fighting/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/iran-executes-two-alleged-israel-spies.png",
      "alt": "The building of Iran's judiciary in Tehran.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Catilinarian conspirators, betrayed by intercepted letters, strangled in the Tullianum",
        "excerpt": "There is a place in the prison, which is called the Tullian dungeon, and which, after a slight ascent to the left, is sunk about twelve feet under ground. Walls secure it on every side, and over it is a vaulted roof connected with stone arches; but its appearance is disgusting and horrible, by reason of the filth, darkness, and stench. When Lentulus had been let down into this place, certain men, to whom orders had been given, strangled him with a cord. ... On Cethegus, Statilius, Gabinius, and Cæparius, punishment was inflicted in a similar manner.",
        "source": "Sallust, The Conspiracy of Catiline, chapter 55, trans. John Selby Watson (1899). Perseus Digital Library, Tufts University. (The conspirators were undone when their letters to the Allobrogian envoys of a foreign power were intercepted at the Mulvian Bridge.)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0124%3Achapter%3D55"
      },
      {
        "category": "historical",
        "title": "The Rosenbergs, executed for passing atomic secrets to a foreign power",
        "excerpt": "Julius and Ethel Rosenberg were convicted of conspiracy to commit espionage for allegedly transmitting United States atomic-weapon secrets to the Soviet Union, and were sent to the electric chair at Sing Sing prison on June 19, 1953, despite worldwide clemency appeals. As in Iran's spy trials, the charge was that ordinary citizens had handed a hostile power the most sensitive coordinates of national security, here the workings of the atomic bomb. The National Archives holds the trial evidence and the once-secret grand jury transcripts that document the case.",
        "source": "The Rosenberg Grand Jury Records and trial evidence, Ethel and Julius Rosenberg espionage case (1951–1953). U.S. National Archives (Records held at the National Archives at New York).",
        "href": "https://www.archives.gov/research/court-records/rosenberg-jury"
      },
      {
        "category": "literary",
        "title": "Thirty pieces of silver: the betrayer's wages and end",
        "excerpt": "Then one of the twelve, called Judas Iscariot, went unto the chief priests, And said unto them, What will ye give me, and I will deliver him unto you? And they covenanted with him for thirty pieces of silver. And from that time he sought opportunity to betray him. ... Then Judas, which had betrayed him, when he saw that he was condemned, repented himself, and brought again the thirty pieces of silver to the chief priests and elders, Saying, I have sinned in that I have betrayed the innocent blood. And they said, What is that to us? see thou to that. And he cast down the pieces of silver in the temple, and departed, and went and hanged himself.",
        "source": "The Gospel According to Saint Matthew 26:14–16, 27:3–5, King James Version (1611). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "literary",
        "title": "\"Yet each man kills the thing he loves\": the condemned awaiting the rope",
        "excerpt": "The man had killed the thing he loved\nAnd so he had to die.\n\nYet each man kills the thing he loves\nBy each let this be heard,\nSome do it with a bitter look,\nSome with a flattering word,\nThe coward does it with a kiss,\nThe brave man with a sword!\n\nSome kill their love when they are young,\nAnd some when they are old;\nSome strangle with the hands of Lust,\nSome with the hands of Gold:\nThe kindest use a knife, because\nThe dead so soon grow cold.\n\nSome love too little, some too long,\nSome sell, and others buy;\nSome do the deed with many tears,\nAnd some without a sigh:\nFor each man kills the thing he loves,\nYet each man does not die.",
        "source": "Oscar Wilde, The Ballad of Reading Gaol (1898). Project Gutenberg, ebook #301.",
        "href": "https://www.gutenberg.org/files/301/301-h/301-h.htm"
      },
      {
        "category": "artistic",
        "title": "Delaroche, The Execution of Lady Jane Grey",
        "excerpt": "Delaroche's vast 1833 canvas freezes the instant before the axe falls: the blindfolded seventeen-year-old queen, condemned for treason after only nine days on the throne, gropes for the block in luminous white satin while an attendant guides her hands and the executioner waits with his axe. By turning a state execution into an intimate, almost unbearable human moment, the painting makes the political victim into a trembling body, much as accounts of prisoners led to the gallows compress a whole apparatus of power into one condemned figure.",
        "source": "Paul Delaroche, The Execution of Lady Jane Grey (1833), National Gallery, London. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:PAUL_DELAROCHE_-_Ejecuci%C3%B3n_de_Lady_Jane_Grey_(National_Gallery_de_Londres,_1834).jpg",
        "image": {
          "src": "/covers/iran-executes-two-alleged-israel-spies--a4.png",
          "alt": "A blindfolded young woman in a white gown kneels and reaches for a wooden execution block as a man gently steadies her hands and an axeman stands by in a dim stone chamber.",
          "credit": "Paul Delaroche, The Execution of Lady Jane Grey (1833), National Gallery, London. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Callot, The Hanging, from Les Grandes Misères de la guerre",
        "excerpt": "In this 1633 etching, the eleventh plate of Jacques Callot's series on the horrors of the Thirty Years' War, a great tree becomes a mass gallows: dozens of condemned men dangle from its branches while soldiers, a priest, and dice-throwing onlookers cluster below. The tiny, teeming figures make wartime execution look industrial and routine, punishment meted out by armies far from any courtroom, an image that resonates with a surge of hangings carried out amid a nation at war.",
        "source": "Jacques Callot, \"La pendaison\" (The Hanging), plate 11 of Les Misères et les malheurs de la guerre (1633). Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Les_mis%C3%A8res_et_les_malheurs_de_la_guerre_-_11_-_La_pendaison.png",
        "image": {
          "src": "/covers/iran-executes-two-alleged-israel-spies--a5.png",
          "alt": "A crowded 17th-century etching of a large tree hung with many bodies, soldiers with pikes and muskets gathered below, a ladder against the trunk and a priest attending a man about to be hanged.",
          "credit": "Jacques Callot, La pendaison (The Hanging), plate 11 of Les Grandes Misères de la guerre (1633). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "shell-sells-onshore-renewables-totalenergies",
    "headline": "Shell agrees to sell its European onshore wind, solar and battery business, a roughly four-gigawatt portfolio, to France's TotalEnergies as it retreats from renewables",
    "overview": "Shell agreed to sell its European onshore renewables arm, with about four gigawatts of wind, solar and battery projects in operation and development across the UK, Italy, the Netherlands and Spain, to TotalEnergies. The deal, expected to close by year end pending regulatory approval, deepens Shell's pullback from low-carbon energy under chief executive Wael Sawan. TotalEnergies is expanding its renewables footprint even as European majors diverge on green strategy.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQdHBuR2ZmM29uWDZCSnBpbXl0RjlCVUgxRFkwV2VRZUhVQS01N1ZRUW1hdVlOdW9VTWZsQ0ZuTjItYUhmT3E0TFVBbFk4MElUOWg0TUxlOHBLNjAxRlRzMVFXZWl5bDJVLUdaX0ZMVTdEUEZaUTk5TF91MUcxNHFQZW8xQ1NhdllMSHZodkV2U2ZrOHcwQXJ6dGFWT3VZMGxwblM5M3FXb212NVdRRDJVM0VmTElYakwtOG82MQ?oc=5"
      },
      {
        "name": "AOL",
        "href": "https://www.aol.co.uk/articles/shell-sell-european-onshore-renewables-083158000.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/shell-sells-onshore-renewables-totalenergies.png",
      "alt": "Onshore wind turbines and solar panels in a European countryside.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Low Countries Call the Air to Their Aid",
        "excerpt": "To drain the lakes they called the air to their aid. The lakes and marshes were surrounded with dykes, the dykes with canals and an army of windmills; these, putting the suction-pumps in motion, poured the waters into the canals, which conducted them into the rivers and to the sea. Thus vast areas of ground which were buried under water saw the light, and were transformed, as if by enchantment, into fertile plains covered with villages and traversed by roads and canals.",
        "source": "Edmondo De Amicis, Holland (Vol. 1 of 2), trans. Caroline Tilton (1880); Project Gutenberg eBook #27799.",
        "href": "https://www.gutenberg.org/files/27799/27799-h/27799-h.htm"
      },
      {
        "category": "historical",
        "title": "Churchill Bets the Fleet on Oil",
        "excerpt": "On no one quality, on no one process, on no one country, on no one company, and no one route, and on no one oil field must we be dependent. Safety and certainty in oil lie in variety, and in variety alone.",
        "source": "Winston Churchill, First Lord of the Admiralty, speech on the Navy Estimates, House of Commons, 17 July 1913 (HC Deb 17 July 1913, vol 55, cc1465-584); UK Parliament Historic Hansard.",
        "href": "https://api.parliament.uk/historic-hansard/commons/1913/jul/17/shipbuilding-repairs-maintenance-etc"
      },
      {
        "category": "literary",
        "title": "Tilting at Windmills",
        "excerpt": "At this point they came in sight of thirty or forty windmills that there are on that plain, and as soon as Don Quixote saw them he said to his squire, “Fortune is arranging matters for us better than we could have shaped our desires ourselves, for look there, friend Sancho Panza, where thirty or more monstrous giants present themselves, all of whom I mean to engage in battle and slay…” “What giants?” said Sancho Panza. … “Look, your worship,” said Sancho; “what we see there are not giants but windmills, and what seem to be their arms are the sails that turned by the wind make the millstone go.”",
        "source": "Miguel de Cervantes, Don Quixote, Part I, Chapter VIII, trans. John Ormsby (1885); Project Gutenberg eBook #996.",
        "href": "https://www.gutenberg.org/files/996/996-h/996-h.htm"
      },
      {
        "category": "literary",
        "title": "Ode to the West Wind",
        "excerpt": "Drive my dead thoughts over the universe\nLike withered leaves to quicken a new birth!\nAnd, by the incantation of this verse,\nScatter, as from an unextinguished hearth\nAshes and sparks, my words among mankind!\nBe through my lips to unawakened earth\nThe trumpet of a prophecy! O, Wind,\nIf Winter comes, can Spring be far behind?",
        "source": "Percy Bysshe Shelley, “Ode to the West Wind” (1820), in The Complete Poetical Works of Percy Bysshe Shelley, ed. Thomas Hutchinson (1914); Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ode_to_the_West_Wind"
      },
      {
        "category": "artistic",
        "title": "The Windmill at Wijk bij Duurstede",
        "excerpt": "Ruisdael sets a single great tower windmill against a vast, storm-heavy Dutch sky, its sails motionless yet its bulk towering over the church and castle it dwarfs. Painted at the height of the Dutch Golden Age, the picture makes the wind machine a monument of national ingenuity and civic pride, a whole country's economy built on harnessing the moving air. It stands as the emblem of an era that embraced wind as the engine of its prosperity, the mirror image of a modern retreat from it.",
        "source": "Jacob van Ruisdael, The Windmill at Wijk bij Duurstede, c. 1668–1670, oil on canvas, Rijksmuseum, Amsterdam (SK-C-211).",
        "href": "https://commons.wikimedia.org/wiki/File:The_Windmill_at_Wijk_bij_Duurstede_1670_Ruisdael.jpg",
        "image": {
          "src": "/covers/shell-sells-onshore-renewables-totalenergies--a4.png",
          "alt": "A massive stone tower windmill on a riverbank dominates a wide, cloud-filled sky, its dark sails still, with a church, houses, and small figures on the bank beside the grey water of the River Lek below.",
          "credit": "Jacob van Ruisdael, The Windmill at Wijk bij Duurstede (c. 1668–1670), Rijksmuseum, Amsterdam. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Impression, Sunrise",
        "excerpt": "Monet's hazy dawn over the harbor of Le Havre reduces the sun to a single burning orange disc, its light rippling across grey-blue water among ghostly ships and cranes. The 1872 canvas gave Impressionism its name and turned the rising sun into a symbol of a new dawn in art. That the French master's most famous sunrise now doubles as an emblem of solar energy is fitting, as France's TotalEnergies is the buyer betting on the light Shell is walking away from.",
        "source": "Claude Monet, Impression, Sunrise (Impression, soleil levant), 1872, oil on canvas, Musée Marmottan Monet, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Monet_-_Impression,_Sunrise.jpg",
        "image": {
          "src": "/covers/shell-sells-onshore-renewables-totalenergies--a5.png",
          "alt": "A hazy blue-grey harbor at dawn with a small orange sun low on the horizon casting a rippling orange reflection on the water, dark rowboats in the foreground and faint masts and cranes behind.",
          "credit": "Claude Monet, Impression, Sunrise (1872), Musée Marmottan Monet, Paris. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "astrazeneca-shares-fall-bristol-myers-talks",
    "headline": "AstraZeneca shares fall about 7%, the biggest drop on the FTSE 100, after reports it held early talks with Bristol Myers Squibb on a possible merger worth around $400 billion",
    "overview": "AstraZeneca's London-listed shares slid roughly 7%, the steepest fall on the FTSE 100, after the Financial Times reported the drugmaker had held preliminary talks with US rival Bristol Myers Squibb about a tie-up. A person familiar with the matter told Reuters the two had held discussions; neither company confirmed the report. A combination would rank among the largest pharmaceutical mergers ever, at a valuation near $400 billion, but investors questioned the strategic rationale.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxPMzhDZ2Y1UkxQTnZCTjg1NHdXUGZBb2Q3d3ppcnZEbWFEY1JJRWZLU0RHd1N3eDRDOVRIUXMycjdyWDNzR2pDY1ZPYXg0cFlUUWNZRWJadkt1Sld3VzZCVjN6YW1zaE1aTUt0U2x6S3p2bTRQd3dMMXc0cDhUcjJERlhyRF80YTF5My1qRmVGSU5kM3Z6bTdUcTJlS2R4TjkwM3RvdXk4eXdkYVhILWdqTS1GZlZtZ0dTZHZUMVZ5Mkk4QnI1U0lyQm1acVBfaHc?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/08/03/astrazeneca-bristol-myers-squibb-merger-talks.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/astrazeneca-shares-fall-bristol-myers-talks.png",
      "alt": "The AstraZeneca headquarters, the Discovery Centre, in Cambridge, England.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rome's credit crash of A.D. 33",
        "excerpt": "Hence followed a scarcity of money, a great shock being given to all credit, the current coin too, in consequence of the conviction of so many persons and the sale of their property, being locked up in the imperial treasury or the public exchequer. To meet this, the Senate had directed that every creditor should have two-thirds of his capital secured on estates in Italy. Creditors however were suing for payment in full, and it was not respectable for persons when sued to break faith. So, at first, there were clamorous meetings and importunate entreaties; then noisy applications to the prætor's court. And the very device intended as a remedy, the sale and purchase of estates, proved the contrary, as the usurers had hoarded up all their money for buying land. The facilities for selling were followed by a fall of prices, and the deeper a man was in debt, the more reluctantly did he part with his property, and many were utterly ruined.",
        "source": "Tacitus, The Annals, Book VI, ch. 17, trans. Alfred John Church & William Jackson Brodribb; Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book%3D6:chapter%3D17"
      },
      {
        "category": "historical",
        "title": "The South Sea Bubble of 1720",
        "excerpt": "In the mean time, innumerable joint-stock companies started up every where. They soon received the name of Bubbles, the most appropriate that imagination could devise. The populace are often most happy in the nicknames they employ. None could be more apt than that of Bubbles. Some of them lasted for a week or a fortnight, and were no more heard of, while others could not even live out that short span of existence. … There were nearly a hundred different projects, each more extravagant and deceptive than the other, To use the words of the Political State, they were “set on foot and promoted by crafty knaves, then pursued by multitudes of covetous fools, and at last appeared to be, in effect, what their vulgar appellation denoted them to be—bubbles and mere cheats.”",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), vol. I, \"The South-Sea Bubble\"; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm"
      },
      {
        "category": "literary",
        "title": "\"If we can float the shares, the money'll come in\"",
        "excerpt": "\"Where's the money to come from?\"\n\"Money to come from, sir? Where do you suppose the money comes from in all these undertakings? If we can float the shares, the money'll come in quick enough. We hold three million dollars of the stock ourselves.\"\n\"Six hundred thousand pounds!\" said Montague.\n\"We take them at par, of course,—and as we sell we shall pay for them. But of course we shall only sell at a premium. If we can run them up even to 110, there would be three hundred thousand dollars.\"",
        "source": "Anthony Trollope, The Way We Live Now (1875), ch. IX, \"The Great Railway to Vera Cruz\"; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
      },
      {
        "category": "literary",
        "title": "The flood-tide roar of speculation",
        "excerpt": "The steps and peristyle of the Bourse were quite black with swarming frock-coats; and from among the coulissiers, already installed under the clock and hard at work, there arose the clamour of bull and bear, the flood-tide roar of speculation dominating all the rumbling hubbub of the city. Passers-by turned their heads, curious and fearful as to what might be going on there—all those mysterious financial operations which few French brains can penetrate, all that sudden ruin and fortune brought about—how, none could understand—amid gesticulation and savage cries.",
        "source": "Émile Zola, Money (L'Argent) (1891), trans. Ernest A. Vizetelly; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm"
      },
      {
        "category": "artistic",
        "title": "Hogarth's \"The South Sea Scheme\"",
        "excerpt": "Hogarth's earliest satirical print skewers the mania around the South Sea Company: at its centre a giant merry-go-round spins investors of every rank while a demon hacks the body of Fortune into pieces and tosses them to the crowd. Devils, whores and a broken figure of Honesty on the wheel turn a stock craze into a moral carnival—an image of speculation running far ahead of any underlying worth, much like a $400bn deal investors struggle to justify.",
        "source": "William Hogarth, Emblematical Print on the South Sea Scheme (\"The South Sea Scheme\"), engraving, 1721. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/astrazeneca-shares-fall-bristol-myers-talks--a4.png",
          "alt": "A crowded 18th-century square where a large merry-go-round of speculators spins, a demon carves up a female figure of Fortune, and a man is broken on a wheel labelled Honesty.",
          "credit": "William Hogarth, Emblematical Print on the South Sea Scheme (1721). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Brueghel's \"Satire on Tulip Mania\"",
        "excerpt": "Jan Brueghel the Younger paints the Dutch tulip frenzy as a troop of monkeys in merchants' dress: they weigh bulbs, count coins, toast their paper profits, and haul contracts about, while one relieves himself on the discarded flowers and another is carried off to the grave once the market collapses. The apes' solemn dealing over a worthless commodity mocks investors who chase a grand valuation until the rationale evaporates.",
        "source": "Jan Brueghel the Younger, Satire on Tulip Mania, oil on panel, c. 1640, Frans Hals Museum, Haarlem. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/astrazeneca-shares-fall-bristol-myers-talks--a5.png",
          "alt": "Monkeys dressed as wealthy Dutch merchants trade tulip bulbs, weigh coins, and feast, while one urinates on flowers and another mourns at a graveside as the market crashes.",
          "credit": "Jan Brueghel the Younger, Satire on Tulip Mania (c. 1640), Frans Hals Museum. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "massive-attack-singapore-ban-palestine",
    "headline": "British band Massive Attack say Singapore has barred them from returning after they displayed a Palestinian flag and led 'free Palestine' chants at a 29 July concert",
    "overview": "The Bristol trip-hop duo Massive Attack said Singaporean authorities have banned them from re-entering the country after they held up a Palestinian flag and led chants of 'free Palestine' during a 29 July show. The band said members were detained, questioned separately and had passports temporarily confiscated, and issued official warnings under laws on foreign emblems and public order. Massive Attack said they were 'surprised and disappointed' by the treatment.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cr59qe86yj4o"
      },
      {
        "name": "Malay Mail",
        "href": "https://www.malaymail.com/news/showbiz/2026/08/03/as-we-were-saying-free-palestine-massive-attack-hits-out-after-singapore-concert-probe/230028"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/massive-attack-singapore-ban-palestine.png",
      "alt": "A concert stage lit in blue with a crowd silhouetted in front, illustrating a live music performance.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Athens fines the poet who staged their grief",
        "excerpt": "The Athenians, on the other hand, showed themselves beyond measure afflicted at the fall of Miletus, in many ways expressing their sympathy, and especially by their treatment of Phrynichus. For when this poet brought out upon the stage his drama of the Capture of Miletus, the whole theatre burst into tears; and the people sentenced him to pay a fine of a thousand drachms, for recalling to them their own misfortunes. They likewise made a law that no one should ever again exhibit that piece.",
        "source": "Herodotus, The History of Herodotus, Book VI, ch. 21, trans. George Rawlinson (1858–60), Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_6"
      },
      {
        "category": "historical",
        "title": "Paul Robeson, silenced by a seized passport",
        "excerpt": "In 1950 the U.S. State Department revoked the passport of the celebrated bass-baritone and actor Paul Robeson, freezing his international career because of his outspoken support for anti-colonial and civil-rights causes; officials offered to return it only if he pledged to make no political speeches abroad. For eight years he was effectively confined within the country, his concerts cancelled and bookings withdrawn, until the Supreme Court restored his right to travel in 1958. Like Massive Attack barred from a stage for their politics, Robeson was punished not for his art but for the dissent he voiced through it.",
        "source": "\"The Case of Paul Robeson's Passport,\" Provisional Committee to Restore Paul Robeson's Passport, ca. 1951, Paul Robeson Collection, Schomburg Center for Research in Black Culture, The New York Public Library.",
        "href": "https://www.nypl.org/events/exhibitions/galleries/selected-transcripts/item/17588"
      },
      {
        "category": "literary",
        "title": "Antigone defies the ruler's decree",
        "excerpt": "Yes; for it was not Zeus that had published me that edict; not such are the laws set among men by the Justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven. For their life is not of to-day or yesterday, but from all time, and no man knows when they were first put forth.\n\nNot through dread of any human pride could I answer to the gods for breaking these. Die I must,—I knew that well (how should I not?)—even without thy edicts.",
        "source": "Sophocles, Antigone, in The Tragedies of Sophocles, trans. Richard C. Jebb (1917), Wikisource.",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Sophocles_(Jebb_1917)/Antigone"
      },
      {
        "category": "literary",
        "title": "Shelley's answer to a massacre: 'Ye are many'",
        "excerpt": "'Rise like Lions after slumber\nIn unvanquishable number—\nShake your chains to earth like dew\nWhich in sleep had fallen on you—\nYe are many—they are few.'",
        "source": "Percy Bysshe Shelley, \"The Mask of Anarchy\" (written 1819, publ. 1832), in The Complete Poetical Works of Percy Bysshe Shelley, ed. Thomas Hutchinson (1914), Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/The_Mask_of_Anarchy"
      },
      {
        "category": "artistic",
        "title": "Daumier's massacre print, seized and destroyed",
        "excerpt": "Daumier's lithograph depicts the aftermath of a state atrocity: in April 1834 French troops hunting a sniper slaughtered the unarmed residents of a Paris apartment house, and the artist rendered a workman sprawled dead across the crushed body of his own child. Though the censors had first passed it, King Louis-Philippe ordered the printing stone and every unsold impression seized and destroyed. The image endures as an artist's indictment of power, answered by the state's attempt to erase the work itself.",
        "source": "Honoré Daumier, Rue Transnonain, le 15 Avril 1834 (1834), lithograph, plate 24 of L'Association mensuelle. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Rue_Transnonain,_April_15,_1834_-_WGA5966.jpg",
        "image": {
          "src": "/covers/massive-attack-singapore-ban-palestine--a4.png",
          "alt": "A dim bedroom where a slain workingman in his nightshirt lies sprawled on his back across the crushed body of a child, amid overturned furniture and shadow.",
          "credit": "Honoré Daumier, Rue Transnonain, le 15 Avril 1834 (1834), lithograph. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Verdi's chorus of exiles longing for a lost homeland",
        "excerpt": "Va, pensiero, sull'ali dorate;\nva, ti posa sui clivi, sui colli,\nove olezzano tepide e molli\nl'aure dolci del suolo natal!\n\nDel Giordano le rive saluta,\ndi Sionne le torri atterrate.\nO, mia patria, sì bella e perduta!\nO, membranza, sì cara e fatal!",
        "source": "Giuseppe Verdi (music) and Temistocle Solera (libretto), \"Va, pensiero\" (Chorus of the Hebrew Slaves), from Nabucco (1842); full score at IMSLP. Portrait photograph by Giacomo Brogi.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/massive-attack-singapore-ban-palestine--a5.png",
          "alt": "Sepia photographic portrait of an elderly bearded Giuseppe Verdi in a dark coat and top hat, seen in three-quarter view against a plain background.",
          "credit": "Giacomo Brogi, photographic portrait of Giuseppe Verdi (before 1881). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "nepal-mourns-nirmal-purja",
    "headline": "Nepal mourns record-setting mountaineer Nirmal Purja, who died at 43 in an avalanche on Pakistan's Broad Peak, with tributes gathering at his former school",
    "overview": "Tributes poured in across Nepal for Nirmal 'Nims' Purja, the celebrated mountaineer who was killed at 43 in an avalanche on Pakistan's 8,047-metre Broad Peak along with several fellow climbers. The former British Army Gurkha won global fame for climbing all 14 of the world's 8,000-metre peaks in just over six months in 2019 and for the Netflix film '14 Peaks: Nothing Is Impossible.' Mourners gathered at his old school, where staff and pupils remembered a national hero.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c07rvy4e7mno"
      },
      {
        "name": "Dawn",
        "href": "https://www.dawn.com/news/2020165"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/nepal-mourns-nirmal-purja.png",
      "alt": "The snow-covered summit of Broad Peak in Pakistan's Karakoram range.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Petrarch climbs Mont Ventoux, 1336",
        "excerpt": "To-day I made the ascent of the highest mountain in this region, which is not improperly called Ventosum. My only motive was the wish to see what so great an elevation had to offer. [...] At first, owing to the unaccustomed quality of the air and the effect of the great sweep of view spread out before me, I stood like one dazed. I beheld the clouds under our feet, and what I had read of Athos and Olympus seemed less incredible as I myself witnessed the same things from a mountain of less fame.",
        "source": "Petrarch, letter to Dionisio da Borgo San Sepolcro, \"The Ascent of Mount Ventoux\" (1336), trans. James Harvey Robinson, in Petrarch, the First Modern Scholar and Man of Letters (New York: G. P. Putnam, 1898). Project Gutenberg ebook 48776.",
        "href": "https://www.gutenberg.org/files/48776/48776-h/48776-h.htm"
      },
      {
        "category": "historical",
        "title": "Whymper's Matterhorn: triumph and the fatal descent, 1865",
        "excerpt": "There have been joys too great to be described in words, and there have been griefs upon which I have not dared to dwell; and with these in mind I say, Climb if you will, but remember that courage and strength are nought without prudence, and that a momentary negligence may destroy the happiness of a lifetime. Do nothing in haste; look well to each step; and from the beginning think what may be the end.",
        "source": "Edward Whymper, The Ascent of the Matterhorn (London: John Murray, 1880), closing reflection on the 1865 first ascent, during which four of his companions fell to their deaths. Project Gutenberg ebook 38044.",
        "href": "https://www.gutenberg.org/files/38044/38044-h/38044-h.htm"
      },
      {
        "category": "literary",
        "title": "Shelley, \"Mont Blanc\"",
        "excerpt": "The everlasting universe of things\nFlows through the mind, and rolls its rapid waves,\nNow dark—now glittering—now reflecting gloom—\nNow lending splendour, where from secret springs\nThe source of human thought its tribute brings\nOf waters,—\n[...]\nThe secret Strength of things\nWhich governs thought, and to the infinite dome\nOf Heaven is as a law, inhabits thee!\nAnd what were thou, and earth, and stars, and sea,\nIf to the human mind's imaginings\nSilence and solitude were vacancy?",
        "source": "Percy Bysshe Shelley, \"Mont Blanc: Lines Written in the Vale of Chamouni\" (composed 1816), in The Complete Poetical Works of Percy Bysshe Shelley, ed. Thomas Hutchinson (Oxford, 1914). Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Mont_Blanc"
      },
      {
        "category": "literary",
        "title": "Coleridge, \"Hymn before Sun-rise, in the Vale of Chamouny\"",
        "excerpt": "Hast thou a charm to stay the Morning-Star\nIn his steep course? So long he seems to pause\nOn thy bald awful head, O sovran Blanc!\nThe Arve and Arveiron at thy base\nRave ceaselessly; but thou, most awful Form!\nRisest from forth thy silent Sea of Pines,\nHow silently! Around thee and above\nDeep is the air and dark, substantial, black.\nAn ebon mass: methinks thou piercest it,\nAs with a wedge! But when I look again,\nIt is thine own calm home, thy crystal shrine,\nThy habitation from eternity!",
        "source": "Samuel Taylor Coleridge, \"Hymn, before Sun-rise, in the Vale of Chamouny\" (1802), in Sibylline Leaves (London, 1817). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Sibylline_Leaves_(Coleridge)/Hymn,_before_Sun-rise,_in_the_Vale_of_Chamouny"
      },
      {
        "category": "artistic",
        "title": "Friedrich, \"Wanderer above the Sea of Fog\"",
        "excerpt": "Caspar David Friedrich's lone figure stands on a rocky summit, back turned to us, gazing over a churning sea of mist from which distant peaks emerge—the very image of the human will set against the mountain sublime. It captures both the solitary heroism of the high climber and his smallness before immensity, the emotional register in which a nation mourns a mountaineer who reached the world's summits and was claimed by them.",
        "source": "Caspar David Friedrich, Wanderer above the Sea of Fog (Der Wanderer über dem Nebelmeer), c. 1818, oil on canvas, Hamburger Kunsthalle.",
        "href": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
        "image": {
          "src": "/covers/nepal-mourns-nirmal-purja--a4.png",
          "alt": "A man in a dark green coat stands on a dark crag with his back to the viewer, leaning on a cane, looking out over a vast sea of fog broken by jagged mountain peaks and receding ridges.",
          "credit": "Caspar David Friedrich, Wanderer above the Sea of Fog (c. 1818), Hamburger Kunsthalle. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Hokusai, \"Fine Wind, Clear Morning (Red Fuji)\"",
        "excerpt": "In this woodblock print from Thirty-six Views of Mount Fuji, Hokusai reduces the sacred peak to a single triumphant red-brown pyramid, streaked with snow and crowned by streaming clouds against a clear morning sky. Where Friedrich frames the mountain as an object of Western awe, Hokusai renders it as a revered, near-divine presence—an eastern counterpart to the veneration Nepal holds for its own great peaks and for the climber who conquered them.",
        "source": "Katsushika Hokusai, Fine Wind, Clear Morning (Gaifū kaisei), also known as Red Fuji, from Thirty-six Views of Mount Fuji, color woodblock print, c. 1830–1832.",
        "href": "https://commons.wikimedia.org/wiki/File:Red_Fuji_southern_wind_clear_morning.jpg",
        "image": {
          "src": "/covers/nepal-mourns-nirmal-purja--a5.png",
          "alt": "A woodblock print of Mount Fuji as a broad red-brown cone streaked with white snow at its summit, set against a blue sky with rows of small white clouds and a dark green forested base.",
          "credit": "Katsushika Hokusai, Fine Wind, Clear Morning (Red Fuji), from Thirty-six Views of Mount Fuji (c. 1830–1832). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "uk-plug-in-balcony-solar-panels",
    "headline": "The UK clears the way for plug-in balcony solar panels, letting households plug low-cost panels into a wall socket from 27 August to cut energy bills",
    "overview": "The UK government said changes to plug and electrical-safety rules will legalize plug-in solar panels from 27 August, allowing flats and rented homes to fit panels on balconies, roofs or outdoor spaces without professional installation. The devices, already common across Europe, connect straight to a mains socket and are expected to sell for around £400, potentially saving up to £110 a year. Ministers cast the move as part of a push to cut reliance on volatile fossil-fuel markets.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/08/03/plug-in-solar-panels-available-uk-end-summer/"
      },
      {
        "name": "Ideal Home",
        "href": "https://www.idealhome.co.uk/house-manual/energy-saving/when-will-plug-in-solar-panels-be-available-to-buy"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/uk-plug-in-balcony-solar-panels.png",
      "alt": "Plug-in solar panels mounted on an apartment balcony railing.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Socrates designs the solar house",
        "excerpt": "Now in houses with a south aspect, the sun's rays penetrate into the porticoes in winter, but in summer the path of the sun is right over our heads and above the roof, so that there is shade. If, then, this is the best arrangement, we should build the south side loftier to get the winter sun and the north side lower to keep out the cold winds.",
        "source": "Xenophon, Memorabilia, Book 3, Chapter 8 (Socrates on the ideal house), trans. E. C. Marchant, Loeb Classical Library, 1923. Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3atext%3a1999.01.0208%3abook%3d3%3achapter%3d8"
      },
      {
        "category": "historical",
        "title": "Bell Labs makes sunlight practical, 1954",
        "excerpt": "On 25 April 1954 Daryl Chapin, Calvin Fuller and Gerald Pearson unveiled the first practical silicon photovoltaic cell at Bell Telephone Laboratories in Murray Hill, New Jersey, converting about six percent of incoming sunlight straight into electricity. Their small blue wafers were the ancestors of every rooftop and balcony panel that follows, turning the ancient dream of drinking power from the sun into a repeatable piece of hardware. It is the pivot from centuries of solar curiosities to the cheap, mass-produced module a UK renter can now clip to a railing and plug into the wall.",
        "source": "\"Milestones: First Practical Photovoltaic Solar Cell, 1954,\" IEEE Engineering and Technology History Wiki (ETHW).",
        "href": "https://ethw.org/Milestones:First_Practical_Photovoltaic_Solar_Cell"
      },
      {
        "category": "literary",
        "title": "The Great Hymn to the Aten",
        "excerpt": "The earth becometh light, thou shootest up in the horizon, shining in the Aten in the day, thou scatterest the darkness. Thou sendest out thine arrows (i.e., rays), the Two Lands make festival, [men] wake up, stand upon their feet, it is thou who raisest them up.",
        "source": "The Great Hymn to the Aten (Hymn of praise of Her-aakhuti), attributed to Akhenaten, trans. E. A. Wallis Budge, in Tutankhamen: Amenism, Atenism and Egyptian Monotheism, 1923. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Great_Hymn_to_Aten"
      },
      {
        "category": "literary",
        "title": "St Francis praises Brother Sun and Brother Fire",
        "excerpt": "Praise be to Thee, my Lord, with all Thy creatures,\nEspecially to my worshipful brother sun,\nThe which lights up the day, and through him dost Thou brightness give;\nAnd beautiful is he and radiant with splendor great;\nOf Thee, most High, signification gives.\n\nPraised be my Lord for brother fire,\nBy the which Thou lightest up the dark.\nAnd fair is he and gay and mighty and strong.",
        "source": "Francis of Assisi, \"The Canticle of the Sun\" (c. 1225), in The Writings of St. Francis of Assisi, trans. Paschal Robinson, 1906. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Writings_of_St._Francis_of_Assisi/The_Canticle_of_the_Sun"
      },
      {
        "category": "artistic",
        "title": "Turner, ‘Norham Castle, Sunrise’",
        "excerpt": "J.M.W. Turner dissolves a castle, a river and grazing cattle into pure light, the rising sun a blazing core that floods the whole canvas in luminous blue and gold. Solid forms melt into radiance until the sun’s energy is almost the only subject that remains. It is Romantic painting’s purest hymn to the power a plug-in panel now quietly gathers from a balcony rail.",
        "source": "J.M.W. Turner, Norham Castle, Sunrise (c. 1845), oil on canvas, Tate, London. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jmw_turner,_norham_castle,_alba,_1845_ca.jpg",
        "image": {
          "src": "/covers/uk-plug-in-balcony-solar-panels--a4.png",
          "alt": "A castle and river dissolve into luminous blue and gold as a blazing sun rises, in Turner’s near-abstract painting.",
          "credit": "J.M.W. Turner, Norham Castle, Sunrise (c. 1845), Tate. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Van Gogh, The Sower",
        "excerpt": "In this June 1888 canvas from Arles, Van Gogh sets a peasant scattering seed against an enormous lemon-yellow sun that fills the sky and gilds the violet furrows below. The sower's ancient labour and the giant disc behind him fuse human work with solar power, a hymn to sunlight as the engine of all growth. The image speaks to the promise behind plug-in solar: sowing small panels now to harvest the sun's free energy at home.",
        "source": "Vincent van Gogh, The Sower, c. 17-28 June 1888, Kroller-Muller Museum, Otterlo. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_Sower_-_c._17-28_June_1888.jpg",
        "image": {
          "src": "/covers/uk-plug-in-balcony-solar-panels--a5.png",
          "alt": "A farmer strides across a violet field scattering seed beneath a huge glowing yellow sun that dominates a golden sky.",
          "credit": "Vincent van Gogh, The Sower (1888), Kroller-Muller Museum, Otterlo. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "egypt-suez-earthquake-magnitude-5-6",
    "headline": "A magnitude 5.6 earthquake strikes near the northern end of the Suez Canal in Egypt, shaking Cairo, Alexandria and neighbouring countries but causing no serious damage",
    "overview": "An earthquake measured at magnitude 5.6 struck about 40 km north of Suez, near the northern mouth of the Suez Canal, shortly after 3 a.m. local time, Egypt's seismology institute said. Tremors were felt across Cairo, the Nile Delta, Alexandria and Port Said, and as far as Gaza, Jordan and Lebanon, followed by several aftershocks. Authorities reported one injury and no significant damage, and the Red Crescent activated its response plan.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNcjE3eW1QaE5nM2hJVXA3OEhrblV6RkJqNTZMWVVrWTZxcTFqRkh4QllhTEJVUWZ3emQ2ZjhCYm5fV1dJdkpBOHhFU21SZzluQlNXMlozaWxGMy1GNnRuamVvUW1xaFlVcTVxYlFtNzRBLWJDZzQ0UUIxUjhNRFhoWmhBUjhiZktWVzdVMmlLcmQwWmZmNzRxaE9Qdmk4T1V2RDl6ZmRn?oc=5"
      },
      {
        "name": "The National",
        "href": "https://www.thenationalnews.com/news/mena/2026/08/03/egypt-hit-by-56-magnitude-earthquake/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-03",
    "image": {
      "src": "/covers/egypt-suez-earthquake-magnitude-5-6.png",
      "alt": "Ships passing through the Suez Canal in Egypt.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 3 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides on the Sea That Fled and Returned",
        "excerpt": "About the same time that these earthquakes were so common, the sea at Orobiae, in Euboea, retiring from the then line of coast, returned in a huge wave and invaded a great part of the town, and retreated leaving some of it still under water; so that what was once land is now sea; such of the inhabitants perishing as could not run up to the higher ground in time. A similar inundation also occurred at Atalanta, the island off the Opuntian Locrian coast, carrying away part of the Athenian fort and wrecking one of two ships which were drawn up on the beach. The cause, in my opinion, of this phenomenon must be sought in the earthquake. At the point where its shock has been the most violent, the sea is driven back and, suddenly recoiling with redoubled force, causes the inundation. Without an earthquake I do not see how such an accident could happen.",
        "source": "Thucydides, History of the Peloponnesian War, Book III, ch. 89 (426 BC), trans. Richard Crawley. Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "historical",
        "title": "Darwin Feels the Solid Earth Turn to Liquid, 1835",
        "excerpt": "This day has been memorable in the annals of Valdivia, for the most severe earthquake experienced by the oldest inhabitant. I happened to be on shore, and was lying down in the wood to rest myself. It came on suddenly, and lasted two minutes, but the time appeared much longer. [...] A bad earthquake at once destroys our oldest associations: the earth, the very emblem of solidity, has moved beneath our feet like a thin crust over a fluid;—one second of time has created in the mind a strange idea of insecurity, which hours of reflection would not have produced.",
        "source": "Charles Darwin, Journal of Researches (The Voyage of the Beagle), ch. XVI, on the great Chilean earthquake of 20 February 1835 (1839; text of 1845 edition). Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/944/pg944.txt"
      },
      {
        "category": "literary",
        "title": "The Ruin of Lisbon in 'Candide'",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, Candide, ch. 5 (1759), on the Lisbon earthquake of 1755, English translation. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "literary",
        "title": "The Sixth Seal: A Great Earthquake",
        "excerpt": "And I beheld when he had opened the sixth seal, and, lo, there was a great earthquake; and the sun became black as sackcloth of hair, and the moon became as blood; And the stars of heaven fell unto the earth, even as a fig tree casteth her untimely figs, when she is shaken of a mighty wind. And the heaven departed as a scroll when it is rolled together; and every mountain and island were moved out of their places.",
        "source": "Revelation 6:12–14, King James Version (1611). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Revelation"
      },
      {
        "category": "artistic",
        "title": "Bryullov, 'The Last Day of Pompeii'",
        "excerpt": "Karl Bryullov floods a collapsing city with the lurid red of an erupting Vesuvius, columns toppling and statues pitching from their pedestals as families shield their heads and flee. Lightning and volcanic glare pick out mothers clutching children, a fallen woman beside her infant, and citizens frozen between terror and tenderness. It is the classic Romantic image of a proud city undone in an instant by the trembling earth.",
        "source": "Karl Bryullov, The Last Day of Pompeii (1830–1833), oil on canvas, State Russian Museum, St Petersburg. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/egypt-suez-earthquake-magnitude-5-6--a4.png",
          "alt": "Panicked crowds flee collapsing columns and toppling statues under a red volcanic sky as Vesuvius erupts over Pompeii.",
          "credit": "Karl Bryullov, The Last Day of Pompeii (1830–1833), State Russian Museum. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "John Martin, 'The Destruction of Pompeii and Herculaneum'",
        "excerpt": "John Martin dwarfs tiny human figures beneath a vast apocalyptic panorama: a black sky split by lightning, the cone of Vesuvius spewing fire, and the twin cities engulfed in cataract of ash and molten rock. The scale is deliberately overwhelming, the people mere specks against the machinery of geological catastrophe. Martin turns a natural disaster into a sublime vision of nature's indifference to civilisation.",
        "source": "John Martin, The Destruction of Pompeii and Herculaneum (1822), oil on canvas, Tate, London. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Destruction_of_Pompeii_and_Herculaneum.jpg",
        "image": {
          "src": "/covers/egypt-suez-earthquake-magnitude-5-6--a5.png",
          "alt": "Tiny figures flee beneath a vast black sky as Vesuvius erupts and fire and ash engulf Pompeii and Herculaneum.",
          "credit": "John Martin, The Destruction of Pompeii and Herculaneum (1822), Tate. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "gaza-israeli-strikes-hamas-disarmament",
    "headline": "Israeli airstrikes kill at least 13 people across Gaza in a second straight night of attacks, days after Hamas accepts a US-backed disarmament plan",
    "overview": "Israeli aircraft struck Gaza City, Khan Younis and Deir al-Balah overnight, killing at least 13 Palestinians, including a nine-year-old boy, the territory's Civil Defence Authority said. The Israeli military said it had targeted Hamas military operatives and killed two commanders, while Israel's energy minister, Eli Cohen, said no deal had been reached to stop the strikes even after Hamas this week accepted a plan to hand its weapons to a US-led 'Board of Peace.' More than 1,100 Palestinians have been killed since a supposed ceasefire took effect last October, in a territory now roughly 70% under Israeli control.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMi0AFBVV95cUxPaFJlV0RsNzR2Qm1PeVlvNEZpclF5Rkt2NGQ5Z2JXaGcyR2pFdkt1aC0ybzdzXzNTUEptMnpyOWNrVWk4RTNicjFScDcyYnpEWm1GcFFmb0FxX0J4YkxIdWgxUHlTRE9rNlJPbVFfTFlDSGduQUQ4d3RqQ1hDYXRZRXpobU5qMEdEd05hdmVhcERmVW5IVy0tX2loYnpJc01hNHV1WWdJSXFwdVVhaXRwZUZLNkJSYzdFVVdsZ0dUazFManQ3aVAxNkp1MUxTSmJo?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/czjlvvkzj20o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/gaza-israeli-strikes-hamas-disarmament.png",
      "alt": "Two men dig through the broken concrete and rubble of a destroyed tiled room after an Israeli airstrike in Gaza.",
      "credit": "BBC"
    },
    "lead": true,
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Burning of the Temple, Jerusalem, 70 AD",
        "excerpt": "While the holy house was on fire, every thing was plundered that came to hand, and ten thousand of those that were caught were slain; nor was there a commiseration of any age, or any reverence of gravity, but children, and old men, and profane persons, and priests were all slain in the same manner; so that this war went round all sorts of men, and brought them to destruction, and as well those that made supplication for their lives, as those that defended themselves by fighting. The flame was also carried a long way, and made an echo, together with the groans of those that were slain; and because this hill was high, and the works at the temple were very great, one would have thought the whole city had been on fire.",
        "source": "Flavius Josephus, The Wars of the Jews, Book VI, Chapter 5, translated by William Whiston (1737). Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/2850/pg2850.txt"
      },
      {
        "category": "historical",
        "title": "\"War Is Cruelty\": Sherman to Atlanta, 1864",
        "excerpt": "You cannot qualify war in harsher terms than I will. War is cruelty, and you cannot refine it; and those who brought war into our country deserve all the curses and maledictions a people can pour out.",
        "source": "William Tecumseh Sherman, Letter to James M. Calhoun, Mayor of Atlanta, and others, September 12, 1864. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Letter_to_James_M._Calhoun,_et_al.,_September_12,_1864"
      },
      {
        "category": "literary",
        "title": "The Children Swoon in the Streets",
        "excerpt": "Mine eyes do fail with tears, my bowels are troubled, my liver is poured upon the earth, for the destruction of the daughter of my people; because the children and the sucklings swoon in the streets of the city. They say to their mothers, Where is corn and wine? when they swooned as the wounded in the streets of the city, when their soul was poured out into their mothers' bosom.",
        "source": "Book of Lamentations 2:11-12, King James Version (1611). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "literary",
        "title": "Hecuba Binds the Wounds of a Slain Child",
        "excerpt": "I make thee whole;\nI bind thy wounds, O little vanished soul.\nThis wound and this I heal with linen white:\nO emptiness of aid! . . . Yet let the rite\nBe spoken. This and . . . Nay, not I, but he,\nThy father far away shall comfort thee!",
        "source": "Euripides, The Trojan Women, translated into English rhyming verse by Gilbert Murray (1915). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/35171/35171-h/35171-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Third of May 1808",
        "excerpt": "A lantern throws its harsh light on a row of unarmed townspeople as a faceless firing squad levels its muskets; one man flings his arms wide in a last gesture of defiance and terror. The dead already lie in their own blood at his feet, and a line of the doomed stretches back into the dark. Goya lets no glory into the scene, only the machinery of killing and the human beings it consumes.",
        "source": "Francisco de Goya, El Tres de Mayo de 1808 en Madrid (The Third of May 1808), 1814, oil on canvas, Museo del Prado, Madrid. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/gaza-israeli-strikes-hamas-disarmament--a4.png",
          "alt": "A man in a white shirt kneels with arms thrown wide before a firing squad at night, a large lantern on the ground, bodies bleeding at his feet and more victims waiting in the shadows.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Apotheosis of War",
        "excerpt": "Against a scorched plain and the broken walls of a ruined city stands a pyramid of human skulls, picked clean, ringed by circling crows. There are no soldiers and no banners, only the sum that war leaves behind. Vereshchagin dedicated the canvas to all conquerors, past, present and to come.",
        "source": "Vasily Vereshchagin, The Apotheosis of War (Apofeoz voyny), 1871, oil on canvas, Tretyakov Gallery, Moscow. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Vasily_Vereshchagin_-_Апофеоз_войны_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/gaza-israeli-strikes-hamas-disarmament--a5.png",
          "alt": "A tall pyramid built of human skulls on a barren yellow plain, crows perched on and flying around it, with the ruins of a city and bare trees in the background.",
          "credit": "Vasily Vereshchagin, The Apotheosis of War (1871), Tretyakov Gallery. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "idaho-fast-food-shooting",
    "headline": "A shooting at a fast-food restaurant in an Idaho shopping center kills 3 people and wounds 7 before the gunman takes his own life",
    "overview": "A gunman opened fire at a fast-food restaurant in a shopping center in Idaho, killing three people and wounding seven, a city spokesman said. Police said the suspect died of a self-inflicted gunshot wound. Investigators had not given a motive as they worked to identify the attacker and the victims.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxNYW9uN0pxS05KdmgwSlBrYXdBTjBJTDY2N05QS2FSbUIycnRaR3ZnYTdBVTU5OUxpWnpGZnJUS0tVUWR0dFJIbGNKZGVYZEdxS3RfZjk1bHVnc3h3TTRHN2g1TUFMRU8yZHk3NnE0elkzZXFtUEwxRWNuZjktOTdmcGpCbUxYQW9vM05nZUZ3?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxOSUlHQUFzUk1GbXRXbmxaSzJVZVVFbXpIZ1lvSzhCbHcyZnlCREt6UmtPYi0zaUhya0hSMENVckhaUUxUTDNQMTM4YVhHWmU1dU9mMXJGRE00a0JMOUltaFNDOHJPemk5eXpyZ0tuVHE3MjM0R1hDM3NYWUoxTThHVGxvN3AxcVVpeVZocUk0TQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/idaho-fast-food-shooting.png",
      "alt": "A deserted American shopping-center parking lot at dusk cordoned off with police tape under cold overhead lights.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Massacre at Mycalessus",
        "excerpt": "The Thracians bursting into Mycalessus sacked the houses and temples, and butchered the inhabitants, sparing neither youth nor age, but killing all they fell in with, one after the other, children and women, and even beasts of burden, and whatever other living creatures they saw; the Thracian race, like the bloodiest of the barbarians, being ever most so when it has nothing to fear.\nEverywhere confusion reigned and death in all its shapes; and in particular they attacked a boys' school, the largest that there was in the place, into which the children had just gone, and massacred them all. In short, the disaster falling upon the whole town was unsurpassed in magnitude, and unapproached by any in suddenness and in horror.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII, ch. 29 (trans. Richard Crawley; London: J. M. Dent, 1910), via the Perseus Digital Library.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book=7:chapter=29"
      },
      {
        "category": "historical",
        "title": "The San Ysidro McDonald's Massacre (1984)",
        "excerpt": "On July 18, 1984, a gunman walked into a McDonald's in San Ysidro, California, and opened fire on families eating lunch, killing twenty-one people and wounding nineteen in what was then the deadliest lone-gunman shooting in United States history. The siege ended after seventy-seven minutes when a police sniper killed him. An ordinary fast-food counter had become a scene of mass death, plunging a border community into a grief its survivors still carry decades later.",
        "source": "San Ysidro McDonald's massacre, Wikipedia (accessed 2 August 2026).",
        "href": "https://en.wikipedia.org/wiki/San_Ysidro_McDonald%27s_massacre"
      },
      {
        "category": "literary",
        "title": "Cain and Abel (Genesis 4)",
        "excerpt": "And Cain talked with Abel his brother: and it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him.\nAnd the LORD said unto Cain, Where is Abel thy brother? And he said, I know not: Am I my brother’s keeper?\nAnd he said, What hast thou done? the voice of thy brother’s blood crieth unto me from the ground.",
        "source": "The Holy Bible, King James Version, Genesis 4:8-10. Project Gutenberg eBook #10.",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "literary",
        "title": "Psalm 55: Violence in the City",
        "excerpt": "Destroy, O LORD, and divide their tongues: for I have seen violence and strife in the city.\nDay and night they go about it upon the walls thereof: mischief also and sorrow are in the midst of it.\nWickedness is in the midst thereof: deceit and guile depart not from her streets.",
        "source": "The Holy Bible, King James Version, Psalm 55:9-11, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "artistic",
        "title": "The Massacre of the Innocents",
        "excerpt": "A Roman soldier drives his knee into a mother's body and raises his sword over the naked infant she cannot save, her mouth wrenched open in a scream that fills the sunlit square. To the side another woman flees with a limp child in her arms. Poussin freezes the single unbearable instant when public order collapses into slaughter of the innocent.",
        "source": "Nicolas Poussin, The Massacre of the Innocents (c. 1629), Musee Conde, Chantilly. Via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_Le_massacre_des_Innocents_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/idaho-fast-food-shooting--a4.png",
          "alt": "A Roman soldier pins a mother to the ground with his knee, sword raised over her infant as she screams; another woman flees with a dead child across a sunlit classical square.",
          "credit": "Nicolas Poussin, The Massacre of the Innocents (c. 1629), Musee Conde, Chantilly. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Rue Transnonain, 15 April 1834",
        "excerpt": "Honoré Daumier's lithograph shows the aftermath of a massacre in an ordinary Paris apartment: a working man in his nightshirt sprawled dead on the floor, having fallen across the crushed body of his small child, with another corpse in the shadows. Made after soldiers slaughtered the innocent residents of a tenement during an 1834 uprising, it turned a single quiet room into an indictment of sudden, senseless slaughter. Its unflinching stillness made it one of the most powerful images of civilians killed where they lived.",
        "source": "Honoré Daumier, Rue Transnonain, le 15 avril 1834, 1834, lithograph; National Gallery of Art, Washington.",
        "href": "https://commons.wikimedia.org/wiki/File:Honoré_Daumier,_Rue_Transnonain,_le_15_avril_1834,_1834,_NGA_6133.jpg",
        "image": {
          "src": "/covers/idaho-fast-food-shooting--a5.png",
          "alt": "A stark black-and-white lithograph of a working-class man in his nightshirt lying dead on the floor of a bare room, fallen across the body of a small child, after a massacre in an ordinary home.",
          "credit": "Honoré Daumier, Rue Transnonain, le 15 avril 1834 (1834), National Gallery of Art, Washington. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "pakistan-suicide-bombing-northwest",
    "headline": "A suicide bombing in northwestern Pakistan kills at least 14 people, officials say",
    "overview": "A suicide bomber struck in northwestern Pakistan, killing at least 14 people and wounding many others, officials said, with reports placing the blast at an anti-militant political gathering near a police station in the Khyber Pakhtunkhwa region. No group immediately claimed responsibility. The area has seen a resurgence of militant attacks in recent years.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxQVnpTdXBlTnNKVHNyMDdIQ3cxNUl5OE82Njl6alJWaGlheUtmMkRFSHdLUklEcUczdm5PUnpwcjdZblBvdDJvQWhEYVNzMTBIZjhsQkdZU3dyak50UjVGTDFBUW4zQUxWenhaVXNxR2dqU0ZzbFZuNlZBV1ZGNUVIaGFMc1EtRHk0TWVvTVY5b2NYUnpXeTRFTlE5Z0ZvVXlJTlNWOENPek9KR3hFSVdXUlJQVzdiQQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOVTZuMDlfeGlmTG14UGlTZ2EtWHd6LVR1Nk9zSlE1ZDNwZ19PbTVnS1B2bktSZnMxRjFYaU9RX29Xa0djazNpRW0xVThaOHVtVW0xZTFiVURWd1dGNkd0cWV2OHNLcGI1OTVOY19JUTdTX3RiZmE0RzdHWjdTd29jLVlMNUFtM3R5cHBkNHYzbjVqYkh4eXlGNUtDYlduVkxOTG9jaWlZS1FHN2J6QjZTb00zWC1mblRzcFhsYjYwWUgxb0YxNTRYZXRPcjUxUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/pakistan-suicide-bombing-northwest.png",
      "alt": "A deserted fortified checkpoint on a dusty road at dusk with concrete blast barriers and a thin column of smoke rising against an orange sky.",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Josephus on the Sicarii, the festival dagger-men of Jerusalem",
        "excerpt": "When the country was purged of these, there sprang up another sort of robbers in Jerusalem, which were called Sicarii, who slew men in the day time, and in the midst of the city; this they did chiefly at the festivals, when they mingled themselves among the multitude, and concealed daggers under their garments, with which they stabbed those that were their enemies; and when any fell down dead, the murderers became a part of those that had indignation against them; by which means they appeared persons of such reputation, that they could by no means be discovered.",
        "source": "Flavius Josephus, The Wars of the Jews, Book II, ch. 13, trans. William Whiston, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/2850/2850-h/2850-h.htm"
      },
      {
        "category": "historical",
        "title": "Emile Henry defends the Cafe Terminus bombing at his trial",
        "excerpt": "The bourgeoisie did not distinguish among the anarchists. Vaillant, a man on his own, threw a bomb; nine-tenths of the comrades did not even know him. But that meant nothing; the persecution was a mass one, and anyone with the slightest anarchist links was hunted down. And since you hold a whole party responsible for the actions of a single man, and strike indiscriminately, we also strike indiscriminately.",
        "source": "Emile Henry, Defence Speech, Paris, 27 April 1894, Marxists Internet Archive.",
        "href": "https://www.marxists.org/reference/archive/henry/1894/defence-speech.htm"
      },
      {
        "category": "literary",
        "title": "Samson pulls the temple down on himself and the crowd (Judges 16, King James Version)",
        "excerpt": "And Samson took hold of the two middle pillars upon which the house stood, and on which it was borne up, of the one with his right hand, and of the other with his left. And Samson said, Let me die with the Philistines. And he bowed himself with all his might; and the house fell upon the lords, and upon all the people that were therein. So the dead which he slew at his death were more than they which he slew in his life.",
        "source": "The Holy Bible, King James Version, Judges 16:29-30, Christian Classics Ethereal Library (CCEL).",
        "href": "https://www.ccel.org/ccel/bible/kjv.Judg.16.html"
      },
      {
        "category": "literary",
        "title": "Milton, Samson Agonistes: the pillars and the burst of thunder",
        "excerpt": "This utter'd, straining all his nerves he bow'd,\nAs with the force of winds and waters pent,\nWhen Mountains tremble, those two massie Pillars\nWith horrible convulsion to and fro,\nHe tugg'd, he shook, till down they came and drew\nThe whole roof after them, with burst of thunder\nUpon the heads of all who sate beneath,\nLords, Ladies, Captains, Councellors, or Priests,\nThir choice nobility and flower, not only\nOf this but each Philistian City round\nMet from all parts to solemnize this Feast.\nSamson with these immixt, inevitably\nPulld down the same destruction on himself;",
        "source": "John Milton, Samson Agonistes (1671), in The Poetical Works of John Milton, ed. H. C. Beeching, Project Gutenberg eBook #1745.",
        "href": "https://www.gutenberg.org/cache/epub/1745/pg1745.txt"
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya, The Third of May 1808 (1814)",
        "excerpt": "A firing squad of faceless soldiers levels its muskets at a knot of terrified civilians herded together in the dark. One man in a white shirt flings his arms wide above a heap of the already-dead, his eyes blown open in the instant before the volley. A lantern on the ground throws harsh light on the huddle, freezing an entire crowd at the edge of sudden, mechanical death.",
        "source": "Francisco de Goya, The Third of May 1808 in Madrid, 1814, oil on canvas, Museo Nacional del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:El_tres_de_mayo_de_1808_en_Madrid.jpg",
        "image": {
          "src": "/covers/pakistan-suicide-bombing-northwest--a4.png",
          "alt": "Goya's painting: a firing squad aims its muskets at a group of civilians at night, one man in a white shirt with arms flung upward beside the fallen dead.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The assassination of Tsar Alexander II by bomb (1881)",
        "excerpt": "A contemporary newsprint engraving of the Catherine Canal embankment in the seconds after the second bomb. Smoke and snow churn together as figures are hurled to the ground amid scattered debris and the wreckage of the imperial coach. Bystanders and soldiers scramble at the margins, caught in the blast a lone conspirator has just set off in the crowded street.",
        "source": "Gustav Broling, engraving of the assassination of Alexander II, Illustrirte Zeitung, Bd. 76 (Leipzig, 1881), p. 262.",
        "href": "https://commons.wikimedia.org/wiki/File:Attentat_mortal_Alexander_II_(1881).jpg",
        "image": {
          "src": "/covers/pakistan-suicide-bombing-northwest--a5.png",
          "alt": "1881 engraving showing a bomb explosion on a St. Petersburg embankment: figures flung down amid smoke, snow and debris around the shattered imperial coach.",
          "credit": "Gustav Broling, in Illustrirte Zeitung Bd. 76 (1881), p. 262. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "greece-firefighting-helicopters-collide",
    "headline": "Two crew are killed when two firefighting helicopters collide near Athens as wildfires burn across southern Europe",
    "overview": "Two crew members were killed when two water-dropping helicopters collided while fighting a wildfire near Athens, Greece's fire service said; a British pilot survived. The crash came as Greece, France, Spain and other parts of southern Europe battled a wave of blazes fanned by a punishing summer heatwave. Thousands of firefighters and dozens of aircraft have been deployed across the region.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPSVVmOGN3UkdYdHBLWVhmMlFheVFwZkplU2xkekoybWZtRi0tbXFRMHBwVHpBTUlwU1RfdFVBTUhuSEVVYnQ0TFVLYXFTWlFNbDZ6Q3JhQUwtMTk0R25HRlZ4OVNKOWtwN2FzYW5Ia2NKdWFsd1U2OFdXVWFyb290dGFUT2VDREhreE5CbUxUQWlmRi1KaWlNdGVuRF80NThpckZ2c2VsSlVRTzU0aUFUVTI4RQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNSGhDR0RqTHVKV24tazZCX3BDVFFjNmFSQm1UTy1jX2czb2FaTE5EcXlqRF8yRFpBREJmN0l2MmYwWkFzaWZmWlNtSTNUUURCLUNrdUhFdi03a2lGeHFFY3RncWIzVGtOR1UySG5yWGJKWWFWSUFHOE9qTVhFaWdEaGtBclJuNVVkMEdtckZIdTdFUEhLT0NKS2JsRlpQQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/greece-firefighting-helicopters-collide.png",
      "alt": "A firefighting helicopter releases a load of water from a suspended Bambi bucket over a burning forest.",
      "credit": "Photograph by Pöllö, CC BY 3.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome (AD 64), recorded by Tacitus",
        "excerpt": "Added to this were the wailings of terror-stricken women, the feebleness of age, the helpless inexperience of childhood, the crowds who sought to save themselves or others, dragging out the infirm or waiting for them, and by their hurry in the one case, by their delay in the other, aggravating the confusion.",
        "source": "Tacitus, Annals, Book 15.38 (trans. Alfred John Church and William Jackson Brodribb), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D15%3Achapter%3D38"
      },
      {
        "category": "historical",
        "title": "The Great Fire of London (1666), from the diary of Samuel Pepys",
        "excerpt": "And among other things, the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.",
        "source": "Samuel Pepys, The Diary of Samuel Pepys, entry for 2 September 1666, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/4171/4171-h/4171-h.htm"
      },
      {
        "category": "literary",
        "title": "The fall of Icarus, from Ovid's Metamorphoses",
        "excerpt": "The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air.",
        "source": "Ovid, The Metamorphoses of Ovid, Book VIII (trans. Henry T. Riley), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "Phaethon scorches the earth, from Ovid's Metamorphoses",
        "excerpt": "The highest altitudes\nare caught in flames, and as their moistures dry\nthey crack in chasms. The grass is blighted; trees\nare burnt up with their leaves; the ripe brown crops\ngive fuel for self destruction—Oh what small\ncomplaints! Great cities perish with their walls,\nand peopled nations are consumed to dust—\nthe forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book 2 (trans. Brookes More, 1922), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book%3D2:card%3D227"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, \"Landscape with the Fall of Icarus\" (c. 1560s)",
        "excerpt": "His legs can be seen in the water just below the ship. The Sun, already half-set on the horizon, is a long way away; the flight did not reach anywhere near it.",
        "source": "\"Landscape with the Fall of Icarus,\" Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Landscape_with_the_Fall_of_Icarus",
        "image": {
          "src": "/covers/greece-firefighting-helicopters-collide--a4.png",
          "alt": "A tranquil coastal landscape dominated by a ploughman and a shepherd, while in the lower right the legs of the drowning Icarus disappear into the sea beside a passing ship.",
          "credit": "After Pieter Bruegel the Elder, Royal Museums of Fine Arts of Belgium, Brussels. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, \"The Burning of the Houses of Lords and Commons\" (1834–35)",
        "excerpt": "Along with thousands of other spectators, Turner himself witnessed the Burning of Parliament from the south bank of the River Thames, opposite Westminster.",
        "source": "\"The Burning of the Houses of Lords and Commons,\" Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Burning_of_the_Houses_of_Lords_and_Commons",
        "image": {
          "src": "/covers/greece-firefighting-helicopters-collide--a5.png",
          "alt": "A blazing conflagration engulfs the Houses of Parliament at night, its flames and smoke reflected across the River Thames as crowds watch from Westminster Bridge.",
          "credit": "Joseph Mallord William Turner, Philadelphia Museum of Art. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "brazil-lula-reelection-bid",
    "headline": "Brazil's President Lula, 80, launches a bid for a fourth term as officials warn of foreign interference",
    "overview": "President Luiz Inacio Lula da Silva formally launched his campaign for a fourth term in Brazil's 2026 election, telling supporters he was 'in great shape' and vowing to defend the country's sovereignty. His announcement came amid rising official concern over foreign interference and online disinformation in the coming vote. Lula, who first led Brazil from 2003 to 2010 and returned to office in 2023, is expected to face a crowded field on the right.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNQVhVOWVPWk5lVnU3TGw4ZGtCTkNxVkN1VG92cVlJU0YydG1vbk9uVTFuUzZuMFQzQlYyVmEzRG83bnM3MTR1cDNsSzRZMmhldU14d0dMVTZaSDk2VFZKUERDLXJZcE5iWjVtQXBIS2VKSHM4ZHNEYThRbm1ONDhMang2MzhWUlhkVjBuTnp4aWVVNWp3Yzhyci1HbFFhRXZrb2h2MDVoVnZJNG1mTkdMZUM1ZVhGN0ZLSmc?oc=5"
      },
      {
        "name": "France 24",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQQlZsOUFWWU9tU3RkUG9jSkkyTmpPalhPeEZYRnptZ0xZN3Z1S2gtYmJ4TWNEUG5uRmtyWlduRXRPaHpHdnVRQjh3UWVvTXgtR2Fid0p4ZzNmaUFkNVZIWTFMdi05MlVCb1daNEhzUkhxcDlnT0tGSW5DQm85YjNHZlp1TkpHbnMxMnJzb29STF9PTjhvS2xXUGxSV1dQQndqN2dDWjBPRHJTMzZucFBMRTR3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/brazil-lula-reelection-bid.png",
      "alt": "Official 2023 presidential portrait of Brazil's President Luiz Inácio Lula da Silva, wearing a dark suit and the presidential sash.",
      "credit": "Wikimedia Commons — Official portrait of President Luiz Inácio Lula da Silva by Palácio do Planalto, 2023 (CC BY 2.0)."
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cincinnatus Called from the Plough",
        "excerpt": "There he was found by the deputation from the senate either digging out a ditch or ploughing, at all events, as is generally agreed, intent on his husbandry.\nAfter mutual salutations he was requested to put on his toga that he might hear the mandate of the senate, and they expressed the hope that it might turn out well for him and for the State.",
        "source": "Livy, The History of Rome, Book 3, Chapter 26 (trans. Rev. Canon Roberts), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book%3D3:chapter%3D26"
      },
      {
        "category": "historical",
        "title": "Grover Cleveland's Return to the White House",
        "excerpt": "Defeated after a single term, Grover Cleveland refused to treat the presidency as finished business. Four years later, in 1893, he walked back into the White House as the only American president to win a second, non-consecutive term. His comeback made the interrupted career a template for the veteran leader who leaves office only to reclaim it.",
        "source": "Grover Cleveland — Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Grover_Cleveland"
      },
      {
        "category": "literary",
        "title": "The Homecoming of Odysseus",
        "excerpt": "Then Ulysses in his turn melted, and wept as he clasped his dear and faithful wife to his bosom.",
        "source": "Homer, The Odyssey, Book XXIII (trans. Samuel Butler), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm"
      },
      {
        "category": "literary",
        "title": "They Shall Still Bring Forth Fruit in Old Age",
        "excerpt": "The righteous shall flourish like the palm tree: he shall grow like a cedar in Lebanon.\nThose that be planted in the house of the LORD shall flourish in the courts of our God.\nThey shall still bring forth fruit in old age; they shall be fat and flourishing;",
        "source": "Psalm 92:12–14, The Bible (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "artistic",
        "title": "Cincinnatus Abandons the Plough to Dictate Laws to Rome",
        "excerpt": "Cincinnatus abandons the Plough to dictate Laws to Rome",
        "source": "Juan Antonio de Ribera, c. 1806, Museo del Prado — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Juan_Antonio_Ribera_-_Cincinato_abandona_el_arado_para_dictar_leyes_a_Roma,_1806.jpg",
        "image": {
          "src": "/covers/brazil-lula-reelection-bid--a4.png",
          "alt": "Neoclassical painting of the aged Roman Cincinnatus leaving his plough as senate deputies arrive to summon him back to lead the Republic.",
          "credit": "Juan Antonio de Ribera, 'Cincinnatus abandons the Plough to dictate Laws to Rome,' c. 1806, Museo del Prado. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Odysseus and Penelope Reunited",
        "excerpt": "Ulysses and Penelope by Francesco Primaticcio",
        "source": "Francesco Primaticcio, c. 1563 — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Francesco_Primaticcio_002.jpg",
        "image": {
          "src": "/covers/brazil-lula-reelection-bid--a5.png",
          "alt": "Mannerist painting of Odysseus and Penelope embracing on their bed at his long-awaited homecoming to Ithaca.",
          "credit": "Francesco Primaticcio, 'Odysseus and Penelope,' c. 1563. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "eu-boards-russian-shadow-fleet-tanker",
    "headline": "An Italian-led EU naval force boards a sanctioned tanker from Russia's 'shadow fleet' in the Mediterranean",
    "overview": "An Italian-led European Union naval force boarded and inspected a sanctioned oil tanker linked to Russia's 'shadow fleet' in the Mediterranean Sea, officials said, in a rare enforcement action against the ageing vessels Moscow uses to evade Western oil sanctions. The Italian navy said personnel checked the ship's documents and cargo. The operation reflects a growing European effort to police the covert tanker fleet that sustains Russian crude exports.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxONW5zbU8yMjdVdGc1Z0pTSGFZVUZRTDJPR2lQM3NNU2p0Ym5OcW5xSkgwbnZ5ZmNsUWRaWHgwckZSRFFPMHNWQWtkVS1wcHIwX19uUEdER3Ewd3BLS25NdnFEb29WNHd3dzVPaHJZRVBwamp6MWltM29hbXNNYTVTc2FCUmZpaWF4b0dsNUJzYnRYMHhfRWR4emdRaFBkd0tHX0ViZlZoMXBDN3FEWS1rV21kaXpqdWlHXzkxaU50SGlfaGdvZEI4LQ?oc=5"
      },
      {
        "name": "The Kyiv Independent",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxQOVhlWVhlcnBVUjhCaEx6Q0cwNUhRSEFZa2h3SnRnZGVIMDRGY05zdDZ6SkZnQ0JWQlpoTUJrWXdtS19mWk1leXNWUExPTzdDczg4VmNBWDhMTjRESzBpcWJxZ2doRlpGcG5tNzlJT3U0ZDFYWnh6NWx6ZHJiS1hOOXppbFRhSE0yWUZDc05aQUVSZldic3hCVg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/eu-boards-russian-shadow-fleet-tanker.png",
      "alt": "A laden crude-oil supertanker, the AbQaiq, riding low and alone across open sea.",
      "credit": "Photo: U.S. Navy (Journalist 1st Class Robert Benson), public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pompey's campaign against the Cilician pirates (67 BC)",
        "excerpt": "In 67 BC the Roman Republic, its grain lanes strangled by raiders based in Cilicia, handed Pompey a sweeping mandate to sweep the Mediterranean clean. He carved the sea into sectors and drove a wall of ships eastward, cornering the pirate fleets and their coastal strongholds. Within a single season an ungovernable maritime menace had been brought under the reach of Roman law.",
        "source": "Pompey's campaign against the pirates, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Pompey%27s_campaign_against_the_pirates"
      },
      {
        "category": "historical",
        "title": "The Royal Navy's West Africa Squadron (19th century)",
        "excerpt": "From 1808 the Royal Navy stationed a squadron off West Africa to hunt the ships that carried on the outlawed slave trade. Its officers exercised a contested right of visit and search, running down suspect vessels and boarding them to look for the tell-tale evidence of chained decks and human cargo. Over half a century the patrols stopped some sixteen hundred ships and freed more than a hundred thousand captives, turning naval force into the blunt instrument of an international ban.",
        "source": "West Africa Squadron, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/West_Africa_Squadron"
      },
      {
        "category": "literary",
        "title": "Psalm 107 (King James Version)",
        "excerpt": "They that go down to the sea in ships, that do business in great waters;\nThese see the works of the LORD, and his wonders in the deep.\nFor he commandeth, and raiseth the stormy wind, which lifteth up the waves thereof.\nThey mount up to the heaven, they go down again to the depths: their soul is melted because of trouble.\nThey reel to and fro, and stagger like a drunken man, and are at their wit’s end.",
        "source": "The Bible, King James Version, Psalm 107:23–27",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "literary",
        "title": "Herman Melville, Moby-Dick; or, The Whale (“The Chase—Third Day”)",
        "excerpt": "“Give way!” cried Ahab to the oarsmen, and the boats darted forward to the attack; but maddened by yesterday’s fresh irons that corroded in him, Moby Dick seemed combinedly possessed by all the angels that fell from heaven.",
        "source": "Herman Melville, Moby-Dick; or, The Whale (1851), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2701/2701-h/2701-h.htm"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Slave Ship (1840)",
        "excerpt": "Turner drowns a slave vessel in a burning sea of orange and blood-red, its masts leaning into an oncoming typhoon while manacled figures slip beneath the churning water. Painted as abolitionist campaigns pressed across the Atlantic, it turns a maritime crime into a scene of cosmic reckoning. The ship flees, but the sea itself has become the enforcer.",
        "source": "The Slave Ship, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Slave_Ship",
        "image": {
          "src": "/covers/eu-boards-russian-shadow-fleet-tanker--a4.png",
          "alt": "A sailing ship in a fiery red-and-gold sea under a coming storm, with human figures and chains sinking in the foreground waves.",
          "credit": "J. M. W. Turner, The Slave Ship (1840), Museum of Fine Arts, Boston; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky, Ship in the Stormy Sea (1887)",
        "excerpt": "Aivazovsky sets a lone vessel against towering, luminous swells, its hull pitched sideways as the sea rears up to meet it. Light breaks through the spray as if the storm itself were passing judgement on the little ship. It is the enduring image of a craft at the mercy of forces far larger than itself.",
        "source": "File:Ivan Aivazovsky - Ship in the Stormy Sea.jpg, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Ivan_Aivazovsky_-_Ship_in_the_Stormy_Sea.jpg",
        "image": {
          "src": "/covers/eu-boards-russian-shadow-fleet-tanker--a5.png",
          "alt": "A single sailing ship heeling among high, glowing storm waves under a dark sky.",
          "credit": "Ivan Aivazovsky, Ship in the Stormy Sea (1887), oil on canvas, Hermitage Museum; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "china-red-lines-economic-model",
    "headline": "China draws 'red lines' around its state-led economic model ahead of trade talks with the EU and US",
    "overview": "China has signalled 'red lines' it will not cross in defending its state-led economic model as it heads into fresh trade negotiations with the European Union and the United States, according to a Reuters analysis. Beijing is resisting Western demands to curb industrial subsidies and rein in export-driven overcapacity, framing them as attempts to contain its development. The stance sets up difficult talks over tariffs, market access and green-technology exports.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQQWk1MXJvXzVGTkx2SW9Kak03MTJDSUlsYWtZREhuT1MwcjJUOWcyOFFwcXFHYlNrV1dlUUdHVG9yZk5JbFJwS1JzWWg4ZE9pY0NQWWdpSVhoT0g1ZERwVlBvTm51dklQLWlGU0UxeEF1NVJfQ1pvdnZUa1dRQ3RUU09lUE50NGJLcE4wYmNtUGNXT0xLV1BkNnlmR1p4ZTkwQ0pIRnpQUVQ3TGkyakUwRm5RRzNJZi1Id3Bv?oc=5"
      },
      {
        "name": "Devdiscourse",
        "href": "https://news.google.com/rss/articles/CBMi2AFBVV95cUxNZGxJbjFleTg5dDNocTRvelVxNWVCX3o5dXU4VVBhaEhaN1RGWXpNWnpoS1ZJLUhuRGhGMExYZ3FHS1Z6RTZudkhKWkpKblRvZVlXQmpWM2VvamwwU0FBN3NCVjYwM3JqNC1JUUY2QThwVDBPV0VmZVQ3MjNCajh6R2gyMnlGS2hEZGJTRmVuSU5kS2x3ZkhyaDNYQklKX2NNcHRMcGZXelVLd3pxRXp0aUR1YkZaUUw4VF8xLUhhdHJUbFpkV1Z6TkI0SDMyMGpRUFJWSlpPTFbSAdgBQVVfeXFMTWRsSW4xZXk4OXQzaHE0b3pVcTVlQl96OXV1OFVQYWhIWjdURll6TVp6aEtWSS1IbkRoRjBMWGdxR0tWekU2bnZISlpKSm5Ub2VZV0JqVjNlb2psMFNBQTdzQlY2MDNyajQtSVFGNkE4cFQwT1dFZmVUNzIzQmo4ekdoMjJ5RktoRGRiU0ZlbklOZEtsd2ZIcmgzWEJJSl9jTXB0THBmV3pVS3d6cUV6dGlEdWJGWlFMOFRfMS1IYXRyVGxaZFdWek5CNEgzMjBqUVBSVkpaT0xW?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/china-red-lines-economic-model.png",
      "alt": "Rows of stacked shipping containers and gantry cranes at Wuhu Port on the Yangtze River in Anhui province, China.",
      "credit": "Wuhu Port, Anhui, China (2017). Photo by MNXANL, CC BY-SA 4.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Popilius Laenas draws a circle around Antiochus IV (168 BC)",
        "excerpt": "Popilius, stern and imperious as ever, drew a circle round the king with the stick he was carrying and said, \"Before you step out of that circle give me a reply to lay before the senate.\" For a few moments he hesitated, astounded at such a peremptory order, and at last replied, \"I will do what the senate thinks right.\"",
        "source": "Livy, History of Rome, Book 45, ch. 12 (Rev. Canon Roberts translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0144:book=45:chapter=12"
      },
      {
        "category": "historical",
        "title": "The Qianlong Emperor's edict to King George III (1793)",
        "excerpt": "As your Ambassador can see for himself, we possess all things. I set no value on objects strange or ingenious, and have no use for your country's manufactures.",
        "source": "Qianlong Emperor, Letter to George III (1793), Internet Modern History Sourcebook, Fordham University",
        "href": "https://sourcebooks.fordham.edu/mod/1793qianlong.asp"
      },
      {
        "category": "literary",
        "title": "Proverbs 22:28 - the ancient landmark",
        "excerpt": "Remove not the ancient landmark, which thy fathers have set.",
        "source": "The Book of Proverbs 22:28, King James Version, via Christian Classics Ethereal Library (CCEL)",
        "href": "https://www.ccel.org/ccel/bible/kjv.Prov.22.html"
      },
      {
        "category": "literary",
        "title": "Robert Frost, \"Mending Wall\" (1914)",
        "excerpt": "He will not go behind his father's saying,\nAnd he likes having thought of it so well\nHe says again, \"Good fences make good neighbours.\"",
        "source": "Robert Frost, \"Mending Wall,\" North of Boston (1914), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/3026/3026-h/3026-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Great Wall of China, engraving from Du Halde's Description de la Chine (1735)",
        "excerpt": "An early European engraving of the Great Wall snaking over steep ridges, its watchtowers and battlements marking the frontier the Qing empire kept between itself and the outside world. Published in Jean-Baptiste Du Halde's monumental survey of China, it fixed for Western readers the image of a state that walled its economy and its subjects off from foreign contact.",
        "source": "Jean-Baptiste Du Halde, Description de la Chine (1735), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Du_Halde_-_Description_de_la_Chine_-_Grande_Muraille.jpg",
        "image": {
          "src": "/covers/china-red-lines-economic-model--a4.png",
          "alt": "Eighteenth-century engraving of the Great Wall of China climbing across mountainous terrain, lined with watchtowers.",
          "credit": "Engraving from Jean-Baptiste Du Halde, Description de la Chine (1735). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Great Wall at the Fort of Jiayuguan (1875)",
        "excerpt": "A watercolour view of the fortress at Jiayuguan, the great gate that closed the western end of the Ming wall and the traditional limit of the empire. Painted during a Russian expedition, it shows the massive rammed-earth ramparts and towers where China drew the line between the ordered world within and the frontier beyond.",
        "source": "Adolf Nikolay Boyarsky, view of Jiayuguan (1875), World Digital Library, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Great_Wall_as_It_Appears_near_the_Fort_at_Jiayuguan,_Gansu_Province,_China,_1875_WDL2068.png",
        "image": {
          "src": "/covers/china-red-lines-economic-model--a5.png",
          "alt": "Nineteenth-century watercolour of the fortress and gate at Jiayuguan on the western terminus of the Great Wall of China.",
          "credit": "Adolf Nikolay Boyarsky, 1875 (World Digital Library no. 2068). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "holcim-sells-philippines-huaxin",
    "headline": "Switzerland's Holcim agrees to sell its Philippines cement business to China's Huaxin Cement for about $807 million",
    "overview": "The Swiss building-materials group Holcim agreed to sell its Philippines operations to China's Huaxin Cement for about $807 million, the companies said, as Holcim continues to trim its global portfolio. The deal hands the state-backed Chinese producer a major foothold in Southeast Asia's construction market. Huaxin, which recently expanded in Africa, said the acquisition fit its overseas growth strategy.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQRVVGZmt6VDlQODNUNGdYbUhqdmtGdUNDU0gycTNuU1RaWXFEUFNXNEswbTN4LW1zNnJKdkYwTWtYTy1NZTY0UFRmRlZzNkpyZmxKQnpzMXJ4NWd4N24weXA5YlRxdV9IZU1RVDFDTFJGLU5lZE9xSWNEdkJEYi0yNG1rZ19rU0tncC1wQ2ljN19IdVI1RVBJeTFzZXhBNEg1NGJRLVFZMDRjUS1aNVZ4bzRhSEY5aHpH?oc=5"
      },
      {
        "name": "Inquirer.net",
        "href": "https://news.google.com/rss/articles/CBMiggFBVV95cUxNVzlOTEZsOE16ZkJkMmJlWGw5SjNMWFlZWnZ1dTNlR0ZMSEtHYXFhRUVqT1Jrd3RXRHhQY3R3bklBN2xFcWtEcWpLb1lJMjVmSmtuY2lXQWNjRmw5a3VFZ3VLd20tUnIyZXE3Q1pUbElJZnp2bXhicHlic0NQckRlOUln0gGHAUFVX3lxTE5XQl9VdnN0RE5iZzlPaDg4eHNCRXJIelJtaFByWlRFcVQwbEMyTlJyd0lrWGJ4T3I4M0hkMmVOR1FwbDRUdGpPRzRSVVMtbUJLbGZaRURfVDg2R1pCekU4UG5zY3ltSlplbVBFNzdrcTdQc2kwYW5xM19pV1NUMVJyYjVKa1JvNA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/holcim-sells-philippines-huaxin.png",
      "alt": "A Holcim cement plant at Portland, Colorado, its kilns, storage silos and conveyors standing against a dry western landscape.",
      "credit": "Photo: Jeffrey Beall, CC BY-SA 4.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Britain buys Egypt's share of the Suez Canal (1875)",
        "excerpt": "In 1875, debt-ridden Egypt was forced to sell its stake in the company that owned the newly cut Suez Canal, the great waterway carved through the desert to join two seas. Prime Minister Benjamin Disraeli moved within days, borrowing millions from the Rothschilds to seize the khedive's 177,000 shares before France could. Overnight a rising imperial power became the largest single shareholder in a strategic foreign enterprise, buying its way to a foothold on the road to the East.",
        "source": "Wikipedia: Suez Canal Company",
        "href": "https://en.wikipedia.org/wiki/Suez_Canal_Company"
      },
      {
        "category": "historical",
        "title": "Japan's Mitsubishi buys into Rockefeller Center (1989)",
        "excerpt": "At the height of Japan's 1980s boom, Mitsubishi Estate paid hundreds of millions of dollars for a controlling share of the Rockefeller Group, owner of Manhattan's most storied cluster of skyscrapers. To many Americans it looked like a rising economic power buying up the very landmarks of another nation's ambition. The trophy soon soured: within a few years the property slid into bankruptcy and the Japanese owners walked away.",
        "source": "Wikipedia: Rockefeller Center",
        "href": "https://en.wikipedia.org/wiki/Rockefeller_Center"
      },
      {
        "category": "literary",
        "title": "The Tower of Babel (Genesis 11:3-4, KJV)",
        "excerpt": "3 And they said one to another, Go to, let us make brick, and burn them throughly. And they had brick for stone, and slime had they for morter.\n4 And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "The Holy Bible, King James Version, Genesis 11:3-4 (Christian Classics Ethereal Library)",
        "href": "https://ccel.org/ccel/bible/kjv.Gen.11.html"
      },
      {
        "category": "literary",
        "title": "Except the Lord build the house (Psalm 127:1, KJV)",
        "excerpt": "Except the Lord build the house, they labour in vain that build it: except the Lord keep the city, the watchman waketh but in vain.",
        "source": "The Holy Bible, King James Version, Psalm 127:1 (Christian Classics Ethereal Library)",
        "href": "https://ccel.org/ccel/bible/kjv.Ps.127.html"
      },
      {
        "category": "artistic",
        "title": "The Tower of Babel - Pieter Bruegel the Elder (1563)",
        "excerpt": "The paintings depict the construction of the Tower of Babel, which, according to the Book of Genesis in the Bible, was built by a unified, monolingual humanity as a mark of their achievement and to prevent their dispersion",
        "source": "Wikipedia: The Tower of Babel (Bruegel)",
        "href": "https://en.wikipedia.org/wiki/The_Tower_of_Babel_(Bruegel)",
        "image": {
          "src": "/covers/holcim-sells-philippines-huaxin--a4.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting of the Tower of Babel: a vast, half-finished spiral tower under construction, rising through the clouds above a Flemish port city.",
          "credit": "Pieter Bruegel the Elder, 1563 (Kunsthistorisches Museum, Vienna). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Stonemason's Yard - Canaletto (c. 1725)",
        "excerpt": "Several masons are at work shaping and carving stone probably destined for the reconstruction of the nearby church of San Vidal",
        "source": "Wikipedia: The Stonemason's Yard",
        "href": "https://en.wikipedia.org/wiki/The_Stonemason%27s_Yard",
        "image": {
          "src": "/covers/holcim-sells-philippines-huaxin--a5.png",
          "alt": "Canaletto's mid-1720s painting of a Venetian campo turned into a working stonemasons' yard, with rough blocks of stone and labourers at work beside the Grand Canal.",
          "credit": "Giovanni Antonio Canal (Canaletto), c. 1725 (The National Gallery, London). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "south-korea-record-temperature-yangsan",
    "headline": "South Korea records its highest temperature ever, 42.5C in Yangsan, breaking a 122-year national record",
    "overview": "The southern city of Yangsan reached 42.5 degrees Celsius (108.5 F), the highest temperature ever recorded in South Korea, breaking a national record that had stood since observations began more than a century ago, the Korea Meteorological Administration said. Authorities issued urgent heat warnings and told residents in the worst-hit areas to move immediately to cooling shelters. The record capped a brutal heatwave that has strained the country's power grid and been linked to a rising heat death toll.",
    "genre": "Science",
    "sources": [
      {
        "name": "The Japan Times",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxPQzdSREUxZHR3eHlrZ2std29BNkM2ZV9SUVhfcmxKcDROXzZhR1ZMdFZjV2M1elExQXlGMS1ZZzZadTFCaTdrbzhDSl80dE9fVndfTHBEdHVKZXNfQTJKdE5uRVRDSWx1d2ZGdy1CWkJESXFsVFVsVVRyYUhiZGE4M3pfWTJNLTBWUkp6TjdLRnk1OFk?oc=5"
      },
      {
        "name": "Korea JoongAng Daily",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPS0ViMmxZSnFPSndiSHEweGtVMWJCNDdXa2xtWnJaY19uOTFycnpzQzlsQXRaMnhWbWlzQVVaMkZiaHphNXhjMzFjaWh5NWNUTHB2U2pnbWRKdVJGcFhDMEZ0M0RPaGVPOEE0bm1lZUVZeGljNUQ0X0VnWGNTSXcwODVzLUF1clRObE0ybHplMU5XZ0JfOXhpZTZjamxoM0lqOTZqTktn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/south-korea-record-temperature-yangsan.png",
      "alt": "Sun-baked, cracked and fissured dry mud of a drought-stricken reservoir bed under a bright sky.",
      "credit": "Hydrosami, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "A Roman Drought Recorded by Livy (c. 435 BC)",
        "excerpt": "Not only was there an absence of water from the heavens, but the earth, through lack of its natural moisture, barely sufficed to keep the rivers flowing.",
        "source": "Livy, The History of Rome, Book 4.30 (trans. Rev. Canon Roberts), via the Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=4:chapter=30"
      },
      {
        "category": "historical",
        "title": "The 2003 European Heatwave",
        "excerpt": "In the summer of 2003 a stubborn heat dome settled over Europe and would not lift, driving thermometers past 40C from Iberia to the Rhine. More than 70,000 people died before it broke, over 14,000 in France alone, most of them elderly and alone in cities never built to shed such heat. It remains the deadliest natural disaster in modern European memory, a warning of how a heatwave kills quietly and at scale.",
        "source": "Wikipedia, \"2003 European heatwave\"",
        "href": "https://en.wikipedia.org/wiki/2003_European_heatwave"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II — The Fall of Phaethon",
        "excerpt": "The Clouds disperse in Fumes, the wond'ring Moon\nBeholds her Brother's Steeds beneath her own;\nThe Highlands smoak, cleft by the piercing Rays,\nOr, clad with Woods, in their own Fewel blaze.\nNext o'er the Plains, where ripen'd Harvests grow,\nThe running Conflagration spreads below.\nBut these are trivial Ills: whole Cities burn,\nAnd peopled Kingdoms into Ashes turn.",
        "source": "Ovid, Metamorphoses, Book II, trans. Sir Samuel Garth, John Dryden et al. (1717), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Metamorphoses_(tr._Garth,_Dryden,_et_al.)/Book_II"
      },
      {
        "category": "literary",
        "title": "The Book of Revelation — The Fourth Vial Poured on the Sun",
        "excerpt": "And the fourth angel poured out his vial upon the sun; and power was given unto him to scorch men with fire.",
        "source": "The Holy Bible, King James Version, Revelation 16:8",
        "href": "https://biblehub.com/kjv/revelation/16.htm"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, Regulus (1828)",
        "excerpt": "It is dominated by the large white sun in the centre.",
        "source": "Wikipedia, \"Regulus (Turner)\"",
        "href": "https://en.wikipedia.org/wiki/Regulus_(Turner)",
        "image": {
          "src": "/covers/south-korea-record-temperature-yangsan--a4.png",
          "alt": "J. M. W. Turner's painting Regulus: a classical harbour scene overwhelmed by a huge blazing white sun burning at its centre.",
          "credit": "J. M. W. Turner, Regulus (1828, reworked 1837), Tate. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, The Fall of Phaeton (c. 1604–1605)",
        "excerpt": "Rubens chose to depict the myth at the height of its action, with the thunderbolts hurled by Zeus to the right. The thunderbolts provide the light contrast to facilitate the display of horror on the faces of Phaeton, the horses and other figures while preserving the darkness of the event.",
        "source": "Wikipedia, \"The Fall of Phaeton (Rubens)\"",
        "href": "https://en.wikipedia.org/wiki/The_Fall_of_Phaeton_(Rubens)",
        "image": {
          "src": "/covers/south-korea-record-temperature-yangsan--a5.png",
          "alt": "Peter Paul Rubens's painting The Fall of Phaeton, showing Phaethon and the panicked sun-chariot horses tumbling from the sky amid thunderbolts.",
          "credit": "Peter Paul Rubens, The Fall of Phaeton (c. 1604/1605), National Gallery of Art, Washington. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "spider-man-brand-new-day-box-office",
    "headline": "'Spider-Man: Brand New Day' opens to $355 million in North America and $927 million worldwide, one of the biggest debuts ever",
    "overview": "'Spider-Man: Brand New Day' took in about $355 million in North America, the second-biggest domestic opening on record, and roughly $927 million worldwide in its first weekend, distributor figures showed. The blockbuster gave cinemas one of their strongest results since the pandemic. Its debut trailed only the largest openings in Hollywood history for a domestic bow.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMihwFBVV95cUxQVU5HWmxndk5IaGVQT2tkRnZncDhoejZsSjdDVGQ3V0FCbWhzN1hBd1NHWWFISmYtY3Y5SmVLU0tHNDA5cWZRR09SeWFvY21lLUZoZ0xFXzBZY1dVd2dqM3UyRVFvNUpJYllxaWZZN25fRVh1al9GNWQ1SnBLSm1DcDhuSTh6SU0?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQdFlQbEdGa3g5TjA2Sno1dk5icnlES2wwWHE3MGtQcy1aMUE1d0RiWkU3SmRHMmloT25HeTlJWW8zLTdRdTJfdnFScWlBeDZQYklvRjR5SzFLUlVpZ3lLY3hIZUZnZEVUajRlZ1BJUGEtNzJpdFA5ZTFIaHBaN2tzX3FiVjJib2FsR1lqV2pkWFVSSFNfb01PcEdHajBVc2c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/spider-man-brand-new-day-box-office.png",
      "alt": "A grand movie palace's illuminated marquee and vertical blade sign blaze against the night sky.",
      "credit": "Steve Morgan, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Juvenal, \"Satires\" X — \"bread and circuses\"",
        "excerpt": "For that sovereign people that once gave away military command, consulships, legions, and every thing, now bridles its desires, and limits its anxious longings to two things only—bread, and the games of the circus!",
        "source": "Juvenal, \"The Satires,\" Satire X, translated by the Rev. Lewis Evans (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/50657/50657-h/50657-h.htm"
      },
      {
        "category": "historical",
        "title": "P. T. Barnum on the crowds for Jenny Lind (1850)",
        "excerpt": "Thousands of persons covered the shipping and piers, and other thousands had congregated on the wharf at Canal Street, to see her. The wildest enthusiasm prevailed as the steamer approached the dock.",
        "source": "P. T. Barnum, \"Struggles and Triumphs: or, Forty Years' Recollections of P. T. Barnum\" (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/50115/50115-h/50115-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare, \"Julius Caesar\" (Act I, Scene 1)",
        "excerpt": "Knew you not Pompey? Many a time and oft\nHave you climb’d up to walls and battlements,\nTo towers and windows, yea, to chimney tops,\nYour infants in your arms, and there have sat\nThe livelong day with patient expectation,\nTo see great Pompey pass the streets of Rome.",
        "source": "William Shakespeare, \"The Tragedy of Julius Caesar,\" Act I, Scene 1 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1522/1522-h/1522-h.htm"
      },
      {
        "category": "literary",
        "title": "Lew Wallace, \"Ben-Hur\" — the chariot-race crowd",
        "excerpt": "Forth from each stall, like missiles in a volley from so many great guns, rushed the six fours; and up the vast assemblage arose, electrified and irrepressible, and, leaping upon the benches, filled the Circus and the air above it with yells and screams. This was the time for which they had so patiently waited!—this the moment of supreme interest treasured up in talk and dreams since the proclamation of the games!",
        "source": "Lew Wallace, \"Ben-Hur: A Tale of the Christ\" (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/2145/2145-0.txt"
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme, \"Pollice Verso\" (1872)",
        "excerpt": "Gérôme freezes the instant a triumphant gladiator plants his foot on a fallen foe and looks up for the verdict. Above him the packed tiers of the Colosseum surge forward as one, thumbs jabbing downward, faces bright with bloodlust. It is the ancient blockbuster crowd made visible: tens of thousands fused into a single roar by one staged spectacle.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Leon_Gerome_Pollice_Verso.jpg",
        "image": {
          "src": "/covers/spider-man-brand-new-day-box-office--a4.png",
          "alt": "A victorious Roman gladiator stands over a defeated opponent as the crowded arena tiers thrust their thumbs downward.",
          "credit": "Jean-Léon Gérôme, \"Pollice Verso\" (1872), Phoenix Art Museum. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier, \"The Melodrama\" (c. 1860)",
        "excerpt": "Daumier turns his back on the stage to paint the audience itself, a compact wall of rapt faces rising out of the darkness toward the footlights. Lips part, eyes widen, and hands clutch at collars as the packed house loses itself in the drama. He captures the essential magic of mass entertainment: a crowd of strangers fused into one held breath.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_026.jpg",
        "image": {
          "src": "/covers/spider-man-brand-new-day-box-office--a5.png",
          "alt": "A densely packed theatre audience emerges from shadow, faces turned in rapt attention toward a brightly lit stage.",
          "credit": "Honoré Daumier, \"The Melodrama\" (c. 1860), Neue Pinakothek, Munich. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "bayreuth-wagner-ai-staging-booed",
    "headline": "An AI-assisted staging draws sustained boos at Germany's Bayreuth Festival of Richard Wagner's operas",
    "overview": "A new production at Germany's Bayreuth Festival that used artificial-intelligence-assisted staging and imagery drew loud boos from the audience at its premiere, in the latest clash over AI's place in the arts. The festival, devoted to the operas of Richard Wagner and held at the composer's purpose-built theatre, is one of classical music's most tradition-bound institutions. Directors and critics were divided over whether the technology enriched or cheapened the work.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQY3ozYU5WMW5HQTZ6cTJUaWk1dWxtRmVmQXhFOTBxa25rWUpZYVZPTHBsaXRwcFE5d3hCX2NtLU42cWk5Nm9LVHhhaDN4VWFKSWl5cHBNQUI5MFQ5U2JKUHh4cVF3Zk1MeTRrMndfenkyZmJqQ2RyTWsxYkRGTXJJUk54UndCak5BQXVVdmZtdDRsbWhpaENHS1lsWQ?oc=5"
      },
      {
        "name": "WRBL",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxOdzdnRE5OeDNOMkpOWE55Rm1KeXdYODFBSS15cXhscEE4QktFOFVWMWtTREd0cndsWmg3cklvNndid2p5QU5iaHNFeDBWWjZsVW9fdVJ0SzAwWlNmQWNqbERIYjhBblo2bFUxczdrWlJsWUMyNWM0aDZZdTI3RE5MVlRzc3NnaXZZam5mN3RxcE82SWt4d2VTSUJnWUtDaHBUaU9wV2ZwMXp0YmYzUFVGdkpMVEdqMzJlV1BTMDljSkY1aEhiWlI3VlM5YTbSAdIBQVVfeXFMT2pUWlAwM2ZWLTNGRVdEcC01S3h4b2FfSWo3NU9mS0VLSnZ3ZklUNC1XdFVtTjlUcGRsX09fbEtRRmo5dUhOUHFOSnp3OWhmTDl1a2RGaFp1VDc3Q0JXM254TDFWSzlGV1JBUlFWUVdKaF9jTEhtM3VXU2RGVFYxSGFpbGlLTUpGR284dmV2NUpobEhoZ3lFWndCYWVwbFBySWdNRlhCb2tpMkZrQXZDazM5djl2M25VZDgyRXo1cnFzNC1FSVBnRktmWUdUdnZHMThB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/bayreuth-wagner-ai-staging-booed.png",
      "alt": "Exterior of the Bayreuth Festspielhaus, Richard Wagner's festival theatre on the Green Hill above Bayreuth, seen from the front.",
      "credit": "Bayreuth Festspielhaus (2016). Photo by El Grafo, CC BY-SA 4.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Battle of Hernani (1830)",
        "excerpt": "On the night of 25 February 1830, Victor Hugo's Hernani turned the Comedie-Francaise into a battlefield. Long-haired young Romantics, packed into the pit with tickets Hugo himself had handed out, roared their approval while the powdered partisans of classical tragedy hissed and jeered from the boxes. The uproar over Hugo's rule-breaking verse raged on through the run, and the 'Battle of Hernani' became the founding legend of a new artistic generation storming an old order.",
        "source": "Battle of Hernani, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Battle_of_Hernani"
      },
      {
        "category": "historical",
        "title": "The Riot at The Rite of Spring (1913)",
        "excerpt": "When Stravinsky's The Rite of Spring erupted at the Theatre des Champs-Elysees on 29 May 1913, its pounding rhythms and Nijinsky's jolting choreography split the audience into warring camps. Catcalls and laughter swelled into a near-riot of shouting and scuffles, so loud that the dancers could barely hear the orchestra and dozens of the rowdiest spectators were reportedly ejected. What scandalized Paris that night has since become one of the pillars of modern music.",
        "source": "The Rite of Spring, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Rite_of_Spring"
      },
      {
        "category": "literary",
        "title": "Richard Wagner, The Art-Work of the Future (1849)",
        "excerpt": "The great United Art-work, which must gather up each branch of art to use it as a mean, and in some sense to undo it for the common aim of all, for the unconditioned, absolute portrayal of perfected human nature, this great United Art-work he cannot picture as depending on the arbitrary purpose of some human unit, but can only conceive it as the instinctive and associate product of the Manhood of the Future.",
        "source": "Richard Wagner, 'The Art-Work of the Future', in Richard Wagner's Prose Works, Vol. I, trans. William Ashton Ellis (London: Kegan Paul, Trench, Trubner, 1895)",
        "href": "https://archive.org/stream/richardwagnerspr011341mbp/richardwagnerspr011341mbp_djvu.txt"
      },
      {
        "category": "literary",
        "title": "Samuel Butler, Erewhon: The Book of the Machines (1872)",
        "excerpt": "But who can say that the vapour engine has not a kind of consciousness? Where does consciousness begin, and where end? Who can draw the line? Who can draw any line? Is not everything interwoven with everything?",
        "source": "Samuel Butler, Erewhon; Or, Over the Range (1872), Chapter XXIII, 'The Book of the Machines', via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1906/1906-h/1906-h.htm"
      },
      {
        "category": "artistic",
        "title": "Pierre-Auguste Renoir, Richard Wagner (1882)",
        "excerpt": "Renoir painted this portrait of Richard Wagner in Palermo in January 1882, working from a single sitting of barely thirty-five minutes. The Impressionist's loose, rapid brushwork fixes the ageing composer at the height of his fame, only a year before his death. The encounter brought face to face two very different revolutionaries of nineteenth-century art.",
        "source": "Pierre-Auguste Renoir, 'Richard Wagner' (1882), Musee d'Orsay, Paris, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pierre_auguste_renoir,_richard_wagner,_1882.JPG",
        "image": {
          "src": "/covers/bayreuth-wagner-ai-staging-booed--a4.png",
          "alt": "Impressionist oil portrait of an elderly Richard Wagner, head and shoulders, against a soft blue-grey background.",
          "credit": "Pierre-Auguste Renoir, 'Richard Wagner' (1882), Musee d'Orsay, Paris. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Honore Daumier, The Melodrama (c. 1860)",
        "excerpt": "Instead of the stage, Honore Daumier turned his brush on the audience itself. In 'The Melodrama' the spectators lean forward out of the shadows, their upturned faces caught in the glare of the footlights, rapt and anxious before a drama we never see. Painted around 1860, it is among the first works to make the reacting crowd, rather than the performance, its true subject.",
        "source": "Honore Daumier, 'The Melodrama' (Das Drama), c. 1860, Neue Pinakothek, Munich; Melodrama (Daumier), Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Melodrama_(Daumier)",
        "image": {
          "src": "/covers/bayreuth-wagner-ai-staging-booed--a5.png",
          "alt": "Painting of a darkened theatre audience, pale faces lit from below by stage light, watching an unseen stage.",
          "credit": "Honore Daumier, 'The Melodrama' (Das Drama), c. 1860, Neue Pinakothek, Munich. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "evian-la-source-vive-concert-hall",
    "headline": "French studio PCA-Stream completes La Source Vive, a domed, copper-clad chamber-music hall above Lake Geneva in Evian",
    "overview": "The French studio PCA-Stream has completed La Source Vive, a 490-seat chamber-music hall in Evian, France, designed 'as a musical instrument' with its form shaped by acoustics. Clad in copper shingles and set into a sloping woodland site overlooking Lake Geneva, it sits beside Patrick Bouchain's 1993 timber concert hall La Grange au Lac. The dome and curved timber interior were tuned to carry sound for intimate classical performances.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/08/02/pca-stream-la-source-vive/"
      },
      {
        "name": "RIBA Journal",
        "href": "https://news.google.com/rss/articles/CBMihwFBVV95cUxPbUtmMnphUGUxYmIyQ3MtMFNYNDAxMnlaMWJwdGN2WUxGam14TU1ZT29BRHVsUE4ybjNSZXFuRmlqSjZTaF9sOEtHU2JDLWkxYmNyaXpWNUZxd2NSN2ZjQzIzTXp3VC1wSlVoUWxjNjF4TExlcDZuWm9PUG4yY3RSUFR4WVVVSlk?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/evian-la-source-vive-concert-hall.png",
      "alt": "An aerial view of a domed, shingle-clad concert hall nestled among autumn woodland, with a long dark-roofed timber walkway leading to it.",
      "credit": "Dezeen"
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The ancient theatre of Epidaurus",
        "excerpt": "Cut into the slope of Mount Kynortion in the 4th century BC and credited to Polykleitos the Younger, the theatre of Epidaurus seated some 14,000 spectators and is renowned for acoustics so exact that a coin dropped or a voice raised on the orchestra floor carries clearly to the topmost tier. Modern researchers trace the effect to the corrugated limestone seating, which acts as an acoustic filter, damping low-frequency crowd murmur while letting the performers' higher voices through. More than two millennia before the science of acoustics existed, its builders had shaped raked stone into an instrument for the human voice.",
        "source": "Theatre of Epidaurus (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Theatre_of_Epidaurus"
      },
      {
        "category": "historical",
        "title": "Boston Symphony Hall, tuned by physics",
        "excerpt": "When Symphony Hall opened in 1900, it became the first auditorium in the world designed according to quantifiable acoustic principles, after the young Harvard physicist Wallace Clement Sabine worked out the founding equations of reverberation for its architects. Its narrow 'shoebox' proportions, coffered ceiling and statue-filled niches were dimensioned to sustain and diffuse sound rather than merely to shelter an audience. The result is still counted among the finest concert halls ever built, the moment architecture was first calculated as an instrument.",
        "source": "Symphony Hall, Boston (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Symphony_Hall,_Boston"
      },
      {
        "category": "literary",
        "title": "Goethe: architecture as frozen music",
        "excerpt": "A noble philosopher spoke of architecture as frozen music; and it was inevitable that many people should shake their heads over his remark. We believe that no better repetition of this fine thought can be given than by calling architecture a speechless music.",
        "source": "Johann Wolfgang von Goethe, The Maxims and Reflections of Goethe (trans. Bailey Saunders), no. 493 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/33670/33670-h/33670-h.htm"
      },
      {
        "category": "literary",
        "title": "Vitruvius on siting a theatre for the voice",
        "excerpt": "All this having been settled with the greatest pains and skill, we must see to it, with still greater care, that a site has been selected where the voice has a gentle fall, and is not driven back with a recoil so as to convey an indistinct meaning to the ear.",
        "source": "Vitruvius, The Ten Books on Architecture, Book V, Chapter VIII (trans. Morris Hicky Morgan; Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/20239/20239-h/20239-h.htm"
      },
      {
        "category": "artistic",
        "title": "Raphael, The Ecstasy of Saint Cecilia",
        "excerpt": "The Saint Cecilia Altarpiece is an oil painting by the Italian High Renaissance master Raphael. Completed in his later years, in around 1516–1517, the painting depicts Saint Cecilia, the patron saint of musicians and Church music, listening to a choir of angels in the company of Saints Paul, John the Evangelist, Augustine and Mary Magdalene.",
        "source": "The Ecstasy of Saint Cecilia (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/The_Ecstasy_of_Saint_Cecilia",
        "image": {
          "src": "/covers/evian-la-source-vive-concert-hall--a4.png",
          "alt": "Saint Cecilia stands holding a portative organ whose pipes slip from her hands as she gazes up toward a choir of angels, flanked by four saints, with musical instruments scattered at her feet.",
          "credit": "Raphael, The Ecstasy of Saint Cecilia (c. 1516–1517), Pinacoteca Nazionale di Bologna. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Vermeer, The Music Lesson",
        "excerpt": "The Music Lesson, Woman Seated at a Virginal or A Lady at the Virginals with a Gentleman by Johannes Vermeer is a painting of a young female pupil playing a virginal during a music lesson with a male teacher.",
        "source": "The Music Lesson (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/The_Music_Lesson",
        "image": {
          "src": "/covers/evian-la-source-vive-concert-hall--a5.png",
          "alt": "In a sunlit Dutch interior with a tiled floor and a leaded window, a woman stands at a virginal with her back to the viewer while a man beside her listens; a viola da gamba rests on the floor.",
          "credit": "Johannes Vermeer, The Music Lesson (c. 1662–1665), Royal Collection. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "uganda-netanyahu-entebbe-statue",
    "headline": "Uganda unveils a statue of Yonatan Netanyahu, the Israeli commander killed in the 1976 Entebbe rescue, on the raid's 50th anniversary",
    "overview": "Uganda unveiled a monument to Lieutenant Colonel Yonatan 'Yoni' Netanyahu, the only Israeli soldier killed leading the 1976 raid that freed more than 100 hostages held at Entebbe airport, marking the operation's 50th anniversary. Ugandan army chief Gen Muhoozi Kainerugaba, who led the ceremony, praised Netanyahu's 'courage and selfless service' and hailed warming ties with Israel. The statue, showing Netanyahu striding forward, stands outside the old airport terminal where the rescue took place.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c9v471x89m3o"
      },
      {
        "name": "The Times of Israel",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxOUWRINVBNX3dpQUh4M3V3NWh0UWZXaGhWNUFMUTRpYmhRY1pXejd1Q18zQjd5cVpLd0YzZTUxdEIxcUN0TnpRblRDYVRDNnNHaHJUZXZiaHZDV1ZfWUNnQVdsVFFvM2gzc0JNYm8tS0l0LXdSYVNWdWVUNFNBLTVYanptYkgzTUZvOUQyMkR1RE5wVFBlSTB6cUZOWXJOOV9vUGJHdldRclRrT2tlYXpnbtIBtgFBVV95cUxOOHI0YzBUSmh0UXgta09BTjZvdEFmZHZQdjdBYlo5TnZuRTM3R3czS3hZZHpEQUdvc1dRU1JtdmJ6VEhwYmQxU3IyNk9DaFBmMWs4MC1vTVEzUm5nSVlON0xWYTdOMHJHSThXaGdvX01rRzVrZWtMbVB3ajVMTWdWRE5PWWNZWGc5dURjWjhBNmo3UlRLRE5xV2ZhcmJPeF9yUEczbmJiZFhQWGFGRGdjcFVNWHd3QQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/uganda-netanyahu-entebbe-statue.png",
      "alt": "An archival black-and-white portrait of Lieutenant Colonel Yonatan 'Yoni' Netanyahu, who was killed leading the 1976 Entebbe rescue.",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Xenophon's Ten Thousand reach the sea",
        "excerpt": "Xenophon settled in his mind that something extraordinary must have happened, so he mounted his horse, and taking with him Lycius and the cavalry, he galloped to the rescue. Presently they could hear the soldiers shouting and passing on the joyful word, \"The sea! the sea!\"",
        "source": "Xenophon, Anabasis, Book IV (trans. H. G. Dakyns), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1170/pg1170.txt"
      },
      {
        "category": "historical",
        "title": "Henry Havelock and the relief of Lucknow",
        "excerpt": "In the autumn of 1857, General Henry Havelock drove his outnumbered column through rebel-held country to break the siege of the Lucknow Residency, where British families had been trapped for months. His force cut its way in, only to be besieged in turn until a second army could escort the survivors safely out. Havelock, the commander who had fought his way to the captives, died of dysentery within days of their deliverance, never to see home again.",
        "source": "Henry Havelock, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Henry_Havelock"
      },
      {
        "category": "literary",
        "title": "David recovers the captives at Ziklag (1 Samuel 30)",
        "excerpt": "And David recovered all that the Amalekites had carried away: and David rescued his two wives.\nAnd there was nothing lacking to them, neither small nor great, neither sons nor daughters, neither spoil, nor any thing that they had taken to them: David recovered all.",
        "source": "The Bible, King James Version, 1 Samuel 30:18-19 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "David's lament: 'How are the mighty fallen' (2 Samuel 1)",
        "excerpt": "How are the mighty fallen in the midst of the battle! O Jonathan, thou wast slain in thine high places.\nI am distressed for thee, my brother Jonathan: very pleasant hast thou been unto me: thy love to me was wonderful, passing the love of women.\nHow are the mighty fallen, and the weapons of war perished!",
        "source": "The Bible, King James Version, 2 Samuel 1:25-27 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/2_Samuel"
      },
      {
        "category": "artistic",
        "title": "Benjamin West, The Death of General Wolfe (1770)",
        "excerpt": "Benjamin West froze the moment a victorious commander slips away, painting General James Wolfe sinking into the arms of his officers on the Plains of Abraham just as word arrives that Quebec is won. Grieving soldiers cluster around the pale, Christ-like figure, turning a battlefield death into a secular Deposition. The canvas made the fallen leader an instant icon, mourning cast in oil the way Entebbe's hero is now cast in bronze.",
        "source": "The Death of General Wolfe, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Death_of_General_Wolfe",
        "image": {
          "src": "/covers/uganda-netanyahu-entebbe-statue--a4.png",
          "alt": "Oil painting of the mortally wounded General Wolfe reclining amid a ring of officers and soldiers on the battlefield, a red flag and stormy sky behind them.",
          "credit": "Benjamin West, The Death of General Wolfe (1770), oil on canvas, National Gallery of Canada. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "John Singleton Copley, The Death of Major Peirson (1783)",
        "excerpt": "John Singleton Copley painted the young Major Francis Peirson struck down in the very instant of triumph, as his men repel a French invasion in the streets of St Helier. Around the fallen officer the battle still rages, smoke and banners swirling while a servant avenges him and townsfolk flee. The picture makes a martyr of the commander who fell securing the safety of others, the same paradox now memorialized outside Entebbe's old terminal.",
        "source": "The Death of Major Peirson, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Death_of_Major_Peirson",
        "image": {
          "src": "/covers/uganda-netanyahu-entebbe-statue--a5.png",
          "alt": "Oil painting of a street battle in which the fallen Major Peirson is held by fellow soldiers amid gunsmoke, waving flags, and fleeing civilians.",
          "credit": "John Singleton Copley, The Death of Major Peirson, 6 January 1781 (1783), oil on canvas, Tate. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "iran-trump-cancels-strikes-deal",
    "headline": "Trump says he has cancelled US strikes on Iran, provided a deal is reached 'rapidly,' as the war that began on 28 February drags on",
    "overview": "US President Donald Trump said on Truth Social that he had called off planned strikes on Iran after being asked by Tehran and other Middle Eastern governments to 'hold off,' claiming the 'perimeters' of a deal had been agreed. The announcement followed US media reports that Washington and Israel had been preparing one of the heaviest bombing campaigns yet against Iranian energy infrastructure. Iran did not confirm requesting talks, and its acting defence minister said Tehran treated every threat as 'real and credible,' more than five months into a war that opened with US and Israeli strikes on 28 February.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOQnFCZlNtaWNsWjNfQzZYSUltNnlianRRMlRsUmVqWFNEWlEwWERhVmp5dVdSazcwNmo4bTNzQjNwcW1rS1pYSFRzUXZvUkF5dEFRYzY4T3Q4UUF0ZVBFLXlxVzA5YnRXZTliVWN0M2ZlcV9WVEw4ZjZqblVxOFJ6N2JmX1FMSk5HUXdLWWpOM2l1SWI3b0E2NHB5UU5rLUFRbjRXUEZ6ajZ1VUt1N0JIdURWT1VNbkVHX2UxUVU1b1lFTzY4aFNaOEJ5TTJJdw?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cjwx74qgld2o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/iran-trump-cancels-strikes-deal.png",
      "alt": "Delegations of the United States, Iran and other world powers seated around a large table during the Iran nuclear negotiations in Vienna, 14 July 2015.",
      "credit": "Bundesministerium fuer Europa, Integration und Aeusseres (Austrian Foreign Ministry), 'Iran Talks 14 July 2015,' Wikimedia Commons (CC BY 2.0)."
    },
    "lead": true,
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Melian Dialogue: bargaining at the edge of the sword",
        "excerpt": "Since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book V (the Melian Dialogue), c. 411 BC, translated by Richard Crawley; Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_5"
      },
      {
        "category": "historical",
        "title": "Chamberlain returns from Munich: a catastrophe 'averted'",
        "excerpt": "It has been possible to agree on a way of carrying out a difficult and delicate operation by discussion instead of by force of arms, and thereby they have averted a catastrophe which would have ended civilisation as we have known it. The relief that our escape from this great peril of war has, I think, everywhere been mingled in this country with a profound feeling of sympathy.",
        "source": "Neville Chamberlain, Prime Minister's Statement on the Munich Agreement, House of Commons debate, 3 October 1938; Hansard (HC Deb), UK Parliament.",
        "href": "https://api.parliament.uk/historic-hansard/commons/1938/oct/03/prime-ministers-statement"
      },
      {
        "category": "literary",
        "title": "Nineveh spared: the threatened destruction called off",
        "excerpt": "Yet forty days, and Nineveh shall be overthrown. So the people of Nineveh believed God, and proclaimed a fast, and put on sackcloth, from the greatest of them even to the least of them. ... And God saw their works, that they turned from their evil way; and God repented of the evil, that he had said that he would do unto them; and he did it not.",
        "source": "The Holy Bible, King James Version, Book of Jonah 3:4-10, 1611; Christian Classics Ethereal Library (ccel.org).",
        "href": "https://www.ccel.org/ccel/bible/kjv.Jonah.3.html"
      },
      {
        "category": "literary",
        "title": "Henry V: the last parle before the gates of Harfleur",
        "excerpt": "How yet resolves the governor of the town?\nThis is the latest parle we will admit;\nTherefore to our best mercy give yourselves,\nOr like to men proud of destruction\nDefy us to our worst; for, as I am a soldier,\nA name that in my thoughts becomes me best,\nIf I begin the battery once again,\nI will not leave the half-achieved Harfleur\nTill in her ashes she lie buried.",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act III, Scene 3, c. 1599; Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/1521/pg1521.txt"
      },
      {
        "category": "artistic",
        "title": "Vereshchagin's 'The Apotheosis of War': what the reprieve prevents",
        "excerpt": "A sun-scorched pyramid of human skulls rises on a barren plain, circled by crows, a blasted city and dead trees behind it. Vasily Vereshchagin painted it as a universal indictment of conquest and dedicated it 'to all conquerors, past, present and to come.' It stands as the image of the catastrophe that a last-minute deal or a called-off strike is meant to hold at bay.",
        "source": "Vasily Vereshchagin, The Apotheosis of War (Apofeoz voyny), 1871, oil on canvas, Tretyakov Gallery, Moscow.",
        "href": "https://commons.wikimedia.org/wiki/File:Vasily_Vereshchagin_-_%D0%90%D0%BF%D0%BE%D1%84%D0%B5%D0%BE%D0%B7_%D0%B2%D0%BE%D0%B9%D0%BD%D1%8B_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/iran-trump-cancels-strikes-deal--a4.png",
          "alt": "A tall pyramid of yellowed human skulls on a scorched, empty plain, with crows circling and wheeling around it and a ruined city and dead trees on the horizon under a hazy sky.",
          "credit": "Vasily Vereshchagin, The Apotheosis of War, 1871, Tretyakov Gallery, Moscow. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Rubens's 'The Consequences of War': Peace pulling against Mars",
        "excerpt": "Rubens shows the war-god Mars, sword drawn, being dragged forward by the Fury Alecto while a grieving figure of Europe throws up her arms in despair; Venus and cupids strain to hold him back, and beneath his feet lie a trampled mother and child and the broken instruments of art and learning. The whole canvas is a tug-of-war between restraint and unleashed violence, its outcome hanging in the balance. It mirrors a moment when planned strikes are held off and diplomacy tries, however precariously, to pull the god of war back.",
        "source": "Peter Paul Rubens, The Consequences of War (Gli orrori della guerra), 1638-1639, oil on canvas, Galleria Palatina, Palazzo Pitti, Florence.",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_%E2%80%93_Consequences_of_War_(1638).png",
        "image": {
          "src": "/covers/iran-trump-cancels-strikes-deal--a5.png",
          "alt": "A swirling Baroque allegory in which an armoured Mars with a bloody sword is pulled forward by a torch-bearing Fury while Venus and cupids try to restrain him and a black-clad figure of Europe raises her arms in grief amid trampled figures and scattered objects.",
          "credit": "Peter Paul Rubens, The Consequences of War, 1638-1639, Galleria Palatina, Palazzo Pitti, Florence. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "china-military-drills-scarborough-shoal",
    "headline": "China stages military and coast guard drills and naval and air patrols near the disputed Scarborough Shoal in the South China Sea, warning the Philippines",
    "overview": "China's military said it conducted combat readiness drills together with naval and air patrols around the contested Scarborough Shoal in the South China Sea, and Beijing warned Manila it had 'rich and powerful options' to respond in the waterway. The shoal, a rich fishing ground within the Philippines' exclusive economic zone but controlled by China since 2012, has been a repeated flashpoint. The exercises came amid renewed confrontations between Chinese and Philippine vessels.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxNdVltVTN1VjZFdU05eU9fdEF4aXU3WDVTSVg4blgwRzBNeWRZdll3NmN1ZHNkYy1lUm5jOHBqSHQxRWtPY1g2d29nOFZiU2J5YU44VjZnZkg1cTcyaTBzVXg2eU1oY0xHYVpNdGxPODZJa29ScnJkbUt5OFI4UTRIdWUwOTZreVBiamhzbVV1ZGpXcjRCOElNUV9qTFZGTUtKdlBkSWJURU9VQVphVl9vMQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNRXE0c1JmUmhDb3FjV211UkdlZ2c2ZHBoOW9saThSV0tFdVBYTlFELThzcmltODNtNGpCbHZFUEJtMkFSTU5BMDVydGEtSXhVQkVDNWtyeUZoY0hvblBCN2dTV2VmeUtvc2FPRWxxTVdxdjFUMTJXMzB0SDNGUjlNNzhQT2NKNElMX3RVOEpKMFBjTkJlTkRuN0dzRmhHUmpucXdxTzA5X2t1Zkg2SXU0dXlHSTQ1MEJZSkE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/china-military-drills-scarborough-shoal.png",
      "alt": "China Coast Guard cutter CCG 3105 underway in the waters near Scarborough Shoal in the South China Sea, February 2024.",
      "credit": "Philippine Coast Guard, via Philippine Information Agency (public domain), Wikimedia Commons"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Melian Dialogue (416 BC)",
        "excerpt": "since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book V (the Melian Dialogue), trans. Richard Crawley",
        "href": "https://classics.mit.edu/Thucydides/pelopwar.5.fifth.html"
      },
      {
        "category": "historical",
        "title": "Palmerston's 'Civis Romanus sum' (Don Pacifico debate, 1850)",
        "excerpt": "as the Roman, in days of old, held himself free from indignity, when he could say Civis Romanus sum; so also a British subject, in whatever land he may be, shall feel confident that the watchful eye and the strong arm of England, will protect him against injustice and wrong.",
        "source": "Viscount Palmerston, speech in the House of Commons, 25 June 1850 (the 'Don Pacifico' debate), Hansard, transcribed on Wikisource",
        "href": "https://en.wikisource.org/wiki/Don_Pacifico_Speech"
      },
      {
        "category": "literary",
        "title": "Ahab Covets Naboth's Vineyard (1 Kings 21)",
        "excerpt": "Give me thy vineyard, that I may have it for a garden of herbs, because it is near unto my house... And Naboth said to Ahab, The Lord forbid it me, that I should give the inheritance of my fathers unto thee.",
        "source": "The Bible, 1 Kings 21:2-3, King James Version",
        "href": "https://www.ccel.org/ccel/bible/kjv.1Kings.21.html"
      },
      {
        "category": "literary",
        "title": "Byron, 'Roll on, thou deep and dark blue Ocean'",
        "excerpt": "Roll on, thou deep and dark blue Ocean--roll!\nTen thousand fleets sweep over thee in vain;\nMan marks the earth with ruin--his control\nStops with the shore;--upon the watery plain\nThe wrecks are all thy deed, nor doth remain\nA shadow of man's ravage, save his own,\nWhen for a moment, like a drop of rain,\nHe sinks into thy depths with bubbling groan,\nWithout a grave, unknelled, uncoffined, and unknown.",
        "source": "Lord Byron, Childe Harold's Pilgrimage, Canto IV, stanza 179",
        "href": "https://www.gutenberg.org/cache/epub/5131/pg5131.txt"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, 'The Fighting Temeraire' (1839)",
        "excerpt": "Turner paints a veteran warship of Trafalgar, ghostly and gilded, being towed by a small dark steam-tug toward the breaker's yard beneath a blazing sunset. It is an elegy for a fading order of sea power and a meditation on how command of the waves passes from one age and technology to the next.",
        "source": "Joseph Mallord William Turner, The Fighting Temeraire tugged to her last Berth to be broken up, 1838-39, oil on canvas, The National Gallery, London",
        "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg",
        "image": {
          "src": "/covers/china-military-drills-scarborough-shoal--a4.png",
          "alt": "A luminous, pale old sailing warship towed by a small steam-tug across still water beneath a fiery sunset in J. M. W. Turner's The Fighting Temeraire.",
          "credit": "J. M. W. Turner, The Fighting Temeraire (1839), The National Gallery, London (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky, 'Battle of Chios' (1848)",
        "excerpt": "Aivazovsky stages a great naval engagement at sea: rival fleets crowded under towering sails and gun-smoke, one warship ablaze, the water lit by fire and flag. The vast Romantic canvas dramatizes the raw spectacle of contested seas, where empires assert their reach through massed firepower on the open water.",
        "source": "Ivan Konstantinovich Aivazovsky, The Battle of Chios (26 June 1770), 1848, oil on canvas",
        "href": "https://commons.wikimedia.org/wiki/File:Battle_of_Chios_(1770),_by_Ivan_Aivazovsky_(1848).jpg",
        "image": {
          "src": "/covers/china-military-drills-scarborough-shoal--a5.png",
          "alt": "A dramatic Romantic seascape of two fleets of tall wooden warships locked in battle, one ship on fire and smoke filling the sky, in Aivazovsky's Battle of Chios.",
          "credit": "Ivan Aivazovsky, Battle of Chios (1848) (public domain), via Wikimedia Commons"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "ukraine-drones-strike-wildberries-warehouse",
    "headline": "Ukrainian drone strikes kill at least two people in Russia and set fire to a Wildberries e-commerce warehouse, regional governors say",
    "overview": "Ukrainian drones struck several sites inside Russia overnight, killing at least two people when a drone hit a residential building in the Saratov region and igniting a large fire at a warehouse belonging to the e-commerce giant Wildberries, Russian regional governors said. The strikes were part of a widening Ukrainian campaign against logistics, fuel and industrial targets far behind the front line. Russia said its air defences downed dozens of drones overnight.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxNalRXTDFKTmlXU19IODRKYXA1bkZiSXU2MEMxUmxBRlpjakdLenAtS3EyZ1NaR1ByOXBsc182MzRkLTRUX1R2NFNJTXMyNWt4Nm5mZlBtbEw5ZWhNM2dndjJTZElZbGhWVXhjQm93bkJ1NURwSV9GWlItZjRKTDJYdV9vRjhDYWt2SVZFWGpfNXV4UXpWNnFVeGhQZkpnMEdnMFdZYThzQmxzS0YyNEVqSEFWdkJIX19a?oc=5"
      },
      {
        "name": "The Moscow Times",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxOVUFOSUhMZFlqeU12cm5zZUN0VXBQUmp6QmhydjFlQmpDSmhaUklMRUFlYVliT3BrX3hfSkh5TFpSSGxjb3d5UlNITTFDcF93d0w0TjlIdnRzako2Tm5xN3BkUUFrWElWTm1aaXlTb0VvN0hhYm1rQ1pKajM0ZTA0a3ZmR2ZERDFjY25mNVVuNUZmLXhlYzJHVTQ1MEhZa1NUaDBQVlBFV0tldVRZZDE4VA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/ukraine-drones-strike-wildberries-warehouse.png",
      "alt": "A large warehouse engulfed in a raging blaze, thick smoke and towering flames rising into the sky",
      "credit": "U.S. National Archives (NARA 283525), \"Warehouse engulfed in a raging blaze, St. Louis\", public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The burning of Jerusalem's storehouses (70 AD)",
        "excerpt": "till he set on fire those houses that were full of corn, and of all other provisions. The same thing was done by Simon, when, upon the other's retreat, he attacked the city also; as if they had, on purpose, done it to serve the Romans, by destroying what the city had laid up against the siege, and by thus cutting off the nerves of their own power.",
        "source": "Flavius Josephus, The Wars of the Jews, Book V, ch. 1 (trans. William Whiston)",
        "href": "https://www.gutenberg.org/cache/epub/2850/pg2850.txt"
      },
      {
        "category": "historical",
        "title": "Sherman burns the depots and stores of Atlanta (1864)",
        "excerpt": "The fire also reached the block of stores near the depot, and the heart of the city was in flames all night, but the fire did not reach the parts of Atlanta where the court-house was, or the great mass of dwelling houses... Behind us lay Atlanta, smouldering and in ruins, the black smoke rising high in air, and hanging like a pall over the ruined city.",
        "source": "William Tecumseh Sherman, Memoirs of General W. T. Sherman, Vol. II, ch. XXI (1875)",
        "href": "https://www.gutenberg.org/cache/epub/4361/pg4361.txt"
      },
      {
        "category": "literary",
        "title": "The fall and burning of Troy (Virgil, Aeneid, Book II)",
        "excerpt": "The fatal day, th’ appointed hour, is come,\nWhen wrathful Jove’s irrevocable doom\nTransfers the Trojan state to Grecian hands.\nThe fire consumes the town, the foe commands;",
        "source": "Virgil, The Aeneid, Book II (trans. John Dryden)",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "The granaries laid desolate (The Book of Joel)",
        "excerpt": "The seed is rotten under their clods, the garners are laid desolate, the barns are broken down; for the corn is withered... O Lord, to thee will I cry: for the fire hath devoured the pastures of the wilderness, and the flame hath burned all the trees of the field.",
        "source": "The Bible, Joel 1:17,19 (King James Version)",
        "href": "https://ccel.org/ccel/bible/kjv.Joel.1.html"
      },
      {
        "category": "artistic",
        "title": "Turner, The Burning of the Houses of Lords and Commons (1834-35)",
        "excerpt": "J. M. W. Turner painted the night the seat of British power caught fire, working from sketches he made among the riverside crowds. A vast wall of orange flame swallows the Palace of Westminster and pours its glare across the Thames, dwarfing the tiny silhouettes of onlookers. It is one of art's greatest images of a great institution consumed in a single incandescent night.",
        "source": "Joseph Mallord William Turner, \"The Burning of the Houses of Lords and Commons, 16 October 1834\" (1835), oil on canvas, Cleveland Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ukraine-drones-strike-wildberries-warehouse--a4.png",
          "alt": "Turner's painting of the Palace of Westminster ablaze at night, a towering sheet of orange flame reflected across the Thames while crowds watch from the far bank",
          "credit": "J. M. W. Turner, \"The Burning of the Houses of Lords and Commons, 16 October 1834\" (1835), Cleveland Museum of Art, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "John Martin, The Destruction of Sodom and Gomorrah",
        "excerpt": "John Martin renders divine fire falling from the heavens upon two doomed cities, a favourite theme of his apocalyptic imagination. Bolts of flame rain down from a blood-red sky as the distant metropolis erupts into an inferno, its towers dissolving in light and smoke. Tiny fleeing figures in the foreground measure the scale of a destruction arriving from far above.",
        "source": "John Martin, \"The Destruction of Sodom and Gomorrah\" (1852), oil on canvas, Laing Art Gallery, Newcastle upon Tyne",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_(1789-1854)_-_The_Destruction_of_Sodom_and_Gomorrah_-_TWCMS_,_C6975_-_Laing_Art_Gallery.jpg",
        "image": {
          "src": "/covers/ukraine-drones-strike-wildberries-warehouse--a5.png",
          "alt": "John Martin's painting of fire raining from a dark red sky onto the burning cities of Sodom and Gomorrah, with small figures fleeing in the foreground",
          "credit": "John Martin, \"The Destruction of Sodom and Gomorrah\" (1852), Laing Art Gallery, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "washington-state-wildfires-spokane-evacuations",
    "headline": "Wind-driven wildfires burn more than 250,000 acres across Washington state, forcing thousands to evacuate as flames cross a river into north Spokane",
    "overview": "More than a dozen wildfires burning across Washington state have scorched over 250,000 acres and forced thousands of people to flee, with one fast-moving fire crossing the Spokane River into the north side of the city. Fire officials cited high winds, record heat and bone-dry vegetation across the Pacific Northwest. Governors declared emergencies as crews struggled to contain the blazes.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQYThmc2Z4VmNwMVRiazd6X3c4T0Myd0pqbWplTkNMU3o5M0RoVnFNRzViejJ3UlZnUGk4Z29tVGwwRXk2ZS1hM1BWa252d2t3bVhPcU1LLWs1UTVxdTR0Yl91cTl3blhQV2xBMERaODkwZ29iU1RjXzBXY25qTkh6djNXTjdmSTRBNUZRYVo2d1l5cm9jWFpTRjMwOEpzRmlqeHpDNXlOSDFnSzltaFdldk5MNUtWZkVy?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQTmpxLWw0WF91MFowZkpGc2JmRXdPMHM2cHRyd0V5S1NRZHlDQXhRYzVJYnhlUEhwblVVVUNlNm1vMW9FN3V1MFR6WWsxVUZlbkRMUDZHTl9pQlYzbW41d24ySWRQeUlPSDR5M2hPWXRYTVUtZDBPSVkxX3pWYVdpejVsbjh1TWNaOVdoS0ZPcS1QcmJLWm9EMHlFSV8xNEJMRkJoZ1Q3QmFSRC1H?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/washington-state-wildfires-spokane-evacuations.png",
      "alt": "An air tanker drops a long trail of red fire retardant over a smoke-shrouded, forested ridge during a wildfire in Washington state.",
      "credit": "BLM Oregon & Washington, \"Tanker drop on Washington wildfire.\" Public domain, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome (64 CE)",
        "excerpt": "the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus.... Often, while they looked behind them, they were intercepted by flames on their side or in their face. Or if they reached a refuge close at hand, when this too was seized by the fire, they found that, even places, which they had imagined to be remote, were involved in the same calamity.",
        "source": "Tacitus, Annals, Book XV.38 (trans. Alfred John Church and William Jackson Brodribb), on the Great Fire of Rome, 64 CE.",
        "href": "https://classics.mit.edu/Tacitus/annals.11.xv.html"
      },
      {
        "category": "historical",
        "title": "The Great Fire of London (1666)",
        "excerpt": "poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another. And among other things, the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.... and the wind mighty high and driving it into the City; and every thing, after so long a drought, proving combustible.",
        "source": "Samuel Pepys, The Diary of Samuel Pepys, entry for 2 September 1666, the Great Fire of London.",
        "href": "https://www.gutenberg.org/cache/epub/4200/pg4200.txt"
      },
      {
        "category": "literary",
        "title": "Virgil, the burning of Troy (Aeneid, Book II)",
        "excerpt": "Thus, when a flood of fire by wind is borne,\nCrackling it rolls, and mows the standing corn;\nOr deluges, descending on the plains,\nSweep o'er the yellow ear, destroy the pains\nOf lab'ring oxen and the peasant's gains;\nUnroot the forest oaks, and bear away\nFlocks, folds, and trees, and undistinguish'd prey",
        "source": "Virgil, The Aeneid, Book II (trans. John Dryden), the fall and burning of Troy.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "The destruction of Sodom and Gomorrah (Genesis 19)",
        "excerpt": "Escape for thy life; look not behind thee, neither stay thou in all the plain; escape to the mountain, lest thou be consumed.... Then the Lord rained upon Sodom and upon Gomorrah brimstone and fire from the Lord out of heaven; And he overthrew those cities, and all the plain.... and, lo, the smoke of the country went up as the smoke of a furnace.",
        "source": "The Holy Bible, King James Version, Genesis 19:17-28 (the destruction of Sodom and Gomorrah).",
        "href": "https://www.ccel.org/ccel/bible/kjv.Gen.19.html"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Burning of the Houses of Lords and Commons (c. 1835)",
        "excerpt": "Turner witnessed the 1834 fire that consumed the Palace of Westminster and turned the catastrophe into a vision of pure elemental force. A towering wall of white-gold flame and smoke erupts against the night, its glare doubled in the black water of the Thames, while a dense crowd of tiny onlookers massed on Westminster Bridge is dwarfed to insignificance before it. The painting captures the terror and awe of a city consumed by fire faster than any human hand could stop it.",
        "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (c. 1834-35), oil on canvas, Philadelphia Museum of Art.",
        "href": "https://commons.wikimedia.org/wiki/File:Turner-The_Burning_of_the_Houses_of_Lords_and_Commons.jpg",
        "image": {
          "src": "/covers/washington-state-wildfires-spokane-evacuations--a4.png",
          "alt": "A vast blaze of white and orange flame and smoke rises into the night sky over the River Thames as the Houses of Parliament burn, the fire reflected in the water before a crowd on the bridge.",
          "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons (c. 1835). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "John Martin, The Great Day of His Wrath (1851-53)",
        "excerpt": "In this apocalyptic canvas the whole world seems to catch fire at once: mountains are torn loose and hurled through a sky of molten red, and a doomed multitude tumbles into a fiery abyss below. Martin painted humanity as helpless specks before an overwhelming, all-consuming inferno. It renders in paint the primal dread of an elemental force that no city or crowd can withstand.",
        "source": "John Martin, The Great Day of His Wrath (1851-1853), oil on canvas, Tate, London.",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Great_Day_of_His_Wrath_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/washington-state-wildfires-spokane-evacuations--a5.png",
          "alt": "A cataclysmic scene of collapsing red-lit mountains and burning skies, with masses of tiny human figures falling into a blazing chasm.",
          "credit": "John Martin, The Great Day of His Wrath (1851-53), Tate. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "china-gansu-landslides-floods-deaths",
    "headline": "Flash floods and landslides in China's Gansu province kill at least 25 people and injure more than 20 as torrential rains continue",
    "overview": "At least 25 people were killed and more than 20 injured by flash floods and landslides in northwest China's Gansu province after days of torrential rain, state media said, with rescuers searching for people still missing. Large parts of China were placed on flood alert as the summer's heavy rains overwhelmed rivers and hillsides. It is one of the deadliest rain-triggered disasters of the season.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxOU211TUJlRDhVUV9BaEFiVG9wY18xdnJ0U1NBZDgtRFZsVTVDN0puSnkyRnk0Mi11Q0RrcV9NalNyY2RxUDNNNjkwM3FnNlVNTkZMcVBVeGF3RHBHNXFqclEtME9JSWxpRHJjRXNMRUgtVlpfYl9lUzlfZ1RsRm1SRXdjMGJsSy1lYzVEWjBFbVNhRHVjenMzWkRfYUUwV3BvRmdSdXBsVnVnaGhxSFV1YXRULWplREx5YVVJcEFFQVZBUEd6?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxPVjh5X1VBZV9uWk0tRGZVeXZ0RGxWclMtSERDRXJvTUM4NlhrVXFEZC1KVm5Hd0xySXdZYTdqRnowSFo0M3ZOZndUaDhFUkItUjJKWlR4SjQxRVNKTDE5LS1mYmxrS2lKWDJ2c0RINjJISm5VYmVETjBnTUxkM0taWG9kRW9XQVRXVzI5ODh2Ykt6OVRGRUY2bWE2X0V3SERZNFZFUUdEd1dPRFNKdXVvRHowQTFGVjhjVXVkcDFBeXVJM03SAcMBQVVfeXFMT1Y4eV9VQWVfblpNLURmVXl2dERsVnJTLUhEQ0Vyb01DODZYa1VxRGQtSlZuR3dMckl3WWE3akZ6MEhaNDN2TmZ3VGg4RVJCLVIySlpUeEo0MUVTSkwxOS0tZmJsa0tpSlgydnNESDYySEpuVWJlRE4wZ01MZDNLWlhvZEVvV0FUV1cyOTg4dmJLejlURkVGNm1hNl9Fd0hEWTRWRVFHRHdXT0RTSnV1b0R6MEExRlY4Y1V1ZHAxQXl1STNN?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/china-gansu-landslides-floods-deaths.png",
      "alt": "The swollen Gan River overflowing its banks and inundating riverside land during flooding in Jiangxi, China, June 2010",
      "credit": "Alancrh, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Flood of Yao and the Taming of the Waters",
        "excerpt": "Destructive in their overflow are the waters of the inundation. In their vast extent they embrace the hills and overtop the great heights, threatening the heavens with their floods, so that the lower people groan and murmur.",
        "source": "The Shoo King (Book of Documents), \"The Canon of Yao,\" trans. James Legge, in The Chinese Classics, Vol. III (1865).",
        "href": "https://ctext.org/shang-shu/canon-of-yao"
      },
      {
        "category": "historical",
        "title": "The Tiber Overwhelms Rome (15 CE)",
        "excerpt": "That same year the Tiber, swollen by continuous rains, flooded the level portions of the city. Its subsidence was followed by a destruction of buildings and of life.",
        "source": "Tacitus, The Annals, Book I (ch. 76), trans. Alfred John Church and William Jackson Brodribb.",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_1"
      },
      {
        "category": "literary",
        "title": "The Deluge of Gilgamesh: Corpses Floating Like Reeds",
        "excerpt": "Six days and nights passed, the wind tempest and storm overwhelmed, on the seventh day in its course, was calmed the storm, and all the tempest which had destroyed like an earthquake, quieted... and the whole of mankind who turned to sin, like reeds their corpses floated.",
        "source": "George Smith, \"The Chaldean Account of the Deluge,\" Transactions of the Society of Biblical Archaeology, Vol. II (1873).",
        "href": "https://en.wikisource.org/wiki/The_Chaldean_Account_of_the_Deluge"
      },
      {
        "category": "literary",
        "title": "The Flood of Noah in Genesis",
        "excerpt": "And the flood was forty days upon the earth; and the waters increased, and bare up the ark, and it was lift up above the earth... And all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered.",
        "source": "Genesis 7:17-20, King James Version.",
        "href": "https://www.ccel.org/ccel/bible/kjv.Gen.7.html"
      },
      {
        "category": "artistic",
        "title": "Hokusai, The Great Wave off Kanagawa",
        "excerpt": "Katsushika Hokusai's woodblock print sets tiny fishing boats and their crews beneath a colossal cresting wave whose foam claws down like talons. It is the definitive image of humanity dwarfed and imperiled by the sheer power of water, distant Mount Fuji reduced to a small triangle behind the towering swell.",
        "source": "Katsushika Hokusai, \"The Great Wave off Kanagawa\" (Under the Wave off Kanagawa), from Thirty-six Views of Mount Fuji, c. 1831, color woodblock print.",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/china-gansu-landslides-floods-deaths--a4.png",
          "alt": "A towering ocean wave with clawing foam crests over three small boats, with Mount Fuji small in the distance",
          "credit": "Katsushika Hokusai, The Great Wave off Kanagawa (c. 1831). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Francis Danby, The Deluge",
        "excerpt": "Danby's vast, storm-darkened canvas imagines the biblical flood at its climax: mountainous waves engulf a drowning world while desperate figures cling to rocks and the dead are swept away in the churning dark. A single shaft of light and the distant ark are all that survive the annihilating water.",
        "source": "Francis Danby, \"The Deluge,\" c. 1840, oil on canvas, Tate, London.",
        "href": "https://commons.wikimedia.org/wiki/File:Francis_Danby_-_The_Deluge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/china-gansu-landslides-floods-deaths--a5.png",
          "alt": "A dark, tempestuous painting of the biblical Deluge with towering waves overwhelming struggling human figures under a stormy sky",
          "credit": "Francis Danby, The Deluge (c. 1840), Tate. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "opec-plus-september-output-hike-pause",
    "headline": "OPEC+ is set to approve another oil output increase for September and then pause further hikes, sources tell Reuters",
    "overview": "OPEC and its allies led by Russia are expected to agree a further increase in oil production quotas for September before pausing additional hikes, sources familiar with the talks said ahead of the group's meeting. The producers have been unwinding earlier output cuts to regain market share even as the Iran war roils crude prices. Analysts said the added barrels may do little to bring prices down while the conflict persists.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxOOUxtS1l6d0U4NVcxelJCQ1EwSGpaQ3BjNXJHUlpQcVlfZXJjMWU5WllQR21KdDZ0dlo2NDI0cW1RVXd3U0FiTHZMRHNDNng5ZXZseU9lT19KeG1RY18xRGNTVzBjdHpzOWpYQkwxTENWWko4NmtFQm5iQzFvQWdfeGhvQVZSMHdrZjhzRFREVnN2RWQyanBEdGp0T19mazNxR0ZiRXdFRVlvX1RZNW5mVFgyYlUxeS15QlZfOHhWY1UzSzFTZk13Yw?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQV3Y4SXlSOEpmOWpzdXdPeXpzMTBkRlBOaWcxVGVDUDJJYWlTckhhelQ2ZW5na1BLTFg4UVRkTGJ1NzlKaXhQNFR2b1ZmRDMwQkN6Z1RSb1J4MURQTnhCajBRWkxKUTNWQ1NTM29wVEJ5dHFRM0c2TXBvdnRvdVlaUVJ0Wnc1eHV0emItQWpQN0VfbVQwM3c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/opec-plus-september-output-hike-pause.png",
      "alt": "Rows of pumpjacks silhouetted against a hazy orange sunset at the Lost Hills oil field, California",
      "credit": "Pumpjacks at the Lost Hills Oil Field, California. Photo by Arne Hückelheim, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Standard Oil combination: Rockefeller defends controlling the flow",
        "excerpt": "It is equally true that combinations of capital are bound to continue and to grow... The day of individual competition in large affairs is past and gone... It is too late to argue about advantages of industrial combinations. They are a necessity.",
        "source": "John D. Rockefeller, Random Reminiscences of Men and Events (New York: Doubleday, Page & Co., 1909).",
        "href": "https://www.gutenberg.org/cache/epub/17090/pg17090.txt"
      },
      {
        "category": "historical",
        "title": "Pliny the Elder on tearing riches from the earth (1st century AD)",
        "excerpt": "We penetrate into her entrails, and seek for treasures in the abodes even of the Manes... when will be the end of thus exhausting the earth, and to what point will avarice finally penetrate!",
        "source": "Pliny the Elder, Natural History, Book XXXIII (trans. John Bostock & H. T. Riley, 1855).",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=33:chapter=1"
      },
      {
        "category": "literary",
        "title": "The golden touch of Midas",
        "excerpt": "He, destined to make a foolish use of the favour, says, ‘Cause that whatever I shall touch with my body shall be turned into yellow gold.’ ... Astonished at the novelty of his misfortune, being both rich and wretched, he wishes to escape from his wealth.",
        "source": "Ovid, Metamorphoses, Book XI (trans. Henry T. Riley, 1893).",
        "href": "https://www.gutenberg.org/cache/epub/26073/pg26073.txt"
      },
      {
        "category": "literary",
        "title": "Zola's Germinal: the pit as an insatiable god of coal",
        "excerpt": "...the evil air of a gluttonous beast crouching there to devour the earth... it was as if he were speaking of an inaccessible tabernacle containing a sated and crouching god to whom they had given all their flesh and whom they had never seen.",
        "source": "Émile Zola, Germinal (1885), trans. Havelock Ellis (1894), Part I.",
        "href": "https://www.gutenberg.org/cache/epub/56528/pg56528.txt"
      },
      {
        "category": "artistic",
        "title": "Hieronymus Bosch, Death and the Miser",
        "excerpt": "Bosch's tall panel shows a dying miser propped in bed as Death enters at the door, a demon proffering him a bag of gold while an angel points toward the crucifix in the window. At the foot of the bed the man's earlier self still rakes coins into a strongbox that grasping creatures pick at. It is a memento mori on avarice: wealth hoarded to the very last breath, clutched even when it can no longer be kept.",
        "source": "Hieronymus Bosch, Death and the Miser, c. 1485–1490, oil on panel, National Gallery of Art, Washington, D.C.",
        "href": "https://commons.wikimedia.org/wiki/File:Hieronymus_Bosch_-_Death_and_the_Miser_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/opec-plus-september-output-hike-pause--a4.png",
          "alt": "Painted panel of a dying man in bed reaching toward a bag of gold offered by a demon while an angel gestures to a crucifix",
          "credit": "Hieronymus Bosch, Death and the Miser (c. 1485–1490), National Gallery of Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner, Das Rheingold: the theft of the river's gold",
        "excerpt": "Wagner's opera opens with three Rhinemaidens guarding a hoard of gold in the depths of the river; the spurned dwarf Alberich renounces love to seize the gold and forge from it a ring of absolute power. The whole four-opera cycle that follows turns on the curse of that hoard, as gods, giants, and dwarves scheme to command it. It is the founding modern parable of a precious substance wrested from nature and the greed and dominion it unleashes.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (first performed 1869); plate by Arthur Rackham (1910).",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/opec-plus-september-output-hike-pause--a5.png",
          "alt": "Ink and wash illustration of a Rhinemaiden swimming through the river depths above the crouching dwarf Alberich",
          "credit": "Arthur Rackham, illustration for The Rhinegold & The Valkyrie (1910); public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "westjet-flight-attendants-strike",
    "headline": "WestJet flight attendants walk off the job after contract talks collapse, grounding flights across Canada",
    "overview": "Flight attendants at Canada's WestJet went on strike after negotiations for a new contract broke down, prompting the airline to cancel flights and stranding travellers during the busy summer season. The union representing about 5,000 cabin crew said members were seeking better pay and an end to unpaid work on the ground. WestJet urged passengers to check flight status and warned of widespread disruption.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQblhNTDVZU3dqTmw4d252dTlOaS1pdnFEcU5ZTjdobll4RnNJYXdVVkszRExqOHRLRGFYbG5XNVE3a0h0TUp3UzZocVNic3l1dXdPMzNGaDljWWZmS2kwUF90RVlfcG02TVc0LVJTS0dqbUV2QWhLZlhEVTloNHUxUjZJLXdwb0FRUk8td1FDaHdUdC1SalhBTWlJVEJ5cDBiaGlmeWtLNHBycWJlVFU0VTlFYThLamVfMGNB?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiWkFVX3lxTFBkVmVrenFIbjdQMUw0eTliWlRYRnVNY1FjS284RTliY0R1THBZdzdndEZtX1V6cUdiNTdHczNKaHRsZDY4aUpTbFdWeTNNLWhQMEZLVjk3WG5XZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/westjet-flight-attendants-strike.png",
      "alt": "A WestJet Boeing 737 aircraft parked on the apron at Toronto Pearson International Airport",
      "credit": "\"WestJet plane at Pearson\" by Roc1233, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Secession of the Plebeians (Secessio plebis), 494 BC",
        "excerpt": "In the days when all the parts of the human body were not as now agreeing together, but each member took its own course and spoke its own speech, the other members, indignant at seeing that everything acquired by their care and labour and ministry went to the belly, whilst it, undisturbed in the middle of them, did nothing but enjoy the pleasures provided for it, entered into a conspiracy; the hands were not to bring food to the mouth, the mouth was not to accept it when offered, the teeth were not to masticate it.",
        "source": "Livy, The History of Rome (Ab Urbe Condita), Book 2, ch. 32, trans. Rev. Canon Roberts (1905). Menenius Agrippa's fable of the belly and the members, told to persuade the plebeians who had withdrawn their labour and seceded to the Sacred Mount.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=2:chapter=32"
      },
      {
        "category": "historical",
        "title": "John Ball and the Peasants' Revolt, England 1381",
        "excerpt": "Ah, ye good people, the matters goeth not well to pass in England, nor shall not do till everything be common, and that there be no villains nor gentlemen, but that we may be all united together, and that the lords be no greater masters than we be. What have we deserved, or why should we be kept thus in servage? ... They are clothed in velvet and camlet furred with grise, and we be vestured with poor cloth: they have their wines, spices and good bread, and we have the drawing out of the chaff and drink water; ... and by that that cometh of our labours they keep and maintain their estates: we be called their bondmen, and without we do readily them service, we be beaten.",
        "source": "Jean Froissart, Chronicles, trans. Lord Berners (1523-25), recording the preaching of the priest John Ball before the Peasants' Revolt of 1381; from Chronicle and Romance: Froissart, Malory, Holinshed (Harvard Classics, vol. 35).",
        "href": "https://www.gutenberg.org/cache/epub/13674/pg13674.txt"
      },
      {
        "category": "literary",
        "title": "Germinal, the coal miners' strike",
        "excerpt": "The closed horizon was bursting out; a gap of light was opening in the sombre lives of these poor people. The eternal wretchedness, beginning over and over again, the brutalizing labour, the fate of a beast who gives his wool and has his throat cut, all the misfortune disappeared, as though swept away by a great flood of sunlight; and beneath the dazzling gleam of fairyland justice descended from heaven.",
        "source": "Émile Zola, Germinal (1885), trans. Havelock Ellis. Étienne Lantier kindles the miners of Montsou toward the strike and a dreamed-of society of workers.",
        "href": "https://www.gutenberg.org/cache/epub/56528/pg56528.txt"
      },
      {
        "category": "literary",
        "title": "The Mask of Anarchy",
        "excerpt": "Rise like Lions after slumber\nIn unvanquishable number,\nShake your chains to earth like dew\nWhich in sleep had fallen on you—\nYe are many—they are few.",
        "source": "Percy Bysshe Shelley, The Mask of Anarchy (written 1819, published 1832), the closing stanza calling the working people to rise in their numbers.",
        "href": "https://en.wikisource.org/wiki/The_Mask_of_Anarchy"
      },
      {
        "category": "artistic",
        "title": "The Strike (Der Streik)",
        "excerpt": "Workers pour out of a factory gate and confront the mill owner on the steps of his house: one man, fists clenched, leans forward to argue while a woman clutches her children behind him and, at the lower right, another labourer stoops to pick up a stone. Robert Koehler's monumental canvas, first shown in 1886, was one of the earliest paintings to make an industrial strike its heroic subject and became an emblem of the American and European labour movements.",
        "source": "Robert Koehler, The Strike (Der Streik), 1886, oil on canvas. Deutsches Historisches Museum, Berlin.",
        "href": "https://commons.wikimedia.org/wiki/File:Robert_Koehler_-_Der_Streik_(1886).jpg",
        "image": {
          "src": "/covers/westjet-flight-attendants-strike--a4.png",
          "alt": "Painting of factory workers massed outside a mill, one man confronting the well-dressed owner on the steps of his house while others gather angrily around",
          "credit": "Robert Koehler, The Strike (1886), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The March of the Weavers (Weberzug)",
        "excerpt": "A grim procession of impoverished weavers advances from the left, heads bowed and fists tightened, the men shouldering tools like weapons and a woman pressing forward with a child. Käthe Kollwitz's 1897 etching, part of her cycle A Weavers' Revolt inspired by Gerhart Hauptmann's play, renders the collective determination of workers marching toward the master's house in stark, unheroic realism.",
        "source": "Käthe Kollwitz, The March of the Weavers (Weberzug), 1897, etching, plate 4 from the cycle A Weavers' Revolt (Ein Weberaufstand).",
        "href": "https://commons.wikimedia.org/wiki/File:The_March_of_the_Weavers_in_Berlin%27_by_K%C3%A4the_Kollwitz,_1897.jpg",
        "image": {
          "src": "/covers/westjet-flight-attendants-strike--a5.png",
          "alt": "Black-and-white etching of a crowd of poor weavers marching forward together, faces set with resolve, carrying tools",
          "credit": "Käthe Kollwitz, The March of the Weavers (1897), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "us-water-utilities-cyberattack-iran",
    "headline": "FBI investigates as Michigan joins Minnesota in reporting cyberattacks on water systems, with evidence pointing to Iran across seven states",
    "overview": "Michigan became the latest state to report cyberattacks on its public water systems, joining Minnesota and prompting an FBI investigation, officials said, as the scope of intrusions widened to about seven states. US investigators are examining whether Iran was behind the hacks of operational-technology systems at water utilities, amid the ongoing conflict. Authorities said there was no confirmed contamination of drinking water but urged utilities to harden defences.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPejV5NEdoc3dyRHhtTTZXUVlOQXI0a0JIMjhOOWtGZ2xvNzlPS2h6WnJ0d25LejIwNDB4TzFYZWRFNk1CaUVQVXp1ZTdpXzNieFFRVUFYUHNfa2tKRGwzRWwwbElHa0dDcmc4Xzl1Y2hfN1JjYkpoVEhsZ2dEbkQweWk0RUxueW5JcW1ybGY0RUZUUFhGRzNadXJ5WQ?oc=5"
      },
      {
        "name": "The New York Times",
        "href": "https://news.google.com/rss/articles/CBMiigFBVV95cUxNZGxpY1JycXNJbGxZOUYwbVFEYzBXbDdCd2NnU3NZOVU5UGxjOS1hRDBhWHp3Ukc4UV9rS0Jad3psZUVwWVBxRE9TLWMtOEVrMUtuYVBYNE1nQ2RLUXlRSmRKQVQySFpicV9kTWNqSjRsSXZQcTVWUWxaSmlQa0ZfTW1SUzRNdmVicmc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/us-water-utilities-cyberattack-iran.png",
      "alt": "A SCADA supervisory-control room at a water treatment plant, banks of monitors displaying the flow schematics of the water system.",
      "credit": "NEWater SCADA room, photo by Wikimedia Commons user Z22, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Clisthenes poisons the water of Crisa (First Sacred War, c. 590 BC)",
        "excerpt": "Clisthenes of Sicyon cut the water-pipes leading into the town of the Crisaeans. Then when the townspeople were suffering from thirst, he turned on the water again, now poisoned with hellebore. When the inhabitants used this, they were so weakened by diarrhoea that Clisthenes overcame them.",
        "source": "Frontinus, Stratagems (Strategemata), Book III, ch. VII.6, “On Diverting Streams and Contaminating Waters,” trans. Charles E. Bennett (Loeb Classical Library, 1925).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Frontinus/Strategemata/3*.html"
      },
      {
        "category": "historical",
        "title": "The Goths cut the fourteen aqueducts of Rome (Siege of Rome, AD 537)",
        "excerpt": "So the Goths, having taken their positions in this way, tore open all the aqueducts, so that no water at all might enter the city from them. Now the aqueducts of Rome are fourteen in number, and were made of baked brick by the men of old, being of such breadth and height that it is possible for a man on horseback to ride in them.",
        "source": "Procopius, History of the Wars, Book V (The Gothic War), xix.13, trans. H. B. Dewing (Loeb Classical Library, 1919).",
        "href": "https://www.gutenberg.org/cache/epub/20298/pg20298.txt"
      },
      {
        "category": "literary",
        "title": "The first plague of Egypt: the waters turned to blood (Exodus 7)",
        "excerpt": "And Moses and Aaron did so, as the LORD commanded; and he lifted up the rod, and smote the waters that were in the river, in the sight of Pharaoh, and in the sight of his servants; and all the waters that were in the river were turned to blood. And the fish that was in the river died; and the river stank, and the Egyptians could not drink of the water of the river; and there was blood throughout all the land of Egypt.",
        "source": "Exodus 7:20–21, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus"
      },
      {
        "category": "literary",
        "title": "The plague on Thebes and the hidden pollution within the walls (Sophocles, Oedipus)",
        "excerpt": "She wasteth in the fruitless buds of earth,\nIn parched herds and travail without birth\nOf dying women: yea, and midst of it\nA burning and a loathly god hath lit\nSudden, and sweeps our land, this Plague of power;\nTill Cadmus' house grows empty, hour by hour,\nAnd Hell's house rich with steam of tears and blood.",
        "source": "Sophocles, Oedipus, King of Thebes, the Priest’s appeal to Oedipus, trans. Gilbert Murray (George Allen & Sons, 1911).",
        "href": "https://www.gutenberg.org/cache/epub/27673/pg27673.txt"
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, The Plague of Ashdod (1630–1631)",
        "excerpt": "Poussin stages an entire city collapsing under an invisible affliction: bodies sprawl across the plaza, a mother lies dead as her infant still reaches for her, and citizens recoil with cloths pressed to their faces against the contagion in the air. In the shadowed temple behind them the toppled idol of Dagon signals a punishment that has entered the community unseen and struck at everyone at once. The painting turns the sabotage of a population’s wellbeing into a single tableau of dread — an enemy that cannot be fought hand to hand, only suffered.",
        "source": "Nicolas Poussin, La Peste d’Asdod (The Plague of Ashdod), 1630–1631, oil on canvas, Musée du Louvre, Paris (INV 7276).",
        "href": "https://commons.wikimedia.org/wiki/File:La_Peste_d%27Asdod_-_1630-1631_-_Nicolas_Poussin_-_Louvre_-_INV_7276_;_MR_2312.jpg",
        "image": {
          "src": "/covers/us-water-utilities-cyberattack-iran--a4.png",
          "alt": "Baroque painting of a stricken city square strewn with the dead and dying; survivors cover their faces as a fallen idol lies in a temple behind them.",
          "credit": "Nicolas Poussin, The Plague of Ashdod (1630–1631), Musée du Louvre; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, Aqueduct in Ruins (18th century)",
        "excerpt": "Robert paints a colossal Roman aqueduct broken open and overrun, its once life-giving arches now silent, dwarfing the small figures who wander among the rubble. The grandeur of the engineering only sharpens the pathos of its failure: the artery that carried a city’s water has been severed, and what remains is monument rather than lifeline. It is a meditation on how the vast, taken-for-granted systems that sustain civilization can be reduced to picturesque ruin.",
        "source": "Hubert Robert (French, 1733–1808), Aqueduct in Ruins, 18th century, oil on canvas (overdoor), The Metropolitan Museum of Art, New York.",
        "href": "https://commons.wikimedia.org/wiki/File:Aqueduct_in_Ruins_MET_DP230529.jpg",
        "image": {
          "src": "/covers/us-water-utilities-cyberattack-iran--a5.png",
          "alt": "Painting of a monumental ruined Roman aqueduct with broken arches, small figures moving among the overgrown stones beneath a wide sky.",
          "credit": "Hubert Robert, Aqueduct in Ruins (18th c.), The Metropolitan Museum of Art (CC0); via Wikimedia Commons."
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "new-zealand-north-island-earthquake",
    "headline": "A magnitude 5.9 earthquake strikes off the east coast of New Zealand's North Island, seismologists say",
    "overview": "A magnitude 5.9 earthquake struck off the east coast of New Zealand's North Island, the German Research Centre for Geosciences (GFZ) reported, shaking coastal communities. There were no immediate reports of serious damage or a tsunami warning. New Zealand sits on the boundary of the Pacific and Australian tectonic plates along the seismically active Ring of Fire.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxPbWdaQkJhWGNkUHZsUkZqQXAyLWJ1MGs1XzJCTlVuUFVrald2bzBLdnU4TnNHVjFIYXNmOTJJNVVrVFR2QmVDZjJJU0x2b0NiOF9iLVViQjk2VkViT0lmZ0Fpd1R4T1NiLTdWQ1JKemFTNmhaM2lxQ0FaV2NvdW1RbHJYMkZQZElYN29kcWNxd09rUzRVRHMxS05SbzVFal9TNUgzS1hka2xLcmFMbUFHNVc3eWppcUJBTElvbjRsNHpfU2VGcEJLczNn?oc=5"
      },
      {
        "name": "Anadolu Agency",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxOSlpBT0tqNUpaZHB3Mm90dzZ1aWdhQmdTNG5lSjJ2LVpiLW0xR0VBcVhfb0h2UFc2QVZidFBqU0hLSklVdDhUR2NfczdHQ0NZQmkzT1pTek83QklvLUJvMEc4SElvSlo5SkVwWl9qYkFkUXByZVZoVEtXMFZBMHNlb1gxMDZjWC1rRXRTVS05aVY4VGRzMF9UVDN1NzZpQ09jQVpWbE5nWmRhMVdsZnp5andsa2ZqTDQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/new-zealand-north-island-earthquake.png",
      "alt": "A seismograph drum recording with dense, jagged ink traces marking the arrival of seismic waves.",
      "credit": "Seismogram recorded at Weston Observatory. Photo by Z22, CC BY-SA 3.0, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Younger watches the earth convulse at Misenum (AD 79)",
        "excerpt": "The chariots, which we had ordered to be drawn out, were so agitated backwards and forwards, though upon the most level ground, that we could not keep them steady, even by supporting them with large stones. The sea seemed to roll back upon itself, and to be driven from its banks by the convulsive motion of the earth; it is certain at least the shore was considerably enlarged, and several sea animals were left upon it.",
        "source": "Pliny the Younger, Letters, Book VI, Letter 20 (to Tacitus), on the eruption of Vesuvius, AD 79; trans. William Melmoth, rev. F. C. T. Bosanquet.",
        "href": "https://www.gutenberg.org/cache/epub/2811/pg2811.txt"
      },
      {
        "category": "historical",
        "title": "An eyewitness feels the ground give way in Lisbon (1755)",
        "excerpt": "It was on the morning of this fatal day, between the hours of nine and ten, that I was set down in my apartment, just finishing a letter, when the papers and table I was writing on began to tremble with a gentle motion, which rather surprised me, as I could not perceive a breath of wind stirring. Whilst I was reflecting with myself what this could be owing to, but without having the least apprehension of the real cause, the whole house began to shake from the very foundation.",
        "source": "The Rev. Charles Davy, eyewitness letter on the Lisbon earthquake of 1 November 1755; reproduced in the Fordham Internet Modern History Sourcebook.",
        "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp"
      },
      {
        "category": "literary",
        "title": "Voltaire denies that the ruined earth is 'all for the best' (1756)",
        "excerpt": "Unhappy mortals! Dark and mourning earth!\nAffrighted gathering of human kind!\nEternal lingering of useless pain!\nCome, ye philosophers, who cry, “All’s well,”\nAnd contemplate this ruin of a world.\nBehold these shreds and cinders of your race,\nThis child and mother heaped in common wreck,\nThese scattered limbs beneath the marble shafts—\nA hundred thousand whom the earth devours.",
        "source": "Voltaire, “Poem on the Lisbon Disaster; or an Examination of the Axiom, ‘All is Well’” (1756), in Toleration and Other Essays, trans. Joseph McCabe (1912).",
        "href": "https://www.gutenberg.org/cache/epub/64858/pg64858.txt"
      },
      {
        "category": "literary",
        "title": "The earth quakes at the moment of the Crucifixion (Gospel of Matthew)",
        "excerpt": "And, behold, the veil of the temple was rent in twain from the top to the bottom; and the earth did quake, and the rocks rent; And the graves were opened; and many bodies of the saints which slept arose. Now when the centurion, and they that were with him, watching Jesus, saw the earthquake, and those things that were done, they feared greatly, saying, Truly this was the Son of God.",
        "source": "The Gospel According to St. Matthew 27:51–54, King James Version.",
        "href": "https://www.ccel.org/ccel/bible/kjv.Matt.27.html"
      },
      {
        "category": "artistic",
        "title": "The 1755 copperplate of Lisbon in ruins",
        "excerpt": "A contemporary copper engraving depicts Lisbon at the instant of catastrophe: churches and houses splitting and toppling, fires breaking out across the skyline, ships flung and capsized as the Tagus surges over the quay, and tiny figures fleeing or crushed in the streets. The image fixed the disaster in the European imagination as the emblem of humanity's helplessness before the moving earth.",
        "source": "Anonymous copper engraving, “The 1755 Lisbon earthquake” (1755), showing the earthquake, fire, and tsunami. Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:1755_Lisbon_earthquake.jpg",
        "image": {
          "src": "/covers/new-zealand-north-island-earthquake--a4.png",
          "alt": "1755 copperplate engraving of Lisbon in ruins, with collapsing buildings, fires, and ships tossed by a tsunami as crowds flee.",
          "credit": "“The 1755 Lisbon earthquake,” anonymous copper engraving, 1755. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The god pins the earthquake catfish (namazu-e, 1855)",
        "excerpt": "In this Japanese woodblock print made just after the great Ansei Edo earthquake of 1855, the thunder deity Takemikazuchi pins down Namazu, the giant subterranean catfish, with the sacred kaname-ishi (foundation stone). Folk belief held that when the god's guard slipped, the writhing catfish shook the land — a vivid pre-scientific explanation for why the ground suddenly gives way.",
        "source": "Namazu-e (catfish print): Takemikazuchi pinning Namazu with the kaname-ishi keystone, Japan, 1855. Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Takemikazuchi-pins-Namazu-with-Kaname-ishi-spirit-stone-1855.png",
        "image": {
          "src": "/covers/new-zealand-north-island-earthquake--a5.png",
          "alt": "1855 Japanese woodblock print showing the deity Takemikazuchi pressing a keystone onto a giant catfish blamed for causing earthquakes.",
          "credit": "Namazu-e woodblock print, Takemikazuchi pinning the catfish Namazu with the kaname-ishi, 1855. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "vincent-pastore-sopranos-dies",
    "headline": "Vincent Pastore, who played Salvatore 'Big Pussy' Bonpensiero on The Sopranos, dies at 80",
    "overview": "Vincent Pastore, the American actor best known as Salvatore 'Big Pussy' Bonpensiero, Tony Soprano's friend turned FBI informant on HBO's The Sopranos, has died at 80, his manager and US outlets said. He was found at his home in the Bronx, with no indication of foul play. Born in the Bronx in 1946, Pastore served in the US Navy during the Vietnam War and appeared in films including Goodfellas and Carlito's Way.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxNRjdHZzA2RVEzM205b2pGVndobXEtQmotZ3NDS1Q3WGxPQTFxbHpPdXRRMTFGejJpaHZfVkdZVEFNNDY2NDVSQWFyRWx1LW5lNzgxXzdoeHdiWU0xZ3Q0aVFFbTBMZUVLMVpjbTNacDNsaUFFV0hqbUtKaklkaFVUVFZndzRxMXMz?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cm2gz0epljgo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/vincent-pastore-sopranos-dies.png",
      "alt": "Ancient Roman mosaic showing two theatrical masks, one of Tragedy and one of Comedy, set against a dark ground",
      "credit": "Roman mosaic of the masks of Tragedy and Comedy, 2nd century AD, from the Thermae Decianae, Capitoline Museums, Rome. Photo by Carole Raddato; public domain, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Johnson mourns Garrick: the death that eclipsed the gaiety of nations",
        "excerpt": "I am disappointed by that stroke of death, which has eclipsed the gaiety of nations, and impoverished the publick stock of harmless pleasure.",
        "source": "Samuel Johnson, \"Life of Edmund Smith,\" in The Lives of the Poets, Volume 1 (1779-1781).",
        "href": "https://www.gutenberg.org/cache/epub/9823/pg9823.txt"
      },
      {
        "category": "historical",
        "title": "The kiss of Judas: the informer's sign, an ancient archetype of betrayal",
        "excerpt": "Now he that betrayed him gave them a sign, saying, Whomsoever I shall kiss, that same is he: hold him fast.",
        "source": "The Gospel According to St. Matthew 26:48, King James Version (1611).",
        "href": "https://ccel.org/ccel/bible/kjv.Matt.26.html"
      },
      {
        "category": "literary",
        "title": "All the world's a stage: the player and his many parts",
        "excerpt": "All the world's a stage,\nAnd all the men and women merely players:\nThey have their exits and their entrances;\nAnd one man in his time plays many parts,\nHis acts being seven ages.",
        "source": "William Shakespeare, As You Like It, Act II, Scene vii (Jaques).",
        "href": "https://shakespeare.mit.edu/asyoulikeit/full.html"
      },
      {
        "category": "literary",
        "title": "A poor player that struts and frets his hour upon the stage",
        "excerpt": "Life's but a walking shadow; a poor player,\nThat struts and frets his hour upon the stage,\nAnd then is heard no more: it is a tale\nTold by an idiot, full of sound and fury,\nSignifying nothing.",
        "source": "William Shakespeare, Macbeth, Act V, Scene v (Macbeth).",
        "href": "https://www.gutenberg.org/cache/epub/1533/pg1533.txt"
      },
      {
        "category": "artistic",
        "title": "Watteau's Pierrot: the melancholy player, the mask and the man",
        "excerpt": "Antoine Watteau's life-size Pierrot (long called Gilles) stands frontally in a loose white satin costume, arms hanging, isolated above a crowd of smaller commedia dell'arte figures. The clown gazes out with a solemn, vacant stillness, as if the performance has ended and only the man beneath the costume remains. It is one of art's great images of the actor stranded between his role and himself.",
        "source": "Antoine Watteau, Pierrot (formerly known as Gilles), c. 1718-1719, oil on canvas, Musee du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Antoine_Watteau_-_Pierrot,_dit_autrefois_Gilles.jpg",
        "image": {
          "src": "/covers/vincent-pastore-sopranos-dies--a4.png",
          "alt": "Full-length painting of a clown in a loose white satin costume standing frontally, arms at his sides, with a still, melancholy expression",
          "credit": "Antoine Watteau, Pierrot (formerly Gilles), c. 1718-1719, Musee du Louvre. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Mozart's Requiem: rest for the dead, an elegy left unfinished",
        "excerpt": "Requiem aeternam dona eis, Domine: et lux perpetua luceat eis. (Grant them eternal rest, O Lord: and let perpetual light shine upon them.) Mozart set these words of the Latin Mass for the Dead in 1791 and died before completing the score, leaving his own requiem to be finished by another hand.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K. 626 (1791), opening Introit; text from the Latin Mass for the Dead.",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/vincent-pastore-sopranos-dies--a5.png",
          "alt": "A page from the manuscript of Mozart's Requiem, K. 626, showing the composer's handwritten heading and staves for the first movement",
          "credit": "Section of the manuscript of W. A. Mozart's Requiem, K. 626 (1791). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "peru-nazca-lines-tourist-plane-crash",
    "headline": "A tourist plane crashes over Peru's Nazca Lines, killing all 13 people on board",
    "overview": "A Cessna Caravan C-208 carrying sightseeing tourists crashed near Peru's Nazca Lines, the ancient UNESCO World Heritage geoglyphs, killing all 13 people aboard, Peruvian officials said. The dead included seven Italian, two German and two Spanish tourists and two pilots; the aircraft had taken off from Pisco and went down around midday in the Pueblo Viejo area. The cause was not immediately clear.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxQSnE5c2hGZjM2RjZHLWU5Z3lKclF4ZXUteFlvbk5CTE0wdGN4SlJVdkIyNVFNZXF3SjVyYmY3ZDFkRjMwVTBvUFE3THItbkN1RjF5NFV1UkF6MFhWSDBydFRiQXVxX2djcTBrcm1VTjRCcjJkUGs0VjB6RU12bG91Q2k2ZHZNY1dFUzJqZW9KT09QRVFQZXphSjdDNnJMTWQtRDBsSVR3RnlOSXFvbGg4UTBjU2Rua3Q5VkE?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c70g132erlko"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/peru-nazca-lines-tourist-plane-crash.png",
      "alt": "Aerial view of the hummingbird geoglyph etched into the Nazca desert, Peru, visible only from the sky",
      "credit": "Diego Delso, Wikimedia Commons, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The lost army of Cambyses vanishes in the desert (5th century BCE)",
        "excerpt": "It is said that the army reached this place, but from that point onwards, except the Ammonians themselves and those who have heard the account from them, no man is able to say anything about them; for they neither reached the Ammonians nor returned back. This however is added to the story by the Ammonians themselves:—they say that as the army was going from this Oasis through the sandy desert to attack them, and had got to a point about mid-way between them and the Oasis, while they were taking their morning meal a violent South Wind blew upon them, and bearing with it heaps of the desert sand it buried them under it, and so they disappeared and were seen no more.",
        "source": "Herodotus, The History, Book III (c. 430 BCE), trans. G. C. Macaulay.",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt"
      },
      {
        "category": "historical",
        "title": "The first fatal flight: Pilâtre de Rozier falls from the sky (1785)",
        "excerpt": "M. Pilatre de Rosier, accompanied by M. Romain, determined on crossing the Channel from the French side; and, thinking to add to their buoyancy and avoid the risk of falling in the sea, hit on the extraordinary idea of using a fire balloon beneath another filled with hydrogen gas! With this deadly compound machine they actually ascended from Boulogne, and had not left the land when the inevitable catastrophe took place. The balloons caught fire and blew up at a height of 3,000 feet, while the unfortunate voyagers were dashed to atoms.",
        "source": "John M. Bacon, The Dominion of the Air: The Story of Aerial Navigation (London, 1902), ch. II.",
        "href": "https://www.gutenberg.org/files/861/861-h/861-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid: Icarus tumbles from the sky when the sun melts his wings",
        "excerpt": "When now the boy, whose childish thoughts aspire\nTo loftier aims, and make him ramble high'r,\nGrown wild, and wanton, more embolden'd flies\nFar from his guide, and soars among the skies.\nThe soft'ning wax, that felt a nearer sun,\nDissolv'd apace, and soon began to run.\nThe youth in vain his melting pinions shakes,\nHis feathers gone, no longer air he takes:\nOh! Father, father, as he strove to cry,\nDown to the sea he tumbled from on high,\nAnd found his Fate; yet still subsists by fame,\nAmong those waters that retain his name.",
        "source": "Ovid, Metamorphoses, Book VIII (8 CE), trans. Sir Samuel Garth, John Dryden, et al. (1717).",
        "href": "https://classics.mit.edu/Ovid/metam.8.eighth.html"
      },
      {
        "category": "literary",
        "title": "Milton: a maker of towers is hurled down from heaven, falling all day long",
        "excerpt": "Nor was his name unheard or unadored\nIn ancient Greece; and in Ausonian land\nMen called him Mulciber; and how he fell\nFrom Heaven they fabled, thrown by angry Jove\nSheer o'er the crystal battlements: from morn\nTo noon he fell, from noon to dewy eve,\nA summer's day, and with the setting sun\nDropt from the zenith, like a falling star,\nOn Lemnos, th' Aegaean isle.",
        "source": "John Milton, Paradise Lost, Book I, lines 738–746 (1667).",
        "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt"
      },
      {
        "category": "artistic",
        "title": "Bruegel: the world goes on while Icarus drowns unnoticed",
        "excerpt": "In this famous Netherlandish panel, a vast luminous seascape spreads beneath a serene sky while a ploughman, a shepherd and a fisherman go about their work. Only on close looking does the eye find Icarus: two pale legs and a splash in the lower right corner, the fallen flyer already swallowed by the sea as the indifferent world sails on. The painting turns catastrophe into a small event glimpsed from a great, panoramic distance—much as the Nazca desert reveals its meaning only when seen whole from above.",
        "source": "After Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1555–1560, oil on canvas, Royal Museums of Fine Arts of Belgium, Brussels.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/peru-nazca-lines-tourist-plane-crash--a4.png",
          "alt": "A wide coastal landscape with a ploughman in the foreground; in the lower right, only the legs of the drowning Icarus break the water",
          "credit": "After Pieter Bruegel the Elder, Landscape with the Fall of Icarus (c. 1555–1560), Royal Museums of Fine Arts of Belgium; via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Draper: mourners gather over the broken body of the fallen flyer",
        "excerpt": "Herbert James Draper's late-Victorian canvas shows Icarus fallen at last upon a rocky shore, his great feathered wings still strapped to his back and now useless, his bronzed body limp. Three grieving sea-nymphs cradle and lament him as the sun that killed him blazes low on the horizon. The picture dwells on the aftermath of flight—the beautiful ambition of rising into the sky answered by stillness, gravity and grief.",
        "source": "Herbert James Draper, The Lament for Icarus, 1898, oil on canvas, Tate, London.",
        "href": "https://commons.wikimedia.org/wiki/File:Herbert_Draper_-_The_Lament_for_Icarus_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/peru-nazca-lines-tourist-plane-crash--a5.png",
          "alt": "The dead Icarus with large feathered wings lies against a rock while three sea-nymphs mourn over his body at sunset",
          "credit": "Herbert James Draper, The Lament for Icarus (1898), Tate; via Wikimedia Commons (Google Art Project), public domain."
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "capital-one-closes-trump-organization-accounts",
    "headline": "Capital One says it closed the Trump Organization's accounts after an anti-money-laundering review",
    "overview": "Capital One said it closed the Trump Organization's bank accounts following an internal anti-money-laundering review, according to a court filing, disclosed as it defends against a lawsuit brought by the company. The Trump Organization had accused the bank of 'de-banking' it for political reasons after the January 6 Capitol riot. Capital One said the closures followed its standard risk and compliance processes.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxORFNsQWFYNkk3UUhkdm5yRmpmNmZnTjVLS1RrSGdTcGZxTVhOaHVURzlhQTJUd3BYSzlYa3dNcnRXb1Y5VEZuSE1HdjA0bXNjNkM3Y2hHOHptN2I3N2FsQWxsLXFhNVZ2ZDROUkJFaXFLYVNjd0FmcUNqRlNYbkN0SUhfVURTQzdZbzRvaXkyRFVCTGZMTkJMa0Q3SlVHeW0zaGtvY1VidWRETENLWERtSUJUeHdlMmFzemp4bXhTV1BySTQ?oc=5"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQdjJVOG1mVnpGTnJEUlp2UHJvakFoMko0N3BzTU0xZXE5XzF3eEE1YlA0ZEF5eVBWbExvN0lTMlhCMEp5RGpVQUFKWTFNa1dZUXRQdjM5SjNadTgyU2tkV0lBWnRzdHJfZ1M1Mzk3eDBpSGNXMDlDM2FmOEFkNk9Db0lwdUhiY1dETmVzWkhKaF9ZZTRQeGxmNEtiOA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/capital-one-closes-trump-organization-accounts.png",
      "alt": "The massive steel door of a bank vault, its bolts and gears exposed, standing shut on a strongroom.",
      "credit": "Photo by Santoman, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rome's credit crisis of A.D. 33: the moneylenders called to account",
        "excerpt": "Meanwhile a powerful host of accusers fell with sudden fury on the class which systematically increased its wealth by usury in defiance of a law passed by Caesar the Dictator defining the terms of lending money and of holding estates in Italy, a law long obsolete because the public good is sacrificed to private interest. The curse of usury was indeed of old standing in Rome and a most frequent cause of sedition and discord, and it was therefore repressed even in the early days of a less corrupt morality.",
        "source": "Tacitus, The Annals, Book VI (c. A.D. 116), trans. Alfred John Church and William Jackson Brodribb.",
        "href": "https://classics.mit.edu/Tacitus/annals.6.vi.html"
      },
      {
        "category": "historical",
        "title": "John Law's bank falls: the master of credit undone (1720)",
        "excerpt": "He was thoroughly acquainted with the philosophy and true principles of credit. He understood the monetary question better than any man of his day; and if his system fell with a crash so tremendous, it was not so much his fault as that of the people amongst whom he had erected it.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. I, \"The Mississippi Scheme\" (London, 1841).",
        "href": "https://www.gutenberg.org/cache/epub/24518/pg24518.txt"
      },
      {
        "category": "literary",
        "title": "The cleansing of the temple: the money-changers cast out",
        "excerpt": "And found in the temple those that sold oxen and sheep and doves, and the changers of money sitting: And when he had made a scourge of small cords, he drove them all out of the temple, and the sheep, and the oxen; and poured out the changers' money, and overthrew the tables; And said unto them that sold doves, Take these things hence; make not my Father's house an house of merchandise.",
        "source": "The Gospel According to St. John 2:14-16, King James Version (1611).",
        "href": "https://www.ccel.org/ccel/bible/kjv.John.2.html"
      },
      {
        "category": "literary",
        "title": "Shylock on usury: the lender scorned, then needed",
        "excerpt": "Signior Antonio, many a time and oft\nIn the Rialto you have rated me\nAbout my moneys and my usances.\nStill have I borne it with a patient shrug,\n(For suff'rance is the badge of all our tribe.)\nYou call me misbeliever, cut-throat dog,\nAnd spet upon my Jewish gaberdine,\nAnd all for use of that which is mine own.",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 3 (c. 1596-99).",
        "href": "https://www.gutenberg.org/files/1515/1515-0.txt"
      },
      {
        "category": "artistic",
        "title": "Matsys, The Moneylender and His Wife (1514)",
        "excerpt": "In Quentin Matsys's panel, a moneylender bends over his scales, weighing gold coins and pearls with the concentration of a priest at an altar, while his wife pauses over an illuminated prayer book, her eyes drifting from the Virgin's page to the glinting metal. A small convex mirror on the table catches a window, a red-hatted figure, and a distant church steeple, so that the sacred and the mercantile share one crowded surface. The picture holds, without resolving, the old question the news revives: when does the counting of money become a moral reckoning?",
        "source": "Quentin Matsys (Massys), The Moneylender and His Wife, 1514, oil on panel, Musee du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/capital-one-closes-trump-organization-accounts--a4.png",
          "alt": "A moneylender weighs gold coins on a small balance while his wife, turning from a prayer book, watches the scales.",
          "credit": "Quentin Matsys, The Moneylender and His Wife (1514), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "El Greco, Christ Driving the Traders from the Temple",
        "excerpt": "El Greco returned again and again to this subject, and here a whip-raising Christ in flaming rose-red erupts at the center of a marble portico, his twisting arm scattering a knot of traders and money-changers who recoil, stumble, and shield themselves in a tumble of muscular limbs. To the right, apostles look on calmly, so that the canvas splits into the cast-out and the kept, judgment enacted in a single gesture. The violence of the expulsion, staged as a cleansing rather than a cruelty, is exactly the frame each side now claims in a fight over who is being driven from the marketplace.",
        "source": "El Greco (Domenikos Theotokopoulos), Christ Driving the Traders from the Temple (The Purification of the Temple), c. 1600, oil on canvas.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Greco_016.jpg",
        "image": {
          "src": "/covers/capital-one-closes-trump-organization-accounts--a5.png",
          "alt": "A red-robed Christ raises a whip at the center of a temple, scattering money-changers and traders who recoil in alarm.",
          "credit": "El Greco, Christ Driving the Traders from the Temple, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "hungary-post-orban-political-era",
    "headline": "Hungary's business and political elite recalibrate as a new post-Orban era takes hold",
    "overview": "Hungary's companies and power brokers are adjusting to a new political era as Viktor Orban's long dominance gives way, with a change of government reshaping the ties between business and the state, Reuters reported. Firms that thrived under Orban's system are hedging their bets as lawmakers move to unwind parts of his political machinery. The transition is testing whether Hungary can loosen the grip of state-linked capitalism built over more than a decade.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxQRm5DNHdPUDhzLXBHNEhFTVFnTVQyN3RGNXVvSWFpWVVTZEE2X0V6cTNmQi1iV2RxWTZqdnJGR1RSZ0pZNnk1UEV1Y1AtM19pYXJWUzBwM09ucEU5OElmVnV4OW4wWXdNNWh4QVpTelZZbTdVVjZyYjdXNEpZRzJDckV6cGJoNUxoQU5JU2NfVnZ3MWNsVDFVcGZiZ25WVnFEdmVFZUV5enNDdlF3Q1hzTDl3RVpwZw?oc=5"
      },
      {
        "name": "The Economic Times",
        "href": "https://news.google.com/rss/articles/CBMi7AFBVV95cUxNY3MzTWs5cENaUHBJVTF1T1RZbC1qSUx3bkxEMHVqX20yYmFxbk50TjE3a2NOazRtVlk2dUZRSkZsd081WWtjUmhVN1lHbjJUeF9hS3hOcVdRSjF4b3doYTBWajh4aElDek13eFo1aTd5NUwtQkJjaFdwRTNTcnlTOG9iSVdKdDhQV05mbUlNV3E4SVgtQjV2by1TZTA3TUZNcW16LTMydjRmMW5JZzdMWmtVb1dTUkxmSVZqczN2eklneE40WmpOVS1hNW1VLWg1RldPNzB0OFdCMGQ2OHhJV0RxU09kazNsUXFPUg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-08-02",
    "image": {
      "src": "/covers/hungary-post-orban-political-era.png",
      "alt": "The Hungarian Parliament Building illuminated at night, reflected in the Danube in Budapest",
      "credit": "Florian Fèvre (User:Billy69150), via Wikimedia Commons, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 2 August 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The fall of Sejanus, Rome, AD 31",
        "excerpt": "They hurled down, beat down, and dragged down all his images, as though they were thereby treating the man himself with contumely, and he thus became a spectator of what he was destined to suffer. For the moment, it is true, he was merely cast into prison.",
        "source": "Cassius Dio, Roman History, Book LVIII.11 (Loeb Classical Library translation by Earnest Cary, 1924), on the sudden ruin of Lucius Aelius Sejanus, all-powerful favourite of the emperor Tiberius.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/58*.html"
      },
      {
        "category": "historical",
        "title": "Cardinal Wolsey's fall from favour, England, 1530",
        "excerpt": "\"Well, well, Master Kingston,\" quoth he, \"I see the matter against me how it is framed; but if I had served God as diligently as I have done the king, he would not have given me over in my grey hairs. Howbeit this is the just reward that I must receive for my worldly diligence and pains that I have had to do him service.\"",
        "source": "George Cavendish, The Life of Cardinal Wolsey (written c. 1557), recording the dying words of Thomas Wolsey, Henry VIII's Lord Chancellor, after his disgrace. Project Gutenberg eBook 54043.",
        "href": "https://www.gutenberg.org/cache/epub/54043/pg54043.txt"
      },
      {
        "category": "literary",
        "title": "Fortune addresses her victim, Boethius, c. 524",
        "excerpt": "This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it.",
        "source": "Boethius, The Consolation of Philosophy, Book II, Prose 2 (H. R. James translation, 1897), Fortune speaking in her own defence. Project Gutenberg eBook 14328.",
        "href": "https://www.gutenberg.org/files/14328/14328-h/14328-h.htm"
      },
      {
        "category": "literary",
        "title": "Ozymandias, Percy Bysshe Shelley, 1818",
        "excerpt": "And on the pedestal these words appear:\n\"My name is Ozymandias, King of Kings.\"\nLook on my works ye Mighty, and despair!\nNo thing beside remains. Round the decay\nOf that Colossal Wreck, boundless and bare,\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" first published in The Examiner (London), 11 January 1818, under the pseudonym Glirastes.",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "The Wheel of Fortune, from Boccaccio's De Casibus",
        "excerpt": "A French illuminated miniature shows the goddess Fortune turning her great wheel while crowned kings cling to its rim: one rides triumphant at the summit, another is flung headlong to the ground as it revolves. It illustrates Boccaccio's De Casibus Virorum Illustrium (On the Fates of Famous Men), the medieval catalogue of the powerful brought low, painted in France around 1450-75.",
        "source": "Wheel of Fortune miniature from a 15th-century French illuminated manuscript of Giovanni Boccaccio's De Casibus Virorum Illustrium, translated by Laurent de Premierfait, c. 1450-75.",
        "href": "https://commons.wikimedia.org/wiki/File:Boccaccio,_de_casibus...,_tradotto_in_francese_da_laurent_de_premierfait,_edizione_miniata_in_francia_nel_1450-75_ca._02_ruota_della_fortuna.jpg",
        "image": {
          "src": "/covers/hungary-post-orban-political-era--a4.png",
          "alt": "Medieval illumination of the goddess Fortune turning a wheel to which crowned kings cling, one rising and one falling",
          "credit": "Wheel of Fortune, illuminated manuscript of Boccaccio's De Casibus Virorum Illustrium, France c. 1450-75, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Romans of the Decadence, Thomas Couture, 1847",
        "excerpt": "Thomas Couture's vast canvas stages the exhaustion of empire: revellers sprawl among marble columns after a night of dissipation, hollow-eyed and spent, while austere statues of the old republican virtues look down in reproach. Exhibited to acclaim in 1847, it was read at once as a verdict on a ruling order that had outlived its vigour and was drifting toward collapse.",
        "source": "Thomas Couture, Les Romains de la décadence (Romans of the Decadence), oil on canvas, 1847, Musée d'Orsay, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Couture_-_Les_Romains_de_la_d%C3%A9cadence.jpg",
        "image": {
          "src": "/covers/hungary-post-orban-political-era--a5.png",
          "alt": "Large 19th-century painting of Romans reclining and carousing amid classical columns after a night of excess, watched by stern ancestral statues",
          "credit": "Thomas Couture, Les Romains de la décadence (1847), Musée d'Orsay, via Wikimedia Commons (public domain)"
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
