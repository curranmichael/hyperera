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
// the Afternoon Edition of 29 June 2026 (ranks 1-13) leads with its hero story,
// followed by the Morning Edition of 29 June and the Evening Edition of 28 June 2026.
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
    "slug": "us-iran-stand-down-hormuz",
    "headline": "US and Iran agree to stand down after exchange of strikes near the Strait of Hormuz",
    "overview": "Washington and Tehran have agreed to \"stand down\" after several days of tit-for-tat strikes around the Strait of Hormuz that had threatened their fragile ceasefire, a US official said. Vessels will again pass through the waterway freely and talks aimed at ending the war are due to resume in Doha, easing fears of a wider Gulf conflict and helping oil prices cool.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c872rjw17qpo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMigAFBVV95cUxPYUFwVXVYYUk3ZXZGYUhac1BmQjhYN1JiSHM5SlhvWW9taHVTRkFZeVlrNFVfTl8wQVY0VTc3ekNEd1EyX2NMYjdNZXFwWi1WMFJWTHVIaE8yNTNNVWR4NkFHelBmSFlwYWdjRTZQREo4elhtYnNhZ3RMMjg2ckttSw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/us-iran-stand-down-hormuz.png",
      "alt": "Warships and a tanker in the haze of the Strait of Hormuz at dusk",
      "credit": "BBC"
    },
    "lead": true,
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Proclamation 3504: Interdiction of the Delivery of Offensive Weapons to Cuba",
        "excerpt": "In carrying out this order, force shall not be used except in case of failure or refusal to comply with directions, or with regulations or directives of the Secretary of Defense issued hereunder, after reasonable efforts have been made to communicate them to the vessel or craft, or in case of self-defense. In any case, force shall be used only to the extent necessary.",
        "source": "Proclamation 3504, John F. Kennedy, October 23, 1962 (American Presidency Project)",
        "href": "https://www.presidency.ucsb.edu/documents/proclamation-3504-interdiction-the-delivery-offensive-weapons-cuba"
      },
      {
        "category": "historical",
        "title": "Treaty of Ghent (1814)",
        "excerpt": "There shall be a firm and universal Peace between His Britannic Majesty and the United States, and between their respective Countries, Territories, Cities, Towns, and People of every degree without exception of places or persons. All hostilities both by sea and land shall cease as soon as this Treaty shall have been ratified by both parties.",
        "source": "Treaty of Ghent, December 24, 1814 (The Avalon Project, Yale Law School)",
        "href": "https://avalon.law.yale.edu/19th_century/ghent.asp"
      },
      {
        "category": "literary",
        "title": "The Melian Dialogue, History of the Peloponnesian War, Book V",
        "excerpt": "For ourselves, we shall not trouble you with specious pretences... and make a long speech which would not be believed; and in return we hope that you... will aim at what is feasible, holding in view the real sentiments of us both; since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War (Crawley translation)",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "literary",
        "title": "The Persians",
        "excerpt": "And straight to all his captains gave this charge—\nAs soon as sunlight warms the ground no more,\nAnd gloom enwraps the sanctuary of sky,\nRange we our fleet in triple serried lines\nTo bar the passage from the seething strait,\nThis way and that: let other ships surround\nThe isle of Ajax... So spake the king,\nInspired at heart with over-confidence,\nUnwitting of the gods' predestined will.",
        "source": "Aeschylus, The Persians, in Four Plays of Aeschylus (E. D. A. Morshead translation)",
        "href": "https://www.gutenberg.org/files/8714/8714-h/8714-h.htm"
      },
      {
        "category": "artistic",
        "title": "1812 Overture, Op. 49",
        "excerpt": "Tchaikovsky's festival overture stages the very arc of brinkmanship and reprieve: a solemn hymn for the threatened nation gives way to clashing martial themes that collide like fleets in a narrow sea, cannon fire punching through the orchestra. Then the storm breaks, the antagonist's anthem is overwhelmed, and bells peal a hard-won deliverance—great powers pulling back from ruin into triumph.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 (1880), IMSLP",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Die Seeschlacht bei Salamis (The Battle of Salamis)",
        "excerpt": "Kaulbach crowds the canvas with locked galleys and tumbling oarsmen in a strangling channel, where a great navy's overreach turns to chaos amid spray, sail, and fallen bodies. Above the carnage Greek figures surge with defiant resolve, a vision of an empire checked at a narrow strait—the perennial peril, and the deliverance, of contesting freedom of the seas.",
        "source": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (1868), Maximilianeum, Munich (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/us-iran-stand-down-hormuz--art.png",
          "alt": "Painting of the naval Battle of Salamis",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "europe-heatwave-record-deaths",
    "headline": "Europe's heatwave linked to more than 1,300 deaths as Germany hits a record 41.7C",
    "overview": "The World Health Organization says Europe's unprecedented early-summer heatwave has been linked to more than 1,300 excess deaths since 21 June, calling heat a \"silent killer.\" Germany reached a record 41.7C and France reported around 1,000 more deaths than expected since Wednesday as the extreme heat pushed eastward across the continent.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn4d2vv935lo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPNWp3QVd0ZG5MR05VMklHaHZYRVFsSmtibXdaV2pORDBIVXhfSFNwaGt4QUl4blQzeUNzMjV0S2NxbUtVbHh1a290NTB5ZGxXNnBiNjhab0g0dzRjTjVUM3N6Z091cTJZWHdwcEFxMDZZc0doSlZsVHQxS3d4T2VTZ1dzVmJYb19aYnpnUXpVajhLeWE4NW4xYW9kaTJDTGZqRVNEeTBxM0N6Znh1alhqeVVYdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/europe-heatwave-record-deaths.png",
      "alt": "A sun-scorched European city baking under a hazy white sky during a heatwave",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 2003 European Heatwave",
        "excerpt": "In August 2003 a stagnant dome of heat settled over the continent and became the deadliest such event in modern European memory, killing an estimated 70,000 people, with roughly 15,000 deaths in France alone. The victims were overwhelmingly the elderly and the isolated, who perished quietly in apartments that never cooled, even at night. It was the hottest summer Europe had seen in centuries, and it taught the continent that heat is a silent killer that strikes hardest at the frail.",
        "source": "Encyclopaedia Britannica",
        "href": "https://www.britannica.com/event/European-heat-wave-of-2003"
      },
      {
        "category": "historical",
        "title": "The 1936 North American Heat Wave (Dust Bowl)",
        "excerpt": "During the depths of the Dust Bowl in July 1936, a merciless heat wave baked the United States and Canada, killing about 5,000 people as thermometers climbed past 120 degrees Fahrenheit on the drought-stricken plains. Stripped of vegetation by failed farming, the land had no power to moderate the scorching air, and the dead piled up in sweltering cities and parched farmsteads alike. Many of the state temperature records it set stood unbroken for more than seventy years.",
        "source": "National Weather Service (NOAA)",
        "href": "https://www.weather.gov/ilx/july1936heat"
      },
      {
        "category": "literary",
        "title": "The Rime of the Ancient Mariner",
        "excerpt": "All in a hot and copper sky,\nThe bloody Sun, at noon,\nRight up above the mast did stand,\nNo bigger than the Moon.\n\nDay after day, day after day,\nWe stuck, nor breath nor motion;\nAs idle as a painted ship\nUpon a painted ocean.\n\nWater, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.",
        "source": "Samuel Taylor Coleridge (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "literary",
        "title": "The Book of Jonah 4:7-8 (King James Bible)",
        "excerpt": "7 But God prepared a worm when the morning rose the next day, and it smote the gourd that it withered. 8 And it came to pass, when the sun did arise, that God prepared a vehement east wind; and the sun beat upon the head of Jonah, that he fainted, and wished in himself to die, and said, It is better for me to die than to live.",
        "source": "King James Bible, Jonah (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jonah"
      },
      {
        "category": "artistic",
        "title": "L'estate (Summer), from The Four Seasons",
        "excerpt": "Vivaldi's Summer concerto in G minor (Op. 8, No. 2, RV 315) is music wilted by heat: languid violins droop under an oppressive sun, men and flocks faint in the sweltering stillness, and even the cuckoo and turtledove sing wearily. The composer's own accompanying sonnet describes a season under the merciless sun before the heat erupts into a violent summer storm. It is one of the earliest vivid musical portraits of human frailty before the elements.",
        "source": "Antonio Vivaldi (IMSLP)",
        "href": "https://imslp.org/wiki/The_Four_Seasons_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "El Khasné, Petra",
        "excerpt": "Frederic Edwin Church's 1874 painting bathes the rose-red rock temple of Petra in the burning, golden light of a desert sun, the sandstone cliffs glowing as if heated to the touch. Tiny human figures are dwarfed by the vast, sun-scorched canyon, emphasizing human smallness before an arid and merciless landscape. The image captures the beauty and the menace of a world ruled by relentless heat.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:El_Khasne,_Petra_Frederic_Edwin_Church.jpg",
        "image": {
          "src": "/covers/europe-heatwave-record-deaths--art.png",
          "alt": "Sun-drenched rock temple of Petra by Frederic Edwin Church",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "venezuela-earthquake-survivors-rescued",
    "headline": "Rescuers pull survivors from the rubble four days after twin Venezuela earthquakes kill about 1,450",
    "overview": "Four days after twin earthquakes devastated Venezuela and killed at least 1,450 people, rescue teams are still pulling survivors from collapsed buildings, including a mother and her 18-day-old baby. Footage of the infant's rescue has been shared worldwide as a rare symbol of hope amid the search for the missing.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/clyw3rkj2p7o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxOVEpJTmpsemVuX3FnVE9RZU9iT3VGUkdPTmt5VjlwV0dwMzBsTWlQeTNBR3pZRVdwUXN0Tks0YlM2XzltXzN4QzFRdTZ4cUMyV2w4V0hmbkpyeFNQaUtkRUZILWZQQ0ZvNmhUX1RvWjNMY2VNVUxhU2JfbF9va1pJVEF1NkpYV3BPTUc4WTJfSGtxcjF5MnhGaWpiM1J5QXlyZUlGY19FSWlZamd6OFlTdGhzTHZHMzNPckRuYy1LMlFRU1ZBQWxz?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/venezuela-earthquake-survivors-rescued.png",
      "alt": "Rescuers searching the rubble of a collapsed building after an earthquake",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rev. Charles Davy's Eyewitness Account of the Lisbon Earthquake (1755)",
        "excerpt": "The house I was in shook with such violence, that the upper stories immediately fell; and though my apartment (which was the first floor) did not then share the same fate, yet everything was thrown out of its place in such a manner that it was with no small difficulty I kept my [feet] ... I expected nothing less than to be soon crushed to death, as the walls continued rocking to and fro in the frightfulest manner, opening in several places; large stones falling down on every side.",
        "source": "Rev. Charles Davy, \"The Earthquake at Lisbon, 1755,\" Fordham Modern History Sourcebook",
        "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp"
      },
      {
        "category": "historical",
        "title": "The 1908 Messina Earthquake",
        "excerpt": "At dawn on 28 December 1908 a quake and tsunami flattened Messina and Reggio Calabria, killing tens of thousands as homes folded onto sleeping families. For weeks afterward rescuers clawed through the rubble with bare hands, and again and again pulled out whole families still alive, some discovered days after the shock had buried them. Naval crews and the Red Cross raced to the ruined coast, and survivors emerged blinking into a city that had become a single vast graveyard.",
        "source": "\"1908 Messina earthquake,\" Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1908_Messina_earthquake"
      },
      {
        "category": "literary",
        "title": "The Book of Numbers (King James Version), the destruction of Korah",
        "excerpt": "And the earth opened her mouth, and swallowed them up, and their houses, and all the men that appertained unto Korah, and all their goods. They, and all that appertained to them, went down alive into the pit, and the earth closed upon them: and they perished from among the congregation.",
        "source": "Bible (King James), Numbers 16:32-33, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Numbers"
      },
      {
        "category": "literary",
        "title": "Candide, Chapter V (the Lisbon earthquake), by Voltaire",
        "excerpt": "The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, Candide, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "artistic",
        "title": "Requiem in D minor, K.626, by Wolfgang Amadeus Mozart",
        "excerpt": "Mozart's unfinished Requiem voices the terror and grief that follow sudden catastrophe: in the Dies Irae the chorus erupts in jagged, trembling cries, the orchestra shuddering like ground that will not hold still. Yet the music turns from the day of wrath toward pleading and rest, mourning the dead while begging mercy for the living. It is the sound of a world cracking open, and of survivors crying out from beneath the dust.",
        "source": "Requiem in D minor, K.626 (Mozart), IMSLP",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "The Last Day of Pompeii, by Karl Bryullov (1830-1833)",
        "excerpt": "Bryullov's vast canvas freezes the instant a city dies: the sky is torn by lightning and a blood-red volcanic glare, columns and statues topple from rooftops onto the fleeing crowd below. A mother shields her children, a son carries his aged father, and a fallen woman lies beside her living infant who still reaches up amid the chaos. It is the eternal image of the earth's sudden violence and of human tenderness clinging on as everything collapses.",
        "source": "File:Karl Brullov - The Last Day of Pompeii - Google Art Project.jpg, Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/venezuela-earthquake-survivors-rescued--art.png",
          "alt": "Karl Bryullov, The Last Day of Pompeii",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "bat-cuts-9000-jobs",
    "headline": "British American Tobacco to cut 9,000 jobs as it shifts away from cigarettes",
    "overview": "British American Tobacco said it will cut about 9,000 jobs — roughly 5,500 directly and 3,500 moved to outside partners — as it tries to save 600 million pounds a year by 2028. The cuts, equal to nearly a fifth of its non-US workforce, come as cigarette demand declines and the company invests in vaping and nicotine pouches.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNT3Vwc2JXeTRDNDdRU3hiNTJuZVpVQUpHSy12a3dYZDc3Wm56QklwUklWckcwenpoMVJOQXIxWk1TbXQ5SVNtcmhfOG1SS3g0TVBzT2RvMWFseWJvdm9RZW5pQjhIVWZoVkJsZ0NsR1haMW9scnM5bjUxeXV4MTVvRldUSzl0Ui1tM3RWM0ZKOE9ITGpaV01kTGF0V0ZlUlM2R0Z4RkdFWHFoTGs?oc=5"
      },
      {
        "name": "East Lothian Courier",
        "href": "https://www.eastlothiancourier.com/news/national/26235818.british-american-tobacco-cutting-9-000-jobs-slash-costs/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/bat-cuts-9000-jobs.png",
      "alt": "A dim, nearly empty cigarette factory floor with idle conveyor lines at dusk",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Proclamation of Ned Ludd (1811)",
        "excerpt": "Ned Lud's Proclamation 23 Decr 1811\n\nI do hereby discharge, all manner of Persons, who has been, employ'd by me, in giveing any information, of breaking Frames, to the Town Clerk, or to the Corporation Silley Committee ~ any Person found out, in so doing or attempting to give any information, will be Punish'd with death, or any Constable found out making any enquiries, so has to hurt the Cause of Ned, or any of his army, Death (by order of King Lud)",
        "source": "The National Archives (UK), HO 42/118",
        "href": "https://www.nationalarchives.gov.uk/explore-the-collection/stories/the-proclamation-of-ned-ludd/"
      },
      {
        "category": "historical",
        "title": "Andrew Carnegie, \"The Gospel of Wealth\" (1889)",
        "excerpt": "The problem of our age is the proper administration of wealth, so that the ties of brotherhood may still bind together the rich and poor in harmonious relationship. The conditions of human life have not only been changed, but revolutionized, within the past few hundred years.",
        "source": "Andrew Carnegie, North American Review (1889), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Gospel_of_Wealth"
      },
      {
        "category": "literary",
        "title": "The Deserted Village",
        "excerpt": "But times are alter'd; trade's unfeeling train\nUsurp the land, and dispossess the swain;\nAlong the lawn, where scatter'd hamlets rose,\nUnwieldy wealth and cumbrous pomp repose;",
        "source": "Oliver Goldsmith, The Deserted Village (1770), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/50500/50500-h/50500-h.htm"
      },
      {
        "category": "literary",
        "title": "Ecclesiastes (King James Version)",
        "excerpt": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. What profit hath a man of all his labour which he taketh under the sun? One generation passeth away, and another generation cometh: but the earth abideth for ever.",
        "source": "Ecclesiastes 1:2-4, King James Version, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/8021/pg8021.txt"
      },
      {
        "category": "artistic",
        "title": "Götterdämmerung (Twilight of the Gods), WWV 86D",
        "excerpt": "Wagner's vast cycle ends in conflagration: Brünnhilde rides her horse into Siegfried's funeral pyre, the Rhine overflows, and the hall of the gods is consumed by fire as an entire order of the world passes away. The shimmering, world-ending music makes the fall of one age and the uncertain dawn of another almost unbearably vivid, a requiem for power that thought itself eternal.",
        "source": "Richard Wagner, Götterdämmerung (1876), full score on IMSLP",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "The Smokers",
        "excerpt": "Adriaen Brouwer's tavern scene shows young men crammed together exhaling great curling plumes of pipe smoke, eyes rolling and faces contorted in a coarse pleasure that the painter clearly frames as folly. Painted when tobacco was a new and controversial vice, the work treats smoke itself as the very emblem of vanity and dissipation, a fleeting vapour that vanishes as quickly as it rises.",
        "source": "Adriaen Brouwer, The Smokers (ca. 1636), The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/435807",
        "image": {
          "src": "/covers/bat-cuts-9000-jobs--art.png",
          "alt": "Adriaen Brouwer's painting The Smokers, men exhaling pipe smoke in a tavern",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "cxmt-tencent-memory-deal",
    "headline": "China's CXMT signs a $2.94 billion memory-chip supply deal with Tencent ahead of its IPO",
    "overview": "Chinese memory-chip maker CXMT has agreed a long-term DRAM supply deal worth more than 20 billion yuan (about $2.94 billion) with Tencent, sources say, as Chinese internet giants race to lock in domestic chips during a global shortage. The agreement, struck ahead of CXMT's stock-market debut, underscores Beijing's push for semiconductor self-sufficiency.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPY1lpSXBra1c5eWlrY0IyOXdLRXcyX2dKWHM2YmJRVXRHWmhmMjM3UUs1MnVmN0doWGVUeDJjeGVxQkEydHZjT19jbko5X0VJZm81bjU3c1llaG9WZExyaElQWjBET280RzE0Y0ZxR1hYRnFkQ1dDYWtQRVRiTzh4VjBMR2VvVXM0TkVETkt6cjF4N2RDZi15QWlyX0NTZFBHNks3ZVM1Z3dCQmRob2Vmd0NEYXdHMlBVWHc?oc=5"
      },
      {
        "name": "Yahoo Finance",
        "href": "https://finance.yahoo.com/technology/articles/exclusive-chinas-cxmt-wins-3-070237888.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/cxmt-tencent-memory-deal.png",
      "alt": "A gloved hand holding a gleaming silicon memory wafer inside a clean room",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hamilton's Report on the Subject of Manufactures (1791)",
        "excerpt": "Every nation, with a view to those great objects, ought to endeavour to possess within itself all the essentials of national supply. These comprise the means of Subsistence, habitation, clothing, and defence.",
        "source": "Alexander Hamilton, Report on the Subject of Manufactures, December 5, 1791",
        "href": "https://publicpolicy.pepperdine.edu/academics/research/faculty-research/intellectual-foundations/early-american/ahrepman.htm"
      },
      {
        "category": "historical",
        "title": "President Polk Confirms California Gold (1848)",
        "excerpt": "The accounts of the abundance of gold in that territory are of such an extraordinary character as would scarcely command belief were they not corroborated by the authentic reports of officers in the public service who have visited the mineral district and derived the facts which they detail from personal observation.",
        "source": "James K. Polk, Fourth Annual Message to Congress, December 5, 1848",
        "href": "https://millercenter.org/the-presidency/presidential-speeches/december-5-1848-fourth-annual-message-congress"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound",
        "excerpt": "Still, listen to the miseries that beset mankind—how they were witless before and I made them have sense and endowed them with reason. I will not speak to upbraid mankind but to set forth the friendly purpose that inspired my blessing. First of all, though they had eyes to see, they saw to no avail; they had ears, but they did not understand; but, just as shapes in dreams, throughout their length of days, without purpose they wrought all things in confusion.",
        "source": "Aeschylus, Prometheus Bound, lines 442-451 (trans. Herbert Weir Smyth)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Aesch.+PB+436"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad — The Forging of Achilles' Shield",
        "excerpt": "And the bellows, twenty in all, blew upon the melting-vats, sending forth a ready blast of every force, now to further him as he laboured hard, and again in whatsoever way Hephaestus might wish and his work go on. And on the fire he put stubborn bronze and tin and precious gold and silver; and thereafter he set on the anvil-block a great anvil, and took in one hand a massive hammer, and in the other took he the tongs.",
        "source": "Homer, Iliad, Book 18, lines 470-477 (trans. A. T. Murray)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D18%3Acard%3D468"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Siegfried (WWV 86C) — the Forging Song",
        "excerpt": "In Act I, the young Siegfried reforges the shattered sword Nothung that no smith could mend, hammering the splinters into molten steel and singing his exultant \"Schmiedelied\" as sparks fly. Wagner turns metalworking into an anthem of self-sufficiency: a hero who refuses inherited, broken tools and forges his own weapon to win his destiny. The pounding orchestral rhythms mimic the anvil itself.",
        "source": "Richard Wagner, Siegfried, third opera of Der Ring des Nibelungen (1871)",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez, The Forge of Vulcan (1630)",
        "excerpt": "Apollo strides into Vulcan's smoky workshop bearing news, and the half-naked smiths freeze mid-labor, hammers raised over a glowing blade upon the anvil. Velázquez dignifies the grimy work of metalmaking with the gravity of myth, light glinting off sweat and beaten metal. It is a vision of skilled hands turning raw material into instruments of power.",
        "source": "Diego Velázquez, La Fragua de Vulcano, Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/cxmt-tencent-memory-deal--art.png",
          "alt": "Velázquez painting of Vulcan's forge with smiths at the anvil",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "south-korea-coach-resigns-world-cup",
    "headline": "South Korea coach Hong Myung-bo resigns after World Cup exit as president orders a probe",
    "overview": "Hong Myung-bo has resigned as head coach of South Korea's men's national football team after they failed to reach the World Cup knockout stage, finishing behind Mexico and South Africa. President Lee Jae Myung called for an investigation into the team's performance, and Hong said the responsibility \"rests entirely with me as head coach.\"",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxOdGE0Q09NR0lUTUkzR29zaVJoSE1GOVhEWWpnS1hpVVZRWXJmbE9fWWRxamRRNk94QWdhUTNPbklOMXROT1FpV19KOE1JZFk3Y2lyYVN0ejFKLVE0X0FydENLeUpOUnRIVGRBdk5VVlF1d3dTUTZPeWtzVVZVbVJnNDY1OVk0dkJ4bzlJcHloYmdDaWM?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cdx7jk0kq4vo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/south-korea-coach-resigns-world-cup.png",
      "alt": "An empty floodlit football pitch at night after a match",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Robert E. Lee's Letter Offering His Resignation to Jefferson Davis",
        "excerpt": "The general remedy for the want of success in a military commander is his removal. This is natural, and, in many instances, proper. For, no matter what may be the ability of the officer, if he loses the confidence of his troops disaster must sooner or later ensue. I have been prompted by these reflections more than once since my return from Pennsylvania to propose to Your Excellency the propriety of selecting another commander for this army. ... I therefore, in all sincerity, request Your Excellency to take measures to supply my place.",
        "source": "Robert E. Lee to Jefferson Davis, August 8, 1863 (Lee Family Digital Archive)",
        "href": "https://leefamilyarchive.org/robert-e-lee-to-jefferson-davis-1863-august-8/"
      },
      {
        "category": "historical",
        "title": "The Trial of the Athenian Generals after Arginusae",
        "excerpt": "Not long after, repentance seized the Athenians, and they passed a decree authorising the public prosecution of those who had deceived the people. ... Callixenus eventually came back when the party in Piraeus returned to the city, at the date of the amnesty, but only to die of hunger, an object of universal detestation.",
        "source": "Xenophon, Hellenica, Book I, ch. 7 (trans. Dakyns), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1174/1174-h/1174-h.htm"
      },
      {
        "category": "literary",
        "title": "Coriolanus",
        "excerpt": "You common cry of curs! whose breath I hate\nAs reek o' the rotten fens, whose loves I prize\nAs the dead carcasses of unburied men\nThat do corrupt my air, I banish you",
        "source": "William Shakespeare, Coriolanus, Act III, Scene 3",
        "href": "https://www.gutenberg.org/ebooks/1535"
      },
      {
        "category": "literary",
        "title": "King Henry VIII (Cardinal Wolsey's Farewell)",
        "excerpt": "Farewell? A long farewell to all my Greatnesse.\nThis is the state of Man; to day he puts forth\nThe tender Leaues of hopes, to morrow Blossomes,\nAnd beares his blushing Honors thicke vpon him:\nThe third day, comes a Frost; a killing Frost,\nAnd when he thinkes, good easie man, full surely\nHis Greatnesse is a ripening, nippes his roote,\nAnd then he fals as I do.",
        "source": "William Shakespeare, King Henry VIII, Act III, Scene 2 (Cardinal Wolsey), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/2258/pg2258.txt"
      },
      {
        "category": "artistic",
        "title": "Eroica Symphony No. 3, Op. 55 — Marcia funebre",
        "excerpt": "The second movement of Beethoven's Eroica is a vast funeral march, a slow tread of muffled strings and keening oboe mourning a fallen hero. Music that once celebrated a champion's greatness turns to public lamentation, the whole orchestra bowed under the weight of a downfall. It is the sound of glory collapsing into grief, and of a people grieving the leader they had exalted.",
        "source": "Ludwig van Beethoven, Symphony No. 3 'Eroica', Op. 55 (IMSLP)",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Napoleon I at Fontainebleau, 31 March 1814",
        "excerpt": "Delaroche paints the conqueror of Europe slumped alone in a chair, his hat fallen to the floor, boots muddied, gaze fixed on nothing as the wheel of fortune turns against him. The empire is gone and abdication is at hand; the canvas captures the precise hour when a champion, once master of a continent, must sit in silence and confront his own fall.",
        "source": "Paul Delaroche, oil on canvas, 1840 (Musée de l'Armée, Paris)",
        "href": "https://commons.wikimedia.org/wiki/File:DelarocheNapoleon.jpg",
        "image": {
          "src": "/covers/south-korea-coach-resigns-world-cup--art.png",
          "alt": "Napoleon seated alone at Fontainebleau after his fall",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "gehry-abu-dhabi-arts-venue",
    "headline": "Frank Gehry's final design, a performing-arts centre for Abu Dhabi, is unveiled",
    "overview": "Abu Dhabi has unveiled Dar al Funoon, a sculptural performing-arts centre on Saadiyat Island designed by Frank Gehry and due to open in 2030 near his nearly finished Guggenheim Abu Dhabi. With a 2,000-seat hall and a flowing, fabric-like form, it is among the last buildings designed by the architect, who died aged 96 in December 2025.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/27/this-week-frank-gehry-arts-centre/"
      },
      {
        "name": "The National",
        "href": "https://www.thenationalnews.com/arts-culture/2026/06/25/dar-al-funoon-abu-dhabi-new-arts-venue-saadiyat-island/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/gehry-abu-dhabi-arts-venue.png",
      "alt": "A sculptural building of flowing silver-white forms beside calm water at golden hour",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sir Christopher Wren and St Paul's Cathedral",
        "excerpt": "When the medieval St Paul's burned in the Great Fire of 1666, Christopher Wren spent more than thirty-five years raising its vast domed successor, laying its last stone as an old man and living to see the whole completed. Buried beneath the cathedral he created, he was given an epitaph that needs no statue: Lector, si monumentum requiris, circumspice — Reader, if you seek his monument, look around you. It is the archetype of the architect whose final, greatest building becomes his tomb and his legacy at once.",
        "source": "\"Christopher Wren,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/biography/Christopher-Wren"
      },
      {
        "category": "historical",
        "title": "Shah Jahan's Taj Mahal",
        "excerpt": "When the Mughal emperor Shah Jahan lost his wife Mumtaz Mahal in 1631, he answered grief with stone, raising between 1631 and 1648 a vast white-marble mausoleum on the Yamuna that fused Persian, Islamic and Indian forms into a single luminous gesture. The patron's commission long outlived him: deposed and imprisoned by his own son, Shah Jahan gazed across the river at the monument he would never surpass. Today it endures as a timeless ode to love and to the idea that a building can carry a maker's name far beyond his lifetime.",
        "source": "Ministry of Culture, Government of India — \"Taj Mahal\"",
        "href": "https://culture.gov.in/taj-mahal"
      },
      {
        "category": "literary",
        "title": "Sonnet 55, by William Shakespeare",
        "excerpt": "Not marble, nor the gilded monuments\nOf princes, shall outlive this powerful rhyme;\nBut you shall shine more bright in these contents\nThan unswept stone, besmear'd with sluttish time.\nWhen wasteful war shall statues overturn,\nAnd broils root out the work of masonry,\nNor Mars his sword, nor war's quick fire shall burn\nThe living record of your memory.",
        "source": "William Shakespeare, Sonnet 55, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1041/pg1041.txt"
      },
      {
        "category": "literary",
        "title": "The Tempest, by William Shakespeare",
        "excerpt": "Our revels now are ended. These our actors,\nAs I foretold you, were all spirits, and\nAre melted into air, into thin air:\nAnd, like the baseless fabric of this vision,\nThe cloud-capp'd towers, the gorgeous palaces,\nThe solemn temples, the great globe itself,\nYea, all which it inherit, shall dissolve,\nAnd, like this insubstantial pageant faded,\nLeave not a rack behind. We are such stuff\nAs dreams are made on; and our little life\nIs rounded with a sleep.",
        "source": "William Shakespeare, The Tempest, Act IV, Scene 1 (Prospero), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/23042/23042-h/23042-h.htm"
      },
      {
        "category": "artistic",
        "title": "Requiem in D minor, K. 626, by Wolfgang Amadeus Mozart",
        "excerpt": "Mozart's last and unfinished work, a Requiem mysteriously commissioned through an anonymous intermediary, was left a torso when he died in December 1791 — the Lacrimosa breaking off after only eight bars. His pupil Sussmayr completed the score in the master's name, so that the music we revere is at once Mozart's farewell and a posthumous act of devotion. Like a great building finished after its architect is gone, it stands as a masterpiece the maker never heard whole.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor%2C_K.626_(Mozart%2C_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "The Architect's Dream, by Thomas Cole",
        "excerpt": "In Thomas Cole's 1840 canvas an architect reclines atop a colossal column, dreaming of the monuments of the ages — Egyptian pylons, Greek temples, a Roman aqueduct and a soaring Gothic cathedral — massed in golden light. The painting frames architecture itself as the grandest of human ambitions, a vision of building that outlasts every builder. It reads almost as a portrait of the master architect contemplating the legacy his structures will leave behind.",
        "source": "Thomas Cole, The Architect's Dream (1840), Toledo Museum of Art — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Cole_-_Architect%E2%80%99s_Dream_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/gehry-abu-dhabi-arts-venue--art.png",
          "alt": "Thomas Cole, The Architect's Dream (1840)",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "russia-ukraine-fortress-belt",
    "headline": "Russia presses its summer offensive against Ukraine's fortified 'fortress belt'",
    "overview": "Russian forces are grinding against Ukraine's fortified belt of towns around Kostiantynivka in the Donbas, with President Vladimir Putin vowing to press on regardless of Ukrainian peace proposals. Military analysts say Moscow's claimed advances are exaggerated and have come at heavy cost, even as Ukrainian drones strike deep inside Russia.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQUkF2Z250bW15cU9RSWYyLUllbC1XVWxRV2xPYUtSVUtaWWg0OG1NMkJFNkM1aHI3Tkp4dWxMUTZJSDR5N2VSWmlfdl9zRHN1cEFlaGdDWjFFOEdLbjlSSmJjclFaUEtKUFFMeFpJWVN3cTBtN2NyY3dRYTdydVZXRFJMVDVtcEM0YXpkV2FzT1VEV1Y5dlE?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/06/24/europe/ukraine-russia-kostyantynivka-infiltrations-intl"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/russia-ukraine-fortress-belt.png",
      "alt": "A bleak, war-ravaged plain at dusk with a ruined town on the horizon",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Battle of Verdun (1916)",
        "excerpt": "For ten months in 1916, German and French armies fed hundreds of thousands of men into the mincing-machine of Verdun's forts and shell-cratered hills. The German plan was explicitly to \"bleed France white\" by attacking ground the French could not abandon, yet the offensive bled both sides almost equally, costing some 700,000 casualties for a few kilometers of ruined earth. It became the byword for industrial attrition: a battle won by no one and survived by few.",
        "source": "Encyclopaedia Britannica, \"Battle of Verdun\"",
        "href": "https://www.britannica.com/event/Battle-of-Verdun"
      },
      {
        "category": "historical",
        "title": "The Siege of Sevastopol (1854–1855)",
        "excerpt": "For nearly eleven months Russia's fortress port on the Black Sea withstood an Anglo-French siege, its earthworks battered by hundreds of guns each day and re-dug each night by exhausted defenders. The Russians lost as many as 100,000 men holding the city, suffering thousands of casualties in single bombardments. Only when the French stormed the Malakhov redoubt in September 1855 did the garrison sink its own fleet, raze its defenses, and abandon the smoking ruin.",
        "source": "Encyclopaedia Britannica, \"Siege of Sevastopol\"",
        "href": "https://www.britannica.com/event/Siege-of-Sevastopol"
      },
      {
        "category": "literary",
        "title": "Sebastopol in December",
        "excerpt": "There you see surgeons with pale and serious countenances, their arms blood-splashed to the elbows, beside the bed of a wounded man, who, stretched on his back with open eyes, is delirious under the influence of chloroform, and utters broken phrases, some unimportant, some touching. The surgeons are busy with their repulsive but beneficent task, amputation. You see the curved and keen blade penetrate the healthy white flesh. The wounded man suddenly comes to himself with heart-rending cries, with curses. The assistant surgeon throws the arm into a corner, while another wounded man on a stretcher who sees the operation turns and groans.",
        "source": "Leo Tolstoy, Sebastopol (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/61388/61388-h/61388-h.htm"
      },
      {
        "category": "literary",
        "title": "Dulce et Decorum Est",
        "excerpt": "Bent double, like old beggars under sacks,\nKnock-kneed, coughing like hags, we cursed through sludge,\nTill on the haunting flares we turned our backs\nAnd towards our distant rest began to trudge.\nMen marched asleep. Many had lost their boots\nBut limped on, blood-shod. All went lame; all blind;\nDrunk with fatigue; deaf even to the hoots\nOf tired, outstripped Five-Nines that dropped behind.",
        "source": "Wilfred Owen, \"Dulce et Decorum Est\" (1920)",
        "href": "https://americanliterature.com/author/wilfred-owen/poem/dulce-et-decorum-est"
      },
      {
        "category": "artistic",
        "title": "Symphony No. 7 in C major, \"Leningrad\" (Op. 60)",
        "excerpt": "Over a relentless snare-drum tattoo, a banal little march repeats and swells across eleven hypnotic iterations until it becomes a deafening, mechanized juggernaut. Shostakovich wrote it in a city under siege, scoring the grinding, faceless violence of an army that advances by sheer mass. The theme does not so much triumph as crush, an unstoppable engine devouring everything in its path.",
        "source": "Dmitri Shostakovich, Symphony No. 7 (IMSLP)",
        "href": "https://imslp.org/wiki/Symphony_No.7,_Op.60_(Shostakovich,_Dmitry)"
      },
      {
        "category": "artistic",
        "title": "The Apotheosis of War",
        "excerpt": "A pyramid of bleached human skulls rises on a scorched yellow plain, picked over by carrion crows beneath an empty sky. Behind it stand the breached walls of a dead city, a ruin emptied by conquest. Vereshchagin, a Russian battle-painter, dedicated the canvas \"to all great conquerors, past, present and to come.\"",
        "source": "Vasily Vereshchagin, The Apotheosis of War (1871), Tretyakov Gallery",
        "href": "https://en.wikipedia.org/wiki/The_Apotheosis_of_War",
        "image": {
          "src": "/covers/russia-ukraine-fortress-belt--art.png",
          "alt": "Painting of a pyramid of skulls before a ruined city",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "china-export-controls-japan",
    "headline": "China places 20 Japanese firms on an export-control list and 20 more on a watch list",
    "overview": "China has added 20 Japanese companies, including units of Mitsubishi, to a list barring exports of Chinese dual-use goods to them, and put 20 others on a watch list requiring special licences. Beijing cited Japan's \"militarism\" as tensions over Taiwan continue to strain ties between the two countries.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxNZ2szTEV2dzBCd3dkeE9IVW51eDJDb1VwUHhrVUt5aExvQmVDVThqa2x3OVZzazJ5dDQwcHVUbUUxSTE2Z3plZHY1QllkbXllbEF1a3NtbFNjanM4Qy14aHNhUVFBUlQ2MDhwdk1Hc3dQZXVjMUlhUUtId0tWTTJld3djdEVldjBNb2VkaElLZEg2ck4tX0s2Ul94R2tYQm9nYjZnbGxFYVB6RWJvUS02Qnh1SlRBVE9YUFlRVHI0cWVkdm8?oc=5"
      },
      {
        "name": "Xinhua",
        "href": "https://english.news.cn/asiapacific/20260629/9a4a9dd6ec044ad4ad9a3a90e04bc8f1/c.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/china-export-controls-japan.png",
      "alt": "A container port at dusk with stacked containers and idle cranes across dark water",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Megarian Decree (432 BC)",
        "excerpt": "There were many who came forward and made their several accusations; among them the Megarians, in a long list of grievances, called special attention to the fact of their exclusion from the ports of the Athenian empire and the market of Athens, in defiance of the treaty.",
        "source": "Thucydides, History of the Peloponnesian War, Book 1.67 (Crawley translation)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1"
      },
      {
        "category": "historical",
        "title": "The Oil Embargo on Imperial Japan (1940-1941)",
        "excerpt": "To curb what Washington branded Japanese militarism in China and Indochina, the United States, Britain, China, and the Dutch progressively choked off Japan's lifelines, restricting exports of scrap iron, aviation fuel, and finally crude oil. In July 1941 Roosevelt froze Japanese assets and placed all petroleum shipments under embargo, severing Japan from roughly four-fifths of its imported oil. Tokyo cast the strangling \"ABCD encirclement\" as an act of aggression, and within months chose war over capitulation.",
        "source": "Foreign Relations of the United States, Diplomatic Papers, 1941, The Far East, Vol. IV (U.S. State Dept., Office of the Historian)",
        "href": "https://history.state.gov/historicaldocuments/frus1941v04/d629"
      },
      {
        "category": "literary",
        "title": "Aristophanes, The Acharnians (425 BC)",
        "excerpt": "But now some young drunkards go to Megara and carry off the courtesan Simaetha; the Megarians, hurt to the quick, run off in turn with two harlots of the house of Aspasia; and so for three gay women Greece is set ablaze. Then Pericles, aflame with ire on his Olympian height, let loose the lightning, caused the thunder to roll, upset Greece and passed an edict, which ran like the song, \"That the Megarians be banished both from our land and from our markets and from the sea and from the continent.\" Meanwhile the Megarians, who were beginning to die of hunger, begged the Lacedaemonians to bring about the abolition of the decree, of which those harlots were the cause.",
        "source": "Aristophanes, The Acharnians (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/3012/3012-h/3012-h.htm"
      },
      {
        "category": "literary",
        "title": "The Siege of Samaria (2 Kings 6)",
        "excerpt": "And it came to pass after this, that Benhadad king of Syria gathered all his host, and went up, and besieged Samaria. And there was a great famine in Samaria: and, behold, they besieged it, until an ass's head was sold for fourscore pieces of silver, and the fourth part of a cab of dove's dung for five pieces of silver.",
        "source": "King James Bible, 2 Kings 6:24-25 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "artistic",
        "title": "Finlandia, Op. 26 (Jean Sibelius, 1899)",
        "excerpt": "Composed as Tsarist Russia stripped away Finland's autonomy and tightened its grip over its small neighbor, Sibelius's tone poem opens with snarling, oppressive brass before swelling into a hymn of defiance and hope. The imperial authorities found its nationalist charge so dangerous that they banned its performance under its own name. It endures as the sound of a lesser power refusing to be coerced by a looming empire next door.",
        "source": "Finlandia, Op.26 (Sibelius, Jean) — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)"
      },
      {
        "category": "artistic",
        "title": "The Destruction of the Temple of Jerusalem (Francesco Hayez, 1867)",
        "excerpt": "Hayez's vast canvas freezes the moment a blockaded, starved-out city is finally overrun, its defenders scattering amid collapsing columns, smoke, and flame. The painting captures the terrible endgame of a siege: when an adversary's supplies and sanctuaries are cut off, ruin follows. It transforms the politics of strangulation into an image of total catastrophe between rival powers.",
        "source": "Gallerie dell'Accademia, Venice — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Francesco_Hayez_017.jpg",
        "image": {
          "src": "/covers/china-export-controls-japan--art.png",
          "alt": "Francesco Hayez, The Destruction of the Temple of Jerusalem",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "australia-doubles-social-media-penalty",
    "headline": "Australia doubles the maximum fine for platforms breaching its under-16 social-media ban",
    "overview": "Australia will double the maximum penalty for platforms that breach its under-16 social-media ban to about A$99 million and give its eSafety Commissioner power to demand proof of compliance. The government acted amid evidence that many children still access banned apps more than six months after the world-first law took effect.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c78yv5g74e9o"
      },
      {
        "name": "Prime Minister of Australia",
        "href": "https://www.pm.gov.au/media/stronger-powers-and-double-penalties-world-leading-social-media-law"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/australia-doubles-social-media-penalty.png",
      "alt": "A child's face lit by the glow of a smartphone screen in a darkened room",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Eighteenth Amendment to the United States Constitution (Prohibition)",
        "excerpt": "After one year from the ratification of this article the manufacture, sale, or transportation of intoxicating liquors within, the importation thereof into, or the exportation thereof from the United States and all territory subject to the jurisdiction thereof for beverage purposes is hereby prohibited.\n\nThe Congress and the several States shall have concurrent power to enforce this article by appropriate legislation.",
        "source": "U.S. Constitution, Amendment XVIII (1919), via The Avalon Project, Yale Law School",
        "href": "https://avalon.law.yale.edu/20th_century/amend_18.asp"
      },
      {
        "category": "historical",
        "title": "The Comstock Act of 1873",
        "excerpt": "Anthony Comstock, a self-appointed moral crusader turned U.S. postal inspector, won a federal law banning \"obscene, lewd or lascivious\" matter from the mails, vowing to keep the post from being used to corrupt the morals of the young. Wielding sweeping power over what Americans could read, he ran sting operations under false names and boasted of destroying 160 tons of books and prints. Yet the forbidden material kept circulating, smuggled past a regulator forever chasing a public ingenious at evading him.",
        "source": "\"Comstock Act of 1873,\" The First Amendment Encyclopedia, Middle Tennessee State University",
        "href": "https://firstamendment.mtsu.edu/article/comstock-act-of-1873/"
      },
      {
        "category": "literary",
        "title": "Plato, The Republic, Book II (trans. Benjamin Jowett)",
        "excerpt": "Then the first thing will be to establish a censorship of the writers of fiction, and let the censors receive any tale of fiction which is good, and reject the bad; and we will desire mothers and nurses to tell their children the authorised ones only. Let them fashion the mind with such tales, even more fondly than they mould the body with their hands; but most of those which are now in use must be discarded.",
        "source": "Plato, The Republic, translated by Benjamin Jowett (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1497/1497-h/1497-h.htm"
      },
      {
        "category": "literary",
        "title": "Robert Browning, \"The Pied Piper of Hamelin\"",
        "excerpt": "Out came the children running.\nAll the little boys and girls,\nWith rosy cheeks and flaxen curls,\nAnd sparkling eyes and teeth like pearls,\nTripping and skipping, ran merrily after\nThe wonderful music with shouting and laughter.",
        "source": "Robert Browning, The Pied Piper of Hamelin (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/18343/18343-h/18343-h.htm"
      },
      {
        "category": "artistic",
        "title": "Franz Schubert, \"Erlkönig,\" D.328 (Op. 1)",
        "excerpt": "Schubert sets Goethe's terror into galloping triplets: a father rides through the night clutching his son while a seductive Erlking whispers promises of games and gold into the boy's ear. The parent insists it is only the wind and mist, but the unseen, alluring voice keeps working on the child the rider cannot fully shield. By the time they reach home the boy is dead in his arms, the protector outpaced by a force he could neither see nor stop.",
        "source": "Erlkönig, D.328 (Schubert, Franz), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Erlk%C3%B6nig,_D.328_(Schubert,_Franz)"
      },
      {
        "category": "artistic",
        "title": "William Hogarth, \"Gin Lane\" (1751)",
        "excerpt": "Hogarth's engraving is a moral catastrophe in print, made to rally support for laws curbing cheap gin. A drunken mother lets her baby tumble from her arms down a stairwell while ruin spreads through the street, the corrupting new vice devouring the young and the old alike. It is the eighteenth-century image of a society pleading for the state to police an intoxicant that lawmakers struggled to contain.",
        "source": "William Hogarth, Gin Lane (1751), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Gin_Lane.jpg",
        "image": {
          "src": "/covers/australia-doubles-social-media-penalty--art.png",
          "alt": "Hogarth's 1751 engraving Gin Lane depicting urban ruin from gin",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "willison-red-team-ai-assistant",
    "headline": "AI email assistant withstands more than 6,000 attempts to trick it into leaking secrets",
    "overview": "After more than 6,000 prompt-injection attempts from over 2,000 people — and about $500 in costs — nobody managed to trick developer Fernando Irarrázaval's AI email assistant into leaking its secret credentials. Reviewing the experiment, Simon Willison says frontier models are becoming markedly harder to jailbreak, while cautioning against complacency in production systems.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Simon Willison's Weblog",
        "href": "https://simonwillison.net/2026/Jun/26/hack-my-ai-assistant/"
      },
      {
        "name": "Fernando Irarrázaval",
        "href": "https://www.fernandoi.cl/posts/hackmyclaw/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/willison-red-team-ai-assistant.png",
      "alt": "A computer monitor glowing in a dark room beside a padlock and a pair of glasses",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Dieneces at Thermopylae (480 BC)",
        "excerpt": "Nevertheless one man is said to have distinguished himself above all the rest, to wit, Dieneces the Spartan. A speech which he made before the Greeks engaged the Medes, remains on record. One of the Trachinians told him, \"Such was the number of the barbarians, that when they shot forth their arrows the sun would be darkened by their multitude.\" Dieneces, not at all frightened at these words, but making light of the Median numbers, answered \"Our Trachinian friend brings us excellent tidings. If the Medes darken the sun, we shall have our fight in the shade.\"",
        "source": "Herodotus, The History of Herodotus, Book VII (Rawlinson translation)",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7"
      },
      {
        "category": "historical",
        "title": "The Great Siege of Malta (1565)",
        "excerpt": "For nearly four months a few thousand Knights Hospitaller and Maltese held their harbour forts against an Ottoman host many times their number, enduring relentless bombardment, mine, and assault. Wave after wave broke against the battered walls of Birgu and Senglea, yet the defenders would not yield, and at last the great armada withdrew empty-handed. The defence became the most celebrated feat of arms of its century, a small bastion that swallowed an empire's effort and gave nothing back.",
        "source": "\"Siege of Malta,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/event/Siege-of-Malta-1565"
      },
      {
        "category": "literary",
        "title": "The Contest of the Bow (Homer, Odyssey, Book XXI)",
        "excerpt": "He was now the first to take the bow and arrow, so he went on to the pavement to make his trial, but he could not string the bow, for his hands were weak and unused to hard work, they therefore soon grew tired... Melanthius lit the fire, and set a seat covered with sheep skins beside it. He also brought a great ball of lard from what they had in the house, and the suitors warmed the bow and again made trial of it, but they were none of them nearly strong enough to string it.",
        "source": "Homer, The Odyssey, Book XXI (Samuel Butler translation)",
        "href": "https://www.gutenberg.org/files/1727/1727-0.txt"
      },
      {
        "category": "literary",
        "title": "Sir Galahad (Alfred Tennyson)",
        "excerpt": "My good blade carves the casques of men,\n  My tough lance thrusteth sure,\nMy strength is as the strength of ten,\n  Because my heart is pure.",
        "source": "Alfred Tennyson, 'Sir Galahad', Poems (1843), Volume 2",
        "href": "https://en.wikisource.org/wiki/Poems_(Tennyson,_1843)/Volume_2/Sir_Galahad"
      },
      {
        "category": "artistic",
        "title": "Overture to Egmont, Op. 84 (Ludwig van Beethoven)",
        "excerpt": "Beethoven's overture opens in grim, oppressive F minor, the weight of a tyrant's siege pressing down upon a defiant people. Theme after theme strains against that darkness, refusing to be crushed, until the music shatters into a blazing major-key Victory Symphony. It is the sound of resistance that holds firm under pressure and breaks through unbroken.",
        "source": "Ludwig van Beethoven, Egmont, Op. 84 (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Egmont,_Op.84_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "The Defence of Saragossa (David Wilkie, 1828)",
        "excerpt": "Amid the smoke and rubble of a besieged city, Agustina de Aragon stoops to fire the cannon her fallen comrades can no longer serve, while a friar and a volunteer press the defence beside her. Wilkie freezes the instant when ordinary defenders, outnumbered and overwhelmed, simply refuse to fall. The shattered wall becomes a stage for the unyielding will of those who guard what the enemy cannot take.",
        "source": "David Wilkie, The Defence of Saragossa (Royal Collection; Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:La_defensa_de_Zaragoza,_por_David_Wilkie.jpg",
        "image": {
          "src": "/covers/willison-red-team-ai-assistant--art.png",
          "alt": "Wilkie's painting The Defence of Saragossa",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "toyota-sales-fourth-monthly-fall",
    "headline": "Toyota's global sales fall for a fourth straight month, down 7.2% in May",
    "overview": "Toyota reported its fourth consecutive month of declining global sales in May, down 7.2% year-on-year to 834,279 vehicles, dragged by a 31.7% plunge in China and a 38.6% collapse in the Middle East amid the fallout from the Iran war. Sales rose 15.3% in India, a bright spot in one of the world's fastest-growing car markets.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0gFBVV95cUxObHN4ckJqYlpoVlZ0dHRKX2RybkZtMUloV3ZTWUlLcUlsUEIwMHVIYUczYndYRWRkZHJ4WE5fWnNxcG5wTzRJekR5OVJnei1WT0N4VTZVS2U3RTd4SVZWbkFjZXZONlFub2dnNXhHdVJxVmFTMUZ1NXVmdVdQRGRVMjFoOUxRS1h2bnJIUWRRdFZCbWpfaGNVX2ZjeE9pNHBSemhNV2xBLWVZdExyanlXMWw2dDNHbHc4QncycXlRQUpZdGRCTUtsZ2NDLXkwMk52MEE?oc=5"
      },
      {
        "name": "The Week",
        "href": "https://www.theweek.in/news/biz-tech/2026/06/29/toyota-global-sales-may-2026.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/toyota-sales-fourth-monthly-fall.png",
      "alt": "A silent automobile assembly hall at dawn with an idle production line and robotic arms",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "General Observations on the Fall of the Roman Empire in the West",
        "excerpt": "The decline of Rome was the natural and inevitable effect of immoderate greatness. Prosperity ripened the principle of decay; the causes of destruction multiplied with the extent of conquest; and, as soon as time or accident had removed the artificial supports, the stupendous fabric yielded to the pressure of its own weight. The story of its ruin is simple and obvious; and, instead of inquiring why the Roman empire was destroyed, we should rather be surprised that it had subsisted so long.",
        "source": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire (1781)",
        "href": "https://faculty.georgetown.edu/jod/texts/gibbon.fall.html"
      },
      {
        "category": "historical",
        "title": "The Fall of Babylon to Cyrus the Great",
        "excerpt": "When this happened, the Persians who were posted with this objective made their way into Babylon by the channel of the Euphrates, which had now sunk to a depth of about the middle of a man's thigh. Now if the Babylonians had known beforehand or learned what Cyrus was up to, they would have let the Persians enter the city and have destroyed them utterly.",
        "source": "Herodotus, The Histories, Book 1.191 (trans. A. D. Godley)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126:book%3D1:chapter%3D191"
      },
      {
        "category": "literary",
        "title": "Inferno, Canto VII (on Fortune)",
        "excerpt": "Ordained a general ministress and guide,\nThat she might change at times the empty treasures\nFrom race to race, from one blood to another,\nBeyond resistance of all human wisdom.\nTherefore one people triumphs, and another\nLanguishes, in pursuance of her judgment,\nWhich hidden is, as in the grass a serpent.\nYour knowledge has no counterstand against her;\nShe makes provision, judges, and pursues\nHer governance, as theirs the other gods.",
        "source": "Dante Alighieri, The Divine Comedy, trans. Henry Wadsworth Longfellow (1867)",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_7"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "And on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, Ozymandias (1818), in The Complete Poetical Works (ed. Hutchinson, 1914)",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Belshazzar, HWV 61",
        "excerpt": "Handel's oratorio stages the last night of a complacent empire: as the Babylonian king feasts in arrogant security, a disembodied hand scrawls his doom upon the wall while the Persian armies divert the river beneath his walls. The choruses swell from drunken triumph to terror, dramatizing how the mightiest power can be overturned in a single night by a rising rival.",
        "source": "George Frideric Handel, Belshazzar, HWV 61 (1744)",
        "href": "https://imslp.org/wiki/Belshazzar,_HWV_61_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "The Course of Empire: Destruction",
        "excerpt": "Thomas Cole's apocalyptic canvas shows a once-glittering metropolis at the summit of its wealth being sacked and burned, its marble splendor toppling as an enemy fleet storms the harbor under a blood-red sky. A headless colossus presides over the carnage, a stark emblem of how a civilization at the peak of prosperity carries within it the seeds of its own sudden ruin.",
        "source": "Thomas Cole, The Course of Empire: Destruction (1836), New-York Historical Society",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Destruction_1836.jpg",
        "image": {
          "src": "/covers/toyota-sales-fourth-monthly-fall--art.png",
          "alt": "Thomas Cole, The Course of Empire: Destruction (1836)",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "bangladesh-hasina-vows-return",
    "headline": "Ousted Bangladesh PM Sheikh Hasina vows to return home this year despite a death sentence",
    "overview": "Bangladesh's ousted prime minister Sheikh Hasina, 78, who has been in exile in India since a student-led uprising forced her out in August 2024, says she will return home this year despite being sentenced to death in absentia. \"I do not fear death,\" she said, casting the case against her as politically motivated.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNMmVYNnNCOGN6OWgtanBpamVETmVmd0lodlFVN215QXE5YW9sSDkxQnFpMWZMblVMc1h2YlpxOGZZNnhvVmhLYmZUek1hR21WYUpOUTVzUEdOMXdkdWwtTFBvbDdGbS1ON3FjODVqelFGXzFEWjBJMVdCS3dGSllLRExPSUJfN0pZXzhIMkhvTDF4S3ZTY3hXcUdFMDB2MjdzOEdDYXduWVhvQzhFYlE?oc=5"
      },
      {
        "name": "Dawn",
        "href": "https://www.dawn.com/news/2011401/bangladeshs-fugitive-ex-pm-sheikh-hasina-says-will-return-to-dhaka-this-year"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-29",
    "image": {
      "src": "/covers/bangladesh-hasina-vows-return.png",
      "alt": "An empty lectern and a single chair under a lone spotlight on a dark stage",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 29 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "General MacArthur's Return to the Philippines (1944)",
        "excerpt": "Driven out of the Philippines by the Japanese in 1942, General Douglas MacArthur left with a vow that became legend: \"I shall return.\" For more than two years it was an exile's pledge that many doubted he could keep, yet in October 1944 he waded ashore at Leyte to make it good, declaring that he had come back. It remains the archetype of the deposed commander who refuses to accept his removal as final and stakes everything on a homecoming.",
        "source": "\"Douglas MacArthur,\" Encyclopaedia Britannica",
        "href": "https://www.britannica.com/biography/Douglas-MacArthur"
      },
      {
        "category": "historical",
        "title": "The Restoration of Charles II and the Declaration of Breda (1660)",
        "excerpt": "After more than a decade of exile that followed his father's execution and the collapse of the royalist cause, Charles II issued the Declaration of Breda from the Netherlands, promising pardon and reconciliation, and was proclaimed lawful king. He sailed from The Hague and landed at Dover to wild acclaim, entering London on his thirtieth birthday. The deposed dynasty, written off as finished, returned in triumph, reversing the verdict of a revolution that had once seemed absolute.",
        "source": "The National Archives (UK)",
        "href": "https://www.nationalarchives.gov.uk/education/students/videos/spotlight-on/spotlight-on-charles-ii/"
      },
      {
        "category": "literary",
        "title": "The Divine Comedy, Paradiso, Canto XVII (the prophecy of exile)",
        "excerpt": "Thou shalt abandon everything beloved\nMost tenderly, and this the arrow is\nWhich first the bow of banishment shoots forth.\nThou shalt have proof how savoureth of salt\nThe bread of others, and how hard a road\nThe going down and up another's stairs.",
        "source": "Dante Alighieri, The Divine Comedy, trans. Henry Wadsworth Longfellow (1867), Wikisource",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_17"
      },
      {
        "category": "literary",
        "title": "Homer, Odyssey, Book 9",
        "excerpt": "I am Odysseus, son of Laertes, who am known among men for all manner of wiles, and my fame reaches unto heaven. But I dwell in clear-seen Ithaca, wherein is a mountain, Neriton, covered with waving forests, conspicuous from afar; and round it lie many isles hard by one another, Dulichium, and Same, and wooded Zacynthus.",
        "source": "Homer, Odyssey 9.19, trans. A. T. Murray (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book%3D9:card%3D1"
      },
      {
        "category": "artistic",
        "title": "Va, pensiero (Chorus of the Hebrew Slaves) from Verdi's Nabucco",
        "excerpt": "In Verdi's 1842 opera, the captive Hebrews, already condemned and torn from their homeland, lift their voices toward the lost country they refuse to forget, sending their thoughts on golden wings across the sea to the hills of home. The melody became an anthem of exiles and a defiant cry of a people who would not be erased. It transforms banishment and the shadow of death into an unbroken longing for return.",
        "source": "Giuseppe Verdi, Nabucco (IMSLP)",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Napoleon's Return from Elba",
        "excerpt": "Charles de Steuben's 1818 painting captures the moment at Laffrey when the exiled emperor, having slipped back onto French soil, walks bareheaded toward the soldiers sent to arrest him and bares his breast, daring them to fire. The royal troops, frozen between duty and devotion, lower their muskets and surge to his side. It is the image of a condemned man who refuses to fear death and turns his own execution party into an army of homecoming.",
        "source": "Charles de Steuben, Napoleon's Return from Elba (1818), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Retour_de_Napoleon_d'_Isle_d'Elbe,_by_Charles_de_Steuben.jpg",
        "image": {
          "src": "/covers/bangladesh-hasina-vows-return--art.png",
          "alt": "Napoleon bares his chest before soldiers on his return from Elba",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 13
  },
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
    "rank": 14
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
    "rank": 15
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
    "rank": 16
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
    "rank": 17
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
    "rank": 18
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
    "rank": 19
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
    "rank": 20
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
    "rank": 21
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
    "rank": 22
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
    "rank": 23
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
    "rank": 24
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
    "rank": 25
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
    "rank": 26
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
    "rank": 27
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
    "rank": 28
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
    "rank": 29
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
    "rank": 30
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
    "rank": 31
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
    "rank": 32
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
    "rank": 33
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
    "rank": 34
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
    "rank": 35
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
    "rank": 36
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
    "rank": 37
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
    "rank": 38
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
