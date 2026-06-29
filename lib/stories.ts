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
// the Evening Edition of 28 June 2026 (ranks 1-13) leads with its hero story,
// followed by the Afternoon Edition of 28 June and the Evening Edition of 27 June 2026. Stories are
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
    "slug": "colorado-west-wildfires-firefighters",
    "headline": "Three firefighters killed as wind-driven wildfires sweep the U.S. West amid record heat",
    "overview": "Three firefighters were killed battling fast-moving wildfires on the Colorado-Utah border on June 28, 2026, as blazes fueled by extreme heat, drought and high winds spread across several Western states. Thousands of residents were placed under evacuation orders as crews struggled to contain fires during one of the region's hottest spells on record.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxNWE1LMnB3a0FPeUtod0p3b0VnYVNHWGg3ZXl3RVp1aTJVcVZadUFHZFRzWF9fWnpNanduYVZ6OEs2cVE2T05aR2pnRjlpV0FDenlpWHplLUMwNS1Ma3RFUDlQdVlMcmtPUlowNkg5ZkZ2NmktUFVtMDJvX0NTR2ptUmhZOUdMSUt1U2J3TmN2SU5zY3pNQjczbWFR?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cp8l7mpmdggo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/colorado-west-wildfires-firefighters.png",
      "alt": "A ridgeline of dry Western mountains ablaze at dusk, orange flames running through scrub as thick smoke billows into a darkening sky",
      "credit": "AI-generated"
    },
    "lead": true,
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome (AD 64), Tacitus, Annals Book XV",
        "excerpt": "The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city, with those narrow winding passages and irregular streets, which characterised old Rome.",
        "source": "Tacitus, The Annals, Book XV, trans. Alfred John Church and William Jackson Brodribb (1876)",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15"
      },
      {
        "category": "historical",
        "title": "The Great Fire of London (1666), The Diary of Samuel Pepys",
        "excerpt": "We staid till, it being darkish, we saw the fire as only one entire arch of fire from this to the other side the bridge, and in a bow up the hill for an arch of above a mile long: it made me weep to see it.",
        "source": "Samuel Pepys, Diary, entry for 2 September 1666 (Wheatley edition)",
        "href": "https://en.wikisource.org/wiki/Diary_of_Samuel_Pepys/1666/September"
      },
      {
        "category": "literary",
        "title": "The Burning of Troy, Virgil, Aeneid Book II (Dryden translation)",
        "excerpt": "Driv'n on the wings of Winds, whole sheets of Fire, / Through Air transported, to the Roofs aspire.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (1697), in The Works of Virgil",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
      },
      {
        "category": "literary",
        "title": "The Phoenix Reborn from Flame, Ovid, Metamorphoses Book XV",
        "excerpt": "All these receive their Birth from other Things; / But from himself the Phœnix only springs: / Self-born, begotten by the Parent Flame / In which he burn't, Another, and the same;",
        "source": "Ovid, Metamorphoses, Book XV, trans. Sir Samuel Garth, John Dryden, et al. (1717/1727)",
        "href": "https://en.wikisource.org/wiki/Metamorphoses_(tr._Garth,_Dryden,_et_al.)/Book_XV"
      },
      {
        "category": "artistic",
        "title": "\"Wotans Abschied und Feuerzauber\" (Magic Fire Music) from Die Walküre, WWV 86B — Richard Wagner",
        "excerpt": "Wagner's Magic Fire Music closes Die Walküre as Wotan summons Loge to ring the sleeping Brünnhilde in a wall of leaping flame. Shimmering strings and the glowing Loge motif make the orchestra itself seem to crackle and blaze, turning fire into both a punishment and a consecrating, protective force. Like the wind-driven walls of flame on the Colorado-Utah border, it renders fire as something at once beautiful, terrifying, and sacrificial.",
        "source": "Richard Wagner, Die Walküre, WWV 86B, Act III (1856); full orchestral score, IMSLP",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "The Great Day of His Wrath, John Martin, 1851-1853",
        "excerpt": "A whole world comes apart in flame: cliffs heave from their foundations and crash into a chasm lit blood-red by an unstoppable inferno, while tiny human figures tumble helplessly into the burning dark. Martin paints catastrophe at planetary scale, the fire not as a contained blaze but as an annihilating force that swallows the very landscape. It reads as a vision of nature turned apocalyptic, an apt mirror for wildfires that race across the American West, devouring forests, towns, and horizons alike.",
        "source": "John Martin, The Great Day of His Wrath, 1851-1853, oil on canvas, Tate Britain, London; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Great_Day_of_His_Wrath_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/colorado-west-wildfires-firefighters--art.png",
          "alt": "A vast apocalyptic landscape engulfed in fiery red and orange light as mountains collapse into a flaming abyss and figures fall into the inferno",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "pakistan-afghan-border-operation",
    "headline": "Pakistan says a cross-border ground operation and strikes killed 29 militants near the Afghan frontier",
    "overview": "Pakistan's military said it carried out a ground operation backed by strikes along the Afghan border, killing 29 militants it said had crossed from Afghanistan, in announcements on June 28, 2026. The action came amid rising tensions between Islamabad and Kabul over militant sanctuaries along the frontier.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxQc250eHJQZFk2c1RkdkdnQ3RvRHd1QmV6OU8yQ3B3a3NEMlFiYXd1SXpOLVBqTmM4dnZMa2U4QnRKZFhQSlV1OG1lM0hkY1oybi0wd0QtV0UydlcwOEN1TkN6MzFoVnhrUFZVaXpwOU80T0dYMkoxRmtQQndQamZ6MXRCbk5sZy10WlMxOURpOXZLTkV0cW5HUGtHOE9ET3V4WnZwd3FQMA?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxONDBEb3RoRkpwRmltQ3BHNkVvNHNJTFpEbVdnbkhNdmtiYUxhOTZTMkEzWlFsTTRLNnBMUi1FVkNFQ25teGd0NUNaYkhXN3dYQjhMTjBfVUwzWWZYTHpDRHd1clBhaVYteHJ2SEQ1N1BiWDlFRmZNWnJrOVFhd2U3a1Q3UV92ekN1d0NCNWtiN0t3T2RJemJxZkpYai0zV1NFTXlwZjVSWVVheTNLei1xdTZEdTVhTjg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/pakistan-afghan-border-operation.png",
      "alt": "A rugged, arid mountain frontier at dawn under a pale sky, a lone watchtower and razor-wire border fence winding across stony ridges",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Story of the Malakand Field Force: An Episode of Frontier War (Winston S. Churchill, 1898)",
        "excerpt": "Tribe wars with tribe. The people of one valley fight with those of the next. To the quarrels of communities are added the combats of individuals. Khan assails khan, each supported by his retainers. Every tribesman has a blood feud with his neighbor.",
        "source": "Winston S. Churchill, The Story of the Malakand Field Force: An Episode of Frontier War (London: Longmans, Green & Co., 1898), Chapter I. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/9404/9404-h/9404-h.htm"
      },
      {
        "category": "historical",
        "title": "Commentarii de Bello Gallico, Book IV (Julius Caesar, 1st century BC) — crossing the Rhine to punish cross-border raiders",
        "excerpt": "since he saw the Germans were so easily urged to go into Gaul, he desired they should have their fears for their own territories, when they discovered that the army of the Roman people both could and dared pass the Rhine.",
        "source": "Julius Caesar, The Gallic Wars (De Bello Gallico), Book IV (trans. W. A. McDevitte and W. S. Bohn). The Internet Classics Archive, MIT.",
        "href": "https://classics.mit.edu/Caesar/gallic.4.4.html"
      },
      {
        "category": "literary",
        "title": "Arithmetic on the Frontier (Rudyard Kipling, 1886) — the Afghan/North-West Frontier",
        "excerpt": "A scrimmage in a Border Station— / A canter down some dark defile— / Two thousand pounds of education / Drops to a ten-rupee jezail— / The Crammer's boast, the Squadron's pride, / Shot like a rabbit in a ride!",
        "source": "Rudyard Kipling, \"Arithmetic on the Frontier,\" Departmental Ditties and Other Verses (1886). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Arithmetic_on_the_Frontier"
      },
      {
        "category": "literary",
        "title": "The Lay of the Last Minstrel, Canto I (Sir Walter Scott, 1805) — the Anglo-Scottish border reiver",
        "excerpt": "A stark moss-trooping Scott was he, / As e'er couched border lance by knee. / Through Solway sands, through Tarras moss, / Blindfold, he knew the paths to cross; / By wily turns, by desperate bounds, / Had baffled Percy's best blood-hounds; / In Eske, or Liddell, fords were none, / But he would ride them, one by one; / Alike to him was time or tide, / December's snow, or July's pride; / Alike to him was tide or time, / Moonless midnight, or mattin prime. / Steady of heart, and stout of hand, / As ever drove prey from Cumberland; / Five times outlawed had be been, / By England's King, and Scotland's Queen.",
        "source": "Sir Walter Scott, The Lay of the Last Minstrel, Canto I, stanza XXI (1805). Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Lay_of_the_Last_Minstrel/Canto_1"
      },
      {
        "category": "artistic",
        "title": "In the Steppes of Central Asia (Aleksandr Borodin, 1880) — a caravan crossing contested Central Asian frontier under armed escort",
        "excerpt": "Borodin's symphonic sketch sets a vast, empty frontier to music: over a sustained high drone evoking the silent steppe, a Russian military theme and an Asian caravan melody approach from opposite directions, intertwine as a guarded convoy passes through dangerous borderland, then fade as the escort moves on into the distance.",
        "source": "Aleksandr Borodin, In the Steppes of Central Asia (V sredney Azii), symphonic sketch, 1880. IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/In_the_Steppes_of_Central_Asia_(Borodin,_Aleksandr)"
      },
      {
        "category": "artistic",
        "title": "The Apotheosis of War (Vasily Vereshchagin, 1871) — the aftermath of Central Asian frontier warfare",
        "excerpt": "Painted after Vereshchagin's service on Russia's Central Asian frontier, the canvas shows a pyramid of human skulls heaped on scorched earth before a ruined walled town, picked over by carrion crows — the artist's verdict on conquest, inscribed in dedication \"to all great conquerors, past, present and to come.\"",
        "source": "Vasily Vereshchagin, The Apotheosis of War (Apofeoz voyny), oil on canvas, 1871, State Tretyakov Gallery, Moscow. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:1871_Vereshchagin_Apotheose_des_Krieges_anagoria.JPG",
        "image": {
          "src": "/covers/pakistan-afghan-border-operation--art.png",
          "alt": "The Apotheosis of War (1871) by Vasily Vereshchagin: a pyramid of human skulls on barren ground before a ruined city, with crows circling.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "south-korea-ai-chip-megaplan",
    "headline": "South Korea's president to unveil a roughly $650 billion AI and semiconductor investment plan",
    "overview": "President Lee Jae-myung is set to announce three 'mega-projects' worth a reported 1,000 trillion won (about $650 billion) over coming years, including a new semiconductor cluster in the country's southwest and major spending on AI data centers and robotics. Samsung and SK are expected to take part in what would rank among the largest industrial-investment drives in South Korea's history.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPVUNqWjl6MERPSDlWbU9PcWFac1g2anI3NF8xSE1falktWnRsVUVTdHZOT1VOVmhOemcxUUJPNjdLWWdwM2x5enBYc1RMa0FCNTd3TzFSMGEySDNFM3JRNHVJZjdVWWNnd1F4Wm90dEJrWEgtWGJfNFI2ZWhLeWVkOGJUdTRYTGtqbk1IX0FwSmhrQ0tybXgwZUVsU1pSclVHWERTQzRCWWR6aDVuRzFublFuYk9wYmdU?oc=5"
      },
      {
        "name": "Korea Herald",
        "href": "https://www.koreaherald.com/article/10791082"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/south-korea-ai-chip-megaplan.png",
      "alt": "The interior of a vast, brightly lit semiconductor fabrication plant, rows of gleaming machinery and clean-room gantries stretching into the distance",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus, The Histories, Book II.124 (on the building of the Great Pyramid of Cheops), 5th century BC",
        "excerpt": "For first he shut up all the temples, so that none could sacrifice there; and next, he compelled all the Egyptians to work for him, appointing some to drag stones from the quarries in the Arabian mountains to the Nile: and the stones being carried across the river in boats, others were charged to receive and drag them to the mountains called Libyan. They worked in gangs of a hundred thousand men, each gang for three months. For ten years the people were afflicted in making the road whereon the stones were dragged, the making of which road was to my thinking a task but a little lighter than the building of the pyramid... The pyramid itself was twenty years in the making.",
        "source": "Herodotus, The Histories, Book II (Euterpe), ch. 124, Loeb Classical Library translation (public domain), hosted by LacusCurtius, University of Chicago.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/2b*.html"
      },
      {
        "category": "historical",
        "title": "Farnham Bishop, Panama, Past and Present (1913), Ch. XV — the digging of the Panama Canal",
        "excerpt": "Under Mr. Stevens—'Big Smoke Stevens' they called him, for he burned up cigars like Grant in the Wilderness—the record for a month's excavation was brought up to a million cubic yards, the type of canal was finally settled on, and General Gorgas finished his fight against yellow fever.",
        "source": "Farnham Bishop, Panama, Past and Present (New York: The Century Co., 1913), Chapter 15. Wikisource (public domain).",
        "href": "https://en.wikisource.org/wiki/Panama,_past_and_present/Chapter_15"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"Song of the Broad-Axe,\" Leaves of Grass (1856; section 9)",
        "excerpt": "The shapes arise! / Shapes of factories, arsenals, foundries, markets, / Shapes of the two-threaded tracks of railroads, / Shapes of the sleepers of bridges, vast frameworks, girders, arches, / Shapes of the fleets of barges, tows, lake and canal craft, river craft,",
        "source": "Walt Whitman, \"Song of the Broad-Axe,\" in Leaves of Grass. The Walt Whitman Archive (public domain).",
        "href": "https://whitmanarchive.org/item/ppp.00707_00795"
      },
      {
        "category": "literary",
        "title": "The Tower of Babel, Genesis 11:3–4 (King James Version, 1611)",
        "excerpt": "And they said one to another, Go to, let us make brick, and burn them throughly. And they had brick for stone, and slime had they for morter. And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "The Holy Bible, King James Version (1611), Genesis 11:3–4. Wikisource (public domain).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "Alexander Mosolov, Zavod (\"Iron Foundry\"), Op. 19 (from the ballet Steel), 1926–27",
        "excerpt": "A pioneering work of Soviet machine-music, Mosolov's Iron Foundry hurls the orchestra into the relentless clangor of a working factory, even scoring a part for a shaken metal sheet. Composed to glorify the age of industrialization, it turns the din of forging steel into a driving, exhilarating hymn to mechanized production and national industrial might.",
        "source": "Alexander Mosolov, Steel (Сталь) / Zavod (\"Iron Foundry\"), Op. 19, 1926–27. Scores at IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Steel,_Op.19_(Mosolov,_Alexander)"
      },
      {
        "category": "artistic",
        "title": "Coalbrookdale by Night, Philip James de Loutherbourg, 1801",
        "excerpt": "Loutherbourg's nocturne sets the Madeley Wood furnaces ablaze against a smoke-choked sky, turning a Shropshire ironworks into a vision of hellish, awesome power at the dawn of the Industrial Revolution. The painting frames raw industry as a sublime force, where human ambition conjures fire and machinery on a scale that dwarfs the surrounding land. It is the perfect emblem for a nation marshalling vast capital and will toward a single, transformative industrial undertaking.",
        "source": "Philip James de Loutherbourg, Coalbrookdale by Night, 1801, Science Museum, London; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._002.jpg",
        "image": {
          "src": "/covers/south-korea-ai-chip-megaplan--art.png",
          "alt": "Industrial iron furnaces glowing fiery red and orange against a dark, smoke-filled night sky, with billowing clouds illuminated by flames",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "texas-bible-required-reading",
    "headline": "Texas approves Bible stories as required reading for more than 5 million public-school students",
    "overview": "The Texas State Board of Education approved a new required reading list of about 200 texts that includes Bible passages and stories, affecting roughly 5.5 million K-12 public-school students. Elementary pupils will read versions of 'David and Goliath' and 'Daniel and the Lions' Den,' while older students study the Sermon on the Mount and the parable of the prodigal son; the rollout begins with elementary grades in 2030.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNYk5leVVPRGxXaDlvbTlOY1NmWmlIRjlzVDJteXMxNWgwWHNsSXk3b2pld0tKeGJXSzhEU01qWW1qN21INzA0VmpEbjhISWVDejljUVNXUU5WeVIzTFdNYlBBbnpEZ1VCZDdxa0o3WXBPbGt2UXRNU1djSGJhUmg5WlhyX1l0THowdlc5VG1EbktVdlo0a2ZQRQ?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/06/26/us/texas-schools-bible-curriculum-vote"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/texas-bible-required-reading.png",
      "alt": "An empty sunlit American elementary-school classroom, rows of small wooden desks and an open book resting on the teacher's lectern",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Northwest Ordinance (1787), Article 3 — Confederation Congress",
        "excerpt": "Religion, morality, and knowledge, being necessary to good government and the happiness of mankind, schools and the means of education shall forever be encouraged.",
        "source": "Northwest Ordinance, July 13, 1787, Article 3; transcription, U.S. National Archives, Milestone Documents.",
        "href": "https://www.archives.gov/milestone-documents/northwest-ordinance"
      },
      {
        "category": "historical",
        "title": "Engel v. Vitale, 370 U.S. 421 (1962) — Opinion of the Court, Justice Hugo Black",
        "excerpt": "it is no part of the business of government to compose official prayers for any group of the American people to recite as a part of a religious program carried on by government.",
        "source": "Engel v. Vitale, 370 U.S. 421 (1962), Opinion of the Court (Black, J.); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Engel_v._Vitale/Opinion_of_the_Court"
      },
      {
        "category": "literary",
        "title": "David and Goliath — 1 Samuel 17:45-47 (King James Version, 1611)",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. This day will the LORD deliver thee into mine hand; and I will smite thee, and take thine head from thee... that all the earth may know that there is a God in Israel. And all this assembly shall know that the LORD saveth not with sword and spear: for the battle is the LORD's, and he will give you into our hands.",
        "source": "The Holy Bible, King James Version (1611), 1 Samuel 17:45-47; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "The Prodigal Son — Luke 15:20-24 (King James Version, 1611)",
        "excerpt": "And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him. And the son said unto him, Father, I have sinned against heaven, and in thy sight, and am no more worthy to be called thy son. But the father said to his servants, Bring forth the best robe, and put it on him; and put a ring on his hand, and shoes on his feet: And bring hither the fatted calf, and kill it; and let us eat, and be merry: For this my son was dead, and is alive again; he was lost, and is found. And they began to be merry.",
        "source": "The Holy Bible, King James Version (1611), Luke 15:20-24; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "artistic",
        "title": "Saul, HWV 53 — oratorio by George Frideric Handel (1738), libretto by Charles Jennens",
        "excerpt": "Handel's dramatic oratorio sets the biblical clash of Saul and the young David to music, opening with the people's triumphant chorus after David felled Goliath and tracing the king's jealousy as the crowd sings that David has slain his ten thousands. The full score, edited by Friedrich Chrysander, is freely available in the public domain.",
        "source": "George Frideric Handel, Saul, HWV 53 (1738); full score ed. Friedrich Chrysander (Leipzig, 1862); IMSLP/Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Saul,_HWV_53_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Return of the Prodigal Son — Rembrandt Harmensz. van Rijn (c. 1668)",
        "excerpt": "In one of his last works, Rembrandt paints the kneeling, ragged son enfolded by his father's tender hands, the moment of forgiveness rendered in warm shadow. The scene crystallizes the parable Texas now lists for its schoolchildren.",
        "source": "Rembrandt van Rijn, The Return of the Prodigal Son, oil on canvas, c. 1668, State Hermitage Museum, Saint Petersburg; image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz._van_Rijn_-_The_Return_of_the_Prodigal_Son.jpg",
        "image": {
          "src": "/covers/texas-bible-required-reading--art.png",
          "alt": "Rembrandt's painting The Return of the Prodigal Son: a kneeling son in tattered clothes embraced by his aged father's hands",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "israel-recognizes-armenian-genocide",
    "headline": "Israel's cabinet votes to formally recognize the WWI killing of Armenians as genocide",
    "overview": "Israel's cabinet unanimously approved a proposal on June 28, 2026, to designate the mass killing of Armenians by the Ottoman Empire during World War I as a genocide, a step that still requires approval by the Knesset. Historians estimate up to 1.5 million Armenians were killed; the move reflects deteriorating ties between Israel and Turkey and would add Israel to more than 30 countries that recognize the genocide.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxNQW5uN1J1VnQ4NEtFWEFqUWg3UDhwTTBBYnBFZWtVLTYzWEM4VHJLSm9CV1lnX1MyMVV0Y1YxcTJ0TmhyaWtoVEJaYlAtNmVBU3VKQUVWVk9RSXZIbmVGRkpVVVJIX25GODF6T0J6M09fbXFjU2xaQkF3cnpxcTZvU3lYWk5jelEtUFEtSk5DYXFQaE1mMGxCd2FVblpTQjFaZElHU2twSXhwdw?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/israel-armenia-genocide-world-war-one/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/israel-recognizes-armenian-genocide.png",
      "alt": "A weathered stone memorial of carved upright slabs on a windswept hillside at dusk, an eternal flame burning low at its center",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Ambassador Morgenthau's Story, Ch. XXIV \"The Murder of a Nation\" (Henry Morgenthau Sr., 1918)",
        "excerpt": "The real purpose of the deportation was robbery and destruction; it really represented a new method of massacre. When the Turkish authorities gave the orders for these deportations, they were merely giving the death warrant to a whole race; they understood this well, and, in their conversations with me, they made no particular attempt to conceal the fact.",
        "source": "Henry Morgenthau, Ambassador Morgenthau's Story (Garden City, NY: Doubleday, Page & Co., 1918), Chapter 24. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Ambassador_Morgenthau's_Story/Chapter_24"
      },
      {
        "category": "historical",
        "title": "The Treatment of Armenians in the Ottoman Empire, 1915-1916 (Bryce & Toynbee \"Blue Book\")",
        "excerpt": "All that happened in 1915 is in the regular line of Turkish policy. The only differences are in the scale of the present crimes, and in the fact that the lingering sufferings of deportations in which the deaths were as numerous as in the massacres, and fell with special severity upon the women, have in this latest instance been added.",
        "source": "Viscount Bryce (ed. Arnold J. Toynbee), The Treatment of Armenians in the Ottoman Empire, 1915-1916: Documents Presented to Viscount Grey of Fallodon (London: Hodder & Stoughton, 1916). Project Gutenberg eBook #69630.",
        "href": "https://www.gutenberg.org/ebooks/69630"
      },
      {
        "category": "literary",
        "title": "\"New Dark Days\" by Bedros Tourian (trans. Alice Stone Blackwell)",
        "excerpt": "The centuries of bloodshed\nAre past, those cruel years;\nBut there is still one country\nWhose mountains drip with tears,\nWhose river-banks are blood-stained,\nWhose mourning loads the breeze,—\nA land of dreary ruins,\nAshes, and cypress-trees.",
        "source": "Bedros Tourian, \"New Dark Days,\" in Armenian Poems, Rendered into English Verse by Alice Stone Blackwell (Boston, 1917). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Armenian_Poems/New_Dark_Days"
      },
      {
        "category": "literary",
        "title": "\"The Tears of Araxes\" by Raphael Patkanian (trans. Alice Stone Blackwell)",
        "excerpt": "When hast thou seen a widow,\nAfter her true-love died,\nFrom head to foot resplendent\nWith ornaments of pride?",
        "source": "Raphael Patkanian, \"The Tears of Araxes,\" in Armenian Poems, Rendered into English Verse by Alice Stone Blackwell (Boston, 1917). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Armenian_Poems/The_Tears_of_Araxes"
      },
      {
        "category": "artistic",
        "title": "Patarag (Divine Liturgy) for unaccompanied men's chorus, by Komitas Vardapet (early 20th c.)",
        "excerpt": "Komitas Vardapet, the priest-musicologist who survived the 1915 arrests only to be broken by what he witnessed, distilled the chants of the Armenian Apostolic Mass into a spare, unaccompanied choir of men's voices. Its grave modal lines turn worship into mourning, carrying a people's faith and its grief in the same breath. The work has become an unofficial requiem for the murdered nation.",
        "source": "Komitas Vardapet, Patarag (Armenian Divine Liturgy / Holy Mass) for male chorus. Score and editions hosted at IMSLP/Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Patarag_(Komitas_Vardapet)"
      },
      {
        "category": "artistic",
        "title": "\"Armenians marched by Ottoman soldiers, 1915\" — photograph by Armin T. Wegner",
        "excerpt": "Armin T. Wegner, a German army medic, defied orders to photograph the columns of Armenian deportees driven into the Syrian desert. His smuggled images are among the few eyewitness photographs of the genocide, fixing in light the marches that words struggled to name. Here a file of civilians is herded along under armed guard, witness become evidence.",
        "source": "Armin T. Wegner, photograph of Armenian deportees escorted by Ottoman soldiers, 1915. Public domain, Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Armenians_marched_by_Ottoman_soldiers,_1915.png",
        "image": {
          "src": "/covers/israel-recognizes-armenian-genocide--art.png",
          "alt": "Black-and-white 1915 photograph of a column of Armenian civilians being marched along a road under guard by Ottoman soldiers",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "sovereign-funds-energy-dollar",
    "headline": "Sovereign investors managing $29 trillion shift toward energy assets and warn on the dollar",
    "overview": "An Invesco survey of 90 sovereign wealth funds and 54 central banks overseeing some $29 trillion found a marked pivot toward energy security and transition infrastructure, with 80% calling it the most credible way to make portfolios resilient. Concerns about the U.S. dollar were 'widespread and deepening,' with 61% of central banks saying high U.S. debt weakens the dollar's long-term role as a reserve asset, up from 20% in 2024.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxPcTU1TGpUQS1nWm1VemNlanY2aXd4Z014UklJSE5ubTl2Z1BMclhzMHlES1dfYktWd212anFRSWVZRV9rSVlGN0JzR1NZSF9iMmc3Mlp3NHYyNnRJNUdCSlFmdEg1R3VmeG41a3hsc0lIbnRHdWdndmkzTkdDQVMwcmRKVHJudFNQT3Vzdmg3b1Z6VjJGUzNZZ3dJaWhZQXZwZXkyYkJKTDNlNGhyc29OcGtNZmw5XzQtYkJiV0tpc3dyTG1BTlE?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://www.scmp.com/business/banking-finance/article/3358682/sovereign-investors-us29-trillion-pivot-energy-assets-flag-dollar-fears"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/sovereign-funds-energy-dollar.png",
      "alt": "Rows of tall wind turbines and solar arrays stretching to the horizon at golden hour beneath a wide, clear sky",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder, Natural History, Book XXXIII (1st c. AD, trans. Rackham)",
        "excerpt": "But from the invention of money came the original source of avarice when usury was devised, and a profitable life of idleness; by rapid stages what was no longer mere avarice but a positive hunger for gold flared up with a sort of frenzy",
        "source": "Pliny the Elder, Natural History, Book 33 (Rackham, Jones & Eichholz translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/Natural_History_(Rackham,_Jones,_%26_Eichholz)/Book_33"
      },
      {
        "category": "historical",
        "title": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, Book I, ch. IV (1776)",
        "excerpt": "in every country of the world, I believe, the avarice and injustice of princes and sovereign states, abusing the confidence of their subjects, have by degrees diminished the real quantity of metal, which had been originally contained in their coins. The Roman as, in the latter ages of the republic, was reduced to the twenty-fourth part of its original value, and, instead of weighing a pound, came to weigh only half an ounce.",
        "source": "Adam Smith, The Wealth of Nations (1776), Book I, Chapter IV; Project Gutenberg eBook #3300",
        "href": "https://www.gutenberg.org/cache/epub/3300/pg3300-images.html"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, The Life of Timon of Athens, Act IV, Scene 3 (First Folio, 1623)",
        "excerpt": "Gold? Yellow, glittering, precious Gold? No Gods, I am no idle Votarist,",
        "source": "Shakespeare, The Life of Tymon of Athens, Act 4 Scene 3, First Folio facsimile (1910), Wikisource",
        "href": "https://en.wikisource.org/wiki/Shakespeare_-_First_Folio_facsimile_(1910)/The_Life_of_Tymon_of_Athens/Act_4_Scene_3"
      },
      {
        "category": "literary",
        "title": "The First Epistle to Timothy 6:9-10 (King James Bible, 1611)",
        "excerpt": "But they that will be rich fall into temptation and a snare, and into many foolish and hurtful lusts, which drown men in destruction and perdition. For the love of money is the root of all evil: which while some coveted after, they have erred from the faith, and pierced themselves through with many sorrows.",
        "source": "Bible (King James), 1 Timothy 6:9-10, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Timothy"
      },
      {
        "category": "artistic",
        "title": "\"Le veau d'or\" (The Song of the Golden Calf), Mephistopheles' aria from Gounod's Faust (1859)",
        "excerpt": "Le veau d'or est toujours debout; On encense Sa puissance D'un bout du monde à l'autre bout! Pour fêter l'infâme idole, Peuples et rois confondus, Au bruit sombre des écus Dansent une ronde folle Autour de son piédestal?... Et Satan conduit le bal!",
        "source": "J. Barbier & M. Carré (libretto), Charles Gounod (music), Faust: a Lyric Drama in Five Acts, Act II; Project Gutenberg eBook #45806",
        "href": "https://www.gutenberg.org/files/45806/45806-h/45806-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Moneylender and his Wife, Quentin Metsys (Quentin Matsys), 1514",
        "excerpt": "Oil-on-panel genre painting of a money-changer weighing gold coins on a balance while his wife, turning from a prayer book, watches the gold; a meditation on avarice and the lure of worldly wealth.",
        "source": "Quentin Metsys, The Moneylender and his Wife (1514), oil on panel, 70.5 × 67 cm, Louvre Museum, Paris (INV 1444); Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/sovereign-funds-energy-dollar--art.png",
          "alt": "A 1514 painting by Quentin Metsys of a money-changer weighing gold coins on a balance while his wife looks on, turning from her prayer book",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "philippines-solar-rush",
    "headline": "Philippines becomes the world's top buyer of solar panels as electricity prices soar",
    "overview": "Households across the Philippines are rushing to install rooftop solar to escape soaring power bills, making the country the world's biggest spender on solar panels with $407 million in imports in the three months through May, up 145% from a year earlier. Electricity prices have climbed about 10% since conflict in the Middle East drove up energy costs, and a typical household now spends roughly 12% of its income on power.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxOaHpHeV9XOF8wZXVYRS1NSDJ5bTJzTTZwZ3NlRHR5aXZ5dUh5ZXJtWnFmVHRvTVFfMXl1eUVSeDQtZGkxby1DQVZrb3ZrNUJFdE1rNjVMd05lRjBNTHU4a21tdTJ4ZFNnbDFFTE14M1hwY0Flb0ZtYmxuemhEQW45U05tYlAtcFRSM1JsMDVKYkhKUU5RMUNBVUNIQlJySXBxQ1dKVmlxSQ?oc=5"
      },
      {
        "name": "South China Morning Post",
        "href": "https://www.scmp.com/news/asia/southeast-asia/article/3358687/philippines-becomes-worlds-top-solar-spender-amid-middle-east-energy-crisis"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/philippines-solar-rush.png",
      "alt": "Rooftops of a dense tropical Philippine neighborhood crowded with newly installed solar panels gleaming under a bright midday sun",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "All About the Klondyke Gold Mines (1897) — first-person miners' accounts of the Klondike gold rush",
        "excerpt": "When gold was found in such astonishing quantities on the tributaries of the Klondyke the whole population of those camps moved bodily to the junction of the Klondyke and Yukon rivers, where Dawson City is established. We went to Eldorado Creek and made locations on what were called Claims Twenty-five, Twenty-six, Fifty-three and Fifty-four.",
        "source": "All About the Klondyke Gold Mines (1897), Project Gutenberg eBook #35824 (ibiblio/mirrorservice copy)",
        "href": "https://www.mirrorservice.org/sites/ftp.ibiblio.org/pub/docs/books/gutenberg/3/5/8/2/35824/35824-h/35824-h.htm"
      },
      {
        "category": "historical",
        "title": "Great Hymn to the Aten (c. 14th century BC), attributed to Pharaoh Akhenaten — humanity's early worship of the sun's power",
        "excerpt": "Thy rising [is] beautiful in the horizon of heaven, O Aten, ordainer of life. Thou dost shoot up in the horizon of the East, thou fillest every land with thy beneficence.",
        "source": "Great Hymn to Aten, trans. E. A. Wallis Budge, Wikisource",
        "href": "https://en.wikisource.org/wiki/Great_Hymn_to_Aten"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"Give Me the Splendid Silent Sun\" (Leaves of Grass, 1882, Drum-Taps)",
        "excerpt": "Give me the splendid silent sun with all his beams full-dazzling,\nGive me juicy autumnal fruit ripe and red from the orchard,\nGive me a field where the unmow'd grass grows,\nGive me an arbor, give me the trellis'd grape,",
        "source": "Walt Whitman, Leaves of Grass (1882), Drum-Taps, Wikisource",
        "href": "https://en.wikisource.org/wiki/Leaves_of_Grass_(1882)/Drum-Taps/Give_Me_the_Splendid_Silent_Sun"
      },
      {
        "category": "literary",
        "title": "Lord Byron, \"Prometheus\" (1816) — the Titan who stole fire from heaven for mortals",
        "excerpt": "Titan! to whose immortal eyes\nThe sufferings of mortality,\nSeen in their sad reality,\nWere not as things that gods despise;",
        "source": "George Gordon, Lord Byron, \"Prometheus\" (1816), Wikisource",
        "href": "https://en.wikisource.org/wiki/Prometheus_(Byron)"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Die Schöpfung (The Creation), Hob.XXI:2 (1798) — recitative depicting the rising sun, \"In splendour bright is rising now the sun\"",
        "excerpt": "Recitative No. 13, \"Im vollen Glanze steiget jetzt die Sonne\" (\"In splendour bright is rising now the sun\"), leading into the chorus \"Die Himmel erzählen die Ehre Gottes\" (\"The heavens are telling the glory of God\"). Original full scores are available as public-domain PDFs.",
        "source": "Joseph Haydn, Die Schöpfung, Hob.XXI:2 (1798), full scores, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Claude Monet, Impression, Sunrise (Impression, soleil levant), 1872",
        "excerpt": "Monet's view of the port of Le Havre at dawn, the red sun burning through morning haze over the water, the painting that gave Impressionism its name and made the rising sun its emblem of fleeting light.",
        "source": "Claude Monet, Impression, Sunrise (1872), oil on canvas, Musée Marmottan Monet, Paris; image via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Monet_-_Impression,_Sunrise.jpg",
        "image": {
          "src": "/covers/philippines-solar-rush--art.png",
          "alt": "Claude Monet's painting Impression, Sunrise, showing an orange sun rising over a hazy blue harbour with small boats",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "nasa-swift-telescope-rescue",
    "headline": "NASA launches a $30 million mission to keep its aging Swift telescope from falling to Earth",
    "overview": "NASA is racing to save the 22-year-old Swift gamma-ray observatory, which atmospheric drag is pulling toward Earth and could drag from orbit by year's end. A refrigerator-size robotic spacecraft built by the startup Katalyst is set to grab Swift and gradually boost its orbit over more than six weeks, in a first-of-its-kind $30 million rescue.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQa2RTR1BqT1UwaVdIYzdLMTZteWdDbDBVWWdKbDRReDNaOXBXakctLWxXcWdFb2l0cmF5NFVXYUZNbUZ4YjZxTGNHdXBQMkN3ZmE4V1FFc3BGdVQ5LV9yLTVKUU1TT0VlSmhGdm1LcGNNN3RWNmR3RGhvODBaY0c3OHljYXlsOGpHV3NaVWc5SjkzNXVpRUFRcHQzaw?oc=5"
      },
      {
        "name": "Space.com",
        "href": "https://www.space.com/space-exploration/launches-spacecraft/nasa-is-paying-usd30-million-for-a-1st-of-its-kind-rescue-mission-to-the-aging-swift-telescope-before-it-falls-from-space-is-it-worth-it"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/nasa-swift-telescope-rescue.png",
      "alt": "A satellite observatory drifting in low Earth orbit above the blue curve of the planet, sunlight glinting off its golden panels against the black of space",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus, Histories, Book VIII (the diver Scyllias salvaging the Persian wrecks), 5th c. BCE",
        "excerpt": "Now the Persians had with them a man named Scyllias, a native of Scione, who was the most expert diver of his day. At the time of the shipwreck off Mount Pelion he had recovered for the Persians a great part of what they lost; and at the same time he had taken care to obtain for himself a good share of the treasure.",
        "source": "Herodotus, The History of Herodotus, trans. George Rawlinson, Book VIII (Urania), section 8 (public domain).",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_8"
      },
      {
        "category": "historical",
        "title": "The Anglo-Saxon Chronicle, entry for A.D. 1066 (the comet read as an omen before the Norman Conquest)",
        "excerpt": "Then was over all England such a token seen as no man ever saw before. Some men said that it was the comet-star, which others denominate the long-hair'd star. It appeared first on the eve called \"Litania major\", that is, on the eighth before the calends off May; and so shone all the week.",
        "source": "The Anglo-Saxon Chronicle, trans. J. Ingram and J. A. Giles, year 1066 (Project Gutenberg, public domain).",
        "href": "https://www.gutenberg.org/cache/epub/657/pg657.txt"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book VIII (Daedalus and Icarus), 8 CE",
        "excerpt": "The vicinity of the sun softens the fragrant wax, the chains of the feathers; the wax melted: he shook his bare arms and lacking oarage he takes up no air, and his mouth shouting his father's name is swept up in the blue sea, which takes its name from him.",
        "source": "Ovid, Metamorphoses VIII.183–235, \"Daedalus and Icarus,\" Wikisource literal English translation of the Latin original (public domain).",
        "href": "https://en.wikisource.org/wiki/Translation:Metamorphoses/Daedalus_and_Icarus"
      },
      {
        "category": "literary",
        "title": "John Milton, Paradise Lost, Book I (Satan hurled from the sky), 1674",
        "excerpt": "Him the Almighty Power\nHurled headlong flaming from th' ethereal sky,\nWith hideous ruin and combustion, down\nTo bottomless perdition, there to dwell\nIn adamantine chains and penal fire,\nWho durst defy th' Omnipotent to arms.",
        "source": "John Milton, Paradise Lost (1674), Book I, lines 44–49, Wikisource (public domain).",
        "href": "https://en.wikisource.org/wiki/Paradise_Lost_(1674)/Book_I"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Die Schöpfung (The Creation), Hob.XXI:2 — chorus \"The heavens are telling the glory of God\" (1798)",
        "excerpt": "Haydn's oratorio crowns its first part with a radiant chorus in which sun, moon, and stars proclaim their maker, the full choir surging upward as the heavens themselves seem to sing. It is a fitting anthem for instruments we send aloft to read the sky: a machine that watches the stars, lifted back into the firmament it was built to observe.",
        "source": "Joseph Haydn, Die Schöpfung (The Creation), Hob.XXI:2, Part I, No. 13 \"Die Himmel erzählen die Ehre Gottes\" / \"The heavens are telling the glory of God\"; full scores on IMSLP (public domain).",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Johannes Vermeer, The Astronomer, c. 1668",
        "excerpt": "A scholar leans toward a celestial globe in a quiet, light-filled room, his hand reaching out as if to touch the turning heavens. Vermeer's image distills the ancient human urge to watch and measure the sky — the same impulse that built the Swift telescope and now strains to keep it aloft.",
        "source": "Johannes Vermeer, The Astronomer (De astronoom), oil on canvas, c. 1668, Musée du Louvre, Paris (RF 1983-28); image via Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_The_Astronomer_-_WGA24685.jpg",
        "image": {
          "src": "/covers/nasa-swift-telescope-rescue--art.png",
          "alt": "Johannes Vermeer's painting The Astronomer, a scholar in a lit room reaching toward a celestial globe",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "canada-south-africa-world-cup",
    "headline": "Canada beat South Africa 1-0 on a stoppage-time goal to reach the World Cup round of 16",
    "overview": "Canada defeated South Africa 1-0 with a stoppage-time strike by Stephen Eustaquio in their World Cup round-of-32 match on June 28, 2026, advancing to the round of 16. The result extended the run of one of the tournament's three host nations, which is staging the World Cup alongside the United States and Mexico.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxNVnpHOWpzS0xBVDdXREpMRGx5aFV4cmdZbWJEUDR3UDdDY1hwZzh0aVBlVm04T0JvZ0EyTXhhVW5ibW9VdHFkVmJYa3hpcHUybElUYkVqSXNldkhQVjJPbkU3VWgxVWVOVFF1Z21rZzAwbkZuSmxmMmFrWXdJSk9VWmNuaUltaHVRMlBfa0lKVnBPQQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxORXl1YmQ2Y2hFNWxoc0FISk1DcHdnV0dsQkwzRFJkYk5YVmk4SjJVLUtiWU1XQ1NnQkpSZXFDa1dubkRCaVJVQXlOWlkwQXNTRDZhak90Nlpzck1nSFRMMXJuaHU2d1dpazVmSmhMeHRpRTl4OXAyMmZrdkJ2WS1rZHZtSlFmUTFzQzZFQVR1ZHhXbDd0Yy1Kb1c5SnRzZVF3QWc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/canada-south-africa-world-cup.png",
      "alt": "A floodlit football stadium at night, the green pitch glowing under bright lights as players celebrate near a corner flag amid drifting confetti",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus, Histories, Book VI (Erato) — Pheidippides runs to Sparta before Marathon (5th c. BCE; trans. G. C. Macaulay)",
        "excerpt": "First of all, while they were still in the city, the generals sent off to Sparta a herald, namely Pheidippides an Athenian and for the rest a runner of long day-courses and one who practised this as his profession.",
        "source": "Herodotus, The History of Herodotus, Book VI, ch. 105, translated by G. C. Macaulay (London: Macmillan, 1890), public domain.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Macaulay)/Book_VI"
      },
      {
        "category": "historical",
        "title": "Pausanias, Description of Greece, Book V (Elis I) — the first Olympic foot-race and its first victor (2nd c. CE; trans. W. H. S. Jones)",
        "excerpt": "This I can prove; for when the unbroken tradition of the Olympiads began there was first the foot-race, and Coroebus an Elean was victor. There is no statue of Coroebus at Olympia, but his grave is on the borders of Elis.",
        "source": "Pausanias, Description of Greece 5.8.6, translated by W. H. S. Jones (Loeb Classical Library), public domain.",
        "href": "https://www.theoi.com/Text/Pausanias5A.html"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book XXIII — the funeral games for Patroclus; Odysseus's last-stride victory in the foot-race (trans. Alexander Pope)",
        "excerpt": "Buoyed by her heavenly force, he seems to swim, And feels a pinion lifting every limb.",
        "source": "Homer, The Iliad of Homer, Book XXIII, translated by Alexander Pope; text via Wikisource, public domain.",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_23"
      },
      {
        "category": "literary",
        "title": "Pindar, Olympian Ode 1 (476 BCE) — victory ode for Hieron's triumph (trans. Ernest Myers)",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice.",
        "source": "Pindar, The Extant Odes of Pindar, Olympian Odes I, translated by Ernest Myers (London: Macmillan, 1874), public domain.",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/1"
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, \"Triumphal March\" (Marcia trionfale) from Aida, Act II (1871)",
        "excerpt": "Verdi's blazing brass fanfare crowns a homecoming hero amid the roar of a triumphant crowd, the orchestra surging with the unmistakable sound of victory. It is the music of glory claimed at the climactic moment, a fitting anthem for a side that seizes its triumph at the very end.",
        "source": "Giuseppe Verdi, Aida (opera, 1871), \"Gran Finale / Marcia trionfale,\" Act II; full scores and parts public domain via IMSLP.",
        "href": "https://imslp.org/wiki/A%C3%AFda_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Terracotta Panathenaic prize amphora depicting a foot-race, attributed to the Euphiletos Painter (Attic black-figure, ca. 530 BCE)",
        "excerpt": "Five bearded runners stretch forward in mid-stride along the belly of a black-figure prize amphora, the kind of oil-filled vessel awarded to victors at the Panathenaic Games. The painted athletes embody the ancient ideal of the contest and the glory of the winner.",
        "source": "Attributed to the Euphiletos Painter, Terracotta Panathenaic prize amphora, ca. 530 BCE, The Metropolitan Museum of Art (Rogers Fund, 1914, acc. no. 14.130.12); image via Wikimedia Commons, public domain.",
        "href": "https://commons.wikimedia.org/wiki/File:Terracotta_Panathenaic_prize_amphora_MET_DP245711.jpg",
        "image": {
          "src": "/covers/canada-south-africa-world-cup--art.png",
          "alt": "Attic black-figure Panathenaic prize amphora showing five nude runners competing in a foot-race",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "sothebys-lewis-collection-record",
    "headline": "Sotheby's sells Joe Lewis art collection for a record $392.6 million in London",
    "overview": "The collection of British billionaire Joe Lewis sold for £296.3 million ($392.6 million) at Sotheby's in London, nearly double its estimate and a record for a single-owner sale in Europe. A Modigliani nude fetched $63.9 million and a 1902 Klimt portrait $47.9 million; only one of the 25 lots failed to sell.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/sothebys-london-masterpiece-sale-earns-392-million-1234753425/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/art-news/market/sothebys-london-june-2026-evening-sale-report-joe-lewis-1234790208/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/sothebys-lewis-collection-record.png",
      "alt": "An elegant auction-house saleroom with a packed crowd of bidders facing a raised rostrum, a single illuminated painting displayed on the wall behind the auctioneer",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder, Natural History, Book XXXV (1st century AD; on painting and its prices)",
        "excerpt": "Four colours only were used by the illustrious painters Apelles, Action, Melanthius and Nicomachus to execute their immortal works—of whites, Melinum; of yellow ochres, Attic; of reds, Pontic Sinopis; of blacks, atramentum—although their pictures each sold for the wealth of a whole town.",
        "source": "Pliny the Elder, Natural History, Book 35, trans. H. Rackham (Loeb), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Natural_History_(Rackham,_Jones,_%26_Eichholz)/Book_35"
      },
      {
        "category": "historical",
        "title": "William Buchanan, Memoirs of Painting (1824; on the dispersal of the Orléans Collection)",
        "excerpt": "In 1792, the Duke d'Orleans, for the purpose of procuring money to agitate the national spirit, of which he always hoped ultimately to profit, sold all the pictures of the Palais Royal.",
        "source": "William Buchanan, Memoirs of Painting, with a Chronological History of the Importation of Pictures by the Great Masters into England since the French Revolution (London: Ackermann, 1824), via Internet Archive",
        "href": "https://archive.org/stream/memoirsofpaintin1to2buch/memoirsofpaintin1to2buch_djvu.txt"
      },
      {
        "category": "literary",
        "title": "Francis Bacon, \"Of Riches\" (Essays, 1625)",
        "excerpt": "I cannot call Riches better than the baggage of virtue. The Roman word is better, impedimenta.",
        "source": "Francis Bacon, The Essays of Francis Bacon, XXXIV \"Of Riches,\" via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Essays_of_Francis_Bacon/XXXIV_Of_Riches"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes 2:8, 2:11 (King James Bible, 1611)",
        "excerpt": "I gathered me also silver and gold, and the peculiar treasure of kings and of the provinces: I gat me men singers and women singers, and the delights of the sons of men, as musical instruments, and that of all sorts. … Then I looked on all the works that my hands had wrought, and on the labour that I had laboured to do: and, behold, all was vanity and vexation of spirit, and there was no profit under the sun.",
        "source": "Bible (King James Version), Ecclesiastes, chapter 2, via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749)",
        "excerpt": "Handel's grand wind-and-orchestra suite was composed under contract to George II to crown a royal celebration in Green Park, turning sound itself into a display of princely magnificence. Like a great single-owner auction, it stages opulence as spectacle: power and taste made audible, and the splendour of a patron broadcast for all to behold.",
        "source": "Music for the Royal Fireworks, HWV 351 (Handel, George Frideric), scores via IMSLP/Petrucci Music Library",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Amedeo Modigliani, Nude on a Blue Cushion (1917)",
        "excerpt": "Modigliani's reclining nudes, of which this is among the most celebrated, are the very type of work that drew the record bids in the Lewis sale—an icon of sensuous modern beauty turned, a century on, into a trophy of the marketplace. Painted under his dealer Zborowski's patronage, once scandalous, it now hangs in a great public collection: beauty first bought, then beyond price.",
        "source": "Amedeo Modigliani, Nude on a Blue Cushion, 1917, oil on canvas, National Gallery of Art, Washington (Chester Dale Collection, 1963.10.46); public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Amedeo_Modigliani_-_Nude_on_a_Blue_Cushion_(1917).jpg",
        "image": {
          "src": "/covers/sothebys-lewis-collection-record--art.png",
          "alt": "Modigliani's 1917 painting Nude on a Blue Cushion, a reclining female nude against a warm ground with a blue cushion",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "meta-ai-glasses-kylie-jenner",
    "headline": "Meta launches its first in-house AI glasses, including a $399 Kylie Jenner edition",
    "overview": "Meta unveiled Meta Glasses, its first AI smart glasses not tied to the Ray-Ban brand, with models starting at $299 and a $399 'Starfire' edition co-designed with Kylie Jenner that features a voice modeled on hers. Built with EssilorLuxottica and running Meta's Muse Spark AI model, the glasses offer a 3K camera, spatial audio and live translation in up to 20 languages.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/25/meta-glasses-smart-ai-kylie-jenner/"
      },
      {
        "name": "Gizmodo",
        "href": "https://gizmodo.com/metas-new-smart-glasses-drop-ray-ban-branding-and-add-kylie-jenner-2000775546"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/meta-ai-glasses-kylie-jenner.png",
      "alt": "A pair of sleek modern smart glasses resting on a minimalist studio surface, a tiny camera lens visible at one corner under soft directional light",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Galileo Galilei, Sidereus Nuncius (The Sidereal Messenger), 1610; trans. E. S. Carlos, 1880",
        "excerpt": "Relying on this, with no labour nor expense, I succeeded in constructing for myself an instrument so superior that objects seen through it appear magnified nearly a thousand times, and more than thirty times nearer than if viewed by the natural powers of sight alone.",
        "source": "Galileo Galilei, The Sidereal Messenger of Galileo Galilei, trans. Edward Stafford Carlos (London: Rivingtons, 1880). Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Sidereal_Messenger_of_Galileo_Galilei/The_Sidereal_Messenger"
      },
      {
        "category": "historical",
        "title": "Roger Bacon, Opus Majus, Part V (Optical Science), c. 1267; trans. Robert Belle Burke, 1928",
        "excerpt": "If a man looks at letters or other small objects through the medium of a crystal or of glass or of some other transparent body placed above the letters, and it is the smaller part of a sphere whose convexity is toward the eye, and the eye is in the air, he will see the letters much better and they will appear larger to him. ... Therefore this instrument is useful to the aged and to those with weak eyes.",
        "source": "Roger Bacon, The Opus Majus of Roger Bacon, Vol. II, trans. Robert Belle Burke (Philadelphia: University of Pennsylvania Press, 1928), Optical Science. Internet Archive.",
        "href": "https://archive.org/details/opusmajusofroger002065mbp"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde, The Picture of Dorian Gray (1891), Chapter 2",
        "excerpt": "How sad it is! I shall grow old, and horrible, and dreadful. But this picture will remain always young. It will never be older than this particular day of June. . . . If it were only the other way! if it were I who was to be always young, and the picture that was to grow old! For that—for that—I would give everything! Yes, there is nothing in the whole world I would not give! I would give my soul for that!",
        "source": "Oscar Wilde, The Picture of Dorian Gray (London: Ward, Lock & Co., 1891), Chapter 2. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_2"
      },
      {
        "category": "literary",
        "title": "Ralph Waldo Emerson, Nature (1836), Chapter I: Nature",
        "excerpt": "Standing on the bare ground,—my head bathed by the blithe air, and uplifted into infinite space,—all mean egotism vanishes. I become a transparent eye-ball. I am nothing. I see all. The currents of the Universal Being circulate through me; I am part or particle of God.",
        "source": "Ralph Waldo Emerson, Nature (Boston: James Munroe and Company, 1836), Chapter 1. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Nature_(1836)/Chapter_1"
      },
      {
        "category": "artistic",
        "title": "Charles Gounod, Faust (1859), Marguerite's \"Jewel Song\" (Air des bijoux), Act III",
        "excerpt": "Ah! at the bottom of the casket is a glass: I there can see myself!—But am I not becoming vain? ... Ah! I laugh, as I pass, to look into a glass; Is it truly Marguerite, then? Is it you? Tell me true! No, no, no, 'tis not you! No, no, that bright face there reflected Must belong to a queen!",
        "source": "Charles Gounod, Faust: A Lyric Drama in Five Acts, libretto by J. Barbier and M. Carré (English translation), Project Gutenberg eBook #45806; score at IMSLP, Faust, CG 4 (Gounod, Charles).",
        "href": "https://imslp.org/wiki/Faust,_CG_4_(Gounod,_Charles)"
      },
      {
        "category": "artistic",
        "title": "Charles Allan Gilbert, All Is Vanity (1892)",
        "excerpt": "A young woman at her vanity table gazes into a large round mirror amid perfume bottles; seen from a distance, the whole scene resolves into a grinning human skull—a memento mori in which the act of admiring oneself is, at the same time, the image of death watching back.",
        "source": "Charles Allan Gilbert, All Is Vanity (1892), pen-and-ink double image. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Allisvanity.jpg",
        "image": {
          "src": "/covers/meta-ai-glasses-kylie-jenner--art.png",
          "alt": "Charles Allan Gilbert's 1892 drawing All Is Vanity: a woman before a vanity mirror that, viewed at a distance, forms a human skull.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "austria-anthropic-eu",
    "headline": "Austria urges the EU to help host AI firm Anthropic after U.S. restricts foreign access",
    "overview": "Austria's state secretary for digitalization, Alexander Proell, wrote to the EU's technology commissioner urging the bloc to explore establishing AI company Anthropic within the European Union, after Washington moved to bar foreigners from using its most advanced models. The letter, released June 28, 2026, argued Europe must not be cut off from major AI innovation, though Proell acknowledged scepticism about whether the step is feasible.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxOV2VmbzlqUks2ZDZGQ2xYcDk0ZEVFS0hCSXFxMUg2amtkOWJmSDkxSV9mb0xRelFJSUMteUJFaG5YS2pSZHJfdVEzeXRPY3dYd2lSejg0SnFvQjhXU0Noak1fSUxuVnUxdDBpWUNKc3BtVTFKTHNSbnFfRkQ0aUY4dENia0pmOGNVeUZDeVVuZWdpS1hqV0R6S3dGcjJEbkV4YVNMS19hMEg2WFFUbGx0UEUtcmRkX0hnWkZz?oc=5"
      },
      {
        "name": "Business Recorder",
        "href": "https://www.brecorder.com/news/40427550/austria-urges-europe-to-host-anthropic-following-us-curbs-on-ai-access"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/austria-anthropic-eu.png",
      "alt": "A grand European Union building of glass and steel flying rows of flags at dusk, cool blue light reflecting off its facade",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Procopius of Caesarea, History of the Wars, Book VIII (Gothic War), ch. 17 (6th century AD) — the monks who promised Justinian the secret of silk",
        "excerpt": "At about this time certain monks, coming from India and learning that the Emperor Justinian entertained the desire that the Romans should no longer purchase their silk from the Persians, came before the emperor and promised so to settle the silk question that the Romans would no longer purchase this article from their enemies, the Persians, nor indeed from any other nation; for they had, they said, spent a long time in the country situated north of the numerous nations of India — a country called Serinda — and there they had learned accurately by what means it was possible for silk to be produced in the land of the Romans. Whereupon the emperor made very diligent enquiries and asked them many questions to see whether their statements were true, and the monks explained to him that certain worms are the manufacturers of silk, nature being their teacher and compelling them to work continually.",
        "source": "Procopius, History of the Wars, Book VIII.17, trans. H. B. Dewing, Loeb Classical Library (1928); LacusCurtius (penelope.uchicago.edu), Procopius, Wars VIII.15–17.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Wars/8C*.html"
      },
      {
        "category": "historical",
        "title": "Einhard, Vita Karoli Magni (Life of Charlemagne), ch. 25 (c. 817–833) — Charlemagne drawing the greatest scholars to his court",
        "excerpt": "He paid the greatest attention to the liberal arts, and showed the greatest respect and bestowed high honours upon those who taught them. For his lessons in grammar he listened to the instruction of Deacon Peter of Pisa, an old man; but for all other subjects Albinus, called Alcuin, also a deacon, was his teacher—a man from Britain, of the Saxon race, and the most learned man of his time.",
        "source": "Einhard, Vita Karoli Magni, trans. A. J. Grant, in Early Lives of Charlemagne by Eginhard and the Monk of St Gall (London: Moring, 1905); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Vita_Karoli_Magni"
      },
      {
        "category": "literary",
        "title": "Francis Bacon, New Atlantis (1627) — the \"Merchants of Light\" of Salomon's House",
        "excerpt": "For the several employments and offices of our fellows, we have twelve that sail into foreign countries under the names of other nations (for our own we conceal), who bring us the books and abstracts, and patterns of experiments of all other parts. These we call merchants of light.",
        "source": "Francis Bacon, New Atlantis (1627); Wikisource.",
        "href": "https://en.wikisource.org/wiki/New_Atlantis"
      },
      {
        "category": "literary",
        "title": "Dante Alighieri, Paradiso, Canto XVII (c. 1320, trans. Longfellow 1867) — Cacciaguida foretells the bitterness of exile and dependence on foreign hospitality",
        "excerpt": "Thou shalt abandon everything beloved / Most tenderly, and this the arrow is / Which first the bow of banishment shoots forth. / Thou shalt have proof how savoureth of salt / The bread of others, and how hard a road / The going down and up another's stairs.",
        "source": "Dante Alighieri, The Divine Comedy, Paradiso, Canto XVII, trans. Henry Wadsworth Longfellow (1867); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_17"
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Parnasso in festa, HWV 73 (serenata, 1734) — Apollo and the Muses keep festival on Parnassus",
        "excerpt": "Composed by Handel and first performed at the King's Theatre, London, on 13 March 1734, this serenata stages Apollo and the Muses celebrating on Mount Parnassus, the mythic seat of the arts and patronage. It is a courtly image of genius gathered and honoured, the gods of learning and music feted by a generous host. The full public-domain score is hosted on IMSLP.",
        "source": "G. F. Handel, Parnasso in festa, per li sponsali di Teti e Peleo, HWV 73 (1734); IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Parnasso_in_festa,_HWV_73_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Raphael (Raffaello Sanzio), The School of Athens (fresco, 1509–1511), Stanza della Segnatura, Apostolic Palace, Vatican",
        "excerpt": "Raphael's fresco gathers the philosophers and scholars of antiquity beneath the vaults of an idealized academy, a vision of knowledge welcomed, housed and honoured in one place. It is the archetypal image of a polity that makes itself the home of the wise, the patron of learning that draws genius within its walls.",
        "source": "Raphael, The School of Athens, 1509–1511, fresco, 500 × 770 cm, Stanza della Segnatura, Vatican; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg",
        "image": {
          "src": "/covers/austria-anthropic-eu--art.png",
          "alt": "Raphael's fresco The School of Athens, with Plato and Aristotle at the center of an assembly of ancient philosophers and scholars within a grand classical hall.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "vietnam-arrests-dissent",
    "headline": "Rights group warns Vietnam is escalating arrests under broad laws to silence dissent",
    "overview": "A rights group warned that Vietnam, under Communist Party chief and President To Lam, is increasingly using vaguely worded laws to jail activists and critics, citing growing use of Article 331 of the penal code, which carries up to seven years in prison. The report said the crackdown is driven by fears of a 'color revolution' and noted Hanoi's coordination with Beijing on 'political security.'",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQaGs5M1dja0dNOWdkelhybXVkRjIwemc1VDVLc1E1bno1R2drUWQ0Vm1mdkhDNWltMVR0Sms2NHo3MXJVN3lCZlR4RGFWUnRJOHVxeEhua0gxQXVIdC1kZE84aU03VUx3em8zWTNXMGZnVTdqZGRJM2VmdWhJOGxHNEdoMkhnMUtBVl9Ra0lR?oc=5"
      },
      {
        "name": "The Hill",
        "href": "https://thehill.com/homenews/ap/ap-international/ap-a-rights-group-warns-vietnam-is-ramping-up-arrests-under-broad-laws-to-crush-dissent/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/vietnam-arrests-dissent.png",
      "alt": "An empty prison corridor of grey concrete and steel bars in dim light, a single barred window casting a faint shaft of light on the floor",
      "credit": "AI-generated"
    },
    "edition": "Morning Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Apology of Socrates (Plato, c. 399 BCE)",
        "excerpt": "Men of Athens, I respect and love you, but I shall obey the god rather than you, and while I live and am able to continue, I shall never give up philosophy or stop exhorting you and pointing out the truth to any one of you whom I may meet",
        "source": "Plato, Apology, 29d, trans. Harold North Fowler, Loeb Classical Library; Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0170:text=Apol.:section=29d"
      },
      {
        "category": "historical",
        "title": "\"J'Accuse...!\" (Émile Zola, open letter, 1898)",
        "excerpt": "I repeat it with a more vehement certainty: the truth marches on and nothing will stop it.",
        "source": "Émile Zola, \"J'Accuse...!\", open letter to Félix Faure, President of the French Republic, published in L'Aurore, 13 January 1898; English translation, Wikisource",
        "href": "https://en.wikisource.org/wiki/Translation:J%27Accuse...!"
      },
      {
        "category": "literary",
        "title": "Antigone (Sophocles, c. 441 BCE)",
        "excerpt": "Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods. For their life is not of today or yesterday, but for all time, and no man knows when they were first put forth.",
        "source": "Sophocles, Antigone, ed./trans. Sir Richard Jebb; Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "Areopagitica (John Milton, 1644)",
        "excerpt": "as good almost kill a Man as kill a good Book; who kills a Man kills a reasonable creature, Gods Image; but hee who destroyes a good Booke, kills reason it selfe, kills the Image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica: A Speech for the Liberty of Unlicensed Printing, 1644; Wikisource",
        "href": "https://en.wikisource.org/wiki/Areopagitica_(1644)"
      },
      {
        "category": "artistic",
        "title": "Prisoners' Chorus, \"O welche Lust,\" from Fidelio, Op. 72 (Ludwig van Beethoven, 1814)",
        "excerpt": "In Beethoven's only opera, prisoners are briefly allowed up from their dungeon into the open air, and they sing trembling of light and freedom before the guards drive them back below. The hushed, swelling chorus turns the simple act of breathing freely into an anthem of conscience caged by tyranny. It remains music's great cry for those silenced behind prison walls.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72, Act I, No. 10, Prisoners' Chorus \"O welche Lust, in freier Luft\"; scores at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Prisoners Exercising (Prisoners' Round), Vincent van Gogh, 1890",
        "excerpt": "A line of inmates shuffles in an endless circle at the bottom of a deep brick shaft, hemmed in by towering walls and a few unreachable windows that admit only a sliver of sky. Van Gogh, painting from inside an asylum, reduced each man to a bowed, anonymous figure stripped of will and voice, locked into a motion that goes nowhere. The image renders confinement as a closed loop of futility, a fitting mirror for those silenced and detained for daring to speak.",
        "source": "Vincent van Gogh, Prisoners Exercising (Prisoners' Round), 1890, Pushkin Museum of Fine Arts, Moscow; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_Willem_van_Gogh_037.jpg",
        "image": {
          "src": "/covers/vietnam-arrests-dissent--art.png",
          "alt": "Prisoners trudging in a tight circle within a deep, windowless brick courtyard, dwarfed by high prison walls",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "iran-strikes-bahrain-kuwait",
    "headline": "Iran strikes U.S. targets in Bahrain and Kuwait after renewed American airstrikes, threatening to abandon ceasefire talks",
    "overview": "Iran's Revolutionary Guard fired ballistic missiles and drones at U.S. military targets in Bahrain and Kuwait on June 28, 2026, striking near the Fifth Fleet's base at Port Salman and the Ali al-Salem airbase, after fresh American airstrikes hit Iranian missile, drone and radar sites near the Strait of Hormuz. The U.S. said the strikes answered an Iranian drone attack on the oil tanker Kiku; Iran called the American raids a violation of the June ceasefire memorandum. Tehran warned that continued attacks could bring a complete halt to negotiations aimed at ending the war.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQcDBTQkFEbzlzV3FGUXhBeks0Wm5CV2RIU0J4aFcwTl9jRFRNeHRNbkxzVEZNa3ZNSTcwS1FDZm5PM3RDbVJuMFc0bWRwR1hhSlZFVGlMSkdvOC1GcnlLUWpUbjQ0aFlMYWN3X0gtdVBUWHZYSHNKR3BKelJtdUZ1dUpnTWVubU1BOWowd1N3aE1kckE1Uklya1huN25iLUxYM2Q5N0JtcVY?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/28/iran-attacks-kuwait-and-bahrain-in-response-to-us-strikes"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/iran-strikes-bahrain-kuwait.png",
      "alt": "Night sky over a Gulf coastline streaked with missile trails and anti-air fire, a struck military installation burning on the horizon as sirens flare",
      "credit": "AI-generated"
    },
    "lead": true,
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Mytilenian Debate, History of the Peloponnesian War (Book III)",
        "excerpt": "For myself, I adhere to my former opinion, and wonder at those who have proposed to reopen the case of the Mitylenians, and who are thus causing a delay which is all in favour of the guilty, by making the sufferer proceed against the offender with the edge of his anger blunted; although where vengeance follows most closely upon the wrong, it best equals it and most amply requites it.",
        "source": "Thucydides, History of the Peloponnesian War, Book III (Cleon's speech), trans. Richard Crawley",
        "href": "https://classics.mit.edu/Thucydides/pelopwar.3.third.html"
      },
      {
        "category": "historical",
        "title": "The Outbreak of the Second Punic War (Book XXI)",
        "excerpt": "The Romans were furious with indignation because the vanquished had dared to take the offensive against their conquerors; the Carthaginians bitterly resented what they regarded as the tyrannical and rapacious conduct of Rome.",
        "source": "Livy, The History of Rome, Book XXI, ch. 1, trans. Rev. Canon Roberts (E. P. Dutton, 1912), via Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0144:book%3D21:chapter%3D1"
      },
      {
        "category": "literary",
        "title": "The Iliad, Book I (the wrath of Achilles)",
        "excerpt": "Achilles' wrath, to Greece the direful spring\nOf woes unnumber'd, heavenly goddess, sing!\nThat wrath which hurl'd to Pluto's gloomy reign\nThe souls of mighty chiefs untimely slain;\nWhose limbs unburied on the naked shore,\nDevouring dogs and hungry vultures tore.",
        "source": "Homer, The Iliad, Book I, trans. Alexander Pope (1715-1720)",
        "href": "https://poets.org/poem/iliad-book-i-lines-1-15"
      },
      {
        "category": "literary",
        "title": "The Persians (the ghost of Darius on hubris and retribution)",
        "excerpt": "Zeus, of a truth, is a chastiser of overweening pride and corrects with heavy hand. ... For presumptuous pride, when it has burgeoned, bears as its fruit a crop of calamity, whence it reaps a plenteous harvest of tears.",
        "source": "Aeschylus, The Persians, trans. Herbert Weir Smyth (1922), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/The_Persians"
      },
      {
        "category": "artistic",
        "title": "The Third of May 1808",
        "excerpt": "Goya's canvas freezes the instant before slaughter: a faceless firing squad of soldiers, rifles raised in a rigid mechanical row, confronts a huddle of condemned civilians lit by a stark lantern. At the center a man in a white shirt throws his arms wide in helpless defiance, his hands marked like wounds, while the dead already lie in a pool of blood at his feet. The painting turns reprisal into an image of war's indiscriminate vengeance against the defenseless.",
        "source": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:El_tres_de_mayo_de_1808_en_Madrid.jpg",
        "image": {
          "src": "/covers/iran-strikes-bahrain-kuwait--art.png",
          "alt": "Goya's The Third of May 1808: a firing squad of Napoleonic soldiers executes a group of Spanish civilians at night, a man in a white shirt flinging his arms wide before the rifles",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Mars, the Bringer of War (from The Planets, Op. 32)",
        "excerpt": "A relentless ostinato hammers in an off-kilter five-beat meter, driving strings and brass forward like the gears of a war machine grinding into motion. Dissonant fanfares pile atop one another in a remorseless crescendo, each repetition more massive and menacing, until the orchestra detonates in pounding, mechanized fury.",
        "source": "Gustav Holst, \"Mars, the Bringer of War\" from The Planets, Op. 32 (1914-16)",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      }
    ],
    "rank": 14
  },
  {
    "slug": "uganda-military-shuts-media",
    "headline": "Uganda's military chief orders the shutdown of two of the country's leading media outlets",
    "overview": "Uganda's military chief, General Muhoozi Kainerugaba, ordered the shutdown of two of the country's leading media outlets, the Daily Monitor newspaper and the broadcaster NTV Uganda, both owned by Nation Media Group. Declaring on X that \"In Uganda, I do not believe in a free press,\" he said all critical coverage must be cleared by his office. The move, made as Kainerugaba is positioned to succeed his father President Yoweri Museveni, drew condemnation from press-freedom advocates.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cj9gyk1z7ngo"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/28/ugandas-military-chief-orders-shutdown-of-two-media-outlets"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/uganda-military-shuts-media.png",
      "alt": "A silenced printing press standing dark and still in an empty newsroom, lights switched off and a single unfinished front page left in the carriage",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Burning of Cremutius Cordus' Histories",
        "excerpt": "Under the emperor Tiberius, the Roman historian Cremutius Cordus was prosecuted for praising the assassins of Caesar, and the Senate ordered his writings burned. Tacitus records that the suppression failed: hidden copies survived and circulated again, and the persecution only magnified the very authority it sought to erase.",
        "source": "Tacitus, Annals, Book IV.34-35",
        "href": "https://www.poetryintranslation.com/PITBR/Latin/AnnalsBookIV-34to58.php"
      },
      {
        "category": "historical",
        "title": "Milton's Areopagitica Against Licensing",
        "excerpt": "Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica (1644)",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm"
      },
      {
        "category": "literary",
        "title": "Milton's Plea for the Liberty to Speak",
        "excerpt": "Give me the liberty to know, to utter, and to argue freely according to conscience, above all liberties.",
        "source": "John Milton, Areopagitica (1644)",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm"
      },
      {
        "category": "literary",
        "title": "Heine's Warning in Almansor",
        "excerpt": "Das war ein Vorspiel nur, dort wo man Bücher / verbrennt, verbrennt man auch am Ende Menschen.",
        "source": "Heinrich Heine, Almansor (1823)",
        "href": "https://de.wikisource.org/wiki/Almansor_(Heine)"
      },
      {
        "category": "artistic",
        "title": "Daumier, Ne vous y frottez pas!! (Freedom of the Press)",
        "excerpt": "Honoré Daumier's 1834 lithograph plants a defiant printer in the center of the frame, sleeves rolled, fists ready, standing his ground over the words \"Liberté de la presse,\" holding off a charging King Louis-Philippe. The print became an emblem of the press resisting the state, made the year before censorship laws silenced political caricature in France.",
        "source": "Honoré Daumier, L'Association Mensuelle, Plate 20 (March 1834), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/Category:Lithographs_by_Honor%C3%A9_Daumier",
        "image": {
          "src": "/covers/uganda-military-shuts-media--art.png",
          "alt": "A burly printer stands defiant over the words Liberté de la presse as the king is held at bay, in Daumier's 1834 lithograph",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Étude in C minor, Op. 10 No. 12 (\"Revolutionary\")",
        "excerpt": "Over a stormy, cascading torrent of left-hand passagework, the right hand hurls out defiant, declamatory phrases that refuse to be silenced. Surging and turbulent, the music channels anguish into resistance, rising again and again from the depths until it ends in a fierce, unbowed gesture of defiance.",
        "source": "Frédéric Chopin, \"Revolutionary\" Étude in C minor, Op. 10 No. 12 (1831)",
        "href": "https://imslp.org/wiki/Études,_Op.10_(Chopin,_Frédéric)"
      }
    ],
    "rank": 15
  },
  {
    "slug": "south-korea-japan-defence-ties",
    "headline": "South Korea and Japan reaffirm North Korea's denuclearisation as a shared goal and pledge closer defence ties",
    "overview": "South Korea and Japan reaffirmed their shared goal of the denuclearisation of the Korean peninsula and pledged to deepen defence cooperation during the sixth round of bilateral defence talks. Meeting in Seoul on 28 June 2026, South Korean Defence Minister Ahn Gyu-back and Japanese Defence Minister Shinjiro Koizumi agreed to revive joint search-and-rescue drills and to work on regional stability bilaterally and alongside Washington. The warming ties mark continued reconciliation between two neighbours long divided by wartime history.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQcHYtTGtUR2VwUTN6TGpYaGpCeU9pWnp0WHU1YjhPc3V3UWNSS2V2V2t2Yl9qYVpPeVRhVHZna3VlWU9FOXBsOVU3YXZGdG03b2RZTFdoajEydlQwS0ZLb2xXTkJtNmNzMW5qUF9PNWR3a19tVlJxWHA0ajdOWWtSYmZ1X1FFbThsakN3VkRuQmQ3MnZ5ZWxZRjlGYnBhWFVRTWtiV2RWeE5yVWJIbkt3ZFNkRGJzRkFldkZIc0F6Tk8?oc=5"
      },
      {
        "name": "Japan Today (Reuters)",
        "href": "https://japantoday.com/category/politics/south-korea-japan-reaffirm-denuclearisation-goal-closer-defence-ties"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/south-korea-japan-defence-ties.png",
      "alt": "The national flags of South Korea and Japan standing side by side before a diplomatic handshake, no text",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Greek city-states reconcile their feuds to face Persia (Herodotus, Histories 7.145)",
        "excerpt": "they thought it well first of all things to reconcile the enmities and bring to an end the wars which they had with one another",
        "source": "Herodotus, The Histories, Book 7.145 (Macaulay translation)",
        "href": "https://lexundria.com/hdt/7.145/mcly"
      },
      {
        "category": "historical",
        "title": "The Elysee Treaty: France and Germany end centuries of enmity (1963)",
        "excerpt": "Signed on 22 January 1963 by Charles de Gaulle and Konrad Adenauer, the Elysee Treaty bound two states that had fought three wars in a century into formal friendship. It mandated regular consultations on defence, foreign policy, education and youth, transforming hereditary adversaries into the core partnership of European integration.",
        "source": "Wikipedia, Elysee Treaty",
        "href": "https://en.wikipedia.org/wiki/%C3%89lys%C3%A9e_Treaty"
      },
      {
        "category": "literary",
        "title": "Priam and Achilles weep together (Homer, Iliad, Book 24)",
        "excerpt": "the one for man-slaying Hector wept sore, while he grovelled at Achilles' feet, but Achilles wept for his own father, and now again for Patroclus",
        "source": "Homer, Iliad, Book 24 (A. T. Murray translation, Perseus)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D24%3Acard%3D507"
      },
      {
        "category": "literary",
        "title": "Athena turns strife outward against foreign foes (Aeschylus, Eumenides)",
        "excerpt": "Let their war be with foreign enemies, and without stint for one in whom there will be a terrible passion for glory",
        "source": "Aeschylus, Eumenides (H. W. Smyth translation, Perseus)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0006:card=858"
      },
      {
        "category": "artistic",
        "title": "The Ratification of the Treaty of Munster (Gerard ter Borch, 1648)",
        "excerpt": "Ter Borch's small oil on copper records the swearing of the oath that ended the Eighty Years' War between Spain and the Dutch Republic on 15 May 1648. Former enemies, Catholic Spaniards and Reformed Dutch, raise their hands in the Munster town hall in the first known oil painting to depict an actual political event factually rather than as allegory.",
        "source": "Gerard ter Borch, The Ratification of the Treaty of Munster (1648), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Ratification_of_the_Treaty_of_Munster,_Gerard_Ter_Borch_(1648).jpg",
        "image": {
          "src": "/covers/south-korea-japan-defence-ties--art.png",
          "alt": "Delegates of Spain and the Dutch Republic swearing the oath ratifying the Peace of Munster in 1648",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Sheep May Safely Graze (Schafe können sicher weiden), from BWV 208",
        "excerpt": "Two gentle flutes weave a tranquil, lilting pastoral above a calm, steady accompaniment, painting a meadow at peace under watchful, benevolent care. The serene melody unfolds with unhurried grace, evoking flocks grazing in safety where a wise shepherd keeps order and all is secure.",
        "source": "Johann Sebastian Bach, \"Sheep May Safely Graze\" from Cantata BWV 208 (1713)",
        "href": "https://imslp.org/wiki/Was_mir_behagt,_ist_nur_die_muntre_Jagd,_BWV_208_(Bach,_Johann_Sebastian)"
      }
    ],
    "rank": 16
  },
  {
    "slug": "budapest-first-pride-post-orban",
    "headline": "Tens of thousands march in Budapest's first Pride since Viktor Orbán was voted out of power",
    "overview": "Tens of thousands of people marched through Budapest on Saturday, June 27, 2026, in the city's 31st annual Pride parade, the first since former Prime Minister Viktor Orbán, who had sought to ban the event, was voted out in an April election. Setting off from the Opera house and crossing the Erzsébet Bridge over the Danube amid a record heat wave, marchers waved rainbow and EU flags in celebration. Police authorized and secured the route, even though the new government has not yet repealed the Orbán-era law that had outlawed the march.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/videos/c23yezpg2ypo"
      },
      {
        "name": "PBS NewsHour (Associated Press)",
        "href": "https://www.pbs.org/newshour/world/tens-of-thousands-march-in-the-first-budapest-pride-since-viktor-orban-was-voted-out"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/budapest-first-pride-post-orban.png",
      "alt": "Marchers with rainbow flags at Budapest Pride",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Hungarian Revolution of 1956",
        "excerpt": "In October 1956 the people of Budapest rose in a spontaneous nationwide revolt against Soviet domination and the Stalinist regime, briefly installing reform premier Imre Nagy and reclaiming the streets and public squares of the capital. The Soviet Union answered with a massive military invasion on 4 November that crushed the uprising and led to Nagy's execution. Though defeated, the revolution endured as a powerful symbol of the Hungarian struggle for freedom and self-determination.",
        "source": "Encyclopaedia Britannica, 'Hungarian Revolution'",
        "href": "https://www.britannica.com/event/Hungarian-Revolution-1956"
      },
      {
        "category": "historical",
        "title": "The fall of the Berlin Wall (1989)",
        "excerpt": "On the night of November 9, 1989, East German authorities opened the border crossings and crowds streamed through the Berlin Wall, ending nearly three decades of division and becoming an enduring symbol of liberation as an authoritarian order gives way and ordinary citizens reclaim public space in jubilation.",
        "source": "U.S. National Archives",
        "href": "https://www.archives.gov/research/foreign-policy/cold-war/fall-of-berlin-wall"
      },
      {
        "category": "literary",
        "title": "Lord Byron, \"Sonnet on Chillon\" (1816)",
        "excerpt": "Eternal Spirit of the chainless Mind!\nBrightest in dungeons, Liberty! thou art:\nFor there thy habitation is the heart—\nThe heart which love of thee alone can bind;\nAnd when thy sons to fetters are consigned—\nTo fetters, and the damp vault's dayless gloom,\nTheir country conquers with their martyrdom,\nAnd Freedom's fame finds wings on every wind.\nChillon! thy prison is a holy place,\nAnd thy sad floor an altar—for 'twas trod,\nUntil his very steps have left a trace\nWorn, as if thy cold pavement were a sod,\nBy Bonnivard!—May none those marks efface!\nFor they appeal from tyranny to God.",
        "source": "Lord Byron, Sonnet on Chillon (prefatory sonnet to The Prisoner of Chillon, 1816)",
        "href": "https://en.wikisource.org/wiki/Sonnet_on_Chillon"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"The Mask of Anarchy\" (1819)",
        "excerpt": "Rise like Lions after slumber / In unvanquishable number— / Shake your chains to earth like dew / Which in sleep had fallen on you— / Ye are many—they are few.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Masque_of_Anarchy"
      },
      {
        "category": "artistic",
        "title": "Eugène Delacroix, \"Liberty Leading the People\" (1830)",
        "excerpt": "Delacroix's painting commemorates the July Revolution of 1830, with a bare-breasted personification of Liberty raising the French tricolor and leading a crowd of fighters from every class over the barricades. It has become a universal emblem of popular uprising and of freedom won in the streets.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/budapest-first-pride-post-orban--art.png",
          "alt": "Liberty, raising the tricolor flag, leads a crowd over a barricade in Delacroix's painting",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, \"Va, pensiero\" (Chorus of the Hebrew Slaves) from Nabucco (1842)",
        "excerpt": "Verdi's chorus for the captive Hebrew slaves, longing on golden wings for their lost homeland, became an unofficial anthem of freedom and national longing. Sung in unison by an exiled people yearning for liberty, it grew into a rallying cry of solidarity and hope against oppression.",
        "source": "IMSLP",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 17
  },
  {
    "slug": "bis-warns-global-risks",
    "headline": "Bank for International Settlements warns that high debt and an AI investment boom are raising global financial risks",
    "overview": "In its Annual Economic Report 2026, released on 28 June 2026, the Bank for International Settlements warned that record-high public debt, an investment boom tied to artificial intelligence, and underlying financial fragilities are raising risks to the global economy. The report flagged elevated asset valuations and investor complacency, noting that the AI boom is increasingly financed by debt and complex funding structures and could end in the kind of overinvestment seen in past boom-and-bust cycles. The BIS urged policymakers to safeguard price stability, ensure fiscal sustainability, and strengthen oversight beyond the banking sector.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMigAFBVV95cUxNNVR4T0hxcEdBMnhpb3UwQThfajRZbl9DVkdCNVRmaUFoaHhNX1hzWm9MM3pXTk5aazFzMGpySTRCY3BPWUJfX0cyZE41ZjlmOVVOdWZBVk81QkllWjdxcEFSYmJnU19tZjN2MEpabDFrSS1FZk9LMXNfR3FTX0pLYg?oc=5"
      },
      {
        "name": "Bank for International Settlements",
        "href": "https://www.bis.org/publ/arpdf/ar2026e.htm"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/bis-warns-global-risks.png",
      "alt": "The Bank for International Settlements tower in Basel",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Charles Mackay, \"The South-Sea Bubble\" (Memoirs of Extraordinary Popular Delusions)",
        "excerpt": "Exchange Alley was in a fever of excitement. The Company's stock, which had been at a hundred and thirty the previous day, gradually rose to three hundred, and continued to rise with the most astonishing rapidity during the whole time that the bill in its several stages was under discussion.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm"
      },
      {
        "category": "historical",
        "title": "Herodotus, The Histories, Book I (Solon warns Croesus)",
        "excerpt": "Croesus, thou art inquiring about human fortunes of one who well knows that the Deity is altogether envious and apt to disturb our lot... But we must of every thing examine the end and how it will turn out at the last, for to many God shows but a glimpse of happiness and then plucks them up by the roots and overturns them.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2707/2707-h/2707-h.htm"
      },
      {
        "category": "literary",
        "title": "The Parable of the Rich Fool, Luke 12:16-21 (King James Version)",
        "excerpt": "And he spake a parable unto them, saying, The ground of a certain rich man brought forth plentifully: And he thought within himself, saying, What shall I do, because I have no room where to bestow my fruits? And he said, This will I do: I will pull down my barns, and build greater; and there will I bestow all my fruits and my goods. And I will say to my soul, Soul, thou hast much goods laid up for many years; take thine ease, eat, drink, and be merry. But God said unto him, Thou fool, this night thy soul shall be required of thee: then whose shall those things be, which thou hast provided? So is he that layeth up treasure for himself, and is not rich toward God.",
        "source": "The Gospel According to St. Luke 12:16-21, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "literary",
        "title": "Dante Alighieri, Inferno, Canto VII (the hoarders and the spendthrifts), trans. Longfellow",
        "excerpt": "Crying, \"Why keepest?\" and, \"Why squanderest thou?\"... Ill giving and ill keeping the fair world have ta'en from them, and placed them in this scuffle... Now canst thou, Son, behold the transient farce of goods that are committed unto Fortune.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_7"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, \"The South Sea Scheme\" (1721)",
        "excerpt": "Hogarth's satirical engraving caricatures the speculative madness of the South Sea Bubble: crowds clamber onto a spinning merry-go-round of fortune while Honesty is broken on the wheel and Honour is flogged. The print, often called the first editorial cartoon, exposes the greed, corruption and credulity that drove ordinary people to ruin when the bubble burst.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth,_The_South_Sea_Scheme,_1721,_NGA_30435.jpg",
        "image": {
          "src": "/covers/bis-warns-global-risks--art.png",
          "alt": "Hogarth's 1721 engraving 'The South Sea Scheme' depicting the speculative frenzy of the South Sea Bubble",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Danse macabre, Op. 40",
        "excerpt": "A solo violin, tuned to a sour, grating interval, summons skeletons from their graves to caper in a feverish midnight waltz where king and pauper dance as equals. The whirling revelry spins ever faster and more delirious until a rooster's crow scatters the dancers and the giddy carnival collapses back into silence.",
        "source": "Camille Saint-Saëns, Danse macabre, Op. 40 (1874)",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Saëns,_Camille)"
      }
    ],
    "rank": 18
  },
  {
    "slug": "vw-shareholder-china-models-germany",
    "headline": "A key Volkswagen shareholder proposes building Chinese-brand cars at the company's under-used German plants",
    "overview": "Lower Saxony premier Olaf Lies, who sits on Volkswagen's supervisory board representing the carmaker's second-largest shareholder, proposed building Chinese-brand models at VW's under-used German factories to stabilise plant utilisation amid weak electric-vehicle demand. Producing Chinese cars inside the European Union would also let those manufacturers bypass import tariffs while preserving German jobs. Volkswagen's leadership signalled openness to exploring the idea.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOeERBal9MZVI0Q0d4anN0bjEwbnNkSWFXbUJpeUc4LWFYMzlkMXZXWU1WaUdwcGk1QklXNTBtVTIyYnR4RG4ydkZLT2xqckQ3SHdjM251WDRTTXBSVmVkWldRaGRqMEFPcTZJWG9MWDBiUGxLaXVrRDRZWFBNbUhRcGNoRktVLU82RVY0WkZIOFRXSDRYc01SRVQwc0lRemVYYWFfWkQtOWpFYVZmZDVZb1RUUUl3NW5N?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://uk.finance.yahoo.com/news/key-volkswagen-shareholder-pitches-producing-093138488.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/vw-shareholder-china-models-germany.png",
      "alt": "A vast, idle German automobile assembly hall with empty production lines and silent machinery, no text, no logos",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Britain Loses Its Crown as 'the Workshop of the World'",
        "excerpt": "From 1815 to 1870 Britain was the first industrial nation and styled itself 'the workshop of the world,' underselling rival nations in their own markets. Yet by 1900 Germany was outproducing Britain in pig iron and the United States produced nearly double, as both invested in education and new technologies the early leader had pioneered. The original master of industry was overtaken by the pupils it had once supplied.",
        "source": "Wikipedia, Manufacturing in the United Kingdom",
        "href": "https://en.wikipedia.org/wiki/Manufacturing_in_the_United_Kingdom"
      },
      {
        "category": "historical",
        "title": "Honda Builds Japanese Cars on American Soil at Marysville",
        "excerpt": "On 1 November 1982 the first Honda Accord rolled off the line at Marysville, Ohio, the first Japanese automaker to build a car in the United States. As Japanese rivals overtook Detroit, they planted factories inside their competitor's home market to make foreign-brand cars on local soil. The plant grew into a vast operation, a mirror image of the proposal that foreign models now be built in Germany.",
        "source": "Wikipedia, Marysville Auto Plant",
        "href": "https://en.wikipedia.org/wiki/Marysville_Auto_Plant"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes 9:11 — The Race Is Not to the Swift",
        "excerpt": "I returned, and saw under the sun, that the race is not to the swift, nor the battle to the strong, neither yet bread to the wise, nor yet riches to men of understanding, nor yet favour to men of skill; but time and chance happeneth to them all.",
        "source": "Bible (King James Version), Ecclesiastes 9:11",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "literary",
        "title": "Oliver Goldsmith, \"The Deserted Village\" (1770)",
        "excerpt": "Ill fares the land, to hastening ills a prey,\nWhere wealth accumulates, and men decay:\nPrinces and lords may flourish, or may fade;\nA breath can make them, as a breath has made:\nBut a bold peasantry, their country's pride,\nWhen once destroy'd, can never be supplied.",
        "source": "Oliver Goldsmith, The Deserted Village (1770)",
        "href": "https://www.gutenberg.org/files/50500/50500-h/50500-h.htm"
      },
      {
        "category": "artistic",
        "title": "Adolph Menzel, 'The Iron Rolling Mill' (Eisenwalzwerk)",
        "excerpt": "Painted 1872-1875, Menzel's vast canvas depicts a Silesian rail-works ablaze with furnaces and labouring men, the first large-format painting of a great industrial operation. It captured German industry at the moment of its rise, the very heavy industry whose modern descendant now contemplates handing its idle halls to foreign hands. The 'Modern Cyclopes' of the title cast Germany's workers as titans of a new age.",
        "source": "Adolph Menzel, Alte Nationalgalerie, Berlin (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/vw-shareholder-china-models-germany--art.png",
          "alt": "Adolph Menzel's painting The Iron Rolling Mill, showing workers labouring amid the glow of furnaces in a 19th-century German ironworks",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner, the Forging Song from 'Siegfried'",
        "excerpt": "In Act I of Wagner's 'Siegfried' (WWV 86C), the young hero forges the broken sword Nothung anew, shredding, melting and recasting the metal as he sings 'Hoho! Hoho! Hohei! Schmiede, mein Hammer.' The Forging Song is the supreme musical emblem of German smithcraft and the reforging of strength from shattered pieces. It sounds the theme of industrial renewal that now hangs over Volkswagen's silent forges.",
        "source": "Richard Wagner, 'Siegfried' WWV 86C (IMSLP, public domain)",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      }
    ],
    "rank": 19
  },
  {
    "slug": "kentucky-flooding-deaths",
    "headline": "At least four people die in flooding from heavy rains in Kentucky, the governor says",
    "overview": "At least four people died in flooding caused by heavy rains in Kentucky, Governor Andy Beshear said. Storms dropped as much as 10 inches of rain across the region, knocking out roads and trapping residents inside homes and vehicles. Emergency crews carried out numerous water rescues as the governor declared a state of emergency.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxNSXpFdWlZaWlJVVZNNndBVHB2a0lxaG9pNWxOLTJlN3IzdXZGN2ZyVG9IZDZHSWd6UjhXbENKdnA5MlF1VUg2akJ1a2FZaDVLREtIeVVJYUVUYzVFcVUyQklYWkd0ZmF2Zk5TV2JPVFlyZW5VNFdYLXJIT3JhUGExQkdiYzMwMTA5YnlFa0F4d0syclFHYkJhLW15U1BOODJ6?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/kentucky-heavy-rain-flood-deaths/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/kentucky-flooding-deaths.png",
      "alt": "A flooded street with buildings and vehicles standing in brown floodwater.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Johnstown Flood (1889)",
        "excerpt": "On May 31, 1889, after days of heavy rain, the South Fork Dam above Johnstown, Pennsylvania, gave way and sent some 20 million tons of water roaring down the valley. More than 2,200 people were killed in one of the deadliest flood disasters in American history. The catastrophe became a national symbol of how swiftly rising water can overwhelm a community, and it spurred a landmark relief effort by the new American Red Cross under Clara Barton.",
        "source": "National Park Service",
        "href": "https://www.nps.gov/jofl/learn/historyculture/index.htm"
      },
      {
        "category": "historical",
        "title": "The Great Mississippi Flood of 1927",
        "excerpt": "In the spring of 1927 the Mississippi River, swollen by months of relentless rain, burst its levees and inundated some 27,000 square miles across the lower South. Hundreds died and roughly 700,000 people were displaced as floodwaters reached depths of up to thirty feet. The disaster reshaped federal flood policy and drove a wave of migration, and it remains one of the most destructive river floods in United States history.",
        "source": "PBS American Experience",
        "href": "https://www.pbs.org/wgbh/americanexperience/films/flood/"
      },
      {
        "category": "literary",
        "title": "The Genesis Flood (Book of Genesis, KJV)",
        "excerpt": "In the six hundredth year of Noah's life, in the second month, the seventeenth day of the month, the same day were all the fountains of the great deep broken up, and the windows of heaven were opened. And the rain was upon the earth forty days and forty nights. And the waters prevailed, and were increased greatly upon the earth; and the ark went upon the face of the waters. And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered.",
        "source": "Genesis 7 (King James Version), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "The Flood of Deucalion (Ovid, Metamorphoses, Book I)",
        "excerpt": "With soaking wings the South Wind flies abroad, having his terrible face covered with pitchy darkness; his beard is loaded with showers, the water streams down from his hoary locks, clouds gather upon his forehead, his wings and the folds of his robe drip with wet. And now sea and land had no mark of distinction; everything now was ocean; and to that ocean shores were wanting.",
        "source": "Ovid's Metamorphoses, trans. Henry T. Riley (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/21765/21765-h/21765-h.htm"
      },
      {
        "category": "artistic",
        "title": "Francis Danby, \"The Deluge\" (exhibited 1840)",
        "excerpt": "Francis Danby's vast apocalyptic canvas depicts the Genesis flood at its climax, with churning black waves engulfing the last desperate figures clinging to rocks and one another beneath a storm-torn sky. The scene fuses sublime terror and divine judgment, dwarfing humanity against the overwhelming force of the deluge. The painting now hangs in Tate Britain, London.",
        "source": "Francis Danby, The Deluge (exhibited 1840), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Francis_Danby_-_The_Deluge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/kentucky-flooding-deaths--art.png",
          "alt": "Francis Danby's painting The Deluge, showing figures overwhelmed by a vast biblical flood under a stormy sky",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Symphony No. 6 'Pastoral', Op. 68 - IV. 'Gewitter, Sturm' (Ludwig van Beethoven, 1808)",
        "excerpt": "The fourth movement of Beethoven's 'Pastoral' Symphony, titled 'Thunderstorm. Tempest', erupts after the peasants' merrymaking with rumbling low strings, stabbing string figures and crashing timpani that evoke a sudden, violent storm. Piccolo and trombones heighten the fury before the tempest subsides into the calm of the closing shepherd's hymn, making it one of music's most vivid depictions of a deluge breaking over the land.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 20
  },
  {
    "slug": "austria-algeria-world-cup-thriller",
    "headline": "Austria and Algeria advance to the World Cup round of 32 after a 3-3 thriller that eliminates Iran",
    "overview": "Austria and Algeria played out a 3-3 draw at Arrowhead Stadium in Kansas City on 27 June 2026, a Group J result that sent both nations into the 2026 World Cup round of 32 and eliminated Iran. Riyad Mahrez put Algeria 3-2 ahead in the 93rd minute before substitute Sasa Kalajdzic equalised with virtually the last touch of the game. Austria coach Ralf Rangnick dismissed suggestions of collusion over the mutually beneficial outcome, saying the chaotic stoppage-time sequence was far too unpredictable to have been planned.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxNaDBnWUw2ZjNJbF82RElqNG5JNmlqcnA2Q0R0NFhObzBrSVZ5TThlZHlyV1M5bjNGVlgxWUNzMnFuLUV5SmhTNmtEeFFQN01JdkZwM3M1M2FfV3NUel84UlhsQVNNM3JqZ3o5bk1fNFJST3U1WUJjbmtLOTRLRXJFNGNZS0xMR0phcnNEaVE1aWo3RDJNZUFaWklzVHhqeXphaERIel9INHFkSWZN?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxORGZtUTNvcnNDU2dHNjd4OUFzNEdJSldUYXhxdk1MSHJ2VUdKeExCMW42X1QzMFg0RG0yWXFFQVBpLTd3aG00TWhZc3pCaHRpX2QxUlA4Nm52b2lnNmJpVjBoeTBfSTBJX0VFWUVZSHY4S014RUVVZVNjV2tQWUlEei1IakJPMGVyWkkza3JldUlPSGRVTnRVY3RJSHFDTlMxQmI4clVycmM4YkJhcUlGdXA2VS1zeDQxbExxRURmc2M?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/austria-algeria-world-cup-thriller.png",
      "alt": "Arrowhead Stadium in Kansas City, a large open-air sports stadium, viewed from the stands.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Disgrace of Gijon (1982 World Cup)",
        "excerpt": "In the final Group 2 match of the 1982 World Cup, West Germany and Austria played out a 1-0 result that suited both teams and eliminated Algeria, who had stunned the Germans days earlier. After Horst Hrubesch's early goal the two sides visibly stopped attacking and passed the ball harmlessly for the rest of the match, prompting outrage and accusations of collusion. The scandal led FIFA to schedule the final group matches simultaneously thereafter. The 2026 Austria-Algeria thriller carried the same shadow of a convenient result, which Rangnick was at pains to deny.",
        "source": "FIFA / World Cup history",
        "href": "https://en.wikipedia.org/wiki/Disgrace_of_Gij%C3%B3n"
      },
      {
        "category": "historical",
        "title": "The Ancient Olympic Games",
        "excerpt": "From 776 BC the Greeks gathered every four years at Olympia to contest foot races, wrestling, boxing and the four-horse chariot race, with victors crowned only with a wreath of wild olive yet immortalised in song and statue. A sacred truce suspended warfare so athletes and spectators could travel safely, and victory conferred glory on a man's whole city. The Games framed athletic contest as the supreme stage of human striving, fortune and renown, a tradition the modern World Cup self-consciously inherits.",
        "source": "Encyclopaedia / Olympic history",
        "href": "https://en.wikipedia.org/wiki/Ancient_Olympic_Games"
      },
      {
        "category": "literary",
        "title": "Pindar, Olympian Ode 1",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice.",
        "source": "Odes of Pindar, trans. Ernest Myers (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/1"
      },
      {
        "category": "literary",
        "title": "Homer, The Iliad, Book XXIII (the chariot race)",
        "excerpt": "Their heart, their eyes, their voice, they send before; / And up the champaign thunder from the shore: / Thick, where they drive, the dusty clouds arise, / And the lost courser in the whirlwind flies; / Loose on their shoulders the long manes reclined, / Float in their speed, and dance upon the wind.",
        "source": "The Iliad of Homer, trans. Alexander Pope (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_23"
      },
      {
        "category": "artistic",
        "title": "The Chariot Race by Alexander von Wagner",
        "excerpt": "Painted around 1882, this dramatic oil on canvas shows the climax of a chariot race in the Roman Circus Maximus, the lead driver hurtling toward the viewer amid a storm of dust, straining horses and a roaring crowd. Wagner captures the raw spectacle, speed and peril of competitive sport, the ancient ancestor of the floodlit drama of the modern stadium. The work hangs in the Manchester Art Gallery.",
        "source": "Manchester Art Gallery / Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Alexander_von_Wagner_(1838-1919)_-_The_Chariot_Race_-_1898.12_-_Manchester_Art_Gallery.jpg",
        "image": {
          "src": "/covers/austria-algeria-world-cup-thriller--art.png",
          "alt": "The Chariot Race, a chariot hurtling toward the viewer through dust in a Roman circus, by Alexander von Wagner",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Pomp and Circumstance March No. 1 in D, Op. 39",
        "excerpt": "A swaggering march strides in with crisp brass and snapping rhythms before swelling into a broad, soaring melody of unmistakable triumph. The grand tune returns in full ceremonial splendor, an anthem of acclamation and hard-won victory that lifts the whole orchestra to a glowing, exultant peak.",
        "source": "Edward Elgar, \"Pomp and Circumstance\" March No. 1 in D, Op. 39 (1901)",
        "href": "https://imslp.org/wiki/Pomp_and_Circumstance_Marches,_Op.39_(Elgar,_Edward)"
      }
    ],
    "rank": 21
  },
  {
    "slug": "bad-bunny-london-stadium",
    "headline": "Bad Bunny becomes the first Latin American artist to headline a UK stadium with sold-out London shows",
    "overview": "Puerto Rican superstar Bad Bunny performed at London's Tottenham Hotspur Stadium on 27 and 28 June 2026 as part of his DeBI TiRAR MAS FOToS World Tour, playing his Spanish-language repertoire to two sold-out crowds of around 50,000. The shows made him the first artist from Latin America to headline a UK stadium, a milestone for Latin music in Britain. His staging included 'La Casita,' a full-scale replica of a traditional working-class Puerto Rican home.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c2dyrk56dg9o"
      },
      {
        "name": "ITV News",
        "href": "https://www.itv.com/news/2026-06-28/bad-bunny-becomes-first-artist-from-latin-america-to-headline-a-uk-stadium-show"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/bad-bunny-london-stadium.png",
      "alt": "Bad Bunny performing on stage",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Roman triumph: a conqueror received with acclamation",
        "excerpt": "...he himself, girding his clothes about him, and crowning his head with a laurel-garland, his hair gracefully flowing, carried the trophy resting erect upon his right shoulder, and so marched on, singing songs of triumph, and his whole army following after, the citizens all receiving him with acclamations of joy and wonder. The procession of this day was the origin and model of all after triumphs.",
        "source": "Plutarch, Life of Romulus (Dryden translation)",
        "href": "https://www.gutenberg.org/cache/epub/674/pg674.txt"
      },
      {
        "category": "historical",
        "title": "Haydn conquers London, 1791",
        "excerpt": "When the Austrian composer Joseph Haydn travelled to London at the impresario Johann Peter Salomon's invitation, arriving on New Year's Day 1791, the foreign genius took the city by storm. Across an eighteen-month stay he was, in Britannica's words, feted, lionized, and treated as a genius, with Charles Burney publishing a poem in his honour. The London symphonies he wrote there became the climax of his orchestral output, an outsider crowned in the capital that came to claim him as its own.",
        "source": "Encyclopaedia Britannica, 'Joseph Haydn: English period'",
        "href": "https://www.britannica.com/biography/Joseph-Haydn/English-period"
      },
      {
        "category": "literary",
        "title": "Orpheus sings down the powers of the underworld",
        "excerpt": "As he said such things, and touched the strings to his words, the bloodless spirits wept. Tantalus did not catch at the retreating water, and the wheel of Ixion stood still, {as though} in amazement; the birds did not tear the liver {of Tityus}; and the granddaughters of Belus paused at their urns; thou, too, Sisyphus, didst seat thyself on thy stone. The story is, that then, for the first time, the cheeks of the Eumenides, overcome by his music, were wet with tears.",
        "source": "Ovid, Metamorphoses, Book X (Riley translation)",
        "href": "https://www.gutenberg.org/cache/epub/26073/pg26073.txt"
      },
      {
        "category": "literary",
        "title": "Whitman hears a nation singing in many voices",
        "excerpt": "I hear America singing, the varied carols I hear, / Those of mechanics, each one singing his as it should be blithe and strong, / The carpenter singing his as he measures his plank or beam, / The mason singing his as he makes ready for work, or leaves off work, / ... / Each singing what belongs to him or her and to none else, / The day what belongs to the day--at night the party of young / fellows, robust, friendly, / Singing with open mouths their strong melodious songs.",
        "source": "Walt Whitman, 'I Hear America Singing,' Leaves of Grass",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt"
      },
      {
        "category": "artistic",
        "title": "Roelant Savery, 'Orpheus Charming the Animals with His Music' (1627)",
        "excerpt": "In Roelant Savery's panel the legendary singer sits at the centre of a teeming wilderness, lyre in hand, as every creature of land and air gathers around him in rapt stillness. The Flemish master crowds the scene with meticulously observed beasts drawn together by sound alone, a Baroque image of music's power to summon and unite a whole world before one performer.",
        "source": "Roelant Savery, oil on panel, 1627, Mauritshuis",
        "href": "https://commons.wikimedia.org/wiki/File:Orpheus_Charming_the_Animals_with_His_Music_by_Roelant_Savery_Mauritshuis_157.jpg",
        "image": {
          "src": "/covers/bad-bunny-london-stadium--art.png",
          "alt": "Painting of Orpheus playing his lyre surrounded by animals gathered to hear his music",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Gluck, 'Orfeo ed Euridice' (1762)",
        "excerpt": "Christoph Willibald Gluck's reform opera 'Orfeo ed Euridice' makes the singer himself the hero, his voice powerful enough to move the dead. Its celebrated Act III aria 'Che faro senza Euridice?' distils the work's central claim, that song is a force capable of crossing every threshold. The full score is in the public domain on IMSLP.",
        "source": "Christoph Willibald Gluck, 'Orfeo ed Euridice,' Wq.30 (1762), IMSLP",
        "href": "https://imslp.org/wiki/Orfeo_ed_Euridice,_Wq.30_(Gluck,_Christoph_Willibald)"
      }
    ],
    "rank": 22
  },
  {
    "slug": "turrell-100th-skyscape-aarhus",
    "headline": "James Turrell opens his 100th Skyspace, 'As Seen Below,' at the ARoS museum in Aarhus",
    "overview": "James Turrell has opened 'As Seen Below,' a monumental domed Skyspace, at the ARoS Aarhus Kunstmuseum in Denmark, where it opened in June 2026. The installation stands more than 50 feet high and 130 feet wide, with an oculus open to the sky and programmed colour shifts that transform the space. It is Turrell's 100th Skyscape, a series now installed across 26 countries.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/james-turrell-as-seen-below-skyscape-aros-aarhus-denmark/"
      },
      {
        "name": "ARoS Aarhus Kunstmuseum",
        "href": "https://www.aros.dk/en/aros-collection/as-seen-below-the-dome-a-skyspace-by-james-turrell/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/turrell-100th-skyscape-aarhus.png",
      "alt": "Interior of James Turrell's domed Skyscape with an oculus open to a coloured sky",
      "credit": "Colossal"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The oculus of the Pantheon, Rome (c. 118-128 CE)",
        "excerpt": "Hadrian's Pantheon receives illumination exclusively through a single opening at the apex of its vast concrete dome, the roughly 27-foot oculus, or 'eye,' open directly to the sky. As the sun crosses the heavens, a shifting disc of daylight moves across the coffered interior, making the building itself an instrument for watching the sky. Turrell's domed Skyspaces revive this ancient architecture of light, where a circular aperture turns the human gaze upward toward the heavens.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/topic/Pantheon-building-Rome-Italy"
      },
      {
        "category": "historical",
        "title": "Isaac Newton, 'Opticks' (1704)",
        "excerpt": "In his treatise on the reflexions, refractions and colours of light, Newton showed by prism experiments that white light is composed of the spectrum of colours, and he devised the first colour circle in the history of colour theory. His work established that perceived colour is the result of how light is refracted and received rather than an objective property of objects. Turrell's programmed colour shifts, which 'cast brilliant colour around the space,' are a direct artistic descendant of Newton's demonstration that light and human perception together produce what we see.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/topic/Opticks-by-Newton"
      },
      {
        "category": "literary",
        "title": "Genesis 1:1-5 (King James Version, 1611)",
        "excerpt": "In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. And God said, Let there be light: and there was light. And God saw the light, that it was good: and God divided the light from the darkness.",
        "source": "Wikisource (King James Bible)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Dante Alighieri, 'Paradiso,' Canto XXXIII (trans. Longfellow, 1867)",
        "excerpt": "O Light Eterne, sole in thyself that dwellest, / Sole knowest thyself, and, known unto thyself / And knowing, lovest and smilest on thyself! ... But now was turning my desire and will, / Even as a wheel that equally is moved, / The Love which moves the sun and the other stars.",
        "source": "Wikisource (Divine Comedy, Longfellow 1867)",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_33"
      },
      {
        "category": "artistic",
        "title": "Caspar David Friedrich, 'The Monk by the Sea' (1808-1810)",
        "excerpt": "Friedrich reduces his canvas to a thin strip of shore beneath an immense, luminous expanse of sky and sea, before which a single small monk stands in contemplation. The painting confronts the viewer with the sublime emptiness of the heavens and the smallness of the human figure gazing upward into it. It anticipates the contemplative encounter Turrell stages, in which a solitary viewer turns the gaze skyward and surrenders to the boundless light overhead.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Der_M%C3%B6nch_am_Meer_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/turrell-100th-skyscape-aarhus--art.png",
          "alt": "A solitary monk stands on a narrow shore beneath a vast luminous sky in Caspar David Friedrich's painting The Monk by the Sea",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Clair de lune (from Suite bergamasque)",
        "excerpt": "Soft, rippling piano figures drift like moonlight settling over still water, each phrase shimmering with delicate, suspended luminosity. The harmonies glow and dissolve in gentle waves, an intimate, contemplative play of light and shadow that invites quiet, attentive perception.",
        "source": "Claude Debussy, \"Clair de lune\" from Suite bergamasque (1890, rev. 1905)",
        "href": "https://imslp.org/wiki/Suite_bergamasque_(Debussy,_Claude)"
      }
    ],
    "rank": 23
  },
  {
    "slug": "the-box-museum-of-the-year",
    "headline": "The Box in Plymouth wins the UK's 2026 Art Fund Museum of the Year award",
    "overview": "The Box in Plymouth has won the 2026 Art Fund Museum of the Year, the UK's most prestigious museum prize, along with its £120,000 award. The prize was presented to Box CEO Victoria Pomery by broadcaster and judge June Sarpong aboard the Cutty Sark in London on 25 June 2026. The four other shortlisted institutions — the Fitzwilliam Museum, Norwich Castle Museum & Art Gallery, the National Gallery, and V&A East Storehouse — each received £20,000.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/the-box-in-plymouth-wins-uks-2026-museum-of-the-year-award-1234753479/"
      },
      {
        "name": "Art Fund",
        "href": "https://www.artfund.org/museum-of-the-year"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/the-box-museum-of-the-year.png",
      "alt": "The Box museum in Plymouth",
      "credit": "Artforum"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Library and Mouseion of Alexandria",
        "excerpt": "Founded under the early Ptolemies in the 3rd century BCE, the Mouseion of Alexandria was conceived as a temple to the Nine Muses — the root of the word \"museum\" — and an intellectual hub gathering scholars from across the Mediterranean. Its ambition was to assemble a comprehensive repository of all human knowledge, from epic poetry to cookbooks, and to translate important foreign works into Greek. Like The Box, it embodied the idea of a single institution as the keeper and gathering-point of a culture's treasures.",
        "source": "World History Encyclopedia",
        "href": "https://www.worldhistory.org/Library_of_Alexandria/"
      },
      {
        "category": "historical",
        "title": "The Founding of the British Museum",
        "excerpt": "Established on 7 June 1753 by the British Museum Act, the British Museum grew from the bequest of some 71,000 objects amassed by the physician and collector Sir Hans Sloane, and opened to the public in Montagu House in 1759. It was the world's first public national museum — belonging to neither church nor king, freely open to all, and aiming to collect everything. It set the template, echoed in The Box's award, for the museum as a civic keeper of memory and collections.",
        "source": "Wikipedia (British Museum)",
        "href": "https://en.wikipedia.org/wiki/British_Museum"
      },
      {
        "category": "literary",
        "title": "Horace, Odes III.30 (\"Exegi monumentum\")",
        "excerpt": "I constructed a monument of pyramids more durable than bronze / and higher than a royal site, / which the greedy rain, the raging North Wind / would not be able to tear apart or countless / series of years and flight of time. / I would not entirely die and a large part of me / will avoid Libitina; fresh, I continually / would grow with future praise, while / the high priest will climb the Capitol with a quiet maiden.",
        "source": "Wikisource (Translation: Odes of Horace, Book III.30)",
        "href": "https://en.wikisource.org/wiki/Translation:Odes_(Horace)/Book_III/30"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Sonnet 55",
        "excerpt": "Not marble nor the gilded monuments\nOf princes shall outlive this powerful rhyme,\nBut you shall shine more bright in these contents\nThan unswept stone besmeared with sluttish time.\nWhen wasteful war shall statues overturn,\nAnd broils root out the work of masonry,\nNor Mars his sword nor war's quick fire shall burn\nThe living record of your memory.\n'Gainst death and all oblivious enmity\nShall you pace forth; your praise shall still find room\nEven in the eyes of all posterity\nThat wear this world out to the ending doom.\nSo, till the judgment that yourself arise,\nYou live in this, and dwell in lovers' eyes.",
        "source": "William Shakespeare, Sonnet 55",
        "href": "https://www.folger.edu/explore/shakespeares-works/shakespeares-sonnets/read/55/"
      },
      {
        "category": "artistic",
        "title": "David Teniers the Younger, \"Archduke Leopold Wilhelm in his Picture Gallery at Brussels\" (c. 1647-1651)",
        "excerpt": "Teniers, court painter and keeper of the archduke's collection, depicts Leopold Wilhelm standing amid wall-to-wall masterpieces in his Brussels gallery — one of the earliest \"gallery pictures\" showing a princely collection assembled and displayed. The painting is itself a portrait of collecting: an inventory in oils that captures the gathering and display of treasures, prefiguring the modern museum honoured by the Art Fund award.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David_Teniers_(II)_-_Archduke_Leopold_Wilhelm_in_his_Picture_Gallery_at_Brussels.jpg",
        "image": {
          "src": "/covers/the-box-museum-of-the-year--art.png",
          "alt": "The Archduke Leopold Wilhelm standing in his picture gallery in Brussels, the walls densely hung with paintings",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Henry Purcell, \"Hail, Bright Cecilia\" (Ode for St Cecilia's Day, 1692), Z.328",
        "excerpt": "Purcell's grand ode in honour of St Cecilia, patron saint of music, sets a text by Nicholas Brady for soloists, chorus and orchestra across thirteen movements. A celebration of the Muses' art and of music as a force that orders the world, it stands as a sounding monument to a culture's creative inheritance — the aural equivalent of a museum gathering and preserving its treasures.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Hail,_Bright_Cecilia,_Z.328_(Purcell,_Henry)"
      }
    ],
    "rank": 24
  },
  {
    "slug": "german-court-google-ai-liability",
    "headline": "A German court holds Google liable for false claims generated by its AI Overviews",
    "overview": "The Regional Court of Munich (Landgericht München, case 26 O 869/26) issued a temporary injunction holding Google liable for false statements its AI Overviews generated about two Munich publishers, which the summaries falsely linked to scams and subscription traps. The court treated the AI-generated text as Google's own independent statements rather than mere indexing of search results, and rejected the argument that users were obliged to fact-check the answers themselves. It is regarded as one of the first rulings to hold an AI company directly liable for speech produced by its own system.",
    "genre": "Technology",
    "sources": [
      {
        "name": "The Decoder",
        "href": "https://the-decoder.com/landmark-german-ruling-declares-googles-ai-overviews-are-googles-own-words-and-makes-it-liable-for-false-answers/"
      },
      {
        "name": "Simon Willison",
        "href": "https://simonwillison.net/2026/Jun/25/ai-and-liability/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/german-court-google-ai-liability.png",
      "alt": "Exterior of the Justizpalast (Palace of Justice) in Munich, Germany, viewed from Stachus (Karlsplatz), a monumental neo-baroque courthouse building.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Golem of Prague",
        "excerpt": "In the Jewish legend, Rabbi Judah Loew of sixteenth-century Prague molds a man of clay and animates it to serve and protect the community. The created servant, lacking judgment of its own, eventually grows uncontrollable and dangerous, forcing its maker to take responsibility and deactivate it. The story endures as a parable of human creators answerable for the artificial agents they bring to life.",
        "source": "Encyclopaedia Britannica, entry on the golem",
        "href": "https://www.britannica.com/topic/golem"
      },
      {
        "category": "historical",
        "title": "Respondeat superior: the master answers for the agent",
        "excerpt": "The common-law doctrine respondeat superior, 'let the master answer,' holds a principal liable for the wrongful acts of agents and servants acting on its behalf. Rooted in older principles of agency, it places responsibility on the party who deploys and directs another to act in its interest. Commentators on the Munich ruling invoked precisely this logic, arguing that an AI system is an agent of the organization that deploys it and should be treated as such.",
        "source": "Legal Information Institute, Cornell Law School",
        "href": "https://www.law.cornell.edu/wex/respondeat_superior"
      },
      {
        "category": "literary",
        "title": "The False Witness, Proverbs 6:16-19 (King James Version)",
        "excerpt": "These six things doth the LORD hate: yea, seven are an abomination unto him: A proud look, a lying tongue, and hands that shed innocent blood, An heart that deviseth wicked imaginations, feet that be swift in running to mischief, A false witness that speaketh lies, and he that soweth discord among brethren.",
        "source": "The Proverbs 6:16-19, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Proverbs"
      },
      {
        "category": "literary",
        "title": "Plato, \"Phaedrus\" (trans. Benjamin Jowett) - Socrates on writing",
        "excerpt": "For it is like a picture, which can give no answer to a question, and has only a deceitful likeness of a living creature. It has no power of adaptation, but uses the same words for all.",
        "source": "Plato, Phaedrus, trans. Benjamin Jowett",
        "href": "https://www.gutenberg.org/cache/epub/1636/pg1636.txt"
      },
      {
        "category": "artistic",
        "title": "Sandro Botticelli, \"The Calumny of Apelles\" (c. 1494-95)",
        "excerpt": "Botticelli's allegory stages the destruction of an innocent man by slander: the hooded figure of Calumny drags her bound, helpless victim by the hair while Envy, Fraud, and Deceit attend her, and a credulous, ass-eared judge inclines his ear to Ignorance and Suspicion. The scene is a visual indictment of false accusation and defamatory testimony, showing how lies dressed as righteousness can condemn the blameless. The tempera panel hangs in the Uffizi Gallery, Florence.",
        "source": "Sandro Botticelli, The Calumny of Apelles (c. 1494-95), Uffizi, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_La_calumnia_de_Apeles.jpg",
        "image": {
          "src": "/covers/german-court-google-ai-liability--art.png",
          "alt": "Botticelli's The Calumny of Apelles, an allegorical scene of a slandered innocent dragged before an ass-eared judge",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "La calunnia è un venticello (from Il barbiere di Siviglia)",
        "excerpt": "Don Basilio describes slander as a faint little breeze, beginning as the softest murmur barely heard. As the music builds with relentless, accelerating crescendo, that whisper gathers force into a thunderous gale, swelling and exploding until a falsely accused victim is left crushed beneath the storm of rumor.",
        "source": "Gioachino Rossini, \"La calunnia è un venticello\" from Il barbiere di Siviglia (1816)",
        "href": "https://imslp.org/wiki/Il_barbiere_di_Siviglia_(Rossini,_Gioacchino)"
      }
    ],
    "rank": 25
  },
  {
    "slug": "wild-form-stonewall-bar",
    "headline": "Studio Wild Form designs a 'no straight lines' interior for a new bar beside New York's Stonewall Inn",
    "overview": "New York studio Wild Form has designed Love Thy Neighbor, a curving, cavern-like cocktail bar in the West Village beside the historic Stonewall Inn, dedicated to queer community and chosen family. Guided by an ethos of 'no straight lines,' its hand-shaped microcement walls, vaulted archways and curved booths reject rigid geometry in favour of fluid, organic form. A single brick salvaged from the Stonewall Inn is illuminated inside, and a Marsha P. Johnson quote is set into the floor at the entrance.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/27/wild-form-design-studio-love-thy-neighbor-west-village-nyc/"
      },
      {
        "name": "Hospitality Design - Wild Form Design Studio Shapes a Queer Sanctuary in New York",
        "href": "https://hospitalitydesign.com/news/love-thy-neighbor-west-village-new-york/629526"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/wild-form-stonewall-bar.png",
      "alt": "The Stonewall Inn in Greenwich Village, New York City, its storefront decorated with rainbow gay-pride flags and a banner.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Stonewall uprising of 1969",
        "excerpt": "The Stonewall riots were a 'series of violent confrontations that began in the early hours of June 28, 1969, between police and gay rights activists outside the Stonewall Inn' in Greenwich Village. As Britannica notes, 'Stonewall soon became a symbol of resistance to social and political discrimination that would inspire solidarity among homosexual groups for decades,' making the inn the birthplace of the modern Pride movement that the new bar now stands beside.",
        "source": "Encyclopaedia Britannica, 'Stonewall riots'",
        "href": "https://www.britannica.com/event/Stonewall-riots"
      },
      {
        "category": "historical",
        "title": "The ancient sanctuary of the altar (Aeschylus, The Suppliant Maidens)",
        "excerpt": "The war-worn fliers from the battle's wrack / Find refuge at the hallowed altar-side, / The sanctuary divine,— / Ye gods! such refuge unto me provide— / Such sanctuary be mine!",
        "source": "Aeschylus, 'The Suppliant Maidens,' trans. E. D. A. Morshead, in Four Plays of Aeschylus",
        "href": "https://www.gutenberg.org/cache/epub/8714/pg8714.html.utf8"
      },
      {
        "category": "literary",
        "title": "For You O Democracy (Calamus) by Walt Whitman",
        "excerpt": "Come, I will make the continent indissoluble, / I will make the most splendid race the sun ever shone upon, / I will make divine magnetic lands, / With the love of comrades, / With the life-long love of comrades. // I will plant companionship thick as trees along all the rivers of America, and along the shores of the great lakes, and all over the prairies, / I will make inseparable cities with their arms about each other's necks, / By the love of comrades, / By the manly love of comrades. // For you these from me, O Democracy, to serve you ma femme! / For you, for you I am trilling these songs.",
        "source": "Walt Whitman, 'For You O Democracy,' Leaves of Grass (Calamus)",
        "href": "https://www.poetryfoundation.org/poems/51567/for-you-o-democracy"
      },
      {
        "category": "literary",
        "title": "Sappho's fragment of the sacred grove",
        "excerpt": "All around through branches of apple-orchards / Cool streams call, while down from the leaves a-tremble / Slumber distilleth.",
        "source": "Sappho, Fragment, trans. J. A. Symonds (1883), in Sappho: Memoir, Text, Selected Renderings",
        "href": "https://www.gutenberg.org/files/57390/57390-h/57390-h.htm"
      },
      {
        "category": "artistic",
        "title": "Hector Guimard's Art Nouveau Paris Metro entrance, Porte Dauphine (1900)",
        "excerpt": "Hector Guimard's cast-iron Metro entrances are the supreme statement of Art Nouveau's revolt against the straight line. At Porte Dauphine, the only surviving glazed 'edicule,' green-painted iron stems uncurl like plant tendrils into whiplash arches, fanning out into a glass canopy. Like Wild Form's sculpted bar, the design treats architecture as living, organic growth rather than rigid assembly.",
        "source": "Wikimedia Commons (photo Jean-Pierre Dalbera, CC BY 2.0)",
        "href": "https://commons.wikimedia.org/wiki/File:La_station_art_nouveau_de_la_porte_Dauphine_(Hector_Guimard).jpg",
        "image": {
          "src": "/covers/wild-form-stonewall-bar--art.png",
          "alt": "Hector Guimard's curving green Art Nouveau cast-iron Metro entrance at Porte Dauphine, Paris",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Slavonic Dance No. 8 in G minor, Op. 46",
        "excerpt": "A stamping, fiery furiant bursts forth with cross-rhythms and whirling momentum, sweeping the listener into a communal village dance. Bright, folk-flavored melodies surge and spin in joyous abandon, a breathless celebration of belonging that races to an exhilarating finish.",
        "source": "Antonín Dvořák, Slavonic Dance No. 8 in G minor, Op. 46 (1878)",
        "href": "https://imslp.org/wiki/Slavonic_Dances,_Op.46_(Dvořák,_Antonín)"
      }
    ],
    "rank": 26
  },
  {
    "slug": "serbia-vucic-resign",
    "headline": "Serbia's President Aleksandar Vučić says he will resign within weeks and call early elections",
    "overview": "Serbia's populist president Aleksandar Vučić told supporters at a Belgrade rally that he will step down within weeks, paving the way for early presidential and parliamentary elections. The announcement follows more than a year of student-led mass protests sparked by the November 2024 Novi Sad rail-station disaster that killed 16 people. Vučić, who is barred from a third term, said he would campaign to help his Serbian Progressive Party win the coming vote.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNaWswUmpzRjlYcjZidUdnOF9iYmxXUDVFNUdHRWdINUJ0bHliUjVva2I1dHNCUjRTTmRndXdfZlIwamRUanplQWhMcFI5bWJTWHZ3cXY0VzE4TTEwNjNoY1d1aFdadVdnMW1xeXJ3aEtoaFctZjhYd0J4dlR5REVlMG8tamU2aklpQWFQRG85UUR4SmtYenJmWTBsSkZmb2lOQ3kxMHhVMUViVEV0Z3J6cnFpZEs1TkZpcXc?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/27/serbias-president-aleksandar-vucic-says-will-resign-within-weeks"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/serbia-vucic-resign.png",
      "alt": "Serbian President Aleksandar Vučić speaking at a podium",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Abdication of King Edward VIII (1936)",
        "excerpt": "But you must believe me when I tell you that I have found it impossible to carry the heavy burden of responsibility and to discharge my duties as King as I would wish to do without the help and support of the woman I love.",
        "source": "Edward VIII, Abdication broadcast, 11 December 1936 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Edward_VIII_of_the_United_Kingdom%27s_Abdication"
      },
      {
        "category": "historical",
        "title": "Napoleon's First Abdication at Fontainebleau (1814)",
        "excerpt": "The allied powers having proclaimed that the Emperor Napoleon was the sole obstacle to the re-establishment of peace in Europe, the Emperor Napoleon, faithful to his oath, declares that he is ready to descend from the throne, to leave France and even to lay down his life for the welfare of the fatherland, which cannot lie separated from the rights of his son, those of the regency of the Empress, and the laws of the Empire.",
        "source": "Act of Abdication of Napoleon I, Fontainebleau, April 1814 (Napoleon & Empire, official texts)",
        "href": "https://www.napoleon-empire.org/en/official-texts/abdication_1.php"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Richard II (Act IV, Scene 1 — the deposition)",
        "excerpt": "Now mark me, how I will undo myself; I give this heavy weight from off my head And this unwieldy sceptre from my hand, The pride of kingly sway from out my heart; With mine own tears I wash away my balm, With mine own hands I give away my crown, With mine own tongue deny my sacred state",
        "source": "Shakespeare, The Life and Death of King Richard II, Act IV, Scene 1 (MIT Complete Works of Shakespeare)",
        "href": "https://shakespeare.mit.edu/richardii/richardii.4.1.html"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (1818)",
        "excerpt": "And on the pedestal these words appear: 'My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!' Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare The lone and level sands stretch far away.",
        "source": "P. B. Shelley, \"Ozymandias,\" Complete Poetical Works (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/4798/pg4798-images.html"
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Boris Godunov (opera, 1869–72) — musical work",
        "excerpt": "Mussorgsky's towering Russian opera dramatizes a guilt-haunted ruler whose grip on power dissolves amid popular unrest and rumor, culminating in the Tsar's anguished collapse and death. The brooding orchestral colors, the great Coronation Scene's pealing bells, and the surging choruses of the common people make the crowd itself a character that can lift up and bring down a sovereign. It is a study of the loneliness and impermanence of authority — apt for a strongman forced toward the exit by a restless nation.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "Paul Delaroche, Napoleon I at Fontainebleau, 31 March 1814 (1840) — visual artwork",
        "excerpt": "Delaroche paints the once-invincible emperor slumped in a chair, his hat fallen to the floor and his boots still dirty from the field, the very image of a fallen strongman. The stillness and downcast gaze turn a world-shaking abdication into an intimate portrait of exhaustion and defeat. Against the empty room, the diminished figure makes vivid how swiftly absolute power can drain away under the weight of events.",
        "source": "Paul Delaroche, Museum der bildenden Künste, Leipzig (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:DelarocheNapoleon.jpg",
        "image": {
          "src": "/covers/serbia-vucic-resign--art.png",
          "alt": "Paul Delaroche's painting of a dejected Napoleon seated at Fontainebleau after his 1814 abdication, hat on the floor and gaze cast down.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "pakistan-rangers-hq-attack",
    "headline": "Militant rams explosive-laden vehicle into Pakistan Rangers headquarters in Karachi, killing six",
    "overview": "A militant rammed an explosives-laden vehicle into the provincial headquarters of the paramilitary Pakistan Rangers in Karachi, setting off an intense gun battle with security forces. A little-known group, Jamaat-ul-Ahrar, claimed responsibility for the assault. At least three troops and three militants were killed, in the latest of a surge of attacks on Pakistani security forces.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxNN09XY3hBLUg0WUZOc3ZuZVRQSUsySjZtTVFSbWRMNTRFa3VzMjR0Y0hiODA0b2IyMG1tY1hpNHNmVENPN1Z6ajBmaV9hZXVqTWhfazJSU1NxOUxwZGpNRUJyM3RiT19rOENMcXB1MHhaNnpEZktweldza3poT1ZBcjBXZnNjb2IwMHhJdzlhbEd2TlA2RWRlQ3dUenJGSUxlOE9YamVDZzBMR3BZTHdFMmE5V2ZZVk9PRGlpM1VkSXdILUNPS0E?oc=5"
      },
      {
        "name": "Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/06/27/pakistan-militants-attack-paramilitary-rangers-headquarters-karachi/f6a7895a-7254-11f1-8730-e7fd0e2a6404_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/pakistan-rangers-hq-attack.png",
      "alt": "Smoke and floodlights over the wall of a fortified security compound at night",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Fall of Constantinople (1453): Storming of the Theodosian Walls",
        "excerpt": "Hassan and his twelve companions had reached the summit: the giant was precipitated from the rampart: he rose on one knee, and was again oppressed by a shower of darts and stones. But his success had proved that the achievement was possible: the walls and towers were instantly covered with a swarm of Turks; and the Greeks, now driven from the vantage ground, were overwhelmed by increasing multitudes.",
        "source": "Edward Gibbon, History of the Decline and Fall of the Roman Empire, Chapter LXVIII",
        "href": "https://www.ccel.org/g/gibbon/decline/volume2/chap68.htm"
      },
      {
        "category": "historical",
        "title": "The Storming of the Bastille (1789): The Fortress Stronghold Falls",
        "excerpt": "Smite, thou Louis Tournay, cartwright of the Marais, old-soldier of the Regiment Dauphine; smite at that Outer Drawbridge chain, though the fiery hail whistles round thee! ... Sinks the drawbridge,-- Usher Maillard bolting it when down; rushes-in the living deluge: the Bastille is fallen! Victoire! La Bastille est prise!",
        "source": "Thomas Carlyle, The French Revolution: A History (1837)",
        "href": "https://fulltextarchive.com/page/The-French-Revolution-A-History4"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Henry V — \"Once more unto the breach\" (Act III, Scene I)",
        "excerpt": "Once more unto the breach, dear friends, once more;\nOr close the wall up with our English dead!\nIn peace there's nothing so becomes a man,\nAs modest stillness and humility;",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act III, Scene I",
        "href": "https://poets.org/poem/henry-v-act-iii-scene-i-once-more-unto-breach-dear-friends"
      },
      {
        "category": "literary",
        "title": "Homer's Iliad, Book XII — Hector Bursts the Rampart Gate (trans. Pope)",
        "excerpt": "Then thundering through the planks, with forceful sway,\nDrives the sharp rock: the solid beams give way;\nThe folds are shattered; from the crackling door\nLeap the resounding bars, the flying hinges roar.",
        "source": "Homer, The Iliad, Book XII, translated by Alexander Pope",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_12"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture, Op. 49 (musical)",
        "excerpt": "Tchaikovsky's festival overture stages a battle in sound, opening with a solemn Orthodox hymn that is soon overrun by the clash of opposing themes, surging strings, and martial brass. The music drives toward a thunderous climax of cannon fire, pealing bells, and a triumphant fanfare, evoking the assault, defense, and breaking of a besieged stronghold. Its relentless escalation from quiet prayer to explosive violence mirrors the storming of a fortified position.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Emanuel Leutze, Storming of the Teocalli by Cortez and His Troops (1848) (visual artwork)",
        "excerpt": "Leutze's sweeping 1848 history painting depicts conquistadors fighting their way to the summit of an Aztec temple-pyramid in a desperate, close-quarters assault on a fortified height. Bodies tumble from the stone terraces as armored attackers and defenders grapple amid smoke, banners, and bristling weapons at the breached stronghold. The vertiginous composition captures the savagery of storming a citadel gate-by-gate to its very pinnacle.",
        "source": "Emanuel Leutze, Wadsworth Atheneum (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Leutze,_Emanuel_%E2%80%94_Storming_of_the_Teocalli_by_Cortez_and_His_Troops_%E2%80%94_1848.jpg",
        "image": {
          "src": "/covers/pakistan-rangers-hq-attack--art.png",
          "alt": "Spanish conquistadors storming the summit of an Aztec temple-pyramid in close combat, defenders falling from the terraces",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "iraq-green-zone-corruption-arrests",
    "headline": "Iraqi forces seal Baghdad's Green Zone and arrest seven officials, including five lawmakers, on corruption charges",
    "overview": "Iraqi security forces sealed off the fortified Green Zone in Baghdad and carried out overnight raids, arresting seven people, among them five members of parliament whose immunity had been lifted. The arrests, tied to testimony from a detained former deputy oil minister, are part of Prime Minister Ali Al Zaidi's escalating anti-corruption campaign. Some of those detained belong to the bloc of a former prime minister.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxNMGNjMGlKN1dXNmp4T1lwWkhISjhBZF8wRXhHa0o5YzVPUjRiemZub1BFNFJBLWxCakU3d1NFUkxxb3k0aHR2a1V5OEFBMmRsQ3hWMXl4U0RtVDVOTVVuN0JTQkZwbWViWXBOWlV2NVJpNU1BelRoVmNkWHFHLWFJUmtrNWk0N1RVN1NF?oc=5"
      },
      {
        "name": "The National",
        "href": "https://www.thenationalnews.com/news/mena/2026/06/28/wave-of-overnight-arrests-hits-baghdads-green-zone-amid-anti-corruption-push/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/iraq-green-zone-corruption-arrests.png",
      "alt": "The Republican Palace inside Baghdad's fortified Green Zone",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Impeachment of Warren Hastings (Edmund Burke, 1788)",
        "excerpt": "Therefore, it is with confidence that, ordered by the Commons, I impeach Warren Hastings, Esquire, of high crimes and misdemeanors. I impeach him in the name of the Commons of Great Britain in Parliament assembled, whose parliamentary trust he has betrayed. I impeach him in the name of all the Commons of Great Britain, whose national character he has dishonored.",
        "source": "Edmund Burke, \"At the Trial of Warren Hastings,\" The World's Famous Orations, Vol. VI (via Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_World%27s_Famous_Orations/Volume_6/At_the_Trial_of_Warren_Hastings"
      },
      {
        "category": "historical",
        "title": "Cicero, The First Oration Against Verres (70 BC)",
        "excerpt": "For an opinion has now become established, pernicious to us, and pernicious to the republic, which has been the common talk of every one, not only at Rome, but among foreign nations also,—that in the courts of law as they exist at present, no wealthy man, however guilty he may be, can possibly be convicted.",
        "source": "Cicero, Against Verres I.1, trans. C. D. Yonge (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0018:text=Ver.:actio=1:book=1:section=1"
      },
      {
        "category": "literary",
        "title": "Dante, Inferno, Canto XXI — The Bolgia of the Peculators",
        "excerpt": "Behold one of the elders of Saint Zita; / Plunge him beneath, for I return for others / Unto that town, which is well furnished with them. / All there are barrators, except Bonturo; / No into Yes for money there is changed.",
        "source": "Dante Alighieri, The Divine Comedy: Hell, Canto XXI, trans. Henry Wadsworth Longfellow (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1001/pg1001-images.html"
      },
      {
        "category": "literary",
        "title": "The Cleansing of the Temple (Gospel of Matthew 21:12–13)",
        "excerpt": "And Jesus went into the temple of God, and cast out all them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves, And said unto them, It is written, My house shall be called the house of prayer; but ye have made it a den of thieves.",
        "source": "The Holy Bible, King James Version, Matthew 21:12–13 (via Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "artistic",
        "title": "Handel, Belshazzar, HWV 61 (1745) — oratorio (musical)",
        "excerpt": "Handel's oratorio sets the Book of Daniel's account of the doomed Babylonian king whose feast is interrupted by a divine hand inscribing the words of judgment upon the wall. With a single eerie violin line Handel paints the spectral writing taking form, and the prophet Daniel reads the verdict: the kingdom is weighed, found wanting, and divided. The mighty ruler is brought low overnight, his city falling to Cyrus, a tale of pride and venality answered by sudden reckoning.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Belshazzar,_HWV_61_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Rembrandt, Belshazzar's Feast (c. 1635–1638) — painting (visual artwork)",
        "excerpt": "In Rembrandt's blazing canvas the Babylonian king recoils in terror from the supernatural Hebrew script glowing in the darkness above his banquet. Gold goblets plundered from the Temple spill their wine as courtiers shrink back, the whole scene lit by the cold fire of divine judgment. It captures the precise instant a powerful, sacrilegious ruler is told his reign of greed and impiety is finished.",
        "source": "Rembrandt, National Gallery, London (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt-Belsazar.jpg",
        "image": {
          "src": "/covers/iraq-green-zone-corruption-arrests--art.png",
          "alt": "Rembrandt's Belshazzar's Feast: a startled king turns from glowing Hebrew writing on the wall as gold vessels spill at a torchlit banquet",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "obamacare-enrollment-drops-subsidies",
    "headline": "Nearly 3 million Americans drop Affordable Care Act coverage after subsidies expire and premiums soar",
    "overview": "About 3 million fewer people held Affordable Care Act health plans in February than a year earlier, a 13% drop from 22.1 million to 19.2 million, according to new federal data. Health analysts attribute the decline to the January 1 expiration of enhanced federal subsidies, which sent premiums up by double and triple digits and priced many enrollees out. The administration instead credited a crackdown on fraudulent enrollment.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPclVEQU9pV2NjNEl5aWhjQnJHa05pSlNxUTgtanVod3dZR3N4ZXd6ZF9YSjdPREVzR3doaDN0WWZubzZPaGxOM0hyNlo1MHQ0d0RMRmtqWDVoZzU2Y1M4cXU0VkhGX2pYYlVOZDRub0MxcThXYnV0am05QXJoOEZLRGdTYUFzbE1fS1pxWE5QcmtpSThZM1dUZThVOUVPTFg1bWpUamxLLWc0eS1heUsydzJycGdVQQ?oc=5"
      },
      {
        "name": "U.S. News & World Report",
        "href": "https://www.usnews.com/news/business/articles/2026-06-27/millions-drop-obamacare-health-coverage-after-subsidies-expire-and-costs-rise"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/obamacare-enrollment-drops-subsidies.png",
      "alt": "A pharmacist filling prescriptions behind a counter",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Elizabethan Poor Law (An Acte for the Reliefe of the Poore, 1601)",
        "excerpt": "And also competent Sums of Money for and towards the necessary Relief of the Lame, Impotent, Old, Blind, and such other among them being Poor, and not able to work",
        "source": "An Act for the Relief of the Poor, 43 Elizabeth I (1601)",
        "href": "https://www.workhouses.org.uk/poorlaws/1601act.shtml"
      },
      {
        "category": "historical",
        "title": "Daniel Defoe, A Journal of the Plague Year (1722) — the poor untended in the Great Plague of London",
        "excerpt": "and had not public charity provided for these poor creatures, whose number was exceeding great and in all cases of this nature must be so, they would have been in the worst condition of any people in the city.",
        "source": "Daniel Defoe, A Journal of the Plague Year (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "literary",
        "title": "The Parable of the Good Samaritan (Gospel of Luke, King James Version)",
        "excerpt": "But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him, And went to him, and bound up his wounds, pouring in oil and wine, and set him on his own beast, and brought him to an inn, and took care of him.",
        "source": "The Bible, King James Version, Luke 10:33–34 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "literary",
        "title": "Charles Dickens, A Christmas Carol (1843) — Scrooge refuses the charity collectors",
        "excerpt": "\"If they would rather die,\" said Scrooge, \"they had better do it, and decrease the surplus population.\"",
        "source": "Charles Dickens, A Christmas Carol (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/46/pg46.txt"
      },
      {
        "category": "artistic",
        "title": "Giovanni Battista Pergolesi, Stabat Mater, P.77 (1736) — musical work",
        "excerpt": "Pergolesi's final composition sets the medieval Latin sequence of the grieving mother standing at the foot of the cross, scored intimately for soprano, alto, strings, and continuo. Its aching suspensions and weeping melodic lines turn private sorrow into a universal cry of compassion for the suffering. The work has endured as one of music's most tender meditations on mercy in the face of pain.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Stabat_Mater,_P.77_(Pergolesi,_Giovanni_Battista)"
      },
      {
        "category": "artistic",
        "title": "Luke Fildes, Applicants for Admission to a Casual Ward (1874) — visual artwork",
        "excerpt": "Fildes lines up a shivering queue of the homeless and destitute against a cold London wall as they wait for a ticket admitting them to a workhouse ward for a single night. Mothers clutch infants, the sick lean on the well, and a policeman regulates the desperate column, making charity feel rationed and grudging. A landmark of Victorian social realism, the painting confronts the viewer with the human face of poverty pushed to the edge of survival.",
        "source": "Luke Fildes, Applicants for Admission to a Casual Ward, Royal Holloway, University of London (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Luke_Fildes_(1843-1927)_-_Applicants_for_Admission_to_a_Casual_Ward_-_THC0021_-_Royal_Holloway,_University_of_London.jpg",
        "image": {
          "src": "/covers/obamacare-enrollment-drops-subsidies--art.png",
          "alt": "Oil painting of a ragged, weary line of poor men, women, and children waiting in the cold outside a workhouse casual ward",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "japan-tropical-storms-floods",
    "headline": "Two tropical storms batter Japan with floods and landslides, killing at least one",
    "overview": "Two storm systems, Mekkhala and Higos, struck Japan during the annual rainy season, dumping heavy rain that triggered landslides and flooding. A man in his 70s died and three people were injured when a house was buried by a landslide in Yamaguchi prefecture. Flooding alerts were issued across Kyoto, Osaka and other parts of western Japan, where dozens of homes were inundated.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxNUHJCNzlnVE12LU51OWtkZVh2bHpLbFFneXdmbVB2bk5GOG9VSTctV0xEQU04a0VuSVJxVTdxSTVxRFdQSzRCZ2ptTWtlUE5UVDBNcktZNTBGcWRnMGctVXhQc3gwVWlTUkFyU09CMWp4X2ZqT3BmY0kxT1ZBLVhlR3BPOXZDUWxU?oc=5"
      },
      {
        "name": "Washington Times",
        "href": "https://www.washingtontimes.com/news/2026/jun/27/2-tropical-storms-pound-japan-floods-landslides-killing-1/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/japan-tropical-storms-floods.png",
      "alt": "Aerial view of floodwaters submerging streets and homes in Japan",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Johnstown Flood of 1889",
        "excerpt": "Houses were spinning through beneath the bridge, and I did not know at what moment the structure would melt away under the train.",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (1889), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
      },
      {
        "category": "historical",
        "title": "The Great Galveston Hurricane of 1900",
        "excerpt": "With the first shifting of the wind the waters of the Gulf swept over the city.",
        "source": "Paul Lester, The Great Galveston Disaster (1900), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/60105/60105-h/60105-h.htm"
      },
      {
        "category": "literary",
        "title": "The Genesis Flood (Genesis 7)",
        "excerpt": "The waters prevailed exceedingly on the earth. All the high mountains that were under the whole sky were covered.",
        "source": "Genesis 7:19, World English Bible, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(World_English)/Genesis"
      },
      {
        "category": "literary",
        "title": "The Deluge of Deucalion in Ovid's Metamorphoses, Book I",
        "excerpt": "And now sea and land had no mark of distinction; everything now was ocean; and to that ocean shores were wanting.",
        "source": "Ovid, Metamorphoses, Book I (trans. Henry T. Riley), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/21765/21765-h/21765-h.htm"
      },
      {
        "category": "artistic",
        "title": "Antonio Vivaldi, Violin Concerto in E-flat major, RV 253, \"La tempesta di mare\" (musical)",
        "excerpt": "Published in 1725 within Vivaldi's Op. 8, this Baroque concerto translates a storm at sea into sound, its outer Presto movements driving forward in restless surges of rushing strings that mimic howling wind and pounding waves. Between them a brief Largo offers a fragile lull, like a lone ship riding the swell before the tempest closes in again. The relentless rhythmic energy makes the listener feel small before the fury of the elements.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Violin_Concerto_in_E-flat_major,_RV_253_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "Katsushika Hokusai, \"The Great Wave off Kanagawa\" (visual artwork)",
        "excerpt": "In this iconic woodblock print from Hokusai's Thirty-six Views of Mount Fuji (c. 1831), a towering wave rears up with claw-like crests of foam, dwarfing the tiny fishing boats and the rowers clinging to them. Far in the distance, Mount Fuji sits small and serene beneath the curling water, underscoring humanity's fragility before nature's overwhelming power. It is perhaps the most famous image ever made of the sea's sublime and terrifying force.",
        "source": "Katsushika Hokusai (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Katsushika_Hokusai_-_Thirty-Six_Views_of_Mount_Fuji-_The_Great_Wave_Off_the_Coast_of_Kanagawa_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/japan-tropical-storms-floods--art.png",
          "alt": "A great cresting wave with foaming claw-like crests towers over small boats, with a small Mount Fuji in the distance",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "google-limits-meta-gemini",
    "headline": "Google limits Meta's access to its Gemini AI models amid a compute capacity crunch",
    "overview": "Google has capped Meta's use of its Gemini artificial-intelligence models after Meta sought more computing capacity than Google could supply, the Financial Times reported. Google told Meta around March it could not meet the full demand, delaying some of Meta's internal AI projects and prompting it to tell staff to use AI 'tokens' more efficiently. Other Google clients were affected to a lesser degree as the industry scrambles for scarce compute.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQOEhSTWNhT0E1aGtldms3cmlxVjFlOVl5Z2t1ZTRTU2hjb2FSV1ZfczIwOGMwU0JMU2lqNTI1THhWU0UyS1k5aGVrNjBlYy1Iek9TNW5DOXVmM2ZiUmUxaGVoZ0N0cDFLZTNXejVLWExrV01nR2hFY2N2c0FqT1JvM3V1R0l1eTlwLWVPbkg4SHZ2SzJRczc2dDBFaC1YQ1Y3dkE?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-06-28/google-caps-meta-s-use-of-gemini-ai-financial-times-reports"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/google-limits-meta-gemini.png",
      "alt": "Rows of servers inside a data center",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nixon's Address on the Energy Shortages (1973)",
        "excerpt": "We are heading toward the most acute shortages of energy since World War II. Our supply of petroleum this winter will be at least 10 percent short of our anticipated demands, and it could fall short by as much as 17 percent.",
        "source": "Richard Nixon, Address to the Nation About Policies To Deal With the Energy Shortages, November 7, 1973 — The American Presidency Project",
        "href": "https://www.presidency.ucsb.edu/documents/address-the-nation-about-policies-deal-with-the-energy-shortages"
      },
      {
        "category": "historical",
        "title": "Augustus and Rome's Grain Supply (Res Gestae Divi Augusti)",
        "excerpt": "I did not decline in the great scarcity of corn and the superintendence of the supply, and I so administered it that within a few days I had freed the whole community from the immediate fear and peril through my expenditure and care.",
        "source": "Res Gestae Divi Augusti (The Achievements of the Deified Augustus), §5 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Translation:The_Achievements_of_the_Deified_Augustus"
      },
      {
        "category": "literary",
        "title": "Hesiod, Works and Days — Zeus hides fire, Prometheus steals it",
        "excerpt": "But Zeus in the anger of his heart hid it, because Prometheus the crafty deceived him; therefore he planned sorrow and mischief against men. He hid fire; but that the noble son of Iapetus stole again for men from Zeus the counsellor in a hollow fennel-stalk, so that Zeus who delights in thunder did not see it.",
        "source": "Hesiod, Works and Days (Hugh G. Evelyn-White trans.) — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/348/pg348.txt"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound — the stolen source of fire",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, Prometheus Bound (Theodore Alois Buckley trans.) — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "artistic",
        "title": "Beethoven — The Creatures of Prometheus, Op. 43 (musical)",
        "excerpt": "Beethoven's only full-length ballet, composed in 1800-01, dramatizes the Titan who carries divine fire to humankind and awakens lifeless clay figures into thinking, feeling beings. Its brilliant overture bursts open with a jolt of energy that mirrors the spark of stolen knowledge being handed to mortals, and the finale's heroic theme would later reappear in the Eroica Symphony. The work casts Prometheus as the great benefactor whose gift, like access to a guarded power, transforms those he chooses to bestow it upon.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Gesch%C3%B6pfe_des_Prometheus,_Op.43_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Jan Cossiers — Prometheus Carrying Fire, 1637 (visual artwork)",
        "excerpt": "In this Flemish Baroque oil painting, the Titan Prometheus strides through darkness shielding a single flickering torch, his muscular body twisting to guard the precious stolen fire from the night around him. The chiaroscuro turns the small flame into the painting's only true light, an image of a scarce and vital resource clutched against the dark. Based on a design by Rubens for the Torre de la Parada, it now hangs in the Museo del Prado.",
        "source": "Jan Cossiers, Museo del Prado (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Cossiers_-_Prometheus_Carrying_Fire.jpg",
        "image": {
          "src": "/covers/google-limits-meta-gemini--art.png",
          "alt": "Baroque painting of Prometheus striding through darkness, shielding a lit torch of stolen fire against his body",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "ukraine-strikes-russian-refineries",
    "headline": "Ukrainian drones strike two oil refineries in the Russian city of Ufa in overnight raids",
    "overview": "Ukraine said its Security Service drones struck two oil refineries, Ufaneftekhim and Bashneft Novoil, in the Russian city of Ufa, more than 1,300 kilometers from the front line. The raids are part of an intensified Ukrainian campaign against Russian energy infrastructure meant to choke fuel supplies and pressure Moscow toward negotiations. Russia said its defenses destroyed hundreds of drones overnight.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOYTFJUS10c1JERUVWMWFOZEsyR2xuRDlJNWZGQ2VvaVU3YWlxQjVzME50Nm10ZWVjMGUyNnZEZ0FjVlJldk9ydkVYNGdqdUt6UlJzWVk4c2MzM3NFMHV6ZDJuZU5XTy00YlBwZ0lmUWEtcER6OWk3eEotdmFXRTJ3STFnUVZnMlIzZllHYTFIZ1lKNkdUSzdtc0VWTXZZa1RaNmNv?oc=5"
      },
      {
        "name": "The Kyiv Independent",
        "href": "https://kyivindependent.com/ukrainian-drones-reportedly-strike-oil-refinery-in-russian-city-of-ufa/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/ukraine-strikes-russian-refineries.png",
      "alt": "An oil refinery's flare stacks burning against a dark night sky",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sherman's telegram to Grant: \"make Georgia howl\" (October 9, 1864)",
        "excerpt": "Until we can repopulate Georgia it is useless to occupy it, but utter destruction of its roads, houses, and people will cripple their military resources. By attempting to hold the roads we will lose a thousand men monthly and will gain no result. \"I can make the march and make Georgia howl.\"",
        "source": "Telegram of William T. Sherman to Ulysses S. Grant, October 9, 1864 (Civil War Era NC, North Carolina State University)",
        "href": "https://cwnc.omeka.chass.ncsu.edu/items/show/143"
      },
      {
        "category": "historical",
        "title": "United States Strategic Bombing Survey: The Attack on Oil (1945)",
        "excerpt": "Consumption of oil exceeded production from May 1944 on. Accumulated stocks were rapidly used up, and in six months were practically exhausted.",
        "source": "The United States Strategic Bombing Survey, Summary Report (European War), 1945 — public-domain U.S. Government document",
        "href": "https://www.anesi.com/ussbs02.htm"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II — the burning of Troy (Dryden's translation)",
        "excerpt": "The palace of Deiphobus ascends\nIn smoky flames, and catches on his friends.\nUcalegon burns next: the seas are bright\nWith splendour not their own, and shine with Trojan light.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (Project Gutenberg eBook #228)",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book XV — Hector calls for fire to burn the Greek ships (Pope's translation)",
        "excerpt": "Haste, bring the flames! the toil of ten long years\nIs finished, and the day desired appears;",
        "source": "Homer, The Iliad, Book XV, trans. Alexander Pope (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_15"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky — 1812 Overture, Op. 49 (musical)",
        "excerpt": "Tchaikovsky's thunderous festival overture stages the 1812 repulse of Napoleon's invasion of Russia as a sonic battlefield, building from a solemn hymn through churning martial themes to a climax punctuated by live cannon fire and pealing bells. The clash of the French \"Marseillaise\" against Russian melodies and the imperial anthem dramatizes an enemy army broken deep inside hostile territory. It remains the definitive orchestral evocation of war waged with fire, artillery, and the burning of a campaign's hopes.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner — The Burning of the Houses of Lords and Commons, 16 October 1834 (visual artwork)",
        "excerpt": "Turner's oil painting captures the night the Palace of Westminster went up in flames, a wall of orange-white fire roaring into the dark sky and reflecting in lurid streaks across the Thames. Tiny crowds and boats are dwarfed by the conflagration, conveying the helplessness of onlookers before an inferno consuming the heart of a nation's power. The blaze, set far from any front line yet striking at a symbolic stronghold, makes the canvas a vivid emblem of fire as both spectacle and instrument of destruction.",
        "source": "Philadelphia Museum of Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ukraine-strikes-russian-refineries--art.png",
          "alt": "J. M. W. Turner's painting of the Houses of Parliament engulfed in towering flames at night, the fire reflected across the Thames",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "dr-congo-first-world-cup-win",
    "headline": "DR Congo win their first World Cup match, beating Uzbekistan 3-1 to reach the round of 32",
    "overview": "DR Congo's Leopards won their first-ever World Cup match, coming from behind to beat Uzbekistan 3-1 and advance to the round of 32, where they will face England. Newcastle forward Yoane Wissa scored twice and Fiston Mayele added the other goal after Uzbekistan took an early lead. The result set off jubilation across the central African nation at the expanded 2026 tournament.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQaWMxczk0eGI3azhIenI2WjNWZU1QQTIydzZ3ekpsMU1nR2lUczM3OFpOS2VJTUtXRExQRlhCcm8zX2RuMVIzWl9yWkhBeU5sMEZ6SjVmUnVXNGZKd3ZmOWltdm9aN0ZHQTZYdjJlcVZRbVNFOXJjZFczUG1VWVJoLVJGMTBkdFc1OVo0OVRZQ2dUcWxWRFdkcWtLdXBzb3ZOOUN6Y1NmNFNYTDl1bnF1QjlOZFgxY3NfUlNia3pGWTg?oc=5"
      },
      {
        "name": "Sky Sports",
        "href": "https://www.skysports.com/football/news/12098/13556707/world-cup-2026-dr-congo-3-1-uzbekistan-yoane-wissa-stars-as-the-leopards-complete-comeback-win-to-set-up-last-32-clash-against-england"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/dr-congo-first-world-cup-win.png",
      "alt": "Jubilant Congolese football supporters celebrating in the stands",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Athenians charge at Marathon (490 BC)",
        "excerpt": "but the Athenians, closing all together with the Persians, fought in admirable fashion; for they were the first Greeks, within my knowledge, who charged their enemies at a run, and the first who endured the sight of Median garments and men clad therein; till then, the Greeks were affrighted by the very name of the Medes.",
        "source": "Herodotus, Histories, Book VI.112 (Godley translation)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/6c*.html"
      },
      {
        "category": "historical",
        "title": "The epitaph of the Spartans at Thermopylae (480 BC)",
        "excerpt": "Go tell the Spartans, thou that passest by, / That here obedient to their words we lie.",
        "source": "Herodotus, Histories, Book VII.228 (Godley translation)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/7D*.html"
      },
      {
        "category": "literary",
        "title": "David answers Goliath (1 Samuel 17:45-46, King James Bible)",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. This day will the LORD deliver thee into mine hand; and I will smite thee, and take thine head from thee.",
        "source": "The Holy Bible, King James Version, 1 Samuel 17:45-46",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "Shakespeare, King Henry V — the St Crispin's Day speech",
        "excerpt": "From this day to the ending of the world, / But we in it shall be remembered; / We few, we happy few, we band of brothers; / For he to-day that sheds his blood with me / Shall be my brother.",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act IV, Scene III",
        "href": "https://en.wikisource.org/wiki/Henry_V_(1918)_Yale/Text/Act_IV"
      },
      {
        "category": "artistic",
        "title": "Handel, \"See, the Conqu'ring Hero Comes\" from Judas Maccabaeus, HWV 63 (musical)",
        "excerpt": "Composed by George Frideric Handel for his 1746 oratorio Judas Maccabaeus, this radiant chorus greets a victorious leader returning home in triumph, its melody rising from a single treble line into full, pealing rejoicing. Originally celebrating a small people's deliverance against a mighty empire, the march became the universal anthem of the hero's homecoming, sounded for conquerors and champions ever since. Its bright, processional swing turns a hard-won victory into shared public jubilation.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, David with the Head of Goliath (visual artwork)",
        "excerpt": "In Caravaggio's late masterpiece (c. 1610, Galleria Borghese, Rome), a young, almost sorrowful David holds aloft the severed head of the giant Goliath, the slain champion's face emerging from deep shadow. The unheralded shepherd boy has felled the seemingly invincible warrior, the eternal image of the small triumphing over the great. Caravaggio's stark light and unflinching realism make the underdog's victory feel both monumental and intimately human.",
        "source": "Caravaggio (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "image": {
          "src": "/covers/dr-congo-first-world-cup-win--art.png",
          "alt": "Caravaggio's painting of a young David holding the severed head of the giant Goliath against a dark background",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "trump-250th-passport-portrait",
    "headline": "US to issue limited commemorative passports bearing Trump's portrait for America's 250th anniversary",
    "overview": "The State Department plans a limited release of commemorative US passports featuring a portrait of President Donald Trump, who would be the first living president pictured in the travel document, to mark the nation's 250th anniversary. Between 25,000 and 30,000 will be offered at the Washington passport office around July 4, with Trump's likeness and signature added to an interior page. The unusual design has drawn criticism as a cult-of-personality gesture.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce3ewkdgw9ro"
      },
      {
        "name": "Washington Post",
        "href": "https://www.washingtonpost.com/politics/2026/06/27/trump-reveals-new-image-passports-mark-america-250th/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/trump-250th-passport-portrait.png",
      "alt": "A United States passport book",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Suetonius on Augustus remaking Rome in his own image",
        "excerpt": "he could justly boast that he had found it built of brick and left it in marble.",
        "source": "Suetonius, The Lives of the Caesars, Life of Augustus, ch. 28 (Loeb/Rolfe trans., LacusCurtius)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Augustus*.html"
      },
      {
        "category": "historical",
        "title": "Augustus tallies his own statues in the Res Gestae",
        "excerpt": "Some eighty silver statues of me, on foot, on horse and in chariots had been set up in Rome ; I myself removed them, and with the money that they realized I set golden offerings in the temple of Apollo, in my own name and in the names of those who had honored me with the statues.",
        "source": "Res Gestae Divi Augusti, section 24 (English translation)",
        "href": "https://droitromain.univ-grenoble-alpes.fr/Anglica/resgest_engl.htm"
      },
      {
        "category": "literary",
        "title": "Shelley, \"Ozymandias\" — the ruler's image outlasted by ruin",
        "excerpt": "And on the pedestal these words appear:\n\"My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!\"\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\" (1818), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "literary",
        "title": "\"Render unto Caesar\" — the image and superscription on the coin",
        "excerpt": "And he saith unto them, Whose is this image and superscription? They say unto him, Caesar's. Then saith he unto them, Render therefore unto Caesar the things which are Caesar's; and unto God the things that are God's.",
        "source": "Gospel of Matthew 22:20–21, King James Version",
        "href": "https://www.gutenberg.org/cache/epub/8040/pg8040.txt"
      },
      {
        "category": "artistic",
        "title": "Handel, \"Zadok the Priest\" from the Coronation Anthems, HWV 258–261 (musical)",
        "excerpt": "Composed in 1727 for the coronation of George II at Westminster Abbey, Handel's four Coronation Anthems are the supreme musical expression of sacred royal pageantry. \"Zadok the Priest,\" the most famous, opens with a long, swelling orchestral crescendo that bursts into a blaze of choral and trumpet acclamation at the words \"Zadok the Priest, and Nathan the Prophet anointed Solomon King.\" Sung at every British coronation since, it transforms the anointing of a ruler into an overwhelming public spectacle of legitimacy and power.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Coronation_Anthems,_HWV_258-261_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Ingres, \"Napoleon I on his Imperial Throne\" (1806) (visual artwork)",
        "excerpt": "Jean-Auguste-Dominique Ingres painted the newly crowned emperor enthroned in rigid frontal majesty, clutching the scepter of Charlemagne and the hand of justice, robed in ermine and gold like a Byzantine icon or pagan idol. The deliberately archaic, almost god-like image fuses the man and the symbols of absolute power into a single graven emblem of the state. Contemporaries found its cold grandeur unsettling — a portrait less of a person than of authority itself demanding worship.",
        "source": "Jean-Auguste-Dominique Ingres, Musée de l'Armée, Paris (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Ingres,_Napoleon_on_his_Imperial_throne.jpg",
        "image": {
          "src": "/covers/trump-250th-passport-portrait--art.png",
          "alt": "Ingres's 1806 state portrait of Napoleon I enthroned in coronation robes, holding scepter and hand of justice in rigid frontal majesty",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "nasa-webb-cigar-galaxy-image",
    "headline": "NASA's Webb telescope captures a 223-megapixel image of the Cigar Galaxy revealing 16.5 million stars",
    "overview": "NASA's James Webb Space Telescope has produced a 223-megapixel composite image of Messier 82, the Cigar Galaxy, resolving roughly 16.5 million stars across 65 hours of observation. The starburst galaxy, 12 million light-years away, is forming stars about ten times faster than the Milky Way. The image combines Webb's infrared data with Hubble's visible-light observations for unprecedented detail.",
    "genre": "Science",
    "sources": [
      {
        "name": "NASA",
        "href": "https://science.nasa.gov/missions/webb/nasas-webb-pinpoints-millions-of-stars-within-cigar-galaxy/"
      },
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/messier-82-cigar-galaxy-webb-image/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/nasa-webb-cigar-galaxy-image.png",
      "alt": "The Cigar Galaxy Messier 82 resolved into millions of stars by the Webb telescope",
      "credit": "NASA, ESA, CSA"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Galileo turns his telescope on the Milky Way (Sidereus Nuncius, 1610)",
        "excerpt": "The Galaxy is nothing else but a mass of innumerable stars planted together in clusters.",
        "source": "Galileo Galilei, Sidereus Nuncius (The Sidereal Messenger, 1610), trans. Edward Stafford Carlos",
        "href": "https://www.gutenberg.org/cache/epub/46036/pg46036-images.html"
      },
      {
        "category": "historical",
        "title": "Galileo on the uncountable small stars revealed by the spyglass",
        "excerpt": "a vast crowd of stars presents itself to view; many of them are tolerably large and extremely bright, but the number of small ones is quite beyond determination.",
        "source": "Galileo Galilei, Sidereus Nuncius (The Sidereal Messenger, 1610), trans. Edward Stafford Carlos",
        "href": "https://www.gutenberg.org/cache/epub/46036/pg46036-images.html"
      },
      {
        "category": "literary",
        "title": "Psalm 8 — \"When I consider thy heavens\" (King James Bible)",
        "excerpt": "When I consider thy heavens, the work of thy fingers, the moon and the stars, which thou hast ordained; What is man, that thou art mindful of him?",
        "source": "The Bible, King James Version, Psalm 8:3–4",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"When I Heard the Learn'd Astronomer\" (1865)",
        "excerpt": "Till rising and gliding out I wander'd off by myself, In the mystical moist night-air, and from time to time, Look'd up in perfect silence at the stars.",
        "source": "Walt Whitman, Leaves of Grass (\"When I Heard the Learn'd Astronomer,\" 1865)",
        "href": "https://www.poetryfoundation.org/poems/45479/when-i-heard-the-learnd-astronomer"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, \"The Heavens Are Telling\" from The Creation (Die Schöpfung, 1798) — musical",
        "excerpt": "Closing Part I of Haydn's oratorio, this radiant chorus sets Psalm 19 — \"The heavens are telling the glory of God\" — for soloists and full chorus. The voices build from hushed wonder to a jubilant fugue on \"and the firmament sheweth his handywork,\" turning the contemplation of the star-filled sky into an outpouring of cosmic praise. It remains the work's most beloved hymn to the order and grandeur of the heavens.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, The Starry Night (1889) — visual artwork",
        "excerpt": "Painted from his asylum window at Saint-Rémy in 1889, Van Gogh's most famous canvas swirls a luminous night sky of blazing stars and a radiant crescent moon above a quiet village. Thick, rhythmic brushstrokes set the heavens churning in spirals of blue and gold, conveying both the immensity and the emotional pull of the cosmos. It endures as art's defining vision of humanity gazing up in awe at the stars.",
        "source": "Vincent van Gogh, The Starry Night, Museum of Modern Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/nasa-webb-cigar-galaxy-image--art.png",
          "alt": "Vincent van Gogh's The Starry Night, a swirling night sky filled with bright stars and a glowing crescent moon over a village",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "kennedy-center-tarp-court-order",
    "headline": "Federal judge orders Trump administration to explain the tarp covering the Kennedy Center facade",
    "overview": "US District Judge Christopher Cooper ordered the Trump administration to explain by July 31 why a large tarp still covers the facade of Washington's Kennedy Center after the president's name was removed from the building. The tarp went up on June 13, the deadline Cooper had set for the name's removal; he had earlier blocked a renovation plan and ordered the name taken down. The dispute is part of a broader fight over control of the arts center.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/judge-demands-trump-explain-kennedy-center-tarp-1234753521/"
      },
      {
        "name": "NPR",
        "href": "https://www.npr.org/2026/06/24/nx-s1-5869578/kennedy-center-tarp"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/kennedy-center-tarp-court-order.png",
      "alt": "The facade of the John F. Kennedy Center for the Performing Arts",
      "credit": "Artforum"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The damnatio memoriae of the emperor Geta (211 AD)",
        "excerpt": "Indeed, if anyone so much as wrote the name Geta or even uttered it, he was immediately put to death.",
        "source": "Cassius Dio, Roman History, Epitome of Book LXXVIII (Loeb / Earnest Cary trans.), via LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/78*.html"
      },
      {
        "category": "historical",
        "title": "Pulling down the leaden statue of King George III at Bowling Green, New York, 9 July 1776",
        "excerpt": "Emanations from the Leaden George ... deep impressions in the Bodies of some of his red-Coated and Torie Subjects",
        "source": "Lt. Isaac Bangs, contemporary journal, quoted in Smithsonian Magazine",
        "href": "https://www.smithsonianmag.com/history/a-toppled-statue-of-george-iii-epitomizes-the-ongoing-debate-over-americas-monuments-180979463/"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (1818)",
        "excerpt": "And on the pedestal these words appear:\n\"My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!\"\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Wikisource (The Hundred Best Poems in the English Language)",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "literary",
        "title": "Nathaniel Hawthorne, \"The Minister's Black Veil\" (1836)",
        "excerpt": "I look around me, and, lo! on every visage a Black Veil!",
        "source": "Nathaniel Hawthorne, Twice-Told Tales, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/508/508-h/508-h.htm"
      },
      {
        "category": "artistic",
        "title": "Maurice Ravel, \"Pavane pour une infante défunte\" (1899) (musical)",
        "excerpt": "A slow, hushed processional dance composed in 1899, its title — a \"pavane for a dead princess\" — evokes the courtly funeral rites of a vanished Spanish past. Its tender, archaic melody drifts like a memory half-effaced, mourning not a real person but a lost age and the fading of remembrance itself. The score, in the public domain, suits a meditation on monuments shrouded and names removed.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Pavane_pour_une_infante_d%C3%A9funte,_M.19_(Ravel,_Maurice)"
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, \"Imaginary View of the Grande Galerie in the Louvre in Ruins\" (1796) (visual artwork)",
        "excerpt": "Hubert Robert, nicknamed \"Robert des Ruines,\" imagines the very gallery in which his picture hung reduced to a roofless, crumbling shell, its grand vaulted arches open to the sky. Tiny figures sketch and scavenge among the broken statuary, a vision of how even the proudest monument is destined for decay. Painted in 1796, it turns a living institution into a future ruin — a meditation on impermanence, erasure, and the fragility of public memory.",
        "source": "Hubert Robert, Musée du Louvre (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Hubert_Robert_-_Imaginary_View_of_the_Grande_Galerie_in_the_Louvre_in_Ruins_-_WGA19589.jpg",
        "image": {
          "src": "/covers/kennedy-center-tarp-court-order--art.png",
          "alt": "Oil painting of the Louvre's Grande Galerie depicted as a roofless ruin, with broken columns and statuary and small figures amid the rubble",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "saype-beyond-walls-minneapolis",
    "headline": "Artist Saype paints a monumental biodegradable grass mural of clasping hands in Minneapolis",
    "overview": "Franco-Swiss land artist Saype created a vast mural of two clasping hands on the grass of Minneapolis's Boom Island Park, using a biodegradable paint designed to fade over time. The work, the first US edition of his global 'Beyond Walls' series, was made in response to recent community trauma, with hundreds of residents forming a human chain to symbolize solidarity and resilience. Saype said he found 'an incredible humanity in Minneapolis.'",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/saype-beyond-walls-minneapolis-temporary-mural/"
      },
      {
        "name": "MPR News",
        "href": "https://www.mprnews.org/story/2026/06/05/massive-mural-by-franco-swiss-artist-saype-debuts-at-boom-island-park-in-minneapolis"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/saype-beyond-walls-minneapolis.png",
      "alt": "Saype's giant grass mural of two clasping hands seen from above",
      "credit": "Saype"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Marcus Aurelius on the impermanence of all things",
        "excerpt": "Consider how quickly all things are dissolved and resolved: the bodies and substances themselves, into the matter and substance of the world: and their memories into the general age and time of the world.",
        "source": "Marcus Aurelius, Meditations, Book III (trans. Méric Casaubon), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2680/2680-h/2680-h.htm"
      },
      {
        "category": "historical",
        "title": "The Roman dextrarum iunctio: the clasped right hands of fellowship",
        "excerpt": "This early-3rd-century A.D. Roman marble sarcophagus fragment from the Metropolitan Museum of Art depicts a marriage scene in which husband and wife perform the dextrarum iunctio, the ceremonial joining of right hands. The ancient gesture of clasped hands signified concord, fidelity, and the bond between people, the same symbolism Saype invokes with his mural of two arms reaching across to clasp one another.",
        "source": "Marble sarcophagus fragment with marriage scene, Roman, ca. 3rd century A.D., The Metropolitan Museum of Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Marble_sarcophagus_fragment-_marriage_scene_MET_DP276799.jpg"
      },
      {
        "category": "literary",
        "title": "John Donne, \"No man is an island\" (Meditation XVII)",
        "excerpt": "No man is an island, entire of itself; every man is a piece of the continent, a part of the main. If a clod be washed away by the sea, Europe is the less, as well as if a promontory were, as well as if a manor of thy friend's or of thine own were: any man's death diminishes me, because I am involved in mankind, and therefore never send to know for whom the bell tolls; it tolls for thee.",
        "source": "John Donne, Devotions upon Emergent Occasions, Meditation XVII (1624), Wikisource",
        "href": "https://en.wikisource.org/wiki/Meditation_XVII"
      },
      {
        "category": "literary",
        "title": "Robert Herrick, \"To the Virgins, to Make Much of Time\"",
        "excerpt": "Gather ye Rose-buds while ye may,\n    Old Time is still a-flying:\nAnd this same flower that smiles to day,\n    To morrow will be dying.",
        "source": "Robert Herrick, Hesperides (1648), Wikipedia",
        "href": "https://en.wikipedia.org/wiki/To_the_Virgins,_to_Make_Much_of_Time"
      },
      {
        "category": "artistic",
        "title": "Friedrich Schiller, \"Ode to Joy\" / Beethoven's Symphony No. 9 (musical)",
        "excerpt": "Beethoven set Schiller's \"An die Freude\" in the choral finale of his Ninth Symphony, Op. 125, completed in 1824, where massed voices proclaim that \"All men become brothers.\" The exultant tune, rising through soloists, chorus, and orchestra, has become a universal anthem of joy, fellowship, and human solidarity. Its score is freely available in the public domain.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Roman marble relief of the dextrarum iunctio, marriage scene (visual artwork)",
        "excerpt": "This Roman marble sarcophagus fragment, dated to about the early 3rd century A.D. and held at the Metropolitan Museum of Art, shows a bride and groom joining their right hands in the dextrarum iunctio while a small winged Eros looks on. The carved gesture of two clasped hands made fellowship, trust, and union visible in stone. It is an ancient counterpart to Saype's grass mural of two arms reaching to grasp each other.",
        "source": "Marble sarcophagus fragment with marriage scene, Roman, ca. 3rd century A.D., The Metropolitan Museum of Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Marble_sarcophagus_fragment-_marriage_scene_MET_DP276799.jpg",
        "image": {
          "src": "/covers/saype-beyond-walls-minneapolis--art.png",
          "alt": "Roman marble relief fragment showing a married couple clasping right hands in the dextrarum iunctio, with a small winged Eros between them",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "gaudi-centenary-influence",
    "headline": "Architecture world marks the centenary of Antoni Gaudí's death and weighs his global influence",
    "overview": "A century after the Catalan architect Antoni Gaudí died in Barcelona on 10 June 1926, days after being struck by a tram, the design world is reassessing his enduring influence. His organic, nature-inspired Modernisme — above all the still-unfinished Sagrada Família basilica, now nearing completion — reshaped ideas of structure, ornament and form. Critics and architects are debating whether he ranks among the greatest builders in history.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/27/gaudi-centenary-impact-dezeen-in-depth/"
      },
      {
        "name": "Dezeen (Weekly)",
        "href": "https://www.dezeen.com/2026/06/26/gaudi-dezeen-weekly-podcast/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/gaudi-centenary-influence.png",
      "alt": "Antoni Gaudí's Sagrada Família basilica in Barcelona",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Brunelleschi's dome of Florence Cathedral, in Vasari's Lives",
        "excerpt": "And it can be said with confidence that the ancients never went so high with their buildings, and never exposed themselves to so great a risk as to try to challenge the heavens, even as this structure truly appears to challenge them, seeing that it rises to such a height that the mountains round Florence appear no higher. And it seems, in truth, that the heavens are envious of it, since the lightning keeps on striking it every day.",
        "source": "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors & Architects, Vol. II, Life of Filippo Brunelleschi (trans. de Vere)",
        "href": "https://www.gutenberg.org/files/25759/25759-h/25759-h.htm"
      },
      {
        "category": "historical",
        "title": "The building of Solomon's Temple (1 Kings 6:7)",
        "excerpt": "And the house, when it was in building, was built of stone made ready before it was brought thither: so that there was neither hammer nor ax nor any tool of iron heard in the house, while it was in building.",
        "source": "The Holy Bible, King James Version, 1 Kings 6:7",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "literary",
        "title": "Victor Hugo, Notre-Dame de Paris — \"This Will Kill That\"",
        "excerpt": "In fact, from the origin of things down to the fifteenth century of the Christian era, inclusive, architecture is the great book of humanity, the principal expression of man in his different stages of development, either as a force or as an intelligence.",
        "source": "Victor Hugo, Notre-Dame de Paris (trans. Isabel F. Hapgood), Book Fifth, Ch. II",
        "href": "https://www.gutenberg.org/files/2610/2610-h/2610-h.htm"
      },
      {
        "category": "literary",
        "title": "John Ruskin, \"The Nature of Gothic,\" The Stones of Venice",
        "excerpt": "No human face is exactly the same in its lines on each side, no leaf perfect in its lobes, no branch in its symmetry. All admit irregularity as they imply change; and to banish imperfection is to destroy expression, to check exertion, to paralyse vitality. All things are literally better, lovelier, and more beloved for the imperfections which have been divinely appointed, that the law of human life may be Effort, and the law of human judgment, Mercy.",
        "source": "John Ruskin, The Stones of Venice, Vol. II, Ch. VI, \"The Nature of Gothic\"",
        "href": "https://www.gutenberg.org/files/30755/30755-h/30755-h.htm"
      },
      {
        "category": "artistic",
        "title": "J. S. Bach, Toccata and Fugue in D minor, BWV 565 (musical)",
        "excerpt": "Bach's most famous organ work opens with a thunderous descending flourish before unfurling into a vast contrapuntal fugue, the very sound of cathedral grandeur conjured from pipes and stone vaults. Its towering arches of sound and dramatic registration evoke the soaring interior of a great church, an apt sonic parallel to Gaudí's stone forests rising toward heaven. The Bach-Gesellschaft edition score is in the public domain.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Toccata_and_Fugue_in_D_minor,_BWV_565_(Bach,_Johann_Sebastian)"
      },
      {
        "category": "artistic",
        "title": "Claude Monet, Rouen Cathedral, Facade (Morning Effect) (visual artwork)",
        "excerpt": "Painted between 1892 and 1894, this canvas dissolves the great Gothic facade of Rouen Cathedral into shimmering veils of dawn light, its carved stone seemingly melting into atmosphere. Monet returned again and again to the same portal at different hours, treating the ancient edifice as living, changing matter rather than fixed masonry. The series anticipates Gaudí's own conviction that architecture should breathe with the rhythms and forms of nature.",
        "source": "Claude Monet, Museum Folkwang, Essen (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Rouen_Cathedral,_Facade_(Morning_effect).JPG",
        "image": {
          "src": "/covers/gaudi-centenary-influence--art.png",
          "alt": "Impressionist painting of the light-dappled Gothic facade of Rouen Cathedral at morning by Claude Monet",
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
