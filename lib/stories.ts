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
    "slug": "iran-jordan-attack-us-troops-killed",
    "headline": "Two U.S. troops are killed and one is missing after an Iranian missile and drone attack on forces in Jordan",
    "overview": "U.S. Central Command said two American service members were killed and one remains missing after Iranian ballistic missile and drone attacks on U.S. and partner forces in Jordan, with four others wounded and later discharged. The deaths raise the U.S. toll in the war with Iran to 16 as a preliminary ceasefire has collapsed, Washington has reimposed a blockade of Iranian ports, and Tehran has declared the Strait of Hormuz closed. Iran's supreme leader, Mojtaba Khamenei, said the U.S. president's signature was 'worthless' and warned of further escalation.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQbS1jN0tZcUtrbk9GU3RKeUxqTHM1Qk5DUDF1VDBVOUVqaVp4QV8xWGhEMmtFV3JRRDc1SXlxalZwcElvUlBXQk13R1NPdW91eUFNRF9UT3JRM3ZHTC03a2ZaZmg0Z2tJdXdCRjVMUml0eWtTSWFLU2U5WGxIMHBNSG1hb2dTS3VLak0zVXdZdHhKY1duRml2MW9Ea0xxVlU?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn8nynv8ze8o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/iran-jordan-attack-us-troops-killed.png",
      "alt": "A Patriot air-defense missile streaks skyward from its launcher during a live firing.",
      "credit": "U.S. Department of Defense. Public domain, via Wikimedia Commons."
    },
    "lead": true,
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 53 BC the Roman commander Crassus led some 40,000 legionaries deep into Mesopotamia against the Parthian Empire, the Iranian power of antiquity. On the parched plain of Carrhae, Parthian horse-archers wheeled out of range and buried the massed Romans under an unending rain of arrows; when Crassus sent his son Publius to break the encirclement, Publius was cut off and killed, and the enemy paraded his severed head on a spear before his father's eyes. Perhaps twenty thousand Romans died in the dust, bewailing an inglorious death, and the disaster opened centuries of ruinous war between Rome and the East. Like the American service members killed in Jordan by Iranian missiles and drones, Carrhae is the archetype of soldiers dying on distant eastern soil under the projectile weapons of an Iranian power, an outpost catastrophe that dragged two nations into open and lasting war.",
        "excerpt": "But here, where the inequality of the ground raised one man above another, and lifted every man who was behind another into greater prominence, there was no such thing as escape, but they were all alike hit with arrows, bewailing their inglorious and ineffectual death. ... Then the Parthians cut off the head of Publius, and rode off at once to attack Crassus.",
        "source": "Plutarch, Life of Crassus 25, trans. Bernadotte Perrin (Loeb Classical Library, 1916); on the Perseus Digital Library.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0038:chapter=25",
        "image": {
          "src": "/covers/iran-jordan-attack-us-troops-killed--a0.png",
          "alt": "Engraving of the death of Crassus amid falling Roman soldiers at the Battle of Carrhae.",
          "credit": "Death of Crassus at the Battle of Carrhae, engraving from Cassell's Illustrated Universal History, vol. 3, 1882. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On the morning of October 23, 1983, a truck laden with explosives equivalent to some 12,000 pounds of TNT drove into the U.S. Marine barracks at Beirut International Airport and detonated, lifting the four-story building off its foundations before it collapsed on the men sleeping inside. Two hundred forty-one American service members were killed, the Marine Corps' deadliest single day since Iwo Jima. Investigators tied the bombing to Iran-backed operatives, and a U.S. intelligence intercept captured Iranian officials directing their embassy in Damascus to take 'spectacular action against the American Marines' days before the blast. Like the troops killed in Jordan, these were Americans deployed to a far-off Middle Eastern mission and struck down by Iran-linked violence, a nation once again grieving soldiers who fell in an undeclared shadow war.",
        "excerpt": "On October 23, 1983, a truck bomb destroyed the U.S. Marine barracks in Beirut, killing 241 American service members. A federal court later found Iran's Ministry of Information and Security and its proxies responsible, and a September 1983 intercept showed Iranian intelligence directing 'spectacular action against the American Marines.' It remained the deadliest day for the Marine Corps since the Battle of Iwo Jima.",
        "source": "1983 Beirut barracks bombings (U.S. Marine Corps and federal court records, summarized).",
        "href": "https://en.wikipedia.org/wiki/1983_Beirut_barracks_bombings",
        "image": {
          "src": "/covers/iran-jordan-attack-us-troops-killed--a1.png",
          "alt": "Column of smoke rising over Beirut after the explosion that destroyed the U.S. Marine barracks, October 23, 1983.",
          "credit": "U.S. Marine Corps photograph of the Beirut barracks explosion, October 23, 1983. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In the fourth book of the Iliad, Homer pauses the clamor of the whole army to mark a single death: young Simoisius, born by the river Simois, struck down by the great spear of Ajax as he strode among the front rank. Homer likens the falling youth to a smooth poplar felled in a marsh, and grieves that he never lived to repay his parents for the care of his rearing, his life cut brief. The passage is the epic's tenderness toward the individual soldier lost in a mass of anonymous slaughter. It rhymes exactly with the American dead in Jordan: young lives cut short far from home, struck down among their comrades, unable ever to return to the families who raised them.",
        "excerpt": "Then Telamonian Aias smote Anthemion's son, the lusty youth Simoeisius, whom on a time his mother had born beside the banks of Simois, as she journeyed down from Ida, whither she had followed with her parents to see their flocks. For this cause they called him Simoeisius; yet paid he not back to his dear parents the recompense of his upbringing, and but brief was the span of his life, for that he was laid low by the spear of great-souled Aias. For, as he strode amid the foremost, he was smitten on the right breast beside the nipple; and clean through his shoulder went the spear of bronze, and he fell to the ground in the dust like a poplar tree.",
        "source": "Homer, Iliad, Book 4, trans. A. T. Murray (Loeb Classical Library, 1924); on the Perseus Digital Library.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=4:card=473"
      },
      {
        "category": "literary",
        "title": "Laurence Binyon wrote 'For the Fallen' in September 1914, weeks into the First World War, sitting on the Cornish cliffs as the first British casualty lists came home from the retreat at Mons. Its central stanzas became the Ode of Remembrance, recited every year at war memorials across the Commonwealth: the soldiers who went with songs to the battle and fell with their faces to the foe, who shall grow not old as the living grow old. Binyon fixes the paradox of the war dead, forever young, forever remembered at the going down of the sun. For the two Americans killed in Jordan and the sixteen now lost in the war with Iran, it is the language a nation reaches for when it must grieve the fallen and vow to remember them.",
        "excerpt": "They went with songs to the battle, they were young,\nStraight of limb, true of eye, steady and aglow.\nThey were staunch to the end against odds uncounted;\nThey fell with their faces to the foe.\n\nThey shall grow not old, as we that are left grow old,\nAge shall not weary them, nor the years condemn.\nAt the going down of the sun and in the morning\nWe will remember them.",
        "source": "Laurence Binyon, 'For the Fallen,' first published in The Times, 21 September 1914; text on Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Times/1914/Arts/For_the_Fallen"
      },
      {
        "category": "artistic",
        "title": "Benjamin West's 1770 painting The Death of General Wolfe shows the British commander James Wolfe expiring on the Plains of Abraham at Quebec, cradled in the arms of grieving officers as a runner sprints in with news of victory too late to reach him. West scandalized the academy by dressing his figures in contemporary uniforms rather than classical robes, insisting a modern soldier's death deserved the grandeur of history painting, and he composed the scene as a secular lamentation over a fallen leader, a pietà in a red coat. It became the defining image of the soldier who dies far from home in the moment of his country's triumph. Its hushed circle of mourners around the dying man mirrors the grief now gathering around American service members killed on distant ground in Jordan.",
        "excerpt": "West arranges a ring of soldiers, officers, and a Native scout around the pale, dying general, a composition consciously echoing a Lamentation over the dead Christ. The whole picture is built to make the viewer mourn a single fallen soldier as a figure of sacrifice, elevating a death on foreign soil into an object of national reverence.",
        "source": "Benjamin West, The Death of General Wolfe, 1770, oil on canvas; National Gallery of Canada, Ottawa.",
        "href": "https://commons.wikimedia.org/wiki/File:Benjamin_West_005.jpg",
        "image": {
          "src": "/covers/iran-jordan-attack-us-troops-killed--a4.png",
          "alt": "Painting of General Wolfe dying on the battlefield, surrounded by mourning officers and soldiers.",
          "credit": "Benjamin West, The Death of General Wolfe, 1770; National Gallery of Canada, Ottawa. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Maurice Ravel composed Le Tombeau de Couperin between 1914 and 1917 while the First World War consumed the friends of his youth, and he dedicated each of its six movements to the memory of a comrade killed at the front, from Lieutenant Jacques Charlot to the brothers Pierre and Pascal Gaudin killed by the same shell. Rather than write a dirge, Ravel cast the memorial as a bright baroque dance suite, and when a critic complained it was too gay for the dead he replied that the dead are sad enough in their eternal silence. The elegance of the music becomes its grief, each graceful movement a headstone bearing a fallen friend's name. It is a model of how art transmutes the loss of soldiers into remembrance, fitting for a moment when America counts its own war dead and searches for how to hold them.",
        "excerpt": "Le Tombeau de Couperin is a memorial in the guise of a dance suite: its Prelude, Fugue, Forlane, Rigaudon, Menuet, and Toccata are each inscribed to a friend of Ravel's who died in the First World War. The music's poised, luminous grace, rather than any funeral solemnity, carries the weight of mourning for the fallen.",
        "source": "Maurice Ravel, Le Tombeau de Couperin (1914-1917); score on IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Le_tombeau_de_Couperin_(Ravel,_Maurice)",
        "image": {
          "src": "/covers/iran-jordan-attack-us-troops-killed--a5.png",
          "alt": "Photographic portrait of the composer Maurice Ravel, circa 1925.",
          "credit": "Maurice Ravel, photographed c. 1925. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "hungary-president-sulyok-stands-down",
    "headline": "Hungary's president, Tamas Sulyok, agrees to step down after parliament forces a constitutional amendment",
    "overview": "Hungarian President Tamas Sulyok signed a constitutional amendment that ends his presidency at midnight on Sunday, bowing to a law that Prime Minister Peter Magyar's Tisza party pushed through parliament to oust him. Sulyok, widely seen as a loyalist of former prime minister Viktor Orban, accused the government of violating the rule of law and called the change a 'breaking point in Hungarian constitutional democracy.' Orban, whose party lost power in April after 16 years, denounced the amendment as an act of tyranny.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNRExvZWZaR0NUN0NMcHg1UTR0TnMwWC1aYlhTcW9XamNiSHVxU1JFa1pMMnc0cWkxNEdGVS1rU2F3Ui04YjFjUmtlaXEyTXdFVmtwYkZmbmdsdFJqSVg2TzNuZlJ2Nnc3cWtwenB0SGdTWlZfUWhIYlRTWTdEcV9QcjRVblBmT293YlZoZW5PdW5rczMwZVFROERVdVFkbmZWX2c?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cpd7q7eev7po"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/hungary-president-sulyok-stands-down.png",
      "alt": "The Hungarian Parliament Building on the bank of the Danube in Budapest.",
      "credit": "Ercsaba74 / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 509 BC, according to Livy, the Romans rose against their last king, Lucius Tarquinius Superbus. Roused by Lucius Junius Brutus, the assembled people voted to strip the king of his authority and pass an act of banishment against him; the city gates were shut in his face and the monarchy itself was abolished, replaced by two annually elected consuls. A single legal act ended a reign and remade the constitution of the state. Like Tamas Sulyok, a ruler tied to the old order was cast out not by the sword but by a formal vote of a new sovereign majority, which then rebuilt the offices of power in its own image.",
        "excerpt": "he persuaded the multitude, already incensed, to deprive the king of his authority, and to order the banishment of L. Tarquin with his wife and children... The gates were shut against Tarquin, and an act of banishment passed against him; the deliverer of the state the camp received with great joy, and the king's sons were expelled... Lucius Tarquin the Proud reigned twenty-five years: the regal form of government continued from the building of the city to this period of its deliverance, two hundred and forty-four years. Two consuls, viz. Lucius Junius Brutus and Lucius Tarquinius Collatinus, were elected by the prefect of the city at the comitia by centuries, according to the commentaries of Servius Tullius.",
        "source": "Livy, History of Rome, Book I.59-60 (trans. D. Spillan)",
        "href": "https://www.gutenberg.org/cache/epub/19725/pg19725.txt"
      },
      {
        "category": "historical",
        "title": "On August 9, 1974, facing near-certain impeachment by a Congress that had turned against him over Watergate, U.S. President Richard Nixon signed a one-sentence letter resigning the office he had won by landslide two years earlier. It was a peaceful but coerced departure: the legislature's power to remove had made his position untenable, and he left rather than be stripped of office by trial. The transfer of power was orderly, yet everyone understood it was compelled. As with Sulyok, a head of state surrendered his office to the constitutional machinery of a hostile majority, framing a legal removal as the price the rule of law exacted from him.",
        "excerpt": "Dear Mr. Secretary: I hereby resign the Office of President of the United States. Sincerely, Richard Nixon",
        "source": "Letter of Resignation of Richard M. Nixon, August 9, 1974 (U.S. National Archives)",
        "href": "https://www.archives.gov/exhibits/american_originals/nixon2.html",
        "image": {
          "src": "/covers/hungary-president-sulyok-stands-down--a1.png",
          "alt": "Nixon's typed one-sentence resignation letter with his signature, dated August 9, 1974",
          "credit": "Letter of Resignation of Richard M. Nixon, 1974. U.S. National Archives and Records Administration, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Richard II, the deposed king is brought before Parliament and made to hand his crown to Henry Bolingbroke. In the great deposition scene he performs his own unmaking line by line, giving away the weight from his head, the sceptre from his hand, and his decrees and statutes, until he is 'unking'd Richard.' The passage turns a raw seizure of power into a ritual of self-abdication, staged for a triumphant new regime. Sulyok's forced signing of the amendment that ended his own presidency echoes Richard's bitter, ceremonial surrender: a ruler compelled to undo himself with his own hand while calling the act a wound to the very order that anointed him.",
        "excerpt": "Now mark me how I will undo myself:\nI give this heavy weight from off my head,\nAnd this unwieldy sceptre from my hand,\nThe pride of kingly sway from out my heart;\nWith mine own tears I wash away my balm,\nWith mine own hands I give away my crown,\nWith mine own tongue deny my sacred state,\nWith mine own breath release all duteous rites:\nAll pomp and majesty I do forswear;\nMy manors, rents, revenues, I forgo;\nMy acts, decrees, and statutes I deny:\nGod pardon all oaths that are broke to me!\nGod keep all vows unbroke are made to thee!\nMake me, that nothing have, with nothing griev'd,\nAnd thou with all pleas'd, that hast all achiev'd!\nLong mayst thou live in Richard's seat to sit,\nAnd soon lie Richard in an earthy pit!\nGod save King Henry, unking'd Richard says,\nAnd send him many years of sunshine days!",
        "source": "William Shakespeare, Richard II, Act IV, Scene 1 (Yale edition, 1921)",
        "href": "https://en.wikisource.org/wiki/Richard_II_(1921)_Yale/Text/Act_IV"
      },
      {
        "category": "literary",
        "title": "In Boethius's sixth-century Consolation of Philosophy, written while its author awaited execution after falling from imperial favor, Fortune herself speaks in her own defense. She insists that raising the low and casting down the mighty is simply the game she never ceases to play, turning her wheel without apology, and points to toppled kings like Croesus and Perseus as proof that no throne is exempt. The overthrow of kingdoms, she says, is the very stuff of tragedy. Sulyok's abrupt fall from the presidency, on the heels of Orban's party losing power after sixteen years, is exactly this turning of the wheel: those who mounted high must not think it a hardship to come down when the rules of the game require it.",
        "excerpt": "This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it... What else do tragedies make such woeful outcry over save the overthrow of kingdoms by the indiscriminate strokes of Fortune?",
        "source": "Boethius, The Consolation of Philosophy, Book II (trans. H. R. James)",
        "href": "https://www.gutenberg.org/cache/epub/14328/pg14328.txt"
      },
      {
        "category": "artistic",
        "title": "Paul Delaroche's 1840 painting 'Napoleon I at Fontainebleau on 31 March 1814' shows the emperor slumped in a chair, boots muddy, hat fallen to the floor, staring into ruin at the moment his cause has collapsed. Within days the French Senate would formally decree his deposition and he would abdicate, the towering ruler undone not on a battlefield but by an act of the legislature and the desertion of his own establishment. Delaroche captures the private desolation behind a public fall from supreme power. The image mirrors Sulyok's position at the story's center: a figure of the old regime, isolated and stripped of office, contemplating the abrupt end of an era of dominance.",
        "excerpt": "Delaroche paints the deposed emperor alone in a bare room, his body sagging with exhaustion and defeat, the discarded hat and disordered dress signaling collapsed majesty. The face is inward and stricken, all command drained away. It is a portrait not of battle but of the silent instant when supreme power slips irrecoverably from a ruler's hands.",
        "source": "Paul Delaroche, Napoleon I at Fontainebleau on 31 March 1814 (1840), Musée de l'Armée, Paris",
        "href": "https://www.napoleon.org/en/history-of-the-two-empires/paintings/napoleon-i-at-fontainebleau-31-march-1814/",
        "image": {
          "src": "/covers/hungary-president-sulyok-stands-down--a4.png",
          "alt": "Napoleon sitting dejected in a chair at Fontainebleau, hat on the floor, after his defeat",
          "credit": "Paul Delaroche, Napoleon I at Fontainebleau on 31 March 1814 (1840), Musée de l'Armée, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Handel's 1739 oratorio 'Saul' dramatizes the ruin of Israel's first king, the anointed sovereign whom God rejects in favor of the young David. Consumed by jealousy as his rival's star rises, Saul clings to a throne that divine favor has already withdrawn, and the work builds toward his downfall and the solemn 'Dead March' over his corpse. It is a study of a legitimate ruler displaced when authority passes to the ascendant successor, the old order giving way to the new. Rembrandt's brooding painting of Saul and David captures the same jealous, doomed king; together they echo Sulyok's fate as a loyalist of a fallen power, pushed aside as a triumphant new leadership takes command.",
        "excerpt": "Handel's oratorio traces the reigning king's slide from glory into jealousy and collapse as favor shifts to his rival, culminating in the grave, tolling music of the 'Dead March' that mourns a fallen monarch. The score sets a ruler's downfall as high tragedy, the anointed head of state undone as power visibly transfers to his successor. Rembrandt's paired image renders the same brooding, displaced king wiping away a tear as the young harpist plays.",
        "source": "George Frideric Handel, Saul, HWV 53 (1739); image: Rembrandt, Saul and David (c. 1651-58), Mauritshuis",
        "href": "https://imslp.org/wiki/Saul,_HWV_53_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/hungary-president-sulyok-stands-down--a5.png",
          "alt": "Rembrandt's painting of a brooding King Saul wiping his eye with a curtain while David plays the harp",
          "credit": "Rembrandt van Rijn, Saul and David (c. 1651-58), Mauritshuis, The Hague, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "germany-spahn-surrogacy-resignation",
    "headline": "German coalition leader Jens Spahn resigns over his use of a U.S. surrogate to have a child",
    "overview": "Jens Spahn, parliamentary group leader of Germany's governing Christian Democrats and a former health minister, resigned after facing accusations of hypocrisy over having a child through a surrogate mother in the United States. Surrogacy is banned in Germany, a policy his CDU party and Spahn himself had previously backed, though raising a child born to a surrogate abroad is legal. Chancellor Friedrich Merz called the decision 'right' and 'inevitable,' saying 'credibility is the highest asset in politics.'",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxQRVpqcGdjVlJvaUlMRXJLd1Y4dFBoamtNV2Y3WHZ5aXBJS29tY2F6a1NWRHl2OE9hM2lXeF9SRk5CNzlWeVpuRVAzYWprU25MRGdUTHVCS29vNWRacWJ5Nk53Qy1wMTF5M005Ri1OOVI2MzBlS19JdnJ0NjRmdTdhTnBBMDl1cmQweHdPWThXVDZWcGhfUGtqS1l6dHVNMGM5YlRRU1IyWXBER2FzbndyRlM4VQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cq56e9n1ddzo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/germany-spahn-surrogacy-resignation.png",
      "alt": "German Christian Democrat politician Jens Spahn.",
      "credit": "Olaf Kosinsky / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In Nero's Rome, the Stoic philosopher Seneca was revered as the age's great moral teacher, a man who filled his essays with praise of poverty, self-denial, and indifference to riches. Yet within four years at court he had amassed a fortune of three hundred million sesterces, and in 58 AD the veteran senator Publius Suillius rose in public to demand by what philosophy a preacher of simplicity had grown so colossally rich. The charge that stuck was not fraud but hypocrisy: the moralist who did not live his own maxims. Like Jens Spahn, whose party made a virtue of banning surrogacy while he quietly used one abroad, Seneca embodies the oldest political vulnerability of all, the gap between the doctrine a man teaches in public and the life he leads in private.",
        "excerpt": "By what kind of wisdom or maxims of philosophy had Seneca within four years of royal favour amassed three hundred million sesterces? At Rome the wills of the childless were, so to say, caught in his snare while Italy and the provinces were drained by a boundless usury. His own money, on the other hand, had been acquired by industry and was not excessive.",
        "source": "Tacitus, Annals, Book XIII.42 (trans. Church & Brodribb)",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_13",
        "image": {
          "src": "/covers/germany-spahn-surrogacy-resignation--a0.png",
          "alt": "Ancient Roman double herm showing the clean-shaven Stoic philosopher Seneca the Younger joined back-to-back with a bearded Socrates.",
          "credit": "Double Herm of Socrates and Seneca, Antikensammlung, Berlin; photograph via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Eliot Spitzer built his entire public identity as New York's crusading attorney general, the self-styled 'Sheriff of Wall Street' who prosecuted prostitution rings and even signed a 2007 law lengthening the jail term for men who patronized prostitutes. In March 2008, a federal wiretap revealed that Spitzer, by then governor, had himself paid more than eighty thousand dollars to a high-end escort agency; within days he resigned. The scandal detonated not because prostitution was exotic but because he had personally enforced the very rule he was breaking. Spitzer is the modern template for Spahn: the official undone not by the act itself but by the exact contradiction between the standard he imposed on others and the exemption he claimed for himself.",
        "excerpt": "The crusading prosecutor who had made his name policing the sins of others was caught paying a premium escort service, and the wiretap transcripts turned his righteous public brand into a punchline overnight. He had signed a law stiffening penalties for men who did exactly what he was doing, and that symmetry, more than the sex, forced his resignation. His downfall became shorthand for the moralist hoisted on his own statute.",
        "source": "Eliot Spitzer prostitution scandal (2008), contemporaneous reporting",
        "href": "https://en.wikipedia.org/wiki/Eliot_Spitzer_prostitution_scandal",
        "image": {
          "src": "/covers/germany-spahn-surrogacy-resignation--a1.png",
          "alt": "Portrait photograph of Eliot Spitzer speaking, dark suit and tie, during his tenure as a New York official.",
          "credit": "Eliot Spitzer; photograph via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Molière's 1664 comedy Tartuffe is the definitive stage portrait of the pious fraud: a man who cloaks naked appetite for money and a married woman beneath ostentatious displays of devotion, and who very nearly ruins the household that took him in. In this speech the level-headed Cléante warns Orgon not to confuse the mask of virtue with the face of it, distinguishing counterfeit sanctity from the real thing as sharply as counterfeit from honest coin. The play was so threatening to the devout establishment of its day that it was banned for years. Spahn, a leader of a party that draped the surrogacy ban in the language of moral principle, stands accused of exactly Cléante's charge: wearing the honoured mask while quietly living otherwise.",
        "excerpt": "What! Will you find no difference between\nHypocrisy and genuine devoutness?\nAnd will you treat them both alike, and pay\nThe self-same honour both to masks and faces\nSet artifice beside sincerity,\nConfuse the semblance with reality,\nEsteem a phantom like a living person,\nAnd counterfeit as good as honest coin?\nMen, for the most part, are strange creatures, truly!",
        "source": "Molière, Tartuffe; or, The Hypocrite, Act I (trans. Curtis Hidden Page, 1908)",
        "href": "https://www.gutenberg.org/cache/epub/2027/pg2027-images.html"
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Measure for Measure, the deputy Angelo is installed as Vienna's rigid enforcer of morality, reviving a dead law that condemns a young man to death for fornication. Then Isabella, the condemned man's chaste sister, comes to plead for mercy, and the puritan discovers to his horror that he lusts after her precisely because she is virtuous. In this soliloquy he watches his own austere self-image collapse in real time, appalled that the strictest judge is himself the sinner. Angelo is the archetype Spahn now inhabits: the public moralist who enforces a prohibition on others while, in private, the same human desire he condemned proves stronger than the principle he preached.",
        "excerpt": "What's this, what's this? Is this her fault or mine?\nThe tempter or the tempted, who sins most? Ha!\nNot she; nor doth she tempt: but it is I\nThat, lying by the violet in the sun,\nDo as the carrion does, not as the flower,\nCorrupt with virtuous season. Can it be\nThat modesty may more betray our sense\nThan woman's lightness? Having waste ground enough,\nShall we desire to raze the sanctuary,\nAnd pitch our evils there? O, fie, fie, fie!\nWhat dost thou, or what art thou, Angelo?\nDost thou desire her foully for those things\nThat make her good?",
        "source": "William Shakespeare, Measure for Measure, Act II, Scene 2",
        "href": "https://www.gutenberg.org/files/23045/23045-h/23045-h.htm"
      },
      {
        "category": "artistic",
        "title": "William Hogarth's 1762 engraving Credulity, Superstition, and Fanaticism crams a church interior with a ranting preacher, swooning worshippers, and dangling puppet-idols, a ferocious satire of religious 'enthusiasm' as theatre and fraud. A thermometer of faith, witches, and grotesque props expose the sanctimony on display as pure performance, the outward show of piety with nothing true beneath it. Hogarth strips the mask from public godliness exactly as Cléante does in Tartuffe, indicting the manufacture of moral display. It reads as a period emblem for the Spahn affair: a governing party that wrapped a ban in the vestments of Christian moral seriousness, and a leader whose private conduct made the display look like just that, a display.",
        "excerpt": "A cavernous church swarms with a preacher whipping his flock into hysteria, worshippers clutching idols and fainting in the pews, every gauge and prop of piety turned into stagecraft. Hogarth loads the frame with instruments that measure faith like fever, so that devotion registers as spectacle rather than substance. The whole scene is an anatomy of sanctimony exposed as show.",
        "source": "William Hogarth, Credulity, Superstition, and Fanaticism, engraving, 1762",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Credulity,_Superstition,_and_Fanaticism.png",
        "image": {
          "src": "/covers/germany-spahn-surrogacy-resignation--a4.png",
          "alt": "Crowded 18th-century satirical engraving of a church where a preacher incites a frenzied congregation clutching idols and swooning amid grotesque props.",
          "credit": "William Hogarth, Credulity, Superstition, and Fanaticism (1762); via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Mozart's 1787 opera Don Giovanni dramatizes a nobleman of boundless private appetite who refuses every summons to repent, until the stone statue of a man he wronged arrives at his table and drags him down to hell. Max Slevogt's electric 1912 portrait known as 'The Red d'Andrade' captures the singer Francisco d'Andrade mid-defiance in that final reckoning, sword and cape flung out against the dark. The opera is the archetypal fable of a public man whose private conduct collides, catastrophically, with the moral order he flouts, the clash between personal pleasure and duty resolved by a fall. It maps onto Spahn's undoing, where a private choice pursued abroad became the pivot on which a public career toppled and 'credibility,' as Chancellor Merz put it, revealed itself as the highest asset a politician holds.",
        "excerpt": "Slevogt paints the baritone as Don Giovanni caught in the graveyard confrontation, body torqued in theatrical defiance, red-lined cape slashing across a shadowed stage. The brushwork is loose and headlong, all motion and bravado on the very brink of the reckoning that will pull the libertine down. It freezes the instant when private license finally meets public judgment.",
        "source": "W. A. Mozart, Don Giovanni, K.527 (1787); painting by Max Slevogt (1912)",
        "href": "https://imslp.org/wiki/Don_Giovanni,_K.527_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/germany-spahn-surrogacy-resignation--a5.png",
          "alt": "Loosely painted 1912 portrait of baritone Francisco d'Andrade costumed as Don Giovanni, cape flying, in a dramatic defiant pose on a darkened stage.",
          "credit": "Max Slevogt, Francisco d'Andrade as Don Giovanni ('The Red d'Andrade'), 1912, Alte Nationalgalerie, Berlin; via Wikimedia Commons."
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "laos-methanol-tourist-deaths-ruling",
    "headline": "Laos says it cannot determine a cause for six tourist deaths from methanol-tainted alcohol in Vang Vieng",
    "overview": "Laos's Ministry of Public Security said it could not establish blame or cause for the November 2024 deaths of six foreign tourists linked to methanol-laced alcohol in Vang Vieng, because no autopsies were conducted on the bodies. The victims, a Briton, two Australians, two Danes and an American, died after a night out; a distillery owner faces charges for selling harmful products and operating illegally, but not for the deaths. Australia summoned the Laotian ambassador, saying it was 'deeply frustrated and bitterly disappointed' that more serious charges were not pursued.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cdx8rj99endo"
      },
      {
        "name": "CP24",
        "href": "https://www.cp24.com/news/world/2026/07/18/laos-tourists-authorities-cannot-determine-if-deaths-linked-to-tainted-alcohol/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/laos-methanol-tourist-deaths-ruling.png",
      "alt": "The karst mountains and Nam Song river at Vang Vieng, Laos.",
      "credit": "Jialiang Gao / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the autumn of 1858 a Bradford stallholder known as \"Humbug Billy\" sold peppermint humbugs that a druggist's fatal error had sweetened with arsenic trioxide instead of harmless powdered gypsum. Around twenty people, many of them children, died in agony and more than two hundred more were poisoned. The druggist, his assistant and the sweet-maker were all arrested, and all three were acquitted after the court found that no existing law had been broken. Like the six travellers in Vang Vieng, the Bradford dead were killed by a tainted everyday indulgence, and their grieving families watched the machinery of justice grind to a halt without ever assigning blame.",
        "excerpt": "About five pounds of sweets, adulterated by mistake with roughly twelve pounds of arsenic, reached the public through a market stall; some twenty people died and more than two hundred fell ill. Though three men were charged, the judge ruled the poisoning purely accidental and directed acquittals, leaving no one answerable for the deaths. The scandal shocked the nation and helped drive the Pharmacy Act of 1868, but the dead of Bradford received reform rather than justice.",
        "source": "The 1858 Bradford sweets poisoning; John Leech's cartoon 'The Great Lozenge-Maker,' Punch, 20 November 1858.",
        "href": "https://en.wikipedia.org/wiki/1858_Bradford_sweets_poisoning",
        "image": {
          "src": "/covers/laos-methanol-tourist-deaths-ruling--a0.png",
          "alt": "A skeletal figure of Death grinds poison with a giant pestle and mortar amid barrels of arsenic, in John Leech's 1858 Punch cartoon satirising the Bradford sweets poisoning.",
          "credit": "John Leech, 'The Great Lozenge-Maker. A Hint to Paterfamilias,' Punch, 1858. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "During American Prohibition the federal government, unable to stop bootleggers from re-distilling stolen industrial alcohol, ordered that spirit laced with ever-larger doses of methanol and other poisons. Over the Christmas holiday of 1926 dozens collapsed in New York, and by the era's end as many as 10,000 people are estimated to have died from the adulterated drink. New York's chief medical examiner Charles Norris denounced the policy as \"our noble experiment in extermination,\" yet no official was ever punished for the deaths. As in Laos, a poisoned drink killed the unsuspecting, and the authorities who might have answered for it instead retreated behind a wall of impunity.",
        "excerpt": "To thwart bootleggers, the Treasury ordered industrial alcohol denatured with a deadly formula heavy in methanol; the poison could not be fully filtered out, and drinkers went blind or died. In New York alone hundreds died in a single year, and critics from Columbia's Nicholas Murray Butler to medical examiner Charles Norris condemned what one called \"legalized murder.\" No one in government was ever held to account, and the toll mounted quietly until repeal in 1933.",
        "source": "The 'Chemist's War' of Prohibition, 1926-1933; see Deborah Blum, 'The Chemist's War,' Slate, 19 February 2010.",
        "href": "https://slate.com/technology/2010/02/the-little-told-story-of-how-the-u-s-government-poisoned-alcohol-during-prohibition.html",
        "image": {
          "src": "/covers/laos-methanol-tourist-deaths-ruling--a1.png",
          "alt": "Prohibition agents pour confiscated liquor into a sewer as a police commissioner looks on, New York, around 1921.",
          "credit": "New York City Deputy Police Commissioner John A. Leach watching agents pour liquor into a sewer, c.1921. Library of Congress, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In the final scene of Shakespeare's tragedy, Romeo, believing Juliet dead, drinks a phial of poison bought from a destitute apothecary and dies beside her in the Capulet tomb. His last words toast his love and salute the swift, sure work of the drug before a kiss seals his end. Written more than four centuries ago, the passage distils the horror of a young life ended by a swallowed poison, the same fate that overtook six travellers who raised a glass in Vang Vieng and never woke.",
        "excerpt": "Eyes, look your last!\nArms, take your last embrace! and, lips, O you\nThe doors of breath, seal with a righteous kiss\nA dateless bargain to engrossing death!\nCome, bitter conduct, come, unsavoury guide!\nThou desperate pilot, now at once run on\nThe dashing rocks thy sea-sick weary bark!\nHere's to my love! [Drinks] O true apothecary!\nThy drugs are quick. Thus with a kiss I die.",
        "source": "William Shakespeare, Romeo and Juliet, Act V, Scene 3 (c.1595).",
        "href": "http://shakespeare.mit.edu/romeo_juliet/romeo_juliet.5.3.html"
      },
      {
        "category": "literary",
        "title": "A.E. Housman's elegy, from A Shropshire Lad (1896), watches a young runner carried home twice, once shoulder-high in triumph after winning his race, and again shoulder-high to his grave as the \"townsman of a stiller town.\" The poem finds a bitter mercy in dying before glory fades, the laurel still unwithered on the boy's curls. Its tender grief for youth cut off at its brightest moment mirrors the mourning for six young tourists whose journeys ended abruptly and far from home.",
        "excerpt": "The time you won your town the race\nWe chaired you through the market-place;\nMan and boy stood cheering by,\nAnd home we brought you shoulder-high.\n\nTo-day, the road all runners come,\nShoulder-high we bring you home,\nAnd set you at your threshold down,\nTownsman of a stiller town.\n\nSmart lad, to slip betimes away\nFrom fields where glory does not stay,\nAnd early though the laurel grows\nIt withers quicker than the rose.\n\nEyes the shady night has shut\nCannot see the record cut,\nAnd silence sounds no worse than cheers\nAfter earth has stopped the ears:\n\nNow you will not swell the rout\nOf lads that wore their honours out,\nRunners whom renown outran\nAnd the name died before the man.\n\nSo set, before its echoes fade,\nThe fleet foot on the sill of shade,\nAnd hold to the low lintel up\nThe still-defended challenge-cup.\n\nAnd round that early-laurelled head\nWill flock to gaze the strengthless dead,\nAnd find unwithered on its curls\nThe garland briefer than a girl's.",
        "source": "A.E. Housman, 'To an Athlete Dying Young,' A Shropshire Lad, XIX (1896).",
        "href": "https://en.wikisource.org/wiki/A_Shropshire_Lad/To_an_Athlete_Dying_Young"
      },
      {
        "category": "artistic",
        "title": "Henry Wallis's 1856 painting shows the seventeen-year-old poet Thomas Chatterton lying dead on a garret bed by an open window over the rooftops of London, one arm trailing to the floor, torn manuscripts scattered, and an empty phial of arsenic beside him. The pale, beautiful body and the cold dawn light make the death of the young almost unbearably present. The picture memorialises a gifted life poisoned and lost too soon, an image that speaks directly to the grief for six travellers, barely older than Chatterton, killed by poison far from those who loved them.",
        "excerpt": "The Pre-Raphaelite canvas fixes the moment after Chatterton's suicide by arsenic in 1770: the youth stretched across a narrow bed, chest bare, coppery hair fallen back, his hand let go of an emptied vial. Shreds of his own writings litter the floorboards as first light breaks over a distant St Paul's. Wallis turns a squalid attic death into a luminous elegy for wasted promise, and the frame at its first showing bore Marlowe's line, \"Cut is the branch that might have grown full straight.\"",
        "source": "Henry Wallis, Chatterton (The Death of Chatterton), 1856, oil on canvas, Tate Britain.",
        "href": "https://www.tate.org.uk/art/artworks/wallis-chatterton-n01685",
        "image": {
          "src": "/covers/laos-methanol-tourist-deaths-ruling--a4.png",
          "alt": "A young man lies dead on a bed beside an open attic window at dawn, his arm hanging to the floor, torn papers scattered and an empty poison phial nearby.",
          "credit": "Henry Wallis, 'Chatterton,' 1856, Tate Britain. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Mozart's Requiem in D minor, K.626, left unfinished at his own death in 1791, is the West's most enduring music of mourning, its Lacrimosa rising in slow, weeping phrases over the words \"that day of tears.\" Composed as a mass for the dead, it gives voice to grief and to the plea that the departed be granted rest and eternal light. The surviving autograph breaks off in Mozart's own hand only a few bars into the Lacrimosa, the pen laid down forever. Set against the silence of an inquiry that could name neither cause nor culprit, the Requiem offers the six young dead of Vang Vieng the dignity of a lament that justice withheld.",
        "excerpt": "Lacrimosa dies illa,\nqua resurget ex favilla\njudicandus homo reus.\nHuic ergo parce, Deus:\npie Jesu Domine,\ndona eis requiem. Amen.\n\n(Full of tears will be that day, when from the ashes shall arise the guilty to be judged; therefore spare him, O God: merciful Lord Jesus, grant them rest. Amen.)",
        "source": "W.A. Mozart, Requiem in D minor, K.626 (1791), 'Lacrimosa'; text from the traditional Requiem Mass.",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/laos-methanol-tourist-deaths-ruling--a5.png",
          "alt": "A page of Mozart's handwritten Requiem manuscript, the opening bars of the Lacrimosa in ink on aged staff paper, where the score breaks off.",
          "credit": "Autograph manuscript of Mozart's Requiem, K.626, folio 87r (Lacrimosa). Austrian National Library, public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "trump-canada-wildfire-smoke-tariffs",
    "headline": "Trump threatens new tariffs on Canada over wildfire smoke drifting into U.S. cities",
    "overview": "President Donald Trump threatened new tariffs on Canada, accusing it of 'willful negligence' as smoke from roughly 955 active wildfires blanketed much of the northern United States in haze. Trump said the U.S. was being 'invaded by filthy, polluted, and unhealthy air' and vowed to call Prime Minister Mark Carney, while Ontario Premier Doug Ford urged Washington to send firefighting help rather than complain. Carney's government pointed to a long history of cross-border cooperation and about C$12 billion invested in forests and fire prevention.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwyq93j34lgo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOdWRlX0x0cFY3NTVYVE1pbHVGQmZEYkVfLUtJZEZEamlnRk5HemRkckV5RjhRaUhoYVltcWRWcWZDZ2JyNUVFa3B2TW8welVMVFJiUkx4MDVLdlBpaUNNZUJlNGJkSDI4Q1JQcXJQZjFFcVA1N2V3TXJVWFFIc1M3TzdpWVRtcWI4M1ZiWHAyd3RER1I2UEN1U1hRM3dncnNCWjJkeWxlRzZValRldFNXb2FfbmFHMEFLWWpGUmxwVzJWUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/trump-canada-wildfire-smoke-tariffs.png",
      "alt": "Wildfire smoke casting an orange haze over a North American city skyline.",
      "credit": "Jim Griffin / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "For decades the Consolidated Mining and Smelting Company's smelter at Trail, British Columbia, sent plumes of sulphur-dioxide fumes drifting south down the Columbia valley, scorching farms and forests across the line in Stevens County, Washington. Washington complained to Ottawa in 1925, and the dispute went to an international tribunal that in 1938 and 1941 issued the founding decision of transboundary pollution law: a nation is liable for airborne harm its territory inflicts on a neighbor. The roles are now exactly inverted. In 2026 it is the United States accusing Canada of letting poisoned air cross the border, but where the earlier grievance was settled by arbitration and damages, Trump reaches instead for tariffs and the language of 'willful negligence.'",
        "excerpt": "Under the principles of international law, as well as of the law of the United States, no State has the right to use or permit the use of its territory in such a manner as to cause injury by fumes in or to the territory of another or the properties or persons therein, when the case is of serious consequence and the injury is established by clear and convincing evidence.",
        "source": "Trail Smelter Arbitration (United States v. Canada), Tribunal Decision, 1941",
        "href": "https://leap.unep.org/en/countries/ca/national-case-law/trail-smelter-case-united-states-v-canada"
      },
      {
        "category": "historical",
        "title": "In the autumn of 2015, fires set to clear Indonesian peatland for palm-oil and pulp plantations spun out of control, and southerly winds pushed a choking pall of smoke over Singapore and Malaysia, driving air-quality indices into the 'hazardous' band and shutting schools for millions of children. Kuala Lumpur and Singapore publicly blamed Jakarta for negligence, and Singapore went so far as to prosecute Indonesian companies under its transboundary haze law. It is the closest mirror to the Canada dispute: neighbors gasping under drifting wildfire smoke, pointing across a border at the country where the fires burn, and turning an ecological disaster into a diplomatic and legal grievance. As with Ontario's Doug Ford insisting the answer is firefighting help rather than finger-pointing, the 2015 crisis exposed how smoke that ignores borders strains the politics of the nations it crosses.",
        "excerpt": "The 2015 haze was among the worst on record, blanketing Singapore and Malaysia in smoke from Indonesian peat and forest fires and pushing pollution readings into hazardous territory for weeks. Malaysia's prime minister demanded Indonesia rein in the companies responsible, while Singapore invoked a new law to pursue the firms behind the smoke. Jakarta bristled at being blamed for a haze that clearing fires, drought, and cross-border winds had jointly produced.",
        "source": "2015 Southeast Asian haze; statements by Malaysian and Singaporean officials",
        "href": "https://en.wikipedia.org/wiki/2015_Southeast_Asian_haze",
        "image": {
          "src": "/covers/trump-canada-wildfire-smoke-tariffs--a1.png",
          "alt": "Singapore's Orchard Road shrouded in dense grey haze during the September 2015 transboundary smoke crisis",
          "credit": "Photo via Wikimedia Commons (CC BY-SA)"
        }
      },
      {
        "category": "literary",
        "title": "Charles Dickens opens Bleak House by drowning London in soot and fog until the city itself seems to dissolve, the smoke falling like black snow and the fog creeping into every lung and lamplit court. The polluted air is not mere weather; it is the visible sign of a diseased public life, an atmosphere everyone breathes and no one can escape. Dickens's murky capital, its sun blotted out and its river 'defiled,' is the literary ancestor of the haze that Trump described as an 'invasion' of 'filthy, polluted, and unhealthy air.' Where the novelist saw the smoke as a shared civic affliction to be pitied, the modern quarrel turns the same choking pall into an accusation aimed across a border.",
        "excerpt": "Smoke lowering down from chimney-pots, making a soft black drizzle, with flakes of soot in it as big as full-grown snowflakes—gone into mourning, one might imagine, for the death of the sun. . . . Fog everywhere. Fog up the river, where it flows among green aits and meadows; fog down the river, where it rolls defiled among the tiers of shipping and the waterside pollutions of a great (and dirty) city.",
        "source": "Charles Dickens, Bleak House (1852–53), Chapter 1",
        "href": "https://www.gutenberg.org/files/1023/1023-h/1023-h.htm"
      },
      {
        "category": "literary",
        "title": "In the prologue to Sophocles' Oedipus the King, a priest kneels before the palace to describe a Thebes suffocating under an invisible plague: a blight on the crops, the herds, and the wombs of women, the whole city choked by a pestilence that hangs over it like poisoned air. The catastrophe is understood as a miasma, a pollution that must be traced to its guilty source and driven out before the city can breathe again. Oedipus responds by vowing to find and punish whoever is responsible for the defilement. That ancient logic—that fouled air demands a culprit to blame and expel—echoes uncannily in a president who answers a smoke-shrouded sky by naming a neighbor negligent and threatening to punish it.",
        "excerpt": "A blight is on our harvest in the ear,\nA blight upon the grazing flocks and herds,\nA blight on wives in travail; and withal\nArmed with his blazing torch the God of Plague\nHath swooped upon our city emptying\nThe house of Cadmus, and the murky realm\nOf Pluto is full fed with groans and tears.",
        "source": "Sophocles, Oedipus the King (c. 429 BCE), trans. Francis Storr",
        "href": "https://www.gutenberg.org/cache/epub/31/pg31.txt"
      },
      {
        "category": "artistic",
        "title": "Claude Monet painted the Houses of Parliament again and again from a window of St Thomas's Hospital, and in 'The Houses of Parliament (Effect of Fog)' the great building barely surfaces as a violet silhouette dissolving into a suspended, luminous murk. What Monet found beautiful was precisely London's coal-laden, smoke-thickened air—the very industrial haze that made his celebrated 'effects' possible. The canvas turns polluted atmosphere into an object of wonder, the opposite pole from Trump's framing of drifting smoke as filth and invasion. Seen against the 2026 story, Monet's shimmering fog is a reminder that the same veil over a skyline can be read as sublime or as an act of aggression, depending entirely on who is looking and why.",
        "excerpt": "Monet renders Parliament as a faint blue-grey ghost floating in a dense envelope of fog, its towers half-erased and its outlines bleeding into the tinted air. The polluted London atmosphere is not a nuisance in the painting but its true subject, softening architecture into a mood of suspended light. The effect is haze transfigured—the choking air of an industrial city recast as something ethereal.",
        "source": "Claude Monet, The Houses of Parliament (Effect of Fog), 1903–04, The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/437128",
        "image": {
          "src": "/covers/trump-canada-wildfire-smoke-tariffs--a4.png",
          "alt": "Claude Monet's painting of the Houses of Parliament dissolving into thick violet-grey fog over the Thames",
          "credit": "Claude Monet, The Metropolitan Museum of Art, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner watched the Palace of Westminster burn on the night of 16 October 1834 and turned the disaster into a roaring canvas of flame and smoke, the blaze boiling up into the sky and smearing the night with red and gold above a stunned crowd on the Thames embankment. The whole composition is dominated by the towering column of smoke that swallows the city's monuments, a spectacle at once terrifying and sublime. It is the pictorial equivalent of ~955 wildfires throwing haze over the northern United States: uncontrolled fire converting the air itself into an overwhelming, sky-filling presence. Turner reminds us that great fires have always been read as omens and calamities, the smoke over a capital both a physical menace and a political shock—here, one that a president has chosen to blame on the country next door.",
        "excerpt": "Turner paints the burning Parliament as a wall of incandescent orange and yellow flame that erupts into a vast, churning cloud of smoke, its lurid glow reflected in the black waters of the Thames. Silhouetted spectators crowd the bridge and bank, dwarfed by the conflagration. The buildings dissolve in the heat while the smoke itself becomes the painting's true colossus, blotting out the sky.",
        "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, October 16, 1834 (1834–35), Philadelphia Museum of Art",
        "href": "https://philamuseum.org/collection/object/103831",
        "image": {
          "src": "/covers/trump-canada-wildfire-smoke-tariffs--a5.png",
          "alt": "J. M. W. Turner's painting of the Houses of Parliament ablaze, flames and smoke towering over the Thames and reflected in the water",
          "credit": "J. M. W. Turner, Philadelphia Museum of Art, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "texas-floods-cleanup-rescues",
    "headline": "Texas begins flood cleanup after more than 230 rescues and over two feet of rain in the Hill Country",
    "overview": "Hard-hit Texas communities began cleaning up after a week of punishing rain dropped more than two feet in places, killing at least two people and prompting more than 230 rescues across the Hill Country and areas near the Mexican border. Floodwaters spilled over Interstate 10 near Ozona, where more than 50 people were pulled by boat from flooded apartments and an RV park, and a section of bridge collapsed over the Nueces River in Uvalde County. Forecasters warned that further showers could worsen already swollen rivers.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxPZF9mYkc4MHU2ZW1ZNVVTN2daM0Q4b1JzUmg1dm1tbkg0UjdEVTB3SmJZXzlnR3VvVjFKSHpwRWd2NmtscDhjd1pILUNSMjVGdV9naTR5WEctbFE4cG5hTTlZSExUTkNjMGlHWTg3T2g2VTBzOVBoaS1PLUJHVmJ1SlZWUlp4NHl1clpNa1F2UmI2MXFuQjA1b1hTYnFSUQ?oc=5"
      },
      {
        "name": "WRAL",
        "href": "https://www.wral.com/news/ap/2f17c-threat-of-dangerous-flooding-continues-in-texas-while-hard-hit-areas-launch-cleanup-efforts/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/texas-floods-cleanup-rescues.png",
      "alt": "A swollen river in flood in the Texas Hill Country.",
      "credit": "Wikimedia Commons (public domain)"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the spring of 1927 the Mississippi River, swollen by months of rain, burst through its levee system in roughly 145 places and spread a muddy inland sea more than seventy miles wide across seven states. About 330,000 people were plucked from rooftops, trees and second-story windows by a vast fleet of rescue boats, while some 500 died and hundreds of thousands were left homeless in relief camps. It remains the benchmark American river disaster of rescue-by-boat and slow, mud-caked cleanup after the water finally fell. Texas's Hill Country deluge, with floodwaters spilling over Interstate 10 near Ozona and more than 230 people pulled from flooded apartments and an RV park, is a smaller echo of that same drama: rivers bursting their banks and neighbors ferried to safety through the current.",
        "excerpt": "For weeks the lower Mississippi valley became an inland ocean, its towns marked only by rooftops and the crowns of levees where refugees huddled. Rescuers in skiffs and steamboats worked the flooded farmland day and night, taking families, livestock and whatever could be carried off submerged porches. When the water at last receded it left the land buried in silt, the long labor of cleanup only beginning.",
        "source": "The Great Mississippi Flood of 1927, the most destructive river flood in U.S. history.",
        "href": "https://en.wikipedia.org/wiki/Great_Mississippi_Flood_of_1927",
        "image": {
          "src": "/covers/texas-floods-cleanup-rescues--a0.png",
          "alt": "Black-and-white 1927 photograph of flood refugees and their belongings gathered on high ground during the Great Mississippi Flood at Vicksburg.",
          "credit": "1927 Mississippi Flood, Vicksburg refugees; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On the night of 18-19 November 1421 a violent North Sea storm drove water up the river mouths of the Low Countries and shattered the dikes ringing the Grote Hollandse Waard, drowning dozens of villages in what is now the Netherlands. Estimates of the dead run into the thousands, and the sea held the polders for decades, carving the reed-marsh wilderness still called the Biesbosch. The St. Elizabeth's flood fused storm, river and tide into a single overwhelming inundation, the medieval memory of water reclaiming the land. It is the older European counterpart to Texas's Hill Country deluge, where two feet of rain sent rivers over their banks, collapsed a bridge across the Nueces in Uvalde County, and swallowed roads whole.",
        "excerpt": "When the dikes gave way in the dark, the water poured across the low farmland faster than church bells could warn the sleeping villages. Whole parishes vanished beneath the flood, their steeples left standing briefly above a widening inland sea before they too were lost. For generations afterward the drowned land stayed underwater, a wetland where fields and homes had been.",
        "source": "St. Elizabeth's flood of 1421, which drowned the Grote Hollandse Waard in Holland and Zeeland.",
        "href": "https://en.wikipedia.org/wiki/St._Elizabeth%27s_flood_(1421)",
        "image": {
          "src": "/covers/texas-floods-cleanup-rescues--a1.png",
          "alt": "Late-medieval painted panel depicting the St. Elizabeth's flood, with broken dikes, a church and houses standing amid wide floodwater.",
          "credit": "Master of the St. Elizabeth Panels, c. 1490-1495, Rijksmuseum, Amsterdam; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The flood of Noah in Genesis is the West's foundational deluge story: the fountains of the great deep break open, rain falls forty days and forty nights, and the waters rise until even the mountains vanish beneath fifteen cubits of water. Only those gathered into the ark ride out the catastrophe, lifted up on the face of an all-covering sea while every other living thing is swept away. It is the archetype of the flood as world-ending judgment, and of survival by being carried safely above the rising water. When Texas rescuers pulled more than fifty people by boat from flooded apartments and an RV park, they reenacted the oldest image of the deluge: a vessel bearing the living over waters that have swallowed everything else.",
        "excerpt": "In the six hundredth year of Noah's life, in the second month, the seventeenth day of the month, the same day were all the fountains of the great deep broken up, and the windows of heaven were opened. And the rain was upon the earth forty days and forty nights.\n[...]\nAnd the flood was forty days upon the earth; and the waters increased, and bare up the ark, and it was lift up above the earth. And the waters prevailed, and were increased greatly upon the earth; and the ark went upon the face of the waters. And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered.\n[...]\nAnd every living substance was destroyed which was upon the face of the ground, both man, and cattle, and the creeping things, and the fowl of the heaven; and they were destroyed from the earth: and Noah only remained alive, and they that were with him in the ark.",
        "source": "Genesis 7:11-23, King James Version; Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "literary",
        "title": "In Book I of Ovid's Metamorphoses, Jupiter resolves to drown a wicked human race, and Neptune joins in, striking the earth with his trident so the rivers rush resistless over the plains, sweeping away grain, groves, houses, flocks and people alike. Land and sea lose all distinction until the world becomes a sea without a shore, with only a few survivors clinging to hilltops or drifting in small boats. Written around the turn of the first millennium, it is antiquity's most vivid poem of rivers bursting their banks and a landscape erased by water. It maps almost exactly onto the Hill Country scene, the Nueces and its neighbors overflowing and Interstate 10 vanishing beneath the current near Ozona.",
        "excerpt": "And Neptune with his trident smote the Earth, which trembling with unwonted throes heaved up the sources of her waters bare; and through her open plains the rapid rivers rushed resistless, onward bearing the waving grain, the budding groves, the houses, sheep and men,—and holy temples, and their sacred urns. The mansions that remained, resisting vast and total ruin, deepening waves concealed and whelmed their tottering turrets in the flood and whirling gulf. And now one vast expanse, the land and sea were mingled in the waste of endless waves—a sea without a shore.",
        "source": "Ovid, Metamorphoses, Book I (the flood of Deucalion), trans. Brookes More (1922); Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D1%3Acard%3D253"
      },
      {
        "category": "artistic",
        "title": "Gustave Doré's 1866 wood-engraving 'The Deluge,' from his illustrated Bible, shows the last survivors of Noah's flood stranded on a shrinking rock: a mother lifts her children toward a merciless sky while a tigress and her cubs crowd the same doomed ledge, the drowned already floating in the black water below. Doré turns the biblical flood into a scene of raw human desperation as the water climbs. The image distills the terror at the heart of every flood, the frantic scramble for higher ground as the river keeps rising. It is the visual key to the Texas rescues, where families in flooded apartments and an RV park waited on whatever high place they could reach for the boats to come.",
        "excerpt": "Doré's dark engraving crowds the last survivors onto a wave-lapped crag: a mother strains upward with a limp child while a wild cat and her cubs snarl beside her, and pale bodies drift face-down in the water below. The horizon is nothing but flood, the ark a distant smudge in a bruised sky. It is the deluge rendered as pure human panic at the moment before the water closes over the rock.",
        "source": "Gustave Doré, 'The Deluge' (Le Déluge), 1866, wood engraving from The Holy Bible.",
        "href": "https://commons.wikimedia.org/wiki/File:Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I,_The_Deluge.jpg",
        "image": {
          "src": "/covers/texas-floods-cleanup-rescues--a4.png",
          "alt": "Gustave Doré's engraving The Deluge: a mother lifts her children and a tigress crouches on a rock as floodwaters and drowned bodies surround them.",
          "credit": "Gustave Doré, 'The Deluge' (1866), from The Holy Bible; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Michelangelo's fresco 'The Deluge' (1508-1512), on the Sistine Chapel ceiling, spreads the flood across a whole panel: knots of refugees haul bundles and children uphill, one man carries his lifeless son, a small boat is swamped and capsizing in the middle distance, and a crowd shelters beneath a wind-torn cloth as the water rises around a last spit of land. Michelangelo makes the deluge a study in human solidarity and panic, people helping one another flee the water. That is precisely the story of the Texas cleanup, where neighbors and rescuers pulled more than 230 people from the current across the Hill Country and near the Mexican border. The fresco's climbers on their vanishing island are the Renaissance mirror of an RV park and apartments emptied by boat.",
        "excerpt": "Across Michelangelo's crowded panel the survivors of the flood struggle toward a shrinking hill: parents drag and carry their children, a grieving man bears a limp body, and a knot of figures huddles under a billowing shelter as the wind and water close in. Out in the rising flood a laden boat tips and takes on water, its passengers grasping at the gunwales. The fresco reads as one long, muscular scene of people trying to save one another from the deluge.",
        "source": "Michelangelo, 'The Deluge' (Il Diluvio), 1508-1512, fresco, Sistine Chapel ceiling, Vatican.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Deluge_after_restoration.jpg",
        "image": {
          "src": "/covers/texas-floods-cleanup-rescues--a5.png",
          "alt": "Michelangelo's Sistine Chapel fresco The Deluge: crowds flee rising floodwaters carrying children and belongings toward higher ground, with a swamped boat in the distance.",
          "credit": "Michelangelo, 'The Deluge' (1508-1512), Sistine Chapel, Vatican; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "us-data-center-protests-national",
    "headline": "Data-center opponents stage coordinated protests in at least 125 U.S. locations",
    "overview": "Opponents of the rapid buildout of AI data centers held protests in at least 125 locations across the United States, the first coordinated national demonstration against an infrastructure boom that has roiled local politics. The rallies, organized by a grassroots group called HumansFirst, targeted what it calls the 'unaccountable' expansion and its strain on power bills, water and the environment. A June Reuters/Ipsos poll found only about a third of Americans approve of the pace of data-center construction, and just 14% would welcome one in their community.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxPYk5QUVhhdHdNUVZKT0xJVURINmc1UzZORTZpdGtnaGwxemxTSWZNUTR6MkE3SHY5RjYwSUlQSWFUSlV3RHJGSXJLcjBUWXRlNzBuREwzblp5aEtIdVFRZjJlZmt2dUF6QzNxY2hackV2NDlQbnVGbFBrRnlXOUdycTh1ck5RdUd6WndGOExPN2h5dkVuVUFEVnYzeHdxT1ViWElDZjRpNzFncVFmMEltNg?oc=5"
      },
      {
        "name": "U.S. News",
        "href": "https://www.usnews.com/news/top-news/articles/2026-07-18/us-data-center-protests-go-national-as-backlash-grows"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/us-data-center-protests-national.png",
      "alt": "Rows of server racks inside a data center hall.",
      "credit": "Carl Lender / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the winter of 1811-1816, textile workers across the English Midlands and North smashed the mechanized frames and looms that were displacing their livelihoods, marching by night under the name of a mythical \"General Ludd\" of Sherwood Forest. Framed as criminal riot by Parliament, the Luddite movement was in fact a coordinated popular revolt against machinery introduced without regard for the communities it upended, prompting the state to make frame-breaking a hanging offence. Their proclamations claimed an ancient right to destroy engines that ruined a trade for private profit. Like today's data-center opponents rallying in 125 towns against an \"unaccountable\" buildout, the Luddites were not against progress as such but against a machine age imposed on them from above, at their expense.",
        "excerpt": "Whereas by the charter granted by our late sovereign Lord Charles II ... the framework knitters are empowered to break and destroy all frames and engines that fabricate articles in a fraudulent and deceitful manner ... we therefore the framework knitters do hereby declare the aforesaid Act to be null and void to all intents and purposes whatsoever ... And we do hereby declare to all hosiers lace manufacturers and proprietors of frames that we will break and destroy all manner of frames whatsoever that make the following spurious articles and all frames whatsoever that do not pay the regular prices heretofore agreed to [by] the masters and workmen ... whereas all frames of whatsoever description the work-men of whom are not paid in the current coin of the realm will invariably be destroyed.\nGiven under my hand this first day of January 1812.\nGod protect the Trade.\nNed Lud's-Office\nSherwood Forest",
        "source": "Luddite proclamation \"By the Framework Knitters, a Declaration,\" 1 January 1812, signed from \"Ned Lud's-Office, Sherwood Forest\"",
        "href": "https://www.marxists.org/history/england/combination-laws/ned-ludd-1812.htm"
      },
      {
        "category": "historical",
        "title": "In 1962 Consolidated Edison unveiled plans for the largest pumped-storage power plant in the country, gouged into the face of Storm King Mountain on the Hudson River. Local residents, alarmed that the scenery would be scarred, the town's drinking water endangered and the aqueduct to New York City threatened, formed the Scenic Hudson Preservation Conference in 1963 and fought the utility for seventeen years. Their 1965 court victory established for the first time that ordinary citizens had standing to sue to protect the environment, and by 1980 Con Edison abandoned the project outright. It is a near-exact template for the data-center revolt: a grassroots community coalition resisting a vast, power-hungry piece of energy infrastructure imposed by a corporation, invoking exactly the water, environment and quality-of-life worries now driving protests nationwide.",
        "excerpt": "In September 1962 Consolidated Edison announced plans for a hydroelectric power plant at Storm King Mountain in Cornwall, New York, pumping Hudson River water uphill during low-demand hours and releasing it through turbines at peak. When an artist's rendering revealed how the mountain's face would be scarred, residents organized: the Hudson River Conservation Society and, by 1963, the Scenic Hudson Preservation Conference. Opponents warned of contaminated groundwater threatening Cornwall's drinking water and damage to the Catskill Aqueduct serving New York City. After nearly two decades of hearings and court battles, Con Edison agreed in 1980 to terminate the Storm King plans.",
        "source": "\"Storm King,\" Rescuing the River: 50 Years of Environmental Activism on the Hudson, Hudson River Valley Heritage online exhibit",
        "href": "https://omeka.hrvh.org/exhibits/show/rescuing-the-river/powering-the-hudson/storm-king"
      },
      {
        "category": "literary",
        "title": "William Blake wrote his short preface poem to \"Milton\" around 1804-1810, at the very dawn of the factory age, setting a vision of a holy, green England against the \"dark Satanic Mills\" then rising across the land. The verse became a battle cry precisely because it fuses spiritual protest with a refusal to submit to industrial encroachment, vowing not to cease from \"Mental Fight\" until a better world is built. Its imagery of hills clouded and pastures defiled by relentless machinery speaks directly to communities today watching warehouse-scale server farms consume their landscapes, power and water. Blake gives the data-center backlash its oldest and most resonant slogan: the machine mills as something Satanic set against the human and the sacred.",
        "excerpt": "And did those feet in ancient time\nWalk upon England's mountains green,\nAnd was the holy Lamb of God\nOn England's pleasant pastures seen?\nAnd did the Countenance Divine\nShine forth upon our clouded hills?\nAnd was Jerusalem builded here\nAmong these dark Satanic Mills?\nBring me my Bow of burning gold:\nBring me my Arrows of desire:\nBring me my Spear: O clouds unfold!\nBring me my Chariot of fire:\nI will not cease from Mental Fight,\nNor shall my Sword sleep in my hand,\nTill we have built Jerusalem,\nIn England's green & pleasant Land.",
        "source": "William Blake, preface (\"And did those feet in ancient time\") to Milton: A Poem, c. 1804-1810",
        "href": "https://en.wikisource.org/wiki/The_prophetic_books_of_William_Blake,_Milton/Milton,_preface"
      },
      {
        "category": "literary",
        "title": "In Hard Times (1854), Charles Dickens conjured Coketown, a fictional industrial city choked by smoke, machinery and monotony, where nature is stained purple with dye and the steam-engine nods endlessly \"like the head of an elephant in a state of melancholy madness.\" His portrait is a moral indictment of an industrialism that flattens everything and everyone into sameness for the sake of production. The passage crystallizes the fear now animating data-center opponents: that a wave of humming, resource-devouring infrastructure will remake their towns into featureless service districts for distant machines. Dickens gives the human-versus-machine anxiety of this story its most enduring landscape.",
        "excerpt": "It was a town of red brick, or of brick that would have been red if the smoke and ashes had allowed it; but as matters stood, it was a town of unnatural red and black like the painted face of a savage. It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness. It contained several large streets all very like one another, and many small streets still more like one another, inhabited by people equally like one another, who all went in and out at the same hours, with the same sound upon the same pavements, to do the same work.",
        "source": "Charles Dickens, Hard Times (1854), Book the First, Chapter V, \"The Key-note\"",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm"
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg's \"Coalbrookdale by Night\" (1801) shows the birthplace of the Industrial Revolution ablaze in the dark: the Bedlam Furnaces of Shropshire throwing a hellish orange glare over a valley of smoke, machinery and hauled iron, dwarfing the tiny human figures in the foreground. Painted with something between awe and dread, it became the defining image of industry overwhelming a once-rural landscape. That is exactly the vista data-center opponents invoke, warning of vast, floodlit, energy-guzzling server halls transforming quiet places into round-the-clock industrial zones. The canvas turns the machine age's encroachment into a single, luminous, unsettling scene.",
        "excerpt": "A rural valley is engulfed by the fiery glow of the ironworks: furnaces blaze a lurid orange-red into the night sky, pouring smoke over the darkened hills, while dim human figures and a horse-drawn load are reduced to shadows before the industrial inferno. Loutherbourg paints Coalbrookdale as both spectacle and warning, the machinery of a new age lighting up and consuming the land around it.",
        "source": "Philip James de Loutherbourg, Coalbrookdale by Night (1801), oil on canvas, Science Museum, London",
        "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._-_Coalbrookdale_by_Night_-_WGA13730.jpg",
        "image": {
          "src": "/covers/us-data-center-protests-national--a4.png",
          "alt": "Nighttime scene of the Coalbrookdale ironworks with furnaces glowing fiery orange-red beneath billowing smoke, tiny human and horse figures silhouetted in the foreground.",
          "credit": "Philip James de Loutherbourg, \"Coalbrookdale by Night\" (1801), Science Museum, London — via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Pellizza da Volpedo's monumental \"Il Quarto Stato\" (The Fourth Estate, 1901) shows a mass of laboring men, women and a child advancing steadily toward the viewer across an open square, the front rank lit like classical heroes as the crowd behind them stretches back without end. It is the definitive image of ordinary people rising together, a grassroots multitude claiming its place against entrenched power. That is the visual key to this story: not machine-breaking chaos but an organized human tide, communities converging in 125 towns to be counted against an industrial force they never chose. Pellizza turns the crowd itself into the subject, and into a quiet, unstoppable act of collective will.",
        "excerpt": "A broad column of working people moves forward out of shadow into light, led by three figures at the front, a striding man flanked by a woman holding an infant, with a vast crowd massed behind them filling the width of the canvas. Pellizza da Volpedo monumentalizes the ordinary marching multitude, dignified and resolute, as a single body advancing to claim its rightful place.",
        "source": "Giuseppe Pellizza da Volpedo, Il Quarto Stato (The Fourth Estate), 1901, oil on canvas, Museo del Novecento, Milan",
        "href": "https://commons.wikimedia.org/wiki/File:Quarto_Stato.jpg",
        "image": {
          "src": "/covers/us-data-center-protests-national--a5.png",
          "alt": "A large crowd of working men and women, led by a striding man and a woman carrying a baby, advancing forward across an open square toward the viewer.",
          "credit": "Giuseppe Pellizza da Volpedo, \"Il Quarto Stato\" (1901), Museo del Novecento, Milan — via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "pentagon-testosterone-screening-plan",
    "headline": "Doctors question Pentagon plan to screen troops 30 and older for low testosterone",
    "overview": "Medical experts questioned a new order by Defense Secretary Pete Hegseth requiring annual testosterone-deficiency screening for active-duty and reserve service members aged 30 and older, which he says will bolster military readiness. Four of six doctors interviewed by Reuters said there was no solid evidence that broad screening would optimize combat readiness, warning that inappropriate hormone treatment could raise risks including infertility. Hegseth linked the mandate to 'Operator Syndrome' seen in elite special-forces troops, but the researcher who first described the condition said those operators are not representative of the wider force.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPWUJlakhnaXgxcmJlaU01d0J2UU96M3BnX1JMSDhrLV9aT0dSQW1FUWV5c0xLRm9qOXBOWWFvWHNyN096NVRqbGdoVE9kUEJrU1ZBWkVmaVpRa3FPbTk1NE4yWk9ETV9IbE5HNi1Zemo3Rm11VWpqc1BtM1FiMU9WOXpMMDl4RDczZVFjU3hyUEtqdkoyWVozLU9PVWhHV3p5T2VLUlJoc2ZZZWNDeS1jOTgwS3V6N3BDM3g4Q0lpVQ?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/world/hegseth-announces-new-policy-to-test-troops-for-low-testosterone-and-offer-them-hormone-replacement-therapy"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/pentagon-testosterone-screening-plan.png",
      "alt": "Aerial view of the Pentagon building near Washington, D.C.",
      "credit": "David B. Gleason / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In archaic Sparta the state claimed a citizen's body before he could even walk. Plutarch records that a newborn was carried to a council of tribal elders at the Lesche, who inspected it for strength and, if it seemed \"puny and ill-shaped,\" ordered it flung into a chasm below Mount Taygetus — not for the child's sake but for \"the public interest.\" Boys who passed were enrolled at seven into the agoge, close-clipped, barefoot, half-starved and taught \"to endure pain and conquer in battle.\" It is the purest ancestor of the impulse behind Hegseth's screening order: the conviction that a soldier's flesh is a strategic asset the state may measure, sort and optimize, and that martial readiness is something you can engineer in the body by decree.",
        "excerpt": "if they found it stout and well made, they gave order for its rearing, and allotted to it one of the nine thousand shares of land above mentioned for its maintenance, but, if they found it puny and ill-shaped, ordered it to be taken to what was called the Apothetae, a sort of chasm under Taygetus; as thinking it neither for the good of the child itself, nor for the public interest, that it should be brought up, if it did not, from the very outset, appear made to be healthy and vigorous. [...] their chief care was to make them good subjects, and to teach them to endure pain and conquer in battle.",
        "source": "Plutarch, Life of Lycurgus (Dryden translation, ed. A. H. Clough, 1859)",
        "href": "https://www.gutenberg.org/cache/epub/674/pg674.txt",
        "image": {
          "src": "/covers/pentagon-testosterone-screening-plan--a0.png",
          "alt": "Marble statue of a helmed Spartan hoplite, 5th century BC, sometimes identified as Leonidas, Archaeological Museum of Sparta",
          "credit": "Marble hoplite (5th c. BC), possibly Leonidas, Archaeological Museum of Sparta; photograph via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "In June 1889 the 72-year-old French physiologist Charles-Édouard Brown-Séquard stood before the Société de Biologie in Paris and announced that he had injected himself with a slurry crushed from the testicles of dogs and guinea pigs — and grown young again. He reported to The Lancet that his strength, stamina and even the arc of his urine had been restored, measuring the gains on a dynamometer. Within months more than 12,000 physicians were peddling his \"Elixir of Life,\" though his extracts contained essentially no testosterone and the effect was placebo. It is the founding episode of the testosterone-cure fantasy that Hegseth's order revives: the seductive, evidence-thin belief that manly vigor can be topped up like a fuel tank, and that virility restored is capability restored.",
        "excerpt": "The day after the first subcutaneous injection, and still more after the two succeeding ones, a radical change took place in me, and I had ample reason to say and to write that I had regained at least all the strength I possessed a good many years ago.",
        "source": "C. E. Brown-Séquard, The Lancet, 1889 (\"The effects produced on man by subcutaneous injections of a liquid obtained from the testicles of animals\")",
        "href": "https://www.usrf.org/news/TRT/Brown-Sequard,%20Lancet,%201889.pdf",
        "image": {
          "src": "/covers/pentagon-testosterone-screening-plan--a1.png",
          "alt": "Portrait of the physiologist Charles-Édouard Brown-Séquard",
          "credit": "Portrait of Charles-Édouard Brown-Séquard; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "In Book XII of the Iliad the Lycian captain Sarpedon turns to his comrade Glaucus and asks why the two of them are honored \"as gods\" with the best land and richest feasts — and answers his own question: because they stand first in the killing. Since death and \"ignoble age\" will claim brave and coward alike, he reasons, a man should spend his life buying glory in the front rank. It is the aristocratic warrior creed in its most naked form, prowess of the body converted directly into worth and rank. That is precisely the equation Hegseth reaches for when he ties combat readiness to hormonal vigor — the ancient dream of the soldier whose physical strength is the measure of the man.",
        "excerpt": "Could all our care elude the gloomy grave,\nWhich claims no less the fearful and the brave,\nFor lust of fame I should not vainly dare\nIn fighting fields, nor urge thy soul to war.\nBut since, alas! ignoble age must come,\nDisease, and death's inexorable doom,\nThe life, which others pay, let us bestow,\nAnd give to fame what we to nature owe;\nBrave though we fall, and honour'd if we live,\nOr let us glory gain, or glory give!",
        "source": "Homer, Iliad, Book XII (Sarpedon to Glaucus), trans. Alexander Pope",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt"
      },
      {
        "category": "literary",
        "title": "The seventh-century Spartan poet Tyrtaeus wrote marching songs meant to be chanted around the camp fires, and they read like state propaganda for martial masculinity. In Thomas Campbell's translation the elegy exalts the young man who falls sword in hand and heaps disgrace on the \"recreant\" who flinches, insisting that even in death \"youth's fair form\" is beautiful — the hero-boy \"lovelier far, / For having perished in the front of war.\" Here the ideal male body is not merely useful to the state but sacralized, most perfect at the moment it is spent for the polis. It anticipates the aesthetic underneath the Pentagon plan: the fusion of virility, martial fitness and national strength into a single cult of the soldierly body.",
        "excerpt": "How glorious fall the valiant, sword in hand,\nIn front of battle for their native land!\n[...]\nBut youth's fair form, though fallen, is ever fair,\nAnd beautiful in death the boy appears,\nThe hero boy, that dies in blooming years:\nIn man's regret he lives, and woman's tears;\nMore sacred than in life, and lovelier far,\nFor having perished in the front of war.",
        "source": "Tyrtaeus, \"Martial Elegy,\" trans. Thomas Campbell (in Masterpieces of Greek Literature, 1902)",
        "href": "https://en.wikisource.org/wiki/Masterpieces_of_Greek_Literature_(1902)/Tyrtaeus"
      },
      {
        "category": "artistic",
        "title": "Around 440 BC the sculptor Polykleitos cast a bronze spear-bearer — the Doryphoros — as a deliberate demonstration of his \"Canon,\" a mathematical system for the perfectly proportioned male body. Known today through Roman marble copies like the one from Pompeii now in Naples, the figure is a nude young warrior, spear once resting on his shoulder, weight shifted into an easy contrapposto that made ideal manhood look like natural law. For two and a half millennia this soldier-athlete has been the West's template for what a fighting body ought to be. Hegseth's testosterone regime is a modern echo of the same fantasy — the belief that there is an optimal martial physique, and that troops can and should be tuned toward it.",
        "excerpt": "A Roman marble copy of Polykleitos' bronze Doryphoros: a nude, athletically muscled young soldier caught mid-stride, his weight poised on one leg while the other trails, one hand once gripping a spear. The body is built to a strict canon of proportion, every ratio calculated to embody ideal male strength — the athletic warrior refined into a formula of perfection.",
        "source": "Polykleitos, Doryphoros (Spear-Bearer), c. 440 BC; Roman marble copy, Museo Archeologico Nazionale, Naples",
        "href": "https://commons.wikimedia.org/wiki/File:Doryphoros_MAN_Napoli_Inv6011-2.jpg",
        "image": {
          "src": "/covers/pentagon-testosterone-screening-plan--a4.png",
          "alt": "Roman marble copy of the Doryphoros (Spear-Bearer) of Polykleitos, an idealized nude male warrior, National Archaeological Museum of Naples",
          "credit": "Doryphoros, Roman copy after Polykleitos, Museo Archeologico Nazionale di Napoli; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David labored for years on Leonidas at Thermopylae (finished 1814), a vast canvas crowded with muscular, largely nude Spartan warriors calmly readying themselves to die at the pass. At the center the seated king Leonidas gazes out with serene resolve, his idealized athletic body the moral and physical anchor of the scene — Neoclassicism's hymn to martial virtue as bodily perfection. David painted it as an emblem of self-sacrificing manhood for the nation. It is a direct visual ancestor of the ideology behind the Pentagon's screening plan: the state's romance with the hardened male body as the very substance of readiness, patriotism rendered as testosterone made flesh.",
        "excerpt": "David's monumental Leonidas at Thermopylae fills the canvas with idealized, heroically muscled Spartan soldiers preparing to fight to the death. The nude king sits at the center in perfect composure, sword in hand, his sculpted body radiating disciplined martial strength. Every figure is a Neoclassical study in the beautiful warrior physique — manhood offered up as the ultimate proof of devotion to the state.",
        "source": "Jacques-Louis David, Leonidas at Thermopylae, 1814, oil on canvas, Musée du Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_004_Thermopylae.jpg",
        "image": {
          "src": "/covers/pentagon-testosterone-screening-plan--a5.png",
          "alt": "Jacques-Louis David's painting Leonidas at Thermopylae, showing idealized nude and muscular Spartan warriors around the seated King Leonidas",
          "credit": "Jacques-Louis David, Leonidas at Thermopylae (1814), Musée du Louvre; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "germany-raises-terror-threat-level",
    "headline": "Germany raises its terrorism threat level to 'high,' interior minister says",
    "overview": "German Interior Minister Alexander Dobrindt said he had raised the country's abstract terrorism threat level to 'high,' telling the newspaper Welt am Sonntag that a rising volume of intelligence pointed to discernible attack plans against German infrastructure, individuals and institutions. The move comes as Chancellor Friedrich Merz's government prepares to expand the operational powers of Germany's intelligence agencies. 'Plans for attacks against our country are clearly discernible,' Dobrindt said.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPRTV2cVk1WFpCWkR2cGlkcm90cVVvMkduU0hpUUltS3c3Tnh4QlJleUFveF96VmFIYjdsR0kyZVcxYmxqR1NpNDNpUTB4bnd2b1hCYUdyMWJiREJfczVXVmJoQjhlSV91Z0szcWRQY3pkU2phREdtSi1KRjI1MFI2ZklvWmNCLXllWWdObmszYzZ0dXItQ0g0WVRvcWNYejJ3Vkxac0VlYlQtWkdBWUZkQ1AwUmYyOGNORFhZX2lpVQ?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-18/germany-raises-threat-level-over-terror-attack-risk-welt-says"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/germany-raises-terror-threat-level.png",
      "alt": "The Reichstag building, seat of the German Bundestag, in Berlin.",
      "credit": "Jürgen Matern / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the autumn of 1605 the English state believed a hidden cell meant to blow up King, Lords and Commons together in a single blast beneath Parliament. The plot unravelled not from a battlefield but from intelligence: an anonymous warning, the Monteagle Letter, slipped to a peer telling him to stay away because the assembly would 'receive a terrible blow.' In the paranoid decade that followed, the Crown expanded its security apparatus, tightening the recusancy laws, imposing a new Oath of Allegiance, and treating a whole community as a suspect enemy within. Dobrindt's warning of 'discernible attack plans against German infrastructure, individuals and institutions' echoes that same logic: a cryptic intelligence signal of an unseen attacker, answered by a state reaching for wider powers of surveillance and control.",
        "excerpt": "My lord, out of the love I beare to some of youere frends, I have a care of youre preservacion, therefore I would aduyse you as you tender your life to devise some excuse to shift youer attendance at this parliament, for God and man hath concurred to punishe the wickedness of this tyme, and thinke not slightly of this advertisement, but retire yourself into your country, where you may expect the event in safety, for though there be no apparance of anni stir, yet I saye they shall receive a terrible blow this parliament and yet they shall not seie who hurts them.",
        "source": "The Monteagle Letter, anonymous warning received 26 October 1605 (The National Archives, UK)",
        "href": "https://en.wikisource.org/wiki/Monteagle_Letter",
        "image": {
          "src": "/covers/germany-raises-terror-threat-level--a0.png",
          "alt": "Contemporary engraving of eight of the Gunpowder Plot conspirators grouped in conversation, hats and cloaks, plotting the destruction of Parliament.",
          "credit": "Crispijn van de Passe the Elder, engraving, c.1605. National Portrait Gallery, London (NPG 334a). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Between the 1880s and the 1900s a wave of anarchist 'propaganda of the deed' — dynamite in cafes and railway stations, the assassinations of a Russian tsar, a French president, an Austrian empress and an American president — convinced the governments of Europe and America that a borderless conspiracy of bomb-throwers could strike anywhere. On 4 May 1886 a bomb hurled into police ranks at Chicago's Haymarket Square killed officers and detonated a national panic that ended in a mass trial and executions. States answered the fear by building the machinery of the modern security state: London's Special Branch, the Tsar's Okhrana, immigration bans on anarchists, and a Rome conference in 1898 to coordinate international surveillance of radicals. Germany's move to a 'high' threat level, paired with the Merz government's plan to expand intelligence-agency powers, belongs to that lineage — a state convinced of a hidden, mobile enemy and reaching for broader watchfulness in response.",
        "excerpt": "In these decades the anarchist with a bomb became the era's archetype of the enemy who could be anyone and could strike anywhere, and each atrocity was met not only with grief but with new statutes, new political police, and new registers of the suspect. The Haymarket bomb of 1886, its thrower never identified, showed how a single unseen attacker could push a whole society toward hasty legislation and expanded surveillance — the reflex of a state that feels itself watched from the shadows.",
        "source": "The Haymarket bombing, Chicago, 4 May 1886, and the transatlantic anarchist 'dynamite' scare (Library of Congress, Chronicling America)",
        "href": "https://guides.loc.gov/chronicling-america-haymarket-affair",
        "image": {
          "src": "/covers/germany-raises-terror-threat-level--a1.png",
          "alt": "Wood engraving of a dynamite bomb exploding in a burst of light among ranks of police as a speaker addresses a crowd at Chicago's Haymarket Square, 1886.",
          "credit": "Thure de Thulstrup, wood engraving in Harper's Weekly, 15 May 1886. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Joseph Conrad's 1907 novel The Secret Agent turns on a foreign embassy official, Mr Vladimir, who lectures the slothful spy Verloc that a purely destructive outrage on a public target is the surest way to frighten a complacent society into repressive legislation. In this passage Vladimir insists the attack must not merely be planned but executed on home soil, and directed at buildings and institutions, so that the shock forces the state's hand. Conrad, writing after the real 1894 Greenwich bombing, anatomises the whole grim mechanism by which a hidden conspiracy and an anxious government feed one another. It reads as an uncanny gloss on Dobrindt's warning of plots against German 'infrastructure, individuals and institutions' and a government preparing, in response, to widen its surveillance powers.",
        "excerpt": "“A series of outrages,” Mr Vladimir continued calmly, “executed here in this country; not only planned here—that would not do—they would not mind. Your friends could set half the Continent on fire without influencing the public opinion here in favour of a universal repressive legislation. They will not look outside their backyard here.” [...] “These outrages need not be especially sanguinary,” Mr Vladimir went on, as if delivering a scientific lecture, “but they must be sufficiently startling—effective. Let them be directed against buildings, for instance.”",
        "source": "Joseph Conrad, The Secret Agent: A Simple Tale (1907), Chapter II",
        "href": "https://www.gutenberg.org/ebooks/974"
      },
      {
        "category": "literary",
        "title": "In Dostoevsky's 1872 novel The Possessed (Demons), the agitator Pyotr Verkhovensky binds a provincial town into a secret revolutionary 'quintet' and boasts of an invisible national organisation. Here the theorist Shigalov recites back to him the terrifying vision he was sold: Russia covered by an 'endless network of knots,' each cell ramifying in secret, working through denunciation and fire to bring the country to a coordinated moment of collapse. Dostoevsky captures the dread of a conspiracy that is everywhere and nowhere, and the mutual paranoia it breeds among watchers and watched. That is precisely the anxiety behind a raised threat level: a state persuaded that unseen cells are laying 'discernible attack plans' against its infrastructure, forced to imagine the hidden enemy within.",
        "excerpt": "you yourself at first and a second time later, drew with great eloquence, but too theoretically, a picture of Russia covered with an endless network of knots. Each of these centres of activity, proselytising and ramifying endlessly, aims by systematic denunciation to injure the prestige of local authority, to reduce the villages to confusion, to spread cynicism and scandals, together with complete disbelief in everything and an eagerness for something better, and finally, by means of fires, as a pre-eminently national method, to reduce the country at a given moment, if need be, to desperation.",
        "source": "Fyodor Dostoevsky, The Possessed (Demons), 1872, trans. Constance Garnett, Part III, Chapter IV",
        "href": "https://www.gutenberg.org/ebooks/8117"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens painted The Consequences of War in 1637–38, at the height of the Thirty Years' War, as an explicit allegory of a continent given over to violence. Mars, the god of war, strides forward with bloody sword while Venus vainly tries to restrain him; the fury Alecto drags him on with a torch, and beneath his feet lie the trampled emblems of art, learning and civic harmony, as a black-clad figure of Europe throws up her arms and wails. Rubens described the grieving woman as Europe herself, 'afflicted for so many years by rapine, outrage and misery.' The painting gives a face to exactly the atmosphere behind a nation raising its guard against imminent attack — a Europe once more bracing itself, its institutions and its people, against the threat of destruction breaking in from the dark.",
        "excerpt": "An oil allegory in warm, storm-lit color: the armored war-god Mars lunges out of shadow, sword drawn, torch-bearing Fury pulling him on, while Venus and cherubs strain to hold him back and the personified figure of Europe lifts her arms in black-robed despair. Around them the instruments of peaceful life — a book, an architect's compass, a lute — are crushed underfoot, an image of a settled civilization tipping into fear and ruin.",
        "source": "Peter Paul Rubens, The Consequences of War, 1637–1638, oil on canvas. Galleria Palatina, Palazzo Pitti, Florence.",
        "href": "https://commons.wikimedia.org/wiki/File:Rubens_-_The_Consequences_of_War.jpg",
        "image": {
          "src": "/covers/germany-raises-terror-threat-level--a4.png",
          "alt": "Baroque allegorical painting: the war-god Mars strides forward with sword and shield, pulled by a torch-bearing Fury, as Venus tries to restrain him and a black-robed figure of Europe throws up her arms in grief above trampled books and instruments.",
          "credit": "Peter Paul Rubens, The Consequences of War (1637–38), Galleria Palatina, Palazzo Pitti, Florence. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gustav Holst composed 'Mars, the Bringer of War' in 1914, the opening movement of his orchestral suite The Planets, on the eve of the First World War. It is built over a relentless, hammered five-beat ostinato — strings played col legno, with the wood of the bow — that advances like an approaching army, swelling through dissonant brass to a series of crushing, terrifying climaxes. The piece does not depict a battle so much as the dread of one coming: the mechanical, inexorable tread of menace closing in. That is the psychological register of a country raised to a 'high' terror alert — the anxious, watchful anticipation of an attack that has not yet fallen, the sense of a threat marching steadily toward the city.",
        "excerpt": "A relentless orchestral march in an off-kilter five-beat meter, opened by strings striking their strings with the wood of the bow and by a menacing timpani and brass tread that never relents. The music builds through grinding, dissonant harmonies to shattering climaxes, evoking not a battle already joined but the mounting, mechanical dread of one bearing down — the sound of a society bracing for impact.",
        "source": "Gustav Holst, 'Mars, the Bringer of War,' from The Planets, Op. 32 (1914–1916)",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)",
        "image": {
          "src": "/covers/germany-raises-terror-threat-level--a5.png",
          "alt": "Black-and-white portrait photograph of composer Gustav Holst, in profile with round spectacles, c.1921.",
          "credit": "Photograph of Gustav Holst by Herbert Lambert, c.1921. National Portrait Gallery, London. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "us-funds-maga-aligned-europe-groups",
    "headline": "U.S. State Department to fund MAGA-aligned European groups with grants of up to $3 million",
    "overview": "The Trump administration's State Department is offering grants of up to $3 million to European organizations aligned with the MAGA movement to combat 'censorship' and build 'civilisational bonds' with the United States, the Financial Times reported. Almost $5 million is available, expected to be split among two or three recipients working on issues such as national sovereignty and migration. Critics warned the effort, which repurposes a foreign-aid stream to support hard-right European groups, could deepen European resentment even as Trump presses the continent to spend more on defense.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxPOU4xcVQ5aVRTd3hURWx3clNoS2VWdzJ2QWZqc0g1alM2SHJBdk5zWnZqV01ndFhpMXBUQWlhTXdjVTMtdElHYzl0LXlCcFg3bDkyUjFOWm9hOG1zQzdLQnIyZUZpbGxaOFB3MlhITDhYY2I2UU9MTFJSV2FSdU9sbTA5WHROMXhnNnNGSlJ3MUc2U1Fudmp6Mlp3UWlyN0R0Q01NUkxCczFxbjhOUjM5TE1TMUFQTzVDRFN5emFmZjlsTEpodVVaUFJUZ29sdUF2WkQ0VA?oc=5"
      },
      {
        "name": "U.S. News",
        "href": "https://www.usnews.com/news/world/articles/2026-07-18/trump-administration-to-fund-maga-aligned-projects-in-europe-as-he-reorders-us-aid-ft-reports"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/us-funds-maga-aligned-europe-groups.png",
      "alt": "The Harry S. Truman Building, headquarters of the U.S. Department of State in Washington.",
      "credit": "U.S. Department of State / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 395 BC the Persian empire, unable to beat Sparta on the battlefield, opened its treasury instead. The satrap Tithraustes sent Timocrates the Rhodian to Greece with gold worth fifty silver talents, instructed to bind the leading men of Thebes, Corinth, Argos and Athens into a war against Sparta. The bribes landed, factions were bought, and the Corinthian War duly erupted, weakening a rival power from within. It is the oldest template for what the State Department now proposes: a superpower reaching across borders to bankroll congenial factions and reshape another region's politics with its money rather than its armies.",
        "excerpt": "Being at his wits' end how to manage matters, he resolved to send Timocrates the Rhodian to Hellas with a gift of gold worthy fifty silver talents, and enjoined upon him to endeavour to exchange solemn pledges with the leading men in the several states, binding them to undertake a war against Lacedaemon. Timocrates arrived and began to dole out his presents. In Thebes he gave gifts to Androcleidas, Ismenias, and Galaxidorus; in Corinth to Timolaus and Polyanthes; in Argos to Cylon and his party. ... The recipients of the moneys forthwith began covertly to attack the Lacedaemonians in their respective states, and, when they had brought these to a sufficient pitch of hatred, bound together the most important of them in a confederacy.",
        "source": "Xenophon, Hellenica 3.5.1-2 (trans. H. G. Dakyns)",
        "href": "https://www.gutenberg.org/files/1174/1174-h/1174-h.htm",
        "image": {
          "src": "/covers/us-funds-maga-aligned-europe-groups--a0.png",
          "alt": "A gold Achaemenid Persian daric coin showing a kneeling royal archer, the currency Persia used to subsidise foreign factions.",
          "credit": "Gold daric of the Achaemenid Empire, c. 490 BC. Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "From 1950 the CIA covertly built and financed the Congress for Cultural Freedom, its largest and longest secret operation, to wage a 'war of ideas' against Soviet communism among European intellectuals. Through the front it bankrolled sympathetic magazines across the continent, Encounter in London, Preuves in Paris, Der Monat in Berlin, alongside conferences, exhibitions and prizes, until The New York Times and Ramparts exposed the paymaster in 1966-67. Recipients felt betrayed to learn their independence had been an American purchase. The parallel to Washington's new grants is exact in spirit: a great power quietly underwriting ideologically aligned voices abroad to bend another society's culture toward its own foreign-policy interests.",
        "excerpt": "The Congress for Cultural Freedom was the CIA's most ambitious covert cultural campaign, secretly funding a web of European magazines, writers and conferences to promote an anti-communist consensus. Editors and intellectuals believed themselves free agents; in truth their salaries and print runs flowed from a foreign intelligence service. When the funding was unmasked in 1966-67, the revelation discredited the very people it had subsidised and fuelled lasting resentment of American meddling.",
        "source": "Congress for Cultural Freedom (CIA-funded, 1950-1967); Frances Stonor Saunders, Who Paid the Piper?",
        "href": "https://en.wikipedia.org/wiki/Congress_for_Cultural_Freedom"
      },
      {
        "category": "literary",
        "title": "Facing Philip of Macedon's expansion, Demosthenes warned Athens that Greece was being conquered less by arms than by gold, its politicians bought city by city. In the Third Philippic he contrasts an older Greece that execrated anyone who took foreign money with his own corrupted age, in which loyalty and independence 'have been sold in the market and are gone.' The traitor, once punished with the heaviest penalty, now flaunts his hire without shame. Demosthenes gives voice to exactly the fear critics raise about the MAGA grants: that a foreign power's money, funnelled to willing local hands, hollows out a nation's politics from inside and dissolves the mistrust that once guarded it against outsiders.",
        "excerpt": "It meant that men who took money from those who aimed at dominion or at the ruin of Hellas were execrated by all; that it was then a very grave thing to be convicted of bribery; that the punishment for the guilty man was the heaviest that could be inflicted; that for him there could be no plea for mercy, nor hope of pardon. No orator, no general, would then sell the critical opportunity... They did not barter away the harmony between people and people, nor their own mistrust of the tyrant and the foreigner, nor any of these high sentiments. Where are such sentiments now? They have been sold in the market and are gone.",
        "source": "Demosthenes, Third Philippic, secs. 37-39 (Public Orations of Demosthenes)",
        "href": "https://en.wikisource.org/wiki/The_Public_Orations_of_Demosthenes/Philippic_III"
      },
      {
        "category": "literary",
        "title": "Digging for roots in the wilderness, Shakespeare's exiled Timon unearths gold and delivers the theatre's fiercest indictment of money's corrupting power. This 'yellow slave,' he rages, will 'knit and break religions,' ennoble thieves and seat them 'with senators on the bench,' turning black to white and wrong to right. He names gold the 'common whore of mankind' that 'put'st odds among the route of nations', sowing discord between peoples. The speech distils the anxiety beneath this story: that dollars steered to favoured factions can buy legitimacy, install the once-marginal in seats of power, and set nation against nation.",
        "excerpt": "Gold? yellow, glittering, precious gold?\nThus much of this will make black white, foul fair,\nWrong right, base noble, old young, coward valiant. ...\nThis yellow slave\nWill knit and break religions, bless the accursed,\nMake the hoar leprosy adored, place thieves\nAnd give them title, knee and approbation\nWith senators on the bench... Come, damned earth,\nThou common whore of mankind, that put'st odds\nAmong the route of nations, I will make thee\nDo thy right nature.",
        "source": "Shakespeare, Timon of Athens, Act IV, Scene 3",
        "href": "https://shakespeare.mit.edu/timon/timon.4.3.html"
      },
      {
        "category": "artistic",
        "title": "William Hogarth's 'Canvassing for Votes' (1754-55), the second scene of his Humours of an Election series, stages political corruption as broad comedy. At the centre a bewildered farmer is worked over by agents of both parties, each pressing money and favours into his hands to buy his allegiance, while behind them inns and mobs seethe with bribed loyalty and treats. Hogarth's whole cycle is a satire on how cash, not conviction, decides who governs. Painted for a nation where votes were openly purchased, it is the sharpest visual analogue to a policy of dispensing grants to secure friendly political factions, the transaction dressed up as civic friendship.",
        "excerpt": "An oil painting crowded with figures: a country voter at the centre is courted simultaneously by rival party agents pushing coins and bribes into his palms, oblivious to the bought crowds, tavern banners and brawling supporters around him. Hogarth renders the buying of political loyalty as a bustling, faintly absurd marketplace, money changing hands beneath a veneer of hospitality and goodwill.",
        "source": "William Hogarth, Canvassing for Votes (Humours of an Election, Plate II), 1754-55, Sir John Soane's Museum",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Soliciting_Votes_-_WGA11457.jpg",
        "image": {
          "src": "/covers/us-funds-maga-aligned-europe-groups--a4.png",
          "alt": "Hogarth's painting Canvassing for Votes: a central voter being bribed by rival party agents amid a crowd of purchased supporters.",
          "credit": "William Hogarth, Canvassing for Votes (c. 1754-55). Web Gallery of Art / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's music-drama 'Das Rheingold' (1869) opens the Ring cycle with a theft that curses the world. The dwarf Alberich renounces love to seize the Rhinemaidens' gold, forging from it a ring that promises mastery over others, and every subsequent grab for that hoard poisons gods and men alike. The work is Western art's grandest parable of gold pursued as an instrument of domination, wealth converted into power over the wills of others. Arthur Rackham's illustration of the Rhine-daughters lamenting their stolen treasure captures the moment that fascination becomes corruption, a fitting emblem for a plan to convert foreign-aid millions into leverage over another continent's politics.",
        "excerpt": "In this scene from the opera's close, Arthur Rackham draws the Rhinemaidens grieving deep in the river for the gold that has been wrenched away and turned into a ring of power. The gleaming treasure that once brought innocent delight has become an engine of domination the moment it is seized for advantage, and its loss shadows the whole cycle with the theme of wealth wielded to rule others.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (1869); illustration by Arthur Rackham (1910)",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/us-funds-maga-aligned-europe-groups--a5.png",
          "alt": "Arthur Rackham illustration of the Rhinemaidens mourning their stolen Rhinegold, the treasure forged into a ring of power.",
          "credit": "Arthur Rackham, 'The Rhine's fair children, bewailing their lost gold, weep' (1910). Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "cfm-leap-1b-durability-certification",
    "headline": "CFM wins FAA and EASA approval for a durability upgrade to the LEAP-1B engine on the Boeing 737 MAX",
    "overview": "CFM International, the GE Aerospace-Safran joint venture, secured U.S. and European certification for a high-pressure turbine durability kit for its LEAP-1B engine, which powers the Boeing 737 MAX. The company said the upgrade roughly doubles the engine's time on wing in hot and harsh environments such as the Middle East and India, with full production expected to change over in early 2027. CFM also won initial engine-level certification for a novel reverse-bleed cooling system designed to cut fuel-nozzle replacements.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxOa1kyS1VFMTRPTHNBT1FpeC1lWTlvQ1Q1Rk4wX0lQME5NcHBEd2FRX2YyVVUzRHgtNElqMm9WM2l6bGEtVkxZZDBiRVJLZl9RUmZUY1lub2RPT2g4SC1tT2p5dElwSEJPQUN3M2F0dFZ4ZHZOb0JTbVROQWx3WnRnRDZKanRWblBpRjdjT2lGblZacHZ6WTl5djNVMXlJRmY1ZGs2NE1hTjVuQS1P?oc=5"
      },
      {
        "name": "GE Aerospace",
        "href": "https://www.geaerospace.com/news/press-releases/cfm-secures-certification-leap-1b-durability-upgrades"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/cfm-leap-1b-durability-certification.png",
      "alt": "A CFM LEAP turbofan engine mounted under an aircraft wing.",
      "credit": "Thyrome / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1712 Thomas Newcomen's atmospheric engine first harnessed fire and steam to do tireless mechanical work, but it was crude and wasteful; James Watt's separate condenser, patented in 1769, transformed that machine into a durable, efficient workhorse that could run for years and powered the Industrial Revolution. Watt's genius was thermal: he stopped the cylinder from being repeatedly heated and chilled, mastering the punishing cycle of heat that had limited every earlier engine. The surviving Watt-type beam engines, still turning their great flywheels in museums, are monuments to endurance won by taming temperature. That is precisely CFM's challenge with the LEAP-1B durability kit: to conquer the heat cycles that wear an engine down and keep it running far longer between overhauls.",
        "excerpt": "James Watt's decisive 1769 improvement, the separate condenser, kept the working cylinder permanently hot while steam was condensed elsewhere, ending the wasteful heat-and-cool cycle of Newcomen's engine. The result was a heat engine efficient and robust enough to run continuously in mines and mills for decades, becoming the enduring prime mover of the age of steam.",
        "source": "The Watt steam engine and Watt's separate condenser (1769).",
        "href": "https://en.wikipedia.org/wiki/Watt_steam_engine",
        "image": {
          "src": "/covers/cfm-leap-1b-durability-certification--a0.png",
          "alt": "A preserved Watt-type beam steam engine with its tall columns, walking beam and great flywheel on museum display.",
          "credit": "Watt-type beam engine (D. Napier & Son, 1832), ETSII Madrid. Photo Nicolas Perez, CC BY-SA 3.0, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In the late 1930s Frank Whittle in Britain and Hans von Ohain in Germany independently built the first working turbojets, and von Ohain's engine flew the Heinkel He 178 in 1939 while Whittle's Power Jets W.1 lifted the Gloster E.28/39 in 1941. Their central struggle was not thrust but survival: white-hot gases and spinning turbines destroyed early engines so quickly that the W.1 had a service life measured in only about ten hours. The whole subsequent history of jet propulsion has been a hunt for metals and cooling that let the hot section endure. CFM's LEAP-1B high-pressure turbine durability kit is the latest chapter of that same quest, roughly doubling how long the engine can stay on wing in scorching climates.",
        "excerpt": "The Power Jets W.1, first flown in the Gloster E.28/39 on 15 May 1941, was the first British turbojet to fly, following von Ohain's engine in the He 178 of 1939. Limited by the materials of its day, the early Whittle engine had a service life of only about ten hours, making durability of the hot turbine section the defining engineering problem of the jet age.",
        "source": "Power Jets W.1 (Whittle) and the first flying turbojets, 1939-1941.",
        "href": "https://en.wikipedia.org/wiki/Power_Jets_W.1",
        "image": {
          "src": "/covers/cfm-leap-1b-durability-certification--a1.png",
          "alt": "The Power Jets W.1 turbojet engine, the first British jet engine to fly, on display at the Science Museum, London.",
          "credit": "Power Jets W.1, Science Museum, London. Photo by Nimbus227, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book XVIII of Homer's Iliad, the smith-god Hephaestus (Vulcan) goes to his forge to make new armor for Achilles, setting twenty bellows to blow on his melting-pots, throwing copper, tin, silver and gold into the fire, and taking up hammer and tongs at his great anvil. It is the oldest and most vivid image in Western literature of a divine craftsman mastering fire and metal, blast by regulated blast, to make something that will endure the shock of battle. Homer even has the bellows blow with graded strength, an ancient intuition of the controlled thermal management that modern engines demand. CFM's durability kit is a distant descendant of that forge: high-tech metallurgy bent on making hot metal survive extreme heat.",
        "excerpt": "When he had so said he left her and went to his bellows, turning them towards the fire and bidding them do their office. Twenty bellows blew upon the melting-pots, and they blew blasts of every kind, some fierce to help him when he had need of them, and others less strong as Vulcan willed it in the course of his work. He threw tough copper into the fire, and tin, with silver and gold; he set his great anvil on its block, and with one hand grasped his mighty hammer while he took the tongs in the other.",
        "source": "Homer, Iliad, Book XVIII (trans. Samuel Butler).",
        "href": "https://classics.mit.edu/Homer/iliad.18.xviii.html"
      },
      {
        "category": "literary",
        "title": "In Book VIII of Virgil's Aeneid, Vulcan descends to his subterranean forge beneath a smoking island near Sicily, where the one-eyed Cyclopes wield heavy hammers on eternal anvils amid hissing steel, roaring water and flames driven through fuming vents. Virgil turns the forge into an industrial hell of fire and iron in which molten silver, brass, gold and deadly steel are rolled into the great furnace to make the shield of Aeneas. The scene is a hymn to controlled violence: raw heat and beaten metal disciplined into something strong enough to sustain war. It captures exactly the theme of CFM's LEAP-1B upgrade, human ingenuity taming fire and metal so that a machine can withstand punishing heat.",
        "excerpt": "Sacred to Vulcan's name, an isle there lay, / Betwixt Sicilia's coasts and Lipare, / Rais'd high on smoking rocks; and, deep below, / In hollow caves the fires of Aetna glow. / The Cyclops here their heavy hammers deal; / Loud strokes, and hissings of tormented steel, / Are heard around; the boiling waters roar, / And smoky flames thro' fuming tunnels soar.",
        "source": "Virgil, Aeneid, Book VIII (trans. John Dryden).",
        "href": "https://classics.mit.edu/Virgil/aeneid.8.viii.html"
      },
      {
        "category": "artistic",
        "title": "Diego Velazquez's Apollo in the Forge of Vulcan (1630, Museo del Prado) shows the god Apollo arriving with unwelcome news at Vulcan's smithy, where muscular smiths freeze mid-blow around a glowing bar of iron on the anvil, tongs and hammers in hand, the furnace throwing warm light across their sweating bodies. Velazquez paints the forge not as myth but as a real, sooty workshop of hard bodily labor and radiant heat, dignifying the craft of working metal with fire. It is the human face of taming furnace and hammer, the very labor that turns raw metal into something enduring. That is the enduring drama behind CFM's LEAP-1B durability kit: mastering fire and metal so an engine can bear the heat.",
        "excerpt": "The painting freezes the smiths mid-labor around the anvil, a bar of iron still glowing orange from the furnace, its heat lighting the astonished faces and straining muscles. Velazquez renders the forge as a place of real toil and radiant fire, where hammer, tongs and flame are the everyday tools of mastering metal.",
        "source": "Diego Velazquez, Apollo in the Forge of Vulcan (1630), Museo del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/cfm-leap-1b-durability-certification--a4.png",
          "alt": "Velazquez's painting of Apollo visiting Vulcan's forge, smiths gathered around a glowing bar of iron on the anvil.",
          "credit": "Diego Velazquez, Apollo in the Forge of Vulcan (1630), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In Act I of Wagner's opera Siegfried (1876), the young hero forges the shattered sword Nothung anew, singing the ringing Forging Song (\"Nothung! Nothung! Neidliches Schwert!\") as the orchestra hammers in time with his blows, the anvil, bellows and roaring furnace turned into music. Arthur Rackham's 1911 illustration for the opera captures the smithy in Mime's cave, the smith bent over the anvil as sparks fly and a blade takes shape in the firelight. Both music and image make the forge a place of triumphant creation, where broken metal is reheated and reforged into something stronger than before. That is the spirit of CFM's LEAP-1B durability upgrade, reworking the hot heart of the engine so it endures.",
        "excerpt": "Wagner sets Siegfried's re-forging of Nothung to relentless orchestral hammer-strokes, the music itself beating on an imagined anvil as the bellows roar and the blade is plunged hissing into water. Rackham's illustration answers it in ink and colour, the smith crouched over the anvil in the cave's firelight, sparks leaping as the sword is beaten back into being.",
        "source": "Richard Wagner, Siegfried, WWV 86C, Act I (the Forging Song); illustration by Arthur Rackham (1911).",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)",
        "image": {
          "src": "/covers/cfm-leap-1b-durability-certification--a5.png",
          "alt": "Arthur Rackham's illustration of the smith at the anvil forging a sword in Mime's cave, from Wagner's Siegfried.",
          "credit": "Arthur Rackham, illustration for Wagner's Siegfried (1911). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "nokia-hmd-ai-button-feature-phones",
    "headline": "HMD launches four Nokia-branded 4G feature phones with a dedicated AI-assistant button",
    "overview": "HMD unveiled four Nokia-branded 4G feature phones, the Nokia 210 4G, 200 4G, and second-edition 215 4G and 235 4G, that pair physical keypads with a dedicated button for a voice AI assistant powered by the Chinese firm Sikey AI. The button can set alarms, open the camera, toggle a torch or place calls, and comes with a 180-day trial before subscription fees apply. The retro-styled handsets add USB-C charging, up to 13 days of standby and HMD's cloud services, though some users have dismissed the AI feature as a gimmick.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/18/nokia-dumbphones-ai-powered-buttons-this-week/"
      },
      {
        "name": "Digital Trends",
        "href": "https://www.digitaltrends.com/phones/hdm-just-launched-four-dumb-phones-with-a-nokia-badge-and-an-ai-button/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/nokia-hmd-ai-button-feature-phones.png",
      "alt": "A Nokia-branded feature phone with a physical keypad.",
      "credit": "Diamante Phi / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the 1780s the Hungarian engineer Wolfgang von Kempelen built a wooden box fitted with a bellows for lungs, a vibrating reed for vocal cords, and a rubber funnel of a mouth that a demonstrator squeezed and stopped with his fingers until it wheezed out recognizable words like 'Mama,' 'Papa' and 'Roma.' Audiences leaned in astonished that a contraption of leather and wind could seem to speak, half-charmed and half-suspecting a trick. The engraving above shows just such an 18th-century speaking machine, its keys and pipes laid bare. It is the same bargain HMD now offers: a plain, familiar object, this time a Nokia keypad phone, made to talk back through a dedicated button, its novelty hovering between marvel and gimmick just as Kempelen's box did two centuries ago.",
        "excerpt": "Von Kempelen's 'speaking machine' forced air from a bellows through a reed and a flexible leather resonator, its consonants shaped by an operator's fingers pressing against openings in the tube. Working it like an instrument, he coaxed out whole short words and phrases, the first device to synthesize connected human speech rather than isolated sounds. Contemporaries reported a voice that was uncanny and childlike, and argued over whether it was genuine science or clever showmanship.",
        "source": "Wolfgang von Kempelen, speaking machine (c. 1769-1791), described in Mechanismus der menschlichen Sprache",
        "href": "https://en.wikipedia.org/wiki/Wolfgang_von_Kempelen%27s_speaking_machine",
        "image": {
          "src": "/covers/nokia-hmd-ai-button-feature-phones--a0.png",
          "alt": "Engraving of an 18th-century speaking machine with bellows, pipes and a keyboard mechanism, labelled Fig. 1",
          "credit": "Engraving of von Kempelen's speaking machine, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On a December day in 1877 Thomas Edison walked into the New York offices of Scientific American, set a small tin-foil cylinder machine on a desk, and turned its crank; to the astonishment of the assembled editors the little box asked after their health and wished them good night in Edison's own recorded voice. No one had ever heard a machine reproduce human speech before, and the editors scrambled to describe a device that could hold a voice captive and give it back on demand. The tin-foil phonograph, a replica of which is shown above, was the original voice-in-a-box. HMD's feature phones update the wonder rather than invent it: press a button and a stored intelligence speaks, exactly the trick that made a roomful of hardened engineers marvel almost 150 years ago.",
        "excerpt": "Mr. Thomas A. Edison recently came into this office, placed a little machine on our desk, turned a crank, and the machine inquired as to our health, asked how we liked the phonograph, informed us that it was very well, and bid us a cordial good night.",
        "source": "\"The Talking Phonograph,\" Scientific American, Vol. 37, No. 25 (December 22, 1877)",
        "href": "https://archive.org/stream/scientific-american-1877-12-22/scientific-american-v37-n25-1877-12-22_djvu.txt",
        "image": {
          "src": "/covers/nokia-hmd-ai-button-feature-phones--a1.png",
          "alt": "Replica of Edison's 1877 tin-foil cylinder phonograph, a hand-cranked brass and wood machine",
          "credit": "Replica of Edison's 1877 tin-foil phonograph, photo by Gregory F. Maxwell, via Wikimedia Commons (GFDL 1.2)"
        }
      },
      {
        "category": "literary",
        "title": "In Robert Greene's Elizabethan comedy Friar Bacon and Friar Bungay, the friar labors seven years to build a head of brass that, once it speaks, will supposedly wall all England in protective bronze. He must catch its first words or the magic fails, yet when he finally sleeps and leaves the servant Miles to watch, the head utters only three cryptic fragments, 'Time is,' 'Time was,' 'Time is past,' before a mysterious hand shatters it. Miles mocks the oracle as an absurd waste of study, unimpressed that a marvel of engineering answers 'with syllables.' It is the oldest complaint about the talking machine, and precisely the one leveled at HMD's AI button: an object built at great effort to speak, dismissed by some users as delivering little more than a gimmick.",
        "excerpt": "THE BRAZEN HEAD. Time is.\nMILES. Time is! Why, Master Brazen-head, have you such a capital nose, and answer you with syllables, Time is? Is this all my master's cunning, to spend seven years' study about Time is?...\nTHE BRAZEN HEAD. Time was...\nTHE BRAZEN HEAD. Time is past.\nThen there is a flash of lightning and a hand appears, which breaks the Head with a hammer.",
        "source": "Robert Greene, Friar Bacon and Friar Bungay (c. 1590), Scene xi",
        "href": "https://www.luminarium.org/renascence-editions/greene2.html"
      },
      {
        "category": "literary",
        "title": "In E. T. A. Hoffmann's 1816 tale The Sandman, the student Nathanael falls hopelessly in love with Olimpia, a beautiful young woman who turns out to be a wind-up automaton assembled by a professor and an eye-maker. Through whole evenings of poured-out passion she answers only with a sighed 'Ach! Ach!', and Nathanael, hearing profundity in her mechanical silence, takes her cold rigidity for a deep and understanding soul. Others find her stiff, taciturn and stupid; he alone is enchanted, mistaking a talking device for a companion. The story anticipates exactly the split reaction to HMD's voice assistant: a manufactured voice in a familiar-seeming shell that some greet as a wonder and others wave off as a hollow trick.",
        "excerpt": "...for she sat with her eyes fixed unchangeably upon his, sighing repeatedly, \"Ach! Ach! Ach!\" Upon this Nathanael would answer, \"Oh, you glorious heavenly lady! You ray from the promised paradise of love! Oh! what a profound soul you have! my whole being is mirrored in it!\" and a good deal more in the same strain. But Olimpia only continued to sigh \"Ach! Ach!\" again and again.",
        "source": "E. T. A. Hoffmann, \"The Sand-Man\" (Der Sandmann, 1816), English translation",
        "href": "https://gutenberg.net.au/ebooks06/0605791h.html"
      },
      {
        "category": "artistic",
        "title": "On the Sistine Chapel ceiling Michelangelo painted the Delphic Sibyl (1509), a young prophetess who turns sharply from her open scroll as though startled by the voice speaking through her, her eyes wide and her lips just parted. In the ancient world the Delphic oracle was the ultimate voice-from-a-source, a human mouthpiece delivering the god's answers to anyone who came to ask. Michelangelo monumentalizes that idea of a seer who gives voice to hidden knowledge on demand. HMD's dedicated AI button revives the same ancient fantasy in the palm of the hand: press it and the small oracle in the box answers your question, sets your alarm, or opens your camera, the modern heir to the sibyl at Delphi.",
        "excerpt": "Michelangelo's fresco shows the Delphic Sibyl seated among painted marble, a book of prophecy held open in one hand as she twists to look outward, brow furrowed and mouth slightly open. Draped in blue, gold and green, she embodies the prophetic voice that answers those who consult it, a human vessel through which unseen knowledge is made to speak.",
        "source": "Michelangelo Buonarroti, The Delphic Sibyl, Sistine Chapel ceiling (1509), Vatican",
        "href": "https://commons.wikimedia.org/wiki/File:Michelangelo_-_Delphic_Sibyl.jpg",
        "image": {
          "src": "/covers/nokia-hmd-ai-button-feature-phones--a4.png",
          "alt": "Michelangelo's fresco of the Delphic Sibyl, a young prophetess with an open scroll turning to look outward",
          "credit": "Michelangelo, The Delphic Sibyl (1509), Sistine Chapel; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "This 1789 engraving by Joseph Racknitz shows a cutaway of the Mechanical Turk, the celebrated chess-playing automaton built by Wolfgang von Kempelen: a turbaned figure seated at a cabinet whose opened doors are meant to reveal only gears and clockwork. In truth a hidden human operator crouched inside worked the levers, so the 'thinking machine' was really a person's intelligence dressed in wood and brass. For decades audiences across Europe were dazzled, unsure whether they faced a genuine automaton or a clever fraud. It is the perfect emblem for HMD's talking phones, where the friendly voice on a retro keypad is in fact powered by remote AI software behind the scenes, an old familiar object given an uncanny new voice and, after 180 days, a fee.",
        "excerpt": "Racknitz's engraving diagrams the interior of von Kempelen's chess automaton, exposing panels, machinery and the cramped space where he believed the concealed operator sat. The turbaned Turk leans over its board as spectators are invited to marvel at a machine that seems to reason, while the real cleverness is hidden inside the cabinet, an early study in how a device can appear to possess a mind of its own.",
        "source": "Joseph Friedrich zu Racknitz, engraving of the Mechanical Turk, from Ueber den Schachspieler des Herrn von Kempelen (1789)",
        "href": "https://commons.wikimedia.org/wiki/File:Racknitz_-_The_Turk_3.jpg",
        "image": {
          "src": "/covers/nokia-hmd-ai-button-feature-phones--a5.png",
          "alt": "1789 engraving showing a cutaway of the Mechanical Turk chess automaton with its internal mechanism exposed",
          "credit": "Joseph Racknitz, engraving of the Mechanical Turk (1789); via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "hdfc-bank-q1-profit-rises",
    "headline": "HDFC Bank's quarterly profit rises 5% to 190.6 billion rupees as bad-loan provisions fall",
    "overview": "India's HDFC Bank, the country's largest private-sector lender, reported an April-June net profit of 190.6 billion rupees ($2.2 billion), up 5% from a year earlier, helped by a 79% drop in provisions for bad loans. Net interest income rose about 7% to 335.3 billion rupees, gross advances grew 15.4% and deposits climbed 14.7% year on year. Asset quality improved from a year ago, with gross non-performing assets at 1.17% of loans.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Business Standard",
        "href": "https://www.business-standard.com/companies/quarterly-results/hdfc-bank-q1fy27-results-net-profit-rises-5-to-19-060-cr-nii-grows-7-126071800598_1.html"
      },
      {
        "name": "Business Today",
        "href": "https://www.businesstoday.in/markets/stocks/story/hdfc-bank-q1-results-net-profit-rises-5-to-rs-19060-crore-nii-up-6-7-key-takeaways-543764-2026-07-18"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/hdfc-bank-q1-profit-rises.png",
      "alt": "An HDFC Bank branch sign in India.",
      "credit": "Jayanta / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1397 Giovanni di Bicci de' Medici moved his small bank from Rome to Florence and founded what would become the largest and most respected banking house in fifteenth-century Europe. Run as a single Florentine partnership that held the controlling share in each of its branches, from Venice to Bruges and London, the Medici bank refined the double-entry ledger and turned careful reckoning into dynastic power, its profits underwriting the family's rise to unofficial rule of the republic. Its fortune rested less on daring than on disciplined accounts, prudent credit and reserves held against loss. HDFC Bank's steadily compounding quarter, its swelling deposits and shrinking provisions, is the same old counting-house arithmetic that once built the house of Medici: patient, ledgered gain accumulating into a great financial estate.",
        "excerpt": "The Medici bank's founding is dated to 1397, when Giovanni di Bicci de' Medici separated his bank from his nephew's and moved it to Florence. It became the largest and most respected bank in Europe during its prime, operating branches across the continent as a single Florentine partnership. Among its contributions to banking and accounting was the improvement of the general ledger through the development of the double-entry system.",
        "source": "The Medici Bank (founded 1397), Florence",
        "href": "https://en.wikipedia.org/wiki/Medici_Bank",
        "image": {
          "src": "/covers/hdfc-bank-q1-profit-rises--a0.png",
          "alt": "Portrait of Giovanni di Bicci de' Medici, founder of the Medici bank",
          "credit": "Portrait of Giovanni di Bicci de' Medici (Uffizi), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "On 27 July 1694, three centuries after the Medici, a royal charter incorporated 'The Governor and Company of the Bank of England,' founded on a scheme by the Scottish projector William Paterson to lend a cash-strapped crown 1.2 million pounds for its war with France. The subscription was filled in just twelve days by 1,268 investors, from merchants and esquires to the king and queen themselves, binding public credit to a permanent institution of accounts. From that founding grew the modern architecture of deposits, reserves and disciplined lending on which great banks still stand. HDFC Bank, India's largest private-sector lender reporting swelling advances and deposits, is a distant heir to that 1694 counting-house model: the great chartered house of finance, prospering by prudent lending and the careful management of other people's money.",
        "excerpt": "The Bank of England was established by royal charter on 27 July 1694 under the Tonnage Act, its subscribers incorporated as 'The Governor and Company of the Bank of England.' Proposed by William Paterson to fund the government during the Nine Years' War, it raised 1.2 million pounds in just twelve days from 1,268 subscribers, including King William and Queen Mary. From this founding grew the modern system of public credit and central banking.",
        "source": "Founding of the Bank of England, 27 July 1694",
        "href": "https://www.bankofengland.co.uk/about/history",
        "image": {
          "src": "/covers/hdfc-bank-q1-profit-rises--a1.png",
          "alt": "The Sealing of the Bank of England Charter, 1694",
          "credit": "The Sealing of the Bank of England Charter, 1694, by Lady Jane Lindsay (1905), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "In the Gospel of Matthew, Jesus tells of a lord who, before a long journey, entrusts his money to three servants and later returns to reckon accounts with them. Two put the talents to work and double them, and are welcomed as 'good and faithful'; the third, who fearfully buried his single talent in the earth, is condemned, and told he ought at least to have put the money 'to the exchangers' to be repaid with interest. It is scripture's great parable of prudent stewardship: capital hidden away is capital wasted, while capital wisely lent and multiplied is rewarded. HDFC Bank's quarter, its advances up more than fifteen percent and its bad-loan provisions falling by nearly four-fifths, reads like the faithful servant's reckoning, money put to work, losses guarded against, and gain brought back to the lord of the ledger.",
        "excerpt": "25:14 For the kingdom of heaven is as a man travelling into a far country, who called his own servants, and delivered unto them his goods. 25:15 And unto one he gave five talents, to another two, and to another one; to every man according to his several ability; and straightway took his journey. 25:16 Then he that had received the five talents went and traded with the same, and made them other five talents. 25:17 And likewise he that had received two, he also gained other two. 25:18 But he that had received one went and digged in the earth, and hid his lord's money. 25:19 After a long time the lord of those servants cometh, and reckoneth with them. 25:20 And so he that had received five talents came and brought other five talents, saying, Lord, thou deliveredst unto me five talents: behold, I have gained beside them five talents more. 25:21 His lord said unto him, Well done, thou good and faithful servant: thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord. 25:26 His lord answered and said unto him, Thou wicked and slothful servant, thou knewest that I reap where I sowed not, and gather where I have not strawed: 25:27 Thou oughtest therefore to have put my money to the exchangers, and then at my coming I should have received mine own with usury.",
        "source": "Gospel of Matthew 25:14-27, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "literary",
        "title": "In 'The Way to Wealth' (1758), Benjamin Franklin gathers a quarter-century of Poor Richard's proverbs into the sermon of old Father Abraham, who preaches industry and thrift to a crowd waiting on an auction. His homely warnings against waste, that small expenses add up and that 'a small leak will sink a great ship,' turn frugality into a moral and financial science, the art of guarding what one has earned. The whole essay is a hymn to prudent gain and provision against loss. HDFC Bank's quarter tells the same lesson in a modern ledger: its 79 percent drop in bad-loan provisions and its improved asset quality are Franklin's careful housekeeping written large, the great house that prospers because it minds its small leaks.",
        "excerpt": "You may think perhaps, that a little Tea, or a little Punch now and then, Diet a little more costly, Clothes a little finer, and a little Entertainment now and then, can be no great Matter; but remember what Poor Richard says, Many a Little makes a Mickle. Beware of little expenses; A small Leak will sink a great Ship; and again, Who Dainties love, shall Beggars prove; and moreover, Fools make Feasts, and wise Men eat them. Buy what thou hast no Need of, and ere long thou shalt sell thy Necessaries.",
        "source": "Benjamin Franklin, 'The Way to Wealth' (1758)",
        "href": "https://monadnock.net/franklin/wealth.html"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys' 'The Moneylender and His Wife' (1514), in the Louvre, shows an Antwerp banker in his counting-house delicately weighing gold coins and pearls on a small balance, while his richly dressed wife, distracted from her illuminated book of devotion, turns her eyes toward the glinting money. Coins, rings, a convex mirror and account books crowd the table in exquisite detail, and the scene hovers between admiration for careful commerce and warning against worldly greed. It is the definitive portrait of the ledger and the scale, the meticulous reckoning of value that is banking's oldest ritual. HDFC Bank's quarterly results, weighing income against provisions, gains against losses on a vast balance, are the same act of measurement Matsys painted five centuries ago in the temple of coin.",
        "excerpt": "An oil-on-panel painting in which an Antwerp moneylender weighs gold coins and jewels on a fine balance, his wife beside him pausing over an illuminated prayer-book to watch the money. The table is laid with coins, rings, pearls, a weighing-scale and a convex mirror rendered in minute detail. The picture is at once a celebration of careful commerce and a moral meditation on the pull of worldly wealth.",
        "source": "Quentin Matsys, The Moneylender and His Wife (1514), Musee du Louvre",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010061690",
        "image": {
          "src": "/covers/hdfc-bank-q1-profit-rises--a4.png",
          "alt": "The Moneylender and His Wife by Quentin Matsys, 1514, a banker weighing gold coins beside his wife",
          "credit": "Quentin Matsys, The Moneylender and His Wife (1514), Musee du Louvre, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "A generation later, Marinus van Reymerswaele took up the same subject in 'The Moneychanger and His Wife' (1539), now in the Prado, painting a gaunt money-changer in an old-fashioned hat hunched over his coins while his wife records the sums in a ledger. Where Matsys was serene, Reymerswaele is sharper and almost caricatured, the faces intent, the coins heaped, the account-book open, emphasizing the relentless tallying at the heart of finance. The painting became one of the most copied images of the counting-house in Northern Europe, a byword for money weighed and written down. HDFC Bank's earnings statement, deposits up 14.7 percent and every rupee of provision counted and reckoned, is that ledger brought forward into the present, the endless, exacting bookkeeping on which a great house of finance is built.",
        "excerpt": "An oil painting of a lean money-changer seated at his table, counting and weighing coins, while his wife enters the figures in an open account-book. The scene is crowded with stacked coins, documents and the instruments of reckoning, its faces rendered with an almost satirical intensity. One of the most influential and frequently copied images of the counting-house in sixteenth-century Northern European art.",
        "source": "Marinus van Reymerswaele, The Moneychanger and His Wife (1539), Museo del Prado",
        "href": "https://commons.wikimedia.org/wiki/File:Marinus_Claesz._van_Reymerswaele_001.jpg",
        "image": {
          "src": "/covers/hdfc-bank-q1-profit-rises--a5.png",
          "alt": "The Moneychanger and His Wife by Marinus van Reymerswaele, 1539, a money-changer counting coins as his wife keeps the ledger",
          "credit": "Marinus van Reymerswaele, The Moneychanger and His Wife (1539), Museo del Prado, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "messi-argentina-spain-world-cup-final",
    "headline": "Lionel Messi's Argentina and Spain will meet in the men's World Cup final, with Argentina chasing back-to-back titles",
    "overview": "Argentina, captained by Lionel Messi, will face Spain in the men's World Cup final, a match pitting the defending champions against a Spanish side built around a younger generation. Messi told reporters that his team 'will give it our all,' as the tournament has been shadowed by off-field controversies, including a dispute over a Falklands banner and a starring role for U.S. President Donald Trump. Argentina is seeking to become the first team in decades to win consecutive World Cups.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxNU1NyaFA2YmFjazZUQm8yVHM4UkQ5Tmc5TzdkM19EWTFlem0yR3EyRlM1WUYwN2hnZDc3QjJKak1FT2JzdFYzdEk0S2xkaW9qaVlHcTFyc1ZmcXppa1kyMnhrVkJuMHJJaE5rT2ZnSG41MEUxQmV2d0U4XzAtRUJpQXRSZ0xLVXRxVWRlWjNlSU0zTlM0aUE?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxOelBSNFRlSzlVdFNZUUhXeWhfamtoSVYzSE85OE55bGZTMXk4em95bDRSamZ1eHZBdTkzWUViVFBDMXREbGlTMlQ0TWtGS29CdV9zclNLel8wQVdmcHdma3NLS0YyQVZBMmZXQmdtRHgzODhra3hNT1JYREM0TjhraFM2SU1sdGZBOUkzMWROVDVXZFUyXy13enBXSkNrUnNLeUJZYy05TjJuWDVrNFZZRnBLU2JuRWdhc2d2VTMxN1otY2dp?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/messi-argentina-spain-world-cup-final.png",
      "alt": "Lionel Messi in Argentina's blue-and-white striped jersey during a World Cup match.",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 7th-century-BC Italy, Rome and Alba Longa agreed to settle their war not with two full armies but with three brothers a side, the Horatii and the Curiatii, as Livy records in Book I of his History of Rome. The fate of two nations hung on one decisive contest, exactly as a World Cup final compresses a people's hopes into a single afternoon. When Messi's Argentina and Spain walk out, they too are champions chosen to carry an entire nation's pride into a winner-take-all combat. And like the lone surviving Horatius, the victor will be remembered forever while the vanquished are left to mourn.",
        "excerpt": "Therefore, in the name of heaven, since, not content with certain liberty, we are incurring the dubious risk of sovereignty and slavery, let us adopt some method, whereby, without much loss, without much blood of either nation, it may be decided which shall rule the other.\n[...]\nThe Roman, exulting, says, 'Two I have offered to the shades of my brothers: the third I will offer to the cause of this war, that the Roman may rule over the Alban.'",
        "source": "Livy (Titus Livius), The History of Rome, Book I, ch. 24-25 (the single combat of the Horatii and Curiatii), c. 27 BC; trans. D. Spillan, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/19725/19725-h/19725-h.htm"
      },
      {
        "category": "historical",
        "title": "On 16 July 1950, before nearly 200,000 spectators at the Maracana, underdog Uruguay beat host favourites Brazil 2-1 in the deciding match of the World Cup, the 'Maracanazo,' still the sport's most famous final upset. It is the shadow that hangs over every World Cup decider: proof that a favoured, dominant powerhouse can be toppled by a hungrier side on the day. As holders Argentina chase back-to-back titles against a rising Spanish generation, both camps know a final rewards nerve over reputation. Alcides Ghiggia's late winner silenced a stadium of 200,000, a reminder that in a title decider a nation's legacy is settled in a single game.",
        "excerpt": "The 1950 final round was decided in this last match, with Brazil needing only a draw before their own vast home crowd and Uruguay needing to win outright. Friaca put Brazil ahead early in the second half, but Juan Alberto Schiaffino equalised and Alcides Ghiggia struck the winner, and the Maracana fell into stunned silence. It endures as one of the greatest upsets in football history, the template for how a favoured side can be undone in a single decisive final.",
        "source": "The 1950 FIFA World Cup Final (the 'Maracanazo'), Uruguay 2-1 Brazil, Maracana Stadium, Rio de Janeiro, 16 July 1950.",
        "href": "https://en.wikipedia.org/wiki/1950_FIFA_World_Cup_Final"
      },
      {
        "category": "literary",
        "title": "In Book 23 of Homer's Iliad, Achilles stages funeral games for Patroclus, and the fiercest event is the chariot race, where seasoned champions strain every nerve for the prize and the glory of winning. Homer treats athletic contest as the arena where heroic identity is proved, the same stage on which Messi now seeks to crown his career. The charioteers' 'lust of victory' mirrors the intensity of a World Cup final, where mastery, cunning and heart decide who is remembered. It is the oldest literary template for what Argentina and Spain will enact: greatness measured in a single, watched contest.",
        "excerpt": "At one moment the chariots seemed to touch the ground, and then again they bounded into the air; the drivers stood erect, and their hearts beat fast and furious in their lust of victory. Each kept calling on his horses, and the horses scoured the plain amid the clouds of dust that they raised.",
        "source": "Homer, The Iliad, Book XXIII (the funeral games of Patroclus), trans. Samuel Butler (1898); Internet Classics Archive, MIT.",
        "href": "http://classics.mit.edu/Homer/iliad.23.xxiii.html"
      },
      {
        "category": "literary",
        "title": "Pindar's Olympian Ode I, composed around 476 BC for Hieron of Syracuse's victory in the horse race, is the supreme ancient hymn to athletic triumph, declaring no games greater than the Olympic and promising the champion undying fame in song. Pindar understood what a final confers: not just a trophy but immortality in memory, the poet's task being to make a victor's glory permanent. Messi, at his last stand, plays for exactly this Pindaric prize, a legacy sealed by winning the greatest contest of all. Spain's young side chases the same laurel, knowing the winner's name will be sung for generations.",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth\n[...]\nso neither shall we find any games greater than the Olympic whereof to utter our voice: for hence cometh the glorious hymn and entereth into the minds of the skilled in song",
        "source": "Pindar, Olympian Ode I (for Hieron of Syracuse), c. 476 BC; trans. Ernest Myers (1874), Wikisource.",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/1"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David's 'Oath of the Horatii' (1784, Musee du Louvre) freezes the moment before that Roman single combat: three brothers salute the swords their father raises, bodies rigid with a collective resolve to win or die for the nation. The painting distills a final's essence, unity, sacrifice and the terrible weight of representing your people in one decisive clash. Its taut male figures, set against the collapsing, grieving women at the right, capture both the glory and the cost of such a contest. Set before Argentina against Spain, it reads as the emotional charge a captain like Messi asks of his team: everything, offered for a single victory.",
        "excerpt": "David's vast neoclassical canvas locks three young warriors in a single diagonal thrust as they stretch their arms toward the gleaming swords their father holds aloft against a stark colonnade. The men are all sharp lines and coiled muscle, sworn as one to the fate of their city, while the softly curved, weeping women slumped to the right embody everything at stake. The severe geometry and cold clarity make the image feel like the held breath before a decisive contest.",
        "source": "Jacques-Louis David, Oath of the Horatii (Le Serment des Horaces), 1784, oil on canvas, Musee du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David,_Le_Serment_des_Horaces.jpg",
        "image": {
          "src": "/covers/messi-argentina-spain-world-cup-final--a4.png",
          "alt": "Jacques-Louis David's painting The Oath of the Horatii, three brothers swearing on raised swords held by their father while women grieve at the right",
          "credit": "Jacques-Louis David (1784), Musee du Louvre; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The 'Charioteer of Delphi' (c. 470 BC, Delphi Archaeological Museum) is a life-size bronze dedicated by the Sicilian ruler Polyzalos to commemorate a victory in the chariot race of the Pythian Games, the ancient world's monument to a champion's triumph. Serene and upright, the reins still in his hand and his inlaid eyes gazing calmly outward, the victor embodies mastery held with grace at the moment of glory. It is the sculptural ideal of the athletic champion whose win is cast in bronze for the ages. For Messi, chasing a final that would immortalise his legacy, it is the perfect emblem: victory made permanent.",
        "excerpt": "One of the finest surviving bronzes of antiquity, the Charioteer stands calm and erect in a long pleated tunic, the reins of his vanished team still gathered in an outstretched hand. His copper lips, silver-banded headband and inlaid glass eyes give the face a startling living presence, the composed dignity of a man at the instant of his greatest win. Once part of a full chariot group set up at Delphi, he survives as the enduring image of the victorious athlete honoured for all time.",
        "source": "Charioteer of Delphi (Heniokhos), c. 470 BC, bronze, Delphi Archaeological Museum, Greece.",
        "href": "https://commons.wikimedia.org/wiki/File:Delphi_charioteer_front_DSC06255.JPG",
        "image": {
          "src": "/covers/messi-argentina-spain-world-cup-final--a5.png",
          "alt": "The bronze Charioteer of Delphi, a life-size ancient Greek statue of a victorious chariot driver holding the reins",
          "credit": "Charioteer of Delphi, c. 470 BC, Delphi Archaeological Museum; photo via Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "iran-gulf-states-kuwait-desalination",
    "headline": "Iran strikes Gulf Arab states and damages a Kuwait desalination plant as the U.S. carries out a seventh straight night of strikes on Iran",
    "overview": "Iran launched a new wave of attacks on U.S.-allied Gulf Arab states, with one strike damaging a desalination plant in Kuwait and exposing the region's water vulnerability, after the U.S. military completed a seventh consecutive night of strikes on Iranian targets. The widening exchange has drawn in more of the Gulf and raised fears for the region's energy and water infrastructure. Both sides have signalled they will keep up the pressure.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNUVgwRnh4bGg5bXVrMEdSNXEydXpjb0dCTmQwQlV2MHlydHJTU05DcUxIbktrZW82aGUwZ2F4R2h6bkJXOEpFQy1DREthRVFySzUzNkpVMGNSdXdTMlVjVFR4ZTkyYlRqRTU4bEo1cHR1Y3RMSDJ0UV9Ed01tbnVZbUdyN29ZZWpqQU5VZDd3b3dkS0VlMVp5UUJSZHdPVUUzVjZGNmFHWUJOYWVFZDd0ekJnV293QTg?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQRGVJbndDX0t6eVRMcXVhUEtKLVlUYmJZeG5yYWNja0VPdU9nYTRuN25NeVRYcGNhaU5YT1poZW5LN2ZxUHRXaFhOZnp5Y2V6YnpUdWxaWUEyZlMzc2M0c1lIaUxIMmVpMkwza1NUSXAtbkhZNmYyekcxaFJTNmdTckhQamhyNHEyM2JickFyUFNMOVVLM1F5WVFkUlFmdHJIMVd3LWFJTmw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/iran-gulf-states-kuwait-desalination.png",
      "alt": "A large seawater desalination plant on the coast.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 539 BC Cyrus the Great captured Babylon by turning water itself into a weapon. According to Herodotus, the Persian king diverted the Euphrates into an old marsh-basin until the river that ran through the city sank to a man's thigh, then marched his soldiers up the drained riverbed and into the town. It is the founding image, in this very region between Persia and Mesopotamia, of controlling water to break an enemy. The strike on a Kuwaiti desalination plant is the mirror inverse: instead of draining a river to enter a city, a modern combatant threatens the water a Gulf city needs to live, proving that in the desert the water supply is still the softest and most decisive target.",
        "excerpt": "he turned the Euphrates by a canal into the basin, which was then a marsh, on which the river sank to such an extent that the natural bed of the stream became fordable.\n\nHereupon the Persians who had been left for the purpose at Babylon by the river-side, entered the stream, which had now sunk so as to reach about midway up a man's thigh, and thus got into the town.",
        "source": "Herodotus, The Histories, Book 1.190–191, trans. George Rawlinson.",
        "href": "https://www.livius.org/sources/content/herodotus/cyrus-takes-babylon/",
        "image": {
          "src": "/covers/iran-gulf-states-kuwait-desalination--a0.png",
          "alt": "The Cyrus Cylinder, a Babylonian clay barrel recording Cyrus the Great's capture of Babylon in 539 BC.",
          "credit": "The British Museum, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "During the Iran–Iraq War the fighting spilled across the whole Persian Gulf in the 'Tanker War' of the mid-1980s, when Iran and Iraq attacked hundreds of merchant ships and Iran struck at Kuwait's tankers and oil facilities to punish the emirate for backing Baghdad. Kuwait's appeal for protection drew the United States directly into the Gulf in 1987 under Operation Earnest Will, escorting reflagged Kuwaiti tankers with warships. It is the closest precedent for the present event: a bilateral war widening by retaliation until it lands on U.S.-allied Gulf Arab states and pulls in American forces. Then as now, Iran answered pressure by hitting the vulnerable civilian and economic lifelines of its neighbors, and Kuwait again found itself in the line of fire.",
        "excerpt": "The 'Tanker War' phase of the Iran–Iraq conflict (1984–88) saw Iran and Iraq attack neutral merchant shipping across the Persian Gulf, with Iran striking Kuwaiti tankers and installations in reprisal for Kuwait's support of Iraq. In December 1986 Kuwait asked Washington for protection, and in July 1987 the U.S. Navy launched Operation Earnest Will, reflagging Kuwaiti tankers as American vessels and escorting them through the Gulf in the largest convoy operation since World War II.",
        "source": "The Tanker War and Operation Earnest Will, Persian Gulf, 1984–1988 (Iran–Iraq War).",
        "href": "https://en.wikipedia.org/wiki/Tanker_war",
        "image": {
          "src": "/covers/iran-gulf-states-kuwait-desalination--a1.png",
          "alt": "U.S. Navy warships escort the tanker Gas King through the Persian Gulf, 21 October 1987, during Operation Earnest Will.",
          "credit": "U.S. Navy photograph, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus's tragedy The Persians (472 BC) is the oldest surviving play in the world, and it stages a war between Persia and its foes from the losing side, as the Persian court learns that Xerxes' vast host has been annihilated at Salamis. The drama is built on the theme of hubris meeting retribution: an empire that overreached is broken, and the stage fills with the grief of a people counting their dead. Told sympathetically from Persia's own perspective, it warns how quickly a campaign of dominance curdles into ruin and mourning. Read against today's widening war, it is a reminder that escalation is measured in the end by the wailing of civilians, whichever power began it.",
        "excerpt": "Wo to the land of Persia, once the port\nOf boundless wealth, how is thy glorious state\nVanish'd at once, and all thy spreading honours\nFall'n, lost!...\nPersians, the whole barbaric host is fall'n.\nCHORUS\nO horror, horror! What a baleful train\nOf recent ills! Ah, Persians, as he speaks\nOf ruin, let your tears stream to the earth.",
        "source": "Aeschylus, The Persians (472 BC), trans. Robert Potter; Messenger's speech.",
        "href": "https://classics.mit.edu/Aeschylus/persians.html"
      },
      {
        "category": "literary",
        "title": "The Book of Isaiah records the Assyrian king Sennacherib's siege of Jerusalem, where his field commander taunts the starving defenders about their food and water, promising them their own vine, fig tree and cistern only if they surrender. Water is at the center of the threat: to besiege a city is to strangle its supply. The story ends with sudden catastrophe visited on the Assyrian host, the classic scriptural warning that the aggressor who preys on a people's basic sustenance meets a terrible reckoning. The passage speaks directly to a war now aimed at desalinated water and civilian infrastructure, and to the ancient truth that thirst is the sharpest instrument of siege.",
        "excerpt": "[Isaiah 36:16] Hearken not to Hezekiah: for thus saith the king of Assyria, Make an agreement with me by a present, and come out to me: and eat ye every one of his vine, and every one of his fig tree, and drink ye every one the waters of his own cistern;\n[17] Until I come and take you away to a land like your own land, a land of corn and wine, a land of bread and vineyards.\n[37:36] Then the angel of the LORD went forth, and smote in the camp of the Assyrians a hundred and fourscore and five thousand: and when they arose early in the morning, behold, they were all dead corpses.",
        "source": "The Book of Isaiah 36:16–17; 37:36, King James Version.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Isaiah",
        "image": {
          "src": "/covers/iran-gulf-states-kuwait-desalination--a3.png",
          "alt": "Assyrian palace relief depicting Sennacherib's siege of the city of Lachish in 701 BC.",
          "credit": "Nineveh palace relief, The British Museum, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens's oil painting The Defeat of Sennacherib (c. 1612–1614, Alte Pinakothek, Munich) turns the Isaiah story into a churning nocturnal catastrophe: the Assyrian army and its horses are hurled backward in a tangle of light and shadow as a heavenly force scatters the invaders in an instant. It is one of the great Baroque images of an overwhelming attack visited upon an aggressor without warning, all violence and reversal. As a war painting it captures exactly the vertigo of sudden escalation, the moment when a mighty striking force is itself overtaken by chaos. Set beside a seventh straight night of strikes and answering blows across the Gulf, it visualizes the terrifying speed with which a campaign can turn into a scene of ruin.",
        "excerpt": "A tumult of rearing horses and falling soldiers fills the canvas as a burst of divine light routs Sennacherib's army in the dark. Rubens sends the whole Assyrian host recoiling in a single violent instant, armor and flesh dissolving into shadow. The painting stages war as sudden, total reversal, the striking force struck down.",
        "source": "Peter Paul Rubens, The Defeat of Sennacherib, c. 1612–1614, oil on panel, Alte Pinakothek, Munich.",
        "href": "https://en.wikipedia.org/wiki/The_Defeat_of_Sennacherib",
        "image": {
          "src": "/covers/iran-gulf-states-kuwait-desalination--a4.png",
          "alt": "Rubens's Baroque painting The Defeat of Sennacherib, showing the Assyrian army routed at night by a heavenly force.",
          "credit": "Peter Paul Rubens, Alte Pinakothek, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel's oratorio Belshazzar (HWV 61, composed 1744), on a libretto by Charles Jennens, sets to music the very campaign of Cyrus against Babylon, including the stratagem of draining the Euphrates and marching along its bed to take the city. The score moves from the doomed feast and the writing on the wall to the conqueror's river-diversion and the fall of a great capital, making music out of a war decided by control of water. It is the artistic bookend to this whole cluster: the same Persian-Mesopotamian drama of siege, sudden reversal, and a diverted river, now sung. Heard against a Gulf war in which a water plant becomes a target, its choruses of triumph and lament underline how old and how musical the theme of water as the hinge of war really is.",
        "excerpt": "Handel's oratorio dramatizes the fall of Babylon, following Cyrus as he is seized by the idea of draining the Euphrates and leading his army into the city along the empty riverbed. Solemn choruses of feasting and doom give way to the triumphant Persians and the conquered captives, turning a war won by manipulating a river into sung tragedy and deliverance. The music makes vivid, three centuries on, the same theme of water as the decisive weapon of a regional war.",
        "source": "George Frideric Handel, Belshazzar, HWV 61 (composed 1744, premiered 1745), libretto by Charles Jennens.",
        "href": "https://imslp.org/wiki/Belshazzar,_HWV_61_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/iran-gulf-states-kuwait-desalination--a5.png",
          "alt": "Portrait of the composer George Frideric Handel by Balthasar Denner.",
          "credit": "Balthasar Denner, via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "ukraine-defense-minister-ousted",
    "headline": "Ukraine fights on under an interim defence chief after Zelensky's contested reshuffle removes the defence minister",
    "overview": "Ukraine is being run by an interim defence chief after President Volodymyr Zelensky's disputed government shake-up removed the country's defence minister, a move that has angered many soldiers who spoke to the BBC. The reshuffle comes at a precarious moment in the war with Russia. Critics say its timing risks disrupting the military's command as heavy fighting continues.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOTVpfV3hyQU9laFE5UWxLVVl2QmtxellGOTVLUmVnZjRGYm9CSVpWZGFnS3ZDMnlGNE5xYzhZc0Y4Mm1WTUxqNVY1N0FsWk9tbFZLS3ZWbXFSMXFuRXJQdWZfWnk0MlA2N3NDaXhZV0ZqZ3NOYkE2YXJ1V2tqNUQ1Sk9uRTlUMkxiQkJpYzlMaVBrUUFmNWowSFVKR21VQzdFRndyOFlB?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cvg8w4dpjkwo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/ukraine-defense-minister-ousted.png",
      "alt": "The Ukrainian flag flying against a grey sky.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 406 BC, after Athenian commanders won the great sea battle of Arginusae against Sparta but failed, in a rising storm, to rescue survivors and recover the dead, the Athenian assembly turned on its own victorious generals. As Xenophon records in the Hellenica, the people at home deposed the entire board of generals in the middle of the war and then condemned eight of them, executing the six who were in Athens. It became the classic warning of a wartime democracy purging its military command in a fit of anger and political passion, throwing away experienced leadership while Sparta still pressed at sea. Like Kyiv's contested removal of its defence minister in the middle of the fight with Russia, it shows how the bond between civic authority and its fighting commanders can snap under the strain of war, and how the army pays the price.",
        "excerpt": "All the above-named generals, with the exception of Conon, were presently deposed by the home authorities.\n\n... by the votes recorded the eight generals were condemned, and the six who were in Athens were put to death.",
        "source": "Xenophon, Hellenica, Book I, Chapter 7, trans. H. G. Dakyns (Project Gutenberg).",
        "href": "https://www.gutenberg.org/files/1174/1174-h/1174-h.htm"
      },
      {
        "category": "historical",
        "title": "On November 5, 1862, in the middle of the American Civil War, President Abraham Lincoln issued the terse executive order relieving Major-General George B. McClellan of command of the Army of the Potomac and installing Ambrose Burnside in his place. McClellan was popular with his soldiers, who idolized 'Little Mac,' and his abrupt dismissal by the civilian commander-in-chief exposed the raw tension between political leadership and a beloved general in the field. Lincoln judged McClellan too cautious after Antietam; the reshuffle rippled through the ranks and unsettled the army mid-campaign. The episode mirrors Ukraine's contested wartime shake-up: a head of state overriding his war chief in the middle of a conflict, weighing political judgment against the loyalty troops feel toward their commander.",
        "excerpt": "By direction of the President, it is ordered that Major-General McClellan be relieved from the command of the Army of the Potomac, and that Major-General Burnside take the command of that army; also that Major-General Hunter take command of the corps in said army which is now commanded by General Burnside; that Major-General Fitz John Porter be relieved from the command of the corps he now commands in said army, and that Major-General Hooker take command of said corps.\n\nThe General in Chief is authorized, in (his) discretion, to issue an order substantially as the above forthwith, or so soon as he may deem proper.\n\nA. LINCOLN.",
        "source": "Abraham Lincoln, 'Executive Order—Relieving General G. B. McClellan and Making Other Changes,' November 5, 1862.",
        "href": "https://www.presidency.ucsb.edu/documents/executive-order-relieving-general-g-b-mcclellan-and-making-other-changes",
        "image": {
          "src": "/covers/ukraine-defense-minister-ousted--a1.png",
          "alt": "President Lincoln and General George B. McClellan seated facing each other in the general's tent at Antietam, October 1862.",
          "credit": "Photograph by Alexander Gardner, October 1862. Library of Congress Prints and Photographs Division; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The founding quarrel of Western literature, in Book I of Homer's Iliad, is a dispute over command and honor between the supreme leader Agamemnon and his greatest warrior, Achilles. When Agamemnon is forced to give up his prize, he humiliates Achilles by seizing Briseis instead, asserting his authority as commander over the fighter the army most reveres. Achilles withdraws in fury, and the Greek host suffers grievously for the rupture between political-military leadership and its finest soldier. The scene distills the danger dramatized by Ukraine's reshuffle: when a ruler's assertion of authority collides with the loyalty and pride of the men who actually do the fighting, the whole war effort can falter.",
        "excerpt": "and thus will I do: since Phoebus Apollo is taking Chryseis from me, I shall send her with my ship and my followers, but I shall come to your tent and take your own prize Briseis, that you may learn how much stronger I am than you are, and that another may fear to set himself up as equal or comparable with me.”",
        "source": "Homer, The Iliad, Book I, trans. Samuel Butler (Project Gutenberg).",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt",
        "image": {
          "src": "/covers/ukraine-defense-minister-ousted--a2.png",
          "alt": "Roman wall painting from Pompeii showing Briseis being led away from Achilles by heralds.",
          "credit": "Wall painting from Pompeii (House of the Tragic Poet, VI 8 5), Naples National Archaeological Museum (inv. 9105); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare's Coriolanus dramatizes the collision between a formidable war-hero general and the civic authorities of Rome. Caius Marcius Coriolanus, whose battlefield valor saved the city, is stripped of standing and banished by the tribunes and the people in a bitter political struggle over who commands the loyalty of the state. In Act III, Scene 3, hearing his sentence, he flings the banishment back in their faces, defiant and contemptuous, before turning his back on Rome with the great line 'There is a world elsewhere.' The play captures the volatile aftermath of a wartime leadership rupture, the resentment of a soldier cast out by political leaders, and the peril of divorcing a proven commander from the cause he defended, echoing the anger of Ukrainian soldiers at their minister's removal.",
        "excerpt": "You common cry of curs, whose breath I hate\nAs reek o’ th’ rotten fens, whose loves I prize\nAs the dead carcasses of unburied men\nThat do corrupt my air, I banish you!\nAnd here remain with your uncertainty;\nLet every feeble rumour shake your hearts;\nYour enemies, with nodding of their plumes,\nFan you into despair! Have the power still\nTo banish your defenders, till at length\nYour ignorance—which finds not till it feels,\nMaking but reservation of yourselves,\nStill your own foes—deliver you,\nAs most abated captives to some nation\nThat won you without blows! Despising\nFor you the city, thus I turn my back.\nThere is a world elsewhere.",
        "source": "William Shakespeare, Coriolanus, Act III, Scene 3 (First Folio text, Project Gutenberg).",
        "href": "https://www.gutenberg.org/cache/epub/1535/pg1535.txt"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David's late masterpiece 'The Anger of Achilles' (1819), now in the Kimbell Art Museum, freezes the moment of a leadership rupture at the outbreak of the Trojan War. Agamemnon, the commander, stands calmly imposing his will, while Achilles' hand flies to his sword hilt, his face contorted with fury at the affront to his honor. The neoclassical composition makes visible the exact instant when authority and a warrior's pride become irreconcilable. It is a vivid emblem for Ukraine's contested reshuffle, the frozen breath before command friction erupts into open anger among the fighting men.",
        "excerpt": "David paints the confrontation with taut, statuesque restraint: four figures crowded against a dark ground, gestures poised on a knife-edge. Agamemnon's outstretched arm and cold gaze embody unbending command, while young Achilles grips his sword in barely contained rage and Iphigenia and Clytemnestra register the human cost between them. The painting makes command friction feel like a held breath about to break.",
        "source": "Jacques-Louis David, The Anger of Achilles (La Colère d'Achille), oil on canvas, 1819, Kimbell Art Museum, Fort Worth.",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_The_Anger_of_Achilles_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ukraine-defense-minister-ousted--a4.png",
          "alt": "Neoclassical painting: Agamemnon confronting an enraged Achilles who reaches for his sword, with two women between them.",
          "credit": "Jacques-Louis David, 'The Anger of Achilles' (1819), Kimbell Art Museum; public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven's 'Coriolan' Overture, Op. 62 (1807), written for Heinrich von Collin's tragedy on the Roman general Coriolanus, sets to music the same story of a war leader broken against the authority of the state. Its stabbing C-minor chords depict the proud, unyielding commander, while a tender contrasting theme pleads for restraint, dramatizing the tension between a soldier's defiance and the demands of the polity. The music collapses at the end into fading, hesitant pulses as the general's resolve, and the man himself, gives way. As a portrait of the danger and human toll of a rupture between a commander and the civic power he served, it resonates with Ukraine's fraught wartime removal of its defence chief.",
        "excerpt": "The overture erupts with three hammered unison C's answered by furious orchestral chords, the sound of an implacable warrior. Against this Beethoven sets a lyrical, imploring second theme, and the two forces contend without reconciliation. In the closing bars the driving pulse fragments into soft, broken pizzicato notes that die away, a musical image of a commander's downfall.",
        "source": "Ludwig van Beethoven, Coriolan Overture, Op. 62 (1807); scores at IMSLP.",
        "href": "https://imslp.org/wiki/Coriolan,_Op.62_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/ukraine-defense-minister-ousted--a5.png",
          "alt": "Oil portrait of Ludwig van Beethoven holding a manuscript, painted by Joseph Karl Stieler in 1820.",
          "credit": "Joseph Karl Stieler, portrait of Ludwig van Beethoven, 1820; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "ukraine-drones-russia-oil-depot",
    "headline": "Ukrainian drone attacks kill seven warehouse workers in Russia and set an oil depot ablaze near Moscow",
    "overview": "Waves of Ukrainian drones killed seven night-shift workers at a warehouse in Russia's Tambov region and injured dozens more, while a separate strike sparked a fire at an oil depot in Noginsk, about 50 kilometres east of the Kremlin, regional governors said. Moscow's mayor claimed hundreds of drones were launched toward the capital region and that many were shot down. It was among the largest Ukrainian drone assaults on the Moscow area of the war.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxQdy1tV0VCdllFYU1ydXJTWE1YbmM3TlZIYU5yLTZSQ243TVZacXFXc3lzVmxBMEtHNzJLS1RfWEk2bGViWHgxdVBaUjVjN0tZV1dDS1VXN3BvVTZsMW1PeENJbVNrOUZXVHY1UHUxLV9HVVlodFdhQnczQldxd0QtTWh1a2RwR3EteTVINHhfM0hpZlh2SGZyUS1RZlo1cDR6WXZlVHNDU0tHUEtsUFlwRkg5cGpJT2JrY09mQUZIalVfRmtG?oc=5"
      },
      {
        "name": "Kyiv Independent",
        "href": "https://kyivindependent.com/oil-depot-in-moscow-oblast-reportedly-struck-by-ukrainian-drones/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/ukraine-drones-russia-oil-depot.png",
      "alt": "Rows of large cylindrical oil storage tanks at a fuel depot.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 1 August 1943 — a day the airmen called Black Sunday — 178 American B-24 Liberators skimmed at treetop height over Ploiești, Romania, in Operation Tidal Wave, striking the refineries that supplied roughly sixty percent of Axis fuel. Like the Ukrainian drones reaching a depot near Moscow, the raid carried the war deep behind enemy lines to burn the fuel and supply that armies cannot fight without. The refineries erupted into walls of flame and black smoke, and 101 Romanian civilians on the ground were killed, some when a stricken bomber crashed into a Ploiești prison. It was the costliest air raid in U.S. history, and yet within weeks the refineries were producing again — a reminder of how stubbornly such infrastructure resists destruction.",
        "excerpt": "It was a strategic bombing mission and part of the oil campaign to deny petroleum-based fuel to the Axis powers. The Ploiești oil refining complex produced roughly sixty percent of the petroleum products used by the Axis in Europe. Flying at treetop height to evade radar, the B-24 crews met walls of smoke, exploding storage tanks, and intense flak; of some 1,750 airmen who set out, 310 were killed or missing, and the mission became the costliest major Allied air raid of the war.",
        "source": "Operation Tidal Wave (the low-level bombing of the Ploiești oil refineries, 1 August 1943), World War II Allied oil campaign.",
        "href": "https://en.wikipedia.org/wiki/Operation_Tidal_Wave"
      },
      {
        "category": "historical",
        "title": "In November 1864, General William Tecumseh Sherman put Atlanta's railroads, warehouses, foundries, and depots to the torch before marching to the sea, deliberately destroying the supply and transport that kept the Confederacy in the field. As with the drone strikes that gutted a warehouse and set an oil depot ablaze, the target was the enemy's home-front machinery of war, and the method was fire. Riding out of the city at dawn, Sherman turned to watch Atlanta smoldering behind him, a black pall of smoke hanging over the ruins. His campaign became the archetype of carrying destruction into an aggressor's own heartland to break its capacity to sustain a war.",
        "excerpt": "Behind us lay Atlanta, smouldering and in ruins, the black smoke rising high in air, and hanging like a pall over the ruined city. Away off in the distance, on the McDonough road, was the rear of Howard's column, the gun-barrels glistening in the sun, the white-topped wagons stretching away to the south.",
        "source": "William T. Sherman, Memoirs of General William T. Sherman, Vol. II (1875), on the departure from Atlanta, 16 November 1864.",
        "href": "https://www.gutenberg.org/cache/epub/4361/pg4361.txt"
      },
      {
        "category": "literary",
        "title": "In Book II of Virgil's Aeneid, Aeneas climbs to the palace roof and watches the great city of Troy consumed house by house in the night, the flames leaping from the palace of Deiphobus to the home of Ucalegon until even the distant sea glows with the reflected fire. It is the ancient image that the strikes near Moscow evoke: war reaching into the heart of a great capital, fire spreading in the dark, and the light of a burning city seen for miles. Virgil renders the catastrophe as both intimate and cosmic, a household ablaze and a whole civilization falling at once. Dryden's translation makes the flames roar with the roll of trumpets and rising clamor.",
        "excerpt": "The palace of Deiphobus ascends\nIn smoky flames, and catches on his friends.\nUcalegon burns next: the seas are bright\nWith splendour not their own, and shine with Trojan light.\nNew clamours and new clangours now arise,\nThe sound of trumpets mix'd with fighting cries.",
        "source": "Virgil, The Aeneid, Book II, translated by John Dryden (1697).",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations mourns Jerusalem after the Babylonian assault of 586 BC, when the enemy at last passed through the city's gates and a fire was kindled that devoured its very foundations. Its verses speak directly to the shock of destruction reaching a place long thought secure, the disbelief that walls could be breached and a capital set alight. Like the fires burning behind Russia's front lines and near its capital, the poem fixes on the moment a war thought to be far away suddenly consumes the home ground. The lament turns catastrophe into a keening chorus of grief for a fallen and burning city.",
        "excerpt": "The LORD hath accomplished his fury; he hath poured out his fierce anger, and hath kindled a fire in Zion, and it hath devoured the foundations thereof. The kings of the earth, and all the inhabitants of the world, would not have believed that the adversary and the enemy should have entered into the gates of Jerusalem.",
        "source": "Lamentations 4:11-12, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "Albrecht Adam's oil painting Napoleon in Burning Moscow (1841) shows the emperor and his staff on horseback silhouetted against a city turned into an inferno, the sky and clouds stained orange by the fires that gutted Moscow in September 1812. The German painter had ridden with the Grande Armée into Russia and rendered the scene as spectacle and omen: the invader stranded amid the flames of the very capital he had seized. The canvas speaks uncannily to fires near present-day Moscow — the war's violence turned back upon the aggressor's own soil, the great city burning in the night. It is at once a portrait of triumph curdling into ruin and a study of a capital ablaze.",
        "excerpt": "A history painting of Napoleon and his mounted officers halted before Moscow as the city burns, their dark forms sharp against a vast wall of flame and smoke. The whole sky glows with firelight, and the reflected blaze paints the horses and riders in lurid orange, capturing the moment an invasion is swallowed by the conflagration of the capital it captured.",
        "source": "Albrecht Adam (1786-1862), Napoleon in Burning Moscow, oil on canvas, 1841.",
        "href": "https://commons.wikimedia.org/wiki/File:Napoleon_in_burning_Moscow_-_Adam_Albrecht_(1841).jpg",
        "image": {
          "src": "/covers/ukraine-drones-russia-oil-depot--a4.png",
          "alt": "Painting of Napoleon and his officers on horseback before Moscow as the city burns behind them under a sky of orange flame and smoke.",
          "credit": "Albrecht Adam, Napoleon in Burning Moscow (1841). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Dmitri Shostakovich composed his Symphony No. 7 in C major, the Leningrad, in 1941 as German bombs and shells fell on his besieged city, and its famous first movement builds a relentless, mechanical march — the invasion theme — that swells from a whisper into a deafening, grinding assault. Premiered in starving Leningrad in August 1942 and broadcast toward the enemy lines, it became the sound of a great city under aerial and artillery bombardment refusing to fall silent. It captures precisely the atmosphere of these strikes: the drone of attack reaching the home front, the pounding of ordnance in the night, and the human cost beneath it. The music is both an act of witness and an act of defiance against the war brought to a capital's doorstep.",
        "excerpt": "In the first movement an innocent little tune is repeated over and over, growing louder and more menacing with each pass as drums and brass pile on, until it becomes a crushing march of mechanized violence — the sound of a war machine bearing down on a living city. Against it the strings mount a broken, grieving resistance, so that bombardment and mourning sound together in one vast orchestral crescendo.",
        "source": "Dmitri Shostakovich, Symphony No. 7 in C major, Op. 60 (Leningrad), 1941; premiered besieged Leningrad, 9 August 1942.",
        "href": "https://imslp.org/wiki/Symphony_No.7,_Op.60_(Shostakovich,_Dmitry)",
        "image": {
          "src": "/covers/ukraine-drones-russia-oil-depot--a5.png",
          "alt": "Photographic portrait of composer Dmitri Shostakovich in glasses, looking toward the camera.",
          "credit": "Deutsche Fotothek, portrait of Dmitri Shostakovich. CC BY-SA 3.0 DE, via Wikimedia Commons."
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "skyroot-vikram-1-orbital-launch",
    "headline": "India's Skyroot launches Vikram-1, the country's first privately developed orbital rocket, into a 450-km orbit",
    "overview": "Skyroot Aerospace launched Vikram-1, India's first privately built orbital rocket, from the Satish Dhawan Space Centre in Sriharikota, placing customer payloads into a roughly 450-kilometre orbit about 15 minutes after lift-off. The company called the maiden mission, dubbed 'Aagaman,' a 'grand success.' The flight is a milestone for India's push to win a larger share of the global commercial launch market.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNMUZqeXJNOXVSbW4yeUF2ZXdzY1Z4cWpPal9WRzI4RXYtYUdpR0s0WjdkNVZsRXpBMmFmRktTYTdDUE1CZG95dnQ3bkJLZzZDTlp6X05FVzBINmthbkhHaVhfUDRHTENxM2k1bzlvYjJ5aWU3TkljLWJNZVh0TXpPd3dIYlo5Qjg3bjAxZUdOelBXT0RwMWx4bmxxcUdTanpSRldzT2JFamRYcUhRcmVwVGtYTQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/clyekv7rld3o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/skyroot-vikram-1-orbital-launch.png",
      "alt": "A rocket lifting off on a plume of fire and smoke.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 21 November 1783, over the rooftops of Paris, Jean-Francois Pilatre de Rozier and the Marquis d'Arlandes rose into the sky aboard a Montgolfier hot-air balloon, the first human beings ever to fly free of the earth. Their fragile paper-and-linen craft, warmed by a straw fire, drifted some twelve kilometers in twenty-five minutes and proved that ordinary people, not just birds and gods, could ascend into the heavens. Like Skyroot's Vikram-1 climbing to a 450-km orbit, it was a maiden voyage that turned a long-held human dream of flight into engineering fact. Both flights announced that a new frontier, once the domain of imagination alone, had been opened by daring builders.",
        "excerpt": "On 21 November 1783 the Montgolfier brothers' hot-air balloon carried Pilatre de Rozier and the Marquis d'Arlandes aloft from the Chateau de la Muette, the first manned free flight in history. Rising to roughly 3,000 feet and sustained only by a fire of straw, the two aeronauts floated across Paris before landing safely near the Butte-aux-Cailles. In a single quarter of an hour, humankind's ancient longing to leave the ground became a demonstrated reality.",
        "source": "The first manned free flight of the Montgolfier balloon, Paris, 21 November 1783. See 'Montgolfier brothers,' Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Montgolfier_brothers",
        "image": {
          "src": "/covers/skyroot-vikram-1-orbital-launch--a0.png",
          "alt": "Contemporary 1783 engraving by Claude-Louis Desrais depicting the ascent of a Montgolfier manned hot-air balloon in Paris.",
          "credit": "Engraving by Claude-Louis Desrais (1746-1816), 1783; Bildarchiv Preussischer Kulturbesitz, Berlin. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 19 April 1975, India launched Aryabhata, its first satellite, an experimental spacecraft built by the young Indian Space Research Organisation and named for the sixth-century astronomer-mathematician of the same name. That launch announced that India could design and build its own machines for space, planting the seed of a national space ambition. Skyroot's Vikram-1, half a century later, extends that same arc: where Aryabhata was the state's first satellite named for an ancient Indian sage, Vikram-1 is the nation's first privately built orbital rocket, named for Vikram Sarabhai, father of India's space program. Both mark a proud step in a nation's steady ascent toward the stars.",
        "excerpt": "Aryabhata, India's first satellite, was launched on 19 April 1975 from Kapustin Yar aboard a Soviet Kosmos-3M rocket, a 360-kg, 26-sided spacecraft built to study X-ray astronomy, aeronomics, and solar physics. Named after the classical Indian astronomer Aryabhata, it was the first satellite designed and constructed in India, a founding milestone for ISRO. Its image was proud enough to appear on the Indian two-rupee note from 1976 to 1997.",
        "source": "Aryabhata satellite, launched 19 April 1975; built by the Indian Space Research Organisation (ISRO). See 'Aryabhata (satellite),' Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Aryabhata_(satellite)",
        "image": {
          "src": "/covers/skyroot-vikram-1-orbital-launch--a1.png",
          "alt": "Photograph of Aryabhata, India's first satellite, a 26-sided polyhedron spacecraft built by ISRO and launched in 1975.",
          "credit": "Indian Space Research Organisation (ISRO). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book VIII of Ovid's 'Metamorphoses,' the master craftsman Daedalus builds wings of feathers and wax so that he and his son Icarus can escape Crete by flying, the archetypal Western myth of human beings engineering their own flight. Daedalus warns Icarus to hold a middle course, neither so low that the sea soaks the wings nor so high that the sun melts them, a caution every launch engineer would recognize. Skyroot's Vikram-1 is the triumphant, disciplined answer to the myth's warning: private builders fashioning a machine to climb into the heavens and, unlike Icarus, keeping precisely to their intended path to a 450-km orbit. The ancient story of daring toward the sky finds a controlled, successful echo in a rocket that reaches space and stays its course.",
        "excerpt": "'Icarus, I recommend thee to keep the middle tract; lest, if thou shouldst go too low, the water should clog thy wings; if too high, the fire _of the sun_ should scorch them.'\n[...]\nwhen the boy began to be pleased with a bolder flight, and forsook his guide; and, touched with a desire of reaching heaven, pursued his course still higher. The vicinity of the scorching Sun softened the fragrant wax that fastened his wings.",
        "source": "Ovid, Metamorphoses, Book VIII (the myth of Daedalus and Icarus), literal English prose translation by Henry T. Riley. Project Gutenberg eBook #26073.",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "Jules Verne's 1865 novel 'From the Earth to the Moon' imagines an American gun club building a colossal cannon, the Columbiad, to fire a projectile carrying passengers into space, one of the first works to treat spaceflight as a concrete engineering project rather than fantasy. Its climactic chapter, titled 'Fire!', delivers the countdown, the electric spark, the earth-shaking detonation, and the projectile hurled victoriously into the sky. Written more than a century before real rockets flew, it anticipated the theatre of the modern launch that Skyroot's Vikram-1 enacted for real, a purpose-built vehicle roaring off the pad and vanishing upward toward the heavens. Verne's fictional first shot at the stars prefigures a maiden orbital flight born of private ingenuity and audacious ambition.",
        "excerpt": "\"Thirty-five!--thirty-six!--thirty-seven!--thirty-eight!--thirty-nine!--forty! FIRE!!!\" Instantly Murchison pressed with his finger the key of the electric battery, restored the current of the fluid, and discharged the spark into the breech of the Columbiad. An appalling unearthly report followed instantly, such as can be compared to nothing whatever known, not even to the roar of thunder, or the blast of volcanic explosions! An immense spout of fire shot up from the bowels of the earth as from a crater. The earth heaved up, and with great difficulty some few spectators obtained a momentary glimpse of the projectile victoriously cleaving the air in the midst of the fiery vapors!",
        "source": "Jules Verne, From the Earth to the Moon, Chapter XXVI, 'Fire!' (1865; English translation). Project Gutenberg eBook #83.",
        "href": "https://www.gutenberg.org/ebooks/83"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's painting 'Landscape with the Fall of Icarus' (c. 1555-1560s, Royal Museums of Fine Arts of Belgium, Brussels) shows a sunlit sea and a ploughman at work while, almost unnoticed in a corner, Icarus's legs vanish beneath the waves after his fall. The painting is a meditation on human aspiration and the ancient dream, and danger, of flying toward the sun. Set beside Skyroot's successful Vikram-1 launch, Bruegel's quiet tragedy throws the achievement into relief: the same human longing to leave the earth that once ended in a splash now, through careful private engineering, ends in a rocket safely reaching a 450-km orbit. Where the myth painted a fall, India's maiden private orbital flight paints an ascent completed.",
        "excerpt": "In a luminous coastal landscape, a farmer steers his plough and ships sail calmly on a golden sea while, easily missed in the lower right, only Icarus's pale flailing legs remain above the water as he drowns. The vast, indifferent world carries on around the fallen dreamer, the sun that undid him still low and bright on the horizon. The composition turns the mythic ambition to fly into a small, poignant detail dwarfed by ordinary life.",
        "source": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus, oil on canvas, c. 1555-1560s. Royal Museums of Fine Arts of Belgium, Brussels.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/skyroot-vikram-1-orbital-launch--a4.png",
          "alt": "Pieter Bruegel the Elder's painting Landscape with the Fall of Icarus, showing a ploughman and ships as Icarus's legs disappear into the sea.",
          "credit": "Pieter Bruegel the Elder, c. 1555-1560s; Royal Museums of Fine Arts of Belgium, Brussels. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gustav Holst's orchestral suite 'The Planets,' Op. 32 (1914-1917), gives musical character to the worlds of the solar system, from the hammering menace of 'Mars' to the soaring, hymn-like grandeur of 'Jupiter, the Bringer of Jollity' and the quicksilver dash of 'Mercury, the Winged Messenger.' It is the most famous music of the heavens, turning the night sky into sweeping, aspirational sound. Its spirit of reaching outward and upward suits the triumph of Skyroot's Vikram-1, a private rocket lifting a nation's hopes into orbit. Holst's score is the kind of grand, ascending music one imagines playing as a maiden vehicle climbs toward the stars.",
        "excerpt": "Holst's suite conjures the cosmos in sound: 'Mercury, the Winged Messenger' darts with restless, silvery lightness, evoking swift flight, while 'Jupiter, the Bringer of Jollity' unfolds a broad, majestic melody that swells into one of the most stirring anthems of ascent in the orchestral repertoire. Brass and strings build a sense of vast open space and upward striving. The music feels made for the moment a craft leaves the ground and reaches for the heavens.",
        "source": "Gustav Holst, The Planets, Op. 32 (1914-1917), orchestral suite. Full score, public domain, via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)",
        "image": {
          "src": "/covers/skyroot-vikram-1-orbital-launch--a5.png",
          "alt": "Portrait photograph of English composer Gustav Holst, composer of the orchestral suite The Planets.",
          "credit": "Photograph by Herbert Lambert (1881-1936), c. 1921; National Portrait Gallery. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "norway-drammen-fire-homes-destroyed",
    "headline": "A fire in Norway destroys more than 100 homes near Drammen and spreads into surrounding forests",
    "overview": "A fire that began in a townhouse in Drammen, about 50 kilometres west of Oslo, destroyed more than 100 homes on Friday and spread into nearby forests, forcing hundreds of residents to evacuate. More than 60 firefighters, aided by water-dropping helicopters, battled the blaze into Saturday. No casualties were reported, and the cause was not immediately clear.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNeXZ4SFJQQnBFWmtET1E1cGF2MmY1VTBTRXcta3FCaVduQ3dFZ2F0U1AyMnFUZ1h0QVN4YmFYdGtEeHE5ZnJYd2NGUENWaUpmM3RKR1N4aUJQeEUtVFhJRkZVcUVzNWFxeXZMODJyT2RaN3VYQVQ1WHViOTQ2Ukh4RnowSEc3WWtGZ0hwVnpLd3pJSEtBUDJ6ZE8xNXdQZw?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-17/hundred-homes-damaged-as-fire-rips-through-town-near-oslo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/norway-drammen-fire-homes-destroyed.png",
      "alt": "Helicopters dropping water over a large fire and smoke near a Norwegian town.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of London, September 1666, as recorded by the diarist John Evelyn. Just as the Drammen blaze leapt from a single townhouse to devour more than a hundred homes, London's fire spread street by street until much of the city stood in flame. Evelyn watched families drag their belongings into carts and boats and camp in open fields, exactly as hundreds fled the flames west of Oslo. His eyewitness account of a community in flight before an unstoppable conflagration is the archetype for a town consumed by fire.",
        "excerpt": "Oh, the miserable and calamitous spectacle! such as haply the world had not seen since the foundation of it, nor can be outdone till the universal conflagration thereof. All the sky was of a fiery aspect, like the top of a burning oven, and the light seen above forty miles round about for many nights. God grant mine eyes may never behold the like, who now saw above 10,000 houses all in one flame! The noise and cracking and thunder of the impetuous flames, the shrieking of women and children, the hurry of people, the fall of towers, houses, and churches, was like a hideous storm; and the air all about so hot and inflamed, that at the last one was not able to approach it, so that they were forced to stand still, and let the flames burn on, which they did, for near two miles in length and one in breadth.",
        "source": "John Evelyn, The Diary of John Evelyn, entry for 3 September 1666 (Great Fire of London), ed. William Bray, Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/42081/pg42081.txt",
        "image": {
          "src": "/covers/norway-drammen-fire-homes-destroyed--a0.png",
          "alt": "The Great Fire of London, c.1675, unknown artist, showing the city ablaze along the Thames with Old St Paul's in flames",
          "credit": "The Great Fire of London (c.1675), unknown artist, Museum of London. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Ålesund town fire of 23 January 1904, the greatest urban conflagration in modern Norwegian history. Beginning in a single factory in the small hours, the fire raced through a town built almost entirely of tightly packed timber and burned nearly the whole centre in a night, destroying some 850 houses and leaving around 10,000 people homeless in bitter winter. Like the families driven out near Drammen, the population fled into the cold as their wooden homes vanished. It is the closest Norwegian precedent for a community that loses its houses in a single, wind-driven blaze.",
        "excerpt": "The fire broke out around two in the morning on the island of Aspøya and, fanned by a strong storm wind, tore through streets of closely built wooden houses that were the norm in Norwegian towns of the day. By the time it was subdued almost the entire town centre was gone, with roughly 850 buildings destroyed and only about 230 houses left standing within the town borders. Nearly the whole population was driven out into a freezing January night, and international aid, much of it sent in the name of Kaiser Wilhelm II, poured in to shelter the homeless.",
        "source": "\"Ålesund fire\" (23 January 1904), Wikipedia, and Life in Norway, \"The Story of the Ålesund Fire of 1904.\"",
        "href": "https://en.wikipedia.org/wiki/%C3%85lesund_fire"
      },
      {
        "category": "literary",
        "title": "The burning of Troy in Book 2 of Virgil's Aeneid, in John Dryden's translation. Aeneas describes the flames leaping from house to house across the doomed city, the palace of Deiphobus collapsing in smoke and his neighbour Ucalegon's home catching next, until the very sea glows with the light of a burning town. It is Western literature's founding image of a settlement consumed by an uncontrollable fire while its people flee into the night, an ancient mirror of the flames spreading through homes and forest near Drammen.",
        "excerpt": "Then Hector’s faith was manifestly clear’d,\nAnd Grecian frauds in open light appear’d.\nThe palace of Deiphobus ascends\nIn smoky flames, and catches on his friends.\nUcalegon burns next: the seas are bright\nWith splendour not their own, and shine with Trojan light.\nNew clamours and new clangours now arise,\nThe sound of trumpets mix’d with fighting cries.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden, Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "Samuel Pepys's diary account of the Great Fire of London, 2 September 1666. Pepys, out on the Thames, watches ordinary people cling to their houses until the flames touch them and then scramble into boats, while even the pigeons refuse to abandon their homes until their wings burn. His close, human-scaled record of a community losing its dwellings to fire, and of the reluctance to flee, echoes the hundreds forced to evacuate the burning townhouses near Drammen.",
        "excerpt": "poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another. And among other things, the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.",
        "source": "Samuel Pepys, The Diary of Samuel Pepys, entry for 2 September 1666, Project Gutenberg (Volume 45: August/September 1666).",
        "href": "https://www.gutenberg.org/cache/epub/4167/pg4167.txt"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner's oil painting The Burning of the Houses of Lords and Commons, 16 October 1834 (Cleveland Museum of Art version). Turner rushed to the Thames to witness the Houses of Parliament ablaze and rendered the fire as a towering wall of orange and white heat that dissolves stone into pure light, with tiny crowds gathered helpless before it. The canvas captures the sublime terror of a great building consumed by fire, the same overwhelming scale of flame that turned a townhouse near Drammen into the ruin of a hundred homes.",
        "excerpt": "A vast furnace of yellow-white flame erupts against the night sky, its light smeared across the river and reflected in the water below. Against that inferno the crowds and boats are reduced to dark specks, powerless spectators to a fire that has swallowed a whole seat of government. Turner turns catastrophe into a spectacle of raw, uncontainable heat.",
        "source": "Joseph Mallord William Turner, The Burning of the Houses of Lords and Commons, 16 October 1834, oil on canvas, 1835, Cleveland Museum of Art (acc. 1942.647).",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_16_October_1834_-_1942.647_-_Cleveland_Museum_of_Art.jpg",
        "image": {
          "src": "/covers/norway-drammen-fire-homes-destroyed--a4.png",
          "alt": "Turner's painting of the Houses of Parliament engulfed in a towering blaze of white and orange flame reflected on the Thames",
          "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1835), Cleveland Museum of Art. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Great Fire of London, an anonymous oil painting of about 1675 held by the Museum of London. Painted within a decade of the disaster, it shows the city as a continuous curtain of flame stretching along the north bank of the Thames, with Old St Paul's and the medieval churches burning and the river crowded with fleeing boats. The panorama makes vivid what a wind-driven fire does to a town of packed houses, the very scene that unfolded as flames swept from home to home and into the forests near Drammen.",
        "excerpt": "The whole waterfront of the city is shown as one unbroken band of fire, throwing an angry glow over the Thames as smoke boils into a darkened sky. Old St Paul's and a skyline of church towers stand silhouetted against the flames, while the river fills with small boats carrying people and their salvaged belongings away from the burning shore. It is a portrait of an entire town on fire and a population in flight.",
        "source": "Unknown artist, The Great Fire of London, oil on panel, c.1675, Museum of London.",
        "href": "https://commons.wikimedia.org/wiki/File:Great_Fire_London.jpg",
        "image": {
          "src": "/covers/norway-drammen-fire-homes-destroyed--a5.png",
          "alt": "Anonymous c.1675 painting of the Great Fire of London: a wall of flame along the Thames with Old St Paul's burning and boats fleeing",
          "credit": "The Great Fire of London (c.1675), unknown artist, Museum of London. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "us-ends-endangered-species-blanket-protections",
    "headline": "The U.S. cancels automatic Endangered Species Act protections for newly listed threatened animals and plants",
    "overview": "The Interior Department rescinded a decades-old rule that automatically extended full protections to species listed as threatened, so newly listed plants and animals will instead require individual protection plans. Officials said the change adds flexibility for development, while critics warned it could speed extinctions and open habitat to drilling and mining. The blanket-protection rules dated to 1975 for wildlife and 1977 for plants.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxNamFyb3ZPb1RDQmxFdVN3SVRkRjVZcU9Fa1A1V2ZEdlQzZ2dnM0I0WXFLc3I4UjNab0c5Sm1vWWpzelZncnhWb1dNa1RZazJVSXUzRzducXJTWjVKT2JzNldOalktZTBFSmktQnl5d192MHExN0N6d2g0aEtrcUFsa2s5WDNTN2pmNmRzYkVyOG5LZFM3VVZXUzVFRQ?oc=5"
      },
      {
        "name": "The Philadelphia Inquirer",
        "href": "https://www.inquirer.com/news/nation-world/trump-strips-endangered-species-automatic-protection-habitat-loss-deelopment-mining-drilling-20260717.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/us-ends-endangered-species-blanket-protections.png",
      "alt": "A monarch butterfly resting on a flower.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the last passenger pigeon died in the Cincinnati Zoo on September 1, 1914, the United States witnessed the deliberate erasure of what had been the most abundant bird on the continent. Flocks once numbering in the billions had darkened the sky for hours as they passed, yet within a single human lifetime market hunting and the destruction of nesting forests reduced them to a single caged bird named Martha. Her death was among the first extinctions of a species that Americans could watch unfold in real time and know they had caused. The rollback of automatic protections for newly listed threatened species revives exactly the logic that killed her: that a creature abundant or inconvenient today can be surrendered to profit before anyone moves to save it.",
        "excerpt": "Martha, the last passenger pigeon, died alone in her enclosure at the Cincinnati Zoo in 1914, the terminal survivor of a species that had once been counted in the billions. Her body was packed in ice and shipped to the Smithsonian, where it stands mounted still as a warning. She became the emblem of a truth the nation learned too late: that even the most numberless of wild things can be driven to nothing by human hands.",
        "source": "Martha (passenger pigeon), the last of Ectopistes migratorius, died at the Cincinnati Zoological Garden, September 1, 1914.",
        "href": "https://en.wikipedia.org/wiki/Martha_(passenger_pigeon)"
      },
      {
        "category": "historical",
        "title": "On the rocky islet of Eldey off Iceland's coast, on the third of June 1844, fishermen strangled the last breeding pair of great auks and, in the scramble, crushed their single egg beneath a boot. The flightless seabird had ranged across the North Atlantic in vast numbers, but centuries of harvesting for meat, feathers, and finally collectors' cabinets ground it down until a handful remained, and then none. That final act, killing the last two known individuals of a species to sell their skins, distills the choice between profit and stewardship into a single scene. Rescinding the reflex to protect a species the moment it is recognized as imperiled is a modern version of that indifference, betting that extinction can wait while extraction proceeds.",
        "excerpt": "The last confirmed great auks were killed on Eldey on 3 June 1844, taken on the order of a merchant who wanted their skins; as the men seized the incubating pair, the egg the female had been warming was trampled and broken. With that, a bird that had lived across the North Atlantic for ages was gone from the earth entirely. No living person has ever seen another.",
        "source": "The extinction of the great auk (Pinguinus impennis); last pair killed at Eldey, Iceland, June 1844.",
        "href": "https://en.wikipedia.org/wiki/Great_auk"
      },
      {
        "category": "literary",
        "title": "The King James Bible frames humanity's relationship to the living world in a language that has echoed through every debate about conservation since. In Genesis, the dominion granted over the fish, the fowl, and every moving thing is set beside the charge, in the garden, to dress it and to keep it, guardianship rather than plunder. Read together, the verses hold the very tension at the heart of this event: whether dominion means the right to open habitat to drilling and mining, or the duty to tend and preserve what lives. Stripping away automatic protection for threatened creatures answers that ancient question in favor of subduing the earth and against keeping it.",
        "excerpt": "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth.\n\nAnd the LORD God took the man, and put him into the garden of Eden to dress it and to keep it.",
        "source": "The Holy Bible, King James Version (1611), Genesis 1:28 and Genesis 2:15.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Gerard Manley Hopkins wrote \"Inversnaid\" in 1881 after standing beside a wild Scottish burn, and closed it with a plea that has become a rallying cry for those who defend the untamed world. The poem gathers the fern, the foam, the dew-dappled banks into a hymn of praise for wildness itself, then asks what the world would become if it were stripped of its wet and its wildness. Its final line, \"Long live the weeds and the wilderness yet,\" answers the utilitarian view that nature exists only to be tamed and used. Against a policy that would open threatened creatures' habitat to the drill and the mine, Hopkins insists that wildness deserves to survive for its own sake.",
        "excerpt": "Degged with dew, dappled with dew\nAre the groins of the braes that the brook treads through,\nWiry heathpacks, flitches of fern,\nAnd the beadbonny ash that sits over the burn.\n\nWhat would the world be, once bereft\nOf wet and of wildness? Let them be left,\nO let them be left, wildness and wet;\nLong live the weeds and the wilderness yet.",
        "source": "Gerard Manley Hopkins, \"Inversnaid\" (1881), in Poems of Gerard Manley Hopkins (London: Humphrey Milford, 1918).",
        "href": "https://en.wikisource.org/wiki/Poems_of_Gerard_Manley_Hopkins/Inversnaid"
      },
      {
        "category": "artistic",
        "title": "John James Audubon's hand-colored aquatint of the passenger pigeon, Plate LXII of The Birds of America (engraved by Robert Havell in the 1830s), shows a male and female perched on a branch, the lower bird tenderly reaching up to touch the other's bill. Audubon had witnessed flocks so immense they blotted out the sun for days, and painted the bird at the height of its abundance, never imagining it would vanish within a century. Today the plate is less a portrait than a memorial, a species preserved only in pigment because it was not preserved in life. It stands as a visual reminder of what is lost when the impulse to protect a creature is postponed until it is gone.",
        "excerpt": "Two passenger pigeons face each other on a slender branch against a bare ground, the male's iridescent breast catching a coppery light while the female bends near as if in conversation. Audubon renders every feather with the exactness of a naturalist and the tenderness of a mourner, though he could not yet know he was recording a doomed species. The image now carries the weight of an epitaph: the most numerous bird in North America, alive only on paper.",
        "source": "John James Audubon, \"Passenger Pigeon,\" The Birds of America, Plate LXII (Havell edition, 1827-1838). Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:62_Passenger_Pigeon.jpg",
        "image": {
          "src": "/covers/us-ends-endangered-species-blanket-protections--a4.png",
          "alt": "Audubon's hand-colored plate of two passenger pigeons perched on a branch, one reaching to touch the other's bill",
          "credit": "John James Audubon, The Birds of America, Plate LXII (Passenger Pigeon). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Audubon's plate of the Carolina Parrot, Plate XXVI of The Birds of America, is a riot of green and gold: seven parakeets clustered on a cocklebur stalk, the only parrot native to the eastern United States. Farmers shot the flocks as pests, plume hunters took them for hats, and their fatal loyalty, wheeling back to hover over their fallen companions, let gunmen destroy whole flocks at a stand; the last known bird died in the Cincinnati Zoo in 1918. Audubon's brilliant image is now the fullest record of a creature that human indifference erased. Its beauty accuses the calculus that trades living species for short-term gain, the very trade renewed by abandoning automatic protection for those newly found at risk.",
        "excerpt": "Seven Carolina parakeets crowd a single seeding stalk in Audubon's plate, their emerald bodies and yellow-orange heads twisting in every direction, wings spread to reveal patterns the living bird rarely showed. The composition teems with life, yet not one of these birds' kind survives; the species was gone within a lifetime of the painting. What Audubon meant as celebration now reads as elegy for a color that has vanished from the American landscape.",
        "source": "John James Audubon, \"Carolina Parrot,\" The Birds of America, Plate XXVI (Havell edition, 1827-1838). Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:AudubonCarolinaParakeet2.jpg",
        "image": {
          "src": "/covers/us-ends-endangered-species-blanket-protections--a5.png",
          "alt": "Audubon's hand-colored plate of seven Carolina parakeets, green with yellow-orange heads, clustered on a cocklebur stalk",
          "credit": "John James Audubon, The Birds of America, Plate XXVI (Carolina Parrot). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "gamestop-ebay-stake-disclosure",
    "headline": "GameStop discloses a nearly 10% stake in eBay, months after its $56 billion bid to buy the company",
    "overview": "GameStop said in a regulatory filing that it now owns about 43.4 million eBay shares, or 9.8%, roughly three months after making an unsolicited bid of about $56 billion to acquire the online marketplace. The video-game retailer, led by chairman Ryan Cohen, has sharply increased its holding from an earlier 5% economic stake. eBay's board has not accepted the takeover proposal.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQVXdDS1FEendUOG1hQnlkMXZaNHNUUkxmRTJwUWYyMHByZ2VFdjR2Q2VUdEQzQTdzTXhrejdLTWVZNU03d3poeVZIZWViSkJZbUpBeW8tZFlBQUszYlJsSHU2b3psZV9GTC01VEdSOGtuMXpSWF9ERjROQTlMNVFUdXlaUk1mcjBRRHJqby1STFd0UHJiMlRn?oc=5"
      },
      {
        "name": "Investing.com",
        "href": "https://www.investing.com/news/stock-market-news/gamestop-owns-nearly-10-of-ebay-sec-filing-shows-4799464"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/gamestop-ebay-stake-disclosure.png",
      "alt": "A GameStop retail storefront sign.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Northern Pacific Corner of 1901, when railroad outsider E. H. Harriman, bankrolled by Jacob Schiff's Kuhn, Loeb & Co. and Standard Oil money, quietly bought up shares of the Northern Pacific Railway to wrest it from the entrenched J. P. Morgan and James J. Hill. Just as GameStop's Ryan Cohen has accumulated a near-10% stake in eBay to force a deal on a far larger rival, Harriman's stealthy accumulation aimed to seize a corporation from the men who thought they controlled it. The hidden buying cornered the stock so completely that panicked short sellers drove Northern Pacific shares toward $1,000 on May 9, 1901, triggering a market panic. Only a truce between the moguls, and the creation of the Northern Securities holding company, ended the fight.",
        "excerpt": "Backed by Jacob Schiff's Kuhn, Loeb & Co. and financed with Standard Oil money, E. H. Harriman tried to seize control of the Northern Pacific Railway from the Morgan-Hill faction by aggressively and secretly buying its stock. When the corner became apparent, shorts who had sold shares they did not own scrambled to cover, driving Northern Pacific common from around $150 to an intraday $1,000 within an hour on May 9, 1901, while the rest of the market collapsed in panic and thousands of small investors were ruined.",
        "source": "\"Panic of 1901,\" Wikipedia, on the Northern Pacific corner between E. H. Harriman (Kuhn, Loeb & Co.) and the J. P. Morgan / James J. Hill interests.",
        "href": "https://en.wikipedia.org/wiki/Panic_of_1901",
        "image": {
          "src": "/covers/gamestop-ebay-stake-disclosure--a0.png",
          "alt": "Photographic portrait of railroad magnate Edward H. Harriman (1848-1909), who secretly bought Northern Pacific stock in the 1901 corner.",
          "credit": "George Grantham Bain Collection, Library of Congress (no known copyright restrictions), via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The 1988 battle for RJR Nabisco, the defining hostile takeover of the 1980s corporate-raider era, in which Kohlberg Kravis Roberts & Co. launched an unsolicited tender offer to swallow the food-and-tobacco giant in what was then the largest buyout in history. As GameStop, a company dwarfed by eBay, mounts a bold multibillion-dollar reach for a bigger rival, the RJR fight showed how an aggressive suitor could pursue a colossus far larger than itself. Rival bids escalated from $75 to $90 to $112 a share as management and raiders warred for control. Chronicled in 'Barbarians at the Gate,' it became the emblem of Wall Street's audacious, debt-fueled appetite for seizing whole companies.",
        "excerpt": "In October and November 1988 Kohlberg Kravis Roberts & Co. and RJR Nabisco's own management waged an escalating bidding war for the conglomerate, offers climbing from $75 to $90 to $112 per share. KKR's roughly $25 billion victory made it the largest leveraged buyout in history to that point, the emblem of an era in which raiders and financiers, armed with borrowed money, reached to swallow companies many times their own size.",
        "source": "\"RJR Nabisco,\" Wikipedia, on the 1988 leveraged buyout by Kohlberg Kravis Roberts & Co.; popularized in Bryan Burrough and John Helyar, Barbarians at the Gate (1989).",
        "href": "https://en.wikipedia.org/wiki/RJR_Nabisco"
      },
      {
        "category": "literary",
        "title": "Shakespeare's 'The Merchant of Venice' (c. 1596-98), in which the moneylender Shylock advances three thousand ducats to the merchant Antonio but binds the loan with a startling forfeit: a pound of Antonio's own flesh should the debt go unpaid. The scene captures a bargainer who lends and accumulates in pursuit of a larger claim, much as GameStop builds a stake in eBay as leverage over the company it seeks to acquire. What is framed as 'merry sport' is in truth a hard-edged wager on another's ruin. Antonio, over-confident like any target sure a hostile suitor cannot prevail, seals the dangerous bond.",
        "excerpt": "Shy. This kindnesse will I showe,\nGoe with me to a Notarie, seale me there\nYour single bond, and in a merrie sport\nIf you repaie me not on such a day,\nIn such a place, such sum or sums as are\nExprest in the condition, let the forfeite\nBe nominated for an equall pound\nOf your faire flesh, to be cut off and taken\nIn what part of your bodie it pleaseth me",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 3 (First Folio text). Project Gutenberg eBook #2243.",
        "href": "https://www.gutenberg.org/cache/epub/2243/pg2243-images.html"
      },
      {
        "category": "literary",
        "title": "Shakespeare's 'Macbeth' (c. 1606), whose soldier-hero reaches beyond his station to seize a crown that is not his, driven by an ambition he himself confesses has no honest justification. Pausing before the deed, Macbeth admits he has no spur but 'vaulting ambition' that overleaps itself and falls, a warning about grasping for more than one holds. The image resonates with a smaller company vaulting toward a rival many times its size, betting boldly on a prize beyond easy reach. Shakespeare frames overreach not as triumph but as a leap that risks the fall on the far side.",
        "excerpt": "I have no spur\nTo prick the sides of my intent, but only\nVaulting ambition, which o’erleaps itself\nAnd falls on th’ other—",
        "source": "William Shakespeare, Macbeth, Act I, Scene 7. Project Gutenberg eBook #1533.",
        "href": "https://www.gutenberg.org/cache/epub/1533/pg1533-images.html"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys's oil panel 'The Moneylender and His Wife' (1514), a Northern Renaissance portrait of a Flemish banker weighing gold coins on his scales while his wife, a devotional book open before her, is drawn away toward the glint of money. The painting is a meditation on merchant capital and the seductive pull of accumulation, the same acquisitive impulse behind a bidder amassing shares to buy up a marketplace. Matsys renders every ducat, ring, and pearl with cold precision, making wealth itself the picture's true subject. Now in the Louvre, it remains one of art's sharpest images of the money trade.",
        "excerpt": "Behind his careful scales the moneylender counts and weighs gold coins, pearls and rings heaped on the table, while his wife's fingers pause over a prayer book, her gaze pulled from devotion to the money. A convex mirror in the foreground catches a tiny reflected window and a distant figure, folding the whole outside world into the merchant's cramped counting-room. Matsys makes commerce and calculation, the accumulation of value for its own sake, the moral center of the scene.",
        "source": "Quentin Matsys (Quinten Metsys), The Moneylender and His Wife, 1514, oil on panel, Musee du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/gamestop-ebay-stake-disclosure--a4.png",
          "alt": "Quentin Matsys's 1514 painting The Moneylender and His Wife: a banker weighs gold coins on a scale while his wife looks on.",
          "credit": "Quentin Matsys, The Moneylender and His Wife (1514), Musee du Louvre; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Udo Keppler's 1904 chromolithograph 'Next!', published in Puck, which draws the Standard Oil monopoly as a vast octopus, its tentacles wrapped around statehouses, the steel and copper industries, and Congress, with one arm reaching for the White House. The cartoon is the classic image of a single entity swallowing markets and grasping ever outward, a fitting visual for a challenger accumulating a stake to seize a larger rival. Where Keppler's octopus embodies the fear of unchecked corporate appetite, GameStop's reach for eBay evokes the same drama of one enterprise stretching to engulf another. It remains America's defining cartoon of monopoly ambition.",
        "excerpt": "A Standard Oil storage tank becomes a monstrous octopus, its tentacles coiled around the copper, steel and shipping industries and around a state capitol and the United States Congress, while one last arm gropes hungrily toward the White House. Published eight weeks before the 1904 election amid Ida Tarbell's exposes, the image renders corporate appetite as an all-devouring creature reaching for whatever it can seize. The single word 'Next!' warns that no institution is beyond its grasp.",
        "source": "Udo J. Keppler, \"Next!\", chromolithograph, Puck, September 7, 1904 (J. Ottmann Lith. Co.). Library of Congress, LC-DIG-ppmsca-25884.",
        "href": "https://www.loc.gov/pictures/item/2001695241/",
        "image": {
          "src": "/covers/gamestop-ebay-stake-disclosure--a5.png",
          "alt": "Udo Keppler's 1904 Puck cartoon 'Next!' depicting Standard Oil as an octopus with tentacles around industries, Congress, and reaching for the White House.",
          "credit": "Udo J. Keppler, \"Next!\", Puck, 1904; Library of Congress (no known restrictions), via Wikimedia Commons."
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "japan-flag-desecration-law",
    "headline": "Japan enacts a law criminalising desecration of its national flag, alarming artists and museums",
    "overview": "Japan enacted a law that punishes defiling or damaging the national flag, the hinomaru, with up to two years in prison or a fine of up to 200,000 yen. Artists, critics and museums warned that the vaguely worded measure could chill art, protest and other expression that uses the flag. Supporters in Prime Minister Sanae Takaichi's government cast it as a defence of a national symbol.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/japans-new-flag-desecration-law-raises-alarm-for-artists-1234755073/"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/17/japan-passes-legislation-banning-violation-of-national-flag"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/japan-flag-desecration-law.png",
      "alt": "The red-and-white national flag of Japan, the hinomaru.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In Texas v. Johnson (1989) the U.S. Supreme Court confronted almost exactly the question Japan now revives: may the state punish a citizen for defiling the national flag? Gregory Lee Johnson had burned an American flag outside the 1984 Republican convention and was convicted under a Texas desecration statute. By a 5-4 vote the Court struck the law down, holding that flag burning was expressive conduct protected by the First Amendment. Justice Brennan warned that a government cannot cure the offense a symbol's misuse causes by criminalising it, and that punishing desecration hollows out the very freedom the flag stands for.",
        "excerpt": "If there is a bedrock principle underlying the First Amendment, it is that the government may not prohibit the expression of an idea simply because society finds the idea itself offensive or disagreeable.\nWe do not consecrate the flag by punishing its desecration, for in doing so we dilute the freedom that this cherished emblem represents.",
        "source": "Texas v. Johnson, 491 U.S. 397 (1989), Opinion of the Court by Justice William J. Brennan Jr.",
        "href": "https://en.wikisource.org/wiki/Texas_v._Johnson/Opinion_of_the_Court"
      },
      {
        "category": "historical",
        "title": "West Virginia State Board of Education v. Barnette (1943) tested the flip side of Japan's law, the compelled reverence it implicitly demands. In wartime America, Jehovah's Witness children were expelled for refusing to salute the flag and recite the pledge, a ritual the state made mandatory. The Supreme Court reversed course from an earlier ruling and held that the government may not force citizens to venerate a national symbol against their conscience. Justice Robert Jackson's opinion set a limit on official orthodoxy that speaks directly to a statute policing how the hinomaru may be treated.",
        "excerpt": "If there is any fixed star in our constitutional constellation, it is that no official, high or petty, can prescribe what shall be orthodox in politics, nationalism, religion, or other matters of opinion or force citizens to confess by word or act their faith therein.",
        "source": "West Virginia State Board of Education v. Barnette, 319 U.S. 624 (1943), Opinion of the Court by Justice Robert H. Jackson.",
        "href": "https://en.wikisource.org/wiki/West_Virginia_State_Board_of_Education_v._Barnette/Opinion_of_the_Court"
      },
      {
        "category": "literary",
        "title": "Sophocles' Antigone, staged in Athens around 441 BC, is the founding drama of conscience against the state's decree. King Creon has forbidden the burial of Antigone's brother on pain of death, elevating a civic order into a sacred command; Antigone defies it and buries him anyway. Hauled before Creon, she answers that his edict cannot override the unwritten, eternal laws that no ruler authored and none can repeal. Her defense is the ancestor of every artist and citizen who insists that a state's proclamation about a symbol does not bind the conscience, the very fear Japan's museums now voice.",
        "excerpt": "it was not Zeus that published me that edict, and since not of that kind are the laws which Justice who dwells with the gods below established among men. Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods. For their life is not of today or yesterday, but for all time, and no man knows when they were first put forth.",
        "source": "Sophocles, Antigone, trans. F. Storr (Loeb Classical Library, 1912), lines 450-457, Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "John Milton's Areopagitica (1644) is the great English argument against a state's power to license and suppress expression, written to protest Parliament's order that books be approved before printing. Milton insists that to kill a book is a kind of killing, an assault on living reason itself, and that a free people must be trusted to encounter dangerous ideas. His polemic is the direct forebear of the free-expression principles now invoked against Japan's vague desecration law, which artists fear will license officials to decide in advance what use of the flag is permissible.",
        "excerpt": "as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica: A Speech for the Liberty of Unlicensed Printing (1644), Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/cache/epub/608/pg608.txt"
      },
      {
        "category": "artistic",
        "title": "Childe Hassam's The Avenue in the Rain (1917) shows Fifth Avenue in New York dissolved into a shimmer of rain and reflected Stars and Stripes, painted as America prepared to enter the First World War. It is one of some thirty flag pictures Hassam made in these years, treating the national banner as a subject for beauty and impressionist experiment rather than as untouchable state property. Now hanging in the White House, it demonstrates how central the flag has been to serious art, precisely the creative freedom Japanese painters and museums fear a desecration statute would criminalise the moment an artist bends or reinterprets the hinomaru.",
        "excerpt": "A rain-soaked Fifth Avenue melts into vertical strokes of grey and blue, while rows of American flags blaze red and white above the crowd and smear into liquid reflections on the wet pavement below. Hassam treats the flag not as a fixed icon but as living, mutable colour, dignified yet freely transformed by the artist's eye, the very license a desecration law would place under threat.",
        "source": "Childe Hassam, The Avenue in the Rain, 1917, oil on canvas, The White House collection, Washington, D.C.",
        "href": "https://en.wikipedia.org/wiki/The_Avenue_in_the_Rain",
        "image": {
          "src": "/covers/japan-flag-desecration-law--a4.png",
          "alt": "Childe Hassam's 1917 painting The Avenue in the Rain, showing rain-blurred American flags lining Fifth Avenue and reflected on the wet street",
          "credit": "Childe Hassam, The Avenue in the Rain (1917), The White House collection. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In January 1944, Igor Stravinsky conducted his own reharmonisation of The Star-Spangled Banner in Boston, adding an unexpected dominant-seventh chord that he said was meant to honour the religious feeling of the American people. A Massachusetts statute forbade any 'tampering' with or embellishment of the national anthem, and a police official warned him that a repeat performance could bring a one-hundred-dollar fine. Stravinsky quietly withdrew his arrangement, a reverent artistic gesture recast as a punishable offense against a sacred national symbol, exactly the chilling dynamic Japanese artists foresee when a vaguely worded law lets the state decide that altering the flag is a crime.",
        "excerpt": "Stravinsky's setting keeps the familiar melody but slips a lush, unresolved dominant-seventh chord beneath the words 'land of the free,' turning the martial anthem into something closer to a hymn. What the composer intended as an act of reverence the state treated as forbidden embellishment of a protected national symbol, an artist's respectful reinterpretation collapsed into a policeable transgression.",
        "source": "Igor Stravinsky, arrangement of The Star-Spangled Banner (1941), and the 1944 Boston police warning under Massachusetts' anthem-tampering law; see The First Amendment Encyclopedia, 'National Anthem, Government Regulation.'",
        "href": "https://firstamendment.mtsu.edu/article/national-anthem-government-regulation/",
        "image": {
          "src": "/covers/japan-flag-desecration-law--a5.png",
          "alt": "The original Star-Spangled Banner, the 1814 garrison flag from Fort McHenry, on display at the Smithsonian",
          "credit": "The Star-Spangled Banner flag on display at the Smithsonian, c. 1964. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "british-museum-palestine-labels-probe",
    "headline": "British politicians call for an investigation into the removal of the word 'Palestine' from British Museum labels",
    "overview": "Cross-party MPs demanded an independent investigation into the British Museum's removal of terms including 'Palestine' from object labels, citing fears of political interference and misleading statements by the institution. Internal emails reported by Middle East Eye showed months of lobbying to change the labels, and the museum acknowledged it had not carried out the 'audience testing' it had earlier cited. The museum denies bowing to pressure.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/politicians-call-for-investigation-at-british-museum-1234755037/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/art-news/news/uk-politicians-call-for-investigation-of-british-museums-removal-of-palestine-from-display-1234792435/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/british-museum-palestine-labels-probe.png",
      "alt": "The neoclassical facade and columns of the British Museum in London.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In fifteenth-century-BCE Egypt the pharaoh Hatshepsut ruled for two decades, only to have her images and cartouches systematically chiselled from the walls of her mortuary temple at Deir el-Bahari during the reign of her successor Thutmose III. Masons hacked her figure out of the stone and plastered over her royal name, attempting to write a woman king out of the official record and out of the line of succession. Like the British Museum's quiet removal of the word 'Palestine' from its labels, the erasure was less an act of forgetting than of authoring an approved past. And, as with Hatshepsut, whose buried statues were later dug up and reassembled, the scars of the deletion remain visible, testifying to the very thing they were meant to hide.",
        "excerpt": "On the wall of the Anubis shrine at Deir el-Bahari, the gods Horus and Thoth are shown pouring sacred water over the pharaoh, but the pharaoh herself has been hacked from the stone, her figure and cartouche reduced to a rough scar. Thutmose III's masons left the ritual intact while excising the woman king it once honoured, editing the sacred record to erase a reign. The blow marks are still legible, so that the attempt to obliterate Hatshepsut instead memorialises the act of obliteration.",
        "source": "Relief of Horus and Thoth purifying Hatshepsut, with the queen's figure deliberately chiselled away under Thutmose III, Anubis shrine, Mortuary Temple of Hatshepsut, Deir el-Bahari, Egypt, c. 1479-1425 BCE.",
        "href": "https://commons.wikimedia.org/wiki/File:Horus_and_Thot_purifying_Hatshepsut_(chiseled_away_by_her_stepson_Thutmose_III)..._(36101001330).jpg",
        "image": {
          "src": "/covers/british-museum-palestine-labels-probe--a0.png",
          "alt": "Ancient Egyptian relief in which the figure of the pharaoh Hatshepsut has been deliberately chiselled away, leaving a rough blank where she once stood between two gods.",
          "credit": "Relief of Hatshepsut chiselled away, Mortuary Temple at Deir el-Bahari. Photo: Bernard DUPONT / Wikimedia Commons (CC BY-SA 2.0)."
        }
      },
      {
        "category": "historical",
        "title": "During Stalin's Great Purge the secret-police chief Nikolai Yezhov was photographed strolling at the leader's side beside the Volga-Don Canal; after Yezhov himself was arrested and shot in 1940, censors airbrushed him out of the official picture, leaving Stalin walking next to an empty stretch of water. It was bureaucratic erasure as statecraft, the photographic archive continuously rewritten so that the visible past matched the approved present. The British Museum's removal of 'Palestine' from its labels belongs to the same family of gestures, an institution editing the record it is trusted to keep. What the Soviet retouchers did with an airbrush, a wall text can do with a deletion.",
        "excerpt": "Two versions of the same 1937 snapshot survive: in the first, the NKVD chief Nikolai Yezhov walks beside Stalin along the Volga-Don Canal; in the second, made after Yezhov's own execution, he is gone, replaced by a seamless stretch of empty water. Soviet retouchers airbrushed the fallen official out of the photographic record so thoroughly that a casual viewer would never suspect a man had once stood there. The doctored image is the visual grammar of erasure, removing not merely a name but a person from history.",
        "source": "Retouched Soviet photograph of Stalin and Molotov beside the Volga-Don Canal, from which the disgraced NKVD chief Nikolai Yezhov was airbrushed following his 1940 execution; original c. 1937.",
        "href": "https://commons.wikimedia.org/wiki/File:Stalin_and_Molotov_along_the_Volga%E2%80%93Don_Canal,_Nikolai_Yezhov_removed.jpg",
        "image": {
          "src": "/covers/british-museum-palestine-labels-probe--a1.png",
          "alt": "Retouched Soviet photograph of Stalin and Molotov walking by a canal, with the space where Nikolai Yezhov once stood painted over with water.",
          "credit": "Retouched Soviet photograph with Nikolai Yezhov removed, c. 1940. Unknown author / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Shelley's 1818 sonnet 'Ozymandias' imagines a traveller who finds, half-buried in the desert, the shattered statue of a forgotten king whose pedestal still boasts 'My name is Ozymandias, King of Kings.' The colossus meant to broadcast that name forever now testifies only to its vanishing, the surrounding sands 'boundless and bare.' The poem is a meditation on how power tries to fix its own version of history in stone, and on how names are made and unmade over time. It speaks directly to a quarrel over whether the word 'Palestine' should stand or be scrubbed from a museum's labels, and over who gets to decide what a name on a monument is allowed to mean.",
        "excerpt": "I met a Traveller from an antique land,\nWho said, \"Two vast and trunkless legs of stone\nStand in the desart. Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read,\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:\nAnd on the pedestal these words appear:\n\"My name is Ozymandias, King of Kings.\"\nLook on my works ye Mighty, and despair!\nNo thing beside remains. Round the decay\nOf that Colossal Wreck, boundless and bare,\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" first published in The Examiner (London), 11 January 1818.",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "literary",
        "title": "In George Orwell's Nineteen Eighty-Four the Party teaches that 'Who controls the past controls the future,' and Winston Smith spends his days at the Ministry of Truth feeding inconvenient facts down the 'memory hole' to be incinerated. A name can be deleted, a person turned into an 'unperson,' a whole country's history rewritten between editions of the record. The novel dramatises precisely the fear voiced by MPs over the British Museum: that a trusted keeper of the record might quietly edit what it displays, removing a word like 'Palestine' and, with it, a claim on collective memory. Orwell's warning is that erasing the label is a way of erasing the thing itself.",
        "excerpt": "In Orwell's Nineteen Eighty-Four, Winston Smith works at the Ministry of Truth rewriting old newspapers so that the past always agrees with the Party's present. Inconvenient names, unpersons, and retracted predictions are dropped into the 'memory hole', a pneumatic chute that carries them to a furnace, leaving no trace that they ever existed. The novel's chilling premise is that whoever controls the record controls reality itself, so that to delete a word is to unmake a fact.",
        "source": "George Orwell, Nineteen Eighty-Four (London: Secker & Warburg, 1949).",
        "href": "https://gutenberg.net.au/ebooks01/0100021h.html"
      },
      {
        "category": "artistic",
        "title": "The Severan Tondo, a rare painted portrait from around 200 CE now in Berlin's Antikensammlung, shows the emperor Septimius Severus with his wife Julia Domna and their two young sons in gilded family unity, except that the face of the younger boy, Geta, has been violently scrubbed away. After Caracalla murdered his brother and imposed a formal damnatio memoriae, Geta's image was gouged out of the panel and his name banned across the empire. The tondo is the ancient world's most vivid surviving picture of official erasure, and an uncanny mirror for a modern museum accused of removing a name from its own displays. That the deletion is so plainly visible only underscores how erasure tends to advertise the very thing it tries to hide.",
        "excerpt": "Painted on a circular wooden panel around 200 CE, the tondo shows the imperial family, Septimius Severus, Julia Domna, and their two sons, posed in gilded harmony. Where the boy Geta's face should be there is now only a smeared brown void, gouged out and daubed over after his brother Caracalla had him murdered and his memory formally condemned. The surviving neck and shoulders make the deletion unmistakable: the picture preserves, in negative, the very person it was ordered to forget.",
        "source": "The Severan Tondo (Berlin Tondo), tempera on wood, c. 199-200 CE, Antikensammlung, Berlin; the face of Geta erased following his damnatio memoriae.",
        "href": "https://commons.wikimedia.org/wiki/File:Tondo_showing_the_Severan_dynasty_Septimius_Severus_with_Julia_Domna,_Caracalla_and_Geta,_whose_face_has_been_erased,_probably_because_of_the_damnatio_memoriae_put_against_him_by_Caracalla,_from_Djemila_(Algeria),_circa_AD_199-200.jpg",
        "image": {
          "src": "/covers/british-museum-palestine-labels-probe--a4.png",
          "alt": "Painted Roman family tondo in which the face of the young Geta has been deliberately scraped away, leaving a brown smear beside his parents and brother.",
          "credit": "The Severan Tondo, c. 199-200 CE, Antikensammlung, Berlin. Photo: Carole Raddato / Wikimedia Commons (CC BY-SA 2.0)."
        }
      },
      {
        "category": "artistic",
        "title": "Archibald Archer's 1819 painting 'The Temporary Elgin Room' shows the British Museum itself at a founding moment, its keepers, trustees and visitors arranged among the Parthenon marbles newly arrived from Athens. It is a self-portrait of the institution deciding how contested heritage should be seen, arranged, labelled and understood, the very power now in dispute. The canvas still belongs to the same museum that MPs accuse of quietly deleting the word 'Palestine' from its labels, making it a pointed image of who controls how history is displayed. Two centuries on, the argument has shifted from which marbles hang on the wall to which words are permitted on the card beside them.",
        "excerpt": "Archer's canvas depicts the crowded temporary gallery where the British Museum first displayed the Parthenon sculptures Lord Elgin had stripped from Athens, complete with trustees, keepers and admiring visitors. It is a portrait of a museum in the act of composing its own authority, deciding what is shown, how it is captioned, and whose story the marbles are made to tell. Two centuries later the same institution stands accused of quietly editing that story again, this time by deleting the word 'Palestine' from its labels.",
        "source": "Archibald Archer, The Temporary Elgin Room, 1819, oil on canvas, British Museum, London.",
        "href": "https://commons.wikimedia.org/wiki/File:Temporary_Elgin_Room_at_the_Museum_in_1819.jpg",
        "image": {
          "src": "/covers/british-museum-palestine-labels-probe--a5.png",
          "alt": "Nineteenth-century oil painting of a gallery in the British Museum, with visitors and staff seated among the displayed Parthenon (Elgin) marbles.",
          "credit": "Archibald Archer, The Temporary Elgin Room, 1819, British Museum. Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "us-hong-kong-emergency-lapse",
    "headline": "The U.S. lets its Hong Kong national-emergency declaration lapse, lifting some sanctions while Trump's 2020 order stays in place",
    "overview": "The Trump administration allowed a national emergency over Hong Kong, first declared in 2020, to expire, prompting the removal of some individuals from a U.S. sanctions blacklist. But Executive Order 13936, which revoked Hong Kong's special trading status, remains in effect, and top officials such as Chief Executive John Lee stay sanctioned under a separate law. The move follows recent U.S.-China trade talks.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNampFOXhtR1UzaFhtSDZYUW04LVpsYXBRcktvYmdFVHBtcm9FWDJWTzVxQlNnaGdHeDFEd1pWdW9QX0FoX01kVGRCYjR5dThBZXF3dWdCZllZUnMwbU5NSW9VQUN6d1VScGJQWC1TaUlVQ3J2Z3g0T0h6al9walYzTnliUXBZbVpRd0RZand4c0VMT250SVhlVFBEQ28wUQ?oc=5"
      },
      {
        "name": "Dim Sum Daily",
        "href": "https://www.dimsumdaily.hk/u-s-revises-hong-kong-sanctions-lists-after-executive-order-lapses/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/us-hong-kong-emergency-lapse.png",
      "alt": "The Hong Kong skyline and Victoria Harbour at dusk.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In March 1809, on his last days in office, Thomas Jefferson signed the Non-Intercourse Act, which quietly dismantled his own hated Embargo. The total ban on American shipping was repealed and the ports were reopened to the world, with one pointed exception: trade with Great Britain and France, the two great powers the embargo had been aimed at, stayed shut. Like Washington letting the Hong Kong emergency lapse while keeping Trump's core order and the top officials sanctioned, it was a partial retreat that eased the pressure on everyone but the principal targets. A sweeping instrument of economic coercion was allowed to expire, but its sharpest edge was deliberately preserved.",
        "excerpt": "That so much of the act laying an embargo on all ships and vessels in the ports and harbors of the United States, and of the several acts supplementary thereto, as forbids the departure of vessels owned by citizens of the United States, and the exportation of domestic and foreign merchandise to any foreign port or place, be, and the same is hereby repealed, after the fifteenth day of March, one thousand eight hundred and nine, except so far as they relate to Great Britain or France, or their colonies or dependencies, or places in the actual possession of either.",
        "source": "Non-Intercourse Act, 10th Congress, Sess. II, Ch. 24, Sec. 12 (approved March 1, 1809).",
        "href": "https://www.ruhr-uni-bochum.de/gna/Quellensammlung/04/04_nonintercourseact_1809.html",
        "image": {
          "src": "/covers/us-hong-kong-emergency-lapse--a0.png",
          "alt": "1807 political cartoon of a snapping turtle labeled 'Ograbme' (embargo spelled backwards) seizing an American merchant, satirizing Jefferson's trade embargo.",
          "credit": "Alexander Anderson, 'Ograbme' (1807), Library of Congress via Wikimedia Commons. Public domain."
        }
      },
      {
        "category": "historical",
        "title": "On February 27, 1972, at the close of Richard Nixon's visit to China, Washington and Beijing issued the Shanghai Communiqué, turning two decades of hostility into a wary opening. The two governments still disagreed sharply over Taiwan and left their deepest quarrels unresolved, yet they declared that moving toward normal relations served everyone's interest and pledged that neither would seek hegemony in the Pacific. It is the same logic behind letting the Hong Kong emergency lapse after trade talks: rivals ease a confrontation in the name of mutual advantage while carefully leaving the hard core of their differences in place. Realpolitik, not a change of heart, does the diplomatic work.",
        "excerpt": "Progress toward the normalization of relations between China and the United States is in the interests of all countries;\n...\nneither should seek hegemony in the Asia-Pacific region and each is opposed to efforts by any other country or group of countries to establish such hegemony;",
        "source": "Joint Communiqué of the United States of America and the People's Republic of China (Shanghai Communiqué), issued at Shanghai, February 27, 1972.",
        "href": "https://history.state.gov/historicaldocuments/frus1969-76v17/d203",
        "image": {
          "src": "/covers/us-hong-kong-emergency-lapse--a1.png",
          "alt": "President Richard Nixon shaking hands with Premier Zhou Enlai on the tarmac in Peking, February 1972.",
          "credit": "White House Photo Office, 'President Nixon and Premier Chou En-Lai Shake Hands at the Nixons' Arrival in Peking' (1972), U.S. National Archives via Wikimedia Commons. Public domain (U.S. Government work)."
        }
      },
      {
        "category": "literary",
        "title": "In the final book of Homer's Iliad, old King Priam crosses the battle lines into the enemy camp and clasps the knees of Achilles, the man who killed his son Hector, to beg for the body back. Achilles, reminded of his own aged father, relents: he lifts the king by the hand, and the two weep together before he agrees to give up the corpse. It is the archetype of a hard adversary easing his grip, principle and vengeance yielding to a negotiated mercy. Washington's decision to lift sanctions and let the Hong Kong emergency expire has the same texture, an implacable posture quietly softened once the moment for relenting arrives.",
        "excerpt": "He took the old man's hand and moved him gently away. The two wept bitterly- Priam, as he lay at Achilles' feet, weeping for Hector, and Achilles now for his father and now for Patroclous, till the house was filled with their lamentation.",
        "source": "Homer, The Iliad, Book XXIV, trans. Samuel Butler (1898).",
        "href": "https://classics.mit.edu/Homer/iliad.24.xxiv.html"
      },
      {
        "category": "literary",
        "title": "In Shakespeare's The Merchant of Venice, Portia stands before the Venetian court and pleads with Shylock to relax the letter of his bond, arguing that mercy freely given blesses the one who grants it as much as the one who receives it. Her speech makes clemency the true mark of power, greater in the mighty than the crown or scepter that enforces their will. The image fits a great power choosing to relax a penalty it was fully entitled to keep enforcing, sanctions loosened not because they were unjust but because relenting can serve the stronger party too. Washington's quiet lifting of some Hong Kong sanctions is that discretionary easing, mercy as a calculated show of strength.",
        "excerpt": "The quality of mercy is not strain'd,\nIt droppeth as the gentle rain from heaven\nUpon the place beneath: it is twice blest;\nIt blesseth him that gives and him that takes:\n'Tis mightiest in the mightiest: it becomes\nThe throned monarch better than his crown;",
        "source": "William Shakespeare, The Merchant of Venice, Act IV, Scene 1 (Portia).",
        "href": "https://shakespeare.mit.edu/merchant/merchant.4.1.html"
      },
      {
        "category": "artistic",
        "title": "Gerard ter Borch's small oil-on-copper 'The Ratification of the Treaty of Munster' (1648) records the exact moment two great powers ended eighty years of war, as Dutch and Spanish envoys raise their hands to swear the peace in the town hall at Munster. It is one of the first paintings to document a diplomatic act as sober fact rather than allegory, a room full of tired negotiators formalizing a settlement that redrew Europe's map. The picture captures the mood of Washington and Beijing easing a standoff by mutual arrangement: no triumph, no embrace, just a status quietly changed by agreement. A long emergency is closed, and the change is ratified by procedure rather than proclaimed as victory.",
        "excerpt": "Ter Borch crowds some seventy-seven figures into a single dim chamber, the Dutch and Spanish delegates clustered at the center with hands raised to take the oath. The colors are muted browns and blacks against pale ruffs and gilt leather, the drama entirely in the solemn stillness of men ending a war by signature. Even the painter himself peers out from the left edge, a witness to a bargain between rivals.",
        "source": "Gerard ter Borch, 'The Ratification of the Treaty of Munster' (1648), oil on copper, National Gallery, London (NG896).",
        "href": "https://www.nationalgallery.org.uk/paintings/gerard-ter-borch-the-ratification-of-the-treaty-of-munster",
        "image": {
          "src": "/covers/us-hong-kong-emergency-lapse--a4.png",
          "alt": "Gerard ter Borch's 1648 painting of Dutch and Spanish envoys swearing the oath ratifying the Treaty of Munster in a crowded town-hall chamber.",
          "credit": "Gerard ter Borch, 'The Ratification of the Treaty of Munster' (1648), National Gallery, London, via Wikimedia Commons. Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Amedee Forestier's painting 'The Signing of the Treaty of Ghent, Christmas Eve 1814' shows the British and American negotiators clasping hands across the table as they end the War of 1812, the same conflict that grew out of Jefferson's embargo years. The chief envoys, John Quincy Adams and Britain's Admiral Gambier, shake hands in the center while the other diplomats look on, rivals converting a war into a restored peace. It is the visual grammar of exactly this kind of move: two powers stepping back from confrontation and shaking on a bargain that lets normal relations resume. Washington's decision to lift some sanctions and let the Hong Kong emergency lapse is that handshake in miniature, an easing of hostility sealed by agreement rather than surrender.",
        "excerpt": "Forestier stages the scene as a warm interior tableau: American commissioners in dark coats reach across the green-covered table to grasp the hands of the British delegation, papers and inkstands scattered before them. The gesture at the heart of the canvas is the handshake of former enemies, principle set aside so trade and peace can flow again. Candlelight and rich reds give the reconciliation the glow of a Christmas Eve settlement.",
        "source": "Amedee Forestier, 'The Signing of the Treaty of Ghent, Christmas Eve 1814' (1914), Smithsonian American Art Museum.",
        "href": "https://commons.wikimedia.org/wiki/File:Am%C3%A9d%C3%A9e_Forestier_-_Signing_of_Treaty_of_Ghent_(1814).jpg",
        "image": {
          "src": "/covers/us-hong-kong-emergency-lapse--a5.png",
          "alt": "Amedee Forestier's painting of American and British diplomats shaking hands across a table as they sign the Treaty of Ghent ending the War of 1812.",
          "credit": "Amedee Forestier, 'The Signing of the Treaty of Ghent, Christmas Eve 1814' (1914), Smithsonian American Art Museum, via Wikimedia Commons. Public domain."
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "fairlife-cyberattack-production-halt",
    "headline": "Coca-Cola's Fairlife pauses U.S. production after a ransomware attack breaches the milk brand's systems",
    "overview": "Coca-Cola said its dairy subsidiary Fairlife temporarily suspended U.S. production after detecting unauthorized third-party access to parts of its systems, including production systems, in a ransomware event. The company said product quality and safety were not affected and that its Canadian operations were not impacted. It has notified law enforcement and begun an investigation with outside experts.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxNZkVkZzdhcExfeXNWRWpBd182TVRzc1kzOGE1Y0RSb3Y0aHFwY19PVTU0TmZLX09aZEs3VlR4SVBVZzdMVVhqdkRab2traEE2MlB3V2NUbjktRTBYWHZQd1hEZi1GYVRuTk1DQjZhX01pZkdjVnktbXlVeHFXZTJVMzlZYUxJYUlZcHNIQm43TnhFODI1ZUh3RHZ3?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/coca-cola-fairlife-milk-cyberattack/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/fairlife-cyberattack-production-halt.png",
      "alt": "Cartons of milk on refrigerated supermarket shelves.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 991, after Viking raiders plundered Ipswich and cut down the ealdorman Byrhtnoth at the Battle of Maldon, the English crown chose to buy peace rather than fight, handing over 10,000 pounds of silver to the Danes. It was the first of the payments later remembered as the Danegeld: a great and wealthy realm, unable to keep an unseen and mobile enemy out, paying to make the raiding stop. Fairlife's ransomware crisis is the modern form of the same bargain, an intruder who cannot be caught demanding money to release a system it has seized. Then as now, the tribute buys quiet, not security, and invites the raider to return.",
        "excerpt": "A.D. 991.  This year was Ipswich plundered; and very soon\nafterwards was Alderman Britnoth slain at Maidon.  In this\nsame year it was resolved that tribute should be given, for the\nfirst time, to the Danes, for the great terror they occasioned by\nthe sea-coast.  That was first 10,000 pounds.  The first who\nadvised this measure was Archbishop Siric.",
        "source": "The Anglo-Saxon Chronicle, entry for A.D. 991 (trans. James Ingram / J. A. Giles), Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/657/pg657.txt"
      },
      {
        "category": "historical",
        "title": "Between 1811 and 1816, textile workers across Nottinghamshire, Yorkshire and Lancashire, marching under the name of the mythical \"General Ludd,\" broke into mills at night and smashed the stocking frames and shearing machines with heavy hammers. The Luddites were not opposed to technology as such; they struck at the machines because the machines were the vulnerable heart of the new industrial enterprise, and stopping them stopped the owners' profits. Fairlife's shuttered production lines echo that logic in reverse and at a distance, an attacker who never enters the building halting the machinery all the same. In both cases a modern, mechanized food-and-goods system is revealed to be only as strong as its most breakable moving parts.",
        "excerpt": "Under cover of darkness, bands of framework knitters and croppers moved from workshop to workshop, breaking the mechanized frames and shears that were the beating heart of the mills. Their sledgehammers, some nicknamed \"Enoch,\" could silence a factory's output in a single raid, and the authorities answered with troops and, in 1812, a law making frame-breaking a capital crime. It was sabotage as leverage: halt the machines, and you hold the whole enterprise hostage.",
        "source": "The Luddites and the machine-breaking risings of 1811-1816, English Midlands and North; overview and primary material, British Library.",
        "href": "https://www.bl.uk/collection-items/the-luddites"
      },
      {
        "category": "literary",
        "title": "In Plutarch's Life of Caesar, the young Julius Caesar is seized by Cilician pirates near the island of Pharmacusa and held until a ransom can be raised. Told they wanted twenty talents for him, he laughed and insisted they demand fifty, then lived among his captors for thirty-eight days as though they were his bodyguard, treating the whole hostage-taking with contempt. The episode is the classic literary portrait of extortion at sea: a great enterprise stopped and its owner held for a price by an unseen, lawless band. Fairlife, its systems locked and a payment demanded, is caught in the same ancient transaction, the productive machine frozen until the captors are satisfied.",
        "excerpt": "When these men at first demanded of him twenty talents for his ransom, he laughed at them for not understanding the value of their prisoner, and voluntarily engaged to give them fifty. He presently despatched those about him to several places to raise the money, till at last he was left among a set of the most bloodthirsty people in the world, the Cilicians, only with one friend and two attendants. Yet he made so little of them, that when he had a mind to sleep, he would send to them, and order them to make no noise. For thirty-eight days, with all the freedom in the world, he amused himself with joining in their exercises and games, as if they had not been his keepers, but his guards.",
        "source": "Plutarch, \"Caesar,\" Lives of the Noble Grecians and Romans, translated by John Dryden (revised by A. H. Clough); The Internet Classics Archive.",
        "href": "https://classics.mit.edu/Plutarch/caesar.html"
      },
      {
        "category": "literary",
        "title": "In the ninth chapter of Exodus, when Pharaoh will not release the Israelites, the fifth plague falls not on people but on the herds: a \"very grievous murrain\" that strikes the cattle, horses, camels, oxen and sheep of Egypt, sparing only the livestock of Israel. It is a plague aimed precisely at a nation's animals and food supply, an invisible hand reaching into the fields to kill the source of milk, meat and labor. For Fairlife, a dairy brand whose whole business rests on healthy herds and a clean, working production chain, the image is unnervingly apt, a hidden affliction that halts the flow of milk overnight. The passage frames the modern breach in the oldest terms: a strike at the herd that brings the enterprise to a standstill.",
        "excerpt": "Behold, the hand of the LORD is upon thy cattle which is in the field, upon the horses, upon the asses, upon the camels, upon the oxen, and upon the sheep: there shall be a very grievous murrain.\nAnd the LORD shall sever between the cattle of Israel and the cattle of Egypt: and there shall nothing die of all that is the children's of Israel.\nAnd the LORD appointed a set time, saying, To morrow the LORD shall do this thing in the land.\nAnd the LORD did that thing on the morrow, and all the cattle of Egypt died: but of the cattle of the children of Israel died not one.",
        "source": "The Holy Bible, King James Version, Exodus 9:3-6.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus"
      },
      {
        "category": "artistic",
        "title": "Johannes Vermeer's \"The Milkmaid\" (c. 1658-1661), in the Rijksmuseum, shows a servant pouring a thin steady stream of milk from a jug into a bowl, the entire small world of the kitchen concentrated on that single unbroken flow. It is the quiet essence of the dairy: humble, wholesome, dependent on the pour never stopping. Set beside Fairlife's frozen production lines, the painting reads almost as a warning made tender, everything in the image depends on the milk continuing to move, and a modern dairy enterprise is just this act multiplied a millionfold and run by machines. When the systems lock, the stream that Vermeer immortalized is exactly what stops.",
        "excerpt": "A single figure stands in a plain, sunlit room, tipping an earthenware jug so that a slender thread of milk falls into a waiting bowl; bread, a basket and a gleaming copper pail surround her. Vermeer freezes the one instant of the pour, making an ordinary domestic act feel monumental and fragile at once. The whole painting is an image of continuity, of nourishment flowing steadily, and thus of how much is lost the moment that flow is interrupted.",
        "source": "Johannes Vermeer, The Milkmaid (Het melkmeisje), c. 1658-1661, oil on canvas, Rijksmuseum, Amsterdam (SK-A-2344).",
        "href": "https://www.rijksmuseum.nl/en/collection/SK-A-2344",
        "image": {
          "src": "/covers/fairlife-cyberattack-production-halt--a4.png",
          "alt": "Vermeer's The Milkmaid: a woman in a yellow bodice and blue apron pouring milk from a jug into a bowl in a sunlit kitchen.",
          "credit": "Johannes Vermeer, The Milkmaid (c. 1658-1661), Rijksmuseum, Amsterdam. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin's \"The Plague of Ashdod\" (1630), in the Louvre, depicts a stricken city where the Philistines, punished for seizing the Ark of the Covenant, collapse in the streets as an unseen pestilence spreads among them. Figures cover their noses against the contaminated air, a mother lies dead with her infant, and the ordered classical architecture stands helpless above the chaos, order overtaken by an invisible force. The painting captures exactly the dread behind a ransomware breach: a vast, dignified system paralyzed by an intruder no one can see, its normal life halted in an instant. Fairlife's silenced plant is the modern counterpart, a great enterprise brought to a stop by a contagion that arrives through the systems rather than the air.",
        "excerpt": "In a grand, sunlit classical square, bodies lie scattered where they fell, a mother dead beside her living child while onlookers recoil and press cloths to their faces against the tainted air. Poussin painted it during the Italian plague of 1629-1631, and the picture pulses with the horror of an invisible affliction moving unstoppably through a proud city. Beauty and order remain in the stone facades, but the enterprise of the living has been abruptly, catastrophically halted.",
        "source": "Nicolas Poussin, The Plague of Ashdod (La Peste d'Asdod), 1630, oil on canvas, Musee du Louvre, Paris (INV 7276).",
        "href": "https://en.wikipedia.org/wiki/Plague_of_Ashdod_(Poussin)",
        "image": {
          "src": "/covers/fairlife-cyberattack-production-halt--a5.png",
          "alt": "Poussin's The Plague of Ashdod: a classical city square strewn with plague victims as figures recoil and cover their faces.",
          "credit": "Nicolas Poussin, The Plague of Ashdod (1630), Musee du Louvre, Paris. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "india-wangchuk-hunger-strike-hospitalized",
    "headline": "Indian police forcibly hospitalise education reformer Sonam Wangchuk after 20 days on hunger strike",
    "overview": "Police in India forcibly moved Sonam Wangchuk, a 59-year-old engineer and education reformer, to a New Delhi hospital after his health deteriorated on the 20th day of a hunger strike demanding the education minister's resignation over exam-paper leaks. His fast has become a rallying point for the 'Cockroach Party,' a youth movement named after a top judge's remark likening some jobless young people to cockroaches. Supporters condemned the forced hospitalisation as coercive.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPQTBCbG1NUHJfOEZtSWI3WGx3M2RuWDJHMjNsZDdwZ0YybW1yeWQ5QmFHTWtFcXhzWktqS2ZURGg1eDIzOXZXMWFGRTB5WVljWk1zc0ZQLTBsSHZnME81ZjhQelVzVV9ZLWllX1Y3RzVJWUNXR0dVNVVvNHpmcUYxM1ZmblR4Y1BPUnpSOG83OEd4OFEyZW1Qal9rdF9SSkt3Y0s1a0QyMlVWRWxueVNmV0d4SkFkWHM?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cjej3dxxg2do"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/india-wangchuk-hunger-strike-hospitalized.png",
      "alt": "A single empty chair beside a protest banner at a hunger-strike sit-in.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 20 September 1932, in his cell at Yerwada Jail in Pune, Mohandas Gandhi began a fast unto death to protest the British Communal Award granting the so-called untouchables separate electorates. Like Wangchuk today, Gandhi wielded his own starving body as the sole weapon of a citizen with no army, forcing a distant government to reckon with a single conscience. His weakening frame became a national event, drawing crowds and negotiators until, after six days, the settlement known as the Poona Pact reversed the decision. It is the founding template of the Indian fast as moral coercion against the state that Wangchuk consciously invokes.",
        "excerpt": "Gandhi called fasting his ultimate satyagraha, the last resort of the powerless: a deliberate offering of the self to move hearts that argument could not reach. Emaciated on a cot in the prison yard, he turned physical helplessness into overwhelming moral pressure, and the authorities who could have let him die instead came to terms. The Epic Fast established that in India a lone faster's suffering could bend the machinery of a government.",
        "source": "\"Gandhi begins fast in protest of caste separation,\" This Day in History, September 20, 1932, HISTORY.",
        "href": "https://www.history.com/this-day-in-history/gandhi-begins-fast-in-protest-of-caste-separation"
      },
      {
        "category": "historical",
        "title": "In the Maze Prison outside Belfast, the Irish republican Bobby Sands began refusing food on 1 March 1981, the first of ten men who would starve themselves to death that year demanding political-prisoner status. As with Wangchuk, the fast turned a jailed body into a public reckoning: on 9 April, gaunt and dying, Sands was elected a Member of Parliament, his empty seat a rebuke to the state that held him. He died on 5 May after 66 days without food, and his funeral drew tens of thousands. The 1981 strike shows how the slow self-destruction of a single faster can eclipse the government it opposes.",
        "excerpt": "Sands and his comrades refused all food while the state, unwilling to concede and unwilling to force-feed, simply watched them wither in their cells. His election to Parliament while at the edge of death exposed how a hunger striker converts bodily weakness into political authority no prison wall can contain. Ten deaths later, the protest had transformed Irish republican politics and drawn the eyes of the world onto the H-Blocks.",
        "source": "\"The Hunger Strike of 1981 - A Chronology of Main Events,\" CAIN Archive, Ulster University.",
        "href": "https://cain.ulster.ac.uk/events/hstrike/chronology.htm"
      },
      {
        "category": "literary",
        "title": "In Sophocles' tragedy Antigone, first staged in Athens around 441 BC, a young woman defies King Creon's edict and buries her brother, insisting that the eternal laws of the gods outrank any decree of a mortal ruler. Hauled before the king, she does not deny the act but justifies it, choosing death over obedience exactly as Wangchuk chooses starvation over silence. Her speech is the archetype of the single conscience that answers to a higher justice than the state's. Creon's power cannot make her recant; it can only destroy her, and in destroying her it destroys itself.",
        "excerpt": "Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods. For their life is not of today or yesterday, but for all time, and no man knows when they were first put forth.",
        "source": "Sophocles, Antigone, lines 453-457, trans. Sir Richard C. Jebb (Cambridge University Press, 1891), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "Henry David Thoreau's 1849 essay \"Civil Disobedience\" argues that a just individual must withhold cooperation from an unjust government, even at the cost of prison, because a solitary honest man is worth more than a compliant majority. Thoreau spent a night in jail rather than pay a tax supporting slavery, and from that small refusal he built the philosophy of nonviolent resistance that later shaped Gandhi and King, and that animates Wangchuk's fast today. The essay locates moral authority in the lone dissenter who accepts punishment rather than endorse wrong. Its logic is precisely Wangchuk's: to place one's own body on the line as a standing reproach to power.",
        "excerpt": "If any think that their influence would be lost there, and their voices no longer afflict the ear of the State, that they would not be as an enemy within its walls, they do not know by how much truth is stronger than error, nor how much more eloquently and effectively he can combat injustice who has experienced a little in his own person. Under a government which imprisons any unjustly, the true place for a just man is also a prison.",
        "source": "Henry David Thoreau, \"Civil Disobedience\" (1849), Project Gutenberg eBook, On the Duty of Civil Disobedience.",
        "href": "https://www.gutenberg.org/files/71/71-h/71-h.htm"
      },
      {
        "category": "artistic",
        "title": "This 1910 poster, drawn from Alfred Pearse's cartoon \"The Modern Inquisition\" for the Women's Social and Political Union, shows a suffragette pinned to a chair by wardresses while a tube is forced through her nose to break her hunger strike. The WSPU circulated such images precisely because the torture happened out of public sight, turning the faster's ordeal into propaganda against a government that would not let her starve nor grant her cause. It is the visual ancestor of the drama now surrounding Wangchuk, whom police removed to hospital rather than allow to die. The poster makes the state's forcible intervention into an emblem of its own cruelty.",
        "excerpt": "The print depicts a woman held down by uniformed attendants as officials drive a feeding tube into her, her body rigid with resistance and pain. Bold text and stark colours were designed to shock passers-by and voters into recognising force-feeding as state torture. Distributed during the 1910 general election, it weaponised the image of the restrained faster exactly as authorities today must weigh the optics of dragging Wangchuk from his fast.",
        "source": "\"Poster showing a suffragette being force-fed,\" after Alfred Pearse (\"A Patriot\"), Women's Social and Political Union, 1910. Museum of London. Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Poster_showing_a_suffragette_being_force-fed,_1910.jpg",
        "image": {
          "src": "/covers/india-wangchuk-hunger-strike-hospitalized--a4.png",
          "alt": "1910 WSPU poster depicting a suffragette held down and force-fed through a tube in prison",
          "credit": "Women's Social and Political Union / Museum of London, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David's 1787 masterpiece \"The Death of Socrates,\" now in the Metropolitan Museum of Art, shows the philosopher upright and serene, reaching for the cup of hemlock rather than renounce his principles before the Athenian state. Condemned for defying civic authority, Socrates turns his own death into a final act of conscience, his calm gesture rebuking the men who ordered it, just as Wangchuk turns his fasting body against India's officials. David painted him as the model of self-sacrifice for truth, teaching to the last breath. The canvas is the great visual statement of the individual who accepts death sooner than betray his cause.",
        "excerpt": "David composes the scene like a stage: grieving disciples recoil in shadow while Socrates, luminous and unbowed, points heavenward and reaches for the poison without fear. The single upright figure against a hostile state distills the theme of a lone conscience choosing self-destruction over submission. Painted on the eve of the French Revolution, it made martyrdom for principle into an image of moral triumph rather than defeat.",
        "source": "Jacques-Louis David, The Death of Socrates, 1787, oil on canvas, 129.5 x 196.2 cm. The Metropolitan Museum of Art, New York (Catharine Lorillard Wolfe Collection, 31.45).",
        "href": "https://www.metmuseum.org/art/collection/search/436105",
        "image": {
          "src": "/covers/india-wangchuk-hunger-strike-hospitalized--a5.png",
          "alt": "Jacques-Louis David's painting The Death of Socrates, the philosopher reaching for the cup of hemlock",
          "credit": "Jacques-Louis David, The Metropolitan Museum of Art, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "burnham-labour-leader",
    "headline": "Andy Burnham is declared leader of Britain's governing Labour Party and will become prime minister on Monday",
    "overview": "Andy Burnham, the former mayor of Greater Manchester, was declared leader of the UK's governing Labour Party on Friday as the sole candidate to replace Keir Starmer, who was forced out by a party rebellion. In his acceptance speech Burnham pledged to \"give them hope back\" and to shift power from Westminster and Whitehall to the places people live. He will become Britain's seventh prime minister in a decade of political turbulence when he succeeds Starmer on Monday.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxOWU05U1otVzNHSXktaWJjX1BBYkdvQTRvb1B1bGZGUUVPcDhTYlA3alczTGszRlMxUi1GN09pbkE0Wjd0c19GbEpzaHRPUGc5a0FIZkRldVplV083LXdfcktDbHZzZk5yTVMwMXpaaU5TYkFTOUhKT2NwWlhMb1FpNTJteURBbGIxd3MzUHZwZUY5WUFhaDNJaTFzMUdvVzJN?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPeWExY2xNUmphWHN6VElGWnFoa1ozR1lVRThIMmdUTGt3b3FjdHVTRUc2WUFyNzVzQzdlMmdoUlZZZnFXenFEQVV3OEY5cjgzZFBfWllGd3lMMThkZ3NXUkxSZnFOcmZhLThxXzVSUGFJU1VPb200YlhwdVBoZG5iMDlsc0htTVV3VDRfSlJYTDVvVHl6UDRtTHltWmppek5MY3RFRFFQR2NmZmszX3lZ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/burnham-labour-leader.png",
      "alt": "Andy Burnham, the newly declared leader of Britain's Labour Party.",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the emperor Domitian was assassinated in AD 96, Rome's Senate handed power peacefully to the elderly, moderate Nerva, who promised to reconcile one-man rule with the old liberties Romans had lost under a tyrant. The historian Tacitus, writing soon after, described the cautious return of hope after years of fear, as a weary people dared once more to speak and to expect better government. It is the same emotional arc Britain is being offered now: a divisive leader forced from the stage, a successor installed without bloodshed, and a pledge to 'give hope back.' Like Nerva, Andy Burnham inherits not a fresh start but a bruised realm hungry to believe that renewal is possible.",
        "excerpt": "Now our spirits begin to revive. But although at the first dawning of this happy period, the emperor Nerva united two things before incompatible, monarchy and liberty; and Trajan is now daily augmenting the felicity of the empire; and the public security has not only assumed hopes and wishes, but has seen those wishes arise to confidence and stability;",
        "source": "Tacitus, The Life of Cnaeus Julius Agricola, §3 (written c. AD 98), English translation, Project Gutenberg eBook #7524.",
        "href": "https://www.gutenberg.org/cache/epub/7524/pg7524.txt",
        "image": {
          "src": "/covers/burnham-labour-leader--a0.png",
          "alt": "Marble portrait bust of the Roman emperor Nerva",
          "credit": "Photo by MumblerJamie, Ny Carlsberg Glyptothek, via Wikimedia Commons, CC BY-SA 2.0"
        }
      },
      {
        "category": "historical",
        "title": "On 9 August 1974, Richard Nixon resigned in disgrace over Watergate and Gerald Ford was sworn in as U.S. president without an election, having reached the office only because his predecessor was forced out. Ford's first task was not policy but reassurance: to tell an exhausted, cynical nation that the constitutional machinery had held and that the crisis was over. His plain-spoken promise of healing after a 'long national nightmare' is precisely the register Burnham is reaching for as he vows to restore hope to a country worn down by a decade of political churn. Both moments show the peculiar duty of the unelected successor: to convert a rupture at the top into a feeling of stability and fresh beginning for ordinary people.",
        "excerpt": "My fellow Americans, our long national nightmare is over. Our Constitution works; our great Republic is a government of laws and not of men. Here the people rule.",
        "source": "Gerald R. Ford, 'Remarks on Taking the Oath of Office,' August 9, 1974 (public domain U.S. government document), Miller Center of Public Affairs / Gerald R. Ford Presidential Library.",
        "href": "https://millercenter.org/the-presidency/presidential-speeches/august-9-1974-remarks-taking-oath-office",
        "image": {
          "src": "/covers/burnham-labour-leader--a1.png",
          "alt": "Official presidential portrait of Gerald R. Ford",
          "credit": "Official White House portrait of Gerald R. Ford, U.S. federal government, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Henry V, the Archbishop of Canterbury marvels at how the wild, disreputable Prince Hal was transformed the instant his father died and the crown passed to him, his old failings seeming to fall away as he assumed the burden of rule. It is the classic drama of succession: a new leader steps forward at the moment of transition and pledges, by his very bearing, that the realm will be better governed than before. Burnham's elevation carries the same hopeful theatre, a former mayor now cast as the reformed and steadier hand a troubled country needs. The scene captures the public wish, half faith and half gamble, that a change at the top can genuinely remake the man and the nation together.",
        "excerpt": "The courses of his youth promised it not.\nThe breath no sooner left his father's body,\nBut that his wildness, mortified in him,\nSeem'd to die too; yea, at that very moment\nConsideration, like an angel, came\nAnd whipp'd the offending Adam out of him,\nLeaving his body as a paradise,\nTo envelop and contain celestial spirits.",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act I, Scene 1 (c. 1599), Moby/Complete Works text, MIT.",
        "href": "https://shakespeare.mit.edu/henryv/henryv.1.1.html",
        "image": {
          "src": "/covers/burnham-labour-leader--a2.png",
          "alt": "Early portrait of King Henry V of England in profile",
          "credit": "Unknown artist, 'King Henry V,' National Portrait Gallery, London, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "At the close of Tennyson's Idylls of the King, the dying Arthur consoles the grieving Sir Bedivere as his kingdom passes away, insisting that the fall of an old order is not an end but the way renewal comes into the world. His famous line, that the old order yields place to the new lest one good custom corrupt the world, turns a moment of loss into a statement of faith in change. Burnham's rise after Starmer's ouster, and his own call to shift power away from Westminster toward 'the places people live,' echoes this conviction that entrenched arrangements must give way for the common good. Tennyson gives the melancholy but hopeful frame for any peaceful handover: the passing of one leader clears ground for the next.",
        "excerpt": "'The old order changeth, yielding place to new,\nAnd God fulfils himself in many ways,\nLest one good custom should corrupt the world.'",
        "source": "Alfred, Lord Tennyson, 'The Passing of Arthur,' Idylls of the King (1869/1885), Wikisource.",
        "href": "https://en.wikisource.org/wiki/Idylls_of_the_King/The_Passing_of_Arthur",
        "image": {
          "src": "/covers/burnham-labour-leader--a3.png",
          "alt": "Painting of the sleeping King Arthur attended by mourners in Avalon",
          "credit": "Edward Burne-Jones, 'The Last Sleep of Arthur in Avalon' (1881–1898), Museo de Arte de Ponce, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ambrogio Lorenzetti's fresco 'Effects of Good Government in the City,' painted for Siena's council chamber in 1338–39, imagines what wise rule looks like from the ground up: busy workshops, dancing citizens, safe streets and a countryside flourishing under just governance. It was made to remind the city's rulers that their decisions were felt in the ordinary lives of the people, a strikingly modern idea of accountable, place-rooted power. That is exactly the promise Burnham stakes his leadership on, shifting authority from a distant Westminster toward the towns and neighbourhoods where people actually live. The painting is the oldest great vision of the hope now being rekindled: that a new and better government will make daily life visibly bloom.",
        "excerpt": "A sweeping panorama of a thriving medieval city under good rule: townsfolk dance in the street, masons build, merchants trade and teachers instruct, while beyond the walls a serene, well-tended countryside stretches to the hills. Every figure is at ease and productive, the whole scene composed as a portrait of prosperity and civic peace flowing directly from just governance.",
        "source": "Ambrogio Lorenzetti, 'Effects of Good Government in the City' (from The Allegory of Good and Bad Government), fresco, 1338–1339, Sala dei Nove, Palazzo Pubblico, Siena.",
        "href": "https://en.wikipedia.org/wiki/The_Allegory_of_Good_and_Bad_Government",
        "image": {
          "src": "/covers/burnham-labour-leader--a4.png",
          "alt": "Fresco of a prosperous, peaceful medieval city with dancing citizens and busy trades",
          "credit": "Ambrogio Lorenzetti, Palazzo Pubblico, Siena (Google Art Project), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Handel composed 'Zadok the Priest' for the coronation of George II in 1727, setting the biblical scene of Solomon being anointed king to a slow-building orchestral swell that bursts into a jubilant choral shout. Its words, drawn from the anointing of a new sovereign and the people's rejoicing, have crowned every British monarch since, making it the definitive music of peaceful, legitimate succession. As Britain prepares to receive its seventh prime minister in a decade, the anthem's ancient formula, the people rejoicing that a new leader has been raised up, resonates with Burnham's promise of hope and renewal. The piece embodies the moment a nation ritually transfers power and dares to cheer the arrival of the one who comes next.",
        "excerpt": "Zadok the priest and Nathan the prophet anointed Solomon king. And all the people rejoiced and said: God save the King! Long live the King! God save the King! May the King live for ever. Amen. Hallelujah.",
        "source": "George Frideric Handel, 'Zadok the Priest' (Coronation Anthem No. 1, HWV 258), 1727; text adapted from 1 Kings 1:38–40. IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Zadok_the_Priest,_HWV_258_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/burnham-labour-leader--a5.png",
          "alt": "Portrait of composer George Frideric Handel",
          "credit": "Thomas Hudson, portrait of George Frideric Handel (1756), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "israel-knesset-dissolves-october-election",
    "headline": "Israel's Knesset votes to dissolve and sets an October 27 election, ending the first parliament to serve a full term since 1988",
    "overview": "The Knesset approved its own dissolution on Friday in a 62-0 vote, with Prime Minister Benjamin Netanyahu among those in favor, setting a general election for October 27. It is the first time Israel's parliament has served a full term since 1988. Netanyahu's coalition pushed through several contested laws in its final week, and polls show his bloc trailing a new centrist party led by former military chief Gadi Eisenkot.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxOWVlKd0tvVkdSdUIyMndadGp1c0NRS1pOYVowNmFZdDhxdUxvZDhzUl9OM0x0cDBiUHVGbTRRdDYwLXFidXVzZXc2cTNwMWQyeVF4LVBTbmkxZDdtOUFia29WRURZaWlWR0pPYlNzWk9jQ3ExakxPQjZvWHB5X3VXTUNQS3RBaDlaWkw2bHRmTVdiLVAzajN1UnVn?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/17/israel-headed-for-october-election-as-parliament-dissolved"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/israel-knesset-dissolves-october-election.png",
      "alt": "The Knesset, Israel's parliament building in Jerusalem.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 20 April 1653 Oliver Cromwell strode into the Rump of the Long Parliament and dissolved it at the point of the sword, ending a legislature he judged to have long outlived its mandate. His furious order that the members simply 'go' is the archetype of a parliament's abrupt death — yet where Cromwell used soldiers, Israel's Knesset ended itself peacefully by a 62-0 vote, with the prime minister himself raising his hand in favor. The scene is a dark mirror of the Jerusalem vote: the same recurring moment when a body that has 'sat too long' is brought to a close. It measures how rare and how civilized it is to end a government by ballot rather than by force.",
        "excerpt": "Your country therefore calls upon me to cleanse this Augean stable, by putting a final period to your iniquitous proceedings in this House; and which by God's help, and the strength he has given me, I am now come to do; I command ye therefore, upon the peril of your lives, to depart immediately out of this place; go, get you out! Make haste! Ye venal slaves be gone! So! Take away that shining bauble there, and lock up the doors. In the name of God, go!",
        "source": "Oliver Cromwell, speech dissolving the Rump of the Long Parliament, House of Commons, 20 April 1653 (traditional reconstructed text as printed on Wikisource; the speech survives only through later report, not a verbatim transcript).",
        "href": "https://en.wikisource.org/wiki/Dissolution_of_the_Long_Parliament",
        "image": {
          "src": "/covers/israel-knesset-dissolves-october-election--a0.png",
          "alt": "Benjamin West's 1782 painting of Oliver Cromwell, arm raised, ordering soldiers to clear the members from the House of Commons.",
          "credit": "Benjamin West, Oliver Cromwell Dissolving the Long Parliament (1782); via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "In his message to Congress on July 4, 1861, with the Union splitting into civil war, Abraham Lincoln argued that in a constitutional republic disputes must be settled at the polling place rather than the battlefield — that 'ballots are the rightful and peaceful successors of bullets.' That is precisely the wager Israel's Knesset made in dissolving itself and throwing the nation's future to an October 27 election. Netanyahu's bloc, now trailing in the polls, must make its case through the vote, seeking, in Lincoln's words, an 'appeal to ballots themselves at succeeding elections.' The passage frames the coming election as the peaceful successor to the sword.",
        "excerpt": "that ballots are the rightful and peaceful successors of bullets, and that when ballots have fairly and constitutionally decided there can be no successful appeal back to bullets; that there can be no successful appeal except to ballots themselves at succeeding elections.",
        "source": "Abraham Lincoln, Message to Congress in Special Session, July 4, 1861.",
        "href": "https://millercenter.org/the-presidency/presidential-speeches/july-4-1861-july-4th-message-congress",
        "image": {
          "src": "/covers/israel-knesset-dissolves-october-election--a1.png",
          "alt": "Photographic portrait of a bearded Abraham Lincoln, head and shoulders, 1863.",
          "credit": "Abraham Lincoln, 1863 portrait; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Coriolanus, the victorious general is forced to stand in the marketplace and beg ordinary citizens for their 'voices' — their votes — before he can take office, a humbling ritual he despises even as he performs it. The play dramatizes the hard truth now facing Netanyahu and the former general Gadi Eisenkot: however great a leader's record in war, power in a republic is granted and revoked by the people at the ballot. Coriolanus tallying his battle wounds to earn 'voices' anticipates a campaign in which military service must be converted into votes. It is the ancient theatre of appealing to the people.",
        "excerpt": "Your voices! For your voices I have fought;\nWatched for your voices; for your voices bear\nOf wounds two dozen odd. Battles thrice six\nI have seen and heard of; for your voices have\nDone many things, some less, some more. Your voices!\nIndeed, I would be consul.",
        "source": "William Shakespeare, Coriolanus, Act II, Scene III.",
        "href": "https://www.gutenberg.org/cache/epub/1535/pg1535.txt",
        "image": {
          "src": "/covers/israel-knesset-dissolves-october-election--a2.png",
          "alt": "Thomas Lawrence's 1798 portrait of actor John Philip Kemble in the title role of Coriolanus, standing in Roman military dress.",
          "credit": "Thomas Lawrence, John Philip Kemble as Coriolanus (1798); via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Walt Whitman's 'Election Day, November, 1884' declares that America's grandest spectacle is not Niagara or Yosemite but its 'choosing day' — the 'ballot-shower' of citizens voting, which he calls a 'swordless conflict' mightier than all of Rome's or Napoleon's wars. The poem is a hymn to exactly what Israel's Knesset set in motion by fixing an October 27 election: a peaceful, nationwide contest that stands in for combat. Whitman's snow-flake ballots falling from East to West carry the same faith that the vote, not the sword, decides a nation's fate. It casts the ballot as the successor to the battlefield.",
        "excerpt": "The final ballot-shower from East to West--the paradox and conflict,\nThe countless snow-flakes falling--(a swordless conflict,\nYet more than all Rome’s wars of old, or modern Napoleon’s:) the peaceful choice of all,",
        "source": "Walt Whitman, \"Election Day, November, 1884,\" Leaves of Grass (Sands at Seventy).",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt",
        "image": {
          "src": "/covers/israel-knesset-dissolves-october-election--a3.png",
          "alt": "Photographic portrait of Walt Whitman, white-bearded, seated, taken by George Collins Cox in 1887.",
          "credit": "Walt Whitman, photographed by George Collins Cox (1887); via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "George Caleb Bingham's The County Election turns an American voting day into a crowded civic panorama — the messy, communal act by which a people decide their own government. Painted after Bingham himself both lost and won bitterly contested elections, it treats the ballot as the ordinary machinery of self-rule, the same machinery Israel's Knesset has now handed back to its citizens for October 27. Every figure climbing the courthouse steps to vote embodies the moment a nation's fate is thrown to the people. It is the peaceful successor to the sword rendered in oil.",
        "excerpt": "Bingham packs a Missouri courthouse square with citizens on election day: a voter swears his oath with a raised hand, an incapacitated man is helped forward, boys play in the dust, and men of every class argue and mingle around the polling table. The painting presents voting as the boisterous, imperfect, deeply human ritual by which a community chooses its course.",
        "source": "George Caleb Bingham, The County Election, 1852, oil on canvas, Saint Louis Art Museum, St. Louis (acc. 124:1944).",
        "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_County_Election.jpg",
        "image": {
          "src": "/covers/israel-knesset-dissolves-october-election--a4.png",
          "alt": "A bustling 19th-century American courthouse square on election day, with citizens voting, arguing, and drinking amid a crowd of many social classes.",
          "credit": "George Caleb Bingham, The County Election (1852), Saint Louis Art Museum; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "The final canvas of Bingham's election trilogy, The Verdict of the People, shows the moment the votes are counted and the result announced to an anxious crowd — jubilation, dejection, and everything between as the people's judgment lands. It captures precisely the suspense Israel now enters: having dissolved its parliament, the nation waits for the electorate to render its verdict on Netanyahu's coalition and Eisenkot's insurgent centrists. Bingham freezes the instant when sovereignty visibly passes to the voters. It is the drama of throwing a government's fate to an election, made visual.",
        "excerpt": "In the last painting of his election series, Bingham depicts the public announcement of a vote's outcome: results are chalked and read out, a banner is unfurled, and a diverse throng reacts with triumph and despair. The scene renders the decisive moment when counted ballots become the sovereign verdict of the people.",
        "source": "George Caleb Bingham, The Verdict of the People, 1854-1855, oil on canvas, Saint Louis Art Museum, St. Louis (acc. 45:2001).",
        "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_Verdict_of_the_People.jpg",
        "image": {
          "src": "/covers/israel-knesset-dissolves-october-election--a5.png",
          "alt": "A 19th-century crowd gathered before a building as election results are announced, some celebrating and others dejected.",
          "credit": "George Caleb Bingham, The Verdict of the People (1854-1855), Saint Louis Art Museum; via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "apple-overtakes-nvidia-most-valuable",
    "headline": "Apple overtakes Nvidia as the world's most valuable company, closing near $4.88 trillion as AI-chip stocks slide",
    "overview": "Apple ended Friday worth about $4.88 trillion, edging past Nvidia's roughly $4.86 trillion after Nvidia's shares fell about 3.5%, and reclaiming a title it last held in early 2025. The shift came as investors reassessed the artificial-intelligence trade, with the Philadelphia Semiconductor Index down nearly 19% from its highs. Nvidia had reigned as the world's most valuable company since June 2025.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOQ0dxV3BmWDRMVmZLTHI0bWpNR2hCVTVfdWloZGRCdnZxTUZNNnBQMGs1bm9oVGpiZVVtclBiNkIxQjF5NlFJY2JjalR4cTIyVEg1TVAycGZpakdXQUxZWEtZWEdMemFhVXFDX2RPX21HV05QMnpVU0REaFpOYjlUVVROV09RdFFURmdVS1FUeFRRcUtoZHdTd3ZKRjNjWVk?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/17/apple-nvidia-aapl-nvda-market-cap.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/apple-overtakes-nvidia-most-valuable.png",
      "alt": "Apple's headquarters, Apple Park, in Cupertino, California.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Cyrus of Persia captured Croesus, king of Lydia, he toppled the man the ancient world named the richest and most fortunate alive. Herodotus tells how Croesus, bound atop a burning pyre, suddenly remembered the warning of Solon that no living man may be called happy, because Fortune reverses everyone in time. The victor Cyrus, hearing this, checked himself with the thought that he too was only a man and no more secure. It is the oldest lesson behind Apple's clawing back the crown from Nvidia: the entity perched highest by market value is exactly the one Fortune is next to move, and today's conqueror is tomorrow's cautionary tale.",
        "excerpt": "to Croesus as he stood upon the pyre there came, although he was in such evil case, a memory of the saying of Solon, how he had said with divine inspiration that no one of the living might be called happy.",
        "source": "Herodotus, The History of Herodotus, Book I (Clio), 1.86, trans. G. C. Macaulay",
        "href": "https://lexundria.com/hdt/1.86/mcly",
        "image": {
          "src": "/covers/apple-overtakes-nvidia-most-valuable--a0.png",
          "alt": "Attic red-figure amphora showing Croesus enthroned on his funeral pyre, an attendant lighting the flames.",
          "credit": "Croesus on the pyre, Attic red-figure amphora attributed to Myson, c. 500-490 BC, Louvre (G 197). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Cardinal Thomas Wolsey was, after King Henry VIII himself, the most powerful and wealthiest figure in early sixteenth-century England, controlling church and state alike. When he failed to secure the king's divorce he was stripped of office in 1529 and died in disgrace the next year, his sudden fall the defining lesson of a great man cast down from the summit. In George Cavendish's contemporary Life, the dying cardinal reflects that his worldly diligence had earned only ruin. His reversal maps onto Nvidia's slide from the world's most valuable company back below Apple: dominance built on a single favor of fortune, the AI trade, proved as revocable as a king's grace once investors reassessed.",
        "excerpt": "I see the matter against me how it is framed; but if I had served God as diligently as I have done the king, he would not have given me over in my grey hairs.",
        "source": "George Cavendish, The Life of Cardinal Wolsey (written c. 1557), ed. S. W. Singer",
        "href": "https://www.gutenberg.org/files/54043/54043-h/54043-h.htm",
        "image": {
          "src": "/covers/apple-overtakes-nvidia-most-valuable--a1.png",
          "alt": "Portrait of Cardinal Thomas Wolsey in red cardinal's robes.",
          "credit": "Cardinal Thomas Wolsey, unknown artist, late 16th century. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Chaucer's Monk defines tragedy itself as the story of one who stood in high degree and fell out of it into misery, illustrating it with a catalogue of the mighty thrown down. His governing image is the wheel of Fortune, whose turning no one can arrest, and whose motion warns against trusting in prosperity. That medieval formula reads like a script for the leaderboard of most-valuable companies, where Nvidia rode to the very top from June 2025 and was spun back down as AI-chip stocks slid. Apple's return to first place is one more turn of the same wheel the Monk describes: the highest seat is the least secure.",
        "excerpt": "For, certain, when that Fortune list to flee, / There may no man the course of her wheel hold: / Let no man trust in blind prosperity; / Beware by these examples true and old.",
        "source": "Geoffrey Chaucer, \"The Monk's Tale,\" The Canterbury Tales",
        "href": "https://en.wikisource.org/wiki/The_Canterbury_Tales_(unsourced)/The_Monk%27s_Tale",
        "image": {
          "src": "/covers/apple-overtakes-nvidia-most-valuable--a2.png",
          "alt": "Illuminated portrait of the Monk on horseback from the Ellesmere manuscript of the Canterbury Tales.",
          "credit": "The Monk, Ellesmere Chaucer manuscript, c. 1400-1410, Huntington Library. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Shelley's sonnet gives us the shattered colossus of a king who proclaimed himself \"King of Kings\" and commanded the mighty to look on his works and despair, now only a wreck in empty sand. The poem's irony is that the boast of supremacy is precisely what time and reversal mock; nothing beside the ruin remains. Nvidia's reign as the single most valuable company on earth, and the roughly 19 percent slide of the Philadelphia Semiconductor Index from its highs, echo that inscription's hollowing-out. Every claim to be the unassailable summit, whether a pharaoh's or a chipmaker's, invites the same desert wind.",
        "excerpt": "And on the pedestal these words appear: / \"My name is Ozymandias, King of Kings.\" / Look on my works ye Mighty, and despair! / No thing beside remains.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" The Examiner (London), 11 January 1818",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias",
        "image": {
          "src": "/covers/apple-overtakes-nvidia-most-valuable--a3.png",
          "alt": "Colossal broken granite bust of Ramesses II, the 'Younger Memnon,' in the British Museum.",
          "credit": "Colossal bust of Ramesses II, the 'Younger Memnon,' c. 1250 BC, British Museum. The statue's acquisition inspired Shelley's poem. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Edward Burne-Jones's monumental painting in the Musee d'Orsay shows Fortune as a grave, towering goddess turning a great wheel to which three naked men are bound: a slave, a crowned king, and a poet. Their nearly identical bodies rise, crest, and plunge in sequence, so that rank is merely a position on the turning rim, held only for a moment. The image is the exact visual grammar of the day Apple edged past Nvidia near $4.88 trillion while Nvidia's shares fell about 3.5 percent. Whoever occupies the top of the wheel, the most valuable company in the world, is by the goddess's own motion the one about to be carried down.",
        "excerpt": "Fortune, an impassive draped giantess, slowly turns a tall wheel to which three bound nude men are fixed, one ascending, one crowned at the summit, and one already pitching downward. Their interchangeable forms make visible that crown and chains alike are only stations on a rim that never stops moving.",
        "source": "Edward Burne-Jones, The Wheel of Fortune (La Roue de la Fortune), oil on canvas, 1875-1883, Musee d'Orsay, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Edward_Burne-Jones_-_The_Wheel_of_Fortune_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/apple-overtakes-nvidia-most-valuable--a4.png",
          "alt": "Painting of the goddess Fortune turning a large wheel bearing three bound nude men rising and falling.",
          "credit": "Edward Burne-Jones, The Wheel of Fortune (1875-1883), Musee d'Orsay, Paris. Public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Carl Orff opens and closes his 1936 cantata Carmina Burana with \"O Fortuna,\" thundering the medieval poem that likens Fortune to the moon, forever waxing and waning, and addresses her directly as the ever-turning wheel. The surviving thirteenth-century manuscript that gave Orff his text is headed by a painted Wheel of Fortune, kings rising and tumbling around its rim. Sung and pictured, it is the same reversal that saw Nvidia crowned the world's most valuable company in June 2025 and then slip behind Apple as the AI trade was reappraised. The verse insists that supremacy is by nature dissolubilis, always dissolving, exactly as market crowns change hands.",
        "excerpt": "O Fortuna / velut luna / statu variabilis, / semper crescis / aut decrescis... Sors immanis / et inanis, / rota tu volubilis, / status malus, / vana salus / semper dissolubilis.",
        "source": "Anonymous, \"O Fortuna,\" from the Codex Buranus (Carmina Burana), c. 1230; set to music by Carl Orff, Carmina Burana (1936). Text public domain; Latin verbatim.",
        "href": "https://en.wikipedia.org/wiki/O_Fortuna",
        "image": {
          "src": "/covers/apple-overtakes-nvidia-most-valuable--a5.png",
          "alt": "Medieval manuscript miniature of the Wheel of Fortune with figures rising to and falling from a throne at the top.",
          "credit": "Rota Fortunae, Codex Buranus (Carmina Burana), fol. 1r, c. 1230, Bavarian State Library, Munich (Clm 4660). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "china-british-steel-nationalisation",
    "headline": "China says it 'firmly opposes' Britain's nationalisation of British Steel and warns of damaged investor confidence",
    "overview": "China's Ministry of Commerce said it \"firmly opposes and is strongly dissatisfied with\" the UK's decision to nationalise British Steel, taken this week on national-security grounds, warning it had undermined Chinese firms' confidence in investing in Britain. The plant's Chinese owner, Jingye, bought British Steel for 70 million pounds in 2020 and is seeking full compensation. An independent evaluation will determine any payout.",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cjd4kvxpd3do"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/17/china-rebukes-uk-over-nationalisation-of-british-steel"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/china-british-steel-nationalisation.png",
      "alt": "An aerial view of British Steel's Scunthorpe works.",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 81 BCE the Han court staged the ancient world's great debate on nationalisation, the 'Discourses on Salt and Iron', in which the emperor's ministers defended state monopolies over iron and salt as the indispensable sinews of imperial power and frontier defence. Confucian critics attacked the monopolies as ruinous to private enterprise, but the officials insisted the forge and the salt-pan were too strategic to leave in private hands. Two millennia later the roles are reversed: it is Beijing that protests when Britain reclaims a strategic ironworks for the state, with a Chinese firm cast as the aggrieved private owner. The argument that control of iron is a matter of national survival, not mere commerce, is older than either nation.",
        "excerpt": "邊用度不足，故興鹽、鐵，設酒榷，置均輸，蕃貨長財，以佐助邊費。",
        "source": "Huan Kuan, Discourses on Salt and Iron (鹽鐵論), Chapter 1 'Benyi' (本議), compiled c. 81–49 BCE",
        "href": "https://zh.wikisource.org/wiki/%E9%B9%BD%E9%90%B5%E8%AB%96/%E5%8D%B701",
        "image": {
          "src": "/covers/china-british-steel-nationalisation--a0.png",
          "alt": "A Han dynasty cast-iron plough head, product of the state iron industry debated in the Discourses on Salt and Iron",
          "credit": "Han dynasty cast-iron plough, Shaanxi Provincial Museum; photo by Gary Lee Todd via Wikimedia Commons (CC BY-SA)"
        }
      },
      {
        "category": "historical",
        "title": "In March 1951 Iran's parliament nationalised the British-owned Anglo-Iranian Oil Company, seizing the Abadan refinery, then the largest in the world, on grounds of sovereignty over a strategic industry. London reacted much as Beijing does now: with fury over expropriated foreign property, warnings of ruined confidence and demands framed around compensation. The symmetry is sharp, for in 1951 it was Britain's own flagship asset abroad that was taken, whereas today it is Britain seizing a Chinese-owned works at home. The Iranian law justified the act 'for the Happiness and Prosperity of the Iranian nation', the same language of national interest now invoked over British Steel.",
        "excerpt": "For the Happiness and Prosperity of the Iranian nation and for the purpose of securing world peace, it is hereby resolved that the oil industry throughout all parts of the country, without exception, be nationalized; that is to say, all operations of exploration, extraction and exploitation shall be carried out by the Government.",
        "source": "Iran's Oil Nationalization Law, passed by the Majlis (16th Iranian Parliament), 20 March 1951",
        "href": "https://www.mohammadmossadegh.com/news/iran-oil-nationalization-law-1951/",
        "image": {
          "src": "/covers/china-british-steel-nationalisation--a1.png",
          "alt": "Portrait of Mohammad Mosaddegh, the Iranian prime minister who nationalised the British-owned Anglo-Iranian Oil Company",
          "credit": "Portrait of Mohammad Mosaddegh, c. 1952 (iichs.ir), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Richard II, the Duke of York warns the king that to seize the banished Bolingbroke's inheritance is to saw off the very branch the crown sits on: lawful property and orderly succession are the foundation of royal legitimacy itself. Break faith with one man's title, York argues, and you unravel the trust that lets any title stand. It is precisely the warning Beijing now levels at Westminster, that stripping Jingye of British Steel corrodes the security of property on which all future foreign investment depends. Shakespeare stages the eternal collision between sovereign power and private right.",
        "excerpt": "Take Hereford's rights away, and take from Time / His charters and his customary rights; / Let not to-morrow then ensue to-day; / Be not thyself; for how art thou a king / But by fair sequence and succession?",
        "source": "William Shakespeare, Richard II, Act II, Scene 1 (the Duke of York to King Richard), c. 1595",
        "href": "https://shakespeare.mit.edu/richardii/richardii.2.1.html",
        "image": {
          "src": "/covers/china-british-steel-nationalisation--a2.png",
          "alt": "The Westminster Abbey portrait of King Richard II, c. 1394–95",
          "credit": "Portrait of Richard II, c. 1394–95, Westminster Abbey; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "When Milton's fallen angels build their capital, Pandemonium, they do it by ripping ore from the earth and smelting it in furnaces fed by 'veins of liquid fire', the poem's great image of raw industry as the foundation of political power. The forge and the molten metal are literally what a sovereign realm is built from. British Steel's blast furnaces at Scunthorpe carry the same charge: whoever controls the fire that founds the metal controls a nation's capacity to arm, build and endure, which is exactly why London judged them too strategic to lose. Milton's infernal foundry is a reminder that the furnace has always been read as the sinew of power.",
        "excerpt": "Nigh on the plain, in many cells prepared, / That underneath had veins of liquid fire / Sluiced from the lake, a second multitude / With wondrous art founded the massy ore, / Severing each kind, and scummed the bullion-dross.",
        "source": "John Milton, Paradise Lost, Book I (1667; 1674 edition)",
        "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm",
        "image": {
          "src": "/covers/china-british-steel-nationalisation--a3.png",
          "alt": "John Martin's painting Pandemonium, depicting the fiery infernal capital forged by Milton's fallen angels",
          "credit": "John Martin, 'Le Pandemonium' (1841), Musée du Louvre, Paris; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg's 'Coalbrookdale by Night' (1801) shows the Madeley Wood ironworks erupting in flame against the darkness, the furnace as a new kind of national power and the very cradle of the Industrial Revolution that made Britain the workshop of the world. The painting treats iron-smelting as something between a wonder and a conflagration, awesome and consuming at once. That mythology of the furnace as the source of British might is exactly what is at stake when the state steps in to keep British Steel's blast furnaces alight. To let the fires go out is, in this iconography, to let national power itself die.",
        "excerpt": "A nocturne of the Madeley Wood (Bedlam) furnaces, the canvas throws a violent orange glare across the night sky as the ironworks blaze, silhouetting sheds, carts and labouring figures against columns of fire and smoke. De Loutherbourg renders heavy industry as the 'industrial sublime', at once a celebration of the coke-fired blast furnace and an early reckoning with what it unleashes.",
        "source": "Philip James de Loutherbourg, Coalbrookdale by Night, 1801, oil on canvas, Science Museum, London (Science Museum Group Collection)",
        "href": "https://collection.sciencemuseumgroup.org.uk/objects/co65204/coalbrookdale-by-night-by-philippe-jacques-de-loutherbourg",
        "image": {
          "src": "/covers/china-british-steel-nationalisation--a4.png",
          "alt": "Coalbrookdale by Night by Philip James de Loutherbourg, showing ironworks furnaces blazing against a dark sky",
          "credit": "Philip James de Loutherbourg, 'Coalbrookdale by Night' (1801), Science Museum, London; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Adolph Menzel's 'The Iron Rolling Mill' (1872–75), subtitled 'Modern Cyclopes', is the first great painting of heavy industry: half-stripped workers wrestling white-hot iron in a Silesian mill, the forge as the roaring engine of a newly unified and industrialising Germany. Menzel makes explicit that a nation's steel is made of both fire and human labour, and that such works are instruments of state power as much as commerce. It is that fusion of strategic industry and national identity that makes governments, British or Chinese, fight over who owns the furnace. The mill is not just a business; it is a sinew of the modern state.",
        "excerpt": "In a cavernous, smoke-filled hall, teams of workers strain around a glowing block of white-hot iron drawn from the rolling mill, their bodies lit by the metal's furnace glare. Menzel documents the machinery, heat and toil of modern heavy industry with unflinching realism, giving the picture its subtitle, 'Modern Cyclopes'.",
        "source": "Adolph Menzel, The Iron Rolling Mill (Das Eisenwalzwerk, 'Modern Cyclopes'), 1872–75, oil on canvas, Alte Nationalgalerie, Berlin",
        "href": "https://en.wikipedia.org/wiki/The_Iron_Rolling_Mill_(Modern_Cyclopes)",
        "image": {
          "src": "/covers/china-british-steel-nationalisation--a5.png",
          "alt": "Adolph Menzel's The Iron Rolling Mill, showing workers labouring around white-hot iron in a 19th-century mill",
          "credit": "Adolph Menzel, 'Das Eisenwalzwerk' (1872–75), Alte Nationalgalerie, Berlin (Google Art Project); public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "faa-boeing-self-certify-737-max-787",
    "headline": "The FAA restores Boeing's authority to certify its own 737 MAX and 787 jets as airworthy, effective July 20",
    "overview": "The Federal Aviation Administration said Friday it will let Boeing resume issuing airworthiness certificates for all 737 MAX and 787 aircraft starting July 20, ending step-by-step limits imposed after the fatal MAX crashes and later 787 quality problems. The agency said Boeing's final safety checks now match its own inspections. Government inspectors will keep overseeing Boeing's factories but focus more on catching defects earlier.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNYVhvMVlsS25hUnpxeUZ5VXRXTWtUVlhtMjU5Q2pic1Vfc3NOZm5aSktBaE5PcDYzX3RhZXRPQjlWN3F1SWVYSVJXY3drcTB0aFVETGVlLTlUU1ZHdkwyYjNzVkZtSzVUeTlrTFJpeEtBeVNVMEpTU0xYM1dINHFXRjkyS2JYcE9pMHMzU1o3QUdINldPcWt4b1gzemhXLWk4NmhGMWV3?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxNYTlDV0tMX2FuX2tob2ZJOGdscjgyV2JxSnI1WDdncjdKMV9nMjF6c01ublFWNndKencxcHdRcDQwSGRJUTJhODVhOVltRXhWaVVqZV9kRnBKRkVNQWhZc2R1QkQ4SFhRZjViSmVkeTNmVnVTVlpQYy1qNDNvVzlxUWE1WjN3eGstSnVuQnFnUHpFZV9TSGdIQmo1R3NUZGhCLXI1YWRLdHFLSXAwUlBjWi1GYjhSZFhVM3VqdllTSQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/faa-boeing-self-certify-737-max-787.png",
      "alt": "A Boeing 737 MAX aircraft in flight.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nearly 3,800 years before the FAA handed Boeing back the power to certify its own jets, Babylon's King Hammurabi confronted the same problem: what to do when the maker of a structure is also the judge of its safety. His law code did not let builders vouch for their own work with a shrug; it made them personally liable, on pain of death, when a house collapsed and killed its owner, and it forced them to rebuild toppling walls at their own expense. The parallel to Boeing is pointed. Where the FAA now trusts Boeing's final safety checks to match its own inspections, the oldest surviving building law insisted the consequences of self-certification fall squarely and severely on the craftsman.",
        "excerpt": "229. If a builder build a house for some one, and does not construct it properly, and the house which he built fall in and kill its owner, then that builder shall be put to death.\n232. If it ruin goods, he shall make compensation for all that has been ruined, and inasmuch as he did not construct properly this house which he built and it fell, he shall re-erect the house from his own means.\n233. If a builder build a house for some one, even though he has not yet completed it; if then the walls seem toppling, the builder must make the walls solid from his own means.",
        "source": "The Code of Hammurabi, laws 229, 232-233, trans. L. W. King (c. 1754 BCE; translation 1915).",
        "href": "https://avalon.law.yale.edu/ancient/hamcode.asp",
        "image": {
          "src": "/covers/faa-boeing-self-certify-737-max-787--a0.png",
          "alt": "The basalt stele of the Code of Hammurabi, its polished top showing the king before the sun god and its lower body densely covered in cuneiform law.",
          "credit": "Code of Hammurabi stele, Musée du Louvre (Sb 8). Photo by Mbzt, CC BY 3.0 via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "When the FAA lets Boeing stamp its own aircraft airworthy while inspectors keep watch over the factory, it revives a bargain medieval England struck with its goldsmiths. In 1300, Edward I's statute let craftsmen mark their own gold and silver, but only against a fixed standard and under the assay of the Guardians of the Craft, who stamped approved wares with the leopard's head. The maker vouched for the metal, yet an independent 'touch' stood between his word and the public's trust. That is precisely the tension in the Boeing decision: self-marking permitted, but only so long as an outside authority still holds the punch.",
        "excerpt": "no goldsmith… shall from henceforth make or cause to be made any manner of vessel, jewel or any other thing of gold or silver except it be of the true alloy […] and that no manner of vessel of silver depart out of the hands of the workers, until further, that it be marked with the leopard's head",
        "source": "Statute of Edward I, 1300 (28 Edw. I c. 20), as quoted by The Goldsmiths' Company Assay Office, 'History of Hallmarking.'",
        "href": "https://www.assayofficelondon.co.uk/about-us/history-of-hallmarking",
        "image": {
          "src": "/covers/faa-boeing-self-certify-737-max-787--a1.png",
          "alt": "Petrus Christus's 1449 panel of a goldsmith seated in his shop, weighing a ring on a small scale as a couple looks on amid shelves of precious wares.",
          "credit": "Petrus Christus, A Goldsmith in His Shop (1449), The Metropolitan Museum of Art (Robert Lehman Collection, 1975). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Boeing story is, at heart, a fable about a brilliant maker trusted to set the limits of his own creation, and no fable states it more plainly than Ovid's account of Daedalus. The master craftsman builds wings and, before flight, gives the safety rule himself: hold the middle course, neither so low the sea drags you down nor so high the sun melts the wax. The disaster comes when the rule is not respected in the air. For an aircraft maker regaining the right to certify that its own designs stay within safe bounds, the ancient warning lands hard: the craftsman may know exactly where the margins lie, and catastrophe can still follow when they are crossed.",
        "excerpt": "Icarus, I recommend thee to keep the middle tract; lest, if thou shouldst go too low, the water should clog thy wings; if too high, the fire {of the sun} should scorch them. Fly between both; and I bid thee neither to look at Boötes, nor Helice, nor the drawn sword of Orion. Under my guidance, take thy way.",
        "source": "Ovid, Metamorphoses, Book VIII (Daedalus and Icarus), trans. Henry T. Riley (1851).",
        "href": "https://www.gutenberg.org/cache/epub/26073/pg26073.txt",
        "image": {
          "src": "/covers/faa-boeing-self-certify-737-max-787--a2.png",
          "alt": "Herbert Draper's painting of the fallen Icarus, his great feathered wings still strapped to his body, mourned by nymphs against a darkening sea and sky.",
          "credit": "Herbert Draper, The Lament for Icarus (exhibited 1898), Tate. Public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "literary",
        "title": "Restoring Boeing's authority is also a story of redemption after catastrophe, and Coleridge gave that arc its most haunting form. His Mariner commits a needless act of destruction, is punished, and hangs the dead albatross about his neck as a mark of guilt, condemned until he can look on the world he wronged with fresh reverence. Only when a spring of love gushes from his heart and he blesses the living creatures does the weight fall from him. The FAA's decision imagines a similar turning: the disgraced maker, having borne the burden of the MAX crashes, is judged to have changed enough to be trusted again. Whether the penitent is truly reformed, or merely unburdened, is the poem's open question and the regulator's gamble.",
        "excerpt": "O happy living things! no tongue\nTheir beauty might declare:\nA spring of love gushed from my heart,\nAnd I blessed them unaware:\nSure my kind saint took pity on me,\nAnd I blessed them unaware.\n\nThe self same moment I could pray;\nAnd from my neck so free\nThe Albatross fell off, and sank\nLike lead into the sea.",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancient Mariner, Part IV.",
        "href": "https://www.gutenberg.org/cache/epub/151/pg151.txt",
        "image": {
          "src": "/covers/faa-boeing-self-certify-737-max-787--a3.png",
          "alt": "Gustave Doré's engraving of the Ancient Mariner's ship beneath a vast albatross with outstretched wings gliding over a moonlit, ice-strewn sea.",
          "credit": "Gustave Doré, illustration for The Rime of the Ancient Mariner (1877). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's most famous panel is the perfect visual gloss on a self-certification gamble gone wrong. In a sunlit, busy harbor world, a ploughman, a shepherd, and a merchant ship all carry on their work while, almost unnoticed in the corner, a pair of legs vanishes into the sea: Icarus has fallen and no one turns to look. The painting's cold point is that catastrophe from an over-reaching maker can slip by while ordinary commerce hums along undisturbed. As Boeing resumes signing off its own 737 MAX and 787 jets, Bruegel's canvas is a warning that the moment a safety margin fails may be quiet, marginal, and easy for a distracted world to overlook until it is too late.",
        "excerpt": "In this oil painting a farmer ploughs the foreground while a shepherd gazes skyward and merchant ships sail a golden bay; only a pair of pale legs disappearing into the water at lower right, and a scatter of feathers, mark the drowning of Icarus, whom no figure in the scene appears to notice.",
        "source": "Attributed to Pieter Bruegel the Elder, Landscape with the Fall of Icarus (c. 1560s), Royal Museums of Fine Arts of Belgium, Brussels (inv. 4030).",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/faa-boeing-self-certify-737-max-787--a4.png",
          "alt": "A luminous coastal landscape with a ploughman, shepherd, and sailing ships; in the lower right corner, the legs of the fallen Icarus disappear into the sea, unnoticed.",
          "credit": "After Pieter Bruegel the Elder, Landscape with the Fall of Icarus, Royal Museums of Fine Arts of Belgium. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Rembrandt's late masterpiece makes the emotional case for the FAA's wager: that a fallen figure can be received back. A ragged son who squandered everything kneels, head shorn and shoes worn through, while his father lays two weathered hands gently on his back in wordless acceptance, an elder brother watching stiffly from the shadows at the right. It is the definitive image of trust restored after ruin, tender but not naive about the doubters standing by. Set against Boeing's return to self-certifying its aircraft, the painting frames the hope behind the decision, and, in the skeptical brother, the unease of those who fear the embrace comes too soon.",
        "excerpt": "In this large, dark canvas a kneeling, ragged son presses his shorn head to the breast of his aged father, whose two hands rest on the son's back in a gesture of forgiveness, while a tall, richly dressed elder brother observes from the shadowed right, his face reserved and unconvinced.",
        "source": "Rembrandt van Rijn, The Return of the Prodigal Son (c. 1668), The State Hermitage Museum, Saint Petersburg.",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz._van_Rijn_-_The_Return_of_the_Prodigal_Son.jpg",
        "image": {
          "src": "/covers/faa-boeing-self-certify-737-max-787--a5.png",
          "alt": "Rembrandt's painting of a kneeling, ragged son embraced by his aged father, whose hands rest on his back, as an elder brother watches from the shadows.",
          "credit": "Rembrandt van Rijn, The Return of the Prodigal Son (c. 1668), The State Hermitage Museum. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "meta-anthropic-compute-lease-deal",
    "headline": "Meta and Anthropic are in talks over a compute-leasing deal worth up to $10 billion, sources say",
    "overview": "Anthropic is in early talks to lease data-center computing power from Meta in an arrangement that could be worth as much as $10 billion over two years, according to reports. Anthropic would pay in monthly instalments and either side could exit early. The talks fit Meta's push to show investors its vast AI spending can earn outside revenue, though a deal is not assured.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNS2NqN2VtZFNDLWpDUGxnTXlpZmdWRmI3QlJyeTZSS2cwOEdyVEVGY0NGd3F4UGdqYkVoTjVaUWR0bzJVcW8yY0N1dG1zUnl0UUVDa2dKYVhKU2F5OWJPTWFfSGdZWlRfMjZZdEVxUTRiVDE1LXhMSjR0a0FOMFItVHA3V3FTYlVjU0Mzcy12VG9JbVlORGF2bXBFa1BIUjBNaHR6ZnBn?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/17/anthropic-meta-ai-compute.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/meta-anthropic-compute-lease-deal.png",
      "alt": "Rows of servers inside a data center.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In August 1939 the two most implacable ideological enemies in Europe — Nazi Germany and the Soviet Union — stunned the world by signing a non-aggression pact, each calculating that a temporary handshake with its rival served its own ambitions. Neither trusted the other; both reserved the right to turn the moment it suited them, and within two years the pact lay in ruins. Meta and Anthropic are competitors racing for the same AI future, yet the compute-leasing talks run on the same logic of convenience: a bargain struck between rivals because, for now, the arithmetic works. As in 1939, either side may walk the instant the numbers change.",
        "excerpt": "Should one of the High Contracting Parties become the object of belligerent action by a third power, the other High Contracting Party shall in no manner lend its support to this third power.",
        "source": "Treaty of Non-Aggression between Germany and the Union of Soviet Socialist Republics (Molotov–Ribbentrop Pact), Article II, signed Moscow, 23 August 1939. The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/20th_century/nonagres.asp",
        "image": {
          "src": "/covers/meta-anthropic-compute-lease-deal--a0.png",
          "alt": "Joseph Stalin and German foreign minister Joachim von Ribbentrop shaking hands in the Kremlin, Moscow, 23 August 1939.",
          "credit": "German Federal Archives (Bundesarchiv, Bild 183-H27337 / CC-BY-SA 3.0), via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Near the end of the Peloponnesian War, oligarchic Sparta — self-styled liberator of Greece — did the unthinkable and took gold from the Persian Empire, the very power Greeks had united to repel a generation earlier, to build the fleet that would finally sink Athens. It was a bargain between civilizational rivals: Persia rented Sparta the sinews of war, and Sparta mortgaged its principles to win. Anthropic leasing Meta's data centers echoes this ancient trade — accepting a competitor's resources to power your own bid for supremacy. As the Greeks learned, whoever pays for the fleet holds a lever over its captain.",
        "excerpt": "The Lacedaemonians and their allies made a treaty with the King and Tissaphernes upon the terms following:... The war with the Athenians shall be carried on jointly by the King and by the Lacedaemonians and their allies.",
        "source": "Thucydides, History of the Peloponnesian War, Book VIII (the first treaty between Sparta and Persia, 412/411 BC), trans. Richard Crawley.",
        "href": "https://classics.mit.edu/Thucydides/pelopwar.8.eighth.html",
        "image": {
          "src": "/covers/meta-anthropic-compute-lease-deal--a1.png",
          "alt": "A gold Persian daric coin (circa 420 BC) depicting the Achaemenid king as an archer — the currency with which Persia financed Sparta's war fleet.",
          "credit": "Achaemenid gold daric, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Aesop's fable of the Horse, the Hunter, and the Stag is the oldest warning about renting a rival's strength. Desperate to beat the Stag, the Horse lets the Hunter bridle and saddle him — and wins — only to discover the Hunter will never dismount. The moral is precisely the anxiety hovering over Anthropic's talks with Meta: accept a stronger partner's help to defeat your enemy, and you may find you have handed that partner the reins. A short-term edge in compute can harden into long-term dependence on the very company you mean to outrun.",
        "excerpt": "\"Not so fast, friend,\" said the Hunter, \"I have now got you under bit and spur, and prefer to keep you as you are at present.\" If you allow men to use you for your own purposes, they will use you for theirs.",
        "source": "Aesop, \"The Horse, Hunter, and Stag,\" in The Fables of Æsop, ed. Joseph Jacobs (London: Macmillan, 1894).",
        "href": "https://en.wikisource.org/wiki/The_Fables_of_%C3%86sop_(Jacobs)/The_Horse,_Hunter,_and_Stag",
        "image": {
          "src": "/covers/meta-anthropic-compute-lease-deal--a2.png",
          "alt": "1894 illustration of Aesop's fable in which the hunter bridles and mounts the horse to chase down the stag.",
          "credit": "Illustration by Richard Heighway from The Fables of Æsop (Jacobs, 1894), via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Shipwrecked and terrified in a storm, Shakespeare's jester Trinculo crawls under the cloak of the monstrous Caliban for shelter, muttering that misery acquaints a man with strange bedfellows. It is the perfect image of an alliance formed not from affection but from necessity — two unlike creatures huddled together because the weather demands it. Meta and Anthropic, rivals caught in the same commercial storm, would be sharing shelter for exactly that reason. Their compute pact, like Trinculo's, lasts only as long as the tempest.",
        "excerpt": "Alas, the storm is come again. My best way is to creep under his gaberdine. There is no other shelter hereabout. Misery acquaints a man with strange bedfellows. I will here shroud till the dregs of the storm be past.",
        "source": "William Shakespeare, The Tempest, Act 2, Scene 2 (Trinculo). Folger Shakespeare Library.",
        "href": "https://www.folger.edu/explore/shakespeares-works/the-tempest/read/2/2/",
        "image": {
          "src": "/covers/meta-anthropic-compute-lease-deal--a3.png",
          "alt": "Johann Heinrich Ramberg's scene from The Tempest showing Trinculo, Stephano, and the monster Caliban together.",
          "credit": "Johann Heinrich Ramberg, via Wikimedia Commons (Cornell University; public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Paolo Uccello's mid-15th-century panels of the Battle of San Romano immortalize the age of the condottieri — mercenary captains who rented their armies to whichever Italian city-state paid best, sometimes switching sides mid-campaign. The London panel shows the Florentine commander Niccolò da Tolentino, a hired sword, leading a charge in a war waged largely with leased force. It is a gilded monument to the business of renting power: the means of victory bought, not owned. Anthropic contracting Meta's compute is a modern condotta — hiring another's strength for a fixed term, on terms either party can break.",
        "excerpt": "Painted in tempera and gold on poplar and roughly three metres wide, the panel freezes a thicket of lances and armoured horses around the Florentine captain Niccolò da Tolentino, conspicuous in an outsized patterned hat at the head of the charge. Broken spears litter the ground in near-geometric lines, an early experiment in the new science of perspective. It is one of three panels; this one hangs in the National Gallery, London.",
        "source": "Paolo Uccello, The Battle of San Romano (Niccolò Mauruzi da Tolentino at the Battle of San Romano), c. 1438–40, tempera on panel. The National Gallery, London.",
        "href": "https://www.nationalgallery.org.uk/paintings/paolo-uccello-the-battle-of-san-romano",
        "image": {
          "src": "/covers/meta-anthropic-compute-lease-deal--a4.png",
          "alt": "Paolo Uccello's The Battle of San Romano (London panel), depicting condottieri mercenaries in an armoured cavalry charge amid a forest of lances.",
          "credit": "Paolo Uccello, The National Gallery, London, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Charles Gounod's 1859 opera Faust set to soaring music the oldest fable of the ruinous bargain: the scholar Faust trades his soul for youth and power, and Mephistopheles agrees to serve him now on the understanding that the accounts will be settled later. \"In this world I will be thy slave,\" the devil sings, \"but down below thou must be mine\" — the deal reverses who serves whom the instant the term expires. That is the quiet risk beneath any arrangement where one power leases its strength to another. Anthropic and Meta would each insist they can simply walk away; Faust thought so too.",
        "excerpt": "MÉPHISTOPHÉLÈS: \"Ici, je suis à ton service, / Mais là-bas tu seras au mien.\" (\"In this world I will be thy slave, / But down below thou must be mine.\")",
        "source": "Charles Gounod (music), Jules Barbier and Michel Carré (libretto), Faust, Act I (1859); bilingual French/English libretto, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/45806/45806-h/45806-h.htm",
        "image": {
          "src": "/covers/meta-anthropic-compute-lease-deal--a5.png",
          "alt": "Ary Scheffer's 1848 painting Faust and Mephistopheles, the scholar beside the devil who has bargained for his soul.",
          "credit": "Ary Scheffer (1848), via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "france-blocks-polymarket",
    "headline": "France orders internet providers to block the prediction market Polymarket over unlicensed gambling",
    "overview": "France's national gaming authority, the ANJ, ordered internet service providers to block access to Polymarket, saying the crypto-based prediction platform offers betting that is not authorised under French law. Visits from French internet addresses had climbed to about 579,000 last month despite an existing ban on transactions. Regulators also flagged weather-linked wagers after a Meteo-France probe was hacked to fix bets.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQOWFYYVd5enczTjZ6dDVnaTlWemJmVTRrS2FOTUdZWXR2Zmd1eHhNZ05VREhNb1hlZktlS0UwYkhkbWtxang4MUdWakpKakpkU2NadlAta0otOEc3N1lDLUVTanlVWm1qNjVMS3paTEQ1cEV5Nkg3a21DYUloSzNjd2hCc1ZwRkZ4OW5GMjE4YmpJNm9HVGtTWGZUU2pUeDJ4TFR2MEtlVDdUREFkRnc?oc=5"
      },
      {
        "name": "France 24",
        "href": "https://www.france24.com/en/france/20260717-france-orders-internet-service-providers-to-block-access-to-polymarket"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/france-blocks-polymarket.png",
      "alt": "A smartphone showing an online betting and prediction-market interface.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before ANJ ordered French ISPs to wall off a crypto betting platform, Roman authorities were already drawing a sharp legal line around wagering. The Digest of Justinian, codifying centuries of Roman law, treated the aleator (dice-player) as a disreputable figure and refused legal protection to those who ran or frequented gambling dens. Strikingly, Roman law did not ban all wagering outright: it carved out an exception for bets on contests of skill and courage, much as France licenses regulated betting while condemning games of pure chance like Polymarket's weather wagers. The parallel is exact — a state deciding which bets on uncertain outcomes are lawful and which are vice.",
        "excerpt": "A Decree of the Senate forbids playing for money, except where the parties contend with spears, or by throwing the javelin, or in running, leaping, wrestling, or boxing, for the purpose of displaying courage and address.",
        "source": "The Digest (Pandects) of Justinian, Book XI, Title 5, 'Concerning Gamblers' (De aleatoribus), trans. Samuel P. Scott (1932).",
        "href": "https://droitromain.univ-grenoble-alpes.fr/Anglica/D11_Scott.htm",
        "image": {
          "src": "/covers/france-blocks-polymarket--a0.png",
          "alt": "Ancient Roman fresco from a Pompeii tavern showing two men seated at a table gambling with dice.",
          "credit": "Fresco, Osteria della Via di Mercurio, Pompeii (before 79 CE); photo Wolfgang Rieger, public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "When Henry VIII's Parliament passed the Unlawful Games Act of 1541, it fretted, as France's ANJ does today, about 'crafty' new games luring the public away from sanctioned activity — then archery, now regulated betting. The Tudor statute condemned freshly invented games and imposed penalties on the 'houses' that hosted them, the sixteenth-century equivalent of ordering the shutdown of a gaming venue. Polymarket, a novel crypto contrivance that drew some 579,000 French visits in a single month, is precisely the kind of 'new and crafty game' the powers that be have always moved to suppress. The instinct to blame ingenious operators and close their premises spans five centuries.",
        "excerpt": "divers and many subtil inventative and crafty persons have found and daily find many and sundry new and crafty games and plays, as logating in the fields, slide-thrift, otherwise called shove-groat...archery is sore decayed, and daily is like to be more minished",
        "source": "Unlawful Games Act 1541 (33 Henry VIII, c. 9), as quoted in the 1911 Encyclopædia Britannica, 'Gaming and Wagering.'",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gaming_and_Wagering",
        "image": {
          "src": "/covers/france-blocks-polymarket--a1.png",
          "alt": "Sixteenth-century oil painting of finely dressed figures gathered around a table playing cards.",
          "credit": "Lucas van Leyden, The Card Players, c. 1517, National Museum, Warsaw; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Meteo-France detail — a probe allegedly hacked to fix weather-linked bets — has an ancient literary twin in the Mahabharata's fateful game of dice. There, the cunning Sakuni plays for the Kaurava side with loaded dice, declaring victory again and again as Yudhishthira stakes and loses his wealth, his kingdom, his brothers, and finally his wife. The epic frames the rigged wager as a civilizational catastrophe, the spark that ignites a ruinous war — a warning that when the outcome of a bet can be secretly manipulated, the whole social order is imperilled. Regulators blocking a market over fixable, weather-linked wagers are grappling with the very anxiety this three-thousand-year-old scene dramatizes.",
        "excerpt": "Hearing these words, Sakuni ready with the dice, and adopting unfair means, said unto Yudhishthira, 'Lo, I have won!'",
        "source": "The Mahabharata, Book 2 (Sabha Parva), Section LX, trans. Kisari Mohan Ganguli (1883–1896).",
        "href": "https://en.wikisource.org/wiki/The_Mahabharata/Book_2:_Sabha_Parva/Section_LX",
        "image": {
          "src": "/covers/france-blocks-polymarket--a2.png",
          "alt": "Mural depicting the great gambling scene of the Mahabharata, with figures gathered at the dice game in a royal assembly.",
          "credit": "Mural after Basawan and Daswanth, Albert Hall Museum, Jaipur; photo Neek-Theri, CC BY-SA 4.0, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Dostoevsky's The Gambler captures the compulsive pull that makes prediction markets and roulette wheels alike so alarming to regulators. His narrator describes the moment of winning not as prudence rewarded but as an intoxicating dare against fate itself, an urge to keep staking that overrides all reason. This is exactly the behavior France's gaming authority invokes when it treats Polymarket as unlicensed gambling rather than harmless forecasting: the platform's appeal is the same defiant thrill of betting on an uncertain future. The novel, drawn from Dostoevsky's own ruinous addiction, is the enduring portrait of why the state fears the wager.",
        "excerpt": "That, of course, was the proper moment for me to have departed, but there arose in me a strange sensation as of a challenge to Fate—as of a wish to deal her a blow on the cheek, and to put out my tongue at her.",
        "source": "Fyodor Dostoevsky, The Gambler (1866), trans. C. J. Hogarth.",
        "href": "https://www.gutenberg.org/files/2197/2197-h/2197-h.htm",
        "image": {
          "src": "/covers/france-blocks-polymarket--a3.png",
          "alt": "Vasily Perov's 1872 portrait of a pensive Fyodor Dostoevsky seated with clasped hands.",
          "credit": "Vasily Perov, Portrait of F. M. Dostoevsky, 1872, State Tretyakov Gallery, Moscow; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Caravaggio's The Cardsharps stages the exact fear driving France's crackdown: that behind every wager on chance lurks the possibility of a fix. A naive young player studies his hand while an accomplice signals his cards and a second cheat hides extra cards behind his back, ready to swap them in. Painted around 1595, it made Caravaggio's reputation precisely because it exposed the rigged mechanics beneath the game of fortune — the same suspicion regulators voiced when a Meteo-France probe was hacked to determine bets. The canvas is a timeless image of the gulf between the gambler's trust in luck and the manipulation that can decide the outcome.",
        "excerpt": "A finely dressed boy plays cards against an older youth who, watched by a mustachioed conspirator peering over his shoulder, reaches behind his back for concealed cards, while daggers and a backgammon-like edge hint at the danger of the swindle. The scene freezes the instant of deception, contrasting the innocent player's concentration with the cheats' collusion.",
        "source": "Caravaggio (Michelangelo Merisi), The Cardsharps, c. 1595, oil on canvas, Kimbell Art Museum, Fort Worth.",
        "href": "https://en.wikipedia.org/wiki/Cardsharps",
        "image": {
          "src": "/covers/france-blocks-polymarket--a4.png",
          "alt": "Caravaggio painting of a young card player being cheated by two conspirators, one hiding cards behind his back.",
          "credit": "Caravaggio, The Cardsharps, c. 1595, Kimbell Art Museum; public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Georges de La Tour's The Cheat with the Ace of Diamonds, hanging in the Louvre, turns a card table into a moral tableau about the perils of the wager. A richly dressed young man, absorbed in his hand and his pile of gold, is oblivious to the three figures conspiring to strip him of it — the cheat drawing a hidden ace from his belt, the courtesan and servant exchanging glances. Painted around 1636, it presents gambling as a trap laid by the crafty for the unwary, the seventeenth-century artist's verdict on betting as vice. It is the visual argument France's regulators are making when they cast an unlicensed prediction market as a snare rather than a game.",
        "excerpt": "By candid, theatrical light, a lavishly dressed youth ponders his cards and coins while, unseen by him, a cardsharp slides a concealed ace of diamonds from behind his sash and two women trade knowing looks. The painting distills gambling, wine, and lust into a single quiet moment of impending fleecing.",
        "source": "Georges de La Tour, The Cheat with the Ace of Diamonds (Le Tricheur à l'as de carreau), c. 1636, oil on canvas, Musée du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Le_Tricheur_%C3%A0_l'as_de_carreau_-_Georges_de_La_Tour_-_Mus%C3%A9e_du_Louvre_Peintures_RF_1972_8.jpg",
        "image": {
          "src": "/covers/france-blocks-polymarket--a5.png",
          "alt": "Georges de La Tour painting of card players in which one man draws a hidden ace of diamonds from his belt to cheat a wealthy young player.",
          "credit": "Georges de La Tour, Le Tricheur à l'as de carreau, c. 1636, Musée du Louvre; public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "eu-carbon-market-slowdown",
    "headline": "The EU proposes slowing its carbon-market emissions cuts and handing industry about 6 billion euros in extra free permits",
    "overview": "The European Commission proposed on Friday to slow the pace at which its Emissions Trading System tightens, cutting the annual \"linear reduction factor\" and granting heavy industry billions in additional free CO2 permits to protect competitiveness. A fast-tracked measure would add free allowances worth about 6 billion euros for 2026-2030, and free permits for heavy industry would run to 2038. Environmental groups said the plan weakens the bloc's flagship climate tool.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ckgv0zd497zo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOYS1kcGtvX2FiY0N0Rl9Ta0txX19fcUZJU3VWMDdqLU51Y1hpVmtyZ040UERmSzJROWdMVWZ4ZlhoRFVRY2V2R3NPRERFTWJvQU51VkkxZkVGMTlzYTJZaURHWmd6V1dwMWxpdGxneUpkby1YekZMdzFnRHJUVlNRZ1Bkdk5lanlhMTNqNy0wZnQ0MldNNHRpMHc5LXpETWtMZm8xRzN3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/eu-carbon-market-slowdown.png",
      "alt": "Cooling towers releasing steam at the Jaenschwalde lignite-fired power station in Germany.",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the early 1500s the Church sold indulgences: pay a fee, and a soul could be sprung from purgatory without changing one's conduct. The pardon-sellers turned the hard, distant work of penance into a purchasable convenience, letting buyers keep sinning while the account came due later. The EU's extra free CO2 permits work along the same logic in reverse: heavy industry receives roughly 6 billion euros in allowances that let it keep emitting now, deferring the harder reckoning of decarbonisation. When a promise about a distant common good can be bought down with a payment today, the vow itself loses its bite.",
        "excerpt": "They preach man who say that so soon as the penny jingles into the money-box, the soul flies out [of purgatory].",
        "source": "Martin Luther, Disputation of Doctor Martin Luther on the Power and Efficacy of Indulgences (the Ninety-five Theses), Thesis 27, 1517.",
        "href": "https://en.wikisource.org/wiki/Disputation_of_Doctor_Martin_Luther_on_the_Power_and_Efficacy_of_Indulgences",
        "image": {
          "src": "/covers/eu-carbon-market-slowdown--a0.png",
          "alt": "A 1510 German woodcut depicting the sale of indulgences, with clergy handing pardon-letters to buyers who pay coins into a coffer.",
          "credit": "Sale of indulgences, woodcut, c. 1510, unknown artist. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 30 September 1938 Neville Chamberlain stepped off the plane from Munich and told a relieved crowd he had brought back \"peace for our time,\" having conceded Czechoslovak territory to Hitler to avoid an immediate confrontation. The comfort was real but bought at the future's expense: the concession bought a year of calm and a far larger cost. The EU's decision to slow its Emissions Trading System, cut the linear reduction factor and hand industry billions in free permits is a similar trade of present ease for a heavier bill later. It relaxes a hard commitment under pressure, buying short-term competitiveness while the climate deadline it was meant to meet moves no closer.",
        "excerpt": "My good friends, this is the second time in our history that there has come back from Germany to Downing Street peace with honour. I believe it is peace for our time.",
        "source": "Neville Chamberlain, remarks at 10 Downing Street, 30 September 1938.",
        "href": "https://en.wikipedia.org/wiki/Peace_for_our_time",
        "image": {
          "src": "/covers/eu-carbon-market-slowdown--a1.png",
          "alt": "Neville Chamberlain holding the Anglo-German Declaration paper at Heston Aerodrome on 30 September 1938 after returning from Munich.",
          "credit": "Neville Chamberlain at Heston Aerodrome, 30 September 1938. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Marlowe's tragedy, Doctor Faustus signs a deed granting Lucifer his body and soul in exchange for twenty-four years of power and pleasure, treating a distant catastrophe as a price worth paying for present gain. The bargain feels like freedom until the clock runs out and the bill falls due in full. The EU's move to loosen its flagship climate tool for near-term industrial comfort carries the same structure: enjoy the allowances now, defer the cost to a horizon that runs to 2038. Faustus's deed is a warning that promises which mortgage the future for present relief tend to be honoured on the future's terms, not ours.",
        "excerpt": "I, JOHN FAUSTUS, OF WERTENBERG, DOCTOR, BY THESE PRESENTS, DO GIVE BOTH BODY AND SOUL TO LUCIFER PRINCE OF THE EAST, AND HIS MINISTER MEPHISTOPHILIS; AND FURTHERMORE GRANT UNTO THEM, THAT, TWENTY-FOUR YEARS BEING EXPIRED, THE ARTICLES ABOVE-WRITTEN INVIOLATE, FULL POWER TO FETCH OR CARRY THE SAID JOHN FAUSTUS, BODY AND SOUL, FLESH, BLOOD, OR GOODS, INTO THEIR HABITATION WHERESOEVER.",
        "source": "Christopher Marlowe, The Tragical History of Doctor Faustus, Scene V, c. 1604 (Project Gutenberg edition).",
        "href": "https://www.gutenberg.org/cache/epub/779/pg779.txt",
        "image": {
          "src": "/covers/eu-carbon-market-slowdown--a2.png",
          "alt": "Frontispiece woodcut to a 1620 printing of Doctor Faustus, showing Faustus in a magic circle conjuring a devil.",
          "credit": "Frontispiece to the 1620 quarto of Doctor Faustus. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Aesop's grasshopper sings away the summer while the ants store grain, then arrives at their door starving when winter comes, having chosen present ease over provision for a foreseeable hard season. The fable is a parable of resolve for a distant common good: the discipline is dull now but decisive later. Slowing emissions cuts and granting industry billions in extra free permits chooses the grasshopper's summer, easing the pace of the hard work that the climate winter will demand. The moral is unsentimental about who pays when providence is traded for comfort.",
        "excerpt": "THE ANTS were spending a fine winter's day drying grain collected in the summertime. A Grasshopper, perishing with famine, passed by and earnestly begged for a little food. The Ants inquired of him, \"Why did you not treasure up food during the summer?\" He replied, \"I had not leisure enough. I passed the days in singing.\" They then said in derision: \"If you were foolish enough to sing all the summer, you must dance supperless to bed in the winter.\"",
        "source": "Aesop, \"The Ants and the Grasshopper,\" Aesop's Fables, trans. George Fyler Townsend (Project Gutenberg edition).",
        "href": "https://www.gutenberg.org/files/21/21-h/21-h.htm",
        "image": {
          "src": "/covers/eu-carbon-market-slowdown--a3.png",
          "alt": "Illustration of the grasshopper begging at the ants' door in the snow while the ants tend their stored grain.",
          "credit": "Milo Winter, illustration for The Aesop for Children, 1919. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Turner's Rain, Steam and Speed shows a black locomotive tearing across a bridge through mist, the sublime new power of the industrial age rendered as both thrilling and ominous, its smoke swallowing the landscape. It is the founding image of a fossil-fuelled economy whose emissions the Emissions Trading System was designed to price and shrink. Softening that system and handing coal- and gas-intensive industry billions in free permits eases the pressure on exactly the smoke Turner painted, letting the engine run harder for longer. The canvas hangs in the National Gallery as a reminder of how seductive, and how enduring, the machinery of emissions has proved.",
        "excerpt": "A dark steam locomotive races toward the viewer over the Maidenhead railway bridge, half-dissolved in rain and steam, while the river valley behind it blurs into golden haze. Turner turns industrial power into a natural force, exhilarating and enveloping at once, its plume of smoke merging with the sky.",
        "source": "J. M. W. Turner, Rain, Steam and Speed – The Great Western Railway, 1844, oil on canvas, The National Gallery, London (NG538).",
        "href": "https://en.wikipedia.org/wiki/Rain,_Steam_and_Speed_%E2%80%93_The_Great_Western_Railway",
        "image": {
          "src": "/covers/eu-carbon-market-slowdown--a4.png",
          "alt": "Turner's painting of a steam locomotive speeding over a bridge through rain and mist, its smoke merging with a hazy golden sky.",
          "credit": "J. M. W. Turner, Rain, Steam and Speed, 1844, National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Steenwyck's vanitas arranges a skull, a guttering lamp, a lute, a shell and a fine sword on a table, worldly pleasures and powers set beside the certainty that time exhausts them. The genre exists to puncture the illusion that present comfort can be enjoyed without a reckoning. The EU's fast-tracked package buys immediate industrial ease with roughly 6 billion euros in free allowances, the kind of near-term comfort a vanitas is built to question. Set against the painting, the choice to dilute a solemn climate commitment for present relief looks like a still life of goods that the future will quietly repossess.",
        "excerpt": "On a table edge, a human skull sits amid emblems of transience: an extinguished lamp trailing smoke, a lute, a Japanese sword, a large shell and books. A single shaft of light falls across them, and objects tip toward the viewer, as if pleasures and possessions are already slipping away.",
        "source": "Harmen Steenwyck, Still Life: An Allegory of the Vanities of Human Life, c. 1640, oil on oak, The National Gallery, London.",
        "href": "https://en.wikipedia.org/wiki/Still_Life:_An_Allegory_of_the_Vanities_of_Human_Life",
        "image": {
          "src": "/covers/eu-carbon-market-slowdown--a5.png",
          "alt": "A Dutch vanitas still life with a skull, extinguished lamp, lute, shell and sword lit by a diagonal shaft of light.",
          "credit": "Harmen Steenwyck, Still Life: An Allegory of the Vanities of Human Life, c. 1640, National Gallery, London. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "mexico-chiapas-earthquake",
    "headline": "A magnitude 7.3 earthquake strikes off Mexico's Chiapas coast, triggering a tsunami warning felt in Guatemala and El Salvador",
    "overview": "A magnitude 7.3 earthquake struck about 48 km southwest of Aquiles Serdan off the coast of Chiapas at a depth of 15 km on Friday, the USGS said, prompting a tsunami warning for coastlines within 300 km. Shaking was felt in Guatemala and El Salvador, where residents evacuated buildings. Authorities reported no major damage, though two people were injured and some walls and roofs collapsed in Chiapas.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwyjv3815yxo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNVWxrSEMwLS01RTJuYy04NmVnVm5jS3Z4a09UWXNZZ21RT0tEVU9YSGNrQW9KM0FQZDZlQ2xyOHR5aGNLM3ppUWNkTG9yaGNodnhlVzJjUXRyNEQ1TUw1VWtTLTZhbXRzSHVuNUNmSjJSMTBUYWR6anNLYmNpaXhXRXpMZ2ZoT0dNY09fSUhtYVJwaU82ZGdOOVVWNWwteGJhR2x0bDZaMzY5VzA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/mexico-chiapas-earthquake.png",
      "alt": "Residents gather in a street in San Salvador after evacuating buildings following the earthquake.",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On All Saints' Day, 1 November 1755, a great earthquake off Portugal's coast leveled Lisbon in minutes, then sent the sea rushing back over the survivors who had fled to the open waterfront. The three shocks toppled churches and palaces, fires raged for days, and a tsunami swept the Tagus quay just as one now threatens the Chiapas coast within 300 km of the epicenter. Lisbon became Europe's archetype of the earth as sudden leveller of cities and of the sea's second blow after the ground heaves. The magnitude 7.3 Chiapas quake, felt across Guatemala and El Salvador, echoes that same primal sequence in miniature: the shudder underfoot, the warning to flee the shore.",
        "excerpt": "The 1755 Lisbon earthquake, estimated at magnitude 8.5–9.0, struck offshore in the Atlantic and destroyed most of Portugal's capital, killing tens of thousands. It was followed roughly forty minutes later by a tsunami that surged up the Tagus and along the coast, and by fires that burned for days. The disaster became a defining event for Enlightenment debates on nature, providence, and human vulnerability.",
        "source": "The 1755 Lisbon earthquake (All Saints' Day earthquake), Kingdom of Portugal, 1 November 1755.",
        "href": "https://en.wikipedia.org/wiki/1755_Lisbon_earthquake",
        "image": {
          "src": "/covers/mexico-chiapas-earthquake--a0.png",
          "alt": "Painted allegory of the 1755 Lisbon earthquake showing collapsing buildings, fleeing figures, and chaos amid the ruins.",
          "credit": "João Glama Ströberle, 'Alegoria ao Terramoto de 1755' (c. 1756–1792), Museu Nacional de Arte Antiga, Lisbon. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "At 7:17 on the morning of 19 September 1985, a magnitude 8.0 earthquake off Mexico's Pacific coast rippled inland and shattered Mexico City, collapsing more than 400 buildings and killing thousands. Hospitals, apartment blocks, and offices pancaked as the soft lakebed soil amplified the shaking hundreds of kilometers from the offshore rupture. It remains the nation's deepest scar and its most vivid reminder that the ground beneath human works can betray them without warning. The Chiapas tremor, offshore and coastal like 1985, revives that Mexican memory of the earth as a levller of cities, even when this time the toll was mercifully light.",
        "excerpt": "The 1985 Mexico City earthquake had a moment magnitude of 8.0 and struck off the Pacific coast in the Michoacán subduction zone. Though the epicenter lay far away, the city's ancient lakebed sediments amplified the waves, collapsing 412 buildings and seriously damaging thousands more. At least 5,000 people died, and the catastrophe reshaped Mexican building codes and civil-defense preparedness.",
        "source": "The 1985 Mexico City earthquake, 19 September 1985.",
        "href": "https://en.wikipedia.org/wiki/1985_Mexico_City_earthquake",
        "image": {
          "src": "/covers/mexico-chiapas-earthquake--a1.png",
          "alt": "Rubble of the collapsed General Hospital in Mexico City after the September 1985 earthquake.",
          "credit": "U.S. Geological Survey (USGS), 1985. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Chapter 5 of Voltaire's 'Candide' (1759), the hero and Pangloss reach Lisbon just as the great earthquake strikes, the sea foaming over the harbor and thirty thousand crushed under the ruins. Voltaire used the real 1755 catastrophe to demolish the comfortable philosophy that this is 'the best of all possible worlds,' making the shaking earth a scandal against human optimism. The passage fuses the two threats now hanging over Chiapas: the collapsing walls and roofs, and the sea heaving up in the harbor. It is literature's sharpest image of nature's indifferent power over human works and human reasoning alike.",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, 'Candide; or, The Optimist,' Chapter V (first published 1759), Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm",
        "image": {
          "src": "/covers/mexico-chiapas-earthquake--a2.png",
          "alt": "Allegorical painting of the 1755 Lisbon earthquake, the catastrophe Voltaire dramatized in Candide.",
          "credit": "João Glama Ströberle, 'Alegoria ao Terramoto de 1755' (c. 1756–1792), Museu Nacional de Arte Antiga, Lisbon. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Writing to the historian Tacitus, Pliny the Younger recalled standing at Misenum in AD 79 as Vesuvius erupted, the ground convulsing so violently that buildings tottered and the sea was sucked backward off its own shore. His letter is Western literature's first great eyewitness account of the terror of the shaking earth and of the ocean withdrawing before it surges back, the very sequence behind today's tsunami warnings. The stranded sea creatures on the widened shore he describes are the ancient signature of the tsunami hazard now feared along the Chiapas coast. Nearly two millennia on, his words still capture the human awe before nature's sudden power.",
        "excerpt": "The buildings all round us were beginning to totter, and, though we were in the open, the courtyard was so narrow that we were greatly afraid, and indeed sure of being overwhelmed by their fall. ... Moreover, we saw the sea drawn back upon itself, and, as it were, repelled by the quaking of the earth. The shore certainly was greatly widened, and many marine creatures were stranded on the dry sands.",
        "source": "Pliny the Younger, 'Letters,' Book 6, Letter 20 (to Cornelius Tacitus), J. B. Firth translation.",
        "href": "https://www.attalus.org/old/pliny6.html",
        "image": {
          "src": "/covers/mexico-chiapas-earthquake--a3.png",
          "alt": "Engraving of a city struck by earthquake and tsunami, echoing Pliny's account of the earth shaking and the sea drawn back.",
          "credit": "Anonymous copper engraving, 1755, depicting earthquake and tsunami; original in Museu da Cidade, Lisbon. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Hokusai's 'Under the Wave off Kanagawa,' the famous Great Wave of around 1830–32, freezes the instant a towering sea claws over fragile boats while Mount Fuji sits small and still on the horizon. More than any image, it distills the sea's threat after the ground heaves, the very fear that drove residents of Guatemala and El Salvador to evacuate the shore. The wave's grasping fingers of foam make nature's power over human works vivid and immediate. Held in the Metropolitan Museum of Art, it is the world's most recognized emblem of the ocean rising against those who live at its edge.",
        "excerpt": "This color woodblock print, from Hokusai's series 'Thirty-six Views of Mount Fuji,' shows an enormous cresting wave with clawlike crests of foam about to crash down on slender fishing boats, while a diminished Mount Fuji appears in the distance. The composition sets human vulnerability against the immense, indifferent force of the sea. It has become the defining visual symbol of the ocean's threat to coastal life.",
        "source": "Katsushika Hokusai, 'Under the Wave off Kanagawa (Kanagawa oki nami ura),' also known as The Great Wave, from 'Thirty-six Views of Mount Fuji,' c. 1830–32. The Metropolitan Museum of Art, New York, accession no. JP1847.",
        "href": "https://www.metmuseum.org/art/collection/search/45434",
        "image": {
          "src": "/covers/mexico-chiapas-earthquake--a4.png",
          "alt": "Hokusai's Great Wave, a giant cresting ocean wave with foam claws towering over small boats, Mount Fuji in the distance.",
          "credit": "Katsushika Hokusai, 'Under the Wave off Kanagawa' (c. 1830–32), The Metropolitan Museum of Art (JP1847). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "This anonymous copper engraving, made in the very year of 1755, shows Lisbon in ruins and flames as tsunami waves rush over the harbor, sinking ships and scattering panicked figures in the foreground. Created to circulate news of the catastrophe across Europe, it captures the double blow the Chiapas warning now anticipates: the city thrown down and the sea surging over the wharfs. The disturbed, ship-swallowing water at its center is the visual ancestor of every modern tsunami alert. Preserved in the Museu da Cidade in Lisbon, it stands as an early attempt to picture the earth's terror and the ocean's threat in a single frame.",
        "excerpt": "This 1755 copper engraving depicts Lisbon during the earthquake of 1 November 1755, showing the city in ruins and in flames while tsunami waves rush upon the shore and destroy the wharfs. The harbor is filled with highly disturbed water that sank many ships, and passengers in the left foreground show signs of panic. It is one of the earliest printed images to depict an earthquake and its accompanying sea surge together.",
        "source": "Anonymous, copper engraving of the 1755 Lisbon earthquake and tsunami, 1755. Original in Museu da Cidade (Museum of Lisbon), Lisbon.",
        "href": "https://commons.wikimedia.org/wiki/File:1755_Lisbon_earthquake.jpg",
        "image": {
          "src": "/covers/mexico-chiapas-earthquake--a5.png",
          "alt": "1755 copper engraving of Lisbon in ruins and flames with tsunami waves overwhelming ships in the harbor and panicked figures fleeing.",
          "credit": "Anonymous copper engraving, 1755; original in Museu da Cidade, Lisbon. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "spacex-starship-abort",
    "headline": "SpaceX aborts a Starship launch at the last second after engine trouble, wiping about $100 billion off its value",
    "overview": "SpaceX aborted its first Starship test flight since going public when four of the booster's 33 engines failed to ignite on Thursday, triggering an automatic hold on the launch pad. Elon Musk said two Raptor engines would be swapped out and a new attempt is planned for early next week. The setback sent the newly public company's shares down about 6%, erasing roughly $100 billion in value.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxNajJ3ejNxMzdaYVBnMEdzbGR2SHdoZEhYQVJrVXhweUppX1NTRUk3RmlpMW9lcHZMTTdMcjM2b1FiREdqVWwxa2wyY2ltRFFxTlp1NEtSMnRnbEdXLU1ZMkxZNmVHamtveVJGOU5YRWE5ZDBOMzFNZ1NTZnZaRVlkdWRfRzNzcV8xVHR6Q004M19HMUxDR2Jv?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxNWGtOV1BXNFVRbFBRd1l5MFR0WTlDVWxDQ1piUUhNNVVGVWVzY0FrNUNlQVFRaWZmXzViZHNLb0pKZFhuMVllNXM1aHR0aWtTY1A4YjBmbzRfaHRVTG5RUWpXTEpVUmw5YW9waXpIYVZlRUh1ellsN2VHbHRUYTc3R2lEbFl4Z0l2THFJazd1c3p3UXNxVG1GNXc3aVRfMzIxUUtueTAwUDVyb29nVVdVc3d1YmdBOUthRnFtTXBmcTBuVFZrZzZJdTJ3Zi1SVmc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/spacex-starship-abort.png",
      "alt": "SpaceX's Starship rocket stands on its launch pad.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On August 9, 1896, the German aviation pioneer Otto Lilienthal—the first man to make repeated, controlled glider flights—stalled in a gust over the Rhinow Hills, plunged from about fifty feet, and broke his neck, dying the next day. He had spent years methodically reaching toward powered flight, only to be checked at the very edge of the achievement. Like SpaceX's Starship, halted on the pad when four of thirty-three engines failed to ignite, Lilienthal embodies the fragile machine straining against human ambition, where a single flaw at the threshold undoes the ascent. His often-repeated maxim—that progress demands its casualties—reads as an epitaph for every craft that fails just short of the sky.",
        "excerpt": "Opfer müssen gebracht werden! (Sacrifices must be made!)",
        "source": "Otto Lilienthal, reported last words, 1896; see \"The Last Words of Otto Lilienthal,\" Smithsonian Magazine (Air & Space)",
        "href": "https://www.smithsonianmag.com/air-space-magazine/last-words-otto-lilienthal-180960084/",
        "image": {
          "src": "/covers/spacex-starship-abort--a0.png",
          "alt": "Otto Lilienthal in flight on one of his gliders, launching from the Fliegeberg, 29 June 1895",
          "credit": "Photograph attributed to Richard Neuhauss, 1895; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On December 12, 1965, the Gemini VI-A crew—Wally Schirra and Tom Stafford—sat atop a fully fueled Titan II when its engines ignited and then, after roughly 1.5 seconds, abruptly shut down, triggering an automatic hold. The mission clock had started, yet Schirra, feeling no motion, correctly judged the rocket had not left the pad and chose not to fire the ejection seats, saving the flight. The cause was traced to an electrical umbilical plug and a dust cap left on an engine component—tiny faults arresting a giant machine at the instant of departure. It is the near-exact ancestor of the Starship abort: engines that lit and quit, a launch checked at the last second, and a swift turnaround for a second attempt days later.",
        "excerpt": "The Gemini VI-A launch vehicle's engines ignited on December 12, 1965, but shut down after about 1.5 seconds, triggering a pad abort. Commander Wally Schirra, feeling no liftoff, declined to eject the crew, and the mission flew successfully three days later. The shutdown was traced to a released umbilical plug and a dust cap inadvertently left on an engine component.",
        "source": "NASA, \"Gemini VI\" mission history; and National Air and Space Museum, \"Failure to Launch: The Heart-Stopping Pad Shutdown of Gemini VI-A\"",
        "href": "https://www.nasa.gov/mission/gemini-vi/",
        "image": {
          "src": "/covers/spacex-starship-abort--a1.png",
          "alt": "Astronauts Wally Schirra and Tom Stafford sitting through the Gemini 6 pad abort, 12 December 1965",
          "credit": "NASA, 1965; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Book VIII of Ovid's Metamorphoses, Daedalus fashions wings of feathers and wax and warns his son Icarus to hold the middle course—neither too low, where the sea will drag him, nor too high, where the sun will burn him. Exhilarated by flight, Icarus soars too near the sun; the wax melts, the feathers scatter, and he beats bare arms against the empty air before the sea swallows his cry. The myth is the ur-story of ambition punished at the height of its reach, the fragile contrivance failing precisely when it carries a man toward the heavens. Starship's aborted ascent—engineering that lifts humanity's aspirations only to be checked by its own delicate parts—is Icarus caught, this time, before the fall.",
        "excerpt": "but as he neared the scorching sun, its heat softened the fragrant wax that held his plumes; and heat increasing melted the soft wax—he waved his naked arms instead of wings, with no more feathers to sustain his flight. And as he called upon his father's name his voice was smothered in the dark blue sea.",
        "source": "Ovid, Metamorphoses, Book VIII, translated by Brookes More (1922), via the Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=8:card=183",
        "image": {
          "src": "/covers/spacex-starship-abort--a2.png",
          "alt": "Detail of Icarus's legs disappearing into the sea in Bruegel's Landscape with the Fall of Icarus",
          "credit": "After Pieter Bruegel the Elder, Landscape with the Fall of Icarus; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "John Milton's Paradise Lost opens with the aftermath of the most catastrophic ascent-turned-fall in the Western imagination: Satan, who dared to storm heaven itself, hurled flaming from the sky into the abyss. His rebellion is the archetype of hubris—overreaching against a power that checks him at the summit of his defiance and casts him down in ruin and combustion. The imagery of fire, wreckage, and a proud engine of ambition dashed earthward mirrors the language markets reached for as Starship's thwarted launch wiped roughly $100 billion from SpaceX's value. Milton reminds us that the loftiest reach toward the heavens is also the one most exposed to a sudden, humbling arrest.",
        "excerpt": "Him the Almighty Power\nHurled headlong flaming from th' ethereal sky,\nWith hideous ruin and combustion, down\nTo bottomless perdition, there to dwell\nIn adamantine chains and penal fire,\nWho durst defy th' Omnipotent to arms.",
        "source": "John Milton, Paradise Lost, Book I, lines 44–49 (1667), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm",
        "image": {
          "src": "/covers/spacex-starship-abort--a3.png",
          "alt": "Rubens' The Fall of Phaeton, showing a chariot and figures plunging through churning clouds",
          "credit": "Peter Paul Rubens, The Fall of Phaeton, c. 1604–08, National Gallery of Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's Landscape with the Fall of Icarus, held by the Royal Museums of Fine Arts of Belgium in Brussels, renders catastrophe as a footnote: a ploughman works his field, ships sail on, and only a pair of pale legs vanishing into the sea marks where a boy has fallen from the sky. The painting's genius is its indifference—the great ascent ends, and the world barely pauses. It offers a wry counterpoint to the spectacle of Starship's abort: the machine that reaches for the heavens can be checked in an instant, while commerce and daily life scarcely break stride. Bruegel captures both the grandeur of the attempt and the smallness of the fall within the vast ordinary world.",
        "excerpt": "Oil on panel, c. 1555–1560s, Royal Museums of Fine Arts of Belgium, Brussels. In a sweeping coastal landscape a farmer ploughs and ships sail onward while, almost unnoticed in the lower right, Icarus's thrashing legs disappear beneath the water—the only trace of his fall from the sky.",
        "source": "Pieter Bruegel the Elder (copy after), Landscape with the Fall of Icarus, Royal Museums of Fine Arts of Belgium, Brussels",
        "href": "https://en.wikipedia.org/wiki/Landscape_with_the_Fall_of_Icarus",
        "image": {
          "src": "/covers/spacex-starship-abort--a4.png",
          "alt": "Landscape with the Fall of Icarus: a ploughman and ships in a bay while Icarus's legs sink into the sea",
          "credit": "After Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1555–1560s, Royal Museums of Fine Arts of Belgium; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens's The Fall of Phaeton, in the National Gallery of Art in Washington, freezes the instant of disaster as Phaeton—who begged to drive the sun-god's chariot and could not master it—is thrown from the sky amid rearing horses, tumbling figures, and roiling storm clouds. Zeus's thunderbolt has checked the reckless ascent, and the whole composition churns with the violence of a fall from the heights. It is hubris made visible: the machine of the sun seized by ambition beyond its bearer's control, then struck down. Rubens's tumult mirrors the shock of Starship's arrested launch, where a bold reach toward orbit was halted and the fall was measured in engines and billions.",
        "excerpt": "Oil on canvas, c. 1604–1608, National Gallery of Art, Washington. Rubens depicts the moment Zeus's thunderbolt strikes: Phaeton is flung backward from the sun-god's chariot as panicked horses scatter, allegorical figures tumble through the clouds, and the sky convulses around the ruined flight.",
        "source": "Peter Paul Rubens, The Fall of Phaeton, c. 1604–1608, National Gallery of Art, Washington, D.C.",
        "href": "https://en.wikipedia.org/wiki/The_Fall_of_Phaeton_(Rubens)",
        "image": {
          "src": "/covers/spacex-starship-abort--a5.png",
          "alt": "The Fall of Phaeton: figures and horses plunging through stormy clouds as Phaeton is cast from the sun chariot",
          "credit": "Peter Paul Rubens, The Fall of Phaeton, c. 1604–1608, National Gallery of Art; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "brenda-fricker-dies",
    "headline": "Brenda Fricker, the first Irish woman to win an Oscar, dies at 81",
    "overview": "Brenda Fricker, who in 1990 became the first Irish woman to win an Academy Award, has died at 81, her agent said. She won best supporting actress for playing Christy Brown's mother opposite Daniel Day-Lewis in the 1989 film 'My Left Foot,' and later became widely loved as the pigeon lady in 'Home Alone 2.' She died peacefully in Dublin after a period of ill health.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQWVFEeTc0Tk1sTEVXeTRsU3NTQklfTFc2WXBWOHBuaUQxZ2lmbjRxNWVEX0dLRXZyTmZuUUMzeXBTYWw1ZlBOVlZ6d3NoMzVtSFZqR0RCMG8ya2JhRnAxWER1UDZUaHhxOV82R01MSWp4RFNIVE10Smg4MEtzNXpRanNBUDdjbFVPUUozdHR5N01nNVlKT1E?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPd2lONWZmSjE1OVlwUkxKcGM0X0R3NkZ5ZVJRNUFmTXBMdXI5UmdlS2Z4NnVCRGRVeUFVRnI1VDlsTnVwemtRblFvU1NtM0tKM2RRT0RQb0QtRzZnRjZhenZpdEJqM3ZtUl9ZdXVwMGR2eWFFRWhrcnU3NzVmbzZlNGZDUmxXMjJ4WGRpdFFMRklkNG84dks0aG13QUhuYVplY2Jz?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/brenda-fricker-dies.png",
      "alt": "A theatrical spotlight over an empty stage, marking the death of actress Brenda Fricker.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When David Garrick, the eighteenth century's supreme actor, was carried to Westminster Abbey in 1779, Samuel Johnson mourned that his friend's death had 'eclipsed the gaiety of nations.' The line has ever since stood for the peculiar grief of losing a performer, a person whose whole art was to live vividly in front of us and then be gone. Brenda Fricker's death at 81 gathers the same feeling: the player who gave us Christy Brown's fierce mother and the tender pigeon lady has left the stage, and the roles remain while the woman who breathed them does not. Garrick and Fricker alike remind us that an actor's immortality is only the shadow the footlights leave behind.",
        "excerpt": "...gratified with this character of our common friend; but what are the hopes of man! I am disappointed by that stroke of death, which has eclipsed the gaiety of nations, and impoverished the publick stock of harmless pleasure.",
        "source": "Samuel Johnson, \"Life of Edmund Smith,\" in Lives of the English Poets (1779–81); Project Gutenberg, Lives of the Poets, Volume 1 (eBook #9823).",
        "href": "https://www.gutenberg.org/cache/epub/9823/pg9823.txt",
        "image": {
          "src": "/covers/brenda-fricker-dies--a0.png",
          "alt": "Sir Joshua Reynolds's painting of the actor David Garrick pulled between the female figures of Tragedy and Comedy.",
          "credit": "Sir Joshua Reynolds, 'David Garrick Between Tragedy and Comedy' (1760–61). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "For seven centuries the medieval hymn 'Stabat Mater' has fixed an image at the center of Christian art: the mother standing beneath her suffering child, refusing to look away. That figure of the mater dolorosa, the devoted and enduring mother, is precisely what Brenda Fricker embodied as Bridget Brown, cradling and fighting for her disabled son in 'My Left Foot,' the role that made her the first Irish woman to win an Oscar. The hymn's Mary and Fricker's Bridget belong to the same long lineage of maternal steadfastness that art keeps returning to. In mourning Fricker, first honored for a mother's devotion, we mourn too that ancient vision of the mother who stays.",
        "excerpt": "Stabat mater dolorosa / iuxta Crucem lacrimosa, / dum pendebat Filius. // At the Cross her station keeping, / stood the mournful Mother weeping, / close to Jesus to the last.",
        "source": "\"Stabat Mater,\" attributed to Jacopone da Todi (13th c.), trans. Edward Caswall, Lyra Catholica (1849); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Stabat_Mater_(Caswall,_unsourced)",
        "image": {
          "src": "/covers/brenda-fricker-dies--a1.png",
          "alt": "Titian's painting of the grieving Virgin Mary, hands open and eyes lifted, in mourning.",
          "credit": "Titian, 'Mater Dolorosa with her Hands apart' (c. 1554), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare gave the theatre its most unsparing image of mortality when Macbeth calls life 'but a walking shadow, a poor player / That struts and frets his hour upon the stage, / And then is heard no more.' The metaphor makes every human life a performance that must end, and it falls with special weight on an actor's death. Brenda Fricker spent her hour upon the stage and screen brilliantly, from Dublin's Abbey Theatre to Hollywood, and now is heard no more. Her passing lends Macbeth's bleak lines an unexpected tenderness: the player is gone, but for a while the strutting and fretting was luminous.",
        "excerpt": "Life's but a walking shadow; a poor player, / That struts and frets his hour upon the stage, / And then is heard no more: it is a tale / Told by an idiot, full of sound and fury, / Signifying nothing.",
        "source": "William Shakespeare, Macbeth, Act V, Scene 5; Project Gutenberg (eBook #1533).",
        "href": "https://www.gutenberg.org/files/1533/1533-0.txt",
        "image": {
          "src": "/covers/brenda-fricker-dies--a2.png",
          "alt": "The Chandos portrait, a painted likeness of William Shakespeare with a small gold earring.",
          "credit": "Attributed to John Taylor, the 'Chandos portrait' of William Shakespeare (c. 1600–1610), National Portrait Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In J.M. Synge's Irish tragedy 'Riders to the Sea,' the old mother Maurya, having lost every son to the water, arrives at a hard peace: 'No man at all can be living for ever, and we must be satisfied.' Synge drew from the Aran Islands a portrait of maternal endurance that is unmistakably Irish and unmistakably universal, the same fusion Fricker achieved on screen. As the first Irish woman to win an Oscar, for playing a mother's devotion, Fricker carried that national tradition of the strong, grieving matriarch into world cinema. Her own quiet death in Dublin after a period of ill health reads like Maurya's acceptance: the sea has done its work, and we must be satisfied.",
        "excerpt": "Michael has a clean burial in the far north, by the grace of the Almighty God. Bartley will have a fine coffin out of the white boards, and a deep grave surely. What more can we want than that? No man at all can be living for ever, and we must be satisfied.",
        "source": "J.M. Synge, Riders to the Sea (1904); Project Gutenberg (eBook #994).",
        "href": "https://www.gutenberg.org/cache/epub/994/pg994.txt",
        "image": {
          "src": "/covers/brenda-fricker-dies--a3.png",
          "alt": "Painted portrait of the Irish playwright John Millington Synge.",
          "credit": "John Butler Yeats, portrait of John Millington Synge (c. 1905). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Joshua Reynolds enthroned the actress Sarah Siddons as 'The Tragic Muse' in 1784, elevating a working performer to the dignity of myth and proving that a great actress could be immortalized on a museum wall. Brenda Fricker never sought that grandeur, but her Oscar-winning turn as Christy Brown's mother, and her beloved pigeon lady, gave her a comparable claim to be remembered. Reynolds's canvas insists that the fleeting art of the stage deserves to outlast the performer, which is exactly the consolation we reach for when an actor dies. Set beside Siddons's painted majesty, Fricker's passing invites us to frame her, too, among the muses.",
        "excerpt": "Reynolds seats Siddons on a throne among the shadowy allegorical figures of Pity and Terror, her gaze lifted and hand raised in tragic inspiration. The grandeur deliberately borrows from Michelangelo's prophets, casting a living actress as an eternal muse. The painting hangs in the Huntington Art Gallery in San Marino, California.",
        "source": "Sir Joshua Reynolds, \"Sarah Siddons as the Tragic Muse\" (1784), The Huntington, San Marino, California.",
        "href": "https://commons.wikimedia.org/wiki/File:Reynolds,_Sir_Joshua_-_Mrs_Siddons_as_the_Tragic_Muse_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/brenda-fricker-dies--a4.png",
          "alt": "Sarah Siddons seated as a majestic muse, gazing upward, flanked by shadowy allegorical figures.",
          "credit": "Sir Joshua Reynolds, 'Sarah Siddons as the Tragic Muse' (1784), The Huntington. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "James McNeill Whistler's 'Arrangement in Grey and Black No. 1' (1871), universally known as 'Whistler's Mother,' turned a seated elderly woman into the world's most famous emblem of maternal stillness and devotion. It is fitting company for Brenda Fricker, who twice became the mother the world remembered: the ferocious Bridget Brown and the gentle pigeon lady who mothers a lost boy in 'Home Alone 2.' Whistler's austere portrait, hanging in the Musée d'Orsay, honors the quiet, patient dignity that Fricker made her signature. In her death we lose a real embodiment of what the painting distills, the mother who simply, steadfastly, remains.",
        "excerpt": "A grey-haired woman in a black dress sits in strict profile against a muted grey wall, hands folded in her lap, utterly composed. Whistler subordinated sentiment to a severe harmony of tones, yet the image became an enduring icon of motherhood. It is held by the Musée d'Orsay in Paris.",
        "source": "James McNeill Whistler, \"Arrangement in Grey and Black No. 1 (Portrait of the Artist's Mother)\" (1871), Musée d'Orsay, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Whistlers_Mother_high_res.jpg",
        "image": {
          "src": "/covers/brenda-fricker-dies--a5.png",
          "alt": "An elderly woman in a black dress seated in profile against a grey wall, hands resting in her lap.",
          "credit": "James McNeill Whistler, 'Arrangement in Grey and Black No. 1' (1871), Musée d'Orsay. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "gordon-parks-voices-in-the-mirror",
    "headline": "A major survey of photographer Gordon Parks, 'Voices in the Mirror,' celebrates his work and 20 years of his foundation",
    "overview": "A large-scale exhibition, 'Voices in the Mirror,' gathers the most iconic photographs of Gordon Parks (1912-2006), the pioneering Black American photographer, filmmaker and writer, in a survey marking his career and the 20th anniversary of The Gordon Parks Foundation. Parks chronicled American life, poverty and the civil-rights struggle for Life magazine and later directed the film 'Shaft.' The show brings together his portraits and social-documentary images across decades.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/gordon-parks-photography-voices-in-the-mirror-exhibition/"
      },
      {
        "name": "The Gordon Parks Foundation",
        "href": "https://www.gordonparksfoundation.org"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/gordon-parks-voices-in-the-mirror.png",
      "alt": "A gelatin silver photograph by Gordon Parks from the exhibition 'Voices in the Mirror.'",
      "credit": "Courtesy The Gordon Parks Foundation, via Colossal"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Two decades before Gordon Parks picked up what he called his 'weapon of choice,' the Danish-American reporter Jacob Riis was already forcing comfortable New Yorkers to look at the immigrant poor crammed into Lower East Side tenements. His 1890 book 'How the Other Half Lives' paired blunt prose with flash-lit photographs of families sleeping twelve to a room, and it shamed the city into housing reform. Like Parks, Riis understood the camera as evidence that misery could no longer be denied. The through-line from Riis's slum interiors to Parks's images of Harlem and rural Southern poverty is the same conviction: that documenting the downtrodden is the first step toward making them impossible to ignore.",
        "excerpt": "Long ago it was said that 'one half of the world does not know how the other half lives.' That was true then. It did not know because it did not care. The half that was on top cared little for the struggles, and less for the fate of those who were underneath, so long as it was able to hold them there and keep its own seat.",
        "source": "Jacob A. Riis, How the Other Half Lives: Studies Among the Tenements of New York (New York: Charles Scribner's Sons, 1890), Introduction.",
        "href": "https://en.wikisource.org/wiki/How_the_Other_Half_Lives/Introduction",
        "image": {
          "src": "/covers/gordon-parks-voices-in-the-mirror--a0.png",
          "alt": "Impoverished lodgers crowded into a cramped New York tenement room, photographed by Jacob Riis in 1889.",
          "credit": "Jacob Riis, 'Lodgers in a Crowded Bayard Street Tenement — Five Cents a Spot,' 1889. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In the century after Riis, the U.S. Farm Security Administration sent photographers like Dorothea Lange across Depression-era America to document rural destitution, and her 1936 portrait of Florence Owens Thompson, 'Migrant Mother,' became the defining image of that suffering. Working within the same federal documentary tradition, Gordon Parks joined the FSA in 1942 and was mentored by its director Roy Stryker, who taught him to aim his lens at inequality. Lange's photograph, held today at the Library of Congress, gave a weathered, dignified face to millions of the anonymous poor. 'Voices in the Mirror' shows Parks carrying that FSA mission forward into the civil-rights era, insisting that the destitute be seen as fully human.",
        "excerpt": "Dorothea Lange's photograph shows a gaunt, worn migrant mother of seven, her children turned away against her shoulders, gazing past the camera with an expression of exhausted resolve. Made in a Nipomo, California pea-pickers' camp for the Farm Security Administration in March 1936, it distilled the Great Depression's rural poverty into a single unforgettable face. The Library of Congress records the original caption as: destitute pea pickers in California, a mother of seven children, age thirty-two.",
        "source": "Dorothea Lange, 'Migrant Mother,' Nipomo, California, 1936. U.S. Farm Security Administration / Library of Congress Prints and Photographs Division, LC-USF34-009058-C.",
        "href": "https://guides.loc.gov/migrant-mother",
        "image": {
          "src": "/covers/gordon-parks-voices-in-the-mirror--a1.png",
          "alt": "Dorothea Lange's 1936 'Migrant Mother': a careworn woman with two children clinging to her shoulders in a California migrant camp.",
          "credit": "Dorothea Lange, 'Migrant Mother,' 1936. Farm Security Administration, Library of Congress. Public domain."
        }
      },
      {
        "category": "literary",
        "title": "Charles Dickens turned the English novel into an instrument of social exposure, and 'Oliver Twist' (1837–39) dragged readers into the workhouse to witness children starved by a system indifferent to their hunger. The scene in which the orphan Oliver dares to ask for a second helping of gruel remains literature's most famous indictment of institutional cruelty toward the poor. Gordon Parks, himself a novelist and memoirist as well as a photographer, worked in exactly this spirit, using the pen and the camera together to make the neglected visible. Both men insisted that art must side with the hungry child rather than the master who denies him.",
        "excerpt": "'Please, sir, I want some more.' The master was a fat, healthy man; but he turned very pale. He gazed in stupefied astonishment on the small rebel for some seconds, and then clung for support to the copper. The assistants were paralysed with wonder; the boys with fear.",
        "source": "Charles Dickens, Oliver Twist; or, The Parish Boy's Progress (1838), Chapter II.",
        "href": "https://www.gutenberg.org/files/730/730-h/730-h.htm",
        "image": {
          "src": "/covers/gordon-parks-voices-in-the-mirror--a2.png",
          "alt": "George Cruikshank's illustration of a small boy holding an empty bowl before the astonished workhouse master, from Oliver Twist.",
          "credit": "George Cruikshank, 'Oliver asking for more,' illustration for Oliver Twist, c. 1837. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Frederick Douglass, born into slavery, wielded the written word as Gordon Parks would later wield the camera: as testimony that the powerful could not refute. In his 1845 'Narrative,' Douglass corrects the comfortable misreading of enslaved people's songs, revealing them not as signs of contentment but as the sound of anguish. That act of bearing accurate witness to Black suffering, and of restoring dignity and inner life to those society had rendered invisible, is precisely the tradition Parks extended a century later across his photographs of segregation and poverty. 'Voices in the Mirror' places Parks in this lineage of Black American witnesses who documented injustice so it could not be denied.",
        "excerpt": "I have often been utterly astonished, since I came to the north, to find persons who could speak of the singing, among slaves, as evidence of their contentment and happiness. It is impossible to conceive of a greater mistake. Slaves sing most when they are most unhappy. The songs of the slave represent the sorrows of his heart; and he is relieved by them, only as an aching heart is relieved by its tears.",
        "source": "Frederick Douglass, Narrative of the Life of Frederick Douglass, an American Slave (Boston: Anti-Slavery Office, 1845), Chapter II.",
        "href": "https://www.gutenberg.org/cache/epub/23/pg23.txt",
        "image": {
          "src": "/covers/gordon-parks-voices-in-the-mirror--a3.png",
          "alt": "Portrait photograph of Frederick Douglass, circa 1879, the formerly enslaved abolitionist writer and orator.",
          "credit": "George Kendall Warren, portrait of Frederick Douglass, c. 1879. National Archives (NARA 558770). Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Francisco Goya's 'The Third of May 1808,' painted in 1814 and now a centerpiece of the Museo del Prado, is one of art history's first great images to take the side of the anonymous victim rather than the conquering hero. Its central figure, a white-shirted man flinging his arms wide before a faceless firing squad, turns state violence into an unforgettable accusation. Goya's decision to render the powerless with such raw dignity anticipates Gordon Parks's photographs of those crushed by segregation and poverty. Like Goya, Parks aimed his art squarely at injustice, trusting that an image of suffering witnessed can indict the system that caused it.",
        "excerpt": "Goya's canvas shows a Spanish civilian, arms thrown open in the posture of a crucifixion, illuminated by a lantern as a rank of Napoleonic soldiers levels their muskets at him and his terrified companions. At his feet lie the already executed, bloodied on the ground, while more victims wait their turn in the darkness. The painting refuses any heroic gloss, confronting the viewer directly with the human cost of oppression.",
        "source": "Francisco de Goya, 'The 3rd of May 1808 in Madrid' (El Tres de Mayo de 1808), 1814, oil on canvas, Museo del Prado, Madrid (P000749).",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/gordon-parks-voices-in-the-mirror--a4.png",
          "alt": "Goya's painting of a white-shirted man with arms outstretched facing a firing squad by lantern light, the dead at his feet.",
          "credit": "Francisco de Goya, 'The Third of May 1808,' 1814. Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jean-François Millet's 'The Gleaners' (1857), one of the treasures of the Musée d'Orsay, scandalized bourgeois Paris by devoting a monumental canvas to three peasant women stooping to gather the leftover grain the harvest had abandoned. Rather than idealize or pity them, Millet granted the rural poor the solemn dignity earlier painters reserved for saints and nobles. That impulse, to make labor and want beautiful and worthy of sustained attention, is the same one that animates Gordon Parks's tender portraits of the poor. 'Voices in the Mirror' shows Parks, like Millet, insisting that those on society's lowest rung deserve to be seen with reverence rather than contempt.",
        "excerpt": "Millet's painting shows three peasant women bent low across a vast, golden field, their hands sweeping the stubble for stray heads of wheat left after the harvest. Behind them, sunlit stacks and a distant overseer on horseback mark the abundance from which they are excluded. The quiet monumentality of their labor lends the rural poor a gravity and dignity that the Salon of 1857 found unsettling.",
        "source": "Jean-François Millet, 'The Gleaners' (Des glaneuses), 1857, oil on canvas, Musée d'Orsay, Paris (RF 592).",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg",
        "image": {
          "src": "/covers/gordon-parks-voices-in-the-mirror--a5.png",
          "alt": "Millet's painting of three peasant women bending to glean stray wheat in a wide harvested field under a golden sky.",
          "credit": "Jean-François Millet, 'The Gleaners,' 1857. Musée d'Orsay. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "yemen-tanker-hijacked-somali-pirates",
    "headline": "Suspected Somali pirates hijack the chemical tanker Asana in the Gulf of Aden, the second such seizure this month",
    "overview": "Armed men boarded and seized the Tanzanian-flagged oil and chemical tanker Asana in the Gulf of Aden off southern Yemen on Friday, British maritime authorities said, in what appeared to be an act of Somali piracy rather than a Houthi attack. The vessel, bound for Bosaso in Somalia, sent a distress signal, and a South Korean navy ship responded. It was the second suspected pirate hijacking off Yemen this month.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c7vg6dml34vo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxQeVFJX2dfYlJkR3pBRlZVa2Z2cUN5eWJYd251LWZCTml6QVZhU0ZGT2RnNVQ3RVkwVkpaS1dYa2ZZXzF3eG9XQURfWXpuZ0FuRTBxMVZfU1NZZk5MUlpFRDlnakpSb1BRRUc0U1ZhMktSdTNROE1NVEowMGhDTnVQRU1fOHlVMTYtblJHRFZxdXhtUjF1clZTRm9qRVItRWowVTJzOHZrY3lKeEJ4ZmlYQUQydUd0aVF0NVRZRFVBQU1WZGtROE95bzF2dFI?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/yemen-tanker-hijacked-somali-pirates.png",
      "alt": "Sunset over the Gulf of Aden.",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the tanker Asana was boarded off Yemen, its captors joined one of the oldest categories in Western law: the pirate as enemy of everyone. Writing in 44 BC, as Rome's own sea-lanes were plagued by raiders, Cicero fixed the idea that a pirate stands outside the ordinary rules that bind even wartime enemies, owed neither faith nor sworn oath. This is the ancient root of hostis humani generis, the common enemy of all mankind, and it is exactly the status modern navies invoke when a South Korean warship races toward a hijacked ship in the Gulf of Aden. Two thousand years later, the sea-robber is still legally a creature apart.",
        "excerpt": "Nam pirata non est ex perduellium numero definitus, sed communis hostis omnium; cum hoc nec fides debet nec ius iurandum esse commune.",
        "source": "Cicero, De Officiis (On Duties), Book III, section 107 (44 BC)",
        "href": "https://www.thelatinlibrary.com/cicero/off3.shtml",
        "image": {
          "src": "/covers/yemen-tanker-hijacked-somali-pirates--a0.png",
          "alt": "Marble bust of the Roman orator and statesman Cicero, Capitoline Museums, Rome",
          "credit": "Bust of Cicero, Musei Capitolini, Rome; photo by Glauco92, Wikimedia Commons (CC BY-SA 3.0)"
        }
      },
      {
        "category": "historical",
        "title": "The seizure of the Asana echoes the early eighteenth-century Golden Age of piracy, when sea-robbers grew so bold that they choked whole trade routes. Captain Charles Johnson's 1724 chronicle records that the pirates of the West Indies became so numerous and formidable that they interrupted the commerce of Europe itself, much as today's hijackings off Yemen threaten one of the world's busiest shipping arteries. Then as now, lightly armed raiders in small craft could paralyze the movement of goods across an entire sea. The 1718 fall of Blackbeard showed how navies answered the threat, just as warships answer distress calls in the Gulf of Aden today.",
        "excerpt": "the Pyrates in the West-Indies have been so formidable and numerous, that they have interrupted the Trade of Europe into those Parts",
        "source": "Captain Charles Johnson, A General History of the Pyrates, Introduction (London, 1724)",
        "href": "https://www.gutenberg.org/cache/epub/40580/pg40580-images.html",
        "image": {
          "src": "/covers/yemen-tanker-hijacked-somali-pirates--a1.png",
          "alt": "Painting of the 1718 battle in which Blackbeard the pirate is killed by Lieutenant Maynard's men",
          "credit": "Jean Leon Gerome Ferris, 'The Capture of the Pirate, Blackbeard, 1718' (1920), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The distinction that matters in the Asana case, whether armed boarders are honest seafarers or predators, is as old as Homer. In the Odyssey, the aged king Nestor greets unknown arrivals by bluntly asking whether they come to trade or roam the sea as pirates who risk their own lives to bring ruin to strangers. The question captures the exact ambiguity investigators faced off southern Yemen, weighing piracy against a Houthi attack. For the Greeks, the open water was always a place where a sail on the horizon might mean commerce or plunder, a doubt the Gulf of Aden still forces on every passing crew.",
        "excerpt": "Is it on some business, or do ye wander at random over the sea, even as pirates, who wander hazarding their lives and bringing evil to men of other lands?",
        "source": "Homer, Odyssey, Book 3, lines 71-74, trans. A. T. Murray (Loeb Classical Library, 1919)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D3%3Acard%3D71",
        "image": {
          "src": "/covers/yemen-tanker-hijacked-somali-pirates--a2.png",
          "alt": "Attic red-figure vase showing Odysseus bound to the mast of his ship amid the perils of the sea",
          "credit": "The 'Siren Vase', Attic red-figure stamnos, c. 480-470 BC, British Museum; photo by Jastrow, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Byron's 1814 blockbuster The Corsair gave the sea-raider his most seductive literary mask, opening with a pirate anthem to boundless freedom over the dark blue waves. That romance of the outlaw ranging the Mediterranean is the mythic shadow behind the grim reality off Yemen, where the men who seized the Asana claim the sea as their hunting ground. Byron's corsairs treat the open water as an ungoverned empire answerable to no flag, precisely the lawless condition that lets modern pirates board a Tanzanian-flagged tanker bound for Bosaso. The poem's glamour and the newswire's distress signal describe the same ancient temptation to plunder the trade routes.",
        "excerpt": "O'er the glad waters of the dark blue sea,\nOur thoughts as boundless, and our souls as free,\nFar as the breeze can bear, the billows foam,\nSurvey our empire, and behold our home!",
        "source": "Lord Byron, The Corsair, Canto I (1814)",
        "href": "https://en.wikisource.org/wiki/The_Corsair_(Byron,_1814)/CANTO_I",
        "image": {
          "src": "/covers/yemen-tanker-hijacked-somali-pirates--a3.png",
          "alt": "Portrait of Lord Byron in ornate Albanian dress with turban and sash",
          "credit": "Thomas Phillips, 'Lord Byron in Albanian Dress' (1813), Government Art Collection, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Howard Pyle's celebrated 1905 oil 'An Attack on a Galleon' distills the terror of the seized ship into a single image: a towering merchantman helpless before a small, lethal pirate craft as gunfire and smoke sweep its decks. That vision of a big vessel overwhelmed by a nimble raider is almost a portrait of the Asana's fate, boarded and taken by armed men in the Gulf of Aden. Pyle painted the plundered wealth of trade routes as the prize, exactly what makes a laden tanker a target today. The painting hangs in the Delaware Art Museum and remains the defining image of piracy in Western popular art.",
        "excerpt": "Oil on canvas, 1905, depicting a great galleon assaulted at close range by a small pirate vessel, its decks swept by smoke and gunfire as the crew is overwhelmed. Painted by Howard Pyle to illustrate his article 'The Fate of a Treasure Town' in Harper's Monthly Magazine, it is the most famous of his many pirate works.",
        "source": "Howard Pyle, 'An Attack on a Galleon' (1905), oil on canvas, Delaware Art Museum, Museum Purchase 1912",
        "href": "https://emuseum.delart.org/objects/1721/an-attack-on-a-galleon",
        "image": {
          "src": "/covers/yemen-tanker-hijacked-somali-pirates--a4.png",
          "alt": "Painting of a large galleon under attack by a small pirate craft amid smoke and gunfire on the open sea",
          "credit": "Howard Pyle, 'An Attack on a Galleon' (1905), Delaware Art Museum, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Aert Anthoniszoon's early seventeenth-century seascape 'A French Ship and Barbary Pirates' shows a heavily armed trader beset on both sides by corsair galleys, a scene of Mediterranean commerce raiding that European painters returned to again and again. The image speaks directly to the Asana's ordeal off the Somali and Yemeni coasts, where the descendants of that same threat still fall on merchant vessels crossing narrow, vital waters. For centuries the Barbary corsairs made whole sea-lanes perilous, forcing navies to escort and patrol, just as foreign warships now shepherd traffic through the Gulf of Aden. The canvas, held by the National Maritime Museum in Greenwich, is a reminder that hijacking on a trade route is a very old catastrophe.",
        "excerpt": "Oil painting, c. 1615, showing an armed French merchant ship attacked from both sides by Barbary corsair vessels on a choppy sea. The subject of North African pirates preying on Mediterranean shipping was popular in Dutch and Flemish marine painting, reflecting the constant menace to seaborne trade.",
        "source": "Aert Anthoniszoon, 'A French Ship and Barbary Pirates' (c. 1615), oil on panel, National Maritime Museum, Greenwich, London",
        "href": "https://commons.wikimedia.org/wiki/File:A_French_Ship_and_Barbary_Pirates_(c_1615)_by_Aert_Anthoniszoon.jpg",
        "image": {
          "src": "/covers/yemen-tanker-hijacked-somali-pirates--a5.png",
          "alt": "Seventeenth-century marine painting of a French merchant ship attacked on both sides by Barbary corsair vessels",
          "credit": "Aert Anthoniszoon, 'A French Ship and Barbary Pirates' (c. 1615), National Maritime Museum, Greenwich, public domain, via Wikimedia Commons"
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
