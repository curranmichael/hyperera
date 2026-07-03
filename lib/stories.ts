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
// the Evening Edition of 2 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Afternoon Edition and the Morning Edition of 2 July 2026.
// Stories are selected from the live RSS feeds in `lib/feeds.ts`. The analogies are
// the heart of each story: six per event, two per category, each linking to a real
// human-written source (a primary text, museum object page, or archive). Excerpts
// quote the most relevant passage verbatim where the source is public domain, and
// otherwise describe rather than quote. Covers are dithered local copies: feed or
// rights-clean Wikimedia art/photos credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated"). Every analogy carries its own
// image too — a rights-clean visual of its subject (the artwork itself, a manuscript
// page, a portrait, a title page; never AI-generated), dithered via
// scripts/dither-art.ts to /covers/<slug>--historical-1|2, --literary-1|2, --music,
// --art. Omit only when nothing rights-clean exists; the home hero crossfades to
// these on hover. Source links to AP/Reuters are Google News redirects (see
// `lib/feeds.ts`).
const stories: Story[] = [
    {
      "slug": "kyiv-russia-massive-attack",
      "headline": "Russia launches its largest missile and drone attack on Kyiv, killing at least 30",
      "overview": "Rescuers spent Friday clearing rubble across the Ukrainian capital after an overnight barrage that officials said deployed more weapons than any previous strike on the city, killing at least 30 people and wounding more than 90. Ukraine's air force said Russia fired 74 missiles and roughly 496 drones, damaging around 20 residential buildings and driving thousands to shelter in metro stations. Moscow said the assault was retaliation for Ukrainian drone strikes on its oil refineries, which have caused fuel shortages across Russia.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxONU1hNlBDTURsc1NhcHNqODU1dTRDdnVLOUladWNPbTBGTUVVaDlzbFRVUU94SVVuM2w2c3E3Zjk2b0hUSVEtZk5tSkxoVzRRWDNsWjd0NmE0V2J6NnJGWXhoYzlETDdfT3VGaGtLaWhfUlFPc3JPYkM5djFBM3ZuTFZCYXVpcUpKcUt2M1ZueEpEWm9SYWNFdzE0Z2FCek1Qek9JM250M1hUUkNQTHVIUksybURObjJT?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c4gyv05gk4do"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/kyiv-russia-massive-attack.png",
        "alt": "A woman weeps as she embraces a relative in front of an apartment block damaged by an overnight strike in Kyiv.",
        "credit": "BBC"
      },
      "lead": true,
      "rank": 1,
      "edition": "Afternoon Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The London Blitz (1940–41) — a capital bombed night after night in reprisal, its people sheltering deep in Underground stations",
          "excerpt": "When the Luftwaffe turned on London in September 1940 — a switch to bombing the capital driven in part as reprisal for RAF raids on Berlin — tens of thousands of Londoners carried blankets down into Tube stations and slept on the platforms while the city burned above them. The Underground became a subterranean city of the night, exactly as Kyiv's metro fills with families the moment the sirens sound. The raids killed tens of thousands of civilians, yet the nightly ritual of descending into the earth and climbing back up into the smoke became the defining image of civilian endurance under aerial terror.",
          "source": "Imperial War Museum / Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:The_London_Underground_As_Air_Raid_Shelter,_London,_England,_1940_D1675.jpg"
        },
        {
          "category": "historical",
          "title": "George R. Gleig, \"The Campaigns of the British Army at Washington\" (1821) — a soldier watches an enemy capital set ablaze in openly declared retaliation",
          "excerpt": "The sky was brilliantly illumined by the different conflagrations; and a dark red light was thrown upon the road, sufficient to permit each man to view distinctly his comrade's face. Except the burning of St. Sebastian's, I do not recollect to have witnessed at any period of my life a scene more striking or more sublime.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/18479/pg18479-images.html"
        },
        {
          "category": "literary",
          "title": "Virgil, \"Aeneid,\" Book II (c. 19 BC) — Aeneas wakes to find his city aflame, the archetype of a capital consumed in a single catastrophic night",
          "excerpt": "I woke on sudden, and up-starting scaled the roof, the tower, then stood with listening ear: 't was like an harvest burning, when wild winds uprouse the flames... Now their Greek plot was plain, the stratagem at last laid bare. Deiphobus' great house sank vanquished in the fire. Ucalegon's hard by was blazing, while the waters wide around Sigeum gave an answering glow.",
          "source": "Perseus (Tufts)",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0054:book=2:card=298"
        },
        {
          "category": "literary",
          "title": "Wilfred Owen, \"Dulce et Decorum Est\" (1920) — a soldier-poet strips war of its glory, indicting the old lies that justify slaughter",
          "excerpt": "Gas! GAS! Quick, boys!—An ecstasy of fumbling, / Fitting the clumsy helmets just in time; / But someone still was yelling out and stumbling, / And flound'ring like a man in fire or lime... My friend, you would not tell with such high zest / To children ardent for some desperate glory, / The old Lie: Dulce et decorum est / Pro patria mori.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Complete_Poems_and_Fragments_of_Wilfred_Owen/Dulce_et_Decorum_Est"
        },
        {
          "category": "artistic",
          "title": "John Martin, \"The Great Day of His Wrath\" (1851–53) — a whole city torn from its foundations and hurled into an abyss of fire, apocalypse as bombardment from the sky",
          "excerpt": "Martin's vast canvas shows a city dissolving in a storm of fire and darkness: cliffs collapse, buildings tumble end over end into a red chasm, and tiny human figures vanish beneath cascading rock and flame. Painted in his final years, it fuses the Book of Revelation with the industrial hell of the mining valleys he knew, imagining annihilation descending from above upon the whole built world. Stand before it and the roar is almost audible — the same blinding light a barrage of missiles throws over a sleeping capital at night.",
          "source": "The Tate / Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Great_Day_of_His_Wrath_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/kyiv-russia-massive-attack--art.png",
            "alt": "John Martin's apocalyptic painting The Great Day of His Wrath, showing a city collapsing into a red chasm of fire and darkness.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Giuseppe Verdi, \"Messa da Requiem\" — Dies irae (1874) — the medieval Day of Wrath rendered as an overwhelming barrage of sound, terror falling from above",
          "excerpt": "Verdi set the medieval \"Dies irae\" — the \"day of wrath\" — as the most terrifying music in his Requiem: hammer-blow strokes of the bass drum, plunging chromatic scales, and a chorus crying out at a world dissolving into ash and fire. Premiered in 1874, it turns the liturgy of the Last Judgment into a wall of sound, the sound of wrath crashing down on the living. It is about as close as music comes to the terror of a sky raining fire on a sleeping city.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
        }
      ]
    },
    {
      "slug": "iran-khamenei-state-funeral",
      "headline": "Iran opens six days of state funeral ceremonies for slain Supreme Leader Ayatollah Ali Khamenei",
      "overview": "Iran began days of public mourning for Ayatollah Ali Khamenei, who was killed at 86 in a joint US-Israeli airstrike on his compound on February 28, the first day of the war, in a burial repeatedly postponed as the conflict dragged on. Authorities said they expect up to 20 million people at ceremonies running July 3-9 across Tehran, Qom, the Iraqi shrine cities of Najaf and Karbala, and finally Mashhad, where he will be buried on July 9. His son Mojtaba, elected supreme leader in March, has scarcely appeared in public.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxOQ3FKcmxXQ3lQTHVFQ1JpTTBFdnp5QmhyVXZaSVlSSHBZSUNIYkpRMmExRDJzcTFSRXF0TDdtbE1BV0xfMlNqLVpkMUFjVm1Za2xIRmRTa19CMkhRNU9zbGJqUzJ2SGs0cmNQakxTV3ktcFpueGdkZ0hEdU8tbWs0QnF5VUo3T3NveHYyNW5iSGRidmpURTBvVWR5QWlleU1KWFJCN3UzWjRvWnNsRURwYzhJUHZNT2w0dnp3?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cx2k4k7jqeno"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/iran-khamenei-state-funeral.png",
        "alt": "Mourners in black hold a portrait of Ayatollah Ali Khamenei during memorial ceremonies in Iran.",
        "credit": "BBC"
      },
      "rank": 2,
      "edition": "Afternoon Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Suetonius, \"The Life of Julius Caesar\" (c. 121 AD) — the state funeral of a slain ruler, whose grieving multitude turns the mourning into a political act",
          "excerpt": "Notice of his funeral having been solemnly proclaimed, a pile was erected in the Campus Martius, near the tomb of his daughter Julia; and before the Rostra was placed a gilded tabernacle, on the model of the temple of Venus Genitrix; within which was an ivory bed, covered with purple and cloth of gold. At the head was a trophy, with the [blood-stained] robe in which he was slain. It being considered that the whole day would not suffice for carrying the funeral oblations in solemn procession before the corpse, directions were given for every one, without regard to order, to carry them from the city into the Campus Martius, by what way they pleased.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0132%3Alife%3Djul.%3Achapter%3D84"
        },
        {
          "category": "historical",
          "title": "Herodotus, \"The Histories,\" Book 9.24 (c. 430 BC) — Persians in collective mourning for a fallen leader, wailing so loud it is heard across a whole land",
          "excerpt": "When the cavalry returned to camp, Mardonius and the whole army mourned deeply for Masistius, cutting their own hair and the hair of their horses and beasts of burden, and lamenting loudly; the sound of this was heard over all Boeotia, for a man was dead who, next to Mardonius, was most esteemed by all Persia and the king.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D9%3Achapter%3D24"
        },
        {
          "category": "literary",
          "title": "Shakespeare, \"Julius Caesar,\" Act III (1599) — Antony over the slain leader's body, turning a funeral into the founding rite of who inherits power",
          "excerpt": "Friends, Romans, countrymen, lend me your ears; I come to bury Cæsar, not to praise him. The evil that men do lives after them, The good is oft interred with their bones; So let it be with Cæsar. The noble Brutus Hath told you Cæsar was ambitious; If it were so, it was a grievous fault, And grievously hath Cæsar answer'd it.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Julius_Caesar_(1919)_Yale/Text/Act_III"
        },
        {
          "category": "literary",
          "title": "Homer, \"The Iliad,\" Book 24 (c. 8th c. BC) — the epic closes on the funeral rites of a fallen hero, a whole city gathered to mourn its slain defender",
          "excerpt": "And when they had piled the barrow they went back, and gathering together duly feasted a glorious feast in the palace of Priam, the king fostered of Zeus. On this wise held they funeral for horse-taming Hector.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D24%3Acard%3D776"
        },
        {
          "category": "artistic",
          "title": "Abbas Al-Musavi, \"Battle of Karbala\" (late 19th c.) — the martyrdom of Husayn at Karbala, the founding grief of Shia tradition now written into Khamenei's own funeral itinerary",
          "excerpt": "A vast Qajar-era oil canvas that unfolds the martyrdom of Imam Husayn and his companions on the plain of Karbala, rendered not as a single moment but as an entire cosmos of sacrifice. Rows of the slain, mourning women, and the faithful of every era crowd the field, angels descending above them, so that the seventh-century martyrdom becomes an eternally present grief. It is the visual liturgy behind the Shia rites of public mourning that Iran now stages for its own fallen leader across the same holy cities of Najaf and Karbala.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_-_Battle_of_Karbala_-_Abbas_Al-Musavi_-_overall.jpg",
          "image": {
            "src": "/covers/iran-khamenei-state-funeral--art.png",
            "alt": "Abbas Al-Musavi's panoramic painting of the Battle of Karbala, crowded with martyrs, mourners, and descending angels around the death of Imam Husayn",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Chopin, \"Marche funèbre\" from Piano Sonata No. 2, Op. 35 (1839) — the funeral march that became civilization's shorthand for the burial of the great",
          "excerpt": "The slow, tolling third movement of Chopin's B-flat minor sonata is the funeral march the modern world reaches for when a leader is carried to the grave. Over a relentless dirge of heavy chords the melody rises like a distant procession, breaks into a brief, tender consolation, then returns inexorably to the tread of the cortège. It has accompanied countless state funerals, its measured grief the sound of a whole nation walking behind a bier.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)"
        }
      ]
    },
    {
      "slug": "moldova-pm-munteanu-resigns",
      "headline": "Moldovan Prime Minister Alexandru Munteanu resigns eight months into his term amid graft scandal",
      "overview": "Alexandru Munteanu announced on Friday that he was stepping down as Moldova's prime minister after just eight months in office, saying he could no longer exercise his mandate in line with his principles. His departure, which follows a corruption scandal at a state-owned air traffic management company, brings down the entire government. President Maia Sandu will now consult parliamentary groups and nominate a new candidate to lead the country wedged between Ukraine and EU member Romania.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQVkJTWl9mOFBvRF8xcGtOSVMwdGpLb1U1U2xKYnFRR3c2MDBGdmxJc3V2Wkl6Tk5EU0laZjBOUXlvVFYyajBUbXNGSWxhdC1sVVZFWG02NVFzQ3RPY0JTMURBcFVEaDF5SEpuS29MS093UjdMOGkxTEhKUTMzN05fM2plUnZ0c0plR1F6YXJpUnJEVWtnczFZ?oc=5"
        },
        {
          "name": "Bloomberg",
          "href": "https://www.bloomberg.com/news/articles/2026-07-03/moldovan-prime-minister-resigns-as-graft-scandal-shakes-country"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/moldova-pm-munteanu-resigns.png",
        "alt": "A pale neoclassical parliament building at dusk under a grey sky.",
        "credit": "AI-generated"
      },
      "rank": 3,
      "edition": "Afternoon Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Livy, \"The History of Rome\" Book 3 (c. 27 BC) — Cincinnatus lays down absolute power the moment his task is done, the ideal of the leader who will not cling to office",
          "excerpt": "Quinctius resigned on the sixteenth day the dictatorship which had been conferred upon him for six months.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0026%3Abook%3D3%3Achapter%3D29"
        },
        {
          "category": "historical",
          "title": "Cicero, \"Against Verres\" First Oration (70 BC) — a prosecution of a graft-riddled official that indicts the belief no rich man is ever convicted, mirroring the corruption scandal that toppled the government",
          "excerpt": "For an opinion has now become established, pernicious to us, and pernicious to the republic, which has been the common talk of every one, not only at Rome, but among foreign nations also,—that in the courts of law as they exist at present, no wealthy man, however guilty he may be, can possibly be convicted.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Cic.+Ver.+1.1.1&lang=english"
        },
        {
          "category": "literary",
          "title": "Shakespeare, \"Richard II\" Act 4 (c. 1595) — a ruler ceremonially unmaking himself, surrendering crown and mandate piece by piece, as Munteanu concedes he can no longer exercise his office",
          "excerpt": "Now mark me how I will undo myself: I give this heavy weight from off my head, And this unwieldy sceptre from my hand, The pride of kingly sway from out my heart; With mine own tears I wash away my balm, With mine own hands I give away my crown, With mine own tongue deny my sacred state, With mine own breath release all duteous rites: All pomp and majesty I do forswear.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Complete_Works_of_William_Shakespeare_(Oxford_1911)/Volume_4/The_Tragedy_of_King_Richard_the_Second"
        },
        {
          "category": "literary",
          "title": "Shakespeare, \"Coriolanus\" Act 3 (c. 1608) — a proud leader who cannot bend his principles to the state turns his back and walks out of power on his own terms",
          "excerpt": "You common cry of curs! whose breath I hate As reek o' the rotten fens, whose loves I prize As the dead carcasses of unburied men That do corrupt my air, I banish you... Despising, For you, the city, thus I turn my back: There is a world elsewhere.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Coriolanus_(1924)_Yale/Text/Act_III"
        },
        {
          "category": "artistic",
          "title": "John Trumbull, \"General George Washington Resigning His Commission\" (1824) — the voluntary handing back of power as an act of honor, the model of the leader who steps down rather than hold on",
          "excerpt": "Trumbull's vast Capitol Rotunda canvas freezes the moment in 1783 when Washington, victorious and adored, walked into the Congress at Annapolis and gave back his commission as commander-in-chief. He stands almost humbled before the seated legislators, offering up the document that made him powerful. The painting made the relinquishing of power itself the heroic subject, a rebuke to every ruler who confuses office with self.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:General_George_Washington_Resigning_his_Commission.jpg",
          "image": {
            "src": "/covers/moldova-pm-munteanu-resigns--art.png",
            "alt": "John Trumbull's painting of George Washington standing before the Continental Congress to resign his military commission in 1783",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Mussorgsky, \"Boris Godunov\" (1874) — a guilt-shadowed ruler whose legitimacy collapses, dying with the crown slipping from his grasp amid a nation between empires",
          "excerpt": "Mussorgsky's opera follows a Tsar who gained the throne under a moral stain and is slowly undone by conscience, rumor, and a restless people. In the final scene Boris, his authority crumbling, bids farewell, names a successor, and dies as power passes from him. Set on the fault line of a nation pulled between larger neighbors, its music turns the fall of a leader into a vast public reckoning.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
        }
      ]
    },
    {
      "slug": "eu-us-trade-record-tariffs",
      "headline": "EU-US goods trade hit a record €875 billion in 2025 despite tariffs, German institute finds",
      "overview": "Trade in goods between the European Union and the United States reached a record €875 billion last year even as new tariffs took hold, according to a study published Friday by the German Economic Institute. EU exports to the US rose 7.7% to €580 billion, lifting the bloc's trade surplus to nearly €285 billion, though researchers said the figures were flattered by companies front-loading shipments ahead of April's duties. Beneath the record, European carmakers were hit hard: EU vehicle and parts exports to the US fell 20.4%, with German shipments down 18.9%.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQcmRSZ1pJNUhacVlzZWFEeGF6aDNXUk5tTkc5cWNsb2dnWkZFUnYxWlpELXJlX0lzUEVvV0JpRVdEQVZwN3FoNWJieUNQa2pxZWthMEZFUXRwbm1GYXdqN29hTlN2RnAtSzJHc3VnUEx1aExRcG5MSDdzSzk1RnZOendzdk9RQ3NRT1dtY1FNMmIzNnk0WnFqYmp2VVNkZWI4M1IwQ1V6Zmd3S2ZWWmc?oc=5"
        },
        {
          "name": "Investing.com",
          "href": "https://www.investing.com/news/economic-indicators/eu-trade-with-us-hits-record-despite-tariff-tensions-study-shows-4775030"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/eu-us-trade-record-tariffs.png",
        "alt": "Stacked shipping containers and gantry cranes at a European container terminal.",
        "credit": "Wikimedia Commons"
      },
      "rank": 4,
      "edition": "Afternoon Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Pliny the Elder, \"Natural History\" (77 AD) — Rome's trade with the East swells even as coin drains away and wares return at a hundredfold markup, an ancient mirror of Europe's soaring surplus with America",
          "excerpt": "The subject is one well worthy of our notice, seeing that in no year does India drain our empire of less than five hundred and fifty millions of sesterces, giving back her own wares in exchange, which are sold among us at fully one hundred times their prime cost.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0137%3Abook%3D6%3Achapter%3D26"
        },
        {
          "category": "historical",
          "title": "Herodotus, \"The Histories\" (c. 430 BC) — Carthaginian and Libyan traders exchange cargo for gold across a gulf of language and mistrust, commerce flourishing over a divide neither side crosses in person",
          "excerpt": "There is a place in Libya, they say, where men live beyond the Pillars of Heracles; they come here and unload their cargo; then, having laid it in order along the beach, they go aboard their ships and light a smoking fire. The people of the country see the smoke, and, coming to the sea, they lay down gold to pay for the cargo, and withdraw from the wares.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D4%3Achapter%3D196"
        },
        {
          "category": "literary",
          "title": "Adam Smith, \"The Wealth of Nations\" (1776) — the maxim that a nation, like a household, gains by buying abroad what costs more to make at home, the free-trade logic that April's duties defy",
          "excerpt": "It is the maxim of every prudent master of a family, never to attempt to make at home what it will cost him more to make than to buy. The tailor does not attempt to make his own shoes, but buys them of the shoemaker. The shoemaker does not attempt to make his own clothes, but employs a tailor. The farmer attempts to make neither the one nor the other, but employs those different artificers.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/3300/3300-h/3300-h.htm"
        },
        {
          "category": "literary",
          "title": "Frédéric Bastiat, \"The Candlemakers' Petition\" (1845) — a mock plea to bar a cheaper foreign rival lays bare the paradox of protectionism now taxing European cars into the American market",
          "excerpt": "We are suffering from the intolerable competition of a foreign rival, placed, it would seem, in a condition so far superior to ours for the production of light, that he absolutely inundates our national market with it at a price fabulously reduced. The moment he shows himself, our trade leaves us—all consumers apply to him; and a branch of native industry, having countless ramifications, is all at once rendered completely stagnant.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Candlemakers%27_Petition"
        },
        {
          "category": "artistic",
          "title": "Claude Lorrain, \"Seaport with the Embarkation of the Queen of Sheba\" (1648) — a golden harbour crowded with merchants and cargo, the bustling port of commerce made luminous",
          "excerpt": "Claude's imaginary Mediterranean port glows at sunrise: merchants and porters move bales and barrels along the quay, tall ships ride at anchor, and figures load cargo into rowing boats as the day's trade begins. Grand classical facades frame a harbour humming with the traffic of goods and people. It is commerce idealized, a vision of maritime prosperity that outlasts the biblical pretext of its title.",
          "source": "The National Gallery, London",
          "href": "https://www.nationalgallery.org.uk/paintings/claude-seaport-with-the-embarkation-of-the-queen-of-sheba",
          "image": {
            "src": "/covers/eu-us-trade-record-tariffs--art.png",
            "alt": "Claude Lorrain's 1648 painting of a sunlit Mediterranean seaport, its quays crowded with merchants and cargo, tall ships at anchor before grand classical buildings.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Nikolai Rimsky-Korsakov, \"Sadko\" (1897) — foreign merchant-guests sing the riches of their homelands in Novgorod's trading hall, a musical pageant of goods crossing seas and borders",
          "excerpt": "In Rimsky-Korsakov's operatic epic the poor gusli-player Sadko rises to become a merchant-adventurer trading across the seas. Its celebrated market scene brings on the foreign traders—the Viking, Indian, and Venetian guests—each singing of the wealth of his distant homeland. The music turns international commerce into spectacle, wealth flowing between peoples divided by oceans and tongues.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Sadko_(opera)_(Rimsky-Korsakov,_Nikolay)"
        }
      ]
    },
    {
      "slug": "egg-producers-price-fixing-settlement",
      "headline": "Egg producers Cal-Maine, Versova and Hickman's to pay $3.3 million and donate 53 million eggs over price-fixing",
      "overview": "Three of the largest US egg producers — Cal-Maine Foods, Versova and Hickman's Egg Ranch — agreed to pay a combined $3.3 million and donate 53 million eggs to settle allegations by the Justice Department and 17 states that they conspired to inflate prices. Prosecutors said the companies coordinated bids to push up a key industry price index between 2022 and 2025, a period when average US egg prices peaked at a record $6.23 a dozen. None of the companies admitted wrongdoing; the donated eggs will go to nonprofits.",
      "genre": "Economy",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOT3paelRnUklQRTVOS2pONEVzNlp5cHNDM05QUUtxS1dVRmFSZmJucEhkNEhvQmw4ZThDb0pta0xvUEFucW9QMWh5YWE1bkxTWmlOOThLRDhvRGhsSkViTDdITjBLanZhbnlfRUUxR0JXX3FBdHRoNXhsc2M4QjI3VU9kd0hfSXhSWXdrYjNDVjlsZXBYa2c?oc=5"
        },
        {
          "name": "CNBC",
          "href": "https://www.cnbc.com/2026/06/30/egg-producers-settle-price-inflation-probe-for-3point3-million.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/egg-producers-price-fixing-settlement.png",
        "alt": "Rows of brown chicken eggs in open cartons.",
        "credit": "Wikimedia Commons"
      },
      "rank": 5,
      "edition": "Afternoon Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Lysias, \"Against the Corn-Dealers\" (c. 386 BC) — Athens prosecutes a ring of grain sellers for hoarding a staple to keep the price high",
          "excerpt": "For, just when you find yourselves worst off for corn, these persons snap it up and refuse to sell it, in order to prevent our disputing about the price: we are to be glad enough if we come away from them with a purchase made at any price, however high.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0154:speech=22:section=15"
        },
        {
          "category": "historical",
          "title": "Ulpian on the lex Julia de annona, Digest of Justinian 48.12.2 (3rd c. AD) — Roman law fining anyone who forms a combine to inflate the price of provisions",
          "excerpt": "By the Julian Law relating to Provisions a penalty is prescribed against him who commits any act, or forms any association by means of which the price of provisions may be increased.",
          "source": "Digest of Justinian (Scott trans., droitromain, Univ. Grenoble)",
          "href": "https://droitromain.univ-grenoble-alpes.fr/Anglica/D48_Scott.htm"
        },
        {
          "category": "literary",
          "title": "Adam Smith, \"The Wealth of Nations\" (1776) — the classic warning that traders who gather together drift into conspiracy to raise prices",
          "excerpt": "People of the same trade seldom meet together, even for merriment and diversion, but the conversation ends in a conspiracy against the public, or in some contrivance to raise prices.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/3300/3300-h/3300-h.htm"
        },
        {
          "category": "literary",
          "title": "Genesis 47:14 (King James Version) — Joseph corners Egypt's grain in the famine and gathers up all the money for the corn men buy",
          "excerpt": "And Joseph gathered up all the money that was found in the land of Egypt, and in the land of Canaan, for the corn which they bought: and Joseph brought the money into Pharaoh's house.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
        },
        {
          "category": "artistic",
          "title": "Joachim Beuckelaer, \"The Four Elements: Air\" (1570) — a lavish poultry-and-egg market whose seductive abundance masks a moral about appetite and gain",
          "excerpt": "Beuckelaer heaps his foreground with the spoils of a produce market: baskets of eggs, stacked cheeses, and plucked and living fowl piled for sale. The tender realism of everyday provisions is deliberately alluring, an invitation to gluttony and greed, while the tiny Prodigal Son squandering his money in the distance supplies the quiet reckoning. The staples of the ordinary table become the stage for a sermon on human appetite.",
          "source": "The National Gallery, London",
          "href": "https://www.nationalgallery.org.uk/paintings/joachim-beuckelaer-the-four-elements-air",
          "image": {
            "src": "/covers/egg-producers-price-fixing-settlement--art.png",
            "alt": "Joachim Beuckelaer's 1570 painting of a crowded poultry market, its foreground heaped with baskets of eggs, cheeses, and fowl for sale",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Richard Wagner, \"Das Rheingold\" (1869) — Alberich curses love to seize the hoard, and the greed for that gold sets the whole reckoning in motion",
          "excerpt": "Das Licht lösch ich euch aus, entreiße dem Riff das Gold, schmiede den rachenden Ring; denn hör' es die Fluth: so verfluch' ich die Liebe!",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
        }
      ]
    },
    {
      "slug": "nasa-swift-telescope-rescue-delay",
      "headline": "Last-minute rocket problem grounds NASA's mission to rescue the aging Swift space telescope",
      "overview": "A rush mission to save NASA's Swift Observatory remained grounded after a Northrop Grumman carrier plane, flying from the Marshall Islands, aborted the release of its Pegasus rocket when engineers spotted a warning in the data. NASA has hired Katalyst Space Technologies, under a $30 million contract, to fly a robotic servicing craft with three articulated arms to boost the 2004 telescope, which studies gamma-ray bursts and exploding stars. Without intervention, Swift is expected to fall back into the atmosphere by October; no new launch date has been set.",
      "genre": "Science",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxPb3lZSEZPSTU3Yy0zTkVFb3NYdjhNZW9rOFNOaVpwb1huRUlUQU1uaHd4LTlXSmxkSEJYTkpja242YmpKcVZNRjZNeEZIaEFJX1Q5MFd6OV93XzNGbFNaZ2RfcW9yc1ZfbVJlN3dTVEV2QlJKWXZlR2FNTzA2WDFXTGtONG1MT1FGQlZzMVhPVGp4VTlFQUl2eV8xemI?oc=5"
        },
        {
          "name": "Space.com",
          "href": "https://www.space.com/space-exploration/launches-spacecraft/nasa-to-launch-ambitious-mission-to-save-a-space-telescope-from-burning-up-in-earths-atmosphere"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/nasa-swift-telescope-rescue-delay.png",
        "alt": "A rendering of NASA's Swift Observatory, a gold-wrapped space telescope with solar panels, against black.",
        "credit": "NASA/Wikimedia Commons"
      },
      "rank": 6,
      "edition": "Afternoon Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Galileo Galilei, \"The Sidereal Messenger\" (1610) — the wonder of a fragile new instrument turned to the heavens, the same discovery drive Swift embodies",
          "excerpt": "After the Moon, I frequently observed other heavenly bodies, both fixed stars and planets, with incredible delight; and, when I saw their very great number, I began to consider about a method by which I might be able to measure their distances apart, and at length I found one.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/46036/46036-h/46036-h.htm"
        },
        {
          "category": "historical",
          "title": "Pliny the Younger, \"Letters\" Book VI (c. 107 CE) — Pliny the Elder orders his ships toward the erupting Vesuvius to rescue the stranded, a daring sail into danger like the Swift servicing run",
          "excerpt": "He ordered the galleys to be put to sea, and went himself on board with an intention of assisting not only Rectina, but the several other towns which lay thickly strewn along that beautiful coast. Hastening then to the place from whence others fled with the utmost terror, he steered his course direct to the point of danger.",
          "source": "Project Gutenberg",
          "href": "https://gutenberg.org/files/2811/2811-h/2811-h.htm"
        },
        {
          "category": "literary",
          "title": "Ovid, \"Metamorphoses\" Book VIII (8 CE) — Icarus climbs too near the sun and plunges into the sea, the archetype of a bright craft falling back to earth",
          "excerpt": "The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air. His face, too, as he called on the name of his father, was received in the azure water, which received its name from him.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
        },
        {
          "category": "literary",
          "title": "Alfred, Lord Tennyson, \"The Eagle\" (1851) — a lord of the high skies who, in an instant, drops like a thunderbolt from his lonely height",
          "excerpt": "He clasps the crag with crooked hands;\nClose to the sun in lonely lands,\nRing'd with the azure world, he stands.\n\nThe wrinkled sea beneath him crawls;\nHe watches from his mountain walls,\nAnd like a thunderbolt he falls.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Eagle_(Tennyson)"
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder, \"Landscape with the Fall of Icarus\" (c. 1560) — the falling flyer slips almost unnoticed into the sea while the world carries on, the quiet stakes of a fading observatory",
          "excerpt": "In Bruegel's panel the plowman, shepherd and fisherman labor on beneath a golden sky while, unseen at the lower right, only two pale legs vanish into the green sea. The catastrophe of a fallen sky-traveler is reduced to a tiny splash at the edge of an indifferent world, a meditation on how easily even a glorious flight ends and is forgotten.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
          "image": {
            "src": "/covers/nasa-swift-telescope-rescue-delay--art.png",
            "alt": "Bruegel's Landscape with the Fall of Icarus: a sunlit harbor and plowman in the foreground, with Icarus's legs disappearing into the sea at lower right",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Joseph Haydn, \"The Heavens Are Telling\" from \"The Creation\" (1798) — a soaring chorus to the glory written across the sky, the very heavens Swift was built to read",
          "excerpt": "The heavens are telling the glory of God,\nThe wonder of his work displays the firmament.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
        }
      ]
    },
    {
      "slug": "alibaba-bans-anthropic-claude-code",
      "headline": "Alibaba orders staff to stop using Anthropic's Claude Code coding tool, citing security concerns",
      "overview": "Alibaba has told employees to stop using Anthropic's Claude Code agent, with a ban taking effect July 10, after scrutiny of code that the Chinese group said could help identify China-linked users. The move follows Anthropic's accusation last month that Alibaba illicitly extracted its models in what it called the largest attack of its kind; Anthropic says the flagged feature was an experiment to curb account abuse. Employees have been directed to Alibaba's in-house coding platform, Qoder.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPc1ozV1JIcjJDWWRCZGZZZEN0Z0p4dHVpMkw3eXBWMF9EMlJOemlKSEg1WVRjV2I5VklmMGFFT3FLblVuTEtKa3dYUXctSmpMS0tQdzJhbmhGTEVlRjhHSWdrUUlXZXJydTN2Q3JQTXRSWUVzVkh5TThmaEtVZURBMzdFTHFHaWI0UE43aUw1QS1vbXRoS3BmRUQ0bExHZ0hDQzRmc09kSkxlNUVDOGxNRXctN2dWWGwtX21DSnN3?oc=5"
        },
        {
          "name": "The Standard",
          "href": "https://www.thestandard.com.hk/innovation/article/336315/Alibaba-to-ban-employees-from-using-Anthropics-coding-tool-source-says"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/alibaba-bans-anthropic-claude-code.png",
        "alt": "A dim data hall of glowing server cabinets with a sealed steel door.",
        "credit": "AI-generated"
      },
      "rank": 7,
      "edition": "Afternoon Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Qianlong Emperor, Edict to King George III (1793) — a rising power spurns a foreign tool, trusting its own house to supply all it needs",
          "excerpt": "As your Ambassador can see for himself, we possess all things. I set no value on objects strange or ingenious, and have no use for your country's manufactures. This then is my answer to your request to appoint a representative at my Court, a request contrary to our dynastic usage, which would only result in inconvenience to yourself.",
          "source": "Fordham Internet Modern History Sourcebook",
          "href": "https://sourcebooks.fordham.edu/mod/1793qianlong.asp"
        },
        {
          "category": "historical",
          "title": "Lord Byron, Speech on the Frame Work Bill, House of Lords (1812) — workers smash the new machines they believe were built to displace and impoverish them",
          "excerpt": "By the adoption of one species of Frame in particular, one man performed the work of many, and the superfluous labourers were thrown out of employment. Yet it is to be observed, that the work thus executed was inferior in quality... The rejected workmen in the blindness of their ignorance, instead of rejoicing at these improvements in arts so beneficial to mankind, conceived themselves to be sacrificed to improvements in mechanism.",
          "source": "Hansard, UK Parliament",
          "href": "https://api.parliament.uk/historic-hansard/lords/1812/feb/27/frame-work-bill"
        },
        {
          "category": "literary",
          "title": "Virgil, \"Aeneid\" Book II (19 BC) — Laocoön warns Troy that the enemy's magnificent gift conceals armed men, and to fear it even as they receive it",
          "excerpt": "'o miseri, quae tanta insania, cives? creditis avectos hostis? aut ulla putatis dona carere dolis Danaum? sic notus Ulixes? aut hoc inclusi ligno occultantur Achivi, aut haec in nostros fabricata est machina muros, inspectura domos venturaque desuper urbi, aut aliquis latet error; equo ne credite, Teucri. quidquid id est, timeo Danaos et dona ferentis.'",
          "source": "The Latin Library",
          "href": "https://www.thelatinlibrary.com/vergil/aen2.shtml"
        },
        {
          "category": "literary",
          "title": "Aeschylus, \"Prometheus Bound\" (c. 5th c. BC) — the theft of a jealously guarded fire, handed to mortals so they might master every art",
          "excerpt": "Chorus: A great benefit was this you gave to mortals. Prometheus: In addition, I gave them fire. Chorus: What! Do creatures of a day now have flame-eyed fire? Prometheus: Yes, and from it they shall learn many arts.",
          "source": "Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010:card=244"
        },
        {
          "category": "artistic",
          "title": "Giovanni Domenico Tiepolo, \"The Procession of the Trojan Horse in Troy\" (c. 1760) — a jubilant city hauls the beautiful foreign engine through its own gates, not seeing the danger sealed inside",
          "excerpt": "Tiepolo paints the fatal moment of welcome: crowds strain at ropes and pulleys to drag the towering wooden horse toward the walls of Troy, banners and trumpets turning a mortal threat into a festival. The Trojans read the object as a trophy and a gift; the viewer, knowing Virgil, sees the hidden soldiers and the smoke of the coming sack. The painting is a study in misplaced trust — a whole people ushering the enemy in with their own hands.",
          "source": "National Gallery, London",
          "href": "https://www.nationalgallery.org.uk/paintings/giovanni-domenico-tiepolo-the-procession-of-the-trojan-horse-into-troy",
          "image": {
            "src": "/covers/alibaba-bans-anthropic-claude-code--art.png",
            "alt": "Oil painting by Giovanni Domenico Tiepolo showing a crowd of Trojans hauling a large wooden horse on a wheeled base toward the city walls, with banners and figures gesturing in celebration.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Ludwig van Beethoven, \"The Creatures of Prometheus,\" Op. 43 (1801) — a ballet on the Titan who steals fire and knowledge and bestows the arts on humankind",
          "excerpt": "Beethoven's only full-length ballet dramatizes the Prometheus myth as a gift of enlightenment: the Titan brings stolen fire down to lifeless clay figures and awakens them into thinking, feeling, art-making beings. Its quicksilver overture bursts open like a spark leaping to tinder, and its finale theme so pleased Beethoven that he reused it in the Eroica Symphony. The music frames technology's transfer as both a liberation and a transgression — power taken from its guardians and placed in new hands.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Die_Geschöpfe_des_Prometheus_Op.43_(Beethoven,_Ludwig_van)"
        }
      ]
    },
    {
      "slug": "eu-lawmaker-pegasus-spyware-hack",
      "headline": "Citizen Lab says Greek ex-MEP Stelios Kouloglou was hacked with Pegasus while probing spyware abuses",
      "overview": "The Toronto-based research group Citizen Lab reported Friday that the iPhone of Stelios Kouloglou, a Greek investigative journalist and member of the European Parliament from 2015 to 2024, was infected with NSO Group's Pegasus spyware at least three times in 2022 and 2023. The hacks came while he sat on the parliamentary committee investigating the illegal use of Pegasus across the EU. Researchers did not name the government behind the attack but linked it to an operator that had targeted journalists across Europe; Kouloglou said he plans to sue NSO Group.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxOSXpnRVhYUFJmVkRtMkFfcEV0MW55b25EQWR0aENNZGt3cnVMcVMyVlhCZmVpRDQ5RUdkMnI0UHBwT051MjFWSThRZzY1Rm14RmFzZWRUQzN6T245Rks4dE5FNUU0ZEVEdmZUbGltX1lQOEEtNUVRM3BHdzZzV1JYRFc5ODJ4bTRCeC1VbE1iSGdPaXlrMFNTLWxoWkV5SURVRmQxTXdEMm9TcnE2U3k1cXdxQTF0UnRGWGQyYkRNUHZHanBLdTFidl84UDlJZw?oc=5"
        },
        {
          "name": "TechCrunch",
          "href": "https://techcrunch.com/2026/07/02/politician-who-investigated-spyware-abuses-had-his-phone-hacked-with-pegasus-spyware/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/eu-lawmaker-pegasus-spyware-hack.png",
        "alt": "A smartphone glowing on a dark desk with a watching eye reflected in its screen.",
        "credit": "AI-generated"
      },
      "rank": 8,
      "edition": "Afternoon Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Jeremy Bentham, \"Panopticon; or, The Inspection-House\" (1791) — the blueprint for an all-seeing eye that keeps the watched under constant, invisible observation",
          "excerpt": "It is obvious that, in all these instances, the more constantly the persons to be inspected are under the eyes of the persons who should inspect them, the more perfectly will the purpose of the establishment have been attained. Ideal perfection, if that were the object, would require that each person should actually be in that predicament, during every instant of time.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Panopticon_or_the_Inspection-House"
        },
        {
          "category": "historical",
          "title": "Tacitus, \"The Annals,\" Book IV (c. 116 AD) — Sejanus's informers reported even a prince's private sighs, the surveillance state that leaves no thought unwatched",
          "excerpt": "Whether the young prince spoke or held his tongue, silence and speech were alike criminal. Every night had its anxieties, for his sleepless hours, his dreams and sighs were all made known by his wife to her mother Livia and by Livia to Sejanus.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_4"
        },
        {
          "category": "literary",
          "title": "Juvenal, \"Satire VI\" (early 2nd c. AD) — 'but who will guard the guardians themselves?', the ancient doubt that the watchers cannot be trusted",
          "excerpt": "audio quid ueteres olim moneatis amici, / 'pone seram, cohibe.' sed quis custodiet ipsos / custodes? cauta est et ab illis incipit uxor. [I hear all this while, the advice my old friends give: 'bolt the door, keep her in.' But who is to guard the guards themselves? The wife plans ahead, and begins with them.]",
          "source": "The Latin Library",
          "href": "https://www.thelatinlibrary.com/juvenal/6.shtml"
        },
        {
          "category": "literary",
          "title": "Ovid, \"Metamorphoses,\" Book I (8 AD) — hundred-eyed Argus set to watch over Io, the all-seeing guardian whose eyes never all close at once",
          "excerpt": "Centum luminibus cinctum caput Argus habebat: / inde suis vicibus capiebant bina quietem, / cetera servabant atque in statione manebant. [Argus had a head encircled with a hundred eyes: from these, two by turns took their rest, while the rest kept watch and stayed on guard.]",
          "source": "Perseus",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0029:book=1:card=622"
        },
        {
          "category": "artistic",
          "title": "Diego Velázquez, \"Mercury and Argus\" (c. 1659) — the all-seeing watchman lulled asleep and about to be slain, the surveillant caught off guard",
          "excerpt": "Velázquez's late canvas catches the myth at its hinge: the hundred-eyed sentinel Argus slumped in heavy sleep, his ceaseless vigilance at last undone, while Mercury creeps in low and barely seen, blade ready, to behead the watchman and free the captive Io. The eye that was meant to see everything is the one taken unaware — the watcher watched, and then destroyed.",
          "source": "Museo del Prado",
          "href": "https://www.museodelprado.es/en/the-collection/art-work/mercury-and-argus/d15f630f-cc1c-42c4-80e6-14087dfcecb5",
          "image": {
            "src": "/covers/eu-lawmaker-pegasus-spyware-hack--art.png",
            "alt": "Velázquez's painting Mercury and Argus: the hundred-eyed watchman Argus asleep while the god Mercury steals in with a sword to kill him",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Jean-Baptiste Lully, \"Isis,\" LWV 54 (1677) — an opera that stages Argus, the hundred-eyed spy, whose relentless watch over Io ends in his own death",
          "excerpt": "Quinault's libretto, drawn from Ovid, hands the nymph Io to jealous Juno's guardian, the hundred-eyed Argus, who never wholly sleeps; Mercury must lull the tireless spy with the tale of Pan and Syrinx before he can strike him down. Lully's tragédie en musique turns the ancient machinery of surveillance — an ever-open eye planted over an innocent — into court spectacle, and Louis XIV's audience read into it the real informers and intrigues of their own watching court.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Isis,_LWV_54_(Lully,_Jean-Baptiste)"
        }
      ]
    },
    {
      "slug": "europe-heatwave-excess-deaths",
      "headline": "At least 3,700 excess deaths recorded in France, Belgium and the Netherlands during June heatwave",
      "overview": "France, Belgium and the Netherlands together recorded at least 3,700 excess deaths during the extreme heat that gripped Europe in late June, national authorities said, warning the preliminary toll could climb. France counted about 2,025 excess deaths, Belgium roughly 1,200 and the Netherlands around 480, with the elderly worst affected. Scientists said the heatwave, among the most severe on record for the continent, was almost certainly intensified by climate change.",
      "genre": "Climate",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMi4gFBVV95cUxQM1dpenBjM01NWi1iUlVVUkZrZEg0ZnNrbHhQTnpSZVYwSlRrLVpFRy1ZbzZNblBHZTR1SFVKMTFGVGZQSTdrY1RIRXRoT0NwVGJDT2dYWDBibmhLOGo3ekJsSkw4TkNuR3hkRTVBeDY1eG9lcE5paDJFdUNZYmQ1Mk9zSkRiS2dRWm9LX2FaWFZkX1NhR1VPSlJTRTZrRlI0Tm5VS2Y1dWRmaHpwbERxUkpWZUEyMUFIZlpWenFnSFJ0SkFLYzZxZVlRTWg5ejBlQUgwcUwwQkRmTmcyMUlGVXJB?oc=5"
        },
        {
          "name": "The Star",
          "href": "https://www.thestar.com.my/news/world/2026/07/03/at-least-3700-excess-deaths-reported-during-heatwave-in-france-belgium-and-netherlands"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/europe-heatwave-excess-deaths.png",
        "alt": "A deserted sun-bleached city square shimmering under a white-hot sky.",
        "credit": "AI-generated"
      },
      "rank": 9,
      "edition": "Afternoon Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Thucydides, \"History of the Peloponnesian War\" (c. 431–404 BCE) — a great city's mass mortality in the hot season, the dying crowding the fountains for water, mirrors the crush of heat deaths in Europe's cities",
          "excerpt": "An aggravation of the existing calamity was the influx from the country into the city, and this was especially felt by the new arrivals. As there were no houses to receive them, they had to be lodged at the hot season of the year in stifling cabins, where the mortality raged without restraint. The bodies of dying men lay one upon another, and half-dead creatures reeled about the streets and gathered round all the fountains in their longing for water.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/ebooks/7142"
        },
        {
          "category": "historical",
          "title": "Gilbert White, \"The Natural History of Selborne\" (1789) — the naturalist's account of the blank, blood-coloured sun and killing heat of the summer of 1783, an omen-laden season felt across all Europe, prefigures a heatwave read as a warning from the sky",
          "excerpt": "The summer of the year 1783 was an amazing and portentous one, and full of horrible phaenomena... The sun, at noon, looked as blank as a clouded moon, and shed a rust-coloured ferruginous light on the ground, and floors of rooms; but was particularly lurid and blood-coloured at rising and setting. All the time the heat was so intense that butchers' meat could hardly be eaten on the day after it was killed.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/ebooks/1408"
        },
        {
          "category": "literary",
          "title": "Ovid, \"Metamorphoses,\" Book II (8 CE) — Phaethon loses the reins of the sun-chariot and scorches the whole earth, cities and peoples consumed, the archetypal image of a sky gone lethally hot",
          "excerpt": "The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction—Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust— the forests and the mountains are destroyed.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D2"
        },
        {
          "category": "literary",
          "title": "Hesiod, \"Works and Days\" (c. 700 BCE) — the season of wearisome heat when Sirius parches the body and \"men are feeblest,\" the ancient knowledge that extreme heat drains human strength first, as it fell hardest on Europe's elderly",
          "excerpt": "But when the artichoke flowers, and the chirping grass-hopper sits in a tree and pours down his shrill song continually from under his wings in the season of wearisome heat, then goats are plumpest and wine sweetest; women are most wanton, but men are feeblest, because Sirius parches head and knees and the skin is dry through heat.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/ebooks/348"
        },
        {
          "category": "artistic",
          "title": "Peter Paul Rubens, \"The Fall of Phaeton\" (c. 1604/1605) — the sun-chariot's horses bolting as the reckless driver plunges, a baroque vision of the heavens set ablaze and thrown out of balance",
          "excerpt": "Painted in Rome by the young Rubens, the canvas seizes the instant the Sun's chariot careens off course: rearing horses twist against a sky ripped by lightning, and human figures tumble headlong as fire and cold collide. It renders in paint the same terror Ovid described—a burning sky and a world scorched when the mechanism that governs the sun's heat spins out of control.",
          "source": "The National Gallery of Art",
          "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
          "image": {
            "src": "/covers/europe-heatwave-excess-deaths--art.png",
            "alt": "Rubens's The Fall of Phaeton: the runaway horses of the sun-chariot rear amid lightning as Phaethon and other figures plunge from a blazing sky",
            "credit": "National Gallery of Art / Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Antonio Vivaldi, \"Summer\" (L'estate) from The Four Seasons, Op. 8 (1725) — the accompanying sonnet opens with man and beast languishing under a blazing sun before a violent storm breaks, heat and its climate-driven fury set to music",
          "excerpt": "Sotto dura Staggion dal Sole accesa / Langue l'huom, langue 'l gregge, ed arde il Pino; / Scioglie il Cucco la Voce, e tosto intesa / Canta la Tortorella e 'l gardelino. (Beneath the harsh season kindled by the sun, man languishes, the flock languishes, and the pine burns.)",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)"
        }
      ]
    },
    {
      "slug": "portugal-croatia-round-of-16",
      "headline": "Ronaldo and Ramos strike as Portugal beat Croatia 2-1 to reach the World Cup round of 16",
      "overview": "Portugal came from behind to beat Croatia 2-1 and advance at the 2026 World Cup, with Cristiano Ronaldo equalizing from the penalty spot in the 68th minute after Ivan Perisic had put Croatia ahead. Gonçalo Ramos headed in Rafael Leão's cross in the 94th minute for a dramatic winner, and Croatia had a 103rd-minute equalizer disallowed for a marginal offside after a VAR review. Portugal will face Spain in the round of 16.",
      "genre": "Culture",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQMlA0N1hodEYwZDBPQVFBSS1vUUo4NER6enZ2YTNKWlhkLXZnbU1HbzFDMjl5MTE0TVZTQnhZNlNCc1UwXzk5aEhNWGVWSk9EcUR0V01qaGRzV25jM3dSMDNfZDAzMDhuYVpENW52eklmZldVNHZPOVhwaDdKcEpIa0RjSDJWUXNGSllvRUZjMlQ1dWY0TElF?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxONHFXWmY3VXZZUjgwWEdMUXg2U1pmam9aTHNfNGp0Zi1iRmE1ZnBVWnpWS2w2Vm0yazlnN285cjQ3QlBIMWRuVlpCWkxDZGg5RVVCSWQwZ2VxOGdBRkI3akJDZnh5eW9SNUdUZndRZkdzOEV1WEZVSnN0Nlp1bHBEYzEyeU85elEwNTVYWGstRFpLYzBNNDlTWDF1OFltbWt0RjJEakhUMHRKeUp2czc5RDVjY19scU44S1U1Mg?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/portugal-croatia-round-of-16.png",
        "alt": "An empty floodlit football stadium at night with a ball on the penalty spot.",
        "credit": "AI-generated"
      },
      "rank": 10,
      "edition": "Afternoon Edition · 3 July 2026",
      "analogies": [
        {
          "category": "literary",
          "title": "Homer, \"Iliad,\" Book XXIII (c. 8th century BC) — the funeral-games footrace decided at the very last stride, like Ramos's 94th-minute winner",
          "excerpt": "But when they were now about to dart forth to win the prize, then Aias slipped as he ran—for Athene hampered him—where was strewn the filth from the slaying of the loud bellowing bulls that swift-footed Achilles had slain in honour of Patroclus... So then much-enduring, goodly Odysseus took up the bowl, seeing he came in the first.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=23:card=740"
        },
        {
          "category": "literary",
          "title": "Pindar, \"Olympian Ode 1\" (476 BC) — the victory ode crowning a champion, the song of triumph a great win still summons",
          "excerpt": "Water is best, and gold, like a blazing fire in the night, stands out supreme of all lordly wealth. But if, my heart, you wish to sing of contests, look no further for any star warmer than the sun, shining by day through the lonely sky, and let us not proclaim any contest greater than Olympia... A victor throughout the rest of his life enjoys honeyed calm, so far as contests can bestow it.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0162:book=O.:poem=1"
        },
        {
          "category": "historical",
          "title": "Herodotus, \"Histories,\" 8.26 (c. 430 BC) — Greeks who contend not for money but for glory, the pure drama behind a knockout tie",
          "excerpt": "When he heard that the prize was not money but a crown, he could not hold his peace, but cried, “Good heavens, Mardonius, what kind of men are these that you have pitted us against? It is not for money they contend but for glory of achievement!”",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126:book=8:chapter=26"
        },
        {
          "category": "historical",
          "title": "Pausanias, \"Description of Greece,\" 8.40 (2nd century AD) — Arrhachion proclaimed Olympic victor at the last gasp, a result hanging on the finest margin like Croatia's disallowed 103rd-minute equalizer",
          "excerpt": "For when he was contending for the wild olive with the last remaining competitor... Arrhachion dislocated his opponent's toe, but expired owing to suffocation; but he who suffocated Arrhachion was forced to give in at the same time because of the pain in his toe. The Eleans crowned and proclaimed victor the corpse of Arrhachion.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0160:book=8:chapter=40"
        },
        {
          "category": "artistic",
          "title": "Myron, \"Discobolus\" (c. 450 BC, Roman marble copy) — the athlete's body coiled to its decisive instant, the timeless image of effort and glory in the games",
          "excerpt": "Myron's lost bronze survives in Roman marble copies like this one in Rome's Palazzo Massimo: a discus-thrower wound to the split-second before release, weight loaded, arm swept back, every muscle gathered for the throw. It froze athletic striving at its peak of tension and became antiquity's enduring emblem of the contest — the whole drama of sport compressed into one held breath, the moment before glory is won or lost.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Discobolus_in_National_Roman_Museum_Palazzo_Massimo_alle_Terme.JPG",
          "image": {
            "src": "/covers/portugal-croatia-round-of-16--art.png",
            "alt": "Roman marble copy of Myron's Discobolus, a nude athlete coiled to throw the discus, in the Palazzo Massimo alle Terme, Rome",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Handel, \"See, the Conqu'ring Hero Comes,\" from Judas Maccabaeus, HWV 63 (1747) — the triumphal chorus hailing the returning victor, the fanfare a hard-won knockout win still earns",
          "excerpt": "See, the conqu'ring hero comes! Sound the trumpets! Beat the drums! Sports prepare! The laurel bring! Songs of triumph to him sing!",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
        }
      ]
    },
    {
      "slug": "riba-jay-morton-president",
      "headline": "Bell Phillips director Jay Morton elected president of the Royal Institute of British Architects",
      "overview": "Jay Morton, a 40-year-old director at London practice Bell Phillips who specializes in housing and regeneration, has been elected the next president of the Royal Institute of British Architects. She defeated environmentalist Duncan Baker-Brown by 329 votes, along with Buttress director Chithra Marsh and academic Austin Williams. Morton becomes president-elect on 1 September 2026 and begins a two-year term in 2027, succeeding Chris Williamson, on a pledge to \"get architects back in the room where decisions are made.\"",
      "genre": "Culture",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/07/03/jay-morton-elected-riba-president/"
        },
        {
          "name": "Architects' Journal",
          "href": "https://www.architectsjournal.co.uk/news/jay-morton-wins-riba-presidential-election"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/riba-jay-morton-president.png",
        "alt": "The pale stone Art Deco facade of the RIBA headquarters at 66 Portland Place in London.",
        "credit": "Wikimedia Commons"
      },
      "rank": 11,
      "edition": "Afternoon Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Vitruvius, \"The Ten Books on Architecture\" (c. 25 BC) — the Roman architect's charter of the profession's enduring duty, invoked afresh as a new RIBA president defines her calling",
          "excerpt": "All these must be built with due reference to durability, convenience, and beauty. Durability will be assured when foundations are carried down to the solid ground and materials wisely and liberally selected; convenience, when the arrangement of the apartments is faultless and presents no hindrance to use, and when each class of building is assigned to its suitable and appropriate exposure; and beauty, when the appearance of the work is pleasing and in good taste, and when its members are in due proportion according to correct principles of symmetry.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/20239/20239-h/20239-h.htm"
        },
        {
          "category": "historical",
          "title": "Plutarch, \"Life of Pericles\" (c. 100 AD) — the Athenian building program that set architects at the heart of civic decision and shared the public wealth with the people, mirroring Morton's housing-and-regeneration mission",
          "excerpt": "he boldly suggested to the people projects for great constructions, and designs for works which would call many arts into play and involve long periods of time, in order that the stay-at-homes, no whit less than the sailors and sentinels and soldiers, might have a pretext for getting a beneficial share of the public wealth.",
          "source": "LacusCurtius (University of Chicago)",
          "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Pericles*.html"
        },
        {
          "category": "literary",
          "title": "The First Book of Kings (King James Version, 1611) — Solomon raising the house of the LORD, the archetype of the master-builder shaping a great work for the whole community",
          "excerpt": "And the house, when it was in building, was built of stone made ready before it was brought thither: so that there was neither hammer nor ax nor any tool of iron heard in the house, while it was in building.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
        },
        {
          "category": "literary",
          "title": "Henrik Ibsen, \"The Master Builder\" (1892) — Solness turning from soaring church-towers to \"homes for human beings,\" echoing Morton's focus on housing the people",
          "excerpt": "No. I build no more church-towers now. Nor churches either. HILDA. What do you build then? SOLNESS. Homes for human beings.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/4070/4070-h/4070-h.htm"
        },
        {
          "category": "artistic",
          "title": "Thomas Cole, \"The Architect's Dream\" (1840) — the architect reclining amid the monuments of every age, dreaming the built world into being, as a new president imagines the city to come",
          "excerpt": "Cole paints an architect sprawled atop a colossal column, gazing across a dreamscape of Egyptian, Greek, Gothic, and Roman monuments stacked to the horizon. The whole history of building unfurls as a single vision, at once the profession's inheritance and its unbuilt future. It renders architecture as an act of imagination before it is ever an act of stone.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Thomas_Cole_-_Architect%E2%80%99s_Dream_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/riba-jay-morton-president--art.png",
            "alt": "The Architect's Dream by Thomas Cole (1840): an architect reclines on a giant column beside a great book, surveying a fantasy landscape of Egyptian, classical, and Gothic monuments.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Modest Mussorgsky, \"Pictures at an Exhibition — The Great Gate of Kiev\" (1874) — music raised from an architect's unbuilt design for a monumental city gate, the drawing become a monument in sound",
          "excerpt": "The suite's triumphant finale was inspired by Viktor Hartmann's design for a grand gate to the city of Kiev, crowned with a cupola shaped like a Slavonic helmet. The gate was never built in stone, yet Mussorgsky's chords erect it in sound, bells pealing over a broad processional theme. It is the architect's vision surviving as monument long after the plans were shelved.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Pictures_at_an_Exhibition_(Mussorgsky,_Modest)"
        }
      ]
    },
    {
      "slug": "albania-tirana-protest-violence",
      "headline": "Albanian police fire tear gas as anti-government 'flamingo revolution' protest turns violent in Tirana",
      "overview": "Police in Tirana fired tear gas and pepper spray at demonstrators who pelted them with rocks, eggs and bottles outside Albania's parliament, in the latest of more than a month of daily protests dubbed the \"flamingo revolution.\" Authorities said 12 officers were injured and 18 protesters detained. The movement opposes a luxury coastal development linked to Jared Kushner, US President Donald Trump's son-in-law, and demands the resignation of Prime Minister Edi Rama.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxQQ3dOWDZmd0ladzhFQkZLZmI3TnRCNnpxczRBSXR1M29FN0gzcDNtTHoyYlFUN210QWRnNVowWEZhcDhPVFQ4ajBrVFRsTHBZc2tMaktLdXQ4NThBaU56M0dXQWhJT2xFLTBzLTlGX0tOSkRObGZpVVFzeHBCQUZmODcxdEtrUlJKTmRfZFZvdENfNDVJQ1NucWVjVU1kZEZvY3c4dEozQmg3V08wM245cU9IQWxYNWVW?oc=5"
        },
        {
          "name": "The Hill",
          "href": "https://thehill.com/homenews/ap/ap-international/ap-albanian-police-use-tear-gas-and-pepper-spray-as-tirana-protest-turns-violent/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/albania-tirana-protest-violence.png",
        "alt": "A smoke-filled night square before a government building with an overturned barrier.",
        "credit": "AI-generated"
      },
      "rank": 12,
      "edition": "Afternoon Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Livy, \"History of Rome\" (c. 27 BC) — the plebeians secede en masse against their rulers, just as Tirana's crowds mass daily outside parliament",
          "excerpt": "They, by the advice of one Sicinius, retired, without the orders of the consuls, to the sacred mount, beyond the river Anio, three miles from the city... There without any leader, their camp being fortified with a rampart and trench, remaining quiet, taking nothing but what was necessary for sustenance, they kept themselves for several days, neither being attacked, nor attacking others. Great was the panic in the city, and through mutual fear all was suspense.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/19725/pg19725.txt"
        },
        {
          "category": "historical",
          "title": "Thomas Carlyle, \"The French Revolution\" (1837) — the roaring people storm a fortress of authority, mirroring the fury massing on Rama's parliament",
          "excerpt": "On, then, all Frenchmen that have hearts in their bodies! Roar with all your throats, of cartilage and metal, ye Sons of Liberty; stir spasmodically whatsoever of utmost faculty is in you, soul, body or spirit; for it is the hour! Smite, thou Louis Tournay, cartwright of the Marais, old-soldier of the Regiment Dauphine; smite at that Outer Drawbridge chain, though the fiery hail whistles round thee!",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/1301/1301-h/1301-h.htm"
        },
        {
          "category": "literary",
          "title": "Shakespeare, \"Coriolanus\" (c. 1608) — armed citizens rise against a proud ruling class, echoing the crowd demanding the powerful yield",
          "excerpt": "FIRST CITIZEN. You are all resolved rather to die than to famish? ALL. Resolved, resolved! FIRST CITIZEN. First, you know Caius Martius is chief enemy to the people. ALL. We know't, we know't! FIRST CITIZEN. Let us kill him, and we'll have corn at our own price. Is't a verdict? ALL. No more talking on't; let it be done. Away, away!",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/ebooks/1535"
        },
        {
          "category": "literary",
          "title": "Victor Hugo, \"Les Misérables\" (1862) — the Paris barricade of 1832 taken and re-taken, mirroring the running street battle outside Albania's parliament",
          "excerpt": "Men fire in a square, in a passage, in a blind alley; they take and re-take the barricade; blood flows, the grape-shot riddles the fronts of the houses, the balls kill people in their beds, corpses encumber the streets.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/135/pg135.txt"
        },
        {
          "category": "artistic",
          "title": "Eugène Delacroix, \"Liberty Leading the People\" (1830) — an insurgent crowd surges over the barricade against the throne, the visual archetype of the 'flamingo revolution'",
          "excerpt": "Delacroix's vast canvas commemorates the July Revolution that toppled Charles X: a bare-breasted Liberty, tricolour in one hand and musket in the other, strides across a barricade of paving stones and fallen bodies. Behind her a ragged crowd of workers, a boy with pistols and a top-hatted bourgeois press forward through gunsmoke. It is the enduring image of a people rising as one to force a ruler from power.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
          "image": {
            "src": "/covers/albania-tirana-protest-violence--art.png",
            "alt": "Delacroix's painting of Liberty, a bare-breasted woman holding the French tricolour and a musket, leading an armed crowd over a barricade of bodies through gunsmoke",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Rouget de Lisle, \"La Marseillaise\" (1792) — the revolutionary anthem summoning citizens to arms against tyranny's bloody standard",
          "excerpt": "Allons, enfans de la Patrie ! / Le jour de gloire est arrivé. / Contre nous de la tyrannie / L'étendard sanglant est levé... / Aux armes, citoyens ! formez vos bataillons. / Marchons, qu'un sang impur abreuve nos sillons !",
          "source": "Wikisource",
          "href": "https://fr.wikisource.org/wiki/La_Marseillaise_(1792)"
        }
      ]
    },
    {
      "slug": "ecb-lagarde-early-exit",
      "headline": "ECB's Christine Lagarde says she may leave before her term ends to join France's political debate",
      "overview": "European Central Bank President Christine Lagarde said she could not rule out leaving the ECB before her term expires in October 2027, telling Les Échos it was \"possible\" she would step down early to weigh in on France's presidential debate. Lagarde, who had previously likened resigning to a captain abandoning ship in a storm, said a European voice needed to be heard, while ruling out running in next spring's election herself. Her comments revived speculation about an early departure from Frankfurt.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxPcjdpM2hGZElscmk5djBuNE80MlBmN0h5R1MtZWN1YXpwbThZY1FvSXR5S0J4UWxHel9zVDA1Q29DWWZVUm4tTU52bFVaSlZOYmNzVWNEYWoxamtYZ1RGY3hEdF9OQnJQZ0pXTWlLUWhkYzlCM0p5TXVaTDNRa3FJbElmaDhXaXhkWnpQc2wwZG5lSkg5dWVDOEstY3k?oc=5"
        },
        {
          "name": "CNBC",
          "href": "https://www.cnbc.com/2026/07/03/christine-lagarde-ecb-france-election.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/ecb-lagarde-early-exit.png",
        "alt": "A glass central-bank tower at dusk beside a river with a small sailboat below.",
        "credit": "AI-generated"
      },
      "rank": 13,
      "edition": "Afternoon Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Plutarch, \"Life of Solon\" (c. 100 AD) — the lawgiver who reformed Athens' coinage and debts, then sailed away for ten years rather than stay to be pressed into unmaking his work",
          "excerpt": "He saw that to do this was out of the question, and that not to do it would bring odium upon him, and wishing to be wholly rid of these perplexities and to escape from the captiousness and censoriousness of the citizens (for 'in great affairs,' as he says himself, 'it is difficult to please all'), he made his ownership of a vessel an excuse for foreign travel, and set sail, after obtaining from the Athenians leave of absence for ten years. In this time he hoped they would be accustomed to his laws.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0063:chapter=25"
        },
        {
          "category": "historical",
          "title": "Livy, \"History of Rome,\" Book 3 (c. 27 BC) — Cincinnatus summoned from the plough to the helm of the state, the servant who takes up power only at the hour of peril and lays it down again",
          "excerpt": "There, whether leaning on a stake in a ditch which he was digging, or in the employment of ploughing, engaged at least on some rural work, as is certain, after mutual salutations had passed, being requested by the ambassadors to put on his gown, and listen to the commands of the senate... he bids his wife Racilia immediately to bring his toga from his hut. As soon as he put this on and came forward, after first wiping off the dust and sweat, the ambassadors, congratulating him, unite in saluting him as dictator.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0145:book=3:chapter=26"
        },
        {
          "category": "literary",
          "title": "Horace, \"Odes\" I.14 (23 BC) — \"O ship, new waves will bear you back to sea\": the ship of state begged not to venture again into the storm it can barely weather",
          "excerpt": "O luckless bark! new waves will force you back / To sea. O, haste to make the haven yours! / E'en now, a helpless wrack, / You drift, despoil'd of oars... Your trouble late made sick this heart of mine, / And still I love you, still am ill at ease. / O, shun the sea, where shine / The thick-sown Cyclades!",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0025:book=1:poem=14"
        },
        {
          "category": "literary",
          "title": "Aristophanes, \"The Frogs\" (405 BC) — the city that scorns its sterling old coin for base new bronze, just as it casts aside its worthiest guardians for lesser men",
          "excerpt": "Many times it seems to us the city has done the same thing with the best and the brightest of its citizens as with the old coinage and the new gold currency. For these, not counterfeit at all, but the finest it seems of all coins, and the only ones of the proper stamp, of resounding metal amongst Greeks and foreigners everywhere, we never use, but the inferior bronze ones instead, minted just yesterday or the day before with the basest stamp.",
          "source": "Perseus",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0032:card=718"
        },
        {
          "category": "artistic",
          "title": "Quentin Matsys, \"The Money Changer and His Wife\" (1514) — the exacting weighing of gold and coin, the guardianship of value rendered as a scale held level between duty and distraction",
          "excerpt": "In Matsys's Flemish panel a money changer bends over his table, delicately balancing gold coins on a small brass scale, his eyes fixed on the fragile equilibrium of the pans. Beside him his wife lets her prayer book fall open, her fingers straying from the illuminated Virgin toward the glittering coins, her gaze pulled to the gold. The painting turns the keeping of money into a moral drama of attention and temptation, weighing the coin of the realm against the pull of other callings.",
          "source": "The Louvre",
          "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
          "image": {
            "src": "/covers/ecb-lagarde-early-exit--art.png",
            "alt": "Quentin Matsys, The Money Changer and His Wife (1514): a man weighs gold coins on a small scale while his wife, prayer book in hand, turns her gaze to the money.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Richard Wagner, \"Der fliegende Holländer\" (1843) — the sea-captain bound to the storm-tossed helm, longing for release from a voyage he cannot simply abandon",
          "excerpt": "Wagner's overture opens on howling strings and brass that conjure a ship pitching in a North Sea gale, the doomed Dutchman condemned to roam the oceans and permitted ashore only once every seven years. The music sets the captain's yearning for deliverance against the relentless surge of the sea that will not let him rest at any harbor. It is a portrait of command as burden: the helmsman who dreams of stepping off the deck yet remains lashed by duty to the storm.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Der_fliegende_Holl%C3%A4nder,_WWV_63_(Wagner,_Richard)"
        }
      ]
    },
    {
      "slug": "iiss-russia-shadow-fleet-drone-campaign",
      "headline": "Russia likely launched drones over Europe from disguised shadow-fleet ships, IISS report finds",
      "overview": "A report published Thursday by the International Institute for Strategic Studies plotted 144 suspected drone sightings across NATO members including Germany, France, Belgium, the Netherlands, the UK and Denmark between 2024 and 2026, peaking in late 2025 and forcing temporary closures of several European airports. The IISS concluded it is highly likely that Russia used sanctions-dodging \"shadow fleet\" tankers as covert launch platforms, in a gray-zone campaign designed to stay below the threshold of a collective NATO response that it called a \"strategic failure\" for European air defences.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTE1Wd2lXcWMwR2JGT0xxSG5EakhLN3V2YWxxeFkwN1FMY1d3LW83dGRoMFU5R0xUOEk0cDAtVVdxVmM5ZWp0T1daWXN5OXRudEkwR1Vqa1FkRTktY3BNZDB2LWRRWUlicUE?oc=5"
        },
        {
          "name": "Washington Post",
          "href": "https://www.washingtonpost.com/national/2026/07/02/russia-drones-europe-defense/a9aba20e-75f0-11f1-b665-5f8be87f3787_story.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/iiss-russia-shadow-fleet-drone-campaign.png",
        "alt": "A lone oil tanker riding low on a grey open sea under an overcast sky.",
        "credit": "Wikimedia Commons"
      },
      "lead": true,
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "E. Keble Chatterton, \"Q-Ships and Their Story\" (1922) — Royal Navy decoy vessels disguised as harmless merchantmen to hunt U-boats",
          "excerpt": "The basic plan was for the Admiralty to take up a number of merchantmen and fishing craft, arm them with a few light quick-firing guns, and then send them forth to cruise in likely submarine areas, flying neutral colours.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/54338/54338-h/54338-h.htm",
          "image": {
            "src": "/covers/iiss-russia-shadow-fleet-drone-campaign--historical-1.png",
            "alt": "Painting of the Q-ship HMS Probus, a Royal Navy decoy disguised as a harmless sailing brigantine, exchanging fire with a German U-boat.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "Sun Tzu, \"The Art of War,\" translated by Lionel Giles (1910) — on deception as the foundation of warfare",
          "excerpt": "All warfare is based on deception. Hence, when able to attack, we must seem unable; when using our forces, we must seem inactive; when we are near, we must make the enemy believe we are far away; when far away, we must make him believe we are near. Hold out baits to entice the enemy.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/132/132-h/132-h.htm",
          "image": {
            "src": "/covers/iiss-russia-shadow-fleet-drone-campaign--historical-2.png",
            "alt": "Bamboo slips inscribed with Sun Tzu's Art of War, unearthed at Yinque Mountain and dated to the second century BC.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Virgil, \"Aeneid,\" Book II, translated by John Dryden (1697) — Laocoön warns of the armed foe hidden inside the Trojan Horse",
          "excerpt": "This hollow Fabrick either must inclose, Within its blind Recess, our secret Foes; Or tis an Engine rais'd above the Town, T' o'erlook the Walls, and then to batter down. Somewhat is sure design'd; by Fraud or Force; Trust not their Presents, nor admit the Horse.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II",
          "image": {
            "src": "/covers/iiss-russia-shadow-fleet-drone-campaign--literary-1.png",
            "alt": "The Laocoön Group: the marble statue of the Trojan priest and his sons caught in the coils of sea serpents after he warned against the wooden horse.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner\" (1834) — the spectre-bark crewed by Death and Life-in-Death",
          "excerpt": "And is that Woman all her crew? Is that a DEATH? and are there two? Is DEATH that woman's mate? Her lips were red, her looks were free, Her locks were yellow as gold: Her skin was as white as leprosy, The Night-Mare LIFE-IN-DEATH was she, Who thicks man's blood with cold.",
          "source": "Project Gutenberg",
          "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm",
          "image": {
            "src": "/covers/iiss-russia-shadow-fleet-drone-campaign--literary-2.png",
            "alt": "Gustave Doré's engraving for The Rime of the Ancient Mariner: the ship dwarfed by towering arches of ice as the albatross circles overhead.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Giovanni Domenico Tiepolo, \"The Procession of the Trojan Horse in Troy\" (c. 1773), National Gallery, London",
          "excerpt": "Tiepolo paints the fatal moment of triumph: crowds strain at ropes to haul the towering wooden horse through Troy's breached wall, mistaking a hidden strike force for a votive gift. The disguised vessel glides in beneath a bright sky while the city celebrates its own undoing. It is the perfect emblem of an attack that arrives dressed as something harmless, welcomed past the very defences meant to stop it.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Giovanni_Domenico_Tiepolo_-_The_Procession_of_the_Trojan_Horse_in_Troy_-_WGA22382.jpg",
          "image": {
            "src": "/covers/iiss-russia-shadow-fleet-drone-campaign--art.png",
            "alt": "Oil painting of Trojans hauling the giant wooden horse through the walls into their city as crowds celebrate",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Richard Wagner, \"Der fliegende Holländer\" (The Flying Dutchman), WWV 63 (1843) — the phantom ship condemned to roam the seas",
          "excerpt": "Wagner's opera conjures a spectral vessel out of storm and surging strings, a blood-red-sailed ship that materialises from the dark and vanishes again as if it were never there. Its cursed captain haunts the shipping lanes unseen, deniable, always just beyond reckoning. The music makes audible the dread of an adversary who comes and goes like a ghost, leaving only the memory of the threat behind.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Der_fliegende_Holl%C3%A4nder,_WWV_63_(Wagner,_Richard)",
          "image": {
            "src": "/covers/iiss-russia-shadow-fleet-drone-campaign--music.png",
            "alt": "Albert Pinkham Ryder's painting The Flying Dutchman: the phantom ship looming out of a churning golden sea, painted after hearing Wagner's opera.",
            "credit": "Wikimedia Commons"
          }
        }
      ],
      "rank": 14
    },
    {
      "slug": "zuckerberg-meta-ai-agents-slower",
      "headline": "Zuckerberg tells Meta staff AI agent development is progressing slower than expected",
      "overview": "At an internal town hall on Thursday, Meta chief executive Mark Zuckerberg said work on AI agents had not \"accelerated in the way we expected\" over the past four months and acknowledged that a recent reorganization had yet to deliver its promised gains. The restructuring cut about 10 percent of Meta's workforce and moved some 7,000 employees into AI workflow teams; the company still plans to spend up to $145 billion on AI infrastructure this year, with Zuckerberg saying he expects larger returns within three to six months.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxOdGNldFRXdDZERDRIN2R3QnRmV1JuUW9saEVNdDVmTEZwdXZLSlM0MHRzN21IMlN2RTNTaDBYa1Z1YS1kVE11SUZJLUhlQktoTm1nVVp0a0x0UzFNbW5nQnhOSXJRRlkwMjY1NEVyRFVHVk5aTktfeDZ5YjRqWWxKbm5EZU1zaHFjVkh1U3hNQVBORWtVaWFyOTZUSkI1V2pfMHEyMS1pcXFwN1lN?oc=5"
        },
        {
          "name": "TechCrunch",
          "href": "https://techcrunch.com/2026/07/02/mark-zuckerberg-tells-staff-that-ai-agents-havent-progressed-as-quickly-as-hed-hoped/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/zuckerberg-meta-ai-agents-slower.png",
        "alt": "The Meta headquarters campus in Menlo Park, its infinity-loop logo mounted at the entrance.",
        "credit": "Wikimedia Commons"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Charles Mackay, \"The South-Sea Bubble,\" Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841)",
          "excerpt": "It seemed at that time as if the whole nation had turned stockjobbers.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_2"
        },
        {
          "category": "historical",
          "title": "Ferdinand de Lesseps and the French Panama Canal (1879-1889)",
          "excerpt": "Fresh from his triumph at Suez, the seventy-four-year-old de Lesseps promised investors he would carve a sea-level canal through Panama in eight years, and hundreds of thousands of French savers believed him. The jungle answered with landslides, malaria, and yellow fever that buried some twenty thousand workers, while the money vanished faster than the earth could be moved. By 1889 the company had collapsed into bankruptcy and scandal, a monument to a visionary who mistook past success for a guarantee of the next.",
          "source": "Wikipedia",
          "href": "https://en.wikipedia.org/wiki/Ferdinand_de_Lesseps"
        },
        {
          "category": "literary",
          "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818; revised 1831)",
          "excerpt": "I had worked hard for nearly two years, for the sole purpose of infusing life into an inanimate body. For this I had deprived myself of rest and health. I had desired it with an ardour that far exceeded moderation; but now that I had finished, the beauty of the dream vanished, and breathless horror and disgust filled my heart.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Frankenstein,_or_the_Modern_Prometheus_(Revised_Edition,_1831)/Chapter_5"
        },
        {
          "category": "literary",
          "title": "Johann Wolfgang von Goethe, \"The Pupil in Magic\" (Der Zauberlehrling, 1797; trans. Edgar Alfred Bowring, 1853)",
          "excerpt": "Ah, he's coming! see, / Great is my dismay! / Spirits raised by me / Vainly would I lay!",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic"
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
          "excerpt": "Bruegel's colossal tower spirals into the clouds, swarming with cranes, scaffolds, and toiling figures, yet its tilting arches already betray the flaw that will bring it down. The grandest construction project ever imagined is depicted mid-failure, its ambition visibly outrunning the stone beneath it. It is the perfect emblem of a monument begun in confidence that no amount of labor or expenditure can finish on schedule.",
          "source": "Kunsthistorisches Museum, Vienna (via Wikimedia Commons)",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
          "image": {
            "src": "/covers/zuckerberg-meta-ai-agents-slower--art.png",
            "alt": "Pieter Bruegel the Elder's 1563 painting The Tower of Babel: an immense, partly ruined spiral tower rising into clouds above a harbor, crowded with scaffolding and tiny laborers.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Thomas Cole, The Course of Empire: Destruction (1836)",
          "excerpt": "The fourth canvas in Cole's five-part cycle shows the gleaming metropolis of the previous scene engulfed in flame, its marble colonnades toppling as invaders storm across a shattered bridge. The same civilization that had crowned itself at the height of consummation is now consumed by the forces it could no longer command. Cole paints the moment when accumulated splendor and overreach curdle into ruin, the reckoning that follows every empire convinced its ascent would never stall.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg"
        }
      ],
      "rank": 15
    },
    {
      "slug": "herculaneum-scroll-ai-virtual-unwrapping",
      "headline": "Researchers virtually unwrap a carbonized Herculaneum scroll, revealing a likely Stoic philosophical text",
      "overview": "An international team led by University of Kentucky computer scientist Brent Seales, working through the Vesuvius Challenge, used artificial intelligence and synchrotron X-ray imaging to read a papyrus scroll charred by the AD 79 eruption of Mount Vesuvius and long deemed physically impossible to open. The recovered columns discuss ethics, human nature and moral progress and name Aristocreon, a disciple of the Stoic philosopher Chrysippus, placing the treatise firmly in the Stoic tradition of the second century BC.",
      "genre": "Science",
      "sources": [
        {
          "name": "Artforum",
          "href": "https://www.artforum.com/news/a-i-deciphers-ancient-carbonized-herculaneum-scroll-1234753958/"
        },
        {
          "name": "Vesuvius Challenge",
          "href": "https://scrollprize.org/firstscroll"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/herculaneum-scroll-ai-virtual-unwrapping.png",
        "alt": "A blackened, tightly rolled ancient papyrus scroll carbonized by volcanic heat.",
        "credit": "Artforum"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Lettre à M. Dacier relative à l'alphabet des hiéroglyphes phonétiques (Jean-François Champollion, 1822)",
          "excerpt": "Il s'agit de la série des hiéroglyphes qui, faisant exception à la nature générale des signes de cette écriture, étaient doués de la faculté d'exprimer les sons des mots, et ont servi à inscrire sur les monuments publics de l'Égypte, les titres, les noms et les surnoms des souverains grecs ou romains.",
          "source": "Wikisource (French)",
          "href": "https://fr.wikisource.org/wiki/Lettre_%C3%A0_M._Dacier_relative_%C3%A0_l%E2%80%99alphabet_des_hi%C3%A9roglyphes_phon%C3%A9tiques"
        },
        {
          "category": "historical",
          "title": "Discovery of the Dead Sea Scrolls (Qumran caves, from 1947)",
          "excerpt": "A shepherd chasing a stray goat into a limestone cave stumbles instead onto jars holding words that had waited in the dark for two thousand years. From eleven caves above the Dead Sea came nearly a thousand manuscripts, the oldest surviving copies of texts long known only through later hands. Like the charred Herculaneum roll, they proved that silence is not the same as loss, and that patient recovery can hand an ancient community its voice back.",
          "source": "Wikipedia",
          "href": "https://en.wikipedia.org/wiki/Dead_Sea_Scrolls"
        },
        {
          "category": "literary",
          "title": "Letters, Book VI.16, to Tacitus (Pliny the Younger, c. AD 107; Melmoth–Hutchinson translation)",
          "excerpt": "Those who were looking at the cloud from some distance could not make out from which mountain it was rising — it was afterwards discovered to have been Mount Vesuvius — but in likeness and form it more closely resembled a pine-tree than anything else, for what corresponded to the trunk was of great length and height, and then spread out into a number of branches. At times it looked white, and at other times dirty and spotted, according to the quantity of earth and cinders that were shot up.",
          "source": "Pliny the Younger, Letters (public-domain translation)",
          "href": "https://cmuntz.hosted.uark.edu/texts/pliny-the-younger/the-eruption-of-vesuvius.html"
        },
        {
          "category": "literary",
          "title": "Meditations, Book II (Marcus Aurelius, c. AD 170–180; George Long translation)",
          "excerpt": "We are made for co-operation, like feet, like hands, like eyelids, like the rows of the upper and lower teeth. To act against one another then is contrary to nature.",
          "source": "The Internet Classics Archive (MIT)",
          "href": "https://classics.mit.edu/Antoninus/meditations.2.two.html"
        },
        {
          "category": "artistic",
          "title": "The Last Day of Pompeii (Karl Bryullov, 1830–1833)",
          "excerpt": "Bryullov freezes the instant the sky turns to ash: statues topple, mothers shield children, and a lurid red glow floods a city already condemned. The eruption that buried these figures is the same catastrophe that carbonized the Herculaneum library, sealing both flesh and text in the dark. Where the painter imagines the moment of loss, the scanner now reverses it, coaxing a legible sentence out of the very ruin Bryullov mourned.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/herculaneum-scroll-ai-virtual-unwrapping--art.png",
            "alt": "Karl Bryullov's painting The Last Day of Pompeii, showing terrified citizens fleeing collapsing statues under a red, ash-filled sky during the eruption of Vesuvius",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "L'ultimo giorno di Pompei (Giovanni Pacini, opera, 1825)",
          "excerpt": "Half a century before Bryullov painted it, Pacini set the doom of Pompeii to music, letting orchestra and chorus swell toward the moment the mountain opens. The eruption is not a backdrop but the drama's climax, a rush of sound standing in for the fire that would soon fossilize an entire civilization. To read a scroll sealed by that same eruption is to answer the opera's roar with a quiet, recovered human sentence.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/L%27ultimo_giorno_di_Pompei_(Pacini,_Giovanni)"
        }
      ],
      "rank": 16
    },
    {
      "slug": "who-ebola-treatment-trial-drc",
      "headline": "WHO begins clinical trial of two Ebola therapeutics in DR Congo as outbreak passes 430 deaths",
      "overview": "The World Health Organization announced Thursday that the first patient has been enrolled in a clinical trial of two potential treatments for the Bundibugyo strain of Ebola driving the current outbreak in the Democratic Republic of Congo, which has no approved vaccine or therapy. The DRC has recorded 1,406 confirmed cases and 438 deaths as of 30 June; the trial is coordinated by the country's Institut National de Recherche Biomédicale with Belgium's Institute of Tropical Medicine and the University of Oxford.",
      "genre": "Science",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c75ykve4zzxo"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQNmwwT2tQZjJqVmNHRVVubHZFR2VRZXV5V3FTNGVFQkZHNWYtdi1HdmNtTmx3RGliTXBWN21IeFRXaTYtYTZaQ3NpeE9zNW92R3dYemh4MlcwOWVDZ0w1V0RjRzN6S1p5RjNONzNJRkZZSHA1ZFZIeWFuYVozbHFPb21VNGZlOGpZdDBoVU54YnJKSHFOS0NJUE9OMnVIRnZkYVE?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/who-ebola-treatment-trial-drc.png",
        "alt": "A health worker in full protective gear at an Ebola treatment centre.",
        "credit": "BBC"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Edward Jenner, \"An Inquiry into the Causes and Effects of the Variolae Vaccinae\" (1798)",
          "excerpt": "But what renders the Cow-pox virus so extremely singular, is, that the person who has been thus affected is for ever after secure from the infection of the Small Pox; neither exposure to the variolous effluvia, nor the insertion of the matter into the skin, producing this distemper.",
          "source": "Project Gutenberg (public domain)",
          "href": "https://www.gutenberg.org/cache/epub/29414/pg29414.txt"
        },
        {
          "category": "historical",
          "title": "John Snow, \"On the Mode of Communication of Cholera\" (2nd ed., 1855)",
          "excerpt": "I had an interview with the Board of Guardians of St. James's parish, on the evening of Thursday, 7th September, and represented the above circumstances to them. In consequence of what I said, the handle of the pump was removed on the following day.",
          "source": "UCLA Department of Epidemiology, John Snow archive (reproducing Snow's 1855 text, public domain)",
          "href": "https://epi-snow.ph.ucla.edu/Stream2_BSPoutbreak_a.html"
        },
        {
          "category": "literary",
          "title": "Daniel Defoe, \"A Journal of the Plague Year\" (1722)",
          "excerpt": "But the following week it returned again, and the distemper was spread into two or three other parishes, viz., St Andrew's, Holborn; St Clement Danes; and, to the great affliction of the city, one died within the walls, in the parish of St Mary Woolchurch.",
          "source": "Project Gutenberg (public domain)",
          "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt"
        },
        {
          "category": "literary",
          "title": "Thucydides, \"History of the Peloponnesian War,\" Book II (the Plague of Athens, c. 431 BC; Crawley translation)",
          "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often; nor did any human art succeed any better.",
          "source": "Wikisource (public domain)",
          "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder, \"The Triumph of Death\" (c. 1562)",
          "excerpt": "Bruegel's panoramic panel spreads an army of skeletons across a scorched land, herding kings, peasants and lovers alike toward a great coffin-lidded trap. It is the danse macabre rendered as total warfare, disease as an unstoppable social leveller that no rank or remedy can escape. Against such a vision, the modern clinic in the DRC is precisely the counter-image: a deliberate human refusal to let contagion have the last word.",
          "source": "Museo del Prado, via Wikimedia Commons (public domain)",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Triumph_of_Death_-_WGA3389.jpg",
          "image": {
            "src": "/covers/who-ebola-treatment-trial-drc--art.png",
            "alt": "Pieter Bruegel the Elder's painting 'The Triumph of Death', showing skeletal armies driving people of all stations toward death across a devastated landscape.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Arnold Böcklin, \"The Plague\" (Die Pest) (1898)",
          "excerpt": "Böcklin personifies pestilence as a winged, skeletal rider astride a monstrous dragon-beast, sweeping low through a shadowed medieval street as townsfolk fall beneath it. Painted as the artist himself feared an epidemic in his own city, it distils the terror of an airborne, uncontainable death. The image throws into relief what the WHO trial attempts: to answer that faceless dread with a named strain, a protocol and a treatment.",
          "source": "Kunstmuseum Basel, via Wikimedia Commons (public domain)",
          "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg"
        }
      ],
      "rank": 17
    },
    {
      "slug": "spain-austria-world-cup-round-of-16",
      "headline": "Spain beat Austria 3-0 with an Oyarzabal double to reach the 2026 World Cup round of 16",
      "overview": "Mikel Oyarzabal scored twice and Pedro Porro added a third as the reigning European champions eased past Austria 3-0 to advance to the last 16 of the World Cup. Oyarzabal opened the scoring in the 34th minute and struck again shortly before full time, taking his tournament tally to four goals, as Spain set up a last-16 tie against the winner of Portugal or Croatia.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxPRkl3T2g0eXg0d0oxQUMtV3VfbDFLVHR5WGxrcWdVanlEOXRjZVg1MDNuaW5NWjR5ai1qUnNLTl9HNXE1WjFxZWY3VWJ1R2kybmV5QlVwU2pVcWNRLVZIdXVTZGRwRnBveEpueEhNLTVFZUxHTjJVXzdSUjg0OF9VeGJxWTFmQUdWNFBiTlhWQ1gwRHhqWk9GWWVoY1ZoQjNyOUxmTVVB?oc=5"
        },
        {
          "name": "ESPN",
          "href": "https://www.espn.com/soccer/story/_/id/49251007/spain-austria-fifa-world-cup-2026-round-32-mikel-oyarzabal"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/spain-austria-world-cup-round-of-16.png",
        "alt": "Spain forward Mikel Oyarzabal in the national team's red shirt.",
        "credit": "Wikimedia Commons"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Pausanias, Description of Greece 5.8 — the first victors at Olympia (2nd century AD)",
          "excerpt": "So Iolaus won the chariot-race, and Iasius, an Arcadian, the horse-race; while of the sons of Tyndareus one won the foot-race and Polydeuces the boxing-match. Of Heracles himself it is said that he won victories at wrestling and the pancratium.",
          "source": "Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0160:book=5:chapter=8"
        },
        {
          "category": "historical",
          "title": "Pausanias, Description of Greece 6.14 — Milo of Croton (2nd century AD)",
          "excerpt": "Milo won six victories for wrestling at Olympia, one of them among the boys; at Pytho he won six among the men and one among the boys. He came to Olympia to wrestle for the seventh time, but did not succeed in mastering Timasitheus, a fellow-citizen who was also a young man, and who refused, moreover, to come to close quarters with him.",
          "source": "Perseus Digital Library",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0160:book=6:chapter=14"
        },
        {
          "category": "literary",
          "title": "Pindar, Olympian Ode 1, trans. Ernest Myers (1874)",
          "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice: for hence cometh the glorious hymn and entereth into the minds of the skilled in song, so that they celebrate the son of Kronos.",
          "source": "The Extant Odes of Pindar, trans. Ernest Myers, Project Gutenberg",
          "href": "https://www.gutenberg.org/cache/epub/10717/pg10717.txt"
        },
        {
          "category": "literary",
          "title": "Homer, Iliad, Book 23 (the funeral games of Patroclus), trans. Samuel Butler",
          "excerpt": "The first prize he offered was for the chariot races- a woman skilled in all useful arts, and a three-legged cauldron that had ears for handles, and would hold twenty-two measures.",
          "source": "Homer, The Iliad, Book XXIII, trans. Samuel Butler (The Internet Classics Archive, MIT)",
          "href": "http://classics.mit.edu/Homer/iliad.23.xxiii.html"
        },
        {
          "category": "artistic",
          "title": "Panathenaic prize amphora with runners, attributed to the Kleophrades Painter (c. 500 BC), Louvre F277",
          "excerpt": "This black-figure amphora was itself the trophy: victors at the Panathenaic Games received such vessels, filled with sacred olive oil, painted with the very event they had won. On its belly a file of nude runners strides forward at full sprint, muscles taut, frozen forever in the instant of the race. Like this vase, Spain's win becomes an image of the contest as spectacle — athletic effort transformed into an object of admiration and glory.",
          "source": "Wikimedia Commons / Musée du Louvre, F277",
          "href": "https://commons.wikimedia.org/wiki/File:Panathenaic_amphora_Kleophrades_Louvre_F277.jpg",
          "image": {
            "src": "/covers/spain-austria-world-cup-round-of-16--art.png",
            "alt": "Ancient Greek black-figure Panathenaic prize amphora showing a row of nude male runners sprinting in profile, attributed to the Kleophrades Painter, c. 500 BC",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "George Frideric Handel, \"See, the Conqu'ring Hero Comes,\" from Judas Maccabaeus, libretto by Thomas Morell (1747)",
          "excerpt": "See, the conqu'ring hero comes! Sound the trumpets, beat the drums. ... Myrtle wreaths, and roses twine, to deck the hero's brow divine.",
          "source": "Handel / Thomas Morell, chorus \"See, the Conqu'ring Hero Comes\" (public-domain libretto)",
          "href": "https://drsethward.wordpress.com/2013/03/14/see-the-conquering-hero-comes-and-the-hebrew-hanukkah-tradition/"
        }
      ],
      "rank": 18
    },
    {
      "slug": "nyc-record-culture-budget-mamdani",
      "headline": "New York City budget allocates a record $323 million for culture under Mayor Mamdani",
      "overview": "New York City's adopted fiscal 2027 budget directs a record $323.8 million to the Department of Cultural Affairs, $24.2 million above the previous high, Mayor Zohran Mamdani and City Council Speaker Julie Menin announced. The package funds institutions including the Metropolitan Museum of Art, the American Museum of Natural History and the Brooklyn Museum, and establishes a Cultural Stability Fund distributing $10 million a year to organizations facing emergencies.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Artforum",
          "href": "https://www.artforum.com/news/mamdani-allocates-a-record-323-million-for-culture-1234753986/"
        },
        {
          "name": "The Art Newspaper",
          "href": "https://www.theartnewspaper.com/2026/07/02/new-york-city-budget-2027-record-culture-funding"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/nyc-record-culture-budget-mamdani.png",
        "alt": "The neoclassical Fifth Avenue facade and steps of the Metropolitan Museum of Art.",
        "credit": "Wikimedia Commons"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Plutarch, \"Life of Pericles\" (1st–2nd c. AD; John Dryden translation)",
          "excerpt": "That which gave most pleasure and ornament to the city of Athens, and the greatest admiration and even astonishment to all strangers, and that which now is Greece's only evidence that the power she boasts of and her ancient wealth are no romance or idle story, was his construction of the public and sacred buildings. For every particular piece of his work was immediately, even at that time, for its beauty and elegance, antique; and yet in its vigour and freshness looks to this day as if it were just executed.",
          "source": "The Internet Classics Archive, MIT",
          "href": "http://classics.mit.edu/Plutarch/pericles.html"
        },
        {
          "category": "historical",
          "title": "The WPA Federal Art Project / Federal Project Number One (1935–1943)",
          "excerpt": "In the depths of the Depression, Franklin Roosevelt's government did something no American administration had done before or since: it put artists, musicians, actors, and writers on the federal payroll. Over eleven years, tax dollars underwrote thousands of murals, canvases, and concerts, treating culture not as a luxury to be cut but as work worth funding and as a public good to be shared with ordinary citizens. It remains the boldest experiment in state patronage of the arts in the nation's history.",
          "source": "U.S. National Archives, \"A New Deal for the Arts\" exhibit",
          "href": "https://www.archives.gov/exhibits/new_deal_for_the_arts/"
        },
        {
          "category": "literary",
          "title": "Percy Bysshe Shelley, \"A Defence of Poetry\" (written 1821; published 1840)",
          "excerpt": "Poets are the hierophants of an unapprehended inspiration; the mirrors of the gigantic shadows which futurity casts upon the present; the words which express what they understand not; the trumpets which sing to battle and feel not what they inspire; the influence which is moved not, but moves. Poets are the unacknowledged legislators of the world.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/A_Defence_of_Poetry"
        },
        {
          "category": "literary",
          "title": "Giorgio Vasari, \"Lives of the Most Excellent Painters, Sculptors, and Architects\" — Life of Sandro Botticelli (1550/1568)",
          "excerpt": "He executed various works in the Medici Palace for the elder Lorenzo, more particularly a figure of Pallas on a shield wreathed with vine branches, whence flames are proceeding: this he painted of the size of life. He must have died of hunger had he not been supported by Lorenzo de' Medici, for whom he had worked at the small hospital of Volterra and other places, who assisted him while he lived.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Lives_of_the_Most_Excellent_Painters,_Sculptors,_and_Architects/Sandro_Botticelli"
        },
        {
          "category": "artistic",
          "title": "Sandro Botticelli, \"Primavera\" (c. 1480)",
          "excerpt": "Painted for the Medici and long housed in a family villa, Botticelli's Primavera turns a private fortune into an enduring public wonder: Venus presides over a flowering orange grove as the Three Graces dance and Flora scatters blossoms. It is patronage made visible, wealth transmuted into myth and beauty. Five centuries on, the money that Lorenzo de' Medici spent survives only as this shimmering vision of spring, the true dividend of civic magnificence.",
          "source": "Galleria degli Uffizi, Florence / Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_La_Primavera_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/nyc-record-culture-budget-mamdani--art.png",
            "alt": "Botticelli's Primavera: Venus in a blossoming orange grove, flanked by the dancing Three Graces, Flora scattering flowers, Mercury, and Zephyr, a Medici-commissioned Renaissance masterpiece",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Aaron Copland, \"Fanfare for the Common Man\" (1942)",
          "excerpt": "Commissioned by conductor Eugene Goossens for the Cincinnati Symphony as a wartime tribute, Copland answered not with a salute to generals but with a fanfare for the ordinary citizen. Solemn drumbeats and gong strokes give way to a rising brass theme of plain, democratic grandeur. It is the sound of a nation deciding that its common people, and the culture made for them, are worthy of ceremony and public expense.",
          "source": "The Aaron Copland Fund for Music (official works page)",
          "href": "https://www.aaroncopland.com/works/fanfare-for-the-common-man/"
        }
      ],
      "rank": 19
    },
    {
      "slug": "canada-defence-security-resilience-bank-nato",
      "headline": "Canada aims to unveil about 10 founding nations for a new global defence bank at NATO summit",
      "overview": "Canada expects to announce roughly 10 founding members of a proposed Defence, Security and Resilience Bank at next week's NATO summit in Turkey, its lead negotiator said, part of Prime Minister Mark Carney's push for a coalition of \"middle powers\" amid a fracturing US-led order. The bank would raise up to $133 billion in low-cost financing for allied defence; so far only Luxembourg, its planned European base, has publicly signed on.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOZ1JFOEl5RnFBT0phSHFEdGYzeURhcUJCNHM3MFI1czF5Q1d0Y0JXOVNUaEt6cGtTeWowSl9yRjFGNFZrbC02enRzQmpFbUMtNnNrcTVlZ1BfSzdEelAtLTEyS2kyTDhieFJSck5STmFKcWtXU3Rwdzdkb0pKUDVOb0hGOFBpQV85aHNGNFFXakREaXc2dHdLcnYzRVprV0d1aTN1LXMydlZuMFFFbmhPckJRZk5MZw?oc=5"
        },
        {
          "name": "The Globe and Mail",
          "href": "https://www.theglobeandmail.com/business/article-canada-founding-partners-global-defence-bank-nato-summit/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/canada-defence-security-resilience-bank-nato.png",
        "alt": "The angular glass exterior of NATO's headquarters in Brussels.",
        "credit": "Wikimedia Commons"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "History of the Peloponnesian War, Book 1.96 (the founding of the Delian League) — Thucydides, trans. Richard Crawley (1874)",
          "excerpt": "Now was the time that the office of 'Treasurers for Hellas' was first instituted by the Athenians. These officers received the tribute, as the money contributed was called. The tribute was first fixed at four hundred and sixty talents. The common treasury was at Delos, and the congresses were held in the temple.",
          "source": "Perseus Digital Library, Tufts University",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0200%3Abook%3D1%3Achapter%3D96"
        },
        {
          "category": "historical",
          "title": "Remarks at Harvard University (the Marshall Plan speech) — George C. Marshall (1947)",
          "excerpt": "Its purpose should be the revival of a working economy in the world so as to permit the emergence of political and social conditions in which free institutions can exist. Our policy is directed not against any country or doctrine but against hunger, poverty, desperation and chaos.",
          "source": "George C. Marshall Foundation",
          "href": "https://www.marshallfoundation.org/the-marshall-plan/speech/"
        },
        {
          "category": "literary",
          "title": "\"The Bundle of Sticks,\" The Fables of Aesop — trans. Joseph Jacobs (1894)",
          "excerpt": "\"Untie the faggots,\" said the father, \"and each of you take a stick.\" When they had done so, he called out to them: \"Now, break,\" and each stick was easily broken. \"You see my meaning,\" said their father. Union gives strength.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/The_Fables_of_%C3%86sop_(Jacobs)/The_Bundle_of_Sticks"
        },
        {
          "category": "literary",
          "title": "Henry V, Act IV, Scene 3 (the St Crispin's Day speech) — William Shakespeare (c. 1599)",
          "excerpt": "We few, we happy few, we band of brothers; / For he to-day that sheds his blood with me / Shall be my brother; be he ne'er so vile, / This day shall gentle his condition:",
          "source": "The Complete Works of William Shakespeare, MIT",
          "href": "https://shakespeare.mit.edu/henryv/henryv.4.3.html"
        },
        {
          "category": "artistic",
          "title": "Minerva Protects Pax from Mars ('Peace and War') — Peter Paul Rubens (1629–30)",
          "excerpt": "Painted while Rubens was serving as a peace envoy between Spain and England, the canvas shows Minerva, goddess of wisdom, thrusting back the armoured war-god Mars so that Pax can suckle an infant and pour out her riches among gathered children. Its argument is plain: only when wisdom shields peace from war does prosperity flow. It is a fitting emblem for allies who would band together and pool their treasure to keep the peace.",
          "source": "Wikimedia Commons / National Gallery, London",
          "href": "https://commons.wikimedia.org/wiki/File:Rubens_peace-war.jpg",
          "image": {
            "src": "/covers/canada-defence-security-resilience-bank-nato--art.png",
            "alt": "Rubens's allegory 'Minerva Protects Pax from Mars': Minerva pushes back the war-god Mars while Pax, seated, offers her bounty to a group of children.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "\"Ode to Joy\" (An die Freude) — Friedrich Schiller (1785), set by Ludwig van Beethoven in Symphony No. 9 (1824)",
          "excerpt": "Your magics bind again / What custom has strictly parted. / All men become brothers / Where your tender wing lingers.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Ode_to_Joy"
        }
      ],
      "rank": 20
    },
    {
      "slug": "pjm-heat-dome-data-center-curtailment",
      "headline": "US emergency orders let largest grid PJM curtail data centers as heat dome pushes power demand toward records",
      "overview": "With a heat dome over the eastern United States driving grid operator PJM Interconnection toward a record power demand near 166,000 megawatts, two Department of Energy emergency orders now authorize it to force data centers and other large users onto backup generators to protect households. The measures underscore how AI-driven data-center growth, concentrated in northern Virginia, is straining a grid where wholesale capacity prices have jumped roughly elevenfold in two years.",
      "genre": "Climate",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxPaHlpWW5jMk9haXBWdy1mWWVfTzdzeUREeGt3Z29ULUp6OUR5THFTSGRNMHpDUFR3WWNmR2p0TlNoRFpDbk1NTmZTZ2VUVnF4YTRhUTVRYnNLLUF6anM0TW0yN1EwQ3dCQ2VRV19hMFFXdzVhQ1VwbVNDa2RvRnQ0NklLWlI0RDRFVGNoSEdmRUlUUQ?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNUEg0aE5oal81M0kxNWpVaTV0TWVNOU40OGhibWdyNFdOV2xLR2xYSDQ4Y0ZjWDdLOGd6ZklQOERqNVFnWU9lLXNCYms5TWJNR2c3Wmw4bUk0bWIyRVVHTVMwVGRhZkxPcExkZEhXdVlQcXdHbTlfRjZNNFkxa1I1T0Z3d0RuelBpdVdwb3dISjcxMEpvVWFtU0pDX0tHMGlZdzRZSEtjNE5meEVzR29aeU1TdnJhaF9XRUE?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/pjm-heat-dome-data-center-curtailment.png",
        "alt": "High-voltage transmission towers and power lines receding across a hazy landscape.",
        "credit": "Wikimedia Commons"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The coal-and-steam Industrial Revolution (Britain, c. 1760–1840)",
          "excerpt": "When steam engines replaced water and muscle, industry entered a self-reinforcing spiral of appetite: factories demanded more engines, engines demanded more coal, and the mines and furnaces roared to keep pace. Britain's steam power leapt from an estimated 10,000 horsepower in 1800 to 210,000 by 1815, each new machine another mouth to feed. Like today's data centers multiplying across the grid, the first industrial age discovered that harnessing concentrated energy does not sate hunger for it but inflames it.",
          "source": "Wikipedia, \"Industrial Revolution\"",
          "href": "https://en.wikipedia.org/wiki/Industrial_Revolution"
        },
        {
          "category": "historical",
          "title": "The Northeast Blackout of 2003",
          "excerpt": "On a hot August afternoon in 2003, a single unnoticed fault in Ohio cascaded across three states in minutes, and within hours 256 power plants had tripped offline, leaving roughly 55 million people across the Northeast and Ontario in the dark. A software alarm that failed silently meant operators never saw the collapse coming until the lights were already gone. It remains the starkest modern warning of what PJM's emergency curtailments aim to prevent: an overstretched grid that fails not gradually but all at once.",
          "source": "Wikipedia, \"Northeast blackout of 2003\"",
          "href": "https://en.wikipedia.org/wiki/Northeast_blackout_of_2003"
        },
        {
          "category": "literary",
          "title": "Aeschylus, \"Prometheus Bound\" (5th century BCE; Smyth translation, 1926)",
          "excerpt": "\"I hunted out and stored in fennel stalk the stolen source of fire that hath proved to mortals a teacher in every art and a means to mighty ends.\"",
          "source": "Wikisource — Aeschylus (Smyth 1927) v1, \"Prometheus Bound\"",
          "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/Prometheus_Bound"
        },
        {
          "category": "literary",
          "title": "Mary Shelley, \"Frankenstein; or, The Modern Prometheus\" (1818)",
          "excerpt": "\"It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet.\"",
          "source": "Page by Page Books — Mary Shelley, Frankenstein, Chapter 5",
          "href": "https://www.pagebypagebooks.com/Mary_Wollstonecraft_Shelley/Frankenstein/Chapter_5_p1.html"
        },
        {
          "category": "artistic",
          "title": "Philip James de Loutherbourg, \"Coalbrookdale by Night\" (1801)",
          "excerpt": "De Loutherbourg painted the Madeley Wood (Bedlam) Furnaces blazing against a black Shropshire night, their fires staining the sky an infernal red as smoke boils over the darkened valley. It is the founding image of the \"industrial sublime\" — a scene at once awesome and terrible, celebrating human power over fire while shuddering at the furnace it has kindled. Two centuries on, its glow reads like a premonition of northern Virginia's server farms burning through the grid to feed the machines.",
          "source": "Wikipedia, \"Coalbrookdale by Night\" (Science Museum, London)",
          "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._002.jpg",
          "image": {
            "src": "/covers/pjm-heat-dome-data-center-curtailment--art.png",
            "alt": "Coalbrookdale by Night (1801) by Philip James de Loutherbourg: iron furnaces blazing fiery red against a dark night sky, smoke billowing over the Shropshire valley",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "J.M.W. Turner, \"Rain, Steam and Speed – The Great Western Railway\" (1844)",
          "excerpt": "Turner dissolves a steam locomotive into a storm of rain, mist and speed as it hurtles across Maidenhead Bridge, technology and weather blurred into a single overwhelming force. First shown at the Royal Academy in 1844, it is less a scene than an allegory of the sublime collision between the powers of nature and the powers of the machine. The heat dome bearing down on PJM stages that same confrontation — human invention racing headlong against an elemental force it cannot outrun.",
          "source": "Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Rain_Steam_and_Speed_the_Great_Western_Railway.jpg"
        }
      ],
      "rank": 21
    },
    {
      "slug": "scattered-spider-suspect-arrested-finland",
      "headline": "Alleged Scattered Spider hacker Peter Stokes, 19, extradited from Finland to face US charges",
      "overview": "US prosecutors charged Peter Stokes, a 19-year-old dual US-Estonian national, with computer intrusion, conspiracy and fraud after his arrest in Finland in April and extradition; he appeared in federal court in Chicago and was ordered held. Prosecutors link the Scattered Spider group to more than 100 network intrusions and over $100 million in ransom payments, including an $8 million cryptocurrency demand to a luxury jewellery retailer and the 2024 Transport for London cyber-attack.",
      "genre": "Technology",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cwy0we4yw1lo"
        },
        {
          "name": "US Department of Justice",
          "href": "https://www.justice.gov/opa/pr/alleged-member-criminal-cyber-hacking-group-scattered-spider-arrested-finland-and-extradited"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/scattered-spider-suspect-arrested-finland.png",
        "alt": "A darkened computer keyboard lit by the glow of a screen.",
        "credit": "BBC"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "A General History of the Pyrates (Captain Charles Johnson, 1724) — the death of Blackbeard",
          "excerpt": "Black-beard received a Shot into his Body from the Pistol that Lieutenant Maynard discharg'd, yet he stood his Ground, and fought with great Fury, till he received five and twenty Wounds, and five of them by Shot. At length, as he was cocking another Pistol, having fired several before, he fell down dead.",
          "source": "Wikisource — A General History of the Pyrates, Chapter 3, \"Of Captain Teach, alias Black-Beard\"",
          "href": "https://en.wikisource.org/wiki/A_General_History_of_the_Pyrates/Chapter_3"
        },
        {
          "category": "historical",
          "title": "The Newgate Calendar — Jonathan Wild, the \"Thief-Taker General\" hanged at Tyburn (1725)",
          "excerpt": "OF all the thieves that ever infested London this man was the most notorious. That eminent vagabond, Barnfylde Moore Carew, was recognized as 'King of the Beggars:'—in like manner may the name and memory of Jonathan Wild be ever held in abhorrence as 'The Prince of Robbers.'",
          "source": "The Newgate Calendar (ExClassics online edition), entry for Jonathan Wild",
          "href": "https://www.exclassics.com/newgate/ng175.htm"
        },
        {
          "category": "literary",
          "title": "Ovid, Metamorphoses, Book VI (8 AD) — the weaver Arachne transformed into a spider",
          "excerpt": "the slender fingers clung to her side as legs; the rest was belly. Still from this she ever spins a thread; and now, as a spider, she exercises her old-time weaver-art.",
          "source": "Wikisource — Metamorphoses (Miller translation), Book VI",
          "href": "https://en.wikisource.org/wiki/Metamorphoses_(Miller)/Book_VI"
        },
        {
          "category": "literary",
          "title": "Mary Howitt, \"The Spider and the Fly\" (1829)",
          "excerpt": "\"Will you walk into my parlor?\" said the spider to the fly; \"'Tis the prettiest little parlor that ever you may spy. The way into my parlor is up a winding stair, And I have many curious things to show when you are there.\"",
          "source": "Family Friend Poems — \"The Spider and the Fly\" by Mary Howitt",
          "href": "https://www.familyfriendpoems.com/poem/the-spider-and-the-fly-by-mary-howitt"
        },
        {
          "category": "artistic",
          "title": "Odilon Redon, \"The Smiling Spider\" (L'Araignée souriante), c.1881",
          "excerpt": "Redon's charcoal noir looms out of the dark: a bloated, hairy spider that walks on human-like legs and turns to face the viewer with a wide, toothy, unsettling grin. The predator is charming and monstrous at once — an image of menace disguised as mirth, the perfect emblem of a lure that smiles as it waits at the center of its web.",
          "source": "Wikimedia Commons — File:Redon smiling-spider.jpg",
          "href": "https://commons.wikimedia.org/wiki/File:Redon_smiling-spider.jpg",
          "image": {
            "src": "/covers/scattered-spider-suspect-arrested-finland--art.png",
            "alt": "Odilon Redon's charcoal work 'The Smiling Spider', depicting a large dark spider with a grinning human-like face and long legs on a pale tiled floor",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "The Rolling Stones, \"The Spider and the Fly\" (Jagger/Richards, 1965)",
          "excerpt": "Cut quickly at the tail end of a 1965 session and buried as the B-side to \"(I Can't Get No) Satisfaction,\" this slow Jimmy Reed–style blues borrows its title straight from Mary Howitt's poem. Over a lazy harmonica riff Jagger narrates a post-gig seduction as pure predator and prey, the spider patiently working its web while the fly convinces itself it is the one in control.",
          "source": "Wikipedia — \"The Spider and the Fly\" (song)",
          "href": "https://en.wikipedia.org/wiki/The_Spider_and_the_Fly_(song)"
        }
      ],
      "rank": 22
    },
    {
      "slug": "louisiana-ag-murrill-indicted-new-orleans-courts",
      "headline": "Louisiana Attorney General Liz Murrill indicted on 16 counts over threats in New Orleans court dispute",
      "overview": "An Orleans Parish grand jury returned a 16-count indictment, eight counts of malfeasance and eight of intimidation, against Louisiana Attorney General Liz Murrill, accusing her of threatening New Orleans officials who opposed a law abolishing the elected criminal-court clerk's post. A judge set bond at $400,000; Republican Governor Jeff Landry said he would pardon Murrill \"as fast as the law allows.\"",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPbFl5Vmk1eF9Oa3FWMnFVRnFseEhGaDVXRkJQNktLRkM5c0J0RjFBNHNDVWJJTnpnN1l2QndlMjhtYmRPSTBmM3JUcTNEWDRiX0trcTdONXVvXzZ1Qm1SR1h2bUtwTlFmYkQxSUk3Mk91ZlZVVXFQd1FLQVlwR3ExYloxS2pSeFVVeGM4RTI0RHhUUGREdXI5SE9wVmg5UUE3RDBZVVNvOGFvMFc4Vnc?oc=5"
        },
        {
          "name": "The Hill",
          "href": "https://thehill.com/homenews/state-watch/5952272-louisiana-attorney-general-indicted/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/louisiana-ag-murrill-indicted-new-orleans-courts.png",
        "alt": "The domed Louisiana State Capitol tower rising in Baton Rouge.",
        "credit": "Wikimedia Commons"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Cicero, \"In Verrem\" (Against Verres), Second Pleading, Book 5, sec. 170 (70 BC)",
          "excerpt": "To bind a Roman citizen is a crime, to flog him is an abomination, to slay him is almost an act of murder: to crucify him is - what?",
          "source": "Cicero, Against Verres, 2.5.170 (Yonge/Greenwood translation), via Attalus.org",
          "href": "https://www.attalus.org/cicero/verres25_3.html"
        },
        {
          "category": "historical",
          "title": "The Impeachment of Warren Hastings, Governor-General of Bengal (trial 1788-1795)",
          "excerpt": "When Edmund Burke rose in Westminster Hall to prosecute the most powerful colonial administrator of his age, he insisted that high office is a public trust that can be forfeited by its abuse. For seven years the Governor-General of Bengal answered charges of extortion, coercion and the bending of law to private power. Hastings was ultimately acquitted, but the spectacle established that no official stands above the reach of accountability.",
          "source": "Wikipedia, \"Impeachment of Warren Hastings\"",
          "href": "https://en.wikipedia.org/wiki/Impeachment_of_Warren_Hastings"
        },
        {
          "category": "literary",
          "title": "William Shakespeare, \"Measure for Measure,\" Act 2, Scene 2 (c. 1604)",
          "excerpt": "O, it is excellent / To have a giant's strength; but it is tyrannous / To use it like a giant. ... but man, proud man, / Drest in a little brief authority, / Most ignorant of what he's most assured, / His glassy essence, like an angry ape, / Plays such fantastic tricks before high heaven / As make the angels weep.",
          "source": "The Complete Works of William Shakespeare (MIT), Measure for Measure, 2.2",
          "href": "http://shakespeare.mit.edu/measure/measure.2.2.html"
        },
        {
          "category": "literary",
          "title": "Robert Penn Warren, \"All the King's Men\" (1946)",
          "excerpt": "Warren's Pulitzer-winning novel traces the Louisiana strongman Willie Stark from idealistic country lawyer to a governor who rules through patronage, blackmail and intimidation. Around him the machinery of the state becomes an instrument for punishing enemies and burying secrets, until the law itself bends to the will of the man who commands it. Modeled on Huey Long, Stark embodies how populist power in Louisiana can curdle into the very corruption it once vowed to destroy.",
          "source": "Wikipedia, \"All the King's Men\"",
          "href": "https://en.wikipedia.org/wiki/All_the_King%27s_Men"
        },
        {
          "category": "artistic",
          "title": "Honore Daumier, \"Les Gens de Justice: M. l'Avocat a rendu pleine justice...\" (1846)",
          "excerpt": "In his savage lithograph series on the men of the law, Daumier strips the robed advocate of every pretense, showing a self-satisfied officer of justice preening over a verdict rendered for his own advantage. The caption's boast that the lawyer has done \"full justice\" drips with irony, exposing how the machinery of the courts can be turned to serve the powerful rather than the wronged. It is a portrait of the corrupt magistrate as a type: authority cloaked in the language of righteousness.",
          "source": "Honore Daumier, \"Les Gens de Justice\" lithograph series (The Phillips Collection), via Wikimedia Commons",
          "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Les_Gens_de_Justice-_M._L'Avocat_a_rendu_pleine_Justice..._-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/louisiana-ag-murrill-indicted-new-orleans-courts--art.png",
            "alt": "Honore Daumier lithograph from 'Les Gens de Justice' depicting a smug, robed lawyer boasting that he has rendered full justice",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Ludwig van Beethoven, \"Fidelio\" (opera, premiered 1805)",
          "excerpt": "Beethoven's only opera sets its drama in a prison ruled by Don Pizarro, a governor who has secretly jailed the nobleman Florestan for daring to expose his crimes. To conceal his abuse of power before an official inspection, Pizarro plots to murder his prisoner and erase the evidence of his tyranny. The opera stages justice turned against the just, and its triumph comes only when a higher authority arrives to strip the corrupt official of his stolen power.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
        }
      ],
      "rank": 23
    },
    {
      "slug": "snohetta-theodore-roosevelt-presidential-library",
      "headline": "Snohetta's mass-timber Theodore Roosevelt Presidential Library opens in the North Dakota badlands",
      "overview": "The Theodore Roosevelt Presidential Library, designed by Snohetta, opens on July 4 in Medora, North Dakota, on a 93-acre site beside Theodore Roosevelt National Park. The 96,000-square-foot building of mass timber, reclaimed wood, low-carbon concrete and rammed earth sits beneath a 121,000-square-foot living-prairie roof and is pursuing the rigorous Living Building certification under the principle \"The Library is the Landscape.\"",
      "genre": "Culture",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/07/02/theodore-roosevelt-presidential-library-snohetta-north-dakot/"
        },
        {
          "name": "Architectural Record",
          "href": "https://www.architecturalrecord.com/articles/18287-the-theodore-roosevelt-presidential-library-designed-by-snohetta-is-set-to-open-in-the-north-dakota-badlands"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/snohetta-theodore-roosevelt-presidential-library.png",
        "alt": "A low timber-and-earth building with a living-prairie roof settling into the North Dakota badlands.",
        "credit": "Snohetta"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Theodore Roosevelt, \"Conservation as a National Duty\" (1908)",
          "excerpt": "Any right thinking father earnestly desires and strives to leave his son both an untarnished name and a reasonable equipment for the struggle of life. So this Nation as a whole should earnestly desire and strive to leave to the next generation the national honor unstained and the national resources unexhausted.",
          "source": "Voices of Democracy: The U.S. Oratory Project (University of Maryland)",
          "href": "https://voicesofdemocracy.umd.edu/theodore-roosevelt-conservation-as-a-national-duty-speech-text/"
        },
        {
          "category": "historical",
          "title": "Theodore Roosevelt, Seventh Annual Message to Congress (December 3, 1907)",
          "excerpt": "The conservation of our natural resources and their proper use constitute the fundamental problem which underlies almost every other problem of our National life. We must maintain for our civilization the adequate material basis without which that civilization can not exist. We must show foresight, we must look ahead.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Theodore_Roosevelt%27s_Seventh_State_of_the_Union_Address"
        },
        {
          "category": "literary",
          "title": "Henry David Thoreau, \"Walking\" (1862)",
          "excerpt": "The West of which I speak is but another name for the Wild; and what I have been preparing to say is, that in Wildness is the preservation of the World.",
          "source": "Wikisource",
          "href": "https://en.wikisource.org/wiki/Walking"
        },
        {
          "category": "literary",
          "title": "John Muir, \"Our National Parks\" (1901)",
          "excerpt": "Thousands of tired, nerve-shaken, over-civilized people are beginning to find out that going to the mountains is going home; that wildness is a necessity; and that mountain parks and reservations are useful not only as fountains of timber and irrigating rivers, but as fountains of life.",
          "source": "Sierra Club, John Muir Exhibit",
          "href": "https://vault.sierraclub.org/john_muir_exhibit/writings/our_national_parks/chapter_1.aspx"
        },
        {
          "category": "artistic",
          "title": "Thomas Moran, \"Green River Cliffs, Wyoming\" (1881)",
          "excerpt": "Moran's luminous oil renders the eroded, banded buttes of the Wyoming badlands as a natural cathedral rising from the plain, the geology itself made monumental. Painted from sketches made on his Western expeditions, the canvas helped convince a nation that these arid, sculpted lands were worth preserving. Its wide, horizon-spanning format frames the West as landscape and memory at once.",
          "source": "National Gallery of Art (via Wikimedia Commons)",
          "href": "https://commons.wikimedia.org/wiki/File:Thomas_Moran,_Green_River_Cliffs,_Wyoming,_1881,_NGA_82648.jpg",
          "image": {
            "src": "/covers/snohetta-theodore-roosevelt-presidential-library--art.png",
            "alt": "Thomas Moran's 1881 oil painting Green River Cliffs, Wyoming, showing red and ochre eroded cliffs and buttes rising above a river and plain in the American West",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Aaron Copland, \"Billy the Kid\" ballet (1938)",
          "excerpt": "Copland opens and closes the ballet with \"The Open Prairie,\" a slow, wide-interval theme that seems to stretch the orchestra across an unbounded horizon, weaving in cowboy tunes like \"Git Along Little Dogies.\" The music invented a distinctly American sound for the West: spare, luminous, and vast. Like a building that becomes its landscape, the score dissolves the frontier tale back into the land it came from.",
          "source": "Aaron Copland (official works catalogue), Boosey & Hawkes",
          "href": "https://www.aaroncopland.com/works/billy-the-kid-ballet/"
        }
      ],
      "rank": 24
    },
    {
      "slug": "tibetan-flag-self-immolation-un-headquarters",
      "headline": "Man dies after setting himself on fire while holding a Tibetan flag outside UN headquarters in New York",
      "overview": "A man died on Thursday after setting himself on fire on the street in front of the United Nations headquarters in New York while holding a Tibetan flag, police and Tibetan activists said, after officers responding to a 911 call found him with severe burns. Activists said he had made an appeal for Tibetan independence before setting himself alight, in protest of Chinese restrictions on Tibetans.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxORW9IVDJnaW8wclJhcDUyUTZXS21DUXl0OUNxYmEwTXhRbjdVQ3owUnhtaFdFTFM5VkE0Q3FRd29jcDVlbzZkMUNDdkM5SWZ2bGF1Z1VZVXZFeG4tMEEtMTZ1N29tN3NDa3dpUW1nTmZMbFpwS1NLTl9EWEE5aHB3VjU4azl1N2ZfY1RUX2Z6dlFjZDB6M2toNmtwZVJ5T1BYbW9rd2dR?oc=5"
        },
        {
          "name": "U.S. News",
          "href": "https://www.usnews.com/news/world/articles/2026-07-02/tibetan-man-dies-after-setting-himself-on-fire-near-un-headquarters-activists-say"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/tibetan-flag-self-immolation-un-headquarters.png",
        "alt": "The Secretariat tower of the United Nations headquarters in New York seen against the sky.",
        "credit": "Wikimedia Commons"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The self-immolation of Thich Quang Duc (Saigon, 1963)",
          "excerpt": "On the morning of 11 June 1963, the elderly Buddhist monk sat in the lotus position at a busy Saigon intersection while fellow monks doused him with gasoline, protesting the persecution of Buddhists under Ngo Dinh Diem's regime. He struck a match and remained perfectly still and silent as the flames consumed him. Malcolm Browne's photograph of the burning monk carried the appeal around the world and shook the conscience of governments an ocean away.",
          "source": "Wikipedia",
          "href": "https://en.wikipedia.org/wiki/Thich_Quang_Duc"
        },
        {
          "category": "historical",
          "title": "The self-immolation of Jan Palach (Prague, 1969)",
          "excerpt": "On 16 January 1969, the 20-year-old student set himself on fire in Wenceslas Square to protest the crushing of the Prague Spring by Soviet tanks and the demoralization of his occupied nation. He suffered burns over most of his body and died three days later. His funeral swelled into a mass demonstration, and the memory of a single life offered against an empire outlasted the regime that provoked it.",
          "source": "Wikipedia",
          "href": "https://en.wikipedia.org/wiki/Jan_Palach"
        },
        {
          "category": "literary",
          "title": "Antigone by Sophocles (c. 441 BC), trans. R. C. Jebb",
          "excerpt": "Yes; for it was not Zeus that had published me that edict; not such are the laws set among men by the justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven. Die I must,-I knew that well (how should I not?)-even without thy edicts. But if I am to die before my time, I count that a gain.",
          "source": "The Internet Classics Archive (MIT)",
          "href": "http://classics.mit.edu/Sophocles/antigone.html"
        },
        {
          "category": "literary",
          "title": "Apology by Plato (c. 399 BC), trans. Benjamin Jowett",
          "excerpt": "Men of Athens, I honor and love you; but I shall obey God rather than you, and while I have life and strength I shall never cease from the practice and teaching of philosophy. For a man who is good for anything ought not to calculate the chance of living or dying; he ought only to consider whether in doing anything he is doing right or wrong - acting the part of a good man or of a bad.",
          "source": "The Internet Classics Archive (MIT)",
          "href": "http://classics.mit.edu/Plato/apology.html"
        },
        {
          "category": "artistic",
          "title": "The Third of May 1808 by Francisco Goya (1814)",
          "excerpt": "Goya lights a lone laborer in a white shirt at the center of the darkness, kneeling among the bodies of the already dead, his arms flung wide in a pose that echoes the crucifixion. The faceless firing squad of the occupying empire aims as a single mechanical wall, indifferent to his plea. The painting refuses heroic consolation and instead insists on the raw dignity and terror of one human being facing annihilation for his people.",
          "source": "Wikipedia",
          "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo%2C_by_Francisco_de_Goya%2C_from_Prado_thin_black_margin.jpg",
          "image": {
            "src": "/covers/tibetan-flag-self-immolation-un-headquarters--art.png",
            "alt": "Goya's The Third of May 1808: a man in a white shirt kneels with arms outstretched before a firing squad amid fallen bodies at night",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Symphony No. 3, 'Symphony of Sorrowful Songs' by Henryk Gorecki (1976)",
          "excerpt": "Gorecki's slow, hymn-like symphony gathers three laments of the powerless into a single grieving voice for solo soprano and strings. Its central movement sets words that an 18-year-old girl scratched onto the wall of a Gestapo prison cell, a testimony of composure rather than despair in the face of death. The music holds suffering with such gravity that it becomes an act of witness, turning private sorrow into a memorial the whole world can hear.",
          "source": "Wikipedia",
          "href": "https://en.wikipedia.org/wiki/Symphony_No._3_(G%C3%B3recki)"
        }
      ],
      "rank": 25
    },
    {
      "slug": "venezuela-earthquake-survivor-rescued",
      "headline": "Man pulled alive from rubble eight days after Venezuela's twin earthquakes killed at least 2,595",
      "overview": "Rescuers freed Hernan Gil alive after spending more than 100 hours reaching him beneath 140 tonnes of rubble, eight days after twin earthquakes struck Venezuela on 24 June. Officials say at least 2,595 people are confirmed dead with tens of thousands still missing; a Chilean firefighter on the team called it the most complex and technically difficult rescue of his career.",
      "genre": "Science",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/ce375v12z0qo"
        },
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPNGg2Y2g5TUpaZkxFVXJRdXFMcnpmX2d3R2lUa2ppZTY5UWFxZktRNDRMWktBRUgwcVBvck9tYWx6UXJHNXo2Sm1TNlRDdzhfU0NINkJVdzNYTmQySlk3Z3BvNGNKajJraW1KRTQ3cGVteVRaMzlpR2NyMG5jYVlQcWoycHVUR2pfMEdUWWZyZU5scnItZTF0MjU0RzBlZzNMN2J1Z3BBOEZ6VTF4VFNnQ2xuTGYxQQ?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-03",
      "image": {
        "src": "/covers/venezuela-earthquake-survivor-rescued.png",
        "alt": "Rescue workers searching the rubble of a building collapsed by an earthquake.",
        "credit": "BBC"
      },
      "edition": "Morning Edition · 3 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Rescue of the 33 Chilean Miners (Copiapó mine rescue, 2010)",
          "excerpt": "When the San José copper-gold mine collapsed on 5 August 2010, thirty-three men were sealed roughly 700 metres beneath the Atacama Desert with no way out. For 69 days the world held its breath, until each miner was drawn up one by one through a narrow bore in the Fénix 2 capsule. Like Hernán Gil freed from 140 tonnes of rubble, their emergence into daylight became a global emblem of survival against impossible odds.",
          "source": "Wikipedia — 2010 Copiapó mining accident",
          "href": "https://en.wikipedia.org/wiki/2010_Copiap%C3%B3_mining_accident"
        },
        {
          "category": "historical",
          "title": "The Rev. Charles Davy, eyewitness letter on the Lisbon earthquake (1 November 1755)",
          "excerpt": "It was on the morning of this fatal day, between the hours of nine and ten, that I was set down in my apartment, just finishing a letter, when the papers and table I was writing on began to tremble with a gentle motion, which rather surprised me, as I could not perceive a breath of wind stirring.",
          "source": "Fordham Modern History Sourcebook",
          "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp"
        },
        {
          "category": "literary",
          "title": "The Raising of Lazarus, Gospel of John 11:43–44 (King James Version, 1611)",
          "excerpt": "And when he thus had spoken, he cried with a loud voice, Lazarus, come forth. And he that was dead came forth, bound hand and foot with graveclothes: and his face was bound about with a napkin. Jesus saith unto them, Loose him, and let him go.",
          "source": "Project Gutenberg — The King James Version of the Bible (eBook #10)",
          "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
        },
        {
          "category": "literary",
          "title": "\"The Premature Burial\" by Edgar Allan Poe (1844)",
          "excerpt": "To be buried while alive is, beyond question, the most terrific of these extremes which has ever fallen to the lot of mere mortality. That it has frequently, very frequently, so fallen will scarcely be denied by those who think. The boundaries which divide Life from Death are at best shadowy and vague. Who shall say where the one ends, and where the other begins?",
          "source": "Project Gutenberg — The Works of Edgar Allan Poe, Volume 2 (eBook #2148)",
          "href": "https://www.gutenberg.org/cache/epub/2148/pg2148.txt"
        },
        {
          "category": "artistic",
          "title": "\"The Raising of Lazarus\" by Sebastiano del Piombo, with designs by Michelangelo (1517–1519)",
          "excerpt": "Sebastiano's monumental altarpiece freezes the instant a body returns from the grave: Lazarus, muscular and still half-wrapped in his shroud, twists back toward the living as Christ raises a commanding hand. Around him a crowd recoils between terror and wonder, unsure whether to believe the dead can rise. It is the visual counterpart to a man pulled breathing from the earth after eight days entombed in rubble.",
          "source": "Wikimedia Commons (painting held at the National Gallery, London, NG1)",
          "href": "https://commons.wikimedia.org/wiki/File:Sebastiano_del_Piombo_-_The_Raising_of_Lazarus_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/venezuela-earthquake-survivor-rescued--art.png",
            "alt": "Sebastiano del Piombo's painting The Raising of Lazarus, showing Lazarus half-unwrapped from his shroud rising from the tomb as Christ raises his hand amid an astonished crowd.",
            "credit": "Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Symphony No. 2 in C minor \"Resurrection\" by Gustav Mahler (1888–1894)",
          "excerpt": "Mahler's second symphony opens in funeral rites and death, then labours across five movements toward an overwhelming choral finale set to Klopstock's resurrection ode, promising that what was buried shall rise again. The music enacts precisely the arc of a rescue from the tomb: annihilation answered by an insistence that life endures. Its final blaze of hope amid darkness mirrors the cry that went up when Hernán Gil was lifted, alive, from beneath the ruins.",
          "source": "IMSLP",
          "href": "https://imslp.org/wiki/Symphony_No.2_(Mahler,_Gustav)"
        }
      ],
      "rank": 26
    },
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
      "rank": 27
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
      "rank": 28
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
      "rank": 29
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
      "rank": 30
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
      "rank": 31
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
      "rank": 32
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
      "rank": 33
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
      "rank": 34
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
      "rank": 35
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
      "rank": 36
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
      "rank": 37
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
      "rank": 38
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
