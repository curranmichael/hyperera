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
// the Morning Edition of 26 June 2026 (ranks 1-13) leads with its hero story,
// followed by the Evening and Afternoon Editions of 25 June 2026. Stories are
// selected from the live RSS feeds in `lib/feeds.ts`. The analogies are the heart
// of each story: six per event, two per category, each linking to a real
// human-written source (a primary text, museum object page, or archive). Excerpts
// quote the most relevant passage verbatim where the source is public domain, and
// otherwise describe rather than quote. Covers are dithered local copies: feed or
// rights-clean Wikimedia art/photos credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated"). Source links to AP/Reuters
// are Google News redirects (see `lib/feeds.ts`).

const stories: Story[] = [
  {
    "slug": "scotus-ends-tps-haitians-syrians",
    "headline": "US Supreme Court allows Trump administration to end deportation protections for Haitians and Syrians",
    "overview": "The U.S. Supreme Court cleared the way for the Trump administration to terminate Temporary Protected Status for hundreds of thousands of Haitian and Syrian immigrants, lifting lower-court orders that had kept the protections in place. The ruling exposes the affected migrants to potential deportation while litigation over the policy continues.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPTFZFZDU5c1hnMWFhOTcxa196M1NaZ09RU3lNOWxOQm56ekRKNkhYX19OSDhuNWxoejI0TDV1eWtuWlR5Z3JYZHRRWU9pcENHTlRrajdYSDZvNkNtMVZnc1E1TXNkbk10UUZIUWM4THBfd3pRNlBoUUVCRTZxVDlfaW45RmxrVUtLb0w3NG9IVEQwSEZLQVBubEZ6LXRnWnNUTjZF?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/politics/supreme-court-allows-trump-administration-to-end-legal-protections-for-haitians-and-syrians"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/scotus-ends-tps-haitians-syrians.png",
      "alt": "Edward Moran's 1886 painting of the unveiling of the Statue of Liberty in New York Harbor, the nation's enduring emblem of welcome to immigrants.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Edict of Expulsion of the Jews from England (Edward I, 18 July 1290)",
        "excerpt": "The Edict of Expulsion is a royal decree expelling all Jews from the Kingdom of England that was issued by Edward I on 18 July 1290; it was the first time a European state is known to have permanently banned their presence. Jews were allowed to leave England with cash and personal possessions, but the debts which they were owed, their homes, and other buildings—including synagogues and cemeteries—were forfeited to the king.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Edict_of_Expulsion"
      },
      {
        "category": "historical",
        "title": "The Alhambra Decree expelling the Jews from Spain (Isabella and Ferdinand, 31 March 1492)",
        "excerpt": "The Alhambra Decree (also known as the Edict of Expulsion of the Jews) was an edict issued on 31 March 1492 by the joint Catholic Monarchs of Spain (Isabella I of Castile and Ferdinand II of Aragon) ordering the expulsion of practising Jews from the Crowns of Castile and Aragon and its territories and possessions by 31 July of that year. The expulsion was intended to eliminate the influence of practising Jews on Spain's large formerly-Jewish converso New Christian population, to ensure the latter and their descendants did not revert to Judaism.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Alhambra_Decree"
      },
      {
        "category": "literary",
        "title": "Dante, The Divine Comedy: Paradiso, Canto XVII — Cacciaguida foretells Dante's exile (c. 1320; Longfellow translation, 1867)",
        "excerpt": "Thou shalt abandon everything beloved\n   Most tenderly, and this the arrow is\n   Which first the bow of banishment shoots forth.\n\nThou shalt have proof how savoureth of salt\n   The bread of others, and how hard a road\n   The going down and up another's stairs.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_17"
      },
      {
        "category": "literary",
        "title": "The Book of Ruth, chapters 1–2 — the stranger who seeks refuge in a foreign land (King James Version)",
        "excerpt": "And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God: Where thou diest, will I die, and there will I be buried: the LORD do so to me, and more also, if ought but death part thee and me. ... Then she fell on her face, and bowed herself to the ground, and said unto him, Why have I found grace in thine eyes, that thou shouldest take knowledge of me, seeing I am a stranger?",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ruth"
      },
      {
        "category": "artistic",
        "title": "Eduard Bendemann, The Mourning Jews in Exile (Die trauernden Juden im Exil), c. 1832",
        "excerpt": "Inspired by Psalm 137 (\"By the rivers of Babylon we sat down and wept\"), Bendemann's canvas gathers a deported people beneath a willow on the banks of the Euphrates: a chained old harper anchors a cluster of grieving young women, their instruments laid silent on the ground. The painting renders the desolation of a community torn from its homeland and made captive in a foreign land, a visual lament for those stripped of refuge and forced into exile.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Eduard_Bendemann-_Die_trauernden_Juden_im_Exil_um_1832.jpg",
        "image": {
          "src": "/covers/scotus-ends-tps-haitians-syrians--art.png",
          "alt": "The Mourning Jews in Exile (Die trauernden Juden im Exil) by Eduard Bendemann, c. 1832, depicting deported Jews mourning in Babylonian captivity beneath a willow by the river, a chained harper among grieving women.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, \"Va, pensiero\" (Chorus of the Hebrew Slaves), from the opera Nabucco (1842)",
        "excerpt": "In the third act of Verdi's Nabucco, the Hebrew exiles, captive in Babylon and torn from their homeland, sing \"Va, pensiero, sull'ali dorate\" — \"Fly, thought, on golden wings\" — a yearning lament drawn from Psalm 137 for a lost native land. The chorus became an anthem of a displaced people longing for the home from which they were expelled, voicing the grief of those who shelter, unwillingly, in a foreign land.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      }
    ],
    "lead": true,
    "rank": 1
  },
  {
    "slug": "cargo-ship-attacked-hormuz-un-pauses-evacuation",
    "headline": "Cargo ship attacked near Oman as UN agency pauses ship evacuations through the Strait of Hormuz",
    "overview": "A cargo vessel came under attack near Oman, prompting a United Nations maritime agency to pause its initiative to escort and evacuate ships through the Strait of Hormuz. U.S. officials told Reuters that Iran fired on the ship, raising fresh fears for commercial shipping through the vital oil chokepoint.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxQNEdwQnducDl3RzgxSWs1NXVmdWQzSW5QY2xWc3ZXd251dG8xcHFDQXg1TkNQd2NOV1RDN201R1NrVEtMaml6MUdibUdXWGZveWo2YVpMMElrVFcxWjhVN29DZWFGem5MWVpjNlpzVUlYSEE4M2FVV1NXSTNvSm1LOUxMSmpONDg3QzlPVUZOMGxNSU5CZ2NWbEg4Ty1Ybkp3UmloQzVFMzFtRWV5Q2NMUXFDYzJubXkySk91YU1DQ3BjNXNyd0YyMGhnQnBZUVk?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/live-updates/us-iran-war-trump-strait-of-hormuz-oil-prices/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/cargo-ship-attacked-hormuz-un-pauses-evacuation.png",
      "alt": "A satellite view of the Strait of Hormuz and the Musandam Peninsula, the narrow chokepoint at the mouth of the Persian Gulf through which much of the world's oil shipping passes.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Battle of Salamis (480 BC)",
        "excerpt": "Themistocles lured the vast Persian fleet into the narrow straits of Salamis, where Xerxes' superior numbers became a fatal liability: crammed into the confined channel, the Persian ships could not maneuver, collided with one another, and were destroyed by the smaller Greek force. The battle stands as antiquity's defining lesson that command of a narrow sea passage can overturn an entire war.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Battle_of_Salamis"
      },
      {
        "category": "historical",
        "title": "The Tanker War in the Persian Gulf and Strait of Hormuz (1981-1988)",
        "excerpt": "During the Iran-Iraq War, both belligerents waged a sustained campaign of attacks on neutral merchant vessels in the Persian Gulf and Strait of Hormuz, the most prolonged assault on commercial shipping since World War II. Iraq mounted 283 attacks and Iran 168; well over 100 sailors were killed and tens of millions of tons of cargo damaged, drawing the U.S. Navy into reflagging and escorting tankers through the chokepoint.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Tanker_war"
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey, Book XII — Scylla and Charybdis (Butler translation)",
        "excerpt": "While we were taken up with this, and were expecting each moment to be our last, Scylla pounced down suddenly upon us and snatched up my six best men. I was looking at once after both ship and men, and in a moment I saw their hands and feet ever so high above me, struggling in the air as Scylla was carrying them off, and I heard them call out my name in one last despairing cry.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_XII"
      },
      {
        "category": "literary",
        "title": "Aeschylus, The Persians (472 BC) — the Messenger's account of Salamis",
        "excerpt": "It was a ship of Hellas that began the charge and chopped off in its entirety the curved stern of a Phoenician boat. Each captain drove his ship straight against some other ship. When, however, the mass of our ships had been crowded in the narrows, and none could render another aid, and each crashed its bronze prow against each of its own line, they splintered their whole bank of oars. The hulls of our vessels rolled over, and the sea was hidden from our sight, strewn as it was with wrecks and slaughtered men.",
        "source": "Perseus Digital Library (Tufts)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0012:card=384"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Shipwreck (1805)",
        "excerpt": "Turner's tempest-tossed canvas shows a merchant ship foundering amid towering waves, its survivors crowded into pitching lifeboats as the sea overwhelms them. Thought to depict the recent sinking of the Earl of Abergavenny off Dorset, the painting is a defining image of the sublime terror of the sea and the utter vulnerability of vessels to forces beyond their control.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/The_Shipwreck_(Turner)",
        "image": {
          "src": "/covers/cargo-ship-attacked-hormuz-un-pauses-evacuation--art.png",
          "alt": "The Shipwreck, J. M. W. Turner, 1805 — a merchant ship foundering in a violent storm as survivors crowd into lifeboats amid towering waves",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Felix Mendelssohn, Meeresstille und glückliche Fahrt (Calm Sea and Prosperous Voyage), Overture Op. 27 (1828)",
        "excerpt": "Inspired by Goethe's paired poems, Mendelssohn's concert overture opens in an eerie, motionless calm that evokes the peril of a ship becalmed and helpless on a glassy sea, before a stirring breeze fills the sails and the music surges toward safe passage. The work dramatizes in sound the precariousness of a voyage at the mercy of the sea and the longing for a clear, unobstructed crossing.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Meeresstille_und_gl%C3%BCckliche_Fahrt,_Op.27_(Mendelssohn,_Felix)"
      }
    ],
    "rank": 2
  },
  {
    "slug": "samsung-648-billion-south-korea-investment",
    "headline": "Samsung Group to unveil $648 billion South Korea investment plan, including new chip plants",
    "overview": "Samsung Group is preparing to announce roughly 890 trillion won ($648 billion) in investments across South Korea, including major spending on new semiconductor plants, according to a report. The plan would rank among the largest corporate investment commitments in the country's history.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOY2F3d094MUpXQUcxZUloQzFSYVNpRWRjUWhSSEtQZ2RMVDdGdU1hZnl4VnFGSjd4emtNYm5FTkFITFByZXpFX3BQNmstbDZDVDJITjgtYnBIN1NiQ3RfSG5CbEdaQnlqaXFva2RRcDZqUDdFTGlZck1rcmtadU96R0hETkk1bnlNNGgwTGs2N3JYQl9jMVJGWlo3OXlhTzBwa2UtOWhQUDJrdGExaTZnTGRRbEJXVF9o?oc=5"
      },
      {
        "name": "The Korea Herald",
        "href": "https://www.koreaherald.com/article/10789340"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/samsung-648-billion-south-korea-investment.png",
      "alt": "Workers in protective suits inside a semiconductor cleanroom, the kind of advanced fabrication plant at the heart of Samsung's investment plan.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Magnitogorsk Iron and Steel Works, built during the Soviet First Five-Year Plan (1929-1934)",
        "excerpt": "Conceived under Stalin's industrialization drive, Magnitogorsk was raised almost from nothing on the steppe beside Magnitnaya Mountain's iron ore, planned as a one-industry giant modeled on Gary, Indiana and Pittsburgh. Tens of thousands of workers built one of the largest steel complexes in the world, a monument to a nation's headlong industrial ambition.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Magnitogorsk"
      },
      {
        "category": "historical",
        "title": "The Tennessee Valley Authority dam and infrastructure program (founded 1933)",
        "excerpt": "Created in 1933 as a flagship of Roosevelt's New Deal, the TVA undertook a sweeping buildout of hydroelectric dams, power lines, and regional infrastructure across an impoverished river basin. It became one of history's most ambitious public works campaigns, electrifying and remaking an entire region through monumental construction.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Tennessee_Valley_Authority"
      },
      {
        "category": "literary",
        "title": "Germinal by Émile Zola (1885), trans. Havelock Ellis",
        "excerpt": "This pit, piled up in the bottom of a hollow, with its squat brick buildings, raising its chimney like a threatening horn, seemed to him to have the evil air of a gluttonous beast crouching there to devour the earth.",
        "source": "Standard Ebooks",
        "href": "https://standardebooks.org/ebooks/emile-zola/germinal/havelock-ellis/text/single-page"
      },
      {
        "category": "literary",
        "title": "\"Smoke and Steel\" by Carl Sandburg (1920)",
        "excerpt": "Smoke into steel and blood into steel; Homestead, Braddock, Birmingham, they make their steel with men. … Smoke and blood is the mix of steel.",
        "source": "U.S. National Park Service",
        "href": "https://www.nps.gov/articles/000/sandburg-poetry-collection-smoke-and-steel.htm"
      },
      {
        "category": "artistic",
        "title": "Detroit Industry Murals, North Wall, by Diego Rivera (1932-33)",
        "excerpt": "Diego Rivera's vast fresco cycle in the Detroit Institute of Arts glorifies the machinery and labor of Ford's River Rouge plant, with blast furnaces, conveyor belts, and engine-making rendered as an epic of modern manufacture. Massed workers and looming apparatus turn an automobile factory into a cathedral of industrial ambition.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Rivera_detroit_industry_north.jpg",
        "image": {
          "src": "/covers/samsung-648-billion-south-korea-investment--art.png",
          "alt": "Detroit Industry, North Wall, fresco by Diego Rivera, 1932-33, depicting workers and machinery manufacturing Ford's V8 engine at the River Rouge plant",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Iron Foundry (Zavod / Steel), Op. 19, by Alexander Mosolov (1926-27)",
        "excerpt": "Mosolov's brief orchestral tour de force, drawn from his lost ballet \"Steel,\" conjures a factory at full roar using a live orchestra and a shaken sheet of metal. Pounding ostinatos accumulate instrument by instrument to evoke machines starting up and grinding away, a futurist hymn to industrial power.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Steel,_Op.19_(Mosolov,_Alexander)"
      }
    ],
    "rank": 3
  },
  {
    "slug": "us-bans-polestar-china-ev-pressure",
    "headline": "United States bans Polestar vehicles as it escalates pressure on Chinese electric carmakers",
    "overview": "The U.S. government moved to bar Polestar, the Volvo-affiliated electric vehicle brand, as part of a broader crackdown on Chinese-linked carmakers over national security concerns about connected-vehicle technology. The ban deepens trade tensions between Washington and Beijing over the auto industry.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi3gFBVV95cUxQLW1SMWdEUXp3ODA1STNZaXRMZVNWek9QRVRRMHpvdmJIRm8zYWhrVHJwOTFUWm9nSEVrVzVGYTFjR1JIMGYycHZwLXNqWVBKLUpIYkgtY1djSEJwb0hOTkdNSGpXSXByRlVUYnZnbVJLcm1BTGc2OUtSU2M3UzFzcGdYeU5yUnBydFgyZUdyMXcwY0RXRFMzWlZEOEYtSVdCakdLajRXb25rRGFEV295Z01iN0N1S0F4dTg2OVNQczJRV3A4UTFyMW14SWxUbXlrQ2pRUzNZUXhQcEh4WkE?oc=5"
      },
      {
        "name": "Electrek",
        "href": "https://electrek.co/2026/06/25/polestar-us-connected-vehicle-rule-europe/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/us-bans-polestar-china-ev-pressure.png",
      "alt": "A Polestar 2 electric car, the Volvo-affiliated brand barred from the United States amid pressure on Chinese-linked carmakers.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Chinese Exclusion Act (1882)",
        "excerpt": "Whereas, in the opinion of the Government of the United States the coming of Chinese laborers to this country endangers the good order of certain localities within the territory thereof: Therefore, Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled, That from and after the expiration of ninety days next after the passage of this act, and until the expiration of ten years next after the passage of this act, the coming of Chinese laborers to the United States be, and the same is hereby, suspended; and during such suspension it shall not be lawful for any Chinese laborer to come, or, having so come after the expiration of said ninety days, to remain within the United States.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Chinese_Exclusion_Act"
      },
      {
        "category": "historical",
        "title": "Embargo Act of 1807",
        "excerpt": "Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled, That an embargo be, and hereby is laid on all ships and vessels in the ports and places within the limits or jurisdiction of the United States, cleared or not cleared, bound to any foreign port or place; and that no clearance be furnished to any ship or vessel bound to such foreign port or place, except vessels under the immediate direction of the President of the United States.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/United_States_Statutes_at_Large/Volume_2/10th_Congress/1st_Session/Chapter_5"
      },
      {
        "category": "literary",
        "title": "Report on the Subject of Manufactures (1791)",
        "excerpt": "These have relations to the strong influence of habit and the spirit of imitation; the fear of want of success in untried enterprises; the intrinsic difficulties incident to first essays toward a competition with those who have previously attained to perfection in the business to be attempted; the bounties, premiums, and other artificial encouragements with which foreign nations second the exertions of their own citizens in the branches in which they are to be rivalled.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Report_on_Manufactures"
      },
      {
        "category": "literary",
        "title": "The National System of Political Economy, Chapter XXVI (1841)",
        "excerpt": "Measures of protection are justifiable only for the purpose of furthering and protecting the internal manufacturing power, and only in the case of nations which through an extensive and compact territory, large population, possession of natural resources, far advanced agriculture, a high degree of civilisation and political development, are qualified to maintain an equal rank with the principal agricultural manufacturing commercial nations, with the greatest naval and military powers.",
        "source": "Library of Economics and Liberty (EconLib)",
        "href": "https://www.econlib.org/library/YPDBooks/List/lstNPE26.html"
      },
      {
        "category": "artistic",
        "title": "Ograbme, or the American Snapping Turtle (1807)",
        "excerpt": "The cartoon shows a snapping turtle named \"Ograbme\" — \"Embargo\" spelled backwards — clamping onto a merchant who is trying to smuggle a barrel of goods aboard a British ship, while the trapped man cries out against the cursed restriction. It savages Jefferson's embargo as a self-inflicted bite that throttled American commerce in the name of pressuring a rival power, turning a trade weapon against the nation that wielded it.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Ograbme.jpg",
        "image": {
          "src": "/covers/us-bans-polestar-china-ev-pressure--art.png",
          "alt": "Ograbme, or the American Snapping Turtle, anonymous American political cartoon, 1807, depicting a snapping turtle labeled Ograbme seizing a merchant smuggling a barrel toward a British ship in protest of Jefferson's embargo",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Rule, Britannia! (1740), words by James Thomson, music by Thomas Arne",
        "excerpt": "When Britain first, at Heaven's command, / Arose from out the azure main; / This was the charter of the land, / And guardian angels sung this strain: / \"Rule, Britannia! rule the waves: / \"Britons never will be slaves.\" ... To thee belongs the rural reign; / Thy cities shall with commerce shine: / All thine shall be the subject main, / And every shore it circles thine. / \"Rule, Britannia! rule the waves: / \"Britons never will be slaves.\"",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Rule_Britannia_(Arne,_Thomas_Augustine)"
      }
    ],
    "rank": 4
  },
  {
    "slug": "xbox-raises-console-prices-worldwide",
    "headline": "Microsoft to raise Xbox console prices worldwide starting in August",
    "overview": "Microsoft said it will increase the price of Xbox consoles across global markets beginning in August, citing rising costs. It is the second worldwide Xbox price increase in roughly a year and follows similar moves by hardware makers passing higher costs on to consumers.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMikAFBVV95cUxNNFV2TUZuMzZYbHBGM21sRUp4d0lBVjFFb0RtRHFKd3pjMVpQSEwzOFFhbkVLQkVEMjd2VzlfUTV3WkViSTQ0ZkdGRngwYmRSM29HbXM5RFFZd0NqaEsxMHZDVHBsUFo3NmVwQ1JVbkgtLUNXejVfaThTWS12Q3RORHdLQkFqT2RybU5SbUFBUGc?oc=5"
      },
      {
        "name": "Gematsu",
        "href": "https://www.gematsu.com/2026/06/xbox-series-global-price-increase-announced"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/xbox-raises-console-prices-worldwide.png",
      "alt": "A Microsoft Xbox Series X games console, the hardware whose price is rising in markets worldwide.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Price Revolution, Europe (c. 1550–1650)",
        "excerpt": "The Price Revolution, sometimes known as the Spanish Price Revolution, was a series of economic events that occurred between the second half of the 16th century and the first half of the 17th century, and most specifically linked to the high rate of inflation that occurred during this period across Western Europe. Prices rose on average roughly sixfold over 150 years.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Price_revolution"
      },
      {
        "category": "historical",
        "title": "Hungarian Pengő Hyperinflation (1945–1946)",
        "excerpt": "The pengő lost value dramatically after World War II, suffering the highest rate of hyperinflation ever recorded in human history. There were several attempts to break the back of hyperinflation, such as a 75% capital levy in December 1945. However, this did not stop the inflation, and prices continued to spiral out of control, with ever higher denominations introduced.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Hungarian_peng%C5%91"
      },
      {
        "category": "literary",
        "title": "Henry David Thoreau, Walden, ch. \"Economy\" (1854)",
        "excerpt": "the cost of a thing is the amount of what I will call life which is required to be exchanged for it, immediately or in the long run. An average house in this neighborhood costs perhaps eight hundred dollars, and to lay up this sum will take from ten to fifteen years of the laborer's life, even if he is not encumbered with a family.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/205/205-h/205-h.htm"
      },
      {
        "category": "literary",
        "title": "Benjamin Franklin, The Way to Wealth (1758)",
        "excerpt": "You expect they will be sold cheap, and, perhaps, they may for less than they cost; but, if you have no occasion for them, they must be dear to you. Remember what poor Richard says, \"Buy what thou hast no need of, and ere long thou shalt sell thy necessaries.\" And again, \"At a great pennyworth pause a while:\" he means, that perhaps the cheapness is apparent only, and not real.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/43855/43855-h/43855-h.htm"
      },
      {
        "category": "artistic",
        "title": "Pieter Aertsen, A Meat Stall with the Holy Family Giving Alms (1551)",
        "excerpt": "Pieter Aertsen's panel piles the foreground with an almost obscene abundance of costly market wares — slabs of meat, sausages, a slaughtered ox's head, butter, fish and pretzels — heaped so thickly that the Holy Family giving alms recedes into the small background. The inverted composition sets the dear price of worldly goods against modest charity, making the viewer reckon the true cost of plenty. The overflowing stall reads as a meditation on consumption and what we pay, in coin and in conscience, for our appetites.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/A_Meat_Stall_with_the_Holy_Family_Giving_Alms",
        "image": {
          "src": "/covers/xbox-raises-console-prices-worldwide--art.png",
          "alt": "A Meat Stall with the Holy Family Giving Alms, Pieter Aertsen, 1551, oil-on-panel showing a market stall overflowing with meat, fish, butter and other costly wares, with the Holy Family giving alms in the small background",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Stephen Foster, Hard Times Come Again No More (1854)",
        "excerpt": "Stephen Foster's parlor song of 1854 sets a plaintive melody against a refrain that pleads for relief from want and dear days. It lingers at the door of the poor, naming the sigh of the weary and the frail forms fainting at the threshold, then begs that hard times come again no more. The tune has outlived its century precisely because the burden of rising costs and lean purses never fully passes.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Hard_Times_Come_Again_No_More_(Foster,_Stephen)"
      }
    ],
    "rank": 5
  },
  {
    "slug": "openai-delays-ipo-2027",
    "headline": "OpenAI leans toward delaying its initial public offering until 2027",
    "overview": "OpenAI is leaning toward waiting until next year to pursue an initial public offering, according to a New York Times report, rather than moving ahead in 2026. A listing of the ChatGPT maker would rank among the most closely watched market debuts in the technology sector.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQRkNFVmI0YkkxNUpIT2Zjc1ZjVGthLTViVlk0NG5kSzZMeEllaDBVcmlaUEczS25qMjR6VGg4MVpvVUM0M2sxOURZb1lhUWdSRHdUZHVLN0ZVZjBFQXRRX2N1NlI4bGJxc29GZEtiUnRNNElMbFRCZnNZV0pfbXpTOE8xbVZ3THpfY3Z1OXh2SXpEVWkzQWgxcDBURWloa05VVlVTZXFVWTViSXJiMVlNU0pIMkIzejhSOGFYNnliWVY?oc=5"
      },
      {
        "name": "PYMNTS",
        "href": "https://www.pymnts.com/news/investment-tracker/ipo/2026/openai-weighs-delay-of-ipo-as-tech-stock-volatility-rattles-advisers/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/openai-delays-ipo-2027.png",
      "alt": "A 1606 share certificate of the Dutch East India Company, the first company to offer tradeable public shares, recalling the long history of going public.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Dutch East India Company (VOC), the first public share offering (1602)",
        "excerpt": "Shares in the company could be purchased by any citizen of the Dutch Republic and bought and sold in open-air secondary markets, one of which became the Amsterdam Stock Exchange.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Dutch_East_India_Company"
      },
      {
        "category": "historical",
        "title": "The founding subscription of the Bank of England (1694)",
        "excerpt": "In the end the £1.2 million was raised in 12 days; 1,268 people subscribed.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Bank_of_England"
      },
      {
        "category": "literary",
        "title": "The Way We Live Now, by Anthony Trollope (1875)",
        "excerpt": "The object of Fisker, Montague, and Montague was not to make a railway to Vera Cruz, but to float a company. Paul thought that Mr. Fisker seemed to be indifferent whether the railway should ever be constructed or not. It was clearly his idea that fortunes were to be made out of the concern before a spadeful of earth had been moved.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
      },
      {
        "category": "literary",
        "title": "Money (L'Argent), by Émile Zola (1891)",
        "excerpt": "There was only gambling that was worth anything--gambling which in one afternoon can at one stroke bring comfort, luxury, life, broad and entire. Even if this old social world were fated to crumble some day, could not a man like himself still find time and room to satisfy his desires before the Downfall?",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm"
      },
      {
        "category": "artistic",
        "title": "Portraits at the Stock Exchange (À la Bourse), by Edgar Degas (c. 1878–79)",
        "excerpt": "Degas sets his patron, the banker Ernest May, on the crowded trading floor of the Paris Bourse, a slip of paper passing furtively between gloved hands. With its quick, sketchy brushwork the painting captures the modern temple of finance where fortunes are made on whispered information and the buying and selling of shares.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Portraits_at_the_Stock_Exchange",
        "image": {
          "src": "/covers/openai-delays-ipo-2027--art.png",
          "alt": "Portraits at the Stock Exchange (À la Bourse), painting by Edgar Degas, c. 1878–79, depicting the banker Ernest May and others on the trading floor of the Paris Bourse, with a note passing between hands.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Utopia, Limited; or, The Flowers of Progress, by Gilbert and Sullivan (1893)",
        "excerpt": "In this Savoy opera, an entire kingdom is reconstituted as a limited liability joint-stock company, lampooning the Victorian craze for floating ventures and the notion that a bankrupt enterprise could leave its creditors unpaid while its owners bore no liability. Sullivan's buoyant score sets Gilbert's satire on company promotion, shares, and the speculative gospel of progress.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Utopia_Limited_(Sullivan,_Arthur)"
      }
    ],
    "rank": 6
  },
  {
    "slug": "meta-first-in-house-ai-glasses",
    "headline": "Meta unveils its first in-house AI glasses designs, including a Kylie Jenner collaboration",
    "overview": "Meta revealed the first smart glasses designed entirely in-house, expanding its line of AI-enabled eyewear beyond its partnership with EssilorLuxottica. The launch includes a collaboration with the celebrity Kylie Jenner aimed at broadening the appeal of face-worn computing.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/25/meta-glasses-smart-ai-kylie-jenner/"
      },
      {
        "name": "Engadget",
        "href": "https://www.engadget.com/2199519/meta-ai-glasses-hands-on-kylie-jenner-edition/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/meta-first-in-house-ai-glasses.png",
      "alt": "A replica of Galileo's telescope, one of the early optical instruments in the long lineage of devices that extend and augment human sight.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Ibn al-Haytham, Book of Optics (Kitāb al-Manāẓir), c. 1011–1021",
        "excerpt": "In his seven-volume Book of Optics, the Arab polymath Ibn al-Haytham overturned the ancient idea that the eye casts out rays, demonstrating instead the intromission theory still accepted today: that vision arises from light reflecting off objects and entering the eye. Through careful experiment with mirrors, lenses, and the camera obscura, he laid the mathematical and experimental foundations of how human sight actually works, shaping every optical instrument that followed.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Book_of_Optics"
      },
      {
        "category": "historical",
        "title": "Robert Hooke, Micrographia, 1665",
        "excerpt": "By the means of Telescopes, there is nothing so far distant but may be represented to our view; and by the help of Microscopes, there is nothing so small, as to escape our inquiry; hence there is a new visible World discovered to the understanding. By this means the Heavens are open'd, and a vast number of new Stars, and new Motions, and new Productions appear in them, to which all the ancient Astronomers were utterly Strangers.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/15491/15491-h/15491-h.htm"
      },
      {
        "category": "literary",
        "title": "John Keats, \"On First Looking into Chapman's Homer,\" 1816",
        "excerpt": "Then felt I like some watcher of the skies\nWhen a new planet swims into his ken;\nOr like stout Cortez when with eagle eyes\nHe stared at the Pacific—and all his men\nLook'd at each other with a wild surmise—\nSilent, upon a peak in Darien.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/On_First_Looking_into_Chapman's_Homer"
      },
      {
        "category": "literary",
        "title": "H. G. Wells, \"The Crystal Egg\" (in Tales of Space and Time), 1897",
        "excerpt": "The view, as Mr. Cave described it, was invariably of an extensive plain, and he seemed always to be looking at it from a considerable height, as if from a tower or a mast.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/27365/27365-h/27365-h.htm"
      },
      {
        "category": "artistic",
        "title": "Tommaso da Modena, Portrait of Cardinal Hugh of Saint-Cher (fresco), 1352",
        "excerpt": "Painted in the chapter house of San Nicolò in Treviso, Tommaso da Modena's fresco of the Dominican cardinal Hugh of Saint-Cher shows the scholar at his writing desk peering through a pair of rivet spectacles—the earliest known depiction of a person wearing eyeglasses. The small framed lenses, perched on the nose as he annotates a manuscript, capture the precise moment optics entered the everyday human face, centuries before the camera or the smart lens.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:38_Ugo_da_San_Caro.jpg",
        "image": {
          "src": "/covers/meta-first-in-house-ai-glasses--art.png",
          "alt": "Portrait of Cardinal Hugh of Saint-Cher, fresco by Tommaso da Modena, 1352, depicting the scholar at his desk wearing rivet spectacles—the earliest known image of a person wearing eyeglasses.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Strauss, Also sprach Zarathustra, Op. 30, 1896",
        "excerpt": "Strauss's tone poem opens with its celebrated \"Sunrise,\" a slow swell of low organ and trumpet blazing into a radiant C-major chord—an unmistakable musical image of light dawning and consciousness awakening. The passage stages perception itself as an event, the moment the eye first opens upon a vast new world, a fitting overture for any instrument that promises to expand how we see.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Also_sprach_Zarathustra,_Op.30_(Strauss,_Richard)"
      }
    ],
    "rank": 7
  },
  {
    "slug": "spacex-starpipe-gas-pipeline-starship",
    "headline": "SpaceX plans 'Starpipe' natural gas pipeline to fuel its Starship rockets in Texas",
    "overview": "SpaceX is planning to build a natural gas pipeline, dubbed 'Starpipe', to supply fuel for its Starship rocket program, according to a Reuters report. The project would secure a dedicated energy supply for the company's expanding launch operations in Texas.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxOTy0zT1R2aUUxTFA1NVhDVnVVZjdMQWFSQ0tEOVE1d1poakNjS19jX1ExemhSS3QxVGQyYkNsZjg1eHRtRFdIbjNfTjBNVW1BNVFTdjRza3EySmY3UzAwRVFNRmt6d0NQeURSVnBvcThnZnZUX2JGald5em52c1ViSXlXWW9zME5ONXJfWk96RDNqdFZoSW9Ram83VXVkZjVyXzByallqMjFkSDJJbm9NYjEyY1ZqQ1REU3RjT0x5UQ?oc=5"
      },
      {
        "name": "OilPrice.com",
        "href": "https://oilprice.com/Latest-Energy-News/World-News/SpaceX-Wants-to-Fuel-Its-Mars-Ambitions-With-Its-Own-Gas-Pipeline.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/spacex-starpipe-gas-pipeline-starship.png",
      "alt": "A SpaceX Starship rocket climbing on a column of flame, the launch program a Texas natural-gas pipeline would fuel.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Frontinus, The Aqueducts of Rome (De aquaeductu), c. AD 97",
        "excerpt": "With such an array of indispensable structures carrying so many waters, compare, if you will, the idle Pyramids or the useless, though famous, works of the Greeks!",
        "source": "LacusCurtius (University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Frontinus/De_Aquis/Bennett/1*.html"
      },
      {
        "category": "historical",
        "title": "The Big Inch and Little Big Inch Pipelines, 1942–1944",
        "excerpt": "The Big Inch and Little Big Inch were emergency wartime petroleum pipelines built between 1942 and 1944 to carry oil more than 1,200 miles from the fields of Texas to the refineries and ports of the northeastern United States, beyond the reach of German submarines. Among the longest pipelines ever attempted, they delivered hundreds of thousands of barrels a day and, after the war, were converted to move natural gas, transforming the energy market of the East Coast.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Big_Inch"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound, 5th century BC",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource. Such then as this is the vengeance that I endure for my trespasses, being riveted in fetters beneath the naked sky.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "literary",
        "title": "The Tower of Babel, Genesis 11:1–4 (King James Version), 1611",
        "excerpt": "And the whole earth was of one language, and of one speech. And it came to pass, as they journeyed from the east, that they found a plain in the land of Shinar; and they dwelt there. And they said one to another, Go to, let us make brick, and burn them throughly. And they had brick for stone, and slime had they for morter. And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg, Coalbrookdale by Night, 1801",
        "excerpt": "De Loutherbourg's nocturne sets the Madeley Wood ironworks ablaze against a moonlit gorge, fire and smoke roaring from the furnaces while laborers haul fuel and iron through the dark. Often called an emblem of the Industrial Revolution's birth, it makes industry itself a kind of infernal sublime—humanity harnessing fire and earth to forge a new world.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Coalbrookdale_by_Night",
        "image": {
          "src": "/covers/spacex-starpipe-gas-pipeline-starship--art.png",
          "alt": "Coalbrookdale by Night, Philip James de Loutherbourg, 1801, depicting the Bedlam ironworks furnaces blazing with fire and smoke in a moonlit gorge",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1), 1923",
        "excerpt": "Honegger's orchestral tour de force portrays a heavy steam locomotive heaving into motion, gathering speed, and thundering across the rails before its final braking halt. Built from accelerating rhythmic layers and roaring brass, it is a hymn to the raw power of the machine—the same harnessed energy and forward momentum that hurls a fuelled rocket skyward.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      }
    ],
    "rank": 8
  },
  {
    "slug": "world-cup-all-time-attendance-record",
    "headline": "2026 World Cup sets all-time attendance record, surpassing the 1994 mark",
    "overview": "The 2026 FIFA World Cup has set a new all-time attendance record, surpassing the figure set when the United States last hosted the tournament in 1994. Organizers credited the expanded 48-team field and matches across North America for drawing the largest crowds in the competition's history.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQa0NzZGZyMDRIeWtVd1ltMFNhdFRyeEVjNWxVb0ZTLXBHZ2JUNG9TQVEzeFY3MnlpMExoVUhUdmVBUWpoS0NBTGlvRmFiOGxvaW90dEJ6UWJkeDNZUjhWQjZQUjNfVU1oRHNOMWpQdlJnUVluOWVUWTlPc1l5TGpYUnduQlFSVGZ6V3NLUEVyOGhnbUFRUkl6VG9TLXQtaTluQ3ZodWFsOU1yUnM4aEZKSUZ3?oc=5"
      },
      {
        "name": "FIFA (inside.fifa.com)",
        "href": "https://inside.fifa.com/news/world-cup-2026-sets-new-daily-attendance-record"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/world-cup-all-time-attendance-record.png",
      "alt": "The Panathenaic Stadium in Athens packed with spectators at the 1896 Olympic Games, an emblem of the vast crowds drawn to great public contests.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Ancient Olympic Games (from 776 BC), Olympia",
        "excerpt": "The Olympic Games were a series of athletic competitions among representatives of city-states and one of the Panhellenic Games of ancient Greece. They were held in honor of Zeus, and the Greeks gave them a mythological origin. Uninhabited throughout the year, when the games were held the site became over congested. There were no permanent living structures for spectators, who, rich or poor, made do with tents.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Ancient_Olympic_Games"
      },
      {
        "category": "historical",
        "title": "The Inaugural Games of the Colosseum (AD 80), Rome",
        "excerpt": "The inaugural games were held, on the orders of the Roman Emperor Titus, to celebrate the completion in AD 80 (81 according to some sources) of the Colosseum, then known as the Flavian Amphitheatre (Latin: Amphitheatrum Flavium). Titus inaugurated the opening of the Colosseum with lavish games which lasted for more than a hundred days.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Inaugural_games_of_the_Colosseum"
      },
      {
        "category": "literary",
        "title": "Pindar, Olympian Ode 1 (476 BC; trans. Ernest Myers, 1874)",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/1"
      },
      {
        "category": "literary",
        "title": "Juvenal, Satire X (\"bread and circuses\"), c. AD 100–127; trans. Lewis Evans",
        "excerpt": "For that sovereign people that once gave away military command, consulships, legions, and every thing, now bridles its desires, and limits its anxious longings to two things only--bread, and the games of the circus!",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/50657/50657-h/50657-h.htm"
      },
      {
        "category": "artistic",
        "title": "Ulpiano Checa, \"Carrera de carros romanos\" (Roman Chariot Race), 1890",
        "excerpt": "Checa's thundering chariot race captures the essence of the mass spectacle: charioteers straining forward as the teams of horses surge across the arena, the whole composition charged with the speed, dust, and roar of a crowd-packed Roman circus. It distills the ancient appetite for public contest and communal frenzy that great games have always summoned.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Carrera_de_carros_romanos-Ulpiano_Checa.JPG",
        "image": {
          "src": "/covers/world-cup-all-time-attendance-record--art.png",
          "alt": "Carrera de carros romanos (Roman Chariot Race) by Ulpiano Checa, 1890, depicting charioteers and horses racing before a packed arena",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Spyridon Samaras, Olympic Hymn (1896), lyrics by Kostis Palamas",
        "excerpt": "Composed for the opening ceremony of the first modern Olympic Games in Athens and first performed before a crowd of tens of thousands at the Panathenaic Stadium, Samaras's cantata sets Palamas's invocation of the immortal spirit of antiquity to surging choral and orchestral forces. It is music built to bind a mass gathering together, summoning nations into a single festival of contest and glory.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Olympic_Anthem_Score.pdf"
      }
    ],
    "rank": 9
  },
  {
    "slug": "king-charles-leaves-buckingham-palace",
    "headline": "King Charles will not return to live at Buckingham Palace after its renovation, officials say",
    "overview": "King Charles III will not move back into Buckingham Palace once a long-running, multibillion-pound renovation of the building is complete, royal officials said. The monarch is expected to continue residing elsewhere, leaving the historic London palace primarily for state functions and public access.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxQcV9Ub1ZBdm1YbzRyMm4zaHBIeU9YTzQ0bEJNRzNMWWlqTjdOR3g1cUF1cmNMNGZ5VlVFc2V0U2ZnUzhrWUpqRzFuRjdvdm1tVDRJN2E4VmNEcWtyVG1VdUs2UVBHZFpHOTJsVHVTUkl0TTRFZzdnUjRvMVFFWUxhaERjcUJmWFpxWEtKcFcyVW5Oa25BNlFiNGZNVmtLbWtSVUFLVlNMR1I4X09DNzFZSlBNSFIwdw?oc=5"
      },
      {
        "name": "PBS News",
        "href": "https://www.pbs.org/newshour/world/king-charles-iii-will-not-live-at-buckingham-palace-after-completion-of-costly-decade-long-refurbishment"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/king-charles-leaves-buckingham-palace.png",
      "alt": "Buckingham Palace in London, the historic royal residence King Charles will not return to live in after its renovation.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The French court moves to Versailles (1682) and is swept out in 1789",
        "excerpt": "The king, the court, and the royal government lived there permanently from 6 May 1682 until 6 October 1789, except during the Regency years (1715–1723). In 1789, the French Revolution swept the royal family and government out of Versailles forever.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Palace_of_Versailles"
      },
      {
        "category": "historical",
        "title": "Diocletian's Palace at Split, the emperor's retirement residence (c. 305 AD)",
        "excerpt": "It was built at the end of the third century AD by the Roman Emperor Diocletian as his retirement residence. Diocletian had ordered the construction of the heavily fortified compound near his hometown of Spalatum in preparation for his retirement on 1 May 305 AD.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Diocletian%27s_Palace"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Henry IV, Part 2, Act 3 Scene 1 (c. 1600)",
        "excerpt": "O sleep, O gentle sleep,\nNature's soft nurse, how have I frighted thee,\nThat thou no more wilt weigh my eyelids down\nAnd steep my senses in forgetfulness?\nWhy rather, sleep, liest thou in smoky cribs,\nUpon uneasy pallets stretching thee\nAnd hush'd with buzzing night-flies to thy slumber,\nThan in the perfumed chambers of the great,\nUnder the canopies of costly state,\nAnd lull'd with sound of sweetest melody?\nO thou dull god, why liest thou with the vile\nIn loathsome beds, and leavest the kingly couch\nA watch-case or a common 'larum-bell?\nCanst thou, O partial sleep, give thy repose\nTo the wet sea-boy in an hour so rude,\nAnd in the calmest and most stillest night,\nWith all appliances and means to boot,\nDeny it to a king? Then happy low, lie down!\nUneasy lies the head that wears a crown.",
        "source": "The Complete Works of William Shakespeare (MIT)",
        "href": "https://shakespeare.mit.edu/2henryiv/2henryiv.3.1.html"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (1818)",
        "excerpt": "I met a traveller from an antique land\nWho said: Two vast and trunkless legs of stone\nStand in the desert . . . Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:\nAnd on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "\"Throne Room, Buckingham Palace\" (1914), photograph by Alexander Hood",
        "excerpt": "A 1914 photograph of the gilded Throne Room at Buckingham Palace: the empty canopied thrones beneath an ornate, deserted hall of state, an image of royal grandeur as ceremonial setting rather than lived-in home. The picture captures the palace as a stage for monarchy, magnificent yet uninhabited, anticipating its later turn toward state functions and public access.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Throne_Room,_Buckingham_Palace,_1914.jpg",
        "image": {
          "src": "/covers/king-charles-leaves-buckingham-palace--art.png",
          "alt": "Throne Room, Buckingham Palace, 1914, photograph by Alexander Hood, depicting the gilded, empty canopied thrones in the palace's ceremonial hall of state",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749)",
        "excerpt": "Handel's grand wind suite was composed under contract to George II to accompany a royal fireworks display in London's Green Park, celebrating peace with the full pomp of the court. Its blazing brass and ceremonial pageantry embody the sound of monarchy on public display, music made not for private chambers but for the spectacle of the crown before the people.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      }
    ],
    "rank": 10
  },
  {
    "slug": "sothebys-london-record-392-million-sale",
    "headline": "Sotheby's London masterpiece sale earns a record-setting $392.6 million",
    "overview": "Sotheby's said its London masterpiece evening sale brought in $392.6 million, a record for the auction house's marquee summer event. The result signaled resilience at the top end of the art market despite broader economic uncertainty.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/sothebys-london-masterpiece-sale-earns-392-million-1234753425/"
      },
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/sothebys-london-masterpiece-sale-earns-392-million-1234753425/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/sothebys-london-record-392-million-sale.png",
      "alt": "A 19th-century painting of a connoisseur appraising a work of art, evoking the collectors and experts who drive the high-end art market.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Sale of the Orleans Collection in London (1798)",
        "excerpt": "The Orleans Collection was a very important collection of over 500 paintings formed by Philippe II, Duke of Orléans, mostly acquired between about 1700 and his death in 1723. The pictures were put on exhibition for seven months in 1798, with a view to selling at a least a part of them, in Bryan's Gallery in Pall Mall, with the larger ones at the Lyceum in the Strand; admission was 2/6d rather than the 1s. usual for such events.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Orleans_Collection"
      },
      {
        "category": "historical",
        "title": "The Commonwealth 'Sale of the Late King's Goods' (1649)",
        "excerpt": "The entire Royal Collection, which included 1,500 paintings and 500 statues, was sold after Charles's execution in 1649. The 'Sale of the Late King's Goods' at Somerset House raised £185,000 for the English Republic.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Royal_Collection"
      },
      {
        "category": "literary",
        "title": "Honoré de Balzac, Cousin Pons (1847)",
        "excerpt": "This system, carried out for forty years, in Rome or Paris alike, had borne its fruits. Since Pons returned from Italy, he had regularly spent about two thousand francs a year upon a collection of masterpieces of every sort and description, a collection hidden away from all eyes but his own; and now his catalogue had reached the incredible number of 1907.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1856/1856-h/1856-h.htm"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes 2:8–11 (King James Version, 1611)",
        "excerpt": "I gathered me also silver and gold, and the peculiar treasure of kings and of the provinces: I gat me men singers and women singers, and the delights of the sons of men, as musical instruments, and that of all sorts. So I was great, and increased more than all that were before me in Jerusalem: also my wisdom remained with me. And whatsoever mine eyes desired I kept not from them, I withheld not my heart from any joy; for my heart rejoiced in all my labour: and this was my portion of all my labour. Then I looked on all the works that my hands had wrought, and on the labour that I had laboured to do: and, behold, all was vanity and vexation of spirit, and there was no profit under the sun.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "artistic",
        "title": "David Teniers the Younger, Archduke Leopold Wilhelm in his Painting Gallery in Brussels (c. 1647–1651)",
        "excerpt": "Teniers, court painter and de facto keeper of the Archduke's collection, fills the canvas wall-to-wall with masterpieces, a connoisseur's dream catalogued in paint. The Archduke and his friends move among the hung pictures while the artist inspects engravings at a table, an inventory of taste and possession that doubled as a marketing tool for the collection.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Archduke_Leopold_Wilhelm_in_his_Painting_Gallery_in_Brussels_(Prado)",
        "image": {
          "src": "/covers/sothebys-london-record-392-million-sale--art.png",
          "alt": "Archduke Leopold Wilhelm in his Painting Gallery in Brussels, David Teniers the Younger, c. 1647–1651, oil on copper depicting the Archduke and companions among walls densely hung with Italian masterpieces",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Franz Lehár, Gold und Silber (Gold and Silver Waltz), Op. 79 (1902)",
        "excerpt": "Lehár composed this glittering Viennese waltz at the request of Princess Pauline Metternich for her lavish high-society 'Gold and Silver Ball' of January 1902. Its shimmering, opulent melodies became an emblem of belle-époque luxury and aristocratic extravagance, the very sound of wealth on display.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Gold_und_Silber,_Op.79_(Leh%C3%A1r,_Franz)"
      }
    ],
    "rank": 11
  },
  {
    "slug": "paris-court-totalenergies-climate-order",
    "headline": "Paris court gives TotalEnergies six months to bring its climate policy into line",
    "overview": "A Paris court ordered French oil and gas major TotalEnergies to tighten its climate policies within six months, in a closely watched case brought by environmental groups. The ruling adds to mounting legal pressure on fossil-fuel companies to align their strategies with international climate goals.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxOekRzdVVjdnp4d3N5X1hMTzhnNlRJTU9GRTJNNkhJVzBMcG9mMW1jZFl4dXdORWlXMTMzSm1yYjdjdUs2Tk81Z1RxNG9qQU9kbjRORTZEc1F1Q3Nfd296ZkgyX0dHV2lFOGFlWUxKTXluSEc5dlJqZS1FOWJBSjduNVI4ZXhvSUNzenpUc29TMVRlUU4wdWxYemp2N3BnUlBj?oc=5"
      },
      {
        "name": "Fortune",
        "href": "https://fortune.com/2026/06/25/paris-court-total-energies-climate-policy-lawsuit-heatwave/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/paris-court-totalenergies-climate-order.png",
      "alt": "An oil refinery's towers and tanks at dusk, the fossil-fuel industry a French court has ordered to tighten its climate policy.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Trail Smelter Arbitration (United States v. Canada), 1938 and 1941",
        "excerpt": "The Trail Smelter dispute was a trans-boundary pollution case involving the federal governments of both Canada and the United States, which eventually contributed to establishing the harm principle in the environmental law of transboundary pollution.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Trail_Smelter_dispute"
      },
      {
        "category": "historical",
        "title": "The 1948 Donora Smog, Pennsylvania, 1948",
        "excerpt": "The 1948 Donora smog, also called the Donora death fog, was an air pollution disaster that occurred in Donora, Pennsylvania, beginning on October 27, 1948, and lasting several days. It killed 20 people and caused respiratory problems for 6,000 of the 14,000 people living in Donora, a mill town on the Monongahela River 24 miles (39 km) southeast of Pittsburgh.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1948_Donora_smog"
      },
      {
        "category": "literary",
        "title": "\"God's Grandeur\" by Gerard Manley Hopkins, written 1877 (published 1918)",
        "excerpt": "Generations have trod, have trod, have trod; And all is seared with trade; bleared, smeared with toil; And wears man's smudge and shares man's smell: the soil Is bare now, nor can foot feel, being shod. And for all this, nature is never spent; There lives the dearest freshness deep down things;",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Poems_of_Gerard_Manley_Hopkins/God's_Grandeur"
      },
      {
        "category": "literary",
        "title": "An Enemy of the People by Henrik Ibsen, 1882",
        "excerpt": "All the nastiness up at Molledal, all that stinking filth, is infecting the water in the conduit-pipes leading to the reservoir; and the same cursed, filthy poison oozes out on the shore too—... The whole Bath establishment is a whited, poisoned sepulchre, I tell you—the gravest possible danger to the public health!",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2446/2446-h/2446-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Houses of Parliament, Sunset by Claude Monet, 1903",
        "excerpt": "Monet painted the Palace of Westminster again and again as a dim silhouette dissolving into the thick, sulfurous haze that hung over the Thames. The artist was openly fascinated by London's fogs, a by-product of the Industrial Revolution's coal smoke, and rendered the polluted air itself as shifting curtains of violet, amber and rose. What reads as beauty is also a portrait of a great city's sky choked by industry.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Houses_of_Parliament_(Monet_series)",
        "image": {
          "src": "/covers/paris-court-totalenergies-climate-order--art.png",
          "alt": "The Houses of Parliament, Sunset, Claude Monet, 1903, oil painting of the Palace of Westminster as a dark silhouette behind glowing industrial fog and smog over the River Thames",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Die Schöpfung (The Creation), oratorio by Joseph Haydn, 1798",
        "excerpt": "Haydn's grand oratorio sings the making of the world from primordial chaos into light, sea, sky and teeming life, voicing in radiant choruses the splendor of an unspoiled earth. Its exultant hymn to the heavens and the land stands as a vision of the very creation that climate litigation now seeks to defend. Against the soiled air and water of the industrial age, the score offers nature in its first, untainted glory.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      }
    ],
    "rank": 12
  },
  {
    "slug": "congo-ebola-cases-rise-1155",
    "headline": "Democratic Republic of Congo says confirmed Ebola cases have risen to 1,155",
    "overview": "Health authorities in the Democratic Republic of Congo said the number of confirmed Ebola cases in the country's current outbreak has climbed to 1,155, as responders work to contain the spread. The figures underscore the scale of one of the largest recent flare-ups of the often-deadly virus.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPS1Fla3NXMkZiSGpDbjZXZk1uVUIxN0ROaHdKaURtN2RELW1pVkpmeERRMHkzQWttNXhFaE9UazZRaGlHOUJUYXFWcnVHSTRaaHdKc0lVTWVfa3VaR2dQYTVSYXU5MmZkZjhNaXRGZFJwdzRnWkpLYnAyM0N1ZDhTTEFNT0xKUFBiWERlTmg5dGViZVpCeFUzaUwzcWpmeGE0UmViNHVEa3VpWkw3V1NFYzkyYnJ3UnJEUHNOVEIzTQ?oc=5"
      },
      {
        "name": "World Health Organization — Disease Outbreak News",
        "href": "https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON602"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/congo-ebola-cases-rise-1155.png",
      "alt": "A coloured electron-microscope image of an Ebola virus virion, the pathogen behind the outbreak spreading in the Democratic Republic of Congo.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 26 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Black Death (1346–1353)",
        "excerpt": "The Black Death was a catastrophic plague pandemic that swept across Eurasia and North Africa, caused by the bacterium Yersinia pestis spread by fleas and by respiratory transmission. It killed an estimated 25 to 50 million people, wiping out roughly 30 to 60 percent of Europe's population, with cities such as Florence losing as much as 80 percent of their inhabitants within months. Reaching Europe via Genoese traders fleeing the siege of Kaffa, it spread relentlessly through Mediterranean ports and trade networks.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Black_Death"
      },
      {
        "category": "historical",
        "title": "The 1918 Influenza Pandemic (1918–1920)",
        "excerpt": "The H1N1 influenza pandemic infected nearly a third of the global population — an estimated 500 million people — over roughly two years. Death estimates range from 17 million to 50 million, with some scholars proposing figures as high as 100 million. Its second wave in late 1918 proved far deadlier than the mild spring outbreak, with October 1918 the most lethal month, killing young, healthy adults in vast numbers.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Spanish_flu"
      },
      {
        "category": "literary",
        "title": "Mary Shelley, The Last Man (1826)",
        "excerpt": "Can it be true, each asked the other with wonder and dismay, that whole countries are laid waste, whole nations annihilated, by these disorders in nature? The vast cities of America, the fertile plains of Hindostan, the crowded abodes of the Chinese, are menaced with utter ruin. Where late the busy multitudes assembled for pleasure or profit, now only the sound of wailing and misery is heard. The air is empoisoned, and each human being inhales death, even while in youth and health, their hopes are in the flower.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/18247/pg18247.txt"
      },
      {
        "category": "literary",
        "title": "Jack London, The Scarlet Plague (1912)",
        "excerpt": "The heart began to beat faster and the heat of the body to increase. Then came the scarlet rash, spreading like wildfire over the face and body. Most persons never noticed the increase in heat and heart-beat, and the first they knew was when the scarlet rash came out. Usually, they had convulsions at the time of the appearance of the rash.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/21970/pg21970.txt"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Triumph of Death (c. 1562)",
        "excerpt": "An oil panel in which the triumph of Death over all earthly things is rendered as a vast army of skeletons laying waste to a blackened, desolate landscape. Death leads his legions on a reddish horse, herding the living toward an enormous coffin from which there is no escape — a sweeping vision of mortality overrunning every rank of society, painted in the shadow of recurring plague.",
        "source": "Museo Nacional del Prado",
        "href": "https://www.museodelprado.es/en/the-collection/art-work/the-triumph-of-death/d3d82b0b-9bf2-4082-ab04-66ed53196ccc",
        "image": {
          "src": "/covers/congo-ebola-cases-rise-1155--art.png",
          "alt": "The Triumph of Death, Pieter Bruegel the Elder, c. 1562, depicting an army of skeletons ravaging a blackened landscape and herding the living toward death",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Songs and Dances of Death (1875–1877)",
        "excerpt": "A song cycle for voice and piano in four scenes, each portraying Death personified as he comes to claim the dying — soothing a sick child by its cradle, serenading a feverish young woman, luring a lost peasant to freeze in the snow, and gloating over a battlefield of the slain. Set to poems by Golenishchev-Kutuzov, the music turns the intimate, inescapable approach of death into a series of tender, terrifying encounters.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Songs_and_Dances_of_Death_(Mussorgsky,_Modest)"
      }
    ],
    "rank": 13
  },
  {
    "slug": "herculaneum-scroll-fully-read",
    "headline": "Researchers read a complete carbonized Herculaneum scroll for the first time",
    "overview": "Scientists announced that they have, for the first time, virtually unrolled and read the complete text of a papyrus scroll that was carbonized by the eruption of Mount Vesuvius in AD 79, without physically opening the fragile artifact. Using high-resolution scans and machine learning developed through the Vesuvius Challenge, researchers recovered columns of ancient text from one of the charred library rolls buried at Herculaneum.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxPd0JnOGV1dVJ5X0xoUVF2NUx1Z0hBTm5jV2dzQTgtNnZNRnVOSWd4Q1VjeXl2cmg2V1JNU1lFYmlkQTlHV0c2MnFfR3N1eGxBYXBTMEFlMzF2blF4NkhBM2phWWloNkhrS0ppb3lXX1BubWRuQURuNDZicTdPZkpUVHBfN1ZiR0tMaktJcHpkWmp3bXpvYURyRHBpeS00ME9DbTZZMDdCT2tUc00?oc=5"
      },
      {
        "name": "Vesuvius Challenge (Scroll Prize)",
        "href": "https://scrollprize.org/firstscroll"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/herculaneum-scroll-fully-read.png",
      "alt": "A blazing eruption of Mount Vesuvius over the Bay of Naples, evoking the disaster that carbonized the Herculaneum library scrolls.",
      "credit": "Wikimedia Commons"
    },
    "rank": 14,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Younger describes the eruption of AD 79",
        "excerpt": "Those who were looking at the cloud from some distance could not make out from which mountain it was rising - it was afterwards discovered to have been Mount Vesuvius - but in likeness and form it more closely resembled a pine-tree than anything else, for what corresponded to the trunk was of great length and height, and then spread out into a number of branches, the reason being, I imagine, that while the vapour was fresh, the cloud was borne upwards, but when the vapour became wasted, it lost its motion, or even became dissipated by its own weight, and spread out laterally.",
        "source": "Pliny the Younger, Letters 6.16 (to Tacitus), trans. J. B. Firth (1900)",
        "href": "https://www.attalus.org/old/pliny6.html"
      },
      {
        "category": "historical",
        "title": "The rediscovery of the Villa of the Papyri and its buried library",
        "excerpt": "When the carbonized scroll now read end to end was sealed in AD 79, it sat in the only library to survive intact from the ancient world. The Villa of the Papyri at Herculaneum, stumbled upon by well-diggers in 1750 and tunneled into under the Bourbon kings of Naples, gave up more than 1,800 charred rolls, many of them Epicurean works by Philodemus of Gadara. For two and a half centuries those blackened lumps resisted every attempt to open them; the breakthrough announced in 2026 reaches the words inside without ever unrolling the papyrus.",
        "source": "Wikipedia, \"Villa of the Papyri\"",
        "href": "https://en.wikipedia.org/wiki/Villa_of_the_Papyri"
      },
      {
        "category": "literary",
        "title": "Lucretius opens De Rerum Natura, the great Epicurean poem",
        "excerpt": "Mother of Rome, delight of Gods and men,\nDear Venus that beneath the gliding stars\nMakest to teem the many-voyaged main\nAnd fruitful lands - for all of living things\nThrough thee alone are evermore conceived,\nThrough thee are risen to visit the great sun -\nBefore thee, Goddess, and thy coming on,\nFlee stormy wind and massy cloud away,\nFor thee the daedal Earth bears scented flowers,\nFor thee waters of the unvexed deep\nSmile, and the hollows of the serene sky\nGlow with diffused radiance for thee!",
        "source": "Lucretius, De Rerum Natura, Book I, trans. William Ellery Leonard (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/785/785-h/785-h.htm"
      },
      {
        "category": "literary",
        "title": "Milton on books as the living blood of the mind",
        "excerpt": "For books are not absolutely dead things, but do contain a potency of life in them to be as active as that soul was whose progeny they are; nay, they do preserve as in a vial the purest efficacy and extraction of that living intellect that bred them. I know they are as lively, and as vigorously productive, as those fabulous dragon's teeth; and being sown up and down, may chance to spring up armed men. And yet, on the other hand, unless wariness be used, as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica (1644), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm"
      },
      {
        "category": "artistic",
        "title": "Mendelssohn revives Bach's St Matthew Passion from oblivion",
        "excerpt": "Bach's Passio Domini Nostri J.C. Secundum Evangelistam Matthaeum (St Matthew Passion), BWV 244, written in 1727, fell into near-total neglect after his death. In 1829 the twenty-year-old Felix Mendelssohn conducted a celebrated revival in Berlin, the first performance outside Leipzig in a century, lifting a buried masterwork back into living sound - much as virtual unrolling now lifts a charred scroll back into legible text.",
        "source": "Johann Sebastian Bach, Matthauspassion, BWV 244, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Matth%C3%A4uspassion,_BWV_244_(Bach,_Johann_Sebastian)"
      },
      {
        "category": "artistic",
        "title": "Bryullov paints the last day of Pompeii",
        "excerpt": "Karl Bryullov's vast canvas The Last Day of Pompeii (1830-1833) stages the AD 79 catastrophe that also buried Herculaneum: a lurid sky split by lightning over toppling statues, a crowd frozen between flight and devotion as Vesuvius rains fire. The painting made the eruption an icon of beauty and terror; the scroll just read end to end is the quiet survivor of the same disaster, its words returned after seventeen centuries.",
        "source": "Karl Bryullov, The Last Day of Pompeii (1830-1833), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/herculaneum-scroll-fully-read--art.png",
          "alt": "The Last Day of Pompeii by Karl Bryullov: panicked crowds beneath a fiery, lightning-torn sky as Vesuvius erupts.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "us-supreme-court-curbs-roundup-cancer-suits",
    "headline": "US Supreme Court curbs thousands of Roundup cancer lawsuits against Bayer",
    "overview": "The US Supreme Court ruled in favor of Bayer, holding that federal pesticide law can shield the company from many failure-to-warn claims over its Roundup weedkiller, threatening to block thousands of lawsuits by plaintiffs who say the herbicide caused their non-Hodgkin lymphoma. Bayer acquired Roundup maker Monsanto in 2018 and has faced tens of billions of dollars in potential liability.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxQdGVzRlNlZmZtMkxVa2xTd1ZJVzE5aXdOakpWa3BZaTJTZGlQVXFVNjl5NzRxYnlyNW9Tb0VvRGZtY3hVcldPbzZndk5YZ3ZCcWRnS2NZX3RSMl8xZFRlenU5RjRMSDF4UEhxMmR4WEJ3WTdkaVM5NUJxZlFVVlFzZ2ctcEZTSEp3Vm16TmhGREtPU0Fq?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/politics/supreme-court-ruling-blocks-thousands-of-lawsuits-against-maker-of-roundup-weedkiller"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/us-supreme-court-curbs-roundup-cancer-suits.png",
      "alt": "Rows of green crops under a heavy sky, evoking the weedkiller at the center of a Supreme Court ruling.",
      "credit": "Wikimedia Commons"
    },
    "rank": 15,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Radium Girls and U.S. Radium Corporation (1925-1928)",
        "excerpt": "Young women hired to paint glowing watch dials were told the radium paint was harmless and instructed to point their brushes between their lips, even as the company's own chemists handled the same material behind lead screens and tongs. When the dial painters began to sicken and die, five of them sued U.S. Radium in New Jersey; their 1928 settlement became a landmark in the long fight to hold manufacturers liable for failing to warn workers of a known poison.",
        "source": "Library of Congress, Headlines & Heroes blog",
        "href": "https://blogs.loc.gov/headlinesandheroes/2019/03/radium-girls-living-dead-women/"
      },
      {
        "category": "historical",
        "title": "The 1948 Donora Smog Disaster",
        "excerpt": "In October 1948, fluoride and sulfur-dioxide emissions from U.S. Steel's zinc works settled over the Pennsylvania mill town of Donora during a temperature inversion, killing twenty people and sickening nearly half the population. The catastrophe forced the first large U.S. epidemiological investigation of an industrial poisoning and helped drive the federal clean-air laws that followed, illustrating how corporate emissions and weak regulation can become a public-health reckoning.",
        "source": "American Journal of Public Health (via PubMed Central)",
        "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5922205/"
      },
      {
        "category": "literary",
        "title": "An Enemy of the People, by Henrik Ibsen (1882)",
        "excerpt": "Dr. Stockmann. The whole Bath establishment is a whited, poisoned sepulchre, I tell you—the gravest possible danger to the public health! All the nastiness up at Molledal, all that stinking filth, is infecting the water in the conduit-pipes leading to the reservoir; and the same cursed, filthy poison oozes out on the shore too—",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/2446"
      },
      {
        "category": "literary",
        "title": "The Jungle, by Upton Sinclair (1906)",
        "excerpt": "The people of Chicago saw the government inspectors in Packingtown, and they all took that to mean that they were protected from diseased meat; they did not understand that these hundred and sixty-three inspectors had been appointed at the request of the packers, and that they were paid by the United States government to certify that all the diseased meat was kept in the state.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/140"
      },
      {
        "category": "artistic",
        "title": "Fidelio, Op. 72, by Ludwig van Beethoven (1805-1814)",
        "excerpt": "Beethoven's only opera turns on a prisoner unjustly buried in the dungeons of a corrupt official, Don Pizarro, who would silence the truth to protect himself. Leonore's fearless rescue and the final chorus of liberation make the work an enduring hymn to justice forced upon power that would rather conceal its wrongs, a fitting counterpoint to plaintiffs fighting for their day in court.",
        "source": "IMSLP (International Music Score Library Project)",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "The Harvesters, by Pieter Bruegel the Elder (1565)",
        "excerpt": "Bruegel's golden wheat field, with laborers resting at the edge of an abundant harvest, is one of Western art's great images of the cultivated land and the people who depend upon it. Set against a modern case over a weedkiller blamed for cancer, the painting reads as a quiet meditation on the bond between human health and the fields we treat to feed ourselves.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/us-supreme-court-curbs-roundup-cancer-suits--art.png",
          "alt": "The Harvesters, a 1565 oil painting by Pieter Bruegel the Elder showing peasants harvesting wheat in a golden summer field.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "europe-heatwave-shifts-east",
    "headline": "France raises heat alert to its highest level as a record heatwave spreads across Europe",
    "overview": "France raised its heat-health alert to the highest level as a punishing heatwave pushed temperatures toward 40C and shifted eastward across Europe, with Germany among the countries bracing for extreme heat. French officials said the heat was linked to deaths, including among young people, as authorities urged precautions.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cwy0pdq89zno"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/24/power-outage-in-france-as-europe-bakes-in-record-heat"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/europe-heatwave-shifts-east.png",
      "alt": "A sun-scorched European city shimmering in extreme heat as a record heatwave spreads across the continent.",
      "credit": "Wikimedia Commons"
    },
    "rank": 16,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 2003 European heatwave",
        "excerpt": "The August 2003 heatwave was one of the deadliest natural disasters in modern European history, with tens of thousands of excess deaths concentrated in France, where overwhelmed hospitals and morgues and a vulnerable elderly population turned record temperatures into a public-health catastrophe. France's national heat-record indicator from that summer stood for years until being surpassed in the June 2026 event, underscoring how a once-exceptional disaster is now being eclipsed.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/2003_European_heatwave"
      },
      {
        "category": "historical",
        "title": "The Dust Bowl, 1930s",
        "excerpt": "Through the 1930s, severe drought and relentless heat scorched the American Great Plains, killing crops and livestock and stripping the topsoil into towering dust storms that darkened the sky. The disaster drove hundreds of thousands of families off their parched land, a lasting reminder of how prolonged extreme heat and dryness can hollow out a society's foundations.",
        "source": "Library of Congress",
        "href": "https://www.loc.gov/classroom-materials/dust-bowl/"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book II (the fall of Phaethon)",
        "excerpt": "Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust— the forests and the mountains are destroyed.",
        "source": "Perseus Digital Library (Tufts), Brookes More translation",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2"
      },
      {
        "category": "literary",
        "title": "Coleridge, The Rime of the Ancient Mariner",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon. // Day after day, day after day, / We stuck, nor breath nor motion, / As idle as a painted ship / Upon a painted ocean.",
        "source": "Wikisource (Sibylline Leaves, 1817)",
        "href": "https://en.wikisource.org/wiki/Sibylline_Leaves_(Coleridge)/The_Rime_of_the_Ancient_Mariner"
      },
      {
        "category": "artistic",
        "title": "Vivaldi, \"Summer\" (L'estate), The Four Seasons, RV 315",
        "excerpt": "Vivaldi's 1723 violin concerto translates a blistering summer into sound: its opening movement is marked \"Languidezza per il caldo\" (languor from the heat), depicting humans and animals wilting under an oppressive sun, before the finale, \"Tempo impetuoso d'estate,\" erupts into a violent summer storm. It is among the earliest works of program music to render extreme heat as a physical, almost menacing force.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Violin_Concerto_in_G_minor,_RV_315_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Harvesters (1565)",
        "excerpt": "Bruegel's late-summer panorama shows laborers cutting and gathering wheat beneath a hazy, heat-laden sky, while exhausted figures collapse in the meager shade of a tree. The sun-bleached golden fields and the toll the heat takes on the workers make it one of the most vivid early depictions of high summer's punishing warmth.",
        "source": "Wikimedia Commons / Metropolitan Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/europe-heatwave-shifts-east--art.png",
          "alt": "Pieter Bruegel the Elder, The Harvesters (1565): peasants cutting golden wheat under a hazy summer sky",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "ibm-sub-nanometer-chip",
    "headline": "IBM unveils chip technology with features smaller than one nanometer",
    "overview": "IBM said it demonstrated the world's first chip technology with features below one nanometer, using a vertically stacked \"block of flats\" transistor design to pack more computing power into the same space. The company framed it as a step toward more powerful, efficient processors for artificial intelligence, while cautioning that commercial production remains years away.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNeXRoRXR0MWRpYVVHXzBQY21WWXRiczFaVm9jaDJVdW1hQ0lYQWRVLURRQU45UHBldVdoQklvZVRKUE1DTENTZzA1bUhtQWI5SEVmaWlaTDhHSzd3czRsT1JocnRlOXMxclRUbXo0ZS1yMXNyaDhPUEdIMWVJZjVkQkFSX3NuZ3NKcDFGTTBKdW1oeU1ZZ0p0WkdPUDQ5eXJWSmZOcldCakpUWkN5T0E?oc=5"
      },
      {
        "name": "MIT Technology Review",
        "href": "https://www.technologyreview.com/2026/06/25/1139696/ibm-unveils-sub1nm-chip/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/ibm-sub-nanometer-chip.png",
      "alt": "A silicon wafer patterned with microchips, representing IBM's sub-one-nanometer transistor breakthrough.",
      "credit": "MIT Technology Review"
    },
    "rank": 17,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The first transistor at Bell Labs (December 1947)",
        "excerpt": "On December 16, 1947, John Bardeen and Walter Brattain built the first semiconductor amplifier by pressing two closely spaced gold contacts onto a slab of high-purity germanium, finding that the voltage on one contact could modulate the current through the other and amplify a signal up to a hundredfold. They demonstrated the device to Bell Labs officials on December 23, an event William Shockley called \"a magnificent Christmas present.\" That single point-contact device began the entire lineage of solid-state electronics that IBM now extends down past one nanometer.",
        "source": "Computer History Museum, The Silicon Engine",
        "href": "https://www.computerhistory.org/siliconengine/invention-of-the-point-contact-transistor/"
      },
      {
        "category": "historical",
        "title": "Gutenberg's movable type and the 42-line Bible (c. 1455)",
        "excerpt": "The Gutenberg Bible, also known as the 42-line Bible or B42, is the earliest major book printed in Europe using mass-produced metal movable type. Preparation probably began soon after 1450, and the first finished copies were available in 1454 or 1455 in Mainz. By casting reusable metal type at a precision far finer than any scribe and combining it with a new oil-based ink, Gutenberg packed far more information into a reproducible form, a leap in density and replication that prefigures the relentless miniaturization of the chip.",
        "source": "UNESCO Memory of the World",
        "href": "https://www.unesco.org/en/memory-world/42-line-gutenberg-bible-printed-vellum-and-its-contemporary-documentary-background"
      },
      {
        "category": "literary",
        "title": "William Blake, \"Auguries of Innocence\"",
        "excerpt": "To see a World in a Grain of Sand\nAnd a Heaven in a Wild Flower\nHold Infinity in the palm of your hand\nAnd Eternity in an hour",
        "source": "Wikisource (The Pickering Manuscript)",
        "href": "https://en.wikisource.org/wiki/The_Pickering_Manuscript/Auguries_of_Innocence"
      },
      {
        "category": "literary",
        "title": "Jonathan Swift, Gulliver's Travels — A Voyage to Lilliput",
        "excerpt": "I felt something alive moving on my left leg, which advancing gently forward over my breast, came almost up to my chin; when, bending my eyes downwards as much as I could, I perceived it to be a human creature not six inches high, with a bow and arrow in his hands, and a quiver at his back.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/829/829-h/829-h.htm"
      },
      {
        "category": "artistic",
        "title": "J. S. Bach, Die Kunst der Fuge (The Art of Fugue), BWV 1080",
        "excerpt": "Left incomplete and published posthumously in 1751, The Art of Fugue is a cycle of fugues and canons in D minor that all elaborate a single principal subject, generally ordered to increase in complexity. Bach stacks voice upon voice, layering inversions, augmentations, and canons into an ever denser contrapuntal structure built from one theme, an architecture of precision that echoes IBM stacking transistors into a vertical block to pack more capability into the same space.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Kunst_der_Fuge,_BWV_1080_(Bach,_Johann_Sebastian)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
        "excerpt": "Bruegel's vast 1563 panel depicts a colossal spiraling tower climbing tier upon tier into the clouds, an ambitious human structure built ever upward to reach beyond its limits. Its stacked, receding stories make it a fitting visual counterpart to IBM's \"block of flats\" transistor, which similarly piles layer on layer to gain ground in a finite footprint, even as the painting hints at the hubris and fragility of such towering ambition.",
        "source": "Wikimedia Commons (Kunsthistorisches Museum, Vienna)",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ibm-sub-nanometer-chip--art.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting The Tower of Babel, a massive spiraling tower rising into the clouds",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "apple-raises-mac-ipad-prices",
    "headline": "Apple raises MacBook and iPad prices as memory chip costs surge",
    "overview": "Apple increased the prices of several MacBook and iPad models, blaming a sharp rise in the cost of memory chips that has rippled across the electronics industry. The move makes Apple one of the most prominent consumer brands to pass soaring component costs on to buyers.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQbXhvZDBfVzdFNGpzU0JyTC11YWFqMHE4THNGLUhlcGN6R0JxMUdKNmR2dWpuSUZLXzJuUU9qc19oQ3BFR256dVJaRFJ4dUxYcGNDUmozNjZ2RVpTd0U1YV80bTVLSEdPUGVWQXVVcnRrZ0xZaHZqUVJ2Wjd5aE1qQmJxR0k0ZmpJanB0bkl5cnRCQ1VMdXpLcVByYkw0SDZGRnpBZXJNOHQ5MU4xSWY2aThn?oc=5"
      },
      {
        "name": "The Globe and Mail",
        "href": "https://www.theglobeandmail.com/business/international-business/us-business/article-apple-raises-macbook-ipad-prices-memory-shortage-costs/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/apple-raises-mac-ipad-prices.png",
      "alt": "An Apple laptop and tablet on a clean surface, illustrating Apple's price increases driven by memory chip costs.",
      "credit": "The Globe and Mail"
    },
    "rank": 18,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 1973 Oil Embargo and the Price Shock",
        "excerpt": "When OAPEC imposed its 1973 embargo, the price of oil per barrel first doubled, then quadrupled, destabilizing economies worldwide. The sudden scarcity of a single critical input imposed severe hardship on consumers and exposed how dependence on a constrained commodity can ripple across an entire economy.",
        "source": "U.S. Department of State, Office of the Historian",
        "href": "https://history.state.gov/milestones/1969-1976/oil-embargo"
      },
      {
        "category": "historical",
        "title": "Tulip Mania and the Volatility of Scarce Goods",
        "excerpt": "In the Dutch Republic of the 1630s, contract prices for rare tulip bulbs soared to extraordinary heights before collapsing, an episode long cited as a parable of how demand for a scarce commodity can outrun any sensible measure of value. The frenzy showed how quickly the cost of a coveted good can detach from its underlying worth when supply is limited and buyers compete.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/event/Tulip-Mania"
      },
      {
        "category": "literary",
        "title": "Adam Smith, The Wealth of Nations (1776)",
        "excerpt": "When the quantity of any commodity which is brought to market falls short of the effectual demand, all those who are willing to pay the whole value of the rent, wages, and profit, which must be paid in order to bring it thither, cannot be supplied with the quantity which they want. Rather than want it altogether, some of them will be willing to give more. A competition will immediately begin among them, and the market price will rise more or less above the natural price, according as either the greatness of the deficiency, or the wealth and wanton luxury of the competitors, happens to animate more or less the eagerness of the competition.",
        "source": "Project Gutenberg / Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Wealth_of_Nations/Book_I/Chapter_7"
      },
      {
        "category": "literary",
        "title": "Charles Dickens, Hard Times (1854)",
        "excerpt": "Thomas Gradgrind, sir—peremptorily Thomas—Thomas Gradgrind. With a rule and a pair of scales, and the multiplication table always in his pocket, sir, ready to weigh and measure any parcel of human nature, and tell you exactly what it comes to.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold (1854)",
        "excerpt": "Wagner's opera opens with gold stolen from the Rhine and forged into a ring that promises mastery over the world. Its drama turns on how the lust to possess a scarce and precious substance corrupts gods and dwarves alike, a mythic meditation on greed, value, and the price exacted by coveted treasure.",
        "source": "IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys, The Moneylender and His Wife (1514)",
        "excerpt": "Matsys depicts a moneylender weighing gold coins on a delicate balance while his wife pauses over a devotional book, her attention drifting to the glinting metal. The painting is an enduring study of value, commerce, and the pull of money over everyday life—the same weighing of worth that surfaces whenever the cost of a coveted good climbs.",
        "source": "Wikimedia Commons (Louvre)",
        "href": "https://commons.wikimedia.org/wiki/File:Quentin_Massys_001.jpg",
        "image": {
          "src": "/covers/apple-raises-mac-ipad-prices--art.png",
          "alt": "The Moneylender and His Wife (1514) by Quentin Matsys, a man weighing gold coins as his wife looks on",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "us-pce-inflation-4-1-may",
    "headline": "US inflation rises to 4.1% in May, keeping a Federal Reserve rate increase in play",
    "overview": "The Federal Reserve's preferred inflation gauge, the personal consumption expenditures price index, rose 4.1% in May from a year earlier, a faster pace that keeps the door open to another interest-rate increase. The reading complicates the central bank's path as it weighs stubborn price pressures against signs of a cooling economy.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQTkttQ2dqWE53WS1XUWNlT0FUb2pERERFc2pkTEFDSV9tU3JUaWk3aEs5SjAxMnd3amRlZG12N0gtcFN5My1Bb0JkR3BzSGMwSHJzNE1JX2hEMmRkNW1IbnpaRHNiUVEzMDBVaFphUlVjUS1hUDFtMW9pYjI0SmVIeTljUDFUTkRXdEMzdUxSM2hTXzlYUndiU084c05sY0w1dFNINFVxeldPNlhU?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/pce-report-report-may-2026-federal-reserve-inflation/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/us-pce-inflation-4-1-may.png",
      "alt": "The facade of the US Federal Reserve, evoking the central bank's response to rising inflation.",
      "credit": "Wikimedia Commons"
    },
    "rank": 19,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Diocletian's Edict on Maximum Prices (301 AD)",
        "excerpt": "He also, when by various extortions he had made all things exceedingly dear, attempted by an ordinance to limit their prices. Then much blood was shed for the veriest trifles; men were afraid to expose anything to sale, and the scarcity became more excessive and grievous than ever, until, in the end, the ordinance, after having proved destructive to multitudes, was from mere necessity abrogated.",
        "source": "Lactantius, Of the Manner in Which the Persecutors Died, ch. 7",
        "href": "https://www.newadvent.org/fathers/0705.htm"
      },
      {
        "category": "historical",
        "title": "The German hyperinflation of 1923",
        "excerpt": "In the autumn of 1923 Germany's paper mark collapsed almost completely, with prices doubling in days and the exchange rate against the dollar climbing into the trillions. Wages had to be spent within hours of being paid, and workers were sometimes paid twice a day so the money could be carried home before it lost its worth. The episode stands as the modern world's most vivid warning of how quickly confidence in a currency can evaporate when price increases run out of control.",
        "source": "Encyclopaedia Britannica, \"Hyperinflation\"",
        "href": "https://www.britannica.com/money/hyperinflation"
      },
      {
        "category": "literary",
        "title": "Silas Marner by George Eliot",
        "excerpt": "He handled them, he counted them, till their form and colour were like the satisfaction of a thirst to him; but it was only in the night, when his work was done, that he drew them out to enjoy their companionship.",
        "source": "George Eliot, Silas Marner (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/550/550-h/550-h.htm"
      },
      {
        "category": "literary",
        "title": "The Parable of the Talents (Matthew 25, KJV)",
        "excerpt": "Then he which had received the one talent came and said, Lord, I knew thee that thou art an hard man, reaping where thou hast not sown, and gathering where thou hast not strawed: And I was afraid, and went and hid thy talent in the earth: lo, there thou hast that is thine. His lord answered and said unto him, Thou wicked and slothful servant, thou knewest that I reap where I sowed not, and gather where I have not strawed: Thou oughtest therefore to have put my money to the exchangers, and then at my coming I should have received mine own with usury.",
        "source": "Bible (King James Version), Gospel of Matthew 25:24-27, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "artistic",
        "title": "Das Rheingold, WWV 86A by Richard Wagner",
        "excerpt": "In the prologue to Wagner's Ring cycle, the dwarf Alberich renounces love itself in order to seize the Rhine's gold and forge from it a ring of absolute power. The treasure brings only a curse, dragging gods and mortals toward ruin as greed corrodes every bond it touches. Wagner's score makes audible the seduction and peril of hoarded wealth that anchors the whole epic.",
        "source": "Richard Wagner, Das Rheingold (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "The Moneylender and His Wife by Quentin Matsys (1514)",
        "excerpt": "A moneylender weighs gold coins on a small balance while his wife, a devotional book open before her, turns her attention from her reading to the glittering pile of money. The Flemish master makes the convex mirror, the scales and the careful counting of coin into a meditation on the value of money and the pull of worldly wealth over the spirit. Painted in Antwerp in 1514, it is among the most enduring images of commerce and the lure of gold.",
        "source": "Quentin Matsys, The Moneylender and His Wife, Musee du Louvre (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Quentin_Massys_001.jpg",
        "image": {
          "src": "/covers/us-pce-inflation-4-1-may--art.png",
          "alt": "The Moneylender and His Wife (1514) by Quentin Matsys, a man weighing gold coins beside his wife",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "eu-cloud-gatekeeper-rules",
    "headline": "EU moves to put Amazon and Microsoft cloud divisions under Big Tech \"gatekeeper\" rules",
    "overview": "European Union regulators moved to bring the cloud-computing arms of Amazon and Microsoft under the bloc's Digital Markets Act, the strict \"gatekeeper\" regime that imposes obligations on dominant online platforms. The step would subject Amazon Web Services and Microsoft Azure to new requirements aimed at curbing their market power.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0wFBVV95cUxQR1BQRlVrQkliUkJJbW8xalpOR21kdkhzRG10cEh6cHZ6bkZ6WDk4WF9Ra1JuU1lva2MwR3VGLXNicWE4Y1lzaWRtbkFmeUtNUU40YkM0SUJTLU9BWVd6Q1FhOUtCSFI1MEdrbE8xVXpWT3h4cDhSa3E2aGFySUFJNVkxMHQ0TU9KQ1VIVUFuS29SQi0tbHZvYVVXdC1ldVRlV3Z2Q1ptdHVTb0lVdHJ5WXBqTHlZMldvcUFXUC1WRVlLWlc1OWhxTkpsZGRMMUtRQTU0?oc=5"
      },
      {
        "name": "European Commission",
        "href": "https://digital-strategy.ec.europa.eu/en/news/commission-reaches-preliminary-position-amazons-and-microsofts-market-leading-cloud-services-should"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/eu-cloud-gatekeeper-rules.png",
      "alt": "A vast data center server hall, representing EU rules targeting the cloud arms of Amazon and Microsoft.",
      "credit": "Wikimedia Commons"
    },
    "rank": 20,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Sherman Antitrust Act (1890)",
        "excerpt": "Every contract, combination in the form of trust or otherwise, or conspiracy, in restraint of trade or commerce among the several States, or with foreign nations, is hereby declared to be illegal. ... Every person who shall monopolize, or attempt to monopolize, or combine or conspire with any other person or persons, to monopolize any part of the trade or commerce among the several States, or with foreign nations, shall be deemed guilty of a misdemeanor.",
        "source": "U.S. National Archives, Milestone Documents",
        "href": "https://www.archives.gov/milestone-documents/sherman-anti-trust-act"
      },
      {
        "category": "historical",
        "title": "Standard Oil Co. of New Jersey v. United States (1911)",
        "excerpt": "In a landmark application of antitrust law, the U.S. Supreme Court found that John D. Rockefeller's Standard Oil had unlawfully monopolized the petroleum industry and ordered the colossus broken into dozens of independent companies. The ruling established the 'rule of reason,' holding that the law forbids combinations amounting to an unreasonable restraint of trade. It remains the archetype for using regulation to rein in a dominant firm whose scale alone tilts an entire market.",
        "source": "Justia U.S. Supreme Court Center, 221 U.S. 1 (1911)",
        "href": "https://supreme.justia.com/cases/federal/us/221/1/"
      },
      {
        "category": "literary",
        "title": "David and Goliath (1 Samuel 17, King James Version)",
        "excerpt": "And there went out a champion out of the camp of the Philistines, named Goliath, of Gath, whose height was six cubits and a span. ... And David put his hand in his bag, and took thence a stone, and slang it, and smote the Philistine in his forehead, that the stone sunk into his forehead; and he fell upon his face to the earth. So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "Wikisource, Bible (King James), 1 Samuel",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "Gulliver's Travels, Part II: A Voyage to Brobdingnag (Jonathan Swift)",
        "excerpt": "I was endeavoring to find some gap in the hedge, when I discovered one of the inhabitants in the next field, advancing towards the stile, of the same size with him whom I saw in the sea pursuing our boat. He appeared as tall as an ordinary spire steeple, and took about ten yards at every stride, as near as I could guess. I was struck with the utmost fear and astonishment, and ran to hide myself in the corn, from whence I saw him at the top of the stile, looking back into the next field on the right hand, and heard him call in a voice many degrees louder than a speaking trumpet.",
        "source": "Project Gutenberg (eBook #17157)",
        "href": "https://www.gutenberg.org/files/17157/17157-h/17157-h.htm"
      },
      {
        "category": "artistic",
        "title": "Saul, HWV 53 (George Frideric Handel, 1738)",
        "excerpt": "Handel's three-act oratorio dramatizes the rise of the shepherd David after his sling fells the giant Goliath, and the jealous King Saul's descent as the unlikely youth eclipses him. Built around an exultant Epinicion, or Song of Triumph, celebrating the victory over the Philistines, the score sets the toppling of a feared giant to grand choral and orchestral writing. It is a public-domain musical meditation on power, envy, and the upending of those who once seemed invincible.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Saul,_HWV_53_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Colossus (El coloso), attributed to Francisco Goya, c. 1808-1812",
        "excerpt": "A towering giant looms over a fleeing landscape, its sheer scale dwarfing the tiny figures and herds scattering in panic below. The painting captures the terror of an overwhelming, faceless power that dominates everything in its shadow, a fitting emblem for outsized market giants and the small players who must contend with them.",
        "source": "Museo del Prado / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:El_coloso.jpg",
        "image": {
          "src": "/covers/eu-cloud-gatekeeper-rules--art.png",
          "alt": "The Colossus, a painting of an immense giant rising over a fleeing landscape, attributed to Francisco Goya",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "china-supercomputer-fastest",
    "headline": "Chinese supercomputer ranked world's fastest, ending US lead since 2017",
    "overview": "A Chinese supercomputer has been ranked the world's fastest, displacing US machines from the top spot for the first time since 2017. The shift marks a milestone in the long-running US-China competition over high-performance computing, which underpins scientific research, defense and artificial intelligence.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNLXk4LTR0VFhXOVlfU0Vua19vbGIya0hEaWg2cGFHY2tnNC1wNXF4dU9iT05MV1RCY05kUUpkMHJUdVB6czRaNnIwQm9fLXU4dDIzWTZ6NHNNS3RmZkMyMUQzZG12RkpsajdQbmY2OGFjZ0wtTm1FX0txeWtPRFR2RDA5YVBEa1Q1THJpSkxrRkU2T0NxWjVDQlpIY2J5VThyd1Jzc2RhclpTSVRC?oc=5"
      },
      {
        "name": "TOP500",
        "href": "https://top500.org/news/lineshine-debuts-no-1-top500-enters-new-global-exascale-era/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/china-supercomputer-fastest.png",
      "alt": "Long rows of supercomputer cabinets, marking China's machine ranked the world's fastest.",
      "credit": "Wikimedia Commons"
    },
    "rank": 21,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sputnik 1 and the Origins of the Space Age (1957)",
        "excerpt": "The Soviet launch of the first artificial satellite stunned the United States and triggered the Space Race. As NASA historian Roger Launius writes, \"The only appropriate characterization that begins to capture the mood on 5 October involves the use of the word hysteria.\" The shock \"created an illusion of a technological gap and provided the impetus for increased spending for aerospace endeavors, technical and scientific educational programs, and the chartering of new federal agencies to manage air and space research and development.\"",
        "source": "NASA History Division — Roger D. Launius",
        "href": "https://www.nasa.gov/history/sputnik/sputorig.html"
      },
      {
        "category": "historical",
        "title": "ENIAC, the World's First General-Purpose Electronic Computer (1946)",
        "excerpt": "Unveiled at the University of Pennsylvania's Moore School in 1946, ENIAC was the world's first general-purpose, electronic, programmable computer, built from more than 17,000 vacuum tubes. Unlike earlier machines fixed to a single task, it could be reprogrammed to solve many different problems, establishing the electronic foundation on which all modern computing — and today's exascale supercomputing race — was built.",
        "source": "Penn Today, University of Pennsylvania",
        "href": "https://penntoday.upenn.edu/news/penns-eniac-worlds-first-electronic-computer-turns-80"
      },
      {
        "category": "literary",
        "title": "The Hare and the Tortoise (Aesop's Fables)",
        "excerpt": "A HARE one day ridiculed the short feet and slow pace of the Tortoise, who replied, laughing: \"Though you be swift as the wind, I will beat you in a race.\" The Hare, believing her assertion to be simply impossible, assented to the proposal; and they agreed that the Fox should choose the course and fix the goal. On the day appointed for the race the two started together. The Tortoise never for a moment stopped, but went on with a slow but steady pace straight to the end of the course. The Hare, lying down by the wayside, fell fast asleep. At last waking up, and moving as fast as he could, he saw the Tortoise had reached the goal, and was comfortably dozing after her fatigue.",
        "source": "Project Gutenberg — Aesop's Fables (Townsend translation)",
        "href": "https://www.gutenberg.org/files/21/21-h/21-h.htm"
      },
      {
        "category": "literary",
        "title": "Ada Lovelace, Notes on the Analytical Engine (1843)",
        "excerpt": "In her translator's notes — signed \"A. A. L.\" — Augusta Ada Lovelace foresaw the power of a general computing machine: \"The Analytical Engine weaves algebraical patterns just as the Jacquard-loom weaves flowers and leaves.\" Her distinction between the machine's operations and the data it processes anticipated modern computing by more than a century.",
        "source": "Wikisource — Sketch of the Analytical Engine, Notes by the Translator",
        "href": "https://en.wikisource.org/wiki/Scientific_Memoirs/3/Sketch_of_the_Analytical_Engine_invented_by_Charles_Babbage,_Esq./Notes_by_the_Translator"
      },
      {
        "category": "artistic",
        "title": "Triumphal March (Grand March), from Verdi's Aida, Act II (1871)",
        "excerpt": "Verdi's Grand March in Act II of Aida accompanies a victorious army returning home in triumph, its brassy fanfares the archetypal music of conquest and national pride. The score is in the public domain and freely available on IMSLP, a fitting soundtrack for a contest in which one power celebrates seizing a crown from another.",
        "source": "IMSLP / Petrucci Music Library — Aida (Verdi)",
        "href": "https://imslp.org/wiki/A%C3%AFda_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "The Tower of Babel by Pieter Bruegel the Elder (1563)",
        "excerpt": "Bruegel's vast unfinished tower spirals into the clouds, a monument to human ambition that overreaches its grasp — an enduring image of the drive to build ever higher and faster, and of the rivalries such ambition unleashes.",
        "source": "Wikimedia Commons (Kunsthistorisches Museum, Vienna)",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/china-supercomputer-fastest--art.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting The Tower of Babel, a towering spiral structure reaching into the clouds",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "eu-3-billion-ukraine-recovery-loan",
    "headline": "EU releases a 3-billion-euro recovery loan for Ukraine under a two-year commitment",
    "overview": "The European Union released a 3-billion-euro loan package for Ukraine's recovery, part of a two-year financial commitment to help the country rebuild and stabilize its economy as the war with Russia continues. The disbursement underscores continued European support for Kyiv.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxQSFpMQzRrVk1Vd29pWTZaRlFWQ0tzRkZPMmoweFFtMWJhS1o3d1ZBT0hfYjFuWURJVXZEOWdXQ3gzbVQzM3VYRFRiNUdNdHdYQWdaUG9rUlhpaHBqZTk4LUhRYWNqeHBTdDI0UFFoWlczWHRacUwzeW1vVnZsYnptWU9tRDV0NFJWQjc4cDFjSlJROTVn?oc=5"
      },
      {
        "name": "Euronews",
        "href": "https://www.euronews.com/my-europe/2026/06/25/von-der-leyen-announces-first-payment-to-ukraine-under-90-billion-loan"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/eu-3-billion-ukraine-recovery-loan.png",
      "alt": "European Union and Ukrainian flags side by side, representing a multibillion-euro EU recovery loan for Ukraine.",
      "credit": "Euronews"
    },
    "rank": 22,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Marshall Plan Speech (George C. Marshall, Harvard, 5 June 1947)",
        "excerpt": "The remedy seems to lie in breaking the vicious circle and restoring the confidence of the people of Europe in the economic future of their own countries and of Europe as a whole. ... Any assistance that this Government may render in the future should provide a cure rather than a mere palliative.",
        "source": "Wikisource (public domain)",
        "href": "https://en.wikisource.org/wiki/The_Marshall_Plan_Speech"
      },
      {
        "category": "historical",
        "title": "Roosevelt's 'Arsenal of Democracy' Fireside Chat and the Lend-Lease Act (1941)",
        "excerpt": "In December 1940 Franklin Roosevelt urged that the United States become the great arsenal of democracy, equipping nations fighting for their liberty with the implements of war. The Lend-Lease Act of March 1941 then empowered the president to lend or lease arms and supplies to any country whose defense was deemed vital, channeling some fifty billion dollars in aid to allies at war.",
        "source": "U.S. National Archives, Milestone Documents",
        "href": "https://www.archives.gov/milestone-documents/lend-lease-act"
      },
      {
        "category": "literary",
        "title": "The Book of Nehemiah (King James Version) — Rebuilding the Walls of Jerusalem",
        "excerpt": "Then said I unto them, Ye see the distress that we are in, how Jerusalem lieth waste, and the gates thereof are burned with fire: come, and let us build up the wall of Jerusalem, that we be no more a reproach. ... So built we the wall; and all the wall was joined together unto the half thereof: for the people had a mind to work.",
        "source": "Wikisource, Bible (King James) (public domain)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Nehemiah"
      },
      {
        "category": "literary",
        "title": "Virgil, The Aeneid, Book I (trans. John Dryden) — Founding a New City After Troy's Fall",
        "excerpt": "Arms, and the man I sing, who, forc'd by fate, / And haughty Juno's unrelenting hate, / Expell'd and exil'd, left the Trojan shore.",
        "source": "Project Gutenberg (public domain)",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "Beethoven, Symphony No. 9 in D minor, Op. 125 ('Ode to Joy', the European anthem)",
        "excerpt": "Beethoven's choral finale sets Schiller's 'Ode to Joy' as a hymn to universal brotherhood, the melody adopted as the anthem of the European Union. Composed amid the composer's deafness, it transforms struggle into communal exultation, a fitting emblem of shared resolve and renewal.",
        "source": "IMSLP / Petrucci Music Library (public domain)",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, Imaginary View of the Grande Galerie in the Louvre in Ruins (1796)",
        "excerpt": "Robert imagines the Louvre's grand gallery fallen into picturesque ruin, sunlight pouring through a collapsed vault while figures sketch and gather amid the rubble. The painting's contemplation of ruin and the persistence of human activity within it speaks to the cycle of destruction and rebuilding.",
        "source": "Wikimedia Commons (Louvre Museum, public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Hubert_Robert_-_Imaginary_View_of_the_Grande_Galerie_in_the_Louvre_in_Ruins_-_WGA19589.jpg",
        "image": {
          "src": "/covers/eu-3-billion-ukraine-recovery-loan--art.png",
          "alt": "Hubert Robert's 1796 painting of the Louvre's Grande Galerie imagined in ruins",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "france-seizes-russian-shadow-fleet-tanker",
    "headline": "France seizes a Russian \"shadow fleet\" tanker, escalating pressure on Moscow",
    "overview": "French authorities seized a tanker linked to Russia's so-called shadow fleet, the network of aging vessels used to evade Western sanctions on Russian oil exports. The seizure marks an escalation in European efforts to choke off the revenue funding Russia's war in Ukraine.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxNaHVlcXpzR21OZGhuQXR3YUFIdFVuakxCbEhVUzJvaktGRHhFbnBmSlUxaGNyM3kzTGV2SGpQRlFnazdGNWItalVwelIyQUM2QWZFLVF5NDd3TUpfOHJfY1V1TDhkTUNCRnpuZmVFYWZPa2NDenAwRGQ5MGh1dFNDWGR4M2FxRUk0Vk41NnVIdjk3TzlQYU5ucmtKdDhrLVJxUExEcFVJWlpfOERuOWVtNmtLUWlpOVlQ?oc=5"
      },
      {
        "name": "France 24",
        "href": "https://www.france24.com/en/france/20260601-france-and-allies-intercept-sanctioned-russian-oil-tanker-in-atlantic"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/france-seizes-russian-shadow-fleet-tanker.png",
      "alt": "A large oil tanker at sea under a grey sky, evoking France's seizure of a Russian shadow-fleet vessel.",
      "credit": "Wikimedia Commons"
    },
    "rank": 23,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pompey clears the sea of pirates (Plutarch, Life of Pompey)",
        "excerpt": "he divided the waters and the adjacent coasts of the Mediterranean Sea into thirteen districts, and assigned to each a certain number of ships with a commander, and with his forces thus scattered in all quarters he encompassed whole fleets of piratical ships that fell in his way, and straight-way hunted them down and brought them into port",
        "source": "Plutarch, Life of Pompey 26 (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:abo:tlg,0007,045:26"
      },
      {
        "category": "historical",
        "title": "Napoleon's Continental System: the Berlin Decree (1806)",
        "excerpt": "The British islands are declared in a state of blockade. All commerce and correspondence with the British islands are prohibited. In consequence, letters or packets, addressed either to England, to an Englishman, or in the English language, shall not pass through the post-office and shall be seized.",
        "source": "Berlin Decree of Napoleon I, 1806 (Teaching American History primary document)",
        "href": "https://teachingamericanhistory.org/document/berlin-decree/"
      },
      {
        "category": "literary",
        "title": "Jim Hawkins seizes the Hispaniola (Treasure Island)",
        "excerpt": "And, again dodging the boom, I ran to the colour lines, handed down their cursed black flag, and chucked it overboard. ... In three minutes I had the Hispaniola sailing easily before the wind along the coast of Treasure Island, with good hopes of turning the northern point ere noon, and beating down again as far as North Inlet before high water, when we might beach her safely and wait till the subsiding tide permitted us to land.",
        "source": "Robert Louis Stevenson, Treasure Island (1883), Chapter 25 'I Strike the Jolly Roger' (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Treasure_Island_(1883)/Chapter_25"
      },
      {
        "category": "literary",
        "title": "The pirate menace before Pompey (Plutarch, Life of Pompey)",
        "excerpt": "The ships of the pirates numbered more than a thousand, and the cities captured by them four hundred. They attacked and plundered places of refuge and sanctuaries hitherto inviolate, such as those of Claros, Didyma, and Samothrace; the temple of Chthonian Earth at Hermione; that of Asclepius in Epidaurus; those of Poseidon at the Isthmus, at Taenarum, and at Calauria; those of Apollo at Actium and Leucas; and those of Hera at Samos, at Argos, and at Lacinium.",
        "source": "Plutarch, Life of Pompey 24 (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:abo:tlg,0007,045:24"
      },
      {
        "category": "artistic",
        "title": "Wagner, Overture to Der fliegende Holländer (The Flying Dutchman), WWV 63",
        "excerpt": "Wagner's overture (composed 1840-41) conjures a raging North Sea storm, with churning strings and brass evoking a cursed ghost ship doomed to roam the waves. It is among the most vivid musical portraits of a vessel at the mercy of wind, sea, and fate, an apt echo of a tanker run to ground in the Atlantic.",
        "source": "Richard Wagner, Der fliegende Holländer, WWV 63 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Der_fliegende_Holl%C3%A4nder,_WWV_63_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Fighting Temeraire (1839)",
        "excerpt": "Turner's painting shows the once-mighty warship Temeraire, a veteran of Trafalgar, being towed by a small steam tug to be broken up, a ghostly old vessel hauled to its end against a blazing sunset. It is a meditation on a ship reaching the close of its working life, much like the aging hulls of the shadow fleet.",
        "source": "J. M. W. Turner, The Fighting Temeraire (1839), National Gallery, London (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg",
        "image": {
          "src": "/covers/france-seizes-russian-shadow-fleet-tanker--art.png",
          "alt": "J. M. W. Turner's 1839 painting The Fighting Temeraire, an old warship towed by a steam tug at sunset.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "merck-kgaa-buys-bio-techne",
    "headline": "Germany's Merck to buy US life-sciences firm Bio-Techne for about $11 billion",
    "overview": "Germany's Merck KGaA agreed to acquire US life-sciences company Bio-Techne in a deal valued at roughly $11 billion, expanding its tools-and-reagents business for biotech and pharmaceutical research. It is one of the largest acquisitions in the life-sciences supply sector this year.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOcWNaOGNZamhRcU9HZTBZWHcxSjN3WFNFcVhBNVNmeE1uYW5DRFJNcVpFQy1GZDZLS1ZfQmRmeUVJVjg3ZWtqVldBOFRuWE1sVEtwRjJ4WVFIYzhSQjJHTVNOM1JndmhmNUF3OFdXVkhtS1NaWUkyMk1zMjZTYlFJbjQ4WURocHdPN3d5NHM5eHhveEFlQjlaeHBKYWNmbXd0TS00UWF0OXVNbnZRMmtKQ3RtXzI?oc=5"
      },
      {
        "name": "Merck KGaA press release (via PR Newswire)",
        "href": "https://www.prnewswire.com/news-releases/merck-kgaa-darmstadt-germany-agrees-to-acquire-bio-techne-strengthening-leadership-position-in-fast-growing-life-sciences-markets-302810602.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/merck-kgaa-buys-bio-techne.png",
      "alt": "A laboratory bench with pipettes and sample vials, representing Merck's acquisition of life-sciences firm Bio-Techne.",
      "credit": "Wikimedia Commons"
    },
    "rank": 24,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Standard Oil Trust Agreement (1882)",
        "excerpt": "All of the property, real and personal, assets and business of each and all of the corporations and limited partnerships mentioned or embraced in class first, shall be transferred to and vested in the said several Standard Oil companies.",
        "source": "Standard Oil Trust Agreement of 1882, reprinted in Ida M. Tarbell, The History of the Standard Oil Company (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_History_of_the_Standard_Oil_Company/Volume_2/Appendix/Number_52"
      },
      {
        "category": "historical",
        "title": "Ida M. Tarbell, The History of the Standard Oil Company",
        "excerpt": "Tarbell's landmark account traces how a single firm grew into a colossus by absorbing rivals and folding their assets into one controlling structure, building an empire one acquisition at a time. Her chronicle remains the classic study of consolidation as a strategy for industrial dominance, a pattern echoed whenever a large company expands by buying up the suppliers and tools of an entire sector.",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/60692"
      },
      {
        "category": "literary",
        "title": "Robert Hooke, Micrographia (1665) — Preface",
        "excerpt": "By the means of Telescopes, there is nothing so far distant but may be represented to our view; and by the help of Microscopes, there is nothing so small, as to escape our inquiry; hence there is a new visible World discovered to the understanding.",
        "source": "Robert Hooke, Micrographia, Preface (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/15491"
      },
      {
        "category": "literary",
        "title": "Goethe, Faust — Faust's study monologue",
        "excerpt": "I've studied now Philosophy / And Jurisprudence, Medicine,— / And even, alas! Theology,— / From end to end, with labor keen; / And here, poor fool! with all my lore / I stand, no wiser than before... That I may detect the inmost force / Which binds the world, and guides its course; / Its germs, productive powers explore.",
        "source": "Johann Wolfgang von Goethe, Faust, trans. Bayard Taylor (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/14591"
      },
      {
        "category": "artistic",
        "title": "J. S. Bach, Die Kunst der Fuge (The Art of Fugue), BWV 1080",
        "excerpt": "Bach's final contrapuntal cycle takes a single musical subject and builds upon it voice by voice, fugue after fugue, each movement growing in complexity until many independent lines combine into one vast, unified structure. It is a study in how separate parts, joined under a common theme, can compound into something far greater than any one of them alone.",
        "source": "Die Kunst der Fuge, BWV 1080 (Bach, Johann Sebastian) — IMSLP",
        "href": "https://imslp.org/wiki/Die_Kunst_der_Fuge,_BWV_1080_(Bach,_Johann_Sebastian)"
      },
      {
        "category": "artistic",
        "title": "Joseph Wright of Derby, The Alchemist Discovering Phosphorus (1771)",
        "excerpt": "In a darkened laboratory crowded with glass vessels, an alchemist kneels before a flask of glowing phosphorus, his quest for transformation suddenly illuminating the night. Wright's painting captures the moment scientific tools and patient experiment yield discovery — the very enterprise of reagents, instruments and research that a life-sciences acquisition is built to serve.",
        "source": "Joseph Wright of Derby, The Alchemist Discovering Phosphorus (Wikimedia Commons file page)",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Wright_of_Derby_The_Alchemist.jpg",
        "image": {
          "src": "/covers/merck-kgaa-buys-bio-techne--art.png",
          "alt": "An alchemist kneels amid glassware in a dark vaulted chamber, lit by a flask of glowing phosphorus.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "pharrell-louis-vuitton-tidal-wave",
    "headline": "Pharrell Williams stages Louis Vuitton menswear show around a 37-metre water-powered wave in Paris",
    "overview": "Louis Vuitton creative director Pharrell Williams unveiled the house's Spring/Summer 2027 menswear collection in Paris on a set built around a 37-metre-wide wave structure powered by cascading water. The spectacle, staged during Paris Fashion Week, continued the brand's run of elaborate runway scenography.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/25/jumbo-tidal-wave-louis-vuitton-menswear-show/"
      },
      {
        "name": "Wallpaper*",
        "href": "https://www.wallpaper.com/fashion-beauty/louis-vuitton-ss-2027-set-pharrell-williams"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/pharrell-louis-vuitton-tidal-wave.png",
      "alt": "A towering wave structure cascading with water as the backdrop of a Louis Vuitton fashion show in Paris.",
      "credit": "AI-generated"
    },
    "rank": 25,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Suetonius records Augustus flooding Rome for a mock naval battle",
        "excerpt": "He entertained the people with wrestlers in the Campus Martius, where wooden seats were erected for the purpose; and also with a naval fight, for which he excavated the ground near the Tiber, where there is now the grove of the Caesars.",
        "source": "Suetonius, Life of Augustus 43 (Perseus Digital Library)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0132%3Alife%3Daug.%3Achapter%3D43"
      },
      {
        "category": "historical",
        "title": "Cassius Dio on the staged sea battle of Persians and Athenians",
        "excerpt": "a naval battle between the 'Persians' and the 'Athenians' was given on the spot where even to-day some relics of it are still pointed out. These were the spectacles, and the 'Athenians' prevailed as of old.",
        "source": "Cassius Dio, Roman History, Book 55 (LacusCurtius / University of Chicago)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/55*.html"
      },
      {
        "category": "literary",
        "title": "Byron's apostrophe to the ocean in Childe Harold's Pilgrimage",
        "excerpt": "Roll on, thou deep and dark blue Ocean--roll!\nTen thousand fleets sweep over thee in vain;\nMan marks the earth with ruin--his control\nStops with the shore;--upon the watery plain\nThe wrecks are all thy deed, nor doth remain\nA shadow of man's ravage, save his own,\nWhen for a moment, like a drop of rain,\nHe sinks into thy depths with bubbling groan,\nWithout a grave, unknelled, uncoffined, and unknown.",
        "source": "Lord Byron, Childe Harold's Pilgrimage, Canto IV, stanza CLXXIX (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/5131/pg5131.txt"
      },
      {
        "category": "literary",
        "title": "Tennyson's 'Break, break, break' on the restless sea",
        "excerpt": "Break, break, break,\n    On thy cold gray stones, O Sea!\nAnd I would that my tongue could utter\n    The thoughts that arise in me.\n\nO well for the fisherman's boy,\n    That he shouts with his sister at play!\nO well for the sailor lad,\n    That he sings in his boat on the bay!\n\nAnd the stately ships go on\n    To their haven under the hill;\nBut O for the touch of a vanish'd hand,\n    And the sound of a voice that is still!\n\nBreak, break, break,\n    At the foot of thy crags, O Sea!\nBut the tender grace of a day that is dead\n    Will never come back to me.",
        "source": "Alfred Tennyson, 'Break, break, break', Poems (1843) Vol. 2 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Poems_(Tennyson,_1843)/Volume_2/Break,_break,_break"
      },
      {
        "category": "artistic",
        "title": "Debussy's 'La Mer', the sea rendered as orchestral motion",
        "excerpt": "Debussy's three symphonic sketches translate the ocean into sound, moving from the slow brightening of 'From dawn to noon on the sea' through the glittering, broken rhythms of 'Play of the waves' to the surging climax of 'Dialogue of the wind and the sea'. The score conjures water as something alive and shifting, swelling and collapsing rather than fixed, a fitting echo of a cascading wall of water built as runway spectacle.",
        "source": "Claude Debussy, La mer, CD 111 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/La_mer,_CD_111_(Debussy,_Claude)"
      },
      {
        "category": "artistic",
        "title": "Hokusai's 'The Great Wave off Kanagawa'",
        "excerpt": "Hokusai's woodblock print frames a single towering wave, its clawed crest of foam reared above tiny boats while Mount Fuji sits small and serene in the distance. Made around 1831 for the series Thirty-six Views of Mount Fuji, it has become the defining image of the wave in world art, the obvious visual ancestor of any monumental wave staged for spectacle.",
        "source": "Katsushika Hokusai, The Great Wave off Kanagawa, c. 1831 (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/pharrell-louis-vuitton-tidal-wave--art.png",
          "alt": "Katsushika Hokusai's woodblock print The Great Wave off Kanagawa, a towering foam-crested wave above boats with Mount Fuji behind",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "artist-accused-copying-basquiat",
    "headline": "Australian artist accused of copying Jean-Michel Basquiat in prizewinning paintings",
    "overview": "Australian artist Jane Allan is facing allegations that she closely imitated the work of American neo-expressionist Jean-Michel Basquiat and the late artist Nicholas Harding in two paintings that won prizes. The claims have reignited debate over originality, influence and appropriation in contemporary art.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/prizewinning-artist-accused-of-copying-jean-michel-basquiat-1234753259/"
      },
      {
        "name": "The Canberra Times",
        "href": "https://www.canberratimes.com.au/story/9298021/jane-allan-painting-faces-gallery-probe-after-art-copy-claims/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/artist-accused-copying-basquiat.png",
      "alt": "An artist's studio with paintings and brushes, evoking a dispute over originality and imitation in contemporary art.",
      "credit": "Artforum"
    },
    "rank": 26,
    "edition": "Evening Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Han van Meegeren, the forger who fooled the experts with fake Vermeers",
        "excerpt": "Dismissed by critics as derivative, the Dutch painter Han van Meegeren set out to prove his genius by forging Dutch Old Masters. His 1937 The Supper at Emmaus was hailed as a lost Vermeer masterpiece and bought for a fortune. Only at his 1947 trial, when an expert commission found 20th-century synthetic resin in the paint, was the deception exposed, turning a question of authenticity into a national sensation.",
        "source": "Wikipedia (Han van Meegeren)",
        "href": "https://en.wikipedia.org/wiki/Han_van_Meegeren"
      },
      {
        "category": "historical",
        "title": "Michelangelo's forged 'sleeping Cupid', artfully aged to pass as antique",
        "excerpt": "Around 1496 the young Michelangelo carved a marble sleeping Cupid and buried it in acidic earth to give it the look of a buried antique so it would fetch a higher price. It was sold as a genuine ancient relic to Cardinal Raffaello Riario, who demanded his money back on discovering the deception, yet was so struck by the artist's skill that he became one of Michelangelo's first patrons, an early case of imitation prized until its true, modern hand was revealed.",
        "source": "The Museum of Hoaxes",
        "href": "https://hoaxes.org/archive/permalink/michelangelos_cupid"
      },
      {
        "category": "literary",
        "title": "Seneca: imitation as bees gathering nectar to make a new honey",
        "excerpt": "We also, I say, ought to copy these bees, and sift whatever we have gathered from a varied course of reading, for such things are better preserved if they are kept separate; then, by applying the supervising care with which our nature has endowed us,—in other words, our natural gifts,—we should so blend those several flavours into one delicious compound that, even though it betrays its origin, yet it nevertheless is clearly a different thing from that whence it came.",
        "source": "Seneca, Moral Letters to Lucilius, Letter 84 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_84"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde on art, the artist, and the mirror of Caliban",
        "excerpt": "The artist is the creator of beautiful things. To reveal art and conceal the artist is art's aim. ... The nineteenth century dislike of realism is the rage of Caliban seeing his own face in a glass. The nineteenth century dislike of romanticism is the rage of Caliban not seeing his own face in a glass. ... All art is at once surface and symbol. Those who go beneath the surface do so at their peril.",
        "source": "Oscar Wilde, Preface to The Picture of Dorian Gray (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/174/pg174.txt"
      },
      {
        "category": "artistic",
        "title": "Brahms, Variations on a Theme by Haydn, borrowing turned to invention",
        "excerpt": "Brahms took a theme he believed was Haydn's, the so-called St. Anthony Chorale, and spun it into eight variations and a grand passacaglia finale (Op. 56, 1873). The work is a celebrated demonstration that borrowing another's material can be the seed of wholly original art, the very line that separates homage from copying now disputed in Jane Allan's case.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Variations_on_a_Theme_by_Haydn,_Op.56_(Brahms,_Johannes)"
      },
      {
        "category": "artistic",
        "title": "Vermeer's Girl with a Pearl Earring, an anchor for the question of authenticity",
        "excerpt": "Johannes Vermeer's luminous tronie became the touchstone of authenticity that forgers like Han van Meegeren tried to counterfeit. Its singular, unrepeatable hand stands as a measure against which imitation is judged, a fitting emblem for a debate over whether a prizewinning painting is influence or copy.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Meisje_met_de_parel.jpg",
        "image": {
          "src": "/covers/artist-accused-copying-basquiat--art.png",
          "alt": "Johannes Vermeer, Girl with a Pearl Earring, c. 1665, oil on canvas.",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "colombia-de-la-espriella-wins-runoff",
    "headline": "Far-right lawyer Abelardo de la Espriella wins Colombia's presidential runoff by a razor-thin margin",
    "overview": "Right-wing lawyer Abelardo de la Espriella, a Trump-endorsed outsider known as “El Tigre,” narrowly won Colombia's presidential runoff with 49.7 percent of the vote to leftist senator Iván Cepeda's 48.7 percent. The result, decided by about one percentage point, hands the presidency to a combative populist and deepens the country's political divide. President Trump congratulated him on social media.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxNZHhSUnh5OTJITFRKQ0FNTEZPOFM5ZTlKdmNiY2hMN3F3WUN2S3ZCT0JpWGc2SW9WQ3JUWUs0T2poOHBUMTVmaU9Ec3pSa01aWTVxdDlodXUxWFZwYUlMUUh3VElBa1FEenhfQmxTQTdOQkhCZk9BaGZXUl85YVZ1MDJDX2gwR1JzNmxtS1BPeWlXcXE5WDFTbF9CQ2pFOTZSaFI3S1UtX0UyRURnbFFkLTlRUnI?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/06/21/americas/colombia-trump-abelardo-de-la-espriella-intl-latam"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/colombia-de-la-espriella-wins-runoff.png",
      "alt": "A dim polling station at night as officials count paper ballots under a hanging lamp during a tightly contested election.",
      "credit": "AI-generated"
    },
    "rank": 27,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Eighteenth Brumaire of Louis Bonaparte",
        "excerpt": "Hegel remarks somewhere that all great world-historic facts and personages appear, so to speak, twice. He forgot to add: the first time as tragedy, the second time as farce.",
        "source": "Marxists Internet Archive",
        "href": "https://www.marxists.org/archive/marx/works/1852/18th-brumaire/ch01.htm"
      },
      {
        "category": "historical",
        "title": "Act Creating an Electoral Commission, January 29, 1877",
        "excerpt": "decide whether any and what votes from such State are the votes provided for by the Constitution",
        "source": "The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/19th_century/elect01.asp"
      },
      {
        "category": "literary",
        "title": "Plato, Republic, Book VIII",
        "excerpt": "This and no other is the root from which a tyrant springs; when he first appears above ground he is a protector.",
        "source": "The Internet Classics Archive",
        "href": "https://classics.mit.edu/Plato/republic.9.viii.html"
      },
      {
        "category": "literary",
        "title": "Aristophanes, The Knights",
        "excerpt": "The demagogues will neither have an educated nor an honest man; they require an ignoramus and a rogue.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/8688/pg8688.txt"
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Boris Godunov (Coronation Scene)",
        "excerpt": "Mussorgsky's opera opens on a fearful, divided people herded to acclaim a new ruler whose power was seized over a buried rival. The Coronation bells peal in triumph, yet Boris steps forward already haunted, knowing the throne rests on blood and that the realm he inherits is a land of troubles split against itself.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "George Caleb Bingham, The County Election",
        "excerpt": "Bingham paints democracy at its raw and partisan edge: a crowd of citizens jostles before the polling steps, electioneers ply voters with drink and persuasion, and the contest's outcome hangs on the swayable will of an ordinary, deeply divided crowd.",
        "source": "Saint Louis Art Museum",
        "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_County_Election.jpg",
        "image": {
          "src": "/covers/colombia-de-la-espriella-wins-runoff--art.png",
          "alt": "George Caleb Bingham's painting The County Election, showing a crowd of citizens gathered at a polling place as candidates and electioneers court voters",
          "credit": "Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "japan-iwate-earthquake",
    "headline": "Magnitude 7.2 earthquake strikes off northern Japan; no tsunami warning issued",
    "overview": "A magnitude 7.2 earthquake struck off the coast of Iwate in northern Japan on Thursday morning, injuring about ten people and briefly halting the Tohoku Shinkansen line. Japan's Meteorological Agency issued no tsunami warning, and nuclear facilities including the Fukushima Daiichi plant reported no abnormalities.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMijAFBVV95cUxONk9vbDNHSXF5NUU2MGh1eFBaZzJnRktPMUNjZGtObFl2azNGemw4Ym14NW1RMlZaRXRSLU5ZdDk0VFJGNE9EemxiQ2RKdkFVZTJnOGdoTWlzVWpVa25leEV5WXl4bDlPY2VqdUhodU9YanktSnRubzh6SG8xWlhRUVhFWDl3UU85ckVQWg?oc=5"
      },
      {
        "name": "The Japan Times",
        "href": "https://www.japantimes.co.jp/news/2026/06/25/japan/tohoku-strong-earthquake/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/japan-iwate-earthquake.png",
      "alt": "A quiet Japanese coastal town at dawn seen from a hillside, the calm grey sea beyond a harbour.",
      "credit": "AI-generated"
    },
    "rank": 28,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nihongi (Chronicles of Japan), Book XXIX: the great earthquake of A.D. 684",
        "excerpt": "At the hour of the boar (10 p.m.) there was a great earthquake. Throughout the country men and women shrieked aloud, and knew not East from West. Mountains fell down and rivers gushed forth; the official buildings of the provinces and districts, the barns and houses of the common people, the temples, pagodas and shrines were destroyed in numbers which surpass all estimate. In consequence many of the people and of domestic animals were killed or injured. The hot springs of Iyo were dried up at this time and ceased to flow. In the province of Tosa more than 500,000 shiro of cultivated land were swallowed up and became sea.",
        "source": "Nihongi: Chronicles of Japan from the Earliest Times to A.D. 697, trans. W. G. Aston (1896), Book XXIX (reign of Emperor Temmu)",
        "href": "https://en.wikisource.org/wiki/Nihongi/Book_XXIX"
      },
      {
        "category": "historical",
        "title": "Rev. Charles Davy, eyewitness account of the 1755 Lisbon earthquake",
        "excerpt": "Being instantly stunned with a most horrid crash, as if every edifice in the city had tumbled down at once.",
        "source": "Rev. Charles Davy, \"The Earthquake at Lisbon, 1755,\" in Letters Addressed to a Young Gentleman upon Subjects of Literature (1787); Internet History Sourcebook, Fordham University",
        "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp"
      },
      {
        "category": "literary",
        "title": "Voltaire, Candide, Chapter V: the earthquake at Lisbon",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, Candide (1759), Chapter V; Project Gutenberg",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "literary",
        "title": "Lafcadio Hearn, \"A Living God\" (Gleanings in Buddha-Fields)",
        "excerpt": "It seemed to be moving against the wind. It was running away from the land.",
        "source": "Lafcadio Hearn, Gleanings in Buddha-Fields: Studies of Hand and Soul in the Far East (1897), \"A Living God\"; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/55681/pg55681-images.html"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, \"Il Terremoto\" (The Earthquake), finale of The Seven Last Words of Christ",
        "excerpt": "Haydn closes his 1786 orchestral meditation with a single shattering movement marked Presto e con tutta la forza. After the long stillness of the Cross, the strings convulse in the work's only fortississimo, depicting the earth that quaked and the rocks that rent at the moment of death. It is music as seismic shock: the ground itself rising up in violence after a held, fragile peace.",
        "source": "Joseph Haydn, Die Worte des Erlösers am Kreuze (The Seven Last Words of Christ), Hob.XX:1 (1786), Mvt. \"Il Terremoto\"; IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Worte_des_Erl%C3%B6sers_am_Kreuze,_Hob.XX:1_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Katsushika Hokusai, \"Under the Wave off Kanagawa\" (The Great Wave)",
        "excerpt": "In Hokusai's woodblock print from the early 1830s, a towering wave curls its clawed crest over three slender boats while a small, snow-capped Mount Fuji sits unmoved in the distance. The sea is rendered as a living, indifferent force, dwarfing the fishermen who cling to their hulls. It is the enduring image of Japan's life atop the fault line: human craft suspended in the instant before nature's overwhelming power.",
        "source": "Katsushika Hokusai, Under the Wave off Kanagawa (Kanagawa oki nami ura), from Thirty-Six Views of Mount Fuji, c. 1830–32; The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/60013238",
        "image": {
          "src": "/covers/japan-iwate-earthquake--art.png",
          "alt": "A giant cresting wave with foam like claws towers over small boats, with Mount Fuji small in the distance",
          "credit": "Katsushika Hokusai, Under the Wave off Kanagawa (The Great Wave), c. 1830–32, The Metropolitan Museum of Art (accession JP1847); via Wikimedia Commons, public domain"
        }
      }
    ]
  },
  {
    "slug": "super-puff-planets-discovered",
    "headline": "Astronomers discover the largest “super-puff” planets yet, lighter than cotton candy",
    "overview": "Astronomers have found a pair of Jupiter-sized exoplanets so diffuse that they are less dense than cotton candy, orbiting a star about 1,110 light-years away. Likely composed mostly of hydrogen and helium, they are the lightest planets of their size yet discovered; one researcher likened their density to “a nice blob of shaving foam.” Follow-up observations with the Webb telescope may confirm their makeup.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxQNTVmM3N0S2tqR2RvNmd4MGg1NzBKaXQxOUpIMWxSa3ByZmdRaHlPMGNnLTNhOHpxVUtZZ0cxaUlRRy01Q285TEIwSlNJVlE5LU5OWU1VTGlOQXpHVE1Tcmc5OEJDZzd1MTU2NVVJRkVsRG5QOFh5ZzBabXdDWUd4UnM4Ny1zTFAzTEVxR1hIQ3ZPdXFkMzVONlpQSVhXTXRkbDN6ampjdw?oc=5"
      },
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/health/2026/06/24/super-puffs-cotton-candy-giant-light-planets/171f3766-7032-11f1-8730-e7fd0e2a6404_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/super-puff-planets-discovered.png",
      "alt": "Artist's impression of a super-puff exoplanet, a giant low-density world, against a field of stars.",
      "credit": "Pablo Carlos Budassi / Wikimedia Commons"
    },
    "rank": 29,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Galileo, The Sidereal Messenger (Sidereus Nuncius, 1610)",
        "excerpt": "By the aid of a telescope any one may behold this in a manner which so distinctly appeals to the senses that all the disputes which have tormented philosophers through so many ages are exploded at once by the irrefragable evidence of our eyes. The Galaxy is nothing else but a mass of innumerable stars planted together in clusters. Upon whatever part of it you direct the telescope straightway a vast crowd of stars presents itself to view.",
        "source": "Galileo Galilei, The Sidereal Messenger, trans. Edward Stafford Carlos (1880), via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/46036/46036-h/46036-h.htm"
      },
      {
        "category": "historical",
        "title": "Camille Flammarion, Astronomy for Amateurs",
        "excerpt": "According to all the probabilities, universal life is distributed there as well as here, and has sown the germ of intelligence upon those distant worlds that we divine in the vicinity of the innumerable suns that plow the ether, for everything upon the Earth tends to show that Life is the goal of Nature.",
        "source": "Camille Flammarion, Astronomy for Amateurs, trans. Frances A. Welby, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/25267/25267-h/25267-h.htm"
      },
      {
        "category": "literary",
        "title": "Lucretius, On the Nature of Things, Book II",
        "excerpt": "'Tmust be confessed in other realms there are / Still other worlds, still other breeds of men, / And other generations of the wild. / Hence too it happens in the sum there is / No one thing single of its kind in birth, / And single and sole in growth.",
        "source": "Lucretius, De Rerum Natura, Book II, trans. William Ellery Leonard (1916), via Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0131:book=2:card=1048"
      },
      {
        "category": "literary",
        "title": "Cyrano de Bergerac, A Voyage to the Moon",
        "excerpt": "I believe, that the Moon is a World like ours, to which this of ours serves likewise for a Moon. And perhaps, (Gentlemen) just so they laugh now in the Moon, at some who maintain, That this Globe, where we are, is a World.",
        "source": "Cyrano de Bergerac, A Voyage to the Moon, trans. A. Lovell, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/46547/46547-h/46547-h.htm"
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, The Planets, Op. 32 (1914-1916) - Jupiter, the Bringer of Jollity",
        "excerpt": "Holst's seven-movement orchestral suite gives each planet a character and a sound, conjuring whole worlds out of orchestral color. Jupiter swells into broad, buoyant jollity while Neptune, the Mystic dissolves into a wordless offstage chorus that seems to drift weightlessly into deep space, an apt music for planets lighter than cotton candy.",
        "source": "Gustav Holst, The Planets, Op. 32, full scores and parts via IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, The Starry Night (1889)",
        "excerpt": "Painted from the window of his asylum room at Saint-Remy, Van Gogh turned the night sky into churning rivers of light, the stars swelling into luminous haloes and the heavens rendered as something fluid and alive rather than fixed and solid. The cosmos here is all motion and diffuse glow, a vision of celestial matter so airy it seems to swirl like foam.",
        "source": "Vincent van Gogh, The Starry Night (1889), Museum of Modern Art, New York; image via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/super-puff-planets-discovered--art.png",
          "alt": "Vincent van Gogh's The Starry Night (1889): a swirling, luminous night sky with glowing stars and a crescent moon over a sleeping village and a dark cypress tree.",
          "credit": "Vincent van Gogh, The Starry Night (1889), Museum of Modern Art, New York. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "carone-adams-bribery-charges",
    "headline": "Former chief of staff to ex-NYC mayor Eric Adams charged in federal bribery scheme",
    "overview": "Frank Carone, the former chief of staff to ex-New York Mayor Eric Adams, was arrested and charged in a federal bribery case in Brooklyn. Prosecutors allege he accepted about $120,000 in bribes to steer a multimillion-dollar emergency migrant-shelter hotel contract; three others were also charged. Adams himself was not accused of wrongdoing.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxNd05pNklWOUpaeUQxYnpybGMtYUdyYkE4SUJ2UEc4eS1pT0hxTTJGRjNQTEctR2R0ZjFDcXNIaE5KSTVvSWstRDN6MjdRLTAxcHZNN09ON3FXSWxBbjlvZVlnWm5LZl9JS2h3Z0VzeUxxcDZaQ3BESTlXcV9uQVBoejBuQTNjUXpxUjdCbURNNGxsY09NT25HRjVpR1lCTkpI?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://www.nbcnews.com/news/us-news/eric-adams-adviser-frank-carone-arrested-fbi-alleged-bribery-scheme-so-rcna351533"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/carone-adams-bribery-charges.png",
      "alt": "An empty marble courthouse corridor at dusk, tall columns and a polished floor lit by a shaft of cold light.",
      "credit": "AI-generated"
    },
    "rank": 30,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero, The First Oration Against Verres (70 BC)",
        "excerpt": "For an opinion has now become established, pernicious to us, and pernicious to the republic, which has been the common talk of every one, not only at Rome, but among foreign nations also,—that in the courts of law as they exist at present, no wealthy man, however guilty he may be, can possibly be convicted.",
        "source": "Cicero, In Verrem, First Pleading, trans. C. D. Yonge (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0018:text=Ver.:actio=1"
      },
      {
        "category": "historical",
        "title": "Thomas Nast, \"Who Stole the People's Money? — 'Twas Him\" (Harper's Weekly, 1871)",
        "excerpt": "At the height of the Tweed Ring's plunder of New York's treasury, Nast drew the Tammany insiders in a ring, each pointing the finger at the man beside him. The cartoon made the machine's graft legible to voters who could not read the indictments, and helped bring down a city government built on padded contracts and kickbacks.",
        "source": "Thomas Nast, Harper's Weekly, August 19, 1871 (Library of Congress copy, via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Two_great_questions._%22Who_is_Ingersoll%27s_Co.%3F_-_%22Who_stole_the_people%27s_money%3F_-_Th._Nast._LCCN2006685392.jpg"
      },
      {
        "category": "literary",
        "title": "Dante, Inferno, Canto XXI — the barrators boiled in pitch",
        "excerpt": "As in the Arsenal of the Venetians / Boils in the winter the tenacious pitch / To smear their unsound vessels o'er again, / For sail they cannot; and instead thereof / One makes his vessel new, and one recaulks / The ribs of that which many a voyage has made.",
        "source": "Dante Alighieri, Inferno, Canto XXI, trans. Henry Wadsworth Longfellow (1867), Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_21"
      },
      {
        "category": "literary",
        "title": "Gogol, The Inspector-General (1836)",
        "excerpt": "AMMOS (the Judge): \"I tell everyone plainly that I take bribes. I make no bones about it. But what kind of bribes? White greyhound puppies. That's quite a different matter.\"",
        "source": "Nikolai Gogol, The Inspector-General, trans. Thomas Seltzer (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/3735/3735-h/3735-h.htm"
      },
      {
        "category": "artistic",
        "title": "John Gay, The Beggar's Opera (1728) — Peachum's opening air",
        "excerpt": "Through all the Employments of Life / Each Neighbour abuses his Brother; / Whore and Rogue they call Husband and Wife: / All Professions be-rogue one another: / The Priest calls the Lawyer a Cheat, / The Lawyer be-knaves the Divine: / And the Statesman, because he's so great, / Thinks his Trade as honest as mine.",
        "source": "John Gay, The Beggar's Opera, Air I (Peachum), music arr. J. C. Pepusch (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2421/pg2421.html"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, Canvassing for Votes (1754–1755)",
        "excerpt": "In the second scene of Hogarth's election series, rival party agents crowd around a country innkeeper, each pressing money and favors into his hands to buy his vote. The painting turns the everyday transaction of bribery into a stage on which the whole machinery of corrupt influence — the cash, the flattery, the broker in the middle — is laid bare.",
        "source": "William Hogarth, Canvassing for Votes (Humours of an Election, plate 2), Sir John Soane's Museum, London",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_032.jpg",
        "image": {
          "src": "/covers/carone-adams-bribery-charges--art.png",
          "alt": "William Hogarth's painting Canvassing for Votes, showing party agents bribing a country innkeeper for his vote outside an inn.",
          "credit": "William Hogarth, Canvassing for Votes (1754–1755), Sir John Soane's Museum, London. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "anduril-nissan-plant-drones",
    "headline": "US defense firm Anduril in talks to turn a Nissan car plant in Japan into a drone factory",
    "overview": "The American defense company Anduril is in talks to acquire Nissan's Oppama plant near Tokyo — the birthplace of the Leaf electric car — to manufacture military drones, sources told Reuters. The move comes as Japan expands defense production amid concern that a Taiwan crisis could draw it into war, and would convert a postwar symbol of peaceful industry into an arms works.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxNdHM1ajZmSGx3RkRERFNvczBoaGU3cEVucUVHZk1ON2lwUml3N3FuNzJCalg3VEloRE5hVjlhTEkzbmxRZkhyOVhzTXMwdFZsYzhUMFJoZlhkNkJkaldkZm9hbmQzNXpzZWxpNkNJZjBERTFXTkpGbWlyYUNuckFJX0kwNlhaLVNybkVqY010aW5kb2hJYm5yRjNwdWk4TUpBYzVvQ3VQVm95eVpnRm9lbmZwdEt3UlRSMFNCaHVKRkNNdEFlZFpj?oc=5"
      },
      {
        "name": "Investing.com",
        "href": "https://www.investing.com/news/stock-market-news/exclusiveus-defence-firm-anduril-in-talks-for-nissan-plant-to-build-drones-in-japan-sources-say-4759729"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/anduril-nissan-plant-drones.png",
      "alt": "The vast empty floor of a shuttered automobile assembly hall with idle robotic arms beneath skylights.",
      "credit": "AI-generated"
    },
    "rank": 31,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Franklin D. Roosevelt, \"Arsenal of Democracy\" Fireside Chat (Dec. 29, 1940)",
        "excerpt": "Manufacturers of watches, of farm implements, of linotypes and cash registers, of automobiles and sewing machines and lawn mowers and locomotives, are now making fuses and bomb packing crates and telescope mounts and shells and pistols and tanks. ... We must be the great arsenal of democracy.",
        "source": "Franklin D. Roosevelt, Fireside Chat (radio address), December 29, 1940 — The American Presidency Project (UC Santa Barbara)",
        "href": "https://www.presidency.ucsb.edu/documents/fireside-chat-9"
      },
      {
        "category": "historical",
        "title": "The Willow Run Bomber Plant: a carmaker turned to war (Ford, Michigan, 1942)",
        "excerpt": "Production. Willow Run bomber plant. Spot welding parts for the nacelle of an aircraft engine. These women work in the largest one-story building in the works, the giant bomber plant at Willow Run, Michigan. Ford plant, Willow Run.",
        "source": "U.S. Office of War Information photograph, 1942 — Library of Congress, FSA/OWI Collection (public domain)",
        "href": "https://www.loc.gov/item/2017693349/"
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book XVIII — Vulcan kindles his forge to arm Achilles (Pope translation)",
        "excerpt": "Soon as he bade them blow, the bellows turned\nTheir iron mouths, and, where the furnace burned,\nResounding breathed: at once the blast expires,\nAnd twenty forges catch at once the fires;\nJust as the god directs, now loud, now low,\nThey raise a tempest, or they gently blow.",
        "source": "Homer, The Iliad of Homer, trans. Alexander Pope, Book 18 — Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_18"
      },
      {
        "category": "literary",
        "title": "Virgil, The Aeneid, Book VIII — the Cyclops at Vulcan's forge hammer out arms (Dryden translation)",
        "excerpt": "Sacred to Vulcan's name, an isle there lay,\nBetwixt Sicilia's coasts and Lipare,\nRais'd high on smoking rocks; and, deep below,\nIn hollow caves the fires of Aetna glow.\nThe Cyclops here their heavy hammers deal;\nLoud strokes, and hissings of tormented steel,\nAre heard around; the boiling waters roar,\nAnd smoky flames thro' fuming tunnels soar.",
        "source": "Virgil, The Aeneid, trans. John Dryden, Book VIII — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez, \"Apollo in the Forge of Vulcan\" (1630)",
        "excerpt": "Velázquez catches the instant peace is interrupted by news of war: radiant Apollo steps into the smoke-blackened smithy where Vulcan and his half-naked workmen are beating armor on the anvil. Tools, glowing iron, and a half-finished breastplate fill the dim workshop, and the laborers freeze mid-stroke, their honest industry abruptly bent to the making of weapons. The everyday forge becomes, in a heartbeat, a manufactory of arms.",
        "source": "Diego Velázquez, La fragua de Vulcano (The Forge of Vulcan), oil on canvas, 1630 — Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/anduril-nissan-plant-drones--art.png",
          "alt": "Velázquez's painting of Apollo arriving at Vulcan's forge, where smiths pause from hammering armor on an anvil amid glowing fire and tools.",
          "credit": "Diego Velázquez, The Forge of Vulcan (1630), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Franz Schubert, 3 Marches militaires, D. 733 (No. 1 in D major)",
        "excerpt": "Schubert's crisp, strutting Marche militaire turns the cadence of the parade ground into music: a brisk dotted rhythm drives forward with the unstoppable confidence of marshaled ranks. Once a domestic piece for piano four hands, it has marched into a thousand arrangements for full military band, the sound of a peaceful drawing room reshaped into the swagger of an army on the move.",
        "source": "Franz Schubert, 3 Marches militaires, D. 733 (composed c. 1818) — full scores at IMSLP / Petrucci Music Library (public domain)",
        "href": "https://imslp.org/wiki/3_Marches_militaires,_D.733_(Schubert,_Franz)"
      }
    ]
  },
  {
    "slug": "iraq-weighs-opec-exit",
    "headline": "Iraq, a founding OPEC member, weighs leaving the cartel unless its oil quota is raised",
    "overview": "Iraq, one of OPEC's five founding members and its second-largest producer, has weighed leaving the group unless its production quota is sharply increased, sources told Reuters. A financial crisis deepened by the Iran war is pushing Baghdad to seek to pump far more oil. The United Arab Emirates already quit the cartel earlier this year.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxQNGtxVmo4OG9QRVAyTjJvcGpWUVFzWlJaZEhHSHBsazFQRWZxZXllakNTM2FXN2FxZjhialVFN0o1aW1DY2t1Q2JucHZRNlkzRHk4MFpCeGdOaHpEUXhRVVZSWEtGRDhfTGVKX3lyX1dqZ2tmYjg3QmtTWXMwVS1vNXlTVDRQeFVzakd3WXVuaGplbWdqY0JQUzhtcV9HSWRvSU1CUlp3aW5nYmdZbHNLeDJ2Tk5mZVhHLXh6S3AyZVFZS1ktWUg4X0J3?oc=5"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2648527/middle-east"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/iraq-weighs-opec-exit.png",
      "alt": "A lone oil derrick and storage tanks silhouetted against a hazy desert sunset, a single road leading away.",
      "credit": "AI-generated"
    },
    "rank": 32,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Mytilene revolts from the Delian League (428 BC)",
        "excerpt": "So it was more for fear than love that we remained their confederates; and whereas in others good will assureth loyalty, in us it was the effect of fear.",
        "source": "Thucydides, History of the Peloponnesian War, Book 3.12 (Crawley/Hobbes translation)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0247:book%3D3:chapter%3D12"
      },
      {
        "category": "historical",
        "title": "South Carolina dissolves the Union (1860)",
        "excerpt": "We, therefore, the People of South Carolina, by our delegates in Convention assembled, ... have solemnly declared that the Union heretofore existing between this State and the other States of North America, is dissolved, and that the State of South Carolina has resumed her position among the nations of the world, as a separate and independent State.",
        "source": "Declaration of the Immediate Causes Which Induce and Justify the Secession of South Carolina (1860), Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/19th_century/csa_scarsec.asp"
      },
      {
        "category": "literary",
        "title": "Achilles withdraws from the alliance over his share of the spoils",
        "excerpt": "Now I will go back to Phthia, since it is far better to return home with my beaked ships, nor do I intend while I am here dishonoured to pile up riches and wealth for you.",
        "source": "Homer, Iliad, Book 1 (A. T. Murray translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book%3D1:card%3D148"
      },
      {
        "category": "literary",
        "title": "Esau sells his birthright (Genesis 25)",
        "excerpt": "And Jacob said, Sell me this day thy birthright. And Esau said, Behold, I am at the point to die: and what profit shall this birthright do to me? And Jacob said, Swear to me this day; and he sware unto him: and he sold his birthright unto Jacob.",
        "source": "Genesis 25:31-33, King James Bible, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis/Chapter_25"
      },
      {
        "category": "artistic",
        "title": "Wagner, Götterdämmerung — the broken oaths and the curse of the gold",
        "excerpt": "The final music-drama of the Ring closes the cycle in which a hoard of gold, seized and cursed, binds gods and mortals to oaths they cannot keep. Treaties of self-interest fracture, blood-brotherhood is betrayed, and the order founded on the treasure consumes itself in flame. The collective built on the gold cannot survive each party's pursuit of it.",
        "source": "Richard Wagner, Götterdämmerung, WWV 86D (full score), IMSLP",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Konstantin Bogaevsky, Baku Oil Fields (1930)",
        "excerpt": "A forest of wooden derricks crowds the oil-soaked littoral, the industrial landscape stretching to the horizon under a heavy sky. The painting renders petroleum as the very ground a state stands on — the lifeblood that fortunes and conflicts are pumped from.",
        "source": "Konstantin Bogaevsky, Baku Oil Fields (1930), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:%D0%9A.%D0%92._%D0%91%D0%BE%D0%B3%D0%B0%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9._%D0%91%D0%B0%D0%BA%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B5_%D0%BD%D0%B5%D1%84%D1%82%D1%8F%D0%BD%D1%8B%D0%B5_%D0%BF%D1%80%D0%BE%D0%BC%D1%8B%D1%81%D0%BB%D1%8B._1930.jpg",
        "image": {
          "src": "/covers/iraq-weighs-opec-exit--art.png",
          "alt": "Konstantin Bogaevsky's 1930 painting of the Baku oil fields, a dense landscape of derricks along the Caspian shore",
          "credit": "Konstantin Bogaevsky, Baku Oil Fields (1930), public domain, via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "south-africa-world-cup-knockouts",
    "headline": "South Africa beats South Korea 1-0 to reach the World Cup knockout stage for the first time",
    "overview": "South Africa's Bafana Bafana defeated South Korea 1-0 on a 63rd-minute goal by Thapelo Maseko to reach the World Cup knockout rounds for the first time in the nation's history. The victory carries them out of the group stage and into a meeting with co-hosts Canada.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNMWVQYXowNWpLdmVlNEtnOXdUdC03YkNPNGJqclpiZzYwR3JCaUhSZVNQekdyTTFxUXQzNmlERFJMaGZZQWtGdzJORTctLVNtaTBQS2VGQmNaM2p2a04xNFhXZjJFdjl2Q3B1c3FlRjMzTmw5WFhEN012STRMNnRZdl9GRFN1dHkzN0NRMG96UVdwQVB0V2V1TEFaMDI2Zl9MZ0Z6VFM0eng5WGlfQnprdWt0Q3V0SkpNWEVJMlJB?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/sports/2026/6/25/south-africa-stun-south-korea-to-reach-world-cup-knockouts-for-the-first-time"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/south-africa-world-cup-knockouts.png",
      "alt": "An empty floodlit football stadium at night, the pitch a brilliant green, a lone ball at the centre circle.",
      "credit": "AI-generated"
    },
    "rank": 33,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pausanias on the first Olympic race and its olive crown",
        "excerpt": "Heracles, being the eldest, matched his brothers, as a game, in a running-race, and crowned the winner with a branch of wild olive, of which they had such a copious supply that they slept on heaps of its leaves while still green.",
        "source": "Pausanias, Description of Greece 5.7.7, trans. W. H. S. Jones (Loeb)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0160:book=5:chapter=7"
      },
      {
        "category": "historical",
        "title": "South Africa's 1995 Rugby World Cup triumph",
        "excerpt": "On 24 June 1995, on home soil at Ellis Park, the Springboks beat New Zealand 15-12 after Joel Stransky's extra-time drop goal. Nelson Mandela, in a green Springbok jersey, handed the trophy to captain Francois Pienaar, turning a sporting victory into the emblem of a newborn rainbow nation. Three decades on, Bafana Bafana's first World Cup knockout berth echoes that same fusion of contest and national becoming.",
        "source": "1995 Rugby World Cup final, Johannesburg",
        "href": "https://en.wikipedia.org/wiki/1995_Rugby_World_Cup_final"
      },
      {
        "category": "literary",
        "title": "Pindar crowns the Olympic victor in song",
        "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth. ... The fame of Pelops shines from afar in the races of the Olympic festivals, where there are contests for swiftness of foot, and the bold heights of toiling strength.",
        "source": "Pindar, Olympian 1, trans. Diane Arnson Svarlien",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1"
      },
      {
        "category": "literary",
        "title": "The footrace at the funeral games of Patroclus",
        "excerpt": "Ranged in a line the ready racers stand; / Pelides points the barrier with his hand: / All start at once; Oileus led the race; / The next Ulysses, measuring pace with pace.",
        "source": "Homer, Iliad, Book XXIII, trans. Alexander Pope",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_23"
      },
      {
        "category": "artistic",
        "title": "Handel, 'See, the conqu'ring hero comes' (Judas Maccabaeus)",
        "excerpt": "Handel's chorus rises in a slow march of voices, then full-voiced acclaim, as a people welcomes home its champion. Trumpets and drums answer the choir in waves of public rejoicing. The music sounds exactly like a stadium finding its anthem after a long-awaited win.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63, No. 35 (1747)",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Runners on a Panathenaic prize amphora",
        "excerpt": "On this black-figure amphora by the Berlin Painter, lean athletes surge forward in a frozen sprint, elbows back and legs at full stretch. The vase itself was a victor's prize, the body of an ancient footrace immortalized on the trophy it once decorated.",
        "source": "Panathenaic amphora with runners, Berlin Painter, c. 490-480 BC, Altes Museum, Berlin",
        "href": "https://commons.wikimedia.org/wiki/File:Runners._Black_figures_panathenaic_amphora._Berlin_Painter._Altes_Museum,_Berlin.JPG",
        "image": {
          "src": "/covers/south-africa-world-cup-knockouts--art.png",
          "alt": "Black-figure Panathenaic amphora depicting nude runners in a footrace, attributed to the Berlin Painter, c. 490-480 BC",
          "credit": "Berlin Painter, Panathenaic amphora (runners), Altes Museum, Berlin. Wikimedia Commons, CC BY-SA."
        }
      }
    ]
  },
  {
    "slug": "paris-drug-raid-stolen-picasso",
    "headline": "Stolen Picasso portrait worth up to $17 million recovered by chance in a Paris-area drug raid",
    "overview": "French narcotics police raiding a house near Paris stumbled by chance upon a stolen 1937 Picasso portrait of Marie-Thérèse Walter, valued at up to $17 million. A security guard at an art-storage firm admitted taking it, and six people were arrested. Investigators said the theft was opportunistic — “the gang had no idea what to do with it.”",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/paris-drug-bust-nets-pilfered-picasso-1234752741/"
      },
      {
        "name": "The Art Newspaper",
        "href": "https://www.theartnewspaper.com/2026/06/24/picasso-painting-recovered-in-french-drug-raid-was-stolen-opportunistically-say-police-source"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/paris-drug-raid-stolen-picasso.png",
      "alt": "A gilt-framed portrait recovered and propped against a wall, lit by a single lamp in a dim room.",
      "credit": "Artforum"
    },
    "rank": 34,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Theft of the Mona Lisa from the Louvre (1911)",
        "excerpt": "On 21 August 1911 a former Louvre handyman, Vincenzo Peruggia, walked out of the museum with Leonardo's masterpiece tucked under a workman's smock. He kept the most famous painting in the world hidden in a trunk in his cramped Paris apartment for more than two years, with no real idea how to turn it into money. When he finally tried to sell it to a Florence dealer in 1913, the picture surfaced again and was recovered. The contemporary American newspaper coverage gathered by the Library of Congress records a thief who possessed a priceless treasure yet could not fathom what to do with it.",
        "source": "Theft of Mona Lisa: Topics in Chronicling America, Library of Congress",
        "href": "https://guides.loc.gov/chronicling-america-theft-mona-lisa"
      },
      {
        "category": "historical",
        "title": "The Isabella Stewart Gardner Museum Heist (1990)",
        "excerpt": "In the early hours of 18 March 1990, two men in police uniforms talked their way into Boston's Isabella Stewart Gardner Museum, handcuffed the guards in the basement, and left eighty-one minutes later with thirteen works of art, among them Vermeer's The Concert. More than three decades on, none has been recovered, despite a standing ten-million-dollar reward and an FBI investigation; the empty frames still hang on the museum's walls. It is the inverse of the Paris case: the masterpiece lost, but never found by lucky accident.",
        "source": "Isabella Stewart Gardner Museum Heist, Federal Bureau of Investigation",
        "href": "https://www.fbi.gov/history/famous-cases/isabella-stewart-gardner-museum-heist"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, \"The Purloined Letter\" (1844)",
        "excerpt": "to conceal this letter, the Minister had resorted to the comprehensive and sagacious expedient of not attempting to conceal it at all. ... the Minister had deposited the letter immediately beneath the nose of the whole world, by way of best preventing any portion of that world from perceiving it.",
        "source": "The Works of Edgar Allan Poe, Volume 2, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2148/2148-h/2148-h.htm"
      },
      {
        "category": "literary",
        "title": "The Parable of the Hidden Treasure (Gospel of Matthew 13:44)",
        "excerpt": "Again, the kingdom of heaven is like unto treasure hid in a field; the which when a man hath found, he hideth, and for joy thereof goeth and selleth all that he hath, and buyeth that field.",
        "source": "Bible (King James), Gospel of Matthew, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "artistic",
        "title": "Robert Schumann, \"Glückes genug\" (Happy Enough), from Kinderszenen, Op. 15 (1838)",
        "excerpt": "A small piano miniature whose German title means \"Happiness Enough,\" the fifth of Schumann's thirteen Scenes from Childhood. Its tender, rocking phrases capture exactly the kind of quiet, almost private joy described in the parable of the buried treasure: the surge of fortune that comes when something precious is suddenly found. Composed in 1838 and long in the public domain, it is a sketch of contentment over a treasure unexpectedly within one's grasp.",
        "source": "Kinderszenen, Op.15 (Schumann, Robert), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Kinderszenen,_Op.15_(Schumann,_Robert)"
      },
      {
        "category": "artistic",
        "title": "Rembrandt (and Gerrit Dou), \"The Parable of the Hidden Treasure\" (c. 1630)",
        "excerpt": "By candle and lantern light, a man crouches in a field at night, digging up a chest of treasure he has stumbled upon. The painting renders the Gospel parable as a scene of furtive discovery: a fortune found by chance and clutched in the dark, its finder scarcely able to believe what his hands have closed around. It is the very image of a treasure unearthed and a man overtaken by the luck of finding it.",
        "source": "Museum of Fine Arts, Budapest (Szépművészeti Múzeum); image via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Parable_of_the_hidden_treasure_Rembrandt_-_Gerard_Dou.jpg",
        "image": {
          "src": "/covers/paris-drug-raid-stolen-picasso--art.png",
          "alt": "A man kneeling in a dark field by lantern light, digging up a chest of treasure, in an oil painting attributed to Rembrandt and Gerrit Dou, c. 1630",
          "credit": "Rembrandt / Gerrit Dou, The Parable of the Hidden Treasure (c. 1630), Museum of Fine Arts, Budapest. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "pentagon-restores-flu-shots",
    "headline": "Pentagon restores mandatory flu shots for recruits after boot-camp outbreak sickens nearly 300",
    "overview": "The Pentagon reinstated mandatory flu vaccinations for all military recruits after an outbreak at the Air Force's Lackland boot camp sickened nearly 300 people. The shot had been made optional in April, and only about 40 percent of trainees chose to take it. Recruits live in close quarters under high stress, conditions that speed the spread of illness.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPbXVZWk1meExDUDBBN0U2cklITERHOFU4UVZhSnR3MUdWSGpkQzZIVE5rT2dVNDBPQzdOTmxmZHZvd0lETmJ6SjUzNEhmakVNcjlCZkczMFJ5UUJWVV9rVW9jWVdpdGU1b2UwZ19NenVVMmJEMzZJV29aajZLUEZyOW9fVmRPTnJnenhfWkkxR2xfRUdJOGtBZ2J1UGRKNWRLX016dlpaN1hvb05C?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/Health/military-services-requiring-recruits-flu-shots-air-force/story?id=134126794"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/pentagon-restores-flu-shots.png",
      "alt": "Rows of empty steel bunk beds in a long military barracks dormitory at dawn, pale light through high windows.",
      "credit": "AI-generated"
    },
    "rank": 35,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens",
        "excerpt": "An aggravation of the existing calamity was the influx from the country into the city, and this was especially felt by the new arrivals. As there were no houses to receive them, they had to be lodged at the hot season of the year in stifling cabins, where the mortality raged without restraint. There was the awful spectacle of men dying like sheep, through having caught the infection in nursing each other.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (trans. Richard Crawley)",
        "href": "http://www.thelatinlibrary.com/historians/thucyd/thucydides5.html"
      },
      {
        "category": "historical",
        "title": "Washington Inoculates the Continental Army",
        "excerpt": "Finding the small pox to be spreading much and fearing that no precaution can prevent it from running through the whole of our Army, I have determined that the Troops shall be inoculated. Necessity not only authorizes but seems to require the measure, for should the disorder infect the Army in the natural way and rage with its usual virulence we should have more to dread from it than from the Sword of the Enemy.",
        "source": "George Washington to Dr. William Shippen, Jr., 6 February 1777 (National Library of Medicine)",
        "href": "https://www.nlm.nih.gov/exhibition/georgewashington/mobile/item1.html"
      },
      {
        "category": "literary",
        "title": "A Journal of the Plague Year",
        "excerpt": "It was, however, upon inquiry found that this Frenchman who died in Bearbinder Lane was one who, having lived in Long Acre, near the infected houses, had removed for fear of the distemper, not knowing that he was already infected.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722)",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "literary",
        "title": "The Decameron: The Plague in Florence",
        "excerpt": "And this pestilence was the more virulent for that, by communication with those who were sick thereof, it gat hold upon the sound, no otherwise than fire upon things dry or greasy, when they are brought very near thereunto.",
        "source": "Giovanni Boccaccio, The Decameron, Introduction (trans. John Payne)",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm"
      },
      {
        "category": "artistic",
        "title": "Danse macabre, Op. 40",
        "excerpt": "Saint-Saens's symphonic poem summons Death as a fiddler who, at the stroke of midnight, calls the dead from their graves to dance until dawn. The solo violin, tuned to a harsh, rasping discord, scrapes out a whirling waltz over rattling xylophone bones. It is the old vision of contagion and mortality made into music: the impartial leveler who gathers all ranks into one heedless, swirling crowd.",
        "source": "Camille Saint-Saens, Danse macabre, Op. 40 (1874), IMSLP",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "The Plague at Ashdod",
        "excerpt": "Poussin stages an epidemic as civic catastrophe: amid grand classical architecture, the stricken collapse in the streets while the living recoil, pinch their noses against the stench, and turn away from the dead. In the foreground an infant still reaches for the breast of its lifeless mother. The painting renders the terror of a community overtaken by an unseen contagion it cannot outrun.",
        "source": "Nicolas Poussin, The Plague at Ashdod (1630-1631), Musee du Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_poussin,_peste_di_asdod,_1630-31.JPG",
        "image": {
          "src": "/covers/pentagon-restores-flu-shots--art.png",
          "alt": "Nicolas Poussin's painting The Plague at Ashdod (1630-1631), showing plague victims collapsing among classical buildings as the living recoil from the dead",
          "credit": "Nicolas Poussin, The Plague at Ashdod (1630-1631), Musee du Louvre (INV 7276). Photo: Sailko, via Wikimedia Commons, CC BY-SA 3.0"
        }
      }
    ]
  },
  {
    "slug": "manhattan-50-million-arts",
    "headline": "Manhattan borough president pledges his entire $50 million budget to the arts",
    "overview": "Manhattan Borough President Brad Hoylman-Sigal pledged his office's full $50 million annual discretionary budget — a program he calls the “Manhattan Multiplier” — to 28 schools and 55 cultural institutions, from the Metropolitan Opera to the Schomburg Center. He framed the move as a rebuff to threats against federal arts funding, calling arts and culture “economic engines and essential infrastructure.”",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/manhattan-borough-president-pledges-50-million-to-arts-orgs-1234753249/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/art-news/news/manhattan-borough-president-2026-budget-arts-trump-1234790051/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/manhattan-50-million-arts.png",
      "alt": "The grand columned facade of a Manhattan cultural institution at dusk, banners hanging by the entrance.",
      "credit": "Artforum"
    },
    "rank": 36,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pericles' building program on the Athenian Acropolis",
        "excerpt": "In fifth-century Athens, Pericles answered his critics by turning the city's surplus into a vast public works program — the Parthenon and the temples of the Acropolis. The project was meant not only to crown Athens with beauty but to put the whole citizenry to work, spreading civic prosperity through every trade. He cast public spending on art and architecture as the shared inheritance and glory of the city itself.",
        "source": "Plutarch, Life of Pericles (Bernadotte Perrin trans., Loeb Classical Library)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Pericles*.html"
      },
      {
        "category": "historical",
        "title": "The Medici and the flowering of Renaissance Florence",
        "excerpt": "Across the fifteenth century the Medici bank turned its fortune into patronage, commissioning Brunelleschi, Donatello, Botticelli, and others and funding libraries, churches, and the rebirth of classical learning. Cosimo the Elder and Lorenzo the Magnificent treated the cultivation of art and scholarship as a duty of civic magnificence, binding the prestige of the family to the splendor of the city. Their spending made Florence the workshop of the Renaissance and a model of the city as patron.",
        "source": "Encyclopaedia Britannica, \"House of Medici\"",
        "href": "https://www.britannica.com/topic/Medici-family"
      },
      {
        "category": "literary",
        "title": "Plutarch on Pericles and the public works of Athens",
        "excerpt": "The materials to be used were stone, bronze, ivory, gold, ebony, and cypress-wood; the arts which should elaborate and work up these materials were those of carpenter, moulder, bronze-smith, stone-cutter, dyer, worker in gold and ivory, painter, embroiderer, embosser, to say nothing of the forwarders and furnishers of the material, such as factors, sailors and pilots by sea, and, by land, wagon-makers, trainers of yoked beasts, and drivers. There were also rope-makers, weavers, leather-workers, road-builders, and miners.",
        "source": "Plutarch, Life of Pericles 12.6-7 (Bernadotte Perrin trans., Loeb Classical Library)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Pericles*.html"
      },
      {
        "category": "literary",
        "title": "Vasari on Cosimo de' Medici and Fra Filippo Lippi",
        "excerpt": "For this reason he strove to keep a hold on him for the future by kindnesses; and so he was served by Filippo with greater readiness, and was wont to say that the virtues of rare minds were celestial beings, and not slavish hacks.",
        "source": "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors and Architects, Vol. III, \"Life of Fra Filippo Lippi\" (Gaston du C. de Vere trans.)",
        "href": "https://www.gutenberg.org/files/26860/26860-h/26860-h.htm"
      },
      {
        "category": "artistic",
        "title": "Botticelli, Primavera (Allegory of Spring)",
        "excerpt": "Painted for a Medici patron around 1480, Botticelli's Primavera gathers Venus, the Three Graces, Flora, and Mercury in an orange grove where spring perpetually flowers. The picture is the fruit of private wealth poured into beauty — a Medici commission that became one of civilization's most beloved images, the kind of cultural inheritance public money is invoked to protect.",
        "source": "Sandro Botticelli, Primavera, c. 1480, tempera on panel, Galleria degli Uffizi, Florence",
        "href": "https://commons.wikimedia.org/wiki/File:Botticelli-primavera.jpg",
        "image": {
          "src": "/covers/manhattan-50-million-arts--art.png",
          "alt": "Botticelli's Primavera: Venus stands at center in an orange grove, flanked by the dancing Three Graces, Mercury, and the flower-strewn figures of Flora, Chloris, and Zephyrus.",
          "credit": "Sandro Botticelli, Primavera (c. 1480), Galleria degli Uffizi, Florence. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Handel, Water Music (HWV 348-350)",
        "excerpt": "Handel composed the Water Music for King George I, whose orchestra of some fifty players performed it from a barge as the royal party drifted up the Thames in July 1717. The buoyant suites of overture, minuets, bourrees, and hornpipes are music born directly of royal patronage — a sovereign underwriting splendor for the delight of his city. It survives as a public-domain monument to art made possible by a patron's purse.",
        "source": "George Frideric Handel, Water Music, HWV 348-350 (1717), scores at the International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/Water_Music,_HWV_348-350_(Handel,_George_Frideric)"
      }
    ]
  },
  {
    "slug": "china-future-industries-bubble",
    "headline": "China's push into “future industries” unleashes a venture-capital flood and bubble fears",
    "overview": "China's state-backed drive into “future industries” — quantum technology, nuclear fusion, space and brain-machine interfaces — has triggered a surge of venture capital, with investment up nearly 60 percent to 620 billion yuan in the first five months of the year. Soaring startup valuations have stirred fears of a speculative bubble; one veteran investor called the frenzy unlike anything in his career.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxQYkE4TjEwYlRaekZnWko3cnYtaGtfa19pdE5CcXI1STBjNVJRbU5MN3F3NzdWWVNmUjE2M2puRWMzZzlmbHZoQTdINEhQSzRpbVprMzhDeGFtZWV5dFVXbVlEWk0wS3dGY09CTlYzbDVVRnZTOGxuaFhIbDNrMWZ4QXp5WUprTU8yNEZQbWthaFpRaUhQc3cwTEFGblUzRVFOUmdZVWRSWlhZTlJ1THgxZzluSEtMang3akdkWXdGSHA3UV9UVW13M3JBaw?oc=5"
      },
      {
        "name": "The Jakarta Post",
        "href": "http://www.thejakartapost.com/business/2026/06/25/chinas-future-industries-push-triggers-flood-of-venture-capital-bubble-concerns"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/china-future-industries-bubble.png",
      "alt": "A glittering forest of glass skyscrapers rising into mist at dusk, a single iridescent soap bubble drifting among the towers.",
      "credit": "AI-generated"
    },
    "rank": 37,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Dutch Tulip Mania, recorded in the Dialogues of Waermondt and Gaergoedt (1637)",
        "excerpt": "When the speculation in tulip bulbs gripped Holland in 1634-1637, contemporaries watched ordinary goods of life converted overnight into flowers traded at impossible prices. The anonymous Haarlem pamphlets known as the Samen-Spraeck tusschen Waermondt ende Gaergoedt, the most important primary source for the mania, put the frenzy in the mouth of the speculator Gaergoedt: \"Everything was worth money and so current that one could get in exchange almost anything one desired.\"",
        "source": "Samen-Spraeck tusschen Waermondt ende Gaergoedt (anonymous Dialogues, Haarlem, 1637), as presented by the University of Chicago",
        "href": "https://penelope.uchicago.edu/encyclopaedia_romana/aconite/tulipomania.html"
      },
      {
        "category": "historical",
        "title": "The South-Sea Bubble (1720), from Mackay's contemporary-sourced account",
        "excerpt": "In 1720 the South Sea Company's stock soared on the promise of fabulous future trade, and all of England seemed to abandon its trades to gamble in shares before the bubble burst and ruined thousands. Charles Mackay's history, drawn from contemporary records, describes the scene: \"It seemed at that time as if the whole nation had turned stockjobbers. Exchange Alley was every day blocked up by crowds, and Cornhill was impassable for the number of carriages.\"",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. 1, \"The South-Sea Bubble\"",
        "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_2"
      },
      {
        "category": "literary",
        "title": "Aesop, \"The Goose That Laid the Golden Eggs\"",
        "excerpt": "A Man and his Wife had the good fortune to possess a Goose which laid a Golden Egg every day. Lucky though they were, they soon began to think they were not getting rich fast enough, and, imagining the bird must be made of gold inside, they decided to kill it in order to secure the whole store of precious metal at once. But when they cut it open they found it was just like any other goose. Thus, they neither got rich all at once, as they had hoped, nor enjoyed any longer the daily addition to their wealth. Much wants more and loses all.",
        "source": "Aesop's Fables, a new translation by V. S. Vernon Jones (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/11339/11339-h/11339-h.htm"
      },
      {
        "category": "literary",
        "title": "Jonathan Swift, \"The South Sea Project\" (1721)",
        "excerpt": "Subscribers here by thousands float,\nAnd jostle one another down;\nEach paddling in his leaky boat,\nAnd here they fish for gold, and drown.",
        "source": "Jonathan Swift, \"The South Sea Project\" (1721), in The Works of the Rev. Jonathan Swift, Vol. 7",
        "href": "https://en.wikisource.org/wiki/The_Works_of_the_Rev._Jonathan_Swift/Volume_7/The_South_Sea_Project"
      },
      {
        "category": "artistic",
        "title": "Hendrik Gerritsz Pot, \"Flora's Wagon of Fools\" (c. 1637)",
        "excerpt": "Painted in the immediate aftermath of the Dutch tulip crash, Pot's allegory loads the goddess Flora and her gaudy entourage of fools onto a wind-driven wagon rolling toward the sea, while weavers abandon their looms to chase the float and a crowd follows after it. The wagon's sail, the empty promise of riches on the wind, captures a whole society betting its fortune on a speculative bloom.",
        "source": "Frans Hals Museum, Haarlem (oil on panel, accession os I-286)",
        "href": "https://commons.wikimedia.org/wiki/File:Flora's_Wagon_of_Fools_(Flora's_Mallewagen)_tulipomania,_Hendrik_Gerritsz_Pot_c1637.jpg",
        "image": {
          "src": "/covers/china-future-industries-bubble--art.png",
          "alt": "Flora's Wagon of Fools (c. 1637) by Hendrik Gerritsz Pot: an allegorical painting of the goddess Flora and fools riding a wind-blown wagon toward the sea, satirizing the Dutch tulip mania.",
          "credit": "Hendrik Gerritsz Pot, Flora's Wagon of Fools, c. 1637, Frans Hals Museum, Haarlem. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns, \"Danse macabre,\" Op. 40 (1874)",
        "excerpt": "Saint-Saëns' tone poem summons Death at midnight to scrape his fiddle while the skeletons of the rich and the poor alike rise to dance, a feverish whirl that spins faster and faster until the cock crows and the whole glittering revel collapses into nothing. Its frenzy and abrupt dissolution make it a fitting score for any mania that dances on air until dawn breaks the spell.",
        "source": "Camille Saint-Saëns, Danse macabre, Op. 40 (symphonic poem, 1874), full scores on IMSLP",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
      }
    ]
  },
  {
    "slug": "trump-withholds-housing-bill",
    "headline": "Trump refuses to sign bipartisan housing bill, demanding Congress pass his voting law first",
    "overview": "President Trump abruptly canceled the signing of a bipartisan housing bill — which cleared the House 358-32 and the Senate 85-5 — saying he will not sign it until Congress passes his SAVE America Act on voting. The standoff risks a pocket veto and leaves a measure intended to lower housing costs in limbo. Republican senators called the move “inexplicable.”",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQbldpcm13b1ZGdlB6MTY5dUNYOXVHUVJocFcwN1ZzbFpSOXZwMGItZGtrdUZlTUU5ZXo4N2g3ZDgwdUJfY1BHZWc4S0NtZnltOENBYUgwY1B2MWw1aXg0VUdyc1ZnQXF2NExVVWtER2NrcWgyanBfaW1NS1NJeEE5dFMtOWNuWWFhaUZrNWduQTg4Zm5VNnhhNXlMN2ozRWF0?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/politics/trump-says-he-wont-sign-major-housing-bill-until-congress-passes-save-act"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/trump-withholds-housing-bill.png",
      "alt": "A grand domed legislative capitol at dusk under a brooding sky, an unsigned document and a capped pen on a desk in the foreground.",
      "credit": "AI-generated"
    },
    "rank": 38,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The grievances against George III: refusing assent to laws",
        "excerpt": "He has refused his Assent to Laws, the most wholesome and necessary for the public good. He has forbidden his Governors to pass Laws of immediate and pressing importance, unless suspended in their operation till his Assent should be obtained; and when so suspended, he has utterly neglected to attend to them.",
        "source": "Declaration of Independence (1776), U.S. National Archives transcript",
        "href": "https://www.archives.gov/founding-docs/declaration-transcript"
      },
      {
        "category": "historical",
        "title": "Plutarch on the tribune's veto (intercessio) blocking the will of the many",
        "excerpt": "For the decisive power is in the hands of any tribune who interposes his veto; since the wishes of the majority avail nothing if one tribune is in opposition.",
        "source": "Plutarch, Life of Tiberius Gracchus, ch. 10 (Perseus Digital Library, trans. Perrin)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0065:chapter=10"
      },
      {
        "category": "literary",
        "title": "Coriolanus withholds himself from the people",
        "excerpt": "I will not seal your knowledge with showing them. I will make much of your voices and so trouble you no farther.",
        "source": "William Shakespeare, Coriolanus, Act II, Scene III (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1535/pg1535.txt"
      },
      {
        "category": "literary",
        "title": "Bartleby's quiet refusal: 'I would prefer not to'",
        "excerpt": "\"I would prefer not to,\" replied Bartleby, in a singularly mild, firm voice.",
        "source": "Herman Melville, Bartleby, the Scrivener: A Story of Wall-Street (1853), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/11231/pg11231.txt"
      },
      {
        "category": "artistic",
        "title": "Beethoven's Egmont, Op. 84 — music against a ruler's oppression",
        "excerpt": "Beethoven's incidental music for Goethe's tragedy Egmont dramatizes a people crushed under an unyielding sovereign and the count who defies him. The brooding overture coils in tension before erupting into a blazing Victory Symphony, turning resistance to arbitrary power into pure sound.",
        "source": "Ludwig van Beethoven, Egmont, Op. 84 (1810), full scores at IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/Egmont,_Op.84_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Trumbull's 'Declaration of Independence': the act of assent given",
        "excerpt": "John Trumbull's monumental canvas shows the drafting committee presenting its text to the Continental Congress — the founding image of a deliberative body whose work becomes binding only by formal assent. It hangs in the U.S. Capitol Rotunda as a portrait of self-government and the signatures that make law.",
        "source": "John Trumbull, Declaration of Independence (1819), U.S. Capitol Rotunda (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg",
        "image": {
          "src": "/covers/trump-withholds-housing-bill--art.png",
          "alt": "John Trumbull's 1819 painting Declaration of Independence, showing the drafting committee presenting the document to the Continental Congress.",
          "credit": "John Trumbull, Declaration of Independence (1819), U.S. Capitol Rotunda. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "paris-museums-close-heatwave",
    "headline": "Louvre and Eiffel Tower close early as a record heatwave bakes France",
    "overview": "The Louvre and the Eiffel Tower closed early and the Palais de Tokyo shut entirely as a record-breaking heatwave pushed French temperatures toward 44 degrees Celsius (about 112 Fahrenheit). Air conditioning is uncommon in France's cultural institutions, and the Louvre noted that heat builds up worst late in the day amid high visitor numbers.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/paris-museums-close-as-france-swelters-1234753245/"
      },
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c78y4102n1zo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-25",
    "image": {
      "src": "/covers/paris-museums-close-heatwave.png",
      "alt": "The glass pyramid of a great Paris museum under a blazing white midday sky, the courtyard nearly empty in the heat.",
      "credit": "Artforum"
    },
    "rank": 39,
    "edition": "Afternoon Edition · 25 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 2003 European Heat Wave",
        "excerpt": "In the summer of 2003 a record heat wave settled over Europe, the hottest the continent had seen in roughly five centuries. France was struck hardest: temperatures soared past 40C, and with air conditioning a rarity even night brought no relief in the stone and brick of its cities. The toll was staggering, with nearly 15,000 heat-related deaths in France alone, mostly among the elderly, and tens of thousands more across the continent.",
        "source": "Encyclopaedia Britannica, \"European heat wave of 2003\"",
        "href": "https://www.britannica.com/event/European-heat-wave-of-2003"
      },
      {
        "category": "historical",
        "title": "Pliny the Elder on the Rising of the Dog-Star",
        "excerpt": "Who is there that does not know that the vapour of the sun is kindled by the rising of the Dog-star? The most powerful effects are felt on the earth from this star. When it rises, the seas are troubled, the wines in our cellars ferment, and stagnant waters are set in motion.",
        "source": "Pliny the Elder, Natural History, Book II, ch. 40 (Bostock & Riley trans.)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=2:chapter=40"
      },
      {
        "category": "literary",
        "title": "Coleridge, The Rime of the Ancient Mariner",
        "excerpt": "All in a hot and copper sky, / The bloody Sun, at noon, / Right up above the mast did stand, / No bigger than the Moon.",
        "source": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner\" (Part the Second)",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid, The Burning Earth of Phaethon",
        "excerpt": "Great cities perish with their walls, and peopled nations are consumed to dust— the forests and the mountains are destroyed. The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction.",
        "source": "Ovid, Metamorphoses, Book II (Brookes More trans.)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "artistic",
        "title": "Vivaldi, \"Summer\" from The Four Seasons",
        "excerpt": "Vivaldi's \"L'estate\" (Summer), the second of his Four Seasons concertos, opens under a languor so heavy the music itself seems to wilt. Its accompanying sonnet describes man and beast laid low beneath a merciless sun, the pine scorched, the very air motionless—before the storm breaks the spell. It is the sound of a world paralyzed by heat.",
        "source": "Antonio Vivaldi, Le quattro stagioni, Op. 8 — Concerto No. 2 in G minor, RV 315 \"L'estate\"",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "Van Gogh, The Sower (Sower at Sunset)",
        "excerpt": "Painted in Arles in the summer of 1888, van Gogh set a lone sower against an immense lemon-yellow sun that floods the whole canvas. The fierce southern light seems to dissolve the field into bands of molten color, the heat made visible. It captures exactly the blinding, all-consuming sun of a Provencal summer.",
        "source": "Vincent van Gogh, The Sower (Sower at Sunset), 1888, Kröller-Müller Museum",
        "href": "https://commons.wikimedia.org/wiki/File:The_Sower_-_painting_by_Van_Gogh.jpg",
        "image": {
          "src": "/covers/paris-museums-close-heatwave--art.png",
          "alt": "Van Gogh's The Sower: a peasant sowing seed in the foreground beneath an enormous glowing yellow sun low over a field, in swirling bands of yellow and violet.",
          "credit": "Vincent van Gogh, The Sower (Sower at Sunset), 1888, Kröller-Müller Museum. Public domain via Wikimedia Commons."
        }
      }
    ]
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
