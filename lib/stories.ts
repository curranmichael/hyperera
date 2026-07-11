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
// the Afternoon Edition of 11 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Morning Edition of 11 July 2026 and the Evening Edition of 10 July 2026.
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
    "slug": "bangladesh-monsoon-floods-2026",
    "headline": "Monsoon floods across Bangladesh kill at least 44 and leave more than a million people stranded",
    "overview": "Days of relentless monsoon rain triggered widespread flooding across Bangladesh on July 11, 2026, killing at least 44 people and leaving more than a million stranded as swollen rivers burst their banks. Whole communities were cut off as water swept away homes, roads and crops, and rescuers used boats to reach families marooned on rooftops and embankments. Officials warned the death toll could climb as more low-lying districts went under.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxQa1RjbW1VQ1YtSGN4bXY1MWZrZFZEQjg1eXNuRkxfTGdHaWtiZUFJSUFSNFZObW9meXFDR3A4bFFERTB2SHozZ3lpbzJJbU5aNmFaelpIaWtLSEtHUUdlNWdHbmRvNDhRWEhPS3JSemtzbUZMSUpqVzhsRHppVW5qLWRfcVhpZkQzYVY3SE43RmU3RmJYMy1TcFVQV083Tkh5S3NFQ21QeVhXVmdraEl3?oc=5"
      },
      {
        "name": "The Economic Times",
        "href": "https://news.google.com/rss/articles/CBMi2gFBVV95cUxPcHNxMzlMVXgzYkM3Ml9ET3NzTWZPSW5kYm02anc3bjhyNExBTS1wY29CMEJhTngyNlh6dEpZYmVpemh6dVpxem1lVi1ORGVwQlc1Q3RoX1pnN1kwSEIzSzdlRHBqZHp0VUk2dnkyS211ei1pTThHOVlGbDI2LTZzNllUWnJ0eXRKbVd0cXMtdjE0cVRRRVdpQzVxRFNnUGtoT0tlYUxCTHpoUTV6aTNla0g5TnhaWDBqdW9KQlUwR19OeHZ1Njl3bTNCZ1JoNjRLQUkwVjg4bWVTd9IB3wFBVV95cUxPQ1JuN1dQX0MtLUhQaXlqVXlnSmZCcnRNSk9yT09HZnN2U0d0Z3FSVDZtVDhBNEZ2R3NITHVFUHpHZXZaWWxtOFlFWmZuTERqS3JrNU1BOXdvWm82Q2Q5Y3c4WUhZeWR6d1lqbGtWeXJzTkdTVXgtQ0lYbkNHRWI0OG1lMDJzckVid09UNkxod01UWG9IRzllREl6NXRGZmw1c1huVWlvMFVBM0VNMEVLX2RZNGxBNTZGMVdfWkVQNTMxTENleThBRUExWXpLaktjN0NFNmp6bEpwbl82NDU4?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/bangladesh-monsoon-floods-2026.png",
      "alt": "An aerial view of a Bangladeshi village inundated by muddy floodwater, homes and trees surrounded by water.",
      "credit": "Airman 1st Class Cheryl Sanzi (USAF), Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The flooding of the Tiber (15 CE), recorded by the Roman historian Tacitus in his Annals, saw the rain-swollen river burst over the low-lying quarters of Rome and topple buildings, just as Bangladesh's rivers have now overrun whole communities and swept homes away.",
        "excerpt": "In the same year the Tiber, swollen by continuous rains, flooded the level portions of the city. Its subsidence was followed by a destruction of buildings and of life.",
        "source": "Tacitus, Annals, Book 1, Chapter 76, trans. Alfred John Church and William Jackson Brodribb; Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D1%3Achapter%3D76"
      },
      {
        "category": "historical",
        "title": "The Johnstown Flood (1889), chronicled that same year by Willis Fletcher Johnson, drove families into their upper stories and up the surrounding hills as the waters rose, foreshadowing the rooftop rescues now unfolding across Bangladesh.",
        "excerpt": "The Conemaugh had then gotten so high that the residents of the low-lying districts had moved into upper stories. I noticed a number of wagons filled with furniture hurrying through the streets. A few families, either apprehensive of the impending calamity or driven from their houses by the rising waters, had started for the surrounding hills.",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (Edgewood Publishing Co., 1889); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
      },
      {
        "category": "literary",
        "title": "The Flood of Noah in the Book of Genesis (chapter 7, King James Version, 1611) describes the waters rising until they covered the highest hills of the whole earth, an ancient image of total inundation mirrored in Bangladesh's drowned villages.",
        "excerpt": "And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered.",
        "source": "Genesis 7:19-20, King James Version (1611); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "The deluge of Deucalion in Ovid's Metamorphoses (Book 1, c. 8 CE, Brookes More translation) drowns the world until land and sea can no longer be told apart, echoing the endless waters now stranding more than a million Bangladeshis.",
        "excerpt": "And now one vast expanse, the land and sea were mingled in the waste of endless waves—a sea without a shore.",
        "source": "Ovid, Metamorphoses, Book 1 (the flood of Deucalion), trans. Brookes More (1922); Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=1:card=253"
      },
      {
        "category": "artistic",
        "title": "Le Deluge (1875-76), Camille Saint-Saens's oratorio on the biblical Flood, unfolds from a hushed prelude into a surging orchestral drowning of the world, a sonic counterpart to the swollen rivers now engulfing Bangladesh.",
        "excerpt": "Saint-Saens sets the biblical deluge in three parts, moving from God's wrath and the building of the ark to the receding waters and the returning dove. Its celebrated orchestral prelude, led by a solo violin over shimmering strings, builds from stillness to a full surging tide, an unmistakable musical image of waters rising to overwhelm the earth.",
        "source": "Camille Saint-Saens, Le Deluge (The Flood), oratorio, Op. 45 (1875-76), libretto by Louis Gallet; full scores at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Le_d%C3%A9luge,_Op.45_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "Une Scene de Deluge (1806) by Anne-Louis Girodet shows a family clinging to a breaking tree above the rising water, a Romantic vision of ordinary people overwhelmed by a sudden inundation that mirrors the Bangladeshi families now marooned on rooftops.",
        "excerpt": "In Girodet's vast canvas a father braces on a crumbling rock, straining to haul his wife and children upward while an aged man clutches at his back; the very branch that anchors them is already snapping. Lightning splits a black sky and a corpse drifts in the churning water below, a scene of a family engulfed by a convulsion of nature.",
        "source": "Anne-Louis Girodet de Roucy-Trioson, Une Scene de Deluge (Scene of a Deluge), oil on canvas, 1806, Musee du Louvre, Paris; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Une_Sc%C3%A8ne_de_D%C3%A9luge_Girodet.jpg",
        "image": {
          "src": "/covers/bangladesh-monsoon-floods-2026--a5.png",
          "alt": "A family clings to a breaking tree above dark rising floodwaters; a man strains to pull up a woman and two children while carrying an old man on his back, lightning splitting the storm-black sky and a body floating in the churning water below.",
          "credit": "Anne-Louis Girodet, Une Scene de Deluge, 1806, Musee du Louvre, Paris; public domain, via Wikimedia Commons."
        }
      }
    ],
    "lead": true,
    "rank": 1
  },
  {
    "slug": "typhoon-bavi-china-landfall",
    "headline": "Typhoon Bavi makes landfall in eastern China after more than a million people are evacuated",
    "overview": "Typhoon Bavi struck China's eastern coast on July 11, 2026, driving fierce winds and torrential rain ashore after authorities evacuated more than a million people from its path. It was the second typhoon to menace the region in a week, forcing the suspension of trains, flights and ferries and the closure of ports and factories. Forecasters warned of dangerous storm surges and inland flooding as Bavi pushed deeper into the country.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQUFpYaEtpZ2dWSzVtVndmRk01cTZ0aHQybGswb1c5QXd1WGtBRjIwejcwbUQ3cFJOVDV1MEpzdVQ0MGNKWWdETkVxVTRYV0ZHYVNTOEVJTktCWlQwVFJnVklJMEIwa3R0SHJDZVotNHdnRi1lbXl1dFpMcXo4eE5pV1lyeWlLWmdoeWxlX0pFRFk5QXRRMHc?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxONmhKZVUzOHhLaGZlV1JPdVp6a3NyOVpuakMwc3l3N2FPNUk4WmVvYVhUZjM1eDU1ZEJJR21rVDNYcFhvOVY2N0NLSzF5Qmxubk1PSThxeGs0dWt1TDBHUzZkUFE4QmtzcXNsZFJxY1BBSDlNNUZFcUF1MnBEczdQd3NLdEJaQzkyaFRDLUZrdzVNQVdqVVRqVy0tVFFYUFJMeGxmMWJrTENEaFpfdUR30gG0AUFVX3lxTE1RQi1nZ2F4SEdGcHJVbTBjRjdxcTFqYW9HOXNBUm8xd3V3cmZoTFJOZ2NHU2lqejd2c2lWN1FldUs2blVsa19HOUFuRUJ5OFRXU0NEa09tZEdRUGRnZDF1X1hwM1NDSXRhcEhha0RxYS1HS0JSVWhHSXczSHBHUE9JM2JsTkJGV3hoVlRwUy1vVjFuWHVLRmFzZF85RkVUbVJQanRfc0NtRUdWckZsM3hzRmRrcw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/typhoon-bavi-china-landfall.png",
      "alt": "A vast spiral of white typhoon cloud swirling over the sea off the Chinese coast, seen from space.",
      "credit": "MODIS Land Rapid Response Team, NASA GSFC, Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The tempest that wrecked Kublai Khan's invasion fleet off Japan (1281), recorded by Marco Polo in The Travels, when a great north wind hurled the Great Kaan's ships onto the rocks and drowned a host of his men — the same fury of wind and sea now driving more than a million people from China's eastern coast ahead of Typhoon Bavi.",
        "excerpt": "According to Marco Polo, the Great Kaan's vast armada against Chipangu (Japan) was undone not by any enemy but by the weather: a north wind rose with tremendous force and drove the fleet against the shore until a multitude of ships were wrecked, stranding thousands of soldiers. Medieval Japan remembered such storms as the kamikaze, or 'divine wind' — the same marriage of gale and sea that now shutters ports and coastlines before Bavi's landfall.",
        "source": "Marco Polo, The Travels of Marco Polo, trans. Henry Yule, rev. Henri Cordier (3rd ed., 1903), Book Third, Chapter III: 'What Further came of the Great Kaan's Expedition against Chipangu.'",
        "href": "https://www.gutenberg.org/files/12410/12410-h/12410-h.htm"
      },
      {
        "category": "historical",
        "title": "The Great Storm of 1703, chronicled by Daniel Defoe in The Storm (1704), when Britain's fiercest recorded tempest flung bricks and tiles through the streets and no one dared leave their crumbling homes — just as Typhoon Bavi shuts down China's coastal cities and drives residents indoors and inland.",
        "excerpt": "And yet in this general Apprehension, no body durst quit their tottering Habitations; for whatever the Danger was within doors, 'twas worse without; the Bricks, Tiles, and Stones, from the Tops of the Houses, flew with such force, and so thick in the Streets, that no one thought fit to venture out, tho' their Houses were near demolish'd within.",
        "source": "Daniel Defoe, The Storm: Or, a Collection of the most Remarkable Casualties and Disasters which happen'd in the Late Dreadful Tempest, both by Sea and Land (London, 1704).",
        "href": "https://www.gutenberg.org/files/42234/42234-h/42234-h.htm"
      },
      {
        "category": "literary",
        "title": "The storm Poseidon unleashes on Odysseus in Homer's Odyssey (Book V, c. 8th century BCE), when winds from every quarter fall on his raft at once and a monstrous sea breaks his courage — an ancient mirror of the wind and surge now battering China's coast as Typhoon Bavi makes landfall.",
        "excerpt": "Thereon he gathered his clouds together, grasped his trident, stirred it round in the sea, and roused the rage of every wind that blows till earth, sea, and sky were hidden in cloud, and night sprang forth out of the heavens. Winds from East, South, North, and West fell upon him all at the same time, and a tremendous sea got up, so that Ulysses' heart began to fail him.",
        "source": "Homer, The Odyssey, Book V, trans. Samuel Butler (1900).",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_V"
      },
      {
        "category": "literary",
        "title": "The shipwreck that opens Shakespeare's The Tempest (Act I, Scene 1, c. 1611), where a roaring sea overwhelms the mariners' skill and drives them to prayer — echoing the helpless shutdown of ports, ships and flights as Typhoon Bavi strikes eastern China.",
        "excerpt": "On a ship at sea: a tempestuous noise of thunder and lightning heard.\n\nBoats. Heigh, my hearts! cheerly, cheerly, my hearts! yare, yare! Take in the topsail. Tend to the master's whistle. Blow, till thou burst thy wind, if room enough!",
        "source": "William Shakespeare, The Tempest, Act I, Scene 1 (first printed in the First Folio, 1623).",
        "href": "https://www.gutenberg.org/cache/epub/23042/pg23042.txt"
      },
      {
        "category": "artistic",
        "title": "The 'Gewitter, Sturm' (Thunderstorm) fourth movement of Beethoven's Symphony No. 6 in F major, Op. 68 ('Pastoral,' 1808), where strings and timpani erupt into a musical cloudburst of wind and rain — the orchestral counterpart to the storm surge and torrential downpour Typhoon Bavi brings to China's coast.",
        "excerpt": "In the Pastoral Symphony's fourth movement Beethoven turns the whole orchestra into weather: distant rumblings in the low strings swell into slashing violin figures, cracks of timpani thunder and a shrieking piccolo, until the tempest exhausts itself and gives way to calm. It is one of music's most vivid depictions of a sudden violent storm — the sonic mirror of the wind and rain now lashing eastern China.",
        "source": "Ludwig van Beethoven, Symphony No. 6 in F major, Op. 68 ('Pastoral'), fourth movement 'Gewitter. Sturm' (composed 1808); full score via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky's The Ninth Wave (1850), which shows a handful of survivors clinging to wreckage as a towering, sunlit wave rears over them — a Romantic vision of the sea's overwhelming power that matches the storm surges forecasters fear as Typhoon Bavi hits eastern China.",
        "excerpt": "Aivazovsky paints the aftermath of a night storm: shipwrecked sailors cling to a broken mast on a heaving sea as the ninth wave — in sailors' lore the deadliest — rises to engulf them, its foam glowing against a sunrise. The canvas captures both the terror and the awful beauty of wind and water turned against people, the very forces now bearing down on China's flooded coast.",
        "source": "Ivan Aivazovsky, The Ninth Wave (Девятый вал), oil on canvas, 1850; State Russian Museum, Saint Petersburg.",
        "href": "https://commons.wikimedia.org/wiki/File:Hovhannes_Aivazovsky_-_The_Ninth_Wave_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/typhoon-bavi-china-landfall--a5.png",
          "alt": "Shipwrecked sailors cling to a broken mast amid enormous waves at dawn under a glowing sky",
          "credit": "Ivan Aivazovsky, The Ninth Wave, 1850, State Russian Museum, Saint Petersburg; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "nigeria-oyo-schoolchildren-freed",
    "headline": "Nigerian army frees 44 abducted schoolchildren and teachers in Oyo State",
    "overview": "Nigerian soldiers freed 44 schoolchildren and teachers who had been seized by gunmen in southwestern Oyo State, the army said on July 11, 2026, in a rescue that brought relief to anxious families. The captives were taken in a mass abduction that revived fears over Nigeria's recurring crisis of school kidnappings for ransom. The military said the hostages were recovered during a security operation.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE53YlhXTUpwM3Z2bDhibDBic0I1ZjFXWFJoTkRyOGpBOXdaNzFNSE5vTE1BdERtN3FWN3hQZ1Z0S01ESURyLTR3eFh0VDJhY21yaVBHNEdhb2FHX2Fx?oc=5"
      },
      {
        "name": "Premium Times Nigeria",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQUjhWLVlJQXVYZmxWRHhSV3hkbjVaSWVzSE5uMXdoWU85U3RTM2pxLWJCdDFPY19ma1dIWmV6dXJaZjhNNDNKQ1c0UzM0WmFfYkVyMDVQaTBsWjB2UVpMdml1QnNMTXdrWk1meGVPVDcwSS1FbnhWRzRORl91bEd5U2dkV29GbG1LdFZzZlp1MjdwYWxHak9tNjVueHRxM3hiMXYzZ0lEcEdiSDNUTTJMV1hGS2drVHR0Z3A1ZA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/nigeria-oyo-schoolchildren-freed.png",
      "alt": "Nigerian Army soldiers in camouflage advancing across scrubland during a military field exercise.",
      "credit": "USAFRICOM from Stuttgart, Germany, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Cyrus Cylinder (c. 539 BCE), inscribed in Akkadian cuneiform after Cyrus the Great captured Babylon and now held in the British Museum, records a conqueror who gathered up scattered captive peoples and sent them back to their homes, just as Nigerian soldiers gathered the 44 seized schoolchildren and teachers and returned them to their families in Oyo State.",
        "excerpt": "I gathered all their inhabitants and returned to them their dwellings.",
        "source": "The Cyrus Cylinder, line 32 (trans. Irving Finkel), Livius.org archive",
        "href": "https://www.livius.org/sources/content/cyrus-cylinder/cyrus-cylinder-translation/"
      },
      {
        "category": "historical",
        "title": "Operation Entebbe (July 3-4, 1976), the Israeli commando raid that stormed a hijacked Air France jet held at Uganda's Entebbe Airport, freed roughly 105 hostages in a 58-minute strike carried out a continent from home, just as Nigerian troops crossed hostile ground to recover 44 captives taken by gunmen in Oyo State.",
        "excerpt": "Nearly a hundred passengers had been held for days at a distant airport, their fate bargained over by their captors, when a rescue force arrived under cover of night and led them out to freedom. The raid cost the life of its assault commander, Lt. Col. Yonatan Netanyahu, and it fixed in memory the idea that a state will reach across borders to bring its captives home. The relief of the freed hostages and their waiting families echoes in the recovery of the abducted Oyo schoolchildren.",
        "source": "Jewish Virtual Library, 'The Entebbe Rescue Operation'",
        "href": "https://www.jewishvirtuallibrary.org/the-entebbe-rescue-operation"
      },
      {
        "category": "literary",
        "title": "The prophet's proclamation in Isaiah 61 (King James Version, 1611), vowing liberty to those held in bondage and the opening of the prison to the bound, sounds across the millennia in the freeing of Oyo's captive schoolchildren, answering their families' cry for deliverance.",
        "excerpt": "The Spirit of the Lord God is upon me; because the Lord hath anointed me to preach good tidings unto the meek; he hath sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to them that are bound;",
        "source": "Isaiah 61:1, King James Version (1611)",
        "href": "https://www.biblegateway.com/passage/?search=Isaiah%2061&version=KJV"
      },
      {
        "category": "literary",
        "title": "Ovid's tale of Perseus and Andromeda in the Metamorphoses (Book IV, 8 CE), in which the hero discovers a young captive chained to the sea-rock and slays the monster to loose her bonds, mirrors the deliverance of the young hostages carried off in Oyo State and set free by their rescuers.",
        "excerpt": "Released from her chains, the virgin walks along, both the reward and the cause of his labors.",
        "source": "Ovid, Metamorphoses, Book IV (trans. Henry T. Riley, 1851), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/21765/pg21765.txt"
      },
      {
        "category": "artistic",
        "title": "The Prisoners' Chorus, 'O welche Lust,' from Beethoven's only opera Fidelio (Op. 72, 1814), in which captives emerge blinking into daylight to hymn their fleeting freedom, sounds the very release felt when 44 schoolchildren and teachers were led out of captivity in Oyo State.",
        "excerpt": "O welche Lust, in freier Luft / Den Atem leicht zu heben! / Nur hier, nur hier ist Leben, / Der Kerker eine Gruft.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72, Act I Prisoners' Chorus (libretto by J. Sonnleithner & G. F. Treitschke), IMSLP",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens's 'Perseus Freeing Andromeda' (c. 1620-22, Gemaldegalerie, Berlin), which shows the winged hero unbinding a young woman from the rock as victory crowns him, gives painted form to the rescue of Oyo's captives, the chains struck away and the young returned to safety.",
        "excerpt": "Rubens paints the instant after the danger has passed: Perseus, still armored, gently loosens the cords that fastened Andromeda to the rock while a winged putto lifts them free and Fame reaches to crown him. The pale, delivered figure of the young captive stands at the center of the canvas, no longer a victim but a life restored. The scene distills the arc of every rescue, from seizure and helplessness to the moment bonds fall away.",
        "source": "Peter Paul Rubens, Perseus Freeing Andromeda, c. 1620-22, Gemaldegalerie, Berlin (Wikimedia Commons, public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_Perseus_Freeing_Andromeda_-_WGA20306.jpg",
        "image": {
          "src": "/covers/nigeria-oyo-schoolchildren-freed--a5.png",
          "alt": "Rubens painting of the winged hero Perseus unbinding Andromeda from the rock as a putto lifts her chains and a winged figure crowns him with laurel.",
          "credit": "Peter Paul Rubens, Perseus Freeing Andromeda (c. 1620-22), Gemaldegalerie, Berlin. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "nyt-air-force-one-subpoena",
    "headline": "US Justice Department subpoenas New York Times journalists over Air Force One reporting",
    "overview": "The Trump administration has subpoenaed journalists at The New York Times over their reporting about Air Force One, the newspaper said on July 11, 2026, in a step press-freedom advocates called an escalation of pressure on the media. The demand seeks information tied to coverage of the president's aircraft and drew swift condemnation from the paper, which vowed to fight it. It was the latest clash between the administration and news organizations over leaks and coverage the president has attacked.",
    "genre": "Politics",
    "sources": [
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQLUZOSkNZY1ZFRUpPZVNYZFdrRW1ZcjRRc1hGSkt3VHhJZHNWVzAySzd0TVlSQ3FreWJiQTlUZlhwUzNnZ3BrQXJTeWQ3OEpVZ3p6c3lNWEFxNHItQXpXWmtSVmU5VFJ5Mkcwb25ZU2FrTlpCUDR3VExJSlI3NUQ0R0hlOG5qOGNiUGJmY250alZuekpJT1U4Z0paeGdoNHdwVEN1Z0lWeGw?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxPekRuS3lkX1E3WFI3a2lsRVN6YmZzRE4wMEJzcHFRUXZmM0NobnVPbWt5STB1M2J2d1RnbzV6aTEwcDkzWEdEMnRteS1pRjJxWWxtRkFnX1drOGZvb0pFV003dkd4bkVtSXN6NmNrdUxvcHZjNHFNUWxCSWw0WUJYbGV4d0loZEdPWW5nRm5XamJ2NEw4d0RuYzAxckt5em1HUjFoUmduVk9YdkhrWXJBRi1rODNtcXhWZTJLY0pHTTZocWhfazR3ZG53ZTY?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/nyt-air-force-one-subpoena.png",
      "alt": "The blue-and-white Boeing VC-25A jet that serves as Air Force One.",
      "credit": "Mees Jansen, CC0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The 1735 seditious-libel trial of New York printer John Peter Zenger, in which lawyer Andrew Hamilton persuaded a jury that publishing the truth about a grasping colonial governor could be no crime, just as the New York Times insists that its Air Force One reporting is journalism the government may not punish or unmask by subpoena.",
        "excerpt": "by an impartial and uncorrupt verdict, have laid a noble foundation for securing to ourselves, our posterity, and our neighbors that to which nature and the laws of our country have given us a right—the liberty—both of exposing and opposing arbitrary power (in these parts of the world, at least) by speaking and writing truth.",
        "source": "Andrew Hamilton, summation in the trial of John Peter Zenger (1735), National Constitution Center, Historic Document Library",
        "href": "https://constitutioncenter.org/the-constitution/historic-document-library/detail/andrew-hamilton-argument-in-the-zenger-trial-1735"
      },
      {
        "category": "historical",
        "title": "New York Times Co. v. United States (1971), the Pentagon Papers ruling in which Justice Hugo Black's concurrence forbade the government from gagging this very newspaper, just as the Justice Department now turns the state's power against Times reporters to force disclosure of their Air Force One sources.",
        "excerpt": "The press was to serve the governed, not the governors. The Government's power to censor the press was abolished so that the press would remain forever free to censure the Government. The press was protected so that it could bare the secrets of government and inform the people. Only a free and unrestrained press can effectively expose deception in government.",
        "source": "Justice Hugo Black, concurring opinion, New York Times Co. v. United States, 403 U.S. 713 (1971), Legal Information Institute, Cornell Law School",
        "href": "https://www.law.cornell.edu/supremecourt/text/403/713"
      },
      {
        "category": "literary",
        "title": "John Milton's Areopagitica (1644), his thunderous address to Parliament against the licensing and pre-censorship of the printing press, just as the Times vows to fight a government demand it regards as an attempt to police and chill its reporting.",
        "excerpt": "Give me the liberty to know, to utter, and to argue freely according to conscience, above all liberties.",
        "source": "John Milton, Areopagitica; A Speech for the Liberty of Unlicensed Printing (1644), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm"
      },
      {
        "category": "literary",
        "title": "Sophocles' Antigone (c. 441 BCE), whose heroine defies King Creon's edict by invoking unwritten laws that stand above any ruler's decree, just as journalists refuse a state command they hold to violate a higher duty owed to the public.",
        "excerpt": "Yes; for it was not Zeus that had published me that edict; not such are the laws set among men by the justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven.",
        "source": "Sophocles, Antigone (trans. R. C. Jebb), The Internet Classics Archive, MIT",
        "href": "http://classics.mit.edu/Sophocles/antigone.html"
      },
      {
        "category": "artistic",
        "title": "\"Va, pensiero,\" the Chorus of the Hebrew Slaves from Giuseppe Verdi's Nabucco (1842), the exiles' yearning hymn that a subjugated people turned into an anthem of defiance against oppression, just as press-freedom advocates rally around the Times against the administration's pressure on its journalists.",
        "excerpt": "Va, pensiero, sull'ali dorate; va, ti posa sui clivi, sui colli, ove olezzano tepide e molli l'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi, Nabucco (1842), libretto by Temistocle Solera, \"Va, pensiero\" (Chorus of the Hebrew Slaves); score at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier's lithograph \"Ne vous y frottez pas!!\" (Don't Meddle With It!!, 1834), showing a muscular printer standing guard over the freedom of the press as King Louis-Philippe lunges and a deposed monarch lies fallen, just as the Times braces to defend its journalists against a government subpoena.",
        "excerpt": "A defiant young printer, sleeves rolled and fists ready, plants himself before his press as the reigning king charges at him with an umbrella and a toppled Charles X sprawls on the ground. Captioned \"Ne vous y frottez pas!!\"—Don't meddle with it!—the image casts the press not as a victim but as a fighter who will not be intimidated. Daumier, jailed two years earlier for mocking the king, made the printer an unbowed symbol of liberty resisting the reach of state power.",
        "source": "Honoré Daumier, \"Ne vous y frottez pas!!\" (1834), lithograph, National Gallery of Art, Washington (Rosenwald Collection), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Ne_vous_y_frottez_pas!!,_1834,_NGA_6131.jpg",
        "image": {
          "src": "/covers/nyt-air-force-one-subpoena--a5.png",
          "alt": "Lithograph of a muscular printer standing defiantly with fists ready before his press, while King Louis-Philippe lunges at him and the deposed Charles X lies fallen on the ground.",
          "credit": "Honoré Daumier, \"Ne vous y frottez pas!!\", 1834, lithograph. National Gallery of Art, Washington (Rosenwald Collection). Public domain (CC0), via Wikimedia Commons."
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "ro-khanna-west-bank-detained",
    "headline": "US Representative Ro Khanna says he was detained by Israeli settlers during a West Bank visit",
    "overview": "California Democrat Ro Khanna said he and a group that included journalists were detained and harassed by Israeli settlers during a visit to the occupied West Bank on July 11, 2026. Khanna said the encounter turned menacing before the group was able to leave, and he called for accountability over settler violence in the territory. Israeli police said several settlers were arrested over an attack on journalists in the area.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPemk1Y2lWN29BWVNsNWJNNzFZYVU2ZG94Zmt3R1VyWmVjLVBnOHdEdVFudE1sOGotX0NpTXMyUWhpN2xub2cxUDhXdmhRUURUczNPSmR4RGJPU2xjeDU5V2sxcW5MYWNfaG1ET3VXdGZiUnNnbkFDcW90Z0k5LURYWGgzeVgzNm9ESXVjOGxER3BxVXMyclRZc3dBZHVjU2xQdmxteTlzQ2hCZjhmMTYyZ1BjRm1yVUpOSkE?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://news.google.com/rss/articles/CBMidEFVX3lxTE9hcUFhaWtmRzBwVHRvakdtcjYtNjRzTTlnc2RpUm9kNTJPcnB1WEZFYlh5Tk1kaGd6ZGhrbm41c0YwRnVVLWhNekJkTkhhQjE4cFNXcS0wWWJQbFFnYnN6UHlqNUdiNjlmcWN5S0pMcGZQWnRv?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/ro-khanna-west-bank-detained.png",
      "alt": "Two Israeli settlements of pale, red-roofed houses spread across arid hilltops in the occupied West Bank.",
      "credit": "upyernoz from Haverford, USA, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Persian heralds hurled into the pit and the well, recorded by Herodotus in the Histories (Book 7.133, c. 440 BCE): envoys who crossed into hostile country to demand submission were themselves seized and abused by the locals who received them, just as Rep. Ro Khanna's traveling delegation was surrounded and detained by armed settlers on the roads of the occupied West Bank.",
        "excerpt": "King Xerxes had sent no heralds either to Athens or Sparta to ask earth and water, for a reason which I will now relate. When Darius some time before sent messengers for the same purpose, they were thrown, at Athens, into the pit of punishment, at Sparta into a well, and bidden to take therefrom earth and water for themselves, and carry it to their king.",
        "source": "Herodotus, The Histories, Book 7 (Polymnia), ch. 133, trans. George Rawlinson",
        "href": "https://www.parstimes.com/history/herodotus/persian_wars/polymnia.html"
      },
      {
        "category": "historical",
        "title": "The Trent Affair (November 1861), told in Captain Charles Wilkes's own report to Secretary Gideon Welles: travelers moving under a neutral flag were stopped, boarded, and hauled off as prisoners by an armed party that judged the seizure its 'duty,' just as Rep. Ro Khanna and accompanying journalists were stopped and detained by armed settlers who took the road into their own hands.",
        "excerpt": "I have pointed out sufficient reasons to show you that my action in this case was derived from a firm conviction that it became my duty to make these parties prisoners, and to bring them to the United States.",
        "source": "Capt. Charles Wilkes to Sec. Gideon Welles, report on the seizure of Confederate commissioners Mason and Slidell, Nov. 1861 (The Rebellion Record, vol. III), House Divided Project, Dickinson College",
        "href": "https://hd.housedivided.dickinson.edu/index.php/node/38230"
      },
      {
        "category": "literary",
        "title": "The Parable of the Good Samaritan (Gospel of Luke 10:30-34, King James Version): a lone traveler on the Jerusalem-to-Jericho road is set upon, stripped, and left half-dead while others pass by on the far side, the ancient archetype of the wayfarer waylaid, echoed as Rep. Ro Khanna's party was menaced and stopped on a West Bank road.",
        "excerpt": "A certain man went down from Jerusalem to Jericho, and fell among thieves, which stripped him of his raiment, and wounded him, and departed, leaving him half dead. And by chance there came down a certain priest that way: and when he saw him, he passed by on the other side. And likewise a Levite, when he was at the place, came and looked on him, and passed by on the other side. But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him, And went to him, and bound up his wounds, pouring in oil and wine, and set him on his own beast, and brought him to an inn, and took care of him.",
        "source": "The Gospel According to St. Luke 10:30-34, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "literary",
        "title": "Naboth's Vineyard (1 Kings 21:1-4, King James Version): a man's refusal to surrender his inherited land beside a powerful neighbor's house sets in motion his ruin and the seizure of his ground, scripture's parable of contested and coveted land, mirrored in the settler-versus-resident struggle over the West Bank soil Rep. Ro Khanna came to witness.",
        "excerpt": "And it came to pass after these things, that Naboth the Jezreelite had a vineyard, which was in Jezreel, hard by the palace of Ahab king of Samaria. And Ahab spake unto Naboth, saying, Give me thy vineyard, that I may have it for a garden of herbs, because it is near unto my house: and I will give thee for it a better vineyard than it; or, if it seem good to thee, I will give thee the worth of it in money. And Naboth said to Ahab, The Lord forbid it me, that I should give the inheritance of my fathers unto thee. And Ahab came into his house heavy and displeased because of the word which Naboth the Jezreelite had spoken to him: for he had said, I will not give thee the inheritance of my fathers.",
        "source": "The First Book of the Kings 21:1-4, King James Version",
        "href": "https://www.biblegateway.com/passage/?search=1%20Kings%2021%3A1-16&version=KJV"
      },
      {
        "category": "artistic",
        "title": "'Va, pensiero' (Chorus of the Hebrew Slaves) from Giuseppe Verdi's opera Nabucco (1842, libretto by Temistocle Solera): captives held on foreign soil send their thoughts flying home to a lost and contested homeland, a lament for banishment and disputed land that resonates with Rep. Ro Khanna's account of being detained amid the West Bank's bitter struggle over territory.",
        "excerpt": "Va, pensiero, sull'ali dorate;\nva, ti posa sui clivi, sui colli,\nove olezzano tepide e molli\nl'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi, Nabucco (1842), Part III, 'Va, pensiero, sull'ali dorate'; libretto by Temistocle Solera",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "'The Good Samaritan (after Delacroix)' by Vincent van Gogh (1890, Kroller-Muller Museum): in swirling blues and golds a rescuer hoists a robbed, wounded traveler onto his horse on a lonely road while indifferent figures recede into the distance, a canvas of the wayfarer waylaid that mirrors Rep. Ro Khanna's account of a traveler menaced and detained on a West Bank road.",
        "excerpt": "In turbulent, spiraling brushstrokes van Gogh shows a robbed and beaten traveler being lifted onto a horse by his rescuer on an empty mountain road, the victim's scattered belongings strewn across the ground as two indifferent figures walk away. Painted at the asylum in Saint-Remy after a composition by Delacroix, the scene distills the peril of the lone traveler set upon in a hostile place, the same vulnerability Rep. Ro Khanna described on the roads of the occupied West Bank.",
        "source": "Vincent van Gogh, 'The Good Samaritan (after Delacroix),' 1890, oil on canvas, Kroller-Muller Museum, Otterlo",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_Good_Samaritan,_1890_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ro-khanna-west-bank-detained--a5.png",
          "alt": "Van Gogh's The Good Samaritan (1890): a rescuer lifts a wounded, robbed traveler onto a horse on a mountain road, rendered in swirling blue and gold brushstrokes.",
          "credit": "Vincent van Gogh, The Good Samaritan (after Delacroix), 1890, Kroller-Muller Museum, Otterlo. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "malaysia-johor-election-barisan",
    "headline": "Malaysia's Barisan Nasional sweeps the Johor state election, setting back PM Anwar's coalition",
    "overview": "The Barisan Nasional coalition swept to a commanding win in Malaysia's Johor state election on July 11, 2026, taking the large majority of seats and dealing a setback to Prime Minister Anwar Ibrahim's Pakatan Harapan alliance. Unofficial tallies showed Barisan Nasional capturing 48 of the state's 56 seats, underscoring strains within the national unity government. The result was read as a test of Anwar's standing in a populous southern state bordering Singapore.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxNdlJSUjdlUjFQTUdMMDNGOWR4aXA5cVlhWVBtSmdSTzFiaHhhdFFabnVlWXdUd25JdTNQb3NWcW1ndVRIS0JlSmRYUUNsMHpJRmtQQU50cTdvVV95SVpjcE05cjU1UEcxMDZ2YXU4T09zZklXMTdIRVpRWC1HcHlUR1FtNG9maWVaQjFNMU5LQk5YMDBRSmtpZWFMbkpVYThULS1HUDhXYmt4eS1yZmlXSGF6ZHBobTA3?oc=5"
      },
      {
        "name": "CNA",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxNN2lDYlF4UkVMWnctRWpvME1yZ1lZX29rcWR1c0R1NzdvdzNrNWZ6VmZSRWZGelVRaHBTak9DRjZDNEFrSWFBX3FBSk9mTDNOdWJlRFNVUTlUWFBVS28xUXpRaXRfY1FjWXJYNDlVWlFJcWUtUXlmZVl2eC0tdkJ3WVIyNnBORzNPdVUzRzd4bk5vaWJX?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/malaysia-johor-election-barisan.png",
      "alt": "A hand dropping a folded paper ballot into a sealed ballot box at a polling station.",
      "credit": "W.carter, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The ostracism of Aristides 'the Just' (c. 482 BCE), recorded by Plutarch in his Life of Aristides, shows an Athenian public abruptly banishing a trusted leader out of sheer weariness with him, just as Johor's voters swept aside Anwar's Pakatan Harapan and restored the old Barisan Nasional to power.",
        "excerpt": "An illiterate clownish fellow, giving Aristides his sherd, supposing him a common citizen, begged him to write Aristides upon it; and he being surprised and asking if Aristides had ever done him any injury, 'None at all,' said he, 'neither know I the man; but I am tired of hearing him everywhere called the just.'",
        "source": "Plutarch, Life of Aristides, ch. 7 (Dryden translation), The Internet Classics Archive (MIT)",
        "href": "http://classics.mit.edu/Plutarch/aristide.html"
      },
      {
        "category": "historical",
        "title": "The Restoration of Charles II (29 May 1660), described by eyewitness John Evelyn in his diary, captures a nation swinging jubilantly back to a monarchy it had overthrown, just as Johor's electorate returned the long-dominant Barisan Nasional to power at Anwar's expense.",
        "excerpt": "29th May, 1660. This day, his Majesty, Charles II. came to London, after a sad and long exile and calamitous suffering both of the King and Church, being seventeen years. This was also his birthday, and with a triumph of above 20,000 horse and foot, brandishing their swords, and shouting with inexpressible joy; the ways strewn with flowers, the bells ringing, the streets hung with tapestry, fountains running with wine; the Mayor, Aldermen, and all the companies, in their liveries, chains of gold, and banners; Lords and Nobles, clad in cloth of silver, gold, and velvet; the windows and balconies, all set with ladies; trumpets, music, and myriads of people flocking, even so far as from Rochester, so as they were seven hours in passing the city, even from two in the afternoon till nine at night. I stood in the Strand and beheld it, and blessed God. And all this was done without one drop of blood shed, and by that very army which rebelled against him: but it was the Lord's doing, for such a restoration was never mentioned in any history, ancient or modern, since the return of the Jews from their Babylonish captivity; nor so joyful a day and so bright ever seen in this nation, this happening when to expect or effect it was past all human policy.",
        "source": "John Evelyn, The Diary of John Evelyn (Vol. 1), entry for 29 May 1660 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/41218/41218-h/41218-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare's Coriolanus (c. 1608), in which the plebeians grant and then revoke their 'voices,' anatomizes the fickle, many-headed crowd whose judgment scatters to every point of the compass, just as Johor's voters withdrew their favour from Anwar's coalition and handed the day to Barisan Nasional.",
        "excerpt": "We have been called so of many; not that our heads are some brown, some black, some auburn, some bald, but that our wits are so diversely coloured: and truly I think if all our wits were to issue out of one skull, they would fly east, west, north, south, and their consent of one direct way should be at once to all the points o' the compass.",
        "source": "William Shakespeare, Coriolanus, Act 2, Scene 3 (Third Citizen), The Complete Works of William Shakespeare (MIT)",
        "href": "http://shakespeare.mit.edu/coriolanus/coriolanus.2.3.html"
      },
      {
        "category": "literary",
        "title": "Boethius's Consolation of Philosophy (c. 524 CE), in which Lady Fortune defends her ever-turning wheel and delights to bring the high low, gives voice to the caprice that topples the mighty, just as the wheel turned on Anwar's Pakatan Harapan and lifted Barisan Nasional back to power in Johor.",
        "excerpt": "This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it.",
        "source": "Boethius, The Consolation of Philosophy, Book II, Prose 2 (trans. H. R. James, 1897), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/14328/14328-h/14328-h.htm"
      },
      {
        "category": "artistic",
        "title": "'Fortuna desperata' (c. 1470s), a Renaissance chanson on 'desperate, unjust and accursed' Fortune long attributed to Antoine Busnois, sings of a fate that casts down whatever it once raised, just as fortune's wheel turned against Anwar's coalition in the Johor result.",
        "excerpt": "One of the most widely reworked songs of the fifteenth century, this three-voice chanson laments 'Fortuna desperata, iniqua e maledecta'—desperate, unjust and accursed Fortune—who lifts men high only to hurl them down. Its melody became a musical emblem of fate's indifference to the powerful, borrowed by Josquin, Isaac, Senfl and dozens of other composers. That brooding lament over reversed fortune mirrors the sudden turn that stripped Anwar's Pakatan Harapan of its Johor stronghold.",
        "source": "'Fortuna desperata' (attrib. Antoine Busnois), c. 1470s, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Fortuna_desperata_(Busnois,_Antoine)"
      },
      {
        "category": "artistic",
        "title": "The Rota Fortunae (Wheel of Fortune) illumination from the Codex Buranus (c. 1230), which crowns one king at its summit even as another tumbles crownless from it, is the medieval emblem of political rise and fall, just as Johor's ballot spun Anwar's coalition down and Barisan Nasional back up.",
        "excerpt": "At the hub sits crowned Fortune turning her wheel, ringed by four kings whose Latin mottoes trace the arc of power: 'Regnabo' (I shall reign) as one climbs, 'Regno' (I reign) enthroned at the summit, 'Regnavi' (I have reigned) as a third topples, and 'Sum sine regno' (I am without a kingdom) at the bottom. The image distils the whole cycle of political ascent and collapse into a single revolution of the wheel.",
        "source": "Rota Fortunae, Codex Buranus (Carmina Burana), c. 1230, Bayerische Staatsbibliothek, Munich (Clm 4660, fol. 1r), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:CarminaBurana_wheel.jpg",
        "image": {
          "src": "/covers/malaysia-johor-election-barisan--a5.png",
          "alt": "Medieval manuscript illumination of the Wheel of Fortune: crowned Fortune at the center turns a wheel bearing four kings who rise to and fall from the top.",
          "credit": "Codex Buranus (Carmina Burana), c. 1230, Bayerische Staatsbibliothek Munich (Clm 4660, fol. 1r). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "havana-syndrome-first-payments",
    "headline": "US makes first payments to 'Havana Syndrome' victims, totaling nearly $3 million",
    "overview": "The United States issued its first compensation payments to victims of 'Havana Syndrome,' disbursing nearly $3 million to personnel afflicted by the mysterious cluster of ailments, officials said on July 11, 2026. The payments, made under a law authorizing support for those with the brain injuries, mark a milestone after years in which diplomats and spies reported headaches, dizziness and cognitive problems. The cause of the syndrome, first reported in Havana, remains officially unexplained.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiXEFVX3lxTE9heS11Qm9INGNSRi05THIzclRtaHc3bG9zS1pid2hUMEk1Yjh3UUNQR2t6dmVFZXBkYnNvSVpRZngzZUJtR29zV1dzZVBTV3pXd2JKb0tIUkZieUVq?oc=5"
      },
      {
        "name": "The Defense Post",
        "href": "https://news.google.com/rss/articles/CBMid0FVX3lxTE0yZUROdVRSWklkU2RNQXh1Sno3Y1QxSjVZRFd6R3JqN1pPelBSLVI1THN3UC1CWElkbndnUFF2bXlrSS13TmpFWVRrV3kycXJuclF5aVpCdkw1NWh6M2RKOW9KdmRuMXc3cS16dWFxM2p1eE1YR2FB0gF3QVVfeXFMTTJlRE51VFJaSWRTZE1BeHVKejdjVDFKNVlEV3pHcmo3Wk96UFItUjVMc3dQLUJYSWRud2dQUXZteWtJLXdOakVZVGtXeTJxcm5yUXlpWkJ2TDU1aHozZEo5b0p2ZG4xdzdxLXp1YXEzanV4TVhHYUE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/havana-syndrome-first-payments.png",
      "alt": "A black-and-white sagittal MRI scan showing a human brain in profile inside the skull.",
      "credit": "Raymond F Sekula Jr, Peter J Jannetta, Kenneth F Casey, Edward M Marchan, L Kathleen Sekula and Christine S McCrady, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Plague of Athens (430 BCE), recorded by the historian Thucydides in his History of the Peloponnesian War, struck down a whole population with a malady that baffled every physician and defied all explanation of its origin — just as the cause of 'Havana Syndrome' remains officially unknown even as its stricken victims are finally compensated.",
        "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it... the body was not very hot to the touch, nor pale in its appearance, but reddish, livid, and breaking out into small pustules and ulcers.",
        "source": "Thucydides, History of the Peloponnesian War, Book 2.47-49 (Crawley translation), Wikisource",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "The English 'sweating sickness' (1485-1551), chronicled by the physician John Caius in A Boke or Counseill Against the Disease Commonly Called the Sweate (1552), was a sudden invisible affliction that killed within hours and whose cause has never been identified to this day — mirroring the way 'Havana Syndrome' strikes without warning and remains medically unexplained.",
        "excerpt": "immediatly killed some in opening theire windowes, some in plaieng with children in their strete dores, some in one hour, many in two it destroyed... As it founde them so it toke them, some in sleape some in wake, some in mirthe some in care, some fasting & some ful.",
        "source": "John Caius, A Boke or Counseill Against the Disease Commonly Called the Sweate, or Sweatyng Sicknesse (1552), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/33503/33503-h/33503-h.htm"
      },
      {
        "category": "literary",
        "title": "Sophocles' Oedipus the King (c. 429 BCE) opens as the Priest of Zeus begs the king to lift a mysterious pestilence blighting the crops, the herds, and the bodies of Thebes with no visible source — just as the unexplained cluster of ailments known as 'Havana Syndrome' has quietly struck down US personnel from an origin no one can name.",
        "excerpt": "For the city, as thou thyself seest, is now too sorely vexed, and can no more lift her head from beneath the angry waves of death; a blight is on her in the fruitful blossoms of the land, in the herds among the pastures, in the barren pangs of women; and withal the flaming god, the malign plague, hath swooped on us, and ravages the town; by whom the house of Cadmus is made waste, but dark Hades rich in groans and tears.",
        "source": "Sophocles, Oedipus the King, trans. Richard C. Jebb (1917), Wikisource",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Sophocles_(Jebb_1917)/Oedipus_the_King"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe's 'The Masque of the Red Death' (1842) imagines a pestilence that seizes its victims with sharp pains and sudden dizziness before dissolving them within the hour — an eerie mirror of the headaches, dizziness, and cognitive fog that came to define 'Havana Syndrome.'",
        "excerpt": "The \"Red Death\" had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal—the redness and the horror of blood... There were sharp pains, and sudden dizziness, and then profuse bleeding at the pores, with dissolution.",
        "source": "Edgar Allan Poe, The Masque of the Red Death (1842), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm"
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saens' symphonic poem Danse Macabre, Op. 40 (1874), conjures Death as a solo violinist summoning the dead to dance until the cock crows at dawn — a musical vision of an unseen force that strikes indiscriminately, like the invisible malady behind 'Havana Syndrome.'",
        "excerpt": "In this 1874 tone poem Death tunes a spectral violin at midnight and leads skeletons in a whirling dance, the rattle of dry bones evoked by a xylophone before the music scatters at daybreak. The affliction arrives from nowhere, touches everyone in its reach, and vanishes without leaving its cause behind - an apt echo of a mysterious ailment whose source no investigation has pinned down.",
        "source": "Camille Saint-Saens, Danse macabre, Op. 40 (1874), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
      },
      {
        "category": "artistic",
        "title": "Arnold Boecklin's The Plague (Die Pest, 1898) depicts Death astride a winged dragon sweeping unseen down a medieval street, felling townspeople as it passes — a haunting image of an invisible affliction that mirrors the unexplained cluster of ailments now called 'Havana Syndrome.'",
        "excerpt": "Boecklin's tempera panel shows a skeletal figure of Death riding a bat-winged beast low through a narrow town, scattering the living as it goes; the victims collapse in the foreground while the source of their ruin hovers just above them, seen yet unstoppable. Painted as Europe still feared unseen contagion, it captures the terror of a malady that arrives from the air itself - much as 'Havana Syndrome' has struck without any identifiable cause.",
        "source": "Arnold Boecklin, Die Pest (The Plague), 1898, Kunstmuseum Basel - via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/havana-syndrome-first-payments--a5.png",
          "alt": "Arnold Boecklin's 1898 painting 'The Plague': a skeletal Death rides a winged dragon down a medieval street, felling townspeople as it passes.",
          "credit": "Arnold Boecklin, Die Pest (1898), tempera on fir wood, Kunstmuseum Basel. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "meta-teen-addiction-verdict-appeal",
    "headline": "Meta appeals landmark jury verdict that found it liable for teen social-media addiction",
    "overview": "Meta has appealed a landmark jury verdict that found the company partly to blame for social-media addiction among young users, it said on July 11, 2026. The verdict, one of the first of its kind, held that Meta's platforms were designed in ways that harmed minors and opened the door to further liability claims. Meta argued the decision was wrongly decided and vowed to challenge it, as scrutiny of social media's effect on children intensifies.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNT2UwWExOZ3pyRVhrMUF3a1lsU3ZLOV9aOUdtdWpjLThKSmFMTGJxXzM3VlhsV0NSTlhlVlRNY3RHVjVJcUN2THlKZ2ZQdkU4WnNBWFBVWnA3ekJ4ekFoTVBuTVdOZlVwaVE5XzBCdEQyMVd1LS0xcG0xN0NOc2lJU3hEZ3VRMW1JX0pfa2hPcHB0Z0dMYlR2c2ZKbEI0T0ZRdEtzMQ?oc=5"
      },
      {
        "name": "Newser",
        "href": "https://news.google.com/rss/articles/CBMi_gFBVV95cUxOM25nd1l3RENyS1VSNkIwc20tZ3ZHV1ZWVjZjTWc4c0JxUkcxLVEzV2xGMjBKMXV3aDNxbkcyekltYjVHUG4tV1pOZjl4aDlvZThBRWM2WTNGcXZHVmFhRFdqa1dhVVlOV2NIcndfUmdEWFBwZU9wbkszMWFyREo5ZXloaFc5SEo0cnZhZ3RFemptc05oVWhueHRmaWdocFR3dGQ3UTJlVDV5Z05WWXlGMUoxaGZVRjc0dndJLVBRbmVIOUtWcXpUQi1YYW9KQzhrMTFkWWZfLTBhaUhoTXh4MFFoekUwUndwSVVqYTJpTjJGZ1V3bjJwZjV0R28tdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/meta-teen-addiction-verdict-appeal.png",
      "alt": "A hand holding a smartphone with its screen glowing in a dim room.",
      "credit": "Mictlancihuatl, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Commissioner Lin Zexu's Letter of Advice to Queen Victoria (1839), an appeal against the British opium trade in China, mirrors the Meta verdict just as Lin denounced foreign merchants who grew rich pushing an addictive drug on a people they would not touch themselves, so a jury has now faulted a maker for designing a product that ensnares the young while the makers guard their own children from it.",
        "excerpt": "Writing on behalf of the Qing court on the eve of the First Opium War, Lin Zexu confronts the sellers of an addictive poison who reap profit abroad while inflicting ruin they would never accept at home. He asks by what right foreigners may injure the Chinese people with a drug forbidden in their own lands, and warns that those who profit themselves while disregarding harm to others are tolerated by neither heaven nor humankind.",
        "source": "Lin Zexu, Letter of Advice to Queen Victoria (1839), Harvard University archive of primary sources on the opium trade",
        "href": "https://cyber.harvard.edu/ChinaDragon/lin_xexu.html"
      },
      {
        "category": "historical",
        "title": "The Tobacco Master Settlement Agreement (November 1998), struck between 46 state attorneys general and America's largest cigarette makers, mirrors the Meta verdict just as that landmark reckoning held an industry answerable for a compulsively addictive product and barred it from targeting the young, so today a jury has held a social-media maker liable for a design built to hook minors.",
        "excerpt": "The 1998 accord forced seven tobacco companies to pay states an estimated $206 billion, to bankroll anti-smoking campaigns, and to release long-hidden industry documents. Crucially, it prohibited the direct or indirect targeting of youth in advertising and promotion and banned the cartoons, sponsorships, and giveaways that lured minors, treating a firm's cultivation of young users as itself a harm the law would punish.",
        "source": "California Attorney General, 1998 Tobacco Master Settlement Agreement (official state archive)",
        "href": "https://oag.ca.gov/tobacco/msa"
      },
      {
        "category": "literary",
        "title": "The Lotus-Eaters in Homer's Odyssey, Book IX (Samuel Butler translation, 1900), where a sweet fruit erases all desire to go home, mirrors the Meta case just as Odysseus must drag his craving crewmen back to the ship, so a jury weighed a design engineered to keep the young endlessly consuming and forgetful of the world beyond the feed.",
        "excerpt": "They started at once, and went about among the Lotus-eaters, who did them no hurt, but gave them to eat of the lotus, which was so delicious that those who ate of it left off caring about home, and did not even want to go back and say what had happened to them, but were for staying and munching lotus with the Lotus-eaters without thinking further of their return",
        "source": "Homer, The Odyssey, Book IX, trans. Samuel Butler (1900), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Odyssey_(Butler)/Book_IX"
      },
      {
        "category": "literary",
        "title": "The temptation in the Garden, Genesis chapter 3 (King James Version, 1611), where a fruit \"pleasant to the eyes\" and promising to \"make one wise\" is offered by a subtle serpent, mirrors the Meta case just as the allure is engineered to overpower restraint, so a jury judged a platform crafted to be irresistibly desirable to the young.",
        "excerpt": "Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden? And the woman said unto the serpent, We may eat of the fruit of the trees of the garden: But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die. And the serpent said unto the woman, Ye shall not surely die: For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil. And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.",
        "source": "Genesis 3:1-6, King James Version (1611), eBible.org",
        "href": "https://ebible.org/kjv/GEN03.htm"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner's opera Tannhauser, WWV 70 (Dresden version 1845), whose Venusberg music conjures an enchanted realm of endless sensual pleasure that holds its captive in thrall, mirrors the Meta case just as the knight cannot free himself from the goddess's seductive grotto, so a jury confronted a platform designed to keep young minds compulsively enthralled.",
        "excerpt": "In the Venusberg and its Bacchanale that open the opera, Wagner's surging, chromatic orchestral writing embodies a paradise of intoxicating delight from which the hero Tannhauser struggles in vain to escape. The music makes audible a seductive compulsion, beautiful and engulfing, that dissolves the will to leave, a fitting emblem for an alluring design that ensnares the young.",
        "source": "Richard Wagner, Tannhauser, WWV 70 (1845), full scores at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Tannh%C3%A4user,_WWV_70_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "John William Waterhouse's \"Circe Offering the Cup to Odysseus\" (1891), in which the enchantress holds out a beautiful goblet of potion that will transform the men who drink it, mirrors the Meta case just as Circe's alluring cup masks its power to reduce its victims to swine, so a jury judged a seductive product designed to captivate and diminish the young who consume it.",
        "excerpt": "Waterhouse depicts Circe enthroned, extending a raised cup with imperious allure while behind her a mirror reflects the approaching Odysseus. The painting distills the theme of the enchanting draught: a thing of beauty offered as pleasure that is in truth a snare, transforming those who accept it. It stands as a haunting image of seductive compulsion and the maker who dispenses it.",
        "source": "John William Waterhouse, Circe Offering the Cup to Odysseus (1891), Gallery Oldham; via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Circe_Offering_the_Cup_to_Odysseus.jpg",
        "image": {
          "src": "/covers/meta-teen-addiction-verdict-appeal--a5.png",
          "alt": "Painting of the enchantress Circe seated on a throne, holding out a cup of potion, with Odysseus reflected in a mirror behind her",
          "credit": "John William Waterhouse, Circe Offering the Cup to Odysseus (1891), Gallery Oldham. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "nyc-subscription-traps-ban",
    "headline": "New York City announces 'click-to-cancel' rules to ban subscription traps and junk fees",
    "overview": "New York City unveiled first-of-their-kind consumer-protection rules on July 11, 2026 that would ban 'subscription traps' and require companies to make canceling a service as easy as signing up. Mayor Zohran Mamdani's administration said the 'click-to-cancel' measures also target hidden junk fees that lock consumers into recurring charges. The rules follow a broader push by regulators against deceptive 'dark pattern' designs that make subscriptions hard to escape.",
    "genre": "Technology",
    "sources": [
      {
        "name": "The Straits Times",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxPV1pjLUFZdlhTYXFhNkMtNUpPRGpOeVg5eDNzUHQ3eVZQUGw2ei1tSlFhQWh0OTByUy1PVjkzbFBqY0NkOGVUV2VVbTl1em1ZVngyb0tPNVQxTEpSaDhxZjdfdUZLbkJ1Y012dnhLV1hBWGRBN3o5ZC13Y2tTbE5BNUdMS2EtTFJqT2RCUlp3aEhuYWlvV1Z0bUU3ZW1zeDU5TWRfQk1fRGZsSDYyZHNiMm9qdTRDTWp4Z2o0?oc=5"
      },
      {
        "name": "NYC.gov",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxNYUJFZ2NLalYyaF95MXFpRFVvTGdWOTc1cVZiQjByR0J6TnFocV84YzNKN2tQbUd0X2Y1NkZIMGFXWlp5b09ST3dXSTVpa3I0NFJTTnBCWXNfUHo2RUlreFNLMVhXWFY1REV1VjVZNldpZ0dwMHdxQWxPQlQ0ZTlVSk9YRUFoXzRaSkUtRTZ0UGVZdmR5THo2LVZjRmxBNDZmRUU5NnJJdjRNR0N1WldmVg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/nyc-subscription-traps-ban.png",
      "alt": "A hand holding a smartphone whose screen is filled with a grid of app icons.",
      "credit": "Elexfedi, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plutarch's 'Life of Solon' (c. 100 CE) records the seisachtheia of 594 BCE, in which Solon cancelled crushing debts and forbade lending on a borrower's own body, the original 'shaking off of burdens' that freed Athenians ensnared into bondage, just as New York's click-to-cancel rule frees consumers snared by services they cannot escape.",
        "excerpt": "For the first of his public measures was an enactment that existing debts should be remitted, and that in future no one should lend money on the person of a borrower.",
        "source": "Plutarch, Life of Solon 15 (Bernadotte Perrin translation), Perseus Digital Library, Tufts University",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0063:chapter=15"
      },
      {
        "category": "historical",
        "title": "The Truth in Lending Act (1968), codified at 15 U.S.C. 1601, demanded 'meaningful disclosure of credit terms' so borrowers could no longer be trapped by hidden costs, a twentieth-century consumer-protection landmark that, like New York's ban on hidden junk fees, drags the fine print into the light.",
        "excerpt": "It is the purpose of this subchapter to assure a meaningful disclosure of credit terms so that the consumer will be able to compare more readily the various credit terms available to him and avoid the uninformed use of credit, and to protect the consumer against inaccurate and unfair credit billing and credit card practices.",
        "source": "Truth in Lending Act, 15 U.S.C. Section 1601(a), Legal Information Institute, Cornell Law School",
        "href": "https://www.law.cornell.edu/uscode/text/15/1601"
      },
      {
        "category": "literary",
        "title": "Psalm 124 in the King James Bible (1611) cries that the soul is 'escaped as a bird out of the snare of the fowlers,' the ancient image of the sprung trap that New York's rule now enacts for consumers caught in a subscription they cannot cancel.",
        "excerpt": "Blessed be the LORD, who hath not given us as a prey to their teeth. Our soul is escaped as a bird out of the snare of the fowlers: the snare is broken, and we are escaped. Our help is in the name of the LORD, who made heaven and earth.",
        "source": "Psalm 124:6-8, King James Version (1611), Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "literary",
        "title": "Christopher Marlowe's 'The Tragical History of Doctor Faustus' (c. 1592) stages the ultimate deceptive bargain, a signed deed that is easy to enter and impossible to escape, mirroring the 'subscription traps' New York now bans by making cancellation as easy as signing up.",
        "excerpt": "I, JOHN FAUSTUS, OF WITTENBERG, DOCTOR, BY THESE PRESENTS, DO GIVE BOTH BODY AND SOUL TO LUCIFER PRINCE OF THE EAST, AND HIS MINISTER MEPHISTOPHILIS; AND FURTHERMORE GRANT UNTO THEM, THAT, FOUR-AND-TWENTY YEARS BEING EXPIRED, AND THESE ARTICLES ABOVE-WRITTEN BEING INVIOLATE, FULL POWER TO FETCH OR CARRY THE SAID JOHN FAUSTUS, BODY AND SOUL ... INTO THEIR HABITATION WHERESOEVER. BY ME, JOHN FAUSTUS.",
        "source": "Christopher Marlowe, The Tragical History of Doctor Faustus (1616 quarto), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/811/811-h/811-h.htm"
      },
      {
        "category": "artistic",
        "title": "Hector Berlioz's dramatic legend 'La damnation de Faust' (1846) sets to music the pact that damns its signer, Faust dragged to the abyss by a contract he can never undo, an operatic warning against the easy-to-sign, impossible-to-leave bargain that New York's click-to-cancel rule targets.",
        "excerpt": "Berlioz's four-part 'dramatic legend' dramatizes Faust's bargain with Mephistopheles, culminating in the terrifying 'Ride to the Abyss,' where the hero is swept to damnation as the price of the pact comes due. The full orchestral and vocal scores, published by Breitkopf und Hartel (1901) and others, are freely available in the public domain.",
        "source": "Hector Berlioz, La damnation de Faust, H. 111 (1846), full scores at the International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/La_damnation_de_Faust,_H_111_(Berlioz,_Hector)"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 'Winter Landscape with a Bird Trap' (1565) hides a propped-up death-trap for unwary birds amid a serene village scene, the very picture of a snare that lures easily and kills quietly, just as New York's rule exposes the hidden 'dark pattern' traps that catch subscribers.",
        "excerpt": "In a tranquil snow-covered Flemish village, skaters glide on a frozen river while, at right, a heavy wooden door is propped on a slender stick above scattered bait. Birds gather unaware beneath it; a single pull of the hidden cord will spring the deadly trap. Bruegel sets the lethal snare beside carefree play, a quiet emblem of danger disguised as harmless invitation.",
        "source": "Pieter Bruegel the Elder, Winter Landscape with a Bird Trap (1565), Royal Museums of Fine Arts of Belgium, Brussels; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Winter_Landscape_with_Skaters_and_Bird_Trap_-_WGA03333.jpg",
        "image": {
          "src": "/covers/nyc-subscription-traps-ban--a5.png",
          "alt": "Snowy Flemish village where villagers skate on a frozen river while, at right, a heavy wooden door is propped on a stick as a bird trap over ground strewn with bait.",
          "credit": "Pieter Bruegel the Elder, Winter Landscape with a Bird Trap (1565), Royal Museums of Fine Arts of Belgium, Brussels. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "us-home-prices-record-fed-split",
    "headline": "US home prices hit a record high as Federal Reserve officials split over inflation",
    "overview": "US home prices climbed to an all-time high even as the pace of sales slowed, while Federal Reserve officials remained divided over the path of inflation, according to data and remarks reported on July 11, 2026. The record prices deepened an affordability squeeze for would-be buyers held back by elevated mortgage rates. The split among Fed policymakers underscored uncertainty over when, and how far, the central bank might cut interest rates.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxNYmRkSnA4a1VCa3Fpb1FiQ1ZseFd0dW5VdVMwajdWLV91MUdtb3YydktCMEdwRk5jeGo0SnhkWlgtT281NjdibVhjUko5alZ6YmZrRVIyVjBSeTYyclRYNkFKVDY1ekNqTlZlQ0tweWYxeHdfa0c3WHoxNFM5b3FEM1UzR1RNWVdsU0p2NWwyZDRDaDZiRHJpVlZVekpjVGViQXc0?oc=5"
      },
      {
        "name": "AOL News",
        "href": "https://news.google.com/rss/articles/CBMie0FVX3lxTE4tWUs3Q0ltY3cwU2J2UFQ2LVl4YzBHeTJ2U3hiRlp1bmFwWVlmblZvLTlyVTRadzdoXzlWUkZMUXVzQndMZGRjNzlvdVk3bTRlSEVBY3JTUzlRbm5yREdfLWdmbFRkVjY5ZEtoeGpoblY3NEJJNVU3NVdHUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/us-home-prices-record-fed-split.png",
      "alt": "An aerial view of a dense American suburb of near-identical houses and curving streets.",
      "credit": "David Shankbone, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tiberius Gracchus's land speech (133 BCE), recorded by Plutarch in the Life of Tiberius Gracchus, decried a Rome where the soldiers who fought and died for Italy owned no roof of their own while the wealthy engrossed the land - just as US home prices hit a record high in July 2026 and priced ordinary buyers out of any house to call their own.",
        "excerpt": "The wild beasts that roam over Italy have every one of them a cave or lair to lurk in; but the men who fight and die for Italy enjoy the common air and light, indeed, but nothing else; houseless and homeless they wander about with their wives and children.",
        "source": "Plutarch, Life of Tiberius Gracchus 9, trans. Bernadotte Perrin (Loeb Classical Library), hosted at LacusCurtius, University of Chicago",
        "href": "https://penelope.uchicago.edu/Thayer/e/roman/texts/plutarch/lives/tiberius_gracchus*.html"
      },
      {
        "category": "historical",
        "title": "The tenement housing crisis of Gilded Age New York, documented by Jacob Riis in How the Other Half Lives (1890), exposed landlords wringing fifteen-to-thirty-percent returns from overcrowded slum rooms while the poor could barely make rent - just as record-high 2026 home prices and steep mortgage rates squeeze buyers while property owners stay secure.",
        "excerpt": "The owner was seeking a certain percentage on his outlay, and that percentage very rarely fell below fifteen per cent., and frequently exceeded thirty.",
        "source": "Jacob A. Riis, How the Other Half Lives: Studies Among the Tenements of New York (1890), Introduction (Project Gutenberg eBook 45502)",
        "href": "https://www.gutenberg.org/files/45502/45502-h/45502-h.htm"
      },
      {
        "category": "literary",
        "title": "The prophet Isaiah's cry against those who \"join house to house\" and \"lay field to field\" (Isaiah 5:8, King James Version) condemned the wealthy who engrossed all the land until the poor had no place left to stand - just as record US home prices in July 2026 leave the young shut out of any shelter of their own.",
        "excerpt": "Woe unto them that join house to house, that lay field to field, till there be no place, that they may be placed alone in the midst of the earth!",
        "source": "Isaiah 5:8, King James Version (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Isaiah"
      },
      {
        "category": "literary",
        "title": "Oliver Goldsmith's poem \"The Deserted Village\" (1770) lamented a countryside \"where wealth accumulates, and men decay,\" its poor displaced so the estates of the rich could expand - just as America's all-time-high home prices in 2026 hollow out affordability for everyone but the wealthy.",
        "excerpt": "Ill fares the land, to hastening ills a prey,\nWhere wealth accumulates, and men decay:\nPrinces and lords may flourish, or may fade;\nA breath can make them, as a breath has made:\nBut a bold peasantry, their country's pride,\nWhen once destroy'd, can never be supplied.",
        "source": "Oliver Goldsmith, The Deserted Village (1770), lines 51-56 (Project Gutenberg eBook 50500)",
        "href": "https://www.gutenberg.org/files/50500/50500-h/50500-h.htm"
      },
      {
        "category": "artistic",
        "title": "Gustave Doré's wood engraving \"Over London by Rail\" (1872), from London: A Pilgrimage, crowds the poor into the packed back-yards of railway-side tenements, home stacked upon identical home - just as record-high US home prices in July 2026 wall off decent housing from all but the affluent.",
        "excerpt": "Dore's engraving looks down on a warren of soot-stained back yards where laundry lines and cramped brick terraces press hard against a railway viaduct. Row upon identical row of tiny tenement dwellings hems in the London poor, shut in by industry and want alike. It is a vision of the many packed into the little the city would allow them, while the trains of the prosperous rush past overhead.",
        "source": "Gustave Doré, \"Over London by Rail,\" from Blanchard Jerrold & Gustave Doré, London: A Pilgrimage (1872) (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Dore_London.jpg",
        "image": {
          "src": "/covers/us-home-prices-record-fed-split--a4.png",
          "alt": "Gustave Doré's 1872 wood engraving 'Over London by Rail', looking down on the crowded back yards of railway-side London tenements with laundry strung between packed brick terraces.",
          "credit": "Gustave Doré, 'Over London by Rail,' from London: A Pilgrimage (1872). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Stephen Foster's parlor ballad \"Hard Times Come Again No More\" (1854) sings of the weary poor lingering at the cabin door while others enjoy life's pleasures - just as a record-price 2026 housing market keeps first-time buyers out in the cold.",
        "excerpt": "Foster's melancholy parlor song asks listeners to pause amid life's pleasures and count its many tears, dwelling on the weary poor who linger, unhoused and unwelcome, at the cabin door. Its aching refrain pleads that hard times might come again no more - the era's tender protest against a comfort and a home reserved for the few.",
        "source": "Stephen Foster, \"Hard Times Come Again No More\" (New York: Firth, Pond & Co., 1854) (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Hard_Times_Come_Again_No_More_(Foster,_Stephen)"
      }
    ],
    "rank": 10
  },
  {
    "slug": "gas-plants-ai-data-centers",
    "headline": "US utilities build new gas-fired power plants to feed AI data centers, drawing clean-energy pushback",
    "overview": "A wave of new natural-gas power plants is being planned and built across the United States to meet the surging electricity demand of artificial-intelligence data centers, according to reporting on July 11, 2026. The buildout has pitted utilities and technology companies against renewable-energy advocates, who argue solar, wind and storage could meet the load faster and more cleanly. The clash highlights how the AI boom is reshaping the power grid and complicating climate goals.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxONF9fd3ZnLUVCb0FDcm43Mks4UFEtTnBzUThWN3ItYjUzLWc1OGVhOFhIX3V2Tzd0UzI0UnBqNUttejRRWWRIRUtIZVBWWXB2NGJnd09QdnV4aVhCM2dfajdzSkl0c2NMWkJrdXRLYVg5V3FiVzNBWEIwTVhYczFUVEotRC03RzItYndEWjRETzZib3ZJdDRCcy1vb284bHdXSEVkdTNrZEZvdFY4ajByWGN3MUF4VDg?oc=5"
      },
      {
        "name": "Click2Houston",
        "href": "https://news.google.com/rss/articles/CBMi4AFBVV95cUxObjJvYVc2WXlRUmg0OVROemtfdFZ0eTM2TWNUNUFTa2VYMkdwTTZSWE5BRGxZRm43WGlDRmZCeXhsTWRRM01QeWw2MFNrcWRRbS1JSjdVVXpnTUczZUhFYVF6eDI2cXpkV2xadXB5MlhFMFo2R3pMd3RvRHJ1dXJPX3JUM1RxT3I2cy1nVDlxY3Iyb3RtOU1ZdTlWak1GV29YeDBNVTVzd2owX3RmUVpQbDlUSnM2NmN2MHFJeHpZMWNMTHVlX2l4T2U0VC03cnZac1VYUFRvVTA5R0tHUzJYcg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/gas-plants-ai-data-centers.png",
      "alt": "The turbines, silver pipework and tall stacks of a natural-gas power plant.",
      "credit": "CC BY 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In The Coal Question (1865), the economist William Stanley Jevons crowned coal 'the factor in everything we do' and warned that a nation's appetite for cheap energy only swells the more abundantly it is fed, just as US utilities now fire up new gas plants to satisfy AI data centers' bottomless hunger for power.",
        "excerpt": "Coal in truth stands not beside, but entirely above, all other commodities. It is the material source of the energy of the country—the universal aid—the factor in everything we do. With coal almost any feat is possible or easy; without it we are thrown back into the laborious poverty of early times. With such facts familiarly before us, it can be no matter of surprise that year by year we make larger draughts upon a material of such myriad qualities—of such miraculous powers.",
        "source": "William Stanley Jevons, The Coal Question (1865), Chapter I",
        "href": "https://archive.org/details/coalquestioninqu00jevo"
      },
      {
        "category": "historical",
        "title": "The Great Smog of London (December 1952), documented by the UK Met Office, killed thousands when a cold snap drove Londoners to burn mountains of coal and a temperature inversion trapped the fumes, a grim reminder, as new US gas plants rise to power AI, that the smoke of cheap energy carries a human bill.",
        "excerpt": "For five days in December 1952, smoke from countless coal fires fused with fog to smother London beneath a lethal yellow pall so dense that traffic halted and pedestrians lost their way. Roughly 4,000 people, and likely far more, died from the poisoned air, and the catastrophe forced Britain to pass its first Clean Air Acts. It endures as an early warning that powering everyday life with abundant fossil fuel can exact a sudden and deadly public cost.",
        "source": "Met Office, 'The Great Smog of 1952' (National Meteorological Library and Archive case study)",
        "href": "https://weather.metoffice.gov.uk/learn-about/weather/case-studies/great-smog"
      },
      {
        "category": "literary",
        "title": "In Frankenstein; or, The Modern Prometheus (1818), Mary Shelley's man-made creature turns on its maker with 'You are my creator, but I am your master; obey!', much as the AI systems now conjured inside US data centers compel their makers to raise ever more power plants to feed them.",
        "excerpt": "“Slave, I before reasoned with you, but you have proved yourself unworthy of my condescension. Remember that I have power; you believe yourself miserable, but I can make you so wretched that the light of day will be hateful to you. You are my creator, but I am your master; obey!”",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818)",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "literary",
        "title": "William Blake's hymn 'And did those feet in ancient time' (1808) sets England's green hills against its 'dark Satanic Mills', the smoke-belching furnaces of a new industrial age, an image mirrored today as gas-fired plants sprout to power the insatiable AI machine.",
        "excerpt": "And did those feet in ancient time\nWalk upon England's mountains green?\nAnd was the holy Lamb of God\nOn England's pleasant pastures seen?\n\nAnd did the Countenance Divine\nShine forth upon our clouded hills?\nAnd was Jerusalem builded here\nAmong those dark Satanic mills?",
        "source": "William Blake, Preface to Milton: A Poem ('And did those feet in ancient time'), 1808",
        "href": "https://en.wikisource.org/wiki/Jerusalem_(Blake)"
      },
      {
        "category": "artistic",
        "title": "In the Nibelheim scene of Wagner's Das Rheingold (1869), eighteen offstage anvils hammer in relentless rhythm as enslaved dwarves toil at Alberich's fiery forge, an industrial din that prefigures the furnace-fed gas plants now humming to power AI.",
        "excerpt": "As the gods descend into the subterranean smithy of Nibelheim, Wagner scores a mounting clangor of tuned anvils, the sound of an entire workforce enslaved to feed a machine of greed. The relentless metallic pulse hammers raw fire and labor into gold, dramatizing an appetite for power that consumes everything beneath it. It is opera's great portrait of industry as bondage lit by forge-fire.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A, Scene 3 (Nibelheim); full orchestral score, B. Schott's Söhne",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Philippe-Jacques de Loutherbourg's 'Coalbrookdale by Night' (1801) sets the Shropshire ironworks ablaze against a black sky, one of the first paintings to render industry as an infernal furnace, the very vision evoked by today's gas plants glowing to feed AI data centers.",
        "excerpt": "De Loutherbourg paints the Coalbrookdale foundry as a hellmouth: flame and molten glare erupt from the Bedlam Furnaces, staining the night sky orange while dark smoke boils overhead and tiny figures labor at the edge of the blaze. It is among the earliest works to cast the machinery of industrial power as something sublime and terrifying at once, progress lit by relentless fire.",
        "source": "Philippe-Jacques de Loutherbourg, Coalbrookdale by Night (1801), oil on canvas, Science Museum, London",
        "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._002.jpg",
        "image": {
          "src": "/covers/gas-plants-ai-data-centers--a5.png",
          "alt": "Coalbrookdale by Night (1801) by Philippe-Jacques de Loutherbourg: fiery furnaces glow orange beneath billowing smoke against a dark night sky.",
          "credit": "Philippe-Jacques de Loutherbourg, Coalbrookdale by Night (1801), Science Museum, London. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "jayden-adams-footballer-dies",
    "headline": "South Africa and World Cup midfielder Jayden Adams dies at 25",
    "overview": "Jayden Adams, a South African midfielder who played for the national team at this year's World Cup, has died at the age of 25, his club and football authorities said on July 11, 2026. Tributes poured in for the young player, who had featured for South Africa only weeks earlier, as the cause of his death was not immediately made public. South African football mourned the sudden loss of one of its rising talents.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiZ0FVX3lxTE9ndVgzUzNBQzR0QnFfUWs3aTc4Qy14R0JkQnlLSHNYeTQzN1laZDFrQmcwREtiQUktd0xNeWlaQkJXVW9yYVRsZWp4OHF2cDJBVjZyT3VMOHEybWV0NjVBeGMyYUpzS1E?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNZ2U1YlJyWlRNSTRqUnFjR2xmQ2N6cl9fb3BTVGtyeEw5eVRYaU15X1pnR3VWaGNGR2EzNVpXMS0yS193RXdfd3d3WThURW5PNG1YYkx5amxrbzRJank1Rzk3aGFnRVRZWlFKVkM4enJaNkYzM2sxUU12VF9UUFZsM0t4Nnp0UlFyNENFSDhwTjRpVFhDSklJeWZBQTFscF92YzB3dA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/jayden-adams-footballer-dies.png",
      "alt": "Rows of empty seats overlooking the quiet green pitch of a large football stadium.",
      "credit": "Alex Kinney, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pausanias' Description of Greece (c. 175 CE) records the tomb of Ladas, the swiftest runner in the Greek world, who fell ill and died on the road home in the very hour of his Olympic triumph, just as Jayden Adams was lost only weeks after taking the field at the World Cup.",
        "excerpt": "there is the tomb of Ladas, the fastest runner of his day. He was crowned at Olympia for a victory in the long race, and falling ill, I take it, immediately after the victory he was on his way home; his death took place here, and his grave is above the highway.",
        "source": "Pausanias, Description of Greece, Book 3 (Laconia), 21.1, trans. W. H. S. Jones (Loeb Classical Library, 1918) — Wikisource",
        "href": "https://en.wikisource.org/wiki/Description_of_Greece_(Jones)/Book_3"
      },
      {
        "category": "historical",
        "title": "The death of Cameroon midfielder Marc-Vivien Foé, who collapsed on the pitch during the 2003 FIFA Confederations Cup semi-final and could not be revived, mirrors the loss of Jayden Adams — another young African international struck down suddenly at the height of his game.",
        "excerpt": "On 26 June 2003, in the 72nd minute of a Confederations Cup semi-final in Lyon, Cameroon's tireless holding midfielder Marc-Vivien Foé collapsed on the field and, despite frantic resuscitation, died at 28; the cause was later identified as an undiagnosed heart condition. A veteran of the Premier League and two World Cups, he was mourned with a state funeral, and the shock of his death reshaped cardiac screening across football.",
        "source": "Confederation of African Football (CAF) — official tribute to Marc-Vivien Foé",
        "href": "https://www.cafonline.com/afcon2025/news/remembering-marc-vivien-foe-celebrating-the-life-and-legacy-of-cameroon-star/"
      },
      {
        "category": "literary",
        "title": "A. E. Housman's 'To an Athlete Dying Young' (1896), which chairs a victorious runner home through cheering crowds only to bear him again to his grave, reads like an elegy written for Jayden Adams — the champion carried shoulder-high one season and mourned the next.",
        "excerpt": "The time you won your town the race\nWe chaired you through the market-place;\nMan and boy stood cheering by,\nAnd home we brought you shoulder-high.\n...\nSmart lad, to slip betimes away\nFrom fields where glory does not stay\nAnd early though the laurel grows\nIt withers quicker than the rose.",
        "source": "A. E. Housman, A Shropshire Lad, XIX ('To an Athlete Dying Young'), 1896 — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/5720/pg5720.txt"
      },
      {
        "category": "literary",
        "title": "Andromache's lament over the fallen Hector in Homer's Iliad, Book XXIV (Samuel Butler's prose translation), grieves a hero cut down in his youth and the future left unfulfilled, echoing the tributes poured out for Jayden Adams, dead at 25.",
        "excerpt": "Husband, you have died young, and leave me in your house a widow; he of whom we are the ill-starred parents is still a mere child, and I fear he may not reach manhood.",
        "source": "Homer, The Iliad, Book XXIV, trans. Samuel Butler (1898) — Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XXIV"
      },
      {
        "category": "artistic",
        "title": "Frédéric Chopin's 'Marche funèbre' from the Piano Sonata No. 2 in B-flat minor, Op. 35 (1839), the most familiar music of mourning ever written and played at the composer's own funeral, tolls for the beloved young dead as it now might for Jayden Adams.",
        "excerpt": "Chopin's slow, tolling funeral march — its heavy, repeated chords swelling to a keening climax before a tender, song-like central trio — has accompanied the grief of nations and was sounded over Chopin's own coffin. Composed when he was himself a young man, it has become the archetypal sound of a life cut short and of mourners moving in procession behind it.",
        "source": "Frédéric Chopin, Piano Sonata No. 2 in B-flat minor, Op. 35 (III. Marche funèbre. Lento) — IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      },
      {
        "category": "artistic",
        "title": "Henry Wallis's 'The Death of Chatterton' (1856), the Pre-Raphaelite image of the seventeen-year-old poet lying dead by his garret window amid the torn shreds of his verses, is an emblem of brilliant promise extinguished too soon — the same grief now voiced for Jayden Adams at 25.",
        "excerpt": "Wallis lays the boy-poet Thomas Chatterton lifeless across his narrow bed, one pale arm trailing to the floor amid the scattered fragments of his manuscripts, as a cold dawn breaks over the London rooftops beyond the open attic window. The beautiful, youthful body and the wasted genius it holds make the canvas an enduring portrait of talent lost in its first flower.",
        "source": "Henry Wallis, The Death of Chatterton (1856), Yale Center for British Art — Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Henry_Wallis_-_The_Death_of_Chatterton_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/jayden-adams-footballer-dies--a5.png",
          "alt": "Oil painting of the young poet Thomas Chatterton lying dead on a bed beside an open attic window, one arm hanging to the floor, torn papers scattered around him at dawn.",
          "credit": "Henry Wallis, The Death of Chatterton (1856), Yale Center for British Art, via Wikimedia Commons (Google Art Project). Public domain."
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "ohtani-knee-drained-all-star",
    "headline": "Dodgers star Shohei Ohtani to have his left knee drained and will miss the All-Star Game",
    "overview": "Los Angeles Dodgers two-way star Shohei Ohtani will have fluid drained from his left knee and sit out Major League Baseball's All-Star Game, the team said on July 11, 2026. The Dodgers described the problem as knee irritation and called the procedure precautionary, with Ohtani expected back soon after the break. The reigning MVP had continued to hit and pitch through the discomfort during a demanding season.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNeEx6X0tieUZEdUJ2Q0hMTldjSERqSFQxeS1OSFB2Ym40bm82cVZ1a1E1RDBHbG0tYWRDY3JuajdNZ2pJb1QzaGotRXUxNFJTX3RQeExKaEhqSllObVRXc3hQNmhBMHBZX3h5YTJvWVVsY3dMWUxPOHEzOW96STVQM2xBSTlHNTAtRGJWZ2VmUUpqai1nT25EZ0RlVDg3a1NtdEE?oc=5"
      },
      {
        "name": "ABC30 Fresno",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxOVk1fSDlPVjJVWXlRdnFwa1AtbXduUzE2aFVXYW1sdEdOUTNIQktVa0hhMGg2RTJ3MjFQZ2E5UFhMaDZHVHlwcmdxQV8tMFhyT3Nqb28zdmF1YVZlbl94TTY3SWFTelNBTG9ZS1FOT2VjcDhvY1NYLTlNUzFEMDhMQWR3NlF6Zm9sLUs0MUhn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/ohtani-knee-drained-all-star.png",
      "alt": "An empty baseball diamond with reddish infield dirt and a green outfield under an open sky.",
      "credit": "Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Alexander the Great felled at Tarsus (333 BCE), recorded in Plutarch's 'Life of Alexander,' where the unstoppable conqueror is laid flat by a chill caught bathing in the icy Cydnus and must submit to a physician's care before resuming his campaign, just as the reigning MVP pauses to have his ailing knee treated before returning to the fight.",
        "excerpt": "It was sickness that detained him there, which some say he contracted from his fatigues, others from bathing in the river Cydnus, whose waters were exceedingly cold. ... till Philip, the Acarnanian, seeing how critical his case was, but relying on his own well-known friendship for him, resolved to try the last efforts of his art ... and when Philip came in with the potion, he took it with great cheerfulness and assurance.",
        "source": "Plutarch, 'Life of Alexander' (Dryden translation), The Internet Classics Archive",
        "href": "https://classics.mit.edu/Plutarch/alexandr.html"
      },
      {
        "category": "historical",
        "title": "Sandy Koufax's arthritic left arm (1966), chronicled by the National Baseball Hall of Fame, in which the Dodgers' peerless left-hander pitched an entire season through swelling and pain in a damaged joint that had to be drained and injected between starts, just as a Dodgers star now rests his balky left knee at the height of his powers.",
        "excerpt": "The Hall of Fame's account recalls how Koufax's left elbow, wrecked by traumatic arthritis, swelled and stiffened as he pushed through his final 1966 season on sheer will, the joint iced, drained, and shot with cortisone between outings. Team doctors warned the pain would only worsen, yet he answered with a career-best 27 wins before the damaged arm forced him to walk away at his peak. It is the archetype of the great athlete undone not by any rival but by his own body's small, stubborn breakdown.",
        "source": "'Koufax Calls It Quits,' National Baseball Hall of Fame and Museum",
        "href": "https://baseballhall.org/discover-more/stories/inside-pitch/koufax-calls-it-quits"
      },
      {
        "category": "literary",
        "title": "Sophocles' 'Philoctetes' (409 BCE), in Richard Jebb's translation, whose peerless archer is sidelined from the war by a festering, blood-draining wound in his foot and must be healed before the Greeks can win, just as the two-way champion sits out the season's showcase to let his lower-body injury be drained and mend.",
        "excerpt": "his foot all ulcerous with a gnawing sore,—when neither drink-offering nor sacrifice could be attempted by us in peace ... the plague that gnawed his flesh and drained his blood;—no one to assuage the burning flux, oozing from the ulcers of his envenomed foot",
        "source": "Sophocles, 'Philoctetes,' trans. Richard C. Jebb (1917), Wikisource",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Sophocles_(Jebb_1917)/Philoctetes"
      },
      {
        "category": "literary",
        "title": "Samson's downfall in the Book of Judges, chapter 16 (King James Version), the strongest of champions whose whole might depends on a single hidden vulnerability and collapses the instant it is touched, just as a season-defining hero is halted by one small point of bodily weakness.",
        "excerpt": "There hath not come a rasor upon mine head; for I have been a Nazarite unto God from my mother's womb: if I be shaven, then my strength will go from me. ... And she made him sleep upon her knees; and she called for a man, and she caused him to shave off the seven locks of his head; and she began to afflict him, and his strength went from him. And she said, The Philistines be upon thee, Samson. And he awoke out of his sleep, and said, I will go out as at other times before, and shake myself. And he wist not that the LORD was departed from him.",
        "source": "Judges 16:17-20, King James Version, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges"
      },
      {
        "category": "artistic",
        "title": "Richard Wagner's 'Parsifal' (WWV 111, composed 1857-1882), whose wounded king Amfortas suffers from a spear-wound that will not heal and lies in agony awaiting the pure hero who can make him whole again, its music of suffering and the balm of the 'Karfreitagszauber' (Good Friday Music) mirroring the wounded warrior who must rest and be healed before he can return.",
        "excerpt": "Wagner's final sacred drama gives musical form to the wounded champion: Amfortas, guardian-king of the Grail, bears an unclosing wound and cries out under a pain no strength of his own can master. The score moves from his throbbing lament to the radiant serenity of the Good Friday Music, sound made into the promise of healing. IMSLP hosts the full public-domain orchestral scores, including the complete edition prepared by Felix Mottl for Edition Peters.",
        "source": "Richard Wagner, 'Parsifal,' WWV 111 (full scores), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Parsifal,_WWV_111_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Ernst Herter's marble 'Dying Achilles' (Sterbender Achill, 1884) at the Achilleion in Corfu, which shows the mightiest Greek warrior sinking down as he grasps at the arrow lodged in his heel, his one vulnerable point, a perfect emblem of the invincible hero brought low through the smallest weakness of the lower body, just as a lower-leg injury sidelines the game's dominant star.",
        "excerpt": "Herter carves the instant the unconquerable Achilles is undone: seated and slumping, sword-arm falling slack, his hand reaches down to the fatal shaft in his heel, the single spot where the greatest of warriors could be harmed. The whole heroic body strains around that one small point of ruin. It renders in stone the ancient truth that overwhelming strength can be canceled by the frailty of a single joint or limb.",
        "source": "Ernst Herter, 'Dying Achilles' (1884), Achilleion, Corfu; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Closeup_of_Achilles_thniskon_in_Corfu_Achilleion.JPG",
        "image": {
          "src": "/covers/ohtani-knee-drained-all-star--a5.png",
          "alt": "Marble sculpture of the dying Achilles seated and slumping, reaching toward the arrow embedded in his heel, at the Achilleion palace in Corfu",
          "credit": "Ernst Herter, 'Dying Achilles' (1884), Achilleion, Corfu. Photograph by Tasoskessaris, via Wikimedia Commons (CC BY-SA)."
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "spain-wildfire-costa-del-sol",
    "headline": "Wildfire in southern Spain kills at least 12 with 23 missing in one of the country's deadliest blazes",
    "overview": "A fast-moving wildfire tore through hillside communities on Spain's southern coast on July 11, 2026, killing at least 12 people and leaving 23 missing in one of the deadliest wildfires in the country's history. The blaze swept through an area popular with foreign expatriates, and residents described fleeing within minutes as flames raced across tinder-dry terrain. Emergency crews backed by water-dropping aircraft fought to contain the fire during a punishing heatwave.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiigFBVV95cUxPdERXbVpiZXNlclNoY2JSMzZlTVo3N09oMklGd0dQYmJkTm43eGlZMVFSbFpWeldadVZ3OUJQRzF5QUlTdUxMekVMRVp2OWhrT0ZocnV6SUdTS3pJOWZtTGhCbjhXX0tUSEVVN3JEQmI4bnJ0a29KbmtLd3NlMmVsc2U3U0hSYThLamc?oc=5"
      },
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c1wyv383j2xo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/spain-wildfire-costa-del-sol.png",
      "alt": "A forest wildfire sending flames and thick smoke across a hillside above a Spanish town at dusk.",
      "credit": "Photograph by Pabvigar (2016), CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome (64 CE), recorded by Tacitus in the Annals, Book XV — an ancient conflagration that raced uphill and cut off fleeing crowds, just as the Costa del Sol blaze outran everyone in its path",
        "excerpt": "The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city... Often, while they looked behind them, they were intercepted by flames on their side or in their face.",
        "source": "Tacitus, The Annals, Book XV, trans. Alfred John Church and William Jackson Brodribb (public domain)",
        "href": "http://classics.mit.edu/Tacitus/annals.11.xv.html"
      },
      {
        "category": "historical",
        "title": "The Great Fire of London (1666), as witnessed by Samuel Pepys in his Diary entry of 2 September 1666 — an early-modern firestorm in which residents fled to the water only as the flames reached them, echoing the terror of an expat community overtaken by fire",
        "excerpt": "poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another. And among other things, the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.",
        "source": "The Diary of Samuel Pepys, entry for 2 September 1666 (Project Gutenberg, Vol. 45: August/September 1666; public domain)",
        "href": "https://www.gutenberg.org/cache/epub/4167/pg4167.html"
      },
      {
        "category": "literary",
        "title": "The burning of Troy in Virgil's Aeneid, Book II (19 BCE), trans. John Dryden — a city consumed house by house as neighbours' homes catch fire, mirroring a village swallowed by an advancing blaze",
        "excerpt": "The palace of Deiphobus ascends / In smoky flames, and catches on his friends. / Ucalegon burns next: the seas are bright / With splendour not their own, and shine with Trojan light.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (Project Gutenberg; public domain)",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "The rain of fire in Dante's Inferno, Canto XIV (c. 1320), trans. Henry Wadsworth Longfellow — an endless downfall of burning flakes over a scorched waste, an infernal image for a landscape turned to fire",
        "excerpt": "O'er all the sand-waste, with a gradual fall, / Were raining down dilated flakes of fire, / As of the snow on Alp without a wind.",
        "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto XIV, trans. Henry Wadsworth Longfellow (Project Gutenberg; public domain)",
        "href": "https://www.gutenberg.org/files/1001/1001-h/1001-h.htm"
      },
      {
        "category": "artistic",
        "title": "Karl Bryullov, \"The Last Day of Pompeii\" (1830–1833) — a monumental canvas of terrified townsfolk fleeing a fiery sky as their world is destroyed, a visual analogue for panicked residents escaping the flames of southern Spain",
        "excerpt": "Bryullov's vast painting captures the instant a community is engulfed: figures scatter through collapsing streets beneath a blood-red, smoke-choked sky lit by falling fire and lightning. Families shield children and the elderly, some frozen in terror, as statues topple around them. The scene distills the human panic of a population overtaken by an unstoppable natural catastrophe.",
        "source": "Karl Bryullov, The Last Day of Pompeii (1830–1833), oil on canvas, State Russian Museum, Saint Petersburg; public domain, via Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/spain-wildfire-costa-del-sol--a4.png",
          "alt": "Crowds of terrified people flee through collapsing streets under a red, fire-lit sky in Bryullov's The Last Day of Pompeii.",
          "credit": "Karl Bryullov, The Last Day of Pompeii (1830–1833), State Russian Museum; public domain, via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "John Martin, \"The Great Day of His Wrath\" (c. 1851–1853) — an apocalyptic vision of a whole landscape ablaze and crumbling into fire, evoking the scale of one of Spain's deadliest wildfires",
        "excerpt": "Martin's canvas shows an entire terrain heaving and burning: mountains split and collapse, cities tumble into glowing chasms, and tiny human figures are swept helplessly toward a wall of fire. The lurid orange and black palette turns a natural disaster into a cosmic conflagration. It is the imagination of a land consumed whole, as fire tears through hillsides and homes.",
        "source": "John Martin, The Great Day of His Wrath (c. 1851–1853), oil on canvas, Tate Britain, London; public domain, via Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Great_Day_of_His_Wrath_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/spain-wildfire-costa-del-sol--a5.png",
          "alt": "An apocalyptic landscape of collapsing mountains and cities engulfed in orange fire in John Martin's The Great Day of His Wrath.",
          "credit": "John Martin, The Great Day of His Wrath (c. 1851–1853), Tate Britain; public domain, via Wikimedia Commons (Google Art Project)"
        }
      }
    ],
    "lead": true,
    "rank": 14
  },
  {
    "slug": "trump-iran-missile-threat-khamenei-funeral",
    "headline": "Trump says missiles are 'locked and loaded' and aimed at Iran after Khamenei's funeral drew calls for his killing",
    "overview": "President Donald Trump warned on July 11, 2026 that 'a thousand missiles are Locked and Loaded and aimed at' Iran, with 'thousands of more to immediately follow,' should Tehran act on threats against him. His Truth Social post came after mourners at the funeral of Iran's late supreme leader, Ayatollah Ali Khamenei, held banners openly calling for Trump and Israeli Prime Minister Benjamin Netanyahu to be killed. The threat deepened a crisis as an interim deal to end the recent war strained and US officials pressed Iran to guarantee open shipping through the Strait of Hormuz.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQb29YUXh5MnNRTjVBazdXOUdMSkx5bkU0WHJFVFRGX1pyY0E5cWZfRXc5NnhQVjdOUVFzZTJFNkpBNlZpdUZIVGdoNk5ieU1sVUw1dDMwdkhSYWF4a0pKUk9nYVFMLW5HRFRjOUJTSTBuVEkxLTQ1X2NEZk5FWDMwV2lnRlBhYmhyY2FjQU82S2pnM2RQSEpfTjFwSXBlbk54OGdr?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNTzc3RWxTLVZuRllmY19VQ244ZjcxcjY2TVRNWnh1WkI1ck5qUkFyMzBZNTZTYUZqbTVRSmc4V3BqMl9zY21GdnJmSGU0OTNRd0Q4ekxDMnlGQ0I1UEJScFZhUGZoZ1A1aEdZTWRYZ0FGazJ3aXpJd2Zad044SzhMWXFETXRmQnBvTnMxSjhzdXVjZnp1YmRkNWJlVWdqWWdFdnRKeHlrOFQtdjZqRk9mMFhMbFFHUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/trump-iran-missile-threat-khamenei-funeral.png",
      "alt": "A Trident II (D5) ballistic missile lifts off on a plume of fire and smoke during a test launch over the ocean.",
      "credit": "U.S. Department of Defense photo (via Lockheed Martin). Public domain. Wikimedia Commons, File:Trident II missile image.jpg."
    },
    "edition": "Afternoon Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus, Histories, Book VII (c. 430 BC) — Xerxes vows to bridge the Hellespont and punish Athens for a past wrong, as Trump warns missiles are aimed at Iran in reprisal after the funeral",
        "excerpt": "It is my intent to bridge the Hellespont and lead my army through Europe to Hellas, that I may punish the Athenians for what they have done to the Persians and to my father.",
        "source": "Herodotus, The Persian Wars, Book VII.8, trans. A. D. Godley. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Herodotus_The_Persian_Wars_(Godley)/Book_VII"
      },
      {
        "category": "historical",
        "title": "Polybius, The Histories, Book III (2nd century BC) — Hannibal's boyhood oath of eternal enmity to Rome, mirroring the crowds at Tehran swearing vengeance against the US president",
        "excerpt": "his father took him by the hand, led him up to the altar, and bade him lay his hand on the victim and swear never to be the friend of the Romans.",
        "source": "Polybius, The Histories, Book III.11, trans. W. R. Paton (Loeb Classical Library). LacusCurtius, University of Chicago.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Polybius/3*.html"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book I (trans. Samuel Butler, 1898) — the invoked wrath of Achilles that brings countless ills, like the rage unleashed after Khamenei's funeral",
        "excerpt": "Sing, O goddess, the anger of Achilles son of Peleus, that brought countless ills upon the Achaeans.",
        "source": "Homer, The Iliad, Book I, trans. Samuel Butler. Project Gutenberg (eBook #2199).",
        "href": "https://www.gutenberg.org/files/2199/2199-h/2199-h.htm"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book IV (trans. John Dryden, 1697) — Dido's dying curse summoning an avenger to rise against her enemy, echoing the open calls for the US president's killing",
        "excerpt": "Rise some avenger of our Libyan blood, / With fire and sword pursue the perjur'd brood; / Our arms, our seas, our shores, oppos'd to theirs; / And the same hate descend on all our heirs!",
        "source": "Virgil, The Aeneid, Book IV, trans. John Dryden. Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=4:card=584"
      },
      {
        "category": "artistic",
        "title": "Francisco Goya, The Third of May 1808 (1814) — a firing squad's leveled muskets at point-blank range, a visual analogue to missiles already aimed and threats of retaliation",
        "excerpt": "A rank of faceless soldiers levels their muskets at point-blank range against a huddle of unarmed victims; one man in a white shirt flings his arms wide in the lantern's glare, defiant an instant before the volley. Goya turns an execution into an emblem of state violence and the machinery of reprisal, the guns already aimed and the outcome certain.",
        "source": "Francisco Goya, El Tres de Mayo de 1808 (The Third of May 1808), 1814, oil on canvas, Museo del Prado, Madrid. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/trump-iran-missile-threat-khamenei-funeral--a4.png",
          "alt": "Goya's painting: a firing squad aims muskets at a man in a white shirt who flings his arms wide amid fallen bodies, lit by a lantern in the night.",
          "credit": "Francisco Goya, The Third of May 1808 (1814), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven, Wellington's Victory, Op. 91 (1813) — a musical battle of cannon fire and clashing anthems, evoking threatened bombardment and vowed retaliation between rival powers",
        "excerpt": "Beethoven writes real muskets and cannon into the orchestra, pitting the British and French sides against one another with dueling drums, storm-marches and volleys of artillery. The 'Schlacht' surges toward a thunderous victory, a martial spectacle of two powers hurling fire at each other until one is broken.",
        "source": "Ludwig van Beethoven, Wellingtons Sieg, oder Die Schlacht bei Vittoria (Wellington's Victory), Op. 91, 1813. IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Wellingtons_Sieg,_Op.91_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 15
  },
  {
    "slug": "russia-kyiv-missile-strike-ten-wounded",
    "headline": "Russian missile and drone barrage on Kyiv wounds at least 10",
    "overview": "Russia struck Ukraine's capital, Kyiv, with ballistic and cruise missiles and more than 120 drones early on July 11, 2026, wounding at least 10 people and setting an office building and an electrical substation ablaze. Ukraine's air force said it shot down two cruise missiles and 111 drones but, critically short of Patriot interceptors, was largely unable to stop the ballistic missiles that travel at several times the speed of sound. Strikes on Kyiv and the surrounding region have killed more than 60 people so far this month.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxOY3k1cm9pSmZSWW94aGcyM09sWWdadXpEWWZBbGhFTjlfWDFkbzBZV3o4bmpycmY2QmQyelNrUVBFUmRLY1FwMS1XbVl4NU0tNGxIbmplTEstaXFlQV9na3IzdHd2YUxMNzQ1ZXRvMFlmQ05lR1gwT09oYXIyWkV4aWJDdEE5ZnVDMFVMalpnNjZpNFNfNThLR1ZEeGk?oc=5"
      },
      {
        "name": "The Moscow Times",
        "href": "https://www.themoscowtimes.com/2026/07/11/10-wounded-in-russian-strike-on-kyiv-a93225"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/russia-kyiv-missile-strike-ten-wounded.png",
      "alt": "A residential apartment building in Kyiv with one section blasted open and blackened after a Russian missile strike, rubble strewn across the ground.",
      "credit": "Kyiv City State Administration, 8 July 2024, via Wikimedia Commons (CC BY 4.0)"
    },
    "edition": "Afternoon Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Flavius Josephus, The Wars of the Jews, Book VI (1st century CE) — the Roman siege and burning of Jerusalem in 70 CE, an ancient capital reduced to fire as Kyiv's streets are now wrecked by missiles",
        "excerpt": "The flame was also carried a long way, and made an echo, together with the groans of those that were slain; and because this hill was high, and the works at the temple were very great, one would have thought the whole city had been on fire.",
        "source": "Flavius Josephus, The Wars of the Jews, Book VI, ch. 5, trans. William Whiston (1737). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0148%3Abook%3D6%3Awhiston+chapter%3D5"
      },
      {
        "category": "historical",
        "title": "The Blitz: London under German aerial bombardment, 1940-41 — a modern capital enduring the nightly bombing of its homes, as Kyiv now endures Russian missiles",
        "excerpt": "For months in 1940 and 1941 German bombers came night after night over London, collapsing whole streets of homes into rubble and driving families into shelters and Underground stations. This photograph, taken the morning after a raid, shows the gutted, roofless library of Holland House, its shelves somehow still upright amid the ash while men browse the surviving books. Like Kyiv under Russian missiles, a great capital learned to count its wounded and clear its ruins by daylight, only to brace for the sirens again at dusk.",
        "source": "'Holland House library after an air raid', London, 23 October 1940. Photograph by Harrison for Fox Photos Ltd (public domain). Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Holland_House_library_after_an_air_raid.jpg",
        "image": {
          "src": "/covers/russia-kyiv-missile-strike-ten-wounded--a1.png",
          "alt": "The roofless, burnt-out library of Holland House in London after a 1940 German air raid, three men calmly browsing books amid the rubble and standing shelves.",
          "credit": "Harrison for Fox Photos Ltd, 23 October 1940, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II, trans. John Dryden (1697; poem 19 BCE) — Aeneas watches Troy consumed in flames, the archetype of a city destroyed by its attackers",
        "excerpt": "Troy sunk in flames I saw, nor could prevent;\nAnd Ilium from its old foundations rent;\nRent like a mountain ash, which dar’d the winds,\nAnd stood the sturdy strokes of lab’ring hinds.",
        "source": "Virgil, The Aeneid, Book II, translated by John Dryden (1697). Project Gutenberg (eBook #228).",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book XXII, line 410, trans. A. T. Murray (1924; poem 8th century BCE) — the Trojans' grief for Hector likened to their whole city burning, the terror of a doomed city",
        "excerpt": "Most like to this was it as though all beetling Ilios were utterly burning with fire.",
        "source": "Homer, The Iliad, Book XXII, line 410, translated by A. T. Murray (Loeb Classical Library, 1924). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D22%3Acard%3D405"
      },
      {
        "category": "artistic",
        "title": "Francisco Goya, 'Ravages of War' (Estragos de la guerra), Plate 30 of The Disasters of War, 1810-1820 — a bomb-shattered home and its dead civilians, mirroring the wrecked apartment blocks of Kyiv",
        "excerpt": "Goya's etching shows a building torn open by an explosion: a woman and her child spill headlong from a collapsing floor, their limbs tangled with fallen masonry and an overturned chair. There is no battlefield here, only a home turned suddenly into a grave. It is the exact horror of the Kyiv strikes, an ordinary apartment block ripped apart with the family still inside.",
        "source": "Francisco Goya, Estragos de la guerra (Ravages of War), Plate 30 from Los Desastres de la Guerra, etching, drypoint and burin, 1810-1820. The Metropolitan Museum of Art (CC0), via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Plate_30_from_%27The_Disasters_of_War%27_%28Los_Desastres_de_la_Guerra%29-%27Ravages_of_war%27_%28Estragos_de_la_guerra%29_MET_DP817367.jpg",
        "image": {
          "src": "/covers/russia-kyiv-missile-strike-ten-wounded--a4.png",
          "alt": "Goya's etching 'Ravages of War' showing figures and a child falling amid a building collapsing from an explosion, with rubble and a broken chair.",
          "credit": "Francisco Goya, The Disasters of War, Plate 30, The Metropolitan Museum of Art (CC0), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wilhelm von Kaulbach, 'The Destruction of Jerusalem by Titus' (Die Zerstoerung Jerusalems durch Titus), 1846 — a monumental vision of a capital city consumed by war and fire",
        "excerpt": "Kaulbach's vast canvas stages the fall of Jerusalem as apocalypse: the Temple burns, the sky churns with smoke and avenging figures, and the inhabitants flee, despair, or die among toppling columns. It renders in paint what a bombarded capital feels like from within, the collapse of an entire civic world in a single night of fire, the same dread now visited on Kyiv.",
        "source": "Wilhelm von Kaulbach, Die Zerstoerung Jerusalems durch Titus (The Destruction of Jerusalem by Titus), oil on canvas, 1846, Neue Pinakothek, Munich. Via Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Wilhelm_von_Kaulbach_-_The_Destruction_of_Jerusalem_by_Titus_-_WGA12102.jpg",
        "image": {
          "src": "/covers/russia-kyiv-missile-strike-ten-wounded--a5.png",
          "alt": "Wilhelm von Kaulbach's painting 'The Destruction of Jerusalem by Titus', a burning city with crowds of fleeing and dying figures beneath a stormy, smoke-filled sky.",
          "credit": "Wilhelm von Kaulbach, 1846, Neue Pinakothek, Munich, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "thailand-new-dinosaur-species",
    "headline": "Researchers in Thailand identify Uragasaurus kalasinensis, a long-necked dinosaur as long as a cricket pitch",
    "overview": "Researchers reported on July 11, 2026 that fossils unearthed in Kalasin province in northeastern Thailand belong to a newly identified long-necked dinosaur, Uragasaurus kalasinensis, that lived about 150 million years ago. A CT scan showed the plant-eating sauropod, which measured up to 20 metres — roughly the length of a cricket pitch — belonged to the long-necked Mamenchisauridae family and had an air-cavity bone structure unlike any other dinosaur. It is the first mamenchisaurid found in Thailand, extending the group's known range beyond China.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/crely7g8xepo"
      },
      {
        "name": "Sci.News",
        "href": "https://www.sci.news/paleontology/uragasaurus-kalasinensis-14906.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/thailand-new-dinosaur-species.png",
      "alt": "Towering mounted skeleton of the long-necked sauropod Giraffatitan brancai in the dinosaur hall of the Museum fur Naturkunde, Berlin, its neck arching high above the gallery floor.",
      "credit": "Photograph by Axel Mauruszat, via Wikimedia Commons (Attribution licence)."
    },
    "edition": "Afternoon Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus, The History, Book 1.68 (c. 430 BC) - a classical account of colossal buried bones, like Thailand's sauropod, read as proof of vanished giants",
        "excerpt": "for I, desiring in this enclosure to make a well, lighted in my digging upon a coffin of seven cubits in length; and not believing that ever there had been men larger than those of the present day, I opened it, and I saw that the dead body was equal in length to the coffin: then after I had measured it, I filled in the earth over it again.",
        "source": "Herodotus, The History of Herodotus, Volume 1, Book I, chapter 68, translated by G. C. Macaulay (London: Macmillan, 1890); the Spartan discovery of the giant bones believed to be those of the hero Orestes.",
        "href": "https://www.gutenberg.org/files/2707/2707-h/2707-h.htm"
      },
      {
        "category": "historical",
        "title": "Richard Owen, 'Report on British Fossil Reptiles, Part II' (1842) - the moment a scientist coined the very category the Thai fossils now enlarge",
        "excerpt": "The combination of such characters, some, as the sacral ones, altogether peculiar among Reptiles, others borrowed, as it were, from groups now distinct from each other, and all manifested by creatures far surpassing in size the largest of existing reptiles, will, it is presumed, be deemed sufficient ground for establishing a distinct tribe or sub-order of Saurian Reptiles, for which I would propose the name of Dinosauria.",
        "source": "Richard Owen, 'Report on British Fossil Reptiles, Part II', in Report of the Eleventh Meeting of the British Association for the Advancement of Science, held at Plymouth in July 1841 (London: John Murray, 1842), p. 103 - the naming of Dinosauria.",
        "href": "https://archive.org/details/reportofeleventh42lond"
      },
      {
        "category": "literary",
        "title": "Arthur Conan Doyle, The Lost World (1912) - fiction's vision of a surviving prehistoric monster, echoing the newly resurrected Thai sauropod",
        "excerpt": "There was a full-page picture of the most extraordinary creature that I had ever seen. It was the wild dream of an opium smoker, a vision of delirium. The head was like that of a fowl, the body that of a bloated lizard, the trailing tail was furnished with upward-turned spikes, and the curved back was edged with a high serrated fringe, which looked like a dozen cocks' wattles placed behind each other.",
        "source": "Arthur Conan Doyle, The Lost World (London: Hodder & Stoughton, 1912), the narrator describing the dinosaur sketch in Maple White's book (Project Gutenberg text).",
        "href": "https://www.gutenberg.org/files/139/139-h/139-h.htm"
      },
      {
        "category": "literary",
        "title": "Alfred, Lord Tennyson, In Memoriam A.H.H. (1850) - the 'Dragons of the prime', deep-time monsters of the kind just unearthed in Thailand",
        "excerpt": "No more? A monster then, a dream,\nA discord. Dragons of the prime,\nThat tare each other in their slime,\nWere mellow music match'd with him.",
        "source": "Alfred, Lord Tennyson, In Memoriam A.H.H. (1850), the canto beginning \"So careful of the type?\", stanza on the extinct \"Dragons of the prime\" (Wikisource, transcribed from the scanned edition).",
        "href": "https://en.wikisource.org/wiki/In_Memoriam_(Tennyson)/Canto_55"
      },
      {
        "category": "artistic",
        "title": "Henry De la Beche, Duria Antiquior - A More Ancient Dorset (1830) - the first painting to bring a prehistoric world alive, as the Thai find revives an ancient one",
        "excerpt": "Painted in 1830 from the Lyme Regis fossils of Mary Anning, this watercolour is regarded as the first pictorial reconstruction of prehistoric life: a crowded, violent sea in which ichthyosaurs snap at plesiosaurs, pterosaurs wheel overhead and ammonites drift below, giving deep time a landscape and turning bare bones into living, breathing creatures.",
        "source": "Henry De la Beche, Duria Antiquior (A More Ancient Dorset), watercolour, 1830, National Museum Cardiff; via Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Duria_Antiquior.jpg",
        "image": {
          "src": "/covers/thailand-new-dinosaur-species--a4.png",
          "alt": "Henry De la Beche's 1830 watercolour Duria Antiquior, showing a teeming prehistoric Dorset sea with ichthyosaurs, plesiosaurs, pterosaurs and other extinct creatures based on Mary Anning's fossils.",
          "credit": "Henry De la Beche, Duria Antiquior (1830), National Museum Cardiff, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saens, 'Fossiles' from Le carnaval des animaux (1886) - music that makes old bones rattle back to life, like the reassembled Thai skeleton",
        "excerpt": "In the twelfth movement of his Carnival of the Animals, Saint-Saens sets a xylophone clacking like dry bones, quoting his own Danse macabre alongside snatches of old tunes so that long-dead 'fossils' seem to dance again - a witty musical resurrection of the ancient dead that mirrors a buried sauropod raised once more to public view.",
        "source": "Camille Saint-Saens, 'Fossiles', No. 12 of Le carnaval des animaux (1886); public-domain score on IMSLP/Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)"
      }
    ],
    "rank": 17
  },
  {
    "slug": "us-citizen-congo-ebola-case",
    "headline": "US aid worker in Democratic Republic of Congo tests positive for Ebola, CDC says",
    "overview": "The US Centers for Disease Control and Prevention said on July 11, 2026 that an American working for a humanitarian group in the Democratic Republic of Congo had tested positive for the Bundibugyo strain of the Ebola virus. The CDC said it was working with the person's employer, other federal agencies and partners in the DRC to trace high-risk contacts and prevent further spread, and that no cases had been confirmed in the United States. The case comes amid a wider Ebola outbreak in the country.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxPLXYxZnBYby1GYk9jWEp4czFxdFhyaTlFSEVTZHBoZENRakIzSXhFczZFWERQYl96OVpjVmNrRGN0S2xpNDVweElCZjllZTNVUXZpR25GYXRpMWRJMm1Wci04aUN2MVc5MjFWREdfaGV1UUZoM01neExuZVRXdGFkVU9iQW5zbEJtSmRwVHZJZXo0X0Y0cUsxM3JhUF9KSFVHM3B4dGVsTXVjV1hKalR4SzlCOGdsRGlIM1IxY1VhU3UteHhUYkE?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/11/africa/us-citizen-tests-positive-ebola-bundibugyo-drc-hnk-intl"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/us-citizen-congo-ebola-case.png",
      "alt": "Colorized transmission electron micrograph showing the thread-like, shepherd's-crook morphology of a single Ebola virus virion.",
      "credit": "Cynthia Goldsmith / CDC Public Health Image Library (#10816). Public domain (U.S. Centers for Disease Control and Prevention), via Wikimedia Commons."
    },
    "edition": "Afternoon Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides, History of the Peloponnesian War, Book II (c. 430 BCE) — the Plague of Athens, antiquity's first clinical eyewitness of an epidemic engulfing a society, as Ebola now surfaces in Congo",
        "excerpt": "people in good health were all of a sudden attacked by violent heats in the head, and redness and inflammation in the eyes, the inward parts, such as the throat or tongue, becoming bloody and emitting an unnatural and fetid breath.",
        "source": "Thucydides, History of the Peloponnesian War, Book II, ch. 49 (trans. Richard Crawley). Via Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "The 1976 Yambuku outbreak — the first recorded Ebola epidemic, in the very Congo region where a US citizen has now tested positive",
        "excerpt": "In the autumn of 1976 a lethal new fever erupted around the mission hospital of Yambuku in northern Zaire, now the Democratic Republic of Congo, and gave the Ebola River its grim namesake. Reused needles and unprotected care spread the virus through the wards and to mourners at funerals, killing roughly nine in ten of the 318 people it struck. Half a century later the same forested basin remains the world's epicentre of Ebola emergence, the backdrop against which today's CDC announcement of an infected American must be read.",
        "source": "International Commission, \"Ebola haemorrhagic fever in Zaire, 1976,\" Bulletin of the World Health Organization, 1978;56(2):271–293.",
        "href": "https://pubmed.ncbi.nlm.nih.gov/307456/"
      },
      {
        "category": "literary",
        "title": "Giovanni Boccaccio, The Decameron, Introduction (c. 1353) — the Black Death in Florence, literature's foundational chronicle of a community engulfed by a lethal contagion",
        "excerpt": "in men and women alike there appeared, at the beginning of the malady, certain swellings, either on the groin or under the armpits, whereof some waxed of the bigness of a common apple, others like unto an egg, some more and some less, and these the vulgar named plague-boils.",
        "source": "Giovanni Boccaccio, The Decameron, \"Introduction\" (trans. John Payne). Via Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, \"The Masque of the Red Death\" (1842) — a haemorrhagic pestilence that bleeds its victims 'at the pores,' eerily prefiguring Ebola's own bleeding fever",
        "excerpt": "The \"Red Death\" had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal—the redness and the horror of blood. There were sharp pains, and sudden dizziness, and then profuse bleeding at the pores, with dissolution.",
        "source": "Edgar Allan Poe, \"The Masque of the Red Death\" (1842). Via Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder, \"The Triumph of Death\" (c. 1562) — an army of the dead overrunning the living, painting's grand panorama of a plague sweeping across a whole land",
        "excerpt": "Bruegel unfurls a scorched, corpse-strewn landscape in which skeleton legions drive the living toward a giant coffin, sparing neither king nor peasant. Nets, carts and open graves turn the mass death of the plague into a single unstoppable machine. It renders in paint the terror an epidemic like Ebola still evokes: contagion as a force that respects no rank and admits no escape.",
        "source": "Pieter Bruegel the Elder, The Triumph of Death, c. 1562, oil on panel, Museo del Prado, Madrid. Via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Triumph_of_Death_-_WGA3389.jpg",
        "image": {
          "src": "/covers/us-citizen-congo-ebola-case--a4.png",
          "alt": "Bruegel's panoramic painting of skeleton armies driving the living toward death across a barren, fire-lit landscape.",
          "credit": "Pieter Bruegel the Elder, The Triumph of Death (c. 1562), Museo del Prado, Madrid. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin, \"The Plague\" (1898) — Death riding a winged beast through a stricken town, a symbolist vision of contagion that mirrors the Ebola now stalking Congo",
        "excerpt": "Böcklin sends Death, scythe raised, sweeping down a narrow medieval street astride a bat-winged monster, its wake sickly with the pale greens of decay. Bodies crumple in the gutters as the living recoil, powerless before the passing figure. The image distils an epidemic to a single dreadful visitor moving unstoppably from house to house, the same dread that a positive Ebola test in an outbreak zone reawakens.",
        "source": "Arnold Böcklin, The Plague (Die Pest), 1898, tempera on fir wood, Kunstmuseum Basel. Via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/us-citizen-congo-ebola-case--a5.png",
          "alt": "Symbolist painting of Death astride a winged creature sweeping down a medieval street, the living collapsing in its path amid sickly green tones.",
          "credit": "Arnold Böcklin, The Plague (1898), Kunstmuseum Basel. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "platner-withdraws-maine-senate",
    "headline": "Graham Platner withdraws from Maine's Democratic Senate primary after an assault allegation",
    "overview": "Graham Platner, a Maine oyster farmer who had been a leading Democratic contender, formally withdrew from the state's US Senate race on July 11, 2026, days after a woman he previously dated accused him of sexual assault, an allegation he denied. The Maine Democratic Party said it would hold a nominating convention to choose a replacement before a July 27 deadline to field a candidate against Republican Senator Susan Collins in November. Several Democrats, including former state Senate president Troy Jackson and Secretary of State Shenna Bellows, launched bids.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMikAFBVV95cUxOemlPZlZNWnlEalI4aURqeU96Rmd0UFkyNlZJZjdjQkRBLW40M2FYY29RRTN6UWNpcU1aRHJOeDFLTjVmMTFNb21aYU5pdDBfbV9VVXdhN1N0UnJ5eWpCbTJIZ2lYUjZQS2xiNVdiMTlpVDdqeGk3aHpCWUhhTFdpNHRnVVB1Mlh1VWw2YkVRX18?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://www.nbcnews.com/politics/2026-election/graham-platner-officially-drops-maine-senate-race-rcna385842"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/platner-withdraws-maine-senate.png",
      "alt": "Exterior of the Maine State House in Augusta, Maine, the granite-domed seat of state government where the Democratic Party will convene to name a new US Senate nominee.",
      "credit": "Photo by Wikimedia Commons user 'Albany NY' (2004), licensed CC BY-SA 3.0 / GFDL, via Wikimedia Commons."
    },
    "edition": "Afternoon Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Livy, 'Ab Urbe Condita' (The History of Rome), Book III (c. 27 BCE) — Cincinnatus lays down the dictatorship and returns to his plough, the classic model of relinquishing power that Platner's exit echoes",
        "excerpt": "Quintius laid down his dictatorship on the sixteenth day, having received it for six months.",
        "source": "Livy, Ab Urbe Condita (The History of Rome), Book III, ch. 29, trans. Rev. Canon Roberts, Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0145:book=3:chapter=29"
      },
      {
        "category": "historical",
        "title": "George Washington, 'Farewell Address' (19 September 1796) — the President declines to be a candidate for a further term, voluntarily stepping aside from a contest for power",
        "excerpt": "I should now apprize you of the resolution I have formed, to decline being considered among the number of those out of whom a choice is to be made.",
        "source": "George Washington, Farewell Address, 19 September 1796, first printed in Claypoole's American Daily Advertiser; text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/George_Washington%27s_Farewell_Address"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, 'Richard II', Act IV, Scene 1 (c. 1595) — the deposition scene, in which Richard yields crown and sceptre with his own hands, a poetic image of surrendering a contested office",
        "excerpt": "Now mark me, how I will undo myself; / I give this heavy weight from off my head, / And this unwieldy sceptre from my hand, / The pride of kingly sway from out my heart; / With mine own tears I wash away my balm, / With mine own hands I give away my crown,",
        "source": "William Shakespeare, The Tragedy of King Richard the Second, Act IV, Scene 1; The Complete Works of William Shakespeare, MIT (Moby/Globe edition).",
        "href": "http://shakespeare.mit.edu/richardii/richardii.4.1.html"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, 'The Tempest', Act V, Scene 1 (c. 1611) — Prospero abjures his rough magic, breaking his staff and drowning his book, a voluntary renunciation of the power he has wielded",
        "excerpt": "But this rough magic / I here abjure, and, when I have required / Some heavenly music, which even now I do, / To work mine end upon their senses that / This airy charm is for, I'll break my staff, / Bury it certain fathoms in the earth, / And deeper than did ever plummet sound / I'll drown my book.",
        "source": "William Shakespeare, The Tempest, Act V, Scene 1; The Complete Works of William Shakespeare, MIT (Moby/Globe edition).",
        "href": "http://shakespeare.mit.edu/tempest/tempest.5.1.html"
      },
      {
        "category": "artistic",
        "title": "Juan Antonio de Ribera, 'Cincinnatus Leaves the Plough to Dictate Laws to Rome' (c. 1806) — a neoclassical canvas of the citizen who takes up and then lays down power, visualizing the ideal of stepping aside that frames Platner's withdrawal",
        "excerpt": "Ribera's neoclassical scene freezes the moment the summons reaches Cincinnatus at his farm: the plough and oxen wait in shadow while the emissaries of Rome extend the robes and fasces of the dictatorship. The composition holds power and the plain life of the fields in balance, quietly insisting that the greater virtue lies in giving authority back rather than clutching it.",
        "source": "Juan Antonio de Ribera y Fernandez, oil on canvas, 160 x 215 cm, c. 1806, Museo Nacional del Prado, Madrid. Public domain.",
        "href": "https://commons.wikimedia.org/wiki/File:Cincinato_abandona_el_arado_para_dictar_leyes_a_Roma,_c.1806_de_Juan_Antonio_Ribera.jpg",
        "image": {
          "src": "/covers/platner-withdraws-maine-senate--a4.png",
          "alt": "Neoclassical painting showing Cincinnatus at his plough being offered the robes and insignia of Roman power by envoys, with oxen and farmland behind him.",
          "credit": "Juan Antonio de Ribera, 'Cincinnatus Leaves the Plough to Dictate Laws to Rome', c. 1806, Museo del Prado; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "John Trumbull, 'General George Washington Resigning His Commission' (1824) — the founding image of a victorious leader handing power back to a civil body, the modern counterpart to Cincinnatus and to Platner's yielding of his candidacy",
        "excerpt": "Trumbull stages the hush of the Annapolis State House as Washington, upright before the seated Congress, returns the commission that made him commander-in-chief. Light falls on the surrendered document rather than on the general, turning an act of self-effacement into the painting's true subject and offering, as Trumbull put it, one of the highest moral lessons ever given to the world.",
        "source": "John Trumbull, oil on canvas, 12 x 18 ft, commissioned 1817, completed 1824, United States Capitol Rotunda, Washington, D.C. Public domain.",
        "href": "https://commons.wikimedia.org/wiki/File:General_George_Washington_Resigning_his_Commission.jpg",
        "image": {
          "src": "/covers/platner-withdraws-maine-senate--a5.png",
          "alt": "Large history painting of George Washington standing before the Continental Congress at Annapolis in 1783, handing over a document to resign his military commission.",
          "credit": "John Trumbull, 'General George Washington Resigning His Commission', 1824, U.S. Capitol Rotunda; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "north-korea-condemns-nato-summit",
    "headline": "North Korea condemns NATO summit and says denuclearization should start with US allies",
    "overview": "North Korea condemned the recent NATO summit on July 11, 2026, accusing the United States and its allies of strengthening military blocs and accelerating an arms buildup. Pyongyang rejected calls for its own disarmament, arguing that any denuclearization should begin instead with US allies such as South Korea and Japan and with NATO's nuclear-sharing arrangements. State media said the North had decided to strengthen its nuclear forces 'quantitatively and qualitatively.'",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQSlFCZkl3eDFNVGZZcUZVSXFrR1V2cUhjaU43dFBRcGZVcHlKd2RJVXFZTTBPR0VjWXYwWGhXMExXVUFGTjI3aDNZQmxVcHRhdWRRenRFU0xmX1VycVRDTFRjRlcxUnJXOHJuMzktWjQyd2JBUWxHNmVjY3lxQTlIakdpT1lJSmhEWVRILXJ1Y3pqTE1Ga0V3UHZ6SWxpMHFWUXNhRUt5U2p5U2ptTjRVSExmZFVVN3VvZWhtYVJ6NlU?oc=5"
      },
      {
        "name": "U.S. News & World Report",
        "href": "https://www.usnews.com/news/world/articles/2026-07-10/north-korea-condemns-us-allies-after-nato-summit-vows-to-safeguard-sovereignty"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/north-korea-condemns-nato-summit.png",
      "alt": "A North Korean ballistic missile mounted on a mobile transporter-erector-launcher rolls through a Victory Day military parade in Pyongyang.",
      "credit": "Photo by Stefan Krasowski, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thucydides, History of the Peloponnesian War, Book 1 (5th century BC) — the rival Delian and Peloponnesian Leagues, where Sparta's alarm at rising Athenian power hardened two blocs toward war, much as NATO and Pyongyang trade accusations across a divided world",
        "excerpt": "The growth of the power of Athens, and the alarm which this inspired in Lacedaemon, made war inevitable.",
        "source": "Thucydides, History of the Peloponnesian War, Book 1, section 23, translated by Richard Crawley (1874).",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1"
      },
      {
        "category": "historical",
        "title": "The Cuban Missile Crisis, October 1962 — two nuclear-armed blocs each demanding that the other pull back its missiles first, the disarmament ultimatum turned back on the accuser just as North Korea now demands the West denuclearize first",
        "excerpt": "In October 1962 the United States and the Soviet Union stood at the edge of nuclear war over missiles in Cuba, each superpower insisting the other stand down first. Washington demanded the Soviets dismantle the launchers on the island; Moscow answered that any deal must also strip American Jupiter missiles from Turkey. The confrontation showed how a call to disarm can be flung straight back at the one who issues it, leaving both sides pointing at each other's weapons.",
        "source": "U.S. Department of State, Office of the Historian, \"The Cuban Missile Crisis, October 1962.\"",
        "href": "https://history.state.gov/milestones/1961-1968/cuban-missile-crisis"
      },
      {
        "category": "literary",
        "title": "The Gospel of John, chapter 8, King James Version (1611) — \"let him who is without sin cast the first stone,\" the accusation turned back upon the accusers, the same rhetorical reversal Pyongyang aims at its critics",
        "excerpt": "So when they continued asking him, he lifted up himself, and said unto them, He that is without sin among you, let him first cast a stone at her.",
        "source": "The Holy Bible, King James Version, Gospel of John, chapter 8, verse 7.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/John"
      },
      {
        "category": "literary",
        "title": "Thucydides, the Melian Dialogue, History of the Peloponnesian War, Book 5 (c. 416 BC) — the Athenian creed that between unequal powers might alone dictates right, the cold logic underlying every demand that the weaker side disarm",
        "excerpt": "since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5 (the Melian Dialogue), translated by Richard Crawley.",
        "href": "https://man.fas.org/melian.htm"
      },
      {
        "category": "artistic",
        "title": "Vasily Vereshchagin, \"The Apotheosis of War\" (1871) — a pyramid of skulls dedicated \"to all great conquerors, past, present and to come,\" an emblem of where rival war-making finally leads",
        "excerpt": "Vereshchagin heaps a pyramid of human skulls on a scorched plain before a ruined city, crows wheeling over the empty eye sockets. Rather than glorify a victor, the canvas indicts every conqueror at once, its dedication mocking the ambition of all who make war. It stands as a wordless verdict on the arms races and mutual threats that leave only bone behind.",
        "source": "Vasily Vereshchagin, The Apotheosis of War, 1871, oil on canvas, Tretyakov Gallery, Moscow.",
        "href": "https://commons.wikimedia.org/wiki/File:Vasily_Vereshchagin_-_%D0%90%D0%BF%D0%BE%D1%84%D0%B5%D0%BE%D0%B7_%D0%B2%D0%BE%D0%B9%D0%BD%D1%8B_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/north-korea-condemns-nato-summit--a4.png",
          "alt": "Oil painting of a tall pyramid of human skulls on a barren, sun-bleached plain before a ruined city, with crows circling and perched among the bones.",
          "credit": "Vasily Vereshchagin, 1871, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Pyotr Tchaikovsky, \"1812 Overture,\" Op. 49 (1880) — rival national themes colliding amid cannon fire, a score that stages the very clash of armed powers now echoing between NATO and Pyongyang",
        "excerpt": "Tchaikovsky sets two national musics against each other, letting the French anthem surge forward only to be answered and overwhelmed by Russian hymn and folk melody. The orchestra swells into bell peals and live cannon fire, dramatizing the collision of two great armed powers as sheer sound. It turns a standoff of empires into a spectacle of noise, triumph, and destruction.",
        "source": "Pyotr Ilyich Tchaikovsky, Ouverture solennelle \"1812,\" Op. 49 (composed 1880).",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      }
    ],
    "rank": 20
  },
  {
    "slug": "kushner-albania-resort-fake-deeds",
    "headline": "Businessman who sold land for a Kushner-backed resort in Albania is suspected of faking the deeds",
    "overview": "A Miami-based businessman, Artur Shehu, who is wanted in Albania over alleged drug-money laundering, is suspected of faking the deeds to a strip of coastline sold for a multibillion-dollar resort backed by Jared Kushner's firm, according to case files reviewed by Reuters and reported on July 11, 2026. Prosecutors wrote that there were 'reasonable suspicions' the assets had been acquired using forged documents; Shehu denies wrongdoing. The files make no allegation against Kushner or the resort's developers, and Reuters found no sign investors knew of the suspicions when they bought the land in April.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxOSlNmN2luQVhJdF9FcU1XWGUxSTBLdWhiUHZsd09wdllLUGJmRHlacGVPTmNMaVdTV0lyNEJzV3RrWEIyTzlHSkhJV0VCcVdzLUl3SnlFNm8tMVF2dUR6RnZJeEJxOG5SbHU0TUlRM0FMMkdKbHZLU2xCY2o3QWxBNFFuczFucm44dkxObks0bGpVXzN3d0s4alJqSEc2WDdtWlpoMTZheGVyMlU2ZDB4ZXZBZWJScV8wLTRBTw?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/jared-kushner-albania-development-land-artur-shehu-money-laundering-drug-trafficking/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/kushner-albania-resort-fake-deeds.png",
      "alt": "Turquoise Ionian Sea water and a pebble beach hemmed by steep rocky cliffs on the Albanian Riviera coast at Gjipe, Albania.",
      "credit": "Gjipe beach on the Albanian Ionian coast. Photo by Pudelek (Marcin Szala), CC BY-SA 3.0, via Wikimedia Commons."
    },
    "edition": "Afternoon Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Donation of Constantine (8th-century forgery), exposed in Lorenzo Valla's treatise (1440), trans. Christopher B. Coleman (1922) — the archetypal forged deed that gave away lands and property that were never Constantine's to grant",
        "excerpt": "It purports to reproduce a legal document in which the Emperor Constantine the Great, reciting his baptism and the cure of his leprosy at the hands of Sylvester, Bishop of Rome 314-336, confirmed the privilege of that pontiff as head of all the clergy and supreme over the other four patriarchates; conferred upon him extensive imperial property in various parts of the world, especially the imperial Lateran palace, and the imperial diadem and tiara, and other imperial insignia.",
        "source": "Christopher B. Coleman, The Treatise of Lorenzo Valla on the Donation of Constantine: Text and Translation into English (New Haven: Yale University Press, 1922), Introduction.",
        "href": "https://www.gutenberg.org/files/70092/70092-h/70092-h.htm"
      },
      {
        "category": "historical",
        "title": "The South Sea Bubble (1720), from Charles Mackay's Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841) — a paper fortune sold on a promise nobody was allowed to inspect, then vanished",
        "excerpt": "Next morning, at nine o'clock, this great man opened an office in Cornhill. Crowds of people beset his door, and when he shut up at three o'clock, he found that no less than one thousand shares had been subscribed for, and the deposits paid. He was thus, in five hours, the winner of 2,000 l. He was philosopher enough to be contented with his venture, and set off the same evening for the Continent. He was never heard of again.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (London, 1841), chapter 'The South-Sea Bubble.'",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm"
      },
      {
        "category": "literary",
        "title": "Dead Souls by Nikolai Gogol (1842), trans. D. J. Hogarth — Chichikov buys serfs who are dead but still on the tax rolls, conjuring valuable property out of nothing but paper",
        "excerpt": "\"All that I am proposing to do,\" replied Chichikov, \"is to purchase the dead peasants who, at the last census, were returned by you as alive.\"",
        "source": "Nikolai Gogol, Dead Souls, trans. D. J. Hogarth (first published 1842).",
        "href": "https://www.gutenberg.org/files/1081/1081-h/1081-h.htm"
      },
      {
        "category": "literary",
        "title": "Inferno, Canto XXX by Dante Alighieri (c. 1320), trans. Henry Wadsworth Longfellow — Master Adam the coiner damned forever among the falsifiers for counterfeiting Florence's gold florin",
        "excerpt": "There is Romena, where I counterfeited\nThe currency imprinted with the Baptist,\nFor which I left my body burned above.",
        "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto XXX, trans. Henry Wadsworth Longfellow.",
        "href": "https://www.danteinferno.info/translations/canto30.html"
      },
      {
        "category": "artistic",
        "title": "The Moneylender and His Wife by Quentin Matsys (1514), Musee du Louvre — a money-changer weighs gold at his scales while his wife's eyes stray from her prayer-book to the coins, the emblem of gain over honesty",
        "excerpt": "Matsys sets a money-changer at his scales, his fingers testing the weight of gold coins and pearls heaped on the table, while his wife lets her illuminated prayer-book fall open, her gaze pulled sideways to the glint of money. A small convex mirror on the ledge catches a tiny reflected figure at a window, drawing the viewer straight into the transaction. The panel became the archetypal Northern image of avarice and crooked dealing dressed in the sober robes of respectable trade.",
        "source": "Quentin Matsys, The Moneylender and His Wife, 1514, oil on panel, 70.5 x 67 cm, Musee du Louvre, Paris (INV 1444).",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/kushner-albania-resort-fake-deeds--a4.png",
          "alt": "Renaissance oil painting of a money-changer weighing gold coins on a balance while his wife, holding an illuminated prayer-book, watches the money; a small convex mirror sits on the table.",
          "credit": "Quentin Matsys, 'The Moneylender and His Wife' (1514), Louvre. Public domain, via Wikimedia Commons (The Yorck Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Gianni Schicchi by Giacomo Puccini (1918) — a one-act opera in which a quick-witted schemer impersonates a freshly dead man to dictate a forged will and redirect the whole estate to himself",
        "excerpt": "Puccini's comic opera, drawn from a shade in Dante's Inferno, turns document fraud into farce: with the wealthy Buoso Donati newly dead and his will leaving everything to a monastery, the crafty Gianni Schicchi climbs into the deathbed and impersonates the corpse before a summoned notary. Dictating a fresh will in the dead man's voice, he bequeaths the choicest house, mule and mills to himself while the greedy relatives look on, powerless to protest. The score's radiant aria 'O mio babbino caro' floats above what is, at heart, the forging of a dead man's deed of inheritance.",
        "source": "Giacomo Puccini, Gianni Schicchi (opera in one act), libretto by Giovacchino Forzano, premiered Metropolitan Opera, New York, 14 December 1918.",
        "href": "https://imslp.org/wiki/Gianni_Schicchi_(Puccini,_Giacomo)"
      }
    ],
    "rank": 21
  },
  {
    "slug": "alberta-separatism-calgary-stampede",
    "headline": "Alberta separation push takes centre stage at the Calgary Stampede ahead of an October referendum",
    "overview": "As Canada's biggest rodeo, the Calgary Stampede, got under way in July 2026, a campaign to pull the oil-rich province of Alberta out of Canada dominated conversation and stirred division across the rodeo circuit. Alberta will hold a non-binding referendum on October 19 — the first province outside Quebec to put separation to voters — asking whether the government should begin the legal process toward a future independence vote. Prime Minister Mark Carney, who has sought to ease Alberta's grievances over federal energy policy, is attending the Stampede.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c3eykgln5eeo"
      },
      {
        "name": "Reuters (U.S. News)",
        "href": "https://www.usnews.com/news/world/articles/2026-07-01/albertas-separatism-debate-jostles-summer-rodeo-scene"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/alberta-separatism-calgary-stampede.png",
      "alt": "Chuckwagon teams thundering around the track during the GMC Rangeland Derby at the Calgary Stampede, dust flying as the horses charge past the grandstand.",
      "credit": "Photo by Daniel (Glasgow, UK), \"GMC Rangeland Derby\" (chuckwagon race, 2017 Calgary Stampede). Licensed CC BY 2.0, via Wikimedia Commons."
    },
    "edition": "Afternoon Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Declaration of the Immediate Causes Which Induce and Justify the Secession of South Carolina from the Federal Union (South Carolina Secession Convention, 1860) - a state voting itself out of a union, the very step Alberta separatists now urge",
        "excerpt": "We, therefore, the People of South Carolina, by our delegates in Convention assembled, appealing to the Supreme Judge of the world for the rectitude of our intentions, have solemnly declared that the Union heretofore existing between this State and the other States of North America, is dissolved, and that the State of South Carolina has resumed her position among the nations of the world, as a separate and independent State; with full power to levy war, conclude peace, contract alliances, establish commerce, and to do all other acts and things which independent States may of right do.",
        "source": "Declaration of the Immediate Causes Which Induce and Justify the Secession of South Carolina from the Federal Union, adopted December 24, 1860. The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/19th_century/csa_scarsec.asp"
      },
      {
        "category": "historical",
        "title": "The First Secession of the Plebs, from Livy's History of Rome, Book II (Livy, written c. 27-9 BC; events of 494 BC) - an ancient people physically walking out of the state to win their demands, prefiguring Alberta's threat to leave",
        "excerpt": "they decided, at the instigation of a certain Sicinius, to ignore the consuls and withdraw to the Sacred Mount, which lay on the other side of the Anio, three miles from the City.",
        "source": "Livy, The History of Rome (From the Founding of the City), Book II, ch. 32, translated by Rev. Canon Roberts (public domain). Via Wikisource.",
        "href": "https://en.wikisource.org/wiki/From_the_Founding_of_the_City/Book_2"
      },
      {
        "category": "literary",
        "title": "House Divided Speech (Abraham Lincoln, Springfield, Illinois, 1858) - a warning that a country split against itself cannot endure, echoing the clashing loyalties on display at the Stampede",
        "excerpt": "\"A house divided against itself cannot stand.\" I believe this government cannot endure permanently half slave and half free.",
        "source": "Abraham Lincoln, \"A House Divided\" speech, Springfield, Illinois, June 16, 1858. Via Wikisource (Life and Works of Abraham Lincoln, Vol. 4).",
        "href": "https://en.wikisource.org/wiki/Life_and_Works_of_Abraham_Lincoln/Volume_4/A_House_Divided_Against_Itself_Cannot_Stand"
      },
      {
        "category": "literary",
        "title": "Pioneers! O Pioneers! (Walt Whitman, Leaves of Grass, 1865/1882) - the frontier-freedom and Western self-reliance that Alberta separatists claim as their own inheritance",
        "excerpt": "Come my tan-faced children,\nFollow well in order, get your weapons ready,\nHave you your pistols? have you your sharp-edged axes?\nPioneers! O pioneers!",
        "source": "Walt Whitman, \"Pioneers! O Pioneers!\", Leaves of Grass (1882 edition), Birds of Passage; first published in Drum-Taps, 1865. Via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Leaves_of_Grass_(1882)/Birds_of_Passage/Pioneers!_O_Pioneers!"
      },
      {
        "category": "artistic",
        "title": "A Dash for the Timber (Frederic Remington, 1889) - Western riders in a headlong, defiant charge, the frontier-cowboy iconography the Calgary Stampede and the separation fight both invoke",
        "excerpt": "Eight armed cowboys gallop straight at the viewer, spurring their horses in a desperate flight toward a distant line of timber while pursuers close in behind. Remington freezes the moment in a haze of dust and gun smoke, every rein and rifle taut with motion. It became the definitive image of the American West as a place of ungovernable independence and self-reliance - the mythology Alberta's separatists now wrap around their own cause.",
        "source": "Frederic Remington, A Dash for the Timber, 1889, oil on canvas, Amon Carter Museum of American Art, Fort Worth (acc. 1961.381). Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:A_Dash_for_the_Timber_by_Frederic_Remington.jpg",
        "image": {
          "src": "/covers/alberta-separatism-calgary-stampede--a4.png",
          "alt": "Frederic Remington's 1889 painting A Dash for the Timber: eight cowboys on horseback gallop directly toward the viewer through dust, firing at unseen pursuers, racing for a distant stand of trees.",
          "credit": "Frederic Remington, \"A Dash for the Timber\" (1889), Amon Carter Museum of American Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Home on the Range (words by Brewster M. Higley, music by Daniel E. Kelley, 1870s) - the anthem of open range and Western belonging, whose imagery of a boundless prairie home animates Alberta's frontier identity",
        "excerpt": "A wistful cowboy waltz born on the Kansas prairie, this folk song became the enduring hymn of the open Western range - a place where the deer and the antelope roam and no discouraging word is heard. Its gentle melody idealizes a self-contained homeland under a wide sky, the same pastoral vision of independence that Alberta's rural West summons in its quarrel with distant central authority. The IMSLP edition presents a modern brass arrangement by Michel Rondeau of the public-domain tune.",
        "source": "\"Home on the Range,\" words by Brewster M. Higley (1873), music by Daniel E. Kelley; arrangement for brass by Michel Rondeau. Via IMSLP (International Music Score Library Project).",
        "href": "https://imslp.org/wiki/Home_on_the_Range_(Rondeau,_Michel)"
      }
    ],
    "rank": 22
  },
  {
    "slug": "peter-falconio-killer-interrogation-video",
    "headline": "Australian police release the final prison interrogation of Peter Falconio's killer, Bradley Murdoch",
    "overview": "Australian police on July 11, 2026 released bodycam footage of the final prison interview of Bradley John Murdoch, convicted of murdering British backpacker Peter Falconio in the Northern Territory outback in 2001, in a renewed appeal to find Falconio's remains. Officers recorded the interview at the Alice Springs Correctional Centre in June 2025, weeks before Murdoch died of throat cancer; in it he refused to view a message from Falconio's family or say where the body lay. Falconio's remains have never been found.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/videos/c0rylp72p9ro"
      },
      {
        "name": "SBS News",
        "href": "https://www.sbs.com.au/news/article/bradley-john-murdochs-last-interview-peter-falconio/hcqupgqoo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/peter-falconio-killer-interrogation-video.png",
      "alt": "A long, empty stretch of the Stuart Highway running dead-straight through the flat, arid Australian outback under a wide pale sky.",
      "credit": "Felix Dance, 'The long Stuart Highway' (2016). CC BY 2.0 via Wikimedia Commons."
    },
    "edition": "Afternoon Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plutarch, 'On Talkativeness' (De garrulitate), c. 1st century AD — the murderers of Ibycus, betrayed by their own guilty tongues long after the killing",
        "excerpt": "Were not the murderers of Ibycus caught in the same way? They were sitting in a theatre, and when cranes came in sight, they laughed and whispered to each other that the avengers of Ibycus were come.",
        "source": "Plutarch, Moralia, 'Concerning Talkativeness' (De garrulitate), section 14, trans. W. C. Helmbold, Loeb Classical Library (1939); copyright expired and not renewed, now public domain.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Moralia/De_garrulitate*.html"
      },
      {
        "category": "historical",
        "title": "Ned Kelly, 'The Jerilderie Letter' (dictated 1879) — the outback bushranger's defiant confession-manifesto, written the year before his 1880 capture",
        "excerpt": "I would manure the Eleven mile with their bloated carcasses and yet remember there is not one drop of murderous blood in my Veins.",
        "source": "Ned Kelly, The Jerilderie Letter (dictated to Joe Byrne, 1879), transcribed at Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Jerilderie_Letter"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, 'The Tell-Tale Heart' (1843) — a killer who hides the body then breaks under conscience and confesses",
        "excerpt": "\"Villains!\" I shrieked, \"dissemble no more! I admit the deed!—tear up the planks!—here, here!—it is the beating of his hideous heart!\"",
        "source": "Edgar Allan Poe, 'The Tell-Tale Heart' (1843), in Mystery Tales of Edgar Allan Poe, via Wikisource (public domain).",
        "href": "https://en.wikisource.org/wiki/Mystery_Tales_of_Edgar_Allan_Poe/The_Tell-Tale_Heart"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, 'Macbeth' (c. 1606), Act 5, Scene 1 — Lady Macbeth's sleepwalking guilt, the blood that will not wash off",
        "excerpt": "What, will these hands ne'er be clean?",
        "source": "William Shakespeare, Macbeth, Act 5, Scene 1 (Lady Macbeth's sleepwalking scene), Folger Shakespeare Library digital text.",
        "href": "https://www.folger.edu/explore/shakespeares-works/macbeth/read/5/1/"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, 'Country Road in Provence by Night' (1890) — a lone road swallowed by the dark, echoing the desolate highway where the crime occurred",
        "excerpt": "Under a swirling night sky, a single road cuts through the Provencal dark, flanked by a flame-like cypress and lit only by a crescent moon and one great yellow star. Two small figures walk the empty road while a lone cart trails behind, dwarfed by the vast, indifferent night. The lonely nocturnal track mirrors the outback highway on which Peter Falconio vanished, and the darkness that never gave up its secret.",
        "source": "Vincent van Gogh, 'Country Road in Provence by Night' (May 1890), oil on canvas, Kroller-Muller Museum, Otterlo. Public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Country_road_in_Provence_by_night.jpg",
        "image": {
          "src": "/covers/peter-falconio-killer-interrogation-video--a4.png",
          "alt": "Van Gogh painting of a lone country road at night beneath a swirling sky with a crescent moon and a large star, a dark flame-shaped cypress rising beside the road, and two small figures walking.",
          "credit": "Vincent van Gogh, 'Country Road in Provence by Night' (1890), Kroller-Muller Museum. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Franz Schubert, 'Erlkonig,' D. 328 (1815) — a fatal night-ride ballad whose galloping dread mirrors a killing on a lonely road at night",
        "excerpt": "Schubert sets Goethe's ballad of a father galloping through the night with his dying child, the piano's relentless triplets pounding like hooves on an empty road while a spectral voice lures the boy toward death. The desperate ride ends with the child already dead in his father's arms, a journey through darkness that arrives only at loss. Its breathless nocturnal terror evokes the fatal night on the outback highway and a life carried off into the dark.",
        "source": "Franz Schubert, 'Erlkonig,' D. 328 (Op. 1), composed 1815; score via IMSLP / Petrucci Music Library (public domain).",
        "href": "https://imslp.org/wiki/Erlk%C3%B6nig,_D.328_(Schubert,_Franz)"
      }
    ],
    "rank": 23
  },
  {
    "slug": "buckingham-palace-salon-style-rehang",
    "headline": "Buckingham Palace doubles its Picture Gallery display with a salon-style rehang of 120 works",
    "overview": "Buckingham Palace unveiled a salon-style rehang of its Picture Gallery for the summer of 2026, nearly doubling the paintings on view from 63 to 120 by stacking them frame-to-frame from floor to ceiling against emerald-green silk damask. The once-in-a-generation redisplay, undertaken at the direction of King Charles III, revives an 18th- and 19th-century fashion and clusters masterworks by Rembrandt, Rubens and Caravaggio. The King's Gallery said the denser hang lets it show far more of the Royal Collection to the roughly half a million people who visit each year.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/buckingham-palace-embraces-salon-style-hang-1234754336/"
      },
      {
        "name": "The Art Newspaper",
        "href": "https://www.theartnewspaper.com/2026/07/08/buckingham-palace-doubles-number-of-paintings-on-display-in-rehung-picture-gallery"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/buckingham-palace-salon-style-rehang.png",
      "alt": "A 17th-century painting of Archduke Leopold Wilhelm's Brussels picture gallery, its walls hung frame-to-frame from floor to ceiling with dozens of paintings in the dense salon manner.",
      "credit": "David Teniers the Younger, 'Archduke Leopold Wilhelm in his Gallery at Brussels' (c. 1650). Public domain, via Wikimedia Commons."
    },
    "edition": "Afternoon Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Paris Salon of the Academie royale (18th century), recorded in Martini's 'Exposition au Salon du Louvre en 1787' — the floor-to-ceiling hang that named the salon style",
        "excerpt": "In the Louvre's Salon Carre the Academie royale stacked paintings frame-to-frame from the dado to the cornice, the grandest canvases 'skied' high overhead and smaller works crowding every remaining inch. Pietro Antonio Martini's engraving of the 1787 exhibition records the effect that Diderot's readers knew at first hand: a wall so densely papered with pictures that the room itself reads as one teeming composition. It is precisely this eighteenth-century Paris manner that Buckingham Palace has now revived.",
        "source": "Pietro Antonio Martini, 'Exposition au Salon du Louvre en 1787,' etching and engraving after Johann Heinrich Ramberg, 1787. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Salon_du_Louvre_1787.jpg",
        "image": {
          "src": "/covers/buckingham-palace-salon-style-rehang--a0.png",
          "alt": "Engraving of the 1787 Paris Salon showing paintings hung frame-to-frame from floor to ceiling on the walls of the Louvre's Salon Carre.",
          "credit": "Pietro Antonio Martini, 'Exposition au Salon du Louvre en 1787' (1787), after J. H. Ramberg. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Salon des Refuses of 1863 (19th century) — Napoleon III's overflow hang of the paintings rejected by the official Salon, emblematised by Manet's 'Le Dejeuner sur l'herbe'",
        "excerpt": "When the 1863 Salon jury rejected roughly two-thirds of the works submitted, Napoleon III ordered the refused canvases shown together in the Palais de l'Industrie, where they hung cheek by jowl in dense, unedited rows. Crowds pressed in to jeer Edouard Manet's 'Le Dejeuner sur l'herbe,' the succes de scandale of that overflowing display. The episode shows how a crowded, show-everything hang could itself become the spectacle — the same democratic impulse to put more on the wall that now animates the King's Gallery.",
        "source": "Edouard Manet, 'Le Dejeuner sur l'herbe' (1863), the most notorious painting of the 1863 Salon des Refuses; Musee d'Orsay, Paris. File via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Edouard_Manet_-_Luncheon_on_the_Grass_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/buckingham-palace-salon-style-rehang--a1.png",
          "alt": "Manet's Le Dejeuner sur l'herbe (1863), the painting that scandalised visitors to the crowded Salon des Refuses.",
          "credit": "Edouard Manet, 'Le Dejeuner sur l'herbe' (1863), Musee d'Orsay. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Denis Diderot, 'Salon de 1763' — the critic blessing the public exhibition of paintings whose crowded walls gave the salon hang its name",
        "excerpt": "Bénie soit à jamais la mémoire de celui qui, en instituant cette exposition publique de tableaux, excita l’émulation entre les artistes, prépara à tous les ordres de la société, et surtout aux hommes de goût, un exercice utile et une récréation douce, recula parmi nous la décadence de la peinture, et de plus de cent ans peut-être, et rendit la nation plus instruite et plus difficile en ce genre !",
        "source": "Denis Diderot, 'Salon de 1763,' opening address to Grimm, in Œuvres complètes, ed. Assézat, vol. X. French Wikisource.",
        "href": "https://fr.wikisource.org/wiki/Salon_de_1763"
      },
      {
        "category": "literary",
        "title": "Nathaniel Hawthorne, 'The Marble Faun' (1860), ch. XXXVII 'The Emptiness of Picture Galleries' — the overwhelming glut of a great collection",
        "excerpt": "A quarter part, probably, of any large collection of pictures consists of Virgins and infant Christs, repeated over and over again in pretty much an identical spirit, and generally with no more mixture of the Divine than just enough to spoil them as representations of maternity and childhood, with which everybody’s heart might have something to do.",
        "source": "Nathaniel Hawthorne, 'The Marble Faun; or, The Romance of Monte Beni,' Vol. II, ch. XXXVII, 'The Emptiness of Picture Galleries.' Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/2182/2182-0.txt"
      },
      {
        "category": "artistic",
        "title": "Johann Zoffany, 'The Tribuna of the Uffizi' (1772–77) — a Grand Tour painting of a room packed floor-to-ceiling with masterpieces",
        "excerpt": "Commissioned by Queen Charlotte and today in the Royal Collection, Zoffany crams the Medici's octagonal Tribuna with dozens of paintings stacked frame-to-frame while sculptures jostle across the floor and connoisseurs peer, point and gesture among them. The picture is itself a salon hang made portable — an inventory of a princely gallery's glorious overload. That a Royal Collection painting should model the very density now revived at Buckingham Palace makes for a neat historical rhyme.",
        "source": "Johann Zoffany, 'The Tribuna of the Uffizi,' oil on canvas, 1772–1777, Royal Collection Trust. File via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Johan_Zoffany_-_Tribuna_of_the_Uffizi_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/buckingham-palace-salon-style-rehang--a4.png",
          "alt": "Zoffany's painting of the Uffizi Tribuna, its walls covered floor-to-ceiling with Renaissance paintings and the floor crowded with sculpture and connoisseurs.",
          "credit": "Johann Zoffany, 'The Tribuna of the Uffizi' (1772–77), Royal Collection Trust. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Samuel F. B. Morse, 'Gallery of the Louvre' (1831–33) — an American's imagined salon wall of Louvre masterpieces stacked tier upon tier",
        "excerpt": "Morse reassembled thirty-eight Louvre masterworks onto a single imaginary wall of the Salon Carre, hung tier upon tier from skirting to ceiling in the full salon manner, with copyists at their easels below. The canvas turns the museum into one overwhelming mosaic of art, a teaching wall of the Old Masters meant to be absorbed at a glance. Its stacked profusion is exactly the effect the King's Gallery now courts.",
        "source": "Samuel F. B. Morse, 'Gallery of the Louvre,' oil on canvas, 1831–33, Terra Foundation for American Art. File via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Gallery_of_the_Louvre_1831-33_Samuel_Morse.jpg",
        "image": {
          "src": "/covers/buckingham-palace-salon-style-rehang--a5.png",
          "alt": "Morse's painting showing a wall of the Louvre hung floor-to-ceiling with dozens of framed Old Master paintings and copyists working below.",
          "credit": "Samuel F. B. Morse, 'Gallery of the Louvre' (1831–33), Terra Foundation for American Art. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "guggenheim-legionnaires-bacteria",
    "headline": "Legionella bacteria found in the Guggenheim Museum's cooling tower amid an Upper East Side outbreak",
    "overview": "The bacteria that cause Legionnaires' disease were found in a cooling tower at Manhattan's Solomon R. Guggenheim Museum, one of 31 Upper East Side buildings that tested positive during a neighbourhood outbreak that has sickened dozens, as reported on July 11, 2026. The museum said the contamination was caught during routine monthly testing and that it had drained, cleaned and disinfected the tower, which is accessible only to facilities staff; it said the building remained safe for staff and visitors. New York health officials identified the cluster in early July and are investigating cooling towers across Carnegie Hill and Yorkville.",
    "genre": "Science",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/legionnaires-disease-bacteria-in-guggenheim-cooling-tower-1234754333/"
      },
      {
        "name": "The Art Newspaper",
        "href": "https://www.theartnewspaper.com/2026/07/09/bacteria-that-causes-legionnaires-disease-found-in-guggenheim-museum-cooling-tower"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/guggenheim-legionnaires-bacteria.png",
      "alt": "Electron micrograph of Legionella pneumophila, the rod-shaped bacterium that causes Legionnaires' disease.",
      "credit": "Public-domain electron micrograph, U.S. Centers for Disease Control and Prevention (CDC PHIL #1187), via Wikimedia Commons."
    },
    "edition": "Afternoon Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "John Snow, \"On the Mode of Communication of Cholera\" (1855, on the 1854 outbreak) — tracing a hidden waterborne killer to a single contaminated source, the Broad Street pump",
        "excerpt": "The result of the inquiry, then, is, that there has been no particular outbreak or prevalence of cholera in this part of London except among the persons who were in the habit of drinking the water of the above-mentioned pump-well.",
        "source": "John Snow, On the Mode of Communication of Cholera, 2nd ed. (London: John Churchill, 1855); reproduced by the John Snow Archive and Research Companion, UCLA Department of Epidemiology.",
        "href": "https://epi-snow.ph.ucla.edu/Stream2_BSPoutbreak_d.html"
      },
      {
        "category": "historical",
        "title": "The 1976 Legionnaires' disease outbreak at Philadelphia's Bellevue-Stratford Hotel — the original episode of a hotel's own cooling system silently seeding a deadly pneumonia, the direct ancestor of the Guggenheim case",
        "excerpt": "In the summer of 1976, more than 180 people who had attended or passed near an American Legion convention at Philadelphia's grand Bellevue-Stratford Hotel fell ill with a mysterious pneumonia, and 29 of them died. For months investigators hunted a phantom cause before tracing the killer not to a poison or a saboteur but to the building itself: a previously unknown bacterium, later named Legionella, breeding in the hotel's air-conditioning cooling tower and drifting invisibly through the halls as contaminated mist. It was the first time the world learned that a modern building's own water system could turn against the people inside it.",
        "source": "\"Legionnaires' Disease,\" The Encyclopedia of Greater Philadelphia (Rutgers University), essay on the 1976 Bellevue-Stratford outbreak.",
        "href": "https://philadelphiaencyclopedia.org/essays/legionnaires-disease/"
      },
      {
        "category": "literary",
        "title": "Henrik Ibsen, \"An Enemy of the People\" (1882) — Dr. Stockmann discovers the celebrated town Baths are secretly poisoned, exactly as a museum's cooling water turns from amenity to hazard",
        "excerpt": "The whole Bath establishment is a whited, poisoned sepulchre, I tell you—the gravest possible danger to the public health!",
        "source": "Henrik Ibsen, An Enemy of the People (1882), trans. R. Farquharson Sharp, Act I; Project Gutenberg eBook #2446.",
        "href": "https://www.gutenberg.org/files/2446/2446-h/2446-h.htm"
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe, \"The Masque of the Red Death\" (1842) — a sealed abbey cannot keep the pestilence out, a mirror of the sealed, climate-controlled museum breached by an invisible contagion",
        "excerpt": "And Darkness and Decay and the Red Death held illimitable dominion over all.",
        "source": "Edgar Allan Poe, \"The Masque of the Red Death\" (1842); Project Gutenberg eBook #1064.",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm"
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin, \"Die Pest\" (The Plague), 1898 — an allegory of contagion riding unseen through a city street, echoing bacteria carried on the drifting mist of a cooling tower",
        "excerpt": "A winged, skeletal figure of Death rides a monstrous dragon-like beast low over a shadowed city street, scattering victims who crumple in its wake. Böcklin paints pestilence not as a distant judgment but as a physical thing sweeping through inhabited space, unstoppable and impersonal. The picture captures the modern dread the Guggenheim case revives: that sickness can arrive borne on the very air of a public place.",
        "source": "Arnold Böcklin, Die Pest (The Plague), 1898, tempera on fir wood, Kunstmuseum Basel; file page on Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/guggenheim-legionnaires-bacteria--a4.png",
          "alt": "Arnold Böcklin's 1898 painting The Plague: a winged figure of Death rides a dark beast through a city street as people fall.",
          "credit": "Arnold Böcklin, Die Pest (The Plague), 1898, Kunstmuseum Basel. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin, \"The Plague of Ashdod\" (1630–31) — a plague strikes a proud civic and sacred space, as an outbreak infiltrates one of a city's grandest cultural monuments",
        "excerpt": "Poussin stages an epidemic inside a monumental city, its classical porticoes and temple looming over citizens who recoil, collapse, and cover their faces against the stench of the dead. The catastrophe unfolds not in a wilderness but at the civic and religious heart of Ashdod, where the plague follows the captured Ark into the very seat of communal life. The scene renders the ancient fear the Guggenheim story reawakens: that disease can penetrate the places a society treats as monumental and secure.",
        "source": "Nicolas Poussin, The Plague of Ashdod (La Peste d'Asdod), 1630–31, oil on canvas, Musée du Louvre, Paris; file page on Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_poussin,_peste_di_asdod,_1630-31.JPG",
        "image": {
          "src": "/covers/guggenheim-legionnaires-bacteria--a5.png",
          "alt": "Nicolas Poussin's painting The Plague of Ashdod: plague-stricken figures collapse among the classical architecture of an ancient city.",
          "credit": "Nicolas Poussin, The Plague of Ashdod, 1630–31, Musée du Louvre. Photo by Sailko, via Wikimedia Commons (CC BY-SA 3.0)."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "gordie-howe-bridge-tolls-deal",
    "headline": "US and Canada reach a tolls deal to open the $4.7bn Gordie Howe Bridge between Detroit and Windsor on July 27",
    "overview": "The United States and Canada reached a deal on tolls in mid-July 2026 that clears the new $4.7 billion Gordie Howe International Bridge between Detroit and Windsor, Ontario to open on July 27, after the crossing's launch was postponed at the Trump administration's request. Under the agreement, Washington will receive half of the bridge's toll revenue and can veto any increase above 10 percent, alongside a 15-year regional economic-development fund tied to a share of the profits. The cable-stayed span is set to become one of the busiest trade arteries in North America.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQdkZfRDdJT3hXYjd6dEEyaTZ6RlFQdm1rMndyUzFjWUcyRnNXbzhyMDVka1ZFUjhEV29SVWNvdGU2TlJ6SDFVMFcyQnJqOVFhcGE2RnMzcFJib2wwRk1FZVZ2LWR0Z1FjZ2s0bDhBT3EwMG4zWGROODFuZV8xSXV1MEVzTjcwNjhWZGhSSDFHTVdfWmN3Wk5rT2ZmS3doYzZUeHc?oc=5"
      },
      {
        "name": "CBS News Detroit",
        "href": "https://www.cbsnews.com/detroit/news/gordie-howe-bridge-detroit-canada-opening-deal/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/gordie-howe-bridge-tolls-deal.png",
      "alt": "The cable-stayed Gordie Howe International Bridge under construction over the Detroit River, its two spans reaching toward each other between Detroit, Michigan and Windsor, Ontario, February 2024.",
      "credit": "Photograph by Judith Jackson, 10 February 2024, via Wikimedia Commons (CC BY 2.0)."
    },
    "edition": "Afternoon Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Caesar's bridge across the Rhine (Julius Caesar, Commentarii de Bello Gallico, Book IV, 55 BC) — the timber crossing that first linked Roman Gaul to the German shore, built in ten days",
        "excerpt": "The whole work was completed in ten days from that on which the collecting of timber began, and the army was taken across.",
        "source": "Julius Caesar, The Gallic War (De Bello Gallico), Book IV, chapter 18, trans. W. A. McDevitte and W. S. Bohn (1869), via Bill Thayer's LacusCurtius.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Caesar/Gallic_War/4*.html"
      },
      {
        "category": "historical",
        "title": "The opening of the Brooklyn Bridge (1883), depicted in Currier & Ives's chromolithograph \"The Great East River Suspension Bridge\" — the span that fused the separate cities of New York and Brooklyn across a hard water boundary",
        "excerpt": "When the Great East River Suspension Bridge opened in May 1883 it was the longest span in the world, its stone towers and steel-wire cables at last stitching the rival cities of New York and Brooklyn into one metropolis. Fourteen years in the building and shadowed by the deaths and injuries of its makers, it turned a ferry-borne divide into a permanent artery of trade and passage. Like the Gordie Howe crossing, it was a feat of cross-jurisdiction engineering that redrew the daily map of who could reach whom.",
        "source": "Currier & Ives, \"The Great East River Suspension Bridge... Completed, May, 1883\", chromolithograph, Library of Congress Prints and Photographs Division; file page at Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Currier_and_Ives_Brooklyn_Bridge2.jpg",
        "image": {
          "src": "/covers/gordie-howe-bridge-tolls-deal--a1.png",
          "alt": "Currier & Ives chromolithograph of the Brooklyn Bridge in 1883, its twin Gothic towers and suspension cables spanning the East River crowded with sailing ships and steamers.",
          "credit": "Currier & Ives, 1883, Library of Congress via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Henry Wadsworth Longfellow, \"The Bridge\" (1846) — the poet standing on a midnight bridge that carries the endless crossing of the human crowd",
        "excerpt": "I stood on the bridge at midnight,\nAs the clocks were striking the hour,\nAnd the moon rose o'er the city,\nBehind the dark church-tower.\n\nI saw her bright reflection\nIn the waters under me,\nLike a golden goblet falling\nAnd sinking into the sea.",
        "source": "Henry Wadsworth Longfellow, \"The Bridge\", in The Belfry of Bruges and Other Poems (1846); Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Belfry_of_Bruges_and_Other_Poems/The_Bridge"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"Crossing Brooklyn Ferry\" (1882) — the crossing as a bond that dissolves distance and time between people on either shore",
        "excerpt": "What is it then between us?\nWhat is the count of the scores or hundreds of years between us?\nWhatever it is, it avails not—distance avails not, and place avails not,",
        "source": "Walt Whitman, \"Crossing Brooklyn Ferry\", section 5, in Leaves of Grass (1882 edition); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Leaves_of_Grass_(1882)/Crossing_Brooklyn_Ferry"
      },
      {
        "category": "artistic",
        "title": "Katsushika Hokusai, \"Under the Mannen Bridge at Fukagawa\" (c. 1830–32), from Thirty-Six Views of Mount Fuji — a bridge framing the crossing of everyday life above a working river",
        "excerpt": "Hokusai frames distant Mount Fuji within the great wooden arch of the Mannen Bridge, so that the span itself becomes a window onto the world beyond. Below, boatmen and a fisherman labor on the river while pedestrians cross overhead, binding two banks and two kinds of life into a single view. The print turns an ordinary crossing into a quiet monument to the traffic of people and trade.",
        "source": "Katsushika Hokusai, \"Under the Mannen Bridge at Fukagawa (Fukagawa Mannenbashi shita)\", from Thirty-Six Views of Mount Fuji, c. 1830–32, woodblock print; The Metropolitan Museum of Art (accession JP2983, CC0), via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:%E5%86%A8%E5%B6%BD%E4%B8%89%E5%8D%81%E5%85%AD%E6%99%AF_%E6%B7%B1%E5%B7%9D%E4%B8%87%E5%B9%B4%E6%A9%8B%E4%B8%8B-Under_the_Mannen_Bridge_at_Fukagawa_(Fukagawa_Mannenbashi_shita),_from_the_series_Thirty-six_Views_of_Mount_Fuji_(Fugaku_sanj%C5%ABrokkei)_MET_DP141078.jpg",
        "image": {
          "src": "/covers/gordie-howe-bridge-tolls-deal--a4.png",
          "alt": "Hokusai woodblock print showing Mount Fuji framed within the tall wooden arch of the Mannen Bridge at Fukagawa, with boatmen on the river below and figures crossing above.",
          "credit": "Katsushika Hokusai, c. 1830–32, The Metropolitan Museum of Art (CC0) via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Utagawa Hiroshige, \"Sudden Shower over Shin-Ōhashi Bridge and Atake\" (1857), from One Hundred Famous Views of Edo — travelers pressing across a great bridge to reach the far shore in a downpour",
        "excerpt": "Hiroshige catches figures hurrying across one of Edo's great wooden bridges as a sudden rainstorm sweeps down in slanting grey lines. Hunched under mats, hats and umbrellas, the travelers are bound together by the single purpose of crossing to the far bank of the Sumida River. The print, later famously copied by Van Gogh, makes a bridge the stage for the shared, urgent business of getting across.",
        "source": "Utagawa Hiroshige, \"Sudden Shower over Shin-Ōhashi Bridge and Atake (Ōhashi Atake no yūdachi)\", from One Hundred Famous Views of Edo, 1857, woodblock print; Library of Congress, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Hiroshige,_Sudden_shower_over_Shin-%C5%8Chashi_bridge_and_Atake,_1857.jpg",
        "image": {
          "src": "/covers/gordie-howe-bridge-tolls-deal--a5.png",
          "alt": "Hiroshige woodblock print of travelers crossing the Shin-Ohashi Bridge under mats and umbrellas during a sudden downpour, with the far bank of Atake dim beyond the rain.",
          "credit": "Utagawa Hiroshige, 1857, Library of Congress via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "apple-openai-trade-secrets-lawsuit",
    "headline": "Apple sues OpenAI and Jony Ive's io, accusing them of stealing trade secrets for AI hardware",
    "overview": "Apple filed a lawsuit in the US District Court for the Northern District of California on July 10, 2026, accusing OpenAI, its hardware unit io Products co-founded by former Apple design chief Jony Ive, and two former Apple employees of stealing trade secrets to build unreleased AI devices. The complaint says former iPhone product-design vice-president Tang Tan used confidential Apple project code names while recruiting and that engineer Chang Liu kept an Apple laptop loaded with technical documents after leaving. OpenAI said it has 'no interest in other companies' trade secrets' and remains focused on building its own technology.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNV2RSRWV0QjJvdUJ5WGR3LVZ4T01uU2tCZDh1V2kzM3p1WnlwbVdLdFE5ZENFMldsZVpvNk9YQTc5Qk5TdlRnb0tGeENUOGM0SjVUOTRtZEpnMHFVcmhLbHhTMnJOWGJfem1rSURRNFpQbFQwYlE5WHFrbjJRVE13YXRPZkVydVNsTGd3WjRiZklZVlJ1ZDRHWDZsNS1NcHl4NGc?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/10/apple-openai-lawsuit-trade-secrets.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/apple-openai-trade-secrets-lawsuit.png",
      "alt": "Apple Park, Apple's ring-shaped headquarters in Cupertino, California.",
      "credit": "Daniel L. Lu (user:dllu), CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Procopius, History of the Wars, Book VIII (The Gothic War), ch. 17 — monks smuggle silkworm eggs to Justinian (c. 552 CE)",
        "excerpt": "At about this time certain monks, coming from India and learning that the Emperor Justinian entertained the desire that the Romans should no longer purchase their silk from the Persians, came before the emperor and promised so to settle the silk question that the Romans would no longer purchase this article from their enemies, the Persians... for they had, they said, spent a long time in the country situated north of the numerous nations of India — a country called Serinda — and there they had learned accurately by what means it was possible for silk to be produced in the land of the Romans... And while it was impossible to convey the worms thither alive, it was still practicable and altogether easy to convey their offspring... They then once more went to Serinda and brought back the eggs to Byzantium, and in the manner described caused them to be transformed into worms, which they fed on the leaves of the mulberry; and thus they made possible from that time forth the production of silk in the land of the Romans.",
        "source": "Procopius, History of the Wars, VIII.xvii.1–7, trans. H. B. Dewing, Loeb Classical Library (1928), hosted at LacusCurtius (University of Chicago).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Wars/8C*.html"
      },
      {
        "category": "historical",
        "title": "Samuel Smiles, Men of Invention and Industry (1884), ch. IV — John Lombe steals the secret of the Italian silk-throwing machine at Piedmont (1716–17)",
        "excerpt": "But he seems to have been possessed by an intense desire to ascertain the Italian method of silk-throwing. He could not learn it in England. There was no other method but going to Italy, getting into a silk mill, and learning the secret of the Italian art... John Lombe succeeded in getting employment in a silk mill in Piedmont, where the art of silk-throwing was kept a secret... \"They knew that there would be great difficulty and danger in the undertaking, because the king of Sardinia had made it death for any man to discover this invention, or attempt to carry it out of his dominions... he found means to see this engine so often, and to pry into the nature of it so narrowly, that he made himself master of the whole invention and of all the different parts and motions belonging to it.\"",
        "source": "Samuel Smiles, \"John Lombe: Introducer of the Silk Industry into England,\" in Men of Invention and Industry (London: John Murray, 1884), quoting the 1731 Parliamentary petition of Sir Thomas Lombe. Project Gutenberg ebook #725.",
        "href": "https://www.gutenberg.org/files/725/725-h/725-h.htm"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound — Prometheus confesses stealing fire, the source of every craft (5th c. BCE)",
        "excerpt": "For having bestowed boons upon mortals, I am enthralled unhappy in these hardships. And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource. Such then as this is the vengeance that I endure for my trespasses, being riveted in fetters beneath the naked sky.",
        "source": "Aeschylus, Prometheus Bound, trans. Theodore Alois Buckley, in Prometheus Bound and the Seven Against Thebes. Project Gutenberg ebook #27458.",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "literary",
        "title": "Christopher Marlowe, The Tragical History of Doctor Faustus (c. 1592) — Faustus craves the forbidden knowledge of the magicians",
        "excerpt": "These metaphysics of magicians,\nAnd necromantic books are heavenly;\nLines, circles, scenes, letters, and characters;\nAy, these are those that Faustus most desires.\nO, what a world of profit and delight,\nOf power, of honour, of omnipotence,\nIs promis'd to the studious artizan!\nAll things that move between the quiet poles\nShall be at my command... A sound magician is a mighty god:\nHere, Faustus, tire thy brains to gain a deity.",
        "source": "Christopher Marlowe, The Tragical History of Doctor Faustus, Scene I. Project Gutenberg ebook #779.",
        "href": "https://www.gutenberg.org/cache/epub/779/pg779.txt"
      },
      {
        "category": "artistic",
        "title": "Heinrich Füger, \"Prometheus Brings Fire to Mankind\" (1817)",
        "excerpt": "Füger's Neoclassical canvas shows the Titan Prometheus cupping a stolen flame he has carried down from the gods, leaning toward a huddle of newly made mortals waiting in shadow. The single point of fire is the whole drama: a guarded, world-changing knowledge passing by theft from its rightful owners into human hands. Light spills from Prometheus outward, dramatizing the moment craft-power crosses a forbidden boundary — a gift that will also bring him punishment.",
        "source": "Heinrich Friedrich Füger (1751–1818), oil painting, 1817, Liechtenstein Collections (The Princely Collections), Vienna. Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/apple-openai-trade-secrets-lawsuit--a4.png",
          "alt": "Heinrich Füger's 1817 painting of Prometheus bringing the stolen fire of the gods to mankind, its light illuminating figures gathered in darkness.",
          "credit": "Heinrich Füger (1817), Liechtenstein Collections; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Franz Liszt, Prometheus, symphonic poem No. 5, S.99 (composed 1850, rev. 1855)",
        "excerpt": "Liszt built his fifth symphonic poem around the figure of Prometheus, the bringer of fire and forbidden knowledge who is chained and torn for his defiance. The music surges between turbulent, storm-driven struggle and passages of soaring resolve, casting the theft that empowers humanity as an act of suffering genius. It renders in sound the same charged bargain at issue here: transgressive knowledge seized at great cost, and the reckoning that follows.",
        "source": "Franz Liszt, Prometheus, S.99 (symphonic poem), full orchestral score, Breitkopf & Härtel; public-domain scores at the International Music Score Library Project (IMSLP).",
        "href": "https://imslp.org/wiki/Prometheus,_S.99_(Liszt,_Franz)"
      }
    ],
    "lead": true,
    "rank": 27
  },
  {
    "slug": "meta-pulls-instagram-ai-image-tool",
    "headline": "Meta pulls its new Instagram AI image tool days after launch amid privacy backlash",
    "overview": "Meta said on July 10, 2026, that it was removing Muse Image, an Instagram tool from its Superintelligence Labs that let people generate AI pictures by @-mentioning public accounts, after days of backlash over its opt-out design. Critics and the Hollywood talent agency CAA objected that users' photos could be fed into the generator unless they disabled the feature, with no alert when their images were used. Meta said the feature 'missed the mark' and was no longer available.",
    "genre": "Technology",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c2dy6e8klw0o"
      },
      {
        "name": "TechCrunch",
        "href": "https://techcrunch.com/2026/07/10/meta-removes-controversial-ai-feature-on-instagram-after-backlash/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/meta-pulls-instagram-ai-image-tool.png",
      "alt": "The Instagram application icon on a smartphone screen.",
      "credit": "Instagram app icon, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Samuel D. Warren & Louis D. Brandeis, \"The Right to Privacy\" (1890)",
        "excerpt": "Instantaneous photographs and newspaper enterprise have invaded the sacred precincts of private and domestic life; and numerous mechanical devices threaten to make good the prediction that \"what is whispered in the closet shall be proclaimed from the house-tops.\"",
        "source": "Samuel D. Warren and Louis D. Brandeis, \"The Right to Privacy,\" Harvard Law Review, Vol. IV, No. 5 (December 15, 1890).",
        "href": "https://en.wikisource.org/wiki/The_Right_to_Privacy"
      },
      {
        "category": "historical",
        "title": "Pliny the Elder, Natural History, Book XXXV (c. 77 AD)",
        "excerpt": "He did this owing to his daughter, who was in love with a young man; and she, when he was going abroad, drew in outline on the wall the shadow of his face thrown by a lamp.",
        "source": "Pliny the Elder, Natural History, Book XXXV.151, trans. H. Rackham (Loeb Classical Library).",
        "href": "https://www.attalus.org/translate/pliny_hn35b.html"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses, Book III — Narcissus (8 AD)",
        "excerpt": "While he is drinking he beholds himself reflected in the mirrored pool—and loves; loves an imagined body which contains no substance, for he deems the mirrored shade a thing of life to love.",
        "source": "Ovid, Metamorphoses, Book III (Narcissus and Echo), trans. Brookes More; Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=3:card=402"
      },
      {
        "category": "literary",
        "title": "Oscar Wilde, The Picture of Dorian Gray (1891), Chapter 7",
        "excerpt": "In the dim arrested light that struggled through the cream-coloured silk blinds, the face appeared to him to be a little changed. The expression looked different. One would have said that there was a touch of cruelty in the mouth.",
        "source": "Oscar Wilde, The Picture of Dorian Gray (1891 edition), Chapter 7; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Picture_of_Dorian_Gray_(1891)/Chapter_7"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, Narcissus (c. 1597–1599)",
        "excerpt": "A beautiful youth kneels at the water's edge and gazes down at the glowing double who gazes back at him. The living body and its captured reflection close into a single dark circle, the boy bound forever to an image that can neither answer him nor consent. Caravaggio paints the mirrored likeness as vivid and present as the flesh that cast it.",
        "source": "Michelangelo Merisi da Caravaggio, Narcissus, oil on canvas, c. 1597–1599; Galleria Nazionale d'Arte Antica (Palazzo Barberini), Rome.",
        "href": "https://commons.wikimedia.org/wiki/File:Narcissus-Caravaggio_(1594-96)_edited.jpg",
        "image": {
          "src": "/covers/meta-pulls-instagram-ai-image-tool--a4.png",
          "alt": "Caravaggio's painting Narcissus: a kneeling youth in a white shirt gazing down at his own reflection in a dark pool.",
          "credit": "Caravaggio, Narcissus (c. 1597–1599), Galleria Nazionale d'Arte Antica, Rome. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Christoph Willibald Gluck, Écho et Narcisse, Wq.47 (1779)",
        "excerpt": "Gluck's final opera sets the myth to music: the nymph Echo pines for a Narcissus who can love only the face the water hands back to him. His voice, like her own, returns to him as an echo of himself—an image and a sound that take on a life apart from the person. The drama ends with a lover consumed by his own reflected likeness.",
        "source": "Christoph Willibald Gluck, Écho et Narcisse, Wq.47, drame lyrique, libretto by Baron Jean-Baptiste-Louis-Théodore de Tschudi; premiered Paris, 24 September 1779. Score via IMSLP.",
        "href": "https://imslp.org/wiki/%C3%89cho_et_Narcisse,_Wq.47_(Gluck,_Christoph_Willibald)"
      }
    ],
    "rank": 28
  },
  {
    "slug": "us-iran-hormuz-shipping-talks-oman",
    "headline": "US presses Iran to stop attacking ships in the Strait of Hormuz as talks resume in Oman",
    "overview": "US officials, including Vice-President JD Vance, are pushing Iran to commit to stop firing on commercial vessels in the Strait of Hormuz as negotiations mediated by Oman resume on Saturday, July 11, 2026. The talks follow a cycle of strikes after Iran's Revolutionary Guard attacked three commercial ships hugging Oman's coast, and disagreement persists over Tehran's claim to joint sovereignty and passage fees for the waterway, through which much of the world's oil passes. Washington insists the strait is an international waterway whose arrangements must be endorsed by Gulf states.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/crelyq79x71o"
      },
      {
        "name": "Axios",
        "href": "https://www.axios.com/2026/07/01/iran-talks-doha-tolls-strait-hormuz"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/us-iran-hormuz-shipping-talks-oman.png",
      "alt": "A large oil tanker transiting the narrow Strait of Hormuz.",
      "credit": "NASA, Johnson Space Center, photograph STS004-37-716 taken during the STS-4 Space Shuttle mission (1982). Public domain, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Polybius, The Histories, Book IV (Byzantium commands the Bosporus and exacts duties on Pontic trade), c. 2nd century BCE",
        "excerpt": "it completely blocks the mouth of the Pontus in such a manner that no one can sail in or out without the consent of the Byzantines. ... they were driven by sheer necessity to begin exacting duties from vessels trading with the Pontus.",
        "source": "Polybius, The Histories, Book IV.38 and IV.46-47, Loeb Classical Library translation (W. R. Paton), digitized at LacusCurtius, University of Chicago (Bill Thayer).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Polybius/4*.html"
      },
      {
        "category": "historical",
        "title": "The American Commissioners (John Adams and Thomas Jefferson) to John Jay, 28 March 1786 — the Tripolitan ambassador justifies preying on shipping for tribute",
        "excerpt": "it was founded on the law of their great Profet: that it was written in the Koran, that all Nations who should not have acknowledged their Authority were sinners: that it was their right & duty to make war upon them wherever they could be found, & to make slaves of all they could take as prisoners; & that every Musselman who should be slain in battle was sure to go to Paradise",
        "source": "Papers of John Adams, vol. 18, \"The American Commissioners to John Jay, 28 March 1786,\" Adams Papers Digital Edition, Massachusetts Historical Society.",
        "href": "https://www.masshist.org/publications/adams-papers/index.php/volume/PJA18/pageid/PJA18p224"
      },
      {
        "category": "literary",
        "title": "Homer, The Odyssey, Book XII — Circe warns Odysseus of the strait between Scylla and Charybdis (trans. A. T. Murray)",
        "excerpt": "Thrice a day she belches it forth, and thrice she sucks it down terribly. Mayest thou not be there when she sucks it down, for no one could save thee from ruin.",
        "source": "Homer, The Odyssey, Book 12, English translation by A. T. Murray (1919), Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D12"
      },
      {
        "category": "literary",
        "title": "Virgil, The Aeneid, Book III — Helenus warns Aeneas of Scylla and Charybdis in the narrow strait (trans. John Dryden)",
        "excerpt": "Charybdis roaring on the left presides, / And in her greedy whirlpool sucks the tides; / Then spouts them from below: with fury driv'n, / The waves mount up and wash the face of heav'n.",
        "source": "Virgil, The Aeneid, Book 3, English translation by John Dryden, Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0052%3Abook%3D3"
      },
      {
        "category": "artistic",
        "title": "J.M.W. Turner, Seascape with Storm Coming On (c. 1840), oil on canvas, Tate / National Gallery, London",
        "excerpt": "Turner dissolves the boundary between sea and sky into a single churning haze, a lone vessel almost lost in the advancing storm. The painting distills the ancient dread of small ships at the mercy of a vast and hostile sea — the same peril that shadows any narrow, contested passage.",
        "source": "Joseph Mallord William Turner (1775-1851), Seascape with Storm Coming On, accession N04445 (Tate) / NG4445, reproduced on Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_(1775-1851)_-_Seascape_with_Storm_Coming_On_-_N04445_-_National_Gallery.jpg",
        "image": {
          "src": "/covers/us-iran-hormuz-shipping-talks-oman--a4.png",
          "alt": "A small ship dwarfed by a threatening, turbulent sea and lowering sky in J.M.W. Turner's painting Seascape with Storm Coming On.",
          "credit": "J.M.W. Turner, Seascape with Storm Coming On (c. 1840). Public domain (author died 1851), via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Nikolai Rimsky-Korsakov, Scheherazade, Op. 35 — Movement I, \"The Sea and Sinbad's Ship\" (1888)",
        "excerpt": "The suite's opening movement conjures the sea itself: a stern brass motif for the sultan gives way to swelling, rolling string figures that heave and recede like ocean swells beneath Sinbad's ship. The music carries the listener across a shimmering, treacherous expanse of water where every voyage is an act of daring.",
        "source": "Nikolai Rimsky-Korsakov, Scheherazade (Sheherazade), Op. 35, full score, International Music Score Library Project (IMSLP / Petrucci Music Library). Public domain.",
        "href": "https://imslp.org/wiki/Scheherazade,_Op.35_(Rimsky-Korsakov,_Nikolay)"
      }
    ],
    "rank": 29
  },
  {
    "slug": "russia-diesel-export-ban-fuel-crunch",
    "headline": "Russia's ban on diesel exports deepens a global fuel crunch after Ukrainian refinery strikes",
    "overview": "Russia's full ban on diesel exports, imposed after Ukrainian drone strikes crippled its refineries, is deepening a squeeze on world fuel markets, sending European diesel margins to a record and compounding disruption from the Iran war. Moscow, which supplied about 11% of global diesel last year, said the ban announced by Deputy Prime Minister Alexander Novak will run through July 31 to protect domestic supply amid shortages and rationing across most of its regions. Its biggest diesel customers, Turkey and Brazil, must now seek fuel elsewhere.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxQODlSbTR5S3p1eVA1NElSZFNsVXd2a0ticUw4M29iNWRnWnRxUHRBczVVR2FEQzhKSE5ERFdhc3pXcTZMTHRNTzB5T0NERnpYVWFycEhYakZTUnpzenJvQThyTzZrd1Z4SVNVdnZpTHdrQnhxOUFfVGxIckZyVUF5UGFMcVhkTWxPYTIzTEpMclJ2X19VdV9nSGZpWmZPMThqLUdOclplVzNhdw?oc=5"
      },
      {
        "name": "CNN Business",
        "href": "https://www.cnn.com/2026/07/09/business/russia-diesel-ban-ukrainian-strikes-intl"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/russia-diesel-export-ban-fuel-crunch.png",
      "alt": "An oil refinery with storage tanks and flare stacks at dusk.",
      "credit": "Walter Siegmund (Wikimedia user Wsiegmund), Anacortes Refinery, Washington. CC BY-SA 3.0 via Wikimedia Commons."
    },
    "edition": "Morning Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Napoleon's Berlin Decree establishing the Continental System (Berlin, 21 November 1806)",
        "excerpt": "The British Isles are declared to be in a state of blockade. All commerce and all correspondence with the British Isles are forbidden.",
        "source": "Berlin Decree of Napoleon I, in Frank Maloy Anderson, ed., The Constitutions and Other Select Documents Illustrative of the History of France, 1789-1901 (Minneapolis: H. W. Wilson, 1904); via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Berlin_Decree"
      },
      {
        "category": "historical",
        "title": "Richard Nixon, \"Address to the Nation About Policies To Deal With the Energy Shortages\" (November 7, 1973)",
        "excerpt": "We are heading toward the most acute shortages of energy since World War II. ... In the short run, this course means that we must use less energy—that means less heat, less electricity, less gasoline.",
        "source": "Richard Nixon, Address to the Nation About Policies To Deal With the Energy Shortages, November 7, 1973. The American Presidency Project, University of California, Santa Barbara.",
        "href": "https://www.presidency.ucsb.edu/documents/address-the-nation-about-policies-deal-with-the-energy-shortages"
      },
      {
        "category": "literary",
        "title": "Émile Zola, Germinal (1885), trans. Havelock Ellis",
        "excerpt": "She said the cupboard was empty, the little ones asking for bread and butter, even the coffee was done, and the water caused colic, and the long days passed in deceiving hunger with boiled cabbage leaves.",
        "source": "Émile Zola, Germinal, translated by Havelock Ellis. Project Gutenberg eBook #56528.",
        "href": "https://www.gutenberg.org/files/56528/56528-h/56528-h.htm"
      },
      {
        "category": "literary",
        "title": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner\" (1817)",
        "excerpt": "Water, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancient Mariner, Part the Second. Project Gutenberg eBook #151.",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "artistic",
        "title": "Weimer Pursell, \"When You Ride Alone You Ride With Hitler!\" (fuel-conservation poster, 1943)",
        "excerpt": "A WWII home-front poster urging Americans to share rides and burn less gasoline: a lone driver at the wheel with the shadowed profile of Hitler seated beside him, above the slogan \"When you ride ALONE you ride with Hitler!\" Fuel is cast as a strategic weapon, and every wasted gallon as aid to the enemy—rationing turned into an act of patriotic denial.",
        "source": "Weimer Pursell, \"When You Ride ALONE You Ride with Hitler! Join a Car-Sharing Club TODAY!\" Office of Price Administration / U.S. Government Printing Office, 1943. U.S. National Archives (NARA), via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Ride_with_hitler.jpg",
        "image": {
          "src": "/covers/russia-diesel-export-ban-fuel-crunch--a4.png",
          "alt": "WWII poster of a man driving a car with the ghostly figure of Adolf Hitler riding beside him, captioned 'When you ride ALONE you ride with Hitler! Join a Car-Sharing Club TODAY!'",
          "credit": "Weimer Pursell, 1943; U.S. Office of Price Administration / National Archives and Records Administration. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Arthur Honegger, Pacific 231 — Mouvement symphonique No. 1, H. 53 (1923)",
        "excerpt": "Honegger's orchestral tour de force portrays a heavy steam locomotive: the groan of a machine at rest, the slow gathering of momentum, the pistons quickening until the whole hurtling mass of metal roars at full speed. It is industry rendered as sound—the raw, relentless power of the engines that move fuel and freight, and on which a modern economy utterly depends.",
        "source": "Arthur Honegger, Pacific 231 (Mouvement symphonique No. 1), H. 53. Score first published by Maurice Senart, Paris, 1924; via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Pacific_231_(Honegger,_Arthur)"
      }
    ],
    "rank": 30
  },
  {
    "slug": "trump-endangered-species-habitat-rollback",
    "headline": "Trump administration finalizes rule ending habitat protections under the Endangered Species Act",
    "overview": "The Trump administration finalized a rule on July 10, 2026, that repeals the long-standing definition of 'harm' in the Endangered Species Act, which had barred destruction of the habitat that threatened animals need to breed, feed and shelter. Officials say the change lets oil and gas drilling, mining and logging proceed on critical habitat as long as the animals themselves are not directly killed or injured, reversing a half-century interpretation of the 1973 law. More than 150,000 people had objected during the comment period, and conservation groups vowed to sue.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQdC1FakwyTXZ6RE4yT0UxbmNLdTVNSms0N3BBRm9FeTE4bjFsdjQ4Z193dHdHODZrenhGZ29zandrSFhyTVVfNWdUeWpjeHQyZGtYZnFQSU9GYnVZNGJvVTQ3NlplWUhwVnZ5M2FIR0tzamVRcWtXNENBYl91RFg3Ukh5WWtLLTgxV05RX19TVEcya21YbnFfWFN0MjBKdUxmWkFMZ2stOGk?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://www.nbcnews.com/science/environment/trump-weakens-protections-endangered-animal-species-rcna385912"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/trump-endangered-species-habitat-rollback.png",
      "alt": "A Florida manatee swimming, one of many species that depend on protected habitat.",
      "credit": "Albert Kok, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "William T. Hornaday, \"The Extermination of the American Bison\" (1889)",
        "excerpt": "The wild buffalo is practically gone forever, and in a few more years, when the whitened bones of the last bleaching skeleton shall have been picked up and shipped East for commercial uses, nothing will remain of him save his old, well-worn trails along the water-courses, a few museum specimens, and regret for his fate.",
        "source": "William T. Hornaday, The Extermination of the American Bison, Report of the National Museum, 1886-'87 (Washington: Smithsonian Institution, 1889). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/17748/17748-h/17748-h.htm"
      },
      {
        "category": "historical",
        "title": "Martha, the last passenger pigeon (died September 1, 1914, Cincinnati Zoo)",
        "excerpt": "Passenger pigeons once darkened North American skies in flocks numbering in the billions, yet decades of relentless market hunting and the clearing of the forests they nested in drove them to collapse within a single human lifetime. The very last of the species, a captive bird named Martha, died alone at the Cincinnati Zoo on September 1, 1914. Her preserved body now rests at the Smithsonian as a symbol of how quickly an abundant creature can be lost when its habitat and its numbers are stripped away.",
        "source": "\"Martha (passenger pigeon),\" Wikipedia (summarizing Smithsonian National Museum of Natural History records).",
        "href": "https://en.wikipedia.org/wiki/Martha_(passenger_pigeon)"
      },
      {
        "category": "literary",
        "title": "Genesis 6:19-20 (King James Bible), Noah commanded to preserve every living kind",
        "excerpt": "And of every living thing of all flesh, two of every sort shalt thou bring into the ark, to keep them alive with thee; they shall be male and female. Of fowls after their kind, and of cattle after their kind, of every creeping thing of the earth after his kind, two of every sort shall come unto thee, to keep them alive.",
        "source": "The Holy Bible, Authorized (King James) Version, Genesis 6:19-20. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Gerard Manley Hopkins, \"Binsey Poplars\" (felled 1879)",
        "excerpt": "My aspens dear, whose airy cages quelled,\nQuelled or quenched in leaves the leaping sun,\nAll felled, felled, are all felled;\nOf a fresh and following folded rank\nNot spared, not one\nThat dandled a sandalled\nShadow that swam or sank\nOn meadow and river and wind-wandering weed-winding bank.",
        "source": "Gerard Manley Hopkins, \"Binsey Poplars,\" Poems of Gerard Manley Hopkins (1918). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Poems_of_Gerard_Manley_Hopkins/Binsey_Poplars"
      },
      {
        "category": "artistic",
        "title": "John James Audubon, \"Passenger Pigeon,\" Plate 62 from The Birds of America (1827-1838)",
        "excerpt": "Audubon's life-size engraving shows a pair of passenger pigeons perched on a branch, the male leaning down to touch bills with the female in a tender gesture of courtship and feeding. Painted when the species still swept across the continent in uncountable flocks, the plate now reads as an elegy: within a century of its making, every living bird it depicts would be gone. The intimate exchange of food between the two birds is a quiet emblem of the breeding and feeding that habitat exists to protect.",
        "source": "John James Audubon, The Birds of America, Plate 62 (Passenger Pigeon, Columba migratoria). Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:62_Passenger_Pigeon.jpg",
        "image": {
          "src": "/covers/trump-endangered-species-habitat-rollback--a4.png",
          "alt": "Audubon's hand-colored plate of two passenger pigeons on a branch, one feeding the other, from The Birds of America.",
          "credit": "John James Audubon, The Birds of America, Plate 62 (1827-1838), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saens, \"Le Cygne\" (The Swan) from Le Carnaval des animaux (1886)",
        "excerpt": "Over rippling arpeggios in the piano, a solo cello traces one of music's most famous melodies: a single swan gliding across still water, serene and unhurried. Saint-Saens set it apart from the comic menagerie of his suite, giving the animal a dignity and fragile beauty that has made it an emblem of grace on the verge of stillness. Heard against the loss of wild creatures, the swan's song becomes a lament for the living things whose quiet presence a protected habitat is meant to keep alive.",
        "source": "Camille Saint-Saens, \"Le cygne\" (No. 13) from Le Carnaval des animaux (composed February 1886). Score public domain, via IMSLP.",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)"
      }
    ],
    "rank": 31
  },
  {
    "slug": "la-county-summit-fire-evacuations",
    "headline": "Summit Fire in Los Angeles County's high desert burns 2,200 acres, forcing evacuations",
    "overview": "A brush fire that broke out around 1 p.m. on Friday, July 10, 2026, in the Antelope Valley community of Llano, about 45 miles northeast of Los Angeles, exploded to roughly 2,200 acres by evening amid mid-90s heat, the Angeles National Forest said. The blaze, named the Summit Fire, prompted evacuation orders near the Los Angeles-San Bernardino county line and warnings for parts of Piñon Hills and Wrightwood, and an evacuation shelter opened in Lancaster. Crews battled the fast-moving fire as it threatened occupied structures.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQQXFLZExlZDh0c3dvQWxTa2FuNWZ1TUplMzFxbU1FWk5iNENmOC05bVRUVnFHbUh1OTFYdm5jMzBUMVZ5MUE5bmU5TEkyckFqcHZGa2lZNE50LTVCd05MMkttRVowY3hfR2ItS0hZUlE3X0NmbThmQ3VaUk00Z1pzMThLU0lUSFVRVXpIZTJzRWpPWkQzMEZ2aFdhS2I2ajQ?oc=5"
      },
      {
        "name": "LAist",
        "href": "https://laist.com/news/climate-environment/summit-fire-antelope-valley"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/la-county-summit-fire-evacuations.png",
      "alt": "A wildfire burning through dry brush in the California high desert.",
      "credit": "Bobcat Fire, Los Angeles County, seen from Monrovia, California, September 10, 2020. Photo by Eddiem360, via Wikimedia Commons (CC BY-SA 4.0)."
    },
    "edition": "Morning Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Samuel Pepys, Diary, entry for 2 September 1666 (the Great Fire of London)",
        "excerpt": "Poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another. ... the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys, till they burned their wings, and fell down.",
        "source": "The Diary of Samuel Pepys, Sunday 2 September 1666.",
        "href": "https://www.amblesideonline.org/samuel-pepys"
      },
      {
        "category": "historical",
        "title": "Tacitus, Annals, Book 15.38 (the Great Fire of Rome under Nero, A.D. 64)",
        "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Caelian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus.",
        "source": "Tacitus, The Annals, Book 15, ch. 38, trans. Alfred John Church and William Jackson Brodribb, via Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D15%3Achapter%3D38"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book 2 (the burning of Troy), trans. John Dryden",
        "excerpt": "The palace of Deiphobus ascends / In smoky flames, and catches on his friends. / Ucalegon burns next: the seas are bright / With splendour not their own, and shine with Trojan light.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden, Project Gutenberg (ebook #228).",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "Dante Alighieri, Inferno, Canto XIV (the rain of fire on the burning sand), trans. Henry Wadsworth Longfellow",
        "excerpt": "O'er all the sand-waste, with a gradual fall, / Were raining down dilated flakes of fire, / As of the snow on Alp without a wind. ... Thus was descending the eternal heat, / Whereby the sand was set on fire, like tinder / Beneath the steel, for doubling of the dole.",
        "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto XIV, trans. Henry Wadsworth Longfellow, Project Gutenberg (ebook #1001).",
        "href": "https://www.gutenberg.org/files/1001/1001-h/1001-h.htm"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (oil on canvas, 1834–35)",
        "excerpt": "Turner turns a real disaster into an apocalypse of light: a wall of orange-white flame roars up from Parliament and dissolves the night, its glare smeared across the Thames and reflected in the crowd of onlookers massed on the far bank. Stone towers become ghosts in the heat, and the boundary between fire, water, and sky burns away — the same overwhelming, wind-driven blaze that turns a hillside of dry brush into a sheet of light.",
        "source": "J. M. W. Turner (1775–1851), The Burning of the Houses of Lords and Commons, Philadelphia Museum of Art; public-domain image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/la-county-summit-fire-evacuations--a4.png",
          "alt": "Turner's painting of the Houses of Parliament engulfed in a towering blaze, its firelight reflected across the Thames.",
          "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (Philadelphia Museum of Art), via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, \"Magic Fire Music\" (Feuerzauber) from Die Walküre, WWV 86B, Act III (1856–70)",
        "excerpt": "As Wotan summons Loge to encircle the sleeping Brünnhilde, the orchestra ignites: shimmering strings and darting woodwinds flicker upward like sparks while the brass surges beneath them, conjuring a ring of flame that both protects and imprisons. The music makes fire audible — restless, beautiful, and consuming — the sound of a landscape ringed by flames no one can cross.",
        "source": "Richard Wagner, Die Walküre, WWV 86B, Act III (\"Magic Fire Music\" / Feuerzauber), scores via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)"
      }
    ],
    "rank": 32
  },
  {
    "slug": "cuba-second-islandwide-blackout",
    "headline": "Cuba suffers its second islandwide blackout in a week as its power grid crumbles",
    "overview": "Cuba was hit by a total islandwide blackout on Friday, July 10, 2026, the second in a week for the nation of nearly 10 million, after a failure on a transmission line between Santa Clara and Sancti Spíritus. Officials blamed a 'fluctuation in the parameters' on a grid weakened by aging plants over 30 years old and by fuel shortages that have worsened since January, when President Trump threatened tariffs on any country supplying oil to the island. Public transport largely halted and tens of thousands of surgeries were canceled.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxPSDM2dE5Jck56TlEtSHVlM1pMUmN1UkpqdVFiSkZteWROMWoxQmduVl9FSnUxTGsxajRKOW9DMFBkMS1DdGU4ZjJ4S3JKcUloSTNSU05WcUFQMnRfNFpYNEJDWXlRNm5peWVnTEhTWjZIM0RVTmdvWjVodzFoMldBVmgtdEhqaHJ2VU1lQks4bw?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/Business/wireStory/islandwide-blackout-strikes-cuba-time-week-grid-crumbles-134664163"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/cuba-second-islandwide-blackout.png",
      "alt": "The Havana skyline at dusk under a darkening sky.",
      "credit": "Sunset over Havana, Cuba, 2017. Photo by Magoodlin (Margaret A. Goodlin), via Wikimedia Commons, CC BY-SA 4.0."
    },
    "edition": "Morning Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The New York City blackout of July 13-14, 1977",
        "excerpt": "On a sweltering July night, lightning struck Con Edison's transmission lines north of the city, and within an hour a cascade of failures dropped all of New York into darkness. Unlike the calm of the 1965 outage, this blackout unleashed a night of terror: 1,600 stores looted, more than a thousand fires set, and 4,500 arrests before power returned the next evening. A single stroke against fragile wires had shown how thin the line was between a modern metropolis and chaos.",
        "source": "\"New York City blackout of 1977,\" Wikipedia (encyclopedia entry drawing on contemporary reporting and Con Edison records).",
        "href": "https://en.wikipedia.org/wiki/New_York_City_blackout_of_1977"
      },
      {
        "category": "historical",
        "title": "The wartime blackout of Britain and the Blitz (from September 1939)",
        "excerpt": "Two days before Britain declared war, the whole nation was ordered into darkness: every window curtained or painted over, every street lamp extinguished, every car headlamp masked to a downward slit so no gleam could guide a bomber. Through the Blitz of 1940, Londoners groped home by torchlight aimed at their own feet, navigating a city deliberately blinded against the sky. The blackout became one of the most hated hardships of the war, a nightly reminder that survival now meant living without light.",
        "source": "\"Blackout (wartime),\" Wikipedia (encyclopedia entry on the WWII civil-defense blackout).",
        "href": "https://en.wikipedia.org/wiki/Blackout_(wartime)"
      },
      {
        "category": "literary",
        "title": "John Milton, Paradise Lost, Book I (1667)",
        "excerpt": "A dungeon horrible, on all sides round,\nAs one great furnace flamed; yet from those flames\nNo light; but rather darkness visible\nServed only to discover sights of woe,\nRegions of sorrow, doleful shades, where peace\nAnd rest can never dwell, hope never comes\nThat comes to all",
        "source": "John Milton, Paradise Lost, Book I, lines 61-69. Project Gutenberg (public domain).",
        "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm"
      },
      {
        "category": "literary",
        "title": "Lord Byron, \"Darkness\" (1816)",
        "excerpt": "I had a dream, which was not all a dream.\nThe bright sun was extinguished, and the stars\nDid wander darkling in the eternal space,\nRayless, and pathless, and the icy Earth\nSwung blind and blackening in the moonless air;\nMorn came and went—and came, and brought no day,\nAnd men forgot their passions in the dread\nOf this their desolation; and all hearts\nWere chilled into a selfish prayer for light",
        "source": "George Gordon, Lord Byron, \"Darkness\" (composed July 1816), in The Works of Lord Byron (ed. Coleridge). Wikisource (public domain).",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Lord_Byron_(ed._Coleridge,_Prothero)/Poetry/Volume_4/Darkness"
      },
      {
        "category": "artistic",
        "title": "James McNeill Whistler, \"Nocturne in Black and Gold: The Falling Rocket\" (c. 1875)",
        "excerpt": "Whistler dissolves a night sky into a wash of near-black blues and greens, a darkened pleasure garden barely legible in the gloom. A single firework showers gold sparks against the dark, the one flare of light in a world otherwise given over to shadow. The painting turns the night without light into pure atmosphere—beauty and menace held in the same darkness.",
        "source": "James McNeill Whistler (1834-1903), oil on panel, Detroit Institute of Arts. Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Whistler-Nocturne_in_black_and_gold.jpg",
        "image": {
          "src": "/covers/cuba-second-islandwide-blackout--a4.png",
          "alt": "A dark night scene in shades of black, blue, and green, with a scatter of golden sparks from a falling firework.",
          "credit": "James McNeill Whistler, \"Nocturne in Black and Gold: The Falling Rocket\" (c. 1875), via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Frédéric Chopin, Nocturne in E-flat major, Op. 9 No. 2 (1830-31)",
        "excerpt": "Chopin took the nocturne—music of the night—and made it the emblem of an entire mood: a singing right-hand melody drifting over a rocking accompaniment, tender, hushed, and lit as if by candlelight. The piece finds serenity rather than fear in the dark, a reminder that the night has always been an occasion for beauty as much as for dread. It is the other face of a world after sundown: not collapse, but quiet endurance.",
        "source": "Frédéric Chopin, Nocturnes, Op. 9 (composed 1830-31). IMSLP / Petrucci Music Library (public domain).",
        "href": "https://imslp.org/wiki/Nocturnes,_Op.9_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      }
    ],
    "rank": 33
  },
  {
    "slug": "charlie-kirk-suspect-preliminary-hearing",
    "headline": "Utah prosecutors lay out evidence against Charlie Kirk's accused killer at preliminary hearing",
    "overview": "At a preliminary hearing in Provo, Utah, that began this week, prosecutors started presenting what they call a 'mountain of evidence' against Tyler James Robinson, 23, the man accused of assassinating conservative activist Charlie Kirk at a Utah Valley University rally on September 10, 2025. The state plans up to 50 exhibits and is seeking the death penalty, while defense lawyers challenged the reliability of DNA linking Robinson to a rifle found wrapped in a towel. Judge Tony Graf will decide whether the case proceeds to trial.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c4gy12gqzpvo"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/nation/dna-evidence-from-charlie-kirk-assassination-disputed-by-defendants-lawyers"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/charlie-kirk-suspect-preliminary-hearing.png",
      "alt": "The Fourth District Courthouse in Provo, Utah.",
      "credit": "Photo by Farragutful, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Suetonius, The Lives of the Twelve Caesars — 'The Deified Julius' (Divus Julius), ch. 82 (assassination of Julius Caesar, 44 BC)",
        "excerpt": "Finding himself now attacked on all hands with naked poniards, he wrapped the toga about his head, and at the same moment drew the skirt round his legs with his left hand, that he might fall more decently with the lower part of his body covered.... He was stabbed with three and twenty wounds, uttering a groan only, but no cry, at the first wound.",
        "source": "Suetonius, The Lives of the Twelve Caesars, 'Divus Julius,' ch. 82, trans. Alexander Thomson, rev. T. Forester; Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0132:life%3Djul.:chapter%3D82"
      },
      {
        "category": "historical",
        "title": "The Trial of Charles Guiteau, assassin of President James A. Garfield (Washington, D.C., 1881–82)",
        "excerpt": "The Deity allowed the Doctors to finish my work gradually, because he wanted to prepare the people for the change and also to confirm my original inspiration. I am well satisfied with the Deity's conduct of the case thus far, and I have not doubt that He will continue to father it to the end, and that the public will sooner or later see the special providence in the late President's removal.",
        "source": "Excerpts from the Trial Transcript: Charles Guiteau Speaks to the Jury; Famous Trials (Prof. Douglas O. Linder, UMKC School of Law)",
        "href": "https://famous-trials.com/guiteau/2193-guiteauspeaks"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Julius Caesar, Act III, Scene 1 (the murder of Caesar in the Senate)",
        "excerpt": "CASCA: Speak, hands, for me!\n[CASCA first, then the other Conspirators and BRUTUS stab CAESAR]\nCAESAR: Et tu, Brute! Then fall, Caesar.\n[Dies]",
        "source": "William Shakespeare, Julius Caesar, Act 3, Scene 1; The Complete Works of William Shakespeare, MIT (from the Moby/Globe edition)",
        "href": "http://shakespeare.mit.edu/julius_caesar/full.html"
      },
      {
        "category": "literary",
        "title": "Fyodor Dostoevsky, Crime and Punishment (1866) — Raskolnikov's confession",
        "excerpt": "Raskolnikov refused the water with his hand, and softly and brokenly, but distinctly said: \"It was I who killed the old pawnbroker woman and her sister Lizaveta with an axe and robbed them.\"",
        "source": "Fyodor Dostoevsky, Crime and Punishment (1866); Raskolnikov's confession to Sonia, English translation quoted verbatim via Wikiquote",
        "href": "https://en.wikiquote.org/wiki/Crime_and_Punishment"
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme, The Death of Caesar (c. 1859–1867), oil on canvas",
        "excerpt": "Gérôme paints the aftermath rather than the blow: the assassins stride away with daggers raised, exultant, while Caesar lies crumpled and almost overlooked at the base of Pompey's statue. The vast, near-empty hall and scattered overturned bench make the deed feel at once monumental and forlorn — a public killing whose reckoning has only just begun.",
        "source": "Jean-Léon Gérôme, 'The Death of Caesar,' Walters Art Museum, Baltimore (accession 37.884); public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_The_Death_of_Caesar_-_Walters_37884.jpg",
        "image": {
          "src": "/covers/charlie-kirk-suspect-preliminary-hearing--a4.png",
          "alt": "Jean-Léon Gérôme's painting 'The Death of Caesar' (c. 1859–67): conspirators withdraw with raised daggers as Caesar's body lies at the foot of Pompey's statue.",
          "credit": "Jean-Léon Gérôme, 'The Death of Caesar' (c. 1859–67), Walters Art Museum; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 — 'Dies irae' (1791)",
        "excerpt": "Dies iræ, dies illa,\nSolvet sæclum in favilla:\nTeste David cum Sibylla.\nQuantus tremor est futurus,\nQuando judex est venturus,\nCuncta stricte discussurus!",
        "source": "W. A. Mozart, Requiem in D minor, K.626, III. Sequenz — 'Dies irae' (text: medieval Latin sequence, public domain); score at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 34
  },
  {
    "slug": "nigeria-fake-presidential-council-probe",
    "headline": "Nigeria probes a fake presidential council nearly handed a $944,000 budget",
    "overview": "Nigeria's President Bola Tinubu ordered a 30-day investigation after a fictitious body, the Presidential Foreign Intervention Promotion Council, set up offices inside the federal secretariat in Abuja and was listed for about 1.3 billion naira (US$944,000) in this year's budget despite having no legal status. The presidency says documents creating it, including a letter bearing the chief of staff's signature, were forged, and it called the council's purported director, Adeniyi Adeyemi Matthew, a 'con artist.' He is due in court on July 27 on charges including forgery.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c872v7wldjyo"
      },
      {
        "name": "Africanews",
        "href": "https://www.africanews.com/2026/07/08/nigeria-orders-probe-into-fake-agency-that-nearly-got-944000-in-state-funds/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/nigeria-fake-presidential-council-probe.png",
      "alt": "The federal secretariat complex in Abuja, Nigeria.",
      "credit": "Ovinuchi Prince Ejiohuo, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The First False Demetrius, pretender to the Russian throne (Muscovy, 1604-1606)",
        "excerpt": "The Jesuits also seem to have believed in the man, who was evidently an unconscious impostor brought up from his youth to believe that he was the real Demetrius; numerous fugitives from Moscow also acknowledged him, and finally he set out, at the head of an army of Polish and Lithuanian volunteers, Cossacks and Muscovite fugitives, to drive out the Godunovs, after being received into the Church of Rome.",
        "source": "\"Demetrius, Pseudo-,\" Encyclopaedia Britannica, 11th ed. (Cambridge University Press, 1911), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Demetrius,_Pseudo-"
      },
      {
        "category": "historical",
        "title": "The Tichborne Claimant, the Victorian impostor who tried to seize a dead baronet's estate (England, 1866-1874)",
        "excerpt": "Roger Charles Tichborne (1820-1854), whose family name became a household word on account of an attempt made by an impostor in 1868 to personate him and obtain his heritage, was the eldest grandson of Sir Edward Tichborne, the 9th baronet, of a very ancient Hampshire family.",
        "source": "Thomas Seccombe, \"Tichborne Claimant, The,\" Encyclopaedia Britannica, 11th ed., vol. 26 (Cambridge University Press, 1911), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tichborne_Claimant,_The"
      },
      {
        "category": "literary",
        "title": "Nikolai Gogol, The Inspector-General (Revizor), 1836",
        "excerpt": "I have called you together, gentlemen, to tell you an unpleasant piece of news. An Inspector-General is coming.",
        "source": "Nikolai Gogol, The Inspector-General, trans. Thomas Seltzer, Act I; Project Gutenberg eBook #3735.",
        "href": "https://www.gutenberg.org/files/3735/3735-h/3735-h.htm"
      },
      {
        "category": "literary",
        "title": "Mark Twain, Adventures of Huckleberry Finn, 1885 (the \"duke\" and the \"dauphin\")",
        "excerpt": "Bilgewater, I am the late Dauphin! Yes, my friend, it is too true--your eyes is lookin' at this very moment on the pore disappeared Dauphin, Looy the Seventeen, son of Looy the Sixteen and Marry Antonette.",
        "source": "Mark Twain, Adventures of Huckleberry Finn, Chapter XIX (1885), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Adventures_of_Huckleberry_Finn_(1885)/Chapter_19"
      },
      {
        "category": "artistic",
        "title": "Honore Daumier, Le Ventre Legislatif (The Legislative Belly), lithograph, 1834",
        "excerpt": "Daumier packs the benches of the Chamber of Deputies with a row of recognizable notables, each rendered as a bloated, sneering, dozing grandee. The satire lays bare the gap between the dignity of office and the men who occupy it, exposing corruption and self-importance dressed up as authority.",
        "source": "Honore Daumier, \"Le Ventre Legislatif (The Legislative Belly),\" 1834, lithograph on wove paper, National Gallery of Art, Washington (accession 1991.229.1); file via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Le_Ventre_L%C3%A9gislatif_(The_Legislative_Belly),_1834,_NGA_74290.jpg",
        "image": {
          "src": "/covers/nigeria-fake-presidential-council-probe--a4.png",
          "alt": "Honore Daumier's 1834 lithograph The Legislative Belly, a caricature of corrupt, bloated legislators seated in tiered benches.",
          "credit": "Honore Daumier, 1834, National Gallery of Art (CC0), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Boris Godunov (opera), 1869-1872 / 1908 revision",
        "excerpt": "Mussorgsky's opera dramatizes the very impostor of the historical record: the runaway monk Grigory who proclaims himself the murdered Tsarevich Dmitri and marches on Moscow to claim the throne. The Pretender's rise haunts the guilt-ridden Tsar Boris, staging in music how a forged identity can shake a whole state.",
        "source": "Modest Mussorgsky, Boris Godunov, full and vocal scores (public domain), via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      }
    ],
    "rank": 35
  },
  {
    "slug": "martha-lillard-last-iron-lung-dies",
    "headline": "Martha Lillard, the last American who relied on an iron lung, dies at 78",
    "overview": "Martha Lillard, believed to be the last person in the United States living inside an iron lung, has died at 78 in Oklahoma, it was reported on July 10, 2026. She contracted polio in 1953 at age five and spent much of her life in the negative-pressure ventilator, becoming the last known American to depend on one after the death of fellow survivor Paul Alexander in 2024. Her death, from complications of long COVID, closes a chapter on a machine that once filled hospital wards during the polio epidemics.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPWTJTRkFtZlFmNXRPTjJkMlhHZ0RRcm5hYjRhcEdUYTg0NncybnN1UXZCRjBEQVk0TUY0N1Z0d1hzR2Q1RWswU2htcU9OS3ROT250VDFUSEtFRjFkT2IwNDdyYkZ1MXN0NUozZFlkS2JnLVBBYjJBTmJpWFdsZUY1VWRfeWpXVW4tckl0RFU0c2lnbGpiVGx1cg?oc=5"
      },
      {
        "name": "KFOR",
        "href": "https://kfor.com/news/local/oklahoma-woman-the-last-american-in-an-iron-lung-dies-at-78/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/martha-lillard-last-iron-lung-dies.png",
      "alt": "A row of iron lung respirators in a hospital ward during the polio era.",
      "credit": "U.S. Food and Drug Administration, c. 1953 (film publicity photo of an iron lung ward). Public domain, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Franklin D. Roosevelt, Radio Address on the President's First Birthday Ball for Crippled Children (January 30, 1934)",
        "excerpt": "It is a fact that infantile paralysis results in the crippling of more children and of grownups than any other cause. Modern medical science has advanced so far that a very large proportion of children who for one reason or another have become crippled can be restored to useful citizenship.",
        "source": "Franklin D. Roosevelt, \"Radio Address on the President's First Birthday Ball for Crippled Children,\" January 30, 1934. Gerhard Peters and John T. Woolley, The American Presidency Project.",
        "href": "https://www.presidency.ucsb.edu/ws/index.php?pid=14728"
      },
      {
        "category": "historical",
        "title": "Dwight D. Eisenhower, Citation Presented to Dr. Jonas E. Salk and Accompanying Remarks (April 22, 1955)",
        "excerpt": "He has provided a means for the control of a dread disease. I have no words in which adequately to express the thanks of myself and all the people I know--all 164 million Americans.",
        "source": "Dwight D. Eisenhower, \"Citation Presented to Dr. Jonas E. Salk and Accompanying Remarks,\" April 22, 1955. Gerhard Peters and John T. Woolley, The American Presidency Project.",
        "href": "https://www.presidency.ucsb.edu/documents/citation-presented-dr-jonas-e-salk-and-accompanying-remarks"
      },
      {
        "category": "literary",
        "title": "Genesis 2:7, King James Bible (1611)",
        "excerpt": "And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.",
        "source": "The Holy Bible, King James Version, Genesis 2:7. Via Wikisource, Bible (King James)/Genesis.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Jean-Dominique Bauby, The Diving Bell and the Butterfly (Le Scaphandre et le Papillon, 1997)",
        "excerpt": "Paralyzed by a stroke and locked inside an unresponsive body, the former magazine editor could move only his left eyelid. Letter by letter, blink by blink, he dictated an entire memoir to a transcriber reciting the alphabet. The result is a testament to a mind still soaring while the body lies sealed in its shell, much as a life can persist inside a breathing machine.",
        "source": "Jean-Dominique Bauby, Le Scaphandre et le Papillon (Paris: Robert Laffont, 1997). Overview via Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/The_Diving_Bell_and_the_Butterfly"
      },
      {
        "category": "artistic",
        "title": "Michelangelo, The Creation of Adam (Sistine Chapel ceiling, c. 1512)",
        "excerpt": "God, borne aloft on a swirl of drapery and reaching angels, extends his arm toward a languid Adam whose own hand rises to meet it. Their fingers hover a breath apart, the gap where the spark of life is about to leap across. It is the biblical breath of life made visible: the moment inert flesh is charged into a living soul.",
        "source": "Michelangelo Buonarroti, The Creation of Adam, fresco, Sistine Chapel, Vatican City, c. 1508-1512. Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg",
        "image": {
          "src": "/covers/martha-lillard-last-iron-lung-dies--a4.png",
          "alt": "Michelangelo's fresco The Creation of Adam: God reaches out to touch the finger of a reclining Adam.",
          "credit": "Michelangelo, The Creation of Adam (c. 1512), Sistine Chapel. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Edwin Hatch, \"Breathe on Me, Breath of God\" (hymn, 1878)",
        "excerpt": "Breathe on me, Breath of God, fill me with life anew, that I may love what Thou dost love, and do what Thou wouldst do.",
        "source": "Edwin Hatch, \"Breathe on me, Breath of God,\" 1878. Text via Hymnary.org.",
        "href": "https://hymnary.org/text/breathe_on_me_breath_of_god"
      }
    ],
    "rank": 36
  },
  {
    "slug": "charles-harry-highgrove-reconciliation",
    "headline": "King Charles hosts Prince Harry and family at Highgrove in first meeting in years",
    "overview": "King Charles III and Queen Camilla hosted Prince Harry, Meghan and their children Archie and Lilibet at Highgrove House on Friday, July 10, 2026, the first time the king had seen his grandchildren in person since 2022, as the family works to repair a rift dating to the couple's 2020 departure from royal life. Harry, in Britain for charity events, told the BBC he 'would love reconciliation' and saw 'no point in continuing to fight anymore.' The palace called it a private family visit and said no photographs would be released.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxORE1EanUxX3BhNVdxRnhQQU1QR2dyQWpBcTQ5d08wbE9wb0NSaEZUbEFUN2o3Z2Z4TnZTcUYyUGl2LWZxNGI2U3NYbGJzbG41ekl2NF9Hd2gzSzZtSngzTE8xUXVWbm5iV0tJZ0sxblE3NU9icTFpTVEwd0h2eG03UVo1SHJMRUhwTGtfM1VfUGU0MXc2cFlEQ01XTGc3NDdnQzRkbQ?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://www.nbcnews.com/world/united-kingdom/king-charles-hosted-prince-harry-family-first-time-years-rift-rcna385893"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/charles-harry-highgrove-reconciliation.png",
      "alt": "Highgrove House, King Charles's country residence in Gloucestershire, England.",
      "credit": "Engraving of Highgrove House by Henry Sargant Storer, 1825. Public domain, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Henry IV and Prince Henry (later Henry V) reconcile, c. 1411-1413",
        "excerpt": "The ageing Henry IV and his impatient heir fell out over both foreign and domestic policy, and in November 1411 the king removed the prince from the royal council. As rumours spread that the young Henry coveted the crown before his time, the prince sought out his father to protest his loyalty and clear his name. Before the king's death in March 1413 the breach was mended, and the son who had been pushed to the margins of power succeeded peacefully as one of England's most celebrated monarchs.",
        "source": "\"Henry V of England,\" Wikipedia (encyclopedia entry on the medieval English king and his father Henry IV)",
        "href": "https://en.wikipedia.org/wiki/Henry_V_of_England"
      },
      {
        "category": "historical",
        "title": "George I and the Prince of Wales (later George II) reconcile, 1720",
        "excerpt": "A quarrel at a royal christening in 1717 split the House of Hanover in two: George I banished his son and heir from St James's Palace and kept the couple's children in royal custody, and the exiled prince turned his Leicester House residence into a rallying point for his father's political opponents. For three years the estrangement festered as a public embarrassment to the crown. In 1720 Robert Walpole brokered a reconciliation between king and son for the sake of national unity, though contemporaries noted the two men embraced only half-heartedly.",
        "source": "\"George II of Great Britain,\" Wikipedia (encyclopedia entry covering the Hanoverian royal rift and its resolution)",
        "href": "https://en.wikipedia.org/wiki/George_II_of_Great_Britain"
      },
      {
        "category": "literary",
        "title": "The Parable of the Prodigal Son, Luke 15:11-32 (King James Bible, 1611)",
        "excerpt": "And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him. And the son said unto him, Father, I have sinned against heaven, and in thy sight, and am no more worthy to be called thy son. But the father said to his servants, Bring forth the best robe, and put it on him; and put a ring on his hand, and shoes on his feet: ... For this my son was dead, and is alive again; he was lost, and is found.",
        "source": "The Holy Bible, King James Version, Gospel of Luke, chapter 15 (via Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, King Lear, Act IV, Scene 7 (c. 1606)",
        "excerpt": "Pray, do not mock me:\nI am a very foolish fond old man,\nFourscore and upward, not an hour more nor less;\nAnd, to deal plainly,\nI fear I am not in my perfect mind.\nMethinks I should know you, and know this man;\nYet I am doubtful for I am mainly ignorant\nWhat place this is; and all the skill I have\nRemembers not these garments; nor I know not\nWhere I did lodge last night. Do not laugh at me;\nFor, as I am a man, I think this lady\nTo be my child Cordelia.",
        "source": "William Shakespeare, The Tragedy of King Lear, Act 4, Scene 7 (public-domain text, The Complete Works of Shakespeare, MIT)",
        "href": "http://shakespeare.mit.edu/lear/lear.4.7.html"
      },
      {
        "category": "artistic",
        "title": "Rembrandt van Rijn, The Return of the Prodigal Son (c. 1668)",
        "excerpt": "In one of his last and most tender canvases, Rembrandt paints the ragged, shorn son kneeling in his father's arms, worn shoes falling from his feet. The old man, half-blind, leans down and rests both hands upon the son's shoulders in an embrace of pure forgiveness, while onlookers watch from the shadows. Light gathers on the reunion at the painting's heart, making a wordless icon of a family rift healed.",
        "source": "Rembrandt Harmensz. van Rijn, oil on canvas, State Hermitage Museum, Saint Petersburg; via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz_van_Rijn_-_Return_of_the_Prodigal_Son_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/charles-harry-highgrove-reconciliation--a4.png",
          "alt": "Rembrandt's painting of a kneeling son embraced by his aged father, The Return of the Prodigal Son.",
          "credit": "Rembrandt van Rijn, The Return of the Prodigal Son, c. 1668, State Hermitage Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Bartolomé Esteban Murillo, The Return of the Prodigal Son (1667-1670)",
        "excerpt": "Murillo stages the homecoming as a grand, theatrical tableau: the barefoot, half-naked son sinks to his knees as his richly robed father stoops to gather him in. Servants hurry in with fine garments, a ring and shoes, and the fatted calf is led forward for the feast. Painted for a Seville charity whose mission was to clothe the naked, the canvas turns the parable into a luminous drama of repentance met by open-armed mercy.",
        "source": "Bartolomé Esteban Murillo, oil on canvas, National Gallery of Art, Washington, D.C. (Avalon Foundation gift); via Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Return_of_the_Prodigal_Son_1667-1670_Murillo.jpg",
        "image": {
          "src": "/covers/charles-harry-highgrove-reconciliation--a5.png",
          "alt": "Murillo's painting of the kneeling prodigal son welcomed by his father as servants bring robes and the fatted calf.",
          "credit": "Bartolomé Esteban Murillo, The Return of the Prodigal Son, 1667-1670, National Gallery of Art, Washington. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "world-cup-final-tickets-metlife",
    "headline": "FIFA still has nearly 1,200 World Cup final tickets on sale at $7,380 as quarterfinal resale prices fall",
    "overview": "FIFA had about 1,180 category-two tickets priced at $7,380 still available on Friday, July 10, 2026, for the World Cup final on July 19 at MetLife Stadium in New Jersey, alongside lower-deck seats from $19,995 to $32,970 and hospitality packages above $32,000. Resale prices for quarterfinal matches tumbled after co-hosts the United States and Mexico were knocked out, with some seats less than half their earlier cost. On FIFA's own marketplace, final-ticket resale listings ranged from about $7,440 to more than $11 million.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxOYTZCVjVzVm50Z1B3MGdXNW43cVA3RjF1NUg2TWw0MFVpQlo1OHVyVkFsWFRKLXZRTlVVM3FibnhyQVRaVHVEU0FKallHV0ViOUVYUzFwNUItRDhuaWItMldLbjdCTW5jTDNJRlYxNlVoVUUxSnNQc1lOSUZxRFpOS0F5b1YyRHhZazNZ?oc=5"
      },
      {
        "name": "ESPN",
        "href": "https://www.espn.com/soccer/story/_/id/49325637/nearly-1200-tickets-fifa-sale-site-world-cup-final-7380-dollars-each"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/world-cup-final-tickets-metlife.png",
      "alt": "MetLife Stadium in East Rutherford, New Jersey, host of the World Cup final.",
      "credit": "Sebas, CC BY 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Suetonius, \"Life of Titus,\" ch. 7 (c. AD 121), on the dedication of the Amphitheatre (Colosseum)",
        "excerpt": "At the dedication of his amphitheatre and of the baths which were hastily built near it he gave a most magnificent and costly gladiatorial show. He presented a sham sea-fight too in the old naumachia, and in the same place a combat of gladiators, exhibiting five thousand wild beasts of every kind in a single day.",
        "source": "Suetonius, The Lives of the Caesars, \"Divus Titus\" 7.3, trans. J. C. Rolfe (Loeb Classical Library, 1914), via LacusCurtius, University of Chicago",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Titus*.html"
      },
      {
        "category": "historical",
        "title": "Charles Mackay, \"The Tulipomania\" (Dutch tulip mania, 1634–1637), from Memoirs of Extraordinary Popular Delusions (1841)",
        "excerpt": "In 1634, the rage among the Dutch to possess them was so great that the ordinary industry of the country was neglected, and the population, even to its lowest dregs, embarked in the tulip trade. Nobles, citizens, farmers, mechanics, seamen, footmen, maidservants, even chimney-sweeps and old clotheswomen, dabbled in tulips.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (London: Richard Bentley, 1841), \"The Tulipomania,\" via the Library of Economics and Liberty (Econlib)",
        "href": "https://www.econlib.org/library/Mackay/macEx3.html"
      },
      {
        "category": "literary",
        "title": "Juvenal, Satire X (\"panem et circenses\" / bread and circuses), early 2nd century AD",
        "excerpt": "Now that no one buys our votes, the public has long since cast off its cares; the people that once bestowed commands, consulships, legions and all else, now meddles no more and longs eagerly for just two things—Bread and Games!",
        "source": "Juvenal, Satire 10, in Juvenal and Persius, The Satires of Juvenal, trans. G. G. Ramsay (Loeb Classical Library), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Juvenal_and_Persius/The_Satires_of_Juvenal/Satire_10"
      },
      {
        "category": "literary",
        "title": "William Makepeace Thackeray, Vanity Fair, \"Before the Curtain\" (1848)",
        "excerpt": "There is a great quantity of eating and drinking, making love and jilting, laughing and the contrary, smoking, cheating, fighting, dancing and fiddling.",
        "source": "William Makepeace Thackeray, Vanity Fair: A Novel without a Hero (London: Bradbury and Evans, 1848), Preface, \"Before the Curtain,\" via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/599/599-h/599-h.htm"
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme, \"Pollice Verso\" (Thumbs Down), 1872, oil on canvas",
        "excerpt": "Gérôme's vast arena canvas turns the crowd into the story: a triumphant gladiator plants his foot on a fallen foe and looks up not to the emperor but to the tiered spectators, whose jabbing thumbs-down deliver the verdict. The packed marble stands, the Vestals leaning forward, the sanded floor still marked from the fight—all render the mass appetite for lethal entertainment as the true engine of the games.",
        "source": "Jean-Léon Gérôme, Pollice Verso (1872), Phoenix Art Museum; public-domain reproduction via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Leon_Gerome_Pollice_Verso.jpg",
        "image": {
          "src": "/covers/world-cup-final-tickets-metlife--a4.png",
          "alt": "A victorious gladiator stands over a fallen opponent in the Colosseum as the crowd gives a thumbs-down verdict, in Jean-Léon Gérôme's 1872 painting Pollice Verso.",
          "credit": "Jean-Léon Gérôme, Pollice Verso (1872), Phoenix Art Museum; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi, \"Triumphal March\" (Grand March), from Aida, Act II (1871)",
        "excerpt": "Verdi wrote the Act II Triumphal March for a returning conqueror to parade before an assembled multitude, its blazing long trumpets and processional pomp designed to make an audience feel the swell of collective spectacle. It has become the archetypal sound of the grand entrance into the arena—music built to fill a stadium and to crown a champion before a roaring crowd.",
        "source": "Giuseppe Verdi, Aïda (1871), full score, Milan: Ricordi; public-domain scores via IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/A%C3%ADda_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 38
  },
  {
    "slug": "ann-widdecombe-killing-uk-arrest",
    "headline": "Man, 26, arrested over the killing of former British MP Ann Widdecombe, found dead at 78",
    "overview": "A 26-year-old man was arrested on suspicion of murder after Ann Widdecombe, the former British MP and reality-television personality, was found dead with serious injuries at her home in Haytor Vale on the edge of Dartmoor on Thursday, July 9, 2026. Widdecombe, 78, served as a Conservative MP from 1987 to 2010 before joining the Brexit Party and Reform UK. Devon and Cornwall Police said the killing was not being treated as terrorism and there was no indication it was politically motivated.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQVzU4cjc0N3FhM0c4eFdSS3dzRk9VTHQ0eE1jclE0WUFYMl92MXhiZFJsU1BBZE5JeEZjOW5PckdBVTNSWUxQdmROdGVyVGE2ZUdxam9JOEEzZERVbDIyWVV5OGhGdzQtRUxlWTFoTWQ0cmQ1cE9NdlpqejNvOWNvRkpKSFBGa2ZXWThHTWFwVlRIX3BhTFNXbjVMVzhhMm5ta3NfLWhXQ1VsM1BGV2c?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/10/uk/ann-widdecombe-uk-police-murder-investigation-intl"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-11",
    "image": {
      "src": "/covers/ann-widdecombe-killing-uk-arrest.png",
      "alt": "The moorland landscape of Dartmoor National Park in Devon, England.",
      "credit": "Haytor Rocks, Dartmoor. Photograph by Andrew Bone, October 2013. CC BY 2.0, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 11 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Murder of Thomas Becket, Canterbury Cathedral, 29 December 1170",
        "excerpt": "Archbishop Thomas Becket was cut down by four of Henry II's knights inside Canterbury Cathedral, struck to the ground near the choir during the evening office. He was killed in the one place he should have been utterly safe, refusing to bar the doors of the house of prayer. The killing of an eminent public man in his own sanctuary shocked Christendom and made him a martyr within days.",
        "source": "Thomas Becket, English Wikipedia (encyclopedic account of the archbishop's assassination)",
        "href": "https://en.wikipedia.org/wiki/Thomas_Becket"
      },
      {
        "category": "historical",
        "title": "The Assassination of Spencer Perceval, House of Commons, 11 May 1812",
        "excerpt": "Spencer Perceval remains the only British Prime Minister ever to be assassinated, shot in the chest in the lobby of the House of Commons and heard to cry \"I am murdered!\" before he fell. His killer, the aggrieved merchant John Bellingham, acted not from any grand ideological cause but from a private grievance over an unpaid claim. It was the sudden, violent fall of the nation's most eminent politician, felled where the business of the state was done.",
        "source": "Assassination of Spencer Perceval, English Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Assassination_of_Spencer_Perceval"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Macbeth, Act 1, Scene 7 & Act 2, Scene 2 (c. 1606)",
        "excerpt": "He's here in double trust:\nFirst, as I am his kinsman and his subject,\nStrong both against the deed; then, as his host,\nWho should against his murderer shut the door,\nNot bear the knife myself.",
        "source": "William Shakespeare, The Tragedy of Macbeth, Project Gutenberg eBook #1533 (modern-spelling text)",
        "href": "https://www.gutenberg.org/cache/epub/1533/pg1533.txt"
      },
      {
        "category": "literary",
        "title": "Arthur Conan Doyle, The Hound of the Baskervilles, ch. 3 (1902)",
        "excerpt": "I assure you that there is a reign of terror in the district, and that it is a hardy man who will cross the moor at night.",
        "source": "Arthur Conan Doyle, The Hound of the Baskervilles, Project Gutenberg eBook #2852 (full text)",
        "href": "https://www.gutenberg.org/files/2852/2852-0.txt"
      },
      {
        "category": "artistic",
        "title": "The Martyrdom of Thomas Becket, illuminated psalter, c. 1220 (British Library, Harley MS 5102, f. 32)",
        "excerpt": "The earliest surviving image of the killing shows the four knights, swords raised, closing in on the kneeling archbishop as the fatal blow falls upon his tonsured head. Rendered in gold and deep colour, it fixes the instant of a great man struck down where he should have been protected, turning violent death into an icon of martyrdom.",
        "source": "Illuminated manuscript, British Library Harley MS 5102, f. 32; the earliest known depiction of Becket's assassination. Public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Becket_Murder.JPG",
        "image": {
          "src": "/covers/ann-widdecombe-killing-uk-arrest--a4.png",
          "alt": "A 13th-century manuscript illumination depicting knights striking down Archbishop Thomas Becket in Canterbury Cathedral.",
          "credit": "Martyrdom of Thomas Becket, illuminated psalter, c. 1220, British Library Harley MS 5102, f. 32. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Frédéric Chopin, \"Marche funèbre\" from Piano Sonata No. 2 in B-flat minor, Op. 35 (1837–1839)",
        "excerpt": "The slow, tolling tread of Chopin's Funeral March has become the sound of grief itself, the music summoned whenever a public figure is carried to the grave. Its heavy minor-key procession, broken by a fragile consoling melody at its heart, mourns the fall of the eminent and the finality of a life cut short.",
        "source": "Frédéric Chopin, Piano Sonata No. 2, Op. 35 (third movement, Marche funèbre); scores in the public domain via IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)"
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
